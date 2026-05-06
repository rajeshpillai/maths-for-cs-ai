---
strand: change
level: intermediate
order: 5
title: Partial Fractions
prerequisites:
  - tier: strand-4-change-intermediate
    slug: 04-integration-by-parts
    description: Integration by parts
connections:
  - strand-4-change-intermediate/06-improper-integrals
applications:
  - cs: "Inverse Laplace transforms in control theory, signals"
  - life: "Decomposing complicated rationals into simple ones"
---

# Partial Fractions

## Explain Like I Am 7

Imagine a strange fruit smoothie that's a mix of three simple
juices.  If someone told you the smoothie's recipe, you could pour
it back into three separate cups — apple, mango, and pear — and
suddenly each cup is something easy.  A messy fraction with a big
denominator is just like that smoothie.  **Partial fractions** is
the trick of un-mixing it back into tidy pieces with simple
denominators, where each piece is a fraction you already know how
to deal with.

## Mental

A **proper rational** $\frac{P(x)}{Q(x)}$ ($\deg P < \deg Q$) can be
**broken into a sum of simpler fractions** whose denominators are the
factors of $Q(x)$. Once decomposed, each piece integrates as a log
or arctangent.

Why bother? Because

$$
\int \frac{1}{x^2 - 1} dx
$$

looks intimidating. But after splitting:

$$
\frac{1}{x^2 - 1} = \frac{1}{(x-1)(x+1)} = \frac{1/2}{x-1} - \frac{1/2}{x+1}.
$$

each piece is just $\int \frac{dx}{x \pm 1} = \ln|x \pm 1|$.

## Worked example

Compute $\int \frac{3x + 5}{(x-1)(x+2)} dx$.

**Step 1**: write
$\frac{3x + 5}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2}.$

**Step 2**: clear denominators:
$3x + 5 = A(x+2) + B(x-1).$

**Step 3**: cover-up trick — set $x = 1$: $8 = 3A$, so $A = 8/3$.
Set $x = -2$: $-1 = -3B$, so $B = 1/3$.

**Step 4**: integrate each piece.
$\int \frac{8/3}{x-1} + \frac{1/3}{x+2} dx = \frac{8}{3} \ln|x-1| + \frac{1}{3} \ln|x+2| + C.$

## Cases of denominator factors

| Factor in $Q(x)$ | Term in decomposition |
|---|---|
| Linear $(ax + b)$ | $\frac{A}{ax+b}$ |
| Repeated linear $(ax+b)^k$ | $\frac{A_1}{ax+b} + \frac{A_2}{(ax+b)^2} + \ldots + \frac{A_k}{(ax+b)^k}$ |
| Irreducible quadratic $(ax^2 + bx + c)$ | $\frac{Ax + B}{ax^2 + bx + c}$ |
| Repeated quadratic | similarly powers of the quadratic |

Improper rationals: divide first.

## Interactive

:::widget type=numeric-input prompt="$\\frac{1}{x^2 - 1} = \\frac{1/2}{x-1} - \\frac{1/2}{x+1}$. Coefficient $A$ for $1/(x-1)$ piece?" answer=0.5 explain="$1/2$.":::

:::widget type=numeric-input prompt="Decompose $\\frac{1}{x(x+1)} = \\frac{A}{x} + \\frac{B}{x+1}$. By cover-up: $A = 1$, $B = -1$. Sum $A + B = ?$" answer=0 explain="$1 + (-1) = 0$.":::

:::widget type=numeric-input prompt="$\\int \\frac{1}{x^2-1} dx = \\frac{1}{2}\\ln|x-1| - \\frac{1}{2}\\ln|x+1| + C = \\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C$. At $x = 3$: $\\frac{1}{2}\\ln(1/2) \\approx -0.3466$. At $x = 2$: $\\frac{1}{2}\\ln(1/3) \\approx ?$. Round 4 dp." answer=-0.5493 tolerance=0.005 explain="$0.5 \\cdot \\ln(1/3) \\approx -0.549$.":::

:::widget type=numeric-input prompt="$\\frac{2x + 1}{x(x+1)} = \\frac{A}{x} + \\frac{B}{x+1}$. Cover-up: $x = 0 \\Rightarrow A = 1$. $x = -1 \\Rightarrow B = ?$" answer=1 explain="$\\frac{-1}{-1} = 1$.":::

## Symbolic

The procedure:

1. Factor $Q(x)$ over reals (linear and irreducible quadratic factors).
2. Write the proper-fraction template with unknown coefficients.
3. Multiply through by $Q(x)$ and equate coefficients (or use cover-up
   for distinct linear factors).
4. Solve the resulting linear system.
5. Integrate piece by piece.

**Why irreducible quadratics need linear numerators**: an irreducible
quadratic factor $x^2 + bx + c$ pairs with a numerator of degree one
less, $Ax + B$. After completing the square, integrate the
$Ax$-part as a log and the $B$-part as an arctangent.

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Decompose into partial fractions
print(sp.apart(1 / (x**2 - 1)))                # 1/(2(x-1)) - 1/(2(x+1))
print(sp.apart((3*x + 5) / ((x-1)*(x+2))))     # 8/(3(x-1)) + 1/(3(x+2))
print(sp.apart(1 / (x*(x**2 + 1))))            # 1/x - x/(x^2+1)

# Integrate
print(sp.integrate(1 / (x**2 - 1), x))         # log piece
```

## Applied

- **Laplace inverse transforms** — engineering courses split rational
  $F(s)$ via partial fractions to look up each piece in the table.
- **Symbolic integration software** — partial fractions is a core
  step in the Risch algorithm.
- **Control theory transfer functions** — characterise system response
  by decomposing $H(s)$ into simple poles.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\frac{1}{(x-2)(x-3)} = \\frac{A}{x-2} + \\frac{B}{x-3}$. Cover-up: $A = 1/(2-3) = -1$. $B = 1/(3-2) = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="A repeated factor $(x-1)^2$ contributes $\\frac{A_1}{x-1} + \\frac{A_2}{(x-1)^2}$. Number of terms?" answer=2 explain="$2$ — one per power.":::

:::widget type=numeric-input prompt="An irreducible quadratic $x^2 + 1$ contributes $\\frac{Ax + B}{x^2 + 1}$. Numerator degree?" answer=1 explain="$1$ — one less than denominator's $2$.":::

:::widget type=numeric-input prompt="$\\int \\frac{1}{x^2 + 1} dx = \\arctan x + C$. At $x = 1$: $\\arctan 1 = ?$ (in $\\pi/4$ units, type the numeric value 0.7854). Round 4 dp." answer=0.7854 tolerance=0.005 explain="$\\pi/4 \\approx 0.7854$.":::
