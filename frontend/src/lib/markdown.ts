import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import katex from "katex";

hljs.registerLanguage("python", python);

// LaTeX rendering happens in two phases so KaTeX's HTML output
// (which contains '|', commas, and SVG path data) doesn't get re-parsed
// as markdown — most notably, '|' inside <svg> would otherwise be treated
// as a table cell separator and explode tables.
//
// Phase 1 (extractLatex): scan the raw markdown for $$...$$ and $...$,
//   render each match with KaTeX, store the HTML in a list, and replace
//   the source span with a placeholder element that marked will pass
//   through unmodified (inline HTML is allowed in markdown).
// Phase 2 (restoreLatex): after marked has produced HTML, swap each
//   placeholder back for the real KaTeX HTML.

interface LatexExtraction {
  md: string;
  rendered: string[];
}

function extractLatex(md: string): LatexExtraction {
  const rendered: string[] = [];

  function placeholder(html: string, block: boolean): string {
    const id = rendered.length;
    rendered.push(html);
    return block
      ? `<div data-katex-block="${id}"></div>`
      : `<span data-katex-inline="${id}"></span>`;
  }

  // Block math: $$...$$ — render in display mode.
  md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
    try {
      return placeholder(
        katex.renderToString(tex.trim(), { displayMode: true }),
        true,
      );
    } catch {
      return `<pre class="katex-error">${tex}</pre>`;
    }
  });

  // Inline math: $...$ (but not $$, and not across newlines).
  md = md.replace(/(?<!\$)\$(?!\$)([^\n$]+?)(?<!\$)\$(?!\$)/g, (_, tex) => {
    try {
      return placeholder(
        katex.renderToString(tex.trim(), { displayMode: false }),
        false,
      );
    } catch {
      return `<code class="katex-error">${tex}</code>`;
    }
  });

  return { md, rendered };
}

function restoreLatex(html: string, rendered: string[]): string {
  return html
    .replace(
      /<div data-katex-block="(\d+)"><\/div>/g,
      (_, id) => rendered[Number(id)] ?? "",
    )
    .replace(
      /<span data-katex-inline="(\d+)"><\/span>/g,
      (_, id) => rendered[Number(id)] ?? "",
    );
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
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  // Match "Foundation N, Lesson M" references
  let result = md.replace(
    /Foundation (\d+),\s*Lesson\s+(\d+)(?::\s*([^\n(]*))?/g,
    (match, foundation, lesson, _title) => {
      const tierStr = `foundation-${foundation}`;
      const lessonNum = lesson.padStart(2, "0");
      return `<a href="${base}/lesson/${tierStr}/${lessonNum}" class="prereq-link" data-tier="${tierStr}" data-lesson="${lessonNum}">${match.trim()}</a>`;
    }
  );
  // Match "Tier N, Lesson M" references — map to new directory names
  result = result.replace(
    /Tier (\d+),\s*Lesson\s+(\d+)(?::\s*([^\n(]*))?/g,
    (match, tier, lesson, _title) => {
      const oldTier = `tier-${tier}`;
      const tierStr = PREREQ_MAP[oldTier] ?? oldTier;
      const lessonNum = lesson.padStart(2, "0");
      return `<a href="${base}/lesson/${tierStr}/${lessonNum}" class="prereq-link" data-tier="${tierStr}" data-lesson="${lessonNum}">${match.trim()}</a>`;
    }
  );
  return result;
}

export function renderMarkdown(raw: string): string {
  const withLinks = linkPrerequisites(raw);
  const { md, rendered } = extractLatex(withLinks);
  const html = marked.parse(md) as string;
  return restoreLatex(html, rendered);
}
