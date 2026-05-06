---
strand: structure
level: intermediate
order: 6
title: Polynomial Rings
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 05-group-actions
    description: Group actions
connections:
  - strand-2-structure-intermediate/07-vector-spaces
applications:
  - cs: "Reed-Solomon codes, polynomial commitments, computer algebra"
  - life: "The arithmetic of expressions in $x$"
---

# Polynomial Rings

## Explain Like I Am 7

Imagine a row of pigeon-holes labelled "ones," "$x$s," "$x^2$s," and so
on, and inside each hole you can drop a number from your favourite
number-system.  A polynomial is the whole row of drops, and you can
add two polynomials by adding the numbers hole-by-hole, or multiply
them by carefully sliding holes together.  This big collection of
expressions, with these add-and-multiply rules, is itself a number-
system — a **polynomial ring**.  It looks like algebra-class symbols
but behaves like a brand-new kind of number.

## Mental

The **polynomial ring** $R[x]$ consists of finite formal sums

$$
a_0 + a_1 x + a_2 x^2 + \ldots + a_n x^n, \quad a_i \in R.
$$

with the obvious addition and multiplication. The variable $x$ is a
**formal symbol** — no value substituted yet.

If $R$ is a commutative ring with $1$, so is $R[x]$.

## Degree

$\deg(p) = $ largest $i$ with $a_i \ne 0$. Conventions: $\deg(0) = -\infty$.

For $p, q \in R[x]$ with $R$ an **integral domain** (no zero divisors):

- $\deg(p + q) \le \max(\deg p, \deg q)$.
- $\deg(p \cdot q) = \deg p + \deg q$.

If $R$ has zero divisors, the second can fail.

## Polynomial division (over a field)

When $R = F$ is a field, $F[x]$ is a **Euclidean domain**:

For any $a, b \in F[x]$ with $b \ne 0$, there exist unique $q, r \in F[x]$
with $a = bq + r$ and $\deg r < \deg b$.

This drives:

- The Euclidean algorithm for $\gcd$ of polynomials.
- Factorisation into irreducibles (unique).
- The structure of $F[x]/(p(x))$ for any polynomial $p$.

## Worked example: $\mathbb{Q}[x]$

$p(x) = x^3 + 2x + 5, \quad q(x) = x + 1$.

Long division:

$x^3 + 0 x^2 + 2x + 5 \div (x + 1)$
- $x^3 / x = x^2$, $x^2 (x + 1) = x^3 + x^2$
- Subtract: $-x^2 + 2x + 5$
- $-x^2 / x = -x$, $-x(x + 1) = -x^2 - x$
- Subtract: $3x + 5$
- $3x / x = 3$, $3(x + 1) = 3x + 3$
- Subtract: $2$ (remainder)

$p(x) = (x + 1)(x^2 - x + 3) + 2$. So $\gcd$ recursion would step
from $(p, q)$ to $(q, 2)$ to $(2, 0)$ — gcd is the constant 2 (a
unit in $\mathbb{Q}$, so coprime).

## Interactive

:::widget type=numeric-input prompt="$\\deg(x^4 + 3x + 2) = ?$" answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="$\\deg(x^2 + 1) \\cdot \\deg(x^3 + x) = 2 \\cdot 3 = 6$. So degree of product is $?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="$x^3 + 2x + 5$ divided by $x + 1$ — remainder is $p(-1) = -1 + (-2) + 5 = ?$. (Remainder theorem.)" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="In $\\mathbb{F}_2[x]$, $(x + 1)^2 = x^2 + 2x + 1 = x^2 + 1$. The $2x$ term vanishes because $2 = 0$. Type 1." answer=1 explain="Yes — characteristic 2.":::

## Symbolic

**Roots and factor theorem**: $a \in F$ is a root of $p \in F[x]$
iff $(x - a) \mid p$ in $F[x]$.

**Number of roots**: a polynomial of degree $n$ over a field has at
most $n$ roots in any extension field. (False over rings with zero
divisors!)

**Quotient $F[x]/(p(x))$**: when $p$ is irreducible of degree $n$ over
$F$, the quotient is a **field** with $|F|^n$ elements (if $F$ is
finite). This is *the* construction of finite fields:

$$
\mathbb{F}_{p^n} \;\cong\; \mathbb{F}_p[x] / (q(x))
$$

for any irreducible $q$ of degree $n$. AES uses $\mathbb{F}_{256} = \mathbb{F}_2[x]/(x^8 + x^4 + x^3 + x + 1)$.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

p = x**3 + 2*x + 5
q = x + 1

print(sp.div(p, q, x))                # (x^2 - x + 3, 2)  — quotient and remainder
print(sp.gcd(p, q))                   # constant — coprime over Q

# Factorisation
print(sp.factor(x**4 - 1))            # (x-1)(x+1)(x^2+1)
print(sp.factor(x**2 + 1))            # x^2 + 1 — irreducible over Q
print(sp.factor(x**2 + 1, modulus=5)) # (x - 2)(x - 3) — splits mod 5

# F_4 = F_2[x] / (x^2 + x + 1)
# Multiplication table:
def F4_mul(a, b):
    # represent each element as a polynomial of degree <= 1
    # multiply, reduce mod x^2 + x + 1, mod 2
    poly = sp.Poly(a * b, x, modulus=2)
    rem = sp.rem(poly, sp.Poly(x**2 + x + 1, x, modulus=2), modulus=2)
    return rem.as_expr()

print(F4_mul(x, x))       # x + 1   (= x^2 mod x^2 + x + 1 = -x - 1 ≡ x + 1 mod 2)
```

## Applied

- **Reed-Solomon codes** (CDs, DVDs, QR codes, satellite links)
  encode messages as polynomials over $\mathbb{F}_{256}$ and use
  polynomial root structure for error correction.
- **AES cryptography** — every byte is an element of $\mathbb{F}_{256}$;
  S-box and column-mix step are polynomial operations.
- **Polynomial commitments (KZG)** — Ethereum's data-availability
  layer uses commitments to polynomials over a curve's pairing-friendly
  field.
- **Computer algebra** — SymPy, Mathematica, Maple all rely on
  polynomial-ring arithmetic and Gröbner bases.

## Check Your Understanding

:::widget type=numeric-input prompt="Degree of product over an integral domain: $\\deg(p) + \\deg(q)$. For $\\deg p = 3, \\deg q = 5$: $?$" answer=8 explain="$8$.":::

:::widget type=numeric-input prompt="$\\mathbb{F}_2[x]/(x^2 + x + 1)$ has how many elements?" answer=4 explain="$2^2 = 4$.":::

:::widget type=numeric-input prompt="By the factor theorem, $a$ is a root of $p$ iff $(x - a) \\mid p$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A polynomial of degree $n$ over a field has at most $n$ roots. Type 1." answer=1 explain="Yes.":::
