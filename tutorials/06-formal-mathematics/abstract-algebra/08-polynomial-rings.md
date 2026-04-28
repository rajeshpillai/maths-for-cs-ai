# Polynomial Rings

## Intuition

Polynomials are not just functions — they are algebraic objects that can be
added, multiplied, and divided with remainder, just like integers. The ring
of polynomials $R[x]$ over a ring $R$ is the workhorse of coding theory
(CRC checksums, Reed-Solomon codes), computer algebra systems, and
cryptographic constructions.

## Prerequisites

- Tier 16, Lesson 7 (Rings)

## From First Principles

### Definition of $R[x]$

Given a ring $R$, the **polynomial ring** $R[x]$ consists of all expressions:

$$f(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0, \quad a_i \in R$$

with addition and multiplication defined in the obvious way.

### Degree

$\deg(f) = $ highest power of $x$ with non-zero coefficient.

$\deg(0) = -\infty$ by convention.

$\deg(fg) = \deg(f) + \deg(g)$ (if $R$ is an integral domain).

### Addition

Add corresponding coefficients:

$(3x^2 + 2x + 1) + (x^2 + 4x + 3) = 4x^2 + 6x + 4$

### Multiplication

Distribute and collect:

$(2x + 1)(x + 3) = 2x^2 + 6x + x + 3 = 2x^2 + 7x + 3$

### Division Algorithm

**Theorem**: If $R$ is a field, then for $f, g \in R[x]$ with $g \neq 0$, there exist unique $q, r \in R[x]$ with:

$$f = gq + r, \quad \deg(r) < \deg(g)$$

### Pen & Paper: Polynomial Long Division

Divide $f(x) = x^3 + 2x^2 - x + 3$ by $g(x) = x + 1$ over $\mathbb{Q}$:

```
        x² + x - 2
       ─────────────
x + 1 ) x³ + 2x² - x + 3
         x³ +  x²
         ─────────
              x² - x
              x² + x
              ──────
                 -2x + 3
                 -2x - 2
                 ───────
                      5
```

$q(x) = x^2 + x - 2$, $r = 5$.

Check: $(x + 1)(x^2 + x - 2) + 5 = x^3 + x^2 + x^2 + x - 2x - 2 + 5 = x^3 + 2x^2 - x + 3$. Correct.

### Polynomials over Finite Fields

In $\mathbb{Z}_2[x]$, coefficients are 0 or 1, and $1 + 1 = 0$.

$(x^2 + x + 1)(x + 1) = x^3 + x^2 + x^2 + x + x + 1 = x^3 + 1$ in $\mathbb{Z}_2[x]$.

### Irreducible Polynomials

A polynomial $f \in R[x]$ with $\deg(f) \geq 1$ is **irreducible** if it cannot be written as $f = gh$ with $\deg(g), \deg(h) \geq 1$.

Irreducible polynomials in polynomial rings play the role of prime numbers in $\mathbb{Z}$.

**Example**: $x^2 + 1$ is irreducible in $\mathbb{R}[x]$ (no real roots) but reducible in $\mathbb{C}[x]$ (factors as $(x+i)(x-i)$).

$x^2 + x + 1$ is irreducible in $\mathbb{Z}_2[x]$ (check: $f(0) = 1 \neq 0$, $f(1) = 1 \neq 0$, no roots).

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

# Visualise polynomial division
fig, ax = plt.subplots(figsize=(8, 5))

x = np.linspace(-3, 2, 200)
f = x**3 + 2*x**2 - x + 3
g = x + 1
q = x**2 + x - 2
r = 5

ax.plot(x, f, 'b-', linewidth=2, label='f(x) = x³+2x²-x+3')
ax.plot(x, g * q, 'r--', linewidth=2, label='g(x)·q(x) = (x+1)(x²+x-2)')
ax.plot(x, g * q + r, 'g:', linewidth=2, label='g·q + r = f (check)')
ax.axhline(r, color='orange', linestyle='-.', alpha=0.5, label=f'remainder = {r}')
ax.legend(fontsize=9)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.set_title('Polynomial Division: f = g·q + r')
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('polynomial_division.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Polynomial Rings ─────────────────────────────────────

# Step 1: Polynomial arithmetic using coefficient lists
# Represent f(x) = a_0 + a_1*x + a_2*x^2 + ... as [a_0, a_1, a_2, ...]

def poly_add(f, g, mod=None):
    """Add two polynomials."""
    n = max(len(f), len(g))
    result = [0] * n
    for i in range(len(f)):
        result[i] += f[i]
    for i in range(len(g)):
        result[i] += g[i]
    if mod:
        result = [c % mod for c in result]
    # Strip leading zeros
    while len(result) > 1 and result[-1] == 0:
        result.pop()
    return result

def poly_mul(f, g, mod=None):
    """Multiply two polynomials."""
    n = len(f) + len(g) - 1
    result = [0] * n
    for i in range(len(f)):
        for j in range(len(g)):
            result[i + j] += f[i] * g[j]
    if mod:
        result = [c % mod for c in result]
    while len(result) > 1 and result[-1] == 0:
        result.pop()
    return result

def poly_str(f, var='x'):
    """Pretty-print a polynomial."""
    terms = []
    for i, c in enumerate(f):
        if c == 0:
            continue
        if i == 0:
            terms.append(str(c))
        elif i == 1:
            terms.append(f"{c}{var}" if c != 1 else var)
        else:
            terms.append(f"{c}{var}^{i}" if c != 1 else f"{var}^{i}")
    return " + ".join(terms) if terms else "0"

# Step 2: Polynomial long division over Q
def poly_divmod(f, g):
    """Divide f by g, return (quotient, remainder)."""
    f = list(f)
    g = list(g)
    if len(f) < len(g):
        return [0], f
    q = [0] * (len(f) - len(g) + 1)
    r = list(f)
    while len(r) >= len(g) and any(c != 0 for c in r):
        coeff = r[-1] / g[-1]
        deg = len(r) - len(g)
        q[deg] = coeff
        for i in range(len(g)):
            r[deg + i] -= coeff * g[i]
        # Remove leading near-zeros
        while len(r) > 1 and abs(r[-1]) < 1e-10:
            r.pop()
    return q, r

# Step 3: Example: divide x^3 + 2x^2 - x + 3 by x + 1
f = [3, -1, 2, 1]    # 3 - x + 2x^2 + x^3
g = [1, 1]            # 1 + x

q, r = poly_divmod(f, g)
print("=== Polynomial Division ===")
print(f"f(x) = {poly_str(f)}")
print(f"g(x) = {poly_str(g)}")
print(f"q(x) = {poly_str(q)}")
print(f"r(x) = {poly_str(r)}")

# Verify: f = g*q + r
check = poly_add(poly_mul(g, q), r)
print(f"g*q + r = {poly_str(check)}")
print(f"Equals f: {all(abs(a - b) < 1e-10 for a, b in zip(f, check))}")

# Step 4: Polynomials over Z_2
print("\n=== Z_2[x]: (x²+x+1)(x+1) ===")
f2 = [1, 1, 1]  # 1 + x + x^2
g2 = [1, 1]      # 1 + x
product = poly_mul(f2, g2, mod=2)
print(f"({poly_str(f2)}) * ({poly_str(g2)}) = {poly_str(product)} in Z_2[x]")

# Step 5: Check irreducibility in Z_2[x]
print("\n=== Irreducibility in Z_2[x] ===")
def is_irreducible_Z2(f):
    """Check if f is irreducible in Z_2[x] by testing all divisors."""
    deg_f = len(f) - 1
    if deg_f <= 1:
        return deg_f == 1
    # Check all polynomials of degree 1 to deg_f // 2
    from itertools import product
    for d in range(1, deg_f // 2 + 1):
        # Generate all degree-d polynomials in Z_2[x]
        for coeffs in product([0, 1], repeat=d):
            g = list(coeffs) + [1]  # monic
            q, r = poly_divmod(f, g)
            r_mod = [int(round(c)) % 2 for c in r]
            if all(c == 0 for c in r_mod):
                return False
    return True

test_polys = [
    ([1, 1, 1], "x²+x+1"),
    ([1, 0, 1], "x²+1"),
    ([1, 1, 0, 1], "x³+x+1"),
    ([1, 1, 1, 1], "x³+x²+x+1"),
]
for coeffs, name in test_polys:
    irr = is_irreducible_Z2(coeffs)
    print(f"  {name}: irreducible = {irr}")
```

## Connection to CS / Games / AI / Business / Industry

- **CRC checksums**: use polynomial division over $\mathbb{Z}_2[x]$ to detect transmission errors.
- **Reed-Solomon codes**: use polynomial evaluation and interpolation over finite fields for error correction (QR codes, CDs, DVDs).
- **AES encryption**: operates in $GF(2^8) \cong \mathbb{Z}_2[x]/(x^8 + x^4 + x^3 + x + 1)$.
- **Computer algebra**: Maple, Mathematica, and SymPy manipulate polynomials symbolically using these algorithms.
- **FFT-based multiplication**: multiplying large numbers reduces to polynomial multiplication via FFT.

## Check Your Understanding

1. Divide $2x^3 + 3x^2 - x + 1$ by $x - 2$ over $\mathbb{Q}$ using long division.
2. List all irreducible polynomials of degree 2 and 3 in $\mathbb{Z}_2[x]$.
3. Compute $(x^3 + x + 1) \times (x^2 + 1)$ in $\mathbb{Z}_2[x]$.
