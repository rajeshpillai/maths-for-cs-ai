---
strand: computation
level: foundation
order: 7
title: Newton's Method
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 06-hashing-foundations
    description: Hashing
connections:
  - strand-7-computation-foundation/08-numerical-integration
applications:
  - cs: "Solver routines, machine learning second-order optimization"
  - life: "Find roots of equations by repeated linear approximation"
---

# Newton's Method

## Explain Like I Am 7

You're hunting for treasure on a curvy hill, and the treasure is buried
exactly where the slope crosses zero.  You don't know the spot, but
you do know where you're standing and how steep the ground feels under
your feet.  So you draw a straight ramp matching that steepness, slide
down it, and mark where the ramp would have hit zero.  Stand there,
re-check the slope, draw a new ramp, slide again.  After a couple of
tries you're practically on top of the treasure — that's **Newton's
trick**.

## Mental

To solve $f(x) = 0$: start at a guess $x_0$, then **follow the
tangent line down to the $x$-axis** — that gives a (usually) better
guess $x_1$. Repeat.

Geometric construction:

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}.
$$

Why? The tangent at $x_n$ is $y = f(x_n) + f'(x_n)(x - x_n)$. Set
$y = 0$ and solve for $x$:

$$
0 = f(x_n) + f'(x_n)(x - x_n) \implies x = x_n - \frac{f(x_n)}{f'(x_n)}.
$$

## Worked example: $\sqrt{2}$

Find $\sqrt{2}$ by solving $f(x) = x^2 - 2 = 0$. $f'(x) = 2x$, so

$$
x_{n+1} = x_n - \frac{x_n^2 - 2}{2 x_n} = \frac{x_n + 2/x_n}{2}.
$$

Start $x_0 = 1$:

| $n$ | $x_n$ | $x_n^2$ |
|---|---|---|
| 0 | 1.0 | 1.0 |
| 1 | 1.5 | 2.25 |
| 2 | 1.41666... | 2.00694 |
| 3 | 1.41421568... | 2.00000006 |
| 4 | 1.41421356... | 2.000000000... |

Each iteration *roughly doubles* the number of correct digits —
**quadratic convergence**.

## Quadratic convergence

If $r$ is a simple root and $f', f''$ are continuous near $r$, the
error $e_n = x_n - r$ satisfies (approximately)

$$
e_{n+1} \approx \frac{f''(r)}{2 f'(r)} e_n^2.
$$

So one step roughly *squares* the error: 0.1 → 0.01 → 0.0001 → ...

## Failure modes

Newton's method can:

- **Diverge** if $f'(x_n) \approx 0$ — division by tiny number.
- **Oscillate** if $f$ has bad shape near the root.
- **Find the wrong root** for non-convex $f$.

## Interactive

:::widget type=numeric-input prompt="Solve $x^2 = 2$ via Newton: $x_{n+1} = (x_n + 2/x_n)/2$. Start $x_0 = 1$. $x_1 = (1 + 2)/2 = ?$" answer=1.5 explain="$1.5$.":::

:::widget type=numeric-input prompt="$x_2 = (1.5 + 2/1.5)/2 = (1.5 + 1.3333)/2 = ?$. Round 4 dp." answer=1.4167 tolerance=0.005 explain="$1.4167$.":::

:::widget type=numeric-input prompt="Each iteration doubles correct digits. Starting with 1 correct digit, after 4 iterations: $\\sim 16$ digits. Type 16." answer=16 explain="Quadratic convergence — close to float64 precision.":::

:::widget type=numeric-input prompt="Newton solves $f(x) = 0$ given $f$ and $f'$. Type 1 if it requires $f'$." answer=1 explain="Yes — needs derivative.":::

## Symbolic

**Multivariable Newton**: for $\mathbf{F} : \mathbb{R}^n \to \mathbb{R}^n$,

$$
\mathbf{x}_{n+1} = \mathbf{x}_n - J(\mathbf{x}_n)^{-1} \mathbf{F}(\mathbf{x}_n),
$$

where $J$ is the Jacobian. Used to solve nonlinear systems.

**For optimization** (find $\nabla f = 0$): Newton's update on the
gradient is

$$
\mathbf{x}_{n+1} = \mathbf{x}_n - H^{-1} \nabla f(\mathbf{x}_n),
$$

where $H$ is the Hessian. This is the basis of *second-order
optimization* in ML; faster convergence than gradient descent but
expensive Hessian computation.

**Quasi-Newton methods** (BFGS, L-BFGS) approximate $H^{-1}$ from
gradient history — used heavily in scientific computing.

## Computational

```python
def newton(f, fprime, x0, tol=1e-12, max_iter=50):
    x = x0
    for i in range(max_iter):
        fx = f(x)
        if abs(fx) < tol:
            return x, i
        x = x - fx / fprime(x)
    return x, max_iter

# Square root of 2
root, iters = newton(lambda x: x*x - 2, lambda x: 2*x, x0=1.0)
print(root, iters)              # ~1.4142135624, 4 or 5 iters

# Root of cos(x) = x — finds Dottie's number
import math
root, iters = newton(lambda x: math.cos(x) - x,
                     lambda x: -math.sin(x) - 1,
                     x0=0.7)
print(root)                     # 0.7390851332...

# Cube root of 50
root, iters = newton(lambda x: x**3 - 50, lambda x: 3*x*x, x0=3.0)
print(root)                     # ~3.6840
```

## Applied

- **`math.sqrt`** in many libraries uses Newton's method (or
  variations) for refinement after a hardware fast estimate.
- **Quake III's "fast inverse square root"** combined a bit-level
  hack with one Newton iteration to compute $1/\sqrt{x}$ in a few
  cycles — famous in graphics history.
- **Numerical PDE solvers** use Newton-Raphson (or quasi-Newton) at
  each timestep for implicit methods.
- **Backpropagation in neural nets** is gradient descent, but
  *second-order* methods (Newton, K-FAC, Shampoo) reuse Hessian
  information for faster ML training.
- **Black-Scholes implied volatility** is solved via Newton on the
  pricing equation.

## Check Your Understanding

:::widget type=numeric-input prompt="Newton iteration: $x_{n+1} = x_n - f(x_n) / f'(x_n)$. Type 1 if correct." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Newton's method has quadratic convergence near simple roots. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\sqrt{3}$ via Newton starting $x_0 = 1$: $x_1 = (1 + 3)/2 = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="Multivariable Newton needs the Jacobian's inverse — expensive. Type 1." answer=1 explain="Yes.":::
