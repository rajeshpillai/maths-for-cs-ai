# Stiff Systems and Implicit Methods

## Intuition

Imagine simulating a chemical reaction where one substance decays in
microseconds and another in hours. If you use Euler or RK4, the fast decay
forces you to take microsecond-sized steps for the **entire** simulation — even
during the hours when only the slow component changes. This is **stiffness**:
the system has widely separated time scales, and explicit methods must use
absurdly small steps to remain stable. Implicit methods sidestep this by solving
an equation at each step, allowing large step sizes even for stiff problems.

## Prerequisites

- Tier 11, Lesson 22: Numerical Methods for ODEs (Euler, RK4)
- Tier 2, Lesson 6: Matrix Inverse (needed for implicit systems)

## From First Principles

### What Makes a System Stiff?

Consider the system:

$$y_1' = -1000\,y_1 + y_2, \qquad y_2' = y_1 - y_2$$

The eigenvalues of the coefficient matrix are approximately $-1000$ and $-1$.
The fast mode ($\lambda \approx -1000$) decays in $\sim 0.001$ time units, but
we may want to simulate for $t = 10$.

**Explicit Euler stability** requires $|1 + h\lambda| < 1$ for all eigenvalues.
For $\lambda = -1000$: $h < 2/1000 = 0.002$. That means $10/0.002 = 5000$
steps minimum, even though the fast mode dies out almost instantly.

### Explicit vs Implicit Euler

**Explicit Euler:** $y_{n+1} = y_n + h\,f(t_n, y_n)$

**Implicit (Backward) Euler:** $y_{n+1} = y_n + h\,f(t_{n+1}, y_{n+1})$

The unknown $y_{n+1}$ appears on both sides. For a linear system $y' = Ay$:

$$y_{n+1} = y_n + hA\,y_{n+1}$$
$$(I - hA)\,y_{n+1} = y_n$$
$$y_{n+1} = (I - hA)^{-1}\,y_n$$

### Stability of Implicit Euler

The amplification factor is $1/(1 - h\lambda)$. For $\lambda < 0$:

$$\left|\frac{1}{1 - h\lambda}\right| = \frac{1}{1 + h|\lambda|} < 1 \quad\text{for all}\; h > 0$$

Implicit Euler is **unconditionally stable** for all step sizes! The fast modes
get damped regardless of $h$.

### Pen & Paper: Implicit Euler for $y' = -1000y$

With $h = 1$ (absurdly large for explicit methods):

$$y_{n+1} = y_n + h(-1000\,y_{n+1}) = y_n - 1000\,y_{n+1}$$
$$1001\,y_{n+1} = y_n$$
$$y_{n+1} = \frac{y_n}{1001} \approx 0.001\,y_n$$

Explicit Euler: $y_{n+1} = y_n + 1 \cdot (-1000)\,y_n = -999\,y_n$. Blows up!

### Backward Differentiation Formulas (BDF)

BDF methods are the workhorse for stiff systems. BDF-1 is implicit Euler.
BDF-2:

$$y_{n+1} = \frac{4}{3}y_n - \frac{1}{3}y_{n-1} + \frac{2h}{3}f(t_{n+1}, y_{n+1})$$

Higher-order BDF methods (up to BDF-6) are available in `scipy.integrate.solve_ivp`
via `method='BDF'`.

### Visualisation

Show explicit Euler blowing up while implicit Euler stays stable.

```python
import numpy as np
import matplotlib.pyplot as plt

lam = -50   # eigenvalue (moderately stiff for visible demo)
y0 = 1.0
t_end = 1.0

# Exact solution
t_exact = np.linspace(0, t_end, 500)
y_exact = y0 * np.exp(lam * t_exact)

# Step size chosen to be UNSTABLE for explicit Euler
# Stability requires h < 2/|lambda| = 0.04
h = 0.05  # just above stability limit

# Explicit Euler
t_exp = np.arange(0, t_end + h, h)
y_exp = np.zeros(len(t_exp))
y_exp[0] = y0
for i in range(len(t_exp) - 1):
    y_exp[i+1] = y_exp[i] + h * lam * y_exp[i]

# Implicit Euler
t_imp = np.arange(0, t_end + h, h)
y_imp = np.zeros(len(t_imp))
y_imp[0] = y0
for i in range(len(t_imp) - 1):
    y_imp[i+1] = y_imp[i] / (1 - h * lam)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(13, 5))

ax1.plot(t_exact, y_exact, 'k-', linewidth=2, label='exact')
ax1.plot(t_exp, y_exp, 'ro-', markersize=4, label=f'explicit Euler h={h}')
ax1.set_xlabel('t')
ax1.set_ylabel('y')
ax1.set_title('Explicit Euler: UNSTABLE')
ax1.legend()
ax1.grid(True, alpha=0.3)
ax1.set_ylim(-2, 2)

ax2.plot(t_exact, y_exact, 'k-', linewidth=2, label='exact')
ax2.plot(t_imp, y_imp, 'bs-', markersize=4, label=f'implicit Euler h={h}')
ax2.set_xlabel('t')
ax2.set_ylabel('y')
ax2.set_title('Implicit Euler: STABLE')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig("stiff_explicit_vs_implicit.png", dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np
from scipy.integrate import solve_ivp

# ── Stiff system: two coupled equations ─────────────────
def stiff_system(t, y):
    return [-1000*y[0] + y[1], y[0] - y[1]]

y0 = [1.0, 0.0]
t_span = [0, 0.1]

# Solve with explicit RK45 (will need many tiny steps)
sol_rk45 = solve_ivp(stiff_system, t_span, y0, method='RK45',
                      rtol=1e-8, atol=1e-10)
print(f"RK45: {sol_rk45.nfev} function evaluations, {len(sol_rk45.t)} steps")

# Solve with BDF (implicit, designed for stiff problems)
sol_bdf = solve_ivp(stiff_system, t_span, y0, method='BDF',
                     rtol=1e-8, atol=1e-10)
print(f"BDF:  {sol_bdf.nfev} function evaluations, {len(sol_bdf.t)} steps")

# Compare solutions at the endpoint
print(f"\nRK45  y(0.1) = [{sol_rk45.y[0,-1]:.10f}, {sol_rk45.y[1,-1]:.10f}]")
print(f"BDF   y(0.1) = [{sol_bdf.y[0,-1]:.10f}, {sol_bdf.y[1,-1]:.10f}]")

# ── Stiffness ratio ────────────────────────────────────
A = np.array([[-1000, 1], [1, -1]])
eigenvalues = np.linalg.eigvals(A)
print(f"\nEigenvalues: {eigenvalues}")
print(f"Stiffness ratio: {max(abs(eigenvalues)) / min(abs(eigenvalues)):.0f}")

# ── Implicit Euler by hand for the scalar case ─────────
lam = -1000
y = 1.0
h = 0.01  # would be unstable for explicit Euler (needs h < 0.002)
exact_at_01 = np.exp(lam * 0.1)

for step in range(10):
    y = y / (1 - h * lam)

print(f"\nImplicit Euler (h=0.01, 10 steps): y(0.1) = {y:.10e}")
print(f"Exact: y(0.1) = {exact_at_01:.10e}")
```

## Connection to CS / Games / AI

- **Chemical kinetics** — Reaction networks in pharmaceutical and materials
  simulation are notoriously stiff; BDF solvers are the standard tool.
- **Circuit simulation** — SPICE uses implicit methods because RC circuits
  have stiff time constants spanning nanoseconds to seconds.
- **Game cloth/hair** — Cloth simulation with stiff springs benefits from
  implicit integration; explicit methods produce jittering or instability.
- **Neural ODEs** — Stiff dynamics in latent neural ODEs require adaptive
  implicit solvers; `torchdiffeq` offers both explicit and implicit options.

## Check Your Understanding

1. For $y' = -100y$, compute the stability limit for explicit Euler. Then
   perform 3 steps of implicit Euler with $h = 0.1$ and compare to exact.

2. Write the implicit Euler update for the 2x2 system $\mathbf{y}' = A\mathbf{y}$
   and show that it requires solving a linear system $(I - hA)\mathbf{y}_{n+1} = \mathbf{y}_n$.

3. The **stiffness ratio** is $|\lambda_{\max}| / |\lambda_{\min}|$. Compute
   it for $A = [[-500, 1],[0, -1]]$. Why does a large ratio cause trouble?
