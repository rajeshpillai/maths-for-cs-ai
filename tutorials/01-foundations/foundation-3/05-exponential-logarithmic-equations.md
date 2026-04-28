# Exponential and Logarithmic Equations — Growth, Decay, and Half-Life

## Intuition

Exponential growth and decay model processes where the rate of change is
proportional to the current amount: populations, radioactive decay, compound
interest, and — critically for ML — learning rate schedules and loss curves.
Logarithms are the inverse tool that lets you "undo" an exponential to solve
for time, rate, or quantity.

## Prerequisites

- Foundation 2, Lesson 4: Exponential and Logarithmic Functions

## From First Principles

### Solving exponential equations

**Key technique:** Take logarithms of both sides.

**Example 1:** Solve $3^x = 81$.

Since $81 = 3^4$, we get $x = 4$.  But what if the answer is not obvious?

**Example 2:** Solve $5^x = 200$.

$$x = \log_5 200 = \frac{\ln 200}{\ln 5} = \frac{5.2983}{1.6094} \approx 3.292$$

**Example 3:** Solve $2^{2x} - 5 \cdot 2^x + 4 = 0$.

Let $u = 2^x$: $u^2 - 5u + 4 = 0$ → $(u-1)(u-4) = 0$.

$u = 1 \Rightarrow 2^x = 1 \Rightarrow x = 0$.

$u = 4 \Rightarrow 2^x = 4 \Rightarrow x = 2$.

### Solving logarithmic equations

**Key technique:** Convert to exponential form, then solve.

**Example:** Solve $\log_2(x-1) + \log_2(x+1) = 3$.

$$\log_2((x-1)(x+1)) = 3 \Rightarrow x^2 - 1 = 8 \Rightarrow x^2 = 9 \Rightarrow x = 3$$

(Reject $x = -3$ because $\log_2(-4)$ is undefined.)

### Exponential growth and decay models

The general model:

$$A(t) = A_0 \cdot e^{kt}$$

- $A_0$ = initial amount
- $k > 0$: growth; $k < 0$: decay
- $t$ = time

### Half-life derivation

**Half-life** $t_{1/2}$ is the time for half the quantity to remain:

$$\frac{A_0}{2} = A_0 \cdot e^{k t_{1/2}}$$

$$\frac{1}{2} = e^{k t_{1/2}}$$

$$\ln\frac{1}{2} = k t_{1/2}$$

$$t_{1/2} = \frac{-\ln 2}{k} = \frac{\ln 2}{|k|}$$

**Pen & paper:** Carbon-14 has $t_{1/2} = 5730$ years.  Find $k$.

$$k = \frac{-\ln 2}{5730} = \frac{-0.6931}{5730} \approx -0.0001210 \text{ per year}$$

**How old is a sample with 70% of original C-14?**

$$0.70 = e^{-0.0001210 \cdot t}$$

$$\ln(0.70) = -0.0001210 \cdot t$$

$$t = \frac{-0.3567}{-0.0001210} \approx 2948 \text{ years}$$

### Doubling time

For growth ($k > 0$): $t_{\text{double}} = \frac{\ln 2}{k}$.

Same derivation as half-life, but starting from $2A_0 = A_0 e^{kt}$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 20000, 500)
half_life = 5730
k = -np.log(2) / half_life
A = np.exp(k * t)  # fraction remaining

fig, ax = plt.subplots(figsize=(9, 5))
ax.plot(t, A * 100, 'b-', linewidth=2)

# Mark half-lives
for n in range(1, 4):
    t_n = n * half_life
    A_n = 100 * 0.5**n
    ax.plot(t_n, A_n, 'ro', markersize=8, zorder=5)
    ax.annotate(f'{n}x half-life\n{A_n:.1f}%', (t_n, A_n),
                textcoords="offset points", xytext=(10, 10), fontsize=9)
    ax.axvline(t_n, color='red', linestyle=':', alpha=0.4)

ax.axhline(50, color='grey', linestyle='--', alpha=0.5)
ax.set_xlabel('Time (years)')
ax.set_ylabel('Percentage remaining (%)')
ax.set_title(f'Exponential Decay: Carbon-14 (half-life = {half_life} years)')
ax.grid(True, alpha=0.3)
ax.set_ylim(0, 105)
plt.tight_layout()
plt.savefig('decay_halflife_plot.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Exponential and Logarithmic Equations ──────────────────────
import math

# Example 1: 5^x = 200
x = math.log(200) / math.log(5)
print(f"=== 5^x = 200 ===")
print(f"x = ln(200)/ln(5) = {x:.6f}")
print(f"Check: 5^{x:.6f} = {5**x:.2f}")

# Example 2: 2^(2x) - 5*2^x + 4 = 0
print(f"\n=== 2^(2x) - 5*2^x + 4 = 0 ===")
for x in [0, 2]:
    val = 2**(2*x) - 5 * 2**x + 4
    print(f"  x={x}: 2^{2*x} - 5*2^{x} + 4 = {val}")

# Example 3: log₂(x-1) + log₂(x+1) = 3
print(f"\n=== log₂(x-1) + log₂(x+1) = 3 ===")
x = 3
lhs = math.log2(x - 1) + math.log2(x + 1)
print(f"  x=3: log₂(2) + log₂(4) = {lhs}")

# Half-life: Carbon-14
print(f"\n=== Carbon-14 decay ===")
half_life = 5730
k = -math.log(2) / half_life
print(f"  k = {k:.7f} per year")

# Sample with 70% remaining
t = math.log(0.70) / k
print(f"  70% remaining → age = {t:.0f} years")

# Verify
fraction = math.exp(k * t)
print(f"  Check: e^(k*{t:.0f}) = {fraction:.4f}")

# Growth example: bacteria doubling every 3 hours
print(f"\n=== Bacterial growth ===")
k_growth = math.log(2) / 3  # doubling time = 3 hours
print(f"  k = ln(2)/3 = {k_growth:.4f} per hour")
for t in [0, 3, 6, 12, 24]:
    pop = 1000 * math.exp(k_growth * t)
    print(f"  t={t:2d}h: population = {pop:.0f}")

# Continuous vs discrete compounding
print(f"\n=== Compound interest: $1000 at 5% for 10 years ===")
P = 1000
r = 0.05
t = 10
print(f"  Annual:     ${P * (1 + r)**t:.2f}")
print(f"  Monthly:    ${P * (1 + r/12)**(12*t):.2f}")
print(f"  Continuous: ${P * math.exp(r * t):.2f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Learning rate decay** — exponential decay $\alpha_t = \alpha_0 e^{-\lambda t}$
  reduces step size during training
- **Binary search** — each step halves the search space: $n / 2^k$ items remain
  after $k$ steps, so $k = \log_2 n$
- **Information theory** — entropy $H(X) = -\sum p_i \log_2 p_i$ uses logarithms
  to measure information content
- **Algorithmic complexity** — $O(\log n)$ comes from repeated halving
- **Game balance** — XP curves often use exponential growth:
  level $n$ requires $c \cdot a^n$ experience points
- **Radioactive decay in simulations** — half-life models for particle effects

## Check Your Understanding

1. **Pen & paper:** Solve $4^x = 32$.  (Hint: express both as powers of 2.)
2. **Pen & paper:** A substance has a half-life of 10 days.  How long until only 10% remains?
3. **Pen & paper:** Solve $\log_3(2x+1) - \log_3(x-1) = 2$.
4. **Pen & paper:** An investment grows continuously at 8% per year.  How long to triple?
