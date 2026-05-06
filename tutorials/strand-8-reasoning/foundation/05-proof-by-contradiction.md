---
strand: reasoning
level: foundation
order: 5
title: Proof by Contradiction
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 04-direct-proof
    description: Direct proof
connections:
  - strand-8-reasoning-foundation/06-proof-by-induction
applications:
  - cs: "Showing impossibility (e.g., halting problem); algorithm lower bounds"
  - life: "Reductio ad absurdum in arguments"
---

# Proof by Contradiction

## Explain Like I Am 7

You want to prove the cat is in the kitchen, but you're stuck.  So
try the cheeky trick: *pretend* the cat is **not** in the kitchen and
follow that thought wherever it goes.  If you end up at "...so the
fishbowl is empty *and* the fishbowl is full," — total nonsense — then
the pretending must have been wrong, and the cat must be in the
kitchen after all.  Proving things by *ruling out* the only other
possibility is a sneaky but completely legal move.

## Mental

A **proof by contradiction** of $P$ shows: if you assume $\neg P$, you
derive a logical impossibility (a contradiction). Therefore $\neg P$
must be wrong, so $P$ is true.

Skeleton:

> **Theorem**: $P$.
>
> **Proof**: Suppose, for contradiction, $\neg P$. [Chain of
> reasoning.] But this contradicts [some known fact]. So our
> assumption was wrong. Therefore $P$. □

Equivalently called **reductio ad absurdum** ("reduction to
absurdity").

## Famous example: $\sqrt 2$ is irrational

(We saw this in Strand 1 Intermediate Lesson 07; here it is in proof-
language form.)

**Theorem**: $\sqrt 2$ is not rational.

**Proof**: Suppose, for contradiction, $\sqrt 2 = p/q$ for some
integers with $\gcd(p, q) = 1$.

Then $2 q^2 = p^2$, so $p^2$ is even, so $p$ is even (Lesson 04 — sum
of two evens is even, but more directly: odd² is odd).

Write $p = 2k$. Then $2 q^2 = 4 k^2$, so $q^2 = 2 k^2$, so $q^2$ is
even, so $q$ is even.

But then $\gcd(p, q) \ge 2$, contradicting our assumption $\gcd(p,
q) = 1$. So $\sqrt 2$ cannot be rational. □

The contradiction is the heart: assuming $\sqrt 2 \in \mathbb{Q}$
forces $\gcd(p, q) \ge 2$, which violates the irreducible
assumption.

## Interactive

:::widget type=numeric-input prompt="Proof by contradiction of '$\\sqrt 2$ irrational' assumes... what? (1: $\\sqrt 2 = p/q$ with $\\gcd = 1$; 0: $\\sqrt 2 \\ne p/q$.)" answer=1 explain="Assume the negation.":::

:::widget type=numeric-input prompt="The contradiction reached: assumed $\\gcd(p, q) = 1$ but derived $\\gcd \\ge 2$. Type 1 if this is the contradiction." answer=1 explain="Yes — exactly the contradiction.":::

:::widget type=numeric-input prompt="Proof by contradiction: 'There are infinitely many primes.' (Euclid.) Assume only finitely many: $p_1, ..., p_n$. Form $N = p_1 \\cdot ... \\cdot p_n + 1$. $N$ has no prime factor in the list. Contradiction. Type 1 if valid." answer=1 explain="Valid — Euclid's classic proof.":::

## Symbolic

**Logical schema**:

$$
P \to (P \wedge \neg P) \to \bot.
$$

If assuming $\neg P$ leads to $\bot$ (false), then $P$ must be true.

This relies on the **law of excluded middle** (every proposition is
true or false). In **constructive** mathematics (intuitionistic logic
— Strand 8 Advanced), proofs by contradiction are restricted; you
need to **construct** an example.

## Applied

- **Halting problem**: "no algorithm decides whether arbitrary
  programs halt." Proved by contradiction (Turing 1936): assume such
  an algorithm exists, then construct a paradoxical program to
  reach contradiction.
- **Cantor's diagonal**: there is no surjection $\mathbb{N} \to
  \mathbb{R}$ (Lesson 07). Proved by contradiction.

## Check Your Understanding

:::widget type=numeric-input prompt="To prove '$P$' by contradiction, you assume..." answer=0 explain="$\\neg P$. Type 0 to indicate this conceptual answer.":::

:::widget type=numeric-input prompt="Suppose for contradiction that there are finitely many primes. Construct $N = p_1 p_2 \\cdots p_n + 1$. $N$ is divisible by which prime $p_i$?" answer=0 explain="None. None of $p_1, ..., p_n$ divide $N$ (each leaves remainder 1).":::

:::widget type=numeric-input prompt="Hence $N$ has a prime factor not in the list — contradicting 'all primes are listed.' (1 if valid.)" answer=1 explain="Valid — exactly Euclid's argument.":::

:::widget type=numeric-input prompt="Proof by contradiction is also called..." answer=0 explain="Reductio ad absurdum. Type 0.":::
