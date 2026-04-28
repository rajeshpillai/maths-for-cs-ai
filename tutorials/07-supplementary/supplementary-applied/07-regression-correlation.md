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

## Visualisation — Least squares fits a line by minimising squared errors

The single most-used statistical procedure in the world: fit a straight
line $y = \beta_0 + \beta_1 x$ to data by minimising the sum of squared
vertical errors. The plot shows the fitted line, the residual segments,
and the **R²** statistic that tells you how much variance the line
explains.

```python
# ── Visualising linear regression and R² ────────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
N = 30
x = rng.uniform(0, 10, N)
y_true = 1.5 + 0.7 * x
y      = y_true + 1.2 * rng.standard_normal(N)              # add noise

# Closed-form least-squares: β = (XᵀX)⁻¹ Xᵀy.
X = np.column_stack([np.ones(N), x])
beta = np.linalg.solve(X.T @ X, X.T @ y)
beta0, beta1 = beta
y_hat = X @ beta

# R² = 1 - SS_residual / SS_total.
ss_res = np.sum((y - y_hat) ** 2)
ss_tot = np.sum((y - y.mean()) ** 2)
r2 = 1 - ss_res / ss_tot

fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

# (1) Scatter + fitted line + residual segments.
ax = axes[0]
ax.scatter(x, y, color="tab:blue", s=50, label="data")
xs = np.linspace(0, 10, 100)
ax.plot(xs, beta0 + beta1 * xs, color="tab:red", lw=2,
        label=f"fit: y = {beta0:.2f} + {beta1:.3f}x")
# Residual segments (one per data point) so the picture *shows* what
# least squares minimises.
for xi, yi, yhi in zip(x, y, y_hat):
    ax.plot([xi, xi], [yi, yhi], color="grey", lw=0.7, alpha=0.7)
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_title("Least-squares regression\n(grey segments = residuals minimised by the fit)")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) R²: variance explained vs total.  Two bars: SS_total and SS_res.
ax = axes[1]
explained = ss_tot - ss_res
ax.bar(["SS total\n(no model)", "SS residual\n(after fit)",
        "SS explained"],
       [ss_tot, ss_res, explained],
       color=["tab:blue", "tab:red", "tab:green"], alpha=0.7,
       edgecolor="black")
for i, v in enumerate([ss_tot, ss_res, explained]):
    ax.text(i, v + max([ss_tot, explained]) * 0.02, f"{v:.1f}",
            ha="center", fontsize=11, fontweight="bold")
ax.set_ylabel("sum of squared deviations")
ax.set_title(f"R² = 1 − SS_res / SS_tot\n= 1 − {ss_res:.2f}/{ss_tot:.2f} = {r2:.4f}")
ax.grid(True, alpha=0.3, axis="y")

plt.tight_layout()
plt.show()

# Print the fitted parameters and Pearson correlation r (= √R² with sign of slope).
r = np.corrcoef(x, y)[0, 1]
print(f"Fitted line: y = {beta0:.4f} + {beta1:.4f} · x")
print(f"True line:   y = 1.5000 + 0.7000 · x")
print(f"\nR² = {r2:.4f}  (fraction of y-variance explained by the fit)")
print(f"Pearson r = {r:+.4f}  (note: r² = R² for simple linear regression)")
```

**Three concepts that connect through this plot:**

- **Least squares minimises the sum of *squared* residuals.** Squaring
  punishes outliers more than absolute error would (an L2 vs L1 loss
  trade-off — see lessons in linear-algebra and optimisation).
- **R² = (variance explained) / (total variance).** R² = 0 → fit is
  no better than the mean; R² = 1 → fit is perfect. *Beware* high R²
  on noisy small data — overfitting and selection bias inflate it.
- **Linear regression IS a tiny neural network.** A network with one
  linear layer and MSE loss, trained to convergence, exactly
  reproduces the closed-form least-squares fit. Logistic regression
  is the same thing with a sigmoid output and cross-entropy loss.

## Connection to CS / Games / AI / Business / Industry

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
