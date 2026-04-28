# Hyperbolic Functions — sinh, cosh, tanh

## Intuition

Hyperbolic functions are to the **hyperbola** what trig functions are to the
**circle**.  $\cosh$ and $\sinh$ are defined using exponentials, and $\tanh$
is their ratio.  You already know $\tanh$ as an activation function (Tier 6) —
now you'll see where it comes from mathematically and why its shape sits
between sigmoid and linear.

## Prerequisites

- Supplementary Graphs, Lesson 2: Exponential and Logarithmic
- Tier 6, Lesson 2: Activation Functions (tanh as activation)

## From First Principles

### Definitions

$$\cosh x = \frac{e^x + e^{-x}}{2} \quad \text{(hyperbolic cosine)}$$

$$\sinh x = \frac{e^x - e^{-x}}{2} \quad \text{(hyperbolic sine)}$$

$$\tanh x = \frac{\sinh x}{\cosh x} = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$

### Pen & paper: Key values

| $x$ | $\cosh x$ | $\sinh x$ | $\tanh x$ |
|-----|-----------|-----------|-----------|
| $0$ | $1$ | $0$ | $0$ |
| $1$ | $1.543$ | $1.175$ | $0.762$ |
| $-1$ | $1.543$ | $-1.175$ | $-0.762$ |
| $\infty$ | $\infty$ | $\infty$ | $1$ |

### Key identity (compare to $\cos^2 + \sin^2 = 1$)

$$\cosh^2 x - \sinh^2 x = 1$$

**Pen & paper proof:**

$\cosh^2 x - \sinh^2 x = \frac{(e^x + e^{-x})^2}{4} - \frac{(e^x - e^{-x})^2}{4}$

$= \frac{e^{2x} + 2 + e^{-2x} - e^{2x} + 2 - e^{-2x}}{4} = \frac{4}{4} = 1$ ✓

### Derivatives

$$\frac{d}{dx}\sinh x = \cosh x$$

$$\frac{d}{dx}\cosh x = \sinh x$$

$$\frac{d}{dx}\tanh x = 1 - \tanh^2 x = \text{sech}^2 x$$

Note: $\tanh' = 1 - \tanh^2$, exactly the formula used in backpropagation (Tier 6-02).

### Comparison: trig vs hyperbolic

| Trig | Hyperbolic |
|------|-----------|
| $\cos^2 + \sin^2 = 1$ | $\cosh^2 - \sinh^2 = 1$ |
| $(\sin x)' = \cos x$ | $(\sinh x)' = \cosh x$ |
| $(\cos x)' = -\sin x$ | $(\cosh x)' = \sinh x$ (no minus!) |
| Periodic | Not periodic |
| $\sin$ is bounded | $\sinh$ is unbounded |
| Unit circle: $x^2 + y^2 = 1$ | Unit hyperbola: $x^2 - y^2 = 1$ |

### Inverse hyperbolic functions

$$\text{arsinh}\, x = \ln(x + \sqrt{x^2 + 1})$$

$$\text{arcosh}\, x = \ln(x + \sqrt{x^2 - 1}), \quad x \ge 1$$

$$\text{artanh}\, x = \frac{1}{2}\ln\frac{1+x}{1-x}, \quad |x| < 1$$

### The catenary

A hanging chain forms the curve $y = a\cosh(x/a)$.  Not a parabola!

The St. Louis Gateway Arch is an inverted catenary.

### tanh as activation (connection to ML)

$\tanh$ maps $\mathbb{R} \to (-1, 1)$.  Compare:

- $\sigma(x) = \frac{1}{1+e^{-x}}$ maps to $(0, 1)$
- $\tanh(x) = 2\sigma(2x) - 1$ maps to $(-1, 1)$ — **zero-centred**

Zero-centred outputs help with gradient flow because the mean activation is near 0.

## Python Verification

```python
# ── Hyperbolic Functions ────────────────────────────────────
import math

# Values
print("=== Key values ===")
print(f"{'x':>4} {'cosh':>8} {'sinh':>8} {'tanh':>8}")
for x in [-2, -1, 0, 1, 2, 5]:
    print(f"  {x:+d}  {math.cosh(x):8.4f} {math.sinh(x):8.4f} {math.tanh(x):8.4f}")

# Identity: cosh² - sinh² = 1
print(f"\n=== cosh²x - sinh²x = 1 ===")
for x in [0.5, 1.0, 2.0, 3.7]:
    val = math.cosh(x)**2 - math.sinh(x)**2
    print(f"  x={x}: {val:.10f}")

# Derivatives
print(f"\n=== Derivatives ===")
h = 1e-8
for x in [-1, 0, 1, 2]:
    # d/dx sinh = cosh
    d_sinh = (math.sinh(x+h) - math.sinh(x)) / h
    print(f"  (sinh)'({x}) = {d_sinh:.4f}, cosh({x}) = {math.cosh(x):.4f}")

    # d/dx tanh = 1 - tanh²
    d_tanh = (math.tanh(x+h) - math.tanh(x)) / h
    sech2 = 1 - math.tanh(x)**2
    print(f"  (tanh)'({x}) = {d_tanh:.4f}, 1-tanh² = {sech2:.4f}")

# tanh vs sigmoid
print(f"\n=== tanh = 2σ(2x) - 1 ===")
sigmoid = lambda x: 1 / (1 + math.exp(-x))
for x in [-2, -1, 0, 1, 2]:
    tanh_val = math.tanh(x)
    from_sig = 2 * sigmoid(2*x) - 1
    print(f"  x={x:+d}: tanh={tanh_val:+.4f}, 2σ(2x)-1={from_sig:+.4f}")

# Catenary
print(f"\n=== Catenary: y = cosh(x) ===")
for x_10 in range(-20, 21, 5):
    x = x_10 / 10
    y = math.cosh(x)
    bar = '*' * int(y * 5)
    print(f"  x={x:+4.1f}: y={y:.3f} {bar}")

# Inverse hyperbolic
print(f"\n=== Inverse: arsinh, arcosh, artanh ===")
for x in [0.5, 1.0, 2.0]:
    arsinh = math.asinh(x)
    formula = math.log(x + math.sqrt(x**2 + 1))
    print(f"  arsinh({x}) = {arsinh:.4f}, ln formula = {formula:.4f}")
```

## Visualisation — Hyperbolic vs trigonometric functions

The hyperbolic functions sinh, cosh, tanh are the "exponential
cousins" of sine, cosine, tangent. The plot puts both families side by
side so the family resemblance and the differences are immediate.

```python
# ── Visualising hyperbolic functions ────────────────────────
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-3, 3, 400)

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

# (1) sinh, cosh, tanh.
ax = axes[0]
ax.plot(x, np.sinh(x), color="tab:blue",   lw=2, label="sinh(x) = (eˣ − e⁻ˣ)/2")
ax.plot(x, np.cosh(x), color="tab:orange", lw=2, label="cosh(x) = (eˣ + e⁻ˣ)/2")
ax.plot(x, np.tanh(x), color="tab:green",  lw=2, label="tanh(x) = sinh/cosh")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.axhline( 1, color="grey", lw=0.5, linestyle=":")
ax.axhline(-1, color="grey", lw=0.5, linestyle=":")
ax.set_xlim(-3, 3); ax.set_ylim(-5, 6)
ax.set_title("Hyperbolic functions\n(exponential-derived)")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) Why "hyperbolic": the parametric curve (cosh t, sinh t) traces
# the right branch of the unit hyperbola x² − y² = 1, much like
# (cos t, sin t) traces the unit circle.
ax = axes[1]
t = np.linspace(-1.5, 1.5, 200)
ax.plot(np.cosh(t),  np.sinh(t), color="tab:purple", lw=2,
        label="(cosh t, sinh t): branch of x² − y² = 1")
# For comparison, draw the unit circle.
phi = np.linspace(0, 2 * np.pi, 200)
ax.plot(np.cos(phi), np.sin(phi), color="tab:blue", lw=1.5, linestyle="--",
        label="(cos t, sin t): x² + y² = 1")
ax.set_aspect("equal"); ax.set_xlim(-3, 3); ax.set_ylim(-3, 3)
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_title("'Trig parametrises a circle,\nhyperbolic parametrises a hyperbola'")
ax.legend(fontsize=9); ax.grid(True, alpha=0.3)

# (3) Catenary: y = a · cosh(x/a) is the shape of a chain hanging
# under gravity. Looks like a parabola but isn't — it's an exponential
# combination.
ax = axes[2]
x_cat = np.linspace(-2, 2, 200)
for a, color in [(0.5, "tab:red"), (1.0, "tab:blue"), (2.0, "tab:green")]:
    ax.plot(x_cat, a * np.cosh(x_cat / a), color=color, lw=2,
            label=f"y = {a}·cosh(x/{a})")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_title("Catenary curves: hanging-chain shapes\n(arch in St. Louis Gateway is an inverted catenary)")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the identity that mirrors the trig identity sin² + cos² = 1.
print("Trig identity:        cos² + sin² = 1   (unit circle)")
print("Hyperbolic identity:  cosh² − sinh² = 1   (unit hyperbola)")
print()
for x_val in [-1, 0, 1, 2]:
    s = np.sinh(x_val); c = np.cosh(x_val)
    print(f"  x = {x_val:+d}: sinh = {s:+.4f},  cosh = {c:+.4f},  cosh² − sinh² = {c*c - s*s:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **tanh activation** — zero-centred alternative to sigmoid; used in LSTM cells
- **Catenary** — hanging rope/chain simulation in physics engines
- **Rapidity** — special relativity uses hyperbolic functions ($v = c\tanh\phi$)
- **Hyperbolic geometry** — Poincaré embeddings for hierarchical data (word embeddings with tree structure)
- **Integration** — hyperbolic substitution simplifies certain integrals ($\sqrt{x^2 + 1}$)
- **Gateway Arch in St. Louis** — the iconic Eero Saarinen catenoid uses an inverted weighted catenary $y = A \cosh(x/A) - A$; its shape was specified to NPS within millimetres using hyperbolic functions.
- **Power-line sag (NESC, IEC 60826)** — every overhead transmission line (Tennessee Valley Authority, National Grid UK) has its sag-tension calculated via $y = T_0/w \cdot \cosh(wx/T_0)$ to ensure ground-clearance code compliance even on hot, low-tension days.
- **Subsea cable laying (SubCom, Alcatel Submarine Networks)** — underwater fiber-optic cables (MAREA, 2Africa) use catenary hyperbolic-cosine profiles for touch-down geometry to avoid bending-radius violations at \$50k+/km repair cost.
- **Facebook/Meta Poincaré embeddings (NeurIPS 2017)** — hyperbolic-space embeddings of taxonomies (WordNet, knowledge graphs) outperform Euclidean embeddings in low dimensions, used in recommender-system A/B tests at scale.

## Check Your Understanding

1. **Pen & paper:** Verify $\cosh^2(2) - \sinh^2(2) = 1$ numerically.  ($e^2 \approx 7.389$.)
2. **Pen & paper:** Show that $\frac{d}{dx}\tanh x = 1 - \tanh^2 x$ by differentiating $\frac{\sinh x}{\cosh x}$ using the quotient rule.
3. **Pen & paper:** Express $\tanh x$ in terms of $e^{2x}$: show $\tanh x = \frac{e^{2x} - 1}{e^{2x} + 1}$.
4. **Think about it:** Why is the maximum derivative of $\tanh$ (which is 1) better for gradient flow than sigmoid's maximum derivative (0.25)?
