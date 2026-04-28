let pyodidePromise: Promise<any> | null = null;

export interface RunResult {
  stdout: string;       // captured stdout (and stderr / error message if any)
  figures: string[];    // each entry is a `data:image/png;base64,...` URL
  hasError: boolean;
}

export function loadPyodide(): Promise<any> {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = new Promise(async (resolve, reject) => {
    try {
      // Load pyodide script dynamically
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";
      script.onload = async () => {
        const pyodide = await (window as any).loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",
        });
        resolve(pyodide);
      };
      script.onerror = () => reject(new Error("Failed to load Pyodide"));
      document.head.appendChild(script);
    } catch (err) {
      pyodidePromise = null;
      reject(err);
    }
  });

  return pyodidePromise;
}

// Python prelude: redirect stdio, force a non-interactive matplotlib backend
// (so plt.show() is a harmless no-op), and reset the figure list.
const SETUP_CODE = `
import sys
from io import StringIO
__stdout_capture = StringIO()
__stderr_capture = StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture

# Force the Agg backend BEFORE the user code imports pyplot, so
# plt.show() doesn't try to open a window or canvas. We capture
# figures manually after the user code runs.
try:
    import matplotlib
    matplotlib.use("Agg")
except Exception:
    pass
`;

// Python postlude: enumerate any matplotlib figures the user code created
// and serialise them to base64 PNGs that JS can drop into <img> tags.
const CAPTURE_FIGURES_CODE = `
__figures_b64 = []
try:
    import matplotlib.pyplot as __plt
    import io as __io
    import base64 as __base64
    for __num in __plt.get_fignums():
        __fig = __plt.figure(__num)
        __buf = __io.BytesIO()
        __fig.savefig(__buf, format="png", dpi=90, bbox_inches="tight")
        __buf.seek(0)
        __figures_b64.append(__base64.b64encode(__buf.read()).decode("ascii"))
    __plt.close("all")
except ModuleNotFoundError:
    pass
except Exception as __e:
    print(f"[matplotlib capture warning: {__e}]", file=sys.stderr)
`;

export async function runPython(code: string): Promise<RunResult> {
  const pyodide = await loadPyodide();

  // Auto-install any packages the user's code imports (numpy, matplotlib,
  // scipy, sympy, ...). First call may take several seconds while wheels
  // are downloaded; subsequent calls are cached.
  if (typeof pyodide.loadPackagesFromImports === "function") {
    try {
      await pyodide.loadPackagesFromImports(code);
    } catch (err) {
      console.warn("[pyodide] loadPackagesFromImports failed:", err);
    }
  }

  pyodide.runPython(SETUP_CODE);

  let errorMsg = "";
  try {
    pyodide.runPython(code);
  } catch (err: any) {
    errorMsg = err.message || String(err);
  }

  // Capture matplotlib figures (no-op if matplotlib wasn't imported).
  let figures: string[] = [];
  try {
    pyodide.runPython(CAPTURE_FIGURES_CODE);
    const proxy = pyodide.runPython("__figures_b64");
    const arr = proxy && typeof proxy.toJs === "function" ? proxy.toJs() : Array.from(proxy);
    figures = arr.map((b64: string) => `data:image/png;base64,${b64}`);
    if (proxy && typeof proxy.destroy === "function") proxy.destroy();
  } catch (err) {
    console.warn("[pyodide] figure capture failed:", err);
  }

  const stdout = pyodide.runPython("__stdout_capture.getvalue()") || "";
  const stderr = pyodide.runPython("__stderr_capture.getvalue()") || "";
  pyodide.runPython("sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__");

  let combined = stdout;
  if (stderr) combined += (combined ? "\n" : "") + stderr;
  if (errorMsg) combined += (combined ? "\n" : "") + errorMsg;

  return {
    stdout: combined,
    figures,
    hasError: Boolean(errorMsg),
  };
}
