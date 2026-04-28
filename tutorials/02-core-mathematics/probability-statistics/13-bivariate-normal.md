# Bivariate Normal Distribution

## Intuition

The bivariate normal is the two-dimensional bell curve.  Imagine a hill of sand
on a table: viewed from above the contour lines are ellipses.  If the two
variables are uncorrelated the ellipses align with the axes; as correlation
increases the ellipses tilt.  This distribution appears whenever two quantities
are jointly influenced by many small, additive effects — heights and weights of
people, returns of two correlated stocks, or two channels in a sensor reading.

## Prerequisites

- Tier 4, Lesson 6: Continuous Distributions (Gaussian)
- Tier 4, Lesson 10: Covariance and Correlation
- Tier 4, Lesson 11: Joint Distributions (joint PDF, marginals)
- Tier 2, Lesson 7: Determinants (for the matrix in the exponent)

## From First Principles

### The PDF

For random vector $\mathbf{X} = (X, Y)^T$ with means $\mu_X, \mu_Y$,
standard deviations $\sigma_X, \sigma_Y$, and correlation $\rho$:

$$f(x, y) = \frac{1}{2\pi\sigma_X\sigma_Y\sqrt{1-\rho^2}} \exp\left(-\frac{Q}{2(1-\rho^2)}\right)$$

where the **quadratic form** is:

$$Q = \frac{(x-\mu_X)^2}{\sigma_X^2} - \frac{2\rho(x-\mu_X)(y-\mu_Y)}{\sigma_X\sigma_Y} + \frac{(y-\mu_Y)^2}{\sigma_Y^2}$$

### Matrix form

Define $\boldsymbol{\mu} = \begin{pmatrix}\mu_X \\ \mu_Y\end{pmatrix}$ and
covariance matrix $\boldsymbol{\Sigma} = \begin{pmatrix}\sigma_X^2 & \rho\sigma_X\sigma_Y \\ \rho\sigma_X\sigma_Y & \sigma_Y^2\end{pmatrix}$.

Then:

$$f(\mathbf{x}) = \frac{1}{2\pi|\boldsymbol{\Sigma}|^{1/2}} \exp\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^T\boldsymbol{\Sigma}^{-1}(\mathbf{x}-\boldsymbol{\mu})\right)$$

where $|\boldsymbol{\Sigma}| = \sigma_X^2\sigma_Y^2(1-\rho^2)$.

### Pen & paper: Specific example

Let $\mu_X = 0$, $\mu_Y = 0$, $\sigma_X = 1$, $\sigma_Y = 1$, $\rho = 0.5$.

$$\boldsymbol{\Sigma} = \begin{pmatrix} 1 & 0.5 \\ 0.5 & 1 \end{pmatrix}$$

$|\boldsymbol{\Sigma}| = 1 - 0.25 = 0.75$

$$\boldsymbol{\Sigma}^{-1} = \frac{1}{0.75}\begin{pmatrix} 1 & -0.5 \\ -0.5 & 1 \end{pmatrix} = \begin{pmatrix} 4/3 & -2/3 \\ -2/3 & 4/3 \end{pmatrix}$$

Evaluate at $(x, y) = (1, 1)$:

$$Q = \frac{1}{1-0.25}\left(\frac{1}{1} - \frac{2(0.5)(1)(1)}{1} + \frac{1}{1}\right) = \frac{1}{0.75}(1 - 1 + 1) = \frac{1}{0.75} = \frac{4}{3}$$

$$f(1, 1) = \frac{1}{2\pi\sqrt{0.75}}\exp\left(-\frac{4/3}{2}\right) = \frac{1}{2\pi(0.866)}\exp(-0.667)$$

$$= \frac{1}{5.441} \times 0.513 = 0.0943$$

### Marginal distributions are normal

A key property: if $(X, Y)$ is bivariate normal, then:

$$X \sim \mathcal{N}(\mu_X, \sigma_X^2) \qquad Y \sim \mathcal{N}(\mu_Y, \sigma_Y^2)$$

The marginals are simply the individual normals — the correlation only affects
the *joint* behaviour, not the individual distributions.

**Pen & paper verification:** Integrate out $y$:

$$f_X(x) = \int_{-\infty}^{\infty} f(x, y)\,dy = \frac{1}{\sigma_X\sqrt{2\pi}}\exp\left(-\frac{(x-\mu_X)^2}{2\sigma_X^2}\right)$$

This is exactly $\mathcal{N}(\mu_X, \sigma_X^2)$.

### Conditional distributions are normal

Given $Y = y$, the conditional distribution of $X$ is:

$$X \mid Y = y \sim \mathcal{N}\left(\mu_X + \rho\frac{\sigma_X}{\sigma_Y}(y - \mu_Y),\;\; \sigma_X^2(1 - \rho^2)\right)$$

**Pen & paper:** With $\mu_X=\mu_Y=0$, $\sigma_X=\sigma_Y=1$, $\rho=0.5$:

$X \mid Y=2 \sim \mathcal{N}(0 + 0.5 \times 1 \times 2,\; 1 - 0.25) = \mathcal{N}(1, 0.75)$

Knowing $Y=2$ shifts the expected value of $X$ from 0 to 1 and reduces its variance.

### Contour ellipses

The level curves $f(x,y) = c$ are ellipses.  The equation $Q = k$ (for
constant $k$) defines an ellipse whose:
- **Axes** are aligned with the eigenvectors of $\boldsymbol{\Sigma}$
- **Axis lengths** are proportional to $\sqrt{\lambda_i}$ (square roots of eigenvalues)
- **Tilt angle** is determined by $\rho$: when $\rho = 0$, axes are horizontal/vertical

**Pen & paper:** For $\boldsymbol{\Sigma} = \begin{pmatrix}1 & 0.5\\0.5 & 1\end{pmatrix}$:

Eigenvalues: $\lambda^2 - 2\lambda + 0.75 = 0 \Rightarrow \lambda = 1.5$ or $0.5$.

Eigenvector for $\lambda=1.5$: $(1, 1)^T / \sqrt{2}$ — the 45-degree direction.

The contour ellipses are tilted 45 degrees, stretched along the $(1,1)$ direction.

### Uncorrelated does not always mean independent — except for the bivariate normal

For **general** distributions, $\rho = 0$ does NOT imply independence.
But for the **bivariate normal**, $\rho = 0$ DOES imply independence.
This is a special and important property.

## Visualisation

The contour plot shows ellipses at probability levels.  With $\rho = 0$ the
ellipses are axis-aligned circles (when $\sigma_X = \sigma_Y$).  As $|\rho|$
increases, they stretch into tilted ellipses.  At $\rho = \pm 1$ the ellipse
collapses to a line (perfect linear relationship).

## Python Verification

```python
# ── Bivariate Normal: verifying pen & paper work ──────────────
import math
import random

# PDF evaluation at (1, 1) with rho=0.5
print("=== Bivariate Normal PDF at (1,1) ===")
mu_x, mu_y = 0, 0
sigma_x, sigma_y = 1, 1
rho = 0.5

x, y = 1, 1
Q = (1/(1-rho**2)) * ((x-mu_x)**2/sigma_x**2
    - 2*rho*(x-mu_x)*(y-mu_y)/(sigma_x*sigma_y)
    + (y-mu_y)**2/sigma_y**2)
det_sigma = sigma_x**2 * sigma_y**2 * (1 - rho**2)
f_xy = (1 / (2 * math.pi * math.sqrt(det_sigma))) * math.exp(-Q/2)
print(f"Q = {Q:.4f} (expected 4/3 = {4/3:.4f})")
print(f"f(1,1) = {f_xy:.4f} (expected ~0.0943)")

# Conditional distribution: X | Y=2
print(f"\n=== Conditional: X | Y=2, rho=0.5 ===")
y_given = 2
cond_mean = mu_x + rho * (sigma_x/sigma_y) * (y_given - mu_y)
cond_var = sigma_x**2 * (1 - rho**2)
print(f"E[X|Y=2] = {cond_mean:.4f} (expected 1.0)")
print(f"Var(X|Y=2) = {cond_var:.4f} (expected 0.75)")

# Simulate bivariate normal and verify
print(f"\n=== Simulation: marginals and conditional ===")
random.seed(42)
N = 100000
x_samples = []
y_samples = []
for _ in range(N):
    z1 = random.gauss(0, 1)
    z2 = random.gauss(0, 1)
    # Generate correlated normals: X = Z1, Y = rho*Z1 + sqrt(1-rho^2)*Z2
    x_val = mu_x + sigma_x * z1
    y_val = mu_y + sigma_y * (rho * z1 + math.sqrt(1 - rho**2) * z2)
    x_samples.append(x_val)
    y_samples.append(y_val)

# Check marginals
mean_x = sum(x_samples) / N
mean_y = sum(y_samples) / N
var_x = sum((x - mean_x)**2 for x in x_samples) / N
var_y = sum((y - mean_y)**2 for y in y_samples) / N
print(f"Marginal X: mean={mean_x:.3f}, var={var_x:.3f} (expected 0, 1)")
print(f"Marginal Y: mean={mean_y:.3f}, var={var_y:.3f} (expected 0, 1)")

# Check correlation
cov_xy = sum((x_samples[i]-mean_x)*(y_samples[i]-mean_y) for i in range(N)) / N
r = cov_xy / (math.sqrt(var_x) * math.sqrt(var_y))
print(f"Correlation: {r:.3f} (expected {rho})")

# Conditional mean: E[X | 1.9 < Y < 2.1]
cond_x = [x_samples[i] for i in range(N) if 1.9 < y_samples[i] < 2.1]
if cond_x:
    cond_mean_sim = sum(cond_x) / len(cond_x)
    print(f"E[X | Y~2] simulated: {cond_mean_sim:.3f} (expected 1.0)")

# Eigenvalues of covariance matrix
print(f"\n=== Contour ellipse eigenvalues ===")
trace = 2.0  # sigma_x^2 + sigma_y^2
det = 1 - rho**2  # 0.75
disc = trace**2 - 4*det
lam1 = (trace + math.sqrt(disc)) / 2
lam2 = (trace - math.sqrt(disc)) / 2
print(f"lambda_1 = {lam1:.4f} (expected 1.5)")
print(f"lambda_2 = {lam2:.4f} (expected 0.5)")
print(f"Eigenvector for lam_1: (1, 1)/sqrt(2) -- 45-degree tilt")
```

## Visualisation — The bivariate Gaussian "hill" and its contours

A 2-D Gaussian is a smooth *hill* in 3-D space: tallest at the mean,
falling off in every direction. Its level sets — the curves where the
density equals a constant — are **ellipses**. The shape and orientation
of those ellipses tell you the variances and the correlation directly.

```python
# ── Visualising the bivariate normal ────────────────────────
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401  (registers 3-D projection)

# Three correlation values, same marginals, same mean. ρ controls
# the *tilt* and the *eccentricity* of the contour ellipses.
specs = [(-0.7, "ρ = -0.7"),
         ( 0.0, "ρ =  0.0"),
         ( 0.7, "ρ = +0.7")]

mu = np.array([0.0, 0.0])
sigma_x = sigma_y = 1.0

# Grid of (x, y) where we evaluate the joint density.
grid = np.linspace(-3, 3, 200)
X, Y = np.meshgrid(grid, grid)
points = np.dstack([X, Y])

def bivariate_pdf(points, mu, sigma_x, sigma_y, rho):
    """Closed-form density of a 2-D Gaussian (no scipy)."""
    dx = points[..., 0] - mu[0]
    dy = points[..., 1] - mu[1]
    z  = (dx / sigma_x) ** 2 - 2 * rho * (dx * dy) / (sigma_x * sigma_y) \
       + (dy / sigma_y) ** 2
    norm = 1.0 / (2 * np.pi * sigma_x * sigma_y * np.sqrt(1 - rho * rho))
    return norm * np.exp(-z / (2 * (1 - rho * rho)))

fig = plt.figure(figsize=(15, 9))

# Top row: 2-D contour plots overlaid with samples.
# Bottom row: 3-D surface views of the same density.
rng = np.random.default_rng(0)
for col, (rho, label) in enumerate(specs):
    pdf = bivariate_pdf(points, mu, sigma_x, sigma_y, rho)

    # 2-D contour + scatter
    ax = fig.add_subplot(2, 3, col + 1)
    cs = ax.contour(X, Y, pdf, levels=8, cmap="viridis")
    cov = np.array([[sigma_x ** 2,  rho * sigma_x * sigma_y],
                    [rho * sigma_x * sigma_y,  sigma_y ** 2]])
    samples = rng.multivariate_normal(mu, cov, size=300)
    ax.scatter(samples[:, 0], samples[:, 1], alpha=0.30, s=10, color="tab:red")
    ax.axhline(0, color="grey", lw=0.5); ax.axvline(0, color="grey", lw=0.5)
    ax.set_xlim(-3, 3); ax.set_ylim(-3, 3); ax.set_aspect("equal")
    ax.set_title(f"{label}\ncontours + 300 samples")
    ax.set_xlabel("X"); ax.set_ylabel("Y")

    # 3-D surface
    ax3 = fig.add_subplot(2, 3, col + 4, projection="3d")
    ax3.plot_surface(X, Y, pdf, cmap="viridis", alpha=0.85,
                     linewidth=0, antialiased=True)
    ax3.set_title(f"{label}\nthe density 'hill'")
    ax3.set_xlabel("X"); ax3.set_ylabel("Y"); ax3.set_zlabel("f(x, y)")

plt.tight_layout()
plt.show()

# Print eigenvalues — the squared lengths of the contour ellipse's
# semi-axes. PCA's "principal components" are exactly these eigenvectors.
print("Contour ellipse axis lengths come from the covariance eigenvalues:")
print(f"{'ρ':>5}  {'cov matrix':>30}  {'λ₁':>8}  {'λ₂':>8}  axis tilt")
for rho, label in specs:
    cov = np.array([[1.0, rho], [rho, 1.0]])
    eigvals, eigvecs = np.linalg.eigh(cov)
    lam2, lam1 = eigvals                     # smaller, larger
    angle = np.degrees(np.arctan2(eigvecs[1, 1], eigvecs[0, 1]))
    print(f"  {rho:+.1f}   [[1, {rho}], [{rho}, 1]]      "
          f"  {lam1:.3f}   {lam2:.3f}   {angle:+.1f}°")
```

**What to read off the picture:**

- **Zero correlation** ($\rho = 0$, middle column): contours are
  *circles*, the hill is rotationally symmetric. Knowing $X$ tells you
  nothing about $Y$.
- **Positive correlation** ($\rho = +0.7$, right column): contours are
  *tilted ellipses* leaning along the line $y = x$. High $X$ tends to
  come with high $Y$. Samples cluster along a diagonal cloud.
- **Negative correlation** ($\rho = -0.7$, left column): the same
  ellipses, *flipped* — they lean along $y = -x$. High $X$ comes with
  low $Y$.
- **Eigenvalues of the covariance matrix = squared semi-axis lengths.**
  When $\rho = 0$ both eigenvalues are 1 — circle. As $|\rho|$ grows,
  one eigenvalue grows while the other shrinks — the ellipse stretches
  in one direction and squeezes in the other. This is *exactly* what
  PCA does on real data: it finds the eigenvectors of the empirical
  covariance and treats the longest-axis direction as the most
  informative dimension.

## Connection to CS / Games / AI

- **Gaussian Mixture Models (GMMs)** — each cluster is a multivariate normal; the bivariate case is the simplest non-trivial example
- **Kalman filters** — state estimation uses multivariate normals; the bivariate case arises in 2D tracking (position/velocity)
- **PCA** — principal components are eigenvectors of the covariance matrix, which for bivariate normal data gives the ellipse axes
- **Variational autoencoders (VAEs)** — the latent space is often modelled as multivariate normal
- **Gaussian processes** — defined by mean and covariance; the bivariate case is the building block

## Check Your Understanding

1. **Pen & paper:** For a bivariate normal with $\mu_X=5$, $\mu_Y=10$, $\sigma_X=2$, $\sigma_Y=3$, $\rho=0.6$, write out the covariance matrix $\boldsymbol{\Sigma}$ and compute its determinant.
2. **Pen & paper:** Using the parameters above, find the conditional distribution $Y \mid X = 7$.
3. **Pen & paper:** If $\rho = 0$ and $\sigma_X = \sigma_Y$, what shape are the contour ellipses?  Why does $\rho = 0$ imply independence for the bivariate normal but not in general?
4. **Think about it:** Why does conditioning on $Y=y$ *reduce* the variance of $X$?  What happens to the conditional variance as $|\rho| \to 1$?
