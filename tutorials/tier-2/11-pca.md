# PCA — Principal Component Analysis from SVD

## Intuition

You have data with 100 features, but most of the "interesting variation"
lives in just 3–5 directions.  PCA finds those directions — the axes along
which the data varies the most.  It's dimensionality reduction: throw away
the noise, keep the signal.

## Prerequisites

- Tier 2, Lesson 10: SVD

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

## Connection to CS / Games / AI

- **Dimensionality reduction** — reduce 1000 features to 50 while keeping 95% of information
- **Face recognition** — "eigenfaces" are the principal components of face images
- **Noise removal** — low-rank reconstruction via PCA discards noisy dimensions
- **Visualisation** — project high-dimensional data to 2D/3D for plotting
- **Feature engineering** — PCA components as new features for ML models

## Check Your Understanding

1. **Pen & paper:** Given centred data $\begin{pmatrix} 2 & 0 \\ -1 & 1 \\ -1 & -1 \end{pmatrix}$, compute the covariance matrix.
2. **Pen & paper:** If the eigenvalues of a covariance matrix are $[4, 1, 0.1]$, how much variance does the first PC capture?
3. **Think about it:** Why must data be centred before PCA?  What goes wrong if you don't?
