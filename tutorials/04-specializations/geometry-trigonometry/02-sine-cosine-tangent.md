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

## Visualisation — Sine, cosine, tangent and the SOH-CAH-TOA triangle

The trio sin / cos / tan all come from the **right-triangle ratios**.
The plot makes both pictures live side by side: the right-triangle
view (SOH-CAH-TOA) and the unit-circle view that lets us extend the
ratios to *any* angle.

```python
# ── Visualising sine, cosine, tangent ───────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) A right triangle with sides labelled by the SOH-CAH-TOA mnemonic.
ax = axes[0]
# Hypotenuse 5, opposite 3, adjacent 4 → 3-4-5 triangle, angle ≈ 36.87°.
ax.plot([0, 4, 4, 0], [0, 0, 3, 0], color="tab:blue", lw=2)
ax.scatter([0, 4, 4], [0, 0, 3], color="tab:blue", s=60, zorder=5)
ax.annotate("opposite = 3\n(side opposite to θ)", xy=(4.05, 1.5),
            color="tab:red", fontsize=10)
ax.annotate("adjacent = 4\n(side touching θ)", xy=(1.5, -0.5),
            color="tab:green", fontsize=10, ha="center")
ax.annotate("hypotenuse = 5", xy=(1.7, 1.7), color="tab:purple", fontsize=10,
            rotation=37)
ax.scatter([0], [0], color="black", s=60)
ax.text(0.6, 0.18, "θ", color="black", fontsize=14)
ax.text(0.5, 0.05, f"≈ {np.degrees(np.arctan2(3, 4)):.1f}°", fontsize=8)
# Right-angle marker.
ax.plot([3.7, 3.7, 4.0], [0, 0.3, 0.3], color="black", lw=1)
ax.set_xlim(-1, 6); ax.set_ylim(-1.2, 4); ax.set_aspect("equal")
ax.set_title("SOH-CAH-TOA on a 3-4-5 right triangle\n"
             "sin θ = 3/5, cos θ = 4/5, tan θ = 3/4")
ax.axis("off")

# (2) sin, cos, tan as functions of angle.
ax = axes[1]
theta_deg = np.linspace(-90, 270, 1000)
theta_rad = np.radians(theta_deg)
ax.plot(theta_deg, np.sin(theta_rad), color="tab:blue",   lw=2, label="sin θ")
ax.plot(theta_deg, np.cos(theta_rad), color="tab:orange", lw=2, label="cos θ")
# Tan blows up at 90° and 270°; clip the range so the plot stays readable.
tan_vals = np.tan(theta_rad)
tan_vals[np.abs(tan_vals) > 5] = np.nan
ax.plot(theta_deg, tan_vals, color="tab:red", lw=2, label="tan θ")
ax.axhline(0, color="black", lw=0.5)
ax.axvline(0, color="black", lw=0.5)
for deg in [-90, 0, 90, 180, 270]:
    ax.axvline(deg, color="grey", lw=0.4, linestyle=":")
ax.set_xticks([-90, 0, 90, 180, 270])
ax.set_xlim(-90, 270); ax.set_ylim(-3, 3)
ax.set_xlabel("θ (degrees)"); ax.set_ylabel("function value")
ax.set_title("sin, cos, tan as functions\n(tan has vertical asymptotes at ±90°, ±270°…)")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) atan2 — the *correct* way to get an angle from (x, y).
# atan(y/x) loses the quadrant; atan2 keeps it.
ax = axes[2]
points = np.array([(1, 1), (-1, 1), (-1, -1), (1, -1),
                   (2, 0), (0, 2), (-2, 0), (0, -2)], dtype=float)
for x, y in points:
    angle_deg = np.degrees(np.arctan2(y, x))
    ax.plot([0, x], [0, y], color="tab:blue", lw=1.5)
    ax.scatter(x, y, color="tab:red", s=60, zorder=5)
    ax.text(x * 1.1, y * 1.1, f"({int(x)},{int(y)})\n{angle_deg:+.0f}°",
            ha="center", fontsize=9)
ax.set_xlim(-3, 3); ax.set_ylim(-3, 3); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("atan2(y, x) — direction of (x, y)\n(handles all 4 quadrants correctly)")
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Verify SOH-CAH-TOA on the 3-4-5 triangle.
opp, adj, hyp = 3, 4, 5
theta = np.arctan2(opp, adj)
print(f"3-4-5 right triangle: θ ≈ {np.degrees(theta):.2f}°")
print(f"  sin θ = opp/hyp = {opp}/{hyp} = {opp/hyp:.4f}    "
      f"(np.sin: {np.sin(theta):.4f})")
print(f"  cos θ = adj/hyp = {adj}/{hyp} = {adj/hyp:.4f}    "
      f"(np.cos: {np.cos(theta):.4f})")
print(f"  tan θ = opp/adj = {opp}/{adj} = {opp/adj:.4f}    "
      f"(np.tan: {np.tan(theta):.4f})")
```

**Three views, one toolkit:**

- **The right-triangle picture** is where sin / cos / tan are first
  *defined* as side ratios. SOH-CAH-TOA is just a mnemonic for the
  three ratios — opposite/hypotenuse, adjacent/hypotenuse, opposite/
  adjacent.
- **The function picture** extends the ratios to any angle by riding
  around the unit circle (lesson 1). Sine and cosine become smooth
  bounded waves; tangent picks up vertical asymptotes whenever
  $\cos\theta = 0$.
- **`atan2(y, x)`** is the *only* trig function you commonly use
  *backwards* — given a point, find the angle. **Always prefer
  `atan2` to `atan(y/x)`** in code: the single-argument version loses
  the quadrant. Game engines aim turrets, robots compute heading,
  and 3D viewers convert mouse drags to camera rotations using
  `atan2` for exactly this reason.

## Connection to CS / Games / AI / Business / Industry

- **Character rotation** — `atan2(target.y - pos.y, target.x - pos.x)` gives the aim angle
- **Projectile motion** — launch angle determines trajectory via sin/cos decomposition
- **Oscillation** — `sin(time * frequency)` creates bobbing, pulsing, breathing effects
- **Dot product & angle** — $\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$ (Tier 2)
- **Fourier analysis** — all signals decompose into sines and cosines (Tier 9)
- **Surveying & construction (Topcon, Trimble total stations)** — every land survey resolves slope distance into horizontal/vertical components via $\sin\theta$ and $\cos\theta$; the same math sets the grade on every highway and railway built today.
- **Solar panel tilt optimization (SunPower, First Solar)** — utility-scale solar farms compute optimal panel angle as $\theta = \arctan(\tan(\text{latitude}) \cdot \cos(\text{declination}))$, gaining 10-25% extra annual yield versus flat-mount.
- **Recommendation engines at Spotify and Netflix** — cosine similarity ($\cos\theta$ between user/item embedding vectors) drives "Discover Weekly" and "Because you watched..." rows for hundreds of millions of subscribers.
- **Aircraft pitch attitude indicators (Garmin G1000, Honeywell EFIS)** — every glass-cockpit display computes pitch and bank angles from accelerometer vectors using `atan2`, ensuring the artificial horizon stays correct in all four quadrants of attitude.

## Check Your Understanding

1. **Pen & paper:** A ladder 10m long leans against a wall at 60° from the ground.  How high does it reach?  How far from the wall is the base?
2. **Pen & paper:** Derive $\sin(2\theta) = 2\sin\theta\cos\theta$ from the addition formula.
3. **Pen & paper:** Find all $\theta \in [0, 2\pi)$ where $\sin\theta = 0.5$.
4. **Pen & paper:** Simplify $\sin^2\theta + \sin^2\theta\tan^2\theta$.  (Hint: factor out $\sin^2\theta$.)
