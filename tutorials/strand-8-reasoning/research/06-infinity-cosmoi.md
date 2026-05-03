---
strand: reasoning
level: research
order: 6
title: $\infty$-Cosmoi and Formal $\infty$-Category Theory
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 05-categorical-quantum
    description: Categorical quantum mechanics
connections:
  - strand-8-reasoning-research/07-univalent-foundations
applications:
  - cs: "Foundations independent of model — quasi-categories, complete Segal spaces, ..."
  - life: "Formal $\\infty$-category theory robust across models"
---

# $\infty$-Cosmoi and Formal $\infty$-Category Theory

## Mental

There are several **models** of $(\infty, 1)$-categories:
quasi-categories (Joyal), complete Segal spaces (Rezk), Segal
categories, simplicial categories, $A_\infty$-categories, etc.

**Riehl-Verity** (2018+): an **$\infty$-cosmos** is a
$2$-categorical environment in which one can do "model-
independent" $\infty$-category theory.

Key results — adjunctions, limits, Yoneda — proved once at the
$\infty$-cosmos level apply to *all* models.

## Definition (informal)

An $\infty$-cosmos $\mathcal K$ is a category enriched in
quasi-categories together with a class of fibrations satisfying
axioms such that:

- $\mathcal K$ has small limits.
- Fibrations are stable under limits.
- Underlying $2$-category $h\mathcal K$ has well-behaved
  weighted limits.

**Examples**:

- $\mathbf{qCat}$ — quasi-categories.
- $\mathbf{CSS}$ — complete Segal spaces.
- $\mathbf{SegCat}$ — Segal categories.
- $\theta_n\text{-Spaces}$ — for $(\infty, n)$-categories.

## Yoneda lemma at $\infty$-cosmos level

For $A \in \mathcal K$, the *Yoneda embedding*
$y : A \to \mathrm{Fun}(A^{\mathrm{op}}, \mathcal S)$
is fully faithful in any $\infty$-cosmos. Proven once; applies in
every model.

## Formal proofs of $\infty$-categorical results

Riehl-Verity reproved many classical results — adjoint functor
theorem, monadicity, Kan extensions — in $\infty$-cosmos
language.

**Practical impact**: model-independence frees authors to use
whichever model is most convenient locally, knowing results
transport.

## Interactive

:::widget type=numeric-input prompt="Riehl-Verity 2018+ formal $\\infty$-category theory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\infty$-cosmos: 2-categorical environment for model-independent results. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quasi-categories (Joyal) are an $\\infty$-cosmos. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Complete Segal spaces (Rezk) are also an $\\infty$-cosmos. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Comparisons of models**: Joyal-Lurie, Bergner, Rezk theorems show
all standard models are *Quillen equivalent*. $\infty$-cosmoi
formalise this: a *cosmological biequivalence* gives the
correspondence at the $2$-categorical level.

**Adjunctions in an $\infty$-cosmos**: defined via unit / counit
diagrams in $h\mathcal K$, exactly mirroring classical
$2$-category theory.

**Cartesian fibrations**: generalisations of fibred categories;
Riehl-Verity gives a formal account; corresponds to the
straightening / unstraightening (Lurie) at the model level.

**Higher operadic structures**: $(\infty, n)$-cosmoi for higher
categorical algebra; recent extensions.

## Computational

```python
# ∞-cosmoi: highly abstract; concrete computation rare
# Sketch the model-comparison hierarchy

models = {
    "Simplicial categories": "First model (Bergner 2007)",
    "Quasi-categories": "Joyal 2002, Lurie HTT 2009 — most popular",
    "Complete Segal spaces": "Rezk 2001",
    "Segal categories": "Hirschowitz-Simpson, Pellissier",
    "Relative categories": "Barwick-Kan",
    "θ_n-spaces": "Rezk for (∞, n)-categories",
}

print("Models of (∞, 1)-categories (all Quillen-equivalent):")
for k, v in models.items():
    print(f"  • {k}: {v}")

print()
print("∞-cosmoi (Riehl-Verity): pick any model; proofs transport")
print("via cosmological biequivalence.")

# Software: experimental Lean 4 formalisations of ∞-cosmoi
print()
print("Formalisation: Riehl group + collaborators in Lean 4.")
print("Yoneda lemma, adjoint functor theorems formalised.")
```

## Applied

- **Higher algebra** — Lurie's $\mathrm{HA}$ and beyond.
- **Derived algebraic geometry** — uses $\infty$-categorical foundations
  agnostic to model.
- **Goodwillie calculus** (Strand 8 Research Lesson 00) — formalised
  in $\infty$-cosmoi.
- **Higher topos theory** — formal proofs portable across topos
  models.
- **Lean formalisation** — Riehl group leading mathlib effort.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\infty$-cosmos = 2-categorical formal $\\infty$-category theory. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Riehl-Verity reproved adjoint functor theorem at this level. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cosmological biequivalence between models. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lean 4 formalisation in progress. Type 1." answer=1 explain="Yes.":::
