# Bounding and Estimation

## Intuition

Not every problem asks for an exact answer. Many JEE problems ask you to prove an inequality, find which integer an expression lies between, or determine the behaviour of a sequence. The strategy: instead of computing the exact value, trap it between two simpler quantities.

This is how mathematicians think about hard problems — if you can't solve it exactly, bound it from above and below until the bounds meet.

## Prerequisites

- Tier 17, Lesson 4 (Inequalities and extrema)
- Tier 3, Lesson 2 (Derivatives and monotonicity)

## The Strategy

**Core techniques:**

1. **Sandwich (Squeeze) Theorem:** If g(x) <= f(x) <= h(x) and lim g = lim h = L, then lim f = L.

2. **AM-GM for bounding:** For positive reals, the arithmetic mean bounds the geometric mean. Chain AM-GM-HM to get two-sided bounds.

3. **Monotonicity:** If f'(x) > 0 on [a,b], then f(a) < f(x) < f(b). Use this to bound f without computing it.

4. **Mean Value Theorem:** f(b) - f(a) = f'(c)(b-a) for some c in (a,b). If you can bound f', you can bound the function change.

5. **Integral comparison:** If f(x) <= g(x) on [a,b], then integral of f <= integral of g. Also: sum from 1 to n of f(k) is bounded by integrals of f.

6. **Growth rate comparison:** For large n, the hierarchy is: log(n) << n^a << n^b (a<b) << c^n << n! << n^n.

**When to bound:** When exact computation is impossible or unnecessary, when the problem says "prove >=", "show that... lies between", or when answer choices are well-separated.

## Worked Problems

### Problem 1: Squeeze Theorem for a Limit

**Problem:** Find lim(n → infinity) of (1/sqrt(n^2+1) + 1/sqrt(n^2+2) + ... + 1/sqrt(n^2+n)).

**Recognise:** Each term is close to 1/n but not exactly. Bound each term from above and below.

**Solution:**

The sum has n terms. For k = 1, 2, ..., n:

1/sqrt(n^2 + n) <= 1/sqrt(n^2 + k) <= 1/sqrt(n^2 + 1)

Lower bound: n * 1/sqrt(n^2 + n) = n/sqrt(n^2 + n) = 1/sqrt(1 + 1/n) → 1

Upper bound: n * 1/sqrt(n^2 + 1) = n/sqrt(n^2 + 1) = 1/sqrt(1 + 1/n^2) → 1

By Squeeze Theorem: limit = 1.

### Problem 2: AM-GM to Prove an Inequality

**Problem:** For positive reals a, b, c with a + b + c = 1, prove that (1 + 1/a)(1 + 1/b)(1 + 1/c) >= 64.

**Recognise:** Product inequality with a constraint on sum — classic AM-GM setup.

**Solution:**

1 + 1/a = (a + 1)/a. But we want to use a + b + c = 1.

Rewrite: 1 + 1/a = 1/a + 1 = (1)/a. Actually: (1 + 1/a) = (a + 1)/a.

Since a + b + c = 1: 1 + 1/a = (a + 1)/a. Hmm, let's use a different approach.

Note: 1 + 1/a = (a + b + c + 1)/a... No.

Direct approach: 1/a = (a + b + c)/a = 1 + b/a + c/a.
So 1 + 1/a = 2 + b/a + c/a. This is getting complicated.

Better: By AM-GM, for any positive x with x < 1:
1/x >= 1 (obvious since x <= 1). But we need a tighter bound.

Best approach: By AM-GM, a + b + c = 1 and a, b, c > 0 means a, b, c <= 1.

(1 + 1/a)(1 + 1/b)(1 + 1/c) = [(a+1)/a] * [(b+1)/b] * [(c+1)/c]

Hmm, a + 1 is not directly related to the constraint. Let me try:

1 + 1/a = 1 + (a + b + c)/a... No, that's 1 + 1 + b/a + c/a.

Clean approach: We want to minimise (1+1/a)(1+1/b)(1+1/c) subject to a+b+c=1.

By AM-GM: 1 + 1/a = 1 + 1/a >= 2*sqrt(1/a) = 2/sqrt(a). But this gives product >= 8/sqrt(abc).

By AM-GM on a, b, c: (a+b+c)/3 >= (abc)^(1/3), so 1/3 >= (abc)^(1/3), abc <= 1/27.
Hence 1/sqrt(abc) >= sqrt(27) = 3*sqrt(3). So product >= 8*3*sqrt(3)... this overshoots.

Direct method: Take log and use Jensen's inequality since ln(1 + 1/x) is convex for x > 0.

Actually simplest: note 1 + 1/a >= 4(1-a) when a <= 1/2... No.

Cleanest proof: By AM-GM applied differently:
(1 + 1/a) = 1 + 1/a. By constraint a + b + c = 1:

1 + 1/a = (a + a + b + c)/(a)... no.

Let me just use: By AM-GM, for a + b + c = 1 with a, b, c > 0, we have abc <= 1/27 (AM-GM on a, b, c).

(1 + 1/a)(1 + 1/b)(1 + 1/c) = (1+a+b+c... No.

OK, direct computation:
(1 + 1/a) = (1+a)/a. Product = (1+a)(1+b)(1+c)/(abc).

Since a + b + c = 1:
(1+a)(1+b)(1+c) = 1 + (a+b+c) + (ab+bc+ca) + abc = 2 + (ab+bc+ca) + abc.

By AM-GM: ab + bc + ca <= (a+b+c)^2/3 = 1/3.
And abc <= 1/27.

This gives an upper bound, not what we want. Let's try the other piece.

By AM-GM: abc <= (a+b+c)^3/27 = 1/27, so 1/(abc) >= 27.
Also (1+a)(1+b)(1+c) >= 1 + 1 + 1/3 = 2.33... (using ab+bc+ca >= 0). Actually we need (1+a) >= 1 + 1/3 by... no.

Simplest correct proof:
By AM-GM: 1 + 1/a = 1 + 1/a >= 2/sqrt(a) [since AM >= GM on {1, 1/a}].

Product >= 8/sqrt(abc).

By AM-GM: abc <= ((a+b+c)/3)^3 = 1/27.
So sqrt(abc) <= 1/(3*sqrt(3)).
Hence 1/sqrt(abc) >= 3*sqrt(3).

Product >= 8 * 3*sqrt(3) = 24*sqrt(3) ~ 41.6. This is weaker than 64!

The AM-GM bound 2/sqrt(a) is too lossy. Let's use a different approach.

**Correct approach using AM-GM directly:**
For each factor: 1 + 1/a = 1 + 1/a.

By AM-GM on three copies of 1/(3a): 1/a = 3 * (1/(3a)).
So 1 + 1/a = 1 + 3*(1/(3a)) >= 4 * (1/(3a))^(3/4)... This is getting circular.

**Cleanest proof:** By AM-GM inequality:
1 + 1/a = (b+c)/a + 1 + 1... Actually let's just use the substitution.

Note a + b + c = 1. Then:
(1 + 1/a) = ((a + b + c) + (a + b + c))/a ... Nope.

OK final approach — the correct clean proof:

We show each factor >= 4(1/3)... Actually the minimum is at a = b = c = 1/3 by symmetry, giving (1 + 3)^3 = 64.

To prove it formally: By AM-GM on the logarithm, or by the inequality of arithmetic and geometric means directly:

log[(1+1/a)(1+1/b)(1+1/c)] = log(1+1/a) + log(1+1/b) + log(1+1/c).

Since f(x) = log(1 + 1/x) is convex (verify: f''(x) > 0 for x > 0), by Jensen's inequality:
(1/3)[f(a) + f(b) + f(c)] >= f((a+b+c)/3)... 

Wait, Jensen for convex gives >= for the function evaluated at the mean only when the inequality goes the right way. For convex f: f(mean) <= mean of f. So:

[f(a) + f(b) + f(c)]/3 >= f(1/3) = log(1 + 3) = log(4) = 2 log 2.

Sum >= 6 log 2 = log(64).

Exponentiating: Product >= 64. Done!

### Problem 3: Derivative Bound

**Problem:** Show that for all x > 0: ln(1 + x) < x.

**Recognise:** Define g(x) = x - ln(1+x). Show g(x) > 0 for x > 0 using monotonicity.

**Solution:**

Let g(x) = x - ln(1 + x).
g(0) = 0.
g'(x) = 1 - 1/(1+x) = x/(1+x) > 0 for all x > 0.

Since g(0) = 0 and g is strictly increasing for x > 0, we have g(x) > 0 for all x > 0.
Therefore x > ln(1 + x), i.e., ln(1 + x) < x.

### Problem 4: Integral Bounds for Sums

**Problem:** Find which integers the sum S = 1/sqrt(1) + 1/sqrt(2) + ... + 1/sqrt(100) lies between.

**Recognise:** The sum of f(k) can be bounded by integrals of f(x) = 1/sqrt(x), since f is decreasing.

**Solution:**

For decreasing f, we have:
integral from 1 to n+1 of f(x) dx < sum from k=1 to n of f(k) < f(1) + integral from 1 to n of f(x) dx.

Here f(x) = 1/sqrt(x) = x^(-1/2), integral = 2*sqrt(x).

Lower bound: integral from 1 to 101 of x^(-1/2) dx = 2*sqrt(101) - 2*sqrt(1) = 2(sqrt(101) - 1) ~ 2(10.05 - 1) = 18.1.

Upper bound: 1 + integral from 1 to 100 of x^(-1/2) dx = 1 + 2*sqrt(100) - 2 = 1 + 20 - 2 = 19.

So 18.1 < S < 19. Therefore S lies between 18 and 19 (specifically, floor(S) = 18).

More precisely: Lower bound = 2(sqrt(101) - 1) = 2(10.0499 - 1) = 18.0998.
Upper bound = 19.

So S is in (18, 19).

### Problem 5: Growth Rate Comparison

**Problem:** Determine lim(n → infinity) of n^100 / 2^n.

**Recognise:** Polynomial vs exponential — exponential always wins. But we need to prove it rigorously.

**Solution:**

Method 1 (Ratio test): Let a_n = n^100 / 2^n.

a_{n+1}/a_n = ((n+1)/n)^100 * (1/2) = (1 + 1/n)^100 * (1/2).

For large n: (1 + 1/n)^100 → 1. So eventually a_{n+1}/a_n < 3/4 < 1.

Since the ratio is eventually less than 1 (in fact less than any r < 1 for large enough n), the sequence converges to 0.

Method 2 (Squeeze): For n >= 200, write 2^n = (1+1)^n >= C(n, 101) * 1^101 = n!/(101!(n-101)!) which grows as n^101/101!.

So n^100/2^n <= n^100 * 101! / n^101 = 101!/n → 0.

### Problem 6: Bounding with Mean Value Theorem

**Problem:** Without a calculator, show that 0.098 < sqrt(10) - 3 - 1/(6) < 0.1.
Actually, let's do: Show that 10.049 < sqrt(101) < 10.05.

**Recognise:** Use MVT or linear approximation with error bounds.

**Solution:**

Let f(x) = sqrt(x). f(100) = 10. f'(x) = 1/(2*sqrt(x)).

By MVT: f(101) - f(100) = f'(c) * 1 for some c in (100, 101).

f'(100) = 1/20 = 0.05, f'(101) = 1/(2*sqrt(101)) < 1/20 = 0.05.

Since f' is decreasing: f'(101) < f'(c) < f'(100).

1/(2*sqrt(101)) < sqrt(101) - 10 < 1/20 = 0.05.

Lower bound: 1/(2*sqrt(101)) > 1/(2*10.05) > 1/20.1 > 0.0497.

So: 10.0497 < sqrt(101) < 10.05.

### Problem 7: Bounding a Sequence

**Problem:** Let a_n = (1 + 1/n)^n. Show that {a_n} is increasing and bounded above by 3.

**Recognise:** This is the sequence converging to e. Use AM-GM and binomial expansion for bounds.

**Solution:**

**Upper bound (a_n < 3):** By binomial theorem:
(1 + 1/n)^n = sum from k=0 to n of C(n,k) * (1/n)^k

C(n,k)/n^k = [n(n-1)...(n-k+1)] / n^k < 1 for all k >= 1.

Actually: C(n,k)/n^k = (1)(1-1/n)(1-2/n)...(1-(k-1)/n) <= 1.

So (1 + 1/n)^n < sum from k=0 to n of 1/k! <= sum from k=0 to infinity of 1/k!.

But we want a bound of 3 without knowing e. Note:
1/k! <= 1/2^(k-1) for k >= 1 (verify: 1/1! = 1 = 1/2^0, 1/2! = 1/2 = 1/2^1, 1/3! = 1/6 < 1/4 = 1/2^2, etc.)

So sum <= 1 + sum from k=1 to infinity of 1/2^(k-1) = 1 + 2 = 3.

**Increasing:** Take log: n*ln(1 + 1/n). Show this increases with n.
Let f(x) = x*ln(1 + 1/x) for x > 0. f'(x) = ln(1 + 1/x) + x*(-1/x^2)/(1 + 1/x) = ln(1+1/x) - 1/(x+1).

Since ln(1+t) > t/(1+t) for t > 0 (set t = 1/x): ln(1 + 1/x) > (1/x)/(1 + 1/x) = 1/(x+1).

So f'(x) > 0, confirming the sequence is increasing.

## Python Verification

```python
import numpy as np

# Problem 1: Squeeze theorem limit
def compute_sum(n):
    return sum(1/np.sqrt(n**2 + k) for k in range(1, n+1))

for n in [100, 1000, 10000, 100000]:
    print(f"n={n:>6}: sum = {compute_sum(n):.6f}")
print("Limit should be 1.000000")
print()

# Problem 4: Sum 1/sqrt(k) for k=1..100
S = sum(1/np.sqrt(k) for k in range(1, 101))
print(f"Problem 4: S = {S:.6f} (should be between 18 and 19)")
print()

# Problem 5: n^100 / 2^n
for n in [100, 500, 1000, 2000]:
    # Use logarithm to avoid overflow
    log_val = 100 * np.log10(n) - n * np.log10(2)
    print(f"n={n}: log10(n^100/2^n) = {log_val:.1f}")
print("Goes to -infinity, confirming limit is 0")
print()

# Problem 6: sqrt(101)
print(f"Problem 6: sqrt(101) = {np.sqrt(101):.6f}, bounds: (10.0497, 10.05)")
print()

# Problem 7: (1 + 1/n)^n is increasing and < 3
for n in [1, 2, 5, 10, 100, 1000, 10000]:
    val = (1 + 1/n)**n
    print(f"n={n:>5}: (1+1/n)^n = {val:.6f}")
print(f"e = {np.e:.6f}")
```

## When This Strategy Fails

- **When exact answers are needed:** Bounding gives ranges, not precise values. If the problem asks "find the value", bounding alone won't suffice (though it can eliminate wrong answer choices).
- **Loose bounds:** If your upper and lower bounds don't converge to the same value, you need tighter estimates. Common mistake: using too-crude an approximation for AM-GM.
- **Non-monotonic functions:** If f oscillates, bounding f(x) between f(a) and f(b) doesn't work. You need to find the actual max/min on the interval.
- **The bound exists but is not tight:** Proving x >= 0 when the problem asks to prove x >= 5 — your bound is correct but useless.

## Connection to CS / Games / AI / Business / Industry

"Estimate before you compute, bound before you solve" is one of the most
transferable skills in this entire tier:

- **CS / Software.** **Big-O analysis** is bounding: $T(n) \in O(n \log n)$
  is exactly the upper-bound game we play here. **Probabilistic data
  structures** (Bloom filters, count-min sketch, HyperLogLog) ship with
  rigorous one- or two-sided error bounds — engineers pick them by
  computing those bounds.
- **AI / ML.** **Generalisation bounds** (PAC, VC dimension, PAC-Bayes,
  Rademacher complexity) tell you how much training data a model needs
  to behave on unseen data — these are the *theoretical* foundation of
  ML, all bounding inequalities. Concentration inequalities (Hoeffding,
  Chernoff) are how online learning algorithms decide when to commit.
- **Engineering / Real-time systems.** **Worst-case execution-time
  analysis** for avionics, automotive ECUs, and pacemakers requires
  proving an *upper bound* on every code path. Control-theory **stability
  margins** are bounds on how much a system can be perturbed before it
  oscillates.
- **Business / Finance.** **Value-at-Risk** is "with 99% probability the
  loss is less than $X" — a probability bound. Confidence intervals on
  A/B test results, **stress-test scenarios**, and rate-limit/SLA capacity
  planning are all bounding exercises.
- **Cryptography.** **Reductions** in modern crypto ("breaking this scheme
  is at least as hard as factoring") are inequalities — the security
  proof IS a bound on the adversary's success probability.

## Check Your Understanding

1. Show that for n >= 1: 2*sqrt(n+1) - 2 < 1 + 1/sqrt(2) + 1/sqrt(3) + ... + 1/sqrt(n) < 2*sqrt(n) - 1. [Hint: integral comparison, f(x) = 1/sqrt(x) is decreasing.]

2. Prove that for 0 < x < pi/2: (2/pi)*x < sin(x) < x. [Hint: For the left inequality, consider the concavity of sin. For the right, use f(x) = x - sin(x).]

3. Determine lim(n → infinity) of [1/(n+1) + 1/(n+2) + ... + 1/(2n)]. [Hint: This is a Riemann sum in disguise, but first bound it between two integrals.]
