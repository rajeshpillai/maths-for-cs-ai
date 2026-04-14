# Graph Algorithms

## Intuition

Graphs model connections, but the real power comes from algorithms that
*navigate* them. BFS explores layer by layer (like ripples in a pond), DFS
dives deep (like exploring a maze). Dijkstra finds the cheapest path in a
weighted graph, and Minimum Spanning Trees connect everything at minimum cost.
These four algorithms are the workhorses of routing, networking, and game AI.

## Prerequisites

- **Tier 13, Lesson 8** — Graph colouring, planar graphs, Euler/Hamiltonian paths

## From First Principles

### BFS (Breadth-First Search)

Explore all vertices at distance $d$ before distance $d+1$.

**Algorithm (pen & paper):**
1. Start at source $s$. Mark it visited, set $\text{dist}[s] = 0$.
2. Use a queue. Enqueue $s$.
3. While queue is not empty: dequeue $v$, for each unvisited neighbour $u$,
   set $\text{dist}[u] = \text{dist}[v] + 1$, enqueue $u$.

**Time complexity:** $O(V + E)$.

**Example:** Graph: $0-1, 0-2, 1-3, 2-3, 3-4$. BFS from 0:

Queue: [0]. Visit 0, dist=0.
Queue: [1, 2]. Visit 1 (dist=1), visit 2 (dist=1).
Queue: [3]. Visit 3 (dist=2). (From both 1 and 2, but already queued.)
Queue: [4]. Visit 4 (dist=3).

### DFS (Depth-First Search)

Go as deep as possible, then backtrack.

**Algorithm:** Use a stack (or recursion).
1. Start at $s$, mark visited.
2. For each unvisited neighbour, recurse.

DFS produces a **DFS tree** with discovery/finish times, useful for
topological sorting and cycle detection.

### Dijkstra's Shortest Path

For **non-negative** edge weights.

**Algorithm:**
1. Set $\text{dist}[s] = 0$, all others $= \infty$.
2. Use a priority queue (min-heap).
3. Extract vertex $v$ with minimum dist. For each neighbour $u$:
   if $\text{dist}[v] + w(v,u) < \text{dist}[u]$, update $\text{dist}[u]$.

**Pen & paper example:**

Edges: $A \xrightarrow{4} B$, $A \xrightarrow{1} C$, $C \xrightarrow{2} B$, $B \xrightarrow{1} D$, $C \xrightarrow{5} D$.

Start at A. dist = {A:0, B:inf, C:inf, D:inf}.
Extract A: update B=4, C=1. dist = {A:0, B:4, C:1, D:inf}.
Extract C(1): update B=min(4, 1+2)=3, D=1+5=6. dist = {A:0, B:3, C:1, D:6}.
Extract B(3): update D=min(6, 3+1)=4. dist = {A:0, B:3, C:1, D:4}.
Extract D(4): done.

### Minimum Spanning Tree (MST)

Connect all vertices with minimum total edge weight.

**Kruskal's:** Sort edges by weight, add each edge if it does not create a cycle (use Union-Find).

**Prim's:** Grow the tree from a starting vertex, always adding the cheapest edge to a new vertex.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np
from collections import deque

# Visualise BFS and DFS traversal order
fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# Graph layout
pos = {0: (0, 1), 1: (-1, 0), 2: (1, 0), 3: (0, -0.5), 4: (0, -1.5)}
edges = [(0,1), (0,2), (1,3), (2,3), (3,4)]

def draw_graph(ax, title, order, edge_list):
    for u, v in edge_list:
        ax.plot([pos[u][0], pos[v][0]], [pos[u][1], pos[v][1]], 'k-', lw=1.5)
    for idx, v in enumerate(order):
        color = plt.cm.viridis(idx / max(len(order)-1, 1))
        ax.plot(pos[v][0], pos[v][1], 'o', color=color, markersize=30, markeredgecolor='black', zorder=5)
        ax.text(pos[v][0], pos[v][1], f"{v}\n({idx})", ha='center', va='center', fontsize=9, zorder=6)
    ax.set_title(title, fontsize=12)
    ax.set_aspect('equal'); ax.axis('off')

# BFS order from 0
bfs_order = [0, 1, 2, 3, 4]
draw_graph(axes[0], "BFS Order (from 0)", bfs_order, edges)

# DFS order from 0
dfs_order = [0, 1, 3, 4, 2]
draw_graph(axes[1], "DFS Order (from 0)", dfs_order, edges)

# Dijkstra on weighted graph
ax = axes[2]
wpos = {'A': (0, 1), 'B': (1, 1), 'C': (0, 0), 'D': (1, 0)}
wedges = [('A','B',4), ('A','C',1), ('C','B',2), ('B','D',1), ('C','D',5)]
for u, v, w in wedges:
    mx = (wpos[u][0]+wpos[v][0])/2
    my = (wpos[u][1]+wpos[v][1])/2
    ax.plot([wpos[u][0],wpos[v][0]], [wpos[u][1],wpos[v][1]], 'k-', lw=1.5)
    ax.text(mx+0.05, my+0.05, str(w), fontsize=11, color='red', fontweight='bold')

dists = {'A': 0, 'B': 3, 'C': 1, 'D': 4}
for node in wpos:
    ax.plot(wpos[node][0], wpos[node][1], 'o', color='steelblue', markersize=30, markeredgecolor='black')
    ax.text(wpos[node][0], wpos[node][1], f"{node}\nd={dists[node]}", ha='center', va='center', fontsize=9)
ax.set_title("Dijkstra from A", fontsize=12)
ax.set_aspect('equal'); ax.axis('off')

plt.tight_layout()
plt.savefig("graph_algorithms.png", dpi=100)
plt.show()
```

## Python Verification

```python
from collections import deque, defaultdict
import heapq

# ── BFS ──────────────────────────────────────────────────
def bfs(adj, start):
    visited = {start}
    queue = deque([start])
    order = []
    dist = {start: 0}
    while queue:
        v = queue.popleft()
        order.append(v)
        for u in sorted(adj[v]):
            if u not in visited:
                visited.add(u)
                dist[u] = dist[v] + 1
                queue.append(u)
    return order, dist

adj = {0: [1,2], 1: [0,3], 2: [0,3], 3: [1,2,4], 4: [3]}
order, dist = bfs(adj, 0)
print(f"BFS order: {order}")
print(f"BFS distances: {dist}")

# ── DFS ──────────────────────────────────────────────────
def dfs(adj, start):
    visited = set()
    order = []
    def _dfs(v):
        visited.add(v)
        order.append(v)
        for u in sorted(adj[v]):
            if u not in visited:
                _dfs(u)
    _dfs(start)
    return order

print(f"\nDFS order: {dfs(adj, 0)}")

# ── Dijkstra ─────────────────────────────────────────────
def dijkstra(wadj, start):
    dist = {v: float('inf') for v in wadj}
    dist[start] = 0
    pq = [(0, start)]
    while pq:
        d, v = heapq.heappop(pq)
        if d > dist[v]:
            continue
        for u, w in wadj[v]:
            nd = d + w
            if nd < dist[u]:
                dist[u] = nd
                heapq.heappush(pq, (nd, u))
    return dist

wadj = {
    'A': [('B',4), ('C',1)],
    'B': [('A',4), ('D',1)],
    'C': [('A',1), ('B',2), ('D',5)],
    'D': [('B',1), ('C',5)]
}
print(f"\nDijkstra from A: {dijkstra(wadj, 'A')}")

# ── Kruskal's MST ────────────────────────────────────────
def kruskal(vertices, edges):
    parent = {v: v for v in vertices}
    rank = {v: 0 for v in vertices}
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(a, b):
        ra, rb = find(a), find(b)
        if ra == rb:
            return False
        if rank[ra] < rank[rb]:
            ra, rb = rb, ra
        parent[rb] = ra
        if rank[ra] == rank[rb]:
            rank[ra] += 1
        return True

    edges_sorted = sorted(edges, key=lambda e: e[2])
    mst = []
    total = 0
    for u, v, w in edges_sorted:
        if union(u, v):
            mst.append((u, v, w))
            total += w
    return mst, total

edges = [('A','B',4), ('A','C',1), ('C','B',2), ('B','D',1), ('C','D',5)]
mst, cost = kruskal(['A','B','C','D'], edges)
print(f"\nKruskal MST: {mst}, total cost: {cost}")
```

## Connection to CS / Games / AI

- **BFS:** Shortest path in unweighted graphs, web crawlers, social network
  "degrees of separation."
- **DFS:** Topological sort (build systems, course prerequisites), cycle
  detection, maze generation.
- **Dijkstra:** GPS navigation, network routing (OSPF protocol), game AI
  pathfinding (A* is Dijkstra + heuristic).
- **MST:** Network design (cheapest cable layout), clustering (remove expensive
  edges to form clusters), image segmentation.

## Check Your Understanding

1. Trace BFS and DFS on a 4x4 grid graph starting from the top-left corner.
   Note the different visit orders.
2. Run Dijkstra on a graph where one edge has weight 0. Does it still work?
3. Prove that Kruskal's algorithm always produces an MST. (Hint: exchange
   argument — if a cheaper edge exists, it would have been chosen earlier.)
