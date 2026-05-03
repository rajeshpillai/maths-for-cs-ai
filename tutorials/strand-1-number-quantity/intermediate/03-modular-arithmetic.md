---
strand: number-quantity
level: intermediate
order: 3
title: Modular Arithmetic — Clock Math
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 01-gcd-and-euclid
    description: GCD (used for modular inverses)
connections:
  - strand-1-number-quantity-intermediate/04-divisibility-rules
  - strand-1-number-quantity-foundation/04-mental-division
applications:
  - cs: "Hash functions, cryptography (RSA, Diffie-Hellman), CRC, day-of-week calculation"
  - business: "Cyclic payment schedules, interest computed at fixed intervals"
  - games: "Wrap-around movement (Pac-Man's tunnels), seeded RNGs, level-time loops"
  - life: "What day of the week was September 1, 1939? (modular weekday arithmetic)"
---

# Modular Arithmetic — Clock Math

## Mental

Look at a clock. It shows hours $0, 1, 2, \ldots, 11$, then wraps
back to $0$. If it's $9$ o'clock and $5$ hours pass, you don't say
"it's $14$ o'clock" — you say "it's $2$." That wrap-around is
**modular arithmetic** in everyday life.

The notation:

$$
14 \equiv 2 \pmod{12}
$$

reads "$14$ is congruent to $2$ modulo $12$" — both numbers leave the
same remainder when divided by $12$. The modulus $12$ is the size of
the cycle.

Two numbers are **congruent mod $n$** when their difference is a
multiple of $n$:

$$
a \equiv b \pmod n \iff n \mid (a - b).
$$

That is the formal definition. The "remainder upon dividing by $n$"
view is the most concrete way to compute it: every integer is
congruent to its remainder, and the remainder is unique in
$\{0, 1, \ldots, n-1\}$.

The arithmetic is the **same as ordinary arithmetic, but reduced mod
$n$ at every step**:

- Addition: $9 + 5 \equiv 2 \pmod{12}$.
- Subtraction: $3 - 7 \equiv -4 \equiv 8 \pmod{12}$.
- Multiplication: $4 \cdot 5 \equiv 8 \pmod{12}$ (because $20 = 12 +
  8$).

You can do the operation first and reduce, **or** reduce first and
operate, **or** reduce in the middle — the answer is the same.
Reducing keeps the numbers small.

Division is more delicate (Lesson covers it deeper later) — only
specific numbers have modular "inverses" — but addition,
subtraction, and multiplication always work.

## Interactive

:::widget type=numeric-input prompt="A clock reads 8 o'clock. What time will it be in 19 hours? (Type the new hour, 0–11.)" answer=3 explain="$8 + 19 = 27 \\equiv 27 - 24 = 3 \\pmod{12}$. (Or: $8 + 19 - 12 - 12 = 3$.) Three o'clock.":::

:::widget type=numeric-input prompt="What is $25 \\bmod 7$?" answer=4 explain="$25 = 3 \\cdot 7 + 4$. Remainder is $4$.":::

:::widget type=numeric-input prompt="What is $(7 + 8) \\bmod 5$?" answer=0 explain="$7 + 8 = 15 = 3 \\cdot 5$. Remainder $0$. (Or, reducing first: $7 \\equiv 2$ and $8 \\equiv 3$ mod $5$, sum is $2 + 3 = 5 \\equiv 0$.)":::

:::widget type=numeric-input prompt="What is $(11 \\cdot 13) \\bmod 12$?" answer=11 explain="$11 \\equiv -1 \\pmod{12}$ (since $-1 + 12 = 11$). $13 \\equiv 1 \\pmod{12}$. So $11 \\cdot 13 \\equiv (-1)(1) = -1 \\equiv 11 \\pmod{12}$. Reducing before multiplying makes hard problems trivial.":::

:::widget type=numeric-input prompt="Today is Wednesday. What day will it be in 100 days?" answer=2 explain="Days of week cycle every $7$. $100 \\bmod 7 = 2$. Two days after Wednesday: **Friday**. (Type 0=Wed, 1=Thu, 2=Fri, ...; answer is **2**.)":::

:::widget type=mental-drill generator=divisibility-by-3 count=10 id=div3-int:::

A step-by-step modular exponentiation walk-through:

:::widget type=step-revealer
{
  "title": "Compute 7^4 mod 10 efficiently",
  "steps": [
    {"prose": "We want $7^4 \\bmod 10$. The naive approach: $7^4 = 2401$, then $2401 \\bmod 10 = 1$. The smart approach: reduce **at every step** so numbers stay small."},
    {"math": "7^1 \\bmod 10 = 7", "prose": "Just $7$."},
    {"math": "7^2 = 49 \\equiv 9 \\pmod{10}", "prose": "Square and reduce."},
    {"math": "7^3 \\equiv 7 \\cdot 9 = 63 \\equiv 3 \\pmod{10}", "prose": "Multiply by $7$, reduce."},
    {"math": "7^4 \\equiv 7 \\cdot 3 = 21 \\equiv 1 \\pmod{10}", "prose": "One more multiplication. Final answer: $7^4 \\equiv 1 \\pmod{10}$. We never had a number larger than $63$."},
    {"prose": "For larger exponents — say $7^{1000} \\bmod 10$ — we'd use **fast modular exponentiation**: $7^2, 7^4, 7^8, 7^{16}, \\ldots$ each computed by squaring the previous and reducing. Even $7^{10^9} \\bmod n$ is fast this way. RSA decryption depends on it."}
  ]
}
:::

## Symbolic

The defining identity:

$$
a \equiv b \pmod n \iff n \mid (a - b).
$$

Equivalent: $a$ and $b$ leave the same remainder when divided by $n$.

The arithmetic plays nicely with congruence — these properties are
sometimes called the **substitution rule**:

$$
\begin{aligned}
a \equiv a' \pmod n \text{ and } b \equiv b' \pmod n
&\Rightarrow a + b \equiv a' + b' \pmod n, \\
&\Rightarrow a - b \equiv a' - b' \pmod n, \\
&\Rightarrow a \cdot b \equiv a' \cdot b' \pmod n.
\end{aligned}
$$

This is why "reduce first, then operate" works — substituting any
representative of $a$'s congruence class doesn't change the answer.

**Modular inverse**: an integer $a$ has a multiplicative inverse mod
$n$ if there's some $b$ with $a \cdot b \equiv 1 \pmod n$. Such a
$b$ exists **if and only if** $\gcd(a, n) = 1$ — and the extended
Euclidean algorithm from Lesson 01 finds it:

$$
\gcd(a, n) = 1 \quad \Rightarrow \quad ax + ny = 1 \quad \Rightarrow \quad ax \equiv 1 \pmod n.
$$

So $x$ is $a$'s inverse modulo $n$. For example, the inverse of $5$
mod $12$ is $5$, because $5 \cdot 5 = 25 \equiv 1 \pmod{12}$. Mod
$12$, $5$ is its own inverse.

The set of integers mod $n$, written $\mathbb{Z}_n$ or $\mathbb{Z}/n\mathbb{Z}$,
forms an interesting algebraic structure: it has well-defined
addition, subtraction, and multiplication. When $n$ is prime, every
nonzero element has an inverse — $\mathbb{Z}_p$ is a **field** (Strand
2 will treat fields formally).

## Computational

Python's `%` operator is the modulo:

```python
print(8 + 19 % 12)        # 27 — Python evaluates % first; this is wrong
print((8 + 19) % 12)      # 3  — parens force the right order

print(25 % 7)             # 4
print(-3 % 12)            # 9  — Python returns a non-negative remainder
print(pow(7, 4, 10))      # 1  — pow(base, exp, mod) is modular exponentiation
```

The `pow(a, b, m)` form is **fast modular exponentiation**: it never
forms the giant intermediate $a^b$, instead reducing modulo $m$ after
each squaring. For RSA-sized arguments ($10^{600}$-digit numbers),
this difference is the difference between a microsecond and never.

Modular inverse via the extended Euclidean from Lesson 01:

```python
def mod_inverse(a, n):
    """Return x such that a*x ≡ 1 (mod n), or None if gcd(a, n) ≠ 1."""
    def gcd_ext(a, b):
        if b == 0: return a, 1, 0
        g, x1, y1 = gcd_ext(b, a % b)
        return g, y1, x1 - (a // b) * y1

    g, x, _ = gcd_ext(a, n)
    if g != 1:
        return None
    return x % n

print(mod_inverse(5, 12))   # 5  (5 * 5 = 25 ≡ 1 mod 12)
print(mod_inverse(7, 26))   # 15 (7 * 15 = 105 = 4 * 26 + 1)
print(mod_inverse(6, 12))   # None (gcd(6, 12) = 6 ≠ 1)
```

A useful one-liner: **day-of-week from a date**. Zeller's congruence
uses modular arithmetic to compute weekday from year/month/day in a
few additions and a `% 7`.

## Derivational

*Why* does the substitution rule (reduce-then-operate works) hold?

Suppose $a \equiv a' \pmod n$ and $b \equiv b' \pmod n$. By
definition, $a - a' = nk$ and $b - b' = nl$ for some integers $k, l$.

For addition: $(a + b) - (a' + b') = (a - a') + (b - b') = n(k + l)$,
which is a multiple of $n$. So $a + b \equiv a' + b' \pmod n$. ✓

For multiplication: $a b - a' b' = a b - a b' + a b' - a' b' = a(b -
b') + b'(a - a') = a \cdot nl + b' \cdot nk = n(al + b'k)$. Multiple
of $n$. So $a b \equiv a' b' \pmod n$. ✓

Both proofs are little algebraic tricks: rewrite the difference, pull
out a factor of $n$, done.

*Why* does $\gcd(a, n) = 1$ guarantee a modular inverse?

By **Bezout's identity** (Lesson 01), there exist integers $x, y$
with $ax + ny = 1$. Reducing modulo $n$ kills the $ny$ term:

$$
ax + ny \equiv 1 \pmod n \quad \Rightarrow \quad ax \equiv 1 \pmod n.
$$

So $x$ (mod $n$) is $a$'s multiplicative inverse.

Conversely, if $a$ has an inverse $b$ mod $n$, then $ab \equiv 1
\pmod n$, so $ab - 1 = nk$ for some $k$, giving $ab - nk = 1$. Any
common divisor of $a$ and $n$ must divide the right side ($1$), so
it must equal $1$. Hence $\gcd(a, n) = 1$.

Both directions are now proved. **The condition is exactly
coprimality.**

## Connective

Modular arithmetic underlies vast swaths of math and CS:

- **Cryptography** (Strand 6 Advanced): RSA, Diffie-Hellman, ECC,
  almost every cryptographic algorithm computes mod a large prime
  or a product of primes.
- **Hash functions**: hash table indexing computes
  `hash(key) % table_size`. Choosing `table_size` prime improves
  distribution.
- **Error-correcting codes**: CRC, Reed-Solomon, and BCH all do
  arithmetic in $\mathbb{Z}_p$ or extensions of it.
- **Strand 2 (Structure)**: $\mathbb{Z}_n$ is the simplest non-trivial
  algebraic ring; modular arithmetic is the entry point to abstract
  algebra.
- **Lesson 04 (next)**: divisibility rules for $3, 9, 11, 7$ all flow
  from clever modular arithmetic on powers of $10$.

## Applied

- **Day-of-week calculation**: every date corresponds to a number;
  $\bmod 7$ gives the weekday. Zeller's congruence does this in one
  formula. (September 1, 1939 was a Friday.)
- **RSA encryption**: encrypt by computing $m^e \bmod n$ for huge
  $n$ (typically $2048$ bits). Decrypt by computing $c^d \bmod n$
  where $d$ is the modular inverse of $e$ mod $\phi(n)$. The whole
  algorithm is fast because of fast modular exponentiation.
- **Hash table sizing**: many libraries default to prime-sized hash
  tables. CPython's `dict` uses powers of $2$ but compensates with
  a more complex hash function — both approaches solve the same
  modular-distribution problem.
- **Pseudo-random number generators**: the linear congruential
  generator picks $X_{n+1} = (a X_n + c) \bmod m$. The sequence
  cycles with period at most $m$; choosing $a, c, m$ with good
  number-theoretic properties (the **Hull-Dobell theorem**)
  achieves the full period.
- **Wrap-around movement in games**: Pac-Man's screen-edge tunnels
  do `pos.x = (pos.x + speed) % screen_width`. Same modular
  arithmetic.
- **Music intervals**: the $12$-tone equal-tempered scale wraps
  every octave; pitch-class arithmetic is in $\mathbb{Z}_{12}$.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $50 \\bmod 7$?" answer=1 explain="$50 = 7 \\cdot 7 + 1 = 49 + 1$. Remainder is $1$.":::

:::widget type=numeric-input prompt="$(13 + 9) \\bmod 5 = ?$" answer=2 explain="$13 + 9 = 22$, $22 \\bmod 5 = 2$. Or reduce first: $13 \\equiv 3$, $9 \\equiv 4$, $3 + 4 = 7 \\equiv 2 \\pmod 5$.":::

:::widget type=numeric-input prompt="What is $3^5 \\bmod 7$? (Compute step by step, reducing each time.)" answer=5 explain="$3^2 = 9 \\equiv 2$. $3^4 \\equiv 2^2 = 4$. $3^5 \\equiv 3 \\cdot 4 = 12 \\equiv 5 \\pmod 7$.":::

:::widget type=numeric-input prompt="Find the modular inverse of $3$ mod $7$. (i.e., the $x$ in $1..6$ with $3x \\equiv 1 \\pmod 7$.)" answer=5 explain="$3 \\cdot 5 = 15 = 2 \\cdot 7 + 1 \\equiv 1 \\pmod 7$. So $3^{-1} \\equiv 5 \\pmod 7$. The extended Euclidean algorithm finds this quickly for any coprime pair.":::
