# Regression and Correlation — R² Derivation

## Intuition

**Regression** finds the best-fit line through data.  **R²** tells you how
much of the variation in $y$ is explained by $x$.  $R^2 = 0.95$ means 95%
of the variation is captured by the model.  This is the foundation of all
predictive modelling, from simple line fitting to neural networks.

## Prerequisites

- Tier 4, Lesson 10: Covariance and Correlation
- Tier 3, Lesson 2: Derivatives (minimisation)

## From First Principles

### The problem

Data: $(x_1, y_1), \ldots, (x_n, y_n)$.  Find $\hat{y} = mx + c$ that
minimises total squared error.

### Derive the normal equations

Minimise $L = \sum_{i=1}^{n}(y_i - mx_i - c)^2$

$$\frac{\partial L}{\partial c} = -2\sum(y_i - mx_i - c) = 0 \implies c = \bar{y} - m\bar{x}$$

$$\frac{\partial L}{\partial m} = -2\sum x_i(y_i - mx_i - c) = 0$$

Substitute $c$: $m = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sum(x_i - \bar{x})^2} = \frac{S_{xy}}{S_{xx}}$

### Pen & paper: Fit a line

Data: $(1, 2), (2, 4), (3, 5), (4, 4), (5, 5)$

$\bar{x} = 3, \bar{y} = 4$

$S_{xx} = (1-3)^2 + (2-3)^2 + 0 + 1 + 4 = 10$

$S_{xy} = (1-3)(2-4) + (2-3)(4-4) + 0 + (4-3)(4-4) + (5-3)(5-4) = 4 + 0 + 0 + 0 + 2 = 6$

$m = 6/10 = 0.6$

$c = 4 - 0.6(3) = 2.2$

Line: $\hat{y} = 0.6x + 2.2$

### R² (coefficient of determination)

$$R^2 = 1 - \frac{SS_{\text{res}}}{SS_{\text{tot}}}$$

$SS_{\text{tot}} = \sum(y_i - \bar{y})^2$ — total variance

$SS_{\text{res}} = \sum(y_i - \hat{y}_i)^2$ — unexplained variance

### Pen & paper: Compute R²

Predictions: $\hat{y} = [2.8, 3.4, 4.0, 4.6, 5.2]$

$SS_{\text{tot}} = 4 + 0 + 1 + 0 + 1 = 6$

$SS_{\text{res}} = (2-2.8)^2 + (4-3.4)^2 + (5-4)^2 + (4-4.6)^2 + (5-5.2)^2$

$= 0.64 + 0.36 + 1 + 0.36 + 0.04 = 2.4$

$R^2 = 1 - 2.4/6 = 1 - 0.4 = 0.6$

60% of variance explained — moderate fit.

### Connection to correlation

$$R^2 = r^2$$

where $r$ is Pearson's correlation coefficient.  $r = \sqrt{0.6} \approx 0.775$.

### Multiple regression (brief)

With $p$ features: $\hat{y} = \mathbf{X}\boldsymbol{\beta}$

Normal equations: $\boldsymbol{\beta} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$

This is the **closed-form solution** for linear regression — no gradient descent needed!

## Python Verification

```python
# ── Regression & R² ─────────────────────────────────────────

# Data
x = [1, 2, 3, 4, 5]
y = [2, 4, 5, 4, 5]
n = len(x)

# Means
x_bar = sum(x) / n
y_bar = sum(y) / n
print(f"=== Linear regression ===")
print(f"x̄ = {x_bar}, ȳ = {y_bar}")

# Slope and intercept
Sxx = sum((xi - x_bar)**2 for xi in x)
Sxy = sum((xi - x_bar)*(yi - y_bar) for xi, yi in zip(x, y))
m = Sxy / Sxx
c = y_bar - m * x_bar
print(f"Sxx = {Sxx}, Sxy = {Sxy}")
print(f"m = {m:.2f}, c = {c:.2f}")
print(f"Line: ŷ = {m:.1f}x + {c:.1f}")

# Predictions and R²
y_hat = [m * xi + c for xi in x]
SS_tot = sum((yi - y_bar)**2 for yi in y)
SS_res = sum((yi - yhi)**2 for yi, yhi in zip(y, y_hat))
R2 = 1 - SS_res / SS_tot

print(f"\n=== R² ===")
print(f"Predictions: {[f'{yh:.1f}' for yh in y_hat]}")
print(f"SS_tot = {SS_tot:.2f}")
print(f"SS_res = {SS_res:.2f}")
print(f"R² = {R2:.4f}")

# Correlation
import math
Syy = sum((yi - y_bar)**2 for yi in y)
r = Sxy / math.sqrt(Sxx * Syy)
print(f"r = {r:.4f}")
print(f"r² = {r**2:.4f} (should equal R²)")

# Residuals
print(f"\n=== Residuals ===")
for xi, yi, yhi in zip(x, y, y_hat):
    residual = yi - yhi
    print(f"  x={xi}: y={yi}, ŷ={yhi:.1f}, residual={residual:+.1f}")

# Multiple regression (normal equations)
print(f"\n=== Normal equations: β = (X^T X)^{-1} X^T y ===")
# Add intercept column
X = [[1, xi] for xi in x]
# X^T X
XTX = [[sum(X[i][j]*X[i][k] for i in range(n)) for k in range(2)] for j in range(2)]
# X^T y
XTy = [sum(X[i][j]*y[i] for i in range(n)) for j in range(2)]
# Solve 2x2 system
det = XTX[0][0]*XTX[1][1] - XTX[0][1]*XTX[1][0]
beta0 = (XTX[1][1]*XTy[0] - XTX[0][1]*XTy[1]) / det
beta1 = (XTX[0][0]*XTy[1] - XTX[1][0]*XTy[0]) / det
print(f"β₀ (intercept) = {beta0:.2f}, β₁ (slope) = {beta1:.2f}")
```

## Connection to CS / Games / AI

- **Linear regression** — the simplest ML model, baseline for everything
- **Normal equations** — closed-form solution using linear algebra
- **R²** — standard metric for regression model quality
- **Feature importance** — partial R² shows contribution of each feature
- **Polynomial regression** — use $x, x^2, x^3$ as features (still "linear" in parameters)
- **Ridge/Lasso** — add regularisation to prevent overfitting (Tier 5-01)

## Check Your Understanding

1. **Pen & paper:** Fit a line to $(1,1), (2,3), (3,2), (4,5)$.  Find $m$, $c$, and $R^2$.
2. **Pen & paper:** If $R^2 = 0.81$, what is the correlation $r$?  (Careful with the sign — when is $r$ negative?)
3. **Pen & paper:** Show that $\sum(y_i - \hat{y}_i) = 0$ (residuals sum to zero) for the least-squares line.
