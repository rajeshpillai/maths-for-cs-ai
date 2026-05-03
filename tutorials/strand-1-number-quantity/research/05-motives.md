---
strand: number-quantity
level: research
order: 5
title: Motives — A Glimpse
prerequisites:
  - tier: strand-1-number-quantity-research
    slug: 04-geometric-langlands-glimpse
    description: Geometric Langlands glimpse
connections:
  - strand-1-number-quantity-research/06-deep-l-functions
applications:
  - cs: "Foundational research; influences cohomology choices"
  - life: "What ALL cohomology theories see in common"
---

# Motives — A Glimpse

## Mental

Different cohomology theories (singular, de Rham, étale, crystalline,
Hodge) give different invariants of a variety, but agree on
*essential* arithmetic data.

Grothendieck's **motives** (1960s): a hypothetical universal
cohomology theory $H$ such that every "good" cohomology factors
through $H$.

For each smooth projective variety $X$, get a motive $h(X)$. All
known cohomology theories are *realisations* of motives.

## Realisations

| Realisation | Functor |
|---|---|
| Singular | $h(X) \to H^*(X(\mathbb C), \mathbb Q)$ |
| de Rham | $h(X) \to H^*_{\rm dR}(X)$ |
| Étale | $h(X) \to H^*_{\rm \acute et}(X, \mathbb Q_\ell)$ |
| Crystalline (char $p$) | $h(X) \to H^*_{\rm cris}(X)$ |

Hodge / period structures, Galois actions, Frobenius — all
realisations of universal motivic data.

## Status

The full theory of motives requires *standard conjectures*
(Grothendieck) — most still open.

**Voevodsky's triangulated motives** (1990s): rigorous construction
of $\mathrm{DM}(\mathbb Q)$ — a derived category of motives.
Foundation of Voevodsky's Fields-medal-winning work on motivic
cohomology.

## Motivic L-functions

Each motive $M$ has a conjectural **motivic L-function** $L(M, s)$:
a single Euler product unifying:

- Riemann zeta (motive of a point).
- Dirichlet L (motive of $\mathrm{Spec} \mathbb Z$ with character).
- L of an elliptic curve (motive $h^1(E)$).
- General automorphic L's.

**Bloch-Kato conjecture**: relates special values of motivic
L-functions to motivic cohomology — deep generalisation of BSD.

## Interactive

:::widget type=numeric-input prompt="Motives: hypothetical universal cohomology. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Voevodsky's $\\mathrm{DM}(\\mathbb Q)$ is a triangulated category of motives. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Motivic L-functions unify zeta, Dirichlet, elliptic-curve L. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bloch-Kato is BSD-style for motives. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Numerical motives**: rational equivalence on cycles modulo
numerical equivalence. **Mukai-Bloch**, **Murre's conjectures**
about motivic decomposition.

**Mixed motives**: extend to non-projective varieties; tied to
algebraic K-theory via Beilinson-Soulé conjecture.

**Periods of motives**: numerical values $\int_\gamma \omega$
(period integrals) classified by motivic ideas. **Kontsevich-Zagier
period conjecture**: every period algebra relation comes from motives.

**Motivic Galois group**: Tannakian formalism gives a "motivic
Galois group" $G_{\rm mot}$ — vast generalisation of $\mathrm{Gal}(\bar{\mathbb Q}/\mathbb Q)$.

## Computational

```python
# Motives are mostly conceptual; periods are concrete numbers
import math, mpmath

# Period of an elliptic curve y^2 = x^3 - x
# Real period Ω = 2 * ∫_{e_2}^{e_3} dx / sqrt(x^3 - x)
# For curve y^2 = x^3 - x: roots at -1, 0, 1
# Period via incomplete elliptic integral
mpmath.mp.dps = 30
omega = 2 * mpmath.quad(
    lambda x: 1 / mpmath.sqrt(-(x*(x-1)*(x+1))),
    [0, 1]
)
print(f"Real period Ω of y² = x³ - x: {omega}")

# Periods of higher-dimensional motives: lots of motivic identities
# π = motivic period of P^1
# log 2, ζ(3), etc., are all motivic periods

# Kontsevich-Zagier conjecture: motivic periods satisfy
# only "motivic" relations
```

## Applied

- **Number theory** — motivic L-functions central to Langlands.
- **Periods and transcendence** — Kontsevich-Zagier connects to
  irrationality / transcendence of $\zeta(2k+1)$, etc.
- **Algebraic K-theory** — motivic cohomology = K-theory's "geometric"
  invariant.
- **Physics** — periods of mirror Calabi-Yau geometries appear in
  string-theory amplitudes.
- **Diophantine geometry** — Bloch-Kato implies BSD for elliptic
  curves; motivic methods drive much progress.

## Check Your Understanding

:::widget type=numeric-input prompt="Motives unify cohomology theories. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Voevodsky constructed $\\mathrm{DM}(\\mathbb Q)$ rigorously. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Motivic L-functions generalise zeta. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Periods like $\\pi$ and $\\zeta(3)$ are motivic periods. Type 1." answer=1 explain="Yes.":::
