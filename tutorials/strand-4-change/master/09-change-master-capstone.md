---
strand: change
level: master
order: 9
title: Capstone — Calculus at the Frontier
prerequisites:
  - tier: strand-4-change-master
    slug: 08-information-geometry
    description: Information geometry
connections:
  - strand-4-change-advanced/09-change-capstone-2
  - strand-7-computation-master/00-parallel-computing
applications:
  - cs: "Modern AI/ML, scientific computing, finance, control"
  - life: "Where calculus has gone since 1900"
---

# Capstone — Calculus at the Frontier

## Mental

Nine lessons on:

- **Calculus of variations** (Lesson 00).
- **ODE theory deeper** (Lesson 01).
- **PDEs introduction** (Lesson 02).
- **Fourier analysis and distributions** (Lesson 03).
- **Functional analysis** (Lesson 04).
- **Stochastic calculus** (Lesson 05).
- **Numerical PDEs** (Lesson 06).
- **Reverse-mode AD** (Lesson 07).
- **Information geometry** (Lesson 08).

You can now read graduate-level analysis and apply it to modern
scientific computing and ML. Three integrated walkthroughs.

## Walkthrough 1: training a foundation model

Modern LLM training:

1. **Architecture**: layers map $\mathbb R^d \to \mathbb R^d$ — linear
   maps + non-linearities on Hilbert spaces (Lesson 04).
2. **Forward pass**: function composition with intermediates stored.
3. **Loss**: expected cross-entropy — an $L^2$-style functional
   (Lesson 04).
4. **Backward pass**: reverse-mode AD (Lesson 07) computes
   $\nabla_\theta \mathrm{loss}$ in $O(\text{forward cost})$.
5. **Optimiser step**: SGD / Adam / Shampoo / K-FAC — the last two
   are natural-gradient approximations from information geometry
   (Lesson 08).
6. **Diffusion-model variants** — train via score matching, sample
   via reverse-time SDE (Lesson 05).

Every layer is calculus of one form or another.

## Walkthrough 2: solving PDEs at scale

A modern climate or aerodynamics simulation:

1. **PDE**: nonlinear PDE system (Navier-Stokes + thermodynamics +
   chemistry).
2. **Discretisation**: finite-volume on staggered grid (Lesson 06).
3. **Time-stepping**: implicit-explicit schemes; CFL-bounded.
4. **Linear solver**: multigrid + Krylov (Strand 7 Advanced) for
   pressure; ILU preconditioning.
5. **Adjoint**: reverse-mode AD (Lesson 07) for sensitivity analysis,
   inverse problems (e.g., assimilating weather observations).
6. **Uncertainty quantification**: stochastic PDEs (Lesson 05) for
   ensemble forecasts.

ECMWF, NCAR, NOAA all run pipelines like this on supercomputers.

## Walkthrough 3: option pricing in quantitative finance

Black-Scholes-Merton model:

1. **Stochastic process**: stock $dS = \mu S dt + \sigma S dB$
   (Lesson 05).
2. **Risk-neutral measure**: Girsanov theorem changes drift
   (Lesson 05).
3. **PDE**: $V$ satisfies parabolic Black-Scholes PDE (Lessons 02,
   05).
4. **Numerical solution**: finite-difference / Crank-Nicolson on
   $(S, t)$ grid (Lesson 06).
5. **Calibration**: minimise mismatch between model prices and
   market — variational problem (Lesson 00).
6. **Greeks** (sensitivities): computed via AD (Lesson 07) or
   Malliavin calculus.

Trillions of dollars trade daily on infrastructure like this.

## Roadmap

**Strand 4 Research-adjacent** picks up:

- Geometric analysis (Ricci flow, mean curvature flow).
- Geometric measure theory (currents, varifolds).
- Optimal transport (Monge-Kantorovich, regularity).
- Stochastic PDEs and rough paths (Lyons, Hairer).
- KPZ universality.
- Neural-network theory of approximation.

## Closing

Calculus, born in 1666, was a tool for physics. By 2026 it has
become **the** language of optimisation, ML, scientific simulation,
finance, control, and quantum computing.

Every modern computational technology — every neural network, every
simulator, every option pricer — is *running calculus*. The
mathematical depth has grown alongside the hardware. The strand
ends here at the level where modern scientific computation lives.

## Interactive

:::widget type=numeric-input prompt="Reverse-mode AD: scalar gradient in $O(\\text{forward cost})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Black-Scholes: parabolic PDE. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Multigrid: $O(N)$ Poisson. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Natural gradient invariant under reparameterisation. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Itô's formula has correction $\\frac{1}{2} f'' \\sigma^2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Spectral methods: exponential accuracy on smooth solutions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Diffusion-model ML uses reverse-time SDEs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Brownian motion is nowhere differentiable. Type 1." answer=1 explain="Yes.":::
