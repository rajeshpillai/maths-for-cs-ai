# Simultaneous Equations

## Intuition

Imagine two players in a game trading items.  Player A says "2 swords and
3 shields cost 21 gold."  Player B says "4 swords and 1 shield cost 17 gold."
You have **two unknowns** (sword price, shield price) and **two equations** —
solve them simultaneously to find each price.  This is the foundation of
every system that needs to satisfy multiple conditions at once.

## Prerequisites

- Foundation 1, Lesson 4: Inequalities (comfort with manipulating both sides)

## From First Principles

### What is a simultaneous system?

A **system of two linear equations in two unknowns** looks like:

$$a_1 x + b_1 y = c_1$$
$$a_2 x + b_2 y = c_2$$

A **solution** is a pair $(x, y)$ that makes **both** equations true at the
same time.

### Graphical meaning

Each equation describes a straight line.  The solution is the **point where
the two lines cross** (intersect).  If the lines are parallel, there is no
solution.  If the lines are the same, there are infinitely many solutions.

---

### Method 1: Substitution

**Idea:** solve one equation for one variable, then plug it into the other.

**Worked example:**

$$y = 2x + 1 \quad \text{...(1)}$$
$$3x + y = 11 \quad \text{...(2)}$$

**Step 1 — Equation (1) already gives $y$ in terms of $x$.**

**Step 2 — Substitute into (2):**

$$3x + (2x + 1) = 11$$

**Step 3 — Simplify:**

$$5x + 1 = 11$$

$$5x = 10$$

$$x = 2$$

**Step 4 — Back-substitute into (1):**

$$y = 2(2) + 1 = 5$$

**Solution:** $(x, y) = (2, 5)$.

**Check in (2):** $3(2) + 5 = 11$ ✓

---

### Method 2: Elimination

**Idea:** add or subtract the equations to eliminate one variable.

**Worked example:**

$$2x + 3y = 12 \quad \text{...(1)}$$
$$4x - 3y = 6  \quad \text{...(2)}$$

**Step 1 — Notice:** the $y$-terms are $+3y$ and $-3y$.  Adding the
equations will eliminate $y$.

$$\text{(1) + (2):}\quad 2x + 4x + 3y - 3y = 12 + 6$$

$$6x = 18$$

$$x = 3$$

**Step 2 — Substitute $x = 3$ into (1):**

$$2(3) + 3y = 12$$

$$6 + 3y = 12$$

$$3y = 6$$

$$y = 2$$

**Solution:** $(x, y) = (3, 2)$.

**Check in (2):** $4(3) - 3(2) = 12 - 6 = 6$ ✓

---

### When coefficients don't match — multiply first

**Worked example:**

$$3x + 2y = 16 \quad \text{...(1)}$$
$$5x + 3y = 26 \quad \text{...(2)}$$

**Goal:** make the $y$-coefficients the same.  Multiply (1) by 3 and (2) by 2:

$$9x + 6y = 48 \quad \text{...(1')}$$
$$10x + 6y = 52 \quad \text{...(2')}$$

**Subtract (1') from (2'):**

$$x = 4$$

**Substitute into (1):** $3(4) + 2y = 16$, so $2y = 4$, so $y = 2$.

**Solution:** $(x, y) = (4, 2)$.

**Check in (2):** $5(4) + 3(2) = 20 + 6 = 26$ ✓

---

### Word problem

> A café sells coffees for £$c$ each and teas for £$t$ each.
> 3 coffees and 2 teas cost £11.  5 coffees and 4 teas cost £19.

$$3c + 2t = 11 \quad \text{...(1)}$$
$$5c + 4t = 19 \quad \text{...(2)}$$

Multiply (1) by 2: $6c + 4t = 22$.  Subtract (2):

$$6c + 4t - 5c - 4t = 22 - 19$$

$$c = 3$$

Back-substitute: $3(3) + 2t = 11$, $2t = 2$, $t = 1$.

Coffee costs £3, tea costs £1.

---

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 5))

x = np.linspace(-1, 6, 300)

# System: 2x + 3y = 12  and  4x - 3y = 6
# Rearranged: y = (12 - 2x)/3  and  y = (4x - 6)/3
y1 = (12 - 2*x) / 3
y2 = (4*x - 6) / 3

ax.plot(x, y1, "b-", lw=2, label=r"$2x + 3y = 12$")
ax.plot(x, y2, "r-", lw=2, label=r"$4x - 3y = 6$")

# Intersection point (3, 2)
ax.plot(3, 2, "ko", ms=8, zorder=5)
ax.annotate("Solution $(3,\\,2)$", xy=(3, 2), xytext=(4, 3),
            fontsize=12, arrowprops=dict(arrowstyle="->", color="black"),
            bbox=dict(boxstyle="round,pad=0.3", fc="lightyellow", ec="gray"))

ax.axhline(0, color="gray", lw=0.5)
ax.axvline(0, color="gray", lw=0.5)
ax.set_xlabel("$x$", fontsize=12)
ax.set_ylabel("$y$", fontsize=12)
ax.set_title("Two lines intersect at the solution", fontsize=13)
ax.legend(fontsize=11)
ax.set_xlim(-1, 6)
ax.set_ylim(-2, 6)
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Simultaneous equations: verify all worked examples ───────────

# Example 1 (substitution): y = 2x + 1,  3x + y = 11
x1 = 2; y1 = 2*x1 + 1
print(f"Example 1: x = {x1}, y = {y1}")
print(f"  Check eq2: 3*{x1} + {y1} = {3*x1 + y1}")

# Example 2 (elimination): 2x + 3y = 12,  4x - 3y = 6
A2 = np.array([[2, 3], [4, -3]])
b2 = np.array([12, 6])
sol2 = np.linalg.solve(A2, b2)
print(f"\nExample 2: x = {sol2[0]:.0f}, y = {sol2[1]:.0f}")
print(f"  Check eq1: 2*{sol2[0]:.0f} + 3*{sol2[1]:.0f} = {2*sol2[0]+3*sol2[1]:.0f}")
print(f"  Check eq2: 4*{sol2[0]:.0f} - 3*{sol2[1]:.0f} = {4*sol2[0]-3*sol2[1]:.0f}")

# Example 3 (multiply first): 3x + 2y = 16,  5x + 3y = 26
A3 = np.array([[3, 2], [5, 3]])
b3 = np.array([16, 26])
sol3 = np.linalg.solve(A3, b3)
print(f"\nExample 3: x = {sol3[0]:.0f}, y = {sol3[1]:.0f}")
print(f"  Check eq1: 3*{sol3[0]:.0f} + 2*{sol3[1]:.0f} = {3*sol3[0]+2*sol3[1]:.0f}")

# Word problem: 3c + 2t = 11,  5c + 4t = 19
A4 = np.array([[3, 2], [5, 4]])
b4 = np.array([11, 19])
sol4 = np.linalg.solve(A4, b4)
print(f"\nWord problem: coffee = £{sol4[0]:.0f}, tea = £{sol4[1]:.0f}")

# Also solve by hand (no numpy) to show pure-Python approach
# 3c + 2t = 11   →  multiply by 2:  6c + 4t = 22
# 5c + 4t = 19   →  subtract:       c = 3
c = (2*11 - 19) / (2*3 - 5)
t = (11 - 3*c) / 2
print(f"  Pure Python check: coffee = £{c:.0f}, tea = £{t:.0f}")
```

## Connection to CS / Games / AI / Business / Industry

- **Linear algebra at scale:** neural networks solve systems with millions
  of equations (weights).  The $\mathbf{Ax} = \mathbf{b}$ pattern from this
  lesson is the exact same pattern, just bigger matrices.
- **Game physics:** finding where two moving objects collide means solving two
  parametric equations simultaneously.
- **Computer graphics:** ray–plane intersection solves a system of equations
  to determine if and where a ray hits a surface.
- **Portfolio allocation** — Markowitz mean-variance optimisation solves $\mathbf{\Sigma w} = \mathbf{\mu}$ for asset weights; BlackRock's Aladdin and Bloomberg PORT both run this system on hundreds of equities.
- **Truss & frame analysis** — civil engineers write force-balance equations at every joint of a bridge ($\sum F_x = 0$, $\sum F_y = 0$) and solve the resulting system; SAP2000, ANSYS, and STAAD.Pro automate this for highway bridges and skyscrapers.
- **Power-grid load flow** — utilities solve simultaneous nonlinear equations for bus voltages and angles; PSS/E and PowerWorld run this every few seconds across the U.S. Eastern Interconnection.
- **Supply-chain blending problems** — refineries at Shell and Aramco solve simultaneous mass-balance equations to decide how to mix crude streams to hit octane, sulfur, and yield specs at lowest cost.

## Check Your Understanding

1. Solve by substitution: $x + y = 7$, $2x - y = 5$.
2. Solve by elimination: $4x + 5y = 22$, $4x + 3y = 14$.
   (Hint: what happens if you subtract?)
3. **Thinking question:** can you have a system of two linear equations with
   *no* solution?  Sketch what that looks like graphically and give an
   example.
