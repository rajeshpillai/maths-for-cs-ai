# Backwards Construction

## Intuition

Sometimes the fastest path to a solution is to start at the destination and work backwards. Instead of asking "where does this lead?", ask "what must be true for this answer to hold?" This is particularly powerful in multiple-choice exams like JEE where you can verify candidates, and in construction problems where you assume the desired object exists and deduce its properties.

In programming terms: this is like reverse-engineering the output to find the input.

## Prerequisites

- Foundation 1, Lesson 8 (Problem-solving strategies)

## The Strategy

**When to work backwards:**

1. **Answer verification:** In MCQ, substitute each option and check which satisfies all conditions. Often faster than solving forward.

2. **Assume the result:** To prove P implies Q, sometimes assume Q and show it requires P. (Be careful: this only works if steps are reversible, or you're constructing rather than proving.)

3. **Parametric assumption:** Assume the answer has a certain form (e.g., "the quadratic has roots r and s"), write conditions on the parameters, and solve for them.

4. **Locus construction:** To find a locus, assume a general point (h, k) lies on it, derive the constraint, then replace h, k with x, y.

5. **Functional equations:** Guess the form f(x) = ax + b (or polynomial, exponential, etc.), substitute into the equation, and solve for coefficients.

**The key principle:** If you know what the answer should look like, impose that structure and solve for the unknowns.

## Worked Problems

### Problem 1: Using Answer Choices (MCQ Strategy)

**Problem:** The equation x^4 - 4x^3 + ax^2 + bx + 1 = 0 has four positive real roots. Find a.
Options: (A) 4, (B) 5, (C) 6, (D) 8.

**Recognise:** Four positive roots with leading coefficient 1 and constant term 1. Work backwards from what these constraints mean.

**Solution:**

Let roots be p, q, r, s > 0.

By Vieta's: p*q*r*s = 1 (constant term) and p+q+r+s = 4 (coefficient of x^3, negated).

By AM-GM: (p+q+r+s)/4 >= (pqrs)^(1/4), so 1 >= 1. Equality!

AM-GM equality holds iff p = q = r = s. Since product = 1 and sum = 4: all roots = 1.

So the polynomial is (x-1)^4 = x^4 - 4x^3 + 6x^2 - 4x + 1.

Therefore a = 6. Answer: (C).

### Problem 2: Assume the Form of a Functional Equation Solution

**Problem:** Find all functions f: R → R such that f(x + y) = f(x) + f(y) + 2xy for all real x, y, given f(0) = 0.

**Recognise:** The 2xy term suggests f has a quadratic component. Assume f(x) = x^2 + g(x) and determine g.

**Solution:**

Substitute f(x) = x^2 + g(x):

(x+y)^2 + g(x+y) = x^2 + g(x) + y^2 + g(y) + 2xy
x^2 + 2xy + y^2 + g(x+y) = x^2 + y^2 + 2xy + g(x) + g(y)
g(x+y) = g(x) + g(y)

So g satisfies Cauchy's functional equation. Under standard conditions (continuity, monotonicity, or measurability): g(x) = cx for some constant c.

Therefore f(x) = x^2 + cx.

Verify: f(x+y) = (x+y)^2 + c(x+y) = x^2 + 2xy + y^2 + cx + cy
= [x^2 + cx] + [y^2 + cy] + 2xy = f(x) + f(y) + 2xy. Confirmed.

### Problem 3: Locus by Assuming Point on Curve

**Problem:** A variable line through (2, 3) meets the circle x^2 + y^2 = 4 at points A and B. Find the locus of the midpoint of AB.

**Recognise:** Classic locus problem. Assume midpoint is (h, k), use the midpoint-chord relationship, derive constraint, replace with (x, y).

**Solution:**

Let M = (h, k) be the midpoint of chord AB of the circle x^2 + y^2 = 4.

Property: The line from centre O(0,0) to midpoint M is perpendicular to chord AB.

Slope of OM = k/h.
Slope of AB (which passes through (2,3)) = (k-3)/(h-2).

Perpendicularity condition: (k/h) * (k-3)/(h-2) = -1.

k(k-3) = -h(h-2)
k^2 - 3k = -h^2 + 2h
h^2 + k^2 - 2h - 3k = 0

Replace (h, k) with (x, y):
**Locus:** x^2 + y^2 - 2x - 3y = 0.

This is a circle with centre (1, 3/2) and radius sqrt(1 + 9/4) = sqrt(13)/2.

### Problem 4: Parametric Construction for Quadratic Conditions

**Problem:** Find the values of k for which the equation x^2 + 2(k-1)x + (k+5) = 0 has both roots positive.

**Recognise:** Work backwards from "both roots positive" — what conditions must the coefficients satisfy?

**Solution:**

For quadratic ax^2 + bx + c = 0 to have both roots positive, we need:
1. Discriminant >= 0 (real roots)
2. Sum of roots > 0 (both positive means sum positive)
3. Product of roots > 0 (both positive means product positive)

Here a = 1, b = 2(k-1), c = k+5.

Condition 1: D = 4(k-1)^2 - 4(k+5) >= 0
(k-1)^2 - (k+5) >= 0
k^2 - 2k + 1 - k - 5 >= 0
k^2 - 3k - 4 >= 0
(k-4)(k+1) >= 0
k <= -1 or k >= 4.

Condition 2: Sum = -b/a = -2(k-1) > 0, so k-1 < 0, i.e., k < 1.

Condition 3: Product = c/a = k + 5 > 0, so k > -5.

Intersection: k <= -1 AND k < 1 AND k > -5.
Result: **-5 < k <= -1**.

### Problem 5: Working Backwards in Determinant Problems

**Problem:** If the system of equations x + 2y + 3z = 0, 2x + 3y + z = 0, 3x + y + 2z = 0 has a non-trivial solution, verify this and find the ratio x:y:z.

**Recognise:** Non-trivial solution exists iff determinant = 0. Assume a solution exists and find the ratios by working backwards from the homogeneous system.

**Solution:**

First verify: det = |1 2 3; 2 3 1; 3 1 2|
= 1(6-1) - 2(4-3) + 3(2-9)
= 5 - 2 - 21 = -18.

Wait, that's not zero! Let me recompute:
= 1(3*2 - 1*1) - 2(2*2 - 1*3) + 3(2*1 - 3*3)
= 1(6-1) - 2(4-3) + 3(2-9)
= 5 - 2 - 21 = -18 ≠ 0.

So actually this system only has the trivial solution. Let me modify:

**Revised Problem:** x + 2y + 3z = 0, 2x + 3y + 4z = 0, 3x + 5y + 7z = 0.

det = |1 2 3; 2 3 4; 3 5 7|
= 1(21-20) - 2(14-12) + 3(10-9)
= 1 - 4 + 3 = 0. Good.

From first two equations:
x + 2y + 3z = 0 ... (1)
2x + 3y + 4z = 0 ... (2)

(2) - 2*(1): -y - 2z = 0, so y = -2z.
From (1): x + 2(-2z) + 3z = 0 => x - z = 0 => x = z.

Ratio x:y:z = z:(-2z):z = 1:(-2):1.

Verify in equation 3: 3(1) + 5(-2) + 7(1) = 3 - 10 + 7 = 0. Confirmed.

### Problem 6: Reverse Engineering a Sequence

**Problem:** A sequence satisfies a_n = 3a_(n-1) - 2a_(n-2) with a_1 = 1, a_2 = 3. Find the general term.

**Recognise:** Assume the solution has form a_n = A*r^n. Substitute to find r, then use initial conditions for A.

**Solution:**

Assume a_n = r^n. Substituting into the recurrence:
r^n = 3r^(n-1) - 2r^(n-2)
r^2 = 3r - 2
r^2 - 3r + 2 = 0
(r-1)(r-2) = 0
r = 1 or r = 2.

General solution: a_n = A*1^n + B*2^n = A + B*2^n.

Initial conditions:
a_1 = A + 2B = 1
a_2 = A + 4B = 3

Subtract: 2B = 2, so B = 1. Then A = -1.

**a_n = 2^n - 1.**

Verify: a_1 = 2-1 = 1, a_2 = 4-1 = 3, a_3 = 3(3) - 2(1) = 7 = 8-1. Correct.

### Problem 7: Backwards from Tangent Condition

**Problem:** Find the equation of the tangent to y = x^3 - 3x + 2 that passes through the point (0, 2).

**Recognise:** Instead of finding the tangent at every point and checking which passes through (0,2), work backwards: assume the tangent touches at (a, a^3 - 3a + 2) and force it to pass through (0, 2).

**Solution:**

At point (a, a^3 - 3a + 2), the slope is y' = 3a^2 - 3.

Tangent line: y - (a^3 - 3a + 2) = (3a^2 - 3)(x - a).

This passes through (0, 2):
2 - a^3 + 3a - 2 = (3a^2 - 3)(0 - a)
-a^3 + 3a = -3a^3 + 3a
-a^3 + 3a + 3a^3 - 3a = 0
2a^3 = 0
a = 0.

At a = 0: slope = -3, point = (0, 2).
Tangent: y - 2 = -3(x - 0), i.e., **y = -3x + 2**.

But wait — (0, 2) is actually ON the curve (check: 0 - 0 + 2 = 2). So the tangent at the point itself passes through it. Are there other tangent lines from (0,2)?

We got 2a^3 = 0 => a = 0 is the only solution. So **y = -3x + 2** is the only tangent from (0, 2).

## Python Verification

```python
import numpy as np
from numpy.polynomial import polynomial as P

# Problem 1: Verify (x-1)^4
coeffs = np.array([1, -4, 6, -4, 1])  # x^4 - 4x^3 + 6x^2 - 4x + 1
roots = np.roots(coeffs)
print(f"Problem 1: roots of x^4-4x^3+6x^2-4x+1 = {roots}")
print(f"All roots = 1? {np.allclose(roots, 1)}")
print()

# Problem 2: Verify f(x) = x^2 + cx satisfies f(x+y) = f(x) + f(y) + 2xy
c = 7  # arbitrary constant
f = lambda x: x**2 + c*x
x, y = 3.5, 2.1
print(f"Problem 2: f(x+y) = {f(x+y):.4f}, f(x)+f(y)+2xy = {f(x)+f(y)+2*x*y:.4f}")
print()

# Problem 3: Verify locus
# Midpoint of chord of x^2+y^2=4, chord passing through (2,3)
# Locus: x^2 + y^2 - 2x - 3y = 0
# Test: parametrise lines through (2,3), find midpoints
midpoints = []
for angle in np.linspace(0, np.pi, 50):
    # Line: (2 + t*cos(angle), 3 + t*sin(angle))
    # Intersect with x^2+y^2=4:
    # (2+tc)^2 + (3+ts)^2 = 4
    ca, sa = np.cos(angle), np.sin(angle)
    # t^2 + t*(4c+6s) + (4+9-4) = 0 => t^2 + t*(4c+6s) + 9 = 0
    A_coeff = 1
    B_coeff = 4*ca + 6*sa
    C_coeff = 9
    disc = B_coeff**2 - 4*C_coeff
    if disc >= 0:
        t1 = (-B_coeff + np.sqrt(disc)) / 2
        t2 = (-B_coeff - np.sqrt(disc)) / 2
        mx = 2 + (t1+t2)/2 * ca
        my = 3 + (t1+t2)/2 * sa
        midpoints.append((mx, my))
        # Check locus
        check = mx**2 + my**2 - 2*mx - 3*my
        if abs(check) > 0.001:
            print(f"  FAIL at angle {angle:.2f}: check = {check:.4f}")

print(f"Problem 3: All {len(midpoints)} midpoints satisfy locus equation (no failures printed)")
print()

# Problem 4: Verify k conditions
# Both roots positive of x^2 + 2(k-1)x + (k+5) = 0 when -5 < k <= -1
for k in [-4, -3, -2, -1]:
    b = 2*(k-1)
    c = k + 5
    disc = b**2 - 4*c
    if disc >= 0:
        r1 = (-b + np.sqrt(disc)) / 2
        r2 = (-b - np.sqrt(disc)) / 2
        print(f"Problem 4: k={k}: roots = {r1:.3f}, {r2:.3f} (both positive? {r1>0 and r2>0})")
print()

# Problem 6: Verify a_n = 2^n - 1
a = [0, 1, 3]  # a_0 unused, a_1=1, a_2=3
for n in range(3, 8):
    a.append(3*a[-1] - 2*a[-2])
for n in range(1, 8):
    print(f"Problem 6: a_{n} = {a[n]}, formula: 2^{n}-1 = {2**n - 1}")
```

## When This Strategy Fails

- **Non-reversible steps:** If your backwards reasoning involves squaring (which can introduce extraneous solutions) or taking logarithms (which requires sign checks), you must verify forward.
- **Too many forms to try:** If you don't have a good guess for the answer's form, parametric assumption wastes time. Only use it when the structure is suggested by the problem.
- **Existence not guaranteed:** Working backwards assumes a solution exists. If the problem asks "does a solution exist?", backwards reasoning can mislead — you might derive conditions that are actually impossible.
- **MCQ with close options:** If answer choices are very close numerically, backwards verification might not help (all look approximately correct).

## Visualisation — Constructing a polynomial that fits given roots

The classic backwards-construction move: rather than solve for the
roots, *assume* the polynomial has them and write it down. The plot
shows three polynomials built backwards from chosen roots.

```python
# ── Visualising polynomial construction from desired roots ──
import numpy as np
import matplotlib.pyplot as plt

specs = [
    ([-2, 0, 2],         "P(x) = (x+2)(x)(x-2) = x³ − 4x"),
    ([1, 1, 3],          "double root at 1: P(x) = (x−1)²(x−3)"),
    ([0, 0, 1, -1, 2],   "5th-degree: P(x) = x²(x−1)(x+1)(x−2)"),
]

fig, axes = plt.subplots(1, 3, figsize=(16, 5))

for ax, (roots, label) in zip(axes, specs):
    coeffs = np.poly(roots)              # NumPy: build coeffs from roots
    xs = np.linspace(min(roots) - 1, max(roots) + 1, 400)
    ys = np.polyval(coeffs, xs)
    ax.plot(xs, ys, color="tab:blue", lw=2)
    ax.axhline(0, color="black", lw=0.5)
    for r in set(roots):
        mult = roots.count(r)
        ax.scatter(r, 0, color="tab:red", s=140, zorder=5)
        ax.text(r, max(ys) * 0.05, f"x = {r}  (×{mult})", color="tab:red",
                ha="center", fontsize=9, fontweight="bold")
    ax.set_title(label)
    ax.set_xlabel("x"); ax.set_ylabel("P(x)")
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the coefficients for one example, derived backwards from roots.
roots_ex = [-2, 0, 2]
coeffs_ex = np.poly(roots_ex)
print(f"Roots → coefficients (backwards construction):")
print(f"  roots {roots_ex} ⇒ P(x) = {' + '.join(f'{c:.0f}·x^{i}' for i, c in enumerate(coeffs_ex[::-1]))}")
print(f"  i.e.  P(x) = x³ − 4x   (matches by direct multiplication)")
print()
print("This 'work backwards from the answer shape' move is the same trick")
print("used by test-driven development, constraint solvers, and inverse problems.")
```

## Connection to CS / Games / AI / Business / Industry

Reasoning *from the answer back to the question* — assuming a solution
shape and constraining it — is one of the most common moves in applied
work:

- **CS / Software.** **Test-driven development**: write the test (the
  desired output) first, then build code that satisfies it. **Constraint
  solvers** (Z3, MiniSAT, OR-Tools) take a goal predicate and search
  backwards through valid assignments. **Type-driven development**
  (Haskell, Idris) sketches the type signature first and lets the types
  guide the implementation.
- **AI / ML.** **Inverse problems** — image deblurring, super-resolution,
  MRI reconstruction — start from a degraded output and reason backwards
  to the input. **Bayesian inference** is mathematical backwards
  reasoning ($P(\text{cause} \mid \text{effect})$). **Diffusion models**
  generate images by *iteratively reversing* a noising process.
- **Engineering.** **Reverse engineering** of mechanical assemblies,
  **fault-tree analysis** in safety engineering, **root-cause analysis**
  in incident postmortems — all start from the failure and work back.
  Control engineers design controllers by **specifying the desired
  closed-loop response first** and solving for the controller.
- **Business / Strategy.** **OKRs and goal-setting** (Andy Grove,
  Doerr): start from the desired outcome, work back to the inputs.
  **Backward planning** for project schedules (deadline-first), **scenario
  planning** (what assumptions would make this future true?), and
  **reverse-engineering competitor moves** are standard playbook items.
- **Maths / Cryptography.** Constructing **counter-examples** is
  backwards reasoning — assume the target property holds, derive a
  contradiction by construction. **Zero-knowledge proofs** are designed
  by working backwards from "what should the verifier believe?"

## Check Your Understanding

1. Find all values of m for which both roots of x^2 - 2mx + m^2 - 1 = 0 lie between -2 and 4. [Work backwards from the four conditions: D >= 0, f(-2) > 0, f(4) > 0, -2 < vertex < 4.]

2. Find a polynomial p(x) of degree 3 such that p(1) = 1, p(2) = 8, p(3) = 27, p(4) = 64. [Hint: Notice these are cubes. Assume p(x) = x^3 + q(x) and determine q.]

3. The tangent at point P on the curve y = x^2 meets the x-axis at A and the y-axis at B. If P moves along the curve, find the locus of the midpoint of AB. [Assume P = (t, t^2), write the tangent, find A and B, compute midpoint, eliminate t.]
