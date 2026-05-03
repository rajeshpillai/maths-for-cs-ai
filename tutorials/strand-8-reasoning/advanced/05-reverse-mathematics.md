---
strand: reasoning
level: advanced
order: 5
title: Reverse Mathematics
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 04-forcing-and-independence
    description: Forcing
connections:
  - strand-8-reasoning-advanced/06-realizability
applications:
  - cs: "Calibrating proof-theoretic strength of mathematical theorems"
  - life: "What's the *minimum* axiom strength needed?"
---

# Reverse Mathematics

## Mental

**Reverse mathematics** asks: for each ordinary mathematical theorem
$\phi$, what is the *weakest* axiom system in which $\phi$ is
provable?

The discovery: most theorems of analysis cluster around **five
canonical subsystems** of second-order arithmetic:

1. **RCA₀** (Recursive Comprehension Axiom) — base system, computable
   sets exist.
2. **WKL₀** (Weak König's Lemma) — every infinite binary tree has a
   path.
3. **ACA₀** (Arithmetic Comprehension Axiom) — sets defined by
   arithmetic formulae exist.
4. **ATR₀** (Arithmetic Transfinite Recursion).
5. **Π¹₁-CA₀** (Π¹₁ Comprehension).

These five form the **Big Five**.

## Why "reverse"?

To classify theorem $\phi$, prove **two things**:

- **Forward**: subsystem $S \vdash \phi$ — $\phi$ provable from $S$.
- **Reverse**: $S' \cup \phi \vdash S$ where $S'$ is a weaker base —
  $\phi$ proves $S$ over $S'$.

The reverse direction is the surprising part: the theorem itself
*implies* its supposed prerequisite.

## Worked example: WKL₀

**Weak König's Lemma**: every infinite binary tree has an infinite
path. Equivalent (over RCA₀) to:

- **Brouwer fixed-point theorem** in $\mathbb{R}^n$.
- **Hahn-Banach theorem** for separable Banach spaces.
- **Heine-Borel** for $[0, 1]$.
- **Existence of solutions** to ODEs (Peano's theorem).
- **Riemann integrability** of continuous functions.

These ostensibly very different theorems are *exactly equivalent*
in proof-theoretic strength.

## Calibrating ordinary mathematics

Most theorems of "everyday" math fall into one of the Big Five:

| Subsystem | Sample theorem |
|---|---|
| RCA₀ | Continuous functions on $\mathbb{R}$ are bounded on compact subsets |
| WKL₀ | Brouwer FP, Heine-Borel, Hahn-Banach |
| ACA₀ | Bolzano-Weierstrass, sequential compactness |
| ATR₀ | Comparability of well-orderings |
| Π¹₁-CA₀ | Cantor-Bendixson |

A neat empirical phenomenon: **classical math hits exactly these
five strength classes** — surprisingly few "in-between" cases.

## Interactive

:::widget type=numeric-input prompt="Big Five subsystems of second-order arithmetic. Number?" answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="Brouwer FP equivalent to WKL₀ over RCA₀. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ACA₀ corresponds to arithmetic comprehension. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reverse direction: theorem implies the axiom system. Type 1." answer=1 explain="Yes — surprising part.":::

## Symbolic

**Conservation theorems**: WKL₀ is $\Pi^1_1$-conservative over PRA
(primitive recursive arithmetic). So WKL₀ proves no new $\Pi^1_1$
arithmetic theorems beyond PRA.

**Hilbert's program** revisited: while ZFC's consistency is
unprovable in ZFC (Gödel), specific subsystems can be shown
*relatively* consistent or conservative — partial Hilbert program.

**Computability connection**: theorems' RM strength often correlates
with the *computability* of constructions implicit in their
statement. Lower-strength theorems have computable proofs.

## Computational

```python
# Reverse mathematics is meta-mathematical; here's a conceptual angle

# RCA_0: only computable sets exist
# WKL_0: trees with computable branching may have non-computable paths

def infinite_binary_tree():
    # Imagine a tree T given by a computable predicate
    # WKL says: there exists an infinite path
    # In RCA_0 alone: this path may be non-computable!
    pass

# Practical: Heine-Borel is equivalent to WKL_0
# i.e., from a computable open cover of [0, 1], extracting a
# finite subcover requires WKL_0 strength.

def heine_borel_finite_subcover(open_cover_of_unit_interval):
    # In RCA_0 + WKL_0, this is provable.
    # The "extraction" step is non-effective in general.
    pass

# In contrast, RCA_0 alone proves uniform continuity for
# computable continuous functions on [0, 1].
```

## Applied

- **Mathematical-logic foundations** — provides finer-grained map of
  proof-theoretic strength than ZFC vs sub-ZFC.
- **Computer-checked mathematics** — proof assistants can be
  configured to mirror RM subsystems.
- **Constructive mathematics** — RCA₀ is close to Bishop-style
  constructive analysis. RM clarifies which classical theorems are
  constructively provable.
- **Algorithmic mathematics** — RM strength predicts when "compute
  the witness" is possible for an existence theorem.

## Check Your Understanding

:::widget type=numeric-input prompt="Big Five reverse-mathematics subsystems. Type 5." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="WKL₀ equivalent to Brouwer FP over RCA₀. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reverse direction: theorem $\\to$ axiom system. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="RM connects to computability and constructive mathematics. Type 1." answer=1 explain="Yes.":::
