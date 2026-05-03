import { createSignal, For, Show, type Component } from "solid-js";
import { renderMath } from "./widget-helpers";

interface Step {
  math?: string;
  prose?: string;
}

interface Props {
  steps: Step[];
  /** Optional title shown above the steps. */
  title?: string;
}

const StepRevealer: Component<Props> = (props) => {
  const [shown, setShown] = createSignal(1);
  const total = () => props.steps?.length ?? 0;
  const visible = () => props.steps?.slice(0, shown()) ?? [];
  const atEnd = () => shown() >= total();
  const atStart = () => shown() <= 1;

  return (
    <div>
      <Show when={props.title}>
        <div class="widget-prompt">{props.title}</div>
      </Show>

      <ol style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem">
        <For each={visible()}>
          {(step, i) => (
            <li style="padding: 0.5rem 0.75rem; border-left: 3px solid var(--accent, #1f6feb); background: var(--bg, #fafbfc); border-radius: 0 4px 4px 0">
              <div style="font-size: 0.85rem; color: var(--text-muted, #57606a); margin-bottom: 0.25rem">
                Step {i() + 1}
              </div>
              <Show when={step.math}>
                <div
                  style="margin: 0.25rem 0"
                  innerHTML={renderMath(`$$${step.math}$$`)}
                />
              </Show>
              <Show when={step.prose}>
                <div
                  style="font-size: 0.95rem; line-height: 1.5"
                  innerHTML={renderMath(step.prose!)}
                />
              </Show>
            </li>
          )}
        </For>
      </ol>

      <div class="widget-controls" style="margin-top: 0.75rem">
        <button
          class="widget-button"
          onClick={() => setShown(1)}
          disabled={atStart()}
        >
          Restart
        </button>
        <button
          class="widget-button"
          onClick={() => setShown((n) => Math.max(1, n - 1))}
          disabled={atStart()}
        >
          ← Hide last
        </button>
        <button
          class="widget-button primary"
          onClick={() => setShown((n) => Math.min(total(), n + 1))}
          disabled={atEnd()}
        >
          {atEnd() ? "All shown" : "Reveal next →"}
        </button>
        <span class="widget-explain">
          {shown()} / {total()} steps
        </span>
      </div>
    </div>
  );
};

export default StepRevealer;
