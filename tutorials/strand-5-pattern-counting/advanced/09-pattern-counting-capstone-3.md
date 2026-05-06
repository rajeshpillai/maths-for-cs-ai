---
strand: pattern-counting
level: advanced
order: 9
title: Capstone — Counting at Scale
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 08-extremal-combinatorics
    description: Extremal combinatorics
connections:
  - strand-5-pattern-counting-intermediate/09-pattern-counting-capstone-2
  - strand-7-computation-intermediate/09-computation-capstone-2
applications:
  - cs: "Algorithm complexity, randomised algorithms, codes"
  - life: "When counting itself becomes a serious tool"
---

# Capstone — Counting at Scale

## Explain Like I Am 7

This is the grand finale.  You've collected polynomial-machines,
bracelet-spin tricks, mirror-image tricks, average-argument tricks,
and graph-flow tricks.  Now you point them at *real* problems —
how fast does a randomised sort run on average?  How many tries does
Secret Santa need before the gifts work out?  How many friendship
graphs hide a hidden triangle?  The same toolkit that started with
counting lollipops now answers questions a real-world algorithm
designer faces every day.

## Mental

Nine lessons on:

- **Generating functions** (Lesson 00).
- **Linear recurrences** (Lesson 01).
- **Catalan and ballot** (Lesson 02).
- **Inclusion-exclusion in action** (Lesson 03).
- **Pólya enumeration** (Lesson 04).
- **Asymptotic combinatorics** (Lesson 05).
- **Probabilistic method** (Lesson 06).
- **Graph theory: coloring, matching, flow** (Lesson 07).
- **Extremal combinatorics** (Lesson 08).

You have the toolkit of an Olympiad-level combinatorialist, plus the
quantitative methods used in real algorithm analysis. Three
integrated walkthroughs.

## Walkthrough 1: analysing a randomised algorithm

**Quicksort** with random pivot:

1. **Recursive structure** — pick a pivot, partition, recurse.
2. **Expected comparisons** — linearity of expectation (Lesson 06):
   element $i$ and $j$ are compared exactly when one of them is the
   first to be chosen as pivot among $\{i, i+1, \ldots, j\}$. That's
   probability $2/(j - i + 1)$.
3. **Total expected comparisons**:
   $\sum_{i < j} \frac{2}{j - i + 1} = O(n \log n)$.

That's a one-line probabilistic-method proof for the *average* case
of quicksort. No recurrence-solving needed.

## Walkthrough 2: a Reed-Solomon code

A Reed-Solomon code over $\mathbb{F}_q$ of length $n$ and dimension $k$:

- **Codewords** are evaluations of polynomials of degree $< k$ at $n$
  fixed points.
- **Number of codewords**: $q^k$.
- **Minimum distance**: $n - k + 1$ (any $k$ values determine the
  polynomial; differing at fewer than $n - k$ positions would mean the
  polynomial agrees with two valid codewords at $\ge k$ positions —
  impossible).
- **Singleton bound** (Lesson 08, extremal): no $(n, k, d)$ code can
  beat $d \le n - k + 1$. Reed-Solomon achieves equality — **MDS
  code**.

Counting + extremal + algebra produces optimal error correction.

## Walkthrough 3: a graph-theoretic algorithm

**Image segmentation via graph cut**:

1. Build a graph: pixels = vertices, edges between neighbours weighted
   by similarity.
2. Add a **source** representing "foreground" and **sink** "background";
   connect each pixel to source/sink with weights from a learned model.
3. Compute **min cut** (Lesson 07) — separates foreground from
   background.

The cut is computed via **max flow** (Lesson 07), efficiently in
$O(VE^2)$ — much better than brute search over $2^V$ partitions.

This is the Boykov-Kolmogorov interactive segmentation method, now
standard in image-editing software and used in medical imaging.

## Roadmap

**Strand 5 Master** picks up:

- Algebraic combinatorics: Young tableaux, symmetric functions,
  representation theory of $S_n$.
- Combinatorial Hopf algebras.
- Tropical geometry and tropical combinatorics.
- Combinatorial number theory: Erdős-Szemerédi, additive number
  theory.
- Random structures and processes.

**Strand 5 Research-adjacent**: combinatorial Hopf algebras, cluster
algebras, tropical combinatorics frontier, quantum groups,
Macdonald polynomials.

## Closing

Combinatorics began as the art of counting and grew into a science
of structure. From stacks of pancakes to the structure of error-
correcting codes to the analysis of randomised algorithms, *good
counting* is at the heart of both classical mathematics and modern
computation.

Where "real-world" problems have small explicit inputs, combinatorics
is the language. Where they have huge implicit structure (point
clouds, graphs), combinatorial bounds shape the algorithms we use.

## Interactive

:::widget type=numeric-input prompt="Catalan $C_n \\sim 4^n / n^{3/2}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reed-Solomon meets the Singleton bound — MDS code. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Max-flow min-cut. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ even for dependent. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Quicksort expected comparisons: $O(n \\log n)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sperner antichain max: $\\binom{n}{n/2}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pólya enumeration counts coloured structures modulo symmetry. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stirling: $n! \\sim \\sqrt{2\\pi n}(n/e)^n$. Type 1." answer=1 explain="Yes.":::
