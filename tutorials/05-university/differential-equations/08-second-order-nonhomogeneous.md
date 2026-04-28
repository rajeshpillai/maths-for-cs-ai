# Second-Order Nonhomogeneous ODEs

## Intuition

A homogeneous ODE describes free motion — a spring released and left alone.
A **nonhomogeneous** ODE has a forcing term on the right side: someone is
pushing the spring. The total response is the *natural behaviour* (homogeneous
solution) plus the *forced response* (particular solution). In ML terms, the
homogeneous part is the model's intrinsic dynamics, and the forcing is the
external input signal.

## Prerequisites

- Tier 11, Lesson 7: Second-Order Homogeneous ODEs (you must know how to solve the homogeneous part)
- Tier 3, Lesson 6: Integrals (integration for variation of parameters)

## From First Principles

### The Equation

$$ay'' + by' + cy = g(t)$$

where $g(t) \neq 0$ is the **forcing function**.

### The Structure of the General Solution

The general solution is:

$$y = y_h + y_p$$

- $y_h$: **complementary (homogeneous) solution** — solves $ay'' + by' + cy = 0$
- $y_p$: **particular solution** — any single function that satisfies the full equation

Why? If $y_1$ and $y_2$ both solve the nonhomogeneous equation, then
$y_1 - y_2$ solves the homogeneous equation (the $g(t)$ terms cancel). So all
solutions differ by a homogeneous solution.

### Method of Undetermined Coefficients

**When to use:** $g(t)$ is a polynomial, exponential, sine, cosine, or a
combination of these.

**The technique:**

1. Solve the homogeneous equation to get $y_h$.
2. Guess the form of $y_p$ based on $g(t)$ (see table below).
3. Substitute the guess into the full equation.
4. Match coefficients to determine the unknown constants.

**Guess table:**

| $g(t)$ | Guess for $y_p$ |
|---|---|
| $e^{\alpha t}$ | $Ae^{\alpha t}$ |
| $\sin(\omega t)$ or $\cos(\omega t)$ | $A\cos(\omega t) + B\sin(\omega t)$ |
| Polynomial degree $n$ | $A_n t^n + A_{n-1}t^{n-1} + \cdots + A_0$ |
| $t^n e^{\alpha t}$ | $(A_n t^n + \cdots + A_0)e^{\alpha t}$ |

**Important modification rule:** If your guess is already part of $y_h$,
multiply the guess by $t$ (or $t^2$ if needed) until it is no longer a
solution of the homogeneous equation.

### Worked Example: $y'' + y = \sin(t)$

**Step 1 — Homogeneous solution.**

$r^2 + 1 = 0 \Rightarrow r = \pm i$

$y_h = C_1 \cos t + C_2 \sin t$

**Step 2 — Guess for $y_p$.**

Normally we'd guess $A\cos t + B\sin t$. But $\cos t$ and $\sin t$ are already
in $y_h$! So multiply by $t$:

$$y_p = t(A\cos t + B\sin t) = At\cos t + Bt\sin t$$

**Step 3 — Compute derivatives.**

$y_p = At\cos t + Bt\sin t$

$y_p' = A\cos t - At\sin t + B\sin t + Bt\cos t$

$y_p'' = -A\sin t - A\sin t - At\cos t + B\cos t + B\cos t - Bt\sin t$

$y_p'' = -2A\sin t - At\cos t + 2B\cos t - Bt\sin t$

**Step 4 — Substitute into $y'' + y = \sin t$.**

$y_p'' + y_p = (-2A\sin t - At\cos t + 2B\cos t - Bt\sin t) + (At\cos t + Bt\sin t)$

$= -2A\sin t + 2B\cos t$

Set equal to $\sin t$:

$$-2A\sin t + 2B\cos t = \sin t$$

Match coefficients:

- $\sin t$: $-2A = 1 \Rightarrow A = -1/2$
- $\cos t$: $2B = 0 \Rightarrow B = 0$

**Particular solution:** $y_p = -\frac{t}{2}\cos t$

**General solution:** $y = C_1\cos t + C_2\sin t - \frac{t}{2}\cos t$

**Check:** The $-\frac{t}{2}\cos t$ term grows with $t$ — this is **resonance**
(forcing frequency matches natural frequency).

### Worked Example: $y'' - 3y' + 2y = e^{3t}$

**Step 1 — Homogeneous:** $r^2 - 3r + 2 = (r-1)(r-2) = 0$, $y_h = C_1 e^t + C_2 e^{2t}$.

**Step 2 — Guess:** $g(t) = e^{3t}$. Since $e^{3t}$ is not in $y_h$ (roots are 1 and 2, not 3), guess $y_p = Ae^{3t}$.

**Step 3 — Substitute:**

$y_p' = 3Ae^{3t}$, $y_p'' = 9Ae^{3t}$

$9Ae^{3t} - 3(3Ae^{3t}) + 2(Ae^{3t}) = e^{3t}$

$(9A - 9A + 2A)e^{3t} = e^{3t}$

$2A = 1 \Rightarrow A = 1/2$

**Particular solution:** $y_p = \frac{1}{2}e^{3t}$

**General solution:** $y = C_1 e^t + C_2 e^{2t} + \frac{1}{2}e^{3t}$

### Variation of Parameters (Brief)

When $g(t)$ is not a "nice" function (e.g., $g(t) = \sec t$ or $\ln t$),
undetermined coefficients fails. **Variation of parameters** always works:

Given $y_h = C_1 y_1 + C_2 y_2$, seek $y_p = u_1(t)y_1(t) + u_2(t)y_2(t)$ where:

$$u_1' = \frac{-y_2 \cdot g/a}{W}, \quad u_2' = \frac{y_1 \cdot g/a}{W}$$

and $W = y_1 y_2' - y_2 y_1'$ is the **Wronskian**.

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

t = np.linspace(0, 20, 500)

# y'' + y = sin(t): resonance case
# y_h = C1*cos(t) + C2*sin(t), y_p = -(t/2)*cos(t)
# With y(0)=0, y'(0)=0: C1=0, C2=1/2
y_h = 0.5 * np.sin(t)
y_p = -(t / 2) * np.cos(t)
y_total = y_h + y_p

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(t, y_h, "b--", linewidth=1, alpha=0.7, label="Homogeneous part")
ax.plot(t, y_p, "r--", linewidth=1, alpha=0.7, label="Particular part")
ax.plot(t, y_total, "k-", linewidth=2, label="General solution (resonance!)")
ax.set_xlabel("t")
ax.set_ylabel("y")
ax.set_title("y'' + y = sin(t): resonance — amplitude grows linearly")
ax.legend()
plt.tight_layout()
plt.show()
```

## Python Verification

```python
import numpy as np

# --- Example 1: y'' + y = sin(t) ---
print("=== y'' + y = sin(t) ===")
print("y_p = -(t/2)*cos(t)")

t_test = np.array([0.5, 1.0, 2.0, 5.0])
dt = 1e-6

def yp(t):
    return -(t / 2) * np.cos(t)

for t in t_test:
    y = yp(t)
    y_prime = (yp(t + dt) - yp(t - dt)) / (2 * dt)
    y_double_prime = (yp(t + dt) - 2 * yp(t) + yp(t - dt)) / dt**2
    residual = y_double_prime + y
    print(f"  t={t:.1f}: y_p''+ y_p = {residual:.6f}, sin(t) = {np.sin(t):.6f}")

print()

# --- Example 2: y'' - 3y' + 2y = e^(3t) ---
print("=== y'' - 3y' + 2y = e^(3t) ===")
print("y_p = (1/2)*e^(3t)")

def yp2(t):
    return 0.5 * np.exp(3 * t)

for t in [0.0, 0.5, 1.0]:
    y = yp2(t)
    y_prime = (yp2(t + dt) - yp2(t - dt)) / (2 * dt)
    y_double_prime = (yp2(t + dt) - 2 * yp2(t) + yp2(t - dt)) / dt**2
    residual = y_double_prime - 3 * y_prime + 2 * y
    print(f"  t={t:.1f}: y'' - 3y' + 2y = {residual:.6f}, e^(3t) = {np.exp(3*t):.6f}")

print()

# --- Full general solution verification with ICs ---
print("=== Full solution: y'' - 3y' + 2y = e^(3t), y(0)=1, y'(0)=0 ===")
# y = C1*e^t + C2*e^(2t) + (1/2)*e^(3t)
# y(0) = C1 + C2 + 1/2 = 1  =>  C1 + C2 = 1/2
# y'(0) = C1 + 2*C2 + 3/2 = 0  =>  C1 + 2*C2 = -3/2
# Solving: C2 = -2, C1 = 5/2
C1, C2 = 2.5, -2.0

def y_full(t):
    return C1 * np.exp(t) + C2 * np.exp(2*t) + 0.5 * np.exp(3*t)

print(f"  y(0) = {y_full(0):.6f} (should be 1)")
yp0 = (y_full(dt) - y_full(-dt)) / (2*dt)
print(f"  y'(0) = {yp0:.6f} (should be 0)")
```

## Connection to CS / Games / AI / Business / Industry

- **Forced oscillations** in audio: a speaker driven by an AC signal is a
  nonhomogeneous second-order ODE. Resonance explains why certain frequencies
  are louder.
- **Input-output systems**: in control theory, $g(t)$ is the input signal and
  $y(t)$ is the system response. The homogeneous solution is the transient;
  the particular solution is the steady-state response.
- **Neural network forcing**: an external signal $g(t)$ driving a recurrent
  network is mathematically analogous to the forcing term in a
  nonhomogeneous ODE.
- **Game physics**: external forces (wind, explosions, player input) are the
  $g(t)$ that modify a spring-mass system's free behaviour.
- **Resonance** must be detected and avoided in structural simulations
  (bridges, buildings in games) — it causes unbounded growth.

## Check Your Understanding

1. Solve $y'' + 4y' + 3y = 10e^{-t}$. Be careful: is $e^{-t}$ part of
   $y_h$? What modification is needed?

2. Solve $y'' - y = t^2$. Guess $y_p = At^2 + Bt + C$, substitute, and
   match coefficients.

3. For $y'' + 9y = \cos(3t)$, explain why resonance occurs. Write the
   modified guess for $y_p$ and find it.
