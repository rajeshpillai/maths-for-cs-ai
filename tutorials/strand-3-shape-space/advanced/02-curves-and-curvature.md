---
strand: shape-space
level: advanced
order: 2
title: Curves and Curvature
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 01-projective-transformations
    description: Projective transformations
connections:
  - strand-3-shape-space-advanced/03-surfaces-fundamental-forms
applications:
  - cs: "Path planning, vehicle dynamics, 3D modeling spline curvature"
  - life: "Quantifying how 'bent' a curve is at each point"
---

# Curves and Curvature

## Mental

A **smooth parameterised curve** $\gamma : I \to \mathbb{R}^n$ assigns
a point in $\mathbb{R}^n$ to each parameter $t \in I$. The
**velocity** $\gamma'(t)$ is the tangent vector; **acceleration**
$\gamma''(t)$ measures how the velocity changes.

The **arc length** from $a$ to $b$:

$$
L = \int_a^b |\gamma'(t)| \, dt.
$$

When $|\gamma'(t)| = 1$ for all $t$, the parameterisation is by
**arc length** — the natural choice for geometric formulas.

## Curvature in 2D and 3D

For a curve $\gamma$ parameterised by arc length, the **curvature**
$\kappa$ is

$$
\kappa = |\gamma''(s)|.
$$

Geometric meaning: $\kappa$ is the reciprocal of the radius of the
**osculating circle** — the circle that best matches $\gamma$ at $s$.

$\kappa = 0$: locally straight.
$\kappa = 1/r$: matches a circle of radius $r$.
$\kappa$ large: tight turn.

For a general parameterisation $\gamma(t)$ in 2D:

$$
\kappa = \frac{|x' y'' - y' x''|}{(x'^2 + y'^2)^{3/2}}.
$$

## Worked example: circle of radius $r$

Parameterise $\gamma(t) = (r \cos t, r \sin t)$. $|\gamma'| = r$.

Reparameterise by arc length $s = rt$, so $\gamma(s) = (r \cos(s/r), r \sin(s/r))$.
$\gamma''(s) = (-\frac{1}{r}\cos(s/r), -\frac{1}{r}\sin(s/r))$, magnitude
$1/r$.

So circle of radius $r$ has constant curvature $1/r$. ✓

## 3D curves: curvature and torsion

In 3D, two scalar invariants describe a curve up to rigid motion:

- **Curvature** $\kappa$ — how much the tangent turns.
- **Torsion** $\tau$ — how much the curve twists out of its osculating
  plane.

Captured by the **Frenet-Serret frame** $(\mathbf{T}, \mathbf{N}, \mathbf{B})$
of unit tangent, normal, binormal:

$$
\mathbf{T}' = \kappa \mathbf{N}, \quad \mathbf{N}' = -\kappa \mathbf{T} + \tau \mathbf{B}, \quad \mathbf{B}' = -\tau \mathbf{N}.
$$

## Interactive

:::widget type=numeric-input prompt="Curvature of circle of radius 5: $1/5 = ?$. Type 0.2." answer=0.2 explain="$0.2$.":::

:::widget type=numeric-input prompt="Curvature of straight line: $\\kappa = ?$" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Osculating circle has radius $1/\\kappa$. For $\\kappa = 0.1$: radius?" answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="In 3D, complete invariants of a curve up to rigid motion: $\\kappa(s)$ and $\\tau(s)$. Number of invariants?" answer=2 explain="$2$.":::

## Symbolic

**Fundamental theorem of curves**: any two functions $\kappa, \tau$
of arc length $s$ (with $\kappa > 0$) define a curve uniquely up to
rigid motion. So a 3D curve's "shape" is exactly the pair
$(\kappa(s), \tau(s))$.

**Bezier curves and splines**: control-point parameterisations used
in graphics and CAD. Continuity of higher derivatives across spline
joints (C¹, C², G²) controls visual smoothness; **curvature
continuity** is what eyes notice.

**Plane curve evolutes** — locus of centres of osculating circles —
a classical construction.

## Computational

```python
import numpy as np
import sympy as sp

t = sp.symbols("t")

def curvature_2d_param(x, y, t_var):
    xp, yp = sp.diff(x, t_var), sp.diff(y, t_var)
    xpp, ypp = sp.diff(xp, t_var), sp.diff(yp, t_var)
    return sp.simplify((xp*ypp - yp*xpp) / (xp**2 + yp**2)**(sp.Rational(3, 2)))

# Circle of radius 5
print(curvature_2d_param(5*sp.cos(t), 5*sp.sin(t), t))   # 1/5

# Parabola y = x^2 with x = t
print(curvature_2d_param(t, t**2, t))                     # 2 / (1 + 4t^2)^(3/2)
# Max at t=0: kappa = 2 (osculating circle radius 1/2)

# 3D helix: gamma(t) = (cos t, sin t, t)
gx, gy, gz = sp.cos(t), sp.sin(t), t
gp = sp.Matrix([sp.diff(gx, t), sp.diff(gy, t), sp.diff(gz, t)])
gpp = sp.diff(gp, t)
speed = sp.sqrt(gp.dot(gp))
kappa = (gp.cross(gpp)).norm() / speed**3
print(sp.simplify(kappa))                                  # 1/2 — constant
```

## Applied

- **Vehicle dynamics** — cornering performance is limited by
  curvature; race tracks are designed with controlled curvature
  profiles.
- **Robotic path planning** — minimum-curvature paths are
  energy-efficient; clothoid spirals (constant rate of curvature
  change) are used in railway and highway design.
- **3D modeling and CAD** — surface aesthetics depend on curvature
  continuity; G² continuous joints are essential for high-quality
  modeling.
- **Computer animation** — character motion smoothness analysed via
  trajectory curvature.
- **Medical imaging** — vessel curvature analysis in MRA images for
  diagnosing stenoses and aneurysms.

## Check Your Understanding

:::widget type=numeric-input prompt="Curvature of a circle of radius 4: $\\kappa = 1/4 = ?$. Type 0.25." answer=0.25 explain="$0.25$.":::

:::widget type=numeric-input prompt="Straight line curvature: $0$. Type 0." answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Helix has constant curvature and constant torsion. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Two scalar invariants determine a 3D curve up to rigid motion: curvature and torsion. Type 2." answer=2 explain="$2$.":::
