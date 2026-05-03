---
strand: structure
level: research
order: 7
title: Perverse Sheaves
prerequisites:
  - tier: strand-2-structure-research
    slug: 06-quantum-groups
    description: Quantum groups
connections:
  - strand-2-structure-research/08-non-commutative-geometry
applications:
  - cs: "Geometric representation theory, Hodge theory, Langlands"
  - life: "Sheaves with self-dual stratified structure"
---

# Perverse Sheaves

## Mental

**Perverse sheaves** (Beilinson-Bernstein-Deligne 1982) — a special
class of complexes of sheaves on a stratified space, behaving better
than arbitrary complexes.

For a stratified variety $X = \bigsqcup S_i$ with strata $S_i$ of
various dimensions:

A perverse sheaf $\mathcal F$ satisfies "support" + "cosupport"
conditions on each stratum, controlling its intersection cohomology.

Naturally a *self-dual* category under Verdier duality.

## Why care?

Perverse sheaves are the right framework for:

- **Intersection cohomology** $IH^*(X)$ — Goresky-MacPherson
  invariant for singular spaces, satisfying Poincaré duality.
- **Decomposition theorem** (BBDG 1982): for proper map
  $f : X \to Y$ between smooth varieties, $Rf_* \mathcal F$ is a
  direct sum of shifts of perverse sheaves. Powerful structural
  result.
- **Geometric representation theory**: Lusztig's character
  formula for finite Chevalley groups uses perverse sheaves on
  flag varieties.

## Worked example: Lefschetz hyperplane theorem

Classical Lefschetz: cohomology of a smooth projective variety
restricted from a hyperplane section.

**Hard Lefschetz** in perverse form: Lefschetz operator $L : IH^k \to IH^{k+2}$
satisfies a strong duality.

Applied to compactified moduli spaces, gives many classical results
in algebraic geometry.

## Interactive

:::widget type=numeric-input prompt="Perverse sheaves: BBD 1982. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Decomposition theorem: $Rf_*$ splits perversely. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Intersection cohomology $IH^*$: Poincaré duality on singular varieties. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lusztig's character formula uses perverse sheaves. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$t$-structure**: perverse sheaves form heart of a $t$-structure on
the derived category of constructible sheaves.

**Hodge module** (Saito): mixed-Hodge analogue of perverse sheaf.
Carries pure / mixed Hodge structure. Foundation of modern Hodge
theory in singular settings.

**Mukai-Bondal**: Fourier-Mukai transforms preserve nice
perverse-sheaf-like data.

**Kashiwara-Malgrange filtration**: characteristic-cycle theory
for D-modules ↔ perverse sheaves (Riemann-Hilbert correspondence).

## Computational

```python
# Perverse sheaves are abstract; concrete computation is rare
# Sketch: stratified space and constructible sheaves

class StratifiedSpace:
    def __init__(self, strata):
        self.strata = strata    # list of (name, dimension)

# Tiny example: P^1 × P^1 stratified by diagonal
X = StratifiedSpace([
    ("open complement", 2),
    ("diagonal", 1),
    ("intersection point", 0)
])

# Perverse sheaf assigns to each stratum: a local system + extensions
# Constructibility: pieces are locally constant on strata
print("Stratification:", X.strata)

# Intersection cohomology IH* of P^1: same as ordinary H* for smooth varieties
# IH^0(P^1) = Q, IH^1 = 0, IH^2 = Q
# For singular varieties, IH gives the right Betti numbers
print("IH*(P^1) = Q, 0, Q")

# Decomposition theorem: structural; verified case-by-case in research papers
# Practical computation requires SageMath / Mathematica with specialized packages
```

## Applied

- **Geometric representation theory** — Kazhdan-Lusztig conjecture
  proven via perverse sheaves on flag varieties.
- **Geometric Langlands** — perverse sheaves on $\mathrm{Bun}_G$ are
  central.
- **Singular-variety topology** — IH* via perverse sheaves.
- **Nearby cycles and monodromy** in singular families of
  varieties.
- **Hodge theory** — mixed Hodge modules; Saito's program.

## Check Your Understanding

:::widget type=numeric-input prompt="Beilinson-Bernstein-Deligne 1982 perverse sheaves. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Decomposition theorem: $Rf_*$ splits as direct sum of perverse shifts. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Intersection cohomology has Poincaré duality even for singulars. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hodge modules (Saito) generalise perverse sheaves with Hodge structure. Type 1." answer=1 explain="Yes.":::
