# Joint Distributions — Joint PMF/PDF, Marginals, and Independence

## Intuition

So far every distribution has described a single variable.  But in the real
world variables come in groups: a pixel has red, green, and blue channels; a
data point has height *and* weight; a neural network layer has hundreds of
activations.  A **joint distribution** describes the probability of two (or
more) variables *simultaneously*.  From the joint, you can recover each
variable's individual (marginal) distribution, condition on one to learn about
the other, and test whether they are truly independent.

## Prerequisites

- Tier 4, Lesson 4: Expectation and Variance
- Tier 4, Lessons 5-6: Discrete and Continuous Distributions
- Tier 3, Lesson 6: Integrals (for continuous case)

## From First Principles

### Discrete case: Joint PMF

For two discrete random variables $X$ and $Y$, the **joint PMF** is:

$$p_{X,Y}(x, y) = P(X = x \text{ and } Y = y)$$

It must satisfy:
1. $p_{X,Y}(x, y) \ge 0$ for all $x, y$
2. $\sum_x \sum_y p_{X,Y}(x, y) = 1$

### Pen & paper: Discrete joint table

Two dice are rolled.  Let $X$ = value on die 1, $Y$ = value on die 2.
Consider a simplified example with 2-sided dice ($X, Y \in \{1, 2\}$):

| | $Y=1$ | $Y=2$ | $P(X=x)$ |
|---|---|---|---|
| $X=1$ | 1/4 | 1/4 | 1/2 |
| $X=2$ | 1/4 | 1/4 | 1/2 |
| $P(Y=y)$ | 1/2 | 1/2 | 1 |

Each cell is $p_{X,Y}(x,y) = 1/4$.  Row sums and column sums give the
**marginal distributions**.

### Marginal distributions

Summing (or integrating) out one variable recovers the other's distribution:

$$p_X(x) = \sum_y p_{X,Y}(x, y) \qquad \text{(discrete)}$$

$$f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x, y)\,dy \qquad \text{(continuous)}$$

**Pen & paper:** From the table above, $p_X(1) = 1/4 + 1/4 = 1/2$. Correct.

### Pen & paper: Non-uniform joint table

Suppose we observe traffic data.  Let $X$ = weather (0=sunny, 1=rainy) and
$Y$ = accident (0=no, 1=yes):

| | $Y=0$ | $Y=1$ | $P(X=x)$ |
|---|---|---|---|
| $X=0$ (sunny) | 0.60 | 0.10 | 0.70 |
| $X=1$ (rainy) | 0.15 | 0.15 | 0.30 |
| $P(Y=y)$ | 0.75 | 0.25 | 1.00 |

Marginal of $X$: $P(X=0)=0.70$, $P(X=1)=0.30$.
Marginal of $Y$: $P(Y=0)=0.75$, $P(Y=1)=0.25$.

### Conditional distributions

$$P(Y=y \mid X=x) = \frac{p_{X,Y}(x,y)}{p_X(x)}$$

**Pen & paper (continuing):**

$P(\text{accident} \mid \text{rainy}) = \frac{0.15}{0.30} = 0.50$

$P(\text{accident} \mid \text{sunny}) = \frac{0.10}{0.70} \approx 0.143$

Rainy weather triples the accident probability.

### Independence

$X$ and $Y$ are **independent** if and only if:

$$p_{X,Y}(x,y) = p_X(x) \cdot p_Y(y) \quad \text{for all } x, y$$

**Pen & paper (checking):** For the weather-accident table:
$P(X=0) \cdot P(Y=1) = 0.70 \times 0.25 = 0.175$, but $P(X=0, Y=1) = 0.10$.
Since $0.10 \ne 0.175$, $X$ and $Y$ are **not independent**.

For the fair dice table: $P(X=1) \cdot P(Y=1) = 0.5 \times 0.5 = 0.25 = P(X=1, Y=1)$. Independent.

### Continuous case: Joint PDF

For continuous $X, Y$, the **joint PDF** $f_{X,Y}(x,y)$ satisfies:

$$P(a \le X \le b, \; c \le Y \le d) = \int_a^b \int_c^d f_{X,Y}(x,y)\,dy\,dx$$

$$\int_{-\infty}^{\infty}\int_{-\infty}^{\infty} f_{X,Y}(x,y)\,dy\,dx = 1$$

### Pen & paper: Continuous joint PDF

Let $f_{X,Y}(x,y) = 6x$ for $0 \le x \le 1, \; 0 \le y \le 1-x$,
and 0 elsewhere.

**Step 1 — Verify it integrates to 1:**

$$\int_0^1 \int_0^{1-x} 6x\,dy\,dx = \int_0^1 6x(1-x)\,dx = \int_0^1 (6x - 6x^2)\,dx = \left[3x^2 - 2x^3\right]_0^1 = 3 - 2 = 1 \checkmark$$

**Step 2 — Marginal of $X$:**

$$f_X(x) = \int_0^{1-x} 6x\,dy = 6x(1-x) \quad \text{for } 0 \le x \le 1$$

**Step 3 — Find $P(X \le 0.5)$:**

$$P(X \le 0.5) = \int_0^{0.5} 6x(1-x)\,dx = \left[3x^2 - 2x^3\right]_0^{0.5} = 0.75 - 0.25 = 0.50$$

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Left: discrete joint distribution as heatmap
joint_table = np.array([[0.60, 0.10], [0.15, 0.15]])
im = axes[0].imshow(joint_table, cmap="Blues", vmin=0, vmax=0.65)
axes[0].set_xticks([0, 1])
axes[0].set_xticklabels(["No accident", "Accident"])
axes[0].set_yticks([0, 1])
axes[0].set_yticklabels(["Sunny", "Rainy"])
for i in range(2):
    for j in range(2):
        axes[0].text(j, i, f"{joint_table[i,j]:.2f}", ha="center", va="center", fontsize=14)
axes[0].set_title("Discrete Joint PMF", fontsize=13)

# Right: continuous joint PDF f(x,y) = 6x on triangle
x = np.linspace(0, 1, 200)
y = np.linspace(0, 1, 200)
X, Y = np.meshgrid(x, y)
Z = np.where(Y <= 1 - X, 6 * X, np.nan)
axes[1].contourf(X, Y, Z, levels=20, cmap="viridis")
axes[1].plot([0, 1], [1, 0], "r-", linewidth=2, label="y = 1 - x")
axes[1].set_xlabel("x")
axes[1].set_ylabel("y")
axes[1].set_title("Continuous Joint PDF: f(x,y) = 6x", fontsize=13)
axes[1].legend()

plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Joint Distributions: verifying pen & paper work ───────────

# Discrete joint table: weather and accidents
print("=== Discrete Joint Distribution ===")
joint = {(0,0): 0.60, (0,1): 0.10, (1,0): 0.15, (1,1): 0.15}

# Verify sums to 1
total = sum(joint.values())
print(f"Total probability: {total}")

# Marginals
p_X = {0: sum(joint[(x,y)] for y in [0,1] if (x,y) in joint) for x in [0,1]}
p_Y = {0: sum(joint[(x,y)] for x in [0,1] if (x,y) in joint) for y in [0,1]}
p_X[1] = 1 - p_X[0]
p_Y[1] = 1 - p_Y[0]
print(f"P(sunny)={p_X[0]}, P(rainy)={p_X[1]}")
print(f"P(no accident)={p_Y[0]}, P(accident)={p_Y[1]}")

# Conditional
p_acc_given_rain = joint[(1,1)] / p_X[1]
p_acc_given_sun = joint[(0,1)] / p_X[0]
print(f"\nP(accident|rainy) = {p_acc_given_rain:.3f}")
print(f"P(accident|sunny) = {p_acc_given_sun:.3f}")

# Independence check
print(f"\nIndependence check:")
for x in [0, 1]:
    for y in [0, 1]:
        product = p_X[x] * p_Y[y]
        actual = joint[(x,y)]
        match = "PASS" if abs(product - actual) < 0.001 else "FAIL"
        print(f"  P(X={x})P(Y={y})={product:.3f}, P(X={x},Y={y})={actual:.3f} [{match}]")

# Continuous joint PDF: f(x,y) = 6x on triangle
print(f"\n=== Continuous Joint PDF: f(x,y) = 6x ===")

# Direct numerical integration
dx = 0.001
integral = 0
integral_half = 0
for i in range(1000):
    x = (i + 0.5) * dx
    f_X = 6 * x * (1 - x)
    integral += f_X * dx
    if x <= 0.5:
        integral_half += f_X * dx

print(f"Integral of marginal f_X(x): {integral:.4f} (should be 1)")
print(f"P(X <= 0.5) = {integral_half:.4f} (pen & paper: 0.50)")
```

## Connection to CS / Games / AI

- **Multi-dimensional data** — every dataset with multiple features has a joint distribution
- **Naive Bayes** — assumes feature independence: $p(\mathbf{x}|y) = \prod p(x_i|y)$
- **Image pixels** — neighbouring pixels have a joint distribution (not independent)
- **Multi-task learning** — outputs have a joint distribution; modelling dependencies improves predictions
- **Bayesian networks** — factorise joint distributions using conditional independence

## Check Your Understanding

1. **Pen & paper:** Given the joint PMF table below, find marginals of $X$ and $Y$, and check independence.

| | $Y=0$ | $Y=1$ |
|---|---|---|
| $X=0$ | 0.2 | 0.3 |
| $X=1$ | 0.1 | 0.4 |

2. **Pen & paper:** For the table above, find $P(X=1 \mid Y=1)$.
3. **Pen & paper:** If $f_{X,Y}(x,y) = 2$ for $0 \le x \le y \le 1$, find the marginal $f_Y(y)$.
4. **Think about it:** If $X$ and $Y$ are independent, what does the joint PDF look like as a surface plot?  Why?
