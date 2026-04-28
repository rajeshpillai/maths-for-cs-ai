# Inequalities for Competition Mathematics

## Intuition

Inequalities are the art of bounding — proving that one quantity is always at least (or at
most) another. While equations have exact solutions, inequalities tell us about the *range*
of possibilities. In optimisation (the heart of machine learning), every gradient descent step
implicitly uses inequalities: the loss is bounded below, and each step provably decreases it.
In competition mathematics, inequalities are powerful shortcuts that let you prove
minima/maxima without calculus.

## Prerequisites

- Foundation 1, Lesson 4 (Algebraic manipulation, factoring)
- Tier 2, Lesson 17 (Norms and inner products — for Cauchy-Schwarz context)
- Basic calculus (for comparison, not required for the inequality proofs themselves)

## From First Principles

### AM-GM Inequality — Derivation

**Statement:** For non-negative reals $a_1, a_2, \ldots, a_n$:

$$\frac{a_1 + a_2 + \cdots + a_n}{n} \geq \sqrt[n]{a_1 a_2 \cdots a_n}$$

with equality if and only if $a_1 = a_2 = \cdots = a_n$.

**Proof for $n = 2$ (from scratch):**

**Step 1.** Start from an obvious truth: for any reals $a, b \geq 0$,

$$(\sqrt{a} - \sqrt{b})^2 \geq 0$$

**Step 2.** Expand:

$$a - 2\sqrt{ab} + b \geq 0$$

**Step 3.** Rearrange:

$$\frac{a + b}{2} \geq \sqrt{ab}$$

**Step 4.** Equality holds when $\sqrt{a} = \sqrt{b}$, i.e., $a = b$. $\square$

**Extension to $n$ variables:** Use Cauchy's forward-backward induction. First prove for
$n = 2^k$ by repeated application of the two-variable case, then extend to arbitrary $n$
by padding with the arithmetic mean.

### Cauchy-Schwarz Inequality (Sum Form)

**Statement:** For real numbers $a_1, \ldots, a_n$ and $b_1, \ldots, b_n$:

$$\left(\sum_{i=1}^n a_i b_i\right)^2 \leq \left(\sum_{i=1}^n a_i^2\right)\left(\sum_{i=1}^n b_i^2\right)$$

**Proof:**

**Step 1.** Consider $f(t) = \sum_{i=1}^n (a_i t - b_i)^2 \geq 0$ for all real $t$.

**Step 2.** Expand: $f(t) = \left(\sum a_i^2\right)t^2 - 2\left(\sum a_i b_i\right)t + \sum b_i^2 \geq 0$

**Step 3.** This is a non-negative quadratic in $t$, so its discriminant $\leq 0$:

$$4\left(\sum a_i b_i\right)^2 - 4\left(\sum a_i^2\right)\left(\sum b_i^2\right) \leq 0$$

$$\boxed{\left(\sum a_i b_i\right)^2 \leq \left(\sum a_i^2\right)\left(\sum b_i^2\right)}$$

### Titu's Lemma (Engel / Cauchy-Schwarz in "Engel Form")

A direct consequence of Cauchy-Schwarz:

$$\frac{a_1^2}{b_1} + \frac{a_2^2}{b_2} + \cdots + \frac{a_n^2}{b_n} \geq \frac{(a_1 + a_2 + \cdots + a_n)^2}{b_1 + b_2 + \cdots + b_n}$$

### Power Mean Inequality

For positive reals $a_1, \ldots, a_n$, define the power mean of order $r$:

$$M_r = \left(\frac{a_1^r + a_2^r + \cdots + a_n^r}{n}\right)^{1/r}$$

Special cases: $M_2$ = QM (quadratic mean), $M_1$ = AM, $M_0$ = GM (limit), $M_{-1}$ = HM.

$$\boxed{M_2 \geq M_1 \geq M_0 \geq M_{-1}} \quad \text{i.e.,} \quad QM \geq AM \geq GM \geq HM$$

### Jensen's Inequality

If $f$ is convex on $[a, b]$ and $\lambda_1 + \cdots + \lambda_n = 1$ with $\lambda_i \geq 0$:

$$f(\lambda_1 x_1 + \cdots + \lambda_n x_n) \leq \lambda_1 f(x_1) + \cdots + \lambda_n f(x_n)$$

For equal weights: $f\left(\frac{\sum x_i}{n}\right) \leq \frac{\sum f(x_i)}{n}$

**Intuition:** A convex function "bows downward," so the function value at the average is
less than the average of the function values.

**Note:** The inequality reverses for concave functions.

### Schur's Inequality (Brief)

For non-negative reals $a, b, c$ and $t \geq 0$:

$$a^t(a-b)(a-c) + b^t(b-a)(b-c) + c^t(c-a)(c-b) \geq 0$$

For $t = 1$ this gives: $a^3 + b^3 + c^3 + abc \geq ab(a+b) + bc(b+c) + ca(c+a)$.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(13, 5.5))

# --- AM-GM geometric interpretation ---
ax = axes[0]
a, b = 2, 8
am = (a + b) / 2
gm = np.sqrt(a * b)
# Semicircle with diameter a+b
theta = np.linspace(0, np.pi, 200)
r = (a + b) / 2
cx = r
ax.plot(cx + r * np.cos(theta), r * np.sin(theta), 'b-', linewidth=2)
ax.plot([0, a + b], [0, 0], 'k-', linewidth=2)
# AM is the radius
ax.plot([cx, cx], [0, r], 'r-', linewidth=2, label=f'AM = {am:.2f}')
ax.plot(cx, r, 'ro', markersize=6)
# GM is the altitude from the point where a and b meet
ax.plot([a, a], [0, gm], 'g-', linewidth=2, label=f'GM = {gm:.2f}')
ax.plot(a, gm, 'go', markersize=6)
# Mark a and b
ax.annotate('a=2', (1, -0.5), fontsize=12, ha='center')
ax.annotate('b=8', (6, -0.5), fontsize=12, ha='center')
ax.plot(a, 0, 'k|', markersize=10)
ax.set_xlim(-0.5, 11)
ax.set_ylim(-1.5, 6.5)
ax.set_aspect('equal')
ax.set_title('AM-GM: AM is always above GM', fontsize=13)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

# --- Jensen's inequality for f(x) = x^2 ---
ax = axes[1]
x = np.linspace(-1, 4, 300)
f = x**2
ax.plot(x, f, 'b-', linewidth=2, label='$f(x) = x^2$ (convex)')
# Points
x1, x2 = 0.5, 3.5
y1, y2 = x1**2, x2**2
xm = (x1 + x2) / 2
ax.plot([x1, x2], [y1, y2], 'r-', linewidth=2, alpha=0.7)
ax.plot(x1, y1, 'ro', markersize=8)
ax.plot(x2, y2, 'ro', markersize=8)
# Midpoint on chord vs midpoint on curve
ax.plot(xm, (y1 + y2)/2, 'r^', markersize=10, label=f'Avg of f = {(y1+y2)/2:.2f}')
ax.plot(xm, xm**2, 'g^', markersize=10, label=f'f(avg) = {xm**2:.2f}')
ax.annotate('f(avg) <= avg of f', (xm + 0.1, (xm**2 + (y1+y2)/2)/2), fontsize=11)
ax.set_title("Jensen's Inequality", fontsize=13)
ax.legend(fontsize=11)
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('inequalities.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# --- AM-GM verification ---
print("AM-GM inequality verification:")
for vals in [(2, 8), (1, 4, 9), (3, 3, 3), (1, 2, 3, 4, 5)]:
    arr = np.array(vals, dtype=float)
    am = np.mean(arr)
    gm = np.prod(arr) ** (1 / len(arr))
    print(f"  {vals}: AM = {am:.4f}, GM = {gm:.4f}, AM >= GM: {am >= gm - 1e-10}")

# --- Cauchy-Schwarz verification ---
print("\nCauchy-Schwarz verification:")
a = np.array([1, 2, 3], dtype=float)
b = np.array([4, 5, 6], dtype=float)
lhs = np.dot(a, b) ** 2
rhs = np.dot(a, a) * np.dot(b, b)
print(f"  a = {a}, b = {b}")
print(f"  (sum a_i*b_i)^2 = {lhs}")
print(f"  (sum a_i^2)(sum b_i^2) = {rhs}")
print(f"  LHS <= RHS: {lhs <= rhs + 1e-10}")

# --- Power mean inequality ---
print("\nPower mean inequality for (2, 3, 5):")
vals = np.array([2, 3, 5], dtype=float)
n = len(vals)
QM = np.sqrt(np.mean(vals**2))
AM = np.mean(vals)
GM = np.prod(vals) ** (1/n)
HM = n / np.sum(1 / vals)
print(f"  QM = {QM:.4f}")
print(f"  AM = {AM:.4f}")
print(f"  GM = {GM:.4f}")
print(f"  HM = {HM:.4f}")
print(f"  QM >= AM >= GM >= HM: {QM >= AM - 1e-10 and AM >= GM - 1e-10 and GM >= HM - 1e-10}")

# --- Titu's Lemma (Engel form) ---
print("\nTitu's Lemma: sum(a_i^2/b_i) >= (sum a_i)^2 / sum(b_i)")
a_vals = np.array([1, 2, 3], dtype=float)
b_vals = np.array([3, 4, 5], dtype=float)
lhs = np.sum(a_vals**2 / b_vals)
rhs = np.sum(a_vals)**2 / np.sum(b_vals)
print(f"  LHS = {lhs:.4f}, RHS = {rhs:.4f}, LHS >= RHS: {lhs >= rhs - 1e-10}")

# --- Application: minimize x + 1/x for x > 0 using AM-GM ---
print("\nApplication: minimum of x + 1/x for x > 0")
print("  By AM-GM: x + 1/x >= 2*sqrt(x * 1/x) = 2")
print("  Equality when x = 1/x, i.e., x = 1")
x_test = np.linspace(0.1, 5, 1000)
y_test = x_test + 1/x_test
print(f"  Numerical minimum: {np.min(y_test):.6f} at x = {x_test[np.argmin(y_test)]:.4f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Machine learning:** AM-GM and Jensen's inequality underpin key ML results: Jensen's
  proves that log-likelihood is concave (justifying MLE), and the KL divergence is
  non-negative (Gibbs' inequality is Jensen applied to the log function).
- **Optimisation:** Cauchy-Schwarz gives bounds on gradient magnitudes and learning rates.
  The power mean inequality appears in regularisation theory (Lp norms).
- **Algorithm analysis:** AM-GM proves that the geometric mean of operation costs in
  amortised analysis is bounded by the arithmetic mean.
- **Game dev:** Bounding expressions without calculus is useful for real-time constraint
  satisfaction in physics engines.

## Check Your Understanding

1. **By hand:** Prove that for positive reals $a, b, c$ with $abc = 1$:
   $a + b + c \geq 3$. (Use AM-GM directly.)

2. **Cauchy-Schwarz:** Prove that $(a^2 + b^2)(c^2 + d^2) \geq (ac + bd)^2$.

3. **Power mean:** For positive reals $a, b$, prove $\frac{a^2 + b^2}{2} \geq \left(\frac{a+b}{2}\right)^2$ (QM >= AM in squared form).

4. **Jensen:** If $A + B + C = \pi$ (angles of a triangle), prove that
   $\sin A + \sin B + \sin C \leq \frac{3\sqrt{3}}{2}$. (Use Jensen on the concave function
   $\sin$ over $(0, \pi)$.)

5. **Coding:** Write a function that, given $n$ positive reals, computes and displays
   QM, AM, GM, HM and verifies the chain of inequalities.

## JEE Challenge

**Problem 1.** If $a, b, c > 0$ and $a + b + c = 1$, find the minimum value of:
$$\frac{1}{a} + \frac{1}{b} + \frac{1}{c}$$
Use AM-HM inequality. Then find the minimum of $\frac{1}{a} + \frac{4}{b} + \frac{9}{c}$
subject to the same constraint using Titu's lemma.

**Problem 2.** Using Cauchy-Schwarz, prove that for positive reals $a, b, c$:
$$\frac{a}{b+c} + \frac{b}{a+c} + \frac{c}{a+b} \geq \frac{3}{2}$$
*Hint:* Write each fraction as $\frac{a^2}{a(b+c)}$ and apply Titu's lemma.

**Problem 3.** Let $x, y, z > 0$ with $xyz = 1$. Prove:
$$x^2 + y^2 + z^2 \geq x + y + z$$
*Hint:* By AM-GM, $x^2 + 1 \geq 2x$. Sum three such inequalities and use $x + y + z \geq 3$
(from AM-GM on $xyz = 1$) to handle the extra 3 on the left.
