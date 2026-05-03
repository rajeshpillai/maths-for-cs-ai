---
strand: uncertainty
level: intermediate
order: 1
title: Expected Value and Variance
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 00-random-variables
    description: Random variables
connections:
  - strand-6-uncertainty-intermediate/02-binomial-distribution
applications:
  - cs: "Algorithm average-case analysis, latency variability"
  - business: "Risk-adjusted returns, insurance premium calculations"
  - games: "DPS variance vs raw damage; balance design"
  - life: "Investment risk vs return"
---

# Expected Value and Variance

## Mental

Strand 6 Foundation Lesson 08 introduced expected value $E[X] = \sum
p_i v_i$ as the long-run average. Two more concepts are essential:

- **Variance** $\text{Var}(X)$: how spread out the outcomes are
  around the expected value.
- **Standard deviation** $\sigma_X = \sqrt{\text{Var}(X)}$: same idea,
  in the same units as $X$ (so directly comparable).

A distribution can have **the same expected value but very
different variance**:

- $X = $ "you flip a coin; heads = $0$, tails = $0$." $E = 0,
  \text{Var} = 0$. (Constant — no randomness.)
- $X = $ "you flip a coin; heads = $-1$, tails = $+1$." $E = 0,
  \text{Var} = 1$.
- $X = $ "you flip a coin; heads = $-1\,000\,000$, tails = $+1\,000\,000$."
  $E = 0, \text{Var} = 10^{12}$.

All three have $E = 0$, but their **risk profiles** are wildly
different. Variance captures this.

## Formal definitions

For a discrete RV $X$:

$$
E[X] = \sum_i x_i p_i, \quad \text{Var}(X) = E[(X - E[X])^2] = \sum_i (x_i - E[X])^2 p_i.
$$

For continuous RVs, replace sums with integrals:

$$
E[X] = \int x f_X(x) \, dx, \quad \text{Var}(X) = \int (x - E[X])^2 f_X(x) \, dx.
$$

A useful **alternative formula** for variance:

$$
\text{Var}(X) = E[X^2] - (E[X])^2.
$$

(Often easier to compute — separate $E[X^2]$ and $E[X]$.)

**Standard deviation**: $\sigma_X = \sqrt{\text{Var}(X)}$.

## Linearity and additivity

**Linearity of expectation** (Foundation Lesson 08): $E[aX + b] =
aE[X] + b$, $E[X + Y] = E[X] + E[Y]$. Always true, even when
correlated.

**Variance**: $\text{Var}(aX + b) = a^2 \text{Var}(X)$. The $a^2$
factor (not $a$) — variance is in **squared units**.

For independent $X, Y$:

$$
\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y).
$$

(But **not** for correlated; **covariance** comes in — Lesson 09.)

## Interactive

:::widget type=numeric-input prompt="A fair die. $E[X] = 3.5$ (Foundation Lesson 08). $E[X^2] = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6 \\approx 15.17$. $\\text{Var}(X) = E[X^2] - (E[X])^2 = ?$ — round to 3 dp." answer=2.917 tolerance=0.005 explain="$15.17 - 3.5^2 = 15.17 - 12.25 = 2.917$. Or exact $35/12$.":::

:::widget type=numeric-input prompt="$\\sigma$ for the fair die — square root of $2.917$? Round to 3 dp." answer=1.708 tolerance=0.005 explain="$\\sqrt{35/12} \\approx 1.708$.":::

:::widget type=numeric-input prompt="Two independent fair dice. By independence, $\\text{Var}(X_1 + X_2) = 2 \\text{Var}(X) = ?$ — round to 3 dp." answer=5.833 tolerance=0.01 explain="$2 \\cdot 35/12 = 70/12 \\approx 5.833$.":::

:::widget type=numeric-input prompt="$X$ has $E[X] = 5$, $\\text{Var}(X) = 9$. What is $\\text{Var}(2X + 3)$?" answer=36 explain="$\\text{Var}(aX + b) = a^2 \\text{Var}(X) = 4 \\cdot 9 = 36$.":::

## Symbolic

| Quantity | Definition | Linearity |
|---|---|---|
| $E[X]$ | $\sum x p$ | always linear |
| $\text{Var}(X)$ | $E[(X - E[X])^2]$ | $\text{Var}(aX + b) = a^2 \text{Var}(X)$ |
| $\sigma_X$ | $\sqrt{\text{Var}(X)}$ | scales by $|a|$ |

The **standard deviation** has the desirable property of having the
same units as $X$ — so "average deviation" makes sense.

A useful **interpretation**: roughly, $X$ falls within $1\sigma$ of
$E[X]$ about $68\%$ of the time, within $2\sigma$ about $95\%$ of
the time, within $3\sigma$ about $99.7\%$ — for **normally
distributed** $X$ (Lesson 05). Other distributions have different
proportions, but the rule-of-thumb is widely used.

## Computational

```python
import numpy as np
import scipy.stats as stats

# Fair die
values = np.array([1, 2, 3, 4, 5, 6])
probs = np.full(6, 1/6)

E = (values * probs).sum()
print(E)                                 # 3.5
print(((values - E) ** 2 * probs).sum())  # 2.9166... — variance
print(((values ** 2) * probs).sum() - E ** 2)  # 2.9166... — alt formula

# Sample variance from data
data = np.random.randint(1, 7, size=10_000)
print(data.mean())   # ~3.5
print(data.var())    # ~2.9
```

`scipy.stats` has built-in mean, var, std for named distributions.

## Applied

- **Investment**: a portfolio's expected return is the weighted
  average of asset returns; variance measures **risk**. Two
  portfolios with the same $E$ can have very different $\sigma$ —
  the higher-$\sigma$ one is riskier.
- **Algorithm analysis**: average runtime is $E[T]$. Quicksort has
  $E[T] = O(n \log n)$ but $\text{Var}$ is non-trivial — worst-case
  behaviour matters too.
- **Game design**: a sword that does $50$ damage flat ($\sigma = 0$)
  feels different from one that does $0$ to $100$ damage uniformly
  ($\sigma \approx 29$). Same $E$, different feel.

## Check Your Understanding

:::widget type=numeric-input prompt="A fair coin: $X = +1$ heads, $-1$ tails. $E[X] = 0$. $E[X^2] = ?$" answer=1 explain="$0.5(1) + 0.5(1) = 1$.":::

:::widget type=numeric-input prompt="Continuing: $\\text{Var}(X) = E[X^2] - (E[X])^2 = ?$" answer=1 explain="$1 - 0 = 1$.":::

:::widget type=numeric-input prompt="$\\sigma$ for the same coin: $\\sqrt{1} = ?$" answer=1 explain="$\\sigma = 1$.":::

:::widget type=numeric-input prompt="$X, Y$ independent, $\\text{Var}(X) = 4, \\text{Var}(Y) = 9$. $\\text{Var}(X + Y) = ?$" answer=13 explain="$4 + 9 = 13$. Independence allows variance addition.":::
