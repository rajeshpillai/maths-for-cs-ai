# Trigonometric Identities — Double Angle, Addition, R-Formula

## Intuition

Trig identities let you rewrite expressions in simpler forms — essential for
solving equations, integrating, and simplifying signals.  The addition formulae
are the foundation: everything else (double angle, half angle, R-formula)
derives from them.

**Concrete example:** The double angle formula says $\sin 2x = 2\sin x\cos x$.
This means you can replace one trig expression with another that is
algebraically equivalent.  In signal processing, this converts a product of
two oscillations into a single oscillation at double the frequency — a fact
that is used in AM radio modulation and Fourier analysis.

## Prerequisites

- Foundation 4, Lesson 2: Trigonometric Functions — Advanced

## From First Principles

### Addition formulae (derive everything else from these)

$$\sin(A + B) = \sin A\cos B + \cos A\sin B$$
$$\cos(A + B) = \cos A\cos B - \sin A\sin B$$
$$\tan(A + B) = \frac{\tan A + \tan B}{1 - \tan A\tan B}$$

Subtraction: replace $B$ with $-B$ (using $\sin(-B) = -\sin B$, $\cos(-B) = \cos B$).

### Double angle formulae (set $A = B$)

$$\sin 2A = 2\sin A\cos A$$
$$\cos 2A = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A$$
$$\tan 2A = \frac{2\tan A}{1 - \tan^2 A}$$

**Pen & paper:** If $\sin A = 3/5$ (and $A$ acute), find $\sin 2A$.

$\cos A = 4/5$ (from $3$-$4$-$5$ triangle)

$\sin 2A = 2(3/5)(4/5) = 24/25$

### Half angle (rearrange double angle)

From $\cos 2A = 2\cos^2 A - 1$:

$$\cos^2 A = \frac{1 + \cos 2A}{2}$$

$$\sin^2 A = \frac{1 - \cos 2A}{2}$$

These are used for integrating $\sin^2 x$ and $\cos^2 x$.

### Product-to-sum

$$\sin A\cos B = \frac{1}{2}[\sin(A+B) + \sin(A-B)]$$

### The R-formula

Express $a\sin\theta + b\cos\theta$ as $R\sin(\theta + \alpha)$:

$$a\sin\theta + b\cos\theta = R\sin(\theta + \alpha)$$

where $R = \sqrt{a^2 + b^2}$ and $\tan\alpha = b/a$.

**Pen & paper:** Write $3\sin\theta + 4\cos\theta$ in the form $R\sin(\theta + \alpha)$:

$R = \sqrt{9 + 16} = 5$

$\tan\alpha = 4/3$ → $\alpha = \arctan(4/3) \approx 53.13°$

$3\sin\theta + 4\cos\theta = 5\sin(\theta + 53.13°)$

**Application:** Maximum value is $R = 5$, occurs when $\theta + 53.13° = 90°$.

### Solving trig equations

**Pen & paper:** Solve $2\sin^2 x - \sin x - 1 = 0$ for $0 \le x < 2\pi$.

Let $u = \sin x$: $2u^2 - u - 1 = 0$ → $(2u + 1)(u - 1) = 0$

$\sin x = -1/2$ → $x = 7\pi/6, 11\pi/6$

$\sin x = 1$ → $x = \pi/2$

Solutions: $x = \pi/2, 7\pi/6, 11\pi/6$

## Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# (a) sin(2x) vs 2sin(x)cos(x) — they overlap perfectly
ax = axes[0]
x = np.linspace(0, 2*np.pi, 300)
ax.plot(x, np.sin(2*x), 'b-', linewidth=3, label='$\\sin(2x)$')
ax.plot(x, 2*np.sin(x)*np.cos(x), 'r--', linewidth=2,
        label='$2\\sin(x)\\cos(x)$')
ax.set_xlabel('$x$ (radians)', fontsize=11)
ax.set_title('Double angle: $\\sin(2x) = 2\\sin(x)\\cos(x)$', fontsize=12)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

# (b) R-formula: 3sin(θ) + 4cos(θ) = 5sin(θ + α)
ax = axes[1]
theta = np.linspace(0, 2*np.pi, 300)
lhs = 3*np.sin(theta) + 4*np.cos(theta)
alpha = np.arctan2(4, 3)
rhs = 5*np.sin(theta + alpha)
ax.plot(theta, lhs, 'b-', linewidth=3,
        label='$3\\sin\\theta + 4\\cos\\theta$')
ax.plot(theta, rhs, 'r--', linewidth=2,
        label='$5\\sin(\\theta + 53.1°)$')
ax.axhline(5, color='green', linestyle=':', alpha=0.7, label='$R = 5$ (max)')
ax.axhline(-5, color='green', linestyle=':', alpha=0.7)
ax.set_xlabel('$\\theta$ (radians)', fontsize=11)
ax.set_title('R-formula: amplitude = $R = \\sqrt{a^2+b^2}$', fontsize=12)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('trig_identities_visualisation.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Trig Identities ─────────────────────────────────────────
import math

# Addition formula
print("=== Addition: sin(A+B) = sinA·cosB + cosA·sinB ===")
A, B = math.radians(30), math.radians(45)
lhs = math.sin(A + B)
rhs = math.sin(A)*math.cos(B) + math.cos(A)*math.sin(B)
print(f"  sin(75°) = {lhs:.6f}")
print(f"  Formula  = {rhs:.6f}")

# Double angle
print(f"\n=== Double angle: sin(2A) = 2·sinA·cosA ===")
A = math.asin(3/5)  # sinA = 3/5
sin2A = 2 * math.sin(A) * math.cos(A)
print(f"  sinA = 3/5, cosA = {math.cos(A):.4f}")
print(f"  sin(2A) = {sin2A:.4f} = 24/25 = {24/25}")

# R-formula: 3sin(θ) + 4cos(θ) = 5sin(θ + α)
print(f"\n=== R-formula: 3sinθ + 4cosθ ===")
R = math.sqrt(9 + 16)
alpha = math.atan2(4, 3)
print(f"  R = {R:.0f}, α = {math.degrees(alpha):.2f}°")

# Verify at several angles
for deg in [0, 30, 45, 90, 180]:
    theta = math.radians(deg)
    lhs = 3*math.sin(theta) + 4*math.cos(theta)
    rhs = R * math.sin(theta + alpha)
    print(f"  θ={deg:3d}°: 3sinθ+4cosθ = {lhs:+.4f}, 5sin(θ+α) = {rhs:+.4f}")

# Solve 2sin²x - sinx - 1 = 0
print(f"\n=== Solve 2sin²x - sinx - 1 = 0 in [0, 2π) ===")
solutions = []
for deg in range(0, 360):
    x = math.radians(deg)
    val = 2*math.sin(x)**2 - math.sin(x) - 1
    if abs(val) < 0.01:
        solutions.append(deg)
print(f"  Solutions at: {solutions}°")
print(f"  Exact: 90°, 210°, 330° (= π/2, 7π/6, 11π/6)")

# Half angle: integrating sin²x
print(f"\n=== Half angle: sin²x = (1-cos2x)/2 ===")
x = math.radians(60)
lhs = math.sin(x)**2
rhs = (1 - math.cos(2*x)) / 2
print(f"  sin²(60°) = {lhs:.6f}")
print(f"  (1-cos120°)/2 = {rhs:.6f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Signal processing** — product-to-sum converts AM modulation; R-formula finds amplitude/phase
- **Integration** — half-angle identities essential for $\int \sin^2 x\,dx$ (appears in physics, probability)
- **Rotation** — addition formulae derive the 2D rotation matrix (Tier 8-04)
- **Fourier analysis** — product-to-sum decomposes products of sines into sums
- **Phase shift** — R-formula finds the amplitude and phase of combined oscillations
- **AM/FM radio modulation** — Qualcomm and Broadcom RF chips use product-to-sum identities $\sin A \cos B$ to encode/decode amplitude- and frequency-modulated carrier signals on every cellular handset.
- **Power-factor correction** — Schneider Electric and Eaton use the R-formula to combine real and reactive power into apparent power $S = \sqrt{P^2 + Q^2}$; utility tariffs penalise low power factor based on these trig identities.
- **Heterodyne mixers in test gear** — Keysight and Tektronix spectrum analysers use $\cos\omega_1 t \cdot \cos\omega_2 t = \frac{1}{2}[\cos(\omega_1-\omega_2) + \cos(\omega_1+\omega_2)]$ to down-convert microwave signals into measurable IF.
- **Acoustic beat frequencies** — piano tuners and Steinway technicians listen for beat frequencies $f_1 - f_2$ — a direct application of the sum-to-product identity — to tune octaves to within $\pm 0.5$ cent.

## Check Your Understanding

1. **Pen & paper:** Use the double angle formula to find $\cos 2A$ if $\cos A = 1/3$.
2. **Pen & paper:** Write $5\sin\theta - 12\cos\theta$ in the form $R\sin(\theta - \alpha)$.  Find the maximum value.
3. **Pen & paper:** Solve $\cos 2x + \cos x = 0$ for $0 \le x < 2\pi$.  (Hint: use $\cos 2x = 2\cos^2 x - 1$.)
4. **Pen & paper:** Prove that $\frac{\sin 2A}{1 + \cos 2A} = \tan A$.
