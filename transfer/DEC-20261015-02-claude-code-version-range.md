FOUNDER-ACT-20261015-CLAUDE-CODE-VERSION-RANGE: Claude Code kept current by automatic updates, within a supported range from 2.1.296 to below 3.0.0

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `cb240e69c930d97924de101e3049a3578a637252`
> **Amends:** `DEC-20261013-05` (SHA-256 `314b3fc57e7f6d8ff2ebf281429760a7461729c01d3aa2e0e4465b513795431e`), B1 and B2; `DEC-20261015-01` B8, as to filing only
> **Read with:** `PLAN-OPEN-1` (SHA-256 `d40682beb5a5c3f617638b1775f3777e25c66e12787b9269141164dcc3d9bc42`); `PLAN-OPEN-2` (SHA-256 `b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c`); `DEC-20261013-01` B3 and B8; `DEC-20261014-03` B4

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **The rule today.** `DEC-20261013-05` B1 makes the Claude Code registration support exactly Claude Code 2.1.296, and its B2 has me turn off automatic updates of the governed launcher and makes a host found on an unsupported version a stop for my ruling. `PLAN-OPEN-1` fails closed on an unsupported CLI version, and Task 45 checks the version that the identity probe's `system/init` event reports against the registration's `supported_versions`.

A2. **What was found.** On 2026-10-15 I ran the host-facts script with SHA-256 `66d59038910476695e3fa90cebda77043ae34f83707a08dbccd5482167b4602e`, from transfer commit `62ce749bb01097a400903f6637026044b044e084`, on the Ubuntu PC. Its report, SHA-256 `89cea7de3c1bc0103ea167354baabbcffe8a5aa3670ad4feaa68ac9d961f6154`, shows `madbridge-claude-v5` in `~/.local/bin` reporting version 2.1.299; `XDG_RUNTIME_DIR` meeting all five `TMPDIR` rules of `PLAN-OPEN-2`; `.credentials.json` inside `~/.claude-madventures-v5`, owned by the installation user with mode `0600`; the four predicate fields of `auth status` with exactly the values `PLAN-OPEN-2` requires; a `system/init` event carrying the model `claude-opus-5-5` and the CLI version 2.1.299; and `~/.local/bin` owned by the installation user and not group- or world-writable. The launcher appears to have updated itself. Under `DEC-20261013-05` B2 that is a stop for my ruling, and this act is that ruling.

A3. **What I want.** I want the governed launcher to stay on the most recent Claude Code release, updated automatically, without an act for each release.

A4. **What stays checked.** Every preflight runs both probes. The auth-readiness probe requires the four predicate fields with exact values, and the identity probe requires `system/init` to report exactly the model the envelope names. A missing field, an unparseable reply or a mismatch fails closed. Those checks do not cover every behavior a new release may change, such as which settings sources it reads or which environment variables it honors. A release in the range of B1 can therefore reach a governed session without anyone having reviewed it. I accept that risk for releases below 3.0.0, and I keep a new major release behind an act.

A5. **What runs live today.** Nothing in Phase 3A launches a governed Claude Code session yet, and `DEC-20261014-03` B4 makes the `reattest` step fail closed for every real surface. The difference of A2 blocks no authorized work.

A6. **The drafting assistant.** It drafted this act and the script and read the report summary I pasted. It ran nothing on either host. None of that is an independent review.

## Part B: Founder rulings

B1. **The supported range.** The Claude Code registration supports every release whose version is three dot-separated decimal integers, at least 2.1.296 and below 3.0.0, compared numerically part by part. A version with any other form, including a pre-release or build suffix, is unsupported. This replaces the exact version of `DEC-20261013-05` B1. The Antigravity registration does not change.

B2. **Automatic updates.** I may leave automatic updates of the governed launcher on, on both certification hosts. This replaces `DEC-20261013-05` B2. A host found on a version outside the range of B1 is a stop for my ruling. Raising the lower bound, or supporting 3.0.0 or later, needs a Founder act that cites host evidence for that version.

B3. **The finding of A2.** Version 2.1.299 lies in the range of B1, and the other facts of A2 show no difference from `PLAN-OPEN-2`. It is not a stop for Task 45, for Task 46, or for the result `DEC-20261013-05` B3 gave for `DEC-20261013-01` B8. The `~/.local/bin` condition of that B3 is met on the Ubuntu PC by the report of A2.

B4. **Until the code follows.** The registry, the plan's registration interface, `PLAN-OPEN-1` and the Task 45 version check still name exact versions. Until a later change implements B1, they stay as they are, a real Claude Code release other than 2.1.296 fails closed there, and `PLAN-OPEN-1`'s `supported_versions` row is read with B1. No test or builder may treat that difference as a defect of Task 45 or Task 46.

B5. **The implementing change.** After the Task 45 pull request merges, a separate Founder act authorizes the change that implements B1: how the range is represented in the registration and in the plan's interface, the version check of the attestation parser, their tests, `PLAN-OPEN-1`'s table, and the matching revision of the approval record. That act names its builder and reviewer. This act authorizes none of that work.

B6. **Filing.** One docs-only pull request files this act. It may also file `DEC-20261015-01`, and `DEC-20261015-01` B8 is read to allow that. It changes nothing else and merges before pull request 151 leaves draft.

B7. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round. Rubric milestone 1 stays at **5**, rubric milestone 4 at **3**, and rubric milestone 6 at **0**.

## Part C: Not authorized

- Any change to code, a test, a workflow, the plan, a spec, `PLAN-OPEN-1`, `PLAN-OPEN-2` or the approval record before the act of B5.
- Any live governed session, and any installation, update or sign-in by an agent on any host.
- Supporting Claude Code 3.0.0 or later.

## Part D: Signature

Signed:

— Michael Daley

Date: 2026-10-15

Actor-Id: founder
