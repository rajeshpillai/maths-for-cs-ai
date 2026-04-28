# Norms — L1, L2, Lp, Frobenius

## Intuition

A **norm** is a way to measure the "size" of a vector or matrix.  Different
norms measure size differently — like how "distance" in Manhattan (walking on
a grid) differs from "distance" as the crow flies.  In ML, the choice of norm
directly affects regularisation, loss functions, and robustness.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations (magnitude)

## From First Principles

### What is a norm?

A norm $\|\mathbf{x}\|$ is any function that satisfies:

1. $\|\mathbf{x}\| \ge 0$, and $\|\mathbf{x}\| = 0$ iff $\mathbf{x} = \mathbf{0}$ (non-negative)
2. $\|c\mathbf{x}\| = |c|\|\mathbf{x}\|$ (scales with scalar)
3. $\|\mathbf{x} + \mathbf{y}\| \le \|\mathbf{x}\| + \|\mathbf{y}\|$ (triangle inequality)

### The $L^p$ norm

$$\|\mathbf{x}\|_p = \left(\sum_{i=1}^{n} |x_i|^p\right)^{1/p}$$

### L1 norm (Manhattan distance)

$$\|\mathbf{x}\|_1 = |x_1| + |x_2| + \cdots + |x_n|$$

**Pen & paper:** $\left\|\begin{pmatrix} 3 \\ -4 \\ 2 \end{pmatrix}\right\|_1 = 3 + 4 + 2 = 9$

Think of it as walking on a grid: you can only move along axes.

### L2 norm (Euclidean distance)

$$\|\mathbf{x}\|_2 = \sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}$$

**Pen & paper:** $\left\|\begin{pmatrix} 3 \\ -4 \\ 2 \end{pmatrix}\right\|_2 = \sqrt{9 + 16 + 4} = \sqrt{29} \approx 5.39$

This is the "straight line" distance — the one from Pythagoras.

### L∞ norm (max norm)

$$\|\mathbf{x}\|_\infty = \max_i |x_i|$$

**Pen & paper:** $\left\|\begin{pmatrix} 3 \\ -4 \\ 2 \end{pmatrix}\right\|_\infty = 4$

Just take the largest absolute value.

### Unit circles under different norms

The "unit circle" $\|\mathbf{x}\|_p = 1$ in 2D:

| Norm | Shape |
|------|-------|
| $L^1$ | Diamond (rotated square) |
| $L^2$ | Circle |
| $L^\infty$ | Square |

As $p$ increases, the unit circle goes from diamond → circle → square.

### Frobenius norm (for matrices)

$$\|\mathbf{A}\|_F = \sqrt{\sum_{i,j} a_{ij}^2}$$

It's just the L2 norm if you flatten the matrix into a vector.

**Pen & paper:**

$$\left\|\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\right\|_F = \sqrt{1 + 4 + 9 + 16} = \sqrt{30} \approx 5.48$$

### Norms and regularisation in ML

| Regularisation | Norm | Effect on weights |
|---------------|------|-------------------|
| L1 (Lasso) | $\|\mathbf{w}\|_1$ | Drives weights to exactly 0 → **feature selection** |
| L2 (Ridge) | $\|\mathbf{w}\|_2^2$ | Drives weights toward 0 but not exactly → **smooth, small weights** |
| Elastic Net | $\alpha\|\mathbf{w}\|_1 + (1-\alpha)\|\mathbf{w}\|_2^2$ | Combines both |

**Why L1 gives sparsity (pen & paper intuition):**

The L1 unit "circle" is a diamond.  When you find where the loss contours
first touch the diamond constraint, they tend to hit a **corner** — and
corners are on the axes, where at least one coordinate is 0.

## Python Verification

```python
# ── Norms: verifying pen & paper work ───────────────────────
import numpy as np

x = np.array([3, -4, 2])

print("=== Vector norms ===")
print(f"x = {x}")
print(f"L1 norm  = {np.linalg.norm(x, 1)}")     # 9
print(f"L2 norm  = {np.linalg.norm(x, 2):.4f}")  # 5.385
print(f"L∞ norm  = {np.linalg.norm(x, np.inf)}") # 4

# Frobenius norm
A = np.array([[1, 2], [3, 4]])
print(f"\n=== Frobenius norm ===")
print(f"||A||_F = {np.linalg.norm(A, 'fro'):.4f}")  # sqrt(30)
print(f"Manual:  {np.sqrt(np.sum(A**2)):.4f}")

# Unit circles in 2D
print(f"\n=== Unit circle points ===")
for norm_type, label in [(1, "L1"), (2, "L2"), (np.inf, "L∞")]:
    points = []
    for angle in np.linspace(0, 2*np.pi, 8, endpoint=False):
        p = np.array([np.cos(angle), np.sin(angle)])
        p = p / np.linalg.norm(p, norm_type)  # Normalise to unit norm
        points.append(np.round(p, 3))
    print(f"{label}: sample points on unit circle = {points[:4]}...")

# Regularisation effect demo
print(f"\n=== L1 vs L2 regularisation ===")
# Simple example: which norm penalises [0.5, 0.5] vs [1, 0] more?
w1 = np.array([0.5, 0.5])
w2 = np.array([1.0, 0.0])
print(f"w = {w1}: L1={np.linalg.norm(w1, 1):.1f}, L2²={np.linalg.norm(w1, 2)**2:.2f}")
print(f"w = {w2}: L1={np.linalg.norm(w2, 1):.1f}, L2²={np.linalg.norm(w2, 2)**2:.2f}")
print("L1 penalises both equally; L2 prefers spread-out weights")
```

## Visualisation — Unit balls in different norms

The clearest picture of "what does this norm think distance means?"
is the **unit ball** $\{\mathbf{x} : \|\mathbf{x}\| = 1\}$. Each norm
draws a different shape, and that shape *is* the geometry of the norm.

```python
# ── Visualising unit balls of L1, L2, L∞, and a few Lp norms ──
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 6))

# (1) The classic unit-ball trio: L1 (diamond), L2 (circle), L∞ (square).
# Plus L0.5 to show that the "ball" can be concave for p < 1.
ax = axes[0]
theta = np.linspace(0, 2 * np.pi, 600)
unit_dirs = np.array([np.cos(theta), np.sin(theta)])      # 2 × 600 directions

specs = [
    (1.0,    "tab:red",    "L1 (Manhattan): a diamond"),
    (2.0,    "tab:blue",   "L2 (Euclidean): a circle"),
    (np.inf, "tab:green",  "L∞ (Chebyshev): a square"),
    (0.5,    "tab:purple", "L0.5: a pinched star (convex set lost)"),
]
for p, color, label in specs:
    if np.isinf(p):
        # x = ±1 OR y = ±1 — the four edges of [-1, 1]²
        side = np.linspace(-1, 1, 50)
        ones = np.ones_like(side)
        xs = np.concatenate([ side,  ones, -side, -ones])
        ys = np.concatenate([ ones,  -side, -ones,  side])
        ax.plot(xs, ys, color=color, lw=2.5, label=label)
    elif p < 1:
        # For p < 1 the ball is non-convex; draw it as 4 stitched curves.
        # Use the parametric form valid in the first quadrant: x^p + y^p = 1.
        ts = np.linspace(0, 1, 200)
        xs = ts ** (1 / p)
        ys = (1 - ts) ** (1 / p)
        # Reflect across both axes to get the full shape.
        x_full = np.concatenate([xs, -xs[::-1], -xs, xs[::-1]])
        y_full = np.concatenate([ys, ys[::-1], -ys, -ys[::-1]])
        ax.plot(x_full, y_full, color=color, lw=2.5, label=label)
    else:
        # For p ≥ 1 we can scale every direction so its Lp-norm is 1.
        norms = (np.abs(unit_dirs[0]) ** p + np.abs(unit_dirs[1]) ** p) ** (1 / p)
        ball = unit_dirs / norms
        ax.plot(ball[0], ball[1], color=color, lw=2.5, label=label)

ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.5, 1.5); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Unit balls $\\{x : \\|x\\|_p = 1\\}$\n(every norm = a different geometry)")
ax.legend(loc="upper right", fontsize=9); ax.grid(True, alpha=0.3)

# (2) Why L1 promotes sparsity, L2 doesn't. Picture: minimise ||x|| subject
# to a linear constraint (a line). For L1 the constraint line touches the
# diamond at a CORNER (one component is exactly 0 → sparse). For L2 it
# touches the circle anywhere — generically both components are non-zero.
ax = axes[1]
# A line representing the data-fit constraint a·x = c.
xs = np.linspace(-2, 2, 100)
ys = 1.5 - 0.5 * xs        # constraint line
ax.plot(xs, ys, color="black", lw=1.5, label="data constraint")

# L2 ball that just touches the line (smallest radius).
# Distance from origin to the line ax + by = c is c / sqrt(a² + b²).
a, b, c = 0.5, 1.0, 1.5
r2 = c / np.sqrt(a*a + b*b)
ax.plot(r2 * np.cos(theta), r2 * np.sin(theta), color="tab:blue", lw=2,
        label=f"smallest L2 ball ({r2:.2f})")
# Tangent point: where the line is closest to origin (orthogonal foot).
tang_pt = np.array([a, b]) * (c / (a*a + b*b))
ax.scatter(*tang_pt, color="tab:blue", s=120, zorder=5)
ax.text(tang_pt[0] + 0.08, tang_pt[1] - 0.05,
        f"L2 minimum:\n{tuple(np.round(tang_pt, 2))}\n(both ≠ 0)", fontsize=9, color="tab:blue")

# L1 ball that just touches the line (smallest radius).
# For diamond, we increase radius until it hits the line; usually it touches at a corner.
# Smallest L1 norm on the line ax + by = c is c / max(|a|, |b|).
r1 = c / max(abs(a), abs(b))
ax.plot([0, r1, 0, -r1, 0], [r1, 0, -r1, 0, r1],
        color="tab:red", lw=2, label=f"smallest L1 ball ({r1:.2f})")
# Touches at the corner along the axis of the larger |coefficient|.
if abs(a) >= abs(b):
    corner = np.array([np.sign(a) * r1, 0])
else:
    corner = np.array([0, np.sign(b) * r1])
ax.scatter(*corner, color="tab:red", s=120, zorder=5)
ax.text(corner[0] - 0.55, corner[1] + 0.15,
        f"L1 minimum:\n{tuple(np.round(corner, 2))}\n(one IS exactly 0!)",
        fontsize=9, color="tab:red")

ax.set_xlim(-2, 3.5); ax.set_ylim(-2, 3)
ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Why L1 makes things sparse (and L2 doesn't)\nthe diamond touches first at a CORNER (a zero)")
ax.legend(loc="lower right", fontsize=9); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Confirm numerically.
v = np.array([3.0, -4.0])
print(f"Vector v = {v}")
print(f"  L1 norm   = |3| + |-4|    = {np.linalg.norm(v, 1):.4f}")
print(f"  L2 norm   = √(3² + 4²)   = {np.linalg.norm(v, 2):.4f}")
print(f"  L∞ norm   = max(|3|, |-4|) = {np.linalg.norm(v, np.inf):.4f}")
```

**Two pictures, two lessons:**

- **Each norm is a different geometry.** The L2 (circle) is what we
  *call* "distance" in everyday speech — but it's just one choice. L1
  is the city-block distance ("how many right-angle moves to walk
  there?"). L∞ is the maximum coordinate difference. The Frobenius
  norm of a matrix is the L2 norm of its flattened entries.
- **Sparsity comes from the diamond's corners.** The right-hand picture
  shows the most important practical consequence: when you minimise an
  L1-penalised loss, the *corners* of the diamond (which are exactly
  the points where some coordinate is zero) get hit by the constraint
  *first*. That's why **Lasso regression** sets coefficients to exactly
  zero (feature selection), while **Ridge** (L2) only shrinks them
  toward zero. Compressed sensing, sparse coding, and many modern
  *interpretable*-ML techniques rely on this single geometric fact.

## Connection to CS / Games / AI / Business / Industry

- **Loss functions** — MSE uses L2, MAE uses L1; L2 penalises outliers more
- **Regularisation** — L1 (Lasso) for sparse models, L2 (Ridge) for smooth models
- **Batch normalisation** — normalises activations using L2 norm
- **Word embeddings** — cosine similarity uses L2-normalised vectors
- **Adversarial attacks** — perturbations measured in L∞ ("no pixel changes by more than ε")
- **Game dev** — L2 distance for physics, L∞ for checking if something is "within a box"

## Check Your Understanding

1. **Pen & paper:** Compute L1, L2, and L∞ norms of $\begin{pmatrix} 1 \\ -3 \\ 2 \\ -1 \end{pmatrix}$.
2. **Pen & paper:** Why is $\|\mathbf{x}\|_2 \le \|\mathbf{x}\|_1$ always true?  (Hint: think about what squaring does to small vs large values.)
3. **Think about it:** In adversarial ML, attacks are bounded by $\|\delta\|_\infty \le \epsilon$.  Why L∞ and not L2?  What real-world constraint does this model?
