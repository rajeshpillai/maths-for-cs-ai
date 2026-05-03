---
strand: number-quantity
level: advanced
order: 6
title: Quadratic Reciprocity
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 02-multiplicative-order-and-primitive-roots
    description: Multiplicative order
connections:
  - strand-1-number-quantity-advanced/07-p-adic-numbers
applications:
  - cs: "Cryptographic primality testing (Miller-Rabin variants)"
  - life: "One of the deepest theorems in elementary number theory"
---

# Quadratic Reciprocity

## Mental

For an odd prime $p$ and an integer $a$ coprime to $p$, define the
**Legendre symbol**:

$$
\left(\frac{a}{p}\right) = \begin{cases}
+1 & \text{if } a \text{ is a quadratic residue mod } p \\
-1 & \text{otherwise}
\end{cases}
$$

A **quadratic residue** mod $p$ is a value $a$ for which $x^2 \equiv
a \pmod p$ has solutions. Half the nonzero residues mod $p$ are
quadratic residues, half are non-residues.

**Quadratic reciprocity** (Gauss, 1796) — one of the most beautiful
theorems in mathematics:

> For distinct odd primes $p$ and $q$,
>
> $$\left(\frac{p}{q}\right) \left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2} \cdot \frac{q-1}{2}}.$$

The two Legendre symbols **interrelate**. Knowing whether $p$ is a
quadratic residue mod $q$ tells you something about whether $q$ is a
quadratic residue mod $p$.

Two **supplementary laws**:

$$
\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2} = \begin{cases} +1 & p \equiv 1 \pmod 4 \\ -1 & p \equiv 3 \pmod 4 \end{cases}
$$

$$
\left(\frac{2}{p}\right) = (-1)^{(p^2 - 1)/8}.
$$

Gauss called quadratic reciprocity "the golden theorem" and proved
it eight different ways during his lifetime.

## Interactive

:::widget type=numeric-input prompt="Is $3$ a quadratic residue mod $7$? (Compute $1^2, 2^2, 3^2 \\pmod 7 = 1, 4, 2$. Is $3$ in the list?) Type 1 yes, 0 no." answer=0 explain="QRs mod 7 are $\\{1, 2, 4\\}$. $3$ is not.":::

:::widget type=numeric-input prompt="So $\\left(\\dfrac{3}{7}\\right) = ?$ Type as 1 or -1." answer=-1 explain="Non-residue gives $-1$.":::

:::widget type=numeric-input prompt="By reciprocity: $(3/7)(7/3) = (-1)^{(3-1)/2 \\cdot (7-1)/2} = (-1)^{1 \\cdot 3} = -1$. We know $(3/7) = -1$. So $(7/3) = ?$" answer=1 explain="$(-1)(-1) = 1$. Indeed $7 \\equiv 1 \\pmod 3$, and $1 = 1^2$ is a QR mod 3.":::

:::widget type=numeric-input prompt="$\\left(\\dfrac{-1}{5}\\right) = (-1)^{(5-1)/2} = (-1)^2 = ?$" answer=1 explain="$5 \\equiv 1 \\pmod 4$, so $-1$ is a QR. Indeed $2^2 = 4 \\equiv -1 \\pmod 5$.":::

## Symbolic

The **Legendre symbol** is multiplicative:

$$
\left(\frac{ab}{p}\right) = \left(\frac{a}{p}\right) \left(\frac{b}{p}\right).
$$

**Euler's criterion**: $\left(\frac{a}{p}\right) \equiv a^{(p-1)/2}
\pmod p$. Compute the Legendre symbol via fast modular exponentiation.

**Quadratic reciprocity**:

$$
\left(\frac{p}{q}\right) \left(\frac{q}{p}\right) = (-1)^{(p-1)(q-1)/4}.
$$

This means: if $p$ and $q$ are both $\equiv 1 \pmod 4$, the symbols
agree. Otherwise (both $\equiv 3 \pmod 4$), they're opposite.

The **Jacobi symbol** generalises Legendre to composite denominators
and is computed via the same recursive algorithm — used in primality
tests like **Solovay-Strassen**.

## Computational

```python
def legendre(a, p):
    """Legendre symbol (a/p) via Euler's criterion."""
    a %= p
    if a == 0: return 0
    val = pow(a, (p - 1) // 2, p)
    return val if val < p // 2 + 1 else val - p

print(legendre(3, 7))    # -1
print(legendre(2, 7))    #  1
print(legendre(-1, 5))   #  1

def jacobi(a, n):
    """Jacobi symbol via the reciprocity recursion."""
    a %= n
    result = 1
    while a:
        while a % 2 == 0:
            a //= 2
            if n % 8 in (3, 5):
                result = -result
        a, n = n, a   # quadratic reciprocity flip
        if a % 4 == 3 and n % 4 == 3:
            result = -result
        a %= n
    return result if n == 1 else 0

print(jacobi(3, 7))   # -1
print(jacobi(15, 17))  # 1
```

## Applied

- **Miller-Rabin / Solovay-Strassen primality tests** use Legendre/
  Jacobi symbols. Faster than basic Fermat tests, less prone to
  Carmichael-number false positives.
- **Tonelli-Shanks algorithm** for computing modular square roots
  uses quadratic-residue theory.
- **Number-theoretic transforms** (NTTs) — used in fast polynomial
  multiplication (e.g., for cryptographic protocols) — rely on
  primitive roots and QR theory.

## Check Your Understanding

:::widget type=numeric-input prompt="QRs mod 5 are $\\{1, 4\\}$. Is $3$ a QR? Type 1 yes, 0 no." answer=0 explain="$3$ is not in $\\{1, 4\\}$. Non-residue.":::

:::widget type=numeric-input prompt="$\\left(\\dfrac{2}{7}\\right) = ?$ Type 1 or -1. (Compute QRs: $\\{1, 2, 4\\}$.)" answer=1 explain="$2 \\in \\{1, 2, 4\\}$ — QR. $3^2 = 9 \\equiv 2 \\pmod 7$.":::

:::widget type=numeric-input prompt="By reciprocity, $(11/13)(13/11) = (-1)^{(10/2)(12/2)} = (-1)^{30} = ?$ Type 1 or -1." answer=1 explain="$30$ is even, so $(-1)^{30} = 1$. Both Legendre symbols agree.":::

:::widget type=numeric-input prompt="$13 \\equiv 1 \\pmod 4$, so $\\left(\\dfrac{-1}{13}\\right) = ?$" answer=1 explain="$+1$ when $p \\equiv 1 \\pmod 4$.":::
