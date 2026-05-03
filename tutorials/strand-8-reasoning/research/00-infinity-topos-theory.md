---
strand: reasoning
level: research
order: 0
title: $\infty$-Topos Theory
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 09-reasoning-master-capstone
    description: Reasoning master capstone
connections:
  - strand-8-reasoning-research/01-cohesive-types
applications:
  - cs: "Foundations of HoTT, derived AG; modern logic foundations"
  - life: "Logic generalised to higher categorical universes"
---

# $\infty$-Topos Theory

## Mental

A **topos** (Strand 8 Advanced Lesson 03): generalises Set with
sheaf-style intuition.

An **$\infty$-topos** (Lurie, *Higher Topos Theory* 2009) extends
to $\infty$-categorical sheaves of $\infty$-groupoids.

Internal language: **Homotopy Type Theory** (Strand 8 Master
Lesson 01) interpretable in any $\infty$-topos.

## Examples

| $\infty$-topos | Internal logic |
|---|---|
| $\mathcal S$ — $\infty$-groupoids | classical HoTT |
| $\mathrm{Sh}_\infty(X)$ — $\infty$-sheaves on space | varying HoTT |
| $\mathrm{PSh}_\infty(C)$ — $\infty$-presheaves on category | extended HoTT |
| Effective $\infty$-topos | computational HoTT |

## Topology in $\infty$-topoi

Each $\infty$-topos has internal **homotopy types**, **truncation**,
**modality** structures. Generalises classical topos's logical
internal structure.

**Étale $\infty$-topoi**: enable derived algebraic geometry
(Strand 2 Research Lesson 01).

## Cohesive $\infty$-topoi

A **cohesive $\infty$-topos** has additional adjoint-functor
structure capturing geometric "cohesion" (smoothness, continuity,
locality).

**Schreiber's program**: cohesive $\infty$-topos formalisations of:

- Smooth manifolds + their generalisations.
- Synthetic differential geometry.
- Gauge theory and physics.

## Interactive

:::widget type=numeric-input prompt="$\\infty$-topos: $\\infty$-categorical sheaves. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HoTT internal logic of $\\infty$-toposes. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lurie HTT 2009 foundational. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cohesive $\\infty$-topos: extra adjoint structure. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Geometric morphisms**: morphisms of $\infty$-topoi; analogue of
continuous map between topological spaces.

**Goodwillie calculus**: Taylor-expansion-style approximations of
$\infty$-functors. Used in chromatic homotopy theory.

**Universal $\infty$-topos** $\mathcal S$: free on a point. Lives
inside any $\infty$-topos.

**Spectra and stable $\infty$-categories**: $\infty$-categorical
generalisation of abelian groups; foundation of stable homotopy
theory.

## Computational

```python
# ∞-topos theory is highly abstract; concrete computation rare
# Sketch: hierarchy of categories

class CategoricalHierarchy:
    """Schematic representation."""
    def __init__(self):
        self.levels = {
            "Set": "ordinary category of sets",
            "Cat": "category of categories (1-Cat)",
            "(∞, 1)-Cat": "∞-category of (∞, 1)-categories",
            "∞-Topos": "∞-topos = sheaves of ∞-groupoids",
            "Cohesive ∞-Topos": "with extra adjoint structure",
        }

    def display(self):
        for k, v in self.levels.items():
            print(f"  {k}: {v}")

CategoricalHierarchy().display()
print()
print("∞-toposes computed via simplicial sets (quasi-categories) in formalisations.")
print("Lean's mathlib + Cubical Agda explore HoTT-style internal logic.")
```

## Applied

- **Foundations of mathematics** — $\infty$-topos as alternative
  foundation.
- **Derived algebraic geometry** — $\infty$-toposes natural setting.
- **Synthetic mathematics** — physics + analysis done synthetically
  in cohesive $\infty$-topos.
- **HoTT formalisation** — Cubical Agda, Coq HoTT library.
- **Mathematical physics** — string theory and supergravity in
  cohesive $\infty$-topos formulation.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\infty$-topos extends topos to $\\infty$-categorical setting. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Internal logic of $\\infty$-topos = HoTT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cohesive $\\infty$-topos for synthetic geometry. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lurie HTT 2009 the foundational text. Type 1." answer=1 explain="Yes.":::
