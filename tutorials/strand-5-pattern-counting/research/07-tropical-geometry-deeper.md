---
strand: pattern-counting
level: research
order: 7
title: Tropical Geometry Deeper
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 06-symmetric-functions-frontier
    description: Symmetric functions
connections:
  - strand-5-pattern-counting-research/08-conjectures-frontier
applications:
  - cs: "Phylogenetics, optimisation, mathematical physics"
  - life: "Algebraic geometry over the tropical semiring"
---

# Tropical Geometry Deeper

## Explain Like I Am 7

Earlier we replaced "plus" with "min" and "times" with "plus."
That funny tropical algebra has its own *geometry*: instead of
smooth circles and parabolas, it draws polygons made of straight
edges.  Astonishingly, when you count solutions to certain
tropical-shape puzzles, you get the same answer as counting
solutions of the smooth versions — so a hard *geometric* counting
question becomes a tame combinatorial one.  Tropical geometry is
the bridge that lets you study evolutionary trees and curve
counting with the same dictionary.

## Mental

**Tropical geometry** (Strand 5 Master Lesson 03) studies algebraic
varieties over the tropical semiring $(\mathbb R, \min, +)$ — or the
"max-plus" version.

A **tropical variety** is the limit of classical varieties under
"dequantisation" (logarithmic limit). Combines combinatorics
(piecewise linear) with algebraic geometry.

## Mikhalkin's correspondence theorem

For genus-0 curves in toric surfaces:

$$
\#\{\text{algebraic curves}\} = \#\{\text{tropical curves with multiplicities}\}.
$$

Reduces enumerative-geometry problems to tropical combinatorics.

Mikhalkin's theorem (2005) — bridge between algebraic and tropical
counts.

## Tropical Plücker coordinates

**Tropical Grassmannian** $\mathrm{Gr}^{\rm trop}_{k, n}$: tropical
analogue of Grassmannian. Speyer-Sturmfels (2004): tropicalisation
of Plücker relations gives a polyhedral fan.

Connection to **phylogenetic tree spaces**: Billera-Holmes-Vogtmann
space of phylogenetic trees coincides with tropical Grassmannian
$\mathrm{Gr}^{\rm trop}_{2, n}$.

## Worked example: tropical line

A **tropical line** in $\mathbb R^2$: solution set of
$\min(a + x, b + y, c) = $ achieved by two of the three terms.

This is a "tripod" — three half-rays meeting at a point. Combinatorial
analogue of an algebraic line.

## Interactive

:::widget type=numeric-input prompt="Mikhalkin correspondence: tropical = algebraic curve counts. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical Grassmannian: Speyer-Sturmfels 2004. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Phylogenetic tree space = tropical Grassmannian. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical line: tripod (3 half-rays from 1 point). Type 1." answer=1 explain="Yes.":::

## Symbolic

**Tropical curves and Riemann-Roch**: discrete Riemann-Roch on
tropical curves (Baker-Norine, Gathmann-Kerber). Algorithmically
useful.

**Newton polytopes and tropicalisation**: tropical varieties are
"shadows" of Newton polytopes of defining polynomials.

**Berkovich spaces**: $p$-adic analytic spaces; tropicalisation
provides combinatorial models.

**Logarithmic geometry** (Kato): bridges classical algebraic
geometry and tropical via boundary-divisor data.

## Computational

```python
import numpy as np

# Tropical line: min(a + x, b + y, c) achieved by ≥ 2 terms
def tropical_line_3d(a, b, c, x_range=(-5, 5)):
    """Find points (x, y) on tropical line min(a+x, b+y, c) = ?"""
    # Each pair of terms equal where third is ≥ them
    # (1) a + x = b + y, c ≥ both: y = a - b + x, x ≤ c - a
    # (2) a + x = c, b + y ≥ both: x = c - a, y ≥ b - c + x = b - a
    # (3) b + y = c, a + x ≥ both: y = c - b, x ≥ c - a
    pieces = [
        f"y = {a - b} + x for x ≤ {c - a}",
        f"x = {c - a} for y ≥ {b - a}",
        f"y = {c - b} for x ≥ {c - a}",
    ]
    return pieces

print("Tropical line min(0 + x, 0 + y, 1) pieces:")
for p in tropical_line_3d(0, 0, 1):
    print(f"  {p}")
# Tripod with vertex at (1, 1)

# Tropical Plücker / Grassmannian: polyhedral fan
# Phylogenetic tree space: trees with leaves labelled 1..n
# Number of trees with n leaves: n^(n-2) by Cayley's formula
import math
def cayley_trees(n):
    return n ** (n - 2)

print(f"Cayley: # trees on 5 leaves = {cayley_trees(5)}")
```

## Applied

- **Phylogenetics** — tree-space geometry uses tropical methods.
- **Optimisation** — tropical algebra solves shortest-path /
  scheduling.
- **Mirror symmetry** — Strominger-Yau-Zaslow uses tropical
  geometry to construct mirrors.
- **Statistical learning** — tropical max-affine functions are exactly
  ReLU networks; tropical methods yield learning-theoretic insights.
- **Algebraic vision** — tropical projections in computer vision.

## Check Your Understanding

:::widget type=numeric-input prompt="Tropical line: tripod from one point. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mikhalkin correspondence (2005). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Speyer-Sturmfels tropical Grassmannian = phylogenetic tree space. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ReLU networks are tropical functions. Type 1." answer=1 explain="Yes.":::
