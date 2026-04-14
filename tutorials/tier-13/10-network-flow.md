# Network Flow

## Intuition

Imagine pipes of different widths connecting a water source to a drain. How
much water can flow through the network? The **max-flow min-cut theorem**
says the answer equals the capacity of the narrowest "bottleneck" — formally,
the minimum cut separating source from sink. Network flow solves problems
from internet bandwidth allocation to airline scheduling to baseball
elimination.

## Prerequisites

- **Tier 13, Lesson 9** — BFS, DFS, Dijkstra, MST

## From First Principles

### Flow Network Definition

A flow network is a directed graph $G = (V, E)$ with:

- A **source** $s$ and a **sink** $t$.
- Each edge $(u, v)$ has a **capacity** $c(u, v) \ge 0$.
- A **flow** $f(u, v)$ satisfies:
  1. **Capacity constraint:** $0 \le f(u, v) \le c(u, v)$
  2. **Conservation:** For all $v \ne s, t$: $\sum_u f(u,v) = \sum_w f(v,w)$

The **value** of the flow: $|f| = \sum_v f(s, v)$.

### Residual Graph

Given flow $f$, the **residual capacity** of edge $(u,v)$ is:

$$c_f(u,v) = c(u,v) - f(u,v)$$

And the **reverse edge** has residual capacity $c_f(v,u) = f(u,v)$ (allowing
flow to be "undone").

An **augmenting path** is an $s \to t$ path in the residual graph with all
residual capacities positive.

### Ford-Fulkerson Algorithm

1. Start with $f = 0$ on all edges.
2. While there exists an augmenting path $P$ in the residual graph:
   - Find bottleneck: $\Delta = \min_{(u,v) \in P} c_f(u,v)$.
   - Augment: increase flow by $\Delta$ along $P$.
3. Return $|f|$.

### Max-Flow Min-Cut Theorem

**Statement:** The maximum flow from $s$ to $t$ equals the minimum capacity
of any $s$-$t$ cut.

An **$s$-$t$ cut** $(S, T)$ partitions $V$ into $S \ni s$ and $T \ni t$.
Its capacity is $\sum_{u \in S, v \in T} c(u,v)$.

**Proof sketch:** Any flow $\le$ any cut capacity (flow must cross the cut).
Ford-Fulkerson terminates when no augmenting path exists, and the reachable
set from $s$ in the residual graph defines a cut whose capacity equals the flow.

### Pen & Paper Example

```
    s --10--> A --8--> t
    |         ^        ^
    5         2        |
    v         |        |
    B ---7----+--6-----+
```

Edges: $s \to A$ (10), $s \to B$ (5), $A \to t$ (8), $B \to A$ (2), $B \to t$ (6).

Path 1: $s \to A \to t$, bottleneck = min(10, 8) = 8. Flow = 8.
Path 2: $s \to B \to t$, bottleneck = min(5, 6) = 5. Flow = 8 + 5 = 13.
No more augmenting paths. Max flow = 13.

Min cut: $S = \{s\}$, $T = \{A, B, t\}$. Capacity = 10 + 5 = 15? No, too large.
Better: $S = \{s, B\}$, $T = \{A, t\}$. Capacity = 10 + 6 = 16? Still too much.
Actual: $S = \{s, A, B\}$, $T = \{t\}$. Capacity = 8 + 6 = 14? Let me recheck...
After augmentation: residual shows $s \to B$ saturated at 5, $A \to t$ saturated at 8.
Actually $s \to A$ has 2 remaining, $B \to A$ has 2. Path $s \to A \to ...$ no path to $t$.
Path $s \to B \to A$ residual: $s \to B$ is 0. Max flow = 13.

### Visualisation

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Network with capacities
pos = {'s': (0, 1), 'A': (1.5, 2), 'B': (1.5, 0), 't': (3, 1)}
edges_cap = [('s','A',10), ('s','B',5), ('A','t',8), ('B','A',2), ('B','t',6)]

for ax, title, flows in [
    (ax1, "Capacities (before flow)", {e[:2]: 0 for e in edges_cap}),
    (ax2, "Max Flow = 13", {('s','A'): 8, ('s','B'): 5, ('A','t'): 8, ('B','A'): 0, ('B','t'): 5})
]:
    ax.set_title(title, fontsize=12)
    for u, v, c in edges_cap:
        ux, uy = pos[u]; vx, vy = pos[v]
        f = flows[(u,v)]
        ax.annotate('', xy=(vx, vy), xytext=(ux, uy),
                    arrowprops=dict(arrowstyle='->', lw=2, color='steelblue'))
        mx, my = (ux+vx)/2 + 0.1, (uy+vy)/2 + 0.1
        ax.text(mx, my, f"{f}/{c}", fontsize=10, color='red', fontweight='bold')
    for node in pos:
        ax.plot(*pos[node], 'o', color='lightyellow' if node in ('s','t') else 'lightblue',
                markersize=30, markeredgecolor='black', zorder=5)
        ax.text(*pos[node], node, ha='center', va='center', fontsize=14, fontweight='bold', zorder=6)
    ax.set_xlim(-0.5, 3.5); ax.set_ylim(-0.7, 2.7); ax.set_aspect('equal'); ax.axis('off')

plt.tight_layout()
plt.savefig("network_flow.png", dpi=100)
plt.show()
```

## Python Verification

```python
from collections import defaultdict, deque

# ── Ford-Fulkerson with BFS (Edmonds-Karp) ───────────────
class FlowNetwork:
    def __init__(self):
        self.graph = defaultdict(lambda: defaultdict(int))  # capacity

    def add_edge(self, u, v, cap):
        self.graph[u][v] += cap

    def bfs(self, s, t, parent):
        """Find augmenting path using BFS. Return True if path exists."""
        visited = {s}
        queue = deque([s])
        while queue:
            u = queue.popleft()
            for v in self.graph[u]:
                if v not in visited and self.graph[u][v] > 0:
                    visited.add(v)
                    parent[v] = u
                    if v == t:
                        return True
                    queue.append(v)
        return False

    def max_flow(self, s, t):
        """Edmonds-Karp algorithm (Ford-Fulkerson with BFS)."""
        total_flow = 0
        iteration = 0
        while True:
            parent = {}
            if not self.bfs(s, t, parent):
                break
            # Find bottleneck
            path_flow = float('inf')
            v = t
            path = [t]
            while v != s:
                u = parent[v]
                path_flow = min(path_flow, self.graph[u][v])
                path.append(u)
                v = u
            path.reverse()
            # Update residual capacities
            v = t
            while v != s:
                u = parent[v]
                self.graph[u][v] -= path_flow
                self.graph[v][u] += path_flow
                v = u
            total_flow += path_flow
            iteration += 1
            print(f"  Iteration {iteration}: path {' -> '.join(path)}, flow += {path_flow}")
        return total_flow

# Step 1: Build and solve
net = FlowNetwork()
net.add_edge('s', 'A', 10)
net.add_edge('s', 'B', 5)
net.add_edge('A', 't', 8)
net.add_edge('B', 'A', 2)
net.add_edge('B', 't', 6)

print("Ford-Fulkerson (Edmonds-Karp):")
mf = net.max_flow('s', 't')
print(f"Max flow = {mf}")

# Step 2: Larger example
print("\nLarger network:")
net2 = FlowNetwork()
for u, v, c in [('s','a',16),('s','b',13),('a','b',4),('a','c',12),
                 ('b','a',10),('b','d',14),('c','b',9),('c','t',20),('d','c',7),('d','t',4)]:
    net2.add_edge(u, v, c)
mf2 = net2.max_flow('s', 't')
print(f"Max flow = {mf2}")  # Should be 23
```

## Connection to CS / Games / AI

- **Bandwidth allocation:** Internet routing maximises data flow between servers
  — a direct max-flow problem.
- **Bipartite matching:** Maximum matching in bipartite graphs reduces to
  max-flow (add source/sink with capacity 1 edges).
- **Image segmentation:** Min-cut on a pixel graph separates foreground from
  background — used in computer vision and medical imaging.
- **Game AI:** Resource distribution in strategy games (supply lines to units)
  is a flow problem.

## Check Your Understanding

1. Trace Ford-Fulkerson by hand on a diamond graph:
   $s \to A$ (3), $s \to B$ (2), $A \to t$ (2), $B \to t$ (3), $A \to B$ (1).
2. What is the min cut in the above graph? Verify it equals the max flow.
3. Why does Edmonds-Karp (BFS-based) have time complexity $O(VE^2)$ while
   generic Ford-Fulkerson may not terminate with irrational capacities?
