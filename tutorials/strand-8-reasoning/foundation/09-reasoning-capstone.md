---
strand: reasoning
level: foundation
order: 9
title: Reasoning Capstone — Three Famous Proofs
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 08-quantifiers
    description: Quantifiers
connections:
  - strand-8-reasoning-foundation/00-statements-and-truth
applications:
  - cs: "Foundational results in CS theory"
  - life: "How to read mathematics"
---

# Reasoning Capstone — Three Famous Proofs

## Mental

You now have:

- Statements and truth (Lesson 00).
- Connectives ¬, ∧, ∨, →, ↔ and truth tables (01).
- Sets and operations (02).
- Functions and relations (03).
- Direct proof (04).
- Proof by contradiction (05).
- Proof by induction (06).
- Cardinality and the diagonal argument (07).
- Quantifiers (08).

Three integrated proofs showcase the toolkit.

## Walkthrough 1: $\sqrt 2$ is irrational (contradiction)

**Theorem**: $\sqrt 2 \not\in \mathbb{Q}$.

**Proof**: Assume for contradiction $\sqrt 2 = p/q$ with $\gcd(p, q)
= 1$.

Then $p^2 = 2 q^2$, so $p^2$ even, so $p$ even (a direct claim
proved separately). Write $p = 2k$.

Then $4 k^2 = 2 q^2$, $q^2 = 2 k^2$, so $q$ even.

But then $\gcd(p, q) \ge 2$, contradicting $\gcd = 1$. □

## Walkthrough 2: $\sum_{i=1}^n i = n(n+1)/2$ (induction)

**Theorem**: $\sum_{i=1}^n i = \dfrac{n(n+1)}{2}$ for all $n \ge 1$.

**Proof**: Base case $n = 1$: LHS = 1, RHS = $1$. ✓

Inductive step: assume $\sum_{i=1}^k i = k(k+1)/2$. Show for $k +
1$:

$$
\sum_{i=1}^{k+1} i = \frac{k(k+1)}{2} + (k+1) = \frac{k(k+1) + 2(k+1)}{2} = \frac{(k+1)(k+2)}{2}.
$$

That's RHS for $n = k + 1$. ✓ □

## Walkthrough 3: $\mathbb{R}$ is uncountable (Cantor's diagonal)

**Theorem**: there is no bijection $\mathbb{N} \to \mathbb{R}$.

**Proof**: Assume for contradiction $\mathbb{R}$ countable. Then
the reals in $[0, 1)$ are listable as decimals $r_1, r_2, r_3, \ldots$.

Construct $r^* \in [0, 1)$ whose $i$-th decimal digit differs from
$r_i$'s $i$-th decimal digit. (E.g., flip $0$ ↔ $1$ on each.)

Then $r^*$ differs from every $r_i$ in at least one decimal position
— so $r^*$ is not in the list. But $r^* \in [0, 1) \subseteq \mathbb{R}$
should be in the list. Contradiction. □

The construction uses the **diagonal**: digit $i$ of $r_i$.

## Roadmap

**Strand 8 Intermediate** picks up:

- Predicate logic in depth.
- Set theory axioms (ZFC).
- Equivalence relations and partitions.
- Natural-number axioms (Peano).
- Constructive vs classical logic.

**Strand 8 Advanced** continues:

- Model theory.
- Formal proof systems and Gödel's incompleteness theorems.
- Type theory and the Curry-Howard correspondence.
- Category theory introduction.

**Strand 8 Master** covers homotopy type theory, large cardinals,
and the foundations of foundations.

## Closing

You can now read most introductory pure math and CS theory. The
proof techniques you've learned — direct, contradiction, induction,
and bijection — handle the vast majority of theorems you'll meet
in undergraduate study.

## Interactive

:::widget type=numeric-input prompt="Three proof techniques: direct, contradiction, induction. Which one proves '$\\forall n \\in \\mathbb{N}: P(n)$' typically? (0 direct, 1 contradiction, 2 induction.)" answer=2 explain="Induction is the natural tool for $\\forall n \\in \\mathbb{N}$.":::

:::widget type=numeric-input prompt="Which technique proves '$\\sqrt 2$ is irrational'?" answer=1 explain="Contradiction.":::

:::widget type=numeric-input prompt="Which technique proves '$\\mathbb{R}$ is uncountable'?" answer=1 explain="Contradiction (Cantor's diagonal).":::

:::widget type=numeric-input prompt="The proof that 'sum of two evens is even' is a..." answer=0 explain="Direct proof.":::

## Check Your Understanding

:::widget type=numeric-input prompt="A bijection $f: A \\to B$ is both ___ and ___ (1 = injective + surjective)." answer=1 explain="Injective and surjective.":::

:::widget type=numeric-input prompt="Proof by induction has two parts: base case and inductive step. Type the number of parts." answer=2 explain="Two parts.":::

:::widget type=numeric-input prompt="$\\neg(\\forall x: P(x)) \\equiv ?$ (0: $\\forall x: \\neg P(x)$; 1: $\\exists x: \\neg P(x)$.)" answer=1 explain="$\\exists x: \\neg P(x)$.":::

:::widget type=numeric-input prompt="$|\\mathbb{N}|$ vs $|\\mathbb{R}|$: equal (1) or unequal (0)?" answer=0 explain="Unequal — Cantor's diagonal.":::
