# Turing Machines

## Intuition

A Turing machine is the theoretical limit of computation — an infinitely long
tape, a read/write head, and a set of rules. Despite its simplicity, it can
compute anything that any computer can compute. The **Church-Turing thesis**
asserts this universality. But not everything is computable: the **halting
problem** proves that no algorithm can decide whether an arbitrary program
will ever finish. This is the foundational impossibility result of CS.

## Prerequisites

- **Tier 13, Lesson 12** — DFA, NFA, regular languages

## From First Principles

### Definition

A Turing Machine (TM) is a 7-tuple $(Q, \Sigma, \Gamma, \delta, q_0, q_{\text{accept}}, q_{\text{reject}})$:

- $Q$: finite set of states
- $\Sigma$: input alphabet (not including blank $\sqcup$)
- $\Gamma \supseteq \Sigma \cup \{\sqcup\}$: tape alphabet
- $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$: transition function
- $q_0$: start state
- $q_{\text{accept}}$, $q_{\text{reject}}$: halting states ($q_{\text{accept}} \ne q_{\text{reject}}$)

The TM starts with input on the tape, head at the leftmost symbol. At each
step, it reads the current symbol, writes a new symbol, moves left or right,
and changes state. It halts when it enters $q_{\text{accept}}$ or $q_{\text{reject}}$.

### Pen & Paper Example

**TM to decide** $\{0^n 1^n \mid n \ge 1\}$ (not regular, not even context-free-detectable by DFA):

**Idea:** Repeatedly cross off one 0 and one 1.

States: $q_0$ (scan right for 0), $q_1$ (scan right for 1), $q_2$ (scan left),
$q_3$ (check if done), $q_a$ (accept), $q_r$ (reject).

Rules (simplified):
1. $q_0$: read 0, write X, move right, go to $q_1$.
   Read X, skip right. Read $\sqcup$, reject (no 0 found).
2. $q_1$: read 0/Y, skip right. Read 1, write Y, go to $q_2$, move left.
   Read $\sqcup$, reject (no matching 1).
3. $q_2$: scan left past 0/Y/X until reaching start, go to $q_0$.
4. $q_0$: read Y, skip right. Read $\sqcup$, accept (all matched).

**Trace on "0011":**

```
Tape: [0] 0  1  1  _     State: q0
Tape:  X [0] 1  1  _     State: q1 (wrote X, moved right)
Tape:  X  0 [1] 1  _     State: q1 (skipped 0)
Tape:  X  0  Y [1] _     State: q2 (wrote Y, moving left)
Tape:  X [0] Y  1  _     State: q2 (moving left)
Tape: [X] 0  Y  1  _     State: q2 (moving left)
Tape:  X [0] Y  1  _     State: q0 (back to start)
Tape:  X  X [Y] 1  _     State: q1 (wrote X, moved right)
Tape:  X  X  Y [1] _     State: q1 (skipped Y)
Tape:  X  X [Y] Y  _     State: q2 (wrote Y, moving left)
...
Eventually: X X Y Y [_]  State: q0 -> accept!
```

### The Halting Problem

**Theorem (Turing, 1936):** There is no TM $H$ that, given any TM $M$ and
input $w$, correctly decides whether $M$ halts on $w$.

**Proof by contradiction (pen & paper):**

1. Assume $H(M, w)$ exists: outputs "halts" or "loops."
2. Build a new TM $D$: on input $M$, run $H(M, M)$.
   - If $H$ says "halts," then $D$ loops forever.
   - If $H$ says "loops," then $D$ halts.
3. Run $D$ on itself: $D(D)$.
   - If $D(D)$ halts, then $H(D,D)$ said "halts," so $D$ should loop. Contradiction.
   - If $D(D)$ loops, then $H(D,D)$ said "loops," so $D$ should halt. Contradiction.
4. Therefore $H$ cannot exist. $\blacksquare$

### Church-Turing Thesis

**Informal statement:** Any function that can be computed by an "effective
procedure" (algorithm) can be computed by a Turing machine.

This is a thesis, not a theorem — it cannot be proved because "effective
procedure" is informal. But every proposed model of computation (lambda
calculus, recursive functions, cellular automata, quantum computers for
decision problems) has been shown equivalent to TMs.

### Visualisation

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, figsize=(12, 7))

# Top: TM tape states during execution on "0011"
ax = axes[0]
ax.set_title('Turing Machine Trace: Deciding "0011" in {0^n 1^n}', fontsize=12)

tape_states = [
    (['0','0','1','1','_'], 0, 'q0'),
    (['X','0','1','1','_'], 1, 'q1'),
    (['X','0','1','1','_'], 2, 'q1'),
    (['X','0','Y','1','_'], 1, 'q2'),
    (['X','0','Y','1','_'], 0, 'q2'),
    (['X','0','Y','1','_'], 1, 'q0'),
    (['X','X','Y','1','_'], 2, 'q1'),
    (['X','X','Y','1','_'], 3, 'q1'),
    (['X','X','Y','Y','_'], 2, 'q2'),
    (['X','X','Y','Y','_'], 4, 'q0, ACCEPT'),
]

n_steps = len(tape_states)
for step, (tape, head, state) in enumerate(tape_states):
    y = n_steps - step - 1
    for i, ch in enumerate(tape):
        color = 'lightyellow'
        if i == head:
            color = 'lightgreen'
        rect = plt.Rectangle((i * 1.2, y * 0.6), 1, 0.5, facecolor=color,
                              edgecolor='black', lw=1)
        ax.add_patch(rect)
        ax.text(i * 1.2 + 0.5, y * 0.6 + 0.25, ch, ha='center', va='center', fontsize=10)
    ax.text(6.5, y * 0.6 + 0.25, state, fontsize=9, va='center')

ax.set_xlim(-0.5, 9); ax.set_ylim(-0.3, n_steps * 0.6 + 0.3)
ax.set_aspect('equal'); ax.axis('off')

# Bottom: Halting problem diagonal argument
ax = axes[1]
ax.set_title("Halting Problem: Diagonal Argument", fontsize=12)
machines = ['M1', 'M2', 'M3', 'M4']
for i, m in enumerate(machines):
    for j, inp in enumerate(machines):
        result = 'H' if (i + j) % 2 == 0 else 'L'
        if i == j:
            color = 'lightsalmon'
        else:
            color = 'white'
        rect = plt.Rectangle((j+1, 3-i), 1, 1, facecolor=color, edgecolor='black')
        ax.add_patch(rect)
        ax.text(j+1.5, 3-i+0.5, result, ha='center', va='center', fontsize=12)
    ax.text(0.5, 3-i+0.5, m, ha='center', va='center', fontsize=11, fontweight='bold')

for j, m in enumerate(machines):
    ax.text(j+1.5, 4.3, m, ha='center', fontsize=11, fontweight='bold')

ax.text(0.5, 4.3, "H(Mi,Mj)", ha='center', fontsize=10)
ax.text(3, -0.5, "D flips the diagonal: contradiction!", ha='center', fontsize=11,
        fontstyle='italic', color='red')
ax.set_xlim(-0.2, 5.5); ax.set_ylim(-1, 5); ax.set_aspect('equal'); ax.axis('off')

plt.tight_layout()
plt.savefig("turing_machines.png", dpi=100)
plt.show()
```

## Python Verification

```python
# ── Turing Machine simulator ────────────────────────────
class TuringMachine:
    def __init__(self, transitions, start, accept, reject, blank='_'):
        self.transitions = transitions  # (state, read) -> (new_state, write, direction)
        self.start = start
        self.accept = accept
        self.reject = reject
        self.blank = blank

    def run(self, input_string, max_steps=1000):
        tape = list(input_string) + [self.blank] * 10
        head = 0
        state = self.start
        steps = 0

        while steps < max_steps:
            if state == self.accept:
                return True, steps
            if state == self.reject:
                return False, steps

            symbol = tape[head]
            key = (state, symbol)
            if key not in self.transitions:
                return False, steps  # no transition = reject

            new_state, write, direction = self.transitions[key]
            tape[head] = write
            state = new_state
            head += 1 if direction == 'R' else -1
            if head < 0:
                tape.insert(0, self.blank)
                head = 0
            if head >= len(tape):
                tape.append(self.blank)
            steps += 1

        return None, steps  # did not halt within max_steps

# Step 1: TM for {0^n 1^n | n >= 1}
# States: q0 (find 0), q1 (find matching 1), q2 (rewind), q3 (check done)
tm_0n1n = TuringMachine(
    transitions={
        ('q0', '0'): ('q1', 'X', 'R'),  # mark 0 as X, find matching 1
        ('q0', 'Y'): ('q3', 'Y', 'R'),  # skip Ys, check if done
        ('q0', '_'): ('reject', '_', 'R'),  # empty = reject (need at least one)
        ('q1', '0'): ('q1', '0', 'R'),  # skip 0s
        ('q1', 'Y'): ('q1', 'Y', 'R'),  # skip Ys
        ('q1', '1'): ('q2', 'Y', 'L'),  # mark 1 as Y, rewind
        ('q1', '_'): ('reject', '_', 'R'),  # no matching 1
        ('q2', '0'): ('q2', '0', 'L'),
        ('q2', 'Y'): ('q2', 'Y', 'L'),
        ('q2', 'X'): ('q0', 'X', 'R'),  # back at last X, go right to find next 0
        ('q3', 'Y'): ('q3', 'Y', 'R'),  # skip remaining Ys
        ('q3', '_'): ('accept', '_', 'R'),  # all matched
        ('q3', '0'): ('reject', '0', 'R'),
        ('q3', '1'): ('reject', '1', 'R'),
    },
    start='q0', accept='accept', reject='reject'
)

print("TM for {0^n 1^n}:")
tests = ['01', '0011', '000111', '0', '1', '0111', '0010', '']
for s in tests:
    result, steps = tm_0n1n.run(s)
    expected = len(s) > 0 and len(s) % 2 == 0 and s == '0' * (len(s)//2) + '1' * (len(s)//2)
    status = "OK" if result == expected else "MISMATCH"
    print(f"  '{s}' -> {result} in {steps} steps (expected: {expected}) [{status}]")

# Step 2: Universal computation — simulate a simple function
# TM that increments a unary number (111 -> 1111)
tm_inc = TuringMachine(
    transitions={
        ('q0', '1'): ('q0', '1', 'R'),  # scan right past 1s
        ('q0', '_'): ('accept', '1', 'R'),  # append a 1
    },
    start='q0', accept='accept', reject='reject'
)

print("\nTM unary increment:")
for n in range(5):
    s = '1' * n
    result, steps = tm_inc.run(s)
    print(f"  {'1'*n} ({n}) -> accepted in {steps} steps (result: {n+1} ones)")
```

## Connection to CS / Games / AI / Business / Industry

- **Computability theory:** The halting problem proves undecidability — some
  questions about programs have no algorithmic answer. This limits static
  analysis, antivirus detection, and compiler optimisation.
- **Universal Turing Machine:** A TM that simulates any other TM — this is
  the theoretical model of a general-purpose computer.
- **AI limitations:** The halting problem implies no AI can predict all
  properties of arbitrary programs. Rice's theorem generalises this.
- **Game design:** Minecraft and some cellular automata are Turing-complete —
  you can build a computer inside the game.

## Check Your Understanding

1. Design a TM that accepts palindromes over $\{0, 1\}$. Describe the state
   transitions in words and trace it on "1001".
2. Explain why the halting problem proof is a diagonal argument, similar to
   Cantor's proof that the reals are uncountable.
3. Is it possible to write a program that detects all infinite loops in
   Python programs? Explain using the halting problem.
