---
strand: uncertainty
level: advanced
order: 0
title: Why Measure Theory?
prerequisites:
  - tier: strand-6-uncertainty-intermediate
    slug: 09-uncertainty-capstone-2
    description: Intermediate uncertainty capstone
connections:
  - strand-6-uncertainty-advanced/01-sigma-algebras
applications:
  - cs: "Foundation of modern probability and stochastic processes"
  - life: "Why naive 'volume' breaks for arbitrary subsets"
---

# Why Measure Theory?

## Explain Like I Am 7

You'd think you can ask "what's the length of *any* set of points on
a number line?" — the length of a stick is its size, easy.  But it
turns out some sets are so weirdly torn apart that no sensible
length-rule works for them at all.  There's even a paradox showing
you can chop a ball into a few of these weird pieces and rearrange
them into *two* full balls.  **Measure theory** is the careful
discipline of saying which sets are well-behaved enough to be
assigned a size, and only ever measuring those.

## Mental

In Strand 6 Foundation we worked with finite or countable sample
spaces — coins, dice, lists. In Intermediate we touched continuous
distributions like the Gaussian. Now: how do we make all this
*rigorous*?

The naive idea: **assign a "volume" to every subset of $\mathbb{R}^n$**.
Surprisingly, this is impossible — there exist subsets so badly-
behaved that no consistent assignment exists.

Measure theory's response: **restrict** to a class of "measurable"
sets, and *only assign volumes to those*. This restriction is what
makes integration, probability, and analysis work.

## The Banach-Tarski paradox

Using the Axiom of Choice, you can decompose a solid 3-ball into
**five** pieces and rearrange them (by rigid motions only) into
**two** copies of the original ball.

The pieces aren't measurable in the Lebesgue sense — they're so
fragmentary that "volume" doesn't apply.

Lesson: not all subsets of $\mathbb{R}^n$ deserve a volume. Measure
theory is about being careful which ones do.

## The Vitali set

A simpler example: define an equivalence relation on $[0, 1]$ by
$x \sim y \iff x - y \in \mathbb{Q}$. Pick (using AC) one
representative from each equivalence class. Call this set $V$.

If $V$ had a Lebesgue measure $m(V)$, the translates $V_q = V + q \mod 1$
for $q \in \mathbb{Q} \cap [0, 1]$ would partition $[0, 1]$ into
countably many disjoint sets of equal measure $m(V)$. Total measure
must be 1. But $\sum_q m(V) = 0$ if $m(V) = 0$, $\infty$ otherwise —
contradiction.

So $V$ is **not measurable**. AC produces it; measure theory exiles it.

## What we want from a "measure"

A measure $\mu$ on a space $X$ should satisfy:

- $\mu(\emptyset) = 0$.
- $\mu(A) \ge 0$ for measurable $A$.
- **Countable additivity**: $\mu\left(\bigcup A_i\right) = \sum \mu(A_i)$
  for disjoint countable $\{A_i\}$.

Domain of $\mu$ is a **$\sigma$-algebra** of measurable sets — the
Lesson 01 topic.

## Interactive

:::widget type=numeric-input prompt="The Banach-Tarski paradox uses the Axiom of Choice. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Vitali set on $[0, 1]$ is non-Lebesgue-measurable. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A measure must be countably additive on disjoint unions. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Measure theory restricts to measurable sets to avoid paradoxes. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Three foundational theorems** measure theory unlocks:

- **Monotone Convergence Theorem** — $f_n \uparrow f$ pointwise
  $\Rightarrow \int f_n \to \int f$.
- **Dominated Convergence Theorem** — $|f_n| \le g$ integrable,
  $f_n \to f$ pointwise $\Rightarrow \int f_n \to \int f$.
- **Fubini-Tonelli** — interchange order of integration when
  measurable & non-negative or absolutely integrable.

These are the three workhorses of analysis and probability theory.

## Computational

```python
# Convergence intuition: Riemann vs Lebesgue
# Indicator of rationals on [0, 1]: Riemann-non-integrable
# But Lebesgue-integrable with integral 0 (rationals have measure 0)

# Construct Cantor set: a measure-0 uncountable set
def cantor_decimal_in(x, depth=20):
    for _ in range(depth):
        x *= 3
        if 1 <= x < 2: return False
        if x >= 2: x -= 2
    return True

print(cantor_decimal_in(0.5))     # False — 0.5 maps to ternary 1...
print(cantor_decimal_in(1/3))     # True
print(cantor_decimal_in(0.25))    # ?

# Numerical sanity: measure-zero sets contribute nothing to Lebesgue integral
import numpy as np
xs = np.linspace(0, 1, 100000)
# Indicator of rationals (in float, only finitely many — measure 0)
# Lebesgue integral over [0, 1] = 0
print(np.mean(0 * xs))            # 0 — corresponding numeric integral
```

## Applied

- **Probability foundations** — Kolmogorov 1933 axiomatised
  probability via measure theory; everything in modern probability
  rests on this.
- **Stochastic processes** — Brownian motion, martingales, Ito
  calculus all need measure-theoretic foundations.
- **Functional analysis** — $L^p$ spaces are normed spaces of
  equivalence classes of measurable functions.
- **Quantum mechanics** — observables are self-adjoint operators on
  $L^2$; spectral theorem requires measure theory.
- **Statistical learning theory** — concentration inequalities,
  Glivenko-Cantelli theorem, all rest on measure-theoretic
  foundations.

## Check Your Understanding

:::widget type=numeric-input prompt="Banach-Tarski uses non-measurable pieces. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="A countable set has Lebesgue measure 0. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Measure must be countably additive. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Kolmogorov founded modern probability on measure theory in 1933. Type 1." answer=1 explain="Yes.":::
