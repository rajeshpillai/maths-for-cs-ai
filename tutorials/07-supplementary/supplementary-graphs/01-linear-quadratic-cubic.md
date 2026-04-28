# Linear, Quadratic, and Cubic Graphs

## Intuition

Every equation has a shape.  **Linear** = straight line.  **Quadratic** =
parabola (U-shape).  **Cubic** = S-shape.  Recognising these shapes lets you
instantly understand the behaviour of a function — where it grows, where it
turns, and where it crosses zero.

## Prerequisites

- Tier 0, Lesson 1: Number Systems

## From First Principles

### Linear: $y = mx + c$

A straight line.  $m$ = slope (gradient), $c$ = y-intercept.

| $m$ | Shape |
|-----|-------|
| $m > 0$ | Rises left to right |
| $m = 0$ | Horizontal line |
| $m < 0$ | Falls left to right |

**Pen & paper:** $y = 2x + 1$

| $x$ | $y$ |
|-----|-----|
| $-1$ | $-1$ |
| $0$ | $1$ |
| $1$ | $3$ |
| $2$ | $5$ |

Slope = $\frac{\Delta y}{\Delta x} = \frac{5-1}{2-0} = 2$ ✓

### Quadratic: $y = ax^2 + bx + c$

A **parabola**.  Opens up if $a > 0$, down if $a < 0$.

**Vertex form:** $y = a(x - h)^2 + k$ where $(h, k)$ is the turning point.

**Pen & paper:** $y = x^2 - 4x + 3$

Complete the square: $y = (x-2)^2 - 1$.  Vertex at $(2, -1)$.

Roots: $x^2 - 4x + 3 = (x-1)(x-3) = 0$ → $x = 1, 3$.

**Discriminant** ($b^2 - 4ac$):
- $> 0$: two real roots (parabola crosses x-axis twice)
- $= 0$: one repeated root (touches x-axis)
- $< 0$: no real roots (parabola doesn't reach x-axis)

### Cubic: $y = ax^3 + bx^2 + cx + d$

An S-shape (or reverse S if $a < 0$).  Always has at least one real root.

**Pen & paper:** $y = x^3 - 3x$

$y' = 3x^2 - 3 = 0$ → $x = \pm 1$

At $x = -1$: $y = -1 + 3 = 2$ (local max)
At $x = 1$: $y = 1 - 3 = -2$ (local min)

The curve rises, turns down, turns back up — the classic cubic shape.

### Key features to identify

| Feature | How to find |
|---------|-------------|
| y-intercept | Set $x = 0$ |
| x-intercepts (roots) | Set $y = 0$, solve |
| Turning points | Set $y' = 0$ |
| Max or min? | Check $y''$: positive = min, negative = max |
| End behaviour | Leading term dominates as $x \to \pm\infty$ |

## Python Verification

```python
# ── Linear, Quadratic, Cubic Graphs ─────────────────────────

# Linear: y = 2x + 1
print("=== Linear: y = 2x + 1 ===")
for x in range(-3, 4):
    y = 2*x + 1
    bar = ' ' * max(0, y + 6) + '*'
    print(f"  x={x:+d}: y={y:+d} {bar}")

# Quadratic: y = x² - 4x + 3
print(f"\n=== Quadratic: y = x² - 4x + 3 ===")
print(f"  Vertex: (2, -1)")
print(f"  Roots: x = 1, x = 3")
for x_10 in range(-5, 55, 5):
    x = x_10 / 10
    y = x**2 - 4*x + 3
    bar = ' ' * max(0, int((y + 2) * 3)) + '*'
    print(f"  x={x:4.1f}: y={y:+5.2f} {bar}")

# Discriminant
print(f"\n=== Discriminant ===")
for a, b, c, desc in [(1,-4,3,"two roots"), (1,-2,1,"one root"), (1,0,1,"no real roots")]:
    D = b**2 - 4*a*c
    print(f"  {a}x²+{b:+d}x+{c:+d}: D={D:+d} → {desc}")

# Cubic: y = x³ - 3x
print(f"\n=== Cubic: y = x³ - 3x ===")
print(f"  Local max at x=-1: y={(-1)**3 - 3*(-1)}")
print(f"  Local min at x=+1: y={1**3 - 3*1}")
for x_10 in range(-25, 26, 5):
    x = x_10 / 10
    y = x**3 - 3*x
    bar = ' ' * max(0, int((y + 3) * 2)) + '*'
    print(f"  x={x:+4.1f}: y={y:+5.2f} {bar}")
```

## Visualisation — The three classic polynomial shapes

Linear, quadratic, and cubic polynomials are the three function shapes
beginners meet first. Each has a distinctive *signature shape*:
straight line, U-shape, S-shape (or N-shape).

```python
# ── Visualising linear, quadratic, cubic polynomials ────────
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 3, 400)

fig, axes = plt.subplots(1, 3, figsize=(15, 4.5))

# (1) Linear: y = mx + c.  The slope m and intercept c.
ax = axes[0]
for m, c, color in [(1.0, 0, "tab:blue"),
                    (-2.0, 1, "tab:orange"),
                    (0.5, -1, "tab:green")]:
    ax.plot(x, m * x + c, lw=2, color=color, label=f"y = {m}x + {c}")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Linear: y = m x + c\n(slope m, y-intercept c)")
ax.set_xlim(-3, 3); ax.set_ylim(-5, 5)
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Quadratic: y = a x² + b x + c. U or ∩ depending on sign of a.
ax = axes[1]
for a, b, c, color in [(1.0, 0, 0, "tab:blue"),
                       (-1.0, 0, 4, "tab:orange"),
                       (0.5, -1, -1, "tab:green")]:
    ax.plot(x, a * x*x + b * x + c, lw=2, color=color,
            label=f"y = {a}x² + {b}x + {c}")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Quadratic: y = ax² + bx + c\n(parabola; a > 0 ⇒ ∪, a < 0 ⇒ ∩)")
ax.set_xlim(-3, 3); ax.set_ylim(-6, 8)
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Cubic: y = ax³ + … One bend (S-shape) or none (monotonic).
ax = axes[2]
for spec, color in [(("y = x³",         lambda x: x**3),                 "tab:blue"),
                    (("y = x³ - 3x",    lambda x: x**3 - 3*x),           "tab:orange"),
                    (("y = -x³ + 3x²",  lambda x: -x**3 + 3*x*x),        "tab:green")]:
    label, f = spec
    ax.plot(x, f(x), lw=2, color=color, label=label)
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Cubic: y = ax³ + …\n(can have one bend or be monotonic)")
ax.set_xlim(-3, 3); ax.set_ylim(-12, 12)
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print parametric rules of thumb.
print("Polynomial shape cheat-sheet:")
print(f"  Linear y = mx + c              : 1 parameter shapes the slope")
print(f"  Quadratic y = ax² + bx + c     : sign of a flips ∪ ↔ ∩")
print(f"  Cubic y = ax³ + bx² + cx + d   : sign of a determines end behaviour")
```

## Connection to CS / Games / AI

- **Linear** — linear regression, cost functions, straight-line motion
- **Quadratic** — projectile trajectories ($y = -\frac{1}{2}gt^2 + v_0 t + h_0$), MSE loss landscape for 1 parameter
- **Cubic** — easing functions in animation, spline interpolation
- **Discriminant** — determines if a ray intersects a sphere (Tier 8-09)

## Check Your Understanding

1. **Pen & paper:** Sketch $y = -x^2 + 2x + 3$. Find the vertex and both roots.
2. **Pen & paper:** For $y = x^3 - 12x$, find all turning points and classify them.
3. **Think about it:** Why does a cubic always cross the x-axis at least once?
