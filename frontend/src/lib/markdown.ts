import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import katex from "katex";

hljs.registerLanguage("python", python);

// Render LaTeX blocks: $$...$$ and inline $...$
function renderLatex(md: string): string {
  // Block math: $$...$$
  md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex.trim(), { displayMode: true });
    } catch {
      return `<pre class="katex-error">${tex}</pre>`;
    }
  });

  // Inline math: $...$ (but not $$)
  md = md.replace(/(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)/g, (_, tex) => {
    try {
      return katex.renderToString(tex.trim(), { displayMode: false });
    } catch {
      return `<code class="katex-error">${tex}</code>`;
    }
  });

  return md;
}

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return code;
    },
  })
);

// Convert prerequisite references like "Tier 2, Lesson 4" into clickable links
function linkPrerequisites(md: string): string {
  // Match patterns like:
  //   "Tier 0, Lesson 1: Number Systems"
  //   "Tier 2, Lesson 4: Matrix Multiplication"
  //   "Tier 10, Lesson 4: Markov Chains"
  //   "Tier 6, Lessons 1–4"
  //   "Tier 9, Lessons 1–5"
  return md.replace(
    /Tier (\d+),\s*Lesson\s+(\d+)(?::\s*([^\n(]*))?/g,
    (match, tier, lesson, title) => {
      const tierStr = `tier-${tier}`;
      const lessonNum = lesson.padStart(2, "0");
      // We don't know the exact slug, but the sidebar will have it.
      // Link to the tier/lesson pattern — the Lesson page will resolve it.
      const label = title ? title.trim() : match;
      return `<a href="/lesson/${tierStr}/${lessonNum}" class="prereq-link" data-tier="${tierStr}" data-lesson="${lessonNum}">${match.trim()}</a>`;
    }
  );
}

export function renderMarkdown(raw: string): string {
  const withLinks = linkPrerequisites(raw);
  const withLatex = renderLatex(withLinks);
  return marked.parse(withLatex) as string;
}
