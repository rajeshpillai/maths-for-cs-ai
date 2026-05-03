---
strand: uncertainty
level: advanced
order: 9
title: Capstone — Modern Probability in Practice
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 08-markov-chains
    description: Markov chains
connections:
  - strand-6-uncertainty-intermediate/09-uncertainty-capstone-2
  - strand-7-computation-advanced/00-numerical-linear-algebra
applications:
  - cs: "ML, finance, MCMC, statistical physics"
  - life: "Probability theory at the level of modern applications"
---

# Capstone — Modern Probability in Practice

## Mental

Nine lessons on:

- **Why measure theory** (Lesson 00).
- **σ-algebras** (Lesson 01).
- **Lebesgue measure and integration** (Lesson 02).
- **Random variables and distributions** (Lesson 03).
- **Modes of convergence** (Lesson 04).
- **Laws of large numbers** (Lesson 05).
- **Central limit theorem** (Lesson 06).
- **Martingales** (Lesson 07).
- **Markov chains** (Lesson 08).

You can now read modern probability texts and follow stochastic
analysis. Three integrated walkthroughs.

## Walkthrough 1: MCMC for Bayesian inference

You want samples from a posterior $\pi(\theta | \text{data})$ that you
can't compute analytically.

1. **Design** a Metropolis-Hastings Markov chain (Lesson 08) whose
   stationary is $\pi$.
2. **Simulate** for many steps. By LLN/ergodic theorem (Lessons 05,
   08), time averages converge to $\pi$-expectations.
3. **Diagnostics** — effective sample size, $\hat R$ statistic
   estimating spectral gap (Lesson 08), trace plots.
4. **CLT** (Lesson 06) gives standard errors for averages over
   chain output.

Used in Stan, PyMC, NumPyro for Bayesian regression, hierarchical
models, latent-variable models.

## Walkthrough 2: option pricing in finance

Black-Scholes prices an option as the *expected* discounted payoff
under the **risk-neutral measure** (Lessons 02, 03):

$$
\text{Price}_0 = e^{-rT} \mathbb{E}^Q[(S_T - K)^+].
$$

- The discounted price $e^{-rt} S_t$ is a martingale (Lesson 07)
  under $Q$ — *no-arbitrage* condition.
- Closed-form for European options: integrate against log-normal
  $S_T$.
- For path-dependent options: Monte Carlo sample paths, average
  payoffs, use CLT (Lesson 06) for confidence intervals.

The 1973 Black-Scholes paper won the Nobel Prize and reshaped
modern finance.

## Walkthrough 3: stochastic gradient descent

Train a neural net by minimising loss $L(\theta) = \mathbb{E}_{(x, y)} \ell(f_\theta(x), y)$.

- $\nabla L$ is unknown but estimable from a mini-batch.
- SGD step: $\theta_{n+1} = \theta_n - \eta_n \hat g_n$ where
  $\hat g_n$ is a stochastic estimate of $\nabla L(\theta_n)$.
- **Convergence theorem**: under decreasing learning rates
  $\sum \eta_n = \infty, \sum \eta_n^2 < \infty$, $\theta_n \to \theta^*$
  a.s. (Lesson 05).
- **Asymptotic normality**: under suitable conditions,
  $\sqrt n (\theta_n - \theta^*) \overset{d}{\to} \mathcal{N}(0, \Sigma)$
  (Lesson 06).

Modern optimisers (Adam, RMSProp) are momentum-augmented variants
with their own convergence theory.

## Roadmap

**Strand 6 Master** picks up:

- Continuous-time stochastic processes: Brownian motion, Itô calculus,
  SDEs.
- Ergodic theory and dynamical systems probability.
- Large-deviation theory.
- Empirical processes and concentration inequalities in depth.
- Stochastic integration in infinite dimensions.

**Strand 6 Research-adjacent**: stochastic PDE, rough paths,
optimal transport, free probability, KPZ universality.

## Closing

Probability moved from "fair-coin counting" to a measure-theoretic
science capable of handling continuous time, infinite dimensions, and
heavy tails. Modern statistical inference, machine learning,
mathematical finance, and mathematical physics all use this
language.

The probabilistic universe is much richer than its discrete
beginning suggests. Once you have measure theory, the probabilistic
"toolkit" feels more like a unified language for modeling
uncertainty across every quantitative discipline.

## Interactive

:::widget type=numeric-input prompt="Brownian motion is the limit of a scaled random walk (Donsker). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MCMC samples from a target distribution via a chain with that stationary. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In Black-Scholes, discounted asset price is a martingale under the risk-neutral measure. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SGD converges a.s. under the Robbins-Monro conditions. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="CLT requires finite variance. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Optional stopping: $\\mathbb{E}[X_\\tau] = \\mathbb{E}[X_0]$ — under conditions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stationary distribution: $\\pi P = \\pi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lebesgue and Riemann integrals agree on continuous functions over bounded intervals. Type 1." answer=1 explain="Yes.":::
