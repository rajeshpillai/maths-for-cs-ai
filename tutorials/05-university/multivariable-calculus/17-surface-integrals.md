# Surface Integrals

## Intuition
A line integral sums along a curve. A **surface integral** sums over a surface
in 3D space. There are two types: integrating a scalar function over a surface
(like finding the total mass of a curved metal sheet with varying density), and
integrating a vector field through a surface (measuring total **flux** — how much
"stuff" passes through). In games, flux through surfaces models light hitting
objects (irradiance). In ML, surface integrals appear in physics-informed neural
networks solving PDEs with boundary conditions.

## Prerequisites
- Tier 12, Lesson 14 — Line integrals (parametric integration)
- Tier 12, Lesson 2 — Arc length and curvature (parametric surfaces extend curves)

## From First Principles

### Parametric Surfaces

A surface $S$ in $\mathbb{R}^3$ can be parametrised by two parameters:

$$\mathbf{r}(u, v) = (x(u,v),\, y(u,v),\, z(u,v)), \quad (u,v) \in D$$

where $D$ is a region in the $uv$-plane.

**Examples:**
- Plane: $\mathbf{r}(u,v) = \mathbf{a} + u\,\mathbf{b} + v\,\mathbf{c}$
- Sphere of radius $R$: $\mathbf{r}(\theta,\phi) = (R\sin\phi\cos\theta,\, R\sin\phi\sin\theta,\, R\cos\phi)$
- Cylinder: $\mathbf{r}(\theta, z) = (R\cos\theta,\, R\sin\theta,\, z)$

### The Surface Area Element

The tangent vectors to the surface are:

$$\mathbf{r}_u = \frac{\partial \mathbf{r}}{\partial u}, \quad \mathbf{r}_v = \frac{\partial \mathbf{r}}{\partial v}$$

The **normal vector** to the surface is their cross product:

$$\mathbf{n} = \mathbf{r}_u \times \mathbf{r}_v$$

The area of a tiny patch is $\|\mathbf{r}_u \times \mathbf{r}_v\|\, du\, dv$, so:

$$dS = \|\mathbf{r}_u \times \mathbf{r}_v\|\, du\, dv$$

### Scalar Surface Integral

$$\iint_S f\, dS = \iint_D f(\mathbf{r}(u,v)) \, \|\mathbf{r}_u \times \mathbf{r}_v\|\, du\, dv$$

### Pen & Paper Example 1: Surface Area of a Sphere

Parametrise: $\mathbf{r}(\theta,\phi) = (R\sin\phi\cos\theta, R\sin\phi\sin\theta, R\cos\phi)$,
$\theta \in [0,2\pi]$, $\phi \in [0,\pi]$.

**Step 1.** Tangent vectors:

$$\mathbf{r}_\theta = (-R\sin\phi\sin\theta,\, R\sin\phi\cos\theta,\, 0)$$

$$\mathbf{r}_\phi = (R\cos\phi\cos\theta,\, R\cos\phi\sin\theta,\, -R\sin\phi)$$

**Step 2.** Cross product $\mathbf{r}_\theta \times \mathbf{r}_\phi$:

$$= (-R^2\sin^2\phi\cos\theta,\, -R^2\sin^2\phi\sin\theta,\, -R^2\sin\phi\cos\phi)$$

**Step 3.** Magnitude:

$$\|\mathbf{r}_\theta \times \mathbf{r}_\phi\| = R^2\sin\phi \sqrt{\sin^2\phi(\cos^2\theta+\sin^2\theta) + \cos^2\phi} = R^2\sin\phi$$

(using $\sin\phi \geq 0$ for $\phi \in [0,\pi]$)

**Step 4.** Integrate:

$$\text{Area} = \int_0^{2\pi}\int_0^{\pi} R^2\sin\phi\, d\phi\, d\theta = R^2 \cdot 2\pi \cdot 2 = 4\pi R^2 \checkmark$$

### Flux Integral (Vector Surface Integral)

The **flux** of $\mathbf{F}$ through $S$ is:

$$\iint_S \mathbf{F} \cdot d\mathbf{S} = \iint_S \mathbf{F} \cdot \mathbf{n}\, dS = \iint_D \mathbf{F}(\mathbf{r}(u,v)) \cdot (\mathbf{r}_u \times \mathbf{r}_v)\, du\, dv$$

Note: we use the signed cross product (not its magnitude), so orientation matters.

### Pen & Paper Example 2: Flux Through a Plane

Compute the flux of $\mathbf{F} = (0, 0, z)$ through the square $S$ in the plane
$z = 3$, $0 \leq x \leq 1$, $0 \leq y \leq 1$, with upward normal.

**Step 1.** Parametrise: $\mathbf{r}(u,v) = (u, v, 3)$, $(u,v) \in [0,1]^2$.

**Step 2.** $\mathbf{r}_u = (1,0,0)$, $\mathbf{r}_v = (0,1,0)$.

**Step 3.** $\mathbf{r}_u \times \mathbf{r}_v = (0,0,1)$ — upward normal. $\checkmark$

**Step 4.** $\mathbf{F}(\mathbf{r}(u,v)) = (0, 0, 3)$.

**Step 5.** $(0,0,3) \cdot (0,0,1) = 3$.

**Step 6.** $\iint_{[0,1]^2} 3\, du\, dv = 3$.

### Special Case: $z = g(x,y)$

If the surface is a graph $z = g(x,y)$, then $\mathbf{r}(x,y) = (x, y, g(x,y))$ and:

$$dS = \sqrt{1 + \left(\frac{\partial g}{\partial x}\right)^2 + \left(\frac{\partial g}{\partial y}\right)^2}\, dx\, dy$$

$$\mathbf{r}_x \times \mathbf{r}_y = \left(-\frac{\partial g}{\partial x},\, -\frac{\partial g}{\partial y},\, 1\right)$$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(14, 6))

# Left: sphere with normal vectors
ax1 = fig.add_subplot(121, projection='3d')
R = 2
theta = np.linspace(0, 2*np.pi, 30)
phi = np.linspace(0, np.pi, 20)
Theta, Phi = np.meshgrid(theta, phi)
X = R * np.sin(Phi) * np.cos(Theta)
Y = R * np.sin(Phi) * np.sin(Theta)
Z = R * np.cos(Phi)
ax1.plot_surface(X, Y, Z, alpha=0.3, color='lightblue', edgecolor='gray', linewidth=0.2)

# Normal vectors at selected points
for th in [0, np.pi/2, np.pi, 3*np.pi/2]:
    for ph in [np.pi/4, np.pi/2, 3*np.pi/4]:
        px = R * np.sin(ph) * np.cos(th)
        py = R * np.sin(ph) * np.sin(th)
        pz = R * np.cos(ph)
        # Outward normal = (px, py, pz) / R
        scale = 0.5
        ax1.quiver(px, py, pz, px*scale/R, py*scale/R, pz*scale/R,
                  color='red', arrow_length_ratio=0.3, linewidth=1.5)

ax1.set_xlabel('x'); ax1.set_ylabel('y'); ax1.set_zlabel('z')
ax1.set_title(f'Sphere (R={R}) with outward normals\nSurface area = 4πR² = {4*np.pi*R**2:.2f}')

# Right: flux through a flat surface
ax2 = fig.add_subplot(122, projection='3d')
# The square z=3
u = np.linspace(0, 1, 5)
v = np.linspace(0, 1, 5)
U, V = np.meshgrid(u, v)
Z_plane = 3 * np.ones_like(U)
ax2.plot_surface(U, V, Z_plane, alpha=0.4, color='lightgreen', edgecolor='gray')

# Flux arrows (F = (0,0,z) = (0,0,3) on the surface)
for ui in [0.25, 0.5, 0.75]:
    for vi in [0.25, 0.5, 0.75]:
        ax2.quiver(ui, vi, 3, 0, 0, 0.5, color='blue',
                  arrow_length_ratio=0.3, linewidth=1.5)

ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')
ax2.set_title('Flux of F=(0,0,z) through\nsquare at z=3: flux = 3')
ax2.set_zlim(0, 5)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate
import sympy as sp

# === Example 1: Surface area of sphere R=2 ===
R_val = 2
def sphere_area_integrand(phi, theta):
    return R_val**2 * np.sin(phi)

area, _ = integrate.dblquad(sphere_area_integrand, 0, 2*np.pi, 0, np.pi)
print("=== Surface area of sphere R=2 ===")
print(f"Numerical: {area:.6f}")
print(f"Exact: 4πR² = {4*np.pi*R_val**2:.6f}")

# === Example 2: Flux of F=(0,0,z) through z=3 square ===
# F.n = (0,0,3).(0,0,1) = 3 everywhere
flux, _ = integrate.dblquad(lambda v, u: 3.0, 0, 1, 0, 1)
print(f"\n=== Flux through z=3 square ===")
print(f"Numerical: {flux:.6f}")
print(f"Exact: 3.0")

# === Example 3: Surface integral of f=z over upper hemisphere ===
# f(r(theta,phi)) = R*cos(phi), dS = R^2*sin(phi)
def hemisphere_integrand(phi, theta):
    return R_val * np.cos(phi) * R_val**2 * np.sin(phi)

result, _ = integrate.dblquad(hemisphere_integrand, 0, 2*np.pi, 0, np.pi/2)
print(f"\n=== Integral of z over upper hemisphere (R={R_val}) ===")
print(f"Numerical: {result:.6f}")
# Exact: R^3 * 2pi * int_0^{pi/2} sin(phi)cos(phi) dphi
# = R^3 * 2pi * 1/2 = pi*R^3
print(f"Exact: πR³ = {np.pi*R_val**3:.6f}")

# === Symbolic: cross product for sphere parametrisation ===
theta_s, phi_s, R_s = sp.symbols('theta phi R', positive=True)
r_vec = sp.Matrix([
    R_s*sp.sin(phi_s)*sp.cos(theta_s),
    R_s*sp.sin(phi_s)*sp.sin(theta_s),
    R_s*sp.cos(phi_s)
])
r_theta = r_vec.diff(theta_s)
r_phi = r_vec.diff(phi_s)
cross = r_theta.cross(r_phi)
magnitude = sp.sqrt(cross.dot(cross)).simplify()
print(f"\n=== Symbolic: |r_θ × r_φ| ===")
print(f"= {magnitude}")
```

## Connection to CS / Games / AI / Business / Industry
- **Rendering equation**: the total light leaving a surface point integrates
  incoming radiance over the hemisphere — a surface integral
- **Computational fluid dynamics**: flux through control surfaces determines mass
  and energy balance in finite volume methods
- **Physics-informed ML**: neural networks solving PDEs often enforce boundary
  conditions via surface integrals
- **Computer vision**: surface reconstruction from point clouds requires computing
  normals and areas — the building blocks of surface integrals
- **Gauss's law**: the electric flux through a closed surface equals the enclosed
  charge — the basis for electrostatic solvers in physics engines
- **Boeing 787 wing surface design**: surface integrals of pressure $\iint_S
  p\, \mathbf{n}\, dS$ over the wing skin compute total lift and drag in
  ANSYS Fluent CFD; saved Boeing $\sim$$300M$/year in fuel modelling for the
  787 fleet relative to the 767
- **Solar panel installation tilt analysis**: NREL's PVWatts and Tesla Solar
  use surface integrals over panel arrays to compute irradiance at varying
  azimuth/tilt — informs sales quotes for residential and utility-scale
  installations like Crescent Dunes
- **Heat exchanger design at Alfa Laval**: total heat transfer is
  $Q = \iint_S h(T_\text{wall} - T_\text{fluid})\, dS$ over plate or tube
  surfaces — sizes condensers for nuclear plants like Vogtle Units 3 and 4
  and refrigeration in Carrier and Daikin systems
- **Building envelope energy audit**: ASHRAE 90.1 and BREEAM use surface
  integrals of $U \cdot \Delta T$ over wall, roof, and window areas to
  certify net-zero designs — drives green-building incentives across LEED
  Platinum projects

## Check Your Understanding
1. Compute the surface area of the paraboloid $z = x^2 + y^2$ for $z \leq 4$.
2. Find the flux of $\mathbf{F} = (x, y, z)$ through the sphere $x^2+y^2+z^2 = R^2$
   with outward normal. (Hint: on the sphere, $\mathbf{F} \cdot \mathbf{n} = R$.)
3. Parametrise the cylinder $x^2 + y^2 = 1$, $0 \leq z \leq 2$, and compute
   $\iint_S z\, dS$.
