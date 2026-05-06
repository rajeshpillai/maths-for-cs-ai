---
strand: reasoning
level: master
order: 0
title: Martin-Löf Type Theory
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 09-reasoning-capstone-3
    description: Reasoning advanced capstone
connections:
  - strand-8-reasoning-master/01-homotopy-type-theory
applications:
  - cs: "Proof assistants (Coq, Lean, Agda, Idris); dependently-typed programming"
  - life: "Constructive type-theoretic foundation of mathematics"
---

# Martin-Löf Type Theory

## Explain Like I Am 7

Imagine a giant box of jigsaw pieces where each piece wears a sticker
saying exactly what shape it is *and* which other shapes it can plug
into.  In this world, "writing a proof" is the same as "snapping
matching pieces together" — there's literally no difference between
"a working puzzle" and "a finished proof."  **Martin-Löf type theory**
is this whole jigsaw kit.  It's the foundation behind proof
assistants like Coq and Lean, where humans and computers cooperate by
clicking pieces into place.

## Mental

**Martin-Löf type theory (MLTT)** is a constructive type theory and
foundation of mathematics. Types and terms are primary; logic
emerges from the Curry-Howard correspondence (Strand 8 Advanced
Lesson 01).

**Key features**:

- **Dependent types**: types that depend on values.
- **Inductive types**: defined by constructors.
- **Propositional equality** $a =_A b$: a type whose inhabitants are
  proofs of equality.
- **Universes** $\mathcal U_0 : \mathcal U_1 : \ldots$ — hierarchy
  preventing paradoxes.

## Inference rules

Forms:

- **Formation**: how to form a type. E.g., for $\Pi$: given $A : \mathcal U$
  and $B : A \to \mathcal U$, form $\Pi (x : A). B(x)$.
- **Introduction**: how to construct a term of the type.
- **Elimination**: how to use a term of the type.
- **Computation rules**: $\beta$-reduction.

For $\Pi$: introduction is $\lambda x. b$; elimination is application
$f a$.

## Identity types

The **identity type** $a =_A b$ has constructors:

$$
\mathrm{refl}_a : a =_A a.
$$

Eliminator (J rule): given $C : \prod_{a, b : A} (a =_A b) \to \mathcal U$
and a function on $\mathrm{refl}$, get a function on all paths.

In **intensional** MLTT, $a = b$ doesn't imply syntactic identity —
"two equal things may have distinct equality proofs."

## Worked example: addition is commutative

In MLTT, prove $\forall n, m : \mathbb N, n + m = m + n$:

```
comm : Π n m : ℕ. n + m = m + n
comm zero m = right-zero-id m              -- 0 + m = m
comm (succ n) m =
  let ih = comm n m
  in trans (cong succ ih) (succ-comm n m)  -- by induction
```

The proof *is* a function. Constructive: gives an algorithm.

## Interactive

:::widget type=numeric-input prompt="MLTT: dependent types fundamental. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Identity type $a =_A b$ with $\\mathrm{refl}_a$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Universes $\\mathcal U_0 : \\mathcal U_1 : \\ldots$ avoid Russell-style paradoxes. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Curry-Howard: types ↔ propositions. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Inductive types**: $\mathbb N$ with constructors $0$, $\mathrm{succ}$;
$\mathrm{List}\ A$ with $\mathrm{nil}$, $\mathrm{cons}$. Eliminator
generalises mathematical induction.

**Inductive families**: $\mathrm{Vec}\ n\ A$ — vectors of fixed
length.

**W-types**: well-founded trees, generalising natural numbers.

**Higher inductive types** (HITs, HoTT): types with both point and
path constructors. Foundation of HoTT (next lesson).

**Cubical type theory** (Cohen-Coquand-Huber-Mörtberg): provides
*computational* meaning for HoTT's univalence axiom.

## Computational

```python
# MLTT in Python (illustrative; real implementation needs dependent types)

# Inductive Nat
class Nat:
    def __init__(self, n): self.n = n
    def succ(self): return Nat(self.n + 1)
    def __repr__(self): return str(self.n)

zero = Nat(0)
one = zero.succ()
two = one.succ()

# Identity type as a class with refl
class Path:
    def __init__(self, lhs, rhs):
        if lhs.n == rhs.n:
            self.proof = "refl"
        else:
            raise ValueError("not equal")

# Identity J rule (sketch)
def J(C, base, p):
    """C : (a, b, p) -> Type, base : C(a, a, refl), p : a = b -> C(a, b, p)"""
    if p.proof == "refl":
        return base
    raise NotImplementedError

# Pi type as Python function
def double(n: Nat) -> Nat:
    return Nat(n.n * 2)

print(double(two))   # 4

# Sigma type as a pair
def find_succ_above_5():
    n = zero
    while n.n <= 5:
        n = n.succ()
    return (n, "n > 5")

print(find_succ_above_5())   # (6, 'n > 5')

# In real MLTT (Lean / Coq / Agda), these are all proper types with
# dependent eliminators verifying logical guarantees at type-check time.
```

## Applied

- **Proof assistants** — Coq, Lean, Agda, Idris all implement variants
  of MLTT.
- **Dependently-typed programming** — types prevent classes of bugs
  at compile time.
- **Mathematical formalisation** — Lean's `mathlib` (over $10^6$ lines
  of formalised math) uses Calculus of Inductive Constructions
  (CIC, an MLTT extension).
- **AlphaProof / AI-assisted theorem proving** — works in Lean's
  CIC.
- **Type-theoretic semantics of programming languages** — System F,
  CC, MLTT extensions for typed lambda calculi.

## Check Your Understanding

:::widget type=numeric-input prompt="MLTT is constructive. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Identity type intensional: many equality proofs possible. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Coq / Lean / Agda implement MLTT-like systems. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cubical type theory makes HoTT computational. Type 1." answer=1 explain="Yes.":::
