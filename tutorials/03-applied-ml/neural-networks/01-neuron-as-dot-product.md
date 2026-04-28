# The Neuron as a Dot Product + Activation

## Intuition

A single neuron is the simplest computational unit in a neural network.
It does exactly two things: (1) compute a **weighted sum** of its inputs
(a dot product), and (2) pass the result through an **activation function**.
That's it.  Every neural network, from a simple perceptron to GPT, is built
from this primitive.

## Prerequisites

- Tier 2, Lesson 2: Vector Operations (dot product)
- Tier 3, Lesson 2: Derivatives

## From First Principles

### The biological analogy (briefly)

A biological neuron receives signals from other neurons, sums them up, and
"fires" if the total exceeds a threshold.  The artificial neuron mirrors this.

### Mathematical model

Given inputs $\mathbf{x} = (x_1, x_2, \ldots, x_n)$, weights $\mathbf{w} = (w_1, w_2, \ldots, w_n)$, and bias $b$:

**Step 1: Weighted sum (linear part)**

$$z = \mathbf{w} \cdot \mathbf{x} + b = \sum_{i=1}^{n} w_i x_i + b$$

**Step 2: Activation (non-linear part)**

$$a = \sigma(z)$$

where $\sigma$ is the activation function.

### Pen & paper: A single neuron

Inputs: $\mathbf{x} = (2, 3, -1)$, Weights: $\mathbf{w} = (0.5, -0.3, 0.8)$, Bias: $b = 0.1$

**Step 1:** $z = 0.5(2) + (-0.3)(3) + 0.8(-1) + 0.1$

$= 1.0 - 0.9 - 0.8 + 0.1 = -0.6$

**Step 2 (sigmoid):** $a = \sigma(-0.6) = \frac{1}{1 + e^{0.6}} = \frac{1}{1 + 1.822} = \frac{1}{2.822} \approx 0.354$

### What does the neuron compute geometrically?

The equation $\mathbf{w} \cdot \mathbf{x} + b = 0$ defines a **hyperplane** (a line in 2D, a plane in 3D).

The neuron classifies inputs based on **which side** of this hyperplane they fall on.

**Pen & paper: 2D example**

$w_1 x_1 + w_2 x_2 + b = 0$ → $x_1 + x_2 - 1.5 = 0$

This is the line $x_2 = -x_1 + 1.5$.

Points above the line give $z > 0$ → $\sigma(z) > 0.5$ → "class 1".
Points below give $z < 0$ → $\sigma(z) < 0.5$ → "class 0".

### The perceptron (historical)

The perceptron uses a **step function** activation:

$$a = \begin{cases} 1 & \text{if } z \ge 0 \\ 0 & \text{if } z < 0 \end{cases}$$

**Pen & paper: AND gate**

| $x_1$ | $x_2$ | Target |
|--------|--------|--------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Try $w_1 = 1, w_2 = 1, b = -1.5$:

$z = x_1 + x_2 - 1.5$

| $(x_1, x_2)$ | $z$ | Output |
|---------------|-----|--------|
| $(0, 0)$ | $-1.5$ | 0 ✓ |
| $(0, 1)$ | $-0.5$ | 0 ✓ |
| $(1, 0)$ | $-0.5$ | 0 ✓ |
| $(1, 1)$ | $0.5$ | 1 ✓ |

### XOR cannot be solved by a single neuron

| $x_1$ | $x_2$ | XOR |
|--------|--------|-----|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

No single line can separate the 1s from the 0s.  This is why we need
**multiple layers** (hidden layers).

### From one neuron to a layer

A layer with $m$ neurons and $n$ inputs:

$$\mathbf{z} = \mathbf{W}\mathbf{x} + \mathbf{b}$$

where $\mathbf{W}$ is $m \times n$ and $\mathbf{b}$ is $m \times 1$.

Each row of $\mathbf{W}$ is one neuron's weights.

**Pen & paper:** 2 neurons, 3 inputs:

$$\begin{pmatrix} z_1 \\ z_2 \end{pmatrix} = \begin{pmatrix} 0.5 & -0.3 & 0.8 \\ 0.2 & 0.7 & -0.4 \end{pmatrix} \begin{pmatrix} 2 \\ 3 \\ -1 \end{pmatrix} + \begin{pmatrix} 0.1 \\ -0.2 \end{pmatrix}$$

$z_1 = 1 - 0.9 - 0.8 + 0.1 = -0.6$
$z_2 = 0.4 + 2.1 + 0.4 - 0.2 = 2.7$

## Python Verification

```python
# ── The Neuron: verifying pen & paper work ──────────────────
import math

# Single neuron
x = [2, 3, -1]
w = [0.5, -0.3, 0.8]
b = 0.1

# Step 1: weighted sum
z = sum(wi * xi for wi, xi in zip(w, x)) + b
print(f"=== Single neuron ===")
print(f"x = {x}, w = {w}, b = {b}")
print(f"z = w·x + b = {z}")

# Step 2: sigmoid activation
sigmoid = lambda z: 1 / (1 + math.exp(-z))
a = sigmoid(z)
print(f"a = σ(z) = {a:.4f}")

# AND gate perceptron
print(f"\n=== AND gate perceptron ===")
w1, w2, bias = 1, 1, -1.5
for x1, x2 in [(0,0), (0,1), (1,0), (1,1)]:
    z = w1*x1 + w2*x2 + bias
    output = 1 if z >= 0 else 0
    print(f"  ({x1},{x2}): z={z:+.1f} → {output}")

# OR gate
print(f"\n=== OR gate perceptron ===")
w1, w2, bias = 1, 1, -0.5
for x1, x2 in [(0,0), (0,1), (1,0), (1,1)]:
    z = w1*x1 + w2*x2 + bias
    output = 1 if z >= 0 else 0
    print(f"  ({x1},{x2}): z={z:+.1f} → {output}")

# Layer of 2 neurons
print(f"\n=== Layer: 2 neurons, 3 inputs ===")
W = [[0.5, -0.3, 0.8], [0.2, 0.7, -0.4]]
b_layer = [0.1, -0.2]
x = [2, 3, -1]

for i in range(2):
    z = sum(W[i][j] * x[j] for j in range(3)) + b_layer[i]
    a = sigmoid(z)
    print(f"  Neuron {i}: z={z:.2f}, a=σ(z)={a:.4f}")

# XOR: no single neuron works
print(f"\n=== XOR: trying all simple weight combos ===")
found = False
for w1 in range(-3, 4):
    for w2 in range(-3, 4):
        for bias in range(-3, 4):
            correct = True
            for x1, x2, target in [(0,0,0),(0,1,1),(1,0,1),(1,1,0)]:
                z = w1*x1 + w2*x2 + bias
                pred = 1 if z >= 0 else 0
                if pred != target:
                    correct = False
                    break
            if correct:
                found = True
                print(f"  Found: w1={w1}, w2={w2}, b={bias}")
if not found:
    print("  No single-neuron solution exists for XOR!")
```

## Visualisation — A single neuron's decision boundary

A neuron computes $\sigma(\mathbf{w} \cdot \mathbf{x} + b)$. The
**decision boundary** $\mathbf{w} \cdot \mathbf{x} + b = 0$ is a
*hyperplane* — a straight line in 2-D, a plane in 3-D. Two pictures
prove it: a neuron correctly classifies AND/OR (linearly separable)
but **fails on XOR** because no straight line can separate XOR's two
classes.

```python
# ── Visualising a single neuron's decision boundary ─────────
import numpy as np
import matplotlib.pyplot as plt

def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))

def plot_neuron(ax, w, b, points, labels, title):
    # Decision-boundary line: w₁x + w₂y + b = 0  ⇒  y = -(w₁ x + b) / w₂
    xs = np.linspace(-0.5, 1.5, 200)
    if abs(w[1]) > 1e-9:
        ys = -(w[0] * xs + b) / w[1]
        ax.plot(xs, ys, color="black", lw=2, linestyle="--", label="decision boundary")
    # Background colouring of the half-planes (probability shading).
    X, Y = np.meshgrid(np.linspace(-0.5, 1.5, 100),
                       np.linspace(-0.5, 1.5, 100))
    P = sigmoid(w[0] * X + w[1] * Y + b)
    ax.contourf(X, Y, P, levels=20, cmap="RdBu", alpha=0.4)
    # Plot the four points coloured by their TRUE label.
    for (x, y), label in zip(points, labels):
        marker = "o" if label == 1 else "s"
        color  = "tab:red" if label == 1 else "tab:blue"
        ax.scatter(x, y, marker=marker, color=color, edgecolor="black",
                   s=180, zorder=5)
        ax.text(x + 0.04, y + 0.04, f"({x},{y})\nlabel={label}",
                fontsize=8, color=color, fontweight="bold")
    ax.set_xlim(-0.5, 1.5); ax.set_ylim(-0.5, 1.5)
    ax.set_aspect("equal"); ax.set_xlabel("x₁"); ax.set_ylabel("x₂")
    ax.set_title(title); ax.grid(True, alpha=0.3); ax.legend(loc="lower right")

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) AND gate: x₁ AND x₂. Linearly separable.
points = [(0, 0), (0, 1), (1, 0), (1, 1)]
plot_neuron(axes[0], w=[1.0, 1.0], b=-1.5,
            points=points, labels=[0, 0, 0, 1],
            title="AND: linearly separable\nw=(1,1), b=-1.5")

# (2) OR gate: x₁ OR x₂. Also linearly separable.
plot_neuron(axes[1], w=[1.0, 1.0], b=-0.5,
            points=points, labels=[0, 1, 1, 1],
            title="OR: linearly separable\nw=(1,1), b=-0.5")

# (3) XOR gate: NO single line can separate the two classes.
# We pick weights from a hopeful guess so the picture shows the line
# missing two points — but no choice of (w, b) succeeds.
plot_neuron(axes[2], w=[1.0, 1.0], b=-1.0,
            points=points, labels=[0, 1, 1, 0],
            title="XOR: NOT linearly separable\nNO single neuron can solve it")

plt.tight_layout()
plt.show()

# Verify each gate's classification with the chosen weights.
def predict(w, b, x):
    return 1 if (w[0]*x[0] + w[1]*x[1] + b) > 0 else 0

print("AND with w=(1,1), b=-1.5:")
for x, t in zip(points, [0, 0, 0, 1]):
    p = predict([1.0, 1.0], -1.5, x)
    print(f"  {x}: predict={p}, target={t}  {'✓' if p == t else '✗'}")

print("\nOR with w=(1,1), b=-0.5:")
for x, t in zip(points, [0, 1, 1, 1]):
    p = predict([1.0, 1.0], -0.5, x)
    print(f"  {x}: predict={p}, target={t}  {'✓' if p == t else '✗'}")

print("\nXOR — try every (w₁, w₂, b) over a coarse grid:")
xor_targets = [0, 1, 1, 0]
solutions = 0
for w1 in np.arange(-2, 2.1, 0.5):
    for w2 in np.arange(-2, 2.1, 0.5):
        for b in np.arange(-2, 2.1, 0.5):
            ok = all(predict([w1, w2], b, x) == t for x, t in zip(points, xor_targets))
            if ok: solutions += 1
print(f"  {solutions} solutions found over the grid → XOR is provably not linearly separable.")
print("  This is exactly why we need MULTIPLE LAYERS (next lesson).")
```

**The single most important fact about a neuron:**

- A neuron computes $\sigma(\mathbf{w} \cdot \mathbf{x} + b)$, which is
  a **linear classifier** wrapped in a non-linear activation. Its
  decision boundary is a hyperplane.
- Anything that's linearly separable (AND, OR, NAND, NOR, the iris
  dataset's first two classes, MNIST 0-vs-1) **a single neuron can
  learn**.
- Anything that requires a *bend* in the boundary (XOR, concentric
  circles, MNIST 4-vs-9) **a single neuron cannot learn at all** — no
  amount of training fixes this.
- That's why we **stack** neurons into multiple layers (next lessons).
  A two-layer network can carve out an arbitrary polygon; a deep
  network can approximate any continuous function (universal
  approximation theorem). XOR — the famous limitation that killed
  perceptron research in the 1970s — falls trivially to a 2-layer
  network.

## Connection to CS / Games / AI

- **Every neural network** is layers of neurons — this is the fundamental building block
- **Linear classifiers** — a single neuron IS a linear classifier (logistic regression)
- **Feature importance** — weight magnitudes indicate which inputs matter most
- **Decision boundaries** — a single neuron creates a linear boundary; stacking layers creates complex non-linear boundaries
- **Logic gates** — AND, OR, NOT can be implemented as single neurons; XOR needs two layers

## Check Your Understanding

1. **Pen & paper:** A neuron has $\mathbf{w} = (1, -2)$, $b = 3$, sigmoid activation.  Compute the output for $\mathbf{x} = (2, 1)$.
2. **Pen & paper:** Find weights and bias for a single neuron that implements the NOT gate ($x \to 1-x$).
3. **Pen & paper:** Show that XOR can be solved with 2 hidden neurons + 1 output neuron (hint: XOR = (A OR B) AND NOT(A AND B)).
4. **Think about it:** Why does a neural network need non-linear activation functions?  What happens if all activations are linear?
