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
