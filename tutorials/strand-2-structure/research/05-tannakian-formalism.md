---
strand: structure
level: research
order: 5
title: Tannakian Formalism
prerequisites:
  - tier: strand-2-structure-research
    slug: 04-higher-categorical-physics
    description: Higher categorical physics
connections:
  - strand-2-structure-research/06-quantum-groups
applications:
  - cs: "Reconstruct algebraic objects from their representations"
  - life: "Groups recoverable from their representations"
---

# Tannakian Formalism

## Mental

**Tannakian reconstruction**: an algebraic group $G$ can be
*recovered* from its category of finite-dimensional representations
$\mathrm{Rep}(G)$, equipped with extra structure (tensor product +
fiber functor).

Formally: a *neutral Tannakian category* is equivalent to
$\mathrm{Rep}(G)$ for a unique pro-algebraic group $G$.

The fiber functor $\omega : \mathrm{Rep}(G) \to \mathrm{Vec}$ —
"forget the $G$-action" — recovers $G$ as $\mathrm{Aut}^\otimes(\omega)$.

## Why this matters

A *purely categorical* object (the rep category) determines the
group. Two perspectives:

- **Group → categorical** (forward): take reps.
- **Categorical → group** (Tannakian): reconstruct.

In modern arithmetic geometry and motive theory, this lets us
**construct** Galois-style groups from cohomology theories.

## Motivic Galois group

Take "category of motives" with right structure. Tannakian
reconstruction yields a **motivic Galois group** $G_{\rm mot}$ —
profinite generalisation of $\mathrm{Gal}(\bar{\mathbb Q}/\mathbb Q)$
governing all of arithmetic.

Largely conjectural but central to Grothendieck-Voevodsky-Lurie
program.

## Worked example: $\mathrm{Rep}(\mathrm{SL}_2)$

Finite-dim irreps of $\mathrm{SL}_2$: $V_n$ for $n = 0, 1, 2, \ldots$
($V_n$ has dimension $n + 1$).

Tensor decomposition (Clebsch-Gordan):

$$
V_m \otimes V_n = V_{m + n} \oplus V_{m + n - 2} \oplus \ldots \oplus V_{|m - n|}.
$$

Tannakian: from this category + tensor structure, reconstruct
$\mathrm{SL}_2$ — its Lie algebra and group law follow.

## Interactive

:::widget type=numeric-input prompt="Tannakian: $G$ recoverable from $\\mathrm{Rep}(G) + $ fiber functor. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$G = \\mathrm{Aut}^\\otimes(\\omega)$ for fiber functor $\\omega$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Motivic Galois group constructed via Tannakian formalism. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\dim V_n = n + 1$ in $\\mathrm{SL}_2$ irreps. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Pro-finite Tannakian**: reconstruct *profinite* groups (e.g.,
absolute Galois groups) from suitable rep categories.

**Mukai-Roberts**: Tannakian reconstruction works in derived /
$\infty$-categorical settings.

**Tannaka duality** classifies Hopf algebras via their
representation categories.

**Motivic structures**: Voevodsky's mixed motives expected to be
Tannakian; the motivic Galois group $G_{\rm mot}$ would govern
all "cohomological" invariants of varieties.

## Computational

```python
import numpy as np

# SL_2 irreps tensor decomposition
def clebsch_gordan(m, n):
    """V_m ⊗ V_n = V_{m+n} ⊕ V_{m+n-2} ⊕ ... ⊕ V_{|m-n|}."""
    return list(range(abs(m - n), m + n + 1, 2))

print(clebsch_gordan(1, 1))    # [0, 2] — V_1 ⊗ V_1 = V_0 ⊕ V_2
print(clebsch_gordan(2, 2))    # [0, 2, 4]
print(clebsch_gordan(3, 2))    # [1, 3, 5]

# Verify dimensions: dim(V_m ⊗ V_n) = (m+1)(n+1)
m, n = 3, 2
expected = (m + 1) * (n + 1)
got = sum(k + 1 for k in clebsch_gordan(m, n))
print(f"dim check: ({m+1})({n+1}) = {expected}, sum = {got}")

# Tannakian reconstruction recovers SL_2 from this fusion data + fiber functor
# (which sends V_n to underlying vector space C^{n+1}).
print("Tannakian reconstruction: from category + fiber functor → group.")
```

## Applied

- **Motive theory** — motivic Galois group governs all cohomological
  invariants.
- **Number theory** — Tannakian formalism bridges Galois theory and
  rep theory.
- **Mathematical physics** — symmetry groups of QFTs reconstructed
  from particle (rep) categories.
- **Quantum groups** — Tannakian-style: reconstruct quantum group
  from its rep category (next lesson).
- **Categorical foundations** — Tannakian formalism a paradigm of
  categorical reconstruction.

## Check Your Understanding

:::widget type=numeric-input prompt="Tannakian: group reconstructible from rep category. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fiber functor "forget G-action" needed for reconstruction. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Clebsch-Gordan: $V_m \\otimes V_n$ direct sum from $V_{|m-n|}$ to $V_{m+n}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Motivic Galois group: Tannakian construction. Type 1." answer=1 explain="Yes.":::
