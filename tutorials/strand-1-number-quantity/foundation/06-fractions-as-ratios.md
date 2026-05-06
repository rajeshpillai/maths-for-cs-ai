---
strand: number-quantity
level: foundation
order: 6
title: Fractions as Ratios
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 04-mental-division
    description: Mental division (a fraction is a division held back)
connections:
  - strand-1-number-quantity-foundation/07-fraction-arithmetic
  - strand-1-number-quantity-foundation/08-decimals-and-place-value
applications:
  - business: "Discounts (25% off = 1/4 off), profit margins, ownership shares"
  - cs: "Image scaling factors, progress bars (loaded/total), aspect ratios"
  - games: "Health bars (current/max), screen aspect ratios (16:9)"
  - life: "Sharing food, splitting bills, recipe portions, time management (1/3 of an hour)"
---

# Fractions as Ratios

## Explain Like I Am 7

Picture a pizza sliced into eight equal pieces.  If you grab three of
them, you've taken $\tfrac{3}{8}$ of the whole pizza — the **bottom
number** says how many slices the pizza was cut into, the **top
number** says how many slices are on your plate.  The same pizza could
be re-cut into 16 slimmer slices and you'd be holding 6 of them: same
amount of pizza, just thinner slices, so $\tfrac{3}{8}$ and
$\tfrac{6}{16}$ are secretly the same friend wearing a different
hat.

## Mental

A fraction is a **comparison between two whole numbers** —
specifically, a comparison of *how much you have* to *how much makes
a whole*.

If a pizza is sliced into $8$ equal pieces and you eat $3$, you ate
$\dfrac{3}{8}$ of the pizza:

- The **bottom number** ($8$) — called the **denominator** — says
  how many pieces a whole is divided into.
- The **top number** ($3$) — called the **numerator** — says how
  many pieces you have.

Three pictures all describe the same fraction:

- **Pie**: a circle cut into $8$ equal slices, $3$ shaded.
- **Bar**: a rectangle cut into $8$ equal cells, $3$ shaded.
- **Number line**: a line marked off in eighths from $0$ to $1$,
  with a dot on the third tick.

Different pictures, same number. Pick whichever makes the question
in front of you easiest.

A second meaning of fractions, equally important: $\dfrac{3}{8}$ is
also "$3$ divided by $8$ — but **left as a fraction** instead of
worked out as a decimal." So $\dfrac{3}{8}$ and $3 \div 8$ are
the **same number**. You can either keep it as a fraction or convert
to a decimal ($0.375$). Some questions are easier in one form, some
in the other. Lesson 08 will go deeper on decimals.

## Interactive

Play with the steppers below. Watch all three pictures update at
once. Then try the questions.

:::widget type=fraction-visual numerator=3 denominator=8:::

Notice:

- When you set numerator equal to denominator (e.g. $\tfrac{4}{4}$),
  the pie is fully shaded — that's exactly **one whole**.
- When you set numerator larger than denominator (e.g. $\tfrac{7}{4}$),
  you get *more than one* whole — the picture stretches to a second
  pie. We call this an **improper fraction**.
- $\tfrac{1}{2}$, $\tfrac{2}{4}$, $\tfrac{3}{6}$, $\tfrac{4}{8}$ —
  try them. Different numbers, **same point** on the number line.
  These are called **equivalent fractions** — same value, different
  way of writing it.

:::widget type=numeric-input prompt="If you cut a pizza into $6$ equal slices and eat $4$, what fraction did you eat? (Type the numerator only.)" answer=4 explain="$4$ slices out of $6$ → $\\dfrac{4}{6}$. Numerator is $4$, denominator is $6$. (You may have noticed $\\dfrac{4}{6}$ is the same as $\\dfrac{2}{3}$ — both numerator and denominator divided by $2$.)":::

:::widget type=numeric-input prompt="What is $\\dfrac{1}{2}$ written as a decimal? (Type just the decimal.)" answer=0.5 explain="$1 \\div 2 = 0.5$. A fraction is a division held back; carrying out the division gives the decimal form.":::

## Symbolic

A **fraction** is written

$$
\frac{a}{b}
$$

where $a$ is the numerator and $b$ is the denominator (and $b \ne 0$
— you cannot divide a whole into zero pieces).

Two fractions are **equivalent** when they describe the same value.
The simplest test: a fraction's value doesn't change if you multiply
**both** the numerator and the denominator by the same nonzero number:

$$
\frac{a}{b} = \frac{a \times k}{b \times k} \quad \text{for any } k \ne 0.
$$

This works because multiplying top and bottom by the same number is
the same as multiplying by $\dfrac{k}{k} = 1$ — which doesn't change
anything. Examples:

$$
\frac{1}{2} = \frac{2}{4} = \frac{3}{6} = \frac{50}{100}.
$$

The reverse — dividing both by the same number — is called
**simplifying** or **reducing**:

$$
\frac{6}{8} = \frac{6 \div 2}{8 \div 2} = \frac{3}{4}.
$$

A fraction is in its **simplest form** when no number larger than $1$
divides both top and bottom evenly. The biggest such number is the
**greatest common divisor** of $a$ and $b$ — you'll meet a fast way
to compute it (Euclid's algorithm) in a later strand.

## Computational

Python has a built-in `Fraction` type that handles this exactly:

```python
from fractions import Fraction

a = Fraction(3, 8)
b = Fraction(6, 16)

print(a)         # 3/8
print(b)         # 3/8  — automatically simplified!
print(a == b)    # True

print(float(a))  # 0.375  — convert to decimal
```

The simplification happens automatically — `Fraction(6, 16)` is
internally stored as $\tfrac{3}{8}$ because the common factor $2$
gets divided out. You can also do it by hand:

```python
def simplify(num, den):
    # Find the biggest number that divides both.
    g = 1
    for k in range(1, min(num, den) + 1):
        if num % k == 0 and den % k == 0:
            g = k
    return num // g, den // g

print(simplify(6, 8))    # (3, 4)
print(simplify(15, 25))  # (3, 5)
print(simplify(7, 11))   # (7, 11) — already simplest, no common factor
```

That loop is slow for big numbers, but it's the right *idea*. Strand 1
Intermediate will introduce Euclid's algorithm, which finds the GCD
in milliseconds for any size.

## Derivational

*Why* does multiplying numerator and denominator by the same number
keep the fraction's value the same?

A fraction is a quotient — a division held back. So $\dfrac{a}{b}$
**means** $a \div b$. Now consider what happens when you multiply
both:

$$
\frac{a \times k}{b \times k} = (a \times k) \div (b \times k).
$$

Algebra (or, more honestly, the way division works) says this is the
same as

$$
\frac{a}{b} \times \frac{k}{k} = \frac{a}{b} \times 1 = \frac{a}{b}.
$$

Multiplying by $\dfrac{k}{k}$ is multiplying by $1$, which never
changes the value. **You can multiply or divide a fraction's top and
bottom by the same nonzero number freely** — that single fact is the
foundation of every fraction technique you'll see.

It's also why the three pictures (pie, bar, number line) line up.
Cutting each existing slice in half and shading twice as many gives
you exactly the same shaded amount — the picture changed, the
quantity didn't.

## Connective

Fractions show up under many names:

- **Ratios**: a $16:9$ widescreen aspect ratio is the fraction
  $\dfrac{16}{9}$ — width relative to height.
- **Percentages**: $25\%$ is just shorthand for $\dfrac{25}{100}$,
  which simplifies to $\dfrac{1}{4}$.
- **Probability**: "$3$ chances out of $8$" is $\dfrac{3}{8}$ — same
  fraction we drew. Strand 6 (Uncertainty) builds on this.
- **Slope of a line**: "rise over run" is a fraction. Strand 4
  (Change) opens with this picture.

Whenever you see "out of," "per," or "to" in plain English ("3 out
of 8 doctors recommend," "60 km per hour," "16:9 aspect"), you're
looking at a fraction.

## Applied

- **Discounts**: $25\%$ off is $\tfrac{1}{4}$ off. A $\$80$ shirt
  with $25\%$ off is $\$80 \times \tfrac{3}{4} = \$60$ — three
  quarters of the price remains.
- **Recipes**: a recipe calls for $\tfrac{2}{3}$ cup of milk; you
  want to triple it to feed more people. Triple of $\tfrac{2}{3}$
  is $2$ cups exactly. Lesson 07 covers this arithmetic.
- **Progress bars**: "$1024$ MB of $2500$ MB downloaded" → a fraction
  of $\tfrac{1024}{2500} \approx 0.41$, shown as a $41\%$-filled bar.
  The bar is literally the bar picture from above.
- **Game balance**: a sword does $\tfrac{1}{3}$ damage on shielded
  enemies. A $90$-damage sword does $30$ damage — which is exactly
  $90 \times \tfrac{1}{3}$.
- **Time**: "$\tfrac{1}{4}$ of an hour" is $15$ minutes. "$\tfrac{1}{3}$
  of an hour" is $20$. We use these constantly without writing the
  fraction down.

## Check Your Understanding

:::widget type=numeric-input prompt="If $\\dfrac{1}{2} = \\dfrac{?}{10}$, what is the missing numerator?" answer=5 explain="Multiply both top and bottom of $\\dfrac{1}{2}$ by $5$ to get $\\dfrac{5}{10}$. Same fraction, different way of writing it.":::

:::widget type=numeric-input prompt="Simplify $\\dfrac{12}{18}$ — what is the new numerator after dividing top and bottom by their biggest common factor?" answer=2 explain="The biggest factor of both $12$ and $18$ is $6$. $12 \\div 6 = 2$, $18 \\div 6 = 3$. So $\\dfrac{12}{18} = \\dfrac{2}{3}$.":::

:::widget type=numeric-input prompt="A class of $30$ students has $18$ girls. What fraction are girls, in simplest form? (Type the numerator.)" answer=3 explain="$\\dfrac{18}{30}$. The biggest common factor of $18$ and $30$ is $6$. $18 \\div 6 = 3$, $30 \\div 6 = 5$. So the simplified fraction is $\\dfrac{3}{5}$.":::

:::widget type=numeric-input prompt="What is $\\dfrac{3}{4}$ as a percentage? (Type the number; no $\\%$ sign.)" answer=75 explain="$\\dfrac{3}{4} = \\dfrac{75}{100} = 75\\%$. Multiply top and bottom by $25$ to get out of $100$.":::
