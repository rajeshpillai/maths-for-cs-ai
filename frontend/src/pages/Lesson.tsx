import { createResource, createEffect, createMemo, createSignal, Show, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import { A, useParams } from "@solidjs/router";
import { fetchLesson, fetchLessonMeta, fetchTiers } from "../lib/api";
import { renderMarkdown } from "../lib/markdown";
import { isCompleted, toggleCompleted } from "../lib/progress";
import CodeRunner from "../components/CodeRunner";

interface LessonNav {
  prev: { tier: string; slug: string; label: string } | null;
  next: { tier: string; slug: string; label: string } | null;
}

function formatLabel(tier: string, slug: string): string {
  const tierNum = tier.startsWith("tier-") ? `T${tier.replace("tier-", "")}` : "";
  const name = slug.replace(/^\d+-/, "").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return tierNum ? `${tierNum}: ${name}` : name;
}

export default function Lesson() {
  const params = useParams<{ tier: string; slug: string }>();
  let containerRef: HTMLElement | undefined;
  const disposers: (() => void)[] = [];

  const [lesson] = createResource(
    () => ({ tier: params.tier, slug: params.slug }),
    ({ tier, slug }) => fetchLesson(tier, slug)
  );

  const [meta] = createResource(
    () => ({ tier: params.tier, slug: params.slug }),
    ({ tier, slug }) => fetchLessonMeta(tier, slug)
  );

  const [tiers] = createResource(fetchTiers);

  const [completed, setCompleted] = createSignal(false);

  createEffect(() => {
    setCompleted(isCompleted(params.tier, params.slug));
  });

  function handleToggleComplete() {
    const newState = toggleCompleted(params.tier, params.slug);
    setCompleted(newState);
  }

  const nav = createMemo((): LessonNav => {
    const allTiers = tiers();
    if (!allTiers) return { prev: null, next: null };

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
    const m = meta();
    if (!m) return;

    // Build lookup from metadata prereqs
    const resolved = new Map<string, string>();
    for (const p of m.prerequisites) {
      if (p.slug) {
        resolved.set(`${p.tier}/${p.lesson_num}`, `${p.tier}/${p.slug}`);
      }
    }

    const links = containerRef.querySelectorAll("a.prereq-link");
    links.forEach((link) => {
      const tier = link.getAttribute("data-tier") ?? "";
      const lessonNum = link.getAttribute("data-lesson") ?? "";
      const key = `${tier}/${lessonNum}`;
      const slug = resolved.get(key);
      if (slug) {
        link.setAttribute("href", `/lesson/${slug}`);
      }
    });
  }

  createEffect(() => {
    if (lesson()) {
      requestAnimationFrame(() => {
        mountCodeRunners();
      });
    }
  });

  // Resolve prereq links once both lesson content and metadata are available
  createEffect(() => {
    if (lesson() && meta()) {
      requestAnimationFrame(() => {
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
            <div class="lesson-complete">
              <button
                class={`complete-btn ${completed() ? "completed" : ""}`}
                onClick={handleToggleComplete}
              >
                <span class="complete-check">{completed() ? "\u2713" : ""}</span>
                {completed() ? "Completed" : "Mark as complete"}
              </button>
            </div>
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
