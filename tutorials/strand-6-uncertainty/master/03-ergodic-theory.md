---
strand: uncertainty
level: master
order: 3
title: Ergodic Theory
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 02-large-deviations
    description: Large deviations
connections:
  - strand-6-uncertainty-master/04-information-theory-deeper
applications:
  - cs: "MCMC convergence, dynamical systems, ML training dynamics"
  - life: "Long-run averages of random / dynamical systems"
---

# Ergodic Theory

## Mental

A **measure-preserving transformation** $T : (\Omega, \mathcal F, \mu) \to (\Omega, \mathcal F, \mu)$
satisfies $\mu(T^{-1} A) = \mu(A)$ for all $A \in \mathcal F$.

A system $(T, \mu)$ is **ergodic** if every $T$-invariant set has
measure 0 or 1: no non-trivial invariant subsets.

Examples:

- **Bernoulli shift**: $\Omega = \{0, 1\}^{\mathbb N}$, $\mu = $ iid
  $\mathrm{Bernoulli}(p)^{\otimes \mathbb N}$, $T$ = shift left. Ergodic.
- **Rotation** of circle by irrational angle.
- **Markov chain** with unique stationary distribution (Lesson 8
  Advanced).

## Birkhoff's ergodic theorem

For an ergodic measure-preserving system:

$$
\frac{1}{n}\sum_{k=0}^{n - 1} f(T^k x) \overset{a.s.}{\to} \int_\Omega f \, d\mu.
$$

**Time average = space average** — the key takeaway.

For random processes: time averages of stationary ergodic sequences
converge to ensemble averages. Strong law of large numbers
generalised.

## Worked example: irrational rotation

$T(x) = x + \alpha \mod 1$ for irrational $\alpha$. This rotation is
ergodic — every orbit is dense.

For $f(x) = \mathbb 1_{[a, b]}$: time average
$\frac{1}{n} \#\{k < n : T^k 0 \in [a, b]\} \to b - a$.

Equidistribution theorem (Weyl): orbits of irrational rotations
distribute uniformly.

## Mixing

Stronger than ergodic: **mixing** means
$\mu(A \cap T^{-n} B) \to \mu(A) \mu(B)$. In words, $T^n B$ becomes
asymptotically *independent* of $A$.

For Markov chains: ergodic + aperiodic ⇔ mixing.

## Interactive

:::widget type=numeric-input prompt="Birkhoff: time average → space average. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ergodic: invariant sets have measure 0 or 1. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Irrational rotation is ergodic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mixing implies ergodic; converse may fail. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Furstenberg's correspondence**: connect ergodic-theoretic
recurrence to combinatorial Szemerédi-style theorems. Foundation of
modern additive combinatorics.

**Multiple recurrence**: ergodic version of Szemerédi (Furstenberg
1977).

**Khintchine recurrence**: $\sum \mu(A \cap T^{-n} A) > 0$ for
positive-measure $A$.

**Spectral theory**: ergodic ⇔ eigenvalue 1 of $U_T$ (Koopman
operator) is simple.

## Computational

```python
import numpy as np

# Birkhoff ergodic theorem demo: irrational rotation
alpha = np.sqrt(2) - 1   # irrational
N = 100000
orbits = np.cumsum(np.full(N, alpha)) % 1

# Time average: fraction of time in [0.3, 0.5]
in_interval = np.mean((orbits > 0.3) & (orbits < 0.5))
print(f"Time average: {in_interval:.4f} (theoretical: 0.2)")

# Different intervals
for a, b in [(0, 0.1), (0.4, 0.6), (0.9, 1)]:
    avg = np.mean((orbits > a) & (orbits < b))
    print(f"[{a}, {b}]: time avg = {avg:.4f}, expected = {b - a}")

# Markov chain ergodic theorem
P = np.array([[0.7, 0.3], [0.4, 0.6]])     # ergodic, aperiodic
N = 100000
state = 0
visits = [0, 0]
for _ in range(N):
    visits[state] += 1
    state = np.random.choice([0, 1], p=P[state])

# Empirical state distribution
print(f"Time average: {[v/N for v in visits]}")
# Theoretical stationary: solve π P = π
eig_vals, eig_vecs = np.linalg.eig(P.T)
idx = np.argmin(np.abs(eig_vals - 1))
pi = eig_vecs[:, idx].real
pi = pi / pi.sum()
print(f"Theoretical π: {pi}")
```

## Applied

- **MCMC sampling** — relies on ergodic theorem for convergence:
  time average over chain = posterior expectation.
- **Statistical mechanics** — ensemble vs time averages = ergodic
  hypothesis (justified for many systems).
- **Dynamical systems** — chaotic systems often ergodic; provides
  framework for "predicting averages despite unpredictable individual
  trajectories."
- **ML training dynamics** — SGD analysed via ergodic theorems on
  parameter trajectories.
- **Number theory** — Furstenberg correspondence powers progressions
  in primes (Green-Tao).

## Check Your Understanding

:::widget type=numeric-input prompt="Birkhoff: time average = space average a.s. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Irrational rotations are ergodic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mixing $\\Rightarrow$ ergodic. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MCMC convergence relies on ergodicity. Type 1." answer=1 explain="Yes.":::
