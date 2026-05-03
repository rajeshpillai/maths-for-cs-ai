---
strand: uncertainty
level: master
order: 2
title: Large Deviations
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 01-stochastic-processes
    description: Stochastic processes
connections:
  - strand-6-uncertainty-master/03-ergodic-theory
applications:
  - cs: "Concentration inequalities, ML generalisation, statistical physics"
  - life: "How rare are rare events?"
---

# Large Deviations

## Mental

LLN says $\bar X_n \to \mu$. CLT says $\sqrt n (\bar X_n - \mu) \to \mathcal N(0, \sigma^2)$.

**Large deviations** ask: how rare is $|\bar X_n - \mu| > t$ for *fixed*
$t$ (not shrinking)? Typically *exponentially* rare:

$$
P(\bar X_n - \mu > t) \approx e^{-n I(t)}
$$

for a **rate function** $I(t) \ge 0$.

## Cramér's theorem

For iid $X_i$ with cumulant generating function $\Lambda(\lambda) = \log \mathbb E[e^{\lambda X_1}]$:

**Cramér's theorem**:

$$
\lim_{n \to \infty} \frac{1}{n} \log P(\bar X_n \ge x) = -\Lambda^*(x),
$$

where $\Lambda^*$ is the **Legendre transform**:

$$
\Lambda^*(x) = \sup_\lambda (\lambda x - \Lambda(\lambda)).
$$

The rate function is the Legendre transform of the cumulant
generator.

## Worked example: Gaussian

For $X_i \sim \mathcal N(0, 1)$:
$\Lambda(\lambda) = \lambda^2/2$.
$\Lambda^*(x) = x^2/2$.

So $P(\bar X_n \ge x) \approx e^{-n x^2 / 2}$ — Gaussian tail bound,
matches direct computation.

## Sanov's theorem

For empirical distribution $L_n = \frac{1}{n} \sum \delta_{X_i}$ on
finite alphabet:

$$
P(L_n \in A) \approx \exp(-n \inf_{\nu \in A} \mathrm{KL}(\nu \| \mu)).
$$

Rate function = KL divergence to the target distribution.

Used in information theory (channel capacity, hypothesis testing).

## Interactive

:::widget type=numeric-input prompt="Cramér: $P(\\bar X_n \\ge x) \\approx e^{-n \\Lambda^*(x)}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rate function $\\Lambda^*$ is Legendre transform of $\\Lambda$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gaussian: $\\Lambda^*(x) = x^2/2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sanov rate function: KL divergence to true distribution. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Varadhan's lemma**: integral version of LDP, valuable for
computing partition-function asymptotics.

**LDPs in stochastic processes**: Schilder's theorem (Brownian
motion under shrinking), Freidlin-Wentzell (rare exits from
basins).

**Statistical mechanics connection**: free energy = Legendre
transform of entropy; phase transitions correspond to
non-strict-convexity / non-differentiability of rate functions.

**ML applications**: PAC-Bayesian bounds, large-deviation
generalisation theorems.

## Computational

```python
import numpy as np

# Cramér rate function for various distributions
def gaussian_rate(x, mu=0, sigma2=1):
    return (x - mu)**2 / (2 * sigma2)

def bernoulli_rate(x, p):
    """Λ*(x) = x log(x/p) + (1 - x) log((1 - x)/(1 - p))."""
    if x <= 0 or x >= 1: return np.inf
    return x * np.log(x / p) + (1 - x) * np.log((1 - x) / (1 - p))

# Verify Cramér numerically: simulate large deviations
def large_dev_numerical(n_samples=10000, n=100, x_threshold=0.5):
    """P(X̄_n > x) for n-sample average of iid N(0, 1)."""
    means = [np.mean(np.random.randn(n)) for _ in range(n_samples)]
    return np.mean([m > x_threshold for m in means])

x = 0.5
n = 100
empirical = large_dev_numerical(n=n, x_threshold=x)
theoretical = np.exp(-n * gaussian_rate(x))
print(f"Empirical P(X̄ > {x}) = {empirical:.6f}")
print(f"Cramér prediction (leading exp): {theoretical:.6f}")

# Bernoulli: rate function of fair coin deviating
print(f"Rate function for coin showing 0.7 fraction heads: {bernoulli_rate(0.7, 0.5):.4f}")
# = 0.7 log 1.4 + 0.3 log 0.6 ≈ 0.0824
```

## Applied

- **Statistical physics** — partition functions and free energies are
  large-deviation limits; phase transitions = rate-function
  singularities.
- **Information theory** — channel capacity, hypothesis-testing
  error exponents (Stein's lemma, Chernoff bound) are LDPs.
- **Concentration in ML** — PAC-Bayes generalisation bounds; large
  deviations of empirical risk.
- **Insurance / risk management** — ruin probabilities, extreme-
  value theory.
- **Population genetics** — fixation probabilities, escape from
  local fitness minima.

## Check Your Understanding

:::widget type=numeric-input prompt="Cramér: tail decays as $e^{-n \\Lambda^*}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Rate function = Legendre transform of cumulant generator. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gaussian rate $\\Lambda^*(x) = x^2/2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sanov rate function = KL divergence. Type 1." answer=1 explain="Yes.":::
