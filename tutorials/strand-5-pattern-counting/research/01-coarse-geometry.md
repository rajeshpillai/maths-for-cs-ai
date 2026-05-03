---
strand: pattern-counting
level: research
order: 1
title: Coarse Geometry and Expanders
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 00-geometric-group-theory
    description: Geometric group theory
connections:
  - strand-5-pattern-counting-research/02-knot-invariants-frontier
applications:
  - cs: "Expander graph constructions, distributed computing, codes"
  - life: "Geometry preserved up to bounded distortion"
---

# Coarse Geometry and Expanders

## Mental

**Coarse geometry**: study spaces *up to bounded perturbations*.
Quasi-isometries (Lesson 00) are coarse-geometry equivalences.

**Expander graphs**: $d$-regular graphs $G$ with **spectral gap**
bounded away from 0. Equivalently, every vertex set $S$ with
$|S| \le |V|/2$ has many edges leaving — *high expansion*.

## Cheeger inequality

For $d$-regular $G$ with normalised Laplacian $\mathcal L = I - A/d$:

$$
\frac{\lambda_2}{2} \le h(G) \le \sqrt{2 \lambda_2 d},
$$

where $h(G)$ is the **Cheeger / edge expansion** constant.

Spectral gap → expansion → mixing rate of random walks.

## Ramanujan graphs

A graph is **Ramanujan** if non-trivial eigenvalues
$\le 2\sqrt{d - 1}$ — *optimal* spectral expansion.

Lubotzky-Phillips-Sarnak (1988): explicit construction via
$\mathrm{PSL}_2(\mathbb F_q)$. Marcus-Spielman-Srivastava (2015):
existence via interlacing polynomials (settled long-standing open
question).

## Worked example: Cayley expanders

For $\mathrm{SL}_2(\mathbb F_p)$ with two random generators:

Cayley graph is an expander with spectral gap $\sim 1/\log p$.

Used for *explicit pseudorandomness* — derandomisation, codes,
distributed-computing primitives.

## Interactive

:::widget type=numeric-input prompt="Cheeger: spectral gap ↔ edge expansion. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ramanujan graphs: optimal expansion bound $2\\sqrt{d-1}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lubotzky-Phillips-Sarnak constructed Ramanujan graphs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Marcus-Spielman-Srivastava 2015 settled existence via interlacing. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Property (T)** (Kazhdan): rigidity property of groups; Cayley
graphs of (T) groups are expanders.

**Coarse embeddings into Hilbert space**: links to Novikov
conjecture and assembly maps in topology.

**Asymptotic dimension** + finite-asymptotic-dim implies many
desirable properties (e.g., coarse Baum-Connes).

**Zigzag product** (Reingold-Vadhan-Wigderson 2002): combinatorial
construction of expanders without spectral analysis.

## Computational

```python
import numpy as np
import networkx as nx

# Build random regular graph and compute spectral gap
def random_regular_expander(n, d):
    G = nx.random_regular_graph(d, n)
    A = nx.adjacency_matrix(G).toarray()
    eigs = np.linalg.eigvalsh(A)
    second = sorted(eigs)[-2]
    return G, second

n, d = 100, 5
G, lam2 = random_regular_expander(n, d)
print(f"Random {d}-regular on {n} nodes: λ_2 = {lam2:.4f}")
print(f"Ramanujan bound: 2√(d-1) = {2 * np.sqrt(d - 1):.4f}")

# Cheeger constant via min cut
def cheeger_constant(G):
    n = G.number_of_nodes()
    best = float('inf')
    # Brute-force approach over small graphs
    for k in range(1, n // 2 + 1):
        # Sample some k-subsets
        from itertools import combinations
        for S in combinations(range(n), k):
            S = set(S)
            edges_out = sum(1 for u in S for v in G.neighbors(u) if v not in S)
            ratio = edges_out / len(S)
            best = min(best, ratio)
    return best

print(f"Cheeger constant (estimated): {cheeger_constant(G):.4f}")
```

## Applied

- **Pseudorandom generators** — explicit expanders give
  derandomisation.
- **Error-correcting codes** — Sipser-Spielman codes from expanders.
- **Distributed computing** — gossip protocols mix faster on
  expanders.
- **Fast algorithms** — Spielman-Teng nearly-linear-time SDD solvers
  use expanders.
- **Property (T)** in cryptography — group-action assumptions for
  PQ schemes related to expander structure.

## Check Your Understanding

:::widget type=numeric-input prompt="Expander: spectral gap bounded from 0. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cheeger: $\\lambda_2/2 \\le h \\le \\sqrt{2 \\lambda_2 d}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ramanujan: $\\lambda \\le 2\\sqrt{d-1}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Zigzag product (Reingold-Vadhan-Wigderson 2002). Type 1." answer=1 explain="Yes.":::
