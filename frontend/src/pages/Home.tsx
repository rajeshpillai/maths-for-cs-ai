import { A } from "@solidjs/router";
import { createResource, For } from "solid-js";
import { fetchTiers } from "../lib/api";

const TIER_DESCRIPTIONS: Record<string, string> = {
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
  "supplementary-graphs": "Linear, quadratic, cubic, exponential, logarithmic, conic sections, bell curve, sigmoid, ReLU, power laws",
  "supplementary-activations": "Sigmoid, tanh, ReLU, Leaky ReLU, ELU, GELU, Swish, softmax — full derivations and comparison",
};

export default function Home() {
  const [tiers] = createResource(fetchTiers);

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

      <div class="tier-grid">
        <For each={tiers()}>
          {(tier) => {
            const tierNum = tier.tier.replace("tier-", "");
            const hasLessons = tier.lessons.length > 0;
            return (
              <div class={`tier-card ${hasLessons ? "" : "empty"}`}>
                <div class="tier-card-header">
                  <span class="tier-num">T{tierNum}</span>
                  <span class="tier-name">{tier.title.replace(/^Tier \d+$/, TIER_DESCRIPTIONS[tier.tier]?.split(",")[0] ?? tier.title)}</span>
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
