# Markov Chains and Markov Decision Processes

## Intuition

A **Markov chain** models systems where the future depends only on the
present, not the past ("memoryless").  Weather, stock prices (simplified),
and PageRank are Markov chains.  **MDPs** add actions and rewards — they're
the mathematical framework for reinforcement learning.

## Prerequisites

- Tier 4, Lesson 1: Probability Axioms
- Tier 2, Lesson 4: Matrix Multiplication
- Tier 2, Lesson 13: Eigenvalues

## From First Principles

### Markov chain

States $S = \{s_1, \ldots, s_n\}$ with transition probabilities $P(s_j | s_i) = p_{ij}$.

**Transition matrix** $\mathbf{P}$: row $i$ = probabilities of moving from state $i$.

### Pen & paper: Weather model

States: Sunny (S), Rainy (R).

$$\mathbf{P} = \begin{pmatrix} 0.8 & 0.2 \\ 0.4 & 0.6 \end{pmatrix}$$

If today is sunny: 80% chance tomorrow is sunny, 20% rainy.

**Two days ahead:** $\mathbf{P}^2 = \begin{pmatrix} 0.72 & 0.28 \\ 0.56 & 0.44 \end{pmatrix}$

### Steady state

The **stationary distribution** $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}\mathbf{P} = \boldsymbol{\pi}$.

For our weather: $\pi_S(0.8) + \pi_R(0.4) = \pi_S$ and $\pi_S + \pi_R = 1$.

$0.2\pi_S = 0.4\pi_R$ → $\pi_S = 2\pi_R$ → $\pi_S = 2/3, \pi_R = 1/3$.

Long-run: sunny 2/3 of the time. This is the **eigenvector for eigenvalue 1**.

### Markov Decision Process (MDP)

An MDP adds **actions** and **rewards** to a Markov chain:

$(S, A, P, R, \gamma)$: states, actions, transition probabilities, rewards, discount factor.

**Goal:** Find a policy $\pi(s) \to a$ that maximises expected cumulative reward:

$$V^\pi(s) = E\left[\sum_{t=0}^{\infty} \gamma^t r_t \mid s_0 = s, \pi\right]$$

### Bellman equation

$$V^*(s) = \max_a \left[R(s, a) + \gamma \sum_{s'} P(s'|s,a) V^*(s')\right]$$

The optimal value = best immediate reward + discounted future value.

### Pen & paper: Simple grid world

2 states, 2 actions, $\gamma = 0.9$:

- State A: action "stay" → reward 1, stay in A. Action "go" → reward 0, move to B.
- State B: action "stay" → reward 2, stay in B. Action "go" → reward 0, move to A.

If we always stay: $V(A) = 1 + 0.9(1) + 0.9^2(1) + \cdots = \frac{1}{1-0.9} = 10$

$V(B) = \frac{2}{1-0.9} = 20$

## Python Verification

```python
# ── Markov Chains & MDPs ────────────────────────────────────

# Weather Markov chain
print("=== Weather Markov Chain ===")
P = [[0.8, 0.2], [0.4, 0.6]]

# Simulate
state = 0  # start sunny
counts = [0, 0]
import random
random.seed(42)
for _ in range(10000):
    counts[state] += 1
    r = random.random()
    state = 0 if r < P[state][0] else 1

print(f"  Steady state (simulation): S={counts[0]/10000:.3f}, R={counts[1]/10000:.3f}")
print(f"  Steady state (analytical): S=0.667, R=0.333")

# Matrix power: P^n
def mat_mul_2x2(A, B):
    return [[A[0][0]*B[0][0]+A[0][1]*B[1][0], A[0][0]*B[0][1]+A[0][1]*B[1][1]],
            [A[1][0]*B[0][0]+A[1][1]*B[1][0], A[1][0]*B[0][1]+A[1][1]*B[1][1]]]

print(f"\n=== P^n convergence ===")
Pn = [[1,0],[0,1]]  # identity
for n in range(1, 11):
    Pn = mat_mul_2x2(Pn, P)
    if n in [1, 2, 5, 10]:
        print(f"  P^{n}: [{Pn[0][0]:.4f}, {Pn[0][1]:.4f}]")

# Bellman equation: simple 2-state MDP
print(f"\n=== Value iteration (2-state MDP) ===")
gamma = 0.9
V = [0.0, 0.0]  # V(A), V(B)

for iteration in range(20):
    V_new = [
        max(1 + gamma * V[0], 0 + gamma * V[1]),  # A: stay or go
        max(2 + gamma * V[1], 0 + gamma * V[0]),  # B: stay or go
    ]
    if iteration < 5 or iteration == 19:
        print(f"  iter {iteration:2d}: V(A)={V_new[0]:.2f}, V(B)={V_new[1]:.2f}")
    V = V_new
print(f"  Optimal: V(A)=10, V(B)=20 (always stay)")
```

## Connection to CS / Games / AI / Business / Industry

- **AI / ML.** Markov Decision Processes are the **mathematical foundation
  of reinforcement learning** — the Bellman equation derived above is
  exactly what AlphaGo, robot-arm controllers and DeepMind's data-centre
  cooling agent optimise. Hidden Markov Models powered the first generation
  of speech recognition (Dragon, early Siri) and still underlie modern
  Bioconductor gene-finders.
- **CS / Software.** **PageRank** — Google's original ranking algorithm —
  is the stationary distribution of a Markov chain on the web graph plus a
  damping term. The same maths runs Twitter's "who-to-follow" and every
  citation-importance ranking.
- **Games.** NPC behaviour trees, weather and crop cycles in farming sims,
  and procedurally-generated dialogue all use small Markov chains. Random
  battle-encounter rates in JRPGs are literally Markov transition
  probabilities.
- **Business / Finance.** **Credit-rating migration matrices** (Moody's,
  S&P) are Markov chains: the probability of an A-rated bond becoming BBB
  next year. Customer-state models (active → at-risk → churned → won-back)
  drive retention strategy at every SaaS company.
- **Engineering / Industry.** **Warehouse robots** (Amazon, Ocado) and
  driverless taxis solve MDPs in real time. Elevator dispatch in tall
  buildings, hospital bed allocation, and food-delivery rider routing all
  reduce to Markov-chain or MDP solvers.

## Check Your Understanding

1. **Pen & paper:** Compute $\mathbf{P}^2$ for the weather model. If it's rainy today, what is $P(\text{sunny in 2 days})$?
2. **Pen & paper:** Find the steady-state distribution for $\mathbf{P} = \begin{pmatrix} 0.7 & 0.3 \\ 0.5 & 0.5 \end{pmatrix}$.
3. **Think about it:** Why does PageRank need a "damping factor"?  What Markov chain property does it ensure?
