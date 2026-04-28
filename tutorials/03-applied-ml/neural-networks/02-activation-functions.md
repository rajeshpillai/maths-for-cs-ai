# Activation Functions — Sigmoid, Tanh, ReLU, GELU

## Intuition

Without activation functions, a neural network is just matrix multiplications
stacked together — which collapses to a single linear transformation.
Activation functions inject **non-linearity**, letting networks learn curves,
boundaries, and complex patterns.  The choice of activation function affects
training speed, gradient flow, and what the network can represent.

## Prerequisites

- Tier 6, Lesson 1: The Neuron
- Tier 3, Lesson 2: Derivatives

## From First Principles

### Sigmoid

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

**Range:** $(0, 1)$ — great for probabilities.

**Derivative (derive it by hand):**

$$\sigma'(z) = \sigma(z)(1 - \sigma(z))$$

*Proof:* Let $\sigma = (1 + e^{-z})^{-1}$.

$\sigma' = -1 \cdot (1 + e^{-z})^{-2} \cdot (-e^{-z}) = \frac{e^{-z}}{(1+e^{-z})^2}$

$= \frac{1}{1+e^{-z}} \cdot \frac{e^{-z}}{1+e^{-z}} = \sigma \cdot \frac{(1+e^{-z})-1}{1+e^{-z}} = \sigma(1 - \sigma)$ $\square$

**Pen & paper values:**

| $z$ | $\sigma(z)$ | $\sigma'(z)$ |
|-----|-------------|-------------|
| $-3$ | $0.047$ | $0.045$ |
| $-1$ | $0.269$ | $0.197$ |
| $0$ | $0.500$ | $0.250$ |
| $1$ | $0.731$ | $0.197$ |
| $3$ | $0.953$ | $0.045$ |

**Problem:** Max derivative is only 0.25.  In deep networks, multiplying many values < 0.25 → gradients shrink to ~0.  This is the **vanishing gradient problem**.

### Tanh (Hyperbolic Tangent)

$$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\sigma(2z) - 1$$

**Range:** $(-1, 1)$ — zero-centred (unlike sigmoid).

**Derivative:**

$$\tanh'(z) = 1 - \tanh^2(z)$$

**Pen & paper:** At $z = 0$: $\tanh(0) = 0$, $\tanh'(0) = 1$.

Max derivative is 1 (better than sigmoid's 0.25), but still suffers from vanishing gradients for large $|z|$.

### ReLU (Rectified Linear Unit)

$$\text{ReLU}(z) = \max(0, z) = \begin{cases} z & \text{if } z > 0 \\ 0 & \text{if } z \le 0 \end{cases}$$

**Derivative:**

$$\text{ReLU}'(z) = \begin{cases} 1 & \text{if } z > 0 \\ 0 & \text{if } z < 0 \end{cases}$$

**Pen & paper values:**

| $z$ | ReLU | ReLU' |
|-----|------|-------|
| $-2$ | $0$ | $0$ |
| $-0.5$ | $0$ | $0$ |
| $0$ | $0$ | undefined (use 0) |
| $0.5$ | $0.5$ | $1$ |
| $3$ | $3$ | $1$ |

**Pros:** No vanishing gradient for positive inputs.  Computationally trivial.
**Cons:** "Dying ReLU" — if $z < 0$, gradient is 0 and the neuron never recovers.

### Leaky ReLU

$$\text{LeakyReLU}(z) = \begin{cases} z & \text{if } z > 0 \\ \alpha z & \text{if } z \le 0 \end{cases}$$

Typically $\alpha = 0.01$.  The small negative slope prevents dying neurons.

### GELU (Gaussian Error Linear Unit)

$$\text{GELU}(z) = z \cdot \Phi(z)$$

where $\Phi$ is the standard normal CDF.

**Approximation:** $\text{GELU}(z) \approx 0.5z\left(1 + \tanh\left[\sqrt{2/\pi}(z + 0.044715z^3)\right]\right)$

Used in **Transformers** (BERT, GPT).  Smooth, non-monotonic — a soft gate that
lets information through based on how "strong" the signal is.

### Softmax (for output layers)

For a vector $\mathbf{z}$ with $C$ classes:

$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{C} e^{z_j}}$$

Converts raw scores (logits) into a probability distribution.

**Pen & paper:** $\mathbf{z} = (2, 1, 0)$

$e^2 = 7.389$, $e^1 = 2.718$, $e^0 = 1$

Sum = $11.107$

$\text{softmax} = (0.665, 0.245, 0.090)$ — sums to 1 ✓

### Comparison summary

| Activation | Range | Derivative | Vanishing gradient? | Used in |
|-----------|-------|-----------|-------------------|---------|
| Sigmoid | $(0,1)$ | $\sigma(1-\sigma)$ ≤ 0.25 | Yes | Output (binary) |
| Tanh | $(-1,1)$ | $1-\tanh^2$ ≤ 1 | Yes (less) | RNNs (legacy) |
| ReLU | $[0,\infty)$ | 0 or 1 | No (but dying) | Default hidden |
| Leaky ReLU | $(-\infty,\infty)$ | $\alpha$ or 1 | No | Alternative hidden |
| GELU | $\approx(-0.17,\infty)$ | Smooth | No | Transformers |
| Softmax | $(0,1)^C$ | Complex | N/A | Output (multi-class) |

## Python Verification

```python
# ── Activation Functions: verifying pen & paper work ────────
import math

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

def sigmoid_deriv(z):
    s = sigmoid(z)
    return s * (1 - s)

def tanh_fn(z):
    return math.tanh(z)

def tanh_deriv(z):
    return 1 - math.tanh(z)**2

def relu(z):
    return max(0, z)

def relu_deriv(z):
    return 1 if z > 0 else 0

# Sigmoid table
print("=== Sigmoid ===")
print(f"{'z':>5} {'σ(z)':>8} {'σ′(z)':>8}")
for z in [-3, -1, 0, 1, 3]:
    print(f"{z:5.0f} {sigmoid(z):8.4f} {sigmoid_deriv(z):8.4f}")

# Sigmoid derivative derivation check
print(f"\n=== Sigmoid derivative check at z=1 ===")
h = 1e-7
numerical = (sigmoid(1+h) - sigmoid(1)) / h
analytical = sigmoid_deriv(1)
print(f"Numerical:  {numerical:.6f}")
print(f"Analytical: {analytical:.6f}")

# Tanh
print(f"\n=== Tanh ===")
for z in [-2, -1, 0, 1, 2]:
    print(f"  z={z:+d}: tanh={tanh_fn(z):+.4f}, tanh'={tanh_deriv(z):.4f}")

# ReLU
print(f"\n=== ReLU ===")
for z in [-2, -0.5, 0, 0.5, 3]:
    print(f"  z={z:+.1f}: ReLU={relu(z):.1f}, ReLU'={relu_deriv(z)}")

# Softmax
print(f"\n=== Softmax ===")
z = [2, 1, 0]
exp_z = [math.exp(zi) for zi in z]
sum_exp = sum(exp_z)
softmax_out = [e / sum_exp for e in exp_z]
print(f"z = {z}")
print(f"exp(z) = {[f'{e:.3f}' for e in exp_z]}")
print(f"softmax = {[f'{s:.3f}' for s in softmax_out]}")
print(f"sum = {sum(softmax_out):.4f}")

# Vanishing gradient demonstration
print(f"\n=== Vanishing gradient: 10 sigmoid layers ===")
grad = 1.0
for layer in range(10):
    grad *= 0.25  # max sigmoid derivative
    print(f"  After layer {layer+1}: gradient = {grad:.2e}")
print(f"  Gradient shrinks to {grad:.2e} — nearly zero!")

print(f"\n=== No vanishing gradient: 10 ReLU layers ===")
grad = 1.0
for layer in range(10):
    grad *= 1.0  # ReLU derivative (positive region)
print(f"  After 10 ReLU layers: gradient = {grad:.2e} — preserved!")
```

## Visualisation — Activation functions and their derivatives

Activation functions and their derivatives, side by side. The
*derivative* matters enormously: it's what gets multiplied through the
chain rule during backpropagation, and tiny derivatives cause the
vanishing-gradient problem that blocked deep networks for decades.

```python
# ── Visualising activation functions ────────────────────────
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 400)

def sigmoid(z): return 1.0 / (1.0 + np.exp(-z))
def tanh(z):    return np.tanh(z)
def relu(z):    return np.maximum(0, z)
def leaky(z):   return np.where(z > 0, z, 0.1 * z)
def gelu(z):    return 0.5 * z * (1 + np.tanh(np.sqrt(2 / np.pi) * (z + 0.044715 * z ** 3)))

# Numeric derivative for plotting (works for all of them).
def deriv(f, z, h=1e-4):
    return (f(z + h) - f(z - h)) / (2 * h)

fns = [
    ("Sigmoid",    sigmoid, "tab:blue"),
    ("Tanh",       tanh,    "tab:orange"),
    ("ReLU",       relu,    "tab:green"),
    ("Leaky ReLU", leaky,   "tab:red"),
    ("GELU",       gelu,    "tab:purple"),
]

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# (1) The activations themselves.
ax = axes[0]
for name, f, color in fns:
    ax.plot(x, f(x), color=color, lw=2, label=name)
ax.axhline(0, color="black", lw=0.5)
ax.axvline(0, color="black", lw=0.5)
ax.set_xlim(-5, 5); ax.set_ylim(-1.3, 5.3)
ax.set_xlabel("input z"); ax.set_ylabel("activation a(z)")
ax.set_title("Activation functions\n(non-linearity is what makes\nneural nets more than linear)")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) The DERIVATIVES. Sigmoid's max derivative is 0.25 at z=0,
# falling to ~0 outside [-5, 5] — the cause of vanishing gradients.
# ReLU's derivative is exactly 1 for z > 0 (and 0 for z ≤ 0), so
# multiplying many of them through a deep chain doesn't shrink the
# gradient.
ax = axes[1]
for name, f, color in fns:
    ax.plot(x, deriv(f, x), color=color, lw=2, label=f"d/dz {name}")
ax.axhline(0, color="black", lw=0.5)
ax.axhline(0.25, color="grey", lw=0.5, linestyle=":")
ax.text(4.6, 0.27, "0.25  ← max σ'(z)", fontsize=9, color="grey")
ax.set_xlim(-5, 5); ax.set_ylim(-0.2, 1.3)
ax.set_xlabel("input z"); ax.set_ylabel("derivative")
ax.set_title("Derivatives — the values multiplied\nthrough the chain rule (backprop)")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Concrete numerical demonstration of vanishing gradients.
print(f"{'depth':>6}  {'product of sigmoid' + chr(39) + 's at z=0':>30}  {'product of ReLU' + chr(39) + 's':>22}")
print(f"       {'(starting from 1)':>30}  {'derivatives':>22}")
print("-" * 65)
for d in range(0, 31, 5):
    sig_grad  = 0.25 ** d
    relu_grad = 1.0  ** d
    print(f"  {d:>5}  {sig_grad:>30.4e}  {relu_grad:>22.0f}")
print("\nSigmoid: even with the *max* derivative 0.25 every step, by depth 30")
print("         the multiplied gradient is ~10⁻¹⁸ — below float32's noise floor.")
print("ReLU:    derivative is exactly 1 on the active half — no shrinkage at all.")
```

**Why ReLU revolutionised deep learning:**

- **Sigmoid and tanh saturate.** When $|z|$ is large their derivatives
  are essentially zero — gradients flowing back through them die. With
  20+ layers of sigmoid, the gradient at the first layer is so tiny
  (the famous $0.25^{20} \approx 10^{-12}$) that the network can't
  learn.
- **ReLU's derivative is 1 on the active half.** That single change —
  no shrinkage of the gradient through depth — made it possible to
  train networks with hundreds of layers. AlexNet (2012) was the
  watershed; every major CNN and most MLPs since then use ReLU or one
  of its variants (Leaky ReLU, GELU, Swish).
- **GELU is what GPTs use.** It's a smooth ReLU-like curve that
  multiplies the input by the Gaussian CDF; smooth derivatives are
  friendlier to optimisers than ReLU's hard kink at zero.

## Connection to CS / Games / AI / Business / Industry

- **Sigmoid** — binary classification output, logistic regression, gates in LSTMs
- **Tanh** — LSTM/GRU internal activations, normalising to $[-1, 1]$
- **ReLU** — default for hidden layers in CNNs and MLPs since 2012 (AlexNet)
- **GELU** — used in BERT, GPT, modern Transformers
- **Softmax** — final layer of any multi-class classifier
- **Swish/SiLU** — $z \cdot \sigma(z)$, used in EfficientNet and some LLMs

## Check Your Understanding

1. **Pen & paper:** Compute $\sigma(0)$, $\sigma(2)$, $\sigma(-2)$ and their derivatives.
2. **Pen & paper:** Show that $\tanh(z) = 2\sigma(2z) - 1$ by substituting the sigmoid formula.
3. **Pen & paper:** Compute softmax of $(3, 1, -1)$.  Which class has the highest probability?
4. **Pen & paper:** If a network has 20 layers with sigmoid activations, estimate the maximum gradient magnitude at the first layer (assuming worst case $\sigma'_{\max} = 0.25$ per layer).
5. **Think about it:** Why is ReLU not suitable as an output activation for regression problems where the target can be negative?
