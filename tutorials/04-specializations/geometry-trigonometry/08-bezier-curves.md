# Bézier Curves and Splines — From Polynomial Interpolation

## Intuition

Bézier curves create smooth, controllable shapes from a few **control points**.
Drag a handle in a vector graphics editor, and you're manipulating a Bézier
curve.  They're used for fonts, animation easing, roads in games, and
anywhere you need a smooth path defined by a few parameters.

## Prerequisites

- Tier 3, Lesson 9: Taylor Series (polynomials)
- Tier 1, Lesson 4: Combinatorics (binomial coefficients)

## From First Principles

### Linear interpolation (lerp)

Between two points $P_0$ and $P_1$:

$$B(t) = (1-t)P_0 + tP_1, \quad t \in [0, 1]$$

At $t=0$: $P_0$.  At $t=1$: $P_1$.  At $t=0.5$: midpoint.

### Quadratic Bézier (3 control points)

$$B(t) = (1-t)^2 P_0 + 2t(1-t)P_1 + t^2 P_2$$

$P_1$ is the "handle" that pulls the curve.  The curve doesn't pass through $P_1$.

### Pen & paper: Quadratic Bézier

$P_0 = (0, 0)$, $P_1 = (1, 2)$, $P_2 = (2, 0)$.

At $t = 0.5$:

$B(0.5) = 0.25(0,0) + 0.5(1,2) + 0.25(2,0) = (0, 0) + (0.5, 1) + (0.5, 0) = (1, 1)$

### Cubic Bézier (4 control points) — the most common

$$B(t) = (1-t)^3 P_0 + 3t(1-t)^2 P_1 + 3t^2(1-t) P_2 + t^3 P_3$$

The curve passes through $P_0$ and $P_3$ (endpoints) but only approaches $P_1$ and $P_2$ (handles).

### General Bézier (degree $n$)

$$B(t) = \sum_{i=0}^{n} \binom{n}{i} t^i (1-t)^{n-i} P_i$$

The coefficients $\binom{n}{i} t^i (1-t)^{n-i}$ are **Bernstein polynomials**.

### De Casteljau's algorithm (pen & paper friendly)

Evaluate a Bézier curve by **repeated linear interpolation**:

For cubic at $t = 0.5$:

Level 0: $P_0, P_1, P_2, P_3$

Level 1: $Q_0 = \text{lerp}(P_0, P_1, 0.5)$, $Q_1 = \text{lerp}(P_1, P_2, 0.5)$, $Q_2 = \text{lerp}(P_2, P_3, 0.5)$

Level 2: $R_0 = \text{lerp}(Q_0, Q_1, 0.5)$, $R_1 = \text{lerp}(Q_1, Q_2, 0.5)$

Level 3: $B = \text{lerp}(R_0, R_1, 0.5)$ — the point on the curve.

### CSS easing functions

`cubic-bezier(0.42, 0, 0.58, 1)` = ease-in-out: start slow, speed up, slow down.

The control points define how $t$ maps to progress.

## Python Verification

```python
# ── Bézier Curves ───────────────────────────────────────────

def lerp(a, b, t):
    return tuple(a_i*(1-t) + b_i*t for a_i, b_i in zip(a, b))

# Quadratic Bézier
print("=== Quadratic Bézier ===")
P0, P1, P2 = (0, 0), (1, 2), (2, 0)
for t_int in range(11):
    t = t_int / 10
    x = (1-t)**2*P0[0] + 2*t*(1-t)*P1[0] + t**2*P2[0]
    y = (1-t)**2*P0[1] + 2*t*(1-t)*P1[1] + t**2*P2[1]
    bar = ' ' * int(y * 10) + '*'
    print(f"  t={t:.1f}: ({x:.2f}, {y:.2f}) {bar}")

# Cubic Bézier
print(f"\n=== Cubic Bézier ===")
P0, P1, P2, P3 = (0,0), (0,1), (1,1), (1,0)
for t_int in range(11):
    t = t_int / 10
    x = (1-t)**3*P0[0] + 3*t*(1-t)**2*P1[0] + 3*t**2*(1-t)*P2[0] + t**3*P3[0]
    y = (1-t)**3*P0[1] + 3*t*(1-t)**2*P1[1] + 3*t**2*(1-t)*P2[1] + t**3*P3[1]
    print(f"  t={t:.1f}: ({x:.3f}, {y:.3f})")

# De Casteljau's algorithm
print(f"\n=== De Casteljau at t=0.5 ===")
points = [(0,0), (0,1), (1,1), (1,0)]
t = 0.5
level = list(points)
step = 0
while len(level) > 1:
    print(f"  Level {step}: {[f'({p[0]:.3f},{p[1]:.3f})' for p in level]}")
    level = [lerp(level[i], level[i+1], t) for i in range(len(level)-1)]
    step += 1
print(f"  Result: ({level[0][0]:.3f}, {level[0][1]:.3f})")
```

## Visualisation — Bézier curves and de Casteljau's algorithm

A Bézier curve is defined by a set of **control points**; the curve
*starts at the first*, *ends at the last*, and is gently pulled
toward the others. The plot draws several curves of different
degrees, then visualises **de Casteljau's algorithm** — repeated
linear interpolation that traces out the curve point by point.

```python
# ── Visualising Bézier curves and de Casteljau ──────────────
import numpy as np
import matplotlib.pyplot as plt
from math import comb

def bezier(points, t):
    """Direct Bernstein-polynomial evaluation."""
    n = len(points) - 1
    pts = np.asarray(points, dtype=float)
    out = np.zeros(2)
    for i in range(n + 1):
        out += comb(n, i) * (1 - t) ** (n - i) * t ** i * pts[i]
    return out

def de_casteljau_levels(points, t):
    """Return the list of intermediate point arrays (the 'pyramid')."""
    levels = [np.asarray(points, dtype=float)]
    while len(levels[-1]) > 1:
        prev = levels[-1]
        nxt = (1 - t) * prev[:-1] + t * prev[1:]
        levels.append(nxt)
    return levels

fig, axes = plt.subplots(1, 3, figsize=(16, 5.2))

# (1) Linear, quadratic, cubic Béziers from the same start and end points.
ax = axes[0]
linear   = [(0, 0), (3, 2)]
quadratic = [(0, 0), (1, 3), (3, 2)]
cubic    = [(0, 0), (1, 3), (2, -1), (3, 2)]
ts = np.linspace(0, 1, 100)
for pts, label, color in [(linear,    "linear (n=1)",    "tab:red"),
                          (quadratic, "quadratic (n=2)", "tab:orange"),
                          (cubic,     "cubic (n=3)",     "tab:green")]:
    curve = np.array([bezier(pts, t) for t in ts])
    ax.plot(curve[:, 0], curve[:, 1], lw=2, color=color, label=label)
    pts_arr = np.array(pts)
    ax.plot(pts_arr[:, 0], pts_arr[:, 1], "o--", color=color, alpha=0.4,
            markersize=6, lw=1)
ax.set_title("Bézier curves of degrees 1, 2, 3\n(dashed = control polygon)")
ax.set_xlim(-0.5, 4); ax.set_ylim(-2, 4); ax.set_aspect("equal")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) De Casteljau's algorithm at t = 0.5 — repeatedly take midpoints.
ax = axes[1]
control = [(0, 0), (1, 3), (3, 3), (4, 0)]
control_arr = np.array(control)
ax.plot(control_arr[:, 0], control_arr[:, 1], "o--", color="tab:blue",
        markersize=10, lw=1, label="control points")
# Full curve.
ts_full = np.linspace(0, 1, 200)
curve = np.array([bezier(control, t) for t in ts_full])
ax.plot(curve[:, 0], curve[:, 1], color="tab:blue", lw=2)
# Highlight de Casteljau pyramid at t = 0.5.
levels = de_casteljau_levels(control, 0.5)
colors = ["tab:red", "tab:orange", "tab:green", "tab:purple"]
for i, level in enumerate(levels[1:], start=1):                # skip the original points
    pts = np.array(level)
    if len(pts) > 1:
        ax.plot(pts[:, 0], pts[:, 1], "o-", color=colors[i],
                markersize=8, lw=1.5, label=f"step {i}")
    else:
        ax.scatter(pts[:, 0], pts[:, 1], color="black", s=200, marker="X",
                   zorder=10, label=f"final point at t=0.5")
ax.set_title("de Casteljau at t = 0.5\n(repeated midpoints → curve point)")
ax.set_xlim(-0.5, 4.5); ax.set_ylim(-0.5, 3.5); ax.set_aspect("equal")
ax.legend(loc="lower right", fontsize=9); ax.grid(True, alpha=0.3)

# (3) Effect of moving a control point: same curve, shifted middle handle.
ax = axes[2]
base = np.array([(0, 0), (1, 2), (3, 2), (4, 0)], dtype=float)
for shift, color in zip([-2, 0, 2], ["tab:red", "tab:blue", "tab:green"]):
    moved = base.copy()
    moved[1, 1] += shift          # only move the second control point's y
    moved[2, 1] += shift
    curve = np.array([bezier(moved, t) for t in ts_full])
    ax.plot(curve[:, 0], curve[:, 1], color=color, lw=2,
            label=f"middle handles y += {shift}")
    ax.plot(moved[:, 0], moved[:, 1], "o--", color=color, alpha=0.3, lw=0.8)
ax.set_title("Moving control points → curve bends with them\n(this is exactly the pen tool in Illustrator)")
ax.set_xlim(-0.5, 4.5); ax.set_ylim(-1.5, 4.5); ax.set_aspect("equal")
ax.legend(fontsize=9); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print intermediate values from de Casteljau on the cubic.
print("De Casteljau pyramid for the cubic at t = 0.5:")
for i, level in enumerate(levels):
    pts = [tuple(np.round(p, 3)) for p in level]
    print(f"  level {i}: {pts}")
```

**Three things the plots make obvious:**

- **Higher degree = more flexibility.** Linear is a straight line;
  quadratic adds one bend; cubic gives you S-curves. *Most graphics
  systems use cubic Béziers* — they're the sweet spot of expressive
  power vs control complexity. SVG, PostScript, TrueType fonts, and
  Adobe Illustrator all draw cubic Béziers.
- **De Casteljau is the simplest possible algorithm.** Repeated linear
  interpolation between consecutive control points produces the curve
  point by point. It's also numerically stable and easy to subdivide
  for high-quality rendering.
- **Designers manipulate Béziers visually.** Drag a control point in
  Illustrator or Figma — you're moving one of the dashed dots in the
  rightmost plot, and the curve bends to follow. CSS animations'
  `cubic-bezier(x1, y1, x2, y2)` timing function is *exactly* a cubic
  Bézier with two of the four control points fixed at $(0, 0)$ and
  $(1, 1)$, and the curve interpreted as time-vs-progress.

## Connection to CS / Games / AI / Business / Industry

- **Vector graphics** — SVG paths, Adobe Illustrator, font outlines (TrueType)
- **CSS animations** — `transition-timing-function: cubic-bezier(...)`
- **Game paths** — camera rails, NPC movement paths, road geometry
- **Animation curves** — Unity/Unreal animation editors use Bézier curves for easing
- **CAD/CAM** — B-splines and NURBS (extensions of Bézier) for industrial design

## Check Your Understanding

1. **Pen & paper:** Evaluate the quadratic Bézier with $P_0=(0,0), P_1=(2,4), P_2=(4,0)$ at $t=0.25$.
2. **Pen & paper:** Use De Casteljau's algorithm to evaluate the cubic Bézier $P_0=(0,0), P_1=(1,3), P_2=(3,3), P_3=(4,0)$ at $t=0.5$.
3. **Think about it:** Why does the curve always start at $P_0$ and end at $P_n$?
