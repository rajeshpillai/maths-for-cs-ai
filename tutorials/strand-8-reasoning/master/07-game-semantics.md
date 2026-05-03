---
strand: reasoning
level: master
order: 7
title: Game Semantics
prerequisites:
  - tier: strand-8-reasoning-master
    slug: 06-cubical-and-univalent
    description: Cubical and univalent
connections:
  - strand-8-reasoning-master/08-realizability-deeper
applications:
  - cs: "Programming-language semantics, full abstraction, concurrency"
  - life: "Logic and computation as games"
---

# Game Semantics

## Mental

**Game semantics**: interpret types as games, programs as strategies,
proofs as winning strategies.

A **game** has:

- Two players: **Proponent** ($P$, "player") and **Opponent** ($O$).
- Plays alternating moves on a tree.
- $P$ wins iff plays follow the type's structure.

This is a **denotational semantics** capturing computational dynamics.

## Why this matters

Classical denotational semantics often gave *fully abstract* models
only with difficulty. **Game semantics** gives the first fully
abstract model of PCF (Plotkin's typed lambda calculus + recursion):

- Hyland-Ong (1995).
- Abramsky-Jagadeesan-Malacaria (AJM games, 1995).

Two flavours of games (HO and AJM) reflect different aspects of
computation; both fully abstract for PCF.

## Worked example: $A \to B$

The game $A \to B$:

- $O$ asks for output (move in $B$).
- $P$ may ask for input (move in $A$).
- Continues with sub-games of $A$ and $B$.

A **strategy** for $P$ tells how to respond. A "well-bracketed"
strategy = a function. A non-well-bracketed strategy = a function
*with control* (call/cc).

Different game conditions ↔ different programming-language
features.

## Concurrency and games

**Concurrent game semantics**: drop strict alternation; both players
move concurrently. Used to model concurrency, distributed systems,
non-determinism.

**Linear logic via games** (Blass, 1992): connectives ↔ game
constructions. Multiplicative connectives ↔ tensor of games;
additive ↔ choice of games.

## Interactive

:::widget type=numeric-input prompt="Game semantics: types ↔ games, programs ↔ strategies. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hyland-Ong (1995) game semantics for PCF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Linear logic admits a game-semantic interpretation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Concurrent games drop alternation. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Geometry of interaction (GoI)**: Girard's program viewing cut
elimination as token motion through a circuit. Closely related to
games.

**Differential games / interaction nets**: Lafont's interaction nets
generalise rewriting systems.

**Game-theoretic verification**: model checking with games (parity
games for $\mu$-calculus model checking).

**Categorical game semantics**: games and strategies form a category
with rich structure.

## Computational

```python
# Game-semantic strategy for a simple PCF program
# Type: ℕ → ℕ → ℕ (binary function)
# Program: lambda x y. x + y

class Move:
    def __init__(self, label, value=None):
        self.label = label
        self.value = value
    def __repr__(self):
        return f"{self.label}({self.value})" if self.value is not None else self.label

# Strategy for x + y
def add_strategy(history):
    """Given the play so far, return P's next move."""
    # O asks for output: P must compute
    # First evaluate x → ask O for x's value
    # Then evaluate y → ask O for y's value
    # Then output the sum
    if not history: return Move("ask-x")
    if history[-1].label == "answer-x" and not any(m.label == "ask-y" for m in history):
        return Move("ask-y")
    if history[-1].label == "answer-y":
        x = next(m.value for m in history if m.label == "answer-x")
        y = next(m.value for m in history if m.label == "answer-y")
        return Move("output", x + y)

# Simulate game: O plays as environment
def simulate(strategy):
    history = [Move("init")]
    while True:
        p_move = strategy(history)
        if p_move is None: break
        print(f"P: {p_move}")
        history.append(p_move)
        if p_move.label == "output":
            break
        # O's response
        if p_move.label == "ask-x":
            history.append(Move("answer-x", value=3))
        elif p_move.label == "ask-y":
            history.append(Move("answer-y", value=5))
    return p_move

result = simulate(add_strategy)
print(f"Final output: {result.value}")    # 8 (= 3 + 5)
```

## Applied

- **Programming language semantics** — full abstraction theorems.
- **Compiler verification** — semantics-preservation through
  game-semantic models.
- **Concurrency** — semantics of CCS, $\pi$-calculus via concurrent
  games.
- **Model checking $\mu$-calculus** — parity games (Calude-Jain-
  Khoussainov-Li-Stephan 2017 quasi-polynomial algorithm).
- **AI strategic interaction** — game-theoretic models of
  multi-agent systems.

## Check Your Understanding

:::widget type=numeric-input prompt="Game semantics: programs as strategies. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hyland-Ong fully abstract for PCF. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Linear logic admits game interpretation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Parity games solve $\\mu$-calculus model checking. Type 1." answer=1 explain="Yes.":::
