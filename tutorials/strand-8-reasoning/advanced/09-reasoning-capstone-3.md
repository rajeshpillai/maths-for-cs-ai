---
strand: reasoning
level: advanced
order: 9
title: Capstone — Logic at the Frontier
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 08-temporal-logic
    description: Temporal logic
connections:
  - strand-8-reasoning-intermediate/09-reasoning-capstone-2
  - strand-7-computation-advanced/09-computation-capstone-3
applications:
  - cs: "Verified software, AI safety, modern proof assistants"
  - life: "Where logic meets cutting-edge computing"
---

# Capstone — Logic at the Frontier

## Explain Like I Am 7

This chapter is the field trip into the strangest corners of the
logic museum.  Stickers that depend on numbers; signpost-arrow maps
of "true and false"; alternate snow-globe universes where math runs
by different weather; promises about "always" and "eventually"
checked by a tireless robot.  Each is a tool living researchers reach
for when they want to verify spaceships, certify AI safety, or prove
brand-new theorems.  Today's tour is about how logic stops being
classroom homework and starts being a serious engineering material.

## Mental

Nine lessons on:

- **Higher-order logic** (Lesson 00).
- **Dependent types** (Lesson 01).
- **Categorical logic** (Lesson 02).
- **Topos theory** (Lesson 03).
- **Forcing and independence** (Lesson 04).
- **Reverse mathematics** (Lesson 05).
- **Realizability** (Lesson 06).
- **Modal logic** (Lesson 07).
- **Temporal logic and model checking** (Lesson 08).

You can now read modern logic and engage with verification, type
theory, foundations. Three integrated walkthroughs.

## Walkthrough 1: a verified compiler

CompCert (Leroy 2006-): a C compiler with a *theorem* —
"compiled program means the same thing as source program."

- Built in **Coq**, which uses **dependent type theory** (Lesson 01).
- The semantics-preservation proof is by **structural induction** on
  the AST and **logical relations** at each compiler pass.
- Uses **Curry-Howard** (Lessons 01, 06): the proof *is* the verified
  compiler, **extracted** to OCaml (Lesson 06).
- About 100 KLOC of Coq, 20 KLOC of OCaml. Used in Airbus avionics.

## Walkthrough 2: AWS S3 protocol verification

S3, the largest distributed-storage system on Earth, has a TLA+
(Lesson 08) specification:

- **States**: configurations of replicas, network buffers, write
  ledgers.
- **Transitions**: each operation type (PUT, GET, GC).
- **Invariants** specified in temporal logic: every PUT eventually
  visible, no inconsistent reads, durability under disk failure.
- **Model checker** (TLC) explored billions of states finding bugs
  *years before* deployment — bugs that would have caused
  data loss at AWS scale.

Lamport, who designed TLA+, won the **Turing Award** (2013) partly
for this work.

## Walkthrough 3: smart-contract verification

Cardano / Ethereum smart contracts handle billions of dollars; bugs
in DAO, parity multisig, and others have caused $100M+ losses.

- **Plutus** (Cardano): Haskell-style language; some properties
  checked via dependent types and refinement (Lessons 00, 01).
- **Tezos / Michelson**: smart-contract correctness checked via
  symbolic execution + theorem proving.
- **K framework**: model checking of EVM bytecode using
  *operational semantics* + **temporal logic** (Lesson 08).
- **Certora Prover**: SMT-backed verification of high-stakes
  contracts (Aave, Compound, MakerDAO).

The same techniques you've learned in this strand-level *literally*
secure billions of dollars on chain.

## Roadmap

**Strand 8 Master** picks up:

- **Computational type theory** in depth: Martin-Löf, observational
  equality, cubical type theory.
- **Homotopy type theory (HoTT) / univalent foundations**: types as
  homotopy types, equivalence-as-equality.
- **Proof theory advanced**: ordinal analysis, cut elimination,
  Gentzen's consistency proof.
- **Computability theory**: $\Sigma^0_n$ hierarchy, Turing degrees,
  hyperarithmetic.
- **Categorical model theory**, sketch theory.

**Strand 8 Research-adjacent**: ∞-categories and logic, Voevodsky's
program, automated theorem proving with neural networks (DeepMind's
AlphaProof, Lean copilots), constructive analysis frontier.

## Closing

Logic in 2026 is no longer just "rules of correct reasoning." It's
the architecture of:

- **Verified software** running safety-critical systems.
- **Smart contracts** moving billions in value.
- **Type-checked AI** with provable safety bounds.
- **Foundations of mathematics** that even Fields medalists explore
  computationally (Lean's `mathlib`).

Modern logic is a *practical engineering tool*. The "logic strand"
ends here at the level where logic and computation become
inseparable.

## Interactive

:::widget type=numeric-input prompt="HOL is more expressive than FOL but loses completeness. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Dependent types let return type depend on input value. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Continuum hypothesis is independent of ZFC. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Model checking decides $M \\models \\phi$ for finite-state systems. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Curry-Howard: proofs are programs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Topos theory generalises Set with intuitionistic internal logic typically. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reverse mathematics' Big Five subsystems. Type 5." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="LTL model checking is PSPACE-complete in formula size. Type 1." answer=1 explain="Yes.":::
