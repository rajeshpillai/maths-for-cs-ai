---
strand: change
level: research
order: 1
title: KPZ Equation and Universality
prerequisites:
  - tier: strand-4-change-research
    slug: 00-rough-paths
    description: Rough paths
connections:
  - strand-4-change-research/02-mean-field-games
applications:
  - cs: "Random matrix theory, polymer models, growing surfaces"
  - life: "A universal SPDE governing growth processes"
---

# KPZ Equation and Universality

## Mental

The **Kardar-Parisi-Zhang (KPZ) equation** (1986):

$$
\partial_t h = \nu \partial_x^2 h + \frac{\lambda}{2} (\partial_x h)^2 + \sigma \xi,
$$

where $\xi$ is space-time white noise. Models *growing interfaces*:
deposition, fluid fronts, etc.

Because of $(\partial_x h)^2$ — a singular product when $h$ is rough
— classical PDE theory fails. **Hairer 2014** gave the first
rigorous solution via regularity structures.

## KPZ universality class

A vast class of physical systems exhibits KPZ-type fluctuations:

- **TASEP** (totally asymmetric exclusion process).
- **Polynuclear growth (PNG)**.
- **Last-passage percolation**.
- **Longest increasing subsequence** of random permutations.
- **Random matrix top eigenvalues**.

For each: scaled fluctuations $\to$ **Tracy-Widom** distribution.

## KPZ scaling exponents

For 1D KPZ:

- Roughness: $h(x) - h(0) \sim x^{1/2}$ (no surprise — Brownian).
- Time-correlation: $\sim t^{1/3}$.
- Cross-over to dynamical scaling: $z = 3/2$.

Universal — independent of microscopic details.

## Worked example: TASEP

**Totally Asymmetric Simple Exclusion Process**: particles on
$\mathbb Z$ jump right at rate 1, exclusion (one-per-site).

Macroscopic density $\rho(x, t)$ obeys Burgers equation.

Microscopic fluctuations: KPZ-class, with Tracy-Widom statistics for
"current through origin."

## Interactive

:::widget type=numeric-input prompt="KPZ equation: 1986 (Kardar-Parisi-Zhang). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer 2014 rigorously solved KPZ. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="TASEP, PNG, LPP, random matrices all KPZ-class. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KPZ time exponent: $1/3$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Cole-Hopf transformation**: $Z = e^{\lambda h / 2 \nu}$ converts
KPZ to multiplicative SHE. Allows computations via Feynman-Kac
representation.

**KPZ fixed point** (Matetski-Quastel-Remenik 2017): the
2-parameter scaling-limit process; conjectured universal.

**Stochastic six-vertex model**: integrable model in KPZ class with
exact computations possible.

**Macdonald processes** (Borodin-Corwin): integrable probabilistic
processes with KPZ scaling limit.

## Computational

```python
import numpy as np

# TASEP simulation
def tasep_step(state, rate=1):
    """One unit time of TASEP — sequential update."""
    n = len(state)
    new_state = state.copy()
    for i in range(n - 1):
        if new_state[i] == 1 and new_state[i + 1] == 0 and np.random.random() < rate / n:
            new_state[i] = 0
            new_state[i + 1] = 1
    return new_state

# Initial: half-filled
N = 200
state = np.zeros(N, dtype=int)
state[:N // 2] = 1

# Run
T = 1000
for _ in range(T):
    state = tasep_step(state)

# Density profile
density = state.astype(float)
# Smooth via convolution
kernel_size = 10
smoothed = np.convolve(density, np.ones(kernel_size) / kernel_size, mode='valid')
print(f"Smoothed density: {smoothed[:5]}")

# In KPZ class: fluctuations of integrated density follow Tracy-Widom
# Verifying empirically requires many-trial simulation + scaling analysis
print("KPZ universality: TASEP fluctuations → Tracy-Widom in long-time limit.")
```

## Applied

- **Random matrix theory** — top-eigenvalue statistics universal.
- **Polymer models** — directed polymers in random environment exhibit
  KPZ scaling.
- **Population dynamics** — competing strain dynamics.
- **Materials science** — growing crystal interfaces.
- **Surface physics** — etching / deposition fluctuations.

## Check Your Understanding

:::widget type=numeric-input prompt="KPZ equation has $(\\partial_x h)^2$ nonlinear term. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairer solved KPZ rigorously (Fields 2014). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KPZ scaling: $t^{1/3}$ time, $x^{1/2}$ space. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tracy-Widom: top GUE eigenvalue limit. Type 1." answer=1 explain="Yes.":::
