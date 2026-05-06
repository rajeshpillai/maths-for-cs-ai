---
strand: number-quantity
level: master
order: 5
title: The Birch and Swinnerton-Dyer Conjecture
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 04-elliptic-curves-arith
    description: Arithmetic of elliptic curves
connections:
  - strand-1-number-quantity-master/06-class-field-theory
applications:
  - cs: "Predicting elliptic-curve rank for crypto-curve selection"
  - life: "An L-function predicts the rank of a curve"
---

# The Birch and Swinnerton-Dyer Conjecture

## Explain Like I Am 7

Take that looping racetrack from the last lesson and ask: "how many
*independent* checkpoints with fraction coordinates can you find?"
That hidden number — its **rank** — is incredibly hard to read off
the curve directly.  But Birch and Swinnerton-Dyer noticed something
spooky: another song attached to the curve, the L-function, seems to
go *exactly that quiet* at one special note.  If the music is silent
twice, the rank is two; silent thrice, rank three.  Nobody has yet
proved this is *always* true — there's a million-dollar prize for
whoever does.

## Mental

For an elliptic curve $E / \mathbb{Q}$ with rank $r$:

**Weak BSD**: $r$ equals the order of vanishing of $L(s, E)$ at $s = 1$.

In symbols:

$$
\mathrm{ord}_{s = 1} L(s, E) = r.
$$

**Strong BSD** also predicts the leading Taylor coefficient of $L(s, E)$
at $s = 1$ in terms of: $r$, regulator, periods, $\Sha$, Tamagawa
factors, and torsion order.

A **Clay Millennium Problem** worth $1{,}000{,}000$.

## Why this is striking

$L(s, E)$ encodes the *local* point counts $a_p$ at every prime $p$
(Lesson 04). The order of vanishing at $s = 1$ is a *global*
analytic invariant.

The rank $r$ counts *generators of $E(\mathbb{Q})$*. A purely
arithmetic / Diophantine quantity.

BSD says these match. Two utterly different worlds describe the same
integer.

## Known cases

**Coates-Wiles** (1977): if $E$ has CM and $r \ge 1$, then $L(E, 1) = 0$.

**Gross-Zagier** (1986): for analytic rank 1 curves, $r \ge 1$
matches.

**Kolyvagin** (1989): if analytic rank $\le 1$, then BSD weak holds
(rank matches).

**Modern progress**: significant cases of analytic rank $\ge 2$ via
Skinner-Urban, Bhargava-Skinner-Zhang.

## Empirical evidence

Computer experiments verify weak BSD for hundreds of thousands of
curves. The match is striking:

- Curves where $L(E, 1) \ne 0$: appear to have rank 0.
- Curves where $L(E, 1) = 0, L'(E, 1) \ne 0$: rank 1.
- Curves with $L^{(k)}(E, 1) \ne 0$ first at $k$: rank $k$.

## Interactive

:::widget type=numeric-input prompt="BSD: $\\mathrm{ord}_{s=1} L(s, E) = ?$ for rank-$r$ curve. Type the answer in terms of $r$: just $r$, type 1 to indicate." answer=1 explain="Yes — order = rank.":::

:::widget type=numeric-input prompt="BSD is a Clay Millennium problem. Type 1." answer=1 explain="Yes — \\$1M prize.":::

:::widget type=numeric-input prompt="Kolyvagin: BSD weak holds for analytic rank $\\le 1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\Sha(E)$ figures into strong BSD. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Strong BSD formula**:

$$
\frac{L^{(r)}(E, 1)}{r!} = \frac{\Omega_E \cdot R_E \cdot |\Sha(E)|}{|E(\mathbb{Q})_{\text{tors}}|^2} \prod_p c_p,
$$

where:

- $\Omega_E$: real period of $E$ (related to $\int_E dx/y$).
- $R_E$: regulator (determinant of Néron-Tate height pairing on
  generators of $E(\mathbb{Q})$).
- $|\Sha|$: order of Tate-Shafarevich group.
- $c_p$: Tamagawa numbers at primes of bad reduction.

Each ingredient is an algorithmic invariant; computing them and
verifying the equality is an active area.

**Bloch-Kato conjecture**: vast generalisation to motives.

## Computational

```python
# BSD verification requires PARI/GP or Sage; sketch only

# Sage pseudocode:
# E = EllipticCurve([0, 0, 0, -1, 0])           # rank 0, torsion (Z/2)^2
# E.analytic_rank()                              # 0
# E.rank()                                       # 0

# For rank 1: y^2 = x^3 - 2 (generator (3, 5))
# E = EllipticCurve([0, 0, 0, 0, -2])
# E.analytic_rank()                              # 1
# E.rank()                                       # 1

# Compute L(E, 1) numerically
# L(s, E) = sum over n of a_n / n^s where a_n are coeffs from product over primes

# Approximate L(E, 1) via direct sum (slowly converging — 1) or
# better, via functional equation acceleration
import math

def euler_product_naive(curve_a_p_list, s):
    # Approximate L(s, E) using a finite Euler product
    # a_p list: pairs (p, a_p) for primes p up to some cutoff
    L = 1.0
    for p, ap in curve_a_p_list:
        L *= 1 / (1 - ap * p**(-s) + p**(1 - 2*s))
    return L

# Synthetic example, just demonstrating the pattern
# In practice: use Sage's E.lseries().eval(1) for accurate values
```

## Applied

- **Crypto-curve auditing** — knowing the rank's behaviour helps
  identify weak/strong curves.
- **Algorithmic number theory** — BSD-style relations underpin algorithms
  for class numbers, regulators, isogenies.
- **Mathematical physics** — BSD has deep links to motivic
  cohomology, automorphic L-functions in geometric Langlands.
- **Heuristic-driven crypto choices** — BSD informs assumptions on
  expected rank for "random" curves.

## Check Your Understanding

:::widget type=numeric-input prompt="Rank of $E(\\mathbb{Q})$ matches $\\mathrm{ord}_{s=1} L(s, E)$ — BSD weak. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="BSD is Clay Millennium problem. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kolyvagin: weak BSD for analytic rank $\\le 1$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Strong BSD formula involves $\\Sha$, regulator, periods, torsion. Type 1." answer=1 explain="Yes.":::
