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

## Connection to CS / Games / AI

- **Linearity of expectation** — simplifies expected running time analysis of randomised algorithms (e.g., quicksort)
- **Product rule** — independence assumption in Naive Bayes makes computation tractable
- **Conditional expectation** — the basis of reinforcement learning value functions: $V(s) = E[R \mid S=s]$
- **Tower property** — used in deriving the Bellman equation: $V(s) = E_a[E_{s'}[R + \gamma V(s') \mid s, a]]$
- **Variance of sums** — explains why diversification reduces portfolio risk, and why ensemble models outperform individuals

## Check Your Understanding

1. **Pen & paper:** You draw 5 cards from a standard deck (without replacement).  Let $X$ = number of aces.  Use linearity of expectation to find $E[X]$.  (Hint: write $X = I_1 + I_2 + \cdots + I_5$ where $I_k$ = indicator that card $k$ is an ace.)
2. **Pen & paper:** If $X$ and $Y$ are independent with $E[X]=3$, $E[Y]=4$, $\text{Var}(X)=2$, $\text{Var}(Y)=5$, find $E[XY]$, $\text{Var}(X+Y)$, and $\text{Var}(2X - Y)$.
3. **Pen & paper:** Use the law of total expectation to find $E[X]$ where $X$ = winnings in a game: with probability 0.3 you enter round A where $E[X|A]=10$, with probability 0.7 you enter round B where $E[X|B]=2$.
4. **Think about it:** Why does linearity of expectation work even for dependent variables, but the product rule does not?
