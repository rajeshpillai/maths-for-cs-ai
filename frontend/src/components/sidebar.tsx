import { For, createResource, createSignal, createEffect, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";
import { fetchTiers } from "../lib/api";
import { isCompleted, getCompletedCount, getTotalCompleted } from "../lib/progress";

const TIER_LABELS: Record<string, string> = {
  "foundation-1": "Algebra Foundations",
  "foundation-2": "Functions & Graphs",
  "foundation-3": "Advanced Algebra",
  "foundation-4": "Pre-Calculus",
  "number-systems": "Number Systems & Arithmetic",
  "discrete-mathematics": "Discrete Mathematics",
  "linear-algebra": "Linear Algebra",
  "calculus": "Calculus & Analysis",
  "probability-statistics": "Probability & Statistics",
  "optimisation": "Optimisation",
  "neural-networks": "Neural Networks",
  "cnns": "CNNs",
  "geometry-trigonometry": "Geometry & Trig (Game Dev)",
  "fourier-analysis": "Signals & Fourier",
  "advanced-ml": "Advanced ML Topics",
  "differential-equations": "Differential Equations",
  "multivariable-calculus": "Multivariable Calculus",
  "advanced-discrete-math": "Advanced Discrete Math",
  "advanced-statistics": "Advanced Statistics",
  "methods-of-proof": "Methods of Proof",
  "abstract-algebra": "Abstract Algebra",
  "jee-problem-solving": "JEE Advanced & Problem Solving",
  "vedic-maths": "Vedic Mathematics",
  "supplementary-graphs": "Graph Shapes & Curves",
  "supplementary-activations": "Activation Functions",
  "supplementary-foundations": "Advanced Topics (Parametric, Polar, Hyperbolic)",
  "supplementary-applied": "Applied Maths & Mechanics",
};

function getTierSection(tier: string): string {
  if (tier.startsWith("foundation-")) return "foundations";
  if (tier.startsWith("supplementary-")) return "supplementary";
  // Check specific names for grouping
  const coreNames = ["number-systems", "discrete-mathematics", "linear-algebra", "calculus", "probability-statistics"];
  if (coreNames.includes(tier)) return "core";
  const mlNames = ["optimisation", "neural-networks", "cnns"];
  if (mlNames.includes(tier)) return "applied-ml";
  const specNames = ["geometry-trigonometry", "fourier-analysis", "advanced-ml", "jee-problem-solving", "vedic-maths"];
  if (specNames.includes(tier)) return "specializations";
  const uniNames = ["differential-equations", "multivariable-calculus", "advanced-discrete-math", "advanced-statistics"];
  if (uniNames.includes(tier)) return "university";
  const formalNames = ["methods-of-proof", "abstract-algebra"];
  if (formalNames.includes(tier)) return "formal";
  return "other";
}

const SECTION_LABELS: Record<string, string> = {
  foundations: "Foundations (Start Here)",
  core: "Core Mathematics",
  "applied-ml": "Applied ML",
  specializations: "Specializations",
  university: "University Level",
  formal: "Formal Mathematics",
  supplementary: "Supplementary",
  other: "Other",
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

  // Persist sidebar expand/collapse state in localStorage
  const loadSavedState = (): Record<string, boolean> => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("sidebar-expanded");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  };

  const [expanded, setExpanded] = createSignal<Record<string, boolean>>(loadSavedState());
  const [allExpanded, setAllExpanded] = createSignal(false);

  // Save state to localStorage whenever it changes
  createEffect(() => {
    const state = expanded();
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-expanded", JSON.stringify(state));
    }
  });

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
            return totalLessons > 0 ? `${total}/${totalLessons} lessons` : "";
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
                  return (
                    <div class="sidebar-tier">
                      <div class="tier-label" onClick={() => toggleTier(tier.tier)}>
                        <span class="tier-toggle">
                          {isExpanded() ? "\u25BE" : "\u25B8"}
                        </span>
                        <span class="tier-label-text">
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
