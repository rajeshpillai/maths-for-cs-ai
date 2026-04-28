# Function Inverses — Horizontal Line Test, Graphical Reflection, Domain Restriction

## Intuition

In programming, many operations have an "undo": encode/decode, encrypt/decrypt,
compress/decompress.  Mathematically, a function's inverse $f^{-1}$ is its undo
button.  But not every function *can* be undone — if two inputs map to the same
output, which one do you go back to?  This lesson answers: *when* is a function
invertible, *how* to see it graphically, and *how* to make non-invertible
functions invertible by restricting their domain.

## Prerequisites

- Foundation 1, Lesson 6: Function Notation (covers composition, basic inverses, algebraic method)

## From First Principles

### Recap: what makes a function invertible?

A function $f$ is invertible if it is **one-to-one** (injective): different
inputs always produce different outputs.  If $f(a) = f(b)$ implies $a = b$,
then $f$ has an inverse.

The algebraic method for finding inverses (swap $x$ and $y$, solve) was covered
in F1-06.  Here we develop the *visual* and *structural* tools.

### The horizontal line test

**Statement:** A function $f$ is one-to-one (and hence invertible) if and only
if every horizontal line intersects its graph **at most once**.

**Why it works:** A horizontal line at height $y = k$ hits the graph at every
$x$ where $f(x) = k$.  If it hits twice, two different inputs give the same
output — the function cannot be undone at that output.

**Examples (pen & paper — sketch these):**

| Function | Passes HLT? | Invertible? |
|----------|-------------|-------------|
| $f(x) = 2x + 1$ (line, non-horizontal) | Yes | Yes |
| $f(x) = x^2$ (parabola) | No — e.g. $y = 4$ hits at $x = 2$ and $x = -2$ | No (on all $\mathbb{R}$) |
| $f(x) = x^3$ (cubic) | Yes | Yes |
| $f(x) = \sin x$ (oscillates) | No — repeats values | No (on all $\mathbb{R}$) |
| $f(x) = e^x$ (exponential) | Yes | Yes |

### Graphical reflection: $f^{-1}$ is the reflection of $f$ across $y = x$

**Why?** If $(a, b)$ is on the graph of $f$ (meaning $f(a) = b$), then
$f^{-1}(b) = a$, so $(b, a)$ is on the graph of $f^{-1}$.

Swapping coordinates $(a, b) \to (b, a)$ is geometrically a **reflection
across the line $y = x$**.

**Pen & paper exercise:** Plot $f(x) = 2x + 1$ for $x \in [-1, 3]$.

Some points on $f$: $(-1, -1)$, $(0, 1)$, $(1, 3)$, $(2, 5)$.

Reflect across $y = x$: $(-1, -1)$, $(1, 0)$, $(3, 1)$, $(5, 2)$.

These lie on $f^{-1}(x) = \frac{x - 1}{2}$.

**Key observations:**
- Fixed points of $f$ (where $f(a) = a$) lie on the line $y = x$ and are
  also fixed points of $f^{-1}$
- If $f$ is increasing, $f^{-1}$ is also increasing
- If $f$ is decreasing, $f^{-1}$ is also decreasing

### Restricting the domain to create invertibility

When a function fails the horizontal line test, we can **restrict its domain**
to a portion where it *does* pass.

**Example 1: $f(x) = x^2$**

On all of $\mathbb{R}$, this is not invertible ($f(2) = f(-2) = 4$).

**Restrict to $x \geq 0$:**  Now the parabola is only the right half —
every horizontal line hits at most once.

Inverse: $f^{-1}(x) = \sqrt{x}$ (defined for $x \geq 0$).

**Restrict to $x \leq 0$:**  Left half only.

Inverse: $f^{-1}(x) = -\sqrt{x}$ (defined for $x \geq 0$).

**Example 2: $f(x) = \sin x$**

Oscillates forever — not one-to-one.  Restrict to $x \in [-\pi/2, \pi/2]$
where it is strictly increasing.

Inverse: $f^{-1}(x) = \arcsin x$ (defined for $x \in [-1, 1]$).

**Example 3: $f(x) = (x - 3)^2 + 1$**

Vertex at $(3, 1)$.  Restrict to $x \geq 3$ (right branch):

$y = (x-3)^2 + 1$ → $y - 1 = (x-3)^2$ → $x - 3 = \sqrt{y - 1}$ → $x = 3 + \sqrt{y-1}$

Inverse: $f^{-1}(x) = 3 + \sqrt{x - 1}$ for $x \geq 1$.

**Pen & paper:** Complete the square on $f(x) = x^2 - 4x + 3$:

$f(x) = (x - 2)^2 - 1$.  Vertex at $(2, -1)$.

Restrict to $x \geq 2$: inverse is $f^{-1}(x) = 2 + \sqrt{x + 1}$ for $x \geq -1$.

### Domain and range swap

When you invert a function:
- The **domain** of $f$ becomes the **range** of $f^{-1}$
- The **range** of $f$ becomes the **domain** of $f^{-1}$

This is why $\sqrt{x}$ only accepts $x \geq 0$ (the range of $x^2$ for $x \geq 0$).

## Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (a) Horizontal line test: x^2 fails, x^3 passes
ax = axes[0]
x = np.linspace(-2, 2, 200)
ax.plot(x, x**2, 'b-', linewidth=2, label='$x^2$ (fails HLT)')
ax.plot(x, x**3, 'r-', linewidth=2, label='$x^3$ (passes HLT)')
ax.axhline(1, color='green', linestyle='--', alpha=0.7, label='$y = 1$')
# Mark where y=1 hits x^2 (two points)
ax.plot([-1, 1], [1, 1], 'go', markersize=8)
# Mark where y=1 hits x^3 (one point)
ax.plot([1], [1], 'rs', markersize=8)
ax.set_title('Horizontal Line Test')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)
ax.set_ylim(-3, 4)

# (b) f and f^{-1} reflected across y = x
ax = axes[1]
x = np.linspace(-1, 4, 200)
f_vals = 2*x + 1
f_inv_vals = (x - 1) / 2
ax.plot(x, f_vals, 'b-', linewidth=2, label='$f(x) = 2x + 1$')
ax.plot(x, f_inv_vals, 'r-', linewidth=2, label='$f^{-1}(x) = (x-1)/2$')
ax.plot(x, x, 'k--', linewidth=1, alpha=0.5, label='$y = x$')
# Mark reflection pair
ax.plot(1, 3, 'bo', markersize=8)
ax.plot(3, 1, 'ro', markersize=8)
ax.plot([1, 3], [3, 1], 'g:', linewidth=1.5)
ax.annotate('(1, 3)', (1, 3), (0.2, 3.5), fontsize=9, color='blue')
ax.annotate('(3, 1)', (3, 1), (3.2, 0.3), fontsize=9, color='red')
ax.set_xlim(-1, 5)
ax.set_ylim(-1, 5)
ax.set_aspect('equal')
ax.set_title('Reflection across $y = x$')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)

# (c) Domain restriction: x^2 restricted to x >= 0
ax = axes[2]
x_full = np.linspace(-2.5, 2.5, 200)
x_pos = np.linspace(0, 2.5, 200)
x_inv = np.linspace(0, 6, 200)
ax.plot(x_full, x_full**2, 'b--', linewidth=1, alpha=0.4, label='$x^2$ (full)')
ax.plot(x_pos, x_pos**2, 'b-', linewidth=2.5, label='$x^2,\\ x \\geq 0$')
ax.plot(x_inv, np.sqrt(x_inv), 'r-', linewidth=2, label='$\\sqrt{x}$ (inverse)')
ax.plot(x_full, x_full, 'k--', linewidth=1, alpha=0.5, label='$y = x$')
ax.set_xlim(-2.5, 6)
ax.set_ylim(-2.5, 6)
ax.set_aspect('equal')
ax.set_title('Domain restriction makes $x^2$ invertible')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('inverses_reflection_restriction.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Function Inverses: HLT, Reflection, Domain Restriction ────

import math

# Horizontal line test numerically: check if f is injective
print("=== Horizontal Line Test (numerical check) ===")

def passes_hlt(f, domain, tol=1e-9):
    """Check if f appears one-to-one over sampled domain."""
    values = [f(x) for x in domain]
    # Check for repeated outputs
    seen = {}
    for x, y in zip(domain, values):
        for prev_x, prev_y in seen.items():
            if abs(y - prev_y) < tol and abs(x - prev_x) > tol:
                return False, (prev_x, x, y)
        seen[x] = y
    return True, None

import numpy as np
domain = np.linspace(-3, 3, 1000)

result, info = passes_hlt(lambda x: x**2, domain)
print(f"x² on [-3,3]: {'passes' if result else 'FAILS'} HLT")
if info:
    print(f"  Counter-example: f({info[0]:.2f}) = f({info[1]:.2f}) = {info[2]:.2f}")

result, _ = passes_hlt(lambda x: x**3, domain)
print(f"x³ on [-3,3]: {'passes' if result else 'FAILS'} HLT")

result, _ = passes_hlt(lambda x: x**2, np.linspace(0, 3, 1000))
print(f"x² on [0,3]:  {'passes' if result else 'FAILS'} HLT (restricted domain)")

# Graphical reflection: verify (a,b) on f ↔ (b,a) on f_inv
print(f"\n=== Reflection: f(x)=2x+1, f_inv(x)=(x-1)/2 ===")
f = lambda x: 2*x + 1
f_inv = lambda x: (x - 1) / 2
for a in [-1, 0, 1, 2, 3]:
    b = f(a)
    a_back = f_inv(b)
    print(f"  ({a}, {b}) on f  →  ({b}, {a_back:.1f}) on f_inv")

# Domain restriction: x^2 restricted to x >= 0
print(f"\n=== Domain restriction: x² (x≥0) has inverse √x ===")
f_restricted = lambda x: x**2   # only for x >= 0
f_inv_restricted = lambda x: math.sqrt(x)  # only for x >= 0
for x in [0, 1, 2, 3, 4]:
    y = f_restricted(x)
    x_back = f_inv_restricted(y)
    print(f"  f({x}) = {y},  f_inv({y}) = {x_back:.1f}")

# (x-3)^2 + 1 restricted to x >= 3
print(f"\n=== (x-3)²+1 restricted to x≥3: inverse = 3+√(x-1) ===")
g = lambda x: (x - 3)**2 + 1
g_inv = lambda x: 3 + math.sqrt(x - 1)
for x in [3, 4, 5, 6]:
    y = g(x)
    x_back = g_inv(y)
    print(f"  g({x}) = {y},  g_inv({y}) = {x_back:.1f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Encryption/decryption** — encrypt is $f$, decrypt is $f^{-1}$; must be one-to-one
- **Activation functions** — sigmoid's inverse (logit) is used in logistic regression
- **Encoding/decoding** — autoencoders learn approximate $f$ and $f^{-1}$
- **Normalisation** — z-score transform and its inverse (de-normalisation)
- **Domain restriction in practice** — `sqrt()` only accepts non-negative input because it is the inverse of $x^2$ restricted to $x \geq 0$
- **Undo systems** — every invertible operation in an editor must be one-to-one to be undoable

## Check Your Understanding

1. **Pen & paper:** Does $f(x) = |x|$ pass the horizontal line test?  Explain why or why not.
2. **Pen & paper:** Sketch $f(x) = e^x$ and its inverse $f^{-1}(x) = \ln x$ on the same axes.
   Verify that they are reflections across $y = x$ by checking that $(0, 1)$ on $f$ becomes $(1, 0)$ on $f^{-1}$.
3. **Pen & paper:** The function $f(x) = x^2 - 6x + 10$ is not invertible on all of $\mathbb{R}$.
   Complete the square, find the vertex, choose a domain restriction, and find the inverse.
