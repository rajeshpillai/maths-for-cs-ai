# Polynomial Functions — Degree, Roots, and Behaviour

## Intuition

A polynomial is a sum of power terms: constants, $x$, $x^2$, $x^3$, and so on.
Linear functions are degree-1 polynomials.  Quadratics are degree 2.  Polynomials
of higher degree model more complex curves — Bezier paths in game graphics, cost
functions with multiple local minima, and interpolation of data points.  The
degree tells you everything about how many roots and turns the curve can have.

## Prerequisites

- Foundation 1, Lesson 8: Quadratic Functions

## From First Principles

### Terminology

A polynomial of degree $n$:

$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$$

- **Degree:** the highest power of $x$ with a non-zero coefficient
- **Leading coefficient:** $a_n$ (the coefficient of the highest power)
- **Constant term:** $a_0$ (the $y$-intercept)

| Degree | Name | Example |
|--------|------|---------|
| 0 | Constant | $f(x) = 5$ |
| 1 | Linear | $f(x) = 2x + 1$ |
| 2 | Quadratic | $f(x) = x^2 - 3x + 2$ |
| 3 | Cubic | $f(x) = x^3 - x$ |
| 4 | Quartic | $f(x) = x^4 - 5x^2 + 4$ |

### End behaviour

For large $|x|$, only the leading term matters:

- **Even degree, positive leading coefficient:** both ends go up ($\uparrow \uparrow$)
- **Even degree, negative leading coefficient:** both ends go down ($\downarrow \downarrow$)
- **Odd degree, positive leading coefficient:** left down, right up ($\downarrow \uparrow$)
- **Odd degree, negative leading coefficient:** left up, right down ($\uparrow \downarrow$)

### Roots and the Factor Theorem

If $P(r) = 0$, then $(x - r)$ is a factor of $P(x)$.

A degree-$n$ polynomial has **at most** $n$ real roots.

### Root multiplicity

If $(x - r)^m$ is a factor:

- $m = 1$ (simple root): graph **crosses** the axis
- $m = 2$ (double root): graph **touches and bounces** off the axis
- $m = 3$ (triple root): graph **crosses with a flat inflection**

**Pen & paper:** $P(x) = (x - 1)^2(x + 2)$

- Root $x = 1$ with multiplicity 2 (touches)
- Root $x = -2$ with multiplicity 1 (crosses)
- Degree: $2 + 1 = 3$ (cubic), leading coefficient: $+1$ (odd degree, positive → $\downarrow\uparrow$)

### Polynomial arithmetic

**Addition:** Combine like terms.

$(2x^3 + x - 4) + (x^3 - 3x^2 + 5) = 3x^3 - 3x^2 + x + 1$

**Multiplication:** Distribute every term.

$(x + 2)(x^2 - x + 3) = x^3 - x^2 + 3x + 2x^2 - 2x + 6 = x^3 + x^2 + x + 6$

**Pen & paper:** Verify by evaluating at $x = 1$:

LHS: $(3)(3) = 9$.  RHS: $1 + 1 + 1 + 6 = 9$ ✓

### Polynomial long division

Divide $x^3 + 2x^2 - 5x - 6$ by $(x - 2)$:

$$x^3 + 2x^2 - 5x - 6 = (x - 2)(x^2 + 4x + 3) + 0$$

Since remainder is 0, $x = 2$ is a root.  Factor further: $x^2 + 4x + 3 = (x+1)(x+3)$.

So $P(x) = (x - 2)(x + 1)(x + 3)$.  Roots: $x = 2, -1, -3$.

### Visualisation

```python
# ── Polynomial curves: cubic and quartic ───────────────────
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 3, 400)

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Cubic: (x-1)²(x+2) — double root at 1, simple root at -2
y_cubic = (x - 1)**2 * (x + 2)
axes[0].plot(x, y_cubic, 'b-', linewidth=2)
axes[0].axhline(0, color='k', linewidth=0.5)
axes[0].plot([1], [0], 'ro', markersize=8, label='Double root (bounces)')
axes[0].plot([-2], [0], 'gs', markersize=8, label='Simple root (crosses)')
axes[0].set_title('Cubic: $(x-1)^2(x+2)$')
axes[0].legend()
axes[0].grid(True, alpha=0.3)
axes[0].set_ylim(-5, 8)

# Quartic: x⁴ - 5x² + 4 = (x-1)(x+1)(x-2)(x+2)
y_quartic = x**4 - 5*x**2 + 4
axes[1].plot(x, y_quartic, 'r-', linewidth=2)
axes[1].axhline(0, color='k', linewidth=0.5)
roots = [-2, -1, 1, 2]
axes[1].plot(roots, [0]*4, 'ko', markersize=8, label='4 simple roots')
axes[1].set_title('Quartic: $x^4 - 5x^2 + 4$')
axes[1].legend()
axes[1].grid(True, alpha=0.3)
axes[1].set_ylim(-5, 10)

plt.tight_layout()
plt.savefig('polynomial_curves.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Polynomial Functions ───────────────────────────────────
import math

# Factor theorem: P(x) = x³ + 2x² - 5x - 6
print("=== Factor Theorem ===")
P = lambda x: x**3 + 2*x**2 - 5*x - 6
for r in [2, -1, -3]:
    print(f"  P({r}) = {P(r)}")  # all should be 0

# Verify factored form: (x-2)(x+1)(x+3)
print("\n=== Factored form check ===")
for x in range(-5, 6):
    lhs = x**3 + 2*x**2 - 5*x - 6
    rhs = (x - 2) * (x + 1) * (x + 3)
    assert lhs == rhs
print("x³ + 2x² - 5x - 6 = (x-2)(x+1)(x+3) ✓")

# Polynomial multiplication: (x+2)(x²-x+3) = x³+x²+x+6
print("\n=== Polynomial multiplication ===")
for x in range(-4, 5):
    lhs = (x + 2) * (x**2 - x + 3)
    rhs = x**3 + x**2 + x + 6
    assert lhs == rhs
print("(x+2)(x²-x+3) = x³+x²+x+6 ✓")

# Multiplicity: (x-1)²(x+2) — check root behaviour
print("\n=== Multiplicity ===")
Q = lambda x: (x - 1)**2 * (x + 2)
print(f"  Q(1) = {Q(1)} (double root, touches axis)")
print(f"  Q(-2) = {Q(-2)} (simple root, crosses axis)")
# Near x=1, function stays non-negative
print(f"  Q(0.9) = {Q(0.9):.3f}, Q(1.1) = {Q(1.1):.3f} (same sign = bounce)")
```

## Connection to CS / Games / AI / Business / Industry

- **Bezier curves** — cubic polynomials define smooth paths in vector graphics and game animation
- **Interpolation** — Lagrange and Newton polynomials fit a curve through known data points
- **Taylor polynomials** — approximate $\sin$, $\cos$, $e^x$ for fast computation in shaders
- **Characteristic polynomials** — eigenvalues of a matrix are roots of $\det(A - \lambda I) = 0$
- **Error-correcting codes** — Reed-Solomon codes use polynomial evaluation over finite fields

## Check Your Understanding

1. **Pen & paper:** State the degree, leading coefficient, and end behaviour of $-2x^5 + 3x^2 - 1$.
2. **Pen & paper:** Given $P(x) = x^3 - 6x^2 + 11x - 6$, verify that $x = 1$ is a root, then factor completely.
3. **Pen & paper:** Multiply $(x^2 + 3)(x^2 - 2x + 1)$ and state the degree of the result.
4. **Sketch:** Draw the rough shape of $y = -(x+1)(x-2)^2$ marking roots and end behaviour.
