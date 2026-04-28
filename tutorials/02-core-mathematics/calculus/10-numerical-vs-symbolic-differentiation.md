# Numerical vs Symbolic vs Automatic Differentiation

## Intuition

There are three fundamentally different ways to compute derivatives:
**symbolic** (manipulate formulas like you do on paper), **numerical**
(use the limit definition with small $h$), and **automatic** (track
operations and apply the chain rule exactly).  PyTorch and JAX use
automatic differentiation — it combines the best of both worlds.

## Prerequisites

- Tier 3, Lesson 2: Derivatives
- Tier 3, Lesson 4: Chain Rule

## From First Principles

### Method 1: Symbolic differentiation

Apply derivative rules to produce an exact formula.

Input: $f(x) = x^3 + 2x^2 - 5x + 3$
Output: $f'(x) = 3x^2 + 4x - 5$

**Pros:** Exact, gives a formula you can analyse.
**Cons:** Expression can explode in size ("expression swell").  Requires a
computer algebra system (SymPy, Mathematica).

### Method 2: Numerical differentiation

Use the limit definition with a small $h$:

**Forward difference:**
$$f'(x) \approx \frac{f(x + h) - f(x)}{h}$$

**Central difference** (more accurate):
$$f'(x) \approx \frac{f(x + h) - f(x - h)}{2h}$$

**Pen & paper:** $f(x) = x^3$ at $x = 2$, with $h = 0.01$:

Forward: $\frac{(2.01)^3 - 8}{0.01} = \frac{8.120601 - 8}{0.01} = 12.0601$

Central: $\frac{(2.01)^3 - (1.99)^3}{0.02} = \frac{8.120601 - 7.880599}{0.02} = 12.0001$

Exact: $3(4) = 12$.  Central difference is much more accurate!

**Pros:** Works for any function, even black boxes.
**Cons:** Rounding errors for very small $h$, truncation errors for larger $h$.
Slow for many parameters (need one function call per parameter).

### Method 3: Automatic differentiation

Track every arithmetic operation and apply the chain rule.

**Forward mode AD:** Compute $f$ and $f'$ simultaneously, propagating
derivatives forward through the computation.

**Reverse mode AD:** Compute $f$ forward, then propagate derivatives
backward (this IS backpropagation).

**Pen & paper: AD trace for $f(x) = x^2 \cdot \sin(x)$ at $x = 2$**

| Step | Value | Derivative (w.r.t. $x$) |
|------|-------|------------------------|
| $v_0 = x = 2$ | $2$ | $1$ |
| $v_1 = v_0^2$ | $4$ | $2v_0 = 4$ |
| $v_2 = \sin(v_0)$ | $0.909$ | $\cos(v_0) = -0.416$ |
| $v_3 = v_1 \cdot v_2$ | $3.637$ | $v_1' \cdot v_2 + v_1 \cdot v_2' = 4(0.909) + 4(-0.416) = 1.972$ |

Exact: $f'(x) = 2x\sin x + x^2\cos x = 4\sin 2 + 4\cos 2 \approx 1.972$ ✓

### Comparison

| Method | Exact? | Speed (n params) | Complexity |
|--------|--------|------------------|-----------|
| Symbolic | Yes | N/A | Expression swell |
| Numerical | Approx | $O(n)$ function calls | Simple but slow |
| Forward AD | Yes | $O(n)$ for $n$ inputs | One pass per input |
| Reverse AD | Yes | $O(m)$ for $m$ outputs | One backward pass for all inputs |

> **Why reverse mode wins for ML:** A neural network has millions of inputs
> (weights) but typically **one** output (loss).  Reverse mode computes all
> gradients in a single backward pass.

### The right $h$ for numerical differentiation

Too large: truncation error dominates.
Too small: rounding error dominates (floating-point noise).

Optimal $h \approx \sqrt{\epsilon_{\text{machine}}} \approx 10^{-8}$ for forward difference.

## Python Verification

```python
# ── Numerical vs Symbolic vs Automatic Differentiation ──────
import math

# Target: f(x) = x³ at x=2, f'(2) = 12 exactly

x = 2.0

print("=== Numerical differentiation ===")
for h in [0.1, 0.01, 0.001, 1e-6, 1e-8, 1e-12]:
    forward = ((x+h)**3 - x**3) / h
    central = ((x+h)**3 - (x-h)**3) / (2*h)
    print(f"h={h:.0e}: forward={forward:.10f}, central={central:.10f}")
print("Exact: 12.0")

# AD trace for f(x) = x² · sin(x) at x=2
print(f"\n=== AD trace for x²·sin(x) at x=2 ===")
x = 2.0

# Forward mode: track (value, derivative) pairs
v0 = (x, 1.0)  # x, dx/dx = 1
v1 = (v0[0]**2, 2*v0[0]*v0[1])  # x², d(x²)/dx = 2x
v2 = (math.sin(v0[0]), math.cos(v0[0])*v0[1])  # sin(x), cos(x)·1
v3_val = v1[0] * v2[0]
v3_der = v1[1] * v2[0] + v1[0] * v2[1]  # product rule

print(f"f(2) = {v3_val:.6f}")
print(f"f'(2) = {v3_der:.6f}")

# Verify
exact = 2*x*math.sin(x) + x**2*math.cos(x)
print(f"Exact: {exact:.6f}")

# Numerical verification
h = 1e-8
f = lambda x: x**2 * math.sin(x)
numerical = (f(x+h) - f(x-h)) / (2*h)
print(f"Numerical (central): {numerical:.6f}")

# Impact of h on accuracy
print(f"\n=== Optimal h for forward difference ===")
f = lambda x: math.exp(x)
x = 1.0
exact = math.exp(1.0)
for h_exp in range(-1, -17, -1):
    h = 10.0 ** h_exp
    approx = (f(x+h) - f(x)) / h
    error = abs(approx - exact)
    print(f"h=10^{h_exp:3d}: error = {error:.2e}" + (" ← best" if h_exp == -8 else ""))
```

## Visualisation — The U-shape of finite-difference error

Numerical differentiation by finite differences has *two* sources of
error pulling in opposite directions: making the step $h$ smaller
reduces the truncation error (math wants $h \to 0$), but eventually
floating-point round-off blows up (computer science wants $h$ not
*too* small). The result is a famous **U-shaped error curve**.

```python
# ── Visualising forward vs central differences vs round-off ─
import numpy as np
import matplotlib.pyplot as plt

f       = np.exp                  # f(x) = e^x
fprime  = np.exp                  # f'(x) = e^x  ⇒ true derivative at x = 1 is e
x       = 1.0
exact   = fprime(x)               # = e

# Sweep h from 10⁻¹ down to 10⁻¹⁶ on a log grid.
hs = np.logspace(-1, -16, 80)
err_forward = []                  # 1st-order: O(h) truncation
err_central = []                  # 2nd-order: O(h²) truncation, much faster convergence
for h in hs:
    fwd = (f(x + h) - f(x)) / h
    ctr = (f(x + h) - f(x - h)) / (2 * h)
    err_forward.append(abs(fwd - exact))
    err_central.append(abs(ctr - exact))

fig, ax = plt.subplots(1, 1, figsize=(10, 6))

ax.loglog(hs, err_forward, "o-", color="tab:red", lw=2,
          label="forward difference  (f(x+h)−f(x))/h   — O(h) truncation")
ax.loglog(hs, err_central, "o-", color="tab:blue", lw=2,
          label="central difference  (f(x+h)−f(x−h))/(2h) — O(h²) truncation")

# Reference slopes to identify the regimes.
ax.loglog(hs, hs,                  color="tab:red",  linestyle="--", lw=1, alpha=0.5,
          label="$\\propto h$  (forward truncation)")
ax.loglog(hs, hs ** 2,             color="tab:blue", linestyle="--", lw=1, alpha=0.5,
          label="$\\propto h^2$  (central truncation)")
ax.loglog(hs, 1e-16 / hs,          color="grey",     linestyle="--", lw=1, alpha=0.6,
          label="$\\propto 1/h$  (round-off)")

# Mark the empirical sweet spots.
i_fwd = int(np.argmin(err_forward))
i_ctr = int(np.argmin(err_central))
ax.scatter([hs[i_fwd]], [err_forward[i_fwd]], color="tab:red",  s=160, zorder=5,
           label=f"forward best: h ≈ {hs[i_fwd]:.0e}")
ax.scatter([hs[i_ctr]], [err_central[i_ctr]], color="tab:blue", s=160, zorder=5,
           label=f"central best: h ≈ {hs[i_ctr]:.0e}")

ax.set_xlabel("step size h (log)"); ax.set_ylabel("|approx − exact| (log)")
ax.set_title("Finite-difference error vs h\n"
             "left side: round-off floor;  right side: truncation error")
ax.invert_xaxis()                 # so smaller h is on the right
ax.legend(loc="upper right", fontsize=9)
ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the table of errors for forward vs central difference.
print(f"True derivative at x = 1 is e ≈ {exact:.12f}\n")
print(f"{'h':>10}   {'forward error':>15}   {'central error':>15}")
for h_exp in range(-1, -17, -2):
    h = 10.0 ** h_exp
    f_err = abs((f(x + h) - f(x)) / h          - exact)
    c_err = abs((f(x + h) - f(x - h)) / (2*h)  - exact)
    print(f"  10^{h_exp:>4}   {f_err:>15.2e}   {c_err:>15.2e}")
```

**The single most important practical takeaway:**

- **Don't make $h$ "as small as possible".** Beginners often think
  $h = 10^{-15}$ should give them 15 digits of accuracy. The plot
  shows the opposite: round-off completely *dominates* below
  $h \approx 10^{-8}$ for forward differences, and below
  $h \approx 10^{-5}$ for central differences. The optimum is
  somewhere in the middle.
- **Central differences win whenever you can afford two function
  evaluations.** They have $O(h^2)$ truncation versus $O(h)$ for
  forward, so they hit a much lower minimum error at a *larger*
  $h$ — twice as much arithmetic for many extra digits of accuracy.
- **This is exactly why the world moved on to automatic
  differentiation.** Autodiff (PyTorch, JAX) computes derivatives
  *exactly* — no $h$, no round-off, no sweet spot to tune. Use
  finite differences only for **gradient checking** of an autodiff
  implementation, never as the production gradient itself.

## Connection to CS / Games / AI

- **PyTorch autograd** — reverse-mode AD; builds a computation graph and runs backward pass
- **JAX** — uses forward and reverse mode AD, with JIT compilation
- **Gradient checking** — use numerical differentiation to verify your analytical/AD gradients (common debugging technique)
- **SymPy** — Python library for symbolic differentiation
- **Finite elements** — numerical methods for PDEs use numerical differentiation

## Check Your Understanding

1. **Pen & paper:** Compute $f'(3)$ for $f(x) = x^2 + 1$ using forward difference with $h = 0.1$. Compare to the exact answer.
2. **Pen & paper:** Why is the central difference more accurate than forward difference?  (Hint: Taylor-expand $f(x+h)$ and $f(x-h)$ and subtract.)
3. **Pen & paper:** Trace the forward-mode AD computation for $f(x) = e^{x^2}$ at $x = 1$.
4. **Think about it:** A neural network has 10 million weights and 1 loss value.  Why is reverse-mode AD vastly more efficient than forward-mode?
