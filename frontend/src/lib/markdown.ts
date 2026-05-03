import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import katex from "katex";

hljs.registerLanguage("python", python);

// Pipeline phases (raw markdown → final HTML):
//
//   raw md
//     ↓ extractWidgets   — :::widget directives → <div data-widget>
//     ↓ extractLatex     — $$..$$ / $..$ → KaTeX HTML in placeholders
//     ↓ marked.parse     — markdown → HTML
//     ↓ restoreLatex     — placeholders → KaTeX HTML
//   final html
//
// Widget directives leave a `<div data-widget="TYPE" data-props="JSON">`
// stub that marked passes through unchanged (inline HTML is allowed). The
// lesson view scans for these and mounts Solid widget components.
//
// LaTeX rendering happens in two phases so KaTeX's HTML output
// (which contains '|', commas, and SVG path data) doesn't get re-parsed
// as markdown — most notably, '|' inside <svg> would otherwise be treated
// as a table cell separator and explode tables.

interface LatexExtraction {
  md: string;
  rendered: string[];
}

// Single-line: ::: widget type=X key=value key2="value with spaces" :::
// The directive begins with `:::widget` and ends with `:::` on the same line.
// Trailing whitespace MUST be `[ \t]*` (not `\s*`) so the match doesn't eat
// the newline after `:::` — losing it would collapse the blank line
// separating the directive from the next markdown block.
const SINGLE_LINE_WIDGET_RE =
  /^:::widget\s+type=([\w-]+)[ \t]*([^\n]*?):::[ \t]*$/gm;

// Multi-line: ::: widget type=X / { json body } / :::
// Closing `:::` must be alone on its own line, otherwise this regex would
// run greedy and swallow content across single-line directives.
const MULTI_LINE_WIDGET_RE =
  /^:::widget\s+type=([\w-]+)[ \t]*([^\n]*)\n([\s\S]*?)\n:::[ \t]*$/gm;

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function coerceScalar(raw: string): string | number | boolean {
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (raw !== "" && !isNaN(Number(raw))) return Number(raw);
  return raw;
}

// Parse `key=value key2="quoted value" key3=42 key4=[1,2,3]` into an object.
// Values are auto-coerced: bare numbers become numbers, true/false become
// booleans, JSON literals starting with `[` or `{` are parsed as JSON,
// everything else stays as a string.
function parseInlineProps(s: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  // Match key=value where value is one of: quoted string, JSON array,
  // JSON object, or bare token (no whitespace).
  const re =
    /([\w-]+)=(?:"((?:[^"\\]|\\.)*)"|(\[[^\]]*\])|(\{[^}]*\})|([^\s]+))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s)) !== null) {
    const [, key, quoted, arr, obj, bare] = m;
    if (quoted !== undefined) {
      // Only unescape `\"` (embedded quote) and `\\` (literal backslash).
      // Critical: do NOT strip other backslashes — LaTeX commands like
      // `\mathtt`, `\cdot`, `\frac` would be silently broken otherwise.
      out[key] = quoted.replace(/\\(["\\])/g, "$1");
    } else if (arr !== undefined || obj !== undefined) {
      const literal = (arr ?? obj)!;
      try {
        out[key] = JSON.parse(literal);
      } catch {
        out[key] = literal;
      }
    } else {
      out[key] = coerceScalar(bare);
    }
  }
  return out;
}

// Extract :::widget directives, replacing each with a placeholder that
// embeds the widget type and JSON-encoded props as data attributes. The
// placeholder is inline HTML so marked passes it through unchanged.
function extractWidgets(md: string): string {
  // Multi-line first so its `:::` doesn't collide with the single-line form.
  md = md.replace(
    MULTI_LINE_WIDGET_RE,
    (_, type: string, inlineProps: string, body: string) => {
      const props: Record<string, unknown> = inlineProps
        ? parseInlineProps(inlineProps)
        : {};
      const trimmed = body.trim();
      if (trimmed) {
        try {
          Object.assign(props, JSON.parse(trimmed));
        } catch {
          // Leave a visible error inline rather than silently dropping the body.
          return `<pre class="widget-error">widget body for type=${type} is not valid JSON</pre>`;
        }
      }
      const json = escapeHtmlAttr(JSON.stringify(props));
      return `<div data-widget="${type}" data-props="${json}"></div>`;
    },
  );
  md = md.replace(
    SINGLE_LINE_WIDGET_RE,
    (_, type: string, inlineProps: string) => {
      const props = parseInlineProps(inlineProps);
      const json = escapeHtmlAttr(JSON.stringify(props));
      return `<div data-widget="${type}" data-props="${json}"></div>`;
    },
  );
  return md;
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

  // Mask code spans and widget-directive placeholders before LaTeX
  // extraction so '$' that lives inside them (e.g. inline math in a
  // widget's `prompt` prop, or matplotlib mathtext "$2^k$" in Python)
  // isn't mistaken for KaTeX inline math.
  // Order matters: fenced code first, inline code, then widget placeholders.
  const codeStash: string[] = [];
  const stash = (s: string): string => {
    const id = codeStash.length;
    codeStash.push(s);
    return `CODESTASH${id}END`;
  };
  md = md.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, stash);
  md = md.replace(/`[^`\n]+`/g, stash);
  md = md.replace(/<div data-widget="[^"]*" data-props="[^"]*"><\/div>/g, stash);

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

  md = md.replace(/CODESTASH(\d+)END/g, (_, id) => codeStash[Number(id)]);

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
  const withWidgets = extractWidgets(withLinks);
  const { md, rendered } = extractLatex(withWidgets);
  const html = marked.parse(md) as string;
  return restoreLatex(html, rendered);
}
