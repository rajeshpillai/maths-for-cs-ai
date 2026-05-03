---
strand: uncertainty
level: master
order: 9
title: Capstone — Probability at the Frontier
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 08-causal-inference
    description: Causal inference
connections:
  - strand-6-uncertainty-advanced/09-uncertainty-capstone-3
applications:
  - cs: "ML, finance, statistical physics, quantitative biology"
  - life: "The state of probability and statistics in 2026"
---

# Capstone — Probability at the Frontier

## Mental

Nine lessons on:

- **Brownian motion** (Lesson 00).
- **Stochastic processes** (Lesson 01).
- **Large deviations** (Lesson 02).
- **Ergodic theory** (Lesson 03).
- **Information theory deeper** (Lesson 04).
- **Empirical processes and concentration** (Lesson 05).
- **Stochastic PDEs and rough paths** (Lesson 06).
- **Optimal transport** (Lesson 07).
- **Causal inference** (Lesson 08).

You've reached graduate-level probability and modern statistics.
Three integrated walkthroughs.

## Walkthrough 1: training a diffusion-model image generator

DDPM / score-based generative models:

1. **Forward (noising) process** — Brownian motion (Lesson 00) added
   to data over time.
2. **Reverse process** — denoising via SDE (Strand 4 Master Lesson 5).
3. **Score matching loss** — concentration arguments (Lesson 05) bound
   sample complexity.
4. **Schrödinger bridge / OT view** (Lesson 07) — emerging
   alternative formulation.
5. **Sampling in $\sim$ 50 steps** of solving the reverse SDE on a
   trained network.

Stable Diffusion, DALL-E, Imagen all run something like this.

## Walkthrough 2: high-dimensional Bayesian inference

Modern Bayesian workflow:

1. **Probability space** rigorously defined (Strand 6 Advanced
   Lesson 01).
2. **Prior + likelihood** = **posterior** via Bayes' rule.
3. **MCMC** (HMC, NUTS): chain converges by ergodic theorem
   (Lesson 03).
4. **Rate of convergence** governed by spectral gap; large-deviation
   bounds (Lesson 02) for chain mixing time.
5. **Variational inference** as alternative — minimise
   $\mathrm{KL}(q \| p)$.
6. **Causal interpretation** (Lesson 08) when intervention is the
   target.

Used by Stan, PyMC, NumPyro on real industrial-scale problems.

## Walkthrough 3: KPZ universality in physics

A surprising 21st-century discovery:

- Different physical systems (random matrix eigenvalues, ASEP particle
  dynamics, polymer growth, longest-increasing-subsequence) all
  exhibit the **same** Tracy-Widom limit (Lesson 06).
- This **universality class** — KPZ — connects probability,
  combinatorics, integrable systems.
- Hairer's regularity structures gave rigorous solution to KPZ
  itself (Fields medal 2014).
- Active research connects to algebraic combinatorics (Macdonald
  polynomials), random matrices, integrable systems.

## Roadmap

**Strand 6 Research-adjacent** picks up:

- Liouville quantum gravity (LQG) and Schramm-Loewner evolution
  (SLE).
- Random matrix theory frontier (universality).
- Free probability (Voiculescu).
- Stochastic homogenisation.
- Reinforcement learning theory.
- Theoretical guarantees for modern ML.

## Closing

Probability has become *the* mathematical foundation of:

- Modern AI (training, sampling, generation).
- Quantitative finance.
- Mathematical physics (statistical mechanics, KPZ).
- Causal data science.
- Quantum information.

The strand began with coin flips; it ends at the frontier of
twenty-first-century mathematics — driven simultaneously by
applications and pure curiosity.

## Interactive

:::widget type=numeric-input prompt="Brownian motion: nowhere differentiable, QV = $t$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Itô's formula has $(1/2) f'' \\sigma^2$ correction. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wasserstein distance is a true metric. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$P(Y | \\mathrm{do}(X)) \\ne P(Y | X)$ with confounders. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Cramér rate function = Legendre of cumulant generator. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Birkhoff: time = space average a.s. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer's regularity structures gave rigorous KPZ. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sinkhorn algorithm: entropic-regularised OT. Type 1." answer=1 explain="Yes.":::
