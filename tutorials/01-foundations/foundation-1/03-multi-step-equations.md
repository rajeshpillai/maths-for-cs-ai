# Multi-Step Equations

## Intuition

An equation is a balance scale — whatever you do to one side, you must do to
the other.  In games, think of a character's stats: if a warrior's total
attack power equals base damage plus weapon bonus times a multiplier, you
need multi-step algebra to figure out the base damage from the final number.

## Prerequisites

- Foundation 1, Lesson 2: Algebraic Manipulation (expanding, factorising)

## From First Principles

### The golden rule

An equation says "left side = right side."  To keep it true, every operation
you perform on the left **must** be performed on the right.  Think of a
perfectly balanced scale: add a weight to one pan, add the same weight to
the other.

### Step-by-step strategy

1. **Expand** any brackets.
2. **Collect** like terms on each side.
3. **Move** variable terms to one side, constants to the other (add/subtract).
4. **Divide** (or multiply) to isolate the variable.
5. **Check** by substituting back into the original equation.

---

### Worked Example 1 — Brackets and collecting terms

Solve $3(2x + 4) = 30$.

**Step 1 — Expand:**

$$6x + 12 = 30$$

**Step 2 — Subtract 12 from both sides:**

$$6x = 30 - 12 = 18$$

**Step 3 — Divide both sides by 6:**

$$x = \frac{18}{6} = 3$$

**Check:** $3(2(3) + 4) = 3(6 + 4) = 3 \times 10 = 30$ ✓

---

### Worked Example 2 — Fractions

Solve $\frac{x + 5}{3} = 4$.

**Step 1 — Multiply both sides by the denominator 3:**

$$x + 5 = 12$$

**Step 2 — Subtract 5:**

$$x = 7$$

**Check:** $\frac{7 + 5}{3} = \frac{12}{3} = 4$ ✓

---

### Worked Example 3 — Unknown on both sides

Solve $5x + 2 = 3x + 10$.

**Step 1 — Subtract $3x$ from both sides:**

$$2x + 2 = 10$$

**Step 2 — Subtract 2:**

$$2x = 8$$

**Step 3 — Divide by 2:**

$$x = 4$$

**Check:** Left = $5(4) + 2 = 22$.  Right = $3(4) + 10 = 22$ ✓

---

### Worked Example 4 — Brackets on both sides

Solve $2(3x - 1) = 4(x + 3)$.

**Step 1 — Expand both sides:**

$$6x - 2 = 4x + 12$$

**Step 2 — Subtract $4x$:**

$$2x - 2 = 12$$

**Step 3 — Add 2:**

$$2x = 14$$

**Step 4 — Divide by 2:**

$$x = 7$$

**Check:** Left = $2(21 - 1) = 2 \times 20 = 40$.  Right = $4(10) = 40$ ✓

---

### Worked Example 5 — Word problem

> A rectangle's length is 3 more than twice its width.
> The perimeter is 42 cm.  Find the width.

**Set up:** Let width = $w$.  Then length = $2w + 3$.

Perimeter = $2(\text{length} + \text{width})$:

$$2(2w + 3 + w) = 42$$

**Step 1 — Simplify inside the bracket:**

$$2(3w + 3) = 42$$

**Step 2 — Expand:**

$$6w + 6 = 42$$

**Step 3 — Subtract 6:**

$$6w = 36$$

**Step 4 — Divide by 6:**

$$w = 6$$

So the width is 6 cm and the length is $2(6) + 3 = 15$ cm.

**Check:** Perimeter = $2(15 + 6) = 2 \times 21 = 42$ ✓

---

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

fig, ax = plt.subplots(figsize=(7, 4))

# Draw a balance scale showing  5x + 2 = 3x + 10
# Left pan
left_x, pan_y = 1.5, 1.0
right_x = 5.5
pivot_x = 3.5

# Triangle pivot
triangle = plt.Polygon([[pivot_x, 0.3], [pivot_x - 0.4, 0],
                         [pivot_x + 0.4, 0]], color="sienna")
ax.add_patch(triangle)

# Beam
ax.plot([left_x, right_x], [pan_y, pan_y], color="saddlebrown", lw=4)

# Left pan
ax.add_patch(patches.FancyBboxPatch((left_x - 0.8, pan_y - 0.35), 1.6, 0.3,
             boxstyle="round,pad=0.05", fc="#AED6F1", ec="black"))
ax.text(left_x, pan_y - 0.2, "$5x + 2$", ha="center", va="center", fontsize=13)

# Right pan
ax.add_patch(patches.FancyBboxPatch((right_x - 0.8, pan_y - 0.35), 1.6, 0.3,
             boxstyle="round,pad=0.05", fc="#ABEBC6", ec="black"))
ax.text(right_x, pan_y - 0.2, "$3x + 10$", ha="center", va="center", fontsize=13)

# Vertical supports
ax.plot([left_x, left_x], [pan_y, pan_y + 0.1], "k-", lw=2)
ax.plot([right_x, right_x], [pan_y, pan_y + 0.1], "k-", lw=2)
ax.plot([pivot_x, pivot_x], [0.3, pan_y], "k-", lw=2)

# Arrow showing "subtract 3x from both sides"
ax.annotate("subtract $3x$\nfrom both sides",
            xy=(pivot_x, pan_y + 0.5), fontsize=11,
            ha="center", color="crimson",
            bbox=dict(boxstyle="round,pad=0.3", fc="lightyellow", ec="crimson"))

ax.set_xlim(0, 7)
ax.set_ylim(-0.3, 2.0)
ax.set_aspect("equal")
ax.axis("off")
ax.set_title("An equation is a balance scale", fontsize=14, pad=10)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Multi-step equations: verify every worked example ────────────

# Example 1: 3(2x + 4) = 30
x1 = (30 - 12) / 6
print(f"Example 1: x = {x1}")
print(f"  Check: 3*(2*{x1} + 4) = {3*(2*x1 + 4)}")

# Example 2: (x + 5) / 3 = 4
x2 = 4 * 3 - 5
print(f"\nExample 2: x = {x2}")
print(f"  Check: ({x2} + 5) / 3 = {(x2 + 5) / 3}")

# Example 3: 5x + 2 = 3x + 10
x3 = (10 - 2) / (5 - 3)
print(f"\nExample 3: x = {x3}")
print(f"  Check: 5*{x3}+2 = {5*x3+2},  3*{x3}+10 = {3*x3+10}")

# Example 4: 2(3x - 1) = 4(x + 3)
x4 = (12 + 2) / (6 - 4)
print(f"\nExample 4: x = {x4}")
print(f"  Check: 2*(3*{x4}-1) = {2*(3*x4-1)},  4*({x4}+3) = {4*(x4+3)}")

# Example 5: word problem — perimeter = 42, length = 2w + 3
w = (42 - 6) / 6
length = 2 * w + 3
print(f"\nExample 5: width = {w}, length = {length}")
print(f"  Perimeter = 2*({length} + {w}) = {2*(length + w)}")
```

## Connection to CS / Games / AI

- **Game balance:** designers solve equations to set enemy HP, damage, and
  scaling so that fights feel fair at every level.
- **Physics engines:** rearranging $s = ut + \frac{1}{2}at^2$ to find time or
  acceleration requires the same multi-step techniques.
- **Machine learning:** training a linear model means solving for weights $w$
  in $\hat{y} = wx + b$ — the same algebra, scaled up to millions of data
  points.

## Check Your Understanding

1. Solve $4(x - 3) + 2 = 3(x + 1)$.  Show every step and check your answer.
2. Solve $\frac{2x - 1}{5} = 3$.  What is the first thing you should do?
3. **Word problem:** A phone plan charges a $20 monthly fee plus $0.05 per
   text.  If your bill is $31.50, write an equation and solve for the number
   of texts you sent.
