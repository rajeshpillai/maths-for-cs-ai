import { createSignal } from "solid-js";
import { runPython } from "../lib/pyodide";

interface CodeRunnerProps {
  code: string;
  highlightedHtml: string;
}

export default function CodeRunner(props: CodeRunnerProps) {
  const [output, setOutput] = createSignal<string | null>(null);
  const [running, setRunning] = createSignal(false);
  const [loaded, setLoaded] = createSignal(false);

  async function handleRun() {
    setRunning(true);
    setOutput(null);
    try {
      if (!loaded()) {
        setOutput("Loading Python runtime...");
      }
      const result = await runPython(props.code);
      setLoaded(true);
      setOutput(result || "(no output)");
    } catch (err: any) {
      setOutput(`Error: ${err.message || err}`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div class="code-runner">
      <div class="code-runner-header">
        <span class="code-lang">python</span>
        <button
          class="run-btn"
          onClick={handleRun}
          disabled={running()}
        >
          {running() ? "Running..." : "Run"}
        </button>
      </div>
      <pre class="code-block">
        <code class="hljs language-python" innerHTML={props.highlightedHtml} />
      </pre>
      {output() !== null && (
        <pre class="code-output">{output()}</pre>
      )}
    </div>
  );
}
