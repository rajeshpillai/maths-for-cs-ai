---
strand: change
level: master
order: 6
title: Numerical Methods for PDEs
prerequisites:
  - tier: strand-4-change-master
    slug: 05-stochastic-calculus
    description: Stochastic calculus
connections:
  - strand-4-change-master/07-reverse-mode-ad
applications:
  - cs: "Engineering simulation, climate models, neural PDE solvers"
  - life: "PDE solutions on real hardware"
---

# Numerical Methods for PDEs

## Explain Like I Am 7

PDE rules are usually too curly for a person to solve by hand.
So we hand the job to a computer — but a computer can only deal
with finite pieces.  **Numerical methods for PDEs** is the craft
of chopping a smooth wavy world into tiny squares (or triangles
or chunks), turning the curly rule into "this corner equals an
average of its neighbours," and letting the computer churn until
the squares settle into a picture.  It's how weather forecasts,
crash simulations, and special-effects fluids get computed.

## Mental

Three classical approaches:

- **Finite differences (FD)**: replace derivatives with discrete
  differences on a grid.
- **Finite elements (FEM)**: pose weak formulation, project onto
  basis of "tent" functions on a mesh.
- **Spectral methods**: expand in Fourier / Chebyshev basis;
  exponentially accurate for smooth solutions.

## Stability and convergence

For evolution PDEs (heat, wave), numerical schemes must satisfy
stability conditions:

- **CFL** condition for hyperbolic / explicit parabolic:
  $\Delta t \le C \Delta x$ (or $\Delta t \le C \Delta x^2$).
- **Implicit schemes** (Crank-Nicolson, backward Euler) avoid CFL
  but require linear solves.

**Lax equivalence theorem**: for consistent linear schemes,
*stability ⇔ convergence*.

## Worked example: 2D Poisson via FEM

Solve $-\Delta u = f$ on $\Omega$ with $u = 0$ on $\partial \Omega$.

**Weak form**: find $u \in H^1_0(\Omega)$ such that
$\int \nabla u \cdot \nabla v = \int f v$ for all $v \in H^1_0$.

**Discrete**: triangulate $\Omega$, basis = piecewise-linear "hat"
functions; assemble stiffness matrix $K$ and load vector $F$; solve
$K u = F$.

For $\Omega = [0, 1]^2$ with $h$-spacing: $O(h^{-2})$ unknowns,
$O(h^2)$ error in $H^1$ norm.

## High-performance solvers

**Multigrid**: solves discretised Poisson in $O(N)$ time —
asymptotically optimal. Used in climate, fluid simulations.

**Krylov methods + preconditioning** (Strand 7 Advanced Lesson 01):
GMRES + AMG, CG + ILU.

**Domain decomposition**: split domain across processors; solve
each subdomain, glue along interfaces.

## Interactive

:::widget type=numeric-input prompt="CFL condition relates $\\Delta t$ and $\\Delta x$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Implicit schemes more stable, more expensive per step. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Multigrid solves Poisson in $O(N)$ time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Spectral methods: exponential accuracy for smooth solutions. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Lax-Wendroff** schemes: second-order accurate hyperbolic schemes
exploiting Taylor expansion of the PDE.

**Discontinuous Galerkin (DG)**: mix FE with finite-volume features.
Used for high-order shock-resolving methods.

**Adaptive mesh refinement (AMR)**: refine the mesh where
gradients are large, coarsen where smooth.

**Reduced-order modelling (ROM)**: project full-order PDE onto a
small basis (POD, reduced-basis methods). Real-time engineering
simulation.

## Computational

```python
import numpy as np
from scipy.sparse import diags
from scipy.sparse.linalg import spsolve

# Solve 1D Poisson: -u''(x) = f(x), u(0) = u(1) = 0 via finite differences
N = 50
h = 1 / (N + 1)
x_inner = np.linspace(h, 1 - h, N)

# Discretised -d²/dx² as tridiagonal matrix
A = diags([-1, 2, -1], [-1, 0, 1], shape=(N, N)) / h**2

# RHS: f(x) = π² sin(πx) so true u = sin(πx)
f = np.pi**2 * np.sin(np.pi * x_inner)

u = spsolve(A.tocsr(), f)
exact = np.sin(np.pi * x_inner)
print("max error:", np.max(np.abs(u - exact)))   # O(h²)

# 2D Poisson FEM is more involved; sketch:
# Triangulate, assemble stiffness K_ij = ∫ ∇φ_i · ∇φ_j dx, solve K u = F
# Use FEniCS, FreeFem, or Firedrake for production code

# Spectral method: Chebyshev polynomial collocation
def chebyshev_diff(N):
    """Differentiation matrix on Chebyshev points cos(k π / N)."""
    if N == 0: return np.zeros((1, 1)), np.array([0])
    k = np.arange(N + 1)
    x = np.cos(k * np.pi / N)
    c = np.where((k == 0) | (k == N), 2.0, 1.0) * (-1)**k
    X = np.tile(x, (N + 1, 1)).T
    dX = X - X.T + np.eye(N + 1)
    D = (c[:, None] / c[None, :]) / dX
    D -= np.diag(np.sum(D, axis=1))
    return D, x

D, x = chebyshev_diff(20)
print("Cheb diff error on cos(πx):", np.max(np.abs(D @ np.cos(np.pi * x) + np.pi * np.sin(np.pi * x))))
```

## Applied

- **Climate models** (NCAR-CESM, ECMWF) — finite-volume for
  atmosphere/ocean; multigrid pressure solvers.
- **Aerodynamics CFD** — finite volume / DG for compressible
  Navier-Stokes; aircraft / car / wind-turbine design.
- **Structural mechanics** — FEM for stress analysis.
- **Quantum chemistry** — Kohn-Sham DFT discretised on real-space
  grids or plane-wave bases.
- **Neural PDE solvers** — physics-informed networks (PINNs), neural
  operators (DeepONet, FNO) trained on PDE solutions.

## Check Your Understanding

:::widget type=numeric-input prompt="CFL: $\\Delta t \\le C \\Delta x$ for hyperbolic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Multigrid: $O(N)$ Poisson. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="FEM uses weak formulation + basis projection. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PINNs trained via PDE-residual loss. Type 1." answer=1 explain="Yes.":::
