---
strand: change
level: advanced
order: 0
title: Partial Derivatives and the Gradient
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 09-change-capstone
    description: Intermediate calculus capstone
connections:
  - strand-4-change-advanced/01-directional-derivatives
applications:
  - cs: "Backpropagation, every gradient-based optimiser"
  - life: "Slope of a multi-variable landscape in each axis direction"
---

# Partial Derivatives and the Gradient

## Mental

For a function $f : \mathbb{R}^n \to \mathbb{R}$, the **partial
derivative** with respect to $x_i$ measures how $f$ changes when
*only* $x_i$ varies and the rest are held fixed:

$$
\frac{\partial f}{\partial x_i} = \lim_{h \to 0} \frac{f(\ldots, x_i + h, \ldots) - f(\ldots, x_i, \ldots)}{h}.
$$

In practice: differentiate as in 1D, treating other variables as
constants.

## The gradient

Stack all partial derivatives into a vector:

$$
\nabla f = \left(\frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \ldots, \frac{\partial f}{\partial x_n}\right).
$$

This is the **gradient**. Two key properties:

1. $\nabla f$ points in the direction of **steepest ascent** at each
   point.
2. Its magnitude $|\nabla f|$ is the rate of steepest ascent.

For optimization: gradient *descent* moves in the direction $-\nabla f$.

## Worked example

$f(x, y) = x^2 + 3 x y + y^3$.

$\frac{\partial f}{\partial x} = 2x + 3y$ (treat $y$ as constant).
$\frac{\partial f}{\partial y} = 3x + 3y^2$ (treat $x$ as constant).

$\nabla f = (2x + 3y, 3x + 3y^2)$.

At $(1, 2)$: $\nabla f(1, 2) = (2 + 6, 3 + 12) = (8, 15)$.

Magnitude $|(8, 15)| = \sqrt{64 + 225} = \sqrt{289} = 17$.

So $f$ increases fastest at rate 17 per unit step at $(1, 2)$.

## Higher-order partials

$\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial}{\partial x}\left(\frac{\partial f}{\partial y}\right)$.

**Clairaut's theorem**: if $f$ is $C^2$ (twice continuously
differentiable), $\frac{\partial^2 f}{\partial x \partial y} = \frac{\partial^2 f}{\partial y \partial x}$.
Order doesn't matter.

Stack second partials into the **Hessian** matrix:

$$
H = \begin{pmatrix} \partial^2 f / \partial x_1^2 & \cdots & \partial^2 f / \partial x_1 \partial x_n \\ \vdots & \ddots & \vdots \\ \partial^2 f / \partial x_n \partial x_1 & \cdots & \partial^2 f / \partial x_n^2 \end{pmatrix}.
$$

Symmetric (by Clairaut). Used in second-order optimization.

## Interactive

:::widget type=numeric-input prompt="$f(x, y) = x^2 y$. $\\partial f/\\partial x$ at $(2, 3)$: $2 \\cdot 2 \\cdot 3 = ?$" answer=12 explain="$12$.":::

:::widget type=numeric-input prompt="Same: $\\partial f/\\partial y$ at $(2, 3)$: $4$. Type 4." answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="$\\nabla f$ at $(2, 3)$ has magnitude $\\sqrt{144 + 16} = \\sqrt{160} \\approx ?$. Round 4 dp." answer=12.6491 tolerance=0.005 explain="$12.65$.":::

:::widget type=numeric-input prompt="Gradient points in direction of steepest ascent. Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Total differential** (linear approximation):

$$
df = \nabla f \cdot d\mathbf{x} = \frac{\partial f}{\partial x_1} dx_1 + \ldots + \frac{\partial f}{\partial x_n} dx_n.
$$

For small displacement $\Delta \mathbf{x}$:
$\Delta f \approx \nabla f \cdot \Delta \mathbf{x}$.

**Continuity vs differentiability**: in $\mathbb{R}^n$, the existence
of all partials does *not* imply differentiability. For
differentiability, we need the gradient to be a true linear
approximation:

$$
\lim_{\mathbf{h} \to 0} \frac{f(\mathbf{x} + \mathbf{h}) - f(\mathbf{x}) - \nabla f(\mathbf{x}) \cdot \mathbf{h}}{|\mathbf{h}|} = 0.
$$

Sufficient condition: all partials exist and are continuous.

## Computational

```python
import sympy as sp

x, y = sp.symbols("x y")
f = x**2 + 3 * x * y + y**3

# Partial derivatives
fx = sp.diff(f, x)
fy = sp.diff(f, y)
print(fx)                      # 2x + 3y
print(fy)                      # 3x + 3y^2

# Gradient at (1, 2)
print(fx.subs({x: 1, y: 2}), fy.subs({x: 1, y: 2}))   # 8 15

# Magnitude
import math
print(math.hypot(8, 15))       # 17.0

# Hessian
H = sp.hessian(f, (x, y))
print(H)                        # [[2, 3], [3, 6y]]
```

```python
import numpy as np

# Numerical gradient via central differences
def grad(f, x, h=1e-6):
    g = np.zeros_like(x, dtype=float)
    for i in range(len(x)):
        e = np.zeros_like(x, dtype=float); e[i] = h
        g[i] = (f(x + e) - f(x - e)) / (2 * h)
    return g

f = lambda v: v[0]**2 + 3 * v[0] * v[1] + v[1]**3
print(grad(f, np.array([1.0, 2.0])))    # ~[8, 15]
```

## Applied

- **Backpropagation** computes $\nabla L$ for loss $L$ over millions
  of parameters via the chain rule, layer by layer.
- **Gradient descent** in optimisers (SGD, Adam) moves $-\nabla L$
  per step.
- **Heat-flow simulations** in physics — temperature gradient $\nabla T$
  drives flux.
- **Geographic terrain analysis** — slope of a digital elevation
  map is its gradient. Hydrology models use it.
- **Image processing** — edge detection (Sobel filter) approximates
  the gradient of pixel intensity.

## Check Your Understanding

:::widget type=numeric-input prompt="$f(x, y) = x^3 + y^2$. $\\partial f/\\partial x = 3x^2$. At $x = 2$: $?$" answer=12 explain="$12$.":::

:::widget type=numeric-input prompt="Same: $\\partial f/\\partial y = 2y$. At $y = 3$: $?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="By Clairaut: $\\partial^2 f / \\partial x \\partial y = \\partial^2 f / \\partial y \\partial x$ for $C^2$ functions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hessian is the matrix of second partials. For $f: \\mathbb{R}^3 \\to \\mathbb{R}$, $H$ is $3 \\times 3$. Type 3." answer=3 explain="$3$.":::
