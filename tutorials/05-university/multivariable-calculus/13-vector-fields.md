# Vector Fields

## Intuition
A vector field assigns a vector to every point in space. Think of a weather map
showing wind velocity at each location, or the gravitational pull at every point
around a planet. In games, vector fields drive particle effects (smoke, fire,
water flow). In ML, the gradient of a loss function is a vector field over
parameter space — gradient descent follows this field downhill.

## Prerequisites
- Tier 12, Lesson 7 — Gradient and directional derivatives
- Tier 2, Lesson 2 — Vector operations (addition, scalar multiplication)

## From First Principles

### Definition

A **vector field** in $\mathbb{R}^2$ is a function $\mathbf{F}: \mathbb{R}^2 \to \mathbb{R}^2$:

$$\mathbf{F}(x, y) = P(x,y)\,\mathbf{i} + Q(x,y)\,\mathbf{j}$$

where $P$ and $Q$ are scalar functions called the **component functions**.

In $\mathbb{R}^3$: $\mathbf{F}(x,y,z) = P\,\mathbf{i} + Q\,\mathbf{j} + R\,\mathbf{k}$.

**Examples:**
- $\mathbf{F}(x,y) = -y\,\mathbf{i} + x\,\mathbf{j}$ — rotation (counterclockwise)
- $\mathbf{F}(x,y) = x\,\mathbf{i} + y\,\mathbf{j}$ — expansion (radially outward)
- $\mathbf{F}(x,y) = \frac{-x\,\mathbf{i} - y\,\mathbf{j}}{(x^2 + y^2)^{3/2}}$ — gravity-like (inverse square)

### Gradient Fields (Conservative Fields)

A vector field $\mathbf{F}$ is **conservative** (or a **gradient field**) if
there exists a scalar function $\phi$ such that:

$$\mathbf{F} = \nabla \phi = \frac{\partial \phi}{\partial x}\,\mathbf{i} + \frac{\partial \phi}{\partial y}\,\mathbf{j}$$

The function $\phi$ is called the **potential function**.

**Physical meaning:** In a conservative field, the work done moving from $A$ to
$B$ depends only on the endpoints, not the path. Gravity is conservative; friction
is not.

### Testing for Conservativeness (2D)

$\mathbf{F} = P\,\mathbf{i} + Q\,\mathbf{j}$ is conservative on a
simply-connected domain if and only if:

$$\frac{\partial P}{\partial y} = \frac{\partial Q}{\partial x}$$

**Why?** If $\mathbf{F} = \nabla \phi$, then $P = \partial\phi/\partial x$ and
$Q = \partial\phi/\partial y$. So $\partial P/\partial y = \partial^2\phi/\partial y\partial x = \partial^2\phi/\partial x\partial y = \partial Q/\partial x$
(by equality of mixed partials).

### Pen & Paper Example 1: Test and Find Potential

Is $\mathbf{F}(x,y) = (2xy + 3)\,\mathbf{i} + (x^2 + 4y)\,\mathbf{j}$ conservative?

**Step 1.** Check: $P = 2xy + 3$, $Q = x^2 + 4y$.

$$\frac{\partial P}{\partial y} = 2x, \quad \frac{\partial Q}{\partial x} = 2x$$

Equal, so $\mathbf{F}$ is conservative. $\checkmark$

**Step 2.** Find $\phi$. Since $\partial\phi/\partial x = P = 2xy + 3$:

$$\phi = \int (2xy + 3)\, dx = x^2 y + 3x + g(y)$$

where $g(y)$ is an unknown function of $y$ only.

**Step 3.** Use $\partial\phi/\partial y = Q$:

$$\frac{\partial}{\partial y}(x^2 y + 3x + g(y)) = x^2 + g'(y) = x^2 + 4y$$

So $g'(y) = 4y$, giving $g(y) = 2y^2 + C$.

**Result:** $\phi(x,y) = x^2 y + 3x + 2y^2 + C$

### Pen & Paper Example 2: Not Conservative

Is $\mathbf{F}(x,y) = y\,\mathbf{i} + x^2\,\mathbf{j}$ conservative?

$\partial P/\partial y = 1$, $\partial Q/\partial x = 2x$. Not equal, so
$\mathbf{F}$ is **not** conservative.

### Testing in 3D: Curl = 0

In 3D, $\mathbf{F} = P\,\mathbf{i} + Q\,\mathbf{j} + R\,\mathbf{k}$ is
conservative if and only if $\nabla \times \mathbf{F} = \mathbf{0}$:

$$\frac{\partial R}{\partial y} = \frac{\partial Q}{\partial z}, \quad
\frac{\partial P}{\partial z} = \frac{\partial R}{\partial x}, \quad
\frac{\partial Q}{\partial x} = \frac{\partial P}{\partial y}$$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

x = np.linspace(-2, 2, 12)
y = np.linspace(-2, 2, 12)
X, Y = np.meshgrid(x, y)

# Field 1: Rotation F = (-y, x)
ax1 = axes[0]
U1, V1 = -Y, X
ax1.quiver(X, Y, U1, V1, color='blue', alpha=0.7)
ax1.set_title('Rotation: F = (-y, x)\nNot conservative')
ax1.set_xlabel('x'); ax1.set_ylabel('y')
ax1.set_aspect('equal')
ax1.grid(True, alpha=0.3)

# Field 2: Gradient field F = (2xy+3, x^2+4y)
ax2 = axes[1]
U2 = 2*X*Y + 3
V2 = X**2 + 4*Y
mag2 = np.sqrt(U2**2 + V2**2)
mag2[mag2 == 0] = 1
ax2.quiver(X, Y, U2/mag2, V2/mag2, mag2, cmap='hot', alpha=0.7)
ax2.set_title('Gradient field: ∇(x²y+3x+2y²)\nConservative')
ax2.set_xlabel('x'); ax2.set_ylabel('y')
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)

# Field 3: Radial expansion F = (x, y)
ax3 = axes[2]
U3, V3 = X, Y
ax3.quiver(X, Y, U3, V3, color='green', alpha=0.7)
ax3.set_title('Expansion: F = (x, y)\nConservative: ∇(½(x²+y²))')
ax3.set_xlabel('x'); ax3.set_ylabel('y')
ax3.set_aspect('equal')
ax3.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
import sympy as sp

x, y, z = sp.symbols('x y z')

# === Example 1: Check conservative and find potential ===
P1 = 2*x*y + 3
Q1 = x**2 + 4*y

dP_dy = sp.diff(P1, y)
dQ_dx = sp.diff(Q1, x)
print("=== F = (2xy+3, x^2+4y) ===")
print(f"dP/dy = {dP_dy}, dQ/dx = {dQ_dx}")
print(f"Conservative: {dP_dy == dQ_dx}")

# Find potential by integration
phi = sp.integrate(P1, x)  # integrate P w.r.t. x
print(f"After integrating P w.r.t. x: phi = {phi} + g(y)")
# Now differentiate w.r.t. y and match to Q
dphi_dy = sp.diff(phi, y)
g_prime = Q1 - dphi_dy
g = sp.integrate(g_prime, y)
potential = phi + g
print(f"g(y) = {g}")
print(f"Potential: phi = {potential}")

# Verify: gradient of phi should give F
grad_phi = (sp.diff(potential, x), sp.diff(potential, y))
print(f"Gradient of phi: ({grad_phi[0]}, {grad_phi[1]})")
print(f"Matches F: {sp.simplify(grad_phi[0] - P1) == 0 and sp.simplify(grad_phi[1] - Q1) == 0}")

# === Example 2: Not conservative ===
P2 = y
Q2 = x**2
print(f"\n=== F = (y, x^2) ===")
print(f"dP/dy = {sp.diff(P2, y)}, dQ/dx = {sp.diff(Q2, x)}")
print(f"Conservative: {sp.diff(P2, y) == sp.diff(Q2, x)}")

# === 3D Example: curl test ===
P3 = y*z
Q3 = x*z
R3 = x*y
curl_i = sp.diff(R3, y) - sp.diff(Q3, z)
curl_j = sp.diff(P3, z) - sp.diff(R3, x)
curl_k = sp.diff(Q3, x) - sp.diff(P3, y)
print(f"\n=== F = (yz, xz, xy) ===")
print(f"curl F = ({curl_i}, {curl_j}, {curl_k})")
print(f"Conservative (curl=0): {curl_i == 0 and curl_j == 0 and curl_k == 0}")
print(f"Potential: phi = xyz (verify: grad(xyz) = (yz, xz, xy))")
```

## Connection to CS / Games / AI / Business / Industry
- **Gradient descent**: the gradient $\nabla L$ of a loss function is a vector
  field over parameter space; SGD follows this field toward a minimum
- **Particle systems**: games define vector fields to steer particles (wind,
  vortices, attractors), producing realistic smoke, fire, and water effects
- **Flow fields**: pathfinding in games can use vector fields where each cell
  stores a direction toward the goal — agents follow the field
- **Conservative fields in physics**: gravity, electrostatics are conservative,
  meaning energy is conserved; game physics engines exploit path-independence
  for efficiency
- **Neural ODEs**: treat a neural network as defining a vector field; inference
  follows the flow of this field through state space

## Check Your Understanding
1. Is $\mathbf{F}(x,y) = (e^x \sin y)\,\mathbf{i} + (e^x \cos y)\,\mathbf{j}$
   conservative? If so, find the potential function.
2. Sketch (by hand) the vector field $\mathbf{F}(x,y) = \mathbf{i} + x\,\mathbf{j}$
   at a $3 \times 3$ grid of points. Is it conservative?
3. Show that $\mathbf{F}(x,y,z) = (2xz, \, 0, \, x^2 + 1)$ is conservative and
   find its potential.
