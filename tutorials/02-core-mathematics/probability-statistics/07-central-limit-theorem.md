# Central Limit Theorem

## Intuition

Take **any** distribution — no matter how weird — and average many independent
samples from it.  That average will be approximately **normally distributed**.
The more samples, the better the approximation.  This is why the bell curve
appears everywhere in nature and why statistical tests work.

## Prerequisites

- Tier 4, Lesson 6: Continuous Distributions (Gaussian)
- Tier 4, Lesson 4: Expectation and Variance

## From First Principles

### Statement

If $X_1, X_2, \ldots, X_n$ are independent random variables from **any** distribution with mean $\mu$ and variance $\sigma^2$, then as $n \to \infty$:

$$\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i \quad \xrightarrow{d} \quad \mathcal{N}\left(\mu, \frac{\sigma^2}{n}\right)$$

Or equivalently, the standardised version:

$$Z_n = \frac{\bar{X}_n - \mu}{\sigma / \sqrt{n}} \quad \xrightarrow{d} \quad \mathcal{N}(0, 1)$$

### Key points

1. The original distribution can be **anything**: uniform, exponential, Poisson, bimodal...
2. The mean $\bar{X}_n$ is approximately normal for large enough $n$
3. The spread of $\bar{X}_n$ shrinks as $\frac{\sigma}{\sqrt{n}}$ — the **standard error**
4. Rule of thumb: $n \ge 30$ usually suffices

### Pen & paper: Die rolls

A single die roll: $\mu = 3.5$, $\sigma^2 = 35/12 \approx 2.917$, $\sigma \approx 1.708$.

Average of $n = 36$ rolls:

- Mean of $\bar{X}$: $\mu = 3.5$
- Standard error: $\sigma / \sqrt{n} = 1.708 / 6 \approx 0.285$

By CLT: $\bar{X}_{36} \approx \mathcal{N}(3.5, 0.285^2)$

$P(3 \le \bar{X}_{36} \le 4) \approx P\left(\frac{3-3.5}{0.285} \le Z \le \frac{4-3.5}{0.285}\right) = P(-1.75 \le Z \le 1.75)$

From the standard normal table: $\approx 0.92$

### Why $\sqrt{n}$?

$\text{Var}(\bar{X}) = \text{Var}\left(\frac{1}{n}\sum X_i\right) = \frac{1}{n^2} \cdot n\sigma^2 = \frac{\sigma^2}{n}$

$\text{SD}(\bar{X}) = \frac{\sigma}{\sqrt{n}}$

So to halve the standard error, you need **4×** the samples.  To get 10× more
precise, you need 100× the samples.

### Where CLT breaks down

- Distributions with **infinite variance** (e.g., Cauchy distribution)
- **Dependent** samples
- Very small $n$ for highly skewed distributions

## Python Verification

```python
# ── Central Limit Theorem: demonstration ────────────────────
import random
import math

random.seed(42)

# Demonstrate CLT with die rolls
print("=== CLT: Average of n die rolls ===")
n_experiments = 50000

for n in [1, 2, 5, 10, 30, 100]:
    means = []
    for _ in range(n_experiments):
        sample = [random.randint(1, 6) for _ in range(n)]
        means.append(sum(sample) / n)
    
    avg = sum(means) / len(means)
    var = sum((m - avg)**2 for m in means) / len(means)
    
    expected_var = (35/12) / n
    print(f"  n={n:3d}: mean={avg:.3f} (exp 3.5), var={var:.4f} (exp {expected_var:.4f})")

# CLT with uniform distribution
print(f"\n=== CLT with Uniform(0,1) — mean=0.5, var=1/12 ===")
for n in [1, 5, 30]:
    means = [sum(random.random() for _ in range(n)) / n for _ in range(n_experiments)]
    avg = sum(means) / len(means)
    std = (sum((m - avg)**2 for m in means) / len(means)) ** 0.5
    expected_std = math.sqrt(1/(12*n))
    print(f"  n={n:2d}: std={std:.4f} (expected {expected_std:.4f})")

# CLT with exponential distribution (highly skewed!)
print(f"\n=== CLT with Exponential(λ=1) — skewed, yet averages are normal ===")
for n in [1, 5, 30, 100]:
    means = []
    for _ in range(n_experiments):
        sample = [random.expovariate(1) for _ in range(n)]
        means.append(sum(sample) / n)
    avg = sum(means) / len(means)
    std = (sum((m - avg)**2 for m in means) / len(means)) ** 0.5
    print(f"  n={n:3d}: mean={avg:.3f} (exp 1.0), std={std:.4f} (exp {1/math.sqrt(n):.4f})")

# Histogram (text-based) for n=30 die rolls
print(f"\n=== Histogram: average of 30 die rolls ===")
means = [sum(random.randint(1, 6) for _ in range(30)) / 30 for _ in range(10000)]
bins = [0] * 20
for m in means:
    idx = min(int((m - 2.5) / 0.1), 19)
    idx = max(0, idx)
    bins[idx] += 1
for i, count in enumerate(bins):
    val = 2.5 + i * 0.1
    bar = '█' * (count // 20)
    print(f"  {val:.1f}: {bar}")
```

## Connection to CS / Games / AI

- **Mini-batch SGD** — the gradient estimate from a mini-batch is approximately normal (by CLT), enabling convergence analysis
- **Confidence intervals** — "the true mean is within $\bar{x} \pm 1.96 \cdot \sigma/\sqrt{n}$" with 95% confidence
- **A/B testing** — sample means are normal → we can use z-tests and t-tests
- **Monte Carlo** — error decreases as $1/\sqrt{n}$, directly from CLT
- **Why Gaussian noise** — many real-world noise sources are sums of many small effects → CLT → Gaussian

## Check Your Understanding

1. **Pen & paper:** You average 100 rolls of a fair die.  What is the standard error of the mean?  What is $P(\bar{X} > 3.7)$ approximately?
2. **Pen & paper:** To reduce the standard error by half, how many times more samples do you need?
3. **Think about it:** A machine learning model is trained with mini-batches of size 32.  How does the CLT relate to the stability of the gradient estimates?
