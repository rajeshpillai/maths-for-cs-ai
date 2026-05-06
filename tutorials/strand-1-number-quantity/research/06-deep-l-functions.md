---
strand: number-quantity
level: research
order: 6
title: L-Functions and Selberg's Class
prerequisites:
  - tier: strand-1-number-quantity-research
    slug: 05-motives
    description: Motives
connections:
  - strand-1-number-quantity-research/07-arithmetic-statistics
applications:
  - cs: "Underlies sieve theory, prime distribution"
  - life: "What is an L-function, axiomatically?"
---

# L-Functions and Selberg's Class

## Explain Like I Am 7

We've met many "infinite-choir" L-function songs scattered through
this strand.  Selberg looked at all of them and asked: "what *rules*
must any tune obey to count as a real L-function?"  He wrote a tiny
list of four polite rules — keeps a Euler-product, has a mirror
symmetry, behaves nicely at infinity — and conjectured every member of
this exclusive club secretly comes from arithmetic.  It's like
defining what counts as a "true" musical note before listing every
song that might use it.

## Mental

**Selberg's class** $\mathcal S$: the axiomatic family of "L-functions"
as Dirichlet series satisfying:

1. **Dirichlet series** $L(s) = \sum a_n / n^s$, absolutely convergent
   for $\mathrm{Re}(s) > 1$.
2. **Analytic continuation** to $\mathbb C$, possibly with finitely
   many poles.
3. **Functional equation** of the form
   $\Phi(s) = w \overline{\Phi(1 - \bar s)}$ where $\Phi$ is
   $L \cdot$ gamma factors $\cdot$ conductor power.
4. **Euler product** $L(s) = \prod_p L_p(s)$.
5. **Ramanujan condition** $|a_n| = O(n^\epsilon)$ for every
   $\epsilon$.

Familiar examples: $\zeta$, Dirichlet L's, automorphic L's,
Hasse-Weil L's of elliptic curves.

## Selberg's conjectures

Within $\mathcal S$:

- **Reducibility**: every $L \in \mathcal S$ factors uniquely into
  "primitive" L's. (Like prime factorisation.)
- **Riemann Hypothesis** for the whole class $\mathcal S$.

## Special values

L-functions encode rich arithmetic at special integer points:

- $\zeta(2k) = $ rational $\cdot \pi^{2k}$ (Bernoulli).
- $L(\chi, 1)$ for Dirichlet $\chi$: connected to class numbers
  (Dirichlet's class number formula).
- $L(E, 1)$: BSD predicts vanishing order matches rank.
- $L(s, \mathrm{Sym}^2)$, $L(s, \mathrm{Sym}^k)$: Langlands functoriality
  produces these from $L(E, s)$.

## Open conjectures

- **Generalised Riemann Hypothesis** (GRH).
- **Birch-Swinnerton-Dyer** generalisations.
- **Beilinson conjectures**: $L$-values at *non-critical* integers
  in terms of regulators of motivic cohomology.
- **Equivariant Tamagawa Number Conjecture (ETNC)**: vast unification
  of BSD-style conjectures.

## Interactive

:::widget type=numeric-input prompt="Selberg's class: 5 axioms. Type 5." answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="Ramanujan condition: $|a_n| = O(n^\\epsilon)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\zeta$, Dirichlet L's, modular form L's all in Selberg's class. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GRH: extends RH to all L-functions in $\\mathcal S$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Functoriality** (Langlands): tensor product / symmetric power /
exterior power of automorphic L's should give automorphic L's. Many
cases proven (by Cogdell-Piatetski-Shapiro, Kim, Shahidi).

**Subconvexity bounds** for L-functions: bounds slightly better than
the convexity bound from functional equation. Major analytic-number-
theory program.

**$p$-adic L-functions** — $p$-adic interpolation; Iwasawa theory
(Lesson 01).

**Random matrix conjectures**: zeros of L-functions distribute
according to specific random-matrix ensembles
(Katz-Sarnak, Keating-Snaith). Surprising universality.

## Computational

```python
from mpmath import mp, mpc, zeta, lerchphi
mp.dps = 30

# Compute zeta values
print(f"ζ(2) = {zeta(2)}")              # = π²/6
print(f"ζ(1/2 + 14.13i) = {zeta(mpc(0.5, 14.13))}")  # near first nontrivial zero

# Special L-values
# L(χ_4, 1) = π/4 (Leibniz series)
def L_chi_4(s, N=100000):
    s_complex = mpc(s) if not isinstance(s, complex) else s
    result = mpc(0)
    for n in range(1, N + 1, 2):
        result += mpc((-1)**((n - 1) // 2)) / mpc(n)**s_complex
    return result

print(f"L(χ_4, 1) ≈ {L_chi_4(1)}")     # ≈ π/4 = 0.7854
import math
print(f"π/4 = {math.pi/4}")

# Dirichlet class number formula: h(Q(sqrt(-d))) = (w sqrt|D|) / (2π) L(χ_D, 1)
# For d = 5 (D = -20): h = 2
import math
chi_D = lambda n: 0  # placeholder; actual character mod 20
# Real implementation needs PARI/GP or SageMath
```

## Applied

- **Sieve theory** — sharper L-function inputs improve sieve bounds.
- **Cryptography** — selection of primes, generators based on
  L-function-style heuristics.
- **Analytic number theory algorithms** — Riemann-Siegel formula for
  $\zeta$ on critical line.
- **Quantum chaos** — random-matrix conjectures connect L-zero
  statistics to quantum-chaotic systems.
- **Modular forms** — every modular form has an associated L-function;
  classification by modularity is central.

## Check Your Understanding

:::widget type=numeric-input prompt="Selberg's class axioms include Euler product. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\zeta(2) = \\pi^2/6$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$L(\\chi_4, 1) = \\pi/4$ (Leibniz). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GRH extends RH to all L's in $\\mathcal S$. Type 1." answer=1 explain="Yes.":::
