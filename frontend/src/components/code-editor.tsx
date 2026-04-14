import { onMount, onCleanup } from "solid-js";
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from "@codemirror/language";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";

interface CodeEditorProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
}

export default function CodeEditor(props: CodeEditorProps) {
  let containerRef: HTMLDivElement | undefined;
  let view: EditorView | undefined;

  onMount(() => {
    if (!containerRef) return;

    const state = EditorState.create({
      doc: props.initialCode,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        python(),
        oneDark,
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        keymap.of([...defaultKeymap, indentWithTab]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            props.onCodeChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          "&": { fontSize: "0.88rem" },
          ".cm-content": {
            fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
            minHeight: "60px",
          },
          ".cm-gutters": {
            fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
          },
          ".cm-scroller": { overflow: "auto" },
        }),
      ],
    });

    view = new EditorView({ state, parent: containerRef });
  });

  onCleanup(() => {
    view?.destroy();
  });

  return <div ref={containerRef} class="cm-wrapper" />;
}
