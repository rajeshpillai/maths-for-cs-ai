---
strand: shape-space
level: advanced
order: 0
title: Projective Coordinates
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 09-shape-space-capstone-2
    description: Intermediate shape & space capstone
connections:
  - strand-3-shape-space-advanced/01-projective-transformations
applications:
  - cs: "3D graphics pipeline, computer vision homographies"
  - life: "Adding points 'at infinity' so geometry behaves uniformly"
---

# Projective Coordinates

## Mental

In Euclidean geometry, two parallel lines never meet. Annoying — for
images and projection, it'd be more uniform if every two distinct
lines met at *some* point.

**Projective geometry** adds a "point at infinity" for every direction.
The **real projective plane** $\mathbb{RP}^2$ is

$$
\mathbb{RP}^2 = \{\text{lines through origin in } \mathbb{R}^3\}.
$$

Each point of $\mathbb{RP}^2$ is a line through the origin, represented
by **homogeneous coordinates** $[x : y : z]$ — equal up to non-zero
scalar.

## The two charts

- **Affine chart**: lines with $z \ne 0$ correspond to ordinary
  points $(x/z, y/z) \in \mathbb{R}^2$.
- **Line at infinity**: lines with $z = 0$ correspond to "directions"
  in $\mathbb{R}^2$ — points "at infinity."

Every line in $\mathbb{RP}^2$ contains exactly one point at infinity
(the direction of the line). Two lines are parallel in the affine
chart iff they share that point at infinity.

## Why this matters

Adding points at infinity makes geometric statements uniform:

- "Every two distinct lines meet at exactly one point" — true in
  $\mathbb{RP}^2$ unconditionally.
- "Every two distinct points lie on a unique line" — true.

That symmetry — points and lines play interchangeable roles — is
**projective duality**.

## Worked example: parallel lines meet at infinity

Lines $y = 1$ and $y = 2$ in the affine plane. In homogeneous
coordinates: $y - z = 0$ and $y - 2z = 0$.

Subtract: $z = 0$. Then $y = 0$ from either. The intersection is
$[1 : 0 : 0]$ — the "horizontal direction" point at infinity.

## Interactive

:::widget type=numeric-input prompt="Homogeneous coordinates $[2 : 4 : 2]$ correspond to affine point $(2/2, 4/2) = ?$. Type the $x$-component." answer=1 explain="$x = 1$, $y = 2$.":::

:::widget type=numeric-input prompt="$[3 : 6 : 0]$ — what kind of point? 1 = ordinary affine, 0 = point at infinity." answer=0 explain="$z = 0$ — at infinity (in the direction $[3:6:0] = [1:2:0]$).":::

:::widget type=numeric-input prompt="In $\\mathbb{RP}^2$, two distinct lines always meet. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$[1 : 1 : 1] = [2 : 2 : 2]$? Type 1 yes (same projective point), 0 no." answer=1 explain="Yes — same equivalence class.":::

## Symbolic

**Projective plane $\mathbb{RP}^n$**: equivalence classes of nonzero
$\mathbb{R}^{n+1}$ vectors under scaling. Has dimension $n$.

**Lines in $\mathbb{RP}^2$**: each line is the zero set
$\{[x:y:z] : ax + by + cz = 0\}$ for some non-zero $(a, b, c)$ —
also up to scaling. So **lines and points are dual** — both sit in
$\mathbb{RP}^2$, both have homogeneous coordinates.

**Algebraic varieties in projective space** — $V(F) = \{[x:y:z] : F(x, y, z) = 0\}$
for $F$ a homogeneous polynomial. Conics are $V(F)$ with $\deg F = 2$.

**Bezout's theorem**: two algebraic curves in $\mathbb{RP}^2$ of
degrees $d_1, d_2$ meet in *exactly* $d_1 d_2$ points (counted with
multiplicity, over $\mathbb{C}$).

## Computational

```python
import numpy as np

def to_affine(p):
    x, y, z = p
    if z == 0:
        return ("at infinity in direction", (x, y))
    return (x / z, y / z)

def to_homog(x, y):
    return (x, y, 1)

print(to_affine((2, 4, 2)))               # (1.0, 2.0)
print(to_affine((1, 2, 0)))               # at infinity in direction (1, 2)

# Intersect parallel lines y - 1 = 0 and y - 2 = 0
# Homog: y - z = 0, y - 2z = 0
# Cross product gives intersection
def line_meet(L1, L2):
    return tuple(np.cross(L1, L2))

L1 = (0, 1, -1)        # y = 1
L2 = (0, 1, -2)        # y = 2
print(line_meet(L1, L2))                  # (-1, 0, 0) ~ [1:0:0]

# Two parallel vertical lines x = 0 and x = 1
print(line_meet((1, 0, 0), (1, 0, -1)))   # (0, 1, 0) ~ vertical infinity
```

## Applied

- **Computer graphics — 3D rendering pipeline** uses 4D homogeneous
  coordinates $[x:y:z:w]$ for 3D points; perspective projection is a
  linear map followed by division by $w$.
- **Computer vision — homographies** are projective transformations
  $\mathbb{RP}^2 \to \mathbb{RP}^2$, used to align/stitch images,
  rectify documents, AR.
- **Camera calibration** — DLT (Direct Linear Transform) solves for a
  projective camera matrix from point correspondences.
- **Algebraic geometry** — projective varieties unify the study of
  curves and surfaces; the "at infinity" behaviour reveals important
  global structure.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathbb{RP}^2$ has dimension $2$. Type 2." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="A line in $\\mathbb{RP}^2$ is determined by 3 homogeneous coords $(a, b, c)$ up to scaling — same dimension as a point. Projective duality. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="By Bezout, a line and a conic in $\\mathbb{RP}^2$ meet in $1 \\cdot 2 = ?$ points (counted with mult)." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Two parallel lines meet at a point at infinity. Type 1." answer=1 explain="Yes.":::
