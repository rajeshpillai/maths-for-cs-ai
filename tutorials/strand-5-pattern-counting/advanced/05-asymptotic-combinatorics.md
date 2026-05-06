---
strand: pattern-counting
level: advanced
order: 5
title: Asymptotic Combinatorics
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 04-polya-enumeration
    description: Pólya enumeration
connections:
  - strand-5-pattern-counting-advanced/06-probabilistic-method
applications:
  - cs: "Algorithm running-time estimates, hash-table load-balance"
  - life: "How fast does the count grow as n → ∞?"
---

# Asymptotic Combinatorics

## Explain Like I Am 7

Some counting answers — like the number of ways to shuffle a
hundred cards — are gigantic numbers no calculator can handle
exactly.  Asymptotic counting trades exactness for a tidy
"close-enough" formula that gets nearly perfect for big numbers.
Stirling's recipe, for instance, says $n!$ behaves almost exactly
like $\sqrt{2\pi n} (n/e)^n$.  This is how birthday-paradox surprises,
hash-table collision rates, and the running time of randomised
sorting are all estimated without crunching every detail.

## Mental

Counting often produces sequences that grow rapidly. **Asymptotic
analysis** describes the dominant rate of growth, dropping
non-dominant terms.

Big-O, Big-$\Theta$, and Big-$\Omega$ (Strand 7 Foundation) are the
basic vocabulary. Sharper asymptotic notations:

- $f(n) \sim g(n)$ ("asymptotically equal"): $\lim f(n)/g(n) = 1$.
- $f(n) = o(g(n))$: $\lim f(n)/g(n) = 0$.
- $f(n) = \omega(g(n))$: $\lim f(n)/g(n) = \infty$.

## Stirling's approximation

$$
n! \sim \sqrt{2 \pi n} \left(\frac{n}{e}\right)^n.
$$

A spectacularly useful formula. Examples:

- Binomial: $\binom{2n}{n} \sim \frac{4^n}{\sqrt{\pi n}}$.
- Catalan: $C_n \sim \frac{4^n}{n^{3/2} \sqrt \pi}$.
- $n!$ for $n = 10$: $3{,}628{,}800$. Stirling: $\sqrt{20\pi} (10/e)^{10} \approx 3{,}598{,}696$. Off by < 1%.

## Worked example: collisions in a hash table

If we hash $n$ items into $m$ slots uniformly at random:

- **Expected number of collisions** $\approx \binom{n}{2}/m$.
- **Birthday paradox**: $n \sim \sqrt m$ for ~50% chance of any
  collision.

For $m = 365$: $n \approx 23$ for $\ge 50\%$ collision probability. ✓

## Asymptotic methods

| Tool | Use |
|---|---|
| Stirling's formula | Factorials, binomials |
| Singularity analysis (Flajolet-Sedgewick) | GF coefficient asymptotics |
| Saddle-point method | Complex-analytic GF asymptotics |
| Tauberian theorems | Translate GF behaviour at $x = 1$ to coefficient growth |
| Probabilistic method (next lesson) | Existence proofs via expected value |

## Interactive

:::widget type=numeric-input prompt="Stirling: $10! \\approx \\sqrt{20\\pi}(10/e)^{10}$. Compute $\\sqrt{20\\pi} \\approx ?$. Round 4 dp." answer=7.9267 tolerance=0.005 explain="$\\approx 7.93$.":::

:::widget type=numeric-input prompt="$\\binom{2n}{n} \\sim 4^n/\\sqrt{\\pi n}$. For $n = 5$, $\\binom{10}{5}/4^5 \\approx 252/1024 \\approx 0.246$. $1/\\sqrt{5\\pi} \\approx 0.252$. Type 1 if asymptotic is good." answer=1 explain="Yes — close even at $n = 5$.":::

:::widget type=numeric-input prompt="Birthday paradox: $\\sim \\sqrt{m}$ items for 50% collision. For $m = 365$: $\\sqrt{365} \\approx ?$. Round." answer=19 tolerance=5 explain="$\\sim 19$ — actual answer is $\\approx 23$.":::

:::widget type=numeric-input prompt="Catalan $C_n \\sim 4^n / (n^{3/2} \\sqrt \\pi)$ — exponential with polynomial correction. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Singularity analysis** (Flajolet-Sedgewick): if $A(x)$ has a unique
singularity at $\rho > 0$ and behaves like $(1 - x/\rho)^{-\alpha}$
near $\rho$, then $a_n \sim \rho^{-n} n^{\alpha - 1} / \Gamma(\alpha)$.

Example: Catalan $C(x) = (1 - \sqrt{1 - 4x})/(2x)$ has singularity at
$x = 1/4$ with $\sqrt{1 - 4x}$ behaviour, giving $C_n \sim 4^n n^{-3/2}$.

**Saddle-point method**: for entire GFs (no finite singularities) like
$\exp(x)$ or labeled-tree EGFs, integrate the contour around a
saddle point of $A(x)/x^{n+1}$.

## Computational

```python
import math

def stirling(n):
    return math.sqrt(2 * math.pi * n) * (n / math.e) ** n

print(math.factorial(10), stirling(10))           # 3628800, ~3598696
print(math.factorial(20) / stirling(20))          # ratio ~1.004

# Birthday-paradox simulation
import random
def birthday_collision_avg(n, trials=10000, m=365):
    count = 0
    for _ in range(trials):
        bdays = [random.randrange(m) for _ in range(n)]
        if len(set(bdays)) < n: count += 1
    return count / trials

print(birthday_collision_avg(23))                  # ~0.5
print(birthday_collision_avg(50))                  # ~0.97

# Catalan asymptotic check
def catalan(n):
    return math.comb(2*n, n) // (n + 1)

n = 30
exact = catalan(n)
asymp = 4**n / (n**1.5 * math.sqrt(math.pi))
print(exact, asymp, exact / asymp)                 # ratio ~1
```

## Applied

- **Hash-table sizing** — load factor analysis to keep collision
  rate manageable.
- **Coupon collector** — to collect all $n$ types, expect $n H_n \sim n \ln n$
  draws.
- **Random graph thresholds** — Erdős-Rényi $G(n, p)$: phase
  transitions at specific $p$ values for properties like connectivity
  or giant-component existence.
- **Streaming algorithms** — count-min sketch, HyperLogLog use
  asymptotic analysis to set parameter scales.
- **Complexity theory** — sharper-than-O bounds matter when comparing
  $\Theta(n \log n)$ vs $\Theta(n \log \log n)$.

## Check Your Understanding

:::widget type=numeric-input prompt="Stirling: $n! \\sim \\sqrt{2\\pi n}(n/e)^n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\binom{2n}{n} \\sim 4^n/\\sqrt{\\pi n}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Coupon collector: $\\Theta(n \\log n)$ trials to collect all $n$ types. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Catalan grows like $4^n / n^{3/2}$. Type 1." answer=1 explain="Yes.":::
