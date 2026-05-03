---
strand: change
level: master
order: 1
title: Ordinary Differential Equations — Deeper
prerequisites:
  - tier: strand-4-change-master
    slug: 00-calculus-of-variations
    description: Calculus of variations
connections:
  - strand-4-change-master/02-pde-introduction
applications:
  - cs: "Neural ODEs, dynamical systems, scientific computing"
  - life: "Solutions to differential equations and what they reveal"
---

# Ordinary Differential Equations — Deeper

## Mental

An **ODE** $y' = f(t, y)$ models continuous evolution. Theoretical
questions:

- **Existence and uniqueness**: when do solutions exist? Are they
  unique?
- **Long-term behavior**: stability, attractors, chaos.
- **Conservation laws**: what's preserved?

## Picard-Lindelöf

**Theorem** (Picard-Lindelöf): if $f$ is Lipschitz in $y$, the IVP
$y' = f(t, y), y(t_0) = y_0$ has a unique local solution.

Proof: contraction mapping on $\Phi(y)(t) = y_0 + \int_{t_0}^t f(s, y(s)) ds$.

Without Lipschitz: existence (Peano) but maybe not uniqueness.
$y' = \sqrt{|y|}$ has multiple solutions through $y(0) = 0$.

## Linear systems and exponentials

For $\dot{\mathbf x} = A \mathbf x$ with constant $A$:

$$
\mathbf x(t) = e^{tA} \mathbf x(0).
$$

Eigenvalues of $A$ classify behaviour:

- All $\mathrm{Re}(\lambda) < 0$: solutions $\to 0$ (stable).
- Some $\mathrm{Re}(\lambda) > 0$: blowup.
- Pure imaginary: oscillation.

## Phase portraits

For 2D nonlinear $\dot{\mathbf x} = F(\mathbf x)$: linearise at fixed
points $F(\mathbf x^*) = 0$:

| Linearisation eigenvalues | Type |
|---|---|
| Both negative real | Stable node |
| Both positive real | Unstable node |
| Mixed signs | Saddle |
| Complex with neg real part | Stable spiral |
| Complex with pos real part | Unstable spiral |
| Pure imaginary | Centre (linear); nonlinear: spiral or centre |

## Limit cycles, chaos

**Limit cycle**: isolated periodic orbit. Van der Pol oscillator
exhibits one.

**Chaos**: sensitive dependence on initial conditions, dense
periodic orbits, mixing. Lorenz system $\dot x = \sigma(y - x)$,
$\dot y = x(\rho - z) - y$, $\dot z = xy - \beta z$ — paradigmatic.

**KAM theorem**: small perturbations of integrable Hamiltonian
systems preserve most invariant tori — partial answer to "is the
solar system stable?"

## Interactive

:::widget type=numeric-input prompt="Picard-Lindelöf: Lipschitz $f$ ⇒ unique local solution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\dot x = A x$ has solution $e^{tA} x_0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stable spiral: complex eigenvalues with negative real part. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lorenz system exhibits chaos. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Existence-uniqueness counter-example**: $y' = 3 y^{2/3}$, $y(0) = 0$
has solutions $y \equiv 0$ and $y(t) = t^3$ — non-Lipschitz at 0.

**Stability theorems**: Lyapunov function $V(x) > 0$ with
$\dot V \le 0$ proves stability.

**Bifurcation theory**: how solutions change as parameters vary.
Saddle-node, Hopf, period-doubling, transcritical bifurcations.

**Hamiltonian systems**: phase-space conservation, integrable vs
non-integrable, KAM.

## Computational

```python
import numpy as np
from scipy.integrate import solve_ivp

# Lorenz system
def lorenz(t, state, sigma=10, rho=28, beta=8/3):
    x, y, z = state
    return [sigma * (y - x), x * (rho - z) - y, x * y - beta * z]

sol = solve_ivp(lorenz, [0, 50], [1, 1, 1], dense_output=True, rtol=1e-8)
print("Lorenz attractor: max |x| =", np.max(np.abs(sol.y[0])))

# Sensitivity to initial conditions: chaos
sol2 = solve_ivp(lorenz, [0, 50], [1.001, 1, 1], dense_output=True, rtol=1e-8)
ts = np.linspace(0, 30, 1000)
distance = np.linalg.norm(sol.sol(ts) - sol2.sol(ts), axis=0)
print("Initial offset 0.001, distance at t=30:", distance[-1])  # huge — chaos

# Linear: harmonic oscillator
def harmonic(t, state):
    x, v = state
    return [v, -x]

sol = solve_ivp(harmonic, [0, 10], [1, 0])
print("Harmonic returns near (1, 0) at t=2π?", sol.y[:, -1])
```

## Applied

- **Neural ODEs** (Chen et al. 2018) — model continuous-depth
  networks; trained via backprop through ODE solver.
- **Continuous normalising flows** — invertible neural ODEs for
  density estimation.
- **Mathematical biology** — predator-prey (Lotka-Volterra),
  epidemics (SIR), neural firing (Hodgkin-Huxley).
- **Climate / weather modeling** — chaotic ODE/PDE systems; ensemble
  forecasting.
- **Control engineering** — PID, LQR, MPC controllers — all rooted
  in ODE theory.
- **Finance** — stochastic ODEs (next lessons) underpin Black-
  Scholes, Heston, etc.

## Check Your Understanding

:::widget type=numeric-input prompt="Lipschitz $f$ ⇒ Picard-Lindelöf gives unique local solution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Eigenvalues of linearisation classify fixed-point types. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Chaos: sensitive dependence on initial conditions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lyapunov function proves stability. Type 1." answer=1 explain="Yes.":::
