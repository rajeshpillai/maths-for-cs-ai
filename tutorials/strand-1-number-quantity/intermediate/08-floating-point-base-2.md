---
strand: number-quantity
level: intermediate
order: 8
title: Floating Point — Why $0.1 + 0.2 \ne 0.3$
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 05-powers-and-exponent-rules
    description: Powers and exponent rules
  - tier: strand-1-number-quantity-foundation
    slug: 09-repeating-decimals
    description: Repeating decimals
connections:
  - strand-1-number-quantity-foundation/08-decimals-and-place-value
applications:
  - cs: "Why financial software uses Decimal/BigInt instead of float; numeric stability"
  - business: "Currency rounding errors, accounting reconciliation"
  - games: "Physics drift over time, position-vs-velocity precision"
  - life: "Spreadsheet quirks, scientific calculator limits"
---

# Floating Point — Why $0.1 + 0.2 \ne 0.3$

## Explain Like I Am 7

Imagine you can only buy chocolate bars in whole halves, quarters,
eighths, sixteenths and so on — never tenths.  Asked to give someone
*a tenth* of a bar, you'd have to chip together a 1/16 plus a 1/32 plus
a tinier sliver and *still* never get it exactly right.  Computers are
in the same fix: their slicing knife only knows powers of two, so
"0.1" is stored as a tiny bit too much.  Add two of those slightly-off
slices together and you get *visibly* off — that's why $0.1 + 0.2$
prints as $0.30000000000000004$.

## Mental

Lesson 09 of Foundation showed that $\dfrac{1}{3}$ has a *repeating
decimal* in base 10: $0.333\ldots$ It can never be written exactly
in finitely many decimal digits. The same lesson previewed a
disturbing fact: in Python, $0.1 + 0.2 = 0.30000000000000004$. Not
$0.3$.

This is **not a Python bug**. Every language with hardware-accelerated
floats — C, Java, JavaScript, Rust, you name it — gives the same
answer. The cause is **how computers store fractional numbers**.

Computers use **binary** (base 2). They have an analogue of decimal
place value, but in powers of $2$ instead of powers of $10$:

$$
\text{decimal: } 4072.85 = 4 \cdot 1000 + 0 \cdot 100 + 7 \cdot 10 + 2 + 8/10 + 5/100.
$$

$$
\text{binary: } 1101.011_2 = 8 + 4 + 1 + 1/4 + 1/8.
$$

The issue: **decimals that terminate in base 10 may not terminate in
base 2.** Recall Lesson 09 of Foundation: a fraction terminates in
base $b$ exactly when its denominator's only prime factors are
primes that divide $b$. Base $10$'s primes are $2$ and $5$. Base
$2$'s only prime is $2$.

So:

- $0.5 = \dfrac{1}{2}$ → terminates in both bases ($0.1_2$).
- $0.25 = \dfrac{1}{4}$ → terminates in both ($0.01_2$).
- $0.1 = \dfrac{1}{10} = \dfrac{1}{2 \cdot 5}$ → terminates in base
  $10$ but **not in base 2** (the factor of $5$ in the denominator
  isn't a power of $2$).

In binary, $0.1$ has the repeating pattern

$$
0.1_{10} = 0.0\overline{0011}_2 = 0.0001100110011\ldots
$$

The computer rounds this to ~$52$ binary digits — about $16$
decimal digits of precision — and stores **the rounded value**.
When you add the rounded $0.1$ to the rounded $0.2$, the result
isn't quite $0.3$; it's a sliver above. The visible decimal
$0.30000000000000004$ is exactly that sliver poking through.

The lesson: **floats are an approximation**, almost identical to
exact arithmetic but never quite. For most purposes, this is fine
(scientific simulation, ML weights, graphics). For some purposes
(accounting, financial transactions), it's poison — and you need
exact arithmetic instead.

## IEEE 754 — the universal standard

Almost every computer in the world stores floats according to
**IEEE 754** — the standard adopted in 1985, refined since. A
double-precision (`float64`) number uses **64 bits**:

| Field | bits | what it stores |
|---|---|---|
| sign | 1 | $0$ for positive, $1$ for negative |
| exponent | 11 | the power of $2$, biased by $1023$ |
| mantissa | 52 | the significant bits |

A number is represented as

$$
\text{value} = (-1)^{\text{sign}} \cdot (1 + \text{mantissa}) \cdot 2^{\text{exponent} - 1023}.
$$

The mantissa is a fraction in $[0, 1)$ — the computer stores its $52$
binary digits. The "$1 +$" is implicit (saving one bit) — it's just
binary scientific notation.

The dynamic range is enormous: from about $10^{-308}$ to $10^{308}$.
The **precision** is about $15$–$16$ decimal digits.

## Interactive

:::widget type=numeric-input prompt="What is $0.5$ in binary? Type the binary digits after the point. (e.g., $0.5 = 0.1$ in binary, so type 1.)" answer=1 explain="$0.5 = \\dfrac{1}{2} = 1 \\cdot 2^{-1}$, which is $0.1$ in binary. Just one digit.":::

:::widget type=numeric-input prompt="How many binary digits after the point are needed to write $0.25$ exactly?" answer=2 explain="$0.25 = \\dfrac{1}{4} = 0.01_2$. Two digits after the point: a $0$ then a $1$.":::

:::widget type=numeric-input prompt="Why does $0.1$ have a repeating expansion in base 2? (Type 1 if it's because $10 = 2 \\cdot 5$, 0 if for another reason.)" answer=1 explain="$0.1 = \\dfrac{1}{10} = \\dfrac{1}{2 \\cdot 5}$. The factor of $5$ in the denominator isn't a power of $2$, so the binary expansion doesn't terminate (Foundation Lesson 09's terminating-decimal rule, reapplied to base $2$).":::

:::widget type=numeric-input prompt="A double-precision float has $52$ mantissa bits, giving roughly $\\log_{10}(2^{52})$ decimal digits of precision. What's that approximately?" answer=15 explain="$\\log_{10}(2^{52}) = 52 \\cdot \\log_{10} 2 \\approx 52 \\cdot 0.301 \\approx 15.65$. So $\\sim 15$ significant decimal digits.":::

:::widget type=step-revealer
{
  "title": "Why 0.1 + 0.2 ≠ 0.3 in IEEE 754",
  "steps": [
    {"prose": "$0.1$ in binary is $0.0\\overline{0011}_2 = 0.000110011001100\\ldots$ — repeating forever."},
    {"prose": "The computer rounds this to $52$ mantissa bits. Call the rounded value $0.1_*$. It's *very close* to $0.1$ but not exact."},
    {"prose": "$0.2$ has the same problem: stored value $0.2_*$ is close to $0.2$ but slightly off."},
    {"math": "0.1_* + 0.2_*", "prose": "When you add them, the rounded values are added with their tiny errors. The result is *not* the rounded $0.3$ value — it's $0.3$ plus a tiny extra."},
    {"math": "0.30000000000000004", "prose": "That sliver shows up as the tail digits when Python prints the float in full precision."},
    {"prose": "**The fix for accuracy**: use Python's `Decimal` (which stores numbers in base $10$, exactly) or `Fraction` (which stores them as numerator/denominator, exactly). Both are slower than `float`, but they're *correct* for the cases where it matters."}
  ]
}
:::

## Symbolic

A floating-point number is

$$
v = (-1)^s \cdot m \cdot 2^e,
$$

where $s \in \{0, 1\}$ is the sign, $m \in [1, 2)$ is the
**significand** (sometimes "mantissa"), and $e$ is the **exponent**.
$m$ has $52$ bits stored, with an implicit leading $1$.

The **smallest positive normal** double is $2^{-1022} \approx 2.225
\times 10^{-308}$. The **largest** is $(2 - 2^{-52}) \cdot 2^{1023}
\approx 1.798 \times 10^{308}$. **Subnormals** (tiny numbers near
zero) and **special values** ($\pm \infty$, NaN) handle edge cases.

The set of representable doubles is **finite** ($2^{64}$ values, of
which a tiny fraction are NaN/inf). Most real numbers cannot be
represented exactly. When you store an arbitrary real number, the
computer stores the **nearest representable** value.

The relative spacing between adjacent doubles is about $2^{-52}
\approx 2.22 \times 10^{-16}$, called **machine epsilon**. This is
the maximum relative error of any single rounding step:

$$
\text{stored}(x) = x \cdot (1 + \delta), \quad |\delta| \le 2^{-53}.
$$

After many operations, errors accumulate. Numerical analysis
(Strand 7 Master) studies how to keep accumulated error under
control.

## Computational

Python's `float` is IEEE 754 double:

```python
print(0.1 + 0.2)             # 0.30000000000000004
print(0.1 + 0.2 == 0.3)      # False
print(abs(0.1 + 0.2 - 0.3))  # 5.551115123125783e-17  — tiny but nonzero

# How floats actually look
import struct
def bits(x):
    """Return the 64-bit IEEE 754 representation as a 0/1 string."""
    [packed] = struct.unpack(">Q", struct.pack(">d", x))
    return f"{packed:064b}"

print(bits(0.5))    # 0011111111100000000000000000000000000000000000000000000000000000
print(bits(0.1))    # 0011111110111001100110011001100110011001100110011001100110011010
                    #                                                              ^ note rounding
```

Notice the long repeating pattern in the mantissa of $0.1$ — and the
final `010` instead of the expected `01100`. That's the rounding.

Three Python options for exact arithmetic:

```python
# Decimal: base-10 floating point, exact for finite decimals
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))   # 0.3 — exact

# Fraction: rational arithmetic, exact always
from fractions import Fraction
print(Fraction(1, 10) + Fraction(2, 10))  # 3/10 — exact

# Symbolic: SymPy
from sympy import Rational
print(Rational(1, 10) + Rational(2, 10))  # 3/10 — exact, with full algebra
```

For comparing floats safely, never use `==`. Compare with a tolerance:

```python
def almost_equal(a, b, tol=1e-9):
    return abs(a - b) < tol

print(almost_equal(0.1 + 0.2, 0.3))  # True
```

Or use Python's `math.isclose`:

```python
import math
print(math.isclose(0.1 + 0.2, 0.3))  # True (default tol about 1e-9)
```

## Derivational

*Why* is $0.1$ a repeating binary?

$$
0.1 = \dfrac{1}{10} = \dfrac{1}{2 \cdot 5}.
$$

By Foundation Lesson 09 (applied to base $2$): a fraction
$\dfrac{p}{q}$ has a terminating expansion in base $b$ exactly when
$q$ has no prime factors outside the primes that divide $b$.

Base $2$'s only prime is $2$. The denominator $10 = 2 \cdot 5$ has
the prime $5$, which is *not* in $\{2\}$. So $\dfrac{1}{10}$
**must** repeat in binary.

The repeating block has length $4$ (the multiplicative order of $2$
mod $5$ — Lesson 03's modular arithmetic strikes back). The block
is $0011$, so

$$
\dfrac{1}{10} = 0.0\overline{0011}_2.
$$

The leading $0.0$ is because $\dfrac{1}{10} < \dfrac{1}{2}$, so the
first binary digit after the point is $0$.

*Why* do all errors accumulate as roughly machine-epsilon times the
size of the result?

Each operation introduces relative error at most $\epsilon = 2^{-53}$.
A sum $a + b$ has relative error at most $\epsilon$ in the *result*.
A product $ab$ similarly. Over $N$ operations, error grows roughly
as $N \cdot \epsilon$ in the worst case, or $\sqrt{N} \cdot \epsilon$
on random inputs (because errors with random sign cancel — a law of
large numbers situation, Strand 6 Lesson 03).

For most physics simulations or ML training runs, $\sqrt{N \cdot \epsilon}$
is the practical accuracy bound. With $N = 10^6$ and $\epsilon =
10^{-16}$, that's $\sim 10^{-13}$. Plenty for graphics; potentially
problematic for tightly-coupled simulations over very long timescales.

## Connective

Floating point connects several earlier ideas:

- **Place value** (Foundation Lesson 01): the mantissa is just place
  value with a fractional point — but in base $2$.
- **Repeating decimals** (Foundation Lesson 09): the same theorem
  governs which fractions repeat in binary; just substitute base $2$
  in the rule.
- **Powers and exponents** (Lesson 05): IEEE 754's `value = mantissa
  · 2^exponent` is literally scientific notation in base $2$. The
  exponent rules apply to multiplication of floats.
- **Modular arithmetic** (Lesson 03): the multiplicative order of
  $b$ mod $q$ controls the period of the repeating expansion in
  base $b$ — a fact the next lesson on complex numbers will build
  on indirectly.

## Applied

- **Financial software**: every bank, every payment processor uses
  `Decimal` or fixed-point arithmetic, *not* float. A dollar's
  worth of float-rounding error per transaction adds up to
  catastrophe across millions of transactions per day.
- **Currency conversion**: $\$1{,}000$ converted to euros at $0.85$
  and back at $1/0.85$ should give $\$1{,}000$. With floats, you
  often get $\$999.9999\ldots$ — Decimal eliminates this.
- **Physics simulations**: planetary trajectory simulations
  (especially over thousands of orbits) use special techniques
  (symplectic integrators, extended-precision arithmetic) to keep
  cumulative error bounded.
- **Machine learning**: training loops do millions of multiply-adds,
  with errors compounding. Modern ML often uses *lower* precision
  (`float16` or `bfloat16`) intentionally — saving memory and time
  at the cost of more rounding. The training process tolerates this
  surprisingly well.
- **3D graphics**: object positions in a game world drift slightly
  every frame due to float rounding. For small worlds it doesn't
  matter; for huge open worlds (Star Citizen, No Man's Sky), engines
  re-centre coordinates around the camera periodically to avoid
  precision loss far from the origin.
- **Spreadsheet idiosyncrasies**: Excel uses doubles. Old bug:
  `=850 * 77.1` displayed as $65{,}535$ instead of $65{,}534.97$ in
  Excel 2007. The full-precision value is $65{,}534.97$ but the
  display rounded; comparison logic broke. Patched, but illustrative.

## Check Your Understanding

:::widget type=numeric-input prompt="Will $\\dfrac{1}{8}$ terminate in binary? Type 1 yes, 0 no." answer=1 explain="$\\dfrac{1}{8} = \\dfrac{1}{2^3}$ — only the prime $2$ in the denominator. Yes, terminates. ($0.001_2$.)":::

:::widget type=numeric-input prompt="Will $\\dfrac{1}{6}$ terminate in binary? Type 1 yes, 0 no." answer=0 explain="$\\dfrac{1}{6} = \\dfrac{1}{2 \\cdot 3}$. The factor $3$ isn't a power of $2$, so the binary expansion repeats. (It's $0.0\\overline{01}_2$.)":::

:::widget type=numeric-input prompt="What is the approximate machine epsilon $2^{-52}$ in scientific notation? (Type the exponent — i.e. for $2.2 \\times 10^{-16}$, type $-16$.)" answer=-16 explain="$2^{-52} \\approx 2.22 \\times 10^{-16}$. So machine epsilon is about $10^{-16}$.":::

:::widget type=numeric-input prompt="In Python, `0.1 + 0.2 == 0.3` evaluates to what? Type 1 for True, 0 for False." answer=0 explain="False. The result is $0.30000000000000004$, not $0.3$ exactly. Use `math.isclose(...)` or compare with a tolerance.":::
