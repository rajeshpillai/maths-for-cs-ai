---
strand: change
level: intermediate
order: 2
title: L'Hôpital's Rule
prerequisites:
  - tier: strand-4-change-foundation
    slug: 01-limits-intuitively
    description: Limits and indeterminate forms
connections:
  - strand-4-change-intermediate/03-integration-by-substitution
applications:
  - cs: "Asymptotic analysis"
  - business: "Marginal economics at boundaries"
  - life: "Resolving 0/0 and ∞/∞ in real calculations"
---

# L'Hôpital's Rule

## Explain Like I Am 7

Sometimes you ask "what does this division become?" and both the
top and the bottom shrink to zero at the same time, like dividing
$0 \div 0$.  Confusing!  L'Hôpital's rule is a clever trick: when
that happens, peek at how *fast* the top is shrinking versus how
fast the bottom is shrinking.  Whichever shrinks faster, that's
who wins, and the ratio of the two shrink-speeds gives you the
answer.  It's like a foot race between two ants approaching the
same finish line.

## Mental

When evaluating $\lim_{x \to a} \frac{f(x)}{g(x)}$ gives a
**$0/0$** or **$\infty/\infty$** indeterminate form, **L'Hôpital's
rule** says:

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)},
$$

provided the right-hand limit exists and the conditions are met.

So replace numerator and denominator with their derivatives, and try
again.

## Famous example

$$
\lim_{x \to 0} \frac{\sin x}{x}.
$$

Direct: $0/0$ — indeterminate. By L'Hôpital:

$$
\lim_{x \to 0} \frac{\sin x}{x} = \lim_{x \to 0} \frac{\cos x}{1} = \cos 0 = 1.
$$

This was the famous foundational limit (Foundation Lesson 01) — now
proven trivially by L'Hôpital.

## Conditions

L'Hôpital applies only to **indeterminate forms**:

- $0/0$
- $\infty/\infty$

Other indeterminate forms ($0 \cdot \infty, \infty - \infty, 1^\infty,
0^0, \infty^0$) need transformation first to $0/0$ or $\infty/\infty$.

## Interactive

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\frac{\\sin x}{x}$ via L'Hôpital: $\\lim \\frac{\\cos x}{1} = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\frac{e^x - 1}{x}$. $0/0$ form. By L'Hôpital: $\\lim \\frac{e^x}{1} = ?$" answer=1 explain="$e^0 / 1 = 1$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to \\infty} \\frac{x^2}{e^x}$. $\\infty/\\infty$. Apply L'Hôpital twice: $\\lim \\frac{2}{e^x} = ?$" answer=0 explain="Exponential beats polynomial.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 1} \\frac{\\ln x}{x - 1}$. $0/0$. By L'Hôpital: $\\lim \\frac{1/x}{1} = ?$" answer=1 explain="$1/1 = 1$.":::

## Symbolic

L'Hôpital's rule: if $\lim_{x \to a} f(x) = 0 = \lim_{x \to a} g(x)$
(or both $\to \infty$), and $\lim \frac{f'(x)}{g'(x)}$ exists, then

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}.
$$

Can be applied **iteratively** if the result is still indeterminate.

**Caution**: not every $0/0$ requires L'Hôpital. Sometimes algebra
works:

$$
\lim_{x \to 1} \frac{x^2 - 1}{x - 1} = \lim_{x \to 1} (x + 1) = 2.
$$

(Factor first.) Don't use L'Hôpital where simpler tools work.

## Computational

```python
import sympy as sp

x = sp.symbols("x")
print(sp.limit(sp.sin(x) / x, x, 0))      # 1
print(sp.limit((sp.exp(x) - 1) / x, x, 0)) # 1
print(sp.limit(x**2 / sp.exp(x), x, sp.oo)) # 0
print(sp.limit(sp.log(x) / (x - 1), x, 1)) # 1
```

## Check Your Understanding

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x}$. $0/0$. By L'Hôpital: $\\lim \\frac{\\sin x}{1} = ?$" answer=0 explain="$\\sin 0 = 0$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to \\infty} \\frac{\\ln x}{x}$. $\\infty/\\infty$. By L'Hôpital: $\\lim \\frac{1/x}{1} = ?$" answer=0 explain="Log grows slower than linear.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\frac{\\tan x}{x}$. $0/0$. By L'Hôpital: $\\lim \\frac{\\sec^2 x}{1} = ?$" answer=1 explain="$\\sec^2 0 = 1$.":::

:::widget type=numeric-input prompt="$\\lim_{x \\to 0} \\frac{x - \\sin x}{x^3}$. $0/0$. Apply L'Hôpital three times: $\\lim \\frac{\\sin x}{6}$ at $x \\to 0$ — wait, three derivatives gives $\\frac{\\cos x}{6}$. At $x = 0$: $1/6 \\approx 0.167$." answer=0.167 tolerance=0.005 explain="$1/6$.":::
