---
strand: structure
level: master
order: 3
title: Schemes — A Glimpse
prerequisites:
  - tier: strand-2-structure-master
    slug: 02-nullstellensatz
    description: Nullstellensatz
connections:
  - strand-2-structure-master/04-sheaves-cohomology
applications:
  - cs: "Algebraic-geometry-based crypto, motivic cohomology"
  - life: "The geometry of *any* ring"
---

# Schemes — A Glimpse

## Mental

Grothendieck's revolutionary idea: **every commutative ring** has
*geometry attached to it*.

For a commutative ring $R$:

- $\mathrm{Spec}(R) = \{$ prime ideals of $R \}$ — the *underlying space*.
- Equipped with **Zariski topology**: closed sets are $V(I) = \{\mathfrak p : I \subseteq \mathfrak p\}$.
- Equipped with a **structure sheaf** $\mathcal O_{\mathrm{Spec} R}$ —
  assigning to each open set a ring of "regular functions."

The pair $(\mathrm{Spec} R, \mathcal O)$ is the **affine scheme**.
General **schemes** glue affine schemes.

## Why so much abstraction?

Scheme theory **unifies**:

- Classical varieties (Lesson 02 NSS).
- Number-theoretic objects ($\mathrm{Spec}(\mathbb{Z})$, prime ideals
  $= 0$ and $(p)$).
- Singular and non-reduced objects (e.g., "double point" $\mathrm{Spec}(k[x]/(x^2))$).
- Functorial constructions: products, fibrations, base changes work
  uniformly.

Wiles's proof of FLT, Faltings's proof of Mordell, perfectoid spaces
— all built on schemes.

## $\mathrm{Spec}(\mathbb{Z})$

The "geometric" picture of integers:

- Points: $(0)$ (the *generic point*) and $(p)$ for each prime $p$.
- Closed points: $(p)$.
- The generic point is in the closure of every $(p)$.

This is **arithmetic geometry**: integers as a 1-dimensional scheme.
Every elliptic curve over $\mathbb{Z}$ is a scheme over $\mathrm{Spec}(\mathbb{Z})$.

## Worked example: $\mathrm{Spec}(\mathbb{C}[x])$

- Closed points: $(x - a)$ for each $a \in \mathbb{C}$ — corresponds
  to the point $a$ on the affine line.
- Generic point: $(0)$ — "lives at" every point.

Topology: closed sets are finite unions of points and the whole
space. The Zariski topology is much coarser than the usual
$\mathbb{C}$-topology.

## Interactive

:::widget type=numeric-input prompt="$\\mathrm{Spec}(\\mathbb{Z})$ has primes $(0), (2), (3), (5), \\ldots$ — countably many. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Spec}(R)$ uses Zariski topology — coarser than usual. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Affine scheme: $(\\mathrm{Spec} R, \\mathcal O_{\\mathrm{Spec} R})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Schemes are glued from affine schemes. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Morphisms of schemes**: continuous maps respecting structure
sheaves. The category of schemes is large but tractable.

**Functor of points**: $X(R) = \mathrm{Hom}(\mathrm{Spec}\,R, X)$
— "points of $X$ with values in $R$." Allows treating schemes as
*functors* from rings to sets, often more concrete.

**Étale topology**: a finer Grothendieck topology than Zariski; gives
**étale cohomology** capturing "topological" information of schemes
even over arbitrary fields.

**Base change**: take a scheme $X$ over $\mathbb{Z}$ and tensor with
$\mathbb{F}_p$ to get its mod-$p$ reduction $X_{\mathbb{F}_p}$.
Foundation of arithmetic geometry.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Conceptual: prime ideals of Z[x]
# - (0) - generic point
# - (p) for each prime p
# - (f(x)) for irreducible f
# - (p, f(x)) for prime p, irreducible f mod p
# - maximal ideals: e.g. (p, q(x)) where q is irreducible mod p

# Compute primes of small rings:
def prime_ideals_Zn(n):
    # Z/n has prime ideals corresponding to divisors that are prime in Z
    from sympy import primerange, factorint
    return [p for p in primerange(2, n + 1) if n % p == 0]

print(prime_ideals_Zn(12))               # [2, 3]
# So Spec(Z/12) has 2 closed points

# Closed points of Spec(F_p[x]) — irreducible polynomials over F_p
def irreducible_polynomials_F_p(p, max_degree=3):
    polys = []
    # Linear factors x - a
    for a in range(p):
        polys.append(("linear", a))
    # Quadratic via discriminant test (for small p)
    return polys

print(irreducible_polynomials_F_p(2)[:5])
```

## Applied

- **Arithmetic geometry** — every modern theorem in number theory
  uses scheme-theoretic language.
- **Cryptography over schemes** — pairing-friendly elliptic curves are
  studied as schemes over $\mathbb{Z}$ or $\mathbb{Z}_p$.
- **Algebraic statistics** — statistical models as schemes; identifiability
  via ideal/scheme tests.
- **Mirror symmetry / mathematical physics** — Calabi-Yau manifolds
  studied as schemes over $\mathbb{C}$.
- **Topological data analysis at scale** — schemes provide foundational
  language for persistent homology with parameters.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathrm{Spec}$ converts a ring to a topological space. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Spec}(\\mathbb{Z})$ closed points = primes; generic point = (0). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Schemes generalise classical varieties. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Functor of points: $X(R) = \\mathrm{Hom}(\\mathrm{Spec} R, X)$. Type 1." answer=1 explain="Yes.":::
