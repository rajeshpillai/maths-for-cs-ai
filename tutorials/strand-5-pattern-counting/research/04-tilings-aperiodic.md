---
strand: pattern-counting
level: research
order: 4
title: Aperiodic Tilings and Quasi-Crystals
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 03-combinatorial-physics
    description: Combinatorial physics
connections:
  - strand-5-pattern-counting-research/05-randomness-extraction
applications:
  - cs: "Aperiodic-tiling-based codes; cellular-automaton models"
  - life: "Order without periodicity"
---

# Aperiodic Tilings and Quasi-Crystals

## Mental

A **tiling** of the plane by congruent copies of finitely many
tiles. **Aperiodic tilings**: no tiling-preserving translation.

For a long time, all known aperiodic tilings used multiple tile shapes.

## Penrose tiling

**Penrose** (1974): a 2-tile aperiodic system (kite + dart, or two
rhombi). 5-fold symmetric local patches; quasi-periodic.

Many aesthetic + mathematical surprises. Foundation for **quasi-
crystals** (Shechtman 1982, Nobel 2011).

## Einstein problem

**The "einstein" problem**: does a *single* tile suffice for
aperiodic tiling?

**Smith-Myers-Kaplan-Goodman-Strauss 2023**: The "**hat**" — a
single 13-sided tile that tiles only aperiodically! 50-year-old
problem solved.

**Spectre / Tile(1, 1)**: improved in 2023 to fully chiral
aperiodic monotile.

## Quasi-crystals

Materials with diffraction patterns showing 5-fold (10-fold) symmetry
— "forbidden" by classical crystallography. **Shechtman 1984**
discovered them in metal alloys; **Nobel Prize 2011**.

Mathematical structure: cut-and-project from higher-dim periodic
lattices. Penrose tiling = projection from $\mathbb Z^5$.

## Worked example: Penrose substitution

Substitution rules: each kite / dart subdivides into smaller kites /
darts. Iterating gives larger patches of Penrose tiling.

Implementations: explicit substitution matrices encode subdivision
behaviour; spectral analysis gives growth rates.

## Interactive

:::widget type=numeric-input prompt="Penrose tiling: aperiodic, 2 tiles, 1974. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hat (SMKGS 2023): single-tile aperiodic monotile. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quasi-crystals: Shechtman 1984, Nobel 2011. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Penrose tiling = projection from $\\mathbb Z^5$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Wang tiles**: square tiles with coloured edges; tiling problem
**undecidable** in general (Berger 1966). Aperiodic Wang tiles
exist.

**Substitution dynamical systems**: hierarchical generation of
tilings with rich dynamical / spectral properties.

**Cohomology of tilings** (Anderson-Putnam, Kellendonk): topological
invariants distinguishing tiling spaces.

**Diffraction spectra**: characterise quasi-crystals through their
Bragg-peak structure; "pure-point spectrum" defines a quasi-crystal.

## Computational

```python
import numpy as np

# Penrose substitution matrix (1+1 model: kites and darts)
# After subdivision: each kite → 2 kites + 1 dart; each dart → 1 kite + 1 dart
# Substitution matrix
M = np.array([[2, 1], [1, 1]], dtype=int)

# Eigenvalues of substitution matrix → growth rate
eigs = np.linalg.eigvals(M)
print(f"Substitution matrix eigenvalues: {sorted(eigs, key=abs, reverse=True)}")
# Top eigenvalue = golden ratio² = (1 + √5)² / 4 = (3 + √5) / 2 ≈ 2.618
print(f"Golden ratio² ≈ {(3 + np.sqrt(5)) / 2:.4f}")

# Wang tile undecidability: domino problem is r.e.-hard
print("Wang tiles: tiling decision is undecidable (Berger 1966).")

# Diffraction pattern of Penrose tiling: 10-fold symmetric Bragg peaks
print("Penrose diffraction: 10-fold symmetric (5-fold + reflection).")
```

## Applied

- **Materials science** — quasi-crystal alloys (Al-Mn discovered by
  Shechtman, now industrial coatings).
- **Architecture / art** — Penrose patterns in tilings, building
  facades.
- **Cellular automata** — aperiodic tilings can simulate Turing
  machines; Wang-tile undecidability.
- **Coding theory** — tilings provide structured codes.
- **Mathematics outreach** — quasi-crystals + Penrose tilings as
  "beautiful aperiodic order" examples.

## Check Your Understanding

:::widget type=numeric-input prompt="Penrose tiling (1974): aperiodic, 2 tiles. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hat tile (SMKGS 2023): aperiodic monotile. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Shechtman quasi-crystals Nobel 2011. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wang tiling problem undecidable (Berger 1966). Type 1." answer=1 explain="Yes.":::
