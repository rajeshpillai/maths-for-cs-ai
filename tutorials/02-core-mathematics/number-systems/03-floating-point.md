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

## Connection to CS / Games / AI

- **Neural network weights** — stored as 32-bit or 16-bit floats; precision limits affect training stability
- **Game physics** — accumulated floating-point errors cause objects to drift; games use fixed-point or double precision for positions far from the origin
- **Colour values** — HDR rendering uses 16-bit floats (half-precision) per channel
- **Money** — never use floats for currency! Use integers (cents) or `Decimal`
- **GPU computation** — NVIDIA Tensor Cores use FP16, BF16, TF32 for faster matrix multiply in AI training

## Check Your Understanding

1. **Pen & paper:** Convert $0.75_{10}$ to binary. Is it exact?  (Hint: $0.75 = 0.5 + 0.25$)
2. **Pen & paper:** Encode $5.25$ in IEEE 754 single precision. Show all three fields.
3. **Pen & paper:** What is the largest number a 32-bit float can represent?
   (Hint: exponent = 254, mantissa = all ones)
4. **Think about it:** Why do GPUs use 16-bit floats for AI training instead of 64-bit?
