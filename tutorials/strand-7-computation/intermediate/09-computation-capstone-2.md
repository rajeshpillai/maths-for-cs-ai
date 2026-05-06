---
strand: computation
level: intermediate
order: 9
title: Capstone — Algorithms Powering Modern Software
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 08-automata-and-regex
    description: Automata
connections:
  - strand-7-computation-foundation/09-computation-capstone
  - strand-2-structure-intermediate/09-structure-capstone-2
applications:
  - cs: "Search engines, compilers, OS kernels, ML systems"
  - life: "What it takes to make these algorithms feel instantaneous"
---

# Capstone — Algorithms Powering Modern Software

## Explain Like I Am 7

This chapter is the science fair where every gadget you've built so
far gets switched on at once.  The maps, the tries, the sticky-note
trick, the cheapest-pipe builder, the priority clipboard — they all
team up to make the apps you actually use: the route-finder in your
phone, the search bar that guesses your sentence, the spam filter
quietly tossing junk mail.  No new tools today, just a guided tour
through how grown-up software stitches the toolkit into things that
feel like magic.

## Mental

Nine lessons on:

- **Dynamic programming** (Lesson 00).
- **Graphs — BFS/DFS** (Lesson 01).
- **Shortest paths — Dijkstra** (Lesson 02).
- **Minimum spanning trees** (Lesson 03).
- **Heaps and priority queues** (Lesson 04).
- **Tries and string algorithms** (Lesson 05).
- **Complexity classes — P, NP** (Lesson 06).
- **NP-completeness and reductions** (Lesson 07).
- **Automata and regular expressions** (Lesson 08).

You have the algorithmic toolkit of a competent backend engineer.
Three integrated walkthroughs.

## Walkthrough 1: Google Maps tells you the route

Typing "Manhattan to JFK" into Maps:

- **String parsing** — autocomplete via trie (Lesson 05) on places.
- **Lexer / parser** — query language analysed via DFA + grammar
  (Lesson 08).
- **Graph construction** — road network is a weighted directed
  graph (Lesson 01) with $\sim 10^8$ edges.
- **Shortest path** — bidirectional A* with contraction-hierarchy
  preprocessing (Lesson 02). Returns in ~50ms.
- **Alternative routes** — k-shortest paths via Yen's algorithm,
  yet again priority-queue-based (Lesson 04).
- **Caching** — recent queries hashed (Strand 7 Foundation Lesson 06).

Every algorithm here was in this strand-level. Production systems
combine, optimise, parallelise — but the fundamentals are these.

## Walkthrough 2: a programming-language compiler

Compiling source code:

- **Lexer** — DFA generated from regex per token (Lesson 08).
  Each character → one DFA transition; entire program in $O(n)$.
- **Parser** — context-free grammar (a step beyond regex) built on
  top.
- **Type checker** — DAG of dependencies; topological sort (Lesson 01)
  to resolve type variables.
- **Optimisation** — register allocation as graph coloring (Lesson 07,
  NP-hard, heuristics like Briggs/Chaitin used).
- **Instruction scheduling** — DP and constraint solving (Lesson 00).
- **Code generation** — pattern matching using tries on instruction
  selection rules (Lesson 05).

The whole compiler is *this* strand applied to itself.

## Walkthrough 3: a search engine

Web search at $10^{12}$ pages:

- **Crawling** — BFS/DFS frontier (Lesson 01) over the web graph.
- **Indexing** — invert text → posting lists, kept sorted, looked
  up via tries/hashing (Lesson 05 / Foundation 06).
- **Ranking** — PageRank as eigenvalue problem; many-stage
  ranking with learned models.
- **Top-K results** — heap of size 10 (Lesson 04) — extract best 10
  in $O(n \log 10)$ from millions of candidate matches.
- **Spell-check** — edit-distance DP (Lesson 00) over a candidates
  trie.
- **Geographic queries** — shortest paths on road graph (Lesson 02).

## Roadmap

**Strand 7 Advanced** picks up:

- Numerical linear algebra: iterative solvers, sparse methods.
- Cryptography algorithms: RSA, AES, elliptic-curve, lattice-based.
- Advanced graph algorithms: max flow, min cut, matching, planar
  graphs.
- Probabilistic data structures (Bloom filters, count-min sketch,
  HyperLogLog).
- Advanced approximation and randomized algorithms.

**Strand 7 Master**: parallel and distributed computing, GPU
programming, theory of computation in depth (Turing reducibility,
recursion theory), Kolmogorov complexity, quantum algorithms,
descriptive complexity, fixed-parameter tractability.

## Closing

Algorithms are how mathematics meets the wall-clock. You can
*understand* sorting, but until you've felt the difference between
an $O(n \log n)$ and $O(n^2)$ sort on a million items, the *cost*
of cleverness doesn't sink in.

Every fast service you use was once impossibly slow. What changed
wasn't the hardware (mostly). It was the algorithms. *That's* why
this strand earns its keep.

## Interactive

:::widget type=numeric-input prompt="Dijkstra time with binary heap: $O((V + E) \\log V)$. Type 1 if correct." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DP turns naive Fibonacci $O(\\phi^n)$ into $O(?)$. Type 1 for $n$, 2 for $n^2$." answer=1 explain="$O(n)$.":::

:::widget type=numeric-input prompt="Vertex cover has a 2-approximation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DFA, NFA, regex describe regular languages. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Trie lookup of $L$-character query: $O(L)$, independent of dictionary size. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MST has $|V| - 1$ edges. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="If $A \\le_p B$ and $B \\in P$, then $A \\in P$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Heap insert: $O(\\log n)$. Type 1." answer=1 explain="Yes.":::
