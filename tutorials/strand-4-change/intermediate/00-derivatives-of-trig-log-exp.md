---
strand: change
level: intermediate
order: 0
title: Derivatives of Trig, Log, and Exp
prerequisites:
  - tier: strand-4-change-foundation
    slug: 04-product-quotient-chain
    description: Differentiation rules
connections:
  - strand-4-change-intermediate/01-implicit-and-related-rates
applications:
  - cs: "Loss-function derivatives in ML, learning-rate schedules"
  - business: "Compound growth rates, Black-Scholes pricing"
  - games: "Smooth animation curves"
  - life: "Population growth, decay processes"
---

# Derivatives of Trig, Log, and Exp

## Mental

Three classes of functions appear constantly outside polynomials.
Their derivatives:

**Trigonometric**:

$$
\frac{d}{dx} \sin x = \cos x, \quad \frac{d}{dx} \cos x = -\sin x, \quad \frac{d}{dx} \tan x = \sec^2 x.
$$

(Recall: these formulas need radians, not degrees — Strand 3
Intermediate Lesson 01.)

**Exponential** with base $e$:

$$
\frac{d}{dx} e^x = e^x.
$$

The function that is its own derivative. **Definition** of $e$ via
this property.

**Natural log**:

$$
\frac{d}{dx} \ln x = \frac{1}{x}, \quad x > 0.
$$

For other bases:

$$
\frac{d}{dx} a^x = a^x \ln a, \quad \frac{d}{dx} \log_a x = \frac{1}{x \ln a}.
$$

## Why $e$ is special

The defining property "the function equal to its own derivative" is
why $e \approx 2.71828\ldots$ shows up so often. Any exponential
$a^x$ has derivative $a^x \ln a$; only when $a = e$ does the $\ln a$
factor become $1$.

This makes calculus formulas **simplest** in base $e$. That's why
"natural" log is base $e$, not base $10$.

## Interactive

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\sin x$ at $x = 0$." answer=1 explain="$\\cos 0 = 1$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\cos x$ at $x = 0$." answer=0 explain="$-\\sin 0 = 0$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} e^x$ at $x = 0$." answer=1 explain="$e^0 = 1$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\ln x$ at $x = 5$. Type the decimal." answer=0.2 explain="$1/5 = 0.2$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} 2^x$ at $x = 0$. ($2^x \\ln 2$ at 0 = $\\ln 2$.) Round to 4 dp." answer=0.6931 tolerance=0.001 explain="$\\ln 2 \\approx 0.6931$.":::

## Symbolic

Standard derivatives:

| $f(x)$ | $f'(x)$ |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |
| $\sec x$ | $\sec x \tan x$ |
| $\csc x$ | $-\csc x \cot x$ |
| $\cot x$ | $-\csc^2 x$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $a^x$ | $a^x \ln a$ |
| $\log_a x$ | $1/(x \ln a)$ |

Combine with chain rule:

$$
\frac{d}{dx} \sin(g(x)) = \cos(g(x)) \cdot g'(x),
$$

$$
\frac{d}{dx} e^{g(x)} = e^{g(x)} \cdot g'(x),
$$

$$
\frac{d}{dx} \ln(g(x)) = \frac{g'(x)}{g(x)}.
$$

## Computational

```python
import sympy as sp

x = sp.symbols("x")

print(sp.diff(sp.sin(x), x))         # cos(x)
print(sp.diff(sp.cos(x), x))         # -sin(x)
print(sp.diff(sp.exp(x), x))          # exp(x)
print(sp.diff(sp.log(x), x))          # 1/x
print(sp.diff(sp.exp(x**2), x))       # 2*x*exp(x**2)
print(sp.diff(sp.log(sp.sin(x)), x))  # cos(x)/sin(x) = cot(x)
```

## Applied

- **Sigmoid in ML**: $\sigma(x) = \frac{1}{1 + e^{-x}}$. Its
  derivative $\sigma(x)(1 - \sigma(x))$ is used in backpropagation.
- **Black-Scholes**: option pricing involves derivatives of
  $\Phi(d) = $ standard normal CDF, which involves $e^{-x^2/2}$.
- **Population growth**: $P(t) = P_0 e^{rt}$. Its rate of change is
  $rP$ — proportional to itself.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\frac{d}{dx} e^{2x}$ at $x = 0$." answer=2 explain="$2 e^0 = 2$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\sin(3x)$ at $x = 0$." answer=3 explain="$3 \\cos 0 = 3$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\ln(x^2)$ at $x = 1$. ($= 2/x$.)" answer=2 explain="$2/1 = 2$.":::

:::widget type=numeric-input prompt="$\\frac{d}{dx} \\tan x$ at $x = 0$." answer=1 explain="$\\sec^2 0 = 1$.":::
