---
strand: uncertainty
level: intermediate
order: 3
title: Geometric and Poisson Distributions
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 02-binomial-distribution
    description: Binomial distribution
connections:
  - strand-6-uncertainty-intermediate/05-normal-distribution
applications:
  - cs: "Counting trials until success (retry strategies); event-rate modelling"
  - business: "Phone-call arrival rates, accident counts, defect counts"
  - games: "Drop-rate variance, time-until-rare-event"
  - life: "Bus arrivals, lottery wait times, radioactive decay"
---

# Geometric and Poisson Distributions

## Mental

Two more named discrete distributions, each answering a specific
question.

**Geometric($p$)**: how many trials until the **first success**?

$$
P(X = k) = (1 - p)^{k - 1} p, \quad k = 1, 2, 3, \ldots
$$

(Coin flipped until first heads; $X$ is the flip number on which
heads first appears.)

Mean: $E[X] = 1/p$. Variance: $(1-p)/p^2$.

**Poisson($\lambda$)**: number of events in a fixed time interval,
when events occur at average rate $\lambda$ and are **independent**.

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0, 1, 2, \ldots
$$

Mean: $E[X] = \lambda$. Variance: $\text{Var}(X) = \lambda$.
(Famously, mean equals variance — characteristic of Poisson.)

The Poisson approximates a Binomial$(n, p)$ when $n$ is large and
$p$ is small with $np \approx \lambda$ — the "law of rare events."

## Interactive

:::widget type=numeric-input prompt="A coin with $p = 0.2$ for heads. Expected number of flips until first heads?" answer=5 explain="$E[X] = 1/p = 5$.":::

:::widget type=numeric-input prompt="A rare item drops with $p = 0.01$. Expected attempts until first drop?" answer=100 explain="$1/0.01 = 100$.":::

:::widget type=numeric-input prompt="Phone calls arrive at a call centre at rate $\\lambda = 3$ per minute on average. $P(X = 0)$ in a minute (no calls)? Type the decimal — round to 3 dp." answer=0.05 tolerance=0.005 explain="$P(X=0) = e^{-3} \\approx 0.0498 \\approx 0.05$.":::

:::widget type=numeric-input prompt="Same call centre, one minute. Expected number of calls?" answer=3 explain="$\\lambda = 3$.":::

:::widget type=numeric-input prompt="$\\text{Var}(X)$ for the same Poisson?" answer=3 explain="Mean = variance = $\\lambda$.":::

## Symbolic

**Geometric**:

$$
P(X = k) = (1-p)^{k-1} p, \quad E[X] = 1/p, \quad \text{Var} = (1-p)/p^2.
$$

**Memoryless property**: $P(X > a + b \mid X > a) = P(X > b)$. Past
failures don't affect future success probability — each new trial is
independent. (This is the discrete analogue of the **exponential
distribution's** memoryless property — Lesson 05.)

**Poisson**:

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad E[X] = \text{Var}(X) = \lambda.
$$

A Poisson process has events occurring at rate $\lambda$ per unit
time. The wait time between events is **Exponential**($\lambda$) —
continuous (Lesson 05).

## Computational

```python
import scipy.stats as stats

# Geometric(0.2) — first success
print(stats.geom.pmf(1, 0.2))   # 0.2 — first try
print(stats.geom.pmf(5, 0.2))   # 0.082
print(stats.geom.mean(0.2))     # 5.0
print(stats.geom.var(0.2))      # 20.0  — (1 - 0.2) / 0.04 = 20

# Poisson(3) — call counts per minute
print(stats.poisson.pmf(0, 3))   # 0.0498
print(stats.poisson.pmf(3, 3))   # 0.224
print(stats.poisson.cdf(5, 3))   # 0.916 — P(X <= 5)
print(stats.poisson.mean(3))     # 3.0
```

## Derivational

*Why* does the Poisson formula $\frac{\lambda^k e^{-\lambda}}{k!}$
give the right count?

**Limit of binomial.** Take $\text{Binomial}(n, p)$ with $n \to
\infty$ and $p \to 0$ in such a way that $n p \to \lambda$ (constant).
Then

$$
\binom{n}{k} p^k (1-p)^{n-k} \to \frac{\lambda^k e^{-\lambda}}{k!}.
$$

So Poisson is the binomial **with rare events spread over many trials**.
This is why phone calls, customer arrivals, defects per unit, and
many other "count of independent rare events" follow Poisson.

## Applied

- **Defect rates**: items off an assembly line have rare defects;
  defect counts per batch follow Poisson.
- **Customer arrivals**: arrivals in a queue model are Poisson if
  arrivals are independent (a strong assumption that often
  approximately holds).
- **Software**: page faults per second, network packets per
  millisecond — often Poisson-modelled.
- **Geometric retry strategies**: a server retrying a failed request
  with success probability $p$ takes Geometric($p$)-many attempts on
  average, $1/p$.

## Check Your Understanding

:::widget type=numeric-input prompt="A drop rate of $5\\%$. Expected kills until first drop?" answer=20 explain="$1/0.05 = 20$.":::

:::widget type=numeric-input prompt="Customers arrive at a shop at rate $\\lambda = 5$ per hour. $P(X = 5)$ — exactly 5 customers in an hour?" answer=0.175 tolerance=0.005 explain="$\\frac{5^5 e^{-5}}{5!} = \\frac{3125 \\cdot 0.0067}{120} \\approx 0.175$.":::

:::widget type=numeric-input prompt="Poisson with $\\lambda = 7$. Variance?" answer=7 explain="$\\text{Var} = \\lambda$.":::

:::widget type=numeric-input prompt="A geometric distribution has $E[X] = 8$. What is $p$?" answer=0.125 explain="$1/p = 8 \\Rightarrow p = 1/8 = 0.125$.":::
