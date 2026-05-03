---
strand: pattern-counting
level: advanced
order: 0
title: Generating Functions
prerequisites:
  - tier: strand-5-pattern-counting-intermediate
    slug: 09-pattern-counting-capstone-2
    description: Intermediate pattern & counting capstone
connections:
  - strand-5-pattern-counting-advanced/01-closed-form-recurrences
applications:
  - cs: "Algorithm analysis, formal-language enumeration, randomised algorithms"
  - life: "Encoding sequences as power series — algebra meets combinatorics"
---

# Generating Functions

## Mental

A **(ordinary) generating function** for a sequence $(a_0, a_1, a_2, \ldots)$ is

$$
A(x) = \sum_{n=0}^\infty a_n x^n = a_0 + a_1 x + a_2 x^2 + \ldots
$$

We treat $x$ formally — convergence is a bonus, not a requirement.
Algebraic operations on $A(x)$ correspond to combinatorial operations
on $(a_n)$.

| Operation on GF | Effect on sequence |
|---|---|
| $A(x) + B(x)$ | $a_n + b_n$ |
| $A(x) \cdot B(x)$ | $\sum_{k=0}^n a_k b_{n-k}$ (convolution) |
| $x A(x)$ | shift right: $0, a_0, a_1, \ldots$ |
| $\frac{1}{1 - x} A(x)$ | partial sums $\sum_{k \le n} a_k$ |
| $A(x)$ where $A = c A + B$ | recurrence solution |

## Famous generating functions

| Sequence | GF |
|---|---|
| $a_n = 1$ for all $n$ | $\frac{1}{1 - x}$ |
| $a_n = n + 1$ | $\frac{1}{(1 - x)^2}$ |
| $a_n = \binom{n}{k}$ for fixed $k$ | $\frac{x^k}{(1 - x)^{k+1}}$ |
| Fibonacci | $\frac{x}{1 - x - x^2}$ |
| Catalan numbers | $\frac{1 - \sqrt{1 - 4x}}{2x}$ |

## Worked example: Fibonacci closed form

Let $F(x) = \sum F_n x^n$. The recurrence $F_n = F_{n-1} + F_{n-2}$
with $F_0 = 0, F_1 = 1$ gives:

$F(x) = x + x F(x) + x^2 F(x)$, so $F(x) = \frac{x}{1 - x - x^2}$.

Partial-fraction-decompose using the roots $\phi = (1+\sqrt 5)/2$ and
$\psi = (1-\sqrt 5)/2$ of $1 - x - x^2 = -(x - 1/\phi)(x - 1/\psi)$:

$$
F(x) = \frac{1}{\sqrt 5}\left(\frac{1}{1 - \phi x} - \frac{1}{1 - \psi x}\right).
$$

Expanding each $\frac{1}{1 - r x} = \sum (rx)^n$ gives Binet's formula:

$$
F_n = \frac{\phi^n - \psi^n}{\sqrt 5}.
$$

## Interactive

:::widget type=numeric-input prompt="$\\frac{1}{1 - x} = 1 + x + x^2 + \\ldots$. Coefficient of $x^5$?" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$\\frac{1}{(1-x)^2} = \\sum (n+1) x^n$. Coefficient of $x^5$?" answer=6 explain="$6$.":::

:::widget type=numeric-input prompt="$F_{10}$ — Fibonacci?" answer=55 explain="$55$.":::

:::widget type=numeric-input prompt="Catalan $C_3 = \\binom{6}{3}/4 = ?$" answer=5 explain="$5$.":::

## Symbolic

**Exponential generating function (EGF)**:
$\hat A(x) = \sum a_n x^n / n!$. Used for *labelled* combinatorial
structures. Multiplication corresponds to *labelled* merging.

**Symbolic combinatorial method** (Flajolet-Sedgewick): each
combinatorial construction (sequence, set, cycle) maps to a GF
operation. Build complicated GFs by assembling simple parts.

**Coefficient extraction**: $[x^n] A(x) = a_n$. Enables clean
algebraic manipulation and asymptotic analysis (singularity analysis).

## Computational

```python
import sympy as sp

x = sp.symbols("x")

# Fibonacci GF
F = x / (1 - x - x**2)
print(sp.series(F, x, 0, 10))                  # 0 + x + x^2 + 2x^3 + 3x^4 + ...

# Catalan GF
C = (1 - sp.sqrt(1 - 4*x)) / (2*x)
print(sp.series(C, x, 0, 8))                   # 1 + x + 2x^2 + 5x^3 + 14x^4 + ...

# Number of binary strings without "11" = Fibonacci-like
# GF: 1/(1 - x - x^2)
N = 1 / (1 - x - x**2)
print(sp.series(N, x, 0, 10))

# Tribonacci
T = 1 / (1 - x - x**2 - x**3)
print([sp.series(T, x, 0, n + 1).coeff(x**n) for n in range(10)])
# 1, 1, 2, 4, 7, 13, 24, 44, 81, 149
```

## Applied

- **Algorithm analysis** — running times of recursive algorithms
  reduce to recurrence solving via GFs (Knuth's *Concrete Maths*).
- **Random number generators** — characteristic functions of pseudo-
  random sequences are linear-feedback shift registers; GF analysis
  reveals their period.
- **Quantum field theory** — Feynman diagrams enumerate via
  generating-function relations; the "exponential of connected = all"
  identity is a classical EGF identity.
- **Compiler combinator parsers** — context-free grammars correspond
  to algebraic equations on GFs, hence ambiguity detection and
  string-counting.

## Check Your Understanding

:::widget type=numeric-input prompt="Multiplication of GFs is convolution of sequences. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Fibonacci GF: $\\frac{x}{1 - x - x^2}$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Binet's formula for $F_n$ involves $\\phi = (1 + \\sqrt 5)/2$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="EGF is for labelled structures; OGF for unlabelled. Type 1." answer=1 explain="Yes.":::
