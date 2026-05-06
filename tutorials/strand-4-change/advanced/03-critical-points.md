---
strand: change
level: advanced
order: 3
title: Critical Points and the Second-Derivative Test
prerequisites:
  - tier: strand-4-change-advanced
    slug: 02-multivariable-chain-rule
    description: Multivariable chain rule
connections:
  - strand-4-change-advanced/04-lagrange-multipliers
applications:
  - cs: "Loss-landscape analysis, equilibrium analysis, ML saddle points"
  - life: "Where the function is locally flat — and what shape"
---

# Critical Points and the Second-Derivative Test

## Explain Like I Am 7

Walk around a hilly meadow until you find a spot where every
direction looks flat.  You might be on a peak (top of a hill),
in a bowl (bottom of a valley), or on a horse's saddle — flat
left-right but tilting front-back.  Those flat spots are
**critical points**.  To tell which kind, peek at how the ground
*bends* in each direction; if it bends down everywhere, peak; up
everywhere, bowl; mixed, saddle.  That bend-checker is the
second-derivative test.

## Mental

A **critical point** of $f : \mathbb{R}^n \to \mathbb{R}$ is a point
where $\nabla f = \mathbf{0}$. Three flavors:

- **Local minimum** — $f$ goes up in every direction.
- **Local maximum** — $f$ goes down in every direction.
- **Saddle point** — up in some directions, down in others.

To classify, look at the **Hessian** $H$ at the critical point.

## Second-derivative test in 2D

For $f(x, y)$ with $\nabla f(a, b) = 0$, compute:

$$
D = \det H = f_{xx} f_{yy} - f_{xy}^2.
$$

| $D > 0, f_{xx} > 0$ | local minimum |
| $D > 0, f_{xx} < 0$ | local maximum |
| $D < 0$ | saddle |
| $D = 0$ | test inconclusive |

## Worked example: $f(x, y) = x^2 + y^2$

$\nabla f = (2x, 2y) = 0$ at $(0, 0)$. Hessian:

$H = \begin{pmatrix} 2 & 0 \\ 0 & 2 \end{pmatrix}, \quad D = 4 > 0, \; f_{xx} = 2 > 0.$

**Local minimum** at $(0, 0)$ — and global, since $f \ge 0$.

## Worked example 2: $f(x, y) = x^2 - y^2$

$\nabla f = (2x, -2y) = 0$ at $(0, 0)$. Hessian:

$H = \begin{pmatrix} 2 & 0 \\ 0 & -2 \end{pmatrix}, \quad D = -4 < 0.$

**Saddle**. Walking along $x$-axis goes up; along $y$-axis goes
down.

## $n$-dimensional generalisation

$\nabla f = 0$ at the critical point. Examine the **eigenvalues** of
$H$:

- All positive ⇒ local minimum (positive definite).
- All negative ⇒ local maximum (negative definite).
- Mixed signs ⇒ saddle point.
- Some zeros ⇒ test inconclusive (need higher-order info).

## Interactive

:::widget type=numeric-input prompt="$f(x, y) = x^2 + y^2$. Critical point at $(0, 0)$ — type 1 for min, 0 for max." answer=1 explain="Min.":::

:::widget type=numeric-input prompt="$f(x, y) = -x^2 - y^2$. Critical point at $(0, 0)$ — max (1) or min (0)?" answer=1 explain="Max.":::

:::widget type=numeric-input prompt="$f(x, y) = x^2 - y^2$. Critical point at $(0, 0)$ — saddle (1) or extremum (0)?" answer=1 explain="Saddle.":::

:::widget type=numeric-input prompt="For local min in $n$D: all Hessian eigenvalues $> 0$. Type 1 if true." answer=1 explain="Yes.":::

## Symbolic

**Definite forms via eigenvalues**:

- **Positive definite** $\Leftrightarrow$ all eigenvalues $> 0$.
- **Negative definite** $\Leftrightarrow$ all eigenvalues $< 0$.
- **Indefinite** $\Leftrightarrow$ both signs present.
- **Semi-definite** $\Leftrightarrow$ allows zeros.

**Sylvester's criterion**: $H$ is positive definite iff every
leading principal minor is positive.

For the $2 \times 2$ case: $f_{xx} > 0$ and $\det H > 0$.

**In ML**: the loss landscape of a deep neural net has *many*
critical points; almost all are saddles. Saddle escape is a
practical training concern.

## Computational

```python
import sympy as sp

x, y = sp.symbols("x y")

def classify(f):
    grad = sp.Matrix([sp.diff(f, x), sp.diff(f, y)])
    crits = sp.solve([grad[0], grad[1]], [x, y], dict=True)
    H = sp.hessian(f, (x, y))
    out = []
    for c in crits:
        Hc = H.subs(c)
        eigs = list(Hc.eigenvals().keys())
        eigs_n = [complex(e).real for e in eigs]
        if all(e > 0 for e in eigs_n): kind = "min"
        elif all(e < 0 for e in eigs_n): kind = "max"
        elif any(e > 0 for e in eigs_n) and any(e < 0 for e in eigs_n): kind = "saddle"
        else: kind = "inconclusive"
        out.append((c, kind))
    return out

print(classify(x**2 + y**2))       # [({x: 0, y: 0}, 'min')]
print(classify(x**2 - y**2))       # [({x: 0, y: 0}, 'saddle')]
print(classify(-(x**2 + y**2)))    # [({x: 0, y: 0}, 'max')]

# A saddle in 3D: monkey saddle
f = x**3 - 3*x*y**2
print(classify(f))                 # likely (0,0) inconclusive — 2nd-order zero
```

## Applied

- **ML loss surfaces** — for high-dimensional loss landscapes, most
  critical points are saddles. SGD with momentum and noise escapes
  them. Modern theory (Pascanu, Dauphin, Bengio) characterises
  this.
- **Equilibrium analysis** in physics, chemistry, economics —
  stable equilibrium = local minimum of energy / cost.
- **Optimal control** — Pontryagin's maximum principle gives
  necessary conditions that include critical-point analysis.
- **Computer graphics — height-field analysis** — peaks, valleys,
  saddles classify terrain features.

## Check Your Understanding

:::widget type=numeric-input prompt="$f = x^2 + y^2$ at $(0, 0)$: minimum. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$f = x^2 - y^2$ at $(0, 0)$: saddle. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="In $n$D, local min ⟺ all Hessian eigenvalues positive. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Most critical points of high-dimensional loss surfaces are saddles. Type 1." answer=1 explain="Yes.":::
