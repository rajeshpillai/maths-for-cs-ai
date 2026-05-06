---
strand: shape-space
level: intermediate
order: 7
title: Hyperbolas and Conic Section Unification
prerequisites:
  - tier: strand-3-shape-space-intermediate
    slug: 06-conics-ellipse-parabola
    description: Ellipse and parabola
connections:
  - strand-3-shape-space-intermediate/08-polar-coordinates
applications:
  - cs: "Hyperbolic functions in ML, navigation algorithms"
  - games: "Cooling tower designs in city builder games"
  - life: "LORAN navigation, comet trajectories"
---

# Hyperbolas and Conic Section Unification

## Explain Like I Am 7

Stick two thumbtacks on a board and tie a string between them with a
loop — that's how to draw an ellipse.  A **hyperbola** is its
mirror-twin, drawn by a different rule: instead of asking "how far am
I from both tacks added together?", you ask "how *different* are my
distances?"  The path you get isn't a closed shape at all — it's two
curves that swoop apart forever, like the arms of a comet looping
around the Sun and never coming back.

## Mental

A **hyperbola** is the set of points whose **difference of distances**
from two fixed points (foci) is constant. Compare with the ellipse,
which uses **sum** of distances.

Equation (centred at origin, opening left/right):

$$
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1.
$$

Two branches, opening along the $x$-axis. The foci are at $(\pm c, 0)$
with $c = \sqrt{a^2 + b^2}$ (note the **plus** here, vs the **minus**
in the ellipse).

**Asymptotes**: as $|x| \to \infty$, the hyperbola approaches the
lines $y = \pm \frac{b}{a} x$.

**Eccentricity**: $e = c/a > 1$ for hyperbolas.

## Unifying eccentricity

All conics share an eccentricity-based definition:

| Conic | Eccentricity $e$ |
|---|---|
| Circle | $0$ |
| Ellipse | $0 < e < 1$ |
| Parabola | $1$ |
| Hyperbola | $e > 1$ |

A conic is the locus of points whose distance from a focus is $e$
times the distance from a directrix. **The single eccentricity
parameter unifies all four conics.**

## Interactive

:::widget type=numeric-input prompt="Hyperbola $x^2/9 - y^2/16 = 1$. $a = 3, b = 4$. Find $c$. $\\sqrt{a^2 + b^2} = ?$" answer=5 explain="$\\sqrt{25} = 5$. (3-4-5 triple appears.)":::

:::widget type=numeric-input prompt="Same: eccentricity $e = c/a = ?$" answer=1.667 tolerance=0.01 explain="$5/3 \\approx 1.667$.":::

:::widget type=numeric-input prompt="Asymptotes of the same hyperbola: $y = \\pm (b/a) x = \\pm ?$" answer=1.333 tolerance=0.01 explain="$4/3 \\approx 1.333$.":::

:::widget type=numeric-input prompt="A parabola has eccentricity $e = ?$" answer=1 explain="Parabola is exactly $e = 1$.":::

## Symbolic

**Hyperbola** opening horizontally:

$$
\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1.
$$

Vertices: $(\pm a, 0)$.
Foci: $(\pm c, 0)$ with $c = \sqrt{a^2 + b^2}$.
Asymptotes: $y = \pm (b/a) x$.

A **rectangular hyperbola** has $a = b$, asymptotes $y = \pm x$. The
graph $y = 1/x$ is a rotated rectangular hyperbola.

## Computational

```python
import numpy as np
import matplotlib.pyplot as plt

a, b = 3, 4
t = np.linspace(-2, 2, 100)
x = a * np.cosh(t)
y = b * np.sinh(t)

# Right branch
# plt.plot(x, y, label="right branch")
# plt.plot(-x, y, label="left branch")
# plt.plot(x, b/a * x, "k--", alpha=0.5)  # asymptotes
# plt.plot(x, -b/a * x, "k--", alpha=0.5)

# np.cosh and np.sinh — hyperbolic functions
print(np.cosh(0))  # 1
print(np.sinh(0))  # 0
print(np.cosh(1) ** 2 - np.sinh(1) ** 2)   # 1 — the hyperbolic identity
```

## Applied

- **LORAN navigation** (pre-GPS): radio receivers compute their
  position by measuring time differences from multiple stations,
  giving hyperbolic curves of "constant time difference."
- **Cooling tower design**: hyperboloids of revolution are
  structurally efficient and commonly seen at power plants.
- **Comet orbits**: extreme eccentricity ($e > 1$) gives hyperbolic
  paths — comets that won't return.
- **Hyperbolic functions** $\sinh, \cosh, \tanh$ are widely used in
  ML (especially the neural-network activation $\tanh$).

## Check Your Understanding

:::widget type=numeric-input prompt="Hyperbola $x^2/16 - y^2/9 = 1$. $c = ?$" answer=5 explain="$\\sqrt{16 + 9} = 5$.":::

:::widget type=numeric-input prompt="Eccentricity? $5/4 = ?$" answer=1.25 explain="$1.25 > 1$.":::

:::widget type=numeric-input prompt="Asymptote slopes for $x^2/16 - y^2/9 = 1$: $\\pm b/a = \\pm 0.75$. Type the positive value." answer=0.75 explain="$3/4 = 0.75$.":::

:::widget type=numeric-input prompt="A conic with $e = 0$ is..." answer=0 explain="Circle. Type 0 to indicate.":::
