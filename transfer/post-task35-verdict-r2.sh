#!/bin/sh
# Usage: post-task35-verdict.sh check | post     (run inside any madventures-tui worktree)
# Posts the Task 35 re-review verdict on PR 119 under act G2 of FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION.
set -eu
MODE="${1:-check}"
REPO=MADVenturesLLC/madventures-tui
PR=119
HEAD=0528f788142e107a436266cf42005a1bf50f9bc7
MAIN_MERGE=80a8b34f99cdc783e6d946337d4fff6d26091036
ACT_PATH=docs/decisions/DEC-20261007-01-task35-second-correction-authorization.md
ACT_SHA=2f51def55ee9313afb12aa9768efc62ef3a76c969784ccb42ad4f7f41690232b
V_FILE="$HOME/verdicts/m15-task35-codex-r2.md"
V_SHA=d28d8fd1a2fa00afcd06ad5cc8afa1464815f7345b062021c8391243c7d3e4b1
V_LINES=192
V_BYTES=12101
FENCE='````'
sha() { if command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1" | cut -d' ' -f1; else sha256sum "$1" | cut -d' ' -f1; fi; }
W=$(mktemp -d "${TMPDIR:-/tmp}/t35post.XXXXXX")

git fetch -q origin main
git merge-base --is-ancestor "$MAIN_MERGE" origin/main || { echo "STOP: origin/main does not contain $MAIN_MERGE"; exit 1; }
git show "origin/main:$ACT_PATH" > "$W/act.md"
[ "$(sha "$W/act.md")" = "$ACT_SHA" ] || { echo "STOP: act on main differs from $ACT_SHA"; exit 1; }
cp "$V_FILE" "$W/verdict.md"
[ "$(sha "$W/verdict.md")" = "$V_SHA" ] || { echo "STOP: verdict hash differs"; exit 1; }
[ "$(wc -l < "$W/verdict.md" | tr -d ' ')" = "$V_LINES" ] || { echo "STOP: verdict line count differs"; exit 1; }
[ "$(wc -c < "$W/verdict.md" | tr -d ' ')" = "$V_BYTES" ] || { echo "STOP: verdict byte count differs"; exit 1; }
grep -q '^````' "$W/verdict.md" && { echo "STOP: verdict contains a four-backtick fence line"; exit 1; }

out="$W/verdict.comment.md"
{
  printf 'TASK 35 RE-REVIEW VERDICT, TEXT OF RECORD: MADVenturesLLC/madventures-tui#119\n\n'
  printf 'Head reviewed: %s\n' "$HEAD"
  printf 'Reviewer id: codex, in a session given no earlier Task 35 packet. It reports its model as the GPT-6 family with the exact variant unproven. That is an unverified self-report. Verdict: FAIL.\n'
  printf 'Posted under: act G2 of FOUNDER-ACT-20261007-TASK35-SECOND-CORRECTION, version 3 (%s, file SHA-256 %s, signed by the Founder on 2026-10-07, on main since merge commit %s).\n' "$ACT_PATH" "$ACT_SHA" "$MAIN_MERGE"
  printf 'Counted under act B1: round 4 under rubric milestone 1 and round 2 under rubric milestone 4. The implementer is reassigned under act B2, and act B4 records the technical assessment. The entry is in docs/verification/phase-3a-correction-rounds.md on main.\n'
  printf 'Text of record: SHA-256 %s, %s lines, %s bytes.\n' "$V_SHA" "$V_LINES" "$(printf '%s' "$V_BYTES" | sed 's/\(.\)\(...\)$/\1,\2/')"
  printf '\nProvenance: the Codex application withheld one of the reviewer'"'"'s messages under a safety filter. At the Founder'"'"'s request the reviewer restated the complete verdict, with its last step done and without code. That restatement, as the Founder saved it, is the text of record (act A1).\n'
  printf '\nThe block below is the file, line for line. The file ends with one newline after its last line.\n\n'
  printf '%s\n' "$FENCE"
  cat "$W/verdict.md"
  printf '%s\n' "$FENCE"
} > "$out"
extracted="$W/verdict.extracted"
awk -v f="$FENCE" 'go&&$0==f{exit} go{print} !go&&$0==f{go=1}' "$out" > "$extracted"
[ "$(sha "$extracted")" = "$V_SHA" ] || { echo "STOP: extracted block hash differs"; exit 1; }
if grep -qE '^-{3,}$' "$out"; then echo "STOP: bare hyphen line in the comment"; exit 1; fi
echo "verdict comment: $out ($(wc -c < "$out" | tr -d ' ') bytes, SHA-256 $(sha "$out")), block hash verified"

if [ "$MODE" != post ]; then
  echo "CHECK ONLY. Nothing posted. Read $out, then run: sh $0 post"
  exit 0
fi
who=$(env -u GH_TOKEN gh api user --jq .login)
[ "$who" = decivantiq ] || { echo "STOP: gh identity is $who, not decivantiq"; exit 1; }
st=$(env -u GH_TOKEN gh pr view "$PR" --repo "$REPO" --json headRefOid,isDraft,state --jq '.headRefOid + " " + (.isDraft|tostring) + " " + .state')
[ "$st" = "$HEAD true OPEN" ] || { echo "STOP: PR $PR is '$st', expected '$HEAD true OPEN'"; exit 1; }
if env -u GH_TOKEN gh api "repos/$REPO/issues/$PR/comments" --paginate --jq '.[].body' | grep -q "$V_SHA"; then echo "STOP: a comment with $V_SHA already exists on #$PR"; exit 1; fi
env -u GH_TOKEN gh pr comment "$PR" --repo "$REPO" --body-file "$out"
