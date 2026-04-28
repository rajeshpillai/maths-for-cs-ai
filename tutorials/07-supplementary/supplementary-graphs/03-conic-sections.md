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

## Visualisation — The four conic sections

Slice a cone with a plane at different angles and you get **circle**,
**ellipse**, **parabola**, or **hyperbola**. The plot draws each in
its standard form so the family resemblance is unmistakable.

```python
# ── Visualising conic sections ──────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 4, figsize=(16, 4.8))
theta = np.linspace(0, 2 * np.pi, 400)

# (1) Circle: x² + y² = r².
ax = axes[0]
r = 2
ax.plot(r * np.cos(theta), r * np.sin(theta), color="tab:blue", lw=2)
ax.scatter([0], [0], color="tab:red", s=80, zorder=5, label="centre")
ax.set_title(f"Circle: $x^2 + y^2 = {r**2}$\n(eccentricity e = 0)")
ax.set_xlim(-3.5, 3.5); ax.set_ylim(-3.5, 3.5); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.grid(True, alpha=0.3); ax.legend(fontsize=8)

# (2) Ellipse: (x/a)² + (y/b)² = 1.
ax = axes[1]
a, b = 3, 2
ax.plot(a * np.cos(theta), b * np.sin(theta), color="tab:orange", lw=2)
c = np.sqrt(a*a - b*b)
ax.scatter([-c, c], [0, 0], color="tab:red", s=80, zorder=5, label=f"foci (±{c:.2f}, 0)")
ax.set_title(f"Ellipse: $x^2/{a**2} + y^2/{b**2} = 1$\n(0 < e < 1)")
ax.set_xlim(-4, 4); ax.set_ylim(-3, 3); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.grid(True, alpha=0.3); ax.legend(fontsize=8)

# (3) Parabola: y² = 4px (or y = x²/4p).
ax = axes[2]
p = 1
xs = np.linspace(0, 4, 200)
ax.plot(xs,  np.sqrt(4 * p * xs), color="tab:green", lw=2)
ax.plot(xs, -np.sqrt(4 * p * xs), color="tab:green", lw=2)
ax.scatter([p], [0], color="tab:red", s=80, zorder=5, label=f"focus ({p}, 0)")
ax.axvline(-p, color="tab:purple", lw=1.5, linestyle="--", label=f"directrix x = {-p}")
ax.set_title(f"Parabola: $y^2 = 4·{p}·x$\n(eccentricity e = 1)")
ax.set_xlim(-2, 5); ax.set_ylim(-4, 4); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.grid(True, alpha=0.3); ax.legend(fontsize=8)

# (4) Hyperbola: (x/a)² − (y/b)² = 1.
ax = axes[3]
a, b = 2, 3
xs_pos = np.linspace(a, 6, 200); xs_neg = np.linspace(-6, -a, 200)
ax.plot(xs_pos,  b * np.sqrt(xs_pos**2 / a**2 - 1), color="tab:purple", lw=2)
ax.plot(xs_pos, -b * np.sqrt(xs_pos**2 / a**2 - 1), color="tab:purple", lw=2)
ax.plot(xs_neg,  b * np.sqrt(xs_neg**2 / a**2 - 1), color="tab:purple", lw=2)
ax.plot(xs_neg, -b * np.sqrt(xs_neg**2 / a**2 - 1), color="tab:purple", lw=2)
# Asymptotes y = ±(b/a) x.
asym_x = np.linspace(-6, 6, 100)
ax.plot(asym_x,  (b / a) * asym_x, color="grey", lw=1, linestyle="--")
ax.plot(asym_x, -(b / a) * asym_x, color="grey", lw=1, linestyle="--")
c = np.sqrt(a * a + b * b)
ax.scatter([-c, c], [0, 0], color="tab:red", s=80, zorder=5, label=f"foci")
ax.set_title(f"Hyperbola: $x^2/{a**2} − y^2/{b**2} = 1$\n(e > 1, asymptotes ±b/a)")
ax.set_xlim(-6, 6); ax.set_ylim(-6, 6); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.grid(True, alpha=0.3); ax.legend(fontsize=8)

plt.tight_layout()
plt.show()

# Eccentricity classification.
print("All four conics are described by a single number — the eccentricity e:")
print("  e = 0  →  circle")
print("  0 < e < 1  →  ellipse  (planetary orbits, e_Earth ≈ 0.0167)")
print("  e = 1  →  parabola  (projectile paths, satellite dishes)")
print("  e > 1  →  hyperbola  (Kepler's escape trajectories)")
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
