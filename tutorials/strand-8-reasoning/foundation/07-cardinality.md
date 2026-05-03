---
strand: reasoning
level: foundation
order: 7
title: Cardinality — Countable and Uncountable
prerequisites:
  - tier: strand-8-reasoning-foundation
    slug: 03-functions-and-relations
    description: Functions (bijection definition)
connections:
  - strand-8-reasoning-foundation/08-quantifiers
applications:
  - cs: "Computability theory, infinite-state machines"
  - life: "Cantor's revolution: not all infinities are equal"
---

# Cardinality — Countable and Uncountable

## Mental

Two finite sets have the **same size** if you can match their
elements one-to-one (Strand 1 Foundation Lesson 00).

**Cantor's insight** (1874): the same definition works for **infinite**
sets. Two sets have the same **cardinality** if there is a
**bijection** between them.

For finite sets, $|A| = $ number of elements. For infinite sets,
cardinality is a more subtle concept.

**Countable** sets: in bijection with $\mathbb{N}$. Cardinality
$\aleph_0$ ("aleph-zero").

- $\mathbb{N}, \mathbb{Z}, \mathbb{Q}$: all countable. (Cantor's
  "first-diagonal" argument lists $\mathbb{Q}$ as a sequence.)

**Uncountable** sets: not in bijection with $\mathbb{N}$. Larger.

- $\mathbb{R}$: uncountable. Cantor's **diagonal argument** (next
  section) shows there's no listing of $\mathbb{R}$.

This means "**there are more reals than integers**" — even though
both are infinite. Different infinities have different sizes.

## Cantor's diagonal

**Theorem**: $\mathbb{R}$ is uncountable.

**Proof** (sketch): suppose $\mathbb{R}$ countable. List all reals
in $[0, 1]$ as decimals:

$$
\begin{aligned}
r_1 &= 0.d_{11} d_{12} d_{13} \ldots \\
r_2 &= 0.d_{21} d_{22} d_{23} \ldots \\
r_3 &= 0.d_{31} d_{32} d_{33} \ldots \\
&\vdots
\end{aligned}
$$

Construct $r^* = 0.d_1^* d_2^* d_3^* \ldots$ where $d_i^*$ differs
from $d_{ii}$. Then $r^*$ differs from every $r_i$ in at least
the $i$-th decimal — so $r^*$ is not in the list. Contradiction. □

The proof exploits the **diagonal** of an infinite array — hence
"diagonal argument."

## Interactive

:::widget type=numeric-input prompt="Are $\\mathbb{N}$ and $\\mathbb{Z}$ in bijection? (Hint: zigzag $0, 1, -1, 2, -2, \\ldots$.) Type 1 yes, 0 no." answer=1 explain="Yes — both countable.":::

:::widget type=numeric-input prompt="Is $\\mathbb{Q}$ countable?" answer=1 explain="Yes — Cantor's enumeration of fractions $p/q$ in a 2D grid.":::

:::widget type=numeric-input prompt="Is $\\mathbb{R}$ countable?" answer=0 explain="No — diagonal argument proves uncountable.":::

:::widget type=numeric-input prompt="Is $[0, 1]$ in bijection with $\\mathbb{R}$? (Both uncountable; same cardinality.)" answer=1 explain="Yes — same cardinality. (Map $[0, 1] \\to \\mathbb{R}$ via $\\tan(\\pi(x - 0.5))$ or similar.)":::

## Symbolic

**Cardinality** $|A| = |B|$ iff there exists a bijection $A \to B$.

**Countable**: $|A| \le \aleph_0$, equivalently $A$ in bijection
with a subset of $\mathbb{N}$.

**Continuum**: $|\mathbb{R}| = 2^{\aleph_0} = \mathfrak{c}$.

**Continuum hypothesis**: is there a cardinal between $\aleph_0$
and $\mathfrak{c}$? Independent of ZFC (Gödel 1940, Cohen 1963)
— neither provable nor disprovable from standard set-theory
axioms. Strand 8 Master.

## Computational

Computability is intimately tied to countability:

- **Computable functions**: at most countably many (each one
  representable as a finite program — countably many programs).
- **Real numbers**: uncountably many.
- **Therefore**: most reals are not computable.

(Most reals **cannot** be approximated by any algorithm. Profound
fact.)

## Applied

- **Computability theory** (Strand 13 Advanced): tells us which
  problems are solvable by algorithms. Most aren't.
- **Cantor's set theory** revolutionised mathematics; Hilbert called
  it "a paradise from which no one shall expel us."

## Check Your Understanding

:::widget type=numeric-input prompt="$|\\mathbb{N}|$? (Type 0 for aleph-zero, the convention here.)" answer=0 explain="$\\aleph_0$. Type 0.":::

:::widget type=numeric-input prompt="Is the set of rationals countable? (1 yes.)" answer=1 explain="Yes — even though they're dense in $\\mathbb{R}$, they're countable.":::

:::widget type=numeric-input prompt="Cantor's diagonal argument applies to $\\mathbb{R}$. The constructed number differs from every $r_i$ in position..." answer=0 explain="Position $i$ — the diagonal position. Type 0 to indicate.":::

:::widget type=numeric-input prompt="A countable union of countable sets is..." answer=1 explain="Countable. Type 1.":::
