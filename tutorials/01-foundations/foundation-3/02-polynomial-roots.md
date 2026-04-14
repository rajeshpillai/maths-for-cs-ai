# Polynomial Roots — Rational Root Theorem and Descartes' Rule

## Intuition

Finding where a polynomial equals zero is one of the oldest problems in
mathematics.  Roots tell you where a curve crosses the x-axis, when a
projectile hits the ground, or when a cost function reaches a target.  The
**Rational Root Theorem** narrows the search space for possible rational
solutions, and **Descartes' Rule of Signs** tells you how many positive or
negative roots to expect — both are search-space pruning strategies, just
like in algorithm design.

## Prerequisites

- Foundation 3, Lesson 1: Polynomial Long Division and Synthetic Division

## From First Principles

### The Rational Root Theorem

For a polynomial with integer coefficients:

$$a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0 = 0$$

Any rational root $\frac{p}{q}$ (in lowest terms) must satisfy:
- $p$ divides $a_0$ (the constant term)
- $q$ divides $a_n$ (the leading coefficient)

**Why it works:** Substitute $x = p/q$ and multiply through by $q^n$.  Every
term except $a_0 q^{n}$ contains a factor of $p$, so $p | a_0$.  Similarly,
every term except $a_n p^n$ contains a factor of $q$, so $q | a_n$.

### Worked example: Find all roots of $x^3 - 4x^2 + x + 6$

**Step 1:** List rational root candidates.

$a_0 = 6$, $a_n = 1$.  So $p \in \{\pm 1, \pm 2, \pm 3, \pm 6\}$, $q \in \{\pm 1\}$.

Candidates: $\pm 1, \pm 2, \pm 3, \pm 6$.

**Step 2:** Test each candidate.

$f(1) = 1 - 4 + 1 + 6 = 4 \neq 0$

$f(-1) = -1 - 4 - 1 + 6 = 0$ ✓ → $x = -1$ is a root

**Step 3:** Divide out the factor $(x + 1)$ using synthetic division.

```
-1 |  1   -4    1    6
   |      -1    5   -6
   |  1   -5    6    0
```

Quotient: $x^2 - 5x + 6 = (x - 2)(x - 3)$.

**All roots:** $x = -1, \; 2, \; 3$.

### Descartes' Rule of Signs

Count sign changes in $f(x)$ to bound positive real roots:

$$f(x) = x^3 - 4x^2 + x + 6$$

Signs: $+, -, +, +$ → **2 sign changes** → at most 2 positive roots (could be 0).

For negative roots, examine $f(-x) = -x^3 - 4x^2 - x + 6$:

Signs: $-, -, -, +$ → **1 sign change** → exactly 1 negative root.

This matches our answer: positive roots 2, 3 and negative root $-1$.

### A cubic with a non-integer leading coefficient

**Find rational roots of** $2x^3 + 3x^2 - 8x + 3$.

$a_0 = 3$, $a_n = 2$.

$p \in \{\pm 1, \pm 3\}$, $q \in \{\pm 1, \pm 2\}$.

Candidates: $\pm 1, \pm 3, \pm \frac{1}{2}, \pm \frac{3}{2}$.

$f(1) = 2 + 3 - 8 + 3 = 0$ ✓

Divide by $(x - 1)$: $2x^2 + 5x - 3 = (2x - 1)(x + 3)$.

Roots: $x = 1, \; \frac{1}{2}, \; -3$.

### Fundamental Theorem of Algebra

A degree-$n$ polynomial has exactly $n$ roots (counted with multiplicity)
in the complex numbers.  So a cubic always has 3 roots — they may be real
or complex.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# f(x) = x³ - 4x² + x + 6 with roots at x = -1, 2, 3
x = np.linspace(-2, 4.5, 300)
f = x**3 - 4*x**2 + x + 6
roots = [-1, 2, 3]

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, f, 'b-', linewidth=2, label=r'$f(x) = x^3 - 4x^2 + x + 6$')
ax.axhline(0, color='grey', linewidth=0.5)

for r in roots:
    ax.plot(r, 0, 'ro', markersize=10, zorder=5)
    ax.annotate(f'x = {r}', (r, 0), textcoords="offset points",
                xytext=(5, 15), fontsize=11, color='red')

ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Cubic Polynomial with Roots Marked')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('polynomial_roots_plot.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Polynomial Roots ───────────────────────────────────────────
from fractions import Fraction

def eval_poly(coeffs, x):
    """Evaluate polynomial given coefficients [aₙ, ..., a₁, a₀] at x."""
    result = 0
    for c in coeffs:
        result = result * x + c
    return result

def rational_root_candidates(coeffs):
    """List all rational root candidates using the Rational Root Theorem."""
    a0 = abs(coeffs[-1])   # constant term
    an = abs(coeffs[0])    # leading coefficient
    p_divs = [i for i in range(1, a0 + 1) if a0 % i == 0]
    q_divs = [i for i in range(1, an + 1) if an % i == 0]
    candidates = set()
    for p in p_divs:
        for q in q_divs:
            candidates.add(Fraction(p, q))
            candidates.add(Fraction(-p, q))
    return sorted(candidates)

def descartes_signs(coeffs):
    """Count sign changes in coefficient list (ignoring zeros)."""
    nonzero = [c for c in coeffs if c != 0]
    changes = sum(1 for i in range(1, len(nonzero)) if nonzero[i] * nonzero[i-1] < 0)
    return changes

# Example 1: x³ - 4x² + x + 6
print("=== x³ - 4x² + x + 6 ===")
coeffs = [1, -4, 1, 6]
candidates = rational_root_candidates(coeffs)
print(f"Rational root candidates: {[str(c) for c in candidates]}")

print("Testing candidates:")
for c in candidates:
    val = eval_poly(coeffs, c)
    if val == 0:
        print(f"  x = {c} → f({c}) = 0  ← ROOT")

pos_signs = descartes_signs(coeffs)
neg_coeffs = [c * (-1)**i for i, c in enumerate(reversed(list(reversed(coeffs))))]
# f(-x): flip sign of odd-degree terms
neg_coeffs_fx = [coeffs[i] * (-1)**(len(coeffs)-1-i) for i in range(len(coeffs))]
neg_signs = descartes_signs(neg_coeffs_fx)
print(f"Descartes: {pos_signs} sign changes in f(x) → ≤{pos_signs} positive roots")
print(f"Descartes: {neg_signs} sign change in f(-x) → ≤{neg_signs} negative roots")

# Example 2: 2x³ + 3x² - 8x + 3
print("\n=== 2x³ + 3x² - 8x + 3 ===")
coeffs2 = [2, 3, -8, 3]
candidates2 = rational_root_candidates(coeffs2)
print(f"Candidates: {[str(c) for c in candidates2]}")

for c in candidates2:
    val = eval_poly(coeffs2, float(c))
    if abs(val) < 1e-10:
        print(f"  x = {c} is a root")

# NumPy verification
import numpy as np
print("\nNumPy np.roots verification:")
print(f"  x³-4x²+x+6 roots: {sorted(np.roots([1,-4,1,6]).real)}")
print(f"  2x³+3x²-8x+3 roots: {sorted(np.roots([2,3,-8,3]).real)}")
```

## Connection to CS / Games / AI

- **Algorithm design** — the Rational Root Theorem is a pruning strategy:
  reduce an infinite search space to a finite candidate list, then test each
- **Polynomial solvers** — computer algebra systems use these theorems as the
  first step before numerical methods
- **Control systems** — roots of the characteristic polynomial determine system
  stability (roots in left half-plane = stable)
- **Game physics** — finding when a trajectory hits a surface requires
  solving polynomial equations
- **Signal processing** — zeros of a transfer function's polynomial determine
  filter behaviour

## Check Your Understanding

1. **Pen & paper:** List all rational root candidates for $3x^3 + x^2 - 12x - 4$, then find all roots.
2. **Pen & paper:** Use Descartes' Rule to determine how many positive and negative roots $x^4 - 3x^3 + 2x^2 + x - 1$ can have.
3. **Pen & paper:** Find all roots of $x^3 + 6x^2 + 11x + 6$.
4. **Coding:** Write a function that takes polynomial coefficients and automatically finds all rational roots.
