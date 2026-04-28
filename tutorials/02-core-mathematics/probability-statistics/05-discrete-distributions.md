# Discrete Distributions — Bernoulli, Binomial, Poisson

## Intuition

Certain patterns of randomness appear again and again.  Coin flips → Bernoulli.
"How many successes in $n$ trials?" → Binomial.  "How many events in a time
window?" → Poisson.  Each of these models a counting process — the outcome is
always a non-negative integer.

## Prerequisites

- Tier 4, Lesson 4: Expectation and Variance

## From First Principles

### Bernoulli distribution

A single trial with probability $p$ of success.

$$X \sim \text{Bernoulli}(p): \quad P(X = 1) = p, \quad P(X = 0) = 1 - p$$

$E[X] = p$, $\text{Var}(X) = p(1-p)$

**Pen & paper:** Fair coin: $p = 0.5$, $E[X] = 0.5$, $\text{Var}(X) = 0.25$.

### Binomial distribution

$n$ independent Bernoulli trials.  $X$ = number of successes.

$$P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}$$

$E[X] = np$, $\text{Var}(X) = np(1-p)$

**Pen & paper:** Flip a coin 10 times. $P(\text{exactly 3 heads})$?

$$P(X = 3) = \binom{10}{3} (0.5)^3 (0.5)^7 = 120 \times \frac{1}{1024} = \frac{120}{1024} \approx 0.117$$

$\binom{10}{3} = \frac{10 \times 9 \times 8}{3!} = 120$

### Poisson distribution

Models rare events in a fixed interval.  Parameter $\lambda$ = average rate.

$$P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

$E[X] = \lambda$, $\text{Var}(X) = \lambda$

**Pen & paper:** A server gets 4 requests/second on average.  $P(\text{exactly 2 in a second})$?

$$P(X = 2) = \frac{4^2 e^{-4}}{2!} = \frac{16 \times 0.0183}{2} = \frac{0.293}{2} = 0.147$$

### Poisson as limit of Binomial

When $n$ is large and $p$ is small, with $\lambda = np$ held constant:

$$\binom{n}{k} p^k (1-p)^{n-k} \to \frac{\lambda^k e^{-\lambda}}{k!}$$

**Pen & paper:** $n = 1000$ light bulbs, each fails with $p = 0.002$.  $\lambda = 2$.

$P(\text{exactly 3 failures}) \approx \frac{2^3 e^{-2}}{3!} = \frac{8 \times 0.1353}{6} = 0.180$

### Geometric distribution

Models the number of trials until the **first success**.

$$P(X = k) = (1 - p)^{k-1} p, \quad k = 1, 2, 3, \ldots$$

$E[X] = \frac{1}{p}$, $\text{Var}(X) = \frac{1-p}{p^2}$

**Intuition:** "How many coin flips until I get the first heads?" With $p = 0.5$: on average 2 flips. With $p = 0.01$: on average 100.

**Memoryless property:** $P(X > s + t \mid X > s) = P(X > t)$

Past failures don't change the probability of future success. The Geometric distribution is the **only** discrete distribution with this property.

**Pen & paper:** A network packet has $p = 0.2$ chance of arriving. How many attempts on average? What is $P(\text{exactly 3 attempts})$?

$E[X] = 1/0.2 = 5$ attempts on average.

$P(X = 3) = (1 - 0.2)^{3-1} \times 0.2 = 0.8^2 \times 0.2 = 0.64 \times 0.2 = 0.128$

$P(X = 1) = 0.2$ (success on first try)

$P(X = 2) = 0.8 \times 0.2 = 0.16$

$P(\text{need more than 3}) = 1 - P(1) - P(2) - P(3) = 1 - 0.2 - 0.16 - 0.128 = 0.512$

**Pen & paper: CDF (probability of success within $k$ trials):**

$P(X \le k) = 1 - (1-p)^k$

For our example: $P(X \le 5) = 1 - 0.8^5 = 1 - 0.328 = 0.672$ (67.2% chance within 5 attempts).

### Summary table

| Distribution | Parameters | $E[X]$ | $\text{Var}(X)$ |
|-------------|-----------|--------|-----------------|
| Bernoulli | $p$ | $p$ | $p(1-p)$ |
| Binomial | $n, p$ | $np$ | $np(1-p)$ |
| Geometric | $p$ | $1/p$ | $(1-p)/p^2$ |
| Poisson | $\lambda$ | $\lambda$ | $\lambda$ |

## Python Verification

```python
# ── Discrete Distributions: verifying pen & paper work ────────
from math import comb, exp, factorial

# Binomial: P(X=3) for n=10, p=0.5
print("=== Binomial: 10 coin flips, P(3 heads) ===")
n, p, k = 10, 0.5, 3
p_binom = comb(n, k) * p**k * (1-p)**(n-k)
print(f"C(10,3) = {comb(n,k)}")
print(f"P(X=3) = {p_binom:.4f}")
print(f"E[X] = np = {n*p}, Var(X) = np(1-p) = {n*p*(1-p)}")

# Poisson: lambda=4, P(X=2)
print(f"\n=== Poisson: lambda=4, P(X=2) ===")
lam = 4
k = 2
p_pois = (lam**k * exp(-lam)) / factorial(k)
print(f"P(X=2) = {p_pois:.4f}")

# Poisson as limit of Binomial
print(f"\n=== Poisson-Binomial approximation ===")
n_large, p_small = 1000, 0.002
lam = n_large * p_small  # = 2
for k in range(6):
    p_binom = comb(n_large, k) * p_small**k * (1-p_small)**(n_large-k)
    p_poisson = (lam**k * exp(-lam)) / factorial(k)
    print(f"  k={k}: Binomial={p_binom:.6f}, Poisson={p_poisson:.6f}")

# Binomial PMF plot (text-based)
print(f"\n=== Binomial PMF: n=10, p=0.5 ===")
for k in range(11):
    p_k = comb(10, k) * 0.5**10
    bar = '#' * int(p_k * 200)
    print(f"  k={k:2d}: {p_k:.4f} {bar}")

# Geometric distribution
print(f"\n=== Geometric: P(X=k) for p=0.2 ===")
p = 0.2
print(f"E[X] = 1/p = {1/p:.1f}")
print(f"Var(X) = (1-p)/p² = {(1-p)/p**2:.2f}")
for k in range(1, 11):
    p_k = (1-p)**(k-1) * p
    bar = '#' * int(p_k * 200)
    print(f"  k={k:2d}: {p_k:.4f} {bar}")

# CDF: probability of success within k trials
print(f"\n=== Geometric CDF: P(X ≤ k) for p=0.2 ===")
for k in [1, 3, 5, 10, 20]:
    cdf = 1 - (1-p)**k
    print(f"  P(X ≤ {k:2d}) = {cdf:.4f}")
```

## Visualisation — The four discrete shapes

Each discrete distribution answers a different "counting" question. The
plot below puts all four side by side so you can read off the *shape*
each one produces.

```python
# ── Visualising the four core discrete distributions ────────
import numpy as np
import matplotlib.pyplot as plt
from math import comb, factorial

fig, axes = plt.subplots(1, 4, figsize=(18, 4.5))

# (1) Bernoulli(p=0.3): a single trial, two outcomes (0 or 1).
# This is the building block of binomial.
ax = axes[0]
p = 0.3
ax.bar([0, 1], [1 - p, p], color="tab:blue", alpha=0.85, edgecolor="navy")
for x, prob in [(0, 1 - p), (1, p)]:
    ax.text(x, prob + 0.02, f"{prob:.2f}", ha="center", fontsize=11, fontweight="bold")
ax.set_title(f"Bernoulli(p = {p})\n(single coin flip, 1 = success)")
ax.set_xlabel("x"); ax.set_ylabel("P(X = x)")
ax.set_xticks([0, 1]); ax.set_ylim(0, 1.0)
ax.grid(True, alpha=0.3)

# (2) Binomial(n=20, p=0.3): number of successes in n independent trials.
# Shape: roughly bell-curved, peaked near n·p.
ax = axes[1]
n, p_b = 20, 0.3
ks = np.arange(0, n + 1)
pmf_b = np.array([comb(n, k) * p_b**k * (1 - p_b)**(n - k) for k in ks])
ax.bar(ks, pmf_b, color="tab:orange", alpha=0.85, edgecolor="darkorange")
ax.axvline(n * p_b, color="red", lw=2, linestyle="--",
           label=f"E[X] = n·p = {n*p_b:.1f}")
ax.set_title(f"Binomial(n = {n}, p = {p_b})\n(# successes in n trials)")
ax.set_xlabel("k = number of successes"); ax.set_ylabel("P(X = k)")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Geometric(p=0.2): how many trials until the FIRST success.
# Shape: monotonically decreasing — early successes are most likely.
ax = axes[2]
p_g = 0.2
ks = np.arange(1, 21)
pmf_g = (1 - p_g)**(ks - 1) * p_g
ax.bar(ks, pmf_g, color="tab:green", alpha=0.85, edgecolor="darkgreen")
ax.axvline(1 / p_g, color="red", lw=2, linestyle="--",
           label=f"E[X] = 1/p = {1/p_g:.1f}")
ax.set_title(f"Geometric(p = {p_g})\n(trials until 1st success)")
ax.set_xlabel("k = trial of first success"); ax.set_ylabel("P(X = k)")
ax.legend(); ax.grid(True, alpha=0.3)

# (4) Poisson(λ=4): number of events in a fixed window when events
# occur independently at average rate λ. Shape: peak at ⌊λ⌋, right-skewed
# for small λ, becomes more bell-shaped as λ grows.
ax = axes[3]
lam = 4
ks = np.arange(0, 16)
pmf_p = np.exp(-lam) * lam**ks / np.array([factorial(k) for k in ks])
ax.bar(ks, pmf_p, color="tab:purple", alpha=0.85, edgecolor="indigo")
ax.axvline(lam, color="red", lw=2, linestyle="--",
           label=f"E[X] = λ = {lam}")
ax.set_title(f"Poisson(λ = {lam})\n(# events in a fixed window)")
ax.set_xlabel("k = event count"); ax.set_ylabel("P(X = k)")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the key statistics — every one of these is a closed form.
print(f"{'Distribution':<22}  {'E[X]':>6}    {'Var(X)':>8}    Notes")
print("-" * 75)
print(f"{'Bernoulli(p)':<22}  {p:>6.2f}    {p*(1-p):>8.4f}    one Yes/No trial")
print(f"{'Binomial(n=20, p=0.3)':<22}  {n*p_b:>6.2f}    {n*p_b*(1-p_b):>8.4f}    "
      f"sum of {n} Bernoullis")
print(f"{'Geometric(p=0.2)':<22}  {1/p_g:>6.2f}    {(1-p_g)/p_g**2:>8.4f}    "
      f"trials until 1st success")
print(f"{'Poisson(λ=4)':<22}  {lam:>6.2f}    {lam:>8.4f}    "
      f"E = Var = λ (Poisson signature)")
```

**Reading the four shapes:**

- **Bernoulli** is the atom of probability — *one* trial with two
  outcomes. Every binary classifier output is a Bernoulli prediction.
- **Binomial** is what you get when you add up $n$ independent
  Bernoullis. The bell-shaped result hints at the **Central Limit
  Theorem** (lesson 7): sums of independent things become approximately
  normal.
- **Geometric** answers "how long until the first success?" and is the
  unique discrete *memoryless* distribution — its decay rate $1 - p$
  doesn't depend on how many failures you've already seen.
- **Poisson** is the limit of a binomial as $n \to \infty$ and $p \to 0$
  with $np = \lambda$ held constant. It's the universal model for "rare
  events at a steady rate" — server hits, photon arrivals, typos per
  page, deaths-by-horse-kick (the original 1898 example).

A visual rule of thumb: **right-skewed shape → geometric or low-λ
Poisson; bell-ish → binomial or high-λ Poisson**. The mean $E[X]$ is
the red dashed line; for Poisson, the variance equals the mean — that's
the distribution's signature.

## Connection to CS / Games / AI / Business / Industry

- **Bernoulli** — dropout (each neuron is a Bernoulli trial), click-through rates
- **Binomial** — "how many of $n$ users convert?" in A/B testing
- **Poisson** — server request rates, rare event modelling, network packet arrivals
- **Geometric** — retry loops (expected retries until success), hash table probe counts, coupon collector analysis, expected time to find a free slot
- **Loss functions** — cross-entropy loss assumes Bernoulli-distributed outcomes

## Check Your Understanding

1. **Pen & paper:** You roll a die 5 times.  What is the probability of getting exactly two 6s?  (Hint: Binomial with $n = 5, p = 1/6$.)
2. **Pen & paper:** Emails arrive at a rate of 3 per minute (Poisson).  What is $P(\text{no emails in a minute})$?
3. **Pen & paper:** A factory produces 10,000 items with defect rate $p = 0.0003$.  Use the Poisson approximation to find $P(\text{at most 2 defects})$.
4. **Think about it:** Why does Poisson approximate Binomial when $n$ is large and $p$ is small?
