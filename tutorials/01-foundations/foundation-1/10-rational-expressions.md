# Rational Expressions — Fractions with Polynomials

## Intuition

A rational expression is simply a fraction where the numerator and denominator
are polynomials.  Just as $\frac{3}{4}$ is a ratio of integers, $\frac{x+1}{x-2}$
is a ratio of polynomials.  These appear everywhere: transfer functions in control
theory, probability generating functions, partial fractions in calculus, and
asymptotic analysis in algorithms.  The key new idea: division by zero is
**undefined**, so certain $x$-values are forbidden.

## Prerequisites

- Foundation 1, Lesson 9: Polynomial Functions

## From First Principles

### Definition and domain

A rational expression has the form:

$$R(x) = \frac{P(x)}{Q(x)}$$

where $P(x)$ and $Q(x)$ are polynomials and $Q(x) \neq 0$.

**The domain excludes every $x$ where $Q(x) = 0$.**

**Pen & paper:** $\frac{x + 3}{x^2 - 4} = \frac{x+3}{(x-2)(x+2)}$

Undefined at $x = 2$ and $x = -2$.

### Simplifying (cancelling common factors)

$$\frac{x^2 - 9}{x^2 + x - 6} = \frac{(x-3)(x+3)}{(x+3)(x-2)} = \frac{x-3}{x-2}$$

Valid only when $x \neq -3$ and $x \neq 2$.  Even though $(x+3)$ cancels, $x = -3$
remains excluded from the original domain (it is a **hole**, not a root).

### Multiplying and dividing

**Multiply:** $\frac{A}{B} \times \frac{C}{D} = \frac{AC}{BD}$

**Pen & paper:**

$$\frac{x+1}{x-3} \times \frac{x-3}{x^2} = \frac{(x+1)(x-3)}{(x-3)(x^2)} = \frac{x+1}{x^2}$$

**Divide:** Flip and multiply: $\frac{A}{B} \div \frac{C}{D} = \frac{A}{B} \times \frac{D}{C}$

**Pen & paper:**

$$\frac{2x}{x+1} \div \frac{4x^2}{x-1} = \frac{2x}{x+1} \times \frac{x-1}{4x^2} = \frac{2x(x-1)}{4x^2(x+1)} = \frac{x-1}{2x(x+1)}$$

### Adding and subtracting (common denominator)

Just like numeric fractions: find a common denominator, then combine numerators.

**Pen & paper:** $\frac{1}{x} + \frac{2}{x+1}$

LCD is $x(x+1)$:

$$\frac{1 \cdot (x+1)}{x(x+1)} + \frac{2 \cdot x}{x(x+1)} = \frac{x + 1 + 2x}{x(x+1)} = \frac{3x + 1}{x(x+1)}$$

**Pen & paper:** $\frac{3}{x-2} - \frac{1}{x+1}$

LCD is $(x-2)(x+1)$:

$$\frac{3(x+1) - 1(x-2)}{(x-2)(x+1)} = \frac{3x + 3 - x + 2}{(x-2)(x+1)} = \frac{2x + 5}{(x-2)(x+1)}$$

### Vertical asymptotes

Where the denominator is zero (and the numerator is not), the function has a
**vertical asymptote** — the graph shoots off to $\pm\infty$.

For $R(x) = \frac{1}{x - 2}$: vertical asymptote at $x = 2$.

### Horizontal asymptote

Compare degrees of numerator ($m$) and denominator ($n$):

- $m < n$: horizontal asymptote at $y = 0$
- $m = n$: horizontal asymptote at $y = \frac{a_m}{b_n}$ (ratio of leading coefficients)
- $m > n$: no horizontal asymptote (oblique or none)

### Visualisation

```python
# ── Rational function with asymptotes ──────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 6))

# R(x) = (2x + 1) / (x - 1)
# Vertical asymptote at x = 1
# Horizontal asymptote: degrees equal, y = 2/1 = 2

# Plot in two pieces to avoid the asymptote line
x_left = np.linspace(-5, 0.95, 300)
x_right = np.linspace(1.05, 6, 300)

for x in [x_left, x_right]:
    y = (2*x + 1) / (x - 1)
    ax.plot(x, y, 'b-', linewidth=2)

ax.axvline(x=1, color='r', linestyle='--', alpha=0.7, label='Vertical asymptote $x=1$')
ax.axhline(y=2, color='g', linestyle='--', alpha=0.7, label='Horizontal asymptote $y=2$')
ax.set_xlim(-5, 6)
ax.set_ylim(-15, 20)
ax.set_xlabel('x')
ax.set_ylabel('R(x)')
ax.set_title('Rational Function: $R(x) = \\frac{2x+1}{x-1}$')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('rational_function.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Rational Expressions ───────────────────────────────────
from fractions import Fraction

# Simplifying: (x²-9)/(x²+x-6) at x=5
print("=== Simplifying ===")
x = 5
original = (x**2 - 9) / (x**2 + x - 6)
simplified = (x - 3) / (x - 2)
print(f"  At x=5: (x²-9)/(x²+x-6) = {original:.4f}")
print(f"  Simplified (x-3)/(x-2) = {simplified:.4f}")
assert abs(original - simplified) < 1e-10

# Verify undefined values
print(f"\n=== Undefined values ===")
print(f"  x²-4 = 0 when x = ±2")
print(f"  At x=2: denominator = {2**2 - 4} → UNDEFINED")

# Addition: 1/x + 2/(x+1) = (3x+1)/(x(x+1))
print(f"\n=== Addition ===")
for x in [1, 3, 5, -3]:
    lhs = 1/x + 2/(x+1)
    rhs = (3*x + 1) / (x*(x+1))
    assert abs(lhs - rhs) < 1e-10
print("1/x + 2/(x+1) = (3x+1)/(x(x+1)) ✓")

# Subtraction: 3/(x-2) - 1/(x+1) = (2x+5)/((x-2)(x+1))
print(f"\n=== Subtraction ===")
for x in [0, 3, 5, -3]:
    lhs = 3/(x-2) - 1/(x+1)
    rhs = (2*x + 5) / ((x - 2)*(x + 1))
    assert abs(lhs - rhs) < 1e-10
print("3/(x-2) - 1/(x+1) = (2x+5)/((x-2)(x+1)) ✓")

# Asymptote check: R(x) = (2x+1)/(x-1) → y approaches 2
print(f"\n=== Horizontal asymptote ===")
for x_val in [100, 1000, 10000]:
    y = (2*x_val + 1) / (x_val - 1)
    print(f"  R({x_val}) = {y:.6f} → approaching 2")
```

## Connection to CS / Games / AI / Business / Industry

- **Transfer functions** — control systems and signal filters are ratios of polynomials in $s$ or $z$
- **Partial fractions** — decomposing rational expressions is essential for inverse Laplace/Z transforms
- **Asymptotic analysis** — comparing $\frac{n^2}{n+1}$ to understand algorithm scaling
- **Probability** — generating functions are often rational; poles reveal distribution behaviour
- **Numerical stability** — dividing by near-zero values causes floating-point overflow (vertical asymptote in disguise)

## Check Your Understanding

1. **Pen & paper:** Simplify $\frac{x^2 - x - 6}{x^2 - 9}$ and state all excluded values.
2. **Pen & paper:** Compute $\frac{2}{x+3} + \frac{5}{x-1}$ as a single fraction.
3. **Pen & paper:** Find the vertical and horizontal asymptotes of $\frac{3x - 1}{x + 4}$.
4. **Pen & paper:** Divide $\frac{x^2}{x+1} \div \frac{x}{x-1}$ and simplify.
