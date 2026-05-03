---
strand: computation
level: advanced
order: 7
title: Network Flow and Matching — Advanced
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 06-probabilistic-data-structures
    description: Probabilistic data structures
connections:
  - strand-7-computation-advanced/08-approximation-algorithms
applications:
  - cs: "Image segmentation, transportation, scheduling"
  - life: "When 'route stuff through a network' is the right framing"
---

# Network Flow and Matching — Advanced

## Mental

Strand 7 Intermediate introduced max-flow / min-cut and bipartite
matching. Advanced topics:

- **Min-cost flow** — among all max flows, find one of minimum total
  cost.
- **Multi-commodity flow** — multiple source-sink pairs sharing
  capacity.
- **General matching** (not just bipartite) — Edmonds's blossom
  algorithm.
- **Online and dynamic** matching.

## Min-cost flow

Given a flow network with edge costs $c_{ij}$ per unit flow:

$$
\min \sum_{(i,j)} c_{ij} f_{ij} \text{ subject to flow constraints and value} = F.
$$

**Algorithms**: successive shortest paths, network simplex,
out-of-kilter. Polynomial-time when costs are integer.

**Applications**: transportation, assignment, telecommunications.

## General matching

Bipartite matching reduces to flow. **General matching** in non-
bipartite graphs is harder — odd cycles ("blossoms") require special
care.

**Edmonds's blossom algorithm** (1965): polynomial-time perfect
matching in general graphs. Theoretical breakthrough; one of the
first non-trivial polynomial-time algorithms.

For weighted general matching: $O(V^3)$ via Edmonds's algorithm.

## Multi-commodity flow

Multiple flows $f^k$ for source-sink pairs $(s_k, t_k)$ share
capacities $u_{ij}$:

$$
\sum_k f^k_{ij} \le u_{ij}.
$$

Polynomial-time exact solution via LP. **Integer** multi-commodity is
NP-hard.

## Min-cut as graph segmentation

**Boykov-Kolmogorov** (2004) — efficient min-cut algorithm for grid-
like graphs in computer vision. Linear in input size for typical
image segmentation.

## Interactive

:::widget type=numeric-input prompt="Min-cost flow with integer data: polynomial time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="General weighted matching: $O(V^?)$ via Edmonds." answer=3 explain="$O(V^3)$.":::

:::widget type=numeric-input prompt="Integer multi-commodity flow: NP-hard. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Boykov-Kolmogorov is fast for image-like graphs. Type 1." answer=1 explain="Yes.":::

## Symbolic

**LP duality framework**: max-flow ↔ min-cut, min-cost flow LP ↔ its
dual, etc. Integer-LP relaxations + cuts + branch-and-bound is the
backbone of modern combinatorial optimisation.

**Hungarian algorithm**: bipartite weighted matching in $O(V^3)$.
First polynomial algorithm for "assignment problem"; used in
operations research, computer vision, multi-target tracking.

**Stable matching** (Gale-Shapley): no flow, but a related
combinatorial structure. Each side ranks the other; stable matching
exists and is found in $O(V^2)$. Used for medical residency match
(NRMP), school choice.

## Computational

```python
import networkx as nx

# Min-cost max flow
G = nx.DiGraph()
G.add_edge("s", "a", capacity=10, weight=1)
G.add_edge("s", "b", capacity=10, weight=2)
G.add_edge("a", "t", capacity=8, weight=3)
G.add_edge("b", "t", capacity=10, weight=1)
G.add_edge("a", "b", capacity=5, weight=1)

flow_dict = nx.max_flow_min_cost(G, "s", "t")
print(flow_dict)
print(nx.cost_of_flow(G, flow_dict))    # min cost achieving max flow

# General weighted matching (not bipartite)
G2 = nx.Graph()
G2.add_edge(0, 1, weight=4)
G2.add_edge(1, 2, weight=3)
G2.add_edge(2, 0, weight=2)
G2.add_edge(0, 3, weight=1)

matching = nx.max_weight_matching(G2)
print(matching)

# Hungarian assignment
from scipy.optimize import linear_sum_assignment
cost = [[4, 1, 3], [2, 0, 5], [3, 2, 2]]
row, col = linear_sum_assignment(cost)
print(list(zip(row, col)))                # optimal assignment
```

## Applied

- **Image segmentation** — min-cut on pixel graphs (Boykov-
  Kolmogorov).
- **Logistics** — min-cost flow for transport, assignment for fleet
  scheduling.
- **Matching markets** — National Resident Matching Program (US
  medical residency), kidney exchange (Roth's Nobel-winning work),
  school choice.
- **Multi-target tracking in computer vision** — Hungarian for
  frame-to-frame association.
- **Network design** — min-cost flow for telecom, electricity grid
  optimisation.

## Check Your Understanding

:::widget type=numeric-input prompt="Min-cost max flow extends max-flow with edge costs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Edmonds's blossom algorithm: general matching in poly time. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Multi-commodity flow integer version: NP-hard. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gale-Shapley produces a stable matching in $O(V^2)$. Type 1." answer=1 explain="Yes.":::
