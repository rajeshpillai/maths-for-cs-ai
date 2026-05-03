---
strand: pattern-counting
level: advanced
order: 6
title: The Probabilistic Method
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 05-asymptotic-combinatorics
    description: Asymptotic combinatorics
connections:
  - strand-5-pattern-counting-advanced/07-graph-theory-advanced
applications:
  - cs: "Randomised algorithms, error-correcting code existence"
  - life: "Proving things exist by showing random doesn't fail too often"
---

# The Probabilistic Method

## Mental

To prove a combinatorial object **exists**, sometimes the cleanest
strategy is:

1. Sample randomly from a candidate space.
2. Compute the expected value of some property.
3. Show the expected value is good enough that *some* sample meets the
   bar.

If $\mathbb{E}[X] \ge c$, there must be a particular sample with
$X \ge c$. The "average is at least $c$" argument forces a witness.

This **non-constructive** technique was Erdős's signature.

## Worked example: Ramsey lower bound

**Ramsey's theorem**: $R(s, s)$ — the smallest $n$ such that every
2-coloring of $K_n$'s edges contains a monochromatic $K_s$.

**Probabilistic lower bound** (Erdős, 1947): if
$\binom{n}{s} 2^{1 - \binom{s}{2}} < 1$, then $R(s, s) > n$.

Argument: 2-colour $K_n$'s edges uniformly at random. For a fixed
$s$-clique, probability of being monochromatic is $2 \cdot 2^{-\binom{s}{2}}$.
Expected number of monochromatic $s$-cliques:
$\binom{n}{s} \cdot 2^{1 - \binom{s}{2}}$.

If this is $< 1$, *some* colouring has zero monochromatic $s$-cliques.

For $s = 5$: $n \le 96$ achievable. Best known
$R(5, 5) \ge 43$. So probabilistic bound improves on hand
construction.

## Linearity of expectation

The most useful tool: $\mathbb{E}[X + Y] = \mathbb{E}[X] + \mathbb{E}[Y]$
*regardless of dependence*.

Worked example: a random permutation of $\{1, \ldots, n\}$ has
expected $1$ fixed point.

Proof: $X = \sum X_i$ where $X_i = \mathbb{1}[\text{position } i \text{ fixed}]$.
$\mathbb{E}[X_i] = 1/n$. So $\mathbb{E}[X] = n \cdot 1/n = 1$.

## Variance and second-moment method

To show "$X > 0$ with high probability," control $\mathrm{Var}(X)$:

$$
P(X = 0) \le \frac{\mathrm{Var}(X)}{\mathbb{E}[X]^2}.
$$

Used in Erdős-Rényi random-graph thresholds.

## Interactive

:::widget type=numeric-input prompt="Expected fixed points in random permutation of $\\{1, \\ldots, n\\}$: $?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="Linearity: $\\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y]$ even for dependent $X, Y$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Probabilistic method gives existence non-constructively. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Erdős showed $R(s,s) > 2^{s/2}$ via the probabilistic method. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Lovász Local Lemma**: even when "bad events" are dependent, if
each depends on few others and probabilities are low enough, *all*
bad events can be avoided simultaneously. The constructive
algorithmic version (Moser-Tardos, 2010) gives polynomial-time
SAT-style algorithms.

**Concentration inequalities** (Markov, Chebyshev, Chernoff,
Hoeffding) bound deviations of random variables from their mean.

**Random graphs** $G(n, p)$ — keep each edge with probability $p$.
Phase transitions: connectivity threshold at $p = \log n / n$,
giant-component threshold at $p = 1/n$.

## Computational

```python
import random
from math import comb, log2

# Expected fixed points
def expected_fixed_points(n, trials=10000):
    avg = 0
    for _ in range(trials):
        p = random.sample(range(n), n)
        avg += sum(1 for i in range(n) if p[i] == i)
    return avg / trials

print(expected_fixed_points(100))    # ~1

# Probabilistic Ramsey lower bound: find largest n with E[mono cliques] < 1
def expected_mono_cliques(n, s):
    return comb(n, s) * 2**(1 - comb(s, 2))

# For s = 5
for n in range(20, 30):
    print(n, expected_mono_cliques(n, 5))
# Find n where expected drops below 1

# Lovász local lemma in action: SAT
# A 3-SAT instance is satisfiable if each clause shares variables
# with at most ~2^3/e ≈ 2.94 other clauses (Mosers-Tardos)

# Concentration: Hoeffding's inequality demo
def hoeffding_bound(n, t):
    # P(|sample mean - true mean| > t) <= 2 exp(-2 n t^2)
    import math
    return 2 * math.exp(-2 * n * t**2)

print(hoeffding_bound(1000, 0.05))    # tight bound on sample mean deviation
```

## Applied

- **Randomised algorithms** — Karger's min-cut, Karger-Stein,
  Freivalds' matrix verification, Miller-Rabin primality.
- **Probabilistic data structures** — Bloom filters, count-min
  sketch, HyperLogLog all use concentration arguments for accuracy.
- **Coding theory** — random codes meet capacity asymptotically
  (Shannon's existence proof was probabilistic).
- **Constraint-satisfaction problems** — algorithmic LLL gives
  polynomial-time decision procedures for restricted SAT instances.
- **PAC learning** — VC dimension and uniform-convergence theorems
  use concentration for generalization bounds.

## Check Your Understanding

:::widget type=numeric-input prompt="Linearity of expectation works for dependent random variables. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Probabilistic method proves existence. Type 1." answer=1 explain="Yes — by averaging.":::

:::widget type=numeric-input prompt="Hoeffding bound: $P(|\\bar X - \\mu| > t) \\le 2 e^{-2 n t^2}$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Random graph $G(n, p)$ becomes connected at $p \\sim \\log n / n$. Type 1." answer=1 explain="Yes.":::
