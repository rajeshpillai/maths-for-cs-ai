import { A } from "@solidjs/router";
import { createResource, createSignal, For, Show } from "solid-js";
import { fetchTiers, type TierInfo } from "../lib/api";

interface LearningPath {
  id: string;
  name: string;
  description: string;
  stages: { name: string; tiers: string[] }[];
}

interface LearningPathsData {
  paths: LearningPath[];
}

const TIER_DESCRIPTIONS: Record<string, string> = {
  "foundation-1": "Surds, indices, equations, inequalities, functions, linear & quadratic, polynomials, absolute value, exponent rules",
  "foundation-2": "Cartesian plane, transformations, exponentials, logarithms, trigonometry, composition, statistics, piecewise functions",
  "foundation-3": "Polynomial division & roots, radicals, exp/log equations, sequences & series, nonlinear systems, matrices intro, sigma notation",
  "foundation-4": "Intuitive limits, advanced trig, inverse trig, trig identities, conic sections, vectors, complex numbers, continuity",
  "tier-0": "Natural numbers, integers, rationals, reals, complex numbers, binary, hex, IEEE 754, modular arithmetic, primes, GCD/LCM",
  "tier-1": "Logic, Boolean algebra, set theory, relations, functions, combinatorics, graph theory, proof techniques",
  "tier-2": "Vectors, matrices, dot product, linear transformations, determinants, eigenvalues, SVD, PCA, norms",
  "tier-3": "Limits, derivatives, gradient, chain rule, Jacobian, integrals, Taylor series",
  "tier-4": "Probability axioms, Bayes' theorem, distributions, CLT, MLE, entropy, KL divergence",
  "tier-5": "Loss functions, gradient descent, SGD, Adam, convexity, Lagrange multipliers, Newton-Raphson",
  "tier-6": "Neurons, activation functions, forward pass, backpropagation, NumPy network from scratch",
  "tier-7": "2D convolution, cross-correlation, stride/padding, pooling, receptive fields",
  "tier-8": "Unit circle, trig, rotation matrices, quaternions, projections, Bezier curves, ray intersection",
  "tier-9": "Fourier series/transform, DFT, FFT, convolution theorem, image/audio applications",
  "tier-10": "GNNs, Transformers, RNNs, Markov chains, Monte Carlo, automatic differentiation",
  "tier-11": "First-order & second-order ODEs, systems, Laplace transforms, PDEs, numerical methods, chaos, Neural ODEs",
  "tier-12": "Vector calculus, multiple integrals, line/surface integrals, Green's/Stokes'/Divergence theorems, applications",
  "tier-13": "Number theory, RSA crypto, Boolean algebra, recurrences, graph algorithms, automata, Turing machines, complexity",
  "tier-14": "Estimation, hypothesis testing, ANOVA, regression, logistic regression, Bayesian inference, MCMC, causal inference",
  "supplementary-graphs": "Linear, quadratic, cubic, exponential, logarithmic, conic sections, bell curve, sigmoid, ReLU, power laws",
  "supplementary-activations": "Sigmoid, tanh, ReLU, Leaky ReLU, ELU, GELU, Swish, softmax — full derivations and comparison",
  "supplementary-foundations": "Surds, indices, logarithm laws, algebraic manipulation, coordinate geometry, sequences & series, trig identities, binomial expansion",
  "supplementary-applied": "Kinematics (SUVAT), projectile motion, forces & equilibrium, SHM, differential equations, hypothesis testing, regression",
};

const TIER_NAMES: Record<string, string> = {
  "foundation-1": "Algebra Foundations",
  "foundation-2": "Functions & Graphs",
  "foundation-3": "Advanced Algebra",
  "foundation-4": "Pre-Calculus",
  "tier-0": "Number Systems",
  "tier-1": "Discrete Mathematics",
  "tier-2": "Linear Algebra",
  "tier-3": "Calculus",
  "tier-4": "Probability & Stats",
  "tier-5": "Optimisation",
  "tier-6": "Neural Networks",
  "tier-7": "CNNs",
  "tier-8": "Geometry & Trig",
  "tier-9": "Fourier Analysis",
  "tier-10": "Advanced Topics",
  "tier-11": "Differential Equations",
  "tier-12": "Multivariable Calculus",
  "tier-13": "Advanced Discrete Math",
  "tier-14": "Advanced Statistics",
  "supplementary-applied": "Applied Maths",
};

async function fetchLearningPaths(): Promise<LearningPathsData> {
  const base = import.meta.env.BASE_URL ?? "/";
  const res = await fetch(`${base}api/learning-paths.json`);
  if (!res.ok) return { paths: [] };
  return res.json();
}

function getLessonCount(tiers: TierInfo[], tierIds: string[]): number {
  return tierIds.reduce((sum, id) => {
    const tier = tiers.find((t) => t.tier === id);
    return sum + (tier?.lessons.length ?? 0);
  }, 0);
}

export default function Home() {
  const [tiers] = createResource(fetchTiers);
  const [paths] = createResource(fetchLearningPaths);
  const [selectedPath, setSelectedPath] = createSignal<string | null>(null);

  return (
    <div class="home">
      <h1>Mathematics from First Principles</h1>
      <p class="subtitle">
        For Computer Science, Game Development, and AI/ML
      </p>
      <p class="philosophy">
        Learn math so you can solve it with <strong>paper and pen</strong>.
        Python is only used to verify your hand-computed answers.
      </p>

      {/* Start Here callout */}
      <div class="start-here">
        <h2>Choose Your Path</h2>
        <p class="start-here-desc">
          New to math beyond grade 8? Start with <strong>Grade 8 to AI/ML</strong>.
          Already comfortable with algebra? Jump in at <strong>Tier 0</strong>.
        </p>
        <div class="path-cards">
          <For each={paths()?.paths ?? []}>
            {(path) => {
              const totalLessons = () => {
                const t = tiers();
                if (!t) return 0;
                const allTierIds = path.stages.flatMap((s) => s.tiers);
                return getLessonCount(t, allTierIds);
              };
              const isSelected = () => selectedPath() === path.id;
              return (
                <button
                  class={`path-card ${isSelected() ? "selected" : ""}`}
                  onClick={() => setSelectedPath(isSelected() ? null : path.id)}
                >
                  <span class="path-name">{path.name}</span>
                  <span class="path-desc">{path.description}</span>
                  <span class="path-meta">{totalLessons()} lessons</span>
                </button>
              );
            }}
          </For>
        </div>
      </div>

      {/* Learning path stages (shown when a path is selected) */}
      <Show when={selectedPath()}>
        {(pathId) => {
          const path = () => paths()?.paths.find((p) => p.id === pathId());
          return (
            <div class="path-stages">
              <h3>{path()?.name}</h3>
              <div class="stages-timeline">
                <For each={path()?.stages ?? []}>
                  {(stage) => (
                    <div class="stage">
                      <div class="stage-name">{stage.name}</div>
                      <div class="stage-tiers">
                        <For each={stage.tiers}>
                          {(tierId) => {
                            const tier = () => tiers()?.find((t) => t.tier === tierId);
                            return (
                              <Show when={tier()}>
                                {(t) => (
                                  <A
                                    href={`/lesson/${t().tier}/${t().lessons[0]}`}
                                    class="stage-tier-link"
                                  >
                                    {TIER_NAMES[t().tier] ?? t().title}
                                    <span class="stage-tier-count">
                                      {t().lessons.length}
                                    </span>
                                  </A>
                                )}
                              </Show>
                            );
                          }}
                        </For>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>
          );
        }}
      </Show>

      {/* Full tier grid */}
      <h2 class="all-tiers-heading">All Topics</h2>
      <div class="tier-grid">
        <For each={tiers()}>
          {(tier) => {
            const isFoundation = tier.tier.startsWith("foundation-");
            const tierNum = isFoundation
              ? tier.tier.replace("foundation-", "")
              : tier.tier.replace("tier-", "");
            const tierPrefix = isFoundation ? "F" : "T";
            const hasLessons = tier.lessons.length > 0;
            return (
              <div class={`tier-card ${hasLessons ? "" : "empty"}`}>
                <div class="tier-card-header">
                  <span class="tier-num">{tierPrefix}{tierNum}</span>
                  <span class="tier-name">{TIER_NAMES[tier.tier] ?? tier.title}</span>
                </div>
                <p class="tier-desc">
                  {TIER_DESCRIPTIONS[tier.tier] ?? ""}
                </p>
                {hasLessons && (
                  <A href={`/lesson/${tier.tier}/${tier.lessons[0]}`} class="tier-start">
                    Start ({tier.lessons.length} lesson{tier.lessons.length > 1 ? "s" : ""})
                  </A>
                )}
                {!hasLessons && (
                  <span class="tier-coming">Coming soon</span>
                )}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}
