# Graph Neural Networks — Spectral Convolution

## Intuition

CNNs work on grids (images).  But what about data on **graphs** — social
networks, molecules, citation networks?  GNNs extend the convolution idea to
irregular structures.  A node updates its representation by aggregating
information from its neighbours, like convolution but on a graph.

## Prerequisites

- Tier 1, Lesson 5: Graph Theory
- Tier 7, Lesson 1: 2D Convolution
- Tier 2, Lesson 9: Eigenvalues

## From First Principles

### Message passing (spatial view)

For each node $v$, collect features from neighbours, aggregate, and update:

$$\mathbf{h}_v^{(l+1)} = \sigma\left(\mathbf{W}^{(l)} \cdot \text{AGG}\left(\{\mathbf{h}_u^{(l)} : u \in \mathcal{N}(v)\}\right)\right)$$

AGG = sum, mean, or max over neighbours.

### Graph convolution (GCN)

The simplest GNN layer:

$$\mathbf{H}^{(l+1)} = \sigma\left(\hat{\mathbf{D}}^{-1/2}\hat{\mathbf{A}}\hat{\mathbf{D}}^{-1/2}\mathbf{H}^{(l)}\mathbf{W}^{(l)}\right)$$

where $\hat{\mathbf{A}} = \mathbf{A} + \mathbf{I}$ (adjacency + self-loops), $\hat{\mathbf{D}}$ = degree matrix.

### Spectral view

The **graph Laplacian** $\mathbf{L} = \mathbf{D} - \mathbf{A}$ has eigenvectors that form a "Fourier basis" for the graph.

Graph convolution in the spectral domain:

$$g * x = \mathbf{U} \cdot g(\mathbf{\Lambda}) \cdot \mathbf{U}^T x$$

where $\mathbf{L} = \mathbf{U}\mathbf{\Lambda}\mathbf{U}^T$.

### Pen & paper: Simple message passing

Triangle graph (3 nodes, all connected):

$\mathbf{A} = \begin{pmatrix} 0 & 1 & 1 \\ 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}$, features $\mathbf{h} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$

Mean aggregation: node 0 gets mean of neighbours 1, 2: $(2+3)/2 = 2.5$.

After one step (mean of self + neighbours):

Node 0: $(1 + 2 + 3)/3 = 2$, Node 1: $(1+2+3)/3 = 2$, Node 2: $(1+2+3)/3 = 2$

All nodes converge toward the global mean — this is **over-smoothing** (a known GNN problem).

## Python Verification

```python
# ── Graph Neural Networks ───────────────────────────────────

# Simple message passing on a triangle
print("=== Message passing on triangle ===")
A = [[0,1,1],[1,0,1],[1,1,0]]
h = [1.0, 2.0, 3.0]

for step in range(4):
    print(f"  Step {step}: h = {[f'{v:.2f}' for v in h]}")
    h_new = []
    for i in range(3):
        neighbours = [h[j] for j in range(3) if A[i][j] == 1]
        h_new.append((h[i] + sum(neighbours)) / (1 + len(neighbours)))
    h = h_new
print(f"  Over-smoothing: all values converge to {sum([1,2,3])/3:.2f}")

# GCN-style: normalised adjacency
print(f"\n=== GCN normalisation ===")
import math
A_hat = [[A[i][j] + (1 if i==j else 0) for j in range(3)] for i in range(3)]  # A + I
D_hat = [sum(row) for row in A_hat]  # degree
D_inv_sqrt = [1/math.sqrt(d) for d in D_hat]

# D^{-1/2} A_hat D^{-1/2}
A_norm = [[D_inv_sqrt[i] * A_hat[i][j] * D_inv_sqrt[j] for j in range(3)] for i in range(3)]
print("Normalised adjacency:")
for row in A_norm:
    print(f"  {[f'{v:.3f}' for v in row]}")
```

## Check Your Understanding

1. **Pen & paper:** For a path graph 1—2—3 (not fully connected), compute one step of mean message passing with features $[1, 0, 1]$.
2. **Think about it:** Why is over-smoothing a problem, and how do skip connections help?
