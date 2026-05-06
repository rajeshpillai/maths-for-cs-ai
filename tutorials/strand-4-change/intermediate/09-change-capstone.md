---
strand: change
level: intermediate
order: 9
title: Capstone — Calculus in the Wild
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 08-power-series
    description: Power series
connections:
  - strand-7-computation-foundation/08-newton-method
  - strand-6-uncertainty-intermediate/05-continuous-distributions
applications:
  - cs: "Auto-diff in deep-learning frameworks, numerical libraries"
  - life: "Recognising calculus running underneath modern systems"
---

# Capstone — Calculus in the Wild

## Explain Like I Am 7

You've added new gadgets: wavy-and-galloping slope finders, an
ant-race for tricky limits, smoothie-splitting for fractions,
infinite-paint accounting, and Taylor's road-copying recipe.  In
this capstone you take real wild puzzles — figuring out how a
medicine clears your blood, how a parachute slows down, how a
tank empties — and let your bigger toolkit chew them up.  Each
real problem takes more than one tool, and watching them combine
is what calculus is really for.

## Mental

Ten lessons on:

- **Trig/log/exp derivatives** (Lesson 00).
- **Implicit differentiation and related rates** (Lesson 01).
- **L'Hôpital's rule** for indeterminate limits (Lesson 02).
- **Integration by substitution** — chain rule reversed (Lesson 03).
- **Integration by parts** — product rule reversed (Lesson 04).
- **Partial fractions** for rational integrals (Lesson 05).
- **Improper integrals** — unbounded intervals or integrands (Lesson 06).
- **Taylor series** — local polynomial approximation (Lesson 07).
- **Power series and convergence** (Lesson 08).

You can now compute most calculus problems found in a first
university calculus course. Three integrated examples.

## Walkthrough 1: backpropagation **is** the chain rule

Every modern deep-learning framework (PyTorch, JAX, TensorFlow) is
fundamentally an automatic differentiator: a calculator that applies
the chain rule recursively through a computation graph.

For a network $y = f(g(h(x)))$ with weights tucked into each layer,

$$
\frac{dy}{dw} = \frac{dy}{df} \cdot \frac{df}{dg} \cdot \frac{dg}{dh} \cdot \frac{dh}{dw}.
$$

The "backward pass" walks this product right-to-left, multiplying
the locally-computed Jacobians. Lesson 00 gave the chain rule;
**Strand 4 Master** turns it into the algorithm.

## Walkthrough 2: probability density normalization

A probability density $f(x)$ on $\mathbb{R}$ must satisfy

$$
\int_{-\infty}^\infty f(x) \, dx = 1.
$$

The Gaussian density $\frac{1}{\sigma \sqrt{2\pi}} e^{-(x - \mu)^2/(2\sigma^2)}$
gets that $\sqrt{2\pi}$ in the denominator from the integral
$\int_{-\infty}^\infty e^{-x^2} dx = \sqrt{\pi}$ — an improper
integral (Lesson 06).

Compute expectation with integration by parts (Lesson 04). Compute
moment generating functions with substitution (Lesson 03). Almost
every calculation in classical statistics is a chained calculus
manoeuvre.

## Walkthrough 3: a transcendental in `math.exp`

Inside `math.exp(x)` — what's the algorithm?

1. **Range reduction**: write $x = k \ln 2 + r$ where
   $|r| \le \ln 2 / 2$. So $e^x = 2^k \cdot e^r$. Multiplying by
   $2^k$ is a cheap exponent shift in IEEE 754 floating point.
2. **Polynomial approximation of $e^r$**: a few-term polynomial
   minimax (refinement of Taylor, Lesson 07) accurate over the
   small interval.
3. **Reassemble**: $e^x = 2^k \cdot p(r)$.

Total: ~10 floating-point operations for double precision. The
calculus you learned is *literally* what runs inside `libm`.

## Roadmap

**Strand 4 Advanced** picks up:

- Multivariable calculus: gradients, divergence, curl.
- Lagrange multipliers and constrained optimization.
- Multiple integrals (double, triple, change of variables).
- Vector fields and line/surface integrals.
- Theorems of Green, Stokes, divergence.

**Strand 4 Master** continues:

- Calculus of variations (Euler-Lagrange).
- Differential equations (ODE and PDE introductions).
- Reverse-mode automatic differentiation as a chain-rule recursion.
- Measure theory and Lebesgue integration.

## Closing

Calculus is the **language of change** — and every modern
computational system is fundamentally about change. A neural network
is a smooth function whose derivatives we follow downhill. A
physics engine integrates motion. A finance model integrates returns.

Every line of code that learns, animates, predicts, or controls is
secretly running calculus underneath. Now you read the source.

## Interactive

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\sin x = \\cos x$. At $x = 0$: $\\cos 0 = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\int e^x dx = e^x + C$. Definite from $0$ to $1$: $e - 1 \\approx ?$. Round 4 dp." answer=1.7183 tolerance=0.005 explain="$e - 1 \\approx 1.7183$.":::

:::widget type=numeric-input prompt="$\\sin x \\approx x - x^3/6$ for small $x$. At $x = 0.1$: $0.1 - 0.000167 = ?$. Round 4 dp." answer=0.0998 tolerance=0.001 explain="$\\approx 0.0998$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = 1/2$ (L'Hôpital twice). Type the value." answer=0.5 explain="$1/2$.":::

## Check Your Understanding

:::widget type=numeric-input prompt="Backpropagation = chain rule applied through a computation graph. Type 1 if true." answer=1 explain="Yes — exactly that.":::

:::widget type=numeric-input prompt="Integration by parts inverts the product rule. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\int_{-\\infty}^\\infty e^{-x^2} dx = \\sqrt{\\pi}$. Round 4 dp." answer=1.7725 tolerance=0.005 explain="$\\sqrt{\\pi} \\approx 1.7725$.":::

:::widget type=numeric-input prompt="$e^x$'s Taylor series converges for all $x$ — radius $\\infty$. Type 1 if true." answer=1 explain="Yes — radius is infinite.":::
