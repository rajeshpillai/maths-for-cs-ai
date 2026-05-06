---
strand: reasoning
level: research
order: 4
title: AI Safety Formal Foundations
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 03-proof-complexity-frontier
    description: Proof complexity frontier
connections:
  - strand-8-reasoning-research/05-categorical-quantum
applications:
  - cs: "Formal verification of AI systems, alignment theory, agent foundations"
  - life: "Mathematical guarantees that AI does what we want"
---

# AI Safety Formal Foundations

## Explain Like I Am 7

You teach your robot to fetch the ball, but you also need rules so it
won't shove granny over to get the ball faster.  **AI safety** is
the careful art of writing those rules in maths so airtight that a
much cleverer robot than you couldn't wriggle out of them.  Researchers
build little maths models of "what is a goal?", "what is a value?",
"what is honest behaviour?" and try to prove that bots built on those
models stay helpful even when they grow much smarter than the
people who built them.

## Mental

**AI safety / alignment**: ensure AI systems pursue intended
objectives without unintended side-effects. The *formal* foundations
side: mathematical models of agency, decision, and goal-directed
behaviour.

**Agent foundations** (MIRI, ARIA, Anthropic theory teams):
mathematical structures that capture safe, robust agency.

## Decision-theoretic frameworks

**CDT (Causal Decision Theory)**: choose action by causal
consequence.

**EDT (Evidential Decision Theory)**: choose by Bayesian update on
seeing one's own action.

**FDT (Functional Decision Theory)** (Yudkowsky-Soares 2017):
choose the *function* one's policy implements; handles Newcomb-like
problems and acausal trade.

## Logical induction

**Logical induction** (Garrabrant-Benson-Tilford-Critch-Soares 2016):
a market of traders bets on logical statements; in the limit
prices converge to a coherent prior over $\Pi_1$ statements.

Resolves *logical uncertainty*: assigning probabilities to
theorems before they are proven (e.g., "P vs NP").

## Embedded agency

A traditional Bayesian agent is **dualist**: agent and environment
are separate. **Embedded agents** (Demski-Garrabrant 2019) live
*inside* the world they reason about. Issues:

- **Self-reference**: agent must reason about its own source code.
- **Self-modification**: agent might rewrite itself.
- **Subagent stability**: agents may create subagents with
  different goals.
- **No clean Cartesian boundary**: information leaks both ways.

## Inverse reinforcement learning

**IRL** (Ng-Russell 2000): infer the reward function from observed
agent behaviour.

**Cooperative IRL / assistance games** (Hadfield-Menell et al. 2016):
the agent is uncertain about the human's reward; cooperates to learn
it. Foundation for "principal-agent" alignment.

## Interactive

:::widget type=numeric-input prompt="FDT (Yudkowsky-Soares 2017): choose the function the policy implements. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Logical induction (Garrabrant et al. 2016): trader market over logical statements. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Embedded agents reason about themselves inside the world. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cooperative IRL (Hadfield-Menell et al. 2016) for alignment. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Reflective oracles** (Fallenstein-Soares-Taylor 2015): agents
that reason about their own probabilities; resolves Lob's-theorem
obstacles to self-trust.

**Quantilizers** (Taylor 2016): agents that pick from top-$q$
quantile of human-similar policies — bounded optimisation pressure
to mitigate Goodhart's law.

**Mesa-optimisation / inner alignment** (Hubinger et al. 2019):
trained network may *itself* implement a search; inner objective
may diverge from outer objective. Theoretical risk model.

**Goodhart's law / overoptimisation**: optimising hard against a
proxy reward systematically diverges from the true objective.
Quantified models in Manheim-Garrabrant.

**Singular learning theory** (Watanabe): geometry of singular loss
landscapes; foundation for studying generalisation in deep
networks. Relevant for understanding mesa-optimisers.

## Computational

```python
import numpy as np

# Quantilizer: bounded optimisation as defence against Goodhart
def quantilizer(actions, base_distribution, reward_estimate, q=0.1):
    """Sample from top-q quantile of base_distribution by reward."""
    rewards = np.array([reward_estimate(a) for a in actions])
    base_p = np.array([base_distribution(a) for a in actions])
    # Threshold: top-q by base measure
    sorted_idx = np.argsort(-rewards)
    cum_p = 0
    selected = []
    for idx in sorted_idx:
        if cum_p < q:
            selected.append(idx)
            cum_p += base_p[idx]
        else:
            break
    # Sample uniformly from selected
    return np.random.choice(selected) if selected else None

# Toy example: 5 actions
actions = ["a1", "a2", "a3", "a4", "a5"]
base = lambda a: 0.2  # uniform
reward_estimate = lambda a: int(a[-1])   # a5 best by proxy

picks = [quantilizer(actions, base, reward_estimate, q=0.4) for _ in range(100)]
print("Quantilizer picks (q=0.4):")
unique, counts = np.unique([actions[p] for p in picks if p is not None], return_counts=True)
for u, c in zip(unique, counts):
    print(f"  {u}: {c}")

# Inverse RL: infer reward from demonstrations
print()
print("IRL: gradient ascent on reward s.t. expert is approx-optimal.")
print("Implementation: max-entropy IRL (Ziebart et al. 2008).")
```

## Applied

- **Reward modelling for RLHF** — IRL-style techniques in InstructGPT,
  Claude, Gemini.
- **Constitutional AI** (Anthropic) — scaled to Claude; rules that
  guide AI behaviour.
- **Debate / amplification** — recursive techniques for scaling
  oversight (Christiano-Shlegeris-Amodei 2018).
- **AI auditing** — formal methods for behaviour verification.
- **AI governance** — formal models inform policy on capabilities
  and dual-use risks.

## Check Your Understanding

:::widget type=numeric-input prompt="Logical induction: limit-coherent priors over logical statements. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Quantilizers (Taylor 2016) defend against Goodhart. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mesa-optimisation: trained network implements internal search (inner alignment). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Embedded agency: agent inside environment, no Cartesian boundary. Type 1." answer=1 explain="Yes.":::
