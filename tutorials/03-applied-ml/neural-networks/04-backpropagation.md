# Backpropagation — Derived from the Chain Rule, Step by Step

## Intuition

Backpropagation is not a mysterious algorithm — it's simply the **chain rule**
applied systematically from the output layer back to the input layer.  It
computes how much each weight contributed to the error, so gradient descent
knows which way to adjust them.

## Prerequisites

- Tier 3, Lesson 4: Chain Rule
- Tier 6, Lesson 3: Forward Pass

## From First Principles

### The setup

Network: input(2) → hidden(2, ReLU) → output(1, sigmoid).  MSE loss.

Weights:
$$\mathbf{W}^{(1)} = \begin{pmatrix} w_{11} & w_{12} \\ w_{21} & w_{22} \end{pmatrix}, \quad \mathbf{b}^{(1)} = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}$$

$$\mathbf{W}^{(2)} = \begin{pmatrix} w_{31} & w_{32} \end{pmatrix}, \quad b^{(2)} = b_3$$

### Forward pass (with specific numbers)

$\mathbf{W}^{(1)} = \begin{pmatrix} 0.5 & 0.3 \\ 0.2 & 0.8 \end{pmatrix}$, $\mathbf{b}^{(1)} = \begin{pmatrix} 0 \\ 0 \end{pmatrix}$

$\mathbf{W}^{(2)} = \begin{pmatrix} 0.6 & 0.4 \end{pmatrix}$, $b^{(2)} = 0$

Input: $\mathbf{x} = (1, 1)^T$, Target: $y = 1$.

**Layer 1:**
$z_1 = 0.5(1) + 0.3(1) = 0.8$, $a_1 = \text{ReLU}(0.8) = 0.8$
$z_2 = 0.2(1) + 0.8(1) = 1.0$, $a_2 = \text{ReLU}(1.0) = 1.0$

**Layer 2:**
$z_3 = 0.6(0.8) + 0.4(1.0) = 0.88$
$\hat{y} = \sigma(0.88) = \frac{1}{1 + e^{-0.88}} \approx 0.707$

**Loss:**
$L = (\hat{y} - y)^2 = (0.707 - 1)^2 = 0.086$

### Backward pass: output layer

**Step 1:** $\frac{\partial L}{\partial \hat{y}} = 2(\hat{y} - y) = 2(0.707 - 1) = -0.586$

**Step 2:** $\frac{\partial \hat{y}}{\partial z_3} = \sigma(z_3)(1 - \sigma(z_3)) = 0.707 \times 0.293 = 0.207$

**Step 3:** Combine (this is $\delta_3$, the "error signal"):

$$\delta_3 = \frac{\partial L}{\partial z_3} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z_3} = (-0.586)(0.207) = -0.121$$

**Gradients for layer 2 weights:**

$\frac{\partial L}{\partial w_{31}} = \delta_3 \cdot a_1 = -0.121 \times 0.8 = -0.097$

$\frac{\partial L}{\partial w_{32}} = \delta_3 \cdot a_2 = -0.121 \times 1.0 = -0.121$

$\frac{\partial L}{\partial b_3} = \delta_3 = -0.121$

### Backward pass: hidden layer

**Propagate error back through weights:**

$\frac{\partial L}{\partial a_1} = \delta_3 \cdot w_{31} = -0.121 \times 0.6 = -0.073$

$\frac{\partial L}{\partial a_2} = \delta_3 \cdot w_{32} = -0.121 \times 0.4 = -0.048$

**Through ReLU:** $\text{ReLU}'(z) = 1$ if $z > 0$, else $0$.

$\delta_1 = \frac{\partial L}{\partial a_1} \cdot \text{ReLU}'(z_1) = -0.073 \times 1 = -0.073$

$\delta_2 = \frac{\partial L}{\partial a_2} \cdot \text{ReLU}'(z_2) = -0.048 \times 1 = -0.048$

**Gradients for layer 1 weights:**

$\frac{\partial L}{\partial w_{11}} = \delta_1 \cdot x_1 = -0.073 \times 1 = -0.073$

$\frac{\partial L}{\partial w_{12}} = \delta_1 \cdot x_2 = -0.073 \times 1 = -0.073$

$\frac{\partial L}{\partial w_{21}} = \delta_2 \cdot x_1 = -0.048 \times 1 = -0.048$

$\frac{\partial L}{\partial w_{22}} = \delta_2 \cdot x_2 = -0.048 \times 1 = -0.048$

### The general pattern

For each layer $l$, working backward:

1. **Error signal:** $\boldsymbol{\delta}^{(l)} = \boldsymbol{\delta}^{(l+1)} \mathbf{W}^{(l+1)} \odot \sigma'(\mathbf{z}^{(l)})$
2. **Weight gradient:** $\frac{\partial L}{\partial \mathbf{W}^{(l)}} = \boldsymbol{\delta}^{(l)} (\mathbf{a}^{(l-1)})^T$
3. **Bias gradient:** $\frac{\partial L}{\partial \mathbf{b}^{(l)}} = \boldsymbol{\delta}^{(l)}$

### Update step

$$\mathbf{W}^{(l)} \leftarrow \mathbf{W}^{(l)} - \alpha \frac{\partial L}{\partial \mathbf{W}^{(l)}}$$

With $\alpha = 0.1$:

$w_{31} \leftarrow 0.6 - 0.1(-0.097) = 0.610$
$w_{32} \leftarrow 0.4 - 0.1(-0.121) = 0.412$

All weights move in the direction that reduces the loss.

## Python Verification

```python
# ── Backpropagation: verifying pen & paper work ─────────────
import math

def sigmoid(z): return 1 / (1 + math.exp(-z))
def sigmoid_deriv(z): s = sigmoid(z); return s * (1 - s)
def relu(z): return max(0, z)
def relu_deriv(z): return 1 if z > 0 else 0

# Network setup
W1 = [[0.5, 0.3], [0.2, 0.8]]
b1 = [0, 0]
W2 = [[0.6, 0.4]]
b2 = [0]
x = [1, 1]
y_true = 1
alpha = 0.1

# === Forward pass ===
print("=== Forward pass ===")
z1 = [sum(W1[i][j] * x[j] for j in range(2)) + b1[i] for i in range(2)]
a1 = [relu(z) for z in z1]
z2 = [sum(W2[i][j] * a1[j] for j in range(2)) + b2[i] for i in range(1)]
y_hat = sigmoid(z2[0])
loss = (y_hat - y_true) ** 2

print(f"z1 = {z1}, a1 = {a1}")
print(f"z2 = {z2}, ŷ = {y_hat:.4f}")
print(f"Loss = {loss:.4f}")

# === Backward pass ===
print(f"\n=== Backward pass ===")

# Output layer
dL_dy = 2 * (y_hat - y_true)
dy_dz2 = sigmoid_deriv(z2[0])
delta2 = dL_dy * dy_dz2
print(f"∂L/∂ŷ = {dL_dy:.4f}")
print(f"∂ŷ/∂z₂ = {dy_dz2:.4f}")
print(f"δ₂ = {delta2:.4f}")

# Gradients for W2
dW2 = [delta2 * a1[j] for j in range(2)]
db2 = delta2
print(f"∂L/∂W₂ = {[f'{g:.4f}' for g in dW2]}")
print(f"∂L/∂b₂ = {db2:.4f}")

# Propagate to hidden layer
dL_da1 = [delta2 * W2[0][j] for j in range(2)]
delta1 = [dL_da1[i] * relu_deriv(z1[i]) for i in range(2)]
print(f"\nδ₁ = {[f'{d:.4f}' for d in delta1]}")

# Gradients for W1
print(f"∂L/∂W₁:")
for i in range(2):
    for j in range(2):
        grad = delta1[i] * x[j]
        print(f"  w{i+1}{j+1}: {grad:.4f}")

# === Update weights ===
print(f"\n=== Weight updates (α={alpha}) ===")
for j in range(2):
    old = W2[0][j]
    new = old - alpha * dW2[j]
    print(f"  w₃{j+1}: {old:.3f} → {new:.4f}")

# === Numerical gradient check ===
print(f"\n=== Numerical gradient check ===")
eps = 1e-5
for idx, (i, j) in enumerate([(0,0), (0,1)]):
    # Perturb W2[0][j]
    W2_plus = [[w for w in row] for row in W2]
    W2_minus = [[w for w in row] for row in W2]
    W2_plus[0][j] += eps
    W2_minus[0][j] -= eps
    
    def forward(W2_local):
        z2_l = [sum(W2_local[0][k] * a1[k] for k in range(2)) + b2[0]]
        return (sigmoid(z2_l[0]) - y_true) ** 2
    
    num_grad = (forward(W2_plus) - forward(W2_minus)) / (2 * eps)
    print(f"  w₃{j+1}: analytical={dW2[j]:.6f}, numerical={num_grad:.6f}")
```

## Connection to CS / Games / AI

- **PyTorch `.backward()`** — calls backpropagation automatically on the computation graph
- **Gradient checking** — compare analytical backprop gradients to numerical gradients (debugging technique)
- **Vanishing/exploding gradients** — backprop multiplies many derivatives; if each < 1 (sigmoid) gradients vanish; if > 1 they explode
- **Residual connections** — skip connections in ResNets provide a "gradient highway" that mitigates vanishing gradients
- **Gradient accumulation** — accumulate gradients over multiple mini-batches before updating (simulates larger batch size)

## Check Your Understanding

1. **Pen & paper:** For the network above, what happens to $\delta_1$ if $z_1 < 0$ (ReLU kills it)?  What are the gradients for $w_{11}, w_{12}$?
2. **Pen & paper:** Redo the backward pass with $\sigma$ (sigmoid) instead of ReLU in the hidden layer.  How do the gradients change?
3. **Pen & paper:** If the target were $y = 0$ instead of $y = 1$, would the weights increase or decrease?  Work through $\frac{\partial L}{\partial \hat{y}}$ to verify.
4. **Think about it:** Why is backpropagation $O(n)$ in the number of operations (same as the forward pass), rather than $O(n^2)$?
