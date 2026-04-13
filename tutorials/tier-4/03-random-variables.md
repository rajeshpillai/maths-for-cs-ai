# Random Variables — Discrete and Continuous

## Intuition

A **random variable** is a number that depends on the outcome of a random
experiment.  "The sum of two dice" is a random variable.  "The height of a
randomly chosen person" is a random variable.  Random variables let us do
**algebra** with randomness — add them, multiply them, compute averages.

## Prerequisites

- Tier 4, Lesson 1: Probability Axioms

## From First Principles

### Definition

A **random variable** $X$ is a function from the sample space to the real numbers:

$$X: \Omega \to \mathbb{R}$$

Notation: uppercase $X$ for the variable, lowercase $x$ for a specific value.

### Discrete random variables

Takes a **countable** number of values (often integers).

**Probability mass function (PMF):**

$$p(x) = P(X = x)$$

Must satisfy: $p(x) \ge 0$ for all $x$, and $\sum_x p(x) = 1$.

**Pen & paper: Sum of two dice**

$X$ = sum of two fair dice.

| $x$ | Ways | $p(x)$ |
|-----|------|---------|
| 2 | (1,1) | 1/36 |
| 3 | (1,2),(2,1) | 2/36 |
| 4 | (1,3),(2,2),(3,1) | 3/36 |
| 5 | 4 ways | 4/36 |
| 6 | 5 ways | 5/36 |
| 7 | 6 ways | 6/36 |
| 8 | 5 ways | 5/36 |
| 9 | 4 ways | 4/36 |
| 10 | 3 ways | 3/36 |
| 11 | 2 ways | 2/36 |
| 12 | (6,6) | 1/36 |

Total: $1 + 2 + 3 + 4 + 5 + 6 + 5 + 4 + 3 + 2 + 1 = 36/36 = 1$ ✓

**Pen & paper:** $P(X = 7) = 6/36 = 1/6$ — the most likely sum.

### Cumulative distribution function (CDF)

$$F(x) = P(X \le x) = \sum_{t \le x} p(t)$$

**Pen & paper:** For two dice, $F(4) = P(X \le 4) = 1/36 + 2/36 + 3/36 = 6/36 = 1/6$

### Continuous random variables

Takes any value in an interval.  Individual point probabilities are zero!

**Probability density function (PDF):**

$$P(a \le X \le b) = \int_a^b f(x)\,dx$$

Must satisfy: $f(x) \ge 0$ and $\int_{-\infty}^{\infty} f(x)\,dx = 1$.

**Pen & paper:** $f(x) = 2x$ for $0 \le x \le 1$ (zero elsewhere).

Verify it's a valid PDF: $\int_0^1 2x\,dx = [x^2]_0^1 = 1$ ✓

$P(0.5 \le X \le 1) = \int_{0.5}^{1} 2x\,dx = [x^2]_{0.5}^{1} = 1 - 0.25 = 0.75$

### CDF for continuous variables

$$F(x) = P(X \le x) = \int_{-\infty}^{x} f(t)\,dt$$

And the PDF is the derivative of the CDF: $f(x) = F'(x)$.

**Pen & paper:** For $f(x) = 2x$: $F(x) = x^2$ for $0 \le x \le 1$.

$F(0.5) = 0.25$ means there's a 25% chance $X \le 0.5$.

### Discrete vs Continuous summary

| | Discrete | Continuous |
|-|----------|-----------|
| Values | Countable (integers) | Uncountable (reals) |
| Probability of exact value | $P(X = x) = p(x) > 0$ | $P(X = x) = 0$ |
| Distribution function | PMF: $p(x)$ | PDF: $f(x)$ |
| $P(a \le X \le b)$ | $\sum_{x=a}^{b} p(x)$ | $\int_a^b f(x)\,dx$ |
| Sum to 1 | $\sum p(x) = 1$ | $\int f(x)\,dx = 1$ |

## Python Verification

```python
# ── Random Variables: verifying pen & paper work ────────────
from collections import Counter
import random

# PMF of sum of two dice
print("=== PMF: sum of two dice ===")
pmf = Counter()
for d1 in range(1, 7):
    for d2 in range(1, 7):
        pmf[d1 + d2] += 1

for x in range(2, 13):
    p = pmf[x] / 36
    bar = '█' * pmf[x]
    print(f"  X={x:2d}: {pmf[x]:d}/36 = {p:.4f} {bar}")

print(f"  Sum = {sum(pmf.values())}/36 = {sum(pmf.values())/36}")

# CDF
print(f"\n=== CDF: P(X ≤ 4) ===")
cdf_4 = sum(pmf[x] for x in range(2, 5)) / 36
print(f"  F(4) = {cdf_4:.4f}")

# Continuous: f(x) = 2x on [0,1]
print(f"\n=== Continuous PDF: f(x) = 2x ===")
# Verify integral = 1
n = 100000
dx = 1 / n
total = sum(2 * (i * dx) * dx for i in range(n))
print(f"  ∫₀¹ 2x dx ≈ {total:.6f} (should be 1)")

# P(0.5 ≤ X ≤ 1)
p_half_to_1 = sum(2 * (i * dx) * dx for i in range(n // 2, n))
print(f"  P(0.5 ≤ X ≤ 1) ≈ {p_half_to_1:.4f} (exact: 0.75)")

# Simulation
print(f"\n=== Simulation: 100K samples from f(x)=2x ===")
# Use inverse CDF: F(x) = x², F⁻¹(u) = √u
random.seed(42)
samples = [random.random() ** 0.5 for _ in range(100000)]  # inverse CDF trick: F⁻¹(u) = √u... wait
# Actually F(x) = x², so F⁻¹(u) = √u
# But f(x) = 2x has F(x) = x², so to sample: x = √u where u ~ Uniform(0,1)
samples = [random.random() ** 0.5 for _ in range(100000)]
count = sum(1 for s in samples if 0.5 <= s <= 1)
print(f"  P(0.5 ≤ X ≤ 1) ≈ {count/100000:.4f} (exact: 0.75)")
```

## Connection to CS / Games / AI

- **Neural network outputs** — softmax produces a PMF over classes
- **Loss functions** — cross-entropy compares predicted PMF to true PMF
- **Loot tables** — game drop rates are PMFs
- **Sensor readings** — modelled as continuous random variables with noise
- **Sampling** — generating random data for Monte Carlo, data augmentation, dropout

## Check Your Understanding

1. **Pen & paper:** A coin is flipped 3 times. $X$ = number of heads.  Write out the PMF table.
2. **Pen & paper:** For $f(x) = 3x^2$ on $[0, 1]$, verify it's a valid PDF.  Find $P(X > 0.5)$.
3. **Pen & paper:** If $F(x) = 1 - e^{-x}$ for $x \ge 0$, find the PDF $f(x)$.  What distribution is this?
4. **Think about it:** Why is $P(X = 0.5) = 0$ for a continuous random variable, yet $P(0.499 \le X \le 0.501) > 0$?
