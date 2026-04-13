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

The Hessian is always **symmetric** (by Clairaut's theorem, mixed partials are equal).

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

## Connection to CS / Games / AI

- **Backpropagation** — computes the Jacobian-vector product efficiently (not the full Jacobian)
- **Newton's method** — uses the Hessian for second-order optimisation: $\mathbf{x} \leftarrow \mathbf{x} - \mathbf{H}^{-1}\nabla f$
- **Saddle points** — a major challenge in deep learning; most critical points in high dimensions are saddle points, not minima
- **Change of variables** — Jacobian determinant appears when transforming probability distributions (normalising flows)
- **Curvature** — Hessian eigenvalues determine how "steep" vs "flat" the loss landscape is along each direction

## Check Your Understanding

1. **Pen & paper:** Find the Jacobian of $\mathbf{f}(x, y) = \begin{pmatrix} e^x \cos y \\ e^x \sin y \end{pmatrix}$ at $(0, 0)$.
2. **Pen & paper:** Find the Hessian of $f(x, y) = x^2 + xy + y^2$.  Classify the critical point at $(0, 0)$.
3. **Think about it:** Why is second-order optimisation (using the Hessian) rarely used for training neural networks with millions of parameters?
