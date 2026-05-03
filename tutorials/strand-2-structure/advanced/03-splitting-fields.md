---
strand: structure
level: advanced
order: 3
title: Splitting Fields
prerequisites:
  - tier: strand-2-structure-advanced
    slug: 02-pid-and-ufd
    description: PIDs and UFDs
connections:
  - strand-2-structure-advanced/04-galois-groups
applications:
  - cs: "Constructing finite fields, classical-cipher analysis"
  - life: "The smallest field where a polynomial fully factors"
---

# Splitting Fields

## Mental

Given $f(x) \in F[x]$, the **splitting field** of $f$ over $F$ is the
smallest extension $K \supseteq F$ in which $f$ factors completely
into linear pieces.

Existence: build $K$ by repeatedly adjoining roots. If $f$ has
irreducible factor $g$ of degree $> 1$, form $F[x]/(g)$ to gain a root,
then iterate.

Uniqueness: any two splitting fields of $f$ over $F$ are isomorphic.

## Worked example: $x^3 - 2$ over $\mathbb{Q}$

Roots: $\sqrt[3]{2}, \omega \sqrt[3]{2}, \omega^2 \sqrt[3]{2}$ where
$\omega = e^{2\pi i / 3}$.

$\mathbb{Q}(\sqrt[3]{2})$ contains only the *real* root.

The splitting field is $\mathbb{Q}(\sqrt[3]{2}, \omega)$, of degree 6
over $\mathbb{Q}$:

- $[\mathbb{Q}(\sqrt[3]{2}) : \mathbb{Q}] = 3$ (minimal poly $x^3 - 2$).
- $[\mathbb{Q}(\sqrt[3]{2}, \omega) : \mathbb{Q}(\sqrt[3]{2})] = 2$
  (minimal poly of $\omega$ over the reals: $x^2 + x + 1$).
- Tower: $6$.

## Algebraic closure

The **algebraic closure** $\bar F$ of $F$ is an extension in which
**every** non-constant polynomial in $F[x]$ has a root.

- $\bar{\mathbb{Q}}$ — algebraic numbers (roots of polynomials with
  rational coefficients).
- $\bar{\mathbb{F}_p}$ — exists, infinite-dimensional over $\mathbb{F}_p$.
- $\overline{\mathbb{R}} = \mathbb{C}$ — by the **fundamental theorem of
  algebra**.

## Finite fields revisited

For each prime $p$ and $n \ge 1$, there's a *unique* (up to isomorphism)
field $\mathbb{F}_{p^n}$ with $p^n$ elements: it's the splitting field
of $x^{p^n} - x$ over $\mathbb{F}_p$.

Equivalently, $\mathbb{F}_{p^n} = \mathbb{F}_p[x]/(g(x))$ for any
irreducible $g$ of degree $n$. Different choices give the same
field up to isomorphism.

**Frobenius automorphism**: the map $\phi : x \mapsto x^p$ is a
field automorphism of $\mathbb{F}_{p^n}$ generating its (cyclic)
Galois group over $\mathbb{F}_p$.

## Interactive

:::widget type=numeric-input prompt="Splitting field of $x^2 - 2$ over $\\mathbb{Q}$ has degree?" answer=2 explain="$\\mathbb{Q}(\\sqrt 2)$, degree 2.":::

:::widget type=numeric-input prompt="Splitting field of $x^4 - 1$ over $\\mathbb{Q}$ contains the 4th roots of unity. Degree over $\\mathbb{Q}$ of $\\mathbb{Q}(i)$?" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$|\\mathbb{F}_{16}| = ?$" answer=16 explain="$16$.":::

:::widget type=numeric-input prompt="Splitting field of $x^3 - 2$ over $\\mathbb{Q}$: degree?" answer=6 explain="$6$.":::

## Symbolic

**Separable polynomial**: distinct roots in any extension. Over a
field of characteristic 0 (like $\mathbb{Q}$), every irreducible is
separable.

**Galois extension** $K/F$: a separable splitting field of some
polynomial. Equivalent: $|\mathrm{Gal}(K/F)| = [K : F]$.

**Galois group** $\mathrm{Gal}(K/F)$ — automorphisms of $K$ that fix
$F$. Captures *which roots can be permuted by symmetry*.

For $\mathbb{Q}(\sqrt[3]{2}, \omega)/\mathbb{Q}$: Galois group is $S_3$
— it permutes the three cube roots of 2 freely.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Roots of x^3 - 2 over Q
print(sp.solve(x**3 - 2, x))        # [2^(1/3), -2^(1/3)/2 - sqrt(3)*I*2^(1/3)/2, ...]
print(sp.minimal_polynomial(2**sp.Rational(1, 3) + sp.exp(2*sp.pi*sp.I/3) * 2**sp.Rational(1,3), x))

# Construct F_8 as F_2[x] / (x^3 + x + 1)
# Verify x^3 + x + 1 is irreducible over F_2
poly = sp.Poly(x**3 + x + 1, x, modulus=2)
print(poly.factor_list())            # ((1, [(x^3 + x + 1, 1)])) — irreducible

# In F_8, every nonzero element is a power of x mod (x^3 + x + 1)
# Frobenius x -> x^2 generates Gal(F_8 / F_2)
def frobenius(p):
    return sp.expand(p**2)

# Apply Frobenius once
phi_x = sp.Poly(frobenius(x), x, modulus=2).rem(sp.Poly(x**3 + x + 1, x, modulus=2))
print(phi_x.as_expr())                 # x^2
phi2_x = sp.Poly(frobenius(phi_x.as_expr()), x, modulus=2).rem(sp.Poly(x**3 + x + 1, x, modulus=2))
print(phi2_x.as_expr())                # x^4 mod ... = x^2 + x
```

## Applied

- **Discrete-logarithm cryptography in $\mathbb{F}_{2^n}^*$** — pre-NIST
  curves.
- **AES** in $\mathbb{F}_{256}$ — explicitly the splitting field of
  $x^{256} - x$ over $\mathbb{F}_2$.
- **Reed-Solomon decoding** algorithms (Berlekamp, Sudan-Guruswami)
  factor polynomials over splitting fields.
- **Computer algebra** — factor polynomials over $\bar{\mathbb{Q}}$ via
  algebraic-number arithmetic.
- **Quantum factoring** — Shor's algorithm relies on cyclic structure
  of $(\mathbb{Z}/N)^*$ which is multiplicative group of an
  appropriate splitting field.

## Check Your Understanding

:::widget type=numeric-input prompt="Splitting field of $x^2 + 1$ over $\\mathbb{R}$: degree?" answer=2 explain="$\\mathbb{C}$, degree 2.":::

:::widget type=numeric-input prompt="$|\\mathbb{F}_{p^n}| = p^n$ exists for every prime $p$ and $n \\ge 1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="The Frobenius $x \\mapsto x^p$ is a field automorphism of $\\mathbb{F}_{p^n}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Algebraic closure of $\\mathbb{R}$: $\\mathbb{C}$. Type 1." answer=1 explain="Yes — fundamental theorem of algebra.":::
