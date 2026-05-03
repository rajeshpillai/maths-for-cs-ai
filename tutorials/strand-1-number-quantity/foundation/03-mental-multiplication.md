---
strand: number-quantity
level: foundation
order: 3
title: Mental Multiplication
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 02-mental-addition-subtraction
    description: Mental addition and subtraction
connections:
  - strand-1-number-quantity-foundation/04-mental-division
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
applications:
  - business: "Tipping at a restaurant, calculating quantity discounts, working out tax"
  - cs: "Estimating array sizes, loop iteration counts, memory in megabytes"
  - games: "Rectangular HP bars, grid sizes, total damage = damage × hits"
  - life: "Recipe scaling (3 × the ingredients for 12 cookies, not 4)"
---

# Mental Multiplication

## Mental

Multiplication asks one question two ways:

- **"How much is three groups of four?"** Picture three baskets, each
  with four apples. Total apples: $4 + 4 + 4 = 12$.
- **"How big is a rectangle 3 wide and 4 tall?"** Twelve squares,
  arranged in a $3 \times 4$ grid.

Both pictures give the same answer: $3 \times 4 = 12$. Multiplication
is **repeated addition** of the same number, and it is also the
**area** of a rectangle. Holding both pictures in your head is the
single most useful thing you can do with multiplication.

You don't want to *add* every time, though. Adding $7$ to itself $8$
times — $7 + 7 + 7 + 7 + 7 + 7 + 7 + 7$ — is slow and error-prone.
Instead, you **memorize** a small table of facts (the **times
tables**, $2 \times 2$ through $12 \times 12$ — about 80 facts) and
then use a few **shortcuts** to handle anything bigger.

That's the whole game. Memorize the table; use shortcuts for the
rest.

## Interactive

Here's a mixed times-table drill. Aim for **8 out of 10**. If you
miss one, the correct answer is shown — pause, picture the
"3 groups of 4" image, and try again.

:::widget type=mental-drill generator=mult-table-mixed count=10 id=mixed:::

If you'd like to drill a single row, here is just the **7-times**
table — the row most people find hardest:

:::widget type=mental-drill generator=mult-table-7 count=10 id=row7:::

## Symbolic

Multiplication has three rules worth knowing.

**1. Multiplying by 1 changes nothing.**

$$
a \times 1 = a
$$

**2. The order of two numbers doesn't matter.** (Same as for addition.)

$$
a \times b = b \times a
$$

This is why the times table is *symmetric*: once you know $7 \times 8
= 56$, you also know $8 \times 7 = 56$. You only have to memorize half
the table.

**3. You can split one number and multiply each piece separately.**

$$
a \times (b + c) = a \times b + a \times c
$$

This is the **distributive rule**, and it is the most useful trick in
all of mental math. It says: if a number is hard to multiply, **split
it** into easier pieces.

For example, $13 \times 6$ looks scary. But $13 = 10 + 3$, so

$$
13 \times 6 = (10 + 3) \times 6 = 10 \times 6 + 3 \times 6 = 60 + 18 = 78.
$$

Two easy multiplications and one easy addition. That's the whole
recipe for two-digit-times-one-digit problems in your head.

## Computational

Python's `*` is multiplication. The repeated-addition definition shows
up if you write the loop yourself:

```python
# 3 groups of 4: add 4 to itself 3 times.
total = 0
for i in range(3):
    total = total + 4
print(total)        # 12

# Same answer, faster:
print(3 * 4)         # 12
```

The distributive rule, in code:

```python
# 13 * 6 by splitting 13 into 10 + 3
a = 13
b = 6
piece_1 = 10 * b      # 60
piece_2 = 3 * b       # 18
print(piece_1 + piece_2)   # 78

# Verify against the direct multiplication
print(a * b)               # 78
```

Multiplication by $10$ is special in base $10$ — it just appends a
zero on the right:

```python
print(7 * 10)         # 70
print(42 * 10)        # 420
print(123 * 10)       # 1230
```

This isn't magic — it's place value (Lesson 01). Each digit slides
one column to the left, and a $0$ fills the units column.

## Derivational

*Why* does multiplying by $10$ shift the digits left by one place?

A number like $42$ is, by place value, $4 \times 10 + 2 \times 1$.
Multiplying by $10$:

$$
42 \times 10 = (4 \times 10 + 2 \times 1) \times 10 = 4 \times 100 + 2 \times 10 = 420.
$$

The digit $4$, which used to sit in the *tens* place, now sits in the
*hundreds* place. The digit $2$, which sat in the *ones* place, now
sits in the *tens* place. The *ones* place becomes empty — a $0$
fills it.

The same logic works in any base: in base 2, multiplying by $2$ shifts
digits left and puts a $0$ on the right. That's exactly what computer
hardware does for $\times 2$ — a "left shift." Place value is why
this is fast.

*Why* does the distributive rule work? Picture multiplication as area.
A rectangle that is $13$ wide and $6$ tall can be **cut** into two
smaller rectangles: one $10 \times 6$, one $3 \times 6$. The two
pieces side by side cover the original. Their areas — $60$ and $18$
— sum to the area of the whole: $78$.

```
+----------+---+
|          |   |
|  10 × 6  | 3 |
|          | × |
|   = 60   | 6 |
|          | =18|
+----------+---+
```

The distributive rule is just "**area splits when you cut a
rectangle.**" That picture, once it sticks, makes mental
multiplication feel mechanical instead of clever.

## Connective

You will see the times table everywhere:

- **Repeated addition**: any `for` loop that does the same operation
  N times is essentially multiplying.
- **Area**: square metres of a floor, square pixels of an image.
- **Cost**: $6$ apples at $\$1.20$ each is $6 \times 1.20$.
- **Long multiplication on paper** is just the distributive rule
  applied to every digit. When you do $13 \times 26$ on paper, you
  are silently computing $13 \times 20 + 13 \times 6$.

Multiplying by $10$ in base $10$ generalizes: in base $2$, multiplying
by $2$ shifts left. In base $16$, multiplying by $16$ shifts left.
Every base has its own "easy multiplier" for exactly this reason.

## Applied

- **Tipping**: $20\%$ tip on a $\$45$ bill — $\$45 \times 0.20$.
  Mental shortcut: $\$45 \times 2 = \$90$, then divide by $10$
  (shift one place to the right) to get $\$9$. Distribution and
  the times-by-10 rule, working together.
- **Recipe scaling**: a recipe makes $4$ cookies; you want $12$.
  Multiply every ingredient by $3$ ($12 / 4 = 3$). Two cups of
  flour becomes $2 \times 3 = 6$ cups.
- **Programming**: `for i in range(1000): ...` runs the body $1000$
  times. If each iteration takes $5$ ms, the total is $1000 \times 5
  = 5000$ ms = $5$ seconds. Quick mental estimates like this matter
  before you start a slow program.
- **Game design**: a $20 \times 30$ tile grid has $600$ tiles. A
  health bar made of $20$ cells, each $5$ pixels wide, is $100$
  pixels long. Multiplication is everywhere in layout.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $7 \times 8$?" answer=56 explain="From the times table. (And by symmetry, $8 \times 7 = 56$ too.)":::

:::widget type=numeric-input prompt="What is $13 \times 6$? Use the distributive rule: $13 = 10 + 3$." answer=78 explain="$10 \times 6 = 60$, $3 \times 6 = 18$, total $78$.":::

:::widget type=numeric-input prompt="What is $42 \times 10$?" answer=420 explain="Append a $0$ on the right. The $4$ slides from the tens place to the hundreds; the $2$ slides from ones to tens.":::

:::widget type=numeric-input prompt="A bookshop sells $9$ books at $\$12$ each. What is the total in dollars?" answer=108 explain="$9 \times 12 = 9 \times 10 + 9 \times 2 = 90 + 18 = 108$. Distribution again — split $12$ into $10 + 2$.":::
