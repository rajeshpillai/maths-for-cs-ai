# Continuity and Discontinuity — A Review

## Intuition

A function is **continuous** if you can draw its graph without lifting your
pen.  That simple idea has profound consequences: continuous functions cannot
"skip" values, which means if a game character's health goes from 100 to 0,
it must pass through every value in between.  This lesson classifies the three
ways a function can fail to be continuous, and introduces the Intermediate
Value Theorem — a guarantee that continuous functions hit every target.

## Prerequisites

- Foundation 4, Lesson 1: Limits — Intuitive Introduction

## From First Principles

### Definition of continuity at a point

A function $f$ is **continuous at $x = a$** if all three conditions hold:

1. $f(a)$ is defined (the function has a value there)
2. $\lim_{x \to a} f(x)$ exists (the limit from both sides agrees)
3. $\lim_{x \to a} f(x) = f(a)$ (the limit equals the function value)

If any condition fails, the function is **discontinuous** at $a$.

### Type 1 — Removable discontinuity (a "hole")

The limit exists, but either $f(a)$ is undefined or $f(a) \ne \lim_{x \to a} f(x)$.

**Pen & paper example:**

$$f(x) = \frac{x^2 - 4}{x - 2}$$

Factor: $f(x) = \frac{(x-2)(x+2)}{x-2} = x + 2$ for $x \ne 2$.

$\lim_{x \to 2} f(x) = 4$, but $f(2)$ is undefined (division by zero).

The graph is the line $y = x + 2$ with a **hole** at $(2, 4)$.

We can "remove" this discontinuity by defining $f(2) = 4$.

### Type 2 — Jump discontinuity

Both one-sided limits exist but are not equal:
$\lim_{x \to a^-} f(x) \ne \lim_{x \to a^+} f(x)$.

**Pen & paper example:**

$$g(x) = \begin{cases} x + 1 & x < 1 \\ x + 3 & x \ge 1 \end{cases}$$

$\lim_{x \to 1^-} g(x) = 2$, $\lim_{x \to 1^+} g(x) = 4$.

The function "jumps" from 2 to 4.  This cannot be repaired by redefining a
single point.

### Type 3 — Infinite discontinuity (vertical asymptote)

At least one one-sided limit is $\pm\infty$.

**Pen & paper example:**

$$h(x) = \frac{1}{x - 3}$$

$\lim_{x \to 3^-} h(x) = -\infty$, $\lim_{x \to 3^+} h(x) = +\infty$.

The graph shoots off to infinity — a vertical asymptote at $x = 3$.

### Summary table

| Type | Limit exists? | Can fix? | Example |
|------|--------------|----------|---------|
| Removable | Yes | Redefine $f(a)$ | $(x^2-4)/(x-2)$ at $x=2$ |
| Jump | No (sides differ) | No | Piecewise step function |
| Infinite | No ($\pm\infty$) | No | $1/(x-3)$ at $x=3$ |

### The Intermediate Value Theorem (IVT) — intuitive version

If $f$ is continuous on $[a, b]$ and $f(a) < k < f(b)$ (or vice versa),
then there exists some $c$ in $(a, b)$ where $f(c) = k$.

**Plain English:** A continuous function cannot jump over a value.  If it starts
below a line and ends above it, it must cross the line somewhere.

**Pen & paper application:** Show that $x^3 - x - 1 = 0$ has a root between
$x = 1$ and $x = 2$.

$f(1) = 1 - 1 - 1 = -1 < 0$

$f(2) = 8 - 2 - 1 = 5 > 0$

Since $f$ is continuous (polynomial) and changes sign, by IVT there is a root
$c \in (1, 2)$ where $f(c) = 0$.

### Visualisation — three discontinuity types side by side

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(14, 4.5))

# Removable discontinuity: (x²-4)/(x-2) at x=2
ax = axes[0]
x = np.linspace(-1, 5, 500)
mask = np.abs(x - 2) > 0.02
y = np.where(mask, (x**2 - 4) / (x - 2), np.nan)
ax.plot(x[mask], y[mask], 'b-', linewidth=2)
ax.plot(2, 4, 'wo', markersize=10, markeredgecolor='blue', markeredgewidth=2,
        zorder=5)  # open circle (hole)
ax.set_title('Removable\n$f(x) = (x^2-4)/(x-2)$')
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.grid(True, alpha=0.3)
ax.set_xlim(-1, 5)
ax.set_ylim(0, 7)

# Jump discontinuity at x=1
ax = axes[1]
x_left = np.linspace(-1, 1, 200)
x_right = np.linspace(1, 4, 200)
ax.plot(x_left, x_left + 1, 'b-', linewidth=2)
ax.plot(x_right, x_right + 3, 'b-', linewidth=2)
ax.plot(1, 2, 'wo', markersize=10, markeredgecolor='blue', markeredgewidth=2,
        zorder=5)  # open at left limit
ax.plot(1, 4, 'bo', markersize=8, zorder=5)  # closed at right value
ax.set_title('Jump\n$g(x) = x+1$ if $x<1$, $x+3$ if $x \\geq 1$')
ax.set_xlabel('x')
ax.grid(True, alpha=0.3)
ax.set_xlim(-1, 4)
ax.set_ylim(-1, 8)

# Infinite discontinuity: 1/(x-3)
ax = axes[2]
x1 = np.linspace(0, 2.95, 200)
x2 = np.linspace(3.05, 6, 200)
ax.plot(x1, 1/(x1 - 3), 'b-', linewidth=2)
ax.plot(x2, 1/(x2 - 3), 'b-', linewidth=2)
ax.axvline(3, color='red', linestyle='--', alpha=0.5, label='x = 3')
ax.set_title('Infinite\n$h(x) = 1/(x-3)$')
ax.set_xlabel('x')
ax.legend(fontsize=9)
ax.grid(True, alpha=0.3)
ax.set_xlim(0, 6)
ax.set_ylim(-10, 10)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Continuity and Discontinuity ────────────────────────────
import math

# Type 1: Removable — (x²-4)/(x-2) at x=2
print("=== Removable discontinuity: (x²-4)/(x-2) at x=2 ===")
f = lambda x: (x**2 - 4) / (x - 2)
for x in [1.9, 1.99, 1.999, 2.001, 2.01, 2.1]:
    print(f"  f({x:.3f}) = {f(x):.6f}")
print("  Limit = 4.0, but f(2) is undefined")
print("  Simplified: f(x) = x + 2 for x ≠ 2")

# Type 2: Jump discontinuity
print(f"\n=== Jump discontinuity at x=1 ===")
def g(x):
    return x + 1 if x < 1 else x + 3

print("  From the left:")
for x in [0.9, 0.99, 0.999]:
    print(f"    g({x:.3f}) = {g(x):.3f}")
print("  From the right:")
for x in [1.001, 1.01, 1.1]:
    print(f"    g({x:.3f}) = {g(x):.3f}")
print("  Left limit = 2, Right limit = 4 → JUMP")

# Type 3: Infinite — 1/(x-3)
print(f"\n=== Infinite discontinuity: 1/(x-3) at x=3 ===")
h = lambda x: 1 / (x - 3)
print("  From the left:")
for x in [2.9, 2.99, 2.999, 2.9999]:
    print(f"    h({x}) = {h(x):>12.2f}")
print("  From the right:")
for x in [3.1, 3.01, 3.001, 3.0001]:
    print(f"    h({x}) = {h(x):>12.2f}")
print("  Left → -∞, Right → +∞")

# IVT: x³ - x - 1 = 0 has root in (1, 2)
print(f"\n=== IVT: x³ - x - 1 = 0 in [1, 2] ===")
f = lambda x: x**3 - x - 1
print(f"  f(1) = {f(1):>6.3f}")
print(f"  f(2) = {f(2):>6.3f}")
print("  Sign change → root exists in (1, 2)")

# Bisection to find the root (IVT in action)
a, b = 1.0, 2.0
for i in range(20):
    mid = (a + b) / 2
    if f(mid) < 0:
        a = mid
    else:
        b = mid
print(f"  Bisection root ≈ {(a+b)/2:.10f}")

# Continuity check helper
print(f"\n=== Continuity checklist for f(x) = x² at x=3 ===")
f = lambda x: x**2
a = 3
print(f"  1. f({a}) = {f(a)} ✓ (defined)")
lim = f(a)  # polynomial, limit = value
print(f"  2. lim = {lim} ✓ (exists)")
print(f"  3. f(a) = lim = {lim} ✓ (equal)")
print(f"  Conclusion: continuous at x = {a}")
```

## Connection to CS / Games / AI

- **Numerical root-finding** — the IVT justifies the bisection method, one of
  the simplest and most reliable root-finding algorithms in numerical computing
- **Activation functions** — ReLU has a non-differentiable point (a "kink") at
  $x = 0$ but is continuous; the Heaviside step function has a jump discontinuity,
  which is why we use sigmoid or softmax instead
- **Signal processing** — discontinuities in signals create high-frequency
  artefacts (Gibbs phenomenon); understanding continuity helps design filters
- **Game physics** — teleporting an object creates a discontinuity in position;
  physics engines detect and handle this to avoid tunnelling through walls
- **Loss landscapes** — gradient descent assumes the loss function is continuous
  (and usually differentiable); discontinuities cause training instabilities

## Check Your Understanding

1. **Pen & paper:** Classify the discontinuity of $f(x) = \frac{\sin x}{x}$ at $x = 0$.  (Hint: what is $\lim_{x \to 0} \frac{\sin x}{x}$?)
2. **Pen & paper:** Define a piecewise function that has a jump discontinuity at $x = 3$ with left limit 5 and right limit 2.
3. **Pen & paper:** Use the IVT to show that $e^x = 3x$ has a solution in $(0, 1)$.  (Hint: consider $f(x) = e^x - 3x$.)
4. **Think:** Can a function have a removable discontinuity and still be used reliably in a physics simulation?  What would you do about it?
