cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== pull request 255: post the merge authorization and merge by merge commit under DEC-20261125-01 B25 (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=255; C=claude/awesome-cray-vqrzbt
H=f06897226f6ba406a74648fdfc690e507d45d447; B=b091b668af7db6142c5afeff16a628080885f63b; TREE=62cfe11297b64ecae742d1a717977d7c9fca7d46
BX=0edab1267bd184e51aea9fce365fde2dafdab91384c741d42253bd44d3668cd8; BH=44cc44dc8129fad9272909551a0baf69e0d5cb7b62848ef7d038efb4420038ab; PSUM=0faac55d81bb6a14f80fadad310f533d0f6397d640b694752aaee8bd1606ab4d
AUTH=pr255-merge-authorization.md; X=ebd645a691acc5a932b3373bb4a5efe853b83c34f7eeb4018906e0fb7cd6f72f
CPR=6067569024; ICS="7180112869"
T=$(mktemp -d); trap "rm -rf \"$T\"" EXIT; F=$T/$AUTH
Q="{repository(owner:\"MADVenturesLLC\",name:\"madventures-tui\"){pullRequest(number:255){reviewThreads(first:50){nodes{id isResolved}}}}}"
REVX="$CPR copilot-pull-request-reviewer[bot] $H COMMENTED"
revs() { $G api "repos/$R/pulls/$N/reviews?per_page=100" --jq "[.[]|[.id,.user.login,.commit_id,.state]|map(tostring)|join(\" \")]|join(\";\")"; }
heldn() { $G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")]|length"; }
crs() { $G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]"; }
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
if [ "$($G api repos/$R/pulls/$N --jq .merged)" = true ]; then
  echo "PULL REQUEST $N IS ALREADY MERGED; checking the merge only"
  test "$($G api repos/$R/pulls/$N --jq .merged_by.login)" = decivantiq || die "pull request $N was not merged by decivantiq"
  AC=$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select(.user.login==\"decivantiq\" and ((.body // \"\")|startswith(\"MERGE AUTHORIZATION\")))|.id|tostring]|join(\" \")") || die "cannot read the comments on pull request $N"
  test -n "$AC" && test "$(echo $AC | wc -w | tr -d " ")" = 1 || die "there is not exactly one authorization comment by decivantiq on pull request $N"
  echo "merged by decivantiq; the authorization comment is $AC"
else
  echo "=== what the authorization rests on"
  test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open false $H main" || die "pull request $N is not open and ready at $H against main"
  test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B; send this output to the drafting assistant"; echo "main is still $B"
  test "$($G api repos/$R/pulls/$N | jq -j .body | shasum -a 256 | cut -c1-64)" = $BX || die "the description is not $BX"
  test "$($G api repos/$R/pulls/$N --jq .body | shasum -a 256 | cut -c1-64)" = $BH || die "the description is not $BH as gh api --jq .body prints it"
  echo "description $BH as gh api --jq .body prints it ($BX as jq -j prints it)"
  test "$($G api repos/$R/compare/$B...$H --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM || die "the changed paths are not the five of item 1"
  test "$($G api repos/$R/compare/$B...$H --jq ".files|length")" = 5 || die "not 5 changed paths"; echo "the five changed paths of item 1"
  test "$($G api repos/$R/commits/$H --jq .commit.tree.sha)" = $TREE || die "the tree of the head is not $TREE"; echo "tree of the head $TREE"
  $G api "repos/$R/contents/transfer/$AUTH?ref=$C" -H "Accept: application/vnd.github.raw" > "$F" || die "the authorization is not on $C"
  test "$(h256 "$F")" = "$X" || die "the authorization on $C is not the signed text $X"; echo "the authorization on $C is the signed text $X"
  echo "=== reviews, comments and threads"
  test "$(revs)" = "$REVX" || die "the reviews are not exactly Copilot review $CPR at the head; send this output to the drafting assistant"
  echo "one review: Copilot $CPR at the head, COMMENTED"
  test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq length)" = 0 || die "a review comment exists; send this output to the drafting assistant"; echo "no review comment"
  test "$($G api graphql -f query="$Q" --jq ".data.repository.pullRequest.reviewThreads.nodes|length")" = 0 || die "a review thread exists; send this output to the drafting assistant"; echo "no review thread"
  test "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select((.body // \"\")|startswith(\"MERGE AUTHORIZATION\")|not)|.id|tostring]|join(\" \")")" = "$ICS" || die "a comment other than $ICS exists; send this output to the drafting assistant"; echo "comments: $ICS"
  echo "=== runs and checks at the head"
  for i in $(seq 1 60); do
    BUSY=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.status!=\"completed\")]|length") || die "cannot read the runs on the head"
    [ "$BUSY" = 0 ] && break; echo "waiting: $BUSY runs not completed"; sleep 10
  done
  test "$BUSY" = 0 || die "runs still not completed after ten minutes"
  HN=$(heldn) || die "cannot read the runs on the head"
  test "$HN" = 0 || die "a run on the head did not succeed, or a run is held; send this output to the drafting assistant"
  echo "every run on the head succeeded; no run is held"
  bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))|.name]|join(\", \")") || die "cannot read the check runs on the head"
  test -z "$bad" || die "a check run is not complete or did not succeed: $bad"
  for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "attribution-shape" "validate-code-review" "code-review" "CodeQL" "copilot-pull-request-reviewer"; do
    s=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.name==\"$c\")|.conclusion]|if length==0 then \"missing\" elif all(.==\"success\") then \"success\" else \"bad\" end") || die "cannot read the check runs on the head"
    test "$s" = success || die "the latest $c run is $s"
  done
  echo "the latest run of each named check succeeded"
  test "$(crs)" = success || die "the code-review status is not success"; echo "code-review status: success"
  echo "Cursor check runs on the head: $($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=all" --jq "[.check_runs[]|select(.app.slug==\"cursor\")|\"\(.id) \(.status) \(.conclusion)\"]|join(\"; \")")"
  for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state) || die "cannot read the merge state"; echo "merge state: $S"; [ "$S" = clean ] && break; sleep 10; done
  if [ "$S" = unstable ]; then
    test "$($G api repos/$R/commits/$H/status --jq .state)" = success || die "merge state unstable and the combined status is not success"
    test "$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug==\"cursor\" and (.status!=\"completed\" or .conclusion!=\"success\"))]|length")" -ge 1 || die "merge state unstable, and not because of a Cursor check"
    echo "merge state unstable: a Cursor check alone leaves it so (item 7)"
  else test "$S" = clean || die "merge state is $S"; fi
  echo CHECKS_OK
  echo "=== the authorization comment"
  EX=$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select((.body // \"\")|startswith(\"MERGE AUTHORIZATION\"))|.id|tostring]|join(\" \")") || die "cannot read the comments on pull request $N"
  if [ -z "$EX" ]; then
    EX=$($G api repos/$R/issues/$N/comments -F body=@"$F" --jq .id) || die "the post of the authorization failed; run this command again to check"; echo "POSTED the authorization: comment $EX"
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
  test "$(revs)" = "$REVX" || die "the reviews are no longer exactly Copilot review $CPR"
  test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq length)" = 0 || die "a review comment appeared"
  test "$($G api graphql -f query="$Q" --jq ".data.repository.pullRequest.reviewThreads.nodes|length")" = 0 || die "a review thread appeared"
  HN=$(heldn) || die "cannot read the runs on the head"; test "$HN" = 0 || die "a run on the head did not succeed, or a run is held"
  test "$(crs)" = success || die "the code-review status is no longer success"
  echo "re-checked: head, main, description, reviews, threads, runs and the code-review status"
  $G pr merge $N -R $R --merge --match-head-commit "$H" || true
  sleep 5
  if [ "$($G api repos/$R/pulls/$N --jq .merged)" != true ]; then
    echo "gh pr merge did not merge; trying the REST merge"
    test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B"
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
test "$($G api repos/$R/compare/$B...$M --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM && test "$($G api repos/$R/compare/$B...$M --jq ".files|length")" = 5 || die "the paths changed against $B are not the five"
echo "changed against $B: exactly the five paths of item 1"
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
