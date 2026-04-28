# Number Bases — Binary, Octal, Hex

## Intuition

We count in base 10 because we have 10 fingers.  Computers count in base 2
because transistors have two states: on (1) and off (0).  Hex (base 16) is
just a compact way to write long binary strings — every 4 bits map to one hex
digit.

## Prerequisites

- Tier 0, Lesson 1: Number Systems (natural numbers)

## From First Principles

### What is a "base"?

A number like **347** in base 10 really means:

$$347_{10} = 3 \times 10^2 + 4 \times 10^1 + 7 \times 10^0$$

Each digit is multiplied by its **positional weight** — a power of the base.

**General rule:** In base $b$, the digits go from 0 to $b-1$, and the number
$d_n d_{n-1} \dots d_1 d_0$ means:

$$\sum_{i=0}^{n} d_i \times b^i$$

### Binary (Base 2)

Only two digits: **0** and **1** (called *bits*).

**Pen & paper: Convert $1011_2$ to decimal**

Write out the positional weights right-to-left:

| Position | 3 | 2 | 1 | 0 |
|----------|---|---|---|---|
| Digit    | 1 | 0 | 1 | 1 |
| Weight   | $2^3=8$ | $2^2=4$ | $2^1=2$ | $2^0=1$ |

$$1011_2 = 1 \times 8 + 0 \times 4 + 1 \times 2 + 1 \times 1 = 11_{10}$$

**Pen & paper: Convert $25_{10}$ to binary**

Repeatedly divide by 2 and collect remainders (read bottom to top):

| Step | Quotient | Remainder |
|------|----------|-----------|
| 25 ÷ 2 | 12 | **1** |
| 12 ÷ 2 | 6  | **0** |
| 6 ÷ 2  | 3  | **0** |
| 3 ÷ 2  | 1  | **1** |
| 1 ÷ 2  | 0  | **1** |

Read remainders bottom → top: $25_{10} = 11001_2$

**Verify:** $1 \times 16 + 1 \times 8 + 0 \times 4 + 0 \times 2 + 1 \times 1 = 25$ ✓

### Octal (Base 8)

Digits: 0–7.  Each octal digit represents exactly **3 binary digits**.

$$752_8 = 7 \times 64 + 5 \times 8 + 2 \times 1 = 448 + 40 + 2 = 490_{10}$$

### Hexadecimal (Base 16)

Digits: 0–9 and A=10, B=11, C=12, D=13, E=14, F=15.

Each hex digit represents exactly **4 binary digits** (a *nibble*).

**Pen & paper: Convert $\text{2F}_{16}$ to decimal**

$$\text{2F}_{16} = 2 \times 16 + 15 \times 1 = 32 + 15 = 47_{10}$$

**Pen & paper: Convert $47_{10}$ to hex**

| Step | Quotient | Remainder |
|------|----------|-----------|
| 47 ÷ 16 | 2 | **15 → F** |
| 2 ÷ 16  | 0 | **2** |

Read bottom → top: $47_{10} = \text{2F}_{16}$ ✓

### Binary ↔ Hex shortcut

Group binary digits in sets of 4 (pad with leading zeros if needed):

$$1011\;0110_2 = \text{B6}_{16}$$

Because $1011_2 = 11 = \text{B}$ and $0110_2 = 6$.

**Pen & paper: Convert $\text{A3}_{16}$ to binary**

$\text{A} = 1010_2$, $3 = 0011_2$ → $\text{A3}_{16} = 1010\;0011_2$

### Addition in binary (pen & paper)

Same rules as decimal, but carry at 2 instead of 10:

```
    1 0 1 1    (11)
  + 0 1 1 0    ( 6)
  ---------
  1 0 0 0 1    (17)
```

Work right to left:
- $1 + 0 = 1$
- $1 + 1 = 10$ → write 0, carry 1
- $0 + 1 + 1 = 10$ → write 0, carry 1
- $1 + 0 + 1 = 10$ → write 0, carry 1
- Carry: write 1

### Powers of 2 you should memorise

| $2^n$ | Value | Common name |
|-------|-------|-------------|
| $2^0$ | 1 | |
| $2^1$ | 2 | |
| $2^3$ | 8 | byte = 8 bits |
| $2^4$ | 16 | nibble range |
| $2^8$ | 256 | 1 byte range |
| $2^{10}$ | 1,024 | ~1 thousand (KB) |
| $2^{16}$ | 65,536 | 16-bit integer range |
| $2^{20}$ | 1,048,576 | ~1 million (MB) |
| $2^{32}$ | 4,294,967,296 | 32-bit address space |

## Python Verification

```python
# ── Number Bases: verifying pen & paper conversions ─────────

# Binary to decimal
print("=== Binary → Decimal ===")
print(f"1011 in binary = {int('1011', 2)}")       # Should be 11
print(f"11001 in binary = {int('11001', 2)}")     # Should be 25

# Decimal to binary
print("\n=== Decimal → Binary ===")
print(f"25 in binary = {bin(25)}")                 # 0b11001
print(f"25 in binary (clean) = {bin(25)[2:]}")     # 11001

# Hex to decimal
print("\n=== Hex → Decimal ===")
print(f"2F in hex = {int('2F', 16)}")              # Should be 47

# Decimal to hex
print("\n=== Decimal → Hex ===")
print(f"47 in hex = {hex(47)}")                    # 0x2f

# Binary ↔ Hex shortcut
print("\n=== Binary ↔ Hex ===")
print(f"10110110 in hex = {hex(int('10110110', 2))}")  # 0xb6
print(f"A3 in binary = {bin(int('A3', 16))}")          # 0b10100011

# Binary addition
print("\n=== Binary Addition ===")
a, b = 0b1011, 0b0110
print(f"1011 + 0110 = {bin(a + b)} = {a + b}")    # 10001 = 17

# Manual base conversion function (how the division algorithm works)
print("\n=== Manual conversion: 25 to base 2 ===")
n = 25
remainders = []
while n > 0:
    remainders.append(str(n % 2))
    n = n // 2
    # Show each step
print(f"Remainders (reversed): {''.join(reversed(remainders))}")
```

## Visualisation — Numbers in different bases

The same integer looks completely different in different bases. The
plot shows numbers 0–31 in binary, decimal, and hex side by side, and
illustrates the *positional value* idea (each digit weighted by a
power of the base).

```python
# ── Visualising number bases ────────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(15, 5.5))

# (1) A grid showing 0..31 written in three bases.
ax = axes[0]
ax.axis("off")
N = 32
header = ["dec", "binary", "hex", "octal"]
ax.text(0.05, 1.0, header[0], fontsize=12, fontweight="bold", transform=ax.transAxes)
ax.text(0.20, 1.0, header[1], fontsize=12, fontweight="bold", transform=ax.transAxes)
ax.text(0.55, 1.0, header[2], fontsize=12, fontweight="bold", transform=ax.transAxes)
ax.text(0.75, 1.0, header[3], fontsize=12, fontweight="bold", transform=ax.transAxes)

for i, n in enumerate(range(N)):
    y = 0.96 - 0.029 * i
    ax.text(0.05, y, f"{n:>2}",      fontsize=10, transform=ax.transAxes,
            family="monospace")
    ax.text(0.20, y, f"{n:>5b}",     fontsize=10, transform=ax.transAxes,
            family="monospace", color="tab:blue")
    ax.text(0.55, y, f"0x{n:02X}",   fontsize=10, transform=ax.transAxes,
            family="monospace", color="tab:orange")
    ax.text(0.75, y, f"0o{n:02o}",   fontsize=10, transform=ax.transAxes,
            family="monospace", color="tab:green")
ax.set_title("Same numbers, different bases")

# (2) Place-value picture for the number 173.
# In base 10: 173 = 1·10² + 7·10¹ + 3·10⁰
# In base 2 (10101101): 1·128 + 0·64 + 1·32 + 0·16 + 1·8 + 1·4 + 0·2 + 1·1 = 173
ax = axes[1]
n = 173
binary = list(map(int, format(n, "08b")))
weights = [2 ** k for k in range(7, -1, -1)]
positions = list(range(8))
ax.bar(positions, [w if b else 0 for w, b in zip(weights, binary)],
       color=["tab:blue" if b else "lightgrey" for b in binary],
       edgecolor="navy")
for x, (w, b) in enumerate(zip(weights, binary)):
    ax.text(x, w if b else 1, f"{b}", ha="center", va="bottom",
            fontsize=14, fontweight="bold",
            color="tab:red" if b else "grey")
    ax.text(x, -10, f"$2^{{{7-x}}}$\n={w}", ha="center", va="top", fontsize=9)
ax.set_xticks([])
ax.set_ylabel("place value (power of 2)")
total = sum(b * w for b, w in zip(binary, weights))
ax.set_title(f"173 in binary: {format(n, '08b')}\n"
             f"= 1·128 + 0·64 + 1·32 + 0·16 + 1·8 + 1·4 + 0·2 + 1·1 = {total}")
ax.set_ylim(-30, 150)

plt.tight_layout()
plt.show()

# Print the size scaling: how many digits do you need in each base?
print("Number of digits to represent 2^k in different bases:")
print(f"{'k':>3}  {'value':>15}  {'binary':>10}  {'decimal':>10}  {'hex':>6}")
for k in [4, 8, 16, 32, 64]:
    val = 2 ** k
    print(f"  {k:>3}  {val:>15,}  {len(bin(val)) - 2:>10}  "
          f"{len(str(val)):>10}  {len(hex(val)) - 2:>6}")
```

**Why CS lives in binary, hex, and octal — but rarely decimal:**

- **Binary** is what every transistor stores: a bit is 0 or 1. All
  arithmetic in your CPU happens in binary. Bitwise operators
  (`&`, `|`, `^`, `<<`, `>>`) work directly on the binary
  representation.
- **Hex is binary, regrouped 4 bits at a time.** Each hex digit
  ($\textsf{0}$–$\textsf{F}$) maps to exactly 4 bits — that's why
  memory addresses (`0xDEADBEEF`), colours (`#FF6347`), and Ethernet
  MAC addresses (`a1:b2:c3:d4:e5:f6`) are written in hex. Compact and
  exact.
- **Octal** groups 3 bits and was huge in 1970s minicomputers; today
  it survives mainly in **Unix file-permission codes** (`chmod 755`
  = `rwxr-xr-x`). Still a useful trick.
- **Base-1024 / base-1000 confusion.** "1 KB" in storage is sometimes
  $1000$ bytes, sometimes $1024$. The IEC introduced **KiB / MiB / GiB**
  for powers-of-2 units to disambiguate. If you see "GB" in a hard
  drive ad it's base-10; in OS memory readouts it's base-2.

## Connection to CS / Games / AI

- **Binary** — how every number is stored in memory; bitwise operations in C/Python
- **Hex** — memory addresses, colour codes (#FF0000 = red), debugging output
- **Octal** — Unix file permissions (chmod 755)
- **Powers of 2** — buffer sizes, hash table capacities, texture dimensions (must be power of 2 in older GPUs)
- **Nibbles (4 bits)** — each hex digit; this is why a byte is displayed as two hex chars

## Check Your Understanding

1. **Pen & paper:** Convert $110101_2$ to decimal and to hex.
2. **Pen & paper:** Convert $255_{10}$ to binary and to hex. What is special about this number?
3. **Pen & paper:** Add $1101_2 + 1011_2$ in binary. Verify by converting both to decimal.
4. **Think about it:** Why do programmers prefer hex over binary when reading memory dumps?
5. **Think about it:** A computer uses binary because transistors have two states (on/off).  Could you build a computer that uses base 3 (ternary)?  What would the hardware need to distinguish?
