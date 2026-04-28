import { createSignal, For, Show } from "solid-js";
import { runPython } from "../lib/pyodide";
import CodeEditor from "./code-editor";

interface CodeRunnerProps {
  code: string;
}

export default function CodeRunner(props: CodeRunnerProps) {
  const [output, setOutput] = createSignal<string | null>(null);
  const [figures, setFigures] = createSignal<string[]>([]);
  const [hasError, setHasError] = createSignal(false);
  const [running, setRunning] = createSignal(false);
  const [loaded, setLoaded] = createSignal(false);
  const [currentCode, setCurrentCode] = createSignal(props.code);
  const [modified, setModified] = createSignal(false);
  const [editorKey, setEditorKey] = createSignal(0);

  function handleCodeChange(code: string) {
    setCurrentCode(code);
    setModified(code !== props.code);
  }

  function handleReset() {
    setCurrentCode(props.code);
    setModified(false);
    setOutput(null);
    setFigures([]);
    // Force re-mount of editor by changing key
    setEditorKey((k) => k + 1);
  }

  async function handleRun() {
    setRunning(true);
    setOutput(null);
    setFigures([]);
    setHasError(false);
    try {
      if (!loaded()) {
        setOutput("Loading Python runtime (and any imported packages on first run)...");
      }
      const result = await runPython(currentCode());
      setLoaded(true);
      setHasError(result.hasError || result.stdout.includes("Traceback"));
      setOutput(result.stdout || (result.figures.length === 0 ? "(no output)" : ""));
      setFigures(result.figures);
    } catch (err: any) {
      setHasError(true);
      setOutput(`Error: ${err.message || err}`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div class="code-runner">
      <div class="code-runner-header">
        <span class="code-lang">python</span>
        <div class="code-runner-actions">
          <Show when={modified()}>
            <button class="reset-btn" onClick={handleReset} title="Revert to original code">
              Reset
            </button>
          </Show>
          <button class="run-btn" onClick={handleRun} disabled={running()}>
            {running() ? "Running..." : "Run"}
          </button>
        </div>
      </div>
      {(() => {
        // Keyed re-render to reset editor content
        void editorKey();
        return (
          <CodeEditor
            initialCode={currentCode()}
            onCodeChange={handleCodeChange}
          />
        );
      })()}
      <Show when={output() !== null && output() !== ""}>
        <pre class={`code-output${hasError() ? " error-output" : ""}`}>{output()}</pre>
      </Show>
      <Show when={figures().length > 0}>
        <div class="code-figures">
          <For each={figures()}>
            {(src, i) => (
              <img class="code-figure" src={src} alt={`Figure ${i() + 1}`} />
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
