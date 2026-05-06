---
strand: change
level: research
order: 7
title: Generative Flows and Continuous-Time ML
prerequisites:
  - tier: strand-4-change-research
    slug: 06-diffusion-models-deeper
    description: Diffusion deep
connections:
  - strand-4-change-research/08-pde-on-manifolds
applications:
  - cs: "Continuous normalising flows, neural ODEs"
  - life: "ML built on differential equations"
---

# Generative Flows and Continuous-Time ML

## Explain Like I Am 7

Imagine a river flowing in a wide valley, gently carrying floating
toy boats from where they started toward a different shape on the
other side.  If you can design the river's currents just right,
you can make a cloud of plain-looking boats reshape itself into a
detailed sailboat regatta.  **Generative flows** train a neural
net to *be* that river — a smooth, time-changing wind field that
sweeps simple noise into rich pictures or sounds.  It's calculus
with arrows that learn.

## Mental

**Continuous normalising flows (CNF)** (Chen et al. 2018, Grathwohl
et al. 2018): generative model based on a learned vector field
$v_\theta(x, t)$:

$$
\frac{d x}{d t} = v_\theta(x, t), \quad x(0) = z \sim \mathcal N(0, I).
$$

Final $x(T)$ samples from learned distribution.

Train via maximum likelihood with **trace formula**:
$\log p(x_1) = \log p(z) - \int_0^T \mathrm{tr}(\nabla v_\theta(x(t), t)) dt$.

## Flow matching

**Flow matching** (Lipman et al. 2023): instead of learning velocity
field via likelihood, *match* a target velocity field directly.

Choose path of distributions $p_t$ from base to target; train
$v_\theta$ to match the velocity along that path.

Often *easier to train* than diffusion / CNF. Stable, mode-covering.
Used in Stable Diffusion 3, Sora.

## Bridge: SDE / ODE / flow

| Method | Type | Sampling speed |
|---|---|---|
| Diffusion | SDE | slow (many steps) |
| Probability flow ODE | ODE | medium |
| CNF | ODE | medium |
| Flow matching | ODE | medium-fast |
| Consistency model | 1-step | very fast |

Modern landscape: blend of these for state-of-the-art generation.

## Schrödinger bridges

**Schrödinger problem**: find the most-likely stochastic interpolation
between two distributions. Connects to optimal transport (limit of
$\epsilon$-regularised OT as $\epsilon \to 0$).

**Score-based diffusions = Schrödinger bridge** in specific limits.

## Interactive

:::widget type=numeric-input prompt="CNF: $dx/dt = v_\\theta(x, t)$ for generation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Flow matching: match velocity field directly (Lipman 2023). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Schrödinger bridge: stochastic interpolation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Consistency models: 1-step sampling. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hutchinson trace estimator**: efficient estimation of
$\mathrm{tr}(\nabla v)$ via Hutchinson identity:
$\mathrm{tr}(A) = \mathbb E[v^T A v]$ for $v$ Gaussian.

**Free-form Jacobian (FFJORD)**: CNF without architectural
restrictions; uses Hutchinson + neural ODE solver.

**Rectified flows** (Liu 2022): straighten sample paths for
faster sampling.

**Stochastic interpolants** (Albergo-Vanden-Eijnden 2023):
unifying framework for diffusion, flow matching, Schrödinger
bridge.

## Computational

```python
import numpy as np

# Tiny CNF: 2D Gaussian → custom target
# Velocity field v(x, t) — here a fixed (non-learned) example

def velocity_field(x, t):
    """Hand-designed: rotates and stretches."""
    theta = t * np.pi / 2
    R = np.array([[np.cos(theta), -np.sin(theta)],
                  [np.sin(theta), np.cos(theta)]])
    return R @ x

# Sample from prior, integrate forward
def sample_cnf(velocity, n_samples=1000, n_steps=50, T=1.0):
    """Forward integrate prior samples."""
    x = np.random.randn(n_samples, 2)
    dt = T / n_steps
    for i in range(n_steps):
        t = i * dt
        v = np.array([velocity(x[k], t) for k in range(n_samples)])
        x = x + dt * v
    return x

samples = sample_cnf(velocity_field)
print(f"Sample mean: {samples.mean(axis=0)}")
print(f"Sample cov:\n{np.cov(samples.T)}")

# Real CNF training: stochastic gradients, Hutchinson trace, NODE solver
print("Real CNF: requires NN + neural ODE solver (torchdiffeq, jax.experimental.ode).")
```

## Applied

- **State-of-art generation** — Stable Diffusion 3 (rectified flow),
  Sora (flow matching).
- **Density estimation** — CNF gives exact likelihoods.
- **Scientific simulation** — neural-ODE-based fluid dynamics.
- **Reinforcement learning** — continuous-time policy and value
  learning.
- **Time-series modelling** — irregular-time-step data via NODEs.

## Check Your Understanding

:::widget type=numeric-input prompt="CNF: invertible velocity field for generation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Flow matching trains by matching velocity, not likelihood. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stable Diffusion 3 uses rectified flow. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hutchinson trace estimator: $\\mathrm{tr}(A) = \\mathbb E[v^T A v]$. Type 1." answer=1 explain="Yes.":::
