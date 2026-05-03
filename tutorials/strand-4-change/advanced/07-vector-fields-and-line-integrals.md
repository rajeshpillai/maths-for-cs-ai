---
strand: change
level: advanced
order: 7
title: Vector Fields and Line Integrals
prerequisites:
  - tier: strand-4-change-advanced
    slug: 06-change-of-variables
    description: Change of variables
connections:
  - strand-4-change-advanced/08-stokes-and-divergence
applications:
  - cs: "Path-dependent costs, fluid simulation, particle systems"
  - life: "Forces along a path, work done"
---

# Vector Fields and Line Integrals

## Mental

A **vector field** in $\mathbb{R}^n$ assigns a vector $\mathbf{F}(\mathbf{x})$
to every point $\mathbf{x}$. Examples:

- Gravity: $\mathbf{F}(\mathbf{x}) = -G M \mathbf{x}/|\mathbf{x}|^3$.
- Velocity of a fluid: $\mathbf{v}(\mathbf{x}, t)$.
- Electric field: $\mathbf{E}(\mathbf{x})$ from a charge distribution.

A **line integral** of a vector field along a curve $C$ measures the
total *push* of the field along that curve:

$$
\int_C \mathbf{F} \cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t)) \cdot \mathbf{r}'(t) \, dt.
$$

## Worked example

$\mathbf{F}(x, y) = (y, x)$, $C$: line from $(0, 0)$ to $(1, 1)$
parameterised as $\mathbf{r}(t) = (t, t)$, $t \in [0, 1]$.

$\mathbf{r}'(t) = (1, 1)$.
$\mathbf{F}(\mathbf{r}(t)) = (t, t)$.
$\mathbf{F} \cdot \mathbf{r}' = t + t = 2t$.

$\int_0^1 2t \, dt = 1$.

## Conservative vector fields

A vector field $\mathbf{F}$ is **conservative** if $\mathbf{F} = \nabla \varphi$
for some scalar function $\varphi$ (the **potential**).

For conservative fields:

$$
\int_C \mathbf{F} \cdot d\mathbf{r} = \varphi(\text{end}) - \varphi(\text{start}).
$$

The line integral depends only on **endpoints**, not on the path —
the **gradient theorem** for line integrals.

**Test for conservative** (in $\mathbb{R}^2$, simply connected):
$\mathbf{F} = (P, Q)$ is conservative iff $\partial P / \partial y = \partial Q / \partial x$.

In $\mathbb{R}^3$: $\nabla \times \mathbf{F} = \mathbf{0}$ — curl
vanishes.

## Worked example: a conservative field

$\mathbf{F} = (2xy, x^2)$. Check:
$\partial P / \partial y = 2x = \partial Q / \partial x$. ✓ Conservative.

Find $\varphi$: integrate $P = 2xy$ in $x$: $\varphi = x^2 y + h(y)$.
$\partial \varphi / \partial y = x^2 + h'(y)$ must equal $Q = x^2$,
so $h'(y) = 0$, $h$ constant. $\varphi(x, y) = x^2 y + C$.

For any path from $(0, 0)$ to $(1, 2)$: $\int_C \mathbf{F} \cdot d\mathbf{r} = \varphi(1, 2) - \varphi(0, 0) = 2 - 0 = 2$.

## Interactive

:::widget type=numeric-input prompt="$\\int_C \\mathbf{F} \\cdot d\\mathbf{r}$ along $\\mathbf{r}(t) = (t, t), t \\in [0, 1]$ for $\\mathbf{F} = (y, x)$: $?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="Conservative $\\mathbf{F} \\Leftrightarrow \\mathbf{F} = \\nabla \\varphi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbf{F} = (y, x)$ — conservative? Test $\\partial y/\\partial y = 1$, $\\partial x/\\partial x = 1$. Equal. Type 1." answer=1 explain="Yes — potential is $\\varphi = xy$.":::

:::widget type=numeric-input prompt="$\\mathbf{F} = (-y, x)$ — conservative? $\\partial(-y)/\\partial y = -1$, $\\partial x/\\partial x = 1$. Equal? Type 1 yes, 0 no." answer=0 explain="No — non-conservative; this field has nonzero circulation.":::

## Symbolic

**Work**: $\int_C \mathbf{F} \cdot d\mathbf{r}$ is the work done by
force $\mathbf{F}$ along path $C$. Conservative ⇔ work depends only
on endpoints (energy conservation).

**Curl** (in $\mathbb{R}^3$):

$$
\nabla \times \mathbf{F} = \left(\frac{\partial F_3}{\partial y} - \frac{\partial F_2}{\partial z}, \frac{\partial F_1}{\partial z} - \frac{\partial F_3}{\partial x}, \frac{\partial F_2}{\partial x} - \frac{\partial F_1}{\partial y}\right).
$$

Measures local rotation of the field.

**Divergence**:

$$
\nabla \cdot \mathbf{F} = \frac{\partial F_1}{\partial x} + \frac{\partial F_2}{\partial y} + \frac{\partial F_3}{\partial z}.
$$

Measures local "outflow" — sources/sinks.

## Computational

```python
import sympy as sp

x, y, t = sp.symbols("x y t")

# Line integral example
F = sp.Matrix([y, x])
r = sp.Matrix([t, t])
dr = sp.Matrix([sp.diff(r[0], t), sp.diff(r[1], t)])
F_at_r = F.subs({x: r[0], y: r[1]})
integrand = F_at_r.dot(dr)
print(sp.integrate(integrand, (t, 0, 1)))      # 1

# Conservativeness test in R^2
def is_conservative(P, Q):
    return sp.simplify(sp.diff(P, y) - sp.diff(Q, x)) == 0

print(is_conservative(2*x*y, x**2))            # True
print(is_conservative(-y, x))                  # False — has curl

# Find potential when conservative
def potential(P, Q):
    phi = sp.integrate(P, x)
    h = Q - sp.diff(phi, y)
    return phi + sp.integrate(h, y)

print(potential(2*x*y, x**2))                  # x²y
```

## Applied

- **Physics — work and energy** — the line-integral formulation
  underlies all classical mechanics.
- **Fluid dynamics** — flow rate through a pipe = velocity field
  integrated along streamlines.
- **Electromagnetism** — electric/magnetic line integrals (Ampère's
  law, Faraday's law).
- **Path planning with cost fields** — robotics integrates a cost
  field along candidate paths to score them.
- **Generative ML** — flow-matching and continuous normalizing
  flows are vector-field problems with line-integral training
  objectives.

## Check Your Understanding

:::widget type=numeric-input prompt="Conservative $\\Leftrightarrow$ curl is zero (in simply-connected domain). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbf{F} = \\nabla \\varphi \\Rightarrow \\int_C \\mathbf{F} \\cdot d\\mathbf{r}$ depends only on endpoints. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Divergence $\\nabla \\cdot \\mathbf{F}$ measures outflow. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Curl $\\nabla \\times \\mathbf{F}$ measures local rotation. Type 1." answer=1 explain="Yes.":::
