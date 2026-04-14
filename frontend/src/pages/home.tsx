import { A } from "@solidjs/router";
import { createResource, createSignal, For, Show } from "solid-js";
import { fetchTiers, type TierInfo } from "../lib/api";

interface LearningPath {
  id: string;
  name: string;
  description: string;
  stages: { name: string; tiers: string[] }[];
}

interface MLUnit {
  name: string;
  icon: string;
  tiers: { tier: string; lessons: string[]; label: string }[];
}

interface MLCurriculum {
  title: string;
  description: string;
  outcome: string;
  units: MLUnit[];
}

const TIER_NAMES: Record<string, string> = {
  "foundation-1": "Algebra Foundations",
  "foundation-2": "Functions & Graphs",
  "foundation-3": "Advanced Algebra",
  "foundation-4": "Pre-Calculus",
  "number-systems": "Number Systems",
  "discrete-mathematics": "Discrete Mathematics",
  "linear-algebra": "Linear Algebra",
  "calculus": "Calculus",
  "probability-statistics": "Probability & Stats",
  "optimisation": "Optimisation",
  "neural-networks": "Neural Networks",
  "cnns": "CNNs",
  "geometry-trigonometry": "Geometry & Trig",
  "fourier-analysis": "Fourier Analysis",
  "advanced-ml": "Advanced Topics",
  "differential-equations": "Differential Equations",
  "multivariable-calculus": "Multivariable Calculus",
  "advanced-discrete-math": "Advanced Discrete Math",
  "advanced-statistics": "Advanced Statistics",
  "methods-of-proof": "Methods of Proof",
  "abstract-algebra": "Abstract Algebra",
  "jee-problem-solving": "JEE Advanced & Problem Solving",
  "vedic-maths": "Vedic Mathematics",
  "supplementary-applied": "Applied Maths",
};

const TIER_DESCRIPTIONS: Record<string, string> = {
  "foundation-1": "Surds, indices, equations, inequalities, functions, linear & quadratic, polynomials, absolute value, exponent rules",
  "foundation-2": "Cartesian plane, transformations, exponentials, logarithms, trigonometry, composition, statistics, piecewise functions",
  "foundation-3": "Polynomial division & roots, radicals, exp/log equations, sequences & series, nonlinear systems, matrices intro, sigma notation",
  "foundation-4": "Intuitive limits, advanced trig, inverse trig, trig identities, conic sections, vectors, complex numbers, continuity",
  "number-systems": "Natural numbers, integers, rationals, reals, complex numbers, binary, hex, IEEE 754, modular arithmetic, primes, GCD/LCM",
  "discrete-mathematics": "Logic, Boolean algebra, set theory, relations, functions, combinatorics, graph theory, proof techniques",
  "linear-algebra": "Vectors, matrices, dot product, linear transformations, determinants, eigenvalues, SVD, PCA, norms",
  "calculus": "Limits, derivatives, gradient, chain rule, Jacobian, integrals, Taylor series",
  "probability-statistics": "Probability axioms, Bayes' theorem, distributions, CLT, MLE, entropy, KL divergence",
  "optimisation": "Loss functions, gradient descent, SGD, Adam, convexity, Lagrange multipliers, Newton-Raphson",
  "neural-networks": "Neurons, activation functions, forward pass, backpropagation, NumPy network from scratch",
  "cnns": "2D convolution, cross-correlation, stride/padding, pooling, receptive fields",
  "geometry-trigonometry": "Unit circle, trig, rotation matrices, quaternions, projections, Bezier curves, ray intersection",
  "fourier-analysis": "Fourier series/transform, DFT, FFT, convolution theorem, image/audio applications",
  "advanced-ml": "GNNs, Transformers, RNNs, Markov chains, Monte Carlo, automatic differentiation",
  "differential-equations": "First-order & second-order ODEs, systems, Laplace transforms, PDEs, numerical methods, chaos, Neural ODEs",
  "multivariable-calculus": "Vector calculus, multiple integrals, line/surface integrals, Green's/Stokes'/Divergence theorems, applications",
  "advanced-discrete-math": "Number theory, RSA crypto, Boolean algebra, recurrences, graph algorithms, automata, Turing machines, complexity",
  "advanced-statistics": "Estimation, hypothesis testing, ANOVA, regression, logistic regression, Bayesian inference, MCMC, causal inference",
  "methods-of-proof": "Propositional/predicate logic, direct proof, contradiction, contrapositive, induction, epsilon-delta, proof writing",
  "abstract-algebra": "Groups, subgroups, permutations, cosets, Lagrange, homomorphisms, rings, fields, elliptic curve crypto, equivariant NNs",
  "jee-problem-solving": "Properties of triangles, advanced conics, advanced integration, competition inequalities, Vieta's, problem-solving strategies",
  "supplementary-graphs": "Linear, quadratic, cubic, exponential, logarithmic, conic sections, bell curve, sigmoid, ReLU, power laws",
  "supplementary-activations": "Sigmoid, tanh, ReLU, Leaky ReLU, ELU, GELU, Swish, softmax — full derivations and comparison",
  "vedic-maths": "Nikhilam, Urdhva-Tiryak, duplex squaring, Vinculum, digital roots, recurring decimals, mental math mastery",
  "supplementary-foundations": "Parametric & implicit differentiation, polar coordinates, hyperbolic functions, Cayley-Hamilton, 3D lines & planes",
  "supplementary-applied": "Kinematics (SUVAT), projectile motion, forces & equilibrium, SHM, differential equations, hypothesis testing, regression",
};

async function fetchLearningPaths(): Promise<{ paths: LearningPath[] }> {
  const base = import.meta.env.BASE_URL ?? "/";
  const res = await fetch(`${base}api/learning-paths.json`);
  if (!res.ok) return { paths: [] };
  return res.json();
}

async function fetchMLCurriculum(): Promise<MLCurriculum | null> {
  const base = import.meta.env.BASE_URL ?? "/";
  const res = await fetch(`${base}api/ml-curriculum.json`);
  if (!res.ok) return null;
  return res.json();
}

async function fetchJEECurriculum(): Promise<MLCurriculum | null> {
  const base = import.meta.env.BASE_URL ?? "/";
  const res = await fetch(`${base}api/jee-curriculum.json`);
  if (!res.ok) return null;
  return res.json();
}

function getLessonCount(tiers: TierInfo[], tierIds: string[]): number {
  return tierIds.reduce((sum, id) => {
    const tier = tiers.find((t) => t.tier === id);
    return sum + (tier?.lessons.length ?? 0);
  }, 0);
}

function getUnitLessonCount(unit: MLUnit): number {
  return unit.tiers.reduce((sum, t) => sum + t.lessons.length, 0);
}

export default function Home() {
  const [tiers] = createResource(fetchTiers);
  const [paths] = createResource(fetchLearningPaths);
  const [mlCurriculum] = createResource(fetchMLCurriculum);
  const [jeeCurriculum] = createResource(fetchJEECurriculum);
  const [selectedPath, setSelectedPath] = createSignal<string | null>(null);
  const [showAllTiers, setShowAllTiers] = createSignal(false);
  const [activeCurriculum, setActiveCurriculum] = createSignal<"ml" | "jee">("ml");


  return (
    <div class="home">
      <h1>Maths for CS + AI/ML</h1>
      <p class="subtitle">
        Mathematics from First Principles — for Computer Science, Game Development, and AI/ML
      </p>
      <p class="philosophy">
        Learn math so you can solve it with <strong>paper and pen</strong>.
        Python is only used to verify your hand-computed answers.
      </p>

      {/* Curriculum selector: ML / JEE */}
      {(() => {
        const curriculum = () => activeCurriculum() === "ml" ? mlCurriculum() : jeeCurriculum();
        const totalLessons = () => {
          const c = curriculum();
          if (!c) return 0;
          return c.units.reduce((sum, u) => sum + getUnitLessonCount(u), 0);
        };
        return (
          <Show when={curriculum()}>
            {(curr) => (
          <div class="ml-curriculum">
            <div class="ml-header">
              <div class="curriculum-tabs">
                <button
                  class={`curriculum-tab ${activeCurriculum() === "ml" ? "active" : ""}`}
                  onClick={() => setActiveCurriculum("ml")}
                >
                  AI / ML
                </button>
                <button
                  class={`curriculum-tab ${activeCurriculum() === "jee" ? "active" : ""}`}
                  onClick={() => setActiveCurriculum("jee")}
                >
                  JEE Advanced
                </button>
              </div>
              <div class="ml-header-text">
                <h2>{curr().title}</h2>
                <p class="ml-desc">{curr().description}</p>
                <p class="ml-outcome">{curr().outcome}</p>
                <div class="ml-stats">
                  <span class="ml-stat">{curr().units.length} units</span>
                  <span class="ml-stat-sep">/</span>
                  <span class="ml-stat">{totalLessons()} lessons</span>
                  <span class="ml-stat-sep">/</span>
                  <span class="ml-stat">paper &amp; pen first</span>
                </div>
              </div>
            </div>

            <div class="ml-units">
              <For each={curr().units}>
                {(unit, idx) => {
                  const lessonCount = getUnitLessonCount(unit);
                  return (
                    <div class="ml-unit">
                      <div class="ml-unit-number">{idx() + 1}</div>
                      <div class="ml-unit-content">
                        <div class="ml-unit-header">
                          <span class="ml-unit-icon">{unit.icon}</span>
                          <span class="ml-unit-name">{unit.name}</span>
                          <span class="ml-unit-count">{lessonCount} lessons</span>
                        </div>
                        <div class="ml-unit-tiers">
                          <For each={unit.tiers}>
                            {(tierRef) => {
                              const resolvedSlug = () => {
                                const t = tiers()?.find((t) => t.tier === tierRef.tier);
                                return t?.lessons.find((l) => l.startsWith(tierRef.lessons[0])) ?? tierRef.lessons[0];
                              };
                              return (
                              <A
                                href={`/lesson/${tierRef.tier}/${resolvedSlug()}`}
                                class="ml-unit-link"
                              >
                                <span class="ml-tier-badge">{TIER_NAMES[tierRef.tier] ?? tierRef.tier}</span>
                                <span class="ml-tier-label">{tierRef.label}</span>
                              </A>
                              );
                            }}
                          </For>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>
            </div>

            <div class="ml-prereq-note">
              New to math? Complete <A href="/lesson/foundation-1/01-surds-indices-logarithms">Foundation 1-4</A> first,
              then follow the units above in order.
            </div>
          </div>
            )}
          </Show>
        );
      })()}

      {/* Other learning paths */}
      <div class="start-here">
        <h2>Other Learning Paths</h2>
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

      {/* All Topics */}
      <div class="all-tiers-section">
        <h2 class="all-tiers-heading">
          All Topics
          <button class="show-all-btn" onClick={() => setShowAllTiers(v => !v)}>
            {showAllTiers() ? "Collapse" : `Show all ${tiers()?.reduce((s, t) => s + t.lessons.length, 0) ?? 0} lessons`}
          </button>
        </h2>
        <Show when={showAllTiers()}>
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
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
      </div>
    </div>
  );
}
