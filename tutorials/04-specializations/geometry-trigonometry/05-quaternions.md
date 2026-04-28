# Quaternions — Why They Beat Euler Angles

## Intuition

Euler angles (yaw, pitch, roll) are intuitive but suffer from **gimbal lock**
— a configuration where two axes align and you lose a degree of freedom.
Quaternions represent rotations using 4 numbers, avoid gimbal lock, interpolate
smoothly, and are the standard for 3D rotations in game engines.

## Prerequisites

- Tier 8, Lesson 4: Rotation Matrices
- Tier 0, Lesson 1: Number Systems (complex numbers)

## From First Principles

### What is a quaternion?

$$q = w + xi + yj + zk$$

where $i^2 = j^2 = k^2 = ijk = -1$.

Written as $q = (w, \mathbf{v})$ where $w$ is the scalar part and $\mathbf{v} = (x, y, z)$ is the vector part.

### Unit quaternion = rotation

A unit quaternion ($|q| = 1$) represents a rotation of angle $\theta$ around axis $\hat{\mathbf{u}}$:

$$q = \left(\cos\frac{\theta}{2},\; \hat{\mathbf{u}}\sin\frac{\theta}{2}\right)$$

### Pen & paper: 90° rotation around z-axis

$\theta = 90°$, $\hat{\mathbf{u}} = (0, 0, 1)$

$$q = \left(\cos 45°, (0, 0, \sin 45°)\right) = \left(\frac{\sqrt{2}}{2}, 0, 0, \frac{\sqrt{2}}{2}\right)$$

$\approx (0.707, 0, 0, 0.707)$

### Rotating a vector by a quaternion

To rotate vector $\mathbf{p}$: embed it as pure quaternion $p = (0, \mathbf{p})$, then:

$$p' = q \cdot p \cdot q^{-1}$$

For unit quaternions: $q^{-1} = q^* = (w, -\mathbf{v})$ (conjugate).

### Gimbal lock demonstration (Euler angles failing at 90° pitch)

Apply Euler rotation $R_z(\gamma) \cdot R_y(90°) \cdot R_x(\alpha)$ to the
vector $(1, 0, 0)$:

**Pen & paper:** $\alpha = 30°, \gamma = 0°$:

$R_x(30°)(1,0,0) = (1, 0, 0)$ (x-axis rotation doesn't move x-axis vector)

$R_y(90°)(1,0,0) = (0, 0, -1)$ (x maps to -z)

$R_z(0°)(0,0,-1) = (0, 0, -1)$

Now $\alpha = 0°, \gamma = -30°$:

$R_x(0°)(1,0,0) = (1, 0, 0)$

$R_y(90°)(1,0,0) = (0, 0, -1)$

$R_z(-30°)(0,0,-1) = (0, 0, -1)$ (z-rotation doesn't move z-axis vector)

Both give the same result! Try rotating a **different** starting vector
$(0, 1, 0)$ and you'll see that changing $\alpha$ and changing $\gamma$ produce
the same effect — they both rotate around the same axis. The system has
collapsed from 3 DOF to 2 DOF.

Quaternions avoid this entirely because they represent rotation as a single
axis + angle, with no sequential decomposition.

### Quaternion multiplication (derived from ijk rules)

Starting from Hamilton's rules: $i^2 = j^2 = k^2 = ijk = -1$.

From these we derive: $ij = k$, $jk = i$, $ki = j$, $ji = -k$, $kj = -i$, $ik = -j$.

Multiply $q_1 = w_1 + x_1 i + y_1 j + z_1 k$ by $q_2 = w_2 + x_2 i + y_2 j + z_2 k$:

Distribute all 16 terms and collect using the rules above:

- Scalar part: $w_1 w_2 - x_1 x_2 - y_1 y_2 - z_1 z_2 = w_1 w_2 - \mathbf{v}_1 \cdot \mathbf{v}_2$
- $i$ part: $w_1 x_2 + x_1 w_2 + y_1 z_2 - z_1 y_2$
- $j$ part: $w_1 y_2 - x_1 z_2 + y_1 w_2 + z_1 x_2$
- $k$ part: $w_1 z_2 + x_1 y_2 - y_1 x_2 + z_1 w_2$

The vector part is $w_1\mathbf{v}_2 + w_2\mathbf{v}_1 + \mathbf{v}_1 \times \mathbf{v}_2$.

Compact form:

$$q_1 q_2 = (w_1 w_2 - \mathbf{v}_1 \cdot \mathbf{v}_2,\; w_1\mathbf{v}_2 + w_2\mathbf{v}_1 + \mathbf{v}_1 \times \mathbf{v}_2)$$

### Why quaternions beat Euler angles

| | Euler angles | Quaternions |
|-|-------------|------------|
| Gimbal lock | Yes (at ±90° pitch) | No |
| Smooth interpolation | Jerky near singularities | SLERP (spherical linear) |
| Composition | 3 matrix multiplies | 1 quaternion multiply |
| Storage | 3 numbers | 4 numbers |
| Normalisation | Complex | Just normalise to unit length |

### SLERP (Spherical Linear Interpolation)

Smooth rotation between $q_0$ and $q_1$:

$$\text{slerp}(q_0, q_1, t) = q_0 \frac{\sin((1-t)\Omega)}{\sin\Omega} + q_1 \frac{\sin(t\Omega)}{\sin\Omega}$$

where $\cos\Omega = q_0 \cdot q_1$.

This produces constant angular velocity — no speeding up or slowing down.

## Python Verification

```python
# ── Quaternions ─────────────────────────────────────────────
import math

def quat_mul(q1, q2):
    """Multiply two quaternions (w, x, y, z)."""
    w1, x1, y1, z1 = q1
    w2, x2, y2, z2 = q2
    return (
        w1*w2 - x1*x2 - y1*y2 - z1*z2,
        w1*x2 + x1*w2 + y1*z2 - z1*y2,
        w1*y2 - x1*z2 + y1*w2 + z1*x2,
        w1*z2 + x1*y2 - y1*x2 + z1*w2,
    )

def quat_conj(q):
    return (q[0], -q[1], -q[2], -q[3])

def quat_rotate(q, v):
    """Rotate vector v by quaternion q."""
    p = (0, v[0], v[1], v[2])
    result = quat_mul(quat_mul(q, p), quat_conj(q))
    return (result[1], result[2], result[3])

# 90° around z-axis
print("=== Quaternion: 90° around z ===")
theta = math.radians(90)
q = (math.cos(theta/2), 0, 0, math.sin(theta/2))
print(f"q = ({q[0]:.4f}, {q[1]:.4f}, {q[2]:.4f}, {q[3]:.4f})")

# Rotate (1, 0, 0)
v = (1, 0, 0)
v_rot = quat_rotate(q, v)
print(f"Rotate (1,0,0): ({v_rot[0]:.4f}, {v_rot[1]:.4f}, {v_rot[2]:.4f})")

# Compose two 45° rotations = one 90° rotation
print(f"\n=== Composition: 2 × 45° = 90° ===")
q45 = (math.cos(math.radians(22.5)), 0, 0, math.sin(math.radians(22.5)))
q90_composed = quat_mul(q45, q45)
print(f"q(45°)² = ({q90_composed[0]:.4f}, {q90_composed[1]:.4f}, {q90_composed[2]:.4f}, {q90_composed[3]:.4f})")
print(f"q(90°)  = ({q[0]:.4f}, {q[1]:.4f}, {q[2]:.4f}, {q[3]:.4f})")

# SLERP
print(f"\n=== SLERP: interpolate 0° to 90° ===")
q0 = (1, 0, 0, 0)  # identity
q1 = q  # 90° around z
dot = sum(a*b for a, b in zip(q0, q1))
omega = math.acos(min(1, max(-1, dot)))
for t in [0.0, 0.25, 0.5, 0.75, 1.0]:
    if omega < 1e-6:
        qt = q0
    else:
        s0 = math.sin((1-t)*omega) / math.sin(omega)
        s1 = math.sin(t*omega) / math.sin(omega)
        qt = tuple(s0*a + s1*b for a, b in zip(q0, q1))
    angle = 2 * math.degrees(math.acos(min(1, abs(qt[0]))))
    print(f"  t={t}: angle ≈ {angle:.1f}°")
```

## Visualisation — Gimbal lock and why quaternions fix it

Euler-angle (yaw / pitch / roll) rotations look natural, but they hit
**gimbal lock**: when pitch = 90° two of the three rotation axes
collapse, you lose a degree of freedom, and small movements produce
huge sudden flips. Quaternions don't suffer this — they slide
smoothly through any orientation. Two pictures show both the problem
and the fix.

```python
# ── Visualising gimbal lock and quaternion SLERP ────────────
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401

def euler_xyz_to_matrix(roll, pitch, yaw):
    """Compose Rx(roll) · Ry(pitch) · Rz(yaw)."""
    cR, sR = np.cos(roll),  np.sin(roll)
    cP, sP = np.cos(pitch), np.sin(pitch)
    cY, sY = np.cos(yaw),   np.sin(yaw)
    Rx = np.array([[1, 0, 0], [0, cR, -sR], [0, sR, cR]])
    Ry = np.array([[cP, 0, sP], [0, 1, 0], [-sP, 0, cP]])
    Rz = np.array([[cY, -sY, 0], [sY, cY, 0], [0, 0, 1]])
    return Rx @ Ry @ Rz

# Quaternion utilities (scalar-first convention: [w, x, y, z]).
def quat_mul(a, b):
    aw, ax, ay, az = a; bw, bx, by, bz = b
    return np.array([
        aw*bw - ax*bx - ay*by - az*bz,
        aw*bx + ax*bw + ay*bz - az*by,
        aw*by - ax*bz + ay*bw + az*bx,
        aw*bz + ax*by - ay*bx + az*bw,
    ])

def axis_angle_quat(axis, angle):
    axis = np.asarray(axis, dtype=float); axis = axis / np.linalg.norm(axis)
    return np.array([np.cos(angle / 2),
                     *(axis * np.sin(angle / 2))])

def rotate_vec_quat(q, v):
    qv = np.array([0.0, *v])
    qc = np.array([q[0], -q[1], -q[2], -q[3]])
    return quat_mul(quat_mul(q, qv), qc)[1:]

def slerp(q0, q1, t):
    dot = float(np.dot(q0, q1))
    if dot < 0:                       # take the shorter arc
        q1 = -q1; dot = -dot
    if dot > 0.9995:                  # nearly identical → linear interp
        out = (1 - t) * q0 + t * q1
        return out / np.linalg.norm(out)
    omega = np.arccos(dot)
    return (np.sin((1 - t) * omega) / np.sin(omega)) * q0 \
         + (np.sin(t * omega)       / np.sin(omega)) * q1

fig = plt.figure(figsize=(15, 6))

# (1) Euler-angle interpolation passing through gimbal lock.
# Going from (roll=0, pitch=0, yaw=0) to (roll=180°, pitch=180°, yaw=0)
# straight in Euler angles, the orientation does *not* take the natural
# shortest path. Plot the path traced by an initial unit-x arrow.
ax1 = fig.add_subplot(1, 2, 1, projection="3d")
arrow_init = np.array([1.0, 0.0, 0.0])
ts = np.linspace(0, 1, 30)

# Linear Euler interp.
euler_path = np.array([
    euler_xyz_to_matrix(t * np.pi, t * np.pi, 0) @ arrow_init
    for t in ts])
ax1.plot(euler_path[:, 0], euler_path[:, 1], euler_path[:, 2],
         "o-", color="tab:red", lw=2, label="Euler-angle linear interp")

# Quaternion SLERP between the same start/end orientations.
q_start = axis_angle_quat([1, 0, 0], 0)
q_end_e = euler_xyz_to_matrix(np.pi, np.pi, 0)
# Convert the Euler end matrix to a quaternion (general 3×3 → quat).
def matrix_to_quat(R):
    tr = R[0, 0] + R[1, 1] + R[2, 2]
    if tr > 0:
        S = 2 * np.sqrt(tr + 1)
        return np.array([0.25 * S,
                         (R[2, 1] - R[1, 2]) / S,
                         (R[0, 2] - R[2, 0]) / S,
                         (R[1, 0] - R[0, 1]) / S])
    # Fallback for negative trace (rare here).
    return np.array([0, 1, 0, 0])

q_end = matrix_to_quat(q_end_e)
quat_path = np.array([rotate_vec_quat(slerp(q_start, q_end, t), arrow_init)
                      for t in ts])
ax1.plot(quat_path[:, 0], quat_path[:, 1], quat_path[:, 2],
         "s-", color="tab:green", lw=2, label="Quaternion SLERP")

# Reference frame.
for axis, name, color in [([1,0,0], "X", "red"), ([0,1,0], "Y", "green"),
                          ([0,0,1], "Z", "blue")]:
    ax1.plot([0, axis[0]], [0, axis[1]], [0, axis[2]], color=color, lw=1)
    ax1.text(axis[0]*1.1, axis[1]*1.1, axis[2]*1.1, name, color=color, fontsize=10)

ax1.set_xlim(-1.5, 1.5); ax1.set_ylim(-1.5, 1.5); ax1.set_zlim(-1.5, 1.5)
ax1.set_title("Linear Euler interp wobbles around;\nquaternion SLERP is the smooth great-circle arc")
ax1.legend(loc="upper left", fontsize=9)

# (2) Same comparison in 2-D from above (so the wobble is visually clear).
ax2 = fig.add_subplot(1, 2, 2)
ax2.plot(euler_path[:, 0], euler_path[:, 1], "o-", color="tab:red",
         lw=1.5, label="Euler interp (curvy, may overshoot)")
ax2.plot(quat_path[:, 0], quat_path[:, 1], "s-", color="tab:green",
         lw=1.5, label="SLERP (smooth great-circle)")
ax2.scatter(*arrow_init[:2], color="tab:blue", s=120, zorder=5, label="start")
ax2.scatter(*((q_end_e @ arrow_init)[:2]), color="black", s=120, zorder=5, label="end")
ax2.axhline(0, color="black", lw=0.5); ax2.axvline(0, color="black", lw=0.5)
ax2.set_aspect("equal"); ax2.set_xlim(-1.5, 1.5); ax2.set_ylim(-1.5, 1.5)
ax2.set_title("Top-down view of the rotation paths")
ax2.legend(loc="lower right", fontsize=9); ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the angles touched by each interpolation, so the picture has anchors.
print("Comparing rotation paths from identity to a 180° rotation:")
print(f"{'t':>5}  {'Euler arrow tip':>30}  {'SLERP arrow tip':>30}")
for t in [0, 0.25, 0.5, 0.75, 1.0]:
    e = euler_xyz_to_matrix(t * np.pi, t * np.pi, 0) @ arrow_init
    s = rotate_vec_quat(slerp(q_start, q_end, t), arrow_init)
    print(f"  {t:.2f}    ({e[0]:+.3f}, {e[1]:+.3f}, {e[2]:+.3f})    "
          f"({s[0]:+.3f}, {s[1]:+.3f}, {s[2]:+.3f})")
```

**Why every game engine uses quaternions for rotations:**

- **Euler angles are a leaky abstraction.** Composing Euler rotations
  is order-dependent (XYZ ≠ ZYX), and at certain orientations two of
  the three axes "collapse" (gimbal lock). Linear interpolation
  between Euler triples produces *wobbly* paths, not the
  shortest-arc rotation.
- **Quaternions are 4 numbers with no singularities.** Any 3-D
  rotation is a unit quaternion $q = (\cos(\theta/2), \sin(\theta/2)\,
  \hat{n})$. Composing rotations is one quaternion multiply.
- **SLERP gives the geometrically correct interpolation.** Sliding
  along a great-circle on the 4-D unit sphere is a constant-speed,
  shortest-path rotation — the *only* method that animates rotations
  smoothly under all conditions.

Unity, Unreal, Godot, Blender, and pretty much every modern 3-D engine
store all character/camera/bone rotations as quaternions internally,
and convert to Euler only for human-readable display.

## Connection to CS / Games / AI / Business / Industry

- **Unity/Unreal** — `Quaternion.Slerp()` for smooth camera and character rotation
- **Skeletal animation** — bone rotations stored as quaternions, interpolated with SLERP
- **Robotics** — orientation of end effectors represented as quaternions
- **Spacecraft** — attitude control uses quaternions (no gimbal lock!)
- **3D physics** — angular velocity integrated using quaternion multiplication
- **SpaceX Falcon 9 booster landing** — the flight computer represents booster attitude as a unit quaternion, integrated at 1 kHz from IMU rate-gyro data to drive grid-fin and gimbal commands during the flip-and-burn maneuver.
- **Hubble & James Webb Space Telescope pointing** — reaction-wheel control loops use quaternion error feedback to point at distant galaxies with arc-second precision, with no risk of gimbal lock during slews.
- **DJI Mavic and Skydio drones** — onboard IMU sensor fusion (Madgwick/Mahony filters) outputs orientation as a quaternion that the flight controller uses to keep the camera horizon level during aggressive maneuvers.
- **Apple Vision Pro and Meta Quest 3 head tracking** — the headset's IMU+camera SLAM stack reports head orientation as a quaternion 90+ times per second, fed directly to the GPU's view matrix to render stereoscopic frames without VR motion-sickness.

## Check Your Understanding

1. **Pen & paper:** Write the quaternion for a 180° rotation around the y-axis.
2. **Pen & paper:** Using quaternion rotation, rotate $(0, 1, 0)$ by 90° around the x-axis.
3. **Think about it:** Why does the quaternion use $\theta/2$ instead of $\theta$?  (Hint: the rotation formula applies $q$ twice: $q \cdot p \cdot q^{-1}$.)
4. **Pen & paper:** Multiply the quaternions $q_1 = (1, 0, 0, 0)$ (identity) and $q_2 = (0, 1, 0, 0)$ (180° around x-axis) using the multiplication formula. Verify that $q_1 q_2 = q_2$ and $q_2 q_2 = (-1, 0, 0, 0)$ (360° = negative identity).
