---
strand: uncertainty
level: advanced
order: 7
title: Martingales
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 06-clt-rigorous
    description: CLT
connections:
  - strand-6-uncertainty-advanced/08-markov-chains
applications:
  - cs: "Online learning, gambling theory, financial mathematics"
  - life: "A 'fair game' over time"
---

# Martingales

## Explain Like I Am 7

A **martingale** is a fair game where on average you neither win
nor lose — your wealth tomorrow, on average given everything you
know today, equals your wealth today.  Picture a coin-flip game
where heads adds a dollar and tails subtracts a dollar.  No matter
how cleverly you decide when to stop playing, you can't expect to
walk away richer than you started.  This "no free lunch" idea
underpins gambling theory, financial pricing, and modern online
learning algorithms — it's the math of fairness through time.

## Mental

A **martingale** is a stochastic process $X_0, X_1, X_2, \ldots$
satisfying

$$
\mathbb{E}[X_{n+1} | \mathcal F_n] = X_n,
$$

where $\mathcal F_n$ is the information available at time $n$.
Read: "best prediction of $X_{n+1}$ given the past is $X_n$."

Models a **fair game**: your expected wealth tomorrow equals your
wealth today.

**Submartingale**: $\ge X_n$ (favorable game).
**Supermartingale**: $\le X_n$ (unfavorable game).

## Examples

- **Symmetric random walk**: $S_n = \sum_{i \le n} \xi_i$ with
  $\xi_i = \pm 1$ each with probability $1/2$. Martingale.
- **Wealth in a fair game**: $W_n$ after $n$ bets at fair odds.
- **Conditional expectation of a fixed RV**:
  $X_n = \mathbb{E}[Y | \mathcal F_n]$ — "Doob martingale."
- **Likelihood ratios** in hypothesis testing.

## Optional stopping theorem

For a martingale $X_n$ and a stopping time $\tau$ (decision to stop
that depends only on past), under nice conditions:

$$
\mathbb{E}[X_\tau] = \mathbb{E}[X_0].
$$

"Stopping doesn't help on average in a fair game" — formalises the
intuitive truth that no clever exit strategy beats the house odds.

**Sufficient conditions** for optional stopping: bounded $\tau$, or
bounded $X_n$, or finite $\mathbb{E}[\tau]$ with bounded increments.

## Worked example: gambler's ruin

You start with $a$, play fair coin flips for \$1 each. What's the
probability of reaching \$N before going to \$0?

Wealth $W_n$ is a martingale. Stopping time $\tau$ = first hit of $0$
or $N$. By optional stopping:

$\mathbb{E}[W_\tau] = a \Rightarrow N \cdot P(\text{reach } N) + 0 = a$
$\Rightarrow P(\text{reach } N) = a/N.$

Probability of doubling money before bust: $a / (2a) = 1/2$.

## Interactive

:::widget type=numeric-input prompt="Martingale: $\\mathbb{E}[X_{n+1} | \\mathcal F_n] = X_n$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Symmetric random walk is a martingale. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gambler's ruin probability of reaching \\$N from \\$10 in fair game: $10/N$. For $N = 100$: $0.1$. Type 0.1." answer=0.1 explain="$0.1$.":::

:::widget type=numeric-input prompt="Optional stopping: $\\mathbb{E}[X_\\tau] = \\mathbb{E}[X_0]$ — under conditions. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Doob's maximal inequality**: for a non-negative submartingale,

$$
P\left(\max_{k \le n} X_k \ge \lambda\right) \le \frac{\mathbb{E}[X_n]}{\lambda}.
$$

A Markov-style bound on the running max. Used everywhere in
stochastic analysis.

**Martingale convergence theorem**: every $L^1$-bounded martingale
converges almost surely. Cornerstone of modern probability.

**Azuma-Hoeffding inequality**: for a martingale with bounded
differences $|X_k - X_{k-1}| \le c_k$,

$$
P(|X_n - X_0| \ge t) \le 2 \exp\left(-\frac{t^2}{2 \sum c_k^2}\right).
$$

A concentration inequality for martingales — applies to
algorithm-analysis settings.

## Computational

```python
import numpy as np

# Symmetric random walk
N = 1000
steps = np.random.choice([-1, 1], N)
walk = np.cumsum(steps)
print(walk[:10])

# Wealth in gambler's ruin: starting at 10, target 100, ruin at 0
def gamblers_ruin_simulate(start, target, trials=10000):
    wins = 0
    for _ in range(trials):
        w = start
        while 0 < w < target:
            w += np.random.choice([-1, 1])
        if w >= target: wins += 1
    return wins / trials

print(gamblers_ruin_simulate(10, 100))           # ~0.1

# Martingale property: simulate and verify
T = 1000
trials = 5000
final_wealths = []
for _ in range(trials):
    w = 0
    for _ in range(T):
        w += np.random.choice([-1, 1])
    final_wealths.append(w)

print(np.mean(final_wealths))                    # ~0 — martingale property
print(np.std(final_wealths))                     # ~sqrt(T) = 31.6
```

## Applied

- **Mathematical finance** — Black-Scholes pricing uses martingale
  representations; the discounted asset price under the risk-neutral
  measure is a martingale.
- **Online learning** — regret bounds in adversarial settings use
  martingale concentration (Azuma-Hoeffding).
- **MCMC** — convergence of Markov chains via martingale methods
  (Doeblin coupling).
- **Hypothesis testing** — Wald's sequential probability ratio test
  uses likelihood-ratio martingales.
- **Random graph theory** — Doob martingales prove concentration of
  graph parameters around their expectations.

## Check Your Understanding

:::widget type=numeric-input prompt="Symmetric random walk on $\\mathbb{Z}$ is a martingale. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Optional stopping $\\Rightarrow \\mathbb{E}[X_\\tau] = \\mathbb{E}[X_0]$. Type 1." answer=1 explain="Yes — under conditions.":::

:::widget type=numeric-input prompt="Martingale convergence theorem: $L^1$-bounded martingales converge a.s. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Azuma-Hoeffding bounds martingale deviations. Type 1." answer=1 explain="Yes.":::
