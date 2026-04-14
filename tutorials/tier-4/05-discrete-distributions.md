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

### Summary table

| Distribution | Parameters | $E[X]$ | $\text{Var}(X)$ |
|-------------|-----------|--------|-----------------|
| Bernoulli | $p$ | $p$ | $p(1-p)$ |
| Binomial | $n, p$ | $np$ | $np(1-p)$ |
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
```

## Connection to CS / Games / AI

- **Bernoulli** — dropout (each neuron is a Bernoulli trial), click-through rates
- **Binomial** — "how many of $n$ users convert?" in A/B testing
- **Poisson** — server request rates, rare event modelling, network packet arrivals
- **Loss functions** — cross-entropy loss assumes Bernoulli-distributed outcomes

## Check Your Understanding

1. **Pen & paper:** You roll a die 5 times.  What is the probability of getting exactly two 6s?  (Hint: Binomial with $n = 5, p = 1/6$.)
2. **Pen & paper:** Emails arrive at a rate of 3 per minute (Poisson).  What is $P(\text{no emails in a minute})$?
3. **Pen & paper:** A factory produces 10,000 items with defect rate $p = 0.0003$.  Use the Poisson approximation to find $P(\text{at most 2 defects})$.
4. **Think about it:** Why does Poisson approximate Binomial when $n$ is large and $p$ is small?
