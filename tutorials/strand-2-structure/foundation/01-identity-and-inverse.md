---
strand: structure
level: foundation
order: 1
title: Identity and Inverse
prerequisites:
  - tier: strand-2-structure-foundation
    slug: 00-operations-and-properties
    description: Operations
connections:
  - strand-2-structure-foundation/02-equivalence-relations
applications:
  - cs: "Undo operations, neutral elements in monoids"
  - business: "Reversing a transaction"
  - games: "Undo / redo systems"
  - life: "Adding zero, multiplying by one"
---

# Identity and Inverse

## Explain Like I Am 7

Every game has a "do nothing" move and an "undo" move.  Push your
chair away from a table and pull it back — you're sitting where you
started.  In maths, the **identity** is the do-nothing move (adding
zero, multiplying by one), and the **inverse** is the undo move
(adding $-3$ undoes adding $3$).  Whenever every move in your toolbox
has an undo, you can play freely without fear of getting stuck — and
that's the secret heartbeat of every "group" you'll meet in this
strand.

## Mental

For an operation $\star$ on a set $S$:

**Identity element** $e$: an element such that $a \star e = a = e
\star a$ for all $a \in S$. The identity is the "do nothing"
element.

**Inverse** of $a$: an element $a^{-1}$ such that $a \star a^{-1} =
e = a^{-1} \star a$.

Examples:

- Addition on $\mathbb{Z}$: identity $0$. Inverse of $a$ is $-a$.
  $5 + (-5) = 0$.
- Multiplication on $\mathbb{Q}^*$ (nonzero rationals): identity $1$.
  Inverse of $a$ is $1/a$. $5 \cdot (1/5) = 1$.
- String concatenation on strings: identity is empty string `""`.
  No inverses exist — concatenation can't be undone.
- Function composition: identity is $\text{id}(x) = x$. Inverse only
  exists for bijections.

The identity is **unique** when it exists. The inverse, when it
exists, is **unique** for each element.

## Why these matter

The pair (identity, inverse) lets you **solve equations**.

If $a \star x = b$ and $a$ has an inverse, then $x = a^{-1} \star
b$. (Multiply both sides on the left by $a^{-1}$.)

Without inverses, equations can be unsolvable. $5 x = 7$ has no
integer solution because $5$ doesn't have an integer multiplicative
inverse.

## Interactive

:::widget type=numeric-input prompt="Identity for addition on $\\mathbb{Z}$?" answer=0 explain="$0$ — adding 0 changes nothing.":::

:::widget type=numeric-input prompt="Identity for multiplication on $\\mathbb{Z}$?" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="Inverse of $7$ under addition?" answer=-7 explain="$7 + (-7) = 0$.":::

:::widget type=numeric-input prompt="Multiplicative inverse of $4$ in $\\mathbb{Q}$? — type as decimal." answer=0.25 explain="$1/4 = 0.25$.":::

:::widget type=numeric-input prompt="Does $0$ have a multiplicative inverse in $\\mathbb{Q}$?" answer=0 explain="No — division by 0 is undefined.":::

:::widget type=numeric-input prompt="In $\\mathbb{Z}_5$ (integers mod 5), the multiplicative inverse of 3 is the $x$ with $3x \\equiv 1 \\pmod 5$. Try small values: $3 \\cdot 2 = 6 \\equiv 1$. So inverse is..." answer=2 explain="$2$. Modular inverses exist when $\\gcd = 1$.":::

## Symbolic

For a binary operation $\star$ on $S$:

**Identity** $e$: satisfies $\forall a: a \star e = e \star a = a$.

If an identity exists, it is unique.

**Inverse** $a^{-1}$: satisfies $a \star a^{-1} = a^{-1} \star a =
e$.

If $\star$ is associative and an inverse exists for $a$, it is
**unique**.

**Properties of inverses**:

- $(a^{-1})^{-1} = a$.
- $(a \star b)^{-1} = b^{-1} \star a^{-1}$ (note the order reversal!).
- The identity's inverse is itself.

## Computational

```python
# Multiplicative inverse mod n via extended Euclidean
def mod_inverse(a, n):
    g, x, _ = ext_euclid(a, n)
    if g != 1: return None
    return x % n

def ext_euclid(a, b):
    if b == 0: return a, 1, 0
    g, x, y = ext_euclid(b, a % b)
    return g, y, x - (a // b) * y

print(mod_inverse(3, 5))   # 2
print(mod_inverse(7, 13))  # 2
print(mod_inverse(2, 4))   # None — gcd(2, 4) = 2, no inverse
```

## Applied

- **Cryptography**: RSA decryption uses modular inverses (Strand 1
  Advanced Lesson 01).
- **Undo / redo**: each user action has an inverse stored for undo.
- **Solving equations**: existence of inverses determines whether
  $ax = b$ has a solution.

## Check Your Understanding

:::widget type=numeric-input prompt="Identity for string concatenation?" answer=0 explain="The empty string. Type 0 to indicate.":::

:::widget type=numeric-input prompt="Inverse of $-3$ under addition?" answer=3 explain="$-3 + 3 = 0$.":::

:::widget type=numeric-input prompt="Identity for matrix multiplication on 2x2 matrices?" answer=0 explain="The 2x2 identity matrix $I$. Type 0 to indicate this conceptual answer.":::

:::widget type=numeric-input prompt="$(5^{-1})^{-1}$ in $\\mathbb{Q}$ equals what?" answer=5 explain="Inverse of inverse returns the original.":::
