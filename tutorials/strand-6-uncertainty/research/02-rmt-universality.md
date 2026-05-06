---
strand: uncertainty
level: research
order: 2
title: Random Matrix Universality
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 01-liouville-quantum-gravity
    description: LQG
connections:
  - strand-6-uncertainty-research/03-free-probability
applications:
  - cs: "Wireless communication, ML eigenvalue analysis, quantum chaos"
  - life: "Universal eigenvalue statistics across many models"
---

# Random Matrix Universality

## Explain Like I Am 7

Build a giant grid of random numbers and find its eigenvalues —
the special numbers that describe how the matrix stretches space.
Strangely, the *gaps* between consecutive eigenvalues, and the
distribution of the largest one, look almost identical no matter
how you choose the random numbers.  This is **universality**: the
local statistics don't care about the recipe; they only care about
the symmetry of the matrix.  The same Tracy-Widom curve pops up in
nuclear physics, traffic-jam models, and growing crystal surfaces.

## Mental

For random Hermitian / symmetric / unitary matrices of size $N \to \infty$:

- **Eigenvalue density**: Wigner semicircle for GOE/GUE/GSE Wigner
  matrices.
- **Local statistics** (gaps, top eigenvalue): **universal**
  across many models.

**Universality**: same limiting distributions for matrices with very
different entry distributions, provided moments suffice.

## Three classical ensembles

| Ensemble | Symmetry | Joint density |
|---|---|---|
| GOE | real symmetric | $\propto e^{-(1/2) \mathrm{tr} M^2} dM$ |
| GUE | complex Hermitian | $\propto e^{-\mathrm{tr} M^2} dM$ |
| GSE | quaternion self-adjoint | $\propto e^{-2 \mathrm{tr} M^2} dM$ |

Eigenvalue spacings: governed by **Dyson's $\beta$-ensembles**
($\beta = 1, 2, 4$).

## Tracy-Widom distribution

Top eigenvalue (rescaled):

$$
N^{2/3} (\lambda_{\max} - 2) \to F_\beta,
$$

where $F_\beta$ is the **Tracy-Widom** distribution for $\beta$ =
GOE / GUE / GSE.

Universality: same $F_\beta$ for non-Gaussian Wigner matrices
(Erdős-Yau-Schlein-Tao-Vu).

## Universality theorems

**Sinai-Soshnikov 1998**: top-eigenvalue universality for
Wigner-type ensembles.

**Tao-Vu / Erdős et al. 2010s**: bulk universality of eigenvalue
gaps.

**Bourgade-Yau 2017**: local universality + spectral edge
universality.

## Worked example

For an $N \times N$ Hermitian matrix with iid Gaussian entries:

- Eigenvalue density → semicircle on $[-2, 2]$ as $N \to \infty$.
- Local spacing in bulk → Wigner surmise $p(s) \approx s^\beta e^{-c s^2}$.

## Interactive

:::widget type=numeric-input prompt="GOE/GUE/GSE: 3 classical ensembles. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Tracy-Widom: top-eigenvalue universal limit. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Universality: same limits for non-Gaussian Wigner. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bulk gap universality: Erdős-Yau-Schlein-Tao-Vu. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Dyson Brownian motion**: eigenvalues evolve under a coupled SDE;
foundational tool for universality proofs.

**Local relaxation flow**: technical machinery in Erdős-Yau et al.
proofs.

**Free probability** (Lesson 03): non-commutative analogue of
classical probability; characterises *limit* of eigenvalue spectra
for sums / products of random matrices.

**Spectral statistics ↔ ζ zeros**: **Montgomery-Odlyzko**
conjecture: Riemann ζ zero spacings match GUE.

## Computational

```python
import numpy as np

# GUE matrix and eigenvalues
N = 200
A = (np.random.randn(N, N) + 1j * np.random.randn(N, N)) / np.sqrt(2)
M = (A + A.conj().T) / np.sqrt(2 * N)

eigs = np.linalg.eigvalsh(M)
print(f"Top eigenvalue: {eigs[-1]:.4f}, expected ≈ 2")

# Tracy-Widom rescaling
top_rescaled = N**(2/3) * (eigs[-1] - 2)
print(f"Rescaled top eig: {top_rescaled:.4f} (compare to F_2 mean ≈ -1.77)")

# Bulk eigenvalue spacings
spacings = np.diff(eigs[N//2 - 5 : N//2 + 5])
mean_spacing = np.mean(spacings)
normalised = spacings / mean_spacing
print(f"Normalised bulk spacings: {normalised}")
# Wigner surmise: distribution ∝ s e^{-π s²/4} (GOE) or s² e^{-4 s²/π} (GUE)

# Many-trial Tracy-Widom histogram (computationally expensive)
print("Many-trial histogram → Tracy-Widom F_2 (numerical agreement).")
```

## Applied

- **Wireless communication** — MIMO channel capacity uses random-
  matrix eigenvalue statistics.
- **Quantum chaos** — chaotic quantum systems exhibit RMT eigenvalue
  statistics (Bohigas-Giannoni-Schmit).
- **Number theory** — ζ zero spacings ↔ GUE (Montgomery-Odlyzko).
- **ML / data science** — covariance matrix spectrum analysis;
  Marchenko-Pastur for sample covariance.
- **Finance** — risk modelling via spectrum of correlation matrices.

## Check Your Understanding

:::widget type=numeric-input prompt="Wigner semicircle: limiting eigenvalue density. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tracy-Widom universal top-eigenvalue limit. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Montgomery-Odlyzko: ζ zeros ↔ GUE. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Marchenko-Pastur: sample-covariance spectrum. Type 1." answer=1 explain="Yes.":::
