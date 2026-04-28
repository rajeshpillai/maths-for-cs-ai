# Conic Sections — Circles, Ellipses, Parabolas, Hyperbolas

## Intuition

Slice a cone with a plane at different angles and you get four distinct curves:
circles, ellipses, parabolas, and hyperbolas.  These shapes appear everywhere
— planetary orbits are ellipses, satellite dishes are parabolas, and hyperbolas
describe the shape of cooling towers and certain signal-processing curves.
Each conic can be defined purely by **distances** from fixed points and lines.

## Prerequisites

- Foundation 1, Lesson 8: Coordinate Geometry (distance formula, equations of lines)

## From First Principles

### Circle — constant distance from one point

A **circle** is the set of all points at distance $r$ from a centre $(h, k)$.

Using the distance formula:

$$(x - h)^2 + (y - k)^2 = r^2$$

**Pen & paper:** Centre $(2, -3)$, radius $5$.

$(x - 2)^2 + (y + 3)^2 = 25$

Expand: $x^2 - 4x + 4 + y^2 + 6y + 9 = 25$ → $x^2 + y^2 - 4x + 6y - 12 = 0$

### Ellipse — sum of distances from two points is constant

An **ellipse** has two fixed points called **foci** ($F_1$ and $F_2$).  For
every point $P$ on the ellipse:

$$|PF_1| + |PF_2| = 2a \quad \text{(constant)}$$

Standard form (centre at origin, major axis along $x$):

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \quad (a > b > 0)$$

where $c^2 = a^2 - b^2$ and foci are at $(\pm c, 0)$.

**Pen & paper:** $a = 5$, $b = 3$.  Then $c = \sqrt{25 - 9} = 4$.
Foci at $(\pm 4, 0)$.  Sum of distances from any point on the ellipse $= 2a = 10$.

### Parabola — equal distance from a point and a line

A **parabola** is the set of points equidistant from a fixed point (the
**focus**) and a fixed line (the **directrix**).

Standard form (vertex at origin, opening upward):

$$y = \frac{1}{4p}x^2$$

where $p$ is the distance from vertex to focus.  Focus at $(0, p)$, directrix
$y = -p$.

**Pen & paper:** $p = 2$.  Equation: $y = x^2/8$.  Focus $(0, 2)$, directrix $y = -2$.

Check: point $(4, 2)$.  Distance to focus $= \sqrt{16 + 0} = 4$.
Distance to directrix $= 2 - (-2) = 4$.  Equal — confirmed.

### Hyperbola — difference of distances from two points is constant

A **hyperbola** has two foci.  For every point $P$:

$$\bigl||PF_1| - |PF_2|\bigr| = 2a \quad \text{(constant)}$$

Standard form (centre at origin, opening left-right):

$$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$$

where $c^2 = a^2 + b^2$ and foci at $(\pm c, 0)$.

Asymptotes: $y = \pm (b/a) x$.

**Pen & paper:** $a = 3$, $b = 4$.  $c = \sqrt{9 + 16} = 5$.  Foci at $(\pm 5, 0)$.
Asymptotes: $y = \pm (4/3)x$.

### Eccentricity — one number to classify them all

$$e = \frac{c}{a}$$

| Conic | Eccentricity |
|-------|-------------|
| Circle | $e = 0$ (one centre, no foci offset) |
| Ellipse | $0 < e < 1$ |
| Parabola | $e = 1$ |
| Hyperbola | $e > 1$ |

The closer $e$ is to 0, the more circular.  Earth's orbit: $e \approx 0.017$.

### Visualisation — all four conics

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(10, 10))

# Circle
ax = axes[0, 0]
t = np.linspace(0, 2*np.pi, 300)
ax.plot(3*np.cos(t), 3*np.sin(t), 'b-', linewidth=2)
ax.plot(0, 0, 'ko', markersize=5)
ax.set_title('Circle: $x^2 + y^2 = 9$\n$e = 0$')
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.set_xlim(-5, 5)
ax.set_ylim(-5, 5)

# Ellipse
ax = axes[0, 1]
a, b = 5, 3
c_e = np.sqrt(a**2 - b**2)
ax.plot(a*np.cos(t), b*np.sin(t), 'r-', linewidth=2)
ax.plot([-c_e, c_e], [0, 0], 'ko', markersize=5)
ax.set_title(f'Ellipse: $x^2/25 + y^2/9 = 1$\n$e = {c_e/a:.2f}$')
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.set_xlim(-7, 7)
ax.set_ylim(-5, 5)

# Parabola
ax = axes[1, 0]
x_p = np.linspace(-6, 6, 300)
p = 2
y_p = x_p**2 / (4*p)
ax.plot(x_p, y_p, 'g-', linewidth=2)
ax.plot(0, p, 'ko', markersize=5, label='Focus')
ax.axhline(-p, color='gray', linestyle='--', label='Directrix')
ax.set_title(f'Parabola: $y = x^2/8$\n$e = 1$')
ax.set_xlim(-7, 7)
ax.set_ylim(-4, 8)
ax.legend(fontsize=8)
ax.grid(True, alpha=0.3)

# Hyperbola
ax = axes[1, 1]
a_h, b_h = 3, 4
c_h = np.sqrt(a_h**2 + b_h**2)
t_h = np.linspace(-1.5, 1.5, 300)
# Right branch
ax.plot(a_h*np.cosh(t_h), b_h*np.sinh(t_h), 'm-', linewidth=2)
# Left branch
ax.plot(-a_h*np.cosh(t_h), b_h*np.sinh(t_h), 'm-', linewidth=2)
# Asymptotes
x_a = np.linspace(-8, 8, 100)
ax.plot(x_a, (b_h/a_h)*x_a, 'k--', alpha=0.4)
ax.plot(x_a, -(b_h/a_h)*x_a, 'k--', alpha=0.4)
ax.plot([-c_h, c_h], [0, 0], 'ko', markersize=5)
ax.set_title(f'Hyperbola: $x^2/9 - y^2/16 = 1$\n$e = {c_h/a_h:.2f}$')
ax.set_aspect('equal')
ax.set_xlim(-10, 10)
ax.set_ylim(-8, 8)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Conic Sections ──────────────────────────────────────────
import math

# Circle: verify a point
print("=== Circle: (x-2)² + (y+3)² = 25 ===")
h, k, r = 2, -3, 5
# Point (5, 1) — distance from centre
d = math.sqrt((5-h)**2 + (1-k)**2)
print(f"  Point (5,1): distance from centre = {d:.1f}, r = {r} → {'on circle' if abs(d-r)<0.01 else 'not on circle'}")

# Ellipse: verify sum of distances
print(f"\n=== Ellipse: x²/25 + y²/9 = 1 ===")
a, b = 5, 3
c = math.sqrt(a**2 - b**2)
print(f"  a={a}, b={b}, c={c:.1f}, foci at (±{c:.1f}, 0)")
# Test point (3, 2.4) — is it on the ellipse?
x_t, y_t = 3, 2.4
print(f"  Test ({x_t},{y_t}): x²/25+y²/9 = {x_t**2/25 + y_t**2/9:.4f}")
d1 = math.sqrt((x_t - c)**2 + y_t**2)
d2 = math.sqrt((x_t + c)**2 + y_t**2)
print(f"  Sum of distances to foci = {d1 + d2:.4f}, 2a = {2*a}")

# Parabola: verify equal distance
print(f"\n=== Parabola: y = x²/8, focus (0,2), directrix y=-2 ===")
for x_val in [0, 2, 4, 6]:
    y_val = x_val**2 / 8
    d_focus = math.sqrt(x_val**2 + (y_val - 2)**2)
    d_directrix = y_val + 2
    print(f"  ({x_val},{y_val:.2f}): to focus={d_focus:.4f}, to directrix={d_directrix:.4f}")

# Hyperbola: verify difference of distances
print(f"\n=== Hyperbola: x²/9 - y²/16 = 1 ===")
a, b = 3, 4
c = math.sqrt(a**2 + b**2)
print(f"  a={a}, b={b}, c={c:.1f}, foci at (±{c:.1f}, 0)")
print(f"  Eccentricity e = c/a = {c/a:.4f}")
# Point on hyperbola: x=5 → y²=16(25/9-1)=16·16/9 → y=16/3
x_t = 5
y_t = 4 * math.sqrt(x_t**2/9 - 1)
d1 = math.sqrt((x_t - c)**2 + y_t**2)
d2 = math.sqrt((x_t + c)**2 + y_t**2)
print(f"  Point ({x_t},{y_t:.3f}): |d1-d2| = {abs(d1-d2):.4f}, 2a = {2*a}")
```

## Connection to CS / Games / AI / Business / Industry

- **Orbital mechanics** — Kepler's first law: planets follow elliptical orbits;
  game simulations of space use the conic equations directly
- **Parabolic reflectors** — satellite dishes, headlight reflectors, and
  microphone dishes use the parabola's reflective property (all rays reflect to the focus)
- **Collision detection** — testing whether a ray intersects an ellipse or
  hyperbola is a core operation in ray tracing
- **GPS positioning** — each satellite defines a hyperbola of possible
  positions; the intersection of multiple hyperbolas gives your location
- **Quadric surfaces** — 3D extensions of conics (ellipsoids, paraboloids)
  appear in physics simulations and 3D modelling

## Check Your Understanding

1. **Pen & paper:** Find the equation of a circle with centre $(-1, 4)$ passing through $(2, 0)$.
2. **Pen & paper:** An ellipse has foci at $(0, \pm 3)$ and $a = 5$.  Write the equation and find $b$.
3. **Pen & paper:** For the parabola $x^2 = 12y$, find the focus and directrix.
4. **Pen & paper:** A hyperbola has $a = 2$, $b = 5$.  Find its eccentricity and asymptotes.
