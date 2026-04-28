# SVD — Singular Value Decomposition

## Intuition

Any matrix — even non-square ones — can be broken into three simple steps:
**rotate → stretch → rotate**.  That's the SVD.  It's the Swiss Army knife
of linear algebra: image compression, noise removal, recommendation systems,
and the mathematical foundation of PCA all use SVD.

## Prerequisites

- Tier 2, Lesson 13: Eigenvalues & Eigenvectors

## From First Principles

### The decomposition

Every $m \times n$ matrix $\mathbf{A}$ can be written as:

$$\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$$

| Matrix | Shape | What it is |
|--------|-------|-----------|
| $\mathbf{U}$ | $m \times m$ | Left singular vectors (orthogonal) — rotation in output space |
| $\mathbf{\Sigma}$ | $m \times n$ | Diagonal with singular values $\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$ — stretching |
| $\mathbf{V}^T$ | $n \times n$ | Right singular vectors (orthogonal) — rotation in input space |

### How to compute SVD by hand (2×2)

$$\mathbf{A} = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}$$

This is already diagonal, so SVD is trivial:

$\mathbf{U} = \mathbf{I}$, $\mathbf{\Sigma} = \begin{pmatrix} 3 & 0 \\ 0 & 2 \end{pmatrix}$, $\mathbf{V}^T = \mathbf{I}$

Singular values: $\sigma_1 = 3, \sigma_2 = 2$.

### General 2×2 (pen & paper)

$$\mathbf{A} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$$

**Step 1:** Compute $\mathbf{A}^T\mathbf{A}$:

$$\mathbf{A}^T\mathbf{A} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix} = \begin{pmatrix} 5 & 4 \\ 4 & 5 \end{pmatrix}$$

**Step 2:** Find eigenvalues of $\mathbf{A}^T\mathbf{A}$:

$\det\begin{pmatrix} 5-\lambda & 4 \\ 4 & 5-\lambda \end{pmatrix} = (5-\lambda)^2 - 16 = 0$

$\lambda^2 - 10\lambda + 9 = 0$ → $\lambda_1 = 9, \lambda_2 = 1$

**Singular values:** $\sigma_1 = \sqrt{9} = 3$, $\sigma_2 = \sqrt{1} = 1$

**Step 3:** Eigenvectors of $\mathbf{A}^T\mathbf{A}$ give $\mathbf{V}$:

For $\lambda = 9$: $(5-9)v_1 + 4v_2 = 0$ → $v_2 = v_1$ → $\mathbf{v}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$

For $\lambda = 1$: $(5-1)v_1 + 4v_2 = 0$ → $v_2 = -v_1$ → $\mathbf{v}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$

**Step 4:** $\mathbf{u}_i = \frac{1}{\sigma_i}\mathbf{A}\mathbf{v}_i$:

$\mathbf{u}_1 = \frac{1}{3}\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{3\sqrt{2}}\begin{pmatrix} 3 \\ 3 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$

$\mathbf{u}_2 = \frac{1}{1}\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$

### Non-square matrix SVD (pen & paper, 3×2)

This is the primary use case — most real data matrices are not square.

$$\mathbf{A} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix}$$

**Step 1:** Compute $\mathbf{A}^T\mathbf{A}$ (2×2):

$$\mathbf{A}^T\mathbf{A} = \begin{pmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix} = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$$

**Step 2:** Eigenvalues of $\mathbf{A}^T\mathbf{A}$:

$\det\begin{pmatrix} 2-\lambda & 1 \\ 1 & 2-\lambda \end{pmatrix} = (2-\lambda)^2 - 1 = 0$

$\lambda^2 - 4\lambda + 3 = 0$ → $\lambda_1 = 3$, $\lambda_2 = 1$

**Singular values:** $\sigma_1 = \sqrt{3}$, $\sigma_2 = \sqrt{1} = 1$

**Step 3:** Eigenvectors of $\mathbf{A}^T\mathbf{A}$ give $\mathbf{V}$ (2×2):

For $\lambda = 3$: $(2-3)v_1 + v_2 = 0$ → $v_2 = v_1$ → $\mathbf{v}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$

For $\lambda = 1$: $(2-1)v_1 + v_2 = 0$ → $v_2 = -v_1$ → $\mathbf{v}_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$

**Step 4:** $\mathbf{\Sigma}$ is 3×2 (same shape as $\mathbf{A}$):

$$\mathbf{\Sigma} = \begin{pmatrix} \sqrt{3} & 0 \\ 0 & 1 \\ 0 & 0 \end{pmatrix}$$

**Step 5:** Compute $\mathbf{U}$ columns from $\mathbf{u}_i = \frac{1}{\sigma_i}\mathbf{A}\mathbf{v}_i$:

$\mathbf{u}_1 = \frac{1}{\sqrt{3}}\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt{6}}\begin{pmatrix} 1 \\ 1 \\ 2 \end{pmatrix}$

$\mathbf{u}_2 = \frac{1}{1}\begin{pmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{pmatrix}\frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \\ 0 \end{pmatrix}$

For the full $\mathbf{U}$ (3×3), we need a third column $\mathbf{u}_3$ orthogonal to both.
Using Gram–Schmidt or inspection: $\mathbf{u}_3 = \frac{1}{\sqrt{3}}\begin{pmatrix} -1 \\ -1 \\ 1 \end{pmatrix}$

**Verify:** $\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$ should recover $\mathbf{A}$. The third column of $\mathbf{U}$ is multiplied by the zero row of $\mathbf{\Sigma}$, so it doesn't contribute — which brings us to economy SVD.

### Economy SVD vs full SVD

| | Full SVD | Economy (thin) SVD |
|-|----------|-------------------|
| $\mathbf{U}$ | $m \times m$ | $m \times r$ |
| $\mathbf{\Sigma}$ | $m \times n$ (padded with zeros) | $r \times r$ |
| $\mathbf{V}^T$ | $n \times n$ | $r \times n$ |

Here $r = \min(m, n)$ (or the rank, if truncated).

For our 3×2 example, the economy SVD is:

$\mathbf{U}_{\text{thin}} = \begin{pmatrix} 1/\sqrt{6} & 1/\sqrt{2} \\ 1/\sqrt{6} & -1/\sqrt{2} \\ 2/\sqrt{6} & 0 \end{pmatrix}$, $\mathbf{\Sigma}_{\text{thin}} = \begin{pmatrix} \sqrt{3} & 0 \\ 0 & 1 \end{pmatrix}$, $\mathbf{V}^T$ stays 2×2.

This is what NumPy's `np.linalg.svd(A, full_matrices=False)` returns.
The economy form saves storage: for a 1000×50 matrix, $\mathbf{U}$ is 1000×50 instead of 1000×1000.

### Low-rank approximation

Keep only the top $k$ singular values:

$$\mathbf{A}_k = \sum_{i=1}^{k} \sigma_i \mathbf{u}_i \mathbf{v}_i^T$$

This is the **best rank-$k$ approximation** of $\mathbf{A}$ (in Frobenius norm).

> This is how image compression works: a 1000×1000 image matrix might be well-approximated using only 50 singular values, compressing it 20×.

### Relationship to eigendecomposition

- Singular values of $\mathbf{A}$ = square roots of eigenvalues of $\mathbf{A}^T\mathbf{A}$
- For symmetric positive definite $\mathbf{A}$: SVD = eigendecomposition

## Python Verification

```python
# ── SVD: verifying pen & paper work ─────────────────────────
import numpy as np

# Simple SVD
A = np.array([[2, 1], [1, 2]], dtype=float)
U, sigma, VT = np.linalg.svd(A)

print("=== SVD of [[2,1],[1,2]] ===")
print(f"U =\n{np.round(U, 4)}")
print(f"Singular values = {np.round(sigma, 4)}")
print(f"V^T =\n{np.round(VT, 4)}")

# Reconstruct
Sigma = np.diag(sigma)
A_reconstructed = U @ Sigma @ VT
print(f"\nU @ Σ @ V^T =\n{np.round(A_reconstructed, 10)}")
print(f"Matches A? {np.allclose(A, A_reconstructed)}")

# Verify singular values = sqrt(eigenvalues of A^T A)
print(f"\n=== Singular values from A^T A ===")
ATA = A.T @ A
evals = np.linalg.eigvalsh(ATA)
print(f"Eigenvalues of A^T A: {np.round(sorted(evals, reverse=True), 4)}")
print(f"Singular values: {np.round(sigma, 4)}")
print(f"sqrt(eigenvalues): {np.round(np.sqrt(sorted(evals, reverse=True)), 4)}")

# Low-rank approximation
print(f"\n=== Low-rank approximation (rank 1) ===")
A_rank1 = sigma[0] * np.outer(U[:, 0], VT[0, :])
print(f"Rank-1 approx:\n{np.round(A_rank1, 4)}")
error = np.linalg.norm(A - A_rank1, 'fro')
print(f"Frobenius error: {error:.4f} (= σ₂ = {sigma[1]:.4f})")

# Image compression demo (conceptual)
print(f"\n=== Compression ratio concept ===")
m, n = 100, 100
k = 10
original_storage = m * n
svd_storage = k * (m + n + 1)
print(f"Original: {m}×{n} = {original_storage} values")
print(f"Rank-{k} SVD: {k}×({m}+{n}+1) = {svd_storage} values")
print(f"Compression: {original_storage/svd_storage:.1f}×")
```

## Visualisation — SVD as low-rank image compression

The cleanest way to *see* why SVD matters: take an image, decompose
it, and rebuild it from only the largest few singular values. The
big-$\sigma$ rank-$k$ approximation is shockingly close to the
original — that's exactly what powers JPEG-style image compression
and Netflix-style matrix factorisation.

```python
# ── Visualising SVD via low-rank approximation ──────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Build a synthetic "image" that is intentionally low-rank-ish — a
# smooth pattern with a few sharp features, plus a tiny bit of noise.
# (Using a real photo would be ideal but Pyodide doesn't ship sample
# images by default.)
N = 100
x = np.linspace(-3, 3, N)
y = np.linspace(-3, 3, N)
X, Y = np.meshgrid(x, y)
img = (np.exp(-((X + 1)**2 + Y**2) / 1.5)         # bright blob bottom-left
       + 0.7 * np.exp(-((X - 1)**2 + (Y - 1)**2) / 0.6)   # blob top-right
       + 0.3 * np.sin(2 * X) * np.cos(Y))         # wave background
img += 0.02 * rng.standard_normal(img.shape)      # tiny noise

# Compute the SVD: A = U Σ Vᵀ.
U, S, Vt = np.linalg.svd(img, full_matrices=False)

# Choose four rank-k truncations and reconstruct each.
ranks = [1, 5, 20, len(S)]                        # last one = full rank (no loss)
fig, axes = plt.subplots(1, len(ranks) + 1, figsize=(20, 4.5))

# Original first, for reference.
axes[0].imshow(img, cmap="viridis", aspect="equal")
axes[0].set_title("Original (rank-100)\nfull image")
axes[0].axis("off")

for ax, k in zip(axes[1:], ranks):
    # Rank-k approximation: keep the top k singular values, drop the rest.
    Ak = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
    ax.imshow(Ak, cmap="viridis", aspect="equal", vmin=img.min(), vmax=img.max())
    err = np.linalg.norm(img - Ak, "fro") / np.linalg.norm(img, "fro")
    storage = k * (img.shape[0] + img.shape[1] + 1)
    full    = img.shape[0] * img.shape[1]
    ratio   = full / storage if storage else 1
    ax.set_title(f"Rank-{k}\n"
                 f"relative err = {err:.3f}\n"
                 f"storage saving = {ratio:.1f}×")
    ax.axis("off")

plt.tight_layout()
plt.show()

# Singular value spectrum: log scale so the rapid drop is visible.
fig, ax = plt.subplots(1, 1, figsize=(8, 4.5))
ax.plot(range(1, len(S) + 1), S, "o-", markersize=4, lw=1.2)
ax.set_yscale("log")
for k in ranks[:-1]:
    ax.axvline(k, color="red", linestyle="--", alpha=0.4)
    ax.text(k + 1, S[0], f"k = {k}", color="red", fontsize=9, va="top")
ax.set_xlabel("singular-value index i")
ax.set_ylabel("σᵢ (log scale)")
ax.set_title("Singular-value spectrum — most of the energy lives in the first few σᵢ")
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Energy retained as we increase the rank.
print(f"{'rank k':>7}  {'cum. energy':>12}  {'rel. error':>11}  storage")
for k in [1, 5, 10, 20, 50, len(S)]:
    energy = (S[:k]**2).sum() / (S**2).sum()
    Ak = U[:, :k] @ np.diag(S[:k]) @ Vt[:k, :]
    rel_err = np.linalg.norm(img - Ak, "fro") / np.linalg.norm(img, "fro")
    storage = k * (img.shape[0] + img.shape[1] + 1)
    print(f"  {k:>5}    {energy*100:>9.2f}%    {rel_err:>9.3f}     "
          f"{storage:>5} ints (vs {img.shape[0]*img.shape[1]} full)")
```

**The single most important fact about SVD:**

$$\mathbf{A} = \sum_{i=1}^{r} \sigma_i \,\mathbf{u}_i \mathbf{v}_i^{\top}$$

is a sum of **rank-1 building blocks**, ordered by importance. Keep
the top $k$ and you get the best possible rank-$k$ approximation of
$\mathbf{A}$ (the **Eckart–Young theorem**). Three direct consequences,
all visible in the plots:

- **Compression.** A 100×100 image needs 10,000 numbers; rank-20
  storage needs only $20 \times (100 + 100 + 1) = 4{,}020$ numbers — a
  2.5× saving with hardly any visible loss. JPEG, MP3, and modern
  weights-compression schemes all exploit the same drop in the
  singular-value spectrum.
- **Denoising.** Random noise shows up in *all* singular values
  evenly; the *signal* concentrates in the largest ones. Truncating to
  rank $k$ keeps signal and throws away noise.
- **Latent factors.** In a recommendation matrix, the top few
  singular vectors $\mathbf{u}_i$ and $\mathbf{v}_i$ are interpretable
  *taste dimensions* — "indie versus mainstream", "action versus
  drama". The Netflix prize was won this way.

## Connection to CS / Games / AI

- **Image compression** — keep top-$k$ singular values, discard the rest
- **Recommendation systems** — Netflix prize: SVD on the user-movie rating matrix
- **PCA** — derived from SVD of the data matrix (next lesson)
- **Latent Semantic Analysis** — NLP technique using SVD on term-document matrices
- **Pseudoinverse** — $\mathbf{A}^+ = \mathbf{V}\mathbf{\Sigma}^+\mathbf{U}^T$ (used in least squares)

## Check Your Understanding

1. **Pen & paper:** Find the singular values of $\begin{pmatrix} 3 & 0 \\ 0 & 0 \end{pmatrix}$.  What is the rank?
2. **Pen & paper:** If $\mathbf{A}$ is $5 \times 3$, what are the shapes of $\mathbf{U}$, $\mathbf{\Sigma}$, $\mathbf{V}^T$?
3. **Think about it:** Why is the rank-$k$ SVD the "best" low-rank approximation?  What does "best" mean here?
