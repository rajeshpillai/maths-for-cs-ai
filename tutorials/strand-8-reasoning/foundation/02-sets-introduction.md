---
strand: reasoning
level: foundation
order: 2
title: Sets — Unions, Intersections, Subsets
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 01-logical-connectives
    description: Logical connectives
connections:
  - strand-8-reasoning-foundation/03-functions-and-relations
applications:
  - cs: "Database operations, type theory"
  - business: "Customer segmentation, market overlap"
  - games: "Inventory, faction membership"
  - life: "Categorising things, Venn diagrams"
---

# Sets — Unions, Intersections, Subsets

## Mental

A **set** is an unordered collection of distinct **elements**. We
write $\{1, 2, 3\}$ or describe sets by a property:

$$
A = \{x \in \mathbb{Z} : x > 0 \text{ and } x \le 10\}.
$$

(Set-builder notation: "the set of integers $x$ such that $0 < x \le
10$.")

Order doesn't matter: $\{1, 2, 3\} = \{3, 1, 2\}$.

Repetition doesn't add anything: $\{1, 2, 2, 3\} = \{1, 2, 3\}$.

The **empty set** $\varnothing$ has zero elements.

## Set operations

**Membership** $x \in A$, "$x$ is in $A$."

**Subset** $A \subseteq B$: every element of $A$ is in $B$.

**Union** $A \cup B$: elements in $A$ **or** $B$.

**Intersection** $A \cap B$: elements in $A$ **and** $B$.

**Complement** $A^c$ (or $\bar A$ or $A'$): elements **not** in $A$
(in the universe).

**Difference** $A \setminus B$: in $A$ but not $B$.

These connect to logic via the membership predicate:

$$
x \in A \cup B \iff (x \in A) \vee (x \in B),
$$

$$
x \in A \cap B \iff (x \in A) \wedge (x \in B).
$$

Sets and propositions are deeply linked.

## Interactive

:::widget type=numeric-input prompt="$A = \\{1, 2, 3\\}, B = \\{2, 3, 4\\}$. $|A \\cup B| = ?$" answer=4 explain="$\\{1, 2, 3, 4\\}$ — four elements.":::

:::widget type=numeric-input prompt="$|A \\cap B| = ?$" answer=2 explain="$\\{2, 3\\}$.":::

:::widget type=numeric-input prompt="$|A \\setminus B| = ?$" answer=1 explain="$\\{1\\}$ — in $A$ but not $B$.":::

:::widget type=numeric-input prompt="The empty set $\\varnothing$ is a subset of every set. Type 1 yes, 0 no." answer=1 explain="Yes — vacuously: 'every element of empty is in any set' has no counter-examples.":::

:::widget type=numeric-input prompt="$|\\{1, 2, 3, 4\\}|$ — number of subsets? ($2^n$ for an $n$-element set.)" answer=16 explain="$2^4 = 16$.":::

## Symbolic

**Cardinality** of a finite set: $|A| = $ number of elements.

**Power set** $\mathcal{P}(A)$: set of all subsets. $|\mathcal{P}(A)| =
2^{|A|}$.

**De Morgan's laws** for sets (paralleling logical De Morgan):

$$
(A \cup B)^c = A^c \cap B^c, \quad (A \cap B)^c = A^c \cup B^c.
$$

**Cartesian product**: $A \times B = \{(a, b) : a \in A, b \in B\}$.
$|A \times B| = |A| \cdot |B|$ — the multiplication principle from
Strand 5.

## Computational

```python
A = {1, 2, 3}
B = {2, 3, 4}

print(A | B)         # {1, 2, 3, 4} — union
print(A & B)         # {2, 3} — intersection
print(A - B)         # {1} — difference
print(A ^ B)         # {1, 4} — symmetric difference

print(2 in A)        # True
print(A.issubset({1, 2, 3, 4, 5}))   # True

# Power set
from itertools import chain, combinations
def powerset(s):
    s = list(s)
    return list(chain.from_iterable(combinations(s, r) for r in range(len(s) + 1)))

print(powerset({1, 2, 3}))
# [(), (1,), (2,), (3,), (1,2), (1,3), (2,3), (1,2,3)] — 8 subsets
```

## Applied

- **Database operations**: SQL `UNION, INTERSECT, EXCEPT` are exactly
  set operations.
- **Type theory**: types in programming languages can be modelled as
  sets of possible values.
- **Probability**: events are sets of outcomes; Strand 6's
  probability axioms are stated in set language.
- **Venn diagrams**: graphical depictions of set relationships.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\{1, 2\\} \\cup \\{2, 3\\}$ has size?" answer=3 explain="$\\{1, 2, 3\\}$.":::

:::widget type=numeric-input prompt="Number of subsets of a $5$-element set?" answer=32 explain="$2^5$.":::

:::widget type=numeric-input prompt="$|\\varnothing|$?" answer=0 explain="Empty set has 0 elements.":::

:::widget type=numeric-input prompt="$\\{a, b\\} \\times \\{1, 2, 3\\}$ has size?" answer=6 explain="$2 \\cdot 3 = 6$.":::
