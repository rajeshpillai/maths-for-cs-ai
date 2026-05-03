---
strand: pattern-counting
level: foundation
order: 9
title: Putting It Together — Counting Real Problems
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 08-fibonacci-and-recursion
    description: Fibonacci and recursive counting
connections:
  - strand-6-uncertainty-foundation/02-equally-likely-outcomes
applications:
  - business: "Combinatorial product configurations, A/B test design, password policy"
  - cs: "Algorithm complexity bounds, DP problem analysis, code-review of subset enumeration"
  - games: "Loot table sizing, deck composition, dialogue tree audits"
  - life: "Card-game hand analysis, password strength estimation, anagram puzzles"
---

# Putting It Together — Counting Real Problems

## Mental

Nine lessons in, you have a small but powerful counting toolkit:

- **Multiplication principle** (Lesson 00): $n_1 \cdot n_2 \cdot
  \ldots \cdot n_k$ for independent stages.
- **Tree diagrams** (Lesson 01): visualise mixed structures with
  branching counts; "OR adds, AND multiplies."
- **Permutations** (Lesson 02): $n!$ ordered arrangements,
  $\dfrac{n!}{(n-k)!}$ for $k$-permutations.
- **Combinations** (Lesson 03): $\binom{n}{k}$ for unordered
  $k$-selections.
- **Pascal's triangle** (Lesson 04): tabulated $\binom{n}{k}$ with
  the recursive identity.
- **Binomial theorem** (Lesson 05): $(a + b)^n$ expansion
  coefficients are binomial coefficients.
- **Stars and bars** (Lesson 06): $\binom{n + k - 1}{k - 1}$ for
  distributions with repetition.
- **Pigeonhole** (Lesson 07): $n + 1$ items in $n$ holes force a
  duplicate; generalises to $\lceil n/k \rceil$.
- **Recursive counting** (Lesson 08): split by first move; sum
  case counts; possibly memoise.

Real problems usually combine **two or three** of these. The skill
to develop is: **decompose the problem into stages or cases;
identify which tool fits each piece; combine via multiplication
(AND) or addition (OR).**

Three worked walkthroughs show this in action.

## Walkthrough 1: Counting anagrams of MISSISSIPPI

The word **MISSISSIPPI** has $11$ letters. How many distinct
rearrangements does it have?

If all letters were distinct, the answer would be $11!$. But MISSISSIPPI has repeats:
$1$ M, $4$ I's, $4$ S's, $2$ P's. Treating the $4$ I's as identical
means each "shape" of arrangement is counted **multiple times** by
$11!$ — once for every possible reordering of the four I's, the four
S's, and the two P's among themselves.

By the **multinomial coefficient**:

$$
\text{distinct anagrams} = \frac{11!}{1! \cdot 4! \cdot 4! \cdot 2!} = \frac{39\,916\,800}{1 \cdot 24 \cdot 24 \cdot 2} = \frac{39\,916\,800}{1152} = 34\,650.
$$

That's the count. **Per-letter $!$ in the denominator** undoes the
overcounting from the multiple identical copies — a tool you'll use
constantly for word problems.

## Walkthrough 2: Counting 5-card poker hands of each type

A standard deck has $52$ cards. The total number of $5$-card hands
(unordered) is $\binom{52}{5} = 2\,598\,960$ (Lesson 03's flagship
number). Now break this total into hand categories:

**Royal flush** (A-K-Q-J-10 same suit): $4$ — one per suit.

**Straight flush** (5 consecutive same suit, not royal): $40$.
($9$ rank-starts × $4$ suits, but subtract $4$ royals gives... let me
recompute: $10$ rank-starts × $4$ suits = $40$, minus $4$ royal = $36$.
Convention varies on whether royal counts as straight flush; use
$36$ if separate.)

**Four of a kind**: $\binom{13}{1} \cdot \binom{48}{1} = 13 \cdot 48
= 624$.
- $13$ ranks for the four-of-a-kind, $48$ remaining cards for the
  fifth.

**Full house** (3 of one rank + 2 of another):
$\binom{13}{1} \cdot \binom{4}{3} \cdot \binom{12}{1} \cdot \binom{4}{2} =
13 \cdot 4 \cdot 12 \cdot 6 = 3\,744$.
- Pick the triple's rank ($13$), suits for the triple ($\binom{4}{3} = 4$),
  pick the pair's rank ($12$ remaining), suits for the pair ($\binom{4}{2} = 6$).

**Probability of a full house**: $\dfrac{3\,744}{2\,598\,960} \approx
0.00144$ — about $1$ in $694$. Strand 6's probabilities meet
Strand 5's counts.

The general formula: probability of a hand type = (number of hands
of that type) / $\binom{52}{5}$. Counting the *numerators* requires
the multiplication principle plus combinations — exactly the toolkit
of this strand.

## Walkthrough 3: Password-strength analysis

A website requires passwords of $8$ characters from these classes:
$26$ lowercase + $26$ uppercase + $10$ digits + $32$ punctuation = $94$
characters total.

**Without restrictions**: $94^8 \approx 6.1 \times 10^{15}$. By
multiplication principle.

**With "must include at least one digit and one punctuation"**:

Use **inclusion-exclusion** (Strand 6 Lesson 06). Let $A$ = passwords
with **no** digit, $B$ = passwords with **no** punctuation. We want
$|S| - |A \cup B|$.

$|S| = 94^8$.
$|A| = 84^8$ (no digits → $94 - 10 = 84$ allowed).
$|B| = 62^8$ (no punctuation → $94 - 32 = 62$).
$|A \cap B| = 52^8$ (no digit AND no punctuation → only letters).

By inclusion-exclusion:

$$
|A \cup B| = |A| + |B| - |A \cap B| = 84^8 + 62^8 - 52^8.
$$

The valid passwords (must include at least one digit and one
punctuation):

$$
N = 94^8 - 84^8 - 62^8 + 52^8.
$$

Roughly: $6.1 \times 10^{15} - 2.4 \times 10^{15} - 2.2 \times 10^{14}
+ 5.3 \times 10^{13} \approx 3.5 \times 10^{15}$.

About **half** of the unrestricted password space is rejected by the
restrictions. Restrictions weaken the password slightly (fewer valid
combinations) — a sometimes-counterintuitive consequence of forcing
specific structure.

A modern password-strength estimator combines these counts with
**dictionary attacks** (the attacker's strategy): if attackers know
your password starts with a capital letter and ends with a digit (a
common pattern), the effective search space shrinks dramatically.
Counting the **attacker's** search space matters more than counting
all valid passwords.

## Interactive

:::widget type=numeric-input prompt="The word 'BANANA' has $6$ letters. How many distinct anagrams? Use $\\dfrac{6!}{a! b! n!}$ where $a, b, n$ are the letter counts. Type the result." answer=60 explain="B = 1, A = 3, N = 2. $\\dfrac{6!}{1! \\cdot 3! \\cdot 2!} = \\dfrac{720}{12} = 60$.":::

:::widget type=numeric-input prompt="A standard deck. How many distinct 5-card hands contain exactly one pair of jacks (and no other pair)?" answer=84480 explain="Choose the 2 jacks ($\\binom{4}{2} = 6$). Choose 3 distinct other ranks ($\\binom{12}{3} = 220$). For each of these, pick a suit ($4^3 = 64$). Total: $6 \\cdot 220 \\cdot 64 = 84\\,480$.":::

:::widget type=numeric-input prompt="A 4-character password from $26$ lowercase letters, with no character repeated. How many possible passwords?" answer=358800 explain="Permutation: $P(26, 4) = 26 \\cdot 25 \\cdot 24 \\cdot 23 = 358\\,800$.":::

:::widget type=numeric-input prompt="A pizza place has $10$ toppings. You pick exactly $4$. How many distinct $4$-topping pizzas?" answer=210 explain="Combination: $\\binom{10}{4} = \\dfrac{10!}{4! 6!} = 210$. Order doesn't matter.":::

:::widget type=numeric-input prompt="In how many ways can $8$ identical chocolates be split among $3$ kids (any kid may get $0$)?" answer=45 explain="Stars and bars: $\\binom{8 + 2}{2} = \\binom{10}{2} = 45$.":::

:::widget type=step-revealer
{
  "title": "Counting flushes (5 cards same suit)",
  "steps": [
    {"prose": "We want $5$-card hands where all $5$ cards are the same suit (but **not** a straight flush)."},
    {"math": "\\text{flushes (any kind)} = \\binom{4}{1} \\cdot \\binom{13}{5}", "prose": "Pick the suit ($4$ choices), then pick $5$ cards from that suit's $13$ ranks."},
    {"math": "= 4 \\cdot 1287 = 5{,}148", "prose": "Total flushes (including straight flushes and royal flushes)."},
    {"math": "\\text{straight flushes} = 4 \\cdot 10 = 40", "prose": "10 starting ranks (A-2-3-4-5 through 10-J-Q-K-A) × 4 suits."},
    {"math": "\\text{flushes (excluding straights)} = 5{,}148 - 40 = 5{,}108", "prose": "Subtract the straight flushes from the total flushes to get only 'plain' flushes."},
    {"math": "P(\\text{flush}) = \\frac{5{,}108}{\\binom{52}{5}} = \\frac{5{,}108}{2{,}598{,}960} \\approx 0.00197", "prose": "About $1$ in $508$ hands. Combined Strand 5 (counting) and Strand 6 (probability)."}
  ]
}
:::

## Connective and beyond

The combinatorial toolkit you've built reaches into:

**Strand 5 Intermediate** picks up:

- **Generating functions**: a powerful algebraic tool that turns
  recurrences into polynomial identities. Solves problems where
  Fibonacci-style recursion alone is unwieldy.
- **Inclusion-exclusion** at full generality: handles any "exactly
  $k$" or "at least $j$" counting problem.
- **Catalan numbers**: $C_n = \dfrac{\binom{2n}{n}}{n+1}$ counts
  parenthesisations, balanced parens strings, BST structures, lattice
  paths above the diagonal, and dozens of other surprisingly-
  related things.
- **Recurrence-based DP** at scale: edit distance, longest common
  subsequence, knapsack — the algorithmic side of this strand.

**Strand 5 Advanced** continues into:

- **Polya enumeration**: counting configurations modulo symmetry —
  necklace counts, graph colourings up to rotation.
- **Bijective combinatorics**: a beautiful sub-field that proves
  identities by exhibiting one-to-one correspondences.
- **Random graphs and probabilistic combinatorics**: counting in
  the presence of randomness.

For now, you have **enough combinatorics to attack a vast range of
counting questions**. From cryptographic key spaces to lottery odds
to anagram counts to algorithm complexity bounds, the same nine-tool
toolkit handles them all.

## Check Your Understanding

:::widget type=numeric-input prompt="Distinct anagrams of LETTERS (7 letters: 1 L, 2 E, 1 T appears twice... wait, T appears twice, R once, S once)." answer=1260 explain="LETTERS: L=1, E=2, T=2, R=1, S=1. $\\dfrac{7!}{1! \\cdot 2! \\cdot 2! \\cdot 1! \\cdot 1!} = \\dfrac{5040}{4} = 1260$.":::

:::widget type=numeric-input prompt="A bag has $5$ red, $3$ blue, $2$ green marbles. Draw $4$ marbles. How many ways to get exactly $2$ red, $1$ blue, $1$ green?" answer=60 explain="$\\binom{5}{2} \\cdot \\binom{3}{1} \\cdot \\binom{2}{1} = 10 \\cdot 3 \\cdot 2 = 60$. Multiplication principle on independent colour-choices.":::

:::widget type=numeric-input prompt="An $8$-character password from $26$ lowercase letters with no other restrictions. How many possible passwords?" answer=208827064576 explain="$26^8 = 208\\,827\\,064\\,576 \\approx 2.1 \\times 10^{11}$. About 200 billion. Brute-force at $10^9$/sec takes minutes — too weak for serious security.":::

:::widget type=numeric-input prompt="$15$ identical balls into $5$ distinct boxes, each box gets $\\ge 1$. How many ways?" answer=1001 explain="Substitute $y_i = x_i - 1$: $y_1 + ... + y_5 = 10$, $y_i \\ge 0$. $\\binom{10 + 4}{4} = \\binom{14}{4} = 1001$.":::
