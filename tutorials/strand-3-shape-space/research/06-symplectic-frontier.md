---
strand: shape-space
level: research
order: 6
title: Symplectic Topology Frontier
prerequisites:
  - tier: strand-3-shape-space-research
    slug: 05-ricci-flow-deeper
    description: Ricci flow deeper
connections:
  - strand-3-shape-space-research/07-tda-frontier
applications:
  - cs: "Hamiltonian dynamics, mathematical physics"
  - life: "Open problems in symplectic topology"
---

# Symplectic Topology Frontier

## Explain Like I Am 7

The math of swings and pendulums — where every spot has both a
position and a wiggle-speed — turns out to have its *own*
"area-meter" that never lies.  At the frontier, mathematicians ask
naughty questions about it: can you squish one swingy region inside
another?  Are there hidden swingy paths that always come back to
where they started?  These puzzles are still being chipped away at
today, and the answers shape what we know about chaos, planets, and
quantum physics.

## Mental

Strand 3 Master Lesson 06 introduced symplectic geometry. Frontier
problems:

## Symplectic embedding problems

When can $(B^4(r), \omega_{\rm std})$ symplectically embed into a
ball / cylinder / target?

**Gromov nonsqueezing** (1985): $B^{2n}(r)$ embeds symplectically
into $B^2(R) \times \mathbb R^{2n - 2}$ iff $r \le R$.

A *codimension-2* obstruction — completely different from volume
considerations.

**Symplectic capacities**: numerical invariants distinguishing
embedding behaviour. ECH (Embedded Contact Homology) capacities
(Hutchings) give sharp bounds.

## Closing geodesics on convex surfaces

**Birkhoff conjecture**: every smooth convex surface in $\mathbb R^3$
has a closed geodesic.

**Three closed geodesics** (Lyusternik-Shnirelman 1929) for every
Riemannian sphere. Generalising to higher dim is open.

**Yau conjecture** (closed minimal hypersurfaces): every closed
Riemannian manifold of dim $\ge 2$ has infinitely many closed
minimal hypersurfaces. **Proven** by Marques-Neves + Liokumovich
+ Song (2014-2018).

## Arnold conjectures and their generalisations

Arnold's fixed-point conjecture for Hamiltonian symplectomorphisms
proven; many generalisations open:

- **Hofer geometry** of $\mathrm{Ham}(M)$ — group of Hamiltonian
  diffeos has bi-invariant metric.
- **Quasi-states / quasi-morphisms** on $\mathrm{Ham}$ — yields
  rigidity / displacement results.

## Interactive

:::widget type=numeric-input prompt="Gromov nonsqueezing: $B^{2n}(r) \\to B^2(R) \\times \\mathbb R^{2n-2}$ iff $r \\le R$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ECH capacities (Hutchings) sharpen embedding bounds. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Marques-Neves proved Yau closed-minimal-hypersurface conjecture. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hofer metric: bi-invariant metric on $\\mathrm{Ham}(M)$. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Contact topology**: odd-dimensional analogue of symplectic.
**Reeb dynamics** classify contact structures.

**Heegaard-Floer** (Ozsváth-Szabó): topological invariants of
3-manifolds via Lagrangian Floer in symmetric products.

**Embedded contact homology** (ECH, Hutchings): refined invariants
of contact 3-manifolds.

**Symplectic field theory** (SFT, Eliashberg-Givental-Hofer):
unified framework for all symplectic / contact invariants.

## Computational

```python
# Symplectic topology computations are research-grade
# Sketch: Gromov nonsqueezing intuition

import math

def symplectic_capacity_ball(r):
    """Gromov capacity of a ball of radius r is π r²."""
    return math.pi * r * r

# B^4(r) embeds symplectically into B^2(R) × R^2 iff π r² ≤ π R²
def gromov_nonsqueeze_check(small_r, big_R):
    return symplectic_capacity_ball(small_r) <= symplectic_capacity_ball(big_R)

print(gromov_nonsqueeze_check(2, 1))   # False — too big to squeeze
print(gromov_nonsqueeze_check(1, 2))   # True — fits

# Note: classical volume comparison would allow much larger r;
# Gromov obstruction is genuinely *symplectic*.

# Ellipsoid embedding capacities (McDuff): Fibonacci-like sequences
# E(1, b) embeds in B^4(c) iff specific sequence inequalities
print("McDuff: ellipsoid embedding sequence has Fibonacci structure.")
```

## Applied

- **Hamiltonian mechanics** — symplectic rigidity restricts
  long-time behaviour.
- **Mathematical physics** — symplectic methods foundational.
- **Algebraic geometry** — Fukaya category gives algebraic flavor.
- **Geometric quantization** — symplectic manifolds as classical
  phase spaces; quantize to Hilbert spaces.
- **Symplectic field theory** in superstring theory.

## Check Your Understanding

:::widget type=numeric-input prompt="Gromov nonsqueezing: codim-2 obstruction. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Yau conjecture proven by Marques-Neves + Liokumovich + Song. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="ECH capacities sharpen bounds. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hofer metric bi-invariant on $\\mathrm{Ham}$. Type 1." answer=1 explain="Yes.":::
