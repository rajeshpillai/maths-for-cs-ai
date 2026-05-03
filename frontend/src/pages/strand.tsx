import { createResource, createMemo, For, Show } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { fetchStrand, type StrandInfo } from "../lib/api";
import { isCompleted } from "../lib/progress";

function lessonLabel(slug: string): string {
  // Slugs look like "02-mental-addition-subtraction".
  // Drop the numeric prefix, title-case the rest.
  const m = slug.match(/^(\d+)-(.+)$/);
  const n = m ? m[1] : "";
  const rest = (m ? m[2] : slug)
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return n ? `${n}. ${rest}` : rest;
}

export default function Strand() {
  const params = useParams<{ slug: string }>();
  const [strand] = createResource(() => params.slug, fetchStrand);

  return (
    <div class="strand">
      <Show when={strand.loading}>
        <p class="loading">Loading strand...</p>
      </Show>
      <Show when={strand.error}>
        <p class="error">Strand not found.</p>
      </Show>
      <Show when={strand()}>
        {(s) => <StrandView info={s()} />}
      </Show>
    </div>
  );
}

function StrandView(props: { info: StrandInfo }) {
  const totals = createMemo(() => {
    let total = 0;
    let done = 0;
    for (const level of props.info.levels) {
      for (const slug of level.lessons) {
        total += 1;
        if (isCompleted(level.tier_id, slug)) done += 1;
      }
    }
    return { total, done };
  });

  return (
    <>
      <header class="strand-header">
        <p class="strand-eyebrow">
          <A href="/">← Home</A>
        </p>
        <h1 class="strand-title">{props.info.title}</h1>
        <p class="strand-description">{props.info.description}</p>
        <p class="strand-progress">
          Progress: <strong>{totals().done}</strong> of {totals().total}{" "}
          {totals().total === 1 ? "lesson" : "lessons"} complete
        </p>
      </header>

      <For each={props.info.levels}>
        {(level) => (
          <section class="strand-level">
            <h2 class="strand-level-title">{level.title}</h2>
            <ol class="strand-lesson-list">
              <For each={level.lessons}>
                {(slug) => {
                  const done = isCompleted(level.tier_id, slug);
                  return (
                    <li class={`strand-lesson ${done ? "done" : ""}`}>
                      <A
                        href={`/lesson/${level.tier_id}/${slug}`}
                        class="strand-lesson-link"
                      >
                        <span class="strand-lesson-check">
                          {done ? "✓" : "○"}
                        </span>
                        <span class="strand-lesson-label">
                          {lessonLabel(slug)}
                        </span>
                      </A>
                    </li>
                  );
                }}
              </For>
            </ol>
          </section>
        )}
      </For>
    </>
  );
}
