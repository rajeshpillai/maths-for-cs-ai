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

export function renderMarkdown(raw: string): string {
  const withLatex = renderLatex(raw);
  return marked.parse(withLatex) as string;
}
