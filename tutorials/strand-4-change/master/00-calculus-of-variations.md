---
strand: change
level: master
order: 0
title: Calculus of Variations
prerequisites:
  - tier: strand-4-change-advanced
    slug: 09-change-capstone-2
    description: Change advanced capstone
connections:
  - strand-4-change-master/01-ode-theory
applications:
  - cs: "Optimal control, shortest paths, neural ODE training"
  - life: "Optimising over functions, not just numbers"
---

# Calculus of Variations

## Mental

Standard calculus minimises a *function* $f : \mathbb R \to \mathbb R$.
**Calculus of variations** minimises a *functional* $J : \mathcal F \to \mathbb R$
defined on a space of functions $\mathcal F$.

Classic example: among all curves $y(x)$ from $(x_0, y_0)$ to $(x_1, y_1)$,
which minimises arc length?

$$
J[y] = \int_{x_0}^{x_1} \sqrt{1 + y'(x)^2} \, dx.
$$

The answer (a straight line) is intuitive but the framework
generalises massively.

## Euler-Lagrange equation

For $J[y] = \int_a^b L(x, y, y') \, dx$:

The minimiser satisfies the **Euler-Lagrange equation**:

$$
\frac{\partial L}{\partial y} - \frac{d}{dx} \frac{\partial L}{\partial y'} = 0.
$$

A second-order ODE for $y(x)$.

## Worked example: brachistochrone

Find the curve along which a bead falls fastest under gravity from
$(0, 0)$ to $(x_1, y_1)$.

Setup: $J[y] = \int_0^{x_1} \frac{\sqrt{1 + y'^2}}{\sqrt{2gy}} dx$.

Euler-Lagrange yields a cycloid — surprisingly *not* a straight line
or parabola. Bernoulli posed this 1696; Newton solved overnight.

## Mechanics from variations

**Lagrangian mechanics**: physical trajectories minimise the **action**

$$
S[\gamma] = \int_{t_0}^{t_1} L(q, \dot q, t) dt, \quad L = T - V.
$$

Euler-Lagrange = Newton's $F = ma$ in disguise. **Hamilton's
principle**: the universe runs on least action.

## Interactive

:::widget type=numeric-input prompt="Functional $J[y]$ takes a function and returns a number. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Euler-Lagrange: $\\partial L/\\partial y - d/dx(\\partial L/\\partial y') = 0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brachistochrone is a cycloid. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lagrangian $L = T - V$ in mechanics. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hamilton's principle**: physical trajectories make $S$ stationary
(usually min). Equivalent to Newton's laws but more general:

- Frictionless constraints: easy via Lagrangian.
- Field theory: $L$ becomes a Lagrangian density depending on
  derivatives of fields.
- General relativity: Einstein-Hilbert action $S = \int R \sqrt{-g} \, d^4 x$.
- Quantum field theory: path integral $\int e^{i S/\hbar} D[\gamma]$.

**Noether's theorem**: every continuous symmetry of $S$ gives a
conserved quantity. Translation → momentum, rotation → angular
momentum, time-translation → energy.

**Pontryagin's maximum principle**: optimal-control variation —
minimising over controls $u(t)$ subject to dynamics $\dot x = f(x, u)$.

## Computational

```python
import sympy as sp

x = sp.Function("y")
t = sp.symbols("t")
y = x(t)
yp = y.diff(t)

# Euler-Lagrange for L(t, y, y')
def euler_lagrange(L, y, t):
    return sp.diff(L, y) - sp.diff(sp.diff(L, y.diff(t)), t)

# Arc length: L = sqrt(1 + y'²)
yp_sym = sp.symbols("yp")
L_arc = sp.sqrt(1 + yp**2)
EL = sp.simplify(euler_lagrange(L_arc, y, t))
print("Arc length EL:", EL)         # = 0 for y'' = 0 → straight line

# Harmonic oscillator: L = (1/2) m y'² - (1/2) k y²
m, k = sp.symbols("m k", positive=True)
L_osc = sp.Rational(1, 2) * m * yp**2 - sp.Rational(1, 2) * k * y**2
EL_osc = sp.simplify(euler_lagrange(L_osc, y, t))
print("Oscillator EL:", EL_osc)     # m y'' + k y = 0 — Hooke's law

# Brachistochrone: L = sqrt(1 + y'²) / sqrt(2gy)
g = sp.symbols("g", positive=True)
L_brachy = sp.sqrt(1 + yp**2) / sp.sqrt(2 * g * y)
EL_brachy = sp.simplify(euler_lagrange(L_brachy, y, t))
print("Brachistochrone EL (complex):", EL_brachy)
```

## Applied

- **Optimal control / robotics** — minimise cost over trajectories;
  Pontryagin / dynamic programming.
- **Reinforcement learning** — Bellman equations are dynamic-programming
  variants of variational principles.
- **Neural ODEs / continuous normalising flows** — variational
  formulation of training.
- **Path integrals in QFT** — sum over all paths, weighted by
  $e^{i S/\hbar}$.
- **Image processing** — total-variation denoising minimises an
  energy functional.
- **Differential geometry** — geodesics, minimal surfaces are
  variational problems.

## Check Your Understanding

:::widget type=numeric-input prompt="Calculus of variations minimises functionals. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brachistochrone minimises descent time, gives cycloid. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lagrangian mechanics: $L = T - V$, EL = Newton. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Noether: symmetry → conservation. Type 1." answer=1 explain="Yes.":::
