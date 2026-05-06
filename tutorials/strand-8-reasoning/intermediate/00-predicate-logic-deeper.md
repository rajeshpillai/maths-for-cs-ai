---
strand: reasoning
level: intermediate
order: 0
title: Predicate Logic in Depth
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 09-reasoning-capstone
    description: Foundation reasoning capstone
connections:
  - strand-8-reasoning-intermediate/01-zfc-axioms
applications:
  - cs: "Specification languages (TLA+, Coq), database queries (SQL EXISTS / ALL)"
  - life: "Saying *exactly* what you mean about 'all' and 'some'"
---

# Predicate Logic in Depth

## Explain Like I Am 7

Plain logic talks about whole sentences in one gulp.  **Predicate**
logic zooms in to talk about *people* and *things* doing *stuff*:
"Maya likes broccoli," "Sam is taller than Maya."  Now we can stack
the *for-all* and *there-exists* badges in different orders, and the
order really matters: "*every* lock has *some* key that opens it" is
nice, but "there's *one* key that opens *every* lock" is the kind of
master key a sneaky burglar dreams about.  Same words, very different
worlds.

## Mental

Foundation logic dealt with **propositions** ("$P$ is true / false")
and the connectives $\land, \lor, \lnot, \to, \leftrightarrow$.
Predicate logic adds **quantifiers** $\forall$ ("for all") and
$\exists$ ("there exists") that operate on **predicates**
$P(x), Q(x, y), \ldots$ — statements containing variables.

The interesting power: nested quantifiers express subtle
mathematical claims that propositional logic cannot.

## Order of quantifiers matters

Compare:

- **A**: $\forall x \, \exists y : x + y = 0$.
  ("For every $x$, *some* $y$ exists with $x + y = 0$.") **True**
  over $\mathbb{Z}$ — pick $y = -x$.

- **B**: $\exists y \, \forall x : x + y = 0$.
  ("Some $y$ works for every $x$.") **False** — no single $y$ is
  the additive inverse of every $x$.

The quantifier order **changes the meaning entirely**. The same
order rule appears whenever you read $\forall \epsilon \exists \delta$
(continuity) versus $\exists \delta \forall \epsilon$ (uniform
continuity).

## Negating quantifiers

Two **De Morgan-style** rules govern negation:

$$
\lnot (\forall x \; P(x)) \equiv \exists x \, \lnot P(x).
$$

$$
\lnot (\exists x \; P(x)) \equiv \forall x \, \lnot P(x).
$$

To negate "$\forall x \, \exists y \; P(x, y)$":

$$
\lnot (\forall x \, \exists y \; P) \equiv \exists x \, \forall y \; \lnot P.
$$

Each $\forall$ flips to $\exists$ and vice versa as the negation
moves inward.

## Bound vs free variables

In $\forall x : x + 1 > 0$ the $x$ is **bound** by the quantifier —
the formula is a closed statement (no free variables).
In $x + 1 > 0$ the $x$ is **free** — the formula's truth depends on
what $x$ stands for.

Renaming bound variables ($\alpha$-conversion) doesn't change
meaning; renaming free variables does.

## Interactive

:::widget type=numeric-input prompt="$\\forall x \\in \\mathbb{R}: x^2 \\ge 0$. True (1) or false (0)?" answer=1 explain="True.":::

:::widget type=numeric-input prompt="$\\exists x \\in \\mathbb{R}: x^2 < 0$. True (1) or false (0)?" answer=0 explain="False.":::

:::widget type=numeric-input prompt="Negate '$\\forall x \\, \\exists y: x = y$'. Result: $\\exists x \\, \\forall y : x \\ne y$. Type 1 if correct." answer=1 explain="Yes — $\\forall \\to \\exists$, $\\exists \\to \\forall$, predicate negated.":::

:::widget type=numeric-input prompt="$\\forall x \\, \\exists y : y > x$ over $\\mathbb{R}$. True (1) or false (0)?" answer=1 explain="True — pick $y = x + 1$.":::

## Symbolic

**Universal instantiation**: from $\forall x \; P(x)$ infer $P(c)$ for
any specific $c$ in the domain.

**Existential instantiation**: from $\exists x \; P(x)$ infer
$P(c)$ for *some* fresh $c$ — but you cannot reuse $c$ in
unrelated contexts.

**Universal generalisation**: if $P(c)$ is provable for an
*arbitrary* $c$, conclude $\forall x \; P(x)$.

**Existential generalisation**: from $P(c)$ infer $\exists x \; P(x)$.

These four rules form the deductive engine of predicate calculus.

**Skolem normal form**: every formula can be put in prenex form
(all quantifiers at the front) and existentials replaced by
**Skolem functions**. Used by automated theorem provers.

## Computational

```python
# Quantifier checks over a finite domain
domain = list(range(-5, 6))

def for_all(P, dom):
    return all(P(x) for x in dom)

def there_exists(P, dom):
    return any(P(x) for x in dom)

print(for_all(lambda x: x**2 >= 0, domain))            # True
print(there_exists(lambda x: x**2 == 16, domain))      # True

# Nested quantifier: forall x, exists y in domain with x + y = 0
print(for_all(lambda x: there_exists(lambda y, x=x: x + y == 0, domain),
              domain))                                  # True
```

This brute-force check is what model-checkers do for finite-state
systems.

## Applied

- **TLA+ and Coq** — specification and proof tools for distributed
  systems and protocol verification, written in extended predicate
  logic.
- **SQL** — `EXISTS`, `ALL`, `ANY`/`SOME` are quantifiers over result
  sets. "Find every department where every employee earns over 50k"
  is a nested $\forall \forall$ query.
- **Knowledge representation in AI** — first-order logic and its
  modal extensions underlie semantic-web reasoning (OWL, RDF).
- **Continuity in calculus** — "$\forall \epsilon > 0 \, \exists \delta > 0: |x - a| < \delta \Rightarrow |f(x) - f(a)| < \epsilon$"
  is exactly a quantifier-nesting choice.

## Check Your Understanding

:::widget type=numeric-input prompt="Negate '$\\exists x: P(x)$'. The negation is $\\forall x: \\lnot P(x)$. Type 1 if correct." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\forall x \\in \\mathbb{N}: \\exists y \\in \\mathbb{N}: y > x$. True (1)?" answer=1 explain="Yes — $y = x + 1$.":::

:::widget type=numeric-input prompt="$\\exists y \\in \\mathbb{N}: \\forall x \\in \\mathbb{N}: y > x$. True (1) or false (0)?" answer=0 explain="False — no largest natural.":::

:::widget type=numeric-input prompt="In '$\\forall x : x > 0$', is $x$ bound (1) or free (0)?" answer=1 explain="Bound by $\\forall$.":::
