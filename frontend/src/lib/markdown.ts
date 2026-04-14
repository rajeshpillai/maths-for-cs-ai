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

// Map old "Tier N" references to new meaningful directory names
const PREREQ_MAP: Record<string, string> = {
  "tier-0": "number-systems", "tier-1": "discrete-mathematics",
  "tier-2": "linear-algebra", "tier-3": "calculus",
  "tier-4": "probability-statistics", "tier-5": "optimisation",
  "tier-6": "neural-networks", "tier-7": "cnns",
  "tier-8": "geometry-trigonometry", "tier-9": "fourier-analysis",
  "tier-10": "advanced-ml", "tier-11": "differential-equations",
  "tier-12": "multivariable-calculus", "tier-13": "advanced-discrete-math",
  "tier-14": "advanced-statistics", "tier-15": "methods-of-proof",
  "tier-16": "abstract-algebra", "tier-17": "jee-problem-solving",
};

// Convert prerequisite references into clickable links
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
  // Match "Tier N, Lesson M" references — map to new directory names
  result = result.replace(
    /Tier (\d+),\s*Lesson\s+(\d+)(?::\s*([^\n(]*))?/g,
    (match, tier, lesson, _title) => {
      const oldTier = `tier-${tier}`;
      const tierStr = PREREQ_MAP[oldTier] ?? oldTier;
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
