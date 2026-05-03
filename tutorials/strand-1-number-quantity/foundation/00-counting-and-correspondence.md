---
strand: number-quantity
level: foundation
order: 0
title: Counting and One-to-One Matching
prerequisites: []
connections:
  - strand-1-number-quantity-foundation/01-place-value-any-base
applications:
  - business: "Stock-takes, attendance registers, voter rolls — every count is matching"
  - cs: "len() of a list, dictionary lookups, joining two database tables on a key"
  - life: "Pairing socks, lining up keys with locks, splitting a deck of cards"
---

# Counting and One-to-One Matching

## Mental

Hold up your hand. You have **five fingers**. How do you *know* it's
five? You count them: "one, two, three, four, five." Counting is
**matching each thing to a number-name in a fixed order**.

Now picture a table with a few cups on it. You need to put one saucer
under each cup. Do you have to count both first?

**No.** You can just slide one saucer under each cup, one at a time.

- If you **run out of saucers** before all cups are covered — too few
  saucers.
- If you **have saucers left over** when every cup is covered — too
  many saucers.
- If they pair up perfectly — **same number** of cups and saucers.

This is called **one-to-one matching**, and it is older and more
fundamental than counting itself. Two collections of things have the
**same size** when you can pair them up perfectly — one to one, no
leftovers on either side.

You will use this idea — usually without thinking about it — every
time you check that two columns, two lists, or two sides of an
equation have the same number of pieces.

## Interactive

A few quick checks. Type the answer and press **Enter** (or click
**Check**).

:::widget type=numeric-input prompt="How many fingers on one hand?" answer=5 explain="Most humans have five fingers per hand — including the thumb. We use this fact every time we hold up a number visually.":::

:::widget type=numeric-input prompt="You have 6 cups and 6 saucers. How many cups will be left without a saucer?" answer=0 explain="Six and six match one-to-one, with nothing left over. Zero is a perfectly valid count — it just means 'none.'":::

:::widget type=numeric-input prompt="You have 8 chairs and 5 people. If everyone sits, how many chairs stay empty?" answer=3 explain="Match the 5 people to 5 chairs. The 3 unmatched chairs are empty. (Notice: $8 - 5 = 3$ — subtraction is the formal name for this 'how many leftover' question.)":::

:::widget type=numeric-input prompt="A box has 7 red balls and 3 blue balls. How many balls in total?" answer=10 explain="$7 + 3 = 10$. Counting two groups together is exactly addition — Lesson 02 will show you the mental shortcut.":::

## Symbolic

The **counting numbers** come in a fixed order:

$$1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, \ldots$$

You can keep going forever — every number has a "next" number. The
*words* ("one," "two," "three") differ between languages but the
*order* is the same.

There is also **zero**. Zero is the count of an **empty collection** —
no cups on the table, no apples in the bowl. It took humans thousands
of years to invent the symbol $0$. Without it, you could not write a
number like $407$, because the gap between $4$ and $7$ would have no
way to be marked. (You met that idea in Lesson 01 — place value
depends on having a zero digit.)

When we write $|S|$ — the letter $S$ between two upright bars — we
mean "the count of things in $S$." If $S$ is the collection of vowels
in the English alphabet (a, e, i, o, u), then $|S| = 5$.

## Computational

Python has counting built in. The function `len()` returns the count
of things in a list:

```python
fruits = ["apple", "pear", "fig", "lemon"]
print(len(fruits))   # 4

empty = []
print(len(empty))    # 0  — empty list, count is zero
```

Under the hood, `len()` is doing the same thing you do in your head —
visiting each item, adding one to a running count:

```python
count = 0
for item in fruits:
    count = count + 1
print(count)         # 4
```

Read the loop as: *"start with no count; for each fruit, add one."*

You can count anything Python knows how to step through — a string is
a sequence of letters, so:

```python
word = "beginning"
print(len(word))     # 9
```

## Derivational

*Why* does counting give the same answer no matter the order?

Picture four objects on a table — A, B, C, D. You point at each in
turn and say "one, two, three, four." Total: 4.

Now scramble them: D, B, A, C. Count again: "one, two, three, four."
Total: still 4.

Why? Because you matched each object to a **different** counting
number, and stopped when there were no objects left. Different orders
give the same final number because you used the first four counting
numbers either way.

This works as long as **two rules** hold:

1. **Touch every object exactly once.** Don't skip any.
2. **Never count the same object twice.**

Break either rule and the count is wrong. Adults make these mistakes
too — especially when counting people in a moving group, or items
that look alike.

## Connective

The matching idea shows up everywhere:

- **Pairing shoes**: every left shoe matches one right shoe.
- **Keys and locks**: each key opens exactly one lock.
- **Lining up**: each student stands behind exactly one other
  student.
- **Looking up a phone number**: each name in your contacts matches
  one number.

Later you'll meet this idea under formal names — *bijection*,
*one-to-one function*, *injection*. For now, just notice the
**shape**: two collections, every item on one side paired with
exactly one item on the other, with nothing left over.

## Applied

- **Stock-takes**: a shopkeeper counts items on the shelf and matches
  them to the inventory list. Mismatches mean missing or extra
  stock.
- **Voting**: each ballot is matched one-to-one to a voter, then
  tallied. Matching prevents double-counting; tallying gives the
  total.
- **Attendance**: a teacher reads names; each name matches one
  student. Anyone unmatched is absent.
- **Sports scoring**: every goal, basket, or run adds one to a
  running count. The count is the score.
- **Programming**: when you ask "how many users signed up today?",
  the database is doing exactly this — matching rows in a table to
  counting numbers and returning the highest one reached.

## Check Your Understanding

:::widget type=numeric-input prompt="How many letters in the word 'apple'?" answer=5 explain="a-p-p-l-e — five letters. Notice the two p's are counted separately even though they look the same. Rule 2 from the Derivational section: never count the same *object* twice — but two different p's are two different objects.":::

:::widget type=numeric-input prompt="A bus has 30 seats. 23 passengers are on board. How many seats are empty?" answer=7 explain="Match 23 passengers to 23 seats. The 7 unmatched seats are empty. ($30 - 23 = 7$.)":::

:::widget type=numeric-input prompt="You write the numbers from 1 to 10 on cards. How many cards do you have?" answer=10 explain="Ten cards — each card matches one counting number. The count *is* the size of the collection.":::

:::widget type=numeric-input prompt="A box has zero apples. What is the count?" answer=0 explain="Zero. An empty collection has count zero — and zero is a perfectly real number, not 'no number.' Without it, $407$ could not be written.":::
