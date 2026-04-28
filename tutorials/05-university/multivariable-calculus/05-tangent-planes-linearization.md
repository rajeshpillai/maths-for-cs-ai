# Tangent Planes and Linearization

## Intuition
A tangent plane is the best flat approximation to a surface at a point — like
pressing a sheet of paper against a basketball at one spot. In games, terrain
LOD (level of detail) often replaces curved patches with flat triangles — each
triangle is essentially a tangent plane approximation. In ML, linearization is
what makes gradient descent work: we approximate the loss surface as a plane,
step downhill on that plane, then re-approximate.

## Prerequisites
- Tier 12, Lesson 4 — Partial derivatives (first-order)

## From First Principles

### From 1D to 2D Linearization

Recall the 1D linear approximation at $x = a$:

$$f(x) \approx f(a) + f'(a)(x - a)$$

For a function of two variables $f(x, y)$ at the point $(a, b)$, we extend this
using both partial derivatives:

$$f(x, y) \approx f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$

This is the **tangent plane** at $(a, b)$.

### Equation of the Tangent Plane

The surface is $z = f(x, y)$. The tangent plane at $(a, b, f(a, b))$ is:

$$z = f(a, b) + f_x(a, b)(x - a) + f_y(a, b)(y - b)$$

**Why this works.** The plane passes through the point $(a, b, f(a, b))$. Its
slope in the $x$-direction is $f_x(a, b)$ and in the $y$-direction is $f_y(a, b)$
— exactly matching the surface's slopes there.

### Pen & Paper Worked Example

Find the tangent plane to $f(x, y) = x^2 + 2y^2$ at the point $(1, 1)$.

**Step 1.** Evaluate the function:

$$f(1, 1) = 1^2 + 2(1)^2 = 3$$

**Step 2.** Compute partial derivatives:

$$f_x = 2x \implies f_x(1, 1) = 2$$

$$f_y = 4y \implies f_y(1, 1) = 4$$

**Step 3.** Write the tangent plane:

$$z = 3 + 2(x - 1) + 4(y - 1)$$

$$z = 3 + 2x - 2 + 4y - 4 = 2x + 4y - 3$$

**Step 4.** Check: at $(1, 1)$, $z = 2 + 4 - 3 = 3 = f(1, 1)$. Correct.

### Linear Approximation (Using the Tangent Plane)

The tangent plane gives us a way to **estimate** $f$ near a known point.

**Example.** Estimate $f(1.05, 0.97)$ where $f(x,y) = x^2 + 2y^2$.

Using the tangent plane at $(1, 1)$:

$$f(1.05, 0.97) \approx 3 + 2(1.05 - 1) + 4(0.97 - 1)$$

$$= 3 + 2(0.05) + 4(-0.03) = 3 + 0.10 - 0.12 = 2.98$$

**Exact value:** $1.05^2 + 2(0.97)^2 = 1.1025 + 1.8818 = 2.9843$.

Error: $|2.98 - 2.9843| = 0.0043$. Quite close!

### The Differential

Define the **total differential**:

$$df = f_x\, dx + f_y\, dy$$

where $dx = x - a$ and $dy = y - b$ are small changes. This is the linear part
of the change in $f$ — the tangent plane approximation restated.

For our example: $df = 2x\,dx + 4y\,dy$. At $(1,1)$ with $dx = 0.05$, $dy = -0.03$:

$$df = 2(0.05) + 4(-0.03) = -0.02$$

So $f \approx 3 + (-0.02) = 2.98$, matching our earlier result.

### General Case: n Variables

For $f(x_1, \ldots, x_n)$ at $\mathbf{a} = (a_1, \ldots, a_n)$:

$$f(\mathbf{x}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a}) \cdot (\mathbf{x} - \mathbf{a})$$

$$= f(\mathbf{a}) + \sum_{i=1}^n \frac{\partial f}{\partial x_i}(\mathbf{a})(x_i - a_i)$$

This is exactly the **first-order Taylor expansion** in multiple variables.

### Normal Vector to the Surface

The tangent plane $z - f(a,b) = f_x(x-a) + f_y(y-b)$ can be rewritten as:

$$f_x(x - a) + f_y(y - b) - (z - f(a,b)) = 0$$

So the **normal vector** to the surface $z = f(x,y)$ at $(a, b)$ is:

$$\mathbf{n} = \langle f_x(a,b), \; f_y(a,b), \; -1 \rangle$$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# f(x, y) = x^2 + 2y^2
x = np.linspace(-0.5, 2.5, 100)
y = np.linspace(-0.5, 2.5, 100)
X, Y = np.meshgrid(x, y)
Z = X**2 + 2*Y**2

# Tangent plane at (1, 1): z = 2x + 4y - 3
Z_plane = 2*X + 4*Y - 3

fig = plt.figure(figsize=(9, 6))
ax = fig.add_subplot(111, projection='3d')

# Surface
ax.plot_surface(X, Y, Z, cmap='viridis', alpha=0.6, edgecolor='none')

# Tangent plane (clip to region near the point)
mask = (np.abs(X - 1) < 0.8) & (np.abs(Y - 1) < 0.8)
Z_plane_clipped = np.where(mask, Z_plane, np.nan)
ax.plot_surface(X, Y, Z_plane_clipped, color='red', alpha=0.5)

# Point of tangency
ax.scatter([1], [1], [3], color='black', s=80, zorder=5)

# Normal vector
ax.quiver(1, 1, 3, 2, 4, -1, length=0.3, color='orange', linewidth=2,
          arrow_length_ratio=0.3)

ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Surface z = x² + 2y² with tangent plane at (1, 1, 3)')
ax.view_init(elev=25, azim=-60)
plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
import sympy as sp

x, y = sp.symbols('x y')
f = x**2 + 2*y**2

# Partial derivatives
f_x = sp.diff(f, x)
f_y = sp.diff(f, y)
print("=== Partial Derivatives ===")
print(f"f_x = {f_x}")
print(f"f_y = {f_y}")

# Evaluate at (1, 1)
a, b = 1, 1
f_ab = float(f.subs({x: a, y: b}))
fx_ab = float(f_x.subs({x: a, y: b}))
fy_ab = float(f_y.subs({x: a, y: b}))
print(f"\n=== At (1, 1) ===")
print(f"f(1,1)   = {f_ab}")
print(f"f_x(1,1) = {fx_ab}")
print(f"f_y(1,1) = {fy_ab}")

# Tangent plane: z = f_ab + fx_ab*(x-a) + fy_ab*(y-b)
print(f"\nTangent plane: z = {f_ab} + {fx_ab}(x-{a}) + {fy_ab}(y-{b})")
print(f"Simplified:    z = {fx_ab}x + {fy_ab}y + {f_ab - fx_ab*a - fy_ab*b}")

# Linear approximation test
x0, y0 = 1.05, 0.97
approx = f_ab + fx_ab*(x0 - a) + fy_ab*(y0 - b)
exact = x0**2 + 2*y0**2

print(f"\n=== Approximation at ({x0}, {y0}) ===")
print(f"Linear approx: {approx:.6f}")
print(f"Exact value:   {exact:.6f}")
print(f"Error:         {abs(exact - approx):.6f}")

# Test with a point further away
x1, y1 = 1.5, 1.5
approx2 = f_ab + fx_ab*(x1 - a) + fy_ab*(y1 - b)
exact2 = x1**2 + 2*y1**2
print(f"\n=== Approximation at ({x1}, {y1}) — further away ===")
print(f"Linear approx: {approx2:.6f}")
print(f"Exact value:   {exact2:.6f}")
print(f"Error:         {abs(exact2 - approx2):.6f}")
print("(Error grows as we move away from the tangent point)")
```

## Connection to CS / Games / AI / Business / Industry
- **Gradient descent**: each step treats the loss surface as a tangent plane and
  moves in the direction of steepest descent on that plane
- **Newton's method in ML**: uses the tangent plane (first-order) plus curvature
  (second-order) for better approximations
- **Terrain rendering**: flat triangles in a terrain mesh are tangent plane
  approximations to the true terrain surface
- **Physics engines**: collision detection with curved surfaces often uses tangent
  plane approximations for contact normals
- **Error propagation**: the differential $df = f_x\,dx + f_y\,dy$ propagates
  measurement uncertainties through computations
- **Black-Scholes Delta hedging**: brokers like Charles Schwab and Interactive
  Brokers use the option's tangent plane $V \approx V_0 + \Delta(S - S_0) +
  \rho(r - r_0)$ to estimate price moves over a short interval, rebalancing
  Delta-neutral books in real time
- **GPS positioning**: NovAtel and Trimble GNSS receivers linearise the nonlinear
  pseudorange equations around an initial guess (tangent plane in $\mathbb{R}^4$)
  and iterate via least squares — this is how your phone gets a fix
- **Drug-dose response (Pfizer, Novartis)**: clinical pharmacologists linearise
  nonlinear PK/PD models around therapeutic doses to estimate marginal
  effect of dose adjustments, supporting FDA dose-titration labels
- **Wind-tunnel surrogate models**: Boeing and SpaceX fit linear approximations
  to expensive CFD simulations near design points so Reaction Engines and
  Lockheed can run rapid trade studies without rerunning Fluent

## Check Your Understanding
1. Find the tangent plane to $f(x, y) = \sqrt{x^2 + y^2}$ at the point $(3, 4)$.
   Use it to estimate $f(3.1, 3.9)$.
2. Find the equation of the tangent plane to $z = e^{x+2y}$ at $(0, 0)$.
3. A box has dimensions $x = 2$, $y = 3$, $z = 4$ (all in cm). The volume is
   $V = xyz$. Use the total differential to estimate the maximum error in $V$ if
   each dimension has a measurement error of $\pm 0.05$ cm.
