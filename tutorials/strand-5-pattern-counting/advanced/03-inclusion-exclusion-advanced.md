---
strand: pattern-counting
level: advanced
order: 3
title: Inclusion-Exclusion in Action
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 02-catalan-and-ballot
    description: Catalan numbers
connections:
  - strand-5-pattern-counting-advanced/04-polya-enumeration
applications:
  - cs: "Counting derangements, surjections, coprime tuples"
  - life: "Counting things that satisfy or fail many conditions"
---

# Inclusion-Exclusion in Action

## Explain Like I Am 7

Sometimes the count you want — like "how many letter-mixings give
*nobody* their own letter back?" — is awkward, but its messy
overlapping pieces are easy to count.  The trick is to count the
*opposite* (everyone who *did* get their own letter), then peel that
off by adding singles, taking away pairs, adding back triples, and
so on with flip-flopping signs.  Once the dust settles, only the
clean count you wanted remains.  This add-then-subtract dance unlocks
derangements, Euler totients, surjection counts, and more.

## Mental

The **inclusion-exclusion principle** for counting:

$$
|A_1 \cup A_2 \cup \ldots \cup A_n| = \sum |A_i| - \sum_{i < j} |A_i \cap A_j| + \sum_{i < j < k} |A_i \cap A_j \cap A_k| - \ldots
$$

In probability:

$$
P(A_1 \cup \ldots \cup A_n) = \sum P(A_i) - \sum P(A_i \cap A_j) + \ldots
$$

When events are *complicated* but their **intersections** are easy
to count, IE is the right tool.

## Worked example: derangements

A **derangement** is a permutation with **no fixed points** —
nobody gets their own letter back.

Let $A_i$ = permutations where position $i$ is fixed. We want
$|A_1^c \cap \ldots \cap A_n^c| = n! - |A_1 \cup \ldots \cup A_n|$.

By IE:

$|A_{i_1} \cap \ldots \cap A_{i_k}| = (n - k)!$ — fix $k$ positions,
permute the rest.

$$
D_n = n! - \binom{n}{1}(n-1)! + \binom{n}{2}(n-2)! - \ldots = n! \sum_{k=0}^n \frac{(-1)^k}{k!}.
$$

As $n \to \infty$: $D_n / n! \to 1/e \approx 0.368$.

## Worked example: surjections

Number of surjections from a set of $n$ to a set of $k$:

$$
S(n, k) = \sum_{i=0}^k (-1)^i \binom{k}{i} (k - i)^n.
$$

Equivalently, $k! \cdot \stirling{n}{k}$ where $\stirling{n}{k}$ is the
Stirling number of the 2nd kind (set-partitions of $n$ into $k$
non-empty blocks).

## The Möbius function (number theory)

The number-theory analogue of IE: for arithmetic functions $f, g$
with $g(n) = \sum_{d | n} f(d)$, the **Möbius inversion** gives

$$
f(n) = \sum_{d | n} \mu(d) g(n/d),
$$

where $\mu$ is the **Möbius function**:

$\mu(1) = 1, \mu(p) = -1, \mu(p_1 \ldots p_k) = (-1)^k, \mu(\text{anything with squared prime}) = 0.$

This generalises IE to divisibility lattices.

## Interactive

:::widget type=numeric-input prompt="Derangements of 4 letters: $D_4 = 4! \\sum_{k=0}^4 (-1)^k / k! = 24(1 - 1 + 0.5 - 0.1667 + 0.0417) = ?$" answer=9 explain="$9$.":::

:::widget type=numeric-input prompt="$D_5 = ?$" answer=44 explain="$44$.":::

:::widget type=numeric-input prompt="$D_n / n! \\to ?$ — type 4 dp value of $1/e$." answer=0.3679 tolerance=0.005 explain="$\\approx 0.3679$.":::

:::widget type=numeric-input prompt="Number of surjections $\\{1, 2, 3\\} \\to \\{1, 2\\}$: $S(3, 2) = 2^3 - 2 \\cdot 1^3 = ?$" answer=6 explain="$6$.":::

## Symbolic

**Bonferroni inequalities**: truncating IE at any point gives
alternating bounds on the union — useful when full IE is too
expensive.

**Inclusion-exclusion on posets**: the Möbius function of a poset
generalises both the number-theoretic $\mu$ and the IE alternating
signs. Foundation of **combinatorial species**.

**The exponential formula**: connects EGFs of "connected" and
"all" structures. $\exp(\hat C(x)) = \hat A(x)$ when $A$ is the
class of "any disjoint union of $C$'s." Counts forests (from trees),
sets-of-cycles (from cycles), etc.

## Computational

```python
import math
from itertools import permutations

# Direct count of derangements of n
def derangements(n):
    if n == 0: return 1
    return sum((-1)**k * math.comb(n, k) * math.factorial(n - k)
               for k in range(n + 1))

print([derangements(n) for n in range(10)])
# 1, 0, 1, 2, 9, 44, 265, 1854, 14833, 133496

# Verify D_4 = 9 by enumeration
n = 4
count = 0
for p in permutations(range(n)):
    if all(p[i] != i for i in range(n)):
        count += 1
print(count)                          # 9

# Surjections
def surjections(n, k):
    return sum((-1)**i * math.comb(k, i) * (k - i)**n for i in range(k + 1))

print(surjections(3, 2))              # 6
print(surjections(5, 3))              # 150

# Möbius function
def mobius(n):
    if n == 1: return 1
    factors = {}
    m = n
    p = 2
    while p * p <= m:
        while m % p == 0:
            factors[p] = factors.get(p, 0) + 1
            m //= p
        p += 1
    if m > 1: factors[m] = factors.get(m, 0) + 1
    if any(v >= 2 for v in factors.values()):
        return 0
    return (-1)**len(factors)

print([mobius(n) for n in range(1, 13)])
# 1 -1 -1 0 -1 1 -1 0 0 1 -1 0
```

## Applied

- **Cryptography** — Möbius function appears in Möbius inversion of
  cyclotomic polynomials, used in Ring-LWE parameter analysis.
- **Network reliability** — counting reliable subnetworks via IE on
  events "edge $i$ fails."
- **Combinatorial randomness** — Lovász local lemma uses IE-style
  control of "bad events."
- **Probabilistic counting** — count-distinct (HyperLogLog) algorithms
  use min-hash + IE-style adjustments.

## Check Your Understanding

:::widget type=numeric-input prompt="$D_3 = 3! - 3 \\cdot 2! + 3 \\cdot 1! - 1 = 6 - 6 + 3 - 1 = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$\\mu(6) = ?$ ($6 = 2 \\cdot 3$, two distinct primes)" answer=1 explain="$(-1)^2 = 1$.":::

:::widget type=numeric-input prompt="$\\mu(12) = ?$ ($12 = 2^2 \\cdot 3$, repeated prime)" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="Number of surjections $\\{1,2,3,4\\} \\to \\{1,2\\}$: $2^4 - 2 = ?$" answer=14 explain="$14$.":::
