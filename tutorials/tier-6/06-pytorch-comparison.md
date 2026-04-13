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
# ── PyTorch XOR: same network, framework style ─────────────
# NOTE: This requires PyTorch. If running in browser (Pyodide),
# this won't work — use the pure Python version from Lesson 05.

# Here's what the PyTorch code looks like:
#
# import torch
# import torch.nn as nn
#
# # Same architecture as our scratch version
# model = nn.Sequential(
#     nn.Linear(2, 4),
#     nn.ReLU(),
#     nn.Linear(4, 1),
#     nn.Sigmoid()
# )
#
# # Same loss and optimizer
# criterion = nn.BCELoss()
# optimizer = torch.optim.SGD(model.parameters(), lr=0.5)
#
# # Same data
# X = torch.tensor([[0,0],[0,1],[1,0],[1,1]], dtype=torch.float32)
# y = torch.tensor([[0],[1],[1],[0]], dtype=torch.float32)
#
# # Training loop — compare to our 30-line backward pass!
# for epoch in range(1000):
#     y_hat = model(X)                    # Forward pass
#     loss = criterion(y_hat, y)          # Compute loss
#     optimizer.zero_grad()               # Clear old gradients
#     loss.backward()                     # Backpropagation
#     optimizer.step()                    # Update weights
#
# # Test
# with torch.no_grad():
#     predictions = model(X)
#     print(predictions)

# Since Pyodide doesn't have PyTorch, let's demonstrate the
# MAPPING between our scratch code and what PyTorch does:

print("=== Mapping: Scratch vs PyTorch ===")
print()
print("FORWARD PASS:")
print("  Scratch: z1 = mat_mul(W1, x) + b1;  a1 = relu(z1)")
print("  PyTorch: a1 = F.relu(self.fc1(x))")
print("  → Same math: W@x + b, then ReLU element-wise")
print()
print("LOSS:")
print("  Scratch: -(y*log(y_hat) + (1-y)*log(1-y_hat))")
print("  PyTorch: criterion = nn.BCELoss(); loss = criterion(y_hat, y)")
print("  → Same formula, numerically stable implementation")
print()
print("BACKWARD PASS:")
print("  Scratch: delta2 = y_hat - y")
print("           dW2 = delta2 @ a1.T")
print("           delta1 = W2.T @ delta2 * relu_deriv(z1)")
print("           dW1 = delta1 @ x.T")
print("  PyTorch: loss.backward()")
print("  → Autograd applies chain rule on computation graph")
print()
print("UPDATE:")
print("  Scratch: W -= alpha * dW")
print("  PyTorch: optimizer.step()")
print("  → For SGD: identical. For Adam: adds momentum + adaptive rates")
print()

print("=== Parameter count comparison ===")
print("Layer 1 (Linear 2→4): weights=8, biases=4, total=12")
print("Layer 2 (Linear 4→1): weights=4, biases=1, total=5")
print("Grand total: 17 parameters")
print()
print("PyTorch: sum(p.numel() for p in model.parameters()) → 17")

print()
print("=== What PyTorch adds beyond our scratch code ===")
print("1. Automatic differentiation (no manual backward pass)")
print("2. GPU acceleration (move tensors to CUDA)")
print("3. Built-in optimizers (Adam, SGD, AdamW, etc.)")
print("4. DataLoader for batching and shuffling")
print("5. Numerical stability (log-sum-exp tricks)")
print("6. Gradient clipping, learning rate scheduling")
print("7. Model saving/loading (state_dict)")
print("8. Pre-built layers (Conv2d, LSTM, Transformer, etc.)")
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
