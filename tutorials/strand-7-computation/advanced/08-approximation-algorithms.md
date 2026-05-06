---
strand: computation
level: advanced
order: 8
title: Approximation Algorithms
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 07-network-flow-advanced
    description: Network flow advanced
connections:
  - strand-7-computation-advanced/09-computation-capstone-3
applications:
  - cs: "Practical NP-hard problem solving with provable guarantees"
  - life: "When 'not optimal but close' is good enough"
---

# Approximation Algorithms

## Explain Like I Am 7

Imagine you're packing a school lunch and it would take a *month* to
work out the absolute best snack choice.  Instead, a clever rule
promises: "you'll never end up with worse than twice the best lunch,
and I can pick one in five seconds."  Sometimes the rule even
promises "I'll get within one percent if you give me a little more
time."  These speedy *almost-best* recipes are how huge real-world
puzzles — packing trucks, drawing routes, scheduling factories — get
solved in time for tea.

## Mental

For NP-hard problems, we accept polynomial-time solutions that are
*provably close* to optimal. An algorithm has **approximation ratio
$\alpha$** if its output is within factor $\alpha$ of optimal for
every instance.

| Type | Performance |
|---|---|
| Constant-factor: $\alpha = 2$ | Within 2× optimal |
| Logarithmic: $\alpha = O(\log n)$ | $\log$-factor of optimal |
| PTAS (polynomial-time approximation scheme) | $1 + \epsilon$ for any $\epsilon$, runs in $\mathrm{poly}(n)$ for fixed $\epsilon$ |
| FPTAS | Same, but poly in $1/\epsilon$ too |
| APX-hard | No PTAS unless P = NP |

## Worked example: vertex cover 2-approximation

Algorithm: while there's an uncovered edge $(u, v)$, add **both** $u$
and $v$ to the cover. Time $O(V + E)$.

**Claim**: this gives $\le 2 \cdot \mathrm{OPT}$.

**Proof**: edges added are pairwise non-adjacent, forming a matching
$M$. Optimal cover must include at least one endpoint of each matching
edge: $|\mathrm{OPT}| \ge |M|$. Algorithm produces $2|M|$ vertices.
$2|M| \le 2 |\mathrm{OPT}|$.

## Worked example: TSP 1.5-approximation (Christofides)

For metric TSP (triangle inequality):

1. Compute MST $T$.
2. Compute minimum-weight perfect matching $M$ on the odd-degree
   vertices of $T$.
3. Combined multigraph $T \cup M$ has all even degrees → has Eulerian
   circuit.
4. Shortcut Eulerian circuit to a Hamiltonian tour.

**Tour length** $\le 1.5 \cdot \mathrm{OPT}$. The bound depends on
metric (triangle inequality).

## Hardness of approximation

Some problems are **APX-hard** — no PTAS unless P = NP. Examples:

- **MAX-3SAT**: 7/8-approximation easy; better is APX-hard.
- **TSP (general, not metric)**: no constant approximation unless
  P = NP.
- **Set cover**: $\ln n$ approximation (greedy); better APX-hard
  unless P = NP.

The **PCP theorem** (1992) gave the framework for proving
approximation hardness — among the most important results in
theoretical CS.

## Interactive

:::widget type=numeric-input prompt="Vertex cover 2-approximation ratio: $\\alpha = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Christofides for metric TSP: ratio $1.5$. Type 1.5." answer=1.5 explain="$1.5$.":::

:::widget type=numeric-input prompt="Set-cover greedy gives $H_n \\sim \\log n$ approximation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PTAS achieves $1 + \\epsilon$ for any $\\epsilon > 0$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Linear-programming relaxation**: replace integer constraints with
fractional. Solve LP optimally; round the LP solution to integer.
Rounding bounds give approximation ratios.

**Primal-dual schema**: build feasible primal and dual solutions
together; their values bound each other.

**Semidefinite programming (SDP)**: relax further to PSD-matrix
constraints. Goemans-Williamson MAX-CUT achieves $\sim 0.878$
approximation via SDP — exact ratio depends on the Unique Games
Conjecture.

## Computational

```python
import networkx as nx

# Vertex cover 2-approximation
def vertex_cover_2approx(G):
    cover = set()
    edges_remaining = list(G.edges())
    used = set()
    for u, v in edges_remaining:
        if u in used or v in used: continue
        cover.add(u); cover.add(v)
        used.add(u); used.add(v)
    return cover

G = nx.cycle_graph(6)
print(vertex_cover_2approx(G))         # any 2 non-adjacent edges' endpoints

# TSP via NetworkX (heuristic)
G = nx.random_geometric_graph(20, 0.5)
for u, v, data in G.edges(data=True):
    data['weight'] = ((G.nodes[u]['pos'][0] - G.nodes[v]['pos'][0])**2 +
                      (G.nodes[u]['pos'][1] - G.nodes[v]['pos'][1])**2)**0.5

# Christofides if available, else greedy
try:
    tour = nx.approximation.christofides(G)
    print(len(tour))
except: pass

# Set cover greedy
def set_cover_greedy(universe, sets):
    elements = set(universe)
    chosen = []
    while elements:
        best = max(sets, key=lambda S: len(S & elements))
        chosen.append(best)
        elements -= best
    return chosen

print(set_cover_greedy({1,2,3,4,5}, [{1,2,3}, {3,4,5}, {1,4}]))   # 2 sets
```

## Applied

- **VLSI floorplanning** — TSP-like routing for chip wiring uses
  Christofides-style approximations.
- **Vehicle routing** (logistics) — TSP variants, vehicle-routing
  problems heavily use approximation + heuristics.
- **Database join ordering** — NP-hard in general; query optimisers
  use cost-based heuristics with approximation bounds.
- **Facility location** — set-cover-like problems in network design,
  warehouse placement.
- **Computational biology** — multiple sequence alignment, phylogeny
  reconstruction with PTAS / FPTAS for restricted instances.

## Check Your Understanding

:::widget type=numeric-input prompt="Vertex cover 2-approximation: $\\alpha = 2$. Type 2." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Christofides metric TSP: $\\alpha = 1.5$. Type 1.5." answer=1.5 explain="$1.5$.":::

:::widget type=numeric-input prompt="Set-cover greedy: $\\alpha = O(\\log n)$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PCP theorem proves approximation hardness for many problems. Type 1." answer=1 explain="Yes.":::
