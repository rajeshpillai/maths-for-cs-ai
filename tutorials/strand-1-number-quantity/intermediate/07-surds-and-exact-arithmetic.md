---
strand: number-quantity
level: intermediate
order: 7
title: Surds — Exact Arithmetic with Roots
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 05-powers-and-exponent-rules
    description: Powers and exponent rules
connections:
  - strand-1-number-quantity-intermediate/08-floating-point-base-2
  - strand-1-number-quantity-intermediate/09-complex-numbers
applications:
  - cs: "Computer-algebra systems (SymPy, Mathematica) keep results exact"
  - games: "Pythagorean distances ($\\sqrt{a^2 + b^2}$) for collision detection"
  - business: "Square-root growth models, Black-Scholes volatility"
  - life: "Diagonal of a square room, screen sizes (16:9 implies $\\sqrt{337}$ for any 16-tall screen)"
---

# Surds — Exact Arithmetic with Roots

## Mental

A **surd** is a square root (or higher root) of a non-negative number
that **isn't** a whole number — like $\sqrt{2}, \sqrt{3}, \sqrt[3]{5}$.

You met $\sqrt{2}$ casually in Foundation. Its decimal expansion is

$$
\sqrt{2} = 1.41421356\ldots
$$

— never terminating, never repeating. Lesson 09 of Foundation showed
that *non-terminating, non-repeating decimals are not fractions*.
$\sqrt{2}$ is **irrational**: it cannot be written as $\dfrac{p}{q}$
for any whole numbers $p, q$.

This is a startling fact. The Pythagoreans (around $500$ BCE)
discovered it from the diagonal of a unit square — by Pythagoras's
theorem, that diagonal is $\sqrt{2}$ — and it forced them to expand
their notion of "number" beyond fractions. The proof (Derivational
section below) is one of the cleanest in mathematics.

So how do we **work with** $\sqrt{2}$ if we can't write it as a
fraction? Two approaches:

**Approach 1 (decimal)**: round to enough digits. $\sqrt{2} \approx
1.414$. Useful for engineering — but every operation introduces
rounding error (Lesson 08 deals with this).

**Approach 2 (exact)**: leave it as $\sqrt{2}$. Don't compute the
decimal at all. Manipulate the symbol $\sqrt{2}$ algebraically. This
is what computer algebra systems do, and what mathematicians do by
hand. Surd arithmetic is the rules for this.

The basic rules that make surd arithmetic work:

$$
\begin{aligned}
\sqrt{a} \cdot \sqrt{b} &= \sqrt{ab} && \text{(product)} \\
\frac{\sqrt{a}}{\sqrt{b}} &= \sqrt{\frac{a}{b}} && \text{(quotient)} \\
(\sqrt{a})^2 &= a && \text{(definition)}
\end{aligned}
$$

But **not** $\sqrt{a + b} = \sqrt{a} + \sqrt{b}$ (a common mistake).
Surds *don't* split addition.

The whole game is: **simplify, don't compute**. If you can leave
something as $3\sqrt{2}$ instead of $4.2426\ldots$, do.

## Interactive

:::widget type=numeric-input prompt="What is $\\sqrt{2} \\cdot \\sqrt{8}$? (Use the product rule.)" answer=4 explain="$\\sqrt{2 \\cdot 8} = \\sqrt{16} = 4$. The product rule simplifies the surd away entirely.":::

:::widget type=numeric-input prompt="What is $\\sqrt{50}$ in simplest form? Type the coefficient (the number outside the radical sign)." answer=5 explain="$\\sqrt{50} = \\sqrt{25 \\cdot 2} = \\sqrt{25} \\cdot \\sqrt{2} = 5\\sqrt{2}$. Coefficient is $5$.":::

:::widget type=numeric-input prompt="What is $\\sqrt{72}$ in simplest form? Type the coefficient." answer=6 explain="$\\sqrt{72} = \\sqrt{36 \\cdot 2} = 6\\sqrt{2}$. Pull out the largest perfect-square factor.":::

:::widget type=numeric-input prompt="$(\\sqrt{3})^2 = ?$" answer=3 explain="By definition, the square of a square root undoes the root.":::

:::widget type=numeric-input prompt="$3\\sqrt{2} + 5\\sqrt{2} = $ how many copies of $\\sqrt{2}$? Type the coefficient of $\\sqrt{2}$ in the answer." answer=8 explain="$\\sqrt{2}$ behaves like a 'unit' here — adding $3$ of them to $5$ of them gives $8$. Just like $3x + 5x = 8x$.":::

:::widget type=step-revealer
{
  "title": "Rationalising the denominator: simplify 1/√2",
  "steps": [
    {"prose": "By convention, mathematicians prefer to keep surds out of denominators. The fraction $\\dfrac{1}{\\sqrt{2}}$ is mathematically fine but stylistically unwelcome. Here's the standard fix."},
    {"math": "\\frac{1}{\\sqrt{2}} \\cdot \\frac{\\sqrt{2}}{\\sqrt{2}}", "prose": "Multiply top and bottom by $\\sqrt{2}$. (This is just multiplying by $1$, so the value doesn't change — Lesson 06 of Foundation.)"},
    {"math": "= \\frac{\\sqrt{2}}{(\\sqrt{2})^2}", "prose": "The numerator becomes $\\sqrt{2}$. The denominator becomes $(\\sqrt{2})^2$."},
    {"math": "= \\frac{\\sqrt{2}}{2}", "prose": "$(\\sqrt{2})^2 = 2$. The surd has moved up to the numerator and the denominator is a clean rational number."},
    {"prose": "**Why bother?** Historically, hand calculations with logarithm tables and slide rules made dividing by an irrational tedious. Today, computer algebra systems do this automatically because rationalised forms are easier to compare and combine."}
  ]
}
:::

## Symbolic

A **surd** in the strict sense is a root of a positive integer that
isn't itself an integer. Most often we mean square roots ($\sqrt{n}$),
but cube roots ($\sqrt[3]{n}$) and higher roots can also be surds.

Three rules to remember:

$$
\sqrt{a} \cdot \sqrt{b} = \sqrt{ab}, \quad \frac{\sqrt{a}}{\sqrt{b}} = \sqrt{\frac{a}{b}}, \quad (\sqrt{a})^2 = a.
$$

These follow from the exponent rules in Lesson 05, since $\sqrt{a} =
a^{1/2}$.

A surd is in **simplest form** when:

1. No perfect-square factor remains under the radical.
2. No fraction remains under the radical.
3. No surd appears in a denominator.

Examples: $\sqrt{72} \to 6\sqrt{2}$ (rule 1). $\sqrt{\dfrac{1}{2}} \to
\dfrac{1}{\sqrt{2}} \to \dfrac{\sqrt{2}}{2}$ (rules 2 then 3 by
rationalising).

**Adding surds** works only when the surds are *like terms*:

$$
3\sqrt{2} + 5\sqrt{2} = 8\sqrt{2}, \quad \text{but} \quad \sqrt{2} + \sqrt{3} = \sqrt{2} + \sqrt{3}.
$$

The second one cannot be combined — it's already in simplest form.

**Conjugates** rationalise binomial denominators:

$$
\frac{1}{a + b\sqrt{c}} = \frac{1}{a + b\sqrt{c}} \cdot \frac{a - b\sqrt{c}}{a - b\sqrt{c}} = \frac{a - b\sqrt{c}}{a^2 - b^2 c}.
$$

The product $(a + b\sqrt{c})(a - b\sqrt{c}) = a^2 - b^2 c$ is rational
because the cross-terms cancel. The pair $(a + b\sqrt{c}, a - b\sqrt{c})$
are called **conjugates** of each other.

For example: $\dfrac{1}{1 + \sqrt{2}} \cdot \dfrac{1 - \sqrt{2}}{1 -
\sqrt{2}} = \dfrac{1 - \sqrt{2}}{1 - 2} = \dfrac{1 - \sqrt{2}}{-1} =
\sqrt{2} - 1$.

## Computational

Python's `math.sqrt` gives a float — useful for numerical answers,
not for exact algebra:

```python
import math
print(math.sqrt(50))          # 7.0710678118654755
print(math.sqrt(2))           # 1.4142135623730951

# Floating point can't represent √2 exactly:
print(math.sqrt(2) ** 2)      # 2.0000000000000004 — not exactly 2
```

For **exact** surd arithmetic, use SymPy:

```python
from sympy import sqrt, simplify, Rational

a = sqrt(50)
print(a)              # sqrt(50)
print(simplify(a))    # 5*sqrt(2)

# Algebraic simplification keeps results exact
print(sqrt(2) ** 2)   # 2 (exact, no float drift)

# Adding like surds
print(3 * sqrt(2) + 5 * sqrt(2))  # 8*sqrt(2)

# Adding unlike surds — stays unsimplified
print(sqrt(2) + sqrt(3))          # sqrt(2) + sqrt(3)

# Rationalising
expr = 1 / sqrt(2)
print(simplify(expr))             # sqrt(2)/2

# Conjugate trick
denom = 1 + sqrt(2)
print(simplify(1 / denom))        # -1 + sqrt(2)
```

This is the math underneath every algebra-doing tool, from Wolfram
Alpha to your calculator's "fraction" mode. Surd arithmetic is the
reason these tools can give *exact* answers rather than approximate
ones.

A from-scratch surd-simplification function:

```python
def simplify_sqrt(n):
    """Return (a, b) such that sqrt(n) = a * sqrt(b) with b square-free."""
    a = 1
    p = 2
    while p * p <= n:
        while n % (p * p) == 0:
            a *= p
            n //= p * p
        p += 1
    return a, n  # sqrt original = a * sqrt(n)

print(simplify_sqrt(50))   # (5, 2)  →  5√2
print(simplify_sqrt(72))   # (6, 2)  →  6√2
print(simplify_sqrt(45))   # (3, 5)  →  3√5
print(simplify_sqrt(7))    # (1, 7)  →  √7  (already simplest)
```

The algorithm: pull out every perfect-square factor, leaving a
square-free residue under the radical.

## Derivational

*Why* is $\sqrt{2}$ irrational? The classical proof, by contradiction:

Suppose $\sqrt{2} = \dfrac{p}{q}$ for some integers $p, q$ with no
common factor (we can always reduce to this form).

Square both sides: $2 = \dfrac{p^2}{q^2}$, so $p^2 = 2 q^2$.

The right side is even, so $p^2$ is even, so $p$ itself is even. (If
$p$ were odd, $p^2$ would be odd — Lesson 04 of this strand showed
this via parity reasoning.)

Write $p = 2k$. Substitute: $(2k)^2 = 2q^2$, so $4k^2 = 2q^2$,
giving $q^2 = 2k^2$. By the same argument, $q$ is even.

So both $p$ and $q$ are even — they share the factor $2$. But we
assumed they had **no** common factor. Contradiction.

The contradiction proves our initial assumption — that $\sqrt{2}$
*is* a fraction — must be wrong. Therefore $\sqrt{2}$ is irrational.

This argument generalises to $\sqrt{n}$ for any non-square $n$. The
proof technique (proof by contradiction, here using divisibility) is
one of the most elegant in number theory. It dates from the
Pythagorean school around 500 BCE — and supposedly led to the death
of one Hippasus of Metapontum, who broke an oath of secrecy by
revealing the existence of irrationals to outsiders.

(That's probably myth. But the *math* is real.)

## Connective

Surds are the gateway to several big ideas:

- **Real numbers** (Strand 1 Master): the rationals plus all the
  irrationals. Surds and other algebraic numbers ($\sqrt{2},
  \sqrt[3]{5}, \pi^{*}$) plus transcendentals like $\pi$ and $e$
  fill in the "gaps" in the number line.
- **Quadratic formula** (Strand 2): the solutions to $ax^2 + bx + c
  = 0$ are $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ — surds appear
  whenever the discriminant isn't a perfect square.
- **Complex numbers** (Lesson 09): when $b^2 - 4ac$ is *negative*,
  the surd is imaginary. Defining $i = \sqrt{-1}$ extends the number
  system once more.
- **Trigonometry** (Strand 3): $\sin 30° = 1/2$ but $\sin 45° =
  \sqrt{2}/2$ and $\sin 60° = \sqrt{3}/2$ — exact trig values are
  surds. Calculator decimals are approximations.
- **Distance in 2D** (Strand 3): the distance between $(x_1, y_1)$
  and $(x_2, y_2)$ is $\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. Almost
  every distance you ever compute is a surd, simplified or not.

## Applied

- **Pythagorean theorem in code**: a right triangle with legs $3$
  and $4$ has hypotenuse $5$ — exact. With legs $1$ and $1$, the
  hypotenuse is $\sqrt{2}$ — not exact. Game collision detection
  often skips the square root entirely (compare squared distances)
  for speed.
- **Computer algebra**: SymPy, Mathematica, Maple all carry surds
  exactly. When you see $\sqrt{2}/2$ in a CAS output, the system is
  using surd arithmetic to avoid floating-point error.
- **Quadratic equation solutions**: high-school problems often have
  surd answers like $\dfrac{1 + \sqrt{5}}{2}$ — the golden ratio.
- **Standard deviation**: $\sigma = \sqrt{\text{variance}}$. Most
  real-world standard deviations are surds (variance rarely lands
  on a perfect square). Black-Scholes options pricing uses this.
- **Audio frequency ratios**: the equal-tempered semitone is a
  factor of $\sqrt[12]{2} \approx 1.0595$. An octave is split into
  $12$ equal multiplicative steps; each step is the $12$th root of
  $2$.
- **Diagonal of a screen**: a $16{:}9$ screen with width $w$ has
  diagonal $w\sqrt{337}/16$ — irrational. The "$24$-inch screen" is
  the diagonal length, which forces irrational widths and heights.

## Check Your Understanding

:::widget type=numeric-input prompt="Simplify $\\sqrt{48}$ — type the coefficient." answer=4 explain="$\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}$.":::

:::widget type=numeric-input prompt="Compute $\\sqrt{3} \\cdot \\sqrt{12}$." answer=6 explain="$\\sqrt{3 \\cdot 12} = \\sqrt{36} = 6$. Product rule simplifies the surd to a rational.":::

:::widget type=numeric-input prompt="Rationalise $\\dfrac{1}{\\sqrt{5}}$. Type the resulting denominator." answer=5 explain="Multiply top and bottom by $\\sqrt{5}$: $\\dfrac{\\sqrt{5}}{(\\sqrt{5})^2} = \\dfrac{\\sqrt{5}}{5}$. Denominator is $5$.":::

:::widget type=numeric-input prompt="$2\\sqrt{3} + 4\\sqrt{3} - \\sqrt{3} = ?$ Type the coefficient." answer=5 explain="$\\sqrt{3}$ as a unit: $2 + 4 - 1 = 5$. Result: $5\\sqrt{3}$.":::
