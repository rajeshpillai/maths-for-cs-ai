# The Cartesian Plane — Points, Distance, and Midpoints

## Intuition

Every pixel on your screen has an address: a column number and a row number.
The Cartesian plane is the mathematical version of that grid — it lets us turn
geometric questions ("how far apart are these two enemies?") into algebra.

## Prerequisites

- Foundation 1, Lesson 7: Functions and Graphs

## From First Principles

### The coordinate system

Two number lines cross at right angles.  The horizontal axis is $x$, the
vertical axis is $y$.  Their intersection is the **origin** $(0, 0)$.

Every point in the plane has a unique address $(x, y)$:

- $x$ — how far right (positive) or left (negative)
- $y$ — how far up (positive) or down (negative)

### The four quadrants

| Quadrant | $x$ sign | $y$ sign | Example      |
|----------|----------|----------|-------------|
| I        | $+$      | $+$      | $(3, 2)$    |
| II       | $-$      | $+$      | $(-4, 1)$   |
| III      | $-$      | $-$      | $(-2, -5)$  |
| IV       | $+$      | $-$      | $(1, -3)$   |

### Distance formula — derived from Pythagoras

Given two points $A = (x_1, y_1)$ and $B = (x_2, y_2)$, draw a right
triangle:

- Horizontal leg: $|x_2 - x_1|$
- Vertical leg: $|y_2 - y_1|$
- Hypotenuse: the distance $d$ we want

By the Pythagorean theorem $a^2 + b^2 = c^2$:

$$d^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$$

$$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

**Pen & paper:** Find the distance from $A = (1, 2)$ to $B = (4, 6)$.

$d = \sqrt{(4-1)^2 + (6-2)^2} = \sqrt{9 + 16} = \sqrt{25} = 5$

### Midpoint formula

The midpoint $M$ of the segment from $(x_1, y_1)$ to $(x_2, y_2)$ is just the
average of the coordinates:

$$M = \left(\frac{x_1 + x_2}{2},\; \frac{y_1 + y_2}{2}\right)$$

**Pen & paper:** Midpoint of $(2, 7)$ and $(8, 3)$:

$M = \left(\frac{2+8}{2},\; \frac{7+3}{2}\right) = (5,\; 5)$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots(1, 1, figsize=(6, 6))

# Draw axes
ax.axhline(0, color='k', linewidth=0.5)
ax.axvline(0, color='k', linewidth=0.5)
ax.set_xlim(-1, 9)
ax.set_ylim(-1, 9)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)

# Points A and B
A = np.array([1, 2])
B = np.array([4, 6])
M = (A + B) / 2

# Plot points
ax.plot(*A, 'ro', markersize=8, label=f'A({A[0]:.0f}, {A[1]:.0f})')
ax.plot(*B, 'bo', markersize=8, label=f'B({B[0]:.0f}, {B[1]:.0f})')
ax.plot(*M, 'g^', markersize=8, label=f'M({M[0]:.0f}, {M[1]:.0f})')

# Distance line (hypotenuse)
ax.plot([A[0], B[0]], [A[1], B[1]], 'purple', linewidth=2, label='d = 5')

# Right-triangle legs (dashed)
ax.plot([A[0], B[0]], [A[1], A[1]], 'r--', linewidth=1)  # horizontal
ax.plot([B[0], B[0]], [A[1], B[1]], 'b--', linewidth=1)  # vertical
ax.text(2.5, 1.5, '3', fontsize=12, color='red')
ax.text(4.3, 4.0, '4', fontsize=12, color='blue')

# Quadrant labels
ax.text(6, 7, 'I (+,+)', fontsize=10, alpha=0.5)
ax.text(-0.8, 7, 'II (-,+)', fontsize=10, alpha=0.5)

ax.legend()
ax.set_title('Distance as a right-triangle hypotenuse')
plt.tight_layout()
plt.savefig('cartesian_plane.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Cartesian Plane: Distance & Midpoint ─────────────────────
import math

# Distance from A(1,2) to B(4,6)
print("=== Distance ===")
x1, y1 = 1, 2
x2, y2 = 4, 6
dx = x2 - x1
dy = y2 - y1
print(f"dx = {dx}, dy = {dy}")
print(f"dx² = {dx**2}, dy² = {dy**2}")
d = math.sqrt(dx**2 + dy**2)
print(f"d = sqrt({dx**2} + {dy**2}) = sqrt({dx**2 + dy**2}) = {d:.0f}")

# Midpoint of (2,7) and (8,3)
print(f"\n=== Midpoint ===")
x1, y1 = 2, 7
x2, y2 = 8, 3
mx = (x1 + x2) / 2
my = (y1 + y2) / 2
print(f"M = ({mx:.0f}, {my:.0f})")

# Extra: distance between two game objects
print(f"\n=== Game example: is enemy in range? ===")
player = (10, 15)
enemy = (13, 19)
dist = math.sqrt((enemy[0]-player[0])**2 + (enemy[1]-player[1])**2)
attack_range = 6
print(f"Distance to enemy: {dist:.2f}")
print(f"Attack range: {attack_range}")
print(f"In range? {dist <= attack_range}")
```

## Connection to CS / Games / AI / Business / Industry

- **Collision detection** — distance formula checks if two sprites overlap
- **Screen coordinates** — every GUI framework uses a Cartesian-style system
  (often with $y$ inverted: down is positive)
- **k-nearest neighbours** — the ML algorithm literally finds the $k$ closest
  points using distance
- **Pathfinding** — A* uses distance heuristics (Euclidean or Manhattan)

## Check Your Understanding

1. **Pen & paper:** Plot the points $A(-3, 4)$, $B(5, -2)$, $C(0, 0)$ and
   state which quadrant each lies in.
2. **Pen & paper:** Find the exact distance between $(-1, 3)$ and $(5, -5)$.
   Leave your answer in surd form if needed.
3. **Pen & paper:** A line segment has midpoint $(4, 1)$ and one endpoint
   $(2, 5)$.  Find the other endpoint.
