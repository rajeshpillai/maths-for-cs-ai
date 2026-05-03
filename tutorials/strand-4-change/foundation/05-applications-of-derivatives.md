---
strand: change
level: foundation
order: 5
title: Applications of Derivatives — Optimisation
prerequisites:
  - tier: strand-4-change-foundation
    slug: 04-product-quotient-chain
    description: Differentiation rules
connections:
  - strand-4-change-foundation/06-riemann-sums
applications:
  - cs: "Optimization in ML, hyperparameter tuning, gradient descent"
  - business: "Profit maximisation, cost minimisation"
  - games: "Tuning balance parameters for optimal player experience"
  - life: "Maximising area under fixed perimeter, minimising travel time"
---

# Applications of Derivatives — Optimisation

## Mental

Setting $f'(x) = 0$ finds **critical points** — candidate locations
for local maxima and minima of $f$. This is the foundation of
**optimization**, used in everything from economics to AI training.

The procedure:

1. Compute $f'(x)$.
2. Solve $f'(x) = 0$ for critical $x$ values.
3. Evaluate $f''(x)$ at each (or check sign change of $f'$):
   - $f'' > 0$ → local minimum (concave up).
   - $f'' < 0$ → local maximum (concave down).
   - $f'' = 0$ → inconclusive (could be inflection).

## Worked example: maximise area of a rectangle with fixed perimeter

A rectangle has perimeter $P = 100$ m. What dimensions maximise its
area?

Let length $= x$, width $= (P - 2x)/2 = 50 - x$. Area:

$$
A(x) = x (50 - x) = 50 x - x^2.
$$

Differentiate: $A'(x) = 50 - 2x$. Set to zero: $x = 25$.

So both length and width are $25$ m — a **square** maximises area
for a fixed perimeter.

$A''(x) = -2 < 0$, confirming maximum.

This is one of countless "isoperimetric" results: given a constraint,
**symmetry often gives the optimum**.

## Interactive

:::widget type=numeric-input prompt="Maximize $f(x) = -x^2 + 6x + 5$. $f'(x) = -2x + 6 = 0 \\Rightarrow x = ?$" answer=3 explain="$x = 3$.":::

:::widget type=numeric-input prompt="Same: $f(3) = -9 + 18 + 5 = ?$" answer=14 explain="$14$. Maximum value.":::

:::widget type=numeric-input prompt="$f(x) = x^3 - 3x$. $f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$. Number of critical points?" answer=2 explain="Two critical points: $x = 1$ (local min) and $x = -1$ (local max).":::

:::widget type=numeric-input prompt="A box with square base, no top, volume $32$ m³. Minimize surface area. $V = b^2 h = 32 \\Rightarrow h = 32/b^2$. $S = b^2 + 4 b h = b^2 + 128/b$. $S'(b) = 2b - 128/b^2 = 0 \\Rightarrow b^3 = 64 \\Rightarrow b = ?$" answer=4 explain="$b = 4, h = 32/16 = 2$.":::

## Symbolic

A function $f$ has a **local maximum** at $a$ if $f(a) \ge f(x)$ for
$x$ near $a$. Similarly local min.

**First-derivative test**: critical points are where $f'(x) = 0$ (or
$f'$ doesn't exist). At a critical point:

- If $f'$ changes from $+$ to $-$, local max.
- If $f'$ changes from $-$ to $+$, local min.

**Second-derivative test**: $f''(a) > 0 \Rightarrow$ local min;
$f''(a) < 0 \Rightarrow$ local max.

For **global** maxima/minima on a closed interval $[a, b]$:

- Compute $f$ at all critical points in $(a, b)$.
- Compute $f(a)$ and $f(b)$.
- Take max/min of all these.

This is the **closed-interval method**.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

f = x**3 - 3*x + 1
fp = sp.diff(f, x)
crit = sp.solve(fp, x)
print("Critical points:", crit)

fpp = sp.diff(fp, x)
for c in crit:
    print(f"  At x = {c}: f''({c}) = {fpp.subs(x, c)}")
# x = -1: f'' = -6 < 0 → local max
# x = 1:  f'' = 6 > 0 → local min

# scipy optimization
from scipy.optimize import minimize_scalar
result = minimize_scalar(lambda x: x**3 - 3*x + 1, bounds=(0, 2), method="bounded")
print(result)
```

## Applied

- **Gradient descent**: iteratively step **opposite** to the
  derivative (gradient in higher dimensions). Used in essentially
  every ML training algorithm.
- **Profit maximisation**: $\pi(q) = R(q) - C(q)$, where $R$ is
  revenue and $C$ is cost. Solve $R'(q) = C'(q)$ — set marginal
  revenue equal to marginal cost.
- **Speed limit calculations**: minimum stopping distance, fastest
  routing.

## Check Your Understanding

:::widget type=numeric-input prompt="$f(x) = x^2 - 4x + 7$. $f'(x) = 2x - 4 = 0 \\Rightarrow x = ?$" answer=2 explain="$x = 2$.":::

:::widget type=numeric-input prompt="$f(2) = 4 - 8 + 7 = ?$" answer=3 explain="Minimum value $3$.":::

:::widget type=numeric-input prompt="$f''(2) = 2 > 0$, so it's a local..." answer=1 explain="Minimum. Type 1 to indicate min (or 0 for max).":::

:::widget type=numeric-input prompt="A field of fixed perimeter $P$ has maximum area when shape is..." answer=0 explain="A square. Type 0 for square (or 1 for circle if you allow non-rectangular).":::
