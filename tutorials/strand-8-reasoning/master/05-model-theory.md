---
strand: reasoning
level: master
order: 5
title: Model Theory
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 04-descriptive-complexity
    description: Descriptive complexity
connections:
  - strand-8-reasoning-master/06-cubical-and-univalent
applications:
  - cs: "Database semantics, knowledge representation, formal methods"
  - life: "Studying mathematical structures via the formulas they satisfy"
---

# Model Theory

## Mental

**Model theory** studies *mathematical structures* through the
*formulas* they satisfy.

A **structure** $\mathcal M$: domain + interpretations of symbols.
$\mathcal M \models \phi$: "$\phi$ is true in $\mathcal M$."

**Theory** = set of formulas. Two key notions:

- **Models of a theory**: structures satisfying all axioms.
- **Theories of a structure**: all formulas true in $\mathcal M$.

## Compactness

**Compactness theorem**: a theory has a model iff every finite
subset has a model.

Powerful consequences:

- **Existence of non-standard models** of arithmetic (PA has models
  containing "infinite naturals").
- **Löwenheim-Skolem**: a theory in a countable language has models
  of every infinite cardinality if it has any infinite model.

## Categoricity

A theory is **$\kappa$-categorical** if it has exactly one model of
cardinality $\kappa$ up to isomorphism.

**Morley's theorem** (1965): if a complete countable theory is
categorical in *some* uncountable cardinal, it's categorical in
*all* uncountable cardinals.

**Examples**:

- Algebraically closed fields of characteristic 0: $\aleph_1$-cat,
  any uncountable cardinal.
- Vector spaces over a fixed field with infinite dimension.
- $(\mathbb Q, <)$: aleph_0-cat (Cantor's back-and-forth).

## Stability and classification

Shelah's **stability theory** classifies first-order theories by
how complicated their models can be.

**Stable** theories: model count grows mildly. **Unstable**:
"continuum-many" 1-types.

Shelah's main gap theorem: any stable theory has either *very many*
models in each uncountable cardinality, or *very few*.

## Interactive

:::widget type=numeric-input prompt="Compactness: theory has model iff every finite subset has a model. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Löwenheim-Skolem: countable language → models of every infinite cardinality. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Morley's theorem on categoricity in uncountable cardinals. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Non-standard models of PA exist by compactness. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Type space**: 1-types over $A$ in $\mathcal M$ = consistent
extensions of $\mathrm{Th}(A)$ with one new constant.

**O-minimal** theories: every definable subset of $\mathcal M$ is a
finite union of points and intervals. Real closed field
$(\mathbb R, +, \cdot, <)$ is o-minimal — basis of decidable real
arithmetic.

**Tarski's theorem**: real-closed fields admit elimination of
quantifiers. Theory of $\mathbb R$ is decidable.

**ACFP, ACF, RCF, DLO, ...**: classical theories with rich
model-theoretic structure.

**Geometric stability theory**: Hrushovski's program; uses model
theory to settle Mordell-Lang in characteristic $p$ (1996).

## Computational

```python
# Z3-based decidability for real-closed fields (Tarski)
try:
    from z3 import Real, Solver, sat, And, Or, Not

    s = Solver()
    x, y = Real('x'), Real('y')
    # Claim: ∀ x. x² ≥ 0 (or rather ∃ x. ¬(x² ≥ 0) is unsatisfiable)
    s.add(x * x < 0)
    print(s.check())                 # unsat: theorem holds
except ImportError:
    print("z3-solver not installed")

# Compactness: build a model with a non-standard natural number
# Toy: ω + 1 = {0, 1, 2, ..., ∞}
class NonstandardNat:
    """ω + 1 with infinite element."""
    def __init__(self, val):
        self.val = val      # int or 'inf'

    def __lt__(self, other):
        if self.val == 'inf': return False
        if other.val == 'inf': return True
        return self.val < other.val

# All finite axioms hold; "x > n" for every standard n is satisfied at 'inf'
points = [NonstandardNat(i) for i in range(10)] + [NonstandardNat('inf')]
print("Compactness illustration: 'inf' element exists in non-standard model.")
```

## Applied

- **Real arithmetic decidability** — used in optimisation, control,
  CAD (cylindrical algebraic decomposition).
- **Database theory** — query containment, equivalence; conjunctive
  query foundations.
- **Description logics** — model-theoretic semantics.
- **Verification of analog/hybrid systems** — uses o-minimality.
- **Pure mathematics** — Hrushovski's settlement of Mordell-Lang
  via model theory was a major surprise.

## Check Your Understanding

:::widget type=numeric-input prompt="Compactness: model exists ⇔ every finite subset has model. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Real-closed fields decidable (Tarski). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Morley categoricity in any uncountable cardinality. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$(\\mathbb Q, <)$ aleph_0-categorical (Cantor back-and-forth). Type 1." answer=1 explain="Yes.":::
