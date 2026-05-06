---
strand: pattern-counting
level: intermediate
order: 6
title: Bijective Combinatorics
prerequisites:
  - tier: strand-5-pattern-counting-intermediate
    slug: 05-catalan-numbers
    description: Catalan numbers (multiple equal counts)
connections:
  - strand-5-pattern-counting-foundation/03-combinations
applications:
  - cs: "Algorithm correctness via mapping arguments"
  - games: "Counting puzzle states by reduction"
  - life: "Recognising 'this is the same problem as that'"
---

# Bijective Combinatorics

## Explain Like I Am 7

Imagine two different bowls of jellybeans.  You don't want to count
each bowl one by one — instead, you find a magic rule that pairs
each bean in bowl A with exactly one bean in bowl B, and vice
versa.  If every bean has its perfect partner, the two bowls
*must* hold the same number, no counting required.  This pairing
trick — a **bijection** — is one of the most elegant ways to prove
that two completely different-looking puzzles have the same answer.
You don't have to compute either count; you just hold up the pairing.

## Mental

A **bijection** is a one-to-one correspondence between two
collections — pairing each element of one with exactly one element of
the other.

When you can bijectionate two seemingly-different collections, **they
have the same count**. This is a powerful proof technique: instead of
computing both counts directly, exhibit a pairing.

> If $f: A \to B$ is a bijection, then $|A| = |B|$.

We've already used this informally:

- **Stars and bars** (Foundation Lesson 06): bijection between
  non-negative integer solutions $(x_1, \ldots, x_k)$ summing to $n$
  and arrangements of $n$ stars + $(k-1)$ bars.
- **Pascal's identity** (Foundation Lesson 04): bijection between
  $k$-subsets of $\{1, \ldots, n\}$ that contain $n$ and
  $(k-1)$-subsets of $\{1, \ldots, n-1\}$.

A clean bijection often **proves** an identity that would be
algebraically tedious to verify. The proof is elegant because it
reveals **why** the counts are equal — they correspond to the *same
underlying structure*.

## A worked bijection

**Problem**: prove $\binom{n}{k} = \binom{n}{n-k}$.

**Algebraic proof**: $\dfrac{n!}{k!(n-k)!} = \dfrac{n!}{(n-k)!\,k!}$
by commutativity. ✓

**Bijective proof**: take any $k$-subset $S$ of $\{1, \ldots, n\}$.
Map it to its **complement** $\{1, \ldots, n\} \setminus S$, which is
an $(n-k)$-subset. This map is its own inverse (mapping the complement
back gives $S$ again), so it's a bijection. Hence
$|\{k\text{-subsets}\}| = |\{(n-k)\text{-subsets}\}|$.

The bijective proof is shorter and **explains** the identity: choosing
what to include is the same as choosing what to exclude.

## Catalan bijections

The Catalan numbers count many things (Lesson 05). Bijections between
these pairings are deep and beautiful:

- **Balanced parentheses** ↔ **Dyck paths** (lattice paths above the
  diagonal): map "(" to "go right" and ")" to "go up." The balance
  condition becomes "never cross the diagonal."
- **Binary trees with $n$ nodes** ↔ **balanced parens with $n$
  pairs**: each tree has a depth-first traversal; outputting "(" on
  descent and ")" on ascent gives a balanced-parens string.
- **Triangulations of an $(n+2)$-gon** ↔ **binary trees with $n$
  internal nodes**: pick a fixed edge as "root," then recursively
  identify the triangle adjacent to it.

Each bijection is its own little theorem.

## Interactive

:::widget type=numeric-input prompt="There's a bijection between $k$-subsets of an $n$-set and $(n-k)$-subsets of the same $n$-set. So $\\binom{6}{2} = \\binom{6}{?}$ — type the missing number." answer=4 explain="$n - k = 6 - 2 = 4$. $\\binom{6}{2} = \\binom{6}{4} = 15$.":::

:::widget type=numeric-input prompt="The number of binary strings of length $n$ with exactly $k$ ones equals — by bijection — the number of binary strings of length $n$ with exactly $n - k$ ones. (Bijection: flip all bits.) For $n = 8$, this means $\\binom{8}{3}$ binary strings with exactly $3$ ones is the same as $\\binom{8}{?}$ strings with exactly $5$ ones." answer=5 explain="$n - k = 8 - 3 = 5$. Same count.":::

:::widget type=numeric-input prompt="A common Catalan bijection: $C_3 = 5$ binary trees with $3$ internal nodes ↔ $5$ balanced parens with $3$ pairs. Both equal what?" answer=5 explain="$C_3 = 5$.":::

## Symbolic

A **bijection** is a function $f: A \to B$ that is both:

- **Injective** (one-to-one): different inputs give different outputs.
- **Surjective** (onto): every $b \in B$ has some $a \in A$ with
  $f(a) = b$.

When $f: A \to B$ is a bijection, $|A| = |B|$ (for finite sets) and
$f$ has an inverse $f^{-1}: B \to A$.

Two general bijection-based proof techniques:

1. **Direct bijection**: define $f$, prove injective and surjective.
2. **Two-way construction**: define both $f: A \to B$ and $g: B \to A$
   and show $g \circ f = \text{id}$ and $f \circ g = \text{id}$.

The second is often easier when both directions are natural.

## Computational

```python
def is_bijection(f, A, B):
    """Check if f: A -> B is a bijection."""
    fA = [f(a) for a in A]
    if len(set(fA)) != len(fA): return False   # not injective
    if set(fA) != set(B): return False          # not surjective
    return True

# Bijection: complement map for subsets of {1,2,3,4}
A = [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]   # 2-subsets
B = [(3, 4), (2, 4), (2, 3), (1, 4), (1, 3), (1, 2)]   # 2-subsets (complements of 2-subsets are 2-subsets)
def complement(t):
    return tuple(sorted({1,2,3,4} - set(t)))

print(is_bijection(complement, A, A))   # True
```

## Applied

- **"This is the same problem"**: bijective reasoning lets you
  reduce a hard problem to a known one. This is fundamental to
  **algorithm reductions** — proving NP-hardness uses bijections
  between problem instances.
- **Combinatorial proofs in textbooks**: many published identities
  prefer bijective proofs over algebraic ones because they reveal
  structure.

## Check Your Understanding

:::widget type=numeric-input prompt="If $|A| = 5$ and there's a bijection $f: A \\to B$, what is $|B|$?" answer=5 explain="A bijection preserves count.":::

:::widget type=numeric-input prompt="$\\binom{10}{3}$ equals $\\binom{10}{?}$ by complement bijection." answer=7 explain="$10 - 3 = 7$.":::

:::widget type=numeric-input prompt="The number of ways to seat $n$ guests at a round table (rotational equivalence) is $(n-1)!$. There's a bijection: 'fix guest 1's seat, permute others.' For $n = 5$ guests, the count is..." answer=24 explain="$(5-1)! = 24$.":::

:::widget type=numeric-input prompt="Bijection: each $k$-element subset of $\\{1, ..., n\\}$ ↔ each binary string of length $n$ with exactly $k$ ones. For $\\{1, 2, 3, 4, 5\\}$ and $k = 2$, there are $\\binom{5}{2} = ?$ of each." answer=10 explain="$\\binom{5}{2} = 10$.":::
