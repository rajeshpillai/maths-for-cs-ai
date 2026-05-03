---
strand: computation
level: intermediate
order: 2
title: Shortest Paths — Dijkstra
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 01-graph-bfs-dfs
    description: BFS and DFS
connections:
  - strand-7-computation-intermediate/03-minimum-spanning-trees
applications:
  - cs: "GPS routing, network protocols, A* in games"
  - life: "Cheapest path on a weighted network"
---

# Shortest Paths — Dijkstra

## Mental

Given a directed graph with **non-negative** edge weights, find the
minimum-weight path from a start vertex $s$ to every other vertex.

**Dijkstra's algorithm**:

1. $\mathrm{dist}[s] = 0$, $\mathrm{dist}[v] = \infty$ otherwise.
2. Use a priority queue keyed on tentative distance. Insert $s$.
3. Repeat: pop the vertex $v$ with smallest tentative distance.
   For each neighbour $u$, *relax* the edge: if
   $\mathrm{dist}[v] + w(v, u) < \mathrm{dist}[u]$, update
   $\mathrm{dist}[u]$ and push $u$ into the queue.
4. Continue until the queue empties.

Time: $O((V + E) \log V)$ with a binary heap. With Fibonacci heap:
$O(V \log V + E)$.

## Why non-negative weights matter

Dijkstra's correctness relies on: once a vertex is popped, its
shortest distance is final. With negative weights this can fail —
a later path might still improve it. For negative weights use
**Bellman-Ford**: $O(VE)$, also detects negative cycles.

## Worked example

Graph (undirected, weights labelled):

- $A - B$: 4
- $A - C$: 1
- $C - B$: 2
- $B - D$: 1
- $C - D$: 5

Dijkstra from $A$:

| Step | dist[A] | dist[B] | dist[C] | dist[D] |
|---|---|---|---|---|
| 0 | 0 | ∞ | ∞ | ∞ |
| pop A → relax B (4), C (1) | 0 | 4 | 1 | ∞ |
| pop C → relax B (1+2=3), D (1+5=6) | 0 | 3 | 1 | 6 |
| pop B → relax D (3+1=4) | 0 | 3 | 1 | 4 |
| pop D | 0 | 3 | 1 | 4 |

Shortest $A \to D$: cost 4 via $A \to C \to B \to D$.

## A* — heuristic-guided Dijkstra

When you know an admissible **heuristic** $h(v)$ — a lower bound on
the cost from $v$ to the goal — A* uses $f(v) = g(v) + h(v)$ as the
priority key, where $g$ is the cost from start. A* expands far
fewer nodes when $h$ is informative.

In games and pathfinding: Manhattan or Euclidean distance to the
goal is the standard $h$.

## Interactive

:::widget type=numeric-input prompt="Dijkstra time with binary heap: $O((V + E) \\log V)$. For $V = 100, E = 500$: roughly $600 \\cdot 7 \\approx ?$" answer=4200 explain="$\\sim 4200$ steps.":::

:::widget type=numeric-input prompt="Dijkstra works with negative weights? Type 1 yes, 0 no." answer=0 explain="No.":::

:::widget type=numeric-input prompt="Bellman-Ford handles negative weights and detects negative cycles. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In the worked example, shortest $A \\to D$ cost: $1 + 2 + 1 = ?$" answer=4 explain="$4$.":::

## Symbolic

**Edge relaxation**: $\mathrm{dist}[u] \leftarrow \min(\mathrm{dist}[u], \mathrm{dist}[v] + w(v, u))$.

This is the *Bellman update* — a one-step local optimization.
Dijkstra orders relaxations smartly so each edge is relaxed at most
once.

**All-pairs shortest paths** — Floyd-Warshall: $O(V^3)$.
**Matrix interpretation**: shortest paths under the
$(\min, +)$ semiring. Repeated "matrix multiplication" gives all
distances.

**Negative cycle detection**: Bellman-Ford after $V - 1$ iterations,
if any edge can still be relaxed, a negative cycle exists.

## Computational

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    dist = {start: 0}
    pq = [(0, start)]
    while pq:
        d, v = heapq.heappop(pq)
        if d > dist.get(v, float("inf")): continue
        for u, w in graph[v]:
            new_d = d + w
            if new_d < dist.get(u, float("inf")):
                dist[u] = new_d
                heapq.heappush(pq, (new_d, u))
    return dist

graph = defaultdict(list, {
    "A": [("B", 4), ("C", 1)],
    "B": [("A", 4), ("C", 2), ("D", 1)],
    "C": [("A", 1), ("B", 2), ("D", 5)],
    "D": [("B", 1), ("C", 5)],
})

print(dijkstra(graph, "A"))    # {A:0, B:3, C:1, D:4}

# Bellman-Ford with negative-weight support
def bellman_ford(graph, start, V):
    dist = {start: 0}
    edges = [(u, v, w) for u in graph for v, w in graph[u]]
    for _ in range(V - 1):
        for u, v, w in edges:
            if u in dist and dist[u] + w < dist.get(v, float("inf")):
                dist[v] = dist[u] + w
    return dist

print(bellman_ford(graph, "A", 4))    # same answer
```

## Applied

- **GPS / Maps** — Google Maps and Waze run **bidirectional A***
  with hierarchical contraction-hierarchies on continental road
  networks; query in milliseconds over $10^8$ road segments.
- **Network routing** — OSPF and IS-IS use Dijkstra to compute
  shortest paths in IP networks.
- **Game pathfinding** — A* on grid maps is the standard for
  RTS/RPG enemy navigation.
- **Robotics motion planning** — Dijkstra/A* on configuration-space
  graphs.
- **Spell-check & translation** — shortest path in a Levenshtein
  graph (edit distance) is computed with DP, but A* speeds it up.

## Check Your Understanding

:::widget type=numeric-input prompt="Dijkstra needs non-negative weights. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A* heuristic must be admissible — never overestimate. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Floyd-Warshall (all pairs) time: $O(V^?)$" answer=3 explain="$O(V^3)$.":::

:::widget type=numeric-input prompt="Bellman-Ford detects negative cycles. Type 1." answer=1 explain="Yes.":::
