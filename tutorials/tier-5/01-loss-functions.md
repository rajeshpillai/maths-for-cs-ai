# Objective Functions and Loss Functions

## Intuition

An **objective function** is what you want to minimise (or maximise).  In ML,
this is the **loss function** — a single number that tells you how wrong your
model's predictions are.  Training a model = finding parameters that make
this number as small as possible.  Different problems need different loss
functions, and the choice has deep mathematical consequences.

## Prerequisites

- Tier 3, Lesson 2: Derivatives (finding minima)
- Tier 4, Lesson 7: MLE (connection to cross-entropy)

## From First Principles

### The setup

Given:
- Data: $(x_i, y_i)$ for $i = 1, \ldots, n$
- Model: $\hat{y}_i = f(x_i; \boldsymbol{\theta})$ with parameters $\boldsymbol{\theta}$
- Loss: $L(\boldsymbol{\theta}) = \frac{1}{n}\sum_{i=1}^{n} \ell(\hat{y}_i, y_i)$

**Goal:** Find $\boldsymbol{\theta}^* = \arg\min_{\boldsymbol{\theta}} L(\boldsymbol{\theta})$

### Mean Squared Error (MSE)

$$L_{\text{MSE}} = \frac{1}{n}\sum_{i=1}^{n}(\hat{y}_i - y_i)^2$$

**Pen & paper:** Predictions: $\hat{y} = [2, 4, 6]$, targets: $y = [1, 4, 5]$.

Errors: $(2-1)^2 + (4-4)^2 + (6-5)^2 = 1 + 0 + 1 = 2$

$L_{\text{MSE}} = 2/3 \approx 0.667$

**Derivative (needed for gradient descent):**

$$\frac{\partial L}{\partial \hat{y}_i} = \frac{2}{n}(\hat{y}_i - y_i)$$

**Properties:**
- Penalises large errors quadratically (sensitive to outliers)
- MLE estimate under Gaussian noise assumption
- Smooth, convex (for linear models)

### Mean Absolute Error (MAE)

$$L_{\text{MAE}} = \frac{1}{n}\sum_{i=1}^{n}|\hat{y}_i - y_i|$$

**Pen & paper:** Same data: $|1| + |0| + |1| = 2$, $L = 2/3$.

**Properties:**
- Robust to outliers (linear penalty, not quadratic)
- Not differentiable at 0 (use subgradients)
- MLE under Laplace noise assumption

### Binary Cross-Entropy (BCE)

For binary classification ($y \in \{0, 1\}$, $\hat{p} \in (0, 1)$):

$$L_{\text{BCE}} = -\frac{1}{n}\sum_{i=1}^{n}\left[y_i \ln \hat{p}_i + (1 - y_i) \ln(1 - \hat{p}_i)\right]$$

**Pen & paper:** $y = 1, \hat{p} = 0.9$:

$\ell = -(1 \cdot \ln 0.9 + 0) = -(-0.105) = 0.105$

$y = 1, \hat{p} = 0.1$:

$\ell = -\ln 0.1 = 2.303$ — much higher penalty for confident wrong prediction!

**Derivative:**

$$\frac{\partial \ell}{\partial \hat{p}} = -\frac{y}{\hat{p}} + \frac{1-y}{1-\hat{p}} = \frac{\hat{p} - y}{\hat{p}(1-\hat{p})}$$

### Categorical Cross-Entropy

For multi-class ($C$ classes, one-hot $\mathbf{y}$, softmax output $\hat{\mathbf{p}}$):

$$L = -\sum_{c=1}^{C} y_c \ln \hat{p}_c$$

Since $\mathbf{y}$ is one-hot with true class $k$: $L = -\ln \hat{p}_k$

**Pen & paper:** True class 2, softmax output $(0.1, 0.7, 0.2)$:

$L = -\ln 0.7 = 0.357$

### Comparison table

| Loss | When to use | Outlier robust? | Probabilistic interpretation |
|------|-------------|-----------------|----------------------------|
| MSE | Regression | No | Gaussian noise |
| MAE | Regression (robust) | Yes | Laplace noise |
| Huber | Regression (compromise) | Partly | — |
| BCE | Binary classification | — | Bernoulli MLE |
| Cross-Entropy | Multi-class classification | — | Categorical MLE |

### Huber loss (pen & paper)

$$\ell_\delta(e) = \begin{cases} \frac{1}{2}e^2 & \text{if } |e| \le \delta \\ \delta(|e| - \frac{1}{2}\delta) & \text{if } |e| > \delta \end{cases}$$

Quadratic for small errors (like MSE), linear for large errors (like MAE).

**Pen & paper:** $\delta = 1$.

$e = 0.5$: $\ell = 0.125$ (quadratic region)
$e = 3$: $\ell = 1(3 - 0.5) = 2.5$ (linear region)

## Python Verification

```python
# ── Loss Functions: verifying pen & paper work ──────────────
import math

# MSE
print("=== MSE ===")
y_hat = [2, 4, 6]
y_true = [1, 4, 5]
mse = sum((yh - yt)**2 for yh, yt in zip(y_hat, y_true)) / len(y_true)
print(f"Predictions: {y_hat}, Targets: {y_true}")
print(f"MSE = {mse:.4f}")

# MAE
mae = sum(abs(yh - yt) for yh, yt in zip(y_hat, y_true)) / len(y_true)
print(f"MAE = {mae:.4f}")

# BCE
print(f"\n=== Binary Cross-Entropy ===")
for y, p_hat in [(1, 0.9), (1, 0.1), (0, 0.1), (0, 0.9)]:
    bce = -(y * math.log(p_hat) + (1-y) * math.log(1-p_hat))
    print(f"  y={y}, p̂={p_hat}: BCE = {bce:.4f}")

# Categorical cross-entropy
print(f"\n=== Categorical Cross-Entropy ===")
y_onehot = [0, 1, 0]
p_softmax = [0.1, 0.7, 0.2]
ce = -sum(y * math.log(p) for y, p in zip(y_onehot, p_softmax) if y > 0)
print(f"True class: 1, Softmax: {p_softmax}")
print(f"CE = -ln(0.7) = {ce:.4f}")

# Huber loss
print(f"\n=== Huber Loss (δ=1) ===")
delta = 1
for e in [0.5, 1.0, 3.0]:
    if abs(e) <= delta:
        huber = 0.5 * e**2
    else:
        huber = delta * (abs(e) - 0.5 * delta)
    print(f"  e={e}: Huber = {huber:.4f}")

# MSE vs MAE sensitivity to outliers
print(f"\n=== Outlier sensitivity ===")
y_normal = [1, 2, 3, 4, 5]
y_outlier = [1, 2, 3, 4, 50]  # One outlier
pred = [1, 2, 3, 4, 5]

mse_normal = sum((p-y)**2 for p, y in zip(pred, y_normal)) / 5
mse_outlier = sum((p-y)**2 for p, y in zip(pred, y_outlier)) / 5
mae_normal = sum(abs(p-y) for p, y in zip(pred, y_normal)) / 5
mae_outlier = sum(abs(p-y) for p, y in zip(pred, y_outlier)) / 5

print(f"Without outlier: MSE={mse_normal:.1f}, MAE={mae_normal:.1f}")
print(f"With outlier:    MSE={mse_outlier:.1f}, MAE={mae_outlier:.1f}")
print(f"MSE increase: {mse_outlier/max(mse_normal,0.001):.0f}x, MAE increase: {mae_outlier/max(mae_normal,0.001):.0f}x")
```

## Connection to CS / Games / AI

- **MSE** — linear regression, autoencoders, image reconstruction
- **Cross-entropy** — classification networks, language models, reinforcement learning policy gradient
- **Huber** — robust regression, DQN (Deep Q-Networks)
- **Hinge loss** — SVMs: $\max(0, 1 - y \cdot \hat{y})$
- **Contrastive loss** — Siamese networks, embedding learning
- **Custom losses** — game AI reward shaping, style transfer perceptual loss

## Check Your Understanding

1. **Pen & paper:** Compute MSE and MAE for predictions $[3, 5, 7]$ and targets $[2, 5, 10]$.
2. **Pen & paper:** A model outputs $\hat{p} = 0.6$ for a sample with true label $y = 1$.  Compute the BCE loss.  What if $\hat{p} = 0.99$?
3. **Pen & paper:** For Huber loss with $\delta = 2$: compute the loss for errors $e = 1$ and $e = 5$.
4. **Think about it:** Why does cross-entropy loss train faster than MSE for classification?  (Hint: compare the gradients near $\hat{p} = 0$ when $y = 1$.)
