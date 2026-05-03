---
strand: reasoning
level: research
order: 8
title: Emerging Foundations of Mathematics
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 07-univalent-foundations
    description: Univalent foundations status
connections:
  - strand-8-reasoning-research/09-reasoning-research-capstone
applications:
  - cs: "ZFC alternatives — type-theoretic, categorical, structural"
  - life: "Survey of foundational pluralism in 2025"
---

# Emerging Foundations of Mathematics

## Mental

Mathematics in 2025 has multiple competing **foundations**, no
longer just ZFC:

| Foundation | Style | Where used |
|---|---|---|
| ZFC + classical logic | set-theoretic | classical mathlib, most papers |
| Univalent foundations / HoTT | type-theoretic + univalence | UniMath, agda-unimath |
| ETCS / structural set theory | categorical | Lawvere school |
| $\infty$-topos foundations | $\infty$-categorical | Lurie, Schreiber |
| Constructive type theory | computational | Coq, Lean, Idris |
| Categorical logic | adjoint, doctrine-based | topos theory, modal logic |

Researchers pick by domain: classical analysts use ZFC; geometers
gravitate to $\infty$-topoi; AI/CS lean type-theoretic.

## Foundational pluralism

**Awodey, Shulman et al.**: argue foundations are *not* unique.
Different foundations capture different mathematical practice.

**Bridges between foundations**: relative consistency, model
constructions. ZFC ↔ HoTT-with-set-truncation; structural set
theory ↔ ETCS.

## Recent trends

### 1. Synthetic mathematics
Do analysis / geometry / probability *axiomatically* inside type
theory rather than defining-from-scratch. Cohesive HoTT for
geometry (Strand 8 Research Lesson 01); Synthetic Computability
(Bauer); Synthetic Probability (recent).

### 2. Foundations as dependent type theories
**Martin-Löf / cubical type theory** as dialect family. Modular
features: identity types, HITs, modalities.

### 3. Mechanised foundations
Lean mathlib (>1M LoC of formalised mathematics, growing fast),
Coq mathcomp, Isabelle's Archive of Formal Proofs.

**Liquid Tensor Experiment** (Scholze 2020 → Lean by Buzzard,
Commelin, Massot 2022): formalised hard modern result.

### 4. AI-augmented mathematics
Lean copilot (formalisation tools using LLMs); DeepMind's
**AlphaProof** silver-medal IMO 2024 (problem-solving). Foundations
matter for AI-checkable proofs.

### 5. Categorical reformulation of physics
Schreiber / Coecke programs treat physics through cohesive
$\infty$-toposes and categorical QM (Strand 8 Research Lessons
01, 05).

## Interactive

:::widget type=numeric-input prompt="Foundations no longer unique — pluralism in 2025. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lean mathlib over 1M lines of formal mathematics. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liquid Tensor Experiment formalised in Lean 2022. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AlphaProof silver IMO 2024. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Foundational equivalences** (informally):

- HoTT-with-set-truncation $\;\sim\;$ structural set theory $\;\sim\;$ ETCS.
- All consistent with classical ZFC.
- Strict differences appear at higher universes / choice axioms.

**Reverse mathematics**: a different programme — Friedman, Simpson —
classify theorems by which axioms they need over base system
$\mathrm{RCA}_0$. Big-five subsystems.

**Categorical logic**: Lawvere doctrines, hyperdoctrines for
quantifiers; modern recasting.

**Constructive mathematics**: Bishop, Martin-Löf, Coquand strands.
**Formal Topology** (Sambin) and **Locale theory** (Johnstone).

**Predicative foundations** (Feferman, Weyl): avoid impredicative
quantification; recent renewed interest.

## Computational

```python
# Survey: recent formalisation milestones (2018-2025)
milestones = [
    ("Liquid Tensor Experiment", 2022, "Buzzard-Commelin-Massot, Lean"),
    ("Polynomial Freiman-Ruzsa conjecture", 2023, "Tao + Lean community"),
    ("Sphere eversion", 2022, "Rouault et al., Lean"),
    ("∞-categories formalised", 2023, "Riehl group, Lean 4"),
    ("Brunerie π_4(S^3) verified", 2018, "cubical Agda"),
    ("Curry-Howard for HIT", 2019, "Mörtberg et al."),
    ("AlphaProof IMO silver", 2024, "DeepMind, Lean"),
]

print("Foundations + formalisation milestones (recent):")
for name, year, note in milestones:
    print(f"  {year}  {name:40} {note}")

print()
print("All major systems use type-theoretic / dependent-type foundations:")
for system in ["Lean 4", "Coq / Rocq", "Agda", "Isabelle/HOL", "F*"]:
    print(f"  • {system}")

print()
print("Foundational pluralism: pick by domain + mechanisation needs.")
```

## Applied

- **Lean mathlib** — foundational pluralism in practice.
- **Cubical Agda** — univalent + computational.
- **Lean copilot** — AI-augmented formal proof.
- **AlphaProof / AlphaGeometry** — DeepMind's neuro-symbolic
  formal-proof systems.
- **Education** — foundational courses now multi-perspective.

## Check Your Understanding

:::widget type=numeric-input prompt="Foundational pluralism: ZFC, HoTT, $\\infty$-topos all in use. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liquid Tensor Experiment in Lean 2022. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AlphaProof silver medal IMO 2024. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Polynomial Freiman-Ruzsa formalised 2023. Type 1." answer=1 explain="Yes.":::
