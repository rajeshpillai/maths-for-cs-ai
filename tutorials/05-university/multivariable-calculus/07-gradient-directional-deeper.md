# Gradient and Directional Derivatives — A Deeper Look

## Intuition
The gradient is a vector that points uphill on a surface, and its magnitude tells
you how steep the slope is. The directional derivative answers: "if I walk in
*this* particular direction, how steep is the hill?" In ML, the gradient of the
loss function tells the optimiser which direction in parameter space will reduce
the loss the fastest. In games, the gradient of a terrain height map gives the
direction water would flow (downhill = negative gradient).

## Prerequisites
- Tier 3, Lesson 3 — Gradient basics
- Tier 12, Lesson 5 — Tangent planes and linearization

## From First Principles

### The Gradient in $\mathbb{R}^n$

For $f(x_1, x_2, \ldots, x_n)$, the gradient is the vector of all partial
derivatives:

$$\nabla f = \left\langle \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n} \right\rangle$$

The gradient lives in the **same space** as the inputs. If $f : \mathbb{R}^n \to \mathbb{R}$,
then $\nabla f \in \mathbb{R}^n$.

### Directional Derivative

The **directional derivative** of $f$ at point $\mathbf{a}$ in the direction of
unit vector $\mathbf{u}$ is:

$$D_{\mathbf{u}} f(\mathbf{a}) = \lim_{h \to 0} \frac{f(\mathbf{a} + h\mathbf{u}) - f(\mathbf{a})}{h}$$

**Key result.** This equals the dot product:

$$D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}$$

**Derivation.** Parameterise the line through $\mathbf{a}$ in direction $\mathbf{u}$:
$\mathbf{r}(t) = \mathbf{a} + t\mathbf{u}$. Then $g(t) = f(\mathbf{r}(t))$ and
by the multivariable chain rule:

$$g'(0) = \sum_i \frac{\partial f}{\partial x_i} \cdot u_i = \nabla f \cdot \mathbf{u}$$

### Three Crucial Properties

**1. Maximum rate of increase.** By the dot product formula:

$$D_{\mathbf{u}} f = \|\nabla f\| \cos\theta$$

where $\theta$ is the angle between $\nabla f$ and $\mathbf{u}$. This is maximised
when $\theta = 0$, i.e., when $\mathbf{u}$ points in the direction of $\nabla f$.

**Maximum rate of increase** $= \|\nabla f\|$, achieved in the direction of $\nabla f$.

**2. Maximum rate of decrease** is $-\|\nabla f\|$, in the direction of $-\nabla f$.

**3. Zero rate of change** when $\mathbf{u} \perp \nabla f$, which means
$\mathbf{u}$ is tangent to the level curve/surface.

### Pen & Paper Worked Example

Let $f(x, y) = x^2 + 4y^2$. Find the directional derivative at $(1, 1)$ in the
direction of $\mathbf{v} = \langle 3, 4 \rangle$.

**Step 1.** Compute the gradient:

$$\nabla f = \langle 2x, \; 8y \rangle$$

$$\nabla f(1, 1) = \langle 2, 8 \rangle$$

**Step 2.** Make $\mathbf{v}$ a unit vector:

$$\|\mathbf{v}\| = \sqrt{9 + 16} = 5$$

$$\mathbf{u} = \left\langle \frac{3}{5}, \frac{4}{5} \right\rangle$$

**Step 3.** Dot product:

$$D_{\mathbf{u}} f(1,1) = \langle 2, 8 \rangle \cdot \left\langle \frac{3}{5}, \frac{4}{5} \right\rangle = \frac{6}{5} + \frac{32}{5} = \frac{38}{5} = 7.6$$

**Step 4.** Maximum rate of increase:

$$\|\nabla f(1,1)\| = \sqrt{4 + 64} = \sqrt{68} = 2\sqrt{17} \approx 8.246$$

This is achieved in the direction $\langle 2, 8 \rangle / 2\sqrt{17}$.

### Gradient as Normal to Level Curves/Surfaces

A **level curve** of $f(x,y)$ is the set $\{(x,y) : f(x,y) = c\}$.

**Theorem.** $\nabla f$ is perpendicular to level curves at every point.

**Proof sketch.** Let $\mathbf{r}(t)$ be a path along the level curve, so
$f(\mathbf{r}(t)) = c$. Differentiate: $\nabla f \cdot \mathbf{r}'(t) = 0$.
This means $\nabla f$ is orthogonal to the tangent $\mathbf{r}'(t)$.

For a **level surface** $f(x, y, z) = c$ in $\mathbb{R}^3$, the gradient
$\nabla f$ is the **normal vector** to that surface. This is used constantly
in rendering to compute surface normals for lighting.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

# f(x, y) = x^2 + 4y^2
x = np.linspace(-3, 3, 200)
y = np.linspace(-3, 3, 200)
X, Y = np.meshgrid(x, y)
Z = X**2 + 4*Y**2

fig, ax = plt.subplots(figsize=(8, 7))

# Level curves
levels = [1, 5, 10, 15, 20, 30]
cs = ax.contour(X, Y, Z, levels=levels, cmap='viridis')
ax.clabel(cs, fontsize=8)

# Gradient vectors on a grid
xg = np.arange(-2.5, 3, 1)
yg = np.arange(-2.5, 3, 1)
Xg, Yg = np.meshgrid(xg, yg)
Ug = 2 * Xg       # df/dx
Vg = 8 * Yg       # df/dy
ax.quiver(Xg, Yg, Ug, Vg, color='red', alpha=0.7, scale=60, label='Gradient')

# Highlight the specific example at (1, 1)
ax.plot(1, 1, 'ko', markersize=10)
grad = np.array([2, 8])
ax.quiver(1, 1, grad[0], grad[1], color='blue', scale=20, linewidth=2,
          label='∇f(1,1) = <2,8>')

# Direction vector
u = np.array([3/5, 4/5])
ax.quiver(1, 1, u[0], u[1], color='green', scale=5, linewidth=2,
          label='u = <3/5, 4/5>')

ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Gradient Vectors ⊥ Level Curves of f(x,y) = x² + 4y²')
ax.legend(loc='upper left')
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np

# f(x, y) = x^2 + 4y^2
def f(x, y):
    return x**2 + 4*y**2

# Analytical gradient
def grad_f(x, y):
    return np.array([2*x, 8*y])

# Point and direction
a = np.array([1.0, 1.0])
v = np.array([3.0, 4.0])
u = v / np.linalg.norm(v)

print("=== Directional Derivative at (1, 1) ===")
print(f"Gradient: {grad_f(*a)}")
print(f"Unit direction: {u}")

D_u = np.dot(grad_f(*a), u)
print(f"D_u f = grad . u = {D_u}")
print(f"Expected: 38/5 = {38/5}")

# Verify numerically using limit definition
h = 1e-7
D_u_num = (f(*(a + h*u)) - f(*a)) / h
print(f"Numerical check: {D_u_num:.6f}")

# Maximum rate of increase
max_rate = np.linalg.norm(grad_f(*a))
print(f"\nMax rate of increase: |∇f| = {max_rate:.6f}")
print(f"Direction of max increase: {grad_f(*a) / max_rate}")

# Verify gradient perpendicular to level curve
# Level curve at f = 5 passing through (1, 1)
print(f"\n=== Gradient ⊥ Level Curve ===")
print(f"f(1,1) = {f(1, 1)}")
# Tangent to level curve x^2 + 4y^2 = 5 at (1,1)
# Implicit differentiation: 2x + 8y(dy/dx) = 0 => dy/dx = -2x/(8y) = -1/4
tangent = np.array([1.0, -1/4])
print(f"Tangent to level curve: {tangent}")
print(f"grad . tangent = {np.dot(grad_f(1, 1), tangent)}")
print("(Zero confirms perpendicularity)")
```

## Connection to CS / Games / AI / Business / Industry
- **Gradient descent**: the negative gradient $-\nabla L$ is the steepest
  descent direction for the loss function — this is why gradient descent works
- **Surface normals in rendering**: for implicit surfaces $f(x,y,z) = 0$, the
  gradient $\nabla f$ gives the surface normal for Phong/Blinn lighting
- **Heightmap water flow**: water flows in the $-\nabla h$ direction on terrain;
  this drives erosion simulation in procedural terrain generation
- **Potential fields in AI**: game AI uses gradient fields for navigation — the
  gradient of an attraction/repulsion potential guides NPCs
- **Feature importance**: in ML interpretability, the gradient of the output
  with respect to input features indicates which features matter most
- **Geological surveys**: USGS and Schlumberger map subsurface gradients of
  gravitational and magnetic potentials to locate ore bodies and oil reservoirs
  — the gradient direction points toward density anomalies
- **Aerodynamic shape optimisation**: Boeing and Airbus use adjoint-based
  gradient methods $\nabla_\text{shape} C_D$ to deform wing surfaces toward
  lower drag in SU2 and Stanford's adjoint solvers; saved millions in fuel
  on the 787 and A350 fleets
- **Marketing-mix optimisation at P&G and Unilever**: gradient of revenue with
  respect to ad-spend allocation drives reallocation between TV, digital, and
  in-store promotions — Nielsen and Kantar feed the partial derivatives
- **Topographic flood modelling**: USGS and the UK Environment Agency compute
  $-\nabla h$ over LIDAR DEMs to predict where storm-water will pool — feeds
  insurance flood-zone maps used by FEMA and Munich Re

## Check Your Understanding
1. For $f(x, y, z) = x^2 + y^2 + z^2$, find the directional derivative at
   $(1, 2, 2)$ in the direction of $\langle 1, -2, 2 \rangle$.
2. Find the direction of maximum increase of $f(x,y) = xe^y$ at the point $(2, 0)$.
   What is the maximum rate of increase?
3. Show that the gradient of $f(x,y,z) = x^2 + y^2 + z^2$ at any point is a
   normal vector to the sphere passing through that point. What does this mean
   geometrically?
