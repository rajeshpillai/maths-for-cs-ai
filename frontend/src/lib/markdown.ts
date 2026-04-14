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

// Convert prerequisite references like "Tier 2, Lesson 4" or "Foundation 1, Lesson 3" into clickable links
function linkPrerequisites(md: string): string {
  // Match "Foundation N, Lesson M" references
  let result = md.replace(
    /Foundation (\d+),\s*Lesson\s+(\d+)(?::\s*([^\n(]*))?/g,
    (match, foundation, lesson, _title) => {
      const tierStr = `foundation-${foundation}`;
      const lessonNum = lesson.padStart(2, "0");
      return `<a href="/lesson/${tierStr}/${lessonNum}" class="prereq-link" data-tier="${tierStr}" data-lesson="${lessonNum}">${match.trim()}</a>`;
    }
  );
  // Match "Tier N, Lesson M" references
  result = result.replace(
    /Tier (\d+),\s*Lesson\s+(\d+)(?::\s*([^\n(]*))?/g,
    (match, tier, lesson, _title) => {
      const tierStr = `tier-${tier}`;
      const lessonNum = lesson.padStart(2, "0");
      return `<a href="/lesson/${tierStr}/${lessonNum}" class="prereq-link" data-tier="${tierStr}" data-lesson="${lessonNum}">${match.trim()}</a>`;
    }
  );
  return result;
}

export function renderMarkdown(raw: string): string {
  const withLinks = linkPrerequisites(raw);
  const withLatex = renderLatex(withLinks);
  return marked.parse(withLatex) as string;
}
