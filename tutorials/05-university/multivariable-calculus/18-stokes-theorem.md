# Stokes' Theorem

## Intuition
Stokes' theorem is the 3D generalisation of Green's theorem. It says: "the
circulation of a vector field around a closed curve equals the flux of the curl
through any surface bounded by that curve." Picture a soap film spanning a wire
loop — the total swirl of a flow through the film equals the total push around
the wire. This is one of the most beautiful unifying results in mathematics,
connecting local rotation (curl) to global circulation (line integral).

## Prerequisites
- Tier 12, Lesson 15 — Green's theorem (the 2D special case)
- Tier 12, Lesson 17 — Surface integrals (flux integrals, parametric surfaces)

## From First Principles

### Statement of Stokes' Theorem

Let $S$ be an oriented, piecewise-smooth surface with boundary curve $C$
(oriented consistently with $S$ by the right-hand rule). If $\mathbf{F}$ has
continuous partial derivatives, then:

$$\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$$

**Left side:** circulation of $\mathbf{F}$ around the boundary curve.
**Right side:** flux of the curl of $\mathbf{F}$ through the surface.

### Connection to Green's Theorem

Green's theorem: $\oint_C P\,dx + Q\,dy = \iint_D \left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right) dA$.

This is Stokes' theorem with $S$ being a flat region $D$ in the $xy$-plane,
$\mathbf{F} = (P, Q, 0)$, and the "curl" reducing to
$\left(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\right)\mathbf{k}$.

### The Right-Hand Rule for Orientation

Point your right thumb in the direction of the surface normal $\mathbf{n}$. Your
fingers curl in the positive direction of $C$. If you choose the outward normal
on a surface, the boundary must be traversed counterclockwise (as viewed from
outside).

### Pen & Paper Example 1: Verify Stokes' Theorem

Let $\mathbf{F} = (z, x, y)$. Let $S$ be the part of the plane $x + y + z = 1$
in the first octant, with upward normal. $C$ is the triangular boundary.

**Step 1.** Compute curl:

$$\nabla \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ \partial_x & \partial_y & \partial_z \\ z & x & y \end{vmatrix} = (1-0)\mathbf{i} - (0-1)\mathbf{j} + (1-0)\mathbf{k} = (1, 1, 1)$$

**Step 2.** Surface integral. The plane $x+y+z=1$ has normal $\mathbf{n} = (1,1,1)/\sqrt{3}$.
Parametrise with $x,y$: $z = 1-x-y$, domain $D$: $x \geq 0$, $y \geq 0$, $x+y \leq 1$.

For a graph $z = g(x,y)$: $\mathbf{r}_x \times \mathbf{r}_y = (-g_x, -g_y, 1) = (1, 1, 1)$.

$$\iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S} = \iint_D (1,1,1) \cdot (1,1,1)\, dx\, dy = \iint_D 3\, dx\, dy$$

$$= 3 \cdot \text{Area}(D) = 3 \cdot \frac{1}{2} = \frac{3}{2}$$

**Step 3.** Line integral (verify). $C$ has three edges:

Edge 1: $(1,0,0) \to (0,1,0)$: $\mathbf{r}(t) = (1-t, t, 0)$, $t \in [0,1]$.
$\mathbf{F} = (0, 1-t, t)$, $\mathbf{r}' = (-1, 1, 0)$.
Integral: $\int_0^1 [0 + (1-t)]\, dt = \frac{1}{2}$.

Edge 2: $(0,1,0) \to (0,0,1)$: $\mathbf{r}(t) = (0, 1-t, t)$, $t \in [0,1]$.
$\mathbf{F} = (t, 0, 1-t)$, $\mathbf{r}' = (0, -1, 1)$.
Integral: $\int_0^1 [0 + (1-t)]\, dt = \frac{1}{2}$.

Edge 3: $(0,0,1) \to (1,0,0)$: $\mathbf{r}(t) = (t, 0, 1-t)$, $t \in [0,1]$.
$\mathbf{F} = (1-t, t, 0)$, $\mathbf{r}' = (1, 0, -1)$.
Integral: $\int_0^1 [(1-t)]\, dt = \frac{1}{2}$.

**Total:** $\frac{1}{2} + \frac{1}{2} + \frac{1}{2} = \frac{3}{2}$. $\checkmark$

### When to Use Stokes' Theorem

- **Surface integral is easier:** When the line integral is hard but the curl is
  simple, convert to a surface integral.
- **Line integral is easier:** When the surface integral is hard but the boundary
  is simple, convert to a line integral.
- **Surface independence:** If $\nabla \times \mathbf{F}$ is known, any surface
  bounded by the same curve gives the same flux of the curl.

### Pen & Paper Example 2: Simplify via Stokes

Evaluate $\oint_C \mathbf{F} \cdot d\mathbf{r}$ where $\mathbf{F} = (y^2, z^2, x^2)$
and $C$ is the circle $x^2 + y^2 = 1$ in the plane $z = 0$, counterclockwise.

Instead of parametrising $C$, use Stokes' with the flat disk $S$: $z = 0$,
$x^2+y^2 \leq 1$, normal $\mathbf{k}$.

$$\nabla \times \mathbf{F} = (0-2z, 0-2x, 0-2y) = (-2z, -2x, -2y)$$

On $S$ ($z=0$): $\nabla \times \mathbf{F} = (0, -2x, -2y)$.

$$\iint_S (\nabla \times \mathbf{F}) \cdot \mathbf{k}\, dA = \iint_D -2y\, dA$$

By symmetry ($y$ is odd over a symmetric region): $\iint_D -2y\, dA = 0$.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

fig = plt.figure(figsize=(14, 6))

# Left: Triangle in plane x+y+z=1 with boundary
ax1 = fig.add_subplot(121, projection='3d')

# Triangle vertices
v1, v2, v3 = [1,0,0], [0,1,0], [0,0,1]
triangle = Poly3DCollection([np.array([v1, v2, v3])], alpha=0.3,
                             facecolor='lightblue', edgecolor='blue')
ax1.add_collection3d(triangle)

# Boundary curve with arrows
edges = [(v1,v2), (v2,v3), (v3,v1)]
colors = ['red', 'green', 'orange']
for (start, end), c in zip(edges, colors):
    s, e = np.array(start), np.array(end)
    ax1.plot(*zip(s, e), color=c, linewidth=2.5)
    mid = (s + e) / 2
    d = (e - s) * 0.15
    ax1.quiver(*mid, *d, color=c, arrow_length_ratio=0.4, linewidth=2)

# Normal vector at centroid
centroid = np.array([1/3, 1/3, 1/3])
n = np.array([1, 1, 1]) / np.sqrt(3) * 0.3
ax1.quiver(*centroid, *n, color='black', arrow_length_ratio=0.3, linewidth=2)
ax1.text(centroid[0]+0.1, centroid[1]+0.1, centroid[2]+0.35, 'n', fontsize=12)

ax1.set_xlabel('x'); ax1.set_ylabel('y'); ax1.set_zlabel('z')
ax1.set_title("Stokes' Theorem\n∮ F·dr = ∬ (∇×F)·dS = 3/2")

# Right: Circle boundary with disk surface
ax2 = fig.add_subplot(122, projection='3d')

# Disk at z=0
theta = np.linspace(0, 2*np.pi, 50)
r_disk = np.linspace(0, 1, 20)
Theta, R_d = np.meshgrid(theta, r_disk)
X_d = R_d * np.cos(Theta)
Y_d = R_d * np.sin(Theta)
Z_d = np.zeros_like(X_d)
ax2.plot_surface(X_d, Y_d, Z_d, alpha=0.3, color='lightgreen', edgecolor='gray', linewidth=0.2)

# Boundary circle
x_c = np.cos(theta)
y_c = np.sin(theta)
z_c = np.zeros_like(theta)
ax2.plot(x_c, y_c, z_c, 'r-', linewidth=2.5)

# Direction arrows on circle
for t in [0, np.pi/2, np.pi, 3*np.pi/2]:
    px, py = np.cos(t), np.sin(t)
    dx, dy = -np.sin(t)*0.2, np.cos(t)*0.2
    ax2.quiver(px, py, 0, dx, dy, 0, color='red',
              arrow_length_ratio=0.4, linewidth=2)

# Normal vector
ax2.quiver(0, 0, 0, 0, 0, 0.5, color='black',
          arrow_length_ratio=0.3, linewidth=2)
ax2.text(0.1, 0.1, 0.55, 'n = k', fontsize=11)

ax2.set_xlabel('x'); ax2.set_ylabel('y'); ax2.set_zlabel('z')
ax2.set_title("Disk bounded by unit circle\n∮ F·dr = ∬ (∇×F)·k dA = 0")

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: F = (z, x, y), triangle in x+y+z=1 ===
# Surface integral: ∬ (1,1,1)·(1,1,1) dA over triangle
# = 3 * area of triangle = 3 * 1/2 = 3/2
print("=== Stokes' Theorem: F=(z,x,y) on x+y+z=1 triangle ===")

# Surface integral
surface_int = integrate.dblquad(
    lambda y, x: 3.0,  # (curl F)·(r_x × r_y) = (1,1,1)·(1,1,1) = 3
    0, 1,
    lambda x: 0,
    lambda x: 1 - x
)[0]
print(f"Surface integral: {surface_int:.6f}")

# Line integral (3 edges)
# Edge 1: (1-t, t, 0), integral of F·r' = 0*(-1) + (1-t)*1 + t*0
e1 = integrate.quad(lambda t: (1-t), 0, 1)[0]
# Edge 2: (0, 1-t, t), integral of F·r' = t*0 + 0*(-1) + (1-t)*1
e2 = integrate.quad(lambda t: (1-t), 0, 1)[0]
# Edge 3: (t, 0, 1-t), integral of F·r' = (1-t)*1 + t*0 + 0*(-1)
e3 = integrate.quad(lambda t: (1-t), 0, 1)[0]

line_int = e1 + e2 + e3
print(f"Line integral:    {line_int:.6f}")
print(f"Equal: {abs(surface_int - line_int) < 1e-10}")

# === Example 2: F = (y^2, z^2, x^2), circle in z=0 ===
# curl F = (-2z, -2x, -2y). On z=0: curl = (0, -2x, -2y)
# Flux through disk: ∬ -2y dA over unit disk = 0 by symmetry
flux = integrate.dblquad(
    lambda y, x: -2*y,
    -1, 1,
    lambda x: -np.sqrt(1 - x**2),
    lambda x: np.sqrt(1 - x**2)
)[0]
print(f"\n=== Stokes': F=(y²,z²,x²) around unit circle z=0 ===")
print(f"Surface integral (flux of curl): {flux:.10f}")
print(f"Expected: 0 (by symmetry)")

# Direct line integral for verification
def line_integral_circle(t):
    x, y, z = np.cos(t), np.sin(t), 0.0
    Fx, Fy, Fz = y**2, z**2, x**2
    dx, dy, dz = -np.sin(t), np.cos(t), 0.0
    return Fx*dx + Fy*dy + Fz*dz

line_circ, _ = integrate.quad(line_integral_circle, 0, 2*np.pi)
print(f"Line integral:    {line_circ:.10f}")
```

## Connection to CS / Games / AI / Business / Industry
- **Electromagnetic simulation**: Faraday's law ($\oint \mathbf{E} \cdot d\mathbf{r} = -\frac{d}{dt}\iint \mathbf{B} \cdot d\mathbf{S}$)
  is Stokes' theorem applied to the electric field
- **Fluid vorticity**: the circulation of velocity around a loop equals the
  total vorticity flux through the loop — used in vortex-based fluid solvers
- **Mesh processing**: discrete versions of Stokes' theorem (discrete exterior
  calculus) power geometry processing algorithms
- **Topological data analysis**: Stokes' theorem connects to de Rham cohomology,
  which underlies persistent homology used in TDA for ML
- **Gauge theories in physics**: modern physics formulations rely heavily on
  Stokes' theorem for relating local field equations to global conservation laws

## Check Your Understanding
1. Use Stokes' theorem to evaluate $\oint_C (2z)\,dx + (x)\,dy + (3y)\,dz$
   where $C$ is the triangle with vertices $(2,0,0)$, $(0,3,0)$, $(0,0,6)$.
2. Explain why $\oint_C (\nabla \times \mathbf{F}) \cdot d\mathbf{r}$ does not
   make sense (type mismatch), but $\oint_C \mathbf{F} \cdot d\mathbf{r}$ does.
3. If $\nabla \times \mathbf{F} = \mathbf{0}$ everywhere, what does Stokes'
   theorem tell you about $\oint_C \mathbf{F} \cdot d\mathbf{r}$ for any
   closed curve?
