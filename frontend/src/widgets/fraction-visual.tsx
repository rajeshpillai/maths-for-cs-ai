import { createSignal, createMemo, For, Show, type Component } from "solid-js";
import { renderMath } from "./widget-helpers";

interface Props {
  numerator?: number;
  denominator?: number;
  /** "display" hides the steppers; "interactive" shows +/- controls. */
  mode?: "display" | "interactive";
}

const TAU = Math.PI * 2;
const MAX_DEN = 24;
const MIN_DEN = 2;

// Build the SVG path for a single pie slice that runs from angle a0 to a1
// around (cx, cy) with radius r. Angles in radians, 0 = "12 o'clock."
function slicePath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const x1 = cx + r * Math.sin(a0);
  const y1 = cy - r * Math.cos(a0);
  const x2 = cx + r * Math.sin(a1);
  const y2 = cy - r * Math.cos(a1);
  const largeArc = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

const FractionVisual: Component<Props> = (props) => {
  const interactive = () => (props.mode ?? "interactive") === "interactive";

  const [num, setNum] = createSignal(
    Math.max(0, Math.floor(props.numerator ?? 1)),
  );
  const [den, setDen] = createSignal(
    Math.min(MAX_DEN, Math.max(MIN_DEN, Math.floor(props.denominator ?? 4))),
  );

  const value = createMemo(() => num() / den());
  const isProper = () => num() <= den();

  function clampNum(n: number): number {
    if (n < 0) return 0;
    return n;
  }

  function setDenSafely(d: number) {
    if (d < MIN_DEN || d > MAX_DEN) return;
    setDen(d);
    // Keep numerator within a sensible range so visuals stay readable.
    if (num() > d * 2) setNum(d * 2);
  }

  return (
    <div>
      <div class="widget-prompt" style="text-align: center; font-size: 1.4rem">
        <span
          innerHTML={renderMath(`$\\dfrac{${num()}}{${den()}}$`)}
        />
        <span class="widget-explain" style="margin-left: 0.75rem; font-size: 0.95rem">
          = {value().toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}
        </span>
      </div>

      <Show when={interactive()}>
        <div
          class="widget-controls"
          style="justify-content: center; gap: 1.5rem; margin-bottom: 0.75rem"
        >
          <div style="display: flex; align-items: center; gap: 0.4rem">
            <span class="widget-explain">numerator</span>
            <button class="widget-button" onClick={() => setNum((n) => clampNum(n - 1))} aria-label="decrease numerator">−</button>
            <span class="widget-score" style="min-width: 2rem; text-align: center">{num()}</span>
            <button class="widget-button" onClick={() => setNum((n) => clampNum(n + 1))} aria-label="increase numerator">+</button>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem">
            <span class="widget-explain">denominator</span>
            <button class="widget-button" onClick={() => setDenSafely(den() - 1)} aria-label="decrease denominator">−</button>
            <span class="widget-score" style="min-width: 2rem; text-align: center">{den()}</span>
            <button class="widget-button" onClick={() => setDenSafely(den() + 1)} aria-label="increase denominator">+</button>
          </div>
        </div>
      </Show>

      <div style="display: grid; grid-template-columns: 100px 1fr; gap: 0.75rem 1rem; align-items: center">
        {/* Pie */}
        <span class="widget-explain">pie</span>
        <PieView num={num()} den={den()} />

        {/* Bar */}
        <span class="widget-explain">bar</span>
        <BarView num={num()} den={den()} />

        {/* Number line */}
        <span class="widget-explain">number line</span>
        <NumberLineView num={num()} den={den()} />
      </div>

      <Show when={!isProper()}>
        <div class="widget-explain" style="margin-top: 0.75rem">
          When the numerator exceeds the denominator the fraction is greater
          than $1$ — you'd need more than one whole pie to hold it. The bar
          and number line both stretch beyond a single unit to show this.
        </div>
      </Show>
    </div>
  );
};

// Use CSS theme tokens via inline style strings so the colors track
// light/dark mode. SVG attribute strings can't reference var() directly,
// but the `style=` attribute can.
const SLICE_FILLED = "var(--accent)";
const SLICE_EMPTY = "var(--border)";
const SLICE_STROKE = "var(--card-bg)";

function PieView(p: { num: number; den: number }) {
  const r = 36;
  const cx = 40;
  const cy = 40;
  // For numerators > denominator, draw multiple full pies side by side.
  const fullPies = () => Math.floor(p.num / p.den);
  const remainder = () => p.num % p.den;
  const pieCount = () => fullPies() + (remainder() > 0 || fullPies() === 0 ? 1 : 0);

  return (
    <div style="display: flex; gap: 0.5rem">
      <For each={Array.from({ length: pieCount() }, (_, i) => i)}>
        {(pieIdx) => {
          const fillCount =
            pieIdx < fullPies() ? p.den : remainder();
          return (
            <svg width="80" height="80" viewBox="0 0 80 80" role="img">
              <For each={Array.from({ length: p.den }, (_, i) => i)}>
                {(i) => (
                  <path
                    d={slicePath(cx, cy, r, (i / p.den) * TAU, ((i + 1) / p.den) * TAU)}
                    style={`fill: ${i < fillCount ? SLICE_FILLED : SLICE_EMPTY}; stroke: ${SLICE_STROKE}; stroke-width: 1`}
                  />
                )}
              </For>
            </svg>
          );
        }}
      </For>
    </div>
  );
}

function BarView(p: { num: number; den: number }) {
  // Draw cells out to the next whole-unit boundary.
  const totalCells = () => Math.max(p.den, Math.ceil(p.num / p.den) * p.den);
  const cellWidth = () => 360 / totalCells();
  const height = 28;
  return (
    <svg width="360" height={height} viewBox={`0 0 360 ${height}`} role="img">
      <For each={Array.from({ length: totalCells() }, (_, i) => i)}>
        {(i) => (
          <rect
            x={i * cellWidth()}
            y={0}
            width={cellWidth()}
            height={height}
            style={`fill: ${i < p.num ? SLICE_FILLED : SLICE_EMPTY}; stroke: ${SLICE_STROKE}; stroke-width: 1`}
          />
        )}
      </For>
    </svg>
  );
}

function NumberLineView(p: { num: number; den: number }) {
  const totalUnits = () => Math.max(1, Math.ceil(p.num / p.den));
  const width = 360;
  const padding = 12;
  const trackWidth = () => width - padding * 2;
  const xAt = (v: number) => padding + (v / totalUnits()) * trackWidth();
  const value = () => p.num / p.den;
  const tickValues = () => {
    const out: number[] = [];
    for (let i = 0; i <= totalUnits() * p.den; i++) out.push(i / p.den);
    return out;
  };
  return (
    <svg width={width} height="40" viewBox={`0 0 ${width} 40`} role="img">
      <line x1={padding} y1={20} x2={width - padding} y2={20} style="stroke: var(--text-muted); stroke-width: 2" />
      <For each={tickValues()}>
        {(v) => {
          const isInteger = Number.isInteger(v);
          return (
            <>
              <line
                x1={xAt(v)}
                y1={isInteger ? 12 : 16}
                x2={xAt(v)}
                y2={isInteger ? 28 : 24}
                style={`stroke: var(--text-muted); stroke-width: ${isInteger ? 1.5 : 1}`}
              />
              <Show when={isInteger}>
                <text
                  x={xAt(v)}
                  y={38}
                  text-anchor="middle"
                  font-size="10"
                  style="fill: var(--text-muted)"
                >
                  {v}
                </text>
              </Show>
            </>
          );
        }}
      </For>
      <circle cx={xAt(value())} cy={20} r={5} style={`fill: ${SLICE_FILLED}`} />
    </svg>
  );
}

export default FractionVisual;
