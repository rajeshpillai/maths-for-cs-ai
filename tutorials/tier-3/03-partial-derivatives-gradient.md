# Partial Derivatives and the Gradient ∇

## Intuition

When a function has multiple inputs (like a loss function depending on many
weights), the **partial derivative** tells you how the output changes when
you tweak **one** input while holding the rest fixed.  The **gradient** bundles
all partial derivatives into a vector pointing in the direction of steepest
ascent.  Flip the sign and you get gradient descent.

## Prerequisites

- Tier 3, Lesson 2: Derivatives

## From First Principles

### Partial derivatives

For $f(x, y) = x^2 + 3xy + y^2$:

$$\frac{\partial f}{\partial x} = 2x + 3y \quad \text{(treat } y \text{ as constant)}$$

$$\frac{\partial f}{\partial y} = 3x + 2y \quad \text{(treat } x \text{ as constant)}$$

**Pen & paper: Evaluate at $(1, 2)$:**

$\frac{\partial f}{\partial x}(1, 2) = 2(1) + 3(2) = 8$

$\frac{\partial f}{\partial y}(1, 2) = 3(1) + 2(2) = 7$

### The gradient vector

$$\nabla f = \begin{pmatrix} \frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{pmatrix}$$

**Pen & paper:** For $f(x, y) = x^2 + 3xy + y^2$ at $(1, 2)$:

$$\nabla f(1, 2) = \begin{pmatrix} 8 \\ 7 \end{pmatrix}$$

### Geometric meaning

- $\nabla f$ **points in the direction of steepest increase** of $f$
- $-\nabla f$ points in the direction of **steepest decrease** (this is gradient descent!)
- $\|\nabla f\|$ is the **rate of steepest increase**
- $\nabla f = \mathbf{0}$ at **critical points** (maxima, minima, saddle points)

### Pen & paper: Gradient of a loss function

Consider MSE loss for one data point: $L(w, b) = (wx + b - y)^2$

With $x = 2, y = 5$:

$$L(w, b) = (2w + b - 5)^2$$

$$\frac{\partial L}{\partial w} = 2(2w + b - 5) \cdot 2 = 4(2w + b - 5)$$

$$\frac{\partial L}{\partial b} = 2(2w + b - 5) \cdot 1 = 2(2w + b - 5)$$

At $w = 1, b = 1$: prediction = $2(1) + 1 = 3$, error = $3 - 5 = -2$

$$\nabla L(1, 1) = \begin{pmatrix} 4(-2) \\ 2(-2) \end{pmatrix} = \begin{pmatrix} -8 \\ -4 \end{pmatrix}$$

**Gradient descent step** (learning rate $\alpha = 0.1$):

$$\begin{pmatrix} w \\ b \end{pmatrix} \leftarrow \begin{pmatrix} 1 \\ 1 \end{pmatrix} - 0.1 \begin{pmatrix} -8 \\ -4 \end{pmatrix} = \begin{pmatrix} 1.8 \\ 1.4 \end{pmatrix}$$

New prediction: $2(1.8) + 1.4 = 5.0$ — closer to the target!

### Directional derivative

The rate of change of $f$ in direction $\hat{\mathbf{u}}$ (unit vector):

$$D_{\hat{\mathbf{u}}} f = \nabla f \cdot \hat{\mathbf{u}}$$

This is maximised when $\hat{\mathbf{u}}$ points in the same direction as $\nabla f$.

## Python Verification

```python
# ── Partial Derivatives & Gradient ──────────────────────────

# f(x,y) = x² + 3xy + y²
def f(x, y):
    return x**2 + 3*x*y + y**2

# Numerical partial derivatives
h = 1e-8
x, y = 1.0, 2.0

df_dx = (f(x + h, y) - f(x, y)) / h
df_dy = (f(x, y + h) - f(x, y)) / h

print("=== Partial derivatives of x² + 3xy + y² at (1,2) ===")
print(f"∂f/∂x = {df_dx:.6f} (analytical: {2*x + 3*y})")
print(f"∂f/∂y = {df_dy:.6f} (analytical: {3*x + 2*y})")
print(f"∇f = ({df_dx:.2f}, {df_dy:.2f})")

# Gradient descent on MSE loss
print("\n=== Gradient descent step ===")
x_data, y_data = 2.0, 5.0
w, b = 1.0, 1.0
alpha = 0.1

pred = w * x_data + b
error = pred - y_data
print(f"Before: w={w}, b={b}, pred={pred}, error={error}")

dL_dw = 2 * error * x_data
dL_db = 2 * error
print(f"∇L = ({dL_dw}, {dL_db})")

w -= alpha * dL_dw
b -= alpha * dL_db
pred = w * x_data + b
print(f"After:  w={w}, b={b}, pred={pred}")

# Multiple gradient descent steps
print("\n=== Multiple steps ===")
w, b = 1.0, 1.0
for step in range(10):
    pred = w * x_data + b
    error = pred - y_data
    loss = error ** 2
    dL_dw = 2 * error * x_data
    dL_db = 2 * error
    w -= alpha * dL_dw
    b -= alpha * dL_db
    if step % 2 == 0:
        print(f"Step {step}: loss={loss:.4f}, w={w:.4f}, b={b:.4f}")
```

## Connection to CS / Games / AI

- **Gradient descent** — $\mathbf{w} \leftarrow \mathbf{w} - \alpha \nabla L$: the update rule for all neural network training
- **Backpropagation** — computes $\nabla L$ efficiently using the chain rule
- **Terrain rendering** — the gradient of a heightmap gives the slope direction for water flow
- **Physics** — force = negative gradient of potential energy
- **Optimisation** — every modern optimiser (Adam, RMSProp) is built on gradients

### Directional Derivatives

The existing section above introduced the directional derivative formula briefly.
Here we derive it from the **limit definition** and work a full pen-and-paper
example.

**Limit definition:** The directional derivative of $f$ at $\mathbf{x}$ in the
direction of unit vector $\mathbf{u}$ is:

$$D_{\mathbf{u}}f(\mathbf{x}) = \lim_{h \to 0} \frac{f(\mathbf{x} + h\mathbf{u}) - f(\mathbf{x})}{h}$$

**Derivation of the dot-product formula:**

Let $\mathbf{x} = (x, y)$ and $\mathbf{u} = (u_1, u_2)$. Define $g(h) = f(x + hu_1, y + hu_2)$.

By the chain rule:

$$g'(h) = \frac{\partial f}{\partial x} \cdot u_1 + \frac{\partial f}{\partial y} \cdot u_2$$

Evaluate at $h = 0$:

$$D_{\mathbf{u}}f = g'(0) = \nabla f \cdot \mathbf{u}$$

This extends to $n$ dimensions: $D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u} = \sum_{i=1}^{n} \frac{\partial f}{\partial x_i} u_i$.

**Important:** $\mathbf{u}$ must be a **unit vector** ($\|\mathbf{u}\| = 1$).
If given a non-unit direction, normalise it first.

**Pen & paper: Compute directional derivative of $f(x,y) = x^2 + 3xy$ at $(1,2)$ in direction $\mathbf{u} = \frac{1}{\sqrt{2}}(1,1)$**

Step 1 — Partial derivatives:

$\frac{\partial f}{\partial x} = 2x + 3y$, $\quad \frac{\partial f}{\partial y} = 3x$

Step 2 — Evaluate at $(1, 2)$:

$\frac{\partial f}{\partial x}(1,2) = 2(1) + 3(2) = 8$

$\frac{\partial f}{\partial y}(1,2) = 3(1) = 3$

So $\nabla f(1,2) = (8, 3)$.

Step 3 — Verify $\mathbf{u}$ is a unit vector:

$\|\mathbf{u}\| = \sqrt{(1/\sqrt{2})^2 + (1/\sqrt{2})^2} = \sqrt{1/2 + 1/2} = 1$ ✓

Step 4 — Dot product:

$$D_{\mathbf{u}}f(1,2) = \nabla f \cdot \mathbf{u} = (8, 3) \cdot \left(\frac{1}{\sqrt{2}}, \frac{1}{\sqrt{2}}\right) = \frac{8}{\sqrt{2}} + \frac{3}{\sqrt{2}} = \frac{11}{\sqrt{2}} = \frac{11\sqrt{2}}{2} \approx 7.778$$

### The Gradient as Steepest Ascent

**Claim:** The gradient $\nabla f$ points in the direction of maximum rate of
increase. Here is the proof.

**Proof using the directional derivative:**

From the dot-product formula and the geometric definition of the dot product:

$$D_{\mathbf{u}}f = \nabla f \cdot \mathbf{u} = \|\nabla f\| \|\mathbf{u}\| \cos\theta = \|\nabla f\| \cos\theta$$

where $\theta$ is the angle between $\nabla f$ and $\mathbf{u}$ (and
$\|\mathbf{u}\| = 1$ since it is a unit vector).

- $\cos\theta$ is maximised when $\theta = 0$ (i.e., $\mathbf{u}$ parallel to $\nabla f$)
- At $\theta = 0$: $D_{\mathbf{u}}f = \|\nabla f\|$ — this is the **maximum rate of change**
- At $\theta = \pi$: $D_{\mathbf{u}}f = -\|\nabla f\|$ — the **minimum** (steepest descent)
- At $\theta = \pi/2$: $D_{\mathbf{u}}f = 0$ — **no change** (moving along a level curve)

**Key consequences:**

1. **$\nabla f$ points in the direction of steepest ascent** (maximum $D_\mathbf{u}f$)
2. **$-\nabla f$ points in the direction of steepest descent** (this is why gradient descent works!)
3. **$\|\nabla f\|$ is the maximum rate of change** — a large gradient means the function is changing rapidly
4. **$\nabla f$ is perpendicular to level curves** — at any point, the gradient is normal to the contour $f(x,y) = c$ passing through that point

**Why perpendicular to level curves?** On a level curve, $f$ is constant, so
$D_{\mathbf{u}}f = 0$ for any direction $\mathbf{u}$ tangent to the curve.
Since $\nabla f \cdot \mathbf{u} = 0$, the gradient is orthogonal to any
tangent direction — i.e., normal to the level curve.

### Visualisation

```python
# ── Gradient arrows perpendicular to contour lines ─────────
import numpy as np
import matplotlib.pyplot as plt

# Define f(x,y) = x² + 3xy
def f(x, y):
    return x**2 + 3*x*y

# Gradient of f
def grad_f(x, y):
    return np.array([2*x + 3*y, 3*x])

# Create grid for contour plot
xs = np.linspace(-2, 4, 200)
ys = np.linspace(-2, 4, 200)
X, Y = np.meshgrid(xs, ys)
Z = f(X, Y)

fig, ax = plt.subplots(1, 1, figsize=(8, 7))

# Contour lines
contours = ax.contour(X, Y, Z, levels=15, cmap='coolwarm')
ax.clabel(contours, inline=True, fontsize=8)

# Gradient vectors at a grid of sample points
sample_x = np.linspace(-1, 3, 6)
sample_y = np.linspace(-1, 3, 6)
for sx in sample_x:
    for sy in sample_y:
        g = grad_f(sx, sy)
        norm = np.linalg.norm(g)
        if norm > 0.5:  # skip near-zero gradients
            # Normalise arrows for display, colour by magnitude
            g_unit = g / norm
            ax.arrow(sx, sy, g_unit[0]*0.3, g_unit[1]*0.3,
                     head_width=0.08, head_length=0.04,
                     fc='black', ec='black')

# Highlight the point (1, 2) with its gradient and a directional derivative
point = np.array([1.0, 2.0])
g_at_point = grad_f(*point)
u = np.array([1, 1]) / np.sqrt(2)

# Gradient arrow (red)
ax.arrow(point[0], point[1], g_at_point[0]*0.08, g_at_point[1]*0.08,
         head_width=0.1, head_length=0.05, fc='red', ec='red', linewidth=2)
ax.annotate('∇f', (point[0] + g_at_point[0]*0.08, point[1] + g_at_point[1]*0.08 + 0.15),
            color='red', fontsize=12, fontweight='bold')

# Direction u arrow (blue)
ax.arrow(point[0], point[1], u[0]*0.8, u[1]*0.8,
         head_width=0.1, head_length=0.05, fc='blue', ec='blue', linewidth=2)
ax.annotate('u', (point[0] + u[0]*0.8 + 0.1, point[1] + u[1]*0.8),
            color='blue', fontsize=12, fontweight='bold')

ax.plot(*point, 'ko', markersize=6)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('f(x,y) = x² + 3xy — gradient arrows ⊥ contour lines')
ax.set_aspect('equal')
plt.tight_layout()
plt.savefig('gradient_contour.png', dpi=100)
plt.show()

# Verify the directional derivative numerically
D_u = np.dot(g_at_point, u)
print(f"∇f(1,2) = {g_at_point}")
print(f"Direction u = {u}")
print(f"Directional derivative D_u f = {D_u:.4f}")
print(f"Analytical: 11/√2 = {11/np.sqrt(2):.4f}")
print(f"‖∇f‖ = {np.linalg.norm(g_at_point):.4f} (max rate of change)")
```

## Check Your Understanding

1. **Pen & paper:** Find all partial derivatives of $f(x, y, z) = x^2y + yz^3 - 2xz$.
2. **Pen & paper:** Compute $\nabla f$ for $f(x, y) = e^{xy}$ at $(1, 1)$.
3. **Pen & paper:** Perform one gradient descent step on $L(w) = (w - 3)^2$ starting at $w = 0$ with $\alpha = 0.1$.  What is the new $w$?
4. **Think about it:** If $\nabla f = \mathbf{0}$, is the point necessarily a minimum?  What else could it be?
5. **Pen & paper:** For $f(x,y) = x^2y - y^2$, compute the directional derivative at $(2, 1)$ in the direction of $\mathbf{v} = (3, 4)$. (Remember to normalise $\mathbf{v}$ first.)
6. **Pen & paper:** For $f(x,y) = x^2 + 4y^2$, find the direction of steepest ascent at $(1, 1)$ and compute the maximum rate of change. In what directions is the rate of change zero?
