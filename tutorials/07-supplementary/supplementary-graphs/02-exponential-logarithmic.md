# Exponential and Logarithmic Graphs

## Intuition

**Exponential** growth is the most powerful force in nature and computing —
compound interest, population growth, viral spread, and algorithm complexity
all follow exponential curves.  **Logarithms** are the inverse — they turn
multiplication into addition and tame exponential growth into something
manageable.

## Prerequisites

- Tier 0, Lesson 1: Number Systems

## From First Principles

### Exponential: $y = a^x$ and $y = e^x$

**Key properties:**
- Always positive ($y > 0$)
- Passes through $(0, 1)$ since $a^0 = 1$
- $a > 1$: growth.  $0 < a < 1$: decay.
- $e^x$ is the "natural" exponential where $\frac{d}{dx}e^x = e^x$

**Pen & paper: Growth of $2^x$**

| $x$ | $2^x$ |
|-----|-------|
| $-2$ | $0.25$ |
| $-1$ | $0.5$ |
| $0$ | $1$ |
| $1$ | $2$ |
| $5$ | $32$ |
| $10$ | $1024$ |
| $20$ | $1{,}048{,}576$ |

Doubles every step — this is why exponential algorithms are intractable.

### Exponential decay: $y = e^{-x}$

Mirror image of growth: starts high, decays toward 0 but never reaches it.

Used for: radioactive decay, learning rate schedules, exponential moving averages.

### Logarithmic: $y = \log_a(x)$

The **inverse** of $a^x$.  $\log_a(x) = y$ means $a^y = x$.

**Key properties:**
- Defined only for $x > 0$
- Passes through $(1, 0)$ since $\log_a(1) = 0$
- Grows slowly — $\log_2(1000000) \approx 20$
- Turns multiplication into addition: $\log(ab) = \log a + \log b$

### Logarithm laws (pen & paper toolkit)

$$\log(ab) = \log a + \log b$$
$$\log(a/b) = \log a - \log b$$
$$\log(a^n) = n\log a$$
$$\log_a b = \frac{\ln b}{\ln a} \quad \text{(change of base)}$$

### The three common bases

| Base | Notation | Use |
|------|----------|-----|
| 10 | $\log_{10}$ or $\log$ | Scientific scales (pH, decibels, Richter) |
| $e$ | $\ln$ | Calculus, probability, physics |
| 2 | $\log_2$ | Computer science (bits, complexity) |

### Pen & paper: Solve $2^x = 64$

$x = \log_2 64 = 6$ (since $2^6 = 64$)

### Pen & paper: Solve $e^{2x} = 10$

$2x = \ln 10 \approx 2.303$

$x \approx 1.15$

### Log scales and power laws

On a **log-log** plot, a power law $y = cx^k$ appears as a straight line:

$\log y = \log c + k \log x$

This is how we identify power-law relationships in data.

## Python Verification

```python
# ── Exponential & Logarithmic ───────────────────────────────
import math

# Exponential growth
print("=== Exponential growth: 2^x ===")
for x in range(-2, 11):
    val = 2**x
    bar = '*' * min(40, int(math.log2(val + 1) * 3))
    print(f"  x={x:3d}: 2^x = {val:>10,} {bar}")

# e^x and e^{-x}
print(f"\n=== e^x (growth) and e^{{-x}} (decay) ===")
for x in range(-3, 4):
    print(f"  x={x:+d}: e^x = {math.exp(x):8.3f}, e^{{-x}} = {math.exp(-x):8.3f}")

# Logarithm laws
print(f"\n=== Logarithm laws ===")
a, b = 12, 5
print(f"  log({a}×{b}) = {math.log(a*b):.4f}")
print(f"  log({a}) + log({b}) = {math.log(a) + math.log(b):.4f}")
print(f"  log({a}/{b}) = {math.log(a/b):.4f}")
print(f"  log({a}) - log({b}) = {math.log(a) - math.log(b):.4f}")
print(f"  log(2^10) = {math.log(2**10):.4f}")
print(f"  10·log(2) = {10*math.log(2):.4f}")

# Change of base
print(f"\n=== Change of base ===")
print(f"  log₂(1000) = ln(1000)/ln(2) = {math.log(1000)/math.log(2):.4f}")
print(f"  log₁₀(1000) = {math.log10(1000):.4f}")

# Solve equations
print(f"\n=== Solve 2^x = 64 ===")
print(f"  x = log₂(64) = {math.log2(64):.0f}")

print(f"\n=== Solve e^(2x) = 10 ===")
print(f"  x = ln(10)/2 = {math.log(10)/2:.4f}")

# Log growth is slow
print(f"\n=== How slowly log grows ===")
for n in [10, 100, 1000, 1000000, 1000000000]:
    print(f"  log₂({n:>13,}) = {math.log2(n):6.1f}")
```

## Visualisation — Exponential growth, log compression, mirror symmetry

Two pictures: exponentials and logarithms drawn together (notice the
log mirrors the exp across the line $y = x$), and a *log-scale plot*
showing how exponential growth becomes a straight line when you put
the axis on a log scale — the basis of every "doubling time" chart.

```python
# ── Visualising exponentials and logarithms ─────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5.2))

# (1) y = 2^x and y = log₂(x) on the same axes; they're reflections.
ax = axes[0]
xs1 = np.linspace(-2, 4, 400)
xs2 = np.linspace(0.05, 16, 400)
ax.plot(xs1, 2.0 ** xs1, color="tab:blue",   lw=2, label="$y = 2^x$ (exponential)")
ax.plot(xs2, np.log2(xs2), color="tab:orange", lw=2, label="$y = \\log_2 x$ (log)")
ax.plot(np.linspace(-2, 16, 200), np.linspace(-2, 16, 200),
        color="grey", lw=1, linestyle="--", label="$y = x$ (mirror line)")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_xlim(-2, 16); ax.set_ylim(-3, 16); ax.set_aspect("equal")
ax.set_title("Exponential and log are reflections\nacross the line y = x")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) On a log-scale y-axis, exponentials become straight lines.
# Several growth curves: 2ⁿ, 1.5ⁿ, n², n. Compare slopes.
ax = axes[1]
ns = np.arange(0, 31)
ax.semilogy(ns, 2.0 ** ns, "o-", color="tab:red",    lw=1.5, markersize=4, label="$2^n$  (doubles per step)")
ax.semilogy(ns, 1.5 ** ns, "s-", color="tab:orange", lw=1.5, markersize=4, label="$1.5^n$ (50% growth)")
ax.semilogy(ns, ns ** 2 + 1, "^-", color="tab:green",  lw=1.5, markersize=4, label="$n^2$ (polynomial)")
ax.semilogy(ns, ns + 1, "v-", color="tab:blue",   lw=1.5, markersize=4, label="$n$ (linear)")
ax.set_xlabel("n")
ax.set_ylabel("value (log scale)")
ax.set_title("On a log y-axis, exponentials → straight lines\n(slope = log of the base)")
ax.legend(); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print growth-rate dominance.
print("Asymptotic dominance: exponentials beat any polynomial eventually.")
print(f"{'n':>5}  {'n²':>10}  {'2ⁿ':>15}  {'2ⁿ / n²':>12}")
for n in [10, 20, 30, 50, 100]:
    print(f"  {n:>3}  {n*n:>10,}  {2**n:>15,}  {2**n / (n*n):>12.2e}")
```

## Connection to CS / Games / AI

- **Algorithm complexity** — $O(\log n)$: binary search; $O(n \log n)$: merge sort; $O(2^n)$: brute force
- **Learning rate decay** — exponential: $\alpha_t = \alpha_0 \cdot \gamma^t$
- **Softmax temperature** — $\text{softmax}(z/T)$: high $T$ → flatter (more uniform), low $T$ → sharper
- **Cross-entropy loss** — uses $\log$: $-\sum y_i \log \hat{p}_i$
- **Information** — $-\log_2 p$ bits to encode an event with probability $p$
- **Decibels** — $\text{dB} = 10 \log_{10}(P/P_0)$

## Check Your Understanding

1. **Pen & paper:** Solve $3^x = 81$.  Solve $e^x = 5$.
2. **Pen & paper:** Simplify $\log_2(32) - \log_2(4)$ using log laws.
3. **Pen & paper:** If an algorithm is $O(2^n)$ and $n$ increases from 20 to 30, by what factor does the runtime increase?
4. **Think about it:** Why is $O(n \log n)$ considered "almost linear" in practice?
