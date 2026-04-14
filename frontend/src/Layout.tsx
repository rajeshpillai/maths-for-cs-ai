import { createSignal, onMount, createEffect, type ParentProps } from "solid-js";
import { useLocation } from "@solidjs/router";
import Sidebar from "./components/Sidebar";
import "./App.css";

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
