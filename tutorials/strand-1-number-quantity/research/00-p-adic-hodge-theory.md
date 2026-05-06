---
strand: number-quantity
level: research
order: 0
title: $p$-adic Hodge Theory
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 09-number-theory-master-capstone
    description: Number theory master capstone
connections:
  - strand-1-number-quantity-research/01-iwasawa-theory
applications:
  - cs: "Background for post-quantum lattice crypto, modular forms"
  - life: "$p$-adic vs complex Hodge structures"
---

# $p$-adic Hodge Theory

## Explain Like I Am 7

Imagine a piece of music that exists in two completely different sheet-
music languages — one for piano, one for harp.  A clever translator
could write a *dictionary* that turns the piano notes into the harp
notes without losing the song.  Hodge theory is just that kind of
dictionary, but for the "songs" hiding inside curved geometric
shapes.  The $p$-adic version uses the strange-distance number system
(where being divisible by lots of $p$s means "very close") to write
its dictionary, and the dictionary pages — Fontaine's period rings —
are the centrepiece of the whole subject.

## Mental

**Hodge theory** classically: a smooth complex projective variety $X$
has cohomology $H^n(X, \mathbb C)$ that decomposes as
$\bigoplus_{p + q = n} H^{p, q}(X)$ — the **Hodge decomposition**.

**$p$-adic Hodge theory** does the analogous classification for
varieties over $p$-adic fields: $H^n_{\rm \acute et}(X_{\bar K}, \mathbb Q_p)$
acquires extra structure via Fontaine's period rings $B_{\rm dR},
B_{\rm cris}, B_{\rm st}$.

## Period rings

Fontaine constructed several rings:

- $B_{\rm HT} = \bigoplus \mathbb C_p \cdot t^i$ — Hodge-Tate periods.
- $B_{\rm dR}$ — de Rham periods (a complete discrete-valuation field).
- $B_{\rm cris}$ — crystalline periods (further structure including
  Frobenius).
- $B_{\rm st}$ — semistable periods.

Tensoring the $p$-adic étale cohomology by these rings recovers
algebraic / de Rham / crystalline data of $X$.

**Comparison theorem** (Faltings, Tsuji, Niziol): for proper smooth $X$
over $\mathbb Q_p$,

$$
H^n_{\rm \acute et}(X_{\bar K}, \mathbb Q_p) \otimes B_{\rm dR} \cong H^n_{\rm dR}(X) \otimes B_{\rm dR}.
$$

A $p$-adic analogue of the classical Hodge decomposition.

## Fontaine-Mazur conjecture

Posits which $p$-adic Galois representations come from algebraic
geometry. Partial results (Kisin, Pan-Tilouine) drive much modern
arithmetic geometry.

## Interactive

:::widget type=numeric-input prompt="Classical Hodge decomposition: $H^n = \\oplus H^{p, q}$ with $p + q = n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$p$-adic Hodge theory replaces $\\mathbb C$ with $p$-adic period rings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fontaine's period rings include $B_{\\rm dR}$ and $B_{\\rm cris}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fontaine-Mazur: characterise $p$-adic Galois reps from geometry. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$\varphi$-modules** and **$(\varphi, \Gamma)$-modules** (Fontaine):
algebraic structure equivalent to certain $p$-adic Galois reps. Allow
explicit computation.

**Perfectoid spaces** (Scholze, Fields medal 2018): a
geometric framework that *unifies* characteristic-$p$ and
characteristic-0 $p$-adic geometry. Profound impact on $p$-adic
Hodge theory and Langlands.

**Prismatic cohomology** (Bhatt-Scholze): unifies de Rham, crystalline,
étale cohomologies via prisms. Active research area.

## Computational

```python
# p-adic Hodge theory is research math; concrete computations are limited
# Sketch: p-adic numbers via SageMath / mpmath

# p-adic integer arithmetic
from sympy import Symbol, series, expand

# 1/(1 - p) = 1 + p + p^2 + ... in Z_p
p = Symbol("p")
geom = 1 + p + p**2 + p**3 + p**4
print(f"Z_p geometric series: 1/(1 - p) ≈ {geom}")

# Hodge decomposition of P^1: H^0 = C, H^1 = 0, H^2 = C
# H^{p, q} for P^1: only (0, 0) and (1, 1) nonzero.
print("Hodge structure of P^1: H^{0,0} ⊕ H^{1,1}")

# Period ring B_dR is huge; concrete Frobenius examples
# require sophisticated computer-algebra (SageMath, PARI)
print("p-adic Hodge: needs SageMath / Magma for concrete computation")
```

## Applied

- **Modularity / Langlands progress** — $p$-adic Hodge theory is
  central to modern modularity proofs (Wiles, Taylor-Wiles,
  Khare-Wintenberger, Pan).
- **Iwasawa main conjectures** — proved using $p$-adic Hodge ideas.
- **Cryptography of $p$-adic L-values** — Iwasawa-style invariants
  inform analytic number theory underlying advanced crypto.
- **Computer-algebra** — modern SageMath / Magma implement period
  computations for elliptic curves.

## Check Your Understanding

:::widget type=numeric-input prompt="Hodge decomposition: $H^n(X, \\mathbb C) = \\oplus H^{p, q}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fontaine period rings: $B_{\\rm dR}, B_{\\rm cris}, B_{\\rm st}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Perfectoid spaces (Scholze) underlie modern $p$-adic geometry. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Prismatic cohomology unifies de Rham, crystalline, étale. Type 1." answer=1 explain="Yes.":::
