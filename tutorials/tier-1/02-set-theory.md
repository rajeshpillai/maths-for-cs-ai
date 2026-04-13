# Set Theory — Unions, Intersections, Power Sets, Cartesian Products

## Intuition

A set is just a collection of distinct objects with no order.  Your contact
list is a set (no duplicate names, order doesn't matter).  A database table's
rows form a set.  SQL's `UNION`, `INTERSECT`, and `EXCEPT` are literally set
operations.  Sets are the vocabulary of mathematics — almost every structure
is defined in terms of them.

## Prerequisites

- Tier 1, Lesson 1: Logic (AND, OR, NOT — they mirror set operations)

## From First Principles

### What is a set?

A **set** is an unordered collection of **distinct** elements.

Notation: $A = \{1, 2, 3\}$

- $2 \in A$ means "2 is an element of A"
- $5 \notin A$ means "5 is not in A"
- $\{1, 2, 3\} = \{3, 1, 2\}$ — **order doesn't matter**
- $\{1, 1, 2\} = \{1, 2\}$ — **no duplicates**

### Special sets

| Symbol | Name | Elements |
|--------|------|----------|
| $\emptyset$ or $\{\}$ | Empty set | none |
| $\mathbb{N}$ | Natural numbers | $\{0, 1, 2, 3, \dots\}$ |
| $\mathbb{Z}$ | Integers | $\{\dots, -2, -1, 0, 1, 2, \dots\}$ |
| $\mathbb{Q}$ | Rationals | all fractions |
| $\mathbb{R}$ | Reals | entire number line |

### Set-builder notation

$$\{x \in \mathbb{Z} \mid x^2 < 10\} = \{-3, -2, -1, 0, 1, 2, 3\}$$

Read: "the set of integers $x$ such that $x^2 < 10$."

### Subsets

$A \subseteq B$ means every element of $A$ is also in $B$.

**Pen & paper:** Let $A = \{1, 2\}$ and $B = \{1, 2, 3, 4\}$.

- Is $A \subseteq B$?  Check each element: $1 \in B$ ✓, $2 \in B$ ✓.  Yes.
- Is $B \subseteq A$?  $3 \in A$?  No.  So $B \not\subseteq A$.

> $\emptyset \subseteq A$ for **every** set $A$ (vacuously true — there's no element in $\emptyset$ that violates the condition).

### Cardinality

$|A|$ = the number of elements in $A$.

$|\{a, b, c\}| = 3$, $|\emptyset| = 0$

### Set operations

Let $A = \{1, 2, 3, 4\}$ and $B = \{3, 4, 5, 6\}$.

**Union ($A \cup B$):** everything in A *or* B (or both).

$$A \cup B = \{1, 2, 3, 4, 5, 6\}$$

**Intersection ($A \cap B$):** everything in A *and* B.

$$A \cap B = \{3, 4\}$$

**Difference ($A \setminus B$ or $A - B$):** in A but *not* in B.

$$A \setminus B = \{1, 2\}$$

**Symmetric difference ($A \triangle B$):** in A or B but *not both* (set XOR).

$$A \triangle B = \{1, 2, 5, 6\}$$

**Complement ($\overline{A}$ or $A^c$):** everything in the universal set $U$ that is *not* in A.

If $U = \{1, 2, 3, 4, 5, 6, 7\}$, then $\overline{A} = \{5, 6, 7\}$.

### Connection to logic

| Logic | Set operation | Venn diagram |
|-------|-------------|--------------|
| $p \land q$ | $A \cap B$ | overlap |
| $p \lor q$ | $A \cup B$ | both circles |
| $\neg p$ | $\overline{A}$ | outside the circle |
| $p \oplus q$ | $A \triangle B$ | non-overlapping parts |

### Set algebra laws (pen & paper simplification)

These mirror Boolean algebra exactly.  To prove any of these, show that
an element in the left side must be in the right side, and vice versa.

**Pen & paper: Prove De Morgan's** $\overline{A \cup B} = \overline{A} \cap \overline{B}$

Let $x \in \overline{A \cup B}$.  Then $x \notin A \cup B$.
So $x \notin A$ AND $x \notin B$.  So $x \in \overline{A}$ AND $x \in \overline{B}$.
Therefore $x \in \overline{A} \cap \overline{B}$.  ✓ (The reverse direction works the same way.)

| Law | Expression |
|-----|-----------|
| Commutative | $A \cup B = B \cup A$ |
| Associative | $(A \cup B) \cup C = A \cup (B \cup C)$ |
| Distributive | $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$ |
| De Morgan's | $\overline{A \cup B} = \overline{A} \cap \overline{B}$ |
| De Morgan's | $\overline{A \cap B} = \overline{A} \cup \overline{B}$ |
| Complement | $A \cup \overline{A} = U$ |
| Complement | $A \cap \overline{A} = \emptyset$ |

### Power set

The **power set** $\mathcal{P}(A)$ is the set of **all subsets** of $A$.

**Pen & paper:** $A = \{1, 2, 3\}$

Subsets: $\emptyset, \{1\}, \{2\}, \{3\}, \{1,2\}, \{1,3\}, \{2,3\}, \{1,2,3\}$

$$|\mathcal{P}(A)| = 2^{|A|} = 2^3 = 8$$

**Why $2^n$?**  For each element, you have 2 choices: include it or don't.
$n$ elements → $2^n$ subsets.

> This is the same reason an $n$-bit number has $2^n$ possible values!

### Cartesian product

The **Cartesian product** $A \times B$ is the set of all ordered pairs $(a, b)$
where $a \in A$ and $b \in B$.

**Pen & paper:** $A = \{1, 2\}$, $B = \{x, y, z\}$

$$A \times B = \{(1,x), (1,y), (1,z), (2,x), (2,y), (2,z)\}$$

$$|A \times B| = |A| \times |B| = 2 \times 3 = 6$$

> A database **join** is essentially a filtered Cartesian product.

### Inclusion-exclusion principle

$$|A \cup B| = |A| + |B| - |A \cap B|$$

**Pen & paper:** $|A| = 4, |B| = 4, |A \cap B| = 2$

$$|A \cup B| = 4 + 4 - 2 = 6$$ ✓ (matches our union above)

For three sets:

$$|A \cup B \cup C| = |A| + |B| + |C| - |A \cap B| - |A \cap C| - |B \cap C| + |A \cap B \cap C|$$

## Python Verification

```python
# ── Set Theory: verifying pen & paper work ──────────────────

A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

print("=== Basic operations ===")
print(f"A = {A}")
print(f"B = {B}")
print(f"A ∪ B = {A | B}")            # Union
print(f"A ∩ B = {A & B}")            # Intersection
print(f"A \\ B = {A - B}")           # Difference
print(f"A △ B = {A ^ B}")            # Symmetric difference

# Membership
print(f"\n2 ∈ A? {2 in A}")
print(f"5 ∈ A? {5 in A}")

# Subset
print(f"\n=== Subsets ===")
print(f"{{1,2}} ⊆ A? { {1,2} <= A}")
print(f"A ⊆ B? {A <= B}")
print(f"∅ ⊆ A? {set() <= A}")

# Power set
print("\n=== Power set of {1, 2, 3} ===")
from itertools import combinations
S = {1, 2, 3}
power_set = []
for r in range(len(S) + 1):
    for subset in combinations(S, r):
        power_set.append(set(subset))
print(f"Power set ({len(power_set)} subsets):")
for s in power_set:
    print(f"  {s if s else '∅'}")

# Cartesian product
print("\n=== Cartesian product ===")
A2 = {1, 2}
B2 = {'x', 'y', 'z'}
cart = [(a, b) for a in sorted(A2) for b in sorted(B2)]
print(f"A × B = {cart}")
print(f"|A × B| = {len(cart)}")

# Inclusion-exclusion
print("\n=== Inclusion-Exclusion ===")
print(f"|A| = {len(A)}, |B| = {len(B)}, |A ∩ B| = {len(A & B)}")
print(f"|A ∪ B| = {len(A)} + {len(B)} - {len(A & B)} = {len(A) + len(B) - len(A & B)}")
print(f"Actual |A ∪ B| = {len(A | B)}")

# De Morgan's Law for sets
print("\n=== De Morgan's: complement(A ∪ B) = complement(A) ∩ complement(B) ===")
U = {1, 2, 3, 4, 5, 6, 7}
comp_union = U - (A | B)
comp_A_inter_comp_B = (U - A) & (U - B)
print(f"U \\ (A ∪ B) = {comp_union}")
print(f"(U\\A) ∩ (U\\B) = {comp_A_inter_comp_B}")
print(f"Equal? {comp_union == comp_A_inter_comp_B}")
```

## Connection to CS / Games / AI

- **Python `set`** — built-in set type with `|`, `&`, `-`, `^` operators
- **SQL** — `UNION`, `INTERSECT`, `EXCEPT` are set operations; `JOIN` is filtered Cartesian product
- **Databases** — relational algebra is built on set theory
- **Feature sets in ML** — feature selection, vocabulary sets in NLP
- **Power sets** — enumerate all possible subsets (used in search, game AI, combinatorial optimisation)
- **Bloom filters** — probabilistic set membership testing
- **Game dev** — collision groups, entity component systems use set operations

## Check Your Understanding

1. **Pen & paper:** Let $C = \{a, b, c, d\}$ and $D = \{c, d, e, f\}$. Find $C \cup D$, $C \cap D$, $C \setminus D$, $C \triangle D$.
2. **Pen & paper:** List all elements of $\mathcal{P}(\{a, b\})$.  How many are there?
3. **Pen & paper:** Using inclusion-exclusion, if $|A| = 20$, $|B| = 15$, $|A \cup B| = 30$, what is $|A \cap B|$?
4. **Pen & paper:** Prove using set algebra that $A \cap (A \cup B) = A$.
   (Hint: use the absorption law, or expand with distributive + complement laws.)
