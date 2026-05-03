---
strand: number-quantity
level: foundation
order: 7
title: Fraction Arithmetic
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 06-fractions-as-ratios
    description: Fractions as ratios
connections:
  - strand-1-number-quantity-foundation/08-decimals-and-place-value
applications:
  - business: "Combining percentage discounts, computing tax-on-tax, allocating shares"
  - cs: "Probability calculations (chance of A and B), pixel scaling between layers"
  - games: "Stacked damage multipliers (50% bonus × 50% bonus = 75% net)"
  - life: "Combining recipes, splitting a half-gallon among friends, time fractions"
---

# Fraction Arithmetic

## Mental

Four operations, four pictures.

**Adding fractions with the same denominator.** If pieces are the
same size, just add how many you have: $\dfrac{1}{8} + \dfrac{3}{8}
= \dfrac{4}{8} = \dfrac{1}{2}$. One slice plus three slices is four
slices. The size of a slice (the denominator) doesn't change.

**Adding fractions with different denominators.** Different-sized
pieces don't add directly. You first **rewrite both** so they have
the same denominator — a common denominator — then add. This is the
single hardest skill in fraction arithmetic, and it gets easy with
practice.

**Multiplying fractions.** Multiplication is "**of**." $\dfrac{1}{2}
\times \dfrac{1}{3}$ means "half of a third," which is one sixth.
The shortcut: **multiply tops, multiply bottoms.** Easier than
addition, surprisingly.

**Dividing fractions.** Dividing by a fraction is the same as
multiplying by its **flip**. $\dfrac{1}{2} \div \dfrac{1}{3} =
\dfrac{1}{2} \times \dfrac{3}{1} = \dfrac{3}{2}$. Why this works gets
explained in the Derivational section — for now, "**flip and multiply**"
is the recipe.

## Interactive

Use the FractionVisual to picture each example, then try the
questions.

:::widget type=fraction-visual numerator=3 denominator=8:::

**Adding with the same denominator** — set the slider to $\tfrac{2}{8}$,
then mentally add $\tfrac{3}{8}$. You should see $\tfrac{5}{8}$ —
five eighths shaded.

:::widget type=numeric-input prompt="$\\dfrac{2}{8} + \\dfrac{3}{8} = \\dfrac{?}{8}$ — type the numerator." answer=5 explain="Same denominator: just add numerators. $2 + 3 = 5$, so $\\dfrac{5}{8}$.":::

:::widget type=numeric-input prompt="$\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{?}{4}$ — type the numerator." answer=3 explain="Different denominators. Rewrite $\\dfrac{1}{2}$ as $\\dfrac{2}{4}$ (multiply top and bottom by $2$), then add: $\\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4}$.":::

:::widget type=numeric-input prompt="What is $\\dfrac{1}{2} \\times \\dfrac{1}{3}$? Type the denominator (the bottom number) of the answer." answer=6 explain="Multiply tops: $1 \\times 1 = 1$. Multiply bottoms: $2 \\times 3 = 6$. Answer: $\\dfrac{1}{6}$.":::

:::widget type=numeric-input prompt="A recipe needs $\\dfrac{2}{3}$ cup of milk; you want to triple it. How many cups in total?" answer=2 explain="$3 \\times \\dfrac{2}{3} = \\dfrac{6}{3} = 2$. Multiplying a fraction by a whole number multiplies just the numerator.":::

## Symbolic

The four rules in formal notation.

**Addition (same denominator):**

$$
\frac{a}{b} + \frac{c}{b} = \frac{a + c}{b}
$$

**Addition (different denominators):** rewrite both with a common
denominator first. The simplest (though not always smallest) common
denominator is the **product** of the two denominators:

$$
\frac{a}{b} + \frac{c}{d} = \frac{a \times d}{b \times d} + \frac{c \times b}{d \times b} = \frac{a d + c b}{b d}.
$$

This always works, even if the result is bigger than necessary. You
can always simplify afterwards.

**Subtraction** uses exactly the same rules — just replace $+$ with
$-$:

$$
\frac{a}{b} - \frac{c}{d} = \frac{a d - c b}{b d}.
$$

**Multiplication:**

$$
\frac{a}{b} \times \frac{c}{d} = \frac{a \times c}{b \times d}.
$$

**Division** — "flip the second one and multiply":

$$
\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{a \times d}{b \times c}.
$$

The flipped fraction $\dfrac{d}{c}$ is called the **reciprocal** of
$\dfrac{c}{d}$ — they multiply to $1$.

## Computational

Python's `Fraction` type does all of this exactly:

```python
from fractions import Fraction

a = Fraction(1, 2)
b = Fraction(1, 3)

print(a + b)   # 5/6   — adds with common denominator automatically
print(a - b)   # 1/6
print(a * b)   # 1/6
print(a / b)   # 3/2   — flip-and-multiply done for you

# Verify the "flip and multiply" rule by hand
print(Fraction(1, 2) * Fraction(3, 1))   # 3/2 — same answer
```

A from-scratch implementation, mirroring the Symbolic section above:

```python
def add_fractions(a_num, a_den, b_num, b_den):
    # Common denominator is a_den * b_den. Numerators scale to match.
    return a_num * b_den + b_num * a_den, a_den * b_den

def mul_fractions(a_num, a_den, b_num, b_den):
    return a_num * b_num, a_den * b_den

print(add_fractions(1, 2, 1, 3))   # (5, 6)  — i.e. 5/6
print(mul_fractions(1, 2, 1, 3))   # (1, 6)  — i.e. 1/6
```

The result might not be in simplest form (e.g. `add_fractions(1, 4,
1, 4)` gives `(8, 16)` instead of `(1, 2)`). Simplify it with the
loop from Lesson 06 if you need a canonical form.

## Derivational

*Why* does adding fractions need a common denominator?

Because **you can only add things of the same kind**. One eighth
plus three eighths makes four eighths — the units (eighths) match.
But one half plus one quarter is "one big-piece plus one small-piece"
— different units. To add them honestly, convert both to the same
unit (quarters, in this case): $\dfrac{1}{2} = \dfrac{2}{4}$, so
$\dfrac{1}{2} + \dfrac{1}{4} = \dfrac{2}{4} + \dfrac{1}{4} = \dfrac{3}{4}$.

Same idea as combining $1$ pound with $1$ kilogram — convert one to
the other first, then add.

*Why* does multiplying just multiply tops and bottoms?

Picture a unit square. Take half its width and one-third its height
— a small rectangle. The small rectangle is $\dfrac{1}{2} \times
\dfrac{1}{3}$ of the whole square. How big? The unit square divides
into a $2 \times 3$ grid of smaller rectangles, each one $\dfrac{1}{6}$
of the whole. Your small rectangle is exactly **one** of those — so
it's $\dfrac{1}{6}$.

```
+----+----+
| ▓▓ |    |   ← half the width × one-third the height = 1 cell
+----+----+   ← 6 cells total in the 2×3 grid
|    |    |   ← the shaded cell is 1/6 of the square
+----+----+
```

The rectangle's area is (width) × (height). When width is $\dfrac{a}{b}$
and height is $\dfrac{c}{d}$, the area is $\dfrac{a \cdot c}{b \cdot d}$.

*Why* does division flip-and-multiply?

Because dividing **by** a number is the same as multiplying by its
**reciprocal** — the number that multiplies with it to give $1$.
The reciprocal of $5$ is $\tfrac{1}{5}$, so dividing by $5$ is
multiplying by $\tfrac{1}{5}$. The reciprocal of $\tfrac{2}{3}$ is
$\tfrac{3}{2}$ (because $\tfrac{2}{3} \times \tfrac{3}{2} = 1$), so
dividing by $\tfrac{2}{3}$ is multiplying by $\tfrac{3}{2}$. **Flip
the second one** is just shorthand for "use its reciprocal."

## Connective

Fraction arithmetic is the foundation for several big things later:

- **Probability**: the chance of two independent events both
  happening is the **product** of their probabilities — fraction
  multiplication. Strand 6 builds on this.
- **Algebra**: when you simplify $\dfrac{x + 1}{x + 2} \cdot \dfrac{x
  - 1}{x}$, you're using the same rule as $\dfrac{a}{b} \cdot
  \dfrac{c}{d} = \dfrac{ac}{bd}$. The letters change; the technique
  is identical.
- **Slopes and ratios**: when one line has slope $\dfrac{2}{3}$ and
  you scale a drawing by $\dfrac{1}{2}$, the new slope is
  $\dfrac{2}{3} \times \dfrac{1}{2} = \dfrac{1}{3}$.
- **Calculus**: derivatives of quotients and products will look
  unfamiliar at first, but the rules are direct cousins of fraction
  rules.

## Applied

- **Stacked discounts**: a $20\%$ off coupon used together with a
  $25\%$ store sale is **not** $45\%$ off. It's $\dfrac{4}{5}$ of
  the original (after the coupon) times $\dfrac{3}{4}$ of that
  (after the further $25\%$ off) = $\dfrac{12}{20} = \dfrac{3}{5}$
  of the original. So you pay $60\%$ — only $40\%$ off in total.
  Multiplying fractions matters in money.
- **Game damage multipliers**: a sword with $50\%$ bonus damage
  ($\times 1.5$) used by a hero with $50\%$ damage boost ($\times
  1.5$) deals $1.5 \times 1.5 = 2.25 = \dfrac{9}{4}$ times base
  damage. Stacking is multiplication, not addition.
- **Photo printing**: a photo with aspect ratio $\dfrac{3}{2}$ on
  paper of ratio $\dfrac{4}{3}$ won't fit perfectly. The math of
  cropping is fraction comparison.
- **Cooking**: doubling a recipe but with $\dfrac{1}{2}$ the sugar →
  multiply each ingredient by $2$, then multiply sugar by another
  $\dfrac{1}{2}$. Net sugar multiplier: $2 \times \dfrac{1}{2} = 1$
  (unchanged), even though everything else doubled.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\dfrac{1}{4} + \\dfrac{2}{4} = \\dfrac{?}{4}$ — type the numerator." answer=3 explain="Same denominator: just add numerators. $1 + 2 = 3$. Answer: $\\dfrac{3}{4}$.":::

:::widget type=numeric-input prompt="$\\dfrac{1}{3} + \\dfrac{1}{6} = \\dfrac{?}{6}$ — type the numerator." answer=3 explain="Convert $\\dfrac{1}{3}$ to sixths: multiply top and bottom by $2$ to get $\\dfrac{2}{6}$. Then $\\dfrac{2}{6} + \\dfrac{1}{6} = \\dfrac{3}{6} = \\dfrac{1}{2}$.":::

:::widget type=numeric-input prompt="What is $\\dfrac{2}{3} \\times \\dfrac{3}{4}$? Type the numerator of the simplified answer." answer=1 explain="$\\dfrac{2 \\times 3}{3 \\times 4} = \\dfrac{6}{12} = \\dfrac{1}{2}$. The 3s cancel — a useful spot to look for before doing the full multiplication.":::

:::widget type=numeric-input prompt="What is $\\dfrac{1}{2} \\div \\dfrac{1}{4}$?" answer=2 explain="Flip the second and multiply: $\\dfrac{1}{2} \\times \\dfrac{4}{1} = \\dfrac{4}{2} = 2$. There are two quarters in a half — does that sound right? Yes.":::
