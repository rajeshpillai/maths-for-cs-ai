# Systems of Nonlinear Equations

## Intuition

A system of linear equations gives you intersecting lines — at most one
solution.  But when one equation is a parabola, circle, or other curve, the
system can have zero, one, or multiple intersection points.  In game
development, this is collision detection: does the bullet's linear path hit
the circular shield?  In ML, decision boundaries are often nonlinear curves,
and finding their intersections tells you about classifier behaviour.

## Prerequisites

- Foundation 1, Lesson 5: Linear Equations and Graphing

## From First Principles

### Line intersecting a parabola

**Solve:** $y = x^2$ and $y = 2x + 3$ simultaneously.

**Step 1:** Substitute: $x^2 = 2x + 3$.

**Step 2:** Rearrange: $x^2 - 2x - 3 = 0$.

**Step 3:** Factor: $(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$.

**Step 4:** Find $y$ for each $x$:

$x = 3$: $y = 9$.  $x = -1$: $y = 1$.

**Solutions:** $(3, 9)$ and $(-1, 1)$.

**Check:** $9 = 2(3) + 3$ ✓ and $1 = 2(-1) + 3$ ✓.

### Discriminant tells you how many intersections

Setting $x^2 = mx + c$ gives $x^2 - mx - c = 0$.

The discriminant $\Delta = m^2 + 4c$ determines:
- $\Delta > 0$: two intersection points
- $\Delta = 0$: one point (line is tangent to parabola)
- $\Delta < 0$: no real intersections

### Circle intersecting a line

**Solve:** $x^2 + y^2 = 25$ and $y = x + 1$.

**Step 1:** Substitute: $x^2 + (x+1)^2 = 25$.

**Step 2:** Expand: $x^2 + x^2 + 2x + 1 = 25$, so $2x^2 + 2x - 24 = 0$.

**Step 3:** Simplify: $x^2 + x - 12 = 0$ → $(x + 4)(x - 3) = 0$.

$x = -4, y = -3$ and $x = 3, y = 4$.

**Solutions:** $(-4, -3)$ and $(3, 4)$.

**Check:** $(-4)^2 + (-3)^2 = 16 + 9 = 25$ ✓ and $3^2 + 4^2 = 25$ ✓.

### Two parabolas

**Solve:** $y = x^2$ and $y = 4 - x^2$.

$x^2 = 4 - x^2$ → $2x^2 = 4$ → $x^2 = 2$ → $x = \pm\sqrt{2}$.

$y = 2$ for both.

**Solutions:** $(\sqrt{2}, 2)$ and $(-\sqrt{2}, 2)$.

### Strategy summary

1. **Substitution** — solve the simpler equation for one variable, plug into the other
2. **Elimination** — subtract equations to eliminate a variable (works when both have $x^2 + y^2$)
3. **Always check** — substitute back into both original equations

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: line + parabola
x = np.linspace(-3, 5, 300)
y_para = x**2
y_line = 2*x + 3

axes[0].plot(x, y_para, 'b-', linewidth=2, label=r'$y = x^2$')
axes[0].plot(x, y_line, 'r-', linewidth=2, label=r'$y = 2x + 3$')
axes[0].plot([3, -1], [9, 1], 'ko', markersize=10, zorder=5)
axes[0].annotate('(3, 9)', (3, 9), textcoords="offset points",
                 xytext=(10, -5), fontsize=11)
axes[0].annotate('(-1, 1)', (-1, 1), textcoords="offset points",
                 xytext=(-50, 10), fontsize=11)
axes[0].set_xlim(-3, 5)
axes[0].set_ylim(-2, 15)
axes[0].set_title('Line Intersecting Parabola')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Right: circle + line
theta = np.linspace(0, 2*np.pi, 300)
cx, cy = 5*np.cos(theta), 5*np.sin(theta)
lx = np.linspace(-6, 6, 300)
ly = lx + 1

axes[1].plot(cx, cy, 'b-', linewidth=2, label=r'$x^2 + y^2 = 25$')
axes[1].plot(lx, ly, 'r-', linewidth=2, label=r'$y = x + 1$')
axes[1].plot([-4, 3], [-3, 4], 'ko', markersize=10, zorder=5)
axes[1].annotate('(-4, -3)', (-4, -3), textcoords="offset points",
                 xytext=(-60, -15), fontsize=11)
axes[1].annotate('(3, 4)', (3, 4), textcoords="offset points",
                 xytext=(10, 5), fontsize=11)
axes[1].set_xlim(-6, 6)
axes[1].set_ylim(-6, 6)
axes[1].set_aspect('equal')
axes[1].set_title('Line Intersecting Circle')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('nonlinear_systems_plot.png', dpi=100)
plt.show()
```

## Python Verification

```python
# ── Systems of Nonlinear Equations ─────────────────────────────
import math

# System 1: y = x², y = 2x + 3
print("=== y = x²  and  y = 2x + 3 ===")
# x² - 2x - 3 = 0 → (x-3)(x+1) = 0
for x in [3, -1]:
    y1 = x**2
    y2 = 2*x + 3
    print(f"  x={x:+d}: y=x²={y1}, y=2x+3={y2}, match={y1==y2}")

# System 2: x² + y² = 25, y = x + 1
print(f"\n=== x² + y² = 25  and  y = x + 1 ===")
for x, y in [(-4, -3), (3, 4)]:
    circle = x**2 + y**2
    line = x + 1
    print(f"  ({x},{y}): x²+y²={circle}, y=x+1={line}=={y}: {circle==25 and line==y}")

# System 3: y = x², y = 4 - x²
print(f"\n=== y = x²  and  y = 4 - x² ===")
for x in [math.sqrt(2), -math.sqrt(2)]:
    y1 = x**2
    y2 = 4 - x**2
    print(f"  x={x:+.4f}: y1={y1:.4f}, y2={y2:.4f}, match={abs(y1-y2)<1e-10}")

# Using numpy to solve more complex systems numerically
import numpy as np
from scipy.optimize import fsolve

def system(vars):
    x, y = vars
    return [y - x**2, y - 2*x - 3]

print(f"\n=== Numerical verification (scipy.fsolve) ===")
sol1 = fsolve(system, [4, 10])
sol2 = fsolve(system, [-2, 0])
print(f"  Solution 1: x={sol1[0]:.4f}, y={sol1[1]:.4f}")
print(f"  Solution 2: x={sol2[0]:.4f}, y={sol2[1]:.4f}")

# Tangent case: y = x² and y = 2x - 1
print(f"\n=== Tangent: y = x²  and  y = 2x - 1 ===")
# x² = 2x - 1 → x² - 2x + 1 = 0 → (x-1)² = 0
discriminant = 4 - 4
print(f"  Discriminant = {discriminant} → tangent (one intersection)")
print(f"  x=1, y=1: x²={1}, 2x-1={1} ✓")
```

## Connection to CS / Games / AI / Business / Industry

- **Collision detection** — ray-circle and ray-sphere intersections are
  nonlinear systems solved by substitution, exactly as shown above
- **Decision boundaries** — SVM with RBF kernel creates circular/elliptical
  boundaries; intersections determine class transitions
- **Optimisation** — finding where a constraint surface meets a level curve
  of the objective function (Lagrange multipliers, Tier 5)
- **Computer graphics** — ray tracing computes ray-surface intersections for
  every pixel, requiring nonlinear system solving at massive scale
- **Robotics** — inverse kinematics solves nonlinear systems to find joint
  angles that place the end effector at a target position
- **Market equilibrium** — economists at the Fed solve nonlinear supply-demand systems $Q_s(p) = Q_d(p)$ where curves are nonlinear; the IMF's policy-simulation models DSGE the same way at country scale.
- **Chemical equilibrium constants** — process engineers at Dow solve nonlinear systems $K_{eq} = \prod [\text{products}]^{\nu_i} / \prod [\text{reactants}]^{\nu_j}$ to size reactors; Aspen Plus and HYSYS are built on these solvers.
- **Power-flow equations** — utilities like Duke Energy solve nonlinear AC power-flow systems $P_i = \sum V_i V_j (G_{ij}\cos\theta_{ij} + B_{ij}\sin\theta_{ij})$ every few minutes; PSS/E and PowerWorld are the standard tools.
- **Implied volatility surfaces** — option desks at Citadel and Susquehanna invert Black-Scholes (a nonlinear equation in $\sigma$) for every strike/expiry, then fit nonlinear systems to build a smooth IV surface for risk hedging.

## Check Your Understanding

1. **Pen & paper:** Find where $y = x^2 - 4$ meets $y = 2x - 1$.
2. **Pen & paper:** Find the intersection of $x^2 + y^2 = 10$ and $y = 3x$.
3. **Pen & paper:** For what value of $c$ is $y = 2x + c$ tangent to $y = x^2$?
4. **Pen & paper:** Solve $x^2 + y^2 = 25$ and $x^2 - y^2 = 7$ simultaneously.
