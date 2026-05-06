---
strand: reasoning
level: foundation
order: 3
title: Functions and Relations
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 02-sets-introduction
    description: Sets
connections:
  - strand-8-reasoning-foundation/04-direct-proof
applications:
  - cs: "Function definitions, type signatures, hash maps"
  - business: "Mapping customers to segments, products to prices"
  - games: "State transitions, NPC behavior maps"
  - life: "Day-of-week from date, taxes from income"
---

# Functions and Relations

## Explain Like I Am 7

A **function** is a juice machine: drop one apple in, get exactly one
glass of apple juice out.  Drop the same apple in tomorrow, you'll get
the same juice — never two different glasses for the same fruit.  A
**relation** is more relaxed: it's just a guest list of pairs, and
the same fruit might be paired with several glasses, or none at all.
Functions are the strict ones; relations are their easy-going cousins
who allow any matchup at all.

## Mental

A **function** $f: A \to B$ assigns to each $a \in A$ exactly one
$b \in B$. $A$ is the **domain**; $B$ the **codomain**.

The set of values actually hit is the **image** (or **range**):
$f(A) = \{f(a) : a \in A\} \subseteq B$.

Three special properties:

- **Injective** (one-to-one): different inputs give different
  outputs. $a_1 \ne a_2 \Rightarrow f(a_1) \ne f(a_2)$.
- **Surjective** (onto): every $b \in B$ is hit. $\forall b \in B, \exists a \in A: f(a) = b$.
- **Bijective**: both injective and surjective. Has a two-sided
  inverse $f^{-1}: B \to A$.

The bijection is the structure that allows **counting equivalence**
(Strand 1 Lesson 00 onward — one-to-one matching).

## Relations

A **relation** $R$ on $A \times B$ is just a subset of $A \times B$ —
pairs $(a, b)$ that are "related." A function is a special relation
where each $a$ maps to exactly one $b$.

Examples of non-function relations:

- "$x < y$" on integers: many $y$ for each $x$.
- "$y = \sqrt x$": two $y$ for positive $x$ (so not a function in
  the strict sense without specifying $\pm$).

## Interactive

:::widget type=numeric-input prompt="$f: \\{1, 2, 3\\} \\to \\{a, b\\}$. Maximum number of distinct functions? Each input has 2 choices: $2^3 = ?$" answer=8 explain="$8$ — each of 3 inputs picks one of 2 outputs.":::

:::widget type=numeric-input prompt="Is $f(x) = x^2$ from $\\mathbb{R} \\to \\mathbb{R}$ injective?" answer=0 explain="No — $f(1) = f(-1) = 1$.":::

:::widget type=numeric-input prompt="Is $f(x) = x^2$ from $\\mathbb{R}_{\\ge 0} \\to \\mathbb{R}_{\\ge 0}$ injective?" answer=1 explain="Yes — restricted to non-negatives, distinct inputs give distinct outputs.":::

:::widget type=numeric-input prompt="Is $f(x) = x^2$ from $\\mathbb{R}_{\\ge 0} \\to \\mathbb{R}_{\\ge 0}$ also surjective?" answer=1 explain="Yes — every non-negative real has a non-negative square root preimage.":::

## Symbolic

A **function** $f: A \to B$ satisfies $\forall a \in A, \exists ! b \in B, f(a) = b$ (each input has exactly one output).

**Composition**: $(g \circ f)(x) = g(f(x))$. Domain: where $f$ is
defined and $f(x)$ is in $g$'s domain.

**Inverse**: $f^{-1} \circ f = \text{id}_A$ and $f \circ f^{-1} =
\text{id}_B$. Exists iff $f$ is bijective.

## Computational

```python
# Functions in Python are first-class
def f(x):
    return x ** 2

print(f(3))   # 9

# Composition
def compose(g, f):
    return lambda x: g(f(x))

square_then_add = compose(lambda y: y + 1, f)
print(square_then_add(3))   # 10
```

## Applied

- **Hash tables**: map keys to values via a hash function. Collisions
  arise because the function isn't injective on key space.
- **Type signatures**: a function `int -> str` is a function
  $\mathbb{Z} \to \text{strings}$.
- **Random number generators**: should approximately bijection
  (uniform distribution over output space).

## Check Your Understanding

:::widget type=numeric-input prompt="Number of functions from $\\{a, b, c, d\\} \\to \\{0, 1\\}$?" answer=16 explain="$2^4 = 16$.":::

:::widget type=numeric-input prompt="Number of bijections from a $4$-set to itself? (Permutations.)" answer=24 explain="$4! = 24$.":::

:::widget type=numeric-input prompt="$f(x) = x + 1$ from $\\mathbb{Z} \\to \\mathbb{Z}$. Bijection? (1 yes, 0 no.)" answer=1 explain="Yes — distinct inputs give distinct outputs (injective), and every integer is hit (surjective).":::

:::widget type=numeric-input prompt="$f(x) = 2x$ from $\\mathbb{Z} \\to \\mathbb{Z}$. Surjective? (Even numbers only get hit.)" answer=0 explain="Not surjective — odd integers not in image.":::
