---
strand: reasoning
level: intermediate
order: 9
title: Capstone — Reasoning at Scale
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 08-structural-induction
    description: Structural induction
connections:
  - strand-7-computation-foundation/00-algorithms-intuition
applications:
  - cs: "Proof assistants, model checkers, formally verified compilers (CompCert)"
  - life: "Where mathematical reasoning meets industrial software"
---

# Capstone — Reasoning at Scale

## Mental

Ten lessons on:

- **Predicate logic in depth** (Lesson 00).
- **ZFC axioms** (Lesson 01).
- **Equivalence relations and quotients** (Lesson 02).
- **Peano axioms** (Lesson 03).
- **Strong induction and well-ordering** (Lesson 04).
- **Constructive vs classical logic** (Lesson 05).
- **Russell's paradox and diagonal** (Lesson 06).
- **Function proofs** (Lesson 07).
- **Structural induction** (Lesson 08).

You've seen the *foundations* of foundations. Three integrated
walkthroughs to bring it together.

## Walkthrough 1: a fully verified compiler

**CompCert** is a C compiler whose translation passes are formally
verified in **Coq**: the proofs use **structural induction on the
AST** (Lesson 08), **predicate logic** (Lesson 00) with quantified
preservation properties, **inductive definitions of operational
semantics** (Lesson 03's recursion idea), and the **Curry-Howard
correspondence** (Lesson 05) to extract the verified compiler as a
runnable program.

Result: a C compiler with a *theorem* attached that says "if the
source program means $X$ and CompCert produces target program $T$,
then $T$ also means $X$." The Boeing 737 MAX would have been
caught by such tooling — the wave is coming.

## Walkthrough 2: model checking and protocol verification

**TLA+** (Lamport's specification language) describes distributed
systems in **predicate logic** with state-machine semantics.
Properties (safety, liveness) are quantified statements over
infinite execution traces — bounded model-checking enumerates
small cases (Lesson 00's brute-force $\forall$); inductive
invariants (Lesson 04) extend the proof to all states.

Amazon Web Services has used TLA+ to find latent bugs in
distributed protocols *before deployment*. The cost-of-bug curve
makes proof labour a good investment for protocols that route
billions of dollars.

## Walkthrough 3: incompleteness and what proof assistants can't do

**Gödel** (Lesson 06) tells us no consistent system rich enough to
encode arithmetic can prove its own consistency. So **Coq cannot
verify Coq's consistency from inside Coq**.

This is *not* a defect — it's a sharp boundary. We trust Coq
because:

1. Its type theory has been independently verified at small scale.
2. Multiple kernels (Coq, Lean, Agda) check the same proofs and agree.
3. Decades of expert eyes have found and fixed bugs.

**Russell** + **Cantor** + **Halting** + **Gödel** are *the same
argument* (Lesson 06) — diagonal reasoning. Once you see it, every
"this can't be done" theorem in CS theory becomes recognisable.

## Roadmap

**Strand 8 Advanced** picks up:

- Categorical logic and topos theory.
- Higher-order logic and dependent types.
- Reverse mathematics — what minimal axioms suffice?
- Forcing and independence (CH, AC inside ZF).
- Realizability and program extraction.

**Strand 8 Master** continues:

- Modal logic and temporal logic in deeper depth.
- Computational type theory.
- Cubical type theory and homotopy type theory.
- Categorical foundations.

## Closing

The reasoning strand is the *grammar* of mathematics: the rules by
which any mathematical claim is justified. Once you can write a
careful proof — base case, inductive step, every quantifier
deliberate — you can read any pure-mathematics paper, contribute to
proof assistants, design specifications for safety-critical
systems, and recognise when a "proof" is hand-waving past a real
gap.

Logic is mathematics' immune system. With it, the body grows
robustly; without it, every infection turns deadly.

## Interactive

:::widget type=numeric-input prompt="Negate $\\forall x: P(x)$. The negation is $\\exists x: \\lnot P(x)$. Type 1 if correct." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$|\\mathcal{P}(\\mathbb{N})|$ is strictly larger than $|\\mathbb{N}|$ — proof by Cantor's diagonal. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Strong induction $\\Leftrightarrow$ ordinary induction $\\Leftrightarrow$ well-ordering — three equivalent principles. Type 3." answer=3 explain="$3$.":::

:::widget type=numeric-input prompt="In Coq, propositions are types and proofs are programs. (Curry-Howard.) Type 1 if true." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="ZFC axiom that blocks Russell's paradox: schema of separation. Type 1 if true." answer=1 explain="Yes — only allows comprehension *within* an existing set.":::

:::widget type=numeric-input prompt="$\\mathbb{Q}$ is constructed as a quotient of $\\mathbb{Z} \\times (\\mathbb{Z} \\setminus 0)$ by an equivalence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CompCert is a fully verified C compiler — built in Coq. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Halting problem and Gödel's first incompleteness share the diagonal-fixed-point pattern. Type 1." answer=1 explain="Yes — both are Lawvere-style.":::
