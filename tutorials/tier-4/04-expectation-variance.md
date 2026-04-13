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

## Check Your Understanding

1. **Pen & paper:** $X$ is the number of heads in 3 fair coin flips. Find $E[X]$ and $\text{Var}(X)$ from the PMF.
2. **Pen & paper:** If $E[X] = 5$ and $\text{Var}(X) = 4$, find $E[2X - 3]$ and $\text{Var}(2X - 3)$.
3. **Pen & paper:** For $f(x) = 3x^2$ on $[0, 1]$, compute $E[X]$ and $\text{Var}(X)$.
4. **Think about it:** Why does $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ only hold for independent $X, Y$?  What changes when they're dependent?
