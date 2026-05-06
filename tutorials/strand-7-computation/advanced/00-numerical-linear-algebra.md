---
strand: computation
level: advanced
order: 0
title: Numerical Linear Algebra
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 09-computation-capstone-2
    description: Intermediate computation capstone
connections:
  - strand-7-computation-advanced/01-iterative-solvers
applications:
  - cs: "ML training kernels, scientific computing, signal processing"
  - life: "Linear algebra on real hardware with finite precision"
---

# Numerical Linear Algebra

## Explain Like I Am 7

Pretend you have a giant grid of numbers — bigger than the floor of
the school gym — and you need to do arithmetic on the whole thing
without making any squiggly mistakes.  Two problems gang up on you at
once: the grid is *enormous* (so a clumsy method takes years), and the
computer's number postcards always round a bit (so tiny rounding-bumps
can grow into big wrong answers).  This chapter is about clever
shortcuts that finish quickly **and** keep the rounding-bumps from
piling up.

## Mental

Pure linear algebra: solve $A \mathbf{x} = \mathbf{b}$, find
eigenvalues, etc. **Numerical** linear algebra adds:

- **Finite precision** (Strand 7 Foundation Lesson 02 — IEEE 754).
- **Performance** — $O(n^3)$ matters when $n = 10^4$ or $10^7$.
- **Stability** — small input perturbations should produce small
  output errors.

The bridge from theoretical linear algebra to PyTorch, NumPy, BLAS,
LAPACK, MKL.

## Direct vs iterative

**Direct methods** (LU, QR, Cholesky) compute the exact solution in
finite arithmetic up to floating-point error. Cost $\Theta(n^3)$ for
dense matrices. Best when $n \le 10^4$ or matrix is small but dense.

**Iterative methods** (next lesson) approximate the solution via a
sequence of cheap matrix-vector products. Best for sparse or huge
matrices.

## LU decomposition

For a non-singular $A$: $A = P L U$ where $P$ is a permutation, $L$
unit lower triangular, $U$ upper triangular. Computed via Gaussian
elimination with partial pivoting.

Solving $A \mathbf{x} = \mathbf{b}$:

1. $P \mathbf{b} \to \mathbf{b}'$.
2. $L \mathbf{y} = \mathbf{b}'$ — forward substitution.
3. $U \mathbf{x} = \mathbf{y}$ — back substitution.

Total cost $O(n^3)$ for the decomposition; $O(n^2)$ per RHS.

## Conditioning

The **condition number** $\kappa(A) = \|A\| \|A^{-1}\|$ measures how
much the solution amplifies input error:

$$
\frac{\|\delta \mathbf{x}\|}{\|\mathbf{x}\|} \le \kappa(A) \frac{\|\delta A\|}{\|A\|}.
$$

$\kappa$ near 1: well-conditioned. $\kappa = 10^{16}$: ill-conditioned;
double-precision result is meaningless.

For $A^T A$ (normal equations): $\kappa(A^T A) = \kappa(A)^2$ —
*never* solve least squares via normal equations directly.

## Interactive

:::widget type=numeric-input prompt="Direct LU costs $O(n^?)$." answer=3 explain="$O(n^3)$.":::

:::widget type=numeric-input prompt="$\\kappa(A)$ near 1: well-conditioned. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\kappa(A^T A) = \\kappa(A)^?$" answer=2 explain="Squared — avoid normal equations!":::

:::widget type=numeric-input prompt="Hilbert matrix is famously ill-conditioned. Type 1." answer=1 explain="Yes — $\\kappa(H_{10}) \\approx 10^{13}$.":::

## Symbolic

**Cholesky decomposition**: for symmetric positive-definite $A$:
$A = L L^T$. Costs $O(n^3 / 3)$ — half of LU.

**QR decomposition**: $A = QR$ with $Q$ orthogonal, $R$ upper
triangular. Used for least squares: $\min \|A\mathbf{x} - \mathbf{b}\|$
solves $R \mathbf{x} = Q^T \mathbf{b}$.

**SVD**: $A = U \Sigma V^T$ with $U, V$ orthogonal, $\Sigma$
diagonal of singular values. The most numerically stable
decomposition; reveals rank, range, null space.

**Backward stability**: an algorithm is *backward-stable* if computed
solution is the exact solution to a slightly perturbed input. LU with
partial pivoting and QR via Householder are backward-stable.

## Computational

```python
import numpy as np
from scipy import linalg

# LU
A = np.random.randn(5, 5)
P, L, U = linalg.lu(A)
print(np.allclose(P @ L @ U, A))               # True

# QR
Q, R = linalg.qr(A)
print(np.allclose(Q @ R, A))                   # True

# Cholesky for SPD
M = A @ A.T + np.eye(5)
L_chol = linalg.cholesky(M, lower=True)
print(np.allclose(L_chol @ L_chol.T, M))       # True

# SVD
U_svd, s, Vt = linalg.svd(A)
print(np.allclose(U_svd @ np.diag(s) @ Vt, A))  # True

# Condition number
print(np.linalg.cond(A))                        # condition number of A

# Hilbert matrix: notoriously ill-conditioned
H = linalg.hilbert(10)
print(np.linalg.cond(H))                        # ~10^13
```

## Applied

- **BLAS / LAPACK** are FORTRAN libraries (now C/asm) implementing
  these decompositions; everything from MATLAB to PyTorch ultimately
  calls them.
- **GPU compute** — cuBLAS, cuSOLVER do the same on NVIDIA GPUs.
- **Least squares regression** — every regression problem reduces
  to QR or SVD.
- **PCA** — SVD on data matrix gives principal components.
- **Solving PDEs** — discretised PDEs become huge sparse linear
  systems solved via iterative or direct sparse methods.
- **ML training** — neural-network linear layers run BLAS GEMM
  (general matrix multiply) at petaflop scale.

## Check Your Understanding

:::widget type=numeric-input prompt="LU decomposition: $A = PLU$ with $P$ permutation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Direct method cost $O(n^3)$, iterative $O(\\text{sparse-mat-vec products})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cholesky needs SPD matrix. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Backward-stable algorithm: computed solution = exact solution of slightly perturbed input. Type 1." answer=1 explain="Yes.":::
