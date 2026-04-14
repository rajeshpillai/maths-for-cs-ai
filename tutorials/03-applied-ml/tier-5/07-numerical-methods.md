# Numerical Methods — Newton-Raphson and Bisection

## Intuition

Not every equation has a neat closed-form solution.  $x^5 - x - 1 = 0$?
No formula exists.  **Numerical methods** find approximate solutions
iteratively.  **Bisection** is slow but guaranteed; **Newton-Raphson** is fast
but needs a good starting point.  These methods underpin root-finding,
optimisation, and even training algorithms.

## Prerequisites

- Tier 3, Lesson 2: Derivatives
- Tier 3, Lesson 9: Taylor Series (Newton's method is derived from the linear Taylor approximation)

## From First Principles

### Bisection method

**Idea:** If $f(a) < 0$ and $f(b) > 0$ (and $f$ is continuous), then there's a
root between $a$ and $b$.  Check the midpoint and halve the interval.

**Algorithm:**
1. Check $f(c)$ where $c = (a + b)/2$
2. If $f(c) \approx 0$: done
3. If $f(c)$ has the same sign as $f(a)$: root is in $[c, b]$
4. Else: root is in $[a, c]$
5. Repeat

**Pen & paper: Find $\sqrt{2}$ (i.e., solve $f(x) = x^2 - 2 = 0$)**

$a = 1$, $b = 2$. $f(1) = -1 < 0$, $f(2) = 2 > 0$.

| Step | $a$ | $b$ | $c$ | $f(c)$ | Interval |
|------|-----|-----|-----|--------|----------|
| 1 | 1 | 2 | 1.5 | 0.25 > 0 | $[1, 1.5]$ |
| 2 | 1 | 1.5 | 1.25 | -0.4375 < 0 | $[1.25, 1.5]$ |
| 3 | 1.25 | 1.5 | 1.375 | -0.109 < 0 | $[1.375, 1.5]$ |
| 4 | 1.375 | 1.5 | 1.4375 | 0.066 > 0 | $[1.375, 1.4375]$ |

After 4 steps: $\sqrt{2} \in [1.375, 1.4375]$.  True: $1.4142...$

**Convergence:** Each step halves the interval.  After $n$ steps, error $\le \frac{b-a}{2^n}$.

To get 10 decimal places from $[1, 2]$: $\frac{1}{2^n} < 10^{-10}$ → $n \ge 34$ steps.

### Newton-Raphson method

**Idea:** Approximate $f$ by its tangent line and find where the tangent crosses zero.

From Taylor: $f(x + h) \approx f(x) + f'(x)h$. Set to zero: $h = -\frac{f(x)}{f'(x)}$.

**Update rule:**

$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

### Pen & paper: Find $\sqrt{2}$ with Newton's method

$f(x) = x^2 - 2$, $f'(x) = 2x$.

$$x_{n+1} = x_n - \frac{x_n^2 - 2}{2x_n} = \frac{x_n}{2} + \frac{1}{x_n}$$

Start at $x_0 = 1$:

| Step | $x_n$ | $f(x_n)$ |
|------|--------|----------|
| 0 | 1 | -1 |
| 1 | $\frac{1}{2} + 1 = 1.5$ | 0.25 |
| 2 | $0.75 + 0.667 = 1.4167$ | 0.00694 |
| 3 | $0.7083 + 0.7059 = 1.4142$ | 0.00002 |

**3 steps** to 4 decimal places!  (Bisection needed ~14 steps for this accuracy.)

### Convergence comparison

| Method | Convergence | Steps for 10 digits |
|--------|------------|-------------------|
| Bisection | Linear: error $\propto 1/2^n$ | ~34 |
| Newton | Quadratic: digits double each step | ~5-6 |

### Newton's method for optimisation

To find where $f'(x) = 0$ (i.e., a minimum), apply Newton to $f'$:

$$x_{n+1} = x_n - \frac{f'(x_n)}{f''(x_n)}$$

In multiple dimensions:

$$\mathbf{x}_{n+1} = \mathbf{x}_n - \mathbf{H}^{-1} \nabla f(\mathbf{x}_n)$$

This is **Newton's optimisation method** — converges very fast near the minimum but requires computing (or approximating) the Hessian.

### When Newton fails

- $f'(x_n) = 0$ → division by zero
- Bad starting point → diverges or oscillates
- Multiple roots → may find the wrong one
- Expensive for high dimensions (need Hessian inverse)

### Secant method (derivative-free Newton)

Approximate $f'$ using two recent points:

$$x_{n+1} = x_n - f(x_n) \cdot \frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}$$

No derivatives needed! Convergence: superlinear ($\approx 1.618$ order — the golden ratio!).

## Python Verification

```python
# ── Numerical Methods: verifying pen & paper work ───────────
import math

# Bisection: find √2
print("=== Bisection: x² - 2 = 0 ===")
f = lambda x: x**2 - 2
a, b = 1.0, 2.0
for step in range(20):
    c = (a + b) / 2
    fc = f(c)
    if step < 6:
        print(f"  step {step}: [{a:.6f}, {b:.6f}], c={c:.6f}, f(c)={fc:.6f}")
    if abs(fc) < 1e-12:
        break
    if fc * f(a) < 0:
        b = c
    else:
        a = c
print(f"  Result: {c:.10f} (exact: {math.sqrt(2):.10f})")

# Newton-Raphson: find √2
print(f"\n=== Newton: x² - 2 = 0 ===")
x = 1.0
for step in range(6):
    fx = x**2 - 2
    fpx = 2*x
    print(f"  step {step}: x={x:.10f}, f(x)={fx:.2e}")
    x = x - fx / fpx

# Newton for optimisation: minimise x⁴ - 3x² + 2
print(f"\n=== Newton for optimisation: x⁴ - 3x² + 2 ===")
# f'(x) = 4x³ - 6x, f''(x) = 12x² - 6
x = 2.0
for step in range(10):
    fp = 4*x**3 - 6*x
    fpp = 12*x**2 - 6
    if abs(fpp) < 1e-10:
        break
    x_new = x - fp/fpp
    if step < 6:
        print(f"  step {step}: x={x:.6f}, f'={fp:.6f}")
    x = x_new
f_val = x**4 - 3*x**2 + 2
print(f"  Minimum at x={x:.6f}, f={f_val:.6f}")

# Secant method
print(f"\n=== Secant method: x² - 2 = 0 ===")
x0, x1 = 1.0, 2.0
for step in range(8):
    f0, f1 = f(x0), f(x1)
    x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
    print(f"  step {step}: x={x2:.10f}")
    x0, x1 = x1, x2
    if abs(f(x2)) < 1e-15:
        break

# Convergence comparison
print(f"\n=== Convergence comparison (find √2) ===")
exact = math.sqrt(2)

# Bisection
a, b = 1.0, 2.0
for step in range(15):
    c = (a + b) / 2
    if f(c) * f(a) < 0: b = c
    else: a = c
    if step < 8:
        print(f"  Bisection step {step}: error = {abs(c - exact):.2e}")

# Newton
x = 1.0
for step in range(6):
    x = x - (x**2 - 2)/(2*x)
    print(f"  Newton step {step}:   error = {abs(x - exact):.2e}")
```

## Connection to CS / Games / AI

- **Newton's method** — basis for second-order optimisers (L-BFGS, used in classical ML)
- **Root-finding** — solving $f(x) = 0$ appears in ray tracing, physics simulations, financial models
- **Bisection** — binary search IS bisection on a sorted array!
- **Inverse kinematics** — game characters reaching for objects use Newton-like methods
- **Implicit methods** — ODE solvers for stiff systems use Newton's method at each step
- **Quasi-Newton methods** — approximate the Hessian (L-BFGS) for large-scale optimisation

## Check Your Understanding

1. **Pen & paper:** Use bisection to find a root of $f(x) = x^3 - x - 1$ starting from $[1, 2]$.  Do 4 steps.
2. **Pen & paper:** Use Newton's method on $f(x) = x^3 - x - 1$ starting at $x_0 = 1.5$.  Do 3 steps.  Compare accuracy to bisection.
3. **Pen & paper:** Apply Newton's optimisation method to find the minimum of $f(x) = x^4 - 4x^2$ starting at $x_0 = 3$.
4. **Think about it:** Why is Newton's method rarely used directly for training neural networks?  (Hint: what is the cost of the Hessian for a model with 10 million parameters?)
