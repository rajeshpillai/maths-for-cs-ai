# Algebraic Manipulation — Expanding, Factorising, Completing the Square

## Intuition

Algebra is the language of abstraction — using letters for unknowns so you
can solve entire families of problems at once.  **Expanding** turns products
into sums.  **Factorising** reverses that.  **Completing the square** rewrites
a quadratic in a form that reveals its vertex.  These are the pen-and-paper
skills that all higher maths assumes you have.

## Prerequisites

- Foundation 1, Lesson 1: Surds, Indices, Logarithms

## From First Principles

### Expanding brackets

**Single bracket:** $3(2x + 5) = 6x + 15$

**Double brackets (FOIL — First, Outer, Inner, Last):**

$(x + 3)(x + 5) = x^2 + 5x + 3x + 15 = x^2 + 8x + 15$

$(2x - 1)(3x + 4) = 6x^2 + 8x - 3x - 4 = 6x^2 + 5x - 4$

**Perfect square:** $(a + b)^2 = a^2 + 2ab + b^2$

$(x + 3)^2 = x^2 + 6x + 9$

**Difference of squares:** $(a+b)(a-b) = a^2 - b^2$

$(x+5)(x-5) = x^2 - 25$

### Factorising

**Common factor:** $6x^2 + 9x = 3x(2x + 3)$

**Quadratic ($x^2 + bx + c$):** Find two numbers that multiply to $c$ and add to $b$.

$x^2 + 7x + 12$: numbers are 3 and 4 → $(x + 3)(x + 4)$

$x^2 - 5x + 6$: numbers are $-2$ and $-3$ → $(x - 2)(x - 3)$

**Difference of squares:** $x^2 - 16 = (x+4)(x-4)$

**Harder quadratic ($ax^2 + bx + c$) — the "ac method":**

Factorise $2x^2 + 7x + 3$.

**Step 1:** Compute $a \times c = 2 \times 3 = 6$.

**Step 2:** Find two numbers that **multiply** to $ac = 6$ and **add** to $b = 7$.
Try: $6 \times 1 = 6$ ✓ and $6 + 1 = 7$ ✓.

**Step 3:** Split the middle term using these numbers:

$2x^2 + 7x + 3 = 2x^2 + 6x + x + 3$

**Step 4:** Factor by grouping:

$= 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3)$

**Verify:** $(2x+1)(x+3) = 2x^2 + 6x + x + 3 = 2x^2 + 7x + 3$ ✓

### Completing the square

Rewrite $ax^2 + bx + c$ as $a(x - h)^2 + k$ where $(h, k)$ is the vertex.

**Method:** $x^2 + bx + c = \left(x + \frac{b}{2}\right)^2 - \frac{b^2}{4} + c$

**Pen & paper:** $x^2 + 6x + 2$

$= (x + 3)^2 - 9 + 2 = (x + 3)^2 - 7$

Vertex: $(-3, -7)$.  Minimum value: $-7$.

**Pen & paper:** $2x^2 - 12x + 5$

$= 2(x^2 - 6x) + 5 = 2((x - 3)^2 - 9) + 5 = 2(x-3)^2 - 13$

Vertex: $(3, -13)$.

### Solving quadratics

**Method 1: Factorising** — $x^2 - 5x + 6 = 0$ → $(x-2)(x-3) = 0$ → $x = 2, 3$

**Method 2: Completing the square** — $x^2 + 4x - 5 = 0$

$(x+2)^2 = 9$ → $x + 2 = \pm 3$ → $x = 1$ or $x = -5$

**Method 3: Quadratic formula** — $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$

## Python Verification

```python
# ── Algebraic Manipulation ──────────────────────────────────
import math

# Expanding
print("=== Expanding ===")
# (x+3)(x+5) at x=2
x = 2
lhs = (x+3) * (x+5)
rhs = x**2 + 8*x + 15
print(f"(x+3)(x+5) at x=2: {lhs} = x²+8x+15 = {rhs}")

# Factorising check
print(f"\n=== Factorising ===")
# x² + 7x + 12 = (x+3)(x+4)
for x in range(-6, 3):
    lhs = x**2 + 7*x + 12
    rhs = (x+3) * (x+4)
    if lhs != rhs:
        print(f"MISMATCH at x={x}")
print("x² + 7x + 12 = (x+3)(x+4) ✓ verified for x in [-6, 2]")

# 2x² + 7x + 3 = (2x+1)(x+3)
for x in range(-5, 5):
    assert 2*x**2 + 7*x + 3 == (2*x+1)*(x+3)
print("2x² + 7x + 3 = (2x+1)(x+3) ✓")

# Completing the square
print(f"\n=== Completing the square ===")
# x² + 6x + 2 = (x+3)² - 7
for x in range(-6, 3):
    lhs = x**2 + 6*x + 2
    rhs = (x+3)**2 - 7
    assert lhs == rhs
print("x² + 6x + 2 = (x+3)² - 7 ✓")
print(f"Vertex: (-3, -7), minimum = -7")

# Quadratic formula
print(f"\n=== Quadratic formula ===")
a, b, c = 1, -5, 6
disc = b**2 - 4*a*c
x1 = (-b + math.sqrt(disc)) / (2*a)
x2 = (-b - math.sqrt(disc)) / (2*a)
print(f"x² - 5x + 6 = 0: x = {x1:.0f} or x = {x2:.0f}")
```

## Visualisation — Quadratics, roots, and completing the square

Algebra on a quadratic is *always doing the same thing geometrically*:
moving the parabola, finding where it crosses the x-axis, finding its
lowest (or highest) point.

```python
# ── Visualising quadratics: roots, vertex, completing the square ──
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 4.5))
x = np.linspace(-7, 7, 400)

# (1) Factorising = finding where the curve crosses the x-axis.
# x² - 5x + 6 = (x-2)(x-3) → roots at x = 2 and x = 3.
ax = axes[0]
y = x**2 - 5*x + 6
ax.plot(x, y, label="$y = x^2 - 5x + 6$")
ax.axhline(0, color="black", lw=0.6)
ax.scatter([2, 3], [0, 0], color="red", zorder=5, s=70)
ax.annotate("root: x = 2", xy=(2, 0), xytext=(-2, 4),
            arrowprops=dict(arrowstyle="->", color="red"))
ax.annotate("root: x = 3", xy=(3, 0), xytext=(4, 4),
            arrowprops=dict(arrowstyle="->", color="red"))
ax.set_title("Factorising: roots are x-intercepts\n$(x-2)(x-3) = 0$")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_xlim(-2, 6); ax.set_ylim(-3, 12)
ax.grid(True, alpha=0.3); ax.legend()

# (2) Completing the square = sliding the parabola so its vertex is
# easy to read. x² + 6x + 2 = (x+3)² - 7.
# The "+3" inside means shift left by 3; the "-7" means shift down by 7.
ax = axes[1]
y_general = x**2 + 6*x + 2          # general form
y_basic   = x**2                    # the simplest parabola
y_vertex  = (x + 3)**2 - 7          # same as y_general, just relabelled
ax.plot(x, y_basic,   label="$y = x^2$ (basic)", linestyle="--", alpha=0.6)
ax.plot(x, y_general, label="$y = x^2 + 6x + 2$ = $(x+3)^2 - 7$")
ax.scatter([-3], [-7], color="red", zorder=5, s=70)
ax.annotate("vertex (-3, -7)", xy=(-3, -7), xytext=(0, -10),
            arrowprops=dict(arrowstyle="->", color="red"))
ax.axhline(0, color="black", lw=0.6); ax.axvline(0, color="black", lw=0.6)
ax.set_title("Completing the square = read the vertex\nfrom $(x - h)^2 + k$")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_xlim(-7, 4); ax.set_ylim(-12, 12)
ax.grid(True, alpha=0.3); ax.legend()

# (3) The discriminant Δ = b² − 4ac decides how many real roots exist.
# Three quadratics, all with a = 1, varying c so Δ takes 3 sign cases.
ax = axes[2]
specs = [(1, -2, -3, "two roots  (Δ > 0)"),
         (1, -2,  1, "one repeated root  (Δ = 0)"),
         (1, -2,  3, "no real roots  (Δ < 0)")]
for a, b, c, label in specs:
    y = a*x**2 + b*x + c
    disc = b*b - 4*a*c
    ax.plot(x, y, label=f"{label}, Δ = {disc}")
ax.axhline(0, color="black", lw=0.6)
ax.set_title("The discriminant $b^2 - 4ac$ counts the real roots")
ax.set_xlabel("x"); ax.set_ylabel("y")
ax.set_xlim(-3, 5); ax.set_ylim(-6, 10)
ax.grid(True, alpha=0.3); ax.legend()

plt.tight_layout()
plt.show()

# Print the algebra alongside, so picture and numbers reinforce.
print("Discriminant decides intersection count with the x-axis:")
for a, b, c, label in specs:
    disc = b*b - 4*a*c
    print(f"  a={a}, b={b}, c={c}  →  Δ = {disc:>3}  →  {label}")
```

**What to take away:**

- **Factorising = locating roots.** Where the parabola crosses the
  x-axis is exactly where the factored form equals zero. The roots of
  $(x-r_1)(x-r_2)$ are $r_1$ and $r_2$ — no calculation needed once
  you've factored.
- **Completing the square = locating the vertex.** Rewriting
  $x^2 + 6x + 2$ as $(x+3)^2 - 7$ tells you the parabola's lowest point
  is at $(-3, -7)$. This is the geometric content of the trick.
- **The discriminant $b^2 - 4ac$ counts real roots.** Positive ⇒ the
  parabola dips below the axis (two crossings); zero ⇒ it just
  touches; negative ⇒ it stays above (no real roots, but two complex
  ones).

## Connection to CS / Games / AI

- **Quadratic formula** — solving ray-sphere intersections (Tier 8-09)
- **Completing the square** — finding minima of loss functions analytically
- **Factorising** — simplifying expressions in symbolic differentiation

## Check Your Understanding

1. **Pen & paper:** Expand and simplify $(3x - 2)(x + 4) - (x + 1)^2$.
2. **Pen & paper:** Factorise $3x^2 - 11x - 4$.
3. **Pen & paper:** Complete the square for $x^2 - 10x + 21$ and find the vertex.
4. **Pen & paper:** Use the quadratic formula to solve $3x^2 - 2x - 5 = 0$.

> **Note:** Simultaneous equations are covered in **Foundation 1, Lesson 4**
> and inequalities in **Foundation 1, Lesson 5**.
