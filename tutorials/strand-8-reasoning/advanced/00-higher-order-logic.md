---
strand: reasoning
level: advanced
order: 0
title: Higher-Order Logic
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 09-reasoning-capstone-2
    description: Intermediate reasoning capstone
connections:
  - strand-8-reasoning-advanced/01-dependent-types
applications:
  - cs: "Isabelle/HOL, formally verified compilers and OS kernels"
  - life: "Quantifying over predicates and functions, not just elements"
---

# Higher-Order Logic

## Explain Like I Am 7

Plain logic talks about *things*: "this kid is six years old."  But
sometimes you want to talk about *rules* themselves: "*every* rule
about kids that holds for the youngest holds for everyone."  That's
talking about a rule about rules — a higher level.  **Higher-order
logic** is a stretchier kind of logic that lets you scoop up rules,
collections of rules, and even rules-about-collections-of-rules into
your sentences, just like you'd talk about ordinary kids.  More
power, more responsibility.

## Mental

**First-order logic** quantifies over individuals: $\forall x: P(x)$.

**Higher-order logic (HOL)** quantifies over **predicates and
functions**: $\forall P : \mathrm{Prop}, \forall f : A \to B \ldots$.

Examples that need HOL:

- "Mathematical induction": $\forall P, P(0) \to (\forall n, P(n) \to P(n+1)) \to \forall n, P(n)$.
- "Two functions are equal iff they agree on all inputs":
  $\forall f, g : A \to B, (\forall x, f(x) = g(x)) \to f = g$.

In first-order logic these can only be expressed as schemas — one
axiom per predicate.

## Power and trade-offs

HOL is more expressive than FOL but loses some properties:

- **Categoricity**: HOL Peano arithmetic has $\mathbb{N}$ as its
  *unique* model up to iso. FOL Peano has many non-standard models.
- **Completeness fails**: there's no complete proof system for HOL —
  Gödel's incompleteness applies.
- **Practical**: HOL provers (Isabelle/HOL, HOL Light, HOL4)
  handle real mathematics.

## Simply-typed lambda calculus + logic

A common HOL framework: **Church's simple type theory** (1940). Types
include base types $\iota$ (individuals) and $o$ (booleans), built up
by $\to$ for function types.

Terms are typed lambda expressions:
$\lambda x : \iota. \mathrm{equal}(x, x) : \iota \to o$.

Adding axioms (extensionality, Hilbert's $\epsilon$, infinity) gives
HOL.

## Worked example: induction principle

Statement of induction in HOL:

$$
\mathrm{induction} : \forall P : \mathbb{N} \to o, P(0) \to (\forall n, P(n) \to P(n+1)) \to \forall n, P(n).
$$

The $\forall P$ quantifies over predicates — second-order. In
first-order Peano arithmetic, this becomes a *schema*: one axiom
for each definable predicate $P$. Different formalism, different
expressive power.

## Interactive

:::widget type=numeric-input prompt="HOL quantifies over functions and predicates. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HOL has complete proof system? Type 1 yes, 0 no." answer=0 explain="No — Gödel's incompleteness applies.":::

:::widget type=numeric-input prompt="HOL Peano has only $\\mathbb{N}$ as standard model (categorical). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Church's simple type theory has base types $\\iota$ (individuals) and $o$ (booleans). Type 2 for the count." answer=2 explain="$2$.":::

## Symbolic

**Comprehension**: in HOL we can form predicates by
$\lambda$-abstraction. $\{x : A | P(x)\}$ becomes $\lambda x : A. P(x)$.

**Polymorphism**: HOL with type variables (Hindley-Milner-style) lets
the same theorem apply to many types — basis of ML / Haskell type
systems.

**Soundness**: every theorem is true. **Completeness fails**: not
every truth is provable. Provers are designed to be sound; for
completeness, restrict to decidable fragments.

**Conservativity**: adding HOL axioms (e.g., infinity, choice) to
first-order set theory doesn't prove new theorems about the original
language — but lets us *express* more.

## Computational

```python
# HOL-style notation in Python (purely illustrative)

def for_all_pred(predicate, domain):
    return all(predicate(x) for x in domain)

# In HOL, this would be a higher-order function:
# is_subset : (A -> bool) -> (A -> bool) -> bool
def is_subset(P, Q, dom):
    return all((not P(x)) or Q(x) for x in dom)

# Set extensionality: two predicates equal iff agree everywhere
def predicates_equal(P, Q, dom):
    return all(P(x) == Q(x) for x in dom)

# Demo
P = lambda x: x % 2 == 0
Q = lambda x: x % 4 == 0
dom = list(range(20))

print(is_subset(Q, P, dom))           # True — all multiples of 4 are even
print(is_subset(P, Q, dom))           # False — 2 is even but not multiple of 4
print(predicates_equal(P, lambda x: x % 2 == 0, dom))   # True
```

## Applied

- **Isabelle/HOL** — leading proof assistant; has formalised
  thousands of mathematical theorems including the Kepler conjecture
  (Hales).
- **HOL4 / HOL Light** — rigorous proof of the Jordan curve theorem,
  Brouwer's fixed-point theorem, Prime Number Theorem.
- **seL4 microkernel** — formally verified OS kernel (~10,000 lines
  of C) proven correct in Isabelle/HOL. Used in security-critical
  systems.
- **Hardware verification** — Intel uses HOL-style provers to verify
  CPU floating-point and arithmetic units.
- **Compiler verification** — CompCert C compiler proven correct in
  Coq (constructive type theory, related but distinct).

## Check Your Understanding

:::widget type=numeric-input prompt="HOL quantifies over predicates and functions, not just individuals. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Isabelle/HOL formalises real mathematics. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HOL Peano is categorical — only $\\mathbb{N}$ as model. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="seL4 is a verified OS kernel. Type 1." answer=1 explain="Yes.":::
