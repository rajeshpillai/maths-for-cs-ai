# Generating Functions

## Intuition

A generating function encodes an entire infinite sequence into a single
algebraic expression. Think of it as a "power series barcode" for a sequence:
the coefficient of $x^n$ is the $n$-th term. This trick transforms recurrence
relations into algebraic equations you can solve with high-school algebra,
then read the answer back from the coefficients.

## Prerequisites

- **Tier 13, Lesson 6** — Recurrence relations, characteristic roots method

## From First Principles

### Ordinary Generating Function (OGF)

Given a sequence $a_0, a_1, a_2, \ldots$, its OGF is:

$$A(x) = \sum_{n=0}^{\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + \cdots$$

We treat $x$ as a formal variable — we do not care about convergence,
only about the coefficients.

### Key OGFs to Know

| Sequence | OGF |
|----------|-----|
| $1, 1, 1, \ldots$ | $\frac{1}{1-x}$ |
| $1, c, c^2, \ldots$ | $\frac{1}{1-cx}$ |
| $1, 0, 1, 0, \ldots$ | $\frac{1}{1-x^2}$ |
| $0, 1, 2, 3, \ldots$ ($a_n = n$) | $\frac{x}{(1-x)^2}$ |

**Derivation of the first:** Geometric series $\sum_{n=0}^{\infty} x^n = \frac{1}{1-x}$.

### Solving Recurrences with Generating Functions

**Method:** Multiply the recurrence by $x^n$, sum over all $n$, recognise
the sums as $A(x)$, solve for $A(x)$, then extract coefficients.

### Worked Example: Fibonacci

$F_n = F_{n-1} + F_{n-2}$, $F_0 = 0$, $F_1 = 1$.

Let $F(x) = \sum_{n=0}^{\infty} F_n x^n$.

Multiply recurrence by $x^n$ and sum for $n \ge 2$:

$$\sum_{n=2}^{\infty} F_n x^n = \sum_{n=2}^{\infty} F_{n-1} x^n + \sum_{n=2}^{\infty} F_{n-2} x^n$$

Left side: $F(x) - F_0 - F_1 x = F(x) - x$.

Right side: $x \sum_{n=2}^{\infty} F_{n-1} x^{n-1} + x^2 \sum_{n=2}^{\infty} F_{n-2} x^{n-2}$
$= x(F(x) - F_0) + x^2 F(x) = xF(x) + x^2 F(x)$.

So: $F(x) - x = xF(x) + x^2 F(x)$.

$$F(x)(1 - x - x^2) = x$$

$$F(x) = \frac{x}{1 - x - x^2}$$

**Extracting coefficients** by partial fractions:

Factor: $1 - x - x^2 = -(x - \frac{-1+\sqrt{5}}{2})(x - \frac{-1-\sqrt{5}}{2})$

Using partial fractions and the geometric series, we recover Binet's formula:

$$F_n = \frac{1}{\sqrt{5}}\left(\phi^n - \psi^n\right)$$

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Show how coefficients of F(x) = x/(1-x-x^2) match Fibonacci numbers
# Compute by polynomial long division (truncated)
n_terms = 15
coeffs = [0] * n_terms
# F(x) = x + x*F(x) + x^2*F(x) => coeffs[0]=0, coeffs[1]=1
# coeffs[n] = coeffs[n-1] + coeffs[n-2] for n>=2
coeffs[0] = 0
coeffs[1] = 1
for i in range(2, n_terms):
    coeffs[i] = coeffs[i-1] + coeffs[i-2]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# Left: coefficients as bar chart
ax1.bar(range(n_terms), coeffs, color='steelblue', edgecolor='black')
ax1.set_xlabel('n (power of x)')
ax1.set_ylabel('Coefficient = F_n')
ax1.set_title('Coefficients of F(x) = x / (1 - x - x^2)')
for i, c in enumerate(coeffs):
    if c > 0:
        ax1.text(i, c + 0.5, str(c), ha='center', fontsize=8)

# Right: partial sums of the generating function
x_vals = np.linspace(-0.5, 0.5, 200)
exact = x_vals / (1 - x_vals - x_vals**2)
partial_3 = sum(coeffs[i] * x_vals**i for i in range(4))
partial_7 = sum(coeffs[i] * x_vals**i for i in range(8))
partial_14 = sum(coeffs[i] * x_vals**i for i in range(15))

ax2.plot(x_vals, exact, 'k-', lw=2, label='Exact F(x)')
ax2.plot(x_vals, partial_3, 'r--', label='3 terms')
ax2.plot(x_vals, partial_7, 'g--', label='7 terms')
ax2.plot(x_vals, partial_14, 'b--', label='14 terms')
ax2.set_xlabel('x'); ax2.set_ylabel('F(x)')
ax2.set_title('Partial Sums Converging to F(x)')
ax2.legend(); ax2.set_ylim(-2, 2); ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("generating_functions.png", dpi=100)
plt.show()
```

## Python Verification

```python
from fractions import Fraction

# ── Generating functions: coefficient extraction ─────────

# Step 1: Compute Fibonacci via the recurrence on coefficients
def gf_fibonacci(n_terms):
    """Extract coefficients from F(x) = x/(1-x-x^2)."""
    c = [Fraction(0)] * n_terms
    c[0] = Fraction(0)
    if n_terms > 1:
        c[1] = Fraction(1)
    for i in range(2, n_terms):
        c[i] = c[i-1] + c[i-2]  # from the recurrence
    return c

coeffs = gf_fibonacci(15)
print("Fibonacci from generating function coefficients:")
for i, c in enumerate(coeffs):
    print(f"  [x^{i:2d}] = {c}")

# Step 2: Solve a_n = 3*a_{n-1} - 2*a_{n-2}, a_0=0, a_1=1
# GF: A(x) = x / (1 - 3x + 2x^2) = x / ((1-x)(1-2x))
# Partial fractions: A(x) = 1/(1-2x) - 1/(1-x)
# So a_n = 2^n - 1
print("\nRecurrence a_n = 3a_{n-1} - 2a_{n-2}, a_0=0, a_1=1:")
a = [0, 1]
for i in range(2, 12):
    a.append(3*a[-1] - 2*a[-2])

for n in range(12):
    closed = 2**n - 1
    print(f"  a_{n:2d} = {a[n]:5d}, closed form (2^n - 1) = {closed:5d}, match: {a[n] == closed}")

# Step 3: Use generating functions to count — number of ways to make change
# Coins: 1, 2, 5. GF = 1/((1-x)(1-x^2)(1-x^5))
# Coefficient of x^n = number of ways to make n cents
def count_change(amount, coins=[1, 2, 5]):
    """DP to compute coefficient of x^amount in the product GF."""
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:
        for j in range(coin, amount + 1):
            dp[j] += dp[j - coin]
    return dp

change = count_change(20)
print("\nNumber of ways to make change (coins 1,2,5):")
for n in range(21):
    print(f"  {n:2d} cents: {change[n]:3d} ways")
```

## Connection to CS / Games / AI

- **Algorithm analysis:** Generating functions give exact solutions to
  divide-and-conquer recurrences beyond the Master Theorem.
- **Combinatorics in CS:** Counting binary trees, lattice paths, and valid
  parenthesisations all use Catalan number GFs.
- **Probability:** Probability generating functions encode distributions,
  making convolution (sum of random variables) into multiplication.
- **Game dev:** Counting configurations in procedural generation (e.g., how
  many ways to tile a region) is a generating function problem.

## Check Your Understanding

1. Find the OGF for the sequence $a_n = n^2$ (hint: differentiate the OGF for
   $a_n = n$ and adjust).
2. Use generating functions to solve $a_n = 2a_{n-1} + 1$, $a_0 = 0$.
   (Hint: the GF for the constant 1 is $1/(1-x)$.)
3. The Catalan numbers satisfy $C_n = \sum_{k=0}^{n-1} C_k C_{n-1-k}$ with
   $C_0 = 1$. Show their GF satisfies $C(x) = 1 + x \cdot C(x)^2$ and solve it.
