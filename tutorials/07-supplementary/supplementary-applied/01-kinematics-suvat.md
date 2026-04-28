# Kinematics — SUVAT Equations

## Intuition

Kinematics describes **motion** without worrying about what causes it.
The SUVAT equations are five formulae connecting displacement, velocity,
acceleration, and time.  They're the physics behind every platformer jump,
every racing game, and every ballistics simulation.

## Prerequisites

- Tier 3, Lesson 2: Derivatives (velocity = derivative of position)
- Tier 3, Lesson 6: Integrals (position = integral of velocity)

## From First Principles

### The five SUVAT variables

| Symbol | Meaning | Unit |
|--------|---------|------|
| $s$ | Displacement | m |
| $u$ | Initial velocity | m/s |
| $v$ | Final velocity | m/s |
| $a$ | Acceleration (constant) | m/s² |
| $t$ | Time | s |

### Deriving from calculus

If acceleration $a$ is constant:

$$v = u + at \quad \text{(integrate } a \text{ w.r.t. } t\text{)}$$

$$s = ut + \frac{1}{2}at^2 \quad \text{(integrate } v \text{ w.r.t. } t\text{)}$$

$$v^2 = u^2 + 2as \quad \text{(eliminate } t \text{)}$$

$$s = \frac{(u + v)t}{2} \quad \text{(average velocity × time)}$$

$$s = vt - \frac{1}{2}at^2 \quad \text{(using } v \text{ instead of } u\text{)}$$

### Pen & paper: Falling object

Drop a ball from rest ($u = 0$) under gravity ($a = 9.8$ m/s²).

After 3 seconds:

$v = 0 + 9.8(3) = 29.4$ m/s

$s = 0(3) + \frac{1}{2}(9.8)(9) = 44.1$ m

### Pen & paper: Car braking

A car at $u = 20$ m/s brakes at $a = -5$ m/s².

Time to stop ($v = 0$): $0 = 20 + (-5)t$ → $t = 4$ s

Braking distance: $s = 20(4) + \frac{1}{2}(-5)(16) = 80 - 40 = 40$ m

Or: $v^2 = u^2 + 2as$ → $0 = 400 + 2(-5)s$ → $s = 40$ m ✓

### Velocity-time graphs

- **Gradient** = acceleration
- **Area under curve** = displacement
- Horizontal line = constant velocity (zero acceleration)
- Straight line with slope = constant acceleration

## Python Verification

```python
# ── Kinematics: SUVAT ───────────────────────────────────────

# Falling object
print("=== Falling object: u=0, a=9.8 ===")
u, a = 0, 9.8
for t in range(1, 6):
    v = u + a * t
    s = u * t + 0.5 * a * t**2
    print(f"  t={t}s: v={v:.1f} m/s, s={s:.1f} m")

# Car braking
print(f"\n=== Car braking: u=20, a=-5 ===")
u, a = 20, -5
t_stop = -u / a
s_stop = u * t_stop + 0.5 * a * t_stop**2
print(f"  Time to stop: {t_stop:.1f} s")
print(f"  Braking distance: {s_stop:.1f} m")
print(f"  Check (v²=u²+2as): s = {(0 - u**2)/(2*a):.1f} m")

# Simulation: ball thrown upward
print(f"\n=== Ball thrown up: u=15 m/s, a=-9.8 ===")
u, a = 15, -9.8
# Time to peak: v = 0
t_peak = -u / a
h_max = u * t_peak + 0.5 * a * t_peak**2
print(f"  Peak time: {t_peak:.2f} s")
print(f"  Max height: {h_max:.2f} m")
print(f"  Total flight time: {2*t_peak:.2f} s")

# Frame-by-frame simulation (game physics style)
print(f"\n=== Game physics: 60 FPS simulation ===")
dt = 1/60  # 60 FPS
x, v_sim = 0, 15  # position, velocity
g = -9.8
for frame in range(0, 200):
    v_sim += g * dt
    x += v_sim * dt
    if frame % 30 == 0:
        t = frame * dt
        # Compare to SUVAT
        x_exact = 15*t + 0.5*(-9.8)*t**2
        print(f"  frame {frame:3d} (t={t:.2f}s): sim={x:.2f}m, exact={x_exact:.2f}m")
    if x < 0 and frame > 0:
        print(f"  Landed at frame {frame} (t={frame*dt:.2f}s)")
        break
```

## Visualisation — Position, velocity, acceleration of a thrown ball

Three pictures from one motion: a ball thrown upward with initial
velocity 15 m/s. The plot shows the **position** vs time (the
parabola), the **velocity** (a line crossing zero at the peak), and
the **acceleration** (constant −g) — and how each is the *integral*
of the next.

```python
# ── Visualising SUVAT for a vertical throw ──────────────────
import numpy as np
import matplotlib.pyplot as plt

u = 15.0           # initial velocity (m/s, upward)
g = 9.8            # gravity (m/s², downward)
T = 2 * u / g      # total flight time (returns to the launch height)

t = np.linspace(0, T, 200)
position     = u * t - 0.5 * g * t * t           # s = ut − ½gt²
velocity     = u - g * t                          # v = u − gt
acceleration = -g * np.ones_like(t)               # a = −g (constant)

fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))

# (1) Position: a parabola peaking at t = u/g.
ax = axes[0]
ax.plot(t, position, color="tab:blue", lw=2)
ax.fill_between(t, 0, position, color="tab:blue", alpha=0.20)
peak_t = u / g; peak_h = u * u / (2 * g)
ax.scatter([peak_t], [peak_h], color="tab:red", s=80, zorder=5)
ax.annotate(f"peak: ({peak_t:.2f}s, {peak_h:.2f}m)\nfrom v=0 ⇒ t = u/g",
            xy=(peak_t, peak_h), xytext=(peak_t - 0.2, peak_h * 0.7),
            arrowprops=dict(arrowstyle="->", color="tab:red"))
ax.axhline(0, color="black", lw=0.6); ax.set_xlabel("time t (s)")
ax.set_ylabel("position s (m)")
ax.set_title("Position s(t) = ut − ½gt²\nintegral of v(t)")
ax.grid(True, alpha=0.3)

# (2) Velocity: linear, crossing zero at the peak time.
ax = axes[1]
ax.plot(t, velocity, color="tab:green", lw=2)
ax.fill_between(t, 0, velocity, color="tab:green", alpha=0.20)
ax.axhline(0, color="black", lw=0.6)
ax.scatter([peak_t], [0], color="tab:red", s=80, zorder=5)
ax.annotate("v = 0 at the peak", xy=(peak_t, 0), xytext=(peak_t - 0.5, 5),
            arrowprops=dict(arrowstyle="->", color="tab:red"))
ax.set_xlabel("time t (s)"); ax.set_ylabel("velocity v (m/s)")
ax.set_title("Velocity v(t) = u − gt\nintegral of a(t)")
ax.grid(True, alpha=0.3)

# (3) Acceleration: constant −g (free fall).
ax = axes[2]
ax.plot(t, acceleration, color="tab:red", lw=2)
ax.axhline(0, color="black", lw=0.6)
ax.set_xlabel("time t (s)"); ax.set_ylabel("acceleration a (m/s²)")
ax.set_title("Acceleration a(t) = −g\n(constant during free fall)")
ax.set_ylim(-12, 4); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the SUVAT predictions and verify against the numerical curves.
print(f"Initial velocity u = {u} m/s,  g = {g} m/s²")
print(f"Peak time  : t = u/g = {u/g:.4f} s")
print(f"Peak height: h = u²/(2g) = {u*u/(2*g):.4f} m")
print(f"Total time : T = 2u/g = {2*u/g:.4f} s")
print()
print("SUVAT equations all derived by integrating constant acceleration:")
print("  v = u + at")
print("  s = ut + ½at²")
print("  v² = u² + 2as")
```

**The trio that explains all of constant-acceleration kinematics:**

- **Acceleration is *constant*.** That single assumption (Newton's
  second law applied to a uniform gravitational field) cascades into
  *all* of SUVAT.
- **Velocity is the integral of acceleration.** With $a = -g$ constant,
  $v(t) = u - gt$ is linear in time.
- **Position is the integral of velocity.** $s(t) = ut - \tfrac{1}{2}
  g t^2$ is the famous parabolic trajectory. The peak is where $v =
  0$, the symmetric return is where $s = 0$.
- This pattern (integrate constant → linear → parabolic) is the
  template for *every* mechanics problem with uniform acceleration —
  cars braking, projectiles, free-falling lift carriages.

## Connection to CS / Games / AI / Business / Industry

- **Platformer physics** — jump height = $v_0^2 / (2g)$, jump time = $2v_0/g$
- **Racing games** — braking distance, acceleration curves
- **Ballistics** — bullet drop, projectile prediction
- **Animation** — ease-in/ease-out using constant acceleration
- **Euler integration** — games update position each frame: $x += v \cdot dt$, $v += a \cdot dt$

## Check Your Understanding

1. **Pen & paper:** A ball is thrown upward at 20 m/s.  How high does it go?  When does it return?  ($g = 10$ m/s²)
2. **Pen & paper:** A car accelerates from rest at 3 m/s² for 8 seconds.  Find the final velocity and distance covered.
3. **Pen & paper:** A train travelling at 30 m/s brakes with deceleration 2 m/s².  Find the stopping distance without using time.
