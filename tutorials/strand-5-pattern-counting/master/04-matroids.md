---
strand: pattern-counting
level: master
order: 4
title: Matroids
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 03-tropical-mathematics
    description: Tropical mathematics
connections:
  - strand-5-pattern-counting-master/05-random-graphs
applications:
  - cs: "Greedy algorithms, network design, optimisation"
  - life: "Common ground of linear independence and graph cycles"
---

# Matroids

## Explain Like I Am 7

A **matroid** is a fancy word for "anything that behaves like a
bunch of independent things."  Picture a pile of LEGO bricks: some
sets of bricks fit together into a sturdy tower without falling
over (these are the "independent" sets), and any sub-pile of a
sturdy pile is still sturdy.  The deep idea is that the *same*
abstract rules describe linearly independent vectors, cycle-free
collections of road segments on a map, and many other unrelated
puzzles — so the same greedy algorithm solves them all.

## Mental

A **matroid** $M = (E, \mathcal I)$:

- $E$ — finite ground set.
- $\mathcal I \subseteq 2^E$ — collection of "independent sets"
  satisfying:
  1. $\emptyset \in \mathcal I$.
  2. (Hereditary) $A \subseteq B \in \mathcal I \Rightarrow A \in \mathcal I$.
  3. (Augmentation) $A, B \in \mathcal I, |A| < |B| \Rightarrow \exists b \in B \setminus A : A \cup \{b\} \in \mathcal I$.

Captures the abstract notion of *linear independence*.

## Examples

| Matroid | Ground set | Independent sets |
|---|---|---|
| Linear | columns of a matrix | linearly independent subsets |
| Graphic | edges of a graph | forests (acyclic) |
| Uniform $U_{r, n}$ | $\{1, \ldots, n\}$ | sets of size $\le r$ |
| Transversal | partial matchings in bipartite graph | covers via matching |
| Algebraic | elements of field extension | algebraically independent |

## Bases and rank

A **basis**: maximal independent set. All bases have the same size,
called the **rank** of the matroid.

Greedy algorithm: to find a max-weight basis, sort elements by
weight, greedily include if maintains independence. **Greedy is
optimal iff the underlying structure is a matroid** — this
characterises matroids.

## Worked example: graphic matroid

Graph $G = (V, E)$. Cycle matroid $M(G)$: ground set = $E$,
independent sets = forests (acyclic subgraphs).

Bases = spanning trees. Rank = $|V| - $ (number of components).

Kruskal's MST algorithm (Strand 7 Intermediate Lesson 03) is the
greedy algorithm for the graphic matroid.

## Interactive

:::widget type=numeric-input prompt="Matroid axioms: ∅ in $\\mathcal I$, hereditary, augmentation. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="All bases have same size = rank. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Greedy is optimal $\\Leftrightarrow$ matroid. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Spanning trees are bases of graphic matroid. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Tutte polynomial**: a 2-variable polynomial encoding many matroid
invariants (chromatic polynomial of a graph, reliability polynomial,
Jones polynomial of an alternating link).

**Matroid intersection**: given two matroids on the same ground set,
find max independent set in both. Polynomial-time (Edmonds 1970).

**Matroid union**: similarly polynomial. Provides clean treatment of
problems like "edge-disjoint spanning trees."

**Oriented matroids** generalise to handle signs; classify
hyperplane arrangements.

## Computational

```python
# Matroid greedy max-weight basis
def greedy_basis(elements, weights, is_independent):
    """Greedy max-weight basis."""
    sorted_elts = sorted(zip(elements, weights), key=lambda x: -x[1])
    basis = []
    for elt, w in sorted_elts:
        if is_independent(basis + [elt]):
            basis.append(elt)
    return basis

# Graphic matroid: weighted edges
edges = [(1, 2, 4), (2, 3, 3), (3, 4, 5), (1, 4, 6), (2, 4, 1)]

def is_forest(edge_set):
    """Check if edges form a forest using union-find."""
    parent = {}
    def find(x):
        if parent.get(x, x) != x:
            parent[x] = find(parent[x])
        return parent.get(x, x)
    for u, v, _ in edge_set:
        ru, rv = find(u), find(v)
        if ru == rv:
            return False
        parent[ru] = rv
    return True

basis = greedy_basis([e for e in edges], [w for *_, w in edges],
                     lambda eset: is_forest(eset))
print("MST edges:", basis)
print("Total weight:", sum(w for *_, w in basis))

# Uniform matroid U_2,5: any pair of size ≤ 2 is independent
def U_2_5_indep(s):
    return len(s) <= 2

elts = [1, 2, 3, 4, 5]
weights = [3, 1, 4, 1, 5]
print("U_2,5 max basis:", greedy_basis(elts, weights, U_2_5_indep))   # [5, 4]
```

## Applied

- **Network design** — Kruskal-style algorithms for spanning trees,
  spanning hypergraphs.
- **Combinatorial auctions** — matroid auction theory; truthful
  mechanisms.
- **Information theory** — entropy regions, network coding linked to
  matroidal structure.
- **Polyhedral combinatorics** — base polytope of a matroid is the
  convex hull of indicator vectors of bases.
- **Algorithm design** — submodular function minimisation, matroid
  matroid intersection used in modern optimisation.

## Check Your Understanding

:::widget type=numeric-input prompt="Matroid: ground set + independent sets satisfying 3 axioms. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bases of a matroid all have the same size (rank). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Greedy gives max-weight basis iff structure is a matroid. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Graphic matroid: independent = forests. Type 1." answer=1 explain="Yes.":::
