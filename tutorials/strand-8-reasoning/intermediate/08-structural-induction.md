---
strand: reasoning
level: intermediate
order: 8
title: Structural Induction
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 07-function-proofs
    description: Proofs about functions
connections:
  - strand-8-reasoning-intermediate/09-reasoning-capstone-2
applications:
  - cs: "Compiler correctness, programming-language semantics, AST proofs"
  - life: "Induction over things shaped like trees, lists, or grammars"
---

# Structural Induction

## Mental

**Structural induction** generalises ordinary induction from $\mathbb{N}$
to any **inductively defined data structure**.

For natural numbers: structure built up from $0$ via $S$. For lists:
built up from $\mathrm{nil}$ via $\mathrm{cons}(x, \ell)$. For binary
trees: built up from $\mathrm{leaf}$ via $\mathrm{node}(L, R)$. For
arithmetic expressions: built from constants/variables via $+, \cdot$,
etc.

For each datatype, induction has one **base case per leaf
constructor** and one **inductive step per recursive constructor**.

## Worked example: list length and reverse

Define lists and operations:

- $\ell$ ::= $\mathrm{nil}$ | $\mathrm{cons}(x, \ell)$
- $\mathrm{len}(\mathrm{nil}) = 0$, $\mathrm{len}(\mathrm{cons}(x, \ell)) = 1 + \mathrm{len}(\ell)$
- $\mathrm{rev}(\mathrm{nil}) = \mathrm{nil}$,
  $\mathrm{rev}(\mathrm{cons}(x, \ell)) = \mathrm{rev}(\ell) \mathbin{+\!+} \mathrm{cons}(x, \mathrm{nil})$

**Theorem**: $\mathrm{len}(\mathrm{rev}(\ell)) = \mathrm{len}(\ell)$.

**Proof by structural induction on $\ell$**.

*Base*: $\mathrm{len}(\mathrm{rev}(\mathrm{nil})) = \mathrm{len}(\mathrm{nil}) = 0$. ✓

*Step*: assume $\mathrm{len}(\mathrm{rev}(\ell)) = \mathrm{len}(\ell)$.
Show for $\mathrm{cons}(x, \ell)$:

$$
\mathrm{len}(\mathrm{rev}(\mathrm{cons}(x, \ell))) = \mathrm{len}(\mathrm{rev}(\ell) \mathbin{+\!+} \mathrm{cons}(x, \mathrm{nil})).
$$

Use the auxiliary lemma $\mathrm{len}(a \mathbin{+\!+} b) = \mathrm{len}(a) + \mathrm{len}(b)$
(itself proved by structural induction on $a$):

$$
= \mathrm{len}(\mathrm{rev}(\ell)) + \mathrm{len}(\mathrm{cons}(x, \mathrm{nil})) = \mathrm{len}(\ell) + 1 = \mathrm{len}(\mathrm{cons}(x, \ell)). \square
$$

## Binary tree case

Tree $::= \mathrm{leaf}$ | $\mathrm{node}(L, R)$.

To prove $P$ holds for every tree:

1. Show $P(\mathrm{leaf})$.
2. Show $P(L) \land P(R) \Rightarrow P(\mathrm{node}(L, R))$.

**Example**. Number of leaves in a tree equals number of nodes plus
$1$? Wait — that's only true for *full binary trees*. Adjust the
inductive type: $\mathrm{tree}::= \mathrm{leaf}$ | $\mathrm{node}(L, R)$
where every internal node has exactly two children. Then:

$\mathrm{leaves}(\mathrm{leaf}) = 1, \;\mathrm{leaves}(\mathrm{node}(L, R)) = \mathrm{leaves}(L) + \mathrm{leaves}(R)$
$\mathrm{nodes}(\mathrm{leaf}) = 0, \;\mathrm{nodes}(\mathrm{node}(L, R)) = 1 + \mathrm{nodes}(L) + \mathrm{nodes}(R)$

**Theorem**: $\mathrm{leaves}(t) = \mathrm{nodes}(t) + 1$.

Base: $1 = 0 + 1$. ✓ Step: $\mathrm{leaves}(L) + \mathrm{leaves}(R) = \mathrm{nodes}(L) + 1 + \mathrm{nodes}(R) + 1 = \mathrm{nodes}(\mathrm{node}(L, R)) + 1$. ✓ □

## Interactive

:::widget type=numeric-input prompt="Number of base cases for proof by induction on lists (constructors $\\mathrm{nil}$ and $\\mathrm{cons}$)?" answer=1 explain="$1$ base ($\\mathrm{nil}$), $1$ inductive step ($\\mathrm{cons}$).":::

:::widget type=numeric-input prompt="A full binary tree with 5 leaves has how many internal nodes? (leaves = nodes + 1)" answer=4 explain="$5 - 1 = 4$.":::

:::widget type=numeric-input prompt="$\\mathrm{len}([1, 2, 3]) = ?$" answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="$\\mathrm{len}(\\mathrm{rev}([1, 2, 3])) = \\mathrm{len}([3, 2, 1]) = ?$" answer=3 explain="$3$ — reverse preserves length.":::

## Symbolic

**Why structural induction is sound**: every element of an
inductively defined datatype has a finite construction history.
Proving $P$ for the base constructors and "if $P$ holds on parts,
holds on the whole" guarantees $P$ for every term — by induction
on construction depth.

**Mutually inductive types**: e.g. expressions and statements in a
programming language. Structural induction generalises to mutual
recursion: prove a property simultaneously for each datatype.

**Coinduction** is the dual — for *infinite* data structures (lazy
streams, possibly-non-terminating processes). Different proof
principle, beyond intermediate scope.

## Computational

```python
# Lists as algebraic data
def length(L):
    if L == []:
        return 0
    return 1 + length(L[1:])

def reverse(L):
    if L == []:
        return []
    return reverse(L[1:]) + [L[0]]

# Verify the theorem on examples
for L in [[], [1], [1, 2, 3], list(range(20))]:
    assert length(reverse(L)) == length(L)

# Trees
def leaves(t):
    if t == "leaf":
        return 1
    L, R = t
    return leaves(L) + leaves(R)

def nodes(t):
    if t == "leaf":
        return 0
    L, R = t
    return 1 + nodes(L) + nodes(R)

t = (("leaf", "leaf"), (("leaf", "leaf"), "leaf"))
assert leaves(t) == nodes(t) + 1
print("ok")
```

## Applied

- **Compiler correctness** — proofs of "preserves semantics" are
  structural inductions on the AST.
- **Operational semantics** — proofs of "well-typed expressions don't
  get stuck" are structural inductions on derivation trees.
- **Programming language design** — when designing a new
  construct, prove its meta-theory by structural induction.
- **Tree algorithms** — correctness of tree-traversal, balanced-tree
  rotations, dynamic-programming on trees rests on structural
  induction.

## Check Your Understanding

:::widget type=numeric-input prompt="To prove a property holds for every binary tree, induction has 2 cases: leaf and internal node. Type 2." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Structural induction generalises from $\\mathbb{N}$ to any inductively defined datatype. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Coinduction is the dual, used for infinite data. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{len}(\\mathrm{cons}(3, [1, 2])) = ?$" answer=3 explain="$3$.":::
