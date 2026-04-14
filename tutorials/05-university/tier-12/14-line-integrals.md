# Line Integrals

## Intuition
A regular integral sums a function along a straight interval. A **line integral**
sums a function along a curve — think of measuring the total weight of a wire
with varying density, or computing the total work done by a force as an object
moves along a curved path. In games, line integrals compute work done by forces
along trajectories. In ML, they appear in path integrals for stochastic processes
and in understanding why gradient descent converges (work done by the gradient
field).

## Prerequisites
- Tier 12, Lesson 13 — Vector fields (gradient fields, conservative fields)
- Tier 12, Lesson 1 — Vector-valued functions (parametric curves)

## From First Principles

### Line Integral of a Scalar Function

Given a curve $C$ parametrised by $\mathbf{r}(t) = (x(t), y(t))$ for
$t \in [a,b]$, and a scalar function $f(x,y)$:

$$\int_C f\, ds = \int_a^b f(x(t), y(t)) \, \|\mathbf{r}'(t)\|\, dt$$

where $ds = \|\mathbf{r}'(t)\|\, dt$ is the arc length element.

**Meaning:** You walk along $C$, at each point you measure $f$, and you weight
it by how far you walk. If $f = 1$, you get the arc length.

### Pen & Paper Example 1: Scalar Line Integral

Compute $\int_C xy\, ds$ where $C$ is the line segment from $(0,0)$ to $(1,2)$.

**Step 1.** Parametrise: $\mathbf{r}(t) = (t, 2t)$, $t \in [0,1]$.

**Step 2.** Compute $\|\mathbf{r}'(t)\|$: $\mathbf{r}'(t) = (1, 2)$,
$\|\mathbf{r}'(t)\| = \sqrt{1 + 4} = \sqrt{5}$.

**Step 3.** Substitute:

$$\int_0^1 (t)(2t) \sqrt{5}\, dt = 2\sqrt{5} \int_0^1 t^2\, dt = 2\sqrt{5} \cdot \frac{1}{3} = \frac{2\sqrt{5}}{3}$$

### Line Integral of a Vector Field (Work)

Given a vector field $\mathbf{F}(x,y) = P\,\mathbf{i} + Q\,\mathbf{j}$ and a
curve $C$ parametrised by $\mathbf{r}(t)$:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t)\, dt$$

**Expanded:**

$$= \int_a^b \left[P(x(t),y(t))\, x'(t) + Q(x(t),y(t))\, y'(t)\right] dt$$

**Physical meaning:** This is the **work** done by force $\mathbf{F}$ along the
path $C$. The dot product extracts the component of force along the direction
of motion.

### Pen & Paper Example 2: Work Integral

Compute $\int_C \mathbf{F} \cdot d\mathbf{r}$ where
$\mathbf{F} = (y, x)$ and $C$ is the parabola $y = x^2$ from $(0,0)$ to $(1,1)$.

**Step 1.** Parametrise: $\mathbf{r}(t) = (t, t^2)$, $t \in [0,1]$.
$\mathbf{r}'(t) = (1, 2t)$.

**Step 2.** $\mathbf{F}(\mathbf{r}(t)) = (t^2, t)$.

**Step 3.** Dot product: $(t^2)(1) + (t)(2t) = t^2 + 2t^2 = 3t^2$.

**Step 4.** Integrate: $\int_0^1 3t^2\, dt = t^3\big|_0^1 = 1$.

### Path Independence and Conservative Fields

**Fundamental Theorem for Line Integrals:** If $\mathbf{F} = \nabla \phi$, then:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \phi(\mathbf{r}(b)) - \phi(\mathbf{r}(a))$$

The integral depends only on the endpoints — the path does not matter.

**Pen & Paper Example 3:** $\mathbf{F} = (2xy, x^2)$ is conservative with
$\phi = x^2 y$. For any path from $(1,1)$ to $(3,2)$:

$$\int_C \mathbf{F} \cdot d\mathbf{r} = \phi(3,2) - \phi(1,1) = 9(2) - 1(1) = 17$$

### When Is a Line Integral Path-Dependent?

If $\mathbf{F}$ is not conservative, different paths between the same endpoints
give different work values. Example: $\mathbf{F} = (-y, x)$ (rotation field).

Along straight line from $(1,0)$ to $(0,1)$: parametrise as
$(1-t, t)$, $t \in [0,1]$. Work $= \int_0^1 [(-t)(-1) + (1-t)(1)]\, dt = \int_0^1 1\, dt = 1$.

Along quarter-circle: parametrise as $(\cos t, \sin t)$, $t \in [0, \pi/2]$.
Work $= \int_0^{\pi/2} [\sin^2 t + \cos^2 t]\, dt = \pi/2$.

Different paths, different work: $\mathbf{F}$ is not conservative. $\checkmark$

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Left: Vector field F = (y, x) with parabolic path
ax1 = axes[0]
xg = np.linspace(-0.5, 1.5, 10)
yg = np.linspace(-0.5, 1.5, 10)
Xg, Yg = np.meshgrid(xg, yg)
U, V = Yg, Xg  # F = (y, x)
ax1.quiver(Xg, Yg, U, V, color='lightblue', alpha=0.6)

# Parabolic path y = x^2
t = np.linspace(0, 1, 100)
ax1.plot(t, t**2, 'r-', linewidth=2.5, label='C: y = x²')
ax1.annotate('', xy=(1, 1), xytext=(0.9, 0.81),
            arrowprops=dict(arrowstyle='->', color='red', lw=2))

# Show F vectors along the path at a few points
for ti in [0.2, 0.5, 0.8]:
    xi, yi = ti, ti**2
    Fi = np.array([yi, xi])
    Fi_norm = Fi / (np.linalg.norm(Fi) + 0.01) * 0.15
    ax1.arrow(xi, yi, Fi_norm[0], Fi_norm[1], head_width=0.03,
             color='darkblue', linewidth=1.5)

ax1.set_xlabel('x'); ax1.set_ylabel('y')
ax1.set_title('Work integral: F=(y,x) along y=x²\nWork = 1')
ax1.legend(); ax1.set_aspect('equal'); ax1.grid(True, alpha=0.3)

# Right: Path independence — two paths, same endpoints
ax2 = axes[1]
# Conservative field F = (2xy, x^2)
xg2 = np.linspace(0, 4, 10)
yg2 = np.linspace(0, 3, 10)
Xg2, Yg2 = np.meshgrid(xg2, yg2)
U2, V2 = 2*Xg2*Yg2, Xg2**2
mag = np.sqrt(U2**2 + V2**2)
mag[mag == 0] = 1
ax2.quiver(Xg2, Yg2, U2/mag, V2/mag, mag, cmap='Oranges', alpha=0.6)

# Path 1: straight line
ax2.plot([1, 3], [1, 2], 'r-', linewidth=2.5, label='Path 1: line')
# Path 2: via (1,2) then (3,2)
ax2.plot([1, 1, 3], [1, 2, 2], 'b--', linewidth=2.5, label='Path 2: L-shape')

ax2.plot(1, 1, 'go', markersize=10, zorder=5)
ax2.plot(3, 2, 'rs', markersize=10, zorder=5)
ax2.text(1.1, 0.7, '(1,1)', fontsize=10)
ax2.text(3.1, 1.7, '(3,2)', fontsize=10)

ax2.set_xlabel('x'); ax2.set_ylabel('y')
ax2.set_title('Path independence: F=∇(x²y)\nBoth paths give work = 17')
ax2.legend(); ax2.set_aspect('equal'); ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
from scipy import integrate

# === Example 1: Scalar line integral of xy along (0,0)-(1,2) ===
def scalar_integrand(t):
    x, y = t, 2*t
    speed = np.sqrt(1 + 4)  # |r'(t)| = sqrt(5)
    return x * y * speed

result1, _ = integrate.quad(scalar_integrand, 0, 1)
exact1 = 2*np.sqrt(5)/3
print("=== Scalar line integral of xy ===")
print(f"Numerical: {result1:.6f}")
print(f"Exact: 2√5/3 = {exact1:.6f}")

# === Example 2: Work integral of F=(y,x) along y=x^2 ===
def work_integrand(t):
    x, y = t, t**2
    Fx, Fy = y, x     # F at (x,y)
    dx, dy = 1, 2*t   # r'(t)
    return Fx*dx + Fy*dy

result2, _ = integrate.quad(work_integrand, 0, 1)
print(f"\n=== Work: F=(y,x) along y=x² ===")
print(f"Numerical: {result2:.6f}")
print(f"Exact:     1.0")

# === Example 3: Path independence for F=(2xy, x^2) ===
# Path 1: straight line (1,1) to (3,2)
def work_path1(t):
    x = 1 + 2*t
    y = 1 + t
    Fx = 2*x*y
    Fy = x**2
    dx, dy = 2, 1
    return Fx*dx + Fy*dy

# Path 2: (1,1) -> (1,2) -> (3,2)
def work_path2a(t):  # vertical: x=1, y=1+t
    x, y = 1, 1+t
    return 2*x*y*0 + x**2*1  # dx=0, dy=1

def work_path2b(t):  # horizontal: x=1+2t, y=2
    x, y = 1+2*t, 2
    return 2*x*y*2 + x**2*0  # dx=2, dy=0

r_p1, _ = integrate.quad(work_path1, 0, 1)
r_p2a, _ = integrate.quad(work_path2a, 0, 1)
r_p2b, _ = integrate.quad(work_path2b, 0, 1)

print(f"\n=== Path independence: F=(2xy, x²), phi=x²y ===")
print(f"Path 1 (line):    {r_p1:.6f}")
print(f"Path 2 (L-shape): {r_p2a + r_p2b:.6f}")
print(f"phi(3,2)-phi(1,1) = {9*2 - 1*1}")

# === Example 4: Path-dependent (rotation field) ===
def work_line_rot(t):
    x, y = 1-t, t
    return (-y)*(-1) + x*1  # F=(-y,x), r'=(-1,1)

def work_arc_rot(t):
    x, y = np.cos(t), np.sin(t)
    return (-y)*(-np.sin(t)) + x*np.cos(t)

r_line, _ = integrate.quad(work_line_rot, 0, 1)
r_arc, _ = integrate.quad(work_arc_rot, 0, np.pi/2)
print(f"\n=== Path-dependent: F=(-y,x) ===")
print(f"Straight line: {r_line:.6f}")
print(f"Quarter circle: {r_arc:.6f} = π/2 = {np.pi/2:.6f}")
print(f"Different! Field is NOT conservative.")
```

## Connection to CS / Games / AI
- **Work and energy**: physics engines compute work done by forces along
  trajectories using line integrals; conservative forces allow energy shortcuts
- **Gradient descent convergence**: the total "work" done by $-\nabla L$ along
  the optimisation path equals the total loss decrease (path-independent for
  conservative fields)
- **Circulation**: the line integral of a velocity field around a closed loop
  measures rotation strength, used in fluid simulation
- **Electric potential**: voltage difference is the line integral of the electric
  field; circuit simulators compute this constantly
- **Stochastic calculus**: Ito integrals are line integrals along random paths,
  foundational to financial ML and diffusion models

## Check Your Understanding
1. Compute $\int_C (x^2 + y^2)\, ds$ where $C$ is the circle $x = 2\cos t$,
   $y = 2\sin t$, $t \in [0, 2\pi]$.
2. Evaluate $\int_C \mathbf{F} \cdot d\mathbf{r}$ for $\mathbf{F} = (x+y, x-y)$
   along the straight line from $(0,0)$ to $(2,1)$. Is $\mathbf{F}$ conservative?
3. Use the Fundamental Theorem for Line Integrals to evaluate
   $\int_C (3x^2 y)\,dx + (x^3)\,dy$ along any path from $(1,2)$ to $(2,-1)$.
