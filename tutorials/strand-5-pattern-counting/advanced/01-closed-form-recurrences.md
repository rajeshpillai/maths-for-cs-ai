---
strand: pattern-counting
level: advanced
order: 1
title: Solving Linear Recurrences
prerequisites:
  - tier: strand-5-pattern-counting-advanced
    slug: 00-generating-functions
    description: Generating functions
connections:
  - strand-5-pattern-counting-advanced/02-catalan-and-ballot
applications:
  - cs: "Recursion-tree analysis, dynamic programming asymptotics"
  - life: "Closed forms beat unrolling-by-hand"
---

# Solving Linear Recurrences

## Explain Like I Am 7

Suppose Monday's cookies depend on Sunday's and Saturday's, and
*every* day follows the same fair recipe.  Instead of grinding the
recipe forward 100 times, you guess the secret growth rate is some
number $r$ raised to the day count.  The recipe collapses into a
small puzzle whose answers $r_1, r_2$ are special seeds; mixing
those seeds in the right amounts to match Saturday and Sunday lets
you skip ahead to any day at lightning speed.  Once you can do this,
even huge recurrences are no scarier than ordinary algebra.

## Mental

A **linear homogeneous recurrence** of order $k$:

$$
a_n = c_1 a_{n-1} + c_2 a_{n-2} + \ldots + c_k a_{n-k}
$$

with constants $c_i$ and given initial conditions $a_0, \ldots, a_{k-1}$.

Two equivalent solving techniques:

1. **Characteristic polynomial**: solve $r^k = c_1 r^{k-1} + \ldots + c_k$.
   General solution is a linear combination of $r_i^n$ for the roots.
2. **Generating function**: form $A(x) = \sum a_n x^n$, derive an
   algebraic equation for $A$, partial-fraction-decompose, expand.

Both give the same answer.

## Worked example: $a_n = 5 a_{n-1} - 6 a_{n-2}$

Char poly: $r^2 - 5r + 6 = 0$, roots $r = 2, 3$.

$a_n = A \cdot 2^n + B \cdot 3^n$.

With $a_0 = 1, a_1 = 4$:

$A + B = 1, \quad 2A + 3B = 4 \Rightarrow A = -1, B = 2$.

$a_n = -2^n + 2 \cdot 3^n$.

Check: $a_2 = -4 + 18 = 14$, and $5(4) - 6(1) = 14$. ✓

## Repeated roots

If a root $r$ has multiplicity $m$, contribute terms
$r^n, n r^n, n^2 r^n, \ldots, n^{m-1} r^n$.

Example: $a_n = 4 a_{n-1} - 4 a_{n-2}$. Char poly $(r - 2)^2$. So
$a_n = (A + Bn) \cdot 2^n$.

## Inhomogeneous case

$a_n = c_1 a_{n-1} + \ldots + c_k a_{n-k} + f(n)$. General solution
$=$ general homogeneous solution $+$ a *particular* solution.

For polynomial $f$: try a polynomial particular solution of the same
degree. For exponential $f = \alpha^n$: try $A \alpha^n$ if $\alpha$
isn't a root, else $A n^m \alpha^n$.

## Interactive

:::widget type=numeric-input prompt="$a_n = 2 a_{n-1}$, $a_0 = 1$: $a_n = ?$ at $n = 5$." answer=32 explain="$2^5 = 32$.":::

:::widget type=numeric-input prompt="Fibonacci $F_n$ = $F_{n-1} + F_{n-2}$, char poly $r^2 - r - 1$, roots $\\phi, \\psi$. $F_{10} = ?$" answer=55 explain="$55$.":::

:::widget type=numeric-input prompt="$a_n = 5 a_{n-1} - 6 a_{n-2}$, $a_0 = 1, a_1 = 4$. $a_2 = 5 \\cdot 4 - 6 \\cdot 1 = ?$" answer=14 explain="$14$.":::

:::widget type=numeric-input prompt="Repeated root $r$ of multiplicity $m$: contributes $m$ terms $r^n, n r^n, \\ldots$. Type $m$ for $m = 3$." answer=3 explain="$3$.":::

## Symbolic

**Master theorem** (algorithm analysis): for $T(n) = a T(n/b) + f(n)$,

- If $f(n) = O(n^{\log_b a - \epsilon})$: $T(n) = \Theta(n^{\log_b a})$.
- If $f(n) = \Theta(n^{\log_b a})$: $T(n) = \Theta(n^{\log_b a} \log n)$.
- If $f(n) = \Omega(n^{\log_b a + \epsilon})$ with regularity:
  $T(n) = \Theta(f(n))$.

Examples: mergesort $T(n) = 2T(n/2) + n$ → $\Theta(n \log n)$.
Strassen $T(n) = 7 T(n/2) + n^2$ → $\Theta(n^{\log_2 7})$.

**Linear-algebra view**: $\mathbf{v}_n = M \mathbf{v}_{n-1}$ with
$\mathbf{v}_n = (a_n, a_{n-1}, \ldots, a_{n-k+1})^T$. Closed form
$\mathbf{v}_n = M^n \mathbf{v}_0$. Diagonalising $M$ recovers the
characteristic-polynomial solution.

## Computational

```python
import sympy as sp

n = sp.symbols("n", integer=True)
a = sp.Function("a")
sol = sp.rsolve(a(n) - 5*a(n-1) + 6*a(n-2), a(n),
                {a(0): 1, a(1): 4})
print(sol)                       # 2*3^n - 2^n

# Fibonacci closed form
fib = sp.rsolve(a(n) - a(n-1) - a(n-2), a(n), {a(0): 0, a(1): 1})
print(sp.simplify(fib))          # Binet form

# Master theorem (mergesort): T(n) = 2 T(n/2) + n
# log_2 2 = 1, f(n) = n = Θ(n^1) — Case 2: T(n) = Θ(n log n)

# Linear algebra view: power of companion matrix
M = sp.Matrix([[5, -6], [1, 0]])
v0 = sp.Matrix([4, 1])
for k in range(5):
    v0 = M * v0
    print(v0[0], end=" ")        # next a_n values
```

## Applied

- **Divide-and-conquer algorithm analysis** — every recursion tree
  reduces to a recurrence; Master theorem and its generalisations
  (Akra-Bazzi) close the analysis.
- **Population dynamics** — Leslie matrices model age-structured
  populations; eigenvalues give long-term growth rates.
- **Markov chains** — convergence to stationary distribution governed
  by spectral gap of the transition matrix; closed form in terms of
  eigenvalues.
- **DSP digital filters** — IIR filter outputs satisfy linear
  recurrences; Z-transform is the discrete analog of GFs.

## Check Your Understanding

:::widget type=numeric-input prompt="Mergesort recurrence $T(n) = 2T(n/2) + n$ has solution $\\Theta(?)$. Type 1 for $n \\log n$." answer=1 explain="$\\Theta(n \\log n)$.":::

:::widget type=numeric-input prompt="$a_n = a_{n-1} + 2 a_{n-2}$, char roots $r = 2, -1$. General solution: $A \\cdot 2^n + B \\cdot (-1)^n$. Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Strassen $T(n) = 7 T(n/2) + O(n^2)$ → $\\Theta(n^{\\log_2 7}) \\approx \\Theta(n^{2.807})$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Repeated root multiplicity 2 contributes $r^n$ and $n r^n$. Type 1." answer=1 explain="Yes.":::
