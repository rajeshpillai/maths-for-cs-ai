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

## Connection to CS / Games / AI

- **PyTorch** — the most popular research framework; used for GPT, Stable Diffusion, AlphaFold
- **TensorFlow/JAX** — same math, different API; JAX emphasises functional transforms
- **ONNX** — export trained models to a framework-independent format for deployment
- **Model deployment** — inference is just the forward pass (no backward pass needed)
- **Transfer learning** — load pre-trained weights, modify last layers, fine-tune

## Check Your Understanding

1. **Pen & paper:** In PyTorch, `nn.Linear(100, 50)` creates a layer.  What is the shape of the weight matrix?  How many total parameters (including bias)?
2. **Pen & paper:** Why does `optimizer.zero_grad()` need to be called before each `loss.backward()`?  What would happen if you skipped it?
3. **Think about it:** Our scratch implementation processes one sample at a time.  How would you modify it to process a batch of 4 samples simultaneously?  (Hint: make $\mathbf{X}$ a $2 \times 4$ matrix.)
4. **Think about it:** You've now derived everything from first principles.  When would you still prefer the scratch implementation over PyTorch?
