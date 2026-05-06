---
strand: change
level: research
order: 9
title: Capstone — Calculus at the Frontier
prerequisites:
  - tier: strand-4-change-research
    slug: 08-pde-on-manifolds
    description: PDEs on manifolds
connections:
  - strand-4-change-master/09-change-master-capstone
applications:
  - cs: "Modern AI, mathematical physics, scientific computing frontier"
  - life: "The state of analysis in 2026"
---

# Capstone — Calculus at the Frontier

## Explain Like I Am 7

Up here at the very edge of the map, every direction has open
questions.  Coffee fronts that all wrinkle alike, robots that
un-fuzz pictures, ants who only react to the crowd, learning
machines whose training paths are still half-mystery.  In this
capstone you take one such living puzzle, decide which mix of
ideas — random jitter, geometric flow, mean-field crowd, neural
net theory — to bring to the fight, and try to make a small new
dent in something that nobody fully understands yet.

## Mental

Nine lessons on:

- **Rough paths and regularity structures** (Lesson 00).
- **KPZ equation** (Lesson 01).
- **Mean-field games** (Lesson 02).
- **NN approximation theory** (Lesson 03).
- **NTK / feature learning** (Lesson 04).
- **Deep-learning dynamics** (Lesson 05).
- **Diffusion models** (Lesson 06).
- **Generative flows / continuous-time ML** (Lesson 07).
- **PDEs on manifolds / geometric flows** (Lesson 08).

You've reached the calculus frontier of 2026.

## Three integrated walkthroughs

### Mathematical foundations of generative AI

Modern image / video / audio generation:

- **Forward SDE** noises data (Brownian, Lesson 06).
- **Score function** $\nabla \log p_t$ learned by NN.
- **Reverse SDE / probability flow ODE** generates samples
  (Lesson 06).
- **Flow matching** (Lesson 07) often beats diffusion in practice.
- **Theoretical analysis** uses score matching, KL divergences,
  Wasserstein gradient flows.

State-of-art generative models (Stable Diffusion 3, Sora) sit
exactly at the intersection of these techniques.

### Theoretical understanding of foundation models

LLM training and behaviour analysis:

- **Approximation theory** (Lesson 03) — what NNs *can* learn.
- **NTK / feature learning** (Lesson 04) — what training *does*.
- **Scaling laws** (Lesson 05) — *how much* compute / data.
- **Phase transitions / grokking** (Lesson 05) — *when*
  capabilities emerge.
- **Mechanistic interpretability** — opening the black box.

Active research community: Anthropic, DeepMind, OpenAI, academic
groups.

### Geometric ML at scale

Modern ML increasingly geometric:

- **Equivariant networks** on Riemannian manifolds (Lessons in
  Strand 3).
- **Heat / Ricci-flow-style smoothing** on data manifolds (Lesson 08).
- **Optimal transport** for distribution matching (Strand 6 Master
  Lesson 07).
- **Persistent homology** features (Strand 3 Research Lesson 07).
- **Wasserstein gradient flows** for generative AI (Lesson 06-07).

Bridges classical analysis to modern industrial ML.

## Roadmap beyond Research-adjacent

Active future directions:

- **AI-assisted PDE discovery** — neural operators learning physical
  laws.
- **Verified scientific computing** — rigorous bounds on numerical
  PDE solutions.
- **Theoretical foundations of LLMs** — alignment of empirical
  scaling with theoretical predictions.
- **Continuous-time RL theory** — stochastic optimal control on
  policy distributions.
- **Hybrid AI-PDE methods** — neural acceleration of classical
  solvers.

## Closing

Calculus in 2026 is *the* mathematical infrastructure of:

- **Generative AI** (every major model uses calculus / SDE / ODE).
- **Scientific computing** (climate, fluids, structure).
- **Theoretical ML** (approximation, NTK, scaling).
- **Mathematical physics** (KPZ, rough paths, gauge theory).
- **Engineering** (optimal control, finance).

The strand began with rates of change; it ends at the frontier
where calculus, ML theory, and scientific computing converge.

## Interactive

:::widget type=numeric-input prompt="Diffusion model reverse SDE uses score $\\nabla \\log p_t$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="NTK: infinite-width NN ↔ kernel regression. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="KPZ proven rigorously by Hairer (Fields 2014). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Flow matching beats diffusion for some tasks. Type 1." answer=1 explain="Yes.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Lyons rough paths: 1998. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Mean-field games: Lasry-Lions / CHM ~2006. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Double descent past interpolation threshold. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hodge theorem: harmonic forms = cohomology. Type 1." answer=1 explain="Yes.":::
