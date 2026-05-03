---
strand: reasoning
level: foundation
order: 8
title: Quantifiers — For All and There Exists
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 01-logical-connectives
    description: Logical connectives
connections:
  - strand-8-reasoning-foundation/09-reasoning-capstone
applications:
  - cs: "Formal specification, type theory, theorem proving"
  - life: "Distinguishing 'all' vs 'some' claims"
---

# Quantifiers — For All and There Exists

## Mental

Two **quantifiers** turn open sentences into statements:

- **Universal** $\forall$: "for all."
- **Existential** $\exists$: "there exists."

Examples:

- $\forall n \in \mathbb{N}: n^2 \ge 0$. ("Every natural number's
  square is non-negative.")
- $\exists n \in \mathbb{N}: n^2 = 16$. ("Some natural number
  squares to $16$" — namely, $4$.)
- $\forall n \in \mathbb{N}, \exists m \in \mathbb{N}: m = n + 1$.
  ("For every $n$, there's a successor $m$.")

Quantifiers must specify a **domain** ($\mathbb{N}, \mathbb{R}$, etc.).
The truth of a quantified statement depends on it.

## Negation

The most useful identity:

$$
\neg (\forall x: P(x)) \equiv \exists x: \neg P(x).
$$

$$
\neg (\exists x: P(x)) \equiv \forall x: \neg P(x).
$$

In words: "not every X is P" means "some X is not P." "Not any X is
P" means "every X is not P."

These are **De Morgan for quantifiers**.

## Order matters

$\forall x, \exists y: P(x, y)$ vs $\exists y, \forall x: P(x, y)$ —
**different statements**.

Example:
- "For every person $x$, there exists a parent $y$ of $x$" — a fact.
- "There exists a person $y$ who is parent of every $x$" — false
  (no universal parent).

The order of quantifiers is meaningful.

## Interactive

:::widget type=numeric-input prompt="$\\forall n \\in \\mathbb{N}: n + 1 > n$. True (1) or false (0)?" answer=1 explain="Always true.":::

:::widget type=numeric-input prompt="$\\exists n \\in \\mathbb{N}: n^2 = 7$. True or false?" answer=0 explain="No natural number squares to 7. False.":::

:::widget type=numeric-input prompt="$\\forall x \\in \\mathbb{R}: x^2 \\ge 0$. True or false?" answer=1 explain="True — squares are non-negative.":::

:::widget type=numeric-input prompt="Negate $\\forall n: n > 0$. (Type 1 for $\\exists n: n \\le 0$, 0 otherwise.)" answer=1 explain="Yes.":::

## Symbolic

**Universal**: $\forall x \in S: P(x)$ — "for every $x$ in $S$,
$P(x)$ is true."

**Existential**: $\exists x \in S: P(x)$ — "there exists $x$ in $S$
with $P(x)$ true."

**Negation laws**:

$$
\neg \forall x: P \equiv \exists x: \neg P,
$$

$$
\neg \exists x: P \equiv \forall x: \neg P.
$$

**Empty domain conventions**: $\forall x \in \varnothing: P(x)$ is
**vacuously true**. $\exists x \in \varnothing: P(x)$ is false.

## Computational

```python
# Python's all() and any()
nums = [1, 2, 3, 4, 5]
print(all(n > 0 for n in nums))    # True (∀)
print(any(n > 4 for n in nums))    # True (∃)
print(all(n > 4 for n in nums))    # False
print(any(n > 100 for n in nums))  # False

# Negation
print(not all(n > 4 for n in nums))   # True — some n is ≤ 4
print(any(n <= 4 for n in nums))      # True — same statement, restated
```

## Applied

- **Type theory**: dependent types use quantifiers (e.g., "for every
  $n$, there's a vector of length $n$").
- **Formal verification**: program properties as quantified
  statements over inputs.
- **Theorem provers** (Coq, Lean): quantifiers are first-class.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\forall x \\in \\mathbb{R}: x^2 \\ge x$. True for $x \\ge 1$ and $x \\le 0$, false for $0 < x < 1$. Overall true (1) or false (0)?" answer=0 explain="False — counterexample $x = 0.5$.":::

:::widget type=numeric-input prompt="$\\exists x \\in \\mathbb{R}: x^2 = 2$. True (1) or false (0)?" answer=1 explain="$\\sqrt 2$ exists in $\\mathbb{R}$.":::

:::widget type=numeric-input prompt="The negation of '$\\forall x: x > 0$' is '$\\exists x: x \\le 0$.' True (1) or false (0)?" answer=1 explain="Correct negation.":::

:::widget type=numeric-input prompt="$\\forall n \\in \\varnothing: P(n)$ — for any $P$. (Vacuously) true or false?" answer=1 explain="Vacuously true.":::
