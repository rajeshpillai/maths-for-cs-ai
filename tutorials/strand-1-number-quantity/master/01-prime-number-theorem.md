---
strand: number-quantity
level: master
order: 1
title: The Prime Number Theorem
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 00-riemann-zeta
    description: Riemann zeta function
connections:
  - strand-1-number-quantity-master/02-l-functions
applications:
  - cs: "Prime-density estimates for crypto and pseudoprime tests"
  - life: "How rare are primes asymptotically?"
---

# The Prime Number Theorem

## Mental

Define $\pi(x) = $ number of primes $\le x$.

**Prime Number Theorem (PNT)**:

$$
\pi(x) \sim \frac{x}{\ln x} \quad \text{as } x \to \infty.
$$

That is, $\pi(x) \cdot \frac{\ln x}{x} \to 1$.

**Sharper form**: $\pi(x) = \mathrm{Li}(x) + R(x)$ where
$\mathrm{Li}(x) = \int_2^x \frac{dt}{\ln t}$ and $R(x)$ is a smaller
error term. Under RH, $R(x) = O(x^{1/2} \log x)$.

## Why prime density tracks $1/\ln x$

Heuristic: a "random integer" near $x$ is prime with probability
$\sim 1 / \ln x$ (since "primality" means "not divisible by primes up
to $\sqrt{x}$," and Mertens gives $\sum_{p \le \sqrt{x}} 1/p \approx \ln \ln \sqrt{x}$).

This isn't a proof — but it predicts the right answer.

## Worked example

| $x$ | $\pi(x)$ | $x / \ln x$ | $\mathrm{Li}(x)$ |
|---|---|---|---|
| $10^3$ | 168 | 145 | 178 |
| $10^6$ | 78498 | 72382 | 78627 |
| $10^9$ | 50847534 | 48254942 | 50849234 |

$\mathrm{Li}(x)$ tracks $\pi(x)$ much better than $x / \ln x$.

## Proof outline

The standard analytic proof (Hadamard / de la Vallée Poussin, 1896)
proves PNT from:

1. $\zeta(s)$ has no zeros on $\mathrm{Re}(s) = 1$.
2. Tauberian theorems convert this into the asymptotic for $\pi$.

Modern proofs (Newman 1980) are shorter; Selberg/Erdős 1948 gave
an "elementary" (no complex analysis) proof.

## Interactive

:::widget type=numeric-input prompt="$\\pi(10^3) = 168$. Estimate $10^3 / \\ln(10^3) = 1000/6.908 = ?$. Round." answer=145 tolerance=10 explain="$\\approx 145$.":::

:::widget type=numeric-input prompt="PNT: $\\pi(x) \\sim x / \\ln x$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Density of primes near $x$: $\\sim 1/\\ln x$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Skewes' constant: smallest $x$ where $\\pi(x) > \\mathrm{Li}(x)$. Astronomically large. Type 1 if true." answer=1 explain="Yes — once thought $> 10^{300}$, now known $\\sim 10^{316}$.":::

## Symbolic

**Chebyshev functions**: $\theta(x) = \sum_{p \le x} \log p$,
$\psi(x) = \sum_{p^k \le x} \log p$. PNT equivalent to
$\psi(x) \sim x$.

**Explicit formula** (Riemann-von Mangoldt):

$$
\psi(x) = x - \sum_\rho \frac{x^\rho}{\rho} - \log(2\pi) - \frac{1}{2}\log(1 - x^{-2}),
$$

summed over non-trivial zeros $\rho$ of $\zeta$. The error term in
PNT is *literally* the contribution from $\zeta$ zeros.

**RH ⇔ optimal PNT error**: $\psi(x) - x = O(x^{1/2}\log^2 x)$ if
and only if RH.

## Computational

```python
import math
from sympy import primepi, Symbol, log, integrate

# Empirical PNT
def prime_count(N):
    sieve = [True] * (N + 1)
    sieve[0] = sieve[1] = False
    for i in range(2, int(N**0.5) + 1):
        if sieve[i]:
            for j in range(i*i, N + 1, i):
                sieve[j] = False
    return sum(sieve)

for k in range(2, 7):
    N = 10**k
    pi_x = prime_count(N)
    pnt = N / math.log(N)
    print(f"N=10^{k}: pi={pi_x:>9d}  N/ln N={pnt:>11.0f}  ratio={pi_x/pnt:.4f}")

# Logarithmic integral
def Li(x):
    # Approximate Li(x) via numerical integration
    from scipy.integrate import quad
    val, _ = quad(lambda t: 1/math.log(t), 2, x)
    return val

print(Li(1000), prime_count(1000))           # 178, 168
print(Li(1e6), prime_count(int(1e6)))        # 78627, 78498
```

## Applied

- **RSA security analysis** — number of primes up to $2^{1024}$
  determines difficulty of finding RSA primes; PNT gives the count.
- **Pseudoprime tests** — Miller-Rabin's success rate analysed via
  prime density.
- **Cryptanalytic algorithms** — number-field sieve, Pollard rho
  running times depend on prime distribution.
- **Number-theoretic transforms** — choice of NTT-friendly primes
  (those of form $k \cdot 2^n + 1$) constrained by PNT-style
  density.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\pi(x) \\sim x / \\ln x$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\mathrm{Li}(x)$ is a sharper estimate than $x / \\ln x$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Riemann's explicit formula expresses $\\psi(x)$ via $\\zeta$ zeros. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="RH ⇔ optimal PNT error $O(x^{1/2}\\log^2 x)$. Type 1." answer=1 explain="Yes.":::
