---
strand: number-quantity
level: foundation
order: 1
title: Place Value in Any Base
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 00-counting-and-correspondence
    description: Counting and one-to-one correspondence
connections:
  - strand-1-number-quantity-foundation/08-decimals-and-place-value
applications:
  - business: "Reading prices, totals, and check amounts without misplacing a zero"
  - cs: "Why programmers count in twos and sixteens — and where you've already seen base 16 (hex colours like #FF8800)"
  - games: "Pixel colours stored as four small numbers in one slot"
---

# Place Value in Any Base

## Mental

Look at the number **4072**. It is not "four marks, zero marks, seven
marks, two marks." It is

> "four thousands, zero hundreds, seven tens, and two ones"

— **four pieces, each worth a different amount based on where it sits**.
The "0" in the middle is not nothing. It is a *placeholder* that says
"there are zero hundreds here." Without it, $4072$ would collapse to
$472$ — a different number entirely.

This idea — *the position of a digit decides its value* — is called
**place value**. It is the most important invention in arithmetic, and
once you see it, numbers stop being a string of symbols and start being
a list of *piles of stuff* of different sizes.

We humans use ten as our pile size because we have ten fingers. But the
idea works with any pile size. Computers use **two** (because their
switches are on/off) and write everything as long strings of 0s and 1s.
Web designers use **sixteen** (because four bits make one hex digit, and
six hex digits make a colour code like `#FF8800`).

The number is the same. Only the symbols change.

## Interactive

Type any whole number in the box. Watch it appear in three "pile sizes"
at once: base 2 (computer-style), base 10 (everyday), and base 16
(hex). **Hover any digit** to see what it's worth — its *place value*.

:::widget type=base-converter default=255 bases=[2,10,16]:::

Things to try:

- Type **255**. In base 16 it's `FF`. In base 2 it's `11111111` —
  eight 1s. That's why one byte (8 bits) holds numbers from 0 to 255.
- Type **1024**. The base-2 form is `10000000000` — a 1 followed by
  ten 0s. That's why a "kilobyte" used to mean 1024 bytes.
- Type your age. Then your year of birth. Then **3735928559**.

## Symbolic

In **base 10**, when you write the digits of a number left to right,
each position is worth **ten times** the one to its right. So $4072$
unpacks as

$$
4072 = 4 \cdot 1000 + 0 \cdot 100 + 7 \cdot 10 + 2 \cdot 1.
$$

Here $1000, 100, 10, 1$ are the **place values** — the powers of ten:

$$
1000 = 10 \cdot 10 \cdot 10, \quad 100 = 10 \cdot 10, \quad 10 = 10, \quad 1 = 1.
$$

In **base 2**, the same idea uses powers of 2 instead. The digits can
only be $0$ or $1$. The number $13$ in base 2 is $1101$, because

$$
1101_2 = 1 \cdot 8 + 1 \cdot 4 + 0 \cdot 2 + 1 \cdot 1 = 13.
$$

In **base 16**, we run out of digits at $9$, so we use the letters
$\mathtt{A}, \mathtt{B}, \mathtt{C}, \mathtt{D}, \mathtt{E}, \mathtt{F}$
for $10, 11, 12, 13, 14, 15$. The number $255$ in base 16 is $\mathtt{FF}$:

$$
\mathtt{FF}_{16} = 15 \cdot 16 + 15 \cdot 1 = 255.
$$

The little subscript ($_{16}$ or $_2$) tells you which base. Without a
subscript, **base 10 is assumed**.

## Computational

Here is a tiny Python program that converts any number to any base.
Click **Run** and watch it work. Then change the inputs.

```python
# Convert n into base b. Returns the digits, biggest first.
def to_base(n, b):
    if n == 0:
        return [0]
    digits = []
    while n > 0:
        digits.append(n % b)   # last digit = remainder
        n = n // b              # peel it off
    digits.reverse()            # we built it small-to-big; flip it
    return digits

print("255 in base 16:", to_base(255, 16))   # [15, 15] = FF
print("255 in base 2 :", to_base(255, 2))    # eight 1s
print("1024 in base 2:", to_base(1024, 2))   # 1 followed by ten 0s
print("1024 in base 16:", to_base(1024, 16)) # [4, 0, 0]
```

Going the other way — given digits, rebuild the number — is even
simpler:

```python
# Given digits (biggest first) and a base b, rebuild the number.
def from_base(digits, b):
    n = 0
    for d in digits:
        n = n * b + d   # shift left by one place, add the new digit
    return n

print(from_base([1, 1, 0, 1], 2))  # 13
print(from_base([15, 15], 16))     # 255
print(from_base([4, 0, 0], 16))    # 1024
```

Read the comments — the line `n = n * b + d` is the entire idea. We'll
meet it again.

## Derivational

*Why* does dividing by $b$ peel off the last digit?

Imagine $4072$ written in base 10. Divide by 10:

$$
4072 \div 10 = 407 \text{ remainder } 2.
$$

The remainder is **2**, the units digit. The quotient $407$ is the
*same number with the last digit chopped off*. Repeat:

$$
407 \div 10 = 40 \text{ remainder } 7.
$$

Remainder is the next digit, $7$. Keep going until the quotient is $0$.
Read the remainders **in reverse order of when you got them** to
recover the digits.

This is exactly what the Python loop does. It's the same procedure you
use to count change: peel off the smallest coin first, then the next,
then the next.

The procedure works in any base for the same reason: dividing by $b$
removes a factor of $b$, which is exactly what's holding up the
last-place digit.

## Connective

Notice how the same line — `n = n * b + d` — appeared twice:

- In `from_base`, it builds a number from its digits.
- It is also the recipe for *reading numbers aloud*: "four thousand"
  becomes "four thousand seventy" becomes "four thousand seventy-two."
  Each new digit shifts the running total up by a factor of 10 and
  adds the new digit.

That single recipe — **multiply the running total by the base, then add
the new piece** — turns up everywhere. Later lessons will give it a
name (Horner's method) and use it to evaluate formulas, hash strings,
and read input from text files. For now, just notice the *shape*.

## Applied

- **Reading prices and money**: Every grocery total you scan is base 10
  place value. Misplacing a single zero shifts a $25 bill to $250 — the
  same digits, the wrong places.
- **CS / Software**: Programmers write colours, addresses, and
  byte values in **base 16** because each hex digit packs exactly four
  bits. The colour `#FF8800` is three two-digit base-16 numbers
  glued together: red $= 255$, green $= 136$, blue $= 0$.
- **Games**: Each pixel on your screen is four numbers in the range
  $0..255$ (red, green, blue, transparency). They are usually packed
  into one slot — four base-256 "digits" living in a single 32-bit
  number. Place value, but with a much bigger pile size.
- **Time**: Clocks use mixed bases. Seconds and minutes are base 60.
  Hours are base 24. Adding 90 minutes to 10:45 needs you to know "60
  minutes makes one hour" — exactly the carry rule of place value, with
  the carry happening at 60 instead of at 10.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $\mathtt{2A}_{16}$ written in base 10? (Hint: A means 10.)" answer=42 explain="$\mathtt{2A}_{16} = 2 \cdot 16 + 10 = 32 + 10 = 42$.":::

:::widget type=numeric-input prompt="In the number $4072$, what is the place value of the digit $7$?" answer=10 explain="The $7$ sits in the **tens** place — its place value is $10$. The digit's contribution is $7 \cdot 10 = 70$.":::

:::widget type=numeric-input prompt="What is the value of $1101_2$ in base 10?" answer=13 explain="$1 \cdot 8 + 1 \cdot 4 + 0 \cdot 2 + 1 \cdot 1 = 8 + 4 + 0 + 1 = 13$.":::

:::widget type=numeric-input prompt="In a hex colour code, the green channel is $\mathtt{88}$. What is that in base 10?" answer=136 explain="$\mathtt{88}_{16} = 8 \cdot 16 + 8 = 128 + 8 = 136$.":::
