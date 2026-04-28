# Floating-Point Representation (IEEE 754)

## Intuition

How do you store 3.14 or 0.001 in a computer that only knows 0s and 1s?
The answer is *scientific notation in binary*.  Just like we write
$6.022 \times 10^{23}$, the computer writes something like
$1.1001 \times 2^{5}$.  This is called **floating-point** because the
decimal point "floats" to different positions depending on the exponent.

The catch: just as 1/3 = 0.333... can't be written exactly in base 10,
some simple numbers like 0.1 can't be written exactly in base 2.

## Prerequisites

- Tier 0, Lesson 2: Number Bases (binary)

## From First Principles

### Binary fractions

In decimal, digits after the point represent negative powers of 10:

$$3.14 = 3 \times 10^0 + 1 \times 10^{-1} + 4 \times 10^{-2}$$

In binary, digits after the point represent negative powers of 2:

$$1.101_2 = 1 \times 2^0 + 1 \times 2^{-1} + 0 \times 2^{-2} + 1 \times 2^{-3}$$
$$= 1 + 0.5 + 0 + 0.125 = 1.625_{10}$$

### Why 0.1 cannot be exact in binary

**Pen & paper: Convert $0.1_{10}$ to binary**

Repeatedly multiply the fractional part by 2:

| Step | Value | Integer part | Fractional part |
|------|-------|-------------|-----------------|
| 0.1 × 2 | 0.2 | **0** | 0.2 |
| 0.2 × 2 | 0.4 | **0** | 0.4 |
| 0.4 × 2 | 0.8 | **0** | 0.8 |
| 0.8 × 2 | 1.6 | **1** | 0.6 |
| 0.6 × 2 | 1.2 | **1** | 0.2 |
| 0.2 × 2 | 0.4 | **0** | 0.4 ← repeats! |

$$0.1_{10} = 0.0\overline{0011}_2$$

The pattern **0011** repeats forever.  With finite bits, we must round — and
that rounding is why `0.1 + 0.2 ≠ 0.3` in Python.

### IEEE 754 single precision (32-bit float)

A 32-bit float has three fields:

| Field | Bits | Purpose |
|-------|------|---------|
| Sign | 1 | 0 = positive, 1 = negative |
| Exponent | 8 | Biased exponent (bias = 127) |
| Mantissa | 23 | Fractional part (leading 1 is implicit) |

**The formula:**

$$(-1)^{sign} \times 1.mantissa \times 2^{exponent - 127}$$

The leading 1 before the mantissa is *free* — we don't store it.  This trick
gives us 24 bits of precision for the price of 23.

### Pen & paper: Encode $-6.5$ in IEEE 754 (32-bit)

**Step 1: Sign**
Negative → sign bit = **1**

**Step 2: Convert 6.5 to binary**
- 6 = $110_2$
- 0.5 = $0.1_2$
- So $6.5 = 110.1_2$

**Step 3: Normalise (scientific notation)**
$$110.1_2 = 1.101 \times 2^2$$

**Step 4: Exponent**
$e = 2$, biased = $2 + 127 = 129 = 10000001_2$

**Step 5: Mantissa**
After the implicit leading 1: $101$ followed by 20 zeros = $10100000000000000000000$

**Result:**
```
1  10000001  10100000000000000000000
S  Exponent  Mantissa
```

### Pen & paper: Decode a float

Given: `0 10000010 01000000000000000000000`

- Sign = 0 → positive
- Exponent = $10000010_2 = 130$, actual = $130 - 127 = 3$
- Mantissa = $1.01_2$ (prepend the implicit 1)
- Value = $1.01_2 \times 2^3 = 1010_2 = 10_{10}$

### Double precision (64-bit)

| Field | Bits | Bias |
|-------|------|------|
| Sign | 1 | — |
| Exponent | 11 | 1023 |
| Mantissa | 52 | — |

This gives about **15–17 significant decimal digits** of precision.

### Special values

| Value | Exponent (all) | Mantissa |
|-------|----------------|----------|
| ±0 | all zeros | all zeros |
| ±∞ | all ones | all zeros |
| NaN | all ones | non-zero |
| Denormalised | all zeros | non-zero |

### Common pitfalls (pen & paper reasoning)

**Why does `0.1 + 0.2 ≠ 0.3`?**

Each is rounded independently when stored:
- `0.1` → nearest 64-bit float → slightly more than 0.1
- `0.2` → nearest 64-bit float → slightly more than 0.2
- Their sum → slightly more than 0.3
- `0.3` → nearest 64-bit float → slightly less than 0.3

So `0.1 + 0.2 > 0.3` by about $5.5 \times 10^{-17}$.

**Never compare floats with `==`.** Use a tolerance:

$$|a - b| < \epsilon$$

## Python Verification

```python
# ── Floating Point: verifying pen & paper work ──────────────
import struct

# The famous problem
print("=== 0.1 + 0.2 ===")
print(f"0.1 + 0.2 = {0.1 + 0.2}")
print(f"0.1 + 0.2 == 0.3? {0.1 + 0.2 == 0.3}")
print(f"Difference: {(0.1 + 0.2) - 0.3:.20e}")

# Binary fraction: 1.101 in binary = 1.625
print("\n=== Binary fractions ===")
val = 1 * 2**0 + 1 * 2**-1 + 0 * 2**-2 + 1 * 2**-3
print(f"1.101 in binary = {val}")

# Examine the bits of -6.5 (verify our hand encoding)
print("\n=== IEEE 754 encoding of -6.5 ===")
packed = struct.pack('>f', -6.5)
bits = ''.join(f'{byte:08b}' for byte in packed)
print(f"Sign:     {bits[0]}")
print(f"Exponent: {bits[1:9]} = {int(bits[1:9], 2)} (bias 127 → {int(bits[1:9], 2) - 127})")
print(f"Mantissa: {bits[9:]}")
print(f"Full:     {bits[0]} {bits[1:9]} {bits[9:]}")

# Decode: 0 10000010 01000000000000000000000
print("\n=== Decoding a float ===")
sign = 0
exp_bits = '10000010'
mantissa_bits = '01000000000000000000000'
exp = int(exp_bits, 2) - 127
mantissa = 1 + int(mantissa_bits, 2) / (2**23)
value = (-1)**sign * mantissa * 2**exp
print(f"Decoded value: {value}")

# Safe comparison
print("\n=== Safe float comparison ===")
a = 0.1 + 0.2
b = 0.3
epsilon = 1e-9
print(f"abs(a - b) < epsilon? {abs(a - b) < epsilon}")
```

## Visualisation — Floating-point precision and the gaps between numbers

Two pictures explain everything: a layout of the IEEE 754 double-
precision bit fields, and the *non-uniform spacing* between
floating-point numbers (the spacing doubles every time the exponent
increases by 1).

```python
# ── Visualising IEEE 754 floating-point ─────────────────────
import numpy as np
import matplotlib.pyplot as plt
import struct

fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# (1) Bit-field diagram for the value 6.5 in IEEE 754 double precision.
# 1 sign bit · 11 exponent bits · 52 mantissa bits.
ax = axes[0]
val = 6.5
bits = bin(struct.unpack(">Q", struct.pack(">d", val))[0])[2:].zfill(64)

# Three coloured rectangles for the three sections of the bit string.
sign_bits = bits[0]
exp_bits  = bits[1:12]
mant_bits = bits[12:]

x = 0
for label, b, color in [("sign\n(1 bit)", sign_bits, "tab:red"),
                         ("exponent\n(11 bits)", exp_bits, "tab:orange"),
                         ("mantissa\n(52 bits)", mant_bits, "tab:blue")]:
    width = len(b) * 0.18 + 0.4
    ax.add_patch(plt.Rectangle((x, 0), width, 1.0, color=color, alpha=0.45,
                                edgecolor="black", lw=2))
    # Bit values inside.
    for i, bit in enumerate(b):
        ax.text(x + 0.2 + i * 0.18, 0.5, bit, ha="center", va="center",
                fontsize=9 if len(b) > 12 else 11, family="monospace")
    ax.text(x + width / 2, 1.2, label, ha="center", fontsize=11, fontweight="bold")
    x += width + 0.3

ax.set_xlim(-0.5, x); ax.set_ylim(-1.5, 2)
ax.axis("off")
ax.set_title(f"IEEE 754 double for the value {val}\nsign·(1 + mantissa)·2^(exp − 1023)")

# Decode and label.
sign = -1 if sign_bits == "1" else 1
exp_val = int(exp_bits, 2) - 1023
mant_val = 1.0 + sum(int(b) / 2**(i+1) for i, b in enumerate(mant_bits))
ax.text(0, -0.6,
        f"sign  = {sign}    "
        f"exp = {int(exp_bits, 2)} − 1023 = {exp_val}    "
        f"mantissa = {mant_val:.6f}    "
        f"→ {sign} × {mant_val:.6f} × 2^{exp_val} = {sign * mant_val * 2**exp_val}",
        fontsize=10)

# (2) Gaps between floats. Spacing is uniform within an exponent
# block, doubling each time the exponent increases.
ax = axes[1]
# For each value v, the next representable double is v + ulp(v).
def ulp(x):
    nx = np.nextafter(x, np.inf)
    return nx - x
xs = np.logspace(-3, 6, 400)
gaps = np.array([ulp(x) for x in xs])
ax.loglog(xs, gaps, color="tab:blue", lw=2)
# Mark a few specific x's.
for x_mark in [0.1, 1, 1024, 1e6]:
    ax.scatter([x_mark], [ulp(x_mark)], color="tab:red", s=80, zorder=5)
    ax.text(x_mark, ulp(x_mark) * 2, f"x = {x_mark}\nulp = {ulp(x_mark):.2e}",
            ha="center", fontsize=8)
ax.set_xlabel("magnitude of x (log)")
ax.set_ylabel("gap to next double  (log)")
ax.set_title("Float spacing doubles with each exponent — \n"
             "absolute precision DROPS as numbers grow")
ax.grid(True, which="both", alpha=0.3)

plt.tight_layout()
plt.show()

# The classic example: why 0.1 + 0.2 ≠ 0.3
print(f"  0.1                    = {0.1:.20f}")
print(f"  0.2                    = {0.2:.20f}")
print(f"  0.1 + 0.2              = {0.1 + 0.2:.20f}")
print(f"  0.3                    = {0.3:.20f}")
print(f"  difference (0.1+0.2 − 0.3) = {0.1 + 0.2 - 0.3:.2e}")
print()
print("Neither 0.1, 0.2, nor 0.3 is representable exactly in binary.")
print("Their closest IEEE 754 doubles round at the 17th decimal place.")
print("Adding the rounded 0.1 and 0.2 lands one ULP away from the rounded 0.3.")
```

**The two facts every numerical-code engineer learns the hard way:**

- **Precision is *relative*, not absolute.** A double has ~15–17
  decimal digits of *relative* precision. The absolute gap between
  representable values doubles every power of 2 — at $x \approx 10^9$
  the gap is already $\sim 2 \cdot 10^{-7}$. This is why physics
  engines that track positions in millions of metres get *jitter*
  near the origin and *catastrophe* at the level boundary; AAA games
  re-centre coordinates on the player every few minutes.
- **`==` on floats is almost always wrong.** Use $|a - b| <
  \varepsilon$ with $\varepsilon$ chosen for the magnitudes
  involved. Better: `math.isclose(a, b)`. ML code does this
  constantly when checking gradients; the sweet $\varepsilon \approx
  10^{-7}$ for relative comparisons in float32, $10^{-15}$ in float64.

## Connection to CS / Games / AI / Business / Industry

- **Neural network weights** — stored as 32-bit or 16-bit floats; precision limits affect training stability
- **Game physics** — accumulated floating-point errors cause objects to drift; games use fixed-point or double precision for positions far from the origin
- **Colour values** — HDR rendering uses 16-bit floats (half-precision) per channel
- **Money** — never use floats for currency! Use integers (cents) or `Decimal`
- **GPU computation** — NVIDIA Tensor Cores use FP16, BF16, TF32 for faster matrix multiply in AI training
- **HFT precision-vs-speed trade-offs (Finance)** — high-frequency trading firms (Citadel Securities, Jane Street, Jump) use fixed-point or 64-bit doubles for prices but mandate exact decimal libraries for clearing/settlement; FIX-protocol decimal fields prevent the floating-point bugs that cost Knight Capital $440M in 2012.
- **Currency rounding & banker's rounding (Business)** — Java `BigDecimal`, .NET `decimal`, and Python `Decimal` are mandatory in QuickBooks, SAP, and Oracle Financials so that 0.005 cents do not vanish across millions of postings; tax authorities (IRS, HMRC) require ROUND_HALF_EVEN for compliance.
- **Aerospace & nuclear-grade numerics (Engineering)** — ARIANE 5 disintegrated in 1996 due to a 64-bit→16-bit float overflow; today, NASA JPL, Airbus, and Westinghouse SCRAM systems use IEEE 754 with rigorous interval arithmetic (INTLAB, MPFR) and certified compilers (CompCert) to bound rounding error.
- **Climate models & scientific computing (Science)** — NOAA GFS, ECMWF IFS, and DOE E3SM weather/climate codes balance FP32 vs FP64 to fit petabyte simulations on Frontier/Fugaku supercomputers; mixed precision is now standard for cost vs accuracy.

## Check Your Understanding

1. **Pen & paper:** Convert $0.75_{10}$ to binary. Is it exact?  (Hint: $0.75 = 0.5 + 0.25$)
2. **Pen & paper:** Encode $5.25$ in IEEE 754 single precision. Show all three fields.
3. **Pen & paper:** What is the largest number a 32-bit float can represent?
   (Hint: exponent = 254, mantissa = all ones)
4. **Think about it:** Why do GPUs use 16-bit floats for AI training instead of 64-bit?
