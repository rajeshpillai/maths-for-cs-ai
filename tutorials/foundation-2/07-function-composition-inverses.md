# Function Composition and Inverses

## Intuition

In programming, you chain functions all the time: `process(clean(load(data)))`.
Function composition is the mathematical version — feed the output of one
function into the input of another.  Inverse functions are the "undo" button:
if $f$ encrypts, $f^{-1}$ decrypts.

## Prerequisites

- Foundation 1, Lesson 6: Functions

## From First Principles

### Composition: $f \circ g$

Given two functions $f$ and $g$, the **composition** $f \circ g$ means
"apply $g$ first, then $f$":

$$(f \circ g)(x) = f(g(x))$$

**Order matters:** $f(g(x))$ is generally **not** the same as $g(f(x))$.

### Pen & paper: numeric example

Let $f(x) = 2x + 1$ and $g(x) = x^2$.

**Compute $f(g(3))$:**

1. Inner function first: $g(3) = 3^2 = 9$
2. Outer function: $f(9) = 2(9) + 1 = 19$

**Compute $g(f(3))$:**

1. Inner: $f(3) = 2(3) + 1 = 7$
2. Outer: $g(7) = 7^2 = 49$

$f(g(3)) = 19 \neq 49 = g(f(3))$ — composition is **not commutative**.

### Pen & paper: algebraic composition

Find $(f \circ g)(x)$ where $f(x) = 2x + 1$, $g(x) = x^2$:

$(f \circ g)(x) = f(g(x)) = f(x^2) = 2(x^2) + 1 = 2x^2 + 1$

Find $(g \circ f)(x)$:

$(g \circ f)(x) = g(f(x)) = g(2x+1) = (2x+1)^2 = 4x^2 + 4x + 1$

These are different functions.

### Inverse functions

A function $f$ has an inverse $f^{-1}$ if $f^{-1}$ "undoes" $f$:

$$f(f^{-1}(x)) = x \quad \text{and} \quad f^{-1}(f(x)) = x$$

**Finding the inverse algebraically:**

1. Write $y = f(x)$
2. Swap $x$ and $y$
3. Solve for $y$
4. The result is $f^{-1}(x)$

### Pen & paper: find the inverse of $f(x) = 3x - 2$

1. $y = 3x - 2$
2. Swap: $x = 3y - 2$
3. Solve: $x + 2 = 3y$ → $y = \frac{x + 2}{3}$

So $f^{-1}(x) = \frac{x + 2}{3}$.

**Verify:** $f(f^{-1}(5)) = f\!\left(\frac{5+2}{3}\right) = f\!\left(\frac{7}{3}\right) = 3 \cdot \frac{7}{3} - 2 = 7 - 2 = 5$ ✓

### The horizontal line test

A function is invertible (one-to-one) if and only if **no horizontal line
crosses its graph more than once**.

- $f(x) = x^2$ fails (e.g. $f(2) = f(-2) = 4$) — not invertible on all of $\mathbb{R}$
- $f(x) = x^3$ passes — invertible

To make $x^2$ invertible, **restrict the domain**: $f(x) = x^2$ for $x \geq 0$
has inverse $f^{-1}(x) = \sqrt{x}$.

### Graphical relationship

The graph of $f^{-1}$ is the **reflection of $f$ across the line $y = x$**.

Reason: if $(a, b)$ is on $f$, then $f(a) = b$, so $f^{-1}(b) = a$, meaning
$(b, a)$ is on $f^{-1}$.  Swapping coordinates = reflecting across $y = x$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# (a) Composition: show f, g, and f(g(x))
ax = axes[0]
x = np.linspace(-2, 3, 200)
f = lambda t: 2*t + 1
g = lambda t: t**2
ax.plot(x, g(x), 'b-', linewidth=2, label='$g(x) = x^2$')
ax.plot(x, f(x), 'r-', linewidth=2, label='$f(x) = 2x + 1$')
ax.plot(x, f(g(x)), 'green', linewidth=2, label='$f(g(x)) = 2x^2 + 1$')
# Show the chain for x = 1.5
xv = 1.5
gv = g(xv)
fgv = f(gv)
ax.annotate(f'g({xv}) = {gv}', (xv, gv), (xv+0.5, gv+1),
            arrowprops=dict(arrowstyle='->'), fontsize=9, color='blue')
ax.annotate(f'f({gv}) = {fgv}', (xv, fgv), (xv+0.5, fgv+1),
            arrowprops=dict(arrowstyle='->'), fontsize=9, color='green')
ax.set_ylim(-3, 12)
ax.set_title('Function composition')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)

# (b) Function and its inverse reflected across y = x
ax = axes[1]
x = np.linspace(-1, 5, 200)
f_line = lambda t: 3*t - 2
f_inv = lambda t: (t + 2) / 3
ax.plot(x, f_line(x), 'b-', linewidth=2, label='$f(x) = 3x - 2$')
ax.plot(x, f_inv(x), 'r-', linewidth=2, label='$f^{-1}(x) = (x+2)/3$')
ax.plot(x, x, 'k--', linewidth=1, alpha=0.5, label='$y = x$')
# Mark a point and its reflection
ax.plot(2, f_line(2), 'bo', markersize=8)
ax.plot(f_line(2), 2, 'ro', markersize=8)
ax.annotate('(2, 4)', (2, 4), (0.5, 5), arrowprops=dict(arrowstyle='->'),
            fontsize=10, color='blue')
ax.annotate('(4, 2)', (4, 2), (4.5, 0.5), arrowprops=dict(arrowstyle='->'),
            fontsize=10, color='red')
ax.set_xlim(-1, 6)
ax.set_ylim(-3, 6)
ax.set_aspect('equal')
ax.set_title('Function and inverse (reflected across y = x)')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('composition_inverses.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Function Composition and Inverses ────────────────────────

# Composition
print("=== Composition ===")
f = lambda x: 2*x + 1
g = lambda x: x**2

print(f"f(x) = 2x + 1, g(x) = x^2")
for x in [0, 1, 2, 3]:
    fg = f(g(x))
    gf = g(f(x))
    print(f"  x={x}: f(g({x})) = f({g(x)}) = {fg}, "
          f"g(f({x})) = g({f(x)}) = {gf}")

# Inverse
print(f"\n=== Inverse of f(x) = 3x - 2 ===")
f = lambda x: 3*x - 2
f_inv = lambda x: (x + 2) / 3

print("Verify f(f_inv(x)) = x:")
for x in [1, 5, 10, -3]:
    result = f(f_inv(x))
    print(f"  f(f_inv({x})) = f({f_inv(x):.4f}) = {result:.4f}")

print("\nVerify f_inv(f(x)) = x:")
for x in [1, 5, 10, -3]:
    result = f_inv(f(x))
    print(f"  f_inv(f({x})) = f_inv({f(x)}) = {result:.4f}")

# Restricted domain: sqrt as inverse of x^2
print(f"\n=== sqrt is inverse of x^2 (for x >= 0) ===")
import math
for x in [0, 1, 4, 9, 16]:
    print(f"  sqrt({x}^2) = sqrt({x**2}) = {math.sqrt(x**2):.0f}")
    print(f"  (sqrt({x}))^2 = ({math.sqrt(x):.2f})^2 = {math.sqrt(x)**2:.2f}")
```

## Connection to CS / Games / AI

- **Function pipelines** — `data |> clean |> transform |> model` is composition
- **Chain rule** — the derivative of a composition $f(g(x))$ is
  $f'(g(x)) \cdot g'(x)$; this IS backpropagation
- **Encryption/decryption** — encrypt is $f$, decrypt is $f^{-1}$
- **Encoding/decoding** — autoencoders learn $f$ (encode) and $f^{-1}$ (decode)
- **Undo systems** — every invertible operation in an editor has an inverse

## Check Your Understanding

1. **Pen & paper:** Given $f(x) = x + 3$ and $g(x) = 2x$, compute
   $f(g(4))$ and $g(f(4))$.  Are they equal?
2. **Pen & paper:** Find the inverse of $f(x) = \frac{x - 5}{2}$.
   Verify by showing $f(f^{-1}(x)) = x$.
3. **Pen & paper:** Does $f(x) = x^2 - 4x + 3$ have an inverse on all of
   $\mathbb{R}$?  If not, suggest a domain restriction that makes it
   invertible.  (Hint: complete the square first.)
