---
strand: uncertainty
level: research
order: 0
title: Schramm-Loewner Evolution (SLE)
prerequisites:
  - tier: strand-6-uncertainty-master
    slug: 09-uncertainty-master-capstone
    description: Uncertainty master capstone
connections:
  - strand-6-uncertainty-research/01-liouville-quantum-gravity
applications:
  - cs: "Random fractals; statistical-mechanics universality"
  - life: "Conformally invariant random curves in 2D"
---

# Schramm-Loewner Evolution (SLE)

## Explain Like I Am 7

Imagine a tiny ant drawing a wiggly line on a sheet of paper, but
the wiggle is *random*, like a Brownian path.  Schramm asked: which
random scribbles look the same after you stretch or rotate the
paper without tearing it?  The answer is a single magical family
of curves called **SLE**, controlled by one dial $\kappa$.  At
$\kappa = 6$ the SLE curve is the boundary you'd see in the
critical phase transition of percolation, and other $\kappa$ values
match other physics models.  One ant, infinite physics.

## Mental

**Schramm-Loewner Evolution** $\mathrm{SLE}_\kappa$ (Schramm 2000): a
1-parameter family of random curves in 2D, characterised by:

- **Conformal invariance**.
- **Domain Markov property**.

Encodes scaling limits of critical 2D statistical-physics models.

## Definition via Loewner equation

Let $g_t : H_t \to \mathbb H$ be the conformal map from the slit
upper half plane $H_t$ (slit by SLE curve up to time $t$). Loewner
equation:

$$
\partial_t g_t(z) = \frac{2}{g_t(z) - U_t}, \quad g_0(z) = z,
$$

where $U_t = \sqrt \kappa B_t$ for a standard Brownian motion $B_t$.

Schramm: this single-parameter family contains all conformally-
invariant random curves with domain Markov property.

## Universality results

**Smirnov 2001**: critical site percolation on triangular lattice
converges to $\mathrm{SLE}_6$ (Fields medal 2010).

**Smirnov 2007**: 2D Ising spin cluster boundaries converge to
$\mathrm{SLE}_3$.

**Lawler-Schramm-Werner 2004**: loop-erased random walk → $\mathrm{SLE}_2$;
uniform spanning tree boundaries → $\mathrm{SLE}_8$.

**Werner Fields medal 2006** for SLE / 2D-statistical-physics work.

## Phase classification by $\kappa$

| $\kappa$ range | Behaviour |
|---|---|
| $0 < \kappa \le 4$ | Simple curves (no self-touching) |
| $4 < \kappa < 8$ | Self-touching but not space-filling |
| $\kappa = 8$ | Space-filling |
| $\kappa > 8$ | Self-intersecting |

## Interactive

:::widget type=numeric-input prompt="SLE: Schramm 2000. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SLE_κ: $U_t = \\sqrt \\kappa B_t$ in Loewner equation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Smirnov: percolation → SLE_6 (Fields 2010). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Werner Fields 2006 for SLE work. Type 1." answer=1 explain="Yes.":::

## Symbolic

**SLE duality**: $\mathrm{SLE}_\kappa$ for $\kappa$ small ↔
$\mathrm{SLE}_{16/\kappa}$ for $\kappa$ large; geometric duality
between simple-curve and space-filling regimes.

**Restriction property**: certain $\mathrm{SLE}_{8/3}$ invariance;
realised by self-avoiding walk scaling limit (conjectured).

**SLE on Riemann surfaces**: extension to higher-genus geometries.

**Liouville quantum gravity** (Lesson 01): natural Riemannian metric
into which SLE embeds; deep connection.

## Computational

```python
import numpy as np

# Simulate SLE_κ via Loewner equation
def simulate_sle(kappa, T=1.0, N=10000):
    """Generate driving function U_t = sqrt(κ) B_t."""
    dt = T / N
    U = np.cumsum(np.sqrt(kappa * dt) * np.random.randn(N))
    return U

# κ = 6 (percolation universality class)
U = simulate_sle(6)
print(f"SLE_6 driving function: |max U| = {np.max(np.abs(U)):.4f}")
print(f"Theoretical std at T = 1: sqrt(κ) = {np.sqrt(6):.4f}")

# Tracing the actual SLE curve from U requires numerically inverting
# the Loewner equation — significant computation
print("Tracing SLE curve: discretise Loewner ODE, harder than driving fn.")

# Different κ values give qualitatively different curves
for k in [2, 3, 4, 6, 8, 8/3]:
    print(f"SLE_{k}: corresponds to ", end="")
    descriptions = {
        2: "loop-erased random walk",
        3: "Ising cluster boundary",
        4: "Gaussian free field level set",
        6: "site percolation interface",
        8: "uniform spanning tree (space-filling)",
        8/3: "self-avoiding walk (conjectured)"
    }
    print(descriptions.get(k, "..."))
```

## Applied

- **Statistical mechanics universality** — SLE describes scaling
  limits of many critical 2D models.
- **Random fractals** — SLE curves have specific Hausdorff dimensions.
- **Liouville quantum gravity** (next lesson) — SLE + LQG
  combine in mating-of-trees, KPZ-on-LQG.
- **Mathematical physics** — connection to conformal field theory,
  central charge.
- **Random walk algorithms** — loop-erasure, uniform spanning tree
  rigorously characterised.

## Check Your Understanding

:::widget type=numeric-input prompt="SLE: 1-parameter family of conformally-invariant random curves. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Smirnov: percolation → SLE_6. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Werner Fields 2006. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SLE_2 = loop-erased random walk scaling limit. Type 1." answer=1 explain="Yes.":::
