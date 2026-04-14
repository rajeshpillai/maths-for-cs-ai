# Graph Theory Basics — Vertices, Edges, Paths, Trees

## Intuition

A graph is just dots (vertices) connected by lines (edges).  Your social
network is a graph — people are vertices, friendships are edges.  A road
map is a graph.  The internet is a graph.  Graphs are the most universal
data structure in computer science, and understanding their mathematics
unlocks shortest paths, network flow, and even Google's PageRank.

## Prerequisites

- Tier 1, Lesson 2: Set Theory (sets, pairs)
- Tier 1, Lesson 3: Relations (relations on sets)

## From First Principles

### Definition

A **graph** $G = (V, E)$ consists of:
- $V$ = a set of **vertices** (nodes)
- $E$ = a set of **edges** (connections), where each edge is a pair of vertices

**Pen & paper:** Draw this graph:
$V = \{A, B, C, D\}$, $E = \{(A,B), (A,C), (B,C), (C,D)\}$

```
A --- B
|   /
|  /
C --- D
```

### Undirected vs directed

- **Undirected:** edges have no direction.  $(A, B) = (B, A)$.  Friendships.
- **Directed (digraph):** edges have direction.  $(A, B) \ne (B, A)$.  Twitter follows.

### Terminology

| Term | Definition | Our example |
|------|-----------|-------------|
| **Adjacent** | Two vertices connected by an edge | A and B are adjacent |
| **Degree** $\deg(v)$ | Number of edges touching $v$ | $\deg(A) = 2$, $\deg(C) = 3$ |
| **Path** | Sequence of vertices connected by edges | A → B → C → D |
| **Cycle** | Path that starts and ends at same vertex | A → B → C → A |
| **Connected** | Path exists between every pair | Our graph is connected |
| **Complete** $K_n$ | Every vertex connected to every other | $K_4$ has $\binom{4}{2} = 6$ edges |

### The handshaking lemma

$$\sum_{v \in V} \deg(v) = 2|E|$$

**Why?** Each edge contributes 1 to the degree of each of its two endpoints.

**Pen & paper:** Our graph has edges $\{AB, AC, BC, CD\}$, so $|E| = 4$.

$\deg(A) + \deg(B) + \deg(C) + \deg(D) = 2 + 2 + 3 + 1 = 8 = 2 \times 4$ ✓

**Corollary:** The number of vertices with **odd degree** is always **even**.

### Representing graphs

**Adjacency matrix:** $n \times n$ matrix where entry $(i,j) = 1$ if edge exists.

**Pen & paper:** For our graph (A=0, B=1, C=2, D=3):

$$M = \begin{pmatrix} 0 & 1 & 1 & 0 \\ 1 & 0 & 1 & 0 \\ 1 & 1 & 0 & 1 \\ 0 & 0 & 1 & 0 \end{pmatrix}$$

Properties:
- Symmetric for undirected graphs
- Diagonal is 0 (no self-loops)
- Row sum = degree of that vertex

**Adjacency list:** Each vertex stores a list of its neighbours.

```
A: [B, C]
B: [A, C]
C: [A, B, D]
D: [C]
```

| | Adjacency matrix | Adjacency list |
|-|-----------------|----------------|
| Space | $O(n^2)$ | $O(n + e)$ |
| Edge lookup | $O(1)$ | $O(\deg(v))$ |
| Best for | Dense graphs | Sparse graphs |

### Special graphs

**Complete graph $K_n$:** Every pair connected.
$|E| = \binom{n}{2} = \frac{n(n-1)}{2}$

**Bipartite graph:** Vertices split into two groups; edges only between groups.

**Pen & paper:** Is this graph bipartite?  $V = \{1,2,3,4\}, E = \{(1,2),(2,3),(3,4),(4,1)\}$

Colour 1→Red, 2→Blue, 3→Red, 4→Blue.  Every edge connects different colours. ✓ Bipartite.

**A graph is bipartite if and only if it has no odd-length cycles.**

### Trees

A **tree** is a connected graph with **no cycles**.

Properties (all equivalent for a connected graph):
- Connected and has $n - 1$ edges
- Connected and removing any edge disconnects it
- Any two vertices are connected by exactly one path

**Pen & paper:** A tree on 5 vertices has exactly $5 - 1 = 4$ edges.

```
    A
   / \
  B   C
 /     \
D       E
```

### Traversals (pen & paper walkthrough)

**BFS (Breadth-First Search):** Visit neighbours first, then their neighbours.
Uses a **queue**.

Starting from A in our tree:
Queue: [A] → visit A, add B,C → [B, C] → visit B, add D → [C, D] → visit C, add E → [D, E] → visit D → [E] → visit E

Order: **A, B, C, D, E**

**DFS (Depth-First Search):** Go as deep as possible before backtracking.
Uses a **stack** (or recursion).

Starting from A:
Stack: [A] → visit A, push C,B → [C, B] → pop B, push D → [C, D] → pop D → [C] → pop C, push E → [E] → pop E

Order: **A, B, D, C, E**

### Euler and Hamilton paths

**Euler path:** Visits every **edge** exactly once.
Exists iff the graph has exactly 0 or 2 vertices of odd degree.

**Hamilton path:** Visits every **vertex** exactly once.
No simple condition exists (this is NP-complete to decide in general!).

## Python Verification

```python
# ── Graph Theory: verifying pen & paper work ────────────────
from collections import deque

# Our graph
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B', 'D'],
    'D': ['C'],
}

# Degrees
print("=== Degrees ===")
total_degree = 0
for v in sorted(graph):
    deg = len(graph[v])
    total_degree += deg
    print(f"deg({v}) = {deg}")
num_edges = 4
print(f"Sum of degrees = {total_degree} = 2 × {num_edges} (handshaking lemma)")

# Adjacency matrix
print("\n=== Adjacency Matrix ===")
vertices = sorted(graph)
n = len(vertices)
idx = {v: i for i, v in enumerate(vertices)}
matrix = [[0]*n for _ in range(n)]
for v in vertices:
    for u in graph[v]:
        matrix[idx[v]][idx[u]] = 1

print("  ", " ".join(vertices))
for i, v in enumerate(vertices):
    print(f"{v}:", matrix[i])

# BFS
print("\n=== BFS from A ===")
def bfs(graph, start):
    visited = set()
    queue = deque([start])
    order = []
    while queue:
        v = queue.popleft()
        if v in visited:
            continue
        visited.add(v)
        order.append(v)
        for u in graph[v]:
            if u not in visited:
                queue.append(u)
    return order

print("BFS order:", bfs(graph, 'A'))

# DFS
print("\n=== DFS from A ===")
def dfs(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        v = stack.pop()
        if v in visited:
            continue
        visited.add(v)
        order.append(v)
        for u in reversed(graph[v]):
            if u not in visited:
                stack.append(u)
    return order

print("DFS order:", dfs(graph, 'A'))

# Bipartite check
print("\n=== Bipartite check: cycle 1-2-3-4 ===")
cycle_graph = {1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [3, 1]}
def is_bipartite(graph):
    colour = {}
    for start in graph:
        if start in colour:
            continue
        queue = deque([start])
        colour[start] = 0
        while queue:
            v = queue.popleft()
            for u in graph[v]:
                if u not in colour:
                    colour[u] = 1 - colour[v]
                    queue.append(u)
                elif colour[u] == colour[v]:
                    return False, colour
    return True, colour

result, colouring = is_bipartite(cycle_graph)
print(f"Bipartite: {result}")
print(f"Colouring: {colouring}")

# Complete graph edges
print("\n=== Complete graph K_n edges ===")
from math import comb
for n in range(2, 8):
    print(f"K_{n}: {comb(n, 2)} edges")
```

## Connection to CS / Games / AI

- **Social networks** — friend graphs, follower digraphs, community detection
- **Shortest path** — Dijkstra's algorithm, Google Maps, network routing
- **Trees** — file systems, DOM, syntax trees, decision trees in ML
- **PageRank** — Google's algorithm models the web as a directed graph
- **Game AI** — state space search (BFS/DFS), minimax on game trees
- **Neural networks** — computation graphs; backpropagation traverses the graph in reverse
- **Knowledge graphs** — entities as vertices, relationships as edges (used in NLP)

## Check Your Understanding

1. **Pen & paper:** Draw $K_5$ (complete graph on 5 vertices).  How many edges?  What is the degree of each vertex?
2. **Pen & paper:** Given graph $V = \{1,2,3,4,5\}$, $E = \{(1,2),(1,3),(2,3),(3,4),(4,5)\}$, write the adjacency matrix.  Verify the handshaking lemma.
3. **Pen & paper:** Trace BFS and DFS starting from vertex 1 on the graph above.  Show the queue/stack at each step.
4. **Pen & paper:** Is the graph $V = \{1,2,3\}$, $E = \{(1,2),(2,3),(3,1)\}$ bipartite?  Why or why not?
5. **Think about it:** Why does a tree on $n$ vertices always have exactly $n - 1$ edges?  (Hint: what happens when you add a vertex to a tree?)
