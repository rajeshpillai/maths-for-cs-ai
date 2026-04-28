# Backpropagation — Derived from the Chain Rule, Step by Step

## Intuition

Backpropagation is not a mysterious algorithm — it's simply the **chain rule**
applied systematically from the output layer back to the input layer.  It
computes how much each weight contributed to the error, so gradient descent
knows which way to adjust them.

## Prerequisites

- Tier 3, Lesson 4: Chain Rule
- Tier 6, Lesson 3: Forward Pass

## From First Principles

### The setup

Network: input(2) → hidden(2, ReLU) → output(1, sigmoid).  MSE loss.

Weights:
$$\mathbf{W}^{(1)} = \begin{pmatrix} w_{11} & w_{12} \\ w_{21} & w_{22} \end{pmatrix}, \quad \mathbf{b}^{(1)} = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}$$

$$\mathbf{W}^{(2)} = \begin{pmatrix} w_{31} & w_{32} \end{pmatrix}, \quad b^{(2)} = b_3$$

### Forward pass (with specific numbers)

$\mathbf{W}^{(1)} = \begin{pmatrix} 0.5 & 0.3 \\ 0.2 & 0.8 \end{pmatrix}$, $\mathbf{b}^{(1)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$

$\mathbf{W}^{(2)} = \begin{pmatrix} 0.6 & 0.4 \end{pmatrix}$, $b^{(2)} = 0$

Input: $\mathbf{x} = (1, 1)^T$, Target: $y = 1$.

**Layer 1:**
$z_1 = 0.5(1) + 0.3(1) = 0.8$, $a_1 = \text{ReLU}(0.8) = 0.8$
$z_2 = 0.2(1) + 0.8(1) = 1.0$, $a_2 = \text{ReLU}(1.0) = 1.0$

**Layer 2:**
$z_3 = 0.6(0.8) + 0.4(1.0) = 0.88$
$\hat{y} = \sigma(0.88) = \frac{1}{1 + e^{-0.88}} \approx 0.707$

**Loss:**
$L = (\hat{y} - y)^2 = (0.707 - 1)^2 = 0.086$

### Backward pass: output layer

**Step 1:** $\frac{\partial L}{\partial \hat{y}} = 2(\hat{y} - y) = 2(0.707 - 1) = -0.586$

**Step 2:** $\frac{\partial \hat{y}}{\partial z_3} = \sigma(z_3)(1 - \sigma(z_3)) = 0.707 \times 0.293 = 0.207$

**Step 3:** Combine (this is $\delta_3$, the "error signal"):

$$\delta_3 = \frac{\partial L}{\partial z_3} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z_3} = (-0.586)(0.207) = -0.121$$

**Gradients for layer 2 weights:**

$\frac{\partial L}{\partial w_{31}} = \delta_3 \cdot a_1 = -0.121 \times 0.8 = -0.097$

$\frac{\partial L}{\partial w_{32}} = \delta_3 \cdot a_2 = -0.121 \times 1.0 = -0.121$

$\frac{\partial L}{\partial b_3} = \delta_3 = -0.121$

### Backward pass: hidden layer

**Propagate error back through weights:**

$\frac{\partial L}{\partial a_1} = \delta_3 \cdot w_{31} = -0.121 \times 0.6 = -0.073$

$\frac{\partial L}{\partial a_2} = \delta_3 \cdot w_{32} = -0.121 \times 0.4 = -0.048$

**Through ReLU:** $\text{ReLU}'(z) = 1$ if $z > 0$, else $0$.

$\delta_1 = \frac{\partial L}{\partial a_1} \cdot \text{ReLU}'(z_1) = -0.073 \times 1 = -0.073$

$\delta_2 = \frac{\partial L}{\partial a_2} \cdot \text{ReLU}'(z_2) = -0.048 \times 1 = -0.048$

**Gradients for layer 1 weights:**

$\frac{\partial L}{\partial w_{11}} = \delta_1 \cdot x_1 = -0.073 \times 1 = -0.073$

$\frac{\partial L}{\partial w_{12}} = \delta_1 \cdot x_2 = -0.073 \times 1 = -0.073$

$\frac{\partial L}{\partial w_{21}} = \delta_2 \cdot x_1 = -0.048 \times 1 = -0.048$

$\frac{\partial L}{\partial w_{22}} = \delta_2 \cdot x_2 = -0.048 \times 1 = -0.048$

### The general pattern

For each layer $l$, working backward:

1. **Error signal:** $\boldsymbol{\delta}^{(l)} = \boldsymbol{\delta}^{(l+1)} \mathbf{W}^{(l+1)} \odot \sigma'(\mathbf{z}^{(l)})$
2. **Weight gradient:** $\frac{\partial L}{\partial \mathbf{W}^{(l)}} = \boldsymbol{\delta}^{(l)} (\mathbf{a}^{(l-1)})^T$
3. **Bias gradient:** $\frac{\partial L}{\partial \mathbf{b}^{(l)}} = \boldsymbol{\delta}^{(l)}$

### Update step

$$\mathbf{W}^{(l)} \leftarrow \mathbf{W}^{(l)} - \alpha \frac{\partial L}{\partial \mathbf{W}^{(l)}}$$

With $\alpha = 0.1$:

$w_{31} \leftarrow 0.6 - 0.1(-0.097) = 0.610$
$w_{32} \leftarrow 0.4 - 0.1(-0.121) = 0.412$

All weights move in the direction that reduces the loss.

## Python Verification

```python
# ── Backpropagation: verifying pen & paper work ─────────────
import math

def sigmoid(z): return 1 / (1 + math.exp(-z))
def sigmoid_deriv(z): s = sigmoid(z); return s * (1 - s)
def relu(z): return max(0, z)
def relu_deriv(z): return 1 if z > 0 else 0

# Network setup
W1 = [[0.5, 0.3], [0.2, 0.8]]
b1 = [0, 0]
W2 = [[0.6, 0.4]]
b2 = [0]
x = [1, 1]
y_true = 1
alpha = 0.1

# === Forward pass ===
print("=== Forward pass ===")
z1 = [sum(W1[i][j] * x[j] for j in range(2)) + b1[i] for i in range(2)]
a1 = [relu(z) for z in z1]
z2 = [sum(W2[i][j] * a1[j] for j in range(2)) + b2[i] for i in range(1)]
y_hat = sigmoid(z2[0])
loss = (y_hat - y_true) ** 2

print(f"z1 = {z1}, a1 = {a1}")
print(f"z2 = {z2}, ŷ = {y_hat:.4f}")
print(f"Loss = {loss:.4f}")

# === Backward pass ===
print(f"\n=== Backward pass ===")

# Output layer
dL_dy = 2 * (y_hat - y_true)
dy_dz2 = sigmoid_deriv(z2[0])
delta2 = dL_dy * dy_dz2
print(f"∂L/∂ŷ = {dL_dy:.4f}")
print(f"∂ŷ/∂z₂ = {dy_dz2:.4f}")
print(f"δ₂ = {delta2:.4f}")

# Gradients for W2
dW2 = [delta2 * a1[j] for j in range(2)]
db2 = delta2
print(f"∂L/∂W₂ = {[f'{g:.4f}' for g in dW2]}")
print(f"∂L/∂b₂ = {db2:.4f}")

# Propagate to hidden layer
dL_da1 = [delta2 * W2[0][j] for j in range(2)]
delta1 = [dL_da1[i] * relu_deriv(z1[i]) for i in range(2)]
print(f"\nδ₁ = {[f'{d:.4f}' for d in delta1]}")

# Gradients for W1
print(f"∂L/∂W₁:")
for i in range(2):
    for j in range(2):
        grad = delta1[i] * x[j]
        print(f"  w{i+1}{j+1}: {grad:.4f}")

# === Update weights ===
print(f"\n=== Weight updates (α={alpha}) ===")
for j in range(2):
    old = W2[0][j]
    new = old - alpha * dW2[j]
    print(f"  w₃{j+1}: {old:.3f} → {new:.4f}")

# === Numerical gradient check ===
print(f"\n=== Numerical gradient check ===")
eps = 1e-5
for idx, (i, j) in enumerate([(0,0), (0,1)]):
    # Perturb W2[0][j]
    W2_plus = [[w for w in row] for row in W2]
    W2_minus = [[w for w in row] for row in W2]
    W2_plus[0][j] += eps
    W2_minus[0][j] -= eps
    
    def forward(W2_local):
        z2_l = [sum(W2_local[0][k] * a1[k] for k in range(2)) + b2[0]]
        return (sigmoid(z2_l[0]) - y_true) ** 2
    
    num_grad = (forward(W2_plus) - forward(W2_minus)) / (2 * eps)
    print(f"  w₃{j+1}: analytical={dW2[j]:.6f}, numerical={num_grad:.6f}")
```

## Visualisation — Watching the loss go down (training a tiny net)

The proof that backpropagation *works* is to actually train a network
with it and watch the loss decrease. Here we train a 2-3-1 network on
the XOR problem from scratch (no PyTorch / no autograd) using only the
chain-rule equations from the lesson, and plot what happens during
training.

```python
# ── Visualising backprop training a network from scratch ────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)

# XOR data: 4 input points, 4 binary targets.
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]], dtype=float)
y = np.array([[0],    [1],    [1],    [0]],    dtype=float)

# 2-3-1 network — initialised randomly.
H_DIM = 3
W1 = rng.normal(0, 1, size=(H_DIM, 2))
b1 = np.zeros(H_DIM)
W2 = rng.normal(0, 1, size=(1, H_DIM))
b2 = np.zeros(1)

def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))

losses = []
boundary_snapshots = []                  # to visualise the boundary every 1000 steps
LR = 0.5
N_EPOCHS = 5000
for epoch in range(N_EPOCHS):
    # Forward pass.
    z1 = X @ W1.T + b1
    a1 = sigmoid(z1)
    z2 = a1 @ W2.T + b2
    a2 = sigmoid(z2)
    # MSE loss.
    loss = float(np.mean((a2 - y) ** 2))
    losses.append(loss)

    # Backward pass — the chain rule, by hand.
    dz2 = (a2 - y) * a2 * (1 - a2)               # ∂L/∂z₂
    dW2 = dz2.T @ a1                             # (1, H_DIM)
    db2 = dz2.sum(axis=0)                        # (1,)
    da1 = dz2 @ W2                               # propagate back
    dz1 = da1 * a1 * (1 - a1)                    # σ'(z) for sigmoid
    dW1 = dz1.T @ X                              # (H_DIM, 2)
    db1 = dz1.sum(axis=0)                        # (H_DIM,)

    # Gradient-descent update.
    W1 -= LR * dW1; b1 -= LR * db1
    W2 -= LR * dW2; b2 -= LR * db2

    # Every 1000 steps, snapshot the decision surface for plotting.
    if epoch % 1000 == 0 or epoch == N_EPOCHS - 1:
        xs = np.linspace(-0.4, 1.4, 100)
        XX, YY = np.meshgrid(xs, xs)
        pts = np.stack([XX.ravel(), YY.ravel()], axis=1)
        h = sigmoid(pts @ W1.T + b1)
        out = sigmoid(h @ W2.T + b2).reshape(XX.shape)
        boundary_snapshots.append((epoch, out))

fig, axes = plt.subplots(1, 4, figsize=(18, 4.5))

# (1) Loss curve over training. Should drop fast at first, then taper.
ax = axes[0]
ax.plot(losses, color="tab:blue", lw=1.5)
ax.set_xlabel("epoch"); ax.set_ylabel("MSE loss")
ax.set_title(f"Loss decreases monotonically\n(final loss ≈ {losses[-1]:.4f})")
ax.set_yscale("log")
ax.grid(True, which="both", alpha=0.3)

# (2-4) Decision boundary at three checkpoints, visualising
# how backprop gradually shapes the network into solving XOR.
for ax, (epoch, surf) in zip(axes[1:], boundary_snapshots[::max(1, len(boundary_snapshots)//3)][:3]):
    xs = np.linspace(-0.4, 1.4, 100)
    XX, YY = np.meshgrid(xs, xs)
    ax.contourf(XX, YY, surf, levels=20, cmap="RdBu", alpha=0.6)
    ax.contour(XX, YY, surf, levels=[0.5], colors="black", linewidths=2)
    for (xx, yy), lab in zip(X, y.flatten()):
        color = "tab:red" if lab == 1 else "tab:blue"
        ax.scatter(xx, yy, s=200, color=color, edgecolor="black", zorder=5)
    ax.set_xlim(-0.4, 1.4); ax.set_ylim(-0.4, 1.4); ax.set_aspect("equal")
    ax.set_title(f"Epoch {epoch}\nloss = {losses[epoch]:.4f}")

plt.tight_layout()
plt.show()

# Final classification check — should be perfect.
z1 = X @ W1.T + b1; a1 = sigmoid(z1)
final = sigmoid(a1 @ W2.T + b2)
print("Final predictions after training:")
for inp, t, p in zip(X, y.flatten(), final.flatten()):
    pred = int(p > 0.5)
    print(f"  input {tuple(int(v) for v in inp)} → output {p:.4f}  "
          f"(predict {pred}, true {int(t)})  {'✓' if pred == int(t) else '✗'}")
```

**The two essentials of backpropagation made visible:**

- **The loss curve goes down.** Each step, gradients computed by the
  chain rule (lesson 4 of calculus) tell every weight which way to
  move. After a few thousand steps the network solves XOR — a problem a
  *single* neuron cannot solve at all.
- **The decision boundary morphs.** The early-epoch panel shows a
  network that hasn't figured anything out yet — predictions are near
  0.5 everywhere. By the final panel, the boundary has curved exactly
  around the two "1" points. Backprop computed all of this with
  nothing more than: forward pass → derivative of loss w.r.t. output →
  apply chain rule layer by layer → step against the gradient.

Every `loss.backward()` call in PyTorch is an automated, vectorised,
GPU-accelerated version of *exactly* the loop you just executed.

## Connection to CS / Games / AI

- **PyTorch `.backward()`** — calls backpropagation automatically on the computation graph
- **Gradient checking** — compare analytical backprop gradients to numerical gradients (debugging technique)
- **Vanishing/exploding gradients** — backprop multiplies many derivatives; if each < 1 (sigmoid) gradients vanish; if > 1 they explode
- **Residual connections** — skip connections in ResNets provide a "gradient highway" that mitigates vanishing gradients
- **Gradient accumulation** — accumulate gradients over multiple mini-batches before updating (simulates larger batch size)

## Check Your Understanding

1. **Pen & paper:** For the network above, what happens to $\delta_1$ if $z_1 < 0$ (ReLU kills it)?  What are the gradients for $w_{11}, w_{12}$?
2. **Pen & paper:** Redo the backward pass with $\sigma$ (sigmoid) instead of ReLU in the hidden layer.  How do the gradients change?
3. **Pen & paper:** If the target were $y = 0$ instead of $y = 1$, would the weights increase or decrease?  Work through $\frac{\partial L}{\partial \hat{y}}$ to verify.
4. **Think about it:** Why is backpropagation $O(n)$ in the number of operations (same as the forward pass), rather than $O(n^2)$?
