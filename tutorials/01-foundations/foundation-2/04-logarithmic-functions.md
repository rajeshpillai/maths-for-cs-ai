# Logarithmic Functions

## Intuition

If exponentials answer "what do I get when I raise $a$ to the power $x$?",
logarithms answer the reverse: "$a$ to **what power** gives me this number?"
Logarithms turn multiplication into addition, enormous numbers into manageable
ones, and appear wherever humans need to compress a wide range of values —
decibels for sound, the Richter scale for earthquakes, and bit-counts in
information theory.

## Prerequisites

- Foundation 2, Lesson 3: Exponential Functions

## From First Principles

### Definition

$$\log_a(y) = x \quad \Longleftrightarrow \quad a^x = y$$

Read: "log base $a$ of $y$ equals $x$" means "$a$ raised to $x$ gives $y$."

**Pen & paper — translate between forms:**

| Exponential form | Logarithmic form |
|------------------|------------------|
| $2^3 = 8$       | $\log_2 8 = 3$  |
| $10^2 = 100$    | $\log_{10} 100 = 2$ |
| $5^0 = 1$       | $\log_5 1 = 0$  |
| $3^{-1} = 1/3$  | $\log_3(1/3) = -1$ |

### The graph — inverse of the exponential

Since $\log_a$ is the inverse of $a^x$, its graph is the **reflection of
$a^x$ across the line $y = x$**:

| Exponential $a^x$ | Logarithm $\log_a x$ |
|--------------------|-----------------------|
| Domain: all reals  | Domain: $x > 0$       |
| Range: $y > 0$     | Range: all reals       |
| $y$-intercept $(0,1)$ | $x$-intercept $(1,0)$ |
| Asymptote: $y = 0$ | Asymptote: $x = 0$    |
| Passes through $(1, a)$ | Passes through $(a, 1)$ |

### Pen & paper: table for $\log_2 x$

| $x$   | $1/4$ | $1/2$ | $1$ | $2$ | $4$ | $8$ |
|-------|-------|-------|-----|-----|-----|-----|
| $\log_2 x$ | $-2$ | $-1$ | $0$ | $1$ | $2$ | $3$ |

Notice: the outputs grow slowly — that is the compression power of logs.

### Logarithm laws (derived from index laws)

Since $\log$ and exponentiation are inverses:

$$\log_a(xy) = \log_a x + \log_a y \quad \text{(product rule)}$$
$$\log_a\!\left(\frac{x}{y}\right) = \log_a x - \log_a y \quad \text{(quotient rule)}$$
$$\log_a(x^n) = n\,\log_a x \quad \text{(power rule)}$$

**Pen & paper — verify the product rule:**

$\log_2(4 \times 8) = \log_2 32 = 5$

$\log_2 4 + \log_2 8 = 2 + 3 = 5$ ✓

### Change of base formula

$$\log_a b = \frac{\ln b}{\ln a} = \frac{\log_{10} b}{\log_{10} a}$$

This is how calculators compute any base: convert to natural log ($\ln$) or
common log ($\log_{10}$).

**Pen & paper:** $\log_5 20 = \frac{\ln 20}{\ln 5} \approx \frac{3.00}{1.61} \approx 1.86$

### Common logarithm bases

| Notation | Base | Used in |
|----------|------|---------|
| $\log_{10} x$ or $\log x$ | 10 | Richter scale, pH, decibels |
| $\ln x$ | $e$ | Calculus, ML, statistics |
| $\log_2 x$ | 2 | CS: bits, binary search |

### Logarithmic scales

On a **log scale**, equal distances represent equal **ratios**, not equal
differences.  Going from 1 to 10 is the same distance as 10 to 100.

This is why we plot earthquake magnitudes and audio levels on log scales — the
raw values span too many orders of magnitude.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: exponential and log as reflections
ax = axes[0]
x_exp = np.linspace(-2, 3, 200)
x_log = np.linspace(0.05, 8, 200)
ax.plot(x_exp, 2**x_exp, 'b-', linewidth=2, label='$2^x$')
ax.plot(x_log, np.log2(x_log), 'r-', linewidth=2, label='$\\log_2 x$')
ax.plot(x_exp, x_exp, 'k--', linewidth=1, alpha=0.5, label='$y = x$')
ax.set_xlim(-3, 8)
ax.set_ylim(-3, 8)
ax.set_aspect('equal')
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.set_title('Exponential and log are reflections across y = x')
ax.legend()
ax.grid(True, alpha=0.3)

# Right: log scale demonstration
ax = axes[1]
values = [1, 10, 100, 1000, 10000]
ax.barh(range(len(values)), values, color='steelblue', alpha=0.7)
ax.set_xscale('log')
ax.set_yticks(range(len(values)))
ax.set_yticklabels([str(v) for v in values])
ax.set_xlabel('Value (log scale)')
ax.set_title('Log scale: equal ratios = equal spacing')
ax.grid(True, alpha=0.3, axis='x')

plt.tight_layout()
plt.savefig('logarithms.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Logarithmic Functions ────────────────────────────────────
import math

# Definition check: log_a(y) = x  <=>  a^x = y
print("=== Definition ===")
print(f"log_2(8) = {math.log2(8):.0f}  (because 2^3 = {2**3})")
print(f"log_10(100) = {math.log10(100):.0f}  (because 10^2 = {10**2})")
print(f"log_5(1) = {math.log(1)/math.log(5):.0f}  (because 5^0 = {5**0})")

# Table for log_2(x)
print(f"\n=== Table for log_2(x) ===")
for x in [0.25, 0.5, 1, 2, 4, 8]:
    print(f"  log_2({x:>5.2f}) = {math.log2(x):>5.1f}")

# Log laws verification
print(f"\n=== Product rule ===")
a, b = 4, 8
print(f"log_2(4 * 8) = log_2(32) = {math.log2(a*b):.0f}")
print(f"log_2(4) + log_2(8) = {math.log2(a)} + {math.log2(b)} "
      f"= {math.log2(a) + math.log2(b):.0f}")

# Change of base
print(f"\n=== Change of base ===")
result = math.log(20) / math.log(5)
print(f"log_5(20) = ln(20)/ln(5) = {math.log(20):.4f}/{math.log(5):.4f}"
      f" = {result:.4f}")
print(f"Verify: 5^{result:.4f} = {5**result:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Binary search** — halving $n$ items takes $\log_2 n$ steps
- **Information theory** — entropy $H = -\sum p_i \log_2 p_i$ measures
  information in bits
- **Cross-entropy loss** — the standard loss function in classification uses
  $-\log(\hat{p})$; wrong predictions get huge penalties
- **Numerical stability** — multiplying many small probabilities causes
  underflow; adding their logs avoids this (log-sum-exp trick)
- **Decibels in audio** — $\text{dB} = 10 \log_{10}(P/P_0)$
- **Log-returns in finance** — quants at Renaissance Technologies and Two Sigma model stock returns as $r_t = \ln(P_t / P_{t-1})$ because log-returns are additive across time and approximately normal; Black-Scholes and GARCH volatility models live in log-return space.
- **Pareto/Power-law plots** — VC firms like Andreessen Horowitz plot startup outcomes on log-log axes to spot the power-law nature of returns; the slope on a log-log chart reveals the Pareto exponent.
- **pH in chemistry & biotech** — pharmaceutical labs at Pfizer measure pH = $-\log_{10}[\text{H}^+]$ to control fermentation in mAb production; bioreactor controllers (Sartorius, Eppendorf) use log-scale setpoints.
- **Earthquake & magnitude scales** — the USGS reports moment magnitude $M_w = \frac{2}{3}\log_{10}(M_0) - 6.07$; structural codes (ASCE 7) translate this log-magnitude into spectral acceleration design loads for buildings.

## Check Your Understanding

1. **Pen & paper:** Convert to the other form: (a) $4^3 = 64$, (b) $\log_3 81 = ?$
2. **Pen & paper:** Use log laws to simplify $\log_2 48 - \log_2 3$.
3. **Pen & paper:** Solve $\log_2(x - 1) = 5$ and verify by substitution.
