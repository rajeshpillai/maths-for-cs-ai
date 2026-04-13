# Taylor and Maclaurin Series

## Intuition

Any smooth function can be approximated by a polynomial — and polynomials are
easy to compute (just multiply and add).  The Taylor series tells you exactly
which polynomial, and how accurate the approximation is.  This is how
calculators compute $\sin$, $\cos$, $e^x$, and how we approximate complex
functions in ML.

## Prerequisites

- Tier 3, Lesson 2: Derivatives (higher-order derivatives)
- Tier 0, Lesson 5: Primes, GCD (factorial)

## From First Principles

### The idea

Approximate $f(x)$ near a point $a$ using a polynomial whose derivatives
**match** $f$'s derivatives at $a$.

### Taylor series (centred at $a$)

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n$$

$$= f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots$$

### Maclaurin series ($a = 0$)

$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n$$

### Pen & paper: $e^x$ around $x = 0$

$f(x) = e^x$, and **all** derivatives of $e^x$ are $e^x$.  At $x = 0$: $f^{(n)}(0) = 1$ for all $n$.

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots$$

**Verify $e^1$:** $1 + 1 + 0.5 + 0.167 + 0.042 + 0.008 + \cdots \approx 2.718$

### Pen & paper: $\sin x$ around $x = 0$

$f(0) = 0$, $f'(0) = 1$, $f''(0) = 0$, $f'''(0) = -1$, $f^{(4)}(0) = 0$, $f^{(5)}(0) = 1$, ...

$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$$

Only odd powers, alternating signs.

### Pen & paper: $\cos x$ around $x = 0$

$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots$$

Only even powers.

### Pen & paper: $\frac{1}{1-x}$ (geometric series)

$$\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots \quad \text{for } |x| < 1$$

### Key series to memorise

| Function | Maclaurin series | Radius of convergence |
|----------|-----------------|----------------------|
| $e^x$ | $\sum \frac{x^n}{n!}$ | $\infty$ |
| $\sin x$ | $\sum (-1)^n \frac{x^{2n+1}}{(2n+1)!}$ | $\infty$ |
| $\cos x$ | $\sum (-1)^n \frac{x^{2n}}{(2n)!}$ | $\infty$ |
| $\ln(1+x)$ | $\sum (-1)^{n+1} \frac{x^n}{n}$ | $(-1, 1]$ |
| $\frac{1}{1-x}$ | $\sum x^n$ | $(-1, 1)$ |

### Taylor polynomial (finite truncation)

The **$n$-th degree Taylor polynomial** uses only the first $n+1$ terms.

**Pen & paper: Linear approximation** ($n = 1$):

$e^x \approx 1 + x$ near $x = 0$

At $x = 0.1$: $e^{0.1} \approx 1.1$ (actual: $1.10517...$) — good for small $x$!

**Quadratic** ($n = 2$): $e^x \approx 1 + x + \frac{x^2}{2}$

At $x = 0.1$: $\approx 1.105$ (actual: $1.10517$) — much better.

### Error bound (Lagrange remainder)

$$|R_n(x)| \le \frac{M |x - a|^{n+1}}{(n+1)!}$$

where $M$ is the max of $|f^{(n+1)}|$ on the interval.  The factorial in the
denominator makes higher-order approximations converge fast.

## Python Verification

```python
# ── Taylor Series: verifying pen & paper work ───────────────
import math

# e^x series
print("=== e^x Taylor series at x=1 ===")
x = 1.0
approx = 0
for n in range(10):
    term = x**n / math.factorial(n)
    approx += term
    if n < 7:
        print(f"  n={n}: term={term:.6f}, sum={approx:.6f}")
print(f"  Exact e = {math.e:.6f}")

# sin(x) series
print(f"\n=== sin(x) Taylor series at x=π/6 ===")
x = math.pi / 6
approx = 0
for n in range(6):
    term = (-1)**n * x**(2*n+1) / math.factorial(2*n+1)
    approx += term
print(f"  Taylor (5 terms): {approx:.8f}")
print(f"  Exact sin(π/6): {math.sin(x):.8f}")

# Linear vs quadratic approximation of e^x
print(f"\n=== Approximation quality for e^0.1 ===")
x = 0.1
exact = math.exp(x)
linear = 1 + x
quadratic = 1 + x + x**2/2
cubic = 1 + x + x**2/2 + x**3/6
print(f"  Exact:     {exact:.8f}")
print(f"  Linear:    {linear:.8f} (error: {abs(exact-linear):.2e})")
print(f"  Quadratic: {quadratic:.8f} (error: {abs(exact-quadratic):.2e})")
print(f"  Cubic:     {cubic:.8f} (error: {abs(exact-cubic):.2e})")

# How calculators compute sin
print(f"\n=== How calculators compute sin(0.5) ===")
x = 0.5
terms = []
for n in range(6):
    t = (-1)**n * x**(2*n+1) / math.factorial(2*n+1)
    terms.append(t)
    print(f"  Term {n}: {t:+.10f}, running sum: {sum(terms):.10f}")
print(f"  math.sin: {math.sin(x):.10f}")
```

## Connection to CS / Games / AI

- **How computers compute functions** — $\sin$, $\cos$, $e^x$, $\log$ are all computed via polynomial approximations
- **Linearisation** — first-order Taylor expansion is the basis of gradient descent ($f(x + \Delta) \approx f(x) + f'(x)\Delta$)
- **Second-order methods** — Newton's method uses the quadratic Taylor approximation
- **Activation function approximations** — GELU is defined via the Gaussian CDF, approximated with polynomials
- **Numerical stability** — knowing the Taylor series of $\log(1+x)$ near 0 prevents precision loss

## Check Your Understanding

1. **Pen & paper:** Write the Maclaurin series for $\frac{1}{1+x}$ up to the $x^3$ term.
2. **Pen & paper:** Approximate $\cos(0.1)$ using the first 3 non-zero terms. How close is it to the true value?
3. **Pen & paper:** Find the Taylor series of $e^x$ centred at $a = 1$ up to the $(x-1)^2$ term.
4. **Think about it:** Why does the Taylor series converge faster for $e^{0.01}$ than for $e^{10}$?
