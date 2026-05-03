---
strand: change
level: master
order: 4
title: Functional Analysis
prerequisites:
  - tier: strand-4-change-master
    slug: 03-fourier-and-distributions
    description: Fourier and distributions
connections:
  - strand-4-change-master/05-stochastic-calculus
applications:
  - cs: "Quantum computing, optimisation, ML theory"
  - life: "Linear algebra in infinite dimensions"
---

# Functional Analysis

## Mental

**Functional analysis** is linear algebra for infinite-dimensional
spaces:

- **Banach space**: complete normed vector space.
- **Hilbert space**: complete inner-product space.
- **Operators**: linear maps $T : X \to Y$ between such spaces.

Three pillars:

1. **Hahn-Banach theorem**: extend bounded linear functionals.
2. **Open mapping theorem** + closed graph theorem: surjective
   bounded operators between Banach spaces are open.
3. **Uniform boundedness** (Banach-Steinhaus): pointwise-bounded
   family is uniformly bounded.

## Hilbert spaces

Inner product $\langle \cdot, \cdot \rangle$, norm $\|x\| = \sqrt{\langle x, x \rangle}$.

**Examples**:

- $\ell^2 = \{(a_n) : \sum |a_n|^2 < \infty\}$.
- $L^2(\mathbb R) = \{f : \int |f|^2 < \infty\}$.
- $H^1(\Omega) = \{f \in L^2 : \nabla f \in L^2\}$ — Sobolev space.

**Riesz representation**: every bounded linear functional on a
Hilbert space is $f \mapsto \langle f, g \rangle$ for some $g$.

**Orthonormal bases**: every separable Hilbert space has a countable
ONB. Allows Fourier-style decomposition.

## Spectral theorem

For a bounded **self-adjoint** operator $T$ on a Hilbert space:

$$
T = \int_\sigma \lambda \, dE_\lambda
$$

— a generalised spectrum integral. Generalises diagonalisation of
matrices.

For compact self-adjoint $T$: discrete eigenvalues with finite-dim
eigenspaces (Hilbert-Schmidt theorem).

In quantum mechanics: observables ↔ self-adjoint operators on $L^2$;
spectral theorem ↔ "measurement gives an eigenvalue."

## Worked example: $L^2[0, 1]$

Hilbert space of square-integrable functions on $[0, 1]$.

Orthonormal basis: $\{e_n(x) = \sqrt 2 \sin(n \pi x)\}_{n=1}^\infty$
— Fourier sine basis.

Any $f \in L^2$ expands as $f = \sum c_n e_n$ with
$c_n = \langle f, e_n \rangle$ and $\sum |c_n|^2 = \|f\|^2$
(Parseval).

The Laplacian $-\Delta$ has eigenvalues $n^2 \pi^2$ on this basis —
diagonalised by Fourier sine expansion.

## Interactive

:::widget type=numeric-input prompt="Hilbert space: complete inner-product space. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$L^2(\\mathbb R)$ is a Hilbert space. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Spectral theorem generalises matrix diagonalisation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Riesz: bounded linear functional on Hilbert = inner product. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Compact operator**: maps bounded sets to relatively compact sets.
Spectrum: only 0 as accumulation; non-zero spectrum = eigenvalues
with finite-dim eigenspaces.

**Banach algebras**: Banach spaces with multiplication. Continuous
function spaces $C(X)$, operator algebras $\mathcal B(H)$,
$C^*$-algebras.

**Distribution theory** (Lesson 03) is a special case of functional
analysis: distributions live in dual spaces of test-function spaces.

**Sobolev embedding**: $H^k \hookrightarrow C^j$ for $k > n/2 + j$
on $n$-dim domains. Connects "smoothness in $L^2$ norm" to "classical
smoothness."

## Computational

```python
import numpy as np

# Approximate L^2 functions via Fourier basis
N = 100
x = np.linspace(0, 1, 1000)
f = np.where((x > 0.3) & (x < 0.7), 1.0, 0.0)   # step function

# Project onto first N sine basis functions
basis = [np.sqrt(2) * np.sin((n + 1) * np.pi * x) for n in range(N)]
coeffs = [np.trapezoid(f * b, x) for b in basis]

# Reconstruct
f_approx = sum(c * b for c, b in zip(coeffs, basis))
print("L^2 reconstruction error:", np.sqrt(np.trapezoid((f - f_approx)**2, x)))

# Self-adjoint operator: differentiation acts on differentiable functions
# but on full L^2 it's unbounded. Spectral theorem applies more carefully.

# Compact operator example: integral operator
def K(x_arr, y_arr):
    return np.exp(-(x_arr[:, None] - y_arr[None, :])**2)

K_mat = K(x[::10], x[::10])
eigs = np.linalg.eigvalsh(K_mat)
print("Top 5 eigenvalues of compact integral operator:", sorted(eigs, reverse=True)[:5])
```

## Applied

- **Quantum mechanics** — Hilbert spaces are state spaces;
  observables are self-adjoint operators.
- **PDE theory** — weak solutions live in Sobolev spaces; existence
  proofs use functional-analytic compactness.
- **Optimisation** — convex analysis, Hilbert-space gradient descent
  for variational problems.
- **Signal processing** — wavelets and frames in Hilbert spaces.
- **Machine learning** — RKHS (reproducing kernel Hilbert spaces) for
  kernel methods (SVM, GP); neural-tangent-kernel perspective on
  deep learning.

## Check Your Understanding

:::widget type=numeric-input prompt="Hilbert space generalises Euclidean space to infinite dim. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$L^2$ is Hilbert; $L^p$ for $p \\ne 2$ is only Banach. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Compact self-adjoint: discrete spectrum (Hilbert-Schmidt). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="RKHS underlies kernel methods in ML. Type 1." answer=1 explain="Yes.":::
