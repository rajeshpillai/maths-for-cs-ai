# Trigonometric Functions — All Six, Identities & Exact Values

## Explain Like I Am 7

You already met three round-and-round helpers — *sine*, *cosine*, and
*tangent*.  This lesson adds three more brothers and sisters to the
family, plus a small **secret handbook** of facts every one of them
must obey.  Once you know the handbook, you can swap one helper for
another whenever it makes a problem easier — like trading a heavy
shovel for a tiny spoon when you only need to dig out a little hole.
Less digging, same answer.

## Intuition

In Foundation 2 you met sine, cosine, and tangent through right triangles.
Now we complete the toolkit: six trig functions, the identities that connect
them, and the exact values you should know by heart.  Game engines evaluate
these functions millions of times per frame for rotations, lighting, and
physics — knowing their relationships lets you simplify before you compute.

## Prerequisites

- Foundation 2, Lesson 6: Sine, Cosine, Tangent (basic definitions, unit circle)

## From First Principles

### The six trigonometric functions

From a point $(\cos\theta, \sin\theta)$ on the unit circle:

| Function | Definition | Ratio (right triangle) |
|----------|-----------|----------------------|
| $\sin\theta$ | $y$-coordinate | opposite / hypotenuse |
| $\cos\theta$ | $x$-coordinate | adjacent / hypotenuse |
| $\tan\theta$ | $\sin\theta / \cos\theta$ | opposite / adjacent |
| $\csc\theta$ | $1 / \sin\theta$ | hypotenuse / opposite |
| $\sec\theta$ | $1 / \cos\theta$ | hypotenuse / adjacent |
| $\cot\theta$ | $\cos\theta / \sin\theta$ | adjacent / opposite |

The reciprocal functions ($\csc$, $\sec$, $\cot$) are simply flips of the
primary three.

### The Pythagorean identity (derived from the unit circle)

Any point on the unit circle satisfies $x^2 + y^2 = 1$.  Since
$x = \cos\theta$ and $y = \sin\theta$:

$$\cos^2\theta + \sin^2\theta = 1$$

Divide both sides by $\cos^2\theta$:

$$1 + \tan^2\theta = \sec^2\theta$$

Divide the original by $\sin^2\theta$:

$$\cot^2\theta + 1 = \csc^2\theta$$

Three identities from one circle equation.

**Pen & paper:** If $\sin\theta = 3/5$ and $\theta$ is in Q1, find all six
functions.

$\cos\theta = 4/5$ (from $\sin^2 + \cos^2 = 1$, positive in Q1)

$\tan\theta = 3/4$, $\csc\theta = 5/3$, $\sec\theta = 5/4$, $\cot\theta = 4/3$

### The CAST rule — signs in each quadrant

Reading anticlockwise from Q4: **C**-**A**-**S**-**T** tells which functions
are positive:

| Quadrant | Positive functions | Angle range |
|----------|--------------------|-------------|
| Q1 | **A**ll | $0° < \theta < 90°$ |
| Q2 | **S**in (and csc) | $90° < \theta < 180°$ |
| Q3 | **T**an (and cot) | $180° < \theta < 270°$ |
| Q4 | **C**os (and sec) | $270° < \theta < 360°$ |

**Pen & paper:** $\sin 150°$.  $150° = 180° - 30°$.  Q2 → sin positive.
$\sin 150° = +\sin 30° = 1/2$.

### Exact values for special angles

Build from two triangles:

**45-45-90 triangle** (isosceles right triangle with legs 1):
hypotenuse $= \sqrt{2}$

**30-60-90 triangle** (half an equilateral triangle with side 2):
sides $1$, $\sqrt{3}$, $2$

| $\theta$ | $\sin\theta$ | $\cos\theta$ | $\tan\theta$ |
|-----------|--------------|--------------|--------------|
| $0°$     | $0$          | $1$          | $0$          |
| $30°$    | $1/2$        | $\sqrt{3}/2$ | $1/\sqrt{3}$ |
| $45°$    | $\sqrt{2}/2$ | $\sqrt{2}/2$ | $1$          |
| $60°$    | $\sqrt{3}/2$ | $1/2$        | $\sqrt{3}$   |
| $90°$    | $1$          | $0$          | undefined    |

**Memory trick:** For sine at $0°, 30°, 45°, 60°, 90°$, write
$\sqrt{0}/2, \sqrt{1}/2, \sqrt{2}/2, \sqrt{3}/2, \sqrt{4}/2$.

### Worked examples (NCERT-style)

**Example 1 — given one ratio, find the rest.** $\tan x = -5/12$ and $x$ lies in the second quadrant. Find $\sin x$, $\cos x$, $\sec x$, $\csc x$, $\cot x$.

Step 1 — use the Pythagorean identity $1 + \tan^2 x = \sec^2 x$:

$$\sec^2 x = 1 + \tfrac{25}{144} = \tfrac{169}{144} \;\Longrightarrow\; \sec x = \pm \tfrac{13}{12}.$$

In QII, $\sec$ is negative (since $\cos$ is negative there), so $\sec x = -\tfrac{13}{12}$, giving $\cos x = -\tfrac{12}{13}$.

Step 2 — recover $\sin x$ from $\tan x = \sin x / \cos x$:

$$\sin x = \tan x \cdot \cos x = \left(-\tfrac{5}{12}\right) \left(-\tfrac{12}{13}\right) = \tfrac{5}{13}.$$

Positive — consistent with QII.

Step 3 — reciprocals: $\csc x = \tfrac{13}{5}$, $\cot x = \tfrac{1}{\tan x} = -\tfrac{12}{5}$.

**Example 2 — value at $\tfrac{19\pi}{3}$.** Find $\sin\tfrac{19\pi}{3}$ and $\cos\tfrac{19\pi}{3}$.

Reduce modulo $2\pi$: $\tfrac{19\pi}{3} = 2\pi \cdot 3 + \tfrac{\pi}{3} = 6\pi + \tfrac{\pi}{3}$. So $\tfrac{19\pi}{3}$ and $\tfrac{\pi}{3}$ are coterminal:

$$\sin\tfrac{19\pi}{3} = \sin\tfrac{\pi}{3} = \tfrac{\sqrt{3}}{2}, \quad \cos\tfrac{19\pi}{3} = \cos\tfrac{\pi}{3} = \tfrac{1}{2}.$$

**Example 3 — sign-then-reduce.** Find $\cos(-1710°)$.

Step 1 — use evenness of cosine: $\cos(-\theta) = \cos\theta$, so $\cos(-1710°) = \cos 1710°$.

Step 2 — reduce modulo $360°$: $1710° = 4 \cdot 360° + 270° = 1440° + 270°$. So $\cos 1710° = \cos 270° = 0$.

(For $\sin$, we'd use the *odd* property $\sin(-\theta) = -\sin\theta$, then reduce.)

**Example 4 — `sin` $= 0$ trap.** Solve $\sin x = 0$ for general $x$.

The zeros of sine on $[0, 2\pi)$ are $x = 0$ and $x = \pi$ — exactly the integer multiples of $\pi$. Since $\sin$ has period $2\pi$ but vanishes twice per period symmetrically, the *general* solution is

$$x = n\pi, \quad n \in \mathbb{Z}.$$

Note: students sometimes write only $x = 2n\pi$, missing $x = (2n+1)\pi$. The compact form $n\pi$ catches both.

### Visualisation — unit circle with special angles

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(7, 7))

# Unit circle
theta = np.linspace(0, 2*np.pi, 300)
ax.plot(np.cos(theta), np.sin(theta), 'k-', linewidth=1.5)

# Special angles in degrees
angles_deg = [0, 30, 45, 60, 90, 120, 135, 150, 180,
              210, 225, 240, 270, 300, 315, 330]

for deg in angles_deg:
    rad = np.radians(deg)
    x, y = np.cos(rad), np.sin(rad)
    ax.plot(x, y, 'ro', markersize=6)
    ax.plot([0, x], [0, y], 'b-', alpha=0.3)
    # Label with degree
    offset = 1.15
    ax.text(x*offset, y*offset, f'{deg}°', ha='center', va='center',
            fontsize=8)

# Quadrant labels
ax.text(0.5, 0.5, 'Q1\nAll +', ha='center', fontsize=10, color='green')
ax.text(-0.5, 0.5, 'Q2\nSin +', ha='center', fontsize=10, color='blue')
ax.text(-0.5, -0.5, 'Q3\nTan +', ha='center', fontsize=10, color='orange')
ax.text(0.5, -0.5, 'Q4\nCos +', ha='center', fontsize=10, color='red')

ax.set_xlim(-1.4, 1.4)
ax.set_ylim(-1.4, 1.4)
ax.set_aspect('equal')
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.set_title('Unit circle — special angles & CAST rule')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── All Six Trig Functions & Exact Values ───────────────────
import math

# All six functions from sin = 3/5
print("=== Six trig functions: sinθ = 3/5, Q1 ===")
sin_t = 3/5
cos_t = 4/5  # from 3-4-5
tan_t = sin_t / cos_t
print(f"  sinθ = {sin_t},  cosθ = {cos_t},  tanθ = {tan_t:.4f}")
print(f"  cscθ = {1/sin_t:.4f},  secθ = {1/cos_t:.4f},  cotθ = {cos_t/sin_t:.4f}")

# Verify Pythagorean identities
print(f"\n=== Pythagorean identities ===")
print(f"  sin² + cos² = {sin_t**2 + cos_t**2}")
print(f"  1 + tan²    = {1 + tan_t**2:.4f},  sec² = {(1/cos_t)**2:.4f}")
print(f"  cot² + 1    = {(cos_t/sin_t)**2 + 1:.4f},  csc² = {(1/sin_t)**2:.4f}")

# Exact values table
print(f"\n=== Exact values (special angles) ===")
print(f"  {'Angle':>6} {'sin':>10} {'cos':>10} {'tan':>10}")
for deg in [0, 30, 45, 60, 90]:
    rad = math.radians(deg)
    s = math.sin(rad)
    c = math.cos(rad)
    t = math.tan(rad) if deg != 90 else float('inf')
    print(f"  {deg:>5}° {s:>10.6f} {c:>10.6f} {t:>10.6f}")

# CAST rule verification
print(f"\n=== CAST rule ===")
test_angles = [30, 150, 210, 330]
for deg in test_angles:
    rad = math.radians(deg)
    s, c, t = math.sin(rad), math.cos(rad), math.tan(rad)
    signs = f"sin={'+'if s>0 else '-'} cos={'+'if c>0 else '-'} tan={'+'if t>0 else '-'}"
    print(f"  {deg:>3}°: {signs}")

# Verify sin(150°) = sin(30°)
print(f"\n=== sin(150°) = sin(30°) ===")
print(f"  sin(150°) = {math.sin(math.radians(150)):.6f}")
print(f"  sin(30°)  = {math.sin(math.radians(30)):.6f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Rotation** — $\cos$ and $\sin$ are the building blocks of every 2D/3D
  rotation matrix; knowing exact values avoids unnecessary computation
- **Lighting** — Lambert's cosine law: surface brightness $\propto \cos\theta$
  between light direction and surface normal
- **Signal processing** — all six trig functions appear when decomposing
  signals into frequency components (Fourier series)
- **Physics engines** — projectile motion, pendulums, and spring systems all
  use $\sin$ and $\cos$ in their equations of motion
- **CAST rule** — essential for resolving ambiguity when computing angles from
  dot products or inverse trig functions
- **AC power & 3-phase grid** — Siemens and Schneider Electric design grid equipment around $V(t) = V_p \sin(\omega t + \phi)$ with three phases offset by $120°$; utility billing meters compute RMS via trig integration.
- **Cyclic seasonality models** — retail demand forecasters at Walmart fit Fourier-style trig regressions $\sum a_k \cos(2\pi k t/T) + b_k \sin(...)$ to capture weekly and yearly cycles in SKU sales.
- **Solar position algorithms** — NREL's SPA algorithm uses sums of trig functions of all six families to compute sun azimuth/elevation; SunPower and Tesla's Solar Roof use it to schedule tracking arrays for maximum yield.
- **Tide prediction** — NOAA uses 37 trig harmonic constituents (M2, S2, K1, etc.) to predict tides in U.S. ports; commercial shipping routes are scheduled around these tidal sums to maximise draft clearance.
- **Board Exam / JEE (CBSE Class 11, Chapter 3 — Trigonometric Functions)** — covers all six functions across all four quadrants. NCERT Exercises 3.2–3.4 drill (i) computing trig values for angles like $1110°$, $-1845°$, $\tfrac{7\pi}{12}$ via reduction modulo $2\pi$ + ASTC rule; (ii) given one ratio plus a quadrant, find the rest using $1 + \tan^2 x = \sec^2 x$, etc.; (iii) values at non-standard angles like $15°, 75°, 22.5°$ via half-angle / compound-angle formulas. Frequent JEE Mains question: prove an identity such as $\sin 3x = 3\sin x - 4\sin^3 x$ from compound-angle expansion.
- **Common pitfalls drilled in NCERT** — (a) the half-angle formulas have a $\pm$ that is fixed by the *quadrant of $x/2$*, not $x$ itself; (b) reciprocal identities $\csc x = 1/\sin x$ are undefined wherever the underlying ratio is $0$; (c) $\sin 2x = 2 \sin x \cos x$ is not the same as $2 \sin x$ — easy slip on a fast paper.

## Check Your Understanding

1. **Pen & paper:** If $\cos\theta = -5/13$ and $\theta$ is in Q3, find all six trig functions.
2. **Pen & paper:** Without a calculator, evaluate $\tan 225°$.  State which quadrant and which reference angle you use.
3. **Pen & paper:** Prove $\sec^2\theta - \tan^2\theta = 1$ starting from $\sin^2\theta + \cos^2\theta = 1$.
4. **Pen & paper:** Fill in the exact-value table for $\csc$, $\sec$, and $\cot$ at $30°$, $45°$, and $60°$.
