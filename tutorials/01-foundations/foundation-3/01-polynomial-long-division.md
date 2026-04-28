# Polynomial Long Division and Synthetic Division

## Intuition

When you divide 157 by 12, you get 13 remainder 1.  The same process works
for polynomials: you can divide one polynomial by another to get a quotient
and remainder.  This is the backbone of factorisation, partial fractions, and
symbolic algebra systems.  In game dev, polynomial division appears when
simplifying rational motion curves; in AI, it underpins polynomial kernel
manipulations and error-correcting codes.

## Prerequisites

- Foundation 1, Lesson 9: Polynomials and Factoring

## From First Principles

### Why polynomial division exists

Given polynomials $f(x)$ and $d(x)$ with $\deg(d) \ge 1$, there exist unique
polynomials $q(x)$ (quotient) and $r(x)$ (remainder) such that:

$$f(x) = d(x) \cdot q(x) + r(x), \quad \deg(r) < \deg(d)$$

This is the **division algorithm** for polynomials — it mirrors integer division.

### Polynomial long division — worked example

**Divide** $x^3 + 2x^2 - 5x + 3$ **by** $(x - 1)$.

**Step 1:** Divide the leading term of the dividend by the leading term of the
divisor: $x^3 \div x = x^2$.

**Step 2:** Multiply $(x - 1)$ by $x^2$: $x^3 - x^2$.

**Step 3:** Subtract from the dividend:
$(x^3 + 2x^2) - (x^3 - x^2) = 3x^2$.  Bring down $-5x$.

**Step 4:** Divide $3x^2 \div x = 3x$.  Multiply: $3x^2 - 3x$.
Subtract: $(3x^2 - 5x) - (3x^2 - 3x) = -2x$.  Bring down $+3$.

**Step 5:** Divide $-2x \div x = -2$.  Multiply: $-2x + 2$.
Subtract: $(-2x + 3) - (-2x + 2) = 1$.

```
           x²  + 3x  - 2
         ________________
x - 1  | x³  + 2x² - 5x + 3
          x³  -  x²
          ----------
               3x² - 5x
               3x² - 3x
               ---------
                    -2x + 3
                    -2x + 2
                    --------
                          1
```

$$x^3 + 2x^2 - 5x + 3 = (x - 1)(x^2 + 3x - 2) + 1$$

**Check by expanding:** $(x-1)(x^2+3x-2) + 1 = x^3+3x^2-2x - x^2-3x+2 + 1 = x^3+2x^2-5x+3$ ✓

### Synthetic division — a faster shortcut

When dividing by a linear factor $(x - a)$, only track the coefficients:

**Divide** $x^3 + 2x^2 - 5x + 3$ **by** $(x - 1)$, so $a = 1$:

Coefficients of dividend: $1, \; 2, \; -5, \; 3$.

```
1 |  1    2   -5    3
  |       1    3   -2
  |  1    3   -2    1  ← remainder
```

Process: Bring down 1.  $1 \times 1 = 1$, add to 2 = 3.
$3 \times 1 = 3$, add to $-5$ = $-2$.
$-2 \times 1 = -2$, add to 3 = 1.

Quotient: $x^2 + 3x - 2$, remainder: 1.  Matches long division.  ✓

### Handling missing terms

If dividing $x^4 - 16$ by $(x - 2)$, write coefficients as $1, 0, 0, 0, -16$
(insert zeros for missing $x^3, x^2, x$ terms).

```
2 |  1    0    0    0   -16
  |       2    4    8    16
  |  1    2    4    8     0
```

Quotient: $x^3 + 2x^2 + 4x + 8$, remainder: 0.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# f(x) = x³ + 2x² - 5x + 3
# q(x) = x² + 3x - 2 (quotient)
# d(x) = x - 1 (divisor)
x = np.linspace(-4, 3, 300)
f = x**3 + 2*x**2 - 5*x + 3
q = x**2 + 3*x - 2

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, f, label=r'$f(x) = x^3 + 2x^2 - 5x + 3$', linewidth=2)
ax.plot(x, q, '--', label=r'$q(x) = x^2 + 3x - 2$ (quotient)', linewidth=2)
ax.axhline(0, color='grey', linewidth=0.5)
ax.axvline(1, color='red', linestyle=':', alpha=0.6, label=r'$x = 1$ (divisor root)')
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Polynomial and Its Quotient After Division by (x - 1)')
ax.legend()
ax.set_ylim(-20, 30)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('polynomial_division_plot.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Polynomial Long Division and Synthetic Division ────────────

def synthetic_div(coeffs, root):
    """Divide polynomial (given by coefficients) by (x - root).
    Returns (quotient_coeffs, remainder)."""
    result = [coeffs[0]]
    for i in range(1, len(coeffs)):
        result.append(coeffs[i] + result[-1] * root)
    remainder = result.pop()
    return result, remainder

# Example 1: x³ + 2x² - 5x + 3 ÷ (x - 1)
print("=== x³ + 2x² - 5x + 3  ÷  (x - 1) ===")
coeffs = [1, 2, -5, 3]
q, r = synthetic_div(coeffs, 1)
print(f"Quotient coefficients: {q}")
print(f"Remainder: {r}")

# Verify: (x-1)(x²+3x-2) + 1 should reconstruct original
print("\nVerification at x = 5:")
x = 5
original = x**3 + 2*x**2 - 5*x + 3
reconstructed = (x - 1) * (x**2 + 3*x - 2) + 1
print(f"  f(5) = {original}")
print(f"  (x-1)*q(x) + 1 at x=5 = {reconstructed}")

# Example 2: x⁴ - 16 ÷ (x - 2) — missing terms
print("\n=== x⁴ - 16  ÷  (x - 2) ===")
coeffs2 = [1, 0, 0, 0, -16]
q2, r2 = synthetic_div(coeffs2, 2)
print(f"Quotient coefficients: {q2}")
print(f"Remainder: {r2}")

# General polynomial long division (any degree divisor)
def poly_long_div(dividend, divisor):
    """Long division for arbitrary polynomials (coefficient lists)."""
    dividend = list(dividend)  # copy
    quotient = []
    while len(dividend) >= len(divisor):
        coeff = dividend[0] / divisor[0]
        quotient.append(coeff)
        for i in range(len(divisor)):
            dividend[i] -= coeff * divisor[i]
        dividend.pop(0)
    return quotient, dividend  # quotient, remainder

# Divide x³ + 2x² - 5x + 3 by x² - 1 (non-linear divisor)
print("\n=== x³ + 2x² - 5x + 3  ÷  (x² - 1) ===")
q3, r3 = poly_long_div([1, 2, -5, 3], [1, 0, -1])
print(f"Quotient: {q3}")
print(f"Remainder: {r3}")
```

## Connection to CS / Games / AI / Business / Industry

- **Computer algebra systems** — SymPy and Mathematica implement polynomial
  long division as a core primitive for simplification
- **Error-correcting codes** — Reed-Solomon codes use polynomial division over
  finite fields to detect and correct errors in data transmission
- **Signal processing** — transfer functions (ratios of polynomials) require
  division to decompose into partial fractions for inverse transforms
- **Cryptography** — polynomial division in $GF(2)$ underpins CRC checksums
- **Curve fitting** — simplifying rational polynomial models for game physics
- **CRC checksums in storage & networking** — Ethernet (802.3), ZIP files, and SSDs all rely on CRC-32 polynomial division to detect bit errors; Western Digital and Seagate firmware run this division on every read.
- **Bond cash-flow stripping** — Treasury desks at JP Morgan use polynomial-division-style bootstrap to strip a coupon bond's cash flows into zero-coupon "STRIPS"; the algebra mirrors dividing a polynomial by $(x - r_i)$ for each coupon date.
- **Control-system pole-zero cancellation** — control engineers at Honeywell and ABB perform polynomial division on transfer functions to cancel poles and zeros; MATLAB Control System Toolbox's `minreal()` runs this every simulation.
- **GPS navigation message decoding** — GPS L1 C/A code uses polynomial-division-based BCH decoding to validate satellite ephemeris data; u-blox and Qualcomm receiver chips implement this in silicon.

## Check Your Understanding

1. **Pen & paper:** Divide $2x^3 - 3x^2 + 4x - 5$ by $(x - 2)$ using synthetic division.
2. **Pen & paper:** Divide $x^4 + x^3 - 3x^2 + x + 2$ by $(x + 2)$ using synthetic division.
3. **Pen & paper:** Divide $x^3 - 8$ by $(x^2 + 2x + 4)$ using long division. What do you notice?
4. **Coding:** Modify the `poly_long_div` function to also print each step of the division.
