let pyodidePromise: Promise<any> | null = null;

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

export async function runPython(code: string): Promise<string> {
  const pyodide = await loadPyodide();

  // Redirect stdout/stderr to capture output
  pyodide.runPython(`
import sys
from io import StringIO
__stdout_capture = StringIO()
__stderr_capture = StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture
`);

  try {
    pyodide.runPython(code);
  } catch (err: any) {
    // Get any partial stdout + the error
    const stdout = pyodide.runPython("__stdout_capture.getvalue()");
    // Reset stdout/stderr
    pyodide.runPython("sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__");
    const errorMsg = err.message || String(err);
    return stdout ? `${stdout}\n${errorMsg}` : errorMsg;
  }

  const stdout = pyodide.runPython("__stdout_capture.getvalue()");
  const stderr = pyodide.runPython("__stderr_capture.getvalue()");

  // Reset stdout/stderr
  pyodide.runPython("sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__");

  return stderr ? `${stdout}\n${stderr}` : stdout;
}
