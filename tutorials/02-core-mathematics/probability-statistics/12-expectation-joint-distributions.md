# Expectation and Joint Distributions

## Intuition

When you have two random variables, how do you compute the expected value of
their sum?  Their product?  What if you only know one of them — can you still
say something about the other?  These questions are answered by the **linearity
of expectation**, the **product rule for independent variables**, and
**conditional expectation**.  These tools are essential for analysing anything
from portfolio returns to neural network outputs.

## Prerequisites

- Tier 4, Lesson 4: Expectation and Variance
- Tier 4, Lesson 11: Joint Distributions (joint PMF/PDF, marginals)

## From First Principles

### Expectation of a function of two variables

For discrete $X, Y$:

$$E[g(X, Y)] = \sum_x \sum_y g(x, y) \cdot p_{X,Y}(x, y)$$

For continuous:

$$E[g(X, Y)] = \int\int g(x, y) \cdot f_{X,Y}(x, y)\,dx\,dy$$

### Linearity of expectation

For **any** random variables $X$ and $Y$ (independent or not):

$$\boxed{E[X + Y] = E[X] + E[Y]}$$

**Proof (discrete case):**

$$E[X + Y] = \sum_x \sum_y (x + y)\,p_{X,Y}(x,y)$$
$$= \sum_x \sum_y x\,p_{X,Y}(x,y) + \sum_x \sum_y y\,p_{X,Y}(x,y)$$
$$= \sum_x x \sum_y p_{X,Y}(x,y) + \sum_y y \sum_x p_{X,Y}(x,y)$$
$$= \sum_x x\,p_X(x) + \sum_y y\,p_Y(y) = E[X] + E[Y]$$

This extends to any finite sum: $E\left[\sum_{i=1}^n X_i\right] = \sum_{i=1}^n E[X_i]$.

**Pen & paper:** Roll two dice.  $E[X_1 + X_2] = E[X_1] + E[X_2] = 3.5 + 3.5 = 7$.

No need to enumerate all 36 outcomes!

### Expectation of a product

For **independent** $X$ and $Y$:

$$\boxed{E[XY] = E[X] \cdot E[Y]} \quad \text{(independence required!)}$$

**Proof:** If independent, $p_{X,Y}(x,y) = p_X(x) \cdot p_Y(y)$:

$$E[XY] = \sum_x \sum_y xy\,p_X(x)p_Y(y) = \left(\sum_x x\,p_X(x)\right)\left(\sum_y y\,p_Y(y)\right) = E[X]\cdot E[Y]$$

**Warning:** If $X$ and $Y$ are NOT independent, $E[XY] \ne E[X]E[Y]$ in general.
The difference is the covariance: $\text{Cov}(X,Y) = E[XY] - E[X]E[Y]$.

### Pen & paper: Product expectation

**Independent case:** Roll two fair dice.
$E[X_1 \cdot X_2] = E[X_1] \cdot E[X_2] = 3.5 \times 3.5 = 12.25$

**Dependent case:** Let $X \sim \text{Uniform}\{1,2,3\}$ and $Y = X^2$.
$E[X] = 2$, $E[Y] = E[X^2] = (1+4+9)/3 = 14/3$
$E[XY] = E[X^3] = (1+8+27)/3 = 12$
$E[X]E[Y] = 2 \times 14/3 = 28/3 \approx 9.33$
$E[XY] = 12 \ne 9.33 = E[X]E[Y]$ — they are dependent.

### Variance of a sum

$$\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\text{Cov}(X, Y)$$

If independent ($\text{Cov} = 0$): $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$.

**Pen & paper:** Two fair dice.
$\text{Var}(X_1 + X_2) = 35/12 + 35/12 = 35/6 \approx 5.83$

### Conditional expectation

$$E[X \mid Y = y] = \sum_x x \cdot P(X = x \mid Y = y)$$

This is itself a function of $y$.  When $Y$ is random, $E[X \mid Y]$ is a
random variable.

### Pen & paper: Conditional expectation

Using the weather-accident table from Lesson 11:

| | $Y=0$ | $Y=1$ | $P(X=x)$ |
|---|---|---|---|
| $X=0$ (sunny) | 0.60 | 0.10 | 0.70 |
| $X=1$ (rainy) | 0.15 | 0.15 | 0.30 |

$E[X \mid Y=1] = 0 \cdot P(X=0|Y=1) + 1 \cdot P(X=1|Y=1)$

$P(X=0|Y=1) = 0.10/0.25 = 0.40$, $P(X=1|Y=1) = 0.15/0.25 = 0.60$

$E[X \mid Y=1] = 0(0.40) + 1(0.60) = 0.60$

Given an accident occurred, the expected "rain indicator" is 0.60.

### Law of total expectation (tower property)

$$\boxed{E[X] = E\left[E[X \mid Y]\right] = \sum_y E[X \mid Y=y] \cdot P(Y=y)}$$

**Pen & paper (continuing):**

$E[X] = E[X|Y=0] \cdot P(Y=0) + E[X|Y=1] \cdot P(Y=1)$

$E[X|Y=0] = 0 \cdot (0.60/0.75) + 1 \cdot (0.15/0.75) = 0.20$

$E[X] = 0.20 \times 0.75 + 0.60 \times 0.25 = 0.15 + 0.15 = 0.30$

Check: $E[X] = P(X=1) = 0.30$ ✓

## Python Verification

```python
# ── Expectation & Joint Distributions: pen & paper checks ─────
import random

# Linearity of expectation: two dice
print("=== Linearity of Expectation ===")
random.seed(42)
N = 100000
sums = []
for _ in range(N):
    x1 = random.randint(1, 6)
    x2 = random.randint(1, 6)
    sums.append(x1 + x2)

mean_sum = sum(sums) / N
print(f"E[X1 + X2] simulated: {mean_sum:.4f}")
print(f"E[X1] + E[X2] = 3.5 + 3.5 = 7.0")

# Product of independent variables
products = []
for _ in range(N):
    x1 = random.randint(1, 6)
    x2 = random.randint(1, 6)
    products.append(x1 * x2)

mean_prod = sum(products) / N
print(f"\nE[X1 * X2] simulated: {mean_prod:.4f}")
print(f"E[X1] * E[X2] = 3.5 * 3.5 = 12.25")

# Dependent case: X uniform {1,2,3}, Y = X^2
print(f"\n=== Dependent variables: Y = X^2 ===")
xy_products = []
for _ in range(N):
    x = random.choice([1, 2, 3])
    y = x ** 2
    xy_products.append(x * y)

mean_xy = sum(xy_products) / N
ex = 2.0
ey = 14/3
print(f"E[XY] = E[X^3] simulated: {mean_xy:.4f}, theoretical: 12.0")
print(f"E[X]*E[Y] = {ex * ey:.4f}")
print(f"Equal? {abs(mean_xy - ex*ey) < 0.1}")

# Variance of sum: two dice
print(f"\n=== Variance of Sum ===")
var_sum = sum((s - 7)**2 for s in sums) / N
print(f"Var(X1+X2) simulated: {var_sum:.4f}")
print(f"Var(X1) + Var(X2) = {35/12 + 35/12:.4f}")

# Conditional expectation: weather-accident example
print(f"\n=== Conditional Expectation ===")
joint = {(0,0): 0.60, (0,1): 0.10, (1,0): 0.15, (1,1): 0.15}
p_Y1 = 0.25
E_X_given_Y1 = 0 * (0.10/0.25) + 1 * (0.15/0.25)
print(f"E[X | Y=1] = {E_X_given_Y1:.4f}")

# Law of total expectation
p_Y0 = 0.75
E_X_given_Y0 = 0 * (0.60/0.75) + 1 * (0.15/0.75)
E_X = E_X_given_Y0 * p_Y0 + E_X_given_Y1 * p_Y1
print(f"E[X] via tower law = {E_X:.4f}")
print(f"E[X] directly = P(X=1) = 0.30")
```

## Visualisation — Joint, marginal, conditional

A *joint distribution* lives in two dimensions. **Marginals** are what
you get by summing over one axis (collapsing rows or columns).
**Conditionals** are what you get by *fixing* one variable and
renormalising the slice — a tall row reweighted to sum to 1.

```python
# ── Visualising joint, marginal, and conditional PMFs ───────
import numpy as np
import matplotlib.pyplot as plt

# Joint PMF over (X, Y) where X ∈ {0, 1, 2} (e.g. # of clicks),
# Y ∈ {0, 1, 2, 3} (e.g. # of conversions). Rows = Y, columns = X.
joint = np.array([
    [0.20, 0.10, 0.05],   # Y = 0
    [0.10, 0.15, 0.05],   # Y = 1
    [0.05, 0.10, 0.05],   # Y = 2
    [0.02, 0.05, 0.08],   # Y = 3
])
assert abs(joint.sum() - 1) < 1e-9, "joint must sum to 1"

# Marginals: sum across rows and columns.
P_X = joint.sum(axis=0)   # marginal of X (sum out Y)
P_Y = joint.sum(axis=1)   # marginal of Y (sum out X)

# Conditional P(X | Y = 1): take row Y = 1 and divide by P(Y = 1).
y_cond = 1
P_X_given_Y = joint[y_cond] / P_Y[y_cond]

fig, axes = plt.subplots(1, 3, figsize=(15, 5))

# (1) Joint PMF as a heatmap. Each cell's colour intensity is
# the joint probability of that (X, Y) outcome.
ax = axes[0]
im = ax.imshow(joint, cmap="Blues", aspect="auto")
ax.set_xticks(range(3)); ax.set_xticklabels([0, 1, 2])
ax.set_yticks(range(4)); ax.set_yticklabels([0, 1, 2, 3])
ax.set_xlabel("X"); ax.set_ylabel("Y")
for i in range(joint.shape[0]):
    for j in range(joint.shape[1]):
        ax.text(j, i, f"{joint[i, j]:.2f}", ha="center", va="center",
                color="white" if joint[i, j] > 0.10 else "black")
ax.set_title("Joint PMF P(X, Y)\n(every cell = prob of that (X, Y))")
plt.colorbar(im, ax=ax, fraction=0.046)

# (2) Marginals as bar charts. They sum to 1 *separately* — collapsing
# the joint along one axis yields the per-variable distribution.
ax = axes[1]
xpos = np.arange(3) - 0.2
ypos = np.arange(4) + 0.2
ax.bar(xpos, P_X, width=0.4, color="tab:blue",   alpha=0.85,
       label=f"P(X), sums to {P_X.sum():.2f}")
ax.bar(ypos, P_Y, width=0.4, color="tab:orange", alpha=0.85,
       label=f"P(Y), sums to {P_Y.sum():.2f}")
ax.set_xticks(np.concatenate([np.arange(3) - 0.2, np.arange(4) + 0.2]))
ax.set_xticklabels(["0", "1", "2", "0", "1", "2", "3"])
ax.set_title("Marginals P(X), P(Y)\n(sum the joint along one axis)")
ax.set_ylabel("probability")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Conditional P(X | Y = 1). Take row Y = 1 and renormalise.
ax = axes[2]
ax.bar([0, 1, 2], joint[y_cond], width=0.6, color="tab:blue", alpha=0.5,
       label=f"row Y = {y_cond} of joint\n(does NOT sum to 1)")
ax.bar([0, 1, 2], P_X_given_Y, width=0.4, color="tab:red", alpha=0.85,
       label=f"P(X | Y = {y_cond})\n(sums to 1 after renormalising)")
for x, p_renorm in enumerate(P_X_given_Y):
    ax.text(x, p_renorm + 0.02, f"{p_renorm:.3f}", ha="center", fontweight="bold")
ax.set_xticks([0, 1, 2])
ax.set_title(f"Conditional P(X | Y = {y_cond})\n= row Y = {y_cond} divided by P(Y = {y_cond})")
ax.set_xlabel("X"); ax.set_ylabel("probability")
ax.set_ylim(0, 0.7); ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print the four numerical objects so the picture is grounded.
print("Joint PMF:")
print(joint)
print(f"\nMarginal P(X) = {P_X}     (sums to {P_X.sum():.4f})")
print(f"Marginal P(Y) = {P_Y}      (sums to {P_Y.sum():.4f})")
print(f"\nConditional P(X | Y = {y_cond}):  {P_X_given_Y}     "
      f"(sums to {P_X_given_Y.sum():.4f})")
print(f"\nE[X]              = {(P_X * np.arange(3)).sum():.4f}")
print(f"E[X | Y = {y_cond}]      = {(P_X_given_Y * np.arange(3)).sum():.4f}")
print(f"E[X] via tower law = Σ_y P(Y=y) · E[X | Y=y] "
      f"= {sum(P_Y[y] * (joint[y] / P_Y[y] * np.arange(3)).sum() for y in range(4)):.4f}")
```

**Three ideas the picture nails:**

- **Joint = the whole story.** The heatmap stores everything — every
  marginal, every conditional can be derived from it.
- **Marginal = sum along one axis.** Once you sum over $Y$, you can
  forget $Y$ existed and treat $X$ as a one-dimensional random
  variable.
- **Conditional = row, then renormalise.** Picking $Y = 1$ takes one
  row of the joint table; that row does *not* sum to 1, so we divide
  by $P(Y = 1)$ to make it a proper distribution. This is exactly the
  formula $P(X \mid Y) = P(X, Y) / P(Y)$.

These three operations — joint, marginal, conditional — and the
**tower law** $E[X] = E_Y [E[X \mid Y]]$ that the print-out verifies
are the only tools you ever need to manipulate joint distributions.

## Connection to CS / Games / AI / Business / Industry

- **Linearity of expectation** — simplifies expected running time analysis of randomised algorithms (e.g., quicksort)
- **Product rule** — independence assumption in Naive Bayes makes computation tractable
- **Conditional expectation** — the basis of reinforcement learning value functions: $V(s) = E[R \mid S=s]$
- **Tower property** — used in deriving the Bellman equation: $V(s) = E_a[E_{s'}[R + \gamma V(s') \mid s, a]]$
- **Variance of sums** — explains why diversification reduces portfolio risk, and why ensemble models outperform individuals
- **Markowitz portfolio variance** — the formula $\text{Var}(\sum w_i R_i) = \sum w_i w_j \text{Cov}(R_i, R_j)$ is the workhorse equation at every quant fund (Renaissance, Two Sigma, AQR); it operationalises diversification at trillion-dollar scale.
- **Insurance pooling economics** — Lloyd's of London syndicates and reinsurers like Munich Re use linearity of expectation across thousands of independent policies to make aggregate losses predictable, even though individual claims are highly uncertain.
- **Ad attribution & lifetime value** — Meta's and Google Ads' LTV (Lifetime Value) models use $E[\text{revenue}] = E[E[\text{revenue} \mid \text{cohort}]]$ tower-law decompositions to value advertisers and set bid prices in real-time auctions.
- **Reliability of redundant systems** — NASA's safety analysis on Crew Dragon and Boeing's 787 redundancy budgets use $\text{Var}(\sum X_i)$ over component failure indicators; aerospace MIL-HDBK-217 reliability-prediction methods are direct applications.
- **Project cost estimation (Monte Carlo schedule risk)** — Bechtel and Fluor use linearity of expectation on activity durations and Crystal Ball/@RISK simulations to bid major construction contracts (LNG terminals, dams) to within 5% accuracy.

## Check Your Understanding

1. **Pen & paper:** You draw 5 cards from a standard deck (without replacement).  Let $X$ = number of aces.  Use linearity of expectation to find $E[X]$.  (Hint: write $X = I_1 + I_2 + \cdots + I_5$ where $I_k$ = indicator that card $k$ is an ace.)
2. **Pen & paper:** If $X$ and $Y$ are independent with $E[X]=3$, $E[Y]=4$, $\text{Var}(X)=2$, $\text{Var}(Y)=5$, find $E[XY]$, $\text{Var}(X+Y)$, and $\text{Var}(2X - Y)$.
3. **Pen & paper:** Use the law of total expectation to find $E[X]$ where $X$ = winnings in a game: with probability 0.3 you enter round A where $E[X|A]=10$, with probability 0.7 you enter round B where $E[X|B]=2$.
4. **Think about it:** Why does linearity of expectation work even for dependent variables, but the product rule does not?
