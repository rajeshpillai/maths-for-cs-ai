---
strand: number-quantity
level: foundation
order: 4
title: Mental Division
prerequisites:
  - tier: strand-1-number-quantity-foundation
    slug: 03-mental-multiplication
    description: Mental multiplication
connections:
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
  - strand-1-number-quantity-foundation/08-decimals-and-place-value
applications:
  - business: "Splitting a bill among friends, unit pricing, hourly rate to monthly"
  - cs: "Pagination (how many pages of N items per page?), hash table sizing"
  - games: "Distributing damage across multiple targets, timing waves of enemies"
  - life: "Hours to days, miles per gallon, recipe down-sizing"
---

# Mental Division

## Explain Like I Am 7

Picture a giant pile of birthday-cake crumbs and three plates.  Sharing
the crumbs **equally** is one kind of division.  But you could also
ask: "if I scoop crumbs into spoonfuls of three, how many spoonfuls do
I make?" — that's the *same answer*, told from the other side.  The
biggest secret is that every multiplication fact you already know
(like "three sixes are eighteen") is secretly a division fact in
disguise ("eighteen split into threes is six").

## Mental

Division asks one question two ways:

- **"If I share $12$ apples equally among $3$ friends, how many does
  each get?"** Each gets $4$.
- **"How many groups of $3$ fit inside $12$?"** Four groups.

Both pictures give the same answer: $12 \div 3 = 4$. Division is
**equal sharing**, and it is also **counting groups**. Either picture
works — pick whichever feels more natural for the question in front
of you.

The cleanest mental shortcut is this: **the times table is also the
division table, read backwards.** If you know $6 \times 7 = 42$, then
you also know $42 \div 6 = 7$ and $42 \div 7 = 6$. So you don't have
to memorize anything new — you just have to *recognize* numbers from
the multiplication table.

> "Forty-two divided by seven? I see $42$. I know $6 \times 7 = 42$.
> So $42 \div 7 = 6$."

That's the whole technique. The hard part is fluency: noticing that
$56$ is "the seven-times-eight number" before you stop to think.

## Interactive

Exact divisions where the answer is a whole number from the times
table:

:::widget type=mental-drill generator=divide-exact-mixed count=10 id=div-exact:::

Now a slightly different drill — **divisibility by 3**. A number is
divisible by $3$ if and only if **the sum of its digits is divisible
by $3$**. (We'll see *why* in the Derivational section below.) For
$453$: $4 + 5 + 3 = 12$, and $12 = 3 \times 4$, so yes. For $401$:
$4 + 0 + 1 = 5$, not divisible by $3$, so no.

Type **1** for divisible, **0** for not.

:::widget type=mental-drill generator=divisibility-by-3 count=10 id=div3:::

## Symbolic

Division is the **inverse** of multiplication. The statement

$$
a \div b = c
$$

means exactly the same thing as

$$
b \times c = a.
$$

So if you can multiply, you can divide — just ask the multiplication
question backwards. This is why "$42 \div 7$" lights up the same
mental lookup as "$7 \times \mathord{?} = 42$."

The other useful pair of facts is **divide-by-10** and
**multiply-by-10**, which are mirror images of each other:

- Multiplying by $10$ slides every digit **left** one place
  (Lesson 03).
- Dividing by $10$ slides every digit **right** one place. The units
  digit falls off the end into the *remainder*.

So $420 \div 10 = 42$ exactly. And $425 \div 10 = 42$ with **remainder
5** — the leftover-five didn't fit into a full ten.

## Computational

Python has two division operators that pair perfectly with the
sharing/grouping picture:

- `//` — **integer division** ("how many full groups fit?")
- `%`  — **remainder** ("what's left over?")

```python
# 25 cookies shared among 4 children
print(25 // 4)   # 6  — each child gets 6 cookies
print(25 % 4)    # 1  — there is 1 cookie left over

# Exact divisions: remainder is 0
print(42 // 7)   # 6
print(42 % 7)    # 0  — clean division, nothing left
```

The divisibility-by-3 rule, in code:

```python
def digit_sum(n):
    total = 0
    while n > 0:
        total = total + (n % 10)   # peel off the last digit
        n = n // 10                 # drop it
    return total

print(digit_sum(453))     # 4 + 5 + 3 = 12
print(digit_sum(453) % 3) # 0  — so 453 is divisible by 3
print(453 % 3)            # 0  — confirmed: 453 / 3 leaves no remainder

print(digit_sum(401))     # 5
print(digit_sum(401) % 3) # 2  — not divisible
print(401 % 3)            # 2  — confirmed
```

Notice how `n % 10` peels off the rightmost digit and `n // 10` drops
it. That is the same procedure you used in Lesson 01 to convert a
number into its digits — just in reverse order.

## Derivational

*Why* does the digit-sum rule for divisibility-by-3 work?

Look at place value. The number $453$ is

$$
453 = 4 \times 100 + 5 \times 10 + 3 \times 1.
$$

Now notice that **each power of $10$ is one more than a multiple of
$3$**:

- $1 = 0 \times 3 + 1$
- $10 = 3 \times 3 + 1$
- $100 = 33 \times 3 + 1$
- $1000 = 333 \times 3 + 1$
- … and so on.

So we can rewrite $453$ as

$$
453 = 4 \times (\text{multiple of 3}) + 4
    + 5 \times (\text{multiple of 3}) + 5
    + 3 \times (\text{multiple of 3}) + 3.
$$

Group all the "multiple of 3" pieces together — they obviously stay a
multiple of 3, so they don't matter. What's left is just the **digits**
themselves: $4 + 5 + 3 = 12$. So $453$ leaves the same remainder when
divided by $3$ as $12$ does. And $12$ is a multiple of $3$, so $453$
is too.

This argument works for any number: every power of $10$ is "one more
than a multiple of $3$," so each digit contributes itself to the
remainder. Sum the digits and check if *that* sum is a multiple of $3$.

The same trick gives a divisibility rule for $9$ — and for the same
reason, since each power of $10$ is also "one more than a multiple
of $9$" ($1 = 0 \cdot 9 + 1$, $10 = 1 \cdot 9 + 1$, $100 = 11 \cdot 9
+ 1$, …).

## Connective

Division-as-grouping is everywhere in computing:

- **Pagination**: $237$ items, $20$ per page → $237 \div 20 = 11$
  full pages, with $17$ items left over → so $12$ pages, the last one
  partially full.
- **Time conversion**: $185$ minutes $\div 60 = 3$ hours, with $5$
  minutes left over.
- **Storage**: a $7000$-byte file in $1024$-byte blocks is $\lceil
  7000 / 1024 \rceil = 7$ blocks, with the last block partially
  full.
- **Looping with stride**: a `for` loop that jumps in steps of $3$
  through $30$ items runs $30 \div 3 = 10$ times.

The remainder operator `%` (called **modulo**) is the workhorse:
"every $n$th iteration," "is this number even?" ($n \% 2 == 0$),
"hash this key into a table of size $N$" ($key \% N$). All of these
are mental-division questions in disguise. Strand 5 will go deeper,
but you've already met the operator.

## Applied

- **Splitting a bill**: $\$84$ split among $4$ friends — each pays
  $\$84 \div 4 = \$21$. Mental shortcut: divide by $2$ twice.
  $84 \div 2 = 42$, $42 \div 2 = 21$.
- **Unit pricing**: a $6$-pack of soda costs $\$9$ → $\$9 \div 6 =
  \$1.50$ each. Useful for comparing two pack sizes in a shop.
- **Hours to days**: $50$ hours $\div 24 = 2$ days with $2$ hours
  remainder.
- **Pagination**: $147$ photos, $12$ per page → $147 \div 12 = 12$
  full pages with $3$ photos on the last (partial) page.
- **Recipe halving**: a recipe for $8$ but you want $4$ → divide every
  ingredient by $2$. Two cups of flour becomes one.

## Check Your Understanding

:::widget type=numeric-input prompt="What is $56 \div 7$?" answer=8 explain="From the times table backwards: $7 \times 8 = 56$, so $56 \div 7 = 8$.":::

:::widget type=numeric-input prompt="A class has $48$ students split equally into $6$ groups. How many in each group?" answer=8 explain="$48 \div 6 = 8$. (And $6 \times 8 = 48$ confirms it.)":::

:::widget type=numeric-input prompt="Is $612$ divisible by $3$? (Type 1 for yes, 0 for no.) Hint: sum the digits." answer=1 explain="$6 + 1 + 2 = 9$, which is $3 \times 3$. So $612$ is divisible by $3$. (Indeed, $612 = 3 \times 204$.)":::

:::widget type=numeric-input prompt="If $25$ cookies are shared among $4$ children, how many cookies are left over after each child gets the same whole number?" answer=1 explain="Each child gets $6$ cookies ($4 \times 6 = 24$). One cookie is left over. In Python this is $25 \\% 4 = 1$.":::
