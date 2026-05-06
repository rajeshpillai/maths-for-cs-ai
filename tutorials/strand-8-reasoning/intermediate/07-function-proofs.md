---
strand: reasoning
level: intermediate
order: 7
title: Proofs about Functions
prerequisites:
  - tier: strand-8-reasoning-intermediate
    slug: 06-russell-paradox
    description: Russell's paradox
connections:
  - strand-8-reasoning-intermediate/08-structural-induction
applications:
  - cs: "Type-system soundness, hash-function collisions, formal verification"
  - life: "Proving 'every input maps to a unique output'"
---

# Proofs about Functions

## Explain Like I Am 7

Picture a juice machine again.  Three things you might want to prove
about it: (1) two different fruits *never* squeeze into the exact
same juice — that's "one-to-one"; (2) every juice on the menu *can*
be made by some fruit — that's "onto"; (3) both at once, so the
machine is a perfect pairing of fruits and juices.  Each property has
its own little proof recipe — pick two fruits and chase the juices, or
pick a juice and hunt for the fruit.  Same machine, different
questions.

## Mental

Three properties of a function $f : A \to B$ matter:

- **Injective** (one-to-one): $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$.
- **Surjective** (onto): $\forall b \in B \, \exists a \in A : f(a) = b$.
- **Bijective**: both injective and surjective.

Each leads to a standard **proof template**.

## Injectivity proof template

To prove $f$ injective:

1. Take *arbitrary* $a_1, a_2 \in A$ with $f(a_1) = f(a_2)$.
2. Reason algebraically until you derive $a_1 = a_2$.

**Example**. $f : \mathbb{R} \to \mathbb{R}, f(x) = 3x + 7$.

Suppose $3 a_1 + 7 = 3 a_2 + 7$. Subtract $7$, divide by $3$ — done.
$a_1 = a_2$. ✓

## Surjectivity proof template

To prove $f : A \to B$ surjective:

1. Take *arbitrary* $b \in B$.
2. **Construct** an $a \in A$ with $f(a) = b$.

**Example** (same $f$). Given $b \in \mathbb{R}$, set $a = (b - 7)/3$.
Then $f(a) = 3 \cdot (b-7)/3 + 7 = b$. ✓

## Counter-examples

To show $f$ is **not** injective: produce $a_1 \ne a_2$ with
$f(a_1) = f(a_2)$.

To show $f$ is **not** surjective: produce $b \in B$ with no
preimage, by contradiction (assume $f(a) = b$, derive impossibility).

**Example**. $g(x) = x^2$ on $\mathbb{R}$ is not injective: $g(2) = g(-2) = 4$.
Not surjective: no real $a$ with $a^2 = -1$.

## Interactive

:::widget type=numeric-input prompt="$f(x) = 2x + 1$ on $\\mathbb{R}$. Injective? Type 1." answer=1 explain="Linear with non-zero slope is always injective on $\\mathbb{R}$.":::

:::widget type=numeric-input prompt="$f(x) = x^3$ on $\\mathbb{R}$. Injective? Type 1." answer=1 explain="Strictly increasing — injective.":::

:::widget type=numeric-input prompt="$f(x) = x^2$ on $\\mathbb{R}$. Surjective onto $\\mathbb{R}$? Type 0." answer=0 explain="No — image is $[0, \\infty)$.":::

:::widget type=numeric-input prompt="$f(x) = e^x$. Injective onto $(0, \\infty)$ and bijective onto $(0, \\infty)$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Composition**:

- Injective $\circ$ injective = injective.
- Surjective $\circ$ surjective = surjective.
- Bijective $\circ$ bijective = bijective.

**Inverse**: $f$ is bijective iff there's a (unique) $g : B \to A$
with $g \circ f = \mathrm{id}_A$ and $f \circ g = \mathrm{id}_B$. We
write $g = f^{-1}$.

**Pigeonhole and finite injections**: if $|A| > |B|$, no $f : A \to B$
is injective. Direct corollary of counting; underlies hash collisions
and birthday-paradox calculations.

**Cardinality classification**:

- $f : A \to B$ injective $\iff |A| \le |B|$.
- $f : A \to B$ surjective $\iff |A| \ge |B|$ (assuming AC for the
  existence of a section).
- $f : A \to B$ bijective $\iff |A| = |B|$.

## Computational

```python
# Test injectivity over a finite domain
def is_injective(f, dom):
    seen = {}
    for x in dom:
        y = f(x)
        if y in seen and seen[y] != x:
            return False
        seen[y] = x
    return True

print(is_injective(lambda x: 2 * x + 1, range(-5, 6)))       # True
print(is_injective(lambda x: x ** 2, range(-5, 6)))          # False (-3 and 3)

# Test surjectivity onto a target set
def is_surjective(f, dom, codomain):
    image = {f(x) for x in dom}
    return all(b in image for b in codomain)

print(is_surjective(lambda x: x % 5, range(20), range(5)))   # True
```

## Applied

- **Type-system soundness** — proofs that the type-checker is sound
  show "if a program type-checks then it doesn't get stuck" — a
  function-style claim about the evaluation map.
- **Hash function design** — perfect hashing aims for injectivity on
  a known input set; cryptographic hashing wants *one-way*: easy to
  compute, hard to invert.
- **Linear algebra & SVD** — a square matrix $A$ is invertible iff
  $A$ as a function is bijective; non-square matrices map between
  spaces of different dimension where bijection is impossible.
- **Database joins** — primary-key/foreign-key relationships are
  function statements: "every order has *exactly one* customer."

## Check Your Understanding

:::widget type=numeric-input prompt="$f: \\mathbb{Z} \\to \\mathbb{Z}, f(n) = 2n$. Injective (1) or not (0)?" answer=1 explain="$2 a_1 = 2 a_2 \\Rightarrow a_1 = a_2$.":::

:::widget type=numeric-input prompt="$f: \\mathbb{Z} \\to \\mathbb{Z}, f(n) = 2n$. Surjective (1) or not (0)?" answer=0 explain="No — $1$ has no preimage.":::

:::widget type=numeric-input prompt="$f$ bijective $\\Leftrightarrow$ $f$ has an inverse function. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="By pigeonhole, no injection from a 5-element set to a 4-element set. Type 1." answer=1 explain="Yes.":::
