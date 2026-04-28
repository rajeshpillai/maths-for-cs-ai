# Inequalities

## Intuition

An inequality is like a health bar in a game — you don't need your HP to
equal a specific number, you just need it to stay **above zero**.  Inequalities
describe ranges of acceptable values, not single answers.  Every time a
program checks `if score >= 100`, it is evaluating an inequality.

## Prerequisites

- Foundation 1, Lesson 3: Multi-Step Equations

## From First Principles

### Inequality symbols

| Symbol | Meaning                | Example        |
|--------|------------------------|----------------|
| $<$    | less than              | $3 < 7$        |
| $>$    | greater than           | $10 > 4$       |
| $\le$  | less than or equal to  | $x \le 5$      |
| $\ge$  | greater than or equal to | $x \ge -2$   |

### The key rule: solving is like equations **except one thing**

You can add, subtract, multiply, or divide both sides — just as with
equations — **but if you multiply or divide by a negative number, you must
flip the inequality sign.**

### WHY does the sign flip?

Consider a true statement: $3 < 7$.

Multiply both sides by $-1$:  $-3$ and $-7$.

On the number line, $-3$ is to the **right** of $-7$, so $-3 > -7$.

The order reversed!  Multiplying by a negative reflects every point through
zero on the number line, which reverses the ordering.

**Formal argument:** If $a < b$, then $b - a > 0$.  Multiplying both sides of
$b - a > 0$ by a negative number $c < 0$ gives $c(b - a) < 0$, which means
$cb < ca$, i.e.\ $ca > cb$.  The inequality flipped.

---

### Worked Example 1 — Simple linear inequality

Solve $2x + 5 < 13$.

**Step 1 — Subtract 5:**

$$2x < 8$$

**Step 2 — Divide by 2 (positive, no flip):**

$$x < 4$$

**Solution set:** all real numbers less than 4.

**Interval notation:** $(-\infty,\; 4)$

---

### Worked Example 2 — Multiplying by a negative

Solve $-3x + 6 \ge 15$.

**Step 1 — Subtract 6:**

$$-3x \ge 9$$

**Step 2 — Divide by $-3$ (negative → FLIP the sign):**

$$x \le -3$$

**Check a value:** try $x = -4$: $-3(-4) + 6 = 12 + 6 = 18 \ge 15$ ✓

**Check a bad value:** try $x = 0$: $-3(0) + 6 = 6$, and $6 \ge 15$ is false ✓

**Interval notation:** $(-\infty,\; -3]$

---

### Worked Example 3 — Unknowns on both sides

Solve $5x - 2 > 3x + 6$.

**Step 1 — Subtract $3x$:**

$$2x - 2 > 6$$

**Step 2 — Add 2:**

$$2x > 8$$

**Step 3 — Divide by 2:**

$$x > 4$$

**Interval notation:** $(4,\; \infty)$

---

### Worked Example 4 — Compound inequality

Solve $-1 \le 2x + 3 < 9$.

This means **both** $-1 \le 2x + 3$ **and** $2x + 3 < 9$ must be true
simultaneously.  Work on all three parts at once.

**Step 1 — Subtract 3 from all three parts:**

$$-4 \le 2x < 6$$

**Step 2 — Divide all parts by 2:**

$$-2 \le x < 3$$

**Interval notation:** $[-2,\; 3)$

---

### Interval notation cheat sheet

| Inequality          | Interval         | Number-line boundary |
|---------------------|------------------|----------------------|
| $x > a$             | $(a, \infty)$    | open circle at $a$   |
| $x \ge a$           | $[a, \infty)$    | filled circle at $a$ |
| $x < b$             | $(-\infty, b)$   | open circle at $b$   |
| $x \le b$           | $(-\infty, b]$   | filled circle at $b$ |
| $a \le x < b$       | $[a, b)$         | filled at $a$, open at $b$ |

---

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(4, 1, figsize=(8, 5), sharex=True)

# Helper to draw a number line with shaded region
def draw_inequality(ax, left, right, left_closed, right_closed, label):
    ax.axhline(0, color="black", lw=1)
    ticks = np.arange(-6, 8)
    ax.set_xticks(ticks)
    ax.set_yticks([])
    ax.set_xlim(-6.5, 7.5)

    # Shade the solution region
    shade_left = left if left is not None else -7
    shade_right = right if right is not None else 8
    ax.axvspan(shade_left, shade_right, alpha=0.25, color="royalblue")

    # Endpoints
    if left is not None:
        marker = "o" if not left_closed else "o"
        fc = "royalblue" if left_closed else "white"
        ax.plot(left, 0, marker="o", ms=10, mfc=fc, mec="royalblue", mew=2)
    if right is not None:
        fc = "royalblue" if right_closed else "white"
        ax.plot(right, 0, marker="o", ms=10, mfc=fc, mec="royalblue", mew=2)

    ax.set_title(label, fontsize=11, loc="left")

# Example 1: x < 4
draw_inequality(axes[0], None, 4, False, False, r"$x < 4$   →   $(-\infty,\;4)$")
# Example 2: x ≤ -3
draw_inequality(axes[1], None, -3, False, True, r"$x \leq -3$   →   $(-\infty,\;-3]$")
# Example 3: x > 4
draw_inequality(axes[2], 4, None, False, False, r"$x > 4$   →   $(4,\;\infty)$")
# Example 4: -2 ≤ x < 3
draw_inequality(axes[3], -2, 3, True, False, r"$-2 \leq x < 3$   →   $[-2,\;3)$")

fig.suptitle("Number-line representations of inequalities", fontsize=13, y=1.02)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Inequalities: verify every worked example ────────────────────

# Example 1: 2x + 5 < 13  →  x < 4
print("Example 1: 2x + 5 < 13")
for x in [3, 3.9, 4, 5]:
    result = 2*x + 5
    print(f"  x={x:5.1f}  →  2x+5 = {result:5.1f}  < 13? {result < 13}")

# Example 2: -3x + 6 ≥ 15  →  x ≤ -3
print("\nExample 2: -3x + 6 >= 15")
for x in [-5, -3, -2, 0]:
    result = -3*x + 6
    print(f"  x={x:5.1f}  →  -3x+6 = {result:5.1f}  >= 15? {result >= 15}")

# Example 3: 5x - 2 > 3x + 6  →  x > 4
print("\nExample 3: 5x - 2 > 3x + 6")
for x in [3, 4, 4.1, 6]:
    left = 5*x - 2
    right = 3*x + 6
    print(f"  x={x:4.1f}  →  {left:5.1f} > {right:5.1f}? {left > right}")

# Example 4: -1 ≤ 2x + 3 < 9  →  -2 ≤ x < 3
print("\nExample 4: -1 <= 2x + 3 < 9")
for x in [-3, -2, 0, 2.9, 3]:
    val = 2*x + 3
    ok = (-1 <= val < 9)
    print(f"  x={x:5.1f}  →  2x+3 = {val:5.1f}  in [-1, 9)? {ok}")
```

## Connection to CS / Games / AI / Business / Industry

- **Bounds checking:** every array access needs `0 <= index < length` — a
  compound inequality that prevents buffer overflows and crashes.
- **Constraint satisfaction:** game AI uses inequalities to ensure NPCs stay
  within movement boundaries, health ranges, and resource limits.
- **Optimisation:** machine learning loss functions are minimised subject to
  constraints (inequalities).  Linear programming is built entirely on
  systems of linear inequalities.
- **Credit risk & FICO cutoffs** — lenders express underwriting policies as inequalities ($\text{DTI} \le 0.43$, $\text{FICO} \ge 680$); the CFPB's qualified-mortgage rule is literally a system of linear inequalities banks must satisfy.
- **Service-Level Agreements (SLAs)** — AWS and Cloudflare contracts state $\text{availability} \ge 99.99\%$ and $\text{latency}_{p99} \le 200\text{ms}$; monitoring tools like Datadog raise alerts the moment these inequalities flip.
- **Mechanical safety factors** — ASME and Eurocode design rules require $\sigma_{\text{applied}} \le \sigma_{\text{yield}}/n$ where $n$ is the safety factor; FEA software (ANSYS, Abaqus) flags every element that violates the inequality.
- **Inventory reorder points** — supply-chain teams at Walmart and Zara trigger replenishment when on-hand stock falls below $\text{ROP} = d \cdot L + z\sigma\sqrt{L}$; SAP and Oracle ERP enforce this inequality automatically.

## Check Your Understanding

1. Solve $7 - 4x > 19$ and write the answer in interval notation.  Don't
   forget: which step requires you to flip the sign?
2. Solve the compound inequality $3 < 5 - 2x \le 11$ and sketch the
   solution on a number line.
3. **Bug hunt:** a student writes `if (health > 0 and health < max_health)` to
   check whether a character is alive and not at full HP.  Rewrite this as a
   compound mathematical inequality using proper notation.
