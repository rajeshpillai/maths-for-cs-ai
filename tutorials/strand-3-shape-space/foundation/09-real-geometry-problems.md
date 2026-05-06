---
strand: shape-space
level: foundation
order: 9
title: Putting It Together — Three Real Problems
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 08-transformations
    description: Transformations
connections:
  - strand-3-shape-space-foundation/00-coordinate-plane
applications:
  - cs: "Layout algorithms, hit testing, sprite collision"
  - business: "Property surveying, blueprint reading"
  - games: "Aim assist, terrain generation, AI navigation"
  - life: "Ladder length problems, room layout, GPS distance"
---

# Putting It Together — Three Real Problems

## Explain Like I Am 7

You've been collecting tools — a ruler, a protractor, a tile-counter,
a circle-string — for nine lessons.  Now imagine someone walks up
with a real puzzle: how tall is that tree if you can't climb it?
How much paint do you need for a weirdly shaped wall?  In this
lesson you reach into your toolbox, pull out the right tool for
each job, and discover that the boring practice from earlier
suddenly solves real, grown-up problems.

## Mental

Nine lessons in, you have:

- The **coordinate plane** (Lesson 00) for placing things.
- **Distance** and **Pythagoras** (Lesson 01) for measuring.
- **Lines** and **slope** (Lesson 02) for paths.
- **Angles** and **triangle sums** (Lesson 03) for orientation.
- **Triangle theorems** (Lesson 04) for inequality, congruence, and
  similarity.
- **Areas** (Lesson 05) for region size.
- **Circles** and **π** (Lesson 06) for round things.
- **Similarity** and **scaling** (Lesson 07) for size relations.
- **Transformations** (Lesson 08) for moving things.

Three integrated walkthroughs combine these tools.

## Walkthrough 1: How tall is that tree?

You want to know the height of a $40$-metre-distant tree without
climbing it. You have a stick of height $1.5$ m and a sunny day.

**Setup**. Plant the stick vertically. Measure its **shadow**: say
$2$ m. Measure the **tree's shadow**: say $48$ m.

**Reasoning**. The sun's rays are essentially parallel (the sun is
very far away). So the **angle** of the rays is the same on both
shadows. The two right triangles — stick + stick-shadow + ray, and
tree + tree-shadow + ray — are **similar** (same angles, by AA).

By similarity, **corresponding sides are in the same ratio**:

$$
\frac{\text{tree height}}{\text{tree shadow}} = \frac{\text{stick height}}{\text{stick shadow}}.
$$

$$
\frac{h}{48} = \frac{1.5}{2} = 0.75.
$$

$$
h = 48 \cdot 0.75 = 36 \text{ m}.
$$

The tree is $36$ metres tall.

**This is the technique Eratosthenes used in 240 BCE** to compute the
Earth's circumference — by measuring shadow angles in two cities a
known distance apart. His error was about $1\%$.

## Walkthrough 2: Will the rocket hit the moon?

A rocket launched from $(0, 0)$ travels in a straight line at
velocity $(3, 4)$ km/s. The moon is a circle of radius $1\,737$ km
centred at $(7\,000, 9\,000)$ km. Will the rocket hit the moon?

**Setup**. The rocket's path is the line $y = \dfrac{4}{3} x$
(slope $\dfrac{4}{3}$, through origin).

**Reasoning**. The moon's centre is at $(7000, 9000)$. We need:
**how far is the moon's centre from the rocket's line?** If that
distance is less than the moon's radius, the line crosses the moon —
the rocket hits.

**Distance from a point to a line**. The line $y = \tfrac{4}{3} x$
in standard form is $4x - 3y = 0$. Distance from $(x_0, y_0)$ to
$ax + by + c = 0$ is

$$
d = \frac{|a x_0 + b y_0 + c|}{\sqrt{a^2 + b^2}}.
$$

For our line: $a = 4, b = -3, c = 0$. Distance from $(7000, 9000)$:

$$
d = \frac{|4 \cdot 7000 + (-3) \cdot 9000|}{\sqrt{16 + 9}} = \frac{|28000 - 27000|}{5} = \frac{1000}{5} = 200 \text{ km}.
$$

**The moon's centre is only $200$ km from the rocket's line.** The
moon's radius is $1737$ km — much larger than $200$ km. **The
rocket hits.** (In fact it passes deep through.)

If the rocket had been aimed differently — say velocity $(1, 2)$
instead — the slope would be $2$, the line $2x - y = 0$, and the
distance from $(7000, 9000)$ would be

$$
d = \frac{|2 \cdot 7000 - 9000|}{\sqrt{4 + 1}} = \frac{5000}{\sqrt{5}} \approx 2236 \text{ km}.
$$

That's bigger than the moon's $1737$ km radius — **miss**.

This is the kind of geometry done in actual orbital mechanics, in
NASA mission planning, and in every videogame where bullets hit
targets.

## Walkthrough 3: How much paint for a circular ceiling?

A circular ceiling has diameter $5$ m. Paint costs $\$8$ per m². How
much will the ceiling cost to paint?

**Setup**. Diameter $5$ m → radius $2.5$ m. Area = $\pi r^2 = \pi
\cdot 6.25 \approx 19.63$ m².

**Cost**. $19.63 \cdot 8 = \$157.08$.

A common error: estimate $\pi \approx 3$, area $\approx 18.75$, cost
$\approx \$150$. That's a $\$7$ underestimate — the kind of mistake
real contractors learn to avoid.

A more dramatic version: a **dome** ceiling of diameter $20$ m. The
floor area is $\pi (10)^2 = 314.16$ m². But the **ceiling surface
area** of a hemispheric dome is $2 \pi r^2 = 628$ m² — twice the
floor. This is the **square-cube** consequence (Lesson 07 with $k =
1$ but different shape). Estimate paint by floor area and you'll
budget half what you actually need.

## Interactive

:::widget type=numeric-input prompt="A $10$ m flagpole's shadow is $4$ m long when a $1.5$ m person's shadow is $0.6$ m. Verify the shadow ratios match. The flagpole's height/shadow ratio is...?" answer=2.5 explain="$10 / 4 = 2.5$. Person: $1.5 / 0.6 = 2.5$. Same ratio = similar triangles. ✓":::

:::widget type=numeric-input prompt="A ladder of length $13$ m leans against a wall. Its base is $5$ m from the wall. How high up the wall does it reach? (Pythagoras.)" answer=12 explain="$\\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12$. (5-12-13 triple — Lesson 01.)":::

:::widget type=numeric-input prompt="A circular pizza has radius $20$ cm. What's its area, using $\\pi \\approx 3.14$? (Round to nearest 10.)" answer=1260 tolerance=10 explain="$\\pi r^2 \\approx 3.14 \\cdot 400 = 1256$ cm². Rounded to nearest 10: $1260$.":::

:::widget type=numeric-input prompt="Triangle with sides $5, 5, 6$ — what is its area? (Hint: drop a perpendicular from the apex; use Pythagoras.)" answer=12 explain="The triangle is isosceles. Drop perpendicular to the base; base splits into 3+3. Height is $\\sqrt{5^2 - 3^2} = 4$. Area $= \\frac{1}{2} \\cdot 6 \\cdot 4 = 12$.":::

:::widget type=numeric-input prompt="Reflect the point $(4, 3)$ across the line $y = x$. Type the new $x$." answer=3 explain="Reflection across $y = x$: $(x, y) \\to (y, x)$. $(4, 3) \\to (3, 4)$. New $x$ is $3$.":::

## Connective and beyond

You've covered:

- The **coordinate plane** as the shared language for geometry and
  algebra.
- **Pythagoras and distance** for measuring.
- **Lines, angles, triangles, polygons, circles** as the elementary
  shapes.
- **Similarity and transformations** as the rules of "what changes,
  what stays."

What's next?

**Strand 3 Intermediate** picks up:

- **Trigonometry**: sine, cosine, tangent. The unit circle. Trig
  identities. Applications to surveying, physics, signals.
- **Conic sections**: ellipses, parabolas, hyperbolas — orbits,
  reflectors, headlights.
- **Vectors**: arrows in the plane and 3D. Dot product, cross
  product, projections.
- **Polar coordinates**: a different way to address points, useful
  for circular phenomena.
- **3D geometry**: planes, lines, distance, parametric curves.

**Strand 3 Advanced and Master** continue: differential geometry of
curves and surfaces, manifolds, non-Euclidean geometries, projective
geometry — and the geometry underlying physics (general relativity).

For now, you have **enough geometry to attack a wide range of real
problems** — surveying, basic physics, hit detection in games, screen
layout, image processing. Every later strand will use it.

## Check Your Understanding

:::widget type=numeric-input prompt="A right triangle has legs $9$ and $40$. Hypotenuse?" answer=41 explain="$\\sqrt{81 + 1600} = \\sqrt{1681} = 41$. Another Pythagorean triple, $(9, 40, 41)$.":::

:::widget type=numeric-input prompt="A circular pool has diameter $10$ m. Its area, using $\\pi = 3.14$? (Round to nearest unit.)" answer=79 explain="$\\pi (5)^2 = 25 \\pi \\approx 78.5 \\approx 79$ m².":::

:::widget type=numeric-input prompt="Two similar triangles. Smaller has area $4$ sq m and side $3$. Larger has corresponding side $9$. What is the larger's area?" answer=36 explain="Linear ratio $3$. Area ratio $9$. $4 \\cdot 9 = 36$.":::

:::widget type=numeric-input prompt="A point $(7, 2)$ is rotated $90°$ counter-clockwise about the origin. Type the new $x$." answer=-2 explain="$(x, y) \\to (-y, x)$. $(7, 2) \\to (-2, 7)$.":::
