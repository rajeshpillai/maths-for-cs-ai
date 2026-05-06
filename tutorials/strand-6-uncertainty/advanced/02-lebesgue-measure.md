---
strand: uncertainty
level: advanced
order: 2
title: Lebesgue Measure and Integration
prerequisites:
  - tier: strand-6-uncertainty-advanced
    slug: 01-sigma-algebras
    description: σ-algebras
connections:
  - strand-6-uncertainty-advanced/03-random-variables-measure
applications:
  - cs: "Modern integral analysis, robust expectation calculations"
  - life: "A correct way to integrate"
---

# Lebesgue Measure and Integration

## Explain Like I Am 7

The old-school way to find the area under a wiggly curve is to
slice the *floor* into thin strips and add up rectangles — that's
Riemann integration.  Lebesgue had a sharper idea: slice the
*height* axis into thin levels instead, and ask "how wide is the
region where the curve stands at this height?"  This sneaky flip
handles much wilder curves — even ones that jump up and down
infinitely often — and gives the integral all the tidy convergence
laws modern probability needs.

## Mental

**Lebesgue measure** $m$ on $\mathbb{R}^n$ assigns to each measurable
set its "natural" length / area / volume:

- $m([a, b]) = b - a$ in $\mathbb{R}$.
- $m([a, b] \times [c, d]) = (b - a)(d - c)$ in $\mathbb{R}^2$.
- Translation-invariant, countably additive.
- Defined via outer measure: $m^*(A) = \inf \sum |I_i|$ over countable
  covers of $A$ by intervals.

**Lebesgue integration** then defines $\int f \, dm$ for measurable
$f$ — generalising Riemann integration to a much wider class.

## Lebesgue vs Riemann

Riemann integral $\int_a^b f$: divide the *domain* into pieces.
Lebesgue integral $\int f \, dm$: divide the *range* into pieces.

For "nice" continuous $f$, both give the same answer. Lebesgue
integral is more general:

- Indicator of rationals $\mathbb{1}_\mathbb{Q}$ on $[0, 1]$ is **not**
  Riemann integrable, but Lebesgue integrable with integral 0.
- $\int |f| \, dm < \infty$ is the right condition for "integrable."
- Convergence theorems (MCT, DCT, Fatou) work cleanly.

## Worked example: $\int \sin x \, dm$ on $[0, \pi]$

Riemann and Lebesgue agree:

$\int_0^\pi \sin x \, dx = -\cos \pi + \cos 0 = 2$.

For continuous functions on bounded intervals, both integrals match.

## Worked example 2: Lebesgue-but-not-Riemann

$f(x) = \mathbb{1}_\mathbb{Q}$ on $[0, 1]$: 1 on rationals, 0 elsewhere.

- **Riemann**: upper sum is 1 (rationals dense), lower sum is 0.
  Don't match — not Riemann-integrable.
- **Lebesgue**: $f$ is 1 on a measure-0 set, 0 elsewhere.
  $\int f \, dm = 1 \cdot 0 + 0 \cdot 1 = 0$.

## Interactive

:::widget type=numeric-input prompt="Lebesgue measure of $[0, 5] \\subset \\mathbb{R}$: $?$" answer=5 explain="$5$.":::

:::widget type=numeric-input prompt="Lebesgue measure of rationals in $[0, 1]$: $?$" answer=0 explain="$0$ — countable.":::

:::widget type=numeric-input prompt="$\\int_0^\\pi \\sin x \\, dm = ?$" answer=2 explain="$2$.":::

:::widget type=numeric-input prompt="$\\int \\mathbb{1}_\\mathbb{Q} \\, dm$ on $[0, 1]$: $?$" answer=0 explain="$0$ — Lebesgue but not Riemann integrable.":::

## Symbolic

**Construction of Lebesgue integral**:

1. **Simple functions** $f = \sum c_i \mathbb{1}_{A_i}$:
   $\int f \, dm = \sum c_i m(A_i)$.
2. **Non-negative measurable** $f$: $\int f = \sup\{\int g : g \le f \text{ simple}\}$.
3. **General measurable** $f = f^+ - f^-$: $\int f = \int f^+ - \int f^-$
   when both finite.

**$L^p$ space**: $\{f : \int |f|^p \, dm < \infty\}$ modulo
"equal almost everywhere." Banach space under $\|f\|_p = (\int |f|^p)^{1/p}$.

**Three convergence theorems**:

- MCT: $0 \le f_n \uparrow f$ pointwise ⇒ $\int f_n \to \int f$.
- DCT: $f_n \to f$ pointwise, $|f_n| \le g$ integrable ⇒ $\int f_n \to \int f$.
- Fatou: $\int \liminf f_n \le \liminf \int f_n$.

## Computational

```python
import numpy as np
from scipy import integrate

# Lebesgue and Riemann agree on continuous functions
result, _ = integrate.quad(np.sin, 0, np.pi)
print(result)                                      # 2.0

# A function Lebesgue-integrable but Riemann-pathological
# (Cantor function: continuous, derivative 0 a.e., total variation 1)
# Numerical: integrate from 0 to 1 — 0 by Lebesgue
def cantor_function(x, depth=20):
    result = 0
    for _ in range(depth):
        x *= 3
        if x >= 2:
            x -= 2
            result = result * 2 + 1
        elif x >= 1:
            return result * 2 + 1
            break
        else:
            result *= 2
    return result / (2**depth)

# Numerical integral:
xs = np.linspace(0, 1, 10000)
print(np.mean([cantor_function(x) for x in xs]))   # ~0.5 (Cantor function average)

# Convergence theorem demo: f_n -> 0 pointwise but ∫ f_n doesn't go to 0
# f_n = n on (0, 1/n), 0 elsewhere — integral = 1, pointwise limit 0
# DCT requires a dominating g — none here, so DCT inapplicable
```

## Applied

- **Modern probability** — expectation = Lebesgue integral against the
  probability measure. $\mathbb{E}[X] = \int X \, dP$.
- **Functional analysis** — $L^p$ spaces are workhorses; Hilbert
  space $L^2$ is foundational for quantum mechanics, signal
  processing, ML.
- **Stochastic calculus** — Itô integral is a Lebesgue-Stieltjes
  generalisation against Brownian motion.
- **Statistical learning** — generalisation bounds rely on
  measure-theoretic concentration inequalities.
- **Real-analysis foundations** — Riemann fails; Lebesgue handles
  almost-everywhere statements cleanly.

## Check Your Understanding

:::widget type=numeric-input prompt="Lebesgue measure of a single point: $0$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Riemann and Lebesgue agree on continuous functions over bounded intervals. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Indicator of rationals on $[0, 1]$: Lebesgue integral $= 0$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$L^p$ space is a Banach space under $\\|f\\|_p$. Type 1." answer=1 explain="Yes.":::
