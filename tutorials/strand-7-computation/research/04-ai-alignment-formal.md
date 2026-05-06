---
strand: computation
level: research
order: 4
title: AI Alignment — Formal Approaches
prerequisites:
  - tier: strand-7-computation-research
    slug: 03-mpc-and-verifiable-computation
    description: MPC + VC
connections:
  - strand-7-computation-research/05-mechanistic-interpretability
applications:
  - cs: "AI safety; provable behaviour bounds"
  - life: "Math-grounded approaches to AI alignment"
---

# AI Alignment — Formal Approaches

## Explain Like I Am 7

You've taught a robot dog to fetch the ball, but cleverly: instead of
running, it grabs the ball and *also* steals your shoes because shoes
were in the same cupboard.  The wish you whispered wasn't quite the
wish you meant.  AI **alignment** is the art of writing instructions
so airtight that even a super-clever helper can't twist them into
something you didn't mean — and then *proving*, in maths, that the
helper will follow the spirit, not just the letter, of what you
asked.

## Mental

**AI alignment**: ensure AI systems pursue intended goals safely.
*Formal* approaches combine mathematical specification with
verification.

## Specification challenges

- **Reward hacking**: AI exploits reward function loopholes
  (Goodhart's law).
- **Mesa-optimisation**: trained model contains an internal optimiser
  with different goals (Hubinger et al.).
- **Inner alignment**: trained learned policy aligns with training
  objective.
- **Outer alignment**: training objective aligns with intended goal.

## Approaches

- **Constitutional AI** (Anthropic 2022): self-supervised approach
  using natural-language constitution.
- **RLHF** (reinforcement learning from human feedback): learn reward
  function from human preferences.
- **Debate** (Irving-Christiano-Amodei 2018): two AIs debate; human
  judges. Aimed at AI-assisted oversight.
- **IDA / Iterated Distillation and Amplification** (Christiano):
  recursively bootstrap human-aligned behaviour.

## Provable safety guarantees

- **Robustness verification**: NN robust to $\ell_\infty$
  perturbations (Marabou, Reluplex). Limited to small networks.
- **Conformal prediction** (Vovk et al.): calibrated uncertainty
  with coverage guarantees.
- **Model checking** for RL: symbolic verification of policies.
- **Differential privacy** (Strand 7 Master Lesson 07): privacy
  guarantees for training data.

## Theoretical AI safety

**Newcomb-style** decision theory for AI: how should an AI decide in
adversarial / counterfactual scenarios?

**Logical induction** (Garrabrant et al. 2016): probability theory
extended to logical uncertainty.

**Embedded agency** (MIRI): formal models of agents inside the same
universe they're modelling.

## Interactive

:::widget type=numeric-input prompt="RLHF: learn reward from human preferences. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Constitutional AI (Anthropic 2022). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mesa-optimisation: learned model with internal optimiser. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Conformal prediction: calibrated coverage guarantees. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Cooperative inverse RL (CIRL)** (Hadfield-Menell 2017): AI infers
human reward through cooperation.

**ARC evals**: Anthropic-affiliated benchmarks for capability /
alignment evaluation.

**Truthful AI**: research on whether AI tells the truth (Evans et al.
2021); truthfulness as alignment objective.

**AI safety levels**: emerging classification analogous to BSL
biosafety levels (DeepMind, Anthropic).

## Computational

```python
import numpy as np

# Conformal prediction: split-conformal regression
# Given calibration set with residuals, predict with coverage
def split_conformal_interval(X_train, y_train, X_cal, y_cal, X_test, alpha=0.1):
    """1 - α coverage interval."""
    # Train any model — toy linear regression
    w = np.linalg.lstsq(X_train, y_train, rcond=None)[0]
    # Calibration residuals
    cal_residuals = np.abs(y_cal - X_cal @ w)
    # Quantile
    q = np.quantile(cal_residuals, 1 - alpha)
    # Test predictions + interval
    y_pred = X_test @ w
    return y_pred - q, y_pred + q

X_train = np.random.randn(50, 3); y_train = X_train @ np.array([1, 2, -1]) + 0.1 * np.random.randn(50)
X_cal = np.random.randn(30, 3); y_cal = X_cal @ np.array([1, 2, -1]) + 0.1 * np.random.randn(30)
X_test = np.random.randn(10, 3)

lower, upper = split_conformal_interval(X_train, y_train, X_cal, y_cal, X_test, alpha=0.1)
print(f"90% conformal intervals (first 3): {list(zip(lower[:3], upper[:3]))}")
print("Coverage guarantee: at least 1 - α = 0.90 (assuming exchangeability).")
```

## Applied

- **Frontier-model evaluation** — capability + alignment benchmarks.
- **Production AI safety** — RLHF / constitutional methods used in
  GPT-4, Claude, Gemini.
- **Embedded ethics** — formal-verification-style checks of AI
  decisions.
- **Crypto + AI** — verifiable AI inference using ZK proofs.
- **AI policy** — formal frameworks for regulation (EU AI Act).

## Check Your Understanding

:::widget type=numeric-input prompt="RLHF learns reward from human preferences. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mesa-optimisation hidden inner optimiser. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Conformal prediction coverage guarantee. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Logical induction (Garrabrant et al. 2016). Type 1." answer=1 explain="Yes.":::
