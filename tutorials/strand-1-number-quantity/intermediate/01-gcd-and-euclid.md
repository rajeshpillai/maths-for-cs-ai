---
strand: number-quantity
level: intermediate
order: 1
title: GCD and Euclid's Algorithm
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 00-primes-and-factorisation
    description: Primes and factorisation
connections:
  - strand-1-number-quantity-intermediate/02-lcm-via-primes
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
applications:
  - cs: "Simplifying fractions; ratio reduction in computer graphics; CRC polynomials"
  - business: "Combining shipment frequencies; maximising tile sizes in packaging"
  - games: "Aspect-ratio simplification (1920:1080 → 16:9 via GCD = 120)"
  - life: "Cutting a 24×36 sheet into the largest possible square tiles (GCD = 12)"
---

# GCD and Euclid's Algorithm

## Explain Like I Am 7

You have a long ribbon and a short ribbon, and you want to cut them
both into pieces that are *exactly* the same length, with no scraps
left over.  What's the **biggest** length that works?  Euclid's clever
trick: chop the long ribbon down by the short one as many times as it
fits, and whatever sticks out becomes your new short ribbon.  Repeat,
and the pieces shrink and shrink until one fits the other perfectly —
*that* tiny leftover piece is the biggest length you can use for
both.

## Mental

The **greatest common divisor** of two whole numbers is the largest
number that divides both. We saw it briefly in Foundation Lesson 06
when simplifying fractions: $\dfrac{12}{18} = \dfrac{2}{3}$ because
$\gcd(12, 18) = 6$.

There are two ways to compute the GCD:

**Method 1 (factorisation)**: factor both numbers, take the primes
they share, multiply.

$$
12 = 2^2 \cdot 3, \quad 18 = 2 \cdot 3^2 \quad \Rightarrow \quad \gcd = 2^1 \cdot 3^1 = 6.
$$

For each prime, take the **smaller** of the two exponents. (Lesson 02
will do the same with the *larger* exponent for LCM.)

**Method 2 (Euclid's algorithm)**: repeatedly replace the larger
number with the remainder when divided by the smaller. This works
without ever factoring — it is **breathtakingly fast**, even for
numbers with hundreds of digits.

> "If $a$ and $b$ are positive integers with $a > b$, then $\gcd(a,
> b) = \gcd(b, a \bmod b)$."

This identity, applied recursively, terminates because the remainder
is always strictly smaller than the divisor. Eventually one operand
hits zero — the other is the GCD.

Watch it on $\gcd(48, 18)$:

| step | a | b | a mod b |
|---|---|---|---|
| 1 | 48 | 18 | 12 |
| 2 | 18 | 12 | 6 |
| 3 | 12 | 6 | 0 |
| 4 | 6 | 0 | — done — |

GCD is $6$. **Three steps.** With factorisation you'd need to find
all the prime factors first.

Euclid stated this algorithm around 300 BCE in *Elements*, Book VII.
It is among the oldest non-trivial algorithms still in active use —
appearing in the Linux kernel, in OpenSSL, in your CPU's
microcode for certain operations.

## Interactive

:::widget type=numeric-input prompt="What is $\\gcd(12, 18)$?" answer=6 explain="$12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$. Common primes: $2^1$ and $3^1$. Product: $6$.":::

:::widget type=numeric-input prompt="What is $\\gcd(15, 28)$?" answer=1 explain="$15 = 3 \\cdot 5$, $28 = 2^2 \\cdot 7$. No common primes — GCD is $1$. (Such pairs are called **coprime** or **relatively prime**.)":::

:::widget type=numeric-input prompt="Apply Euclid: $\\gcd(252, 105) = ?$ (Compute the chain mentally; final answer.)" answer=21 explain="$252 = 2 \\cdot 105 + 42$. $\\gcd(252, 105) = \\gcd(105, 42) = \\gcd(42, 21) = \\gcd(21, 0) = 21$.":::

A step-by-step trace of Euclid on a larger pair:

:::widget type=step-revealer
{
  "title": "Euclid's algorithm: gcd(1071, 462)",
  "steps": [
    {"math": "1071 = 2 \\cdot 462 + 147", "prose": "Divide $1071$ by $462$. Quotient $2$, remainder $147$. So $\\gcd(1071, 462) = \\gcd(462, 147)$."},
    {"math": "462 = 3 \\cdot 147 + 21", "prose": "Now divide $462$ by $147$. Quotient $3$, remainder $21$."},
    {"math": "147 = 7 \\cdot 21 + 0", "prose": "Remainder is zero — the algorithm halts. The last nonzero remainder is the GCD."},
    {"math": "\\gcd(1071, 462) = 21", "prose": "Three steps, no prime factorisation. (For comparison: $1071 = 3 \\cdot 7 \\cdot 51 = 3 \\cdot 7 \\cdot 3 \\cdot 17 = 3^2 \\cdot 7 \\cdot 17$, $462 = 2 \\cdot 3 \\cdot 7 \\cdot 11$. Common primes: $3$ and $7$. Product: $21$. ✓)"}
  ]
}
:::

:::widget type=numeric-input prompt="Apply Euclid: $\\gcd(120, 84) = ?$" answer=12 explain="$120 = 1 \\cdot 84 + 36$, $84 = 2 \\cdot 36 + 12$, $36 = 3 \\cdot 12 + 0$. GCD is $12$.":::

## Symbolic

For two positive integers $a, b$ (with $b > 0$), Euclid's identity:

$$
\gcd(a, b) = \gcd(b, a \bmod b).
$$

The recursion bottoms out at $\gcd(d, 0) = d$ for any $d > 0$. So the
algorithm produces a strictly decreasing sequence of remainders that
terminates with $0$, and the last positive value is $\gcd(a, b)$.

The factorisation view: if

$$
a = p_1^{a_1} p_2^{a_2} \ldots p_r^{a_r}, \quad b = p_1^{b_1} p_2^{b_2} \ldots p_r^{b_r},
$$

(using the same prime list, padding with zero exponents as needed), then

$$
\gcd(a, b) = p_1^{\min(a_1, b_1)} \ldots p_r^{\min(a_r, b_r)}.
$$

The two methods always give the same answer (the FTA from Lesson 00
guarantees factorisations are unique).

A famous bonus from Euclid's algorithm is **Bezout's identity**: for
any positive integers $a, b$, there exist integers $x$ and $y$ such
that

$$
a x + b y = \gcd(a, b).
$$

The integers $x, y$ might be negative, but they exist. For
$\gcd(1071, 462) = 21$, we can run Euclid in reverse to find
$1071 \cdot 3 + 462 \cdot (-7) = 21$. The **extended Euclidean
algorithm** computes these coefficients alongside the GCD — it
underlies modular inverses in cryptography, including RSA.

## Computational

Euclid in three lines of Python:

```python
def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(gcd(48, 18))      # 6
print(gcd(1071, 462))   # 21
print(gcd(120, 84))     # 12
print(gcd(15, 28))      # 1   — coprime
```

Recursive form, often used to make the identity transparent:

```python
def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

print(gcd_recursive(48, 18))   # 6
```

Both forms terminate fast. A theorem (proved later in the strand)
shows the recursion depth is at most $5 \log_{10}(\min(a, b))$ — so
even a $1000$-digit GCD takes at most $\sim 5000$ steps. By contrast,
factoring $1000$-digit numbers is impractical (this is *the* fact
RSA relies on).

The extended algorithm, returning $(g, x, y)$ such that $a x + b y = g$:

```python
def gcd_ext(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = gcd_ext(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return g, x, y

g, x, y = gcd_ext(1071, 462)
print(g, x, y)              # 21, 3, -7
print(1071 * x + 462 * y)   # 21  ✓
```

The extended version is what computes modular inverses, and what
makes RSA decryption possible.

Python actually provides `math.gcd` directly:

```python
import math
print(math.gcd(48, 18))     # 6
print(math.gcd(1071, 462))  # 21
```

## Derivational

*Why* does $\gcd(a, b) = \gcd(b, a \bmod b)$?

Let $r = a \bmod b$, so $a = qb + r$ for some quotient $q$. We claim
the **set of common divisors** of $\{a, b\}$ equals the set of
common divisors of $\{b, r\}$ — and therefore so does the greatest
of them.

(→) If $d \mid a$ and $d \mid b$, then $d \mid r = a - qb$ (a divisor
of two numbers also divides any integer linear combination of them).
So $d$ is a common divisor of $b$ and $r$.

(←) Conversely, if $d \mid b$ and $d \mid r$, then $d \mid a = qb +
r$. So $d$ is a common divisor of $a$ and $b$.

The two sets of common divisors are the same, so their greatest
elements agree: $\gcd(a, b) = \gcd(b, r)$. The remainder $r$ is
**strictly smaller** than $b$, so iterating produces a strictly
decreasing sequence of nonneg integers — which must hit $0$ in
finitely many steps.

The proof has two morals:

1. **GCD = greatest of the *common* divisors**, not just one
   particular divisor.
2. **Euclid's identity is just the property "subtract a multiple
   doesn't change common divisors,"** combined with "the divisor
   shrinks each step." Beautifully simple.

## Connective

GCD is a workhorse:

- **Fraction simplification** (Foundation Lesson 06): the simplified
  form of $\dfrac{a}{b}$ is $\dfrac{a / g}{b / g}$ where $g = \gcd(a,
  b)$.
- **Modular inverses** (Lesson 03): a number $a$ has an inverse modulo
  $n$ iff $\gcd(a, n) = 1$. This is the gateway to encryption.
- **Aspect ratios**: $1920{:}1080 \to 16{:}9$ via $\gcd(1920, 1080) =
  120$.
- **Solving Diophantine equations**: $a x + b y = c$ has integer
  solutions iff $\gcd(a, b) \mid c$. This shows up in optimal-cut
  problems and currency-change problems.

The extended Euclidean algorithm appears in **error-correcting codes**
(Reed-Solomon decoding), **cryptographic key generation**
(generating RSA private keys), and even **integer factorisation
attempts** (some methods work modulo something).

## Applied

- **Aspect-ratio simplification**: a $1920 \times 1080$ display
  divides both by $\gcd(1920, 1080) = 120$ to give the $16{:}9$
  ratio. Same for $2560 \times 1440 \to 16{:}9$ (GCD is $160$).
- **Cryptography**: RSA needs $\gcd(e, \phi(n)) = 1$ when picking
  the public exponent — the entire encrypting/decrypting pair only
  exists because the GCD is $1$.
- **Tiling**: the largest square tile that exactly fits in a
  $h \times w$ room is $\gcd(h, w)$ on a side. A $24 \times 36$ room
  takes $12 \times 12$ tiles ($6$ tiles total).
- **Cycle synchronisation**: two events occurring every $a$ and $b$
  ticks coincide every $\text{lcm}(a, b) = \dfrac{a \cdot b}{\gcd(a,
  b)}$ ticks. We'll see this formally in Lesson 02.
- **Reducing rational numbers in code**: every Python `Fraction`
  internally calls `gcd` to keep numerator and denominator
  coprime. Same for symbolic algebra systems like SymPy and
  Mathematica.
- **CPU instructions**: x86 has a built-in `BSWAP` for byte-swapping
  but no GCD instruction — Euclid is fast enough that hardware
  support is unnecessary. Three-line software algorithm beats
  silicon for numbers up to thousands of bits.

## Check Your Understanding

:::widget type=numeric-input prompt="Compute $\\gcd(36, 24)$." answer=12 explain="$36 = 1 \\cdot 24 + 12$. $24 = 2 \\cdot 12 + 0$. GCD is $12$. (Or via factorisation: $36 = 2^2 \\cdot 3^2$, $24 = 2^3 \\cdot 3$, common: $2^2 \\cdot 3 = 12$.)":::

:::widget type=numeric-input prompt="Two integers are **coprime** when their GCD is what?" answer=1 explain="Coprime = GCD is $1$. The two numbers share no prime factor. Examples: $(8, 9)$, $(15, 28)$, $(7, 11)$.":::

:::widget type=numeric-input prompt="Compute $\\gcd(1000, 750)$." answer=250 explain="$1000 = 1 \\cdot 750 + 250$. $750 = 3 \\cdot 250 + 0$. GCD is $250$. (Factorisation: $1000 = 2^3 \\cdot 5^3$, $750 = 2 \\cdot 3 \\cdot 5^3$, common = $2 \\cdot 5^3 = 250$.)":::

:::widget type=numeric-input prompt="If $\\gcd(a, b) = 1$, what is the simplified form of $\\dfrac{a}{b}$? (Type 1 if it's already in simplest form, 0 otherwise.)" answer=1 explain="Coprime = no common factor to cancel = already in simplest form. Reducing fractions is exactly dividing both top and bottom by their GCD.":::
