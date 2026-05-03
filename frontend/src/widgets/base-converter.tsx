import { createSignal, createMemo, For, Show, type Component } from "solid-js";

interface Props {
  default?: number;
  bases?: number[];
}

const DIGIT = "0123456789ABCDEF";

function digitsInBase(n: number, base: number): string[] {
  // Defensive: a base outside [2, 16] would either loop forever (base=1
  // never reduces v) or produce garbage. Bail with a single placeholder.
  if (!Number.isInteger(base) || base < 2 || base > 16) return ["?"];
  if (n === 0) return ["0"];
  const out: string[] = [];
  let v = Math.floor(n);
  while (v > 0) {
    out.push(DIGIT[v % base]);
    v = Math.floor(v / base);
  }
  return out.reverse();
}

function baseSubscript(b: number): string {
  // Unicode subscript digits, fine for the bases we care about (2..36).
  const sub = "₀₁₂₃₄₅₆₇₈₉";
  return String(b)
    .split("")
    .map((c) => sub[Number(c)] ?? c)
    .join("");
}

const BaseConverter: Component<Props> = (props) => {
  const bases = () => props.bases ?? [2, 10, 16];
  const [raw, setRaw] = createSignal(String(props.default ?? 42));
  const [hoveredPower, setHoveredPower] = createSignal<number | null>(null);

  const value = createMemo(() => {
    const n = Number(raw());
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : null;
  });

  return (
    <div>
      <div class="widget-prompt">
        <label>
          Number (decimal):{" "}
          <input
            class="widget-input"
            type="number"
            min="0"
            value={raw()}
            onInput={(e) => setRaw(e.currentTarget.value)}
            aria-label="Number to convert"
          />
        </label>
        <Show when={hoveredPower() !== null}>
          <span class="widget-explain">
            {" "}— place value: 10^{hoveredPower()!} = {Math.pow(10, hoveredPower()!)}{" "}
            (and the same exponent applies in any base)
          </span>
        </Show>
      </div>
      <Show
        when={value() !== null}
        fallback={<div class="widget-feedback incorrect">Enter a non-negative integer.</div>}
      >
        <div style="display: grid; grid-template-columns: 4rem 1fr; gap: 0.5rem; align-items: baseline; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 1.2rem;">
          <For each={bases()}>
            {(b) => {
              const digits = () => digitsInBase(value()!, b);
              return (
                <>
                  <div style="opacity: 0.6; font-family: inherit; font-size: 0.85rem">
                    base {b}
                  </div>
                  <div>
                    <For each={digits()}>
                      {(d, i) => {
                        const power = () => digits().length - 1 - i();
                        const placeValue = () => Math.pow(b, power());
                        const partial = () =>
                          parseInt(d, 16) * placeValue();
                        return (
                          <span
                            style="padding: 0.1rem 0.25rem; cursor: help; border-radius: 3px;"
                            classList={{
                              "digit-hover":
                                hoveredPower() === power(),
                            }}
                            onMouseEnter={() => setHoveredPower(power())}
                            onMouseLeave={() => setHoveredPower(null)}
                            title={`${d} × ${b}^${power()} = ${d} × ${placeValue()} = ${partial()}`}
                          >
                            {d}
                          </span>
                        );
                      }}
                    </For>
                    <span style="opacity: 0.6">{baseSubscript(b)}</span>
                  </div>
                </>
              );
            }}
          </For>
        </div>
        <div class="widget-explain" style="margin-top: 0.75rem">
          Hover any digit to see its place value. The number itself stays the
          same — only the symbols and the implied powers of the base change.
        </div>
      </Show>
      <style>{`
        .digit-hover {
          background: #fff8c5;
          outline: 2px solid #d4a72c;
        }
      `}</style>
    </div>
  );
};

export default BaseConverter;
