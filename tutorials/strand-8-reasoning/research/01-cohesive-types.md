---
strand: reasoning
level: research
order: 1
title: Cohesive Type Theory and Synthetic Differential Geometry
prerequisites:
  - tier: strand-8-reasoning-research
    slug: 00-infinity-topos-theory
    description: $\infty$-topos theory
connections:
  - strand-8-reasoning-research/02-modal-type-theory
applications:
  - cs: "Synthetic mathematics, formalised physics, dependent-type theory extensions"
  - life: "Geometry done axiomatically inside type theory"
---

# Cohesive Type Theory and Synthetic Differential Geometry

## Mental

A **cohesive type theory** equips HoTT with extra **modalities** —
operators on types — that capture geometric "cohesion": the idea
that points in a space stick together smoothly.

**Synthetic differential geometry (SDG)**: do calculus inside type
theory, with infinitesimals as actual elements of the type, not
limits.

**Schreiber + Shulman (2012–)**: cohesive HoTT formalised, modelled
by cohesive $\infty$-toposes (Strand 8 Research Lesson 00).

## The cohesive modalities

Four adjoint modalities $\flat \dashv \sharp$ and a shape $\int$:

| Modality | Reads as | Geometric meaning |
|---|---|---|
| $\int X$ | shape | underlying homotopy type — forget geometry |
| $\flat X$ | flat | discrete underlying type — forget cohesion |
| $\sharp X$ | sharp | codiscrete — every two points are "the same" cohesion-wise |

A type $X$ is **discrete** if $\flat X \to X$ is an equivalence;
**codiscrete** if $X \to \sharp X$ is.

## Synthetic infinitesimals

In SDG: define $D := \{ x : R \mid x^2 = 0 \}$ — the type of
**nilpotent infinitesimals**.

**Kock-Lawvere axiom**: every $f : D \to R$ is uniquely
$f(d) = f(0) + d \cdot f'(0)$ for some $f'(0) : R$.

So derivatives are **inherent** in the type structure; no limits
needed. Calculus becomes a definitional unfolding.

## Worked example

$f(x) = x^2$. For $d : D$:

$$f(x + d) = (x + d)^2 = x^2 + 2xd + d^2 = x^2 + 2xd$$

(since $d^2 = 0$). Comparing with $f(x) + d \cdot f'(x)$:

$$f'(x) = 2x.$$

No limits, no $\varepsilon$-$\delta$. The infinitesimal *is* in the
type.

## Interactive

:::widget type=numeric-input prompt="Cohesive HoTT: extra modalities for geometric cohesion. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="SDG: $f'(x)$ for $f(x) = x^2$ via Kock-Lawvere. Compute." answer=2 explain="$f'(x) = 2x$; coefficient at $x = 1$ is 2.":::

:::widget type=numeric-input prompt="Shape modality $\\int X$ forgets geometry. Type 1." answer=1 explain="Yes — shape is the underlying homotopy type.":::

:::widget type=numeric-input prompt="Flat modality $\\flat X$ underlying discrete type. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Differential cohomology**: in cohesive HoTT, classifying types for
gauge fields are first-class. $B^n U(1)_{\text{conn}}$ classifies
$U(1)$-gauge fields with curvature.

**Modalities as monads / comonads**: $\sharp$ is a monad, $\flat$ a
comonad, with $\flat \dashv \sharp$.

**Real-cohesion**: cohesion modelled by smooth-set $\infty$-topos.
Used to formalise smooth manifolds, Lie groups, principal bundles
synthetically.

**Differential cohesion**: even more modalities for distinguishing
infinitesimal vs finite.

## Computational

```python
# Kock-Lawvere style symbolic differentiation
import sympy as sp

x, d = sp.symbols('x d')

def kock_lawvere_diff(f_expr):
    """Compute f'(x) via expansion in nilpotent d (d^2 = 0)."""
    expanded = sp.expand(f_expr.subs(x, x + d))
    # Drop d^2 and higher
    truncated = sp.Poly(expanded, d).coeffs()
    if len(truncated) >= 2:
        # coefficient of d
        return truncated[-2]
    return 0

print("d/dx(x^2) =", kock_lawvere_diff(x**2))      # 2x
print("d/dx(x^3) =", kock_lawvere_diff(x**3))      # 3x^2
print("d/dx(sin(x)) ~ symbolic; SDG axiom restricts to polynomials")
print()
print("Cohesive HoTT formalisations: Agda (Felix Cherubini), urs Schreiber's")
print("nLab corpus. Differential cohomology computed synthetically.")
```

## Applied

- **Formalised physics** — gauge theory, supergravity in cohesive
  HoTT.
- **Synthetic differential geometry** — alternative foundation for
  smooth analysis.
- **Type theory extensions** — modalities propagate to dependent type
  theory generally.
- **Schreiber's program** — string theory and M-theory formulations.
- **Robust derivatives** — symbolic differentiation tools inspired by
  SDG semantics.

## Check Your Understanding

:::widget type=numeric-input prompt="Cohesive HoTT modalities: $\\int, \\flat, \\sharp$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kock-Lawvere axiom: derivatives inherent in type. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$f'(x) = 2x$ for $f(x) = x^2$ via SDG. At $x=3$, $f'(3) = ?$" answer=6 explain="$2 \\cdot 3 = 6$.":::

:::widget type=numeric-input prompt="Schreiber program: cohesive HoTT for physics. Type 1." answer=1 explain="Yes.":::
