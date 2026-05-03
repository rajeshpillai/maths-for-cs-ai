import katex from "katex";

// Render inline ($...$) and block ($$...$$) math inside a string of mixed
// prose and TeX. Used by widgets whose props arrive as raw strings (the
// markdown KaTeX pre-processor doesn't reach inside :::widget directives).
export function renderMath(text: string): string {
  return text
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex.trim(), { displayMode: true });
      } catch {
        return `<code>${tex}</code>`;
      }
    })
    .replace(/\$([^\n$]+?)\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex.trim(), { displayMode: false });
      } catch {
        return `<code>${tex}</code>`;
      }
    });
}

// Compare a learner-typed numeric answer to the expected value with an
// optional absolute tolerance. Strings like "1/2" are evaluated as fractions.
export function checkNumeric(
  input: string,
  expected: number,
  tolerance = 0,
): boolean {
  const trimmed = input.trim();
  if (!trimmed) return false;

  let parsed: number;
  if (trimmed.includes("/")) {
    const [num, den] = trimmed.split("/").map((s) => Number(s.trim()));
    if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return false;
    parsed = num / den;
  } else {
    parsed = Number(trimmed);
  }
  if (!Number.isFinite(parsed)) return false;

  return Math.abs(parsed - expected) <= tolerance;
}
