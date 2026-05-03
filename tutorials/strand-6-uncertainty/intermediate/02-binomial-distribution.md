---
strand: uncertainty
level: intermediate
order: 2
title: Bernoulli and Binomial Distributions
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 01-expected-value-and-variance
    description: Expected value and variance
connections:
  - strand-5-pattern-counting-foundation/05-binomial-theorem
applications:
  - cs: "Coin-flip simulations, $k$-out-of-$n$ failure analysis"
  - business: "Conversion-rate analysis (each visitor is a Bernoulli trial)"
  - games: "Drop rates, hit chances per attack"
  - life: "Success counts in repeated independent attempts"
---

# Bernoulli and Binomial Distributions

## Mental

The simplest random variable: **Bernoulli($p$)**.

$$
X = \begin{cases} 1 & \text{with prob } p \\ 0 & \text{with prob } 1 - p \end{cases}
$$

A coin flip with bias $p$. $E[X] = p$, $\text{Var}(X) = p(1-p)$.

The **binomial distribution** $\text{Binomial}(n, p)$ is the **sum
of $n$ independent Bernoulli($p$) trials**. $X$ counts the number of
"successes" in $n$ trials.

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \ldots, n.
$$

Strand 5 Foundation Lesson 05's binomial theorem gave the
$\binom{n}{k}$ — choose **which** $k$ trials succeed. The $p^k(1-p)^{n-k}$
gives the probability of any specific success/failure pattern.

By linearity of expectation:

$$
E[X] = n p, \quad \text{Var}(X) = n p (1 - p), \quad \sigma = \sqrt{np(1-p)}.
$$

## Interactive

:::widget type=numeric-input prompt="$X \\sim \\text{Binomial}(10, 0.5)$. $E[X] = ?$" answer=5 explain="$np = 5$.":::

:::widget type=numeric-input prompt="Same: $\\text{Var}(X) = ?$" answer=2.5 explain="$np(1-p) = 10 \\cdot 0.5 \\cdot 0.5 = 2.5$.":::

:::widget type=numeric-input prompt="$X \\sim \\text{Binomial}(5, 0.4)$. $P(X = 2) = \\binom{5}{2} (0.4)^2 (0.6)^3 = ?$ Round to 3 dp." answer=0.346 tolerance=0.005 explain="$10 \\cdot 0.16 \\cdot 0.216 = 0.3456$.":::

:::widget type=probability-sim experiment=two-coins step=200 target=HH:::

The two-coin example: each pair is a Bernoulli($1/4$) trial for "both
heads," and after $N$ trials we expect $N/4$ HH outcomes — the
binomial mean.

:::widget type=numeric-input prompt="In $1000$ flips of a fair coin, how many heads do you expect on average?" answer=500 explain="$np = 500$.":::

:::widget type=numeric-input prompt="Standard deviation in 1000 flips? $\\sigma = \\sqrt{1000 \\cdot 0.5 \\cdot 0.5}$. Round to nearest integer." answer=16 explain="$\\sqrt{250} \\approx 15.8$. So flip counts of $500 \\pm 16$ are 'within one $\\sigma$.'":::

## Symbolic

$X \sim \text{Binomial}(n, p)$:

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}.
$$

Mean: $np$. Variance: $np(1-p)$. Standard deviation: $\sqrt{np(1-p)}$.

The mode (most likely value) is $\lfloor (n+1)p \rfloor$ — usually
near $np$.

For large $n$ and moderate $p$ (so $np > \sim 5$ and $n(1-p) > \sim 5$),
the binomial is well-approximated by a **normal** distribution
$N(np, np(1-p))$. We'll see this generally as the central limit
theorem (Lesson 06).

## Computational

```python
import scipy.stats as stats
import math

# Probability of k successes in n trials with p
def binomial_pmf(n, k, p):
    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)

print(binomial_pmf(10, 5, 0.5))    # 0.2461 — exactly 5 heads in 10 flips
print(binomial_pmf(20, 18, 0.99))  # exam — 18 right out of 20 with p=0.99 each

# scipy version
print(stats.binom.pmf(5, 10, 0.5))   # 0.2461
print(stats.binom.cdf(7, 10, 0.5))   # 0.945 — P(at most 7 heads)

# Mean, variance
print(stats.binom.mean(10, 0.5))   # 5.0
print(stats.binom.var(10, 0.5))    # 2.5
```

## Applied

- **A/B test conversions**: each visitor is Bernoulli($p$), where $p$
  is the conversion rate. Total conversions in $n$ visitors is
  Binomial($n, p$).
- **Quality control**: number of defects in a batch of $n$ items,
  each defective with probability $p$ — Binomial.
- **Game crit chances**: $n$ attacks, each with crit probability $p$
  → number of crits is Binomial.
- **Polling**: in a survey of $n$ people, the count voting "yes" is
  Binomial($n, p$) where $p$ is the true preference rate.

## Check Your Understanding

:::widget type=numeric-input prompt="$X \\sim \\text{Binomial}(20, 0.3)$. $E[X] = ?$" answer=6 explain="$np = 6$.":::

:::widget type=numeric-input prompt="$\\text{Var}(X)$ same: $20 \\cdot 0.3 \\cdot 0.7 = ?$" answer=4.2 explain="$4.2$.":::

:::widget type=numeric-input prompt="$X \\sim \\text{Binomial}(3, 0.5)$. $P(X = 0) = ?$" answer=0.125 explain="$(0.5)^3 = 0.125$.":::

:::widget type=numeric-input prompt="$10$ attacks, each with $20\\%$ crit rate. Expected number of crits?" answer=2 explain="$np = 10 \\cdot 0.2 = 2$.":::
