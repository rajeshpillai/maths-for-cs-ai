# Unit Circle, Radians, and Degrees

## Intuition

Angles are everywhere in games and graphics: rotating a character, aiming a
weapon, orbiting a camera.  **Degrees** are what humans use; **radians** are
what mathematics (and every trig function in every programming language) uses.
The **unit circle** is the Rosetta Stone that connects angles to coordinates.

## Prerequisites

- Tier 0, Lesson 1: Number Systems (real numbers, π)

## From First Principles

### Degrees

A full rotation = 360°.  Why 360?  The Babylonians used base 60, and 360 is
divisible by 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45,
60, 72, 90, 120, 180 — making fractions easy.

### Radians

One **radian** is the angle subtended by an arc equal in length to the radius.

A full circle has circumference $2\pi r$.  So a full rotation = $2\pi$ radians.

$$2\pi \text{ rad} = 360°$$

$$1 \text{ rad} = \frac{180°}{\pi} \approx 57.3°$$

### Conversion

$$\text{radians} = \text{degrees} \times \frac{\pi}{180}$$

$$\text{degrees} = \text{radians} \times \frac{180}{\pi}$$

### Key angles (memorise this table)

| Degrees | Radians | Fraction of circle |
|---------|---------|-------------------|
| 0° | 0 | 0 |
| 30° | $\pi/6$ | 1/12 |
| 45° | $\pi/4$ | 1/8 |
| 60° | $\pi/3$ | 1/6 |
| 90° | $\pi/2$ | 1/4 |
| 180° | $\pi$ | 1/2 |
| 270° | $3\pi/2$ | 3/4 |
| 360° | $2\pi$ | 1 |

### The unit circle

A circle of radius 1 centred at the origin.  For angle $\theta$ (measured
counter-clockwise from the positive x-axis):

$$x = \cos\theta, \quad y = \sin\theta$$

The point $(\cos\theta, \sin\theta)$ traces the circle as $\theta$ varies.

### Pen & paper: Key coordinates on the unit circle

| $\theta$ | $\cos\theta$ | $\sin\theta$ |
|----------|-------------|-------------|
| $0$ | $1$ | $0$ |
| $\pi/6$ (30°) | $\frac{\sqrt{3}}{2} \approx 0.866$ | $\frac{1}{2} = 0.5$ |
| $\pi/4$ (45°) | $\frac{\sqrt{2}}{2} \approx 0.707$ | $\frac{\sqrt{2}}{2} \approx 0.707$ |
| $\pi/3$ (60°) | $\frac{1}{2} = 0.5$ | $\frac{\sqrt{3}}{2} \approx 0.866$ |
| $\pi/2$ (90°) | $0$ | $1$ |
| $\pi$ (180°) | $-1$ | $0$ |
| $3\pi/2$ (270°) | $0$ | $-1$ |

### Why radians are natural

Many formulas are simplest in radians:

- Arc length: $s = r\theta$ (no conversion factor!)
- Sector area: $A = \frac{1}{2}r^2\theta$
- $\frac{d}{d\theta}\sin\theta = \cos\theta$ (only in radians)
- $\sin\theta \approx \theta$ for small $\theta$ (only in radians)
- $e^{i\theta} = \cos\theta + i\sin\theta$ (Euler's formula)

### The Pythagorean identity

Since $(\cos\theta, \sin\theta)$ lies on the unit circle ($x^2 + y^2 = 1$):

$$\cos^2\theta + \sin^2\theta = 1$$

This is the most important trig identity — everything else derives from it.

## Python Verification

```python
# ── Unit Circle, Radians, Degrees ───────────────────────────
import math

# Conversions
print("=== Degree ↔ Radian conversion ===")
for deg in [0, 30, 45, 60, 90, 180, 270, 360]:
    rad = math.radians(deg)
    print(f"  {deg:3d}° = {rad:.4f} rad = {deg}/180 × π")

# Unit circle coordinates
print(f"\n=== Unit circle coordinates ===")
angles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360]
for deg in angles:
    rad = math.radians(deg)
    x = math.cos(rad)
    y = math.sin(rad)
    print(f"  {deg:3d}°: ({x:+.4f}, {y:+.4f})")

# Pythagorean identity
print(f"\n=== Pythagorean identity ===")
for deg in [0, 37, 45, 123, 200, 315]:
    rad = math.radians(deg)
    result = math.cos(rad)**2 + math.sin(rad)**2
    print(f"  {deg}°: cos²+sin² = {result:.10f}")

# Small angle approximation
print(f"\n=== Small angle: sin(θ) ≈ θ (radians only) ===")
for deg in [1, 5, 10, 30, 45]:
    rad = math.radians(deg)
    print(f"  {deg:2d}°: sin={math.sin(rad):.6f}, θ={rad:.6f}, error={abs(math.sin(rad)-rad):.6f}")

# Arc length and sector area
print(f"\n=== Arc length and sector area ===")
r = 5
for deg in [45, 90, 180, 360]:
    theta = math.radians(deg)
    arc = r * theta
    area = 0.5 * r**2 * theta
    print(f"  r={r}, θ={deg}°: arc={arc:.2f}, sector area={area:.2f}")
```

## Connection to CS / Games / AI

- **Game engines** — all rotation APIs use radians internally (Unity, Unreal, Godot)
- **CSS transforms** — `rotate(45deg)` vs `rotate(0.7854rad)`
- **Atan2** — `math.atan2(y, x)` converts coordinates to angle (used for aiming, steering)
- **Angular velocity** — measured in rad/s; multiply by dt for rotation per frame
- **Signal processing** — frequency is measured in radians per second ($\omega = 2\pi f$)
- **Euler's formula** — $e^{i\theta}$ represents rotation in the complex plane (used in Fourier analysis)

## Check Your Understanding

1. **Pen & paper:** Convert 150° to radians.  Convert $5\pi/4$ radians to degrees.
2. **Pen & paper:** What are the coordinates of the point at 210° on the unit circle?
3. **Pen & paper:** A wheel of radius 30 cm rotates through $3\pi/4$ radians.  What is the arc length?
4. **Think about it:** Why do programming languages use radians for `sin()` and `cos()` instead of degrees?
