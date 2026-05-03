---
strand: number-quantity
level: foundation
order: 8
title: Decimals and Place Value
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 01-place-value-any-base
    description: Place value in any base
  - tier: strand-1-number-quantity-foundation
    slug: 06-fractions-as-ratios
    description: Fractions as ratios
connections:
  - strand-1-number-quantity-foundation/09-repeating-decimals
applications:
  - business: "Money (dollars and cents), interest rates, tax calculations, currency conversion"
  - cs: "Floating-point numbers, image scaling, ML weights and probabilities"
  - games: "Velocity (3.5 units per second), camera coordinates, anti-aliasing"
  - life: "Petrol prices, recipe measurements, body temperature, stopwatch readings"
---

# Decimals and Place Value

## Mental

A decimal is a fraction whose **denominator is a power of $10$** —
$10$, $100$, $1000$, … — written using a special notation: the
**decimal point** separates the whole part from the fractional part.

$$
0.5 = \tfrac{5}{10}, \qquad 0.25 = \tfrac{25}{100}, \qquad 0.125 = \tfrac{125}{1000}.
$$

Every digit to the right of the decimal point has its own **place
value**, just like digits to the left:

| Position | Place value |
|---|---|
| 1st right | tenths ($\tfrac{1}{10}$) |
| 2nd right | hundredths ($\tfrac{1}{100}$) |
| 3rd right | thousandths ($\tfrac{1}{1000}$) |
| 4th right | ten-thousandths ($\tfrac{1}{10000}$) |

It's the **same place-value idea** as Lesson 01 — just extended to
the right. Each step right divides by $10$. Each step left multiplies
by $10$. The decimal point sits between the ones place and the tenths
place.

So $4072.85$ unpacks as

$$
4072.85 = 4 \cdot 1000 + 0 \cdot 100 + 7 \cdot 10 + 2 \cdot 1 + 8 \cdot \tfrac{1}{10} + 5 \cdot \tfrac{1}{100}.
$$

Reading the digits left-to-right gives you successively smaller
amounts. The point itself isn't a digit — it's a marker that says
"the units stop here."

## Interactive

Try a few conversions both ways. Each conversion is just **rewriting
the same number** — fraction form vs decimal form.

:::widget type=numeric-input prompt="What is $\\dfrac{1}{4}$ as a decimal? Type the decimal." answer=0.25 explain="$1 \\div 4 = 0.25$. Or: rewrite $\\dfrac{1}{4}$ as $\\dfrac{25}{100}$, which is twenty-five hundredths.":::

:::widget type=numeric-input prompt="What is $\\dfrac{3}{10}$ as a decimal?" answer=0.3 explain="The first place after the decimal point is the *tenths* place. Three tenths is $0.3$.":::

:::widget type=numeric-input prompt="What is $0.6$ as a fraction? Type the numerator if the denominator is $10$." answer=6 explain="$0.6 = \\dfrac{6}{10}$. (Simplified: $\\dfrac{3}{5}$.)":::

:::widget type=numeric-input prompt="What is $0.75$ as a fraction over $100$? Type the numerator." answer=75 explain="$0.75 = \\dfrac{75}{100}$. The two digits after the decimal point land in the hundredths column. (Simplified: $\\dfrac{3}{4}$.)":::

:::widget type=numeric-input prompt="A petrol price is $\\$1.45$ per litre. What is $1.45 + 0.20$? Type the decimal." answer=1.65 explain="Align the decimal points. $1.45 + 0.20 = 1.65$. Adding decimals is the same as adding whole numbers — keep the place values lined up.":::

## Symbolic

A decimal number is the **same number written differently**. The
formal connection between fractions and decimals:

$$
0.d_1 d_2 d_3 \ldots = \frac{d_1}{10} + \frac{d_2}{100} + \frac{d_3}{1000} + \cdots
$$

where $d_1, d_2, d_3, \ldots$ are the individual digits.

To **convert a fraction to a decimal**: divide the numerator by the
denominator (Lesson 04). Sometimes this terminates ($\dfrac{1}{4} =
0.25$), sometimes it goes on forever in a repeating pattern
($\dfrac{1}{3} = 0.333\ldots$). Lesson 09 explains *why*.

To **convert a decimal to a fraction**: count the digits after the
decimal point. That count is the number of zeros in the denominator.

$$
0.25 \to \frac{25}{100}, \quad 0.137 \to \frac{137}{1000}, \quad 1.5 \to \frac{15}{10} = \frac{3}{2}.
$$

The placeholder rule from Lesson 01 still matters here. The decimal
$0.05$ is **not** the same as $0.5$ — that zero between the point
and the $5$ pushes the $5$ from the tenths place to the hundredths
place. Without it you'd lose a factor of $10$.

## Computational

Python uses decimal points exactly the way you'd expect:

```python
print(0.25)            # 0.25
print(1/4)             # 0.25  — division gives the decimal directly

# Every decimal corresponds to a fraction.
from fractions import Fraction
print(Fraction(0.25))  # 1/4   — Python figures out the right fraction
print(Fraction(0.5))   # 1/2

# Adding decimals: same as adding whole numbers, decimal point lined up.
print(1.45 + 0.20)     # 1.65
print(0.1 + 0.2)       # 0.30000000000000004  ← surprising!
```

That last line is a famous gotcha. Why doesn't $0.1 + 0.2$ equal
exactly $0.3$? Because **computers store numbers in base 2**, not
base 10. Some decimals are exact in base 10 but turn into infinite
repeating patterns in base 2 — much like $\dfrac{1}{3}$ is repeating
in base 10. The computer rounds, and the rounding shows up.

This is why financial software uses `Decimal` (a "you said dollars
and cents, I'll keep them exact") instead of regular floating-point
numbers:

```python
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))   # 0.3 — exact
```

You'll meet floating-point representation in detail in Strand 7
(Computation). For now, just remember: **what's exact in base 10
isn't always exact in base 2.**

## Derivational

*Why* does the place value rule extend to the right?

Because the rule itself is just "each step right divides by $10$,
each step left multiplies by $10$" — and that rule doesn't care
where the decimal point is. Look at a number from left to right:

$$
\ldots \quad \overbrace{1000}^{10^3} \quad \overbrace{100}^{10^2} \quad \overbrace{10}^{10^1} \quad \overbrace{1}^{10^0} \quad . \quad \overbrace{\tfrac{1}{10}}^{10^{-1}} \quad \overbrace{\tfrac{1}{100}}^{10^{-2}} \quad \ldots
$$

Each column's value is $10$ times the column to its right. That's the
**only** rule. Whole numbers stop on the left of the point because we
chose to mark it there — but the pattern of "divide by ten" continues
seamlessly across the marker.

The names $10^{-1}, 10^{-2}, \ldots$ are sneak previews. They mean
"ten to the negative power" and they obey: $10^{-1} = \tfrac{1}{10}$,
$10^{-2} = \tfrac{1}{100}$. Strand 1 Intermediate will treat negative
exponents formally; for now, take them as a compact way to write the
fractional place values.

*Why* does adding decimals work by lining up the points?

Because lining up the points makes sure you're adding **same-size
pieces** — tenths to tenths, hundredths to hundredths, ones to ones.
This is the same principle as the common-denominator rule for
fractions (Lesson 07). You can only add things of the same kind, and
the decimal point is the marker that tells you what kind a digit is.

## Connective

Decimals and place value tie together several earlier ideas:

- **Lesson 01** introduced place value for whole numbers; this lesson
  extends the same pattern past the decimal point.
- **Lesson 06** told you a fraction is a division held back; this
  lesson shows what happens when you carry out that division — and
  Lesson 09 explores the surprising case when the division never
  terminates.
- **Lesson 04** showed how dividing by $10$ slides digits one place
  right; that's exactly the rule that creates the fractional places.

In Strand 7 (Computation), you'll learn that computers use the same
place-value idea — but in base $2$. A floating-point number has an
"integer part" (powers of $2^0, 2^1, 2^2, \ldots$) and a "fractional
part" (powers of $2^{-1}, 2^{-2}, \ldots$). Same template, different
base.

## Applied

- **Money**: $\$3.50$ is "three dollars and five tenths of a dollar,"
  which is fifty cents — because $\tfrac{5}{10} = \tfrac{50}{100}$.
  Most currencies use two decimal places: cents are hundredths.
- **Petrol prices**: $\$1.459$ per litre. The third decimal place
  ($9$ thousandths of a dollar — less than a cent!) exists for tiny
  precision differences that matter only over thousands of litres.
- **Sports times**: a sprinter runs $9.58$ seconds. Two decimal
  places is $\tfrac{1}{100}$-second precision — fast enough that
  electronic timers are required.
- **ML model weights**: a neural network might store a weight as
  $0.000324$ — a small but nonzero contribution. Decimals make these
  tiny numbers easy to express compactly.
- **Recipe measurements**: $\dfrac{1}{2}$ cup is $0.5$ cup. A digital
  kitchen scale that reads $0.250$ kg is $250$ grams.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $\\dfrac{1}{2}$ as a decimal?" answer=0.5 explain="$1 \\div 2 = 0.5$. Or: $\\dfrac{1}{2} = \\dfrac{5}{10} = 0.5$.":::

:::widget type=numeric-input prompt="What is $0.4$ as a fraction with denominator $10$? Type the numerator." answer=4 explain="$0.4 = \\dfrac{4}{10}$. The single digit after the decimal point is in the tenths column.":::

:::widget type=numeric-input prompt="What is $0.07$ in fraction form (denominator $100$)? Type the numerator." answer=7 explain="$0.07 = \\dfrac{7}{100}$. The leading zero pushes the $7$ from tenths to hundredths.":::

:::widget type=numeric-input prompt="A receipt totals $\\$23.40 + \\$15.85$. What is the total? (Type the decimal — no dollar sign.)" answer=39.25 explain="Line up the decimal points: $23.40 + 15.85 = 39.25$. Cents column adds to $25$, dollars column to $39$.":::
