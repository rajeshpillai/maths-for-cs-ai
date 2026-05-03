---
strand: reasoning
level: advanced
order: 2
title: Categorical Logic
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 01-dependent-types
    description: Dependent types
connections:
  - strand-8-reasoning-advanced/03-topos-theory
applications:
  - cs: "Functional-language type theory, denotational semantics"
  - life: "Logic in the language of objects and morphisms"
---

# Categorical Logic

## Mental

**Category theory** abstracts mathematics: objects + morphisms +
composition + identities, satisfying associativity and identity
laws.

**Categorical logic**: logical structure expressed via categorical
constructions.

| Logic | Category |
|---|---|
| Set | category Set: objects = sets, morphisms = functions |
| Type | category of types and functions |
| Logic | propositions and proofs |
| Group | morphisms = group homomorphisms |

The bridge: **functors** between categories preserve structure.
**Natural transformations** are "morphisms between functors."

## Cartesian closed categories

A **Cartesian closed category** has:

- **Terminal object** $1$ — a "trivial" object with unique map from
  every object.
- **Products** $A \times B$.
- **Exponentials** $B^A$ — the object representing functions
  $A \to B$.

These are exactly enough to interpret simply-typed lambda calculus
and intuitionistic propositional logic.

The connection: **internal language** of a Cartesian closed category
is essentially typed lambda calculus.

## Curry-Howard-Lambek

The famous trinity:

| Logic | Type theory | Category theory |
|---|---|---|
| Proposition | Type | Object |
| Proof | Term | Morphism |
| Implication | Function type | Exponential |
| Conjunction | Product type | Product |
| Disjunction | Sum type | Coproduct |
| True | Unit type | Terminal |
| False | Empty type | Initial |

**Lambek's theorem**: typed lambda calculus and Cartesian closed
categories are equivalent.

## Worked example: monads as algebraic patterns

A **monad** is a triple $(T, \eta, \mu)$ where $T$ is an endofunctor,
$\eta : 1 \to T$ (unit), $\mu : T^2 \to T$ (multiplication),
satisfying associativity-style coherence laws.

| Monad | What it represents |
|---|---|
| Maybe | partial computation |
| List | nondeterminism |
| State | mutable state |
| IO | side-effects |
| Continuation | control flow |

In Haskell `do`-notation desugars to monad operations. In Coq,
monads encode effectful computation in a pure setting.

## Interactive

:::widget type=numeric-input prompt="Curry-Howard-Lambek connects logic, types, and categories. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lambek: Cartesian closed category $\\equiv$ typed lambda calculus. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Monad has 3 components: $T, \\eta, \\mu$. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="Maybe monad models partial computation. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Yoneda lemma**: for any functor $F : \mathcal{C} \to \mathrm{Set}$
and object $A$,

$$
\mathrm{Nat}(\mathrm{Hom}(A, -), F) \cong F(A).
$$

Read: an object is determined by its morphisms in. "Tell me how you
relate to everything else, and I know what you are."

**Adjoint functors** $F \dashv G$: $\mathrm{Hom}(F(A), B) \cong \mathrm{Hom}(A, G(B))$
naturally in $A, B$. Examples:

- Free-Forgetful: free group $\dashv$ underlying-set.
- Product-Diagonal: $\Delta \dashv \times$.
- $\Sigma \dashv \pi^* \dashv \Pi$ in dependent type theory.

Adjoints are everywhere; "all of mathematics is adjoint functors."

**Categorical limits and colimits** unify products, equalisers,
pullbacks, etc.

## Computational

```python
# Monad-style code in Python

def maybe_bind(m, f):
    if m is None: return None
    return f(m)

def safe_div(a, b):
    return None if b == 0 else a / b

# Compose safely
result = maybe_bind(safe_div(10, 2), lambda x:
         maybe_bind(safe_div(x, 0.5), lambda y:
         x + y))
print(result)                          # 30 — no zero division to worry about

result = maybe_bind(safe_div(10, 0), lambda x:
         maybe_bind(safe_div(x, 0.5), lambda y:
         x + y))
print(result)                          # None — short-circuited

# List monad: nondeterminism
def list_bind(xs, f):
    return [y for x in xs for y in f(x)]

print(list_bind([1, 2, 3], lambda x: [x, x * 10]))    # [1, 10, 2, 20, 3, 30]

# Functor-like operations
def fmap(f, xs):
    return [f(x) for x in xs]

print(fmap(lambda x: x**2, [1, 2, 3, 4]))             # [1, 4, 9, 16]
```

## Applied

- **Functional programming** — Haskell, OCaml, F# use monads
  pervasively for I/O, parsing, state.
- **Database query languages** — SQL conceptually models join-like
  operations as categorical limits.
- **Programming-language semantics** — denotational semantics
  interprets programs in categories.
- **Quantum computation** — symmetric monoidal categories model
  quantum protocols (Coecke-Abramsky).
- **Natural-language processing** — categorical compositional
  semantics.

## Check Your Understanding

:::widget type=numeric-input prompt="Cartesian closed categories interpret simply-typed lambda calculus. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Yoneda lemma: object determined by its morphisms in. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Adjoint functors: $F \\dashv G$ with $\\mathrm{Hom}(F(A), B) \\cong \\mathrm{Hom}(A, G(B))$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Monad supports `bind` and `return`. Type 1." answer=1 explain="Yes.":::
