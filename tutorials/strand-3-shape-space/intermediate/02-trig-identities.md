---
strand: shape-space
level: intermediate
order: 2
title: Trig Identities and the Laws of Sines and Cosines
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 01-unit-circle-and-radians
    description: Unit circle
connections:
  - strand-3-shape-space-intermediate/03-vectors
applications:
  - cs: "Wave-form combination, signal processing"
  - business: "Surveying with non-right triangles"
  - games: "Triangle-based mesh calculations"
  - life: "Engineering trigonometric problems"
---

# Trig Identities and the Laws of Sines and Cosines

## Explain Like I Am 7

You know how "two halves" and "one whole" are different ways to write
the same thing?  Trig **identities** are like that — different
costumes for the same number.  For instance, the wiggly sine and
cosine are best friends: square them, add them, and you always get
1, no matter what angle you started with.  Once you collect a few
of these magic equal-signs, big scary trig expressions can be
swapped for tiny tidy ones, the way you swap stickers with a friend.

## Mental

Beyond the Pythagorean identity, several **trig identities** turn
sums of trigonometric expressions into products and vice versa.
Memorise the headline ones; the others can be derived.

**Sum/difference formulas**:

$$
\sin(A \pm B) = \sin A \cos B \pm \cos A \sin B,
$$

$$
\cos(A \pm B) = \cos A \cos B \mp \sin A \sin B.
$$

**Double-angle formulas** (special cases):

$$
\sin(2A) = 2 \sin A \cos A, \quad \cos(2A) = \cos^2 A - \sin^2 A = 2\cos^2 A - 1 = 1 - 2\sin^2 A.
$$

For triangles **not** right-angled, two laws extend the toolkit.

## Law of sines

For any triangle with sides $a, b, c$ opposite angles $A, B, C$:

$$
\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R,
$$

where $R$ is the circumscribed circle's radius. Useful when you know
two angles and one side (or two sides and a non-included angle —
though SSA is the **ambiguous case** from Strand 3 Foundation Lesson
04).

## Law of cosines

For any triangle:

$$
c^2 = a^2 + b^2 - 2ab \cos C.
$$

This is the **generalised Pythagoras**. When $C = 90°$, $\cos C = 0$
and the formula reduces to Pythagoras. Useful when you know SAS
(two sides + included angle) or SSS (all three sides — solve for an
angle).

## Interactive

:::widget type=numeric-input prompt="$\\sin(60°)$ — exact form $\\sqrt{3}/2$. Decimal? Round 4 dp." answer=0.8660 tolerance=0.001 explain="$\\approx 0.8660$.":::

:::widget type=numeric-input prompt="Use $\\sin(2A) = 2 \\sin A \\cos A$ at $A = 30°$: $\\sin(60°) = 2 \\sin(30°) \\cos(30°) = 2 \\cdot 0.5 \\cdot 0.866 = ?$" answer=0.866 tolerance=0.005 explain="$0.866$ — matches.":::

:::widget type=numeric-input prompt="A triangle has angles $30°, 75°, 75°$ and side opposite $30°$ is $5$. What's the side opposite a $75°$ angle? (Use law of sines.) Round 3 dp." answer=9.659 tolerance=0.005 explain="$\\frac{5}{\\sin 30°} = \\frac{x}{\\sin 75°}$. $x = 5 \\cdot \\sin 75° / 0.5 = 10 \\sin 75° \\approx 9.659$.":::

:::widget type=numeric-input prompt="A triangle: sides $5, 7$, included angle $60°$. Third side via law of cosines: $\\sqrt{25 + 49 - 2 \\cdot 5 \\cdot 7 \\cdot 0.5} = \\sqrt{?}$" answer=39 explain="$25 + 49 - 35 = 39$. So third side is $\\sqrt{39} \\approx 6.245$.":::

## Symbolic

**Identities** (selected):

$$
\sin^2\theta + \cos^2\theta = 1, \quad 1 + \tan^2\theta = \sec^2\theta, \quad 1 + \cot^2\theta = \csc^2\theta.
$$

$$
\sin(A + B) = \sin A \cos B + \cos A \sin B.
$$

$$
\cos(A - B) = \cos A \cos B + \sin A \sin B.
$$

$$
\tan(A + B) = \frac{\tan A + \tan B}{1 - \tan A \tan B}.
$$

**Half-angle**:

$$
\sin^2(\theta/2) = \frac{1 - \cos\theta}{2}, \quad \cos^2(\theta/2) = \frac{1 + \cos\theta}{2}.
$$

These derive from the double-angle formula.

## Computational

```python
import math

# Verify sin(A + B)
A, B = 30, 45
A_r, B_r = math.radians(A), math.radians(B)
print(math.sin(A_r + B_r))                                 # 0.9659
print(math.sin(A_r) * math.cos(B_r) + math.cos(A_r) * math.sin(B_r))  # 0.9659 ✓

# Law of cosines
def law_of_cosines(a, b, C_deg):
    return (a**2 + b**2 - 2*a*b * math.cos(math.radians(C_deg))) ** 0.5

print(law_of_cosines(5, 7, 60))   # 6.245
```

## Applied

- **Surveying**: when you can't measure a distance directly, you
  measure two angles + one side and apply law of sines.
- **Wave addition**: in signal processing, $A \sin(\omega t) + B
  \cos(\omega t) = R \sin(\omega t + \phi)$ — a single sinusoid
  with phase shift.
- **GPS triangulation**: distances/angles to satellites + law of
  cosines.
- **Board Exam / JEE (CBSE Class 11, Chapter 3 — Trigonometric
  Functions)** — the Class 11 master identity
  $\cos(x - y) = \cos x \cos y + \sin x \sin y$ generates every
  compound, double, triple, half, and sum-to-product formula in the
  chapter. NCERT Ex 3.3 derives them all; JEE Mains repeatedly
  asks (i) prove an identity by reducing to a compound-angle form;
  (ii) general solutions: $\sin x = \sin y \Rightarrow
  x = n\pi + (-1)^n y$, $\cos x = \cos y \Rightarrow
  x = 2n\pi \pm y$, $\tan x = \tan y \Rightarrow x = n\pi + y$;
  (iii) the R-formula $a\sin\theta + b\cos\theta = R\sin(\theta +
  \alpha)$ with $R = \sqrt{a^2 + b^2}$ for finding extrema.
  Pitfall: $\sin(A + B) \neq \sin A + \sin B$.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\sin(45° + 45°) = \\sin(90°) = ?$" answer=1 explain="Direct.":::

:::widget type=numeric-input prompt="$\\cos(2 \\cdot 45°) = \\cos^2 45° - \\sin^2 45° = 0.5 - 0.5 = ?$" answer=0 explain="$0$. Equals $\\cos 90°$ ✓.":::

:::widget type=numeric-input prompt="Triangle: sides $3, 4, 5$. Largest angle (opposite $5$): use law of cosines. $25 = 9 + 16 - 24 \\cos C$, so $\\cos C = ?$" answer=0 explain="$25 = 25 - 24 \\cos C$, so $\\cos C = 0$, $C = 90°$. Right triangle.":::

:::widget type=numeric-input prompt="$\\sin(75°) = \\sin(45° + 30°) = ?$ Round 4 dp." answer=0.9659 tolerance=0.001 explain="$\\sin 45 \\cos 30 + \\cos 45 \\sin 30 \\approx 0.6124 + 0.3536 = 0.9659$.":::
