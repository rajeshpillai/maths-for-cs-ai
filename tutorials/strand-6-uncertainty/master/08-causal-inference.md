---
strand: uncertainty
level: master
order: 8
title: Causal Inference
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 07-optimal-transport
    description: Optimal transport
connections:
  - strand-6-uncertainty-master/09-uncertainty-master-capstone
applications:
  - cs: "Recommender systems, A/B testing, ML fairness, causal ML"
  - life: "Going from correlation to causation"
---

# Causal Inference

## Explain Like I Am 7

Ice cream sales and shark attacks both rise in summer.  Did ice
cream cause the sharks?  Of course not — they share a common
*cause* (hot weather brings beach-goers).  Plain probability can
spot the *correlation* but not pull the *cause* apart.  **Causal
inference** uses arrow-diagrams of "what causes what" to ask the
right question — "what would happen if I *intervened* and changed
ice cream sales while leaving the weather alone?" — and to compute
honest answers from messy real-world data.

## Mental

Statistics traditionally answers $P(Y | X)$ — *correlation*.
**Causal inference** answers $P(Y | \mathrm{do}(X = x))$ —
**intervention**.

Why these differ: confounders. If $Z$ causes both $X$ and $Y$,
$P(Y | X)$ contains $Z$'s influence even though $X$ doesn't actually
cause $Y$.

## Pearl's framework

**Causal DAG**: directed acyclic graph with arrows $X \to Y$ meaning
"$X$ directly causes $Y$."

**Structural causal model (SCM)**: each variable $X_i = f_i(\mathrm{Pa}(X_i), U_i)$
where $\mathrm{Pa}$ are parents and $U_i$ noise.

**Intervention** $\mathrm{do}(X = x)$: replace $X$'s structural
equation with constant $x$, leaving descendants free.

## Backdoor / front-door criteria

**Backdoor**: a set $Z$ blocks all "backdoor paths" from $X$ to $Y$
iff conditioning on $Z$ recovers causal effect:

$$
P(Y | \mathrm{do}(X = x)) = \sum_z P(Y | X = x, Z = z) P(Z = z).
$$

**Front-door**: when no admissible backdoor set exists, sometimes a
mediator $M$ enables identification.

These give algorithmic rules for *when causal effects can be
identified from observational data*.

## Worked example: Simpson's paradox

Treatment effect of drug:

- **Overall** in entire population: drug looks worse.
- **Within each gender**: drug looks better.

Cause: gender confounds treatment assignment and outcome. Adjusting
for gender (backdoor) reveals true effect.

Famous real example: UC Berkeley admissions (1973): men accepted at
higher rate overall but women accepted at higher rate *within each
department*.

## Interactive

:::widget type=numeric-input prompt="$P(Y | \\mathrm{do}(X))$ vs $P(Y | X)$ — different in presence of confounders. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Backdoor criterion identifies causal effect by conditioning on confounders. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Simpson's paradox: aggregate vs subgroup direction reverses. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Causal DAG: arrows = direct causation. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Counterfactuals**: $Y_{X = x}(u)$ = "what would $Y$ be if $X = x$, fixing
noise $u$?" The fundamental quantity for individual-level causation.

**Mediation analysis**: decompose total effect into direct + indirect
through a mediator $M$. Important for understanding mechanisms.

**Instrumental variables**: $Z$ that affects $Y$ only through $X$
(no direct path) lets us identify $\mathrm{do}(X)$ effect even with
unobserved confounders. Used in econometrics (Heckman Nobel 2000).

**ML for causality** — TARNET, X-learner, double-ML for treatment-
effect estimation; causal discovery from observational data
(Spirtes-Glymour-Scheines).

## Computational

```python
import numpy as np
import pandas as pd

# Simpson's paradox demo
# Treatment ↔ gender ↔ outcome
np.random.seed(0)
n = 1000

# Hidden gender
gender = np.random.choice(['M', 'F'], size=n, p=[0.5, 0.5])

# Treatment more often given to men, but men have worse baseline outcome
treat = np.where(gender == 'M', np.random.random(n) < 0.6, np.random.random(n) < 0.3)

# Outcome: gender-dependent baseline + small treatment benefit
baseline = np.where(gender == 'M', 0.3, 0.7)
outcome = baseline + 0.1 * treat + 0.05 * np.random.randn(n)
data = pd.DataFrame({'gender': gender, 'treat': treat, 'outcome': outcome})

# Naive correlation
print("Naive (treatment vs no treatment):")
print(data.groupby('treat')['outcome'].mean())

# Subgroup correlation (Simpson reversal)
print("\nWithin each gender:")
print(data.groupby(['gender', 'treat'])['outcome'].mean())

# Backdoor adjustment
adjusted = sum(
    data[data['gender'] == g]['outcome'][data[data['gender'] == g]['treat']].mean()
    * (data['gender'] == g).mean()
    for g in ['M', 'F']
)
unadjusted_no = sum(
    data[data['gender'] == g]['outcome'][~data[data['gender'] == g]['treat']].mean()
    * (data['gender'] == g).mean()
    for g in ['M', 'F']
)
print(f"\nAdjusted treatment effect: {adjusted - unadjusted_no:.4f}")
print("(Should reflect true 0.1 effect)")
```

## Applied

- **Healthcare** — RCTs vs observational studies; methods to
  approximate RCT-style answers from observational data.
- **A/B testing in tech** — well-randomised; backdoor irrelevant
  but issues like SUTVA / interference matter.
- **Recommender systems** — recommending != causing engagement;
  causal corrections for selection bias.
- **Fairness in ML** — counterfactual fairness asks "would this
  decision change if individual's race / gender were different?"
- **Econometrics** — IV regression, regression discontinuity,
  difference-in-differences.

## Check Your Understanding

:::widget type=numeric-input prompt="$P(Y | \\mathrm{do}(X))$ ≠ $P(Y | X)$ in general. Type 1." answer=1 explain="Yes — confounders.":::

:::widget type=numeric-input prompt="Backdoor adjustment recovers causal effect via confounder conditioning. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Simpson's paradox: subgroup direction can flip aggregate. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Instrumental variables enable causal identification with unobserved confounders. Type 1." answer=1 explain="Yes.":::
