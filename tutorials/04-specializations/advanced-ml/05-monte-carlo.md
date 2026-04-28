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

## Visualisation — Estimating π by throwing darts

The classic Monte-Carlo demo: estimate $\pi$ by throwing random darts
at a square and counting how many land in the inscribed circle. The
$1/\sqrt{N}$ error rate becomes visible as the estimate slowly homes
in on $\pi$.

```python
# ── Visualising Monte Carlo estimation of π ────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(0)

# Throw N points uniformly on [-1, 1]²; count how many land inside
# the unit circle. Ratio × 4 = π estimate.
N_max = 5000
xs = rng.uniform(-1, 1, N_max)
ys = rng.uniform(-1, 1, N_max)
inside = xs * xs + ys * ys <= 1.0
running_count = np.cumsum(inside)
ks = np.arange(1, N_max + 1)
running_pi = 4 * running_count / ks

fig, axes = plt.subplots(1, 2, figsize=(14, 5.5))

# (1) The dart picture: blue points inside circle, red points outside.
ax = axes[0]
n_show = 2000
ax.scatter(xs[:n_show][inside[:n_show]], ys[:n_show][inside[:n_show]],
           color="tab:blue", s=4, alpha=0.5, label="inside circle")
ax.scatter(xs[:n_show][~inside[:n_show]], ys[:n_show][~inside[:n_show]],
           color="tab:red", s=4, alpha=0.5, label="outside circle")
theta = np.linspace(0, 2 * np.pi, 200)
ax.plot(np.cos(theta), np.sin(theta), color="black", lw=2)
ax.add_patch(plt.Rectangle((-1, -1), 2, 2, fill=False, edgecolor="black", lw=2))
ax.set_aspect("equal"); ax.set_xlim(-1.1, 1.1); ax.set_ylim(-1.1, 1.1)
in_count = inside[:n_show].sum()
pi_est   = 4 * in_count / n_show
ax.set_title(f"{n_show} random darts: {in_count} hit the circle\n"
             f"π ≈ 4 · {in_count}/{n_show} = {pi_est:.4f}\n"
             f"(true π = 3.14159…)")
ax.legend(loc="upper right", fontsize=9)
ax.grid(True, alpha=0.3)

# (2) Convergence plot: |estimate − π| vs N on log-log axes.
# Slope is approximately −1/2, matching the 1/√N error rate.
ax = axes[1]
errors = np.abs(running_pi - np.pi)
ax.loglog(ks, errors, color="tab:blue", lw=0.8, alpha=0.8, label="|estimate − π|")
ax.loglog(ks, 2.0 / np.sqrt(ks), color="tab:red", lw=2, linestyle="--",
          label="$2/\\sqrt{N}$ reference")
ax.set_xlabel("number of samples N")
ax.set_ylabel("absolute error (log)")
ax.set_title("Monte-Carlo error decays like $1/\\sqrt{N}$\n"
             "(quadrupling samples ⇒ halving error)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the convergence table.
print(f"{'N':>10}  {'estimate of π':>15}  {'error':>10}")
print("-" * 40)
for n in [100, 1_000, 10_000, 100_000, N_max]:
    est = 4 * np.mean(inside[:n])
    print(f"  {n:>8,}  {est:>13.6f}    {abs(est - np.pi):>10.5f}")
```

**Two universal Monte-Carlo lessons:**

- **Random sampling can compute things you can't write a closed-form
  for.** The area of a circle is "easy" — $\pi r^2$. But replace the
  circle with an arbitrarily-shaped region and Monte Carlo still works
  unchanged: throw darts, count hits.
- **The $1/\sqrt{N}$ rate is a constant of nature.** Doesn't depend
  on the dimension or the integrand's shape. To go from 2 digits of
  precision to 3, need 100× more samples; to 6 digits, need
  $10^{12}$ samples. **This is why path tracing is slow** — every
  pixel of a noise-free render requires *thousands* of light-path
  samples.

## Connection to CS / Games / AI / Business / Industry

- **AI / ML.** **Monte Carlo Tree Search** is the engine that beat the
  world Go champion (AlphaGo). MCMC sampling is how Bayesian models
  (Stan, PyMC, NumPyro) estimate posteriors. RL value functions are
  estimated by *Monte Carlo returns* whenever the environment is too
  complex for exact dynamic programming.
- **Games / Graphics.** **Path tracing** — Pixar's RenderMan, Unreal
  Engine 5's Lumen, every offline cinematic renderer — is Monte Carlo
  integration over light paths. The "noise" you see in a low-sample
  ray-traced preview is exactly the $1/\sqrt{N}$ MC error from this
  lesson.
- **Business / Finance.** **Option pricing** for path-dependent or
  multi-asset derivatives has no closed form, so banks (Goldman, JPM)
  run Monte Carlo over thousands of price paths. **Value-at-Risk**
  reports — the daily risk numbers regulators require — are produced by
  Monte Carlo across portfolio scenarios. Project-completion-time
  estimates in PERT use the same maths.
- **Engineering / Science.** Particle-physics detectors at CERN are
  designed by Monte Carlo simulation of collisions. Drug-trial sample
  sizes and **clinical-trial power calculations** rely on MC. Climate
  models run thousands of perturbed-parameter ensembles to quantify
  uncertainty.
- **CS / Software.** Randomised algorithms (e.g. **Bloom filters**,
  randomised primality tests like Miller-Rabin) are Monte Carlo in
  spirit — trade a small failure probability for huge speedups.
- **Reinsurance catastrophe modeling (RMS, AIR Worldwide, Verisk)** — Lloyd's of London and Munich Re run millions of synthetic hurricane and earthquake tracks through Monte Carlo loss simulators to set premiums and capital reserves.
- **Nuclear reactor design (Los Alamos MCNP, Argonne SERPENT)** — neutron transport in fission cores is solved by Monte Carlo over particle histories; this is the same algorithm used to design every commercial reactor since the Manhattan Project.
- **Pharmaceutical pipeline NPV (Merck, Pfizer)** — drug-development decisions use Monte Carlo over uncertain success probabilities at each clinical phase, valuing a single Phase-II asset across thousands of simulated outcomes.
- **Pixar RenderMan and Disney Hyperion** — every Pixar film since "Monsters University" (2013) uses path-traced global illumination, with Monte Carlo bounces per pixel pushing render times of ~50 hours per frame on render farms.

## Check Your Understanding

1. **Pen & paper:** Estimate $\int_0^2 x^3\,dx$ using Monte Carlo with 4 random samples: $x = 0.3, 1.2, 0.8, 1.7$.  Compare to the exact answer.
2. **Pen & paper:** In Metropolis-Hastings, if $p(x') > p(x_t)$, what is the acceptance probability?  What if $p(x') < p(x_t)$?
3. **Think about it:** Why does Monte Carlo error decrease as $1/\sqrt{N}$ regardless of dimension?
