---
strand: uncertainty
level: foundation
order: 3
title: Simulating Probability — The Law of Large Numbers
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 02-equally-likely-outcomes
    description: Equally likely outcomes
connections:
  - strand-6-uncertainty-foundation/00-what-is-probability
  - strand-1-number-quantity-foundation/06-fractions-as-ratios
applications:
  - business: "A/B testing — running enough trials to be confident the difference is real"
  - cs: "Monte Carlo simulation, randomised algorithms, load-testing"
  - games: "Watching reported drop rates settle toward the listed value over many runs"
  - life: "Why insurance works on large populations but not on individuals"
---

# Simulating Probability — The Law of Large Numbers

## Explain Like I Am 7

Flip a coin only ten times and the heads count might be wildly off
— maybe seven heads, maybe three.  But flip a coin a million
times and you'll land *very* close to half a million heads.  The
**law of large numbers** says the more times you try, the more the
real-world fraction creeps toward the calculated probability.  This
is why a casino or insurance company can predict yearly profits
even though each individual game or claim is unpredictable — they
play the same long game over and over again.

## Mental

So far probability has been a **theoretical** number we computed from
counting: $P(\text{heads}) = \tfrac{1}{2}$ because there are two
outcomes and one is favourable. But probability has a second meaning,
just as important — the **frequency** meaning:

> The probability of an event is the **fraction of the time it
> happens** when you repeat the experiment many, many times.

Flip a coin once — you get heads or tails. Useless.
Flip a coin **ten** times — you might get $4$ heads, or $7$. Still
noisy.
Flip a coin **a thousand** times — you'll get something close to
$500$. Maybe $483$, or $521$, or $497$.
Flip a coin **a million** times — you'll get very close to $500\,000$.

The fraction of heads gets closer and closer to $\dfrac{1}{2}$ as
trials grow. This pattern has a name: the **law of large numbers**.

It is the bridge between theoretical probability and reality. Without
it, probability would be just a definition. With it, probability is a
**prediction** — over enough trials, the world really does behave the
way the formula says.

The law has a flip side, sometimes called the **law of small
numbers** (a joke, but a useful one): with **few** trials, anything
can happen. Three heads in a row is unsurprising. Ten heads in a row
is rare but possible. Don't trust short runs.

## Interactive

Run the experiment. Click **Run +100** repeatedly and watch:

1. The **histogram bars** swap heights as outcomes accumulate.
2. The **observed proportion** number creeps toward the dashed
   theoretical line.
3. Early on, the observed value bounces around. As trials grow, it
   settles down and stays close to the theoretical.

A fair coin first:

:::widget type=probability-sim experiment=fair-coin step=100 target=heads:::

Now a fair die — try targeting a $6$:

:::widget type=probability-sim experiment=fair-die step=200 target=6:::

And the famous one — the **sum of two dice**, where the outcomes are
*not* equally likely:

:::widget type=probability-sim experiment=sum-of-two-dice step=200 target=7:::

Notice in the last one that $7$ is by far the most common sum, and
the values $2$ and $12$ are rare. That's because $7$ can be made many
ways ($1+6, 2+5, 3+4, 4+3, 5+2, 6+1$ — six ways) but $2$ can only be
made one way ($1+1$). The histogram tells you immediately.

:::widget type=numeric-input prompt="A fair coin is flipped 1000 times. About how many heads do you expect? (Type the closest round number.)" answer=500 explain="Theoretical $P(\\text{heads}) = 0.5$. Expected count is $0.5 \\times 1000 = 500$. The actual count will be close, but rarely *exactly* 500.":::

:::widget type=numeric-input prompt="A fair six-sided die is rolled 600 times. About how many 6s do you expect?" answer=100 explain="$P(6) = \\dfrac{1}{6}$. Expected count is $\\dfrac{600}{6} = 100$. Run the simulator above with 600 trials and check.":::

## Symbolic

Pin down the law of large numbers in slightly more formal language.
If you run an experiment $n$ times and the event $A$ occurs $k$ times,
the **observed proportion** is

$$
\hat{p} = \frac{k}{n}.
$$

(The hat on $\hat{p}$ is mathematician's notation for "estimate" — it
emphasises that this is the *measured* value, not the theoretical
one.)

The law of large numbers states:

> As $n \to \infty$, the observed proportion $\hat{p}$ approaches the
> theoretical probability $P(A)$ — and the error $|\hat{p} - P(A)|$
> shrinks toward zero.

There's a second part — sometimes called the **central limit
theorem**, but at Foundation level we'll just describe it
qualitatively — that says the **size of the wobble** at $n$ trials
shrinks roughly like $\dfrac{1}{\sqrt{n}}$. So:

- $100$ trials: typical wobble around $\dfrac{1}{\sqrt{100}} = 0.1$,
  i.e. $\pm 10\%$.
- $10\,000$ trials: typical wobble around $\dfrac{1}{\sqrt{10\,000}} =
  0.01$, i.e. $\pm 1\%$.
- $1\,000\,000$ trials: wobble around $0.001$, i.e. $\pm 0.1\%$.

Each $100\times$ increase in trials cuts the wobble by $10\times$. To
shrink your error by a factor of $10$, you need $100\times$ more
trials. **Precision is expensive.**

## Computational

Python's `random` module makes simulation a one-loop affair. Here's
the same coin-flip experiment as the widget:

```python
import random

def simulate_coin(trials):
    heads = 0
    for _ in range(trials):
        if random.random() < 0.5:
            heads = heads + 1
    return heads

print(simulate_coin(100))     # something like 47, 53, 50, 49 ...
print(simulate_coin(10000))   # something like 4980, 5021, 4994 ...
```

To watch the convergence numerically:

```python
import random

random.seed(42)            # deterministic — same run every time
trials = 0
heads = 0
print(f"{'trials':>8} {'heads':>8} {'proportion':>12}")
for batch in (10, 100, 1000, 10000, 100000):
    while trials < batch:
        if random.random() < 0.5:
            heads = heads + 1
        trials = trials + 1
    print(f"{trials:>8} {heads:>8} {heads/trials:>12.4f}")
```

Run that. You'll see something like:

```
   trials    heads   proportion
       10        7       0.7000
      100       55       0.5500
     1000      503       0.5030
    10000     5024       0.5024
   100000    50083       0.5008
```

The proportion **converges** to $0.5$. The first row's $0.70$ is
nothing to worry about — $7$ heads out of $10$ is well within normal
luck.

```python
# Monte Carlo: estimate a probability we don't know in closed form.
# What's the probability of rolling at least one 6 in 4 rolls?
import random
trials = 100000
hits = 0
for _ in range(trials):
    saw_six = False
    for _ in range(4):
        if random.randint(1, 6) == 6:
            saw_six = True
    if saw_six:
        hits = hits + 1
print(hits / trials)   # ~0.5177 — Lesson 04 will derive this exactly
```

Simulating an experiment to estimate a probability you couldn't
compute directly is called **Monte Carlo simulation**. It is one of
the most useful techniques in modern computing — used for nuclear
physics, financial pricing, weather modelling, and countless other
fields where the math is too tangled to solve in closed form.

## Derivational

*Why* does the law of large numbers work?

The complete proof lives in Strand 6 Intermediate, but the **intuition**
is straightforward. Each trial is independent: what happens on flip
$1$ doesn't affect flip $2$ doesn't affect flip $1000$. So when you
add up $n$ outcomes, **lucky high values cancel against lucky low
values** as $n$ grows. With more trials, the cancellations are more
thorough; the average gets pulled tighter and tighter to its
theoretical value.

A useful concrete picture: imagine you flip a coin ten times and
happen to get $7$ heads — that's $0.70$, well above $0.50$. To pull
the average back down to $0.50$, do you need a bunch of *tails-heavy*
runs going forward? Surprisingly, **no**. The "extra" heads ($7 - 5
= 2$) gets *diluted* by the next thousand flips. Even if those next
thousand flips are exactly $50/50$, your overall proportion is now
$\dfrac{507}{1010} \approx 0.502$ — almost back. The big trial count
in the denominator squeezes the small offset in the numerator down
to nothing.

There is a famous misconception called the **gambler's fallacy**:
"the next flip is *due* to be tails because we just got lots of
heads." That's wrong — coins have no memory. The proportion settles
toward $0.5$ not because the coin compensates for past flips, but
because future flips dilute past deviations.

## Connective

The law of large numbers is one of the most consequential ideas in
all of mathematics. You'll meet it in:

- **Statistics** (Strand 6 Intermediate): every confidence interval,
  every margin of error, every "the difference is statistically
  significant" claim relies on it.
- **Machine learning**: training a model on more data reduces the
  estimation error of the learned weights — a direct application.
- **Insurance**: an insurer can't predict whether *you* will have an
  accident this year, but they can predict almost exactly how many
  accidents will happen across a million customers.
- **Polling and surveys**: a poll of $1000$ people has roughly
  $\dfrac{1}{\sqrt{1000}} \approx 3\%$ margin of error — that
  $\dfrac{1}{\sqrt{n}}$ rule from the Symbolic section.
- **Casinos**: the house edge is small (often a few percent), but
  with millions of bets per day it converts almost exactly to that
  expected revenue. The casino doesn't beat *you*; it beats the law
  of large numbers, and over many bets the law beats *you*.

## Applied

- **A/B testing**: a website tests two button colours. After $100$
  visitors per variant, button A has $52\%$ click-through and
  button B has $48\%$. Is A really better, or just lucky? With
  $\dfrac{1}{\sqrt{100}} = 10\%$ wobble, the difference is well
  within noise. After $10\,000$ visitors per variant, the wobble
  shrinks to $1\%$, and a real $52$ vs $48$ becomes meaningful.
- **Drop rates in games**: a $2\%$ drop-rate item should appear
  about $20$ times in $1000$ kills. If you only get $5$, that's
  surprisingly few — but not impossible. Over $10\,000$ kills, you
  should be very close to $200$, and a big shortfall would suggest
  the rate is wrong.
- **Pseudo-random number generators**: software RNGs are tested
  precisely with this technique — generate millions of "random"
  numbers and check that each digit appears about $\dfrac{1}{10}$ of
  the time, each pair appears about $\dfrac{1}{100}$ of the time,
  and so on.
- **Polling**: a survey of $1000$ voters has margin of error around
  $\pm 3\%$. To halve that you'd need about $4\,000$ voters. To
  cut it by $10$, you'd need $100\,000$. This is why **good polls
  are expensive**.
- **Casino economics**: a roulette wheel with $1$ green pocket out
  of $38$ gives the house a $\dfrac{1}{38} \approx 2.6\%$ edge.
  Per spin, that's tiny. Per million spins per day across all
  tables, it's the casino's revenue.

## Check Your Understanding

:::widget type=numeric-input prompt="A fair coin is flipped 100 times. The typical wobble in proportion is about $1 / \\sqrt{n}$. What value is that, as a decimal?" answer=0.1 explain="$\\dfrac{1}{\\sqrt{100}} = \\dfrac{1}{10} = 0.1$. So observed proportion will typically be in $0.5 \\pm 0.1$, i.e. somewhere from $0.4$ to $0.6$.":::

:::widget type=numeric-input prompt="To shrink the typical wobble of a coin-flip experiment from 0.1 to 0.01 (10× smaller), how many *times more* trials do you need? Type the multiplier." answer=100 explain="$\\dfrac{1}{\\sqrt{n}}$ shrinks by $10\\times$ when $\\sqrt{n}$ grows by $10\\times$, which means $n$ grows by $100\\times$. Precision is expensive.":::

:::widget type=numeric-input prompt="In 1000 fair-coin flips, the theoretical expected number of heads is 500. Approximately how many *heads* in your run would you consider 'normal' (within one wobble)?" answer=485 explain="Wobble at 1000 trials is $\\dfrac{1}{\\sqrt{1000}} \\approx 0.032$. So proportion is roughly $0.5 \\pm 0.032$, giving counts roughly $500 \\pm 32$. Anything from about $468$ to $532$ is unsurprising. (Any answer in that range counts as right — $485$ is one reasonable choice.)":::

:::widget type=numeric-input prompt="True or false: 'After getting 5 heads in a row, the next flip of a fair coin is more likely to be tails.' (Type 1 for true, 0 for false.)" answer=0 explain="False — that's the gambler's fallacy. Coins have no memory. Each flip remains $P(\\text{heads}) = 0.5$. Past heads don't make future tails more likely; the proportion settles toward $0.5$ via dilution, not compensation.":::
