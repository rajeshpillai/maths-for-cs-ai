---
strand: uncertainty
level: advanced
order: 5
title: Laws of Large Numbers
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 04-convergence
    description: Convergence
connections:
  - strand-6-uncertainty-advanced/06-clt-rigorous
applications:
  - cs: "Why averaging works in ML, MCMC, polling"
  - life: "The mathematics of why repeated experiments converge"
---

# Laws of Large Numbers

## Explain Like I Am 7

Roll a fair die a hundred times and average the results — you'll
land near $3.5$.  Roll it a million times — you'll land *really*
close to $3.5$.  The **law of large numbers** is the theorem that
makes this everyday observation a mathematical certainty.  There
are two flavours: the **weak** version says the chance of being far
off shrinks as you keep rolling, and the **strong** version says
nearly *every* possible run of rolls eventually settles right onto
the true average.  This is the bedrock under polls, simulations,
and machine learning.

## Mental

Two flavors:

- **Weak Law of Large Numbers (WLLN)**: $\bar X_n \overset{P}{\to} \mu$.
  Sample mean converges to true mean *in probability*.
- **Strong Law of Large Numbers (SLLN)**: $\bar X_n \overset{a.s.}{\to} \mu$.
  Sample mean converges *almost surely*.

Both require finite mean $\mu = \mathbb{E}[X_1]$. SLLN is stronger
(Lesson 04).

## Worked example

Roll a fair die many times; let $X_i$ be the $i$-th roll.
$\mathbb{E}[X_i] = 3.5$.

WLLN: $P(|\bar X_n - 3.5| > \epsilon) \to 0$.
SLLN: with probability 1, $\bar X_n \to 3.5$.

Both flavors say "the sample mean stabilises at 3.5." The SLLN gives
the cleaner *path-wise* picture.

## Proof sketches

**WLLN** (with finite variance $\sigma^2$): Chebyshev's inequality
gives $P(|\bar X_n - \mu| > \epsilon) \le \sigma^2 / (n \epsilon^2) \to 0$.

**SLLN** (Kolmogorov's classical proof): use Borel-Cantelli on
events $A_n = \{|\bar X_n - \mu| > \epsilon\}$ — show
$\sum P(A_n) < \infty$ for any $\epsilon$.

## Without finite variance

Even if $\sigma^2$ is infinite, the SLLN still holds when
$\mathbb{E}|X|$ is finite (Etemadi's proof). But the rate is no
longer $1/\sqrt n$.

When $\mathbb{E}|X| = \infty$ (Cauchy distribution), the LLN
**fails** — $\bar X_n$ has the same distribution as $X_1$.

## Interactive

:::widget type=numeric-input prompt="WLLN: $\\bar X_n \\to \\mu$ in probability. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SLLN: $\\bar X_n \\to \\mu$ a.s. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cauchy distribution has no mean — LLN fails. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sample mean of 6-sided die rolls converges to $?$" answer=3.5 explain="$3.5$.":::

## Symbolic

**Glivenko-Cantelli theorem**: empirical CDF converges to true CDF
**uniformly** a.s.

$$
\sup_x |F_n(x) - F(x)| \overset{a.s.}{\to} 0.
$$

The "fundamental theorem of statistics" — justifies all empirical
estimation, bootstrap methods, and KS-type tests.

**Ergodic theorem**: generalises SLLN to time averages of stationary
processes. For ergodic Markov chains: time average = space average.

**Concentration of measure**: stronger than LLN — bounds *how fast*
$\bar X_n$ approaches $\mu$. Hoeffding $P(|\bar X_n - \mu| > t) \le 2 e^{-2 n t^2 / (b - a)^2}$
for bounded $X_i \in [a, b]$.

## Computational

```python
import numpy as np

# WLLN demonstration: sample mean of die rolls
N = 100000
rolls = np.random.randint(1, 7, N)
running_mean = np.cumsum(rolls) / np.arange(1, N + 1)
print(running_mean[-10:])                    # close to 3.5

# Cauchy distribution: LLN fails
# Cauchy = ratio of two N(0,1) — heavy tails
cauchy = np.random.standard_cauchy(N)
running_mean_cauchy = np.cumsum(cauchy) / np.arange(1, N + 1)
print(running_mean_cauchy[-10:])             # erratic — does NOT settle

# Hoeffding bound
def hoeffding_prob_bound(n, t, b_minus_a=1):
    return 2 * np.exp(-2 * n * t**2 / b_minus_a**2)

print(hoeffding_prob_bound(1000, 0.1))       # P(|sample mean - mu| > 0.1)
```

## Applied

- **Polling and surveys** — sample size determines confidence:
  $\sqrt n$-rate of convergence per CLT (Lesson 06).
- **Monte Carlo simulation** — compute integrals and probabilities by
  averaging — LLN guarantees convergence.
- **Reinforcement learning** — Q-value estimates and policy
  evaluations are sample means.
- **Quality control** — process monitoring uses SLLN: long-run
  defect rate stabilises to true rate.
- **Clinical trials** — sample mean of treatment effect estimates
  population effect.

## Check Your Understanding

:::widget type=numeric-input prompt="WLLN: convergence in probability. SLLN: a.s. Type 1 if SLLN is stronger." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LLN requires finite mean. Type 1." answer=1 explain="Yes — Cauchy fails it.":::

:::widget type=numeric-input prompt="Glivenko-Cantelli: empirical CDF converges uniformly to true CDF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hoeffding bound: $P(|\\bar X_n - \\mu| > t) \\le 2 e^{-2 n t^2 / (b-a)^2}$ for bounded $X$. Type 1." answer=1 explain="Yes.":::
