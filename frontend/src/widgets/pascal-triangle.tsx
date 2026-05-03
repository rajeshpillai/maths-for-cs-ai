import { createSignal, createMemo, For, Show, type Component } from "solid-js";
import { renderMath } from "./widget-helpers";

interface Props {
  /** Number of rows to display (row 0 is the top "1"). Default 8. */
  rows?: number;
  /** Highlight a specific cell (row, k) on initial render. */
  highlightRow?: number;
  highlightK?: number;
}

function pascal(rowCount: number): number[][] {
  const t: number[][] = [];
  for (let n = 0; n < rowCount; n++) {
    const row: number[] = [];
    for (let k = 0; k <= n; k++) {
      if (k === 0 || k === n) row.push(1);
      else row.push(t[n - 1][k - 1] + t[n - 1][k]);
    }
    t.push(row);
  }
  return t;
}

const PascalTriangle: Component<Props> = (props) => {
  const rows = () => Math.min(15, Math.max(1, props.rows ?? 8));
  const triangle = createMemo(() => pascal(rows()));

  const [hover, setHover] = createSignal<{ n: number; k: number } | null>(
    props.highlightRow !== undefined && props.highlightK !== undefined
      ? { n: props.highlightRow, k: props.highlightK }
      : null,
  );

  const rowSums = createMemo(() =>
    triangle().map((row) => row.reduce((a, b) => a + b, 0)),
  );

  return (
    <div>
      <div
        class="widget-prompt"
        style="text-align: center"
        innerHTML={renderMath(
          `Pascal's Triangle — first ${rows()} rows. Hover any cell to see $\\binom{n}{k}$ details.`,
        )}
      />

      <div
        style={`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          font-family: ui-monospace, SFMono-Regular, monospace;
          font-size: 0.95rem;
        `}
      >
        <For each={triangle()}>
          {(row, n) => (
            <div
              style={`
                display: flex;
                gap: 0.4rem;
                align-items: center;
                white-space: nowrap;
              `}
            >
              <span
                class="widget-explain"
                style="width: 2.5rem; text-align: right; font-size: 0.8rem"
              >
                row {n()}
              </span>
              <For each={row}>
                {(value, k) => {
                  const isHover = () => {
                    const h = hover();
                    return h !== null && h.n === n() && h.k === k();
                  };
                  return (
                    <span
                      onMouseEnter={() => setHover({ n: n(), k: k() })}
                      onMouseLeave={() => setHover(null)}
                      style={`
                        min-width: 2.5rem;
                        padding: 0.15rem 0.5rem;
                        text-align: center;
                        border-radius: 4px;
                        cursor: help;
                        background: ${isHover() ? "var(--accent)" : "var(--bg)"};
                        color: ${isHover() ? "#1e1e2e" : "var(--text)"};
                        border: 1px solid var(--border);
                        font-weight: ${isHover() ? "600" : "400"};
                      `}
                      title={`C(${n()}, ${k()}) = ${value}`}
                    >
                      {value}
                    </span>
                  );
                }}
              </For>
              <span
                class="widget-explain"
                style="margin-left: 0.5rem; font-size: 0.8rem"
                innerHTML={renderMath(
                  `sum = ${rowSums()[n()]} = $2^{${n()}}$`,
                )}
              />
            </div>
          )}
        </For>
      </div>

      <Show when={hover()}>
        {(h) => {
          const v = () => triangle()[h().n][h().k];
          return (
            <div
              class="widget-feedback"
              style="margin-top: 1rem; background: var(--card-bg); border-color: var(--accent); color: var(--text)"
            >
              <strong
                innerHTML={renderMath(
                  `$\\binom{${h().n}}{${h().k}} = ${v()}$`,
                )}
              />
              <div class="widget-explain" style="margin-top: 0.25rem">
                The number of ways to choose {h().k} items from {h().n}{" "}
                — equivalently, the count of {h().k}-element subsets of an{" "}
                {h().n}-element set.
                <Show when={h().k === 0 || h().k === h().n}>
                  {" "}This is one of the boundary "1"s — there is one way to
                  choose nothing or to choose everything.
                </Show>
              </div>
            </div>
          );
        }}
      </Show>
    </div>
  );
};

export default PascalTriangle;
