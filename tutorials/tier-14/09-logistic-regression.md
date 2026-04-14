# Logistic Regression

## Intuition

Linear regression predicts continuous values, but what if the outcome is
binary — clicked or not, churned or stayed, spam or not? You cannot just
fit a line and threshold, because the line can predict values outside [0, 1].
Logistic regression wraps the linear model inside a **sigmoid function** to
produce a probability, then uses Maximum Likelihood to find the best
parameters. The decision boundary is where the predicted probability equals
0.5.

## Prerequisites

- Tier 14, Lesson 8 (Multiple Regression)
- Tier 4, Lesson 8 (Maximum Likelihood Estimation)
- Tier 3 (Calculus — derivatives, chain rule)

## From First Principles

### The Sigmoid (Logistic) Function

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

Properties:
- $\sigma(0) = 0.5$
- $\sigma(z) \to 1$ as $z \to \infty$
- $\sigma(z) \to 0$ as $z \to -\infty$
- Derivative: $\sigma'(z) = \sigma(z)(1 - \sigma(z))$

### The Model

$$P(y = 1 | \mathbf{x}) = \sigma(\mathbf{x}^T\boldsymbol{\beta})
= \frac{1}{1 + e^{-\mathbf{x}^T\boldsymbol{\beta}}}$$

### Log-Odds (Logit)

Taking the inverse:
$$\ln\frac{P(y=1)}{P(y=0)} = \mathbf{x}^T\boldsymbol{\beta}$$

The left side is the **log-odds** or **logit**. Logistic regression is a
*linear* model in the log-odds space.

### MLE Derivation

For binary labels $y_i \in \{0, 1\}$ with $p_i = \sigma(\mathbf{x}_i^T\boldsymbol{\beta})$:

Likelihood:
$$L(\boldsymbol{\beta}) = \prod_{i=1}^{n} p_i^{y_i}(1 - p_i)^{1 - y_i}$$

Log-likelihood:
$$\ell(\boldsymbol{\beta}) = \sum_{i=1}^{n} \left[ y_i \ln p_i + (1-y_i)\ln(1-p_i) \right]$$

This is the **negative binary cross-entropy** (up to sign). There is no
closed-form solution, so we use gradient ascent.

Gradient:
$$\frac{\partial \ell}{\partial \boldsymbol{\beta}} = \sum_{i=1}^{n} (y_i - p_i)\mathbf{x}_i
= \mathbf{X}^T(\mathbf{y} - \mathbf{p})$$

Update rule (gradient ascent with learning rate $\eta$):
$$\boldsymbol{\beta} \leftarrow \boldsymbol{\beta} + \eta \cdot \mathbf{X}^T(\mathbf{y} - \mathbf{p})$$

### Pen & Paper Example

Tiny dataset with one feature:

| $x$ | $y$ |
|-----|-----|
| 1   | 0   |
| 2   | 0   |
| 3   | 1   |
| 4   | 1   |

Start with $\beta_0 = 0, \beta_1 = 0$.

All $p_i = \sigma(0) = 0.5$.

Gradient for $\beta_0$: $\sum(y_i - 0.5) = (0-0.5)+(0-0.5)+(1-0.5)+(1-0.5) = 0$

Gradient for $\beta_1$: $\sum(y_i - 0.5)x_i = -0.5(1) + -0.5(2) + 0.5(3) + 0.5(4) = 2.0$

With $\eta = 0.1$: $\beta_1 \leftarrow 0 + 0.1 \times 2.0 = 0.2$.

Now recompute: $p_1 = \sigma(0.2) = 0.55$, $p_2 = \sigma(0.4) = 0.60$, etc.
Repeat until convergence.

### Decision Boundary

The boundary is where $P(y=1) = 0.5$, i.e., $\mathbf{x}^T\boldsymbol{\beta} = 0$.

For one feature: $\beta_0 + \beta_1 x = 0 \Rightarrow x = -\beta_0 / \beta_1$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.special import expit as sigmoid

# Data
x = np.array([1, 2, 3, 4, 5, 6, 7, 8], dtype=float)
y = np.array([0, 0, 0, 1, 0, 1, 1, 1], dtype=float)

# Gradient ascent for logistic regression
X = np.column_stack([np.ones_like(x), x])
beta = np.zeros(2)
lr = 0.1

for _ in range(1000):
    p = sigmoid(X @ beta)
    grad = X.T @ (y - p)
    beta += lr * grad

# Plot
fig, ax = plt.subplots(figsize=(9, 5))
x_plot = np.linspace(0, 9, 200)
X_plot = np.column_stack([np.ones_like(x_plot), x_plot])
p_plot = sigmoid(X_plot @ beta)

ax.scatter(x, y, s=80, c=['red' if yi == 0 else 'blue' for yi in y],
           zorder=5, edgecolors='black')
ax.plot(x_plot, p_plot, 'g-', lw=2, label='Sigmoid fit')

# Decision boundary
db = -beta[0] / beta[1]
ax.axvline(db, color='orange', linestyle='--', lw=2,
           label=f'Decision boundary x = {db:.2f}')
ax.axhline(0.5, color='gray', linestyle=':', alpha=0.5)

ax.set_xlabel('x')
ax.set_ylabel('P(y=1)')
ax.set_title('Logistic Regression: Sigmoid Curve with Decision Boundary')
ax.legend()
plt.tight_layout()
plt.savefig('logistic_regression.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Step 1: Data
x = np.array([1, 2, 3, 4, 5, 6, 7, 8], dtype=float)
y = np.array([0, 0, 0, 1, 0, 1, 1, 1], dtype=float)
X = np.column_stack([np.ones_like(x), x])

# Step 2: Gradient ascent
beta = np.zeros(2)
lr = 0.1
for iteration in range(2000):
    p = sigmoid(X @ beta)
    log_lik = np.sum(y * np.log(p + 1e-10) + (1-y) * np.log(1-p + 1e-10))
    grad = X.T @ (y - p)
    beta += lr * grad
    if iteration % 500 == 0:
        print(f"Iter {iteration}: beta = {beta.round(4)}, log-lik = {log_lik:.4f}")

print(f"\nFinal beta: {beta}")
print(f"Decision boundary: x = {-beta[0]/beta[1]:.3f}")

# Step 3: Predictions
probs = sigmoid(X @ beta)
preds = (probs >= 0.5).astype(int)
print(f"\nProbabilities: {probs.round(3)}")
print(f"Predictions:   {preds}")
print(f"Actual:        {y.astype(int)}")
print(f"Accuracy:      {np.mean(preds == y):.2f}")

# Step 4: Verify with sklearn
from sklearn.linear_model import LogisticRegression
clf = LogisticRegression(penalty=None, fit_intercept=True)
clf.fit(x.reshape(-1, 1), y)
print(f"\nsklearn: intercept = {clf.intercept_[0]:.4f}, coef = {clf.coef_[0][0]:.4f}")
```

## Connection to CS / Games / AI

- **Binary Classification:** Logistic regression is the simplest neural
  network — one neuron with a sigmoid activation. Understanding it is
  prerequisite for understanding deep learning.
- **Cross-Entropy Loss:** The log-likelihood of logistic regression IS
  the binary cross-entropy loss used in every modern classifier.
- **Spam Detection:** Classic application — predict spam probability from
  word features.
- **Game Matchmaking:** Predicting win probability from player ratings
  (Elo/Glicko systems are logistic models at their core).

## Check Your Understanding

1. Derive $\sigma'(z) = \sigma(z)(1-\sigma(z))$ from the definition of
   the sigmoid. (Hint: use the quotient rule.)

2. Why can we not use OLS for binary classification? What goes wrong
   with the predicted values?

3. Implement logistic regression with 2 features on a 2D dataset and
   plot the linear decision boundary $\beta_0 + \beta_1 x_1 + \beta_2 x_2 = 0$.
