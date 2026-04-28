# Piecewise Functions

## Intuition

A piecewise function uses different formulas on different intervals — like a
taxi meter that charges one rate for the first mile and a different rate after
that.  In ML, the most popular activation function (ReLU) is piecewise: zero
for negative inputs, linear for positive ones.  Understanding piecewise
functions means understanding how neural networks introduce non-linearity.

## Prerequisites

- Foundation 1, Lesson 6: Functions

## From First Principles

### Definition

A **piecewise function** is defined by multiple sub-functions, each applying
on a specific interval:

$$f(x) = \begin{cases} \text{formula}_1, & \text{if } x \in \text{interval}_1 \\ \text{formula}_2, & \text{if } x \in \text{interval}_2 \\ \vdots \end{cases}$$

### Pen & paper: a simple piecewise function

$$f(x) = \begin{cases} x + 2, & \text{if } x < 1 \\ 5 - x, & \text{if } x \geq 1 \end{cases}$$

Build a table:

| $x$ | $-2$ | $0$ | $1$ | $2$ | $4$ |
|-----|------|-----|-----|-----|-----|
| Piece | $x+2$ | $x+2$ | $5-x$ | $5-x$ | $5-x$ |
| $f(x)$ | $0$ | $2$ | $4$ | $3$ | $1$ |

At $x = 1$: we use the second piece ($x \geq 1$), giving $f(1) = 5 - 1 = 4$.

### Graphing piecewise functions

**Step-by-step method:**

1. Graph each piece on its own interval only
2. Use a **solid dot** at endpoints that are included ($\leq$ or $\geq$)
3. Use an **open dot** at endpoints that are excluded ($<$ or $>$)
4. Check whether the pieces connect at the boundary

### Continuity — does the graph jump?

A piecewise function is **continuous** at a boundary $x = c$ if:

$$\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = f(c)$$

In plain English: the left piece and the right piece arrive at the same value,
and the function is defined there.

**Pen & paper — check continuity of our example at $x = 1$:**

- From the left: $\lim_{x \to 1^-}(x+2) = 3$
- From the right: $\lim_{x \to 1^+}(5-x) = 4$
- $3 \neq 4$ → **discontinuous** (the graph jumps)

### The absolute value as a piecewise function

$$|x| = \begin{cases} x, & \text{if } x \geq 0 \\ -x, & \text{if } x < 0 \end{cases}$$

This is continuous at $x = 0$: both pieces give 0.

### Important piecewise functions in ML

**ReLU (Rectified Linear Unit):**

$$\text{ReLU}(x) = \max(0, x) = \begin{cases} 0, & \text{if } x < 0 \\ x, & \text{if } x \geq 0 \end{cases}$$

Continuous at $x = 0$ (both pieces give 0), but the slope changes abruptly.

**Step function (Heaviside):**

$$H(x) = \begin{cases} 0, & \text{if } x < 0 \\ 1, & \text{if } x \geq 0 \end{cases}$$

Discontinuous at $x = 0$.  Used as the simplest threshold classifier.

**Leaky ReLU:**

$$\text{LeakyReLU}(x) = \begin{cases} 0.01x, & \text{if } x < 0 \\ x, & \text{if } x \geq 0 \end{cases}$$

Like ReLU, but with a small slope for negative inputs to avoid "dead neurons."

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(10, 8))

x = np.linspace(-4, 6, 500)

# (a) Simple piecewise with discontinuity
ax = axes[0, 0]
left = x[x < 1]
right = x[x >= 1]
ax.plot(left, left + 2, 'b-', linewidth=2, label='$x + 2$ (x < 1)')
ax.plot(right, 5 - right, 'r-', linewidth=2, label='$5 - x$ (x >= 1)')
ax.plot(1, 3, 'bo', markersize=8, fillstyle='none')  # open dot
ax.plot(1, 4, 'ro', markersize=8)  # solid dot
ax.set_title('Discontinuous piecewise')
ax.legend(fontsize=8)
ax.grid(True, alpha=0.3)

# (b) Absolute value
ax = axes[0, 1]
ax.plot(x, np.abs(x), 'green', linewidth=2, label='$|x|$')
ax.plot(0, 0, 'go', markersize=6)
ax.set_title('Absolute value |x|')
ax.legend()
ax.grid(True, alpha=0.3)

# (c) ReLU
ax = axes[1, 0]
relu = np.maximum(0, x)
ax.plot(x, relu, 'purple', linewidth=2, label='ReLU(x)')
ax.plot(0, 0, 'ko', markersize=6)
ax.set_title('ReLU — the most used activation')
ax.legend()
ax.grid(True, alpha=0.3)

# (d) Leaky ReLU vs Step function
ax = axes[1, 1]
leaky = np.where(x < 0, 0.01 * x, x)
step = np.where(x < 0, 0, 1.0)
ax.plot(x, leaky, 'blue', linewidth=2, label='Leaky ReLU')
ax.plot(x, step, 'red', linewidth=2, label='Step function')
ax.set_title('Leaky ReLU and Step function')
ax.legend()
ax.set_ylim(-1, 5)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('piecewise.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Piecewise Functions ──────────────────────────────────────

# Simple piecewise function
def f(x):
    if x < 1:
        return x + 2
    else:
        return 5 - x

print("=== Piecewise: x+2 if x<1, 5-x if x>=1 ===")
for x in [-2, 0, 0.99, 1, 2, 4]:
    piece = "x+2" if x < 1 else "5-x"
    print(f"  f({x:>5.2f}) = {f(x):.2f}  (using {piece})")

# Check continuity at x = 1
print(f"\n=== Continuity at x = 1 ===")
left_limit = 1 + 2   # as x -> 1 from left
right_limit = 5 - 1  # as x -> 1 from right
print(f"  Left limit:  x + 2 -> {left_limit}")
print(f"  Right limit: 5 - x -> {right_limit}")
print(f"  Continuous? {left_limit == right_limit}")

# ReLU
def relu(x):
    return max(0, x)

print(f"\n=== ReLU ===")
for x in [-3, -1, 0, 1, 3]:
    print(f"  ReLU({x:+d}) = {relu(x)}")

# Leaky ReLU
def leaky_relu(x, alpha=0.01):
    return x if x >= 0 else alpha * x

print(f"\n=== Leaky ReLU (alpha=0.01) ===")
for x in [-3, -1, 0, 1, 3]:
    print(f"  LeakyReLU({x:+d}) = {leaky_relu(x):.2f}")

# Step function
def step(x):
    return 0 if x < 0 else 1

print(f"\n=== Step function ===")
for x in [-2, -0.1, 0, 0.1, 2]:
    print(f"  H({x:>5.1f}) = {step(x)}")
```

## Connection to CS / Games / AI / Business / Industry

- **ReLU** — the default activation function in deep learning; its piecewise
  nature introduces non-linearity while being cheap to compute
- **Conditional logic** — every `if/else` in code defines a piecewise function
- **Tax brackets** — income tax is a piecewise linear function
- **Game damage calculation** — different formulas for melee vs ranged vs
  critical hits
- **Gradient flow** — ReLU's flat region (zero gradient for $x < 0$) causes
  the "dying ReLU" problem; leaky ReLU fixes this

## Check Your Understanding

1. **Pen & paper:** Graph the function $f(x) = \begin{cases} -x, & x < 0 \\ x^2, & 0 \leq x \leq 2 \\ 4, & x > 2 \end{cases}$ and determine whether it is continuous at $x = 0$ and $x = 2$.
2. **Pen & paper:** Write the absolute value function $|x - 3|$ as a piecewise
   function (two pieces).
3. **Pen & paper:** A neuron uses $f(x) = \begin{cases} 0.1x, & x < 0 \\ x, & x \geq 0 \end{cases}$ (Leaky ReLU with $\alpha = 0.1$).  Compute $f(-5)$, $f(0)$, $f(3)$.
   Is this function continuous at $x = 0$?
