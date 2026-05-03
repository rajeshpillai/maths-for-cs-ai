---
strand: number-quantity
level: intermediate
order: 9
title: Complex Numbers — A New Kind of Quantity
prerequisites:
  - tier: strand-1-number-quantity-intermediate
    slug: 07-surds-and-exact-arithmetic
    description: Surds and exact arithmetic
connections:
  - strand-1-number-quantity-foundation/05-negative-numbers
applications:
  - cs: "Fast Fourier Transform (FFT), digital signal processing, quantum simulation"
  - business: "AC circuit analysis (every electrical engineer); RLC circuits"
  - games: "2D rotations as complex multiplications; rendering tricks"
  - life: "Audio EQ filters, MRI image reconstruction, wave physics"
---

# Complex Numbers — A New Kind of Quantity

## Mental

Lesson 05 (Foundation) extended whole numbers to **negatives**: a
new kind of number the natural-counting school was forced to admit
to handle subtraction freely. Negative numbers feel ordinary now,
but it took mathematicians until the $17$th century to fully accept
them. (Even Newton was reluctant to call $-3$ a "number"
proper.)

Now we extend the number system again — to handle **square roots of
negatives**.

The equation $x^2 + 1 = 0$ has no real solution, because every real
number squares to a non-negative result. So mathematicians did the
sensible thing: **invent a new number** that satisfies the missing
property. They called it $i$ for "imaginary" (a name that has
unfortunately stuck), and *defined*

$$
i^2 = -1.
$$

Once you accept that $i$ exists as a number obeying ordinary
arithmetic, all of the following are determined:

$$
i^1 = i, \quad i^2 = -1, \quad i^3 = i^2 \cdot i = -i, \quad i^4 = i^2 \cdot i^2 = 1.
$$

Then $i^5 = i$ and the cycle repeats with period $4$. Powers of $i$
trace a four-step cycle.

A **complex number** is any expression $a + bi$ where $a$ and $b$
are real. $a$ is called the **real part**, $b$ the **imaginary
part**. Examples:

$$
3 + 2i, \quad 1 - i, \quad -7 + 0i = -7, \quad 0 + 5i = 5i.
$$

Real numbers are complex numbers with $b = 0$. Pure imaginaries are
complex numbers with $a = 0$. Complex numbers contain both.

The single biggest payoff: **every** polynomial equation has a
solution. With real numbers alone, $x^2 + 1 = 0$ is unsolvable. With
complex numbers, $x^2 + 1 = (x - i)(x + i) = 0$ has solutions $\pm
i$. The **fundamental theorem of algebra** (Strand 2) generalises:
every polynomial of degree $n$ over the complex numbers has exactly
$n$ roots (counting multiplicities). The complexes are
*algebraically closed*.

The second payoff: **complex multiplication is rotation**. Strand 3
(Shape & Space) builds out the geometry; we'll see the start of
that picture below.

## Arithmetic with complex numbers

Treat complex numbers like polynomials in $i$, then simplify using
$i^2 = -1$.

**Addition**: add real and imaginary parts separately.

$$
(3 + 2i) + (1 - 4i) = 4 - 2i.
$$

**Subtraction**: same.

$$
(3 + 2i) - (1 - 4i) = 2 + 6i.
$$

**Multiplication**: distribute, then simplify $i^2 \to -1$.

$$
(3 + 2i)(1 - 4i) = 3 - 12i + 2i - 8i^2 = 3 - 10i - 8(-1) = 11 - 10i.
$$

**Division**: multiply numerator and denominator by the **conjugate**
of the denominator. The conjugate of $a + bi$ is $a - bi$, and the
product

$$
(a + bi)(a - bi) = a^2 - (bi)^2 = a^2 + b^2
$$

is always **real**. (This is exactly the surd-conjugate trick from
Lesson 07, with $i$ in place of $\sqrt{2}$.)

For example:

$$
\frac{1 + i}{2 - i} = \frac{(1 + i)(2 + i)}{(2 - i)(2 + i)} = \frac{2 + i + 2i + i^2}{4 - i^2} = \frac{2 + 3i - 1}{4 + 1} = \frac{1 + 3i}{5} = \frac{1}{5} + \frac{3}{5} i.
$$

Multiplication by $i$ has a special interpretation: it **rotates by
90°** in the complex plane.

$$
i \cdot 1 = i, \quad i \cdot i = -1, \quad i \cdot (-1) = -i, \quad i \cdot (-i) = 1.
$$

The four points $1, i, -1, -i$ sit at the corners of a square in the
"complex plane" — a $2$D plot with real part on the horizontal axis
and imaginary part on the vertical. Multiplying by $i$ rotates each
point $90°$ counterclockwise. This is **why** complex numbers are
the natural language for $2$D rotations.

## Interactive

:::widget type=numeric-input prompt="Compute $i^7$. (Use the cycle: $i^1, i^2, i^3, i^4, i^5, i^6, i^7$. Type 1 if the answer is $1$, $-1$ if $-1$, $2$ if $i$, $3$ if $-i$.)" answer=3 explain="$i^4 = 1$, so $i^7 = i^4 \\cdot i^3 = 1 \\cdot (-i) = -i$. Type **3** for $-i$. (The cycle: $i^1=i, i^2=-1, i^3=-i, i^4=1$, repeat.)":::

:::widget type=numeric-input prompt="$(2 + 3i) + (4 - i) = a + bi$. Type $a$." answer=6 explain="Real parts: $2 + 4 = 6$. Imaginary parts: $3 - 1 = 2$. Answer: $6 + 2i$.":::

:::widget type=numeric-input prompt="$(2 + 3i) + (4 - i) = a + bi$. Type $b$." answer=2 explain="Imaginary part: $3 + (-1) = 2$.":::

:::widget type=numeric-input prompt="$(1 + i)(1 - i) = ?$ Type the result. (Both parts are integers; type the real part.)" answer=2 explain="$(1)(1) - (1)(i) + (i)(1) - (i)(i) = 1 - i + i - i^2 = 1 - (-1) = 2$. Real part is $2$, imaginary part is $0$. Result: $2$.":::

:::widget type=numeric-input prompt="$(3 + i)(3 - i) = ?$ (Conjugate product.)" answer=10 explain="$(a + bi)(a - bi) = a^2 + b^2 = 9 + 1 = 10$. Always real, always non-negative.":::

:::widget type=numeric-input prompt="What is $i \\cdot i \\cdot i \\cdot i$? (Hint: $i^4$.)" answer=1 explain="$i^4 = (i^2)^2 = (-1)^2 = 1$. The cycle of powers of $i$ has period $4$.":::

:::widget type=step-revealer
{
  "title": "Why complex numbers solve every quadratic",
  "steps": [
    {"prose": "Recall the quadratic formula: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$. The expression $b^2 - 4ac$ is called the **discriminant**."},
    {"prose": "When the discriminant is positive, the square root is real. Two real solutions."},
    {"prose": "When the discriminant is zero, $\\sqrt{0} = 0$. One repeated real solution."},
    {"prose": "When the discriminant is **negative** — say $-7$ — the standard quadratic formula seems to fail. $\\sqrt{-7}$ isn't real."},
    {"math": "\\sqrt{-7} = \\sqrt{7 \\cdot (-1)} = \\sqrt{7} \\cdot \\sqrt{-1} = \\sqrt{7} \\cdot i = i\\sqrt{7}", "prose": "But with $i = \\sqrt{-1}$, we can absorb the negative. The square root of any negative real is just $i$ times the square root of its absolute value."},
    {"prose": "So $\\sqrt{-7} = i\\sqrt{7}$, and the 'unsolvable' quadratic now has two complex solutions."},
    {"math": "x^2 + x + 2 = 0 \\Rightarrow x = \\frac{-1 \\pm \\sqrt{-7}}{2} = \\frac{-1 \\pm i\\sqrt{7}}{2}", "prose": "**No quadratic is unsolvable** in the complex numbers. The fundamental theorem of algebra (Strand 2) extends this to *every* polynomial of any degree."}
  ]
}
:::

## The complex plane

A complex number $a + bi$ is naturally a point $(a, b)$ in $2$D
space — the **complex plane** or **Argand diagram**. The horizontal
axis is the real part, the vertical axis is the imaginary part.

**Addition** of complex numbers becomes vector addition in this
plane: $(3 + 2i) + (1 - 4i) = 4 - 2i$ matches "translate from
$(3, 2)$ by $(1, -4)$, land at $(4, -2)$."

**Multiplication** has two equivalent geometric meanings:

- The **modulus** (length, distance from origin) of $a + bi$ is $|a +
  bi| = \sqrt{a^2 + b^2}$. Multiplication multiplies moduli.
- The **argument** (angle from positive real axis) of $a + bi$ is
  $\arg(a + bi) = \arctan(b/a)$. Multiplication adds arguments.

So multiplying two complex numbers **multiplies their lengths and
adds their angles**. Multiplying by $i$ has modulus $1$ and argument
$90°$, hence "rotation by $90°$." Multiplying by a complex number of
modulus $1$ and argument $\theta$ rotates by $\theta$ — the basis
of $2$D rotation in computer graphics, robotics, and physics.

This geometric structure is what Strand 3 (Shape & Space) extends.
For now, just notice that complex numbers carry **both magnitude and
direction** in a single object. They're the natural calculator for
two-dimensional quantities.

## Computational

Python has complex numbers built in:

```python
z = 3 + 2j      # Python uses 'j' instead of 'i' (electrical engineering tradition)
print(z)        # (3+2j)
print(z.real)   # 3.0
print(z.imag)   # 2.0

w = 1 - 4j
print(z + w)            # (4-2j)
print(z * w)            # (11-10j)   — agrees with our hand computation
print(z / w)            # (-0.294... + 0.823...j)

# Modulus and argument
print(abs(z))           # 3.605... = sqrt(13)
import cmath
print(cmath.phase(z))   # 0.588... radians (≈ 33.7°)

# Powers of i
print(1j ** 1)          # 1j
print(1j ** 2)          # (-1+0j)
print(1j ** 3)          # -1j (with tiny float error)
print(1j ** 4)          # (1+0j)
```

The notation `1j` is Python's "imaginary unit times $1$" — Python
deliberately uses $j$ rather than $i$ to avoid clashes with common
loop-variable names. Complex literal syntax: `1 + 2j` is identical
to `complex(1, 2)`.

For exact symbolic complex arithmetic:

```python
from sympy import I, sqrt, simplify

z = 1 + I    # use 'I' for the imaginary unit
print(z * z)        # (1 + I)**2  unsimplified
print(simplify(z * z))   # 2*I

# Complex conjugate
print(z.conjugate())    # 1 - I

# Solving a complex quadratic exactly
from sympy import symbols, solve
x = symbols("x")
print(solve(x**2 + x + 2, x))
# [-1/2 - sqrt(7)*I/2, -1/2 + sqrt(7)*I/2]
```

SymPy's complex algebra is exact — useful when float precision
matters, or when you want to prove identities symbolically.

## Derivational

*Why* is $(a + bi)(a - bi) = a^2 + b^2$?

Just expand and apply $i^2 = -1$:

$$
(a + bi)(a - bi) = a^2 - abi + abi - b^2 i^2 = a^2 - b^2(-1) = a^2 + b^2.
$$

The cross-terms cancel; the imaginary $i^2$ becomes $-1$, flipping
the sign on the $b^2$ term. The result is real and non-negative —
which is why this product is the natural "size squared" for complex
numbers (the modulus squared).

*Why* does multiplication by $i$ rotate by $90°$?

Because $i = 0 + 1 \cdot i$ has modulus $1$ and argument $90°$. Any
multiplication multiplies moduli and adds arguments. So
multiplication by $i$ leaves the modulus unchanged ($\times 1$) and
adds $90°$ to the argument — exactly what "rotate by $90°$" means.

The formal proof needs polar form ($r e^{i\theta}$) and Euler's
formula ($e^{i\theta} = \cos\theta + i \sin\theta$), which Strand
1 Advanced will derive. For now, the four-point verification (try
$1, i, -1, -i$ and see they rotate around) is enough.

## Connective

Complex numbers are the gateway to several big strands:

- **Strand 2 (Structure)**: the complex numbers form a **field** —
  the largest "nice" extension of the reals. Many algebra theorems
  are cleaner over $\mathbb{C}$.
- **Strand 3 (Shape & Space)**: complex multiplication models 2D
  rotations exactly. Quaternions (4D analogues) handle 3D rotations
  the same way.
- **Strand 4 (Change)**: $e^{i\theta}$ — Euler's formula — links
  exponentials, sines, cosines, and complex numbers. The most
  beautiful equation in mathematics, $e^{i\pi} + 1 = 0$, falls out.
- **Strand 9 (Fourier Analysis)**: every periodic signal decomposes
  into complex exponentials. The Fast Fourier Transform — the
  workhorse of digital signal processing — is fundamentally complex
  arithmetic.
- **Strand 10 (Quantum)**: quantum mechanics is *built* on complex
  vectors. There is no real-number formulation that works.

The journey of "what counts as a number" — naturals → integers →
rationals → reals → complexes — is one of mathematics' great
expansions. Each extension was forced by needing to solve some
equation type that the previous system couldn't (subtraction,
division, square roots of $2$, square roots of $-1$). Each
extension feels strange when you first meet it. The complexes are
the last extension on this particular ladder; in a precise sense,
nothing further is needed.

## Applied

- **AC electrical circuits**: alternating-current voltages and
  currents are sinusoidal. Engineers represent them as complex
  numbers (called **phasors**) where modulus = amplitude and argument
  = phase. Complex impedance combines resistance and reactance into
  a single number. Every electrical engineer learns this.
- **Digital signal processing**: the FFT (Fast Fourier Transform)
  takes a real signal (audio, image, sensor reading) and decomposes
  it into complex frequency components. Every WiFi, every MP3,
  every JPEG image starts with an FFT.
- **2D rotations in graphics**: a point $(x, y)$ as $z = x + iy$
  rotates by angle $\theta$ via $z \cdot e^{i\theta}$. Equivalent to
  matrix multiplication, but more compact.
- **Quaternions (3D rotations)**: a $4$-dimensional generalisation
  of complex numbers that smoothly rotates in 3D without gimbal
  lock. Used in flight simulators, video games, robotics, and
  spacecraft navigation.
- **Quantum computing**: qubit states are complex vectors. Quantum
  gates are complex unitary matrices. Without complex numbers,
  there is no quantum mechanics — and no quantum computing.
- **Mandelbrot set**: defined by iterating $z \to z^2 + c$ with
  complex $c$. The boundary is a fractal; visualising it depends
  entirely on complex arithmetic.

## Check Your Understanding

:::widget type=numeric-input prompt="$i^{100} = ?$ (Type 1, -1, 2 for $i$, or 3 for $-i$.)" answer=1 explain="$100 \\bmod 4 = 0$, so $i^{100} = i^0 = 1$. (Or: $i^{100} = (i^4)^{25} = 1^{25} = 1$.)":::

:::widget type=numeric-input prompt="The conjugate of $4 + 7i$ is $a + bi$. What is $b$?" answer=-7 explain="Conjugate negates the imaginary part: $4 + 7i \\to 4 - 7i$. So $b = -7$.":::

:::widget type=numeric-input prompt="What is the modulus of $3 + 4i$?" answer=5 explain="$|3 + 4i| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$. Famous Pythagorean triple.":::

:::widget type=numeric-input prompt="$(2 + i)(3 - 2i)$ — find the real part." answer=8 explain="$6 - 4i + 3i - 2i^2 = 6 - i - 2(-1) = 6 + 2 - i = 8 - i$. Real part $8$.":::
