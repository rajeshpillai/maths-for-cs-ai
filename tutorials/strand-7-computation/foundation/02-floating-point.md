---
strand: computation
level: foundation
order: 2
title: IEEE 754 Floating Point
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 01-number-representation
    description: Number representation
connections:
  - strand-7-computation-foundation/03-big-o-intuition
applications:
  - cs: "Why 0.1 + 0.2 ≠ 0.3, GPU compute precision, ML training stability"
  - life: "Real numbers don't fit on finite hardware"
---

# IEEE 754 Floating Point

## Explain Like I Am 7

Imagine you only have room on a postcard for *eight* digits, but you
want to write down the size of an ant **and** the distance to the
moon.  The trick is to write a small number plus a "shift the decimal
point this many places" tag — a bit like saying "$3.14$ and slide it
six places."  This works great, but tiny in-between numbers have to
get rounded to the nearest spot the postcard *can* write, which is why
$0.1 + 0.2$ comes out a hair off from $0.3$ — the postcard simply has
no slot for the exact answer.

## Mental

Real numbers are infinite-precision; computer storage is finite.
**Floating point** is the standard way to approximate real numbers
in a fixed number of bits.

The idea is **scientific notation in base 2**:

$$
x = (-1)^s \cdot (1.f) \cdot 2^{e - \text{bias}}.
$$

- **$s$**: 1 sign bit.
- **$e$**: exponent (8 bits in float32, 11 in float64).
- **$f$**: fraction / mantissa (23 bits in float32, 52 in float64).
- **bias**: 127 for float32, 1023 for float64.

## Float32 layout

```
[ s ][      e (8 bits)      ][              f (23 bits)              ]
 1                          9                                        32
```

A 32-bit float represents about $\pm 3.4 \times 10^{38}$ in magnitude
with about $7$ decimal digits of precision.

## The famous puzzle

```
>>> 0.1 + 0.2
0.30000000000000004
```

Why? In binary, $0.1$ is a **repeating fraction**:

$0.1_{10} = 0.0\,0011\,0011\,0011\,0011\,\ldots_2$

After truncation to 52 fraction bits, we store an approximation.
The same for $0.2$. Their sum, in exact arithmetic, isn't quite $0.3$
either after rounding. The error is real.

**Lesson**: never test float equality with `==` in production code.
Always use a tolerance.

## Special values

IEEE 754 reserves bit patterns for:

- **$\pm \infty$**: exponent all 1s, mantissa 0.
- **NaN** (Not a Number): exponent all 1s, mantissa non-zero.
- **Subnormal numbers**: very small numbers near 0 with a different
  layout, allowing graceful underflow.
- **Signed zero**: $+0$ and $-0$ exist separately. They compare equal
  but $1/+0 = +\infty$, $1/-0 = -\infty$.

## Interactive

:::widget type=numeric-input prompt="$0.1 + 0.2$ in Python — does it equal $0.3$? Type 1 for yes, 0 for no." answer=0 explain="No — it equals $0.30000000000000004$.":::

:::widget type=numeric-input prompt="A float32 has 32 bits. Number of mantissa (fraction) bits?" answer=23 explain="$23$.":::

:::widget type=numeric-input prompt="A float64 has 64 bits. Number of mantissa bits?" answer=52 explain="$52$.":::

:::widget type=numeric-input prompt="$1.0 / 0.0$ in IEEE 754 produces $\\infty$ (1) or an error (0)?" answer=1 explain="$+\\infty$ — IEEE 754 doesn't raise on $1/0$.":::

## Symbolic

**Machine epsilon** $\varepsilon$: the smallest $\varepsilon$ such
that $1 + \varepsilon \ne 1$ in floating point.

- float32: $\varepsilon \approx 1.19 \times 10^{-7}$.
- float64: $\varepsilon \approx 2.22 \times 10^{-16}$.

Tells you "$\sim 7$ digits of relative precision" for float32 and
"$\sim 15-16$ digits" for float64.

**Catastrophic cancellation**: subtracting two nearly-equal floats
loses many significant digits. Example: $\sqrt{x + 1} - \sqrt{x}$
loses precision for large $x$. Better:
$\frac{1}{\sqrt{x+1} + \sqrt{x}}$ — algebraically equal, numerically
much more accurate.

**Float comparison**: instead of `a == b`, use
`abs(a - b) < tol` or `abs(a - b) < tol * max(abs(a), abs(b))` for
relative tolerance.

## Computational

```python
import math
import struct

# The classic puzzle
print(0.1 + 0.2)           # 0.30000000000000004
print(0.1 + 0.2 == 0.3)    # False
print(math.isclose(0.1 + 0.2, 0.3))   # True (uses tolerance)

# Machine epsilon
print(2.0 ** -52)          # 2.22e-16 — float64 epsilon

# Special values
print(float("inf"))         # inf
print(float("nan"))         # nan
print(float("nan") == float("nan"))   # False — NaN is not equal to itself

# Bit pattern of a float
def bits_of(x):
    return ''.join(f'{b:08b}' for b in struct.pack('>f', x))

print(bits_of(0.0))        # all zeros
print(bits_of(1.0))        # 00111111100000000000000000000000
print(bits_of(-0.0))       # 10000000000000000000000000000000

# Catastrophic cancellation demo
x = 1e9
print(math.sqrt(x + 1) - math.sqrt(x))               # ~1.58e-5 — noisy
print(1 / (math.sqrt(x + 1) + math.sqrt(x)))         # ~1.58e-5 — clean
```

## Applied

- **ML training instability** — gradients vanishing or exploding
  from float underflow/overflow in deep networks.
- **GPU compute** — modern GPUs use mixed precision (float32 for
  weights, float16/bfloat16 for activations) to fit bigger models.
- **Financial software** — never use floats for currency. Use
  `decimal.Decimal` or fixed-point arithmetic — rounding floats
  loses cents.
- **Computer graphics** — z-buffer precision affects depth rendering;
  inverse-square-root is famously approximated with bit-level magic
  in Quake III.
- **Scientific computing** — adaptive step-size solvers monitor
  numerical error to maintain precision.

## Check Your Understanding

:::widget type=numeric-input prompt="$\\text{float32}$ machine epsilon $\\approx 2^{-23} \\approx 1.19 \\times 10^{-7}$. Number of decimal digits of precision: $\\approx 7$. Type 7." answer=7 explain="$\\sim 7$ decimal digits.":::

:::widget type=numeric-input prompt="float64 has $\\approx 16$ digits of precision. Type 16." answer=16 explain="$\\sim 15$–$16$ digits.":::

:::widget type=numeric-input prompt="NaN $==$ NaN? Type 0 for false." answer=0 explain="False — NaN compares unequal even to itself.":::

:::widget type=numeric-input prompt="To test float equality robustly: use a tolerance. Type 1 if true." answer=1 explain="Yes.":::
