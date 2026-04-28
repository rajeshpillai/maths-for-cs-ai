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

## Visualisation — Convex bowls vs non-convex landscapes

A function is **convex** if every chord lies *above* the graph (the
function "holds water"). For convex functions every local minimum is
the global one — gradient descent can't get stuck. Non-convex losses
have many basins, and where you start determines where you end up.

```python
# ── Visualising convexity ───────────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) A convex 1-D function with a chord drawn between two points.
# The chord lies above the curve: that's the geometric definition.
ax = axes[0]
xs = np.linspace(-2, 4, 200)
ax.plot(xs, xs ** 2, color="tab:blue", lw=2, label="f(x) = x²  (convex)")
x1, x2 = -1.5, 3.0
ax.plot([x1, x2], [x1**2, x2**2], color="tab:red", lw=2, linestyle="--",
        label="chord between (x₁, f(x₁)) and (x₂, f(x₂))")
ax.scatter([x1, x2], [x1**2, x2**2], color="tab:red", s=80, zorder=5)
# Shade the gap to make "chord above graph" visible.
ts = np.linspace(0, 1, 50)
chord_x = (1 - ts) * x1 + ts * x2
chord_y = (1 - ts) * x1**2 + ts * x2**2
ax.fill_between(chord_x, chord_x**2, chord_y, color="tab:red", alpha=0.15,
                label="convexity gap (chord ≥ graph)")
ax.set_title("Convex: every chord lies above the graph\n→ no local minima other than the global one")
ax.set_xlabel("x"); ax.set_ylabel("f(x)")
ax.legend(fontsize=9); ax.grid(True, alpha=0.3)

# (2) A non-convex function with multiple local minima. Highlight
# them and show gradient descent ending in a different basin
# depending on where you start.
ax = axes[1]
def g(x):  return 0.05 * x ** 4 - 0.5 * x ** 2 + 0.3 * x
def gp(x): return 0.20 * x ** 3 - 1.0 * x + 0.3
xs = np.linspace(-4, 4, 400)
ax.plot(xs, g(xs), color="tab:blue", lw=2, label="non-convex f")

starts = [-3.5, 0.5, 3.5]
colors_starts = ["tab:red", "tab:orange", "tab:green"]
for s, c in zip(starts, colors_starts):
    w = s
    pts = [(w, g(w))]
    for _ in range(60):
        w -= 0.10 * gp(w)
        pts.append((w, g(w)))
    pts = np.array(pts)
    ax.plot(pts[:, 0], pts[:, 1], "o-", color=c, lw=1.4, markersize=3,
            label=f"start w₀ = {s:+.1f}")
    ax.scatter([s], [g(s)], color=c, s=80, zorder=5, marker="s")
    ax.scatter([pts[-1, 0]], [pts[-1, 1]], color=c, s=120, zorder=5, marker="X")
ax.set_title("Non-convex: GD finds a local minimum\n(which one depends on initialisation)")
ax.set_xlabel("w"); ax.set_ylabel("f(w)")
ax.legend(fontsize=9); ax.grid(True, alpha=0.3)

# (3) The picture explains why deep-learning intuition often
# emphasises *initialisation*. We trace three GD runs on the same
# loss, started from three places, ending in three different basins.
ax = axes[2]
ax.plot(xs, g(xs), color="tab:blue", lw=2, alpha=0.5)
ax.text(-3.2, g(-3.2) + 0.3, "global\nminimum?",  fontsize=8, color="tab:red")
ax.text( 0.2, g(0.2) + 0.4, "local\nmaximum",     fontsize=8, color="grey")
ax.text( 3.2, g( 3.2) + 0.6, "another\nlocal min", fontsize=8, color="tab:green")
# Mark approximate basins.
ax.axvspan(-4, -1, color="tab:red",   alpha=0.06)
ax.axvspan(-1,  1, color="grey",      alpha=0.06)
ax.axvspan( 1,  4, color="tab:green", alpha=0.06)
ax.set_xlim(-4, 4)
ax.set_title("Basins of attraction\n(coloured = which start ends where)")
ax.set_xlabel("w"); ax.set_ylabel("f(w)")
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Verify numerically: a convex loss converges to the same minimum
# regardless of start; a non-convex one converges to different ones.
print("Convex example f(w) = w²: GD always reaches w = 0.")
for w0 in [-10.0, 0.5, 10.0]:
    w = w0
    for _ in range(200): w -= 0.1 * 2 * w
    print(f"  start w₀ = {w0:+.1f} → w = {w:.6f}")
print()
print("Non-convex example: GD ends up in different basins.")
for w0 in [-3.5, 0.5, 3.5]:
    w = w0
    for _ in range(500): w -= 0.05 * (0.2 * w**3 - 1.0 * w + 0.3)
    print(f"  start w₀ = {w0:+.1f} → w = {w:+.4f}")
```

**Two pictures, one big idea:**

- **Convex losses are friendly.** Linear regression's MSE, logistic
  regression's cross-entropy, SVMs' hinge loss — all convex. For these,
  gradient descent, Newton's method, and many variants are guaranteed
  to find the global optimum. *Initialisation does not matter for the
  final answer*.
- **Deep-learning losses are not convex.** They have many basins,
  saddles, and ridges. **The starting point matters**, which is why
  random-seed dependence is a real issue and why initialisation schemes
  (Xavier, He, etc.) and pre-training have such an outsized effect.
  Empirically, the basins reached by Adam-trained Transformers seem to
  generalise well — not because the loss is convex, but because the
  basins are unusually flat and noise-resistant.

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
