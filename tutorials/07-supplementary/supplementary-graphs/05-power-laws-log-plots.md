# Power Laws, Log Plots, and Exponential Growth & Decay

## Intuition

**Power laws** ($y = cx^k$) describe phenomena where a few items dominate:
word frequencies, city sizes, wealth distribution, neural network weight
magnitudes.  **Log plots** reveal these hidden patterns by turning curves
into straight lines.  Understanding these shapes helps you choose the right
scale for visualising data.

## Prerequisites

- Supplementary, Lesson 2: Exponential and Logarithmic

## From First Principles

### Power law: $y = cx^k$

| $k$ | Shape | Example |
|-----|-------|---------|
| $k = 1$ | Linear | Direct proportion |
| $k = 2$ | Quadratic | Area vs. side length |
| $k = 0.5$ | Square root | Diminishing returns |
| $k = -1$ | Inverse | $y = 1/x$ |
| $k = -2$ | Inverse square | Gravity, light intensity |

### Zipf's law (a power law in language)

The $r$-th most common word has frequency $\propto 1/r$.

Rank 1 ("the") appears ~7% of the time.  Rank 2 ("of") ~3.5%.  Rank 10 ~0.7%.

### Log-log plot: making power laws visible

Take $\log$ of both sides of $y = cx^k$:

$$\log y = \log c + k \log x$$

This is a straight line with slope $k$ on a log-log plot.

**Pen & paper:** Data points: $(1, 100), (10, 10), (100, 1)$.

$\log x$: $0, 1, 2$.  $\log y$: $2, 1, 0$.

Slope $= (0-2)/(2-0) = -1$.  So $k = -1$: inverse power law.

### Semi-log plot: detecting exponentials

For $y = ce^{rx}$: $\ln y = \ln c + rx$.  Linear on a semi-log (log-y, linear-x) plot.

### Exponential growth

$$y = y_0 \cdot e^{rt}$$

**Doubling time:** $t_d = \frac{\ln 2}{r}$

**Pen & paper:** Bacteria double every 20 minutes ($r = \ln 2 / 20$).

Starting with 1 cell: after 10 hours (30 doublings): $2^{30} \approx 10^9$ cells.

### Exponential decay

$$y = y_0 \cdot e^{-\lambda t}$$

**Half-life:** $t_{1/2} = \frac{\ln 2}{\lambda}$

**Pen & paper:** Learning rate decay: $\alpha_t = 0.01 \cdot 0.95^t$

After 100 epochs: $0.01 \times 0.95^{100} = 0.01 \times 0.00592 = 0.0000592$

### Compound interest: $A = P(1 + r/n)^{nt}$

As $n \to \infty$: $A = Pe^{rt}$ (continuous compounding).

**Pen & paper:** £1000 at 5% for 10 years:

Compound annually: $1000(1.05)^{10} = 1628.89$

Continuous: $1000 \cdot e^{0.5} = 1648.72$

## Python Verification

```python
# ── Power Laws, Log Plots, Growth & Decay ───────────────────
import math

# Power law: y = 100/x (Zipf-like)
print("=== Power law: y = 100 · x^(-1) ===")
for x in [1, 2, 5, 10, 20, 50, 100]:
    y = 100 / x
    print(f"  x={x:3d}: y={y:6.1f}")

# Log-log: straight line test
print(f"\n=== Log-log reveals power law ===")
data = [(1, 100), (10, 10), (100, 1), (1000, 0.1)]
print(f"{'x':>6} {'y':>8} {'log(x)':>7} {'log(y)':>7}")
for x, y in data:
    print(f"  {x:5d} {y:8.1f} {math.log10(x):7.2f} {math.log10(y):7.2f}")
# Slope
lx = [math.log10(x) for x, _ in data]
ly = [math.log10(y) for _, y in data]
slope = (ly[-1] - ly[0]) / (lx[-1] - lx[0])
print(f"  Slope (= power k) = {slope:.2f}")

# Exponential growth: doubling
print(f"\n=== Exponential growth: bacteria doubling every 20 min ===")
for hours in [0, 1, 2, 5, 10]:
    doublings = hours * 3  # 3 doublings per hour
    cells = 2 ** doublings
    print(f"  t={hours}h: {cells:>15,} cells")

# Exponential decay: learning rate
print(f"\n=== Learning rate decay: α = 0.01 × 0.95^t ===")
for epoch in [0, 10, 50, 100, 200]:
    lr = 0.01 * 0.95**epoch
    print(f"  epoch {epoch:3d}: α = {lr:.6f}")

# Half-life
print(f"\n=== Half-life ===")
lam = 0.1  # decay constant
half_life = math.log(2) / lam
print(f"  λ = {lam}, half-life = {half_life:.2f}")
y = 100
for t in range(0, 50, 5):
    y_t = 100 * math.exp(-lam * t)
    print(f"  t={t:2d}: y = {y_t:.2f}")

# Compound interest
print(f"\n=== Compound interest: £1000 at 5% for 10 years ===")
P = 1000
r = 0.05
t = 10
for n_label, n in [("Annual", 1), ("Monthly", 12), ("Daily", 365), ("Continuous", None)]:
    if n:
        A = P * (1 + r/n)**(n*t)
    else:
        A = P * math.exp(r * t)
    print(f"  {n_label:12s}: £{A:.2f}")
```

## Visualisation — Power laws are straight lines on log-log axes

A power law $y = a x^k$ becomes a **straight line** of slope $k$ on a
log-log plot — so power laws can be detected by eye. Two of the most
famous examples: Zipf's law for word frequencies (~$1/\text{rank}$),
and city populations.

```python
# ── Visualising power laws and log-log plots ────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) Same power law on linear vs log-log axes.
ax = axes[0]
x = np.linspace(1, 20, 200)
for k, color in [(2, "tab:blue"), (1, "tab:orange"), (0.5, "tab:green")]:
    ax.plot(x, x ** k, lw=2, color=color, label=f"y = x^{k}")
ax.set_xlabel("x"); ax.set_ylabel("y (linear)")
ax.set_title("Power laws on linear axes\nlooks like generic curves")
ax.legend(); ax.grid(True, alpha=0.3)

ax = axes[1]
for k, color in [(2, "tab:blue"), (1, "tab:orange"), (0.5, "tab:green")]:
    ax.loglog(x, x ** k, lw=2, color=color, label=f"y = x^{k}, slope = {k}")
ax.set_xlabel("x (log)"); ax.set_ylabel("y (log)")
ax.set_title("Same curves on log-log axes\n→ STRAIGHT LINES, slope = exponent")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

# (2) Zipf's law in NLP: word i has frequency ~ 1/i.
ax = axes[2]
ranks = np.arange(1, 1001)
zipf = 1.0 / ranks
ax.loglog(ranks, zipf, color="tab:red", lw=2, label="Zipf: f ∝ 1/rank")
# Add jittered observed-frequencies to mimic real corpus data.
rng = np.random.default_rng(0)
observed = zipf * rng.uniform(0.6, 1.4, len(ranks))
ax.scatter(ranks[::10], observed[::10], color="tab:blue", s=10, alpha=0.5,
           label="observed (noisy)")
ax.set_xlabel("rank (log)")
ax.set_ylabel("frequency (log)")
ax.set_title("Zipf's law: word frequency ∝ 1/rank\n(any natural-language corpus, observed since 1935)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print examples that follow power laws.
print("Phenomena obeying power laws (and their typical exponents):")
print("  Zipf's law in NLP            : f ∝ 1/rank        (k ≈ -1)")
print("  City populations (rank-size) : pop ∝ 1/rank       (Zipf again)")
print("  Earthquake magnitudes        : N(M) ∝ 10⁻ᵇᴹ      (Gutenberg-Richter)")
print("  Pareto wealth distribution   : P(W > w) ∝ w⁻ᵅ    (α ≈ 1.16)")
print("  Allometric scaling in biology: metabolism ∝ mass^(3/4)  (Kleiber's law)")
print("  Neural network scaling laws  : loss ∝ (compute)^(-α)    (Kaplan/Hoffmann)")
```

## Connection to CS / Games / AI

- **Zipf's law** — word frequencies in NLP, long-tail distributions in recommendation systems
- **Log plots** — standard for visualising training loss, learning curves, model performance
- **Exponential growth** — viral spread, compute scaling in AI, dataset growth
- **Learning rate decay** — exponential, step, cosine schedules
- **Power-law networks** — scale-free graphs (internet, social networks)
- **Compound growth** — Moore's law (exponential growth of transistor count)

## Check Your Understanding

1. **Pen & paper:** Data follows $y = 5x^3$.  On a log-log plot, what is the slope and y-intercept?
2. **Pen & paper:** A substance has half-life 10 hours.  Starting with 800g, how much remains after 30 hours?
3. **Pen & paper:** If your model's loss decreases by 5% per epoch, how many epochs to reduce loss to half?  (Hint: $0.95^n = 0.5$.)
