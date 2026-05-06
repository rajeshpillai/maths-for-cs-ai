---
strand: change
level: research
order: 2
title: Mean-Field Games
prerequisites:
  - tier: strand-4-change-research
    slug: 01-kpz-equation
    description: KPZ equation
connections:
  - strand-4-change-research/03-nn-approximation-theory
applications:
  - cs: "Multi-agent RL, traffic optimisation, economics"
  - life: "Many-agent equilibrium dynamics in continuum"
---

# Mean-Field Games

## Explain Like I Am 7

A million ants leave the nest, each one trying to find food while
also avoiding the crowded paths the *other* ants are using.
Tracking every ant separately is impossible — but you can track
just one "average ant" who reacts to the *cloud* of all the
others.  **Mean-field games** is the math of huge crowds where
each member is selfish but their collective behaviour is smooth.
It explains traffic jams, market panics, and how millions of
phones share a wifi tower.

## Mental

**Mean-field games (MFG)** (Lasry-Lions, Caines-Huang-Malhamé, ~2006):
limit of $N$-player non-cooperative games as $N \to \infty$.

Each agent optimises its cost depending on:

- Its own state.
- The *empirical distribution* of all agents.

In the $N \to \infty$ limit, this distribution becomes a continuum
density $m(x, t)$.

## Coupled PDEs

**MFG system**:

$$
\begin{cases}
-\partial_t u + H(x, \nabla u, m) = 0 & \text{(HJB equation, backward)} \\
\partial_t m - \nabla \cdot (m \nabla_p H(x, \nabla u, m)) = 0 & \text{(continuity equation, forward)}
\end{cases}
$$

with terminal cost $u(x, T)$ and initial density $m(x, 0)$.

Forward-backward in time — a non-trivial PDE system.

## Worked example: continuous Cournot

Continuous Cournot oligopoly: each producer chooses production
rate $q$. Aggregate price depends on *total* production
$\int q \, dm$.

In MFG limit: each producer's optimal $q^*(x, t)$ depends on density
$m$; $m$ evolves according to producers' choices. Equilibrium: a
fixed point.

## Existence and uniqueness

**Lasry-Lions monotonicity**: under $\partial_m H \succeq 0$
condition, MFG system has unique smooth solution.

Without monotonicity: existence guaranteed (e.g., via topological
methods); uniqueness can fail.

## Interactive

:::widget type=numeric-input prompt="MFG: many-agent game limit. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MFG system: HJB + continuity, forward-backward. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lasry-Lions monotonicity ensures uniqueness. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lasry-Lions + Caines-Huang-Malhamé ~2006. Type 1." answer=1 explain="Yes.":::

## Symbolic

**MFG of controls**: agents control their own state plus see
distribution of *controls*; richer than state-only.

**Master equation** (Cardaliaguet et al.): a single PDE on
$\mathcal P(\mathbb R^d)$ characterising MFG; gradient flow on
Wasserstein space.

**Stochastic MFG**: with noise; controls become probability-density
flows.

**MFG approximations to deep RL**: when many agents share the same
policy, MFG framework approximates dynamics — used in
multi-agent RL theory.

## Computational

```python
import numpy as np

# Tiny MFG: 1D continuous-time, no noise
# State x, density m(x), agents minimise quadratic cost

# Discretise
N = 100
x = np.linspace(0, 1, N)
dx = x[1] - x[0]

# Initial density: uniform
m0 = np.ones(N) / N

# Terminal cost: distance from preferred location 0.7
def terminal_cost(x):
    return (x - 0.7)**2

u_T = terminal_cost(x)
print(f"Terminal cost u_T at x = 0.7: {terminal_cost(0.7):.4f} (= 0)")

# HJB backward equation: solve numerically
# Continuity equation forward: evolve density
# Coupled iteration: fictitious play / Picard-style

# Real MFG solvers: deepxde, JAX-MD, or specialised research code
print("Real MFG solver: requires PDE discretisation + fixed-point iteration.")

# Schematic Picard iteration
def picard_iterate(u, m, n_iters=10):
    for _ in range(n_iters):
        # Update m via continuity equation given u
        # Update u via HJB given m
        pass
    return u, m

print("MFG iteration: alternate u (HJB) and m (continuity).")
```

## Applied

- **Multi-agent reinforcement learning** — MFG-RL approximates
  large-population dynamics.
- **Traffic optimisation** — drivers optimise vs aggregate density.
- **Macroeconomics** — heterogeneous-agent models (Krusell-Smith,
  HANK) often use MFG-style limits.
- **Crowd dynamics** — pedestrian flow modelling.
- **Energy markets** — equilibrium of price-takers in continuum
  limit.

## Check Your Understanding

:::widget type=numeric-input prompt="MFG: $N \\to \\infty$ limit of $N$-player game. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MFG system: HJB + continuity forward-backward. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lasry-Lions + Caines-Huang-Malhamé ~2006 introduced. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Master equation lives on Wasserstein space. Type 1." answer=1 explain="Yes.":::
