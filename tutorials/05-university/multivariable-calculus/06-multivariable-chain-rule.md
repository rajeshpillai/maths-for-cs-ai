# Multivariable Chain Rule

## Intuition
The chain rule tells you how to differentiate a composition of functions. In
multiple dimensions, a single output can depend on intermediate variables that
each depend on further inputs — like a neural network where the loss depends on
the output layer, which depends on hidden layers, which depend on the input.
The multivariable chain rule is the mathematical backbone of **backpropagation**:
it tells you how to trace the influence of each input through a web of
dependencies.

## Prerequisites
- Tier 3, Lesson 4 — Chain rule (single-variable)
- Tier 12, Lesson 4 — Partial derivatives

## From First Principles

### Case 1: Single Parameter

Suppose $z = f(x, y)$ where $x = x(t)$ and $y = y(t)$. Then $z$ is ultimately
a function of $t$ alone. How fast does $z$ change with $t$?

$$\frac{dz}{dt} = \frac{\partial f}{\partial x}\frac{dx}{dt} + \frac{\partial f}{\partial y}\frac{dy}{dt}$$

**Derivation.** A small change $\Delta t$ causes changes $\Delta x \approx x'(t)\Delta t$
and $\Delta y \approx y'(t)\Delta t$. By the tangent plane approximation:

$$\Delta z \approx f_x \Delta x + f_y \Delta y = f_x \cdot x'(t)\Delta t + f_y \cdot y'(t)\Delta t$$

Divide by $\Delta t$:

$$\frac{\Delta z}{\Delta t} \approx f_x \cdot x'(t) + f_y \cdot y'(t)$$

Take $\Delta t \to 0$ to get the exact derivative.

### Pen & Paper Example: Case 1

Let $z = x^2 y$, where $x = \cos t$ and $y = e^t$. Find $dz/dt$ at $t = 0$.

**Step 1.** Partial derivatives of $z$:

$$\frac{\partial z}{\partial x} = 2xy, \quad \frac{\partial z}{\partial y} = x^2$$

**Step 2.** Derivatives of $x$ and $y$:

$$\frac{dx}{dt} = -\sin t, \quad \frac{dy}{dt} = e^t$$

**Step 3.** Apply the chain rule:

$$\frac{dz}{dt} = 2xy(-\sin t) + x^2(e^t)$$

**Step 4.** Evaluate at $t = 0$: $x(0) = 1$, $y(0) = 1$.

$$\frac{dz}{dt}\bigg|_{t=0} = 2(1)(1)(-\sin 0) + (1)^2(e^0) = 0 + 1 = 1$$

**Verification by direct substitution:** $z(t) = \cos^2(t) \cdot e^t$, so
$z'(t) = -2\cos t \sin t \cdot e^t + \cos^2 t \cdot e^t$. At $t=0$: $0 + 1 = 1$. Matches.

### Case 2: Two Parameters

If $z = f(x, y)$ where $x = x(s, t)$ and $y = y(s, t)$:

$$\frac{\partial z}{\partial s} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial s} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial s}$$

$$\frac{\partial z}{\partial t} = \frac{\partial f}{\partial x}\frac{\partial x}{\partial t} + \frac{\partial f}{\partial y}\frac{\partial y}{\partial t}$$

### Tree Diagrams

A **dependency tree** makes the chain rule mechanical. Draw the variable at the
top and draw arrows to what it depends on.

```
     z
    / \
   x   y       z depends on x and y
  / \ / \
 s  t s  t     x and y each depend on s and t
```

To find $\partial z / \partial s$: trace **all paths** from $z$ to $s$, multiply
the derivatives along each path, and **add** them up:

$$\frac{\partial z}{\partial s} = \underbrace{\frac{\partial z}{\partial x}\frac{\partial x}{\partial s}}_{\text{path } z \to x \to s} + \underbrace{\frac{\partial z}{\partial y}\frac{\partial y}{\partial s}}_{\text{path } z \to y \to s}$$

### Pen & Paper Example: Case 2

Let $z = x^2 + xy$, where $x = s + 2t$ and $y = st$.

Find $\partial z / \partial s$.

**Step 1.** Partial derivatives of $z$: $z_x = 2x + y$, $z_y = x$.

**Step 2.** Partial derivatives of $x$ and $y$ w.r.t. $s$: $x_s = 1$, $y_s = t$.

**Step 3.** Chain rule:

$$\frac{\partial z}{\partial s} = (2x + y)(1) + (x)(t) = 2x + y + xt$$

**Step 4.** Substitute back: $x = s + 2t$, $y = st$.

$$= 2(s + 2t) + st + (s + 2t)t = 2s + 4t + st + st + 2t^2 = 2s + 4t + 2st + 2t^2$$

### The General Chain Rule

For $w = f(x_1, x_2, \ldots, x_n)$ where each $x_i = x_i(t_1, t_2, \ldots, t_m)$:

$$\frac{\partial w}{\partial t_j} = \sum_{i=1}^{n} \frac{\partial f}{\partial x_i} \frac{\partial x_i}{\partial t_j}$$

In matrix form, this is just multiplication of Jacobian matrices.

### Visualisation
```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

fig, ax = plt.subplots(figsize=(7, 5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 8)
ax.set_aspect('equal')
ax.axis('off')

# Draw the dependency tree for z = f(x, y), x = x(s,t), y = y(s,t)
nodes = {
    'z': (5, 7), 'x': (3, 4.5), 'y': (7, 4.5),
    's1': (2, 2), 't1': (4, 2), 's2': (6, 2), 't2': (8, 2)
}
labels = {
    'z': 'z = f(x,y)', 'x': 'x(s,t)', 'y': 'y(s,t)',
    's1': 's', 't1': 't', 's2': 's', 't2': 't'
}

for key, (cx, cy) in nodes.items():
    circle = plt.Circle((cx, cy), 0.5, fill=True, facecolor='lightblue',
                        edgecolor='black', linewidth=1.5)
    ax.add_patch(circle)
    ax.text(cx, cy, labels[key], ha='center', va='center', fontsize=8,
            fontweight='bold')

# Edges with derivative labels
edges = [
    ('z', 'x', '∂z/∂x'), ('z', 'y', '∂z/∂y'),
    ('x', 's1', '∂x/∂s'), ('x', 't1', '∂x/∂t'),
    ('y', 's2', '∂y/∂s'), ('y', 't2', '∂y/∂t'),
]

for start, end, label in edges:
    sx, sy = nodes[start]
    ex, ey = nodes[end]
    ax.annotate('', xy=(ex, ey+0.5), xytext=(sx, sy-0.5),
                arrowprops=dict(arrowstyle='->', lw=1.5, color='darkblue'))
    mx, my = (sx+ex)/2, (sy+ey)/2
    ax.text(mx - 0.3, my + 0.2, label, fontsize=7, color='red', style='italic')

# Path highlight for dz/ds
ax.text(5, 0.5,
    '∂z/∂s = (∂z/∂x)(∂x/∂s) + (∂z/∂y)(∂y/∂s)\n'
    'Sum over ALL paths from z down to s',
    ha='center', fontsize=9, bbox=dict(boxstyle='round', facecolor='lightyellow'))

ax.set_title('Dependency Tree for the Multivariable Chain Rule', fontsize=12)
plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
import sympy as sp

# === Case 1: z = x^2 * y, x = cos(t), y = e^t ===
t = sp.Symbol('t')
x_t = sp.cos(t)
y_t = sp.exp(t)
z_t = x_t**2 * y_t

# Method 1: chain rule by hand
x_sym, y_sym = sp.symbols('x y')
z_sym = x_sym**2 * y_sym
dz_dx = sp.diff(z_sym, x_sym)
dz_dy = sp.diff(z_sym, y_sym)
dx_dt = sp.diff(x_t, t)
dy_dt = sp.diff(y_t, t)

chain = dz_dx.subs(x_sym, x_t).subs(y_sym, y_t) * dx_dt + \
        dz_dy.subs(x_sym, x_t).subs(y_sym, y_t) * dy_dt

print("=== Case 1: z = x²y, x = cos(t), y = e^t ===")
print(f"Chain rule result: {sp.simplify(chain)}")
print(f"At t=0: {float(chain.subs(t, 0))}")

# Method 2: direct differentiation
dz_direct = sp.diff(z_t, t)
print(f"Direct d/dt:       {sp.simplify(dz_direct)}")
print(f"At t=0: {float(dz_direct.subs(t, 0))}")
print(f"Match: {sp.simplify(chain - dz_direct) == 0}")

# === Case 2: z = x^2 + xy, x = s + 2t, y = st ===
s, t2 = sp.symbols('s t')
x_st = s + 2*t2
y_st = s * t2
z_st = x_st**2 + x_st * y_st

dz_ds_chain = (2*x_st + y_st) * sp.diff(x_st, s) + x_st * sp.diff(y_st, s)
dz_ds_direct = sp.diff(z_st, s)

print(f"\n=== Case 2: z = x² + xy, x = s+2t, y = st ===")
print(f"Chain rule ∂z/∂s: {sp.expand(dz_ds_chain)}")
print(f"Direct ∂z/∂s:     {sp.expand(dz_ds_direct)}")
print(f"Match: {sp.expand(dz_ds_chain - dz_ds_direct) == 0}")
```

## Connection to CS / Games / AI / Business / Industry
- **Backpropagation**: the chain rule applied layer by layer through a neural
  network is exactly backprop — each layer's gradient is multiplied through the
  dependency tree
- **Automatic differentiation**: computational graph frameworks (PyTorch, JAX)
  build the dependency tree and apply the chain rule automatically
- **Shader derivatives**: GPU shaders compute `dFdx` and `dFdy` using the chain
  rule to get screen-space rates of change for texture filtering
- **Sensitivity analysis**: in simulations, the chain rule tells you how a final
  output changes when you tweak an input parameter deep in the pipeline
- **Control systems**: the chain rule propagates error signals through feedback
  loops in PID controllers and robotic systems
- **Climate model adjoint methods**: the UK Met Office Unified Model and ECMWF's
  IFS use the chain rule (adjoint code) to back-propagate forecast sensitivity
  through hours of atmospheric simulation — central to data assimilation
- **Financial portfolio risk attribution**: BlackRock Aladdin and MSCI Barra
  use the chain rule to decompose portfolio P&L sensitivity to underlying
  factors (rates, FX, equity) — answers "how much did each factor move my
  book today?"
- **Process-control loops at refineries**: Honeywell Experion and Emerson
  DeltaV propagate setpoint changes through chained subsystems (heater $\to$
  reactor $\to$ separator) using chain-rule sensitivities — the math behind
  ExxonMobil and Shell plant-wide model-predictive control
- **Electric-grid contingency analysis**: PJM Interconnection and ERCOT use the
  chain rule on the AC power-flow Jacobian to determine how a transmission-line
  trip cascades through node voltages — informs N-1 reliability standards

## Check Your Understanding
1. Let $w = \ln(x^2 + y^2)$, $x = e^t$, $y = e^{-t}$. Find $dw/dt$ using the
   chain rule. Evaluate at $t = 0$.
2. Draw the dependency tree for $w = f(x, y, z)$ where $x = s^2$, $y = st$,
   $z = t^2$. Write out $\partial w / \partial s$ and $\partial w / \partial t$.
3. In a two-layer neural network, $L = g(h(Wx + b))$ where $W$ is a matrix, $x$
   is input, $b$ is bias. Use the chain rule to write $\partial L / \partial W$
   in terms of the intermediate derivatives. (This is the essence of backprop.)
