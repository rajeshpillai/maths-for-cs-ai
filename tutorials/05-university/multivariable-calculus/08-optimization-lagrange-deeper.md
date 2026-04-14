# Multivariable Optimization and Lagrange Multipliers — Deeper

## Intuition
Finding the minimum or maximum of a function of several variables is the heart of
machine learning — every trained model is the result of an optimisation problem.
The second derivative test (via the Hessian) tells you whether a critical point
is a valley (min), hilltop (max), or mountain pass (saddle). Lagrange multipliers
solve the harder problem: optimise a function subject to constraints, like
finding the best model that also satisfies a budget on complexity.

## Prerequisites
- Tier 5, Lesson 6 — Lagrange multipliers (introduction)
- Tier 12, Lesson 7 — Gradient and directional derivatives

## From First Principles

### Critical Points

A **critical point** of $f(x, y)$ is where the gradient vanishes:

$$\nabla f = \mathbf{0} \implies f_x = 0 \text{ and } f_y = 0$$

But not every critical point is a minimum. We need the **second derivative test**.

### The Hessian Matrix

The **Hessian** is the matrix of all second partial derivatives:

$$H = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy} \end{pmatrix}$$

By Clairaut's theorem, $f_{xy} = f_{yx}$, so $H$ is symmetric.

### Second Derivative Test

At a critical point $(a, b)$ where $\nabla f = \mathbf{0}$, compute:

$$D = f_{xx} f_{yy} - (f_{xy})^2 = \det(H)$$

- If $D > 0$ and $f_{xx} > 0$: **local minimum**
- If $D > 0$ and $f_{xx} < 0$: **local maximum**
- If $D < 0$: **saddle point**
- If $D = 0$: **inconclusive** (need higher-order analysis)

**Why this works.** $D > 0$ means both eigenvalues of $H$ have the same sign.
If $f_{xx} > 0$, both are positive (bowl-shaped). If $f_{xx} < 0$, both are
negative (dome-shaped). $D < 0$ means eigenvalues have opposite signs (saddle).

### Pen & Paper Example: Classification

Classify all critical points of $f(x, y) = x^3 - 3xy + y^3$.

**Step 1.** Find critical points. Set $\nabla f = \mathbf{0}$:

$$f_x = 3x^2 - 3y = 0 \implies y = x^2$$

$$f_y = -3x + 3y^2 = 0 \implies x = y^2$$

Substitute $y = x^2$ into $x = y^2$: $x = (x^2)^2 = x^4$, so $x^4 - x = 0$,
$x(x^3 - 1) = 0$. Thus $x = 0$ or $x = 1$.

Critical points: $(0, 0)$ and $(1, 1)$.

**Step 2.** Second partial derivatives:

$$f_{xx} = 6x, \quad f_{yy} = 6y, \quad f_{xy} = -3$$

**Step 3.** Test each point.

At $(0, 0)$: $D = (0)(0) - (-3)^2 = -9 < 0$. **Saddle point.**

At $(1, 1)$: $D = (6)(6) - (-3)^2 = 36 - 9 = 27 > 0$, and $f_{xx} = 6 > 0$. **Local minimum.**

$f(1, 1) = 1 - 3 + 1 = -1$.

### Lagrange Multipliers — Multiple Constraints

To optimise $f(\mathbf{x})$ subject to constraints $g_1(\mathbf{x}) = 0$ and
$g_2(\mathbf{x}) = 0$, solve:

$$\nabla f = \lambda_1 \nabla g_1 + \lambda_2 \nabla g_2$$

along with the constraint equations.

**Geometric meaning.** At the optimum, $\nabla f$ must be a linear combination
of the constraint normals — otherwise there would be a direction along the
constraint surface where $f$ could still increase.

### Pen & Paper Example: Lagrange with One Constraint

Minimise $f(x, y) = x^2 + y^2$ (distance from origin) subject to $g(x, y) = x + y - 4 = 0$.

**Step 1.** Set up the system $\nabla f = \lambda \nabla g$:

$$2x = \lambda \cdot 1 \implies \lambda = 2x$$

$$2y = \lambda \cdot 1 \implies \lambda = 2y$$

**Step 2.** From these: $2x = 2y$, so $x = y$.

**Step 3.** Apply constraint: $x + y = 4 \implies 2x = 4 \implies x = 2, y = 2$.

**Step 4.** The minimum of $x^2 + y^2$ on the line $x + y = 4$ is
$f(2, 2) = 8$, with $\lambda = 4$.

**Interpretation of $\lambda$.** If the constraint changes from $x + y = 4$ to
$x + y = 4 + \epsilon$, the optimal value changes by approximately $\lambda \cdot \epsilon = 4\epsilon$.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 6))

# Left: critical point classification for f(x,y) = x^3 - 3xy + y^3
ax1 = axes[0]
x = np.linspace(-1.5, 2, 200)
y = np.linspace(-1.5, 2, 200)
X, Y = np.meshgrid(x, y)
Z = X**3 - 3*X*Y + Y**3

cs = ax1.contour(X, Y, Z, levels=np.arange(-5, 10, 0.5), cmap='RdBu_r', alpha=0.7)
ax1.plot(0, 0, 'rs', markersize=12, label='Saddle (0,0)')
ax1.plot(1, 1, 'g^', markersize=12, label='Min (1,1), f=-1')
ax1.set_title('f(x,y) = x³ - 3xy + y³\nCritical points classified')
ax1.set_xlabel('x')
ax1.set_ylabel('y')
ax1.legend()
ax1.grid(True, alpha=0.3)

# Right: Lagrange multiplier — min x^2 + y^2 on x + y = 4
ax2 = axes[1]
x = np.linspace(-1, 6, 200)
y = np.linspace(-1, 6, 200)
X, Y = np.meshgrid(x, y)
Z = X**2 + Y**2

levels = [2, 4, 8, 12, 18, 25, 35]
cs2 = ax2.contour(X, Y, Z, levels=levels, cmap='viridis')
ax2.clabel(cs2, fontsize=8)

# Constraint line
xl = np.linspace(-0.5, 5, 100)
ax2.plot(xl, 4 - xl, 'r-', linewidth=2, label='x + y = 4')

# Optimal point
ax2.plot(2, 2, 'ko', markersize=10, zorder=5)
ax2.annotate('Optimum (2,2)\nf = 8', xy=(2, 2), xytext=(3.5, 3.5),
            fontsize=10, arrowprops=dict(arrowstyle='->', color='black'))

# Gradient vectors at optimum
ax2.quiver(2, 2, 4, 4, scale=25, color='blue', label='∇f = <4, 4>')
ax2.quiver(2, 2, 1, 1, scale=8, color='red', label='∇g = <1, 1>')

ax2.set_xlabel('x')
ax2.set_ylabel('y')
ax2.set_title('Lagrange: min x²+y² on x+y=4')
ax2.legend(fontsize=8)
ax2.set_aspect('equal')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np
import sympy as sp

# === Critical point classification ===
x, y = sp.symbols('x y')
f = x**3 - 3*x*y + y**3

f_x = sp.diff(f, x)
f_y = sp.diff(f, y)
print("=== f(x,y) = x³ - 3xy + y³ ===")
print(f"f_x = {f_x}")
print(f"f_y = {f_y}")

# Solve for critical points
crit = sp.solve([f_x, f_y], [x, y])
print(f"Critical points: {crit}")

# Second partials
f_xx = sp.diff(f, x, 2)
f_yy = sp.diff(f, y, 2)
f_xy = sp.diff(f, x, y)

for pt in crit:
    xv, yv = pt
    D = f_xx.subs({x:xv, y:yv}) * f_yy.subs({x:xv, y:yv}) - f_xy.subs({x:xv, y:yv})**2
    fxx_val = f_xx.subs({x:xv, y:yv})
    print(f"\nAt {pt}: D = {D}, f_xx = {fxx_val}")
    if D > 0 and fxx_val > 0:
        print(f"  -> Local MINIMUM, f = {f.subs({x:xv, y:yv})}")
    elif D > 0 and fxx_val < 0:
        print(f"  -> Local MAXIMUM, f = {f.subs({x:xv, y:yv})}")
    elif D < 0:
        print(f"  -> SADDLE POINT")
    else:
        print(f"  -> INCONCLUSIVE")

# === Lagrange multiplier ===
print("\n=== Lagrange: min x²+y² subject to x+y=4 ===")
lam = sp.Symbol('lambda')
f2 = x**2 + y**2
g = x + y - 4

# System: grad f = lambda * grad g, plus constraint
eqs = [
    sp.diff(f2, x) - lam * sp.diff(g, x),  # 2x - lambda = 0
    sp.diff(f2, y) - lam * sp.diff(g, y),  # 2y - lambda = 0
    g                                        # x + y - 4 = 0
]
sol = sp.solve(eqs, [x, y, lam])
print(f"Solution: x={sol[x]}, y={sol[y]}, lambda={sol[lam]}")
print(f"f at optimum: {f2.subs(sol)}")
print(f"lambda = {sol[lam]} (sensitivity: if constraint becomes x+y=4+eps,")
print(f" optimal value changes by ~{sol[lam]}*eps)")
```

## Connection to CS / Games / AI
- **Loss surface analysis**: the Hessian eigenvalues reveal whether a critical
  point in a neural network's loss is a minimum or saddle — most critical points
  in high dimensions are saddle points
- **Regularisation as constraint**: L2 regularisation is equivalent to
  Lagrange-constrained optimisation with a bound on weight magnitude
- **Support vector machines**: SVM training is a constrained optimisation problem
  solved via Lagrange multipliers (the dual formulation)
- **Game physics**: constrained dynamics (rigid body joints, contacts) use
  Lagrange multipliers to enforce constraints
- **Resource allocation**: maximise utility subject to budget constraints — a
  classic Lagrange problem in game economy design

## Check Your Understanding
1. Find and classify all critical points of $f(x,y) = 4x^2 - 4xy + y^2 + 2x$. (Hint: one critical point.)
2. Use Lagrange multipliers to find the point on the plane $2x + 3y + z = 12$
   closest to the origin.
3. Find the maximum of $f(x,y) = xy$ subject to the constraint $x^2 + y^2 = 1$.
   Interpret the result geometrically: which rectangle inscribed in the unit
   circle has maximum area?
