---
strand: structure
level: advanced
order: 6
title: Solvability by Radicals
prerequisites:
  - tier: strand-2-structure-advanced
    slug: 05-galois-correspondence
    description: Galois correspondence
connections:
  - strand-2-structure-advanced/07-modules
applications:
  - cs: "Symbolic algebra: when does an equation have a closed form?"
  - life: "Why there's no quintic formula"
---

# Solvability by Radicals

## Mental

A polynomial $f \in F[x]$ is **solvable by radicals** if its roots can
be expressed using arithmetic operations and $n$-th roots applied to
elements of $F$.

The quadratic $ax^2 + bx + c$ has the formula
$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ — solvable.

Cubics (Cardano, 1545) and quartics (Ferrari, 1540) are also solvable
by radicals.

But for quintics? **No general formula exists** — Abel-Ruffini-Galois.

## Galois's criterion

A polynomial $f \in F[x]$ is solvable by radicals iff its **Galois
group** $G = \mathrm{Gal}(\text{splitting field}/F)$ is a **solvable
group**.

**Solvable group**: there's a chain of subgroups
$\{e\} = G_0 \trianglelefteq G_1 \trianglelefteq \ldots \trianglelefteq G_n = G$
with each quotient $G_{i+1}/G_i$ Abelian.

Why this characterization? Adjoining an $n$-th root corresponds to
extending by a cyclic Galois group $\mathbb{Z}/n$. Iterating gives
chains of cyclic (hence Abelian) quotients.

## The unsolvability of the quintic

The general quintic has Galois group $S_5$. The composition series
of $S_5$:

$$
\{e\} \subset A_5 \subset S_5.
$$

The quotient $A_5$ is **simple non-Abelian** (its only normal
subgroups are itself and trivial). Therefore $S_5$ is **not solvable**.

Hence: the general quintic is not solvable by radicals.

## Specific quintics may still be solvable

$x^5 - 1$: roots are 5th roots of unity. Galois group is
$(\mathbb{Z}/5)^* \cong \mathbb{Z}/4$ — Abelian, hence solvable.

But $x^5 - x - 1$ has Galois group $S_5$ — generically not solvable.

## Interactive

:::widget type=numeric-input prompt="$|S_5| = ?$" answer=120 explain="$5! = 120$.":::

:::widget type=numeric-input prompt="$|A_5| = ?$" answer=60 explain="$60$.":::

:::widget type=numeric-input prompt="$A_5$ is simple — its only normal subgroups are $\\{e\\}$ and itself. Type 1." answer=1 explain="Yes — smallest non-Abelian simple group.":::

:::widget type=numeric-input prompt="Quintic always solvable by radicals? Type 1 yes, 0 no." answer=0 explain="No — generically not.":::

## Symbolic

**Solvable groups**:

- All Abelian groups are solvable (trivially: $\{e\} \trianglelefteq G$,
  quotient $G$ is Abelian).
- $S_2, S_3, S_4$ are solvable.
- $S_n$ for $n \ge 5$ is **not** solvable.

**Composition series**: every finite group has one; Jordan-Hölder
says the composition factors are unique up to permutation. Group
theory's "prime factorization."

**Burnside's $p^a q^b$ theorem**: groups of order $p^a q^b$ for
primes $p, q$ are solvable. The first proof of unsolvability of
quintic equations used a special case of this.

**Feit-Thompson theorem** (odd-order theorem): every group of odd
order is solvable. ~250-page proof — a celebrated triumph of
20th-century group theory.

## Computational

```python
import sympy as sp
from sympy.combinatorics import SymmetricGroup, AlternatingGroup

# S_5 not solvable
S5 = SymmetricGroup(5)
print(S5.is_solvable)             # False

A5 = AlternatingGroup(5)
print(A5.is_solvable)             # False — A_5 is simple non-Abelian

# S_4 solvable
S4 = SymmetricGroup(4)
print(S4.is_solvable)             # True

# Composition series of S_4
# print(S4.composition_series())   # method may vary by version

# Galois groups (numerical / symbolic)
x = sp.symbols("x")
poly = x**5 - x - 1                 # Gal = S_5 generically
# SymPy can in principle compute Galois groups for small cases
# For a quintic with Q-rational solution, we can check if it factors:
print(sp.factor(poly))              # x^5 - x - 1 — irreducible over Q
print(sp.factor(x**5 - 1))          # (x-1)(x^4+x^3+x^2+x+1)
```

## Applied

- **Symbolic integration** — when an antiderivative exists in
  elementary terms is decided by Liouville's theorem, which uses
  Galois-theoretic ideas.
- **Algebraic-equation software** — root-finding in computer algebra
  systems uses Galois-group analysis to choose strategy (factor over
  splitting field vs numerical).
- **Cryptography** — designing systems whose security relies on
  hardness of the discrete-log in non-solvable Galois groups.
- **Physics — symmetry breaking** — understanding which symmetries
  survive a phase transition often uses solvability arguments.

## Check Your Understanding

:::widget type=numeric-input prompt="Polynomial solvable by radicals $\\Leftrightarrow$ Galois group solvable. Type 1." answer=1 explain="Yes — Galois's criterion.":::

:::widget type=numeric-input prompt="$S_5$ solvable? Type 1 yes, 0 no." answer=0 explain="No — A_5 is simple non-Abelian.":::

:::widget type=numeric-input prompt="Cubic and quartic always solvable by radicals. Type 1." answer=1 explain="Yes — Cardano and Ferrari.":::

:::widget type=numeric-input prompt="Every Abelian group is solvable. Type 1." answer=1 explain="Yes.":::
