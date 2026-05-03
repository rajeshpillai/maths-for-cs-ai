---
strand: computation
level: research
order: 6
title: Algorithmic Game Theory Frontier
prerequisites:
  - tier: strand-7-computation-research
    slug: 05-mechanistic-interpretability
    description: Mechanistic interpretability
connections:
  - strand-7-computation-research/07-tcs-frontier-codes-pcps
applications:
  - cs: "Mechanism design, online auctions, multi-agent ML"
  - life: "Algorithms meeting strategic agents"
---

# Algorithmic Game Theory Frontier

## Mental

**Algorithmic Game Theory (AGT)** combines TCS and game theory to
analyse computational equilibria, mechanism design, social-choice
algorithms.

## Equilibrium computation

**PPAD-completeness of Nash** (Daskalakis-Goldberg-Papadimitriou
2009; Chen-Deng 2009): finding mixed Nash in 2-player game is
PPAD-complete — hard but in TFNP.

**Approximation**: PTAS open for 2-player; some progress for
restricted classes.

## Mechanism design

**Vickrey-Clarke-Groves (VCG)** mechanism: truthful, welfare-
maximising mechanism. **Computational issues**: VCG hard to compute
even when valuations are.

**Roughgarden's price-of-anarchy**: ratio of worst Nash welfare to
optimal. Quantifies efficiency loss from selfish behaviour.

**Optimal mechanism design**: Myerson 1981 for single-item.
Multi-item / multi-buyer: harder; recent ML-based "deep mechanism
design" (Dütting et al. 2019).

## Online and learning games

**Online learning in games**: each player runs an online algorithm.
Convergence to equilibria via no-regret dynamics.

**Multi-agent RL** with theoretical convergence:

- **CFR (Counterfactual Regret Minimisation)**: solved heads-up
  no-limit hold'em (Brown-Sandholm 2017 Libratus, Pluribus 2019
  for 6-player).

## Worked example: Selfish routing

Pigou's example: $N$ drivers choose between two routes.

- Route A: latency $1$ (constant).
- Route B: latency $x$ where $x$ = fraction using B.

**Optimal social welfare**: split equally; mean latency $0.75$.
**Nash equilibrium**: all use B; mean latency $1$.

**Price of anarchy** = $1 / 0.75 = 4/3$.

## Interactive

:::widget type=numeric-input prompt="Nash PPAD-complete (DGP 2009; Chen-Deng 2009). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="VCG: truthful welfare-maximising. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CFR solved hold'em (Libratus 2017, Pluribus 2019). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pigou price of anarchy 4/3. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Correlated equilibrium**: a probability distribution over outcomes
such that no player wants to deviate given the conditional. Larger
class than Nash; reachable by no-regret dynamics.

**Sequential mechanism design**: dynamic / online auctions; learning
interfaces.

**Algorithmic mechanism design and ML**: deep nets approximating
optimal mechanisms; training under truthfulness constraints.

**Information design** (Bergemann-Morris): designer chooses what
information players see; recent rich theory.

## Computational

```python
import numpy as np

# Pigou example: price of anarchy
def pigou_anarchy():
    """Two routes: constant 1 vs linear x."""
    # Optimal: minimise average travel time
    # Cost(x) = (1 - x) * 1 + x * x
    # dCost/dx = -1 + 2x = 0 → x = 0.5
    # Cost at 0.5 = 0.5 * 1 + 0.5 * 0.5 = 0.75
    optimal_cost = 0.75
    # Nash: all on linear (x = 1) since 1 = 1 (indifferent)
    # Actually Nash here all on route B if we tie-break, mean cost = 1
    nash_cost = 1.0
    return nash_cost / optimal_cost

print(f"Pigou price of anarchy: {pigou_anarchy():.4f}")  # 4/3 ≈ 1.333

# CFR-style learning: regret matching
def regret_matching(payoffs, n_iters=10000):
    """Compute Nash for 2-player zero-sum game via regret matching."""
    n_actions_p1, n_actions_p2 = payoffs.shape
    regret_p1 = np.zeros(n_actions_p1)
    regret_p2 = np.zeros(n_actions_p2)
    strat_p1 = np.ones(n_actions_p1) / n_actions_p1
    strat_p2 = np.ones(n_actions_p2) / n_actions_p2
    cum_strat_p1 = np.zeros(n_actions_p1)
    cum_strat_p2 = np.zeros(n_actions_p2)

    for _ in range(n_iters):
        # Compute action utilities
        util_p1 = payoffs @ strat_p2
        val_p1 = strat_p1 @ util_p1
        regret_p1 += util_p1 - val_p1
        regret_p1 = np.maximum(regret_p1, 0)
        if regret_p1.sum() > 0:
            strat_p1 = regret_p1 / regret_p1.sum()
        cum_strat_p1 += strat_p1

        util_p2 = -strat_p1 @ payoffs
        val_p2 = strat_p2 @ util_p2
        regret_p2 += util_p2 - val_p2
        regret_p2 = np.maximum(regret_p2, 0)
        if regret_p2.sum() > 0:
            strat_p2 = regret_p2 / regret_p2.sum()
        cum_strat_p2 += strat_p2

    return cum_strat_p1 / n_iters, cum_strat_p2 / n_iters

# Rock-paper-scissors
RPS = np.array([[0, -1, 1], [1, 0, -1], [-1, 1, 0]])
p1, p2 = regret_matching(RPS)
print(f"P1 strategy (RPS): {p1}")    # ~ uniform
print(f"P2 strategy (RPS): {p2}")    # ~ uniform
```

## Applied

- **Online ad auctions** — Google / Facebook ad auctions use AGT-
  inspired mechanisms.
- **Cryptoeconomics** — token incentive design; Ethereum gas auctions.
- **Multi-agent RL** — convergence theorems for cooperative-
  competitive learning.
- **Matching markets** — kidney exchange, residency match (Roth
  Nobel 2012).
- **Recommender systems** — strategic users → mechanism-design
  considerations.

## Check Your Understanding

:::widget type=numeric-input prompt="Nash PPAD-complete (DGP / Chen-Deng 2009). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pigou price of anarchy 4/3. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="CFR solved hold'em poker. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Roth Nobel 2012 for matching markets. Type 1." answer=1 explain="Yes.":::
