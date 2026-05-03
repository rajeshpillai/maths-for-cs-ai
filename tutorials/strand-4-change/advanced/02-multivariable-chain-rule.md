---
strand: change
level: advanced
order: 2
title: Multivariable Chain Rule and Jacobian
prerequisites:
  - tier: strand-4-change-advanced
    slug: 01-directional-derivatives
    description: Directional derivatives
connections:
  - strand-4-change-advanced/03-critical-points
applications:
  - cs: "Backpropagation as Jacobian-vector products"
  - life: "How derivatives compose in higher dimensions"
---

# Multivariable Chain Rule and Jacobian

## Mental

In one dimension: $(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$.

In higher dimensions, derivatives are **matrices** (Jacobians), and
the chain rule becomes a **matrix multiplication**.

For $f : \mathbb{R}^n \to \mathbb{R}^m$, the **Jacobian** is the
$m \times n$ matrix of all partial derivatives:

$$
J_f(\mathbf{x}) = \begin{pmatrix} \partial f_1/\partial x_1 & \cdots & \partial f_1/\partial x_n \\ \vdots & \ddots & \vdots \\ \partial f_m/\partial x_1 & \cdots & \partial f_m/\partial x_n \end{pmatrix}.
$$

The chain rule:

$$
J_{f \circ g}(\mathbf{x}) = J_f(g(\mathbf{x})) \cdot J_g(\mathbf{x}).
$$

A matrix product. Read right-to-left: $g$ first, then $f$.

## Worked example

$g(t) = (\cos t, \sin t)$ — circle parameterisation.
$f(x, y) = x^2 + y^2$ — squared radius.

$g'(t) = (-\sin t, \cos t)$ — column.
$\nabla f = (2x, 2y)$.

$J_f \cdot J_g = \nabla f^T \cdot g'(t) = 2x \cdot (-\sin t) + 2y \cdot \cos t$
$= 2\cos t (-\sin t) + 2\sin t \cos t = 0$.

Makes sense: $f \circ g = 1$ for every $t$ (you're moving around the
unit circle, distance to origin is constant).

## Worked example 2: ML forward pass

Layer 1: $\mathbf{h} = \sigma(W_1 \mathbf{x} + \mathbf{b}_1)$.
Layer 2: $\mathbf{y} = W_2 \mathbf{h} + \mathbf{b}_2$.

To compute $\partial \mathbf{y} / \partial \mathbf{x}$, apply chain
rule:

$$
\frac{\partial \mathbf{y}}{\partial \mathbf{x}} = \frac{\partial \mathbf{y}}{\partial \mathbf{h}} \cdot \frac{\partial \mathbf{h}}{\partial \mathbf{x}} = W_2 \cdot \mathrm{diag}(\sigma'(\mathbf{z})) \cdot W_1,
$$

where $\mathbf{z} = W_1 \mathbf{x} + \mathbf{b}_1$ is the pre-activation.

Backpropagation builds $\partial L / \partial \mathbf{x}$ by walking
this product **right-to-left** (forward pass) and then **right-to-left
again** for the gradient of the loss (backward pass).

## Interactive

:::widget type=numeric-input prompt="Jacobian of $f : \\mathbb{R}^2 \\to \\mathbb{R}^3$ has shape $3 \\times ?$" answer=2 explain="$3 \\times 2$.":::

:::widget type=numeric-input prompt="$J_{f \\circ g} = J_f \\cdot J_g$ — order matters: outer first. Type 1." answer=1 explain="Yes — outer (final) Jacobian on the left.":::

:::widget type=numeric-input prompt="For $f(x, y) = x^2 + y^2$ and $g(t) = (\\cos t, \\sin t)$, $\\frac{d}{dt} f(g(t)) = ?$ at any $t$." answer=0 explain="$0$ — $f \\circ g$ is constant.":::

:::widget type=numeric-input prompt="If $f : \\mathbb{R}^n \\to \\mathbb{R}$, the Jacobian is the gradient (transposed). Number of rows: $1$. Type 1." answer=1 explain="$1$.":::

## Symbolic

**Inverse function theorem**: if $f : \mathbb{R}^n \to \mathbb{R}^n$
has invertible Jacobian at $\mathbf{a}$, then $f$ has a smooth local
inverse near $\mathbf{a}$, and

$$
J_{f^{-1}}(f(\mathbf{a})) = J_f(\mathbf{a})^{-1}.
$$

**Determinant of Jacobian** plays the role of "local stretching
factor" — used in change-of-variables for integrals (Lesson 06).

**Total derivative** vs partial derivatives: the total derivative
$df/dt$ when $\mathbf{x}(t)$ is itself a function of $t$ uses the
chain rule:

$$
\frac{df}{dt} = \nabla f \cdot \frac{d\mathbf{x}}{dt}.
$$

## Computational

```python
import sympy as sp

x, y, t = sp.symbols("x y t")

# Composition example: f(g(t)) where f = x^2 + y^2, g(t) = (cos t, sin t)
f_xy = x**2 + y**2
g_t = sp.Matrix([sp.cos(t), sp.sin(t)])

# Jacobian of f w.r.t. (x, y)
Jf = sp.Matrix([[sp.diff(f_xy, x), sp.diff(f_xy, y)]])

# Jacobian of g w.r.t. t (column)
Jg = sp.Matrix([sp.diff(g_t[0], t), sp.diff(g_t[1], t)])

# Substitute g(t) into Jf and multiply
Jf_at_g = Jf.subs({x: g_t[0], y: g_t[1]})
chain = (Jf_at_g * Jg)[0, 0]
print(sp.simplify(chain))            # 0 — yep

# Multivariable Jacobian
F = sp.Matrix([x**2 + y, x * y, sp.exp(x)])
print(F.jacobian([x, y]))            # 3x2 Jacobian
```

```python
import torch

# Backpropagation = chain rule via autograd
x = torch.tensor([1.0, 2.0], requires_grad=True)
W1 = torch.eye(2)
W2 = torch.tensor([[0.5, -0.5]])
y = W2 @ torch.tanh(W1 @ x)
y.backward()
print(x.grad)        # gradient of y w.r.t. x — chain rule applied
```

## Applied

- **Backpropagation** — composition of layers $\Rightarrow$ chain
  rule of Jacobians. Reverse-mode AD = traverse this product
  right-to-left, materialising vector-Jacobian products instead
  of full Jacobians.
- **Coordinate changes** — transforming integrals from Cartesian
  to polar/cylindrical/spherical uses the Jacobian determinant.
- **Robot kinematics** — end-effector position depends on joint
  angles via a chain. Jacobian relates joint velocities to
  end-effector velocity.
- **Differential equations** — the Jacobian linearises a vector
  field at a fixed point; eigenvalues determine local stability.

## Check Your Understanding

:::widget type=numeric-input prompt="Chain rule order: $J_{f \\circ g} = J_f \\cdot J_g$ (outer first). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$f : \\mathbb{R}^3 \\to \\mathbb{R}^2$, $g : \\mathbb{R}^4 \\to \\mathbb{R}^3$. $J_{f \\circ g}$ shape: $2 \\times ?$" answer=4 explain="$2 \\times 4$.":::

:::widget type=numeric-input prompt="$J_{f^{-1}} = J_f^{-1}$ at corresponding points (inverse function theorem). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Determinant of Jacobian = local volume-stretching factor. Type 1." answer=1 explain="Yes.":::
