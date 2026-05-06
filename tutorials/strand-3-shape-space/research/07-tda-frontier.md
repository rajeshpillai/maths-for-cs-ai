---
strand: shape-space
level: research
order: 7
title: TDA Frontier — Persistent Homotopy
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 06-symplectic-frontier
    description: Symplectic frontier
connections:
  - strand-3-shape-space-research/08-optimal-transport-geometry
applications:
  - cs: "Persistent ML, time-evolving data analysis"
  - life: "Topology of streaming and dynamic data"
---

# TDA Frontier — Persistent Homotopy

## Explain Like I Am 7

Sprinkle a bunch of dots on the table, then slowly grow a balloon
around each one.  As the balloons get bigger, neighbours start
overlapping and forming bigger and bigger blobs — sometimes with
holes!  Some holes pop into existence early then close up; others
hang around forever.  **Persistent homotopy** is the frontier
craft of deciding *which* holes are real features of your dot-cloud
and which are just lucky-balloon coincidences, helping computers
spot real patterns inside messy data.

## Mental

Strand 2 Advanced Lesson 09 introduced **persistent homology**.
Active research extends it to:

- **Persistent cohomology with cup products** — richer ring-valued
  descriptors.
- **Persistent homotopy groups** — beyond homology, capture more
  topology.
- **Multidimensional persistence** — filtrations parameterised by
  $\mathbb R^n$ instead of $\mathbb R$.
- **Quiver representations**: classify multidim persistence modules.

## Multidimensional persistence

For 2-parameter filtration $K_{s, t}$:

$$
H_*(K_{s, t}) = \text{a } \mathbb R^2\text{-graded module}.
$$

Unlike 1D, **no barcode classification** in higher dim — the
representation theory is *wild*.

Carlsson-Zomorodian (2009): introduced multidim persistence.
Algorithmic invariants: rank invariant, multi-graded Betti.

## Stability theorems

**Stability**: small perturbations of input → small change in
barcode (Cohen-Steiner-Edelsbrunner-Harer 2007).

For multidim: stability via *interleaving distance* (Lesnick 2015).

## TDA + Machine Learning

- **Persistence images** (Adams et al.): vectorise barcodes for ML.
- **PersLay** (Carriere et al.): differentiable layers on
  persistence diagrams.
- **Topological autoencoders**: regularise representations to
  preserve topological features.
- **TopoAttn**: attention modules using persistent homology.

## Interactive

:::widget type=numeric-input prompt="Persistent homology: barcode invariant. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Multidim persistence: no general barcode classification. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stability theorem (Cohen-Steiner et al. 2007). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Persistence images / PersLay vectorise barcodes for ML. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Reeb graphs**: simplification of complicated topological structures
to a graph; track persistent local features.

**Mapper algorithm** (Singh-Mémoli-Carlsson 2007): cluster + cover
to produce simplicial-complex summary of point clouds. Used in
biology, finance.

**Sheaf cohomology applications**: persistent sheaves encode multi-
parameter dependent data.

**Persistent local systems / linear representations**: extending
Floer / Morse-style invariants persistently.

## Computational

```python
# Persistent homology via gudhi or ripser
try:
    import gudhi
    # Random point cloud
    import numpy as np
    points = np.random.randn(50, 2)

    # Build Vietoris-Rips complex
    rips = gudhi.RipsComplex(points=points, max_edge_length=2.0)
    simplex_tree = rips.create_simplex_tree(max_dimension=2)

    # Compute persistence
    persistence = simplex_tree.persistence()
    # Each (dim, (birth, death)) pair
    for dim, (b, d) in persistence[:10]:
        print(f"H_{dim}: birth={b:.3f}, death={d:.3f if d != float('inf') else '∞'}")
except ImportError:
    print("gudhi not installed")

# Manual: compute Betti numbers via boundary matrix ranks
import numpy as np

def betti(boundary_matrices):
    """Compute Betti numbers from boundary maps."""
    # b_n = dim ker d_n - dim im d_{n+1}
    # = rank of d_n - 0 + ... (simplified for demo)
    pass

# Sketch: compute connected components
def connected_components(adjacency):
    n = len(adjacency)
    visited = [False] * n
    count = 0
    for i in range(n):
        if not visited[i]:
            count += 1
            stack = [i]
            while stack:
                v = stack.pop()
                if visited[v]: continue
                visited[v] = True
                for j in range(n):
                    if adjacency[v][j] and not visited[j]:
                        stack.append(j)
    return count

A = [[0, 1, 0], [1, 0, 0], [0, 0, 0]]
print(f"Connected components: {connected_components(A)}")  # 2
```

## Applied

- **Cancer / tumour shape analysis** — persistent topology features
  classify aggressive vs benign.
- **Materials science** — porous-material analysis via persistent
  topology.
- **Finance** — market regime detection via persistent volatility
  topology.
- **Neuroscience** — brain-network analysis via persistent cohomology.
- **Physics** — phase-transition detection via persistent topology.

## Check Your Understanding

:::widget type=numeric-input prompt="Multidimensional persistence: wild representation theory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stability theorem: bottleneck distance bounded by perturbation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mapper algorithm summarises point clouds. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Persistence + ML active research direction. Type 1." answer=1 explain="Yes.":::
