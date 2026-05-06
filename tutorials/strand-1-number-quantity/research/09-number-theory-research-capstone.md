---
strand: number-quantity
level: research
order: 9
title: Capstone — Frontiers of Number Theory
prerequisites:
  - tier: strand-1-number-quantity-research
    slug: 08-circle-method
    description: Circle method
connections:
  - strand-1-number-quantity-master/09-number-theory-master-capstone
applications:
  - cs: "AI-discovered conjectures, post-quantum crypto, blockchain"
  - life: "Where number theory will spend the next 50 years"
---

# Capstone — Frontiers of Number Theory

## Explain Like I Am 7

Imagine standing on the very edge of a map labelled "here be dragons,"
holding a torch over the unexplored darkness.  In this capstone you
look back at the strange tools you collected to get here — magic
mailboxes, $p$-adic magnifiers, music-of-the-primes, fingerprints of
shapes — and ahead at the dragons that nobody has tamed yet:
post-quantum codes, AI-suggested conjectures, theorems proved by
computer.  This isn't a final answer; it's a torch-lit invitation to
stay curious about a frontier that's actively being mapped right now.

## Mental

Nine lessons on:

- **$p$-adic Hodge theory** (Lesson 00).
- **Iwasawa theory** (Lesson 01).
- **Anabelian geometry / abc / Mochizuki** (Lesson 02).
- **Perfectoid spaces / Scholze** (Lesson 03).
- **Geometric Langlands** (Lesson 04).
- **Motives** (Lesson 05).
- **L-functions / Selberg's class** (Lesson 06).
- **Arithmetic statistics / Bhargava** (Lesson 07).
- **Circle method** (Lesson 08).

You've reached the boundary of contemporary number theory.

## Three open problems

### Riemann Hypothesis

After 165 years (Riemann 1859), still open. Verified for $10^{13}$
zeros. Most CS people believe it; it implies sharp bounds throughout
analytic number theory.

### Birch and Swinnerton-Dyer

Proven for analytic rank ≤ 1 in great generality. **Open** for higher
ranks. Strong BSD's leading-coefficient formula proven only in
specialised settings.

### abc conjecture

Mochizuki's IUT proof remains contested. Independent verification or
alternative proof would settle a deep mystery.

## AI-assisted number theory

**AlphaProof** (DeepMind 2024) achieved silver-medal IMO performance
on number-theory problems, including a Diophantine-equations problem
that reflected genuine mathematical creativity.

**Lean's mathlib** has formalised:

- Liquid Tensor Experiment (Scholze 2020-2022).
- Significant fractions of analytic number theory.
- Formalised Cap-set conjecture analysis (Croot-Lev-Pach,
  Ellenberg-Gijswijt 2016).

The ecosystem of formalised + AI-discovered + human-proven theorems
is increasingly merged.

## Three integrated walkthroughs

### Wiles + perfectoid + Iwasawa = modular Galois reps

Proving **modularity for all elliptic curves over arbitrary number
fields** (current frontier) requires combining:

- Wiles-style modularity-lifting (Strand 1 Master, Strand 1 Research
  Lesson 00).
- Perfectoid spaces for $p$-adic local Langlands (Lesson 03).
- Iwasawa-theoretic control of deformation rings (Lesson 01).

### Polymath + Bhargava + Tao = bounded gaps

Maynard-Tao's $246$ bound (Lesson 08) was a community-collaboration
triumph involving:

- Improved sieve weights (Bhargava-style; Lesson 07).
- Combinatorial optimisation of variational problems.
- Polymath open-collaboration model.

### Quantum + Langlands + Hodge = post-quantum crypto

NIST PQ standards rely on number-theoretic depth:

- Lattice schemes use cyclotomic Iwasawa-theoretic ring structure
  (Lesson 01).
- Isogeny crypto navigates supersingular isogeny graphs (Drinfeld /
  Lafforgue territory).
- Some attacks on past schemes used $p$-adic / $L$-function methods.

## Roadmap beyond Research-adjacent

Truly contemporary number theory engages:

- $\infty$-categorical foundations (Lurie / Scholze / Clausen).
- AI-assisted theorem proving (Lean, AlphaProof, future systems).
- Computer-verified large structural arguments.
- Open international collaborations (Polymath, mathlib).

## Closing

Number theory in 2026 spans:

- **Pure depth** — Riemann, BSD, abc, Langlands all open.
- **Modern foundations** — perfectoid, condensed math, $p$-adic
  Hodge.
- **Applied impact** — every digital signature, every PQ scheme.
- **AI-mathematics merge** — formal proofs and AI-discovered
  conjectures coexisting.

The strand began with counting; it ends at the frontier of human
knowledge — and an emerging human-AI collaborative practice.

## Interactive

:::widget type=numeric-input prompt="Riemann Hypothesis: still open after $\\sim 165$ years. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wiles + Iwasawa + perfectoid → modular Galois reps. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Maynard-Tao bounded gaps: 246. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="AlphaProof (2024): silver-medal IMO performance. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Mochizuki IUT proof: contested as of 2025. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Bhargava Fields medal 2014. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Scholze Fields medal 2018 for perfectoid. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lean's mathlib formalised Liquid Tensor Experiment. Type 1." answer=1 explain="Yes.":::
