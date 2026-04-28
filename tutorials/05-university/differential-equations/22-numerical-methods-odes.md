# Numerical Methods for ODEs — Runge-Kutta

## Intuition

Euler's method (Lesson 6) is the simplest numerical ODE solver, but it is
inaccurate: its error shrinks only linearly with step size. The **Runge-Kutta**
family achieves much higher accuracy by evaluating the slope at several points
within each step and combining them cleverly. The 4th-order Runge-Kutta method
(RK4) is the workhorse of scientific computing — it gives 4th-order accuracy
(halving the step cuts error by 16x) with just four function evaluations per step.

## Prerequisites

- Tier 11, Lesson 6: Euler's Method (first-order numerical ODE solving)
- Tier 3, Lesson 9: Taylor Series (error analysis relies on Taylor expansion)

## From First Principles

### Why Euler Fails

Euler's method: $y_{n+1} = y_n + h\,f(t_n, y_n)$.

This uses the slope only at the **left edge** of the interval. If the slope
changes across the interval, you accumulate error. The **local truncation
error** is $O(h^2)$, so the **global error** after $N = T/h$ steps is $O(h)$.

### Building Better Methods

**Idea:** Evaluate the slope at intermediate points and take a weighted average.

**Midpoint method (RK2):**

$$k_1 = f(t_n, y_n)$$
$$k_2 = f\left(t_n + \frac{h}{2},\; y_n + \frac{h}{2}k_1\right)$$
$$y_{n+1} = y_n + h\,k_2$$

This is 2nd-order accurate: global error $O(h^2)$.

### The Classical RK4 Method

$$k_1 = f(t_n,\; y_n)$$
$$k_2 = f\left(t_n + \frac{h}{2},\; y_n + \frac{h}{2}k_1\right)$$
$$k_3 = f\left(t_n + \frac{h}{2},\; y_n + \frac{h}{2}k_2\right)$$
$$k_4 = f(t_n + h,\; y_n + h\,k_3)$$
$$y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$

The weights $1/6, 2/6, 2/6, 1/6$ are Simpson's rule weights. This achieves
4th-order accuracy: global error $O(h^4)$.

### Pen & Paper: One Step of RK4

Solve $y' = -2y$, $y(0) = 1$, with $h = 0.5$.

Exact solution: $y(t) = e^{-2t}$, so $y(0.5) = e^{-1} \approx 0.367879$.

$$k_1 = -2(1) = -2$$
$$k_2 = -2(1 + 0.25 \cdot (-2)) = -2(0.5) = -1$$
$$k_3 = -2(1 + 0.25 \cdot (-1)) = -2(0.75) = -1.5$$
$$k_4 = -2(1 + 0.5 \cdot (-1.5)) = -2(0.25) = -0.5$$

$$y_1 = 1 + \frac{0.5}{6}(-2 + 2(-1) + 2(-1.5) + (-0.5))$$
$$= 1 + \frac{0.5}{6}(-2 - 2 - 3 - 0.5) = 1 + \frac{0.5 \times (-7.5)}{6}$$
$$= 1 - 0.625 = 0.375$$

Euler would give: $y_1 = 1 + 0.5(-2) = 0$.

RK4 error: $|0.375 - 0.3679| = 0.0071$. Euler error: $|0 - 0.3679| = 0.368$.

### Adaptive Step Size (RK45)

The Runge-Kutta-Fehlberg method computes both a 4th-order and 5th-order estimate
in one pass. The difference estimates the local error:

$$\text{error} \approx |y_5 - y_4|$$

If the error is too large, shrink $h$. If it is very small, grow $h$. This
gives automatic step size control — small steps where the solution changes fast,
large steps where it is smooth.

### Visualisation

Compare Euler and RK4 accuracy.

```python
import numpy as np
import matplotlib.pyplot as plt

def euler(f, y0, t_span, h):
    t = np.arange(t_span[0], t_span[1] + h, h)
    y = np.zeros(len(t))
    y[0] = y0
    for i in range(len(t) - 1):
        y[i+1] = y[i] + h * f(t[i], y[i])
    return t, y

def rk4(f, y0, t_span, h):
    t = np.arange(t_span[0], t_span[1] + h, h)
    y = np.zeros(len(t))
    y[0] = y0
    for i in range(len(t) - 1):
        k1 = f(t[i], y[i])
        k2 = f(t[i] + h/2, y[i] + h/2 * k1)
        k3 = f(t[i] + h/2, y[i] + h/2 * k2)
        k4 = f(t[i] + h, y[i] + h * k3)
        y[i+1] = y[i] + (h/6) * (k1 + 2*k2 + 2*k3 + k4)
    return t, y

# Test problem: y' = -2y, y(0) = 1, exact: y = exp(-2t)
f = lambda t, y: -2 * y
exact = lambda t: np.exp(-2 * t)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

# Left: solutions with h = 0.5
h = 0.5
t_e, y_e = euler(f, 1.0, [0, 3], h)
t_r, y_r = rk4(f, 1.0, [0, 3], h)
t_ex = np.linspace(0, 3, 300)

ax1.plot(t_ex, exact(t_ex), 'k-', linewidth=2, label='exact')
ax1.plot(t_e, y_e, 'ro--', markersize=5, label=f'Euler h={h}')
ax1.plot(t_r, y_r, 'bs--', markersize=5, label=f'RK4 h={h}')
ax1.set_xlabel('t')
ax1.set_ylabel('y')
ax1.set_title('Solution Comparison')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Right: error vs step size (convergence)
step_sizes = [0.5, 0.25, 0.1, 0.05, 0.025, 0.01]
euler_errors = []
rk4_errors = []

for h in step_sizes:
    _, ye = euler(f, 1.0, [0, 3], h)
    _, yr = rk4(f, 1.0, [0, 3], h)
    euler_errors.append(abs(ye[-1] - exact(3.0)))
    rk4_errors.append(abs(yr[-1] - exact(3.0)))

ax2.loglog(step_sizes, euler_errors, 'ro-', label='Euler (order 1)')
ax2.loglog(step_sizes, rk4_errors, 'bs-', label='RK4 (order 4)')
ax2.loglog(step_sizes, [h**1 for h in step_sizes], 'r:', alpha=0.5, label='O(h)')
ax2.loglog(step_sizes, [h**4 for h in step_sizes], 'b:', alpha=0.5, label='O(h^4)')
ax2.set_xlabel('Step size h')
ax2.set_ylabel('|Error at t=3|')
ax2.set_title('Convergence Order')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("rk4_vs_euler.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import solve_ivp

# ── Hand-computed RK4 step verification ─────────────────
f = lambda t, y: -2 * y
h = 0.5
y0 = 1.0
t0 = 0.0

k1 = f(t0, y0)
k2 = f(t0 + h/2, y0 + h/2 * k1)
k3 = f(t0 + h/2, y0 + h/2 * k2)
k4 = f(t0 + h, y0 + h * k3)

y1 = y0 + (h/6) * (k1 + 2*k2 + 2*k3 + k4)
exact = np.exp(-2 * 0.5)

print(f"k1 = {k1}, k2 = {k2}, k3 = {k3}, k4 = {k4}")
print(f"RK4:  y(0.5) = {y1:.8f}")
print(f"Exact: y(0.5) = {exact:.8f}")
print(f"Error: {abs(y1 - exact):.2e}")

# ── Compare with scipy's RK45 ──────────────────────────
sol = solve_ivp(lambda t, y: -2*y, [0, 3], [1.0], method='RK45',
                dense_output=True)

t_eval = np.linspace(0, 3, 20)
y_scipy = sol.sol(t_eval)[0]
y_exact = np.exp(-2 * t_eval)

print(f"\nscipy RK45 max error: {np.max(np.abs(y_scipy - y_exact)):.2e}")
print(f"Number of function evaluations: {sol.nfev}")

# ── Order verification ──────────────────────────────────
print("\nOrder verification (error at t=3):")
prev_err = None
for h in [0.2, 0.1, 0.05, 0.025]:
    t = np.arange(0, 3 + h, h)
    y = np.zeros(len(t))
    y[0] = 1.0
    for i in range(len(t)-1):
        k1 = f(t[i], y[i])
        k2 = f(t[i]+h/2, y[i]+h/2*k1)
        k3 = f(t[i]+h/2, y[i]+h/2*k2)
        k4 = f(t[i]+h, y[i]+h*k3)
        y[i+1] = y[i] + (h/6)*(k1+2*k2+2*k3+k4)
    err = abs(y[-1] - np.exp(-6))
    ratio = prev_err / err if prev_err else 0
    print(f"  h={h:.3f}: error={err:.2e}, ratio={ratio:.1f}")
    prev_err = err
print("(Ratio should approach 16 = 2^4 for 4th-order method)")
```

## Connection to CS / Games / AI / Business / Industry

- **Game physics** — RK4 is the standard integrator for rigid body dynamics.
  Many engines (Bullet, PhysX) use RK4 or adaptive variants.
- **Orbital mechanics** — Space games and simulations use adaptive RK methods
  to handle the wide range of time scales in gravitational problems.
- **Neural ODE training** — Neural ODEs use adaptive solvers (RK45, Dormand-Prince)
  in the forward pass; adjoint methods handle the backward pass.
- **Climate/weather models** — Large-scale ODE systems from discretised PDEs
  use higher-order Runge-Kutta or multistep methods.
- **NASA JPL trajectory propagation** — DSN deep-space probes (Voyager, Juno,
  Europa Clipper) use Adams-Bashforth-Moulton multistep + Dormand-Prince
  embedded RK methods inside MONTE / GMAT for cm-precision orbit
  determination over 10-year missions.
- **Algorithmic-trading backtesting** — quant funds (Renaissance, Citadel)
  step SDEs with stochastic-Runge-Kutta integrators for nightly Monte Carlo
  PnL distributions; CFTC stress-test submissions for clearing members lean
  on these results.
- **Vehicle crash simulation at LSTC LS-DYNA** — explicit central-difference
  (RK-like) integrators run finite-element crash models for FMVSS 208 and
  Euro NCAP star-rating tests at every Toyota / Ford / Stellantis design
  iteration.
- **Pharmaceutical PBPK modeling** — Certara Simcyp and OpenCOR solve
  multi-compartment ODEs with adaptive RK45 to predict drug exposure across
  pediatric and pregnant populations; outputs ship in FDA NDA submissions.

## Check Your Understanding

1. Perform one step of the midpoint method (RK2) for $y' = y$, $y(0) = 1$,
   with $h = 0.1$. Compare with Euler and the exact answer $e^{0.1}$.

2. Why does the convergence plot show straight lines on a log-log scale?
   What is the slope for Euler and for RK4?

3. Implement adaptive step size: run RK4 with step $h$ and $h/2$ (two half
   steps). Use the difference to estimate error and accept/reject the step.
