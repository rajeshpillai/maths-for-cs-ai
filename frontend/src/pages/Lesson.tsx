import { createResource, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import { fetchLesson } from "../lib/api";
import { renderMarkdown } from "../lib/markdown";

export default function Lesson() {
  const params = useParams<{ tier: string; slug: string }>();

  const [lesson] = createResource(
    () => ({ tier: params.tier, slug: params.slug }),
    ({ tier, slug }) => fetchLesson(tier, slug)
  );

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
          <article
            class="lesson-content"
            innerHTML={renderMarkdown(data().content)}
          />
        )}
      </Show>
    </div>
  );
}
