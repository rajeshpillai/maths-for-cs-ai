---
strand: change
level: foundation
order: 8
title: The Fundamental Theorem of Calculus
prerequisites:
  - tier: strand-4-change-foundation
    slug: 07-antiderivatives
    description: Antiderivatives
connections:
  - strand-4-change-foundation/09-calculus-capstone
applications:
  - cs: "Why integration and differentiation are 'inverse' operations"
  - life: "Connects the two halves of calculus into one structure"
---

# The Fundamental Theorem of Calculus

## Mental

The **fundamental theorem of calculus** (FTC) is the deep
relationship between **derivatives** and **integrals**. It comes in
two parts.

**FTC Part 1**: differentiation **inverts** integration.

If $F(x) = \int_a^x f(t) \, dt$ for continuous $f$, then $F'(x) = f(x)$.

(The accumulated area under $f$ is itself a function whose
derivative is $f$.)

**FTC Part 2**: integration **inverts** differentiation.

If $F$ is an antiderivative of $f$ (so $F' = f$), then

$$
\int_a^b f(x) \, dx = F(b) - F(a).
$$

This is the **practical computation** rule — find an antiderivative,
evaluate at endpoints, subtract.

## Why this is profound

FTC connects two seemingly unrelated ideas:

- **Derivative**: instantaneous rate of change (slope of tangent).
- **Integral**: accumulated area under a curve.

These are dual operations. **Differentiation and integration are
inverses of each other.**

Newton and Leibniz independently discovered this in the 1660s-70s.
The unification of "calculus of differences" and "calculus of
sums" was the birth of modern mathematics.

## Worked example

Compute $\int_0^2 x^2 \, dx$.

By FTC Part 2: find an antiderivative of $x^2$. We know $\dfrac{d}{dx}
\dfrac{x^3}{3} = x^2$. So $F(x) = \dfrac{x^3}{3}$ works.

$$
\int_0^2 x^2 \, dx = F(2) - F(0) = \frac{8}{3} - 0 = \frac{8}{3}.
$$

Compare to Lesson 06's Riemann-sum approach. Same answer; FTC is
**vastly faster**.

## Interactive

:::widget type=numeric-input prompt="$\\int_0^4 (3x^2) \\, dx$. Antiderivative $x^3$. Evaluate: $4^3 - 0 = ?$" answer=64 explain="$64$.":::

:::widget type=numeric-input prompt="$\\int_1^3 (2x) \\, dx$. Antiderivative $x^2$. $9 - 1 = ?$" answer=8 explain="$8$.":::

:::widget type=numeric-input prompt="$\\int_0^{\\pi/2} \\cos x \\, dx$. Antiderivative $\\sin x$. $\\sin(\\pi/2) - \\sin(0) = ?$" answer=1 explain="$1 - 0 = 1$.":::

:::widget type=numeric-input prompt="$\\int_1^e \\dfrac{1}{x} dx = \\ln e - \\ln 1 = ?$" answer=1 explain="$1 - 0 = 1$. The natural log gets its name from this.":::

## Symbolic

**FTC Part 1**: if $f$ is continuous on $[a, b]$ and $F(x) = \int_a^x
f(t) \, dt$, then

$$
F'(x) = f(x).
$$

**FTC Part 2**: if $F$ is **any** antiderivative of $f$ on $[a, b]$,

$$
\int_a^b f(x) \, dx = F(b) - F(a).
$$

The two parts together establish the **inverse relationship** between
differentiation and integration.

A useful notation: $F(b) - F(a)$ is often written $\bigl[F(x)\bigr]_a^b$
or $F(x) \Big|_a^b$.

## Computational

```python
import sympy as sp

x = sp.symbols("x")
f = x ** 2

# FTC Part 2 explicitly
F = sp.integrate(f, x)        # x^3/3 (antiderivative)
print(F.subs(x, 2) - F.subs(x, 0))   # 8/3

# Or directly
print(sp.integrate(f, (x, 0, 2)))    # 8/3 — same answer
```

## Applied

- **Physics**: $\int F \, dx = $ work, integrating over distance.
- **Probability**: $P(a \le X \le b) = F(b) - F(a)$ where $F$ is
  the CDF — a direct application of FTC2 with $F$ = integral of
  pdf.
- **ML**: many gradient computations rely on FTC structure (vector
  calculus extensions in Strand 12).

## Check Your Understanding

:::widget type=numeric-input prompt="$\\int_0^3 4x \\, dx$ via FTC: $[2 x^2]_0^3 = ?$" answer=18 explain="$2 \\cdot 9 - 0 = 18$.":::

:::widget type=numeric-input prompt="$\\int_0^1 (2x + 3) \\, dx = [x^2 + 3x]_0^1 = ?$" answer=4 explain="$1 + 3 - 0 = 4$.":::

:::widget type=numeric-input prompt="$\\int_0^\\pi \\sin x \\, dx = [-\\cos x]_0^\\pi = -\\cos\\pi - (-\\cos 0) = ?$" answer=2 explain="$1 + 1 = 2$.":::

:::widget type=numeric-input prompt="If $F(x) = \\int_0^x t^3 \\, dt$, then $F'(x) = ?$ (FTC Part 1.)" answer=0 explain="$F'(x) = x^3$. The antiderivative's derivative gives back the integrand. Type 0 if 'depends on x' is meant.":::
