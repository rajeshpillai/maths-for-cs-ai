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

## Visualisation — The dot product as "how aligned"

The dot product collapses two vectors into a single number that
*tracks the angle between them*. The plot below sweeps a vector around
a fixed reference and shows how $\mathbf{a} \cdot \mathbf{b}$ moves
through positive (aligned), zero (perpendicular), and negative
(opposing).

```python
# ── Visualising the dot product as alignment ────────────────
import numpy as np
import matplotlib.pyplot as plt

# Fixed reference vector (unit length so |a| = 1).
a = np.array([1.0, 0.0])

# Sweep b around the circle from 0° to 360°.
angles_deg = np.linspace(0, 360, 361)
angles_rad = np.radians(angles_deg)
b_x, b_y   = np.cos(angles_rad), np.sin(angles_rad)
dots       = a[0] * b_x + a[1] * b_y          # = cos(angle)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) Geometry: a fixed, four representative b vectors at 0°, 60°, 90°, 150°.
ax = axes[0]
ax.quiver(0, 0, *a, angles="xy", scale_units="xy", scale=1,
          color="tab:blue", width=0.012, label="a (fixed)")
sample_angles = [0, 60, 90, 150, 180]
colors = plt.cm.coolwarm(np.linspace(0, 1, len(sample_angles)))
for ang_deg, c in zip(sample_angles, colors):
    rad = np.radians(ang_deg)
    bv = np.array([np.cos(rad), np.sin(rad)])
    d = a @ bv
    ax.quiver(0, 0, *bv, angles="xy", scale_units="xy", scale=1,
              color=c, width=0.010,
              label=f"θ={ang_deg}°,  a·b={d:+.2f}")
# Light unit-circle background to anchor the figure.
theta = np.linspace(0, 2 * np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), color="grey", lw=0.5, linestyle="--")
ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.5, 1.5); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Sweeping b around the unit circle\n(angle θ from a)")
ax.legend(loc="lower left", fontsize=8); ax.grid(True, alpha=0.3)

# (2) The dot-product curve as θ varies. It IS cos θ.
ax = axes[1]
ax.plot(angles_deg, dots, color="tab:purple", lw=2)
ax.axhline(0, color="black", lw=0.6)
for ang_deg in [0, 90, 180, 270]:
    d = np.cos(np.radians(ang_deg))
    ax.scatter([ang_deg], [d], color="red", zorder=5, s=70)
    ax.text(ang_deg + 4, d + 0.05, f"θ={ang_deg}°,  cos θ = {d:.0f}",
            fontsize=9)
ax.set_title("As θ rotates, a · b traces out cos θ\n+1 = aligned, 0 = ⊥, −1 = opposite")
ax.set_xlabel("angle θ between a and b (degrees)")
ax.set_ylabel("a · b   (= cos θ when |a| = |b| = 1)")
ax.set_xticks([0, 45, 90, 135, 180, 225, 270, 315, 360])
ax.set_ylim(-1.2, 1.2); ax.grid(True, alpha=0.3)

# (3) Cosine similarity heatmap on five concrete vectors.
# This is exactly how recommendation systems compare items.
ax = axes[2]
labels = ["a = [1, 0]", "b = [1, 1]", "c = [0, 1]", "d = [-1, 1]", "e = [-1, 0]"]
vecs = np.array([[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]], dtype=float)
def cossim(u, v):
    return (u @ v) / (np.linalg.norm(u) * np.linalg.norm(v))
M = np.array([[cossim(u, v) for v in vecs] for u in vecs])
im = ax.imshow(M, cmap="RdBu", vmin=-1, vmax=1)
for i in range(M.shape[0]):
    for j in range(M.shape[1]):
        ax.text(j, i, f"{M[i, j]:+.2f}", ha="center", va="center",
                color="white" if abs(M[i, j]) > 0.5 else "black",
                fontsize=10)
ax.set_xticks(range(5)); ax.set_xticklabels(labels, rotation=45, fontsize=8, ha="right")
ax.set_yticks(range(5)); ax.set_yticklabels(labels, fontsize=8)
ax.set_title("Cosine similarity matrix — exactly the\noperation behind item-similarity in recsys")
plt.colorbar(im, ax=ax, fraction=0.046)

plt.tight_layout()
plt.show()

# Print the table that mirrors the right-hand heatmap.
print("Cosine similarity (= a·b / |a||b|):")
print(f"{'':>15}  {'a':>7}  {'b':>7}  {'c':>7}  {'d':>7}  {'e':>7}")
for label, row in zip(["a", "b", "c", "d", "e"], M):
    print(f"  {label:<13}  {row[0]:+.3f}  {row[1]:+.3f}  {row[2]:+.3f}  "
          f"{row[3]:+.3f}  {row[4]:+.3f}")
```

**The single most important fact in linear algebra for ML:**

$$\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\|\,\|\mathbf{b}\| \cos\theta$$

means the dot product is **directly proportional to alignment**:

- **+1 / large positive** ⇒ vectors point the same way (aligned). In
  embedding search, this is "very similar".
- **0** ⇒ perpendicular (orthogonal). In ML, "uncorrelated features".
- **−1 / large negative** ⇒ pointing opposite directions. In NLP,
  antonyms appear as nearly-opposite embedding vectors.

That single mapping — **dot product → cosine of angle → similarity
score** — is the engine behind every embedding-based search system
(Pinecone, FAISS, Weaviate), every recommendation engine that compares
user/item vectors, every classifier head that scores classes against an
embedding, and every attention head in a Transformer (where queries and
keys are dot-producted to decide what to "look at").

## Connection to CS / Games / AI / Business / Industry

- **Cosine similarity** — the standard measure for comparing word embeddings, document vectors, and recommendation vectors
- **Lighting in 3D** — Lambert's cosine law: brightness = surface normal · light direction
- **Orthogonality in ML** — independent features, decorrelated representations, PCA
- **Attention mechanism** — scaled dot-product attention in Transformers computes $\mathbf{Q} \cdot \mathbf{K}^T$

## Check Your Understanding

1. **Pen & paper:** Find the angle between $\begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix}$ and $\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix}$.
2. **Pen & paper:** Project $\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$ onto $\begin{pmatrix} 1 \\ 1 \\ 0 \end{pmatrix}$. Verify the residual is orthogonal.
3. **Pen & paper:** Two embedding vectors have cosine similarity 0.  What geometric relationship do they have?  Does this mean the words are "opposite" in meaning?
