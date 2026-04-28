# Stochastic Gradient Descent and Mini-Batches

## Intuition

Batch gradient descent processes the **entire** dataset before taking one step.
With millions of data points, that's painfully slow.  **SGD** takes a step
after each single sample.  **Mini-batch SGD** is the practical middle ground:
take a step after a small batch (e.g., 32 samples).  It's noisier but much
faster, and the noise actually helps escape local minima.

## Prerequisites

- Tier 5, Lesson 2: Gradient Descent
- Tier 4, Lesson 7: Central Limit Theorem (why mini-batch means are approximately normal)

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

## Visualisation — Smooth GD vs noisy SGD vs mini-batch

Three optimisers, same data, very different paths. Full-batch GD takes
clean smooth steps but processes the entire dataset every step. SGD
takes one noisy step per sample (cheap but jagged). Mini-batch is the
practical compromise: few-sample averaging tames the noise while
keeping per-step cost low.

```python
# ── Visualising SGD vs mini-batch SGD vs batch GD ───────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Synthetic linear-regression data: y = 2x + 1 + noise, n = 200 points.
N = 200
X = rng.uniform(-1, 1, N)
Y = 2.0 * X + 1.0 + 0.3 * rng.standard_normal(N)

# Loss surface in (w, b) space:  L(w, b) = mean((w·x + b − y)²)
def loss_surface(w, b):
    return np.mean((w * X[:, None, None] + b - Y[:, None, None]) ** 2, axis=0)
def grad_full(w, b):
    err = w * X + b - Y
    return np.array([np.mean(2 * err * X), np.mean(2 * err)])
def grad_sample(w, b, idx):
    err = w * X[idx] + b - Y[idx]
    return np.array([2 * err * X[idx], 2 * err])
def grad_minibatch(w, b, idxs):
    err = w * X[idxs] + b - Y[idxs]
    return np.array([np.mean(2 * err * X[idxs]), np.mean(2 * err)])

# Run each optimiser for the same NUMBER OF SAMPLES SEEN (= one epoch).
# That makes the comparison fair: each optimiser gets the same compute budget.
def run_batch(lr=0.1, n_steps=200, w0=0.0, b0=0.0):
    p = np.array([w0, b0]); path = [p.copy()]
    for _ in range(n_steps):
        p -= lr * grad_full(*p); path.append(p.copy())
    return np.array(path)

def run_sgd(lr=0.05, n_samples=200, w0=0.0, b0=0.0):
    p = np.array([w0, b0]); path = [p.copy()]
    order = rng.permutation(N)
    for i in order[:n_samples]:
        p -= lr * grad_sample(*p, i); path.append(p.copy())
    return np.array(path)

def run_minibatch(lr=0.1, batch_size=20, n_steps=10, w0=0.0, b0=0.0):
    p = np.array([w0, b0]); path = [p.copy()]
    for _ in range(n_steps):
        idxs = rng.choice(N, size=batch_size, replace=False)
        p -= lr * grad_minibatch(*p, idxs); path.append(p.copy())
    return np.array(path)

path_batch = run_batch(lr=0.1, n_steps=80)
path_sgd   = run_sgd(lr=0.05, n_samples=200)
path_mini  = run_minibatch(lr=0.1, batch_size=20, n_steps=20)

# Loss surface for the contour plot.
ws = np.linspace(0, 3, 80); bs = np.linspace(-0.5, 2, 80)
W, B = np.meshgrid(ws, bs)
L = np.array([[np.mean((w * X + b - Y) ** 2) for w in ws] for b in bs])

fig, axes = plt.subplots(1, 2, figsize=(14, 5.5))

# (1) Trajectories on the (w, b) loss landscape.
ax = axes[0]
ax.contour(W, B, L, levels=20, cmap="viridis", alpha=0.7)
ax.plot(path_batch[:, 0], path_batch[:, 1], "o-", color="tab:blue",
        markersize=3, lw=1.4, label="full-batch GD (smooth)")
ax.plot(path_sgd[:, 0], path_sgd[:, 1], "o-", color="tab:red",
        markersize=2, lw=0.7, alpha=0.6, label="SGD (one sample at a time, noisy)")
ax.plot(path_mini[:, 0], path_mini[:, 1], "s-", color="tab:green",
        markersize=4, lw=1.6, label="mini-batch (B = 20)")
ax.scatter([2.0], [1.0], color="black", marker="*", s=200, zorder=5,
           label="true (w*, b*)")
ax.set_xlabel("w"); ax.set_ylabel("b")
ax.set_xlim(0, 3); ax.set_ylim(-0.5, 2)
ax.set_title("Same compute budget, three trajectories")
ax.legend(loc="upper left", fontsize=9); ax.grid(True, alpha=0.3)

# (2) Loss-vs-step curves (per-step). SGD is noisy, mini-batch
# smoothes it out, full-batch is the cleanest but most expensive
# per step.
ax = axes[1]
def loss_path(path): return np.array([np.mean((p[0] * X + p[1] - Y)**2) for p in path])
ax.plot(loss_path(path_batch), "o-", color="tab:blue", markersize=3, lw=1.6, label="full-batch GD")
ax.plot(loss_path(path_sgd),   "o-", color="tab:red",  markersize=2, lw=0.5, alpha=0.6, label="SGD")
ax.plot(loss_path(path_mini),  "s-", color="tab:green",markersize=4, lw=1.6, label="mini-batch")
ax.set_yscale("log")
ax.set_xlabel("step"); ax.set_ylabel("loss (log scale)")
ax.set_title("Loss curves: SGD is noisy, mini-batch is the\npractical compromise")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print final losses to make the trade-off concrete.
for name, path in [("full-batch GD", path_batch),
                   ("SGD",            path_sgd),
                   ("mini-batch (B=20)", path_mini)]:
    final_loss = np.mean((path[-1, 0] * X + path[-1, 1] - Y) ** 2)
    print(f"  {name:<22}  ended at  w = {path[-1, 0]:.3f}, b = {path[-1, 1]:.3f},  "
          f"loss = {final_loss:.4f}")
```

**Three observations the picture makes obvious:**

- **Full-batch GD is smooth, but each step is expensive.** Cost per
  step is the entire dataset. Beautiful trajectory; awful when $N$ is
  millions.
- **SGD is cheap per step but noisy.** Each step uses one sample, so
  the gradient is a noisy estimate of the true gradient. The path
  rattles around — but with a small enough learning rate it still
  converges, just stochastically.
- **Mini-batch is the practical default.** Average the gradient over
  $B$ samples (typically 32–512 in deep learning). Variance shrinks as
  $1/B$ (CLT, lesson 7 of probability), so the path is much smoother
  than SGD. Cost per step is $B$ samples — small enough for GPUs,
  large enough to dampen the noise. Every modern training script uses
  some flavour of mini-batch.

The noise in SGD turns out to be a *feature*, not a bug: it helps
escape saddle points and shallow local minima — which is why pure SGD
is sometimes preferred over Adam in practice.

## Connection to CS / Games / AI / Business / Industry

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
