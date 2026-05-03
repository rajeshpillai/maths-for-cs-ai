---
strand: reasoning
level: master
order: 4
title: Descriptive Complexity
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 03-cut-elimination
    description: Cut elimination
connections:
  - strand-8-reasoning-master/05-model-theory
applications:
  - cs: "Database query complexity, SAT-style problems"
  - life: "Logic ↔ complexity correspondence"
---

# Descriptive Complexity

## Mental

**Descriptive complexity** characterises complexity classes via the
*expressive power of logics*:

| Logic | Captures |
|---|---|
| FO (first-order) | $AC^0$ (poly-size, constant-depth circuits) |
| FO + LFP (least fixed point) | P (Immerman-Vardi 1982) |
| Existential SO | NP (Fagin's theorem 1974) |
| SO | PH (polynomial hierarchy) |
| FO + transitive closure | NL |

**Fagin's theorem**: NP = the class of properties expressible as
$\exists S_1 \exists S_2 \ldots \phi(S_1, \ldots)$ with $\phi$
first-order over a structure.

So **NP-complete = formula-complete**. SAT being NP-complete is a
particular case: $\exists$-second-order formula = "there exists an
assignment satisfying ..."

## Immerman-Vardi

**Theorem**: on ordered structures, P = FO + LFP.

A property of an ordered finite structure (graphs, databases) is
P iff it's expressible by a first-order formula plus least-fixed-
point operator.

This recasts P as a *logic*. Database query languages (SQL with
recursion) reach exactly P-class queries.

## Worked example: graph reachability

Given graph $G = (V, E)$ and vertices $s, t$: is there a path?

In FO: hard — quantifier depth must scale with path length.

In FO + LFP: define
$\mathrm{reach}(s, x) = (s = x) \lor \exists y. (\mathrm{reach}(s, y) \land E(y, x))$.

LFP gives transitive closure. Reachability captured as a fixed-point.

## Interactive

:::widget type=numeric-input prompt="Fagin's theorem: NP = ∃SO. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Immerman-Vardi: P = FO + LFP on ordered structures. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$AC^0$ = constant-depth poly-size circuits. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SQL with recursion captures P. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Finite model theory**: study finite structures and the logics
expressing properties of them. Different from classical
(infinite) model theory.

**Locality theorems** (Hanf, Gaifman): FO can only distinguish
locally-distinguishable structures. Used to prove FO definability
limits.

**0-1 laws**: FO formula is true on a random graph $G(n, 1/2)$ with
probability $\to 0$ or 1. Glebskii et al., Fagin 1976.

**Higher-order logic**: SO (second-order) captures PH. HO captures
elementary recursive sets.

## Computational

```python
# Demonstrate FO + LFP via reachability
import networkx as nx

def fo_lfp_reach(G, s, t):
    """Compute transitive closure (LFP) and check reachability."""
    visited = {s}
    queue = [s]
    while queue:
        v = queue.pop(0)
        for w in G.neighbors(v):
            if w not in visited:
                visited.add(w)
                queue.append(w)
    return t in visited

G = nx.DiGraph()
G.add_edges_from([(1, 2), (2, 3), (3, 4), (1, 5)])
print(fo_lfp_reach(G, 1, 4))    # True (path 1 → 2 → 3 → 4)
print(fo_lfp_reach(G, 5, 4))    # False

# FO formula example: "graph has triangle"
def has_triangle(G):
    n = G.number_of_nodes()
    for u in G.nodes():
        for v in G.nodes():
            for w in G.nodes():
                if G.has_edge(u, v) and G.has_edge(v, w) and G.has_edge(u, w):
                    return True
    return False

# This is FO with 3 quantifiers — captures a fixed property
G2 = nx.Graph(); G2.add_edges_from([(1, 2), (2, 3), (3, 1)])
print(has_triangle(G2))         # True

# 0-1 law demo: probability of "having triangle" in G(n, 1/2)
import random
def random_graph(n, p):
    G = nx.Graph()
    G.add_nodes_from(range(n))
    for i in range(n):
        for j in range(i+1, n):
            if random.random() < p: G.add_edge(i, j)
    return G

# As n grows, P(triangle) → 1 (FO 0-1 law)
for n in [5, 10, 20]:
    counts = sum(has_triangle(random_graph(n, 0.5)) for _ in range(50))
    print(f"n = {n}: P(triangle) ≈ {counts/50:.2f}")
```

## Applied

- **Database query languages** — SQL ≈ FO + aggregate; Datalog
  ≈ FO + LFP (= P).
- **Constraint satisfaction** — characterising which CSPs are in P
  (Bulatov-Zhuk dichotomy theorem 2017).
- **Theoretical CS** — PH separations, oracles via descriptive
  characterisations.
- **Verification** — model-checking complexity classified via
  descriptive logics.
- **AI knowledge representation** — description logics for
  semantic web are decidable fragments.

## Check Your Understanding

:::widget type=numeric-input prompt="Fagin: NP = ∃SO. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Immerman-Vardi: P = FO + LFP. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="0-1 law: FO formula on random graph has probability → 0 or 1. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Datalog ≈ P-class queries. Type 1." answer=1 explain="Yes.":::
