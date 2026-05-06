---
strand: reasoning
level: master
order: 6
title: Cubical Type Theory and Univalent Foundations
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 05-model-theory
    description: Model theory
connections:
  - strand-8-reasoning-master/07-game-semantics
applications:
  - cs: "Cubical Agda; computational HoTT; future of math foundations"
  - life: "Equality with intrinsic computational meaning"
---

# Cubical Type Theory and Univalent Foundations

## Explain Like I Am 7

Imagine a math universe where "looking the same" really *means* "is
the same" — two perfectly identical Lego houses are not just twins,
they are the *very same house*.  Univalent foundations is that
universe.  But there was a snag: the rules said "two equivalent
things may be swapped" without telling you *how* to actually swap
them.  **Cubical type theory** plugs that hole using a stretchy
"interval" — a tiny ruler from 0 to 1 — so the swap can actually be
performed step by step inside the computer.

## Mental

**HoTT** (Lesson 01) had a *non-computational* univalence axiom:
asserting equivalence implies equality, but not how to compute with
equalities derived from equivalences.

**Cubical type theory** (Cohen-Coquand-Huber-Mörtberg 2015) makes
univalence *computational*:

- Add an interval type $\mathbb I = [0, 1]$ — formalised abstract
  interval.
- A path $p : a = b$ becomes a function $p : \mathbb I \to A$ with
  $p(0) = a, p(1) = b$.
- Path operations (path induction, transport) get explicit
  computational rules.

Implemented in **Cubical Agda** — a type-checker that can compute
with HoTT axioms.

## Univalent foundations

**Voevodsky's program** (~2009-2017): redo mathematics with HoTT as
foundation:

- Sets are 0-truncated types.
- Mathematical structures are types of higher truncation level.
- Equality of structures = isomorphism (via univalence).
- Quotient types are first-class.

Formalised in Coq's UniMath library.

## What changes?

In ZFC:

- Sets are primary; structures are sets with extra data.
- Isomorphic structures are *equal* by careful set-theoretic
  identification (lots of "up to iso" verbiage).

In univalent foundations:

- Types are primary; truncation level captures structure.
- Equivalence ≃ equality (univalence).
- "Up to iso" is *automatic*.

Closer to working mathematicians' actual practice.

## Worked example: function extensionality

In MLTT alone, function ext fails: $f, g : A \to B$ with $f(x) = g(x)$
for every $x$ doesn't imply $f = g$ as terms.

In HoTT/UF: function extensionality is provable from univalence.

In Cubical type theory: function extensionality is *computable* — the
proof gives a path between $f$ and $g$ that can be transported along.

## Interactive

:::widget type=numeric-input prompt="Cubical type theory by Cohen-Coquand-Huber-Mörtberg 2015. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Path = function $\\mathbb I \\to A$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cubical Agda: computational HoTT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Voevodsky's univalent foundations program. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Kan operations**: composition + filling of cubes; provide structure
needed for equivalence-induction to compute.

**Glue types**: explicit construction allowing transport along
equivalences.

**Higher inductive types** (HITs): both points and paths constructors;
computational rules in cubical setting are non-trivial.

**Modal type theory**: extends UF with modalities (e.g., guarded
recursion); used for synthetic differential geometry, real-cohesive
type theory.

## Computational

```python
# Sketch: cubical-style path manipulation in pseudocode

# Path between two values (in Cubical type theory)
class Path:
    def __init__(self, start, end, fn):
        self.start = start
        self.end = end
        self.fn = fn       # interval [0, 1] -> Type
        assert fn(0) == start
        assert fn(1) == end

    def at(self, t):
        return self.fn(t)

# Function extensionality (sketch)
def funext(f, g, h):
    """h : ∀ x. f x = g x → path from f to g."""
    return Path(f, g, lambda t: lambda x: h(x).at(t))

# Use case: equality of two equivalent functions
f = lambda x: x + 1
g = lambda x: 1 + x
# h : ∀ x. f x = g x by reflexivity (since + is commutative on Nat)
# Cubical Agda would derive funext(f, g, h) automatically.

# Actual Cubical Agda code (illustrative):
# funext : (∀ x → f x ≡ g x) → f ≡ g
# funext h i x = h x i

print("Function extensionality: derived in HoTT, computable in Cubical TT.")
```

## Applied

- **Cubical Agda** — full computational HoTT type checker.
- **Coq's HoTT library** — implements axiomatic HoTT in classical
  Coq.
- **Lean's mathlib** — uses some HoTT-inspired patterns (although
  Lean's foundation is CIC).
- **AlphaProof / formalised mathematics** — automated theorem proving
  in dependent-type-theoretic settings.
- **AI safety theory** — formal proofs of program properties using
  HoTT-style reasoning.

## Check Your Understanding

:::widget type=numeric-input prompt="Cubical type theory makes univalence computational. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Path = function on interval $\\mathbb I$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Function extensionality derivable from univalence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Voevodsky's program: HoTT as foundation of mathematics. Type 1." answer=1 explain="Yes.":::
