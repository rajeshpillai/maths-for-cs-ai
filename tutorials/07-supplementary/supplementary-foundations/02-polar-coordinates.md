# Polar Coordinates and Curves

## Intuition

Cartesian coordinates use $(x, y)$.  **Polar coordinates** use $(r, \theta)$
— distance from origin and angle.  Some curves that are complex in Cartesian
become beautifully simple in polar: circles, spirals, roses, cardioids.
Polar coordinates connect to complex numbers, radar systems, and circular
motion in games.

## Prerequisites

- Tier 8, Lesson 1: Unit Circle, Radians
- Foundation 4, Lesson 7: Complex Numbers

## From First Principles

### Conversion

$$x = r\cos\theta, \quad y = r\sin\theta$$
$$r = \sqrt{x^2 + y^2}, \quad \theta = \arctan(y/x)$$

### Pen & paper: Convert $(3, 4)$ to polar

$r = \sqrt{9 + 16} = 5$

$\theta = \arctan(4/3) \approx 53.13° \approx 0.927$ rad

Polar: $(5, 0.927)$.

### Pen & paper: Convert $(4, \pi/3)$ to Cartesian

$x = 4\cos(\pi/3) = 4 \times 0.5 = 2$

$y = 4\sin(\pi/3) = 4 \times \frac{\sqrt{3}}{2} = 2\sqrt{3} \approx 3.46$

### Classic polar curves

**Circle:** $r = a$ (constant radius)

**Line through origin:** $\theta = c$ (constant angle)

**Cardioid:** $r = a(1 + \cos\theta)$ — heart-shaped

**Rose:** $r = a\cos(n\theta)$ — $n$ petals if $n$ odd, $2n$ if even

**Spiral:** $r = a\theta$ (Archimedean) or $r = ae^{b\theta}$ (logarithmic)

**Lemniscate:** $r^2 = a^2\cos(2\theta)$ — figure-eight

### Pen & paper: Sketch $r = 2\cos\theta$

| $\theta$ | $\cos\theta$ | $r$ |
|----------|-------------|-----|
| $0$ | $1$ | $2$ |
| $\pi/6$ | $0.866$ | $1.73$ |
| $\pi/4$ | $0.707$ | $1.41$ |
| $\pi/3$ | $0.5$ | $1$ |
| $\pi/2$ | $0$ | $0$ |

This traces a circle of radius 1 centred at $(1, 0)$.

Why? $r = 2\cos\theta$ → $r^2 = 2r\cos\theta$ → $x^2 + y^2 = 2x$ → $(x-1)^2 + y^2 = 1$.

### Area in polar coordinates

$$A = \frac{1}{2}\int_{\alpha}^{\beta} r(\theta)^2\,d\theta$$

**Pen & paper:** Area of $r = 2\cos\theta$ (full circle, $0$ to $\pi$):

$A = \frac{1}{2}\int_0^{\pi} 4\cos^2\theta\,d\theta = 2\int_0^{\pi}\frac{1 + \cos 2\theta}{2}\,d\theta = \int_0^{\pi}(1 + \cos 2\theta)\,d\theta$

$= [\theta + \frac{\sin 2\theta}{2}]_0^{\pi} = \pi$

Area = $\pi$, which matches a circle of radius 1.  ✓

### Gradient in polar

$$\frac{dy}{dx} = \frac{\frac{dr}{d\theta}\sin\theta + r\cos\theta}{\frac{dr}{d\theta}\cos\theta - r\sin\theta}$$

## Python Verification

```python
# ── Polar Coordinates ───────────────────────────────────────
import math

# Cartesian ↔ Polar conversion
print("=== Conversion ===")
x, y = 3, 4
r = math.sqrt(x**2 + y**2)
theta = math.atan2(y, x)
print(f"({x},{y}) → (r={r:.2f}, θ={math.degrees(theta):.1f}°)")

r2, t2 = 4, math.pi/3
x2 = r2 * math.cos(t2)
y2 = r2 * math.sin(t2)
print(f"(r=4, θ=60°) → ({x2:.2f}, {y2:.2f})")

# Plot polar curves (text-based)
print(f"\n=== Cardioid: r = 1 + cos(θ) ===")
for deg in range(0, 361, 30):
    t = math.radians(deg)
    r = 1 + math.cos(t)
    x = r * math.cos(t)
    y = r * math.sin(t)
    print(f"  θ={deg:3d}°: r={r:.2f} → ({x:+.2f}, {y:+.2f})")

# Rose: r = cos(3θ) — 3 petals
print(f"\n=== Rose: r = cos(3θ) ===")
for deg in range(0, 361, 30):
    t = math.radians(deg)
    r = math.cos(3 * t)
    if r >= 0:
        x = r * math.cos(t)
        y = r * math.sin(t)
        print(f"  θ={deg:3d}°: r={r:.2f} → ({x:+.2f}, {y:+.2f})")

# r = 2cos(θ) is a circle
print(f"\n=== r = 2cos(θ) → circle (x-1)²+y²=1 ===")
for deg in range(0, 181, 30):
    t = math.radians(deg)
    r = 2 * math.cos(t)
    if r >= 0:
        x = r * math.cos(t)
        y = r * math.sin(t)
        check = (x-1)**2 + y**2
        print(f"  θ={deg:3d}°: ({x:.3f},{y:.3f}), (x-1)²+y²={check:.4f}")

# Area: r = 2cos(θ), 0 to π
print(f"\n=== Area of r=2cos(θ) ===")
n = 10000
dtheta = math.pi / n
area = 0.5 * sum((2*math.cos(i*dtheta))**2 * dtheta for i in range(n))
print(f"  Numerical: {area:.6f}")
print(f"  Exact: π = {math.pi:.6f}")

# Archimedean spiral: r = θ
print(f"\n=== Archimedean spiral: r = θ/(2π) ===")
for t_val in range(0, 13):
    t = t_val * math.pi / 6
    r = t / (2*math.pi)
    x = r * math.cos(t)
    y = r * math.sin(t)
    print(f"  θ={t_val*30:3d}°: r={r:.2f} → ({x:+.2f}, {y:+.2f})")
```

## Visualisation — Curves that are *easy* in polar coordinates

Some curves have a horrible Cartesian formula but a clean polar one.
Three classic examples: a **circle** off-centre, a **rose curve**
(petal pattern), and a **spiral** — all defined by simple $r =
f(\theta)$ relationships.

```python
# ── Visualising classic polar curves ────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 5), subplot_kw=dict(projection="polar"))

# (1) Circle off-centre: r = 2 a cos θ traces a circle of radius a centred
# at (a, 0).  Tricky in Cartesian, easy in polar.
ax = axes[0]
theta = np.linspace(-np.pi/2, np.pi/2, 200)
a = 1.0
r = 2 * a * np.cos(theta)
ax.plot(theta, r, color="tab:blue", lw=2)
ax.set_title(f"Circle of radius {a}, off-centre\n"
             f"$r = 2a \\cos\\theta$  (only valid where r ≥ 0)", pad=20)

# (2) Rose curve: r = cos(k θ) gives k petals if k is odd, 2k if k is even.
ax = axes[1]
theta = np.linspace(0, 2 * np.pi, 800)
k = 4
r = np.abs(np.cos(k * theta))
ax.plot(theta, r, color="tab:orange", lw=2)
ax.set_title(f"Rose curve  $r = |\\cos({k}\\theta)|$\n→ {2*k} petals", pad=20)

# (3) Logarithmic spiral: r = a · e^(b θ).  Self-similar — appears in
# nautilus shells, galaxy arms, hurricane structures.
ax = axes[2]
theta = np.linspace(0, 6 * np.pi, 400)
a, b = 0.1, 0.15
r = a * np.exp(b * theta)
ax.plot(theta, r, color="tab:green", lw=2)
ax.set_title(f"Logarithmic spiral  $r = {a} \\cdot e^{{{b}\\theta}}$\n"
             "(galaxies, shells, hurricanes)", pad=20)

plt.tight_layout()
plt.show()

# Print the polar/Cartesian conversion formulas.
print("Polar ↔ Cartesian:")
print("  Polar → Cartesian:   x = r cos θ,    y = r sin θ")
print("  Cartesian → Polar:   r = √(x² + y²), θ = atan2(y, x)")
print()
print("Examples of curves that are SIMPLE in polar but UGLY in Cartesian:")
print("  Circle of radius a around (a, 0):   r = 2a cos θ        vs  (x-a)² + y² = a²")
print("  Cardioid:                            r = 1 + cos θ        vs  much longer")
print("  Spiral of Archimedes:                r = θ                vs  no closed-form Cartesian")
```

## Connection to CS / Games / AI

- **Radar/sonar** — naturally polar: distance + angle from sensor
- **Game mechanics** — circular motion, orbiting objects, radial menus
- **Complex numbers** — polar form $re^{i\theta}$ connects algebra to geometry
- **Fourier analysis** — frequency and phase are polar coordinates in the spectral domain
- **Spirals in nature** — galaxies, shells, hurricanes follow logarithmic spirals
- **Compass/heading** — navigation uses polar coordinates (bearing + distance)

## Check Your Understanding

1. **Pen & paper:** Convert $(-2, 2)$ to polar coordinates.
2. **Pen & paper:** Sketch $r = 1 + \sin\theta$ by computing $r$ at $\theta = 0, \pi/6, \pi/2, \pi, 3\pi/2$.  What shape is it?
3. **Pen & paper:** Show that $r = 4\sin\theta$ is a circle.  Find its centre and radius.  (Hint: multiply both sides by $r$.)
4. **Pen & paper:** Compute the area enclosed by one petal of $r = \cos(2\theta)$.
