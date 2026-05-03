---
strand: shape-space
level: advanced
order: 9
title: Capstone — Geometry, Curvature, and Topology
prerequisites:
  - tier: strand-3-shape-space-advanced
    slug: 08-homology-intro
    description: Simplicial homology
connections:
  - strand-3-shape-space-intermediate/09-shape-space-capstone-2
  - strand-2-structure-advanced/09-structure-capstone-3
applications:
  - cs: "Computer vision, computer graphics, TDA, GR simulation"
  - life: "Mature geometry meets modern computation"
---

# Capstone — Geometry, Curvature, and Topology

## Mental

Nine lessons on:

- **Projective coordinates** (Lesson 00).
- **Projective transformations / homographies** (Lesson 01).
- **Curves and curvature** (Lesson 02).
- **First fundamental form** (Lesson 03).
- **Gauss curvature and Theorema Egregium** (Lesson 04).
- **Geodesics** (Lesson 05).
- **Topology basics** (Lesson 06).
- **Fundamental group** (Lesson 07).
- **Simplicial homology** (Lesson 08).

You've seen the modern geometric toolkit: projective for vision,
differential for ML and physics, topological for data analysis.
Three integrated walkthroughs.

## Walkthrough 1: smartphone augmented reality

When you point your phone at a flat surface and an app drops a 3D
object on it, the system runs:

1. **Feature detection** (SIFT, ORB) on the image stream.
2. **Match** features across frames; estimate **homography** (Lesson 01)
   between the planar surface and the image plane.
3. **Camera pose recovery** — decompose the homography into rotation,
   translation, and intrinsic-camera scaling.
4. **Occlusion / lighting** — surface curvature (Lessons 03–04)
   informs realistic placement.
5. **3D rendering** — apply the recovered projective transformation
   to project the virtual object back to the screen.

ARKit, ARCore, and Vuforia all run this pipeline.

## Walkthrough 2: general relativity in a nutshell

Spacetime is a 4-dimensional Lorentzian manifold:

- **Metric tensor** $g_{\mu\nu}$ — generalised first fundamental form
  (Lesson 03), four-by-four with mixed signature.
- **Christoffel symbols** $\Gamma^\lambda_{\mu\nu}$ — derived from
  $g$.
- **Riemann curvature tensor** $R^\rho_{\sigma\mu\nu}$ — generalises
  Gauss curvature (Lesson 04).
- **Geodesic equation** (Lesson 05) — free-fall trajectories.
- **Einstein field equations**: $G_{\mu\nu} = 8\pi T_{\mu\nu}$ —
  curvature equals energy-momentum.

Black holes, gravitational lensing, gravitational waves, the
expansion of the universe all live here. LIGO detects gravitational
waves predicted by these equations a century ago.

## Walkthrough 3: topological data analysis pipeline

A point cloud $X \subset \mathbb{R}^d$ — say, MRI tumor contours.

1. Build a **filtration** $K_\epsilon$ of simplicial complexes as
   the radius parameter $\epsilon$ grows (Vietoris-Rips, alpha
   complex).
2. Compute **persistent homology** (Lesson 08, Strand 2 Advanced) —
   track Betti numbers $\beta_0, \beta_1, \beta_2$ as $\epsilon$
   varies.
3. **Barcode** captures lifespan of each topological feature.
4. **Statistical comparisons** between barcodes (bottleneck distance,
   Wasserstein, persistence images).

Application: distinguishing benign from malignant tumours, when the
*shape* of the tumour matters, not just its size.

## Roadmap

**Strand 3 Master** picks up:

- Riemannian and Lorentzian manifolds in depth.
- De Rham cohomology and Stokes theorem on manifolds.
- Lie groups, Lie algebras, and homogeneous spaces.
- Algebraic topology: CW complexes, homotopy theory, spectral sequences.
- Algebraic geometry: schemes, sheaves, varieties.
- Symplectic geometry and mechanics.

**Strand 3 Research-adjacent**: derived algebraic geometry, $\infty$-
categories, mirror symmetry, geometric Langlands, persistent
homology theory, optimal transport on manifolds.

## Closing

Geometry started by measuring fields — *geo-metry* literally means
"earth-measure." Two-and-a-half millennia later it has become the
language of:

- Camera projection and AR.
- Spacetime in physics.
- Loss landscapes in ML.
- Data shape in TDA.

Different problems, but a shared toolkit: **a space with structure,
maps that respect structure, invariants that distinguish the maps
that do from those that don't.** Once you internalise the
abstraction, every modeled phenomenon reveals geometric content.

## Interactive

:::widget type=numeric-input prompt="Gauss curvature of a unit sphere: $1$. Type 1." answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\pi_1(S^1) \\cong \\mathbb{Z}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Homography has 8 DOF in $\\mathbb{RP}^2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Theorema Egregium: Gauss curvature is intrinsic. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Great-circle geodesic on unit sphere from $\\mathbf{p}$ to $\\mathbf{q}$: $\\arccos(\\mathbf{p} \\cdot \\mathbf{q})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Homology counts holes of every dimension. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In GR, gravity = curvature of spacetime. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Persistent homology produces a barcode invariant. Type 1." answer=1 explain="Yes.":::
