---
strand: reasoning
level: advanced
order: 6
title: Realizability and Program Extraction
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 05-reverse-mathematics
    description: Reverse mathematics
connections:
  - strand-8-reasoning-advanced/07-modal-logic
applications:
  - cs: "Extract programs from constructive proofs; verified algorithm synthesis"
  - life: "Proofs are programs in disguise"
---

# Realizability and Program Extraction

## Mental

**Realizability** — a way to interpret intuitionistic logic in terms
of computable functions. Each proposition $\phi$ has a set of
**realizers**: programs (typically Turing machines or λ-terms) that
witness $\phi$ in a constructive sense.

| Proposition | A realizer is... |
|---|---|
| $A \land B$ | a pair $(r_A, r_B)$ |
| $A \lor B$ | a tag + realizer of the chosen disjunct |
| $A \to B$ | a function turning $A$-realizers into $B$-realizers |
| $\forall x : N, A(x)$ | a function $n \mapsto $ realizer of $A(n)$ |
| $\exists x : N, A(x)$ | a pair $(n, r)$ where $r$ realizes $A(n)$ |

A constructive proof of $\exists x : N, A(x)$ thus *contains an
algorithm computing $x$*.

## Program extraction

In Coq/Agda, a constructive proof of "for every $n$, there exists $m$
with $P(n, m)$" mechanically extracts to a function `f : Nat -> Nat`
with proven property $P(n, f(n))$.

This is **the** practical use of constructive logic in CS: write a
proof, get a verified algorithm.

## Worked example: extracting a sorting algorithm

In Coq, prove:

```
forall (xs : list Nat),
  exists (ys : list Nat), Permutation xs ys /\ Sorted ys.
```

The constructive proof must *compute* the sorted list. Extraction
mechanism produces a (verified) sorting algorithm, e.g. mergesort.

## Curry-Howard at work

Realizability **is** the Curry-Howard correspondence (Lessons in
Strand 8 Foundation/Intermediate):

- Propositions = types.
- Proofs = programs.
- Constructive proof = computable witness.

Realizability *predates* Curry-Howard (Kleene 1945) but matches the
same idea.

## Interactive

:::widget type=numeric-input prompt="Realizer of $A \\to B$: function turning $A$-realizers into $B$-realizers. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Realizer of $\\exists x. P(x)$: pair $(x, \\text{realizer of } P(x))$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Constructive proof of $\\exists$ extracts to algorithm. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Coq supports program extraction. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Effective topos** (Hyland 1982): a topos whose internal logic is
realizability with Turing-machine realizers. Provides a
"category-theoretic universe of computability."

**Recursive realizability** (Kleene 1945): the original; uses
recursive functions as realizers. Witnesses Markov's principle and
related schemata.

**Modified realizability** (Kreisel) adds extra typing structure to
sharpen the correspondence.

**Categories of realizability**: PCAs (partial combinatory algebras),
order-PCAs — abstract realizability over models of computation.

## Computational

```python
# Realizability illustrated: extract a function from a constructive existence proof

# Existence: forall n: Nat, exists m: Nat, m > n
# Realizer: lambda n: n + 1

def successor_witness(n):
    return n + 1

# Verifies the property
def verifies(n):
    m = successor_witness(n)
    return m > n

print(all(verifies(n) for n in range(100)))     # True

# Existence: forall xs, exists ys, Permutation xs ys /\ Sorted ys
def sort_witness(xs):
    return sorted(xs)

def is_permutation(xs, ys):
    return sorted(xs) == sorted(ys)

def is_sorted(ys):
    return all(ys[i] <= ys[i + 1] for i in range(len(ys) - 1))

xs = [3, 1, 4, 1, 5, 9, 2, 6]
ys = sort_witness(xs)
assert is_permutation(xs, ys) and is_sorted(ys)
print(ys)                                        # the witness

# Coq extraction (pseudocode):
# In Coq we'd prove a Sigma-type and extract its first projection.
```

## Applied

- **CompCert** — constructive proof of compiler correctness in Coq;
  `Extraction Language OCaml` produces the verified compiler binary.
- **Verified algorithms** — Bedrock, Iris, Software Foundations text
  use realizability/extraction to produce verified parsers, runtimes.
- **Type-driven development** — Idris (and increasingly Haskell with
  GHC `-XDataKinds`) blur the line between programs and proofs.
- **Computational mathematics** — formalised proof of Kepler conjecture
  (Hales) involved extracting a verified algorithm to check
  combinatorial cases.

## Check Your Understanding

:::widget type=numeric-input prompt="Realizability ↔ Curry-Howard. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Constructive proof of $\\exists x. P(x)$ contains an algorithm to find $x$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Effective topos uses Turing-machine realizers. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CompCert is extracted from a Coq proof. Type 1." answer=1 explain="Yes.":::
