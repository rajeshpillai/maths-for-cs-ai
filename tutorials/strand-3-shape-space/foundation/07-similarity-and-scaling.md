---
strand: shape-space
level: foundation
order: 7
title: Similarity and Scaling
prerequisites:
  - tier: strand-3-shape-space-foundation
    slug: 04-triangle-theorems
    description: Triangle similarity (intro)
connections:
  - strand-3-shape-space-foundation/08-transformations
applications:
  - cs: "Image resizing, level-of-detail rendering, font scaling"
  - business: "Architectural blueprints, scale-model prototypes"
  - games: "Distance-based detail tiers, perspective scaling"
  - life: "Photo enlargement, baking-recipe scaling, drug-dosage scaling"
---

# Similarity and Scaling

## Mental

Two shapes are **similar** when they have the **same shape** but
possibly different sizes. Formally, one is a scaled-up (or down)
copy of the other.

For polygons, similarity means:

- **Corresponding angles are equal.**
- **Corresponding sides are in the same ratio.**

That ratio is the **scale factor** $k$. If $k = 2$, the second shape
is twice the size of the first. If $k = \tfrac{1}{2}$, half the size.

Lesson 04 already showed this for triangles. The concept extends to
**any** pair of corresponding shapes.

The crucial scaling laws (from Lesson 04, generalised):

| Quantity | Scales by |
|---|---|
| Linear measures (sides, perimeters) | $k$ |
| Areas (any 2D measure) | $k^2$ |
| Volumes (any 3D measure) | $k^3$ |

This is one of mathematics' most consequential rules — it explains
why baby elephants exist but baby insects don't, why a $2 \times$
larger car uses $\sim 4 \times$ the surface paint, why pizza prices
scale roughly with diameter squared.

## Why "the bigger shape is the same shape"

Two shapes are similar if and only if you can transform one into
the other by **uniform scaling** (about some point), possibly with a
rotation or reflection. The uniform scaling — multiplying every
distance by $k$ — preserves angles and the *ratios* of distances.

A photograph enlarged $\times 3$ is similar to the original. So is
a blueprint at $1:50$ scale. A "scaled" version of a triangle drawn
on graph paper is similar to the triangle on a smaller grid.

## Interactive

Two similar triangles with scale factor $2$:

:::widget type=coordinate-plane points=[{"x":0,"y":0,"label":"A"},{"x":3,"y":0,"label":"B"},{"x":0,"y":2,"label":"C"},{"x":6,"y":0,"label":"D"},{"x":12,"y":0,"label":"E"},{"x":6,"y":4,"label":"F"}] segments=[{"from":0,"to":1,"label":"3"},{"from":1,"to":2},{"from":2,"to":0,"label":"2"},{"from":3,"to":4,"label":"6"},{"from":4,"to":5},{"from":5,"to":3,"label":"4"}] xMin=-1 xMax=13 yMin=-1 yMax=5:::

The right triangle on the left has legs $2$ and $3$; on the right,
legs $4$ and $6$. Same angles. Sides scaled by $k = 2$.

:::widget type=numeric-input prompt="A blueprint is $1:50$ scale. A wall on the blueprint measures $4$ cm. What's the actual wall length, in cm?" answer=200 explain="$4 \\cdot 50 = 200$ cm $= 2$ m. The blueprint scale is the inverse — every blueprint cm is $50$ cm in reality.":::

:::widget type=numeric-input prompt="A scale model car is $\\tfrac{1}{20}$ the size of the real car. The real car is $4.6$ m long. How long is the model? (Type the decimal in metres.)" answer=0.23 tolerance=0.005 explain="$4.6 / 20 = 0.23$ m or $23$ cm.":::

:::widget type=numeric-input prompt="Two similar shapes have linear scale ratio $1:3$. The smaller has area $7$ sq m. The larger has area...?" answer=63 explain="Area scales by $k^2 = 9$. $7 \\cdot 9 = 63$.":::

:::widget type=numeric-input prompt="Two similar buildings have heights $20$ m and $50$ m. The smaller has volume $4000$ m³. The larger has volume...?" answer=62500 explain="Linear ratio $50/20 = 2.5$. Volume scales by $2.5^3 = 15.625$. $4000 \\cdot 15.625 = 62500$ m³.":::

:::widget type=step-revealer
{
  "title": "Why baby elephants exist but baby flies don't",
  "steps": [
    {"prose": "An elephant scaled down to $\\tfrac{1}{10}$ size in every dimension would have $\\tfrac{1}{1000}$ the volume — that is, $\\tfrac{1}{1000}$ the mass. Surface area would scale by only $\\tfrac{1}{100}$."},
    {"math": "\\frac{\\text{surface area}}{\\text{volume}} = \\frac{1/100}{1/1000} = 10 \\times \\text{the original ratio}", "prose": "**A small animal has a much higher surface-to-volume ratio.** This is critical for biology."},
    {"prose": "**Heat loss** scales with surface area. **Heat production** scales with volume (with mass). Smaller animals lose heat faster relative to their mass — they need more food per unit body weight."},
    {"prose": "**Drag and friction** scale with surface area. A house fly's drag is dominant; an elephant's gravity is dominant. That's why flies can land on ceilings and elephants cannot."},
    {"prose": "**Strength** scales with cross-sectional area ($k^2$). **Weight** scales with volume ($k^3$). Doubling an animal's size makes it $4 \\times$ stronger but $8 \\times$ heavier — relatively weaker."},
    {"prose": "Galileo first noted this in 1638 (*Two New Sciences*). It explains why insects can lift many times their body weight while elephants struggle to walk uphill — and why mythical $50$-foot men cannot exist (their bones would shatter under their weight)."}
  ]
}
:::

## Symbolic

Two figures $F_1$ and $F_2$ are **similar** ($F_1 \sim F_2$) if there's
a scale factor $k > 0$ and a rigid motion (translation, rotation,
reflection) that maps $F_1$ onto $F_2$ after scaling by $k$.

For two similar shapes with scale factor $k$:

| Quantity | Ratio (small : large) |
|---|---|
| Lengths | $1 : k$ |
| Areas | $1 : k^2$ |
| Volumes | $1 : k^3$ |

A useful corollary: if you know the **ratio** of two shapes' areas
and they are similar, you can find the linear ratio:

$$
k = \sqrt{\frac{A_2}{A_1}}.
$$

For volumes: $k = \sqrt[3]{V_2 / V_1}$.

The angle-preserving property is what makes similarity a **conformal**
transformation. Maps that preserve angles but not areas — like
Mercator projection — are conformal but not similar in the strict
sense.

## Computational

```python
def scale_polygon(vertices, k):
    """Scale a polygon (list of (x, y)) by factor k from the origin."""
    return [(k * x, k * y) for x, y in vertices]

triangle = [(0, 0), (3, 0), (0, 4)]
scaled = scale_polygon(triangle, 2)
print(scaled)   # [(0, 0), (6, 0), (0, 8)]

# Areas
def triangle_area(verts):
    (x1, y1), (x2, y2), (x3, y3) = verts
    return abs(x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2)) / 2

print(triangle_area(triangle))   # 6.0
print(triangle_area(scaled))     # 24.0  — 4 × original (= 2²)

# Verify the k³ volume rule for a cube
def cube_volume(side):
    return side ** 3

print(cube_volume(1))   # 1
print(cube_volume(2))   # 8 — 2³ × original
print(cube_volume(3))   # 27 — 3³ × original
```

In graphics, an "image resize by $k \times$" is a similarity
transformation on every pixel. CSS `transform: scale(k)` does the
same for HTML elements.

## Derivational

*Why* does area scale by $k^2$?

Pick any 2D shape. Its area is determined by lengths in two
independent directions (e.g., horizontal and vertical extent). Under
scaling by $k$, **each** length scales by $k$. Area, being roughly a
"product" of two length measurements, scales by $k \cdot k = k^2$.

For a rectangle, this is concrete: width $w$ → $kw$, height $h$ →
$kh$, area $w h$ → $kw \cdot kh = k^2 w h$.

For arbitrary shapes, the same applies because the shoelace formula
(Lesson 05) is a sum of terms, each with two coordinate factors —
each multiplied by $k$ under scaling.

The same argument scales: $k^3$ for $3$D volumes (three independent
length factors), $k^n$ for $n$-dimensional measures. This is the
**dimensionality** of the measure. It's one of the deepest geometric
principles.

## Connective

Similarity unifies many of the strand's ideas:

- **Lesson 04 (Triangle theorems)**: AA-similarity for triangles.
- **Lesson 05 (Area)**: $k^2$ scaling consequence.
- **Lesson 06 (Circles)**: all circles are similar to each other —
  scaled by their radii. Why $\pi = C/d$ is a universal constant.
- **Lesson 08 (Transformations)**: similarity transformations are
  scaling + rotation + reflection + translation.
- **Trigonometry** (Strand 3 Intermediate): sine and cosine are
  **ratios** in similar right triangles — same ratios for all
  similar triangles.
- **Calculus** (Strand 4): linearisation is local similarity — a
  curve looks like its tangent line at any small enough scale.

## Applied

- **Photo enlargement**: enlarging $\times 4$ requires $16 \times$
  the paper area — a fact print shops price into.
- **Architectural scale models**: a $1:100$ model is similar to the
  building. Its volume is $\tfrac{1}{1\,000\,000}$ — a million
  times smaller — useful for affordable physical prototyping.
- **Drug dosage scaling**: scaling a dosage by body mass is a $k^3$
  problem; scaling by surface area (sometimes more biologically
  relevant) is $k^2$. Pediatric dosing is a contentious topic
  precisely because the right scaling depends on the drug.
- **Aerodynamic drag**: drag force scales with cross-section area,
  $k^2$. Wind resistance on a $2 \times$ larger object is $4 \times$
  larger.
- **Square-cube law in engineering**: bridges scale up by reinforcing
  cross-sections to compensate for $k^3$ weight increase against $k^2$
  cross-section strength. Why bridge designs change with span.
- **Map zoom**: zooming a map $\times 2$ shows half the area at twice
  the detail. The $k^2$ rule again — visible area scales as zoom².

## Check Your Understanding

:::widget type=numeric-input prompt="Two similar pentagons have side ratio $2:5$. What is the ratio of their areas?" answer=4 explain="Area ratio = (linear ratio)². But the question asks numerator only — actually the area ratio $4:25$. The smaller-to-larger area is $4/25$. If the question asks for $k^2$ for the smaller-to-larger linear ratio: $4$.":::

:::widget type=numeric-input prompt="A ball of radius $5$ cm and one of radius $15$ cm. Volume ratio of small to large?" answer=27 explain="Linear ratio $5:15 = 1:3$. Volume ratio $1:27$. The larger ball is $27$ times the smaller.":::

:::widget type=numeric-input prompt="A blueprint is $1:200$ scale. A 25 cm² area on the blueprint represents how many m² in reality? (1 m = 100 cm.)" answer=100 explain="Linear scale: $200 \\times$. Area scale: $200^2 = 40\\,000 \\times$. Real area: $25 \\cdot 40\\,000 = 1\\,000\\,000$ cm² $= 100$ m².":::

:::widget type=numeric-input prompt="A car is $4$ m long. A scale model is $20$ cm long. What's the linear scale factor? (Type the larger number — i.e. real-to-model.)" answer=20 explain="$4 \\text{ m} = 400 \\text{ cm}$. Real:model = $400:20 = 20:1$. The factor is $20$.":::
