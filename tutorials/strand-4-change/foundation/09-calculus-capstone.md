---
strand: change
level: foundation
order: 9
title: Calculus Capstone — Three Real Problems
prerequisites:
  - tier: strand-4-change-foundation
    slug: 08-fundamental-theorem
    description: Fundamental theorem
connections:
  - strand-4-change-foundation/00-rates-of-change
applications:
  - cs: "Optimisation in ML, physics simulations, RL value functions"
  - business: "Marginal economics, time-value of money"
  - games: "Trajectory math, motion smoothing"
---

# Calculus Capstone — Three Real Problems

## Mental

You now have the basics:

- **Derivative**: instantaneous rate of change (slope of tangent).
- **Limit**: the formal mechanism behind derivatives and integrals.
- **Derivative rules**: power, sum, constant, product, quotient,
  chain.
- **Optimisation**: critical points, second-derivative test.
- **Integral**: accumulated area / total quantity.
- **FTC**: derivative and integral are inverses.

Three integrated problems.

## Walkthrough 1: maximising profit

A company sells $q$ units at price $p(q) = 100 - q$ each. Total
revenue $R(q) = q \cdot (100 - q) = 100 q - q^2$.

Cost $C(q) = q^2 + 50$. Profit $\pi(q) = R(q) - C(q) = 100 q - 2q^2 -
50$.

Maximise: $\pi'(q) = 100 - 4q = 0 \Rightarrow q = 25$.

Optimal quantity: $25$ units. Profit: $100 \cdot 25 - 2 \cdot 625 -
50 = 2500 - 1250 - 50 = \$1200$.

## Walkthrough 2: distance from velocity

A particle has velocity $v(t) = 3 t^2 + 2$ m/s. Distance travelled
from $t = 0$ to $t = 4$:

$$
d = \int_0^4 (3 t^2 + 2) \, dt = [t^3 + 2t]_0^4 = 64 + 8 - 0 = 72 \text{ m}.
$$

If the particle started at position $5$ m, its position at $t = 4$
is $5 + 72 = 77$ m.

## Walkthrough 3: gradient descent

To minimise $f(x) = x^2 - 6x + 5$, gradient descent updates:

$$
x_{n+1} = x_n - \eta f'(x_n), \quad \eta = \text{learning rate}.
$$

$f'(x) = 2x - 6$.

Starting at $x_0 = 0, \eta = 0.1$:

- $x_1 = 0 - 0.1 \cdot (-6) = 0.6$.
- $x_2 = 0.6 - 0.1 \cdot (-4.8) = 1.08$.
- $x_3 = 1.08 - 0.1 \cdot (-3.84) = 1.464$.
- ...
- Converges to $x = 3$ (the analytical minimum).

This is the **simplest** version of the algorithm that powers all
modern ML.

## Roadmap

**Strand 4 Intermediate** picks up:

- Logarithmic and exponential differentiation.
- Trig derivatives (proven, not memorised).
- Implicit differentiation, related rates.
- Integration by parts, partial fractions.
- Improper integrals.
- Series and Taylor expansions.

**Strand 4 Advanced** continues with:

- Differential equations (precursor to Strand 11).
- Multivariable calculus (parallel to Strand 12).
- Vector calculus (gradient, divergence, curl).
- Calculus of variations.

**Strand 4 Master** covers measure theory and Lebesgue integration —
the modern rigorous foundation.

## Closing

Calculus is the mathematics of change. You can now:

- Compute derivatives of polynomials, products, quotients, and
  composites.
- Set up and solve simple optimisation problems.
- Compute definite integrals via antiderivatives.
- Recognise where the FTC unifies these ideas.

This is enough to follow most introductory physics, economics, and
ML material. Each later strand will use these tools.

## Interactive

:::widget type=numeric-input prompt="$\\int_0^2 3 x^2 \\, dx = ?$" answer=8 explain="$[x^3]_0^2 = 8$.":::

:::widget type=numeric-input prompt="$f(x) = x^2 - 4x + 5$. $f'(x) = 2x - 4 = 0$ at $x = 2$. $f(2) = ?$ (Minimum value.)" answer=1 explain="$4 - 8 + 5 = 1$.":::

:::widget type=numeric-input prompt="Particle has $v(t) = 2t$. Distance from $t = 0$ to $t = 5$: $\\int_0^5 2t \\, dt = ?$" answer=25 explain="$[t^2]_0^5 = 25$.":::

:::widget type=numeric-input prompt="The chain rule applied to $f(x) = e^{2x}$. $f'(x) = 2 e^{2x}$. $f'(0) = ?$" answer=2 explain="$2 \\cdot 1 = 2$.":::

## Check Your Understanding

:::widget type=numeric-input prompt="$\\dfrac{d}{dx} (x^4 + 3x) = ?$ Type the value at $x = 1$ ($4 x^3 + 3$)." answer=7 explain="$4 + 3 = 7$.":::

:::widget type=numeric-input prompt="$\\int_1^4 (x + 1) \\, dx = [\\frac{x^2}{2} + x]_1^4 = (8 + 4) - (0.5 + 1) = ?$" answer=10.5 explain="$12 - 1.5 = 10.5$.":::

:::widget type=numeric-input prompt="$\\dfrac{d}{dx} (\\sin x \\cdot \\cos x) = ?$ Type value at $x = 0$." answer=1 explain="By product rule: $\\cos x \\cos x - \\sin x \\sin x$ at $x = 0$: $1 \\cdot 1 - 0 = 1$.":::

:::widget type=numeric-input prompt="$f(x) = x^2$, gradient descent step at $x_0 = 4$ with $\\eta = 0.1$. $x_1 = 4 - 0.1 \\cdot 8 = ?$" answer=3.2 explain="$3.2$.":::
