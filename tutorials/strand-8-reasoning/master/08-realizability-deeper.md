---
strand: reasoning
level: master
order: 8
title: Realizability and Effective Topos
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 07-game-semantics
    description: Game semantics
connections:
  - strand-8-reasoning-master/09-reasoning-master-capstone
applications:
  - cs: "Constructive analysis, computability-aware proof systems"
  - life: "Mathematics where every proof gives an algorithm"
---

# Realizability and Effective Topos

## Explain Like I Am 7

Earlier you saw that proofs secretly carry working gadgets inside.
Now picture an entire *math universe* where **only** things you can
actually compute are allowed to exist — anything that can't be
calculated by some little robot is simply absent from the world.
This computer-only snow globe is called the *effective topos*, and
doing math inside it is like building cars where every tool must be
buildable from scratch in the workshop.  Strange things happen — but
everything is provably constructable.

## Mental

Strand 8 Advanced Lesson 06 introduced realizability: each
proposition has a set of *realizers* (computable witnesses). Master-
level themes:

- **Effective topos** $\mathrm{Eff}$: a topos whose internal logic
  is realizability over Turing machines.
- **Modified realizability**: refinements with explicit typing.
- **Synthetic computability**: do mathematics inside $\mathrm{Eff}$
  with everything automatically computable.

## Effective topos

Hyland (1982) constructed $\mathrm{Eff}$ — a topos with:

- Objects: "modest sets" (sets equipped with realizability relation).
- Internal logic: intuitionistic, with **Markov's principle**
  (decidability of certain $\Sigma^0_1$ statements).
- Internal "true reals" form a structure of *computable reals*.
- Brouwerian intuitionism becomes a *theorem* in $\mathrm{Eff}$.

Working synthetically inside $\mathrm{Eff}$:

- Every function $\mathbb N \to \mathbb N$ is computable.
- Every function $\mathbb R \to \mathbb R$ is continuous (when reals
  defined Cauchy-effectively).
- Halting problem is undecidable as expected.

Beautiful payoff: theorems proved in $\mathrm{Eff}$ are
*automatically* algorithmic.

## Realizability and forcing

Both **realizability** and **forcing** (Strand 8 Advanced Lesson 04)
construct toposes / models with non-classical logic. Different
choices of "realizer / generic" give different models.

Modern unified framework: **classical realizability** (Krivine) bridges
realizability and forcing. Computational interpretation of classical
proofs.

## Worked example: bar induction

In intuitionism, **bar induction** is an axiom about well-founded
trees. In $\mathrm{Eff}$:

- Bar induction holds.
- The fan theorem (compactness for $2^\mathbb N$) holds.
- These give Brouwerian features in a computational topos.

**Remarkably**: classical analysis is not constructive (LEM,
choice), but *much* of it survives in $\mathrm{Eff}$ via different
proofs — *automatically computable*.

## Interactive

:::widget type=numeric-input prompt="Effective topos by Hyland (1982). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Internal logic of $\\mathrm{Eff}$ is intuitionistic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In $\\mathrm{Eff}$: every $\\mathbb N \\to \\mathbb N$ function is computable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Krivine's classical realizability connects forcing and realizability. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Realizability for higher types**: hierarchies of computable
functionals (Kleene, Kreisel).

**Constructive type theory and realizability**: every program in
MLTT is a realizer of a proposition; converse holds for nicely
reducing terms.

**PCAs (partial combinatory algebras)**: abstract realizability over
arbitrary "computation models." Relativise effective topos to e.g.
$\lambda$-calculus or polynomial-time computation.

**Reverse mathematics meets realizability**: Friedman's program of
calibrating which axioms are needed for which theorems.

## Computational

```python
# Realizers for propositions in Python (illustrative)

# Realizer of (∀ n. ∃ m. m > n) is a function n ↦ (m, proof m > n)
def successor_witness(n):
    return (n + 1, "trivially n + 1 > n")

# Realizer of A → B: function transforming A-realizers into B-realizers
def implication_realizer(transform):
    return transform

# Realizer of A ∧ B: pair
def conjunction_realizer(a_realizer, b_realizer):
    return (a_realizer, b_realizer)

# Realizer of A ∨ B: tag + realizer
def disjunction_left(a_realizer):
    return ("left", a_realizer)

def disjunction_right(b_realizer):
    return ("right", b_realizer)

# Effective topos analogue: only computable functions exist as morphisms
def is_effective_morphism(f, dom):
    """Check that f is a computable function on a finite domain."""
    try:
        for x in dom:
            f(x)
        return True
    except Exception:
        return False

# Eff sees only computable functions; uncomputable HALT excluded
print(is_effective_morphism(lambda n: n + 1, range(10)))   # True
# HALT can't be implemented as a Python function — automatically excluded from Eff
```

## Applied

- **Constructive analysis** — Bishop / Bridges constructive analysis
  done synthetically in $\mathrm{Eff}$.
- **Computability theory in topos form** — recursion theory as
  internal mathematics.
- **Verified computational mathematics** — programs extracted from
  proofs in Coq / Agda are realizers.
- **Probabilistic and quantum realizability** — emerging frameworks
  for computational interpretations of probability / QM.
- **Synthetic guarded recursion** — modal type theories with
  guarded fixed points; Birkedal et al.

## Check Your Understanding

:::widget type=numeric-input prompt="Effective topos: realizability over Turing machines. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Internal logic intuitionistic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Theorems in $\\mathrm{Eff}$ are automatically computable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Krivine's classical realizability extends forcing. Type 1." answer=1 explain="Yes.":::
