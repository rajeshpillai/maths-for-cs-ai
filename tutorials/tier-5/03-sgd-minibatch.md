# Stochastic Gradient Descent and Mini-Batches

## Intuition

Batch gradient descent processes the **entire** dataset before taking one step.
With millions of data points, that's painfully slow.  **SGD** takes a step
after each single sample.  **Mini-batch SGD** is the practical middle ground:
take a step after a small batch (e.g., 32 samples).  It's noisier but much
faster, and the noise actually helps escape local minima.

## Prerequisites

- Tier 5, Lesson 2: Gradient Descent
- Tier 4, Lesson 6: Central Limit Theorem (why mini-batch means are approximately normal)

## From First Principles

### The spectrum

| Method | Batch size | Gradient estimate | Steps per epoch |
|--------|-----------|------------------|-----------------|
| Batch GD | $n$ (all data) | Exact | 1 |
| Mini-batch SGD | $B$ (e.g., 32) | Approximate | $n/B$ |
| SGD | 1 | Very noisy | $n$ |

### Why does a noisy gradient work?

The mini-batch gradient is an **unbiased estimate** of the true gradient:

$$E[\nabla L_B] = \nabla L$$

By the Central Limit Theorem, the estimation error is approximately:

$$\text{SE} \propto \frac{\sigma}{\sqrt{B}}$$

With $B = 32$: roughly $\frac{1}{\sqrt{32}} \approx 18\%$ of the single-sample noise.

### The algorithm

```
For each epoch:
    Shuffle the dataset
    Split into mini-batches of size B
    For each mini-batch:
        g = (1/B) Σ ∇ℓᵢ(θ)    // gradient on the batch
        θ ← θ - α·g           // update
```

### Pen & paper: SGD with batch size 1

Data: $(x, y)$ = $(1, 2), (2, 4), (3, 6)$.  Model: $\hat{y} = wx$.  Loss: MSE.

Start $w = 0$, $\alpha = 0.1$.

**Sample 1:** $(1, 2)$. $\hat{y} = 0$, error $= 0 - 2 = -2$.
$\nabla = 2(0 - 2) \times 1 = -4$. $w \leftarrow 0 + 0.4 = 0.4$.

**Sample 2:** $(2, 4)$. $\hat{y} = 0.8$, error $= -3.2$.
$\nabla = 2(-3.2) \times 2 = -12.8$. $w \leftarrow 0.4 + 1.28 = 1.68$.

**Sample 3:** $(3, 6)$. $\hat{y} = 5.04$, error $= -0.96$.
$\nabla = 2(-0.96) \times 3 = -5.76$. $w \leftarrow 1.68 + 0.576 = 2.256$.

After 1 epoch: $w = 2.256$ (target: 2).  Noisy but making progress!

### Mini-batch size trade-offs

| Smaller batches | Larger batches |
|----------------|---------------|
| More steps per epoch | Fewer steps |
| Noisier gradients | Smoother gradients |
| Better generalisation (noise = regularisation) | More stable convergence |
| Lower memory | Higher memory |
| Can escape local minima | May get stuck |

Common batch sizes: **32, 64, 128, 256**.

### Learning rate and batch size

Rule of thumb: if you double the batch size, multiply the learning rate by $\sqrt{2}$ (or 2, depending on the paper).

**Linear scaling rule:** $\alpha_B = \alpha_1 \times B$ (used in large-batch training).

### Epoch vs iteration

- **Iteration (step):** One parameter update (one mini-batch)
- **Epoch:** One full pass through the dataset

With 1000 samples and batch size 32: $\lceil 1000/32 \rceil = 32$ iterations per epoch.

## Python Verification

```python
# ── SGD & Mini-Batch: verifying pen & paper work ────────────
import random

# Data: y = 2x (perfect linear)
X = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Y = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
n = len(X)

# SGD (batch size 1)
print("=== SGD (batch size 1) ===")
random.seed(42)
w = 0.0
alpha = 0.01
for epoch in range(5):
    indices = list(range(n))
    random.shuffle(indices)
    for i in indices:
        grad = 2 * (w * X[i] - Y[i]) * X[i]
        w -= alpha * grad
    loss = sum((w*x - y)**2 for x, y in zip(X, Y)) / n
    print(f"  epoch {epoch}: w={w:.4f}, loss={loss:.6f}")

# Mini-batch SGD (batch size 4)
print(f"\n=== Mini-batch SGD (batch size 4) ===")
w = 0.0
alpha = 0.01
B = 4
for epoch in range(5):
    indices = list(range(n))
    random.shuffle(indices)
    for start in range(0, n, B):
        batch = indices[start:start+B]
        grad = sum(2 * (w * X[i] - Y[i]) * X[i] for i in batch) / len(batch)
        w -= alpha * grad
    loss = sum((w*x - y)**2 for x, y in zip(X, Y)) / n
    print(f"  epoch {epoch}: w={w:.4f}, loss={loss:.6f}")

# Full batch GD
print(f"\n=== Batch GD (batch size {n}) ===")
w = 0.0
alpha = 0.01
for epoch in range(5):
    grad = sum(2 * (w * X[i] - Y[i]) * X[i] for i in range(n)) / n
    w -= alpha * grad
    loss = sum((w*x - y)**2 for x, y in zip(X, Y)) / n
    print(f"  epoch {epoch}: w={w:.4f}, loss={loss:.6f}")

# Noise comparison
print(f"\n=== Gradient noise comparison ===")
w = 1.5  # near optimum
true_grad = sum(2 * (w * X[i] - Y[i]) * X[i] for i in range(n)) / n
print(f"True gradient (full batch): {true_grad:.4f}")

random.seed(0)
sgd_grads = [2 * (w * X[i] - Y[i]) * X[i] for i in range(n)]
random.shuffle(sgd_grads)
print(f"Individual sample gradients: {[f'{g:.2f}' for g in sgd_grads[:5]]}...")

for B in [1, 2, 4, 10]:
    batch_grads = [sum(sgd_grads[i:i+B])/B for i in range(0, n, B)]
    variance = sum((g - true_grad)**2 for g in batch_grads) / len(batch_grads)
    print(f"Batch size {B:2d}: grad variance = {variance:.4f}")
```

## Connection to CS / Games / AI

- **Every modern neural network** uses mini-batch SGD (or a variant like Adam)
- **Data loaders** — PyTorch `DataLoader(batch_size=32, shuffle=True)` implements exactly this
- **Distributed training** — split mini-batches across GPUs; aggregate gradients
- **Noise as regularisation** — SGD noise helps find flatter minima that generalise better
- **Learning rate warm-up** — start with small $\alpha$ when gradients are noisy, then increase

## Check Your Understanding

1. **Pen & paper:** Data: $(1, 3), (2, 5)$.  Model: $\hat{y} = wx + b$.  Do one SGD step on sample $(1, 3)$ with $w = 0, b = 0, \alpha = 0.1$.
2. **Pen & paper:** With 50,000 training samples and batch size 64, how many iterations per epoch?
3. **Think about it:** Why does shuffling the data before each epoch matter for SGD?
4. **Think about it:** If you use batch size $n$ (full dataset), SGD becomes batch GD.  When would you actually want this?
