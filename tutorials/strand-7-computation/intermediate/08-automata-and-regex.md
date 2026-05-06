---
strand: computation
level: intermediate
order: 8
title: Automata and Regular Expressions
prerequisites:
  - tier: strand-7-computation-intermediate
    slug: 07-np-completeness
    description: NP-completeness
connections:
  - strand-7-computation-intermediate/09-computation-capstone-2
applications:
  - cs: "Lexers, regex engines, network packet inspection"
  - life: "The simplest universe of computation"
---

# Automata and Regular Expressions

## Explain Like I Am 7

Picture a board game with a few labelled rooms and arrows between
them.  You read your secret message one letter at a time, and each
letter tells your token which arrow to slide along.  When the message
ends, look at the room you're standing in: if it has a gold star, the
message is "accepted"; otherwise, "rejected."  This little rooms-and-
arrows machine is the simplest kind of computer — strong enough to
recognise patterns like "starts with A and ends with Z," but too dumb
to count past a small fixed amount.

## Mental

A **finite automaton (FA)** has finitely many states, reads input one
symbol at a time, and decides yes/no. It captures the **simplest**
computational model — strictly weaker than a Turing machine, but
fast and well-understood.

Two flavors:

- **DFA (deterministic FA)** — exactly one transition per (state,
  symbol).
- **NFA (nondeterministic FA)** — possibly multiple, including
  $\epsilon$ (no-input) transitions.

**Theorem**: every NFA can be simulated by an equivalent DFA via
the **subset construction** (with possibly exponential blow-up).
NFA and DFA recognise the same class of languages: **regular
languages**.

## Regular expressions

Regex syntax (basic):

| Pattern | Matches |
|---|---|
| $a$ | the single symbol $a$ |
| $rs$ | concatenation |
| $r \mid s$ | $r$ or $s$ |
| $r^*$ | zero or more $r$ |
| $r^+$ | one or more $r$ |

**Kleene's theorem**: a language is regular iff it is described by
a regex iff recognised by an NFA iff recognised by a DFA. Three
equivalent characterizations.

## Worked example: regex $a^* b$

NFA: state $q_0$ with self-loop on $a$, transition $a$ to itself,
transition on $b$ to accept state $q_1$.

DFA (also): same — happens to already be deterministic.

Strings accepted: $b, ab, aab, aaab, \ldots$

## What can't a DFA do?

DFAs cannot count. The language $\{a^n b^n : n \ge 0\}$ — equal
numbers of $a$s then $b$s — is **not regular**. Proof by **pumping
lemma**: any sufficiently long string in a regular language has a
*pumpable* substring; $a^n b^n$ doesn't.

Stronger machines exist: pushdown automata (context-free grammars),
linear-bounded automata (context-sensitive), Turing machines (all
of computation). The Chomsky hierarchy.

## Interactive

:::widget type=numeric-input prompt="A DFA is deterministic; an NFA may have multiple transitions per (state, symbol). Type 1 if true." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="The language $\\{a^n b^n\\}$ is regular? Type 1 yes, 0 no." answer=0 explain="No — not regular (pumping lemma).":::

:::widget type=numeric-input prompt="Number of states needed to recognise $a^* b$ as a DFA: minimal is $?$" answer=2 explain="$2$ — start (sees $a$s) and accept.":::

:::widget type=numeric-input prompt="Subset construction: NFA → DFA. Worst-case state explosion factor: $2^{?}$ (n NFA states)." answer=0 explain="$2^n$. Type 0 to indicate exponential.":::

## Symbolic

**Closure properties** of regular languages:

- Union, intersection, complement.
- Concatenation, Kleene star.
- Reversal.

These are *constructive* — you can build the new automaton from the
originals.

**DFA minimization**: every regular language has a unique minimum-state
DFA (up to renaming). Hopcroft's algorithm finds it in $O(n \log n)$.

**Pumping lemma for regular languages**: if $L$ is regular, there
exists a pumping length $p$ such that every $w \in L$ with $|w| \ge p$
can be split as $w = xyz$ with $|y| \ge 1$, $|xy| \le p$, and
$xy^k z \in L$ for all $k \ge 0$.

## Computational

```python
# Build a DFA: simple regex matcher for a*b
class DFA:
    def __init__(self, transitions, start, accept):
        self.t = transitions
        self.start = start
        self.accept = accept
    def accepts(self, s):
        state = self.start
        for c in s:
            if (state, c) not in self.t: return False
            state = self.t[(state, c)]
        return state in self.accept

# DFA for a*b
dfa = DFA(
    transitions={(0, 'a'): 0, (0, 'b'): 1},
    start=0,
    accept={1},
)
print(dfa.accepts("aaab"))   # True
print(dfa.accepts("ab"))     # True
print(dfa.accepts("b"))      # True
print(dfa.accepts("a"))      # False
print(dfa.accepts("ba"))     # False

# Python regex (Perl-compatible, more powerful than pure regular)
import re
print(re.fullmatch(r"a*b", "aaab"))    # match
print(re.fullmatch(r"a*b", "abb"))     # no match

# Tokenise an arithmetic expression
tokens = re.findall(r"\d+|[+\-*/()]", "(3 + 4) * 12")
print(tokens)                          # ['(', '3', '+', '4', ')', '*', '12']
```

## Applied

- **Lexical analysis** in compilers: source code is tokenised by a
  DFA generated from regular expressions per token kind. Tools:
  flex, ANTLR's lexer.
- **Network firewalls and intrusion detection** — packet payloads
  matched against regex sets. Aho-Corasick + DFA hybrids.
- **Search and replace in editors** (`grep`, `sed`).
- **Validation of structured input** — emails, URLs, phone
  numbers — matched by regex (with caveats: real RFC-822 emails are
  *not* regular; people use approximations).
- **Hardware DFA implementations** — line-rate regex matching in
  network appliances (Snort, Bro/Zeek).

## Check Your Understanding

:::widget type=numeric-input prompt="Regular languages are closed under union, intersection, complement. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="$\\{a^n b^n\\}$ is regular? Type 0 for no." answer=0 explain="No — context-free, not regular.":::

:::widget type=numeric-input prompt="Every regular language has a unique minimum DFA. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Pumping lemma proves a language is *not* regular by showing no pumping length works. Type 1." answer=1 explain="Yes.":::
