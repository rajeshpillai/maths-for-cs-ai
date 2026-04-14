# Automata Theory — DFA, NFA, and Regular Languages

## Intuition

An automaton is the simplest model of a computer: it reads input symbols one
at a time, changes state, and either accepts or rejects. Think of a vending
machine — it tracks how much money you have inserted (state) and decides
whether to dispense (accept). Despite their simplicity, automata capture
exactly what regular expressions can do, forming the foundation of lexical
analysis in compilers and text pattern matching.

## Prerequisites

- **Tier 1, Lesson 3** — Relations and functions

## From First Principles

### Deterministic Finite Automaton (DFA)

A DFA is a 5-tuple $(Q, \Sigma, \delta, q_0, F)$:

- $Q$: finite set of states
- $\Sigma$: input alphabet
- $\delta: Q \times \Sigma \to Q$: transition function (exactly one next state)
- $q_0 \in Q$: start state
- $F \subseteq Q$: accept (final) states

The DFA reads a string symbol by symbol, following $\delta$. If it ends in
a state $\in F$, it **accepts**; otherwise it **rejects**.

**Example (pen & paper):** DFA accepting binary strings with an even number of 1s.

States: $Q = \{q_0, q_1\}$ ($q_0$ = even count, $q_1$ = odd count).
Alphabet: $\Sigma = \{0, 1\}$.
Transitions:
- $\delta(q_0, 0) = q_0$, $\delta(q_0, 1) = q_1$
- $\delta(q_1, 0) = q_1$, $\delta(q_1, 1) = q_0$

Start: $q_0$. Accept: $F = \{q_0\}$.

Trace "1101": $q_0 \xrightarrow{1} q_1 \xrightarrow{1} q_0 \xrightarrow{0} q_0 \xrightarrow{1} q_1$. Reject (odd 1s).
Trace "1100": $q_0 \xrightarrow{1} q_1 \xrightarrow{1} q_0 \xrightarrow{0} q_0 \xrightarrow{0} q_0$. Accept (even 1s).

### Nondeterministic Finite Automaton (NFA)

Like a DFA but $\delta: Q \times (\Sigma \cup \{\epsilon\}) \to \mathcal{P}(Q)$
— multiple (or zero) next states are possible, plus $\epsilon$-transitions
(moving without reading input).

An NFA accepts if **any** path through the nondeterminism leads to an accept state.

**Key theorem:** Every NFA can be converted to an equivalent DFA (subset
construction). NFAs do not add computational power but can be exponentially
more compact.

### Regular Languages

A language $L$ is **regular** if some DFA (equivalently, NFA) accepts exactly $L$.

Regular languages are closed under:
- Union ($L_1 \cup L_2$)
- Concatenation ($L_1 \cdot L_2$)
- Kleene star ($L^*$)
- Complement ($\overline{L}$)
- Intersection ($L_1 \cap L_2$)

**Regular expressions** describe exactly the regular languages.

**Pumping Lemma** (proving a language is NOT regular):
If $L$ is regular, there exists $p$ such that any $s \in L$ with $|s| \ge p$
can be written as $s = xyz$ with $|y| > 0$, $|xy| \le p$, and $xy^i z \in L$
for all $i \ge 0$.

**Example:** $L = \{0^n 1^n \mid n \ge 0\}$ is NOT regular. Pumping "000111"
forces the pump in the 0s, breaking the balance.

### Visualisation

```python
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

fig, axes = plt.subplots(1, 2, figsize=(14, 4))

# Left: DFA for even number of 1s
ax = axes[0]
ax.set_title("DFA: Even Number of 1s", fontsize=12)

# States
for name, (x, y), is_accept in [('q0', (1, 1), True), ('q1', (3, 1), False)]:
    circle = plt.Circle((x, y), 0.35, fill=False, edgecolor='black', lw=2)
    ax.add_patch(circle)
    if is_accept:
        inner = plt.Circle((x, y), 0.28, fill=False, edgecolor='black', lw=1.5)
        ax.add_patch(inner)
    ax.text(x, y, name, ha='center', va='center', fontsize=12, fontweight='bold')

# Start arrow
ax.annotate('', xy=(0.65, 1), xytext=(0.1, 1), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.text(0.3, 1.15, 'start', fontsize=9)

# Transitions
ax.annotate('', xy=(2.65, 1.1), xytext=(1.35, 1.1), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.text(2, 1.25, '1', fontsize=11, ha='center', color='red')
ax.annotate('', xy=(1.35, 0.9), xytext=(2.65, 0.9), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.text(2, 0.65, '1', fontsize=11, ha='center', color='red')

# Self-loops (simplified as curved arrows above)
ax.annotate('', xy=(0.8, 1.35), xytext=(1.2, 1.35),
            arrowprops=dict(arrowstyle='->', lw=1.2, connectionstyle='arc3,rad=-1.2'))
ax.text(1, 1.85, '0', fontsize=11, ha='center', color='blue')
ax.annotate('', xy=(2.8, 1.35), xytext=(3.2, 1.35),
            arrowprops=dict(arrowstyle='->', lw=1.2, connectionstyle='arc3,rad=-1.2'))
ax.text(3, 1.85, '0', fontsize=11, ha='center', color='blue')

ax.set_xlim(-0.2, 4); ax.set_ylim(0.2, 2.2); ax.set_aspect('equal'); ax.axis('off')

# Right: NFA for strings ending in "01"
ax = axes[1]
ax.set_title('NFA: Strings Ending in "01"', fontsize=12)
states_nfa = [('q0', 0.5, 1, False), ('q1', 2, 1, False), ('q2', 3.5, 1, True)]
for name, x, y, acc in states_nfa:
    c = plt.Circle((x, y), 0.3, fill=False, edgecolor='black', lw=2)
    ax.add_patch(c)
    if acc:
        c2 = plt.Circle((x, y), 0.23, fill=False, edgecolor='black', lw=1.5)
        ax.add_patch(c2)
    ax.text(x, y, name, ha='center', va='center', fontsize=11, fontweight='bold')

ax.annotate('', xy=(0.2, 1), xytext=(-0.3, 1), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.annotate('', xy=(1.7, 1.05), xytext=(0.8, 1.05), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.text(1.25, 1.2, '0', fontsize=11, ha='center', color='red')
ax.annotate('', xy=(3.2, 1.05), xytext=(2.3, 1.05), arrowprops=dict(arrowstyle='->', lw=1.5))
ax.text(2.75, 1.2, '1', fontsize=11, ha='center', color='red')
ax.annotate('', xy=(0.35, 1.3), xytext=(0.65, 1.3),
            arrowprops=dict(arrowstyle='->', lw=1.2, connectionstyle='arc3,rad=-1.2'))
ax.text(0.5, 1.75, '0,1', fontsize=10, ha='center', color='blue')

ax.set_xlim(-0.5, 4.2); ax.set_ylim(0.2, 2.1); ax.set_aspect('equal'); ax.axis('off')

plt.tight_layout()
plt.savefig("automata_basics.png", dpi=100)
plt.show()
```

## Python Verification

```python
# ── DFA simulation ───────────────────────────────────────
class DFA:
    def __init__(self, states, alphabet, transitions, start, accept):
        self.transitions = transitions  # dict: (state, symbol) -> state
        self.start = start
        self.accept = accept

    def run(self, input_string):
        state = self.start
        for symbol in input_string:
            state = self.transitions.get((state, symbol))
            if state is None:
                return False  # no transition = reject
        return state in self.accept

# Step 1: DFA for even number of 1s
even_ones = DFA(
    states={'q0', 'q1'},
    alphabet={'0', '1'},
    transitions={
        ('q0', '0'): 'q0', ('q0', '1'): 'q1',
        ('q1', '0'): 'q1', ('q1', '1'): 'q0',
    },
    start='q0',
    accept={'q0'}
)

test_strings = ['', '0', '1', '11', '101', '1100', '1101', '111']
print("DFA: Even number of 1s")
for s in test_strings:
    ones = s.count('1')
    result = even_ones.run(s)
    print(f"  '{s}' -> {result}  (has {ones} ones, {'even' if ones%2==0 else 'odd'})")

# ── NFA simulation (subset construction on the fly) ──────
class NFA:
    def __init__(self, transitions, start, accept):
        self.transitions = transitions  # dict: (state, symbol) -> set of states
        self.start = start
        self.accept = accept

    def run(self, input_string):
        current = {self.start}
        for symbol in input_string:
            next_states = set()
            for state in current:
                next_states |= self.transitions.get((state, symbol), set())
            current = next_states
        return bool(current & self.accept)

# Step 2: NFA for strings ending in "01"
nfa_01 = NFA(
    transitions={
        ('q0', '0'): {'q0', 'q1'},
        ('q0', '1'): {'q0'},
        ('q1', '1'): {'q2'},
    },
    start='q0',
    accept={'q2'}
)

print("\nNFA: Strings ending in '01'")
for s in ['01', '001', '101', '0', '1', '10', '0101', '11']:
    result = nfa_01.run(s)
    expected = s.endswith('01')
    print(f"  '{s}' -> {result}  (expected: {expected})")

# Step 3: Pumping lemma demo — show 0^n 1^n is not regular
print("\nPumping lemma: trying to 'pump' 0^3 1^3 = '000111'")
s = "000111"
p = 3  # pumping length
for i in range(5):
    pumped = "0" * i + s[1:]  # pump y = "0" at position 0
    balanced = pumped.count('0') == pumped.count('1')
    in_lang = balanced and all(c == '0' for c in pumped[:pumped.count('0')])
    print(f"  i={i}: '{pumped[:10]}...' length={len(pumped)}, balanced={balanced}")
```

## Connection to CS / Games / AI

- **Lexical analysis:** Compilers use DFAs to tokenise source code — each
  token type (identifier, number, keyword) is a regular language.
- **Regular expressions:** `grep`, text editors, and web validators all compile
  regexes to NFAs/DFAs.
- **Network protocols:** TCP state machines are DFAs that track connection state.
- **Game AI:** NPC behaviour is often modelled as finite state machines (idle,
  patrol, chase, attack).

## Check Your Understanding

1. Design a DFA over $\{a, b\}$ that accepts strings containing "aba" as a
   substring. Trace it on "babab".
2. Convert the NFA for "ends in 01" to a DFA using subset construction.
   How many states does the DFA have?
3. Use the pumping lemma to prove $\{ww \mid w \in \{0,1\}^*\}$ is not regular.
