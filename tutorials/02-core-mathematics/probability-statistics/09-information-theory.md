# Information Theory — Entropy, Cross-Entropy, KL Divergence

## Intuition

**Entropy** measures how "surprised" you are on average.  A fair coin has high
entropy (you can't predict it).  A biased coin with $P(H) = 0.99$ has low
entropy (boring — you always know what's coming).  **Cross-entropy** measures
how well your predictions match reality.  **KL divergence** measures how
different two distributions are.  These concepts power every classification
loss function in deep learning.

## Prerequisites

- Tier 4, Lessons 5-6: Discrete and Continuous Distributions
- Tier 4, Lesson 8: MLE (log-likelihood)

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

## Visualisation — Entropy, cross-entropy, and KL divergence

Three curves capture the whole story: **entropy** measures how
uncertain a distribution is, **cross-entropy** measures how surprised a
*wrong* model is by reality, and **KL divergence** is the *gap*
between the two.

```python
# ── Visualising entropy, cross-entropy, KL divergence ───────
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(15, 4.8))

# (1) Entropy of a Bernoulli(p) distribution.
# H(p) = -p log p - (1 - p) log(1 - p), maximum at p = 0.5 (most uncertain).
# At p = 0 or 1 the outcome is certain → entropy is 0 → no surprise.
ax = axes[0]
ps = np.linspace(0.001, 0.999, 400)
H = -(ps * np.log2(ps) + (1 - ps) * np.log2(1 - ps))
ax.plot(ps, H, color="tab:blue", lw=2)
ax.fill_between(ps, H, alpha=0.20, color="tab:blue")
ax.axvline(0.5, color="red", lw=1.5, linestyle="--", label="max at p = 0.5: H = 1 bit")
ax.scatter([0.5], [1.0], color="red", zorder=5, s=80)
ax.set_title("Entropy of a coin H(p) — peaks at fair coin\n(maximum uncertainty)")
ax.set_xlabel("p (probability of heads)"); ax.set_ylabel("H(p) (bits)")
ax.set_ylim(0, 1.1); ax.legend(); ax.grid(True, alpha=0.3)

# (2) Cross-entropy H(p, q) vs the parameter q for a fixed true p.
# When the model q matches truth p, cross-entropy hits its minimum,
# which is just the entropy H(p). Any other q is worse.
ax = axes[1]
p_true = 0.3
qs = np.linspace(0.01, 0.99, 400)
CE = -(p_true * np.log2(qs) + (1 - p_true) * np.log2(1 - qs))
H_p = -(p_true * np.log2(p_true) + (1 - p_true) * np.log2(1 - p_true))
ax.plot(qs, CE, color="tab:orange", lw=2, label="cross-entropy $H(p, q)$")
ax.axhline(H_p, color="black", lw=1.5, linestyle=":",
           label=f"entropy $H(p)$ = {H_p:.3f} bits (lower bound)")
ax.axvline(p_true, color="red", lw=1.5, linestyle="--",
           label=f"true $p = {p_true}$")
ax.scatter([p_true], [H_p], color="red", zorder=5, s=80)
ax.set_title("Cross-entropy is minimised at the\ncorrect parameter — the truth")
ax.set_xlabel("model parameter q"); ax.set_ylabel("$H(p, q)$ (bits)")
ax.set_ylim(0, 4); ax.legend(fontsize=9); ax.grid(True, alpha=0.3)

# (3) KL(p || q) = H(p, q) − H(p). It's the EXTRA bits we pay
# for using model q when reality is p. Always ≥ 0, equals 0 iff p = q.
ax = axes[2]
KL = CE - H_p
ax.plot(qs, KL, color="tab:green", lw=2, label="KL(p ‖ q)")
ax.fill_between(qs, KL, alpha=0.30, color="tab:green")
ax.axvline(p_true, color="red", lw=1.5, linestyle="--",
           label=f"$q = p = {p_true}$ → KL = 0")
ax.scatter([p_true], [0], color="red", zorder=5, s=80)
ax.set_title("KL divergence — *extra* cost of using\nthe wrong distribution")
ax.set_xlabel("model parameter q"); ax.set_ylabel("$KL(p \\| q)$ (bits)")
ax.set_ylim(-0.1, 4); ax.legend(); ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Print a concrete example so the meaning is crisp.
print("Bernoulli(p = 0.3) example:")
print(f"  Entropy of truth          : H(p)     = {H_p:.4f} bits")
for q in [0.1, 0.3, 0.5, 0.9]:
    ce = -(p_true * np.log2(q) + (1 - p_true) * np.log2(1 - q))
    kl = ce - H_p
    print(f"  q = {q:.2f}: CE = {ce:.4f}, KL = CE − H(p) = {kl:.4f} bits "
          f"({'✓ best' if abs(q - p_true) < 1e-6 else 'extra cost'})")
```

**The three pictures, one story:**

- **Entropy $H(p)$** is the *minimum average number of bits* you need
  to store / transmit / predict each draw. It peaks for the most
  uncertain distribution (a fair coin), and is zero when the outcome is
  certain (you don't need any bits to encode "always heads").
- **Cross-entropy $H(p, q)$** is what your *coding scheme* actually
  costs when you encode samples drawn from $p$ using a code optimal for
  $q$. It is minimised at $q = p$, where it equals $H(p)$. **This is
  the loss function used to train every classifier**: the network's
  predicted distribution $q$ is dragged toward the empirical truth $p$
  by minimising $H(p, q)$.
- **KL divergence $\mathrm{KL}(p \| q) = H(p, q) - H(p)$** is the
  *extra* cost — the gap between using the wrong model and the best
  possible model. It's always $\ge 0$, exactly zero when $q = p$, and
  it's *not symmetric* ($\mathrm{KL}(p\|q) \neq \mathrm{KL}(q\|p)$).
  This asymmetry matters in variational inference: VAEs minimise
  $\mathrm{KL}(q \| p)$ on purpose because that direction is
  "mode-seeking" rather than "mean-seeking".

## Connection to CS / Games / AI / Business / Industry

- **Cross-entropy loss** — THE standard classification loss function
- **Softmax + cross-entropy** — combined for multi-class neural network training
- **Language models** — perplexity = $2^{H(p,q)}$ measures model quality
- **Data compression** — entropy = theoretical minimum bits per symbol
- **KL divergence** — used in VAEs (variational autoencoders), policy gradient methods, knowledge distillation
- **Mutual information** — $I(X;Y) = H(X) - H(X|Y)$: how much knowing $Y$ tells you about $X$
- **Data compression standards** — Huffman coding (in JPEG, PNG, ZIP, MP3) and arithmetic coding (in H.264, H.265, AV1 video) approach the entropy lower bound; Shannon's source-coding theorem caps every codec ever shipped by Apple, Netflix, and YouTube.
- **Telecom & 5G channel capacity** — Shannon-Hartley $C = B \log_2(1 + \text{SNR})$ is the theoretical bit-rate ceiling that drives Qualcomm's modem design and the 3GPP 5G NR standard's link adaptation tables.
- **Decision-tree & XGBoost feature splits** — credit-scoring vendors (FICO, Experian) and Kaggle-grade models use information gain (entropy reduction) to choose splits, directly applying $I(X;Y)$ to billion-row business datasets.
- **Cryptography & password strength** — NIST SP 800-63B uses entropy in bits to specify password and key-length requirements; this is also how 1Password and Bitwarden score password quality for end users.
- **Financial regulation & market efficiency** — entropy-based diversification metrics (used by BlackRock and AQR) measure portfolio concentration; the SEC's HHI (Herfindahl-Hirschman Index) for market concentration is conceptually a Rényi entropy.

## Check Your Understanding

1. **Pen & paper:** Compute the entropy of a distribution $p = (0.25, 0.25, 0.25, 0.25)$ in bits.  Compare with a fair coin.
2. **Pen & paper:** True label is class 2 (out of 3). Softmax output: $(0.1, 0.2, 0.7)$.  Compute the cross-entropy loss.
3. **Pen & paper:** Compute $D_{KL}(p \| q)$ for $p = (1/3, 1/3, 1/3)$ and $q = (1/4, 1/2, 1/4)$.
4. **Think about it:** Why is KL divergence not symmetric?  Give an intuitive example of when $D_{KL}(p \| q)$ and $D_{KL}(q \| p)$ would differ significantly.
