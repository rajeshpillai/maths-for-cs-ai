# Substitution Tricks

## Intuition

Substitution is the art of making a hard problem look easy by changing the variable. The right substitution transforms a tangled expression into something clean and recognisable. In JEE Advanced, recognising *which* substitution to use is often the entire battle — the remaining algebra is routine.

Think of it as changing coordinate systems: the problem is the same, but one viewpoint makes the structure obvious.

## Prerequisites

- Tier 3, Lesson 6 (Integration techniques)
- Foundation 4, Lesson 4 (Trigonometric identities and equations)

## The Strategy

**When to use substitution:**
1. You see `sqrt(a^2 - x^2)` → try `x = a sin(t)` or `x = a cos(t)`
2. You see `sqrt(a^2 + x^2)` → try `x = a tan(t)`
3. You see `sqrt(x^2 - a^2)` → try `x = a sec(t)`
4. The integrand has `f(x)` and `f(1/x)` related → try `x → 1/x`
5. Expression has `x^n + x^(-n)` pattern → try `t = x + 1/x` or `t = x - 1/x`
6. Completing the square turns a quadratic into a standard form
7. Rationalisation: multiply by conjugate to remove radicals

**Key principle:** After substitution, the new integral/expression must be *simpler*. If it gets messier, try a different substitution.

## Worked Problems

### Problem 1: Definite Integral with sqrt(a^2 - x^2)

**Problem:** Evaluate integral from 0 to 1 of x^2 / sqrt(1 - x^2) dx.

**Recognise:** The `sqrt(1 - x^2)` screams `x = sin(t)`.

**Solution:**

Let x = sin(t), so dx = cos(t) dt.

When x = 0: t = 0. When x = 1: t = pi/2.

sqrt(1 - x^2) = sqrt(1 - sin^2(t)) = cos(t)

The integral becomes:

integral from 0 to pi/2 of sin^2(t) / cos(t) * cos(t) dt
= integral from 0 to pi/2 of sin^2(t) dt

Using the identity sin^2(t) = (1 - cos(2t))/2:

= integral from 0 to pi/2 of (1 - cos(2t))/2 dt
= [t/2 - sin(2t)/4] from 0 to pi/2
= (pi/4 - 0) - (0 - 0)
= pi/4

### Problem 2: Reciprocal Substitution in Definite Integral

**Problem:** Evaluate integral from 0 to infinity of ln(x) / (1 + x^2) dx.

**Recognise:** The limits 0 to infinity and the structure suggest trying x → 1/x to exploit symmetry.

**Solution:**

Let I = integral from 0 to infinity of ln(x) / (1 + x^2) dx.

Substitute x = 1/t, so dx = -1/t^2 dt.

When x = 0: t = infinity. When x = infinity: t = 0.

I = integral from infinity to 0 of ln(1/t) / (1 + 1/t^2) * (-1/t^2) dt
= integral from 0 to infinity of (-ln(t)) / ((t^2 + 1)/t^2) * (1/t^2) dt
= integral from 0 to infinity of -ln(t) / (1 + t^2) dt
= -I

So I = -I, which gives 2I = 0, hence I = 0.

### Problem 3: Completing the Square for Integration

**Problem:** Evaluate integral of dx / (x^2 + 4x + 13).

**Recognise:** Quadratic in denominator with no real roots — complete the square to get standard arctan form.

**Solution:**

x^2 + 4x + 13 = (x^2 + 4x + 4) + 9 = (x + 2)^2 + 3^2

Let u = x + 2, du = dx.

Integral = integral of du / (u^2 + 9)
= (1/3) arctan(u/3) + C
= (1/3) arctan((x + 2)/3) + C

### Problem 4: Rationalisation in Limits

**Problem:** Evaluate lim(x → 0) of [sqrt(1 + x) - sqrt(1 - x)] / x.

**Recognise:** 0/0 form with difference of square roots — rationalise by multiplying by conjugate.

**Solution:**

Multiply numerator and denominator by [sqrt(1 + x) + sqrt(1 - x)]:

= lim(x → 0) [(1 + x) - (1 - x)] / [x * (sqrt(1 + x) + sqrt(1 - x))]
= lim(x → 0) [2x] / [x * (sqrt(1 + x) + sqrt(1 - x))]
= lim(x → 0) 2 / (sqrt(1 + x) + sqrt(1 - x))
= 2 / (1 + 1)
= 1

### Problem 5: Trigonometric Substitution for Algebraic Identity

**Problem:** If x = tan(A) and y = tan(B), simplify (x + y) / (1 - xy) and hence prove the addition formula.

**Recognise:** The expression (x + y)/(1 - xy) appears when dealing with tan(A + B). Working backwards from a substitution reveals the identity.

**Solution:**

We know tan(A + B) = (tan A + tan B) / (1 - tan A * tan B).

With x = tan(A), y = tan(B):
(x + y) / (1 - xy) = tan(A + B)

This is actually the *derivation* of the tangent addition formula from the sine and cosine addition formulas:

tan(A + B) = sin(A + B) / cos(A + B)
= (sin A cos B + cos A sin B) / (cos A cos B - sin A sin B)

Divide numerator and denominator by cos A cos B:
= (tan A + tan B) / (1 - tan A tan B)

### Problem 6: Substitution x = t - 1/t for Symmetric Integrands

**Problem:** Evaluate integral from 0 to infinity of (x^2 - 1) / (x^4 + 1) dx.

**Recognise:** Divide numerator and denominator by x^2 to get a form involving (1 - 1/x^2) and (x^2 + 1/x^2). Then substitute t = x + 1/x.

**Solution:**

Divide by x^2:

integral from 0 to infinity of (1 - 1/x^2) / (x^2 + 1/x^2) dx

Note that x^2 + 1/x^2 = (x - 1/x)^2 + 2.

Let t = x - 1/x, so dt = (1 + 1/x^2) dx. Wait — we have (1 - 1/x^2) dx, not (1 + 1/x^2) dx.

Let's reconsider. Actually let t = x + 1/x, dt = (1 - 1/x^2) dx. Good!

And x^2 + 1/x^2 = (x + 1/x)^2 - 2 = t^2 - 2.

When x → 0+: t → +infinity. When x → infinity: t → +infinity.
When x = 1: t = 2 (minimum value of x + 1/x for x > 0).

We need to split at x = 1. For x in (0,1): as x goes 0→1, t goes infinity→2, and (1 - 1/x^2) < 0.
For x in (1, infinity): as x goes 1→infinity, t goes 2→infinity, and (1 - 1/x^2) > 0.

Integral = integral from 2 to infinity of dt/(t^2 - 2) + integral from infinity to 2 of (-dt)/(t^2 - 2)

Wait, let me be more careful. Actually for the substitution approach, note:

integral from 0 to infinity of (1 - 1/x^2)/(x^2 + 1/x^2) dx

Split: integral from 0 to 1 + integral from 1 to infinity.

In the first integral, let x = 1/u: it becomes integral from 1 to infinity of (1 - u^2)/(u^2 + 1/u^2) * (-1/u^2)... This approach gets complicated.

**Simpler method:** Note (x^2 - 1)/(x^4 + 1). Factor x^4 + 1 = (x^2 + sqrt(2)x + 1)(x^2 - sqrt(2)x + 1) and use partial fractions. But let's use the substitution directly on [1, infinity):

For x in [1, infinity), let t = x - 1/x, dt = (1 + 1/x^2)dx.

Hmm, this doesn't match. Let's use a cleaner approach:

integral from 0 to infinity of (x^2 - 1)/(x^4 + 1) dx

In the portion [0,1], substitute x = 1/u:
= integral from 1 to infinity of (1/u^2 - 1)/(1/u^4 + 1) * (1/u^2) du
= integral from 1 to infinity of (1 - u^2)/(1 + u^4) du

So the full integral = integral from 1 to infinity of [(x^2-1)/(x^4+1) + (1-x^2)/(1+x^4)] dx = 0.

**Answer:** The integral equals 0.

### Problem 7: Euler Substitution

**Problem:** Evaluate integral of dx / (x + sqrt(x^2 + x + 1)).

**Recognise:** Square root of a quadratic with no clean trig substitution — use Euler substitution: set sqrt(x^2 + x + 1) = t - x.

**Solution:**

Let sqrt(x^2 + x + 1) = t - x.

Squaring: x^2 + x + 1 = t^2 - 2tx + x^2

So x + 1 = t^2 - 2tx
x(1 + 2t) = t^2 - 1
x = (t^2 - 1)/(2t + 1)

dx = [2t(2t + 1) - 2(t^2 - 1)] / (2t + 1)^2 dt = (2t^2 + 2t + 2)/(2t + 1)^2 dt

Also: x + sqrt(x^2 + x + 1) = x + (t - x) = t

So the integral becomes:
integral of [1/t] * (2t^2 + 2t + 2)/(2t + 1)^2 dt
= integral of (2t^2 + 2t + 2) / [t(2t + 1)^2] dt

This can be solved by partial fractions. The key insight is that the Euler substitution converted an irrational integrand into a rational function.

## Python Verification

```python
import numpy as np
from scipy import integrate
import sympy as sp

# Problem 1: integral of x^2/sqrt(1-x^2) from 0 to 1
result1, _ = integrate.quad(lambda x: x**2 / np.sqrt(1 - x**2), 0, 1-1e-10)
print(f"Problem 1: numerical = {result1:.6f}, exact = pi/4 = {np.pi/4:.6f}")

# Problem 2: integral of ln(x)/(1+x^2) from 0 to infinity
# Split at 1 due to the singularity of ln at 0
result2a, _ = integrate.quad(lambda x: np.log(x) / (1 + x**2), 0, 1)
result2b, _ = integrate.quad(lambda x: np.log(x) / (1 + x**2), 1, np.inf)
print(f"Problem 2: numerical = {result2a + result2b:.6f}, exact = 0")

# Problem 3: verify derivative of (1/3)arctan((x+2)/3)
x = sp.Symbol('x')
antideriv = sp.Rational(1, 3) * sp.atan((x + 2) / 3)
deriv = sp.diff(antideriv, x)
print(f"Problem 3: d/dx[(1/3)arctan((x+2)/3)] = {sp.simplify(deriv)}")
# Should equal 1/(x^2 + 4x + 13)

# Problem 4: limit of [sqrt(1+x) - sqrt(1-x)] / x as x -> 0
expr = (sp.sqrt(1 + x) - sp.sqrt(1 - x)) / x
lim = sp.limit(expr, x, 0)
print(f"Problem 4: limit = {lim}")

# Problem 6: integral of (x^2-1)/(x^4+1) from 0 to infinity
result6, _ = integrate.quad(lambda x: (x**2 - 1) / (x**4 + 1), 0, np.inf)
print(f"Problem 6: numerical = {result6:.6f}, exact = 0")
```

## When This Strategy Fails

- **Over-substitution:** If the new variable makes the expression *more* complex, undo it. Not every radical needs a trig substitution — sometimes direct integration or another method is faster.
- **Forgetting to change limits:** In definite integrals, you must transform the limits. A common error is substituting the integrand but keeping the old limits.
- **Domain issues:** sin(t) only covers [-1, 1]. If you need x in [1, 2] for sqrt(x^2 - 1), use x = sec(t) not x = sin(t).
- **Multiple substitutions needed:** Sometimes one substitution doesn't finish the job. Know when to chain substitutions vs. try a completely different approach.

## Visualisation — Trig substitution maps an arc to a straight line

A classic substitution: $\int \sqrt{a^2 - x^2}\,dx$ becomes trivial
under $x = a \sin t$. The plot makes the geometry visible — the
problematic curve $y = \sqrt{1 - x^2}$ (the upper half-circle) becomes
just $y = \cos t$ (a stretched cosine curve) once we walk the
substitution-parameter $t$.

```python
# ── Visualising a trig substitution ─────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# (1) Original integrand y = √(1 − x²) on [-1, 1]: the upper half of
# the unit circle. Computing its area requires √(1 − x²) directly.
ax = axes[0]
xs = np.linspace(-1, 1, 200)
ys = np.sqrt(1 - xs ** 2)
ax.plot(xs, ys, color="tab:blue", lw=2, label="$y = \\sqrt{1 - x^2}$")
ax.fill_between(xs, ys, color="tab:blue", alpha=0.30,
                label=f"area = π/2 ≈ {np.pi/2:.4f}")
ax.set_xlim(-1.2, 1.2); ax.set_ylim(-0.2, 1.2); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("Original integral $\\int_{-1}^{1} \\sqrt{1-x^2}\\, dx$\n"
             "looks hard — the integrand has a square root")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Substitute x = sin t, dx = cos t · dt.  √(1 - sin²t) = cos t.
# So the integrand becomes cos²t — a simple trigonometric integral.
ax = axes[1]
ts = np.linspace(-np.pi/2, np.pi/2, 200)
new_integrand = np.cos(ts) ** 2
ax.plot(ts, new_integrand, color="tab:orange", lw=2,
        label="$y = \\cos^2 t$  (after $x = \\sin t$)")
ax.fill_between(ts, new_integrand, color="tab:orange", alpha=0.30,
                label=f"same area = ∫cos²t dt from -π/2 to π/2 = π/2")
ax.set_xlabel("t"); ax.set_ylabel("integrand")
ax.set_title("After substitution: a polynomial in cos t\n→ standard half-angle integral")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("Why this substitution is the right move:")
print("  Original:  ∫_{-1}^{1} √(1 − x²) dx     — a radical, hard to attack directly.")
print("  Sub x = sin t, dx = cos t dt:")
print("    √(1 − sin²t) = cos t")
print("    so √(1 − x²) dx = cos t · cos t dt = cos²t dt")
print("  Half-angle: cos²t = (1 + cos 2t) / 2")
print("    ∫ cos²t dt = t/2 + sin(2t)/4")
print(f"  Evaluated from −π/2 to π/2 = π/2 ≈ {np.pi/2:.6f}  (= area of half-disc)")
```

## Connection to CS / Games / AI / Business / Industry

The skill here — *change variables until the problem becomes one you
already know how to solve* — shows up far beyond JEE:

- **CS / Software.** **Compiler optimisation passes** are substitution
  rules: loop-invariant code motion, strength reduction (`x*2` → `x<<1`),
  inlining. Symbolic-algebra systems (SymPy, Mathematica, Wolfram Alpha)
  automate exactly the substitute-and-simplify game we play here.
- **AI / ML.** **Normalising flows** and **change-of-variables formulas**
  in deep generative models (RealNVP, Glow, neural ODEs) are textbook
  $u$-substitution applied to probability densities. The
  **reparameterisation trick** in VAEs is a substitution chosen to make
  gradients flow.
- **Engineering / Physics.** Switching to **cylindrical or spherical
  coordinates** to compute volumes and fields, **moving frames** in fluid
  dynamics, **scaled time** in stiff ODE solvers — all substitution.
- **Business / Operations.** **Linearising a non-linear program** by a
  substitution (e.g. $y = \log x$ in revenue-elasticity models, or
  $y = 1/x$ for hyperbolic costs) is how OR teams turn hard models into
  ones their LP solver can handle.
- **Quant trading desks (Citadel, Two Sigma, Optiver).** Implied-volatility
  surfaces are inverted by a Cornish-Fisher / log-moneyness substitution
  $k = \log(K/F)$ that turns a non-linear root find into an almost-linear
  fit. Interview questions still hand candidates JEE-style integrals to
  test substitution fluency under time pressure.
- **Civil & mechanical engineering (L&T, Tata Steel).** Stress integrals
  in beam-bending use $x = a\sec t$ to evaluate $\int dx/\sqrt{x^2 - a^2}$
  for cross-sectional moments of inertia; the same Euler substitution
  appears when integrating drag along a non-circular pipe in CFD.
- **Pharma / biotech (Pfizer, Biocon).** Pharmacokinetic AUC calculations
  use the $t = e^{-kt}$ substitution to exactly integrate exponential
  decay terms in compartment models — the reciprocal-substitution trick
  is how regulatory submission docs (FDA NDA, EMA EPAR) close-form the
  bioavailability integral.
- **Energy & utilities (NTPC, BP).** Reservoir-engineering decline-curve
  forecasts substitute $u = 1/q$ to linearise hyperbolic Arps decline,
  letting Excel-based well economics tools at every E&P firm fit
  log-linear regressions instead of iterating non-linear solvers.

## Check Your Understanding

1. Evaluate integral from 0 to pi/2 of dx / (1 + tan(x))^(1/2). [Hint: try the substitution x → pi/2 - x to exploit symmetry, then combine.]

2. Find lim(x → 0) of [cbrt(1 + x) - (1 + x/3)] / x^2. [Hint: rationalise using a^3 - b^3 = (a-b)(a^2 + ab + b^2), or use Taylor expansion.]

3. Evaluate integral of sqrt((x-1)/(x+1)) * (1/x) dx. [Hint: let t = sqrt((x-1)/(x+1)), express x in terms of t, then simplify.]
