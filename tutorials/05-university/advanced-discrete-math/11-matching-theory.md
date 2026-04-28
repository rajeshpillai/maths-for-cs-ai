# Matching Theory

## Intuition

Given a group of job applicants and a set of positions, can everyone be
matched to a suitable job? This is the **bipartite matching** problem. Hall's
theorem gives a clean necessary-and-sufficient condition: every subset of
applicants must collectively qualify for at least as many positions. The
**Hungarian algorithm** finds the optimal matching when assignments have
different costs — it powers everything from ride-sharing dispatch to
object tracking in computer vision.

## Prerequisites

- **Tier 13, Lesson 8** — Advanced graph theory (bipartite graphs)

## From First Principles

### Bipartite Matching

A **matching** $M$ in a graph is a set of edges with no shared vertices.
In a bipartite graph $G = (L \cup R, E)$, a matching pairs elements of $L$
with elements of $R$.

A matching is **maximum** if no larger matching exists.
A matching is **perfect** if every vertex is matched ($|M| = |L| = |R|$).

### Hall's Marriage Theorem

**Statement:** A bipartite graph $G = (L \cup R, E)$ has a matching that
saturates all of $L$ if and only if for every subset $S \subseteq L$:

$$|N(S)| \ge |S|$$

where $N(S)$ is the set of neighbours of $S$ in $R$.

**Proof sketch (necessity):** If a matching saturates $L$, then each vertex
in $S$ is matched to a distinct vertex in $N(S)$, so $|N(S)| \ge |S|$.

**Proof sketch (sufficiency):** By induction on $|L|$, using augmenting paths.

**Pen & paper example:**

$L = \{a, b, c\}$, $R = \{1, 2, 3\}$.
Edges: $a-1$, $a-2$, $b-2$, $b-3$, $c-1$.

Check Hall's condition:
- $\{a\} \to \{1,2\}$: $2 \ge 1$. OK.
- $\{b\} \to \{2,3\}$: $2 \ge 1$. OK.
- $\{c\} \to \{1\}$: $1 \ge 1$. OK.
- $\{a,c\} \to \{1,2\}$: $2 \ge 2$. OK.
- $\{a,b\} \to \{1,2,3\}$: $3 \ge 2$. OK.
- $\{b,c\} \to \{1,2,3\}$: $3 \ge 2$. OK.
- $\{a,b,c\} \to \{1,2,3\}$: $3 \ge 3$. OK.

All satisfied. Perfect matching exists: $a-2$, $b-3$, $c-1$.

### Hungarian Algorithm (for Minimum-Cost Matching)

Given a cost matrix $C$ where $C_{ij}$ is the cost of assigning worker $i$
to job $j$, find the assignment that minimises total cost.

**Algorithm (pen & paper):**

1. **Row reduction:** Subtract the row minimum from each row.
2. **Column reduction:** Subtract the column minimum from each column.
3. **Cover zeros:** Find the minimum number of lines to cover all zeros.
4. If lines $= n$, an optimal assignment exists among the zeros.
5. Otherwise, find the minimum uncovered value, subtract it from uncovered
   cells, add it to doubly-covered cells. Go to step 3.

**Example:** Cost matrix:

$$C = \begin{pmatrix} 4 & 2 & 8 \\ 3 & 7 & 1 \\ 5 & 3 & 6 \end{pmatrix}$$

Row reduction: subtract min of each row (2, 1, 3):
$$\begin{pmatrix} 2 & 0 & 6 \\ 2 & 6 & 0 \\ 2 & 0 & 3 \end{pmatrix}$$

Column reduction: subtract min of each col (2, 0, 0):
$$\begin{pmatrix} 0 & 0 & 6 \\ 0 & 6 & 0 \\ 0 & 0 & 3 \end{pmatrix}$$

Cover zeros with 2 lines (col 0, col 1). Since $2 < 3$, adjust.
Min uncovered = 3. After adjustment and re-covering, optimal assignment:
Worker 0 $\to$ Job 1 (cost 2), Worker 1 $\to$ Job 2 (cost 1), Worker 2 $\to$ Job 0 (cost 5). Total = 8.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# Left: Bipartite matching
ax1.set_title("Bipartite Matching", fontsize=12)
left = {'a': (0, 2), 'b': (0, 1), 'c': (0, 0)}
right = {'1': (2, 2), '2': (2, 1), '3': (2, 0)}
edges_all = [('a','1'),('a','2'),('b','2'),('b','3'),('c','1')]
matching = [('a','2'),('b','3'),('c','1')]

for u, v in edges_all:
    lw = 3 if (u,v) in matching else 0.8
    color = 'red' if (u,v) in matching else 'lightgray'
    ax1.plot([left[u][0], right[v][0]], [left[u][1], right[v][1]], '-', lw=lw, color=color)
for name, (x, y) in {**left, **right}.items():
    c = 'steelblue' if name in left else 'orange'
    ax1.plot(x, y, 'o', color=c, markersize=25, markeredgecolor='black')
    ax1.text(x, y, name, ha='center', va='center', fontsize=12, fontweight='bold')
ax1.set_xlim(-0.5, 2.5); ax1.set_ylim(-0.5, 2.5); ax1.axis('off')

# Right: Cost matrix with optimal assignment highlighted
ax2.set_title("Hungarian Algorithm: Optimal Assignment", fontsize=12)
C = np.array([[4, 2, 8], [3, 7, 1], [5, 3, 6]])
assignment = [(0, 1), (1, 2), (2, 0)]  # optimal

for i in range(3):
    for j in range(3):
        color = 'lightgreen' if (i, j) in assignment else 'white'
        rect = plt.Rectangle((j, 2-i), 1, 1, facecolor=color, edgecolor='black', lw=1.5)
        ax2.add_patch(rect)
        ax2.text(j+0.5, 2-i+0.5, str(C[i][j]), ha='center', va='center', fontsize=14)

for j in range(3):
    ax2.text(j+0.5, 3.2, f"Job {j}", ha='center', fontsize=10)
for i in range(3):
    ax2.text(-0.3, 2-i+0.5, f"W{i}", ha='center', va='center', fontsize=10)
total = sum(C[i][j] for i,j in assignment)
ax2.text(1.5, -0.3, f"Total cost = {total}", ha='center', fontsize=12, fontweight='bold')
ax2.set_xlim(-0.6, 3.2); ax2.set_ylim(-0.6, 3.5); ax2.set_aspect('equal'); ax2.axis('off')

plt.tight_layout()
plt.savefig("matching_theory.png", dpi=100)
plt.show()
```

## Python Verification

```python
# ── Bipartite matching via augmenting paths ──────────────
def max_bipartite_matching(adj, left_nodes, right_nodes):
    """Find maximum matching using augmenting paths (Hopcroft-Karp simplified)."""
    match_l = {v: None for v in left_nodes}
    match_r = {v: None for v in right_nodes}

    def augment(u, visited):
        for v in adj.get(u, []):
            if v not in visited:
                visited.add(v)
                if match_r[v] is None or augment(match_r[v], visited):
                    match_l[u] = v
                    match_r[v] = u
                    return True
        return False

    matching_size = 0
    for u in left_nodes:
        if augment(u, set()):
            matching_size += 1
    return matching_size, {u: v for u, v in match_l.items() if v is not None}

# Step 1: Example from theory
adj = {'a': ['1','2'], 'b': ['2','3'], 'c': ['1']}
size, matching = max_bipartite_matching(adj, ['a','b','c'], ['1','2','3'])
print(f"Maximum matching size: {size}")
print(f"Matching: {matching}")

# Step 2: Hall's condition check
from itertools import combinations

def halls_condition(adj, left_nodes):
    for k in range(1, len(left_nodes)+1):
        for subset in combinations(left_nodes, k):
            neighbours = set()
            for u in subset:
                neighbours.update(adj.get(u, []))
            if len(neighbours) < len(subset):
                print(f"  VIOLATED: N({subset}) = {neighbours}, |N|={len(neighbours)} < {k}")
                return False
    return True

print(f"\nHall's condition satisfied: {halls_condition(adj, ['a','b','c'])}")

# Step 3: Hungarian algorithm (brute force for small n)
from itertools import permutations
import numpy as np

def hungarian_brute(cost_matrix):
    """Find min-cost assignment by trying all permutations."""
    n = len(cost_matrix)
    best_cost = float('inf')
    best_perm = None
    for perm in permutations(range(n)):
        cost = sum(cost_matrix[i][perm[i]] for i in range(n))
        if cost < best_cost:
            best_cost = cost
            best_perm = perm
    return best_perm, best_cost

C = [[4, 2, 8], [3, 7, 1], [5, 3, 6]]
perm, cost = hungarian_brute(C)
print(f"\nOptimal assignment: {list(enumerate(perm))}")
print(f"Total cost: {cost}")
for i, j in enumerate(perm):
    print(f"  Worker {i} -> Job {j} (cost {C[i][j]})")

# Step 4: Verify with scipy
try:
    from scipy.optimize import linear_sum_assignment
    row_ind, col_ind = linear_sum_assignment(C)
    print(f"\nScipy verification: {list(zip(row_ind, col_ind))}, cost={sum(C[r][c] for r,c in zip(row_ind, col_ind))}")
except ImportError:
    print("\n(scipy not available for verification)")
```

## Connection to CS / Games / AI / Business / Industry

- **Object tracking:** In multi-object tracking (MOT), each frame's detections
  are matched to tracked objects via the Hungarian algorithm on distance costs.
- **Ride-sharing:** Matching riders to drivers minimises total wait time —
  a bipartite assignment problem.
- **Compiler optimisation:** Register allocation can be modelled as a matching
  problem between variables and registers.
- **Game AI:** Assigning units to targets in strategy games uses matching to
  minimise total travel distance.

## Check Your Understanding

1. Show that the bipartite graph with edges $\{a-1, b-1, c-2\}$ violates
   Hall's condition. Which subset $S$ fails?
2. Apply the Hungarian algorithm by hand to the cost matrix
   $\begin{pmatrix} 1 & 4 \\ 3 & 2 \end{pmatrix}$.
3. Reduce the maximum bipartite matching problem to a max-flow problem
   by adding source and sink nodes.
