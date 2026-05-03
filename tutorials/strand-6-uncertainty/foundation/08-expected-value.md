---
strand: uncertainty
level: foundation
order: 8
title: Expected Value — The Long-Run Average
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 03-simulating-probability
    description: Simulation and the law of large numbers
connections:
  - strand-6-uncertainty-foundation/09-applied-uncertainty
  - strand-1-number-quantity-foundation/07-fraction-arithmetic
applications:
  - business: "Insurance premiums, lottery house edge, A/B test economics"
  - cs: "Expected runtime of a randomised algorithm, average response time"
  - games: "Average reward per kill, expected damage per attack"
  - life: "Should I buy this lottery ticket? Take this bet? Carry an umbrella?"
---

# Expected Value — The Long-Run Average

## Mental

Suppose someone offers you a bet: roll a fair die. If you roll a $6$,
they pay you $\$10$. Otherwise, you pay them $\$2$. Should you take
it?

The probability of winning is $\tfrac{1}{6}$, of losing $\tfrac{5}{6}$.
Per game, you win $\$10$ with probability $\tfrac{1}{6}$ and lose
$\$2$ with probability $\tfrac{5}{6}$. Your **average outcome per
game** is

$$
\tfrac{1}{6} \cdot \$10 + \tfrac{5}{6} \cdot (-\$2) = \tfrac{10}{6} - \tfrac{10}{6} = \$0.
$$

Zero — over many plays, you'd break even. **The expected value of
this bet is zero.** It's a *fair* bet, mathematically speaking.

If the payout were $\$11$ instead, the expected value would be
$\tfrac{1}{6} \cdot \$11 - \tfrac{5}{6} \cdot \$2 = \tfrac{11 - 10}{6}
= +\$0.17$ per game. **You'd want to take that bet.** Over many
plays, you'd come out ahead by about $17$ cents per game on average.

If the payout were $\$5$, the expected value would be
$\tfrac{1}{6} \cdot \$5 - \tfrac{5}{6} \cdot \$2 = \tfrac{5 - 10}{6}
= -\$0.83$ per game. **You'd refuse.** Over many plays, you'd lose
about $83$ cents per game on average.

The general idea: **expected value is the weighted average of the
outcomes, weighted by their probabilities.**

$$
E = p_1 \cdot v_1 + p_2 \cdot v_2 + \ldots + p_n \cdot v_n,
$$

where $v_1, \ldots, v_n$ are the possible outcome values and $p_1,
\ldots, p_n$ are their probabilities. The result $E$ is the value
your **long-run average** will converge to (Lesson 03's law of
large numbers, applied to values rather than fractions).

The word "expected" is a little misleading. The expected value
might be a number that **never actually happens** in any single
trial. The expected value of a fair die roll is $3.5$ — but no roll
ever lands on $3.5$. It's the long-run **average**, not what you
"expect on the next roll."

## Interactive

:::widget type=numeric-input prompt="A fair coin: heads pays $\\$5$, tails costs $\\$3$. What is the expected value per flip? Type the decimal." answer=1 explain="$0.5 \\cdot 5 + 0.5 \\cdot (-3) = 2.5 - 1.5 = 1$. On average you make $\\$1$ per flip — a great bet.":::

:::widget type=numeric-input prompt="A fair die roll. Outcomes 1, 2, 3, 4, 5, 6 each have probability $\\dfrac{1}{6}$. What is the expected roll value?" answer=3.5 explain="$\\dfrac{1}{6}(1+2+3+4+5+6) = \\dfrac{21}{6} = 3.5$. The long-run average over many rolls converges to $3.5$ — even though $3.5$ never appears on a single roll.":::

:::widget type=numeric-input prompt="A spinner has $P(\\text{red}) = 0.4$ paying $\\$10$, $P(\\text{blue}) = 0.6$ costing $\\$5$. What is the expected value per spin? Type the decimal." answer=1 explain="$0.4 \\cdot 10 + 0.6 \\cdot (-5) = 4 - 3 = 1$. Per spin you average $+\\$1$.":::

Watch a fair die's expected value emerge by simulation. Run +200
many times — the **observed** average creeps toward the **theoretical**
value $3.5$ (the dashed line).

:::widget type=probability-sim experiment=fair-die step=200 target=6:::

(The "target" here is just for showing the proportion settling. The
expected value of the die is $3.5$ — which is what the *average of
all rolls* would converge to. The graph above shows the histogram of
each face, where each bar settles to $\tfrac{1}{6}$.)

:::widget type=numeric-input prompt="A lottery ticket costs $\\$2$. The grand prize is $\\$1{,}000{,}000$, and the probability of winning is $\\dfrac{1}{10{,}000{,}000}$. What is the expected value (in dollars) of one ticket — i.e., expected payout minus cost? Type the decimal, with the negative sign if needed." answer=-1.9 explain="Expected payout: $\\dfrac{1}{10{,}000{,}000} \\cdot 1{,}000{,}000 = 0.1$. Subtract cost: $0.1 - 2 = -1.9$. On average, each ticket loses you $\\$1.90$. Lotteries are a tax on people who can't compute expected value.":::

## Symbolic

For a discrete random variable $X$ that takes value $v_i$ with
probability $p_i$, the **expected value** $E[X]$ is

$$
E[X] = \sum_i p_i \cdot v_i.
$$

This generalises the equally-likely formula $\tfrac{|A|}{|S|}$:
when all $p_i = \tfrac{1}{n}$, the formula collapses to the
ordinary average $\tfrac{1}{n}(v_1 + v_2 + \ldots + v_n)$.

Two properties worth knowing — "expectation is linear":

$$
E[aX + b] = a \cdot E[X] + b
$$

and, for any two random variables $X, Y$,

$$
E[X + Y] = E[X] + E[Y].
$$

That second one — **the expected value of a sum is the sum of
expected values** — does **not** require independence. Even when $X$
and $Y$ are deeply correlated, their expectations still add. This is
unusual; almost everything else in probability cares about
independence. It's part of why expectation is so useful.

For the dice game from the Mental section:

$$
E[\text{net winnings}] = \tfrac{1}{6} \cdot 10 + \tfrac{5}{6} \cdot (-2) = \frac{10 - 10}{6} = 0.
$$

A bet with $E = 0$ is **fair**. A bet with $E > 0$ is **favourable**
(to the bettor). $E < 0$ is **unfavourable**. Casinos design every
game so that $E < 0$ for the player — but only slightly, so the
games still feel fun.

## Computational

Expected value of a die roll, by formula and by simulation:

```python
# Theoretical
sides = [1, 2, 3, 4, 5, 6]
prob = 1 / 6
expected = sum(p * v for p, v in [(prob, s) for s in sides])
print(expected)        # 3.5

# Simulation
import random
trials = 100_000
total = 0
for _ in range(trials):
    total += random.randint(1, 6)
print(total / trials)   # close to 3.5 — typically 3.49 to 3.51
```

A more general expected-value calculator:

```python
def expected_value(outcomes):
    """outcomes is a list of (probability, value) pairs."""
    return sum(p * v for p, v in outcomes)

# Dice bet: roll 6 wins $10, anything else loses $2
print(expected_value([(1/6, 10), (5/6, -2)]))    # 0.0  — fair bet

# Better dice bet: roll 6 wins $11
print(expected_value([(1/6, 11), (5/6, -2)]))    # ~0.17  — take this

# Lottery: 1 in 10M chance of $1M payout, $2 cost
print(expected_value([(1/10_000_000, 1_000_000 - 2),
                       (1 - 1/10_000_000, -2)]))   # ~-1.9
```

The lottery example shows the structure clearly: even with a million-
dollar prize, the tiny probability times the prize barely affects the
expected value, while the certain $\$2$ cost dominates.

## Derivational

*Why* does the formula $E[X] = \sum_i p_i v_i$ correctly predict the
long-run average?

Let $n_i$ be the **count** of times outcome $v_i$ appears in $N$
trials. The arithmetic average over $N$ trials is

$$
\bar{X} = \frac{n_1 v_1 + n_2 v_2 + \ldots + n_k v_k}{N}.
$$

Now divide each numerator term by $N$:

$$
\bar{X} = \frac{n_1}{N} \cdot v_1 + \frac{n_2}{N} \cdot v_2 + \ldots + \frac{n_k}{N} \cdot v_k.
$$

By the law of large numbers (Lesson 03), each $\dfrac{n_i}{N}$
converges to $p_i$ as $N$ grows. So

$$
\bar{X} \to p_1 v_1 + p_2 v_2 + \ldots + p_k v_k = E[X].
$$

The expected value formula is **exactly** "what the law of large
numbers says happens to the average of values." The same convergence
that gave us proportions in Lesson 03 gives us averages here.

## Connective

Expected value is the link between probability and decision-making:

- **Statistics** (Strand 6 Intermediate): variance, standard
  deviation, and confidence intervals are all built from expected
  values.
- **Game theory and optimal strategy**: the right action is often
  "the action with highest expected value." But not always — risk
  aversion, utility theory, and ruin probability complicate this.
- **Reinforcement learning**: an agent learns a *value function*
  estimating expected future reward for each state. Modern AI
  agents (chess engines, game-playing AI) are largely "expected-
  value calculators" running over enormous state spaces.
- **Linearity of expectation** is one of the most consequential
  facts in computer science — it lets you analyse the average
  behaviour of complicated algorithms by adding up simple per-step
  expectations, even when the steps depend on each other.

A cultural note: expected value is the *average* outcome, not the
*most likely* outcome. For a lottery ticket, the most likely
outcome is "lose everything." But the expected value averages
across all outcomes, including the rare big win. Don't confuse the
two — many financial mistakes start there.

## Applied

- **Insurance**: an insurer collects $\$1\,000$ premiums from
  $1\,000$ customers. They estimate the probability of a claim is
  $0.005$ per customer per year, with claims averaging $\$150\,000$.
  Expected payout per customer: $0.005 \cdot 150\,000 = \$750$.
  Expected profit per customer: $1\,000 - 750 = \$250$. The whole
  business is built on this calculation.
- **Lotteries**: as the Interactive section showed, lottery tickets
  almost always have $E < 0$. The state lottery is mathematically a
  *certain* loss in the long run.
- **Casino edge**: roulette pays $35:1$ on a single number, but
  there are $38$ numbers (in American roulette). $E[\text{net per
  unit bet}] = \tfrac{1}{38} \cdot 35 + \tfrac{37}{38} \cdot (-1) =
  -\tfrac{2}{38} \approx -\$0.053$. Every $\$1$ bet loses about
  $5$ cents on average — a tiny edge, but with millions of bets
  per day it's profit.
- **A/B test economics**: expected revenue per visitor on variant
  A is $E_A = 0.05 \cdot 50 = \$2.50$; on variant B,
  $E_B = 0.04 \cdot 60 = \$2.40$. A converts more often but for
  smaller amounts. Expected value picks A, but only by a hair.
- **Software performance**: a load balancer routes traffic to one
  of three servers with probabilities $0.4, 0.4, 0.2$. Expected
  response times are $50$, $40$, $80$ ms respectively. Expected
  response time per request: $0.4 \cdot 50 + 0.4 \cdot 40 + 0.2
  \cdot 80 = 20 + 16 + 16 = 52$ ms.

## Check Your Understanding

:::widget type=numeric-input prompt="A bet: with probability $0.3$ you win $\\$20$; with probability $0.7$ you lose $\\$10$. Expected value? Type the decimal." answer=-1 explain="$0.3 \\cdot 20 + 0.7 \\cdot (-10) = 6 - 7 = -1$. Slightly unfavourable; refuse it.":::

:::widget type=numeric-input prompt="A weighted die: $P(1) = 0.5$, $P(\\text{any of 2..6}) = 0.1$ each. Expected value of one roll? Type the decimal." answer=2.5 explain="$0.5 \\cdot 1 + 0.1 \\cdot (2 + 3 + 4 + 5 + 6) = 0.5 + 2.0 = 2.5$.":::

:::widget type=numeric-input prompt="A scratch ticket costs $\\$5$. Probabilities: $0.01$ of winning $\\$100$; $0.10$ of winning $\\$10$; otherwise $\\$0$. Expected net value (after cost)? Type the decimal." answer=-3 explain="Expected payout: $0.01 \\cdot 100 + 0.10 \\cdot 10 = 1 + 1 = 2$. Subtract cost: $2 - 5 = -3$. Each ticket loses $\\$3$ on average.":::

:::widget type=numeric-input prompt="Linearity of expectation: $E[X] = 5$, $E[Y] = 3$. What is $E[X + Y]$?" answer=8 explain="$E[X + Y] = E[X] + E[Y] = 5 + 3 = 8$. True for any $X, Y$ — independence not required.":::
