# The Divergence Theorem (Gauss's Theorem)

## Intuition
The divergence theorem says: "the total flux of a vector field out through a
closed surface equals the total divergence inside the volume." Think of it as a
3D accounting identity — the net stuff leaving through the walls equals the net
stuff being produced inside. If you have a room full of air freshener sprayers
(positive divergence), the total scent escaping through the walls equals the
total spraying rate inside. In ML, this principle underlies probability
conservation in continuous normalizing flows.

## Prerequisites
- Tier 12, Lesson 16 — Divergence and curl (computing div F)
- Tier 12, Lesson 17 — Surface integrals (flux through surfaces)

## From First Principles

### Statement of the Divergence Theorem

Let $E$ be a solid region bounded by a closed surface $S$ (oriented with
outward normal). If $\mathbf{F}$ has continuous partial derivatives, then:

$$\oiint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_E (\nabla \cdot \mathbf{F})\, dV$$

**Left side:** total outward flux through the boundary surface.
**Right side:** total divergence accumulated in the interior volume.

### The Three Big Theorems — Unified View

| Theorem | Boundary integral | = | Interior integral |
|---------|------------------|---|-------------------|
| Green's (2D) | $\oint_C \mathbf{F} \cdot d\mathbf{r}$ | = | $\iint_D (\text{curl}\,\mathbf{F})\, dA$ |
| Stokes' (3D) | $\oint_C \mathbf{F} \cdot d\mathbf{r}$ | = | $\iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$ |
| Divergence | $\oiint_S \mathbf{F} \cdot d\mathbf{S}$ | = | $\iiint_E (\nabla \cdot \mathbf{F})\, dV$ |

All say: "integral over boundary = integral of a derivative over interior."

### Proof Sketch (for a Box)

For a box $[a,b] \times [c,d] \times [p,q]$, consider just the $P$ component:

$$\iiint_E \frac{\partial P}{\partial x}\, dV = \int_p^q \int_c^d \int_a^b \frac{\partial P}{\partial x}\, dx\, dy\, dz = \int_p^q \int_c^d [P(b,y,z) - P(a,y,z)]\, dy\, dz$$

The right face ($x = b$) has outward normal $(1,0,0)$, contributing
$\iint P(b,y,z)\, dy\, dz$. The left face ($x = a$) has outward normal $(-1,0,0)$,
contributing $-\iint P(a,y,z)\, dy\, dz$. Together: the $P$-flux through the
$x$-faces. Repeat for $Q$ and $R$ to get the full theorem.

### Pen & Paper Example 1: Direct Verification

Let $\mathbf{F} = (x, y, z)$ and $E$ be the unit cube $[0,1]^3$.

**Volume integral:**

$$\nabla \cdot \mathbf{F} = 1 + 1 + 1 = 3$$

$$\iiint_E 3\, dV = 3 \cdot 1 = 3$$

**Surface integral (6 faces):**

- Right ($x=1$, normal $(1,0,0)$): $\iint_0^1\int_0^1 1\, dy\, dz = 1$
- Left ($x=0$, normal $(-1,0,0)$): $\iint_0^1\int_0^1 0\, dy\, dz = 0$
- Top ($z=1$, normal $(0,0,1)$): $\iint_0^1\int_0^1 1\, dx\, dy = 1$
- Bottom ($z=0$, normal $(0,0,-1)$): $\iint_0^1\int_0^1 0\, dx\, dy = 0$
- Front ($y=1$, normal $(0,1,0)$): $\iint_0^1\int_0^1 1\, dx\, dz = 1$
- Back ($y=0$, normal $(0,-1,0)$): $\iint_0^1\int_0^1 0\, dx\, dz = 0$

**Total flux:** $1 + 0 + 1 + 0 + 1 + 0 = 3$. $\checkmark$

### Pen & Paper Example 2: Sphere

Compute the flux of $\mathbf{F} = (x^3, y^3, z^3)$ out of the sphere $x^2+y^2+z^2 = R^2$.

**Using the divergence theorem:**

$$\nabla \cdot \mathbf{F} = 3x^2 + 3y^2 + 3z^2 = 3(x^2+y^2+z^2) = 3\rho^2$$

Convert to spherical:

$$\iiint_E 3\rho^2 \cdot \rho^2\sin\phi\, d\rho\, d\phi\, d\theta = 3\int_0^{2\pi}\int_0^{\pi}\int_0^R \rho^4\sin\phi\, d\rho\, d\phi\, d\theta$$

$$= 3 \cdot 2\pi \cdot 2 \cdot \frac{R^5}{5} = \frac{12\pi R^5}{5}$$

**Direct surface integral would require** parametrising the sphere and computing
$\mathbf{F} \cdot \mathbf{n}$ over it — much harder. The divergence theorem
converted it to a routine triple integral.

### Pen & Paper Example 3: Physical Interpretation

A fluid has velocity field $\mathbf{v}(x,y,z) = (x, 2y, -3z)$.

$\nabla \cdot \mathbf{v} = 1 + 2 - 3 = 0$.

Since divergence is zero everywhere, the fluid is **incompressible**: the total
flux through any closed surface is zero. Whatever flows in must flow out.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(14, 6))

# Left: Unit cube with flux arrows on faces
ax1 = fig.add_subplot(121, projection='3d')

# Draw cube edges
from itertools import product, combinations
corners = np.array(list(product([0,1], [0,1], [0,1])))
for s, e in combinations(range(8), 2):
    diff = np.abs(corners[s] - corners[e])
    if np.sum(diff > 0) == 1:
        ax1.plot3D(*zip(corners[s], corners[e]), color='gray', linewidth=1, alpha=0.5)

# Flux arrows on the three "outward" faces
# Right face (x=1): F·n = 1
for yi in [0.25, 0.5, 0.75]:
    for zi in [0.25, 0.5, 0.75]:
        ax1.quiver(1, yi, zi, 0.2, 0, 0, color='red', arrow_length_ratio=0.3)

# Top face (z=1): F·n = 1
for xi in [0.25, 0.5, 0.75]:
    for yi in [0.25, 0.5, 0.75]:
        ax1.quiver(xi, yi, 1, 0, 0, 0.2, color='blue', arrow_length_ratio=0.3)

# Front face (y=1): F·n = 1
for xi in [0.25, 0.5, 0.75]:
    for zi in [0.25, 0.5, 0.75]:
        ax1.quiver(xi, 1, zi, 0, 0.2, 0, color='green', arrow_length_ratio=0.3)

ax1.set_xlabel('x'); ax1.set_ylabel('y'); ax1.set_zlabel('z')
ax1.set_title('Divergence Theorem: F=(x,y,z)\ndiv F=3, Total flux=3')
ax1.text(1.3, 0.5, 0.5, 'flux=1', color='red', fontsize=9)
ax1.text(0.5, 1.3, 0.5, 'flux=1', color='green', fontsize=9)
ax1.text(0.5, 0.5, 1.3, 'flux=1', color='blue', fontsize=9)

# Right: Sphere with outward flux arrows
ax2 = fig.add_subplot(122, projection='3d')

# Sphere surface
theta = np.linspace(0, 2*np.pi, 30)
phi = np.linspace(0, np.pi, 20)
Th, Ph = np.meshgrid(theta, phi)
R = 1
Xs = R * np.sin(Ph) * np.cos(Th)
Ys = R * np.sin(Ph) * np.sin(Th)
Zs = R * np.cos(Ph)
ax2.plot_surface(Xs, Ys, Zs, alpha=0.2, color='lightblue', edgecolor='gray', linewidth=0.2)

# Flux arrows at selected points
for th in np.linspace(0, 2*np.pi, 8, endpoint=False):
    for ph in [np.pi/4, np.pi/2, 3*np.pi/4]:
        px = np.sin(ph)*np.cos(th)
        py = np.sin(ph)*np.sin(th)
        pz = np.cos(ph)
        # F = (x^3, y^3, z^3), n = (x,y,z)/R on sphere
        # Arrow in outward normal direction, length proportional to F·n
        scale = 0.25
        ax2.quiver(px, py, pz, px*scale, py*scale, pz*scale,
                  color='red', arrow_length_ratio=0.3, linewidth=1)

ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')
ax2.set_title('Flux of F=(x³,y³,z³)\nthrough unit sphere')

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: F=(x,y,z), unit cube ===
# Volume integral of div F = 3
vol_int = integrate.tplquad(lambda z, y, x: 3.0, 0, 1, 0, 1, 0, 1)[0]

# Surface integral (sum of 6 faces)
# Right (x=1): F·n = 1
face_r = integrate.dblquad(lambda z, y: 1.0, 0, 1, 0, 1)[0]
# Left (x=0): F·n = 0
face_l = 0.0
# Top (z=1): F·n = 1
face_t = integrate.dblquad(lambda y, x: 1.0, 0, 1, 0, 1)[0]
# Bottom (z=0): F·n = 0
face_b = 0.0
# Front (y=1): F·n = 1
face_f = integrate.dblquad(lambda z, x: 1.0, 0, 1, 0, 1)[0]
# Back (y=0): F·n = 0
face_bk = 0.0
surf_int = face_r + face_l + face_t + face_b + face_f + face_bk

print("=== Divergence Theorem: F=(x,y,z), unit cube ===")
print(f"Volume integral (div F): {vol_int:.6f}")
print(f"Surface integral (flux): {surf_int:.6f}")
print(f"Equal: {abs(vol_int - surf_int) < 1e-10}")

# === Example 2: F=(x^3,y^3,z^3), sphere R=2 ===
R_val = 2
# Volume integral: div F = 3(x^2+y^2+z^2) = 3*rho^2
# In spherical: 3*rho^2 * rho^2*sin(phi) = 3*rho^4*sin(phi)
vol_sphere = integrate.tplquad(
    lambda rho, phi, theta: 3*rho**4*np.sin(phi),
    0, 2*np.pi,    # theta
    0, np.pi,      # phi
    0, R_val        # rho
)[0]
exact = 12*np.pi*R_val**5/5
print(f"\n=== Divergence Theorem: F=(x³,y³,z³), sphere R={R_val} ===")
print(f"Volume integral: {vol_sphere:.6f}")
print(f"Exact: 12πR⁵/5 = {exact:.6f}")

# === Example 3: Incompressible flow ===
print(f"\n=== Incompressible flow: v=(x, 2y, -3z) ===")
print(f"div v = 1 + 2 - 3 = 0")
print(f"Flux through ANY closed surface = 0")
# Verify: flux through unit sphere
flux_incomp = integrate.tplquad(
    lambda rho, phi, theta: 0 * rho**2 * np.sin(phi),  # div=0
    0, 2*np.pi, 0, np.pi, 0, 1
)[0]
print(f"Flux through unit sphere: {flux_incomp:.10f}")
```

## Connection to CS / Games / AI
- **Fluid simulation**: the continuity equation $\frac{\partial \rho}{\partial t} + \nabla \cdot (\rho \mathbf{v}) = 0$
  is the divergence theorem in differential form — mass is conserved
- **Normalizing flows**: the instantaneous change of log-density is
  $-\nabla \cdot \mathbf{v}$, derived from the divergence theorem applied to
  probability mass conservation
- **Gauss's law (electrostatics)**: $\oiint \mathbf{E} \cdot d\mathbf{S} = Q_{\text{enc}}/\epsilon_0$;
  physics engines use this to compute electric fields from charge distributions
- **Finite volume methods**: CFD solvers discretise the divergence theorem to
  track fluxes through cell faces — the fundamental update equation
- **Heat equation**: $\frac{\partial T}{\partial t} = k\nabla^2 T$ combines
  the divergence theorem with Fourier's law of heat conduction; physics-informed
  neural networks solve this

## Check Your Understanding
1. Use the divergence theorem to compute the flux of $\mathbf{F} = (x^2, y^2, z^2)$
   through the sphere $x^2+y^2+z^2 = 4$.
2. If $\nabla \cdot \mathbf{F} = 5$ everywhere inside a region of volume 7,
   what is the total outward flux through the boundary?
3. Explain why the divergence theorem implies that if $\nabla \cdot \mathbf{F} = 0$
   everywhere, then the flux through any closed surface is zero.
