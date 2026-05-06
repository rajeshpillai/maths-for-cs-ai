---
strand: number-quantity
level: intermediate
order: 5
title: Powers and Exponent Rules
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 03-mental-multiplication
    description: Mental multiplication
connections:
  - strand-1-number-quantity-intermediate/06-logarithms
  - strand-1-number-quantity-intermediate/08-floating-point-base-2
applications:
  - cs: "Bit shifting (multiply/divide by 2), Big-O notation, complexity analysis"
  - business: "Compound interest, exponential growth/decay, doubling time"
  - games: "Power scaling (level^2 XP curves), framerate analysis (2^n texture sizes)"
  - life: "Population growth, virus spread, compound interest, Moore's law"
---

# Powers and Exponent Rules

## Explain Like I Am 7

Imagine a single magic seed.  Each day, every plant that exists makes
*two* new plants.  After 1 day there are 2 plants, after 2 days there
are 4, after 3 days there are 8 — the count keeps **doubling**, which
is why $2^{10}$ is over a thousand even though $10$ is a tiny number.
Multiplying two powers of 2 just sticks the days together (4 days
plus 3 days = 7 days), and that's the whole reason the exponent rules
work — they're really just rules about *adding the days*.

## Mental

A **power** is repeated multiplication, the way multiplication is
repeated addition. We write $a^n$ for "$a$ multiplied by itself $n$
times":

$$
a^n = \underbrace{a \cdot a \cdot a \cdot \ldots \cdot a}_{n \text{ factors}}.
$$

The number $a$ is the **base**; $n$ is the **exponent** or **power**.
Read $a^n$ as "$a$ to the $n$" or "$a$ to the $n$th power."

Some examples:

- $2^3 = 2 \cdot 2 \cdot 2 = 8$
- $5^2 = 25$ ("$5$ squared")
- $10^6 = 1\,000\,000$ ("ten to the sixth," a million)
- $a^1 = a$ for any $a$

What about exponents that aren't positive whole numbers? The rules
that hold for positive exponents force unique definitions:

| exponent form | what it equals | reason |
|---|---|---|
| $a^0$ | $1$ (when $a \ne 0$) | extends multiplicative identity |
| $a^{-n}$ | $\dfrac{1}{a^n}$ | makes division work as inverse exponent |
| $a^{1/n}$ | $\sqrt[n]{a}$ | makes the $n$-th root match $a^{1/n} \cdot a^{1/n} \cdot \ldots = a$ |
| $a^{p/q}$ | $\sqrt[q]{a^p}$ | combines the two above |

These extensions aren't arbitrary — each is the unique value that
keeps the **exponent rules** consistent. Lesson 06 covers logarithms
(the inverse of powers); Lesson 07 covers surds ($\sqrt{2}$, etc.) in
more depth.

## The exponent rules

Three rules cover everything:

$$
\begin{aligned}
a^m \cdot a^n &= a^{m + n} && \text{(multiplying same base = adding exponents)} \\
\frac{a^m}{a^n} &= a^{m - n} && \text{(dividing same base = subtracting exponents)} \\
(a^m)^n &= a^{m \cdot n} && \text{(power of a power = multiplying exponents)}
\end{aligned}
$$

And one cross-base rule:

$$
a^n \cdot b^n = (a \cdot b)^n.
$$

These rules look mechanical but they encode a deep idea: **the
"size" of a number, measured by its exponent, behaves additively
when you multiply numbers**. This is what makes logarithms — Lesson
06 — useful: they convert multiplication into addition.

## Interactive

:::widget type=numeric-input prompt="Compute $2^{10}$." answer=1024 explain="$2^{10} = 1024$. Worth memorising — it's the 'base of base' for kilobytes, megabytes, etc.":::

:::widget type=numeric-input prompt="Compute $3^4$." answer=81 explain="$3^2 = 9$, $3^4 = 9^2 = 81$.":::

:::widget type=numeric-input prompt="What is $5^0$?" answer=1 explain="Any nonzero number to the $0$ power is $1$. (See Derivational below for why this is the only consistent choice.)":::

:::widget type=numeric-input prompt="What is $2^{-3}$? Type the decimal." answer=0.125 explain="$2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8} = 0.125$.":::

:::widget type=numeric-input prompt="Compute $2^5 \\cdot 2^3$. Use the addition rule." answer=256 explain="Same base, add exponents: $2^{5+3} = 2^8 = 256$. (Verifying: $32 \\cdot 8 = 256$. ✓)":::

:::widget type=numeric-input prompt="Compute $\\dfrac{3^7}{3^4}$." answer=27 explain="Same base, subtract exponents: $3^{7-4} = 3^3 = 27$.":::

:::widget type=numeric-input prompt="Compute $(2^3)^4$." answer=4096 explain="Power of a power: $2^{3 \\cdot 4} = 2^{12} = 4096$.":::

:::widget type=numeric-input prompt="Compute $4^{1/2}$." answer=2 explain="$4^{1/2} = \\sqrt{4} = 2$. The fractional exponent is the root.":::

:::widget type=step-revealer
{
  "title": "Why does a^0 = 1?",
  "steps": [
    {"prose": "We define $a^n$ for positive integers as repeated multiplication. But what should $a^0$ be? Repeated multiplication zero times — that's empty. Convention is one option, but a *consistent* convention forces a unique answer."},
    {"math": "a^m \\cdot a^n = a^{m+n}", "prose": "We want this rule to keep working when $n = 0$:"},
    {"math": "a^m \\cdot a^0 = a^{m + 0} = a^m", "prose": "For this to hold for all $a \\ne 0$ and all $m$, we need $a^0$ to satisfy $a^m \\cdot a^0 = a^m$. The only number that, when multiplied by anything, leaves it unchanged is $1$."},
    {"math": "a^0 = 1 \\quad \\text{(for } a \\ne 0\\text{)}", "prose": "The convention $a^0 = 1$ is the **only** value that keeps the addition-of-exponents rule alive. Anything else would break the algebra."},
    {"prose": "Note: $0^0$ is genuinely ambiguous — different applications use $1$ or leave it undefined. For polynomials and combinatorics, $0^0 = 1$ is the standard convention; for limits in calculus, it's an indeterminate form."}
  ]
}
:::

## Symbolic

Each rule is now justified.

**Rule 1**: $a^m \cdot a^n = a^{m+n}$ for positive integers because

$$
\underbrace{a \cdot \ldots \cdot a}_{m} \cdot \underbrace{a \cdot \ldots \cdot a}_{n} = \underbrace{a \cdot \ldots \cdot a}_{m + n}.
$$

That's just counting factors. The rule extends to negative and
fractional exponents *by definition* — we choose those definitions
specifically so this rule keeps holding.

**Rule 2**: $\dfrac{a^m}{a^n} = a^{m-n}$ follows from Rule 1 applied
to $a^n \cdot a^{m-n} = a^m$, then dividing by $a^n$.

**Rule 3**: $(a^m)^n = a^{mn}$ for positive integers comes from

$$
(a^m)^n = \underbrace{a^m \cdot a^m \cdot \ldots \cdot a^m}_{n} = a^{m + m + \ldots + m} = a^{mn}.
$$

Used Rule 1 inside.

**Cross-base rule**: $a^n \cdot b^n = (ab)^n$ because

$$
\underbrace{a \cdot \ldots \cdot a}_{n} \cdot \underbrace{b \cdot \ldots \cdot b}_{n} = \underbrace{(ab)(ab)\ldots(ab)}_{n}.
$$

Multiplication is commutative, so we can pair up the $a$'s and $b$'s.

A common confusion: there is **no** rule for $a^n + a^n$. Powers
**don't add** when you add bases. $2^3 + 2^3 = 2 \cdot 2^3 = 2^4 \ne
4^3$. Be careful.

Another common trap: $a^{m+n} \ne a^m + a^n$ in general. The addition
rule is for **multiplied** powers, not summed ones.

## Computational

Python uses `**` for exponentiation:

```python
print(2 ** 10)        # 1024
print(3 ** 4)         # 81
print(5 ** 0)         # 1
print(2 ** -3)        # 0.125
print(4 ** 0.5)       # 2.0  — square root via fractional exponent
print(8 ** (1/3))     # 2.0  — cube root
```

Be careful with floating point on fractional exponents:

```python
print(8 ** (1/3))     # 2.0 — but this is approximate
print(round(125 ** (1/3)))   # 5  — sometimes need rounding
```

Python's built-in `pow(base, exp, mod)` does fast modular
exponentiation (Lesson 03), used in cryptography:

```python
print(pow(7, 100, 13))   # 9 — 7^100 mod 13, computed without ever forming 7^100
```

A clean implementation of fast exponentiation by **squaring**:

```python
def fast_pow(base, exp):
    result = 1
    while exp > 0:
        if exp % 2 == 1:
            result = result * base
        base = base * base
        exp = exp // 2
    return result

print(fast_pow(2, 10))    # 1024
print(fast_pow(3, 20))    # 3486784401
```

The trick: every exponent has a **binary representation**, and
$a^{1101_2}$ for example equals $a^{8+4+1} = a^8 \cdot a^4 \cdot
a^1$. We square the base each loop iteration to get $a^2, a^4, a^8,
\ldots$ and multiply in the ones that correspond to set bits in the
exponent. This is $O(\log n)$ multiplications instead of $O(n)$ —
the difference between feasible and infeasible for $n \approx
10^{600}$ in RSA.

## Derivational

*Why* must $a^0 = 1$? The StepRevealer above showed it: any other
value breaks the addition-of-exponents rule.

*Why* must $a^{-n} = \dfrac{1}{a^n}$? Use Rule 1: $a^n \cdot a^{-n} =
a^{n + (-n)} = a^0 = 1$. So $a^{-n}$ must be the multiplicative
inverse of $a^n$, which is $\dfrac{1}{a^n}$.

*Why* must $a^{1/n} = \sqrt[n]{a}$? Use Rule 3: $(a^{1/n})^n =
a^{(1/n) \cdot n} = a^1 = a$. So $a^{1/n}$ is *the* number whose
$n$-th power is $a$ — that's the definition of $\sqrt[n]{a}$.

The takeaway: **fractional and negative exponents aren't separate
rules to memorise; they're the unique extensions of positive-integer
exponents that keep the addition-of-exponents rule consistent.** Once
you internalise that, you can re-derive any exponent rule from the
basic identity $a^m \cdot a^n = a^{m+n}$.

## Connective

Powers are everywhere:

- **Logarithms** (Lesson 06): the *inverse* of exponentiation.
  $\log_b(a^n) = n \log_b a$ — the addition-of-exponents rule turned
  into a multiplication-of-logs rule.
- **Big-O notation** (Strand 5): algorithmic complexity is usually
  expressed as a power: $O(n)$, $O(n^2)$, $O(2^n)$. The exponent
  classifies the speed/feasibility of the algorithm.
- **Polynomials** (Strand 4): a polynomial $a_0 + a_1 x + a_2 x^2 +
  \ldots$ is built from powers of $x$. Algebra is largely the
  manipulation of polynomial expressions.
- **Compound interest**: $\$P$ at rate $r$ for $n$ years grows to
  $P(1 + r)^n$. The exponent gives the year count; the base gives
  the multiplier per year.
- **Place value** (Foundation Lessons 01, 08): every base-$b$
  representation is a sum of $d_j \cdot b^j$. Powers of the base
  *are* the place values.

## Applied

- **Compound interest**: $\$1{,}000$ at $5\%$ annual for $10$ years
  becomes $1000 \cdot 1.05^{10} \approx \$1{,}629$. The exponent
  multiplies the time; the base captures the rate. Doubling
  time $\approx 70/r$ (the "rule of $70$" — Lesson 06 derives it
  via logs).
- **Bit shifts**: in code, `x << n` is $x \cdot 2^n$ and `x >> n` is
  $\lfloor x / 2^n \rfloor$. CPUs do these in one cycle; Python's
  abstraction is `<<` and `>>`.
- **Big-O analysis**: an algorithm with $O(n^3)$ runtime on $n =
  10^4$ data points takes $\sim 10^{12}$ operations — too slow for
  most real machines. $O(n \log n)$ on the same data takes $\sim
  10^5$. The exponent is the bottleneck.
- **Texture sizes in games**: GPU textures are typically $2^n \times
  2^n$ ($256 \times 256$, $512 \times 512$, etc.) for fast
  addressing — bit-shift = power of $2$ = base $2$ exponent.
- **Population growth**: a colony doubling every hour starts at $100$
  and reaches $100 \cdot 2^{24} \approx 1.7$ billion in $24$ hours.
  Exponential growth in action.
- **Moore's law**: transistor counts doubled roughly every $2$ years
  for $\sim 50$ years — $2^{25}$ ($\approx 3 \times 10^7$) times
  more transistors today than in $1971$.

## Check Your Understanding

:::widget type=numeric-input prompt="Compute $2^{16}$." answer=65536 explain="$2^{10} = 1024$, $2^{16} = 2^{10} \\cdot 2^6 = 1024 \\cdot 64 = 65536$. Memorable as 'two bytes' (sixteen-bit unsigned max + 1).":::

:::widget type=numeric-input prompt="Compute $\\dfrac{5^8}{5^5}$." answer=125 explain="Same base: $5^{8-5} = 5^3 = 125$.":::

:::widget type=numeric-input prompt="Compute $(3^2)^3$." answer=729 explain="Power of a power: $3^{2 \\cdot 3} = 3^6 = 729$. Same as $9^3$ if you computed it that way.":::

:::widget type=numeric-input prompt="Compute $27^{2/3}$." answer=9 explain="$27^{2/3} = (27^{1/3})^2 = 3^2 = 9$. Or: $(27^2)^{1/3} = 729^{1/3} = 9$. Both ways agree.":::
