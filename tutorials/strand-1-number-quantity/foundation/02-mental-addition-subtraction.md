---
strand: number-quantity
level: foundation
order: 2
title: Mental Addition and Subtraction
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 01-place-value-any-base
    description: Place value in any base
connections:
  - strand-1-number-quantity-foundation/03-mental-multiplication
applications:
  - business: "Checking a restaurant bill or grocery total without a calculator"
  - cs: "Estimating how long a slow function will run before you start it"
  - games: "Quickly seeing 'I have 16 ms per frame, physics ate 9, I have 7 left'"
  - life: "Splitting a bill, counting calories, planning a budget"
---

# Mental Addition and Subtraction

## Mental

Most people were taught to add by **stacking** numbers and working
right-to-left, "carrying the one." That works on paper. It is **terrible
in your head**, because you have to remember the carries while you keep
going, and the answer comes out backwards.

There is a better way. **Add the big stuff first.** To compute $58 + 47$
in your head, you say:

> "Fifty-eight, plus forty is **ninety-eight**, plus seven is **one
> hundred five**."

Two small steps. The running total grows steadily. You never have to
hold a "carry" in memory because there isn't one — the running total
already includes everything you've added so far.

This is called **left-to-right addition**, and it has been taught this
way since at least the 1850s — Joseph Ray's *Mental Arithmetic* drilled
American schoolchildren on it for decades. Subtraction is the same
trick in reverse: peel off the big chunks first, then the small ones.

> "Two hundred six, minus eighty is **one hundred twenty-six**, minus
> nine is **one hundred seventeen**."

You will be slow at this for the first hundred problems. After the
first thousand, it will feel automatic.

## Interactive

Try ten of these now. Don't pick up a pen — do the whole problem in
your head before typing the answer. The drill remembers your seed
across reload, so you can come back to the same set tomorrow.

:::widget type=mental-drill generator=add-2digit count=10 id=add:::

Now subtraction. Same rule, run in reverse:

:::widget type=mental-drill generator=sub-2digit count=10 id=sub:::

If you got 8 or more correct on each, you have the technique. If you
got fewer, slow down — say each step out loud. Speed comes from
correctness, not the other way around.

## Symbolic

Three rules of addition let you regroup numbers freely. They look
trivial. They are the reason mental arithmetic works at all.

**1. Adding zero changes nothing.**

$$
a + 0 = a
$$

**2. The order of two numbers doesn't matter.**

$$
a + b = b + a
$$

This is why $8 + 5$ and $5 + 8$ give the same answer. Choose whichever
direction is easier.

**3. You can group any way you like.**

$$
(a + b) + c = a + (b + c)
$$

This third one is what makes left-to-right addition correct. When you
compute $58 + 47$ as $58 + 40 + 7$, you are silently using rule 3 —
you regrouped $47$ as $40 + 7$ and added each chunk separately. The
total is the same.

Subtraction is **not** in the same club. The order matters: $5 - 3 \ne
3 - 5$. So when you subtract chunks, you must keep their direction
straight.

## Computational

Python verifies what you just did mentally. Click **Run** and watch
the running total tick up:

```python
# Verify left-to-right addition: 58 + 47
a, b = 58, 47
running = a
for chunk in (40, 7):     # break b into place-value pieces
    running = running + chunk
    print("  +", chunk, "=", running)
print("answer:", running)
```

And subtraction:

```python
# Left-to-right subtraction: 206 - 89
a, b = 206, 89
running = a
for chunk in (80, 9):
    running = running - chunk
    print("  -", chunk, "=", running)
print("answer:", running)
```

Try changing the numbers. Pick problems you can do in your head, run
the code, and see your steps printed back to you.

## Derivational

*Why* does adding the big chunk first give the right answer?

Because of rule 3 (grouping). Watch:

$$
58 + 47 = 58 + (40 + 7) = (58 + 40) + 7 = 98 + 7 = 105.
$$

The first equality just splits $47$ into its tens piece and its ones
piece — that's place value (Lesson 01). The second equality is
rule 3 — we regrouped the parentheses. The third is straightforward
addition. The fourth is the answer.

You don't need to write any of this down when you do mental
arithmetic. But knowing it is *legal* by the rules is what gives you
permission to do it in the first place. Without rule 3, you could only
add right-to-left.

## Connective

Notice the shape of the Python loop:

```
running = running + chunk
```

You will see this exact line again in many places:

- Adding up a column of numbers in a spreadsheet — the running total
  grows by one cell at a time.
- Loading bytes from a file — the count goes up as each chunk arrives.
- Counting goals in a football match. Score after a goal: previous +
  one.

Whenever you have a "running total" that you grow piece by piece,
you're doing the same thing as mental addition. The numbers might be
prices, megabytes, or steps, but the shape is the same.

## Applied

- **Restaurants and grocery stores**: A bill of $24, $18, $7, and $32
  becomes $24 + 18 = 42 + 7 = 49 + 32 = 81$. You can do this faster
  than the waiter can re-print the bill.
- **Time and frame budgets in games**: A game has 16 ms per frame at
  60 fps. If physics takes 9 ms, you have $16 - 9 = 7$ ms left for
  everything else. Programmers do this constantly.
- **Calorie tracking**: 320 (breakfast) + 480 (lunch) + 250 (snack) =
  $800 + 250 = 1050$. A pure left-to-right add, just bigger numbers.
- **Splitting bills**: Five friends spent $128 total. Each owes
  $128 / 5 = 25.60$. The mental shortcut is $130 / 5 = 26$, then
  remove $0.40$. Same family of tricks.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $87 + 56$?" answer=143 explain="$87 + 50 = 137$, then $+ 6 = 143$.":::

:::widget type=numeric-input prompt="What is $312 - 87$?" answer=225 explain="$312 - 80 = 232$, then $- 7 = 225$.":::

:::widget type=numeric-input prompt="A bill comes to $\$48 + \$49$. Try seeing $49$ as $50 - 1$. What is the total?" answer=97 explain="$48 + 50 = 98$, then $- 1 = 97$. Spotting that $49 = 50 - 1$ is a classic shortcut — round up, then take a little off. You'll meet many more of these.":::
