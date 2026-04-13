import { For, createResource, createSignal, createEffect } from "solid-js";
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
  "supplementary-graphs": "Graph Shapes & Curves",
  "supplementary-activations": "Activation Functions",
  "supplementary-foundations": "Foundations (Pre-Calculus)",
  "supplementary-applied": "Applied Maths & Mechanics",
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

  const [progressVersion, setProgressVersion] = createSignal(0);
  createEffect(() => {
    void location.pathname;
    setProgressVersion((v) => v + 1);
  });

  if (typeof window !== "undefined") {
    window.addEventListener("storage", () => setProgressVersion((v) => v + 1));
    setInterval(() => setProgressVersion((v) => v + 1), 1000);
  }

  return (
    <nav class="sidebar">
      <A href="/" class="sidebar-title">
        Maths for CS
      </A>
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
                    {tier.tier.startsWith("tier-")
                      ? `T${tier.tier.replace("tier-", "")}: `
                      : ""}
                    {TIER_LABELS[tier.tier] ?? tier.title}
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
