import { For, createResource, createSignal, createEffect, onMount } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { fetchTiers } from "../lib/api";
import { isCompleted, getCompletedCount, getTotalCompleted } from "../lib/progress";

const TIER_LABELS: Record<string, string> = {
  "tier-0": "Number Systems & Arithmetic",
  "tier-1": "Discrete Mathematics",
  "tier-2": "Linear Algebra",
  "tier-3": "Calculus & Analysis",
  "tier-4": "Probability & Statistics",
  "tier-5": "Optimisation",
  "tier-6": "LA for Neural Networks",
  "tier-7": "CNNs",
  "tier-8": "Geometry & Trig (Game Dev)",
  "tier-9": "Signals & Fourier",
  "tier-10": "Advanced Topics",
};

function formatLessonName(slug: string): string {
  const parts = slug.replace(/^\d+-/, "").split("-");
  const num = parseInt(slug, 10);
  const name = parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return `${num}. ${name}`;
}

export default function Sidebar() {
  const [tiers] = createResource(fetchTiers);
  const location = useLocation();

  // Re-read progress whenever the route changes (lesson might have been marked complete)
  const [progressVersion, setProgressVersion] = createSignal(0);
  createEffect(() => {
    // Track route changes to refresh progress display
    void location.pathname;
    setProgressVersion((v) => v + 1);
  });

  // Listen for storage events (in case progress is toggled)
  if (typeof window !== "undefined") {
    window.addEventListener("storage", () => setProgressVersion((v) => v + 1));
    // Also poll on a short interval for same-tab updates
    setInterval(() => setProgressVersion((v) => v + 1), 1000);
  }

  const [theme, setTheme] = createSignal<"light" | "dark">("light");

  onMount(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved ?? "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  });

  function toggleTheme() {
    const next = theme() === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <nav class="sidebar">
      <A href="/" class="sidebar-title">
        Maths for CS
      </A>
      <div class="theme-toggle">
        <button onClick={toggleTheme} title={theme() === "light" ? "Switch to dark mode" : "Switch to light mode"}>
          {theme() === "light" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          )}
        </button>
      </div>
      <div class="sidebar-progress">
        {(() => {
          void progressVersion();
          const total = getTotalCompleted();
          const allTiers = tiers();
          const totalLessons = allTiers
            ? allTiers.reduce((sum, t) => sum + t.lessons.length, 0)
            : 0;
          return totalLessons > 0
            ? `${total}/${totalLessons} lessons completed`
            : "";
        })()}
      </div>
      <div class="sidebar-tiers">
        <For each={tiers()}>
          {(tier) => {
            const completedCount = () => {
              void progressVersion();
              return getCompletedCount(tier.tier, tier.lessons);
            };
            return (
              <div class="sidebar-tier">
                <div class="tier-label">
                  <span>
                    {tier.tier.replace("tier-", "T")}: {TIER_LABELS[tier.tier] ?? tier.title}
                  </span>
                  {tier.lessons.length > 0 && (
                    <span class="tier-progress">
                      {completedCount()}/{tier.lessons.length}
                    </span>
                  )}
                </div>
                <ul class="tier-lessons">
                  <For each={tier.lessons}>
                    {(lesson) => {
                      const done = () => {
                        void progressVersion();
                        return isCompleted(tier.tier, lesson);
                      };
                      return (
                        <li>
                          <A
                            href={`/lesson/${tier.tier}/${lesson}`}
                            activeClass="active"
                          >
                            <span class={`lesson-status ${done() ? "done" : ""}`}>
                              {done() ? "\u2713" : "\u25CB"}
                            </span>
                            {formatLessonName(lesson)}
                          </A>
                        </li>
                      );
                    }}
                  </For>
                </ul>
              </div>
            );
          }}
        </For>
      </div>
    </nav>
  );
}
