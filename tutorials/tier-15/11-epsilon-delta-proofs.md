# Epsilon-Delta Proofs

## Intuition

When we say $\lim_{x \to a} f(x) = L$, we mean informally that $f(x)$ gets
arbitrarily close to $L$ as $x$ gets close to $a$. The $\varepsilon$-$\delta$
definition makes "arbitrarily close" precise. It is the gold standard of
rigour in analysis and the template for reasoning about convergence in
numerical algorithms and iterative optimisation.

## Prerequisites

- Tier 15, Lesson 3 (Direct Proof)
- Tier 3, Lesson 1 (Limits)

## From First Principles

### The Definition

$$\lim_{x \to a} f(x) = L$$

means: for every $\varepsilon > 0$, there exists $\delta > 0$ such that

$$0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon$$

In quantifier notation: $\forall \varepsilon > 0,\; \exists \delta > 0,\; \forall x,\; (0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon)$.

### Structure of an $\varepsilon$-$\delta$ Proof

1. State: "Let $\varepsilon > 0$ be given."
2. **Scratch work** (not shown in final proof): manipulate $|f(x) - L|$ until you can bound it in terms of $|x - a|$, then solve for $\delta$.
3. State: "Choose $\delta = \ldots$" (a specific expression in terms of $\varepsilon$).
4. Show: if $0 < |x - a| < \delta$, then $|f(x) - L| < \varepsilon$.

### Example 1: $\lim_{x \to 2} 3x = 6$

**Scratch work**: $|f(x) - L| = |3x - 6| = 3|x - 2|$. Want $3|x - 2| < \varepsilon$, so need $|x - 2| < \varepsilon/3$.

**Proof**: Let $\varepsilon > 0$. Choose $\delta = \varepsilon / 3$.

If $0 < |x - 2| < \delta$, then:
$$|3x - 6| = 3|x - 2| < 3 \cdot \delta = 3 \cdot \frac{\varepsilon}{3} = \varepsilon$$

$\square$

### Example 2: $\lim_{x \to 1} (x^2 + 1) = 2$

**Scratch work**: $|x^2 + 1 - 2| = |x^2 - 1| = |x - 1||x + 1|$.

We need to bound $|x + 1|$. If $|x - 1| < 1$, then $0 < x < 2$, so $1 < x + 1 < 3$, giving $|x + 1| < 3$.

Then $|x^2 - 1| < 3|x - 1|$. Want $3|x - 1| < \varepsilon$, so $|x - 1| < \varepsilon/3$.

**Proof**: Let $\varepsilon > 0$. Choose $\delta = \min(1, \varepsilon/3)$.

If $0 < |x - 1| < \delta$:
- Since $\delta \leq 1$: $|x - 1| < 1$, so $|x + 1| < 3$.
- $|x^2 - 1| = |x - 1| \cdot |x + 1| < \delta \cdot 3 \leq \frac{\varepsilon}{3} \cdot 3 = \varepsilon$.

$\square$

### Example 3: Continuity of $f(x) = x^2$ at $x = a$

$f$ is **continuous** at $a$ if $\lim_{x \to a} f(x) = f(a)$.

$|f(x) - f(a)| = |x^2 - a^2| = |x - a||x + a|$.

Bound $|x + a|$: if $|x - a| < 1$, then $|x| < |a| + 1$, so $|x + a| \leq |x| + |a| < 2|a| + 1$.

Choose $\delta = \min\left(1, \frac{\varepsilon}{2|a| + 1}\right)$.

Then $|x^2 - a^2| < (2|a| + 1) \cdot \frac{\varepsilon}{2|a| + 1} = \varepsilon$. $\square$

### Pen & Paper: The Scratch Work Process

The key insight: the final proof reads backwards from how you discovered it.

1. Start with what you want: $|f(x) - L| < \varepsilon$.
2. Express in terms of $|x - a|$.
3. Bound any "extra" factors by restricting $\delta \leq$ some constant.
4. Solve for $\delta$.
5. Write the proof starting with "Let $\varepsilon > 0$, choose $\delta = \ldots$"

### Visualisation

```python
import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(7, 5))

# f(x) = 3x, limit at x=2 is 6
x = np.linspace(0, 4, 200)
f = 3 * x
ax.plot(x, f, 'b-', linewidth=2, label='f(x) = 3x')

a, L = 2, 6
epsilon = 1.5
delta = epsilon / 3

# Draw epsilon band around L
ax.axhline(L, color='gray', linestyle=':', alpha=0.5)
ax.fill_between(x, L - epsilon, L + epsilon, alpha=0.15, color='green',
                label=f'ε-band: ({L-epsilon}, {L+epsilon})')

# Draw delta band around a
ax.axvline(a, color='gray', linestyle=':', alpha=0.5)
ax.axvspan(a - delta, a + delta, alpha=0.15, color='orange',
           label=f'δ-band: ({a-delta:.2f}, {a+delta:.2f})')

ax.plot(a, L, 'ro', markersize=8)
ax.annotate(f'(a, L) = ({a}, {L})', xy=(a, L), xytext=(a+0.3, L+1),
            arrowprops=dict(arrowstyle='->', color='red'), fontsize=10)

ax.set_xlabel('x')
ax.set_ylabel('f(x)')
ax.set_title(f'ε-δ proof: ε={epsilon}, δ=ε/3={delta:.2f}')
ax.legend()
plt.tight_layout()
plt.savefig('epsilon_delta.png', dpi=100)
plt.show()
```

## Python Verification

```python
import numpy as np

# ── Epsilon-Delta Proofs: Verification ───────────────────

# Step 1: Verify lim(x→2) 3x = 6
print("=== lim(x→2) 3x = 6 ===")
a, L = 2, 6

for epsilon in [1.0, 0.1, 0.01, 0.001]:
    delta = epsilon / 3  # our formula
    # Test many points in the delta-neighborhood
    xs = np.linspace(a - delta + 1e-15, a + delta - 1e-15, 10000)
    xs = xs[np.abs(xs - a) > 0]  # exclude x = a
    fx = 3 * xs
    max_error = np.max(np.abs(fx - L))
    print(f"  ε={epsilon:.4f}, δ={delta:.4f}: max|f(x)-L|={max_error:.6f} < ε: {max_error < epsilon}")

# Step 2: Verify lim(x→1) (x²+1) = 2
print("\n=== lim(x→1) (x²+1) = 2 ===")
a, L = 1, 2

for epsilon in [1.0, 0.1, 0.01, 0.001]:
    delta = min(1, epsilon / 3)
    xs = np.linspace(a - delta + 1e-15, a + delta - 1e-15, 10000)
    xs = xs[np.abs(xs - a) > 0]
    fx = xs**2 + 1
    max_error = np.max(np.abs(fx - L))
    print(f"  ε={epsilon:.4f}, δ={delta:.6f}: max|f(x)-L|={max_error:.6f} < ε: {max_error < epsilon}")

# Step 3: Continuity of x² at x = 3
print("\n=== Continuity of x² at x=3 ===")
a = 3
L = a**2  # = 9

for epsilon in [1.0, 0.1, 0.01]:
    delta = min(1, epsilon / (2 * abs(a) + 1))
    xs = np.linspace(a - delta + 1e-15, a + delta - 1e-15, 10000)
    xs = xs[np.abs(xs - a) > 0]
    fx = xs**2
    max_error = np.max(np.abs(fx - L))
    print(f"  a={a}, ε={epsilon:.3f}, δ={delta:.6f}: max|x²-a²|={max_error:.6f} < ε: {max_error < epsilon}")

# Step 4: Demonstrate that a wrong delta fails
print("\n=== Wrong δ fails ===")
epsilon = 0.3
wrong_delta = epsilon  # should be epsilon/3 for f(x)=3x
xs = np.linspace(2 - wrong_delta + 1e-15, 2 + wrong_delta - 1e-15, 10000)
xs = xs[np.abs(xs - 2) > 0]
fx = 3 * xs
max_error = np.max(np.abs(fx - 6))
print(f"ε={epsilon}, wrong δ={wrong_delta}: max|f(x)-6|={max_error:.4f}, < ε? {max_error < epsilon}")
```

## Connection to CS / Games / AI

- **Numerical analysis**: proving an algorithm converges requires epsilon-delta reasoning on error bounds.
- **Gradient descent convergence**: proving GD reaches an $\varepsilon$-optimal point within $N$ steps is an epsilon-delta argument.
- **Floating point**: machine epsilon ($\varepsilon_{\text{mach}}$) quantifies the maximum relative error, directly echoing the $\varepsilon$ in our proofs.
- **Game physics**: ensuring smooth interpolation (no jumps) between frames requires continuity guarantees.

## Check Your Understanding

1. Prove: $\lim_{x \to 3} (2x + 1) = 7$.
2. Prove: $\lim_{x \to 0} x^3 = 0$. (Hint: $|x^3| = |x|^3$, so $\delta = \varepsilon^{1/3}$.)
3. Why does the proof for $x^2$ require $\delta = \min(1, \varepsilon/(\ldots))$ instead of just $\delta = \varepsilon/(\ldots)$? What goes wrong without the $\min$?
