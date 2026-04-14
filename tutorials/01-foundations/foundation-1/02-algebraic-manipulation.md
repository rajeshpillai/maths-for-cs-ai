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
