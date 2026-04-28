# Jacobian and Hessian Matrices

## Intuition

The **Jacobian** generalises the derivative to functions with multiple inputs
and outputs — it's the matrix of all first-order partial derivatives.  The
**Hessian** is the matrix of all second-order partial derivatives, and it
tells you about the **curvature** of a function: is this critical point a
bowl (minimum), a hill (maximum), or a saddle?

## Prerequisites

- Tier 3, Lesson 3: Partial Derivatives and Gradient
- Tier 2, Lesson 4: Matrix Multiplication

## From First Principles

### The Jacobian matrix

For a function $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^m$ with $m$ outputs and $n$ inputs:

$$\mathbf{J} = \begin{pmatrix} \frac{\partial f_1}{\partial x_1} & \cdots & \frac{\partial f_1}{\partial x_n} \\ \vdots & \ddots & \vdots \\ \frac{\partial f_m}{\partial x_1} & \cdots & \frac{\partial f_m}{\partial x_n} \end{pmatrix}$$

Row $i$ = gradient of the $i$-th output.

**Pen & paper:** $\mathbf{f}(x, y) = \begin{pmatrix} x^2 + y \\ xy \end{pmatrix}$

$$\mathbf{J} = \begin{pmatrix} 2x & 1 \\ y & x \end{pmatrix}$$

At $(x, y) = (2, 3)$:

$$\mathbf{J}(2, 3) = \begin{pmatrix} 4 & 1 \\ 3 & 2 \end{pmatrix}$$

### Jacobian determinant

For square Jacobians ($m = n$), the determinant tells you how much the
transformation locally scales area/volume.

$\det(\mathbf{J}) = 4 \times 2 - 1 \times 3 = 5$

> This appears in change of variables for integration (next few lessons).

### The Hessian matrix

For a scalar function $f: \mathbb{R}^n \to \mathbb{R}$, the Hessian is
the $n \times n$ matrix of second partial derivatives:

$$\mathbf{H} = \begin{pmatrix} \frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots \\ \frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots \\ \vdots & \vdots & \ddots \end{pmatrix}$$

The Hessian is always **symmetric**: $\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}$ (this is **Clairaut's theorem** — the order of differentiation doesn't matter, as long as the second derivatives are continuous).

**Pen & paper:** $f(x, y) = x^3 + 2x^2y - y^2$

First derivatives:
$f_x = 3x^2 + 4xy$, $f_y = 2x^2 - 2y$

Second derivatives:

$$\mathbf{H} = \begin{pmatrix} 6x + 4y & 4x \\ 4x & -2 \end{pmatrix}$$

At $(1, 1)$:

$$\mathbf{H}(1, 1) = \begin{pmatrix} 10 & 4 \\ 4 & -2 \end{pmatrix}$$

### Classifying critical points with the Hessian

At a critical point ($\nabla f = \mathbf{0}$), examine the eigenvalues of $\mathbf{H}$:

| Eigenvalues | Classification |
|------------|---------------|
| All positive | **Local minimum** (bowl) |
| All negative | **Local maximum** (hill) |
| Mixed signs | **Saddle point** |
| Any zero | Inconclusive |

**2×2 shortcut:** At critical point $(a, b)$:

$D = f_{xx}f_{yy} - (f_{xy})^2 = \det(\mathbf{H})$

- $D > 0$ and $f_{xx} > 0$: **minimum**
- $D > 0$ and $f_{xx} < 0$: **maximum**
- $D < 0$: **saddle point**

**Pen & paper:** $f(x, y) = x^2 + y^2$

$f_x = 2x, f_y = 2y$ → critical point at $(0, 0)$

$\mathbf{H} = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}$

$D = 4 > 0$, $f_{xx} = 2 > 0$ → **minimum** ✓

**Pen & paper:** $f(x, y) = x^2 - y^2$

$f_x = 2x, f_y = -2y$ → critical point at $(0, 0)$

$\mathbf{H} = \begin{pmatrix} 2 & 0 \\ 0 & -2 \end{pmatrix}$

$D = -4 < 0$ → **saddle point** ✓

## Python Verification

```python
# ── Jacobian & Hessian: verifying pen & paper work ──────────
import numpy as np

# Jacobian of f(x,y) = (x²+y, xy) at (2,3)
print("=== Jacobian ===")
h = 1e-7

def f_vec(v):
    x, y = v
    return np.array([x**2 + y, x * y])

# Numerical Jacobian
point = np.array([2.0, 3.0])
J = np.zeros((2, 2))
for j in range(2):
    e = np.zeros(2)
    e[j] = h
    J[:, j] = (f_vec(point + e) - f_vec(point)) / h

print(f"Numerical Jacobian at (2,3):\n{np.round(J, 4)}")
print(f"Analytical: [[4,1],[3,2]]")
print(f"det(J) = {np.linalg.det(J):.4f}")

# Hessian of f(x,y) = x³ + 2x²y - y²
print("\n=== Hessian ===")
def f_scalar(v):
    x, y = v
    return x**3 + 2*x**2*y - y**2

# Numerical Hessian
point = np.array([1.0, 1.0])
H = np.zeros((2, 2))
for i in range(2):
    for j in range(2):
        ei, ej = np.zeros(2), np.zeros(2)
        ei[i], ej[j] = h, h
        H[i,j] = (f_scalar(point+ei+ej) - f_scalar(point+ei) - f_scalar(point+ej) + f_scalar(point)) / h**2

print(f"Numerical Hessian at (1,1):\n{np.round(H, 2)}")
print(f"Analytical: [[10,4],[4,-2]]")

# Critical point classification
print("\n=== Critical point classification ===")

# f(x,y) = x² + y² at (0,0) → minimum
H1 = np.array([[2, 0], [0, 2]])
evals1 = np.linalg.eigvalsh(H1)
print(f"x²+y²: eigenvalues={evals1} → minimum (all positive)")

# f(x,y) = x² - y² at (0,0) → saddle
H2 = np.array([[2, 0], [0, -2]])
evals2 = np.linalg.eigvalsh(H2)
print(f"x²-y²: eigenvalues={evals2} → saddle (mixed signs)")

# f(x,y) = -x² - y² at (0,0) → maximum
H3 = np.array([[-2, 0], [0, -2]])
evals3 = np.linalg.eigvalsh(H3)
print(f"-x²-y²: eigenvalues={evals3} → maximum (all negative)")
```

## Visualisation — Hessian curvature: minimum, maximum, saddle

The **Hessian** is the matrix of second partial derivatives. For a 2-D
function the eigenvalues of the Hessian tell you the *curvature in two
perpendicular directions* — and the *signs* of those eigenvalues
classify what kind of critical point you are at.

```python
# ── Visualising what the Hessian classifies ────────────────
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401  (registers 3-D)

# Three quadratic surfaces with different Hessian signatures.
specs = [
    ("Local minimum\n(both eigenvalues > 0, bowl)",       lambda x, y: x**2 + y**2),
    ("Saddle point\n(mixed signs, Pringles chip)",        lambda x, y: x**2 - y**2),
    ("Local maximum\n(both eigenvalues < 0, dome)",       lambda x, y: -x**2 - y**2),
]

xs = np.linspace(-2, 2, 60)
X, Y = np.meshgrid(xs, xs)

fig = plt.figure(figsize=(15, 9))
for col, (title, f) in enumerate(specs):
    Z = f(X, Y)

    # Top: contour plot, with grad arrows pointing uphill.
    ax = fig.add_subplot(2, 3, col + 1)
    cs = ax.contour(X, Y, Z, levels=12, cmap="viridis")
    # Approximate gradient on a coarser grid for arrows.
    Xc = X[::8, ::8]; Yc = Y[::8, ::8]; Zc = f(Xc, Yc)
    Gx, Gy = np.gradient(Zc, xs[::8], xs[::8])
    ax.quiver(Xc, Yc, Gx, Gy, color="black", alpha=0.5, scale=40, width=0.005)
    ax.scatter([0], [0], color="red", s=140, zorder=5,
               label="critical point\n(grad = 0)")
    ax.set_title(title)
    ax.set_aspect("equal")
    ax.legend(loc="upper left", fontsize=8)
    ax.grid(True, alpha=0.3)

    # Bottom: 3-D surface, same colormap.
    ax3 = fig.add_subplot(2, 3, col + 4, projection="3d")
    ax3.plot_surface(X, Y, Z, cmap="viridis", alpha=0.9, linewidth=0)
    ax3.scatter([0], [0], [f(0, 0)], color="red", s=120)
    ax3.set_xlabel("x"); ax3.set_ylabel("y"); ax3.set_zlabel("f")

plt.tight_layout()
plt.show()

# Print the Hessian and its eigenvalues for each function.
print("Each Hessian (constant for a quadratic) tells you the type of critical point:")
for label, H in [("f = x² + y²  (min)",     np.array([[2, 0], [0, 2]])),
                 ("f = x² - y²  (saddle)",  np.array([[2, 0], [0, -2]])),
                 ("f = -x² - y² (max)",     np.array([[-2, 0], [0, -2]]))]:
    evals = np.linalg.eigvalsh(H)
    if (evals > 0).all():
        kind = "minimum (positive definite)"
    elif (evals < 0).all():
        kind = "maximum (negative definite)"
    else:
        kind = "saddle  (indefinite — mixed signs)"
    print(f"  {label:<24} H = {H.tolist()}   eigenvalues = {evals}   →  {kind}")
```

**Three pictures, one rule:**

- **All Hessian eigenvalues positive → local minimum** (a bowl). Every
  direction curves *up* away from the critical point.
- **All eigenvalues negative → local maximum** (a dome). Every
  direction curves *down*.
- **Mixed signs → saddle point** (a Pringles chip). One direction
  curves up, another curves down — the gradient is zero, but you are
  not at an extremum.

This is more than abstract calculus. **In high-dimensional optimisation
(deep neural networks have millions of parameters) almost every
critical point is a saddle, not a minimum** — that's because for any
random Hessian most eigenvalues come in mixed signs by sheer
combinatorics. The whole field of *escaping saddles* — momentum, Adam,
SGD's noise, second-order methods — exists because of the picture in
the middle column above. The eigenvalues of the loss-Hessian determine
*everything* about local optimisation behaviour.

## Connection to CS / Games / AI

- **Backpropagation** — computes the Jacobian-vector product efficiently (not the full Jacobian)
- **Newton's method** — uses the Hessian for second-order optimisation: $\mathbf{x} \leftarrow \mathbf{x} - \mathbf{H}^{-1}\nabla f$
- **Saddle points** — a major challenge in deep learning; most critical points in high dimensions are saddle points, not minima
- **Change of variables** — Jacobian determinant appears when transforming probability distributions (normalising flows)
- **Curvature** — Hessian eigenvalues determine how "steep" vs "flat" the loss landscape is along each direction

## Matrix Calculus: Vector and Matrix Gradients

### Gradient of a scalar-valued function of a vector

For a function $f: \mathbb{R}^n \to \mathbb{R}$, the **gradient** is the
column vector of all partial derivatives:

$$\nabla_\mathbf{x} f = \begin{pmatrix} \frac{\partial f}{\partial x_1} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{pmatrix}$$

This is the direction of steepest ascent.  It points "uphill" in the input
space.

### Common matrix calculus results

These identities appear constantly in ML derivations.  Learn them like
multiplication tables.

**Result 1:** $\nabla_\mathbf{x}(\mathbf{a}^T\mathbf{x}) = \mathbf{a}$

This is the vector analogue of $\frac{d}{dx}(ax) = a$.

**Pen & paper verification:** Let $\mathbf{a} = (a_1, a_2)^T$, $\mathbf{x} = (x_1, x_2)^T$.

$\mathbf{a}^T\mathbf{x} = a_1 x_1 + a_2 x_2$

$\frac{\partial}{\partial x_1}(a_1 x_1 + a_2 x_2) = a_1$, $\frac{\partial}{\partial x_2}(a_1 x_1 + a_2 x_2) = a_2$

$\nabla_\mathbf{x}(\mathbf{a}^T\mathbf{x}) = \begin{pmatrix} a_1 \\ a_2 \end{pmatrix} = \mathbf{a}$ ✓

**Result 2:** $\nabla_\mathbf{x}(\mathbf{x}^T\mathbf{A}\mathbf{x}) = (\mathbf{A} + \mathbf{A}^T)\mathbf{x}$

If $\mathbf{A}$ is symmetric ($\mathbf{A} = \mathbf{A}^T$), this simplifies to $2\mathbf{A}\mathbf{x}$.

This is the vector analogue of $\frac{d}{dx}(ax^2) = 2ax$.

**Pen & paper verification (2×2 case):**

Let $\mathbf{A} = \begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix}$, $\mathbf{x} = \begin{pmatrix} x_1 \\ x_2 \end{pmatrix}$

Step 1 — expand $\mathbf{x}^T\mathbf{A}\mathbf{x}$:

$\mathbf{A}\mathbf{x} = \begin{pmatrix} 2x_1 + x_2 \\ 3x_1 + 4x_2 \end{pmatrix}$

$\mathbf{x}^T\mathbf{A}\mathbf{x} = x_1(2x_1 + x_2) + x_2(3x_1 + 4x_2) = 2x_1^2 + x_1 x_2 + 3x_1 x_2 + 4x_2^2 = 2x_1^2 + 4x_1 x_2 + 4x_2^2$

Step 2 — take partial derivatives:

$\frac{\partial}{\partial x_1} = 4x_1 + 4x_2$, $\frac{\partial}{\partial x_2} = 4x_1 + 8x_2$

$\nabla = \begin{pmatrix} 4x_1 + 4x_2 \\ 4x_1 + 8x_2 \end{pmatrix}$

Step 3 — verify with the formula:

$\mathbf{A} + \mathbf{A}^T = \begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix} + \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix} = \begin{pmatrix} 4 & 4 \\ 4 & 8 \end{pmatrix}$

$(\mathbf{A} + \mathbf{A}^T)\mathbf{x} = \begin{pmatrix} 4x_1 + 4x_2 \\ 4x_1 + 8x_2 \end{pmatrix}$ ✓

### The total derivative and the Jacobian as best linear approximation

The Jacobian isn't just a table of partial derivatives — it is the **best
linear approximation** to the function near a point:

$$\mathbf{f}(\mathbf{x} + \mathbf{h}) \approx \mathbf{f}(\mathbf{x}) + \mathbf{J}(\mathbf{x})\,\mathbf{h}$$

This is the multivariable analogue of $f(x + h) \approx f(x) + f'(x)h$.

The matrix $\mathbf{J}$ is the **total derivative** — it captures how all
outputs change with respect to all inputs simultaneously.

### Tensor derivatives: gradient of a vector w.r.t. a vector

When you differentiate a **scalar** w.r.t. a vector, you get a vector (the gradient).
When you differentiate a **vector** w.r.t. a vector, you get a **matrix** — and
that matrix is exactly the Jacobian:

$$\frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \mathbf{J} \quad \text{(the Jacobian)}$$

More generally: differentiating an order-$m$ tensor w.r.t. an order-$n$ tensor
gives an order-$(m+n)$ tensor.  In deep learning, frameworks like PyTorch handle
this bookkeeping automatically, but the principle is the same.

### Python Verification (Matrix Calculus)

```python
# ── Matrix Calculus: verifying gradient identities ────────────
import numpy as np

h = 1e-7

# Result 1: ∇_x(a^T x) = a
print("=== ∇(a^T x) = a ===")
a = np.array([3.0, -2.0])
x = np.array([1.0, 4.0])

def f_linear(x):
    return a @ x

grad_numerical = np.zeros(2)
for i in range(2):
    e = np.zeros(2)
    e[i] = h
    grad_numerical[i] = (f_linear(x + e) - f_linear(x)) / h

print(f"Numerical gradient: {np.round(grad_numerical, 6)}")
print(f"a = {a}  ← should match")

# Result 2: ∇_x(x^T A x) = (A + A^T)x
print("\n=== ∇(x^T A x) = (A + A^T)x ===")
A = np.array([[2.0, 1.0],
              [3.0, 4.0]])
x = np.array([1.0, 2.0])

def f_quad(x):
    return x @ A @ x

grad_numerical = np.zeros(2)
for i in range(2):
    e = np.zeros(2)
    e[i] = h
    grad_numerical[i] = (f_quad(x + e) - f_quad(x)) / h

grad_formula = (A + A.T) @ x
print(f"Numerical gradient: {np.round(grad_numerical, 4)}")
print(f"(A + A^T)x = {grad_formula}  ← should match")

# Jacobian as best linear approximation
print("\n=== Jacobian as linear approximation ===")
def f_vec(v):
    x, y = v
    return np.array([x**2 + y, x * y])

point = np.array([2.0, 3.0])
J = np.array([[4.0, 1.0],   # analytical Jacobian at (2,3)
              [3.0, 2.0]])

delta = np.array([0.01, -0.02])
exact = f_vec(point + delta)
approx = f_vec(point) + J @ delta
print(f"f(x + h) exact:  {exact}")
print(f"f(x) + J·h:      {approx}")
print(f"Error:            {np.abs(exact - approx)}  ← very small")
```

## Inverse Function Theorem (brief)

### Statement

If $\mathbf{f}: \mathbb{R}^n \to \mathbb{R}^n$ is continuously differentiable
at a point $\mathbf{a}$, and the Jacobian determinant is non-zero:

$$\det(\mathbf{J}_f(\mathbf{a})) \ne 0$$

then $\mathbf{f}$ is **locally invertible** near $\mathbf{a}$.  That is, there
exists a neighbourhood of $\mathbf{a}$ where $\mathbf{f}^{-1}$ exists and is
also differentiable.

### The Jacobian of the inverse

The Jacobian of the inverse function is the matrix inverse of the Jacobian:

$$\mathbf{J}_{f^{-1}}(\mathbf{f}(\mathbf{a})) = \left(\mathbf{J}_f(\mathbf{a})\right)^{-1}$$

This is the multivariable version of the single-variable rule: if $y = f(x)$
and $f'(x) \ne 0$, then $(f^{-1})'(y) = \frac{1}{f'(x)}$.

### Intuition

The Jacobian is the best linear approximation to $\mathbf{f}$.  If that linear
map is invertible (non-zero determinant), then the function itself is invertible
nearby.  A zero determinant means the linear approximation "crushes" some
dimension — it loses information — so you cannot invert.

**Pen & paper:** Recall our function $\mathbf{f}(x, y) = (x^2 + y,\; xy)$ with
Jacobian at $(2, 3)$:

$\mathbf{J}(2, 3) = \begin{pmatrix} 4 & 1 \\ 3 & 2 \end{pmatrix}$, $\det = 5 \ne 0$

So $\mathbf{f}$ is locally invertible near $(2, 3)$.  The Jacobian of the
inverse at $\mathbf{f}(2, 3) = (7, 6)$ is:

$\mathbf{J}_{f^{-1}}(7, 6) = \frac{1}{5}\begin{pmatrix} 2 & -1 \\ -3 & 4 \end{pmatrix}$

### Python Verification (Inverse Function Theorem)

```python
# ── Inverse Function Theorem: verify J_inv = (J)^(-1) ────────
import numpy as np

J = np.array([[4.0, 1.0],
              [3.0, 2.0]])

print("=== Inverse Function Theorem ===")
print(f"det(J) = {np.linalg.det(J):.1f} ≠ 0 → locally invertible")

J_inv = np.linalg.inv(J)
print(f"\nJ⁻¹ = \n{J_inv}")
print(f"\nVerify J · J⁻¹ = I:\n{np.round(J @ J_inv, 10)}")
```

## Check Your Understanding

1. **Pen & paper:** Find the Jacobian of $\mathbf{f}(x, y) = \begin{pmatrix} e^x \cos y \\ e^x \sin y \end{pmatrix}$ at $(0, 0)$.
2. **Pen & paper:** Find the Hessian of $f(x, y) = x^2 + xy + y^2$.  Classify the critical point at $(0, 0)$.
3. **Think about it:** Why is second-order optimisation (using the Hessian) rarely used for training neural networks with millions of parameters?
4. **Pen & paper:** Compute $\nabla_\mathbf{x}(\mathbf{x}^T\mathbf{A}\mathbf{x})$ for the symmetric matrix $\mathbf{A} = \begin{pmatrix} 3 & 1 \\ 1 & 2 \end{pmatrix}$.  Evaluate at $\mathbf{x} = (1, -1)^T$.
5. **Pen & paper:** For $\mathbf{f}(x, y) = (x + y,\; x - y)$, compute $\mathbf{J}_f$ and $\mathbf{J}_f^{-1}$.  Verify that $\mathbf{J}_f \cdot \mathbf{J}_f^{-1} = \mathbf{I}$.
6. **Think about it:** In normalising flows (a generative model), we need $\det(\mathbf{J})$ to be cheap to compute.  Why do these models use architectures where the Jacobian is triangular?
