import {
  createSignal,
  createMemo,
  Show,
  type Component,
} from "solid-js";
import { generateProblems, type Problem } from "./drill-generators";
import { checkNumeric } from "./widget-helpers";
import { recordDrillScore, getDrillScore } from "../lib/progress";

interface Props {
  generator: string;
  count?: number;
  mode?: "untimed" | "timed"; // timed mode is reserved for a follow-up
  target?: number; // mastery threshold (correct count) for "complete"
  /** Stable id when multiple drills appear on one page. */
  id?: string;
}

// Read the (tier, slug) for the current lesson off the URL. Drills run
// inside the Lesson page, whose route is /lesson/:tier/:slug.
function lessonKey(): { tier: string; slug: string } {
  const m = window.location.pathname.match(/\/lesson\/([^/]+)\/([^/?#]+)/);
  return { tier: m?.[1] ?? "unknown", slug: m?.[2] ?? "unknown" };
}

function seedFor(generator: string, salt: number): number {
  // Simple FNV-1a 32-bit over the generator name, mixed with the salt.
  let h = 0x811c9dc5;
  for (let i = 0; i < generator.length; i++) {
    h ^= generator.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h ^ salt) >>> 0;
}

const MentalDrill: Component<Props> = (props) => {
  const count = () => props.count ?? 10;
  const widgetId = () => props.id ?? `drill-${props.generator}`;
  const target = () => props.target ?? Math.ceil(count() * 0.8);

  // Persist the seed per (tier, slug, widgetId) in sessionStorage so
  // reload mid-session keeps the same problem set. "New set" bumps it.
  const seedStorageKey = () => {
    const { tier, slug } = lessonKey();
    return `drill-seed:${tier}/${slug}#${widgetId()}`;
  };

  const initialSeed = (() => {
    if (typeof sessionStorage === "undefined") return Date.now();
    const stored = sessionStorage.getItem(seedStorageKey());
    if (stored) return Number(stored);
    const fresh = Date.now();
    sessionStorage.setItem(seedStorageKey(), String(fresh));
    return fresh;
  })();

  const [seed, setSeed] = createSignal(initialSeed);
  const problems = createMemo<Problem[]>(() =>
    generateProblems(props.generator, count(), seedFor(props.generator, seed())),
  );

  const [idx, setIdx] = createSignal(0);
  const [value, setValue] = createSignal("");
  const [submitted, setSubmitted] = createSignal(false);
  const [correctNow, setCorrectNow] = createSignal(false);
  const [correctTotal, setCorrectTotal] = createSignal(0);

  const stored = (() => {
    const { tier, slug } = lessonKey();
    return getDrillScore(tier, slug, widgetId());
  })();

  const current = () => problems()[idx()];
  const finished = () => idx() >= count();

  function submit() {
    if (submitted()) return;
    const ok = checkNumeric(value(), current().answer);
    setCorrectNow(ok);
    setSubmitted(true);
    if (ok) setCorrectTotal((n) => n + 1);
  }

  function next() {
    setSubmitted(false);
    setCorrectNow(false);
    setValue("");
    setIdx((i) => {
      const ni = i + 1;
      if (ni >= count()) {
        const { tier, slug } = lessonKey();
        recordDrillScore(tier, slug, widgetId(), correctTotal(), count());
      }
      return ni;
    });
  }

  function reset(newSeed = false) {
    if (newSeed) {
      const fresh = Date.now();
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem(seedStorageKey(), String(fresh));
      }
      setSeed(fresh);
    }
    setIdx(0);
    setValue("");
    setSubmitted(false);
    setCorrectNow(false);
    setCorrectTotal(0);
  }

  return (
    <div>
      <div class="widget-prompt">
        <strong>Mental drill</strong> — {props.generator}
        <Show when={stored && idx() === 0 && !submitted()}>
          <span class="widget-explain">
            {" "}— last attempt: <span class="widget-score">{stored!.correct}/{stored!.total}</span>
          </span>
        </Show>
      </div>

      <Show when={!finished()} fallback={
        <div>
          <div class={`widget-feedback ${correctTotal() >= target() ? "correct" : "incorrect"}`}>
            Done. Score: <span class="widget-score">{correctTotal()}/{count()}</span>
            {correctTotal() >= target() ? " — mastery met." : " — keep practicing."}
          </div>
          <div class="widget-controls" style="margin-top: 0.5rem">
            <button class="widget-button" onClick={() => reset(false)}>
              Same problems
            </button>
            <button class="widget-button primary" onClick={() => reset(true)}>
              New set
            </button>
          </div>
        </div>
      }>
        <div class="widget-explain" style="margin-bottom: 0.25rem">
          Problem {idx() + 1} of {count()}
        </div>
        <div class="widget-prompt" style="font-size: 1.4rem">
          {current().prompt} = ?
        </div>
        <div class="widget-controls">
          <input
            class="widget-input"
            type="text"
            inputMode="decimal"
            value={value()}
            disabled={submitted()}
            onInput={(e) => setValue(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (submitted()) next();
                else submit();
              }
            }}
            aria-label={`Problem ${idx() + 1}`}
          />
          <Show when={!submitted()}>
            <button class="widget-button primary" onClick={submit}>Check</button>
          </Show>
          <Show when={submitted()}>
            <button class="widget-button primary" onClick={next}>Next</button>
          </Show>
          <span class="widget-explain">
            Score: <span class="widget-score">{correctTotal()}/{idx() + (submitted() ? 1 : 0)}</span>
          </span>
        </div>
        <Show when={submitted()}>
          <div class={`widget-feedback ${correctNow() ? "correct" : "incorrect"}`}>
            {correctNow() ? "✓ Correct" : `✗ ${current().answer}`}
          </div>
        </Show>
      </Show>
    </div>
  );
};

export default MentalDrill;
