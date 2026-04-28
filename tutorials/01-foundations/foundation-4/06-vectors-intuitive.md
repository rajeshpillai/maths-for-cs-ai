# Vectors — Intuitive Introduction

## Intuition

A scalar tells you "how much" (temperature, mass, speed).  A **vector** tells
you "how much" *and* "which direction" (velocity, force, displacement).  In
games, every moving object has a position vector and a velocity vector.  In ML,
every data point is a vector in feature space.  This lesson builds vector
arithmetic from scratch and bridges directly into Tier 2 (Linear Algebra).

## Prerequisites

- Foundation 2, Lesson 1: Coordinate Systems (Cartesian plane, plotting points)

## From First Principles

### What is a vector?

A vector is an arrow with a **magnitude** (length) and a **direction**.
Two arrows with the same length and direction are the *same vector*, no matter
where they sit in the plane.

We write a 2D vector as an ordered pair of components:

$$\mathbf{v} = \begin{pmatrix} v_x \\ v_y \end{pmatrix}$$

$v_x$ = how far right, $v_y$ = how far up.

Example: $\mathbf{v} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$ means "go 3 right
and 4 up".

### Vector addition — tip-to-tail

Place the tail of $\mathbf{b}$ at the tip of $\mathbf{a}$.  The result
$\mathbf{a} + \mathbf{b}$ goes from the tail of $\mathbf{a}$ to the tip
of $\mathbf{b}$.

Algebraically, add component-wise:

$$\mathbf{a} + \mathbf{b} = \begin{pmatrix} a_x + b_x \\ a_y + b_y \end{pmatrix}$$

**Pen & paper:** $\mathbf{a} = \begin{pmatrix} 2 \\ 3 \end{pmatrix}$,
$\mathbf{b} = \begin{pmatrix} 4 \\ -1 \end{pmatrix}$

$\mathbf{a} + \mathbf{b} = \begin{pmatrix} 6 \\ 2 \end{pmatrix}$

### Vector subtraction

$$\mathbf{a} - \mathbf{b} = \mathbf{a} + (-\mathbf{b}) = \begin{pmatrix} a_x - b_x \\ a_y - b_y \end{pmatrix}$$

Geometrically, $\mathbf{a} - \mathbf{b}$ is the vector **from the tip of
$\mathbf{b}$ to the tip of $\mathbf{a}$** (when both start at the origin).

### Scalar multiplication

Multiply each component by the scalar $k$:

$$k\mathbf{v} = \begin{pmatrix} kv_x \\ kv_y \end{pmatrix}$$

$k > 1$: stretches.  $0 < k < 1$: shrinks.  $k < 0$: reverses direction.

**Pen & paper:** $3 \begin{pmatrix} 1 \\ -2 \end{pmatrix} = \begin{pmatrix} 3 \\ -6 \end{pmatrix}$

### Magnitude (length)

The magnitude of $\mathbf{v}$ is the distance from the origin to $(v_x, v_y)$:

$$\|\mathbf{v}\| = \sqrt{v_x^2 + v_y^2}$$

This is just the Pythagorean theorem.

**Pen & paper:** $\|\begin{pmatrix} 3 \\ 4 \end{pmatrix}\| = \sqrt{9 + 16} = \sqrt{25} = 5$

In 3D: $\|\mathbf{v}\| = \sqrt{v_x^2 + v_y^2 + v_z^2}$

### Unit vectors

A **unit vector** has magnitude 1.  To normalise any vector:

$$\hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|}$$

**Pen & paper:** Normalise $\mathbf{v} = \begin{pmatrix} 3 \\ 4 \end{pmatrix}$:

$\hat{\mathbf{v}} = \frac{1}{5}\begin{pmatrix} 3 \\ 4 \end{pmatrix} = \begin{pmatrix} 0.6 \\ 0.8 \end{pmatrix}$

Check: $\sqrt{0.36 + 0.64} = \sqrt{1} = 1$.

The standard basis vectors: $\hat{\mathbf{i}} = \begin{pmatrix} 1 \\ 0 \end{pmatrix}$,
$\hat{\mathbf{j}} = \begin{pmatrix} 0 \\ 1 \end{pmatrix}$.

Any vector: $\mathbf{v} = v_x \hat{\mathbf{i}} + v_y \hat{\mathbf{j}}$.

### Visualisation — vector addition diagram

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: vector addition (tip-to-tail)
ax = axes[0]
a = np.array([2, 3])
b = np.array([4, -1])
s = a + b

ax.quiver(0, 0, a[0], a[1], angles='xy', scale_units='xy', scale=1,
          color='blue', width=0.02, label='a = (2, 3)')
ax.quiver(a[0], a[1], b[0], b[1], angles='xy', scale_units='xy', scale=1,
          color='red', width=0.02, label='b = (4, -1)')
ax.quiver(0, 0, s[0], s[1], angles='xy', scale_units='xy', scale=1,
          color='green', width=0.025, label='a + b = (6, 2)')
ax.set_xlim(-1, 8)
ax.set_ylim(-2, 5)
ax.set_aspect('equal')
ax.set_title('Vector Addition (tip-to-tail)')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)

# Right: scalar multiplication and unit vector
ax = axes[1]
v = np.array([3, 4])
mag = np.linalg.norm(v)
v_hat = v / mag

ax.quiver(0, 0, v[0], v[1], angles='xy', scale_units='xy', scale=1,
          color='blue', width=0.02, label=f'v = (3, 4), |v| = {mag:.0f}')
ax.quiver(0, 0, v_hat[0], v_hat[1], angles='xy', scale_units='xy', scale=1,
          color='red', width=0.025, label=f'v-hat = ({v_hat[0]:.1f}, {v_hat[1]:.1f})')
ax.quiver(0, 0, 2*v[0], 2*v[1], angles='xy', scale_units='xy', scale=1,
          color='green', width=0.015, alpha=0.5, label='2v = (6, 8)')

# Unit circle for reference
t = np.linspace(0, 2*np.pi, 100)
ax.plot(np.cos(t), np.sin(t), 'k--', alpha=0.2)

ax.set_xlim(-1, 9)
ax.set_ylim(-1, 9)
ax.set_aspect('equal')
ax.set_title('Scalar multiplication & unit vector')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Vectors: from scratch ───────────────────────────────────
import math

# Define vectors as tuples
a = (2, 3)
b = (4, -1)

# Addition
add = (a[0]+b[0], a[1]+b[1])
print(f"=== Vector addition ===")
print(f"  a = {a},  b = {b}")
print(f"  a + b = {add}")

# Subtraction
sub = (a[0]-b[0], a[1]-b[1])
print(f"\n=== Vector subtraction ===")
print(f"  a - b = {sub}")

# Scalar multiplication
k = 3
v = (1, -2)
scaled = (k*v[0], k*v[1])
print(f"\n=== Scalar multiplication ===")
print(f"  {k} * {v} = {scaled}")

# Magnitude
v = (3, 4)
mag = math.sqrt(v[0]**2 + v[1]**2)
print(f"\n=== Magnitude ===")
print(f"  |{v}| = sqrt({v[0]**2} + {v[1]**2}) = {mag:.1f}")

# Unit vector
v_hat = (v[0]/mag, v[1]/mag)
mag_hat = math.sqrt(v_hat[0]**2 + v_hat[1]**2)
print(f"\n=== Unit vector ===")
print(f"  v-hat = ({v_hat[0]:.4f}, {v_hat[1]:.4f})")
print(f"  |v-hat| = {mag_hat:.6f}  (should be 1)")

# 3D example
print(f"\n=== 3D vector ===")
v3 = (1, 2, 2)
mag3 = math.sqrt(sum(c**2 for c in v3))
v3_hat = tuple(c/mag3 for c in v3)
print(f"  v = {v3},  |v| = {mag3:.1f}")
print(f"  v-hat = ({v3_hat[0]:.4f}, {v3_hat[1]:.4f}, {v3_hat[2]:.4f})")

# Component form: v = vx*i + vy*j
print(f"\n=== Component form ===")
v = (3, 4)
print(f"  {v} = {v[0]}*i + {v[1]}*j")
print(f"  where i = (1,0) and j = (0,1)")
```

## Connection to CS / Games / AI / Business / Industry

- **Game physics** — position, velocity, and acceleration are all vectors;
  every frame computes `position += velocity * dt`
- **ML feature vectors** — each data point is a vector in $\mathbb{R}^n$;
  operations like addition (combining features) and normalisation (unit vectors)
  are fundamental
- **Graphics normals** — surface normals are unit vectors used for lighting
  calculations; you normalise them constantly
- **Pathfinding** — direction vectors between waypoints; subtraction gives
  the "from A to B" vector
- **Tier 2 bridge** — everything here extends directly: dot products, cross
  products, matrix-vector multiplication, and linear transformations all build
  on these basics

## Check Your Understanding

1. **Pen & paper:** Given $\mathbf{a} = \begin{pmatrix} -1 \\ 5 \end{pmatrix}$ and $\mathbf{b} = \begin{pmatrix} 3 \\ 2 \end{pmatrix}$, compute $2\mathbf{a} - \mathbf{b}$.
2. **Pen & paper:** Find the magnitude of $\begin{pmatrix} -5 \\ 12 \end{pmatrix}$ and its unit vector.
3. **Pen & paper:** Points $A = (1, 2)$ and $B = (4, 6)$.  Write the vector $\overrightarrow{AB}$ and find its length.
4. **Think:** In 3D, why does normalising the zero vector $\begin{pmatrix} 0 \\ 0 \\ 0 \end{pmatrix}$ fail?  What should a game engine do when it encounters this?
