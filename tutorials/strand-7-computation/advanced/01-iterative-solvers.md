---
strand: computation
level: advanced
order: 1
title: Iterative Solvers and Sparse Methods
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 00-numerical-linear-algebra
    description: Numerical linear algebra
connections:
  - strand-7-computation-advanced/02-svd-and-pca
applications:
  - cs: "PDE solvers, large-scale ML, web-scale graph algorithms"
  - life: "Solving huge systems via clever fixed-point iteration"
---

# Iterative Solvers and Sparse Methods

## Explain Like I Am 7

You're solving a giant join-the-dots puzzle — millions of dots — and
the lazy way is to start with a guess and *nudge* it closer to the
answer over and over, like adjusting a wonky picture frame until it
hangs straight.  Each nudge is cheap, and after enough nudges the
frame is straight enough.  Most of the picture is already nailed in
place, so you only ever touch the few wobbly spots.  That's the whole
trick: cheap nudges, ignore the empty space, stop when it looks
right.

## Mental

For huge sparse systems $A \mathbf{x} = \mathbf{b}$ ($n = 10^6$ or
more), $O(n^3)$ direct methods are infeasible. **Iterative solvers**
build a sequence $\mathbf{x}_k \to \mathbf{x}^*$ via cheap matrix-
vector products $A \mathbf{v}$.

## Stationary methods

- **Jacobi**: $\mathbf{x}^{(k+1)} = D^{-1}(\mathbf{b} - (L + U) \mathbf{x}^{(k)})$
  where $A = L + D + U$.
- **Gauss-Seidel**: similar, but use updated components immediately.
- **SOR (Successive Over-Relaxation)**: blend of GS with relaxation
  parameter $\omega$.

Convergence depends on the **spectral radius** of the iteration
matrix; for diagonally dominant $A$ both Jacobi and GS converge.

## Krylov-subspace methods

The modern workhorses. Build a sequence of residuals
$r_0 = \mathbf{b} - A \mathbf{x}_0, A r_0, A^2 r_0, \ldots$ —
the **Krylov subspace** $\mathcal{K}_k = \mathrm{span}(r_0, A r_0, \ldots, A^{k-1} r_0)$.
Find the best approximation in $\mathcal{K}_k$.

- **Conjugate Gradient (CG)** — for SPD systems. Converges in at
  most $n$ iterations exactly; in practice $O(\sqrt{\kappa})$
  iterations.
- **GMRES** — general matrices.
- **BiCGStab, MINRES, LSQR** — variants for specific structures.

Per iteration: one matrix-vector product. Total: $O(\sqrt \kappa \cdot n_{\rm nz})$
operations. Massive speedup for sparse $A$.

## Preconditioning

To speed convergence, apply $M^{-1}$ such that $M^{-1} A$ has smaller
$\kappa$. Common preconditioners:

- **Jacobi (diagonal)**: $M = D$.
- **Incomplete LU (ILU)**: approximate LU with sparsity preserved.
- **Multigrid**: for PDEs, cycles between fine and coarse grids.
- **Algebraic multigrid (AMG)**: works without geometric grid.

## Interactive

:::widget type=numeric-input prompt="CG iterations to converge: $O(\\sqrt \\kappa)$. For $\\kappa = 10^4$: $\\sqrt{10^4} = ?$" answer=100 explain="$100$.":::

:::widget type=numeric-input prompt="Per-iteration cost: dominated by mat-vec product, $O(?)$ for sparse $A$." answer=0 explain="$O(n_{nz})$ — non-zeros. Type 0.":::

:::widget type=numeric-input prompt="Preconditioner reduces effective condition number. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GMRES handles general (non-SPD) matrices. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Convergence of CG**: error $\|\mathbf{e}_k\|_A \le 2 \left(\frac{\sqrt\kappa - 1}{\sqrt\kappa + 1}\right)^k \|\mathbf{e}_0\|_A$.

**Eigenvalue problems** — power iteration, Lanczos for symmetric,
Arnoldi for general. Find dominant eigenvectors via Krylov subspaces.

**Sparse matrix formats**:

- **CSR/CSC**: row/column compressed sparse — standard.
- **COO**: coordinate (triple).
- **DIA, ELL, BSR**: specialised for diagonals, ELL-pack, blocks.

Choice affects performance; SuiteSparse provides multiple options.

## Computational

```python
import numpy as np
from scipy.sparse import diags, csr_matrix
from scipy.sparse.linalg import cg, gmres

# Build a sparse SPD matrix (1D Laplacian)
n = 1000
A = diags([-1, 2, -1], [-1, 0, 1], shape=(n, n)).tocsr()
b = np.ones(n)

# Conjugate gradient
x, info = cg(A, b, rtol=1e-8)
print(info, np.linalg.norm(A @ x - b))         # 0, ~1e-8

# Compare to direct solve
from scipy.sparse.linalg import spsolve
x_exact = spsolve(A, b)
print(np.linalg.norm(x - x_exact))             # ~1e-8

# GMRES on a non-symmetric system
A_ns = csr_matrix(np.random.randn(100, 100) + 10*np.eye(100))
b_ns = np.random.randn(100)
x_gmres, info = gmres(A_ns, b_ns, rtol=1e-8)
print(info, np.linalg.norm(A_ns @ x_gmres - b_ns))  # ~0
```

## Applied

- **PDE solvers** — finite-element/finite-difference discretisations
  yield huge sparse systems; CG/GMRES with multigrid preconditioning.
- **PageRank computation** at web scale uses power iteration on
  sparse stochastic matrices.
- **Recommender systems** — solving huge regularised least-squares
  problems for matrix completion.
- **Sparse linear regression / LASSO** — coordinate descent and
  proximal gradient methods.
- **Quantum-chemistry simulations** — DFT, coupled cluster require
  sparse linear-system solves at enormous scale.
- **Optimisation** — interior-point methods for LP/QP solve a
  sequence of sparse systems.

## Check Your Understanding

:::widget type=numeric-input prompt="CG works for SPD matrices. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Per-iteration cost dominated by sparse matrix-vector product. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Preconditioner $M$ should approximate $A^{-1}$ cheaply. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GMRES handles non-symmetric systems. Type 1." answer=1 explain="Yes.":::
