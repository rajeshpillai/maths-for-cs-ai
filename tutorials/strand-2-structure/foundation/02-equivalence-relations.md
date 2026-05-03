---
strand: structure
level: foundation
order: 2
title: Equivalence Relations and Partitions
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 02-sets-introduction
    description: Sets
  - tier: strand-8-reasoning-foundation
    slug: 03-functions-and-relations
    description: Relations
connections:
  - strand-2-structure-foundation/03-modular-arithmetic-as-structure
applications:
  - cs: "Type equality, hash-based grouping, deduplication"
  - business: "Customer segmentation"
  - games: "Faction relationships, tile classifications"
  - life: "'Same as' across many dimensions"
---

# Equivalence Relations and Partitions

## Mental

An **equivalence relation** $\sim$ on a set $A$ is a relation that
behaves like equality:

- **Reflexive**: $a \sim a$ for all $a$.
- **Symmetric**: $a \sim b \Rightarrow b \sim a$.
- **Transitive**: $a \sim b \wedge b \sim c \Rightarrow a \sim c$.

Examples:

- "$=$" on any set.
- "is a sibling of" (on people, including being a sibling of
  oneself).
- "$a \equiv b \pmod n$" on $\mathbb{Z}$ (Strand 1 Intermediate
  Lesson 03).
- "has the same parity as" on $\mathbb{Z}$.

Each equivalence relation **partitions** the set into **equivalence
classes** — groups of mutually-related elements.

## The fundamental theorem

> An equivalence relation on $A$ corresponds to a **partition** of
> $A$ — a division into disjoint non-empty pieces whose union is $A$.

For each element $a$, the **equivalence class** $[a] = \{x : x \sim
a\}$ is the piece containing $a$.

Different equivalence classes are **disjoint** (by transitivity).
Their union is all of $A$ (by reflexivity).

## Modular arithmetic as equivalence

$a \equiv b \pmod n$ is an equivalence on $\mathbb{Z}$. For $n = 3$:

- $\{\ldots, -6, -3, 0, 3, 6, \ldots\}$: the class $[0]$ — multiples
  of 3.
- $\{\ldots, -5, -2, 1, 4, 7, \ldots\}$: $[1]$ — leave remainder 1.
- $\{\ldots, -4, -1, 2, 5, 8, \ldots\}$: $[2]$ — leave remainder 2.

Three classes — $\{[0], [1], [2]\}$. Their union is all of
$\mathbb{Z}$. They're called $\mathbb{Z}/3\mathbb{Z}$ or
$\mathbb{Z}_3$.

This is how modular arithmetic gets its **structure**: the integers
get **collapsed** into $n$ equivalence classes, on which $+$ and
$\times$ are well-defined.

## Interactive

:::widget type=numeric-input prompt="Is '$a$ has the same parity as $b$' an equivalence relation? (1 yes, 0 no.) Reflexive: $a$ has same parity as $a$. ✓ Symmetric. ✓ Transitive. ✓" answer=1 explain="Yes — equivalence relation.":::

:::widget type=numeric-input prompt="Is '$a$ is a friend of $b$' an equivalence relation in real life? (Symmetric perhaps; transitive — friend of friend not always a friend.)" answer=0 explain="Generally no — friendship isn't always transitive.":::

:::widget type=numeric-input prompt="Mod 4: $\\{0, 1, 2, 3\\}$ are the equivalence classes. Number of classes?" answer=4 explain="Four classes: $[0], [1], [2], [3]$.":::

:::widget type=numeric-input prompt="$23 \\equiv ? \\pmod 4$ — which class?" answer=3 explain="$23 = 5 \\cdot 4 + 3$, so $23 \\in [3]$.":::

## Symbolic

A relation $R$ on $A$ is an **equivalence relation** iff:

1. $\forall a: (a, a) \in R$ (reflexive).
2. $\forall a, b: (a, b) \in R \Rightarrow (b, a) \in R$ (symmetric).
3. $\forall a, b, c: (a, b), (b, c) \in R \Rightarrow (a, c) \in R$
   (transitive).

The **equivalence class** of $a$:

$$
[a] = \{b \in A : a \sim b\}.
$$

The **quotient set** $A/{\sim}$ is the set of equivalence classes.

Quotient sets are pervasive in algebra:

- $\mathbb{Z}/n\mathbb{Z}$: integers mod $n$.
- $\mathbb{Q}$: pairs $(p, q)$ of integers, with $(p, q) \sim (p', q')$
  iff $p q' = p' q$ (cross-multiplication for fraction equality).
- $\mathbb{R}/\mathbb{Z}$ (the **circle group**): real numbers mod 1
  — fractional parts.

## Computational

```python
def is_equivalence(rel, S):
    """Check that rel: S × S → bool is reflexive, symmetric, transitive."""
    for a in S:
        if not rel(a, a): return False
    for a in S:
        for b in S:
            if rel(a, b) and not rel(b, a): return False
    for a in S:
        for b in S:
            for c in S:
                if rel(a, b) and rel(b, c) and not rel(a, c): return False
    return True

# Same parity
def same_parity(a, b):
    return (a % 2) == (b % 2)

print(is_equivalence(same_parity, list(range(10))))   # True

# Group elements by equivalence class
from collections import defaultdict
def quotient(rel, S):
    classes = defaultdict(list)
    seen = set()
    for a in S:
        if a in seen: continue
        cls_key = a   # representative
        for b in S:
            if rel(a, b):
                classes[cls_key].append(b)
                seen.add(b)
    return list(classes.values())

print(quotient(same_parity, list(range(8))))
# [[0, 2, 4, 6], [1, 3, 5, 7]]
```

## Applied

- **Type systems**: structural equivalence — two types are "the
  same" if they have the same shape.
- **Hash-based deduplication**: hash equality is an equivalence
  relation (with very high probability of distinct elements being
  unequal).
- **Image classification**: clustering algorithms produce equivalence
  classes ("similar enough to belong together").

## Check Your Understanding

:::widget type=numeric-input prompt="Number of equivalence classes for 'mod 7' on $\\mathbb{Z}$?" answer=7 explain="$\\mathbb{Z}/7\\mathbb{Z}$ has 7 classes.":::

:::widget type=numeric-input prompt="Is '$a$ and $b$ have the same hash' an equivalence relation? Reflexive (✓), symmetric (✓), transitive (✓). (1 yes.)" answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$13 \\equiv ? \\pmod 5$." answer=3 explain="$13 = 2 \\cdot 5 + 3$.":::

:::widget type=numeric-input prompt="An equivalence relation partitions a set into ___ disjoint pieces. Type 0 if 'non-empty' is the answer." answer=0 explain="Non-empty — the only correct word here. Type 0 conceptually.":::
