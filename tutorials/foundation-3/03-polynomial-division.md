# Factor Theorem & Remainder Theorem

## Intuition

If you plug a number into a polynomial and get zero, you have found a root —
and that root tells you a factor of the polynomial.  This is the **Factor
Theorem**, and it is the key that unlocks factorisation of cubics and
higher-degree polynomials.  Combined with the **Remainder Theorem**, it lets
you factorise by trial and division — entirely by hand.

> Long division and synthetic division methods are covered in
> **Foundation 3, Lesson 1**.  This lesson focuses on the *theorems* that
> tell you what to divide by, and the strategy for complete factorisation.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation (factorising quadratics)
- Foundation 3, Lesson 1: Polynomial Long Division & Synthetic Division

## From First Principles

### The Remainder Theorem

**Statement:** When a polynomial $f(x)$ is divided by $(x - a)$, the
remainder is $f(a)$.

**Derivation:** Any polynomial division gives:

$$f(x) = (x - a) \cdot Q(x) + R$$

where $Q(x)$ is the quotient and $R$ is the remainder (a constant, since
we are dividing by a linear factor).

Set $x = a$:

$$f(a) = (a - a) \cdot Q(a) + R = 0 + R = R$$

Therefore the remainder equals $f(a)$.

**Pen & paper:** Find the remainder when $f(x) = x^3 - 3x + 2$ is divided
by $(x - 3)$.

$f(3) = 27 - 9 + 2 = 20$.  The remainder is 20.

**Pen & paper:** Find the remainder when $f(x) = 2x^3 + x^2 - 5x + 1$ is
divided by $(x + 1)$.

$f(-1) = 2(-1)^3 + (-1)^2 - 5(-1) + 1 = -2 + 1 + 5 + 1 = 5$.  Remainder is 5.

### The Factor Theorem

**Statement:** $(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$.

**Proof:** This is a direct consequence of the Remainder Theorem.

$f(x) = (x - a) \cdot Q(x) + R$ where $R = f(a)$.

If $f(a) = 0$, then $R = 0$, so $f(x) = (x - a) \cdot Q(x)$ — meaning
$(x - a)$ divides $f(x)$ exactly.

Conversely, if $(x - a)$ is a factor, then $f(x) = (x - a) \cdot Q(x)$,
so $f(a) = 0$.

**Pen & paper:** Is $(x + 1)$ a factor of $x^3 + 2x^2 - 5x - 6$?

$f(-1) = (-1)^3 + 2(-1)^2 - 5(-1) - 6 = -1 + 2 + 5 - 6 = 0$ ✓

Yes, $(x + 1)$ is a factor.

### Strategy for factorising cubics

Given a cubic $f(x) = ax^3 + bx^2 + cx + d$:

**Step 1:** Find a root by trial.  Try $x = \pm 1, \pm 2, \pm 3, \ldots$

*Tip (Rational Root Theorem):* Any rational root $p/q$ (in lowest terms)
satisfies: $p$ divides the constant term $d$, and $q$ divides the leading
coefficient $a$.  For monic cubics ($a = 1$), try the divisors of $d$.

**Step 2:** Once you find a root $x = a$, you know $(x - a)$ is a factor.

**Step 3:** Divide $f(x)$ by $(x - a)$ to get the quadratic quotient $Q(x)$.

**Step 4:** Factorise the quadratic $Q(x)$ (by inspection, formula, or
completing the square).

### Full worked example: Factorise $x^3 - 6x^2 + 11x - 6$

**Step 1:** Try small integers.

$f(1) = 1 - 6 + 11 - 6 = 0$ ✓

So $(x - 1)$ is a factor.

**Step 2:** Divide $x^3 - 6x^2 + 11x - 6$ by $(x - 1)$.

Using synthetic division (coefficients: $1, -6, 11, -6$, root: $1$):

```
1 |  1   -6    11   -6
  |        1   -5    6
  |  1   -5    6    0  ← remainder
```

Bring down 1.  $1 \times 1 = 1$; $-6 + 1 = -5$.  $-5 \times 1 = -5$;
$11 + (-5) = 6$.  $6 \times 1 = 6$; $-6 + 6 = 0$.

Quotient: $x^2 - 5x + 6$.

**Step 3:** Factorise the quadratic.

$x^2 - 5x + 6$: find two numbers that multiply to 6 and add to $-5$.
Answer: $-2$ and $-3$.

$x^2 - 5x + 6 = (x - 2)(x - 3)$

**Step 4:** Complete factorisation:

$$x^3 - 6x^2 + 11x - 6 = (x - 1)(x - 2)(x - 3)$$

**Verify:** The roots are $x = 1, 2, 3$.  Check $f(2) = 8 - 24 + 22 - 6 = 0$ ✓.

### Second worked example: Factorise $2x^3 + 3x^2 - 8x + 3$

**Step 1:** Leading coefficient is 2, constant is 3.
Rational root candidates: $\pm 1, \pm 3, \pm 1/2, \pm 3/2$.

$f(1) = 2 + 3 - 8 + 3 = 0$ ✓

**Step 2:** Divide by $(x - 1)$ (coefficients: $2, 3, -8, 3$):

```
1 |  2    3   -8    3
  |        2    5   -3
  |  2    5   -3    0
```

Quotient: $2x^2 + 5x - 3$.

**Step 3:** Factorise $2x^2 + 5x - 3$.

$ac = 2 \times (-3) = -6$.  Numbers: $6$ and $-1$ (multiply to $-6$, add to $5$).

$2x^2 + 6x - x - 3 = 2x(x + 3) - 1(x + 3) = (2x - 1)(x + 3)$

**Result:** $2x^3 + 3x^2 - 8x + 3 = (x - 1)(2x - 1)(x + 3)$

Roots: $x = 1, \frac{1}{2}, -3$.

## Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 1, figsize=(9, 6))

# Plot f(x) = x³ - 6x² + 11x - 6
x = np.linspace(-0.5, 4, 300)
f = x**3 - 6*x**2 + 11*x - 6

ax.plot(x, f, 'b-', linewidth=2.5, label='$f(x) = x^3 - 6x^2 + 11x - 6$')
ax.axhline(0, color='k', linewidth=0.5)

# Mark the roots
roots = [1, 2, 3]
for r in roots:
    ax.plot(r, 0, 'ro', markersize=10, zorder=5)
    ax.annotate(f'$x = {r}$', (r, 0), (r - 0.1, -0.8),
                fontsize=11, color='red', ha='center')

# Show the factored form
ax.text(0.5, 2.5, '$(x-1)(x-2)(x-3)$', fontsize=13, color='blue',
        style='italic')

ax.set_xlabel('$x$', fontsize=12)
ax.set_ylabel('$f(x)$', fontsize=12)
ax.set_title('Cubic polynomial and its roots (Factor Theorem)', fontsize=13)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)
ax.set_ylim(-3, 4)

plt.tight_layout()
plt.savefig('factor_theorem_cubic.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Factor Theorem & Remainder Theorem ─────────────────────────

# Evaluate polynomial from coefficients
def eval_poly(coeffs, x):
    """Evaluate polynomial with given coefficients (highest degree first)."""
    return sum(c * x**(len(coeffs)-1-i) for i, c in enumerate(coeffs))

def synthetic_div(coeffs, root):
    """Divide polynomial by (x - root). Return (quotient_coeffs, remainder)."""
    result = [coeffs[0]]
    for i in range(1, len(coeffs)):
        result.append(coeffs[i] + result[-1] * root)
    remainder = result.pop()
    return result, remainder

# === Remainder Theorem ===
print("=== Remainder Theorem ===")
print("f(x) = x³ - 3x + 2, divided by (x - 3)")
coeffs = [1, 0, -3, 2]
remainder = eval_poly(coeffs, 3)
print(f"f(3) = {remainder} → remainder is {remainder}")
_, r = synthetic_div(coeffs, 3)
print(f"Synthetic division confirms remainder = {r}")

print(f"\nf(x) = 2x³ + x² - 5x + 1, divided by (x + 1)")
coeffs2 = [2, 1, -5, 1]
remainder2 = eval_poly(coeffs2, -1)
print(f"f(-1) = {remainder2} → remainder is {remainder2}")

# === Factor Theorem ===
print(f"\n=== Factor Theorem ===")
print("f(x) = x³ + 2x² - 5x - 6")
coeffs3 = [1, 2, -5, -6]
print("Testing small integers:")
for a in [-3, -2, -1, 0, 1, 2, 3]:
    val = eval_poly(coeffs3, a)
    marker = " ← ROOT (factor)" if val == 0 else ""
    print(f"  f({a:+d}) = {val:+d}{marker}")

# === Full factorisation: x³ - 6x² + 11x - 6 ===
print(f"\n=== Factorise x³ - 6x² + 11x - 6 ===")
coeffs4 = [1, -6, 11, -6]

# Step 1: Find a root
print("Step 1: Find a root by trial")
for a in [1, -1, 2, -2, 3, -3, 6, -6]:
    val = eval_poly(coeffs4, a)
    if val == 0:
        print(f"  f({a}) = 0 → (x - {a}) is a factor")
        break

# Step 2: Divide
print(f"\nStep 2: Divide by (x - {a})")
quotient, rem = synthetic_div(coeffs4, a)
print(f"  Quotient coefficients: {quotient}, remainder: {rem}")
print(f"  Quotient: x² + {quotient[1]}x + {quotient[2]}")

# Step 3: Factor the quadratic
print(f"\nStep 3: Factor x² - 5x + 6")
# Find two numbers multiplying to 6, adding to -5
print(f"  -2 × -3 = 6, -2 + -3 = -5")
print(f"  x² - 5x + 6 = (x - 2)(x - 3)")

# Step 4: Final answer
print(f"\nStep 4: x³ - 6x² + 11x - 6 = (x - 1)(x - 2)(x - 3)")

# Verify all roots
print(f"\nVerification:")
for x in [1, 2, 3]:
    print(f"  f({x}) = {eval_poly(coeffs4, x)}")

# === Second example ===
print(f"\n=== Factorise 2x³ + 3x² - 8x + 3 ===")
coeffs5 = [2, 3, -8, 3]
from fractions import Fraction
print("Rational root candidates (p|3, q|2): ±1, ±3, ±1/2, ±3/2")
for r in [1, -1, 3, -3]:
    val = eval_poly(coeffs5, r)
    if val == 0:
        print(f"  f({r}) = 0 ← found root!")
        q, rem = synthetic_div(coeffs5, r)
        print(f"  Quotient: {q[0]}x² + {q[1]}x + {q[2]}")
        print(f"  2x³ + 3x² - 8x + 3 = (x - {r})(2x² + 5x - 3)")
        print(f"                       = (x - {r})(2x - 1)(x + 3)")
        break
```

## Connection to CS / Games / AI

- **Root-finding algorithms** — Newton-Raphson, bisection all need initial guesses;
  the Factor Theorem gives exact rational roots to start from
- **Polynomial interpolation** — Lagrange and Newton forms construct polynomials
  from known roots
- **Error-correcting codes** — Reed-Solomon codes use polynomial factorisation
  over finite fields to detect and correct errors
- **Computer algebra** — CAS systems (SymPy, Mathematica) implement polynomial GCD
  using factor/remainder theorems
- **Control theory** — characteristic polynomial roots = system poles (stability)
- **Partial fractions** — needed for integration and z-transforms; requires
  factorisation first

## Check Your Understanding

1. **Pen & paper:** Use the Factor Theorem to show that $(x - 2)$ is a factor
   of $x^3 - x^2 - 4x + 4$.  Then factorise completely.
2. **Pen & paper:** Find the remainder when $2x^4 - 3x^2 + x - 5$ is divided
   by $(x + 2)$.  (Just evaluate $f(-2)$ — no division needed!)
3. **Pen & paper:** Factorise $x^3 - 7x + 6$ completely.
   (Hint: try $x = 1$ first, then divide and factor the quadratic.)
4. **Pen & paper:** A polynomial $f(x) = x^3 + ax^2 + bx - 6$ has factors
   $(x - 1)$ and $(x + 2)$.  Find $a$ and $b$.
   (Hint: $f(1) = 0$ and $f(-2) = 0$ give two simultaneous equations.)
