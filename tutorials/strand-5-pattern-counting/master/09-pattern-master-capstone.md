---
strand: pattern-counting
level: master
order: 9
title: Capstone — Combinatorics Tomorrow
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 08-extremal-and-ramsey-deeper
    description: Extremal and Ramsey
connections:
  - strand-5-pattern-counting-advanced/09-pattern-counting-capstone-3
applications:
  - cs: "TCS, ML, post-quantum crypto, data structures"
  - life: "The state of combinatorics in 2026"
---

# Capstone — Combinatorics Tomorrow

## Explain Like I Am 7

This grand finale is the museum tour of *modern* counting magic —
Young tableau staircases, swap-proof polynomial worlds,
self-mutating algebras, tropical mins-and-pluses, sturdy LEGO
matroids, sudden phase changes in random graphs, sum-set rigidity,
flashing-bulb Fourier waves, and the unavoidable order Ramsey
forces inside chaos.  We replay the highlights, knit them together
on real problems like recommendation systems and randomness
extraction, and peek at the open questions a working researcher
might tackle next.

## Mental

Nine lessons on:

- **Young tableaux and $S_n$** (Lesson 00).
- **Symmetric functions** (Lesson 01).
- **Cluster algebras** (Lesson 02).
- **Tropical mathematics** (Lesson 03).
- **Matroids** (Lesson 04).
- **Random graphs and thresholds** (Lesson 05).
- **Additive combinatorics deeper** (Lesson 06).
- **Discrete Fourier on groups** (Lesson 07).
- **Extremal set theory and Ramsey** (Lesson 08).

You can now read graduate-level algebraic and probabilistic
combinatorics. Three integrated walkthroughs.

## Walkthrough 1: counting and ML — perfect matchings on bipartite graphs

Modern recommendation systems often reduce to:

- Bipartite graph $G = (U \cup I, E)$ — users $\times$ items,
  edges = relevant pairs.
- Find optimal matching (assignment, Lessons in Strand 7 Advanced).
- Count perfect matchings: **\#P-hard** (Valiant), but FKT
  algorithm computes for *planar* bipartite graphs in polynomial
  time (Lesson 04 ~ matroid + linear-algebra).
- Use **permanent** of bipartite adjacency matrix; matrix-tree-style
  formulas.
- Modern **JL random projections** count distinct similar pairs at
  scale (Lesson 07's Walsh-Hadamard structure).

Industrial recommender systems combine these ingredients with
neural-net features.

## Walkthrough 2: TCS frontier — PCP, hardness of approximation

The PCP theorem (Lesson 08, Strand 7 Advanced) chains:

1. **BLR linearity testing** (Lesson 07).
2. **Long codes** built on Walsh-Hadamard (Lesson 07).
3. **Composition** of inner and outer verifiers.
4. **Approximation hardness** (Lesson 8 of Strand 7 Advanced):
   showing inapproximability of MAX-3SAT, MaxClique, Set Cover.

Recent: Khot's **Unique Games Conjecture** would imply tight
inapproximability bounds matching SDP relaxations (Lessons 5
Advanced).

This frontier links additive combinatorics, Fourier on $\mathbb F_2^n$,
and inapproximability theory.

## Walkthrough 3: combinatorics in post-quantum crypto

NIST PQ standards rely on combinatorial-algebraic structure:

- **Lattice schemes** (Kyber, Dilithium): use cyclotomic ring
  $\mathbb Z[x]/\Phi_n$, NTT for fast multiplication (Lesson 07).
- **Code-based** (McEliece): rely on Goppa codes — algebraic-
  geometric error correction.
- **Hash-based** (XMSS, SPHINCS+): Merkle-tree hashing, no
  number-theoretic assumption.
- **Isogeny-based** (CSIDH-CSIDH variants): algebraic combinatorics
  on isogeny graphs.

These exemplify how **modern crypto = combinatorics + algebra +
geometry** at the cutting edge.

## Roadmap

**Strand 5 Research-adjacent** picks up:

- $q$-analogues, quantum groups, integrable systems.
- Symmetric-function theory deeper (Macdonald polynomials,
  Schubert calculus).
- Tropical geometry frontier.
- Geometric group theory and combinatorial geometry of groups.
- Ramsey-Turán theory and probabilistic combinatorics frontier.

## Closing

Combinatorics in 2026 spans:

- Beautiful structural mathematics (Young tableaux, cluster algebras).
- Engineering optimisation (matroids, scheduling, network design).
- Theoretical CS (PCP, extractors, pseudorandomness).
- Modern crypto (lattices, codes, isogenies).
- Statistical mechanics, biology, finance.

The strand began with counting on fingers; it ends at the frontier
of mathematical research and the foundation of modern technology.

## Interactive

:::widget type=numeric-input prompt="Hook length formula counts SYT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cluster algebras Laurent phenomenon. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Tropical $\\oplus$ = min, $\\otimes$ = +. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$G(n, p)$ giant component at $p = 1/n$. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Schur polynomials are characters of $\\mathrm{GL}_n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Matroid: greedy gives optimal max-weight basis. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PFR over $\\mathbb F_2^n$ proven 2023. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$R(3, 3) = 6$. Type 1." answer=1 explain="Yes.":::
