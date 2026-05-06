---
strand: computation
level: intermediate
order: 1
title: Graphs — BFS and DFS
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 00-dynamic-programming
    description: Dynamic programming
connections:
  - strand-7-computation-intermediate/02-shortest-paths
applications:
  - cs: "Web crawling, social networks, dependency resolution"
  - life: "Two ways to systematically explore a network"
---

# Graphs — BFS and DFS

## Explain Like I Am 7

Picture a tangle of friendship lines: each kid is a dot and a line
joins any two who are pals.  Searching this tangle is like looking for
your missing rubber duck.  You can either walk *outwards in rings* —
ask all your friends, then all *their* friends, then theirs — or you
can dive *deep* down one trail until you hit a dead end, then back up
and try the next.  Both ways visit every kid; one explores in
spreading ripples, the other like a torch beam down a tunnel.

## Mental

A **graph** $G = (V, E)$ has vertices $V$ and edges $E$. Edges may
be **directed** or **undirected**, **weighted** or unweighted.

To search a graph (visit every reachable vertex), two algorithms:

- **BFS (breadth-first search)** — explore by *layers*: start
  vertex, then its neighbors, then *their* unvisited neighbors, etc.
  Uses a **queue**.
- **DFS (depth-first search)** — explore by *paths*: go as deep as
  possible from the start, backtrack when stuck. Uses a **stack**
  (or recursion).

## Representations

| Representation | Space | Edge query | Neighbours |
|---|---|---|---|
| Adjacency matrix | $O(V^2)$ | $O(1)$ | $O(V)$ |
| Adjacency list | $O(V + E)$ | $O(\deg)$ | $O(\deg)$ |

Adjacency lists are standard for sparse graphs (most real graphs).

## BFS

```
queue = [start]; seen = {start}
while queue:
    v = queue.pop_front()
    for u in neighbors(v):
        if u not in seen:
            seen.add(u)
            queue.append(u)
```

Time $O(V + E)$. Discovers every reachable vertex; on unweighted
graphs, gives **shortest paths** (in number of edges) from start.

## DFS

Recursive form:

```
def dfs(v):
    if v in seen: return
    seen.add(v)
    for u in neighbors(v):
        dfs(u)
```

Iterative form uses an explicit stack. Time $O(V + E)$.

DFS is the workhorse for: cycle detection, topological sort,
strongly-connected components (Tarjan / Kosaraju), articulation
points and bridges.

## Worked example: shortest unweighted path

Graph: $A - B - C - D, \; A - E - D$.

BFS from $A$:

- Layer 0: $\{A\}$
- Layer 1: $\{B, E\}$ (neighbours of $A$)
- Layer 2: $\{C, D\}$ (neighbours of $B, E$ that are new)
- Layer 3: empty

Shortest distance $A \to D$ is 2 (via $E$). BFS naturally finds it.

DFS from $A$ might go $A \to B \to C \to D$ (length 3) — DFS does
*not* find shortest paths.

## Interactive

:::widget type=numeric-input prompt="BFS time complexity (adjacency list): $O(V + E)$. For $V = 100, E = 500$: roughly?" answer=600 explain="$\\sim 600$ steps.":::

:::widget type=numeric-input prompt="BFS uses a queue (1) or stack (0)?" answer=1 explain="Queue.":::

:::widget type=numeric-input prompt="DFS uses recursion or an explicit stack. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="On unweighted graphs, BFS gives shortest paths. Type 1." answer=1 explain="Yes.":::

## Symbolic

**DFS edge classification** (on directed graph): tree, forward,
back, cross. **Back edges** signal cycles. Used in topological
sort and SCC algorithms.

**BFS layer property**: vertices at the same BFS layer form an
**antichain** w.r.t. shortest-path distance.

**Connectivity**: a graph is connected iff one BFS/DFS visits all
vertices. To find all connected components, restart BFS/DFS from
each unvisited vertex.

**Bipartiteness test**: 2-colour vertices via BFS, alternating
colours per layer. If any edge has equal-coloured endpoints, the
graph is *not* bipartite.

## Computational

```python
from collections import deque, defaultdict

def bfs(graph, start):
    seen = {start}
    order = []
    q = deque([start])
    while q:
        v = q.popleft()
        order.append(v)
        for u in graph[v]:
            if u not in seen:
                seen.add(u)
                q.append(u)
    return order

def dfs(graph, start):
    seen = set()
    order = []
    def visit(v):
        if v in seen: return
        seen.add(v); order.append(v)
        for u in graph[v]: visit(u)
    visit(start)
    return order

graph = defaultdict(list, {
    "A": ["B", "E"],
    "B": ["A", "C"],
    "C": ["B", "D"],
    "D": ["C", "E"],
    "E": ["A", "D"],
})

print(bfs(graph, "A"))   # ['A', 'B', 'E', 'C', 'D'] — layered
print(dfs(graph, "A"))   # ['A', 'B', 'C', 'D', 'E'] — depth-first

# BFS shortest distance
def bfs_distance(graph, start):
    dist = {start: 0}
    q = deque([start])
    while q:
        v = q.popleft()
        for u in graph[v]:
            if u not in dist:
                dist[u] = dist[v] + 1
                q.append(u)
    return dist

print(bfs_distance(graph, "A"))   # {A:0, B:1, E:1, C:2, D:2}
```

## Applied

- **Web crawlers** — Googlebot uses BFS-style frontier expansion
  with priority queues for politeness and recency.
- **Social networks** — "degrees of separation" is BFS.
- **Dependency resolution** — `npm install`, Cargo, Bazel use
  topological sort (DFS-based) to build in correct order.
- **Compiler call-graph analysis** — DFS to find SCCs of mutually
  recursive functions.
- **Garbage collection** — mark-and-sweep is BFS or DFS over the
  reachable-object graph.

## Check Your Understanding

:::widget type=numeric-input prompt="BFS finds shortest unweighted paths. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Adjacency-list space for graph with $V$ vertices, $E$ edges: $O(V + ?)$" answer=0 explain="$O(V + E)$. Type 0 to indicate $E$.":::

:::widget type=numeric-input prompt="DFS detects back edges; back edge $\\Rightarrow$ cycle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Topological sort uses DFS. Type 1." answer=1 explain="Yes — reverse post-order.":::
