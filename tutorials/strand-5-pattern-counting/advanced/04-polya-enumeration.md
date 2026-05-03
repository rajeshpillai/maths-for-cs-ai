---
strand: pattern-counting
level: advanced
order: 4
title: Pólya Enumeration
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 03-inclusion-exclusion-advanced
    description: Inclusion-exclusion advanced
connections:
  - strand-5-pattern-counting-advanced/05-asymptotic-combinatorics
applications:
  - cs: "Counting distinct molecules, graph isomorphism classes, art motifs"
  - life: "Counting modulo symmetry"
---

# Pólya Enumeration

## Mental

**Burnside's lemma** (Strand 2 Intermediate Lesson 05) counts orbits.
**Pólya's enumeration theorem** refines it to count *coloured*
configurations modulo symmetry, weighted by colour types.

For a group $G$ acting on $X$ and colours $C$, the number of
orbits of colourings equals

$$
\frac{1}{|G|} \sum_{g \in G} |C|^{c(g)},
$$

where $c(g)$ is the number of cycles of $g$ acting on $X$. (Burnside
restated.) Pólya's *full theorem* uses the **cycle index polynomial**

$$
Z_G(z_1, z_2, \ldots, z_{|X|}) = \frac{1}{|G|} \sum_{g \in G} z_1^{c_1(g)} z_2^{c_2(g)} \cdots
$$

where $c_k(g)$ = number of $k$-cycles in $g$. Then the *generating
function* for orbit-counts of colourings (where colours have weights
$w_1, w_2, \ldots$) is

$$
Z_G\left(\sum w_i, \sum w_i^2, \sum w_i^3, \ldots\right).
$$

## Worked example: necklaces of $n$ beads, $k$ colours

$G = \mathbb{Z}/n$ acts by rotation.

For rotation by $g \in \{0, 1, \ldots, n-1\}$, the cycle structure
is $\gcd(g, n)$ cycles each of length $n / \gcd(g, n)$.

Number of distinct necklaces:

$$
\frac{1}{n} \sum_{g=0}^{n-1} k^{\gcd(g, n)} = \frac{1}{n} \sum_{d | n} \phi(n/d) k^d.
$$

For $n = 4, k = 2$: $\frac{1}{4}(2^4 + 2^1 + 2^2 + 2^1) = \frac{16 + 2 + 4 + 2}{4} = 6$.

## Worked example 2: distinct cube colourings

Cube has rotational group $|G| = 24$. Cycle index is a famous
polynomial; for 3 colours, count of distinct colourings of 6 faces:

$Z_G = \frac{1}{24}(z_1^6 + 6 z_1^2 z_4 + 3 z_1^2 z_2^2 + 8 z_3^2 + 6 z_2^3)$.

At $z_i = 3$: $\frac{1}{24}(3^6 + 6 \cdot 3^3 + 3 \cdot 3^4 + 8 \cdot 3^2 + 6 \cdot 3^3) = 57$.

So 57 distinct cube colourings with 3 face colours.

## Interactive

:::widget type=numeric-input prompt="Necklaces of 4 beads, 2 colours: $\\frac{1}{4}(2^4 + 2 \\cdot 2 + 2^2) = ?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="Necklaces of 5 beads, 2 colours: $\\frac{1}{5}(2^5 + 4 \\cdot 2) = \\frac{32 + 8}{5} = ?$" answer=8 explain="$8$.":::

:::widget type=numeric-input prompt="Distinct face-colourings of cube with 3 colours: $57$. Type 1 if computed correctly." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cycle index $Z_G$ depends on cycle structure of group elements. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Two-variable refinement**: count colourings *with specified
multiplicities* (e.g., 3 red, 2 blue, 1 green) by tracking individual
colour weights $w_i$.

**Pólya's theorem** then says: the orbit-count of colourings of type
$(n_1, n_2, \ldots)$ is the coefficient of $w_1^{n_1} w_2^{n_2} \ldots$
in $Z_G(\sum w_i, \sum w_i^2, \ldots)$.

**Cycle indices for symmetric group**:

$$
Z_{S_n} = \sum_{\lambda \vdash n} \frac{1}{z_\lambda} \prod_i z_i^{m_i},
$$

where $\lambda$ ranges over partitions of $n$ with $m_i$ parts of
size $i$, and $z_\lambda = \prod_i i^{m_i} m_i!$.

## Computational

```python
from math import gcd
from sympy import symbols, expand

def necklaces(n, k):
    return sum(k ** gcd(g, n) for g in range(n)) // n

print([necklaces(n, 2) for n in range(1, 10)])
# 2, 3, 4, 6, 8, 14, 20, 36, 60

# Cube cycle index: 24 rotations
# Burnside count of colourings with k colours
def cube_colourings(k):
    # Z_G = (1/24)(z1^6 + 6 z1^2 z4 + 3 z1^2 z2^2 + 8 z3^2 + 6 z2^3)
    # Substitute z_i = k
    return (k**6 + 6 * k**2 * k + 3 * k**2 * k**2 + 8 * k**2 + 6 * k**3) // 24

print(cube_colourings(2))             # 10 — number of distinct 2-colour cubes
print(cube_colourings(3))             # 57

# Two-variable cycle index for full Pólya
# To count cubes with exactly 3 red, 3 blue:
# Substitute z_i = (r^i + b^i) and extract r^3 b^3 coefficient
r, b = symbols("r b")
def Z_cube(r_term, b_term):
    z1 = r + b
    z2 = r**2 + b**2
    z3 = r**3 + b**3
    z4 = r**4 + b**4
    z6 = r**6 + b**6
    poly = (z1**6 + 6*z1**2*z4 + 3*z1**2*z2**2 + 8*z3**2 + 6*z2**3) / 24
    return expand(poly)

# Extract coefficients for various color partitions
P = Z_cube(r, b)
print(P.coeff(r**3 * b**3))           # 2 — 2 distinct 3R-3B cubes
```

## Applied

- **Counting molecular isomers** — Pólya developed his theorem to
  count distinct chemical compounds with given atom counts modulo
  rotational/reflective symmetry.
- **Combinatorial design** — counting non-isomorphic Latin squares,
  block designs, codes.
- **Computer graphics — distinct sprites/textures modulo rotation**
  for tile-based games.
- **Cryptography — symmetry analysis of permutation-based ciphers**.

## Check Your Understanding

:::widget type=numeric-input prompt="Burnside-style count: $\\frac{1}{|G|} \\sum_{g} |\\mathrm{Fix}(g)|$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Distinct necklaces of $4$ beads with $3$ colours: $\\frac{1}{4}(3^4 + 3 + 3^2 + 3) = \\frac{81 + 3 + 9 + 3}{4} = ?$" answer=24 explain="$24$.":::

:::widget type=numeric-input prompt="Number of distinct 2-colour cubes: $10$. Type 1 if remembered." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pólya's theorem refines Burnside via cycle indices. Type 1." answer=1 explain="Yes.":::
