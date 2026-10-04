#!/bin/sh
# Usage: post-c2-texts.sh check | post     (run inside any madventures-tui worktree)
set -eu
MODE="${1:-check}"
REPO=MADVenturesLLC/madventures-tui
HEAD=f6cecd671810e4f68e2760abfc3d3a8758e5e8eb
ACT_SHA=a3eae0f4e7a595ef39d5e3bb1aa09497874a3cc5963ec4361502ecf2bcd4c357
REQ_SHA=a764418d6680cad979ed432cd6691bbe9529548b10fdce306caf0b26ecd7b138
V_COMMIT=349fe0347b5324ef6fbf0c738053ed5924acdf3e
V_PATH=transfer/m14-c2-rereview-gemini-antigravity.txt
V_SHA=68c8e1fbb73f2d6595e8eccb0c91022ee1b2258914a020771fde6f5f15f2a21c
A_COMMIT=ba6d16ad9ccd31c419e2b68dd3a3301b12d43ab4
A_PATH=transfer/m14-c2-rereview-gemini-antigravity-addendum.txt
A_SHA=76c908807ecc729f90edb3723c1317ff3771b237cd1f16d6117d528453ff3e26
FENCE='```'
sha() { if command -v shasum >/dev/null 2>&1; then shasum -a 256 "$1" | cut -d' ' -f1; else sha256sum "$1" | cut -d' ' -f1; fi; }
W=$(mktemp -d "${TMPDIR:-/tmp}/c2post.XXXXXX")
git fetch -q origin claude/awesome-cray-vqrzbt
git show "$V_COMMIT:$V_PATH" > "$W/verdict.txt"
git show "$A_COMMIT:$A_PATH" > "$W/addendum.txt"
[ "$(sha "$W/verdict.txt")" = "$V_SHA" ] || { echo "STOP: verdict hash differs"; exit 1; }
[ "$(sha "$W/addendum.txt")" = "$A_SHA" ] || { echo "STOP: addendum hash differs"; exit 1; }
grep -q "$FENCE" "$W/verdict.txt" "$W/addendum.txt" && { echo "STOP: text contains a code fence"; exit 1; }

common() {
  printf 'Head reviewed: %s\n' "$HEAD"
  printf 'Reviewer id: gemini-antigravity. Final verdict: PASS, accepted as PASS-WITH-ADVISORIES by act B1 of the acceptance act.\n'
  printf 'Posted under: act C2 of FOUNDER-ACT-20261004-M14-C2-ACCEPTANCE (docs/decisions/DEC-20261004-02-m14-c2-rereview-acceptance.md, file SHA-256 %s, signed by the Founder on 2026-10-04). Re-review request act: FOUNDER-ACT-20261004-M14-C2-REREVIEW-REQUEST (file SHA-256 %s).\n' "$ACT_SHA" "$REQ_SHA"
}
prov() {
  printf '\nProvenance: this text is the drafting assistant'"'"'s transcription of what the Founder pasted from the reviewer'"'"'s terminal session. It is not an unedited export. It differs from that paste only by two dropped lines that belong to neither document (a preamble before the report and a progress line between the report and the addendum), the stripped two-space terminal indent and trailing padding on every line, and one added final newline. The Founder accepted it as the text of record for this verdict only, under act B2 of the acceptance act. The reviewer'"'"'s model line reads unavailable-from-current-harness. When asked, its session said it was Gemini 3.1 Pro (High) in the Antigravity CLI. That is unverified.\n'
}
mk() { # kind title file sha commit path
  out="$W/$1.comment.md"
  {
    printf '%s\n\n' "$2"
    common
    printf 'Text of record: %s, SHA-256 %s, %s lines, %s bytes, transfer commit %s, path %s\n' "$1" "$4" "$(wc -l < "$3" | tr -d ' ')" "$(wc -c < "$3" | tr -d ' ')" "$5" "$6"
    if [ "$1" = addendum ]; then
      printf 'Status: supplementary evidence and not a second verdict (act B4). Two statements in it carry no weight. It names the PR #116 commit with a SHA that does not exist (the commit is 8b8d789527e2ca67ddfeb98beaa20707b15973d1), and it says that commit was squashed (PR #116 merged as a merge commit, f6cecd671810e4f68e2760abfc3d3a8758e5e8eb, with parents b965a8ef737ca840a2661bb8dd9ab49f764ff95f and 8b8d789527e2ca67ddfeb98beaa20707b15973d1).\n'
    fi
    prov
    printf '\nThe block below is the file, line for line. The file ends with one newline after its last line.\n\n'
    printf '%s\n' "$FENCE"
    cat "$3"
    printf '%s\n' "$FENCE"
  } > "$out"
  extracted="$W/$1.extracted"
  awk -v f="$FENCE" 'go&&$0==f{exit} go{print} !go&&$0==f{go=1}' "$out" > "$extracted"
  [ "$(sha "$extracted")" = "$4" ] || { echo "STOP: extracted block hash differs for $1"; exit 1; }
  if grep -qE '^-{3,}$' "$out"; then echo "STOP: bare hyphen line in $1 comment"; exit 1; fi
  echo "$1 comment: $out ($(wc -c < "$out" | tr -d ' ') bytes) block hash verified"
}
mk verdict "M14 RE-REVIEW VERDICT, TEXT OF RECORD: MADVenturesLLC/madventures-tui#116" "$W/verdict.txt" "$V_SHA" "$V_COMMIT" "$V_PATH"
mk addendum "M14 RE-REVIEW ADDENDUM, TEXT OF RECORD: MADVenturesLLC/madventures-tui#116" "$W/addendum.txt" "$A_SHA" "$A_COMMIT" "$A_PATH"

if [ "$MODE" != post ]; then
  echo "CHECK ONLY. Nothing posted. Read $W/verdict.comment.md and $W/addendum.comment.md, then run: sh $0 post"
  exit 0
fi
who=$(env -u GH_TOKEN gh api user --jq .login)
[ "$who" = decivantiq ] || { echo "STOP: gh identity is $who, not decivantiq"; exit 1; }
for k in "$V_SHA" "$A_SHA"; do
  if env -u GH_TOKEN gh api "repos/$REPO/issues/116/comments" --paginate --jq '.[].body' | grep -q "$k"; then echo "STOP: a comment with $k already exists on #116"; exit 1; fi
done
env -u GH_TOKEN gh pr comment 116 --repo "$REPO" --body-file "$W/verdict.comment.md"
env -u GH_TOKEN gh pr comment 116 --repo "$REPO" --body-file "$W/addendum.comment.md"
