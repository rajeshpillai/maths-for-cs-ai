# Forward Pass as Matrix Multiplication Chains

## Intuition

A neural network's forward pass is just a chain of matrix multiplications
with activation functions in between.  Input → multiply by weights → add bias →
activate → repeat.  Understanding this as matrix algebra lets you reason about
shapes, debug dimension mismatches, and see why GPUs are so good at this.

## Prerequisites

- Tier 2, Lesson 4: Matrix Multiplication
- Tier 6, Lesson 1: The Neuron
- Tier 6, Lesson 2: Activation Functions

## From First Principles

### One layer

$$\mathbf{a}^{(l)} = \sigma\left(\mathbf{W}^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}\right)$$

where:
- $\mathbf{a}^{(0)} = \mathbf{x}$ (input)
- $\mathbf{W}^{(l)}$ is the weight matrix for layer $l$
- $\mathbf{b}^{(l)}$ is the bias vector
- $\sigma$ is the activation function (applied element-wise)

### Shape tracking (the most important skill)

For a network: input(3) → hidden(4) → hidden(2) → output(1):

| Layer | $\mathbf{W}$ shape | $\mathbf{b}$ shape | $\mathbf{a}$ shape |
|-------|-------|-------|-------|
| 1 | $4 \times 3$ | $4 \times 1$ | $4 \times 1$ |
| 2 | $2 \times 4$ | $2 \times 1$ | $2 \times 1$ |
| 3 | $1 \times 2$ | $1 \times 1$ | $1 \times 1$ |

**Rule:** $\mathbf{W}^{(l)}$ is $(\text{neurons in layer } l) \times (\text{neurons in layer } l-1)$.

### Total parameters

Layer 1: $4 \times 3 + 4 = 16$
Layer 2: $2 \times 4 + 2 = 10$
Layer 3: $1 \times 2 + 1 = 3$
**Total: 29 parameters**

### Pen & paper: Full forward pass

Network: 2 inputs → 2 hidden (ReLU) → 1 output (sigmoid).

$$\mathbf{W}^{(1)} = \begin{pmatrix} 0.5 & -0.3 \\ 0.2 & 0.7 \end{pmatrix}, \quad \mathbf{b}^{(1)} = \begin{pmatrix} 0.1 \\ -0.1 \end{pmatrix}$$

$$\mathbf{W}^{(2)} = \begin{pmatrix} 0.4 & 0.6 \end{pmatrix}, \quad \mathbf{b}^{(2)} = \begin{pmatrix} -0.2 \end{pmatrix}$$

Input: $\mathbf{x} = \begin{pmatrix} 1 \\ 2 \end{pmatrix}$

**Layer 1:**

$\mathbf{z}^{(1)} = \begin{pmatrix} 0.5 & -0.3 \\ 0.2 & 0.7 \end{pmatrix}\begin{pmatrix} 1 \\ 2 \end{pmatrix} + \begin{pmatrix} 0.1 \\ -0.1 \end{pmatrix} = \begin{pmatrix} -0.1 + 0.1 \\ 1.6 - 0.1 \end{pmatrix} = \begin{pmatrix} 0.0 \\ 1.5 \end{pmatrix}$

Wait, let me recompute: $0.5(1) + (-0.3)(2) = 0.5 - 0.6 = -0.1$, plus 0.1 = 0.0. And $0.2(1) + 0.7(2) = 0.2 + 1.4 = 1.6$, plus $-0.1 = 1.5$.

$\mathbf{a}^{(1)} = \text{ReLU}\begin{pmatrix} 0.0 \\ 1.5 \end{pmatrix} = \begin{pmatrix} 0 \\ 1.5 \end{pmatrix}$

**Layer 2:**

$z^{(2)} = \begin{pmatrix} 0.4 & 0.6 \end{pmatrix}\begin{pmatrix} 0 \\ 1.5 \end{pmatrix} + (-0.2) = 0 + 0.9 - 0.2 = 0.7$

$a^{(2)} = \sigma(0.7) = \frac{1}{1 + e^{-0.7}} \approx \frac{1}{1 + 0.497} = 0.668$

**Output: 0.668**

### Batch forward pass

For $B$ samples simultaneously, stack inputs as columns (or rows, depending on convention):

$$\mathbf{Z}^{(l)} = \mathbf{W}^{(l)} \mathbf{A}^{(l-1)} + \mathbf{b}^{(l)}$$

where $\mathbf{A}^{(l-1)}$ is $n_{l-1} \times B$ (each column is one sample).

This is why GPUs excel — one matrix multiplication processes the entire batch.

### The network as function composition

$$f(\mathbf{x}) = \sigma_3(\mathbf{W}^{(3)} \cdot \sigma_2(\mathbf{W}^{(2)} \cdot \sigma_1(\mathbf{W}^{(1)}\mathbf{x} + \mathbf{b}^{(1)}) + \mathbf{b}^{(2)}) + \mathbf{b}^{(3)})$$

Without activations: $f(\mathbf{x}) = \mathbf{W}^{(3)}\mathbf{W}^{(2)}\mathbf{W}^{(1)}\mathbf{x}$ — this collapses to a single matrix $\mathbf{W} = \mathbf{W}^{(3)}\mathbf{W}^{(2)}\mathbf{W}^{(1)}$.

**Activations are essential** for the network to learn non-linear functions.

## Python Verification

```python
# ── Forward Pass: verifying pen & paper work ────────────────
import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

def relu(z):
    return max(0, z)

# Network: 2 → 2 (ReLU) → 1 (sigmoid)
W1 = [[0.5, -0.3], [0.2, 0.7]]
b1 = [0.1, -0.1]
W2 = [[0.4, 0.6]]
b2 = [-0.2]

x = [1, 2]

# Layer 1
print("=== Forward pass ===")
z1 = [sum(W1[i][j] * x[j] for j in range(2)) + b1[i] for i in range(2)]
a1 = [relu(z) for z in z1]
print(f"Input: {x}")
print(f"z1 = {z1}")
print(f"a1 = ReLU(z1) = {a1}")

# Layer 2
z2 = [sum(W2[i][j] * a1[j] for j in range(2)) + b2[i] for i in range(1)]
a2 = [sigmoid(z) for z in z2]
print(f"z2 = {z2}")
print(f"a2 = σ(z2) = {[f'{a:.4f}' for a in a2]}")

# Parameter count
print(f"\n=== Parameter count ===")
# 2→2: W=4, b=2; 2→1: W=2, b=1
params = 4 + 2 + 2 + 1
print(f"Total parameters: {params}")

# Shape tracking for larger network
print(f"\n=== Shape tracking: 784 → 128 → 64 → 10 ===")
layers = [(128, 784), (64, 128), (10, 64)]
total = 0
for i, (out_dim, in_dim) in enumerate(layers):
    w_params = out_dim * in_dim
    b_params = out_dim
    total += w_params + b_params
    print(f"  Layer {i+1}: W={out_dim}×{in_dim}={w_params}, b={b_params}, subtotal={w_params+b_params}")
print(f"  Total: {total:,} parameters")

# Why activations matter: without them, layers collapse
print(f"\n=== Without activations: layers collapse ===")
# W2 · W1 = single matrix
W1_flat = [[0.5, -0.3], [0.2, 0.7]]
W2_flat = [[0.4, 0.6]]

# W2 @ W1
W_combined = [[sum(W2_flat[i][k] * W1_flat[k][j] for k in range(2)) for j in range(2)] for i in range(1)]
print(f"W1 = {W1_flat}")
print(f"W2 = {W2_flat}")
print(f"W2·W1 = {W_combined}")
print(f"Two linear layers = one linear layer with W = W2·W1")
```

## Connection to CS / Games / AI

- **GPU parallelism** — the forward pass is matrix multiplication, which GPUs do in parallel
- **MNIST** — 784 inputs (28×28 pixels) → hidden → 10 outputs (digits 0-9)
- **Shape debugging** — "RuntimeError: mat1 and mat2 shapes cannot be multiplied" is the #1 PyTorch error
- **Model size** — GPT-3 has 175 billion parameters; knowing how to count them matters
- **Inference speed** — forward pass speed = matrix multiply speed; this drives hardware design

## Check Your Understanding

1. **Pen & paper:** Network: 3 inputs → 2 hidden (tanh) → 1 output (sigmoid).  If $\mathbf{W}^{(1)} = \begin{pmatrix} 1 & 0 & -1 \\ 0 & 1 & 1 \end{pmatrix}$, $\mathbf{b}^{(1)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$, $\mathbf{W}^{(2)} = \begin{pmatrix} 1 & -1 \end{pmatrix}$, $\mathbf{b}^{(2)} = (0)$.  Compute the output for $\mathbf{x} = (1, 0, 1)$.
2. **Pen & paper:** How many parameters in a network: 100 → 50 → 20 → 10?
3. **Pen & paper:** If input is $28 \times 28$ (MNIST), we flatten to 784.  First hidden layer has 256 neurons.  What is the shape of $\mathbf{W}^{(1)}$?  How many parameters (including bias)?
4. **Think about it:** Why does processing a batch of 32 samples take roughly the same time as processing 1 sample on a GPU?
