# Convexity — Why It Matters

## Intuition

A **convex function** has a single bowl shape — no matter where you start,
gradient descent leads to the one global minimum.  **Non-convex** functions
have hills, valleys, and saddle points, making optimisation much harder.
Understanding convexity tells you when gradient descent is guaranteed to work
and when you might get stuck.

## Prerequisites

- Tier 3, Lesson 5: Jacobian and Hessian (second derivatives)
- Tier 5, Lesson 2: Gradient Descent

## From First Principles

### Definition

A function $f$ is **convex** if for all $x, y$ and $t \in [0, 1]$:

$$f(tx + (1-t)y) \le t \cdot f(x) + (1-t) \cdot f(y)$$

**Geometrically:** The line segment between any two points on the graph lies
**above** (or on) the graph.  The function curves upward.

### Tests for convexity

**1D:** $f$ is convex iff $f''(x) \ge 0$ for all $x$.

**Pen & paper:**
- $f(x) = x^2$: $f'' = 2 > 0$ → convex ✓
- $f(x) = -x^2$: $f'' = -2 < 0$ → concave ✗
- $f(x) = x^4$: $f'' = 12x^2 \ge 0$ → convex ✓
- $f(x) = e^x$: $f'' = e^x > 0$ → convex ✓

**Multivariable:** $f$ is convex iff the Hessian $\mathbf{H}$ is **positive semi-definite** (all eigenvalues $\ge 0$) everywhere.

### Strict convexity

$f$ is **strictly convex** if the inequality is strict (no flat parts):

$$f(tx + (1-t)y) < t \cdot f(x) + (1-t) \cdot f(y) \quad \text{for } t \in (0, 1), x \ne y$$

Strict convexity guarantees a **unique** global minimum.

### Key convex functions

| Function | Domain | Convex? |
|----------|--------|---------|
| $x^2$ | $\mathbb{R}$ | Strictly convex |
| $|x|$ | $\mathbb{R}$ | Convex (not strictly) |
| $e^x$ | $\mathbb{R}$ | Strictly convex |
| $-\ln x$ | $x > 0$ | Strictly convex |
| $\|\mathbf{x}\|_2^2$ | $\mathbb{R}^n$ | Strictly convex |
| MSE loss (linear model) | $\mathbb{R}^n$ | Convex |

### Properties that preserve convexity

- **Sum:** $f + g$ convex if both $f, g$ convex
- **Scaling:** $\alpha f$ convex if $f$ convex and $\alpha > 0$
- **Composition:** $g(f(x))$ convex if $g$ convex and non-decreasing, $f$ convex

### Local minima = global minima (for convex functions)

**Theorem:** If $f$ is convex and $\nabla f(\mathbf{x}^*) = \mathbf{0}$, then $\mathbf{x}^*$ is a **global minimum**.

This is why linear regression with MSE loss always converges to the best solution — the loss is convex!

### Non-convex landscapes in deep learning

Neural network loss functions are **not** convex (due to non-linear activations and overparameterisation).

They have:
- **Local minima:** Not the global best, but nearby
- **Saddle points:** $\nabla f = 0$ but not a minimum (some directions go up, others go down)
- **Plateaus:** Regions where $\nabla f \approx 0$ (slow progress)

In high dimensions, most critical points are **saddle points**, not local minima (Dauphin et al., 2014).

### Pen & paper: Classifying critical points

$f(x, y) = x^2 + y^2$: Hessian $= \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$.  Eigenvalues: $2, 2 > 0$ → **convex, global min at origin**.

$f(x, y) = x^2 - y^2$: Hessian $= \begin{pmatrix} 2 & 0 \\ 0 & -2 \end{pmatrix}$.  Eigenvalues: $2, -2$ → **saddle point** at origin.  Non-convex.

## Python Verification

```python
# ── Convexity: verifying pen & paper work ───────────────────
import math

# Convexity test: f(tx + (1-t)y) ≤ t·f(x) + (1-t)·f(y)
def test_convexity(f, name, x, y, steps=10):
    violated = False
    for i in range(steps + 1):
        t = i / steps
        lhs = f(t*x + (1-t)*y)
        rhs = t*f(x) + (1-t)*f(y)
        if lhs > rhs + 1e-10:
            violated = True
            break
    print(f"  {name}: {'NOT convex' if violated else 'convex'}")

print("=== Convexity tests ===")
test_convexity(lambda x: x**2, "x²", -3, 5)
test_convexity(lambda x: -x**2, "-x²", -3, 5)
test_convexity(lambda x: math.exp(x), "eˣ", -2, 2)
test_convexity(lambda x: abs(x), "|x|", -3, 5)
test_convexity(lambda x: math.sin(x), "sin(x)", 0, math.pi)

# Second derivative test
print(f"\n=== Second derivative test ===")
funcs = [
    ("x²", lambda x: 2),
    ("-x²", lambda x: -2),
    ("x⁴", lambda x: 12*x**2),
    ("eˣ", lambda x: math.exp(x)),
]
for name, fpp in funcs:
    # Test at several points
    vals = [fpp(x) for x in [-2, -1, 0, 1, 2]]
    all_nonneg = all(v >= -1e-10 for v in vals)
    print(f"  {name}: f''(x) = {vals}, all ≥ 0? {all_nonneg}")

# Non-convex: neural network loss landscape
print(f"\n=== Non-convex example ===")
# f(w) = sin(w) + 0.1w² has multiple local minima
f = lambda w: math.sin(w) + 0.1 * w**2
grad_f = lambda w: math.cos(w) + 0.2 * w

# GD from different starting points finds different minima
for w0 in [-5, 0, 5]:
    w = w0
    alpha = 0.1
    for _ in range(100):
        w -= alpha * grad_f(w)
    print(f"  Start w={w0}: converged to w={w:.4f}, f={f(w):.4f}")

# Convex: w² always converges to same place
print(f"\n=== Convex example: always finds global min ===")
for w0 in [-10, 0, 10]:
    w = float(w0)
    for _ in range(100):
        w -= 0.1 * 2 * w
    print(f"  Start w={w0}: converged to w={w:.6f}")
```

## Connection to CS / Games / AI

- **Linear regression** — MSE loss is convex → guaranteed global optimum
- **Logistic regression** — cross-entropy loss is convex → guaranteed convergence
- **Deep learning** — loss is non-convex, but SGD + momentum + overparameterisation find good solutions anyway
- **Convex optimisation** — a rich field with polynomial-time algorithms (LP, SDP, QP)
- **Support Vector Machines** — formulated as a convex optimisation problem
- **Regularisation** — L2 keeps the loss more convex; helps convergence

## Check Your Understanding

1. **Pen & paper:** Is $f(x) = x^3$ convex on all of $\mathbb{R}$?  Is it convex on $[0, \infty)$?
2. **Pen & paper:** Is $f(x, y) = x^2 + xy + y^2$ convex?  (Hint: find the Hessian and check eigenvalues.)
3. **Think about it:** If deep learning loss functions are non-convex, why does gradient descent still work in practice?
4. **Think about it:** Why are saddle points more common than local minima in high-dimensional spaces?
