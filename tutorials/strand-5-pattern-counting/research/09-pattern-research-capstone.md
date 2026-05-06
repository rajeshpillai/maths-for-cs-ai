---
strand: pattern-counting
level: research
order: 9
title: Capstone — Combinatorics at the Frontier
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 08-conjectures-frontier
    description: Open conjectures
connections:
  - strand-5-pattern-counting-master/09-pattern-master-capstone
applications:
  - cs: "Modern TCS, ML theory, combinatorial physics"
  - life: "The state of combinatorics in 2026"
---

# Capstone — Combinatorics at the Frontier

## Explain Like I Am 7

This is the grandest tour of all: combinatorics in $2026$.  We
revisit Cayley-graph cities, super-connected expander webs, knotted
strings with their Khovanov shadows, ice-rule arrow-tilings,
non-repeating bathroom floors, randomness-purifying machines,
double-dialed Macdonald polynomials, tropical-shape geometry, and
the dragon-conjectures that researchers wrestle today.  Then we
weave them together to attack real problems and peek over the
horizon at what the next decade of pattern hunting might look like.

## Mental

Nine lessons on:

- **Geometric group theory** (Lesson 00).
- **Coarse geometry / expanders** (Lesson 01).
- **Knot invariants frontier** (Lesson 02).
- **Combinatorial physics** (Lesson 03).
- **Aperiodic tilings / quasi-crystals** (Lesson 04).
- **Randomness extraction** (Lesson 05).
- **Symmetric functions frontier** (Lesson 06).
- **Tropical geometry deeper** (Lesson 07).
- **Open conjectures** (Lesson 08).

You've reached the combinatorial frontier of 2026.

## Three integrated walkthroughs

### Polynomial method's recent breakthroughs

A unified narrative:

- **Cap set bound** (CLP + EG 2016): tight $O(2.756^n)$.
- **Joints conjecture** (Guth-Katz 2008).
- **Erdős distance problem** in $\mathbb R^2$ (Guth-Katz 2010).
- **PFR over $\mathbb F_2^n$** (GGMT 2023).
- **Method of slice rank** (Tao + others).

Each invokes algebraic-geometric techniques to bound combinatorial
quantities. A *new style* of combinatorics emerging.

### Combinatorial physics + integrability

Modern interplay:

- **Random tilings** (aperiodic + arctic-circle limit) connect to
  KPZ universality (Strand 4 Research).
- **Schur process** (Borodin et al.): combinatorial probabilistic
  process with random-matrix limit.
- **Macdonald processes** generalise Schur, with Tracy-Widom
  asymptotics.
- **Quantum integrable models** (six-vertex, XXZ) solvable via Bethe
  ansatz.

Combinatorics + statistical physics + integrable systems = a deep
modern braid.

### TCS frontier

Combinatorial methods in theoretical CS:

- **PCP theorem** uses Reed-Muller codes (combinatorial).
- **Expander graphs** for derandomisation, codes, distributed
  protocols.
- **Pseudorandom-generator constructions** via NW + Trevisan
  extractors.
- **AI / ML lower bounds** via combinatorial complexity arguments.
- **Quantum lower bounds** via combinatorial set systems.

## Roadmap beyond Research-adjacent

Ongoing community efforts:

- **AI-assisted conjecture making** — graph-database mining for new
  patterns.
- **Polymath collaborations** — open community problem-solving.
- **Lean / Coq formalisation** of cap-set and similar results.
- **Cross-pollination** with arithmetic, geometry, physics.

## Closing

Combinatorics in 2026 is:

- **Frontier-rich**: many open problems with active progress.
- **Cross-disciplinary**: connects to algebra, geometry, physics, CS.
- **Algorithmic**: computational verification of patterns, AI
  detection.
- **Application-relevant**: modern crypto, ML, distributed systems.

The strand began with simple counting; it ends at the frontier
where polynomial methods, geometric ideas, and physics insights
combine to push the boundary of what's known.

## Interactive

:::widget type=numeric-input prompt="Cap set EG 2016 bound $2.756^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Polynomial method as modern unifying technique. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Aperiodic monotile (hat) 2023. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Macdonald polynomials in math physics + AGT. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Tao 2015 solved Erdős discrepancy. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hadwiger-Nelson ≥ 5 (De Grey 2018). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mikhalkin correspondence: tropical = algebraic counts. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Trevisan / NW extractors: explicit randomness extraction. Type 1." answer=1 explain="Yes.":::
