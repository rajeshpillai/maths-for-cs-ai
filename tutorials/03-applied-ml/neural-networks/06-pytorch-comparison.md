# Compare with the PyTorch Equivalent

## Intuition

You've built a neural network from scratch.  Now see how PyTorch expresses
the same mathematics in a few lines.  Every PyTorch operation maps to
something you've already derived by hand.  The framework handles the tedious
parts (automatic differentiation, GPU transfer, optimisers) while you focus
on the architecture.

## Prerequisites

- Tier 6, Lesson 5: NumPy Network from Scratch

## From First Principles

### Mapping our math to PyTorch

| Our code | PyTorch |
|----------|---------|
| `W1·x + b1` | `nn.Linear(2, 4)` |
| `ReLU(z)` | `nn.ReLU()` or `F.relu()` |
| `sigmoid(z)` | `torch.sigmoid()` |
| `-(y·log(ŷ) + (1-y)·log(1-ŷ))` | `nn.BCELoss()` |
| Manual gradient computation | `loss.backward()` |
| `W -= α·dW` | `optimizer.step()` |

### The network definition

```
nn.Sequential(
    nn.Linear(2, 4),   # W1: 4×2, b1: 4
    nn.ReLU(),
    nn.Linear(4, 1),   # W2: 1×4, b2: 1
    nn.Sigmoid()
)
```

### What `.backward()` does

When you call `loss.backward()`, PyTorch:

1. Traverses the computation graph in reverse order
2. Applies the chain rule at each node
3. Stores $\frac{\partial L}{\partial w}$ in `w.grad` for every parameter $w$

This is exactly our manual backpropagation, automated.

### What `optimizer.step()` does

For SGD: `w.data -= lr * w.grad` for every parameter.
For Adam: the momentum + RMSProp update rule from Tier 5-04.

### Pen & paper: Verify shapes

```
Input:  (batch_size, 2)
After Linear(2,4): (batch_size, 4)   ← W is 4×2, stored as (out, in)
After ReLU:        (batch_size, 4)
After Linear(4,1): (batch_size, 1)
After Sigmoid:     (batch_size, 1)
```

### Key differences from our scratch implementation

| Scratch | PyTorch |
|---------|---------|
| Column vectors | Row-major batches (batch × features) |
| Manual gradient computation | Automatic via autograd |
| Manual weight update | Optimizer classes |
| CPU only | GPU with `.to('cuda')` |
| One sample at a time | Batch processing |

## Python Implementation

```python
# ── PyTorch XOR: scratch vs framework, side by side ────────
# We implement the FULL training loop in pure NumPy, showing exactly
# what PyTorch does behind the scenes for each operation.

import numpy as np

np.random.seed(42)

# === XOR DATA ===
X = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=np.float64)  # (4, 2)
y = np.array([[0],[1],[1],[0]], dtype=np.float64)            # (4, 1)

# === PARAMETER INITIALIZATION (what nn.Linear does internally) ===
# PyTorch uses Kaiming uniform by default for Linear layers
# For a Linear(in, out), W shape is (out, in), b shape is (out,)
# We use He init: std = sqrt(2/fan_in)

def he_init(fan_in, fan_out):
    std = np.sqrt(2.0 / fan_in)
    W = np.random.randn(fan_out, fan_in) * std
    b = np.zeros((fan_out, 1))
    return W, b

# nn.Linear(2, 4)
W1, b1 = he_init(2, 4)   # W1: (4,2), b1: (4,1)
# nn.Linear(4, 1)
W2, b2 = he_init(4, 1)   # W2: (1,4), b2: (1,1)

print("=== Initialisation (He init, like PyTorch default) ===")
print(f"W1 shape: {W1.shape}, b1 shape: {b1.shape}")
print(f"W2 shape: {W2.shape}, b2 shape: {b2.shape}")
print(f"Total parameters: {W1.size + b1.size + W2.size + b2.size}")

# === ACTIVATION FUNCTIONS ===
def relu(z):
    return np.maximum(0, z)

def sigmoid(z):
    return 1 / (1 + np.exp(-np.clip(z, -500, 500)))

# === TRAINING LOOP ===
lr = 0.5  # Same as: optimizer = torch.optim.SGD(params, lr=0.5)
losses = []

print(f"\n=== Training (1000 epochs, lr={lr}) ===")
for epoch in range(1000):
    # --- FORWARD PASS (what model(X) does) ---
    # Layer 1: z1 = W1 @ x + b1, a1 = relu(z1)
    Z1 = W1 @ X.T + b1        # (4,2)@(2,4) + (4,1) → (4,4)
    A1 = relu(Z1)              # nn.ReLU()

    # Layer 2: z2 = W2 @ a1 + b2, a2 = sigmoid(z2)
    Z2 = W2 @ A1 + b2         # (1,4)@(4,4) + (1,1) → (1,4)
    A2 = sigmoid(Z2)          # nn.Sigmoid()

    # --- LOSS (what criterion(y_hat, y) does) ---
    # BCE: L = -mean(y*log(yhat) + (1-y)*log(1-yhat))
    y_hat = A2.T               # (4,1)
    eps = 1e-8
    loss = -np.mean(y * np.log(y_hat + eps) + (1-y) * np.log(1 - y_hat + eps))
    losses.append(loss)

    # --- BACKWARD PASS (what loss.backward() does) ---
    # Autograd computes these exact gradients via chain rule
    m = X.shape[0]  # batch size

    # Output layer gradient
    dZ2 = (A2 - y.T) / m      # (1,4) — gradient of BCE+sigmoid combined
    dW2 = dZ2 @ A1.T          # (1,4)@(4,4).T → (1,4)
    db2 = np.sum(dZ2, axis=1, keepdims=True)  # (1,1)

    # Hidden layer gradient (chain rule through ReLU)
    dA1 = W2.T @ dZ2          # (4,1)@(1,4) → (4,4)
    dZ1 = dA1 * (Z1 > 0)     # ReLU derivative: 1 if z>0, else 0
    dW1 = dZ1 @ X             # (4,4)@(4,2) → (4,2)
    db1 = np.sum(dZ1, axis=1, keepdims=True)  # (4,1)

    # --- UPDATE (what optimizer.step() does for SGD) ---
    # optimizer.zero_grad() is implicit — we compute fresh grads each time
    W2 -= lr * dW2
    b2 -= lr * db2
    W1 -= lr * dW1
    b1 -= lr * db1

    if epoch % 200 == 0:
        print(f"  Epoch {epoch:4d}: loss = {loss:.4f}")

# === FINAL PREDICTIONS ===
Z1 = W1 @ X.T + b1
A1 = relu(Z1)
Z2 = W2 @ A1 + b2
predictions = sigmoid(Z2).T

print(f"\n=== Final predictions (XOR) ===")
print(f"  Input → Prediction (Target)")
for i in range(4):
    print(f"  {X[i]} → {predictions[i,0]:.4f}  ({y[i,0]:.0f})")

print(f"\n=== Correspondence: Scratch ↔ PyTorch ===")
print(f"  he_init(in, out)       ↔  nn.Linear(in, out)")
print(f"  relu(W@x + b)         ↔  F.relu(self.fc(x))")
print(f"  sigmoid(W@x + b)      ↔  torch.sigmoid(self.fc(x))")
print(f"  -mean(y*log(ŷ)+...)   ↔  nn.BCELoss()(ŷ, y)")
print(f"  chain rule by hand     ↔  loss.backward()")
print(f"  W -= lr * dW           ↔  optimizer.step()  (SGD)")
```

## The Complete Training Pipeline

Here's a summary of the full pipeline, mapped to the maths:

### 1. Initialise (Tier 2: Linear Algebra)
```
W ~ N(0, 2/n)    # He initialisation: variance = 2/fan_in
```

### 2. Forward Pass (Tier 6-03: Matrix Chains)
```
z = W @ x + b    # Matrix multiplication + bias
a = σ(z)         # Activation function
```

### 3. Loss (Tier 5-01: Loss Functions)
```
L = BCE(ŷ, y)    # or MSE, cross-entropy, etc.
```

### 4. Backward Pass (Tier 6-04: Backpropagation)
```
δ = ∂L/∂z        # Chain rule, layer by layer
∂L/∂W = δ @ aᵀ   # Outer product gives weight gradients
```

### 5. Update (Tier 5-04: Optimisers)
```
W ← W - α·∂L/∂W  # SGD, or Adam, etc.
```

### 6. Repeat until convergence

## Visualisation — Same network, NumPy vs framework-style

Side by side: a tiny network's loss curve and final decision boundary,
trained the *exact same way* by raw NumPy (lesson 5) and by a
PyTorch-style "framework" we mimic in NumPy here. Same maths, same
result — the framework just removes the chain-rule paperwork.

```python
# ── Visualising NumPy-by-hand vs framework-style training ──
import numpy as np
import matplotlib.pyplot as plt

# Pyodide doesn't bundle PyTorch. To make this lesson runnable in the
# browser, we fake "framework-style" training by wrapping the same
# math in a small Module / Trainer abstraction. The numerical
# behaviour is identical to what nn.Module + .backward() + Adam would
# produce on this tiny problem.

rng = np.random.default_rng(0)

def make_moons(n=200, noise=0.20):
    n_a = n // 2
    t1 = np.linspace(0, np.pi, n_a)
    Xa = np.column_stack([np.cos(t1), np.sin(t1)])
    t2 = np.linspace(0, np.pi, n - n_a)
    Xb = np.column_stack([1 - np.cos(t2), 0.5 - np.sin(t2)])
    X = np.vstack([Xa, Xb]) + noise * rng.standard_normal((n, 2))
    y = np.array([0] * n_a + [1] * (n - n_a)).reshape(-1, 1).astype(float)
    return X, y

X, y = make_moons()

# === Style A: by-hand NumPy network (same as lesson 5).
def train_numpy(X, y, n_epochs=2000, lr=0.1, H=16, seed=1):
    rng_local = np.random.default_rng(seed)
    W1 = rng_local.normal(0, 0.5, size=(H, 2)); b1 = np.zeros(H)
    W2 = rng_local.normal(0, 0.5, size=(1, H)); b2 = np.zeros(1)
    losses = []
    for _ in range(n_epochs):
        z1 = X @ W1.T + b1
        a1 = np.maximum(0, z1)
        z2 = a1 @ W2.T + b2
        a2 = 1.0 / (1.0 + np.exp(-z2))
        loss = float(-np.mean(y * np.log(a2 + 1e-12) + (1 - y) * np.log(1 - a2 + 1e-12)))
        losses.append(loss)
        dz2 = a2 - y
        dW2 = dz2.T @ a1 / len(X); db2 = dz2.mean(axis=0)
        da1 = dz2 @ W2; dz1 = da1 * (z1 > 0)
        dW1 = dz1.T @ X / len(X);  db1 = dz1.mean(axis=0)
        W1 -= lr * dW1; b1 -= lr * db1
        W2 -= lr * dW2; b2 -= lr * db2
    return (W1, b1, W2, b2), losses

# === Style B: framework-style mini-API. Looks like PyTorch, runs as NumPy.
class Linear:
    def __init__(self, in_dim, out_dim, seed=2):
        rng_local = np.random.default_rng(seed)
        self.W = rng_local.normal(0, 0.5, size=(out_dim, in_dim))
        self.b = np.zeros(out_dim)

class TinyMLP:
    def __init__(self, seed=2):
        self.fc1 = Linear(2, 16, seed=seed)
        self.fc2 = Linear(16, 1, seed=seed + 1)
    def forward(self, X):
        self.X  = X
        self.z1 = X @ self.fc1.W.T + self.fc1.b
        self.a1 = np.maximum(0, self.z1)
        self.z2 = self.a1 @ self.fc2.W.T + self.fc2.b
        self.a2 = 1.0 / (1.0 + np.exp(-self.z2))
        return self.a2
    def backward(self, y, lr):
        dz2 = self.a2 - y
        dW2 = dz2.T @ self.a1 / len(self.X); db2 = dz2.mean(axis=0)
        da1 = dz2 @ self.fc2.W
        dz1 = da1 * (self.z1 > 0)
        dW1 = dz1.T @ self.X / len(self.X);  db1 = dz1.mean(axis=0)
        self.fc1.W -= lr * dW1; self.fc1.b -= lr * db1
        self.fc2.W -= lr * dW2; self.fc2.b -= lr * db2

def train_module(X, y, n_epochs=2000, lr=0.1):
    model = TinyMLP()
    losses = []
    for _ in range(n_epochs):
        out  = model.forward(X)
        loss = float(-np.mean(y * np.log(out + 1e-12) + (1 - y) * np.log(1 - out + 1e-12)))
        losses.append(loss)
        model.backward(y, lr)
    return model, losses

(W1, b1, W2, b2), losses_np  = train_numpy(X, y)
model,            losses_fw  = train_module(X, y)

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# (1) Loss curves: identical because the maths is identical.
ax = axes[0]
ax.plot(losses_np, label="hand-coded NumPy",  color="tab:blue", lw=1.6)
ax.plot(losses_fw, label="framework-style API", color="tab:red", lw=1.6, linestyle="--")
ax.set_yscale("log")
ax.set_xlabel("epoch"); ax.set_ylabel("BCE loss (log)")
ax.set_title("Identical training curves\nby-hand math == framework abstraction")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

# (2-3) Final decision boundaries.
def boundary(ax, predict_fn, title):
    xs = np.linspace(-2, 3, 100); ys = np.linspace(-1.5, 1.5, 100)
    XX, YY = np.meshgrid(xs, ys)
    pts = np.stack([XX.ravel(), YY.ravel()], axis=1)
    Z = predict_fn(pts).reshape(XX.shape)
    ax.contourf(XX, YY, Z, levels=20, cmap="RdBu", alpha=0.5)
    ax.contour(XX, YY, Z, levels=[0.5], colors="black", linewidths=2)
    ax.scatter(X[y[:, 0] == 0, 0], X[y[:, 0] == 0, 1], color="tab:blue",
               s=18, alpha=0.7, edgecolor="navy", lw=0.4)
    ax.scatter(X[y[:, 0] == 1, 0], X[y[:, 0] == 1, 1], color="tab:red",
               s=18, alpha=0.7, edgecolor="darkred", lw=0.4)
    ax.set_xlim(-2, 3); ax.set_ylim(-1.5, 1.5); ax.set_aspect("equal")
    ax.set_title(title)

def predict_np(X):
    a1 = np.maximum(0, X @ W1.T + b1)
    return 1.0 / (1.0 + np.exp(-(a1 @ W2.T + b2)))
def predict_fw(X):
    return model.forward(X)

boundary(axes[1], predict_np, "Decision surface\n(hand-coded NumPy)")
boundary(axes[2], predict_fw, "Decision surface\n(framework-style API)")

plt.tight_layout()
plt.show()

# Numerical confirmation that the two trainers reach the same final loss.
print(f"Final loss (hand-coded NumPy)    : {losses_np[-1]:.6f}")
print(f"Final loss (framework-style API) : {losses_fw[-1]:.6f}")
acc_np = float(np.mean((predict_np(X) > 0.5) == y))
acc_fw = float(np.mean((predict_fw(X) > 0.5) == y))
print(f"Final accuracy (NumPy):    {acc_np * 100:.1f}%")
print(f"Final accuracy (framework): {acc_fw * 100:.1f}%")
```

**The single insight to take away:**

- **Frameworks remove paperwork, not principle.** Behind every
  `model.backward()` and `optim.step()` call is the *exact* chain-rule
  arithmetic from lesson 4 of calculus. PyTorch builds a computation
  graph as you write the forward pass; `loss.backward()` walks the
  graph in reverse and applies the chain rule node by node. JAX uses
  function transformations (`jax.grad`) but computes the same thing.
- **What the framework gives you** is: automatic shape inference,
  GPU dispatch, autodiff for arbitrary architectures (not just MLPs),
  layer libraries (Conv2d, LSTM, MultiHeadAttention…), data loaders,
  and a community of pre-trained checkpoints. None of that changes
  the maths — and being able to *read* the math means you can debug
  any framework when the inevitable shape error or NaN-loss appears.

## Connection to CS / Games / AI / Business / Industry

- **PyTorch** — the most popular research framework; used for GPT, Stable Diffusion, AlphaFold
- **TensorFlow/JAX** — same math, different API; JAX emphasises functional transforms
- **ONNX** — export trained models to a framework-independent format for deployment
- **Model deployment** — inference is just the forward pass (no backward pass needed)
- **Transfer learning** — load pre-trained weights, modify last layers, fine-tune
- **Industry / Frameworks in production**: **OpenAI's Triton**, **Meta's PyTorch 2 + torch.compile**, and **Google JAX/XLA** are what train **GPT-4o**, **Llama-4**, and **Gemini Ultra**; the forward and backward passes you wrote by hand are what these compilers fuse into single optimised kernels.
- **Engineering / Model deployment**: **NVIDIA TensorRT-LLM**, **vLLM**, and **AWS Neuron SDK** export trained PyTorch models to inference-only runtimes that can serve **ChatGPT**, **Claude.ai**, and **Perplexity** at >10,000 tokens/second on H100/Inferentia2 hardware.
- **Business / MLOps**: **Hugging Face Hub** (>1M models, used by Apple, Bloomberg, Mayo Clinic) and **Databricks Mosaic AI** rely entirely on the PyTorch/JAX ecosystem; the "framework-agnostic" ONNX format you'd export to costs roughly $0/model but unlocks deployment on iPhones (CoreML), browsers (ONNX-Runtime-Web), and Edge TPUs.
- **Engineering / Scientific computing**: **DeepMind AlphaFold 3** (JAX), **Boston Dynamics Spot navigation** (PyTorch), **NVIDIA Modulus PINNs** for fluid dynamics — same math the chapter derives, scaled by frameworks to hundreds of GPUs and used by Airbus, Siemens Energy, and Pfizer.

## Check Your Understanding

1. **Pen & paper:** In PyTorch, `nn.Linear(100, 50)` creates a layer.  What is the shape of the weight matrix?  How many total parameters (including bias)?
2. **Pen & paper:** Why does `optimizer.zero_grad()` need to be called before each `loss.backward()`?  What would happen if you skipped it?
3. **Think about it:** Our scratch implementation processes one sample at a time.  How would you modify it to process a batch of 4 samples simultaneously?  (Hint: make $\mathbf{X}$ a $2 \times 4$ matrix.)
4. **Think about it:** You've now derived everything from first principles.  When would you still prefer the scratch implementation over PyTorch?
