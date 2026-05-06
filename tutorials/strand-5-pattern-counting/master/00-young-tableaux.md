---
strand: pattern-counting
level: master
order: 0
title: Young Tableaux and the Symmetric Group
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 09-pattern-counting-capstone-3
    description: Pattern & counting advanced capstone
connections:
  - strand-5-pattern-counting-master/01-symmetric-functions
applications:
  - cs: "Combinatorial physics, integrable systems, RSK in algorithms"
  - life: "Boxes-with-numbers that classify symmetry"
---

# Young Tableaux and the Symmetric Group

## Explain Like I Am 7

Picture a staircase of square boxes — six boxes in the bottom row,
four boxes above, three above that.  Drop the numbers $1$ through
$13$ into the boxes so each row grows from left to right and each
column grows from top to bottom.  Each valid filling is a **Young
tableau**, and counting how many fillings exist is a famously deep
puzzle.  Amazingly, you can compute it from a tiny "hook" rule —
each box looks at the boxes to its right and below itself, and a
single tidy formula tumbles out.

## Mental

A **partition** $\lambda = (\lambda_1 \ge \lambda_2 \ge \ldots \ge \lambda_k > 0)$ of $n$:
$\sum \lambda_i = n$. Visualised as a **Young diagram**: rows of
$\lambda_i$ boxes.

A **standard Young tableau (SYT)** of shape $\lambda$: fill boxes
with $1, \ldots, n$ such that rows are increasing left-to-right and
columns increasing top-to-bottom.

A **semistandard Young tableau (SSYT)**: weak-increasing rows,
strict-increasing columns, with entries from any alphabet.

## Hook length formula

$f^\lambda$ = number of SYT of shape $\lambda$. **Frame-Robinson-
Thrall**:

$$
f^\lambda = \frac{n!}{\prod_{(i, j) \in \lambda} h(i, j)},
$$

where $h(i, j)$ = "hook length" at cell $(i, j)$ = (boxes to the
right) + (boxes below) + 1.

Stunningly clean formula for a counting problem with no obvious
closed form.

## Representation theory of $S_n$

**Theorem**: irreducible representations of $S_n$ are in bijection
with partitions of $n$. The dimension of the rep $V^\lambda$ is
$f^\lambda$ (number of SYT of shape $\lambda$).

Verify: $\sum_\lambda (f^\lambda)^2 = n!$. So sum-of-squared
SYT-counts gives the group order. (Strand 2 Master Lesson 05:
$\sum d_i^2 = |G|$.)

## RSK correspondence

The **Robinson-Schensted-Knuth (RSK)** algorithm gives a bijection:

permutations of $[n]$ ↔ pairs $(P, Q)$ of SYT of the same shape.

Implications:

- $n! = \sum_\lambda (f^\lambda)^2$ — re-derived bijectively.
- Longest increasing subsequence = first-row length.
- Algorithmic: insertion / bumping process.

## Interactive

:::widget type=numeric-input prompt="Number of partitions of $4$: $\\{4, 31, 22, 211, 1111\\}$ — $5$. Type 5." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="$f^{(2, 1)} = 3!/(3 \\cdot 1 \\cdot 1) = 2$. Number of SYT of shape (2,1) for $n = 3$. Type 2." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="RSK bijection: permutations ↔ pairs of SYT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\sum_\\lambda (f^\\lambda)^2 = n!$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Schur polynomial** $s_\lambda(x_1, \ldots, x_n) = \sum_T x^T$ —
sum over SSYT $T$ of shape $\lambda$ with entries $\le n$, where
$x^T = \prod x_{T(i, j)}$.

Schur polynomials form a basis of symmetric polynomials in
$\mathbb Z[x_1, \ldots]_S$. They are also characters of irreducible
$\mathrm{GL}_n$ representations — a deep coincidence (Schur-Weyl
duality).

**Littlewood-Richardson rule**: $s_\mu \cdot s_\nu = \sum_\lambda c^\lambda_{\mu\nu} s_\lambda$
where $c^\lambda_{\mu\nu}$ counts certain SSYT (LR tableaux). Has
algorithmic complexity (Knutson-Tao honeycombs).

**Murnaghan-Nakayama rule**: characters of $S_n$ via Young diagrams
and rim-hooks.

## Computational

```python
import math

def hook_length_formula(partition):
    n = sum(partition)
    rows = partition
    cols = [sum(1 for r in rows if r > j) for j in range(rows[0])]
    h = 1
    for i, ri in enumerate(rows):
        for j in range(ri):
            below = cols[j] - i - 1
            right = ri - j - 1
            hook = below + right + 1
            h *= hook
    return math.factorial(n) // h

# SYT counts for partitions of 4
partitions_of_4 = [(4,), (3, 1), (2, 2), (2, 1, 1), (1, 1, 1, 1)]
f_values = [hook_length_formula(p) for p in partitions_of_4]
print(list(zip(partitions_of_4, f_values)))
# [((4,), 1), ((3, 1), 3), ((2, 2), 2), ((2, 1, 1), 3), ((1, 1, 1, 1), 1)]

# Sum of squared dimensions = 4! = 24
print(sum(f**2 for f in f_values))             # 24

# RSK insertion (Schensted)
def rsk_insert(P, k):
    """Insert k into tableau P; return updated P and bumped row."""
    for i, row in enumerate(P):
        if k >= row[-1]:
            row.append(k)
            return P, i
        # bump first element strictly greater than k
        for j, v in enumerate(row):
            if v > k:
                row[j] = k
                k = v
                break
    P.append([k])
    return P, len(P) - 1

# RSK on permutation [3, 1, 4, 1, 5]
perm = [3, 1, 4, 1, 5]
P, Q = [], []
for i, k in enumerate(perm):
    P, row = rsk_insert(P, k)
    while len(Q) <= row: Q.append([])
    Q[row].append(i + 1)

print("P (insertion tableau):", P)
print("Q (recording tableau):", Q)
```

## Applied

- **Combinatorial physics** — partition functions in spin chains via
  Young tableaux; quantum integrable systems.
- **Random matrix theory** — eigenvalue distributions via Schur
  functions.
- **Algorithm analysis** — longest-increasing subsequence via RSK
  in $O(n \log n)$.
- **Quantum information** — Schur-Weyl duality structures
  representations of qudit systems.
- **Algebraic geometry** — Schubert calculus on Grassmannians uses
  Young diagrams to index Schubert classes.

## Check Your Understanding

:::widget type=numeric-input prompt="Hook length formula: $f^\\lambda = n! / \\prod h$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Irreducible $S_n$ reps ↔ partitions of $n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="RSK bijection: permutations ↔ pairs of equal-shape SYT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Schur polynomials are characters of $\\mathrm{GL}_n$ irreps. Type 1." answer=1 explain="Yes.":::
