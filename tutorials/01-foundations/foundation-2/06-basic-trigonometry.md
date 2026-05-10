# Basic Trigonometry — Right Triangles, the Unit Circle, and Trig Graphs

## Explain Like I Am 7

Climb halfway up a slide and look down.  How far across the floor are
you, and how high above it?  The slide makes a triangle with the floor
and the ladder, and **trigonometry** is just three little number tricks
— *sine*, *cosine*, *tangent* — that tell you those distances if you
know the slide's tilt.  The same tricks describe a swing going back
and forth, the hands of a clock spinning round, and ripples on a pond,
because every smooth round-and-round motion is secretly a triangle
quietly turning.

## Intuition

Every rotation in a game — a turret tracking a target, a character turning, a
planet orbiting — is described by sine and cosine.  Trigonometry connects
angles to ratios of sides in a triangle, and those ratios turn out to describe
circles, waves, and oscillations throughout physics, signal processing, and ML.

## Prerequisites

- Foundation 2, Lesson 1: The Cartesian Plane

## From First Principles

### Right-triangle definitions: SOH-CAH-TOA

In a right triangle with angle $\theta$, label the sides relative to $\theta$:

- **Opposite** (O): the side across from $\theta$
- **Adjacent** (A): the side next to $\theta$ (not the hypotenuse)
- **Hypotenuse** (H): the longest side, opposite the right angle

$$\sin\theta = \frac{O}{H}, \quad \cos\theta = \frac{A}{H}, \quad \tan\theta = \frac{O}{A}$$

Mnemonic: **S**ine = **O**pp/**H**yp, **C**osine = **A**dj/**H**yp,
**T**angent = **O**pp/**A**dj.

**Pen & paper:** A right triangle has opposite = 3, adjacent = 4,
hypotenuse = 5.

$\sin\theta = 3/5 = 0.6$, $\cos\theta = 4/5 = 0.8$, $\tan\theta = 3/4 = 0.75$

### Radians vs degrees

A full circle has $360°$.  But the natural measure is **radians**: the angle
subtended by an arc equal in length to the radius.

A full circle's circumference is $2\pi r$, so a full turn is $2\pi$ radians:

$$2\pi \text{ radians} = 360° \quad \Longrightarrow \quad 1 \text{ radian} = \frac{180°}{\pi} \approx 57.3°$$

**Conversion formulas:**

$$\text{radians} = \text{degrees} \times \frac{\pi}{180}$$
$$\text{degrees} = \text{radians} \times \frac{180}{\pi}$$

**Pen & paper — key angles:**

| Degrees | $0°$ | $30°$ | $45°$ | $60°$ | $90°$ | $180°$ | $360°$ |
|---------|------|-------|-------|-------|-------|--------|--------|
| Radians | $0$  | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ | $\pi$ | $2\pi$ |

### The unit circle

Place a circle of radius 1 centred at the origin.  A point on the circle at
angle $\theta$ (measured counter-clockwise from the positive $x$-axis) has
coordinates:

$$(x, y) = (\cos\theta, \sin\theta)$$

This extends sine and cosine to **all angles**, not just those in a right
triangle.

**Pen & paper — key values:**

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
|----------|-----|---------|---------|---------|---------|
| $\cos\theta$ | $1$ | $\sqrt{3}/2$ | $\sqrt{2}/2$ | $1/2$ | $0$ |
| $\sin\theta$ | $0$ | $1/2$ | $\sqrt{2}/2$ | $\sqrt{3}/2$ | $1$ |

### The Pythagorean identity

Since the point $(\cos\theta, \sin\theta)$ lies on the unit circle $x^2 + y^2 = 1$:

$$\cos^2\theta + \sin^2\theta = 1$$

This is the most important trig identity.

### Graphs of sine, cosine, tangent

**Sine:** starts at 0, rises to 1 at $\pi/2$, back to 0 at $\pi$, down to
$-1$ at $3\pi/2$, back to 0 at $2\pi$.  Period = $2\pi$, amplitude = 1.

**Cosine:** same shape as sine, but shifted left by $\pi/2$:
$\cos\theta = \sin(\theta + \pi/2)$.

**Tangent:** $\tan\theta = \sin\theta / \cos\theta$.  Undefined where
$\cos\theta = 0$ (vertical asymptotes at $\pm\pi/2, \pm 3\pi/2, \ldots$).
Period = $\pi$.

### Worked examples (NCERT-style)

**Example 1 — degree $\leftrightarrow$ radian conversion.** Convert $40° 20'$ into radians.

Step 1 — convert minutes to a fraction of a degree. $1' = 1/60$ degree, so $20' = 20/60° = 1/3°$. Thus $40° 20' = 40\tfrac{1}{3}° = \tfrac{121}{3}°$.

Step 2 — multiply by $\pi/180$:

$$\theta_{\text{rad}} = \frac{121}{3} \cdot \frac{\pi}{180} = \frac{121\pi}{540}\text{ radians}.$$

**Example 2 — arc length.** A wheel of radius $r = 25$ cm rotates so that a point on its rim traces an arc of length $\ell = 30$ cm. Through what angle (in radians and degrees) has the wheel turned?

Use $\theta = \ell / r$ (radians):

$$\theta = \frac{30}{25} = 1.2\text{ rad}.$$

In degrees: $\theta_{\text{deg}} = 1.2 \cdot \tfrac{180}{\pi} \approx 68.75°$.

**Example 3 — minute-hand angle.** Through what angle (in radians) does the minute hand of a clock sweep in 40 minutes?

A full revolution is $60$ minutes $= 2\pi$ radians. So $40$ minutes is $\tfrac{40}{60}$ of a revolution:

$$\theta = \frac{40}{60} \cdot 2\pi = \frac{4\pi}{3}\text{ rad}.$$

In degrees: $\tfrac{4\pi}{3} \cdot \tfrac{180}{\pi} = 240°$. (Check: $40$ min $= \tfrac{2}{3}$ of an hour $\Rightarrow \tfrac{2}{3} \cdot 360° = 240°$. ✓)

**Example 4 — sign by quadrant (ASTC).** $\sin\theta = -3/5$ and $\theta$ lies in the third quadrant. Find $\cos\theta$ and $\tan\theta$.

Step 1 — apply the Pythagorean identity:

$$\cos^2\theta = 1 - \sin^2\theta = 1 - \tfrac{9}{25} = \tfrac{16}{25} \;\Longrightarrow\; \cos\theta = \pm \tfrac{4}{5}.$$

Step 2 — pick the sign by quadrant. In QIII, both $\sin$ and $\cos$ are negative (only $\tan$ is positive — the **A**ll-**S**in-**T**an-**C**os rule). So $\cos\theta = -4/5$.

Step 3 — compute $\tan\theta$:

$$\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{-3/5}{-4/5} = \frac{3}{4}.$$

The negatives cancel, so $\tan\theta > 0$, consistent with QIII.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (a) Unit circle with sin/cos projections
ax = axes[0]
theta_circle = np.linspace(0, 2*np.pi, 200)
ax.plot(np.cos(theta_circle), np.sin(theta_circle), 'k-', linewidth=1.5)
# Show angle theta = pi/3
t = np.pi / 3
ax.plot([0, np.cos(t)], [0, np.sin(t)], 'r-', linewidth=2)
ax.plot(np.cos(t), np.sin(t), 'ro', markersize=8)
# cos projection (horizontal)
ax.plot([np.cos(t), np.cos(t)], [0, np.sin(t)], 'b--', linewidth=1.5,
        label=f'sin({t:.2f}) = {np.sin(t):.2f}')
ax.plot([0, np.cos(t)], [0, 0], 'g--', linewidth=1.5,
        label=f'cos({t:.2f}) = {np.cos(t):.2f}')
ax.set_xlim(-1.4, 1.4)
ax.set_ylim(-1.4, 1.4)
ax.set_aspect('equal')
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.set_title('Unit circle ($\\theta = \\pi/3$)')
ax.legend(fontsize=8, loc='lower left')
ax.grid(True, alpha=0.3)

# (b) Sine and cosine waves
ax = axes[1]
x = np.linspace(0, 4*np.pi, 400)
ax.plot(x, np.sin(x), 'b-', linewidth=2, label='$\\sin(x)$')
ax.plot(x, np.cos(x), 'r-', linewidth=2, label='$\\cos(x)$')
ax.axhline(0, color='k', linewidth=0.5)
ax.set_xticks([0, np.pi, 2*np.pi, 3*np.pi, 4*np.pi])
ax.set_xticklabels(['0', '$\\pi$', '$2\\pi$', '$3\\pi$', '$4\\pi$'])
ax.set_title('Sine and cosine waves')
ax.legend()
ax.grid(True, alpha=0.3)

# (c) Tangent
ax = axes[2]
x = np.linspace(-1.4, 1.4, 200)
ax.plot(x, np.tan(x), 'purple', linewidth=2, label='$\\tan(x)$')
x2 = np.linspace(1.65, 4.6, 200)
ax.plot(x2, np.tan(x2), 'purple', linewidth=2)
ax.axvline(np.pi/2, color='gray', linestyle='--', alpha=0.5)
ax.axvline(-np.pi/2, color='gray', linestyle='--', alpha=0.5)
ax.axhline(0, color='k', linewidth=0.5)
ax.set_ylim(-5, 5)
ax.set_title('Tangent (asymptotes at $\\pm\\pi/2$)')
ax.legend()
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('trigonometry.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Basic Trigonometry ───────────────────────────────────────
import math

# SOH-CAH-TOA for a 3-4-5 triangle
print("=== 3-4-5 triangle ===")
opp, adj, hyp = 3, 4, 5
sin_t = opp / hyp
cos_t = adj / hyp
tan_t = opp / adj
print(f"sin = {opp}/{hyp} = {sin_t}")
print(f"cos = {adj}/{hyp} = {cos_t}")
print(f"tan = {opp}/{adj} = {tan_t}")

# Find the angle
theta = math.atan2(opp, adj)
print(f"theta = {math.degrees(theta):.2f}°  = {theta:.4f} rad")

# Radians <-> degrees
print(f"\n=== Radian conversions ===")
for deg in [0, 30, 45, 60, 90, 180, 360]:
    rad = math.radians(deg)
    print(f"  {deg:>3d}° = {rad:.4f} rad  (pi * {rad/math.pi:.4f})")

# Unit circle key values
print(f"\n=== Unit circle values ===")
for name, angle in [('0', 0), ('pi/6', math.pi/6), ('pi/4', math.pi/4),
                     ('pi/3', math.pi/3), ('pi/2', math.pi/2)]:
    c = math.cos(angle)
    s = math.sin(angle)
    print(f"  theta = {name:>4s}: cos = {c:.4f}, sin = {s:.4f}")

# Pythagorean identity
print(f"\n=== Pythagorean identity ===")
for angle in [0.5, 1.0, 2.3, 5.7]:
    lhs = math.cos(angle)**2 + math.sin(angle)**2
    print(f"  theta = {angle}: cos² + sin² = {lhs:.10f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Rotation** — rotating a sprite by angle $\theta$ uses a 2D rotation matrix
  built from $\cos\theta$ and $\sin\theta$
- **Fourier transforms** — decompose signals into sums of sines and cosines;
  used in audio processing, image compression (JPEG), and CNNs
- **Positional encoding** — Transformers (GPT, etc.) use $\sin$ and $\cos$ at
  different frequencies to encode token positions
- **Game physics** — projectile trajectories, pendulums, and wave simulations
  all use trig functions
- **Dot product and angles** — $\mathbf{a} \cdot \mathbf{b} = \|\mathbf{a}\|\|\mathbf{b}\|\cos\theta$
- **Surveying & total stations** — Leica and Topcon total stations measure horizontal and vertical angles; coordinates are computed by $\Delta x = d\cos\theta$, $\Delta y = d\sin\theta$ — pure SOH-CAH-TOA — for every property survey.
- **Solar-panel tilt optimisation** — installers at SunPower and Tesla Energy compute optimal tilt $= \text{latitude}$ (using zenith angles); annual yield is a sum involving $\cos$(angle of incidence). Software like PVsyst runs these trig calculations hourly.
- **Forex chart pattern recognition** — Bloomberg and TradingView technical-analysis tools use trig-based slope angles ("trendline angle") to flag breakouts; some hedge funds even use Fibonacci angle fans as algorithmic signals.
- **GPS triangulation & radar** — every smartphone GPS uses $\cos$(satellite-angle) for trilateration; FAA air-traffic radar at Lockheed Martin computes target range and bearing from $r\cos\theta, r\sin\theta$.
- **Board Exam / JEE (CBSE Class 11, Chapter 3 — Trigonometric Functions)** — appears in NCERT Exercises 3.1 (degree ↔ radian conversion via $\theta_{\text{rad}} = \theta_{\text{deg}} \cdot \pi/180$), 3.2 (signs of trig ratios in the four quadrants — the **ASTC rule**: All in QI, Sin in QII, Tan in QIII, Cos in QIV), 3.3 (compound and double-angle identities). Arc-length formula $\ell = r\theta$ (with $\theta$ in radians) is a perennial JEE Mains warm-up.
- **Common pitfalls drilled in NCERT** — (a) writing "2" without the $°$ symbol means **2 radians**, not 2 degrees; (b) the unit-conversion: $1' = 1/60$ degree (minute of arc), $1'' = 1/3600$ degree (second of arc) — these are *angle* subdivisions, not time units; (c) signs flip across quadrants — always combine the **ASTC rule** with the reference-angle reduction.

## Check Your Understanding

1. **Pen & paper:** A right triangle has hypotenuse 13 and one side 5.  Find
   the other side, then compute $\sin\theta$, $\cos\theta$, $\tan\theta$ for
   the angle opposite the side of length 5.
2. **Pen & paper:** Convert $135°$ to radians.  Then find $\sin(135°)$ and
   $\cos(135°)$ using the unit circle (hint: which quadrant?).
3. **Pen & paper:** Verify the Pythagorean identity for $\theta = \pi/4$ by
   substituting the exact values of $\sin(\pi/4)$ and $\cos(\pi/4)$.
