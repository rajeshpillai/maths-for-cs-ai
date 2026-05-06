---
strand: computation
level: advanced
order: 2
title: SVD and PCA Computationally
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 01-iterative-solvers
    description: Iterative solvers
connections:
  - strand-7-computation-advanced/03-rsa-deep
applications:
  - cs: "Recommender systems, image compression, NLP embeddings"
  - life: "The most useful matrix decomposition in practice"
---

# SVD and PCA Computationally

## Explain Like I Am 7

Imagine a wobbly mountain of data shaped like a flattened blueberry.
You'd like to wrap it up in three perfectly tidy stretchy sheets — one
along its longest direction, one along its second longest, one for
its tiny squashed thickness.  After that wrapping, you can throw away
the floppy sheet that barely matters and the blueberry still looks
almost the same with way less paper.  That magical re-wrapping is the
**SVD**, and using it to throw away the boring directions is what
**PCA** does for photos and spreadsheets.

## Mental

The **Singular Value Decomposition** factorises any $m \times n$ matrix:

$$
A = U \Sigma V^T,
$$

with $U$ ($m \times m$, orthogonal), $\Sigma$ ($m \times n$, diagonal
with non-negative entries), $V$ ($n \times n$, orthogonal).

The diagonal entries $\sigma_1 \ge \sigma_2 \ge \ldots \ge 0$ are
**singular values** — the "spectrum" of $A$.

Geometrically: $A$ rotates+stretches+rotates the unit ball to an
ellipsoid with semi-axes $\sigma_i$.

## Truncated SVD and low-rank approximation

For a target rank $k$:

$$
A_k = \sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^T.
$$

**Eckart-Young theorem**: $A_k$ is the **best rank-$k$ approximation**
to $A$ in both Frobenius and spectral norm.

The **error**: $\|A - A_k\|_F^2 = \sum_{i > k} \sigma_i^2$. Captures
how much "energy" is lost.

## Connection to PCA

For data matrix $X$ ($n$ rows, $d$ columns, mean-centered):

- **Covariance** $C = X^T X / (n - 1)$.
- **Principal components** = eigenvectors of $C$.
- **Equivalent**: take SVD $X = U \Sigma V^T$. Then columns of $V$
  are principal components, $\sigma_i^2 / (n - 1)$ are eigenvalues
  of $C$.

PCA *is* SVD on the data matrix. Implementing PCA via SVD is more
numerically stable than computing $X^T X$ explicitly (Lesson 00
warning about $\kappa(A^T A) = \kappa(A)^2$).

## Worked example: image compression

A grayscale image is a matrix. Take SVD; keep top-$k$ singular
values:

- $k = 5$: blocky, recognisable.
- $k = 50$: pretty good.
- $k = 200$: hard to tell from original.

Compression ratio: $(m + n + 1) k / (mn)$ — for a $1000 \times 1000$
image and $k = 50$, ~10% the storage.

## Interactive

:::widget type=numeric-input prompt="SVD: $A = U \\Sigma V^T$. Diagonal entries of $\\Sigma$: singular values, sorted $?$." answer=0 explain="Decreasing. Type 0 to indicate.":::

:::widget type=numeric-input prompt="Rank of $A$ = number of non-zero singular values. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Eckart-Young: best rank-$k$ approximation = top-$k$ truncated SVD. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PCA principal components are right singular vectors of mean-centered data matrix. Type 1." answer=1 explain="Yes.":::

## Symbolic

**SVD computation**: standard algorithms (Golub-Kahan-Reinsch) compute
full SVD in $O(m n \min(m, n))$. For rank-$k$ approximation:

- **Truncated SVD via Lanczos** on $A^T A$: $O(k m n)$.
- **Randomised SVD** (Halko, Martinsson, Tropp): $O((m + n) k \log k)$
  for rank-$k$. Used at scale on streaming data.

**Streaming PCA**: maintain top-$k$ approximation as new data
arrives. Algorithms: Oja's rule, Power method on streaming
covariance.

## Computational

```python
import numpy as np
from numpy.linalg import svd

# SVD
A = np.random.randn(8, 5)
U, s, Vt = svd(A)
print(s)                                  # singular values, sorted

# Reconstruct
A_back = U[:, :5] @ np.diag(s) @ Vt
print(np.allclose(A, A_back))             # True

# Rank-2 approximation
k = 2
A_k = U[:, :k] @ np.diag(s[:k]) @ Vt[:k, :]
print(np.linalg.norm(A - A_k, 'fro'))     # = sqrt(sum s[k:]^2)
print(np.sqrt(np.sum(s[k:]**2)))

# PCA via SVD
X = np.random.randn(100, 10)
X -= X.mean(axis=0)
U, s, Vt = svd(X, full_matrices=False)
# Principal components are columns of V (rows of Vt)
print(Vt.shape)                           # (10, 10) — 10 PCs
# Variances explained: s^2 / (n - 1)
print(s**2 / (100 - 1))                   # eigenvalues of cov

# Image compression demo (synthetic)
img = np.random.randn(64, 64)
U, s, Vt = svd(img, full_matrices=False)
for k in [1, 5, 20, 64]:
    approx = U[:, :k] @ np.diag(s[:k]) @ Vt[:k, :]
    err = np.linalg.norm(img - approx, 'fro')
    print(f"k={k}: rel_err = {err / np.linalg.norm(img):.4f}")
```

## Applied

- **Recommender systems** — Netflix, Spotify, YouTube use SVD-style
  matrix completion. Funk-SVD for the Netflix prize.
- **NLP embeddings** — Latent Semantic Analysis (LSA) is SVD on
  term-document matrices. Word2vec is closer to truncated factorisation
  of a shifted PMI matrix.
- **Image / video compression** — JPEG-2000 uses similar low-rank +
  wavelet ideas; deep generative models like VAEs use SVD-flavored
  latents.
- **Genomics — PCA on SNP matrices** to study population structure.
- **Signal processing — DMD** (Dynamic Mode Decomposition)
  decomposes time-evolving systems via SVD on snapshot matrices.

## Check Your Understanding

:::widget type=numeric-input prompt="SVD exists for every (real or complex) matrix. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Best rank-$k$ approximation in Frobenius norm: top-$k$ truncated SVD. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PCA = SVD on mean-centered data matrix. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Randomised SVD finds rank-$k$ in $O((m+n) k \\log k)$. Type 1." answer=1 explain="Yes.":::
