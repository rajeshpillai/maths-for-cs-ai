import { createSignal, Show } from "solid-js";
import { runPython } from "../lib/pyodide";
import CodeEditor from "./code-editor";

interface CodeRunnerProps {
  code: string;
}

export default function CodeRunner(props: CodeRunnerProps) {
  const [output, setOutput] = createSignal<string | null>(null);
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
    // Force re-mount of editor by changing key
    setEditorKey((k) => k + 1);
  }

  async function handleRun() {
    setRunning(true);
    setOutput(null);
    setHasError(false);
    try {
      if (!loaded()) {
        setOutput("Loading Python runtime...");
      }
      const result = await runPython(currentCode());
      setLoaded(true);
      setHasError(result.includes("Error") || result.includes("Traceback"));
      setOutput(result || "(no output)");
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
      <Show when={output() !== null}>
        <pre class={`code-output${hasError() ? " error-output" : ""}`}>{output()}</pre>
      </Show>
    </div>
  );
}
