---
strand: pattern-counting
level: research
order: 6
title: Symmetric Functions Frontier
prerequisites:
  - tier: strand-5-pattern-counting-research
    slug: 05-randomness-extraction
    description: Randomness extraction
connections:
  - strand-5-pattern-counting-research/07-tropical-geometry-deeper
applications:
  - cs: "Combinatorial Hopf algebras, integrable systems"
  - life: "Macdonald polynomials and beyond"
---

# Symmetric Functions Frontier

## Mental

Strand 5 Master Lesson 01 introduced the symmetric functions ring
$\Lambda$ with bases $m, p, e, h, s$. Frontier:

## Macdonald polynomials

**Macdonald polynomials** $P_\lambda(q, t)$ — 2-parameter
$(q, t)$-deformation of Schur functions, indexed by partitions
$\lambda$.

- $q = t$: Schur.
- $q = 0$: Hall-Littlewood.
- $t = 1$: monomial.
- $q = t^\alpha$: Jack polynomials.

A central object of modern algebraic combinatorics.

**Macdonald positivity** (Haiman 2001): coefficients in
$P_\lambda$ expansion are non-negative integers.

## Modified Macdonald polynomials

$\tilde H_\mu(x; q, t)$ — combinatorial formula via "filings" (Haiman,
Haglund-Haiman-Loehr 2005). Reveals deep connections to
$\mathrm{GL}_n$ representation theory.

## Affine and elliptic generalisations

- **Affine Macdonald polynomials**: extension to affine root
  systems.
- **Elliptic Macdonald polynomials** (Spiridonov-Warnaar):
  $q$-deformation involving elliptic functions.
- **Quantum Macdonald**: tied to quantum groups.

## Worked example: $P_{(2)}(x; q, t)$

For partition $(2)$:

$$
P_{(2)}(x_1, x_2; q, t) = m_2 + \frac{(1 - q)(1 - t^2)}{(1 - q t)(1 - t)} m_{1, 1}.
$$

At $q = t$: equals Schur $s_{(2)} = m_2 + m_{1, 1}$.

## Interactive

:::widget type=numeric-input prompt="Macdonald polynomials: $(q, t)$-deformation of Schur. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Haiman 2001: positivity conjecture proven. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Modified Macdonald via Haglund-Haiman-Loehr (2005). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Macdonald specialises to Schur, Jack, HL, monomial. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Affine Lie algebra reps**: connection between Macdonald and
representation theory of affine Lie algebras / quantum groups.

**Combinatorial $K$-theory**: Grothendieck polynomials, dual
Grothendieck polynomials; $K$-theoretic Schubert calculus.

**LLT polynomials** (Lascoux-Leclerc-Thibon): connect to combinatorics
of Hecke algebra at roots of unity.

**Schur expansion of Macdonald**: $\tilde H_\mu = \sum_\lambda
\tilde K_{\lambda \mu}(q, t) s_\lambda$ — LLT-style positivity.

## Computational

```python
import sympy as sp

# Compute small Macdonald polynomials symbolically
q, t, x1, x2 = sp.symbols("q t x1 x2")

# P_{(1)}: just x_1 + x_2 + ... (linear part)
P_1 = x1 + x2
print(f"P_(1) = {P_1}")

# P_{(2)}: with two variables
P_2 = x1**2 + x2**2 + (1 - q) * (1 - t**2) / ((1 - q*t) * (1 - t)) * x1 * x2
print(f"P_(2)(x1, x2; q, t) = {sp.simplify(P_2)}")

# At q = t: should reduce to Schur s_(2) = x_1² + x_1 x_2 + x_2²
P_2_qt = P_2.subs(q, t)
print(f"P_(2) at q = t: {sp.simplify(P_2_qt)}")    # x1^2 + x1*x2 + x2^2

# Macdonald polynomials: SageMath has comprehensive symfunc package
print("Macdonald polynomials: SageMath sage.combinat.sf.macdonald.")
```

## Applied

- **Algebraic combinatorics** — Macdonald polynomials *the* central
  object.
- **Mathematical physics** — Macdonald polynomials appear in
  Calogero-Sutherland models, instanton partition functions,
  AGT correspondence.
- **Geometric representation theory** — Hilbert schemes connect to
  Macdonald.
- **Knot polynomials** — HOMFLY-PT invariants from Macdonald-style
  refinements.
- **Quantum geometric Langlands** — Macdonald appears in
  formulations.

## Check Your Understanding

:::widget type=numeric-input prompt="Macdonald polynomials $(q, t)$-deformation. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Haiman 2001 positivity. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Macdonald specialise to Schur (q = t), Jack, HL. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="LLT polynomials connect Macdonald and Hecke algebras. Type 1." answer=1 explain="Yes.":::
