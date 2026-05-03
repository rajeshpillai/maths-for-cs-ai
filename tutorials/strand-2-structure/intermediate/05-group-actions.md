---
strand: structure
level: intermediate
order: 5
title: Group Actions
prerequisites:
  - tier: strand-2-structure-intermediate
    slug: 04-cyclic-classification
    description: Cyclic classification
connections:
  - strand-2-structure-intermediate/06-polynomial-rings
applications:
  - cs: "Burnside-counting orbits in combinatorics, equivariant ML"
  - life: "How a group can *do something* to a set"
---

# Group Actions

## Mental

A **group action** is a homomorphism $\rho : G \to \mathrm{Sym}(X)$ —
each $g \in G$ acts as a permutation of the set $X$. Equivalently,
a function $G \times X \to X$, written $g \cdot x$, satisfying:

1. $e \cdot x = x$.
2. $(gh) \cdot x = g \cdot (h \cdot x)$.

Examples:

- $S_n$ acts on $\{1, \ldots, n\}$ by permutation.
- $\mathrm{GL}_n(\mathbb{R})$ acts on $\mathbb{R}^n$ by matrix-vector
  multiplication.
- A cyclic group $\langle r \rangle$ acts on a regular polygon by
  rotation.

## Orbits and stabilizers

Two key constructions:

- **Orbit** of $x$: $\mathrm{Orb}(x) = \{g \cdot x : g \in G\}$ — the
  set of points $x$ can reach.
- **Stabilizer** of $x$: $\mathrm{Stab}(x) = \{g \in G : g \cdot x = x\}$ —
  elements fixing $x$.

The stabilizer is *always a subgroup* of $G$. Distinct orbits
partition $X$.

## Orbit-stabilizer theorem

For $G$ acting on a finite set:

$$
|\mathrm{Orb}(x)| \cdot |\mathrm{Stab}(x)| = |G|.
$$

Read: the size of any orbit divides $|G|$. Powerful for counting.

## Worked example: rotations of a square

$G = \mathbb{Z}/4$ acting on the 4 vertices of a square by rotation.

- $\mathrm{Orb}(\text{any vertex}) = $ all 4 vertices. $|\mathrm{Orb}| = 4$.
- $\mathrm{Stab}(\text{any vertex}) = \{e\}$. $|\mathrm{Stab}| = 1$.
- Check: $4 \cdot 1 = 4 = |G|$. ✓

## Burnside's lemma (counting orbits)

For finite $G$ acting on finite $X$:

$$
\#\text{orbits} = \frac{1}{|G|} \sum_{g \in G} |\mathrm{Fix}(g)|,
$$

where $\mathrm{Fix}(g) = \{x \in X : g \cdot x = x\}$.

Read: average number of fixed points equals the number of orbits.

## Interactive

:::widget type=numeric-input prompt="Cyclic $\\mathbb{Z}/4$ rotates 4 vertices of a square. Number of orbits?" answer=1 explain="$1$ — all 4 vertices are in one orbit.":::

:::widget type=numeric-input prompt="$|\\mathrm{Orb}(x)| \\cdot |\\mathrm{Stab}(x)| = |G|$. For $|G| = 12$, $|\\mathrm{Orb}| = 6$, $|\\mathrm{Stab}| = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Number of distinct necklaces of 4 beads coloured 2 ways, modulo rotation: by Burnside $\\frac{1}{4}(2^4 + 2 + 2^2 + 2) = \\frac{1}{4}(16 + 2 + 4 + 2) = ?$" answer=6 explain="$6$ distinct necklaces.":::

:::widget type=numeric-input prompt="Stabilizer of any element is a subgroup of $G$. Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Transitive action**: only one orbit — every $x$ reaches every $y$.

**Free action**: every stabilizer is trivial — no non-identity
element fixes anything.

**Faithful action**: $\rho$ is injective — different group elements
act differently.

**Conjugation action**: $G$ acts on itself by $g \cdot x = g x g^{-1}$.
Orbits = conjugacy classes; stabilizer of $x$ = centralizer
$C_G(x)$. Class equation:

$$
|G| = |Z(G)| + \sum_{x \in \text{non-central reps}} [G : C_G(x)].
$$

Used to prove Sylow's theorems.

## Computational

```python
# Orbit & stabilizer for a permutation group acting on its set
def orbit(group_action, generators, x):
    seen = {x}
    frontier = [x]
    while frontier:
        a = frontier.pop()
        for g in generators:
            b = group_action(g, a)
            if b not in seen:
                seen.add(b)
                frontier.append(b)
    return seen

def cyclic_rotation(g, x, n=4):
    return (x + g) % n

print(orbit(cyclic_rotation, [1], 0))   # {0, 1, 2, 3}

# Burnside necklace count: 4 beads, 2 colors, group = Z/4
def fix_count(g, n=4, k=2):
    # number of colorings fixed by rotation by g
    from math import gcd
    return k ** gcd(g, n)

print(sum(fix_count(g) for g in range(4)) // 4)   # 6 — Burnside
```

## Applied

- **Pólya enumeration** counts colourings, isomers, graphs, with
  automorphism groups; Burnside (or its generating-function refinement)
  is the workhorse.
- **Equivariant neural networks** — networks designed to respect
  symmetry actions (translation, rotation) often need fewer parameters
  to match performance. Group convolutional networks for images.
- **Quantum information** — groups (Clifford group, Pauli group) act
  on quantum states; characterising stabilisers gives error-correcting
  codes (stabiliser codes).
- **Game-theoretic equilibria** with symmetric players — analyses
  reduce to orbit counting.

## Check Your Understanding

:::widget type=numeric-input prompt="$|G| = |\\mathrm{Orb}| \\cdot |\\mathrm{Stab}|$. Type 1 if orbit-stabilizer." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Conjugacy classes are orbits of $G$ acting on itself by conjugation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A free action has trivial stabilizers. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Burnside: average fixed-point count = number of orbits. Type 1." answer=1 explain="Yes.":::
