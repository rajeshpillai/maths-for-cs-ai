---
strand: computation
level: foundation
order: 1
title: Number Representation in Computers
prerequisites:
  - tier: strand-7-computation-foundation
    slug: 00-algorithms-intuition
    description: What is an algorithm
connections:
  - strand-7-computation-foundation/02-floating-point
applications:
  - cs: "Bitwise operations, color storage, networking, hashing"
  - life: "How computers actually count"
---

# Number Representation in Computers

## Explain Like I Am 7

Computers only know two things — *light on* and *light off*, like a
row of tiny torches.  To write the number eleven, the torches show a
pattern: ON-OFF-ON-ON, which is shorthand for "one eight, no four, one
two, one one — that adds up to eleven."  Every number in every game,
photo, and song is hidden in long rows of these torches.  Hex is just a
shorter way to write the rows: instead of saying "OFF-ON-ON-ON" you
say "$7$," because four torches can pack one hex letter.

## Mental

Computers store everything as **binary** — sequences of $0$s and $1$s
called **bits**. To represent a number $n$ in $k$ bits, we use
positional notation in base $2$:

$$
n = b_{k-1} \cdot 2^{k-1} + b_{k-2} \cdot 2^{k-2} + \ldots + b_1 \cdot 2 + b_0.
$$

A byte is $8$ bits, holding $0$ to $255$. A 32-bit unsigned integer
holds $0$ to $2^{32} - 1 \approx 4.29 \times 10^9$.

## Hexadecimal — base 16

Each hex digit (0-9, A-F) represents 4 bits. Two hex digits = one
byte. Saves space and is human-readable: a byte ranges 0x00 to 0xFF
in hex, vs. 00000000 to 11111111 in binary.

| Decimal | Binary | Hex |
|---|---|---|
| 0 | 0000 | 0 |
| 5 | 0101 | 5 |
| 10 | 1010 | A |
| 15 | 1111 | F |
| 255 | 11111111 | FF |

## Signed integers: two's complement

How to store negative integers? **Two's complement**: in $k$ bits, the
top bit has weight $-2^{k-1}$ (negative), the rest positive.

For 8-bit:

| Bits | Two's-complement value |
|---|---|
| 00000000 | 0 |
| 00000001 | 1 |
| 01111111 | 127 (max) |
| 10000000 | -128 (min) |
| 11111111 | -1 |

**Range**: $-2^{k-1}$ to $2^{k-1} - 1$.

To negate: flip all bits, add $1$. Example:
$5 = 00000101$, flip → $11111010$, $+1 \to 11111011 = -5$.

This makes addition with negatives work the same as for unsigned —
the hardware doesn't need separate logic.

## Interactive

:::widget type=numeric-input prompt="Binary $1010$ in decimal: $1 \\cdot 8 + 0 \\cdot 4 + 1 \\cdot 2 + 0 = ?$" answer=10 explain="$10$.":::

:::widget type=numeric-input prompt="Hex $\\text{FF}$ in decimal: $15 \\cdot 16 + 15 = ?$" answer=255 explain="$255$.":::

:::widget type=numeric-input prompt="Largest 8-bit unsigned integer?" answer=255 explain="$2^8 - 1 = 255$.":::

:::widget type=numeric-input prompt="In 8-bit two's complement, smallest representable integer?" answer=-128 explain="$-2^7 = -128$.":::

## Symbolic

**Conversion algorithms**:

- **Decimal → binary**: repeatedly divide by 2, collect remainders
  bottom-up.
- **Binary → decimal**: sum $b_i \cdot 2^i$.
- **Binary → hex**: group bits in groups of 4 from the right; each
  group is one hex digit.

**Bitwise operations**:

| Op | Symbol | Meaning |
|---|---|---|
| AND | $\&$ | bit is 1 iff both inputs are 1 |
| OR | $|$ | bit is 1 iff at least one input is 1 |
| XOR | $\wedge$ | bit is 1 iff inputs differ |
| NOT | $\sim$ | flip all bits |
| Shift left | $\ll k$ | multiply by $2^k$ (loses high bits) |
| Shift right | $\gg k$ | divide by $2^k$ (rounds toward $-\infty$) |

These are the *fastest* operations the CPU performs — single-cycle
on modern hardware.

## Computational

```python
# Decimal to binary string
def to_bin(n, width=8):
    return format(n & ((1 << width) - 1), f"0{width}b")

print(to_bin(10))         # 00001010
print(to_bin(255))        # 11111111
print(to_bin(-1, 8))      # 11111111 (two's complement)

# Hex
print(hex(255))           # 0xff
print(int("FF", 16))      # 255

# Bitwise operations
print(0b1100 & 0b1010)    # 0b1000 = 8 (AND)
print(0b1100 | 0b1010)    # 0b1110 = 14 (OR)
print(0b1100 ^ 0b1010)    # 0b0110 = 6 (XOR)
print(0b0001 << 3)         # 0b1000 = 8 (shift left)

# Two's complement negation in 8-bit
def negate(n, width=8):
    return ((~n) + 1) & ((1 << width) - 1)

print(negate(5))          # 251 — which represents -5 in two's-complement
```

## Applied

- **Color storage** — RGB pixel: red, green, blue in 8 bits each.
  Hex `#FF8800` = orange. The `8` in `#88` is a byte's high nibble.
- **Networking** — IPv4 addresses are four bytes; ports are 16-bit
  unsigned (0–65535).
- **Hashing** — `hash(x)` typically returns a 64-bit integer; bitwise
  XOR and shifts compose hash values quickly.
- **Bit-flags** — file permissions in Unix are bit packed:
  `rwxrwxrwx` is 9 bits ↔ octal/decimal interplay.
- **Floating point** (next lesson) is built on top of integer-coded
  fields stored in binary.

## Check Your Understanding

:::widget type=numeric-input prompt="Convert binary $10110$ to decimal: $16 + 4 + 2 = ?$" answer=22 explain="$22$.":::

:::widget type=numeric-input prompt="$0\\text{x}1A$ in decimal: $1 \\cdot 16 + 10 = ?$" answer=26 explain="$26$.":::

:::widget type=numeric-input prompt="$5 \\& 3$ in decimal: $0101 \\& 0011 = 0001 = ?$" answer=1 explain="$1$.":::

:::widget type=numeric-input prompt="$1 \\ll 4$ (shift 1 left by 4)?" answer=16 explain="$2^4 = 16$.":::
