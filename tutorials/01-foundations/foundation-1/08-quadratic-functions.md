# Quadratic Functions — Forms, Graphs, and the Quadratic Formula

## Intuition

A quadratic function describes any quantity that grows (or shrinks) with the
**square** of the input.  The path of a thrown ball, the area of a square as its
side length changes, the time complexity of a nested loop — all parabolas.
Understanding the three forms of a quadratic lets you read off roots, vertex,
and shape at a glance.

## Prerequisites

- Foundation 1, Lesson 7: Linear Functions and Equations
- Foundation 1, Lesson 2: Algebraic Manipulation (completing the square)

## From First Principles

### The three forms

Every quadratic can be written three ways:

| Form | Expression | What it reveals |
|------|-----------|-----------------|
| **Standard** | $f(x) = ax^2 + bx + c$ | $y$-intercept is $c$ |
| **Vertex** | $f(x) = a(x - h)^2 + k$ | Vertex at $(h, k)$ |
| **Factored** | $f(x) = a(x - r_1)(x - r_2)$ | Roots $r_1, r_2$ |

The sign of $a$ controls direction: $a > 0$ opens upward, $a < 0$ opens downward.

### Pen & paper: Converting between forms

**Standard to vertex** (complete the square):

$f(x) = 2x^2 - 12x + 22$

$= 2(x^2 - 6x) + 22$

$= 2((x - 3)^2 - 9) + 22$

$= 2(x - 3)^2 - 18 + 22$

$= 2(x - 3)^2 + 4$

Vertex: $(3, 4)$.  Axis of symmetry: $x = 3$.

**Standard to factored** (find roots):

$x^2 - 5x + 6 = 0$: find two numbers multiplying to 6, adding to $-5$: $-2, -3$.

$= (x - 2)(x - 3)$

Roots: $x = 2$ and $x = 3$.

### The discriminant

For $ax^2 + bx + c = 0$, define $\Delta = b^2 - 4ac$.

- $\Delta > 0$: two distinct real roots
- $\Delta = 0$: one repeated root (parabola touches the $x$-axis)
- $\Delta < 0$: no real roots (parabola floats above or below the axis)

**Pen & paper:** $3x^2 + 2x + 5$: $\Delta = 4 - 60 = -56 < 0$ — no real roots.

### Deriving the quadratic formula from completing the square

Start with the general equation $ax^2 + bx + c = 0$ where $a \neq 0$.

**Step 1:** Divide both sides by $a$:

$$x^2 + \frac{b}{a}x + \frac{c}{a} = 0$$

**Step 2:** Move the constant term to the right:

$$x^2 + \frac{b}{a}x = -\frac{c}{a}$$

**Step 3:** Complete the square.  Half of $\frac{b}{a}$ is $\frac{b}{2a}$.  Square it: $\frac{b^2}{4a^2}$.  Add to both sides:

$$x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} = -\frac{c}{a} + \frac{b^2}{4a^2}$$

**Step 4:** Left side is a perfect square:

$$\left(x + \frac{b}{2a}\right)^2 = \frac{b^2 - 4ac}{4a^2}$$

**Step 5:** Take the square root of both sides:

$$x + \frac{b}{2a} = \pm \frac{\sqrt{b^2 - 4ac}}{2a}$$

**Step 6:** Isolate $x$:

$$\boxed{x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}}$$

### Pen & paper: Apply the formula

Solve $2x^2 + 3x - 5 = 0$: $a=2, b=3, c=-5$.

$\Delta = 9 + 40 = 49$, $\sqrt{49} = 7$.

$x = \frac{-3 \pm 7}{4}$: $x = 1$ or $x = -\frac{10}{4} = -2.5$.

### Visualisation

```python
# ── Parabola: vertex, roots, axis of symmetry ─────────────
import numpy as np
import matplotlib.pyplot as plt

a, b, c = 1, -4, 3  # x² - 4x + 3

x = np.linspace(-1, 5, 300)
y = a*x**2 + b*x + c

# Vertex from formula: h = -b/(2a), k = f(h)
h = -b / (2*a)
k = a*h**2 + b*h + c

# Roots via quadratic formula
disc = b**2 - 4*a*c
r1 = (-b + np.sqrt(disc)) / (2*a)
r2 = (-b - np.sqrt(disc)) / (2*a)

fig, ax = plt.subplots(figsize=(7, 5))
ax.plot(x, y, 'b-', linewidth=2, label=f'$x^2 - 4x + 3$')
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(h, color='gray', linestyle='--', label=f'Axis of symmetry $x={h}$')
ax.plot([r1, r2], [0, 0], 'ro', markersize=8, label=f'Roots: $x={r1:.0f}, {r2:.0f}$')
ax.plot(h, k, 'g^', markersize=10, label=f'Vertex $({h:.0f}, {k:.0f})$')
ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title('Anatomy of a Parabola')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('quadratic_parabola.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Quadratic Functions ────────────────────────────────────
import math

# Completing the square: 2x² - 12x + 22 → 2(x-3)² + 4
print("=== Completing the square ===")
for x in range(-2, 8):
    lhs = 2*x**2 - 12*x + 22
    rhs = 2*(x - 3)**2 + 4
    assert lhs == rhs
print("2x² - 12x + 22 = 2(x-3)² + 4 ✓  Vertex: (3, 4)")

# Discriminant examples
print("\n=== Discriminant ===")
cases = [(1, -5, 6, "two roots"), (1, -6, 9, "one root"), (3, 2, 5, "no real roots")]
for a, b, c, expected in cases:
    disc = b**2 - 4*a*c
    print(f"  {a}x² + {b}x + {c}: Δ = {disc} → {expected}")

# Quadratic formula: 2x² + 3x - 5 = 0
print("\n=== Quadratic formula ===")
a, b, c = 2, 3, -5
disc = b**2 - 4*a*c
x1 = (-b + math.sqrt(disc)) / (2*a)
x2 = (-b - math.sqrt(disc)) / (2*a)
print(f"2x² + 3x - 5 = 0: x = {x1} or x = {x2}")
print(f"Check x=1: 2(1) + 3(1) - 5 = {2+3-5}")
print(f"Check x=-2.5: 2(6.25) + 3(-2.5) - 5 = {2*6.25 + 3*(-2.5) - 5}")

# Vertex from standard form
print("\n=== Vertex formula ===")
a, b, c = 1, -4, 3
h = -b / (2*a)
k = a*h**2 + b*h + c
print(f"x² - 4x + 3: vertex = ({h}, {k})")
```

## Connection to CS / Games / AI / Business / Industry

- **Projectile motion** — game physics uses $y = y_0 + v_0 t - \frac{1}{2}g t^2$ (a quadratic in $t$)
- **Ray-sphere intersection** — substitute ray equation into sphere equation, get a quadratic; discriminant tells you hit/miss/tangent
- **Loss functions** — mean squared error is quadratic in weights for linear models; the minimum is found analytically via the vertex
- **Big-O** — $O(n^2)$ algorithms have quadratic growth; comparing $n^2$ vs $n \log n$ is a daily CS task

## Check Your Understanding

1. **Pen & paper:** Convert $x^2 + 8x + 5$ to vertex form.  State the vertex.
2. **Pen & paper:** Use the quadratic formula to solve $3x^2 - x - 2 = 0$.
3. **Pen & paper:** Without solving, determine how many roots $4x^2 - 12x + 9 = 0$ has (use the discriminant).
4. **Code:** Write a function that takes $a, b, c$ and returns the roots (or reports "no real roots").
