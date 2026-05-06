---
strand: computation
level: advanced
order: 5
title: AES and Symmetric Ciphers
prerequisites:
  - tier: strand-7-computation-advanced
    slug: 04-elliptic-curves
    description: Elliptic-curve cryptography
connections:
  - strand-7-computation-advanced/06-probabilistic-data-structures
applications:
  - cs: "Disk encryption, VPN, TLS data channels"
  - life: "How files and traffic actually get encrypted"
---

# AES and Symmetric Ciphers

## Explain Like I Am 7

You and your best friend share one secret password.  To send a note,
you scribble each letter through a *gigantic* mixer that swaps
letters, shuffles them around the page, and stirs them again — over
and over, ten or so rounds.  When your friend gets the scrambled note,
they reverse every step using the same password and the original
message pops out.  Anyone snooping just sees alphabet soup.  **AES**
is exactly this kind of fast, password-shared mixer, and it's what
locks your phone and Wi-Fi.

## Mental

**Symmetric** ciphers use the same key for encryption and decryption.
They are *much* faster than public-key crypto: AES throughput is
~1 GB/s/core, RSA decryption ~1000 ops/s.

In practice: **hybrid encryption**. Use ECDH/RSA to agree on a small
symmetric key, then AES for bulk data.

## AES (Rijndael, 2001)

Block cipher: encrypts 128-bit blocks with 128, 192, or 256-bit keys.
Standard for everything from disk encryption to TLS.

State: $4 \times 4$ byte matrix (16 bytes = 128 bits). Each byte in
$\mathbb{F}_{256}$ (Strand 2 Advanced Lesson 03).

**Round structure** (10 rounds for AES-128):

1. **SubBytes** — apply S-box to each byte.
2. **ShiftRows** — cyclically shift each row.
3. **MixColumns** — multiply each column by a fixed $\mathbb{F}_{256}$
   matrix.
4. **AddRoundKey** — XOR with the round key.

The S-box is a polynomial inversion in $\mathbb{F}_{256}$ followed by
an affine map — designed for non-linearity.

## Modes of operation

A block cipher encrypts only one block. To encrypt longer messages,
use a **mode**:

| Mode | Description | Pros / cons |
|---|---|---|
| ECB | Encrypt each block independently | Insecure — patterns leak |
| CBC | XOR previous ciphertext with next plaintext | Sequential; padding oracles |
| CTR | XOR plaintext with $E(K, \text{counter})$ | Parallelisable; needs unique nonces |
| GCM | CTR + Galois MAC | Authenticated encryption (AE) |

**Always use authenticated modes** (GCM, ChaCha20-Poly1305) in modern
deployments.

## Worked example: AES-128 round counts

| AES variant | Key bits | Rounds |
|---|---|---|
| AES-128 | 128 | 10 |
| AES-192 | 192 | 12 |
| AES-256 | 256 | 14 |

The cube-root growth in rounds keeps security balanced with
performance.

## Interactive

:::widget type=numeric-input prompt="AES block size: $128$ bits. Type 128." answer=128 explain="$128$.":::

:::widget type=numeric-input prompt="AES-256 has 14 rounds. Type 14." answer=14 explain="$14$.":::

:::widget type=numeric-input prompt="Symmetric crypto is *much faster* than public-key. Type 1." answer=1 explain="Yes — typically ~10⁵× faster.":::

:::widget type=numeric-input prompt="ECB mode is insecure due to repeating blocks. Type 1." answer=1 explain="Yes.":::

## Symbolic

**Linear and differential cryptanalysis**: the two main analytic
attack frameworks. AES's design parameters were chosen to resist both
with healthy margins.

**Side-channel attacks**:

- **Cache-timing** — different S-box accesses produce timing
  variations leaking key bits.
- **Power analysis** — power consumption correlates with intermediate
  values.

Defenses: **constant-time** implementations (no data-dependent
branches), masking, AES-NI hardware (CPU instructions for AES that
run in fixed time).

**ChaCha20** (Bernstein): stream cipher used by Signal, WireGuard,
Linux kernel CSPRNG, modern TLS. Built from ARX (add-rotate-xor)
primitives — naturally constant-time.

## Computational

```python
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
import os

# AES-256 in CBC mode
key = os.urandom(32)            # 256-bit key
iv = os.urandom(16)             # 128-bit IV
plaintext = b"This is a secret message that needs to be longer than one block."

# Pad plaintext to multiple of 16 bytes
padder = padding.PKCS7(128).padder()
padded = padder.update(plaintext) + padder.finalize()

# Encrypt
cipher = Cipher(algorithms.AES(key), modes.CBC(iv))
encryptor = cipher.encryptor()
ciphertext = encryptor.update(padded) + encryptor.finalize()
print(ciphertext.hex())

# Decrypt
decryptor = cipher.decryptor()
decrypted_padded = decryptor.update(ciphertext) + decryptor.finalize()
unpadder = padding.PKCS7(128).unpadder()
decrypted = unpadder.update(decrypted_padded) + unpadder.finalize()
print(decrypted)                # original

# AES-GCM (authenticated)
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
key = AESGCM.generate_key(256)
aesgcm = AESGCM(key)
nonce = os.urandom(12)
ct = aesgcm.encrypt(nonce, plaintext, b"associated data")
pt = aesgcm.decrypt(nonce, ct, b"associated data")
print(pt)                       # original
```

## Applied

- **Disk encryption** — BitLocker, FileVault, LUKS use AES-XTS for
  random-access disk crypto.
- **TLS data channel** — once the handshake completes, AES-GCM (or
  ChaCha20-Poly1305 on mobile) encrypts the bulk traffic.
- **VPN** — IPsec, WireGuard.
- **Database encryption** — at-rest encryption using AES.
- **Hardware** — AES-NI (Intel) and ARMv8 Crypto extensions provide
  hardware AES at ~1 cycle/byte.

## Check Your Understanding

:::widget type=numeric-input prompt="AES block size: 128 bits. Type 128." answer=128 explain="$128$.":::

:::widget type=numeric-input prompt="Authenticated encryption (GCM, ChaCha20-Poly1305) is preferred. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Hybrid encryption: public-key for key agreement, symmetric for data. Type 1." answer=1 explain="Yes.":::

:::widget type=numeric-input prompt="Constant-time implementation defends against timing side-channels. Type 1." answer=1 explain="Yes.":::
