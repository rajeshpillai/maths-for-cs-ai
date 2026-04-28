# Conics — Advanced (Parametric Forms, Tangents, Loci)

## Intuition

Conic sections — parabola, ellipse, hyperbola — are the curves you get by slicing a cone
at different angles. In their parametric form, a single parameter $t$ traces out the entire
curve, which is far more powerful for solving problems than the implicit $F(x,y) = 0$ form.
Parametric conics appear everywhere: satellite orbits (ellipses), headlight reflectors
(parabolas), cooling tower shapes (hyperbolas), and Bezier curves in computer graphics.

## Prerequisites

- Foundation 4, Lesson 5 (Standard equations of conics)
- Trigonometric identities (sin, cos, sec, tan)
- Basics of differentiation (for tangent/normal lines)

## From First Principles

### Parametric Form of the Parabola $y^2 = 4ax$

Any point on $y^2 = 4ax$ can be written as:

$$P(t) = (at^2, 2at)$$

**Verification:** Substitute into $y^2 = 4ax$:
$(2at)^2 = 4a(at^2) \implies 4a^2t^2 = 4a^2t^2$ ✓

### Parametric Form of the Ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$

$$P(\theta) = (a\cos\theta, b\sin\theta)$$

**Verification:** $\frac{(a\cos\theta)^2}{a^2} + \frac{(b\sin\theta)^2}{b^2} = \cos^2\theta + \sin^2\theta = 1$ ✓

### Parametric Form of the Hyperbola $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$

$$P(\theta) = (a\sec\theta, b\tan\theta)$$

**Verification:** $\frac{(a\sec\theta)^2}{a^2} - \frac{(b\tan\theta)^2}{b^2} = \sec^2\theta - \tan^2\theta = 1$ ✓

### Tangent at a Parametric Point

**Parabola** at $(at^2, 2at)$: Differentiate $y^2 = 4ax$ implicitly: $2y\,dy = 4a\,dx$,
so $dy/dx = 2a/y = 2a/(2at) = 1/t$.

Tangent line: $y - 2at = \frac{1}{t}(x - at^2)$

$$\boxed{ty = x + at^2}$$

**Ellipse** at $(a\cos\theta, b\sin\theta)$: $dy/dx = -(b\cos\theta)/(a\sin\theta)$.

$$\boxed{\frac{x\cos\theta}{a} + \frac{y\sin\theta}{b} = 1}$$

**Hyperbola** at $(a\sec\theta, b\tan\theta)$: $dy/dx = (b\sec\theta)/(a\tan\theta) = b/(a\sin\theta)$.

$$\boxed{\frac{x\sec\theta}{a} - \frac{y\tan\theta}{b} = 1}$$

### Normal at a Parametric Point

The normal is perpendicular to the tangent. For the parabola at $(at^2, 2at)$:

Slope of normal $= -t$ (negative reciprocal of $1/t$).

$$y - 2at = -t(x - at^2) \implies y = -tx + 2at + at^3$$

### Chord of Contact

The chord of contact from an external point $(x_1, y_1)$ to the ellipse is:

$$\frac{xx_1}{a^2} + \frac{yy_1}{b^2} = 1$$

This is the line joining the two points where tangents from $(x_1, y_1)$ touch the ellipse.

### Director Circle

The locus of points from which two perpendicular tangents can be drawn to a conic.

**For the ellipse:** $x^2 + y^2 = a^2 + b^2$

**Derivation:** The tangent to $x^2/a^2 + y^2/b^2 = 1$ with slope $m$ is
$y = mx \pm \sqrt{a^2m^2 + b^2}$.

If two tangents from $(h,k)$ have slopes $m_1, m_2$ with $m_1 m_2 = -1$ (perpendicular),
then from the quadratic in $m$: product of roots $= (k^2 - b^2)/(h^2 - a^2) = -1$,
giving $h^2 + k^2 = a^2 + b^2$.

### Locus Problems — General Method

1. Let the moving point be $P(h, k)$.
2. Write the given geometric condition as an equation in $h$, $k$, and any parameters.
3. Eliminate the parameters using the constraint that points lie on the conic.
4. Replace $h \to x$, $k \to y$ to get the locus equation.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# --- Parabola with tangent and normal ---
a = 1
t0 = 1.5
t = np.linspace(-3, 3, 300)
ax = axes[0]
# Parabola y^2 = 4ax parametrically
ax.plot(a * t**2, 2 * a * t, 'b-', linewidth=2, label='$y^2 = 4x$')
# Point
px, py = a * t0**2, 2 * a * t0
ax.plot(px, py, 'ro', markersize=8)
ax.annotate(f'P({px:.1f}, {py:.1f})', (px, py), textcoords="offset points", xytext=(10, 5))
# Tangent: ty = x + at^2
x_tang = np.linspace(-1, 6, 100)
y_tang = (x_tang + a * t0**2) / t0
ax.plot(x_tang, y_tang, 'r--', linewidth=1.5, label='Tangent')
# Normal
y_norm = -t0 * x_tang + 2 * a * t0 + a * t0**3
ax.plot(x_tang, y_norm, 'g--', linewidth=1.5, label='Normal')
ax.set_xlim(-1, 6)
ax.set_ylim(-5, 5)
ax.set_title('Parabola', fontsize=13)
ax.legend(fontsize=9)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)

# --- Ellipse with tangent ---
a_e, b_e = 3, 2
theta0 = np.pi / 4
theta = np.linspace(0, 2 * np.pi, 300)
ax = axes[1]
ax.plot(a_e * np.cos(theta), b_e * np.sin(theta), 'b-', linewidth=2, label='Ellipse')
px, py = a_e * np.cos(theta0), b_e * np.sin(theta0)
ax.plot(px, py, 'ro', markersize=8)
# Tangent: x*cos(t)/a + y*sin(t)/b = 1
x_tang = np.linspace(-5, 5, 100)
y_tang = (1 - x_tang * np.cos(theta0) / a_e) * b_e / np.sin(theta0)
ax.plot(x_tang, y_tang, 'r--', linewidth=1.5, label='Tangent')
# Director circle
ax.plot(np.sqrt(a_e**2 + b_e**2) * np.cos(theta), np.sqrt(a_e**2 + b_e**2) * np.sin(theta),
        'm:', linewidth=1.5, label=f'Director circle r={np.sqrt(a_e**2+b_e**2):.2f}')
ax.set_xlim(-5, 5)
ax.set_ylim(-5, 5)
ax.set_title('Ellipse + Director Circle', fontsize=13)
ax.legend(fontsize=9)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)

# --- Hyperbola with tangent ---
a_h, b_h = 2, 1.5
ax = axes[2]
t_hyp = np.linspace(-1.3, 1.3, 300)
# Right branch
ax.plot(a_h / np.cos(t_hyp), b_h * np.tan(t_hyp), 'b-', linewidth=2, label='Hyperbola')
# Left branch
ax.plot(-a_h / np.cos(t_hyp), -b_h * np.tan(t_hyp), 'b-', linewidth=2)
# Asymptotes
x_asy = np.linspace(-6, 6, 100)
ax.plot(x_asy, b_h / a_h * x_asy, 'k:', alpha=0.5, label='Asymptotes')
ax.plot(x_asy, -b_h / a_h * x_asy, 'k:', alpha=0.5)
# Tangent at theta0
theta0_h = 0.5
px_h = a_h / np.cos(theta0_h)
py_h = b_h * np.tan(theta0_h)
ax.plot(px_h, py_h, 'ro', markersize=8)
# Tangent: x*sec(t)/a - y*tan(t)/b = 1
y_tang_h = (x_tang * (1/np.cos(theta0_h)) / a_h - 1) * b_h / np.tan(theta0_h)
ax.plot(x_tang, y_tang_h, 'r--', linewidth=1.5, label='Tangent')
ax.set_xlim(-6, 6)
ax.set_ylim(-5, 5)
ax.set_title('Hyperbola', fontsize=13)
ax.legend(fontsize=9)
ax.set_aspect('equal')
ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('conics_advanced.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Parabola y^2 = 4ax, a = 2 ---
a = 2
t = 1.5
P = (a * t**2, 2 * a * t)
print(f"Parabola point at t={t}: P = {P}")
print(f"  Check y^2 = {P[1]**2}, 4ax = {4*a*P[0]}")

# Tangent slope at P
slope_tang = 1 / t
slope_norm = -t
print(f"  Tangent slope = 1/t = {slope_tang:.4f}")
print(f"  Normal slope  = -t  = {slope_norm:.4f}")
print(f"  Product = {slope_tang * slope_norm} (should be -1)")

# --- Ellipse x^2/9 + y^2/4 = 1 ---
a_e, b_e = 3, 2
theta = np.pi / 3
P_e = (a_e * np.cos(theta), b_e * np.sin(theta))
print(f"\nEllipse point at theta={np.degrees(theta):.0f}°: P = ({P_e[0]:.4f}, {P_e[1]:.4f})")
check = (P_e[0]**2 / a_e**2) + (P_e[1]**2 / b_e**2)
print(f"  Check: x²/a² + y²/b² = {check:.6f}")

# Director circle radius
r_dir = np.sqrt(a_e**2 + b_e**2)
print(f"  Director circle radius = sqrt(a²+b²) = {r_dir:.4f}")

# --- Locus example: midpoint of chord of ellipse with slope m ---
# Chord with slope m=1 of x^2/9 + y^2/4 = 1
# Midpoint (h,k) satisfies: h/a^2 + k*m/b^2 = 0 => h/9 = -k/4
m = 1
print(f"\nLocus of midpoints of chords with slope {m}:")
print(f"  h/a² + k*m/b² = 0")
print(f"  h/9 + k/4 = 0 => k = -4h/9")
print(f"  This is a straight line through the center: y = -4x/9")

# --- Chord of contact verification ---
# External point (4, 3) to ellipse x^2/9 + y^2/4 = 1
x1, y1 = 4, 3
print(f"\nChord of contact from ({x1},{y1}) to ellipse x²/9 + y²/4 = 1:")
print(f"  Equation: {x1}x/9 + {y1}y/4 = 1")
print(f"  => 4x/9 + 3y/4 = 1")
print(f"  => 16x + 27y = 36")
```

## Connection to CS / Games / AI / Business / Industry

- **Computer graphics:** Parametric curves are the backbone of rendering — Bezier curves
  and NURBS are parametric extensions of conics used in font rendering and CAD.
- **Orbital mechanics in games:** Planet and satellite orbits are ellipses; the parametric
  form directly gives position at any time via Kepler's equation.
- **Optics simulation:** Parabolic reflectors focus parallel rays to the focus. Ray tracing
  engines use tangent/normal computations at intersection points.
- **AI/Robotics:** Elliptical confidence regions in Gaussian distributions; the director
  circle concept extends to decision boundaries.
- **Aerospace / ISRO & SpaceX:** Mission planners parameterize transfer orbits as ellipses
  with $(a\cos E, b\sin E)$ in Kepler's equation; Chandrayaan-3's lunar approach burn was
  scheduled by solving exactly this conic-tangent intersection problem.
- **Architecture & infrastructure:** Cooling-tower designs at NTPC and EDF nuclear plants
  are hyperboloids of revolution — the parametric $(a\sec\theta, b\tan\theta)$ form sets
  the cross-section radii at each height; whispering-gallery domes (Gol Gumbaz, US Capitol)
  exploit ellipse focus-to-focus reflection.
- **Manufacturing & CAD industry:** Autodesk Fusion 360 and Dassault SolidWorks store
  fillets, automotive body curves, and lens profiles as rational Bezier/NURBS — projective
  conics under the hood; tangent-continuity checks at curve joins use the chord-of-contact
  identities.
- **Optical & medical equipment:** Zeiss and Essilor grind aspherical/parabolic lenses for
  cameras and progressive eyewear; LASIK ablation profiles are parametric conics chosen so
  the corneal director-circle locus matches the patient's astigmatism axis.

## Check Your Understanding

1. **By hand:** Find the equation of the tangent to $y^2 = 12x$ at the point where $t = 2$.
   Then find where this tangent meets the x-axis.

2. **Derive:** Show that the tangent at any point on $y^2 = 4ax$ meets the directrix and
   the y-axis such that these two points subtend a right angle at the focus.

3. **Locus:** A variable chord of the ellipse $x^2/16 + y^2/9 = 1$ subtends a right angle
   at the center. Find the locus of the midpoint of the chord.

4. **Coding:** Write a function that, given a point external to an ellipse, computes the
   two tangent lines (return slopes and y-intercepts).

## JEE Challenge

**Problem 1.** A point $P$ moves on the ellipse $\frac{x^2}{25} + \frac{y^2}{16} = 1$.
From $P$, perpendicular is drawn to the major axis meeting it at $M$. Find the locus of the
midpoint of $PM$ extended to the minor axis end $B(0, 4)$.

*Hint:* Let $P = (5\cos\theta, 4\sin\theta)$, $M = (5\cos\theta, 0)$. Find the midpoint
of $PB$ in terms of $\theta$, eliminate $\theta$.

**Problem 2.** Tangent and normal at point $P(a\sec\theta, b\tan\theta)$ on the hyperbola
$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ meet the x-axis at $T$ and $N$ respectively. Show
that the circle on $TN$ as diameter passes through the foci.

**Problem 3.** A chord of the parabola $y^2 = 4ax$ with endpoints $P(at_1^2, 2at_1)$ and
$Q(at_2^2, 2at_2)$ passes through the focus $(a, 0)$. Prove that $t_1 t_2 = -1$, and hence
show that the tangents at $P$ and $Q$ are perpendicular and meet on the directrix.
