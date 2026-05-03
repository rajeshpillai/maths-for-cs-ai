---
strand: change
level: foundation
order: 1
title: Limits — The Concept Calculus Rests On
prerequisites:
  - tier: strand-4-change-foundation
    slug: 00-rates-of-change
    description: Rates of change
connections:
  - strand-4-change-foundation/02-derivative-as-tangent-slope
applications:
  - cs: "Convergence analysis, asymptotic complexity"
  - business: "Long-run averages, equilibrium prices"
  - games: "Frame-rate behaviour as scenes scale"
  - life: "What happens to averages as more data accumulates"
---

# Limits — The Concept Calculus Rests On

## Mental

A **limit** asks: as $x$ gets closer and closer to some value $a$
(but never equal), what does $f(x)$ approach?

Notation:

$$
\lim_{x \to a} f(x) = L.
$$

The limit is the value $L$ that $f(x)$ **gets arbitrarily close to**
as $x$ approaches $a$.

Three reasons limits are useful:

1. They define the derivative (instantaneous rate, Lesson 02).
2. They handle expressions that are "$0/0$" or "$\infty - \infty$"
   formally.
3. They define continuity rigorously.

## Why we need them

Consider $f(x) = \dfrac{x^2 - 1}{x - 1}$. At $x = 1$, this is $0/0$
— **undefined**.

But factor: $\dfrac{(x-1)(x+1)}{x-1} = x + 1$ for $x \ne 1$. So as
$x$ approaches $1$, $f(x)$ approaches $1 + 1 = 2$.

Without limits, we'd say "$f(1)$ is undefined." With limits:

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = 2.
$$

This is exactly the situation that arises when computing derivatives —
the difference quotient $\dfrac{f(x + h) - f(x)}{h}$ becomes $0/0$ at
$h = 0$, but the limit gives the slope.

## Interactive

:::widget type=numeric-input prompt="$\\lim_{x \\to 3} (2x + 1) = ?$ (Just plug in.)" answer=7 explain="$2 \\cdot 3 + 1 = 7$. For continuous functions, the limit is just the value.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\dfrac{x^2}{x} = ?$ (Simplify first.)" answer=0 explain="$\\dfrac{x^2}{x} = x$ for $x \\ne 0$. Limit at 0 is 0.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2} = ?$ Factor and simplify." answer=4 explain="$\\dfrac{(x-2)(x+2)}{x-2} = x + 2$. At $x = 2$: $4$.":::

:::widget type=numeric-input prompt="$\\lim_{h \\to 0} \\dfrac{(2 + h)^2 - 4}{h} = ?$ (Expand: $(4 + 4h + h^2 - 4)/h = (4h + h^2)/h = 4 + h$.)" answer=4 explain="$4 + 0 = 4$. This is the derivative of $x^2$ at $x = 2$.":::

## Symbolic

The **formal definition** ($\epsilon$-$\delta$, due to Cauchy and
Weierstrass): $\lim_{x \to a} f(x) = L$ means: for every $\epsilon > 0$,
there exists $\delta > 0$ such that

$$
0 < |x - a| < \delta \implies |f(x) - L| < \epsilon.
$$

In words: **for any tolerance you set on $|f - L|$, I can find a
small enough deleted neighbourhood of $a$ where the tolerance is
met.**

Strand 4 Master uses this rigorously. For now, the **intuitive**
meaning is enough.

**Limit laws** (when individual limits exist):

- $\lim (f + g) = \lim f + \lim g$.
- $\lim (f \cdot g) = \lim f \cdot \lim g$.
- $\lim (f / g) = \lim f / \lim g$ if $\lim g \ne 0$.
- $\lim c = c$ (constant).
- $\lim_{x \to a} x = a$.

These let you compute most limits algebraically.

**Indeterminate forms**: $\dfrac{0}{0}, \dfrac{\infty}{\infty},
0 \cdot \infty, \infty - \infty, 0^0, 1^\infty, \infty^0$. These need
special techniques (factoring, L'Hôpital's rule, etc.) — Strand 4
Intermediate.

## Computational

```python
def limit_numerical(f, a, h_seq=(0.1, 0.01, 0.001, 0.0001)):
    """Approach a from both sides; observe the trend."""
    print(f"x → {a} from below:", [f(a - h) for h in h_seq])
    print(f"x → {a} from above:", [f(a + h) for h in h_seq])

f = lambda x: (x**2 - 1) / (x - 1) if x != 1 else None
limit_numerical(f, 1)
# Both sides approach 2

# Evaluate at exact x where defined
import numpy as np
x = np.linspace(-1, 3, 100)
y = np.where(x == 1, np.nan, (x**2 - 1) / (x - 1))
# plt.plot(x, y); plt.show()
```

## Applied

- **Asymptotic analysis**: $\lim_{n \to \infty} \frac{T(n)}{n^2}$
  tells you the growth rate of an algorithm.
- **Continuous interest**: $\lim_{n \to \infty} (1 + r/n)^n = e^r$ —
  the foundational limit defining $e$.
- **Tail analysis**: how does a function behave at very large
  inputs?

## Check Your Understanding

:::widget type=numeric-input prompt="$\\lim_{x \\to 2} 3x = ?$" answer=6 explain="Direct.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to -1} (x^2 + 2x) = ?$" answer=-1 explain="$1 - 2 = -1$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = ?$ (Famous result; trust it for now.)" answer=1 explain="A foundational limit, proved using the geometry of the unit circle. Used everywhere in calculus.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\dfrac{x}{x + 1} = ?$" answer=0 explain="Just plug in: $0/1 = 0$.":::
