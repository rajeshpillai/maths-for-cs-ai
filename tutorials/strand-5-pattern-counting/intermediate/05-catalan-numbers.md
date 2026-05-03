---
strand: pattern-counting
level: intermediate
order: 5
title: Catalan Numbers
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 04-pascals-triangle
    description: Binomial coefficients
  - tier: strand-5-pattern-counting-intermediate
    slug: 03-recurrences-and-closed-forms
    description: Recurrence solving
connections:
  - strand-5-pattern-counting-intermediate/06-bijective-combinatorics
applications:
  - cs: "Counting BSTs, balanced parentheses, monotonic stacks"
  - games: "Tournament bracket structures"
  - business: "Decision-tree shapes"
  - life: "Triangulations of a polygon, handshake-pairings"
---

# Catalan Numbers

## Mental

The **Catalan numbers** $C_0, C_1, C_2, \ldots$ form one of the most
fascinating sequences in combinatorics. They count the answers to
**dozens** of seemingly unrelated questions:

- The number of ways to triangulate a convex $(n+2)$-gon.
- The number of binary trees with $n$ internal nodes.
- The number of valid parentheses strings with $n$ pairs.
- The number of monotonic lattice paths from $(0, 0)$ to $(n, n)$
  that don't cross the diagonal $y = x$.
- The number of binary search trees on $n$ distinct keys.
- The number of ways to fully parenthesise a product of $n + 1$
  factors.

All of these sequences are the same: $1, 1, 2, 5, 14, 42, 132, 429,
\ldots$

The closed form:

$$
C_n = \frac{1}{n+1} \binom{2n}{n}.
$$

The recurrence:

$$
C_{n+1} = \sum_{k=0}^n C_k \, C_{n-k}, \quad C_0 = 1.
$$

## Why so many problems give the same answer

When two seemingly different counting problems give the same
sequence, there's almost always a **bijection** — a one-to-one
correspondence between the two collections. Lesson 06 develops
bijective combinatorics; for now, marvel at the pattern.

For balanced-parens with $3$ pairs, the $5$ valid strings:

$$
((()))\quad (()())\quad (())()\quad ()(())\quad ()()()
$$

For the triangulations of a $5$-gon (pentagon), the $5$ ways. For
binary trees with $3$ internal nodes, $5$ shapes. **Same number, $5$.**

## Interactive

:::widget type=numeric-input prompt="$C_4 = ?$ (Use $C_n = \\binom{2n}{n}/(n+1)$.)" answer=14 explain="$\\binom{8}{4}/5 = 70/5 = 14$.":::

:::widget type=numeric-input prompt="$C_5 = ?$" answer=42 explain="$\\binom{10}{5}/6 = 252/6 = 42$.":::

:::widget type=numeric-input prompt="How many distinct binary search trees have $4$ keys (with values $1, 2, 3, 4$)?" answer=14 explain="$C_4 = 14$. The structure of the tree is what varies; the keys go in by BST property.":::

:::widget type=numeric-input prompt="How many lattice paths from $(0,0)$ to $(5,5)$ that go only right or up and never go below the diagonal?" answer=42 explain="$C_5 = 42$. The 'never crosses diagonal' constraint is what makes it Catalan.":::

## Symbolic

Closed form:

$$
C_n = \frac{1}{n+1} \binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n+1}.
$$

The second form (a difference of binomials) comes from the **reflection
principle** — a beautiful geometric argument for counting paths that
avoid crossing a line.

Recurrence: $C_{n+1} = \sum_{k=0}^n C_k C_{n-k}$.

Generating function: solve $C(x) = 1 + x C(x)^2$ to get

$$
C(x) = \frac{1 - \sqrt{1 - 4x}}{2x} = \sum_{n \ge 0} C_n x^n.
$$

(Strand 4 Master uses this for asymptotics: $C_n \sim
\dfrac{4^n}{n^{3/2} \sqrt{\pi}}$.)

The first few values: $1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862,
16796$.

## Computational

```python
import math

def catalan(n):
    return math.comb(2 * n, n) // (n + 1)

print([catalan(n) for n in range(8)])
# [1, 1, 2, 5, 14, 42, 132, 429]

# Recurrence form
def catalan_dp(n):
    c = [1]
    for i in range(n):
        c.append(sum(c[k] * c[i - k] for k in range(i + 1)))
    return c

print(catalan_dp(7))
# [1, 1, 2, 5, 14, 42, 132, 429]
```

## Applied

- **Compiler parser stacks**: counting valid expression structures.
- **BST-shape distributions**: classical analyses use Catalan-derived
  identities.
- **RNA secondary structure**: the count of valid base-pair
  matchings is a Catalan-related sequence.

## Check Your Understanding

:::widget type=numeric-input prompt="$C_6 = ?$" answer=132 explain="$\\binom{12}{6}/7 = 924/7 = 132$.":::

:::widget type=numeric-input prompt="Number of ways to fully parenthesise the product $a \\cdot b \\cdot c \\cdot d$ ($n = 3$ multiplications, 4 factors)?" answer=5 explain="$C_3 = 5$. The five parenthesisations: $((ab)c)d, (a(bc))d, (ab)(cd), a((bc)d), a(b(cd))$.":::

:::widget type=numeric-input prompt="Number of triangulations of a hexagon ($n = 4$)?" answer=14 explain="$C_4 = 14$.":::

:::widget type=numeric-input prompt="Number of valid parentheses strings with 5 pairs?" answer=42 explain="$C_5 = 42$.":::
