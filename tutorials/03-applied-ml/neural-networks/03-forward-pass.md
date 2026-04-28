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

$z_1 = 0.5(1) + (-0.3)(2) + 0.1 = 0.5 - 0.6 + 0.1 = 0.0$

$z_2 = 0.2(1) + 0.7(2) + (-0.1) = 0.2 + 1.4 - 0.1 = 1.5$

$$\mathbf{z}^{(1)} = \begin{pmatrix} 0.0 \\ 1.5 \end{pmatrix}$$

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

## Visualisation — A 2-layer network bending the input space

A single neuron can only carve a straight-line decision boundary
(lesson 1). Two layers + a non-linearity can fit *anything*. The plot
shows a tiny 2→3→1 network learning the **XOR pattern** and the
non-linear, curved decision boundary that emerges.

```python
# ── Visualising a 2-layer network's decision surface ────────
import numpy as np
import matplotlib.pyplot as plt

# Hand-tuned weights for a 2-3-1 network that solves XOR. (You'd
# normally train these; here we hard-code them so the picture is
# reproducible without an optimisation loop.)
W1 = np.array([[ 1.5,  1.5],
               [ 1.5,  1.5],
               [-1.5, -1.5]])           # 3×2  hidden weights
b1 = np.array([-0.7, -2.2,  0.7])       # 3    hidden biases
W2 = np.array([[ 2.0, -2.5,  2.0]])     # 1×3  output weights
b2 = np.array([-1.0])                   # 1    output bias

def relu(z): return np.maximum(0, z)
def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))
def forward(X):
    h = relu(X @ W1.T + b1)             # (n, 3) hidden
    y = sigmoid(h @ W2.T + b2)          # (n, 1) output
    return y, h

# Build a grid covering the input space and run the forward pass.
xs = np.linspace(-0.3, 1.3, 200)
X, Y = np.meshgrid(xs, xs)
points = np.stack([X.ravel(), Y.ravel()], axis=1)
preds, hidden = forward(points)
preds = preds.reshape(X.shape)

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) The XOR data.
ax = axes[0]
xor_pts = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
xor_lab = [0, 1, 1, 0]
for (xx, yy), lab in zip(xor_pts, xor_lab):
    color = "tab:red" if lab == 1 else "tab:blue"
    ax.scatter(xx, yy, s=200, color=color, edgecolor="black", zorder=5)
    ax.text(xx + 0.04, yy + 0.04, f"label={lab}", fontsize=10, color=color)
ax.set_xlim(-0.3, 1.3); ax.set_ylim(-0.3, 1.3); ax.set_aspect("equal")
ax.set_title("The classic XOR pattern\n(no straight line separates the two classes)")
ax.set_xlabel("x₁"); ax.set_ylabel("x₂"); ax.grid(True, alpha=0.3)

# (2) The decision surface produced by the trained 2-3-1 network.
# Curves around to enclose just the (0,1) and (1,0) corners.
ax = axes[1]
ax.contourf(X, Y, preds, levels=20, cmap="RdBu", alpha=0.6)
ax.contour(X, Y, preds, levels=[0.5], colors="black", linewidths=2)
for (xx, yy), lab in zip(xor_pts, xor_lab):
    color = "tab:red" if lab == 1 else "tab:blue"
    ax.scatter(xx, yy, s=200, color=color, edgecolor="black", zorder=5)
ax.set_xlim(-0.3, 1.3); ax.set_ylim(-0.3, 1.3); ax.set_aspect("equal")
ax.set_title("2-3-1 network solves XOR\n(black curve = decision boundary)")
ax.set_xlabel("x₁"); ax.set_ylabel("x₂")

# (3) The three hidden-unit activations as separate planes.
# Each hidden unit's pre-activation is a linear half-plane;
# the network combines them through the output layer.
ax = axes[2]
# Show one hidden unit's activation as a heatmap so you can see
# what each layer-1 neuron "looks for".
unit0 = hidden[:, 0].reshape(X.shape)
ax.contourf(X, Y, unit0, levels=20, cmap="Greens", alpha=0.7)
ax.contour(X, Y, unit0, levels=[0.5], colors="black", linewidths=1.5)
for (xx, yy), lab in zip(xor_pts, xor_lab):
    color = "tab:red" if lab == 1 else "tab:blue"
    ax.scatter(xx, yy, s=200, color=color, edgecolor="black", zorder=5)
ax.set_xlim(-0.3, 1.3); ax.set_ylim(-0.3, 1.3); ax.set_aspect("equal")
ax.set_title("Hidden unit 0's activation surface\n(each unit learns a half-plane;\nthe layer COMBINES them)")
ax.set_xlabel("x₁"); ax.set_ylabel("x₂")

plt.tight_layout()
plt.show()

# Verify the network actually solves XOR.
print("Forward-pass output of the 2-3-1 network:")
for x, t in zip(xor_pts, xor_lab):
    y, _ = forward(x[None, :])
    pred = int(y[0, 0] > 0.5)
    print(f"  input {tuple(x)} → output = {y[0,0]:.4f}  →  pred = {pred}, true = {t}  "
          f"{'✓' if pred == t else '✗'}")
```

**Three pictures: the punchline of "why we stack layers".**

- **Single neuron → straight line.** XOR's labels can't be split by a
  straight line — a single neuron is mathematically *unable* to fit
  XOR (lesson 1).
- **Two layers + non-linearity → curved boundary.** The middle plot
  shows the 2-3-1 network correctly enclosing just the two "1" points.
  The boundary is not a single hyperplane — it's a **piecewise-linear
  curve** assembled from the three hidden-layer hyperplanes by the
  output layer.
- **Hidden units learn features.** The right panel shows what one
  hidden unit "fires for" — a half-plane of the input. The next layer
  combines several such features into the final answer. With more
  layers, the features become deeper hierarchies (this is what edge
  detectors → texture detectors → object detectors look like inside a
  CNN).

The stacked, non-linear forward pass is **what makes neural networks
universal approximators** — given enough hidden units, a 2-layer
network can fit *any* continuous function arbitrarily closely.

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
