# Solving ODEs with Laplace Transforms

## Intuition

In Lesson 13 you learned to translate individual functions into the $s$-domain.
Now we use that machinery to solve entire differential equations. The payoff is
enormous: instead of guessing trial solutions or matching coefficients, you
transform the ODE into an algebraic equation, solve for $Y(s)$, then look up
the inverse transform. Initial conditions are baked in automatically — no
need to solve for constants separately.

## Prerequisites

- Tier 11, Lesson 13: Laplace Transform Basics (transform table, linearity, derivatives property)
- Tier 11, Lesson 7: Second-Order Homogeneous ODEs (to compare methods)

## From First Principles

### The Three-Step Recipe

1. **Transform** — apply $\mathcal{L}$ to every term of the ODE.
2. **Solve** — rearrange the resulting algebraic equation for $Y(s)$.
3. **Invert** — find $y(t) = \mathcal{L}^{-1}\{Y(s)\}$.

### Key Property: Transform of Derivatives

Recall from Lesson 13:

$$\mathcal{L}\{y'\} = sY(s) - y(0)$$

$$\mathcal{L}\{y''\} = s^2 Y(s) - sy(0) - y'(0)$$

These formulas absorb the initial conditions directly.

### Pen & Paper Example: $y'' + y = 0$, $y(0)=1$, $y'(0)=0$

**Step 1 — Transform both sides:**

$$\mathcal{L}\{y''\} + \mathcal{L}\{y\} = \mathcal{L}\{0\}$$

$$[s^2 Y(s) - s \cdot 1 - 0] + Y(s) = 0$$

$$s^2 Y(s) - s + Y(s) = 0$$

**Step 2 — Solve for $Y(s)$:**

$$Y(s)(s^2 + 1) = s$$

$$Y(s) = \frac{s}{s^2 + 1}$$

**Step 3 — Inverse transform:**

From the standard table: $\mathcal{L}\{\cos t\} = \frac{s}{s^2+1}$, so:

$$y(t) = \cos t$$

**Verify:** $y(0) = \cos 0 = 1$ ✓, $y'(0) = -\sin 0 = 0$ ✓,
$y'' + y = -\cos t + \cos t = 0$ ✓.

### A Slightly Harder Example: $y'' + 3y' + 2y = 0$, $y(0)=1$, $y'(0)=0$

**Transform:**

$$s^2 Y - s + 3(sY - 1) + 2Y = 0$$

$$Y(s^2 + 3s + 2) = s + 3$$

$$Y(s) = \frac{s+3}{s^2+3s+2} = \frac{s+3}{(s+1)(s+2)}$$

**Partial fractions:**

$$\frac{s+3}{(s+1)(s+2)} = \frac{A}{s+1} + \frac{B}{s+2}$$

Set $s = -1$: $A = \frac{-1+3}{-1+2} = 2$. Set $s = -2$: $B = \frac{-2+3}{-2+1} = -1$.

$$Y(s) = \frac{2}{s+1} - \frac{1}{s+2}$$

**Invert:** $\mathcal{L}^{-1}\{1/(s+a)\} = e^{-at}$, so:

$$y(t) = 2e^{-t} - e^{-2t}$$

### Visualisation

Plot both the $s$-domain function $Y(s)$ (along the real axis) and the
time-domain solution $y(t)$ side by side. The poles of $Y(s)$ at $s = -1$
and $s = -2$ correspond to the exponential rates in the time-domain solution.

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 5, 300)
y = 2 * np.exp(-t) - np.exp(-2 * t)

s = np.linspace(-4, 1, 500)
# |Y(s)| along the real axis (avoid poles)
Y_mag = np.abs((s + 3) / ((s + 1) * (s + 2)))
Y_mag[Y_mag > 20] = np.nan  # clip near poles

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.plot(s, Y_mag, 'b-')
ax1.axvline(-1, color='r', linestyle='--', alpha=0.5, label='pole s = -1')
ax1.axvline(-2, color='g', linestyle='--', alpha=0.5, label='pole s = -2')
ax1.set_xlabel('s (real axis)')
ax1.set_ylabel('|Y(s)|')
ax1.set_title('s-Domain: |Y(s)|')
ax1.legend()
ax1.set_ylim(0, 15)

ax2.plot(t, y, 'r-', linewidth=2)
ax2.set_xlabel('t')
ax2.set_ylabel('y(t)')
ax2.set_title('Time Domain: y(t) = 2e^{-t} - e^{-2t}')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("laplace_ode_solution.png", dpi=100)
plt.show()
```

## Python Verification

```python
import sympy as sp

t, s = sp.symbols('t s')
Y = sp.Function('Y')

# ── Define the IVP ──────────────────────────────────────
# y'' + 3y' + 2y = 0,  y(0)=1, y'(0)=0

# Step 1: Laplace transform (manual algebra encoded)
Y_s = (s + 3) / (s**2 + 3*s + 2)
print("Y(s) =", Y_s)

# Step 2: Partial fraction decomposition
pf = sp.apart(Y_s, s)
print("Partial fractions:", pf)

# Step 3: Inverse Laplace transform
y_t = sp.inverse_laplace_transform(Y_s, s, t)
print("y(t) =", y_t)

# Verify initial conditions
print("y(0) =", y_t.subs(t, 0))
print("y'(0) =", sp.diff(y_t, t).subs(t, 0))

# Verify ODE is satisfied
residual = sp.simplify(sp.diff(y_t, t, 2) + 3*sp.diff(y_t, t) + 2*y_t)
print("y'' + 3y' + 2y =", residual, "(should be 0)")

# ── Also solve using dsolve for comparison ──────────────
y_func = sp.Function('y')
ode = sp.Eq(y_func(t).diff(t, 2) + 3*y_func(t).diff(t) + 2*y_func(t), 0)
sol = sp.dsolve(ode, y_func(t), ics={y_func(0): 1, y_func(t).diff(t).subs(t, 0): 0})
print("dsolve gives:", sol)
```

## Connection to CS / Games / AI / Business / Industry

- **Control systems** — Transfer functions $H(s) = Y(s)/X(s)$ describe the
  input–output behaviour of controllers; game-engine PID controllers live here.
- **Signal processing** — The Laplace domain is the continuous-time analogue of
  the Z-transform used in digital filters (audio DSP).
- **Circuit simulation** — SPICE-like tools transform RLC circuits into
  $s$-domain algebra, solving exactly the kind of equations above.
- **Physics engines** — Damped spring equations ($y'' + by' + ky = f(t)$)
  are the bread and butter of Laplace methods.
- **HVAC chiller startup at Carrier/Trane** — startup transient analysis
  (compressor surge, cooling-tower fill) is solved in the $s$-domain so
  control engineers can place poles to meet ASHRAE Guideline 36 ramp-rate
  limits in commercial buildings.
- **Pharmacokinetics dossiers** — Pfizer and Novartis submit Laplace-domain
  compartment-model derivations to the FDA showing $C_{max}$, $T_{max}$, and
  AUC formulas; reviewers cross-check these per FDA Industry Guidance on
  Population PK.
- **Antilock brake (ABS) tuning at Bosch** — the wheel-slip ODE is solved with
  Laplace transforms to set the ECU bang-bang frequency that keeps slip near
  $\mu_{max}$; signed-off against ECE R13 brake-system regulation.
- **NASA Apollo guidance heritage** — the LM ascent-engine throttling controller
  was originally designed via Laplace-transform pole placement at MIT
  Instrumentation Lab; same workflow now used at SpaceX for Raptor throttle
  loops.

## Check Your Understanding

1. Solve $y' + 2y = 0$, $y(0)=5$ using Laplace transforms by hand.
   You should get $Y(s) = 5/(s+2)$ and $y(t) = 5e^{-2t}$.

2. Solve $y'' - y = 0$, $y(0)=0$, $y'(0)=1$. What are the poles of $Y(s)$,
   and what do they tell you about the time-domain solution?

3. For $y'' + 4y = 0$, $y(0)=0$, $y'(0)=2$, find $Y(s)$ and invert to get
   $y(t) = \sin 2t$.
