# Automatic Differentiation — Forward Mode vs Reverse Mode

## Intuition

We covered this briefly in Tier 3.  Now we go deeper.  **Forward mode** AD
propagates derivatives alongside values (good for few inputs, many outputs).
**Reverse mode** AD computes all gradients in one backward pass (good for many
inputs, one output — exactly what neural networks need).  PyTorch and JAX are
essentially reverse-mode AD engines.

## Prerequisites

- Tier 3, Lesson 10: Numerical vs Symbolic vs Automatic Differentiation
- Tier 6, Lesson 4: Backpropagation

## From First Principles

### The computation graph

Every function is a sequence of elementary operations (+, ×, sin, exp, ...).
AD records these as a **directed acyclic graph (DAG)** where each node is an
intermediate variable.

### Forward mode (dual numbers)

Track $(value, derivative)$ pairs — called **dual numbers**:

$\overline{a} = (a, \dot{a})$ where $\dot{a} = \frac{\partial a}{\partial x}$

Rules:
- $(a, \dot{a}) + (b, \dot{b}) = (a+b, \dot{a}+\dot{b})$
- $(a, \dot{a}) \times (b, \dot{b}) = (ab, a\dot{b} + b\dot{a})$
- $\sin(a, \dot{a}) = (\sin a, \dot{a}\cos a)$
- $\exp(a, \dot{a}) = (e^a, \dot{a}e^a)$

### Pen & paper: Forward mode for $f(x) = x^2 e^x$ at $x = 2$

| Step | Value | $\dot{}$ (derivative) |
|------|-------|----------------------|
| $v_0 = x = 2$ | $2$ | $1$ |
| $v_1 = v_0^2 = 4$ | $4$ | $2 \times 2 \times 1 = 4$ |
| $v_2 = e^{v_0} = e^2$ | $7.389$ | $7.389 \times 1 = 7.389$ |
| $v_3 = v_1 \times v_2$ | $29.556$ | $4 \times 7.389 + 4 \times 7.389 = 59.112$ |

Product rule: $\dot{v}_3 = \dot{v}_1 v_2 + v_1 \dot{v}_2 = 4(7.389) + 4(7.389) = 29.556 + 29.556 = 59.112$.

Exact: $f'(x) = 2xe^x + x^2e^x = e^x(2x + x^2)$.  At $x=2$: $e^2(4+4) = 8e^2 = 59.112$ ✓

### Reverse mode

**Forward pass:** compute all values, store intermediate results.

**Backward pass:** For each variable $v_i$, compute $\bar{v}_i = \frac{\partial f}{\partial v_i}$ (called the **adjoint** — "how much does the final output change if $v_i$ changes?").  Propagate from output back to inputs.

Start: $\bar{v}_{\text{output}} = 1$ (the output changes by 1 when it changes by 1).

Rules (these come from the chain rule applied to each operation):
- **Addition:** If $v_3 = v_1 + v_2$: $\bar{v}_1 += \bar{v}_3$, $\bar{v}_2 += \bar{v}_3$ (both inputs contribute equally)
- **Multiplication:** If $v_3 = v_1 \times v_2$: $\bar{v}_1 += \bar{v}_3 \times v_2$, $\bar{v}_2 += \bar{v}_3 \times v_1$ (chain rule: $\frac{\partial}{\partial v_1}(v_1 v_2) = v_2$)

### Pen & paper: Reverse mode for same function

**Forward:** $v_0 = 2$, $v_1 = 4$, $v_2 = 7.389$, $v_3 = 29.556$.

**Backward:**
$\bar{v}_3 = 1$
$\bar{v}_1 = \bar{v}_3 \times v_2 = 7.389$
$\bar{v}_2 = \bar{v}_3 \times v_1 = 4$
$\bar{v}_0 = \bar{v}_1 \times 2v_0 + \bar{v}_2 \times e^{v_0} = 7.389 \times 4 + 4 \times 7.389 = 59.112$

Same answer! ✓

### When to use which

| | Forward mode | Reverse mode |
|-|-------------|-------------|
| Cost | $O(1)$ per input variable | $O(1)$ per output variable |
| Best for | few inputs, many outputs | many inputs, few outputs |
| Example | Jacobian column | Gradient of scalar loss |
| Neural networks | ✗ (millions of weights) | ✓ (one loss value) |

### Jacobian computation

- $n$ inputs, $m$ outputs
- Forward mode: $n$ passes (one per input) → full Jacobian
- Reverse mode: $m$ passes (one per output) → full Jacobian
- Neural network: $n$ = millions, $m$ = 1 → reverse mode wins overwhelmingly

## Python Verification

```python
# ── Automatic Differentiation ───────────────────────────────
import math

# Forward mode AD using dual numbers
class Dual:
    def __init__(self, val, deriv=0.0):
        self.val = val
        self.deriv = deriv
    
    def __add__(self, other):
        if isinstance(other, (int, float)):
            return Dual(self.val + other, self.deriv)
        return Dual(self.val + other.val, self.deriv + other.deriv)
    
    def __mul__(self, other):
        if isinstance(other, (int, float)):
            return Dual(self.val * other, self.deriv * other)
        return Dual(self.val * other.val, self.val * other.deriv + self.deriv * other.val)
    
    def __repr__(self):
        return f"Dual({self.val:.4f}, {self.deriv:.4f})"

def exp_dual(d):
    e = math.exp(d.val)
    return Dual(e, d.deriv * e)

def sin_dual(d):
    return Dual(math.sin(d.val), d.deriv * math.cos(d.val))

# f(x) = x² * e^x at x=2
print("=== Forward mode AD ===")
x = Dual(2.0, 1.0)  # value=2, dx/dx=1
x_sq = x * x
e_x = exp_dual(x)
result = x_sq * e_x
print(f"f(2) = {result.val:.4f}")
print(f"f'(2) = {result.deriv:.4f}")
print(f"Exact: {math.exp(2) * (4 + 4):.4f}")

# Reverse mode AD (simple tape-based)
print(f"\n=== Reverse mode AD ===")

class Var:
    tape = []
    
    def __init__(self, val):
        self.val = val
        self.grad = 0.0
        self.idx = len(Var.tape)
        Var.tape.append(self)
        self._backward = lambda: None
    
    def __mul__(self, other):
        result = Var(self.val * other.val)
        def _backward():
            self.grad += result.grad * other.val
            other.grad += result.grad * self.val
        result._backward = _backward
        return result
    
    def __add__(self, other):
        result = Var(self.val + other.val)
        def _backward():
            self.grad += result.grad
            other.grad += result.grad
        result._backward = _backward
        return result

def exp_var(v):
    result = Var(math.exp(v.val))
    e_val = result.val
    def _backward():
        v.grad += result.grad * e_val
    result._backward = _backward
    return result

Var.tape = []
x = Var(2.0)
x_sq = x * x
e_x = exp_var(x)
f = x_sq * e_x

# Backward pass
f.grad = 1.0
for v in reversed(Var.tape):
    v._backward()

print(f"f(2) = {f.val:.4f}")
print(f"f'(2) = {x.grad:.4f}")

# Comparison: forward vs reverse for different input/output ratios
print(f"\n=== Cost comparison ===")
for n_in, n_out, name in [(1000000, 1, "Neural net"), (3, 1000, "Sensor sim"), (100, 100, "Jacobian")]:
    fwd_cost = n_in
    rev_cost = n_out
    better = "Reverse" if rev_cost < fwd_cost else "Forward" if fwd_cost < rev_cost else "Tie"
    print(f"  {name}: {n_in} inputs, {n_out} outputs → {better} mode ({min(fwd_cost, rev_cost)} passes)")
```

## Visualisation — Reverse-mode is exponentially better for many-in / few-out

The plot makes the key autodiff trade-off undeniable: **reverse mode**
costs $\propto$ the number of *outputs*, **forward mode** costs
$\propto$ the number of *inputs*. For neural networks (millions of
inputs, one scalar loss output), reverse mode wins by a factor of
millions.

```python
# ── Visualising the forward vs reverse autodiff cost picture ──
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# (1) Cost-vs-#inputs for fixed #outputs = 1 (the neural-net regime).
ax = axes[0]
ns_in = np.logspace(0, 7, 50)
forward_cost = ns_in                       # one forward pass per input
reverse_cost = np.ones_like(ns_in)         # one reverse pass total
ax.loglog(ns_in, forward_cost, "o-", color="tab:red",
          lw=2, label="Forward mode (one pass per input)")
ax.loglog(ns_in, reverse_cost, "s-", color="tab:green",
          lw=2, label="Reverse mode (one pass total)")
# Mark realistic ML scales.
for n_p, name in [(1e6, "ResNet-50"), (1e8, "BERT-base"),
                  (1e10, "GPT-3 layer"), (1e12, "GPT-4 (rumoured)")]:
    ax.axvline(n_p, color="grey", linestyle=":", alpha=0.5)
    ax.text(n_p * 1.05, 5e6, name, fontsize=8, rotation=90, va="top",
            color="black")
ax.set_xlabel("number of inputs (parameters)")
ax.set_ylabel("number of evaluation passes (log)")
ax.set_title("Single scalar loss output:\nreverse mode is the only viable choice for neural nets")
ax.legend(fontsize=9); ax.grid(True, which="both", alpha=0.3)

# (2) Forward beats reverse when there are many outputs but few inputs.
ax = axes[1]
ns_out = np.logspace(0, 7, 50)
forward_cost2 = np.ones_like(ns_out)                    # cost = #inputs (we use 3)
forward_cost2 *= 3
reverse_cost2 = ns_out                                  # cost = #outputs
ax.loglog(ns_out, forward_cost2, "o-", color="tab:red",
          lw=2, label="Forward mode (3 inputs)")
ax.loglog(ns_out, reverse_cost2, "s-", color="tab:green",
          lw=2, label="Reverse mode (one pass per output)")
ax.set_xlabel("number of outputs")
ax.set_ylabel("number of evaluation passes (log)")
ax.set_title("Few inputs, many outputs:\nforward mode wins (fluid simulators, sensor calibration)")
ax.legend(fontsize=9); ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# Print the cost table for several real configurations.
print(f"{'Use case':<35}  {'#inputs':>10}  {'#outputs':>10}  {'better mode':>14}")
print("-" * 75)
for case, n_in, n_out in [
    ("ResNet-50 trained with SGD",        25_000_000, 1),
    ("Llama 7B fine-tuning step",        7_000_000_000, 1),
    ("Robot inverse kinematics",         7,        100),
    ("Square Jacobian (e.g. ODE solve)", 100,      100),
]:
    if n_in <= n_out:
        better = f"forward ({n_in}× cheaper)"
    else:
        better = f"reverse ({n_out}× cheaper)"
    print(f"  {case:<35}  {n_in:>10,}  {n_out:>10,}  {better}")
```

**The two-line summary that drives every modern ML framework:**

- **Forward mode** = one extra pass per *input* you want a derivative
  for. Good when you have few inputs and many outputs (e.g.
  fluid-dynamics sensitivities to a couple of parameters).
- **Reverse mode** = one extra pass per *output* (the "backward
  pass"). Good when you have many inputs and few outputs — exactly
  the setup of training a neural network: millions of weights → one
  scalar loss. PyTorch's `loss.backward()` is reverse mode through a
  computation graph; JAX has both via `jax.grad` (reverse) and
  `jax.jvp` (forward).

## Connection to CS / Games / AI / Business / Industry

- **AI / ML.** **Every deep-learning framework — PyTorch, TensorFlow,
  JAX, MLX, MindSpore — IS an autodiff system.** Without it, training a
  Transformer would mean hand-writing thousands of lines of gradient
  code per architecture. The "loss.backward()" call you've seen is
  reverse-mode autodiff, exactly as derived above.
- **Engineering / Science.** **Adjoint methods** — reverse-mode autodiff
  applied to PDE solvers — are how SpaceX optimises rocket trajectories
  and how climate scientists fit CO₂ sensitivity from satellite data.
  Robotics motion planning (Boston Dynamics, drone swarms) gets its
  gradients from autodiff through simulators.
- **Business / Finance.** **Greeks** — sensitivities of derivative
  prices to spot, volatility, and rates ($\Delta$, $\Gamma$, $\nu$) —
  are computed by autodiff in modern quant systems at every major bank.
  Algorithmic-trading strategies tune hyperparameters via gradient
  ascent through backtests.
- **Games / Graphics.** **Differentiable rendering** (NeRF, 3D Gaussian
  Splatting, Mitsuba 3) lets you fit 3D scene geometry to 2D photos by
  back-propagating pixel error through the renderer. The same machinery
  powers real-time facial-rig optimisation in films and AAA cutscenes.
- **CS / Software.** Autodiff is creeping into **probabilistic
  programming languages** (Pyro, Turing.jl) and even **database query
  optimisation** (where gradients of query-plan cost let learned
  optimisers tune themselves).
- **Aerodynamic shape optimization at Airbus and Rolls-Royce** — adjoint-mode autodiff through CFD solvers (SU2, ADflow) computes pressure-coefficient gradients with respect to thousands of wing-shape parameters, cutting fuel burn on the A350 by measurable percentages.
- **Pricing exotic derivatives at Goldman Sachs and Morgan Stanley** — Greeks for path-dependent options (Asian, barrier, autocallables) are computed via reverse-mode autodiff through Monte Carlo pricers, a 100×+ speedup over bumping each parameter by hand.
- **Tesla autopilot training infrastructure (Dojo)** — every neural-network weight gradient on the multi-exaflop Dojo supercomputer is reverse-mode autodiff applied to the per-batch loss across the FSD vision stack.
- **Climate model sensitivity studies (NOAA MOM6, MITgcm adjoint)** — oceanographers use TAF-generated adjoint code to attribute sea-level rise predictions back to specific atmospheric forcings, informing IPCC reports.

## Check Your Understanding

1. **Pen & paper:** Use forward mode (dual numbers) to compute $f'(3)$ for $f(x) = \sin(x^2)$.
2. **Pen & paper:** Use reverse mode to compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ for $f(x, y) = xy + y^2$ at $(2, 3)$.
3. **Think about it:** PyTorch uses reverse mode.  JAX supports both.  When would you want forward mode in JAX?
