import { createSignal, onMount, createEffect, type ParentProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import Sidebar from "./components/sidebar";
import SearchBar from "./components/search-bar";
import "./app.css";

export default function Layout(props: ParentProps) {
  const [theme, setTheme] = createSignal<"light" | "dark">("light");
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const location = useLocation();

  onMount(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  });

  // Close sidebar on navigation (mobile)
  createEffect(() => {
    void location.pathname;
    setSidebarOpen(false);
  });

  function toggleTheme() {
    const next = theme() === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <div class="app-layout">
      {/* Hamburger button — visible only on mobile */}
      <button
        class="hamburger-btn"
        onClick={() => setSidebarOpen((v) => !v)}
        title={sidebarOpen() ? "Close menu" : "Open menu"}
      >
        {sidebarOpen() ? "\u2715" : "\u2630"}
      </button>

      {/* Overlay backdrop — visible when sidebar open on mobile */}
      <div
        class={`sidebar-overlay ${sidebarOpen() ? "open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div class={`sidebar-wrapper ${sidebarOpen() ? "open" : ""}`}>
        <Sidebar />
      </div>
      <main class="main-content">
        <div class="top-bar">
          <a
            class="github-star"
            href="https://github.com/rajeshpillai/maths-for-cs-ai"
            target="_blank"
            rel="noopener noreferrer"
            title="Star this project on GitHub"
            aria-label="Star this project on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>Star on GitHub</span>
          </a>
          <SearchBar />
        </div>
        {props.children}
      </main>
      <div class="theme-toggle">
        <button onClick={toggleTheme} title={theme() === "light" ? "Switch to dark mode" : "Switch to light mode"}>
          {theme() === "light" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}
