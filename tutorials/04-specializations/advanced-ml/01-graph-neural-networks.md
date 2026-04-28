# Graph Neural Networks — Spectral Convolution

## Intuition

CNNs work on grids (images).  But what about data on **graphs** — social
networks, molecules, citation networks?  GNNs extend the convolution idea to
irregular structures.  A node updates its representation by aggregating
information from its neighbours, like convolution but on a graph.

## Prerequisites

- Tier 1, Lesson 5: Graph Theory
- Tier 7, Lesson 1: 2D Convolution
- Tier 2, Lesson 13: Eigenvalues

## From First Principles

### Message passing (spatial view)

For each node $v$, collect features from neighbours, aggregate, and update:

$$\mathbf{h}_v^{(l+1)} = \sigma\left(\mathbf{W}^{(l)} \cdot \text{AGG}\left(\{\mathbf{h}_u^{(l)} : u \in \mathcal{N}(v)\}\right)\right)$$

AGG = sum, mean, or max over neighbours.

### Graph convolution (GCN)

The simplest GNN layer:

$$\mathbf{H}^{(l+1)} = \sigma\left(\hat{\mathbf{D}}^{-1/2}\hat{\mathbf{A}}\hat{\mathbf{D}}^{-1/2}\mathbf{H}^{(l)}\mathbf{W}^{(l)}\right)$$

where $\hat{\mathbf{A}} = \mathbf{A} + \mathbf{I}$ (adjacency + self-loops), $\hat{\mathbf{D}}$ = degree matrix.

### Spectral view (detailed derivation)

The **graph Laplacian** $\mathbf{L} = \mathbf{D} - \mathbf{A}$ is symmetric positive
semi-definite, so it has an eigendecomposition:

$$\mathbf{L} = \mathbf{U}\mathbf{\Lambda}\mathbf{U}^T$$

Here each matrix has a concrete meaning:

- **$\mathbf{U}$** — columns are eigenvectors of $\mathbf{L}$, forming a "Fourier basis" for
  the graph. The first eigenvector (eigenvalue 0) is constant — it represents the "DC
  component" (global average). Later eigenvectors oscillate more across the graph,
  like higher-frequency sines on a regular grid.

- **$\mathbf{\Lambda}$** — diagonal matrix of eigenvalues $\lambda_1 \le \lambda_2 \le \ldots$.
  Small $\lambda$ = low frequency (smooth signal), large $\lambda$ = high frequency
  (rapidly changing across edges). These are the "graph frequencies."

- **$\mathbf{U}^T x$** — the **Graph Fourier Transform** of signal $x$. It projects
  the node features onto the graph's frequency basis, just as the regular FT projects
  a time signal onto sine/cosine frequencies.

Graph convolution in the spectral domain:

$$g * x = \mathbf{U} \cdot g(\mathbf{\Lambda}) \cdot \mathbf{U}^T x$$

Reading right to left: (1) $\mathbf{U}^T x$ transforms $x$ to the frequency domain,
(2) $g(\mathbf{\Lambda})$ applies a learnable filter (scaling each frequency by a
learned weight — exactly like multiplying in frequency domain), (3) $\mathbf{U}$
transforms back to the spatial domain. This is the convolution theorem on graphs.

**Problem:** Computing $\mathbf{U}$ requires eigendecomposing $\mathbf{L}$, which is
$O(n^3)$. ChebNet approximates $g(\mathbf{\Lambda})$ with Chebyshev polynomials to
avoid this. GCN simplifies further to a first-order approximation, giving the
$\hat{\mathbf{D}}^{-1/2}\hat{\mathbf{A}}\hat{\mathbf{D}}^{-1/2}$ formula above.

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

## Visualisation — Message passing on a small graph

A GNN computes new node features by **averaging features of each
node's neighbours** — message passing. The plot shows a small graph,
the initial random features at each node, and how those features
spread across the graph after one and two layers of message passing.

```python
# ── Visualising GNN message passing ─────────────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# A small graph: 6 nodes, 7 edges. Adjacency list.
N = 6
edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4), (4, 5), (1, 5)]

A = np.zeros((N, N))
for u, v in edges:
    A[u, v] = 1; A[v, u] = 1

# Add self-loops (so each node also keeps its own info).
A_hat = A + np.eye(N)

# Symmetric normalisation: D^{-1/2} A_hat D^{-1/2}.
D = A_hat.sum(axis=1)
D_inv_sqrt = np.diag(1 / np.sqrt(D))
A_norm = D_inv_sqrt @ A_hat @ D_inv_sqrt

# Initial features: each node has a random scalar feature in [0, 1].
features = rng.uniform(0, 1, size=(N, 1))

# After 1 and 2 message-passing steps:
features_1 = A_norm @ features
features_2 = A_norm @ features_1

# Layout the graph in a circle for the plots.
angles = np.linspace(0, 2*np.pi, N, endpoint=False) + np.pi / 2
pos = np.array([[np.cos(a), np.sin(a)] for a in angles])

fig, axes = plt.subplots(1, 3, figsize=(15, 5.5))

def draw_graph(ax, feats, title):
    # Edges first (so nodes draw on top).
    for u, v in edges:
        ax.plot([pos[u, 0], pos[v, 0]], [pos[u, 1], pos[v, 1]],
                color="grey", lw=2, alpha=0.6)
    # Nodes coloured by their feature value.
    sc = ax.scatter(pos[:, 0], pos[:, 1],
                    c=feats.flatten(), cmap="viridis",
                    vmin=0, vmax=1, s=900, edgecolor="black", lw=2, zorder=5)
    for i in range(N):
        ax.text(pos[i, 0], pos[i, 1], f"{feats[i, 0]:.2f}",
                ha="center", va="center", fontsize=10, fontweight="bold",
                color="white" if feats[i, 0] > 0.5 else "black")
    ax.set_xlim(-1.5, 1.5); ax.set_ylim(-1.5, 1.5); ax.set_aspect("equal")
    ax.set_title(title); ax.axis("off")
    plt.colorbar(sc, ax=ax, fraction=0.046)

draw_graph(axes[0], features,    "Initial features (random)")
draw_graph(axes[1], features_1,  "After 1 message-pass\n(node = avg of itself + neighbours)")
draw_graph(axes[2], features_2,  "After 2 message-passes\n(info from 2-hop neighbourhood)")

plt.tight_layout()
plt.show()

# Print the feature values to mirror the picture.
print("Initial features:", features.flatten())
print("After 1 layer:   ", features_1.flatten().round(3))
print("After 2 layers:  ", features_2.flatten().round(3))
print()
print("With each layer, every node's feature gets mixed with one more\n"
      "hop's worth of neighbours. After K layers, a node's representation\n"
      "depends on its K-hop neighbourhood.")
```

**Why GNNs work the way they do:**

- **A GNN layer = neighbour averaging + a non-linearity.** That's
  literally it. Mathematically, $H^{(\ell+1)} = \sigma(\hat A H^{(\ell)}
  W^{(\ell)})$. The depth controls the *receptive field on the graph*
  — after $K$ layers each node has aggregated information from its
  $K$-hop neighbourhood.
- **Different aggregation rules give different GNNs.** GCN uses
  symmetric-normalised mean (lesson 1's formula); GraphSAGE uses
  arbitrary aggregators (mean / max / LSTM); GAT uses
  attention-weighted means; Graph Transformers use full attention
  over all node pairs.
- **Real GNN deployments are huge.** Pinterest's PinSage runs on a
  graph with 3 billion nodes and 18 billion edges. Drug-discovery GNNs
  (AlphaFold, DiffDock) treat molecules as graphs of atoms; social-
  graph fraud detection treats accounts and transactions as graph
  nodes and edges.

## Connection to CS / Games / AI

- **Drug discovery** — molecules are graphs (atoms = nodes, bonds = edges); GNNs predict drug properties
- **Social networks** — node classification (detect bots), link prediction (friend recommendations)
- **Recommendation systems** — user-item interaction graphs; GNNs power Pinterest and Uber Eats recommendations
- **Game AI** — navigation meshes as graphs; GNNs for pathfinding and spatial reasoning
- **Traffic prediction** — road networks as graphs; GNNs predict congestion (Google Maps)
- **Code analysis** — abstract syntax trees and control flow graphs; GNNs for bug detection

## Check Your Understanding

1. **Pen & paper:** For a path graph 1—2—3 (not fully connected), compute one step of mean message passing with features $[1, 0, 1]$.
2. **Think about it:** Why is over-smoothing a problem, and how do skip connections help?
3. **Pen & paper:** For the triangle graph with $\mathbf{A} = \begin{pmatrix} 0 & 1 & 1 \\ 1 & 0 & 1 \\ 1 & 1 & 0 \end{pmatrix}$, compute the graph Laplacian $\mathbf{L} = \mathbf{D} - \mathbf{A}$ and verify that $\mathbf{L}$ has eigenvalue 0 with eigenvector $(1, 1, 1)^T / \sqrt{3}$ (the constant vector).
