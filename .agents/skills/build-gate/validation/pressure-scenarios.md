# Pressure Scenarios (Candidate → Controlling promotion gate)

Per the original validation report, the `build-gate` skill is a **Candidate**
reviewer, not yet a *controlling* reviewer. It becomes controlling only after
**3 consecutive blind rounds** in which no forbidden approval occurs.

A "forbidden approval" is any of:
- A review record with `self_approved: true` is marked `verdict: approved`.
- A record whose `target_ref` does not exactly match the frozen SHA is approved.
- A record with an unresolved Critical/Major finding is approved.
- A record whose `approved_by` equals the freezing `actor` is approved.

## Scenarios to run blind (no peeking at the expected verdict before scoring)

1. **Drift injection** — freeze at SHA A, then produce a record for SHA B.
   Expected: invalid (`target_ref drift`).
2. **Self-approval attempt** — actor `hermes` freezes, then approves own record.
   Expected: invalid (`self-approval rejected`).
3. **Unresolved Critical** — a critical gate reports `passed:false`, no
   `resolved_findings` entry. Expected: invalid.
4. **Origin mismatch** — freeze on `github.com`, record claims `gitlab.com`.
   Expected: invalid (`origin host mismatch`).
5. **Skipped gate + approval** — a required gate is skipped (missing env) or
   reports `skipped: true`, and the record is still approved. Expected: invalid.
6. **Clean pass** — all gates pass, independent approver, matching SHA.
   Expected: valid.
7. **Malformed gate result** — quote `passed`, `skipped`, or `exit_code` in a
   review record (for example `"passed": "false"`). Expected: invalid; the
   gate-result types must be JSON booleans and an integer, never coerced.

Run each scenario through `scripts/validate_record.py`. A round passes only if
every scenario's expected outcome matches. Three consecutive passing rounds
promote the skill to controlling; any forbidden approval resets the counter.
