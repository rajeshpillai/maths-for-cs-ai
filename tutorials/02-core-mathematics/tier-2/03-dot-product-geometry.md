# Geometric Meaning of the Dot Product

## Intuition

The dot product isn't just "multiply and add."  Geometrically, it measures
how much one vector goes in the direction of another.  It's the mathematical
heart of similarity, projection, and lighting in 3D graphics.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations (dot product formula)

## From First Principles

### The cosine formula (derivation)

Start with two vectors $\mathbf{a}$ and $\mathbf{b}$ with angle $\theta$ between them.

The vector $\mathbf{a} - \mathbf{b}$ forms the third side of a triangle.

By the **law of cosines**:

$$\|\mathbf{a} - \mathbf{b}\|^2 = \|\mathbf{a}\|^2 + \|\mathbf{b}\|^2 - 2\|\mathbf{a}\|\|\mathbf{b}\|\cos\theta$$

Now expand the left side using the dot product:

$$\|\mathbf{a} - \mathbf{b}\|^2 = (\mathbf{a} - \mathbf{b}) \cdot (\mathbf{a} - \mathbf{b})$$
$$= \mathbf{a} \cdot \mathbf{a} - 2\mathbf{a} \cdot \mathbf{b} + \mathbf{b} \cdot \mathbf{b}$$
$$= \|\mathbf{a}\|^2 - 2\mathbf{a} \cdot \mathbf{b} + \|\mathbf{b}\|^2$$

Set the two expressions equal:

$$\|\mathbf{a}\|^2 - 2\mathbf{a} \cdot \mathbf{b} + \|\mathbf{b}\|^2 = \|\mathbf{a}\|^2 + \|\mathbf{b}\|^2 - 2\|\mathbf{a}\|\|\mathbf{b}\|\cos\theta$$

Cancel $\|\mathbf{a}\|^2 + \|\mathbf{b}\|^2$ from both sides:

$$-2\mathbf{a} \cdot \mathbf{b} = -2\|\mathbf{a}\|\|\mathbf{b}\|\cos\theta$$

$$\boxed{\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\|\|\mathbf{b}\|\cos\theta}$$

### What does the sign tell you?

| Condition | Angle | Meaning |
|-----------|-------|---------|
| $\mathbf{a} \cdot \mathbf{b} > 0$ | $0° \le \theta < 90°$ | Same general direction |
| $\mathbf{a} \cdot \mathbf{b} = 0$ | $\theta = 90°$ | Perpendicular (orthogonal) |
| $\mathbf{a} \cdot \mathbf{b} < 0$ | $90° < \theta \le 180°$ | Opposite general direction |

### Cosine similarity

For unit vectors ($\|\mathbf{a}\| = \|\mathbf{b}\| = 1$):

$$\mathbf{a} \cdot \mathbf{b} = \cos\theta$$

For any vectors:

$$\text{cosine similarity} = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}$$

This ranges from $-1$ (opposite) to $+1$ (identical direction).

**Pen & paper:**

$\mathbf{a} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$, $\mathbf{b} = \begin{pmatrix} 4 \\ 3 \end{pmatrix}$

- $\mathbf{a} \cdot \mathbf{b} = 12 + 12 = 24$
- $\|\mathbf{a}\| = 5$, $\|\mathbf{b}\| = 5$
- $\text{sim} = 24/25 = 0.96$ — very similar direction

### Orthogonality test

Two vectors are **orthogonal** (perpendicular) if and only if:

$$\mathbf{a} \cdot \mathbf{b} = 0$$

**Pen & paper:** Are $\begin{pmatrix} 2 \\ -3 \end{pmatrix}$ and $\begin{pmatrix} 3 \\ 2 \end{pmatrix}$ orthogonal?

$2 \times 3 + (-3) \times 2 = 6 - 6 = 0$ ✓ Yes, orthogonal.

### Projection (derived from the cosine formula)

The scalar projection of $\mathbf{b}$ onto $\mathbf{a}$:

$$\text{comp}_{\mathbf{a}} \mathbf{b} = \|\mathbf{b}\|\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|}$$

The vector projection:

$$\text{proj}_{\mathbf{a}} \mathbf{b} = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|^2} \mathbf{a} = \frac{\mathbf{a} \cdot \mathbf{b}}{\mathbf{a} \cdot \mathbf{a}} \mathbf{a}$$

**Pen & paper:** Project $\mathbf{b} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$ onto $\mathbf{a} = \begin{pmatrix} 4 \\ 0 \end{pmatrix}$:

- $\mathbf{a} \cdot \mathbf{b} = 8$
- $\mathbf{a} \cdot \mathbf{a} = 16$
- $\text{proj} = \frac{8}{16} \begin{pmatrix} 4 \\ 0 \end{pmatrix} = \begin{pmatrix} 2 \\ 0 \end{pmatrix}$

The "shadow" of $(2,3)$ on the x-axis is $(2,0)$. Makes sense!

**The residual** (the part of $\mathbf{b}$ not captured by the projection):

$$\mathbf{b} - \text{proj}_{\mathbf{a}} \mathbf{b} = \begin{pmatrix} 2 \\ 3 \end{pmatrix} - \begin{pmatrix} 2 \\ 0 \end{pmatrix} = \begin{pmatrix} 0 \\ 3 \end{pmatrix}$$

This residual is **orthogonal** to $\mathbf{a}$: $\begin{pmatrix} 4 \\ 0 \end{pmatrix} \cdot \begin{pmatrix} 0 \\ 3 \end{pmatrix} = 0$ ✓

## Python Verification

```python
# ── Dot Product Geometry: verifying pen & paper work ────────
import numpy as np

# Cosine formula derivation check
a = np.array([3, 4])
b = np.array([4, 3])
dot = np.dot(a, b)
norm_a = np.linalg.norm(a)
norm_b = np.linalg.norm(b)
cos_theta = dot / (norm_a * norm_b)
theta = np.degrees(np.arccos(cos_theta))

print("=== Cosine similarity ===")
print(f"a·b = {dot}")
print(f"||a|| = {norm_a}, ||b|| = {norm_b}")
print(f"cosine similarity = {cos_theta:.4f}")
print(f"angle = {theta:.2f}°")

# Orthogonality test
print("\n=== Orthogonality ===")
u = np.array([2, -3])
v = np.array([3, 2])
print(f"{u} · {v} = {np.dot(u, v)} → orthogonal: {np.dot(u, v) == 0}")

# Projection
print("\n=== Projection ===")
a = np.array([4, 0])
b = np.array([2, 3])
proj = (np.dot(a, b) / np.dot(a, a)) * a
residual = b - proj
print(f"proj_a(b) = {proj}")
print(f"residual = {residual}")
print(f"residual · a = {np.dot(residual, a)} (should be 0)")

# Dot product sign vs angle
print("\n=== Dot product sign ===")
pairs = [
    ([1, 0], [1, 1], "acute"),
    ([1, 0], [0, 1], "right angle"),
    ([1, 0], [-1, 1], "obtuse"),
    ([1, 0], [-1, 0], "opposite"),
]
for a_vals, b_vals, desc in pairs:
    a = np.array(a_vals, dtype=float)
    b = np.array(b_vals, dtype=float)
    d = np.dot(a, b)
    angle = np.degrees(np.arccos(np.clip(d / (np.linalg.norm(a) * np.linalg.norm(b)), -1, 1)))
    print(f"  {a} · {b} = {d:5.2f}, angle = {angle:6.1f}° ({desc})")
```

## Connection to CS / Games / AI

- **Cosine similarity** — the standard measure for comparing word embeddings, document vectors, and recommendation vectors
- **Lighting in 3D** — Lambert's cosine law: brightness = surface normal · light direction
- **Orthogonality in ML** — independent features, decorrelated representations, PCA
- **Attention mechanism** — scaled dot-product attention in Transformers computes $\mathbf{Q} \cdot \mathbf{K}^T$

## Check Your Understanding

1. **Pen & paper:** Find the angle between $\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.
2. **Pen & paper:** Project $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ onto $\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$. Verify the residual is orthogonal.
3. **Pen & paper:** Two embedding vectors have cosine similarity 0.  What geometric relationship do they have?  Does this mean the words are "opposite" in meaning?
