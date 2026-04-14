# Change of Variables in Multiple Integrals

## Intuition
When you substitute $u = g(x)$ in a single integral, you multiply by $|g'(x)|$
to account for stretching. In multiple dimensions, the **Jacobian determinant**
plays the same role — it measures how much a transformation stretches or squishes
area (2D) or volume (3D) at each point. This is why polar coordinates need the
factor $r$ and spherical coordinates need $\rho^2 \sin\phi$: they are Jacobian
determinants. In ML, the Jacobian appears in normalizing flows, where you transform
a simple distribution into a complex one and need to track how probability density
changes.

## Prerequisites
- Tier 12, Lesson 11 — Triple integrals (cylindrical and spherical coordinates)
- Tier 3, Lesson 5 — Jacobian matrix
- Tier 2, Lesson 7 — Determinants

## From First Principles

### The 1D Case: Review

For $x = g(u)$:

$$\int_a^b f(x)\, dx = \int_{g^{-1}(a)}^{g^{-1}(b)} f(g(u)) \, |g'(u)|\, du$$

The factor $|g'(u)|$ is the 1D Jacobian — it tells you how much a tiny interval
$du$ gets stretched when mapped to $dx$.

### The 2D Change of Variables Formula

Let $T: (u,v) \mapsto (x,y)$ where $x = x(u,v)$ and $y = y(u,v)$. The
**Jacobian matrix** is:

$$J = \begin{pmatrix} \frac{\partial x}{\partial u} & \frac{\partial x}{\partial v} \\ \frac{\partial y}{\partial u} & \frac{\partial y}{\partial v} \end{pmatrix}$$

The **Jacobian determinant** is:

$$\frac{\partial(x,y)}{\partial(u,v)} = \det(J) = \frac{\partial x}{\partial u}\frac{\partial y}{\partial v} - \frac{\partial x}{\partial v}\frac{\partial y}{\partial u}$$

**Change of Variables Theorem (2D):**

$$\iint_R f(x,y)\, dA = \iint_S f(x(u,v),\, y(u,v)) \left|\frac{\partial(x,y)}{\partial(u,v)}\right|\, du\, dv$$

where $S$ is the region in the $uv$-plane that maps to $R$.

### Why the Absolute Value?

A tiny rectangle $du \times dv$ in the $uv$-plane maps to a parallelogram in
$xy$-space. The area of that parallelogram is $|\det(J)| \cdot du\, dv$. The
determinant can be negative (orientation-reversing), but area is always positive.

### Pen & Paper Example 1: Deriving Polar Coordinates

Transformation: $x = r\cos\theta$, $y = r\sin\theta$.

$$J = \begin{pmatrix} \cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta \end{pmatrix}$$

$$\det(J) = r\cos^2\theta + r\sin^2\theta = r$$

So $dA = |r|\, dr\, d\theta = r\, dr\, d\theta$ (since $r \geq 0$). This is
exactly the factor we used in polar double integrals. $\checkmark$

### Pen & Paper Example 2: A Shear Transformation

Evaluate $\iint_R 1\, dA$ where $R$ is the parallelogram with vertices
$(0,0)$, $(2,1)$, $(3,3)$, $(1,2)$.

**Step 1.** Find a transformation that maps a rectangle to this parallelogram.
Set $x = 2u + v$, $y = u + 2v$. Check: $(u,v) = (0,0) \to (0,0)$,
$(1,0) \to (2,1)$, $(0,1) \to (1,2)$, $(1,1) \to (3,3)$. $\checkmark$

**Step 2.** Compute Jacobian:

$$J = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}, \quad \det(J) = 4 - 1 = 3$$

**Step 3.** The rectangle $S = [0,1] \times [0,1]$ maps to $R$:

$$\text{Area} = \iint_S |3|\, du\, dv = 3 \cdot 1 = 3$$

### The 3D Change of Variables Formula

For $T: (u,v,w) \mapsto (x,y,z)$:

$$\iiint_E f\, dV = \iiint_S f(x(u,v,w),\ldots) \left|\frac{\partial(x,y,z)}{\partial(u,v,w)}\right|\, du\, dv\, dw$$

### Pen & Paper Example 3: Deriving Spherical Jacobian

$x = \rho\sin\phi\cos\theta$, $y = \rho\sin\phi\sin\theta$, $z = \rho\cos\phi$.

The Jacobian matrix is $3 \times 3$. Computing the determinant (expand along
the third row):

$$\det(J) = \rho^2 \sin\phi$$

This confirms the spherical volume element $dV = \rho^2 \sin\phi\, d\rho\, d\phi\, d\theta$.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 6))

# Left: original uv-grid (unit square)
ax1 = axes[0]
u = np.linspace(0, 1, 6)
v = np.linspace(0, 1, 6)

for ui in u:
    ax1.plot([ui, ui], [0, 1], 'b-', linewidth=0.8)
for vi in v:
    ax1.plot([0, 1], [vi, vi], 'b-', linewidth=0.8)

ax1.set_xlim(-0.2, 1.5)
ax1.set_ylim(-0.2, 1.5)
ax1.set_xlabel('u')
ax1.set_ylabel('v')
ax1.set_title('Original grid in (u,v) space\nUnit square')
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)

# Right: transformed grid under x=2u+v, y=u+2v
ax2 = axes[1]
for ui in u:
    xs = 2*ui + v
    ys = ui + 2*v
    ax2.plot(xs, ys, 'r-', linewidth=0.8)
for vi in v:
    xs = 2*u + vi
    ys = u + 2*vi
    ax2.plot(xs, ys, 'r-', linewidth=0.8)

# Highlight the parallelogram boundary
corners_u = [0, 1, 1, 0, 0]
corners_v = [0, 0, 1, 1, 0]
cx = [2*cu + cv for cu, cv in zip(corners_u, corners_v)]
cy = [cu + 2*cv for cu, cv in zip(corners_u, corners_v)]
ax2.plot(cx, cy, 'k-', linewidth=2.5)

ax2.set_xlim(-0.5, 4)
ax2.set_ylim(-0.5, 4)
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('Transformed grid in (x,y) space\nx=2u+v, y=u+2v, det(J)=3')
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate
import sympy as sp

# === Symbolic: verify Jacobian for polar coordinates ===
r, theta = sp.symbols('r theta', positive=True)
x_polar = r * sp.cos(theta)
y_polar = r * sp.sin(theta)

J_polar = sp.Matrix([
    [sp.diff(x_polar, r), sp.diff(x_polar, theta)],
    [sp.diff(y_polar, r), sp.diff(y_polar, theta)]
])
det_polar = J_polar.det().simplify()
print("=== Polar Jacobian ===")
print(f"Jacobian matrix:\n{J_polar}")
print(f"Determinant: {det_polar}")

# === Symbolic: verify Jacobian for spherical coordinates ===
rho, phi = sp.symbols('rho phi', positive=True)
x_sph = rho * sp.sin(phi) * sp.cos(theta)
y_sph = rho * sp.sin(phi) * sp.sin(theta)
z_sph = rho * sp.cos(phi)

J_sph = sp.Matrix([
    [sp.diff(x_sph, rho), sp.diff(x_sph, phi), sp.diff(x_sph, theta)],
    [sp.diff(y_sph, rho), sp.diff(y_sph, phi), sp.diff(y_sph, theta)],
    [sp.diff(z_sph, rho), sp.diff(z_sph, phi), sp.diff(z_sph, theta)]
])
det_sph = J_sph.det().simplify()
print(f"\n=== Spherical Jacobian ===")
print(f"Determinant: {det_sph}")
# Should simplify to rho^2 * sin(phi)

# === Numerical: area of parallelogram via change of variables ===
# Direct: area = |det(J)| * area of unit square = 3 * 1 = 3
print(f"\n=== Parallelogram area ===")
J_shear = np.array([[2, 1], [1, 2]])
print(f"det(J) = {np.linalg.det(J_shear):.1f}")
print(f"Area = |det(J)| * 1 = {abs(np.linalg.det(J_shear)):.1f}")

# Cross-check with shoelace formula
verts = np.array([[0,0], [2,1], [3,3], [1,2]])
n = len(verts)
area_shoelace = 0.5 * abs(sum(
    verts[i][0]*verts[(i+1)%n][1] - verts[(i+1)%n][0]*verts[i][1]
    for i in range(n)
))
print(f"Shoelace area: {area_shoelace:.1f}")
```

## Connection to CS / Games / AI
- **Normalizing flows**: a neural network learns an invertible transformation
  $T$ of a simple distribution; the log-likelihood includes $\log|\det(J_T)|$,
  making Jacobians central to training
- **Texture mapping**: mapping a 2D texture onto a 3D surface uses a coordinate
  transformation; the Jacobian determines how texels stretch or compress
- **Physics simulation**: switching between coordinate systems (Cartesian to
  cylindrical for pipe flow) requires the correct Jacobian to preserve integrals
- **Probability density transformation**: if $Y = g(X)$, then
  $f_Y(y) = f_X(g^{-1}(y)) \cdot |det(J_{g^{-1}})|$; this is the multivariate
  change-of-variables formula for densities, used throughout Bayesian ML
- **Volume rendering**: converting integrals to spherical coords for radiance
  computations requires the $\rho^2 \sin\phi$ Jacobian

## Check Your Understanding
1. Compute the Jacobian determinant for the transformation $x = u^2 - v^2$,
   $y = 2uv$. What well-known function does this relate to?
2. Use the substitution $u = x + y$, $v = x - y$ to evaluate
   $\iint_R e^{(x+y)/(x-y)}\, dA$ where $R$ is the square with vertices
   $(1,0)$, $(0,1)$, $(-1,0)$, $(0,-1)$.
3. Derive the Jacobian determinant for cylindrical coordinates directly from the
   $3 \times 3$ Jacobian matrix.
