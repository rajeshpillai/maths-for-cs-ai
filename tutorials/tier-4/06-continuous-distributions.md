# Continuous Distributions — Uniform, Gaussian, Exponential, Gamma, Chi-Square, Student's t

## Intuition

Continuous random variables can take any real value in some interval.  "Any
value equally likely?" → Uniform.  "Nature's default bell curve" → Gaussian.
"Time until the next event" → Exponential.  "Sum of waiting times" → Gamma.
"Sum of squared normals" → Chi-square.  "Small-sample estimate of a mean" →
Student's t.  These distributions are the building blocks of statistical
inference and machine learning.

## Prerequisites

- Tier 4, Lesson 4: Expectation and Variance
- Tier 4, Lesson 5: Discrete Distributions
- Tier 3, Lesson 6: Integrals (area under a curve)

## From First Principles

### Continuous Uniform distribution

All values in $[a, b]$ equally likely.  The PDF is a flat rectangle.

$$f(x) = \frac{1}{b - a} \quad \text{for } a \le x \le b$$

**Deriving the moments:**

$$E[X] = \int_a^b x \cdot \frac{1}{b-a}\,dx = \frac{1}{b-a} \cdot \frac{x^2}{2}\Big|_a^b = \frac{b^2 - a^2}{2(b-a)} = \frac{a + b}{2}$$

$$E[X^2] = \frac{1}{b-a}\int_a^b x^2\,dx = \frac{b^3 - a^3}{3(b-a)} = \frac{a^2 + ab + b^2}{3}$$

$$\text{Var}(X) = E[X^2] - (E[X])^2 = \frac{a^2 + ab + b^2}{3} - \frac{(a+b)^2}{4} = \frac{(b-a)^2}{12}$$

**Pen & paper:** $X \sim \text{Uniform}(0, 1)$:
$E[X] = 0.5$, $\text{Var}(X) = 1/12 \approx 0.083$.

### Gaussian (Normal) distribution — the bell curve

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)$$

$E[X] = \mu$, $\text{Var}(X) = \sigma^2$

**Standard normal:** $\mu = 0, \sigma = 1$, written $Z \sim \mathcal{N}(0, 1)$.

**The 68-95-99.7 rule (memorise this):**
- 68% of values fall within $\mu \pm 1\sigma$
- 95% within $\mu \pm 2\sigma$
- 99.7% within $\mu \pm 3\sigma$

**Pen & paper:** Heights are $\mathcal{N}(170, 10^2)$ cm.
- 68% between 160 and 180 cm
- 95% between 150 and 190 cm

**Why Gaussians are everywhere:** The Central Limit Theorem (Lesson 7) explains
it: the sum of many independent random effects tends toward a Gaussian,
regardless of the individual distributions.

### Exponential distribution

Models the **waiting time** until the next event in a Poisson process.

If events arrive at rate $\lambda$ per unit time, the time $X$ between
consecutive events follows:

$$f(x) = \lambda e^{-\lambda x} \quad \text{for } x \ge 0$$

**Derivation from Poisson:** The probability of no events in time $t$ is
$P(N=0) = e^{-\lambda t}$.  So $P(X > t) = e^{-\lambda t}$, giving CDF
$F(t) = 1 - e^{-\lambda t}$ and PDF $f(t) = F'(t) = \lambda e^{-\lambda t}$.

**Moments:**

$$E[X] = \frac{1}{\lambda}, \quad \text{Var}(X) = \frac{1}{\lambda^2}$$

**Memoryless property:** $P(X > s + t \mid X > s) = P(X > t)$.  Past waiting
gives no information about future waiting — unique to the exponential.

**Pen & paper:** Server requests arrive at $\lambda = 5$/minute.  Mean wait
$= 1/5 = 0.2$ minutes $= 12$ seconds.

$P(\text{wait} > 0.5\text{ min}) = e^{-5 \times 0.5} = e^{-2.5} \approx 0.082$.

### Gamma distribution

Generalises the exponential: the time until the $\alpha$-th event.

$$f(x) = \frac{\lambda^\alpha}{\Gamma(\alpha)} x^{\alpha-1} e^{-\lambda x} \quad \text{for } x \ge 0$$

where $\Gamma(\alpha) = \int_0^\infty t^{\alpha-1} e^{-t}\,dt$ is the gamma
function.  For positive integers, $\Gamma(n) = (n-1)!$.

$E[X] = \frac{\alpha}{\lambda}$, $\text{Var}(X) = \frac{\alpha}{\lambda^2}$

**Special case:** $\alpha = 1$ gives the exponential distribution.

**Pen & paper:** Time until the 3rd customer, $\alpha = 3$, $\lambda = 2$/hour.
$E[X] = 3/2 = 1.5$ hours, $\text{Var}(X) = 3/4 = 0.75$ hours$^2$.

### Chi-square distribution

If $Z_1, Z_2, \ldots, Z_k$ are independent standard normals, then:

$$Q = Z_1^2 + Z_2^2 + \cdots + Z_k^2 \sim \chi^2(k)$$

This is a Gamma distribution with $\alpha = k/2$ and $\lambda = 1/2$.

$E[Q] = k$, $\text{Var}(Q) = 2k$

**Pen & paper:** $k = 3$ degrees of freedom.  $E[Q] = 3$, $\text{Var}(Q) = 6$.

**Why it matters:** Sample variance follows a chi-square distribution (after
scaling).  If $X_1, \ldots, X_n \sim \mathcal{N}(\mu, \sigma^2)$:

$$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$$

where $S^2 = \frac{1}{n-1}\sum(X_i - \bar{X})^2$.

### Student's t distribution

When estimating a mean from a small sample and variance is unknown:

$$T = \frac{\bar{X} - \mu}{S / \sqrt{n}} \sim t(n-1)$$

The PDF is:

$$f(t) = \frac{\Gamma\left(\frac{\nu+1}{2}\right)}{\sqrt{\nu\pi}\,\Gamma\left(\frac{\nu}{2}\right)} \left(1 + \frac{t^2}{\nu}\right)^{-\frac{\nu+1}{2}}$$

where $\nu = n - 1$ is degrees of freedom.

$E[T] = 0$ (for $\nu > 1$), $\text{Var}(T) = \frac{\nu}{\nu - 2}$ (for $\nu > 2$)

**Key properties:**
- Symmetric about 0, like the normal
- Heavier tails than normal (more probability in the extremes)
- As $\nu \to \infty$, $t(\nu) \to \mathcal{N}(0,1)$

**Pen & paper:** $\nu = 4$: $\text{Var}(T) = 4/2 = 2$ (compared to 1 for
the normal — fatter tails).  $\nu = 30$: $\text{Var}(T) = 30/28 \approx 1.07$
(almost normal).

### Summary table

| Distribution | Parameters | $E[X]$ | $\text{Var}(X)$ |
|-------------|-----------|--------|-----------------|
| Uniform | $a, b$ | $\frac{a+b}{2}$ | $\frac{(b-a)^2}{12}$ |
| Gaussian | $\mu, \sigma^2$ | $\mu$ | $\sigma^2$ |
| Exponential | $\lambda$ | $1/\lambda$ | $1/\lambda^2$ |
| Gamma | $\alpha, \lambda$ | $\alpha/\lambda$ | $\alpha/\lambda^2$ |
| Chi-square | $k$ | $k$ | $2k$ |
| Student's $t$ | $\nu$ | $0$ | $\nu/(\nu-2)$ |

## Visualisation

The matplotlib code below plots all six distributions on a single figure for
visual comparison.  Notice how the t distribution's tails are heavier than the
normal, and how chi-square is right-skewed.

## Python Verification

```python
# ── Continuous Distributions: verifying pen & paper work ──────
import math
import random

random.seed(42)

# Uniform: moments
print("=== Uniform(0, 1) ===")
a, b = 0, 1
print(f"E[X] = {(a+b)/2}, Var(X) = {(b-a)**2/12:.4f}")

# Gaussian: 68-95-99.7 rule
print(f"\n=== Gaussian: 68-95-99.7 rule ===")
mu, sigma = 170, 10
samples = [random.gauss(mu, sigma) for _ in range(100000)]
within_1 = sum(1 for s in samples if mu - sigma <= s <= mu + sigma) / 100000
within_2 = sum(1 for s in samples if mu - 2*sigma <= s <= mu + 2*sigma) / 100000
print(f"Within 1 sigma: {within_1:.1%} (expected: 68.3%)")
print(f"Within 2 sigma: {within_2:.1%} (expected: 95.4%)")

# Exponential: verify moments and memoryless property
print(f"\n=== Exponential(lambda=5) ===")
lam = 5
exp_samples = [random.expovariate(lam) for _ in range(100000)]
mean_exp = sum(exp_samples) / len(exp_samples)
var_exp = sum((x - mean_exp)**2 for x in exp_samples) / len(exp_samples)
print(f"E[X]: simulated={mean_exp:.4f}, theoretical={1/lam:.4f}")
print(f"Var(X): simulated={var_exp:.4f}, theoretical={1/lam**2:.4f}")

# P(X > 0.5)
p_gt_half = sum(1 for x in exp_samples if x > 0.5) / len(exp_samples)
print(f"P(X > 0.5): simulated={p_gt_half:.4f}, theoretical={math.exp(-lam*0.5):.4f}")

# Memoryless property check
# P(X > 0.7 | X > 0.2) should equal P(X > 0.5)
survivors = [x for x in exp_samples if x > 0.2]
p_conditional = sum(1 for x in survivors if x > 0.7) / len(survivors)
print(f"Memoryless: P(X>0.7|X>0.2)={p_conditional:.4f}, P(X>0.5)={p_gt_half:.4f}")

# Chi-square: sum of squared standard normals
print(f"\n=== Chi-square(k=3) ===")
k = 3
chi2_samples = []
for _ in range(100000):
    q = sum(random.gauss(0, 1)**2 for _ in range(k))
    chi2_samples.append(q)
mean_chi2 = sum(chi2_samples) / len(chi2_samples)
var_chi2 = sum((x - mean_chi2)**2 for x in chi2_samples) / len(chi2_samples)
print(f"E[Q]: simulated={mean_chi2:.4f}, theoretical={k}")
print(f"Var(Q): simulated={var_chi2:.4f}, theoretical={2*k}")

# Student's t: heavier tails than normal
print(f"\n=== Student's t: tail comparison ===")
nu = 4
# t = Z / sqrt(V/nu) where Z ~ N(0,1), V ~ chi2(nu)
t_samples = []
z_samples = []
for _ in range(100000):
    z = random.gauss(0, 1)
    v = sum(random.gauss(0, 1)**2 for _ in range(nu))
    t_val = z / math.sqrt(v / nu)
    t_samples.append(t_val)
    z_samples.append(z)

# Compare tail probabilities: P(|X| > 3)
t_tail = sum(1 for x in t_samples if abs(x) > 3) / len(t_samples)
z_tail = sum(1 for x in z_samples if abs(x) > 3) / len(z_samples)
print(f"P(|T| > 3) with nu=4: {t_tail:.4f}")
print(f"P(|Z| > 3) for normal: {z_tail:.4f}")
print(f"t has {t_tail/z_tail:.1f}x more probability in the tails")
```

## Connection to CS / Games / AI

- **Uniform** — random number generation, initialising neural network weights
- **Gaussian** — weight initialisation (Xavier, He), noise in GANs, Gaussian processes
- **Exponential** — modelling inter-arrival times in queuing systems, network traffic
- **Gamma** — Bayesian prior for rate parameters, modelling wait times
- **Chi-square** — goodness-of-fit tests, feature selection in NLP
- **Student's t** — confidence intervals with small samples, robust loss functions (t-distribution loss)
- **Loss functions** — MSE loss assumes Gaussian errors; heavy-tailed losses use t-distributions

## Check Your Understanding

1. **Pen & paper:** For $X \sim \mathcal{N}(100, 15^2)$, what percentage of values fall between 85 and 115?
2. **Pen & paper:** Buses arrive at rate $\lambda = 3$/hour (Poisson process).  What is the probability you wait more than 30 minutes?
3. **Pen & paper:** If $Z_1, Z_2 \sim \mathcal{N}(0,1)$ independently, what are $E[Z_1^2 + Z_2^2]$ and $\text{Var}(Z_1^2 + Z_2^2)$?
4. **Pen & paper:** A Student's $t$ with $\nu = 9$ degrees of freedom has $\text{Var}(T) = $ ?  How close is this to a standard normal?
5. **Think about it:** Why does the exponential distribution's memoryless property make it natural for modelling component lifetimes?
