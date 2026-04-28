# Function Notation

## Intuition

A function is a **machine** — you feed it an input, it applies a rule, and it
gives you exactly one output.  In programming, functions work the same way:
`def double(x): return 2 * x`.  In maths, we write $f(x) = 2x$.  The
notation $f(3)$ means "feed 3 into the machine" and get 6 out.

## Prerequisites

- Foundation 1, Lesson 3: Multi-Step Equations (comfort with substitution)

## From First Principles

### What is a function?

A **function** $f$ from set $A$ to set $B$ is a rule that assigns to **each**
element of $A$ **exactly one** element of $B$.

- **Domain** — the set of all allowed inputs ($A$).
- **Range** (or image) — the set of all actual outputs.
- **Codomain** — the set the outputs live in ($B$), which may be larger than
  the range.

**Key rule:** one input → one output.  (Two different inputs *can* give the
same output, but one input must never give two outputs.)

---

### The notation $f(x)$

$f(x) = 3x + 2$ defines a function called $f$ whose rule is "multiply the
input by 3 and add 2."

- $f(x)$ does **not** mean "$f$ times $x$."  The parentheses indicate
  *function application*, not multiplication.
- The letter $x$ is a **placeholder** — you can replace it with any expression.

### Evaluating a function

Given $f(x) = 3x + 2$:

$$f(4) = 3(4) + 2 = 12 + 2 = 14$$

$$f(-1) = 3(-1) + 2 = -3 + 2 = -1$$

$$f(a + 1) = 3(a + 1) + 2 = 3a + 3 + 2 = 3a + 5$$

Notice the last one: you can feed in an *expression*, not just a number.

---

### Multiple function names

We can define several functions and tell them apart by name:

$$f(x) = x^2 \qquad g(x) = 2x + 1 \qquad h(x) = x - 5$$

Then: $f(3) = 9$, $g(3) = 7$, $h(3) = -2$.

---

### Composition of functions

**Composition** means chaining two functions: the output of one becomes the
input of the next.

$$\text{If } f(x) = 2x + 1 \text{ and } g(x) = x^2,$$

$$f(g(x)) = f(x^2) = 2(x^2) + 1 = 2x^2 + 1$$

$$g(f(x)) = g(2x + 1) = (2x + 1)^2 = 4x^2 + 4x + 1$$

**Order matters!**  $f(g(x)) \ne g(f(x))$ in general.

**Worked example with a number:**

$$f(g(3)) = f(9) = 2(9) + 1 = 19$$

$$g(f(3)) = g(7) = 7^2 = 49$$

---

### Inverse functions

The **inverse** of $f$, written $f^{-1}$, **undoes** what $f$ does.

If $f(x) = 3x + 2$, then to find $f^{-1}$:

**Step 1:** Write $y = 3x + 2$.

**Step 2:** Swap $x$ and $y$: $x = 3y + 2$.

**Step 3:** Solve for $y$:

$$x - 2 = 3y$$

$$y = \frac{x - 2}{3}$$

So $f^{-1}(x) = \frac{x - 2}{3}$.

**Check:** $f(f^{-1}(x))$ should give $x$:

$$f\!\left(\frac{x-2}{3}\right) = 3 \cdot \frac{x-2}{3} + 2 = (x - 2) + 2 = x \;\; \checkmark$$

---

### Domain restrictions

Not every input is allowed.  For example:

- $f(x) = \frac{1}{x}$ — domain is all reals **except** $x = 0$ (division by zero).
- $g(x) = \sqrt{x}$ — domain is $x \ge 0$ (can't take square root of a negative in reals).

---

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

# ── Left panel: function mapping diagram ──
ax1.set_xlim(0, 10)
ax1.set_ylim(0, 6)
ax1.axis("off")
ax1.set_title("Function as a mapping", fontsize=13)

# Domain cloud
from matplotlib.patches import Ellipse
ax1.add_patch(Ellipse((2.5, 3), 3, 5, fc="#AED6F1", ec="black", lw=1.5))
ax1.text(2.5, 5.7, "Domain", ha="center", fontsize=11, weight="bold")

# Range cloud
ax1.add_patch(Ellipse((7.5, 3), 3, 5, fc="#ABEBC6", ec="black", lw=1.5))
ax1.text(7.5, 5.7, "Range", ha="center", fontsize=11, weight="bold")

# f(x) = 2x + 1 mapping for inputs 0, 1, 2, 3
inputs = [0, 1, 2, 3]
outputs = [2*x + 1 for x in inputs]
y_positions = [4.5, 3.5, 2.5, 1.5]

for i, (inp, out, yp) in enumerate(zip(inputs, outputs, y_positions)):
    ax1.text(2.5, yp, str(inp), ha="center", va="center", fontsize=12)
    ax1.text(7.5, yp, str(out), ha="center", va="center", fontsize=12)
    ax1.annotate("", xy=(6, yp), xytext=(4, yp),
                 arrowprops=dict(arrowstyle="->", color="crimson", lw=1.5))

ax1.text(5, 0.5, "$f(x) = 2x + 1$", ha="center", fontsize=12, color="crimson")

# ── Right panel: graph of f(x) = 2x + 1 ──
x = np.linspace(-2, 4, 200)
y = 2*x + 1

ax2.plot(x, y, "b-", lw=2, label="$f(x) = 2x + 1$")

# Mark specific points
for xi in inputs:
    yi = 2*xi + 1
    ax2.plot(xi, yi, "ro", ms=7, zorder=5)
    ax2.annotate(f"$f({xi})={yi}$", xy=(xi, yi), xytext=(xi+0.3, yi-0.8),
                 fontsize=9)

ax2.axhline(0, color="gray", lw=0.5)
ax2.axvline(0, color="gray", lw=0.5)
ax2.set_xlabel("$x$", fontsize=12)
ax2.set_ylabel("$f(x)$", fontsize=12)
ax2.set_title("Graph of $f(x) = 2x + 1$", fontsize=13)
ax2.legend(fontsize=10)
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

## Python Verification

```python
# ── Function notation: verify all worked examples ────────────────

# Define the functions
def f(x):
    return 3*x + 2

# Evaluating f(x) = 3x + 2
print("f(x) = 3x + 2")
print(f"  f(4)   = {f(4)}")       # 14
print(f"  f(-1)  = {f(-1)}")      # -1

# f(a+1) = 3(a+1) + 2 = 3a + 5 — verify with a = 2
a = 2
print(f"  f(a+1) with a=2: f(3) = {f(a+1)}")  # 3*3+2 = 11

# Composition: f(x) = 2x + 1, g(x) = x^2
def f2(x): return 2*x + 1
def g(x):  return x**2

print("\nComposition: f(x) = 2x+1, g(x) = x^2")
print(f"  f(g(3)) = f(9) = {f2(g(3))}")   # 19
print(f"  g(f(3)) = g(7) = {g(f2(3))}")   # 49
print(f"  f(g(x)) ≠ g(f(x)) in general: {f2(g(3)) != g(f2(3))}")

# Inverse: f(x) = 3x + 2,  f_inv(x) = (x-2)/3
def f_inv(x): return (x - 2) / 3

print("\nInverse: f(x) = 3x + 2, f_inv(x) = (x-2)/3")
print(f"  f(f_inv(10)) = f({f_inv(10):.4f}) = {f(f_inv(10)):.1f}")  # 10
print(f"  f_inv(f(5))  = f_inv({f(5)}) = {f_inv(f(5)):.1f}")        # 5

# Domain restriction: 1/x is undefined at x=0
print("\nDomain restriction: f(x) = 1/x")
for x in [-2, -1, 0.5, 1, 2]:
    print(f"  f({x:5.1f}) = {1/x:6.2f}")
print("  f(0) → undefined (ZeroDivisionError)")
```

## Connection to CS / Games / AI / Business / Industry

- **Functions in code are mathematical functions:** `def relu(x): return
  max(0, x)` is the ReLU activation function used in every modern neural
  network.
- **Composition is pipelines:** in data processing, you chain
  `clean → transform → normalise` — each step is a function, and the whole
  pipeline is a composition.
- **Inverse functions power encryption:** RSA encryption applies a function to
  your message; decryption applies its inverse. Without the inverse, the
  message stays secret.

## Check Your Understanding

1. Given $f(x) = x^2 - 4x + 3$, evaluate $f(0)$, $f(2)$, and $f(5)$.
2. If $f(x) = 3x - 1$ and $g(x) = x + 4$, find $f(g(2))$ and $g(f(2))$.
   Are they the same?
3. Find the inverse of $g(x) = 5x - 3$.  Verify by checking that
   $g(g^{-1}(7)) = 7$.
