# Extreme Cases and Small Examples

## Intuition

Before attacking a general problem, check what happens at the boundaries. Test n = 1, 2, 3. See what happens when a parameter goes to 0 or infinity. Make the triangle degenerate into a line. Let the ellipse become a circle. These extreme and small cases serve two purposes: they reveal patterns that guide your solution, and they immediately eliminate wrong answers.

This is the mathematician's equivalent of unit testing — small inputs expose bugs in your reasoning.

## Prerequisites

- Foundation 3, Lesson 10 (Mathematical induction and pattern recognition)

## The Strategy

**Techniques:**

1. **Small examples (n = 1, 2, 3):** Compute the first few cases by hand. Look for patterns in the answers. Often the pattern gives you the general formula to then prove by induction.

2. **Boundary/degenerate cases:** Set a parameter to its extreme value:
   - Triangle with one angle → 0 or pi (becomes a line segment)
   - Ellipse with e → 0 (becomes a circle)
   - Rectangle with one side → 0 (becomes a segment)
   - Polynomial with one root repeated (discriminant = 0)

3. **Extreme value checking:** After solving, verify your answer at extreme values. If your formula for area gives a negative number when the shape degenerates, something is wrong.

4. **Dimensional analysis:** In physics-flavoured problems, check that extreme cases give sensible physical answers.

5. **Monotonicity exploration:** If f(1) = 2, f(2) = 5, f(3) = 10, check if f(n) = n^2 + 1. Small cases generate conjectures.

**When this is decisive:** In MCQ, if only one option gives the correct value at n = 1, you're done without solving the general problem.

## Worked Problems

### Problem 1: Pattern Discovery in Sequences

**Problem:** Find the sum S(n) = 1*2 + 2*3 + 3*4 + ... + n*(n+1).

**Recognise:** Compute small cases to spot the pattern, then prove it.

**Solution:**

S(1) = 1*2 = 2
S(2) = 2 + 2*3 = 2 + 6 = 8
S(3) = 8 + 3*4 = 8 + 12 = 20
S(4) = 20 + 4*5 = 20 + 20 = 40

Look for a pattern. Try S(n) = n(n+1)(n+2)/3:
- n=1: 1*2*3/3 = 2. Correct.
- n=2: 2*3*4/3 = 8. Correct.
- n=3: 3*4*5/3 = 20. Correct.
- n=4: 4*5*6/3 = 40. Correct.

**Conjecture:** S(n) = n(n+1)(n+2)/3.

**Proof by induction:**
Base: S(1) = 2 = 1*2*3/3. True.
Step: Assume S(k) = k(k+1)(k+2)/3. Then:
S(k+1) = S(k) + (k+1)(k+2) = k(k+1)(k+2)/3 + (k+1)(k+2)
= (k+1)(k+2)[k/3 + 1] = (k+1)(k+2)(k+3)/3. Done.

### Problem 2: Degenerate Triangle to Verify Formula

**Problem:** In a triangle with sides a, b, c and area Delta, the circumradius R = abc/(4*Delta). Verify this makes sense when the triangle degenerates.

**Recognise:** Test extreme cases to build confidence in the formula and understand its behavior.

**Solution:**

**Case 1: Equilateral triangle** (a = b = c = s).
Area = (sqrt(3)/4)s^2.
R = s^3 / (4 * sqrt(3)/4 * s^2) = s^3 / (sqrt(3)*s^2) = s/sqrt(3).
Independent check: for equilateral triangle, R = s/sqrt(3). Correct!

**Case 2: Right triangle** (c = hypotenuse, angle C = pi/2).
Area = ab/2.
R = abc/(4*ab/2) = abc/(2ab) = c/2.
Independent check: circumradius of right triangle = hypotenuse/2. Correct!

**Case 3: Degenerate triangle** (area → 0, points collinear).
Delta → 0, so R → infinity.
Interpretation: collinear points lie on a "circle" of infinite radius (a line). Makes sense!

**Case 4: Very thin triangle** (a = 10, b = 10, c → 0).
As c → 0: Delta → 0 (triangle collapses), R → infinity. Consistent with Case 3.

### Problem 3: Combinatorics via Small Cases

**Problem:** How many ways can n people sit around a circular table? Find the formula.

**Recognise:** Try n = 1, 2, 3, 4 and look for the pattern.

**Solution:**

n = 1: 1 way (one person, one arrangement).
n = 2: 1 way (two people, rotations are the same).
n = 3: 2 ways (ABC, ACB — all rotations of ABC are the same, but ACB is different).
n = 4: 6 ways.

Pattern: 1, 1, 2, 6 = 0!, 1!, 2!, 3! = (n-1)!

**Formula:** (n-1)!

**Why:** Fix one person's seat (removing rotational symmetry). The remaining n-1 people can be arranged in (n-1)! ways.

### Problem 4: Ellipse Becoming Circle

**Problem:** The area of an ellipse with semi-axes a and b is pi*a*b. Verify this at extreme cases.

**Recognise:** Check degenerate and special cases to confirm the formula.

**Solution:**

**Case 1: Circle (a = b = r).**
Area = pi*r*r = pi*r^2. Correct!

**Case 2: Line segment (b → 0).**
Area = pi*a*0 = 0. Makes sense — a "flat" ellipse has no area.

**Case 3: Very eccentric (a >> b).**
Area = pi*a*b, which is less than pi*a^2 (the circle with radius a). Makes sense — the ellipse fits inside the circle.

**Case 4: Dimensional check.**
[a] = length, [b] = length, so [pi*a*b] = length^2 = area. Correct dimensions.

### Problem 5: Testing n = 0, 1 in a Sum Formula (MCQ Elimination)

**Problem:** The sum 1^3 + 2^3 + 3^3 + ... + n^3 equals:
(A) n(n+1)/2  (B) [n(n+1)/2]^2  (C) n^2(n+1)^2/2  (D) n(n+1)(2n+1)/6

**Recognise:** Just test n = 1 and n = 2.

**Solution:**

For n = 1: sum = 1.
(A) 1*2/2 = 1. OK.
(B) [1*2/2]^2 = 1. OK.
(C) 1*4/2 = 2. WRONG. Eliminate (C).
(D) 1*2*3/6 = 1. OK.

For n = 2: sum = 1 + 8 = 9.
(A) 2*3/2 = 3. WRONG. Eliminate (A).
(B) [2*3/2]^2 = 9. OK.
(D) 2*3*5/6 = 5. WRONG. Eliminate (D).

**Answer: (B).** Found without doing any algebra.

### Problem 6: Limit Behaviour via Extreme Parameter

**Problem:** For the function f(x) = (x^n - 1)/(x - 1) where x ≠ 1, what is f(1) defined as (by continuity)?

**Recognise:** Test small values of n to see the pattern.

**Solution:**

n = 1: f(x) = (x-1)/(x-1) = 1. So f(1) = 1.
n = 2: f(x) = (x^2-1)/(x-1) = x+1. So f(1) = 2.
n = 3: f(x) = (x^3-1)/(x-1) = x^2+x+1. So f(1) = 3.
n = 4: f(x) = x^3+x^2+x+1. So f(1) = 4.

Pattern: f(1) = n.

**Proof:** (x^n - 1)/(x-1) = 1 + x + x^2 + ... + x^(n-1). At x = 1: sum of n ones = n.

### Problem 7: Geometry — When Does a General Result Simplify?

**Problem:** In triangle ABC, the angle bisector from A meets BC at D. Given BD/DC = AB/AC (angle bisector theorem), verify for the special case of an isosceles triangle.

**Recognise:** When AB = AC, the bisector should also be the median and altitude. Check if the formula gives BD = DC.

**Solution:**

**Isosceles case (AB = AC):**
BD/DC = AB/AC = 1. So BD = DC, meaning D is the midpoint of BC.
This is correct: in an isosceles triangle, the angle bisector from the apex is also the median.

**Right triangle (angle A = 90, AB = 3, AC = 4, BC = 5):**
BD/DC = AB/AC = 3/4.
BD + DC = 5, so BD = 15/7, DC = 20/7.

Verify with coordinates: A = (0,0), B = (3,0), C = (0,4).
Angle bisector from A bisects the right angle (45 degrees): line y = x.
Meets BC (line x/3 + y/4 = 1, i.e., 4x + 3y = 12):
4x + 3x = 12 => x = 12/7. So D = (12/7, 12/7).

BD = sqrt((3-12/7)^2 + (0-12/7)^2) = sqrt((9/7)^2 + (12/7)^2) = sqrt(81+144)/7 = 15/7. Confirmed!

### Problem 8: Exploring Edge Cases in Inequality

**Problem:** Prove that for all positive integers n: (1 + 1/n)^n < 3.

**Recognise:** Check small cases, then see if the bound is tight.

**Solution:**

n = 1: (1 + 1)^1 = 2 < 3. OK.
n = 2: (3/2)^2 = 9/4 = 2.25 < 3. OK.
n = 3: (4/3)^3 = 64/27 ~ 2.37 < 3. OK.
n = 10: (1.1)^10 ~ 2.594 < 3. OK.
n = 100: ~ 2.705 < 3. OK.
n → infinity: e ~ 2.718 < 3. The bound is never tight!

The sequence is increasing (as shown in Lesson 08) and bounded by e < 3. Since e ~ 2.718, our bound of 3 has room to spare. The proof uses the binomial expansion and comparison with geometric series (see Lesson 08, Problem 7).

## Python Verification

```python
import numpy as np
from math import comb, factorial

# Problem 1: Sum k*(k+1) = n(n+1)(n+2)/3
print("Problem 1: Verifying S(n) = n(n+1)(n+2)/3")
for n in range(1, 8):
    actual = sum(k*(k+1) for k in range(1, n+1))
    formula = n*(n+1)*(n+2)//3
    print(f"  n={n}: sum={actual}, formula={formula}, match={actual==formula}")
print()

# Problem 3: Circular permutations = (n-1)!
print("Problem 3: Circular permutations")
# For n=4, list them: fix person 1, permute the rest
from itertools import permutations
n = 4
# Fix first person, count arrangements of the rest
count = factorial(n-1)
print(f"  n={n}: (n-1)! = {count}")
print()

# Problem 5: Verify sum of cubes = [n(n+1)/2]^2
print("Problem 5: Sum of cubes")
for n in range(1, 8):
    actual = sum(k**3 for k in range(1, n+1))
    formula = (n*(n+1)//2)**2
    print(f"  n={n}: sum={actual}, formula={formula}, match={actual==formula}")
print()

# Problem 6: (x^n - 1)/(x-1) at x=1
print("Problem 6: Limit as x->1 of (x^n-1)/(x-1)")
for n_val in range(1, 6):
    x = 1.0 + 1e-10  # very close to 1
    val = (x**n_val - 1) / (x - 1)
    print(f"  n={n_val}: limit = {val:.6f} (should be {n_val})")
print()

# Problem 8: (1 + 1/n)^n for various n
print("Problem 8: (1+1/n)^n < 3")
for n in [1, 2, 3, 5, 10, 50, 100, 1000, 10000]:
    val = (1 + 1/n)**n
    print(f"  n={n:>5}: (1+1/n)^n = {val:.6f} < 3? {val < 3}")
print(f"  limit = e = {np.e:.6f}")
```

## When This Strategy Fails

- **Pattern doesn't generalise:** Sometimes n = 1, 2, 3, 4 follow a pattern that breaks at n = 5. Always prove your conjecture (e.g., by induction). The classic trap: polynomials through n points don't determine the function.
- **Degenerate case is vacuously true:** If the extreme case makes the problem trivial (e.g., "for n = 0, the sum is empty so equals 0"), it doesn't help distinguish between candidate formulas.
- **All options pass small tests:** If you need n = 1, 2, 3, 4 to eliminate all wrong MCQ options but they all agree up to n = 3, you need to go further.
- **Non-generic degenerate:** Sometimes the special case has extra symmetry that makes a wrong formula accidentally correct there.

## Connection to CS / Games / AI / Business / Industry

"Try the smallest case first" and "stress the boundary" are not just exam
tricks — they are the most reliable debugging and validation strategies
in industry:

- **CS / Software.** **Boundary-value testing**, **fuzz testing**, and
  **property-based testing** (QuickCheck, Hypothesis) automate this.
  Most production bugs live at $n = 0$, $n = 1$, $n = \text{MAX}$, and
  empty-input cases — exactly the extremes you'd check by hand on a JEE
  problem. "Off-by-one" is the canonical extreme-case failure.
- **AI / ML.** **"Overfit on a single batch"** is the standard debugging
  technique for new training code: if you can't perfectly fit one batch,
  your loss/optimiser is broken. **Few-shot evaluation** and **toy
  datasets** (MNIST, CIFAR-10 subsets) catch architectural bugs an
  expensive ImageNet run would only reveal after hours of training.
- **Business / Product.** **Pilot studies**, **MVPs**, **beta
  cohorts** — running on a small slice before rolling out company-wide
  is the "small example" strategy. **Sensitivity analysis** in finance
  ("what if rates double? what if revenue halves?") is testing the
  extremes of every assumption.
- **Engineering.** **Stress testing at extremes** — cold soak, heat
  soak, max-load, vacuum chambers, accelerated-life testing — is how
  cars, satellites, and drugs get certified. **Edge-of-envelope flight
  testing** for aircraft is literally extreme-case verification.
- **Cryptography / Security.** Researchers attack systems by examining
  **degenerate inputs** (tiny keys, all-zero plaintexts, repeated
  nonces). Many real-world breaks (e.g. PlayStation 3 ECDSA, Debian
  OpenSSL 2008) came from extreme cases: a fixed nonce, a tiny entropy
  pool.

## Check Your Understanding

1. Find a formula for 1/(1*2) + 1/(2*3) + 1/(3*4) + ... + 1/(n*(n+1)) by computing the first 4 partial sums and conjecturing the pattern. Then prove it by telescoping.

2. The number of diagonals of a convex n-gon is given by a formula. Compute it for n = 3, 4, 5, 6 (getting 0, 2, 5, 9) and conjecture the formula. Prove it combinatorially.

3. For the function f(n) = floor(sqrt(n)) + floor(sqrt(n+1)) + ... + floor(sqrt(2n)), compute f(1), f(2), f(3), f(4) and describe the pattern you observe. Does a closed form exist?
