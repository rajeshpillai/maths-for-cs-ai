---
strand: number-quantity
level: intermediate
order: 0
title: Primes and Unique Factorisation
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 03-mental-multiplication
    description: Mental multiplication
  - tier: strand-1-number-quantity-foundation
    slug: 04-mental-division
    description: Mental division and divisibility
connections:
  - strand-1-number-quantity-intermediate/01-gcd-and-euclid
  - strand-1-number-quantity-intermediate/02-lcm-via-primes
applications:
  - cs: "RSA encryption rests on the difficulty of factoring; hash functions use prime moduli"
  - business: "Music interval ratios; signal multiplexing on prime-numbered slots"
  - games: "Prime-sized hash tables; loot drops at prime intervals to avoid clustering"
  - life: "Why some calendar cycles align rarely (Mayan calendar = LCM of two prime-related cycles)"
---

# Primes and Unique Factorisation

## Explain Like I Am 7

Think of every whole number as a Lego model.  Some Legos are tiny
single bricks that can't be split — those are the **primes**.  Every
bigger model is built by snapping prime bricks together: $12$ is
$2\times2\times3$, like a tower made of two of one brick and one of
another.  And here's the magic: no matter how you take a model apart,
you always end up with the **same** pile of prime bricks — never a
different mix.  That's why primes are called the atoms of
multiplication.

## Mental

Whole numbers come in two kinds:

- **Composite** numbers can be broken into smaller pieces by
  multiplication. $12 = 3 \times 4 = 2 \times 6 = 2 \times 2 \times 3$.
- **Prime** numbers refuse to break. $7$ has no whole-number factors
  except $1$ and itself. Same for $2, 3, 5, 11, 13, 17, 19, 23, \ldots$

Primes are the **atoms of multiplication**. Just as every molecule is
built from atoms in a unique way, every whole number $\ge 2$ is built
from primes in a unique way:

$$
60 = 2 \times 2 \times 3 \times 5 = 2^2 \cdot 3 \cdot 5.
$$

This is the **fundamental theorem of arithmetic**: every integer
$n \ge 2$ has exactly **one** prime factorisation (up to the order of
the factors). You cannot get $60$ from any other multiset of primes.

The number $1$ is special: it is **not** prime, by convention. (If it
were, factorisations wouldn't be unique — $60 = 2^2 \cdot 3 \cdot 5
= 1 \cdot 2^2 \cdot 3 \cdot 5 = 1^{99} \cdot 2^2 \cdot 3 \cdot 5$.) The
"$\ge 2$" in the theorem keeps everything tidy.

The reason this matters is leverage: many properties of a number can
be read off its prime factorisation. **Divisibility** (Lesson 02 in
Foundation hinted at this), the **GCD** and **LCM** (next two
lessons), the **count of divisors**, and even why $\sqrt{2}$ cannot
be a fraction — all flow from prime structure.

## Interactive

A sieve of small primes first.

:::widget type=numeric-input prompt="What is the smallest prime number?" answer=2 explain="$2$ is the smallest prime, and the only **even** prime — every other even number is divisible by $2$ and is therefore composite.":::

:::widget type=numeric-input prompt="Is $51$ prime? Type 1 for yes, 0 for no." answer=0 explain="No: $51 = 3 \\times 17$. (Quick check: $5 + 1 = 6$, divisible by $3$, so $51$ is too — Lesson 04 from Foundation.)":::

:::widget type=numeric-input prompt="Is $97$ prime? Type 1 for yes, 0 for no. (Trial-divide by $2, 3, 5, 7$ — primes up to $\\sqrt{97} \\approx 9.8$.)" answer=1 explain="Yes. $97$ is not divisible by $2$ (odd), not by $3$ ($9+7=16$, not div. by 3), not by $5$ (doesn't end in 0/5), not by $7$ ($7 \\times 13 = 91, 7 \\times 14 = 98$). No factor up to $\\sqrt{97}$, so prime.":::

Now factorisation:

:::widget type=numeric-input prompt="Find the prime factorisation of $84$. Type the largest prime factor." answer=7 explain="$84 = 2 \\times 42 = 2 \\times 2 \\times 21 = 2 \\times 2 \\times 3 \\times 7 = 2^2 \\cdot 3 \\cdot 7$. Largest prime factor is $7$.":::

:::widget type=numeric-input prompt="Find the prime factorisation of $360$. Type the exponent of $2$ in the answer." answer=3 explain="$360 = 2^3 \\cdot 3^2 \\cdot 5$. Build it step by step: $360 = 2 \\times 180 = 2 \\times 2 \\times 90 = 2 \\times 2 \\times 2 \\times 45 = 2^3 \\times 9 \\times 5 = 2^3 \\cdot 3^2 \\cdot 5$. Exponent of $2$ is $3$.":::

A step-by-step trial-division walk-through to factor $84$:

:::widget type=step-revealer
{
  "title": "Factoring 84 by trial division",
  "steps": [
    {"prose": "Start with $n = 84$. Try the smallest prime, $p = 2$. Does $2$ divide $84$? Yes — $84 / 2 = 42$."},
    {"math": "84 = 2 \\cdot 42", "prose": "Now we factor $42$. Try $p = 2$ again. $42 / 2 = 21$."},
    {"math": "84 = 2^2 \\cdot 21", "prose": "Try $2$ once more. $21$ is odd — not divisible by $2$. Move to the next prime, $p = 3$."},
    {"math": "21 / 3 = 7", "prose": "$3$ divides $21$. Quotient is $7$."},
    {"math": "84 = 2^2 \\cdot 3 \\cdot 7", "prose": "Now factor $7$. Is $7$ prime? Yes (we already know). So we stop."},
    {"math": "84 = 2^2 \\cdot 3 \\cdot 7", "prose": "Final factorisation. Notice the algorithm: try each prime in turn, divide out as many times as it goes, move on to the next."}
  ]
}
:::

## Symbolic

A natural number $p \ge 2$ is **prime** if its only positive divisors
are $1$ and $p$. A natural number $n \ge 2$ that isn't prime is
**composite**.

The **fundamental theorem of arithmetic** (FTA) says: for every
$n \ge 2$, there exist primes $p_1 \le p_2 \le \ldots \le p_k$ such that

$$
n = p_1 \cdot p_2 \cdot \ldots \cdot p_k,
$$

and this list of primes is **unique**.

Compactly, we can collect equal primes into exponents:

$$
n = p_1^{a_1} \cdot p_2^{a_2} \cdot \ldots \cdot p_r^{a_r},
$$

where the $p_i$ are distinct primes (in increasing order) and each
$a_i \ge 1$. For $n = 360$:

$$
360 = 2^3 \cdot 3^2 \cdot 5^1.
$$

A handy fact for **trial division**: when checking whether $n$ is
prime, you only need to test divisors up to $\sqrt{n}$. Why? If
$n = a \cdot b$ with $1 < a \le b$, then $a^2 \le ab = n$, so
$a \le \sqrt{n}$. Any composite has a factor $\le \sqrt{n}$, so a
primality test that finds none in $[2, \sqrt{n}]$ guarantees the
number is prime.

Knowing the primes $\le \sqrt{n}$ is enough for most checks. To
factor $n = 1\,000\,000$, you only need primes up to $1000$ — there
are $168$ of them. Manageable.

## Computational

Trial-division primality and factorisation in Python:

```python
def is_prime(n):
    if n < 2:
        return False
    if n < 4:
        return True   # 2 and 3 are prime
    if n % 2 == 0:
        return False
    p = 3
    while p * p <= n:
        if n % p == 0:
            return False
        p = p + 2     # only odd candidates after 2
    return True

print(is_prime(2))     # True
print(is_prime(51))    # False
print(is_prime(97))    # True
print(is_prime(101))   # True
```

Factorisation by repeated division:

```python
def factorise(n):
    """Return list of prime factors of n, with repetition."""
    factors = []
    p = 2
    while p * p <= n:
        while n % p == 0:
            factors.append(p)
            n = n // p
        p = p + 1
    if n > 1:
        factors.append(n)   # remaining factor is prime
    return factors

print(factorise(84))      # [2, 2, 3, 7]
print(factorise(360))     # [2, 2, 2, 3, 3, 5]
print(factorise(1000003)) # [1000003]  — this is prime
```

The "if $n > 1$ append" at the end catches a tail factor — e.g.
factoring $14 = 2 \cdot 7$, the loop divides out the $2$ leaving
$n = 7$, but the loop condition $p \cdot p \le n$ stops at
$p = 3$ (since $3^2 > 7$), so the leftover $7$ never gets its turn
inside the loop.

A faster sieve to generate **all** primes up to $N$ — the **Sieve of
Eratosthenes** (~3rd century BCE):

```python
def sieve(N):
    """All primes <= N."""
    composite = [False] * (N + 1)
    composite[0] = composite[1] = True
    for i in range(2, int(N ** 0.5) + 1):
        if not composite[i]:
            # mark multiples of i, starting from i*i
            for j in range(i * i, N + 1, i):
                composite[j] = True
    return [i for i in range(N + 1) if not composite[i]]

print(sieve(50))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

The sieve is dramatically faster than calling `is_prime` on each
number — $O(N \log \log N)$ versus $O(N \sqrt{N})$. It's been the
standard prime-generation algorithm for over $2{,}000$ years.

## Derivational

*Why* is prime factorisation **unique**? It is not obvious.

Suppose, for contradiction, that some number $n$ had two different
prime factorisations:

$$
n = p_1 \cdot p_2 \cdot \ldots \cdot p_a = q_1 \cdot q_2 \cdot \ldots \cdot q_b,
$$

where the $p_i$ and $q_j$ are primes and the two lists differ. Pick
any prime $p_1$ from the first list. It divides $n$, so it must
divide the second product $q_1 \cdot q_2 \cdot \ldots \cdot q_b$.

The crucial fact (called **Euclid's lemma**): **if a prime $p$ divides
a product $a \cdot b$, then $p$ divides $a$ or $p$ divides $b$**.
This is the special property of primes — composites can divide a
product without dividing either factor (e.g. $6 \mid 4 \cdot 9 = 36$
but $6$ divides neither $4$ nor $9$).

Iterating Euclid's lemma, $p_1$ must divide some $q_j$. But $q_j$ is
prime, so its only positive divisors are $1$ and $q_j$. Since $p_1
\ne 1$, we must have $p_1 = q_j$.

Cancel that pair and repeat with $n / p_1$. Eventually, every prime
in the first list pairs up with one in the second — proving the lists
are the same up to reordering.

The whole proof rests on Euclid's lemma. We won't prove it here (it
follows from Bezout's identity, which Lesson 01 will derive when we
study GCD via Euclid's algorithm). But notice how the *uniqueness*
of factorisation depends on the *defining property* of primes —
they're the multiplicative atoms precisely because of this lemma.

*Why* are there infinitely many primes? Euclid's classic proof:
suppose only finitely many primes existed: $p_1, p_2, \ldots, p_n$.
Form

$$
N = p_1 \cdot p_2 \cdot \ldots \cdot p_n + 1.
$$

This $N$ is bigger than any prime in the list. So $N$ must be
composite. But $N$ is not divisible by **any** $p_i$ (since dividing
gives remainder $1$), and every composite has *some* prime factor.
Contradiction. So our list was incomplete — there are infinitely many
primes.

This is one of the most elegant proofs in mathematics, dating from
around 300 BCE.

## Connective

Primes are the foundation for several Strand 1 Intermediate lessons:

- **Lesson 01 (GCD)**: Euclid's algorithm computes the greatest
  common divisor without factoring — fast even for huge numbers.
- **Lesson 02 (LCM)**: prime factorisations make LCM trivial.
- **Lesson 03 (Modular arithmetic)**: many number-theoretic results
  reduce to "consider $n \bmod p$ for each prime $p$."

Beyond Strand 1:

- **Cryptography (Strand 6 Advanced)**: RSA's security rests on the
  difficulty of factoring large numbers. Multiply two $1024$-bit
  primes to get a $2048$-bit number; nobody knows how to factor that
  efficiently.
- **Strand 5 (Combinatorics)**: counting divisors of $n$ is a
  function of its prime exponents — $n = p_1^{a_1} \ldots p_r^{a_r}$
  has $(a_1+1)(a_2+1)\ldots(a_r+1)$ divisors.
- **Strand 7 (Computation)**: prime-sized hash tables avoid certain
  pathological clustering; many algorithms use prime moduli to
  scatter hashes evenly.

## Applied

- **RSA encryption**: every secure HTTPS connection on the web
  starts with prime arithmetic. Two large primes get multiplied
  together to form a public key; the security of every credit card
  payment online depends on factoring being hard.
- **Hash tables**: a hash table with $N$ buckets often picks $N$ to
  be prime to spread keys evenly. Power-of-2 sizes can cause
  collisions when keys share factors with $N$.
- **Music**: the $12$-tone equal temperament uses $12 = 2^2 \cdot 3$
  as a compromise — its divisors $1, 2, 3, 4, 6, 12$ allow many
  consonant intervals (octaves, fifths, thirds). A $13$-tone or
  $11$-tone system would have far fewer.
- **Hash function distributions**: SHA-256 internally relies on
  primes — the constants used in the algorithm are derived from the
  fractional parts of cube roots of small primes.
- **Prime gaps**: the gaps between consecutive primes get
  arbitrarily large but are usually small. Pseudo-randomly looking
  to a programmer; an active research area in number theory.

## Check Your Understanding

:::widget type=numeric-input prompt="How many distinct prime factors does $60$ have?" answer=3 explain="$60 = 2^2 \\cdot 3 \\cdot 5$. Three distinct primes: $2$, $3$, $5$. (Total *with* repetition is $4$, but the question asked for distinct.)":::

:::widget type=numeric-input prompt="What is the smallest prime greater than $50$?" answer=53 explain="$51 = 3 \\cdot 17$, $52 = 2^2 \\cdot 13$, $53$ has no factors up to $\\sqrt{53} \\approx 7.3$. Prime.":::

:::widget type=numeric-input prompt="Find the largest prime factor of $1000$." answer=5 explain="$1000 = 2^3 \\cdot 5^3$. Just two distinct primes — $2$ and $5$ — and the larger is $5$.":::

:::widget type=numeric-input prompt="If $n = p \\cdot q$ where $p$ and $q$ are distinct primes, how many positive divisors does $n$ have?" answer=4 explain="The divisors are $1, p, q, pq$. Four. The general formula: $n = p_1^{a_1} \\ldots p_r^{a_r}$ has $\\prod (a_i + 1)$ divisors. With two distinct primes each to the first power: $(1+1)(1+1) = 4$.":::
