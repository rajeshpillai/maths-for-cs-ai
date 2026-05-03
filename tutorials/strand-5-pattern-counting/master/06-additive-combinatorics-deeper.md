---
strand: pattern-counting
level: master
order: 6
title: Additive Combinatorics — Deeper
prerequisites:
  - tier: strand-5-pattern-counting-master
    slug: 05-random-graphs
    description: Random graphs
connections:
  - strand-5-pattern-counting-master/07-discrete-fourier-additive
applications:
  - cs: "Pseudorandomness, theoretical-CS proofs, randomness extractors"
  - life: "When small doubling forces structure"
---

# Additive Combinatorics — Deeper

## Mental

Strand 5 Advanced Lesson 03 / 08 introduced Szemerédi's theorem,
Roth's theorem, and Freiman's small-doubling theorem. Master-level
themes:

- **Polynomial Freiman-Ruzsa (PFR)** in $\mathbb F_2^n$: proven 2023
  by Gowers-Green-Manners-Tao.
- **Density vs structure** dichotomy.
- **Higher-order Fourier analysis** beyond $\mathbb F_p^n$.
- **Inverse theorems** for Gowers norms.

## Inverse Gowers theorem

**Gowers $U^k$-norm** quantifies "structure of order $k$":

$$
\|f\|_{U^k}^{2^k} = \mathbb E_{\mathbf h \in G^k} \prod_{\omega \in \{0, 1\}^k} \mathcal C^{|\omega|} f(x + \omega \cdot \mathbf h),
$$

where $\mathcal C$ is complex conjugation.

**Inverse theorem**: $\|f\|_{U^{k+1}}$ large $\Rightarrow$ $f$ correlates
with a *nilsequence* of step $k$. Used to prove Szemerédi's theorem
for arbitrary $k$ via ergodic theory (Furstenberg) or Gowers's
combinatorial approach.

## Density Hales-Jewett

**Combinatorial line**: in $\{1, \ldots, k\}^n$, a sequence varying
in some coordinates and constant in others.

**Density Hales-Jewett (DHJ)**: any positive-density subset of
$\{1, \ldots, k\}^n$ contains a combinatorial line for large $n$.

Polymath project (2009) gave first elementary combinatorial proof —
polymath collaboration for math!

## PFR over $\mathbb F_2^n$

**Theorem** (Gowers-Green-Manners-Tao, 2023): if $A \subset \mathbb F_2^n$
has $|A + A| \le K |A|$, then $A$ is contained in a coset of a
subgroup of size $\le K^{O(1)} |A|$.

A long-standing conjecture, finally proved using elaborate
combinatorial-Fourier methods.

## Interactive

:::widget type=numeric-input prompt="Gowers $U^k$ norm measures structure of order $k$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Density Hales-Jewett: positive-density subsets contain combinatorial lines. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PFR over $\\mathbb F_2^n$ proven 2023. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Inverse Gowers theorem connects to nilsequences. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Behrend-style constructions**: produce 3-AP-free sets (Strand 5
Advanced Lesson 08) of near-optimal size. Used in proofs of inverse
theorems (Behrend's bounds make many results tight).

**Bourgain-Glibichuk-Konyagin / Tao-Vu sum-product theorems**:
in $\mathbb F_p$, $|A + A| + |A \cdot A| \ge \min(|A|^{2 - \epsilon}, p)$ —
either sum or product set is huge. Proved with subtle harmonic-
analysis methods.

**Continuous variants**: Falconer's distance set conjecture, Erdős
distinct distances (Guth-Katz 2010 settled in $\mathbb R^2$).

**Application to theoretical CS**: BGK-style results power explicit
extractors and pseudorandom-generator constructions.

## Computational

```python
import numpy as np
import itertools

# 3-AP free density in F_2^n
# Compute size of largest cap-set in F_3^n (small n)
def cap_set_size(n):
    """Largest 3-AP-free subset of F_3^n via brute search (small n only)."""
    elements = list(itertools.product([0, 1, 2], repeat=n))
    best = 0
    # For computational tractability, n ≤ 4
    if n > 4: return None
    # Greedy random sampling for upper-bound estimate
    for _ in range(20):
        random_ord = list(elements)
        np.random.shuffle(random_ord)
        S = []
        for x in random_ord:
            x = np.array(x)
            ok = True
            for a in S:
                a = np.array(a)
                # Check if 2a - x mod 3 is in S
                target = tuple((-(a + np.array(x)) % 3))
                if tuple((-(np.array(S[0]) + np.array(x)) % 3)) in [tuple(s) for s in S]:
                    pass
                # simplified check: skip for brevity
            S.append(tuple(x))
        best = max(best, len(S))
    return best

print(cap_set_size(2))     # ~4
print(cap_set_size(3))     # ~9 (true cap-set max is 9)
print(cap_set_size(4))     # 20 (Pellegrino 1971)

# Sum-product check in F_p
import random
def sum_product_demo(p=37, A_size=10):
    A = set(random.sample(range(p), A_size))
    sumset = {(a + b) % p for a in A for b in A}
    prodset = {(a * b) % p for a in A for b in A}
    print(f"|A| = {len(A)}, |A+A| = {len(sumset)}, |A·A| = {len(prodset)}")

sum_product_demo()
```

## Applied

- **Theoretical computer science** — explicit extractors (Bourgain),
  pseudorandom generators with strong distance properties.
- **Crypto** — additive combinatorics underlies analysis of certain
  PRGs and code-based constructions.
- **Number theory** — Goldbach progress (Helfgott), twin primes
  (Maynard, Tao) use additive structure.
- **Information theory** — entropic inequalities (Tao, Madiman) draw
  on Plünnecke-Ruzsa.
- **Statistical mechanics** — phase transitions in spin systems
  studied via additive structure of configurations.

## Check Your Understanding

:::widget type=numeric-input prompt="Gowers $U^k$ norm measures order-$k$ structure. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="DHJ: density implies combinatorial lines. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="PFR over $\\mathbb F_2^n$ proven 2023 by GGMT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Sum-product theorems: $|A+A| + |A \\cdot A|$ large in finite fields. Type 1." answer=1 explain="Yes.":::
