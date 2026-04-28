# Gradient Descent — The Algorithm Derived from Calculus

## Intuition

Imagine you're blindfolded on a hilly landscape and want to find the lowest
point.  You feel the slope under your feet and take a step downhill.  Repeat.
That's gradient descent: measure the gradient (slope), step in the opposite
direction, repeat until you reach a minimum.

## Prerequisites

- Tier 3, Lesson 3: Partial Derivatives and Gradient
- Tier 5, Lesson 1: Loss Functions

## From First Principles

### The update rule

$$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \alpha \nabla L(\boldsymbol{\theta}_t)$$

- $\boldsymbol{\theta}$: parameters (weights)
- $\alpha$: learning rate (step size)
- $\nabla L$: gradient of the loss

### Why "negative gradient"?

$\nabla L$ points in the direction of steepest **increase**.  We want to decrease the loss, so we go in the **opposite** direction.

### Pen & paper: 1D gradient descent

Minimise $f(w) = (w - 3)^2$.

$f'(w) = 2(w - 3)$

Start at $w_0 = 0$, learning rate $\alpha = 0.1$:

| Step | $w$ | $f(w)$ | $f'(w)$ | Update |
|------|-----|--------|---------|--------|
| 0 | 0 | 9 | -6 | $0 - 0.1(-6) = 0.6$ |
| 1 | 0.6 | 5.76 | -4.8 | $0.6 + 0.48 = 1.08$ |
| 2 | 1.08 | 3.69 | -3.84 | $1.08 + 0.384 = 1.464$ |
| 3 | 1.464 | 2.36 | -3.072 | $1.464 + 0.307 = 1.771$ |

Converging toward $w = 3$ (the minimum).

### Pen & paper: 2D gradient descent

Minimise $f(x, y) = x^2 + 4y^2$ (an elliptical bowl).

$\nabla f = \begin{pmatrix} 2x \\ 8y \end{pmatrix}$

Start at $(4, 2)$, $\alpha = 0.1$:

**Step 0:** $\nabla f = (8, 16)$

$(x, y) \leftarrow (4, 2) - 0.1(8, 16) = (3.2, 0.4)$

$f = 3.2^2 + 4(0.4)^2 = 10.24 + 0.64 = 10.88$

**Step 1:** $\nabla f = (6.4, 3.2)$

$(x, y) \leftarrow (3.2, 0.4) - 0.1(6.4, 3.2) = (2.56, 0.08)$

$f = 6.5536 + 0.0256 = 6.58$

### Learning rate matters

**Too large ($\alpha = 1$):** For $f(w) = (w-3)^2$ at $w = 0$:

$w_1 = 0 - 1 \times (-6) = 6$, $w_2 = 6 - 1 \times 6 = 0$ — oscillates forever!

**Too small ($\alpha = 0.001$):** Converges, but takes thousands of steps.

**Just right:** Depends on the curvature of the loss landscape.

### Convergence condition

For convex $f$ with Lipschitz gradient (bounded second derivative $L$):

Gradient descent converges if $\alpha < \frac{2}{L}$.

For $f(w) = (w-3)^2$: $f'' = 2$, so need $\alpha < 1$.

### Batch gradient descent

Use the **full dataset** to compute the gradient at each step:

$$\nabla L = \frac{1}{n}\sum_{i=1}^{n} \nabla \ell_i(\boldsymbol{\theta})$$

**Pros:** Stable, smooth convergence.
**Cons:** Slow for large datasets (must process all $n$ samples per step).

### The full algorithm

```
Initialise θ randomly
For each epoch:
    Compute gradient: g = ∇L(θ) over all data
    Update: θ ← θ - α·g
    If ||g|| < ε: stop (converged)
```

## Python Verification

```python
# ── Gradient Descent: verifying pen & paper work ────────────

# 1D: minimise f(w) = (w-3)²
print("=== 1D Gradient Descent ===")
w = 0.0
alpha = 0.1
for step in range(15):
    f = (w - 3)**2
    grad = 2 * (w - 3)
    if step < 5 or step % 3 == 0:
        print(f"  step {step:2d}: w={w:.4f}, f={f:.4f}, grad={grad:.4f}")
    w = w - alpha * grad
print(f"  Final: w={w:.4f} (target: 3.0)")

# 2D: minimise f(x,y) = x² + 4y²
print(f"\n=== 2D Gradient Descent ===")
x, y = 4.0, 2.0
alpha = 0.1
for step in range(20):
    f = x**2 + 4*y**2
    gx, gy = 2*x, 8*y
    if step < 3 or step % 5 == 0:
        print(f"  step {step:2d}: ({x:.3f}, {y:.3f}), f={f:.4f}")
    x -= alpha * gx
    y -= alpha * gy
print(f"  Final: ({x:.6f}, {y:.6f})")

# Learning rate comparison
print(f"\n=== Learning rate comparison ===")
for alpha in [0.001, 0.1, 0.5, 0.9, 1.0]:
    w = 0.0
    for _ in range(50):
        w = w - alpha * 2 * (w - 3)
    print(f"  α={alpha}: w after 50 steps = {w:.4f}")

# Linear regression with gradient descent
print(f"\n=== Linear regression: y = 2x + 1 ===")
# Data
X = [1, 2, 3, 4, 5]
Y = [3, 5, 7, 9, 11]
n = len(X)

w, b = 0.0, 0.0
alpha = 0.01

for epoch in range(200):
    # Compute gradients (MSE loss)
    dw = sum(2 * (w*x + b - y) * x for x, y in zip(X, Y)) / n
    db = sum(2 * (w*x + b - y) for x, y in zip(X, Y)) / n
    w -= alpha * dw
    b -= alpha * db
    
    if epoch % 50 == 0:
        loss = sum((w*x + b - y)**2 for x, y in zip(X, Y)) / n
        print(f"  epoch {epoch:3d}: w={w:.4f}, b={b:.4f}, loss={loss:.6f}")

print(f"  Final: y = {w:.2f}x + {b:.2f} (target: y = 2x + 1)")
```

## Visualisation — Walking downhill on a loss surface

Gradient descent is a **literal walk downhill** on the loss surface.
Three pictures together: the path on a contour plot, the loss-vs-step
curve, and what happens when the learning rate is too small, just
right, or too big.

```python
# ── Visualising gradient descent ────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

# A simple 2-D quadratic loss with an "elongated bowl" shape.
# The bowl is stretched so the gradient is tiny in the wide
# direction and large in the narrow one — a classic GD pathology.
def loss(x, y):  return 0.5 * x**2 + 5.0 * y**2
def grad(x, y):  return np.array([x, 10.0 * y])

# Run gradient descent from the same starting point at three lrs.
def run_gd(lr, n_steps, x0=4.0, y0=2.0):
    path = [(x0, y0)]
    p = np.array([x0, y0], dtype=float)
    for _ in range(n_steps):
        p = p - lr * grad(*p)
        path.append(tuple(p))
    return np.array(path)

paths = [
    ("too small (η = 0.02)",  run_gd(0.02,  60), "tab:blue"),
    ("just right (η = 0.18)", run_gd(0.18,  30), "tab:green"),
    ("too big   (η = 0.20)", run_gd(0.20,  30), "tab:red"),
]

fig, axes = plt.subplots(1, 3, figsize=(16, 5.0))

# (1) Contour plot with all three trajectories overlaid. The bowl's
# elongated valley makes the "too big" run zig-zag; the "too small"
# run barely moves; "just right" cuts a clean diagonal.
ax = axes[0]
xs = np.linspace(-5, 5, 200); ys = np.linspace(-3, 3, 200)
X, Y = np.meshgrid(xs, ys)
Z = loss(X, Y)
cs = ax.contour(X, Y, Z, levels=20, cmap="viridis", alpha=0.7)
for label, path, color in paths:
    ax.plot(path[:, 0], path[:, 1], "o-", color=color, lw=2,
            markersize=5, label=label)
ax.scatter([0], [0], color="black", marker="*", s=180, zorder=5,
           label="optimum (0, 0)")
ax.set_xlim(-5, 5); ax.set_ylim(-3, 3)
ax.set_xlabel("w₁"); ax.set_ylabel("w₂")
ax.set_title("Gradient-descent trajectories at\nthree learning rates")
ax.legend(loc="lower right", fontsize=8); ax.grid(True, alpha=0.3)

# (2) Loss vs step (log scale). "Just right" is geometrically straight
# (linear convergence on log scale). "Too small" is parallel but
# slower. "Too big" diverges.
ax = axes[1]
for label, path, color in paths:
    losses = [loss(*p) for p in path]
    ax.plot(losses, "o-", color=color, lw=1.8, markersize=4, label=label)
ax.set_yscale("log")
ax.set_xlabel("step"); ax.set_ylabel("loss (log scale)")
ax.set_title("Loss curves: log-linear means\ngeometric (exponential) convergence")
ax.legend(fontsize=9); ax.grid(True, which="both", alpha=0.3)

# (3) The 1-D version: loss = ½w². At each step you move "downhill"
# by η·gradient. Animation-style snapshot of three iterations.
ax = axes[2]
ws = np.linspace(-5, 5, 200)
ax.plot(ws, 0.5 * ws**2, color="black", lw=2, label="loss = ½ w²")
w = 4.0
lr = 0.4
for k in range(4):
    g = w
    ax.scatter([w], [0.5 * w**2], color="tab:red", s=120, zorder=5)
    ax.annotate(f"step {k}: w = {w:.2f}", xy=(w, 0.5 * w**2),
                xytext=(w + 0.3, 0.5 * w**2 + 1.5),
                fontsize=9, arrowprops=dict(arrowstyle="->", lw=0.7))
    # Tangent line at this point.
    tang = 0.5 * w**2 + g * (ws - w)
    ax.plot(ws, tang, color="tab:orange", lw=1, linestyle="--", alpha=0.5)
    w = w - lr * g
ax.set_xlim(-5, 5); ax.set_ylim(0, 13)
ax.set_xlabel("w"); ax.set_ylabel("loss")
ax.set_title("1-D walk downhill (η = 0.4)\nslope of dashed tangents = gradient")
ax.legend(loc="upper center"); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Compact comparison of final loss vs learning rate.
print(f"{'learning rate':>15}    {'steps':>6}    {'final loss':>12}    converged?")
for label, path, _ in paths:
    L = loss(*path[-1])
    converged = "yes" if L < 1e-6 else "diverged" if L > 100 else "slow"
    print(f"  {label:<22}  {len(path)-1:>5}    {L:>12.6f}    {converged}")
```

**The three pictures answer the three most common questions:**

- **What is gradient descent doing geometrically?** It walks downhill
  on the loss surface: at each step, evaluate the gradient (steepest-up
  direction), step in the *opposite* direction by an amount proportional
  to the learning rate $\eta$.
- **Why is the learning rate so finicky?** Too small: the trajectory
  hugs the contour lines, taking microscopic steps along the wide
  direction (wasted iterations). Too big: the steps overshoot the
  valley floor, zig-zagging or even diverging. The sweet spot is
  problem-dependent — and the elongation of the loss surface determines
  it. **Adam, RMSProp, momentum** (next lessons) all exist to mitigate
  exactly this problem.
- **What does "convergence" look like?** A geometric (exponential)
  decrease — straight on a log-loss-vs-step plot. If your training
  curve is *not* straight on a log scale, your learning rate is wrong
  or your loss is non-convex.

## Connection to CS / Games / AI / Business / Industry

- **Neural network training** — all neural networks are trained with some variant of gradient descent
- **Learning rate schedules** — cosine annealing, warm-up, step decay
- **Feature scaling** — gradient descent converges faster when features are on similar scales
- **Landscape visualisation** — loss landscapes of deep networks are complex, non-convex surfaces

## Check Your Understanding

1. **Pen & paper:** Minimise $f(w) = w^2 + 2w + 1$ by gradient descent.  Start at $w = 3$, $\alpha = 0.1$.  Do 3 steps.  What is the minimum?
2. **Pen & paper:** For $f(x, y) = (x-1)^2 + (y-2)^2$, compute 2 gradient descent steps from $(0, 0)$ with $\alpha = 0.3$.
3. **Pen & paper:** If $\alpha = 1$ for $f(w) = w^2$, show that gradient descent oscillates.  What happens with $\alpha = 0.5$?
4. **Think about it:** Why does gradient descent sometimes get stuck at local minima?  Does this happen for MSE loss with linear regression?
