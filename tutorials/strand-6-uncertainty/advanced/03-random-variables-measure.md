---
strand: uncertainty
level: advanced
order: 3
title: Random Variables and Distributions
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 02-lebesgue-measure
    description: Lebesgue measure
connections:
  - strand-6-uncertainty-advanced/04-convergence
applications:
  - cs: "Foundation of stochastic ML and Bayesian methods"
  - life: "Random variables, formally"
---

# Random Variables and Distributions

## Explain Like I Am 7

A random variable is just a polite rule that says "if such-and-such
random thing happens, here's the number I'll spit out."  Once we
have it, we can ask: out of every possible outcome, what fraction
maps to a number $\le x$?  That fraction-as-a-function-of-$x$ is
the **cumulative distribution function**, the most honest
fingerprint of the random variable.  Continuous variables also
have a **density** — a smooth height curve where total area
underneath equals $1$, just like the soft hump of a bell curve.

## Mental

A **random variable** $X : (\Omega, \mathcal F, P) \to \mathbb{R}$ is
a measurable function from a probability space to the reals.

The **distribution** of $X$ is the *push-forward measure*: for any
Borel $A$,

$$
\mu_X(A) = P(X^{-1}(A)) = P(X \in A).
$$

This is a probability measure on $\mathbb{R}$. The map
$X \mapsto \mu_X$ packages "what values $X$ takes and with what
chance."

## Distribution functions

The **cumulative distribution function** (CDF):

$$
F_X(x) = P(X \le x) = \mu_X((-\infty, x]).
$$

CDFs are non-decreasing, right-continuous, with limits 0 and 1. Every
such function is the CDF of some random variable.

If $F$ is differentiable, the **probability density function**
$f_X = F'_X$ exists, and

$$
P(X \in A) = \int_A f_X(x) \, dx.
$$

## Discrete vs continuous vs neither

| Type | $\mu_X$ supported on | Has PDF? |
|---|---|---|
| Discrete | Countable set | No |
| Continuous (absolutely cts) | Uncountable, $\mu \ll$ Lebesgue | Yes (Radon-Nikodym) |
| Singular | Cantor-like set, no PDF | No |
| Mixed | Mixture | Sort of |

The Cantor distribution is singular continuous: continuous CDF, no
density.

## Worked example: standard normal

CDF: $F_Z(z) = \int_{-\infty}^z \frac{1}{\sqrt{2\pi}} e^{-t^2/2} \, dt$.

PDF: $f_Z(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2}$.

By measure-theoretic definition, $Z$ is just a measurable function
$\Omega \to \mathbb{R}$ whose push-forward is this distribution.
The "particular $\Omega$" is irrelevant.

## Interactive

:::widget type=numeric-input prompt="Random variable = measurable function. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CDF $F$ is non-decreasing, $\\lim_{x \\to -\\infty} F(x) = ?$" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to \\infty} F(x) = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="The Cantor distribution has continuous CDF but no density. Type 1." answer=1 explain="Yes — singular continuous.":::

## Symbolic

**Radon-Nikodym theorem**: $\mu_X \ll \nu$ (absolutely continuous wrt
$\nu$) iff there exists a measurable $f \ge 0$ with $\mu_X(A) = \int_A f \, d\nu$.

The function $f$ is the **Radon-Nikodym derivative** $d\mu_X / d\nu$.
For $\nu = $ Lebesgue, $f$ is the usual probability density.

**Expectation**:

$$
\mathbb{E}[X] = \int_\Omega X \, dP = \int_\mathbb{R} x \, d\mu_X(x).
$$

The first form is via the original space; the second uses the
push-forward. Both agree by the *change-of-variables theorem* in
measure theory.

**Independence** (formal): $X, Y$ independent iff joint measure
$\mu_{(X, Y)} = \mu_X \times \mu_Y$ (product measure on $\mathbb{R}^2$).

## Computational

```python
import numpy as np
from scipy import stats

# Random variable as a function on a sample space
# Sample 10000 from a uniform U[0, 1] then compute X = -log(U) ~ Exp(1)
N = 10000
U = np.random.rand(N)
X = -np.log(U)

# Distribution of X: should be exponential with mean 1
print(np.mean(X), np.var(X))            # ~1, ~1

# CDF empirical vs theoretical
xs = np.sort(X)
empirical = np.arange(1, N + 1) / N
theoretical = 1 - np.exp(-xs)
print(np.max(np.abs(empirical - theoretical)))   # KS statistic

# Standard normal: scipy
Z = stats.norm()
print(Z.cdf(0), Z.pdf(0))               # 0.5, ~0.3989

# Sample then push-forward
samples = Z.rvs(10000)
print(np.mean(samples), np.std(samples))   # ~0, ~1
```

## Applied

- **Bayesian inference** — prior, likelihood, posterior all live in
  measure-theoretic generality. Conjugate priors and computational
  schemes (variational, MCMC) work in this language.
- **Stochastic differential equations** — solutions are random
  variables on path space; rigorous treatment needs measure theory.
- **Information theory** — entropy $H(X) = -\int p \log p$,
  KL divergence — measure-theoretically defined.
- **Decision theory** — Bayes risk, minimax decisions integrate over
  posterior measures.

## Check Your Understanding

:::widget type=numeric-input prompt="Push-forward measure: $\\mu_X(A) = P(X \\in A)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CDF is non-decreasing and right-continuous. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PDF exists when distribution is absolutely continuous wrt Lebesgue. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Independence: joint measure = product of marginals. Type 1." answer=1 explain="Yes.":::
