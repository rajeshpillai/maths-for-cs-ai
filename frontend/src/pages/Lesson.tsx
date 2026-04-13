import { createResource, createEffect, Show, onCleanup } from "solid-js";
import { render } from "solid-js/web";
import { useParams } from "@solidjs/router";
import { fetchLesson } from "../lib/api";
import { renderMarkdown } from "../lib/markdown";
import CodeRunner from "../components/CodeRunner";

export default function Lesson() {
  const params = useParams<{ tier: string; slug: string }>();
  let containerRef: HTMLElement | undefined;
  const disposers: (() => void)[] = [];

  const [lesson] = createResource(
    () => ({ tier: params.tier, slug: params.slug }),
    ({ tier, slug }) => fetchLesson(tier, slug)
  );

  function mountCodeRunners() {
    // Clean up previous mounts
    disposers.forEach((d) => d());
    disposers.length = 0;

    if (!containerRef) return;

    // Find all Python code blocks and replace them with CodeRunner
    const preBlocks = containerRef.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      const codeEl = pre.querySelector("code.hljs.language-python");
      if (!codeEl) return;

      // Extract the raw code from the highlighted HTML
      // We need to get the text content (unformatted) for execution
      const rawCode = codeEl.textContent || "";

      // Create a mount point
      const wrapper = document.createElement("div");
      pre.replaceWith(wrapper);

      const dispose = render(
        () => <CodeRunner code={rawCode} />,
        wrapper
      );
      disposers.push(dispose);
    });
  }

  createEffect(() => {
    // Re-run when lesson content changes
    if (lesson()) {
      // Wait for innerHTML to be set
      requestAnimationFrame(() => mountCodeRunners());
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
          <article
            ref={containerRef}
            class="lesson-content"
            innerHTML={renderMarkdown(data().content)}
          />
        )}
      </Show>
    </div>
  );
}
