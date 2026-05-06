---
strand: structure
level: intermediate
order: 8
title: Field Extensions
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 07-vector-spaces
    description: Vector spaces
connections:
  - strand-2-structure-intermediate/09-structure-capstone-2
applications:
  - cs: "Constructing finite fields used in AES, error correction"
  - life: "Building bigger fields by adjoining roots"
---

# Field Extensions

## Explain Like I Am 7

You have a perfectly fine number-kingdom — say, the rationals.  But
your kingdom can't solve "$x^2 = 2$," so you build a tiny annex onto
the kingdom and move $\sqrt{2}$ in.  The annex still obeys *all* the
old kingdom's rules and now magically contains the new resident plus
all its mathematical relatives.  This bigger kingdom is a **field
extension** of the original.  Some annexes are small (one new
resident); others can be infinitely huge — and the *size* of the
annex tells you a lot about which puzzles can now be solved.

## Mental

Given a field $F$ inside a larger field $K$, we say $K$ is an
**extension** of $F$, written $K / F$. The bigger field $K$ is a
**vector space over $F$** — its dimension is the **degree of the
extension**:

$$
[K : F] = \dim_F K.
$$

Examples:

- $\mathbb{C} / \mathbb{R}$: degree 2 (basis $\{1, i\}$).
- $\mathbb{Q}(\sqrt{2}) / \mathbb{Q}$: degree 2 (basis $\{1, \sqrt{2}\}$).
- $\mathbb{F}_{p^n} / \mathbb{F}_p$: degree $n$.

## Adjoining a root

Given $\alpha$ algebraic over $F$ (i.e., a root of some polynomial in
$F[x]$), the smallest field containing $F$ and $\alpha$ is

$$
F(\alpha) \;\cong\; F[x] / (m_\alpha(x)),
$$

where $m_\alpha$ is the **minimal polynomial** of $\alpha$ — the
monic polynomial of *smallest* degree with $\alpha$ as a root.

**Degree** $[F(\alpha) : F] = \deg m_\alpha$.

## Worked example: $\mathbb{Q}(\sqrt{2})$

$\alpha = \sqrt{2}$ has minimal polynomial $x^2 - 2$ over $\mathbb{Q}$
(irreducible since $\sqrt{2} \notin \mathbb{Q}$).

So $\mathbb{Q}(\sqrt{2}) \cong \mathbb{Q}[x]/(x^2 - 2)$. Degree 2.

Elements look like $a + b\sqrt{2}$ with $a, b \in \mathbb{Q}$.
Multiplication uses $\sqrt{2}^2 = 2$:

$(a + b\sqrt{2})(c + d\sqrt{2}) = ac + 2 bd + (ad + bc) \sqrt{2}$.

## Tower formula

For nested extensions $F \subseteq K \subseteq L$:

$$
[L : F] = [L : K] \cdot [K : F].
$$

This is **Lagrange's theorem for fields** — same shape as group
indices.

## Construction of $\mathbb{F}_4$

$\mathbb{F}_4 \cong \mathbb{F}_2[x] / (x^2 + x + 1)$. Elements:
$\{0, 1, x, x + 1\}$ — four elements.

Multiplication uses $x^2 + x + 1 \equiv 0$, i.e., $x^2 = x + 1$:

| $\cdot$ | $1$ | $x$ | $x + 1$ |
|---|---|---|---|
| $1$ | $1$ | $x$ | $x + 1$ |
| $x$ | $x$ | $x + 1$ | $1$ |
| $x + 1$ | $x + 1$ | $1$ | $x$ |

It's a field — every non-zero element has a multiplicative inverse.

## Interactive

:::widget type=numeric-input prompt="$[\\mathbb{C} : \\mathbb{R}] = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$[\\mathbb{Q}(\\sqrt[3]{2}) : \\mathbb{Q}] = ?$ (minimal poly $x^3 - 2$)" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$[\\mathbb{F}_{8} : \\mathbb{F}_2] = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$[\\mathbb{Q}(\\sqrt{2}, \\sqrt{3}) : \\mathbb{Q}] = [\\mathbb{Q}(\\sqrt{2}, \\sqrt{3}) : \\mathbb{Q}(\\sqrt{2})] \\cdot [\\mathbb{Q}(\\sqrt{2}) : \\mathbb{Q}] = 2 \\cdot 2 = ?$" answer=4 explain="$4$.":::

## Symbolic

**Algebraic vs transcendental**: $\alpha$ is *algebraic over $F$* if
it satisfies a polynomial in $F[x]$; otherwise *transcendental*.

$\pi$ and $e$ are transcendental over $\mathbb{Q}$ (Lindemann-Weierstrass);
$\sqrt{2}$ is algebraic.

**Splitting field** of $p(x) \in F[x]$: smallest extension where $p$
factors into linear pieces. For $p(x) = x^2 - 2$ over $\mathbb{Q}$,
the splitting field is $\mathbb{Q}(\sqrt{2})$.

**Galois extension** — splitting field of a separable polynomial.
The **Galois group** $\mathrm{Gal}(K/F)$ — automorphisms of $K$
fixing $F$ — encodes the symmetry of the extension. (Strand 2
Advanced.)

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Minimal polynomial of sqrt(2) over Q
print(sp.minimal_polynomial(sp.sqrt(2), x))      # x^2 - 2
print(sp.minimal_polynomial(sp.cbrt(2), x))      # x^3 - 2
print(sp.minimal_polynomial(sp.sqrt(2) + sp.sqrt(3), x))  # x^4 - 10x^2 + 1, degree 4

# Element of Q(sqrt 2)
a = sp.Rational(2, 3) + sp.Rational(5, 7) * sp.sqrt(2)
b = sp.Rational(1, 2) + sp.sqrt(2)
print(sp.expand(a * b))                          # element of Q(sqrt 2)

# Build F_4 manually as F_2[x] / (x^2 + x + 1)
def F4_mul(p, q):
    poly = sp.Poly(p * q, x, modulus=2)
    rem = sp.rem(poly, sp.Poly(x**2 + x + 1, x, modulus=2), modulus=2)
    return rem.as_expr()

print(F4_mul(x, x))           # x + 1 (= x^2 mod x^2+x+1 mod 2)
print(F4_mul(x + 1, x))       # 1 — so x and x+1 are mutual inverses
```

## Applied

- **Finite fields in cryptography** — AES uses $\mathbb{F}_{256} = \mathbb{F}_2[x]/(x^8 + x^4 + x^3 + x + 1)$.
  The S-box is a polynomial inversion in this field.
- **Elliptic-curve cryptography** — over fields like $\mathbb{F}_p$
  (large prime) and $\mathbb{F}_{2^m}$ (binary fields).
- **Reed-Solomon error correction** — codewords are polynomial values
  in $\mathbb{F}_{256}$ extension.
- **Algebraic number theory** — extensions like $\mathbb{Q}(\zeta_n)$
  (cyclotomic fields) underlie modern lattice-based crypto and
  primality tests.

## Check Your Understanding

:::widget type=numeric-input prompt="$[L:F] = [L:K] \\cdot [K:F]$. Type 1 if tower formula." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\sqrt{2}$ is algebraic over $\\mathbb{Q}$. Type 1." answer=1 explain="Yes — root of $x^2 - 2$.":::

:::widget type=numeric-input prompt="$\\pi$ is algebraic over $\\mathbb{Q}$. Type 1 yes, 0 no." answer=0 explain="No — transcendental.":::

:::widget type=numeric-input prompt="$|\\mathbb{F}_{16}| = ?$" answer=16 explain="$16$.":::
