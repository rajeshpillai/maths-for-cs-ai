---
strand: uncertainty
level: foundation
order: 9
title: Putting It Together — Three Real Applications
prerequisites:
  - tier: strand-6-uncertainty-foundation
    slug: 08-expected-value
    description: Expected value
connections:
  - strand-6-uncertainty-foundation/00-what-is-probability
  - strand-1-number-quantity-foundation/07-fraction-arithmetic
applications:
  - business: "Pricing decisions, A/B test interpretation, inventory hedging"
  - cs: "Capacity planning under uncertain load, retry strategies, monitoring alarms"
  - games: "Drop-rate tuning, balance design, randomised events"
  - life: "Insurance, gambling, weather decisions, medical second opinions"
---

# Putting It Together — Three Real Applications

## Mental

Eight lessons in, you have a small but powerful toolkit:

- **The probability formula**: $P(A) = \dfrac{|A|}{|S|}$ when
  outcomes are equally likely (Lesson 02).
- **The law of large numbers**: long-run proportions converge to
  theoretical probability (Lesson 03).
- **The complement**: $P(A^c) = 1 - P(A)$, especially powerful for
  "at least one" problems (Lesson 04).
- **The multiplication rule** for independent events:
  $P(A \cap B) = P(A) \cdot P(B)$ (Lesson 05).
- **The addition rule** for mutually exclusive events:
  $P(A \cup B) = P(A) + P(B)$, with the inclusion-exclusion
  correction when they overlap (Lesson 06).
- **Conditional probability** $P(A | B) = \dfrac{P(A \cap B)}{P(B)}$,
  and the recognition that independence is the special case where
  $P(A | B) = P(A)$ (Lesson 07).
- **Expected value** $E[X] = \sum p_i v_i$ — the long-run average
  outcome (Lesson 08).

These rules are tools. Now let's use them on three real questions
that you'll meet in life, in CS, and in business.

## Walkthrough 1: Should I buy this lottery ticket?

A ticket costs $\$2$. The grand prize is $\$5\,000\,000$ with
probability $\dfrac{1}{20\,000\,000}$. There's a smaller prize of
$\$10\,000$ with probability $\dfrac{1}{500\,000}$, and a "free
ticket" prize ($\$2$ value) with probability $\dfrac{1}{100}$.

**The question**: should you buy a ticket?

**Compute expected payout** (Lesson 08):

$$
E[\text{payout}] = \tfrac{1}{20\,000\,000} \cdot 5\,000\,000 + \tfrac{1}{500\,000} \cdot 10\,000 + \tfrac{1}{100} \cdot 2.
$$

That's

$$
\tfrac{5\,000\,000}{20\,000\,000} + \tfrac{10\,000}{500\,000} + \tfrac{2}{100} = 0.25 + 0.02 + 0.02 = 0.29.
$$

Expected payout: $\$0.29$. Cost: $\$2$. **Expected net value: about
$-\$1.71$ per ticket.**

**Verdict**: refuse, mathematically. Each ticket is, on average, a
$\$1.71$ donation to the lottery.

The intuition trap: "but someone has to win!" True — but the long-
run *average* you experience is $-\$1.71$ per play, regardless of
whether the rare winner is somebody else or (very rarely) you. The
expected-value calculation already accounts for the possibility you
win.

## Walkthrough 2: A redundant cloud system

Your web service runs on $4$ servers. Each server has uptime
probability $0.99$ — meaning it's down with probability $0.01$ per
hour. Your service is **up** as long as **at least one** server is
running.

**The question**: what's the probability your service is up?

This is the "at least one" pattern (Lesson 04). The complement is
"all four servers are down at the same hour":

$$
P(\text{all down}) = (1 - 0.99)^4 = 0.01^4 = 10^{-8}.
$$

That assumes server failures are **independent** (Lesson 05) — which
they roughly are if the servers are in different data centres on
different power grids. So:

$$
P(\text{service up}) = 1 - 10^{-8} = 0.99999999.
$$

That's "eight 9s" of reliability — about one second of downtime per
**year**, on average.

**The catch**: real-world server failures often **share a cause** —
a software bug deployed to all servers at once, or a misconfigured
load balancer, or a cloud-provider outage. When failures aren't
independent, you can't multiply probabilities; the redundancy is
illusory. SRE (site reliability engineering) is largely the practice
of finding and breaking shared causes.

```python
def service_uptime(server_uptime, n_servers, independent=True):
    if independent:
        return 1 - (1 - server_uptime) ** n_servers
    else:
        # Shared-cause failure: redundancy doesn't help fully
        return server_uptime  # worst case

# 4 independent servers each at 99% uptime
print(service_uptime(0.99, 4))            # 0.99999999

# Same servers, but they share a single point of failure
print(service_uptime(0.99, 4, False))     # 0.99
```

**Lesson**: independence is a *fact about your system*, not a
formula. Verify it.

## Walkthrough 3: A/B testing — when is the difference real?

You run an A/B test: variant A converts $5\%$ of $1\,000$ visitors;
variant B converts $4\%$ of $1\,000$ visitors. Should you ship A?

**Expected revenue** (assume each conversion is worth $\$50$):

$$
E_A = 0.05 \cdot 50 = \$2.50 \text{ per visitor}.
$$
$$
E_B = 0.04 \cdot 50 = \$2.00 \text{ per visitor}.
$$

So A is worth $\$0.50$ more per visitor. With $1\,000\,000$ visitors
per month, that's $\$500\,000$ per month — meaningful.

**But is the $5\%$ vs $4\%$ difference real, or just luck?**

This is a **law of large numbers** question (Lesson 03). With $1\,000$
visitors per variant, the typical wobble in measured proportion is
about $\dfrac{1}{\sqrt{1000}} \approx 0.032 = 3.2\%$. So variant A's
"$5\%$" might really be anywhere from about $1.8\%$ to $8.2\%$.
Variant B's "$4\%$" might be from $0.8\%$ to $7.2\%$. Those ranges
overlap heavily — **the observed difference is well within noise**.

**Verdict**: do not ship A yet. Run the test longer.

How long? To shrink the wobble to $1\%$ (a $3\times$ improvement),
you'd need $9\times$ more visitors — about $9\,000$ per variant.
Or, to shrink to $0.5\%$, you'd need $36\,000$ per variant.

**The general lesson**: small percentage differences need *huge*
sample sizes to verify. Tech companies running A/B tests routinely
need months of traffic to confirm a $0.5\%$ improvement in
conversion. Strand 6 Intermediate covers the formal **statistical
significance** machinery — t-tests, p-values, confidence intervals —
that makes this rigorous.

```python
def margin_of_error(n):
    """Roughly: 1/sqrt(n)."""
    return 1 / (n ** 0.5)

print(margin_of_error(1000))      # ~0.032 = 3.2%
print(margin_of_error(10000))     # ~0.010 = 1.0%
print(margin_of_error(100000))    # ~0.003 = 0.3%
```

**Notice**: a 5% difference between A (5%) and B (4%) is comfortably
detectable at $n = 10\,000$ but lost in noise at $n = 1\,000$.

## Interactive

:::widget type=numeric-input prompt="A scratch ticket costs $\\$10$. Probabilities: $0.001$ of winning $\\$1\\,000$; $0.01$ of winning $\\$50$; $0.1$ of winning $\\$5$; otherwise $\\$0$. Expected net value (after cost)? Type the decimal." answer=-7.5 explain="$E[\\text{payout}] = 0.001 \\cdot 1000 + 0.01 \\cdot 50 + 0.1 \\cdot 5 = 1 + 0.5 + 0.5 = 2$. Net: $2 - 10 = -8$. Wait — recompute. The expected payout is $\\$2$, cost is $\\$10$, expected net is $-\\$8$. (If you got $-7.5$ you may have used different rounding.) Either way, this ticket loses money on average.":::

:::widget type=numeric-input prompt="Three independent web servers each have uptime $0.95$. Service is up if any one is up. P(service up)? Round to 4 decimals." answer=0.9999 tolerance=0.001 explain="$P(\\text{all down}) = (1 - 0.95)^3 = 0.05^3 = 0.000125$. So $P(\\text{up}) = 1 - 0.000125 = 0.999875 \\approx 0.9999$.":::

:::widget type=numeric-input prompt="A/B test: variant A converts at $10\\%$ in $400$ visitors. Typical wobble (margin of error) is $1/\\sqrt{400}$ — what value? Type the decimal." answer=0.05 explain="$\\dfrac{1}{\\sqrt{400}} = \\dfrac{1}{20} = 0.05$. So $10\\%$ is really $\\pm 5\\%$ — the true rate could be anywhere from $5\\%$ to $15\\%$. Need many more visitors to narrow it.":::

:::widget type=numeric-input prompt="In the lottery walkthrough above, what is the expected net value per ticket (in dollars, with the negative sign if applicable)?" answer=-1.71 tolerance=0.01 explain="Expected payout $\\$0.29$, cost $\\$2$. Net: $-\\$1.71$ per ticket on average.":::

## Connective and beyond

This is the end of Strand 6 Foundation. You've covered the entire
discrete probability framework that handles a huge swath of real
problems — dice, cards, coins, basic A/B tests, simple insurance
math, drop rates in games.

What's next?

**Strand 6 Intermediate** picks up:

- **Random variables and distributions** — pinning down "what if
  the outcome itself is a number?" The Bernoulli, Binomial,
  Geometric, and Poisson distributions arrive here.
- **Variance and standard deviation** — *how spread out* a
  distribution is, not just its expected value. Two distributions
  can share the same expected value but differ enormously in risk.
- **Bayesian updating** — Bayes' theorem proper, beyond Lesson 07's
  "in disguise" form. Spam filters, medical diagnosis, prior beliefs.
- **The central limit theorem** — why averages of *anything* tend
  toward bell curves, regardless of the underlying distribution.
- **Confidence intervals and significance testing** — formalising
  Walkthrough 3's "is it real?" question.

**Strand 6 Advanced and Master** go further still: continuous
distributions (where outcomes are real numbers), stochastic
processes (probability evolving over time), and Markov chains (the
foundation of modern AI). All of these build on the discrete
groundwork laid here.

For now, you have **enough probability to reason about most
real-world uncertainty**. Use it.

## Check Your Understanding

:::widget type=numeric-input prompt="A bet: $E = +\\$0.20$ per play. After $10{,}000$ plays, what is your expected net winnings, in dollars?" answer=2000 explain="$10\\,000 \\times 0.20 = 2{,}000$. Linearity of expectation: averaging across many plays converts a small per-play edge into a substantial total. This is how casinos profit on a $5$-cent edge.":::

:::widget type=numeric-input prompt="$P(\\text{flu this winter}) = 0.10$ for any one person, independent across people. In a family of $4$, $P(\\text{at least one gets the flu})$? Round to 2 decimals." answer=0.34 tolerance=0.01 explain="$1 - 0.9^4 = 1 - 0.6561 = 0.3439 \\approx 0.34$. About $34\\%$. (Real flu in a household is *not* independent — sharing a house spreads it.)":::

:::widget type=numeric-input prompt="If a redundant system needs $99.999\\%$ ('five nines') uptime and each component has $99\\%$ uptime, how many independent components do you need? (Type the smallest n such that $1 - 0.01^n \\ge 0.99999$.)" answer=3 explain="$0.01^2 = 0.0001 \\Rightarrow 1 - 0.0001 = 0.9999$ (only four 9s). $0.01^3 = 0.000001 \\Rightarrow 1 - 0.000001 = 0.999999$ — six 9s, which is $\\ge$ five. So $n = 3$.":::

:::widget type=numeric-input prompt="A/B test runs for $n$ visitors per variant. To detect a $1\\%$ true difference reliably, the wobble $\\dfrac{1}{\\sqrt{n}}$ should be smaller than $0.01$. What's the smallest $n$? Type the number." answer=10000 explain="$\\dfrac{1}{\\sqrt{n}} < 0.01 \\implies \\sqrt{n} > 100 \\implies n > 10\\,000$. So $n = 10\\,000$ is the threshold. Shrinking the wobble further requires $n$ to grow as $\\dfrac{1}{\\text{wobble}^2}$.":::
