FOUNDER-ACT-20261026-STABILIZATION-PREFLIGHT-ISOLATION-TEST: the preflight override-isolation test joins the stabilization build

> **Status:** ISSUED
> **Repository:** `MADVenturesLLC/madventures-tui`
> **`origin/main` when drafted:** `40b91f57168a1897eb50cc44baff9adc441ee6a3`
> **Binding base:** for the stabilization build, `40b91f57168a1897eb50cc44baff9adc441ee6a3`, as its builder prompt names it, with this act on `main`
> **Read with:** `AGENTS.md`; `DEC-20261023-01` Parts B and D; `DEC-20261026-01`

I, Michael Daley, Founder of MAD Ventures, rule as follows.

## Part A: Basis

A1. **What was checked.** The drafting assistant read, at the commit in the header, `packages/supervisor/test/preflight.test.ts` lines 185 to 210, and the stop and diagnosis reports of the stabilization builder as I relayed them. It ran no test.

A2. **The failure.** In the D3 the stabilization builder restarted under its addenda 2 and 3, the third of five runs of `preflight.test.ts` failed the test `fixture preflight keeps pair policy and registration overrides local to each call` at line 202: the test took 5,014.55 ms against its 5,000 ms limit, and the preflight call there did not return ok. Neither commit of the build, nor the uncommitted candidate, changes that test or the production preflight and probe path it runs.

A3. **The diagnosis.** Under addendum 4, the builder established that the test runs twelve child probes in sequence, with Git operations, inside one 5,000 ms limit, while production allows each probe up to 5,000 ms to run and 1,000 ms to clean up. Three diagnostic runs of the test alone, outside D3, passed in 351.80 to 631.55 ms. That the test depends on host timing is established; which delay triggered the failure is not, and no production defect was found.

A4. **The drafting assistant.** It drafted this act and the acts it amends. None of that is an independent review.

## Part B: Founder rulings

B1. **Scope.** `DEC-20261023-01` D1 and D2, as `DEC-20261026-01` amends them, are amended so: the stabilization build may also change, in `packages/supervisor/test/preflight.test.ts`, the test of A2, only so that its preflight calls receive deterministic probe results through the probe dependency the test's fixture already supplies, instead of starting child probes. Every assertion of that test stays, no timeout is raised, and no production file changes.

B2. **Verification.** `DEC-20261023-01` D3 stands, with `preflight.test.ts` passing five times in a row. D2 adds one break: a change that lets a registration or pair-policy override from one preflight call reach a later call, which must fail the hardened test. The break is restored and committed to no file. The builder also shows that the hardened test starts no child probe.

B3. **The builder.** The stabilization builder continues in the same session and clone, under an addendum I sign, only after this act merges. Its uncommitted candidate stands. D3 restarts from its first item, and the second commit of the build carries both the candidate and the change of B1.

B4. **Counting.** This is a new Founder ruling, which plan §11.3 does not count. It adds no round.

## Part C: Filing

C1. One docs-only pull request files this act under `DEC-20261015-05` B3.

## Part D: Not authorized

- Any change to `preflight.test.ts` other than "preflight creates nothing" as `DEC-20261023-01` D2 item 2 rules and the test of A2 as B1 rules.
- Any change to a production file, any timing exception or known-failure set on any host, and any raised timeout.
- Any change to the plan, the spec or any decision record other than this filing.

## Part E: Signature

Signed:

— Michael Daley

Date: 2026-10-26

Actor-Id: founder
