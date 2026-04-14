# Coordinate Geometry — Lines, Circles, Distance, Midpoint

## Intuition

Coordinate geometry bridges algebra and geometry — describe shapes with
equations, and solve geometric problems with algebra.  "Find where two lines
cross" = solve simultaneous equations.  "Is this point inside the circle?" =
check an inequality.

## Prerequisites

- Supplementary Foundations, Lesson 2: Algebraic Manipulation
- Tier 8, Lesson 3: Distance Formula

## From First Principles

### Equation of a straight line

$$y = mx + c \quad \text{or} \quad y - y_1 = m(x - x_1)$$

**Gradient (slope):** $m = \frac{y_2 - y_1}{x_2 - x_1}$

**Pen & paper:** Line through $(1, 3)$ and $(4, 9)$:

$m = \frac{9 - 3}{4 - 1} = 2$

$y - 3 = 2(x - 1)$ → $y = 2x + 1$

### Parallel and perpendicular lines

- **Parallel:** same gradient: $m_1 = m_2$
- **Perpendicular:** $m_1 \times m_2 = -1$ (negative reciprocal)

**Pen & paper:** Line perpendicular to $y = 3x + 1$ through $(6, 2)$:

$m = -1/3$.  $y - 2 = -\frac{1}{3}(x - 6)$ → $y = -\frac{1}{3}x + 4$

### Midpoint

$$M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$$

**Pen & paper:** Midpoint of $(2, 5)$ and $(8, 1)$: $M = (5, 3)$.

### Distance between two points

$$d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$

### Equation of a circle

Centre $(a, b)$, radius $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

**Pen & paper:** Circle centre $(3, -2)$, radius 5:

$(x-3)^2 + (y+2)^2 = 25$

**Converting from expanded form:** $x^2 + y^2 - 6x + 4y - 12 = 0$

Complete the square: $(x-3)^2 - 9 + (y+2)^2 - 4 - 12 = 0$

$(x-3)^2 + (y+2)^2 = 25$. Centre $(3, -2)$, radius 5.

### Line meets circle (intersection)

Substitute the line equation into the circle equation → quadratic.

- 2 solutions: line crosses circle (secant)
- 1 solution: line touches circle (tangent)
- 0 solutions: line misses circle

**Pen & paper:** Line $y = x + 1$, circle $x^2 + y^2 = 5$.

$x^2 + (x+1)^2 = 5$ → $2x^2 + 2x - 4 = 0$ → $x^2 + x - 2 = 0$

$(x+2)(x-1) = 0$ → $x = -2, 1$ → points $(-2, -1)$ and $(1, 2)$.

## Python Verification

```python
# ── Coordinate Geometry ─────────────────────────────────────
import math

# Line through two points
print("=== Line through (1,3) and (4,9) ===")
x1, y1, x2, y2 = 1, 3, 4, 9
m = (y2 - y1) / (x2 - x1)
c = y1 - m * x1
print(f"m = {m:.0f}, c = {c:.0f}")
print(f"y = {m:.0f}x + {c:.0f}")

# Midpoint
print(f"\n=== Midpoint of (2,5) and (8,1) ===")
mx, my = (2+8)/2, (5+1)/2
print(f"M = ({mx:.0f}, {my:.0f})")

# Distance
print(f"\n=== Distance from (2,5) to (8,1) ===")
d = math.sqrt((8-2)**2 + (1-5)**2)
print(f"d = {d:.4f}")

# Perpendicular line
print(f"\n=== Perpendicular to y=3x+1 through (6,2) ===")
m_perp = -1/3
c_perp = 2 - m_perp * 6
print(f"m = {m_perp:.4f}, y = {m_perp:.4f}x + {c_perp:.4f}")

# Circle from expanded form
print(f"\n=== Circle: x²+y²-6x+4y-12=0 ===")
# Complete the square
# (x-3)² + (y+2)² = 9 + 4 + 12 = 25
print(f"Centre: (3, -2), Radius: {math.sqrt(25):.0f}")

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
```

## Connection to CS / Games / AI

- **Collision detection** — line-circle intersection = ray vs circular hitbox
- **Computer graphics** — line clipping algorithms use these formulas
- **Pathfinding** — distance and midpoint calculations for navigation
- **Regression** — line of best fit through data points

## Check Your Understanding

1. **Pen & paper:** Find the equation of the line through $(-1, 4)$ and $(3, -2)$.
2. **Pen & paper:** Find the centre and radius of $x^2 + y^2 + 8x - 6y = 0$.
3. **Pen & paper:** Does the line $y = 2x - 3$ intersect the circle $(x-1)^2 + (y-1)^2 = 4$? Find any intersection points.
