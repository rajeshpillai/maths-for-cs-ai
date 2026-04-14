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

## Connection to CS / Games / AI

- **Numerical analysis** — floating-point operations are limits in disguise (finite approximations to real arithmetic)
- **Learning rate schedules** — many approach 0 as training progresses (a limit)
- **Convergence** — gradient descent converges if the loss "limits" to a minimum
- **Series approximation** — Taylor series (Tier 3-09) requires limits to define convergence
- **Probability** — the law of large numbers is a limit theorem

## Check Your Understanding

1. **Pen & paper:** Evaluate $\lim_{x \to 1} \frac{x^3 - 1}{x - 1}$.  (Hint: factor $x^3 - 1$.)
2. **Pen & paper:** Evaluate $\lim_{x \to \infty} \frac{2x^3 - x}{4x^3 + 5x^2}$.
3. **Pen & paper (ε-δ):** Prove that $\lim_{x \to 1} (5x - 3) = 2$ using the epsilon-delta definition.
4. **Think about it:** Is $f(x) = \frac{x^2 - 4}{x - 2}$ continuous at $x = 2$?  What about $g(x) = x + 2$?  How do they differ?
