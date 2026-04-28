# Lagrange Multipliers — Constrained Optimisation

## Intuition

Sometimes you want to minimise a function **subject to a constraint**.
"Find the cheapest diet that provides 2000 calories."  "Maximise the area of
a rectangle with a fixed perimeter."  Lagrange multipliers convert a
constrained problem into an unconstrained one by introducing a clever new
variable.

## Prerequisites

- Tier 3, Lesson 3: Partial Derivatives and Gradient
- Tier 5, Lesson 2: Gradient Descent

## From First Principles

### The problem

Minimise (or maximise) $f(\mathbf{x})$ subject to $g(\mathbf{x}) = 0$.

### The key insight

At the optimum, the gradient of $f$ must be **parallel** to the gradient of $g$:

$$\nabla f = \lambda \nabla g$$

**Why?** If $\nabla f$ had a component along the constraint surface, you could
move along the surface and improve $f$ — so you're not at the optimum.

### The Lagrangian

$$\mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) - \lambda \cdot g(\mathbf{x})$$

Set all partial derivatives to zero:

$$\frac{\partial \mathcal{L}}{\partial x_i} = 0 \quad \text{and} \quad \frac{\partial \mathcal{L}}{\partial \lambda} = 0$$

The second condition $\frac{\partial \mathcal{L}}{\partial \lambda} = 0$ recovers the constraint $g(\mathbf{x}) = 0$.

### Pen & paper: Maximise area of a rectangle with fixed perimeter

Maximise $f(x, y) = xy$ (area) subject to $g(x, y) = 2x + 2y - 20 = 0$ (perimeter = 20).

**The Lagrangian:**

$$\mathcal{L} = xy - \lambda(2x + 2y - 20)$$

**Partial derivatives:**

$\frac{\partial \mathcal{L}}{\partial x} = y - 2\lambda = 0$ → $y = 2\lambda$

$\frac{\partial \mathcal{L}}{\partial y} = x - 2\lambda = 0$ → $x = 2\lambda$

$\frac{\partial \mathcal{L}}{\partial \lambda} = -(2x + 2y - 20) = 0$ → $2x + 2y = 20$

From first two: $x = y$.  Substitute into constraint: $4x = 20$ → $x = 5, y = 5$.

**The rectangle with maximum area is a square** with side 5 and area 25. ✓

### Pen & paper: Minimise $x^2 + y^2$ on the line $x + y = 4$

**Lagrangian:** $\mathcal{L} = x^2 + y^2 - \lambda(x + y - 4)$

$\frac{\partial}{\partial x} = 2x - \lambda = 0$ → $x = \lambda/2$

$\frac{\partial}{\partial y} = 2y - \lambda = 0$ → $y = \lambda/2$

Constraint: $x + y = 4$ → $\lambda/2 + \lambda/2 = 4$ → $\lambda = 4$

$x = 2, y = 2$. Minimum distance from origin to the line $x + y = 4$ is $\sqrt{8} = 2\sqrt{2}$.

### Multiple constraints

For constraints $g_1(\mathbf{x}) = 0, \ldots, g_m(\mathbf{x}) = 0$:

$$\mathcal{L} = f(\mathbf{x}) - \sum_{j=1}^{m} \lambda_j g_j(\mathbf{x})$$

### Inequality constraints (KKT conditions)

For $g(\mathbf{x}) \le 0$: the **Karush-Kuhn-Tucker** conditions add:

- $\lambda \ge 0$
- $\lambda \cdot g(\mathbf{x}) = 0$ (**complementary slackness**: either the constraint is active or $\lambda = 0$)

This is the foundation of Support Vector Machines.

## Python Verification

```python
# ── Lagrange Multipliers: verifying pen & paper work ────────

# Example 1: Max area with fixed perimeter
print("=== Max area, perimeter = 20 ===")
# Analytical: x = y = 5
x, y = 5.0, 5.0
print(f"Solution: x={x}, y={y}")
print(f"Area = {x*y}")
print(f"Perimeter = {2*x + 2*y}")

# Verify it's the max by comparing with other rectangles
print("\nComparison:")
for w in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
    h = 10 - w  # 2w + 2h = 20
    print(f"  {w}×{h} = {w*h}")

# Example 2: Min x² + y² on x + y = 4
print(f"\n=== Min x²+y² on x+y=4 ===")
x, y = 2.0, 2.0
print(f"Solution: ({x}, {y})")
print(f"x²+y² = {x**2 + y**2}")
print(f"x+y = {x + y}")
print(f"Distance from origin = {(x**2 + y**2)**0.5:.4f}")

# Numerical verification: search along constraint
print("\nSearching along constraint x + y = 4:")
best_x, best_val = None, float('inf')
for i in range(-40, 80):
    x = i / 10
    y = 4 - x
    val = x**2 + y**2
    if val < best_val:
        best_val = val
        best_x = x
print(f"Best found: x={best_x}, y={4-best_x}, x²+y²={best_val}")

# Gradient descent on Lagrangian
print(f"\n=== GD on Lagrangian ===")
x, y, lam = 0.0, 0.0, 0.0
alpha = 0.01
for step in range(500):
    # Gradients of L = x² + y² - λ(x + y - 4)
    dx = 2*x - lam
    dy = 2*y - lam
    dlam = -(x + y - 4)
    x -= alpha * dx
    y -= alpha * dy
    lam -= alpha * dlam  # Note: gradient ascent on λ
    
    if step % 100 == 0:
        print(f"  step {step}: x={x:.4f}, y={y:.4f}, λ={lam:.4f}, constraint={x+y-4:.4f}")

print(f"  Final: ({x:.4f}, {y:.4f}), x²+y² = {x**2+y**2:.4f}")
```

## Visualisation — Tangency between objective and constraint

Lagrange's geometric insight: at a constrained optimum, the gradient
of the objective is *parallel* to the gradient of the constraint. The
plot below shows this exactly — the contour of $f$ that just touches
the constraint curve is tangent to it, and at that touch point the
two gradient vectors line up.

```python
# ── Visualising Lagrange multipliers ────────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Problem:  minimise  f(x, y) = x² + y²    (distance² from origin)
#       subject to    g(x, y) = x + y − 4 = 0   (a straight line)
# By Lagrange: at the optimum, ∇f = λ ∇g, where λ is the multiplier.

xs = np.linspace(-1, 5, 200); ys = np.linspace(-1, 5, 200)
X, Y = np.meshgrid(xs, ys)
f = X**2 + Y**2

fig, ax = plt.subplots(1, 1, figsize=(8, 7))

# Contours of the objective f(x, y) = x² + y² (concentric circles).
cs = ax.contour(X, Y, f, levels=[0.5, 2, 4, 8, 12, 18, 25, 35],
                cmap="viridis", alpha=0.7)
ax.clabel(cs, inline=True, fontsize=8)

# Constraint line: x + y = 4.
ax.plot(xs, 4 - xs, color="tab:red", lw=2.5, label="constraint  x + y = 4")

# Constrained optimum: by symmetry it's at (2, 2), value 8.
opt = np.array([2.0, 2.0])
opt_value = opt @ opt
ax.scatter(*opt, color="black", s=200, zorder=5,
           label=f"optimum (2, 2), $f = {opt_value:.0f}$")

# Gradient of f at the optimum: ∇f = 2(x, y) = (4, 4).
gf = 2 * opt
# Gradient of g everywhere: ∇g = (1, 1).
gg = np.array([1.0, 1.0])

# Draw the two gradient arrows from the optimum — visibly parallel.
ax.quiver(*opt, *gf, angles="xy", scale_units="xy", scale=1, color="tab:blue",
          width=0.012, label=f"∇f at optimum = ({gf[0]:.0f}, {gf[1]:.0f})")
ax.quiver(*opt, *(gg * 4), angles="xy", scale_units="xy", scale=1, color="tab:orange",
          width=0.012, label="∇g (scaled ×4 for visibility) = (1, 1)")

# Annotate λ — the proportionality constant.
lam = gf[0] / gg[0]
ax.annotate(f"At the optimum:\n∇f = λ ∇g\nwith λ = {lam:.0f}",
            xy=(2.5, 3.5), fontsize=10,
            bbox=dict(boxstyle="round", fc="lightyellow", ec="black"))

# Several non-optimal candidate points on the constraint, to show f is
# higher there (highlighting WHY the tangency picks (2,2)).
for cand_x in [0.5, 1.0, 3.0, 3.5]:
    cy = 4 - cand_x
    ax.scatter(cand_x, cy, color="tab:red", s=60, alpha=0.6)
    ax.text(cand_x + 0.05, cy - 0.05,
            f"f={cand_x**2 + cy**2:.1f}", fontsize=8, color="tab:red")

ax.set_xlim(-1, 5); ax.set_ylim(-1, 5); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.5); ax.axvline(0, color="black", lw=0.5)
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_title("Constrained optimisation by Lagrange multipliers\n"
             "min $x^2 + y^2$  subject to  $x + y = 4$ → tangency at (2, 2)")
ax.legend(loc="upper right", fontsize=9)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Numerical verification: the contour of f passing through the optimum
# is tangent to the constraint line.
print(f"At constrained optimum (2, 2):")
print(f"  f       = 2² + 2² = {2**2 + 2**2}")
print(f"  ∇f      = ({2*2}, {2*2})")
print(f"  ∇g      = (1, 1)")
print(f"  ratio   = ∇f / ∇g = {2*2 / 1} = λ  →  ∇f = λ ∇g  ✓")
print()
print("Compare values along the constraint x + y = 4:")
for cx in [0, 1, 2, 3, 4]:
    cy = 4 - cx
    print(f"  ({cx}, {cy}):  f = {cx**2 + cy**2}    (optimum is the minimum at (2, 2))")
```

**The single key insight:**

- At a constrained extremum, **you can't decrease $f$ further without
  leaving the constraint**. Geometrically, the constraint curve is
  *tangent* to the contour of $f$ that you're sitting on — any nudge
  along the constraint takes you to a *higher* contour.
- Tangency means the two gradients are parallel: $\nabla f = \lambda
  \nabla g$. The proportionality constant $\lambda$ is the Lagrange
  multiplier — it's the **shadow price of the constraint**: how much
  the optimum value of $f$ would change if the constraint right-hand
  side moved by 1.
- This same tangency picture **is** how SVMs find their margin
  (constraint = "stay on the correct side of the hyperplane"), how
  portfolio optimisation balances expected return against risk
  budgets, and how RL safety constraints are enforced in
  Lagrangian-relaxation form.

## Connection to CS / Games / AI / Business / Industry

- **SVMs** — the dual formulation of SVMs uses Lagrange multipliers (support vectors have $\lambda > 0$)
- **Entropy maximisation** — "find the distribution with maximum entropy subject to known moments" uses Lagrange multipliers
- **Constrained optimisation in RL** — safety constraints ("never crash") formulated as Lagrangian relaxation
- **Regularisation** — L2 regularisation is equivalent to constrained optimisation with $\|\mathbf{w}\|^2 \le C$
- **Game theory** — Nash equilibria can be found using KKT conditions
- **Business / Finance**: **Markowitz portfolio optimisation** as implemented in **BlackRock Aladdin** and **MSCI Barra** uses Lagrange multipliers — the multiplier on "expected return ≥ R" is literally the *price of risk* used to set institutional benchmark performance.
- **Engineering / Aerospace**: **NASA JPL trajectory optimisation** for Mars sample-return and **SpaceX Falcon 9 landing** burns use Pontryagin's Maximum Principle (a Lagrangian formulation) — the multipliers are the costate variables that determine when to throttle for a fuel-optimal landing.
- **Industry / RLHF for LLMs**: **OpenAI's PPO with KL constraint** and **Anthropic's Constitutional AI** train chat models with a Lagrangian-relaxed constraint that the policy stays within a KL ball of the reference model — the multiplier (often called $\beta$) directly trades reward vs faithfulness to the base model.
- **Engineering / Operations research**: **UPS ORION** and **FedEx route-planning** as well as **American Airlines crew scheduling** use dual-variable (Lagrange multiplier) decompositions to scale shortest-path / set-covering problems across 100k+ daily routes.

## Check Your Understanding

1. **Pen & paper:** Minimise $f(x, y) = x + y$ subject to $x^2 + y^2 = 1$ (find the closest point on the unit circle to the origin in the "sum" direction).
2. **Pen & paper:** Find the point on the plane $x + 2y + 3z = 6$ closest to the origin.
3. **Pen & paper:** Maximise $f(x, y) = x^2 y$ subject to $x^2 + y^2 = 3$.
4. **Think about it:** How does Lagrangian relaxation connect L2 regularisation ($\|\mathbf{w}\|^2$ penalty) to constrained optimisation?
