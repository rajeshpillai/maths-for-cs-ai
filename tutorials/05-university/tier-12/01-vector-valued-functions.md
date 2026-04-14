# Vector-Valued Functions

## Intuition
A vector-valued function maps a single parameter (like time) to a point in space.
Think of it as the GPS trajectory of a game character: at every moment $t$, the
function tells you the character's $(x, y, z)$ position. The derivative gives the
velocity vector — the direction and speed the character is moving right now.

## Prerequisites
- Tier 3, Lesson 2 — Derivatives (single-variable)
- Tier 2, Lesson 2 — Vector operations (addition, scalar multiplication)

## From First Principles

### Definition

A **vector-valued function** assigns a vector to each real number $t$ in its domain:

$$\mathbf{r}(t) = \langle x(t),\; y(t),\; z(t) \rangle$$

Each component $x(t)$, $y(t)$, $z(t)$ is an ordinary scalar function. The output
is a vector in $\mathbb{R}^3$ (or $\mathbb{R}^2$ for plane curves).

**Example.** A helix:

$$\mathbf{r}(t) = \langle \cos t,\; \sin t,\; t \rangle$$

At $t = 0$: $\mathbf{r}(0) = \langle 1, 0, 0 \rangle$.
At $t = \pi/2$: $\mathbf{r}(\pi/2) = \langle 0, 1, \pi/2 \rangle$.

### Derivative of a Vector-Valued Function

Differentiate **component by component**:

$$\mathbf{r}'(t) = \langle x'(t),\; y'(t),\; z'(t) \rangle$$

This is the **tangent vector** at the point $\mathbf{r}(t)$. It points in the
direction of motion and its magnitude is the speed.

**Derivation from first principles.** Apply the limit definition to each component:

$$\mathbf{r}'(t) = \lim_{h \to 0} \frac{\mathbf{r}(t+h) - \mathbf{r}(t)}{h}$$

$$= \lim_{h \to 0} \left\langle \frac{x(t+h)-x(t)}{h},\; \frac{y(t+h)-y(t)}{h},\; \frac{z(t+h)-z(t)}{h} \right\rangle$$

$$= \langle x'(t),\; y'(t),\; z'(t) \rangle$$

### Pen & Paper Worked Example

Let $\mathbf{r}(t) = \langle t^2,\; e^t,\; \sin t \rangle$.

**Step 1.** Differentiate each component:

$$x'(t) = 2t, \quad y'(t) = e^t, \quad z'(t) = \cos t$$

$$\mathbf{r}'(t) = \langle 2t,\; e^t,\; \cos t \rangle$$

**Step 2.** Evaluate at $t = 0$:

$$\mathbf{r}'(0) = \langle 0,\; 1,\; 1 \rangle$$

**Step 3.** The **unit tangent vector** at $t = 0$:

$$\|\mathbf{r}'(0)\| = \sqrt{0^2 + 1^2 + 1^2} = \sqrt{2}$$

$$\mathbf{T}(0) = \frac{\mathbf{r}'(0)}{\|\mathbf{r}'(0)\|} = \left\langle 0,\; \frac{1}{\sqrt{2}},\; \frac{1}{\sqrt{2}} \right\rangle$$

### Integral of a Vector-Valued Function

Integrate component by component:

$$\int_a^b \mathbf{r}(t)\, dt = \left\langle \int_a^b x(t)\,dt,\; \int_a^b y(t)\,dt,\; \int_a^b z(t)\,dt \right\rangle$$

**Example.** $\int_0^1 \langle 2t,\; 3t^2,\; 1 \rangle\, dt$

$$= \left\langle \left[t^2\right]_0^1,\; \left[t^3\right]_0^1,\; \left[t\right]_0^1 \right\rangle = \langle 1,\; 1,\; 1 \rangle$$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

t = np.linspace(0, 4 * np.pi, 300)
x = np.cos(t)
y = np.sin(t)
z = t

fig = plt.figure(figsize=(8, 6))
ax = fig.add_subplot(111, projection='3d')
ax.plot(x, y, z, 'b-', linewidth=1.5, label='r(t) = <cos t, sin t, t>')

# Tangent vector at t = pi
t0 = np.pi
r0 = np.array([np.cos(t0), np.sin(t0), t0])
dr = np.array([-np.sin(t0), np.cos(t0), 1.0])
dr_unit = dr / np.linalg.norm(dr)
ax.quiver(*r0, *(dr_unit * 2), color='red', linewidth=2, label="Tangent at t=π")

ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_zlabel('z')
ax.set_title('Helix with Tangent Vector')
ax.legend()
plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np

# --- Example: r(t) = <t^2, e^t, sin(t)> ---
t = 0.0
h = 1e-8  # tiny step for numerical derivative

# Component functions
def r(t):
    return np.array([t**2, np.exp(t), np.sin(t)])

# Analytical derivative
def r_prime(t):
    return np.array([2*t, np.exp(t), np.cos(t)])

# Numerical derivative (limit definition)
numerical = (r(t + h) - r(t)) / h
analytical = r_prime(t)

print("=== Derivative of r(t) at t = 0 ===")
print(f"Numerical:  {numerical}")
print(f"Analytical: {analytical}")
print(f"Match: {np.allclose(numerical, analytical)}")

# Unit tangent vector
T = analytical / np.linalg.norm(analytical)
print(f"\nUnit tangent T(0) = {T}")
print(f"|T| = {np.linalg.norm(T):.6f}  (should be 1)")

# --- Integral of <2t, 3t^2, 1> from 0 to 1 ---
from scipy import integrate

def integrand_x(t): return 2 * t
def integrand_y(t): return 3 * t**2
def integrand_z(t): return 1.0

ix, _ = integrate.quad(integrand_x, 0, 1)
iy, _ = integrate.quad(integrand_y, 0, 1)
iz, _ = integrate.quad(integrand_z, 0, 1)

print(f"\n=== Integral of <2t, 3t^2, 1> from 0 to 1 ===")
print(f"Result: <{ix}, {iy}, {iz}>")
print(f"Expected: <1, 1, 1>")
```

## Connection to CS / Games / AI
- **Game physics**: object trajectories are vector-valued functions of time; the
  derivative gives velocity, the second derivative gives acceleration
- **Animation curves**: Bezier and spline paths are vector-valued functions
  parameterised by $t \in [0, 1]$
- **Robotics**: end-effector paths for robot arms are space curves
- **Particle systems**: each particle follows $\mathbf{r}(t)$ with forces
  modifying $\mathbf{r}''(t)$
- **ML embeddings**: a training trajectory through parameter space is a
  vector-valued function of training step

## Check Your Understanding
1. Given $\mathbf{r}(t) = \langle t^3, \; 2t, \; t^2 - 1 \rangle$, find $\mathbf{r}'(t)$
   and the unit tangent vector at $t = 1$.
2. Compute $\int_0^{\pi} \langle \sin t, \; \cos t, \; t \rangle \, dt$ by hand.
3. A particle moves along $\mathbf{r}(t) = \langle 3\cos t, \; 3\sin t, \; 4t \rangle$.
   Show that its speed $\|\mathbf{r}'(t)\|$ is constant. What is that constant?
