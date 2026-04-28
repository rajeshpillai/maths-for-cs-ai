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

## Visualisation — The unit circle and why radians are natural

The unit circle is the *single most useful diagram* in trigonometry.
The plot shows the standard angles, the meaning of radians (arc length
on the unit circle), and the canonical $(x, y) = (\cos\theta,
\sin\theta)$ identification.

```python
# ── Visualising the unit circle and radians ─────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# (1) Unit circle with key angles labelled in BOTH degrees and radians.
ax = axes[0]
theta = np.linspace(0, 2 * np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), color="tab:blue", lw=2)
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
key_angles = [(0,        "0°", "0"),
              (np.pi/6,  "30°", "π/6"),
              (np.pi/4,  "45°", "π/4"),
              (np.pi/3,  "60°", "π/3"),
              (np.pi/2,  "90°", "π/2"),
              (np.pi,    "180°", "π"),
              (3*np.pi/2,"270°", "3π/2")]
for rad, deg_lab, rad_lab in key_angles:
    x, y = np.cos(rad), np.sin(rad)
    ax.scatter(x, y, color="tab:red", s=50, zorder=5)
    # Arrow from origin.
    ax.plot([0, x], [0, y], color="tab:red", lw=1, alpha=0.6)
    # Coordinate annotation.
    label = f"{deg_lab} = {rad_lab}\n(cos, sin) = ({x:+.2f}, {y:+.2f})"
    ax.text(1.1 * x, 1.1 * y, label, fontsize=8, ha="center")
ax.set_xlim(-1.7, 1.7); ax.set_ylim(-1.7, 1.7); ax.set_aspect("equal")
ax.set_title("The unit circle\n(x, y) = (cos θ, sin θ) at every angle")
ax.grid(True, alpha=0.3)

# (2) Why radians are natural: the arc length on a unit circle
# subtended by angle θ is *exactly* θ. So 1 radian = arc of length 1.
ax = axes[1]
ax.plot(np.cos(theta), np.sin(theta), color="grey", lw=0.8, alpha=0.5)
# Highlight the arc from 0 to 1 radian (~ 57.3°).
arc_t = np.linspace(0, 1.0, 50)
ax.plot(np.cos(arc_t), np.sin(arc_t), color="tab:red", lw=4, label="arc length = 1")
ax.scatter([1], [0], color="tab:red", s=80, zorder=5)
ax.scatter([np.cos(1)], [np.sin(1)], color="tab:red", s=80, zorder=5)
ax.plot([0, 1], [0, 0], color="tab:blue", lw=2)
ax.plot([0, np.cos(1)], [0, np.sin(1)], color="tab:blue", lw=2)
ax.text(0.5, 0.05, "θ = 1 radian", color="tab:blue", fontsize=11)
# Compare with the SAME 1-unit-arc on a circle of radius 2 (to drive home
# that "1 radian" is a *ratio*, not a length per se).
arc_t2 = np.linspace(0, 0.5, 50)             # 0.5 radian on circle of r=2 → arc = 1
ax.plot(2 * np.cos(arc_t2), 2 * np.sin(arc_t2), color="tab:green", lw=3,
        linestyle="--", label="arc length = 1 on r = 2 → θ = 0.5 rad")
ax.set_xlim(-2.5, 2.5); ax.set_ylim(-2.5, 2.5); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Radian = ARC LENGTH / RADIUS\n(1 radian ≈ 57.30°)")
ax.legend(loc="lower right", fontsize=9); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print a table of key angles in both unit systems.
print(f"{'degrees':>10}  {'radians':>15}  {'(cos, sin)':>20}")
for deg in [0, 30, 45, 60, 90, 120, 180, 270, 360]:
    rad = np.radians(deg)
    print(f"  {deg:>5}°    {rad:>11.4f}    ({np.cos(rad):+.4f}, {np.sin(rad):+.4f})")
```

**Why every game engine, physics simulator, and ML library uses
radians (not degrees):**

- **A radian is a pure ratio.** $1\,\text{rad} = \text{arc length} /
  \text{radius}$. No arbitrary "360" appears anywhere — it follows
  directly from the geometry.
- **Calculus formulas only work in radians.** $\frac{d}{d\theta}
  \sin\theta = \cos\theta$ requires $\theta$ in radians; in degrees
  you'd carry an annoying $\pi/180$ factor through *every* derivative.
  This is why all numerical libraries (`np.sin`, `math.sin`) take
  radians by default.
- **The unit circle is the master reference.** Every value of $\sin$,
  $\cos$, and $\tan$ for any angle reduces to a point on the unit
  circle. Memorising the picture once means you never need a trig
  table again.

## Connection to CS / Games / AI / Business / Industry

- **Game engines** — all rotation APIs use radians internally (Unity, Unreal, Godot)
- **CSS transforms** — `rotate(45deg)` vs `rotate(0.7854rad)`
- **Atan2** — `math.atan2(y, x)` converts coordinates to angle (used for aiming, steering)
- **Angular velocity** — measured in rad/s; multiply by dt for rotation per frame
- **Signal processing** — frequency is measured in radians per second ($\omega = 2\pi f$)
- **Euler's formula** — $e^{i\theta}$ represents rotation in the complex plane (used in Fourier analysis)
- **Wind turbine pitch control (Vestas, Siemens Gamesa)** — blade angle is commanded in radians; the pitch controller uses $s = r\theta$ to translate desired tip-speed-ratio targets into actuator setpoints.
- **Industrial robot arms (KUKA, FANUC, ABB)** — joint angles in every robot controller are stored and transmitted in radians, and angular velocity in rad/s is the unit of every servo-drive command on factory floors.
- **Stock-options "delta hedging" via Black-Scholes** — the formula uses $e^{i\theta}$-style cyclic compounding ($e^{rT}$); brokerages like Goldman Sachs and Citadel run continuous-rate models where $\omega = 2\pi f$ governs interest accrual on intraday positions.
- **CT scanner gantry rotation (GE Revolution, Siemens SOMATOM)** — projection angles for the Radon transform are stored in radians; reconstruction software at every hospital depends on radians being the natural unit of arc length.

## Check Your Understanding

1. **Pen & paper:** Convert 150° to radians.  Convert $5\pi/4$ radians to degrees.
2. **Pen & paper:** What are the coordinates of the point at 210° on the unit circle?
3. **Pen & paper:** A wheel of radius 30 cm rotates through $3\pi/4$ radians.  What is the arc length?
4. **Think about it:** Why do programming languages use radians for `sin()` and `cos()` instead of degrees?
