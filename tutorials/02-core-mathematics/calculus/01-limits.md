# Limits — The Foundation of Calculus

## Intuition

A limit asks: "What value does $f(x)$ approach as $x$ gets closer and closer
to some point?"  You might never actually reach that point, but you can get
**arbitrarily close**.  Limits are the rigorous way to handle "approaching"
— and they underpin derivatives, integrals, and everything in calculus.

## Prerequisites

- Tier 0: Number Systems (real numbers)
- Tier 1, Lesson 3: Relations and Functions

## From First Principles

### Informal definition

$$\lim_{x \to a} f(x) = L$$

means: as $x$ gets closer to $a$ (but $x \ne a$), $f(x)$ gets closer to $L$.

**Pen & paper:**

$$\lim_{x \to 2} (3x + 1) = 3(2) + 1 = 7$$

Just plug in — for polynomials, this always works.

### When direct substitution fails

$$\lim_{x \to 0} \frac{\sin x}{x}$$

Plugging in gives $\frac{0}{0}$ — **indeterminate**.  But try values approaching 0:

| $x$ | $\sin x / x$ |
|-----|---------------|
| 1.0 | 0.8415 |
| 0.1 | 0.9983 |
| 0.01 | 0.99998 |
| 0.001 | 0.9999998 |

The limit is **1**.

### Algebraic tricks for evaluating limits (pen & paper)

**Trick 1: Factor and cancel**

$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3} = \lim_{x \to 3} \frac{(x-3)(x+3)}{x-3} = \lim_{x \to 3} (x + 3) = 6$$

**Trick 2: Multiply by conjugate**

$$\lim_{x \to 0} \frac{\sqrt{x+4} - 2}{x}$$

Multiply top and bottom by the conjugate $(\sqrt{x+4} + 2)$:

$$= \lim_{x \to 0} \frac{(\sqrt{x+4} - 2)(\sqrt{x+4} + 2)}{x(\sqrt{x+4} + 2)}$$

The numerator uses the **difference of squares**: $(a-b)(a+b) = a^2 - b^2$:

$$= \lim_{x \to 0} \frac{(x+4) - 4}{x(\sqrt{x+4} + 2)} = \lim_{x \to 0} \frac{x}{x(\sqrt{x+4} + 2)} = \lim_{x \to 0} \frac{1}{\sqrt{x+4} + 2} = \frac{1}{4}$$

**Trick 3: Divide by highest power**

$$\lim_{x \to \infty} \frac{3x^2 + 2x}{5x^2 - 1}$$

Divide top and bottom by $x^2$:

$$= \lim_{x \to \infty} \frac{3 + 2/x}{5 - 1/x^2} = \frac{3 + 0}{5 - 0} = \frac{3}{5}$$

### The epsilon-delta definition

$$\lim_{x \to a} f(x) = L$$

means: for every $\epsilon > 0$, there exists $\delta > 0$ such that

$$0 < |x - a| < \delta \implies |f(x) - L| < \epsilon$$

In plain English: "however close you want $f(x)$ to be to $L$ ($\epsilon$),
I can find a neighbourhood around $a$ ($\delta$) that guarantees it."

**Pen & paper: Prove $\lim_{x \to 3} (2x + 1) = 7$**

Need: $|f(x) - L| < \epsilon$, i.e., $|(2x + 1) - 7| < \epsilon$

$|2x - 6| < \epsilon$
$2|x - 3| < \epsilon$
$|x - 3| < \epsilon/2$

So choose $\delta = \epsilon/2$.

If $0 < |x - 3| < \delta = \epsilon/2$, then $|(2x+1) - 7| = 2|x-3| < 2 \cdot \epsilon/2 = \epsilon$ ✓ $\square$

### One-sided limits

$$\lim_{x \to 0^+} \frac{1}{x} = +\infty, \quad \lim_{x \to 0^-} \frac{1}{x} = -\infty$$

The two-sided limit exists only if both one-sided limits exist and are equal.

### Important limits to memorise

$$\lim_{x \to 0} \frac{\sin x}{x} = 1$$

$$\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}$$

$$\lim_{x \to 0} \frac{e^x - 1}{x} = 1$$

$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e \approx 2.71828$$

### Continuity

A function $f$ is **continuous at $a$** if:

1. $f(a)$ is defined
2. $\lim_{x \to a} f(x)$ exists
3. $\lim_{x \to a} f(x) = f(a)$

> ReLU is continuous everywhere. Sigmoid is continuous. Step function is **not** continuous at 0.

## Python Verification

```python
# ── Limits: verifying pen & paper work ──────────────────────
import math

# Direct substitution
print("=== Direct substitution ===")
print(f"lim(x→2) 3x+1 = {3*2 + 1}")

# sin(x)/x approaching 0
print("\n=== sin(x)/x → 1 ===")
for x in [1, 0.1, 0.01, 0.001, 0.0001]:
    print(f"  x={x}: sin(x)/x = {math.sin(x)/x:.10f}")

# Factor and cancel: (x²-9)/(x-3)
print("\n=== (x²-9)/(x-3) as x→3 ===")
for x in [3.1, 3.01, 3.001, 3.0001]:
    print(f"  x={x}: f(x) = {(x**2 - 9)/(x - 3):.6f}")

# Conjugate trick: (√(x+4) - 2)/x
print("\n=== (√(x+4)-2)/x as x→0 ===")
for x in [1, 0.1, 0.01, 0.001]:
    print(f"  x={x}: f(x) = {(math.sqrt(x+4) - 2)/x:.8f}")

# Ratio of polynomials at infinity
print("\n=== (3x²+2x)/(5x²-1) as x→∞ ===")
for x in [10, 100, 1000, 10000]:
    print(f"  x={x}: f(x) = {(3*x**2 + 2*x)/(5*x**2 - 1):.8f}")

# e from limit
print("\n=== (1 + 1/n)^n → e ===")
for n in [10, 100, 1000, 10000, 100000]:
    print(f"  n={n}: {(1 + 1/n)**n:.10f}")
print(f"  e = {math.e:.10f}")

# Epsilon-delta demo
print("\n=== Epsilon-delta for 2x+1, a=3, L=7 ===")
for epsilon in [0.1, 0.01, 0.001]:
    delta = epsilon / 2
    x = 3 + delta * 0.99  # Just inside delta
    print(f"  ε={epsilon}: δ={delta}, |f({x:.6f})-7| = {abs(2*x+1-7):.8f} < {epsilon}")
```

## Visualisation — What "approaches" looks like

A limit is the value a function "heads toward" as the input gets close
to some target. Three pictures show the three flavours: a smooth limit
that exists, a famous "0/0" case that *still* has a limit, and
$\lim_{n \to \infty} (1 + 1/n)^n = e$ — one of the loveliest numbers in
maths.

```python
# ── Visualising limits ──────────────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))

# (1) A smooth limit: f(x) = 2x + 1 as x → 3 has limit 7.
# Plot the function and an ε–δ "box" showing that for any tolerance
# ε we can pick a window δ around x = 3 keeping the function within
# (L − ε, L + ε).
ax = axes[0]
x = np.linspace(0, 6, 200)
ax.plot(x, 2 * x + 1, color="tab:blue", lw=2, label="f(x) = 2x + 1")
a, L = 3, 7
epsilon = 0.5
delta   = epsilon / 2                            # for slope = 2
ax.axhline(L,            color="grey", lw=0.8, linestyle=":")
ax.axhline(L + epsilon,  color="tab:green", lw=1, linestyle="--")
ax.axhline(L - epsilon,  color="tab:green", lw=1, linestyle="--")
ax.axvline(a,            color="grey", lw=0.8, linestyle=":")
ax.axvline(a + delta,    color="tab:red", lw=1, linestyle="--")
ax.axvline(a - delta,    color="tab:red", lw=1, linestyle="--")
ax.fill_between([a - delta, a + delta], L - epsilon, L + epsilon,
                color="tab:green", alpha=0.15)
ax.scatter([a], [L], color="black", zorder=5, s=80)
ax.set_title(f"$\\lim_{{x \\to 3}} (2x + 1) = 7$\n"
             f"ε = {epsilon}: any input in (3−δ, 3+δ) lands in (7−ε, 7+ε)")
ax.set_xlabel("x"); ax.set_ylabel("f(x)")
ax.set_xlim(0, 6); ax.set_ylim(0, 14); ax.grid(True, alpha=0.3); ax.legend()

# (2) The 0/0 case: sin(x) / x as x → 0. The function is undefined at
# zero (literally 0/0), but values *near* zero get arbitrarily close
# to 1. The hole at x = 0 is shown explicitly.
ax = axes[1]
x = np.linspace(-3, 3, 600)
mask = np.abs(x) > 1e-9
y = np.where(mask, np.sin(x) / np.where(mask, x, 1), np.nan)
ax.plot(x, y, color="tab:orange", lw=2, label="sin(x) / x")
ax.scatter([0], [1], facecolor="white", edgecolor="tab:orange", s=120,
           zorder=5, label="undefined at x = 0\nbut limit = 1")
ax.axhline(1, color="grey", lw=0.8, linestyle=":")
ax.set_title("$\\lim_{x \\to 0}\\, \\sin(x)/x = 1$\n(0/0 has a limit even though f(0) is undefined)")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_xlim(-3, 3); ax.set_ylim(-0.5, 1.3); ax.grid(True, alpha=0.3); ax.legend()

# (3) The constant e arises as a limit: $(1 + 1/n)^n \to e$ as n → ∞.
# Plot the sequence of values for n = 1..200 and overlay e.
ax = axes[2]
ns = np.arange(1, 201)
ys = (1 + 1.0 / ns) ** ns
ax.plot(ns, ys, "o-", markersize=3, lw=1.2, color="tab:green",
        label="$(1 + 1/n)^n$")
ax.axhline(np.e, color="red", lw=1.5, linestyle="--",
           label=f"e ≈ {np.e:.6f}")
ax.set_title("$\\lim_{n\\to\\infty}(1 + 1/n)^n = e$\n— sequence converges (slowly!) to e")
ax.set_xlabel("n"); ax.set_ylabel("$(1 + 1/n)^n$")
ax.grid(True, alpha=0.3); ax.legend()

plt.tight_layout()
plt.show()

# Print values that match what's plotted.
print(f"sin(x) / x as x → 0 (one-sided values):")
for x_val in [0.5, 0.1, 0.01, 0.001]:
    print(f"  x = {x_val:6.3f}  →  sin(x)/x = {np.sin(x_val)/x_val:.10f}")

print(f"\n(1 + 1/n)^n as n → ∞ (slow convergence to e):")
for n in [10, 100, 1000, 10000, 100000]:
    print(f"  n = {n:>7,}  →  ({1 + 1/n})^n = {(1 + 1/n)**n:.10f}    "
          f"gap = {np.e - (1 + 1/n)**n:.2e}")
```

**The three pictures together explain why limits *matter*:**

- **Smooth case (left).** For nice functions like polynomials, the
  limit is just the value: $f(a)$. The ε–δ "box" makes it concrete:
  pick any tolerance $\varepsilon$; you can always find a window
  $\delta$ around $a$ where the function stays inside the tolerance.
- **Removable discontinuity (middle).** The function is *literally
  undefined* at $x = 0$ (try `0/0` in Python — `ZeroDivisionError`),
  but the limit is unambiguously 1. This case is *exactly* what makes
  derivatives well-defined: the difference quotient $\frac{f(x+h) -
  f(x)}{h}$ is `0/0` at $h = 0$, but the limit as $h \to 0$ exists and
  is the slope.
- **Limit at infinity (right).** Some quantities only emerge as the
  limit of a sequence — $e$ is the prototypical example. This is
  nothing exotic; "what does our model do as we keep training?" or
  "what's the steady-state response of this control loop?" are real
  engineering versions of the same question.

## Connection to CS / Games / AI / Business / Industry

- **Numerical analysis** — floating-point operations are limits in disguise (finite approximations to real arithmetic)
- **Learning rate schedules** — many approach 0 as training progresses (a limit)
- **Convergence** — gradient descent converges if the loss "limits" to a minimum
- **Series approximation** — Taylor series (Tier 3-09) requires limits to define convergence
- **Probability** — the law of large numbers is a limit theorem
- **Compound interest & continuous compounding (Finance)** — banks like HSBC and Citi price savings/loans using $\lim_{n\to\infty}(1+r/n)^n = e^r$; the same limit underlies Black-Scholes option pricing on every Bloomberg terminal.
- **Steady-state analysis (Operations Research)** — call-centre staffing at AT&T and warehouse throughput at Amazon FBA are computed as the *long-run limit* of queueing-theory formulas (Little's Law: $L = \lambda W$ in steady state).
- **Sensor calibration (Engineering)** — Tesla LIDAR and MRI scanners (Siemens, GE Healthcare) use limits-of-sequences in Kalman filters to converge noisy readings toward the true signal.
- **Half-life and pharmacokinetics (Pharma/Industry)** — drug clearance curves at Pfizer/Moderna are exponential decays; dosing schedules use $\lim_{t\to\infty}$ blood-concentration to ensure steady-state therapeutic levels.

## Check Your Understanding

1. **Pen & paper:** Evaluate $\lim_{x \to 1} \frac{x^3 - 1}{x - 1}$.  (Hint: factor $x^3 - 1$.)
2. **Pen & paper:** Evaluate $\lim_{x \to \infty} \frac{2x^3 - x}{4x^3 + 5x^2}$.
3. **Pen & paper (ε-δ):** Prove that $\lim_{x \to 1} (5x - 3) = 2$ using the epsilon-delta definition.
4. **Think about it:** Is $f(x) = \frac{x^2 - 4}{x - 2}$ continuous at $x = 2$?  What about $g(x) = x + 2$?  How do they differ?
