---
strand: computation
level: intermediate
order: 3
title: Minimum Spanning Trees
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 02-shortest-paths
    description: Shortest paths
connections:
  - strand-7-computation-intermediate/04-heaps-and-priority-queues
applications:
  - cs: "Network design, clustering, image segmentation"
  - life: "Cheapest way to connect every node"
---

# Minimum Spanning Trees

## Explain Like I Am 7

Imagine a town of houses and a builder must lay water pipes so every
house gets water.  Each possible pipe between two houses has a
different price, and the builder wants to spend as little money as
possible while still connecting everyone.  No fancy loops are allowed
— each extra pipe is wasted money.  The builder keeps adding the
*cheapest* pipe that doesn't form a closed loop until every house is
on the network.  That bare-bones, no-loops, lowest-cost pipe layout is
a **minimum spanning tree**.

## Mental

Given an undirected weighted graph $G = (V, E, w)$, a **spanning
tree** is a subgraph that:

- Touches every vertex.
- Has $|V| - 1$ edges.
- Is connected and acyclic.

A **minimum spanning tree (MST)** is one with smallest total weight.
Useful when you need to *connect everything* at minimum cost — wires,
roads, network links.

## Two classical algorithms

**Kruskal's algorithm** (greedy by edge weight):

```
Sort edges ascending.
forest ← {each vertex its own tree}
for each edge (u, v) in order:
    if u and v lie in different components:
        add (u, v) to MST; merge components
```

Time $O(E \log E)$ for sort, plus $O(E \alpha(V))$ for union-find
queries (effectively constant). Total $O(E \log E)$.

**Prim's algorithm** (grow a single tree):

```
Pick a start vertex.
priority queue contains edges crossing the tree boundary.
repeat: pop the lightest crossing edge (u, v); if v is new, add it.
```

Time $O(E \log V)$ with binary heap.

## Why these greedy algorithms work

**Cut property**: in any cut $(S, V \setminus S)$, the lightest edge
crossing the cut is in some MST.

Both Prim's and Kruskal's are instances of choosing a lightest
crossing edge at each step; the cut property guarantees those choices
extend to a global MST.

## Worked example

Vertices $\{A, B, C, D\}$. Edges:

- $A - B$: 3
- $A - C$: 5
- $B - C$: 1
- $B - D$: 2
- $C - D$: 4

Sort: $\{BC: 1, BD: 2, AB: 3, CD: 4, AC: 5\}$.

Kruskal:
- BC (1): different components → take.
- BD (2): different → take.
- AB (3): different → take.
- CD (4): same component (already connected) → skip.
- (Tree complete after 3 edges.)

MST: $\{BC, BD, AB\}$. Total weight $1 + 2 + 3 = 6$.

## Interactive

:::widget type=numeric-input prompt="A spanning tree of $|V| = 5$ vertices has how many edges?" answer=4 explain="$|V| - 1 = 4$.":::

:::widget type=numeric-input prompt="Kruskal time complexity: $O(E \\log E) = O(?)$ — type 1 for $E \\log E$, 2 for $E^2$." answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="Prim time complexity (binary heap): $O(E \\log V)$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MST weight in worked example: $1 + 2 + 3 = ?$" answer=6 explain="$6$.":::

## Symbolic

**Cycle property** (dual of cut): in any cycle, the heaviest edge is
*not* in any MST. Removing it can only improve — corollary of the cut
property applied to the cut splitting that edge.

**Uniqueness**: MST is unique iff all edge weights are distinct.

**Union-Find** (disjoint-set union, DSU): the data structure powering
Kruskal. Operations:

- $\mathrm{find}(x)$: return representative of $x$'s component.
- $\mathrm{union}(x, y)$: merge components.

With path compression + union-by-rank, both are *effectively* $O(1)$
amortized — $O(\alpha(n))$ where $\alpha$ is the inverse Ackermann
function (≤ 4 for any $n$ in the universe).

## Computational

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]   # path compression
            x = self.parent[x]
        return x
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry: return False
        if self.rank[rx] < self.rank[ry]: rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]: self.rank[rx] += 1
        return True

def kruskal(n, edges):
    edges = sorted(edges, key=lambda e: e[2])
    dsu = DSU(n)
    mst, total = [], 0
    for u, v, w in edges:
        if dsu.union(u, v):
            mst.append((u, v, w))
            total += w
    return mst, total

edges = [(0, 1, 3), (0, 2, 5), (1, 2, 1), (1, 3, 2), (2, 3, 4)]
mst, total = kruskal(4, edges)
print(mst, total)        # [(1,2,1),(1,3,2),(0,1,3)] 6
```

## Applied

- **Network design** — cabling a campus / wiring a chip / laying
  fibre — minimise total length while connecting all nodes.
- **Clustering** — single-link clustering builds a hierarchy by
  taking MST edges in increasing weight; cutting at a threshold gives
  clusters.
- **Image segmentation** — Felzenszwalb-Huttenlocher and similar
  algorithms use MST-style merging on pixel-graph weights.
- **Approximation algorithms** — TSP 2-approximation: take MST,
  duplicate edges, find Eulerian tour, shortcut.

## Check Your Understanding

:::widget type=numeric-input prompt="Spanning tree of $|V|$ has $|V| - 1$ edges. For $|V| = 10$: $?$" answer=9 explain="$9$.":::

:::widget type=numeric-input prompt="Cut property: lightest crossing edge is in some MST. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Union-Find amortized cost: $O(\\alpha(n))$ — effectively $O(1)$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MST is unique iff edge weights are all distinct. Type 1." answer=1 explain="Yes.":::
