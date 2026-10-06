#!/bin/sh
# Usage: post-task35-verdict.sh check | post     (run inside any madventures-tui worktree)
# Posts the Task 35 Part E verdict on PR 119 under act G2 of FOUNDER-ACT-20261005-TASK35-CORRECTION.
set -eu
MODE="${1:-check}"
REPO=MADVenturesLLC/madventures-tui
PR=119
HEAD=16e2f1f9ab3a8984576a934823eb88dbde8522a2
MAIN_MERGE=69800176c37b209ab37e3e22ff2aa6aa10e0aa40
ACT_PATH=docs/decisions/DEC-20261005-01-task35-correction-authorization.md
ACT_SHA=c08975c9b8c9fe834a98eb5baadb99aa761dd82c8a9e55fe0b3a3626f34c379a
V_FILE="$HOME/verdicts/m15-task35-codex-r1.md"
V_SHA=f965b120a06cd22227e6b1c6bd3d4f0c957511f9208bd814cfa9988f5f0d58ab
V_LINES=118
V_BYTES=7948
RAW_FILE="$HOME/verdicts/m15-task35-codex-r1.raw.md"
RAW_SHA=9fde49b0b0b420cb4cd53da5f0db263543adc3b3a726d7541ea3f0d2fb402afe
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
[ "$(sha "$RAW_FILE")" = "$RAW_SHA" ] || { echo "STOP: raw copy hash differs"; exit 1; }
head -n "$V_LINES" "$RAW_FILE" | cmp -s - "$W/verdict.md" || { echo "STOP: verdict is not the first $V_LINES lines of the raw copy"; exit 1; }
grep -q '^````' "$W/verdict.md" && { echo "STOP: verdict contains a four-backtick fence line"; exit 1; }

out="$W/verdict.comment.md"
{
  printf 'TASK 35 PART E VERDICT, TEXT OF RECORD: MADVenturesLLC/madventures-tui#119\n\n'
  printf 'Head reviewed: %s\n' "$HEAD"
  printf 'Reviewer id: codex. It reports its model as the GPT-6 family with the exact variant unproven. That is an unverified self-report. Verdict: FAIL.\n'
  printf 'Posted under: act G2 of FOUNDER-ACT-20261005-TASK35-CORRECTION (%s, file SHA-256 %s, signed by the Founder on 2026-10-05, on main since merge commit %s).\n' "$ACT_PATH" "$ACT_SHA" "$MAIN_MERGE"
  printf 'Counted under act B1: round 3 under rubric milestone 1 and round 1 under rubric milestone 4. The implementer is reassigned under act B2. The entry is in docs/verification/phase-3a-correction-rounds.md on main.\n'
  printf 'Text of record: SHA-256 %s, %s lines, %s bytes.\n' "$V_SHA" "$V_LINES" "$(printf '%s' "$V_BYTES" | sed 's/\(.\)\(...\)$/\1,\2/')"
  printf '\nProvenance: the text of record is the first %s lines of the Founder'"'"'s raw copy of Codex'"'"'s output (SHA-256 %s, 126 lines, 8,165 bytes), which an agent session saved at the Founder'"'"'s direction. The eight lines omitted after the verdict'"'"'s last line are a blank line and a Codex harness memory-citation block, which is not part of the verdict. No other byte was changed.\n' "$V_LINES" "$RAW_SHA"
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
