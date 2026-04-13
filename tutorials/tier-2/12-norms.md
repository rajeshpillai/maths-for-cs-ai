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

## Connection to CS / Games / AI

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
