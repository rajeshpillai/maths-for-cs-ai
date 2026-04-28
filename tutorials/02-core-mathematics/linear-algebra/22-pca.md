# PCA — Principal Component Analysis from SVD

## Intuition

You have data with 100 features, but most of the "interesting variation"
lives in just 3–5 directions.  PCA finds those directions — the axes along
which the data varies the most.  It's dimensionality reduction: throw away
the noise, keep the signal.

## Prerequisites

- Tier 2, Lesson 21: SVD

## From First Principles

### The goal

Given data matrix $\mathbf{X}$ ($n$ samples × $d$ features), find $k < d$
directions that capture the most variance.

### Step-by-step derivation (pen & paper walkthrough)

**Sample data:** 4 points in 2D

| Point | $x_1$ | $x_2$ |
|-------|--------|--------|
| A | 2 | 1 |
| B | 4 | 3 |
| C | 6 | 5 |
| D | 8 | 7 |

**Step 1: Centre the data** (subtract mean)

Mean: $\bar{x}_1 = 5, \bar{x}_2 = 4$

| Point | $x_1 - \bar{x}_1$ | $x_2 - \bar{x}_2$ |
|-------|-----|-----|
| A | -3 | -3 |
| B | -1 | -1 |
| C | 1 | 1 |
| D | 3 | 3 |

**Step 2: Compute covariance matrix**

$$\mathbf{C} = \frac{1}{n-1}\mathbf{X}_c^T\mathbf{X}_c$$

$$\mathbf{X}_c = \begin{pmatrix} -3 & -3 \\ -1 & -1 \\ 1 & 1 \\ 3 & 3 \end{pmatrix}$$

$$\mathbf{X}_c^T\mathbf{X}_c = \begin{pmatrix} 20 & 20 \\ 20 & 20 \end{pmatrix}$$

$$\mathbf{C} = \frac{1}{3}\begin{pmatrix} 20 & 20 \\ 20 & 20 \end{pmatrix} = \begin{pmatrix} 6.67 & 6.67 \\ 6.67 & 6.67 \end{pmatrix}$$

**Step 3: Find eigenvalues/eigenvectors of $\mathbf{C}$**

$\det\begin{pmatrix} 6.67 - \lambda & 6.67 \\ 6.67 & 6.67 - \lambda \end{pmatrix} = 0$

$(6.67 - \lambda)^2 - 6.67^2 = 0$

$\lambda(\lambda - 13.33) = 0$

$\lambda_1 = 13.33$, $\lambda_2 = 0$

For $\lambda_1 = 13.33$: $\mathbf{v}_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$

**Interpretation:** All the variance lies along the direction $(1, 1)$ — the data
is perfectly on a line!  $\lambda_2 = 0$ means zero variance in the perpendicular
direction.

**Step 4: Project onto principal components**

$$\text{PC}_1 = \mathbf{X}_c \mathbf{v}_1 = \begin{pmatrix} -3 \\ -1 \\ 1 \\ 3 \end{pmatrix} \times \frac{1}{\sqrt{2}} + \begin{pmatrix} -3 \\ -1 \\ 1 \\ 3 \end{pmatrix} \times \frac{1}{\sqrt{2}}$$

### Variance explained

$$\text{Variance explained by PC}_i = \frac{\lambda_i}{\sum_j \lambda_j}$$

In our example: PC1 captures $13.33 / 13.33 = 100\%$ of the variance.

### Worked example 2: Non-trivial data (both eigenvalues nonzero)

**Sample data:** 4 points in 2D with variance in two directions

| Point | $x_1$ | $x_2$ |
|-------|--------|--------|
| A | 2 | 3 |
| B | 4 | 5 |
| C | 6 | 4 |
| D | 8 | 8 |

**Step 1: Centre the data**

Mean: $\bar{x}_1 = (2+4+6+8)/4 = 5$, $\bar{x}_2 = (3+5+4+8)/4 = 5$

| Point | $x_1 - 5$ | $x_2 - 5$ |
|-------|-----|-----|
| A | -3 | -2 |
| B | -1 | 0 |
| C | 1 | -1 |
| D | 3 | 3 |

**Step 2: Covariance matrix**

$$\mathbf{X}_c = \begin{pmatrix} -3 & -2 \\ -1 & 0 \\ 1 & -1 \\ 3 & 3 \end{pmatrix}$$

$$\mathbf{X}_c^T\mathbf{X}_c = \begin{pmatrix} (-3)^2+(-1)^2+1^2+3^2 & (-3)(-2)+(-1)(0)+(1)(-1)+(3)(3) \\ \text{same} & (-2)^2+0^2+(-1)^2+3^2 \end{pmatrix} = \begin{pmatrix} 20 & 14 \\ 14 & 14 \end{pmatrix}$$

$$\mathbf{C} = \frac{1}{3}\begin{pmatrix} 20 & 14 \\ 14 & 14 \end{pmatrix} = \begin{pmatrix} 6.67 & 4.67 \\ 4.67 & 4.67 \end{pmatrix}$$

**Step 3: Eigenvalues**

$\det\begin{pmatrix} 6.67 - \lambda & 4.67 \\ 4.67 & 4.67 - \lambda \end{pmatrix} = 0$

$(6.67 - \lambda)(4.67 - \lambda) - 4.67^2 = 0$

$\lambda^2 - 11.33\lambda + (31.11 - 21.78) = 0$

$\lambda^2 - 11.33\lambda + 9.33 = 0$

$\lambda = \frac{11.33 \pm \sqrt{128.37 - 37.33}}{2} = \frac{11.33 \pm \sqrt{91.04}}{2} = \frac{11.33 \pm 9.54}{2}$

$\lambda_1 \approx 10.44$, $\lambda_2 \approx 0.89$

**Both eigenvalues are nonzero** — the data has variance in two directions (it does not lie on a perfect line).

**Step 4: Variance explained**

PC1: $10.44 / (10.44 + 0.89) = 10.44 / 11.33 \approx 92.1\%$

PC2: $0.89 / 11.33 \approx 7.9\%$

**Interpretation:** PC1 captures 92% of the variance. If we reduce to 1D, we lose only 8% of the information. Unlike Example 1 (perfectly collinear data), here we genuinely have some spread in the second direction — so the "explained variance" metric becomes meaningful for deciding how many components to keep.

### PCA via SVD (the practical method)

Instead of computing the covariance matrix, use SVD directly on $\mathbf{X}_c$:

$$\mathbf{X}_c = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$$

- Columns of $\mathbf{V}$ = principal components (eigenvectors of $\mathbf{C}$)
- $\sigma_i^2 / (n-1)$ = eigenvalues of $\mathbf{C}$ (variance along each PC)

This is numerically more stable and how `sklearn.PCA` works internally.

### Choosing $k$

Common rules:
- Keep enough PCs to explain 95% of variance
- Look for an "elbow" in the scree plot (singular values vs index)

## Python Verification

```python
# ── PCA: verifying pen & paper work ─────────────────────────
import numpy as np

# Our data
X = np.array([[2, 1], [4, 3], [6, 5], [8, 7]], dtype=float)

# Step 1: Centre
mean = X.mean(axis=0)
X_c = X - mean
print("=== Step 1: Centre ===")
print(f"Mean: {mean}")
print(f"Centred:\n{X_c}")

# Step 2: Covariance matrix
C = (X_c.T @ X_c) / (len(X) - 1)
print(f"\n=== Step 2: Covariance ===")
print(f"C =\n{np.round(C, 2)}")

# Step 3: Eigendecomposition
eigenvalues, eigenvectors = np.linalg.eigh(C)
# Sort descending
idx = eigenvalues.argsort()[::-1]
eigenvalues = eigenvalues[idx]
eigenvectors = eigenvectors[:, idx]

print(f"\n=== Step 3: Eigenvalues ===")
print(f"λ = {np.round(eigenvalues, 4)}")
print(f"Eigenvectors:\n{np.round(eigenvectors, 4)}")

# Variance explained
var_explained = eigenvalues / eigenvalues.sum()
print(f"\n=== Variance explained ===")
for i, (ev, ve) in enumerate(zip(eigenvalues, var_explained)):
    print(f"PC{i+1}: λ={ev:.4f}, variance explained={ve:.2%}")

# Step 4: Project
projected = X_c @ eigenvectors[:, 0:1]
print(f"\n=== Projection onto PC1 ===")
print(f"Projected data:\n{np.round(projected, 4)}")

# PCA via SVD
print(f"\n=== PCA via SVD ===")
U, sigma, VT = np.linalg.svd(X_c, full_matrices=False)
print(f"Singular values: {np.round(sigma, 4)}")
print(f"σ²/(n-1) = {np.round(sigma**2 / (len(X)-1), 4)} (should match eigenvalues)")
print(f"V (from SVD):\n{np.round(VT.T, 4)}")
```

## Visualisation — PCA finding the directions of greatest variance

PCA is *the* go-to tool for "high-dim data → low-dim summary". The
plot below makes it visible: a cloud of correlated 2-D points, the
two principal-component axes (the eigenvectors of the covariance
matrix), and the data projected onto only the dominant component.

```python
# ── Visualising PCA ─────────────────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Generate a correlated 2-D dataset by taking a circular cloud and
# stretching it along a tilted axis. The "true" principal direction is
# along [1, 0.7] (roughly 35° from horizontal).
N = 300
raw = rng.standard_normal((N, 2))               # circular cloud
stretch = np.diag([3.0, 0.7])                   # stretch x by 3, y by 0.7
theta = np.radians(35)
R = np.array([[np.cos(theta), -np.sin(theta)],
              [np.sin(theta),  np.cos(theta)]])
data = raw @ stretch @ R.T + np.array([2.0, 1.0])

# Centre the data — PCA assumes zero mean.
mean = data.mean(axis=0)
X_c = data - mean

# Covariance matrix and its eigendecomposition.
cov = (X_c.T @ X_c) / (N - 1)
eigvals, eigvecs = np.linalg.eigh(cov)
order = np.argsort(-eigvals)
eigvals = eigvals[order]; eigvecs = eigvecs[:, order]
explained = eigvals / eigvals.sum()

# Project onto PC1 and onto both PCs.
proj_pc1 = X_c @ eigvecs[:, 0]               # 1-D scores along PC1
proj_full = X_c @ eigvecs                    # 2-D scores in the PC basis

fig, axes = plt.subplots(1, 3, figsize=(16, 5.3))

# (1) Original cloud + the two principal-component arrows centred at the mean.
# Arrow length is √λᵢ — i.e. one standard deviation along that PC direction.
ax = axes[0]
ax.scatter(data[:, 0], data[:, 1], alpha=0.45, s=14, color="tab:blue", label="data")
for i, color in [(0, "tab:red"), (1, "tab:orange")]:
    direction = eigvecs[:, i]
    length    = np.sqrt(eigvals[i])
    ax.annotate("", xy=mean + direction * length * 2,
                xytext=mean,
                arrowprops=dict(arrowstyle="->", color=color, lw=2.5))
    ax.text(*(mean + direction * length * 2.2),
            f"PC{i+1}\nexplains {explained[i]*100:.1f}%",
            color=color, fontsize=11, fontweight="bold")
ax.scatter(*mean, color="black", s=80, zorder=5, label="data mean")
ax.set_title("Original 2-D data with PC axes\n(arrows = √λ in each direction)")
ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_aspect("equal")
ax.grid(True, alpha=0.3); ax.legend(loc="upper left", fontsize=9)

# (2) Reconstruction using ONLY PC1: every point gets snapped onto the
# PC1 line. This is the "compress to 1-D, then expand back" trick.
ax = axes[1]
recon = mean + np.outer(proj_pc1, eigvecs[:, 0])
ax.scatter(data[:, 0], data[:, 1], alpha=0.30, s=14, color="tab:blue", label="original")
ax.scatter(recon[:, 0], recon[:, 1], alpha=0.7, s=14, color="tab:red", label="rank-1 PCA reconstruction")
for orig, r in zip(data, recon):
    ax.plot([orig[0], r[0]], [orig[1], r[1]], color="grey", lw=0.4, alpha=0.5)
ax.set_title("Project to 1-D along PC1 and reconstruct\n(grey = projection error)")
ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_aspect("equal")
ax.grid(True, alpha=0.3); ax.legend(loc="upper left", fontsize=9)

# (3) Scree plot: explained variance per PC. Most real datasets show
# this characteristic L-shape: the first few PCs carry almost all the
# variance, the rest are noise.
ax = axes[2]
ax.bar(range(1, 3), explained * 100, color=["tab:red", "tab:orange"],
       edgecolor="black", alpha=0.85)
for i, e in enumerate(explained):
    ax.text(i + 1, e * 100 + 1, f"{e*100:.1f}%", ha="center", fontsize=11,
            fontweight="bold")
ax.set_xticks([1, 2]); ax.set_xticklabels(["PC1", "PC2"])
ax.set_ylabel("variance explained (%)")
ax.set_ylim(0, 100)
ax.set_title("Scree plot: each PC's share of variance\n(real datasets concentrate it heavily in PC1–PC3)")
ax.grid(True, alpha=0.3, axis="y")

plt.tight_layout()
plt.show()

# Print the numbers behind the picture.
print(f"Data shape: {data.shape}")
print(f"Mean:                  {mean}")
print(f"Eigenvalues (ranked):  {eigvals}")
print(f"PC directions:")
for i in range(2):
    print(f"  PC{i+1}: {eigvecs[:, i]}   variance = {eigvals[i]:.4f}   "
          f"({explained[i]*100:.2f}% of total)")
print(f"\nRank-1 reconstruction error (per point): "
      f"{np.linalg.norm(data - (mean + np.outer(proj_pc1, eigvecs[:, 0])), axis=1).mean():.4f}")
```

**Three PCA truths the picture pins down:**

- **PCA finds the directions of largest variance.** PC1 is the long
  arrow — the direction along which the data spreads out most. PC2 is
  perpendicular to PC1 (always — eigenvectors of a symmetric matrix
  are orthogonal) and captures whatever variance remains.
- **You compress by keeping only the top PCs.** The middle plot
  collapses the data onto PC1, throwing away PC2. The grey lines are
  the reconstruction errors — they're shorter than they would be in any
  *other* 1-D projection. That's the **optimality of PCA**: among all
  rank-$k$ approximations, PCA minimises mean-squared reconstruction
  error.
- **The scree plot tells you how many PCs to keep.** When the first few
  bars dwarf the rest (the canonical "elbow"), you can cut down to a
  handful of dimensions and lose almost nothing. In a 1024-pixel
  face image, the first ~50 PCs ("eigenfaces") carry essentially all
  the identity information.

PCA is what you reach for whenever you want to *see* a high-dimensional
dataset, decorrelate features before regression, denoise, or build the
"latent factors" view of a recommendation matrix. It is just SVD with
a `mean = data.mean()` line in front.

## Connection to CS / Games / AI / Business / Industry

- **Dimensionality reduction** — reduce 1000 features to 50 while keeping 95% of information
- **Face recognition** — "eigenfaces" are the principal components of face images
- **Noise removal** — low-rank reconstruction via PCA discards noisy dimensions
- **Visualisation** — project high-dimensional data to 2D/3D for plotting
- **Feature engineering** — PCA components as new features for ML models

## Check Your Understanding

1. **Pen & paper:** Given centred data $\begin{pmatrix} 2 & 0 \\ -1 & 1 \\ -1 & -1 \end{pmatrix}$, compute the covariance matrix.
2. **Pen & paper:** If the eigenvalues of a covariance matrix are $[4, 1, 0.1]$, how much variance does the first PC capture?
3. **Think about it:** Why must data be centred before PCA?  What goes wrong if you don't?
