import {
  createSignal,
  createMemo,
  For,
  Show,
  type Component,
} from "solid-js";

interface Props {
  /** Built-in experiment type. See EXPERIMENTS below. */
  experiment: keyof typeof EXPERIMENTS;
  /** How many trials a single "Run" click adds. Default 100. */
  step?: number;
  /** Initial seed; reseeded by Reset. */
  seed?: number;
  /** Optional explicit "success" target (depends on the experiment). */
  target?: string | number;
  /** Show the theoretical probability as a horizontal reference line. */
  showTheoretical?: boolean;
}

interface ExperimentDef {
  /** Human label. */
  label: string;
  /** All possible outcomes, each labelled. The order is the histogram order. */
  outcomes: string[];
  /** Compute one trial's outcome from a uniform [0, 1) value. */
  draw(rng: () => number): string;
  /** What "success" means for the line plot. Default: target as a string. */
  matches(outcome: string, target: string | number | undefined): boolean;
  /** Theoretical P(success) under the experiment's standard target. */
  theoretical(target: string | number | undefined): number;
}

const EXPERIMENTS: Record<string, ExperimentDef> = {
  "fair-coin": {
    label: "Fair coin",
    outcomes: ["heads", "tails"],
    draw: (rng) => (rng() < 0.5 ? "heads" : "tails"),
    matches: (o, t) => o === String(t ?? "heads"),
    theoretical: () => 0.5,
  },
  "fair-die": {
    label: "Fair six-sided die",
    outcomes: ["1", "2", "3", "4", "5", "6"],
    draw: (rng) => String(1 + Math.floor(rng() * 6)),
    matches: (o, t) => o === String(t ?? "6"),
    theoretical: () => 1 / 6,
  },
  "two-coins": {
    label: "Two fair coins",
    outcomes: ["HH", "HT", "TH", "TT"],
    draw: (rng) => {
      const a = rng() < 0.5 ? "H" : "T";
      const b = rng() < 0.5 ? "H" : "T";
      return a + b;
    },
    matches: (o, t) => o === String(t ?? "HH"),
    theoretical: () => 0.25,
  },
  "sum-of-two-dice": {
    label: "Sum of two fair dice",
    outcomes: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    draw: (rng) => {
      const a = 1 + Math.floor(rng() * 6);
      const b = 1 + Math.floor(rng() * 6);
      return String(a + b);
    },
    matches: (o, t) => o === String(t ?? "7"),
    theoretical: (t) => {
      const target = Number(t ?? 7);
      // Number of (a, b) pairs with a + b = target, where a, b in 1..6.
      let ways = 0;
      for (let a = 1; a <= 6; a++) {
        const b = target - a;
        if (b >= 1 && b <= 6) ways += 1;
      }
      return ways / 36;
    },
  },
};

// mulberry32 — same PRNG as drill-generators.ts. Re-implemented locally
// to keep widget modules independent.
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ProbabilitySim: Component<Props> = (props) => {
  const exp = () => EXPERIMENTS[props.experiment];
  const step = () => props.step ?? 100;

  // PRNG state held in a `let` so it advances across "Run" clicks and
  // can be reseeded by Reset.
  let rng = mulberry32(props.seed ?? Math.floor(Math.random() * 2 ** 31));

  const [counts, setCounts] = createSignal<Record<string, number>>({});
  const [trials, setTrials] = createSignal(0);
  const [hits, setHits] = createSignal(0);

  function runMore() {
    const e = exp();
    if (!e) return;
    const next = { ...counts() };
    let h = hits();
    for (let i = 0; i < step(); i++) {
      const o = e.draw(rng);
      next[o] = (next[o] ?? 0) + 1;
      if (e.matches(o, props.target)) h += 1;
    }
    setCounts(next);
    setTrials((t) => t + step());
    setHits(h);
  }

  function reset() {
    rng = mulberry32(Math.floor(Math.random() * 2 ** 31));
    setCounts({});
    setTrials(0);
    setHits(0);
  }

  const theoretical = createMemo(() => exp()?.theoretical(props.target) ?? 0);
  const observed = () => (trials() === 0 ? 0 : hits() / trials());
  const targetLabel = () =>
    String(props.target ?? exp()?.outcomes[exp()!.outcomes.length - 1] ?? "");

  return (
    <div>
      <div class="widget-prompt">
        <strong>{exp()?.label ?? "Unknown experiment"}</strong>
        <span class="widget-explain"> — target: <code>{targetLabel()}</code></span>
      </div>

      <div class="widget-controls">
        <button class="widget-button primary" onClick={runMore}>
          Run +{step()}
        </button>
        <button class="widget-button" onClick={reset}>
          Reset
        </button>
        <span class="widget-explain">
          Trials: <span class="widget-score">{trials()}</span>
        </span>
        <Show when={trials() > 0}>
          <span class="widget-explain">
            Observed P({targetLabel()}) ={" "}
            <span class="widget-score">{observed().toFixed(4)}</span>
            {(props.showTheoretical ?? true) ? (
              <>
                {" "}— theoretical{" "}
                <span class="widget-score">{theoretical().toFixed(4)}</span>
              </>
            ) : null}
          </span>
        </Show>
      </div>

      <Histogram
        outcomes={exp()?.outcomes ?? []}
        counts={counts()}
        trials={trials()}
        target={targetLabel()}
        theoretical={theoretical()}
        showTheoretical={props.showTheoretical ?? true}
      />
    </div>
  );
};

function Histogram(p: {
  outcomes: string[];
  counts: Record<string, number>;
  trials: number;
  target: string;
  theoretical: number;
  showTheoretical: boolean;
}) {
  const W = 480;
  const H = 200;
  const PAD_L = 36;
  const PAD_R = 12;
  const PAD_T = 16;
  const PAD_B = 36;
  const innerW = () => W - PAD_L - PAD_R;
  const innerH = () => H - PAD_T - PAD_B;
  const n = () => p.outcomes.length;
  const barWidth = () => (innerW() / n()) * 0.78;
  const barGap = () => (innerW() / n()) * 0.22;
  // Each bar's left edge.
  const barX = (i: number) => PAD_L + i * (barWidth() + barGap()) + barGap() / 2;
  const proportion = (label: string) =>
    p.trials === 0 ? 0 : (p.counts[label] ?? 0) / p.trials;
  const yMax = () => 1; // proportion scale, 0 to 1
  const yAt = (proportion: number) =>
    PAD_T + innerH() * (1 - proportion / yMax());

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img">
      {/* y-axis */}
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="#7f8b99" />
      {/* gridlines + labels */}
      <For each={[0, 0.25, 0.5, 0.75, 1]}>
        {(t) => (
          <>
            <line
              x1={PAD_L}
              x2={W - PAD_R}
              y1={yAt(t)}
              y2={yAt(t)}
              stroke="#e6e9ee"
              stroke-width="1"
            />
            <text
              x={PAD_L - 6}
              y={yAt(t) + 4}
              text-anchor="end"
              font-size="10"
              fill="#57606a"
            >
              {t.toFixed(2)}
            </text>
          </>
        )}
      </For>
      {/* x-axis */}
      <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="#7f8b99" />
      {/* theoretical reference line for the target */}
      <Show when={p.showTheoretical && p.theoretical > 0}>
        <line
          x1={PAD_L}
          x2={W - PAD_R}
          y1={yAt(p.theoretical)}
          y2={yAt(p.theoretical)}
          stroke="#d29922"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
        <text
          x={W - PAD_R}
          y={yAt(p.theoretical) - 4}
          text-anchor="end"
          font-size="10"
          fill="#d29922"
        >
          theoretical {p.theoretical.toFixed(3)}
        </text>
      </Show>
      {/* bars */}
      <For each={p.outcomes}>
        {(label, i) => {
          const prop = () => proportion(label);
          const isTarget = () => label === p.target;
          const h = () => Math.max(0, innerH() - (yAt(prop()) - PAD_T));
          return (
            <>
              <rect
                x={barX(i())}
                y={yAt(prop())}
                width={barWidth()}
                height={h()}
                fill={isTarget() ? "#1f6feb" : "#a6adc8"}
              />
              <text
                x={barX(i()) + barWidth() / 2}
                y={H - PAD_B + 14}
                text-anchor="middle"
                font-size="11"
                fill={isTarget() ? "#1f6feb" : "#57606a"}
                font-weight={isTarget() ? "600" : "400"}
              >
                {label}
              </text>
              <Show when={p.trials > 0}>
                <text
                  x={barX(i()) + barWidth() / 2}
                  y={yAt(prop()) - 4}
                  text-anchor="middle"
                  font-size="10"
                  fill="#57606a"
                >
                  {prop().toFixed(2)}
                </text>
              </Show>
            </>
          );
        }}
      </For>
    </svg>
  );
}

export default ProbabilitySim;
