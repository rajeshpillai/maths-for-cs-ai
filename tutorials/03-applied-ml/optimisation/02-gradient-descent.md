# Gradient Descent — The Algorithm Derived from Calculus

## Intuition

Imagine you're blindfolded on a hilly landscape and want to find the lowest
point.  You feel the slope under your feet and take a step downhill.  Repeat.
That's gradient descent: measure the gradient (slope), step in the opposite
direction, repeat until you reach a minimum.

## Prerequisites

- Tier 3, Lesson 3: Partial Derivatives and Gradient
- Tier 5, Lesson 1: Loss Functions

## From First Principles

### The update rule

$$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \alpha \nabla L(\boldsymbol{\theta}_t)$$

- $\boldsymbol{\theta}$: parameters (weights)
- $\alpha$: learning rate (step size)
- $\nabla L$: gradient of the loss

### Why "negative gradient"?

$\nabla L$ points in the direction of steepest **increase**.  We want to decrease the loss, so we go in the **opposite** direction.

### Pen & paper: 1D gradient descent

Minimise $f(w) = (w - 3)^2$.

$f'(w) = 2(w - 3)$

Start at $w_0 = 0$, learning rate $\alpha = 0.1$:

| Step | $w$ | $f(w)$ | $f'(w)$ | Update |
|------|-----|--------|---------|--------|
| 0 | 0 | 9 | -6 | $0 - 0.1(-6) = 0.6$ |
| 1 | 0.6 | 5.76 | -4.8 | $0.6 + 0.48 = 1.08$ |
| 2 | 1.08 | 3.69 | -3.84 | $1.08 + 0.384 = 1.464$ |
| 3 | 1.464 | 2.36 | -3.072 | $1.464 + 0.307 = 1.771$ |

Converging toward $w = 3$ (the minimum).

### Pen & paper: 2D gradient descent

Minimise $f(x, y) = x^2 + 4y^2$ (an elliptical bowl).

$\nabla f = \begin{pmatrix} 2x \\ 8y \end{pmatrix}$

Start at $(4, 2)$, $\alpha = 0.1$:

**Step 0:** $\nabla f = (8, 16)$

$(x, y) \leftarrow (4, 2) - 0.1(8, 16) = (3.2, 0.4)$

$f = 3.2^2 + 4(0.4)^2 = 10.24 + 0.64 = 10.88$

**Step 1:** $\nabla f = (6.4, 3.2)$

$(x, y) \leftarrow (3.2, 0.4) - 0.1(6.4, 3.2) = (2.56, 0.08)$

$f = 6.5536 + 0.0256 = 6.58$

### Learning rate matters

**Too large ($\alpha = 1$):** For $f(w) = (w-3)^2$ at $w = 0$:

$w_1 = 0 - 1 \times (-6) = 6$, $w_2 = 6 - 1 \times 6 = 0$ — oscillates forever!

**Too small ($\alpha = 0.001$):** Converges, but takes thousands of steps.

**Just right:** Depends on the curvature of the loss landscape.

### Convergence condition

For convex $f$ with Lipschitz gradient (bounded second derivative $L$):

Gradient descent converges if $\alpha < \frac{2}{L}$.

For $f(w) = (w-3)^2$: $f'' = 2$, so need $\alpha < 1$.

### Batch gradient descent

Use the **full dataset** to compute the gradient at each step:

$$\nabla L = \frac{1}{n}\sum_{i=1}^{n} \nabla \ell_i(\boldsymbol{\theta})$$

**Pros:** Stable, smooth convergence.
**Cons:** Slow for large datasets (must process all $n$ samples per step).

### The full algorithm

```
Initialise θ randomly
For each epoch:
    Compute gradient: g = ∇L(θ) over all data
    Update: θ ← θ - α·g
    If ||g|| < ε: stop (converged)
```

## Python Verification

```python
# ── Gradient Descent: verifying pen & paper work ────────────

# 1D: minimise f(w) = (w-3)²
print("=== 1D Gradient Descent ===")
w = 0.0
alpha = 0.1
for step in range(15):
    f = (w - 3)**2
    grad = 2 * (w - 3)
    if step < 5 or step % 3 == 0:
        print(f"  step {step:2d}: w={w:.4f}, f={f:.4f}, grad={grad:.4f}")
    w = w - alpha * grad
print(f"  Final: w={w:.4f} (target: 3.0)")

# 2D: minimise f(x,y) = x² + 4y²
print(f"\n=== 2D Gradient Descent ===")
x, y = 4.0, 2.0
alpha = 0.1
for step in range(20):
    f = x**2 + 4*y**2
    gx, gy = 2*x, 8*y
    if step < 3 or step % 5 == 0:
        print(f"  step {step:2d}: ({x:.3f}, {y:.3f}), f={f:.4f}")
    x -= alpha * gx
    y -= alpha * gy
print(f"  Final: ({x:.6f}, {y:.6f})")

# Learning rate comparison
print(f"\n=== Learning rate comparison ===")
for alpha in [0.001, 0.1, 0.5, 0.9, 1.0]:
    w = 0.0
    for _ in range(50):
        w = w - alpha * 2 * (w - 3)
    print(f"  α={alpha}: w after 50 steps = {w:.4f}")

# Linear regression with gradient descent
print(f"\n=== Linear regression: y = 2x + 1 ===")
# Data
X = [1, 2, 3, 4, 5]
Y = [3, 5, 7, 9, 11]
n = len(X)

w, b = 0.0, 0.0
alpha = 0.01

for epoch in range(200):
    # Compute gradients (MSE loss)
    dw = sum(2 * (w*x + b - y) * x for x, y in zip(X, Y)) / n
    db = sum(2 * (w*x + b - y) for x, y in zip(X, Y)) / n
    w -= alpha * dw
    b -= alpha * db
    
    if epoch % 50 == 0:
        loss = sum((w*x + b - y)**2 for x, y in zip(X, Y)) / n
        print(f"  epoch {epoch:3d}: w={w:.4f}, b={b:.4f}, loss={loss:.6f}")

print(f"  Final: y = {w:.2f}x + {b:.2f} (target: y = 2x + 1)")
```

## Connection to CS / Games / AI

- **Neural network training** — all neural networks are trained with some variant of gradient descent
- **Learning rate schedules** — cosine annealing, warm-up, step decay
- **Feature scaling** — gradient descent converges faster when features are on similar scales
- **Landscape visualisation** — loss landscapes of deep networks are complex, non-convex surfaces

## Check Your Understanding

1. **Pen & paper:** Minimise $f(w) = w^2 + 2w + 1$ by gradient descent.  Start at $w = 3$, $\alpha = 0.1$.  Do 3 steps.  What is the minimum?
2. **Pen & paper:** For $f(x, y) = (x-1)^2 + (y-2)^2$, compute 2 gradient descent steps from $(0, 0)$ with $\alpha = 0.3$.
3. **Pen & paper:** If $\alpha = 1$ for $f(w) = w^2$, show that gradient descent oscillates.  What happens with $\alpha = 0.5$?
4. **Think about it:** Why does gradient descent sometimes get stuck at local minima?  Does this happen for MSE loss with linear regression?
