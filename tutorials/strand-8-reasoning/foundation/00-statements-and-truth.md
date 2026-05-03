---
strand: reasoning
level: foundation
order: 0
title: Statements and Truth Values
prerequisites: []
connections:
  - strand-8-reasoning-foundation/01-logical-connectives
applications:
  - cs: "Boolean logic in code, conditional statements"
  - business: "Decision trees, requirement specs"
  - games: "Game-state predicates, win/loss conditions"
  - life: "Reasoning about claims and arguments"
---

# Statements and Truth Values

## Mental

Logic is the **calculus of true and false**. The basic unit is the
**statement** (or **proposition**) — a sentence that is either true
or false but **not both**.

Examples:

- "$2 + 2 = 4$." (True.)
- "Paris is in Germany." (False.)
- "The square root of $2$ is rational." (False.)
- "It will rain tomorrow." (Either; this is a forecast, not a
  current-fact statement.)

Non-statements:

- "What time is it?" (A question — no truth value.)
- "Close the door." (A command.)
- "$x + 1 = 3$." (Depends on $x$. An **open sentence** — needs $x$
  specified.)

For each statement $P$, we write $T(P) = $ true or $F(P) = $ false.
Two truth values; binary system.

## Notational shortcut

In propositional logic, statements get **letters**: $P, Q, R, \ldots$

- $P$: "It is raining."
- $Q$: "I have an umbrella."

**Compound statements** are built from these via **connectives**
(Lesson 01): "and," "or," "not," "if-then." For example:

> "If it is raining and I don't have an umbrella, then I will get
> wet."

In symbols: $(P \wedge \neg Q) \to R$.

The **logical structure** matters more than the specific topic.

## Interactive

:::widget type=numeric-input prompt="Is '$3 + 5 = 8$' a statement? (1 yes, 0 no.)" answer=1 explain="Yes — true.":::

:::widget type=numeric-input prompt="Is '$x^2 = 4$' a statement? (Depends on $x$.)" answer=0 explain="No — open sentence.":::

:::widget type=numeric-input prompt="Is 'this sentence is false' a statement? (Famous paradox.)" answer=0 explain="No — self-reference creates a logical paradox. It can't be true (would make it false) or false (would make it true).":::

:::widget type=numeric-input prompt="Is '$\\sqrt 2 \\notin \\mathbb{Q}$' a statement? (1 yes, 0 no.)" answer=1 explain="Yes, and it is true (Strand 1 Intermediate Lesson 07's irrationality of $\\sqrt 2$).":::

## Symbolic

A **proposition** has truth value $\in \{T, F\}$ (or equivalently $\{1,
0\}$).

Three classical principles of logic:

1. **Law of identity**: $P \iff P$.
2. **Law of non-contradiction**: $\neg(P \wedge \neg P)$ — nothing is
   both true and false.
3. **Law of excluded middle**: $P \vee \neg P$ — every statement is
   either true or false.

These are taken as axioms in classical logic. (Some non-classical
logics, like intuitionistic logic, drop excluded middle — Strand 8
Advanced.)

## Computational

```python
# Boolean values in Python
P = True
Q = False

print(P)            # True
print(not P)        # False
print(P and Q)      # False
print(P or Q)       # True
```

Most programming languages have a **Boolean** type — a direct
implementation of statement truth values. Conditional statements (`if
P:`) branch based on truth.

## Applied

- **Code logic**: every `if` statement, loop condition, and assertion
  is a logical statement.
- **Database queries**: `WHERE x > 5 AND y = "abc"` is a compound
  predicate.
- **Hardware**: every digital circuit is a network of AND, OR, NOT
  gates implementing logical statements.

## Check Your Understanding

:::widget type=numeric-input prompt="'It is raining' as a statement: assigns it a truth value either true or false. How many possible values?" answer=2 explain="Two: true or false. Binary classical logic.":::

:::widget type=numeric-input prompt="Is '$5 > 3$' a statement? (1 yes, 0 no.)" answer=1 explain="Yes — true.":::

:::widget type=numeric-input prompt="Is 'paint the wall' a statement? (Command.)" answer=0 explain="No — imperative, not declarative.":::

:::widget type=numeric-input prompt="Number of distinct truth values in classical logic?" answer=2 explain="Two — true, false.":::
