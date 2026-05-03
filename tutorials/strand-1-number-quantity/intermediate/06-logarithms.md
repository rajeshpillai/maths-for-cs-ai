---
strand: number-quantity
level: intermediate
order: 6
title: Logarithms — Exponents Reversed
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 05-powers-and-exponent-rules
    description: Powers and exponent rules
connections:
  - strand-1-number-quantity-intermediate/08-floating-point-base-2
applications:
  - cs: "Algorithm complexity (binary search is O(log n)), file-size scaling, entropy"
  - business: "Compound-interest doubling time (rule of 70), depreciation curves"
  - games: "Decibels for audio, Richter scale for damage tiers"
  - life: "Sound (dB), earthquakes (Richter), pH, perception (Weber-Fechner)"
---

# Logarithms — Exponents Reversed

## Mental

A **logarithm** answers the question: *"to what power must I raise
the base to get this number?"*

If $b^x = y$, then $\log_b y = x$.

In words: $\log_b y$ is *the exponent that gives $y$ when you raise
$b$ to it*. Examples:

- $\log_{10} 1000 = 3$, because $10^3 = 1000$.
- $\log_2 8 = 3$, because $2^3 = 8$.
- $\log_5 25 = 2$, because $5^2 = 25$.
- $\log_{10} 1 = 0$, because $10^0 = 1$.
- $\log_{10} 0.1 = -1$, because $10^{-1} = 0.1$.

The logarithm and the exponent are **inverses** of each other —
$\log_b(b^x) = x$ and $b^{\log_b y} = y$. Whatever exponentiation
does, logarithm undoes.

The single most useful fact about logarithms: **they convert
multiplication into addition**.

$$
\log_b(x \cdot y) = \log_b x + \log_b y.
$$

This is just the exponent rule $b^m \cdot b^n = b^{m+n}$ from Lesson
05, read in reverse. If $x = b^m$ and $y = b^n$, then $xy = b^{m+n}$,
and $\log_b(xy) = m + n = \log_b x + \log_b y$.

Before electronic calculators, this property was *the* reason
logarithms existed. To multiply two large numbers, you'd:

1. Look up each number's logarithm in a table.
2. **Add** the logarithms (much easier than multiplying).
3. Look up the sum in the table backwards (an antilog).

Slide rules embodied this idea physically — a slide rule is a
mechanical log-table with sliding rulers. From roughly 1620 (when
logs were invented) to 1970 (when calculators became cheap), every
engineer in the world owned a slide rule.

## The three log rules

From the three exponent rules, three log rules follow:

$$
\begin{aligned}
\log_b(x \cdot y) &= \log_b x + \log_b y && \text{(product rule)} \\
\log_b\!\left(\frac{x}{y}\right) &= \log_b x - \log_b y && \text{(quotient rule)} \\
\log_b(x^p) &= p \cdot \log_b x && \text{(power rule)}
\end{aligned}
$$

These are the **only** rules you need.

## Three special bases

Three bases get used so often they have shortened names:

| Base | Name | Notation | Used in |
|---|---|---|---|
| $10$ | common log | $\log x$ (sometimes $\log_{10}$) | engineering, decibels, pH |
| $e \approx 2.718$ | natural log | $\ln x$ | calculus, statistics, finance |
| $2$ | binary log | $\log_2 x$ (sometimes $\lg$) | computer science |

The number $e$ is a transcendental constant (like $\pi$); Strand 4
(Change) introduces it formally. For now, take $\ln$ as "the natural
log" and trust that it's the most calculus-friendly choice.

## Interactive

:::widget type=numeric-input prompt="What is $\\log_{10} 1\\,000\\,000$?" answer=6 explain="$10^6 = 1\\,000\\,000$, so $\\log_{10} 1\\,000\\,000 = 6$. The base-10 log of a 'round' number is just 'how many zeros.'":::

:::widget type=numeric-input prompt="What is $\\log_2 256$?" answer=8 explain="$2^8 = 256$, so $\\log_2 256 = 8$. (Memorable: $256 = $ 'one byte's worth of values'.)":::

:::widget type=numeric-input prompt="What is $\\log_2 1024$?" answer=10 explain="$2^{10} = 1024$, so $\\log_2 1024 = 10$. This is why 1 KB used to mean 1024 bytes.":::

:::widget type=numeric-input prompt="What is $\\log_{10} 0.01$?" answer=-2 explain="$10^{-2} = 0.01$, so $\\log_{10} 0.01 = -2$. Negative log = number less than $1$.":::

:::widget type=numeric-input prompt="Use the product rule: $\\log_{10}(100 \\cdot 1000) = ?$" answer=5 explain="$\\log_{10} 100 + \\log_{10} 1000 = 2 + 3 = 5$. Cross-check: $100 \\cdot 1000 = 100\\,000 = 10^5$. ✓":::

:::widget type=numeric-input prompt="Use the quotient rule: $\\log_{10}(\\dfrac{1\\,000\\,000}{100}) = ?$" answer=4 explain="$\\log_{10} 1\\,000\\,000 - \\log_{10} 100 = 6 - 2 = 4$. Cross-check: $\\dfrac{10^6}{10^2} = 10^4$. ✓":::

:::widget type=numeric-input prompt="Use the power rule: $\\log_2(8^3) = ?$" answer=9 explain="$3 \\cdot \\log_2 8 = 3 \\cdot 3 = 9$. Cross-check: $8^3 = 512 = 2^9$. ✓":::

:::widget type=step-revealer
{
  "title": "The 'rule of 70' for doubling time",
  "steps": [
    {"prose": "If money grows at rate $r$ per year (e.g., $r = 0.05$ for $5\\%$), how many years until it doubles?"},
    {"math": "(1 + r)^n = 2", "prose": "We want the year-count $n$ that doubles the principal."},
    {"math": "n \\cdot \\ln(1 + r) = \\ln 2", "prose": "Take natural log of both sides; use the power rule."},
    {"math": "n = \\frac{\\ln 2}{\\ln(1 + r)}", "prose": "Solve for $n$. $\\ln 2 \\approx 0.693$."},
    {"math": "\\ln(1 + r) \\approx r \\quad \\text{for small } r", "prose": "**Key approximation**: when $r$ is small (a few percent), $\\ln(1 + r) \\approx r$. Calculus (Strand 4) will derive this."},
    {"math": "n \\approx \\frac{0.693}{r} = \\frac{69.3}{r \\cdot 100} \\approx \\frac{70}{r\\%}", "prose": "**Rule of 70**: doubling time in years $\\approx \\dfrac{70}{\\text{percent rate}}$."},
    {"math": "5\\% \\Rightarrow \\frac{70}{5} = 14 \\text{ years} \\\\ 7\\% \\Rightarrow \\frac{70}{7} = 10 \\text{ years} \\\\ 10\\% \\Rightarrow \\frac{70}{10} = 7 \\text{ years}", "prose": "Famous shortcut. Bankers, demographers, and inflation watchers use this constantly."}
  ]
}
:::

## Symbolic

The defining identity:

$$
b^x = y \iff \log_b y = x.
$$

Here $b > 0$ and $b \ne 1$ (otherwise the exponential isn't a
bijection — every $b^x$ would be $1$). And $y > 0$ — the log of a
non-positive number isn't a real number (Strand 1 Advanced will
introduce complex logs).

The three rules:

$$
\begin{aligned}
\log_b(xy) &= \log_b x + \log_b y, \\
\log_b\!\left(\frac{x}{y}\right) &= \log_b x - \log_b y, \\
\log_b(x^p) &= p \log_b x.
\end{aligned}
$$

Plus a **change-of-base** formula that lets you convert between
bases:

$$
\log_b x = \frac{\log_c x}{\log_c b}.
$$

In particular:

$$
\log_2 x = \frac{\ln x}{\ln 2} = \frac{\log_{10} x}{\log_{10} 2}.
$$

So if your calculator only has $\log$ (base $10$) and $\ln$ (base
$e$), you can compute logs in any base. $\ln 2 \approx 0.6931$,
$\log_{10} 2 \approx 0.3010$.

A nuance: $\log_b 1 = 0$ in every base (since $b^0 = 1$). And
$\log_b b = 1$. These two values are universal.

## Computational

Python's `math` module has all three common logs:

```python
import math

print(math.log(2.71828))       # 0.99999...  (natural log, base e)
print(math.log10(1000))        # 3.0          (base 10)
print(math.log2(256))          # 8.0          (base 2)
print(math.log(100, 10))       # 2.0          (general: log(x, base))

# Verifying log laws
import math
x, y = 12, 5
print(math.log(x * y))                  # 4.0943...
print(math.log(x) + math.log(y))        # 4.0943... (matches)

print(math.log(x ** 3))                 # 7.4515...
print(3 * math.log(x))                  # 7.4515... (matches)
```

Logarithms are surprisingly hard to compute from scratch — the standard
approach uses Taylor series (Strand 4) plus careful argument
reduction. We won't implement one here; trust `math.log` for now.

A typical "logs in CS" example: counting digits.

```python
def digit_count(n):
    """Number of decimal digits in a positive integer n."""
    if n <= 0:
        return 1
    return int(math.log10(n)) + 1

print(digit_count(7))         # 1
print(digit_count(99))        # 2
print(digit_count(1000))      # 4
print(digit_count(10**100))   # 101  — 'googol' has 101 digits
```

The reasoning: a number $n$ has $\lfloor \log_{10} n \rfloor + 1$
decimal digits, because $10^{k} \le n < 10^{k+1}$ exactly when
$n$ has $k+1$ digits.

## Derivational

*Why* does $\log_b(xy) = \log_b x + \log_b y$?

Let $m = \log_b x$ and $n = \log_b y$. By definition,

$$
b^m = x, \quad b^n = y.
$$

Multiplying, $b^m \cdot b^n = xy$. By the exponent rule from Lesson 05,

$$
b^m \cdot b^n = b^{m + n} = xy.
$$

So $\log_b(xy) = m + n = \log_b x + \log_b y$. The product rule is
just the exponent rule "multiplication of equal bases adds
exponents," restated as "log of product = sum of logs."

The power rule $\log_b(x^p) = p \log_b x$ has a similar derivation.
Let $m = \log_b x$, so $x = b^m$. Raise both sides to the $p$:

$$
x^p = b^{mp}.
$$

So $\log_b(x^p) = mp = p \log_b x$. ✓

The change-of-base formula:

$$
\log_b x = \frac{\log_c x}{\log_c b}.
$$

Let $m = \log_b x$, so $b^m = x$. Take $\log_c$ of both sides
(using the power rule):

$$
m \log_c b = \log_c x.
$$

Solve for $m$: $m = \dfrac{\log_c x}{\log_c b}$. ✓

These three identities are the entire content of "log laws"
typically taught in school. Each is just the exponent rule restated.

## Connective

Logs unify several big ideas:

- **Place value** (Foundation Lesson 01): the number of digits of
  $n$ in base $b$ is $\lfloor \log_b n \rfloor + 1$.
- **Algorithmic complexity** (Strand 5): binary search visits
  $O(\log n)$ items in a sorted list of $n$. Each step halves the
  search space — that's where the log appears.
- **Information theory** (Strand 6 Advanced): the **entropy** of a
  random variable measures information in bits, defined as
  $-\sum p_i \log_2 p_i$. Logs naturally express *amount of
  uncertainty*.
- **Calculus** (Strand 4): the natural log $\ln$ is the integral of
  $\dfrac{1}{x}$ — making it the only log that arises naturally from
  rate-of-change reasoning.
- **Music** (Strand 8): pitch is perceived logarithmically. Doubling
  the frequency raises the pitch by exactly one octave; the next
  doubling raises by another. Equal-tempered tuning is the
  exponential corresponding to this log perception.

## Applied

- **Decibels (sound)**: $\text{dB} = 10 \log_{10}(P / P_\text{ref})$
  where $P$ is sound power. Doubling the power adds $\sim 3$ dB; ten
  times the power adds $10$ dB. Human ears perceive loudness
  logarithmically — that's why we use the log scale.
- **Richter scale (earthquakes)**: a magnitude $7$ earthquake
  releases $10$ times the energy of a magnitude $6$. Each whole-
  number step is a tenfold energy increase.
- **pH (chemistry)**: $\text{pH} = -\log_{10}[\text{H}^+]$. A pH $5$
  solution is *ten times* more acidic than pH $6$.
- **Compound interest doubling time** (rule of 70): if money grows
  at $r\%$ per year, doubling takes $\dfrac{70}{r}$ years. Same
  rule for population growth, viral spread, Moore's law.
- **Algorithmic complexity**: binary search of $1$ million items
  takes $\sim \log_2 10^6 \approx 20$ comparisons. Linear search
  would take $\sim 500\,000$. The log is the difference between
  feasible and infeasible.
- **Star magnitudes (astronomy)**: each magnitude difference is a
  factor of $\sqrt[5]{100} \approx 2.512$ in brightness. The
  brightest stars are around magnitude $1$; the faintest visible to
  the naked eye are around $6$ — about $100\times$ dimmer.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\log_2 32 = ?$" answer=5 explain="$2^5 = 32$.":::

:::widget type=numeric-input prompt="$\\log_{10}(0.001) = ?$" answer=-3 explain="$10^{-3} = 0.001$.":::

:::widget type=numeric-input prompt="$\\log_5 1 = ?$" answer=0 explain="$5^0 = 1$. The log of $1$ is $0$ in every base.":::

:::widget type=numeric-input prompt="A bank pays $7\\%$ annual interest. By the rule of 70, how many years to double your money?" answer=10 explain="$\\dfrac{70}{7} = 10$ years.":::
