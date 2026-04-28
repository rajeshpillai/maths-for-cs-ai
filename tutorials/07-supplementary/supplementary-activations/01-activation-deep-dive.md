# Activation Functions — Complete Deep Dive

## Intuition

This lesson consolidates and extends Tier 6-02.  We derive every major
activation function, compute its derivative by hand, analyse its gradient
flow properties, and explain when to choose each one.  This is the
reference guide for activation functions.

## Prerequisites

- Tier 6, Lesson 2: Activation Functions (basics)
- Tier 3, Lesson 2: Derivatives

## From First Principles

### 1. Sigmoid

$$\sigma(z) = \frac{1}{1 + e^{-z}}, \quad \text{Range: } (0, 1)$$

**Derivative:** $\sigma'(z) = \sigma(z)(1 - \sigma(z))$

**Max derivative:** $\sigma'(0) = 0.25$

**Properties:**
- Output interpretable as probability
- Saturates for large $|z|$ (gradient → 0)
- Not zero-centred (all outputs positive)

**When to use:** Binary classification output layer. **Not** for hidden layers (vanishing gradient).

---

### 2. Tanh

$$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}} = 2\sigma(2z) - 1, \quad \text{Range: } (-1, 1)$$

**Derivative:** $\tanh'(z) = 1 - \tanh^2(z)$

**Max derivative:** $\tanh'(0) = 1$

**Properties:**
- Zero-centred (outputs can be negative)
- Still saturates for large $|z|$
- Stronger gradients than sigmoid (max 1 vs 0.25)

**When to use:** LSTM/GRU internal activations, normalising to $[-1, 1]$.

---

### 3. ReLU (Rectified Linear Unit)

$$\text{ReLU}(z) = \max(0, z), \quad \text{Range: } [0, \infty)$$

**Derivative:** $\text{ReLU}'(z) = \begin{cases} 1 & z > 0 \\ 0 & z \le 0 \end{cases}$

**Properties:**
- No saturation for positive inputs → no vanishing gradient
- Computationally trivial (just a comparison)
- Sparse activation (many neurons output 0)
- **Dying ReLU problem:** if a neuron's weights push all inputs negative, it permanently outputs 0 and never recovers

**When to use:** Default for hidden layers in CNNs and MLPs.

---

### 4. Leaky ReLU

$$\text{LeakyReLU}(z) = \begin{cases} z & z > 0 \\ \alpha z & z \le 0 \end{cases}, \quad \alpha \approx 0.01$$

**Derivative:** $\alpha$ or $1$ — never exactly 0.

**Properties:**
- Fixes dying ReLU (gradient $= \alpha$ for negative inputs)
- Parametric ReLU (PReLU): learns $\alpha$ during training

---

### 5. ELU (Exponential Linear Unit)

$$\text{ELU}(z) = \begin{cases} z & z > 0 \\ \alpha(e^z - 1) & z \le 0 \end{cases}$$

**Derivative:** $\begin{cases} 1 & z > 0 \\ \alpha e^z = \text{ELU}(z) + \alpha & z \le 0 \end{cases}$

**Properties:**
- Smooth at $z = 0$
- Negative outputs push mean activation toward 0
- Slightly more expensive than ReLU (exponential)

---

### 6. GELU (Gaussian Error Linear Unit)

$$\text{GELU}(z) = z \cdot \Phi(z)$$

where $\Phi(z)$ is the standard normal CDF.

**Approximation:** $\text{GELU}(z) \approx 0.5z\left(1 + \tanh\left[\sqrt{2/\pi}(z + 0.044715z^3)\right]\right)$

**Properties:**
- Smooth, non-monotonic (has a slight dip below 0)
- Acts as a "soft gate": strong signals pass, weak signals are suppressed
- Default in BERT, GPT, modern Transformers

---

### 7. Swish / SiLU

$$\text{Swish}(z) = z \cdot \sigma(z) = \frac{z}{1 + e^{-z}}$$

**Derivative:** $\text{Swish}'(z) = \sigma(z) + z\sigma(z)(1-\sigma(z)) = \sigma(z)(1 + z(1-\sigma(z)))$

**Properties:**
- Smooth, non-monotonic (like GELU)
- Unbounded above, bounded below
- Used in EfficientNet, some LLMs

---

### 8. Softmax

$$\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_j e^{z_j}}$$

**Properties:**
- Outputs sum to 1 (probability distribution)
- Temperature parameter $T$: $\text{softmax}(z_i/T)$
  - $T \to 0$: argmax (one-hot)
  - $T \to \infty$: uniform
  - $T = 1$: standard

**Derivative:** $\frac{\partial \text{softmax}_i}{\partial z_j} = \text{softmax}_i(\delta_{ij} - \text{softmax}_j)$

**Pen & paper: Temperature effect**

$\mathbf{z} = (2, 1, 0)$

| $T$ | softmax |
|-----|---------|
| 0.5 | $(0.844, 0.114, 0.042)$ — sharper |
| 1.0 | $(0.665, 0.245, 0.090)$ — standard |
| 2.0 | $(0.506, 0.307, 0.186)$ — flatter |
| 10.0 | $(0.366, 0.332, 0.302)$ — nearly uniform |

### Choosing the right activation

| Situation | Recommended | Why |
|-----------|------------|-----|
| Hidden layers (CNN, MLP) | ReLU or GELU | Fast, no vanishing gradient |
| Transformer hidden | GELU or SiLU | Smooth, empirically best |
| Binary output | Sigmoid | Outputs probability in $(0,1)$ |
| Multi-class output | Softmax | Outputs probability distribution |
| LSTM gates | Sigmoid | Gates need $(0,1)$ range |
| LSTM cell | Tanh | Centred, bounded |
| Worried about dying ReLU | Leaky ReLU or ELU | Non-zero negative gradient |

## Python Verification

```python
# ── Activation Functions Deep Dive ──────────────────────────
import math

def sigmoid(z): return 1 / (1 + math.exp(-min(500, max(-500, z))))
def tanh_fn(z): return math.tanh(z)
def relu(z): return max(0, z)
def leaky_relu(z, a=0.01): return z if z > 0 else a * z
def elu(z, a=1.0): return z if z > 0 else a * (math.exp(z) - 1)
def swish(z): return z * sigmoid(z)
def softplus(z): return math.log(1 + math.exp(min(500, z)))

# Compare all activations
print("=== All activations at key points ===")
header = f"{'z':>5} {'Sig':>6} {'Tanh':>6} {'ReLU':>6} {'Leaky':>6} {'ELU':>6} {'Swish':>6} {'SPlus':>6}"
print(header)
for z_10 in [-30, -20, -10, -5, 0, 5, 10, 20, 30]:
    z = z_10 / 10
    vals = [sigmoid(z), tanh_fn(z), relu(z), leaky_relu(z), elu(z), swish(z), softplus(z)]
    print(f"  {z:+4.1f} " + " ".join(f"{v:6.3f}" for v in vals))

# Derivatives at z=0
print(f"\n=== Derivatives at z=0 ===")
h = 1e-7
for name, fn in [("Sigmoid", sigmoid), ("Tanh", tanh_fn), ("ReLU", relu), 
                  ("Swish", swish), ("Softplus", softplus)]:
    deriv = (fn(0 + h) - fn(0 - h)) / (2*h)
    print(f"  {name:10s}: f'(0) = {deriv:.4f}")

# Softmax temperature
print(f"\n=== Softmax temperature ===")
z = [2.0, 1.0, 0.0]
for T in [0.5, 1.0, 2.0, 10.0]:
    scaled = [zi / T for zi in z]
    max_s = max(scaled)
    exps = [math.exp(s - max_s) for s in scaled]
    total = sum(exps)
    sm = [e / total for e in exps]
    print(f"  T={T:4.1f}: [{', '.join(f'{s:.3f}' for s in sm)}]")

# Gradient flow: 10 layers
print(f"\n=== Gradient through 10 layers ===")
for name, max_grad in [("Sigmoid", 0.25), ("Tanh", 1.0), ("ReLU", 1.0)]:
    grad = max_grad ** 10
    print(f"  {name}: max_grad^10 = {max_grad}^10 = {grad:.6f}")
```

## Visualisation — A complete activation-function gallery

Modern deep-learning includes more than just sigmoid / tanh / ReLU.
This plot draws **eight** activations together — including newer
ones (Swish, Mish, GELU, ELU) that have become standard in
state-of-the-art models.

```python
# ── Visualising the modern activation-function gallery ──────
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 400)

def sigmoid(z):  return 1.0 / (1.0 + np.exp(-z))
def tanh(z):     return np.tanh(z)
def relu(z):     return np.maximum(0, z)
def leaky(z):    return np.where(z > 0, z, 0.1 * z)
def elu(z, a=1): return np.where(z > 0, z, a * (np.exp(z) - 1))
def gelu(z):     return 0.5 * z * (1 + np.tanh(np.sqrt(2/np.pi) * (z + 0.044715*z**3)))
def swish(z):    return z * sigmoid(z)
def mish(z):     return z * np.tanh(np.log(1 + np.exp(z)))

activations = [
    ("Sigmoid",   sigmoid, "tab:blue"),
    ("Tanh",      tanh,    "tab:orange"),
    ("ReLU",      relu,    "tab:green"),
    ("Leaky ReLU", leaky,  "tab:red"),
    ("ELU",       elu,     "tab:purple"),
    ("GELU",      gelu,    "tab:brown"),
    ("Swish",     swish,   "tab:pink"),
    ("Mish",      mish,    "tab:gray"),
]

fig, axes = plt.subplots(1, 2, figsize=(14, 5.5))

# (1) The activations themselves.
ax = axes[0]
for name, f, color in activations:
    ax.plot(x, f(x), lw=2, color=color, label=name)
ax.axhline(0, color="black", lw=0.4); ax.axvline(0, color="black", lw=0.4)
ax.set_xlim(-5, 5); ax.set_ylim(-1.5, 5.5)
ax.set_title("Activation gallery\n(modern nets favour smooth ReLU variants)")
ax.set_xlabel("z"); ax.set_ylabel("a(z)")
ax.legend(fontsize=8, loc="upper left"); ax.grid(True, alpha=0.3)

# (2) Their derivatives — what gets multiplied through backprop.
ax = axes[1]
def deriv(f, z, h=1e-4): return (f(z + h) - f(z - h)) / (2 * h)
for name, f, color in activations:
    ax.plot(x, deriv(f, x), lw=2, color=color, label=f"d/dz {name}")
ax.axhline(0, color="black", lw=0.4)
ax.axhline(1, color="grey", lw=0.5, linestyle=":")
ax.set_xlim(-5, 5); ax.set_ylim(-0.3, 1.4)
ax.set_title("Derivatives — what backprop multiplies\n(higher = better gradient flow)")
ax.set_xlabel("z"); ax.set_ylabel("a'(z)")
ax.legend(fontsize=8); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the choice-guide.
print("Activation cheat-sheet for picking one:")
print("  Hidden layers (default)        : ReLU or GELU")
print("  Hidden layers (Transformers)   : GELU (used in BERT, GPT)")
print("  Hidden layers (newer CNNs)     : Swish / Mish")
print("  Binary classifier output       : Sigmoid")
print("  Multi-class classifier output  : Softmax (a vector activation)")
print("  LSTM / GRU gates               : Sigmoid (the gate values must lie in (0,1))")
print("  Output of variational encoders : sometimes tanh (bounded latent codes)")
```

## Connection to CS / Games / AI / Business / Industry

- **Model architecture decisions** — choosing activation = choosing gradient flow properties
- **Knowledge distillation** — softmax temperature controls "soft labels" for teaching smaller models
- **Attention** — softmax produces attention weights in Transformers
- **GELU everywhere** — GPT-2/3/4, BERT, ViT, LLaMA all use GELU
- **Mixture of Experts** — gating networks often use softmax or sigmoid gates
- **NVIDIA H100 / TensorRT inference kernels** — fused GELU and SiLU kernels in cuDNN and CUTLASS are hand-tuned for Hopper SMs; these run at every Anthropic, OpenAI, and Microsoft Azure inference endpoint.
- **Apple Neural Engine (A17/M3 ANE)** — on-device Core ML uses ReLU6 and hard-sigmoid (Howard et al. MobileNetV3) because they map to fixed-point INT8 hardware ops without floating-point exp, saving battery on iPhone Photos and Siri models.
- **Fraud detection (Stripe Radar, PayPal, Visa Advanced Authorization)** — final-layer sigmoid outputs $P(\text{fraud})$; thresholds on the sigmoid value (typically 0.5–0.9 depending on chargeback cost) gate billions of \$ in transactions per day.
- **Medical-device AI (FDA-cleared, Caption Health, Aidoc, Viz.ai)** — ICU stroke-detection and echocardiography models use sigmoid output probabilities calibrated to FDA 510(k) sensitivity/specificity thresholds for clinical deployment.

## Check Your Understanding

1. **Pen & paper:** Derive the derivative of Swish: $\frac{d}{dz}[z \cdot \sigma(z)]$.
2. **Pen & paper:** Compute softmax of $(1, 2, 3)$ at temperature $T = 2$.
3. **Pen & paper:** Show that GELU$(z) \approx z$ for large positive $z$ and $\approx 0$ for large negative $z$.
4. **Think about it:** If ReLU works well, why did GELU become the default in Transformers?
