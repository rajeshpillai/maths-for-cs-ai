# Further Vectors — Lines and Planes in 3D

## Intuition

In 2D, a line is $y = mx + c$.  In 3D, a line needs a **point** and a
**direction vector**.  A plane needs a **point** and a **normal vector**.
These are the building blocks of 3D collision detection, ray tracing, and
camera systems.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations (dot product, cross product)
- Tier 8, Lesson 9: Ray Intersection

## From First Principles

### Line in 3D

A line through point $\mathbf{a}$ with direction $\mathbf{d}$:

$$\mathbf{r} = \mathbf{a} + t\mathbf{d}, \quad t \in \mathbb{R}$$

**Pen & paper:** Line through $(1, 2, 3)$ in direction $(2, -1, 4)$:

$$\mathbf{r} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix} + t\begin{pmatrix} 2 \\ -1 \\ 4 \end{pmatrix}$$

At $t = 0$: $(1, 2, 3)$.  At $t = 1$: $(3, 1, 7)$.

### Line through two points

Direction = $\mathbf{b} - \mathbf{a}$.

Line through $(1, 0, 2)$ and $(3, 4, -1)$:

$\mathbf{d} = (2, 4, -3)$

$\mathbf{r} = (1, 0, 2) + t(2, 4, -3)$

### Plane in 3D

A plane through point $\mathbf{a}$ with normal $\mathbf{n}$:

$$\mathbf{n} \cdot (\mathbf{r} - \mathbf{a}) = 0$$

Expanded: $n_1(x - a_1) + n_2(y - a_2) + n_3(z - a_3) = 0$

Or: $n_1 x + n_2 y + n_3 z = d$ where $d = \mathbf{n} \cdot \mathbf{a}$.

**Pen & paper:** Plane through $(1, 2, 3)$ with normal $(1, -1, 2)$:

$(1)(x-1) + (-1)(y-2) + (2)(z-3) = 0$

$x - y + 2z = 5$

### Plane from three points

Given $P_1, P_2, P_3$:

1. $\mathbf{v}_1 = P_2 - P_1$, $\mathbf{v}_2 = P_3 - P_1$
2. Normal: $\mathbf{n} = \mathbf{v}_1 \times \mathbf{v}_2$
3. Plane: $\mathbf{n} \cdot (\mathbf{r} - P_1) = 0$

**Pen & paper:** Points $(1,0,0), (0,1,0), (0,0,1)$:

$\mathbf{v}_1 = (-1, 1, 0)$, $\mathbf{v}_2 = (-1, 0, 1)$

$\mathbf{n} = \mathbf{v}_1 \times \mathbf{v}_2 = (1, 1, 1)$

Plane: $x + y + z = 1$

### Distance from point to plane

$$d = \frac{|\mathbf{n} \cdot \mathbf{p} - d|}{|\mathbf{n}|}$$

**Pen & paper:** Distance from $(2, 3, 1)$ to plane $x + y + z = 1$:

$d = \frac{|2 + 3 + 1 - 1|}{\sqrt{3}} = \frac{5}{\sqrt{3}} \approx 2.89$

### Line-plane intersection

Substitute line into plane equation, solve for $t$.

**Pen & paper:** Line $\mathbf{r} = (1,0,0) + t(1,1,1)$, plane $x + y + z = 3$.

$(1+t) + (0+t) + (0+t) = 3$ → $1 + 3t = 3$ → $t = 2/3$

Point: $(1 + 2/3, 2/3, 2/3) = (5/3, 2/3, 2/3)$.

### Angle between two planes

$$\cos\theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}$$

### Do two lines intersect? (3D)

Two lines in 3D generally **don't** intersect (they're **skew**).

Test: set $\mathbf{a}_1 + s\mathbf{d}_1 = \mathbf{a}_2 + t\mathbf{d}_2$ — 3 equations, 2 unknowns.
Solve any 2 equations for $s, t$, check in the 3rd.

### Shortest distance between skew lines

$$d = \frac{|(\mathbf{a}_2 - \mathbf{a}_1) \cdot (\mathbf{d}_1 \times \mathbf{d}_2)|}{|\mathbf{d}_1 \times \mathbf{d}_2|}$$

## Python Verification

```python
# ── 3D Lines and Planes ─────────────────────────────────────
import math

def dot(a, b):
    return sum(ai*bi for ai, bi in zip(a, b))

def cross(a, b):
    return (a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0])

def norm(v):
    return math.sqrt(sum(x**2 for x in v))

def add(a, b):
    return tuple(ai+bi for ai, bi in zip(a, b))

def scale(s, v):
    return tuple(s*vi for vi in v)

def sub(a, b):
    return tuple(ai-bi for ai, bi in zip(a, b))

# Line: r = (1,2,3) + t(2,-1,4)
print("=== Line ===")
a = (1, 2, 3)
d = (2, -1, 4)
for t in [0, 1, 2, -1]:
    p = add(a, scale(t, d))
    print(f"  t={t:+d}: {p}")

# Plane through 3 points
print(f"\n=== Plane through (1,0,0), (0,1,0), (0,0,1) ===")
P1, P2, P3 = (1,0,0), (0,1,0), (0,0,1)
v1 = sub(P2, P1)
v2 = sub(P3, P1)
n = cross(v1, v2)
d_val = dot(n, P1)
print(f"  Normal: {n}")
print(f"  Plane: {n[0]}x + {n[1]}y + {n[2]}z = {d_val}")

# Verify all 3 points lie on plane
for P in [P1, P2, P3]:
    print(f"  Check {P}: {dot(n, P)} = {d_val} ✓")

# Distance from point to plane
print(f"\n=== Distance: (2,3,1) to x+y+z=1 ===")
point = (2, 3, 1)
n_plane = (1, 1, 1)
d_plane = 1
dist = abs(dot(n_plane, point) - d_plane) / norm(n_plane)
print(f"  d = {dist:.4f}")

# Line-plane intersection
print(f"\n=== Line r=(1,0,0)+t(1,1,1) meets x+y+z=3 ===")
a_line = (1, 0, 0)
d_line = (1, 1, 1)
# (1+t) + t + t = 3
t_val = (3 - dot(n_plane, a_line)) / dot(n_plane, d_line)
hit = add(a_line, scale(t_val, d_line))
print(f"  t = {t_val:.4f}")
print(f"  Point: ({hit[0]:.4f}, {hit[1]:.4f}, {hit[2]:.4f})")
print(f"  Check: sum = {sum(hit):.4f}")

# Angle between two planes
print(f"\n=== Angle between planes ===")
n1 = (1, 0, 0)
n2 = (1, 1, 0)
cos_angle = abs(dot(n1, n2)) / (norm(n1) * norm(n2))
angle = math.degrees(math.acos(cos_angle))
print(f"  n1={n1}, n2={n2}")
print(f"  Angle = {angle:.1f}°")

# Skew lines: shortest distance
print(f"\n=== Shortest distance between skew lines ===")
a1, d1 = (1, 0, 0), (0, 1, 0)  # line along y-axis at x=1
a2, d2 = (0, 0, 1), (1, 0, 0)  # line along x-axis at z=1
cr = cross(d1, d2)
if norm(cr) > 1e-10:
    dist_skew = abs(dot(sub(a2, a1), cr)) / norm(cr)
    print(f"  d = {dist_skew:.4f}")
else:
    print("  Lines are parallel")
```

## Visualisation — Lines and planes in 3-D

A line in 3-D = point + direction. A plane = point + normal. Together
they form the geometry of every 3-D engine, every CAD package, and
every ray-traced renderer. The plot draws a line, a plane, and their
intersection point.

```python
# ── Visualising a 3-D line and plane ────────────────────────
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(1, 1, 1, projection="3d")

# A line: P(t) = a + t · d, with point a and direction d.
a = np.array([0.5, 0.5, -1.0])
d = np.array([1.0, 1.0, 2.0])
ts = np.linspace(-1.0, 1.5, 100)
line_points = a + np.outer(ts, d)
ax.plot(line_points[:, 0], line_points[:, 1], line_points[:, 2],
        color="tab:blue", lw=2, label="line  P(t) = a + t·d")
ax.scatter([a[0]], [a[1]], [a[2]], color="tab:blue", s=60, label="point a on line")
ax.quiver(a[0], a[1], a[2], d[0], d[1], d[2],
          color="tab:blue", lw=1.5, arrow_length_ratio=0.1, alpha=0.6)

# A plane: n · (x − p0) = 0, with normal n and point p0.
n_normal = np.array([1.0, -1.0, 1.0]) / np.sqrt(3)
p0 = np.array([0.5, 0.5, 0.5])
xs = np.linspace(-1, 2, 10); ys = np.linspace(-1, 2, 10)
X, Y = np.meshgrid(xs, ys)
# Solve n · ((x, y, z) − p0) = 0 for z.
Z = p0[2] + (n_normal[0] * (p0[0] - X) + n_normal[1] * (p0[1] - Y)) / n_normal[2]
ax.plot_surface(X, Y, Z, alpha=0.30, color="tab:orange",
                edgecolor="darkorange", lw=0.3)

# Intersection: solve n · (a + t d − p0) = 0 for t.
t_int = np.dot(n_normal, p0 - a) / np.dot(n_normal, d)
intersection = a + t_int * d
ax.scatter(*intersection, color="tab:red", s=200, marker="*", zorder=5,
           label=f"intersection at t = {t_int:.3f}")

# Normal vector at p0.
ax.quiver(p0[0], p0[1], p0[2], n_normal[0], n_normal[1], n_normal[2],
          color="tab:green", lw=1.5, arrow_length_ratio=0.2, label="plane normal n")

ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_zlabel("z")
ax.set_title("Line–plane intersection in 3-D\n"
             f"point a = {a.tolist()},  direction d = {d.tolist()}\n"
             f"plane through {p0.tolist()} with normal {n_normal.round(3).tolist()}")
ax.legend(loc="upper left", fontsize=8)

plt.tight_layout()
plt.show()

# Print the intersection arithmetic.
print(f"Line:  P(t) = a + t · d")
print(f"  a = {a.tolist()}")
print(f"  d = {d.tolist()}")
print(f"\nPlane: n · (x − p₀) = 0")
print(f"  p₀ = {p0.tolist()}")
print(f"  n  = {n_normal.round(3).tolist()}")
print(f"\nSolve n · (a + t · d − p₀) = 0  ⇒  t = n · (p₀ − a) / (n · d)")
print(f"  numerator   = n · (p₀ − a) = {np.dot(n_normal, p0 - a):+.4f}")
print(f"  denominator = n · d        = {np.dot(n_normal, d):+.4f}")
print(f"  t           = {t_int:+.4f}")
print(f"  intersection point = {intersection.round(4).tolist()}")
```

## Connection to CS / Games / AI

- **Ray tracing** — ray = line, surfaces = planes/triangles; intersection is line-plane
- **Collision detection** — distance from point to plane, line-plane intersection
- **Camera frustum** — 6 planes defining what the camera can see
- **3D modelling** — plane of symmetry, cutting planes, cross sections
- **Robotics** — workspace boundaries as planes, motion paths as 3D lines
- **Computer vision** — 3D reconstruction from multiple views uses line-plane geometry

## Check Your Understanding

1. **Pen & paper:** Find the equation of the plane through $(2, 1, -1)$, $(1, 0, 3)$, $(4, 2, 1)$.
2. **Pen & paper:** Find where the line $\mathbf{r} = (0,1,2) + t(1,-1,1)$ meets the plane $2x + y - z = 3$.
3. **Pen & paper:** Find the distance from $(3, 0, 0)$ to the plane $2x - y + 2z = 6$.
4. **Pen & paper:** Show that the lines $\mathbf{r} = (1,0,0) + s(0,1,0)$ and $\mathbf{r} = (0,0,1) + t(1,0,0)$ are skew (don't intersect).  Find the shortest distance between them.
