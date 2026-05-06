---
strand: structure
level: research
order: 4
title: Higher Categorical Physics
prerequisites:
  - tier: strand-2-structure-research
    slug: 03-operads
    description: Operads
connections:
  - strand-2-structure-research/05-tannakian-formalism
applications:
  - cs: "Topological-quantum codes, condensed-matter classification"
  - life: "Where category theory meets fundamental physics"
---

# Higher Categorical Physics

## Explain Like I Am 7

Imagine the universe as a giant interactive board game.  Particles
are pieces; their interactions are arrows between pieces; the
*processes* changing those interactions over time are arrows-between-
arrows.  Modern physicists discovered the right way to write down the
rules of such a multi-layered game is with **higher categories**,
which keep track of arrows of every level at once.  Topological
quantum field theory, anyon braiding, even the cobordism hypothesis
are all part of this giant game-rule book — written in the language of
higher arrows instead of equations.

## Mental

Modern theoretical physics increasingly uses **higher categorical
algebra**:

- **TQFTs** (topological quantum field theories) — symmetric monoidal
  functors on cobordism categories.
- **Extended TQFTs** — $(\infty, n)$-functors capturing
  multidimensional locality.
- **Cobordism hypothesis** (Lurie 2008): extended $n$-dim TQFTs
  classified by their value on a point — a *fully dualisable* object
  in target $(\infty, n)$-category.

## Cobordism hypothesis

For an $(\infty, n)$-category $\mathcal C$ with duals (fully
dualisable objects), $n$-dim extended TQFTs valued in $\mathcal C$
are equivalent to fully dualisable objects of $\mathcal C$.

A *vast classification result* connecting topology / physics /
higher algebra.

## Topological phases of matter

**Symmetry-protected topological (SPT) phases**: classified by
generalised cohomology theories. Higher-category language is
natural.

**Topological order** (Wen): lattice models with anyonic excitations
classified by **modular tensor categories** — $(\infty, 2)$-categorical
objects.

**Conformal field theory (CFT)**: vertex operator algebras with
modular invariance properties; deeply categorical.

## Worked example: Chern-Simons theory

**Chern-Simons theory** (CS): 3-dim TQFT defined by a Lie group $G$
and level $k$.

- 3-manifold invariant: a number / vector space.
- 2-manifold ($S^2$): vector space (Hilbert space of CS on $S^2$).
- 1-manifold (circle): a *category* (representations of quantum group $U_q(\mathfrak g)$).
- 0-manifold (point): a *2-category*.

Tower of structures = extended TQFT. Witten won the **Fields medal
(1990)** partly for showing CS computes the **Jones polynomial** of
links.

## Interactive

:::widget type=numeric-input prompt="TQFT = symmetric monoidal functor on cobordism. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cobordism hypothesis: TQFT classified by value on point. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Topological phases by modular tensor categories. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Witten Fields medal 1990 — Chern-Simons / Jones polynomial. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Stolz-Teichner program**: connect cobordism categories with
generalised cohomology theories (K-theory, TMF) — partial
realisation of cobordism hypothesis predictions.

**Higher gauge theory**: gauge theory with $n$-form connections;
naturally $(\infty, n)$-categorical.

**Holographic principle**: AdS/CFT correspondence connects
gravity in bulk to CFT on boundary; higher-categorical structure
appears.

**Categorification**: replace numbers by vector spaces, vector
spaces by categories, etc. Khovanov homology of knots is
categorification of Jones polynomial.

## Computational

```python
# Higher-categorical physics is research; sketch of categorical patterns

# Modular tensor category data: simple objects, fusion rules, F-symbols, R-symbols
class FusionRule:
    def __init__(self, objects, table):
        self.objects = objects
        # table[a][b] = list of c (with multiplicity) appearing in a ⊗ b
        self.table = table

# Tiny example: Z/2 fusion (Ising-like)
# Objects: 1, σ, ψ
# Fusion: σ ⊗ σ = 1 + ψ
fusion = FusionRule(
    objects=["1", "σ", "ψ"],
    table={
        "1": {"1": ["1"], "σ": ["σ"], "ψ": ["ψ"]},
        "σ": {"1": ["σ"], "σ": ["1", "ψ"], "ψ": ["σ"]},
        "ψ": {"1": ["ψ"], "σ": ["σ"], "ψ": ["1"]},
    }
)
print(f"σ ⊗ σ = {fusion.table['σ']['σ']}")

# Modular tensor categories model anyon systems
# Topological-quantum-computation operations correspond to braiding diagrams
print("MTCs underlie topological QC: braid → unitary on anyon Hilbert space.")
```

## Applied

- **Topological-quantum codes** — anyonic phases give fault-
  tolerant quantum computation (Kitaev's surface code, fibonacci
  anyons).
- **Condensed-matter classification** — gapped phases classified by
  cohomology / categorical data.
- **String theory** — higher-categorical gauge theory, M-theory,
  topological strings.
- **Mirror symmetry** — Fukaya categories ($\mathcal A_\infty$)
  on symplectic side, derived categories on complex side.
- **Quantum information** — categorical foundations (Coecke-
  Abramsky).

## Check Your Understanding

:::widget type=numeric-input prompt="Cobordism hypothesis: classify TQFTs by value on point. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Modular tensor categories classify anyon systems. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Witten 1990 Fields medal partly for CS / Jones. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Khovanov homology categorifies Jones polynomial. Type 1." answer=1 explain="Yes.":::
