---
strand: change
level: advanced
order: 4
title: Lagrange Multipliers
prerequisites:
  - tier: strand-4-change-advanced
    slug: 03-critical-points
    description: Critical points
connections:
  - strand-4-change-advanced/05-multiple-integrals
applications:
  - cs: "Constrained optimisation in ML, SVM dual, max-entropy distributions"
  - life: "Optimising under a constraint"
---

# Lagrange Multipliers

## Explain Like I Am 7

Imagine you have to walk along a curvy fence in a field, and you
want to find the highest point on the path.  The hill's gradient
points uphill, but you can't go uphill directly — you have to stay
on the fence.  At the highest point along the fence, the only
"uphill" direction left is *off* the fence.  **Lagrange
multipliers** is the elegant trick that says: "find the spot where
the hill's uphill arrow lines up exactly with the fence's
sideways arrow," and bingo — you've found the constrained peak.

## Mental

To maximise $f(\mathbf{x})$ **subject to** $g(\mathbf{x}) = 0$, the
key insight: at the optimum, $\nabla f$ must be **parallel** to
$\nabla g$ — there's no direction *along the constraint surface*
where $f$ can still increase.

Formally: there exists $\lambda$ (the **multiplier**) with

$$
\nabla f = \lambda \nabla g.
$$

Combined with the constraint $g = 0$, this gives $n + 1$ equations
in $n + 1$ unknowns $(x_1, \ldots, x_n, \lambda)$.

## Why $\lambda$ matters

Geometric: at the optimum, $f$'s level sets are *tangent* to the
constraint set $g = 0$. The multiplier $\lambda$ is the rate of
change of the optimum value if the constraint $g = 0$ is loosened
to $g = \epsilon$.

In economics: $\lambda$ is the **shadow price** of the constraint —
how much value an extra unit of constraint budget would unlock.

## Worked example

Maximise $f(x, y) = xy$ subject to $g(x, y) = x + y - 10 = 0$.

$\nabla f = (y, x)$, $\nabla g = (1, 1)$.

Equations:
- $y = \lambda \cdot 1$
- $x = \lambda \cdot 1$
- $x + y = 10$

So $x = y$, and $2x = 10 \Rightarrow x = 5, y = 5$. $\lambda = 5$.

Maximum value: $f(5, 5) = 25$.

Check the answer: among $(x, y)$ with $x + y = 10$, the product $xy$
is maximised when $x = y = 5$. AM-GM confirms.

## Multiple constraints

For constraints $g_1 = 0, \ldots, g_k = 0$, introduce multipliers
$\lambda_1, \ldots, \lambda_k$:

$$
\nabla f = \lambda_1 \nabla g_1 + \ldots + \lambda_k \nabla g_k.
$$

System of $n + k$ equations in $n + k$ unknowns.

## Interactive

:::widget type=numeric-input prompt="Max of $xy$ s.t. $x + y = 10$: at $x = y = 5$, value $= ?$" answer=25 explain="$25$.":::

:::widget type=numeric-input prompt="$\\nabla f \\parallel \\nabla g$ at constrained optimum. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Multiplier $\\lambda$ = shadow price of the constraint. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Max of $x + y$ s.t. $x^2 + y^2 = 1$: by symmetry at $x = y = 1/\\sqrt{2}$. Value $\\sqrt{2} \\approx ?$. Round 4 dp." answer=1.4142 tolerance=0.005 explain="$\\sqrt{2}$.":::

## Symbolic

**KKT conditions** generalise Lagrange to inequality constraints
$g_i \le 0$:

- Stationarity: $\nabla f = \sum \lambda_i \nabla g_i$.
- Primal feasibility: $g_i \le 0$.
- Dual feasibility: $\lambda_i \ge 0$.
- Complementary slackness: $\lambda_i g_i = 0$.

The last condition says: either $\lambda_i = 0$ (constraint inactive)
or $g_i = 0$ (constraint active). KKT is the engine of constrained
optimization in ML and operations research.

**Lagrangian function**: $\mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) - \lambda g(\mathbf{x})$.
Setting $\nabla_\mathbf{x} \mathcal{L} = 0$ and
$\partial \mathcal{L}/\partial \lambda = 0$ recovers the multiplier
equations and the constraint.

## Computational

```python
import sympy as sp

x, y, lam = sp.symbols("x y lambda")

# Maximise xy s.t. x + y = 10
f = x * y
g = x + y - 10
L = f - lam * g
sol = sp.solve([sp.diff(L, x), sp.diff(L, y), sp.diff(L, lam)], [x, y, lam])
print(sol)              # [(5, 5, 5)]
print(f.subs(sol[0]))   # 25

# Maximise x + y on the unit circle x^2 + y^2 = 1
f = x + y
g = x**2 + y**2 - 1
L = f - lam * g
sol = sp.solve([sp.diff(L, x), sp.diff(L, y), sp.diff(L, lam)], [x, y, lam])
print(sol)              # x = y = ±1/√2

# Numerical via SciPy
from scipy.optimize import minimize
import numpy as np
res = minimize(lambda v: -v[0]*v[1], x0=[1, 1],
               constraints={'type': 'eq', 'fun': lambda v: v[0] + v[1] - 10})
print(res.x, -res.fun)  # [5, 5], 25
```

## Applied

- **SVM dual** — support vector machine training writes a Lagrangian
  with one multiplier per training example; the support vectors are
  the points whose multipliers are non-zero (KKT complementary
  slackness).
- **Max-entropy distributions** — the Gaussian, exponential, and
  uniform distributions all arise as max-entropy under specific
  constraints (mean, variance, support); the Lagrangian gives the
  exponential-family form.
- **Portfolio optimisation** — Markowitz mean-variance portfolios
  are constrained optimisations (return target, fully-invested);
  Lagrange/KKT solve them.
- **Engineering design** — minimise weight subject to strength,
  cost, manufacturability constraints. Lagrange + numeric solvers.

## Check Your Understanding

:::widget type=numeric-input prompt="At constrained optimum, $\\nabla f = \\lambda \\nabla g$. Type 1 if Lagrange." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Max of $xy$ s.t. $x^2 + y^2 = 2$: at $x = y = 1$, $xy = 1$. Type 1." answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="KKT extends Lagrange to inequality constraints. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Complementary slackness: $\\lambda_i g_i = 0$. Type 1." answer=1 explain="Yes.":::
