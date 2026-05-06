---
strand: number-quantity
level: master
order: 0
title: The Riemann Zeta Function
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 09-number-theory-capstone
    description: Number theory advanced capstone
connections:
  - strand-1-number-quantity-master/01-prime-number-theorem
applications:
  - cs: "Crypto parameter analysis, prime-counting heuristics"
  - life: "The single function whose zeros may unlock prime distribution"
---

# The Riemann Zeta Function

## Explain Like I Am 7

Imagine an infinite choir where the first singer hums at full volume,
the second at half, the third at a third, and so on forever.  Their
combined hum has a "loudness" that depends on how quickly the singers
get quiet — and Euler discovered the wondrous fact that this loudness
can also be written as a tune sung *only by the prime numbers*.  So
the secret heartbeat of the primes is hidden inside one beautiful
sound, and the unsolved Riemann Hypothesis asks where this sound goes
silent on a hidden complex stage.

## Mental

For complex $s$ with $\mathrm{Re}(s) > 1$:

$$
\zeta(s) = \sum_{n=1}^\infty \frac{1}{n^s}.
$$

Euler showed this equals an **infinite product over primes**:

$$
\zeta(s) = \prod_p \frac{1}{1 - p^{-s}}.
$$

This identity — proved by expanding each factor as a geometric series
and using unique factorisation — connects the additive structure of
$\mathbb{N}$ (the sum) to the multiplicative structure of the primes
(the product).

## Analytic continuation

$\zeta(s)$ extends meromorphically to all of $\mathbb{C}$. The
extended function:

- Has a single pole at $s = 1$ with residue 1.
- Satisfies the **functional equation**:

$$
\zeta(s) = 2^s \pi^{s-1} \sin\left(\frac{\pi s}{2}\right) \Gamma(1 - s) \, \zeta(1 - s).
$$

This relates values at $s$ and $1 - s$ — a beautiful symmetry around
the line $\mathrm{Re}(s) = 1/2$.

## Special values

- $\zeta(2) = \pi^2/6$ (Basel problem).
- $\zeta(4) = \pi^4/90$.
- $\zeta(2k) = $ rational $\cdot \pi^{2k}$ for positive integer $k$
  (Bernoulli numbers).
- $\zeta(-1) = -1/12$ (sums "$1 + 2 + 3 + \ldots$" via continuation).
- $\zeta(0) = -1/2$.

The negative integer values are rational; the odd positive integer
values $\zeta(3), \zeta(5), \ldots$ are mostly mysterious. Apéry
proved $\zeta(3)$ is irrational (1978); irrationality of $\zeta(5)$
is still open.

## The Riemann Hypothesis

**Trivial zeros**: $\zeta$ vanishes at $s = -2, -4, -6, \ldots$
(from the $\sin$ in the functional equation).

**Non-trivial zeros**: zeros in the critical strip $0 < \mathrm{Re}(s) < 1$.

**Riemann Hypothesis (RH)**: every non-trivial zero has
$\mathrm{Re}(s) = 1/2$.

Verified for the first $10^{13}$ zeros. **Worth $1{,}000{,}000$**
(Clay Millennium Prize). RH equivalent to many statements about
prime distribution.

## Interactive

:::widget type=numeric-input prompt="$\\zeta(2) = \\pi^2/6 \\approx ?$. Round 4 dp." answer=1.6449 tolerance=0.005 explain="$\\approx 1.6449$.":::

:::widget type=numeric-input prompt="$\\zeta(s) = \\prod_p (1 - p^{-s})^{-1}$ for $\\mathrm{Re}(s) > 1$ — Euler product. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\zeta(-1) = -1/12 \\approx -0.0833$. Round 4 dp." answer=-0.0833 tolerance=0.005 explain="$\\approx -0.0833$.":::

:::widget type=numeric-input prompt="Riemann hypothesis: all non-trivial zeros on critical line $\\mathrm{Re}(s) = 1/2$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Mertens function** $M(n) = \sum_{k \le n} \mu(k)$. RH equivalent
to $M(n) = O(n^{1/2 + \epsilon})$. Bounded $M$ on average.

**Nontrivial zero distribution**: Riemann-von Mangoldt formula gives

$$
N(T) = \frac{T}{2\pi} \log \frac{T}{2\pi} - \frac{T}{2\pi} + O(\log T),
$$

the count of zeros with imaginary part in $[0, T]$.

**Pair correlation**: Montgomery-Odlyzko conjecture says zero
spacings match the Gaussian Unitary Ensemble — random-matrix
statistics, surprising deep link to quantum physics.

## Computational

```python
import sympy as sp
import numpy as np
from mpmath import mp, mpc, zeta, zetazero

# Compute zeta values
mp.dps = 30                                      # 30 digits of precision
print(zeta(2))                                    # ~1.644934... = pi^2/6
print(zeta(3))                                    # ~1.202056... = Apery's constant
print(zeta(-1))                                   # -0.083333... = -1/12

# Functional-equation symmetry: zeta(s) and zeta(1-s)
def chi(s):
    return mpc(2)**s * mpc(np.pi)**(s - 1) * sp.sin(np.pi * s / 2) * sp.gamma(1 - s)

# First few non-trivial zeros (imaginary parts)
for n in range(1, 6):
    print(f"Zero {n}: {zetazero(n)}")
# Real part is 1/2 for all (verified up to 10^13)

# Visualise zeros by computing |zeta(1/2 + it)| over a range of t
for t in [14.13, 21.02, 25.01, 30.42, 32.93]:
    s = mpc(0.5, t)
    print(f"zeta(1/2 + {t}i) = {abs(zeta(s)):.4e}")  # near zero at known zero heights
```

## Applied

- **Cryptography parameter analysis** — prime distribution underlies
  RSA / ECDSA security; $\zeta$ informs estimates.
- **Prime-counting algorithms** — sieve methods analyse via $\zeta$
  zeros (e.g., Meissel-Mertens-Deléglise-Rivat).
- **Random matrix theory** — quantum chaos connects $\zeta$ zeros to
  energy levels of complex quantum systems (Berry-Keating).
- **Sieve theory** — bounds on twin primes, Goldbach, etc., depend on
  $\zeta$-style L-functions.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\zeta(2) = \\pi^2/6$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Euler product $\\zeta(s) = \\prod_p (1 - p^{-s})^{-1}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="RH worth \\$1M Clay prize. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Apéry proved $\\zeta(3)$ irrational. Type 1." answer=1 explain="Yes — 1978.":::
