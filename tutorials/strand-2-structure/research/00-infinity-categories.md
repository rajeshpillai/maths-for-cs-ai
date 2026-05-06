---
strand: structure
level: research
order: 0
title: $\infty$-Categories
prerequisites:
  - tier: strand-2-structure-master
    slug: 09-structure-master-capstone
    description: Structure master capstone
connections:
  - strand-2-structure-research/01-derived-algebraic-geometry
applications:
  - cs: "Foundations of HoTT, derived algebraic geometry"
  - life: "Categories with higher equalities up to all dimensions"
---

# $\infty$-Categories

## Explain Like I Am 7

Picture two LEGO houses that look "the same" — but maybe you'd build
them slightly differently each time.  Are they really equal?  Maybe
the *building processes* are equal.  Or maybe just the *ways of
comparing the building processes* are equal.  $\infty$-categories let
us say "yes, they're connected, but only up to a tower of higher and
higher tweaks-of-tweaks-of-tweaks, all the way up."  It's the natural
home for situations where exact equality is too strong but
"essentially the same shape" is the right idea — and it's where
modern algebraic geometry now lives.

## Mental

Ordinary categories: objects + morphisms + composition.

**$(\infty, 1)$-categories**: add **2-morphisms** between morphisms,
**3-morphisms** between 2-morphisms, ad infinitum. The "1" means
all $k$-morphisms for $k \ge 2$ are *invertible* (homotopy
equivalences).

Captures the idea: "two morphisms aren't equal, but they're related
by a *path*; two paths aren't equal, but related by a *homotopy*; ..."

## Models of $\infty$-categories

| Model | Description |
|---|---|
| Quasi-categories (Joyal) | Simplicial sets satisfying inner-Kan condition |
| Segal spaces (Rezk) | Simplicial spaces |
| Complete Segal spaces | + a completeness condition |
| $\infty$-cats (Lurie's HTT) | Quasi-cat formalism in detail |

Each model captures the "same" theory; equivalences between them
form a (higher!) category.

## Why bother?

In ordinary category theory, "homotopy-coherent" data is awkward.
$\infty$-categories make it natural:

- **Derived functors** = $\infty$-functors.
- **Spectral sequences** = computational tools to extract data.
- **Universal constructions** at every level.

Foundational text: Lurie's *Higher Topos Theory* (2009), $> 1000$
pages.

## Worked example: spaces vs sets

The **homotopy category** of topological spaces (spaces up to
homotopy) has issues — coproducts don't behave well.

The **$\infty$-category of spaces** $\mathcal S$ behaves perfectly:
all limits/colimits exist, behave correctly, characterised
universally as "free $\infty$-category on a point."

## Interactive

:::widget type=numeric-input prompt="$(\\infty, 1)$-category: $k$-morphisms invertible for $k \\ge 2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quasi-categories: simplicial sets with inner-Kan. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lurie's HTT (2009) is the standard reference. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathcal S$: $\\infty$-category of spaces. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$(\infty, n)$-categories**: $k$-morphisms invertible for $k > n$.
Used for *extended* TQFTs (Baez-Dolan, Lurie's cobordism hypothesis).

**Stable $\infty$-categories** (Lurie 2008): $\infty$-categorical
analogue of triangulated categories. Better-behaved.

**Yoneda for $\infty$-categories**: same statement (object determined
by its morphisms in) but interpreted in $\infty$-cat sense.

**Higher topos theory**: $\infty$-categorical generalisation of
topos. Foundation of derived AG and condensed math (next lesson).

## Computational

```python
# ∞-categories are too abstract for direct Python implementation
# Sketch the simplicial-set model

class SimplicialSet:
    def __init__(self):
        self.simplices = {0: set(), 1: set(), 2: set()}      # n -> set of n-simplices
        self.faces = {}     # (n-simplex, i) -> face

    def add_vertex(self, v):
        self.simplices[0].add(v)

    def add_edge(self, name, src, tgt):
        self.simplices[1].add(name)
        self.faces[(name, 0)] = src
        self.faces[(name, 1)] = tgt

# A 2-simplex needs to "compose" two edges
# Inner-Kan condition: any horn in dim 1 of a 2-simplex can be filled
# Tiny example: a "category" with 1 object and an endomorphism
S = SimplicialSet()
S.add_vertex("*")
S.add_edge("f", "*", "*")
print(S.simplices)

# In quasi-cat language:
# - Identity 2-simplex: f ∘ id = f
# - Composition 2-simplex: f ∘ g = h
# - All horns Λ^n_i for 0 < i < n must fill (inner-Kan)

# Real implementations: Kerodon, Lean / Coq formalisations
print("∞-categorical computation: requires specialised systems (Kerodon, mathlib).")
```

## Applied

- **Derived algebraic geometry** — built on stable $\infty$-categories.
- **Homotopy type theory** — types ↔ $\infty$-groupoids.
- **Quantum field theory** — extended TQFTs as $(\infty, n)$-functors.
- **K-theory** — algebraic K-theory naturally lives in $\infty$-cat
  setting.
- **Condensed mathematics** (Clausen-Scholze) — $\infty$-categorical
  topological foundations.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\infty$-categories have higher-morphism towers. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quasi-categories model $(\\infty, 1)$-cats via inner-Kan condition. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stable $\\infty$-categories generalise triangulated. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cobordism hypothesis: $(\\infty, n)$-functor classification of TQFTs. Type 1." answer=1 explain="Yes.":::
