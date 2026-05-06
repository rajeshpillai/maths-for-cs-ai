---
strand: number-quantity
level: intermediate
order: 4
title: Divisibility Rules — From First Principles
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 03-modular-arithmetic
    description: Modular arithmetic
connections:
  - strand-1-number-quantity-foundation/04-mental-division
  - strand-1-number-quantity-intermediate/00-primes-and-factorisation
applications:
  - cs: "Checksums, Luhn algorithm for credit cards, parity bits, ISBN validation"
  - business: "Cash-register quick checks; spotting transposition errors"
  - games: "Hashing player IDs; quick parity-based checks"
  - life: "Quick mental sanity-check on bills and amounts"
---

# Divisibility Rules — From First Principles

## Explain Like I Am 7

A divisibility rule is a magic spell for telling whether a big number
splits up evenly — *without* doing the long division.  "Add the digits;
if the sum is in the three-times table, the whole number is too" is
one such spell.  These tricks aren't lucky coincidences: they fall out
of how our 10-digit number system *behaves on a clock*.  Each rule is
just clock-math wearing a costume — the costume that lets you check
big numbers in your head.

## Mental

You met the **divisibility-by-3** rule in Foundation Lesson 04: a
number is divisible by $3$ if and only if its **digit sum** is. With
modular arithmetic from Lesson 03, we can derive the rule (and its
cousins for $9, 11, 7$) cleanly — and see *why* they work.

The trick is always the same. A number $n$ in base 10 is

$$
n = d_k \cdot 10^k + d_{k-1} \cdot 10^{k-1} + \ldots + d_1 \cdot 10 + d_0.
$$

Reduce mod whatever divisor we care about. The behaviour of $10^j
\bmod d$ controls the rule:

| Divisor $d$ | $10 \bmod d$ | Pattern of $10^j \bmod d$ | Resulting rule |
|---|---|---|---|
| $3$ | $1$ | $1, 1, 1, \ldots$ | digit **sum** divisible by $3$ |
| $9$ | $1$ | $1, 1, 1, \ldots$ | digit sum divisible by $9$ |
| $11$ | $-1$ | $1, -1, 1, -1, \ldots$ | **alternating** digit sum divisible by $11$ |
| $2$ | $0$ | $0, 0, 0, \ldots$ (after first) | last digit even |
| $5$ | $0$ | same | last digit $0$ or $5$ |
| $4$ | $-$ | $10^2 \equiv 0$ | last **two** digits divisible by $4$ |
| $8$ | $-$ | $10^3 \equiv 0$ | last **three** digits divisible by $8$ |

Each rule is just modular arithmetic on the powers of $10$. Once you
see the pattern — $10 \bmod d$ telling you everything — you can
derive a divisibility rule for any divisor.

## Interactive

:::widget type=numeric-input prompt="Is $45\\,612$ divisible by $9$? Type 1 yes, 0 no. (Sum the digits.)" answer=1 explain="$4 + 5 + 6 + 1 + 2 = 18 = 2 \\cdot 9$. Digit sum is divisible by $9$, so $45\\,612$ is too.":::

:::widget type=numeric-input prompt="Is $123\\,456$ divisible by $9$? (Sum the digits.) Type 1 for yes, 0 for no." answer=0 explain="$1 + 2 + 3 + 4 + 5 + 6 = 21$. $21 \\bmod 9 = 3$, not $0$. So $123\\,456$ is NOT divisible by $9$. (It IS divisible by $3$, since $21$ is.)":::

:::widget type=numeric-input prompt="Is $7\\,326$ divisible by $11$? Type 1 yes, 0 no. (Compute the alternating digit sum from the right: $6 - 2 + 3 - 7$.)" answer=1 explain="$6 - 2 + 3 - 7 = 0$. Alternating sum is $0$ — divisible by $11$. (Indeed $7\\,326 = 666 \\cdot 11$.)":::

:::widget type=numeric-input prompt="Compute the alternating digit sum of $912\\,673$ from the right: $3 - 7 + 6 - 2 + 1 - 9$." answer=-8 explain="$3 - 7 + 6 - 2 + 1 - 9 = -8$. Not divisible by $11$ (would need $0$ or $\\pm 11, \\pm 22, \\ldots$).":::

:::widget type=step-revealer
{
  "title": "Why digit-sum tests divisibility by 3",
  "steps": [
    {"prose": "Take any number, say $4072$. Write it out by place value:"},
    {"math": "4072 = 4 \\cdot 1000 + 0 \\cdot 100 + 7 \\cdot 10 + 2", "prose": "Now reduce mod $3$, term by term."},
    {"math": "10 \\equiv 1 \\pmod 3 \\\\ 100 \\equiv 1 \\pmod 3 \\\\ 1000 \\equiv 1 \\pmod 3", "prose": "**Every power of $10$ is congruent to $1$ mod $3$.** Why? Because $10 = 9 + 1 = 3 \\cdot 3 + 1 \\equiv 1$. By the substitution rule (Lesson 03), $10^j \\equiv 1^j = 1$."},
    {"math": "4072 \\equiv 4 \\cdot 1 + 0 \\cdot 1 + 7 \\cdot 1 + 2 \\cdot 1 = 13 \\pmod 3", "prose": "Substitute. The number reduces to its digit sum."},
    {"math": "13 \\equiv 1 \\pmod 3", "prose": "$13 = 4 \\cdot 3 + 1$. So $4072 \\equiv 1 \\pmod 3$ — leaves remainder $1$ when divided by $3$. Not divisible."},
    {"prose": "**General rule**: $n \\equiv (\\text{digit sum of } n) \\pmod 3$. Same proof works for $9$ since $10 \\equiv 1 \\pmod 9$ as well. The digit-sum rule is a *theorem*, not a curiosity."}
  ]
}
:::

## Symbolic

The general principle:

> Reduce $10^j \bmod d$ for each $j$. Then $n = \sum_j d_j \cdot 10^j$
> reduces mod $d$ to $\sum_j d_j \cdot (10^j \bmod d)$.

The pattern of $10^j \bmod d$ is **eventually periodic** (because
there are only $d$ possible remainders, so the sequence must repeat
— pigeonhole, Lesson 01 of Strand 6). The period determines how the
digits combine.

Three useful patterns:

**Pattern 1: $10 \equiv 1 \pmod d$.** All powers of $10$ are $1$ mod
$d$. The rule becomes *digit sum*. This works for $d = 3$ and $d = 9$
(in base 10) — and for $d = b - 1$ in any base $b$.

**Pattern 2: $10 \equiv -1 \pmod d$.** Powers alternate $1, -1, 1, -1$.
The rule becomes *alternating digit sum*. This works for $d = 11$ in
base $10$ — and for $d = b + 1$ in any base $b$.

**Pattern 3: $10 \equiv 0 \pmod d$ (or some power is $0$).** Only the
last few digits matter. Works for $d = 2, 5$ (last digit), $d = 4, 25$
(last two), $d = 8, 125$ (last three).

For other divisors like $7$, the powers cycle $10^1 \equiv 3$, $10^2
\equiv 2$, $10^3 \equiv 6$, $10^4 \equiv 4$, $10^5 \equiv 5$, $10^6
\equiv 1 \pmod 7$ — period $6$. A divisibility rule for $7$ exists,
but it's awkward (you'd weight each digit by $1, 3, 2, 6, 4, 5,
1, 3, \ldots$). For most people it's faster to just divide.

## Computational

A general modular check from first principles:

```python
def is_divisible(n, d):
    return n % d == 0

print(is_divisible(45612, 9))   # True (4+5+6+1+2 = 18 = 2·9)
print(is_divisible(7326, 11))   # True (7-3+2-6 = 0)
print(is_divisible(912673, 11)) # False
```

Implementing the digit-sum rule explicitly (so you can see the
mathematical structure):

```python
def digit_sum(n):
    s = 0
    while n > 0:
        s += n % 10
        n //= 10
    return s

def divisible_by_3_via_digits(n):
    return digit_sum(n) % 3 == 0

print(divisible_by_3_via_digits(4072))   # False (digit sum = 13)
print(divisible_by_3_via_digits(45612))  # True  (digit sum = 18)
```

Alternating digit sum for divisibility by $11$:

```python
def alternating_digit_sum(n):
    s = 0
    sign = 1
    while n > 0:
        s += sign * (n % 10)
        sign *= -1
        n //= 10
    return s

print(alternating_digit_sum(7326))    # ... let's compute the digits
# Digits are 6, 2, 3, 7 (from low to high)
# Alternating: 6 - 2 + 3 - 7 = 0 → divisible by 11

def divisible_by_11(n):
    return alternating_digit_sum(n) % 11 == 0

print(divisible_by_11(7326))   # True
print(divisible_by_11(912673)) # False
```

The **Luhn algorithm** for credit-card validation is essentially a
divisibility-by-$10$ check on a weighted digit sum — same modular
machinery, more elaborate weights:

```python
def luhn_check(card_number):
    """Luhn checksum: total mod 10 must equal 0."""
    digits = [int(c) for c in str(card_number)]
    total = 0
    for i, d in enumerate(reversed(digits)):
        if i % 2 == 1:  # every other digit, starting from second-from-right
            d *= 2
            if d > 9:
                d -= 9
        total += d
    return total % 10 == 0

print(luhn_check(4532015112830366))  # True (typical valid Visa pattern)
print(luhn_check(4532015112830367))  # False — typo'd last digit
```

Every credit card number passes a Luhn check; typos in any single
digit always break it. This is the same idea as the divisibility
rule, just generalised.

## Derivational

Why does $10^j \equiv 1 \pmod 9$ for every $j$?

Because $10 \equiv 1 \pmod 9$ — that's literally the statement that
$9 \mid 10 - 1$. Now use the substitution rule (Lesson 03): if $a
\equiv b$ then $a^j \equiv b^j$. So $10^j \equiv 1^j = 1$ for every
$j \ge 0$.

The same reasoning gives $10^j \equiv 1 \pmod 3$ (since $10 \equiv 1
\pmod 3$).

Why does $10^j$ alternate between $1$ and $-1$ mod $11$?

Because $10 \equiv -1 \pmod{11}$ (since $10 + 1 = 11$). So $10^j
\equiv (-1)^j$, which is $1$ when $j$ is even and $-1$ when $j$ is
odd.

The trick generalises beautifully: for any divisor $d$, computing
the **multiplicative order** of $10$ modulo $d$ tells you the exact
period of the digit-pattern. (Lesson 09 of Foundation hinted at this
when we discussed why $\dfrac{1}{7} = 0.\overline{142857}$ has a
$6$-digit period — same calculation.)

For $d = 7$: $\text{ord}_{7}(10) = 6$, so the pattern repeats every
$6$ digits. For $d = 13$: also $6$. For $d = 17$: $16$. Strand 13
(Advanced Discrete) digs into this with **Fermat's little theorem**.

## Connective

Divisibility rules are baby modular arithmetic:

- They sit at the intersection of **place value** (Foundation Lesson
  01), **modular arithmetic** (Lesson 03), and **the multiplicative
  structure of small numbers** (Lesson 00).
- The same machinery scales up to **error-detecting codes** (CRC,
  parity, Luhn, ISBN, IBAN — all are checksum schemes).
- **Hash functions** like the polynomial hash $h = \sum c_i \cdot
  b^i \bmod p$ are direct generalisations: take a sequence of
  digits/characters, weight by powers of some base, reduce modulo
  some prime.

A neat consequence: **transposition errors** (swapping two adjacent
digits) are caught by any rule whose weights *differ* on adjacent
positions. The digit-sum rule for $9$ misses transpositions (digits
of equal weight) but the alternating sum for $11$ catches them. ISBN
and credit-card checksums are designed exactly to catch this common
human error.

## Applied

- **Mental sanity check on bills**: a quick "digits sum to a multiple
  of $9$" check catches several common arithmetic mistakes when
  totalling receipts.
- **ISBN-10**: the last digit is a checksum modulo $11$, with the
  digits weighted by $10, 9, 8, \ldots, 1$. Any single typo or any
  swap of two adjacent digits breaks the check.
- **Credit-card numbers (Luhn)**: weights of $1$ and $2$ alternating
  from the right, with a "subtract $9$ if doubled value exceeds $9$"
  rule, then mod $10$. Catches typos.
- **CRC (cyclic redundancy check)**: every Ethernet frame, every WiFi
  packet, every ZIP file uses CRC, which is divisibility-by-a-
  polynomial in $\mathbb{Z}_2$ — same idea, fancier algebra.
- **Casting out nines**: an old technique for sanity-checking
  arithmetic by hand. To verify $342 \cdot 17 = 5814$, replace each
  number with its digit sum mod $9$: $342 \to 9 \equiv 0$,
  $17 \to 8$, product $0 \cdot 8 = 0$. And $5814 \to 18 \to 9
  \equiv 0$. Match. (Doesn't catch all errors — it can't catch
  swaps that preserve digit sums — but it's a quick filter.)

## Check Your Understanding

:::widget type=numeric-input prompt="Is $1234567$ divisible by $3$? Type 1 yes, 0 no. (Sum the digits.)" answer=0 explain="$1+2+3+4+5+6+7 = 28$. $28 \\bmod 3 = 1$. Not divisible by $3$.":::

:::widget type=numeric-input prompt="Is $999\\,999$ divisible by $9$? Type 1 yes, 0 no." answer=1 explain="Digit sum: $54 = 6 \\cdot 9$. Yes, divisible by $9$. (Indeed $999\\,999 = 9 \\cdot 111\\,111$.)":::

:::widget type=numeric-input prompt="Is $121$ divisible by $11$? Type 1 yes, 0 no. (Compute the alternating digit sum.)" answer=1 explain="$1 - 2 + 1 = 0$. Divisible by $11$. (And indeed $121 = 11^2$.)":::

:::widget type=numeric-input prompt="In base $16$, what is the largest divisor $d$ for which the digit-sum rule applies (i.e. $16 \\equiv 1 \\pmod d$)?" answer=15 explain="The general fact: $b \\equiv 1 \\pmod{b - 1}$, so the digit-sum rule works for $b - 1$. In base $16$ that's $\\mathbf{15}$ — and any divisor of $15$ ($1, 3, 5, 15$) inherits the rule. (Base $10$: rule for $9$ and $3$. Base $12$: rule for $11$.)":::
