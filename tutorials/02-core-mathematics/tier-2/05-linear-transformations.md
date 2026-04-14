# Linear Transformations — What a Matrix Does to Space

## Intuition

A matrix isn't just a grid of numbers.  It's an **action** — it stretches,
rotates, reflects, or shears space.  When you multiply a vector by a matrix,
you're transforming that vector.  Every 2D or 3D animation, every neural
network layer, and every data projection is a linear transformation in
disguise.

## Prerequisites

- Tier 2, Lesson 4: Matrix Multiplication

## From First Principles

### What is a linear transformation?

A function $T: \mathbb{R}^n \to \mathbb{R}^m$ is **linear** if:

1. $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$ (preserves addition)
2. $T(c\mathbf{u}) = cT(\mathbf{u})$ (preserves scalar multiplication)

Equivalently: $T(c_1\mathbf{u} + c_2\mathbf{v}) = c_1 T(\mathbf{u}) + c_2 T(\mathbf{v})$

> **Key insight:** Every linear transformation can be represented by a matrix,
> and every matrix represents a linear transformation.

### How to find the matrix

The matrix of a transformation is found by seeing **where the standard basis
vectors go**.

For $T: \mathbb{R}^2 \to \mathbb{R}^2$, the matrix is:

$$\mathbf{A} = \begin{pmatrix} | & | \\ T(\mathbf{e}_1) & T(\mathbf{e}_2) \\ | & | \end{pmatrix}$$

where $\mathbf{e}_1 = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$ and $\mathbf{e}_2 = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.

### Example transformations (pen & paper)

**Scaling:**

Scale x by 2, y by 3:

$T(\mathbf{e}_1) = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$, $T(\mathbf{e}_2) = \begin{pmatrix} 0 \\ 3 \end{pmatrix}$

$$\mathbf{A} = \begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}$$

**Verify:** $\begin{pmatrix} 2 & 0 \\ 0 & 3 \end{pmatrix}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$ ✓

**Reflection across x-axis:**

$T(\mathbf{e}_1) = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$, $T(\mathbf{e}_2) = \begin{pmatrix} 0 \\ -1 \end{pmatrix}$

$$\mathbf{A} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$$

**Rotation by angle $\theta$:**

$T(\mathbf{e}_1) = \begin{pmatrix} \cos\theta \\ \sin\theta \end{pmatrix}$, $T(\mathbf{e}_2) = \begin{pmatrix} -\sin\theta \\ \cos\theta \end{pmatrix}$

$$\mathbf{R}_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$$

**Pen & paper: Rotate by 90°**

$\cos 90° = 0$, $\sin 90° = 1$:

$$\mathbf{R}_{90°} = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$$

Check: $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$ — the x-axis maps to the y-axis ✓

**Shear:**

$$\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$$

Shifts the x-coordinate by $k$ times the y-coordinate.  Rectangles become parallelograms.

**Pen & paper: Shear with $k = 2$**

$$\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \begin{pmatrix} 3 \\ 1 \end{pmatrix}$$

### Composition = matrix multiplication

Applying $T_1$ then $T_2$ = multiplying their matrices: $\mathbf{A}_2 \mathbf{A}_1$

**Pen & paper: Scale by 2, then rotate 90°**

$$\mathbf{R}_{90°} \mathbf{S}_2 = \begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 0 & -2 \\ 2 & 0 \end{pmatrix}$$

Apply to $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$: $\begin{pmatrix} 0 \\ 2 \end{pmatrix}$ — scaled to length 2, rotated to y-axis ✓

> **Order matters!** Rotate-then-scale ≠ scale-then-rotate (in general).

### Summary of 2D transformations

| Transformation | Matrix |
|---------------|--------|
| Scale $(s_x, s_y)$ | $\begin{pmatrix} s_x & 0 \\ 0 & s_y \end{pmatrix}$ |
| Rotation by $\theta$ | $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ |
| Reflect x-axis | $\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$ |
| Reflect y-axis | $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$ |
| Shear x | $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$ |
| Projection onto x | $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ |

### What is NOT a linear transformation?

**Translation** $T(\mathbf{x}) = \mathbf{x} + \mathbf{b}$ is **not linear** because $T(\mathbf{0}) = \mathbf{b} \ne \mathbf{0}$.

> That's why we need **homogeneous coordinates** in 3D graphics (Tier 8) — they let us represent translation as matrix multiplication.

## Python Verification

```python
# ── Linear Transformations: verifying pen & paper work ──────
import numpy as np

# Scaling
S = np.array([[2, 0], [0, 3]])
v = np.array([1, 1])
print("=== Scaling ===")
print(f"Scale(1,1) = {S @ v}")

# Reflection
R_ref = np.array([[1, 0], [0, -1]])
print(f"\n=== Reflection across x-axis ===")
print(f"Reflect(1,1) = {R_ref @ np.array([1, 1])}")

# Rotation by 90°
theta = np.radians(90)
R90 = np.array([[np.cos(theta), -np.sin(theta)],
                [np.sin(theta),  np.cos(theta)]])
print(f"\n=== Rotation by 90° ===")
# Round to avoid floating point noise
print(f"Rotate(1,0) = {np.round(R90 @ np.array([1, 0]), 10)}")
print(f"Rotate(0,1) = {np.round(R90 @ np.array([0, 1]), 10)}")

# Shear
K = np.array([[1, 2], [0, 1]])
print(f"\n=== Shear (k=2) ===")
print(f"Shear(1,1) = {K @ np.array([1, 1])}")

# Composition: scale by 2, then rotate 90°
S2 = np.array([[2, 0], [0, 2]])
composed = R90 @ S2
print(f"\n=== Composition: rotate ∘ scale ===")
print(f"Matrix =\n{np.round(composed, 10)}")
print(f"Apply to (1,0) = {np.round(composed @ np.array([1, 0]), 10)}")

# Order matters
scale_then_shear = K @ S2
shear_then_scale = S2 @ K
print(f"\n=== Order matters ===")
print(f"Shear ∘ Scale =\n{scale_then_shear}")
print(f"Scale ∘ Shear =\n{shear_then_scale}")
print(f"Same? {np.array_equal(scale_then_shear, shear_then_scale)}")

# Where do basis vectors go?
print(f"\n=== Basis vectors under rotation 45° ===")
theta45 = np.radians(45)
R45 = np.array([[np.cos(theta45), -np.sin(theta45)],
                [np.sin(theta45),  np.cos(theta45)]])
e1 = np.array([1, 0])
e2 = np.array([0, 1])
print(f"e1 → {np.round(R45 @ e1, 4)}")
print(f"e2 → {np.round(R45 @ e2, 4)}")
```

## Connection to CS / Games / AI

- **3D graphics pipeline** — model → world → view → projection: each is a matrix transformation
- **Neural network layers** — $\mathbf{Wx}$: the weight matrix transforms the input vector
- **Image processing** — rotation, scaling, warping are all matrix transformations on pixel coordinates
- **Data whitening** — decorrelating features before ML is a linear transformation
- **Dimensionality reduction** — PCA projects data onto principal axes (a linear transformation)

## Check Your Understanding

1. **Pen & paper:** Find the matrix that reflects vectors across the line $y = x$.
   (Hint: where does $\mathbf{e}_1$ go? Where does $\mathbf{e}_2$ go?)
2. **Pen & paper:** Compose "reflect across x-axis" then "rotate 90°". Apply the result to $\begin{pmatrix} 1 \\ 0 \end{pmatrix}$.
3. **Pen & paper:** Apply $\begin{pmatrix} 1 & 0 \\ 0 & 0 \end{pmatrix}$ to several vectors.  What does this transformation do geometrically?
4. **Think about it:** Why does a neural network need non-linear activation functions if each layer is just a linear transformation?
