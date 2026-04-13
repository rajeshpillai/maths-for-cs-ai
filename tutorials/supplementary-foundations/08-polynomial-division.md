# Polynomial Division, Factor Theorem, Remainder Theorem

## Intuition

Just as you can divide integers ($17 \div 5 = 3$ remainder $2$), you can divide
polynomials.  The **factor theorem** tells you whether $(x - a)$ divides a
polynomial exactly (i.e., $a$ is a root).  These tools let you factorise
cubics and higher-degree polynomials by hand.

## Prerequisites

- Supplementary Foundations, Lesson 2: Algebraic Manipulation

## From First Principles

### Polynomial long division

Divide $x^3 + 2x^2 - 5x - 6$ by $(x - 2)$:

```
         x² + 4x + 3
       _______________
x - 2 | x³ + 2x² - 5x - 6
         x³ - 2x²
         ---------
              4x² - 5x
              4x² - 8x
              ---------
                   3x - 6
                   3x - 6
                   -------
                        0
```

Result: $x^3 + 2x^2 - 5x - 6 = (x - 2)(x^2 + 4x + 3) = (x-2)(x+1)(x+3)$

### The Remainder Theorem

When $f(x)$ is divided by $(x - a)$, the remainder is $f(a)$.

**Pen & paper:** Find the remainder when $f(x) = x^3 - 3x + 2$ is divided by $(x - 3)$.

$f(3) = 27 - 9 + 2 = 20$.  Remainder = 20.

### The Factor Theorem

$(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$.

**Pen & paper:** Is $(x + 1)$ a factor of $x^3 + 2x^2 - 5x - 6$?

$f(-1) = -1 + 2 + 5 - 6 = 0$ ✓ → yes, $(x + 1)$ is a factor.

### Strategy for factorising cubics

1. Try small integers ($\pm 1, \pm 2, \pm 3, \ldots$) using the factor theorem
2. When you find a root $a$, divide by $(x - a)$
3. Factor the resulting quadratic

**Pen & paper:** Factorise $2x^3 + 3x^2 - 8x + 3$.

Try $x = 1$: $2 + 3 - 8 + 3 = 0$ ✓

Divide by $(x - 1)$:

$2x^3 + 3x^2 - 8x + 3 = (x - 1)(2x^2 + 5x - 3) = (x-1)(2x-1)(x+3)$

### Synthetic division (shortcut)

For dividing by $(x - a)$, only track coefficients:

Divide $x^3 + 2x^2 - 5x - 6$ by $(x - 2)$:

Coefficients: $1, 2, -5, -6$.  Root: $a = 2$.

```
2 |  1    2   -5   -6
  |       2    8    6
  |  1    4    3    0  ← remainder
```

Bring down 1.  $1 \times 2 = 2$, add to 2 → 4.  $4 \times 2 = 8$, add to $-5$ → 3.  $3 \times 2 = 6$, add to $-6$ → 0.

Result: $x^2 + 4x + 3$ remainder 0.  ✓

### Rational root theorem

For $a_n x^n + \cdots + a_0$, any rational root $p/q$ satisfies:
- $p$ divides $a_0$ (constant term)
- $q$ divides $a_n$ (leading coefficient)

This limits the candidates to test.

## Python Verification

```python
# ── Polynomial Division ─────────────────────────────────────

# Synthetic division
def synthetic_div(coeffs, root):
    """Divide polynomial (given by coeffs) by (x - root)."""
    result = [coeffs[0]]
    for i in range(1, len(coeffs)):
        result.append(coeffs[i] + result[-1] * root)
    remainder = result.pop()
    return result, remainder

# x³ + 2x² - 5x - 6 ÷ (x - 2)
print("=== Synthetic division ===")
coeffs = [1, 2, -5, -6]
quotient, rem = synthetic_div(coeffs, 2)
print(f"({coeffs}) ÷ (x - 2)")
print(f"Quotient coefficients: {quotient}, Remainder: {rem}")

# Factor theorem: test roots
print(f"\n=== Factor theorem ===")
def eval_poly(coeffs, x):
    return sum(c * x**(len(coeffs)-1-i) for i, c in enumerate(coeffs))

for root in [-3, -2, -1, 0, 1, 2, 3]:
    val = eval_poly(coeffs, root)
    is_root = "← ROOT" if val == 0 else ""
    print(f"  f({root:+d}) = {val:+d} {is_root}")

# Factorise 2x³ + 3x² - 8x + 3
print(f"\n=== Factorise 2x³ + 3x² - 8x + 3 ===")
coeffs2 = [2, 3, -8, 3]
for root in [-3, -2, -1, 0, 1, 2, 3]:
    val = eval_poly(coeffs2, root)
    if val == 0:
        print(f"  f({root}) = 0 → (x - {root}) is a factor")
        q, r = synthetic_div(coeffs2, root)
        print(f"  Quotient: {q}")

# Also try x = 1/2 (rational root theorem: p|3, q|2)
from fractions import Fraction
print(f"\n=== Rational root candidates for 2x³+3x²-8x+3 ===")
for p in [1, -1, 3, -3]:
    for q in [1, 2]:
        r = Fraction(p, q)
        val = 2*float(r)**3 + 3*float(r)**2 - 8*float(r) + 3
        if abs(val) < 1e-10:
            print(f"  x = {r} is a root")

# Remainder theorem
print(f"\n=== Remainder theorem ===")
print(f"f(x) = x³ - 3x + 2, divided by (x-3)")
f3 = 27 - 9 + 2
print(f"f(3) = {f3} = remainder")
q, r = synthetic_div([1, 0, -3, 2], 3)
print(f"Synthetic: quotient {q}, remainder {r}")
```

## Connection to CS / Games / AI

- **Partial fractions** — needed for integration; requires polynomial division first
- **Control theory** — transfer functions are ratios of polynomials; roots = poles/zeros
- **Error-correcting codes** — polynomial arithmetic over finite fields (Reed-Solomon)
- **Polynomial interpolation** — Lagrange and Newton forms use polynomial division ideas
- **Computer algebra** — symbolic maths systems (SymPy, Mathematica) implement polynomial GCD

## Check Your Understanding

1. **Pen & paper:** Divide $x^3 - 6x^2 + 11x - 6$ by $(x - 1)$ using synthetic division.  Then factorise completely.
2. **Pen & paper:** Find the remainder when $2x^4 - 3x^2 + x - 5$ is divided by $(x + 2)$.
3. **Pen & paper:** Factorise $x^3 - 7x + 6$ completely.  (Hint: try $x = 1, 2, -3$.)
4. **Pen & paper:** Use the rational root theorem to list all possible rational roots of $3x^3 - 2x^2 + 5x - 6$.
