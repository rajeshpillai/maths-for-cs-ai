# Bell Curve, S-Curve, Step Functions, and ReLU

## Intuition

These four shapes appear constantly in ML and statistics.  The **bell curve**
(Gaussian) is nature's favourite distribution.  The **S-curve** (sigmoid) squashes
any input to $[0, 1]$.  The **step function** is the simplest classifier.
**ReLU** is the workhorse activation — a bent line that's zero for negatives.
Understanding their shapes tells you how they behave and why we choose them.

## Prerequisites

- Tier 4, Lesson 6: Continuous Distributions (Gaussian)
- Tier 6, Lesson 2: Activation Functions

## From First Principles

### The Bell Curve (Gaussian)

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-(x-\mu)^2 / (2\sigma^2)}$$

**Shape:** Symmetric, peaks at $\mu$, width controlled by $\sigma$.

| Property | Value |
|----------|-------|
| Peak | At $x = \mu$ |
| Inflection points | At $x = \mu \pm \sigma$ |
| 68% of area | Within $\mu \pm \sigma$ |
| Tails | Approach 0 but never reach it |
| Total area | 1 (it's a probability distribution) |

**Why it's everywhere:** Central Limit Theorem — sum of many small independent effects → Gaussian.

### The S-Curve (Sigmoid / Logistic)

$$\sigma(x) = \frac{1}{1 + e^{-x}}$$

**Shape:** Smooth step from 0 to 1.

| $x$ | $\sigma(x)$ |
|-----|-------------|
| $-\infty$ | $0$ |
| $-3$ | $0.047$ |
| $0$ | $0.5$ |
| $3$ | $0.953$ |
| $+\infty$ | $1$ |

**Where it appears:**
- Logistic regression output
- Binary classification probability
- LSTM gates
- Population growth models (logistic growth)

**Logistic growth:** $P(t) = \frac{K}{1 + e^{-r(t-t_0)}}$

$K$ = carrying capacity, $r$ = growth rate, $t_0$ = midpoint.  Starts exponential, saturates at $K$.

### The Step Function (Heaviside)

$$H(x) = \begin{cases} 1 & x \ge 0 \\ 0 & x < 0 \end{cases}$$

The simplest classifier: above threshold → 1, below → 0.

**Problem:** Not differentiable at 0 → can't use gradient descent.

The sigmoid is the **smooth approximation** of the step function.

### ReLU and its family

$$\text{ReLU}(x) = \max(0, x)$$

**Shape:** Zero for $x < 0$, identity for $x > 0$.  A piecewise linear function.

| Variant | Formula | Shape |
|---------|---------|-------|
| ReLU | $\max(0, x)$ | Bent at 0 |
| Leaky ReLU | $\max(0.01x, x)$ | Slight negative slope |
| ELU | $x$ if $x>0$, $\alpha(e^x-1)$ if $x \le 0$ | Smooth below 0 |
| GELU | $x \cdot \Phi(x)$ | Smooth everywhere |
| Softplus | $\ln(1 + e^x)$ | Smooth ReLU |

Softplus is the smooth approximation of ReLU, just as sigmoid is the smooth approximation of step.

### Comparing the shapes

All four can be seen as a spectrum of "hardness":

```
Step function → Sigmoid → Tanh        (outputs: {0,1} → (0,1) → (-1,1))
Step function → ReLU → Softplus        (non-negative outputs)
```

Each smooth version enables gradient-based learning.

### Pen & paper: Key values to remember

| Function | $f(-3)$ | $f(0)$ | $f(3)$ |
|----------|---------|--------|--------|
| Step | 0 | 1 | 1 |
| Sigmoid | 0.05 | 0.5 | 0.95 |
| Tanh | -0.995 | 0 | 0.995 |
| ReLU | 0 | 0 | 3 |
| Softplus | 0.049 | 0.693 | 3.049 |

## Python Verification

```python
# ── Bell Curve, S-Curve, Step, ReLU ─────────────────────────
import math

# Gaussian bell curve
print("=== Gaussian Bell Curve (μ=0, σ=1) ===")
for x_10 in range(-30, 31, 5):
    x = x_10 / 10
    y = math.exp(-x**2 / 2) / math.sqrt(2 * math.pi)
    bar = '*' * int(y * 100)
    print(f"  x={x:+4.1f}: {y:.4f} {bar}")

# Sigmoid S-curve
print(f"\n=== Sigmoid S-Curve ===")
for x in [-5, -3, -1, 0, 1, 3, 5]:
    y = 1 / (1 + math.exp(-x))
    bar = '*' * int(y * 40)
    print(f"  x={x:+d}: σ={y:.4f} {bar}")

# Step function
print(f"\n=== Step Function ===")
for x in [-3, -1, -0.1, 0, 0.1, 1, 3]:
    y = 1 if x >= 0 else 0
    print(f"  x={x:+4.1f}: H={y}")

# ReLU family
print(f"\n=== ReLU Family ===")
print(f"{'x':>6} {'ReLU':>6} {'Leaky':>6} {'Softplus':>8}")
for x_10 in range(-30, 31, 5):
    x = x_10 / 10
    relu = max(0, x)
    leaky = max(0.01*x, x)
    softplus = math.log(1 + math.exp(x))
    print(f"  {x:+4.1f} {relu:6.2f} {leaky:6.2f} {softplus:8.4f}")

# Sigmoid as smooth step
print(f"\n=== Sigmoid approaches step as steepness increases ===")
for k in [1, 5, 20, 100]:
    vals = [1/(1+math.exp(-k*x)) for x in [-0.5, -0.1, 0, 0.1, 0.5]]
    print(f"  k={k:3d}: {[f'{v:.3f}' for v in vals]}")

# Softplus approaches ReLU
print(f"\n=== Softplus → ReLU comparison ===")
for x in [-2, -1, 0, 1, 2]:
    relu = max(0, x)
    sp = math.log(1 + math.exp(x))
    print(f"  x={x:+d}: ReLU={relu:.1f}, Softplus={sp:.4f}")
```

## Connection to CS / Games / AI

- **Bell curve** — weight initialisation, batch norm, noise modelling, p-values
- **Sigmoid** — logistic regression, binary classification, LSTM gates, probability output
- **Logistic growth** — user adoption curves, epidemic modelling, learning curves
- **Step function** — perceptron (historical), thresholding in image processing
- **ReLU** — default activation in CNNs and MLPs since 2012
- **Softplus** — theoretically nicer but ReLU is faster and works just as well in practice

## Check Your Understanding

1. **Pen & paper:** At what $x$ values does the standard Gaussian have its inflection points?  (Hint: set $f''(x) = 0$.)
2. **Pen & paper:** Show that $\sigma(-x) = 1 - \sigma(x)$ (sigmoid symmetry).
3. **Pen & paper:** The softplus function $\ln(1 + e^x)$ has derivative $\sigma(x)$.  Verify this by differentiating.
4. **Think about it:** Why did ReLU replace sigmoid as the default hidden-layer activation?  Give two reasons.
