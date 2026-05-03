import { createSignal, Show, type Component } from "solid-js";
import { renderMath, checkNumeric } from "./widget-helpers";

interface Props {
  prompt: string;
  answer: number;
  tolerance?: number;
  explain?: string;
}

const NumericInput: Component<Props> = (props) => {
  const [value, setValue] = createSignal("");
  const [submitted, setSubmitted] = createSignal(false);
  const [correct, setCorrect] = createSignal(false);

  function submit() {
    const ok = checkNumeric(value(), props.answer, props.tolerance ?? 0);
    setCorrect(ok);
    setSubmitted(true);
  }

  function reset() {
    setValue("");
    setSubmitted(false);
    setCorrect(false);
  }

  return (
    <div>
      <div class="widget-prompt" innerHTML={renderMath(props.prompt)} />
      <div class="widget-controls">
        <input
          class="widget-input"
          type="text"
          inputMode="decimal"
          value={value()}
          disabled={submitted() && correct()}
          onInput={(e) => setValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          aria-label="Your answer"
        />
        <Show
          when={!submitted() || !correct()}
          fallback={
            <button class="widget-button" onClick={reset}>
              Try again
            </button>
          }
        >
          <button class="widget-button primary" onClick={submit}>
            Check
          </button>
        </Show>
      </div>
      <Show when={submitted()}>
        <div
          class={`widget-feedback ${correct() ? "correct" : "incorrect"}`}
        >
          {correct() ? "✓ Correct" : "✗ Not yet — try again"}
        </div>
        <Show when={props.explain}>
          <div
            class="widget-explain"
            innerHTML={renderMath(props.explain!)}
          />
        </Show>
      </Show>
    </div>
  );
};

export default NumericInput;
