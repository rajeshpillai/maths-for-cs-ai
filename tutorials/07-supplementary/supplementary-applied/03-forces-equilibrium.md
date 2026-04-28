# Forces and Equilibrium

## Intuition

Forces cause objects to accelerate (Newton's second law: $F = ma$).  When
forces balance, an object is in **equilibrium** — it stays still or moves at
constant velocity.  Understanding force resolution and equilibrium is
essential for physics engines, structural analysis, and robotics.

## Prerequisites

- Tier 8, Lesson 2: Sine, Cosine (resolving components)
- Tier 2, Lesson 2: Vector Operations

## From First Principles

### Newton's laws

1. An object at rest stays at rest (unless a force acts)
2. $\mathbf{F} = m\mathbf{a}$ (force = mass × acceleration)
3. Every action has an equal and opposite reaction

### Resolving forces into components

A force $F$ at angle $\theta$ to the horizontal:

$$F_x = F\cos\theta, \quad F_y = F\sin\theta$$

### Equilibrium

An object is in equilibrium when the net force is zero:

$$\sum F_x = 0 \quad \text{and} \quad \sum F_y = 0$$

### Pen & paper: Two forces on a particle

$F_1 = 10$ N at $30°$ and $F_2 = 8$ N at $150°$ to the horizontal.

$\sum F_x = 10\cos 30° + 8\cos 150° = 8.66 - 6.93 = 1.73$ N

$\sum F_y = 10\sin 30° + 8\sin 150° = 5 + 4 = 9$ N

Resultant: $R = \sqrt{1.73^2 + 9^2} = \sqrt{84} \approx 9.17$ N

Direction: $\theta = \arctan(9/1.73) \approx 79°$

### Pen & paper: Object on an inclined plane

Mass $m$ on a slope at angle $\alpha$:

- Weight down the slope: $mg\sin\alpha$
- Normal reaction: $N = mg\cos\alpha$
- Friction: $F_f \le \mu N = \mu mg\cos\alpha$

Object slides if $mg\sin\alpha > \mu mg\cos\alpha$ → $\tan\alpha > \mu$.

**Example:** $m = 5$ kg, $\alpha = 30°$, $\mu = 0.4$, $g = 10$.

Down slope: $50\sin 30° = 25$ N

Max friction: $0.4 \times 50\cos 30° = 0.4 \times 43.3 = 17.3$ N

$25 > 17.3$ → the object **slides**.

Acceleration: $a = g(\sin\alpha - \mu\cos\alpha) = 10(0.5 - 0.346) = 1.54$ m/s²

### Tension in strings

**Pen & paper:** A 10 kg mass hangs from two strings at 30° and 60° to the horizontal.

Weight $W = 100$ N downward.

At the junction, equilibrium gives:

**Horizontal equilibrium** ($\sum F_x = 0$):

$T_1\cos 30° = T_2\cos 60°$

$T_1 \times \frac{\sqrt{3}}{2} = T_2 \times \frac{1}{2}$

Solve for $T_1$: $T_1 = \frac{T_2}{\sqrt{3}}$ ... (equation 1)

**Vertical equilibrium** ($\sum F_y = 0$):

$T_1\sin 30° + T_2\sin 60° = 100$

Substitute equation 1 ($T_1 = T_2/\sqrt{3}$):

$\frac{T_2}{\sqrt{3}} \times \frac{1}{2} + T_2 \times \frac{\sqrt{3}}{2} = 100$

$\frac{T_2}{2\sqrt{3}} + \frac{T_2\sqrt{3}}{2} = 100$

Factor out $T_2$ and find a common denominator ($2\sqrt{3}$):

$T_2 \times \frac{1 + 3}{2\sqrt{3}} = 100$ (since $\frac{\sqrt{3}}{2} = \frac{3}{2\sqrt{3}}$, so numerators add: $1 + 3 = 4$)

$T_2 = \frac{100 \times 2\sqrt{3}}{4} = 50\sqrt{3} \approx 86.6$ N

Back-substitute: $T_1 = \frac{50\sqrt{3}}{\sqrt{3}} = 50$ N

## Python Verification

```python
# ── Forces and Equilibrium ──────────────────────────────────
import math

# Two forces
print("=== Resultant of two forces ===")
F1, a1 = 10, math.radians(30)
F2, a2 = 8, math.radians(150)

Fx = F1*math.cos(a1) + F2*math.cos(a2)
Fy = F1*math.sin(a1) + F2*math.sin(a2)
R = math.sqrt(Fx**2 + Fy**2)
theta = math.degrees(math.atan2(Fy, Fx))
print(f"  ΣFx = {Fx:.2f} N, ΣFy = {Fy:.2f} N")
print(f"  Resultant = {R:.2f} N at {theta:.1f}°")

# Inclined plane
print(f"\n=== Inclined plane: m=5kg, α=30°, μ=0.4 ===")
m, g, alpha, mu = 5, 10, math.radians(30), 0.4
W_slope = m*g*math.sin(alpha)
N = m*g*math.cos(alpha)
F_friction = mu * N
print(f"  Weight down slope: {W_slope:.1f} N")
print(f"  Normal: {N:.1f} N")
print(f"  Max friction: {F_friction:.1f} N")
print(f"  Slides? {W_slope > F_friction}")
a_net = g*(math.sin(alpha) - mu*math.cos(alpha))
print(f"  Acceleration: {a_net:.2f} m/s²")

# Tension in strings
print(f"\n=== Two strings: 30° and 60°, W=100N ===")
# T1*cos30 = T2*cos60 → T1*√3/2 = T2/2
# T1*sin30 + T2*sin60 = 100
# Solving: T2 = 50√3, T1 = 50
T2 = 50 * math.sqrt(3)
T1 = 50
print(f"  T1 = {T1:.1f} N, T2 = {T2:.1f} N")
# Verify
check_x = T1*math.cos(math.radians(30)) - T2*math.cos(math.radians(60))
check_y = T1*math.sin(math.radians(30)) + T2*math.sin(math.radians(60)) - 100
print(f"  Check: ΣFx = {check_x:.6f}, ΣFy = {check_y:.6f}")
```

## Visualisation — A free-body diagram in equilibrium

The bedrock of statics: a body is in **equilibrium** when the vector
sum of forces on it is zero. The plot draws the classic "weight hung
from two ropes" problem and shows that the two tension arrows + the
weight arrow form a *closed* triangle (their sum is zero).

```python
# ── Visualising forces in equilibrium ───────────────────────
import numpy as np
import matplotlib.pyplot as plt

# Setup: a 100 N weight hangs from two ropes at 30° and 60° from vertical.
# Solve the system: ΣFx = 0, ΣFy = 0.
W   = 100.0
ang_left  = np.radians(30)         # angle from vertical of left rope
ang_right = np.radians(60)         # angle from vertical of right rope

# T1 · sin(left)  -  T2 · sin(right)  = 0   (horizontal balance)
# T1 · cos(left)  +  T2 · cos(right)  = W   (vertical balance)
A_mat = np.array([[np.sin(ang_left), -np.sin(ang_right)],
                  [np.cos(ang_left),  np.cos(ang_right)]])
T = np.linalg.solve(A_mat, [0.0, W])
T1, T2 = T

# Force vectors at the knot.
weight_vec = np.array([0.0, -W])                   # gravity acts downward
T1_vec     = np.array([-np.sin(ang_left),  np.cos(ang_left)]) * T1
T2_vec     = np.array([ np.sin(ang_right), np.cos(ang_right)]) * T2

fig, axes = plt.subplots(1, 2, figsize=(13, 6))

# (1) The free-body diagram: knot at origin, three force arrows.
ax = axes[0]
ax.scatter(0, 0, color="black", s=200, zorder=5)
ax.text(0.05, -0.1, "knot", fontsize=10)
ax.quiver(0, 0, T1_vec[0], T1_vec[1], angles="xy", scale_units="xy", scale=1,
          color="tab:blue", width=0.012, label=f"$T_1$ = {T1:.1f} N")
ax.quiver(0, 0, T2_vec[0], T2_vec[1], angles="xy", scale_units="xy", scale=1,
          color="tab:green", width=0.012, label=f"$T_2$ = {T2:.1f} N")
ax.quiver(0, 0, *weight_vec, angles="xy", scale_units="xy", scale=1,
          color="tab:red", width=0.012, label=f"W = {W} N")
ax.set_xlim(-90, 90); ax.set_ylim(-110, 90); ax.set_aspect("equal")
ax.axhline(0, color="black", lw=0.4); ax.axvline(0, color="black", lw=0.4)
ax.set_title("Free-body diagram at the knot")
ax.legend(fontsize=10); ax.grid(True, alpha=0.3)

# (2) The same three forces drawn tip-to-tail. They form a CLOSED
# triangle — that's literally what "ΣF = 0" means geometrically.
ax = axes[1]
start = np.array([0.0, 0.0])
ax.quiver(*start, *T1_vec, angles="xy", scale_units="xy", scale=1,
          color="tab:blue", width=0.012)
ax.text(*((start + T1_vec/2) + np.array([5, 5])), f"$T_1$ = {T1:.1f}",
        color="tab:blue", fontsize=10)
start = T1_vec
ax.quiver(*start, *T2_vec, angles="xy", scale_units="xy", scale=1,
          color="tab:green", width=0.012)
ax.text(*((start + T2_vec/2) + np.array([5, 5])), f"$T_2$ = {T2:.1f}",
        color="tab:green", fontsize=10)
start = start + T2_vec
ax.quiver(*start, *weight_vec, angles="xy", scale_units="xy", scale=1,
          color="tab:red", width=0.012)
ax.text(*((start + weight_vec/2) + np.array([3, -10])),
        f"W = {W}", color="tab:red", fontsize=10)
end = start + weight_vec
ax.scatter(0, 0, color="black", s=80, zorder=5, label="closure: end = start")
ax.scatter(*end, color="grey",  s=40, zorder=5)
ax.set_xlim(-90, 50); ax.set_ylim(-30, 110); ax.set_aspect("equal")
ax.set_title("Same three vectors tip-to-tail\n→ closed triangle = equilibrium")
ax.axhline(0, color="black", lw=0.4); ax.axvline(0, color="black", lw=0.4)
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the equilibrium check.
total = T1_vec + T2_vec + weight_vec
print(f"Tension T1 = {T1:.4f} N")
print(f"Tension T2 = {T2:.4f} N")
print(f"\nResultant of all three forces (should be zero in equilibrium):")
print(f"  ΣF = {total}    |ΣF| = {np.linalg.norm(total):.6e}")
```

**Why the "closed triangle" picture is the intuition:**

- **$\sum \vec{F} = \vec{0}$ means the force vectors form a closed
  polygon.** Adding tip-to-tail and getting back to the starting
  point is the geometric statement of equilibrium.
- This is *exactly* how engineers solve rope/cable/strut problems
  (force triangles, polygon-of-forces method). For more complex
  systems with more than three forces, the same idea extends to a
  closed *polygon*.
- **Linear algebra solves it instantly.** Two equations (horizontal
  and vertical components) in two unknowns ($T_1$, $T_2$) — a 2×2
  linear system. Civil engineering structural analysis scales this
  up to millions of forces in 3-D meshes, solved by sparse linear
  algebra (lesson 06 of advanced-ml).

## Connection to CS / Games / AI

- **Physics engines** — Box2D, Bullet resolve forces each frame
- **Character controllers** — slope detection, friction determines if player slides
- **Rope/chain simulation** — tension propagation through connected bodies
- **Robotics** — force analysis for joint torques
- **Structural analysis** — bridge design, architectural loading

## Check Your Understanding

1. **Pen & paper:** Forces of 5N, 8N, and 10N act at angles 0°, 120°, and 240°. Find the resultant.
2. **Pen & paper:** An object of mass 2kg sits on a slope of angle 20°, $\mu = 0.5$.  Does it slide?
3. **Pen & paper:** A 50N weight hangs from two equal strings, each at 45° to the vertical.  Find the tension.
4. **Think about it:** Why must both $\sum F_x = 0$ AND $\sum F_y = 0$ for equilibrium?  Could an object be in equilibrium if only one of these is zero?
