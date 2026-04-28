# Coordinate Geometry — Circles

## Intuition

A circle is the set of all points at a fixed distance (radius) from a centre.
In coordinate geometry we express this with an equation, and then use algebra
to answer geometric questions: "Where does this line hit the circle?" becomes
"Solve a quadratic."  This is exactly how ray-circle intersection works in
game engines and raycasters.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation (completing the square)
- Foundation 2, Lesson 1: The Cartesian Plane

## From First Principles

### Equation of a circle

A point $(x, y)$ lies on a circle with centre $(a, b)$ and radius $r$ if and
only if its distance from the centre equals $r$.  By the distance formula:

$$\sqrt{(x - a)^2 + (y - b)^2} = r$$

Square both sides:

$$(x - a)^2 + (y - b)^2 = r^2$$

This is the **standard form** of a circle equation.

**Pen & paper:** Circle with centre $(3, -2)$, radius 5:

$(x - 3)^2 + (y + 2)^2 = 25$

**Special case:** Circle centred at the origin: $x^2 + y^2 = r^2$.

### Converting from expanded (general) form

The general form is $x^2 + y^2 + Dx + Ey + F = 0$.  To find the centre and
radius, **complete the square** in both $x$ and $y$.

**Pen & paper:** $x^2 + y^2 - 6x + 4y - 12 = 0$

**Step 1:** Group $x$ and $y$ terms:

$(x^2 - 6x) + (y^2 + 4y) = 12$

**Step 2:** Complete the square for each:

$(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4$

$(x - 3)^2 + (y + 2)^2 = 25$

**Result:** Centre $(3, -2)$, radius $\sqrt{25} = 5$.

**Pen & paper:** $x^2 + y^2 + 8x - 6y = 0$

$(x^2 + 8x + 16) + (y^2 - 6y + 9) = 16 + 9$

$(x + 4)^2 + (y - 3)^2 = 25$

Centre $(-4, 3)$, radius 5.

### Tangent to a circle

A tangent touches the circle at exactly one point and is **perpendicular** to
the radius at that point.

**Pen & paper:** Find the tangent to $x^2 + y^2 = 25$ at the point $(3, 4)$.

Radius from origin to $(3, 4)$ has gradient $4/3$.

Tangent is perpendicular: gradient $= -3/4$.

$y - 4 = -\frac{3}{4}(x - 3)$ → $y = -\frac{3}{4}x + \frac{25}{4}$

### Line meets circle — intersection

Substitute the line equation into the circle equation to get a quadratic.

- **2 real solutions** → line crosses circle (secant — two intersection points)
- **1 repeated solution** → line touches circle (tangent)
- **No real solutions** → line misses circle

**Pen & paper:** Line $y = x + 1$, circle $x^2 + y^2 = 5$.

Substitute $y = x + 1$:

$x^2 + (x + 1)^2 = 5$

$x^2 + x^2 + 2x + 1 = 5$

$2x^2 + 2x - 4 = 0$

$x^2 + x - 2 = 0$

$(x + 2)(x - 1) = 0$

$x = -2$ → $y = -1$, and $x = 1$ → $y = 2$.

Intersection points: $(-2, -1)$ and $(1, 2)$.

**Pen & paper:** Does $y = x + 4$ intersect $x^2 + y^2 = 5$?

$x^2 + (x + 4)^2 = 5$ → $2x^2 + 8x + 16 = 5$ → $2x^2 + 8x + 11 = 0$

Discriminant: $64 - 88 = -24 < 0$.  No real solutions — the line misses.

### Using the discriminant

For line $y = mx + c$ and circle $x^2 + y^2 = r^2$:

Substituting gives $(1 + m^2)x^2 + 2mcx + (c^2 - r^2) = 0$.

The discriminant $\Delta = 4m^2c^2 - 4(1+m^2)(c^2-r^2)$ determines:
- $\Delta > 0$: two intersections (secant)
- $\Delta = 0$: tangent
- $\Delta < 0$: no intersection

## Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 1, figsize=(8, 8))

# Draw circle x² + y² = 5
theta = np.linspace(0, 2*np.pi, 200)
r = np.sqrt(5)
ax.plot(r*np.cos(theta), r*np.sin(theta), 'b-', linewidth=2,
        label='$x^2 + y^2 = 5$')

# Draw line y = x + 1 (secant)
x_line = np.linspace(-3, 3, 100)
ax.plot(x_line, x_line + 1, 'r-', linewidth=2, label='$y = x + 1$ (secant)')

# Draw line y = x + 4 (misses)
ax.plot(x_line, x_line + 4, 'g--', linewidth=1.5, label='$y = x + 4$ (misses)')

# Mark intersection points
ax.plot(-2, -1, 'ro', markersize=10, zorder=5)
ax.annotate('(-2, -1)', (-2, -1), (-2.5, -1.8), fontsize=10)
ax.plot(1, 2, 'ro', markersize=10, zorder=5)
ax.annotate('(1, 2)', (1, 2), (1.3, 2.3), fontsize=10)

# Mark centre
ax.plot(0, 0, 'k+', markersize=12, markeredgewidth=2)

ax.set_xlim(-4, 4)
ax.set_ylim(-4, 6)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.legend(fontsize=11)
ax.set_title('Circle with secant and non-intersecting line')
plt.tight_layout()
plt.savefig('circle_line_intersection.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Coordinate Geometry: Circles ───────────────────────────────
import math

# Circle from expanded form
print("=== Circle: x²+y²-6x+4y-12=0 ===")
# Complete the square
# (x-3)² + (y+2)² = 9 + 4 + 12 = 25
print(f"Centre: (3, -2), Radius: {math.sqrt(25):.0f}")

# Verify a point on the circle
x, y = 3 + 5, -2  # (8, -2) should be on it
print(f"Point (8,-2): (8-3)²+(-2+2)² = {(8-3)**2 + (-2+2)**2} (should be 25)")

# Line meets circle
print(f"\n=== Line y=x+1 meets x²+y²=5 ===")
# x² + (x+1)² = 5 → 2x²+2x-4=0 → x²+x-2=0
a, b, c = 1, 1, -2
disc = b**2 - 4*a*c
x1 = (-b + math.sqrt(disc)) / (2*a)
x2 = (-b - math.sqrt(disc)) / (2*a)
print(f"x = {x1:.0f} → ({x1:.0f}, {x1+1:.0f})")
print(f"x = {x2:.0f} → ({x2:.0f}, {x2+1:.0f})")

# Verify on circle
for x in [x1, x2]:
    y = x + 1
    print(f"  ({x:.0f},{y:.0f}): x²+y² = {x**2 + y**2:.0f} (should be 5)")

# Line misses circle
print(f"\n=== Line y=x+4 vs x²+y²=5 ===")
a, b, c = 2, 8, 11
disc = b**2 - 4*a*c
print(f"Discriminant = {disc} < 0 → no intersection")

# Tangent at (3,4) to x²+y²=25
print(f"\n=== Tangent to x²+y²=25 at (3,4) ===")
# Gradient of radius = 4/3, tangent gradient = -3/4
m_tangent = -3/4
c_tangent = 4 - m_tangent * 3
print(f"Tangent: y = {m_tangent}x + {c_tangent}")
# Verify (3,4) is on the tangent line
print(f"Check (3,4): y = {m_tangent*3 + c_tangent} (should be 4)")
# Verify tangent touches circle (discriminant = 0)
# x² + (-3/4 x + 25/4)² = 25
# Expand and check discriminant
a_q = 1 + (3/4)**2  # = 25/16
b_q = 2 * (-3/4) * (25/4)  # = -75/8
c_q = (25/4)**2 - 25  # = 625/16 - 400/16 = 225/16
disc_t = b_q**2 - 4*a_q*c_q
print(f"Tangent discriminant = {disc_t:.6f} (should be 0)")
```

## Connection to CS / Games / AI / Business / Industry

- **Collision detection** — line-circle intersection = projectile vs circular hitbox
- **Ray casting** — ray-sphere intersection in 3D is the same algebra (with an extra dimension)
- **Bounding circles** — fast overlap test: distance between centres < sum of radii
- **Regression** — fitting a circle to data points (least squares with circle equation)
- **Signal processing** — the unit circle in the complex plane underlies the z-transform

## Check Your Understanding

1. **Pen & paper:** Find the centre and radius of $x^2 + y^2 + 8x - 6y = 0$.
2. **Pen & paper:** Does the line $y = 2x - 3$ intersect the circle $(x-1)^2 + (y-1)^2 = 4$?  Find any intersection points.
3. **Pen & paper:** Find the equation of the tangent to $(x-2)^2 + (y+1)^2 = 10$ at the point $(5, 0)$.
