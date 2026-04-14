import { For, createResource, createSignal, createEffect, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { fetchTiers } from "../lib/api";
import { isCompleted, getCompletedCount, getTotalCompleted } from "../lib/progress";

const TIER_LABELS: Record<string, string> = {
  "foundation-1": "Algebra Foundations",
  "foundation-2": "Functions & Graphs",
  "foundation-3": "Advanced Algebra",
  "foundation-4": "Pre-Calculus",
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
  "tier-11": "Differential Equations",
  "tier-12": "Multivariable Calculus",
  "tier-13": "Advanced Discrete Math",
  "tier-14": "Advanced Statistics",
  "tier-15": "Methods of Proof",
  "tier-16": "Abstract Algebra",
  "tier-17": "JEE Advanced & Problem Solving",
  "supplementary-graphs": "Graph Shapes & Curves",
  "supplementary-activations": "Activation Functions",
  "vedic-maths": "Vedic Mathematics",
  "supplementary-foundations": "Advanced Topics (Parametric, Polar, Hyperbolic)",
  "supplementary-applied": "Applied Maths & Mechanics",
};

// Group tiers into sections for the sidebar
function getTierSection(tier: string): string {
  if (tier.startsWith("foundation-")) return "foundations";
  if (tier.startsWith("tier-")) return "tiers";
  return "supplementary";
}

const SECTION_LABELS: Record<string, string> = {
  foundations: "Foundations (Start Here)",
  tiers: "Core Curriculum",
  supplementary: "Supplementary",
};

function formatLessonName(slug: string): string {
  const parts = slug.replace(/^\d+-/, "").split("-");
  const num = parseInt(slug, 10);
  const name = parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return `${num}. ${name}`;
}

function tierPrefix(tier: string): string {
  if (tier.startsWith("foundation-")) return `F${tier.replace("foundation-", "")}`;
  if (tier.startsWith("tier-")) return `T${tier.replace("tier-", "")}`;
  return "";
}

export default function Sidebar() {
  const [tiers] = createResource(fetchTiers);
  const location = useLocation();

  // Track which tiers are expanded (collapsed by default except active)
  const [expanded, setExpanded] = createSignal<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = createSignal(false);

  const [progressVersion, setProgressVersion] = createSignal(0);
  createEffect(() => {
    void location.pathname;
    setProgressVersion((v) => v + 1);
  });

  // Auto-expand the tier containing the current lesson
  createEffect(() => {
    const path = location.pathname;
    const match = path.match(/\/lesson\/([^/]+)\//);
    if (match) {
      const activeTier = match[1];
      setExpanded((prev) => ({ ...prev, [activeTier]: true }));
    }
  });

  if (typeof window !== "undefined") {
    window.addEventListener("storage", () => setProgressVersion((v) => v + 1));
    setInterval(() => setProgressVersion((v) => v + 1), 1000);
  }

  const toggleTier = (tier: string) => {
    setExpanded((prev) => ({ ...prev, [tier]: !prev[tier] }));
  };

  const toggleAll = () => {
    const newState = !allExpanded();
    setAllExpanded(newState);
    const tierList = tiers();
    if (tierList) {
      const newExpanded: Record<string, boolean> = {};
      for (const t of tierList) {
        newExpanded[t.tier] = newState;
      }
      setExpanded(newExpanded);
    }
  };

  // Group tiers by section
  const groupedTiers = () => {
    const t = tiers();
    if (!t) return [];
    const groups: { section: string; label: string; items: typeof t }[] = [];
    let currentSection = "";
    for (const tier of t) {
      const section = getTierSection(tier.tier);
      if (section !== currentSection) {
        currentSection = section;
        groups.push({ section, label: SECTION_LABELS[section] ?? section, items: [] });
      }
      groups[groups.length - 1].items.push(tier);
    }
    return groups;
  };

  return (
    <nav class="sidebar">
      <A href="/" class="sidebar-title">
        Maths for CS + AI/ML
      </A>
      <div class="sidebar-controls">
        <span class="sidebar-progress-text">
          {(() => {
            void progressVersion();
            const total = getTotalCompleted();
            const allTiers = tiers();
            const totalLessons = allTiers
              ? allTiers.reduce((sum, t) => sum + t.lessons.length, 0)
              : 0;
            return totalLessons > 0
              ? `${total}/${totalLessons} lessons`
              : "";
          })()}
        </span>
        <button
          class="expand-collapse-btn"
          onClick={toggleAll}
          title={allExpanded() ? "Collapse all" : "Expand all"}
        >
          {allExpanded() ? "\u25B2" : "\u25BC"}
        </button>
      </div>
      <div class="sidebar-tiers">
        <For each={groupedTiers()}>
          {(group) => (
            <div class="sidebar-section">
              <div class="section-label">{group.label}</div>
              <For each={group.items}>
                {(tier) => {
                  const completedCount = () => {
                    void progressVersion();
                    return getCompletedCount(tier.tier, tier.lessons);
                  };
                  const isExpanded = () => expanded()[tier.tier] ?? false;
                  const prefix = tierPrefix(tier.tier);
                  return (
                    <div class="sidebar-tier">
                      <div
                        class="tier-label"
                        onClick={() => toggleTier(tier.tier)}
                      >
                        <span class="tier-toggle">
                          {isExpanded() ? "\u25BE" : "\u25B8"}
                        </span>
                        <span class="tier-label-text">
                          {prefix ? `${prefix}: ` : ""}
                          {TIER_LABELS[tier.tier] ?? tier.title}
                        </span>
                        {tier.lessons.length > 0 && (
                          <span class="tier-progress">
                            {completedCount()}/{tier.lessons.length}
                          </span>
                        )}
                      </div>
                      <Show when={isExpanded()}>
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
                      </Show>
                    </div>
                  );
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </nav>
  );
}
