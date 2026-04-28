# Pythagorean Theorem → Distance Formula in N Dimensions

## Intuition

The Pythagorean theorem ($a^2 + b^2 = c^2$) is the most important formula in
geometry.  It gives you distance in 2D, extends naturally to 3D and N
dimensions, and is the foundation of every distance calculation in games,
physics, and ML (L2 norm, Euclidean distance).

## Prerequisites

- Tier 0, Lesson 1: Number Systems (square roots)
- Tier 2, Lesson 16: Norms

## From First Principles

### The theorem

In a right triangle with legs $a, b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

### 2D distance

Distance between $(x_1, y_1)$ and $(x_2, y_2)$:

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

**Pen & paper:** $(1, 2)$ to $(4, 6)$:

$d = \sqrt{3^2 + 4^2} = \sqrt{9 + 16} = \sqrt{25} = 5$

### 3D distance

$$d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$$

**Pen & paper:** $(0, 0, 0)$ to $(1, 2, 2)$:

$d = \sqrt{1 + 4 + 4} = \sqrt{9} = 3$

### Deriving ND distance by extension from 2D → 3D → ND

**From 2D to 3D:** Suppose we know the 2D distance in the $xy$-plane between
$(x_1, y_1)$ and $(x_2, y_2)$ is $d_{xy} = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.

Now the two points also differ in $z$. The 3D distance forms a right triangle
where one leg is $d_{xy}$ and the other is $|z_2 - z_1|$. Apply Pythagoras again:

$d_{3D}^2 = d_{xy}^2 + (z_2-z_1)^2 = (x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2$

**From 3D to 4D:** The same argument applies. If we have distance $d_{3D}$ in
the first three coordinates, and the points differ by $w_2 - w_1$ in the fourth:

$d_{4D}^2 = d_{3D}^2 + (w_2-w_1)^2 = \sum_{i=1}^{4}(a_i - b_i)^2$

**Inductive step:** If the formula holds for $(n-1)$ dimensions, then for $n$
dimensions the distance in the first $(n-1)$ coordinates is a leg, the $n$-th
coordinate difference is the other leg, and Pythagoras gives:

$d_n^2 = d_{n-1}^2 + (a_n - b_n)^2 = \sum_{i=1}^{n}(a_i - b_i)^2$

This completes the induction.

### N-dimensional distance

$$d(\mathbf{a}, \mathbf{b}) = \sqrt{\sum_{i=1}^{n}(a_i - b_i)^2} = \|\mathbf{a} - \mathbf{b}\|_2$$

This is the **L2 norm** of the difference vector.

### Squared distance (often sufficient)

$$d^2 = \sum_{i=1}^{n}(a_i - b_i)^2$$

If you only need to **compare** distances (not the actual value), use $d^2$ — it avoids the expensive square root.

**Pen & paper:** Which is closer to $(0,0)$: $(3,4)$ or $(2,5)$?

$d_1^2 = 9 + 16 = 25$, $d_2^2 = 4 + 25 = 29$

$(3,4)$ is closer (no sqrt needed).

### Other distance metrics

| Metric | Formula | Use case |
|--------|---------|----------|
| Euclidean (L2) | $\sqrt{\sum(a_i - b_i)^2}$ | Default, physics |
| Manhattan (L1) | $\sum|a_i - b_i|$ | Grid worlds, sparse data |
| Chebyshev (L∞) | $\max|a_i - b_i|$ | Chess king moves |
| Cosine distance | $1 - \cos\theta$ | NLP, embeddings |

## Python Verification

```python
# ── Distance Formulas ───────────────────────────────────────
import math

# 2D distance
print("=== 2D distance ===")
p1, p2 = (1, 2), (4, 6)
d = math.sqrt((p2[0]-p1[0])**2 + (p2[1]-p1[1])**2)
print(f"({p1}) to ({p2}): d = {d}")

# 3D distance
print(f"\n=== 3D distance ===")
a, b = (0, 0, 0), (1, 2, 2)
d = math.sqrt(sum((ai-bi)**2 for ai, bi in zip(a, b)))
print(f"{a} to {b}: d = {d}")

# Squared distance comparison
print(f"\n=== Squared distance (skip sqrt) ===")
origin = (0, 0)
p1, p2 = (3, 4), (2, 5)
d1_sq = sum((a-b)**2 for a, b in zip(origin, p1))
d2_sq = sum((a-b)**2 for a, b in zip(origin, p2))
print(f"|{p1}|² = {d1_sq}, |{p2}|² = {d2_sq}")
print(f"Closer: {p1 if d1_sq < d2_sq else p2}")

# N-dimensional
print(f"\n=== High-dimensional distance ===")
import random
random.seed(42)
a = [random.random() for _ in range(100)]
b = [random.random() for _ in range(100)]
d = math.sqrt(sum((ai-bi)**2 for ai, bi in zip(a, b)))
print(f"Distance between two 100D random vectors: {d:.4f}")

# Different metrics
print(f"\n=== Distance metrics (2D) ===")
p1, p2 = (1, 4), (4, 0)
l2 = math.sqrt(sum((a-b)**2 for a, b in zip(p1, p2)))
l1 = sum(abs(a-b) for a, b in zip(p1, p2))
linf = max(abs(a-b) for a, b in zip(p1, p2))
print(f"L2 (Euclidean): {l2:.2f}")
print(f"L1 (Manhattan): {l1}")
print(f"L∞ (Chebyshev): {linf}")
```

### Visualisation: 2D distance with Pythagorean triangle

```python
# ── Visualise the Pythagorean triangle behind 2D distance ──
import matplotlib.pyplot as plt

p1, p2 = (1, 2), (4, 6)
dx, dy = p2[0] - p1[0], p2[1] - p1[1]
d = (dx**2 + dy**2)**0.5

fig, ax = plt.subplots(1, 1, figsize=(5, 5))

# Draw the right triangle
# Horizontal leg
ax.plot([p1[0], p2[0]], [p1[1], p1[1]], 'b--', linewidth=1.5, label=f'Δx = {dx}')
# Vertical leg
ax.plot([p2[0], p2[0]], [p1[1], p2[1]], 'r--', linewidth=1.5, label=f'Δy = {dy}')
# Hypotenuse (distance)
ax.plot([p1[0], p2[0]], [p1[1], p2[1]], 'k-', linewidth=2, label=f'd = {d:.0f}')

# Right angle marker
ax.plot([p2[0]-0.3, p2[0]-0.3, p2[0]], [p1[1], p1[1]+0.3, p1[1]+0.3], 'k-', linewidth=1)

# Points
ax.plot(*p1, 'ko', markersize=8)
ax.plot(*p2, 'ko', markersize=8)
ax.annotate(f'({p1[0]},{p1[1]})', p1, textcoords="offset points", xytext=(-30,-15), fontsize=11)
ax.annotate(f'({p2[0]},{p2[1]})', p2, textcoords="offset points", xytext=(5,5), fontsize=11)

# Label hypotenuse
mid = ((p1[0]+p2[0])/2, (p1[1]+p2[1])/2)
ax.annotate(f'd = √({dx}² + {dy}²) = {d:.0f}', mid, textcoords="offset points",
            xytext=(-80, 10), fontsize=10, color='black')

ax.set_xlim(0, 6)
ax.set_ylim(0, 8)
ax.set_aspect('equal')
ax.legend(loc='upper left')
ax.set_title('Pythagorean Distance in 2D')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Connection to CS / Games / AI / Business / Industry

- **Collision detection** — check if distance between objects < sum of radii
- **k-NN** — classify by finding the k nearest points (Euclidean distance)
- **K-means clustering** — assign points to nearest centroid (squared distance)
- **Physics engines** — force calculations use distance between objects
- **Spatial indexing** — quadtrees, k-d trees optimise distance queries

## Check Your Understanding

1. **Pen & paper:** Distance from $(3, -1, 2)$ to $(-1, 2, 6)$.
2. **Pen & paper:** A game needs to check if two circles (centres $(2,3)$ r=1 and $(5,7)$ r=2) overlap.  Do they?
3. **Think about it:** Why is squared distance preferred over distance for performance in game engines?
