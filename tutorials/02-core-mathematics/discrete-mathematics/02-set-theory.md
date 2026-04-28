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

## Visualisation — Venn diagrams for the four set operations

Set operations are easiest *seen*. Three overlapping circles show
union, intersection, difference, complement, and symmetric difference
all at once.

```python
# ── Visualising set operations as Venn diagrams ─────────────
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Rectangle

A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}
U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}        # universe

operations = [
    ("A ∪ B (union)",                  A | B,             "tab:blue"),
    ("A ∩ B (intersection)",           A & B,             "tab:orange"),
    ("A − B (difference)",             A - B,             "tab:green"),
    ("A △ B (symmetric difference)",   A ^ B,             "tab:red"),
]

fig, axes = plt.subplots(2, 2, figsize=(11, 9))

for ax, (label, result, color) in zip(axes.flatten(), operations):
    # Universe rectangle.
    ax.add_patch(Rectangle((-3, -2.2), 6, 4.4, fill=False, edgecolor="black", lw=1.2))
    ax.text(-2.85, 2.0, "U", fontsize=11, color="black")

    # Two overlapping circles for A and B.
    ax.add_patch(Circle((-0.7, 0), 1.5, alpha=0.25, color="tab:blue"))
    ax.add_patch(Circle(( 0.7, 0), 1.5, alpha=0.25, color="tab:orange"))

    # Highlight the result region in colour. We do this by drawing
    # solid-filled circles/regions that match the operation:
    if "union" in label:
        ax.add_patch(Circle((-0.7, 0), 1.5, alpha=0.55, color=color))
        ax.add_patch(Circle(( 0.7, 0), 1.5, alpha=0.55, color=color))
    elif "intersection" in label:
        # The lens-shaped intersection.
        ts = np.linspace(0, 2 * np.pi, 200)
        xs = 0.7 + 1.5 * np.cos(ts); ys = 1.5 * np.sin(ts)
        # Approximate by clipping with both circle masks via fill.
        # Easier: fill the intersection by rasterised mask.
        grid_x, grid_y = np.meshgrid(np.linspace(-3, 3, 300),
                                      np.linspace(-2.2, 2.2, 220))
        in_A = (grid_x + 0.7) ** 2 + grid_y ** 2 <= 1.5 ** 2
        in_B = (grid_x - 0.7) ** 2 + grid_y ** 2 <= 1.5 ** 2
        mask = in_A & in_B
        ax.contourf(grid_x, grid_y, mask, levels=[0.5, 1.5],
                    colors=[color], alpha=0.55)
    elif "− B" in label:
        # A but not B.
        grid_x, grid_y = np.meshgrid(np.linspace(-3, 3, 300),
                                      np.linspace(-2.2, 2.2, 220))
        in_A = (grid_x + 0.7) ** 2 + grid_y ** 2 <= 1.5 ** 2
        in_B = (grid_x - 0.7) ** 2 + grid_y ** 2 <= 1.5 ** 2
        mask = in_A & ~in_B
        ax.contourf(grid_x, grid_y, mask, levels=[0.5, 1.5],
                    colors=[color], alpha=0.55)
    elif "symmetric" in label:
        grid_x, grid_y = np.meshgrid(np.linspace(-3, 3, 300),
                                      np.linspace(-2.2, 2.2, 220))
        in_A = (grid_x + 0.7) ** 2 + grid_y ** 2 <= 1.5 ** 2
        in_B = (grid_x - 0.7) ** 2 + grid_y ** 2 <= 1.5 ** 2
        mask = in_A ^ in_B
        ax.contourf(grid_x, grid_y, mask, levels=[0.5, 1.5],
                    colors=[color], alpha=0.55)

    # Outline the circles on top so the boundaries are visible.
    ax.add_patch(Circle((-0.7, 0), 1.5, fill=False, edgecolor="navy",   lw=1.5))
    ax.add_patch(Circle(( 0.7, 0), 1.5, fill=False, edgecolor="darkorange", lw=1.5))
    ax.text(-1.9, 1.1, "A", color="navy",       fontsize=14, fontweight="bold")
    ax.text( 1.7, 1.1, "B", color="darkorange", fontsize=14, fontweight="bold")
    ax.set_xlim(-3, 3); ax.set_ylim(-2.2, 2.2); ax.set_aspect("equal")
    ax.axis("off")
    ax.set_title(f"{label}\nresult = {sorted(result)}")

plt.tight_layout()
plt.show()

# Also confirm De Morgan's law numerically.
not_union   = U - (A | B)
not_int_dem = (U - A) & (U - B)
print(f"De Morgan: U \\ (A ∪ B) = {sorted(not_union)}")
print(f"           (U\\A) ∩ (U\\B) = {sorted(not_int_dem)}")
print(f"           Equal? {not_union == not_int_dem}  ✓")
```

**Two ideas every CS student needs to internalise:**

- **Set operations are operations on regions.** Every union,
  intersection, difference, and complement is just colouring in part
  of a Venn diagram. Once you can see them as shapes, the algebraic
  identities (associativity, distributivity, De Morgan's laws) become
  *obvious*.
- **Sets power most data manipulation.** Python's `set`, SQL's
  `UNION`/`INTERSECT`/`EXCEPT`, the join operations in pandas/Spark/
  Polars, and the type-theory operations in TypeScript and Rust are
  all set algebra in disguise.

## Connection to CS / Games / AI

- **Python `set`** — built-in set type with `|`, `&`, `-`, `^` operators
- **SQL** — `UNION`, `INTERSECT`, `EXCEPT` are set operations; `JOIN` is filtered Cartesian product
- **Databases** — relational algebra is built on set theory
- **Feature sets in ML** — feature selection, vocabulary sets in NLP
- **Power sets** — enumerate all possible subsets (used in search, game AI, combinatorial optimisation)
- **Bloom filters** — probabilistic set membership testing
- **Game dev** — collision groups, entity component systems use set operations

### Set-Builder Notation

We introduced this briefly above.  Let's formalise it.

The general form is:

$$\{x \in S : P(x)\}$$

Read: "the set of all $x$ in $S$ such that property $P(x)$ holds."

The colon ":" (or vertical bar "$\mid$") means "such that."

**Examples:**

$$\{n \in \mathbb{N} : n \text{ is even}\} = \{0, 2, 4, 6, \ldots\}$$

$$\{x \in \mathbb{R} : x^2 = 4\} = \{-2, 2\}$$

$$\{w \in \{\text{cat, dog, fish, bird}\} : \text{len}(w) = 3\} = \{\text{cat, dog}\}$$

**Why this matters:** Set-builder notation is everywhere in mathematics.
When you read "let $S = \{x \in \mathbb{R}^n : \|x\| \leq 1\}$" in an ML
paper, that's the unit ball — all vectors with norm at most 1.

### Indicator Functions

Given a set $A$ within a universe $U$, the **indicator function** (also called
the **characteristic function**) is:

$$\mathbf{1}_A(x) = \begin{cases} 1 & \text{if } x \in A \\ 0 & \text{if } x \notin A \end{cases}$$

**Pen & paper example:**

Let $U = \{1, 2, 3, 4, 5\}$ and $A = \{2, 4\}$.

| $x$ | 1 | 2 | 3 | 4 | 5 |
|-----|---|---|---|---|---|
| $\mathbf{1}_A(x)$ | 0 | 1 | 0 | 1 | 0 |

**Useful property — counting elements:**

$$|A| = \sum_{x \in U} \mathbf{1}_A(x)$$

From our example: $0 + 1 + 0 + 1 + 0 = 2 = |A|$ ✓

**Set operations with indicators:**

- $\mathbf{1}_{A \cap B}(x) = \mathbf{1}_A(x) \cdot \mathbf{1}_B(x)$ (both must be 1 → multiply)
- $\mathbf{1}_{A \cup B}(x) = \mathbf{1}_A(x) + \mathbf{1}_B(x) - \mathbf{1}_A(x) \cdot \mathbf{1}_B(x)$
- $\mathbf{1}_{\overline{A}}(x) = 1 - \mathbf{1}_A(x)$

> **Connection to ML:** One-hot encoding is exactly an indicator function.
> If your categories are $\{\text{cat, dog, fish}\}$ and the input is "dog",
> the one-hot vector $[0, 1, 0]$ is $[\mathbf{1}_{\{\text{cat}\}}, \mathbf{1}_{\{\text{dog}\}}, \mathbf{1}_{\{\text{fish}\}}]$.

### Cardinality: Countable and Uncountable Sets

For finite sets, $|A|$ is simply the number of elements.  But what about
infinite sets?  Are all infinities the same size?

**Countably infinite:** A set is **countably infinite** if its elements can be
listed in a sequence (i.e., put in one-to-one correspondence with $\mathbb{N}$).

$$|\mathbb{N}| = |\mathbb{Z}| = |\mathbb{Q}| = \aleph_0 \quad \text{("aleph-naught")}$$

This is surprising:
- $\mathbb{Z}$ looks "twice as big" as $\mathbb{N}$, but list them as $0, 1, -1, 2, -2, 3, -3, \ldots$ — every integer appears exactly once.
- $\mathbb{Q}$ looks "infinitely denser" than $\mathbb{Z}$, but a diagonal zigzag through a grid of fractions lists them all.

**Uncountably infinite:** $\mathbb{R}$ is **uncountable** — you cannot list
all real numbers in a sequence.

**Cantor's diagonal argument (brief sketch):**

Suppose you *could* list all reals in $[0, 1)$ as an infinite sequence:

$$r_1 = 0.d_{11} d_{12} d_{13} \ldots$$
$$r_2 = 0.d_{21} d_{22} d_{23} \ldots$$
$$r_3 = 0.d_{31} d_{32} d_{33} \ldots$$

Now construct a new number $r^*$ whose $n$-th digit differs from $d_{nn}$
(e.g., if $d_{nn} = 5$, pick 6; otherwise pick 5).  Then $r^*$ differs from
every $r_n$ in at least the $n$-th digit, so $r^*$ is NOT in the list.
Contradiction. ∎

> **Why this matters for CS:** The set of all computer programs is countable
> (they're finite strings).  The set of all functions $\mathbb{N} \to \{0,1\}$
> is uncountable.  Therefore most functions are **not computable** — a
> foundational result in computability theory.

### Supremum, Infimum, Argmax, Argmin

For a subset $S \subseteq \mathbb{R}$:

- $\max(S)$ = the largest element of $S$ (must be IN $S$)
- $\min(S)$ = the smallest element of $S$ (must be IN $S$)
- $\sup(S)$ = the **least upper bound** of $S$ (need NOT be in $S$)
- $\inf(S)$ = the **greatest lower bound** of $S$ (need NOT be in $S$)

**When max exists, $\sup = \max$.  But sup is more general.**

**Pen & paper example:**

$$S = \left\{\frac{1}{n} : n \in \mathbb{N}, n \geq 1\right\} = \left\{1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \ldots\right\}$$

- $\max(S) = 1$ (achieved at $n = 1$)
- $\sup(S) = 1$
- $\min(S)$ = **does not exist** (no smallest positive element — $1/n$ gets
  arbitrarily close to 0 but never reaches it)
- $\inf(S) = 0$ (0 is the greatest lower bound, but $0 \notin S$)

**Another example:** $S = (0, 1) = \{x \in \mathbb{R} : 0 < x < 1\}$ (open interval)

- $\sup(S) = 1$ but $1 \notin S$, so $\max(S)$ does not exist
- $\inf(S) = 0$ but $0 \notin S$, so $\min(S)$ does not exist

**Argmax and Argmin:**

Given a function $f$ and a set $S$:

$$\arg\max_{x \in S} f(x) = \text{the value of } x \text{ that makes } f(x) \text{ largest}$$
$$\arg\min_{x \in S} f(x) = \text{the value of } x \text{ that makes } f(x) \text{ smallest}$$

Note: $\max$ returns the **value** of $f$, while $\arg\max$ returns the **input** $x$.

**Pen & paper example:**

Let $f(x) = -x^2 + 4x$ and $S = \{0, 1, 2, 3, 4\}$.

| $x$ | 0 | 1 | 2 | 3 | 4 |
|-----|---|---|---|---|---|
| $f(x)$ | 0 | 3 | 4 | 3 | 0 |

- $\max_{x \in S} f(x) = 4$ (the largest output value)
- $\arg\max_{x \in S} f(x) = 2$ (the input that produces it)

> **In ML:**
> - MLE (Maximum Likelihood Estimation): $\hat{\theta} = \arg\max_\theta \mathcal{L}(\theta)$ — find the parameter that maximises the likelihood.
> - Classification output: $\hat{y} = \arg\max_k P(y = k \mid x)$ — pick the class with highest probability.
> - Training: $\hat{w} = \arg\min_w \mathcal{L}(w)$ — find the weights that minimise the loss function.

## Check Your Understanding

1. **Pen & paper:** Let $C = \{a, b, c, d\}$ and $D = \{c, d, e, f\}$. Find $C \cup D$, $C \cap D$, $C \setminus D$, $C \triangle D$.
2. **Pen & paper:** List all elements of $\mathcal{P}(\{a, b\})$.  How many are there?
3. **Pen & paper:** Using inclusion-exclusion, if $|A| = 20$, $|B| = 15$, $|A \cup B| = 30$, what is $|A \cap B|$?
4. **Pen & paper:** Prove using set algebra that $A \cap (A \cup B) = A$.
   (Hint: use the absorption law, or expand with distributive + complement laws.)
5. **Pen & paper:** Let $U = \{1, 2, 3, 4, 5\}$, $A = \{1, 3, 5\}$, $B = \{2, 3\}$. Write out the indicator functions $\mathbf{1}_A$, $\mathbf{1}_B$, and $\mathbf{1}_{A \cap B}$ as tables. Verify that $\mathbf{1}_{A \cap B}(x) = \mathbf{1}_A(x) \cdot \mathbf{1}_B(x)$ for each $x$.
6. **Think about it:** Let $S = \{x \in \mathbb{R} : x^2 < 2\}$.  What are $\sup(S)$ and $\inf(S)$?  Are they in $S$?  If $f(x) = 10 - (x - 3)^2$ and $S = \{1, 2, 3, 4, 5\}$, what is $\arg\max_{x \in S} f(x)$?
