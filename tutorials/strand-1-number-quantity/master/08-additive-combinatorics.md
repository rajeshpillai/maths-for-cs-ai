---
strand: number-quantity
level: master
order: 8
title: Additive Combinatorics
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 07-langlands-program
    description: Langlands program
connections:
  - strand-1-number-quantity-master/09-number-theory-master-capstone
applications:
  - cs: "Property testing, pseudorandomness, randomness extractors"
  - life: "Where additive structure meets combinatorics"
---

# Additive Combinatorics

## Mental

**Additive combinatorics** studies sets with structure under
addition: arithmetic progressions, sumsets, Freiman-style theorems.

The big questions:

- How many elements of a set lie in arithmetic progressions?
- If $A + A$ is small, what does $A$ look like?
- Density theorems: any "dense enough" set has long APs.

Modern tools mix combinatorics with harmonic analysis and ergodic
theory.

## Szemerédi's theorem

**Theorem** (Szemerédi 1975): any subset of $\mathbb{Z}$ with positive
upper density contains arbitrarily long arithmetic progressions.

In other words: density alone forces structure.

**Effective bounds**: hardest part. Behrend (1946): subsets of
$\{1, \ldots, N\}$ avoiding 3-APs have size $\le N e^{-c \sqrt{\log N}}$
(no power saving in known proofs of Roth's theorem until recently).

## Green-Tao theorem

**Theorem** (Green-Tao 2004): the **primes** contain arbitrarily long
APs.

The proof uses:

- **Goldston-Pintz-Yıldırım** sieve to find dense models.
- A transference principle from Szemerédi's theorem.
- Soft randomness arguments.

This was a celebrated result; Green and Tao both received Fields
medals (Tao 2006, Green ICM speaker 2006).

## Sum-free sets and Freiman

**Plünnecke-Ruzsa**: if $|A + A| \le K |A|$, then $|nA - mA| \le K^{n + m} |A|$.

**Freiman's theorem**: if $A \subset \mathbb{Z}$ has $|A + A| \le K |A|$
("small doubling"), then $A$ is contained in a generalised
arithmetic progression of bounded dimension and size.

Roughly: small-doubling sets are *almost* APs.

## Interactive

:::widget type=numeric-input prompt="Szemerédi's theorem: positive density implies arbitrarily long APs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Green-Tao: primes contain arbitrarily long APs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Freiman: small-doubling implies AP-like structure. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Behrend constructed AP-3-free subsets of $\\{1, ..., N\\}$ of size $N e^{-c \\sqrt{\\log N}}$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Roth's theorem** (1953): any $A \subset \{1, ..., N\}$ avoiding 3-APs
has $|A| = O(N / \log \log N)$. Improved by Heath-Brown, Szemerédi,
Bourgain, ... Bloom-Sisask 2020: $|A| \le N (\log N)^{-1 - c}$ for
some $c > 0$ — finally below $N / \log N$.

**Polynomial Freiman-Ruzsa conjecture**: $|A + A| \le K |A|$ implies
$A \subseteq P + S$ where $P$ is an AP of size $\ll |A|$ and $|S| \ll \log K$.
Open for $\mathbb{Z}$; solved over $\mathbb{F}_2^n$ by Gowers-Green-
Manners-Tao 2023.

**Cap set problem**: largest 3-AP-free subset of $\mathbb{F}_3^n$.
Croot-Lev-Pach + Ellenberg-Gijswijt 2016: $O(2.756^n)$ — a stunning
exponential improvement.

## Computational

```python
import math

# Counting 3-APs in a set
def count_3aps(S):
    s = set(S)
    return sum(1 for a in s for d in range(1, max(s) + 1)
               if a + 2*d in s and a + d in s)

print(count_3aps([1, 2, 3, 4, 5]))      # APs: (1,2,3), (1,3,5), (2,3,4), (3,4,5) = 4

# Behrend's construction: 3-AP-free set
def behrend_set(N, dim=4):
    # Points on a sphere in F_p^dim with prime p, mapped via base-p representation
    # back to integers below N — produces a 3-AP-free subset of {1, ..., N}
    p = max(int(N ** (1/dim)), 5)
    # Find a sphere radius hitting many points
    counts = {}
    for tup in __import__("itertools").product(range(p // 2), repeat=dim):
        s = sum(x*x for x in tup)
        counts.setdefault(s, []).append(tup)
    # Pick the sphere with the most points
    best = max(counts.values(), key=len)
    # Convert to integers
    out = []
    for tup in best:
        n = 0
        for x in tup:
            n = n * (2 * p) + x
        out.append(n)
    return [x for x in out if x < N]

set_3af = behrend_set(1000)
# Verify no 3-AP
def has_3ap(S):
    s = set(S)
    return any(a + d in s and a + 2*d in s
               for a in s for d in range(1, max(s) + 1))

print(len(set_3af), has_3ap(set_3af))
```

## Applied

- **Property testing** — testing whether a function is close to
  linear uses Szemerédi's regularity lemma.
- **Pseudorandomness** — explicit constructions of pseudorandom
  generators use additive-combinatorial methods.
- **Cryptography** — extractors and randomness amplification rely on
  AC results.
- **Coding theory** — linear codes over $\mathbb{F}_q$ benefit from
  cap-set-style bounds.
- **Theoretical CS — communication complexity** — Bose-Chowla
  estimates, sum-set bounds.

## Check Your Understanding

:::widget type=numeric-input prompt="Szemerédi: density implies arbitrarily long APs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Green-Tao: primes have arbitrarily long APs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cap-set problem: largest 3-AP-free subset of $\\mathbb{F}_3^n$ — bounded by $2.756^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Polynomial Freiman-Ruzsa: solved over $\\mathbb{F}_2^n$. Type 1." answer=1 explain="Yes — 2023.":::
