# Conic Sections — Parabola, Ellipse, Hyperbola

## Intuition

Slice a cone at different angles and you get different curves: a **circle**
(horizontal cut), **ellipse** (tilted cut), **parabola** (parallel to the
side), and **hyperbola** (steep cut through both cones).  These shapes appear
in satellite orbits, antenna design, projectile paths, and hyperbolic
embeddings in ML.

## Prerequisites

- Supplementary, Lesson 1: Linear, Quadratic, Cubic

## From First Principles

### Parabola: $y = ax^2$ (or $x = ay^2$)

Every point is equidistant from a fixed point (**focus**) and a line (**directrix**).

**Standard form:** $y = \frac{1}{4p}x^2$ where $p$ = distance from vertex to focus.

**Pen & paper:** $y = x^2/4$ → $4p = 4$ → $p = 1$.

Focus: $(0, 1)$.  Directrix: $y = -1$.

**Verify:** Point $(2, 1)$: distance to focus = $\sqrt{4 + 0} = 2$.  Distance to directrix = $1 - (-1) = 2$. ✓

### Ellipse: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$

A stretched circle.  $a$ = semi-major axis, $b$ = semi-minor axis.

**Eccentricity:** $e = \frac{c}{a}$ where $c = \sqrt{a^2 - b^2}$.  $e = 0$: circle.  $e \to 1$: very elongated.

**Pen & paper:** $\frac{x^2}{25} + \frac{y^2}{9} = 1$

$a = 5, b = 3, c = \sqrt{25-9} = 4$.  Foci at $(\pm 4, 0)$.  $e = 4/5 = 0.8$.

Key property: sum of distances from any point to the two foci is constant ($= 2a = 10$).

### Hyperbola: $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$

Two separate curves approaching **asymptotes** $y = \pm\frac{b}{a}x$.

**Pen & paper:** $\frac{x^2}{4} - \frac{y^2}{9} = 1$

$a = 2, b = 3$.  Asymptotes: $y = \pm\frac{3}{2}x$.  Vertices at $(\pm 2, 0)$.

Key property: difference of distances from any point to the two foci is constant ($= 2a$).

### Summary

| Conic | Equation | Eccentricity | Shape |
|-------|----------|-------------|-------|
| Circle | $x^2 + y^2 = r^2$ | $e = 0$ | Perfect round |
| Ellipse | $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ | $0 < e < 1$ | Oval |
| Parabola | $y = ax^2$ | $e = 1$ | U-shape, open |
| Hyperbola | $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ | $e > 1$ | Two branches |

## Python Verification

```python
# ── Conic Sections ──────────────────────────────────────────
import math

# Parabola: y = x²/4, focus at (0,1)
print("=== Parabola: y = x²/4 ===")
print(f"  Focus: (0, 1), Directrix: y = -1")
for x in [-4, -2, 0, 2, 4]:
    y = x**2 / 4
    d_focus = math.sqrt(x**2 + (y-1)**2)
    d_directrix = y + 1
    print(f"  ({x}, {y:.1f}): to focus={d_focus:.3f}, to directrix={d_directrix:.3f}")

# Ellipse: x²/25 + y²/9 = 1
print(f"\n=== Ellipse: x²/25 + y²/9 = 1 ===")
a, b = 5, 3
c = math.sqrt(a**2 - b**2)
e = c / a
print(f"  a={a}, b={b}, c={c:.1f}, e={e:.2f}")
print(f"  Foci: (±{c:.1f}, 0)")

# Verify: sum of distances to foci = 2a
for theta_deg in [0, 45, 90]:
    theta = math.radians(theta_deg)
    x = a * math.cos(theta)
    y = b * math.sin(theta)
    d1 = math.sqrt((x-c)**2 + y**2)
    d2 = math.sqrt((x+c)**2 + y**2)
    print(f"  θ={theta_deg}°: ({x:.2f},{y:.2f}), d1+d2 = {d1+d2:.4f} (should be {2*a})")

# Hyperbola: x²/4 - y²/9 = 1
print(f"\n=== Hyperbola: x²/4 - y²/9 = 1 ===")
a, b = 2, 3
print(f"  Asymptotes: y = ±{b/a:.1f}x")
print(f"  Vertices: (±{a}, 0)")

# Points on the hyperbola
for x in [2, 3, 5, 10]:
    y_sq = 9 * (x**2/4 - 1)
    if y_sq >= 0:
        y = math.sqrt(y_sq)
        print(f"  x={x}: y=±{y:.2f}")
```

## Connection to CS / Games / AI

- **Parabola** — projectile paths, satellite dish shape (focuses signals), quadratic loss curves
- **Ellipse** — planetary orbits (Kepler), collision shapes in games
- **Hyperbola** — GPS triangulation, hyperbolic geometry in ML embeddings (Poincaré embeddings)
- **Conic detection** — computer vision: detecting ellipses in images (e.g., eyes, wheels)

## Check Your Understanding

1. **Pen & paper:** Find the focus of $y = 2x^2$.
2. **Pen & paper:** An ellipse has $a = 4, b = 3$. Find the eccentricity and foci.
3. **Pen & paper:** Find the asymptotes of $\frac{x^2}{9} - \frac{y^2}{16} = 1$.
