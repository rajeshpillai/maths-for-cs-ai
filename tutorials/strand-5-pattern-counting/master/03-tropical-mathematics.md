---
strand: pattern-counting
level: master
order: 3
title: Tropical Mathematics
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 02-cluster-algebras
    description: Cluster algebras
connections:
  - strand-5-pattern-counting-master/04-matroids
applications:
  - cs: "Optimisation, phylogenetics, Viterbi-style algorithms"
  - life: "Algebra where (min, +) replaces (+, ×)"
---

# Tropical Mathematics

## Explain Like I Am 7

In ordinary math you add and multiply.  In **tropical** math you
swap them out — "plus" becomes "take the smaller of two numbers,"
and "times" becomes the usual plus.  Suddenly $3 \oplus 5 = 3$ and
$3 \otimes 5 = 8$.  Tropical polynomials draw piecewise straight
lines instead of smooth curves, and their *zeros* are the corners
where the line bends.  This funny algebra turns out to be the right
language for shortest-path puzzles, evolutionary tree-building, and
some kinds of optimisation that use only mins and pluses.

## Mental

**Tropical semiring** $\mathbb T = \mathbb R \cup \{+\infty\}$ with
operations:

- $a \oplus b = \min(a, b)$.
- $a \otimes b = a + b$.
- Identities: $\infty$ for $\oplus$, $0$ for $\otimes$.

Tropical algebra preserves *most* algebraic structure: distributive,
associative, commutative. *No additive inverses* — semiring, not
ring.

## Tropical polynomials

A tropical polynomial $f(x) = a_0 \oplus a_1 x \oplus a_2 x^2 \oplus \ldots$
is, in usual notation, $\min_i (a_i + i x)$ — a **piecewise-linear,
concave** function.

Roots: points where the minimum is achieved twice (or more) — the
*corners* of the piecewise-linear graph.

## Tropical curves

A **tropical curve** in $\mathbb R^2$ is the locus where a tropical
polynomial in two variables changes "active" piece — a finite
graph (union of line segments and rays) with rational slopes,
satisfying balancing conditions at each vertex.

Tropical curves are *combinatorial shadows* of classical algebraic
curves.

## Worked example

$f(x) = \min(0, x, 2x - 3)$ — tropical polynomial.

- Active "0" when $x \le 0$.
- Active "$x$" when $0 \le x \le 3$.
- Active "$2x - 3$" when $x \ge 3$.

Two corners: $x = 0$ and $x = 3$. Tropical roots.

## Interactive

:::widget type=numeric-input prompt="Tropical $a \\oplus b = \\min(a, b)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical $a \\otimes b = a + b$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical polynomials are piecewise-linear concave. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$3 \\oplus 5 \\otimes 2 = 3 \\oplus 7 = 3$. Type 3." answer=3 explain="$3$.":::

## Symbolic

**Tropical geometry** studies tropical varieties — graphs/polytopes
arising as solution sets. Connected to:

- **Algebraic geometry** via "logarithmic limit" / Maslov dequantisation.
- **Convex geometry** via duality with Newton polytopes.
- **Optimisation** — shortest paths, scheduling, eigenvalue
  problems.

**Maslov dequantisation**: take logs and rescale: classical
arithmetic limits to tropical as base $\to \infty$. Justifies
"tropicalisation" of algebraic varieties.

**Tropical eigenvalue**: solve $A \otimes \mathbf x = \lambda \otimes \mathbf x$
where $A$ is a tropical matrix. Solutions characterise
shortest-path eigenvalues — Bellman-Ford style.

## Computational

```python
import numpy as np

# Tropical matrix multiplication: (A ⊗ B)_{ij} = min_k (A_{ik} + B_{kj})
def tropical_matmul(A, B):
    n, m = A.shape
    _, p = B.shape
    C = np.full((n, p), np.inf)
    for i in range(n):
        for j in range(p):
            C[i, j] = min(A[i, k] + B[k, j] for k in range(m))
    return C

# Adjacency matrix: tropical powers compute shortest paths!
A = np.array([
    [0, 2, np.inf, 6],
    [np.inf, 0, 3, np.inf],
    [np.inf, np.inf, 0, 1],
    [np.inf, np.inf, np.inf, 0],
], dtype=float)

A2 = tropical_matmul(A, A)
A3 = tropical_matmul(A2, A)
print("A:", A)
print("A^2 (tropical):", A2)
print("A^3 (tropical):", A3)
# A^k_{ij} = shortest path of length ≤ k from i to j

# Tropical polynomial roots: find corner points of min(linear pieces)
def tropical_poly_roots(coeffs, x_range=(-10, 10)):
    """Find x where min_i (a_i + i*x) changes minimum index."""
    pieces = [(a, i) for i, a in enumerate(coeffs)]
    xs = []
    # Find corners: where two pieces equal & both achieve min
    for i, (ai, ki) in enumerate(pieces):
        for j, (aj, kj) in enumerate(pieces):
            if i < j and ki != kj:
                x = (ai - aj) / (kj - ki)
                # check if at x, this min is achieved by both
                vals = [a + k * x for a, k in pieces]
                if min(vals) == ai + ki * x and min(vals) == aj + kj * x:
                    if x_range[0] < x < x_range[1]:
                        xs.append(x)
    return sorted(set(xs))

print(tropical_poly_roots([0, 1, 2 - 3 / 1.0]))   # demo
```

## Applied

- **Optimisation** — Hitchcock transportation, scheduling, control
  use tropical matrix algebra for shortest paths and bottlenecks.
- **Phylogenetics** — distances in evolutionary trees naturally form
  tropical metrics.
- **Viterbi algorithm** — sum-of-logs becomes (max, +) tropical
  algebra; HMM decoding.
- **Mirror symmetry** — tropical curves are degenerations of
  algebraic curves; appear in mirror symmetry computations
  (Mikhalkin's correspondence theorem).
- **Statistical learning** — tropical-style "max-affine" function
  approximation (ReLU networks are tropical polynomials!).

## Check Your Understanding

:::widget type=numeric-input prompt="Tropical $\\oplus$ = min, $\\otimes$ = +. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical matrix powers compute shortest paths. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ReLU networks are tropical polynomials in disguise. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical roots: piecewise-linear corners. Type 1." answer=1 explain="Yes.":::
