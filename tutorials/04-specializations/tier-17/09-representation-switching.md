# Representation Switching

## Intuition

Every mathematical object can be viewed from multiple angles. A circle is simultaneously an algebraic equation (x^2 + y^2 = r^2), a parametric curve (r*cos(t), r*sin(t)), a complex number locus (|z| = r), and a geometric shape. The same problem can be trivial in one representation and nightmarish in another.

The master strategist asks: "In which language does this problem become easy?"

## Prerequisites

- Foundation 4, Lesson 7 (Complex numbers — geometric interpretation)
- Foundation 4, Lesson 5 (Coordinate geometry)

## The Strategy

**Available representations:**

| Object | Algebraic | Geometric | Trigonometric | Complex |
|--------|-----------|-----------|---------------|---------|
| Point on circle | x^2+y^2=r^2 | radius r from origin | (r cos t, r sin t) | z = r*e^(it) |
| Rotation | matrix multiply | turn by angle | cos/sin formulas | multiply by e^(it) |
| Line | ax + by + c = 0 | directed segment | parametric with angle | Re(z*e^(-it)) = d |
| Conic | quadratic equation | focal properties | eccentric angle | - |

**When to switch:**

1. **To complex numbers when:** rotations, regular polygons, roots of unity, or "find the locus" problems appear.
2. **To trigonometric when:** expressions involve sums of squares equaling constants, or angle relationships.
3. **To geometric when:** algebraic manipulation is leading nowhere but the constraint has a clear shape.
4. **To algebraic when:** you need exact coordinates or the problem involves specific numerical conditions.

## Worked Problems

### Problem 1: Circle Problem via Complex Numbers

**Problem:** Points A, B, C lie on a unit circle. If A + B + C = 0 (as complex numbers), show that triangle ABC is equilateral.

**Recognise:** Sum of complex numbers on a circle being zero — this is a rotational symmetry condition best handled in complex representation.

**Solution:**

Let A = e^(i*alpha), B = e^(i*beta), C = e^(i*gamma) on the unit circle.

Given: A + B + C = 0, so C = -(A + B).

|C| = 1, so |A + B| = 1.

|A + B|^2 = (A + B)(conj(A) + conj(B)) = |A|^2 + |B|^2 + A*conj(B) + conj(A)*B
= 1 + 1 + 2*Re(A*conj(B)) = 2 + 2*cos(alpha - beta) = 1.

So cos(alpha - beta) = -1/2, meaning alpha - beta = +/- 2*pi/3.

Similarly, from A + B + C = 0:
|A + C|^2 = |B|^2 = 1, giving cos(alpha - gamma) = -1/2.

So all pairs of vertices are separated by 2*pi/3, making the triangle equilateral.

### Problem 2: Geometric Series via Trigonometric Representation

**Problem:** Find the sum: cos(a) + cos(a+d) + cos(a+2d) + ... + cos(a+(n-1)d).

**Recognise:** Sum of cosines in arithmetic progression — write as real part of complex geometric series.

**Solution:**

Let S = sum from k=0 to n-1 of cos(a + kd).

This is Re[sum from k=0 to n-1 of e^(i(a+kd))] = Re[e^(ia) * sum from k=0 to n-1 of e^(ikd)].

The geometric sum: sum from k=0 to n-1 of e^(ikd) = (e^(ind) - 1)/(e^(id) - 1).

Multiply numerator and denominator by e^(-id/2):
= (e^(i(n-1/2)d) - e^(-id/2)) / (e^(id/2) - e^(-id/2))
= e^(i(n-1)d/2) * (e^(ind/2) - e^(-ind/2)) / (e^(id/2) - e^(-id/2))

Hmm, let's be cleaner:
(e^(ind) - 1)/(e^(id) - 1) = e^(i(n-1)d/2) * sin(nd/2) / sin(d/2)

So S = Re[e^(ia) * e^(i(n-1)d/2) * sin(nd/2)/sin(d/2)]
= Re[e^(i(a + (n-1)d/2))] * sin(nd/2)/sin(d/2)
= cos(a + (n-1)d/2) * sin(nd/2) / sin(d/2)

### Problem 3: Algebraic Inequality via Geometric Interpretation

**Problem:** For real numbers x, y with x^2 + y^2 = 1, find the maximum value of 3x + 4y.

**Recognise:** x^2 + y^2 = 1 is the unit circle. 3x + 4y = c is a family of lines. Maximum occurs at tangency — a geometric optimisation problem.

**Solution:**

**Geometric view:** We want the line 3x + 4y = c to be tangent to the unit circle x^2 + y^2 = 1.

Distance from origin to line 3x + 4y = c is |c|/sqrt(9+16) = |c|/5.

For tangency: |c|/5 = 1, so c = +/- 5.

Maximum value = 5.

**Alternative (trig substitution):** Set x = cos(t), y = sin(t).
3x + 4y = 3cos(t) + 4sin(t) = 5*sin(t + phi) where tan(phi) = 3/4.
Maximum = 5.

### Problem 4: Locus via Complex Numbers

**Problem:** If z moves on the circle |z - 1| = 1, find the locus of w = z^2.

**Recognise:** Transforming a circle under a complex map — stay in complex number representation.

**Solution:**

|z - 1| = 1 means z lies on a circle of radius 1 centred at 1.

Parametrise: z = 1 + e^(it) = 1 + cos(t) + i*sin(t), where t in [0, 2*pi).

w = z^2 = (1 + e^(it))^2 = 1 + 2e^(it) + e^(2it)

Let's compute: z = 1 + cos(t) + i*sin(t) = 2cos^2(t/2) + 2i*sin(t/2)cos(t/2) = 2cos(t/2)*e^(it/2).

So w = z^2 = 4cos^2(t/2) * e^(it).

|w| = 4cos^2(t/2) = 2(1 + cos(t)).

In polar form w = r*e^(itheta) with theta = t:
r = 2(1 + cos(theta)).

This is a **cardioid** r = 2(1 + cos(theta)).

### Problem 5: Trigonometric to Algebraic for Equation Solving

**Problem:** Solve: sin(x) + sin(2x) + sin(3x) = 0.

**Recognise:** Sum of sines in AP — use the sum-to-product formula, which converts trig to factorable algebraic form.

**Solution:**

Group: [sin(x) + sin(3x)] + sin(2x) = 0.

sin(x) + sin(3x) = 2*sin(2x)*cos(x) [sum-to-product].

So: 2*sin(2x)*cos(x) + sin(2x) = 0
sin(2x) * [2cos(x) + 1] = 0

Case 1: sin(2x) = 0 => 2x = n*pi => x = n*pi/2.
Case 2: 2cos(x) + 1 = 0 => cos(x) = -1/2 => x = 2*pi/3 + 2n*pi or x = 4*pi/3 + 2n*pi.

Combining: x = n*pi/2 or x = +/- 2*pi/3 + 2n*pi.

### Problem 6: Coordinate Geometry ↔ Vector Approach

**Problem:** In triangle with vertices A(1,2), B(4,6), C(7,2), find the orthocentre.

**Recognise:** Orthocentre requires perpendicularity conditions. We can use either:
- Slopes and perpendicular lines (algebraic)
- Dot product = 0 (vector)

**Solution (vector approach):**

Let H = (x, y) be the orthocentre.

AH perpendicular to BC: vector AH = (x-1, y-2), vector BC = (3, -4).
Dot product: 3(x-1) + (-4)(y-2) = 0 => 3x - 4y + 5 = 0 ... (1)

BH perpendicular to AC: vector BH = (x-4, y-6), vector AC = (6, 0).
Dot product: 6(x-4) + 0(y-6) = 0 => x = 4 ... (2)

From (1): 12 - 4y + 5 = 0 => 4y = 17 => y = 17/4.

Orthocentre = (4, 17/4).

### Problem 7: Complex Numbers for Rotation Problems

**Problem:** Triangle ABC has A = (0, 0), B = (4, 0). Point C is obtained by rotating B around A by 60 degrees counterclockwise. Find C.

**Recognise:** Rotation by angle theta about origin = multiplication by e^(i*theta) in complex plane.

**Solution:**

In complex plane: A = 0, B = 4.

C = B * e^(i*pi/3) = 4*(cos 60 + i sin 60) = 4*(1/2 + i*sqrt(3)/2) = 2 + 2i*sqrt(3).

So C = (2, 2*sqrt(3)).

### Problem 8: Algebraic Identity via Roots of Unity

**Problem:** Prove that 1 + x + x^2 + ... + x^(n-1) = (x^n - 1)/(x - 1) and hence factorise x^3 - 1.

**Recognise:** The n-th roots of unity provide geometric insight into polynomial factorisation.

**Solution:**

The roots of x^n - 1 = 0 are the n-th roots of unity: w_k = e^(2*pi*i*k/n) for k = 0, 1, ..., n-1.

So x^n - 1 = (x - 1)(x - w)(x - w^2)...(x - w^(n-1)) where w = e^(2*pi*i/n).

For n = 3: w = e^(2*pi*i/3) = -1/2 + i*sqrt(3)/2.
x^3 - 1 = (x - 1)(x - w)(x - w^2).

Now (x - w)(x - w^2) = x^2 - (w + w^2)x + w^3 = x^2 + x + 1 [since w + w^2 = -1 and w^3 = 1].

Therefore: x^3 - 1 = (x - 1)(x^2 + x + 1).

## Python Verification

```python
import numpy as np

# Problem 1: Verify equilateral triangle
# If A + B + C = 0 on unit circle, check side lengths are equal
A = np.exp(1j * 0)
B = np.exp(1j * 2*np.pi/3)
C = np.exp(1j * 4*np.pi/3)
print(f"Problem 1: A + B + C = {A + B + C:.6f}")
print(f"|AB| = {abs(B-A):.4f}, |BC| = {abs(C-B):.4f}, |CA| = {abs(A-C):.4f}")
print()

# Problem 2: Sum of cosines in AP
a, d, n = 1.0, 0.3, 10
numerical = sum(np.cos(a + k*d) for k in range(n))
formula = np.cos(a + (n-1)*d/2) * np.sin(n*d/2) / np.sin(d/2)
print(f"Problem 2: numerical sum = {numerical:.6f}, formula = {formula:.6f}")
print()

# Problem 3: max of 3x + 4y on unit circle
theta = np.linspace(0, 2*np.pi, 10000)
values = 3*np.cos(theta) + 4*np.sin(theta)
print(f"Problem 3: max(3x+4y) on unit circle = {max(values):.4f}, exact = 5")
print()

# Problem 4: Cardioid verification
t = np.linspace(0.01, 2*np.pi - 0.01, 1000)
z = 1 + np.exp(1j * t)
w = z**2
r_computed = np.abs(w)
r_formula = 2 * (1 + np.cos(t))
print(f"Problem 4: max |w-formula| = {max(abs(r_computed - r_formula)):.10f} (should be ~0)")
print()

# Problem 6: Orthocentre verification
A = np.array([1, 2])
B = np.array([4, 6])
C = np.array([7, 2])
H = np.array([4, 17/4])
# Check AH perp BC and BH perp AC
AH = H - A
BC = C - B
BH = H - B
AC = C - A
print(f"Problem 6: AH . BC = {np.dot(AH, BC):.4f}, BH . AC = {np.dot(BH, AC):.4f} (both should be 0)")
print()

# Problem 7: Rotation
B = 4 + 0j
C = B * np.exp(1j * np.pi/3)
print(f"Problem 7: C = ({C.real:.4f}, {C.imag:.4f}), exact = (2, {2*np.sqrt(3):.4f})")
```

## When This Strategy Fails

- **Computation explosion:** Complex number arithmetic can get messy if the problem doesn't have rotational structure. Don't force it.
- **Loss of information:** Converting to polar loses sign information. Converting to parametric may hide constraints.
- **Wrong representation for the question:** If the problem asks for a Cartesian equation, solving in polar is extra work (you must convert back).
- **Over-abstraction:** Sometimes the algebraic approach is straightforward and switching representations adds unnecessary complexity.

## Check Your Understanding

1. Points A, B, C, D form a square with centre at the origin and A = 1 + i (in complex plane). Find B, C, D. [Hint: successive 90-degree rotations.]

2. Find the maximum value of x^3 + y^3 subject to x + y = 2, using a trigonometric substitution x = 1 + cos(t), y = 1 - cos(t) (since x + y = 2 automatically).

3. The locus of z such that |z - 3i| = 3|z - 1| is a circle. Find its centre and radius by converting to Cartesian form x^2 + y^2 terms.
