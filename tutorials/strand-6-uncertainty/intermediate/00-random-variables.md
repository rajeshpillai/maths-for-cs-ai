---
strand: uncertainty
level: intermediate
order: 0
title: Random Variables
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 09-applied-uncertainty
    description: Foundation capstone
connections:
  - strand-6-uncertainty-intermediate/01-expected-value-and-variance
applications:
  - cs: "Modeling latency, runtime, packet sizes; ML model outputs"
  - business: "Sales forecasting, customer behaviour, demand modelling"
  - games: "Damage rolls, drop quantities, frame-time budgets"
  - life: "Salary distributions, weather variables, exam scores"
---

# Random Variables

## Mental

A **random variable** is a function that assigns a number to each
outcome of a random experiment. The value isn't fixed — it depends
on which outcome happens — but its **distribution** (the probability
of each value) is.

Examples:

- **$X$ = sum of two dice rolls**. Possible values $2$ through $12$;
  probabilities computed via Strand 6 Foundation Lesson 01.
- **$X$ = number of heads in $10$ coin flips**. Possible values $0$
  through $10$; the **binomial distribution** (Lesson 02).
- **$X$ = time until a customer arrives**. Possible values are
  positive reals; the **exponential distribution** (continuous;
  Lesson 05 introduces continuous variables).

Two big categories:

- **Discrete** random variables: countable set of possible values.
  Often integer-valued (number of successes, count of events).
- **Continuous** random variables: any real number in some range.
  Heights, times, weights, etc.

For discrete RVs, the **probability mass function** (pmf) gives
$P(X = k)$ for each possible value $k$. For continuous RVs, the
**probability density function** (pdf) gives the density; integrate
over a range to get a probability.

## Notation

We write $X \sim \text{Distribution}$ to mean "$X$ follows the
distribution." Examples:

- $X \sim \text{Bernoulli}(p)$ — coin flip with success $p$.
- $X \sim \text{Binomial}(n, p)$ — sum of $n$ independent Bernoulli's.
- $X \sim \text{Normal}(\mu, \sigma^2)$ — bell curve.

We write $P(X = k)$ for the probability that $X$ takes the specific
value $k$ (discrete case) or $P(a \le X \le b)$ for an interval
(both discrete and continuous).

## Interactive

:::widget type=numeric-input prompt="A fair die roll. $X$ is the value rolled. $P(X = 3) = ?$ (As a fraction with denominator 6 — type the numerator.)" answer=1 explain="One outcome out of six.":::

:::widget type=numeric-input prompt="Two dice rolled. $X$ is the sum. $P(X = 7) = ?$ Type as fraction with denominator 36." answer=6 explain="Six pairs sum to 7. From Strand 6 Foundation Lesson 03.":::

:::widget type=numeric-input prompt="A standard binomial: $X \\sim \\text{Binomial}(4, 0.5)$ (number of heads in 4 fair-coin flips). $P(X = 2) = \\binom{4}{2} (0.5)^4 = ?$ — type the decimal." answer=0.375 explain="$\\binom{4}{2} = 6$. $6 \\cdot 0.0625 = 0.375$.":::

## Symbolic

For a discrete random variable $X$ with possible values $\{x_1, x_2,
\ldots\}$, the **probability mass function** is

$$
p_X(x_i) = P(X = x_i),
$$

with $\sum_i p_X(x_i) = 1$.

For a continuous random variable $X$, the **probability density
function** $f_X(x)$ satisfies

$$
P(a \le X \le b) = \int_a^b f_X(x) \, dx, \quad \int_{-\infty}^{\infty} f_X(x) \, dx = 1.
$$

A density value $f_X(x)$ is **not** a probability — only integrals
of it are. Densities can exceed $1$ (consider a uniform distribution
on $[0, 0.5]$, which has density $2$ everywhere).

The **cumulative distribution function** (CDF) is universal:

$$
F_X(x) = P(X \le x).
$$

For discrete: $F_X(x) = \sum_{x_i \le x} p_X(x_i)$.
For continuous: $F_X(x) = \int_{-\infty}^x f_X(t) \, dt$.

## Computational

```python
import numpy as np
import scipy.stats as stats

# Discrete: rolling two dice
def two_dice_pmf(k):
    if k < 2 or k > 12: return 0
    return (6 - abs(7 - k)) / 36

print([two_dice_pmf(k) for k in range(2, 13)])
# [0.0278, 0.0556, 0.0833, 0.1111, 0.1389, 0.1667, 0.1389, 0.1111, 0.0833, 0.0556, 0.0278]

# Binomial(4, 0.5)
print(stats.binom.pmf(2, 4, 0.5))   # 0.375

# Normal(0, 1) — continuous
print(stats.norm.pdf(0))            # 0.398... — density at 0
print(stats.norm.cdf(1.96))         # 0.975 — P(Z <= 1.96)
print(stats.norm.cdf(1.96) - stats.norm.cdf(-1.96))   # 0.95 — 95% interval
```

## Applied

- **ML output distributions**: a softmax classifier's output is the
  pmf of a discrete random variable (the predicted class).
- **Latency modelling**: $X = $ response time (continuous, often
  long-tailed — exponential or log-normal).
- **Discrete event simulation**: each event time is a random variable
  drawn from a distribution.

## Check Your Understanding

:::widget type=numeric-input prompt="Sum of pmf values over all possible outcomes equals?" answer=1 explain="Probabilities sum to 1.":::

:::widget type=numeric-input prompt="$X \\sim \\text{Binomial}(3, 0.5)$. $P(X = 0) = \\binom{3}{0}(0.5)^3 = ?$ — type the decimal." answer=0.125 explain="$1 \\cdot 0.125 = 0.125$.":::

:::widget type=numeric-input prompt="If $X$ is the result of one fair die, $P(X \\ge 5) = ?$ — type as fraction with denominator $6$." answer=2 explain="$\\{5, 6\\}$ — two outcomes. $2/6 = 1/3$.":::

:::widget type=numeric-input prompt="A pdf integrates to 1 over its support. The pdf of Uniform on $[0, 4]$ is constant $f = ?$" answer=0.25 explain="$f \\cdot (4 - 0) = 1$ requires $f = 0.25$.":::
