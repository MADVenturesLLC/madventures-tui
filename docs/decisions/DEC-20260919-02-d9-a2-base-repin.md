# Founder Decision D9-A2: base re-pin and test-count limb
> **Status: ISSUED**
> **Signed:** 2026-09-19 08:04AM EST by Michael Daley (`Actor-Id: founder`).
> **Amends:** D9 (`ISSUED-FOUNDER-D9-SNAPSHOT-SOURCES-a8ecdc8a.md`, sha256
> `55a8b16ae92cfba9aeea8cff65fb2b2117e30bbff1a0357723ef54b76927a44a`, signed
> 2026-09-19T01:16Z) at items 9 and 18; and corrects one characterisation in
> `DEC-20260919-01` (D9-A1, ISSUED 2026-09-19).
> **Why a separate instrument rather than an edit:** `DEC-20260919-01` is already
> ISSUED. Editing an issued instrument in place is the custody defect D9-A1 Part C1
> exists to correct, so the correction is made by amendment instead.
> **Repository:** `MADVenturesLLC/madventures-tui`
> **Banner repair:** header-only custody fix under Act GLM-20260919-D9-A2-BANNER-REPAIR;
> Parts A–E and signature unchanged.

---

Founder Decision D9-A2 — base re-pin and test-count limb

Repository: MADVenturesLLC/madventures-tui

I, Michael Daley, Founder of MAD Ventures and Founder OS, amend D9 as follows.

## Part A — Base re-pin (amends D9 item 18; corrects D9-A1's characterisation)

A1. **D9 item 18's base pin is amended** from
    `a8ecdc8a80559ca5e0ccfd169b65f653b0c7668c` to
    `ea079827a585f8fd6d628f5f65faaea03af6df99`
    (tree `e3d5f476872b47afd40a363d58d90f8daace1fca`). The B2 publication is
    authorized as one PR on a branch from that commit. D9's header line
    "Binding base at preparation" is historical and is not rewritten.

A2. **The re-pin is evidenced, not assumed.** `origin/main` advanced from
    `a8ecdc8a` to `ea079827` by PR 82, which changed only `apps/madbridge/**`,
    `packages/tui-chaos/**`, and `testdata/**`. **Every governing file D9 and
    D9-A1 pin is byte-identical at both commits**, independently recomputed:

    | File | sha256 at both `a8ecdc8a` and `ea079827` |
    |---|---|
    | `packages/broker/src/client.ts` | `4c48911ced583475c9ecedeef33b2fb674dab4ef33dfbbe393bfff5264f86735` |
    | `packages/broker/src/command-legality.ts` | `4efd1dfec7ad1c509ecff3ee8a94abb94062e4053d4419b89aa53115b55caaeb` |
    | `packages/broker/test/command-legality.test.ts` | `dacd913db302018206c6f4e7dc1904727f150959e8b283e10101cb221675a013` |
    | `docs/decisions/PLAN-OPEN-7-snapshot-projection-sources.md` | `6e63f7ac42dfe0d01d37c9be8c85c5902ce04602cbeca0f5726edafda4554eb6` |
    | `docs/decisions/PLAN-OPEN-approval-record.md` | `03d065e7df8f80e5bf5bf4edf59059eee7484112b546968e6fbef78571471aae` |
    | plan `2026-08-12-phase-3a-runtime-foundation.md` | `85b8c372162f523e5618869b581c8b3183c5ae403c67d874747a89618221656e` |
    | spec `2026-08-12-phase-3a-runtime-foundation-design.md` | `85b121dc3f1ecb2809b13df29340994c9afd0084afd47284a778b89d5ce87907` |

    No ruling in D9 or D9-A1 depends on anything PR 82 touched. The re-pin is
    administrative.

A3. **`DEC-20260919-01`'s base characterisation is corrected on the record.**
    That instrument states its binding base is "unchanged from D9 — `origin/main`
    = `ea079827…`". The base it names is correct and governs; the phrase
    "unchanged from D9" is not, because D9 as signed names `a8ecdc8a…`. Read
    `DEC-20260919-01`'s binding base as **re-pinned from D9's `a8ecdc8a…` to
    `ea079827…`**, on the evidence in A2. `DEC-20260919-01` is not edited; this
    clause is its correction of record.

## Part B — Test-count limb (amends D9 item 9)

B1. **D9 item 9's count limb is amended from 21/21 to 22/22.** Item 9 requires
    that Task 21's tests "stay 21/21 GREEN with `tsc` exit 0; if they do not,
    that is a **stop**, not a fix." D9-A1 adds exactly one test, so the file
    carries 22. The stop condition attaches to **22/22** at the B2 head.

B2. **What the limb protects is unchanged.** The original 21 tests must pass
    **unmodified in their assertions** — none added to, renamed, removed,
    reordered, or re-asserted. A regression in any of those 21 remains a stop,
    not a fix. The 22nd is the writer-only `executions: null` case D9-A1 Part A2
    names; it is RED at the base and GREEN only with the D9-A1 guard applied.

B3. **D9-A1's preamble is corrected to this extent only.** That instrument
    states D9's Part A items 1–11 are "not reopened, restated, or altered."
    That holds for items 1–8, 10 and 11, and for every substantive limb of
    item 9 — including that `pty_terminate` remains ungated, which
    `DEC-20260919-01` preserves as Option 1. It does **not** hold for item 9's
    count limb, which B1 amends. No other part of item 9 is touched.

## Part C — Superseded commission (recorded; retire before use)

C1. `m9/B2-d9-publication-2026-09-18.md` is **superseded and must not be
    pasted.** It is the pre-D9-A1 commission and is wrong in four ways against
    the current instruments: it pins base `a8ecdc8a` with a halt on any other
    `origin/main` (which now halts on sight); it cites the D9 instrument at
    sha256 `0597a118…`, the pre-correction hash; it lists
    `command-legality.ts` as **out of scope**, which D9-A1 requires changing;
    and it sets the gate at 21/21. Move it to `m9/superseded/`. The operative
    commission is the B2 builder prompt, once its placeholders are filled and
    D9-A1 is issued.

## Part D — Boundaries

D1. This amendment changes a base pin, a test count, and two characterisations
    on the record. It rules no new value, and it does **not** authorize Task 21b
    implementation (D10), Task 22, the M9 checkpoint, `snapshot.ts`, or any
    change to `runtime-broker.ts`, `ownership-machine.ts`, or the ledger.
D2. Merge of B2 remains a separate Founder act naming the exact head SHA, after
    independent review at that head, required checks green, and threads
    resolved.
D3. Stop conditions apply unmodified.
D4. The `mtui-b2-d9-snapshot-sources` worktree disposition recorded at
    `DEC-20260919-01` Part C1 stays open and is not ruled here.

## Part E — Signature

Signed:

— MICHAELDALEY

Date: 2026-09-19 08:04AM EST

Actor-Id: founder
