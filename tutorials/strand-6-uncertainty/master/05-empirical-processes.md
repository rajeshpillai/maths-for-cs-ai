---
strand: uncertainty
level: master
order: 5
title: Empirical Processes and Concentration
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 04-information-theory-deeper
    description: Information theory deeper
connections:
  - strand-6-uncertainty-master/06-spde-rough-paths
applications:
  - cs: "Statistical learning generalisation, kernel methods, deep-learning theory"
  - life: "How sample averages deviate from truth, uniformly"
---

# Empirical Processes and Concentration

## Explain Like I Am 7

You measure the height of $n$ random kids and build a "height
histogram" from your sample.  How well does this histogram match
the *true* histogram of all kids in the world — not just at one
spot, but *everywhere* on the height axis at once?  **Empirical
process** theory bounds the worst-case gap between your sample
histogram and reality.  It's the math foundation behind why
machine-learning models trained on $n$ examples *generalise* —
they don't just match the training data, they actually approximate
the true world.

## Mental

For iid $X_1, \ldots, X_n$ with distribution $\mu$:

- **Empirical measure** $\hat\mu_n = \frac{1}{n}\sum \delta_{X_i}$.
- **Empirical CDF** $\hat F_n(t) = \hat\mu_n((-\infty, t])$.
- **Empirical process** $\sqrt n (\hat F_n - F)$ — converges to a
  Brownian bridge.

The **uniform law of large numbers**: $\sup_t |\hat F_n(t) - F(t)| \to 0$
a.s. (Glivenko-Cantelli). Sharper than pointwise LLN.

## Vapnik-Chervonenkis (VC) theory

For a class $\mathcal F$ of functions $f : \mathcal X \to \{0, 1\}$:

**VC dimension** $d_{\rm VC}$: max $n$ such that $\mathcal F$ shatters
some set of $n$ points (realises all $2^n$ binary labelings).

**VC inequality**: with high probability,

$$
\sup_{f \in \mathcal F} |\hat \mathbb E f - \mathbb E f| \le O\left(\sqrt{\frac{d_{\rm VC} \log(n/d_{\rm VC})}{n}}\right).
$$

Foundation of statistical learning theory.

## Rademacher complexity

A finer measure of class complexity:

$$
\mathcal R_n(\mathcal F) = \mathbb E\left[\sup_{f \in \mathcal F} \frac{1}{n}\sum_{i=1}^n \sigma_i f(X_i)\right]
$$

with $\sigma_i$ iid Rademacher. Generalisation bounds proportional
to Rademacher complexity.

## Concentration inequalities

| Inequality | Bound on |
|---|---|
| Markov | $P(X \ge a) \le \mathbb E[X] / a$ |
| Chebyshev | $P(|X - \mu| \ge a) \le \mathrm{Var}/a^2$ |
| Chernoff | $P(\bar X_n - \mu > t) \le \exp(-n \Lambda^*(t))$ |
| Hoeffding | tail of bounded sums |
| Bernstein | tighter via variance |
| McDiarmid | bounded-difference functions |
| Talagrand | empirical-process suprema |

Different settings call for different tools.

## Interactive

:::widget type=numeric-input prompt="Glivenko-Cantelli: $\\sup |F_n - F| \\to 0$ a.s. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="VC dimension: max shatterable set size. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rademacher complexity bounds generalisation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="VC of half-spaces in $\\mathbb R^d$: $d + 1$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Talagrand's inequality**: empirical process suprema concentrate
around their mean. *The* concentration result for empirical processes.

**Symmetrization**: $\sup_f |\hat \mathbb E_n f - \mathbb E f| \le 2 \mathcal R_n(\mathcal F)$.
Reduces uniform deviations to Rademacher complexity.

**Chaining and Dudley's entropy integral**: bound expected suprema
via metric entropy.

**Dvoretzky-Kiefer-Wolfowitz**: $P(\sqrt n \|\hat F_n - F\|_\infty \ge t) \le 2 e^{-2 t^2}$ — sharp Gaussian tail.

## Computational

```python
import numpy as np
from scipy.stats import norm

# Glivenko-Cantelli demo
N = 10000
X = np.random.standard_normal(N)
ts = np.linspace(-3, 3, 100)
emp_cdf = np.array([np.mean(X <= t) for t in ts])
true_cdf = norm.cdf(ts)
print(f"Sup |F_n - F| = {np.max(np.abs(emp_cdf - true_cdf)):.4f}")

# DKW: expect ~ sqrt(log/n)
print(f"DKW-like bound: {np.sqrt(np.log(2/0.05) / (2 * N)):.4f}")

# Rademacher complexity: estimate empirically
def rademacher_complexity(class_eval, n_samples=1000, n_bootstrap=100):
    """class_eval(F, X) returns array of f(X) for f in F."""
    sup_avgs = []
    for _ in range(n_bootstrap):
        sigmas = np.random.choice([-1, 1], n_samples)
        # For class = halfspaces in 1D: sup_a sum sigma_i * sign(X_i - a)
        X = np.random.standard_normal(n_samples)
        # Sort X and sigma jointly
        idx = np.argsort(X)
        sigma_sorted = sigmas[idx]
        # Cumulative: sup over thresholds of cumsum
        cum = np.cumsum(sigma_sorted)
        sup = max(cum.max(), -cum.min())
        sup_avgs.append(sup / n_samples)
    return np.mean(sup_avgs)

print(f"Estimated R_n for half-spaces: {rademacher_complexity(None):.4f}")
# For half-spaces: O(1/sqrt n)
```

## Applied

- **Statistical learning theory** — generalisation bounds for SVMs,
  decision trees, deep nets.
- **PAC-learning** — sample-complexity bounds via VC dimension.
- **Bandit algorithms** — concentration for arm-mean estimates.
- **High-dim statistics** — sparse regression / matrix completion
  rely on concentration of measure.
- **Random matrix theory** — eigenvalue concentration via matrix
  Bernstein.

## Check Your Understanding

:::widget type=numeric-input prompt="Glivenko-Cantelli: uniform LLN for empirical CDF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="VC of half-spaces in $\\mathbb R^d$: $d + 1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rademacher complexity bounds expected sup deviation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DKW: $P(\\sqrt n \\| F_n - F \\| > t) \\le 2 e^{-2 t^2}$. Type 1." answer=1 explain="Yes.":::
