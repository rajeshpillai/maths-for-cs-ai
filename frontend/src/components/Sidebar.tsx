import { For, createResource } from "solid-js";
import { A } from "@solidjs/router";
import { fetchTiers } from "../lib/api";

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
  // "01-number-systems" -> "1. Number Systems"
  const parts = slug.replace(/^\d+-/, "").split("-");
  const num = parseInt(slug, 10);
  const name = parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return `${num}. ${name}`;
}

export default function Sidebar() {
  const [tiers] = createResource(fetchTiers);

  return (
    <nav class="sidebar">
      <A href="/" class="sidebar-title">
        Maths for CS
      </A>
      <div class="sidebar-tiers">
        <For each={tiers()}>
          {(tier) => (
            <div class="sidebar-tier">
              <div class="tier-label">
                {tier.tier.replace("tier-", "T")}: {TIER_LABELS[tier.tier] ?? tier.title}
              </div>
              <ul class="tier-lessons">
                <For each={tier.lessons}>
                  {(lesson) => (
                    <li>
                      <A
                        href={`/lesson/${tier.tier}/${lesson}`}
                        activeClass="active"
                      >
                        {formatLessonName(lesson)}
                      </A>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </div>
    </nav>
  );
}
