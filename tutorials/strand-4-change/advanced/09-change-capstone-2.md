---
strand: change
level: advanced
order: 9
title: Capstone — Multivariable Calculus in Practice
prerequisites:
  - tier: strand-4-change-advanced
    slug: 08-stokes-and-divergence
    description: Stokes and divergence
connections:
  - strand-7-computation-intermediate/09-computation-capstone-2
  - strand-2-structure-intermediate/09-structure-capstone-2
applications:
  - cs: "Backprop end-to-end, normalizing flows, physics-informed nets"
  - life: "Where multivariable calculus actually shows up"
---

# Capstone — Multivariable Calculus in Practice

## Mental

Nine lessons on:

- **Partial derivatives and gradient** (Lesson 00).
- **Directional derivatives and tangent planes** (Lesson 01).
- **Multivariable chain rule and Jacobian** (Lesson 02).
- **Critical points and the second-derivative test** (Lesson 03).
- **Lagrange multipliers** (Lesson 04).
- **Multiple integrals** (Lesson 05).
- **Change of variables and Jacobian determinant** (Lesson 06).
- **Vector fields and line integrals** (Lesson 07).
- **Green, Stokes, and divergence** (Lesson 08).

This is the multivariable calculus of the typical second-year
university course. Three integrated walkthroughs to bring it
together.

## Walkthrough 1: training a neural net

Pure multivariable calculus, end to end:

1. **Forward pass** — composed Jacobians (Lesson 02), one per layer.
2. **Loss** $L(\theta)$ — function of millions of parameters.
3. **Gradient** $\nabla_\theta L$ (Lesson 00) — computed via reverse-
   mode autodiff (the chain rule applied right-to-left).
4. **Update** — $\theta \leftarrow \theta - \eta \nabla_\theta L$
   (gradient descent — Lesson 00 says move opposite to ∇).
5. **Convergence concerns** — saddle points (Lesson 03), local
   minima, escape via momentum and noise.
6. **Constrained training** — weight clipping, KL constraints; KKT
   conditions (Lesson 04).

Every concept here is applied at scale.

## Walkthrough 2: Bayesian inference and normalizing flows

Train a neural network $f_\theta$ that maps a simple prior
$z \sim \mathcal{N}(0, I)$ to a target distribution. The change-of-
variables formula (Lesson 06):

$$
\log p(\mathbf{x}) = \log p(z) - \log |\det J_{f_\theta}(z)|.
$$

Minimise negative log-likelihood by gradient descent on $\theta$.
The log-det-Jacobian must be **tractable** — invertible architectures
(coupling layers, spline flows) keep it computable.

Why care? Sampling becomes easy ($f_\theta(z)$), and density
$p(\mathbf{x})$ is exact — useful for outlier detection, Bayesian
inference, and likelihood-based generative modeling.

## Walkthrough 3: physics-informed neural networks

Solve a PDE (e.g., heat equation $\partial_t u = \alpha \Delta u$)
by training a network $u_\theta(x, t)$ to satisfy:

- Boundary conditions: $u_\theta(\partial \Omega, t) = $ given.
- PDE residual: $\partial_t u_\theta - \alpha \Delta u_\theta \approx 0$
  at sampled interior points.

The residual loss requires **second derivatives** of the network
w.r.t. inputs (Hessian, Lesson 03). Modern frameworks (PyTorch,
JAX) can compute these via composed reverse-mode autodiff.

Result: a continuous PDE solution that doesn't require a mesh.
Useful for high-dimensional PDEs (Black-Scholes for many assets,
quantum many-body problems).

## Roadmap

**Strand 4 Master** picks up:

- Calculus of variations and Euler-Lagrange equations.
- Differential equations (ODEs and PDEs in depth).
- Differential forms and exterior calculus.
- Reverse-mode AD as adjoint method.
- Measure theory and Lebesgue integration.
- Stochastic calculus (Itô / Stratonovich).

**Strand 4 Research-adjacent**: differential geometry, geometric
analysis, optimal transport, Hamilton-Jacobi-Bellman, infinite-
dimensional analysis.

## Closing

Multivariable calculus is the bridge between *one-dimensional
intuition* and *real-world systems*, which always have many
parameters. Every modern computational problem — ML training,
physical simulation, generative modeling, optimisation under
constraint — involves derivatives, integrals, and constraint
analysis in many dimensions.

When you see backprop, KKT conditions, normalizing flows, finite-
element methods, or Maxwell's equations, you're seeing this
strand-level applied. *Most of applied mathematics is
multivariable calculus dressed up.*

## Interactive

:::widget type=numeric-input prompt="Backprop = chain rule of Jacobians. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$|\\det J|$ enters change-of-variable formulas. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Lagrange multipliers handle equality constraints; KKT handles inequalities. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Stokes/divergence theorems convert between boundary and interior integrals. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Most critical points of high-dimensional loss surfaces are saddles. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Gaussian integral $\\int e^{-x^2} dx = \\sqrt{\\pi}$. Computed via polar change of variables. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A field is conservative iff $\\mathrm{curl}\\,\\mathbf{F} = 0$ (in simply connected domain). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\nabla f$ at a point on a level set is perpendicular to the level set there. Type 1." answer=1 explain="Yes.":::
