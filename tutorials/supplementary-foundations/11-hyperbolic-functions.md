# Hyperbolic Functions — sinh, cosh, tanh

## Intuition

Hyperbolic functions are to the **hyperbola** what trig functions are to the
**circle**.  $\cosh$ and $\sinh$ are defined using exponentials, and $\tanh$
is their ratio.  You already know $\tanh$ as an activation function (Tier 6) —
now you'll see where it comes from mathematically and why its shape sits
between sigmoid and linear.

## Prerequisites

- Supplementary Graphs, Lesson 2: Exponential and Logarithmic
- Tier 6, Lesson 2: Activation Functions (tanh as activation)

## From First Principles

### Definitions

$$\cosh x = \frac{e^x + e^{-x}}{2} \quad \text{(hyperbolic cosine)}$$

$$\sinh x = \frac{e^x - e^{-x}}{2} \quad \text{(hyperbolic sine)}$$

$$\tanh x = \frac{\sinh x}{\cosh x} = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$

### Pen & paper: Key values

| $x$ | $\cosh x$ | $\sinh x$ | $\tanh x$ |
|-----|-----------|-----------|-----------|
| $0$ | $1$ | $0$ | $0$ |
| $1$ | $1.543$ | $1.175$ | $0.762$ |
| $-1$ | $1.543$ | $-1.175$ | $-0.762$ |
| $\infty$ | $\infty$ | $\infty$ | $1$ |

### Key identity (compare to $\cos^2 + \sin^2 = 1$)

$$\cosh^2 x - \sinh^2 x = 1$$

**Pen & paper proof:**

$\cosh^2 x - \sinh^2 x = \frac{(e^x + e^{-x})^2}{4} - \frac{(e^x - e^{-x})^2}{4}$

$= \frac{e^{2x} + 2 + e^{-2x} - e^{2x} + 2 - e^{-2x}}{4} = \frac{4}{4} = 1$ ✓

### Derivatives

$$\frac{d}{dx}\sinh x = \cosh x$$

$$\frac{d}{dx}\cosh x = \sinh x$$

$$\frac{d}{dx}\tanh x = 1 - \tanh^2 x = \text{sech}^2 x$$

Note: $\tanh' = 1 - \tanh^2$, exactly the formula used in backpropagation (Tier 6-02).

### Comparison: trig vs hyperbolic

| Trig | Hyperbolic |
|------|-----------|
| $\cos^2 + \sin^2 = 1$ | $\cosh^2 - \sinh^2 = 1$ |
| $(\sin x)' = \cos x$ | $(\sinh x)' = \cosh x$ |
| $(\cos x)' = -\sin x$ | $(\cosh x)' = \sinh x$ (no minus!) |
| Periodic | Not periodic |
| $\sin$ is bounded | $\sinh$ is unbounded |
| Unit circle: $x^2 + y^2 = 1$ | Unit hyperbola: $x^2 - y^2 = 1$ |

### Inverse hyperbolic functions

$$\text{arsinh}\, x = \ln(x + \sqrt{x^2 + 1})$$

$$\text{arcosh}\, x = \ln(x + \sqrt{x^2 - 1}), \quad x \ge 1$$

$$\text{artanh}\, x = \frac{1}{2}\ln\frac{1+x}{1-x}, \quad |x| < 1$$

### The catenary

A hanging chain forms the curve $y = a\cosh(x/a)$.  Not a parabola!

The St. Louis Gateway Arch is an inverted catenary.

### tanh as activation (connection to ML)

$\tanh$ maps $\mathbb{R} \to (-1, 1)$.  Compare:

- $\sigma(x) = \frac{1}{1+e^{-x}}$ maps to $(0, 1)$
- $\tanh(x) = 2\sigma(2x) - 1$ maps to $(-1, 1)$ — **zero-centred**

Zero-centred outputs help with gradient flow because the mean activation is near 0.

## Python Verification

```python
# ── Hyperbolic Functions ────────────────────────────────────
import math

# Values
print("=== Key values ===")
print(f"{'x':>4} {'cosh':>8} {'sinh':>8} {'tanh':>8}")
for x in [-2, -1, 0, 1, 2, 5]:
    print(f"  {x:+d}  {math.cosh(x):8.4f} {math.sinh(x):8.4f} {math.tanh(x):8.4f}")

# Identity: cosh² - sinh² = 1
print(f"\n=== cosh²x - sinh²x = 1 ===")
for x in [0.5, 1.0, 2.0, 3.7]:
    val = math.cosh(x)**2 - math.sinh(x)**2
    print(f"  x={x}: {val:.10f}")

# Derivatives
print(f"\n=== Derivatives ===")
h = 1e-8
for x in [-1, 0, 1, 2]:
    # d/dx sinh = cosh
    d_sinh = (math.sinh(x+h) - math.sinh(x)) / h
    print(f"  (sinh)'({x}) = {d_sinh:.4f}, cosh({x}) = {math.cosh(x):.4f}")

    # d/dx tanh = 1 - tanh²
    d_tanh = (math.tanh(x+h) - math.tanh(x)) / h
    sech2 = 1 - math.tanh(x)**2
    print(f"  (tanh)'({x}) = {d_tanh:.4f}, 1-tanh² = {sech2:.4f}")

# tanh vs sigmoid
print(f"\n=== tanh = 2σ(2x) - 1 ===")
sigmoid = lambda x: 1 / (1 + math.exp(-x))
for x in [-2, -1, 0, 1, 2]:
    tanh_val = math.tanh(x)
    from_sig = 2 * sigmoid(2*x) - 1
    print(f"  x={x:+d}: tanh={tanh_val:+.4f}, 2σ(2x)-1={from_sig:+.4f}")

# Catenary
print(f"\n=== Catenary: y = cosh(x) ===")
for x_10 in range(-20, 21, 5):
    x = x_10 / 10
    y = math.cosh(x)
    bar = '*' * int(y * 5)
    print(f"  x={x:+4.1f}: y={y:.3f} {bar}")

# Inverse hyperbolic
print(f"\n=== Inverse: arsinh, arcosh, artanh ===")
for x in [0.5, 1.0, 2.0]:
    arsinh = math.asinh(x)
    formula = math.log(x + math.sqrt(x**2 + 1))
    print(f"  arsinh({x}) = {arsinh:.4f}, ln formula = {formula:.4f}")
```

## Connection to CS / Games / AI

- **tanh activation** — zero-centred alternative to sigmoid; used in LSTM cells
- **Catenary** — hanging rope/chain simulation in physics engines
- **Rapidity** — special relativity uses hyperbolic functions ($v = c\tanh\phi$)
- **Hyperbolic geometry** — Poincaré embeddings for hierarchical data (word embeddings with tree structure)
- **Integration** — hyperbolic substitution simplifies certain integrals ($\sqrt{x^2 + 1}$)

## Check Your Understanding

1. **Pen & paper:** Verify $\cosh^2(2) - \sinh^2(2) = 1$ numerically.  ($e^2 \approx 7.389$.)
2. **Pen & paper:** Show that $\frac{d}{dx}\tanh x = 1 - \tanh^2 x$ by differentiating $\frac{\sinh x}{\cosh x}$ using the quotient rule.
3. **Pen & paper:** Express $\tanh x$ in terms of $e^{2x}$: show $\tanh x = \frac{e^{2x} - 1}{e^{2x} + 1}$.
4. **Think about it:** Why is the maximum derivative of $\tanh$ (which is 1) better for gradient flow than sigmoid's maximum derivative (0.25)?
