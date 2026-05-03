---
strand: structure
level: advanced
order: 1
title: Quotient Rings
prerequisites:
  - tier: strand-2-structure-advanced
    slug: 00-ideals
    description: Ideals
connections:
  - strand-2-structure-advanced/02-pid-and-ufd
applications:
  - cs: "Modular arithmetic, finite-field construction, FHE plaintext spaces"
  - life: "What you get when you collapse an ideal to zero"
---

# Quotient Rings

## Mental

Given a ring $R$ and ideal $I$, the **quotient ring** $R/I$ has:

- **Elements**: cosets $a + I$.
- **Addition**: $(a + I) + (b + I) = (a + b) + I$.
- **Multiplication**: $(a + I)(b + I) = ab + I$.

The ideal-absorption property ensures multiplication is well-defined:
choosing different representatives gives the same coset answer.

This is the *ring-theoretic* analogue of the quotient group.

## First isomorphism theorem (rings)

For any ring homomorphism $\varphi : R \to S$:

$$
R / \ker \varphi \;\cong\; \mathrm{im}\,\varphi.
$$

The kernel of a ring homomorphism is *always an ideal* — and every
ideal is the kernel of some homomorphism.

## Worked examples

| $R/I$ | What it is |
|---|---|
| $\mathbb{Z}/(n)$ | $\mathbb{Z}/n\mathbb{Z}$ — integers modulo $n$ |
| $\mathbb{R}[x]/(x^2 + 1)$ | $\mathbb{C}$ — adjoin a square root of $-1$ |
| $\mathbb{F}_2[x]/(x^2 + x + 1)$ | $\mathbb{F}_4$ — finite field with 4 elements |
| $\mathbb{R}[x, y]/(y - x^2)$ | functions on the parabola $y = x^2$ |

## Adjunction by quotient

The general pattern: to add a "new element" $\alpha$ that satisfies a
polynomial $p(\alpha) = 0$, take

$$
F[x] / (p(x)).
$$

In this quotient, $x + (p)$ is *literally* the new element $\alpha$,
and $p(\alpha) = 0$ holds because $p \in (p)$.

**Theorem**: $F[x] / (p(x))$ is a field iff $p$ is irreducible over $F$.
Otherwise it has zero divisors.

## Interactive

:::widget type=numeric-input prompt="$|\\mathbb{Z}/(12)|$?" answer=12 explain="$12$.":::

:::widget type=numeric-input prompt="$|\\mathbb{F}_2[x]/(x^3 + x + 1)|$ where $x^3 + x + 1$ is irreducible: $2^3 = ?$" answer=8 explain="$8$.":::

:::widget type=numeric-input prompt="$\\mathbb{R}[x]/(x^2 + 1) \\cong \\mathbb{C}$. Type 1." answer=1 explain="Yes — adjoin $i$.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/(4)$ a field? Type 1 yes, 0 no." answer=0 explain="No — $4 = 2 \\cdot 2$, not prime.":::

## Symbolic

**Correspondence theorem**: ideals of $R/I$ correspond to ideals of
$R$ containing $I$.

**Maximal ideals and field quotients**: $R/M$ is a field iff $M$ is
maximal. So to construct fields:

- $\mathbb{Z}/(p)$ for prime $p$ — finite field $\mathbb{F}_p$.
- $F[x]/(p(x))$ for irreducible $p$ — finite-field extension of $F$.

**Chinese remainder theorem (rings)**: if $I + J = R$ (ideals are
coprime), then

$$
R/(IJ) \;\cong\; R/I \times R/J.
$$

For $\mathbb{Z}$: $\mathbb{Z}/(mn) \cong \mathbb{Z}/(m) \times \mathbb{Z}/(n)$
when $\gcd(m, n) = 1$ — the classical CRT.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Z/12Z arithmetic
def add_mod(a, b, n=12): return (a + b) % n
def mul_mod(a, b, n=12): return (a * b) % n
print(mul_mod(7, 9))                  # 3 (since 63 mod 12 = 3)

# F_4 = F_2[x] / (x^2 + x + 1)
def F4_mul(p, q):
    poly = sp.Poly(p * q, x, modulus=2)
    rem = sp.rem(poly, sp.Poly(x**2 + x + 1, x, modulus=2), modulus=2)
    return rem.as_expr()

print(F4_mul(x, x))      # x + 1
print(F4_mul(x + 1, x))  # 1 — so x · (x+1) = 1 in F_4

# Z[x]/(x^2 + 1) = Gaussian integers
def gauss_mul(a1, b1, a2, b2):
    # (a1 + b1*i)(a2 + b2*i) = (a1 a2 - b1 b2) + (a1 b2 + a2 b1) i
    return (a1*a2 - b1*b2, a1*b2 + a2*b1)

print(gauss_mul(2, 3, 1, 4))   # (2-12, 8+3) = (-10, 11) i.e. -10 + 11i
```

## Applied

- **Modular arithmetic everywhere** — every cryptographic computation
  in RSA, ECDSA, AES is in some quotient ring.
- **Reed-Solomon codes** live in $\mathbb{F}_q[x] / (x^n - 1)$ — the
  cyclic-code structure is the quotient structure.
- **Homomorphic encryption** — BFV/BGV/CKKS perform encrypted
  arithmetic in $\mathbb{Z}_q[x] / (\Phi_n(x))$ where $\Phi_n$ is a
  cyclotomic polynomial.
- **Computer algebra systems** — `Polynomial mod p` types use
  quotient-ring arithmetic.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathbb{Z}/(15) \\cong \\mathbb{Z}/(3) \\times \\mathbb{Z}/(5)$ — CRT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$F[x] / (p(x))$ is a field iff $p$ is irreducible. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kernel of a ring homomorphism is an ideal. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$R/M$ field $\\Leftrightarrow$ $M$ maximal. Type 1." answer=1 explain="Yes.":::
