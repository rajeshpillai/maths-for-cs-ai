---
strand: reasoning
level: advanced
order: 3
title: Topos Theory — A Glimpse
prerequisites:
  - tier: strand-8-reasoning-advanced
    slug: 02-categorical-logic
    description: Categorical logic
connections:
  - strand-8-reasoning-advanced/04-forcing-and-independence
applications:
  - cs: "Foundations of higher-order programming language semantics"
  - life: "Generalised universes of mathematical reasoning"
---

# Topos Theory — A Glimpse

## Explain Like I Am 7

Imagine each math universe is a separate snow globe with its own
weather, its own clocks, and its own little "TRUE/FALSE" colour wheel
inside.  Our usual snow globe — the one full of plain old sets — is
just one of many.  A **topos** is one of those alternate snow
globes: the rules of logic still work, but maybe "true" comes in
shades, or stories about "now and later" are baked into the very
fabric.  Topos theory studies this whole shelf of math snow globes
together.

## Mental

A **topos** is a category that behaves like the category of sets:

- Has finite limits and colimits.
- Is Cartesian closed (exponentials).
- Has a **subobject classifier** $\Omega$ — a "truth value object."

Working in a topos, you can do mathematics that *generalises* set
theory: each topos has its own internal logic, often
**intuitionistic** (constructive).

## Examples of toposes

| Topos | Description |
|---|---|
| Set | classical sets and functions |
| Sh($X$) | sheaves on a topological space — "varying sets" |
| $G$-Set | sets with $G$-action — sets respecting symmetry |
| Effective topos | computable sets — internal logic = realizability |
| Smooth topos | spaces with infinitesimals — synthetic differential geometry |

## Subobject classifier

In Set, $\Omega = \{\bot, \top\}$ — the two truth values. In general
topos, $\Omega$ might have *more* truth values:

- In Sh($X$), $\Omega$ for an open set $U$ is the set of *open
  subsets* of $U$ — many "degrees of truth."
- In effective topos, $\Omega$ is constructed from recursion theory.

Subobjects of an object $A$ correspond to morphisms $A \to \Omega$ —
"characteristic functions."

## Internal logic

Each topos has an **internal language** — a higher-order logic
interpretable in that topos. For Set: classical logic. For most
others: intuitionistic logic.

Implication: a "constructive proof" in topos theory is one that
works in *every* topos with intuitionistic logic — extreme
generality.

## Worked example: Sh($\mathbb{R}$) sees varying truth

In sheaves on $\mathbb{R}$, "$x = 0$" is true on the open set
$\{0\}$ — but $\{0\}$ is **not open**. So in Sh($\mathbb{R}$), the
proposition "$x = 0$" is *not classically true*; it's true only "at"
the point.

Excluded middle (LEM) often fails: there's no open set on which
"$x \ne 0$ or $x = 0$" holds for all $x$ simultaneously.

This is **why** topoi naturally lead to constructive logic.

## Interactive

:::widget type=numeric-input prompt="Topos: Cartesian closed + subobject classifier + finite limits. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In Set, subobject classifier $\\Omega = ?$ — number of truth values." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Most non-Set toposes have intuitionistic internal logic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Effective topos models computable / recursive mathematics. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Grothendieck topology / sheaves**: sheaves are presheaves
satisfying gluing — local data uniquely combines.

**Geometric morphisms**: morphisms between toposes that preserve
structure. Allow "moving" theorems between mathematical universes.

**Topos-theoretic forcing**: Cohen's forcing technique can be
described topos-theoretically — Boolean-valued models give
independence proofs.

**Mitchell-Bénabou language**: the formal internal language of
elementary toposes — higher-order intuitionistic type theory.

## Computational

```python
# Toposes are abstract; here we illustrate "varying truth" idea

# Subobject classifier in Set
class Set_Topos:
    Omega = {False, True}

# In Sh(R), characteristic of "x is in U" varies with stalks
# Schematic representation
class Sheaf:
    def __init__(self, stalks):
        self.stalks = stalks   # function: open set -> set

# Characteristic of {0}: True at 0, False elsewhere
char_zero = lambda x: x == 0
print(char_zero(0))           # True
print(char_zero(1))           # False — but in Sh, {0} isn't open

# Effective topos: only computable predicates
# Halting predicate is not in any "set" of the effective topos
def halts(program, input):
    raise NotImplementedError("Undecidable")

# So in effective topos, classical reasoning over all programs fails
```

## Applied

- **Foundations of mathematics** — topos theory provides alternatives
  to ZFC; some mathematicians work in elementary toposes.
- **Quantum logic** — quantum events naturally form a topos with
  non-classical logic.
- **Synthetic differential geometry** — uses toposes with
  infinitesimals to *prove* classical differential-geometry theorems.
- **Programming language semantics** — denotational semantics of
  higher-order programs uses topos-theoretic structure.
- **Categorical models of dependent types** — Hyperdoctrines, fibrations
  generalise topos theory for dependent type theory.

## Check Your Understanding

:::widget type=numeric-input prompt="Topos generalises Set. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Most toposes have intuitionistic internal logic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Subobject classifier $\\Omega$ generalises {True, False}. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Synthetic differential geometry uses toposes with infinitesimals. Type 1." answer=1 explain="Yes.":::
