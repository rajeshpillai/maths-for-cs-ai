# Expectation, Variance, and Standard Deviation

## Intuition

**Expectation** is the "average" value you'd get if you repeated the experiment
infinitely many times.  **Variance** measures how spread out the values are
around that average.  **Standard deviation** is variance in the same units
as the original data.  These three numbers summarise any distribution.

## Prerequisites

- Tier 4, Lesson 3: Random Variables (PMF, PDF)

## From First Principles

### Expected value (mean)

**Discrete:**
$$E[X] = \sum_x x \cdot p(x)$$

**Continuous:**
$$E[X] = \int_{-\infty}^{\infty} x \cdot f(x)\,dx$$

### Pen & paper: Expected value of a die roll

$$E[X] = \sum_{x=1}^{6} x \cdot \frac{1}{6} = \frac{1 + 2 + 3 + 4 + 5 + 6}{6} = \frac{21}{6} = 3.5$$

Note: 3.5 is not a possible outcome! The expectation doesn't have to be a possible value.

### Pen & paper: Expected sum of two dice

$$E[X + Y] = E[X] + E[Y] = 3.5 + 3.5 = 7$$

This is why 7 is the most likely sum and the centre of the distribution.

### Properties of expectation

| Property | Formula |
|----------|---------|
| Linearity | $E[aX + b] = aE[X] + b$ |
| Sum | $E[X + Y] = E[X] + E[Y]$ (always, even if dependent!) |
| Product (independent) | $E[XY] = E[X]E[Y]$ (only if independent) |
| Constant | $E[c] = c$ |

### Pen & paper: $E[3X + 2]$ where $X$ is a die roll

$$E[3X + 2] = 3E[X] + 2 = 3(3.5) + 2 = 12.5$$

### Variance

$$\text{Var}(X) = E[(X - \mu)^2] = E[X^2] - (E[X])^2$$

The second formula is usually easier for pen & paper.

### Pen & paper: Variance of a die roll

First: $E[X^2] = \sum_{x=1}^{6} x^2 \cdot \frac{1}{6} = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6} \approx 15.167$

$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{91}{6} - \left(\frac{7}{2}\right)^2 = \frac{91}{6} - \frac{49}{4} = \frac{182 - 147}{12} = \frac{35}{12} \approx 2.917$$

### Standard deviation

$$\sigma = \sqrt{\text{Var}(X)}$$

For a die: $\sigma = \sqrt{35/12} \approx 1.708$

### Properties of variance

| Property | Formula |
|----------|---------|
| Scaling | $\text{Var}(aX) = a^2 \text{Var}(X)$ |
| Shift | $\text{Var}(X + b) = \text{Var}(X)$ (adding a constant doesn't change spread) |
| Sum (independent) | $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ |
| Non-negative | $\text{Var}(X) \ge 0$ |

### Pen & paper: Continuous example

$f(x) = 2x$ on $[0, 1]$.

$E[X] = \int_0^1 x \cdot 2x\,dx = \int_0^1 2x^2\,dx = \left[\frac{2x^3}{3}\right]_0^1 = \frac{2}{3}$

$E[X^2] = \int_0^1 x^2 \cdot 2x\,dx = \int_0^1 2x^3\,dx = \left[\frac{x^4}{2}\right]_0^1 = \frac{1}{2}$

$\text{Var}(X) = \frac{1}{2} - \left(\frac{2}{3}\right)^2 = \frac{1}{2} - \frac{4}{9} = \frac{9 - 8}{18} = \frac{1}{18} \approx 0.056$

$\sigma = \sqrt{1/18} \approx 0.236$

### Expected value of a function

$$E[g(X)] = \sum_x g(x) \cdot p(x) \quad \text{or} \quad \int g(x) \cdot f(x)\,dx$$

This is called the **law of the unconscious statistician** (LOTUS).

## Python Verification

```python
# ── Expectation & Variance: verifying pen & paper work ──────

# Die roll
print("=== Die roll ===")
probs = {x: 1/6 for x in range(1, 7)}
E_X = sum(x * p for x, p in probs.items())
E_X2 = sum(x**2 * p for x, p in probs.items())
Var_X = E_X2 - E_X**2
print(f"E[X] = {E_X:.4f}")
print(f"E[X²] = {E_X2:.4f}")
print(f"Var(X) = {Var_X:.4f} = 35/12 = {35/12:.4f}")
print(f"σ = {Var_X**0.5:.4f}")

# Linearity: E[3X + 2]
print(f"\n=== E[3X + 2] ===")
print(f"3·E[X] + 2 = {3*E_X + 2}")

# Sum of two dice
print(f"\n=== Sum of two dice ===")
print(f"E[X+Y] = E[X] + E[Y] = {E_X + E_X}")

# Continuous: f(x) = 2x on [0,1]
print(f"\n=== Continuous: f(x) = 2x ===")
n = 100000
dx = 1 / n
E_X_cont = sum((i*dx) * 2*(i*dx) * dx for i in range(n))
E_X2_cont = sum((i*dx)**2 * 2*(i*dx) * dx for i in range(n))
Var_cont = E_X2_cont - E_X_cont**2
print(f"E[X] ≈ {E_X_cont:.6f} (exact: {2/3:.6f})")
print(f"E[X²] ≈ {E_X2_cont:.6f} (exact: {1/2:.6f})")
print(f"Var(X) ≈ {Var_cont:.6f} (exact: {1/18:.6f})")

# Simulation verification
print(f"\n=== Simulation: 100K die rolls ===")
import random
random.seed(42)
rolls = [random.randint(1, 6) for _ in range(100000)]
mean = sum(rolls) / len(rolls)
var = sum((x - mean)**2 for x in rolls) / len(rolls)
print(f"Sample mean = {mean:.4f} (expected: 3.5)")
print(f"Sample var  = {var:.4f} (expected: {35/12:.4f})")
```

## Connection to CS / Games / AI

- **Loss functions** — expected loss over the data distribution is what we minimise
- **Batch normalisation** — normalises using running mean and variance
- **Bias-variance tradeoff** — high variance = overfitting, high bias = underfitting
- **Risk assessment** — expected value of losses, variance = risk
- **Game design** — expected reward per action, variance affects player experience
- **Random variable arithmetic** — propagating uncertainty through computations

## Moments

### What are moments?

Moments are a systematic way to describe the **shape** of a distribution.
Think of them as increasingly detailed measurements: the first moment tells
you *where* the distribution is centred, the second tells you *how wide* it
is, the third tells you *whether it leans*, and the fourth tells you *how
heavy the tails are*.

### Raw moments

The $k$-th **(raw) moment** of $X$:

$$\mu_k = E[X^k]$$

- $k = 1$: $E[X] = \mu$ — the **mean**
- $k = 2$: $E[X^2]$ — appears in the variance formula

### Central moments

The $k$-th **central moment** (centred around the mean):

$$\mu'_k = E[(X - \mu)^k]$$

- $k = 1$: $E[X - \mu] = 0$ (always zero — deviations cancel)
- $k = 2$: $E[(X - \mu)^2] = \text{Var}(X)$ — the **variance**
- $k = 3$: relates to **skewness** (asymmetry).  Positive → right tail longer; negative → left tail longer.  Normalised skewness: $\gamma_1 = \mu'_3 / \sigma^3$
- $k = 4$: relates to **kurtosis** (tail heaviness).  Normalised: $\gamma_2 = \mu'_4 / \sigma^4$.  The normal distribution has $\gamma_2 = 3$; "excess kurtosis" is $\gamma_2 - 3$.

### Pen & paper: first 3 moments of $X \sim \text{Uniform}(0,1)$

The PDF is $f(x) = 1$ on $[0, 1]$.

**First raw moment (mean):**

$E[X] = \int_0^1 x \cdot 1\,dx = \left[\frac{x^2}{2}\right]_0^1 = \frac{1}{2}$

**Second raw moment:**

$E[X^2] = \int_0^1 x^2\,dx = \left[\frac{x^3}{3}\right]_0^1 = \frac{1}{3}$

**Second central moment (variance):**

$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{1}{3} - \frac{1}{4} = \frac{1}{12}$

**Third raw moment:**

$E[X^3] = \int_0^1 x^3\,dx = \left[\frac{x^4}{4}\right]_0^1 = \frac{1}{4}$

**Third central moment:**

$\mu'_3 = E[(X - \tfrac{1}{2})^3] = E[X^3] - 3E[X^2]E[X] + 3E[X](E[X])^2 - (E[X])^3$

Using the expansion $E[(X-\mu)^3] = E[X^3] - 3\mu E[X^2] + 3\mu^2 E[X] - \mu^3$:

$= \frac{1}{4} - 3 \cdot \frac{1}{2} \cdot \frac{1}{3} + 3 \cdot \frac{1}{4} \cdot \frac{1}{2} - \frac{1}{8}$

$= \frac{1}{4} - \frac{1}{2} + \frac{3}{8} - \frac{1}{8} = \frac{2}{8} - \frac{4}{8} + \frac{3}{8} - \frac{1}{8} = 0$

The third central moment is zero — the Uniform distribution is **symmetric**,
so it has zero skewness.  ✓

## Moment Generating Functions

### Definition

The **moment generating function (MGF)** of a random variable $X$ is:

$$M_X(t) = E[e^{tX}]$$

(provided this expectation exists for $t$ in some interval around 0).

### Key property: extracting moments

$$M_X^{(k)}(0) = E[X^k]$$

That is, the $k$-th derivative of the MGF evaluated at $t = 0$ gives the
$k$-th moment.

**Why?** Expand $e^{tX}$ as a Taylor series:

$e^{tX} = 1 + tX + \frac{t^2 X^2}{2!} + \frac{t^3 X^3}{3!} + \cdots$

Taking expectation:

$M_X(t) = 1 + tE[X] + \frac{t^2}{2!}E[X^2] + \frac{t^3}{3!}E[X^3] + \cdots$

Differentiating $k$ times and setting $t = 0$ isolates $E[X^k]$.

### Pen & paper: MGF of $X \sim \text{Exp}(\lambda)$

The PDF is $f(x) = \lambda e^{-\lambda x}$ for $x \ge 0$.

$$M_X(t) = E[e^{tX}] = \int_0^{\infty} e^{tx} \cdot \lambda e^{-\lambda x}\,dx = \lambda \int_0^{\infty} e^{-(\lambda - t)x}\,dx$$

For this integral to converge, we need $\lambda - t > 0$, i.e., $t < \lambda$.

$$= \lambda \cdot \frac{1}{\lambda - t} = \frac{\lambda}{\lambda - t}$$

**Verify — extract $E[X]$:**

$M_X'(t) = \frac{\lambda}{(\lambda - t)^2}$

$M_X'(0) = \frac{\lambda}{\lambda^2} = \frac{1}{\lambda} = E[X]$ ✓ (the mean of $\text{Exp}(\lambda)$)

**Extract $E[X^2]$:**

$M_X''(t) = \frac{2\lambda}{(\lambda - t)^3}$

$M_X''(0) = \frac{2\lambda}{\lambda^3} = \frac{2}{\lambda^2} = E[X^2]$

$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{2}{\lambda^2} - \frac{1}{\lambda^2} = \frac{1}{\lambda^2}$ ✓

### Why MGFs are useful

1. **Uniqueness:** If two distributions have the same MGF, they are the same
   distribution.  This lets you identify distributions by computing their MGF.

2. **Sum of independents:** If $X$ and $Y$ are independent, then
   $M_{X+Y}(t) = M_X(t) \cdot M_Y(t)$.  This makes it easy to derive the
   distribution of sums — e.g., proving that the sum of independent normals
   is normal.

3. **Moments on demand:** Instead of computing $E[X^k]$ by integration each
   time, differentiate the MGF.

### Python Verification (Moments and MGFs)

```python
# ── Moments & Moment Generating Functions ─────────────────────
import random
import math

random.seed(42)
N = 200000

# Moments of Uniform(0,1)
print("=== Moments of Uniform(0,1) ===")
samples = [random.random() for _ in range(N)]

m1 = sum(x for x in samples) / N
m2 = sum(x**2 for x in samples) / N
m3 = sum(x**3 for x in samples) / N
var = m2 - m1**2
central_3 = sum((x - m1)**3 for x in samples) / N

print(f"E[X]   = {m1:.6f}  (exact: 0.500000)")
print(f"E[X²]  = {m2:.6f}  (exact: 0.333333)")
print(f"E[X³]  = {m3:.6f}  (exact: 0.250000)")
print(f"Var(X) = {var:.6f}  (exact: {1/12:.6f})")
print(f"μ'₃    = {central_3:.6f}  (exact: 0.000000)")

# MGF of Exp(λ) — verify numerically
print("\n=== MGF of Exp(λ=2) ===")
lam = 2.0
samples_exp = [random.expovariate(lam) for _ in range(N)]

# M_X(t) = E[e^{tX}] at t = 0.5
t = 0.5
mgf_sim = sum(math.exp(t * x) for x in samples_exp) / N
mgf_exact = lam / (lam - t)
print(f"M_X(0.5) simulated: {mgf_sim:.4f}")
print(f"M_X(0.5) exact:     {mgf_exact:.4f}")

# Verify E[X] and E[X²] from samples
ex = sum(samples_exp) / N
ex2 = sum(x**2 for x in samples_exp) / N
print(f"\nE[X]  simulated: {ex:.4f}  (exact: {1/lam:.4f})")
print(f"E[X²] simulated: {ex2:.4f}  (exact: {2/lam**2:.4f})")
print(f"Var(X) simulated: {ex2 - ex**2:.4f}  (exact: {1/lam**2:.4f})")

# MGF product rule: sum of 2 independent Exp(2) samples
print("\n=== MGF product: sum of independent Exp(2) ===")
sums = [random.expovariate(lam) + random.expovariate(lam) for _ in range(N)]
mean_sum = sum(sums) / N
var_sum = sum((s - mean_sum)**2 for s in sums) / N
print(f"E[X₁+X₂] = {mean_sum:.4f}  (exact: {2/lam:.4f})")
print(f"Var(X₁+X₂) = {var_sum:.4f}  (exact: {2/lam**2:.4f})")
```

## Check Your Understanding

1. **Pen & paper:** $X$ is the number of heads in 3 fair coin flips. Find $E[X]$ and $\text{Var}(X)$ from the PMF.
2. **Pen & paper:** If $E[X] = 5$ and $\text{Var}(X) = 4$, find $E[2X - 3]$ and $\text{Var}(2X - 3)$.
3. **Pen & paper:** For $f(x) = 3x^2$ on $[0, 1]$, compute $E[X]$ and $\text{Var}(X)$.
4. **Think about it:** Why does $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ only hold for independent $X, Y$?  What changes when they're dependent?
5. **Pen & paper:** Compute the first 4 raw moments of a fair die roll ($X$ uniform on $\{1,2,3,4,5,6\}$).  Then compute the third central moment.  Is the distribution skewed?
6. **Pen & paper:** Derive the MGF of $X \sim \text{Bernoulli}(p)$: $M_X(t) = 1 - p + pe^t$.  Use it to find $E[X]$ and $E[X^2]$.
7. **Think about it:** If $X_1, \ldots, X_n$ are i.i.d. $\text{Exp}(\lambda)$, use the MGF product rule to find the MGF of $S = X_1 + \cdots + X_n$.  What distribution does this correspond to?
