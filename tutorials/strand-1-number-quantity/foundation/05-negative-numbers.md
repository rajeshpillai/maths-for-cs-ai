---
strand: number-quantity
level: foundation
order: 5
title: Negative Numbers
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 02-mental-addition-subtraction
    description: Mental addition and subtraction
connections:
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
applications:
  - business: "Profit and loss, debt vs credit, temperature changes, elevation differences"
  - cs: "Two's complement integer storage, signed coordinates, vector deltas"
  - games: "Velocity in a chosen direction, score differentials, depth below a baseline"
  - life: "Wind chill, debt, floor numbers below ground level, calorie deficit"
---

# Negative Numbers

## Explain Like I Am 7

Imagine an elevator in a tall building.  Floor 0 is the lobby; the
floors above are 1, 2, 3 and the basement levels are −1, −2, −3.  A
**negative number** is just a label for "below the lobby" or "owed
instead of owned."  Adding a positive number presses the *up* arrow;
adding a negative one presses the *down* arrow.  That's why two
"downs" in a row (like subtracting a debt) end up taking you *up* —
the second minus sign cancels the first.

## Mental

Some quantities have a natural **direction**. Money you owe is the
opposite of money you have. Steps backward are the opposite of steps
forward. Temperature five degrees below freezing is the opposite of
five above. The numbers we've used so far — $0, 1, 2, 3, \ldots$ —
only describe one of those two directions.

To describe both, we add a **minus sign** in front of a number to mean
"the opposite":

> $-3$ means "three, but in the *other* direction."

Two pictures help here:

**1. The debt picture.** If you have $\$5$, you have $+5$ dollars.
If you owe $\$5$, you have $-5$ dollars. They're equal in size but
opposite in direction. Pay off the debt and you're back at $0$.

**2. The number-line picture.** Stretch a line out left to right. Mark
$0$ in the middle. Whole numbers $1, 2, 3, \ldots$ go to the right.
Their opposites $-1, -2, -3, \ldots$ go to the left.

```
  ←─ negative ──── 0 ──── positive ─→
  ─5  −4  −3  −2  −1   0   1   2   3   4   5
```

**Adding** moves you to the **right** by that many steps. **Subtracting**
moves you to the **left**. That's it. Adding $-3$ to anything is the
same as moving $3$ steps to the left, because $-3$ is "three steps in
the opposite direction."

That single rule — adding a negative is the same as subtracting its
size, and subtracting a negative is the same as adding its size —
explains every awkward "rule about minus signs" you may have been
told to memorize.

## Interactive

Try a few. Use the number-line picture in your head: start at the
first number, then walk.

:::widget type=numeric-input prompt="What is $7 + (-3)$?" answer=4 explain="Start at $7$. Adding $-3$ means walking $3$ steps left. You land on $4$. Equivalent to $7 - 3 = 4$.":::

:::widget type=numeric-input prompt="What is $-2 + 5$?" answer=3 explain="Start at $-2$. Walk $5$ steps right: $-2 \\to -1 \\to 0 \\to 1 \\to 2 \\to 3$. You land on $3$.":::

:::widget type=numeric-input prompt="What is $4 - (-6)$?" answer=10 explain="Subtracting a negative *adds* its size. $4 - (-6) = 4 + 6 = 10$. Two minus signs cancel — they reverse the direction twice, so you end up going forward again.":::

:::widget type=numeric-input prompt="A submarine is $30$ metres below sea level (depth $-30$). It rises by $18$ metres. What is its new depth, as a negative number? (Type just the number; no minus sign needed.)" answer=-12 explain="$-30 + 18 = -12$. The sub is now $12$ metres below sea level. Walked $18$ steps right on the number line, from $-30$ toward $0$ but not all the way.":::

## Symbolic

The set of **whole numbers** ($0, 1, 2, 3, \ldots$) extended with their
opposites is called the **integers**. They go in both directions
forever:

$$
\ldots, -3, -2, -1, 0, 1, 2, 3, \ldots
$$

For any number $a$, its **opposite** is written $-a$, and they always
sum to zero:

$$
a + (-a) = 0.
$$

(That's the formal version of "pay off the debt and you're back at
zero.")

The two slogans that cover most cases:

- **Adding a negative = subtracting its size:** $\quad a + (-b) = a - b$.
- **Subtracting a negative = adding its size:** $\quad a - (-b) = a + b$.

The **size** of a number — how far it is from zero, regardless of
direction — is called its **absolute value**, written with vertical
bars:

$$
|3| = 3, \qquad |-3| = 3, \qquad |0| = 0.
$$

Absolute value strips off the sign. It answers "how big," ignoring
"which direction."

## Computational

Python uses the minus sign exactly the way you'd expect:

```python
print(7 + (-3))    # 4   — adding a negative is subtracting
print(-2 + 5)      # 3   — start at -2, walk 5 right
print(4 - (-6))    # 10  — subtracting a negative is adding

# Absolute value
print(abs(-3))     # 3
print(abs(7))      # 7
print(abs(0))      # 0
```

The two slogans, made concrete:

```python
a, b = 7, 3
print(a + (-b) == a - b)   # True
print(a - (-b) == a + b)   # True
```

A small but useful trick — **the sign of a difference tells you direction**:

```python
# Did the temperature go up or down?
yesterday = 22
today = 18
change = today - yesterday
print(change)              # -4   — negative means it went down
print(abs(change), "deg")  # 4 deg — the size of the change
```

## Derivational

*Why* does subtracting a negative add?

Picture the number line. Subtracting $b$ from $a$ means "from $a$,
walk $b$ steps **toward** the negative direction" — i.e., walk $b$
steps left. So $5 - 3$ goes from $5$ to $2$, walking three steps left.

Now what if $b$ is itself negative? $b = -3$. The "negative direction"
flips, because $-3$ is three steps in the *opposite* direction from
$3$. Walking three "leftward" steps when $b$ is negative means walking
**rightward** instead. Two reversals — one for the subtraction sign,
one for $b$'s own negative sign — cancel out.

So $5 - (-3) = 5 + 3 = 8$. Two minus signs make a plus.

This is also why **multiplying two negatives gives a positive**. We
won't prove that one here — Strand 2 (Structure) will, when it talks
about how operations *must* behave. For now, take the rule on
trust:

$$
(-3) \times (-4) = 12, \qquad (-3) \times 4 = -12, \qquad 3 \times (-4) = -12.
$$

The mnemonic that holds for all four cases:

> Same signs → positive. Different signs → negative.

## Connective

The number line will be back, again and again:

- **Coordinates**: a 2D point like $(-3, 5)$ uses negative numbers
  for "to the left of the origin." Maps and game worlds depend on
  this.
- **Vectors**: a velocity of $-2$ m/s means "moving in the negative
  direction at 2 m/s." Strand 3 (Shape & Space) builds on this.
- **Decimal numbers**: between any two integers there are infinitely
  many decimals — fractions of a step. Lesson 08 will go there.
- **Subtraction as 'add the opposite'**: in Strand 2 you'll see this
  rephrased as "every number has an additive inverse," which is one
  of the axioms that makes the integers a *group* under addition.

## Applied

- **Money**: a debt of $\$50$ is $-50$ dollars. Paying off $\$30$
  brings you to $-50 + 30 = -20$ — still $\$20$ in debt.
- **Temperature**: morning temperature was $-4°\text{C}$, rose by
  $9°\text{C}$ → afternoon is $-4 + 9 = 5°\text{C}$.
- **Elevation**: Death Valley is about $-86$ metres (below sea
  level). Mount Everest is about $+8848$ metres. The difference in
  elevation is $8848 - (-86) = 8848 + 86 = 8934$ metres — exactly
  what "subtracting a negative adds" means in real life.
- **Programming**: in Python, list indexing with negative numbers
  counts from the end. `items[-1]` is the last item, `items[-2]` is
  second-to-last. The same number line idea, but folded into the
  list.
- **Games**: a player's velocity vector might be $(3, -2)$ —
  meaning "right at speed 3, down at speed 2," with "down" expressed
  as negative because the screen's y-axis points up.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $-7 + 12$?" answer=5 explain="Start at $-7$, walk $12$ right. You cross zero at step $7$, with $5$ left over. Land on $5$.":::

:::widget type=numeric-input prompt="What is $3 - 8$?" answer=-5 explain="Start at $3$, walk $8$ left. You cross zero at step $3$, with $5$ more to go in the negative direction. Land on $-5$.":::

:::widget type=numeric-input prompt="What is $-4 - (-9)$?" answer=5 explain="Subtracting $-9$ is the same as adding $9$. So $-4 - (-9) = -4 + 9 = 5$.":::

:::widget type=numeric-input prompt="A bank account starts at $\$200$, then withdrawals of $\$120$ and $\$95$ happen. What is the new balance? (Type the number; include the minus sign if negative.)" answer=-15 explain="$200 - 120 - 95 = 80 - 95 = -15$. The account is overdrawn by $\$15$.":::
