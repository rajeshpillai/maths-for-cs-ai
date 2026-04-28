# The Laplace Transform — Basics

## Intuition

The Laplace transform converts a differential equation into an algebraic
equation — it turns calculus into algebra. Instead of solving $y'' + 3y' + 2y = f(t)$
directly, you transform everything into a new domain (the $s$-domain), solve
the algebra, then transform back. It is the same idea as using logarithms to
turn multiplication into addition: move to a domain where the problem is
easier, solve, then come back.

## Prerequisites

- Tier 3, Lesson 6: Integrals (improper integrals to infinity)
- Tier 11, Lesson 7: Second-Order Homogeneous ODEs (you need to solve these; Laplace gives an alternative path)

## From First Principles

### Definition

The Laplace transform of a function $f(t)$ (defined for $t \geq 0$) is:

$$\mathcal{L}\{f(t)\} = F(s) = \int_0^{\infty} e^{-st} f(t)\,dt$$

where $s$ is a complex number with $\text{Re}(s)$ large enough for the
integral to converge.

This maps $f(t)$ (time domain) to $F(s)$ (frequency/Laplace domain).

### Computing Basic Transforms by Hand

**Transform of $f(t) = 1$:**

$$F(s) = \int_0^{\infty} e^{-st} \cdot 1\,dt = \left[-\frac{e^{-st}}{s}\right]_0^{\infty} = 0 - \left(-\frac{1}{s}\right) = \frac{1}{s}$$

(valid for $s > 0$)

**Transform of $f(t) = t$:**

$$F(s) = \int_0^{\infty} t e^{-st}\,dt$$

Integration by parts: $u = t$, $dv = e^{-st}dt$:

$$= \left[-\frac{t e^{-st}}{s}\right]_0^{\infty} + \frac{1}{s}\int_0^{\infty} e^{-st}\,dt = 0 + \frac{1}{s} \cdot \frac{1}{s} = \frac{1}{s^2}$$

**Transform of $f(t) = e^{at}$:**

$$F(s) = \int_0^{\infty} e^{-st} e^{at}\,dt = \int_0^{\infty} e^{-(s-a)t}\,dt = \frac{1}{s - a}$$

(valid for $s > a$)

**Transform of $f(t) = \sin(at)$:**

Using $\sin(at) = \frac{e^{iat} - e^{-iat}}{2i}$:

$$\mathcal{L}\{\sin(at)\} = \frac{1}{2i}\left(\frac{1}{s - ia} - \frac{1}{s + ia}\right) = \frac{1}{2i} \cdot \frac{2ia}{s^2 + a^2} = \frac{a}{s^2 + a^2}$$

**Transform of $f(t) = \cos(at)$:**

Similarly: $\mathcal{L}\{\cos(at)\} = \frac{s}{s^2 + a^2}$

### Essential Transform Table

| $f(t)$ | $F(s) = \mathcal{L}\{f\}$ | Condition |
|---|---|---|
| $1$ | $1/s$ | $s > 0$ |
| $t$ | $1/s^2$ | $s > 0$ |
| $t^n$ | $n!/s^{n+1}$ | $s > 0$ |
| $e^{at}$ | $1/(s-a)$ | $s > a$ |
| $\sin(at)$ | $a/(s^2+a^2)$ | $s > 0$ |
| $\cos(at)$ | $s/(s^2+a^2)$ | $s > 0$ |
| $e^{at}\sin(bt)$ | $b/((s-a)^2+b^2)$ | $s > a$ |
| $e^{at}\cos(bt)$ | $(s-a)/((s-a)^2+b^2)$ | $s > a$ |

### Key Properties

**Linearity:**

$$\mathcal{L}\{af + bg\} = a\mathcal{L}\{f\} + b\mathcal{L}\{g\}$$

**Transform of derivatives** (the power move):

$$\mathcal{L}\{f'(t)\} = sF(s) - f(0)$$

$$\mathcal{L}\{f''(t)\} = s^2 F(s) - sf(0) - f'(0)$$

This is why the Laplace transform converts DEs to algebra: derivatives become
polynomial multiplications in $s$.

### Solving a DE with Laplace Transforms

**Example:** $y'' + 3y' + 2y = 0$, $y(0) = 1$, $y'(0) = 0$.

Step 1 — Transform both sides:

$$s^2 Y - s \cdot 1 - 0 + 3(sY - 1) + 2Y = 0$$

$$s^2 Y - s + 3sY - 3 + 2Y = 0$$

Step 2 — Solve for $Y(s)$:

$$Y(s^2 + 3s + 2) = s + 3$$

$$Y(s) = \frac{s + 3}{s^2 + 3s + 2} = \frac{s + 3}{(s+1)(s+2)}$$

Step 3 — Partial fractions:

$$\frac{s + 3}{(s+1)(s+2)} = \frac{A}{s+1} + \frac{B}{s+2}$$

$s + 3 = A(s+2) + B(s+1)$

Set $s = -1$: $2 = A(1) \Rightarrow A = 2$.
Set $s = -2$: $1 = B(-1) \Rightarrow B = -1$.

$$Y(s) = \frac{2}{s+1} - \frac{1}{s+2}$$

Step 4 — Inverse transform (read from table):

$$y(t) = 2e^{-t} - e^{-2t}$$

**Check:** $y(0) = 2 - 1 = 1$. $y'(0) = -2 + 2 = 0$. Correct.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: original functions
ax = axes[0]
t = np.linspace(0, 5, 300)
functions = {
    "1": np.ones_like(t),
    "t": t,
    "e^t": np.exp(t),
    "e^{-t}": np.exp(-t),
    "sin(2t)": np.sin(2*t),
    "cos(2t)": np.cos(2*t),
}
for name, f in functions.items():
    if name == "e^t":
        ax.plot(t[:150], f[:150], label=f"f(t) = {name}")
    else:
        ax.plot(t, f, label=f"f(t) = {name}")
ax.set_xlabel("t (time domain)")
ax.set_ylabel("f(t)")
ax.set_title("Original functions f(t)")
ax.legend(fontsize=8)
ax.set_ylim(-3, 5)

# Right: their Laplace transforms (real s axis)
ax = axes[1]
s = np.linspace(0.1, 5, 300)
transforms = {
    "1 -> 1/s": 1/s,
    "t -> 1/s^2": 1/s**2,
    "e^t -> 1/(s-1)": 1/(s - 1),
    "e^{-t} -> 1/(s+1)": 1/(s + 1),
    "sin(2t) -> 2/(s^2+4)": 2/(s**2 + 4),
    "cos(2t) -> s/(s^2+4)": s/(s**2 + 4),
}
for name, F in transforms.items():
    mask = np.abs(F) < 10  # clip for readability
    ax.plot(s[mask], F[mask], label=name)
ax.set_xlabel("s (Laplace domain)")
ax.set_ylabel("F(s)")
ax.set_title("Laplace transforms F(s)")
ax.legend(fontsize=7)
ax.set_ylim(-1, 5)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import quad

# --- Verify transforms numerically ---
print("=== Numerical verification of Laplace transforms ===\n")

def numerical_laplace(f, s, upper=50):
    """Compute L{f}(s) = integral_0^inf e^{-st} f(t) dt numerically."""
    result, _ = quad(lambda t: np.exp(-s*t) * f(t), 0, upper)
    return result

s_test = 2.0

pairs = [
    ("1", lambda t: 1.0, 1/s_test),
    ("t", lambda t: t, 1/s_test**2),
    ("e^{0.5t}", lambda t: np.exp(0.5*t), 1/(s_test - 0.5)),
    ("sin(3t)", lambda t: np.sin(3*t), 3/(s_test**2 + 9)),
    ("cos(3t)", lambda t: np.cos(3*t), s_test/(s_test**2 + 9)),
]

print(f"  s = {s_test}")
print(f"  {'f(t)':<12} {'Numerical':>12} {'Formula':>12} {'Error':>12}")
print("  " + "-" * 52)
for name, f, exact in pairs:
    numerical = numerical_laplace(f, s_test)
    print(f"  {name:<12} {numerical:12.8f} {exact:12.8f} {abs(numerical-exact):12.2e}")

print()

# --- Solve y'' + 3y' + 2y = 0, y(0)=1, y'(0)=0 ---
print("=== Solution verification: y'' + 3y' + 2y = 0 ===")
print("  y(t) = 2*e^{-t} - e^{-2t}")

t_test = np.array([0.0, 0.5, 1.0, 2.0, 5.0])
y = 2*np.exp(-t_test) - np.exp(-2*t_test)
yp = -2*np.exp(-t_test) + 2*np.exp(-2*t_test)
ypp = 2*np.exp(-t_test) - 4*np.exp(-2*t_test)
residual = ypp + 3*yp + 2*y

print(f"\n  {'t':>5} {'y':>10} {'y\\''+3y\\'+2y':>15}")
for i in range(len(t_test)):
    print(f"  {t_test[i]:5.1f} {y[i]:10.6f} {residual[i]:15.2e}")

print(f"\n  y(0) = {y[0]:.1f} (should be 1)")
print(f"  y'(0) = {yp[0]:.1f} (should be 0)")

print()

# --- Derivative property verification ---
print("=== Derivative property: L{f'} = s*F(s) - f(0) ===")
# f(t) = e^{-t}, f(0) = 1, f'(t) = -e^{-t}
s = 3.0
F_s = 1 / (s + 1)  # L{e^{-t}}
Fp_formula = s * F_s - 1  # should equal L{-e^{-t}} = -1/(s+1)
Fp_direct = -1 / (s + 1)
print(f"  s*F(s) - f(0) = {s}*{F_s:.4f} - 1 = {Fp_formula:.6f}")
print(f"  L{{f'}}  directly = {Fp_direct:.6f}")
print(f"  Match: {abs(Fp_formula - Fp_direct) < 1e-10}")
```

## Connection to CS / Games / AI / Business / Industry

- **Control systems (PID)**: transfer functions $H(s) = Y(s)/X(s)$ are
  ratios of Laplace transforms. Engineers design controllers entirely in the
  $s$-domain, then implement them digitally.
- **Signal processing**: the Laplace transform generalises the Fourier
  transform (set $s = i\omega$). It handles transient and steady-state
  together.
- **Circuit simulation (SPICE)**: all component equations are written in the
  $s$-domain for AC analysis.
- **Game audio**: reverb impulse responses are modelled via transfer functions;
  the Laplace domain tells you which frequencies are amplified or attenuated.
- **Stability of numerical methods**: the $Z$-transform (discrete Laplace)
  determines whether a numerical ODE solver is stable for a given step size.

## Check Your Understanding

1. Compute $\mathcal{L}\{t^2\}$ by hand using integration by parts twice.
   Verify it equals $2/s^3$.

2. Use the Laplace transform to solve $y' + 2y = 3$, $y(0) = 0$. Follow all
   four steps: transform, solve for $Y(s)$, partial fractions, inverse
   transform.

3. Show that $\mathcal{L}\{e^{at}f(t)\} = F(s - a)$ (the first shifting
   theorem). Use this to find $\mathcal{L}\{e^{-2t}\sin(3t)\}$ without
   integrating.
