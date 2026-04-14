# Monte Carlo Methods and MCMC

## Intuition

Some integrals and probabilities are impossible to compute analytically.
**Monte Carlo** methods estimate them by **random sampling**.  Need the area
of a weird shape?  Throw darts randomly and count what fraction lands inside.
Need to sample from a complex distribution?  MCMC constructs a random walk
that converges to it.

## Prerequisites

- Tier 4, Lesson 3: Random Variables
- Tier 3, Lesson 6: Integrals
- Tier 10, Lesson 4: Markov Chains

## From First Principles

### Basic Monte Carlo integration

To estimate $\int_a^b f(x)\,dx$:

1. Sample $N$ points uniformly from $[a, b]$
2. Estimate: $\int_a^b f(x)\,dx \approx (b-a) \cdot \frac{1}{N}\sum_{i=1}^{N} f(x_i)$

Error decreases as $O(1/\sqrt{N})$ (from CLT).

### Pen & paper: Estimate π

Area of unit circle = $\pi r^2 = \pi$.  Inscribe in square $[-1,1]^2$ (area = 4).

$\pi \approx 4 \times \frac{\text{points inside circle}}{\text{total points}}$

### Monte Carlo for expectations

$$E[g(X)] = \int g(x) p(x)\,dx \approx \frac{1}{N}\sum_{i=1}^{N} g(x_i), \quad x_i \sim p$$

### Markov Chain Monte Carlo (MCMC)

**Problem:** How to sample from a complex distribution $p(x)$ when you can only evaluate $p(x)$ (up to a constant)?

**Metropolis-Hastings algorithm:**

1. Start at some $x_0$
2. Propose $x' \sim q(x'|x_t)$ (e.g., $x' = x_t + \mathcal{N}(0, \sigma^2)$)
3. Accept with probability $\min\left(1, \frac{p(x')}{p(x_t)}\right)$
4. If accepted: $x_{t+1} = x'$.  Else: $x_{t+1} = x_t$.
5. After burn-in, the samples $\{x_t\}$ are distributed as $p(x)$.

### Why it works

The acceptance rule ensures **detailed balance**: the Markov chain's stationary distribution is $p(x)$.

## Python Verification

```python
# ── Monte Carlo Methods ─────────────────────────────────────
import math
import random

random.seed(42)

# Estimate π
print("=== Estimate π by dart-throwing ===")
for N in [100, 1000, 10000, 100000]:
    inside = sum(1 for _ in range(N) if random.random()**2 + random.random()**2 < 1)
    pi_est = 4 * inside / N
    error = abs(pi_est - math.pi)
    print(f"  N={N:>7,}: π ≈ {pi_est:.4f}, error = {error:.4f}")

# Monte Carlo integration: ∫₀¹ x² dx = 1/3
print(f"\n=== MC integration: ∫₀¹ x² dx ===")
for N in [100, 1000, 10000]:
    samples = [random.random()**2 for _ in range(N)]
    estimate = sum(samples) / N
    print(f"  N={N:>5,}: estimate = {estimate:.4f} (exact: {1/3:.4f})")

# Metropolis-Hastings: sample from N(0,1) using only p(x) ∝ e^{-x²/2}
print(f"\n=== MCMC: Metropolis-Hastings for N(0,1) ===")
def target_unnorm(x):
    return math.exp(-x**2 / 2)

x = 0.0
samples = []
accepted = 0
proposal_std = 1.0

for i in range(50000):
    x_prop = x + random.gauss(0, proposal_std)
    accept_ratio = target_unnorm(x_prop) / target_unnorm(x)
    if random.random() < min(1, accept_ratio):
        x = x_prop
        accepted += 1
    if i > 5000:  # burn-in
        samples.append(x)

mean = sum(samples) / len(samples)
var = sum((s - mean)**2 for s in samples) / len(samples)
print(f"  Samples: {len(samples)}")
print(f"  Mean: {mean:.4f} (expected: 0)")
print(f"  Variance: {var:.4f} (expected: 1)")
print(f"  Acceptance rate: {accepted/50000:.2%}")

# Error rate: 1/√N
print(f"\n=== MC error rate ===")
for N in [100, 10000, 1000000]:
    error = 1 / math.sqrt(N)
    print(f"  N={N:>8,}: expected error ∝ {error:.4f}")
print("  To halve the error, need 4× the samples")
```

## Check Your Understanding

1. **Pen & paper:** Estimate $\int_0^2 x^3\,dx$ using Monte Carlo with 4 random samples: $x = 0.3, 1.2, 0.8, 1.7$.  Compare to the exact answer.
2. **Pen & paper:** In Metropolis-Hastings, if $p(x') > p(x_t)$, what is the acceptance probability?  What if $p(x') < p(x_t)$?
3. **Think about it:** Why does Monte Carlo error decrease as $1/\sqrt{N}$ regardless of dimension?
