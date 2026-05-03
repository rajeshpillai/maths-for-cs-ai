---
strand: uncertainty
level: master
order: 1
title: Stochastic Processes
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 00-brownian-motion
    description: Brownian motion
connections:
  - strand-6-uncertainty-master/02-large-deviations
applications:
  - cs: "Modeling time-varying randomness, queueing, signal processing"
  - life: "Random functions of time"
---

# Stochastic Processes

## Mental

A **stochastic process** $\{X_t\}_{t \in T}$ is a collection of
random variables indexed by time $t$ (continuous or discrete).

Classes:

- **Markov processes**: $\mathbb E[f(X_{t + s}) | \mathcal F_t] = \mathbb E[f(X_{t+s}) | X_t]$.
- **Martingales** (Lesson 7 Advanced): $\mathbb E[X_{t + s} | \mathcal F_t] = X_t$.
- **Stationary**: distribution invariant under time shifts.
- **Lévy processes**: independent, stationary increments
  (Brownian, Poisson, stable processes, jumps allowed).

## Poisson process

Counts events at rate $\lambda$:

- $N_t$ has $\mathrm{Poisson}(\lambda t)$.
- Inter-arrival times $\sim \mathrm{Exp}(\lambda)$, iid.
- Independent increments on disjoint intervals.

Models: arrivals at queues, photon counts, neural spikes, web
traffic.

## Continuous-time Markov chains

State space $S$ countable; transitions governed by **rate matrix**
$Q$ ($Q_{ij}$ = rate of transition $i \to j$ for $i \ne j$;
$Q_{ii} = -\sum_{j \ne i} Q_{ij}$).

Forward Kolmogorov equation: $\partial_t p_t = p_t Q$ for distribution
$p_t$.

Examples: birth-death, queues (M/M/1), epidemic SIR with random
transitions.

## Stochastic processes vs SDEs

ODEs: $\dot x = f(x, t)$ — deterministic.
SDEs: $dX = \mu(X, t) dt + \sigma(X, t) dB_t$ — diffusion.

Solutions of SDEs are stochastic processes; conversely, processes
arising from "noise + drift" are usually SDE solutions.

## Interactive

:::widget type=numeric-input prompt="Markov property: future indep of past given present. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Poisson process inter-arrivals: $\\mathrm{Exp}(\\lambda)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Continuous-time Markov chain rate matrix $Q$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lévy processes have indep stationary increments. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Hidden Markov models**: observable $Y_t$ depends on hidden state
$X_t$ (a Markov chain). Forward-backward, Viterbi, Baum-Welch
algorithms.

**Brownian bridge**: Brownian motion conditioned on $B_T = 0$;
density still Gaussian but with covariance $s(T - t)/T$ for $s < t$.

**Bessel processes**: $|B_t|$ in $\mathbb R^d$ — radial Brownian.
Important in finance (CIR model, Heston volatility).

**Subordinators**: Lévy processes with non-decreasing paths
(gamma, stable). Used to *time-change* other processes; "subordinated
Brownian motion" includes Cauchy, variance-gamma.

## Computational

```python
import numpy as np

# Poisson process simulation
def poisson_process(rate, T):
    times = []
    t = 0
    while t < T:
        t += np.random.exponential(1 / rate)
        if t < T: times.append(t)
    return times

events = poisson_process(rate=5, T=10)
print(f"Events in [0, 10] with rate 5: {len(events)} (expected 50)")

# Continuous-time Markov chain: birth-death (M/M/1 queue)
def m_m_1(arrival_rate, service_rate, T):
    state = 0
    history = [(0, state)]
    t = 0
    while t < T:
        # Time to next event
        if state == 0:
            dt = np.random.exponential(1 / arrival_rate)
            t += dt
            state = 1
        else:
            total_rate = arrival_rate + service_rate
            dt = np.random.exponential(1 / total_rate)
            t += dt
            if np.random.random() < arrival_rate / total_rate:
                state += 1
            else:
                state -= 1
        history.append((t, state))
    return history

hist = m_m_1(arrival_rate=2, service_rate=3, T=20)
states = [s for _, s in hist]
print(f"Average queue length: {np.mean(states):.2f}")
# Theory: λ/(μ - λ) = 2/(3 - 2) = 2

# Hidden Markov: Viterbi for most likely state sequence
def viterbi(obs, states, start_p, trans_p, emit_p):
    V = [{}]
    path = {}
    for s in states:
        V[0][s] = start_p[s] * emit_p[s][obs[0]]
        path[s] = [s]
    for t in range(1, len(obs)):
        V.append({})
        new_path = {}
        for s in states:
            (prob, prev) = max((V[t-1][s_prev] * trans_p[s_prev][s] * emit_p[s][obs[t]], s_prev)
                                for s_prev in states)
            V[t][s] = prob
            new_path[s] = path[prev] + [s]
        path = new_path
    n = len(obs) - 1
    (prob, state) = max((V[n][s], s) for s in states)
    return prob, path[state]

# Tiny HMM: weather (Sunny/Rainy), observe (Walk/Shop/Clean)
prob, path = viterbi(
    obs=['Walk', 'Shop', 'Clean'],
    states=['Sunny', 'Rainy'],
    start_p={'Sunny': 0.6, 'Rainy': 0.4},
    trans_p={'Sunny': {'Sunny': 0.7, 'Rainy': 0.3}, 'Rainy': {'Sunny': 0.4, 'Rainy': 0.6}},
    emit_p={'Sunny': {'Walk': 0.6, 'Shop': 0.3, 'Clean': 0.1},
            'Rainy': {'Walk': 0.1, 'Shop': 0.4, 'Clean': 0.5}}
)
print(f"Most likely path: {path}, probability {prob:.4f}")
```

## Applied

- **Queueing theory** — call centres, internet routers, hospital flow.
- **Speech recognition** — HMMs were standard pre-deep-learning;
  hybrid HMM-DNN still used.
- **Finance** — option pricing requires SDEs and stochastic processes.
- **Reinforcement learning** — MDPs are Markov processes with
  rewards; HMMs for partial observability.
- **Quantum mechanics** — quantum measurements modelled as
  stochastic processes.

## Check Your Understanding

:::widget type=numeric-input prompt="Poisson inter-arrival times: $\\mathrm{Exp}(\\lambda)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Markov: future indep past given present. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lévy process: indep stationary increments. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Viterbi finds most likely state sequence in HMM. Type 1." answer=1 explain="Yes.":::
