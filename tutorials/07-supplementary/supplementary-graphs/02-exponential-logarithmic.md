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
