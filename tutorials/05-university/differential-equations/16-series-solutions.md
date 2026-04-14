# Power Series Solutions of Differential Equations

## Intuition

Some differential equations have no nice closed-form solution in terms of
elementary functions. But they often have a perfectly good **power series**
solution — an infinite polynomial. You assume $y = a_0 + a_1 x + a_2 x^2 + \ldots$,
plug it into the DE, and match coefficients to find every $a_n$. This is how
Bessel functions, Legendre polynomials, and many special functions in physics
and engineering were originally discovered.

## Prerequisites

- Tier 3, Lesson 9: Taylor / Maclaurin Series (power series fundamentals)
- Tier 11, Lesson 7: Second-Order Homogeneous ODEs (context for what we are solving)

## From First Principles

### The Method

Given an ODE, assume the solution has the form:

$$y(x) = \sum_{n=0}^{\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \ldots$$

Then:

$$y'(x) = \sum_{n=1}^{\infty} n\,a_n\,x^{n-1} = a_1 + 2a_2 x + 3a_3 x^2 + \ldots$$

$$y''(x) = \sum_{n=2}^{\infty} n(n-1)\,a_n\,x^{n-2} = 2a_2 + 6a_3 x + 12a_4 x^2 + \ldots$$

Substitute these into the DE, collect powers of $x$, and set each coefficient
to zero. This gives a **recurrence relation** for the $a_n$.

### Pen & Paper Example: $y' = y$

We know the answer should be $y = Ce^x$, so this tests the method.

Assume $y = \sum a_n x^n$. Then $y' = \sum n\,a_n x^{n-1}$.

The equation $y' = y$ becomes:

$$\sum_{n=1}^{\infty} n\,a_n\,x^{n-1} = \sum_{n=0}^{\infty} a_n\,x^n$$

Re-index the left side: let $m = n-1$, so $n = m+1$:

$$\sum_{m=0}^{\infty} (m+1)\,a_{m+1}\,x^m = \sum_{m=0}^{\infty} a_m\,x^m$$

Match coefficients of $x^m$:

$$(m+1)\,a_{m+1} = a_m \quad\Rightarrow\quad a_{m+1} = \frac{a_m}{m+1}$$

Starting from $a_0$ (arbitrary constant):

| $n$ | $a_n$ |
|-----|--------|
| 0   | $a_0$ |
| 1   | $a_0 / 1$ |
| 2   | $a_0 / (1 \cdot 2)$ |
| 3   | $a_0 / (1 \cdot 2 \cdot 3)$ |
| $n$ | $a_0 / n!$ |

So $y = a_0 \sum_{n=0}^{\infty} \frac{x^n}{n!} = a_0\,e^x$ ✓

### Pen & Paper Example: Airy's Equation $y'' - xy = 0$

This equation has no elementary closed-form solution — series is the way.

Substitute $y = \sum a_n x^n$:

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} - x\sum_{n=0}^{\infty} a_n x^n = 0$$

$$\sum_{n=2}^{\infty} n(n-1)a_n x^{n-2} - \sum_{n=0}^{\infty} a_n x^{n+1} = 0$$

Re-index: let $m = n-2$ in the first sum, $m = n+1$ in the second:

$$\sum_{m=0}^{\infty} (m+2)(m+1)a_{m+2} x^m - \sum_{m=1}^{\infty} a_{m-1} x^m = 0$$

The $m = 0$ term gives: $2 \cdot 1 \cdot a_2 = 0$, so $a_2 = 0$.

For $m \geq 1$: $(m+2)(m+1)a_{m+2} = a_{m-1}$.

### Visualisation

Show partial sums of the series converging to the true solution of $y' = y$.

```python
import numpy as np
import matplotlib.pyplot as plt
from math import factorial

x = np.linspace(-2, 3, 300)
exact = np.exp(x)  # exact solution with a_0 = 1

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, exact, 'k-', linewidth=2.5, label='exact: e^x')

# Partial sums: N = 1, 2, 4, 8, 15 terms
for N in [1, 2, 4, 8, 15]:
    partial = sum(x**n / factorial(n) for n in range(N))
    ax.plot(x, partial, '--', linewidth=1.2, label=f'{N} terms')

ax.set_ylim(-1, 10)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Power Series Partial Sums Converging to e^x')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig("series_solution_convergence.png", dpi=100)
plt.show()
```

## Python Verification

```python
import sympy as sp

x = sp.Symbol('x')

# ── Example 1: y' = y via power series ──────────────────
# Build the recurrence a_{n+1} = a_n / (n+1)
a = [1]  # a_0 = 1
for n in range(10):
    a.append(a[n] / (n + 1))

print("Coefficients a_n:", [float(c) for c in a])
print("Compare with 1/n!:", [1/sp.factorial(n) for n in range(11)])

# Build partial sum and compare to exp(x)
partial = sum(a[n] * x**n for n in range(11))
print("Partial sum:", sp.expand(partial))

# ── Example 2: Airy equation y'' - x*y = 0 ─────────────
# Recurrence: a_{m+2} = a_{m-1} / ((m+2)(m+1))  for m >= 1
# a_2 = 0 always
N = 20
coeff = [0] * N
coeff[0] = 1  # a_0 = 1 (first independent solution)
coeff[1] = 0  # a_1 = 0
coeff[2] = 0  # forced by equation

for m in range(1, N - 2):
    coeff[m + 2] = coeff[m - 1] / ((m + 2) * (m + 1))

print("\nAiry coefficients (first solution):")
for n in range(12):
    if coeff[n] != 0:
        print(f"  a_{n} = {float(coeff[n]):.8f}")

# Verify: substitute back into y'' - x*y
y_series = sum(coeff[n] * x**n for n in range(N))
residual = sp.diff(y_series, x, 2) - x * y_series
residual_expanded = sp.expand(residual)
# Should be zero up to O(x^{N-3})
print("Leading residual terms:", sp.Poly(residual_expanded, x).all_coeffs()[:3])

# ── Cross-check with SymPy's dsolve ────────────────────
y = sp.Function('y')
airy_ode = sp.Eq(y(x).diff(x, 2) - x * y(x), 0)
sol = sp.dsolve(airy_ode, y(x))
print("\nSymPy's solution:", sol)
```

## Connection to CS / Games / AI

- **Special functions** — Bessel, Legendre, Hermite, and Laguerre functions
  (used in physics engines and quantum ML) are all defined by series solutions.
- **Numerical solvers** — Adaptive ODE solvers (like `scipy.integrate.solve_ivp`)
  internally use Taylor-series-like expansions for local approximation.
- **Symbolic AI** — Computer algebra systems use power series to simplify and
  solve equations that resist closed-form methods.
- **Generating functions** — In combinatorics and algorithm analysis, generating
  functions are power series whose coefficients count objects.

## Check Your Understanding

1. Use the series method on $y' = 2xy$ with $y(0) = 1$. You should find
   $a_n = 1/n!$ only for even $n$ (in terms of the right variable), giving
   $y = e^{x^2}$.

2. For the Airy equation, find the second independent solution by setting
   $a_0 = 0$, $a_1 = 1$. Compute the first six nonzero coefficients.

3. How many terms of the $e^x$ series do you need to get 6-digit accuracy
   at $x = 5$? Write a small loop to find out.
