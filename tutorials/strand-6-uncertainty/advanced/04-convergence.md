---
strand: uncertainty
level: advanced
order: 4
title: Modes of Convergence of Random Variables
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 03-random-variables-measure
    description: Random variables
connections:
  - strand-6-uncertainty-advanced/05-laws-of-large-numbers
applications:
  - cs: "Statistical-learning generalisation, MCMC convergence"
  - life: "Different ways a sequence of RVs can 'approach' a limit"
---

# Modes of Convergence of Random Variables

## Mental

For a sequence $X_n$ of random variables and a limit $X$, "$X_n \to X$"
can mean several different things — and they're not all equivalent.

| Mode | Definition | Symbol |
|---|---|---|
| Almost sure | $P(\lim X_n = X) = 1$ | $X_n \to X \text{ a.s.}$ |
| In probability | $\forall \epsilon: P(|X_n - X| > \epsilon) \to 0$ | $X_n \overset{P}{\to} X$ |
| In $L^p$ | $\mathbb{E}[|X_n - X|^p] \to 0$ | $X_n \overset{L^p}{\to} X$ |
| In distribution | $F_n \to F$ at all continuity points | $X_n \overset{d}{\to} X$ |

## Implications

$$
\text{a.s.} \;\Rightarrow\; \text{in probability} \;\Rightarrow\; \text{in distribution}.
$$

$$
L^p \text{ for some } p \ge 1 \;\Rightarrow\; \text{in probability}.
$$

$L^p$ and a.s. don't imply each other in general — they're
*orthogonal* notions.

## Counter-examples

**a.s. without $L^p$**: $X_n = n^2 \mathbb{1}_{(0, 1/n)}$. As $n \to \infty$,
$X_n \to 0$ a.s., but $\mathbb{E}[X_n] = n \to \infty$. Not $L^1$
convergent.

**In probability without a.s.**: "moving bumps" $X_n = \mathbb{1}_{[a_n, b_n]}$
where the intervals $[a_n, b_n]$ visit every part of $[0, 1]$ but
shrink. $X_n \to 0$ in probability, but $\limsup X_n = 1$ on every
$\omega$ — not a.s.

**In distribution without in probability**: $X_n$ all standard
normal, $X = -X_1$. $X_n$ and $X$ have same distribution, so
trivially $X_n \overset{d}{\to} X$. But $|X_n - X| = |X_n + X_1|$
doesn't go to 0 in probability.

## Slutsky's theorem

If $X_n \overset{d}{\to} X$ and $Y_n \overset{P}{\to} c$ (a constant):

- $X_n + Y_n \overset{d}{\to} X + c$.
- $X_n Y_n \overset{d}{\to} c X$.

Used when proving things like $\bar X_n - \mu \to N(0, \sigma^2/n)$
because the sample variance estimates $\sigma^2$.

## Interactive

:::widget type=numeric-input prompt="a.s. ⇒ in probability ⇒ in distribution. Number of arrows: $2$. Type 2." answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$L^2$ convergence implies in probability. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In distribution implies in probability? Type 1 yes, 0 no." answer=0 explain="No — only one direction.":::

:::widget type=numeric-input prompt="Slutsky: combines convergence-in-distribution with constant limit. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Borel-Cantelli lemmas**:

- **First**: if $\sum P(A_n) < \infty$, then $P(A_n \text{ infinitely often}) = 0$.
- **Second**: if $A_n$ are independent and $\sum P(A_n) = \infty$, then
  $P(A_n \text{ i.o.}) = 1$.

Used to prove a.s. convergence by showing the bad events are summable.

**Continuous mapping theorem**: if $g$ is continuous and
$X_n \to X$ (in any of these modes), then $g(X_n) \to g(X)$ in the
same mode.

**Skorokhod representation**: convergence in distribution can be
realised on a common probability space as a.s. convergence — useful
for technical proofs.

## Computational

```python
import numpy as np

# Almost sure convergence: X_n = X for all n
N = 100
T = 1000
X_inf = np.random.normal(0, 1)
X_n = np.array([X_inf] * T)
print(np.allclose(X_n, X_inf))           # True

# In probability: sample mean converges to true mean (LLN)
# X_n = sample mean of n iid Bernoulli(1/2) converges in prob (and a.s.) to 1/2
def sample_mean_seq(N):
    coins = np.random.randint(0, 2, N)
    return np.cumsum(coins) / np.arange(1, N + 1)

means = sample_mean_seq(N)
print(means[-1])                          # close to 0.5

# Convergence in distribution: CLT — sum of N iid uniforms approximates Normal
sums = np.array([np.sum(np.random.rand(50)) for _ in range(10000)])
# Standardise: (S - 50/2) / sqrt(50/12)
standardised = (sums - 25) / np.sqrt(50/12)
print(np.mean(standardised), np.std(standardised))   # ~0, ~1
```

## Applied

- **Statistical estimation** — consistency of an estimator means
  it converges to the true parameter as sample size grows
  (in probability or a.s.).
- **MCMC convergence** — Markov chain converges to stationary
  distribution; mixing time and ergodic theorems quantify rate.
- **Stochastic optimisation** — SGD convergence proofs use a.s. or
  $L^2$ convergence of iterates.
- **Statistical learning theory** — uniform convergence of
  empirical to true risk underlies generalisation bounds.

## Check Your Understanding

:::widget type=numeric-input prompt="a.s. ⇒ in probability. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In probability ⇒ in distribution. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In distribution ⇒ in probability? Type 1 yes, 0 no." answer=0 explain="No.":::

:::widget type=numeric-input prompt="Slutsky's theorem combines convergence in dist + convergence to a constant. Type 1." answer=1 explain="Yes.":::
