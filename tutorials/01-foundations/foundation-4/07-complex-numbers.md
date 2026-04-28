# Complex Numbers — Argand Diagram, Modulus-Argument, De Moivre

## Intuition

Tier 0 introduced complex numbers as $a + bi$.  Now we go deeper: represent
them as points in a plane (**Argand diagram**), convert to **polar form**
(modulus and argument), and use **De Moivre's theorem** to compute powers
and roots.  This connects to Fourier analysis, signal processing, and quantum computing.

## Prerequisites

- Tier 0, Lesson 1: Number Systems (complex numbers basics)
- Foundation 2, Lesson 6: Basic Trigonometry

## From First Principles

### Argand diagram

Plot $z = a + bi$ as the point $(a, b)$ in a 2D plane.

Real axis = horizontal.  Imaginary axis = vertical.

$z = 3 + 4i$ → point $(3, 4)$.

### Modulus and argument

**Modulus:** $|z| = \sqrt{a^2 + b^2}$ (distance from origin)

**Argument:** $\arg(z) = \theta = \arctan(b/a)$ (angle from positive real axis)

**Pen & paper:** $z = 3 + 4i$

$|z| = \sqrt{9 + 16} = 5$

$\arg(z) = \arctan(4/3) \approx 53.13°$

### Polar (modulus-argument) form

$$z = r(\cos\theta + i\sin\theta) = re^{i\theta}$$

where $r = |z|$, $\theta = \arg(z)$.

**Pen & paper:** $z = 3 + 4i = 5(\cos 53.13° + i\sin 53.13°) = 5e^{i(0.927)}$

### Euler's formula

$$e^{i\theta} = \cos\theta + i\sin\theta$$

The most beautiful equation: $e^{i\pi} + 1 = 0$

### Multiplication in polar form

$$z_1 z_2 = r_1 r_2 \cdot e^{i(\theta_1 + \theta_2)}$$

Multiply moduli, add arguments.

**Pen & paper:** $z_1 = 2e^{i\pi/3}$, $z_2 = 3e^{i\pi/6}$

$z_1 z_2 = 6e^{i\pi/2} = 6(\cos 90° + i\sin 90°) = 6i$

### De Moivre's Theorem

$$(\cos\theta + i\sin\theta)^n = \cos(n\theta) + i\sin(n\theta)$$

Or equivalently: $(re^{i\theta})^n = r^n e^{in\theta}$

**Pen & paper:** $(1 + i)^8$

$|1+i| = \sqrt{2}$, $\arg = \pi/4$

$(1+i)^8 = (\sqrt{2})^8 \cdot e^{i \cdot 8\pi/4} = 16 \cdot e^{i2\pi} = 16$

### Roots of unity

The $n$-th roots of unity are the $n$ solutions to $z^n = 1$:

$$z_k = e^{i2\pi k/n} = \cos\frac{2\pi k}{n} + i\sin\frac{2\pi k}{n}, \quad k = 0, 1, \ldots, n-1$$

They form a regular $n$-gon on the unit circle.

**Pen & paper:** Cube roots of 1 ($n = 3$):

$z_0 = 1$, $z_1 = e^{i2\pi/3} = -\frac{1}{2} + \frac{\sqrt{3}}{2}i$, $z_2 = e^{i4\pi/3} = -\frac{1}{2} - \frac{\sqrt{3}}{2}i$

These form an equilateral triangle on the unit circle.

## Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# (a) Argand diagram: z = 3+4i in polar form
ax = axes[0]
z_real, z_imag = 3, 4
r = np.sqrt(z_real**2 + z_imag**2)
theta = np.arctan2(z_imag, z_real)

# Draw axes
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)

# Draw the vector from origin to z
ax.annotate('', xy=(z_real, z_imag), xytext=(0, 0),
            arrowprops=dict(arrowstyle='->', color='blue', lw=2))
ax.plot(z_real, z_imag, 'bo', markersize=8, zorder=5)
ax.annotate(f'$z = {z_real}+{z_imag}i$', (z_real, z_imag),
            (z_real+0.3, z_imag+0.3), fontsize=12, color='blue')

# Draw modulus label
ax.text(1.2, 2.5, f'$|z| = {r:.0f}$', fontsize=11, color='blue', rotation=53)

# Draw angle arc
arc_angles = np.linspace(0, theta, 50)
arc_r = 1.2
ax.plot(arc_r*np.cos(arc_angles), arc_r*np.sin(arc_angles), 'r-', linewidth=1.5)
ax.text(1.5, 0.5, f'$\\theta \\approx {np.degrees(theta):.1f}°$',
        fontsize=10, color='red')

# Draw projections (dashed)
ax.plot([z_real, z_real], [0, z_imag], 'g--', alpha=0.5)
ax.plot([0, z_real], [z_imag, z_imag], 'g--', alpha=0.5)

ax.set_xlim(-1, 6)
ax.set_ylim(-1, 6)
ax.set_aspect('equal')
ax.set_xlabel('Real', fontsize=11)
ax.set_ylabel('Imaginary', fontsize=11)
ax.set_title('Argand diagram: $z = 3+4i$ in polar form', fontsize=12)
ax.grid(True, alpha=0.3)

# (b) Roots of unity: 5th roots on the unit circle
ax = axes[1]
n = 5

# Draw unit circle
circle_angles = np.linspace(0, 2*np.pi, 200)
ax.plot(np.cos(circle_angles), np.sin(circle_angles), 'k-',
        linewidth=1, alpha=0.3)

# Draw roots
colors = plt.cm.tab10(np.linspace(0, 1, n))
for k in range(n):
    angle = 2*np.pi*k/n
    x, y = np.cos(angle), np.sin(angle)
    ax.plot(x, y, 'o', markersize=10, color=colors[k], zorder=5)
    label_r = 1.25
    ax.annotate(f'$z_{k}$', (x, y),
                (label_r*np.cos(angle), label_r*np.sin(angle)),
                fontsize=11, ha='center', va='center')

# Connect roots to form regular pentagon
for k in range(n):
    angle1 = 2*np.pi*k/n
    angle2 = 2*np.pi*((k+1) % n)/n
    ax.plot([np.cos(angle1), np.cos(angle2)],
            [np.sin(angle1), np.sin(angle2)],
            'b-', linewidth=1.5, alpha=0.6)

# Draw axes
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)

ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')
ax.set_xlabel('Real', fontsize=11)
ax.set_ylabel('Imaginary', fontsize=11)
ax.set_title(f'{n}th roots of unity (regular pentagon)', fontsize=12)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('complex_argand_roots.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Complex Numbers: Argand, Polar, De Moivre ───────────────
import math

# Modulus and argument
z = 3 + 4j
print("=== Modulus and argument ===")
print(f"z = {z}")
print(f"|z| = {abs(z)}")
print(f"arg(z) = {math.degrees(math.atan2(z.imag, z.real)):.2f}°")

# Polar form
r = abs(z)
theta = math.atan2(z.imag, z.real)
z_polar = r * (math.cos(theta) + 1j * math.sin(theta))
print(f"Polar: {r:.0f}(cos{math.degrees(theta):.1f}° + i·sin{math.degrees(theta):.1f}°)")
print(f"Reconstructed: {z_polar:.4f}")

# Multiplication in polar
print(f"\n=== Multiplication in polar ===")
z1 = 2 * (math.cos(math.pi/3) + 1j * math.sin(math.pi/3))
z2 = 3 * (math.cos(math.pi/6) + 1j * math.sin(math.pi/6))
product = z1 * z2
print(f"z1·z2 = {product:.4f}")
print(f"Expected: 6i = {6j}")

# De Moivre: (1+i)^8
print(f"\n=== De Moivre: (1+i)^8 ===")
z = 1 + 1j
result = z ** 8
print(f"(1+i)^8 = {result:.0f}")
print(f"Manual: |1+i|^8 · e^(i·8·π/4) = (√2)^8 · e^(i·2π) = 16")

# Cube roots of unity
print(f"\n=== Cube roots of 1 ===")
n = 3
for k in range(n):
    angle = 2 * math.pi * k / n
    root = math.cos(angle) + 1j * math.sin(angle)
    print(f"  z_{k} = {root.real:+.4f} {root.imag:+.4f}i")
    # Verify z^3 = 1
    cubed = root ** 3
    print(f"       z³ = {cubed.real:.4f} + {cubed.imag:.4f}i")

# Euler's identity
print(f"\n=== Euler: e^(iπ) + 1 = 0 ===")
result = math.cos(math.pi) + 1j * math.sin(math.pi) + 1
print(f"e^(iπ) + 1 = {result.real:.2e} + {result.imag:.2e}i ≈ 0")

# 5th roots of unity (regular pentagon)
print(f"\n=== 5th roots of 1 (pentagon) ===")
for k in range(5):
    angle = 2 * math.pi * k / 5
    x, y = math.cos(angle), math.sin(angle)
    print(f"  z_{k} = ({x:+.4f}, {y:+.4f})")
```

## Connection to CS / Games / AI / Business / Industry

- **Fourier transforms** — the Discrete Fourier Transform (DFT) uses roots of unity: $W_N = e^{-i2\pi/N}$, and the Fast Fourier Transform (FFT) exploits their symmetry (Tier 9-04)
- **Signal processing** — complex exponentials represent oscillations with amplitude and phase
- **Quantum computing** — quantum states are complex vectors; gates are unitary matrices
- **Control theory** — stability analysis uses complex eigenvalues (poles and zeros)
- **2D rotation** — multiplying by $e^{i\theta}$ rotates a point by $\theta$
- **AC circuit phasors** — electrical engineers at GE and Siemens model voltages and currents as complex phasors $V = V_p e^{j\phi}$; circuit-analysis software like SPICE solves $\mathbf{Z}\mathbf{I} = \mathbf{V}$ over $\mathbb{C}$ at every frequency.
- **MRI image reconstruction** — Siemens Healthineers and GE Healthcare scanners record k-space data as complex numbers; the inverse 2D FFT to produce images is performed entirely in the complex plane.
- **Insurance & cat-bond pricing transforms** — actuarial software at Swiss Re and Munich Re uses characteristic functions $\phi_X(t) = \mathbb{E}[e^{itX}]$ (complex-valued) to price catastrophe bonds and compute heavy-tailed loss distributions.
- **Beamforming in 5G** — Ericsson and Nokia base stations apply complex-weighted antenna arrays $\sum w_n e^{j\theta_n}$ to steer radio beams toward specific users; the IEEE 802.11ax standard specifies these complex weights directly.

## Check Your Understanding

1. **Pen & paper:** Convert $z = -1 + \sqrt{3}i$ to polar form.
2. **Pen & paper:** Use De Moivre to compute $(\cos 15° + i\sin 15°)^{12}$.
3. **Pen & paper:** Find all 4th roots of $16$ (i.e., solve $z^4 = 16$).
4. **Pen & paper:** Show that the sum of the $n$-th roots of unity is 0 for $n \ge 2$.
