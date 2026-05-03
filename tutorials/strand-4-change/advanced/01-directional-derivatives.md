---
strand: change
level: advanced
order: 1
title: Directional Derivatives and Tangent Planes
prerequisites:
  - tier: strand-4-change-advanced
    slug: 00-partial-derivatives
    description: Partial derivatives
connections:
  - strand-4-change-advanced/02-multivariable-chain-rule
applications:
  - cs: "Activation function landscapes, surface rendering"
  - life: "Slope along an arbitrary direction, not just axes"
---

# Directional Derivatives and Tangent Planes

## Mental

Partials measure slope along the coordinate axes. The **directional
derivative** generalises this to *any* unit direction $\mathbf{u}$:

$$
D_{\mathbf{u}} f(\mathbf{x}) = \lim_{h \to 0} \frac{f(\mathbf{x} + h \mathbf{u}) - f(\mathbf{x})}{h}.
$$

The instantaneous slope of $f$ as you walk in direction $\mathbf{u}$.

## Computing it from the gradient

For differentiable $f$, the directional derivative is the **dot
product**:

$$
D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}.
$$

Two corollaries (the gradient's geometric meaning):

- **Maximised** when $\mathbf{u}$ points along $\nabla f$ — the
  steepest ascent direction.
- **Zero** when $\mathbf{u} \perp \nabla f$ — moving along a level
  curve / surface.

The maximum rate is $|\nabla f|$.

## Worked example

$f(x, y) = x^2 + y^2$, $\nabla f = (2x, 2y)$.

At $(3, 4)$: $\nabla f = (6, 8)$, magnitude $10$.

Direction $\mathbf{u} = (1, 0)$ (along x-axis):
$D_{\mathbf{u}} f = 6$.

Direction $\mathbf{u} = (1/\sqrt{2}, 1/\sqrt{2})$ (NE):
$D_{\mathbf{u}} f = 6/\sqrt{2} + 8/\sqrt{2} = 14/\sqrt{2} \approx 9.9$.

Direction $\mathbf{u} = (3/5, 4/5)$ (along $\nabla f$):
$D_{\mathbf{u}} f = 18/5 + 32/5 = 50/5 = 10 = |\nabla f|$. **Max.** ✓

## Tangent plane

For a surface $z = f(x, y)$ at point $(a, b, f(a, b))$, the tangent
plane is

$$
z = f(a, b) + \frac{\partial f}{\partial x}(a, b)(x - a) + \frac{\partial f}{\partial y}(a, b)(y - b).
$$

The 2D linear approximation. Useful in everything from rendering
to backpropagation linearisations.

## Interactive

:::widget type=numeric-input prompt="$D_{\\mathbf{u}} f = \\nabla f \\cdot \\mathbf{u}$. For $\\nabla f = (3, 4)$ and $\\mathbf{u} = (1, 0)$: $?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$|\\nabla f| = ?$ if $\\nabla f = (3, 4)$." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="Direction $\\mathbf{u} \\perp \\nabla f$ — $D_\\mathbf{u} f = ?$" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Tangent plane to $z = x^2 + y^2$ at $(1, 1, 2)$: $z = 2 + 2(x-1) + 2(y-1) = 2x + 2y - 2$. At $(2, 2)$: $z = ?$" answer=6 explain="$2 \\cdot 2 + 2 \\cdot 2 - 2 = 6$.":::

## Symbolic

**Linear approximation in $\mathbb{R}^n$**:

$$
f(\mathbf{x} + \mathbf{h}) \approx f(\mathbf{x}) + \nabla f(\mathbf{x}) \cdot \mathbf{h} + \frac{1}{2} \mathbf{h}^T H(\mathbf{x}) \mathbf{h} + \ldots
$$

The first-order term gives tangent planes; the second-order term
gives quadratic approximation (and is what Newton's method uses).

**Level surfaces** $\{f = c\}$ have $\nabla f$ as an outward normal.
For $f(x, y, z) = x^2 + y^2 + z^2$, $\nabla f = 2 \mathbf{r}$ — the
gradient points radially outward from the origin, perpendicular to
the spherical level surfaces.

**Implicit function theorem**: if $F(\mathbf{x}, y) = 0$ defines $y$
as a function of $\mathbf{x}$ near a point, you can compute
$\partial y / \partial x_i$ from the partials of $F$ without
solving for $y$ explicitly.

## Computational

```python
import sympy as sp

x, y = sp.symbols("x y")
f = x**2 + y**2

grad_f = sp.Matrix([sp.diff(f, x), sp.diff(f, y)])
print(grad_f.subs({x: 3, y: 4}))                # Matrix([[6], [8]])

# Directional derivative
import sympy as sp
def directional(f, vars, point, direction):
    g = sp.Matrix([sp.diff(f, v) for v in vars]).subs(dict(zip(vars, point)))
    u = sp.Matrix(direction)
    u = u / u.norm()
    return float(g.dot(u))

print(directional(f, [x, y], [3, 4], [1, 0]))    # 6
print(directional(f, [x, y], [3, 4], [3, 4]))    # 10  — max

# Tangent plane equation
def tangent_plane(f, vars, point):
    g = [sp.diff(f, v) for v in vars]
    z0 = f.subs(dict(zip(vars, point)))
    return z0 + sum(gi.subs(dict(zip(vars, point))) * (v - p)
                    for gi, v, p in zip(g, vars, point))

print(tangent_plane(f, [x, y], [1, 1]))         # 2x + 2y - 2
```

## Applied

- **Computer graphics — surface normals** are the gradient of an
  implicit surface; lighting calculations dot a normal with a light
  direction.
- **ML loss landscapes** — directional curvature predicts how
  optimisers behave; "sharp minima vs flat minima" debates use this
  language.
- **Robotics — trajectory planning** at a configuration uses
  directional derivatives of a cost field.
- **Geophysics — flow direction** of water/lava follows $-\nabla h$
  where $h$ is elevation.
- **Image rendering — bump mapping** perturbs the gradient/normal
  to fake fine detail.

## Check Your Understanding

:::widget type=numeric-input prompt="$D_\\mathbf{u} f$ is maximum when $\\mathbf{u}$ points along $\\nabla f$. Maximum value: $|\\nabla f|$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbf{u}$ along a level set of $f$: $D_\\mathbf{u} f = ?$" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Tangent plane to $z = x y$ at $(1, 1, 1)$: $z = 1 + 1(x-1) + 1(y-1) = x + y - 1$. At $(2, 2)$: $z = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$\\nabla f$ is perpendicular to level sets of $f$. Type 1." answer=1 explain="Yes.":::
