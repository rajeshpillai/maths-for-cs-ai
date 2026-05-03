---
strand: pattern-counting
level: foundation
order: 4
title: Pascal's Triangle
prerequisites:
  - tier: strand-5-pattern-counting-foundation
    slug: 03-combinations
    description: Combinations
connections:
  - strand-5-pattern-counting-foundation/05-binomial-theorem
applications:
  - business: "Probability tables; risk-tier counts"
  - cs: "Dynamic programming for combinations; lattice path counts; subset enumeration"
  - games: "Loot probability tiers; dice-sum distributions"
  - life: "Family genetics, lottery odds, polling sample arithmetic"
---

# Pascal's Triangle

## Mental

Stack the values $\binom{n}{k}$ in a triangle:

```
n=0:                 1
n=1:               1   1
n=2:             1   2   1
n=3:           1   3   3   1
n=4:         1   4   6   4   1
n=5:       1   5  10  10   5   1
n=6:     1   6  15  20  15   6   1
n=7:   1   7  21  35  35  21   7   1
```

Three properties stand out:

**1. The boundary is $1$.** $\binom{n}{0} = \binom{n}{n} = 1$ — there
is exactly one way to choose nothing, and one way to choose
everything.

**2. Each interior entry is the sum of the two above it.** Look at
$\binom{4}{2} = 6$: it sits below $\binom{3}{1} = 3$ (left) and
$\binom{3}{2} = 3$ (right). $3 + 3 = 6$. This is **Pascal's
identity**:

$$
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}.
$$

**3. The triangle is symmetric.** $\binom{n}{k} = \binom{n}{n-k}$ —
the left and right halves of each row mirror each other.

That single identity (interior = sum of two above) lets you
**generate the entire triangle by addition alone** — no factorials,
no multiplication. Pascal's triangle is one of the most efficient
ways to compute binomial coefficients up to moderate $n$.

The triangle was known to Indian, Persian, and Chinese
mathematicians for centuries before Pascal — Halayudha (10th c.,
India), Al-Karaji (10th c., Persia), Yang Hui (13th c., China). Pascal's name stuck in
the West because his $1654$ treatise *Traité du triangle
arithmétique* gave the most systematic Western treatment.

## Interactive

Explore the triangle. Hover any cell to see what binomial
coefficient it represents. Notice the row sums (right column).

:::widget type=pascal-triangle rows=8:::

Things to find:

- The "$1$" diagonal on each side (the boundary).
- The "natural numbers" diagonal: $1, 2, 3, 4, 5, \ldots$
  ($\binom{n}{1}$ values).
- The "triangular numbers" diagonal: $1, 3, 6, 10, 15, \ldots$
  ($\binom{n}{2}$ values — the "$n$ choose $2$" pair counts).
- The **row sums** doubling: $1, 2, 4, 8, 16, 32, 64, \ldots$ —
  exactly $2^n$.

A few quick checks:

:::widget type=numeric-input prompt="In Pascal's triangle, what is $\\binom{6}{2}$? (Look at row 6, position 2.)" answer=15 explain="Row 6 reads $1, 6, 15, 20, 15, 6, 1$. Position 2 is $15$. ($\\binom{6}{2}$ = 15.)":::

:::widget type=numeric-input prompt="The sum of all entries in row 5 is..." answer=32 explain="Row 5: $1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5$. The sum-of-row identity.":::

:::widget type=numeric-input prompt="Use Pascal's identity: $\\binom{7}{3} = \\binom{6}{?} + \\binom{6}{3}$. Type the missing $k$." answer=2 explain="$\\binom{7}{3} = \\binom{6}{2} + \\binom{6}{3} = 15 + 20 = 35$. The identity always pairs $(n-1, k-1)$ with $(n-1, k)$.":::

:::widget type=numeric-input prompt="The numbers $1, 3, 6, 10, 15$ appear on a diagonal of Pascal's triangle. They are called what (in CS terms)? Type 1 if 'triangular numbers', 0 otherwise." answer=1 explain="Triangular numbers — the count of ways to choose $2$ items from $n$, which equals the number of dots in a triangular array of side $n$.":::

:::widget type=step-revealer
{
  "title": "Why does each interior entry equal the sum of the two above?",
  "steps": [
    {"prose": "Take the entry $\\binom{n}{k}$ in row $n$. It counts the number of $k$-element subsets of $\\{1, 2, \\ldots, n\\}$."},
    {"prose": "**Split those subsets into two cases**, based on whether the subset contains the element $n$ or not."},
    {"math": "\\text{Case 1: subset contains } n \\Rightarrow \\binom{n-1}{k-1} \\text{ such subsets}", "prose": "If the subset includes $n$, the remaining $k-1$ elements come from $\\{1, \\ldots, n-1\\}$. That's $\\binom{n-1}{k-1}$."},
    {"math": "\\text{Case 2: subset does not contain } n \\Rightarrow \\binom{n-1}{k} \\text{ such subsets}", "prose": "If the subset excludes $n$, all $k$ elements come from $\\{1, \\ldots, n-1\\}$. That's $\\binom{n-1}{k}$."},
    {"math": "\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}", "prose": "Two cases, mutually exclusive. Sum the counts. **Pascal's identity**, proved combinatorially."},
    {"prose": "The same proof technique — **case-split a count, sum the cases** — recurs throughout combinatorics. Strand 5 Intermediate will systematise it."}
  ]
}
:::

## Symbolic

Pascal's identity:

$$
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}, \quad \text{with } \binom{n}{0} = \binom{n}{n} = 1.
$$

Sum of a row:

$$
\sum_{k=0}^n \binom{n}{k} = 2^n.
$$

Symmetry:

$$
\binom{n}{k} = \binom{n}{n-k}.
$$

Three more identities you'll meet again:

**Hockey stick identity**:

$$
\sum_{i=r}^n \binom{i}{r} = \binom{n+1}{r+1}.
$$

(Adding a "stick" of values down a diagonal of the triangle gives
the entry one row below and one position right — like a hockey
stick lying on the triangle.)

**Vandermonde's identity**:

$$
\binom{m + n}{r} = \sum_{k=0}^r \binom{m}{k} \binom{n}{r-k}.
$$

**Pascal's rule for differences**:

$$
\binom{n}{k} - \binom{n-1}{k} = \binom{n-1}{k-1}.
$$

(This is just Pascal's identity rearranged; useful for inductive
arguments.)

## Computational

Build the triangle in Python:

```python
def pascal(rows):
    """Return Pascal's triangle as a list of rows."""
    triangle = [[1]]
    for n in range(1, rows):
        prev = triangle[-1]
        new_row = [1]
        for k in range(1, n):
            new_row.append(prev[k-1] + prev[k])
        new_row.append(1)
        triangle.append(new_row)
    return triangle

for row in pascal(8):
    print(row)
# [1]
# [1, 1]
# [1, 2, 1]
# [1, 3, 3, 1]
# [1, 4, 6, 4, 1]
# [1, 5, 10, 10, 5, 1]
# [1, 6, 15, 20, 15, 6, 1]
# [1, 7, 21, 35, 35, 21, 7, 1]
```

Once you have the triangle, looking up $\binom{n}{k}$ is $O(1)$.
This is the right structure for problems that need many binomial
coefficients up to some bound — far faster than computing
$\dfrac{n!}{k!(n-k)!}$ each time.

Computing **just** $\binom{n}{k}$ for one $(n, k)$ pair, the dynamic
programming approach uses Pascal's identity directly:

```python
def comb_dp(n, k):
    if k < 0 or k > n: return 0
    # row 0..n, only need previous row
    prev = [1]
    for row in range(1, n + 1):
        cur = [1]
        for j in range(1, row):
            cur.append(prev[j-1] + prev[j])
        cur.append(1)
        prev = cur
    return prev[k]

print(comb_dp(7, 3))   # 35
```

This is $O(n^2)$ in time and $O(n)$ in space — slower than the
direct formula but uses only addition, which keeps intermediate
numbers manageable for very large $n$.

## Derivational

The interactive section already gave the **combinatorial proof** of
Pascal's identity (case-split on whether element $n$ is in the
subset).

Here's the **algebraic proof**:

$$
\binom{n-1}{k-1} + \binom{n-1}{k} = \frac{(n-1)!}{(k-1)!(n-k)!} + \frac{(n-1)!}{k!(n-1-k)!}.
$$

Get a common denominator $k!(n-k)!$:

$$
= \frac{k \cdot (n-1)!}{k!(n-k)!} + \frac{(n-k) \cdot (n-1)!}{k!(n-k)!} = \frac{(n-1)![k + (n-k)]}{k!(n-k)!} = \frac{n!}{k!(n-k)!} = \binom{n}{k}.
$$

Both proofs give the same identity. The combinatorial proof
**explains why**; the algebraic proof **verifies the formula**.
Strong combinatorialists prize the combinatorial proof: it shows
the identity reflects a real structural fact, not just an algebraic
coincidence.

*Why* does the row sum equal $2^n$?

A row sum is

$$
\sum_{k=0}^n \binom{n}{k}.
$$

Each $\binom{n}{k}$ counts $k$-element subsets of an $n$-set. Summing
over **all** $k$ counts **every** subset (size $0$ through $n$). The
total number of subsets of an $n$-set is $2^n$ (each element is
independently in or out, by Lesson 00's multiplication principle).

So $\sum_{k=0}^n \binom{n}{k} = 2^n$. ✓

A neat consequence: if you write $1 + 1 = 2$ on each side and raise
to the $n$th power, you get $\sum \binom{n}{k} = 2^n$ via the
**binomial theorem** (Lesson 05). Two unrelated proofs converging
on the same identity.

## Connective

Pascal's triangle ties together many ideas:

- **Lesson 03 (Combinations)**: each entry is a binomial coefficient.
- **Lesson 05 (Binomial theorem)**: each row is the coefficients of
  $(a + b)^n$.
- **Lesson 08 (Fibonacci)**: shallow diagonals of Pascal's triangle
  sum to Fibonacci numbers — surprising connection.
- **Strand 6 (Probability)**: the row's distribution
  $\dfrac{\binom{n}{k}}{2^n}$ is the **binomial distribution** —
  fundamental in statistics.
- **CS dynamic programming**: many DPs build a 2D table whose recurrence
  is Pascal's identity in disguise. Lattice paths, edit distance,
  knapsack subproblems all touch this structure.

Beyond:

- **Sierpinski triangle**: colour Pascal's triangle by parity (odd/
  even). The pattern is a famous fractal.
- **Catalan numbers** (Strand 5 Intermediate): $C_n = \binom{2n}{n}/(n+1)$
  — a derived combinatorial sequence with deep CS connections (BSTs,
  parens matchings, Dyck paths).

## Applied

- **Genetics**: a Punnett square for two heterozygous parents
  ($Aa \times Aa$) gives $1 : 2 : 1$ ratio of $AA : Aa : aa$ —
  exactly the $1, 2, 1$ row of Pascal's triangle.
- **Lottery numbers**: $\binom{49}{6} = 13\,983\,816$ is row 49,
  position 6 of Pascal's triangle. (Larger than the printed
  triangle in this lesson, but the identity still computes it.)
- **Polynomial expansion**: $(x + y)^7 = x^7 + 7x^6 y + 21 x^5 y^2
  + \ldots$ — the coefficients are row 7 of Pascal's triangle.
  Lesson 05 makes this rigorous.
- **Binomial probability**: flipping a fair coin $n$ times,
  $P(\text{exactly } k \text{ heads}) = \dfrac{\binom{n}{k}}{2^n}$.
  Strand 6 Intermediate builds on this.
- **Path counting**: in a grid where you can move right or up, the
  number of paths from $(0,0)$ to $(a, b)$ is $\binom{a+b}{a}$ —
  another Pascal entry.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $\\binom{8}{4}$? (Use Pascal's identity or the formula.)" answer=70 explain="$\\binom{8}{4} = \\binom{7}{3} + \\binom{7}{4} = 35 + 35 = 70$. Or: $\\dfrac{8!}{4! 4!} = \\dfrac{8 \\cdot 7 \\cdot 6 \\cdot 5}{24} = 70$.":::

:::widget type=numeric-input prompt="The sum of row $7$ of Pascal's triangle is..." answer=128 explain="$2^7 = 128$. Each row sums to $2^n$.":::

:::widget type=numeric-input prompt="The diagonal $\\binom{n}{2}$ for $n = 2, 3, 4, 5, \\ldots$ gives the triangular numbers. What's $\\binom{6}{2}$?" answer=15 explain="$\\dfrac{6 \\cdot 5}{2} = 15$. The 6th triangular number after $T_1 = 1, T_2 = 3, T_3 = 6, T_4 = 10, T_5 = 15$.":::

:::widget type=numeric-input prompt="In a Punnett square for two $Aa \\times Aa$ parents, what fraction of offspring is heterozygous (Aa)? Type as a fraction with denominator $4$ — just the numerator." answer=2 explain="The row-2 distribution is $1 : 2 : 1$ for $AA : Aa : aa$. Numerator $2$ → $\\dfrac{2}{4} = \\dfrac{1}{2}$.":::
