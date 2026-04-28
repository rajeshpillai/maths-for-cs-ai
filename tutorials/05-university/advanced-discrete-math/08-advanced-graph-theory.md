# Advanced Graph Theory

## Intuition

Graphs are the universal language of connections — social networks, road maps,
circuit boards, molecule structures. Beyond basic vertices and edges, deeper
questions arise: Can you colour a map with 4 colours? Can you draw a graph
without crossings? Can you traverse every edge exactly once? These questions
birthed entire fields of mathematics and have direct applications in scheduling,
routing, and compiler optimisation.

## Prerequisites

- **Tier 1, Lesson 5** — Graph theory basics: vertices, edges, paths, trees

## From First Principles

### Graph Colouring

A **proper $k$-colouring** assigns one of $k$ colours to each vertex so that
no two adjacent vertices share a colour. The **chromatic number** $\chi(G)$ is
the smallest $k$ for which a proper colouring exists.

**Key results (pen & paper):**

- Complete graph $K_n$: $\chi(K_n) = n$ (every vertex is adjacent to every other).
- Bipartite graph: $\chi(G) = 2$ (two-colourable, by definition).
- Cycle $C_n$: $\chi(C_n) = 2$ if $n$ is even, $3$ if $n$ is odd.
- **Four Colour Theorem:** Every planar graph has $\chi(G) \le 4$.

**Greedy colouring algorithm:** Process vertices in some order. Assign each
vertex the smallest colour not used by its neighbours.

**Example:** Colour the cycle $C_5 = (1-2-3-4-5-1)$.

Vertex 1: colour 0. Vertex 2: colour 1. Vertex 3: colour 0.
Vertex 4: colour 1. Vertex 5: adjacent to 4 (colour 1) and 1 (colour 0), so colour 2.
$\chi(C_5) = 3$.

### Planar Graphs and Euler's Formula

A graph is **planar** if it can be drawn in the plane without edge crossings.

**Euler's Formula:** For a connected planar graph:

$$V - E + F = 2$$

where $V$ = vertices, $E$ = edges, $F$ = faces (including the outer face).

**Example:** A triangle ($K_3$): $V=3$, $E=3$, $F=2$ (inside + outside).
$3 - 3 + 2 = 2$. Correct.

**Corollary:** For a simple planar graph with $V \ge 3$: $E \le 3V - 6$.

This proves $K_5$ is non-planar: $V=5$, $E=10$, but $3(5)-6=9 < 10$.

### Euler and Hamiltonian Paths

**Eulerian path:** traverses every **edge** exactly once.
- Exists iff the graph has 0 or 2 vertices of odd degree.

**Hamiltonian path:** visits every **vertex** exactly once.
- No simple characterisation known (NP-complete to decide in general).

**Example:** The Konigsberg bridge problem. 4 landmasses, 7 bridges.
Degrees: 3, 3, 3, 5 — four odd-degree vertices. No Eulerian path exists.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# 1: Graph colouring of C5
ax = axes[0]
ax.set_title("C5 Colouring (chi=3)", fontsize=12)
angles = np.linspace(0, 2*np.pi, 6)[:-1]
x = np.cos(angles); y = np.sin(angles)
colors_c5 = ['red', 'blue', 'red', 'blue', 'green']
for i in range(5):
    j = (i + 1) % 5
    ax.plot([x[i], x[j]], [y[i], y[j]], 'k-', lw=1.5)
for i in range(5):
    ax.plot(x[i], y[i], 'o', color=colors_c5[i], markersize=25, markeredgecolor='black')
    ax.text(x[i], y[i], str(i+1), ha='center', va='center', fontsize=11, fontweight='bold')
ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.5, 1.5); ax.set_aspect('equal'); ax.axis('off')

# 2: Planar graph (K4) with faces labelled
ax = axes[1]
ax.set_title("K4 (Planar): V-E+F = 4-6+4 = 2", fontsize=11)
k4x = [0, 1, 0.5, 0.5]; k4y = [0, 0, 0.866, 0.289]
edges_k4 = [(0,1),(0,2),(0,3),(1,2),(1,3),(2,3)]
for i, j in edges_k4:
    ax.plot([k4x[i],k4x[j]], [k4y[i],k4y[j]], 'k-', lw=1.5)
for i in range(4):
    ax.plot(k4x[i], k4y[i], 'o', color='steelblue', markersize=20, markeredgecolor='black')
    ax.text(k4x[i], k4y[i], str(i), ha='center', va='center', fontsize=11, color='white')
ax.set_xlim(-0.3, 1.3); ax.set_ylim(-0.3, 1.1); ax.set_aspect('equal'); ax.axis('off')

# 3: Konigsberg bridges (no Euler path)
ax = axes[2]
ax.set_title("Konigsberg Bridges\n(4 odd-degree vertices: no Euler path)", fontsize=10)
nodes = {'A': (0, 1), 'B': (0, -1), 'C': (-1.5, 0), 'D': (1.5, 0)}
for name, (nx, ny) in nodes.items():
    ax.plot(nx, ny, 'o', color='orange', markersize=25, markeredgecolor='black')
    ax.text(nx, ny, name, ha='center', va='center', fontsize=12, fontweight='bold')
bridges = [('A','C'),('B','C'),('A','D'),('B','D'),('A','B'),('A','B'),('C','D')]
offsets = [0, 0, 0, 0, 0.15, -0.15, 0]
for (u, v), off in zip(bridges, offsets):
    ux, uy = nodes[u]; vx, vy = nodes[v]
    ax.annotate('', xy=(vx, vy+off), xytext=(ux, uy+off),
                arrowprops=dict(arrowstyle='-', lw=2, color='gray'))
ax.set_xlim(-2.2, 2.2); ax.set_ylim(-1.8, 1.8); ax.set_aspect('equal'); ax.axis('off')

plt.tight_layout()
plt.savefig("advanced_graph_theory.png", dpi=100)
plt.show()
```

## Python Verification

```python
# ── Graph colouring and Euler's formula ──────────────────

# Step 1: Greedy graph colouring
def greedy_colour(adj):
    """Greedy colouring. adj[v] = set of neighbours."""
    n = len(adj)
    colour = [-1] * n
    for v in range(n):
        used = {colour[u] for u in adj[v] if colour[u] != -1}
        c = 0
        while c in used:
            c += 1
        colour[v] = c
    return colour

# C5 adjacency
c5 = {0: {1,4}, 1: {0,2}, 2: {1,3}, 3: {2,4}, 4: {3,0}}
colours = greedy_colour(c5)
print(f"C5 colouring: {colours}")
print(f"Chromatic number (greedy upper bound): {max(colours)+1}")

# Step 2: Euler's formula verification
def euler_formula(V, E, F):
    return V - E + F

# K4: V=4, E=6, F=4 (3 interior triangles + 1 outer)
print(f"\nK4: V-E+F = {euler_formula(4, 6, 4)} (should be 2)")
# Cube: V=8, E=12, F=6
print(f"Cube: V-E+F = {euler_formula(8, 12, 6)} (should be 2)")
# Dodecahedron: V=20, E=30, F=12
print(f"Dodecahedron: V-E+F = {euler_formula(20, 30, 12)} (should be 2)")

# Step 3: Check Euler path existence
def has_euler_path(adj):
    """Check if undirected graph has an Eulerian path."""
    odd_count = sum(1 for v in adj if len(adj[v]) % 2 == 1)
    if odd_count == 0:
        return "Euler circuit exists"
    elif odd_count == 2:
        return "Euler path exists (not a circuit)"
    else:
        return f"No Euler path ({odd_count} odd-degree vertices)"

# Konigsberg bridges: A-C, B-C, A-D, B-D, A-B, A-B, C-D
konigsberg = {
    'A': ['C', 'D', 'B', 'B'],
    'B': ['C', 'D', 'A', 'A'],
    'C': ['A', 'B', 'D'],
    'D': ['A', 'B', 'C']
}
odd = sum(1 for v in konigsberg if len(konigsberg[v]) % 2 == 1)
print(f"\nKonigsberg: {odd} odd-degree vertices => No Euler path")

# Simple cycle C6 (all even degree)
c6 = {i: {(i-1)%6, (i+1)%6} for i in range(6)}
print(f"C6: {has_euler_path(c6)}")

# Step 4: Planarity check (E <= 3V - 6)
for name, V, E in [("K4", 4, 6), ("K5", 5, 10), ("Petersen", 10, 15)]:
    bound = 3*V - 6
    planar = "possibly planar" if E <= bound else "NOT planar"
    print(f"{name}: E={E}, 3V-6={bound} => {planar}")
```

## Connection to CS / Games / AI / Business / Industry

- **Register allocation:** Compilers colour an "interference graph" to assign
  variables to CPU registers — graph colouring directly.
- **Map colouring / scheduling:** The four-colour theorem ensures any planar
  map needs at most 4 colours, applied to frequency assignment and scheduling.
- **Network routing:** Euler paths model routes that traverse every link
  (e.g., snowplough routes, circuit board testing).
- **Game AI:** Hamiltonian paths arise in game level design (visit every room once).

## Check Your Understanding

1. Prove that $K_{3,3}$ (complete bipartite) is non-planar using the corollary
   $E \le 2V - 4$ (for bipartite planar graphs).
2. Find $\chi(K_4)$ by trying to colour it with 3 colours, then show 4 suffice.
3. Construct a graph on 6 vertices that has an Euler circuit. Verify the
   degree condition in Python.
