---
strand: number-quantity
level: master
order: 2
title: Dirichlet L-Functions
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 01-prime-number-theorem
    description: Prime number theorem
connections:
  - strand-1-number-quantity-master/03-modular-forms
applications:
  - cs: "Crypto over arithmetic progressions, primality of structured primes"
  - life: "Primes in arithmetic progressions"
---

# Dirichlet L-Functions

## Mental

A **Dirichlet character** modulo $q$ is a function $\chi : \mathbb{Z} \to \mathbb{C}$
such that:

- $\chi$ is periodic with period $q$.
- $\chi(mn) = \chi(m)\chi(n)$ (multiplicative).
- $\chi(n) = 0$ when $\gcd(n, q) > 1$.

Characters mod $q$ form a group of size $\phi(q)$.

The **Dirichlet L-function** is

$$
L(s, \chi) = \sum_{n=1}^\infty \frac{\chi(n)}{n^s}.
$$

When $\chi$ is the trivial character, $L(s, \chi)$ is essentially $\zeta(s)$.

## Dirichlet's theorem

**Theorem** (1837): for $\gcd(a, q) = 1$, there are infinitely many
primes $p \equiv a \pmod q$.

**Quantitative form** (analogue of PNT):

$$
\pi(x; q, a) = \#\{p \le x : p \equiv a \pmod q\} \sim \frac{1}{\phi(q)} \frac{x}{\ln x}.
$$

Primes are *equidistributed* among the residues coprime to $q$.

The proof uses non-vanishing of $L(1, \chi)$ for non-trivial $\chi$ —
exactly the analogue of $\zeta(s)$ having no zero on $\mathrm{Re}(s) = 1$.

## Generalised Riemann Hypothesis (GRH)

GRH: every Dirichlet L-function has all non-trivial zeros on
$\mathrm{Re}(s) = 1/2$.

Consequences (assuming GRH):

- Quantitative versions of Dirichlet's theorem with optimal error.
- Polynomial-time deterministic primality test (Miller's test).
- Faster algorithms for solving $x^2 \equiv a \pmod p$ and class
  number problems.

## Functional equation

L-functions satisfy a functional equation analogous to $\zeta$'s:

$$
\Lambda(s, \chi) = \epsilon(\chi) \Lambda(1 - s, \bar \chi),
$$

where $\Lambda$ is the *completed* L-function (with gamma factors
and conductor) and $\epsilon$ is a root number on the unit circle.

## Interactive

:::widget type=numeric-input prompt="Number of Dirichlet characters mod $q$: $\\phi(q)$. For $q = 12$: $\\phi(12) = ?$" answer=4 explain="$4$.":::

:::widget type=numeric-input prompt="Primes equidistribute mod $q$ across coprime residues: density per class $1/\\phi(q)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Dirichlet's theorem 1837. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GRH: all L-function non-trivial zeros on Re(s) = 1/2. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Class number formula**: relates $L(1, \chi_d)$ for the Kronecker
symbol $\chi_d$ to the class number of $\mathbb{Q}(\sqrt d)$.

**Heath-Brown's theorem**: assuming GRH, every odd $n > 5$ is the
sum of three primes (Vinogradov + GRH).

**Primes in AP**: Linnik's theorem — smallest prime $\equiv a \pmod q$
is $\le c q^L$ for some absolute $L$ (currently $L = 5.18$).
Conjectured $L = 1 + \epsilon$ under GRH.

**Selberg's class**: axiomatic family of L-functions including $\zeta$,
Dirichlet L's, and L-functions of modular forms (Lesson 03). Most
have conjectural Euler product, functional equation, RH-style.

## Computational

```python
import sympy as sp
from mpmath import mp, mpc, dirichlet, lerchphi

mp.dps = 25

# Define a Dirichlet character mod 4: chi(n) = 0, 1, 0, -1, 0, 1, 0, -1, ...
def chi4(n):
    n %= 4
    return [0, 1, 0, -1][n]

# L(s, chi_4) for s = 1: equals pi/4 (Leibniz)
# Sum 1 - 1/3 + 1/5 - 1/7 + ... = pi/4
import math
N = 100000
total = sum(chi4(n) / n for n in range(1, N + 1))
print(total, math.pi / 4)               # ~0.785, exact pi/4

# Primes in arithmetic progressions
from sympy import isprime
mod, target = 12, 5
primes_in_ap = [p for p in range(target, 5000, mod) if isprime(p)]
print(primes_in_ap[:10])                # 5, 17, 29, 41, 53, ...
print(len(primes_in_ap))                # equidistribute

# Density check: fraction of small primes ≡ a mod q for various a
from collections import Counter
small_primes = list(sp.primerange(2, 10**5))
mod_counts = Counter(p % 12 for p in small_primes if math.gcd(p, 12) == 1)
print(mod_counts)                       # roughly equal across {1, 5, 7, 11}
```

## Applied

- **Primality testing** — Miller's deterministic primality test runs
  in polynomial time *under GRH*; without GRH, only Miller-Rabin
  probabilistic.
- **Class field theory** — L-functions encode arithmetic of number
  fields, used in algebraic-number-theoretic algorithms (BSGS,
  index calculus).
- **Cryptography** — selection of "structured primes" (Mersenne,
  Sophie Germain) uses density estimates from Dirichlet's theorem.
- **Sieve theory** — twin primes, Goldbach progress (Helfgott's
  ternary Goldbach proof) crucially uses L-functions.

## Check Your Understanding

:::widget type=numeric-input prompt="Dirichlet characters mod $q$: $\\phi(q)$ of them. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Dirichlet's theorem: infinitely many primes in any AP with coprime first term. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="GRH gives polynomial-time deterministic primality. Type 1." answer=1 explain="Yes — Miller's test.":::

:::widget type=numeric-input prompt="$L(s, \\chi)$ has Euler product. Type 1." answer=1 explain="Yes.":::
