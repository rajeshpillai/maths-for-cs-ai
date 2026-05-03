---
strand: reasoning
level: advanced
order: 4
title: Forcing and Independence
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 03-topos-theory
    description: Topos theory
connections:
  - strand-8-reasoning-advanced/05-reverse-mathematics
applications:
  - cs: "Independence proofs in set-theoretic foundations"
  - life: "Some questions can't be settled by ZFC alone"
---

# Forcing and Independence

## Mental

Some statements in mathematics are **independent** of ZFC: neither
provable nor disprovable from the standard axioms. Famous examples:

- **Continuum Hypothesis (CH)** — "no cardinality between
  $|\mathbb{N}|$ and $|\mathbb{R}|$." Independent (Gödel 1940 + Cohen 1963).
- **Axiom of Choice** — independent of ZF (Gödel + Cohen).
- **Whitehead problem** — every Whitehead group abelian iff free?
  Independent (Shelah 1974).
- **Diamond, MA, $\diamondsuit, \mathfrak{c}$, large cardinals**, etc.

## How to prove independence

To show a statement $\phi$ is independent of theory $T$:

1. Show $T + \phi$ is consistent — construct a model where $\phi$
   holds.
2. Show $T + \neg \phi$ is consistent — construct a model where
   $\phi$ fails.

For ZFC: each direction needs a creative model construction.

## Cohen's forcing (1963)

Paul Cohen invented **forcing** to build a model of ZFC where CH
fails:

1. Start with a "ground model" $M$ of ZFC.
2. Choose a poset $\mathbb{P}$ of "forcing conditions" — finite
   approximations to a generic object $G$.
3. Adjoin a generic filter $G \subseteq \mathbb{P}$, building
   $M[G]$.
4. Choose $\mathbb{P}$ so that $G$ codes "many new subsets of
   $\omega$" — making $|\mathbb{R}^{M[G]}|$ exceed $\aleph_1$.

Cohen got the **Fields medal** for this. Forcing is the workhorse
of modern set theory.

## Gödel's constructible universe (1940)

Gödel showed CH and AC are *consistent* with ZFC by building the
**constructible universe** $L$:

$L_0 = \emptyset$, $L_{\alpha + 1} = $ definable subsets of $L_\alpha$,
$L_\lambda = \bigcup L_\alpha$ at limits, $L = \bigcup_{\alpha} L_\alpha$.

In $L$: AC and CH both hold. So if ZF is consistent, ZFC + CH is.

## Interactive

:::widget type=numeric-input prompt="Continuum hypothesis (CH): independent of ZFC. Type 1." answer=1 explain="Yes — Gödel + Cohen.":::

:::widget type=numeric-input prompt="Cohen invented forcing to disprove CH from ZFC alone. Actually he showed CH not provable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cohen got the Fields medal for forcing. Type 1." answer=1 explain="Yes — 1966.":::

:::widget type=numeric-input prompt="In Gödel's constructible universe $L$, CH holds. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Generic filter**: dense intersection. Every dense subset of
$\mathbb{P}$ meets $G$.

**Forcing relation**: $p \Vdash \phi$ — "condition $p$ forces $\phi$
in any generic extension $M[G]$ with $p \in G$." Crucial property:
the forcing relation can be defined *inside* the ground model.

**Iterated forcing**: long sequences of forcings adjoining many
generics. Used to prove consistency of complicated combinations
(MA + 2^ℵ₀ huge, etc.).

**Boolean-valued models**: equivalent reformulation of forcing as
truth values in a complete Boolean algebra.

## Computational

```python
# Forcing is set-theoretic; we can illustrate consistency proofs

# Concept: poset of finite functions {0, 1}^I -> {0, 1} for some index I
# adjoining a generic G gives "new" reals.

# Demonstration: countable model + Cohen forcing produces uncountable
# powerset (in the sense of the extended model)
# This is conceptual; actual forcing requires set-theoretic machinery.

# Another illustration: Gödel's L hierarchy in pseudocode
def L_alpha(alpha):
    if alpha == 0: return frozenset()
    if alpha == 1: return frozenset([frozenset()])
    # In real construction: definable subsets of L_alpha, transfinite
    return f"L_{alpha}"

# Consistency demonstration via examples:
# - In L: AC holds, CH holds.
# - In Cohen's model: AC holds, CH fails.
# Both are models of ZFC, with different answers to CH.
```

## Applied

- **Set-theoretic foundations** — most "obvious" mathematical
  statements are provable in ZFC; foundational questions about
  cardinalities, measure theory often turn out independent.
- **Combinatorial set theory** — large-cardinal axioms strengthen
  ZFC; equiconsistency strength is a fundamental tool.
- **Descriptive set theory** — projective regularity properties
  often equivalent to large-cardinal hypotheses.
- **Computer science** — Boolean-valued models inspire the
  Boolean satisfiability of distributed protocols.

## Check Your Understanding

:::widget type=numeric-input prompt="Independence: neither $\\phi$ nor $\\neg\\phi$ is provable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cohen's forcing constructs models where CH fails. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gödel's $L$ shows CH (and AC) consistent with ZFC. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Independence requires showing both $T + \\phi$ and $T + \\neg \\phi$ consistent. Type 1." answer=1 explain="Yes.":::
