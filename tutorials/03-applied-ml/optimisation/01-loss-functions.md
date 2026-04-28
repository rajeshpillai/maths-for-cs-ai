# Objective Functions and Loss Functions

## Intuition

An **objective function** is what you want to minimise (or maximise).  In ML,
this is the **loss function** — a single number that tells you how wrong your
model's predictions are.  Training a model = finding parameters that make
this number as small as possible.  Different problems need different loss
functions, and the choice has deep mathematical consequences.

## Prerequisites

- Tier 3, Lesson 2: Derivatives (finding minima)
- Tier 4, Lesson 8: MLE (connection to cross-entropy)

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

## Visualisation — Loss-function shapes side by side

Each loss function is a *shape*. Comparing the shapes side by side
shows why MSE punishes outliers harder than MAE, why cross-entropy
explodes for confident-and-wrong predictions, and why Huber loss is
the practical compromise.

```python
# ── Visualising loss functions ──────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))

# (1) Regression losses as a function of the residual r = ŷ - y.
# MSE = r² grows quadratically (steep for big errors).
# MAE = |r| grows linearly (robust to outliers).
# Huber  = quadratic close to 0, linear far from 0  (best of both).
ax = axes[0]
r = np.linspace(-3, 3, 400)
mse   = r ** 2
mae   = np.abs(r)
delta = 1.0
huber = np.where(np.abs(r) <= delta, 0.5 * r ** 2,
                 delta * (np.abs(r) - 0.5 * delta))
ax.plot(r, mse,   label="MSE  = r²",                    color="tab:red",    lw=2)
ax.plot(r, mae,   label="MAE  = |r|",                   color="tab:blue",   lw=2)
ax.plot(r, huber, label=f"Huber (δ = {delta})",         color="tab:green",  lw=2)
ax.set_xlabel("residual r = $\\hat y - y$"); ax.set_ylabel("loss")
ax.set_title("Regression losses\nMSE punishes big errors quadratically,\n"
             "MAE linearly, Huber compromises")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Binary cross-entropy as a function of the predicted probability,
# for the two cases y = 1 (true) and y = 0. The loss is *zero* when
# the prediction matches the truth, and *blows up to infinity* when
# the prediction is the opposite of the truth — the famous 'confident
# and wrong' penalty.
ax = axes[1]
p = np.linspace(0.005, 0.995, 400)
ce_y1 = -np.log(p)                            # loss when y = 1
ce_y0 = -np.log(1 - p)                        # loss when y = 0
ax.plot(p, ce_y1, color="tab:blue",   lw=2, label="y = 1: loss = −log(p)")
ax.plot(p, ce_y0, color="tab:orange", lw=2, label="y = 0: loss = −log(1 − p)")
ax.scatter([1.0, 0.0], [0, 0], color="black", s=60, zorder=5)
ax.text(0.95, 0.3, "y=1: loss → 0\nas p → 1", fontsize=8, ha="right")
ax.text(0.05, 0.3, "y=0: loss → 0\nas p → 0", fontsize=8)
ax.set_ylim(0, 6)
ax.set_xlabel("predicted probability p")
ax.set_ylabel("binary cross-entropy")
ax.set_title("Binary cross-entropy\n→ confident-and-wrong is exponentially expensive")
ax.legend(loc="upper center", fontsize=9); ax.grid(True, alpha=0.3)

# (3) The outlier-robustness story as a bar chart.
# Same five errors, but one is an outlier (10 instead of 1).
ax = axes[2]
y_normal       = [3, 4, 5, 6, 7]
pred_normal    = [3, 4, 5, 6, 7]              # perfect fit
pred_outlier_y = [3, 4, 5, 6, 17]             # one observation is way off

mse_n  = np.mean([(p - y)**2 for p, y in zip(pred_normal, y_normal)])
mse_o  = np.mean([(p - y)**2 for p, y in zip(pred_normal, pred_outlier_y)])
mae_n  = np.mean([abs(p - y) for p, y in zip(pred_normal, y_normal)])
mae_o  = np.mean([abs(p - y) for p, y in zip(pred_normal, pred_outlier_y)])
labels = ["MSE\n(no outlier)", "MSE\n(1 outlier)",
          "MAE\n(no outlier)", "MAE\n(1 outlier)"]
values = [mse_n, mse_o, mae_n, mae_o]
colors = ["tab:red", "tab:red", "tab:blue", "tab:blue"]
bars = ax.bar(labels, values, color=colors, alpha=0.75)
for bar, v in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width()/2, v + max(values) * 0.02,
            f"{v:.1f}", ha="center", fontsize=11, fontweight="bold")
ax.set_ylabel("average loss")
ax.set_title("One outlier in 5 points: MSE explodes 20×,\nMAE grows linearly (more robust)")
ax.grid(True, alpha=0.3, axis="y")

plt.tight_layout()
plt.show()

# Print the numerical comparison.
print(f"5 points, 1 outlier:")
print(f"  MSE without outlier: {mse_n:.2f}    MSE with outlier: {mse_o:.2f}    "
      f"({mse_o / max(mse_n, 0.01):.0f}× worse)")
print(f"  MAE without outlier: {mae_n:.2f}    MAE with outlier: {mae_o:.2f}    "
      f"({mae_o / max(mae_n, 0.01):.0f}× worse)")
```

**Three pictures, three engineering decisions:**

- **Squared error vs absolute error.** MSE's parabolic shape means a
  doubling of the residual *quadruples* the loss; one bad outlier
  dominates the gradient. MAE's V-shape means an outlier contributes
  *linearly* — much more robust. Huber loss combines both: quadratic
  near zero (so the gradient is well-behaved) and linear far from zero
  (so outliers can't hijack the fit).
- **Cross-entropy is asymmetric and unbounded.** When your true
  label is 1, predicting 0.99 costs $\approx 0.01$, but predicting
  0.01 costs $\approx 4.6$. Predicting *exactly* 0 with truth = 1
  produces $-\log 0 = \infty$. This is what punishes overconfident
  classifiers — the central reason cross-entropy beats MSE for
  classification.
- **The choice of loss = the choice of which mistakes you forgive.**
  This is a model-design decision, not just a "default best practice".
  In medical imaging you might use Tversky loss to penalise
  false-negatives more than false-positives; in robust regression
  you'd reach for Huber over MSE.

## Connection to CS / Games / AI / Business / Industry

- **MSE** — linear regression, autoencoders, image reconstruction
- **Cross-entropy** — classification networks, language models, reinforcement learning policy gradient
- **Huber** — robust regression, DQN (Deep Q-Networks)
- **Hinge loss** — SVMs: $\max(0, 1 - y \cdot \hat{y})$
- **Contrastive loss** — Siamese networks, embedding learning
- **Custom losses** — game AI reward shaping, style transfer perceptual loss
- **Business / Insurance**: **GEICO**, **Progressive** and **Allstate** train pricing models with **quantile loss** (asymmetric MAE) so the model is more conservative on under-prediction than over-prediction — the cost of under-pricing a policy is greater than over-pricing.
- **Engineering / Self-driving**: **Waymo** and **Cruise** perception stacks use **focal loss** (Lin et al., 2017) to handle the extreme class imbalance between "pixels that are pedestrians" (rare) and "pixels that are road" (common); without focal loss the network would just predict "road" everywhere.
- **Industry / Medical AI**: **Tversky loss** and **Dice loss** are standard in the **MONAI** medical-imaging framework and **NVIDIA Clara** because in tumour segmentation a false negative (missing cancer) is far more costly than a false positive — MSE/BCE would weigh them equally.
- **Business / Energy trading**: **National Grid** and **EDF** forecast electricity demand with **pinball loss** (a quantile-regression cousin) because under-forecasting causes blackouts (catastrophic) while over-forecasting only wastes spinning reserve (expensive but recoverable).

## Check Your Understanding

1. **Pen & paper:** Compute MSE and MAE for predictions $[3, 5, 7]$ and targets $[2, 5, 10]$.
2. **Pen & paper:** A model outputs $\hat{p} = 0.6$ for a sample with true label $y = 1$.  Compute the BCE loss.  What if $\hat{p} = 0.99$?
3. **Pen & paper:** For Huber loss with $\delta = 2$: compute the loss for errors $e = 1$ and $e = 5$.
4. **Think about it:** Why does cross-entropy loss train faster than MSE for classification?  (Hint: compare the gradients near $\hat{p} = 0$ when $y = 1$.)
