# Information Theory — Entropy, Cross-Entropy, KL Divergence

## Intuition

**Entropy** measures how "surprised" you are on average.  A fair coin has high
entropy (you can't predict it).  A biased coin with $P(H) = 0.99$ has low
entropy (boring — you always know what's coming).  **Cross-entropy** measures
how well your predictions match reality.  **KL divergence** measures how
different two distributions are.  These concepts power every classification
loss function in deep learning.

## Prerequisites

- Tier 4, Lesson 5: Key Distributions
- Tier 4, Lesson 7: MLE (log-likelihood)

## From First Principles

### Entropy

For a discrete distribution $p$ over outcomes $x$:

$$H(p) = -\sum_x p(x) \ln p(x)$$

(Using natural log.  If using $\log_2$, the unit is **bits**.)

### Pen & paper: Entropy of a fair coin

$p(H) = p(T) = 0.5$

$$H = -(0.5 \ln 0.5 + 0.5 \ln 0.5) = -2(0.5)(-0.693) = 0.693 \text{ nats}$$

In bits: $-(0.5 \log_2 0.5 + 0.5 \log_2 0.5) = 1 \text{ bit}$

### Pen & paper: Biased coin ($p = 0.9$)

$$H = -(0.9 \ln 0.9 + 0.1 \ln 0.1) = -(0.9 \times (-0.105) + 0.1 \times (-2.303))$$
$$= 0.0945 + 0.2303 = 0.325 \text{ nats}$$

Less entropy = more predictable.

### Cross-entropy

How many bits/nats to encode data from distribution $p$ using a code optimised for distribution $q$:

$$H(p, q) = -\sum_x p(x) \ln q(x)$$

Always $H(p, q) \ge H(p)$ — you can't do better than knowing the true distribution.

### Pen & paper: Binary cross-entropy

True label $y = 1$, predicted probability $\hat{p} = 0.8$:

$$H = -(1 \cdot \ln 0.8 + 0 \cdot \ln 0.2) = -\ln 0.8 = 0.223$$

If $\hat{p} = 0.2$ (bad prediction):

$$H = -\ln 0.2 = 1.609$$

Much higher — bad predictions are penalised heavily.

### KL divergence

How much extra information is needed when using $q$ instead of $p$:

$$D_{KL}(p \| q) = \sum_x p(x) \ln \frac{p(x)}{q(x)} = H(p, q) - H(p)$$

Properties:
- $D_{KL}(p \| q) \ge 0$ (Gibbs' inequality)
- $D_{KL}(p \| q) = 0$ iff $p = q$
- **NOT symmetric:** $D_{KL}(p \| q) \ne D_{KL}(q \| p)$ in general

### Pen & paper: KL divergence

$p = (0.7, 0.3)$, $q = (0.5, 0.5)$:

$$D_{KL}(p \| q) = 0.7 \ln \frac{0.7}{0.5} + 0.3 \ln \frac{0.3}{0.5}$$
$$= 0.7 \ln 1.4 + 0.3 \ln 0.6$$
$$= 0.7(0.336) + 0.3(-0.511)$$
$$= 0.235 - 0.153 = 0.082$$

### Cross-entropy as a loss function

For multi-class classification with $C$ classes:

- **One-hot encoding:** The true label is a vector $\mathbf{y}$ with a 1 in the true class position and 0s elsewhere.  E.g., class 2 of 3: $\mathbf{y} = (0, 1, 0)$.
- **Softmax:** Converts raw scores (logits) $\mathbf{z}$ into probabilities: $\hat{p}_c = \frac{e^{z_c}}{\sum_j e^{z_j}}$.  All outputs are positive and sum to 1.

With true distribution $\mathbf{y}$ (one-hot) and predicted $\hat{\mathbf{p}}$ (softmax output):

$$\text{Loss} = H(\mathbf{y}, \hat{\mathbf{p}}) = -\sum_c y_c \ln \hat{p}_c$$

Since $\mathbf{y}$ is one-hot (only one class $c^*$ has $y_{c^*} = 1$):

$$\text{Loss} = -\ln \hat{p}_{c^*}$$

**Minimising cross-entropy = maximising log-likelihood = MLE.**

## Python Verification

```python
# ── Information Theory: verifying pen & paper work ──────────
import math

# Entropy of fair coin
print("=== Entropy ===")
p_fair = [0.5, 0.5]
H_fair = -sum(p * math.log(p) for p in p_fair)
H_fair_bits = -sum(p * math.log2(p) for p in p_fair)
print(f"Fair coin: H = {H_fair:.4f} nats = {H_fair_bits:.4f} bits")

# Biased coin
p_biased = [0.9, 0.1]
H_biased = -sum(p * math.log(p) for p in p_biased)
print(f"Biased (0.9): H = {H_biased:.4f} nats")

# Die
p_die = [1/6] * 6
H_die = -sum(p * math.log(p) for p in p_die)
print(f"Fair die: H = {H_die:.4f} nats = {H_die/math.log(2):.4f} bits")

# Binary cross-entropy
print(f"\n=== Binary cross-entropy ===")
for p_hat in [0.8, 0.5, 0.2, 0.01]:
    bce = -math.log(p_hat)  # y=1
    print(f"  y=1, p̂={p_hat}: BCE = {bce:.4f}")

# KL divergence
print(f"\n=== KL divergence ===")
p = [0.7, 0.3]
q = [0.5, 0.5]
kl = sum(pi * math.log(pi/qi) for pi, qi in zip(p, q))
print(f"D_KL(p||q) = {kl:.4f}")

# Not symmetric
kl_reverse = sum(qi * math.log(qi/pi) for pi, qi in zip(p, q))
print(f"D_KL(q||p) = {kl_reverse:.4f}")
print(f"Symmetric? {abs(kl - kl_reverse) < 1e-10}")

# Cross-entropy = H(p) + D_KL(p||q)
H_p = -sum(pi * math.log(pi) for pi in p)
H_pq = -sum(pi * math.log(qi) for pi, qi in zip(p, q))
print(f"\nH(p) = {H_p:.4f}")
print(f"H(p,q) = {H_pq:.4f}")
print(f"H(p) + D_KL = {H_p + kl:.4f} (should equal H(p,q))")

# Multi-class cross-entropy
print(f"\n=== Multi-class cross-entropy ===")
y_true = [0, 1, 0]  # true class is 1
y_pred = [0.1, 0.7, 0.2]  # softmax output
ce = -sum(y * math.log(p) for y, p in zip(y_true, y_pred) if y > 0)
print(f"True: {y_true}, Pred: {y_pred}")
print(f"CE loss = -ln(0.7) = {ce:.4f}")
```

## Connection to CS / Games / AI

- **Cross-entropy loss** — THE standard classification loss function
- **Softmax + cross-entropy** — combined for multi-class neural network training
- **Language models** — perplexity = $2^{H(p,q)}$ measures model quality
- **Data compression** — entropy = theoretical minimum bits per symbol
- **KL divergence** — used in VAEs (variational autoencoders), policy gradient methods, knowledge distillation
- **Mutual information** — $I(X;Y) = H(X) - H(X|Y)$: how much knowing $Y$ tells you about $X$

## Check Your Understanding

1. **Pen & paper:** Compute the entropy of a distribution $p = (0.25, 0.25, 0.25, 0.25)$ in bits.  Compare with a fair coin.
2. **Pen & paper:** True label is class 2 (out of 3). Softmax output: $(0.1, 0.2, 0.7)$.  Compute the cross-entropy loss.
3. **Pen & paper:** Compute $D_{KL}(p \| q)$ for $p = (1/3, 1/3, 1/3)$ and $q = (1/4, 1/2, 1/4)$.
4. **Think about it:** Why is KL divergence not symmetric?  Give an intuitive example of when $D_{KL}(p \| q)$ and $D_{KL}(q \| p)$ would differ significantly.
