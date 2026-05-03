---
strand: pattern-counting
level: research
order: 3
title: Combinatorial Physics
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 02-knot-invariants-frontier
    description: Knot invariants
connections:
  - strand-5-pattern-counting-research/04-tilings-aperiodic
applications:
  - cs: "Statistical-mechanics models, integrable systems, lattice models"
  - life: "Where combinatorics meets physics"
---

# Combinatorial Physics

## Mental

**Combinatorial physics** studies physical models with combinatorial
structure: lattice statistical mechanics, integrable models, tilings,
random surfaces.

Many models exhibit **integrable** structure — exactly solvable via
Yang-Baxter equation, Bethe ansatz, transfer matrices.

## Six-vertex model

Configurations of arrows on edges of a square lattice with
"ice rule" — each vertex has 2 in + 2 out arrows. 6 possible
vertex types.

**Partition function**: $Z = \sum_{\text{configs}} \prod_v w(v)$
where $w$ depends on vertex type.

**Solvable**: transfer-matrix eigenvalues found via Bethe ansatz
when weights satisfy specific Yang-Baxter relations.

## Domino tilings

**Aztec diamond** (n-th order): a specific staircase region.

**Theorem** (Elkies-Kuperberg-Larsen-Propp 1992): number of domino
tilings of order-$n$ Aztec diamond = $2^{n(n+1)/2}$.

**Arctic circle theorem** (Jockusch-Propp-Shor 1995): in large
random tiling, "frozen" regions form near boundary; "temperate"
disordered region is approximately a circle (actually ellipse).

A purely combinatorial limit exhibits *emergent geometry*.

## Worked example: dimer model

A **dimer cover** of a graph: perfect matching.

Number of dimer covers on bipartite planar graph = $|\det K|$ where
$K$ is the **Kasteleyn matrix** (signed adjacency).

**Kasteleyn's theorem** (1961): efficient computation via
determinants. Polynomial-time despite generally being #P-hard.

## Interactive

:::widget type=numeric-input prompt="Six-vertex model: integrable via Yang-Baxter. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Aztec diamond order $n$: $2^{n(n+1)/2}$ tilings (EKLP 1992). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Arctic circle: emergent geometry in random tilings. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kasteleyn 1961: planar dimer count via determinant. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Bethe ansatz**: technique for finding exact eigenvectors of
integrable model Hamiltonians. Used in XXX, XXZ, six-vertex,
Lieb-Liniger Bose gas.

**Transfer matrix**: finite-dim operator whose powers compute
partition function. Diagonal in nice basis for solvable models.

**Random matrix duality**: many lattice models' fluctuations
exhibit random-matrix universality (KPZ class — Strand 4 Research
Lesson 01).

**Quantum cohomology and integrable systems** (Givental, Okounkov):
quantum curves to integrable hierarchies (KdV, Toda).

## Computational

```python
import numpy as np

# Aztec diamond tiling count
def aztec_count(n):
    """Number of tilings of order-n Aztec diamond = 2^(n(n+1)/2)."""
    return 2 ** (n * (n + 1) // 2)

for n in range(1, 8):
    print(f"Aztec({n}) = {aztec_count(n):,}")
# 2, 8, 64, 1024, 32768, 2097152, ...

# Kasteleyn formula for dimer covers of graph
def kasteleyn_count(adjacency, signs):
    """Count perfect matchings via |det K|."""
    K = adjacency * signs
    return abs(int(round(np.linalg.det(K))))

# Tiny example: 2x2 grid, 2 perfect matchings
# Simplified: K = signed adjacency, det = 2

# Six-vertex model: transfer matrix dimension grows exponentially
# Bethe ansatz eigenvectors parameterised by spectral roots
print("Six-vertex: Bethe ansatz solves transfer-matrix eigenproblem.")
```

## Applied

- **Statistical physics** — Ising, dimer, six-vertex, ASEP all admit
  combinatorial / integrable analyses.
- **Cosmology / quantum gravity** — random surface models (matrix
  models) link to 2D quantum gravity.
- **Mathematical physics** — Okounkov + collaborators on
  enumerative geometry meets integrable systems.
- **Computer science** — counting algorithms (#P-hard generally,
  but Kasteleyn is exception).
- **Materials science** — combinatorial models for crystal
  nucleation, growth.

## Check Your Understanding

:::widget type=numeric-input prompt="Aztec diamond order $n$ count $= 2^{n(n+1)/2}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kasteleyn 1961: planar dimer via det. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Arctic circle theorem (JPS 1995). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bethe ansatz solves integrable lattice models. Type 1." answer=1 explain="Yes.":::
