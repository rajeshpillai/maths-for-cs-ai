---
strand: pattern-counting
level: intermediate
order: 1
title: Inclusion–Exclusion
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 06-mutually-exclusive-or-rule
    description: Two-event inclusion-exclusion (Strand 6)
connections:
  - strand-5-pattern-counting-intermediate/04-derangements
applications:
  - cs: "Counting strings avoiding patterns; database query optimisation"
  - business: "Mailing list de-duplication, multi-criteria filtering"
  - games: "Loot table 'one of: A, B, C' counts with overlaps"
  - life: "Counting people in unions of overlapping groups"
---

# Inclusion–Exclusion

## Mental

Strand 6 Lesson 06 gave the two-event version: $|A \cup B| = |A| +
|B| - |A \cap B|$. **Inclusion-exclusion** is the general principle
for $n$ events:

$$
|A_1 \cup A_2 \cup \ldots \cup A_n| = \sum_i |A_i| - \sum_{i<j} |A_i \cap A_j| + \sum_{i<j<k} |A_i \cap A_j \cap A_k| - \ldots
$$

Add singles, subtract pairs, add triples, subtract quadruples, alternating signs:

$$
\left| \bigcup_{i=1}^n A_i \right| = \sum_{\emptyset \ne S \subseteq \{1,\ldots,n\}} (-1)^{|S|+1} \left| \bigcap_{i \in S} A_i \right|.
$$

The intuition: each element in the union is counted **once** by the
single sums, **twice** if it's in two sets (so subtract once for the
pair), **three times** if in three sets (subtract pair-overlaps three
times, leaving zero — add it back via the triple), and so on. The
alternating signs cancel each element's contributions to leave $1$
copy.

## Interactive

:::widget type=numeric-input prompt="In a class of $40$, $25$ play football, $20$ play tennis, $10$ play both. How many play at least one?" answer=35 explain="$|F| + |T| - |F \\cap T| = 25 + 20 - 10 = 35$.":::

:::widget type=numeric-input prompt="Counts of multiples in $\\{1, ..., 100\\}$: divisible by $2$: $50$. By $3$: $33$. By $5$: $20$. By $6$: $16$. By $10$: $10$. By $15$: $6$. By $30$: $3$. How many are divisible by at least one of $2, 3, 5$?" answer=74 explain="$|A_2 \\cup A_3 \\cup A_5| = 50 + 33 + 20 - 16 - 10 - 6 + 3 = 74$.":::

:::widget type=numeric-input prompt="$50$ people, $30$ like A, $25$ like B, $20$ like C; $15$ like A∩B, $10$ like A∩C, $8$ like B∩C, $5$ like all three. How many like at least one?" answer=47 explain="$30 + 25 + 20 - 15 - 10 - 8 + 5 = 47$.":::

## Symbolic

For $n$ sets in finite universe, the **inclusion-exclusion formula**:

$$
\left|\bigcup_i A_i\right| = \sum_{k=1}^n (-1)^{k-1} \sum_{|S|=k} \left| \bigcap_{i \in S} A_i \right|.
$$

Equivalent statement using **complements**: the number of elements in
**none** of the sets is

$$
N - \left|\bigcup_i A_i\right| = \sum_{k=0}^n (-1)^k \sum_{|S|=k} \left| \bigcap_{i \in S} A_i \right|,
$$

where $N$ is the universe size and the $k=0$ term is $N$ (empty
intersection = whole universe).

## Computational

```python
from itertools import combinations

def inclusion_exclusion(universe, sets):
    """|union of sets| via inclusion-exclusion."""
    total = 0
    for r in range(1, len(sets) + 1):
        for combo in combinations(sets, r):
            inter = combo[0]
            for s in combo[1:]:
                inter = inter & s
            total += (-1) ** (r + 1) * len(inter)
    return total

A = set(range(2, 100, 2))    # multiples of 2
B = set(range(3, 100, 3))    # multiples of 3
C = set(range(5, 100, 5))    # multiples of 5
print(inclusion_exclusion(set(range(1, 100)), [A, B, C]))   # 74
print(len(A | B | C))   # 74 — direct check
```

## Derivational

For each element $x$ in the union, suppose $x$ belongs to exactly $m$
of the sets ($m \ge 1$). On the right side of the formula, $x$ gets
counted:

$$
\binom{m}{1} - \binom{m}{2} + \binom{m}{3} - \ldots + (-1)^{m+1} \binom{m}{m}.
$$

By the binomial theorem at $a = 1, b = -1$ (Foundation Lesson 05):
$\sum_{k=0}^m \binom{m}{k}(-1)^k = 0$, so $\sum_{k=1}^m
\binom{m}{k}(-1)^{k+1} = 1$.

Each element in the union is counted exactly **once**. The formula is
correct.

## Applied

- **Counting permutations avoiding fixed points** (next lesson:
  derangements) is inclusion-exclusion at its purest.
- **Database queries**: `WHERE x = 1 OR y = 2 OR z = 3` — counting
  matching rows uses inclusion-exclusion.
- **Sieve methods in number theory**: Eratosthenes's sieve is
  inclusion-exclusion in disguise.
- **Mailing list de-duplication**: $A \cup B \cup C$ subscribers
  with overlaps.

## Check Your Understanding

:::widget type=numeric-input prompt="$|A| = 30, |B| = 25, |A \\cap B| = 12$. $|A \\cup B|$?" answer=43 explain="$30 + 25 - 12 = 43$.":::

:::widget type=numeric-input prompt="Surveying $100$ people: $60$ drink tea, $50$ drink coffee, $30$ drink both. How many drink neither?" answer=20 explain="$|T \\cup C| = 60 + 50 - 30 = 80$. Neither: $100 - 80 = 20$.":::

:::widget type=numeric-input prompt="In $1$ to $30$, count integers divisible by $2$, $3$, or $5$. (Mults: 2 → 15, 3 → 10, 5 → 6, 6 → 5, 10 → 3, 15 → 2, 30 → 1.)" answer=22 explain="$15 + 10 + 6 - 5 - 3 - 2 + 1 = 22$.":::

:::widget type=numeric-input prompt="Three sets, $|A| = |B| = |C| = 10$, all pairwise intersections size $3$, triple intersection size $1$. $|A \\cup B \\cup C|$?" answer=22 explain="$3 \\cdot 10 - 3 \\cdot 3 + 1 = 30 - 9 + 1 = 22$.":::
