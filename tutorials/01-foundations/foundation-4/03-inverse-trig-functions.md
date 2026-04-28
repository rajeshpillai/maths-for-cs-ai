# Inverse Trigonometric Functions

## Intuition

Trig functions answer "given an angle, what is the ratio?"  Inverse trig
functions reverse the question: "given a ratio, what is the angle?"  When a
game engine needs the angle between two vectors, or a robot arm needs to
compute a joint angle from a target position, you reach for $\arcsin$,
$\arccos$, or $\arctan$.

## Prerequisites

- Foundation 4, Lesson 2: Trigonometric Functions Advanced (all six functions, CAST rule)

## From First Principles

### Why we need domain restrictions

$\sin\theta = 1/2$ has infinitely many solutions: $30°, 150°, 390°, \ldots$
A function can only return **one** value, so we restrict the domain to make
each trig function one-to-one before inverting.

### The three principal inverses

| Inverse | Notation | Domain (input) | Range (output) |
|---------|----------|---------------|----------------|
| arcsine | $\arcsin x$ or $\sin^{-1} x$ | $[-1, 1]$ | $[-\pi/2, \pi/2]$ |
| arccosine | $\arccos x$ or $\cos^{-1} x$ | $[-1, 1]$ | $[0, \pi]$ |
| arctangent | $\arctan x$ or $\tan^{-1} x$ | $(-\infty, \infty)$ | $(-\pi/2, \pi/2)$ |

**Key insight:** $\sin^{-1}$ does NOT mean $1/\sin$.  That is $\csc$.
$\sin^{-1}(x)$ means "the angle whose sine is $x$".

### Deriving exact values

**Pen & paper:** $\arcsin(1/2)$

We need $\theta$ in $[-90°, 90°]$ such that $\sin\theta = 1/2$.
From the exact-value table: $\theta = 30° = \pi/6$.

**Pen & paper:** $\arccos(-\sqrt{3}/2)$

We need $\theta$ in $[0°, 180°]$ such that $\cos\theta = -\sqrt{3}/2$.
$\cos 30° = \sqrt{3}/2$, and cosine is negative in Q2, so $\theta = 150° = 5\pi/6$.

**Pen & paper:** $\arctan(-1)$

We need $\theta$ in $(-90°, 90°)$ such that $\tan\theta = -1$.
$\tan 45° = 1$, negative in Q4 of the restricted range: $\theta = -45° = -\pi/4$.

### Important identities

$$\arcsin x + \arccos x = \frac{\pi}{2} \quad \text{for } x \in [-1,1]$$

This follows because if $\sin\alpha = x$ then $\cos(\pi/2 - \alpha) = x$,
so $\arccos x = \pi/2 - \alpha = \pi/2 - \arcsin x$.

### Solving trig equations using inverses

**Pen & paper:** Solve $2\sin\theta - 1 = 0$ for $0 \le \theta < 2\pi$.

Step 1: $\sin\theta = 1/2$

Step 2: Reference angle $= \arcsin(1/2) = \pi/6$

Step 3: Sine is positive in Q1 and Q2 (CAST rule).

$\theta = \pi/6$ (Q1) and $\theta = \pi - \pi/6 = 5\pi/6$ (Q2)

**Pen & paper:** Solve $\tan^2\theta = 3$ for $0 \le \theta < 2\pi$.

$\tan\theta = \pm\sqrt{3}$.  Reference angle $= \arctan(\sqrt{3}) = \pi/3$.

$\tan > 0$ in Q1, Q3: $\theta = \pi/3, \pi + \pi/3 = 4\pi/3$

$\tan < 0$ in Q2, Q4: $\theta = \pi - \pi/3 = 2\pi/3, 2\pi - \pi/3 = 5\pi/3$

Four solutions: $\pi/3, 2\pi/3, 4\pi/3, 5\pi/3$.

### The atan2 function

Standard $\arctan(y/x)$ loses quadrant information (it only returns Q1 or Q4).
The two-argument function $\text{atan2}(y, x)$ returns the correct angle in
$(-\pi, \pi]$ for all four quadrants.

**Pen & paper:** Point $(-1, -1)$.  $\arctan((-1)/(-1)) = \arctan(1) = \pi/4$
(wrong — that is Q1).  $\text{atan2}(-1, -1) = -3\pi/4$ (correct — Q3).

### Visualisation — sin and arcsin side by side

```python
import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Left: sin(x) with restricted domain highlighted
x_full = np.linspace(-2*np.pi, 2*np.pi, 500)
x_restricted = np.linspace(-np.pi/2, np.pi/2, 200)
ax1.plot(x_full, np.sin(x_full), 'b-', alpha=0.3, label='sin(x) full')
ax1.plot(x_restricted, np.sin(x_restricted), 'b-', linewidth=3,
         label='sin(x) restricted')
ax1.axhline(0, color='k', linewidth=0.5)
ax1.axvline(0, color='k', linewidth=0.5)
ax1.set_xlabel('x')
ax1.set_ylabel('sin(x)')
ax1.set_title('sin(x) — restricted domain in bold')
ax1.legend(fontsize=9)
ax1.grid(True, alpha=0.3)

# Right: arcsin(x)
x_arc = np.linspace(-1, 1, 300)
ax2.plot(x_arc, np.arcsin(x_arc), 'r-', linewidth=2, label='arcsin(x)')
ax2.plot(x_arc, np.arccos(x_arc), 'g-', linewidth=2, label='arccos(x)')
ax2.axhline(0, color='k', linewidth=0.5)
ax2.axvline(0, color='k', linewidth=0.5)
# Mark key points
for val, name in [(0.5, '1/2'), (np.sqrt(2)/2, '√2/2'), (np.sqrt(3)/2, '√3/2')]:
    ax2.plot(val, np.arcsin(val), 'ro', markersize=5)
    ax2.plot(val, np.arccos(val), 'go', markersize=5)
ax2.set_xlabel('x')
ax2.set_ylabel('angle (radians)')
ax2.set_title('arcsin(x) and arccos(x)')
ax2.legend(fontsize=9)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Inverse Trig Functions ──────────────────────────────────
import math

# Exact values
print("=== Exact inverse trig values ===")
cases = [
    ("arcsin(1/2)", math.asin(0.5), math.pi/6, "π/6"),
    ("arccos(-√3/2)", math.acos(-math.sqrt(3)/2), 5*math.pi/6, "5π/6"),
    ("arctan(-1)", math.atan(-1), -math.pi/4, "-π/4"),
    ("arcsin(√2/2)", math.asin(math.sqrt(2)/2), math.pi/4, "π/4"),
]
for name, computed, exact, label in cases:
    print(f"  {name:20s} = {math.degrees(computed):>8.2f}° = {label}")

# Identity: arcsin(x) + arccos(x) = π/2
print(f"\n=== Identity: arcsin(x) + arccos(x) = π/2 ===")
for x in [0.0, 0.25, 0.5, 0.75, 1.0]:
    total = math.asin(x) + math.acos(x)
    print(f"  x = {x:.2f}: arcsin + arccos = {total:.6f} = π/2 = {math.pi/2:.6f}")

# Solving 2sinθ - 1 = 0
print(f"\n=== Solve 2sinθ - 1 = 0 in [0, 2π) ===")
ref = math.asin(0.5)
sol1 = ref
sol2 = math.pi - ref
print(f"  Reference angle = {math.degrees(ref):.0f}°")
print(f"  θ₁ = {math.degrees(sol1):.0f}° (Q1)")
print(f"  θ₂ = {math.degrees(sol2):.0f}° (Q2)")

# atan2 vs atan
print(f"\n=== atan2 vs atan ===")
points = [(1, 1), (-1, 1), (-1, -1), (1, -1)]
for x, y in points:
    a1 = math.degrees(math.atan(y/x))
    a2 = math.degrees(math.atan2(y, x))
    print(f"  ({x:+d},{y:+d}): atan(y/x)={a1:>7.1f}°  atan2(y,x)={a2:>7.1f}°")

# Solve tan²θ = 3
print(f"\n=== Solve tan²θ = 3 in [0, 2π) ===")
ref = math.atan(math.sqrt(3))
solutions = [ref, math.pi - ref, math.pi + ref, 2*math.pi - ref]
for i, s in enumerate(solutions):
    print(f"  θ_{i+1} = {math.degrees(s):>7.1f}°  tan²θ = {math.tan(s)**2:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Angle between vectors** — $\theta = \arccos(\mathbf{a} \cdot \mathbf{b} / (|\mathbf{a}||\mathbf{b}|))$ is used in lighting, collision detection, and cosine similarity
- **atan2 everywhere** — game engines use `atan2(dy, dx)` to compute heading angles, steering directions, and camera rotations
- **Inverse kinematics** — robot arms use $\arccos$ and $\arctan$ to compute joint angles from target positions
- **Machine learning** — the sigmoid function $\sigma(x) = 1/(1 + e^{-x})$ is related to $\arctan$ (both are S-shaped); softmax normalisation involves similar reasoning
- **Navigation** — GPS bearing calculations use $\text{atan2}$ on latitude/longitude differences
- **Aircraft attitude indicators** — Garmin and Honeywell glass cockpits compute pitch and roll as $\arctan(\Delta h / d)$ from gyro/accelerometer data; FAA-certified IFR systems require this inverse-trig math at 50+ Hz.
- **Solar tracker steering** — NEXTracker and Array Technologies invert solar-position formulas with $\arctan$ to drive panel motors; this directly affects MWh delivered per acre.
- **Ballistic trajectory & artillery firing tables** — military fire-control software (Lockheed Martin, BAE Systems) uses $\arcsin(\frac{gR}{v^2})/2$ to compute launch angle for a target range; the same math drives golf rangefinders and ballistics calculators for hunting.
- **Robotic surgical arms** — Intuitive Surgical's da Vinci robot uses $\arccos/\arctan$ inverse kinematics to map surgeon hand motions to instrument tip pose, enforcing safe joint-angle ranges.

## Check Your Understanding

1. **Pen & paper:** Evaluate $\arccos(-1/2)$ exactly.  State the range you are working in.
2. **Pen & paper:** Solve $\cos\theta = -\sqrt{2}/2$ for $0 \le \theta < 2\pi$.
3. **Pen & paper:** Explain why $\arcsin(\sin(5\pi/6)) \ne 5\pi/6$.  What is the correct value?
4. **Pen & paper:** A point is at $(-3, 4)$.  Use $\text{atan2}$ to find the angle.  Verify with the CAST rule.
