---
strand: structure
level: research
order: 2
title: Condensed Mathematics
prerequisites:
  - tier: strand-2-structure-research
    slug: 01-derived-algebraic-geometry
    description: Derived algebraic geometry
connections:
  - strand-2-structure-research/03-operads
applications:
  - cs: "Foundations of derived analytic geometry"
  - life: "A category-theoretic replacement for topological spaces"
---

# Condensed Mathematics

## Explain Like I Am 7

Topology — the math of stretchy, glue-able shapes — turns out to play
*badly* with the algebra of vector-arrows: combining the two languages
keeps producing broken sentences.  Clausen and Scholze had a wild
fix: replace the idea of a "shape" with a more flexible bookkeeping
device called a **condensed set**, where every shape is reconstructed
from its cluster of tiny disconnected fragments.  In this new world,
the algebra and the topology finally hold hands without arguing —
unlocking decades-stuck problems in analysis and arithmetic geometry.

## Mental

**Condensed mathematics** (Clausen-Scholze, ~2018) replaces
topological spaces by **condensed sets** — sheaves on a category of
profinite (compact-Hausdorff totally disconnected) spaces.

Why? Topological vector spaces and their derived categories don't
behave well: $\mathrm{Vec}_{\rm top}$ isn't an abelian category, and
many derived constructions break.

Condensed: replace $\mathrm{Top}$ by $\mathrm{Cond}$ — get a topos
where derived analysis works cleanly.

## Solid and liquid modules

- **Solid modules** $\mathrm{Solid}$: condensed analogue of finitely
  generated modules; well-behaved derived category.
- **Liquid modules**: a more delicate variant designed to handle
  non-Archimedean / $p$-adic analytic geometry.

The **Liquid Tensor Experiment** (Scholze 2020): challenge to verify
a key technical result on liquid modules in a proof assistant.

**Status (2022)**: completed in Lean by Adam Topaz, Johan Commelin,
and contributors — major milestone in formalised mathematics.

## Why this matters

- **Foundations of analytic geometry** rebuilt on solid foundations.
- **$p$-adic Hodge theory** extends naturally.
- **Derived analytic stacks** become well-behaved.
- **Bridges classical and $p$-adic worlds** structurally.

## Worked example: condensed abelian groups

A **condensed abelian group** is a sheaf on profinite sets, valued in
abelian groups. Includes:

- Discrete abelian groups.
- Profinite abelian groups (e.g., $\hat{\mathbb Z}$).
- Topological abelian groups (e.g., $\mathbb R$, $\mathbb Q_p$).

The category $\mathrm{CondAb}$ is **abelian** with all derived-category
properties — unlike $\mathrm{TopAb}$.

## Interactive

:::widget type=numeric-input prompt="Condensed mathematics: Clausen-Scholze ~2018. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Condensed sets = sheaves on profinite spaces. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liquid Tensor Experiment formalised in Lean (2022). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{CondAb}$ is abelian; $\\mathrm{TopAb}$ is not. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Pyknotic mathematics** (Barwick-Haine): independent but parallel
formulation, slightly different categorical conventions.

**Analytic stacks** in condensed sense: generalisation of analytic
spaces fitting into derived AG framework.

**Six-functor formalism**: $f^*, f_*, f_!, f^!, \otimes, \mathrm{Hom}$
operations between derived categories. Established for condensed
$p$-adic geometry by Heyer-Mann.

**Anabelian / function-field analogues**: condensed counterparts in
function-field setting.

## Computational

```python
# Condensed mathematics is research; concrete computation is symbolic
# Sketch: profinite sets

# Z_p as a profinite set: inverse limit of Z/p^n
class ProfiniteZ_p:
    def __init__(self, p, depth=10):
        self.p = p
        self.depth = depth
        # Each element is a sequence (a_0, a_1, ..., a_n) with a_{i+1} mod p^i = a_i

    def element(self, *coords):
        return coords[:self.depth]

# Condensed sets are sheaves on the category of such profinite sets
# Concrete computation requires categorical infrastructure
print("Condensed mathematics: theoretical foundations; formalisation in Lean.")
print("See Liquid Tensor Experiment + Clausen-Scholze lecture notes.")
```

## Applied

- **Foundations** — alternative to ZFC for analysis-heavy mathematics.
- **$p$-adic geometry** — natural setting for modern $p$-adic Hodge,
  perfectoid, prismatic cohomology.
- **Mathematical formalisation** — Liquid Tensor Experiment a
  paradigm-shifting demonstration.
- **Derived categories of analytic spaces** — solid technical
  framework.

## Check Your Understanding

:::widget type=numeric-input prompt="Condensed mathematics fixes pathologies of $\\mathrm{Top}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liquid Tensor Experiment formalised in Lean. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Condensed sets are sheaves on profinite spaces. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pyknotic = parallel formulation of similar ideas. Type 1." answer=1 explain="Yes.":::
