---
strand: pattern-counting
level: advanced
order: 7
title: Graph Theory — Coloring, Matching, Flow
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 06-probabilistic-method
    description: Probabilistic method
connections:
  - strand-5-pattern-counting-advanced/08-extremal-combinatorics
applications:
  - cs: "Register allocation, scheduling, network flow"
  - life: "Hard graph problems and structural answers"
---

# Graph Theory — Coloring, Matching, Flow

## Mental

Three landmark problems in graph theory:

- **Coloring**: assign colours to vertices so no edge has both
  endpoints the same colour. Minimum colours = **chromatic number**
  $\chi(G)$.
- **Matching**: pick edges with no shared endpoint. **Maximum
  matching** is the largest such set.
- **Flow**: route as much "stuff" as possible from source to sink in
  a network with edge capacities.

All three are central in algorithms and applications.

## Coloring theorems

| Theorem | Statement |
|---|---|
| Brook's | $\chi(G) \le \Delta(G)$ unless $G$ is complete or odd cycle |
| Vizing's | edge chromatic $\chi'(G) \in \{\Delta, \Delta + 1\}$ |
| 4-color (Appel-Haken 1976) | every planar graph has $\chi \le 4$ |
| Chromatic polynomial $P(G, k)$ | counts $k$-colorings |

The 4-color theorem was the first major result with a computer-
assisted proof.

## Matching: Hall's marriage theorem

For a bipartite graph $G = (A \cup B, E)$, a perfect matching of $A$
exists iff for every $S \subseteq A$,

$$
|N(S)| \ge |S|.
$$

(Each subset of $A$ has enough neighbours.)

Algorithmic versions: Hungarian algorithm $O(n^3)$, Hopcroft-Karp
$O(E \sqrt V)$.

## Max-flow min-cut

For a network with capacities $c : E \to \mathbb{R}_{\ge 0}$ and
source/sink $s, t$:

$$
\text{Max flow from } s \text{ to } t = \text{Min capacity of any } s\text{-}t \text{ cut}.
$$

Algorithms: Ford-Fulkerson (potentially $O(\text{flow value} \cdot E)$),
Edmonds-Karp $O(VE^2)$, push-relabel $O(V^2 E)$.

## Worked example: bipartite matching via flow

Bipartite graph $G = (A \cup B, E)$. Build a flow network:

- Source $s$ → each $a \in A$ with capacity 1.
- Each $a \in A$ → $b \in B$ if $\{a, b\} \in E$, capacity 1.
- Each $b \in B$ → sink $t$ with capacity 1.

Max flow = max matching size.

This **reduction** generalises: many graph problems reduce to flow.

## Interactive

:::widget type=numeric-input prompt="Chromatic number of $K_4$ (complete graph on 4 vertices)?" answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="Brooks: $\\chi(G) \\le \\Delta(G)$ for connected $G$ that's not complete and not an odd cycle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Max-flow = min-cut. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bipartite matching reduces to max-flow. Type 1." answer=1 explain="Yes.":::

## Symbolic

**LP duality**: max-flow = min-cut is a special case of *linear-
programming duality*. The flow LP and cut LP are dual; their optimal
values match.

**Polyhedral combinatorics**: many graph polytopes (matching, perfect
matching, TSP) have rich structure. When the polytope's vertices are
integer-coordinate, LP relaxation solves the combinatorial problem
exactly.

**Edmonds-Karp polyhedral characterisation**: Cunningham, Edmonds,
Geoffrion characterise integer polytope of matchings via odd-set
inequalities.

## Computational

```python
import networkx as nx

# Coloring
G = nx.cycle_graph(5)               # 5-cycle: chromatic 3
print(len(set(nx.coloring.greedy_color(G, strategy="largest_first").values())))

# Bipartite matching
B = nx.complete_bipartite_graph(3, 3)
matching = nx.max_weight_matching(B)
print(len(matching))                # 3 — perfect matching exists

# Max flow
G = nx.DiGraph()
G.add_edge("s", "a", capacity=10)
G.add_edge("s", "b", capacity=5)
G.add_edge("a", "t", capacity=15)
G.add_edge("b", "t", capacity=10)
G.add_edge("a", "b", capacity=15)
flow_value, flow_dict = nx.maximum_flow(G, "s", "t")
print(flow_value)                   # 15

# Min cut
cut_value, partition = nx.minimum_cut(G, "s", "t")
print(cut_value)                    # 15 — same as max flow
```

## Applied

- **Register allocation** — colour the interference graph; chromatic
  number $\le$ number of registers means program fits without
  spilling.
- **Bipartite matching** — assigning workers to jobs, students to
  schools (deferred-acceptance algorithm = Gale-Shapley).
- **Network flow** — bandwidth allocation, project scheduling
  (PERT/CPM), bipartite matching, image segmentation (graph cuts).
- **TSP / vehicle routing** — uses graph theory + integer programming
  + heuristics (Concorde, OR-Tools).
- **Phylogenetics** — Steiner trees on biological networks.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\chi(K_n) = n$. For $n = 5$: $?$" answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="Hall's marriage theorem: bipartite matching saturating $A$ exists iff $|N(S)| \\ge |S|$ for all $S$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Max-flow min-cut. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="4-color theorem: every planar graph has $\\chi \\le 4$. Type 1." answer=1 explain="Yes — Appel-Haken 1976.":::
