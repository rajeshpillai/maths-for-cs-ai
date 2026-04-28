# Covariance and Correlation Matrices

## Intuition

**Covariance** tells you whether two variables tend to move together (positive),
move opposite (negative), or are unrelated (near zero).  The **correlation**
normalises this to $[-1, 1]$ so you can compare across different scales.
The **covariance matrix** packages all pairwise relationships into one matrix
— and it's the starting point for PCA.

## Prerequisites

- Tier 4, Lesson 4: Expectation and Variance
- Tier 2, Lesson 1: Matrices

## From First Principles

### Covariance

$$\text{Cov}(X, Y) = E[(X - \mu_X)(Y - \mu_Y)] = E[XY] - E[X]E[Y]$$

**Interpretation:**
- $\text{Cov} > 0$: $X$ and $Y$ increase together
- $\text{Cov} < 0$: when $X$ increases, $Y$ tends to decrease
- $\text{Cov} = 0$: no linear relationship (but could still be non-linearly related!)

**Note:** $\text{Cov}(X, X) = \text{Var}(X)$

### Pen & paper: Compute covariance

Data: $(x, y)$ = $(1, 2), (3, 4), (5, 8), (7, 10)$

$\bar{x} = (1+3+5+7)/4 = 4$, $\bar{y} = (2+4+8+10)/4 = 6$

| $x_i$ | $y_i$ | $x_i - \bar{x}$ | $y_i - \bar{y}$ | product |
|--------|--------|--------|--------|---------|
| 1 | 2 | -3 | -4 | 12 |
| 3 | 4 | -1 | -2 | 2 |
| 5 | 8 | 1 | 2 | 2 |
| 7 | 10 | 3 | 4 | 12 |

$$\text{Cov}(X, Y) = \frac{12 + 2 + 2 + 12}{4 - 1} = \frac{28}{3} \approx 9.33$$

(Dividing by $n-1 = 3$ for sample covariance.)

### Correlation coefficient (Pearson's $r$)

$$r = \frac{\text{Cov}(X, Y)}{\sigma_X \cdot \sigma_Y}$$

This normalises to $[-1, 1]$:
- $r = 1$: perfect positive linear relationship
- $r = -1$: perfect negative linear relationship
- $r = 0$: no linear relationship

**Pen & paper (continuing):**

$\text{Var}(X) = \frac{(-3)^2 + (-1)^2 + 1^2 + 3^2}{3} = \frac{20}{3}$, $\sigma_X = \sqrt{20/3} \approx 2.582$

$\text{Var}(Y) = \frac{16 + 4 + 4 + 16}{3} = \frac{40}{3}$, $\sigma_Y = \sqrt{40/3} \approx 3.651$

$$r = \frac{28/3}{\sqrt{20/3} \cdot \sqrt{40/3}} = \frac{28/3}{\sqrt{800/9}} = \frac{28/3}{28.28/3} \approx 0.99$$

Nearly perfect positive correlation — the data is almost perfectly linear.

### Covariance matrix

For a dataset with $d$ features, the covariance matrix $\mathbf{C}$ is $d \times d$:

$$C_{ij} = \text{Cov}(X_i, X_j)$$

Diagonal entries = variances, off-diagonal = covariances.

**Pen & paper:** For our data with features $X$ and $Y$:

$$\mathbf{C} = \begin{pmatrix} \text{Var}(X) & \text{Cov}(X,Y) \\ \text{Cov}(Y,X) & \text{Var}(Y) \end{pmatrix} = \begin{pmatrix} 6.67 & 9.33 \\ 9.33 & 13.33 \end{pmatrix}$$

### Properties

- **Symmetric:** $\mathbf{C} = \mathbf{C}^T$
- **Positive semi-definite:** all eigenvalues $\ge 0$
- **Diagonal entries:** variances (always $\ge 0$)
- If features are independent: covariance matrix is diagonal

### Correlation matrix

Normalise each entry: $R_{ij} = C_{ij} / (\sigma_i \sigma_j)$

Diagonal entries are all 1.

## Python Verification

```python
# ── Covariance & Correlation: verifying pen & paper work ────
import math

# Data
x = [1, 3, 5, 7]
y = [2, 4, 8, 10]
n = len(x)

# Means
x_bar = sum(x) / n
y_bar = sum(y) / n
print(f"=== Covariance ===")
print(f"x̄ = {x_bar}, ȳ = {y_bar}")

# Covariance (sample, n-1)
cov_xy = sum((xi - x_bar) * (yi - y_bar) for xi, yi in zip(x, y)) / (n - 1)
print(f"Cov(X,Y) = {cov_xy:.4f}")

# Variances
var_x = sum((xi - x_bar)**2 for xi in x) / (n - 1)
var_y = sum((yi - y_bar)**2 for yi in y) / (n - 1)
print(f"Var(X) = {var_x:.4f}, Var(Y) = {var_y:.4f}")

# Correlation
r = cov_xy / (math.sqrt(var_x) * math.sqrt(var_y))
print(f"\n=== Correlation ===")
print(f"r = {r:.4f}")

# Covariance matrix
print(f"\n=== Covariance matrix ===")
print(f"[[{var_x:.2f}, {cov_xy:.2f}],")
print(f" [{cov_xy:.2f}, {var_y:.2f}]]")

# Verify with numpy-style computation
print(f"\n=== Verify: matrix computation ===")
# Center the data
xc = [xi - x_bar for xi in x]
yc = [yi - y_bar for yi in y]
# X_c^T X_c / (n-1)
c11 = sum(a*a for a in xc) / (n-1)
c12 = sum(a*b for a, b in zip(xc, yc)) / (n-1)
c22 = sum(b*b for b in yc) / (n-1)
print(f"C = [[{c11:.2f}, {c12:.2f}], [{c12:.2f}, {c22:.2f}]]")

# Eigenvalues of covariance matrix (for PCA)
print(f"\n=== Eigenvalues (for PCA) ===")
# For 2x2: λ² - trace·λ + det = 0
trace = c11 + c22
det = c11 * c22 - c12 * c12
discriminant = trace**2 - 4*det
lambda1 = (trace + math.sqrt(discriminant)) / 2
lambda2 = (trace - math.sqrt(discriminant)) / 2
print(f"λ₁ = {lambda1:.4f}")
print(f"λ₂ = {lambda2:.4f}")
print(f"Variance explained by PC1: {lambda1/(lambda1+lambda2):.1%}")
```

## Visualisation — What different correlation values *look like*

Numbers like $\rho = 0.6$ are abstract; the same number as a *scatter
plot* tells you whether your data is "weakly" or "strongly" correlated
in a way you'll never forget.

```python
# ── Visualising correlation by scatter plot ─────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)
N = 250

def correlated_pair(rho, n=N):
    """Generate (x, y) with target correlation rho via a 2-D normal."""
    x = rng.standard_normal(n)
    z = rng.standard_normal(n)
    y = rho * x + np.sqrt(1 - rho * rho) * z       # exact relation for unit variances
    return x, y

# Six representative correlation values, including a non-linear pattern.
specs = [
    (-1.00, "Perfect negative\n($\\rho = -1$)",  "tab:red"),
    (-0.60, "Strong negative\n($\\rho = -0.6$)", "tab:red"),
    ( 0.00, "Uncorrelated\n($\\rho \\approx 0$)", "grey"),
    ( 0.60, "Strong positive\n($\\rho = +0.6$)",  "tab:blue"),
    ( 1.00, "Perfect positive\n($\\rho = +1$)",   "tab:blue"),
    ("nonlinear", "Strong relation but\n$\\rho \\approx 0$ — y = x²", "tab:purple"),
]

fig, axes = plt.subplots(2, 3, figsize=(14, 9))

for ax, (rho, label, color) in zip(axes.flatten(), specs):
    if rho == "nonlinear":
        x = rng.uniform(-2, 2, N)
        y = x ** 2 + 0.15 * rng.standard_normal(N)
    elif rho == 1.00:
        x = rng.standard_normal(N); y = x.copy()
    elif rho == -1.00:
        x = rng.standard_normal(N); y = -x.copy()
    else:
        x, y = correlated_pair(rho)
    rho_actual = np.corrcoef(x, y)[0, 1]

    ax.scatter(x, y, alpha=0.5, color=color, s=18)
    # Best-fit line for a visual reference (works even when rho ≈ 0).
    xs_line = np.array([x.min(), x.max()])
    slope, intercept = np.polyfit(x, y, 1)
    ax.plot(xs_line, slope * xs_line + intercept, color="black", lw=1.5, alpha=0.6)
    ax.set_title(f"{label}\n(measured ρ = {rho_actual:+.2f})")
    ax.axhline(0, color="grey", lw=0.5); ax.axvline(0, color="grey", lw=0.5)
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the exact correlation values measured in the plot.
print("Visual ↔ numeric mapping for each panel:")
for rho, label, _ in specs:
    if rho == "nonlinear":
        x = rng.uniform(-2, 2, N); y = x**2 + 0.15 * rng.standard_normal(N)
    elif rho == 1.0:
        x = rng.standard_normal(N); y = x
    elif rho == -1.0:
        x = rng.standard_normal(N); y = -x
    else:
        x, y = correlated_pair(rho)
    print(f"  {label.replace(chr(10), ' '):<55} → measured ρ = {np.corrcoef(x,y)[0,1]:+.3f}")
```

**The take-aways every analyst needs:**

- **Sign tells you direction**, magnitude tells you tightness. $\rho =
  +1$ means the points lie *exactly* on an upward line; $\rho = -1$
  means an exactly downward line. Anything in between produces a
  *cloud* whose tightness around the line is what $|\rho|$ measures.
- **$\rho = 0$ does NOT mean independent.** The bottom-right panel
  shows a perfect deterministic relationship $y = x^2$ — yet the
  correlation is essentially zero, because correlation only sees
  *linear* relationships. Always plot the data; never trust a single
  correlation number on its own.
- **A weakish correlation is bigger than you'd expect.** Many people
  imagine $\rho = 0.6$ as "almost a line"; the picture shows it's a
  *cloud* with substantial scatter. Real-world relationships are
  almost always weaker than they sound when reported as a number.

## Connection to CS / Games / AI

- **PCA** — eigendecomposition of the covariance matrix gives principal components
- **Feature selection** — highly correlated features are redundant
- **Portfolio theory** — covariance between stock returns determines diversification
- **Mahalanobis distance** — uses the inverse covariance matrix: $d = \sqrt{(\mathbf{x}-\boldsymbol{\mu})^T \mathbf{C}^{-1} (\mathbf{x}-\boldsymbol{\mu})}$
- **Gaussian processes** — defined entirely by mean and covariance functions
- **Batch normalisation** — sometimes uses whitening (decorrelation via covariance matrix)

## Check Your Understanding

1. **Pen & paper:** Given $(x, y)$ = $(2, 5), (4, 3), (6, 1)$, compute $\text{Cov}(X, Y)$ and $r$.  Is the correlation positive or negative?
2. **Pen & paper:** If $\text{Var}(X) = 9$, $\text{Var}(Y) = 16$, $r = 0.5$, what is $\text{Cov}(X, Y)$?
3. **Pen & paper:** Write the $3 \times 3$ covariance matrix for three features where all variances are 1, $\text{Cov}(X_1, X_2) = 0.5$, and features 1,3 and 2,3 are independent.
4. **Think about it:** Two variables have $\text{Cov} = 0$.  Does this guarantee independence?  Give a counterexample.
