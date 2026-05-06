---
strand: structure
level: foundation
order: 3
title: $\mathbb{Z}/n\mathbb{Z}$ — Modular Arithmetic as a Structure
prerequisites:
  - tier: strand-2-structure-foundation
    slug: 02-equivalence-relations
    description: Equivalence relations
  - tier: strand-1-number-quantity-intermediate
    slug: 03-modular-arithmetic
    description: Modular arithmetic basics
connections:
  - strand-2-structure-foundation/04-groups
applications:
  - cs: "Hash table sizing, ring buffer indices, cryptography"
  - games: "Wraparound mechanics, day-of-week math"
  - life: "Clock arithmetic, calendar cycles"
---

# $\mathbb{Z}/n\mathbb{Z}$ — Modular Arithmetic as a Structure

## Explain Like I Am 7

We've already seen the clock: keep adding hours and you eventually
loop back to where you started.  Now zoom out and look at the *clock
itself* as one little universe of its own — a tiny world with $n$
inhabitants, and add/multiply rules that *never* let you escape.  This
universe behaves like the integers in many ways and *unlike* them in
surprising ways (sometimes two non-zero numbers multiply to zero!).
Recognising the clock as its own self-contained number-system is the
first step from "doing arithmetic" to "studying structure."

## Mental

Strand 1 Intermediate Lesson 03 introduced modular arithmetic
operationally. Now we view it through the **structure** lens.

The set $\mathbb{Z}/n\mathbb{Z} = \{[0], [1], \ldots, [n-1]\}$
inherits operations from $\mathbb{Z}$:

- **Addition**: $[a] + [b] = [a + b]$.
- **Multiplication**: $[a] \cdot [b] = [a \cdot b]$.

These are **well-defined** because addition and multiplication
respect the equivalence:

$$
a \equiv a' \pmod n \wedge b \equiv b' \pmod n \implies a + b \equiv a' + b' \pmod n,
$$

and similarly for multiplication.

So $\mathbb{Z}/n\mathbb{Z}$ inherits a perfectly good **arithmetic
structure** from $\mathbb{Z}$ — but on only $n$ elements instead of
infinitely many.

## What's preserved, what's lost

**Preserved**:

- Closure under $+, \times$.
- Associativity, commutativity.
- Additive identity ($[0]$) and inverses ($[a]^{-1} = [-a]$).
- Multiplicative identity ($[1]$).
- Distributive law.

**Sometimes preserved, sometimes lost**:

- **Multiplicative inverses**. In $\mathbb{Z}$, only $\pm 1$ have
  inverses. In $\mathbb{Z}/n\mathbb{Z}$, $[a]$ has an inverse iff
  $\gcd(a, n) = 1$. (Strand 1 Intermediate Lesson 03.)

If $n$ is **prime**, **every** non-zero $[a]$ has an inverse →
$\mathbb{Z}/p\mathbb{Z}$ is a **field** (Lesson 08).

If $n$ is **composite**, some $[a]$ lack inverses → $\mathbb{Z}/n\mathbb{Z}$
is a **ring but not a field**.

## $\mathbb{Z}/4\mathbb{Z}$ tables

Addition (mod 4):

| $+$ | $[0]$ | $[1]$ | $[2]$ | $[3]$ |
|---|---|---|---|---|
| $[0]$ | $[0]$ | $[1]$ | $[2]$ | $[3]$ |
| $[1]$ | $[1]$ | $[2]$ | $[3]$ | $[0]$ |
| $[2]$ | $[2]$ | $[3]$ | $[0]$ | $[1]$ |
| $[3]$ | $[3]$ | $[0]$ | $[1]$ | $[2]$ |

Multiplication (mod 4):

| $\cdot$ | $[0]$ | $[1]$ | $[2]$ | $[3]$ |
|---|---|---|---|---|
| $[0]$ | $[0]$ | $[0]$ | $[0]$ | $[0]$ |
| $[1]$ | $[0]$ | $[1]$ | $[2]$ | $[3]$ |
| $[2]$ | $[0]$ | $[2]$ | $[0]$ | $[2]$ |
| $[3]$ | $[0]$ | $[3]$ | $[2]$ | $[1]$ |

Notice: $[2] \cdot [2] = [0]$ — non-zero times non-zero gives zero.
That's a **zero divisor** — impossible in $\mathbb{Z}$ but happens
in $\mathbb{Z}/4\mathbb{Z}$. Composite moduli have zero divisors.

In $\mathbb{Z}/p\mathbb{Z}$ for prime $p$, no zero divisors exist —
that's the field structure.

## Interactive

:::widget type=numeric-input prompt="In $\\mathbb{Z}/5\\mathbb{Z}$: $[3] + [4] = ?$" answer=2 explain="$3 + 4 = 7 \\equiv 2 \\pmod 5$.":::

:::widget type=numeric-input prompt="In $\\mathbb{Z}/7\\mathbb{Z}$: inverse of $[3]$ — find $x$ with $3x \\equiv 1 \\pmod 7$. Try small values." answer=5 explain="$3 \\cdot 5 = 15 \\equiv 1 \\pmod 7$.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/6\\mathbb{Z}$: does $[2]$ have a multiplicative inverse? ($\\gcd(2, 6) = 2 \\ne 1$, so no.)" answer=0 explain="No — $\\gcd \\ne 1$.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/p\\mathbb{Z}$ for prime $p$: every non-zero element has an inverse. Type 1 if true." answer=1 explain="True — this is what makes it a field.":::

## Symbolic

$\mathbb{Z}/n\mathbb{Z}$ is the set of equivalence classes of
$\mathbb{Z}$ under the equivalence "$a \sim b$ iff $n \mid a - b$."

Operations $+$ and $\cdot$ are well-defined: independent of
representative chosen.

**Structural facts**:

- $(\mathbb{Z}/n\mathbb{Z}, +)$ is a **cyclic group of order $n$**
  (Lesson 04 introduces groups formally).
- $(\mathbb{Z}/n\mathbb{Z}, +, \cdot)$ is a **commutative ring**
  (Lesson 08).
- $(\mathbb{Z}/p\mathbb{Z})^*$ for prime $p$ is a cyclic group of
  order $p-1$ under multiplication (primitive roots — Strand 1
  Advanced Lesson 02).

## Computational

```python
class Zn:
    def __init__(self, val, n):
        self.val = val % n
        self.n = n

    def __add__(self, other):
        return Zn((self.val + other.val) % self.n, self.n)

    def __mul__(self, other):
        return Zn((self.val * other.val) % self.n, self.n)

    def __repr__(self):
        return f"[{self.val}]_{self.n}"

a = Zn(3, 5)
b = Zn(4, 5)
print(a + b)     # [2]_5
print(a * b)     # [2]_5

# Find multiplicative inverse via search
def find_inv(a, n):
    for x in range(n):
        if (a * x) % n == 1:
            return x
    return None

print(find_inv(3, 7))   # 5
print(find_inv(2, 6))   # None
```

## Applied

- **Hashing**: hash tables sized at $n$ buckets compute `hash(key) % n`,
  living in $\mathbb{Z}/n\mathbb{Z}$.
- **Cryptography**: RSA, Diffie-Hellman, ECDSA all live in
  $\mathbb{Z}/n\mathbb{Z}$ for cleverly-chosen $n$.
- **Day of week**: $\mathbb{Z}/7\mathbb{Z}$ — Strand 1 Advanced
  Lesson 03.

## Check Your Understanding

:::widget type=numeric-input prompt="Size of $\\mathbb{Z}/12\\mathbb{Z}$?" answer=12 explain="$\\{[0], ..., [11]\\}$.":::

:::widget type=numeric-input prompt="In $\\mathbb{Z}/6\\mathbb{Z}$: how many elements have a multiplicative inverse? (Coprimes to 6: 1, 5.)" answer=2 explain="Two — $\\phi(6) = 2$.":::

:::widget type=numeric-input prompt="$\\mathbb{Z}/p\\mathbb{Z}$ for prime $p$: a field, with $p - 1$ invertible elements. For $p = 11$, type $p - 1$." answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="In $\\mathbb{Z}/4\\mathbb{Z}$: does $[2] \\cdot [2] = [0]$? (Zero divisor.)" answer=1 explain="Yes — composite moduli have zero divisors.":::
