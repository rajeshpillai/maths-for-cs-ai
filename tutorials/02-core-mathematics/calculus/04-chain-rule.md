# The Chain Rule — The Foundation of Backpropagation

## Intuition

If you know how $y$ changes with $u$, and how $u$ changes with $x$, then you
can figure out how $y$ changes with $x$ — just multiply the rates.  That's the
chain rule.  It's the single most important derivative rule for deep learning
because **backpropagation is just the chain rule applied repeatedly**.

## Prerequisites

- Tier 3, Lesson 2: Derivatives (basic rules)
- Tier 3, Lesson 3: Partial Derivatives

## From First Principles

### Single-variable chain rule

If $y = f(u)$ and $u = g(x)$, then:

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

**Pen & paper:** $y = (3x + 2)^5$

Let $u = 3x + 2$, so $y = u^5$.

$\frac{dy}{du} = 5u^4$, $\frac{du}{dx} = 3$

$\frac{dy}{dx} = 5(3x + 2)^4 \cdot 3 = 15(3x + 2)^4$

### Multivariable chain rule

If $z = f(x, y)$ where $x = x(t)$ and $y = y(t)$:

$$\frac{dz}{dt} = \frac{\partial z}{\partial x}\frac{dx}{dt} + \frac{\partial z}{\partial y}\frac{dy}{dt}$$

**Pen & paper:** $z = x^2 + xy$, $x = 2t$, $y = t^2$

$\frac{dz}{dt} = (2x + y)(2) + (x)(2t)$

At $t = 1$: $x = 2, y = 1$

$= (4 + 1)(2) + (2)(2) = 10 + 4 = 14$

### The chain rule as a computation graph

This is how neural networks think about derivatives.

**Forward pass:**

```
x → [multiply by w] → z=wx → [add b] → a=z+b → [sigmoid] → y=σ(a)
```

**Backward pass (chain rule):**

$$\frac{\partial y}{\partial w} = \frac{\partial y}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial w}$$

$= \sigma'(a) \cdot 1 \cdot x = \sigma'(a) \cdot x$

### Pen & paper: Backpropagation for a simple network

**Setup:** Input $x = 2$, weight $w = 0.5$, bias $b = 0.1$, target $t = 1$.

**Forward pass:**

$z = wx = 0.5 \times 2 = 1.0$
$a = z + b = 1.0 + 0.1 = 1.1$
$\hat{y} = \sigma(a) = \sigma(1.1) = \frac{1}{1 + e^{-1.1}} \approx 0.75$
$L = (\hat{y} - t)^2 = (0.75 - 1)^2 = 0.0625$

**Backward pass (compute all derivatives):**

$\frac{\partial L}{\partial \hat{y}} = 2(\hat{y} - t) = 2(0.75 - 1) = -0.5$

$\frac{\partial \hat{y}}{\partial a} = \sigma(a)(1 - \sigma(a)) = 0.75 \times 0.25 = 0.1875$

$\frac{\partial a}{\partial z} = 1$

$\frac{\partial z}{\partial w} = x = 2$

**Chain it all together:**

$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial a} \cdot \frac{\partial a}{\partial z} \cdot \frac{\partial z}{\partial w}$

$= (-0.5) \times 0.1875 \times 1 \times 2 = -0.1875$

**Gradient descent step** ($\alpha = 0.1$):

$w \leftarrow 0.5 - 0.1 \times (-0.1875) = 0.5 + 0.01875 = 0.51875$

The weight increased — pushing the output closer to the target of 1.

### Chain rule with vectors (the key to deep learning)

For a layer $\mathbf{y} = f(\mathbf{Wx})$:

$$\frac{\partial L}{\partial \mathbf{W}} = \frac{\partial L}{\partial \mathbf{y}} \cdot \frac{\partial \mathbf{y}}{\partial \mathbf{W}}$$

This is matrix calculus, and it's what frameworks like PyTorch compute automatically.

## Python Verification

```python
# ── Chain Rule & Backpropagation ────────────────────────────
import math

# Single variable: d/dx (3x+2)^5 at x=1
print("=== Single-variable chain rule ===")
h = 1e-8
f = lambda x: (3*x + 2)**5
x = 1.0
numerical = (f(x+h) - f(x)) / h
analytical = 15 * (3*1 + 2)**4
print(f"Numerical: {numerical:.2f}")
print(f"Analytical: {analytical}")

# Backpropagation example
print("\n=== Backpropagation (pen & paper verification) ===")
x = 2.0
w = 0.5
b = 0.1
t = 1.0

# Forward pass
z = w * x
a = z + b
y_hat = 1 / (1 + math.exp(-a))  # sigmoid
L = (y_hat - t) ** 2

print(f"Forward: z={z}, a={a}, ŷ={y_hat:.4f}, L={L:.4f}")

# Backward pass
dL_dy = 2 * (y_hat - t)
dy_da = y_hat * (1 - y_hat)  # sigmoid derivative
da_dz = 1
dz_dw = x

dL_dw = dL_dy * dy_da * da_dz * dz_dw
dL_db = dL_dy * dy_da * 1  # da/db = 1

print(f"\nBackward:")
print(f"  ∂L/∂ŷ = {dL_dy:.4f}")
print(f"  ∂ŷ/∂a = {dy_da:.4f}")
print(f"  ∂L/∂w = {dL_dw:.4f}")
print(f"  ∂L/∂b = {dL_db:.4f}")

# Verify numerically
h = 1e-8
def loss(w_val, b_val):
    z = w_val * x
    a = z + b_val
    y = 1 / (1 + math.exp(-a))
    return (y - t) ** 2

dL_dw_num = (loss(w + h, b) - loss(w, b)) / h
dL_db_num = (loss(w, b + h) - loss(w, b)) / h
print(f"\nNumerical check:")
print(f"  ∂L/∂w = {dL_dw_num:.4f} (analytical: {dL_dw:.4f})")
print(f"  ∂L/∂b = {dL_db_num:.4f} (analytical: {dL_db:.4f})")

# Gradient descent
alpha = 0.1
w_new = w - alpha * dL_dw
b_new = b - alpha * dL_db
y_new = 1 / (1 + math.exp(-(w_new * x + b_new)))
print(f"\nAfter update: w={w_new:.5f}, b={b_new:.5f}, ŷ={y_new:.4f} (closer to {t})")
```

## Visualisation — The chain rule as a flow of slopes

The chain rule is the calculus of *composed* functions: if $y = f(g(x))$
then $\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$. Two pictures pin this down:
the local slope of a composition really IS the product of the inner and
outer slopes; and the *vanishing gradient problem* is just what happens
when you multiply many small slopes together.

```python
# ── Visualising the chain rule ──────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5.3))

# (1) Outer function f(u) = sin(u), inner g(x) = x²,
#     composed h(x) = sin(x²).  At x = √(π/4):
#       g(x) = π/4,  g'(x) = 2x = √(π/2)
#       f(u) = sin(u),  f'(u) = cos(u),  f'(g(x)) = cos(π/4) = √2/2
#     so h'(x) = f'(g(x)) · g'(x) = (√2/2) · √(π/2)
ax = axes[0]
def g(x):  return x ** 2
def gp(x): return 2 * x
def f(u):  return np.sin(u)
def fp(u): return np.cos(u)
def h(x):  return np.sin(x ** 2)
def hp(x): return fp(g(x)) * gp(x)              # the chain rule!

xs = np.linspace(0, 2.4, 400)
ax.plot(xs, h(xs), color="tab:blue", lw=2, label="h(x) = sin(x²)")

x0 = np.sqrt(np.pi / 4)                          # x where g(x) = π/4
slope_inner = gp(x0)                             # g'(x₀) = 2x₀
slope_outer = fp(g(x0))                          # f'(g(x₀)) = cos(π/4)
slope_total = slope_outer * slope_inner          # chain rule

# Tangent line to h at x₀.
tangent = h(x0) + slope_total * (xs - x0)
ax.plot(xs, tangent, color="tab:red", lw=1.8, linestyle="--",
        label=(f"tangent slope = f'(g(x₀)) · g'(x₀)\n"
               f"         = cos(π/4) · 2·x₀\n"
               f"         = {slope_outer:.3f} × {slope_inner:.3f}\n"
               f"         = {slope_total:.3f}"))
ax.scatter([x0], [h(x0)], color="black", s=80, zorder=5)
ax.set_title("The chain rule in action\nh'(x₀) = f'(g(x₀)) · g'(x₀)")
ax.set_xlabel("x"); ax.set_ylabel("h(x)")
ax.set_xlim(0, 2.4); ax.set_ylim(-1.2, 1.4)
ax.legend(loc="lower left", fontsize=9); ax.grid(True, alpha=0.3)

# (2) Vanishing-gradient demonstration.
# In a deep network with sigmoid activations, the gradient w.r.t. an
# early-layer parameter is the PRODUCT of σ'(z_k) values along the
# chain. σ' tops out at 0.25 — so multiplying many of them gives a
# tiny number, gradient ≈ 0, and that layer barely learns.
ax = axes[1]
depths = np.arange(1, 31)
prod_05  = 0.50 ** depths        # if every factor is 0.5 (a kind activation)
prod_025 = 0.25 ** depths        # peak σ' value (very generous!)
prod_2   = 2.00 ** depths        # if factors are > 1 (exploding gradients!)
ax.plot(depths, prod_025, "o-", lw=2, label="each factor = 0.25 (max σ')")
ax.plot(depths, prod_05,  "o-", lw=2, label="each factor = 0.5")
ax.plot(depths, prod_2,   "o-", lw=2, label="each factor = 2.0 (exploding!)")
ax.set_yscale("log")
ax.axhline(1, color="black", lw=0.6)
ax.axhline(1e-5, color="grey", lw=0.6, linestyle=":")
ax.text(31, 1e-5, "≈ float32\nnoise floor", fontsize=8, color="grey", va="center")
ax.set_xlabel("network depth (number of chain-rule factors)")
ax.set_ylabel("product of slopes  (log scale)")
ax.set_title("Why deep networks need ReLU/skip connections:\nproducts of small slopes vanish exponentially")
ax.legend(fontsize=9); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Verify the analytical chain rule answer numerically by finite differences.
x0 = np.sqrt(np.pi / 4)
analytical = np.cos(x0 ** 2) * 2 * x0
hh = 1e-6
numerical = (np.sin((x0 + hh) ** 2) - np.sin(x0 ** 2)) / hh
print(f"At x₀ = √(π/4) ≈ {x0:.4f}:")
print(f"  Analytical h'(x₀) = f'(g(x₀)) · g'(x₀) = {analytical:.6f}")
print(f"  Numerical (finite difference)         = {numerical:.6f}")
print(f"  Gap (smaller h → smaller gap)          = {abs(analytical - numerical):.2e}")
```

**Two consequences the visuals make undeniable:**

- **Composition multiplies slopes.** The slope of $\sin(x^2)$ at any
  point is *exactly* the product of the outer slope $\cos(x^2)$ and
  the inner slope $2x$. This is the entire content of the chain rule
  — and it is what makes **backpropagation possible**: gradient at a
  parameter = (gradient at output) × (downstream Jacobian-vector
  products) all the way back.
- **Vanishing and exploding gradients are a calculus problem, not a
  software bug.** When every factor in the chain is $\le 0.25$ (the
  maximum derivative of a sigmoid), a 30-layer chain produces a
  gradient of $0.25^{30} \approx 10^{-18}$. That number is below the
  noise floor of float32, so early-layer weights effectively don't
  receive any learning signal. ReLU (whose derivative is exactly 1
  on the active half), batch normalisation, and residual ("skip")
  connections were all invented to fight this single product-of-slopes
  effect.

## Connection to CS / Games / AI

- **Backpropagation IS the chain rule** — every neural network training step applies this
- **Automatic differentiation** — PyTorch/JAX build computation graphs and apply the chain rule automatically
- **Vanishing gradients** — when many chain-rule factors are < 1, the product shrinks to ~0 (why deep networks are hard to train with sigmoid)
- **Exploding gradients** — when factors are > 1, gradients blow up (why we use gradient clipping)

## Check Your Understanding

1. **Pen & paper:** Find $\frac{d}{dx}\left(e^{\sin(x^2)}\right)$ using the chain rule.
2. **Pen & paper:** For $f(x, y) = x^2 y$, $x = \cos t$, $y = \sin t$, find $\frac{df}{dt}$ at $t = \pi/4$.
3. **Pen & paper:** Repeat the backpropagation example above but with $w = 1, b = 0, x = 1, t = 0$.  Compute all derivatives and the gradient descent step.
4. **Think about it:** Why does the chain rule naturally give rise to the "backward" direction in backpropagation?
