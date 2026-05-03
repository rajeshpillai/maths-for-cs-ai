---
strand: reasoning
level: master
order: 9
title: Capstone — Logic and Foundations Today
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 08-realizability-deeper
    description: Realizability and effective topos
connections:
  - strand-8-reasoning-advanced/09-reasoning-capstone-3
  - strand-2-structure-master/09-structure-master-capstone
applications:
  - cs: "Mathematical formalisation, AI safety, verified software"
  - life: "Where logic and foundations stand in 2026"
---

# Capstone — Logic and Foundations Today

## Mental

Nine lessons on:

- **Martin-Löf type theory** (Lesson 00).
- **Homotopy type theory** (Lesson 01).
- **Ordinals and proof-theoretic strength** (Lesson 02).
- **Cut elimination and sequent calculus** (Lesson 03).
- **Descriptive complexity** (Lesson 04).
- **Model theory** (Lesson 05).
- **Cubical type theory and univalent foundations** (Lesson 06).
- **Game semantics** (Lesson 07).
- **Realizability and effective topos** (Lesson 08).

You've reached graduate-level mathematical logic and foundations.
Three integrated walkthroughs.

## Walkthrough 1: AlphaProof and AI mathematics

DeepMind's **AlphaProof** (2024):

- **Lean 4** as the proof environment (Lesson 00, MLTT-flavoured CIC).
- **AI search** in Lean's tactic state space.
- **Self-play / tree search** — game-semantic flavour (Lesson 07).
- **Curriculum learning** on graded math problems.

Achieved silver-medal-level on IMO 2024 problems. Heralds an era
where AI assists in proving theorems formally.

## Walkthrough 2: formalisation of major theorems

The **Liquid Tensor Experiment** (Scholze 2020): "verify a key theorem
of condensed mathematics."

**Result** (2022): completed in Lean's mathlib. Validated Scholze's
proof, found minor errors fixed in the formalisation.

Other landmark formalisations:

- **Four-color theorem** (Gonthier 2005, Coq).
- **Kepler conjecture** (Hales 2017, HOL Light + Isabelle).
- **Feit-Thompson** odd-order theorem (Gonthier et al. 2012, Coq).

Lean's mathlib now has $> 10^6$ lines; central reference for
formalised mathematics.

## Walkthrough 3: foundations of AI safety

Formal-verification approach to AI safety:

1. **Spec types** (Lesson 00, dependent types) for desired
   behaviour.
2. **Formal proofs** of robustness, fairness, privacy properties
   (Lesson 08, realizability for computational guarantees).
3. **Type-level resource tracking** (Lesson 03 linear logic +
   sequent calculus) for fairness & privacy budgets.
4. **HoTT/UF for type-driven mathematical infrastructure**
   (Lesson 06).
5. **Game-theoretic models** of AI-environment interaction
   (Lesson 07).
6. **Descriptive complexity** to characterise tractable safety
   verification (Lesson 04).

The frontier where logic meets AI alignment.

## Roadmap

**Strand 8 Research-adjacent** picks up:

- $\infty$-topos theory (Lurie).
- Synthetic differential / cohesive type theory.
- Modal type theories (multimodal, guarded recursion).
- Proof complexity frontiers.
- Formal verification of AI systems and safety arguments.

## Closing

Logic in 2026 is:

- **Practical** — formal methods used in industry (verified compilers,
  OS kernels, smart contracts, hardware).
- **Foundational** — HoTT and univalent foundations offer alternatives
  to ZFC.
- **AI-ready** — Lean's mathlib + AlphaProof prefigure AI-assisted
  mathematics.
- **Computational** — cubical type theory and effective topos make
  proofs into algorithms.

The reasoning strand began with simple syllogisms; it ends at the
research frontier where mathematics, computer science, and AI
converge to *make formal reasoning actually usable*.

## Interactive

:::widget type=numeric-input prompt="Lean / Coq / Agda implement MLTT-like systems. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Univalence: $(A = B) \\simeq (A \\simeq B)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cut elimination: theorem of Gentzen. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Effective topos: synthetic computability. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Fagin: NP = ∃SO. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\epsilon_0$ = proof-theoretic ordinal of PA. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hyland-Ong fully abstract for PCF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cubical type theory makes univalence computational. Type 1." answer=1 explain="Yes.":::
