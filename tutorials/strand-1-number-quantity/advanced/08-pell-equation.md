---
strand: number-quantity
level: advanced
order: 8
title: Pell's Equation and Diophantine Solutions
prerequisites:
  - tier: strand-1-number-quantity-advanced
    slug: 03-continued-fractions
    description: Continued fractions
connections:
  - strand-1-number-quantity-advanced/09-number-theory-capstone
applications:
  - cs: "Algorithmic number theory; cryptanalysis"
  - life: "Square triangular numbers, Archimedes's cattle problem"
---

# Pell's Equation and Diophantine Solutions

## Explain Like I Am 7

Imagine searching for hidden treasure on a giant grid where only the
*whole-number* squares count.  Pell's puzzle asks: "find a square
whose area, after you scoop out a fixed multiple of another square, is
exactly 1."  Most grid points fail — but once you find your **first**
treasure square, an enchanted recipe spits out infinitely more,
each one *much* bigger than the last.  These special whole-number
solutions are how the ancients hunted very accurate fractions for
$\sqrt{2}$, $\sqrt{3}$, and so on.

## Mental

A **Diophantine equation** is one where we seek **integer**
solutions. Examples:

- $x^2 + y^2 = z^2$ (Pythagorean triples — Lesson 01 of Strand 3
  Foundation gave the formula).
- $x^n + y^n = z^n$ for $n \ge 3$ (Fermat's Last Theorem — no
  nontrivial integer solutions, proved by Wiles in 1995).

**Pell's equation** has the form

$$
x^2 - D y^2 = 1,
$$

where $D$ is a positive non-square integer. The English
mathematician John Pell didn't actually study it — Lord Brouncker
did. Euler misattributed and the name stuck.

For $D = 2$: $x^2 - 2 y^2 = 1$. Smallest nontrivial solution:
$(x, y) = (3, 2)$, since $9 - 8 = 1$. From this, infinitely many
others can be generated.

## Continued-fraction connection

The continued-fraction expansion of $\sqrt D$ provides the **smallest
positive solution** (the **fundamental solution**) of Pell's equation.

For $\sqrt 2 = [1; \overline{2}]$ (period 1), the convergents alternate
between solutions of $x^2 - 2y^2 = \pm 1$:

| $n$ | $p_n / q_n$ | $p_n^2 - 2 q_n^2$ |
|---|---|---|
| $0$ | $1/1$ | $-1$ |
| $1$ | $3/2$ | $+1$ ← Pell solution |
| $2$ | $7/5$ | $-1$ |
| $3$ | $17/12$ | $+1$ |
| $4$ | $41/29$ | $-1$ |

The fundamental solution $(3, 2)$ generates all others via the
**recurrence**

$$
x_{n+1} = 3 x_n + 4 y_n, \quad y_{n+1} = 2 x_n + 3 y_n.
$$

So $(3, 2) \to (17, 12) \to (99, 70) \to (577, 408) \to \ldots$ — the
$+1$ solutions.

## Interactive

:::widget type=numeric-input prompt="Verify $(x, y) = (3, 2)$ for Pell with $D = 2$: $3^2 - 2 \\cdot 2^2 = ?$" answer=1 explain="$9 - 8 = 1$. ✓":::

:::widget type=numeric-input prompt="Verify $(17, 12)$: $17^2 - 2 \\cdot 12^2 = ?$" answer=1 explain="$289 - 288 = 1$. ✓":::

:::widget type=numeric-input prompt="The fundamental solution of $x^2 - 3 y^2 = 1$? (Try small $y$.)" answer=2 explain="$y = 1$: $x^2 = 4$, $x = 2$. So $(2, 1)$. Type the $x$ value: 2.":::

:::widget type=numeric-input prompt="Pell solution generates $\\sqrt D$ approximations: $x/y \\approx \\sqrt D$. For $D = 2$, $17/12 \\approx ?$ — round to 4 dp." answer=1.4167 tolerance=0.001 explain="$1.4167$. Compare to $\\sqrt 2 \\approx 1.4142$. Convergents alternate around $\\sqrt D$.":::

## Symbolic

**Pell's equation**: $x^2 - D y^2 = 1$ with $D > 0$ non-square.
Always has nontrivial integer solutions (Lagrange, 1768).

**Fundamental solution** $(x_1, y_1)$: smallest positive solution.
**All solutions** generated via

$$
x_n + y_n \sqrt D = (x_1 + y_1 \sqrt D)^n.
$$

In matrix form:

$$
\begin{pmatrix} x_{n+1} \\ y_{n+1} \end{pmatrix} = \begin{pmatrix} x_1 & D y_1 \\ y_1 & x_1 \end{pmatrix} \begin{pmatrix} x_n \\ y_n \end{pmatrix}.
$$

The fundamental solution can grow **dramatically** with $D$ — for $D
= 61$, the smallest nontrivial solution is

$$
(x, y) = (1\,766\,319\,049, 226\,153\,980).
$$

Yes, that. Continued fractions of $\sqrt{61}$ have period 11 — the
period determines how fast the solutions appear.

## Computational

```python
import math

def pell_fundamental(D):
    """Find the smallest (x, y > 0) with x² - D y² = 1."""
    # Continued-fraction expansion of sqrt(D), then walk convergents
    a0 = int(math.isqrt(D))
    if a0 * a0 == D: return None   # D is a perfect square
    m, d, a = 0, 1, a0
    p_prev, p = 1, a0
    q_prev, q = 0, 1
    while p * p - D * q * q != 1:
        m = d * a - m
        d = (D - m * m) // d
        a = (a0 + m) // d
        p_prev, p = p, a * p + p_prev
        q_prev, q = q, a * q + q_prev
    return p, q

print(pell_fundamental(2))    # (3, 2)
print(pell_fundamental(3))    # (2, 1)
print(pell_fundamental(7))    # (8, 3)
print(pell_fundamental(61))   # (1766319049, 226153980)
```

## Applied

- **Square-triangular numbers**: integers that are both perfect
  squares and triangular ($T_n = n(n+1)/2$). Their indexing
  satisfies a Pell-like recurrence: $1, 36, 1225, 41616, \ldots$
- **Archimedes's cattle problem**: a famous Diophantine problem.
  Smallest solution involves a number with $\sim 200\,000$ digits.
  Computed in 1965; involves Pell equations.
- **Algorithmic uses**: Pell's equation solving is part of standard
  computational number theory toolkits, used in some lattice-based
  cryptography.

## Check Your Understanding

:::widget type=numeric-input prompt="The fundamental solution of $x^2 - 5 y^2 = 1$. (Try small $y$.)" answer=9 explain="$y = 4$: $5 \\cdot 16 = 80, x^2 = 81, x = 9$. So $(9, 4)$. Type 9.":::

:::widget type=numeric-input prompt="Verify: $9^2 - 5 \\cdot 4^2 = ?$" answer=1 explain="$81 - 80 = 1$. ✓":::

:::widget type=numeric-input prompt="Pell solutions $(3, 2), (17, 12), (99, 70), (577, 408), \\ldots$ for $D = 2$. Each $x_{n+1} = 6 x_n - x_{n-1}$. So next after $(577, 408)$: $x_5 = 6 \\cdot 577 - 99 = ?$" answer=3363 explain="$6 \\cdot 577 = 3462; 3462 - 99 = 3363$. So $(3363, 2378)$ is next.":::

:::widget type=numeric-input prompt="Pell solutions are infinite for any non-square $D$. Type 1 if true, 0 if false." answer=1 explain="True. Once you have the fundamental solution, you generate infinitely many.":::
