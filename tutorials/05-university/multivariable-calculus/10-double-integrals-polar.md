# Double Integrals in Polar Coordinates

## Intuition
When the region of integration is circular, annular, or wedge-shaped, polar
coordinates make the integral vastly simpler. Instead of describing a circle as
$x^2 + y^2 \leq R^2$ (awkward square-root bounds in Cartesian), we just say
$0 \leq r \leq R$, $0 \leq \theta \leq 2\pi$. The trade-off: the area element
changes from $dA = dx\,dy$ to $dA = r\,dr\,d\theta$ — that extra factor of $r$
is crucial and easy to forget. In games, polar integrals compute things like the
glow falloff around a point light or the area of a radar sweep.

## Prerequisites
- Tier 12, Lesson 9 — Double integrals (iterated integrals, Fubini's theorem)

## From First Principles

### Polar Coordinates Review

The conversion between Cartesian and polar:

$$x = r\cos\theta, \quad y = r\sin\theta, \quad r = \sqrt{x^2 + y^2}, \quad \theta = \arctan(y/x)$$

### Why $dA = r\, dr\, d\theta$ (Not Just $dr\, d\theta$)

A small polar "rectangle" at radius $r$ with width $dr$ and angular span $d\theta$
has:
- Inner arc length: $r\, d\theta$
- Outer arc length: $(r + dr)\, d\theta$
- Radial sides: $dr$

Its area is approximately the area of a rectangle with sides $dr$ and $r\, d\theta$:

$$dA = r\, d\theta \cdot dr = r\, dr\, d\theta$$

**Formal derivation via the Jacobian.** The transformation $(r, \theta) \mapsto (x, y)$
has Jacobian:

$$J = \begin{vmatrix} \frac{\partial x}{\partial r} & \frac{\partial x}{\partial \theta} \\ \frac{\partial y}{\partial r} & \frac{\partial y}{\partial \theta} \end{vmatrix} = \begin{vmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{vmatrix}$$

$$= r\cos^2\theta + r\sin^2\theta = r$$

So $dx\,dy = |J|\,dr\,d\theta = r\,dr\,d\theta$.

### The Conversion Formula

$$\iint_R f(x, y)\, dx\, dy = \iint_{R'} f(r\cos\theta,\; r\sin\theta)\; r\, dr\, d\theta$$

where $R'$ is the region described in polar coordinates.

### Pen & Paper Example 1: Disk

Evaluate $\iint_D (x^2 + y^2)\, dA$ where $D$ is the disk $x^2 + y^2 \leq 4$.

**Step 1.** In polar: $x^2 + y^2 = r^2$, and $D$ becomes $0 \leq r \leq 2$,
$0 \leq \theta \leq 2\pi$.

$$\int_0^{2\pi} \int_0^2 r^2 \cdot r\, dr\, d\theta = \int_0^{2\pi} \int_0^2 r^3\, dr\, d\theta$$

**Step 2.** Inner integral:

$$\int_0^2 r^3\, dr = \frac{r^4}{4}\bigg|_0^2 = \frac{16}{4} = 4$$

**Step 3.** Outer integral:

$$\int_0^{2\pi} 4\, d\theta = 4 \cdot 2\pi = 8\pi$$

### Pen & Paper Example 2: Annular Region

Find the area of the annulus $1 \leq x^2 + y^2 \leq 9$.

In polar: $1 \leq r \leq 3$, $0 \leq \theta \leq 2\pi$.

$$\text{Area} = \int_0^{2\pi}\int_1^3 r\, dr\, d\theta = \int_0^{2\pi} \left[\frac{r^2}{2}\right]_1^3 d\theta = \int_0^{2\pi} \frac{9-1}{2}\, d\theta = 4 \cdot 2\pi = 8\pi$$

Check: $\pi(3^2) - \pi(1^2) = 9\pi - \pi = 8\pi$. Correct.

### Pen & Paper Example 3: Non-Trivial Integrand

Evaluate $\iint_D e^{-(x^2 + y^2)}\, dA$ over the entire plane $\mathbb{R}^2$.

This is the famous **Gaussian integral** in 2D.

$$\int_0^{2\pi}\int_0^{\infty} e^{-r^2} \cdot r\, dr\, d\theta$$

**Step 1.** Inner integral. Let $u = r^2$, $du = 2r\,dr$:

$$\int_0^{\infty} r\, e^{-r^2}\, dr = \frac{1}{2}\int_0^{\infty} e^{-u}\, du = \frac{1}{2}[-e^{-u}]_0^{\infty} = \frac{1}{2}$$

**Step 2.** Outer integral:

$$\int_0^{2\pi} \frac{1}{2}\, d\theta = \pi$$

Therefore $\iint_{\mathbb{R}^2} e^{-(x^2+y^2)}\, dA = \pi$.

**Corollary.** Since $e^{-(x^2+y^2)} = e^{-x^2} \cdot e^{-y^2}$, the double
integral factors as:

$$\left(\int_{-\infty}^{\infty} e^{-x^2}\, dx\right)^2 = \pi$$

$$\implies \int_{-\infty}^{\infty} e^{-x^2}\, dx = \sqrt{\pi}$$

This is how the Gaussian integral is derived — a fundamental result for
probability and statistics.

### When to Use Polar Coordinates

Use polar when:
- The region is a disk, annulus, sector, or cardioid
- The integrand contains $x^2 + y^2$, $\sqrt{x^2 + y^2}$, or $\arctan(y/x)$
- The region's boundary is naturally described by $r = f(\theta)$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: polar grid showing area element dA = r dr dtheta
ax1 = axes[0]
# Draw polar grid
for r in np.arange(0.5, 3.5, 0.5):
    theta = np.linspace(0, 2*np.pi, 100)
    ax1.plot(r*np.cos(theta), r*np.sin(theta), 'gray', linewidth=0.5, alpha=0.5)
for theta in np.arange(0, 2*np.pi, np.pi/6):
    ax1.plot([0, 3.2*np.cos(theta)], [0, 3.2*np.sin(theta)], 'gray',
             linewidth=0.5, alpha=0.5)

# Highlight one polar "rectangle"
r1, r2 = 1.5, 2.0
th1, th2 = np.pi/4, np.pi/3
theta_fill = np.linspace(th1, th2, 30)
inner_arc_x = r1 * np.cos(theta_fill)
inner_arc_y = r1 * np.sin(theta_fill)
outer_arc_x = r2 * np.cos(theta_fill)
outer_arc_y = r2 * np.sin(theta_fill)
patch_x = np.concatenate([inner_arc_x, outer_arc_x[::-1], [inner_arc_x[0]]])
patch_y = np.concatenate([inner_arc_y, outer_arc_y[::-1], [inner_arc_y[0]]])
ax1.fill(patch_x, patch_y, color='red', alpha=0.4)
ax1.plot(patch_x, patch_y, 'r-', linewidth=2)

# Annotate
rmid = (r1 + r2) / 2
thmid = (th1 + th2) / 2
ax1.annotate('dA = r dr dθ', xy=(rmid*np.cos(thmid), rmid*np.sin(thmid)),
            xytext=(2.5, 2.5), fontsize=11,
            arrowprops=dict(arrowstyle='->', color='red'))
ax1.annotate('dr', xy=(r2*np.cos(thmid), r2*np.sin(thmid)),
            xytext=(2.2, 0.8), fontsize=10, color='blue')
ax1.annotate('r dθ', xy=(rmid*np.cos(th2), rmid*np.sin(th2)),
            xytext=(0.2, 2.2), fontsize=10, color='blue')

ax1.set_xlim(-0.5, 3.5)
ax1.set_ylim(-0.5, 3.5)
ax1.set_aspect('equal')
ax1.set_title('Polar Area Element: dA = r dr dθ')
ax1.set_xlabel('x')
ax1.set_ylabel('y')

# Right: shaded annulus 1 <= r <= 3
ax2 = axes[1]
theta = np.linspace(0, 2*np.pi, 200)
# Outer circle
ax2.fill(3*np.cos(theta), 3*np.sin(theta), color='lightblue', alpha=0.5,
         label='Annulus: 1 ≤ r ≤ 3')
# Cut out inner circle
ax2.fill(np.cos(theta), np.sin(theta), color='white')
ax2.plot(3*np.cos(theta), 3*np.sin(theta), 'b-', linewidth=2)
ax2.plot(np.cos(theta), np.sin(theta), 'b-', linewidth=2)

# Show r limits
ax2.annotate('', xy=(3, 0), xytext=(0, 0),
            arrowprops=dict(arrowstyle='<->', color='red', lw=2))
ax2.text(1.5, -0.3, 'r: 1 to 3', fontsize=10, color='red', ha='center')
ax2.text(2.5, 2.5, 'θ: 0 to 2π', fontsize=10, color='green')

# Sweep arrow
arc_theta = np.linspace(0.1, 1.8, 50)
ax2.plot(3.3*np.cos(arc_theta), 3.3*np.sin(arc_theta), 'g-', linewidth=2)
ax2.annotate('', xy=(3.3*np.cos(1.8), 3.3*np.sin(1.8)),
            xytext=(3.3*np.cos(1.6), 3.3*np.sin(1.6)),
            arrowprops=dict(arrowstyle='->', color='green', lw=2))

ax2.set_xlim(-4, 4)
ax2.set_ylim(-4, 4)
ax2.set_aspect('equal')
ax2.set_title(f'Annulus area = 8π ≈ {8*np.pi:.2f}')
ax2.legend(loc='lower right')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: integral of (x^2 + y^2) over disk r <= 2 ===
# In polar: r^2 * r dr dtheta = r^3 dr dtheta
def f1_polar(theta, r):
    return r**3  # r^2 (the integrand) * r (the Jacobian)

result1, _ = integrate.dblquad(f1_polar, 0, 2, 0, 2*np.pi)
print("=== Integral of (x²+y²) over disk r≤2 ===")
print(f"Numerical: {result1:.6f}")
print(f"Exact: 8π = {8*np.pi:.6f}")

# Verify in Cartesian (slower but confirms the conversion)
def f1_cart(y, x):
    return x**2 + y**2

def y_lower(x):
    return -np.sqrt(4 - x**2)
def y_upper(x):
    return np.sqrt(4 - x**2)

result1_cart, _ = integrate.dblquad(f1_cart, -2, 2, y_lower, y_upper)
print(f"Cartesian verification: {result1_cart:.6f}")

# === Example 2: Gaussian integral ===
# Integrate e^(-r^2) * r over [0, R] x [0, 2pi], let R -> large
R_max = 20  # large enough for convergence
def f_gauss(theta, r):
    return r * np.exp(-r**2)

result2, _ = integrate.dblquad(f_gauss, 0, R_max, 0, 2*np.pi)
print(f"\n=== Gaussian integral over R² ===")
print(f"Numerical (R={R_max}): {result2:.8f}")
print(f"Exact: π = {np.pi:.8f}")

# Derive the 1D Gaussian integral
gauss_1d, _ = integrate.quad(lambda x: np.exp(-x**2), -100, 100)
print(f"\n1D Gaussian integral: {gauss_1d:.8f}")
print(f"sqrt(π) = {np.sqrt(np.pi):.8f}")

# === Example 3: area of annulus ===
def f_area(theta, r):
    return r  # just the Jacobian for area

area, _ = integrate.dblquad(f_area, 1, 3, 0, 2*np.pi)
print(f"\n=== Area of annulus 1 ≤ r ≤ 3 ===")
print(f"Numerical: {area:.6f}")
print(f"Exact: 8π = {8*np.pi:.6f}")
print(f"Check: π(3²) - π(1²) = {np.pi*9 - np.pi*1:.6f}")

# === Demonstrating the Jacobian factor ===
print("\n=== Why the r factor matters ===")
# Wrong (without r):
wrong, _ = integrate.dblquad(lambda theta, r: np.exp(-r**2), 0, R_max, 0, 2*np.pi)
print(f"Without r factor: {wrong:.6f} (WRONG)")
# Right (with r):
print(f"With r factor:    {result2:.6f} (CORRECT = π)")
```

## Connection to CS / Games / AI / Business / Industry
- **Radial basis functions**: RBFs like the Gaussian $e^{-r^2}$ are naturally
  integrated in polar; this appears in kernel methods and interpolation
- **Point light falloff**: the total energy emitted by a point light in a disk
  is computed with polar integration — $\int_0^R I(r) \cdot r\, dr\, d\theta$
- **Circular convolution**: image processing with circular kernels (bokeh blur)
  naturally uses polar integration
- **Probability**: the normalisation constant of the 2D Gaussian distribution
  comes from the polar Gaussian integral we derived
- **Antenna patterns**: signal strength patterns are polar functions; total power
  is their polar integral

## Check Your Understanding
1. Evaluate $\iint_D \sqrt{x^2 + y^2}\, dA$ where $D$ is the disk $x^2 + y^2 \leq 9$.
   (In polar this becomes $\int\int r \cdot r\, dr\, d\theta$.)
2. Compute the volume of the solid under $z = e^{-(x^2+y^2)}$ above the disk
   $x^2 + y^2 \leq 1$.
3. Find $\iint_D \frac{1}{(1 + x^2 + y^2)^2}\, dA$ over all of $\mathbb{R}^2$.
   (Use the substitution $u = 1 + r^2$ after converting to polar.)
