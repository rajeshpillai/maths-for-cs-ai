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

## Connection to CS / Games / AI

- **SVMs** — the dual formulation of SVMs uses Lagrange multipliers (support vectors have $\lambda > 0$)
- **Entropy maximisation** — "find the distribution with maximum entropy subject to known moments" uses Lagrange multipliers
- **Constrained optimisation in RL** — safety constraints ("never crash") formulated as Lagrangian relaxation
- **Regularisation** — L2 regularisation is equivalent to constrained optimisation with $\|\mathbf{w}\|^2 \le C$
- **Game theory** — Nash equilibria can be found using KKT conditions

## Check Your Understanding

1. **Pen & paper:** Minimise $f(x, y) = x + y$ subject to $x^2 + y^2 = 1$ (find the closest point on the unit circle to the origin in the "sum" direction).
2. **Pen & paper:** Find the point on the plane $x + 2y + 3z = 6$ closest to the origin.
3. **Pen & paper:** Maximise $f(x, y) = x^2 y$ subject to $x^2 + y^2 = 3$.
4. **Think about it:** How does Lagrangian relaxation connect L2 regularisation ($\|\mathbf{w}\|^2$ penalty) to constrained optimisation?
