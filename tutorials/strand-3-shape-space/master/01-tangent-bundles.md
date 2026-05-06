---
strand: shape-space
level: master
order: 1
title: Tangent Bundles and Vector Fields
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 00-smooth-manifolds
    description: Smooth manifolds
connections:
  - strand-3-shape-space-master/02-differential-forms
applications:
  - cs: "Robotics velocities, GR geodesics, neural ODE flows"
  - life: "Velocity fields on curved spaces"
---

# Tangent Bundles and Vector Fields

## Explain Like I Am 7

Glue a tiny flat board onto every spot of an apple, just touching the
peel at that point — like a million little surfboards riding the
fruit's curve.  All those flat boards together are the **tangent
bundle**.  Now, on each board, draw a little arrow.  The whole
collection of arrows is a **vector field** — like the wind blowing
across a weather map, but the map is curvy.  Comb a hairy ball
smoothly and you'll find at least one cowlick: a famous fact about
arrows on spheres.

## Mental

For an $n$-manifold $M$, the **tangent bundle** is

$$
TM = \bigsqcup_{p \in M} T_p M.
$$

Topologically a $2n$-manifold; the **projection** $\pi : TM \to M$
sends $(p, v) \mapsto p$. Each fibre $\pi^{-1}(p) = T_p M$ is a
vector space of dimension $n$.

A **vector field** $X$ on $M$ is a smooth section of $\pi$ — a
smooth assignment of tangent vector to each point.

## Vector field examples

| Vector field | Manifold |
|---|---|
| Wind velocity at every point on Earth | $S^2$ |
| Particle velocity in fluid flow | $\mathbb{R}^3$ |
| Configuration-space velocity in robotics | $\mathrm{SE}(3)$ |
| Hamiltonian vector field on phase space | $T^* M$ |

## Flows

A vector field $X$ generates a **flow** $\Phi^X_t : M \to M$:
solving the ODE $\dot \gamma(t) = X(\gamma(t))$ gives integral curves
$\gamma_p(t)$ starting at any $p$.

Key property: $\Phi^X_{t + s} = \Phi^X_t \circ \Phi^X_s$ — *one-parameter
group of diffeomorphisms*.

## Lie bracket

For two vector fields $X, Y$ on $M$, the **Lie bracket** $[X, Y]$ is
another vector field measuring failure-to-commute:

$$
[X, Y]_p f = X(Y(f)) - Y(X(f)),
$$

where $X$ acts as a derivation on smooth functions.

Geometric: $\Phi^X_t \circ \Phi^Y_s$ doesn't equal
$\Phi^Y_s \circ \Phi^X_t$; the leading-order discrepancy is
$ts \cdot [X, Y]$.

## Hairy ball theorem

**Theorem**: every continuous vector field on $S^2$ vanishes
somewhere.

In other words: you can't comb a hairy ball flat. On a torus $T^2$,
you can — vector fields without zeros exist.

The general statement: a closed orientable manifold admits a
nowhere-vanishing vector field iff its **Euler characteristic** is 0.

## Interactive

:::widget type=numeric-input prompt="Tangent bundle of $n$-manifold has dim $2n$. For $n = 3$: $?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="Hairy ball: every $S^2$ vector field has a zero. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$T^2$ admits nowhere-vanishing vector field. ($\\chi = 0$). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Vector field generates a flow $\\Phi_t$ — diffeomorphism. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Lie derivative** $\mathcal L_X T$ — generalises directional
derivative to tensors. For functions: $\mathcal L_X f = X(f)$. For
vector fields: $\mathcal L_X Y = [X, Y]$. For higher tensors: extends
by Leibniz rule.

**Cotangent bundle** $T^* M$: dual bundle. Sections are 1-forms.

**Exotic vector fields**: on $S^7$ there are $S^7$-spheres that are
homeomorphic to standard $S^7$ but not diffeomorphic — Milnor's
exotic spheres (1956).

## Computational

```python
import numpy as np
import matplotlib.pyplot as plt

# Vector field on R^2: F(x, y) = (-y, x) — rotation
def F(x, y):
    return (-y, x)

# Visualize streamlines (commented for headless)
# X, Y = np.meshgrid(np.linspace(-2, 2, 20), np.linspace(-2, 2, 20))
# U, V = F(X, Y)
# plt.streamplot(X, Y, U, V)

# Flow: integrate dy/dt = F(y), y(0) = (1, 0) for time t
def flow(start, t, F, dt=0.001):
    pos = np.array(start, dtype=float)
    n = int(t / dt)
    for _ in range(n):
        d = np.array(F(*pos))
        pos += d * dt
    return pos

# Rotation flow: starts (1, 0), after t = π/2 should be (0, 1)
print(flow((1, 0), np.pi/2, F))     # close to (0, 1)
print(flow((1, 0), 2 * np.pi, F))   # close to (1, 0) — full rotation

# Lie bracket: [X, Y] for X = ∂/∂x and Y = x ∂/∂y on R^2
# X(f) = ∂f/∂x, Y(f) = x ∂f/∂y
# [X, Y](f) = X(Y(f)) - Y(X(f)) = ∂(x ∂f/∂y)/∂x - x ∂²f/(∂y ∂x)
#           = ∂f/∂y + x ∂²f/(∂x ∂y) - x ∂²f/(∂x ∂y) = ∂f/∂y
# So [X, Y] = ∂/∂y
print("Computed [∂/∂x, x ∂/∂y] = ∂/∂y")
```

## Applied

- **Robotics motion planning** — geodesic flows on configuration
  manifolds; Lie bracket detects controllability.
- **Neural ODEs** (Chen et al. 2018) — model deep networks as flows
  of learned vector fields on the data manifold.
- **Fluid dynamics** — velocity fields on space, vorticity from Lie
  brackets, Navier-Stokes evolution.
- **General relativity** — geodesics are integral curves of velocity
  vector fields; Killing vector fields encode symmetries.
- **Symplectic geometry** — Hamiltonian vector fields on phase space
  generate physical evolution.

## Check Your Understanding

:::widget type=numeric-input prompt="Vector field on $M$ is a smooth section of $TM$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hairy ball: $S^2$ has no nowhere-vanishing vector field. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lie bracket measures non-commutativity of flows. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$T^2$ has $\\chi = 0$ — admits nowhere-vanishing field. Type 1." answer=1 explain="Yes.":::
