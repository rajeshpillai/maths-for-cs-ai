---
strand: shape-space
level: master
order: 9
title: Capstone — Modern Geometry
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 08-algebraic-topology-deeper
    description: Algebraic topology deeper
connections:
  - strand-3-shape-space-advanced/09-shape-space-capstone-3
  - strand-2-structure-master/09-structure-master-capstone
applications:
  - cs: "TDA, robotics, ML, quantum, GR"
  - life: "The state of geometry in 2026"
---

# Capstone — Modern Geometry

## Mental

Nine lessons on:

- **Smooth manifolds** (Lesson 00).
- **Tangent bundles and vector fields** (Lesson 01).
- **Differential forms / Stokes** (Lesson 02).
- **Riemannian geometry** (Lesson 03).
- **Lie groups and algebras** (Lesson 04).
- **Fiber bundles and connections** (Lesson 05).
- **Symplectic geometry** (Lesson 06).
- **CW complexes and homotopy** (Lesson 07).
- **Algebraic topology deeper** (Lesson 08).

You can now read graduate-level differential and algebraic topology.
Three integrated walkthroughs.

## Walkthrough 1: general relativity end-to-end

Spacetime $(M, g)$ — 4-dim Lorentzian manifold (Lesson 03):

- **Tangent vectors** are 4-velocities (Lesson 01).
- **Christoffel symbols** $\Gamma^\lambda_{\mu\nu}$ from $g$.
- **Ricci tensor** $R_{\mu\nu}$, **scalar curvature** $R$.
- **Einstein equations**: $R_{\mu\nu} - \frac{1}{2} g_{\mu\nu} R = 8\pi G T_{\mu\nu}$.
- **Geodesics**: free-fall trajectories.
- **Black holes**: solutions like Schwarzschild, Kerr, with event
  horizons and singularities.
- **Gravitational waves**: linearised perturbations of $g$ propagating
  on background — detected by LIGO, 2015.

The whole subject is *one* application of this strand-level.

## Walkthrough 2: equivariant deep learning

Modern ML increasingly respects symmetry:

- **Group-equivariant convolutions** (Cohen-Welling 2016) — $G = D_4, p4m, \mathrm{SE}(2)$.
- **3D molecular networks** — equivariant under $\mathrm{SO}(3)$
  (Lesson 04). E(3)NN, NequIP, MACE.
- **Steerable networks** — fields transform via specific representations
  of $\mathrm{SO}(n)$.
- **Manifold neural networks** — operations parameterised by points
  on Lie groups; geodesic flow as forward pass.
- **Persistent homology features** — combine Lessons 07-08 with
  ML for topology-aware predictions.

The math: representation theory + Lie groups + fiber bundles +
geometry — built into the network design.

## Walkthrough 3: TDA at industrial scale

Modern TDA pipelines:

1. **Filtered CW or simplicial complex** $K_\epsilon$ (Lesson 07).
2. **Persistent homology** $H_*(K_\epsilon)$ as $\epsilon$ varies
   (Strand 2 Advanced + Lesson 08).
3. **Barcodes** as features for ML.
4. **Cup-product persistent cohomology** for richer descriptors.
5. **Wasserstein / bottleneck distances** between barcodes for
   downstream comparisons.

Applied: cancer classification, materials science (porous
materials), signal-processing, neuroscience (brain connectivity),
finance (volatility regime detection).

## Roadmap

**Strand 3 Research-adjacent** picks up:

- $\infty$-categorical homotopy theory.
- Geometric Langlands and gauge theory.
- Mirror symmetry and Calabi-Yau geometry.
- Geometric measure theory and minimal surfaces.
- Persistent homotopy theory.
- Floer homology and symplectic topology frontiers.

## Closing

In 2026, geometry is:

- The language of physics (GR, quantum field theory, string theory).
- The structural foundation of equivariant ML.
- The basis for TDA in cancer research, finance, materials
  science.
- A frontier mathematical subject (Fields medals: Donaldson 1986,
  Witten 1990, Perelman 2006 [declined], Tao 2006, Lurie's program
  ongoing, Scholze 2018).

The "shape and space" strand began with kindergarten geometry; it
now offers the mathematical language of modern physics, ML,
and frontier mathematics.

## Interactive

:::widget type=numeric-input prompt="GR spacetime is a 4D Lorentzian manifold. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Equivariant CNNs respect group symmetry. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Persistent homology produces barcode features. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Symplectic integrators preserve phase-space volume. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Smooth $n$-manifold locally $\\mathbb R^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\pi_3(S^2) = \\mathbb Z$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Maxwell: $dF = 0$, $d * F = J$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Atiyah-Singer index theorem connects analysis to topology. Type 1." answer=1 explain="Yes.":::
