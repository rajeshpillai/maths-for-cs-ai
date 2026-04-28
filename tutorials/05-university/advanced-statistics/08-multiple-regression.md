# Multiple Regression

## Intuition

A single predictor rarely tells the whole story. Player engagement might
depend on session length *and* number of friends *and* device type.
Multiple regression extends OLS to many predictors simultaneously, fitting
a hyperplane instead of a line. The matrix formula is identical:
$\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$
— only $\mathbf{X}$ now has more columns.

## Prerequisites

- Tier 14, Lesson 7 (Linear Regression via Matrices)
- Tier 2 (Linear Algebra — matrix operations)

## From First Principles

### The Model

$$y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_p x_p + \epsilon$$

In matrix form with $n$ observations and $p$ predictors:

$$\mathbf{X} = \begin{pmatrix}1 & x_{11} & x_{12} & \cdots & x_{1p} \\
1 & x_{21} & x_{22} & \cdots & x_{2p} \\
\vdots & & & & \vdots \\
1 & x_{n1} & x_{n2} & \cdots & x_{np}\end{pmatrix}$$

The solution is the same: $\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$.

### R-Squared

$$R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}}
= 1 - \frac{\sum(y_i - \hat{y}_i)^2}{\sum(y_i - \bar{y})^2}$$

$R^2$ measures the fraction of variance explained. But adding *any*
predictor (even random noise) can only increase $R^2$.

### Adjusted R-Squared

Penalises for adding useless predictors:

$$R^2_{\text{adj}} = 1 - \frac{(1 - R^2)(n - 1)}{n - p - 1}$$

If a new predictor does not improve the model enough, $R^2_{\text{adj}}$
decreases.

### Pen & Paper Example

Data with 2 predictors ($x_1$, $x_2$) and 4 observations:

| $x_1$ | $x_2$ | $y$ |
|--------|--------|-----|
| 1      | 2      | 5   |
| 2      | 1      | 7   |
| 3      | 3      | 10  |
| 4      | 2      | 12  |

$$\mathbf{X} = \begin{pmatrix}1&1&2\\1&2&1\\1&3&3\\1&4&2\end{pmatrix}, \quad
\mathbf{y} = \begin{pmatrix}5\\7\\10\\12\end{pmatrix}$$

Computing $\mathbf{X}^T\mathbf{X}$, $\mathbf{X}^T\mathbf{y}$, and inverting
is tedious by hand for $3 \times 3$, so we verify in Python below. The
key insight: each $\beta_j$ measures the effect of $x_j$ *holding all
other predictors constant*.

### Multicollinearity

When predictors are highly correlated, $\mathbf{X}^T\mathbf{X}$ is
nearly singular. This inflates variance of $\hat{\boldsymbol{\beta}}$.

**Variance Inflation Factor (VIF):**
$$\text{VIF}_j = \frac{1}{1 - R_j^2}$$
where $R_j^2$ is the $R^2$ from regressing $x_j$ on all other predictors.
VIF > 10 signals a problem.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

np.random.seed(42)
n = 50
x1 = np.random.uniform(0, 10, n)
x2 = np.random.uniform(0, 10, n)
y = 2 + 1.5 * x1 + 0.8 * x2 + np.random.normal(0, 2, n)

# Fit regression
X = np.column_stack([np.ones(n), x1, x2])
beta = np.linalg.inv(X.T @ X) @ X.T @ y

# Create mesh for regression plane
x1_grid, x2_grid = np.meshgrid(np.linspace(0, 10, 20), np.linspace(0, 10, 20))
y_grid = beta[0] + beta[1] * x1_grid + beta[2] * x2_grid

fig = plt.figure(figsize=(10, 7))
ax = fig.add_subplot(111, projection='3d')
ax.scatter(x1, x2, y, c='steelblue', s=30, label='Data')
ax.plot_surface(x1_grid, x2_grid, y_grid, alpha=0.3, color='salmon')
ax.set_xlabel('$x_1$')
ax.set_ylabel('$x_2$')
ax.set_zlabel('$y$')
ax.set_title(f'Multiple Regression Plane: y = {beta[0]:.2f} + {beta[1]:.2f}$x_1$ + {beta[2]:.2f}$x_2$')
plt.tight_layout()
plt.savefig('multiple_regression_plane.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# Step 1: Data
x1 = np.array([1, 2, 3, 4], dtype=float)
x2 = np.array([2, 1, 3, 2], dtype=float)
y  = np.array([5, 7, 10, 12], dtype=float)

# Step 2: Design matrix
X = np.column_stack([np.ones_like(x1), x1, x2])
print("X =")
print(X)

# Step 3: OLS
beta = np.linalg.inv(X.T @ X) @ X.T @ y
print(f"\nbeta = {beta}")
print(f"y = {beta[0]:.3f} + {beta[1]:.3f}*x1 + {beta[2]:.3f}*x2")

# Step 4: Predictions and R-squared
y_hat = X @ beta
SS_res = np.sum((y - y_hat)**2)
SS_tot = np.sum((y - np.mean(y))**2)
R2 = 1 - SS_res / SS_tot
n, p = X.shape[0], X.shape[1] - 1  # p = number of predictors
R2_adj = 1 - (1 - R2) * (n - 1) / (n - p - 1)

print(f"\nPredictions: {y_hat}")
print(f"R-squared = {R2:.4f}")
print(f"Adjusted R-squared = {R2_adj:.4f}")

# Step 5: Multicollinearity check (VIF)
print("\n--- VIF Calculation ---")
for j in range(1, X.shape[1]):
    others = np.delete(X, j, axis=1)
    beta_j = np.linalg.lstsq(others, X[:, j], rcond=None)[0]
    pred_j = others @ beta_j
    ss_res_j = np.sum((X[:, j] - pred_j)**2)
    ss_tot_j = np.sum((X[:, j] - np.mean(X[:, j]))**2)
    R2_j = 1 - ss_res_j / ss_tot_j if ss_tot_j > 0 else 0
    vif = 1 / (1 - R2_j) if R2_j < 1 else float('inf')
    print(f"  VIF(x{j}) = {vif:.3f}")

# Step 6: Verify with numpy lstsq
beta_np, _, _, _ = np.linalg.lstsq(X, y, rcond=None)
print(f"\nnumpy lstsq: {beta_np}")
```

## Connection to CS / Games / AI / Business / Industry

- **Feature Engineering:** Multiple regression is the foundation for
  understanding how multiple features contribute to predictions in ML.
- **Game Analytics:** Predicting player churn from multiple behavioural
  features (playtime, purchases, social interactions).
- **Performance Modelling:** Predicting server load from request rate,
  payload size, and concurrent users.
- **Regularisation:** When multicollinearity is severe, Ridge regression
  ($L_2$) and Lasso ($L_1$) add penalty terms — these are the foundations
  of modern ML regularisation.
- **Hedonic pricing at the Bureau of Labor Statistics:** the U.S. CPI
  uses multiple regression to adjust prices for quality changes
  (laptop CPU + RAM + SSD) so that a faster laptop at the same price
  registers as a price *decrease* in inflation statistics.
- **Wage-discrimination litigation:** EEOC and DOL Office of Federal
  Contract Compliance use multiple regression of wage on
  experience + education + tenure + protected-class indicator; the
  $\hat\beta$ on the indicator is admissible court evidence (e.g. the
  Goldman Sachs class-action settlement).
- **Pharmacokinetics at Pfizer / Merck:** drug clearance is regressed on
  age + weight + creatinine + CYP450 genotype; resulting $\hat\beta$
  determine FDA-labeled dosing adjustments printed on every prescription
  insert.
- **Environmental-impact regression at the EPA:** Clean Air Act
  attainment uses multiple regression on PM2.5 ~ traffic + industrial
  emissions + meteorology to attribute pollution sources; same approach
  underlies the IPCC's "fingerprinting" of anthropogenic warming.

## Check Your Understanding

1. If you add a third predictor $x_3$ that is exactly $x_3 = 2x_1 + x_2$,
   what happens to $\mathbf{X}^T\mathbf{X}$? Why?

2. Compute $R^2$ and $R^2_{\text{adj}}$ for the pen-and-paper example.
   Then add a random noise column and show that $R^2$ increases but
   $R^2_{\text{adj}}$ may decrease.

3. Why is interpreting $\beta_j$ as "the effect of $x_j$" only valid
   when other predictors are held constant? Give an example where this
   matters.
