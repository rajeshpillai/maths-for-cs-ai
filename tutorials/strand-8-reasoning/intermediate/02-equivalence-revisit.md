---
strand: reasoning
level: intermediate
order: 2
title: Equivalence Relations Revisited
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 01-zfc-axioms
    description: ZFC axioms
connections:
  - strand-8-reasoning-intermediate/03-peano-axioms
applications:
  - cs: "Type equivalence in compilers, hash-set deduplication, equivalence of programs"
  - life: "When are two things 'the same' for some purpose?"
---

# Equivalence Relations Revisited

## Explain Like I Am 7

Sort all the socks in the laundry basket into piles where each pile
holds socks "the same colour."  Three rules quietly hold: every sock
matches itself; if A matches B, then B matches A; and if A matches B
*and* B matches C, then A matches C.  Anything that obeys these three
rules — colour, shape, having-the-same-day-of-the-week — chops your
big basket into perfectly tidy piles with no overlaps.  That tidy
chopping job is what mathematicians do all the time when they decide
"these two things should count as the same."

## Mental

An **equivalence relation** on a set $S$ is a binary relation $\sim$
that is:

1. **Reflexive** — $a \sim a$ for all $a \in S$.
2. **Symmetric** — $a \sim b \Rightarrow b \sim a$.
3. **Transitive** — $a \sim b$ and $b \sim c \Rightarrow a \sim c$.

The key fact: an equivalence relation **partitions** $S$ into
disjoint **equivalence classes**, and conversely any partition of
$S$ defines an equivalence relation.

## The fundamental correspondence

$$
\text{equivalence relations on } S \;\longleftrightarrow\; \text{partitions of } S.
$$

Given $\sim$, the class of $a$ is $[a] = \{x \in S : x \sim a\}$.
Different classes are disjoint; their union is all of $S$.

## Quotient set

The set of equivalence classes is the **quotient**:

$$
S / \sim \; = \; \{[a] : a \in S\}.
$$

This is the formal mechanism behind:

- $\mathbb{Z} / n\mathbb{Z}$ — integers modulo $n$ (classes of "equal mod $n$").
- $\mathbb{Q}$ — pairs $(p, q)$ with $q \ne 0$, equivalent when $pq' = qp'$.
- $\mathbb{R}$ from Cauchy sequences of rationals (two sequences
  equivalent if their difference $\to 0$).
- Group cosets (Lagrange's theorem rests on this).

## Worked example: $\mathbb{Q}$ from $\mathbb{Z}$

Define on $\mathbb{Z} \times (\mathbb{Z} \setminus \{0\})$:

$$
(p, q) \sim (p', q') \iff p q' = q p'.
$$

Check the three properties:

- Reflexive: $p q = q p$. ✓
- Symmetric: $p q' = q p' \iff p' q = q' p$. ✓
- Transitive: $pq' = qp'$ and $p'q'' = q'p''$ imply $pq'' = qp''$
  (after multiplying and cancelling $q'$). ✓

A rational number is then *literally* an equivalence class:
$\frac{1}{2} = \{(1, 2), (2, 4), (-1, -2), \ldots\}$.

## Interactive

:::widget type=numeric-input prompt="On $\\mathbb{Z}$, $a \\sim b \\iff a \\equiv b \\pmod 5$. Class of $7$? Pick smallest non-negative representative." answer=2 explain="$7 \\bmod 5 = 2$.":::

:::widget type=numeric-input prompt="Equivalence classes of $\\equiv \\pmod 5$ on $\\mathbb{Z}$: how many?" answer=5 explain="$\\{0, 1, 2, 3, 4\\}$ — five classes.":::

:::widget type=numeric-input prompt="Is 'has the same height as' an equivalence relation on people? Reflexive ✓ symmetric ✓ transitive ✓. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Is $\\le$ on $\\mathbb{Z}$ an equivalence? Reflexive ✓, symmetric ✗ (1 ≤ 2 but not 2 ≤ 1). Type 0." answer=0 explain="No — symmetry fails.":::

## Symbolic

**Equivalence kernel**: any function $f: S \to T$ induces an
equivalence on $S$:

$$
a \sim_f b \iff f(a) = f(b).
$$

The classes are the fibres $f^{-1}(t)$. The induced map
$\bar f : S / \sim_f \to \mathrm{Im}\,f$ is a **bijection**. This is
the *first isomorphism theorem* for sets.

For groups, replace "function" by "homomorphism" and the same
recipe gives the first isomorphism theorem for groups (Strand 2
Intermediate territory).

## Computational

```python
# Build equivalence classes from a relation given by a predicate
def classes(elements, related):
    seen = []
    out = []
    for a in elements:
        if a in seen: continue
        cls = [b for b in elements if related(a, b)]
        seen.extend(cls)
        out.append(cls)
    return out

print(classes(range(15), lambda a, b: a % 5 == b % 5))
# [[0,5,10], [1,6,11], [2,7,12], [3,8,13], [4,9,14]] — 5 classes
```

```python
# Quotient set as the "deduplicated" image of a function
def quotient(elements, f):
    return list({f(a) for a in elements})

print(quotient(range(15), lambda x: x % 5))     # [0, 1, 2, 3, 4]
```

## Applied

- **Hash-set deduplication** — `set()` in Python uses the
  equivalence "$a == b \land \text{hash}(a) == \text{hash}(b)$".
- **Type equivalence in compilers** — when are two types "the same"?
  Structural vs nominal equivalence are competing relations.
- **Equivalence of programs** — observational equivalence is the
  fundamental relation in program-verification proofs.
- **Database normalization** — primary keys identify equivalence
  classes of records that "represent the same entity."

## Check Your Understanding

:::widget type=numeric-input prompt="Number of axioms for an equivalence relation: reflexive, symmetric, transitive." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="On $\\mathbb{Z}$, $a \\sim b \\iff |a| = |b|$. Class of $-3$ has elements $\\{-3, 3\\}$ — size?" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/4\\mathbb{Z}$ has how many elements?" answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="$\\mathbb{Q}$ is built from $\\mathbb{Z} \\times (\\mathbb{Z} \\setminus 0)$ modulo $(p,q) \\sim (p',q') \\iff pq' = qp'$. Type 1 if this is the construction." answer=1 explain="Yes — $\\mathbb{Q}$ is a quotient.":::
