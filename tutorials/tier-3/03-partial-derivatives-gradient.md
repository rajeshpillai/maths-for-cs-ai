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

## Check Your Understanding

1. **Pen & paper:** Find all partial derivatives of $f(x, y, z) = x^2y + yz^3 - 2xz$.
2. **Pen & paper:** Compute $\nabla f$ for $f(x, y) = e^{xy}$ at $(1, 1)$.
3. **Pen & paper:** Perform one gradient descent step on $L(w) = (w - 3)^2$ starting at $w = 0$ with $\alpha = 0.1$.  What is the new $w$?
4. **Think about it:** If $\nabla f = \mathbf{0}$, is the point necessarily a minimum?  What else could it be?
