# Momentum, RMSProp, Adam — Derive Each Update Rule

## Intuition

Plain SGD is like a ball rolling downhill on an icy surface — it oscillates in
steep narrow valleys and crawls along flat plains.  **Momentum** gives the ball
mass, so it builds speed in consistent directions.  **RMSProp** adapts the step
size per-parameter.  **Adam** combines both.  These are the optimisers you'll
actually use in practice.

## Prerequisites

- Tier 5, Lesson 2: Gradient Descent
- Tier 5, Lesson 3: SGD and Mini-Batches

## From First Principles

### Problem with vanilla SGD

Consider $f(x, y) = x^2 + 100y^2$.  The gradient is $(2x, 200y)$.

The $y$-direction has a gradient 100× steeper, so SGD oscillates wildly in $y$
while barely moving in $x$.  A small learning rate tames $y$ but makes $x$
progress glacially slow.

### Momentum

**Idea:** Accumulate a velocity term that smooths out oscillations.

$$\mathbf{v}_t = \beta \mathbf{v}_{t-1} + \nabla L(\boldsymbol{\theta}_t)$$
$$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \alpha \mathbf{v}_t$$

$\beta \approx 0.9$ is typical.

**Pen & paper: 1D momentum**

$f(w) = w^2$, $f'(w) = 2w$.  Start $w = 5, v = 0, \alpha = 0.1, \beta = 0.9$.

| Step | $w$ | $\nabla$ | $v$ | New $w$ |
|------|-----|----------|-----|---------|
| 0 | 5.0 | 10 | $0.9(0) + 10 = 10$ | $5 - 1 = 4.0$ |
| 1 | 4.0 | 8 | $0.9(10) + 8 = 17$ | $4 - 1.7 = 2.3$ |
| 2 | 2.3 | 4.6 | $0.9(17) + 4.6 = 19.9$ | $2.3 - 1.99 = 0.31$ |

Much faster than vanilla SGD! The velocity builds up.

**Why it works:** In the consistent direction, velocities add up.  In the
oscillating direction, they cancel out.

### RMSProp (Root Mean Square Propagation)

**Idea:** Adapt the learning rate for each parameter based on the history of
its gradients.  Parameters with large gradients get smaller steps.

$$\mathbf{s}_t = \beta \mathbf{s}_{t-1} + (1-\beta) \mathbf{g}_t^2$$
$$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \frac{\alpha}{\sqrt{\mathbf{s}_t} + \epsilon} \mathbf{g}_t$$

$\beta \approx 0.999$, $\epsilon = 10^{-8}$ (prevents division by zero).

**Pen & paper:** For the $y$-direction with large gradients:

$s_y$ grows large → $\frac{\alpha}{\sqrt{s_y}}$ shrinks → smaller steps in $y$.

For the $x$-direction with small gradients:

$s_x$ stays small → $\frac{\alpha}{\sqrt{s_x}}$ stays large → larger steps in $x$.

This automatically balances the learning rates!

### Adam (Adaptive Moment Estimation)

**Idea:** Combine momentum (first moment) + RMSProp (second moment) + bias correction.

$$\mathbf{m}_t = \beta_1 \mathbf{m}_{t-1} + (1-\beta_1) \mathbf{g}_t \quad \text{(momentum)}$$
$$\mathbf{v}_t = \beta_2 \mathbf{v}_{t-1} + (1-\beta_2) \mathbf{g}_t^2 \quad \text{(RMSProp)}$$

**Bias correction** (because $m_0 = v_0 = 0$ biases early estimates toward 0):

$$\hat{\mathbf{m}}_t = \frac{\mathbf{m}_t}{1 - \beta_1^t}, \quad \hat{\mathbf{v}}_t = \frac{\mathbf{v}_t}{1 - \beta_2^t}$$

**Update:**

$$\boldsymbol{\theta}_{t+1} = \boldsymbol{\theta}_t - \frac{\alpha}{\sqrt{\hat{\mathbf{v}}_t} + \epsilon} \hat{\mathbf{m}}_t$$

Default hyperparameters: $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\alpha = 0.001$, $\epsilon = 10^{-8}$.

### Pen & paper: Adam step by step

$f(w) = w^2$, $w = 5, \alpha = 0.1, \beta_1 = 0.9, \beta_2 = 0.999$.

**Step 1:** $g_1 = 2(5) = 10$

$m_1 = 0.9(0) + 0.1(10) = 1$
$v_1 = 0.999(0) + 0.001(100) = 0.1$
$\hat{m}_1 = 1 / (1 - 0.9) = 10$
$\hat{v}_1 = 0.1 / (1 - 0.999) = 100$
$w_1 = 5 - 0.1 \times \frac{10}{\sqrt{100} + 10^{-8}} = 5 - 0.1 \times 1 = 4.9$

Adam takes a conservative first step (the bias correction is doing heavy lifting here).

### Comparison summary

| Optimiser | Adapts direction? | Adapts step size? | Hyperparameters |
|-----------|------------------|------------------|-----------------|
| SGD | No | No | $\alpha$ |
| SGD + Momentum | Yes | No | $\alpha, \beta$ |
| RMSProp | No | Yes (per-param) | $\alpha, \beta, \epsilon$ |
| Adam | Yes | Yes (per-param) | $\alpha, \beta_1, \beta_2, \epsilon$ |

## Python Verification

```python
# ── Momentum, RMSProp, Adam ─────────────────────────────────
import math

def f(w):
    return w ** 2

def grad_f(w):
    return 2 * w

w0 = 5.0
steps = 20

# Vanilla SGD
print("=== Vanilla SGD ===")
w = w0
alpha = 0.1
for t in range(steps):
    g = grad_f(w)
    w = w - alpha * g
    if t < 5 or t == steps - 1:
        print(f"  t={t}: w={w:.6f}, f={f(w):.6f}")

# SGD + Momentum
print(f"\n=== SGD + Momentum (β=0.9) ===")
w = w0
v = 0
alpha, beta = 0.1, 0.9
for t in range(steps):
    g = grad_f(w)
    v = beta * v + g
    w = w - alpha * v
    if t < 5 or t == steps - 1:
        print(f"  t={t}: w={w:.6f}, f={f(w):.6f}")

# RMSProp
print(f"\n=== RMSProp (β=0.999) ===")
w = w0
s = 0
alpha, beta, eps = 0.1, 0.999, 1e-8
for t in range(steps):
    g = grad_f(w)
    s = beta * s + (1 - beta) * g**2
    w = w - alpha * g / (math.sqrt(s) + eps)
    if t < 5 or t == steps - 1:
        print(f"  t={t}: w={w:.6f}, f={f(w):.6f}")

# Adam
print(f"\n=== Adam ===")
w = w0
m, v_adam = 0, 0
alpha, beta1, beta2, eps = 0.1, 0.9, 0.999, 1e-8
for t in range(1, steps + 1):
    g = grad_f(w)
    m = beta1 * m + (1 - beta1) * g
    v_adam = beta2 * v_adam + (1 - beta2) * g**2
    m_hat = m / (1 - beta1**t)
    v_hat = v_adam / (1 - beta2**t)
    w = w - alpha * m_hat / (math.sqrt(v_hat) + eps)
    if t <= 5 or t == steps:
        print(f"  t={t}: w={w:.6f}, f={f(w):.6f}")

# 2D comparison on ill-conditioned problem
print(f"\n=== 2D: f(x,y) = x² + 100y² ===")
for name, use_momentum, use_adaptive in [("SGD", False, False), ("Momentum", True, False), ("Adam", True, True)]:
    x, y = 5.0, 5.0
    mx, my, vx, vy = 0, 0, 0, 0
    alpha = 0.001 if not use_adaptive else 0.1
    for t in range(1, 201):
        gx, gy = 2*x, 200*y
        if use_adaptive:  # Adam-like
            mx = 0.9*mx + 0.1*gx
            my = 0.9*my + 0.1*gy
            vx = 0.999*vx + 0.001*gx**2
            vy = 0.999*vy + 0.001*gy**2
            mxh = mx/(1-0.9**t)
            myh = my/(1-0.9**t)
            vxh = vx/(1-0.999**t)
            vyh = vy/(1-0.999**t)
            x -= 0.1 * mxh / (math.sqrt(vxh) + 1e-8)
            y -= 0.1 * myh / (math.sqrt(vyh) + 1e-8)
        elif use_momentum:
            mx = 0.9*mx + gx
            my = 0.9*my + gy
            x -= alpha * mx
            y -= alpha * my
        else:
            x -= alpha * gx
            y -= alpha * gy
    print(f"  {name:8s}: ({x:.6f}, {y:.6f}), f={x**2 + 100*y**2:.6f}")
```

## Connection to CS / Games / AI

- **Adam** — the default optimiser for most deep learning (Transformers, CNNs, GANs)
- **SGD + Momentum** — still preferred for vision tasks (ResNet, etc.) with proper tuning
- **AdamW** — Adam with decoupled weight decay (fixes L2 regularisation interaction)
- **Learning rate schedulers** — combine with cosine annealing, warm-up for best results
- **Per-parameter rates** — Adam automatically gives rare features larger updates (great for sparse data like NLP)

## Check Your Understanding

1. **Pen & paper:** Do 3 steps of momentum SGD on $f(w) = (w-2)^2$, starting at $w = 10$, $\alpha = 0.1$, $\beta = 0.9$.
2. **Pen & paper:** Why does the bias correction in Adam matter most during early steps?  What happens to $\hat{m}_t$ as $t$ grows large?
3. **Think about it:** Adam adapts learning rates per-parameter.  Why might this be especially helpful for training word embeddings where some words appear 1000× more often than others?
