---
strand: uncertainty
level: research
order: 8
title: Stochastic Homogenisation
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 07-causal-frontier
    description: Causal frontier
connections:
  - strand-6-uncertainty-research/09-uncertainty-research-capstone
applications:
  - cs: "Multi-scale modelling in materials science, climate, biology"
  - life: "Effective behaviour from random microstructure"
---

# Stochastic Homogenisation

## Explain Like I Am 7

Imagine a sponge made of random tiny pockets — some hard, some
soft — and you want to know how it bends when squeezed.  At the
sponge's *fingertip* scale the material is wildly different in
every spot, but *zoomed out* the sponge has a single, smooth,
average stiffness.  **Stochastic homogenisation** is the math of
that zoom-out: how randomness at small scales gives birth to
deterministic effective laws at big scales.  This is how
materials scientists, climate modellers, and biologists pass from
microscopic mess to clean usable equations.

## Mental

**Homogenisation**: pass from small-scale heterogeneous problem to
large-scale **effective** (homogenised) problem.

**Stochastic homogenisation**: small-scale randomness (random
coefficients, random media). Effective coefficients are
deterministic; random fluctuations vanish in scaling limit.

## Setting

Consider a **PDE** with rapidly-varying random coefficients $a(x/\epsilon)$:

$$
-\nabla \cdot (a(x/\epsilon) \nabla u_\epsilon) = f.
$$

As $\epsilon \to 0$, $u_\epsilon \to u_*$ (in suitable sense),
where $u_*$ solves a *homogenised* PDE with **constant**
(deterministic) effective coefficient $a_*$.

## Effective coefficient

For ergodic stationary $a$:

$$
a_* = \mathbb E[a(0) (I + \nabla \chi(0))],
$$

where **corrector** $\chi$ solves a stochastic PDE on the whole
space.

**Computing $a_*$**: a major theme. Numerical methods (Mourrat-
Otto, Gloria-Otto): efficient algorithms for periodic / stochastic
homogenisation.

## Quantitative homogenisation

Modern theory (Armstrong-Kuusi-Mourrat, ~2017): *quantitative*
rates of convergence. Concentration estimates via subadditive
ergodic theory + variance decay.

Bridges classical PDE + concentration of measure + ergodic theory.

## Worked example: 1D random conductivity

For $-\partial_x (a(x) \partial_x u) = f$ with $a$ iid in cells:

Effective $a_* = (\mathbb E[1/a])^{-1}$ — harmonic mean.

In 2D / higher dim: no such closed form; effective is between
arithmetic and harmonic means.

## Interactive

:::widget type=numeric-input prompt="Stochastic homogenisation: random microstructure → deterministic macro. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="1D effective conductivity: harmonic mean. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantitative homogenisation: rates by AKM ~ 2017. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Corrector solves PDE on whole space. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Two-scale convergence** (Nguetseng-Allaire): formal framework for
identifying limit equations.

**$\Gamma$-convergence**: variational analogue; energy functionals
converge in a sense respecting minimisers.

**Free-energy** computations in random media:
fluctuation-dissipation theorems.

**Continuum-mechanics applications**: modelling composites,
porous media, polycrystals.

## Computational

```python
import numpy as np

# 1D random conductivity homogenisation
def homogenised_1d(a_distribution_samples):
    """Effective conductivity in 1D = harmonic mean of cell values."""
    return 1 / np.mean(1 / a_distribution_samples)

# Sample iid log-normal conductivities
np.random.seed(0)
n = 1000
a_samples = np.exp(np.random.randn(n))
a_eff = homogenised_1d(a_samples)
print(f"Effective 1D a* (harmonic mean): {a_eff:.4f}")
print(f"Arithmetic mean: {a_samples.mean():.4f}")
print(f"(Effective is below arithmetic mean — Voigt vs Reuss bounds.)")

# Numerical solution of -∂_x (a(x) ∂_x u) = 1 with random a
def solve_random_1d(a_samples, f=1.0, dx=1.0):
    """Discretise: face-centred a, finite differences."""
    n = len(a_samples)
    # Build tridiagonal matrix
    diag = np.zeros(n)
    upper = np.zeros(n - 1)
    lower = np.zeros(n - 1)
    for i in range(n):
        a_left = a_samples[max(i - 1, 0)]
        a_right = a_samples[min(i + 1, n - 1)]
        diag[i] = (a_left + a_right) / dx**2
        if i < n - 1: upper[i] = -a_right / dx**2
        if i > 0: lower[i - 1] = -a_left / dx**2
    A = np.diag(diag) + np.diag(upper, 1) + np.diag(lower, -1)
    rhs = np.full(n, f)
    return np.linalg.solve(A, rhs)

u = solve_random_1d(a_samples[:100])
# Effective u behaves like solution with constant a_eff
print(f"Numerical u(centre) ≈ {u[50]:.4f}")
```

## Applied

- **Materials science** — composites, polycrystals, porous-media
  effective properties.
- **Climate** — homogenisation of small-scale ocean / atmosphere
  turbulence into large-scale effective transport.
- **Biology** — effective diffusion in cells / tissues.
- **Geophysics** — effective elastic / wave properties of
  heterogeneous Earth.
- **Subgrid-scale modelling in CFD** — turbulence closure problems.

## Check Your Understanding

:::widget type=numeric-input prompt="Stochastic homogenisation: deterministic limit from random micro. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="1D effective $a_*$: harmonic mean. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantitative homogenisation: AKM rates ~ 2017. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Two-scale convergence (Nguetseng-Allaire). Type 1." answer=1 explain="Yes.":::
