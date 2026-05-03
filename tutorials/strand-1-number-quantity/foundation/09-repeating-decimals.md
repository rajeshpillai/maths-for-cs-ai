---
strand: number-quantity
level: foundation
order: 9
title: Repeating Decimals
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 08-decimals-and-place-value
    description: Decimals and place value
connections:
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
applications:
  - business: "Recognising 'never-ending' currency conversions; rounding decisions"
  - cs: "Why floating point can't store 0.1 exactly; periodic patterns in pseudo-random sequences"
  - games: "Knowing when a physics calculation needs rational arithmetic"
  - life: "Why 1/3 of a foot is awkward — it's 0.333… inches forever"
---

# Repeating Decimals

## Mental

Some fractions, when you carry out the division, give a **clean, finite
decimal**:

$$
\tfrac{1}{2} = 0.5, \qquad \tfrac{1}{4} = 0.25, \qquad \tfrac{3}{8} = 0.375.
$$

Others **never stop** — the digits keep going forever in a repeating
pattern:

$$
\tfrac{1}{3} = 0.333\ldots, \qquad \tfrac{1}{7} = 0.142857142857\ldots, \qquad \tfrac{2}{11} = 0.181818\ldots
$$

Both kinds are perfectly valid. **Repeating decimals are not "wrong"
— they're just the truth, written out.** The strange-looking ones
($\tfrac{1}{7}$ in particular) repeat in chunks of several digits at
a time. We mark the repeating block with a **bar** over it, like

$$
\tfrac{1}{7} = 0.\overline{142857}
$$

(the bar is over $142857$, meaning that block goes on forever).

The natural question is: *why* do some fractions terminate and others
don't? And *why* does the repetition show up in chunks of a particular
length? The answer comes from looking carefully at long division.

## Interactive

Watch what happens when you long-divide $1 \div 7$. Reveal one step
at a time and notice when something *repeats*.

:::widget type=step-revealer
{
  "title": "Long-dividing 1 ÷ 7 step by step",
  "steps": [
    {"math": "1 \\div 7 = 0 \\text{ remainder } 1", "prose": "We start with the whole part. $1$ doesn't contain a full $7$, so the integer part is $0$. The remainder is $1$ — that's what we carry into the decimal places."},
    {"math": "10 \\div 7 = 1 \\text{ remainder } 3", "prose": "Append a zero to the remainder ($1 \\to 10$) and divide by $7$ again. First decimal digit: $\\mathbf{1}$. New remainder: $3$. So far: $0.1$."},
    {"math": "30 \\div 7 = 4 \\text{ remainder } 2", "prose": "Bring down a zero. $30 \\div 7 = 4$ with remainder $2$. So far: $0.14$."},
    {"math": "20 \\div 7 = 2 \\text{ remainder } 6", "prose": "Same routine. So far: $0.142$."},
    {"math": "60 \\div 7 = 8 \\text{ remainder } 4", "prose": "So far: $0.1428$."},
    {"math": "40 \\div 7 = 5 \\text{ remainder } 5", "prose": "So far: $0.14285$."},
    {"math": "50 \\div 7 = 7 \\text{ remainder } 1", "prose": "So far: $0.142857$. **Look at the remainder: $1$.** That is exactly where we started in step 2."},
    {"math": "\\tfrac{1}{7} = 0.\\overline{142857}", "prose": "Because we're back at remainder $1$, the next steps will produce the same digits ($1, 4, 2, 8, 5, 7$) all over again — and again, and again, forever. The repeating block has length $\\mathbf{6}$."}
  ]
}
:::

The whole secret of repeating decimals is in step 7: **the remainder
came back to a value we had before**. Once any remainder repeats, the
entire sequence of subsequent digits must repeat — the same calculation
will play out the same way.

:::widget type=numeric-input prompt="What is $\\dfrac{1}{3}$ as a decimal? Type the recurring digit (just one digit)." answer=3 explain="$1 \\div 3$: $10 \\div 3 = 3$ remainder $1$, then $10 \\div 3$ again, remainder $1$ forever. Decimal: $0.333\\ldots = 0.\\overline{3}$.":::

:::widget type=numeric-input prompt="The repeating block of $\\dfrac{1}{7} = 0.\\overline{142857}$ has how many digits?" answer=6 explain="The block $142857$ is six digits long. This is the maximum possible for division by $7$ — there are six possible nonzero remainders ($1, 2, 3, 4, 5, 6$), and each one happens exactly once before the cycle restarts.":::

## Symbolic

When you divide an integer $a$ by an integer $b$, the long-division
process at each step has only finitely many possible **remainders**:
$0, 1, 2, \ldots, b - 1$. That's at most $b$ different values.

If a remainder of $0$ ever appears, the division **terminates** — the
decimal stops there, no more digits to compute.

If $0$ never appears, then by the **pigeonhole principle** (you have
at most $b - 1$ nonzero remainders to choose from, and you keep
generating them), some remainder **must repeat** — and as soon as it
repeats, the whole subsequent sequence of digits repeats too. So the
decimal is **eventually periodic** — it settles into a repeating
block whose length is at most $b - 1$.

The two-line summary:

> **Every fraction's decimal expansion either terminates or repeats.
> Nothing else is possible.**

The opposite is also true (and this is more remarkable): every
terminating-or-repeating decimal corresponds to some fraction. So the
fractions and the (eventually periodic) decimals are exactly the same
set of numbers — different costumes, same identity.

A decimal that **never terminates and never repeats** is not a
fraction — it's an **irrational number**. $\pi$ and $\sqrt{2}$ are
the famous examples. We won't compute with them in this lesson, but
their existence is the reason "rational" is a meaningful word.

## Computational

Python can carry out the long division for you. The same loop you
saw in Lesson 04 — peel off the next digit by dividing the remainder
by the divisor — produces the decimal expansion:

```python
def decimal_digits(num, den, n):
    """Return the first n decimal digits of num / den.
    Stops early if the division terminates (remainder reaches 0)."""
    digits = []
    rem = num % den
    for _ in range(n):
        rem = rem * 10
        d = rem // den
        rem = rem % den
        digits.append(d)
        if rem == 0:
            break
    return digits

print(decimal_digits(1, 7, 12))    # [1, 4, 2, 8, 5, 7, 1, 4, 2, 8, 5, 7]
print(decimal_digits(1, 4, 12))    # [2, 5]   — terminated early
print(decimal_digits(1, 3, 6))     # [3, 3, 3, 3, 3, 3]
```

To **detect** the repeating block, track which remainders you've
already seen. The first time a remainder reappears, you've found the
start of the cycle:

```python
def repeating_block(num, den):
    """Return (non_repeating_digits, repeating_digits) for num / den."""
    seen = {}
    digits = []
    rem = num % den
    while rem != 0:
        if rem in seen:
            start = seen[rem]
            return digits[:start], digits[start:]
        seen[rem] = len(digits)
        rem = rem * 10
        digits.append(rem // den)
        rem = rem % den
    return digits, []   # division terminated, no repeating block

print(repeating_block(1, 7))     # ([], [1, 4, 2, 8, 5, 7])
print(repeating_block(1, 6))     # ([1], [6])  — 1/6 = 0.1666...
print(repeating_block(1, 4))     # ([2, 5], [])  — terminates
```

Notice $\dfrac{1}{6} = 0.1\overline{6}$ — one digit before the
repeat starts, then a single $6$ repeating forever.

## Derivational

*Why* does a decimal terminate exactly when the denominator's only
prime factors are $2$ and $5$?

Because $10 = 2 \times 5$. A terminating decimal $0.d_1 d_2 \ldots
d_k$ is, by definition, a fraction whose denominator is some power of
$10$:

$$
0.d_1 d_2 \ldots d_k = \frac{N}{10^k} = \frac{N}{2^k \cdot 5^k}.
$$

So the only prime factors that *can* appear in the denominator of a
terminating decimal are $2$ and $5$. If your fraction's denominator
has any other prime factor (like $3$ or $7$ or $11$), no amount of
multiplying top and bottom by powers of $10$ will make the
denominator vanish — the decimal must repeat.

Try it:

- $\dfrac{1}{8} = \dfrac{1}{2^3}$ → terminates ($0.125$).
- $\dfrac{3}{40} = \dfrac{3}{2^3 \cdot 5}$ → terminates ($0.075$).
- $\dfrac{1}{12} = \dfrac{1}{2^2 \cdot 3}$ → repeats (because of the
  $3$): $0.08\overline{3}$.
- $\dfrac{1}{7}$ → repeats (the denominator has prime factor $7$).

The **length** of the repeating block, when it exists, is determined
by the denominator's other prime factors. $\dfrac{1}{7}$'s block is
$6$ digits long because $7$ has the special property that the
*smallest* power of $10$ that leaves remainder $1$ when divided by
$7$ is $10^6 = 1\,000\,000$. (Strand 5's number-theory lessons go
deeper into this.)

## Connective

Repeating decimals connect to several big ideas:

- **Modular arithmetic**: the long-division loop is exactly the
  computation of $10^k \bmod b$ at each step. Strand 5 will treat
  this rigorously.
- **Geometric series**: the formula $0.\overline{3} = \tfrac{1}{3}$
  comes from summing the infinite series $\tfrac{3}{10} +
  \tfrac{3}{100} + \tfrac{3}{1000} + \cdots$, which Strand 4 (Change)
  studies.
- **Floating point in computers**: as Lesson 08 mentioned, $0.1$ in
  base $10$ is a *repeating* decimal in base $2$ — its binary
  expansion is $0.0\overline{0011}$. That's why $0.1 + 0.2 \ne 0.3$
  exactly when stored in IEEE 754.
- **Pseudo-random number generators**: many PRNGs rely on the same
  "remainders cycle eventually" fact — they pick a divisor with a
  long cycle so the random-looking sequence doesn't repeat too soon.

## Applied

- **Currency conversion**: $\$1$ at an exchange rate of
  $\dfrac{1}{3}$ becomes a "$0.333\ldots$" amount in the other
  currency. In practice, you round to two decimal places and absorb
  the tiny rounding error.
- **Tip splitting**: $\$100$ tip split among $3$ people is $\$33.33$
  each, with a cent left over. The remainder is the practical
  consequence of $\dfrac{1}{3}$ being repeating.
- **Imperial units**: one foot is $\dfrac{1}{3}$ of a yard, which is
  $0.333\ldots$ — exactly why imperial measurements are awkward in
  decimal arithmetic. Metric units use only powers of $10$ in their
  conversions, so they always terminate.
- **Computer storage**: the surprise that $0.1 + 0.2 = 0.30000\ldots
  4$ in Python is exactly the repeating-decimal phenomenon — but in
  base $2$. Lesson 08 introduced the symptom; this lesson explains
  the cause.

## Check Your Understanding

:::widget type=numeric-input prompt="Will $\\dfrac{1}{5}$ terminate or repeat? Type 1 if it terminates, 0 if it repeats." answer=1 explain="The denominator $5$ has only the prime factor $5$ — no $3$, $7$, $11$, etc. So it terminates: $\\dfrac{1}{5} = 0.2$.":::

:::widget type=numeric-input prompt="Will $\\dfrac{1}{6}$ terminate or repeat? Type 1 if it terminates, 0 if it repeats." answer=0 explain="$6 = 2 \\times 3$. The factor of $3$ forces a repeat. $\\dfrac{1}{6} = 0.1\\overline{6}$.":::

:::widget type=numeric-input prompt="Will $\\dfrac{7}{40}$ terminate or repeat? Type 1 for terminate, 0 for repeat." answer=1 explain="$40 = 2^3 \\times 5$. Only $2$s and $5$s, so it terminates: $\\dfrac{7}{40} = 0.175$.":::

:::widget type=numeric-input prompt="What is the longest the repeating block of $\\dfrac{1}{13}$ could be? Hint: it's at most $b - 1$." answer=12 explain="At most $13 - 1 = 12$ different nonzero remainders, so the cycle is at most $12$ digits. (For $\\dfrac{1}{13}$ the actual block length is $6$.)":::
