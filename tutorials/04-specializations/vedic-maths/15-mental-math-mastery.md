# Mental Math Mastery — Combining All Techniques

## Intuition

This capstone lesson brings together all 14 previous techniques into a unified
mental calculation system. The key challenge is no longer knowing the
techniques — it's knowing WHICH technique to apply for a given problem. Like
a chess grandmaster who instantly recognises patterns, a mental math expert
scans a problem and selects the optimal approach in milliseconds. This lesson
teaches that meta-skill: problem recognition and technique selection.

## Prerequisites

- All previous lessons in this module (Lessons 1-14)
- Foundation 1, Lessons 1-5 (core algebra)

## The Sutra

> **यथा शिखा मयूराणां, नागानां मणयो यथा ।**
> **तद्वद्वेदाङ्गशास्त्राणां, गणितं मूर्ध्नि वर्तते ॥**

"As the crest of the peacock, as the gem on the serpent's head, so is
mathematics at the top of all sciences."

— From Vedanga Jyotisha

This capstone embodies the Vedic approach: mathematics is not drudgery but
an art of elegant shortcuts and deep patterns.

## From First Principles

### The Technique Selection Framework

**Decision Tree for Multiplication**:

```
MULTIPLICATION: a × b
│
├─ Are both numbers near a base (power of 10)?
│  ├─ Both below base → Nikhilam (Lesson 1)
│  ├─ Both above base → Nikhilam surplus method
│  └─ One above, one below → Nikhilam mixed
│
├─ Is one number all 9s? (e.g., ×99, ×999)
│  └─ Use: n × 99 = n×100 - n (Anurupyena, Lesson 4)
│
├─ Can you factor one number into easy parts?
│  └─ Anurupyena: e.g., 35×24 = 70×12 (Lesson 4)
│
├─ Are the numbers "complementary" (sum to power of 10)?
│  └─ 37×63 = (50-13)(50+13) = 2500-169 (Diff of squares, Lesson 10)
│
├─ Does one number end in 5 (squaring)?
│  └─ Ekadhikena for squares ending in 5 (Lesson 3)
│
└─ General case → Urdhva-Tiryak crosswise (Lesson 2)
    └─ Consider Vinculum form if digits > 5 (Lesson 7)
```

**Decision Tree for Division**:

```
DIVISION: a ÷ b
│
├─ Is divisor near a power of 10?
│  └─ Nikhilam complement or Anurupyena scaling
│
├─ Does divisor start with 1?
│  └─ Paravartya (Lesson 5)
│
├─ Quick divisibility check first?
│  └─ Digital roots / Osculator (Lesson 9)
│
└─ General → Long division with Vinculum simplification
```

**Decision Tree for Squaring**:

```
SQUARING: n²
│
├─ Ends in 5? → Ekadhikena (instant: a×(a+1)|25)
├─ Near 50? → (50+d)² = 100(25+d) + d²
├─ Near 100? → (100-d)² = 100(100-2d) + d²
├�� Near any power of 10? → Yavadunam identity (Lesson 10)
├─ Two digits, no special form? → Duplex method (Lesson 8)
└─ Large number? → Break into (a+b)² identity
```

### Worked Examples: Choosing the Right Technique

**Problem 1: 996 × 997**

Recognition: Both near 1000. → **Nikhilam**.
- Deficiencies: 4, 3.
- Cross-subtract: 996-3 = 993.
- Multiply deficiencies: 4×3 = 012.
- Answer: **993012**.

Time: ~2 seconds.

---

**Problem 2: 73 × 77**

Recognition: Average is 75, difference is 4. → **Difference of squares**.
$(75-2)(75+2) = 75^2 - 4 = 5625 - 4 = 5621$.

But wait: $75^2$ by Ekadhikena = 7×8|25 = 5625. Then subtract 4.
Answer: **5621**.

Time: ~3 seconds.

---

**Problem 3: 48 × 52**

Recognition: Numbers straddle 50, difference = 4. → **Difference of squares**.
$(50-2)(50+2) = 2500 - 4 = 2496$.

Answer: **2496**.

Time: ~2 seconds.

---

**Problem 4: 67²**

Recognition: Not ending in 5, not near 50 or 100 cleanly. Near 70.
→ **Yavadunam**: $(70-3)^2 = 4900 - 420 + 9 = 4489$.

Or **Duplex**: D(7)=49, D(67)=84, D(6)=36.
Columns: 9 (carry 4), 84+4=88 (carry 8, digit 8), 36+8=44.
Result: 4489.

Answer: **4489**.

---

**Problem 5: 888 × 112**

Recognition: 888 = 1000 - 112. So $888 × 112 = (1000-112) × 112 = 112000 - 112^2$.
$112^2$: By identity $(110+2)^2 = 12100 + 440 + 4 = 12544$.
$112000 - 12544 = 99456$.

Or: $888 × 112 = 888 × 112$. Note $112 = 100 + 12$. So $888×100 + 888×12 = 88800 + 10656 = 99456$.

Answer: **99456**.

---

**Problem 6: Is 3591 divisible by 7?**

→ **Osculator** (Lesson 9): multiply last digit by 5, add to rest.
$359 + 1×5 = 364$
$36 + 4×5 = 56 = 7×8$. Yes!

$3591 / 7 = 513$.

---

**Problem 7: 125 × 32**

Recognition: $125 = 1000/8$, $32 = 2^5$. So $125 × 32 = 125 × 32 = 4000$.
Or: double/halve: $250 × 16 = 500 × 8 = 1000 × 4 = 4000$.

→ **Anurupyena** (scaling by factors of 2).

Answer: **4000**.

---

**Problem 8: What day was 25 December 1995?**

→ **Calendrical** (Lesson 14):
Century (19xx) = 1, Year (95): 95 + 23 = 118, 118 mod 7 = 6.
Month (Dec) = 5, Day = 25.
Total: 1 + 6 + 5 + 25 = 37. 37 mod 7 = 2 → **Monday**.

### Timed Challenge Problems

Set a timer. Target times are given for each difficulty level.

**Level 1 — Under 5 seconds each**:
1. 98 × 97
2. 85²
3. 45 × 55
4. 995 × 996

**Level 2 — Under 10 seconds each**:
5. 67 × 73
6. 123²
7. 9999 × 9998
8. 56 × 125

**Level 3 — Under 15 seconds each**:
9. 456 × 544
10. 997²
11. Is 7429 divisible by 7?
12. 88 × 112

**Level 4 — Under 30 seconds each**:
13. Cube root of 389017
14. Day of the week: 4 July 1776
15. 1/19 (first 6 decimal digits)

### Visualisation

```python
import numpy as np
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Top-left: Decision flowchart (text-based)
ax = axes[0, 0]
ax.axis('off')
ax.set_title('Technique Selection Guide', fontsize=13, fontweight='bold')

guide = (
    "MULTIPLICATION:\n"
    "  Near base (10,100,1000)? → Nikhilam\n"
    "  Sum = round number? → Diff of Squares\n"
    "  Factor into easy parts? → Anurupyena\n"
    "  Large digits? → Vinculum first\n"
    "  General? → Urdhva-Tiryak\n"
    "\n"
    "SQUARING:\n"
    "  Ends in 5? → Ekadhikena (instant)\n"
    "  Near 50/100? → Special formulas\n"
    "  General? → Duplex or (a±b)²\n"
    "\n"
    "DIVISION:\n"
    "  Starts with 1? → Paravartya\n"
    "  Near power of 10? → Nikhilam/Anurupyena\n"
    "\n"
    "VERIFICATION:\n"
    "  Always use Digital Roots (mod 9)"
)
ax.text(0.05, 0.5, guide, transform=ax.transAxes, fontsize=10,
        family='monospace', va='center',
        bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.9))

# Top-right: Speed comparison bar chart
ax2 = axes[0, 1]
ax2.set_title('Speed Advantage: Vedic vs Conventional\n(operations for 2-digit × 2-digit)',
              fontsize=11, fontweight='bold')

techniques = ['Long\nMultiplication', 'Nikhilam\n(near base)', 'Diff of\nSquares',
              'Urdhva\n(general)', 'Anurupyena\n(scaling)']
conventional_ops = [8, 8, 8, 8, 8]  # ~4 multiplications + 4 additions
vedic_ops = [8, 3, 3, 3, 4]  # Much fewer mental steps

x = np.arange(len(techniques))
width = 0.35
ax2.bar(x - width/2, conventional_ops, width, label='Conventional', color='#FF5722', alpha=0.7)
ax2.bar(x + width/2, vedic_ops, width, label='Vedic', color='#2196F3', alpha=0.7)
ax2.set_xticks(x)
ax2.set_xticklabels(techniques, fontsize=9)
ax2.set_ylabel('Mental Operations')
ax2.legend()
ax2.grid(True, alpha=0.3, axis='y')

# Bottom-left: Progress tracker
ax3 = axes[1, 0]
ax3.set_title('Mastery Progression', fontsize=13, fontweight='bold')

lessons = [f'L{i}' for i in range(1, 16)]
mastery = np.random.uniform(0.5, 1.0, 15)  # simulated
mastery.sort()

colors = plt.cm.RdYlGn(mastery)
ax3.barh(range(15), mastery * 100, color=colors, edgecolor='black', alpha=0.8)
ax3.set_yticks(range(15))
ax3.set_yticklabels(['Nikhilam', 'Urdhva', 'Ekadhikena', 'Anurupyena',
                     'Paravartya', 'Shunyam', 'Vinculum', 'Duplex',
                     'Digital Roots', 'Yavadunam', 'Sim. Equations',
                     'Recurring Dec.', 'Cube Roots', 'Calendar', 'Mastery'],
                    fontsize=8)
ax3.set_xlabel('Mastery %')
ax3.set_xlim(0, 110)

# Bottom-right: Timing benchmark
ax4 = axes[1, 1]
ax4.set_title('Target Times by Difficulty', fontsize=13, fontweight='bold')

levels = ['Level 1\n(basic)', 'Level 2\n(intermediate)', 'Level 3\n(advanced)', 'Level 4\n(expert)']
target_times = [5, 10, 15, 30]
ax4.bar(levels, target_times, color=['#4CAF50', '#FFC107', '#FF9800', '#F44336'],
        edgecolor='black')
ax4.set_ylabel('Target Time (seconds)')
ax4.grid(True, alpha=0.3, axis='y')

for i, t in enumerate(target_times):
    ax4.text(i, t + 0.5, f'{t}s', ha='center', fontsize=12, fontweight='bold')

plt.tight_layout()
plt.savefig('mental_math_mastery.png', dpi=100, bbox_inches='tight')
plt.show()
```

## Python Verification

```python
# ── Mental Math Mastery: Combined Technique Verification ──
import time
import random

# Import all techniques as functions
def nikhilam(a, b):
    """Multiply near base."""
    base = 10 ** len(str(max(a, b)))
    d1, d2 = base - a, base - b
    left = a - d2
    right = d1 * d2
    return left * base + right

def diff_of_squares(a, b):
    """Product via (avg+d)(avg-d) = avg² - d²."""
    avg = (a + b) / 2
    d = (a - b) / 2
    return int(avg * avg - d * d)

def ekadhikena_sq(n):
    """Square ending in 5."""
    prev = n // 10
    return prev * (prev + 1) * 100 + 25

def duplex_square(n):
    """General squaring by duplex."""
    digits = [int(d) for d in str(n)]
    nd = len(digits)
    result_cols = []
    carry = 0
    for col in range(2*nd - 1):
        if col < nd:
            group = digits[nd - 1 - col:]
        else:
            group = digits[:2*nd - 1 - col]
        d = 0
        ng = len(group)
        for i in range(ng // 2):
            d += 2 * group[i] * group[ng-1-i]
        if ng % 2 == 1:
            d += group[ng//2] ** 2
        total = d + carry
        result_cols.append(total % 10)
        carry = total // 10
    while carry:
        result_cols.append(carry % 10)
        carry //= 10
    result_cols.reverse()
    return int(''.join(map(str, result_cols)))

def identity_square(n):
    """Square by algebraic identity."""
    base = round(n, -1) if n < 100 else round(n, -2)
    a, b = base, n - base
    return a*a + 2*a*b + b*b


# ── TIMED CHALLENGE ──────────────────────────────────────

print("MENTAL MATH MASTERY CHALLENGE")
print("=" * 55)
print("(Verify all answers and show which technique applies)\n")

challenges = [
    # (problem_description, computation, technique_name)
    ("98 × 97", lambda: nikhilam(98, 97), "Nikhilam", 98*97),
    ("85²", lambda: ekadhikena_sq(85), "Ekadhikena", 85**2),
    ("45 × 55", lambda: diff_of_squares(55, 45), "Diff of Squares", 45*55),
    ("995 × 996", lambda: nikhilam(995, 996), "Nikhilam", 995*996),
    ("67 × 73", lambda: diff_of_squares(73, 67), "Diff of Squares", 67*73),
    ("123²", lambda: duplex_square(123), "Duplex", 123**2),
    ("9999 × 9998", lambda: nikhilam(9999, 9998), "Nikhilam", 9999*9998),
    ("56 × 125", lambda: 56 * 125, "Anurupyena (56×125=7×1000)", 56*125),
    ("997²", lambda: identity_square(997), "Yavadunam (1000-3)²", 997**2),
    ("88 × 112", lambda: diff_of_squares(112, 88), "Diff of Squares (100±12)", 88*112),
]

all_correct = True
for desc, func, technique, expected in challenges:
    result = func()
    correct = (result == expected)
    all_correct &= correct
    status = "✓" if correct else "✗"
    print(f"  {status} {desc:<15} = {result:<12} [{technique}]")

print(f"\n  {'All correct!' if all_correct else 'Some errors detected.'}")

# Strategy selection demonstration
print("\n\n" + "=" * 55)
print("TECHNIQUE SELECTION ALGORITHM")
print("=" * 55)

def select_technique(a, b=None, operation='multiply'):
    """Recommend the best Vedic technique for a given problem."""
    if operation == 'square':
        n = a
        s = str(n)
        if s[-1] == '5':
            return "Ekadhikena (ends in 5)"
        elif abs(n - 50) <= 10:
            return "Near-50 formula"
        elif abs(n - 100) <= 10:
            return "Near-100 formula"
        elif abs(n - round(n, -1)) <= 3 or abs(n - round(n, -2)) <= 5:
            return "Yavadunam (algebraic identity)"
        else:
            return "Duplex method (general)"

    elif operation == 'multiply':
        base = 10 ** len(str(max(a, b)))
        # Check if near a base
        if abs(a - base) < base * 0.15 and abs(b - base) < base * 0.15:
            return "Nikhilam (both near base)"
        # Check if they straddle a round number
        avg = (a + b) / 2
        if avg == int(avg) and avg % 10 == 0:
            return "Difference of squares"
        if avg == int(avg) and avg % 5 == 0:
            return "Difference of squares"
        # Check for easy factoring
        for factor in [2, 4, 5, 8, 10, 25, 50]:
            if a % factor == 0 or b % factor == 0:
                return f"Anurupyena (factor out {factor})"
        return "Urdhva-Tiryak (general crosswise)"

# Demo the selector
print()
problems = [
    (97, 96, 'multiply'), (85, None, 'square'), (48, 52, 'multiply'),
    (67, 73, 'multiply'), (999, 998, 'multiply'), (123, None, 'square'),
    (35, 24, 'multiply'), (47, None, 'square'), (56, 125, 'multiply'),
]

for args in problems:
    if args[2] == 'square':
        technique = select_technique(args[0], operation='square')
        print(f"  {args[0]}²: → {technique}")
    else:
        technique = select_technique(args[0], args[1], operation='multiply')
        print(f"  {args[0]} × {args[1]}: → {technique}")

# Mixed practice generator
print("\n\n" + "=" * 55)
print("RANDOM PRACTICE GENERATOR")
print("=" * 55)

random.seed(2026)
print("\nGenerate 10 random problems with recommended technique:\n")

for i in range(10):
    problem_type = random.choice(['mult_near_base', 'square', 'mult_general', 'div'])

    if problem_type == 'mult_near_base':
        base = random.choice([100, 1000])
        a = base - random.randint(1, 12)
        b = base - random.randint(1, 12)
        technique = "Nikhilam"
        answer = a * b
        print(f"  {i+1}. {a} × {b} = ? [{technique}] → {answer}")

    elif problem_type == 'square':
        n = random.choice([25, 35, 45, 55, 65, 75, 85, 95,
                          47, 48, 52, 53, 96, 97, 98, 99,
                          123, 234, 999])
        technique = select_technique(n, operation='square')
        answer = n * n
        print(f"  {i+1}. {n}² = ? [{technique}] → {answer}")

    elif problem_type == 'mult_general':
        a = random.randint(20, 99)
        b = random.randint(20, 99)
        technique = select_technique(a, b, 'multiply')
        answer = a * b
        print(f"  {i+1}. {a} × {b} = ? [{technique}] → {answer}")

    else:  # division
        divisor = random.choice([7, 11, 13])
        quotient = random.randint(10, 99)
        dividend = divisor * quotient
        print(f"  {i+1}. {dividend} ÷ {divisor} = ? [Osculator check → divide] → {quotient}")
```

## Connection to CS / Games / AI / Business / Industry

- **Algorithm selection**: Just as we choose techniques based on problem
  structure, ML systems use meta-learning to select the best algorithm
  for a given dataset (Auto-ML).
- **Compiler optimisation**: Compilers use pattern matching to select
  optimal instruction sequences — replacing multiplication by constants
  with shift-add sequences (exactly like Anurupyena).
- **Heuristic search**: The decision tree for technique selection mirrors
  how game AI evaluates board positions — quick pattern recognition
  before deep calculation.
- **Interview preparation**: Mental math speed is tested in quantitative
  finance, consulting, and competitive programming interviews.
- **Estimation in ML**: Quick mental estimates of model sizes, parameter
  counts, and computational costs use these same techniques.

## Practice Problems

### Sprint Round (5 seconds each)
1. 99 × 98 = ?
2. 75² = ?
3. 104 × 96 = ?
4. 998 × 997 = ?
5. 55² = ?

### Speed Round (10 seconds each)
6. 67 × 63 = ?
7. 234² = ?
8. 48 × 125 = ?
9. 88 × 92 = ?
10. 996² = ?

### Challenge Round (15-30 seconds each)
11. Cube root of 389017 = ?
12. 1/7 (all 6 repeating digits) = ?
13. Day of week: 1 January 2030 = ?
14. 789 × 987 = ?
15. Is 2737 divisible by 7? If yes, what's the quotient?

### Ultimate Challenge
16. Square 9995 mentally.
17. Compute 1/29 (first 10 decimal digits).
18. What is 73^3?
19. Day of week: your birth date?
20. 888 × 889 = ?

**Answers**:
1. 9702  (Nikhilam: deficiencies 1,2; cross: 97; product: 02)
2. 5625  (Ekadhikena: 7×8=56, append 25)
3. 9984  (Diff of squares: 100²-4²=10000-16)
4. 995006  (Nikhilam: 998-3=995, 2×3=006)
5. 3025  (Ekadhikena: 5×6=30, append 25)
6. 4221  (Diff of squares: 65²-2²=4225-4)
7. 54756  (Duplex or (230+4)²=52900+1840+16)
8. 6000  (Anurupyena: 48/8×1000=6000)
9. 8096  (Diff of squares: 90²-2²=8100-4)
10. 992016  ((1000-4)²=1000000-8000+16)
11. 73  (last digit 7→3, 389 between 7³=343 and 8³=512, first=7)
12. 0.142857
13. Tuesday
14. 778,743  (Urdhva-Tiryak)
15. Yes: 2737/7=391 (osculator: 273+7×5=273+35=308→30+8×5=70=7×10 ✓)
16. 99900025  ((10000-5)²=10⁸-100000+25)
17. 0.0344827586
18. 389017
19. (verify with calendar)
20. 789432  (Nikhilam: base=1000; 888-111=777... actually (900-12)(900-11)=900×877+132=... better use Urdhva or note 888×889=888×(888+1)=888²+888. 888²=(900-12)²=810000-21600+144=788544. +888=789432)
