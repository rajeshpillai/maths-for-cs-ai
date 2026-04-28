# Basic Statistics — Mean, Median, Mode, Standard Deviation, Box Plots

## Intuition

Before probability distributions and hypothesis tests, you need the basics:
how to **summarise** a dataset with a few numbers.  The **mean** is the
average, the **median** is the middle value, the **mode** is the most common,
and **standard deviation** measures spread.  A **box plot** shows all of these
visually.  These are the first tools any data scientist reaches for.

## Prerequisites

- Tier 0, Lesson 1: Number Systems

## From First Principles

### Mean (average)

$$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

**Pen & paper:** Data: $3, 7, 5, 9, 1$

$\bar{x} = (3 + 7 + 5 + 9 + 1)/5 = 25/5 = 5$

**Weighted mean:** $\bar{x}_w = \frac{\sum w_i x_i}{\sum w_i}$

### Median (middle value)

Sort the data, pick the middle.  For even $n$, average the two middle values.

**Pen & paper:** Sorted: $1, 3, 5, 7, 9$.  Median = $5$ (middle of 5 values).

Data: $2, 4, 6, 8$.  Median = $(4 + 6)/2 = 5$.

### Mode (most frequent)

Data: $3, 5, 5, 7, 5, 9$.  Mode = $5$ (appears 3 times).

A dataset can be **bimodal** (two modes) or have **no mode** (all values unique).

### Range

$\text{Range} = \max - \min = 9 - 1 = 8$

### Variance and standard deviation

**Variance** (population):

$$\sigma^2 = \frac{1}{n}\sum(x_i - \bar{x})^2$$

**Variance** (sample — use $n-1$):

$$s^2 = \frac{1}{n-1}\sum(x_i - \bar{x})^2$$

**Standard deviation:** $\sigma = \sqrt{\sigma^2}$

**Pen & paper:** Data: $3, 7, 5, 9, 1$.  $\bar{x} = 5$.

| $x_i$ | $x_i - \bar{x}$ | $(x_i - \bar{x})^2$ |
|--------|--------|--------|
| 3 | -2 | 4 |
| 7 | 2 | 4 |
| 5 | 0 | 0 |
| 9 | 4 | 16 |
| 1 | -4 | 16 |

$\sum = 40$.  Population $\sigma^2 = 40/5 = 8$.  $\sigma = \sqrt{8} = 2\sqrt{2} \approx 2.83$.

Sample $s^2 = 40/4 = 10$.  $s = \sqrt{10} \approx 3.16$.

### Quartiles and IQR

Sort the data, then:
- **Q1** (lower quartile) = median of lower half
- **Q2** = median
- **Q3** (upper quartile) = median of upper half
- **IQR** = $Q3 - Q1$ (interquartile range)

**Pen & paper:** Data (sorted): $1, 3, 4, 5, 7, 8, 9, 12$

Q1 = median of $\{1, 3, 4, 5\}$ = $(3+4)/2 = 3.5$

Q2 = $(5 + 7)/2 = 6$

Q3 = median of $\{7, 8, 9, 12\}$ = $(8+9)/2 = 8.5$

IQR = $8.5 - 3.5 = 5$

### Outliers

A data point is an outlier if it falls below $Q1 - 1.5 \times \text{IQR}$ or above $Q3 + 1.5 \times \text{IQR}$.

Fences: $3.5 - 7.5 = -4$ and $8.5 + 7.5 = 16$.  No outliers in our data.

### Box plot (box-and-whisker)

```
        Q1   Q2   Q3
  |-----|====|====|-----|
  min   Q1   med  Q3   max
  1     3.5  6    8.5  12
```

Shows the median, quartiles, range, and outliers at a glance.

### Mean vs median

- **Mean** is sensitive to outliers: $1, 2, 3, 4, 100$ → mean = 22
- **Median** is robust: same data → median = 3
- For **symmetric** distributions: mean ≈ median
- For **skewed** distributions: use median

## Python Verification

```python
# ── Basic Statistics ────────────────────────────────────────
import math

data = [3, 7, 5, 9, 1]

# Mean
n = len(data)
mean = sum(data) / n
print(f"=== Data: {data} ===")
print(f"Mean = {mean}")

# Median
s = sorted(data)
if n % 2 == 1:
    median = s[n // 2]
else:
    median = (s[n//2 - 1] + s[n//2]) / 2
print(f"Median = {median}")

# Mode
from collections import Counter
counts = Counter(data)
max_count = max(counts.values())
modes = [k for k, v in counts.items() if v == max_count]
print(f"Mode = {modes if max_count > 1 else 'no mode (all unique)'}")

# Range
print(f"Range = {max(data) - min(data)}")

# Variance and std dev
var_pop = sum((x - mean)**2 for x in data) / n
var_sample = sum((x - mean)**2 for x in data) / (n - 1)
print(f"Variance (population) = {var_pop}")
print(f"Variance (sample) = {var_sample}")
print(f"Std dev (population) = {math.sqrt(var_pop):.4f}")
print(f"Std dev (sample) = {math.sqrt(var_sample):.4f}")

# Quartiles
print(f"\n=== Quartiles ===")
data2 = [1, 3, 4, 5, 7, 8, 9, 12]
n2 = len(data2)
Q2 = (data2[n2//2 - 1] + data2[n2//2]) / 2
lower = data2[:n2//2]
upper = data2[n2//2:]
Q1 = (lower[len(lower)//2 - 1] + lower[len(lower)//2]) / 2
Q3 = (upper[len(upper)//2 - 1] + upper[len(upper)//2]) / 2
IQR = Q3 - Q1
print(f"Data: {data2}")
print(f"Q1={Q1}, Q2={Q2}, Q3={Q3}, IQR={IQR}")
print(f"Outlier fences: ({Q1-1.5*IQR:.1f}, {Q3+1.5*IQR:.1f})")

# Text box plot
print(f"\n=== Box plot ===")
mi, ma = min(data2), max(data2)
width = 40
def pos(v):
    return int((v - mi) / (ma - mi) * width)

line = [' '] * (width + 1)
line[pos(mi)] = '|'
line[pos(ma)] = '|'
for i in range(pos(Q1), pos(Q3)+1):
    line[i] = '='
line[pos(Q2)] = '|'
line[0] = '|'
line[width] = '|'
print(f"  {''.join(line)}")
print(f"  {mi}{' '*(pos(Q1)-1)}Q1={Q1}{' '*(pos(Q2)-pos(Q1)-5)}Med={Q2}{' '*(pos(Q3)-pos(Q2)-5)}Q3={Q3}{' '*(width-pos(Q3)-5)}{ma}")

# Mean vs median with outlier
print(f"\n=== Outlier effect ===")
normal = [1, 2, 3, 4, 5]
with_outlier = [1, 2, 3, 4, 100]
print(f"Without outlier: mean={sum(normal)/5}, median={sorted(normal)[2]}")
print(f"With outlier:    mean={sum(with_outlier)/5}, median={sorted(with_outlier)[2]}")
```

## Visualisation — Seeing the data, not just the numbers

A summary statistic is one number; a picture is the whole story. Three
plots show what mean / median / quartiles really *look like*.

```python
# ── Visualising basic statistics ────────────────────────────
import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)             # seeded so the picture is reproducible

# A symmetric dataset (heights of adults, in cm) and a skewed one
# (incomes — most modest, a few very high).
heights = rng.normal(loc=170, scale=8, size=300)
incomes = rng.lognormal(mean=10.5, sigma=0.6, size=300) / 1000   # in £k

fig, axes = plt.subplots(1, 3, figsize=(15, 4.5))

# (1) Histogram with mean and median marked.
# For symmetric data the two are essentially equal — median ≈ mean.
ax = axes[0]
ax.hist(heights, bins=25, color="lightsteelblue", edgecolor="navy", alpha=0.85)
mean_h = np.mean(heights); median_h = np.median(heights)
ax.axvline(mean_h,   color="red",   lw=2, label=f"mean = {mean_h:.1f}")
ax.axvline(median_h, color="green", lw=2, linestyle="--",
           label=f"median = {median_h:.1f}")
ax.set_title("Symmetric data (heights):\nmean ≈ median")
ax.set_xlabel("height (cm)"); ax.set_ylabel("count")
ax.legend(); ax.grid(True, alpha=0.3)

# (2) The same plot for skewed data — mean gets pulled right by outliers.
# This is the canonical reason median is preferred for incomes.
ax = axes[1]
ax.hist(incomes, bins=25, color="navajowhite", edgecolor="darkorange", alpha=0.85)
mean_i = np.mean(incomes); median_i = np.median(incomes)
ax.axvline(mean_i,   color="red",   lw=2, label=f"mean = £{mean_i:.1f}k")
ax.axvline(median_i, color="green", lw=2, linestyle="--",
           label=f"median = £{median_i:.1f}k")
ax.set_title("Skewed data (incomes):\nmean is pulled by the long tail")
ax.set_xlabel("income (£k)"); ax.set_ylabel("count")
ax.legend(); ax.grid(True, alpha=0.3)

# (3) Box plot — compact summary of the same two datasets.
# Box = middle 50% (Q1 to Q3); centre line = median; whiskers ≈ 1.5×IQR;
# circles outside whiskers = outliers.
ax = axes[2]
ax.boxplot([heights, incomes],
           patch_artist=True,
           boxprops=dict(facecolor="lightsteelblue"))
ax.set_xticks([1, 2])
ax.set_xticklabels(["heights\n(cm)", "incomes\n(£k)"])
ax.set_title("Box plots: median, IQR, whiskers, outliers\nat a single glance")
ax.set_ylabel("value")
ax.grid(True, alpha=0.3, axis="y")

plt.tight_layout()
plt.show()

# Print the summary numbers next to the plot so picture and table agree.
for label, data in [("heights", heights), ("incomes", incomes)]:
    q1, med, q3 = np.percentile(data, [25, 50, 75])
    print(f"{label:<8} mean={np.mean(data):.2f}  median={med:.2f}"
          f"  Q1={q1:.2f}  Q3={q3:.2f}  IQR={q3 - q1:.2f}"
          f"  std={np.std(data):.2f}")
```

**What the three pictures teach:**

- **Left (heights):** when data is roughly symmetric, mean and median
  sit on top of each other. You can use either as the "centre".
- **Middle (incomes):** the mean is dragged toward the long tail by the
  few high earners. The **median** is the better "typical person"
  number — exactly why government statistics quote median household
  income, not mean.
- **Right (box plots):** for any dataset the box plot shows you, in one
  picture, the **median** (line), the **middle 50%** (the box, from $Q_1$
  to $Q_3$), the **range** (whiskers), and any **outliers** (the dots
  outside). Box plots are the standard "first look" at a new dataset in
  data science.

## Connection to CS / Games / AI

- **Data preprocessing** — normalisation uses mean and std dev: $z = (x - \mu)/\sigma$
- **Batch normalisation** — computes running mean and variance of activations
- **EDA** — first step in any ML project: compute summary statistics, draw box plots
- **Anomaly detection** — outliers detected via IQR or z-score
- **Game analytics** — player session length, score distributions, matchmaking
- **A/B testing** — compare means between groups (leads to hypothesis testing)

## Check Your Understanding

1. **Pen & paper:** Data: $12, 15, 18, 22, 25, 30, 35$.  Find mean, median, Q1, Q3, IQR.
2. **Pen & paper:** Why is sample variance divided by $n-1$ instead of $n$?  (This is called Bessel's correction.)
3. **Pen & paper:** Data: $10, 10, 20, 30, 30, 30, 40$.  Find the mode.  Is the distribution symmetric or skewed?
4. **Think about it:** Your ML model's loss has mean 0.5 and std dev 0.3.  Is a loss of 1.4 likely an outlier?  (Use the $2\sigma$ rule.)
