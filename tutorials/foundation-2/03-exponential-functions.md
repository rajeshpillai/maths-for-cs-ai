# Exponential Functions

## Intuition

A population that doubles every hour, a rumour that spreads to twice as many
people each day, a savings account earning compound interest — all follow
exponential growth.  Exponentials are the fastest-growing functions you will
meet, and they appear everywhere in CS: from algorithm complexity ($O(2^n)$) to
neural-network activations (softmax uses $e^x$).

## Prerequisites

- Foundation 1, Lesson 12: Indices and Powers

## From First Principles

### What is an exponential function?

$$f(x) = a^x \quad \text{where } a > 0, \; a \neq 1$$

The **base** $a$ is a fixed positive number.  The **exponent** $x$ is the
variable.  Compare with a power function $x^n$ where the base varies and the
exponent is fixed — exponentials grow much faster.

### Key properties (derive by substitution)

| Property | Why |
|----------|-----|
| $a^0 = 1$ so $f(0) = 1$ | $y$-intercept is always $(0, 1)$ |
| $a^x > 0$ for all $x$ | Positive base to any power stays positive |
| As $x \to -\infty$: $a^x \to 0$ (for $a > 1$) | Horizontal asymptote $y = 0$ |
| As $x \to +\infty$: $a^x \to \infty$ (for $a > 1$) | Unbounded growth |

### Growth vs decay

- $a > 1$: **exponential growth** (curve rises steeply to the right)
- $0 < a < 1$: **exponential decay** (curve falls toward zero)

Note: $\left(\tfrac{1}{2}\right)^x = 2^{-x}$, so decay is just a reflection
of growth.

### Pen & paper: build a table for $2^x$

| $x$  | $-3$  | $-2$  | $-1$  | $0$ | $1$ | $2$ | $3$ | $4$  |
|------|-------|-------|-------|-----|-----|-----|-----|------|
| $2^x$ | $1/8$ | $1/4$ | $1/2$ | $1$ | $2$ | $4$ | $8$ | $16$ |

Notice: each step right **multiplies** by 2.  That multiplicative pattern is
the hallmark of exponentials.

### The natural base $e$

Consider investing \$1 at 100% annual interest, compounded $n$ times per year:

$$A = \left(1 + \frac{1}{n}\right)^n$$

| $n$ | $A$ |
|-----|-----|
| $1$ | $2.000$ |
| $10$ | $2.594$ |
| $100$ | $2.705$ |
| $1000$ | $2.717$ |
| $\to \infty$ | $2.71828\ldots = e$ |

$$e = \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n \approx 2.71828$$

$e$ is special because the function $e^x$ is its own derivative — the rate of
change equals the value.  This makes it the natural choice for calculus, and
therefore for all of ML.

### Pen & paper: compare bases

At $x = 3$: $2^3 = 8$, $e^3 \approx 20.1$, $10^3 = 1000$.

Higher base = faster growth.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 4, 300)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: growth curves for different bases
ax = axes[0]
for base, color, label in [(2, 'blue', '$2^x$'),
                            (np.e, 'red', '$e^x$'),
                            (10, 'green', '$10^x$')]:
    ax.plot(x, base**x, color=color, linewidth=2, label=label)
ax.axhline(0, color='k', linewidth=0.5)
ax.axhline(1, color='gray', linewidth=0.5, linestyle='--', alpha=0.5)
ax.set_ylim(-1, 30)
ax.set_title('Exponential growth: different bases')
ax.legend()
ax.grid(True, alpha=0.3)

# Right: growth vs decay
ax = axes[1]
ax.plot(x, 2**x, 'blue', linewidth=2, label='$2^x$ (growth)')
ax.plot(x, (0.5)**x, 'red', linewidth=2, label='$(1/2)^x$ (decay)')
ax.axhline(0, color='k', linewidth=0.5)
ax.axhline(1, color='gray', linewidth=0.5, linestyle='--', alpha=0.5)
ax.plot(0, 1, 'ko', markersize=6)
ax.annotate('y-intercept (0, 1)', (0, 1), (1, 5),
            arrowprops=dict(arrowstyle='->'), fontsize=10)
ax.set_ylim(-1, 20)
ax.set_title('Growth vs Decay')
ax.legend()
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('exponentials.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Exponential Functions ────────────────────────────────────
import math

# Table for 2^x
print("=== Table for 2^x ===")
for x in range(-3, 5):
    print(f"  2^{x:+d} = {2**x:>8.3f}")

# Approaching e via compound interest
print(f"\n=== Compound interest limit → e ===")
for n in [1, 10, 100, 1_000, 10_000, 100_000]:
    approx = (1 + 1/n)**n
    print(f"  n = {n:>7d}: (1 + 1/n)^n = {approx:.6f}")
print(f"  math.e = {math.e:.6f}")

# Compare bases at x = 3
print(f"\n=== Compare bases at x = 3 ===")
print(f"  2^3  = {2**3}")
print(f"  e^3  = {math.e**3:.4f}")
print(f"  10^3 = {10**3}")

# Verify decay = reflected growth
print(f"\n=== Decay is reflected growth ===")
for x in [-2, -1, 0, 1, 2]:
    growth = 2**x
    decay = (0.5)**x
    reflected = 2**(-x)
    print(f"  x={x:+d}: 2^x = {growth:.4f}, (1/2)^x = {decay:.4f}, "
          f"2^(-x) = {reflected:.4f}")
```

## Connection to CS / Games / AI

- **Algorithm complexity** — brute-force search is $O(2^n)$; exponential
  blowup is why we need clever algorithms
- **Softmax** — the function $\sigma(z_i) = e^{z_i} / \sum e^{z_j}$ converts
  raw scores to probabilities in neural networks
- **Learning rate decay** — training often uses exponentially decaying step
  sizes: $\alpha_t = \alpha_0 \cdot r^t$
- **Radioactive decay / half-life** — models with $(1/2)^{t/\tau}$
- **Binary splitting** — repeatedly halving a search space gives $O(\log n)$,
  the inverse of exponential growth

## Check Your Understanding

1. **Pen & paper:** Build a table for $3^x$ at $x = -2, -1, 0, 1, 2, 3$.
   What is the $y$-intercept?  What is the horizontal asymptote?
2. **Pen & paper:** A bacterial colony triples every hour.  Starting from 100
   cells, write a formula for the population $P(t)$ after $t$ hours and
   compute $P(5)$.
3. **Pen & paper:** Show algebraically that $(1/3)^x = 3^{-x}$.  If $f(x) =
   3^x$, what transformation gives $(1/3)^x$?
