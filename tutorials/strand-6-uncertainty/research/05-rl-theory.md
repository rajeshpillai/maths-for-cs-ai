---
strand: uncertainty
level: research
order: 5
title: Reinforcement Learning Theory
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 04-statistical-learning-theory
    description: SLT frontier
connections:
  - strand-6-uncertainty-research/06-bayesian-deep-learning
applications:
  - cs: "RL algorithms with provable sample complexity"
  - life: "Theoretical RL beyond empirical heuristics"
---

# Reinforcement Learning Theory

## Explain Like I Am 7

Imagine teaching a video-game robot to win a level by trial and
error.  Each step it picks an action, sees what happens, and learns
from the reward or pain.  **Reinforcement learning theory** asks
the precise question: how many trial games does the robot *need*
before it can play near-optimally?  The answers depend on how big
the level is, how long each game lasts, and how risky exploration
must be.  Tight bounds use the same probability tools — Markov
chains, concentration inequalities, optimism — that power statistics
elsewhere.

## Mental

**RL** poses optimal-control / sequential-decision problems via
Markov Decision Processes (MDPs). Key questions:

- **Sample complexity**: how many samples to find ε-optimal policy?
- **Computational complexity**: how much compute?
- **Generalisation**: from finite training to general state spaces?

## Tabular RL bounds

For tabular MDP with $S$ states, $A$ actions, horizon $H$:

**Optimistic Q-learning** ($\mathrm{UCB}$-style):
sample complexity $\tilde O(SA H^3 / \epsilon^2)$.

**Lower bound**: $\Omega(SA H^2 / \epsilon^2)$ (Jin et al. 2018,
Domingues et al. 2020).

Gap closed in many regimes.

## Function approximation

For *large* state spaces, need function approximation. Theoretically:

- **Linear MDPs** (Jin et al. 2020): linearly-realisable Q-functions.
  $\mathrm{poly}(d, H, 1/\epsilon)$ sample complexity.
- **General function approximation**: distributional shift, no
  natural complexity measure. Open frontier.

## Policy gradient theorems

**Sutton et al. 2000**: gradient of expected return:

$$
\nabla_\theta J = \mathbb E_{\pi_\theta}[Q^\pi(s, a) \nabla_\theta \log \pi_\theta(a | s)].
$$

**Natural policy gradient** (Kakade 2002): use Fisher-info-rescaled
gradient. Foundation of TRPO / PPO.

**Convergence theorems**: actor-critic converges to local optima
under various conditions.

## Worked example: contextual bandits

**Stochastic contextual bandit**: each round, observe context
$x_t$, choose action $a_t$, observe reward $r_t \sim P(\cdot | x_t, a_t)$.

**LinUCB** (Li et al. 2010): linear-realisable case;
$\tilde O(\sqrt{T \cdot d})$ regret.

**Foundational MDP regret**: harder, requires planning + exploration
balance.

## Interactive

:::widget type=numeric-input prompt="Tabular RL: sample complexity $\\tilde O(SA H^3 / \\epsilon^2)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Linear MDPs (Jin et al. 2020): poly(d, H) bounds. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Policy gradient theorem: Sutton et al. 2000. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LinUCB regret: $\\tilde O(\\sqrt{Td})$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Bellman equation** $V^\pi(s) = \mathbb E[r + \gamma V^\pi(s')]$ —
foundation of dynamic programming.

**Distributional RL** (Bellemare et al. 2017): track full reward
distribution rather than just mean. Better empirical performance
plus theoretical structure.

**Offline RL** / batch RL: no further interaction. Theoretical
sample-complexity studied via concentrability conditions.

**Multi-agent RL**: equilibrium learning beyond single-agent;
mean-field MFG (Strand 4 Research Lesson 02) approximations.

## Computational

```python
import numpy as np

# Tiny tabular Q-learning
def q_learning(env, n_episodes=1000, alpha=0.1, gamma=0.99, epsilon=0.1):
    """env: (n_states, n_actions, transitions, rewards) tuple."""
    n_states, n_actions, P, R = env
    Q = np.zeros((n_states, n_actions))
    for _ in range(n_episodes):
        s = np.random.randint(n_states)
        for _ in range(50):
            if np.random.random() < epsilon:
                a = np.random.randint(n_actions)
            else:
                a = np.argmax(Q[s])
            s_next = np.random.choice(n_states, p=P[s, a])
            r = R[s, a, s_next]
            Q[s, a] = (1 - alpha) * Q[s, a] + alpha * (r + gamma * Q[s_next].max())
            s = s_next
    return Q

# Tiny 3-state, 2-action MDP
n_states, n_actions = 3, 2
P = np.zeros((n_states, n_actions, n_states))
P[0, 0, 1] = 1; P[0, 1, 2] = 1
P[1, 0, 0] = 1; P[1, 1, 2] = 1
P[2, :, 2] = 1   # absorbing

R = np.zeros((n_states, n_actions, n_states))
R[0, 1, 2] = 5; R[1, 1, 2] = 3

Q = q_learning((n_states, n_actions, P, R))
print("Q-values:", Q.round(2))

# Theoretical: optimal policy chooses action that goes to absorbing state
# directly with reward 5 from state 0.
```

## Applied

- **Robotics** — model-free RL with theoretical sample-complexity
  guarantees.
- **Game playing** — AlphaGo / AlphaZero rely on combinations of
  policy-gradient + MCTS; theoretical analysis ongoing.
- **Recommendation systems** — bandits + contextual bandits with
  regret guarantees.
- **Healthcare / clinical decision support** — offline RL on patient
  data.
- **Auto-curriculum / open-ended learning** — theoretical foundations
  emerging.

## Check Your Understanding

:::widget type=numeric-input prompt="Tabular RL sample complexity $\\tilde O(SA H^3 / \\epsilon^2)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Policy gradient (Sutton et al. 2000). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Distributional RL (Bellemare et al. 2017). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Linear-MDP (Jin et al. 2020): poly(d) bounds. Type 1." answer=1 explain="Yes.":::
