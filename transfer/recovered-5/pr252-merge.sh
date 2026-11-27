cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== pull request 252: post the merge authorization and merge by merge commit under DEC-20261121-02 B11, version 1 (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=252
H=68d78a60338d9ff27ffab7b275aa3395e2a1c9bd; B=0678bd4412d5aaed963ae20f101959bd92f79811; TREE=0b28fcb03ecefd3b1eeb41c5c4ca4b6050d0ce23
BX=c2309dc1ebe275d4b9fadfcb0036b5ca2269bdebae59983b899b3bd4b81e75bb; PSUM=4c8cac768dc8304773761726fdfb1eb2ba60fca6257010a76f62c473f537a3de
C=claude/awesome-cray-vqrzbt; AUTH=pr252-merge-authorization.md; X=f32875a17fcaee142966da5dd870ed00de9e8c1f5c09b951a82c89625aa1b2ee
CPR=6015855571; ICS="7085091237 7089533924"; AFC=137339434137; AFR=45065119387
F=$(mktemp -d)/$AUTH
Q="{repository(owner:\"MADVenturesLLC\",name:\"madventures-tui\"){pullRequest(number:252){reviewThreads(first:50){nodes{id isResolved}}}}}"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
if [ "$($G api repos/$R/pulls/$N --jq .merged)" = true ]; then
  echo "PULL REQUEST $N IS ALREADY MERGED; checking the merge only"
else
  echo "=== what the authorization rests on"
  test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open false $H main" || die "pull request $N is not open and ready at $H against main"
  test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B"; echo "main is still $B"
  test "$($G api repos/$R/pulls/$N | jq -j .body | shasum -a 256 | cut -c1-64)" = $BX || die "the description is not $BX"; echo "description $BX"
  test "$($G api repos/$R/compare/$B...$H --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM || die "the changed paths are not the 44 of item 1"
  test "$($G api repos/$R/compare/$B...$H --jq ".files|length")" = 44 || die "not 44 changed paths"; echo "the 44 changed paths of item 1"
  test "$($G api repos/$R/commits/$H --jq .commit.tree.sha)" = $TREE || die "the tree of the head is not $TREE"; echo "tree of the head $TREE"
  $G api "repos/$R/contents/transfer/$AUTH?ref=$C" -H "Accept: application/vnd.github.raw" > "$F" || die "the authorization is not on $C"
  test "$(h256 "$F")" = "$X" || die "the authorization on $C is not the signed text $X"; echo "the authorization on $C is the signed text $X"
  echo "=== reviews, comments and threads"
  test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq "[.[]|[.id,.user.login,.commit_id,.state]|map(tostring)|join(\" \")]|join(\";\")")" = "$CPR copilot-pull-request-reviewer[bot] $H COMMENTED" || die "the reviews are not exactly Copilot review $CPR at the head; send this output to the drafting assistant"
  echo "one review: Copilot $CPR at the head, COMMENTED"
  test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq length)" = 0 || die "a review comment exists; send this output to the drafting assistant"; echo "no review comment"
  test "$($G api graphql -f query="$Q" --jq ".data.repository.pullRequest.reviewThreads.nodes|length")" = 0 || die "a review thread exists; send this output to the drafting assistant"; echo "no review thread"
  test "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select(.body|startswith(\"MERGE AUTHORIZATION\")|not)|.id|tostring]|join(\" \")")" = "$ICS" || die "a comment other than $ICS exists; send this output to the drafting assistant"; echo "comments: $ICS"
  echo "=== runs and checks at the head"
  for i in $(seq 1 60); do
    BUSY=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.status!=\"completed\")]|length")
    [ "$BUSY" = 0 ] && break; echo "waiting: $BUSY runs not completed"; sleep 10
  done
  test "$BUSY" = 0 || die "runs still not completed after ten minutes"
  test "$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")|.id|tostring]|join(\" \")")" = $AFR || die "a run on the head other than the first attribution-shape run $AFR did not succeed, or a run is held; send this output to the drafting assistant"
  echo "every run on the head succeeded but the first attribution-shape run $AFR; no run is held"
  test "$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))|.id|tostring]|join(\" \")")" = $AFC || die "a check run other than $AFC is not complete or did not succeed"
  LAT="[.check_runs[]|select(.app.slug!=\"cursor\")]|group_by(.name)|map(max_by(.completed_at))"
  for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "attribution-shape" "validate-code-review" "code-review" "CodeQL" "copilot-pull-request-reviewer"; do
    s=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "$LAT|map(select(.name==\"$c\"))|if length==0 then \"missing\" else .[0].conclusion end")
    test "$s" = success || die "the latest $c run is $s"
  done
  echo "the latest run of each named check succeeded; the one failed check run is $AFC"
  test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
  for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); [ "$S" = clean ] && break; sleep 10; done
  echo "merge state: $S"
  case "$S" in clean) ;; unstable) echo "merge state unstable: every check but the Cursor ones succeeded, so they alone leave it so (item 8)";; *) die "merge state is $S";; esac
  echo CHECKS_OK
  echo "=== the authorization comment"
  EX=$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select(.body|startswith(\"MERGE AUTHORIZATION\"))|.id|tostring]|join(\" \")")
  if [ -z "$EX" ]; then
    EX=$($G api repos/$R/issues/$N/comments -F body=@"$F" --jq .id); echo "POSTED the authorization: comment $EX"
  else
    test "$(echo $EX | wc -w | tr -d " ")" = 1 || die "more than one authorization comment"
    echo "the authorization is already posted as comment $EX"
  fi
  test "$($G api repos/$R/issues/comments/$EX --jq .user.login)" = decivantiq || die "comment $EX is not by decivantiq"
  $G api repos/$R/issues/comments/$EX --jq .body | perl -0777 -pe "s/\r//g; s/\n+\z//" > "$F.posted"
  perl -0777 -pe "s/\n+\z//" "$F" > "$F.signed"
  cmp -s "$F.posted" "$F.signed" || die "comment $EX differs from the signed text"
  echo "comment $EX equals the signed text, line endings normalized"
  echo "=== the merge"
  test "$($G api repos/$R/pulls/$N --jq .head.sha)" = $H || die "the head moved"
  test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B"
  test "$($G api repos/$R/pulls/$N | jq -j .body | shasum -a 256 | cut -c1-64)" = $BX || die "the description changed"
  test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq length)" = 1 && test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq length)" = 0 || die "a review or review comment appeared"
  $G pr merge $N -R $R --merge --match-head-commit "$H" || true
  sleep 5
  if [ "$($G api repos/$R/pulls/$N --jq .merged)" != true ]; then
    echo "gh pr merge did not merge; trying the REST merge"
    $G api -X PUT repos/$R/pulls/$N/merge -f merge_method=merge -f sha="$H" --jq .merged || true
    sleep 5
  fi
fi
echo "=== the merge commit"
test "$($G api repos/$R/pulls/$N --jq .merged)" = true || die "not merged"
M=$($G api repos/$R/pulls/$N --jq .merge_commit_sha)
MS=$($G api repos/$R/compare/$M...main --jq .status); case "$MS" in identical|ahead) ;; *) die "main does not contain $M";; esac
test "$($G api repos/$R/commits/$M --jq "[.parents[].sha]|join(\" \")")" = "$B $H" || die "the parents of $M are not $B then $H"; echo "parents: $B then $H"
test "$($G api repos/$R/commits/$M --jq .commit.tree.sha)" = $TREE || die "the tree of $M is not $TREE"; echo "tree $TREE"
test "$($G api repos/$R/compare/$B...$M --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM && test "$($G api repos/$R/compare/$B...$M --jq ".files|length")" = 44 || die "the paths changed against $B are not the 44"
echo "changed against $B: exactly the 44 paths of item 1"
echo "MERGED $N as $M by $($G api repos/$R/pulls/$N --jq .merged_by.login) at $($G api repos/$R/pulls/$N --jq .merged_at); main is $MS with it"
echo "=== the runs on main at $M (waiting up to 30 minutes)"
for i in $(seq 1 60); do
  RUNS=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq ".workflow_runs|length")
  BUSY=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.status!=\"completed\")]|length")
  [ "$RUNS" -ge 3 ] && [ "$BUSY" = 0 ] && break; sleep 30
done
$G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq ".workflow_runs[]|\"\(.name) | \(.event) | \(.status) | \(.conclusion) | run \(.id)\""
PB=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))]|length")
if [ "$RUNS" -ge 3 ] && [ "$PB" = 0 ]; then echo "ALL $RUNS RUNS ON MAIN SUCCEEDED at $M; paste this whole output to the drafting assistant"; else echo "RUNS ON MAIN NOT ALL SUCCEEDED OR STILL RUNNING ($RUNS seen): send this output to the drafting assistant; do not rewrite main"; fi
' || echo STOPPED
