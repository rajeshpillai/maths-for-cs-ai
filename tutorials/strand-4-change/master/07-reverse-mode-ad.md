---
strand: change
level: master
order: 7
title: Reverse-Mode Automatic Differentiation
prerequisites:
  - tier: strand-4-change-master
    slug: 06-numerical-pdes
    description: Numerical PDEs
connections:
  - strand-4-change-master/08-information-geometry
applications:
  - cs: "PyTorch / JAX backprop, scientific differentiation, neural ODEs"
  - life: "Computing gradients of huge functions exactly and fast"
---

# Reverse-Mode Automatic Differentiation

## Mental

For $f : \mathbb R^n \to \mathbb R^m$:

- **Forward-mode AD**: track derivatives along with values; cost
  $O(\text{cost of } f)$ per **input direction**.
- **Reverse-mode AD**: trace forward, then propagate gradients
  backwards; cost $O(\text{cost of } f)$ per **output direction**.

For ML: $f$ is a scalar loss; one output direction. Reverse-mode
gives the entire gradient $\nabla f$ in $O(\text{forward cost})$ —
*one* extra pass.

This is the **chain rule, organised right-to-left** (Strand 4
Intermediate / Advanced).

## How it works

Decompose $f$ as a sequence of elementary operations
$f = f_k \circ f_{k-1} \circ \ldots \circ f_1$:

1. **Forward pass**: compute $x \to y_1 \to y_2 \to \ldots \to y_k = f(x)$,
   storing intermediate values.
2. **Backward pass**: compute *adjoint* $\bar y_k = \partial L/\partial y_k$,
   then propagate via $\bar y_{i-1} = J_i^T \bar y_i$ where $J_i$ is
   the Jacobian of $f_i$ at $y_{i-1}$.
3. Final $\bar x = \partial L/\partial x$.

## Worked example

$f(x) = \sin(x^2)$. Decompose:

$y_1 = x^2 \to y_2 = \sin y_1$.

Forward: store $x$, $y_1$.

Backward: $\bar y_2 = 1$ (assuming we want $df/dx$).
$\bar y_1 = \cos(y_1) \cdot \bar y_2 = \cos(x^2)$.
$\bar x = 2 x \cdot \bar y_1 = 2 x \cos(x^2)$.

Matches: $f'(x) = 2x \cos(x^2)$ by chain rule.

## Memory considerations

Reverse-mode requires storing intermediate values for the backward
pass. **Memory** $\propto$ depth of computation graph.

**Checkpointing** trades compute for memory: re-compute selected
intermediates instead of storing.

## Interactive

:::widget type=numeric-input prompt="Reverse-mode AD: gradient of scalar in $O(\\text{forward cost})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Forward-mode AD better for $f : \\mathbb R \\to \\mathbb R^m$ with few inputs. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Reverse-mode requires storing intermediates. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Checkpointing trades compute for memory. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Adjoint method**: reverse-mode AD viewed as discretisation of an
*adjoint* PDE/ODE. Used for sensitivity analysis in scientific
computing (continuous adjoint methods).

**Higher-order AD**: differentiate the gradient computation again
for Hessians, Hessian-vector products. JAX `hessian`, PyTorch
`functorch`.

**Differentiable programming**: extend AD to control flow, loops,
recursion. Languages: Zygote (Julia), JAX (Python), Tapenade
(Fortran/C).

**Source-to-source AD**: transform program text into another
program computing the gradient. Tapenade, Tangent.

## Computational

```python
# Manual reverse-mode AD on a small example
class Var:
    def __init__(self, value, grad=0.0):
        self.value = value
        self.grad = grad
        self.children = []
        self.local_grads = []
    def backward(self, grad=1.0):
        self.grad += grad
        for child, lg in zip(self.children, self.local_grads):
            child.backward(grad * lg)

def add(a, b):
    out = Var(a.value + b.value)
    out.children = [a, b]
    out.local_grads = [1, 1]
    return out

def mul(a, b):
    out = Var(a.value * b.value)
    out.children = [a, b]
    out.local_grads = [b.value, a.value]
    return out

def sin_op(a):
    import math
    out = Var(math.sin(a.value))
    out.children = [a]
    out.local_grads = [math.cos(a.value)]
    return out

# Compute df/dx for f = sin(x²)
import math
x = Var(1.5)
y1 = mul(x, x)
y2 = sin_op(y1)
y2.backward()
print(f"f({x.value}) = {y2.value}")
print(f"df/dx = {x.grad}")
print(f"Expected = {2 * 1.5 * math.cos(1.5**2)}")

# Real-world: PyTorch
import torch
x = torch.tensor(1.5, requires_grad=True)
y = torch.sin(x**2)
y.backward()
print(f"PyTorch gradient: {x.grad}")
```

## Applied

- **Deep learning training** — every PyTorch / JAX / TensorFlow
  training step is reverse-mode AD on a computation graph.
- **Neural ODEs** — adjoint method computes gradients through ODE
  solvers without storing all intermediate states.
- **Differentiable simulation** — physics engines (Brax,
  DiffTaichi, MuJoCo MJX) propagate gradients through dynamics.
- **Scientific differentiable programming** — climate models, fluid
  dynamics now run gradient-aware versions for inverse problems.
- **Probabilistic programming** — gradient-based MCMC (HMC) requires
  efficient gradient of log-density.

## Check Your Understanding

:::widget type=numeric-input prompt="Reverse-mode AD: scalar gradient in $O(\\text{forward cost})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Backprop = reverse-mode AD on neural-net forward graph. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Adjoint method: continuous version of reverse-mode AD. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hessian-vector products via differentiating gradient. Type 1." answer=1 explain="Yes.":::
