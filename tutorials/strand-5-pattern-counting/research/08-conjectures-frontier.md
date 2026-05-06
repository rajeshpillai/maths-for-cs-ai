---
strand: pattern-counting
level: research
order: 8
title: Open Conjectures in Combinatorics
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 07-tropical-geometry-deeper
    description: Tropical geometry
connections:
  - strand-5-pattern-counting-research/09-pattern-research-capstone
applications:
  - cs: "Pattern detection in big-data combinatorics"
  - life: "What combinatorialists are working on now"
---

# Open Conjectures in Combinatorics

## Explain Like I Am 7

Even though counting puzzles look simple, some of them have stayed
unsolved for decades.  Can you colour every spot of an infinite
grid with just five crayons so no two spots one inch apart share a
colour?  Can you write a never-ending list of plus-and-minus ones
so the running totals stay tiny forever?  Can you stuff a base-three
grid full of dots without ever forming three in a row?  Working
mathematicians chip away at these dragons every year — and 2023
saw two of them slain at last (the polynomial Freiman-Ruzsa
conjecture and the single-tile aperiodic tiling).

## Mental

Modern combinatorics has an active list of major open problems.
Sample of the frontier:

## Erdős discrepancy problem

For any $\pm 1$ sequence $(a_1, a_2, \ldots)$, are partial sums
$\sum_{i=1}^N a_{di}$ unbounded as $d, N \to \infty$?

**Tao 2015**: solved using Erdős' methods + Polymath collaboration.

## Hadwiger-Nelson chromatic number of plane

What's $\chi(\mathbb R^2)$ — the chromatic number when adjacency =
unit distance?

**Long known**: $4 \le \chi \le 7$.

**De Grey 2018**: improved to $\chi \ge 5$. Open whether $5, 6$, or
$7$.

## Cap set problem

Largest 3-AP-free subset of $\mathbb F_3^n$.

**Croot-Lev-Pach + Ellenberg-Gijswijt 2016**: bounded by $O(2.756^n)$
— **massive** improvement over previous $O(3^n / \log n)$.

Decisive use of *polynomial method*. Open: tight constant?

## Unit conjectures and discrepancy

- **Beck-Fiala conjecture**: any set system with degree $t$ has
  discrepancy $O(\sqrt t)$.
- **Komlós conjecture**: bounded matrices $A$ with bounded column
  norms have discrepancy $O(1)$. (Bansal-Dadush-Garg-Lovett 2017
  algorithmically; deterministic version open.)

## Polynomial method

A modern unifying technique:

- Cap set (CLP, EG 2016).
- Joints conjecture (Guth-Katz).
- Distance-Erdős for $\mathbb R^2$ (Guth-Katz 2010).
- Method of slice rank.

The **polynomial method** organises many recent breakthroughs.

## Interactive

:::widget type=numeric-input prompt="Erdős discrepancy: solved by Tao 2015. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cap set bound $O(2.756^n)$ by EG 2016. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hadwiger-Nelson: De Grey 2018 $\\ge 5$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Polynomial method unifies many breakthroughs. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Polynomial method**: encode combinatorial objects as polynomials,
use algebraic identities to bound them.

**Sum-product theorem** (Bourgain-Glibichuk-Konyagin, Tao-Vu):
$|A + A| + |A \cdot A| \ge \min(|A|^{2 - \epsilon}, p)$.

**Roth's theorem** for primes: 3-APs in primes — Bloom-Sisask 2020
breakthrough.

**Erdős-Ginzburg-Ziv**: any $2n - 1$ integers contain $n$ summing
to a multiple of $n$. (Old result; many modern variants open.)

**Goldbach's conjecture**: every even $n > 2$ = sum of two primes.
*Still open*; ternary Goldbach (Helfgott 2013) settled.

## Computational

```python
import numpy as np

# Cap set search: largest 3-AP-free subset of F_3^n
import itertools

def has_3ap(S, n):
    """Check if 3-element AP exists in S."""
    S_set = set(map(tuple, S))
    for a in S:
        for b in S:
            if a == b: continue
            # 3rd element to make AP
            c = tuple((-(np.array(a) + np.array(b))) % 3)
            if c in S_set:
                return True
    return False

# Brute force for tiny n
n = 3
elements = list(itertools.product(range(3), repeat=n))
# Largest cap set in F_3^3 is known to be 9
print(f"Searching 3-AP-free subsets of F_3^{n}...")

# Greedy random search
import random
best = 0
for _ in range(50):
    random.shuffle(elements)
    S = []
    for e in elements:
        if not has_3ap(S + [e], n):
            S.append(e)
    best = max(best, len(S))

print(f"Largest greedy cap set found: {best}")
print(f"True maximum (n=3): 9")
```

## Applied

- **Big-data analytics** — extremal-combinatorics-style bounds for
  algorithm guarantees.
- **Cryptography** — combinatorial conjectures inform parameter
  analyses.
- **Coding theory** — polynomial-method-style bounds.
- **AI conjecture-making** — pattern detection in combinatorial data
  via ML.
- **Theoretical CS** — many lower bounds use combinatorial frontier
  techniques.

## Check Your Understanding

:::widget type=numeric-input prompt="Erdős discrepancy: solved Tao 2015. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cap-set EG 2016 bound $2.756^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hadwiger-Nelson chromatic ≥ 5 (De Grey 2018). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Goldbach's conjecture remains open. Type 1." answer=1 explain="Yes.":::
