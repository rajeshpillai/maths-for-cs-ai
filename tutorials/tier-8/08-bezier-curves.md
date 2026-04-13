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

## Connection to CS / Games / AI

- **Vector graphics** — SVG paths, Adobe Illustrator, font outlines (TrueType)
- **CSS animations** — `transition-timing-function: cubic-bezier(...)`
- **Game paths** — camera rails, NPC movement paths, road geometry
- **Animation curves** — Unity/Unreal animation editors use Bézier curves for easing
- **CAD/CAM** — B-splines and NURBS (extensions of Bézier) for industrial design

## Check Your Understanding

1. **Pen & paper:** Evaluate the quadratic Bézier with $P_0=(0,0), P_1=(2,4), P_2=(4,0)$ at $t=0.25$.
2. **Pen & paper:** Use De Casteljau's algorithm to evaluate the cubic Bézier $P_0=(0,0), P_1=(1,3), P_2=(3,3), P_3=(4,0)$ at $t=0.5$.
3. **Think about it:** Why does the curve always start at $P_0$ and end at $P_n$?
