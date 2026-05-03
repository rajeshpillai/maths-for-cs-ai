---
strand: uncertainty
level: advanced
order: 8
title: Markov Chains
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 07-martingales
    description: Martingales
connections:
  - strand-6-uncertainty-advanced/09-uncertainty-capstone-3
applications:
  - cs: "PageRank, MCMC, hidden Markov models, reinforcement learning"
  - life: "When the future depends only on the present"
---

# Markov Chains

## Mental

A **Markov chain** is a sequence of random variables
$X_0, X_1, X_2, \ldots$ taking values in a state space $S$ such that

$$
P(X_{n+1} = j | X_n = i, X_{n-1}, \ldots) = P(X_{n+1} = j | X_n = i).
$$

The future depends on the past only through the present — the
**Markov property**.

For a finite state space, the chain is described by the **transition
matrix** $P$ where $P_{ij} = P(X_{n+1} = j | X_n = i)$. Each row sums
to 1 (a *stochastic* matrix).

## Worked example: weather

States: Sunny, Rainy. Transition matrix:

$$
P = \begin{pmatrix} 0.9 & 0.1 \\ 0.5 & 0.5 \end{pmatrix}.
$$

If today is Sunny, tomorrow is Sunny w.p. 0.9 and Rainy w.p. 0.1.

After two steps starting Sunny: $P^2_{1, :} = (0.86, 0.14)$. After
many steps: $\pi_\infty \approx (5/6, 1/6)$ — the **stationary
distribution**.

## Stationary distribution

A probability vector $\pi$ is **stationary** if $\pi P = \pi$. It's a
left eigenvector of $P$ with eigenvalue 1.

For an **irreducible aperiodic** finite chain, $\pi$ is unique and
$\pi^{(n)} \to \pi$ regardless of start state — the chain *forgets*
its initial condition.

## Convergence rate

The **spectral gap** $1 - |\lambda_2|$ where $\lambda_2$ is the second-
largest eigenvalue of $P$ controls the convergence rate:

$$
\|\pi^{(n)} - \pi\| \le C |\lambda_2|^n.
$$

Larger gap = faster mixing.

## Interactive

:::widget type=numeric-input prompt="Transition matrix rows sum to $?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="Markov property: future depends only on present. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stationary distribution: $\\pi P = \\pi$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Weather example stationary $\\pi_S = 5/6 \\approx 0.8333$. Round 4 dp." answer=0.8333 tolerance=0.005 explain="$5/6$.":::

## Symbolic

**Detailed balance**: $\pi_i P_{ij} = \pi_j P_{ji}$ — stronger than
stationarity. Reversible Markov chains satisfy detailed balance.

**MCMC**: design a chain with target distribution as stationary,
then simulate to sample from the target.

- **Metropolis-Hastings**: proposal + accept/reject step ensures
  detailed balance.
- **Gibbs sampling**: cycle through coordinates, sample each from
  conditional.

**Hitting times**: $T_A = \min\{n : X_n \in A\}$. Expected hitting
times satisfy linear equations involving $P$.

**Ergodic theorem**: for irreducible recurrent chains,

$$
\frac{1}{N} \sum_{n=1}^N f(X_n) \overset{a.s.}{\to} \mathbb{E}_\pi[f(X)].
$$

Time average = space average.

## Computational

```python
import numpy as np

# Weather Markov chain
P = np.array([[0.9, 0.1], [0.5, 0.5]])

# Iterate from initial distribution
pi = np.array([1.0, 0.0])             # start Sunny
for _ in range(100):
    pi = pi @ P
print(pi)                              # [0.8333, 0.1667]

# Stationary distribution: left eigenvector with eigenvalue 1
eigvals, eigvecs = np.linalg.eig(P.T)
print(eigvals)                         # [1, 0.4]
stationary_idx = np.argmax(eigvals.real)
pi_star = eigvecs[:, stationary_idx].real
pi_star /= pi_star.sum()
print(pi_star)                         # [0.8333, 0.1667]

# Spectral gap
gap = 1 - sorted(np.abs(eigvals))[-2]
print(gap)                             # 0.6 — fast mixing

# Simulate the chain
def simulate_chain(P, N, start=0):
    states = [start]
    s = start
    for _ in range(N):
        s = np.random.choice(len(P), p=P[s])
        states.append(s)
    return states

chain = simulate_chain(P, 10000)
print(np.mean([s == 0 for s in chain]))  # ~0.8333 — fraction of time Sunny

# PageRank: power iteration on a stochastic matrix
G = np.array([
    [0,   0.5, 0.5, 0],
    [0,   0,   1,   0],
    [0,   0,   0,   1],
    [0.5, 0,   0.5, 0],
])
G = G / G.sum(axis=1, keepdims=True)
pi = np.ones(4) / 4
for _ in range(100):
    pi = pi @ G
print(pi)                                # PageRank values
```

## Applied

- **PageRank** — Google's original ranking algorithm: stationary
  distribution of a random walk on the web's link graph.
- **MCMC** — Bayesian inference, Boltzmann machines, statistical
  physics simulations.
- **Hidden Markov models** — speech recognition, gene-finding, POS
  tagging. State is hidden; observations come from emission
  distributions.
- **Reinforcement learning** — MDPs are Markov chains with rewards
  and decisions; Bellman equations exploit Markov property.
- **Queueing theory** — birth-death chains model M/M/1 and friends.
- **Population genetics** — Wright-Fisher and Moran models are
  Markov chains.

## Check Your Understanding

:::widget type=numeric-input prompt="Markov property: future depends on past only through present. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stationary distribution is a left eigenvector with eigenvalue 1. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Detailed balance is stronger than stationarity. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="MCMC samples from a target distribution by simulating a chain whose stationary is the target. Type 1." answer=1 explain="Yes.":::
