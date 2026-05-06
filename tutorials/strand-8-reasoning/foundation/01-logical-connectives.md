---
strand: reasoning
level: foundation
order: 1
title: Logical Connectives and Truth Tables
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 00-statements-and-truth
    description: Statements and truth
connections:
  - strand-8-reasoning-foundation/02-sets-introduction
applications:
  - cs: "Boolean expressions, circuit design"
  - business: "Decision logic, rules engines"
  - games: "AI behavior trees"
  - life: "Combining conditions in everyday reasoning"
---

# Logical Connectives and Truth Tables

## Explain Like I Am 7

Take two little green-or-red bricks (each marked TRUE or FALSE) and
glue them with one of these words: *and*, *or*, *not*, *if-then*.
The glued brick gets a brand-new green-or-red colour decided by a
fixed rule.  *AND* only goes green if **both** bricks are green; *OR*
goes green if **at least one** is.  A **truth table** is just the
recipe card listing every possible pair of brick colours and the
colour the glued brick comes out — no guessing, just pure
look-it-up.

## Mental

Five **connectives** combine statements into compound statements.

| Symbol | Name | English |
|---|---|---|
| $\neg$ | Negation | "not" |
| $\wedge$ | Conjunction | "and" |
| $\vee$ | Disjunction | "or" (inclusive) |
| $\to$ | Implication | "if-then" |
| $\leftrightarrow$ | Biconditional | "if and only if" |

A **truth table** lists all combinations of input truth values and
the resulting compound truth value.

## The five connectives

**Negation** $\neg P$: opposite truth value.

| $P$ | $\neg P$ |
|---|---|
| T | F |
| F | T |

**Conjunction** $P \wedge Q$: true iff both true.

| $P$ | $Q$ | $P \wedge Q$ |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

**Disjunction** $P \vee Q$: true iff at least one true (inclusive
OR).

| $P$ | $Q$ | $P \vee Q$ |
|---|---|---|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

**Implication** $P \to Q$: false only when $P$ true and $Q$ false.

| $P$ | $Q$ | $P \to Q$ |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

A common confusion: when $P$ is false, $P \to Q$ is **automatically
true** ("vacuous truth"). "If pigs fly, then the moon is cheese" is
true: pigs don't fly, so the implication holds vacuously.

**Biconditional** $P \leftrightarrow Q$: true iff $P, Q$ have same
truth value.

| $P$ | $Q$ | $P \leftrightarrow Q$ |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | T |

## Interactive

:::widget type=numeric-input prompt="$T \\wedge F = ?$ (1 for T, 0 for F.)" answer=0 explain="And requires both true.":::

:::widget type=numeric-input prompt="$T \\vee F = ?$" answer=1 explain="Or requires at least one true.":::

:::widget type=numeric-input prompt="$F \\to T = ?$" answer=1 explain="Implication is false only when $P$ true, $Q$ false. $F \\to$ anything is true.":::

:::widget type=numeric-input prompt="$T \\to F = ?$" answer=0 explain="The only false case for implication.":::

:::widget type=numeric-input prompt="$T \\leftrightarrow F = ?$" answer=0 explain="Biconditional false when truth values differ.":::

## Symbolic

**De Morgan's laws** (very important):

$$
\neg(P \wedge Q) \equiv \neg P \vee \neg Q,
$$

$$
\neg(P \vee Q) \equiv \neg P \wedge \neg Q.
$$

(Negation distributes over $\wedge$ and $\vee$, swapping them.)

**Implication's contrapositive**:

$$
P \to Q \equiv \neg Q \to \neg P.
$$

The same statement, rephrased.

**Implication via OR**:

$$
P \to Q \equiv \neg P \vee Q.
$$

Useful for simplifying logical expressions.

## Computational

```python
# Python uses 'and', 'or', 'not'
P, Q = True, False

print(not P)              # False
print(P and Q)            # False
print(P or Q)             # True
# Python doesn't have a built-in implication; emulate:
def implies(a, b): return (not a) or b
print(implies(P, Q))      # False
print(implies(Q, P))      # True

# Generate full truth tables
from itertools import product
for p, q in product([True, False], repeat=2):
    print(f"P={p}, Q={q}, P→Q={implies(p, q)}")
```

## Applied

- **Boolean expressions in code**: every conditional uses these.
- **Digital circuit design**: AND/OR/NOT gates implement truth-table
  logic.
- **SQL queries**: `WHERE` clauses combine predicates.
- **Mathematical proofs**: chains of implications.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\neg(T \\wedge T) = ?$" answer=0 explain="$T \\wedge T = T$, negation $F = 0$.":::

:::widget type=numeric-input prompt="$F \\to F = ?$" answer=1 explain="Vacuously true.":::

:::widget type=numeric-input prompt="$\\neg P \\vee Q$ — equivalent to which connective?" answer=0 explain="$P \\to Q$. Type 0 to indicate this conceptual answer.":::

:::widget type=numeric-input prompt="By De Morgan: $\\neg(P \\wedge Q) = \\neg P \\vee \\neg Q$. With $P = T, Q = F$, both sides? Type LHS." answer=1 explain="$\\neg(T \\wedge F) = \\neg F = T = 1$. RHS: $F \\vee T = T = 1$. Equal.":::
