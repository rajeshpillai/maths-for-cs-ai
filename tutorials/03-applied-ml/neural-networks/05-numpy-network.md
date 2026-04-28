# Implement a Fully Connected Network from Scratch in NumPy

## Intuition

Now we put everything together.  We'll build a complete neural network —
forward pass, loss, backpropagation, and training — using nothing but NumPy.
No PyTorch, no TensorFlow.  Every line of code maps to the mathematics
you've learned.  Once you understand this, frameworks are just convenience.

## Prerequisites

- Tier 6, Lessons 1–4 (neuron, activations, forward pass, backpropagation)

## From First Principles

### Architecture

We'll build a network that learns XOR:

- Input: 2 features
- Hidden layer: 4 neurons, ReLU
- Output: 1 neuron, sigmoid
- Loss: Binary cross-entropy

### The math, summarised

**Forward:**
$$\mathbf{z}^{(1)} = \mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}$$
$$\mathbf{a}^{(1)} = \text{ReLU}(\mathbf{z}^{(1)})$$
$$z^{(2)} = \mathbf{W}^{(2)}\mathbf{a}^{(1)} + b^{(2)}$$
$$\hat{y} = \sigma(z^{(2)})$$
$$L = -[y \ln \hat{y} + (1-y) \ln(1 - \hat{y})]$$

**Backward:**
$$\delta^{(2)} = \hat{y} - y$$
$$\frac{\partial L}{\partial \mathbf{W}^{(2)}} = \delta^{(2)} (\mathbf{a}^{(1)})^T$$
$$\boldsymbol{\delta}^{(1)} = (\mathbf{W}^{(2)})^T \delta^{(2)} \odot \text{ReLU}'(\mathbf{z}^{(1)})$$
$$\frac{\partial L}{\partial \mathbf{W}^{(1)}} = \boldsymbol{\delta}^{(1)} \mathbf{x}^T$$

> **Note:** For sigmoid + BCE loss, the output delta simplifies beautifully to just $\hat{y} - y$.

### Pen & paper: Why $\delta^{(2)} = \hat{y} - y$ for sigmoid + BCE

BCE: $L = -y\ln\hat{y} - (1-y)\ln(1-\hat{y})$

$\frac{\partial L}{\partial \hat{y}} = -\frac{y}{\hat{y}} + \frac{1-y}{1-\hat{y}}$

$\frac{\partial \hat{y}}{\partial z} = \hat{y}(1 - \hat{y})$

$$\delta = \frac{\partial L}{\partial z} = \left(-\frac{y}{\hat{y}} + \frac{1-y}{1-\hat{y}}\right) \cdot \hat{y}(1-\hat{y})$$

$$= -y(1-\hat{y}) + (1-y)\hat{y} = -y + y\hat{y} + \hat{y} - y\hat{y} = \hat{y} - y$$ $\square$

## Python Implementation

```python
# ── Neural Network from Scratch ─────────────────────────────
# A complete NN that learns XOR using only basic math operations
import math
import random

random.seed(42)

# ── Activation functions ────────────────────────────────────
def sigmoid(z):
    # Clip to prevent overflow
    z = max(-500, min(500, z))
    return 1 / (1 + math.exp(-z))

def relu(z):
    return max(0, z)

def relu_deriv(z):
    return 1.0 if z > 0 else 0.0

# ── Matrix operations (no numpy!) ───────────────────────────
def mat_mul(A, B):
    """Multiply matrix A (m×n) by matrix B (n×p)"""
    m, n = len(A), len(A[0])
    p = len(B[0])
    C = [[0]*p for _ in range(m)]
    for i in range(m):
        for j in range(p):
            for k in range(n):
                C[i][j] += A[i][k] * B[k][j]
    return C

def mat_add(A, B):
    return [[A[i][j] + B[i][j] for j in range(len(A[0]))] for i in range(len(A))]

def transpose(A):
    return [[A[j][i] for j in range(len(A))] for i in range(len(A[0]))]

def scalar_mul(s, A):
    return [[s * A[i][j] for j in range(len(A[0]))] for i in range(len(A))]

# ── Initialise weights ──────────────────────────────────────
def rand_matrix(rows, cols, scale=1.0):
    return [[random.gauss(0, scale) for _ in range(cols)] for _ in range(rows)]

# Network: 2 → 4 (ReLU) → 1 (sigmoid)
W1 = rand_matrix(4, 2, scale=0.5)
b1 = [[0.0] for _ in range(4)]
W2 = rand_matrix(1, 4, scale=0.5)
b2 = [[0.0]]

# ── XOR dataset ─────────────────────────────────────────────
X_data = [[[0],[0]], [[0],[1]], [[1],[0]], [[1],[1]]]
y_data = [[[0]],     [[1]],     [[1]],     [[0]]]

# ── Training loop ───────────────────────────────────────────
alpha = 0.5
print("=== Training XOR ===")

for epoch in range(1001):
    total_loss = 0
    
    for x, y_true in zip(X_data, y_data):
        # ── Forward pass ────────────────────────────────────
        # Layer 1: z1 = W1·x + b1
        z1 = mat_add(mat_mul(W1, x), b1)
        a1 = [[relu(z1[i][0])] for i in range(4)]
        
        # Layer 2: z2 = W2·a1 + b2
        z2 = mat_add(mat_mul(W2, a1), b2)
        y_hat = sigmoid(z2[0][0])
        
        # Loss (BCE)
        eps = 1e-8
        y_val = y_true[0][0]
        loss = -(y_val * math.log(y_hat + eps) + (1 - y_val) * math.log(1 - y_hat + eps))
        total_loss += loss
        
        # ── Backward pass ───────────────────────────────────
        # Output delta (sigmoid + BCE simplification)
        delta2 = [[y_hat - y_val]]  # 1×1
        
        # Gradients for W2 and b2
        dW2 = mat_mul(delta2, transpose(a1))  # 1×4
        db2 = delta2  # 1×1
        
        # Propagate to hidden layer
        delta1_pre = mat_mul(transpose(W2), delta2)  # 4×1
        delta1 = [[delta1_pre[i][0] * relu_deriv(z1[i][0])] for i in range(4)]
        
        # Gradients for W1 and b1
        dW1 = mat_mul(delta1, transpose(x))  # 4×2
        db1 = delta1  # 4×1
        
        # ── Update weights ──────────────────────────────────
        W2 = mat_add(W2, scalar_mul(-alpha, dW2))
        b2 = mat_add(b2, scalar_mul(-alpha, db2))
        W1 = mat_add(W1, scalar_mul(-alpha, dW1))
        b1 = mat_add(b1, scalar_mul(-alpha, db1))
    
    if epoch % 200 == 0:
        print(f"  Epoch {epoch:4d}: loss = {total_loss:.4f}")

# ── Test ────────────────────────────────────────────────────
print(f"\n=== Predictions ===")
for x, y_true in zip(X_data, y_data):
    z1 = mat_add(mat_mul(W1, x), b1)
    a1 = [[relu(z1[i][0])] for i in range(4)]
    z2 = mat_add(mat_mul(W2, a1), b2)
    y_hat = sigmoid(z2[0][0])
    print(f"  Input: ({x[0][0]},{x[1][0]}) → {y_hat:.4f} (target: {y_true[0][0]})")
```

## Visualisation — A NumPy network learning two moons

The earlier lessons trained a tiny network on XOR. Here we tackle the
classic **"two moons"** synthetic dataset using a 2-layer NumPy
network — same forward + backward equations, but on a non-trivial,
visually intuitive problem.

```python
# ── Visualising a NumPy NN learning two interleaving moons ──
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Generate two interleaving half-moons (a small synthetic dataset
# that is famously NOT linearly separable but is easy for a 2-layer NN).
def make_moons(n=200, noise=0.15):
    n_a = n // 2
    t1 = np.linspace(0, np.pi, n_a)
    Xa = np.column_stack([np.cos(t1), np.sin(t1)])
    t2 = np.linspace(0, np.pi, n - n_a)
    Xb = np.column_stack([1 - np.cos(t2), 0.5 - np.sin(t2)])
    X = np.vstack([Xa, Xb]) + noise * rng.standard_normal((n, 2))
    y = np.array([0] * n_a + [1] * (n - n_a)).reshape(-1, 1).astype(float)
    return X, y

X, y = make_moons(n=200, noise=0.20)

# Network: 2 → 16 → 1, sigmoid output.
H = 16
W1 = rng.normal(0, 0.5, size=(H, 2))
b1 = np.zeros(H)
W2 = rng.normal(0, 0.5, size=(1, H))
b2 = np.zeros(1)

def relu(z):     return np.maximum(0, z)
def sigmoid(z):  return 1.0 / (1.0 + np.exp(-z))

LR = 0.1
losses = []
snapshots = []
N_EPOCHS = 4000
for epoch in range(N_EPOCHS):
    # Forward.
    z1 = X @ W1.T + b1
    a1 = relu(z1)
    z2 = a1 @ W2.T + b2
    a2 = sigmoid(z2)
    # Loss + grads (binary cross-entropy).
    loss = float(-np.mean(y * np.log(a2 + 1e-12) + (1 - y) * np.log(1 - a2 + 1e-12)))
    losses.append(loss)
    dz2 = a2 - y
    dW2 = dz2.T @ a1 / len(X)
    db2 = dz2.mean(axis=0)
    da1 = dz2 @ W2
    dz1 = da1 * (z1 > 0)                  # ReLU derivative
    dW1 = dz1.T @ X / len(X)
    db1 = dz1.mean(axis=0)
    W1 -= LR * dW1; b1 -= LR * db1
    W2 -= LR * dW2; b2 -= LR * db2

    if epoch in [0, 100, 1000, N_EPOCHS - 1]:
        xs = np.linspace(-2, 3, 100); ys = np.linspace(-1.5, 1.5, 100)
        XX, YY = np.meshgrid(xs, ys)
        pts = np.stack([XX.ravel(), YY.ravel()], axis=1)
        h = relu(pts @ W1.T + b1)
        out = sigmoid(h @ W2.T + b2).reshape(XX.shape)
        snapshots.append((epoch, out))

fig, axes = plt.subplots(1, len(snapshots) + 1, figsize=(20, 4))

# (1) Loss curve.
ax = axes[0]
ax.plot(losses, color="tab:blue", lw=1.4)
ax.set_xlabel("epoch"); ax.set_ylabel("BCE loss")
ax.set_title(f"NumPy NN training\nfinal loss ≈ {losses[-1]:.3f}")
ax.set_yscale("log")
ax.grid(True, which="both", alpha=0.3)

# (2..) Decision-surface snapshots over training.
for ax, (epoch, surf) in zip(axes[1:], snapshots):
    xs = np.linspace(-2, 3, 100); ys = np.linspace(-1.5, 1.5, 100)
    XX, YY = np.meshgrid(xs, ys)
    ax.contourf(XX, YY, surf, levels=20, cmap="RdBu", alpha=0.55)
    ax.contour(XX, YY, surf, levels=[0.5], colors="black", linewidths=2)
    ax.scatter(X[y[:, 0] == 0, 0], X[y[:, 0] == 0, 1], color="tab:blue",
               s=18, alpha=0.7, edgecolor="navy", lw=0.4)
    ax.scatter(X[y[:, 0] == 1, 0], X[y[:, 0] == 1, 1], color="tab:red",
               s=18, alpha=0.7, edgecolor="darkred", lw=0.4)
    ax.set_xlim(-2, 3); ax.set_ylim(-1.5, 1.5); ax.set_aspect("equal")
    ax.set_title(f"Epoch {epoch}\nloss = {losses[epoch]:.4f}")

plt.tight_layout()
plt.show()

# Final accuracy on the training set.
final_pred = sigmoid(relu(X @ W1.T + b1) @ W2.T + b2)
acc = float(np.mean((final_pred > 0.5) == y))
print(f"Trained 2-{H}-1 NumPy network on 'two moons':")
print(f"  Final loss     = {losses[-1]:.4f}")
print(f"  Final accuracy = {acc * 100:.1f}%")
print(f"  No frameworks used — just NumPy + the chain rule.")
```

**Same equations, harder problem:**

- The lesson code wires up forward and backward passes by hand. Throw a
  *real* dataset at it (two interleaving moons) and watch the network
  learn a *curved* decision boundary that perfectly separates the two
  classes after a few thousand epochs.
- Notice the boundary at epoch 0: nearly random. By epoch 100 it has
  *some* structure but still misclassifies many points. By the final
  epoch it traces the gap between the moons.
- This is what every neural-network framework is doing under the
  hood — just with *more layers*, *bigger matrices*, *GPU
  parallelism*, and *automatic differentiation* handling the chain
  rule for arbitrary architectures. The maths is identical.

## Connection to CS / Games / AI / Business / Industry

- **Understanding frameworks** — PyTorch's `nn.Linear` does exactly this: $\mathbf{Wx} + \mathbf{b}$
- **Debugging** — when shapes don't match or gradients explode, understanding the raw math helps
- **Custom layers** — building novel architectures requires knowing the forward/backward math
- **Embedded ML** — on microcontrollers, you may implement inference in raw C (same math)

## Check Your Understanding

1. **Pen & paper:** Trace the forward pass for input $(0, 1)$ through the XOR network after training.  Does it output close to 1?
2. **Pen & paper:** What happens to $\delta_1$ for neurons where $z_1 < 0$?  How does this affect learning?
3. **Think about it:** Why did we use 4 hidden neurons for XOR?  Could we solve it with 2?  What's the minimum?
4. **Code exercise:** Modify the code to use tanh instead of ReLU.  Does it still learn XOR?  Is convergence faster or slower?
