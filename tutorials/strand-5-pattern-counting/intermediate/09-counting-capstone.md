---
strand: pattern-counting
level: intermediate
order: 9
title: Capstone — Counting in Real Algorithms
prerequisites:
  - tier: strand-5-pattern-counting-intermediate
    slug: 08-burnside-counting-symmetry
    description: Burnside's lemma
connections:
  - strand-5-pattern-counting-foundation/09-counting-in-real-problems
applications:
  - cs: "Algorithm complexity, hashing analysis, DP problem decomposition"
  - business: "Decision-tree audit, A/B testing variant counts"
  - games: "Procedural-content count, balance design"
  - life: "Probability and counting in everyday decisions"
---

# Capstone — Counting in Real Algorithms

## Explain Like I Am 7

Now we put all your counting toys in one big toolbox and tackle real
puzzles.  How many shapes can a tree of names take inside a
computer?  How likely is it that a Secret Santa shuffle gives
*nobody* their own gift?  How many flips does a pancake-sorting
robot need on average?  Each story is a Russian-doll mix of the
tricks you've already learned — counting branches, choosing groups,
multiplying choices, then dividing out the look-alikes — assembled
into one big satisfying answer.

## Mental

Two integrated walkthroughs combine multiple Intermediate tools.

## Walkthrough 1: How many BSTs and DP

A **binary search tree** with $n$ distinct keys can have $C_n$ shapes
(Lesson 05). For $n = 10$, that's $C_{10} = 16\,796$ different BSTs.

But the **average depth** of a random BST (with keys inserted in
random order) is $O(\log n)$ — a deep result combining counting (BST
shape distribution) and probability (over insertion orders). This
average-depth fact justifies why insertion-sorted BSTs perform well
**on average**, even when the worst case is $O(n)$.

## Walkthrough 2: Counting derangements as a probability

Given $n$ shuffled name draws (Secret Santa), we showed in Lesson 04
that the probability nobody draws themselves is approximately $1/e$,
regardless of $n$. So:

- Probability **at least one** draws themselves is $1 - 1/e \approx
  0.632$. Common.
- **Expected number** of people drawing themselves is exactly $1$
  (linearity of expectation: each person has $1/n$ chance, $n$
  people, total $1$).
- These two coexist: about $63\%$ of trials have **at least one**,
  but the **expected count** is just $1$.

Real Secret Santa software runs `random.shuffle()`, checks for fixed
points, and re-shuffles if any. The expected number of re-shuffles
is bounded — the geometric expectation $1/(1/e) \approx e$, so on
average $\sim 2.7$ shuffles needed.

## Roadmap

**Strand 5 Advanced** explores:

- **Polya enumeration theorem**: Burnside generalised to track
  colour distributions.
- **Random graph theory**: Erdős-Rényi, threshold phenomena,
  expected component sizes.
- **Probabilistic combinatorics**: showing existence of objects via
  expectation arguments.
- **Asymptotic / analytic combinatorics**: extracting $n$-th
  coefficients of complicated generating functions, Hardy-Ramanujan
  style.
- **Ramsey theory**: every "large enough" structure contains
  ordered substructures. The trivial example: Ramsey's theorem
  $R(3, 3) = 6$ — among any $6$ people, $3$ are mutual friends or
  $3$ are mutual strangers.

**Strand 5 Master** continues with PCP / probabilistically checkable
proofs, expander graphs, and the deep connections to theoretical CS.

## Interactive

:::widget type=numeric-input prompt="$C_7 = ?$" answer=429 explain="From the sequence: $1, 1, 2, 5, 14, 42, 132, 429$.":::

:::widget type=numeric-input prompt="$|D_5|$ (derangement count for $n = 5$)?" answer=44 explain="$!5 = 44$.":::

:::widget type=numeric-input prompt="Number of distinct $4$-bead bracelets with $3$ colours, rotational symmetry only?" answer=24 explain="By Burnside (Lesson 08): $(81 + 3 + 9 + 3)/4 = 24$.":::

:::widget type=numeric-input prompt="A team of $4$ is split into a $2$-pair and a $1+1$ singleton arrangement. By multinomial (Lesson 00) divided by symmetry of pair-vs-pair: $\\dfrac{4!/(2! \\cdot 1! \\cdot 1!)}{2}$? (The $/2$ is because the two singletons are interchangeable.) — Type the answer." answer=6 explain="$\\dfrac{12}{2} = 6$. (The arrangement has internal symmetry.)":::

## What you can now do

You have **enough combinatorics** to:

- Count anagrams, multinomial expansions, BST counts, derangements.
- Solve linear recurrences in closed form.
- Use generating functions for compositions and partitions.
- Apply inclusion-exclusion to "at-least-one" or
  "at-least-$k$"-style counts.
- Recognize and prove identities via bijections.
- Count under symmetry with Burnside.

This is the toolkit underlying:

- Algorithm complexity analysis.
- Combinatorial chemistry (counting molecular isomers).
- Probabilistic algorithms (Monte Carlo, randomised data
  structures).
- Statistical physics (entropy = log of microstate count).

## Check Your Understanding

:::widget type=numeric-input prompt="Coefficient of $x^3$ in $(1 + x + x^2)^5$? (Use generating function reasoning.)" answer=30 explain="One way: think of choosing 5 items from $\\{0,1,2\\}$ (with repetition) summing to 3. Combinations: $(0,0,0,0,3)$ — none, since 3 isn't allowed. $(0,0,0,1,2)$: $5!/(3!1!1!) = 20$. $(0,0,1,1,1)$: $5!/(2!3!) = 10$. Total $30$.":::

:::widget type=numeric-input prompt="$p(7)$ (partitions of 7)?" answer=15 explain="From Lesson 07's sequence.":::

:::widget type=numeric-input prompt="Solve $a_n = a_{n-1} + 6 a_{n-2}$ with $a_0 = 0, a_1 = 1$. Characteristic eqn $x^2 - x - 6 = (x-3)(x+2)$. Roots $3, -2$. Closed form $a_n = (3^n - (-2)^n)/5$. $a_4 = ?$" answer=13 explain="$(81 - 16)/5 = 65/5 = 13$. Verify recurrence: $a_2 = 1, a_3 = 1 + 6 = 7, a_4 = 7 + 6 = 13$. ✓":::

:::widget type=numeric-input prompt="If $|G| = 6$ acts on $X$ with $|X^{e}| = 24$ and other elements have $|X^g| = 0$, then $|X/G| = ?$" answer=4 explain="$24/6 = 4$. Free action on every non-identity.":::
