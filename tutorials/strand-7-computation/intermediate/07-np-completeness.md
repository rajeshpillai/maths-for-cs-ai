---
strand: computation
level: intermediate
order: 7
title: NP-Completeness and Reductions
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 06-complexity-classes
    description: Complexity classes
connections:
  - strand-7-computation-intermediate/08-automata-and-regex
applications:
  - cs: "Recognising hard problems and choosing approximations"
  - life: "Why some problems resist all attempts at fast algorithms"
---

# NP-Completeness and Reductions

## Explain Like I Am 7

Imagine a *boss puzzle* so sneaky that solving it would magically
solve a whole pile of other tough puzzles too.  Show me a fast trick
for the boss puzzle and I can quietly translate any other tough puzzle
*into* the boss, run your trick, and translate the answer back.  The
**NP-complete** puzzles are exactly these bosses — and we know
hundreds of them, all secretly the same puzzle wearing different
costumes.  Crack one and you crack them all; nobody yet knows whether
that's possible.

## Mental

A polynomial-time **reduction** $A \le_p B$ transforms instances of
$A$ into instances of $B$ in polynomial time, preserving yes/no
answers. If you can solve $B$, you can solve $A$.

A problem $B$ is **NP-complete** if:

1. $B \in $ NP.
2. Every problem $A \in $ NP satisfies $A \le_p B$.

Cook-Levin gave us 3-SAT as the *first* NP-complete problem.
Showing other problems are NP-complete uses the chain rule for
reductions: if $A$ is NP-complete and $A \le_p C$, then $C$ is also
NP-hard.

## A small zoo of NP-complete problems

| Problem | Reduction from |
|---|---|
| 3-SAT | (Cook-Levin direct) |
| Independent Set | 3-SAT |
| Clique | Independent Set (complement graph) |
| Vertex Cover | Independent Set |
| Hamiltonian Cycle | 3-SAT (involved) |
| TSP (decision) | Hamiltonian Cycle |
| Subset Sum | 3-SAT |
| Knapsack (decision) | Subset Sum |
| Graph Coloring (3-color) | 3-SAT |

Hundreds more known. Karp's 1972 paper listed 21; today the
Garey-Johnson book has thousands.

## Worked reduction: Independent Set $\le_p$ Vertex Cover

**Claim**: $G$ has an independent set of size $\ge k$ iff $G$ has a
vertex cover of size $\le n - k$, where $n = |V|$.

**Proof**. The complement of an independent set is a vertex cover
(every edge has at least one endpoint outside the IS, so inside
the cover). Vice versa.

Reduction: given $(G, k)$ for IS, output $(G, n - k)$ for VC. Same
graph, different parameter. Polynomial transformation. ✓

## What to do when your problem is NP-complete

Don't despair — practical strategies:

1. **Approximation algorithms** — find a solution within $k\times$
   optimal in polynomial time. Vertex cover has a 2-approximation;
   TSP has a 1.5-approximation (Christofides) for metric instances.
2. **Randomization** — Monte Carlo and Las Vegas algorithms can
   sometimes give expected-polynomial-time solutions.
3. **Parameterized complexity** — fix one parameter (e.g., treewidth)
   and seek $f(k) \cdot n^c$ algorithms.
4. **Heuristics** — simulated annealing, genetic algorithms,
   tabu search, local search.
5. **SAT/SMT solvers** — modern tools (Z3, MiniSat) handle huge
   industrial instances surprisingly well.
6. **Special-case solvers** — many "NP-hard" problems become easy on
   restricted inputs (e.g., 2-SAT is in P).

## Interactive

:::widget type=numeric-input prompt="If $A \\le_p B$ and $B \\in P$, then $A \\in ?$. Type 1 for P, 2 for NP." answer=1 explain="P.":::

:::widget type=numeric-input prompt="3-SAT is NP-complete. 2-SAT is in $?$. Type 1 for P, 2 for NP-complete." answer=1 explain="P.":::

:::widget type=numeric-input prompt="Vertex cover 2-approximation: take both endpoints of any edge while uncovered, repeat. Approximation ratio $\\le ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Karp's 1972 paper introduced 21 NP-complete problems. Type 21." answer=21 explain="$21$.":::

## Symbolic

**Approximation hardness**: some NP-complete problems can't even be
approximated unless P = NP. Examples:

- **MaxClique** — no polynomial-time approximation within $n^{1-\epsilon}$
  unless P = NP (Håstad).
- **TSP (general)** — no constant-factor approximation unless P = NP.
- **Set cover** — no $(1 - o(1)) \ln n$ approximation unless P = NP.

**PCP theorem** (1992) — unifies many approximation-hardness results
via probabilistically checkable proofs.

**ETH** (Exponential Time Hypothesis) — 3-SAT requires $2^{\Omega(n)}$
time. Stronger than P ≠ NP; rules out subexponential algorithms.

## Computational

```python
# Reduction: Independent Set -> Vertex Cover
def is_to_vc(G_edges, n, k_is):
    return G_edges, n - k_is

# Brute-force vertex cover (for tiny instances)
import itertools

def vertex_cover(edges, n, k):
    for subset in itertools.combinations(range(n), k):
        S = set(subset)
        if all(u in S or v in S for u, v in edges):
            return list(subset)
    return None

# Triangle: edges {(0,1),(1,2),(0,2)}, n=3
edges = [(0, 1), (1, 2), (0, 2)]
print(vertex_cover(edges, 3, 2))    # any 2 vertices work

# 2-approximation algorithm (much faster, can be 2x optimum)
def vc_2approx(edges):
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:
            cover.add(u); cover.add(v)
    return cover

print(vc_2approx(edges))            # {0, 1} or {0, 2} — at most 2x opt
```

## Applied

- **Industrial scheduling** — most planning problems are NP-hard.
  CPLEX and Gurobi solve very large instances using sophisticated
  heuristics + LP relaxations + branch-and-cut.
- **Compiler register allocation** — graph coloring on the
  interference graph; chordal-graph special case is in P.
- **VLSI design** — placement and routing are NP-hard; industry
  uses simulated annealing and force-directed methods.
- **Cryptanalysis** — breaking lattice-based crypto reduces to
  approximation versions of hard lattice problems.
- **Bioinformatics** — multiple sequence alignment and phylogeny
  reconstruction are NP-hard; tools use heuristics with guarantees
  on special cases.

## Check Your Understanding

:::widget type=numeric-input prompt="If A reduces to B in poly time and B is in P, then A is in P. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="2-SAT is in P; 3-SAT is NP-complete. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A 2-approximation algorithm gives a solution at most $2 \\times$ optimum. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="If a single NP-complete problem has a polynomial algorithm, then P = NP. Type 1." answer=1 explain="Yes.":::
