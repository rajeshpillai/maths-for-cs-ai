---
strand: shape-space
level: master
order: 6
title: Symplectic Geometry
prerequisites:
  - tier: strand-3-shape-space-master
    slug: 05-fiber-bundles
    description: Fiber bundles
connections:
  - strand-3-shape-space-master/07-cw-and-homotopy
applications:
  - cs: "Hamiltonian Monte Carlo, physics simulation, geometric integrators"
  - life: "The geometry of phase space"
---

# Symplectic Geometry

## Explain Like I Am 7

Push a swing.  At every instant, the swing has two facts: *where it
is* (in front, in back) and *how fast it's going*.  Pair those two
together and you've made a single point in a special "phase
playground."  **Symplectic geometry** is the math of that playground:
it gives the playground a clever area-meter that *never changes* as
the swing whooshes through.  Even if everything wobbles, the area of
any patch of starting-conditions stays exactly the same forever —
which is why pendulums never get their motion mixed up.

## Mental

A **symplectic manifold** $(M, \omega)$: smooth manifold $M$ of
dimension $2n$ with a closed, non-degenerate 2-form $\omega$.

Closed: $d\omega = 0$. Non-degenerate: $\omega(X, \cdot) = 0$ implies
$X = 0$.

Examples:

- $\mathbb R^{2n}$ with $\omega = \sum dp_i \wedge dq_i$ — *the*
  example.
- $T^* M$ for any manifold $M$: cotangent bundles are canonically
  symplectic.
- $\mathbb{CP}^n$ with Fubini-Study form.

The number of *positions* and *momenta* matches; symplectic structure
is the geometric statement that they're paired.

## Hamiltonian flow

For $H : M \to \mathbb R$, the **Hamiltonian vector field** $X_H$
defined by

$$
\omega(X_H, \cdot) = -dH.
$$

Hamilton's equations:

$$
\dot q_i = \frac{\partial H}{\partial p_i}, \quad \dot p_i = -\frac{\partial H}{\partial q_i}.
$$

The flow $\Phi^{X_H}_t$ preserves $\omega$ — **Liouville's theorem**:
phase-space volume is conserved.

## Poisson brackets

For functions $f, g$ on $M$:

$$
\{f, g\} = \omega(X_f, X_g).
$$

In coordinates: $\{f, g\} = \sum (\partial_q f \partial_p g - \partial_p f \partial_q g)$.

Hamilton's equations: $\dot f = \{f, H\}$.

The Poisson bracket gives a Lie-algebra structure on smooth functions
— foundation of classical mechanics' Lie-bracket structure.

## Worked example: harmonic oscillator

$M = \mathbb R^2$ with $(q, p)$ coordinates, $\omega = dp \wedge dq$.
$H = (p^2 + q^2)/2$.

Hamilton's equations: $\dot q = p, \dot p = -q$. Solution:
$q(t) = q_0 \cos t + p_0 \sin t$, $p(t) = -q_0 \sin t + p_0 \cos t$.
Circles in phase space. Energy preserved.

## Interactive

:::widget type=numeric-input prompt="Symplectic manifold: dim $2n$ with closed non-degenerate 2-form. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liouville: Hamiltonian flow preserves volume. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$T^* M$ symplectic dim = $2 \\cdot \\dim M$. For $\\dim M = 3$: $?$" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="Hamilton: $\\dot q = \\partial H/\\partial p$, $\\dot p = -\\partial H/\\partial q$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Lagrangian submanifold**: $L \subset M$ with $\omega|_L = 0$ and
$\dim L = n = \dim M / 2$. Examples: graphs of closed 1-forms.

**Symplectomorphisms**: diffeomorphisms preserving $\omega$. Form a
huge group; flexibility theorems say "everything is symplectic-locally
the same" (Darboux theorem).

**Floer homology**: infinite-dimensional Morse theory on a
symplectomorphism group. Used to prove Arnold's conjectures on
fixed points.

**Mirror symmetry**: a deep duality between symplectic geometry and
complex geometry; Calabi-Yau manifolds and their mirrors.

## Computational

```python
import numpy as np

# Harmonic oscillator: phase-space simulation
# Energy-preserving symplectic integrator: leapfrog (Verlet)

def leapfrog_step(q, p, dt):
    p_half = p - 0.5 * dt * q          # half kick (force = -q)
    q_new = q + dt * p_half             # drift
    p_new = p_half - 0.5 * dt * q_new   # half kick
    return q_new, p_new

# Simulate
q, p = 1.0, 0.0
T = 100
dt = 0.01
energies = []
for _ in range(int(T / dt)):
    q, p = leapfrog_step(q, p, dt)
    energies.append((p**2 + q**2) / 2)

print("Energy drift over T=100:")
print(min(energies), max(energies))   # very small drift — symplectic preserves energy ~exactly

# Compare to non-symplectic Euler
def euler_step(q, p, dt):
    return q + dt * p, p - dt * q

q, p = 1.0, 0.0
energies_euler = []
for _ in range(int(T / dt)):
    q, p = euler_step(q, p, dt)
    energies_euler.append((p**2 + q**2) / 2)

print("Euler energy drift:")
print(min(energies_euler), max(energies_euler))   # systematic drift!
```

## Applied

- **Hamiltonian Monte Carlo (HMC)** — uses symplectic integrators
  to sample posteriors in Bayesian inference; Stan, PyMC implement
  No-U-Turn Sampler (NUTS).
- **Physics simulation** — N-body, molecular dynamics use symplectic
  integrators (Verlet, leapfrog) for long-term energy conservation.
- **Computer graphics** — physically-based animation uses geometric
  integrators.
- **Quantum mechanics** — phase-space methods (Wigner function,
  Husimi) use symplectic structure.
- **Optimal control** — Pontryagin's maximum principle is symplectic
  geometry on adjoint phase space.

## Check Your Understanding

:::widget type=numeric-input prompt="Symplectic form: closed and non-degenerate. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Liouville's theorem: Hamiltonian flow preserves phase-space volume. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Symplectic integrators preserve energy approximately for long times. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="HMC uses symplectic integration for sampling. Type 1." answer=1 explain="Yes.":::
