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

## Connection to CS / Games / AI

- **Unity/Unreal** — `Quaternion.Slerp()` for smooth camera and character rotation
- **Skeletal animation** — bone rotations stored as quaternions, interpolated with SLERP
- **Robotics** — orientation of end effectors represented as quaternions
- **Spacecraft** — attitude control uses quaternions (no gimbal lock!)
- **3D physics** — angular velocity integrated using quaternion multiplication

## Check Your Understanding

1. **Pen & paper:** Write the quaternion for a 180° rotation around the y-axis.
2. **Pen & paper:** Using quaternion rotation, rotate $(0, 1, 0)$ by 90° around the x-axis.
3. **Think about it:** Why does the quaternion use $\theta/2$ instead of $\theta$?  (Hint: the rotation formula applies $q$ twice: $q \cdot p \cdot q^{-1}$.)
4. **Pen & paper:** Multiply the quaternions $q_1 = (1, 0, 0, 0)$ (identity) and $q_2 = (0, 1, 0, 0)$ (180° around x-axis) using the multiplication formula. Verify that $q_1 q_2 = q_2$ and $q_2 q_2 = (-1, 0, 0, 0)$ (360° = negative identity).
