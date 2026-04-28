# Derivatives — Slope of the Tangent

## Intuition

The derivative tells you **how fast something is changing** at a specific
instant.  Speed is the derivative of position.  The slope of a curve at a
point is the derivative at that point.  In ML, the derivative tells the
optimiser which way to adjust weights to reduce the loss.

## Prerequisites

- Tier 3, Lesson 1: Limits

## From First Principles

### The limit definition

$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

This is the slope of the secant line as it becomes the tangent.

### Pen & paper: Derive $\frac{d}{dx}(x^2)$

$$f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h}$$

$$= \lim_{h \to 0} \frac{2xh + h^2}{h} = \lim_{h \to 0} (2x + h) = 2x$$

### Pen & paper: Derive $\frac{d}{dx}(x^3)$

First expand $(x+h)^3$ using the binomial formula:

$(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$

Now substitute:

$$f'(x) = \lim_{h \to 0} \frac{(x^3 + 3x^2h + 3xh^2 + h^3) - x^3}{h} = \lim_{h \to 0} \frac{3x^2h + 3xh^2 + h^3}{h}$$

$$= \lim_{h \to 0} (3x^2 + 3xh + h^2) = 3x^2$$

### The power rule (general)

$$\frac{d}{dx}(x^n) = nx^{n-1}$$

This works for any real $n$, not just integers.

### Derivative rules (pen & paper toolkit)

| Rule | Formula |
|------|---------|
| Constant | $\frac{d}{dx}(c) = 0$ |
| Power | $\frac{d}{dx}(x^n) = nx^{n-1}$ |
| Constant multiple | $\frac{d}{dx}(cf) = c \cdot f'$ |
| Sum | $(f + g)' = f' + g'$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $\left(\frac{f}{g}\right)' = \frac{f'g - fg'}{g^2}$ |
| Chain | $\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)$ |

### Key derivatives to memorise

| $f(x)$ | $f'(x)$ |
|---------|---------|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $a^x$ | $a^x \ln a$ |

### Pen & paper examples

**Product rule:** $\frac{d}{dx}(x^2 \sin x)$

$= 2x \sin x + x^2 \cos x$

**Quotient rule:** $\frac{d}{dx}\left(\frac{x}{x^2 + 1}\right)$

$= \frac{(1)(x^2 + 1) - x(2x)}{(x^2 + 1)^2} = \frac{1 - x^2}{(x^2 + 1)^2}$

**Chain rule:** $\frac{d}{dx}(e^{3x^2})$

Let $u = 3x^2$, then $\frac{d}{dx}(e^u) = e^u \cdot u' = e^{3x^2} \cdot 6x = 6x \cdot e^{3x^2}$

### Higher-order derivatives

The second derivative $f''(x)$ is the derivative of $f'(x)$.

**Pen & paper:** $f(x) = x^4$

$f'(x) = 4x^3$, $f''(x) = 12x^2$, $f'''(x) = 24x$, $f^{(4)}(x) = 24$

### Meaning of the second derivative

- $f''(x) > 0$: curve is **concave up** (bowl shape) — a local minimum
- $f''(x) < 0$: curve is **concave down** (hill shape) — a local maximum
- $f''(x) = 0$: possible inflection point

### Finding maxima and minima (pen & paper)

1. Find $f'(x) = 0$ (critical points)
2. Use $f''(x)$ to classify: $f'' > 0$ → min, $f'' < 0$ → max

**Pen & paper:** $f(x) = x^3 - 3x + 2$

$f'(x) = 3x^2 - 3 = 0$ → $x^2 = 1$ → $x = \pm 1$

$f''(x) = 6x$

At $x = 1$: $f''(1) = 6 > 0$ → **local minimum**, $f(1) = 0$
At $x = -1$: $f''(-1) = -6 < 0$ → **local maximum**, $f(-1) = 4$

## Python Verification

```python
# ── Derivatives: verifying pen & paper work ─────────────────

# Numerical derivative (limit definition)
def numerical_derivative(f, x, h=1e-8):
    return (f(x + h) - f(x)) / h

# d/dx(x²) = 2x
print("=== d/dx(x²) at x=3 ===")
f = lambda x: x**2
print(f"Numerical: {numerical_derivative(f, 3):.6f}")
print(f"Analytical (2x): {2*3}")

# d/dx(x³) = 3x²
print(f"\n=== d/dx(x³) at x=2 ===")
f = lambda x: x**3
print(f"Numerical: {numerical_derivative(f, 2):.6f}")
print(f"Analytical (3x²): {3*2**2}")

# Product rule: d/dx(x² sin x) at x=1
import math
print(f"\n=== Product rule: d/dx(x² sin x) at x=1 ===")
f = lambda x: x**2 * math.sin(x)
analytical = 2*1*math.sin(1) + 1**2 * math.cos(1)
print(f"Numerical: {numerical_derivative(f, 1):.6f}")
print(f"Analytical: {analytical:.6f}")

# Chain rule: d/dx(e^(3x²)) at x=1
print(f"\n=== Chain rule: d/dx(e^(3x²)) at x=1 ===")
f = lambda x: math.exp(3*x**2)
analytical = 6*1 * math.exp(3*1**2)
print(f"Numerical: {numerical_derivative(f, 1):.2f}")
print(f"Analytical (6x·e^(3x²)): {analytical:.2f}")

# Finding min/max: f(x) = x³ - 3x + 2
print(f"\n=== Critical points of x³ - 3x + 2 ===")
# f'(x) = 3x² - 3 = 0 → x = ±1
f = lambda x: x**3 - 3*x + 2
for x in [-1, 1]:
    fprime = 3*x**2 - 3
    fdouble = 6*x
    kind = "max" if fdouble < 0 else "min"
    print(f"x={x}: f={f(x)}, f'={fprime}, f''={fdouble} → local {kind}")
```

## Visualisation — The derivative as the slope of the tangent

A derivative is a **slope** — the slope of the *tangent line* that best
fits the curve at a single point. Three pictures show that exactly:
the secant line tilts toward the tangent as the step $h$ shrinks; the
derivative function reads off slopes everywhere; and zeros of $f'$
mark maxima, minima, and saddle points of $f$.

```python
# ── Visualising the derivative ──────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(16, 4.8))

# (1) Secant lines closing in on the tangent.
# As h shrinks, the secant through (x, f(x)) and (x+h, f(x+h))
# rotates onto the tangent line at x. That limiting slope IS f'(x).
ax = axes[0]
def f(x): return x ** 2
def fp(x): return 2 * x
xs = np.linspace(-1, 3.2, 200)
ax.plot(xs, f(xs), color="tab:blue", lw=2, label="f(x) = x²")

x0 = 1.5
hs = [1.5, 0.8, 0.3]                            # decreasing h's → secant → tangent
for h, color in zip(hs, ["tab:red", "tab:orange", "tab:green"]):
    slope = (f(x0 + h) - f(x0)) / h
    line  = f(x0) + slope * (xs - x0)
    ax.plot(xs, line, color=color, lw=1.4, alpha=0.8,
            label=f"secant, h = {h}, slope = {slope:.2f}")
    ax.scatter([x0 + h], [f(x0 + h)], color=color, zorder=5)
# Tangent line at x = x0.
slope_true = fp(x0)
tangent = f(x0) + slope_true * (xs - x0)
ax.plot(xs, tangent, color="black", lw=2, linestyle="--",
        label=f"tangent at x = {x0}, slope = {slope_true:.2f}")
ax.scatter([x0], [f(x0)], color="black", zorder=5, s=80)
ax.set_xlim(-1, 3.5); ax.set_ylim(-1, 11)
ax.set_title(f"Secants converge to the tangent\n(slope → f'({x0}) = {slope_true})")
ax.legend(fontsize=8); ax.grid(True, alpha=0.3)

# (2) f and f' on the same axes. The peak of f' (where f' = 0) is
# where f has a horizontal tangent — local extremum.
ax = axes[1]
def g(x):  return x ** 3 - 3 * x + 2
def gp(x): return 3 * x ** 2 - 3
xs = np.linspace(-2.5, 2.5, 200)
ax.plot(xs, g(xs),  color="tab:blue",   lw=2, label="f(x) = x³ − 3x + 2")
ax.plot(xs, gp(xs), color="tab:orange", lw=2, label="f'(x) = 3x² − 3")
ax.axhline(0, color="black", lw=0.6)
# f' = 0 at x = ±1 → critical points of f.
for x_crit, kind in [(-1, "max"), (1, "min")]:
    ax.scatter([x_crit], [g(x_crit)],  color="tab:red",   s=100, zorder=5)
    ax.scatter([x_crit], [gp(x_crit)], color="tab:green", s=100, zorder=5)
    ax.annotate(f"local {kind}\n(f' = 0)", xy=(x_crit, g(x_crit)),
                xytext=(x_crit + 0.3, g(x_crit) + 1.3),
                arrowprops=dict(arrowstyle="->", color="tab:red"))
ax.set_xlim(-2.5, 2.5); ax.set_ylim(-6, 6)
ax.set_title("f and f' on the same plot:\nzeros of f' mark f's max/min")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Sign of f' tells you "increasing" vs "decreasing" — colour the
# axis underneath f to make the connection visible.
ax = axes[2]
xs = np.linspace(-2.5, 2.5, 600)
ax.plot(xs, g(xs), color="tab:blue", lw=2, label="f(x) = x³ − 3x + 2")
gprime = gp(xs)
# Colour the x-axis: green where f' > 0 (rising), red where f' < 0 (falling).
ax.fill_between(xs, -6, 6, where=gprime > 0, color="tab:green",  alpha=0.10,
                label="f' > 0  (f rising)")
ax.fill_between(xs, -6, 6, where=gprime < 0, color="tab:red",    alpha=0.10,
                label="f' < 0  (f falling)")
ax.axhline(0, color="black", lw=0.6)
ax.set_xlim(-2.5, 2.5); ax.set_ylim(-6, 6)
ax.set_title("Sign of f' = direction of motion of f\n(green: rising,  red: falling)")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Numerical check: the secant slope converges to 2x = 3 at x = 1.5.
print(f"f(x) = x², f'(1.5) = 3 (analytical)")
for h in [1, 0.1, 0.01, 0.001, 0.0001]:
    slope = ((1.5 + h) ** 2 - 1.5 ** 2) / h
    print(f"  h = {h:<7} → secant slope = {slope:.6f}   gap = {abs(slope - 3):.2e}")
```

**The three plots make the chain of ideas concrete:**

- **The derivative is a *limit* of slopes.** The leftmost panel shows
  three secants approaching the tangent. Algebraically, $f'(x) =
  \lim_{h \to 0}\frac{f(x+h) - f(x)}{h}$. The values printed below
  prove the convergence is real — the secant slope homes in on the
  exact derivative as $h$ shrinks.
- **$f'$ is itself a function.** The middle panel plots both $f$ and
  $f'$ together. Where $f'$ crosses zero, $f$ is locally flat — a
  candidate maximum or minimum. The second derivative $f''$ resolves
  the ambiguity (positive ⇒ valley ⇒ minimum; negative ⇒ peak ⇒
  maximum). This is the mechanism that **gradient descent** — the
  workhorse of machine learning — exploits.
- **Sign of $f'$ tells the story of $f$.** The rightmost panel colours
  the regions where $f$ is rising (green, $f' > 0$) versus falling
  (red, $f' < 0$). This sign pattern *is* the qualitative behaviour of
  the function — turning a continuous calculation into a finite story.

## Connection to CS / Games / AI / Business / Industry

- **Gradient descent** — the derivative tells the optimiser which direction to step
- **Backpropagation** — computing derivatives layer by layer using the chain rule
- **Physics engines** — velocity = derivative of position, acceleration = derivative of velocity
- **Loss functions** — MSE derivative is $2(\hat{y} - y)$, cross-entropy derivative leads to softmax
- **Animation curves** — Bézier curve tangents are derivatives, used for easing functions
- **Marginal cost & marginal revenue (Economics/Finance)** — derivatives of cost and revenue curves; airlines (Delta, United) and SaaS pricing teams (Salesforce, HubSpot) use them to decide whether one more flight, customer, or feature is profitable.
- **Option Greeks (Quant Finance)** — Delta, Gamma, Theta, and Vega are first/second-order derivatives of option price; trading desks at Goldman Sachs, Citadel, and Jane Street recompute them every tick to hedge billion-dollar portfolios.
- **PID controllers (Industrial Engineering)** — the "D" term is a derivative; used in Tesla autopilot steering, drone flight controllers (DJI, ArduPilot), and Bosch ABS brake systems to react to rate-of-change of error.
- **Drug dose-response curves (Pharma)** — pharmacologists at Roche/Novartis differentiate Hill equations to find the EC50 inflection point that determines therapeutic dosing.

## Check Your Understanding

1. **Pen & paper:** Using the limit definition, derive $\frac{d}{dx}(3x + 5)$.
2. **Pen & paper:** Find $\frac{d}{dx}(x^2 e^x)$ using the product rule.
3. **Pen & paper:** Find $\frac{d}{dx}\left(\frac{1}{1 + e^{-x}}\right)$.  (This is the sigmoid function — you'll see it again in Tier 6.)
4. **Pen & paper:** Find all critical points of $f(x) = x^4 - 4x^3 + 4x^2$ and classify them.
