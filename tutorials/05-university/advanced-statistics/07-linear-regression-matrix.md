# Linear Regression via Matrices (OLS)

## Intuition

You have data points and want to fit a straight line (or hyperplane) that
best predicts the output. "Best" means minimising the sum of squared
residuals. Linear algebra gives us a clean, closed-form solution:
$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$.
This is just the projection of $\mathbf{y}$ onto the column space of
$\mathbf{X}$ — the same projection concept from Tier 2.

## Prerequisites

- Tier 2, Lesson 18 (Matrix Inverses and Least Squares)
- Tier 14, Lesson 1 (Estimation Theory)
- Tier 3 (Calculus — partial derivatives)

## From First Principles

### Setup

We model $y = \beta_0 + \beta_1 x + \epsilon$. For $n$ data points,
stack into matrices:

$$\mathbf{y} = \begin{pmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{pmatrix}, \quad
\mathbf{X} = \begin{pmatrix} 1 & x_1 \\ 1 & x_2 \\ \vdots & \vdots \\ 1 & x_n \end{pmatrix}, \quad
\boldsymbol{\beta} = \begin{pmatrix} \beta_0 \\ \beta_1 \end{pmatrix}$$

The model is $\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$.

### Deriving OLS

Minimise the sum of squared residuals:

$$\text{RSS} = \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|^2
= (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})$$

Expand:
$$= \mathbf{y}^T\mathbf{y} - 2\boldsymbol{\beta}^T\mathbf{X}^T\mathbf{y}
+ \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}$$

Take the gradient with respect to $\boldsymbol{\beta}$ and set to zero:

$$\frac{\partial \text{RSS}}{\partial \boldsymbol{\beta}}
= -2\mathbf{X}^T\mathbf{y} + 2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = 0$$

$$\mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = \mathbf{X}^T\mathbf{y}$$

$$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$$

These are the **normal equations**.

### Pen & Paper Example

Data: $(1, 2), (2, 4), (3, 5), (4, 4)$.

$$\mathbf{X} = \begin{pmatrix}1&1\\1&2\\1&3\\1&4\end{pmatrix}, \quad
\mathbf{y} = \begin{pmatrix}2\\4\\5\\4\end{pmatrix}$$

$$\mathbf{X}^T\mathbf{X} = \begin{pmatrix}4&10\\10&30\end{pmatrix}, \quad
\mathbf{X}^T\mathbf{y} = \begin{pmatrix}15\\39\end{pmatrix}$$

$$(\mathbf{X}^T\mathbf{X})^{-1} = \frac{1}{4\cdot30-10\cdot10}\begin{pmatrix}30&-10\\-10&4\end{pmatrix}
= \frac{1}{20}\begin{pmatrix}30&-10\\-10&4\end{pmatrix}
= \begin{pmatrix}1.5&-0.5\\-0.5&0.2\end{pmatrix}$$

$$\hat{\boldsymbol{\beta}} = \begin{pmatrix}1.5&-0.5\\-0.5&0.2\end{pmatrix}
\begin{pmatrix}15\\39\end{pmatrix}
= \begin{pmatrix}1.5\cdot15 - 0.5\cdot39\\-0.5\cdot15 + 0.2\cdot39\end{pmatrix}
= \begin{pmatrix}3.0\\0.8\end{pmatrix}$$

So $\hat{y} = 3.0 + 0.8x$ — the best-fit line, but really just a
projection and a matrix inverse.

### Geometric Interpretation

$\hat{\mathbf{y}} = \mathbf{X}\hat{\boldsymbol{\beta}}$ is the projection
of $\mathbf{y}$ onto the column space of $\mathbf{X}$. The residual vector
$\mathbf{e} = \mathbf{y} - \hat{\mathbf{y}}$ is orthogonal to every column
of $\mathbf{X}$, which is exactly what $\mathbf{X}^T\mathbf{e} = 0$ says.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

x_data = np.array([1, 2, 3, 4])
y_data = np.array([2, 4, 5, 4])

# Build design matrix
X = np.column_stack([np.ones(len(x_data)), x_data])
beta = np.linalg.inv(X.T @ X) @ X.T @ y_data

# Predictions and residuals
y_hat = X @ beta
residuals = y_data - y_hat

fig, ax = plt.subplots(figsize=(8, 5))
x_line = np.linspace(0.5, 4.5, 100)
y_line = beta[0] + beta[1] * x_line

ax.scatter(x_data, y_data, s=80, zorder=5, color='steelblue', label='Data')
ax.plot(x_line, y_line, 'r-', lw=2, label=f'OLS: y = {beta[0]:.1f} + {beta[1]:.1f}x')

# Draw residuals
for xi, yi, yhi in zip(x_data, y_data, y_hat):
    ax.plot([xi, xi], [yi, yhi], 'g--', lw=1.5)
ax.scatter(x_data, y_hat, s=50, marker='x', color='red', zorder=5, label='Predicted')

ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Linear Regression with Residuals')
ax.legend()
plt.tight_layout()
plt.savefig('ols_regression_residuals.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# Step 1: Data
x = np.array([1, 2, 3, 4], dtype=float)
y = np.array([2, 4, 5, 4], dtype=float)

# Step 2: Build design matrix
X = np.column_stack([np.ones_like(x), x])
print("X =")
print(X)

# Step 3: Normal equations by hand
XTX = X.T @ X
XTy = X.T @ y
print(f"\nX^T X =\n{XTX}")
print(f"X^T y = {XTy}")

# Step 4: Solve
beta = np.linalg.inv(XTX) @ XTy
print(f"\nbeta = {beta}")
print(f"Regression: y = {beta[0]:.2f} + {beta[1]:.2f} * x")

# Step 5: Residuals and R-squared
y_hat = X @ beta
residuals = y - y_hat
SS_res = np.sum(residuals**2)
SS_tot = np.sum((y - np.mean(y))**2)
R2 = 1 - SS_res / SS_tot
print(f"\nResiduals: {residuals}")
print(f"SS_res = {SS_res:.4f}, SS_tot = {SS_tot:.4f}")
print(f"R-squared = {R2:.4f}")

# Step 6: Verify orthogonality of residuals to column space
print(f"\nX^T e = {X.T @ residuals}")  # should be ~zero

# Step 7: Verify with numpy lstsq
beta_np, _, _, _ = np.linalg.lstsq(X, y, rcond=None)
print(f"numpy lstsq beta = {beta_np}")
```

## Connection to CS / Games / AI / Business / Industry

- **Machine Learning:** Linear regression is the starting point for
  understanding all supervised learning. Gradient descent generalises
  what the normal equations do in closed form.
- **Computer Graphics:** Least-squares fitting is used for surface
  reconstruction and mesh simplification.
- **Game Analytics:** Predicting player lifetime value from early
  engagement metrics.
- **Projection Connection:** The hat matrix $\mathbf{H} = \mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$
  projects $\mathbf{y}$ onto the column space of $\mathbf{X}$ — the same
  projection from linear algebra (Tier 2).
- **Quant equity research at AQR / BlackRock:** Fama-French 3- and 5-factor
  models are linear regressions of stock returns on market, size, value,
  profitability, and investment factors; OLS $\hat\beta$ values are
  reported in every CFA exam and SEC fund prospectus.
- **Real-estate AVMs at Zillow / Redfin / CoreLogic:** Zillow's Zestimate
  began as a hedonic OLS on square-footage, beds, baths, and ZIP-code
  fixed effects; the normal equations literally compute house values for
  ~100M U.S. homes.
- **Calibration in metrology (NIST):** instrument calibration curves
  (e.g. mass spectrometers, gas chromatographs) are fitted with weighted
  least squares; ISO 17025 lab-accreditation requires reporting OLS
  uncertainty intervals on $\hat\beta$.
- **Climate science at NOAA / NASA GISS:** global temperature trends
  ($\hat\beta$ on time) come from OLS on station data; the IPCC's
  reported "1.1 degC since pre-industrial" is a regression slope with
  Newey-West heteroskedasticity-robust standard errors.

## Check Your Understanding

1. Add a fifth data point $(5, 7)$ and recompute $\hat{\boldsymbol{\beta}}$
   by hand using the normal equations.

2. Show algebraically that $\mathbf{X}^T(\mathbf{y} - \mathbf{X}\hat{\boldsymbol{\beta}}) = 0$
   (residuals are orthogonal to the columns of $\mathbf{X}$).

3. What happens if $\mathbf{X}^T\mathbf{X}$ is singular? When would this
   occur, and what does it mean geometrically?
