---
strand: structure
level: research
order: 3
title: Operads and Higher Algebra
prerequisites:
  - tier: strand-2-structure-research
    slug: 02-condensed-mathematics
    description: Condensed mathematics
connections:
  - strand-2-structure-research/04-higher-categorical-physics
applications:
  - cs: "Programming-language algebraic effects, distributed-system algebras"
  - life: "Algebra parameterised by trees of operations"
---

# Operads and Higher Algebra

## Explain Like I Am 7

Imagine a giant cookbook of *recipes* where every recipe takes some
number of inputs (a slot for "two eggs," another for "three cups of
flour") and produces a single dish.  Recipes can be plugged into each
other — the output of one becomes the input slot of another, like
nested funnels — and the rules for plugging form an **operad**.
Different operads give you different flavours of algebra: associative,
commutative, Lie-bracket-like.  It's the most flexible way to write
down "what kinds of operations am I allowing?" before you fill in
*what* they do.

## Mental

An **operad** $\mathcal P$: a sequence of objects $\mathcal P(n)$
("$n$-ary operations") with composition rules indexed by trees:

$$
\mathrm{comp} : \mathcal P(k) \otimes \mathcal P(n_1) \otimes \ldots \otimes \mathcal P(n_k) \to \mathcal P(n_1 + \ldots + n_k).
$$

Plus equivariance under $S_n$ (or sometimes not — *non-symmetric*
operads).

An **algebra over $\mathcal P$** is an object $A$ with action maps
$\mathcal P(n) \otimes A^{\otimes n} \to A$ compatible with
composition.

## Famous operads

| Operad | Algebras |
|---|---|
| $\mathrm{Ass}$ | Associative algebras |
| $\mathrm{Com}$ | Commutative algebras |
| $\mathrm{Lie}$ | Lie algebras |
| $\mathrm{Pois}$ | Poisson algebras |
| $E_n$ | $E_n$-algebras (n-fold loop spaces) |
| $\mathcal A_\infty$ | Homotopy associative algebras |

**$E_n$-algebra**: encodes "$n$ commuting operations" homotopically.
$E_1$ = associative; $E_\infty$ = commutative.

## Why operads matter

- **Universal-algebra foundations**: many "kinds of algebraic
  structure" are operads.
- **Homotopical algebra**: $\mathcal A_\infty, L_\infty$ encode
  associativity / Lie-bracket up to higher coherences. Used in
  rational homotopy theory.
- **Mathematical physics**: topological vertex operators are
  $E_2$-algebras.
- **Programming languages**: algebraic effects + handlers given by
  operads (Plotkin-Power).

## Worked example: $\mathcal A_\infty$

An **$\mathcal A_\infty$-algebra** is an "associative algebra up to
higher coherences." Has operations $m_n : A^{\otimes n} \to A$ for
each $n$ satisfying

$$
\sum_{i + j + k = n} (-1)^{i + jk} m_{i + 1 + k}(\mathrm{id}^{\otimes i}, m_j, \mathrm{id}^{\otimes k}) = 0.
$$

For $n = 3$: associativity. For higher $n$: higher coherences.

Used in **Fukaya categories** (mirror symmetry), **string field
theory**, **topological recursion**.

## Interactive

:::widget type=numeric-input prompt="Operad: graded sequence with tree-indexed composition. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$E_\\infty$ = commutative; $E_1$ = associative. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathcal A_\\infty$-algebras: associative up to higher coherence. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fukaya categories use $\\mathcal A_\\infty$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Cyclic operads** (Getzler-Kapranov): operations cyclically-symmetric.
Used for moduli-of-curves cohomology.

**Modular operads**: operations parameterised by graphs (not just
trees). Encode Riemann-surface topology of higher genus.

**Koszul duality**: $\mathrm{Lie}^! = \mathrm{Com}$, $\mathrm{Ass}^! = \mathrm{Ass}$ —
duality between operads. Foundation of formal-deformation theory.

**Operadic categorification**: each algebraic structure has an
operadic shadow.

## Computational

```python
# Operads are abstract; sketch a few small operations

class OperadOp:
    def __init__(self, arity, name):
        self.arity = arity
        self.name = name
    def __repr__(self):
        return f"{self.name}({self.arity})"

# Associative operad: only one operation per arity (up to symmetry)
mu = OperadOp(2, "·")        # binary multiplication
e = OperadOp(0, "1")          # identity

# Algebra over Ass = ordinary associative algebra
# Operation a · b · c can be parsed as ((a · b) · c) or (a · (b · c)) — equal
print(mu, mu, mu)

# A_∞ algebra: m_n for each n
# m_2 = ordinary multiplication
# m_3 = associator (homotopy witnessing associativity)
# m_4 = higher coherence
A_inf_ops = [OperadOp(n, f"m_{n}") for n in range(2, 5)]
print(A_inf_ops)

# In actual research: PROPs, Operads in chain complexes / spectra
# Computer-algebraic systems for operads exist in Mathematica notebooks /
# Sage modules but specialised
```

## Applied

- **Programming-language algebraic effects** — Eff, Koka, Frank
  formalise effects via Lawvere-theory operads.
- **String topology** — Chas-Sullivan loop products are operations
  in framed little disks $E_2$ operad.
- **Fukaya categories / mirror symmetry** — $\mathcal A_\infty$
  fundamental.
- **Mathematical physics** — string field theory uses cyclic
  operads.
- **Moduli of curves cohomology** — modular operad framework.

## Check Your Understanding

:::widget type=numeric-input prompt="Operad encodes tree-indexed operation composition. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$E_n$-algebras: $n$ commuting operations homotopically. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathcal A_\\infty$ encodes associativity up to higher coherences. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Algebraic effects via operads (Plotkin-Power). Type 1." answer=1 explain="Yes.":::
