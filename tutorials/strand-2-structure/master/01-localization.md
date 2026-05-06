---
strand: structure
level: master
order: 1
title: Localisation
prerequisites:
  - tier: strand-2-structure-master
    slug: 00-noetherian-rings
    description: Noetherian rings
connections:
  - strand-2-structure-master/02-nullstellensatz
applications:
  - cs: "Symbolic computation, algebraic-geometry algorithms"
  - life: "Inverting elements you care about"
---

# Localisation

## Explain Like I Am 7

Think of a ring as a town where most streets are one-way: you can
multiply by stuff, but dividing only works for a few special items.
**Localisation** is what happens when you officially declare a chosen
neighbourhood of streets to be two-way — those items now have proper
divide-by buttons.  Building fractions out of the integers (turning
$\mathbb Z$ into $\mathbb Q$) is the most familiar example.  Algebraic
geometers do this all the time when they want to "zoom in" on one
patch of a curve and pretend the rest of the curve doesn't exist.

## Mental

For a commutative ring $R$ and a multiplicatively closed subset
$S \subseteq R$ (with $1 \in S$), the **localisation** $S^{-1} R$ is

$$
S^{-1} R = \{r/s : r \in R, s \in S\}
$$

with $r_1/s_1 = r_2/s_2$ iff $u(r_1 s_2 - r_2 s_1) = 0$ for some
$u \in S$.

Most familiar example: $\mathbb{Q} = (\mathbb{Z} \setminus \{0\})^{-1} \mathbb{Z}$.

## Standard localisations

| Notation | $S$ | Description |
|---|---|---|
| $R_f$ | $\{1, f, f^2, \ldots\}$ | Invert one element |
| $R_\mathfrak{p}$ | $R \setminus \mathfrak{p}$ for prime $\mathfrak{p}$ | "Localise at $\mathfrak{p}$" |
| $\mathrm{Frac}(R)$ | $R \setminus \{0\}$ for integral domain | Field of fractions |

**Localisation at a prime** $R_\mathfrak{p}$ has a unique maximal
ideal $\mathfrak{p} R_\mathfrak{p}$ — a **local ring**.

## Why localise?

Local properties (smoothness, depth, regularity) are *local* —
they're often easier to study one prime at a time. After studying
each $R_\mathfrak{p}$, glue back to global statements.

This is the foundation of **schemes** (algebraic geometry) and the
local-global principle.

## Worked example: zero locus

In $k[x, y]$, consider the affine variety $V(xy)$ — the union of
two lines $\{x = 0\}$ and $\{y = 0\}$.

The local ring at the origin (the prime ideal $\mathfrak{p} = (x, y)$):
$k[x, y]_{(x, y)}$. In this local ring, both $x$ and $y$ are
non-units; the variety appears as a "cross" at the origin.

Localising at $(x)$ (the prime ideal of one line) makes $y$ a unit
— we ignore the other line and study just $\{x = 0\}$.

## Interactive

:::widget type=numeric-input prompt="$\\mathbb{Q} = $ localisation of $\\mathbb{Z}$ at $\\mathbb{Z} \\setminus \\{0\\}$. Type 1." answer=1 explain="Yes — fraction field.":::

:::widget type=numeric-input prompt="$R_\\mathfrak{p}$ has a unique maximal ideal — local ring. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Local ring of $\\mathbb{Z}$ at $(p)$: $\\mathbb{Z}_{(p)} = \\{m/n : p \\nmid n\\}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Localising at $\\{1, f, f^2, \\ldots\\}$ inverts $f$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Universal property**: $S^{-1} R$ has the universal property that
maps $R \to T$ sending $S$ to units factor uniquely through $S^{-1} R$.

**Modules localise too**: $S^{-1} M = \{m/s : m \in M, s \in S\}$ —
**flat** as $R$-module, exact functor $- \otimes_R S^{-1} R$.

**Local-global principle**: a finitely generated module $M$ is zero
iff $M_\mathfrak{p} = 0$ for every prime $\mathfrak{p}$. Many properties
have similar local-global statements.

**Krull dimension**: $\dim R = \sup_\mathfrak{p} \dim R_\mathfrak{p}$.
Localisation often *reduces* dimension.

## Computational

```python
import sympy as sp

x, y = sp.symbols("x y")

# Localise Q[x, y] at the maximal ideal (x, y) — origin
# In symbolic terms: study formal power series-like behaviour at origin
# 1/(1 - x) = 1 + x + x^2 + ... in the local ring at (x)

# Let's compute Taylor expansions as a proxy for "localised" computation
f = sp.Rational(1, 1) / (1 - x)
print(sp.series(f, x, 0, 5))                # 1 + x + x² + x³ + x⁴ + O(x⁵)

# Working in a local ring: invert anything not in the maximal ideal
g = (x + 1) / (x - 2)        # in local ring at origin, (x - 2) is a unit
# Express g as a power series in x
g_series = sp.series(g, x, 0, 5).removeO()
print(g_series)               # converges in the formal local ring
```

## Applied

- **Algebraic geometry** — schemes are built by gluing affine
  schemes $\mathrm{Spec}(R)$, where $R$ is a localisation of
  some polynomial ring.
- **Differential calculus** — germs of smooth functions form a local
  ring at each point of a manifold.
- **Sheaf theory** — sheaves on a scheme are gluings of local data
  controlled by localisations.
- **Number theory — local fields** $\mathbb{Q}_p$, $\mathbb{F}_q((t))$
  arise as completions of localisations.
- **Computer algebra** — Singular and Macaulay2 implement
  localisation for algorithmic varieties.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\mathrm{Frac}(\\mathbb{Z}) = \\mathbb{Q}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Local ring has unique maximal ideal. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Localising at $\\{1, f, f^2, \\ldots\\}$: $R_f$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Local-global: finitely generated $M$ is zero iff $M_\\mathfrak{p} = 0$ for all primes. Type 1." answer=1 explain="Yes.":::
