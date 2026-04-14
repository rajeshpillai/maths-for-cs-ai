# Triple Integrals

## Intuition
A double integral accumulates over a 2D region to get volume. A triple integral
accumulates over a 3D region to get a **hypervolume** — or more practically, it
sums any quantity (mass, charge, probability) throughout a solid body. In games,
triple integrals compute the total mass or moment of inertia of a 3D object with
varying density. In ML, they appear when you integrate over 3D probability
distributions or volumetric data.

## Prerequisites
- Tier 12, Lesson 10 — Double integrals in polar coordinates
- Tier 12, Lesson 9 — Double integrals (Fubini's theorem, iterated integrals)

## From First Principles

### Extending Fubini's Theorem to Three Dimensions

Partition a box $B = [a,b] \times [c,d] \times [p,q]$ into tiny sub-boxes of
volume $\Delta V = \Delta x \, \Delta y \, \Delta z$. The triple integral is:

$$\iiint_B f(x,y,z)\, dV = \lim_{\Delta V \to 0} \sum_i \sum_j \sum_k f(x_i^*, y_j^*, z_k^*)\, \Delta V$$

**Fubini's Theorem (3D).** If $f$ is continuous on $B$:

$$\iiint_B f\, dV = \int_a^b \int_c^d \int_p^q f(x,y,z)\, dz\, dy\, dx$$

All six orderings of integration give the same result on a box.

### Pen & Paper Example 1: Box Region

Evaluate $\iiint_B xyz\, dV$ where $B = [0,1] \times [0,2] \times [0,3]$.

**Step 1.** Innermost (integrate $z$, treat $x,y$ as constants):

$$\int_0^3 xyz\, dz = xy \cdot \frac{z^2}{2}\bigg|_0^3 = \frac{9xy}{2}$$

**Step 2.** Middle integral:

$$\int_0^2 \frac{9xy}{2}\, dy = \frac{9x}{2} \cdot \frac{y^2}{2}\bigg|_0^2 = \frac{9x}{2} \cdot 2 = 9x$$

**Step 3.** Outermost:

$$\int_0^1 9x\, dx = 9 \cdot \frac{x^2}{2}\bigg|_0^1 = \frac{9}{2}$$

### Non-Rectangular (General) Regions

For a solid $E$ described by:
- $a \leq x \leq b$
- $g_1(x) \leq y \leq g_2(x)$
- $h_1(x,y) \leq z \leq h_2(x,y)$

$$\iiint_E f\, dV = \int_a^b \int_{g_1(x)}^{g_2(x)} \int_{h_1(x,y)}^{h_2(x,y)} f(x,y,z)\, dz\, dy\, dx$$

### Cylindrical Coordinates $(r, \theta, z)$

Convert from Cartesian: $x = r\cos\theta$, $y = r\sin\theta$, $z = z$.

The volume element becomes $dV = r\, dr\, d\theta\, dz$ (note the extra factor $r$).

**Why the factor $r$?** A small patch at distance $r$ from the axis sweeps an arc
of length $r\,d\theta$, so the area element is $r\,dr\,d\theta$ (from polar), and
adding height gives $r\,dr\,d\theta\,dz$.

### Pen & Paper Example 2: Cylinder Volume

Compute the volume of a cylinder of radius $R = 2$ and height $h = 3$.

$$V = \int_0^{2\pi} \int_0^2 \int_0^3 r\, dz\, dr\, d\theta$$

**Step 1.** $\int_0^3 r\, dz = 3r$

**Step 2.** $\int_0^2 3r\, dr = 3 \cdot \frac{r^2}{2}\big|_0^2 = 6$

**Step 3.** $\int_0^{2\pi} 6\, d\theta = 12\pi$

This matches $\pi R^2 h = \pi \cdot 4 \cdot 3 = 12\pi$. $\checkmark$

### Spherical Coordinates $(\rho, \theta, \phi)$

Convention: $\rho$ = distance from origin, $\theta$ = azimuthal angle in $xy$-plane,
$\phi$ = polar angle from positive $z$-axis.

$$x = \rho \sin\phi \cos\theta, \quad y = \rho \sin\phi \sin\theta, \quad z = \rho \cos\phi$$

Volume element: $dV = \rho^2 \sin\phi\, d\rho\, d\phi\, d\theta$.

**Why $\rho^2 \sin\phi$?** At radius $\rho$, a small box has radial thickness $d\rho$,
north-south arc $\rho\, d\phi$, and east-west arc $\rho \sin\phi\, d\theta$.

### Pen & Paper Example 3: Volume of a Sphere

Volume of a sphere of radius $R$:

$$V = \int_0^{2\pi} \int_0^{\pi} \int_0^R \rho^2 \sin\phi\, d\rho\, d\phi\, d\theta$$

**Step 1.** $\int_0^R \rho^2\, d\rho = \frac{R^3}{3}$

**Step 2.** $\int_0^{\pi} \sin\phi\, d\phi = [-\cos\phi]_0^{\pi} = 1 - (-1) = 2$

**Step 3.** $\int_0^{2\pi} d\theta = 2\pi$

$$V = \frac{R^3}{3} \cdot 2 \cdot 2\pi = \frac{4\pi R^3}{3} \checkmark$$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(15, 5))

# Panel 1: Cartesian box region
ax1 = fig.add_subplot(131, projection='3d')
# Draw wireframe box [0,1]x[0,2]x[0,3]
from itertools import product, combinations
corners = np.array(list(product([0,1], [0,2], [0,3])))
for s, e in combinations(range(8), 2):
    diff = np.abs(corners[s] - corners[e])
    if np.sum(diff > 0) == 1:  # edges differ in exactly one coordinate
        ax1.plot3D(*zip(corners[s], corners[e]), color='blue', linewidth=1.5)
ax1.set_xlabel('x'); ax1.set_ylabel('y'); ax1.set_zlabel('z')
ax1.set_title('Cartesian: Box\n[0,1]×[0,2]×[0,3]')

# Panel 2: Cylindrical coordinates
ax2 = fig.add_subplot(132, projection='3d')
theta = np.linspace(0, 2*np.pi, 40)
z_cyl = np.linspace(0, 3, 20)
Theta, Z = np.meshgrid(theta, z_cyl)
R_cyl = 2
X_cyl = R_cyl * np.cos(Theta)
Y_cyl = R_cyl * np.sin(Theta)
ax2.plot_surface(X_cyl, Y_cyl, Z, alpha=0.3, color='cyan', edgecolor='gray', linewidth=0.3)
ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')
ax2.set_title('Cylindrical: Cylinder\nr=2, h=3')

# Panel 3: Spherical coordinates
ax3 = fig.add_subplot(133, projection='3d')
u = np.linspace(0, 2*np.pi, 40)
v = np.linspace(0, np.pi, 30)
U, V = np.meshgrid(u, v)
R_sph = 2
Xs = R_sph * np.sin(V) * np.cos(U)
Ys = R_sph * np.sin(V) * np.sin(U)
Zs = R_sph * np.cos(V)
ax3.plot_surface(Xs, Ys, Zs, alpha=0.3, color='orange', edgecolor='gray', linewidth=0.3)
ax3.set_xlabel('x'); ax3.set_ylabel('y'); ax3.set_zlabel('z')
ax3.set_title('Spherical: Sphere\nρ=2')

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: xyz over box [0,1]x[0,2]x[0,3] ===
def f_box(z, y, x):  # scipy: innermost variable first
    return x * y * z

result1, error1 = integrate.tplquad(f_box, 0, 1, 0, 2, 0, 3)
print("=== Triple integral of xyz over [0,1]x[0,2]x[0,3] ===")
print(f"Numerical: {result1:.6f}")
print(f"Exact:     {9/2} = 4.5")

# === Example 2: Volume of cylinder (r=2, h=3) in cylindrical coords ===
# Integrand is r (the Jacobian), limits: z in [0,3], r in [0,2], theta in [0,2pi]
def f_cyl(z, r, theta):
    return r  # dV = r dr dtheta dz

result2, _ = integrate.tplquad(f_cyl, 0, 2*np.pi, 0, 2, 0, 3)
print(f"\n=== Volume of cylinder r=2, h=3 ===")
print(f"Numerical: {result2:.6f}")
print(f"Exact:     12π = {12*np.pi:.6f}")

# === Example 3: Volume of sphere (R=2) in spherical coords ===
def f_sph(rho, phi, theta):
    return rho**2 * np.sin(phi)  # dV = rho^2 sin(phi) drho dphi dtheta

result3, _ = integrate.tplquad(f_sph, 0, 2*np.pi, 0, np.pi, 0, 2)
print(f"\n=== Volume of sphere R=2 ===")
print(f"Numerical: {result3:.6f}")
print(f"Exact:     (4/3)π(8) = {4/3*np.pi*8:.6f}")

# === Step-by-step: Example 1 ===
print("\n=== Step-by-step for box integral ===")
inner = integrate.quad(lambda z: 0.5 * 1.0 * z, 0, 3)[0]
print(f"Inner (z) at x=0.5, y=1: {inner:.4f}")
middle = integrate.quad(lambda y: 0.5 * y * 4.5, 0, 2)[0]
print(f"After middle (y) at x=0.5: {middle:.4f}")
```

## Connection to CS / Games / AI
- **3D rendering**: volumetric rendering (fog, clouds) integrates density along
  rays through a 3D scalar field — essentially many triple integrals
- **Physics engines**: moments of inertia for 3D rigid bodies require
  $\iiint \rho(x,y,z)\, r^2\, dV$, often easiest in cylindrical or spherical coords
- **Medical imaging**: CT scan reconstruction integrates X-ray attenuation over
  3D volumes, discretised as triple sums
- **Bayesian ML**: marginalising over 3D parameter spaces requires triple
  integrals of the posterior density
- **Spherical harmonics**: used in environment lighting (games) and quantum
  chemistry, are defined via integrals in spherical coordinates

## Check Your Understanding
1. Evaluate $\iiint_B (x^2 + y^2 + z^2)\, dV$ where $B = [0,1]^3$.
2. Use cylindrical coordinates to compute the mass of a cone $z = \sqrt{x^2 + y^2}$,
   $z \leq 3$, with density $\rho = z$.
3. Use spherical coordinates to compute $\iiint_E e^{(x^2+y^2+z^2)^{3/2}}\, dV$
   where $E$ is the unit ball.
