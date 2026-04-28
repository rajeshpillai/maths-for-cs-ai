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

## Visualisation — PMFs, PDFs, and their CDFs

A random variable comes in two flavours: **discrete** (a list of
possible values, each with a probability — a PMF) and **continuous** (a
density curve where probability is *area*, not height — a PDF). The
**CDF** $F(x) = P(X \le x)$ is the sum or integral of the PMF/PDF up to
$x$, and it always climbs from 0 to 1.

```python
# ── Visualising discrete vs continuous random variables ─────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(13, 9))

# Discrete RV: roll one fair die. Values 1..6, each with P = 1/6.
xs_d = np.arange(1, 7)
pmf  = np.full_like(xs_d, 1/6, dtype=float)
cdf_d = np.cumsum(pmf)            # 1/6, 2/6, …, 6/6 = 1

# (1) PMF as bars: height = probability of that exact value.
ax = axes[0, 0]
ax.bar(xs_d, pmf, color="tab:blue", alpha=0.8, edgecolor="navy")
ax.set_title("Discrete: PMF p(x)\nbar HEIGHT = probability of each value")
ax.set_xlabel("x"); ax.set_ylabel("P(X = x)")
ax.set_ylim(0, 0.25); ax.grid(True, alpha=0.3)
for x, p in zip(xs_d, pmf):
    ax.text(x, p + 0.005, f"{p:.3f}", ha="center", fontsize=9)

# (2) CDF for a discrete RV is a STAIR-STEP: it jumps by p(x) at each
# value and stays flat in between.
ax = axes[0, 1]
ax.step(np.concatenate([[0], xs_d, [7]]),
        np.concatenate([[0], cdf_d, [1]]),
        where="post", color="tab:blue", lw=2)
for x, c in zip(xs_d, cdf_d):
    ax.scatter(x, c, color="tab:blue", zorder=5)
ax.set_title("Discrete: CDF F(x) = P(X ≤ x)\nstaircase, jumps by p(x)")
ax.set_xlabel("x"); ax.set_ylabel("F(x)")
ax.set_xlim(0, 7); ax.set_ylim(-0.05, 1.1); ax.grid(True, alpha=0.3)

# Continuous RV from the lesson:  f(x) = 2x on [0, 1], f = 0 elsewhere.
xs_c = np.linspace(0, 1, 400)
pdf  = 2 * xs_c
cdf_c = xs_c ** 2                  # F(x) = x²

# (3) PDF as a curve. Probability lives in *area under the curve*,
# not in the height. The shaded region is P(0.5 ≤ X ≤ 1) = 0.75.
ax = axes[1, 0]
ax.plot(xs_c, pdf, color="tab:orange", lw=2, label="$f(x) = 2x$")
mask = xs_c >= 0.5
ax.fill_between(xs_c[mask], pdf[mask], color="tab:orange", alpha=0.35,
                label="$P(0.5 \\leq X \\leq 1)$ = shaded area = 0.75")
ax.set_title("Continuous: PDF f(x)\nprobability = AREA under the curve")
ax.set_xlabel("x"); ax.set_ylabel("density f(x)")
ax.set_xlim(-0.1, 1.1); ax.set_ylim(0, 2.3)
ax.legend(); ax.grid(True, alpha=0.3)

# (4) CDF for a continuous RV is a smooth S-curve from 0 to 1.
ax = axes[1, 1]
ax.plot(xs_c, cdf_c, color="tab:orange", lw=2, label="$F(x) = x^2$")
ax.axhline(1.0, color="black", lw=0.6, linestyle=":")
ax.scatter([1.0], [1.0], color="tab:orange", zorder=5)
ax.scatter([0.0], [0.0], color="tab:orange", zorder=5)
ax.set_title("Continuous: CDF F(x) = ∫₀ˣ f(t)dt\nsmooth, climbs from 0 to 1")
ax.set_xlabel("x"); ax.set_ylabel("F(x)")
ax.set_xlim(-0.1, 1.1); ax.set_ylim(-0.05, 1.1)
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Sanity check: P(0.5 ≤ X ≤ 1) using F.
print(f"From the CDF: P(0.5 ≤ X ≤ 1) = F(1) - F(0.5) = {1.0**2 - 0.5**2:.4f}")
print(f"             — matches the orange shaded area in the bottom-left plot.")
print(f"PMF rule: sum of bars = {pmf.sum():.4f}  (probabilities must total 1)")
trap = getattr(np, "trapezoid", None) or np.trapz   # numpy 2.0 renamed it
print(f"PDF rule: integral of f over its support = {trap(pdf, xs_c):.4f}")
```

**The four pictures, side by side:**

- **Top-left (PMF).** Each bar is the actual probability of that value
  — the heights add to 1.
- **Top-right (discrete CDF).** A *staircase* that starts at 0, jumps
  by $p(x)$ at each possible value, and ends at 1.
- **Bottom-left (PDF).** The curve's *height is a density*, not a
  probability; densities can exceed 1. **Probability is the area**
  under the curve over the interval of interest. The shaded region is
  $P(0.5 \le X \le 1) = 0.75$.
- **Bottom-right (continuous CDF).** A smooth S-curve. To compute
  $P(a \le X \le b)$ you can read off $F(b) - F(a)$ directly — no
  integration needed once you have the CDF.

A useful mantra: *PMF/PDF tells you "how concentrated is probability
here?", CDF tells you "how much probability has accumulated by here?"*

## Connection to CS / Games / AI

- **Neural network outputs** — softmax produces a PMF over classes
- **Loss functions** — cross-entropy compares predicted PMF to true PMF
- **Loot tables** — game drop rates are PMFs
- **Sensor readings** — modelled as continuous random variables with noise
- **Sampling** — generating random data for Monte Carlo, data augmentation, dropout

## Transformations of Random Variables

### The problem

You know the distribution of $X$, and you define $Y = g(X)$.  What is the
distribution of $Y$?  This is fundamental — in ML you constantly transform
random variables (e.g., passing inputs through activation functions).

### Method 1: Distribution function (CDF) method

This always works:

1. Write $F_Y(y) = P(Y \le y) = P(g(X) \le y)$
2. Express the right side in terms of $X$
3. Differentiate to get the PDF: $f_Y(y) = F_Y'(y)$

### Method 2: One-to-one (monotonic) transformation formula

If $g$ is strictly monotonic (always increasing or always decreasing) and
differentiable, there is a direct formula:

$$f_Y(y) = f_X\!\left(g^{-1}(y)\right) \cdot \left|\frac{d}{dy}g^{-1}(y)\right|$$

**Why the absolute value of the derivative?**  The factor $|{(g^{-1})'(y)}|$
accounts for how $g$ stretches or compresses the probability.  If $g$ maps a
wide interval of $x$-values to a narrow interval of $y$-values, the density
must increase to keep total probability = 1.

### Pen & paper example 1: $X \sim \text{Uniform}(0,1)$, $Y = X^2$

We know $f_X(x) = 1$ for $0 \le x \le 1$.

Since $X \ge 0$, $g(x) = x^2$ is monotonically increasing on $[0, 1]$.

Step 1 — find the range of $Y$: since $x \in [0,1]$, $y = x^2 \in [0,1]$.

Step 2 — CDF method:
$F_Y(y) = P(Y \le y) = P(X^2 \le y) = P(X \le \sqrt{y}) = \sqrt{y}$
(for $0 \le y \le 1$, using $F_X(x) = x$)

Step 3 — differentiate:
$$f_Y(y) = \frac{d}{dy}\sqrt{y} = \frac{1}{2\sqrt{y}} \quad \text{for } 0 < y \le 1$$

**Verify with the formula:** $g^{-1}(y) = \sqrt{y}$, $(g^{-1})'(y) = \frac{1}{2\sqrt{y}}$

$f_Y(y) = f_X(\sqrt{y}) \cdot \left|\frac{1}{2\sqrt{y}}\right| = 1 \cdot \frac{1}{2\sqrt{y}} = \frac{1}{2\sqrt{y}}$ ✓

**Sanity check:** $\int_0^1 \frac{1}{2\sqrt{y}}\,dy = [\sqrt{y}]_0^1 = 1$ ✓

### Pen & paper example 2: $X \sim \text{Exp}(1)$, $Y = 2X + 3$

We know $f_X(x) = e^{-x}$ for $x \ge 0$.

$g(x) = 2x + 3$ is strictly increasing.

Step 1 — range: since $x \ge 0$, $y \ge 3$.

Step 2 — inverse: $g^{-1}(y) = \frac{y - 3}{2}$, $(g^{-1})'(y) = \frac{1}{2}$

Step 3 — apply the formula:

$$f_Y(y) = f_X\!\left(\frac{y-3}{2}\right) \cdot \left|\frac{1}{2}\right| = e^{-(y-3)/2} \cdot \frac{1}{2} = \frac{1}{2}e^{-(y-3)/2} \quad \text{for } y \ge 3$$

**Sanity check:** $\int_3^{\infty} \frac{1}{2}e^{-(y-3)/2}\,dy$. Let $u = (y-3)/2$, $du = dy/2$:

$= \int_0^{\infty} e^{-u}\,du = 1$ ✓

This is a shifted and scaled exponential.

### Python Verification (Transformations)

```python
# ── Transformations of Random Variables ───────────────────────
import random
import math

random.seed(42)
N = 200000

# Example 1: X ~ Uniform(0,1), Y = X²
print("=== Y = X² where X ~ Uniform(0,1) ===")
samples_x = [random.random() for _ in range(N)]
samples_y = [x**2 for x in samples_x]

# Check P(Y ≤ 0.25) — should be √0.25 = 0.5
p_sim = sum(1 for y in samples_y if y <= 0.25) / N
print(f"P(Y ≤ 0.25) simulated: {p_sim:.4f}")
print(f"P(Y ≤ 0.25) exact:     {0.25**0.5:.4f}")

# Check density at y=0.25: f_Y(0.25) = 1/(2√0.25) = 1
# Estimate density by counting samples in a small bin
bin_lo, bin_hi = 0.24, 0.26
count = sum(1 for y in samples_y if bin_lo <= y < bin_hi)
density_est = count / N / (bin_hi - bin_lo)
density_exact = 1 / (2 * math.sqrt(0.25))
print(f"f_Y(0.25) estimated: {density_est:.2f}")
print(f"f_Y(0.25) exact:     {density_exact:.2f}")

# Example 2: X ~ Exp(1), Y = 2X + 3
print("\n=== Y = 2X + 3 where X ~ Exp(1) ===")
samples_x2 = [random.expovariate(1.0) for _ in range(N)]
samples_y2 = [2*x + 3 for x in samples_x2]

# Mean of Y should be 2·E[X] + 3 = 2·1 + 3 = 5
mean_y = sum(samples_y2) / N
print(f"E[Y] simulated: {mean_y:.4f}")
print(f"E[Y] exact:     5.0000")

# Check density at y=5: f_Y(5) = 0.5·exp(-(5-3)/2) = 0.5·exp(-1)
bin_lo, bin_hi = 4.9, 5.1
count = sum(1 for y in samples_y2 if bin_lo <= y < bin_hi)
density_est = count / N / (bin_hi - bin_lo)
density_exact = 0.5 * math.exp(-1)
print(f"f_Y(5) estimated: {density_est:.4f}")
print(f"f_Y(5) exact:     {density_exact:.4f}")
```

## Check Your Understanding

1. **Pen & paper:** A coin is flipped 3 times. $X$ = number of heads.  Write out the PMF table.
2. **Pen & paper:** For $f(x) = 3x^2$ on $[0, 1]$, verify it's a valid PDF.  Find $P(X > 0.5)$.
3. **Pen & paper:** If $F(x) = 1 - e^{-x}$ for $x \ge 0$, find the PDF $f(x)$.  What distribution is this?
4. **Think about it:** Why is $P(X = 0.5) = 0$ for a continuous random variable, yet $P(0.499 \le X \le 0.501) > 0$?
5. **Pen & paper:** $X \sim \text{Uniform}(0, 1)$, $Y = -\ln(X)$.  Find the PDF of $Y$.  What well-known distribution is this?
6. **Pen & paper:** $X \sim \text{Uniform}(0, 1)$, $Y = X^3$.  Find $f_Y(y)$ and verify $\int_0^1 f_Y(y)\,dy = 1$.
