---
strand: shape-space
level: intermediate
order: 5
title: Cross Product and 3D Vectors
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 04-dot-product
    description: Dot product
connections:
  - strand-3-shape-space-intermediate/09-3d-geometry-capstone
applications:
  - cs: "Surface normals in 3D graphics, torque calculations"
  - games: "Determining left/right of a path, collision normals"
  - life: "Right-hand rule in physics, magnetic fields"
---

# Cross Product and 3D Vectors

## Mental

In 3D, vectors are triples: $\mathbf{v} = (v_x, v_y, v_z)$.
Magnitude: $\sqrt{v_x^2 + v_y^2 + v_z^2}$ (Pythagoras in 3D).

The **dot product** generalises directly: $\mathbf{u} \cdot \mathbf{v}
= u_x v_x + u_y v_y + u_z v_z$.

A new operation appears in 3D — the **cross product**, producing a
**vector** perpendicular to both inputs:

$$
\mathbf{u} \times \mathbf{v} = (u_y v_z - u_z v_y, \, u_z v_x - u_x v_z, \, u_x v_y - u_y v_x).
$$

Geometric properties:

- $|\mathbf{u} \times \mathbf{v}| = |\mathbf{u}| |\mathbf{v}|
  \sin\theta$ — the **area of the parallelogram** spanned by
  $\mathbf{u}, \mathbf{v}$.
- $(\mathbf{u} \times \mathbf{v}) \cdot \mathbf{u} = 0$ —
  perpendicular to $\mathbf{u}$.
- $(\mathbf{u} \times \mathbf{v}) \cdot \mathbf{v} = 0$ —
  perpendicular to $\mathbf{v}$.
- **Direction** is given by the **right-hand rule**: point fingers
  along $\mathbf{u}$, curl toward $\mathbf{v}$, thumb points along
  the cross product.

The cross product **is not commutative**: $\mathbf{u} \times
\mathbf{v} = -(\mathbf{v} \times \mathbf{u})$.

## The right-hand rule

Stand at the origin with your right hand:

1. Index finger points along $\mathbf{u}$.
2. Middle finger points along $\mathbf{v}$.
3. Thumb points along $\mathbf{u} \times \mathbf{v}$.

For standard basis vectors $\mathbf{i} = (1, 0, 0), \mathbf{j} = (0, 1,
0), \mathbf{k} = (0, 0, 1)$:

$$
\mathbf{i} \times \mathbf{j} = \mathbf{k}, \quad \mathbf{j} \times \mathbf{k} = \mathbf{i}, \quad \mathbf{k} \times \mathbf{i} = \mathbf{j}.
$$

Cyclic order. Reversing reverses sign.

## Interactive

:::widget type=numeric-input prompt="$\\mathbf{i} \\times \\mathbf{j} = (a, b, c)$. Type the $z$-component $c$." answer=1 explain="$\\mathbf{i} \\times \\mathbf{j} = \\mathbf{k} = (0, 0, 1)$.":::

:::widget type=numeric-input prompt="$\\mathbf{j} \\times \\mathbf{i} = ?$ Z-component." answer=-1 explain="Reverse order = negate. $-\\mathbf{k} = (0, 0, -1)$.":::

:::widget type=numeric-input prompt="$(1, 0, 0) \\times (0, 1, 0) = (a, b, c)$. Type $a$." answer=0 explain="$(0, 0, 1)$. The first two components are 0.":::

:::widget type=numeric-input prompt="Magnitude of $\\mathbf{u} \\times \\mathbf{v}$ when $|\\mathbf{u}| = 3, |\\mathbf{v}| = 4$, $\\theta = 90°$. (Maximum case.)" answer=12 explain="$3 \\cdot 4 \\cdot \\sin 90° = 12$.":::

:::widget type=numeric-input prompt="Same vectors at $\\theta = 0°$ (parallel). Cross product magnitude?" answer=0 explain="$\\sin 0 = 0$. Parallel vectors cross to zero.":::

## Symbolic

The **cross product** in coordinates:

$$
\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_x & u_y & u_z \\ v_x & v_y & v_z \end{vmatrix}.
$$

(A determinant — Strand 2 Intermediate's view of cross product.)

Expand:

$$
\mathbf{u} \times \mathbf{v} = (u_y v_z - u_z v_y) \mathbf{i} - (u_x v_z - u_z v_x) \mathbf{j} + (u_x v_y - u_y v_x) \mathbf{k}.
$$

**Properties**:

- Anticommutative: $\mathbf{u} \times \mathbf{v} = -(\mathbf{v}
  \times \mathbf{u})$.
- Distributive: $\mathbf{u} \times (\mathbf{v} + \mathbf{w}) =
  \mathbf{u} \times \mathbf{v} + \mathbf{u} \times \mathbf{w}$.
- **Not associative**: $(\mathbf{u} \times \mathbf{v}) \times
  \mathbf{w} \ne \mathbf{u} \times (\mathbf{v} \times \mathbf{w})$ in
  general.

**Magnitude** = $|\mathbf{u}| |\mathbf{v}| \sin\theta$ = area of
parallelogram. So **half** that is the area of triangle spanned by
the two vectors.

## Computational

```python
import numpy as np

u = np.array([1, 2, 3])
v = np.array([4, 5, 6])

print(np.cross(u, v))       # [-3, 6, -3]
print(np.dot(u, np.cross(u, v)))   # 0 — perpendicular ✓

# Area of parallelogram spanned by u, v
print(np.linalg.norm(np.cross(u, v)))   # 7.348...

# Triangle area = half
print(np.linalg.norm(np.cross(u, v)) / 2)   # 3.674...
```

## Applied

- **Surface normals** in 3D graphics: given two edges of a triangle,
  the cross product is the **outward normal** — used for backface
  culling, lighting calculations.
- **Torque** in physics: $\boldsymbol{\tau} = \mathbf{r} \times
  \mathbf{F}$. Magnitude depends on perpendicularity.
- **Magnetic force**: $\mathbf{F} = q \mathbf{v} \times \mathbf{B}$.
  Charged particles spiral in magnetic fields.
- **Determining handedness**: cross product reveals whether two
  vectors form a "right-handed" or "left-handed" pair.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathbf{i} \\times \\mathbf{i} = ?$" answer=0 explain="Parallel to itself: zero vector. Type 0 (representing the zero vector).":::

:::widget type=numeric-input prompt="$(1, 0, 0) \\times (0, 0, 1) = (a, b, c)$. Type $b$." answer=-1 explain="$\\mathbf{i} \\times \\mathbf{k} = -\\mathbf{j}$. Component $b = -1$.":::

:::widget type=numeric-input prompt="Cross product magnitude of two vectors with $|\\mathbf{u}| = 5, |\\mathbf{v}| = 3, \\theta = 30°$?" answer=7.5 explain="$5 \\cdot 3 \\cdot \\sin 30° = 5 \\cdot 3 \\cdot 0.5 = 7.5$.":::

:::widget type=numeric-input prompt="If $\\mathbf{u} \\times \\mathbf{v} = \\mathbf{0}$ and neither is zero, then $\\mathbf{u}$ and $\\mathbf{v}$ are..." answer=0 explain="Parallel. Type 0 if 'parallel'. (1 if perpendicular.)":::
