# Theory of Equations — Vieta's Formulas and Symmetric Functions

## Intuition

When you solve a polynomial equation, you find its roots. But Vieta's formulas reveal a
beautiful shortcut: the *relationships between roots* are encoded directly in the
coefficients, without ever finding the roots themselves. This means you can compute the sum
of cubes of roots of a degree-5 polynomial without solving it — a technique that is both
elegant and computationally powerful. In computer science, these relationships power
polynomial factoring algorithms, error-correcting codes, and the characteristic polynomials
of matrices (whose roots are eigenvalues).

## Prerequisites

- Foundation 1, Lesson 8 (Polynomials and their roots)
- Foundation 3, Lesson 2 (Quadratic equations)
- Basic algebraic manipulation and factoring

## From First Principles

### Vieta's Formulas — Derivation from Factored Form

**Quadratic:** If $ax^2 + bx + c = 0$ has roots $\alpha, \beta$, then:

$$a(x - \alpha)(x - \beta) = 0$$

**Step 1.** Expand the left side:

$$a\left[x^2 - (\alpha + \beta)x + \alpha\beta\right] = 0$$

$$ax^2 - a(\alpha + \beta)x + a\alpha\beta = 0$$

**Step 2.** Compare coefficients with $ax^2 + bx + c = 0$:

$$\boxed{\alpha + \beta = -\frac{b}{a}, \quad \alpha\beta = \frac{c}{a}}$$

**Cubic:** If $ax^3 + bx^2 + cx + d = 0$ has roots $\alpha, \beta, \gamma$:

$$a(x - \alpha)(x - \beta)(x - \gamma) = 0$$

**Step 1.** Expand:

$$a\left[x^3 - (\alpha+\beta+\gamma)x^2 + (\alpha\beta+\beta\gamma+\gamma\alpha)x - \alpha\beta\gamma\right] = 0$$

**Step 2.** Compare coefficients:

$$\boxed{\alpha + \beta + \gamma = -\frac{b}{a}}$$
$$\boxed{\alpha\beta + \beta\gamma + \gamma\alpha = \frac{c}{a}}$$
$$\boxed{\alpha\beta\gamma = -\frac{d}{a}}$$

**Quartic:** $ax^4 + bx^3 + cx^2 + dx + e = 0$ with roots $\alpha, \beta, \gamma, \delta$:

$$\sum \alpha = -b/a, \quad \sum \alpha\beta = c/a, \quad \sum \alpha\beta\gamma = -d/a, \quad \alpha\beta\gamma\delta = e/a$$

**General pattern:** For $a_n x^n + a_{n-1}x^{n-1} + \cdots + a_0 = 0$ with roots $r_1, \ldots, r_n$:

$$e_k(r_1, \ldots, r_n) = (-1)^k \frac{a_{n-k}}{a_n}$$

where $e_k$ is the $k$-th elementary symmetric polynomial.

### Symmetric Functions of Roots

Given roots $\alpha, \beta$ of a quadratic, we can compute:

**Sum of squares:** $\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta$

**Sum of cubes:** $\alpha^3 + \beta^3 = (\alpha + \beta)^3 - 3\alpha\beta(\alpha + \beta)$

**Sum of fourth powers:**
$\alpha^4 + \beta^4 = (\alpha^2 + \beta^2)^2 - 2(\alpha\beta)^2$

**For three roots** $\alpha, \beta, \gamma$, let $p = \alpha + \beta + \gamma$,
$q = \alpha\beta + \beta\gamma + \gamma\alpha$, $r = \alpha\beta\gamma$:

$$\alpha^2 + \beta^2 + \gamma^2 = p^2 - 2q$$

$$\alpha^3 + \beta^3 + \gamma^3 = p^3 - 3pq + 3r$$

The last follows from **Newton's identity**: $p_k = e_1 p_{k-1} - e_2 p_{k-2} + e_3 p_{k-3} - \cdots$

where $p_k = \sum \alpha_i^k$ (power sums) and $e_k$ are elementary symmetric polynomials.

### Transformation of Equations

**Problem type:** Given an equation with roots $\alpha, \beta, \gamma$, find an equation
whose roots are transformed versions.

**Roots increased by $h$:** Replace $x$ with $x - h$ in the original equation.
(If original root is $\alpha$, new root is $\alpha + h$.)

**Reciprocal roots ($1/\alpha$):** Replace $x$ with $1/x$ and multiply through.
Equivalently, reverse the coefficient order.

**Roots scaled by $k$:** Replace $x$ with $x/k$.

**Roots squared:** If $\alpha$ is a root of $f(x) = 0$, then $\alpha^2$ is a root of
$f(\sqrt{x}) = 0$. Set $y = x^2$, substitute, and eliminate the square root.

### Descartes' Rule of Signs (Review)

The number of positive real roots of $f(x) = 0$ is at most the number of sign changes in
the coefficients of $f(x)$, and differs from it by an even number.

For negative roots, count sign changes in $f(-x)$.

**Example:** $f(x) = x^3 - 3x + 2$. Signs: $+, -, +$ → 2 sign changes → 0 or 2 positive roots.

$f(-x) = -x^3 + 3x + 2$. Signs: $-, +, +$ → 1 sign change → exactly 1 negative root.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

# Polynomial x^3 - 6x^2 + 11x - 6 = 0 with roots 1, 2, 3
coeffs = [1, -6, 11, -6]
roots = np.array([1, 2, 3])

fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

# --- Plot 1: polynomial with roots marked ---
ax = axes[0]
x = np.linspace(-0.5, 4.5, 500)
y = np.polyval(coeffs, x)
ax.plot(x, y, 'b-', linewidth=2, label='$x^3 - 6x^2 + 11x - 6$')
ax.axhline(y=0, color='k', linewidth=0.5)
for r in roots:
    ax.plot(r, 0, 'ro', markersize=10)
    ax.annotate(f'x = {r}', (r, 0), textcoords="offset points", xytext=(5, 10), fontsize=12)

# Annotate Vieta's relations
ax.text(0.5, 3, f"$\\alpha + \\beta + \\gamma = {sum(roots)}$\n"
                 f"$= -(-6)/1 = 6$ ✓", fontsize=11, bbox=dict(boxstyle='round', facecolor='lightyellow'))
ax.text(2.5, -3, f"$\\alpha\\beta\\gamma = {np.prod(roots)}$\n"
                   f"$= -(-6)/1 = 6$ ✓", fontsize=11, bbox=dict(boxstyle='round', facecolor='lightyellow'))
ax.set_title("Cubic with roots 1, 2, 3 — Vieta's relations", fontsize=13)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

# --- Plot 2: transformed equation (roots shifted by +1) ---
ax = axes[1]
# New roots: 2, 3, 4. New polynomial: (x-2)(x-3)(x-4) = x^3 - 9x^2 + 26x - 24
new_roots = roots + 1
new_coeffs = np.poly(new_roots)
y2 = np.polyval(new_coeffs, x)
ax.plot(x, y, 'b--', linewidth=1.5, alpha=0.5, label='Original')
ax.plot(x, y2, 'r-', linewidth=2, label='Roots shifted by +1')
for r in new_roots:
    ax.plot(r, 0, 'rs', markersize=8)
ax.axhline(y=0, color='k', linewidth=0.5)
ax.set_title("Transformation: roots increased by 1", fontsize=13)
ax.text(0.3, -10, f"New sum = {sum(new_roots)}\n= 6 + 3(1) = 9", fontsize=11,
        bbox=dict(boxstyle='round', facecolor='lightyellow'))
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('theory_of_equations.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from numpy.polynomial import polynomial as P

# --- Quadratic: 2x^2 - 7x + 3 = 0 ---
a, b, c = 2, -7, 3
roots_q = np.roots([a, b, c])
alpha, beta = roots_q
print("Quadratic: 2x^2 - 7x + 3 = 0")
print(f"  Roots: {alpha:.4f}, {beta:.4f}")
print(f"  Sum (Vieta): -b/a = {-b/a:.4f}, actual: {alpha + beta:.4f}")
print(f"  Product (Vieta): c/a = {c/a:.4f}, actual: {alpha * beta:.4f}")
print(f"  Sum of squares: {alpha**2 + beta**2:.4f}")
print(f"    = (sum)^2 - 2*product = {(-b/a)**2 - 2*(c/a):.4f}")

# --- Cubic: x^3 - 6x^2 + 11x - 6 = 0 (roots 1, 2, 3) ---
print("\nCubic: x^3 - 6x^2 + 11x - 6 = 0")
roots_c = np.roots([1, -6, 11, -6])
print(f"  Roots: {np.sort(np.real(roots_c))}")
p = 6   # sum of roots
q = 11  # sum of products in pairs
r = 6   # product of all roots
print(f"  Vieta: sum = {p}, sum of pairs = {q}, product = {r}")

# Sum of squares
sum_sq = p**2 - 2*q
print(f"  Sum of squares = p^2 - 2q = {sum_sq}")
print(f"    Verify: 1^2 + 2^2 + 3^2 = {1+4+9}")

# Sum of cubes (Newton's identity)
sum_cu = p**3 - 3*p*q + 3*r
print(f"  Sum of cubes = p^3 - 3pq + 3r = {sum_cu}")
print(f"    Verify: 1^3 + 2^3 + 3^3 = {1+8+27}")

# --- Transformation: reciprocal roots ---
print("\nTransformation: reciprocal roots of x^3 - 6x^2 + 11x - 6 = 0")
print("  Reverse coefficients: -6x^3 + 11x^2 - 6x + 1 = 0")
print("  Or: 6x^3 - 11x^2 + 6x - 1 = 0")
recip_roots = np.roots([6, -11, 6, -1])
print(f"  Reciprocal roots: {np.sort(np.real(recip_roots))}")
print(f"  Expected: {1/np.sort(np.real(roots_c))}")

# --- Descartes' rule of signs ---
print("\nDescartes' rule: f(x) = x^4 - 3x^3 + 2x^2 + x - 1")
coeffs = [1, -3, 2, 1, -1]
signs = ['+' if c > 0 else '-' for c in coeffs]
changes = sum(1 for i in range(len(signs)-1) if signs[i] != signs[i+1])
print(f"  Signs: {signs}")
print(f"  Sign changes: {changes} => at most {changes} positive real roots")
actual_roots = np.roots(coeffs)
pos_real = sum(1 for r in actual_roots if np.isreal(r) and np.real(r) > 0)
print(f"  Actual positive real roots: {pos_real}")
print(f"  All roots: {np.round(actual_roots, 4)}")

# --- Quartic Vieta's ---
print("\nQuartic: (x-1)(x-2)(x-3)(x-4) = x^4 - 10x^3 + 35x^2 - 50x + 24")
roots_4 = [1, 2, 3, 4]
print(f"  e1 (sum) = {sum(roots_4)} = 10 = -(-10)/1 ✓")
from itertools import combinations
e2 = sum(a*b for a, b in combinations(roots_4, 2))
e3 = sum(a*b*c for a, b, c in combinations(roots_4, 3))
e4 = np.prod(roots_4)
print(f"  e2 (sum of pairs) = {e2} = 35/1 ✓")
print(f"  e3 (sum of triples) = {e3} = -(-50)/1 ✓")
print(f"  e4 (product) = {e4} = 24/1 ✓")
```

## Connection to CS / Games / AI

- **Eigenvalues:** The characteristic polynomial of a matrix has eigenvalues as roots.
  Vieta's formulas give trace = sum of eigenvalues and determinant = product of eigenvalues
  without computing individual eigenvalues.
- **Error-correcting codes:** Reed-Solomon codes use polynomial theory over finite fields.
  The theory of equations over $GF(q)$ powers modern communication systems.
- **Signal processing:** Z-transform poles and zeros are roots of polynomials. Their
  symmetric functions determine filter stability and frequency response.
- **AI:** The characteristic polynomial of the Hessian matrix determines the nature of
  critical points in optimisation landscapes.

## Check Your Understanding

1. **By hand:** For $x^2 - 5x + 6 = 0$, find $\alpha^2 + \beta^2$ and
   $\alpha^3 + \beta^3$ without finding $\alpha$ and $\beta$.

2. **Transform:** Find the equation whose roots are the reciprocals of the roots
   of $3x^3 - x^2 + 4x - 7 = 0$.

3. **Newton's identity:** If $\alpha, \beta, \gamma$ are roots of $x^3 + 2x + 5 = 0$,
   compute $\alpha^2 + \beta^2 + \gamma^2$ and $\alpha^4 + \beta^4 + \gamma^4$.
   (Note: coefficient of $x^2$ is 0, so $\sum\alpha = 0$.)

4. **Descartes:** For $f(x) = x^5 - 3x^4 + x^3 + x^2 - 2x + 1$, determine the maximum
   possible number of positive and negative real roots.

5. **Coding:** Write a function that takes polynomial coefficients and returns all
   elementary symmetric polynomials of the roots using only Vieta's formulas (no root-finding).

## JEE Challenge

**Problem 1.** If $\alpha, \beta, \gamma$ are the roots of $x^3 - px^2 + qx - r = 0$,
find the value of $\alpha^3 + \beta^3 + \gamma^3$ in terms of $p$, $q$, $r$.

*Solution approach:* Since each root satisfies the equation, $\alpha^3 = p\alpha^2 - q\alpha + r$.
Sum over all roots: $\sum\alpha^3 = p\sum\alpha^2 - q\sum\alpha + 3r = p(p^2 - 2q) - qp + 3r = p^3 - 3pq + 3r$.
Alternatively, this equals $3r$ when $p = 0$ (check!).

**Problem 2.** Find a cubic equation whose roots are the squares of the roots of
$x^3 + 3x^2 - 1 = 0$, without finding the individual roots.

*Hint:* Let $y = x^2$, so $x = \sqrt{y}$. Substitute into the equation and rationalise
to eliminate the square root. You should get $y^3 + 6y^2 + 9y - 1 = 0$ (verify using
Vieta's: if original roots are $\alpha, \beta, \gamma$, then sum of squares should be
$(-3)^2 - 2(0) = 9$, and indeed $-(6) = -6$... trace the signs carefully!).

**Problem 3.** The equation $x^4 - 4x^3 + ax^2 + bx + 1 = 0$ has the property that if
$\alpha$ is a root, then $1/\alpha$ is also a root. Use this to show that
$b = -4$ and find the value of $a$ given that all roots are real.
