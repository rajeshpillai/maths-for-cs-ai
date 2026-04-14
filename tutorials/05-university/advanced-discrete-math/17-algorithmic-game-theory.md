# Algorithmic Game Theory

## Intuition

When multiple agents make decisions that affect each other, mathematics
becomes strategic. Game theory studies these interactions: when should you
cooperate vs defect? Is there a stable outcome where nobody wants to change
their strategy? **Nash equilibrium** says yes — and it exists in every finite
game. The **minimax theorem** powers chess AI, and the **prisoner's dilemma**
explains why rational agents sometimes produce collectively irrational outcomes.

## Prerequisites

- **Tier 4, Lesson 4** — Expectation, random variables

## From First Principles

### Normal-Form Games

A game has:
- **Players:** $N = \{1, 2, \ldots, n\}$
- **Strategies:** Each player $i$ has a set $S_i$
- **Payoff functions:** $u_i: S_1 \times S_2 \times \cdots \times S_n \to \mathbb{R}$

Represented as a **payoff matrix** for 2-player games.

### The Prisoner's Dilemma

Two suspects can **Cooperate** (stay silent) or **Defect** (betray).

|  | B: Cooperate | B: Defect |
|---|---|---|
| **A: Cooperate** | (-1, -1) | (-3, 0) |
| **A: Defect** | (0, -3) | (-2, -2) |

**Analysis (pen & paper):**

- If B cooperates: A gets -1 (cooperate) vs 0 (defect). Defect is better.
- If B defects: A gets -3 (cooperate) vs -2 (defect). Defect is better.
- Defecting **dominates** for both players.

Outcome: both defect, getting (-2, -2). But both cooperating gives (-1, -1) —
better for everyone. This is the tragedy: individual rationality leads to
collective suboptimality.

### Nash Equilibrium

A strategy profile $(s_1^*, s_2^*, \ldots, s_n^*)$ is a **Nash equilibrium**
if no player can improve their payoff by unilaterally changing their strategy:

$$u_i(s_i^*, s_{-i}^*) \ge u_i(s_i, s_{-i}^*) \quad \forall s_i \in S_i, \forall i$$

**Nash's Theorem (1950):** Every finite game has at least one Nash equilibrium
(possibly in **mixed strategies** — probability distributions over pure strategies).

**Example:** Matching Pennies (no pure Nash equilibrium):

|  | B: Heads | B: Tails |
|---|---|---|
| **A: Heads** | (1, -1) | (-1, 1) |
| **A: Tails** | (-1, 1) | (1, -1) |

Mixed equilibrium: both play Heads with probability $1/2$.

**Derivation:** Let A play Heads with probability $p$. For B to be indifferent:

$E_B[\text{Heads}] = E_B[\text{Tails}]$
$p(-1) + (1-p)(1) = p(1) + (1-p)(-1)$
$-p + 1 - p = p - 1 + p$
$1 - 2p = 2p - 1$
$p = 1/2$

By symmetry, B also plays $1/2$. Expected payoff: 0 for both.

### Minimax Theorem

For two-player zero-sum games ($u_1 + u_2 = 0$):

$$\max_p \min_q p^T A q = \min_q \max_p p^T A q$$

where $A$ is the payoff matrix, $p$ and $q$ are mixed strategies.

The common value is the **value of the game**. Each player's optimal mixed
strategy guarantees at least this value.

This is the foundation of chess/game AI: the minimax algorithm evaluates
positions by assuming the opponent plays optimally.

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# Left: Prisoner's Dilemma payoff matrix
ax1.set_title("Prisoner's Dilemma", fontsize=13)
labels = [['(-1, -1)', '(-3, 0)'], ['(0, -3)', '(-2, -2)']]
colors = [['lightyellow', 'mistyrose'], ['lightgreen', 'lightsalmon']]
strategies = ['Cooperate', 'Defect']

for i in range(2):
    for j in range(2):
        rect = plt.Rectangle((j+1, 1-i), 1, 1, facecolor=colors[i][j],
                              edgecolor='black', lw=1.5)
        ax1.add_patch(rect)
        ax1.text(j+1.5, 1-i+0.5, labels[i][j], ha='center', va='center', fontsize=12)

for j in range(2):
    ax1.text(j+1.5, 2.2, f"B: {strategies[j]}", ha='center', fontsize=10, fontweight='bold')
for i in range(2):
    ax1.text(0.5, 1-i+0.5, f"A: {strategies[i]}", ha='center', va='center',
             fontsize=10, fontweight='bold', rotation=0)

# Highlight Nash equilibrium
rect_ne = plt.Rectangle((2, 0), 1, 1, facecolor='none', edgecolor='red', lw=3, linestyle='--')
ax1.add_patch(rect_ne)
ax1.text(2.5, -0.3, "Nash Equilibrium", ha='center', fontsize=10, color='red', fontweight='bold')
ax1.set_xlim(0, 3.5); ax1.set_ylim(-0.6, 2.5); ax1.set_aspect('equal'); ax1.axis('off')

# Right: Mixed strategy equilibrium in Matching Pennies
ax2.set_title("Matching Pennies: Expected Payoff for A", fontsize=12)
p_vals = np.linspace(0, 1, 100)  # A's prob of Heads

# B plays Heads with prob q
for q in [0.0, 0.25, 0.5, 0.75, 1.0]:
    # A's expected payoff: p*q*1 + p*(1-q)*(-1) + (1-p)*q*(-1) + (1-p)*(1-q)*1
    payoff = p_vals * q * 1 + p_vals * (1-q) * (-1) + (1-p_vals) * q * (-1) + (1-p_vals) * (1-q) * 1
    ax2.plot(p_vals, payoff, label=f'q={q:.2f}', lw=1.5)

ax2.axhline(y=0, color='black', lw=0.5, linestyle='--')
ax2.axvline(x=0.5, color='red', lw=1, linestyle=':', alpha=0.7)
ax2.plot(0.5, 0, 'ro', markersize=10, zorder=5)
ax2.text(0.52, 0.15, 'Nash\nEquilibrium', fontsize=9, color='red')
ax2.set_xlabel("A's probability of Heads (p)")
ax2.set_ylabel("A's expected payoff")
ax2.legend(title="B's prob of Heads (q)", fontsize=9)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("game_theory.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from itertools import product

# ── Game Theory from scratch ─────────────────────────────

# Step 1: Find pure Nash equilibria
def find_pure_nash(payoff_A, payoff_B):
    """Find all pure Nash equilibria in a 2-player game."""
    rows, cols = payoff_A.shape
    equilibria = []
    for i in range(rows):
        for j in range(cols):
            # Check if i is best response to j
            a_best = payoff_A[i, j] == max(payoff_A[k, j] for k in range(rows))
            # Check if j is best response to i
            b_best = payoff_B[i, j] == max(payoff_B[i, k] for k in range(cols))
            if a_best and b_best:
                equilibria.append((i, j))
    return equilibria

# Prisoner's Dilemma
A = np.array([[-1, -3], [0, -2]])
B = np.array([[-1, 0], [-3, -2]])
ne = find_pure_nash(A, B)
print("Prisoner's Dilemma:")
print(f"  Payoff A:\n{A}")
print(f"  Pure Nash equilibria: {ne}")  # [(1,1)] = (Defect, Defect)
for i, j in ne:
    print(f"  -> ({['Coop','Defect'][i]}, {['Coop','Defect'][j]}): A={A[i,j]}, B={B[i,j]}")

# Step 2: Mixed Nash equilibrium for Matching Pennies
# A plays Heads with prob p, B with prob q
# A's payoff: p*q - p*(1-q) - (1-p)*q + (1-p)*(1-q)
# For B indifferent: dE_B/dq = 0 => p = 1/2
# For A indifferent: dE_A/dp = 0 => q = 1/2
print("\nMatching Pennies:")
payoff_mp = np.array([[1, -1], [-1, 1]])
print(f"  Payoff matrix:\n{payoff_mp}")
ne_mp = find_pure_nash(payoff_mp, -payoff_mp)
print(f"  Pure Nash: {ne_mp}")  # empty

# Compute mixed equilibrium
# A indifferent: q*1 + (1-q)*(-1) = q*(-1) + (1-q)*1
# 2q - 1 = 1 - 2q => q = 0.5
q_star = 0.5
p_star = 0.5
val = p_star * q_star * 1 + p_star*(1-q_star)*(-1) + (1-p_star)*q_star*(-1) + (1-p_star)*(1-q_star)*1
print(f"  Mixed Nash: p={p_star}, q={q_star}")
print(f"  Game value: {val}")

# Step 3: Minimax via linear programming (simple brute force)
def minimax_value(A, resolution=100):
    """Compute minimax value of zero-sum game by grid search."""
    m, n = A.shape
    # Player 1 maximizes, Player 2 minimizes
    best_val = -float('inf')
    best_p = None
    for p_idx in product(range(resolution + 1), repeat=m-1):
        p = list(p_idx) + [resolution - sum(p_idx)]
        if any(x < 0 for x in p):
            continue
        p = np.array(p) / resolution
        # Worst case for player 1 (player 2 minimizes)
        min_val = min(p @ A[:, j] for j in range(n))
        if min_val > best_val:
            best_val = min_val
            best_p = p
    return best_val, best_p

print("\nMinimax for Matching Pennies:")
val, p = minimax_value(payoff_mp, resolution=50)
print(f"  Game value: {val:.4f}")
print(f"  Optimal mixed strategy: {p}")

# Step 4: Iterated Prisoner's Dilemma strategies
def tit_for_tat(history):
    if not history:
        return 0  # cooperate first
    return history[-1][1]  # copy opponent's last move

def always_defect(history):
    return 1

def simulate_ipd(strategy_a, strategy_b, rounds=20):
    A_payoffs = np.array([[-1, -3], [0, -2]])
    history = []
    total_a, total_b = 0, 0
    for _ in range(rounds):
        a = strategy_a(history)
        b = strategy_b([(h[1], h[0]) for h in history])  # flip perspective for B
        total_a += A_payoffs[a, b]
        total_b += A_payoffs[b, a]
        history.append((a, b))
    return total_a, total_b

print("\nIterated Prisoner's Dilemma (20 rounds):")
a, b = simulate_ipd(tit_for_tat, tit_for_tat)
print(f"  Tit-for-Tat vs Tit-for-Tat: A={a}, B={b}")
a, b = simulate_ipd(tit_for_tat, always_defect)
print(f"  Tit-for-Tat vs Always-Defect: A={a}, B={b}")
a, b = simulate_ipd(always_defect, always_defect)
print(f"  Always-Defect vs Always-Defect: A={a}, B={b}")
```

## Connection to CS / Games / AI

- **Game AI:** Minimax with alpha-beta pruning is the standard for turn-based
  game AI (chess, checkers, Go). MCTS (Monte Carlo Tree Search) extends this.
- **Auction design:** Google's ad auction uses game theory (Vickrey-Clarke-Groves
  mechanism) to incentivise truthful bidding.
- **Multi-agent AI:** Reinforcement learning in multi-agent settings
  (self-play in AlphaGo) discovers Nash equilibria through training.
- **Mechanism design:** Designing protocols where rational agents produce
  desired outcomes (fair division, voting systems).

## Check Your Understanding

1. Find all pure and mixed Nash equilibria of the Battle of the Sexes game:
   A prefers (Opera, Opera)=(2,1), B prefers (Football, Football)=(1,2),
   mismatch=(0,0).
2. Prove that in any zero-sum game, if both players play their minimax
   strategies, the result is a Nash equilibrium.
3. Implement a "Pavlov" strategy for the iterated prisoner's dilemma
   (cooperate if both made the same choice last round, defect otherwise)
   and pit it against tit-for-tat.
