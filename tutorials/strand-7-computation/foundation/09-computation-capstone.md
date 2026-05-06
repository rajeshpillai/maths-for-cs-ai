---
strand: computation
level: foundation
order: 9
title: Capstone — Computation in the Wild
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 08-numerical-integration
    description: Numerical integration
connections:
  - strand-4-change-foundation/00-rate-of-change
  - strand-8-reasoning-foundation/06-proof-by-induction
applications:
  - cs: "Every modern computational system; this is where the strands come together"
  - life: "How math becomes software"
---

# Capstone — Computation in the Wild

## Explain Like I Am 7

Imagine you've been collecting little tools all year — a magnifying
glass for spotting tiny errors, a stopwatch for timing recipes, a
torch made of light bulbs for counting in twos, a half-line trick for
splitting puzzles in two.  Today is the show-and-tell day where you
take every tool out of the box and use them together on a real
project: a bouncing ball, a search bar, a tiny calculator.  This
chapter is the field trip where the toolbox stops being a toolbox and
starts being something the world actually uses.

## Mental

Nine lessons on:

- **What is an algorithm?** (Lesson 00).
- **Number representation in computers** (Lesson 01).
- **IEEE 754 floating point** (Lesson 02).
- **Big-O notation** (Lesson 03).
- **Sorting and searching** (Lesson 04).
- **Recursion** (Lesson 05).
- **Hash functions and tables** (Lesson 06).
- **Newton's method** (Lesson 07).
- **Numerical integration** (Lesson 08).

You've seen the three pillars of computation: **representation**
(how numbers fit in finite bits), **algorithms** (what we compute and
how fast), and **numerical methods** (how we approximate continuous
mathematics on a finite machine). Three integrated walkthroughs.

## Walkthrough 1: a search engine query

You type "best pizza in town" into a search bar. What happens
mathematically?

1. **Tokenization** — string algorithms split your query into terms.
2. **Hash lookup** — each term hits a hash-indexed posting list of
   relevant pages (Lesson 06: $O(1)$).
3. **Set intersection** — find pages mentioning all terms.
4. **Ranking** — TF-IDF or learned scoring computes a relevance
   number per page; PageRank weights each by the eigenvalue of a
   modified adjacency matrix (Strand 2 Advanced territory).
5. **Top-K extraction** — find the top 10 results from millions —
   classic algorithm (heap-based, $O(n \log k)$).

The whole roundtrip in ~100 ms over a corpus of $10^{12}$ pages.
Without Big-O reasoning (Lesson 03), this would be impossible.

## Walkthrough 2: a deep-learning training step

A modern transformer trains on text by:

1. **Forward pass** — matrix multiplications use **floating point**
   (Lesson 02). Training stability depends on numerical care
   (mixed precision: float32 weights, bfloat16 activations).
2. **Loss computation** — cross-entropy involves logs and exponentials
   (Strand 4 Foundation). Use log-sum-exp trick to avoid overflow.
3. **Backward pass** — automatic differentiation: chain rule
   (Strand 4 Foundation Lesson 06) implemented as recursion (Lesson 05)
   over the computation graph.
4. **Optimizer step** — Adam uses Newton-flavored ideas (Lesson 07)
   adapting per-parameter learning rates.
5. **Numerical integration** — diffusion models like Stable Diffusion
   solve an ODE numerically (Lesson 08) at sampling time.

Every layer of the stack rests on this lesson tier.

## Walkthrough 3: physics in a video game

A driving game simulates a car:

1. **State** — position $\mathbf{x}$, velocity $\mathbf{v}$ stored as
   **floats** (Lesson 02). Subnormals matter at high speeds — bugs
   appear when speeds near zero are squared in friction calculations.
2. **Forces** — gravity, drag, engine — vector arithmetic.
3. **Update** — Verlet or Runge-Kutta is **numerical integration**
   (Lesson 08). Naive Euler explodes; better methods preserve energy
   and stability.
4. **Collision** — broad-phase uses **spatial hashing** (Lesson 06);
   narrow-phase solves Newton-iteration root finding (Lesson 07).
5. **Rendering** — z-buffer uses floating-point depth (Lesson 02);
   triangle rasterization is a classic algorithm (Lesson 00).

The same calculus, hashing, sorting, and Newton's method that you
just learned. Game physics is applied first-principles math.

## Roadmap

**Strand 7 Intermediate** picks up:

- More algorithms: dynamic programming, graph algorithms (BFS/DFS,
  Dijkstra, MST).
- Data structures: heaps, balanced BSTs, tries.
- Complexity classes: P, NP, NP-completeness.
- Automata theory and regular expressions.

**Strand 7 Advanced** continues:

- Numerical linear algebra: iterative solvers, sparse methods.
- Cryptography algorithms: RSA, AES, elliptic curves.
- Approximation algorithms and randomized algorithms.
- Automatic differentiation in depth (forward vs reverse mode).

**Strand 7 Master**: parallel and distributed computing, GPU
programming, theory of computation, Kolmogorov complexity, quantum
algorithms.

## Closing

Computation is where every other strand earns its keep. Calculus
gives you `math.exp`. Logic gives you the type system. Algebra
gives you crypto. Probability gives you ML. **All implemented in
finite hardware** — that's the constraint that distinguishes
"mathematics" from "computation."

Great computational thinking is *mathematical thinking on a budget*.
You have finite bits, finite cycles, finite memory. The art is to
spend them wisely.

## Interactive

:::widget type=numeric-input prompt="Hash table average lookup: $O(?)$. Type 1 for constant." answer=1 explain="$O(1)$.":::

:::widget type=numeric-input prompt="Mergesort: $O(?)$. Type 1 for $n \\log n$." answer=1 explain="$O(n \\log n)$.":::

:::widget type=numeric-input prompt="Newton's method has quadratic convergence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Simpson's rule is exact for polynomials of degree $\\le ?$" answer=3 explain="$3$.":::

## Check Your Understanding

:::widget type=numeric-input prompt="$0.1 + 0.2 \\ne 0.3$ in IEEE 754. Type 1 if true." answer=1 explain="Yes — repeating-binary truncation.":::

:::widget type=numeric-input prompt="Hash collisions are inevitable when keys outnumber slots. Pigeonhole. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Memoization can turn naive Fib's $O(\\phi^n)$ into $O(n)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Monte Carlo error scales independent of dimension. Type 1." answer=1 explain="Yes — $O(N^{-1/2})$ regardless of $d$.":::
