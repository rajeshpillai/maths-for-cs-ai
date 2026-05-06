---
strand: number-quantity
level: master
order: 7
title: The Langlands Program — A Glimpse
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 06-class-field-theory
    description: Class field theory
connections:
  - strand-1-number-quantity-master/08-additive-combinatorics
applications:
  - cs: "Underlies many post-quantum and isogeny-based crypto schemes"
  - life: "The grand unification of number theory"
---

# The Langlands Program — A Glimpse

## Explain Like I Am 7

Imagine two very different museums.  One is full of strange number
sculptures; the other is full of beautiful musical scores written in a
language nobody can read.  Robert Langlands made an outrageous guess:
*every* sculpture in museum A has a matching score in museum B, and
each pair tells the same story from two completely different sides.
The Langlands program is a centuries-long quest to slowly verify
matching pairs — and every time one is confirmed, deep mathematical
mysteries fall like dominoes (Fermat's Last Theorem was one of those
dominoes).

## Mental

The **Langlands program** (Robert Langlands, 1967) proposes a vast
web of conjectured equivalences:

- **Galois representations** $\rho : \mathrm{Gal}(\bar{\mathbb{Q}}/\mathbb{Q}) \to \mathrm{GL}_n$.
- **Automorphic representations** of $\mathrm{GL}_n(\mathbb{A}_K)$.
- **L-functions** attached to each side, conjecturally equal.

Class field theory (Lesson 06) is the **abelian / $\mathrm{GL}_1$**
case; modularity of elliptic curves (Lesson 03) is the **$\mathrm{GL}_2$
case for weight-2 forms over $\mathbb{Q}$**.

The program seeks the same picture for $\mathrm{GL}_n$ over arbitrary
number fields and beyond.

## Components and conjectures

| Side | Object |
|---|---|
| Galois | $\rho : \mathrm{Gal} \to \mathrm{GL}_n$ |
| Automorphic | irreducible cuspidal $\pi \subset L^2(\mathrm{GL}_n(K) \backslash \mathrm{GL}_n(\mathbb{A}_K))$ |
| L-function | matches between the two sides |

Conjectured: a bijection between certain $\rho$ and certain $\pi$,
matching L-functions.

## Spectacular special cases proven

- **CFT** ($\mathrm{GL}_1$): all of class field theory.
- **Modularity / Wiles** ($\mathrm{GL}_2$): every elliptic curve over
  $\mathbb{Q}$ corresponds to a modular form.
- **Local Langlands for $\mathrm{GL}_n$ over $\mathbb{Q}_p$** (Harris-
  Taylor, Henniart, 2000s).
- **Geometric Langlands** (Drinfeld, Lafforgue): function-field analog,
  fully proven in many cases.

## Functoriality

A core conjecture: any homomorphism $L \to L'$ between L-groups
*induces* a transfer between automorphic representations, matching
L-functions.

Most known reciprocity laws are functoriality cases. The "endoscopic
classification" (Arthur, Mok) handles many classical groups.

## Interactive

:::widget type=numeric-input prompt="Class field theory: $\\mathrm{GL}_1$ case of Langlands. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wiles's modularity: $\\mathrm{GL}_2$ Langlands for elliptic curves. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Langlands proposed in $1967$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Functoriality conjecture relates automorphic representations under $L$-group maps. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$L$-group**: dual group construction. For $\mathrm{GL}_n$:
$L\mathrm{GL}_n = \mathrm{GL}_n(\mathbb{C}) \rtimes \mathrm{Gal}$.

**$p$-adic Langlands**: matches Galois reps and $p$-adic automorphic
representations. Drives modern progress on Fontaine-Mazur, BSD, and
related conjectures.

**Geometric Langlands**: replaces number fields with function fields
of curves; vast implications in algebraic geometry, mathematical
physics (Kapustin-Witten gauge theory).

**Sato-Tate conjecture** (proven 2008-2011): for non-CM elliptic curves,
the angle $\theta_p$ in $a_p = 2\sqrt p \cos \theta_p$ equidistributes
according to the Sato-Tate measure. Inferred from $L$-functions of
all symmetric powers (a deep Langlands case).

## Computational

```python
# Computational Langlands is heavy; here we sketch basic ingredients.

# For an elliptic curve E and prime p, compute a_p
P = 7
A, B = -1, 0   # y^2 = x^3 - x
def is_on(x, y, p=P, a=A, b=B):
    return (y*y - x**3 - a*x - b) % p == 0

points = [(x, y) for x in range(P) for y in range(P) if is_on(x, y)]
N = len(points) + 1
ap = P + 1 - N
print(f"a_{P} = {ap}")

# By modularity, this a_p equals the p-th coefficient of the
# associated weight-2 cusp form.

# Sato-Tate: for non-CM E, distribution of theta_p in [0, pi]
# follows (2/pi) sin^2(theta) measure.
import math, random
# Synthetic sample of "a_p / (2 sqrt p)" for many primes:
samples = [(random.randint(0, 10) - 5) / 4 for _ in range(1000)]
# In real data: histogram approaches sin^2 distribution

# Geometric Langlands and p-adic Langlands need substantial machinery
# (D-modules, perverse sheaves) — not implementable in a notebook.
```

## Applied

- **Sato-Tate distribution** in computational number theory; Lehmer's
  conjecture about $\tau(p)$.
- **Cryptography of Drinfeld modules** — function-field analogues
  of elliptic curves; some proposed crypto schemes.
- **Mirror symmetry / mathematical physics** — geometric Langlands
  has deep links to gauge theory.
- **Algorithmic class-field theory and modular forms** — Sage's
  L-function computations rest on Langlands-style identities.
- **AI-assisted theorem proving** — DeepMind's AlphaProof and
  Lean's mathlib are actively formalising progress on Langlands-
  adjacent conjectures.

## Check Your Understanding

:::widget type=numeric-input prompt="CFT is the $\\mathrm{GL}_1$ Langlands case. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Wiles proved $\\mathrm{GL}_2$ Langlands over $\\mathbb{Q}$ for elliptic curves. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sato-Tate proven for non-CM elliptic curves. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Geometric Langlands has function-field flavour and physics connections. Type 1." answer=1 explain="Yes.":::
