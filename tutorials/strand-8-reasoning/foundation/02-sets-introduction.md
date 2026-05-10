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

## Explain Like I Am 7

Picture two bowls on a table.  One bowl holds your favourite fruits;
the other holds the fruits your friend brought to school.  *Tip them
together* into one big bowl and you get a **union** — every fruit
either of you owns.  *Pick out only the fruits sitting in **both**
bowls* and you get an **intersection** — the shared favourites.  Sets
are these bowls, and learning to mix and compare them is the way
maths talks about groups of things in tidy, no-arguments language.

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

### Worked examples (NCERT-style)

**Example 1 — element vs subset.** Let $A = \{1, 2, \{3, 4\}, 5\}$.

- $\{3, 4\} \in A$? **Yes** — $\{3, 4\}$ is *listed* as one element.
- $\{3, 4\} \subseteq A$? **No** — for $\subseteq$ we'd need
  $3 \in A$ and $4 \in A$; only the bracketed pair is in $A$.
- $\{1\} \subseteq A$? **Yes** — because $1 \in A$.

Mnemonic: to convert an element to a subset, wrap it in another
pair of braces. The exception is $\varnothing$, which is a subset
of every set without needing braces.

**Example 2 — set-builder $\to$ roster.** Write
$\{x : x \in \mathbb{Z},\ -3 < x < 7\}$ as a roster.

The integers strictly between $-3$ and $7$ are
$\{-2, -1, 0, 1, 2, 3, 4, 5, 6\}$ — nine elements (both
endpoints excluded by the strict inequalities).

**Example 3 — equal sets via solving.** Are
$A = \{x : x \text{ solves } x^2 + 5x + 6 = 0\}$ and $B = \{2, 3\}$
equal?

Factor: $x^2 + 5x + 6 = (x + 2)(x + 3) = 0 \Rightarrow x = -2, -3$.
So $A = \{-2, -3\} \ne B$. The trap is reading "$5x + 6$" and
guessing positive roots without factoring.

**Example 4 — power-set count.** $A = \varnothing$. Find $n(P(A))$.

$n(A) = 0 \Rightarrow n(P(A)) = 2^0 = 1$. Indeed
$P(\varnothing) = \{\varnothing\}$ — the empty set is itself a
subset of $\varnothing$, so $P(\varnothing)$ is a singleton, *not*
empty.

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
- **Board Exam / JEE (CBSE Class 11, Chapter 1 — Sets)** —
  NCERT Exercises 1.1–1.6. Frequently tested: roster ↔ set-builder
  conversion, power-set size $n(P(A)) = 2^{n(A)}$, De Morgan's
  laws, and cardinality $n(A \cup B) = n(A) + n(B) - n(A \cap B)$.
  Common traps: `φ` vs. `{φ}` (the latter is a singleton), and
  element vs. subset (`1 ∈ A` does not mean `1 ⊆ A`; only `{1}` is
  the subset).

## Check Your Understanding

:::widget type=numeric-input prompt="$\\{1, 2\\} \\cup \\{2, 3\\}$ has size?" answer=3 explain="$\\{1, 2, 3\\}$.":::

:::widget type=numeric-input prompt="Number of subsets of a $5$-element set?" answer=32 explain="$2^5$.":::

:::widget type=numeric-input prompt="$|\\varnothing|$?" answer=0 explain="Empty set has 0 elements.":::

:::widget type=numeric-input prompt="$\\{a, b\\} \\times \\{1, 2, 3\\}$ has size?" answer=6 explain="$2 \\cdot 3 = 6$.":::
