import { createResource, createEffect, createMemo, Show, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import { A, useParams } from "@solidjs/router";
import { fetchLesson, fetchTiers, type TierInfo } from "../lib/api";
import { renderMarkdown } from "../lib/markdown";
import CodeRunner from "../components/CodeRunner";

interface LessonNav {
  prev: { tier: string; slug: string; label: string } | null;
  next: { tier: string; slug: string; label: string } | null;
}

function formatLabel(tier: string, slug: string): string {
  const tierNum = tier.replace("tier-", "T");
  const name = slug.replace(/^\d+-/, "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return `${tierNum}: ${name}`;
}

export default function Lesson() {
  const params = useParams<{ tier: string; slug: string }>();
  let containerRef: HTMLElement | undefined;
  const disposers: (() => void)[] = [];

  const [lesson] = createResource(
    () => ({ tier: params.tier, slug: params.slug }),
    ({ tier, slug }) => fetchLesson(tier, slug)
  );

  const [tiers] = createResource(fetchTiers);

  const nav = createMemo((): LessonNav => {
    const allTiers = tiers();
    if (!allTiers) return { prev: null, next: null };

    // Build flat list of all lessons across all tiers
    const flat: { tier: string; slug: string }[] = [];
    for (const t of allTiers) {
      for (const l of t.lessons) {
        flat.push({ tier: t.tier, slug: l });
      }
    }

    const idx = flat.findIndex(
      (f) => f.tier === params.tier && f.slug === params.slug
    );

    return {
      prev: idx > 0
        ? { ...flat[idx - 1], label: formatLabel(flat[idx - 1].tier, flat[idx - 1].slug) }
        : null,
      next: idx >= 0 && idx < flat.length - 1
        ? { ...flat[idx + 1], label: formatLabel(flat[idx + 1].tier, flat[idx + 1].slug) }
        : null,
    };
  });

  function mountCodeRunners() {
    disposers.forEach((d) => d());
    disposers.length = 0;

    if (!containerRef) return;

    const preBlocks = containerRef.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      const codeEl = pre.querySelector("code.hljs.language-python");
      if (!codeEl) return;

      const rawCode = codeEl.textContent || "";

      const wrapper = document.createElement("div");
      pre.replaceWith(wrapper);

      const dispose = render(
        () => <CodeRunner code={rawCode} />,
        wrapper
      );
      disposers.push(dispose);
    });
  }

  function resolvePrereqLinks() {
    if (!containerRef) return;
    const allTiers = tiers();
    if (!allTiers) return;

    // Build a lookup: "tier-X/0Y" → "tier-X/0Y-full-slug"
    const slugLookup = new Map<string, string>();
    for (const t of allTiers) {
      for (const l of t.lessons) {
        // l is like "01-number-systems"
        const num = l.match(/^(\d+)/)?.[1] ?? "";
        slugLookup.set(`${t.tier}/${num}`, `${t.tier}/${l}`);
        slugLookup.set(`${t.tier}/${num.padStart(2, "0")}`, `${t.tier}/${l}`);
      }
    }

    const links = containerRef.querySelectorAll("a.prereq-link");
    links.forEach((link) => {
      const tier = link.getAttribute("data-tier") ?? "";
      const lessonNum = link.getAttribute("data-lesson") ?? "";
      const key = `${tier}/${lessonNum}`;
      const resolved = slugLookup.get(key);
      if (resolved) {
        link.setAttribute("href", `/lesson/${resolved}`);
      }
    });
  }

  createEffect(() => {
    if (lesson()) {
      requestAnimationFrame(() => {
        mountCodeRunners();
        resolvePrereqLinks();
      });
    }
  });

  onCleanup(() => {
    disposers.forEach((d) => d());
  });

  return (
    <div class="lesson">
      <Show when={lesson.loading}>
        <p class="loading">Loading lesson...</p>
      </Show>
      <Show when={lesson.error}>
        <p class="error">Lesson not found.</p>
      </Show>
      <Show when={lesson()}>
        {(data) => (
          <>
            <article
              ref={containerRef}
              class="lesson-content"
              innerHTML={renderMarkdown(data().content)}
            />
            <nav class="lesson-nav">
              <div class="lesson-nav-prev">
                <Show when={nav().prev}>
                  {(prev) => (
                    <A href={`/lesson/${prev().tier}/${prev().slug}`}>
                      <span class="nav-direction">Previous</span>
                      <span class="nav-label">{prev().label}</span>
                    </A>
                  )}
                </Show>
              </div>
              <div class="lesson-nav-next">
                <Show when={nav().next}>
                  {(next) => (
                    <A href={`/lesson/${next().tier}/${next().slug}`}>
                      <span class="nav-direction">Next</span>
                      <span class="nav-label">{next().label}</span>
                    </A>
                  )}
                </Show>
              </div>
            </nav>
          </>
        )}
      </Show>
    </div>
  );
}
