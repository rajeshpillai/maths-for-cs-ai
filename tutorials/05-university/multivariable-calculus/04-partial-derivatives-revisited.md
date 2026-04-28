# Partial Derivatives Revisited: Higher-Order and Clairaut's Theorem

## Intuition
A partial derivative tells you the slope of a surface in one direction while
holding the other directions fixed. Higher-order partial derivatives tell you how
that slope itself changes — the "curvature" of the slope. In game physics, second
partial derivatives determine whether a surface is bowl-shaped (stable equilibrium)
or saddle-shaped (unstable). Clairaut's theorem is the comforting fact that the
order of differentiation usually does not matter — a huge simplification.

## Prerequisites
- Tier 3, Lesson 3 — Partial derivatives and the gradient

## From First Principles

### Review: First Partial Derivatives

For $f(x, y)$:

$$f_x = \frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h, y) - f(x,y)}{h}$$

$$f_y = \frac{\partial f}{\partial y} = \lim_{h \to 0} \frac{f(x, y+h) - f(x,y)}{h}$$

The rule: treat the other variable as a constant and differentiate normally.

### Second-Order Partial Derivatives

Differentiate again. There are **four** second-order partials:

$$f_{xx} = \frac{\partial^2 f}{\partial x^2}, \quad f_{yy} = \frac{\partial^2 f}{\partial y^2}, \quad f_{xy} = \frac{\partial^2 f}{\partial y \,\partial x}, \quad f_{yx} = \frac{\partial^2 f}{\partial x\, \partial y}$$

**Notation warning.** $f_{xy}$ means: first differentiate with respect to $x$,
then with respect to $y$. In Leibniz notation $\frac{\partial^2 f}{\partial y\, \partial x}$
the order reads right-to-left: first $x$, then $y$.

### Pen & Paper Worked Example

Let $f(x, y) = x^2 y + \sin(xy)$.

**Step 1. First partials.**

$$f_x = \frac{\partial}{\partial x}[x^2 y + \sin(xy)]$$

$= 2xy + y\cos(xy)$  (using chain rule: $\frac{\partial}{\partial x}\sin(xy) = \cos(xy) \cdot y$)

$$f_y = \frac{\partial}{\partial y}[x^2 y + \sin(xy)]$$

$= x^2 + x\cos(xy)$

**Step 2. Second partials.**

$$f_{xx} = \frac{\partial}{\partial x}[2xy + y\cos(xy)] = 2y + y \cdot (-\sin(xy)) \cdot y = 2y - y^2\sin(xy)$$

$$f_{yy} = \frac{\partial}{\partial y}[x^2 + x\cos(xy)] = 0 + x \cdot (-\sin(xy)) \cdot x = -x^2\sin(xy)$$

**Step 3. Mixed partials.**

$$f_{xy} = \frac{\partial}{\partial y}[2xy + y\cos(xy)]$$

$$= 2x + \cos(xy) + y \cdot (-\sin(xy)) \cdot x = 2x + \cos(xy) - xy\sin(xy)$$

$$f_{yx} = \frac{\partial}{\partial x}[x^2 + x\cos(xy)]$$

$$= 2x + \cos(xy) + x \cdot (-\sin(xy)) \cdot y = 2x + \cos(xy) - xy\sin(xy)$$

**Observation:** $f_{xy} = f_{yx}$. This is not a coincidence.

### Clairaut's Theorem (Symmetry of Mixed Partials)

**Theorem.** If $f_{xy}$ and $f_{yx}$ are both continuous at a point $(a, b)$, then:

$$f_{xy}(a, b) = f_{yx}(a, b)$$

**Why it matters.** For a function with $n$ variables, the number of distinct
second-order mixed partials is $\binom{n+1}{2}$ instead of $n^2$. For neural
networks, this means the Hessian matrix is always symmetric (for smooth loss
functions), which is crucial for second-order optimisation methods.

### Numerical Check at a Specific Point

Evaluate all second partials at $(x, y) = (1, 2)$:

$$f_{xx}(1, 2) = 2(2) - (2)^2 \sin(1 \cdot 2) = 4 - 4\sin 2 \approx 4 - 3.637 = 0.363$$

$$f_{yy}(1, 2) = -(1)^2 \sin(2) = -\sin 2 \approx -0.909$$

$$f_{xy}(1, 2) = f_{yx}(1, 2) = 2(1) + \cos(2) - (1)(2)\sin(2) \approx 2 - 0.416 - 1.819 = -0.235$$

### Higher-Order Derivatives

Third-order and beyond follow the same pattern. For example:

$$f_{xxy} = \frac{\partial^3 f}{\partial y\, \partial x^2}$$

By repeated application of Clairaut's theorem, the order of differentiation
does not matter (assuming continuity), so $f_{xxy} = f_{xyx} = f_{yxx}$.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# f(x, y) = x^2 * y + sin(xy)
x = np.linspace(-2, 2, 100)
y = np.linspace(-2, 2, 100)
X, Y = np.meshgrid(x, y)
Z = X**2 * Y + np.sin(X * Y)

fig = plt.figure(figsize=(10, 5))

# Surface plot
ax1 = fig.add_subplot(121, projection='3d')
ax1.plot_surface(X, Y, Z, cmap='viridis', alpha=0.8, edgecolor='none')

# Tangent plane at (1, 2)
a, b = 1.0, 2.0
f_ab = a**2 * b + np.sin(a * b)
fx_ab = 2*a*b + b*np.cos(a*b)
fy_ab = a**2 + a*np.cos(a*b)

# Small patch for tangent plane
dx = np.linspace(-0.5, 0.5, 20)
dy = np.linspace(-0.5, 0.5, 20)
DX, DY = np.meshgrid(dx, dy)
Z_plane = f_ab + fx_ab * DX + fy_ab * DY
ax1.plot_surface(a + DX, b + DY, Z_plane, color='red', alpha=0.5)
ax1.scatter([a], [b], [f_ab], color='black', s=50, zorder=5)
ax1.set_title('f(x,y) = x²y + sin(xy)\nwith tangent plane at (1,2)')
ax1.set_xlabel('x')
ax1.set_ylabel('y')

# Right: contour of f_xy (mixed partial)
ax2 = fig.add_subplot(122)
Fxy = 2*X + np.cos(X*Y) - X*Y*np.sin(X*Y)
c = ax2.contourf(X, Y, Fxy, levels=20, cmap='coolwarm')
plt.colorbar(c, ax=ax2)
ax2.set_title('f_xy = 2x + cos(xy) - xy·sin(xy)')
ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.plot(1, 2, 'ko', markersize=8)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
import sympy as sp

# Define symbols and function
x, y = sp.symbols('x y')
f = x**2 * y + sp.sin(x * y)

# First partials
f_x = sp.diff(f, x)
f_y = sp.diff(f, y)
print("=== First Partial Derivatives ===")
print(f"f_x = {f_x}")
print(f"f_y = {f_y}")

# Second partials
f_xx = sp.diff(f, x, 2)
f_yy = sp.diff(f, y, 2)
f_xy = sp.diff(f, x, y)  # first x, then y
f_yx = sp.diff(f, y, x)  # first y, then x

print(f"\n=== Second Partial Derivatives ===")
print(f"f_xx = {f_xx}")
print(f"f_yy = {f_yy}")
print(f"f_xy = {f_xy}")
print(f"f_yx = {f_yx}")

# Verify Clairaut's theorem symbolically
print(f"\n=== Clairaut's Theorem ===")
print(f"f_xy == f_yx? {sp.simplify(f_xy - f_yx) == 0}")

# Numerical check at (1, 2)
point = {x: 1, y: 2}
print(f"\n=== Values at (1, 2) ===")
print(f"f_xx(1,2) = {float(f_xx.subs(point)):.6f}")
print(f"f_yy(1,2) = {float(f_yy.subs(point)):.6f}")
print(f"f_xy(1,2) = {float(f_xy.subs(point)):.6f}")
print(f"f_yx(1,2) = {float(f_yx.subs(point)):.6f}")

# Numerical derivative check (finite differences)
h = 1e-5
def f_num(xv, yv):
    return xv**2 * yv + np.sin(xv * yv)

f_xy_num = (f_num(1+h, 2+h) - f_num(1+h, 2) - f_num(1, 2+h) + f_num(1, 2)) / h**2
print(f"\nNumerical f_xy(1,2) = {f_xy_num:.6f}")
print(f"Symbolic  f_xy(1,2) = {float(f_xy.subs(point)):.6f}")
```

## Connection to CS / Games / AI / Business / Industry
- **Hessian matrix in ML**: the matrix of all second partials of the loss function.
  Clairaut's theorem guarantees it is symmetric, enabling efficient eigenvalue
  analysis for optimisation
- **Second derivative test**: determines if a critical point is a min, max, or
  saddle — essential for understanding loss landscapes
- **Laplacian in image processing**: $\nabla^2 f = f_{xx} + f_{yy}$ detects edges
  and blobs in images
- **Physics simulation**: the wave equation, heat equation, and many PDEs are
  written in terms of second partial derivatives
- **Black-Scholes Greeks**: Gamma $\Gamma = \partial^2 V / \partial S^2$ is a
  pure second partial; options market-makers at Citadel, Susquehanna, and
  Optiver hedge Gamma exposure continuously to manage convexity risk
- **Structural FEA**: ANSYS Mechanical and Abaqus compute the Hessian of strain
  energy density $\partial^2 U / \partial \epsilon_{ij} \partial \epsilon_{kl}$
  to derive material stiffness tensors used by Boeing and Airbus stress teams
- **MRI gradient encoding**: Siemens MAGNETOM and GE SIGNA scanners use mixed
  partials of the magnetic field $\partial^2 B_z / \partial x \partial y$ to
  model gradient nonlinearity and correct image distortion
- **Demand modelling at Walmart and Amazon**: cross-elasticity of demand
  $\partial^2 \text{revenue} / \partial p_1 \partial p_2$ between substitute
  goods is a mixed second partial — drives bundled pricing experiments

## Check Your Understanding
1. For $f(x, y) = e^{xy} + x^3 y^2$, compute $f_x$, $f_y$, $f_{xx}$, $f_{yy}$,
   and verify $f_{xy} = f_{yx}$.
2. Compute all second partials of $g(x, y, z) = xyz + x^2 z$ with respect to
   each pair of variables.
3. The Laplacian of $f$ is $\nabla^2 f = f_{xx} + f_{yy}$. Compute $\nabla^2 f$
   for $f(x,y) = \ln(x^2 + y^2)$. What do you notice? (This function is
   **harmonic** — its Laplacian is zero away from the origin.)
