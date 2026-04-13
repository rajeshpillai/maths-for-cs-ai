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

Wait: $v_3 = v_1 v_2$, so $\dot{v}_3 = \dot{v}_1 v_2 + v_1 \dot{v}_2 = 4(7.389) + 4(7.389) = 59.112$.

Exact: $f'(x) = 2xe^x + x^2e^x = e^x(2x + x^2)$.  At $x=2$: $e^2(4+4) = 8e^2 = 59.112$ ✓

### Reverse mode (adjoint method)

**Forward pass:** compute all values, store intermediate results.

**Backward pass:** propagate $\bar{v}_i = \frac{\partial f}{\partial v_i}$ from output to inputs.

Start: $\bar{v}_{\text{output}} = 1$.

Rules (backward):
- If $v_3 = v_1 + v_2$: $\bar{v}_1 += \bar{v}_3$, $\bar{v}_2 += \bar{v}_3$
- If $v_3 = v_1 \times v_2$: $\bar{v}_1 += \bar{v}_3 \times v_2$, $\bar{v}_2 += \bar{v}_3 \times v_1$

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

## Check Your Understanding

1. **Pen & paper:** Use forward mode (dual numbers) to compute $f'(3)$ for $f(x) = \sin(x^2)$.
2. **Pen & paper:** Use reverse mode to compute $\frac{\partial f}{\partial x}$ and $\frac{\partial f}{\partial y}$ for $f(x, y) = xy + y^2$ at $(2, 3)$.
3. **Think about it:** PyTorch uses reverse mode.  JAX supports both.  When would you want forward mode in JAX?
