---
strand: pattern-counting
level: master
order: 5
title: Random Graphs and Threshold Phenomena
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 04-matroids
    description: Matroids
connections:
  - strand-5-pattern-counting-master/06-additive-combinatorics-deeper
applications:
  - cs: "Network science, percolation, randomized algorithms"
  - life: "When is a property generic in random graphs?"
---

# Random Graphs and Threshold Phenomena

## Mental

The **Erdős-Rényi random graph** $G(n, p)$: $n$ vertices, each edge
present independently with probability $p$.

**Sharp threshold phenomenon**: many monotone properties exhibit a
*phase transition* at a critical $p_c(n)$:

- $p \ll p_c$: property fails almost surely.
- $p \gg p_c$: property holds almost surely.

Examples:

- **Connectivity**: $p_c \sim \log n / n$.
- **Giant component**: $p_c \sim 1/n$ (sharp at $1/n$).
- **Hamiltonian cycle**: $p_c \sim \log n / n$.
- **Containing fixed graph $H$**: depends on density of $H$.

## Giant component

For $p = c/n$:

- $c < 1$: largest component has size $O(\log n)$.
- $c > 1$: largest component has size $\Theta(n)$ — the **giant
  component**.
- $c = 1$: critical; giant component starts emerging at scale
  $n^{2/3}$.

The transition is famous; analogous to physical phase transitions.

## Worked example: connectivity threshold

For $G(n, p)$ with $p = c \log n / n$:

- $c < 1$: $P(\text{disconnected}) \to 1$ (some isolated vertex).
- $c > 1$: $P(\text{connected}) \to 1$.

Proof sketch: expected number of isolated vertices $= n (1 - p)^{n-1} \approx n e^{-c \log n} = n^{1-c}$.

If $c < 1$: this $\to \infty$, so by second-moment method some
isolated vertex exists w.h.p.

## Beyond Erdős-Rényi

- **Random regular graphs** $G_{n, d}$: uniform over $d$-regular
  graphs.
- **Configuration model**: prescribed degree sequence.
- **Preferential attachment** (Barabási-Albert): power-law degree
  distribution.
- **Stochastic block model**: communities; clustering recovery
  thresholds (Mossel-Neeman-Sly).

## Interactive

:::widget type=numeric-input prompt="Connectivity threshold in $G(n, p)$: $p_c \\sim \\log n / n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Giant component threshold: $p_c = 1/n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$G(n, p)$ at $p = 1/n$ critical: largest comp $\\sim n^{2/3}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stochastic block model has clustering recovery threshold. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hitting times**: random graph processes (add edges one at a time)
hit each property at a particular time. **Connectivity hitting time
= last isolated vertex disappears** — equivalent to coupon-collector
analysis.

**Janson inequality** (probabilistic method, Strand 5 Advanced
Lesson 06): bounds $P(\text{no copies of }H)$ using a sum over pairs
of copies.

**FKG and BK inequalities**: correlation inequalities controlling
joint behaviour of monotone events.

**Friedgut's theorem**: every monotone property has a sharp
threshold.

## Computational

```python
import random
import numpy as np
from collections import defaultdict

def random_graph(n, p):
    return {(i, j): (random.random() < p) for i in range(n) for j in range(i + 1, n)}

def connected(n, edges):
    """BFS check."""
    if n == 0: return True
    adj = defaultdict(set)
    for (u, v), exists in edges.items():
        if exists:
            adj[u].add(v); adj[v].add(u)
    seen = {0}
    stack = [0]
    while stack:
        x = stack.pop()
        for y in adj[x]:
            if y not in seen:
                seen.add(y); stack.append(y)
    return len(seen) == n

# Threshold demo: G(50, c log 50 / 50) for c = 0.5, 1, 1.5, 2
import math
n = 50
for c in [0.5, 1, 1.5, 2]:
    p = c * math.log(n) / n
    successes = sum(1 for _ in range(100) if connected(n, random_graph(n, p)))
    print(f"c = {c:.1f}, p = {p:.4f}, P(connected) = {successes / 100:.2f}")

# Giant component growth
def largest_component(n, edges):
    seen = set()
    adj = defaultdict(set)
    for (u, v), exists in edges.items():
        if exists:
            adj[u].add(v); adj[v].add(u)
    largest = 0
    for start in range(n):
        if start in seen: continue
        component = set()
        stack = [start]
        while stack:
            x = stack.pop()
            if x in component: continue
            component.add(x)
            for y in adj[x]:
                if y not in component:
                    stack.append(y)
        seen |= component
        largest = max(largest, len(component))
    return largest

for c in [0.5, 1, 1.5, 2]:
    p = c / n
    sizes = [largest_component(n, random_graph(n, p)) for _ in range(100)]
    print(f"c = {c}, mean largest = {np.mean(sizes):.1f}, max = {max(sizes)}")
```

## Applied

- **Network science** — model real networks (web, social, biological)
  via random-graph extensions.
- **Percolation theory** — physics: phase transitions in lattice
  models reflect random-graph thresholds.
- **Distributed computing** — quorum systems, consensus protocols
  use threshold analysis for liveness.
- **Spreading processes** — epidemics, information diffusion,
  cascades on random graphs.
- **Spectral graph theory** — eigenvalues of random graphs (Wigner
  semicircle for adjacency, Marchenko-Pastur for various ensembles).

## Check Your Understanding

:::widget type=numeric-input prompt="$G(n, p)$ Erdős-Rényi: edges independent w.p. $p$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Connectivity threshold: $\\log n / n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Giant component appears at $p = 1/n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Friedgut: every monotone property has sharp threshold. Type 1." answer=1 explain="Yes.":::
