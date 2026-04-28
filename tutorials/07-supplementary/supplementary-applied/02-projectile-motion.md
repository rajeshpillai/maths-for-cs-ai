# Projectile Motion

## Intuition

Launch something at an angle and gravity pulls it into a **parabolic arc**.
The horizontal and vertical motions are **independent** — the horizontal
velocity is constant while the vertical is accelerated by gravity.  This is
the maths behind every thrown grenade, arrow, and basketball in games.

## Prerequisites

- Supplementary Applied, Lesson 1: Kinematics (SUVAT)
- Tier 8, Lesson 2: Sine, Cosine

## From First Principles

### Decompose into components

Launch speed $v_0$ at angle $\theta$ from horizontal:

$$v_x = v_0 \cos\theta \quad \text{(constant)}$$
$$v_y = v_0 \sin\theta - gt \quad \text{(changes with time)}$$

$$x = v_0 \cos\theta \cdot t$$
$$y = v_0 \sin\theta \cdot t - \frac{1}{2}gt^2$$

### Key results

**Time of flight:** $T = \frac{2v_0 \sin\theta}{g}$

**Maximum height:** $H = \frac{v_0^2 \sin^2\theta}{2g}$

**Range:** $R = \frac{v_0^2 \sin 2\theta}{g}$

### Pen & paper: Launch at 20 m/s, 45°, g=10

$v_x = 20\cos 45° = 10\sqrt{2} \approx 14.14$ m/s

$v_y = 20\sin 45° = 10\sqrt{2} \approx 14.14$ m/s

$T = \frac{2(20)(1/\sqrt{2})}{10} = \frac{40/\sqrt{2}}{10} = 2\sqrt{2} \approx 2.83$ s

$H = \frac{400 \times 0.5}{20} = 10$ m

$R = \frac{400 \times 1}{10} = 40$ m

### Optimal launch angle

$R = \frac{v_0^2 \sin 2\theta}{g}$ is maximised when $\sin 2\theta = 1$ → $\theta = 45°$.

Complementary angles give equal range: $30°$ and $60°$ reach the same distance (but different heights).

### The trajectory equation (eliminate $t$)

$$y = x\tan\theta - \frac{gx^2}{2v_0^2\cos^2\theta}$$

This is a **parabola** — confirming the path is a conic section.

## Python Verification

```python
# ── Projectile Motion ───────────────────────────────────────
import math

v0, theta_deg, g = 20, 45, 10
theta = math.radians(theta_deg)

# Components
vx = v0 * math.cos(theta)
vy = v0 * math.sin(theta)

T = 2 * v0 * math.sin(theta) / g
H = (v0 * math.sin(theta))**2 / (2 * g)
R = v0**2 * math.sin(2*theta) / g

print(f"=== Projectile: v₀={v0} m/s, θ={theta_deg}° ===")
print(f"vx = {vx:.2f}, vy = {vy:.2f}")
print(f"Flight time: {T:.2f} s")
print(f"Max height:  {H:.2f} m")
print(f"Range:       {R:.2f} m")

# Trajectory: y(x)
print(f"\n=== Trajectory ===")
for x_val in range(0, int(R) + 5, 5):
    y_val = x_val * math.tan(theta) - g * x_val**2 / (2 * vx**2)
    if y_val >= 0:
        bar = '*' * int(y_val * 2)
        print(f"  x={x_val:3d}: y={y_val:5.1f} {bar}")

# Complementary angles give same range
print(f"\n=== Complementary angles ===")
for angle in [15, 30, 45, 60, 75]:
    rad = math.radians(angle)
    r = v0**2 * math.sin(2*rad) / g
    h = (v0 * math.sin(rad))**2 / (2*g)
    print(f"  θ={angle}°: range={r:.1f}m, height={h:.1f}m")

# Game physics: frame-by-frame
print(f"\n=== Frame simulation (60 FPS) ===")
dt = 1/60
x, y = 0.0, 0.0
vel_x, vel_y = vx, vy
for frame in range(200):
    vel_y -= g * dt
    x += vel_x * dt
    y += vel_y * dt
    if y < 0 and frame > 0:
        print(f"  Landed at frame {frame}: x={x:.1f}m (t={frame*dt:.2f}s)")
        break
    if frame % 30 == 0:
        print(f"  frame {frame:3d}: ({x:.1f}, {y:.1f})")
```

## Visualisation — Trajectories at different launch angles

The classic "what's the optimal launch angle?" picture: same launch
speed, several angles, one plot. The 45° trajectory wins for *range*
on flat ground — a result you can derive analytically and *see*
immediately in the picture.

```python
# ── Visualising projectile trajectories ─────────────────────
import numpy as np
import matplotlib.pyplot as plt

g  = 9.8
v0 = 30.0          # launch speed (m/s)

fig, ax = plt.subplots(1, 1, figsize=(11, 6))

best_range = 0; best_theta = 0
for theta_deg, color in zip([15, 30, 45, 60, 75],
                            plt.cm.viridis(np.linspace(0.1, 0.9, 5))):
    theta = np.radians(theta_deg)
    vx, vy = v0 * np.cos(theta), v0 * np.sin(theta)
    T = 2 * vy / g                            # time of flight (returns to y=0)
    t = np.linspace(0, T, 200)
    x = vx * t
    y = vy * t - 0.5 * g * t * t
    ax.plot(x, y, color=color, lw=2, label=f"θ = {theta_deg}° → range = {x[-1]:.1f}m")
    # Mark the apex.
    apex_t = vy / g
    apex_x = vx * apex_t; apex_y = vy * apex_t - 0.5 * g * apex_t * apex_t
    ax.scatter(apex_x, apex_y, color=color, s=60, zorder=5)
    if x[-1] > best_range:
        best_range = x[-1]; best_theta = theta_deg

ax.axhline(0, color="black", lw=0.6)
ax.set_xlabel("horizontal distance x (m)")
ax.set_ylabel("height y (m)")
ax.set_title(f"Projectile trajectories at v₀ = {v0} m/s\n"
             f"max range = {best_range:.2f}m at θ = {best_theta}° "
             f"(theoretical max at 45°)")
ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the analytical relationships used above.
print(f"Launch speed v₀ = {v0} m/s,  gravity g = {g} m/s²")
print(f"\nRange formula: R = v₀² sin(2θ) / g — peaks at θ = 45°.")
for theta_deg in [15, 30, 45, 60, 75]:
    theta = np.radians(theta_deg)
    R = v0 * v0 * np.sin(2 * theta) / g
    H = (v0 * np.sin(theta)) ** 2 / (2 * g)
    print(f"  θ = {theta_deg}°: range = {R:.2f}m, max height = {H:.2f}m")
print(f"\nTwo angles (e.g. 30° and 60°) give the SAME range:")
print(f"  sin(2 · 30°) = sin(60°) = sin(120°) = sin(2 · 60°)")
```

**Why 45° is the sweet spot for range:**

- **Range = $v_0^2 \sin(2\theta) / g$.** $\sin(2\theta)$ peaks at
  $2\theta = 90°$, i.e. $\theta = 45°$. So *flat ground, no air
  resistance* gives 45° as the optimum.
- **Two complementary angles share a range.** $\theta$ and $90° -
  \theta$ give the *same* range — but very different heights and
  flight times. A football kicked at 30° lands fast and shallow; the
  same speed at 60° hangs longer and lands at the same spot.
- **Real-world projectile maths is messier.** Air resistance flattens
  the optimal angle (target archery uses ~35°, football ~30°). At
  Olympic shot put, the *physics-best* angle is 45° but human
  biomechanics make ~37° optimal for the athlete's anatomy.

## Connection to CS / Games / AI

- **Every game with throwing** — grenades, arrows, basketballs, angry birds
- **Aim assist** — predict where projectile lands given angle and speed
- **Physics engines** — decompose into horizontal/vertical, integrate each frame
- **Artillery** — adjust angle for distance, account for wind (extended model)

## Check Your Understanding

1. **Pen & paper:** Launch at 30 m/s at 30°, $g = 10$.  Find flight time, max height, and range.
2. **Pen & paper:** What two angles give a range of 30m with $v_0 = 20$ m/s?  (Hint: $\sin 2\theta = gR/v_0^2$.)
3. **Pen & paper:** At what angle is the maximum height equal to the range?
