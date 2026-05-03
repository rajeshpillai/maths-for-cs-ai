---
strand: number-quantity
level: master
order: 3
title: Modular Forms
prerequisites:
  - tier: strand-1-number-quantity-master
    slug: 02-l-functions
    description: L-functions
connections:
  - strand-1-number-quantity-master/04-elliptic-curves-arith
applications:
  - cs: "Elliptic-curve arithmetic, modularity-based crypto, lattice-based PQ"
  - life: "Functions on the upper half plane that respect modular symmetry"
---

# Modular Forms

## Mental

A **modular form of weight $k$** for the modular group
$\mathrm{SL}_2(\mathbb{Z})$ is a holomorphic function $f$ on the
upper half-plane $\mathbb{H} = \{z : \mathrm{Im}(z) > 0\}$ satisfying

$$
f\left(\frac{az + b}{cz + d}\right) = (cz + d)^k f(z) \quad \forall \begin{pmatrix} a & b \\ c & d \end{pmatrix} \in \mathrm{SL}_2(\mathbb{Z}),
$$

plus a holomorphic-at-infinity condition (Fourier expansion has
only non-negative-power terms in $q = e^{2\pi i z}$).

**Cusp form**: also vanishes at infinity ($q$-expansion starts at
$q^1$).

## Famous examples

- **Eisenstein series** $E_k$ of even weight $k \ge 4$: lattice-sum
  modular forms.
- **$\Delta(z)$** (modular discriminant): cusp form of weight 12.
  $\Delta(z) = (2\pi)^{12} \eta(z)^{24}$ where $\eta$ is the
  Dedekind eta.
- **$\theta(z) = \sum_{n \in \mathbb{Z}} e^{\pi i n^2 z}$**:
  weight-1/2 form (half-integral weight).
- **$j(z)$**: modular function (weight 0) — the famous $j$-invariant
  of an elliptic curve.

## Structure of the space of modular forms

For each weight $k$, the space $M_k$ of modular forms is
**finite-dimensional**, with explicit dimension formula. Cusp forms
$S_k \subset M_k$ form a subspace.

Notably: $\dim M_k = 0$ for $k = 2$, $1$ for $k \in \{0, 4, 6, 8, 10, 14\}$,
and $\dim$ grows linearly with $k$.

## Hecke operators and Hecke eigenforms

**Hecke operators** $T_p$ act on $M_k$ commuting and self-adjoint;
they have a basis of eigenforms.

A **Hecke eigenform** has $q$-expansion $\sum a_n q^n$ with $a_n$
multiplicative: the L-function

$$
L(s, f) = \sum_{n=1}^\infty \frac{a_n}{n^s}
$$

has Euler product analogous to $\zeta$. So eigenforms produce
L-functions in Selberg's class.

## Interactive

:::widget type=numeric-input prompt="Modular form $f$ of weight $k$: $f((az+b)/(cz+d)) = (cz+d)^k f(z)$. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Cusp form: vanishes at infinity (Fourier starts at $q$). Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\Delta(z)$ has weight $?$" answer=12 explain="$12$.":::

:::widget type=numeric-input prompt="Hecke eigenform's L-function has Euler product. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Modularity theorem** (Wiles-Taylor-Breuil-Conrad-Diamond): every
elliptic curve over $\mathbb{Q}$ corresponds to a weight-2 modular
form. *This was the key to Andrew Wiles's proof of Fermat's Last
Theorem (1995).*

**Ramanujan-Petersson conjecture** (proved for weight $\ge 2$ by
Deligne, 1973): for a Hecke cusp eigenform, the coefficients
$|a_p| \le 2 p^{(k-1)/2}$. Bounds are essential for L-function
analysis.

**Ramanujan's $\tau$ function**: $\Delta(z) = \sum \tau(n) q^n$. 
Conjectures (some now theorems): $|\tau(p)| \le 2 p^{11/2}$,
$\tau(mn) = \tau(m)\tau(n)$ for $\gcd(m,n) = 1$, etc.

**Langlands program**: vast generalisation — L-functions of *automorphic
forms* on reductive groups; modular forms are the $\mathrm{GL}_2$ case.

## Computational

```python
from sympy import symbols, expand, series, sqrt, exp, pi, I

q = symbols("q")

# Eisenstein series E_4 (normalised): 1 + 240 sum sigma_3(n) q^n
def sigma_3(n):
    return sum(d**3 for d in range(1, n + 1) if n % d == 0)

E4_terms = [1] + [240 * sigma_3(n) for n in range(1, 10)]
print(E4_terms)            # [1, 240, 2160, 6720, ...]

# Modular discriminant Delta = (E_4^3 - E_6^2) / 1728
# First few tau coefficients: tau(1)=1, tau(2)=-24, tau(3)=252, ...
tau_first_10 = [1, -24, 252, -1472, 4830, -6048, -16744, 84480, -113643, -115920]
print(tau_first_10)

# Verify multiplicativity: tau(2 * 3) = tau(6) = tau(2) * tau(3)
# tau(6) = -6048; tau(2) * tau(3) = -24 * 252 = -6048 ✓

# Modular j-invariant: classic q-expansion
# j(q) = 1/q + 744 + 196884 q + 21493760 q^2 + ...
print("j coefficients: 1/q, 744, 196884, 21493760")
# Famously: 196884 = 196883 + 1, where 196883 is Monster group dimension
# (Monstrous Moonshine).
```

## Applied

- **Fermat's Last Theorem** — Wiles's proof rests on modularity of
  elliptic curves over $\mathbb{Q}$.
- **Cryptography over modular forms** — Drinfeld modules, automorphic
  L-functions in modern post-quantum schemes.
- **Modular crypto** — supersingular isogeny crypto (SIDH/SIKE) used
  modular curves; SIKE was broken in 2022 (Castryck-Decru).
- **String theory / monstrous moonshine** — coefficient $196884$ of
  $j$-invariant equals $196883 + 1$, dimension of Monster group's
  smallest faithful representation. Underlies $\mathcal{N} = 2$
  supersymmetric theories.

## Check Your Understanding

:::widget type=numeric-input prompt="Wiles proved modularity to settle FLT. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$j$-invariant has weight $0$. Type 1." answer=1 explain="Yes — modular function.":::

:::widget type=numeric-input prompt="Hecke eigenforms produce L-functions with Euler products. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Ramanujan-Petersson bounds Hecke-eigenform coefficients. Type 1." answer=1 explain="Yes.":::
