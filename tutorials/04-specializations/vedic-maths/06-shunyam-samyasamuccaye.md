# Shunyam Samyasamuccaye — "When the Sum is the Same, the Sum is Zero"

## Intuition

This sutra provides instant solutions to certain equation types that would
normally require multiple algebraic steps. When you spot that terms on both
sides of an equation share a common sum (samuccaya), you can immediately
write down the answer. It also enables rapid factoring of expressions and
quick identification of roots. In competitions, recognising these patterns
saves minutes.

## Prerequisites

- Foundation 1, Lesson 3: Solving Linear Equations
- Foundation 1, Lesson 2: Algebraic Manipulation (factoring)

## The Sutra

> **शून्यं साम्यसमुच्चये**
> *Shunyam Samyasamuccaye*
> "When the Samuccaya is the same, that Samuccaya is zero"

"Samuccaya" has multiple meanings depending on context:
1. A common factor in all terms
2. The sum of numerators/denominators
3. The sum of coefficients
4. A combination or total that appears on both sides

## From First Principles

### The Technique (step by step)

**Application 1: Common factor elimination**

If every term in an equation has a common factor, that factor equals zero
(or the equation reduces).

**Example 1**: Solve $12x + 3x = 4x + 11x$

All terms have factor $x$. Samuccaya (common factor) = $x$.
By the sutra: $x = 0$.

Check: $12(0) + 3(0) = 4(0) + 11(0)$ → $0 = 0$. Correct.

---

**Application 2: Equal sums of denominators**

For equations of the form $\frac{1}{a} + \frac{1}{b} = \frac{1}{c} + \frac{1}{d}$

If $a + b = c + d$, then $x = 0$ (when $a, b, c, d$ are linear in $x$).

**Example 2**: Solve $\frac{1}{x+2} + \frac{1}{x+5} = \frac{1}{x+3} + \frac{1}{x+4}$

Sum of denominators on LHS: $(x+2) + (x+5) = 2x + 7$
Sum of denominators on RHS: $(x+3) + (x+4) = 2x + 7$

Sums are equal! By the sutra: the numerator of the combined fraction is zero.

For the standard form, this means $x = 0$ is a solution... but let's verify
more carefully. Cross-multiplying LHS:
$$\frac{(x+5) + (x+2)}{(x+2)(x+5)} = \frac{(x+4) + (x+3)}{(x+3)(x+4)}$$
$$\frac{2x+7}{(x+2)(x+5)} = \frac{2x+7}{(x+3)(x+4)}$$

Since numerators are equal, either $2x + 7 = 0$ (giving $x = -7/2$) or
the denominators are equal: $(x+2)(x+5) = (x+3)(x+4)$ → $x^2 + 7x + 10 = x^2 + 7x + 12$ → $10 = 12$, impossible.

So: $x = -7/2$.

The sutra says: when the samuccaya (sum $2x+7$) is the same on both sides,
set that samuccaya to zero: $2x + 7 = 0 → x = -7/2$.

---

**Application 3: Sum of coefficients for factoring**

If the sum of coefficients of a polynomial equals zero, then $(x - 1)$ is a factor.

**Example 3**: Factor $x^3 - 6x^2 + 11x - 6$

Sum of coefficients: $1 - 6 + 11 - 6 = 0$.

By the sutra: $(x - 1)$ is a factor.

Dividing: $x^3 - 6x^2 + 11x - 6 = (x-1)(x^2 - 5x + 6) = (x-1)(x-2)(x-3)$.

---

**Application 4: Symmetric equation solving**

**Example 4**: Solve $\frac{x+3}{x+4} + \frac{x+5}{x+6} = \frac{x+1}{x+2} + \frac{x+7}{x+8}$

Each fraction can be written as $1 - \frac{1}{\text{denom}}$:
$$\left(1 - \frac{1}{x+4}\right) + \left(1 - \frac{1}{x+6}\right) = \left(1 - \frac{1}{x+2}\right) + \left(1 - \frac{1}{x+8}\right)$$

Simplifying: $\frac{1}{x+4} + \frac{1}{x+6} = \frac{1}{x+2} + \frac{1}{x+8}$

Sum of LHS denominators: $(x+4) + (x+6) = 2x + 10$
Sum of RHS denominators: $(x+2) + (x+8) = 2x + 10$

Equal! Apply the sutra: set the common numerator to zero.
Cross-multiply LHS: $\frac{2x+10}{(x+4)(x+6)} = \frac{2x+10}{(x+2)(x+8)}$
Set $2x + 10 = 0 → x = -5$.

---

**Application 5: Quick factoring with alternating signs**

**Example 5**: Factor $x^2 - 7x + 12$

If the sum of coefficients with $x = 1$ equals zero: $1 - 7 + 12 = 6 \neq 0$.
If with $x = -1$ (substitute and check): $1 + 7 + 12 = 20 \neq 0$.

But we can use another form of the sutra: for $ax^2 + bx + c$, if we can
find the samuccaya (pair summing to $-b/a$): find two numbers that sum to 7
and multiply to 12. Those are 3 and 4.

So $x^2 - 7x + 12 = (x-3)(x-4)$.

### Why It Works (algebraic proof)

**For Application 2** (the key result):

Given $\frac{1}{f(x)} + \frac{1}{g(x)} = \frac{1}{h(x)} + \frac{1}{k(x)}$

where $f + g = h + k = S(x)$ (the samuccaya).

LHS: $\frac{f + g}{fg} = \frac{S}{fg}$

RHS: $\frac{h + k}{hk} = \frac{S}{hk}$

So the equation becomes: $\frac{S}{fg} = \frac{S}{hk}$

This holds when either:
- $S = 0$ (the samuccaya is zero — this gives the solution), or
- $fg = hk$ (which generally has no solution for linear $f,g,h,k$ with the
  given constraint).

Setting $S(x) = 0$ gives the solution directly.

**For Application 3** (factor theorem):

If $P(1) = 0$ (sum of coefficients = 0), then by the Factor Theorem,
$(x - 1)$ divides $P(x)$.

More generally, if $P(a) = 0$ for some value $a$, then $(x - a)$ is a factor.
The "sum of coefficients" test is just the special case $a = 1$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: Show the equation balance
ax = axes[0]
ax.set_title('Samuccaya Balance\n1/(x+2) + 1/(x+5) = 1/(x+3) + 1/(x+4)',
             fontsize=11, fontweight='bold')

x = np.linspace(-1.5, 1.5, 200)

# Avoid poles
lhs = 1/(x+2) + 1/(x+5)
rhs = 1/(x+3) + 1/(x+4)

ax.plot(x, lhs, 'b-', linewidth=2, label='LHS: 1/(x+2) + 1/(x+5)')
ax.plot(x, rhs, 'r--', linewidth=2, label='RHS: 1/(x+3) + 1/(x+4)')
ax.axvline(x=-3.5, color='green', linestyle=':', linewidth=2, label='x = -7/2 (solution)')
ax.axhline(y=0, color='gray', linewidth=0.5)
ax.set_xlabel('x')
ax.set_ylabel('y')
ax.legend(fontsize=9)
ax.set_ylim(-2, 2)
ax.grid(True, alpha=0.3)

# Right: Factor theorem visualisation
ax2 = axes[1]
ax2.set_title('Factor Theorem: Sum of Coefficients = 0\n'
              'P(x) = x³ - 6x² + 11x - 6', fontsize=11, fontweight='bold')

x = np.linspace(0, 4, 200)
P = x**3 - 6*x**2 + 11*x - 6

ax2.plot(x, P, 'b-', linewidth=2)
ax2.axhline(y=0, color='gray', linewidth=0.5)

# Mark roots
roots = [1, 2, 3]
for r in roots:
    ax2.plot(r, 0, 'ro', markersize=10)
    ax2.annotate(f'x={r}', (r, 0.5), ha='center', fontsize=11, color='red')

# Annotate sum of coefficients
ax2.text(0.5, -3, 'Coefficients: 1, -6, 11, -6\nSum = 0 → (x-1) is a factor!',
         fontsize=10, bbox=dict(boxstyle='round', facecolor='lightyellow'))

ax2.set_xlabel('x')
ax2.set_ylabel('P(x)')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('shunyam_visualisation.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Shunyam Samyasamuccaye: Verification ─────────────────
import numpy as np
from fractions import Fraction

# Application 2: Equal sum of denominators
print("Application 2: 1/(x+2) + 1/(x+5) = 1/(x+3) + 1/(x+4)")
print("=" * 55)

# Sum of denominators: (x+2)+(x+5) = 2x+7 = (x+3)+(x+4)
# Set samuccaya to zero: 2x + 7 = 0 → x = -7/2
x = Fraction(-7, 2)
lhs = Fraction(1, x + 2) + Fraction(1, x + 5)
rhs = Fraction(1, x + 3) + Fraction(1, x + 4)
print(f"  x = -7/2")
print(f"  LHS = 1/({x}+2) + 1/({x}+5) = 1/{x+2} + 1/{x+5} = {lhs}")
print(f"  RHS = 1/({x}+3) + 1/({x}+4) = 1/{x+3} + 1/{x+4} = {rhs}")
assert lhs == rhs
print("  LHS = RHS ✓")

# Application 3: Sum of coefficients = 0
print("\n\nApplication 3: Factor theorem")
print("=" * 55)
print("P(x) = x³ - 6x² + 11x - 6")
coeffs = [1, -6, 11, -6]
sum_coeffs = sum(coeffs)
print(f"  Sum of coefficients: {' + '.join(map(str,coeffs))} = {sum_coeffs}")
print(f"  Since sum = 0, (x-1) is a factor.")

# Verify by evaluation
P = lambda x: x**3 - 6*x**2 + 11*x - 6
print(f"  P(1) = {P(1)}")
assert P(1) == 0

# Full factoring
print(f"  P(x) = (x-1)(x-2)(x-3)")
for r in [1, 2, 3]:
    assert P(r) == 0
print("  All roots verified ✓")

# Application 4: Symmetric equation
print("\n\nApplication 4: Symmetric fraction equation")
print("=" * 55)
print("(x+3)/(x+4) + (x+5)/(x+6) = (x+1)/(x+2) + (x+7)/(x+8)")
print("Reduces to: 1/(x+4) + 1/(x+6) = 1/(x+2) + 1/(x+8)")
print("Sum of denoms LHS: 2x+10, RHS: 2x+10 → set 2x+10 = 0 → x = -5")

x = -5
lhs_val = 1/(x+4) + 1/(x+6)
rhs_val = 1/(x+2) + 1/(x+8)
print(f"  x = -5: LHS = 1/{x+4} + 1/{x+6} = {lhs_val}")
print(f"          RHS = 1/{x+2} + 1/{x+8} = {rhs_val}")
assert abs(lhs_val - rhs_val) < 1e-10
print("  ✓ Verified!")

# General solver
print("\n\nGeneral Samuccaya Solver:")
print("=" * 55)

def solve_samuccaya(a, b, c, d):
    """
    Solve 1/(x+a) + 1/(x+b) = 1/(x+c) + 1/(x+d)
    If a+b = c+d, solution is x = -(a+b)/2
    """
    sum_lhs = a + b
    sum_rhs = c + d
    if sum_lhs == sum_rhs:
        x = Fraction(-(a + b), 2)
        print(f"  1/(x+{a}) + 1/(x+{b}) = 1/(x+{c}) + 1/(x+{d})")
        print(f"  Sum of denominators: {sum_lhs} = {sum_rhs} (equal!)")
        print(f"  Solution: x = -{sum_lhs}/2 = {x}")
        return x
    else:
        print(f"  Sums not equal ({sum_lhs} ≠ {sum_rhs}), sutra doesn't directly apply.")
        return None

solve_samuccaya(2, 5, 3, 4)
print()
solve_samuccaya(1, 8, 3, 6)
print()
solve_samuccaya(4, 6, 2, 8)
```

## Connection to CS / Games / AI / Business / Industry

- **Symmetry exploitation** in AI: many optimisation problems have symmetric
  structure. Recognising symmetry lets you eliminate variables or reduce
  search space — the algorithmic equivalent of this sutra.
- **Common factor elimination** is the basis of algebraic simplification in
  computer algebra systems (Mathematica, SymPy).
- **Polynomial root finding**: the sum-of-coefficients test ($P(1) = 0?$) is
  often the first check in numerical root-finding algorithms.
- **Constraint satisfaction**: in CSP solvers, detecting that constraints
  share a common "samuccaya" structure enables pruning.
- **Energy trading & power markets (Tata Power, ENGIE).** Bid/ask matching
  in IEX (Indian Energy Exchange) day-ahead auctions zeros out symmetric
  surplus/shortage at clearing — the regulator's price-discovery algorithm
  is a samuccaya-style sum-equals-sum equation, solved hundreds of times
  per market block.
- **Tax & accounting (Big Four — Deloitte, EY, PwC, KPMG).** GST input
  credit reconciliation: when input-side tax sums to output-side tax,
  the net liability collapses to zero — exactly the "samuccaya = 0"
  pattern; auditors visually scan reconciliation sheets for this
  symmetric cancellation before signing off.
- **Insurance pricing (LIC, ICICI Lombard, Bajaj Allianz).** Symmetric
  premium-vs-claim equations in pure-endowment policies use
  factor-theorem-style "P(1) = 0" checks for actuarial balance; IRDAI
  Form L-2 schedules cite the same identity for solvency margin.
- **Survey research / polling (Nielsen, IPSOS, CSDS).** Adjusting weights
  so that demographic stratum totals match (sum of LHS = sum of RHS) is
  raked-weighting; the underlying linear system is solved by exactly the
  samuccaya cancellation of equal sums.

## Practice Problems

1. Solve: $\frac{1}{x+1} + \frac{1}{x+9} = \frac{1}{x+3} + \frac{1}{x+7}$
2. Solve: $\frac{1}{x+4} + \frac{1}{x+8} = \frac{1}{x+5} + \frac{1}{x+7}$
3. Factor $x^3 + 3x^2 - x - 3$ (hint: check sum of coefficients)
4. Factor $2x^3 - x^2 - 5x - 2$ (hint: try $P(2)$, $P(-1)$)
5. Solve: $\frac{x+1}{x+3} + \frac{x+5}{x+7} = \frac{x+2}{x+4} + \frac{x+4}{x+6}$

**Answers**:
1. $x = -5$
2. $x = -6$
3. $(x-1)(x+1)(x+3)$
4. $(x-2)(2x+1)(x+1)$  (note: $P(2) = 16-4-10-2 = 0$)
5. $x = -4$
