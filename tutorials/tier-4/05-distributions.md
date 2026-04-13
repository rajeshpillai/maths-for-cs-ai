# Key Distributions — Bernoulli, Binomial, Poisson, Uniform, Gaussian

## Intuition

Certain patterns of randomness appear again and again.  Coin flips → Bernoulli.
"How many successes in $n$ trials?" → Binomial.  "How many events in a time
window?" → Poisson.  "Any value equally likely?" → Uniform.  "Nature's default" →
Gaussian (the bell curve).  Knowing which distribution fits your problem is half
the battle.

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

### Uniform distribution (continuous)

All values in $[a, b]$ equally likely.

$$f(x) = \frac{1}{b - a} \quad \text{for } a \le x \le b$$

$E[X] = \frac{a + b}{2}$, $\text{Var}(X) = \frac{(b-a)^2}{12}$

**Pen & paper:** $X \sim \text{Uniform}(0, 1)$:
$E[X] = 0.5$, $\text{Var}(X) = 1/12 \approx 0.083$.

### Gaussian (Normal) distribution — the bell curve

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)$$

$E[X] = \mu$, $\text{Var}(X) = \sigma^2$

**Standard normal:** $\mu = 0, \sigma = 1$, written $Z \sim \mathcal{N}(0, 1)$.

### The 68-95-99.7 rule (memorise this)

For a normal distribution:
- 68% of values fall within $\mu \pm 1\sigma$
- 95% within $\mu \pm 2\sigma$
- 99.7% within $\mu \pm 3\sigma$

**Pen & paper:** Heights are $\mathcal{N}(170, 10^2)$ cm.

- 68% between 160 and 180 cm
- 95% between 150 and 190 cm
- 99.7% between 140 and 200 cm

### Why Gaussians are everywhere

The **Central Limit Theorem** (next lesson) explains it: the sum of many
independent random effects tends toward a Gaussian, regardless of the
individual distributions.

### Summary table

| Distribution | Type | Parameters | $E[X]$ | $\text{Var}(X)$ |
|-------------|------|-----------|--------|-----------------|
| Bernoulli | Discrete | $p$ | $p$ | $p(1-p)$ |
| Binomial | Discrete | $n, p$ | $np$ | $np(1-p)$ |
| Poisson | Discrete | $\lambda$ | $\lambda$ | $\lambda$ |
| Uniform | Continuous | $a, b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Gaussian | Continuous | $\mu, \sigma^2$ | $\mu$ | $\sigma^2$ |

## Python Verification

```python
# ── Key Distributions: verifying pen & paper work ───────────
from math import comb, exp, factorial, sqrt, pi
import random

# Binomial: P(X=3) for n=10, p=0.5
print("=== Binomial: 10 coin flips, P(3 heads) ===")
n, p, k = 10, 0.5, 3
p_binom = comb(n, k) * p**k * (1-p)**(n-k)
print(f"C(10,3) = {comb(n,k)}")
print(f"P(X=3) = {p_binom:.4f}")
print(f"E[X] = np = {n*p}, Var(X) = np(1-p) = {n*p*(1-p)}")

# Poisson: λ=4, P(X=2)
print(f"\n=== Poisson: λ=4, P(X=2) ===")
lam = 4
k = 2
p_pois = (lam**k * exp(-lam)) / factorial(k)
print(f"P(X=2) = {p_pois:.4f}")

# Uniform
print(f"\n=== Uniform(0,1) ===")
print(f"E[X] = {(0+1)/2}, Var(X) = {(1-0)**2/12:.4f}")

# Gaussian: 68-95-99.7 rule
print(f"\n=== Gaussian: 68-95-99.7 rule ===")
mu, sigma = 170, 10
random.seed(42)
samples = [random.gauss(mu, sigma) for _ in range(100000)]
within_1 = sum(1 for s in samples if mu - sigma <= s <= mu + sigma) / 100000
within_2 = sum(1 for s in samples if mu - 2*sigma <= s <= mu + 2*sigma) / 100000
within_3 = sum(1 for s in samples if mu - 3*sigma <= s <= mu + 3*sigma) / 100000
print(f"Within 1σ: {within_1:.1%} (expected: 68.3%)")
print(f"Within 2σ: {within_2:.1%} (expected: 95.4%)")
print(f"Within 3σ: {within_3:.1%} (expected: 99.7%)")

# Binomial PMF plot (text-based)
print(f"\n=== Binomial PMF: n=10, p=0.5 ===")
for k in range(11):
    p_k = comb(10, k) * 0.5**10
    bar = '█' * int(p_k * 200)
    print(f"  k={k:2d}: {p_k:.4f} {bar}")
```

## Connection to CS / Games / AI

- **Bernoulli** — dropout (each neuron is a Bernoulli trial), click-through rates
- **Binomial** — "how many of $n$ users convert?" in A/B testing
- **Poisson** — server request rates, rare event modelling, network packet arrivals
- **Uniform** — random number generation, initialising neural network weights
- **Gaussian** — weight initialisation (Xavier, He), noise in GANs, Gaussian processes, the bell curve of errors
- **Loss functions** — MSE loss assumes Gaussian errors; cross-entropy assumes Bernoulli

## Check Your Understanding

1. **Pen & paper:** You roll a die 5 times.  What is the probability of getting exactly two 6s?  (Hint: Binomial with $n = 5, p = 1/6$.)
2. **Pen & paper:** Emails arrive at a rate of 3 per minute (Poisson).  What is $P(\text{no emails in a minute})$?
3. **Pen & paper:** For $X \sim \mathcal{N}(100, 15^2)$, what percentage of values fall between 85 and 115?
4. **Think about it:** Why does Poisson approximate Binomial when $n$ is large and $p$ is small?
