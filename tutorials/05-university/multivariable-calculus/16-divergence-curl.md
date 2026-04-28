# Divergence and Curl

## Intuition
Divergence and curl are two ways to measure how a vector field behaves locally.
**Divergence** measures whether stuff is spreading out (source) or converging in
(sink) at a point — like water flowing out of a sprinkler (positive divergence)
or into a drain (negative divergence). **Curl** measures how much the field
rotates around a point — like a tiny paddle wheel spinning in a current. In ML,
divergence appears in normalizing flows (tracking volume changes), while curl-free
fields correspond to conservative gradient fields used in optimisation.

## Prerequisites
- Tier 12, Lesson 13 — Vector fields (gradient, conservative fields, potential functions)

## From First Principles

### Divergence: The Source/Sink Rate

For a 3D vector field $\mathbf{F} = P\,\mathbf{i} + Q\,\mathbf{j} + R\,\mathbf{k}$:

$$\text{div}\,\mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$$

**Meaning:** the divergence at a point is the rate at which "stuff" flows out
of an infinitesimal box around that point per unit volume. Positive = source,
negative = sink, zero = incompressible flow.

**Why this formula?** Consider a tiny box $[x, x+dx] \times [y, y+dy] \times [z, z+dz]$.
The net flux out through the $x$-faces is approximately
$[P(x+dx,y,z) - P(x,y,z)] \cdot dy\,dz \approx \frac{\partial P}{\partial x}\, dx\,dy\,dz$.
Adding all three pairs of faces and dividing by the box volume $dx\,dy\,dz$
gives $\frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y} + \frac{\partial R}{\partial z}$.

### Pen & Paper Example 1: Divergence

Compute $\text{div}\,\mathbf{F}$ for $\mathbf{F} = (x^2, y^2, z^2)$.

$$\text{div}\,\mathbf{F} = \frac{\partial}{\partial x}(x^2) + \frac{\partial}{\partial y}(y^2) + \frac{\partial}{\partial z}(z^2) = 2x + 2y + 2z$$

At origin: $\text{div} = 0$ (no net source). At $(1,1,1)$: $\text{div} = 6$
(strong source).

### Curl: The Rotation Rate

$$\text{curl}\,\mathbf{F} = \nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \frac{\partial}{\partial x} & \frac{\partial}{\partial y} & \frac{\partial}{\partial z} \\ P & Q & R \end{vmatrix}$$

Expanding:

$$\nabla \times \mathbf{F} = \left(\frac{\partial R}{\partial y} - \frac{\partial Q}{\partial z}\right)\mathbf{i} + \left(\frac{\partial P}{\partial z} - \frac{\partial R}{\partial x}\right)\mathbf{j} + \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\mathbf{k}$$

**Meaning:** the curl at a point gives the axis and rate of rotation. If you
place a tiny paddle wheel in the flow, it spins around the axis $\nabla \times \mathbf{F}$
with angular speed proportional to $\|\nabla \times \mathbf{F}\|$.

### Pen & Paper Example 2: Curl

Compute $\nabla \times \mathbf{F}$ for $\mathbf{F} = (-y, x, 0)$ (rigid rotation
about $z$-axis).

$$\nabla \times \mathbf{F} = \left(\frac{\partial(0)}{\partial y} - \frac{\partial(x)}{\partial z}\right)\mathbf{i} + \left(\frac{\partial(-y)}{\partial z} - \frac{\partial(0)}{\partial x}\right)\mathbf{j} + \left(\frac{\partial(x)}{\partial x} - \frac{\partial(-y)}{\partial y}\right)\mathbf{k}$$

$$= (0)\mathbf{i} + (0)\mathbf{j} + (1 + 1)\mathbf{k} = 2\,\mathbf{k}$$

The curl points along $+z$ with magnitude 2, confirming counterclockwise rotation
in the $xy$-plane.

### Key Identities

1. **curl of a gradient is zero:** $\nabla \times (\nabla \phi) = \mathbf{0}$ always.
   This is why conservative fields have zero curl.

2. **divergence of a curl is zero:** $\nabla \cdot (\nabla \times \mathbf{F}) = 0$ always.
   Curl fields are always incompressible.

3. **Laplacian:** $\nabla \cdot (\nabla \phi) = \nabla^2 \phi = \frac{\partial^2 \phi}{\partial x^2} + \frac{\partial^2 \phi}{\partial y^2} + \frac{\partial^2 \phi}{\partial z^2}$

### Pen & Paper Example 3: Verify Identities

Let $\phi = x^2 y + z^3$. Then $\nabla\phi = (2xy, x^2, 3z^2)$.

$$\nabla \times (\nabla\phi) = \left(\frac{\partial(3z^2)}{\partial y} - \frac{\partial(x^2)}{\partial z}\right)\mathbf{i} + \cdots = (0-0)\mathbf{i} + (2x - 0 - ?)\ldots$$

Let us compute carefully:
- $\mathbf{i}$: $\frac{\partial(3z^2)}{\partial y} - \frac{\partial(x^2)}{\partial z} = 0 - 0 = 0$
- $\mathbf{j}$: $\frac{\partial(2xy)}{\partial z} - \frac{\partial(3z^2)}{\partial x} = 0 - 0 = 0$
- $\mathbf{k}$: $\frac{\partial(x^2)}{\partial x} - \frac{\partial(2xy)}{\partial y} = 2x - 2x = 0$

$\nabla \times (\nabla\phi) = \mathbf{0}$. $\checkmark$

### 2D Divergence and Curl

In 2D, for $\mathbf{F} = (P, Q)$:
- $\text{div}\,\mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y}$ (scalar)
- $\text{curl}\,\mathbf{F} = \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}$ (scalar, the $z$-component of the 3D curl)

Note: the 2D curl is exactly what appears in Green's theorem.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(17, 5))

x = np.linspace(-2, 2, 10)
y = np.linspace(-2, 2, 10)
X, Y = np.meshgrid(x, y)

# Panel 1: Positive divergence (source) — F = (x, y)
ax1 = axes[0]
U1, V1 = X, Y
ax1.quiver(X, Y, U1, V1, color='red', alpha=0.7)
ax1.set_title('div F = 2 (source)\nF = (x, y)')
ax1.set_xlabel('x'); ax1.set_ylabel('y')
ax1.set_aspect('equal'); ax1.grid(True, alpha=0.3)
# Add a "source" marker
ax1.plot(0, 0, 'r*', markersize=15)
ax1.text(0.2, -0.5, 'source', fontsize=10, color='red')

# Panel 2: Pure curl — F = (-y, x)
ax2 = axes[1]
U2, V2 = -Y, X
ax2.quiver(X, Y, U2, V2, color='blue', alpha=0.7)
ax2.set_title('curl F = 2k (rotation)\nF = (-y, x)')
ax2.set_xlabel('x'); ax2.set_ylabel('y')
ax2.set_aspect('equal'); ax2.grid(True, alpha=0.3)
# Add a rotation symbol
theta_circ = np.linspace(0, 1.8*np.pi, 50)
ax2.plot(0.3*np.cos(theta_circ), 0.3*np.sin(theta_circ), 'b-', linewidth=2)
ax2.annotate('', xy=(0.3*np.cos(1.8*np.pi), 0.3*np.sin(1.8*np.pi)),
            xytext=(0.3*np.cos(1.6*np.pi), 0.3*np.sin(1.6*np.pi)),
            arrowprops=dict(arrowstyle='->', color='blue', lw=2))

# Panel 3: Sink — F = (-x, -y)
ax3 = axes[2]
U3, V3 = -X, -Y
ax3.quiver(X, Y, U3, V3, color='green', alpha=0.7)
ax3.set_title('div F = -2 (sink)\nF = (-x, -y)')
ax3.set_xlabel('x'); ax3.set_ylabel('y')
ax3.set_aspect('equal'); ax3.grid(True, alpha=0.3)
ax3.plot(0, 0, 'g*', markersize=15)
ax3.text(0.2, -0.5, 'sink', fontsize=10, color='green')

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import sympy as sp

x, y, z = sp.symbols('x y z')

# === Example 1: div F for F = (x^2, y^2, z^2) ===
P, Q, R = x**2, y**2, z**2
div_F = sp.diff(P, x) + sp.diff(Q, y) + sp.diff(R, z)
print("=== Divergence of (x², y², z²) ===")
print(f"div F = {div_F}")
print(f"At (1,1,1): {div_F.subs([(x,1),(y,1),(z,1)])}")

# === Example 2: curl F for F = (-y, x, 0) ===
P2, Q2, R2 = -y, x, 0
curl_i = sp.diff(R2, y) - sp.diff(Q2, z)
curl_j = sp.diff(P2, z) - sp.diff(R2, x)
curl_k = sp.diff(Q2, x) - sp.diff(P2, y)
print(f"\n=== Curl of (-y, x, 0) ===")
print(f"curl F = ({curl_i})i + ({curl_j})j + ({curl_k})k")

# === Identity: curl of gradient is zero ===
phi = x**2 * y + z**3
grad = [sp.diff(phi, var) for var in [x, y, z]]
print(f"\n=== Identity: curl(grad phi) = 0 ===")
print(f"phi = {phi}")
print(f"grad phi = {grad}")
curl_grad_i = sp.diff(grad[2], y) - sp.diff(grad[1], z)
curl_grad_j = sp.diff(grad[0], z) - sp.diff(grad[2], x)
curl_grad_k = sp.diff(grad[1], x) - sp.diff(grad[0], y)
print(f"curl(grad phi) = ({curl_grad_i}, {curl_grad_j}, {curl_grad_k})")

# === Identity: div of curl is zero ===
F3 = (x*y*z, x**2*z, y**2*x)
curl3_i = sp.diff(F3[2], y) - sp.diff(F3[1], z)
curl3_j = sp.diff(F3[0], z) - sp.diff(F3[2], x)
curl3_k = sp.diff(F3[1], x) - sp.diff(F3[0], y)
div_curl = sp.diff(curl3_i, x) + sp.diff(curl3_j, y) + sp.diff(curl3_k, z)
print(f"\n=== Identity: div(curl F) = 0 ===")
print(f"F = {F3}")
print(f"curl F = ({curl3_i}, {curl3_j}, {curl3_k})")
print(f"div(curl F) = {sp.simplify(div_curl)}")

# === Laplacian ===
laplacian = sp.diff(phi, x, 2) + sp.diff(phi, y, 2) + sp.diff(phi, z, 2)
print(f"\n=== Laplacian of {phi} ===")
print(f"∇²φ = {laplacian}")
```

## Connection to CS / Games / AI / Business / Industry
- **Fluid simulation**: the Navier-Stokes equations use divergence (incompressibility:
  $\nabla \cdot \mathbf{v} = 0$) and curl (vorticity $\boldsymbol{\omega} = \nabla \times \mathbf{v}$)
- **Normalizing flows**: the change in log-probability under a transformation involves
  the divergence of the velocity field: $\frac{d}{dt}\log p = -\text{div}(\mathbf{v})$
- **Electromagnetism**: Maxwell's equations are statements about divergence and curl
  of electric and magnetic fields
- **Score matching**: in diffusion models, the score function $\nabla \log p$ is a
  gradient field (curl-free), which constrains the network architecture
- **Helmholtz decomposition**: any vector field = curl-free part + divergence-free part;
  this decomposition separates irrotational flow from vortices in simulation
- **Pixar and Industrial Light & Magic fluid sims**: Houdini's FLIP solver and
  Pixar's Presto enforce $\nabla \cdot \mathbf{v} = 0$ via pressure-projection
  to produce believable water in *Finding Dory* and *Moana* — divergence is
  literally the "leak detector" of CG fluids
- **MRI gradient encoding**: Siemens MAGNETOM and GE SIGNA enforce $\nabla
  \cdot \mathbf{B} = 0$ on shimmed magnetic fields; failure to maintain this
  produces phase-encoding artefacts visible to radiologists at Mayo Clinic
- **Wind-turbine wake vorticity**: Vestas, Siemens Gamesa, and GE Renewable
  use vorticity ($\nabla \times \mathbf{v}$) to model tip-vortex roll-up
  behind blades — wake recovery distance feeds offshore-farm power forecasts
  for Ørsted's Hornsea and Dogger Bank arrays
- **Power-system stability**: ABB and GE Vernova use divergence/curl analogues
  on the AC power-flow vector field to detect voltage-collapse precursors —
  feeds situational awareness at PJM and ERCOT control rooms

## Check Your Understanding
1. Compute div and curl for $\mathbf{F} = (xz, yz, xy)$.
2. Show that $\mathbf{F} = (y^2 z, 2xyz, xy^2)$ is both divergence-free and curl-free.
   What does this mean physically?
3. The Laplacian $\nabla^2 \phi = 0$ defines **harmonic functions**. Verify that
   $\phi = \frac{1}{\sqrt{x^2+y^2+z^2}}$ satisfies this away from the origin.
