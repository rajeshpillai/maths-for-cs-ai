# Arc Length and Curvature

## Intuition
Arc length answers "how far did the character actually travel along a curved path?"
— not the straight-line shortcut, but the odometer reading. Curvature measures how
sharply a road bends at each point. A straight highway has zero curvature; a tight
hairpin turn has large curvature. In game dev, curvature determines how much a
camera needs to rotate to follow a path smoothly.

## Prerequisites
- Tier 12, Lesson 1 — Vector-valued functions and their derivatives

## From First Principles

### Arc Length

Start with a curve $\mathbf{r}(t) = \langle x(t), y(t), z(t) \rangle$ for $t \in [a, b]$.

**Idea.** Chop the curve into tiny straight segments. Each segment from $t$ to
$t + \Delta t$ has length approximately $\|\mathbf{r}'(t)\| \Delta t$. Sum them all up:

$$L = \int_a^b \|\mathbf{r}'(t)\|\, dt = \int_a^b \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2}\, dt$$

### Pen & Paper: Arc Length

**Example.** Find the arc length of $\mathbf{r}(t) = \langle 3\cos t, \; 3\sin t, \; 4t \rangle$ for $t \in [0, 2\pi]$.

**Step 1.** Compute $\mathbf{r}'(t)$:

$$\mathbf{r}'(t) = \langle -3\sin t, \; 3\cos t, \; 4 \rangle$$

**Step 2.** Compute the speed:

$$\|\mathbf{r}'(t)\| = \sqrt{(-3\sin t)^2 + (3\cos t)^2 + 4^2}$$

$$= \sqrt{9\sin^2 t + 9\cos^2 t + 16} = \sqrt{9(\sin^2 t + \cos^2 t) + 16} = \sqrt{9 + 16} = 5$$

**Step 3.** Integrate:

$$L = \int_0^{2\pi} 5\, dt = 5 \cdot 2\pi = 10\pi$$

The helix has constant speed 5, so the total length is simply speed times time.

### Arc Length Parameter

The **arc length parameter** $s$ measures distance along the curve from a starting
point. Define:

$$s(t) = \int_a^t \|\mathbf{r}'(\tau)\|\, d\tau$$

Re-parameterising by $s$ gives a **unit-speed** curve: $\|\mathbf{r}'(s)\| = 1$.

### Curvature

**Curvature** $\kappa$ measures how fast the unit tangent vector $\mathbf{T}$ changes
direction with respect to arc length:

$$\kappa = \left\| \frac{d\mathbf{T}}{ds} \right\|$$

Since re-parameterising by $s$ is often tedious, use the **practical formula**:

$$\kappa(t) = \frac{\|\mathbf{r}'(t) \times \mathbf{r}''(t)\|}{\|\mathbf{r}'(t)\|^3}$$

**Derivation sketch.** We have $\mathbf{T} = \mathbf{r}'/\|\mathbf{r}'\|$ and
$ds/dt = \|\mathbf{r}'\|$. By the chain rule $d\mathbf{T}/ds = (d\mathbf{T}/dt) / (ds/dt)$.
After algebra using the product rule on $\mathbf{r}' = \|\mathbf{r}'\|\mathbf{T}$, the
cross-product formula emerges.

### Pen & Paper: Curvature

**Example.** Find the curvature of $\mathbf{r}(t) = \langle t, \; t^2, \; 0 \rangle$ at $t = 1$.

**Step 1.** $\mathbf{r}'(t) = \langle 1, 2t, 0 \rangle$, so $\mathbf{r}'(1) = \langle 1, 2, 0 \rangle$.

**Step 2.** $\mathbf{r}''(t) = \langle 0, 2, 0 \rangle$.

**Step 3.** Cross product $\mathbf{r}'(1) \times \mathbf{r}''(1)$:

$$\begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 2 & 0 \\ 0 & 2 & 0 \end{vmatrix} = \mathbf{i}(2 \cdot 0 - 0 \cdot 2) - \mathbf{j}(1 \cdot 0 - 0 \cdot 0) + \mathbf{k}(1 \cdot 2 - 2 \cdot 0) = \langle 0, 0, 2 \rangle$$

**Step 4.** $\|\mathbf{r}' \times \mathbf{r}''\| = 2$, $\|\mathbf{r}'(1)\| = \sqrt{1 + 4} = \sqrt{5}$.

$$\kappa(1) = \frac{2}{(\sqrt{5})^3} = \frac{2}{5\sqrt{5}} = \frac{2\sqrt{5}}{25} \approx 0.1789$$

### The TNB Frame

At each point on a curve, three mutually perpendicular unit vectors form a moving
frame:

- **T** (tangent): $\mathbf{T} = \mathbf{r}'/\|\mathbf{r}'\|$
- **N** (principal normal): $\mathbf{N} = \mathbf{T}'/\|\mathbf{T}'\|$ — points toward the centre of curvature
- **B** (binormal): $\mathbf{B} = \mathbf{T} \times \mathbf{N}$ — perpendicular to the osculating plane

The **radius of curvature** is $\rho = 1/\kappa$. The **osculating circle** has
radius $\rho$ and its centre lies at $\mathbf{r}(t) + \rho\,\mathbf{N}(t)$.

### Visualisation
```python
import numpy as np
import matplotlib.pyplot as plt

# Curve: y = x^2 (the parabola from our example)
x = np.linspace(-2, 2, 300)
y = x**2

# Curvature at t=1: kappa = 2*sqrt(5)/25
t0 = 1.0
r0 = np.array([t0, t0**2])
kappa = 2 * np.sqrt(5) / 25
rho = 1 / kappa  # radius of curvature

# Unit tangent and normal at t=1
r_prime = np.array([1, 2 * t0])
T = r_prime / np.linalg.norm(r_prime)
N = np.array([-T[1], T[0]])  # rotate 90 degrees toward concave side

centre = r0 + rho * N

# Osculating circle
theta = np.linspace(0, 2 * np.pi, 200)
circ_x = centre[0] + rho * np.cos(theta)
circ_y = centre[1] + rho * np.sin(theta)

fig, ax = plt.subplots(figsize=(7, 6))
ax.plot(x, y, 'b-', linewidth=2, label='y = x²')
ax.plot(circ_x, circ_y, 'r--', linewidth=1.5, label=f'Osculating circle (ρ={rho:.2f})')
ax.plot(*r0, 'ko', markersize=8)
ax.plot(*centre, 'r+', markersize=12, markeredgewidth=2)
ax.quiver(*r0, *T, scale=3, color='green', label='T (tangent)')
ax.quiver(*r0, *N, scale=3, color='orange', label='N (normal)')
ax.set_xlim(-2, 4)
ax.set_ylim(-1, 8)
ax.set_aspect('equal')
ax.set_title(f'Curvature at (1, 1): κ = {kappa:.4f}')
ax.legend()
ax.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

## Python Verification
```python
import numpy as np

# --- Arc length of helix <3cos t, 3sin t, 4t> from 0 to 2pi ---
from scipy import integrate

def speed(t):
    dr = np.array([-3*np.sin(t), 3*np.cos(t), 4])
    return np.linalg.norm(dr)

L, _ = integrate.quad(speed, 0, 2*np.pi)
print(f"=== Arc Length of helix ===")
print(f"Numerical:  {L:.6f}")
print(f"Analytical: {10*np.pi:.6f}")

# --- Curvature of <t, t^2, 0> at t=1 ---
def r_prime(t):
    return np.array([1, 2*t, 0])

def r_double_prime(t):
    return np.array([0, 2, 0])

t0 = 1.0
cross = np.cross(r_prime(t0), r_double_prime(t0))
kappa = np.linalg.norm(cross) / np.linalg.norm(r_prime(t0))**3

print(f"\n=== Curvature of <t, t^2, 0> at t=1 ===")
print(f"Cross product: {cross}")
print(f"|cross| = {np.linalg.norm(cross)}")
print(f"|r'|^3  = {np.linalg.norm(r_prime(t0))**3:.6f}")
print(f"Curvature κ = {kappa:.6f}")
print(f"Expected:     {2*np.sqrt(5)/25:.6f}")
print(f"Radius of curvature ρ = {1/kappa:.4f}")
```

## Connection to CS / Games / AI / Business / Industry
- **Camera systems**: curvature determines how fast the camera must rotate to
  follow a character along a path — high curvature needs faster rotation
- **Path planning**: robots and game NPCs need arc length to estimate travel
  time along a planned route
- **Font rendering**: TrueType and OpenType fonts use curvature-continuous
  splines so letterforms look smooth
- **Track design**: racing game tracks use curvature analysis to set speed limits
  and banking angles
- **Cloth simulation**: curvature of a surface drives bending energy in
  physics-based cloth
- **Highway and railway design**: AASHTO and FRA standards require curvature
  $\kappa$ and its rate-of-change (clothoid/Euler spiral transitions) to set
  superelevation and maximum safe speed; California High-Speed Rail and German
  Autobahn alignments are designed against these curvature constraints
- **Pipeline and oil-well design**: Schlumberger's directional drilling software
  computes curvature ("dogleg severity") along the well-bore trajectory — too
  high and the drill string fatigues or the casing buckles
- **Medical stent and catheter design**: Boston Scientific and Medtronic
  evaluate maximum curvature along coronary stents to ensure they navigate
  vessel bifurcations without kinking; arc length determines deployable stent
  inventory
- **Roller-coaster engineering**: Bolliger & Mabillard and Intamin compute
  curvature along the track at every point so that lateral $g$-forces stay
  within ride-comfort and safety envelopes set by ASTM F2291

## Check Your Understanding
1. Compute the arc length of $\mathbf{r}(t) = \langle 2t, \; t^2, \; \frac{1}{3}t^3 \rangle$
   from $t = 0$ to $t = 1$. (Hint: $\|\mathbf{r}'\|$ simplifies to a perfect square.)
2. Find the curvature of a circle of radius $R$. (Use $\mathbf{r}(t) = \langle R\cos t, R\sin t \rangle$.)
   You should get $\kappa = 1/R$.
3. For the helix $\langle 3\cos t, 3\sin t, 4t \rangle$, compute $\mathbf{T}$, $\mathbf{N}$,
   and $\mathbf{B}$ at $t = 0$.
