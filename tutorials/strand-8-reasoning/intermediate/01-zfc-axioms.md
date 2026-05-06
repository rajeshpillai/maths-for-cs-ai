---
strand: reasoning
level: intermediate
order: 1
title: ZFC Set-Theory Axioms
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 00-predicate-logic-deeper
    description: Predicate logic in depth
connections:
  - strand-8-reasoning-intermediate/02-equivalence-revisit
applications:
  - cs: "Type theory, formal verification, foundations of mathematics in proof assistants"
  - life: "What are sets, *exactly*? The rules everyone agreed to play by."
---

# ZFC Set-Theory Axioms

## Explain Like I Am 7

Imagine starting a board game and writing down a small list of rules
that everybody must obey when making new game pieces: "two boxes are
the same if they hold the same toys," "you can scoop a corner of any
box into a new box," "there's an empty box."  These rules are tiny,
but every other piece in the game has to be built using *only* them.
**ZFC** is exactly that small rule list — the agreed-upon house rules
that mathematicians use to build every set, every number, and every
shape on top.

## Mental

Naive set theory says "a set is a collection." That hits **Russell's
paradox**: the set $R = \{x : x \notin x\}$ — does $R \in R$? If
yes, by definition no. If no, by definition yes. Contradiction.

The fix (Zermelo, Fraenkel, with **C** for *Choice*) is to specify
**axioms** that govern what sets can exist. ZFC has been the working
foundation of mathematics for a century.

## The axioms (informal)

1. **Extensionality** — two sets with the same members are equal.
   $\forall A, B: (\forall x: x \in A \leftrightarrow x \in B) \Rightarrow A = B$.

2. **Empty set** — there exists a set with no members. Written $\emptyset$.

3. **Pairing** — for any $a, b$ there's a set $\{a, b\}$.

4. **Union** — for any set $S$ there's a set $\bigcup S$ whose
   members are exactly the members of members of $S$.

5. **Power set** — for any set $S$ there's a set $\mathcal{P}(S)$
   whose members are exactly the subsets of $S$.

6. **Infinity** — there exists an infinite inductive set
   (containing $\emptyset$ and closed under $x \mapsto x \cup \{x\}$).

7. **Schema of separation** — given any set $A$ and predicate $P$,
   there's a set $\{x \in A : P(x)\}$. (No "set of all sets that
   satisfy $P$" — must restrict to an existing set.)

8. **Schema of replacement** — image of a set under a definable
   function is a set.

9. **Foundation** (regularity) — every non-empty set has a
   $\in$-minimal element. Forbids $x \in x$ and infinite descending
   chains $\ldots \in x_2 \in x_1 \in x_0$.

10. **Choice** (the C in ZFC) — for any collection of non-empty sets
    there's a function picking one element from each.

## Russell averted

Schema of separation requires the predicate to operate **inside an
existing set $A$**. So $\{x \in A : x \notin x\}$ is fine — but the
unrestricted $\{x : x \notin x\}$ over "all things" is not even a
ZFC term. Russell's set is not a set in ZFC.

## Interactive

:::widget type=numeric-input prompt="Russell's $R = \\{x : x \\notin x\\}$ leads to: $R \\in R \\leftrightarrow R \\notin R$ — paradox. Type 1 if this is a real paradox in naive set theory." answer=1 explain="Yes — the paradox is genuine, and ZFC blocks it.":::

:::widget type=numeric-input prompt="$|\\mathcal{P}(\\{a, b, c\\})| = ?$ (power set of a 3-element set)" answer=8 explain="$2^3 = 8$.":::

:::widget type=numeric-input prompt="Extensionality: two sets are equal if and only if they have the same members. So $\\{1, 2\\} = \\{2, 1\\}$. Type 1 if true." answer=1 explain="Yes — order doesn't matter.":::

:::widget type=numeric-input prompt="By foundation, can $x \\in x$ ever hold? Type 1 for never, 0 for sometimes." answer=1 explain="Never — foundation forbids it.":::

## Symbolic

**Axiom of Choice** — equivalent statements (all provably equal in
ZF):

- Every Cartesian product of non-empty sets is non-empty.
- Every set has a well-ordering.
- Zorn's lemma — a partial order in which every chain has an upper
  bound has a maximal element.

Zorn's lemma is how AC enters proofs in algebra (every vector
space has a basis, every ring with $1$ has a maximal ideal).

**Cumulative hierarchy**: $V_0 = \emptyset$, $V_{\alpha + 1} = \mathcal{P}(V_\alpha)$,
$V_\lambda = \bigcup_{\beta < \lambda} V_\beta$ at limit ordinals.
The "universe of sets" is $V = \bigcup_\alpha V_\alpha$.

## Computational

```python
# Russell's paradox illustrated in pseudo-Python
class NaiveSet:
    def __init__(self, predicate):
        self.predicate = predicate
    def contains(self, x):
        return self.predicate(x)

# R = {x : not x.contains(x)}
# R.contains(R) == not R.contains(R) — paradox

# In ZFC, separation requires a host set:
def separation(A, predicate):
    return {x for x in A if predicate(x)}

# Safe: works because the host set exists
A = {1, 2, 3, 4, 5}
print(separation(A, lambda x: x % 2 == 0))    # {2, 4}
```

## Applied

- **Proof assistants** like Coq, Lean, and Isabelle implement type
  theory or higher-order logic on top of ZFC-equivalent foundations.
- **Set-theoretic types in programming**: discriminated unions,
  product types, dependent types — formal echoes of pairing,
  product, separation.
- **Database theory**: relational algebra is set-theoretic; query
  optimization rests on set-equational reasoning.
- **Foundations of probability**: probability spaces $(\Omega, \mathcal{F}, P)$
  use the ZFC notion of set.

## Check Your Understanding

:::widget type=numeric-input prompt="ZFC has 10 (counting schemas as one) widely-cited axioms. Number?" answer=10 explain="$10$ — give or take how you count schemas.":::

:::widget type=numeric-input prompt="The C in ZFC stands for Choice. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Naive set theory has Russell's paradox. ZFC blocks it via *separation* (must restrict to an existing set). Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$|\\mathcal{P}(\\emptyset)| = ?$" answer=1 explain="$2^0 = 1$ — just the empty set itself.":::
