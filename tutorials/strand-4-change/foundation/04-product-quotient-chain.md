---
strand: change
level: foundation
order: 4
title: Product, Quotient, and Chain Rules
prerequisites:
  - tier: strand-4-change-foundation
    slug: 03-derivative-rules
    description: Power, sum, constant rules
connections:
  - strand-4-change-foundation/05-applications-of-derivatives
applications:
  - cs: "Backpropagation in neural networks (chain rule)"
  - business: "Marginal revenue × quantity decompositions"
  - games: "Composite motion (rotation × translation)"
---

# Product, Quotient, and Chain Rules

## Mental

Beyond simple polynomials, derivatives need three more rules.

**Product rule**:

$$
\frac{d}{dx} [f(x) g(x)] = f'(x) g(x) + f(x) g'(x).
$$

(Mnemonic: "first times derivative of second + second times derivative
of first.")

**Quotient rule**:

$$
\frac{d}{dx} \left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) g(x) - f(x) g'(x)}{g(x)^2}.
$$

(Mnemonic: "low d-high minus high d-low, square the bottom and away
we go.")

**Chain rule** (most important for ML):

$$
\frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x).
$$

For composed functions: differentiate the outer, evaluated at the
inner; multiply by the derivative of the inner.

The chain rule is the **mathematical content of backpropagation**.
A neural network's loss with respect to a deep weight is a long chain
of compositions; the chain rule unwinds them.

## Worked examples

**Product**: $\dfrac{d}{dx} [x^2 \sin x] = 2x \sin x + x^2 \cos x$.

**Quotient**: $\dfrac{d}{dx} \left[\dfrac{x^2}{x + 1}\right] = \dfrac{2x(x+1) - x^2 \cdot 1}{(x+1)^2} = \dfrac{x^2 + 2x}{(x+1)^2}$.

**Chain**: $\dfrac{d}{dx} (3x + 1)^5 = 5(3x+1)^4 \cdot 3 = 15(3x+1)^4$.

## Interactive

:::widget type=numeric-input prompt="$f(x) = x \\cdot e^x$. By product: $f'(x) = e^x + x e^x = e^x(1 + x)$. $f'(0) = e^0 (1 + 0) = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$f(x) = (2x + 1)^3$. By chain: $f'(x) = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$. $f'(0) = ?$" answer=6 explain="$6 \\cdot 1 = 6$.":::

:::widget type=numeric-input prompt="$f(x) = (x^2 + 1)^4$. $f'(x) = 4(x^2 + 1)^3 \\cdot 2x = 8x(x^2 + 1)^3$. $f'(1) = ?$" answer=64 explain="$8 \\cdot 1 \\cdot 8 = 64$.":::

:::widget type=numeric-input prompt="Derivative of $\\sin(2x)$ via chain: $\\cos(2x) \\cdot 2 = 2 \\cos(2x)$. At $x = 0$: $f'(0) = ?$" answer=2 explain="$2 \\cdot \\cos 0 = 2$.":::

## Symbolic

Three core rules:

$$
\boxed{(fg)' = f'g + fg'} \quad \boxed{(f/g)' = \frac{f'g - fg'}{g^2}} \quad \boxed{(f \circ g)' = (f' \circ g) \cdot g'}.
$$

The chain rule generalises to multiple compositions:

$$
\frac{d}{dx} f_1(f_2(f_3(\ldots f_n(x) \ldots))) = f_1'(\ldots) \cdot f_2'(\ldots) \cdot f_3'(\ldots) \cdots f_n'(x).
$$

Each function evaluated at the appropriate inner argument.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Product
print(sp.diff(x * sp.sin(x), x))             # x*cos(x) + sin(x)

# Quotient
print(sp.diff(x**2 / (x + 1), x))             # 2*x/(x+1) - x**2/(x+1)**2

# Chain
print(sp.diff((2*x + 1)**3, x))               # 6*(2*x + 1)**2
print(sp.diff(sp.sin(x**2), x))               # 2*x*cos(x**2)

# Auto-differentiation in PyTorch — computes via chain rule
import torch
x = torch.tensor(2.0, requires_grad=True)
y = (2*x + 1) ** 3
y.backward()
print(x.grad)   # tensor(150.) — = 6 * 5^2 = 150
```

## Applied

- **Backpropagation in neural networks**: the chain rule applied
  thousands of times. PyTorch and TensorFlow's auto-differentiation
  is just systematic chain-rule application.
- **Velocity of a rocket**: $v = \tfrac{dx}{dt}$ where $x$ is
  position; $a = \tfrac{dv}{dt}$. Chain rule needed for compositions
  with parameters.
- **Composite functions**: temperature $T$ depending on altitude $h$,
  $h$ depending on time $t$: $\tfrac{dT}{dt} = \tfrac{dT}{dh} \cdot
  \tfrac{dh}{dt}$ (the chain rule, in physical units).

## Check Your Understanding

:::widget type=numeric-input prompt="$\\dfrac{d}{dx}(3x + 5)^2$ at $x = 1$. $f'(x) = 2(3x+5) \\cdot 3 = 6(3x+5)$. At $x = 1$: $6 \\cdot 8 = ?$" answer=48 explain="$48$.":::

:::widget type=numeric-input prompt="$\\dfrac{d}{dx}(x^3 \\cdot \\cos x)$ at $x = 0$. $f'(x) = 3x^2 \\cos x - x^3 \\sin x$. At $x = 0$: $0 - 0 = ?$" answer=0 explain="$0$.":::

:::widget type=numeric-input prompt="$\\dfrac{d}{dx} \\dfrac{x}{x^2 + 1}$ at $x = 0$. By quotient: $\\dfrac{1 \\cdot (x^2 + 1) - x \\cdot 2x}{(x^2 + 1)^2} = \\dfrac{1 - x^2}{(x^2+1)^2}$. At $x = 0$: $1/1 = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\dfrac{d}{dx} \\sin^2(x)$ via chain: $2 \\sin x \\cdot \\cos x = \\sin(2x)$. At $x = \\pi/4$: $\\sin(\\pi/2) = ?$" answer=1 explain="$1$.":::
