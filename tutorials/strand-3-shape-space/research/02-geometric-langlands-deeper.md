---
strand: shape-space
level: research
order: 2
title: Geometric Langlands — Deeper
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 01-fukaya-categories
    description: Fukaya categories
connections:
  - strand-3-shape-space-research/03-non-abelian-hodge
applications:
  - cs: "Function-field crypto; mathematical physics"
  - life: "Geometric Langlands as a derived equivalence"
---

# Geometric Langlands — Deeper

## Explain Like I Am 7

Pretend two giant libraries on opposite sides of a city secretly
share the same books, but each library *labels* them by totally
different rules.  A book about "loops on a doughnut" in one library
matches a book about "wave patterns" in the other.  **Geometric
Langlands** is the master dictionary that says exactly which book
in library A is the twin of which book in library B.  It's one of
the deepest bridges in math, tying geometry, algebra, and physics
into a single conversation.

## Mental

Strand 1 Research Lesson 04 introduced **geometric Langlands** for
$G$-bundles on a curve $C / \mathbb F_q$. Going deeper:

**Geometric Langlands conjecture** (Beilinson-Drinfeld): a derived
equivalence

$$
D^b(\mathrm{D}\text{-mod}(\mathrm{Bun}_G(C))) \simeq D^b(\mathrm{QCoh}(\mathrm{LocSys}_{\check G}(C))),
$$

where:

- **$\mathrm{Bun}_G(C)$**: moduli of $G$-bundles on $C$.
- **$\mathrm{LocSys}_{\check G}(C)$**: moduli of $\check G$-local
  systems ($\check G$ = Langlands dual of $G$).

Spectral side ↔ automorphic side.

## Status

- **Function fields over finite fields**: classical Langlands;
  proven via Lafforgue (Strand 1 Research Lesson 04).
- **Geometric over $\mathbb C$**: vast progress; depends on
  $G$. For $\mathrm{GL}_n$, Frenkel-Gaitsgory-Vilonen formulated
  rigorously.
- **Quantum geometric Langlands**: $q$-deformation, conjectured
  equivalence as $q \to 1$ recovers classical.

## Kapustin-Witten

**Kapustin-Witten 2007**: gauge-theoretic interpretation. Geometric
Langlands as 4-dim topological gauge theory.

- $S^1$-reduction gives a 3d Chern-Simons theory.
- Mirror symmetry of Hitchin moduli spaces realises the geometric
  Langlands equivalence.

This is *the* most spectacular link between mathematics and physics
in the modern Langlands program.

## Worked example: $G = \mathrm{GL}_1$

For $G = \mathrm{GL}_1$:

- $\mathrm{Bun}_{\mathrm{GL}_1}(C) = $ Picard variety $\mathrm{Pic}(C)$.
- $\mathrm{LocSys}_{\mathrm{GL}_1}(C) = $ characters of $\pi_1$.

Geometric Langlands here = **Fourier-Mukai transform** between
derived categories.

Generalises $\mathrm{GL}_1$ ↔ duality of $\mathbb Z/p$-class
field theory.

## Interactive

:::widget type=numeric-input prompt="Geometric Langlands: derived equivalence on Bun_G ↔ LocSys_{Ǧ}. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kapustin-Witten 2007 gauge-theoretic interpretation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GL_1 case = Fourier-Mukai transform. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantum geometric Langlands as $q$-deformation. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hitchin system**: integrable system on $T^* \mathrm{Bun}_G$.
Hitchin's spectral curves play role analogous to L-functions.

**Hecke modifications**: local moves on $G$-bundles encoding
Langlands action.

**Eisenstein series geometric**: cohomology classes on $\mathrm{Bun}_G$
with prescribed parabolic behaviour.

**Zhu / Bezrukavnikov / Lurie's $\infty$-categorical reformulation**:
geometric Langlands as an $\infty$-categorical statement.

## Computational

```python
# Geometric Langlands is research-level; concrete computation tiny
# Sketch: Picard variety of an elliptic curve

# Picard^0(E) ≅ E itself (genus 1)
# Pic(E) ≅ Z × E (degree component)

# Fourier-Mukai transform on D^b(E):
# F(L) = Rπ_2*(π_1*L ⊗ P) where P is the Poincaré line bundle
# Self-equivalence (with shift): F²(L) = L[1]

# The geometric Langlands GL_1 case:
# D^b(Pic(E)) ≃ D^b(Pic(E)) via FM transform
# Both sides equivalent under FM ↔ self-equivalence

# Real computation: Magma / SageMath have D-module support
print("Geometric Langlands GL_1 = Fourier-Mukai self-duality of D^b(Pic(E)).")
```

## Applied

- **Function-field number theory** — geometric Langlands gives
  function-field analogues of arithmetic theorems.
- **Mathematical physics** — Kapustin-Witten = relation to gauge
  theory, mirror symmetry of Hitchin moduli.
- **String theory** — geometric Langlands appears in M-theory
  compactifications.
- **Mirror symmetry** — Hitchin moduli and geometric Langlands
  connect via mirror duality.
- **Topological recursion** — Chekhov-Eynard-Orantin recursion
  computes invariants related to spectral curves.

## Check Your Understanding

:::widget type=numeric-input prompt="Geometric Langlands: derived equivalence Bun_G ↔ LocSys_{Ǧ}. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kapustin-Witten realises GL via 4d gauge theory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GL_1 GL = Fourier-Mukai. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hitchin system: integrable on $T^* \\mathrm{Bun}_G$. Type 1." answer=1 explain="Yes.":::
