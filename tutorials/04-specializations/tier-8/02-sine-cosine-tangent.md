# Sine, Cosine, Tangent — From Right-Triangle Ratios

## Intuition

Trig functions answer one question: given an angle in a right triangle, what
are the ratios of the sides?  These ratios appear in rotation, projection,
wave motion, and anywhere angles meet distances.

## Prerequisites

- Tier 8, Lesson 1: Unit Circle, Radians

## From First Principles

### SOH-CAH-TOA

For a right triangle with angle $\theta$, hypotenuse $h$, opposite side $o$, adjacent side $a$:

$$\sin\theta = \frac{o}{h}, \quad \cos\theta = \frac{a}{h}, \quad \tan\theta = \frac{o}{a} = \frac{\sin\theta}{\cos\theta}$$

### Pen & paper: 3-4-5 triangle

Sides: 3 (opposite), 4 (adjacent), 5 (hypotenuse).

$\sin\theta = 3/5 = 0.6$, $\cos\theta = 4/5 = 0.8$, $\tan\theta = 3/4 = 0.75$

$\theta = \arcsin(0.6) \approx 36.87°$

**Verify Pythagorean identity:** $0.6^2 + 0.8^2 = 0.36 + 0.64 = 1$ ✓

### Special triangles (memorise)

**45-45-90:** sides $1, 1, \sqrt{2}$

$\sin 45° = \cos 45° = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$, $\tan 45° = 1$

**30-60-90:** sides $1, \sqrt{3}, 2$

$\sin 30° = 1/2$, $\cos 30° = \sqrt{3}/2$, $\tan 30° = 1/\sqrt{3}$

$\sin 60° = \sqrt{3}/2$, $\cos 60° = 1/2$, $\tan 60° = \sqrt{3}$

### Tangent as slope

The tangent of an angle IS the **slope** of the line at that angle:

$$\tan\theta = \frac{\text{rise}}{\text{run}} = \frac{\Delta y}{\Delta x} = \text{slope}$$

**Pen & paper:**
- A line at 45° has slope $\tan 45° = 1$ (rises 1 for every 1 across)
- A line at 60° has slope $\tan 60° = \sqrt{3} \approx 1.73$ (steep)
- A line at 0° has slope $\tan 0° = 0$ (flat)
- Vertical line (90°): $\tan 90° = \infty$ (undefined slope)

> In calculus: the derivative $f'(x)$ at a point equals $\tan\theta$ where $\theta$ is the angle of the tangent line.

### Cosine as similarity measure

The **cosine of the angle** between two vectors measures how similar their directions are:

$$\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|\|\mathbf{b}\|}$$

| $\cos\theta$ | Meaning |
|-----------|---------|
| $1$ | Identical direction (perfectly similar) |
| $0$ | Perpendicular (unrelated) |
| $-1$ | Opposite direction |

This is **cosine similarity**, the standard measure for comparing:
- Word embeddings in NLP
- Document vectors in search engines
- User preference vectors in recommendation systems

> Note: cosine similarity only measures direction, not magnitude. Two vectors of different lengths but same direction have cosine similarity = 1.

### Reciprocal functions

$\csc\theta = 1/\sin\theta$, $\sec\theta = 1/\cos\theta$, $\cot\theta = 1/\tan\theta$

### Key identities

$$\sin^2\theta + \cos^2\theta = 1$$
$$\sin(-\theta) = -\sin\theta \quad \text{(odd function)}$$
$$\cos(-\theta) = \cos\theta \quad \text{(even function)}$$
$$\sin(\pi/2 - \theta) = \cos\theta$$
$$\sin(A + B) = \sin A\cos B + \cos A\sin B$$
$$\cos(A + B) = \cos A\cos B - \sin A\sin B$$
$$\sin(2\theta) = 2\sin\theta\cos\theta$$
$$\cos(2\theta) = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1$$

### Inverse trig functions

$\arcsin$, $\arccos$, $\arctan$ give the angle from a ratio.

**`atan2(y, x)`** — the most useful in practice: gives the angle of vector $(x, y)$, handling all four quadrants correctly.

## Python Verification

```python
# ── Sine, Cosine, Tangent ───────────────────────────────────
import math

# SOH-CAH-TOA: 3-4-5 triangle
print("=== 3-4-5 triangle ===")
o, a, h = 3, 4, 5
sin_t = o/h
cos_t = a/h
tan_t = o/a
theta = math.asin(sin_t)
print(f"sin={sin_t}, cos={cos_t}, tan={tan_t}")
print(f"θ = {math.degrees(theta):.2f}°")
print(f"Check: sin²+cos² = {sin_t**2 + cos_t**2}")

# Special triangles
print(f"\n=== Special angles ===")
for deg in [0, 30, 45, 60, 90]:
    rad = math.radians(deg)
    s = math.sin(rad)
    c = math.cos(rad)
    t = math.tan(rad) if deg != 90 else float('inf')
    print(f"  {deg:2d}°: sin={s:.4f}, cos={c:.4f}, tan={t if deg!=90 else '∞'}")

# Addition formula verification
print(f"\n=== sin(A+B) = sinA·cosB + cosA·sinB ===")
A, B = math.radians(30), math.radians(45)
lhs = math.sin(A + B)
rhs = math.sin(A)*math.cos(B) + math.cos(A)*math.sin(B)
print(f"sin(75°) = {lhs:.6f}")
print(f"Formula  = {rhs:.6f}")

# atan2: angle from coordinates
print(f"\n=== atan2: direction from (x,y) ===")
points = [(1,0), (1,1), (0,1), (-1,1), (-1,0), (-1,-1), (0,-1)]
for x, y in points:
    angle = math.degrees(math.atan2(y, x))
    print(f"  ({x:+d},{y:+d}): {angle:+7.1f}°")
```

## Connection to CS / Games / AI

- **Character rotation** — `atan2(target.y - pos.y, target.x - pos.x)` gives the aim angle
- **Projectile motion** — launch angle determines trajectory via sin/cos decomposition
- **Oscillation** — `sin(time * frequency)` creates bobbing, pulsing, breathing effects
- **Dot product & angle** — $\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$ (Tier 2)
- **Fourier analysis** — all signals decompose into sines and cosines (Tier 9)

## Check Your Understanding

1. **Pen & paper:** A ladder 10m long leans against a wall at 60° from the ground.  How high does it reach?  How far from the wall is the base?
2. **Pen & paper:** Derive $\sin(2\theta) = 2\sin\theta\cos\theta$ from the addition formula.
3. **Pen & paper:** Find all $\theta \in [0, 2\pi)$ where $\sin\theta = 0.5$.
4. **Pen & paper:** Simplify $\sin^2\theta + \sin^2\theta\tan^2\theta$.  (Hint: factor out $\sin^2\theta$.)
