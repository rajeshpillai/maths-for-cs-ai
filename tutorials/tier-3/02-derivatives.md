# Derivatives — Slope of the Tangent

## Intuition

The derivative tells you **how fast something is changing** at a specific
instant.  Speed is the derivative of position.  The slope of a curve at a
point is the derivative at that point.  In ML, the derivative tells the
optimiser which way to adjust weights to reduce the loss.

## Prerequisites

- Tier 3, Lesson 1: Limits

## From First Principles

### The limit definition

$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

This is the slope of the secant line as it becomes the tangent.

### Pen & paper: Derive $\frac{d}{dx}(x^2)$

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h}$$

$$= \lim_{h \to 0} \frac{2xh + h^2}{h} = \lim_{h \to 0} (2x + h) = 2x$$

### Pen & paper: Derive $\frac{d}{dx}(x^3)$

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^3 - x^3}{h} = \lim_{h \to 0} \frac{3x^2h + 3xh^2 + h^3}{h} = 3x^2$$

### The power rule (general)

$$\frac{d}{dx}(x^n) = nx^{n-1}$$

This works for any real $n$, not just integers.

### Derivative rules (pen & paper toolkit)

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dx}(c) = 0$ |
| Power | $\frac{d}{dx}(x^n) = nx^{n-1}$ |
| Constant multiple | $\frac{d}{dx}(cf) = c \cdot f'$ |
| Sum | $(f + g)' = f' + g'$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$ |
| Chain | $\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$ |

### Key derivatives to memorise

| $f(x)$ | $f'(x)$ |
|---------|---------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $a^x$ | $a^x \ln a$ |

### Pen & paper examples

**Product rule:** $\frac{d}{dx}(x^2 \sin x)$

$= 2x \sin x + x^2 \cos x$

**Quotient rule:** $\frac{d}{dx}\left(\frac{x}{x^2 + 1}\right)$

$= \frac{(1)(x^2 + 1) - x(2x)}{(x^2 + 1)^2} = \frac{1 - x^2}{(x^2 + 1)^2}$

**Chain rule:** $\frac{d}{dx}(e^{3x^2})$

Let $u = 3x^2$, then $\frac{d}{dx}(e^u) = e^u \cdot u' = e^{3x^2} \cdot 6x = 6x \cdot e^{3x^2}$

### Higher-order derivatives

The second derivative $f''(x)$ is the derivative of $f'(x)$.

**Pen & paper:** $f(x) = x^4$

$f'(x) = 4x^3$, $f''(x) = 12x^2$, $f'''(x) = 24x$, $f^{(4)}(x) = 24$

### Meaning of the second derivative

- $f''(x) > 0$: curve is **concave up** (bowl shape) — a local minimum
- $f''(x) < 0$: curve is **concave down** (hill shape) — a local maximum
- $f''(x) = 0$: possible inflection point

### Finding maxima and minima (pen & paper)

1. Find $f'(x) = 0$ (critical points)
2. Use $f''(x)$ to classify: $f'' > 0$ → min, $f'' < 0$ → max

**Pen & paper:** $f(x) = x^3 - 3x + 2$

$f'(x) = 3x^2 - 3 = 0$ → $x^2 = 1$ → $x = \pm 1$

$f''(x) = 6x$

At $x = 1$: $f''(1) = 6 > 0$ → **local minimum**, $f(1) = 0$
At $x = -1$: $f''(-1) = -6 < 0$ → **local maximum**, $f(-1) = 4$

## Python Verification

```python
# ── Derivatives: verifying pen & paper work ─────────────────

# Numerical derivative (limit definition)
def numerical_derivative(f, x, h=1e-8):
    return (f(x + h) - f(x)) / h

# d/dx(x²) = 2x
print("=== d/dx(x²) at x=3 ===")
f = lambda x: x**2
print(f"Numerical: {numerical_derivative(f, 3):.6f}")
print(f"Analytical (2x): {2*3}")

# d/dx(x³) = 3x²
print(f"\n=== d/dx(x³) at x=2 ===")
f = lambda x: x**3
print(f"Numerical: {numerical_derivative(f, 2):.6f}")
print(f"Analytical (3x²): {3*2**2}")

# Product rule: d/dx(x² sin x) at x=1
import math
print(f"\n=== Product rule: d/dx(x² sin x) at x=1 ===")
f = lambda x: x**2 * math.sin(x)
analytical = 2*1*math.sin(1) + 1**2 * math.cos(1)
print(f"Numerical: {numerical_derivative(f, 1):.6f}")
print(f"Analytical: {analytical:.6f}")

# Chain rule: d/dx(e^(3x²)) at x=1
print(f"\n=== Chain rule: d/dx(e^(3x²)) at x=1 ===")
f = lambda x: math.exp(3*x**2)
analytical = 6*1 * math.exp(3*1**2)
print(f"Numerical: {numerical_derivative(f, 1):.2f}")
print(f"Analytical (6x·e^(3x²)): {analytical:.2f}")

# Finding min/max: f(x) = x³ - 3x + 2
print(f"\n=== Critical points of x³ - 3x + 2 ===")
# f'(x) = 3x² - 3 = 0 → x = ±1
f = lambda x: x**3 - 3*x + 2
for x in [-1, 1]:
    fprime = 3*x**2 - 3
    fdouble = 6*x
    kind = "max" if fdouble < 0 else "min"
    print(f"x={x}: f={f(x)}, f'={fprime}, f''={fdouble} → local {kind}")
```

## Connection to CS / Games / AI

- **Gradient descent** — the derivative tells the optimiser which direction to step
- **Backpropagation** — computing derivatives layer by layer using the chain rule
- **Physics engines** — velocity = derivative of position, acceleration = derivative of velocity
- **Loss functions** — MSE derivative is $2(\hat{y} - y)$, cross-entropy derivative leads to softmax
- **Animation curves** — Bézier curve tangents are derivatives, used for easing functions

## Check Your Understanding

1. **Pen & paper:** Using the limit definition, derive $\frac{d}{dx}(3x + 5)$.
2. **Pen & paper:** Find $\frac{d}{dx}(x^2 e^x)$ using the product rule.
3. **Pen & paper:** Find $\frac{d}{dx}\left(\frac{1}{1 + e^{-x}}\right)$.  (This is the sigmoid function — you'll see it again in Tier 6.)
4. **Pen & paper:** Find all critical points of $f(x) = x^4 - 4x^3 + 4x^2$ and classify them.
