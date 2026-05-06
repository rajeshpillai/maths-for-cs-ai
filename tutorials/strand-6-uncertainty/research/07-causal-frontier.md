---
strand: uncertainty
level: research
order: 7
title: Causal Inference Frontier
prerequisites:
  - tier: strand-6-uncertainty-research
    slug: 06-bayesian-deep-learning
    description: Bayesian DL
connections:
  - strand-6-uncertainty-research/08-stochastic-homogenisation
applications:
  - cs: "Causal ML, fairness, policy evaluation"
  - life: "Discovering and using causal structure from data"
---

# Causal Inference Frontier

## Explain Like I Am 7

Earlier we saw causal arrows ("ice cream doesn't cause sharks") on
hand-drawn diagrams.  But what if you don't even know which arrows
to draw — you only have a giant pile of raw data?  **Causal
discovery** algorithms try to *learn* the arrows automatically,
testing for sneaky independencies, scoring possible diagrams, or
turning the search into a smooth optimisation.  Even more
ambitious: *causal representation learning* tries to extract clean
cause-and-effect variables from messy raw images or brain scans.
This is one of the hottest frontiers in modern AI.

## Mental

Strand 6 Master Lesson 08 introduced causal-inference (Pearl). Active
research:

## Causal discovery

Find causal DAG from observational data:

- **PC algorithm** (Spirtes-Glymour-Scheines): conditional-
  independence-based.
- **GES** (Chickering 2002): score-based search.
- **NOTEARS** (Zheng et al. 2018): differentiable continuous
  optimisation over DAGs. Sparked deep-learning-based causal
  discovery.

## Causal representation learning

Learn *latent causal variables* from raw data (e.g., images,
neural recordings) such that high-level causal reasoning works.

Key challenges:

- **Identifiability**: when can we recover true causal structure?
- **Disentanglement**: separate independent causal factors.

**Schölkopf-Locatello et al. 2021**: theoretical bounds on
identifiability of disentangled representations.

## Heterogeneous treatment effects

Estimating individual-level treatment effects from observational data:

- **TARNET** (Shalit-Johansson-Sontag 2017).
- **Double ML** (Chernozhukov et al. 2018).
- **X-Learner** (Künzel et al. 2019).

Useful in personalised medicine, marketing, education.

## Worked example: simple DAG identification

Three variables $X, Y, Z$ with $X \to Y \to Z$:

- $X \perp Z | Y$ — testable.
- $X \not\perp Z$ — testable.

If both confirmed in data, candidate DAG identified.
**PC algorithm** systematises this for many variables.

## Interactive

:::widget type=numeric-input prompt="PC algorithm: conditional-independence causal discovery. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="NOTEARS (Zheng et al. 2018): differentiable DAG search. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Causal representation learning: identifiability key challenge. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Double ML (Chernozhukov 2018) for treatment effects. Type 1." answer=1 explain="Yes.":::

## Symbolic

**$do$-calculus** rules (Pearl): identification rules for
$P(Y | \mathrm{do}(X))$ from observational distribution given DAG.

**ID algorithm** (Tian-Pearl, Shpitser-Pearl): complete decision
procedure for identifiability.

**Counterfactual fairness** (Kusner et al. 2017): fairness defined
via counterfactual reasoning.

**Causal LLMs**: emerging research on causal reasoning capabilities
of large language models.

## Computational

```python
import numpy as np
import pandas as pd

# Simulate causal DAG: X → Y → Z
n = 1000
X = np.random.randn(n)
Y = X + 0.5 * np.random.randn(n)
Z = Y + 0.5 * np.random.randn(n)

# Test conditional independence: X ⊥ Z | Y?
from numpy.polynomial import polynomial as P

# Linear residuals after regressing on Y
def linear_residual(target, conditioner):
    # target = a + b * conditioner + residual
    cov = np.cov(target, conditioner)
    b = cov[0, 1] / cov[1, 1]
    a = target.mean() - b * conditioner.mean()
    return target - (a + b * conditioner)

X_res = linear_residual(X, Y)
Z_res = linear_residual(Z, Y)

corr = np.corrcoef(X_res, Z_res)[0, 1]
print(f"Partial correlation X, Z | Y = {corr:.4f}")
# Should be small (close to 0): X ⊥ Z | Y
print("X ⊥ Z | Y suggests DAG X → Y → Z (or Z → Y → X — need more info to orient).")

# NOTEARS / score-based methods explore DAG space; PC orients edges
# via independence + Meek rules
print("Real causal discovery: tetrad, dowhy, causal-learn libraries.")
```

## Applied

- **Personalised medicine** — heterogeneous treatment effects of
  drugs.
- **A/B testing** — beyond randomised, observational A/B with
  confounders.
- **Recommendation systems** — debiasing recommendation via causal
  techniques.
- **AI fairness** — counterfactual fairness as alternative to
  statistical parity.
- **Climate / earth science** — causal attribution in observational
  data.

## Check Your Understanding

:::widget type=numeric-input prompt="PC algorithm: CI-based causal discovery. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="NOTEARS: differentiable DAG learning. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ID algorithm (Tian-Pearl, Shpitser-Pearl) — complete identification. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Counterfactual fairness via causal reasoning. Type 1." answer=1 explain="Yes.":::
