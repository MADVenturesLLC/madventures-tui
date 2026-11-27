cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== pull request 253: post the merge authorization and merge by merge commit under DEC-20261123-01 B27, version 1 (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=253
H=858a5fd91a11fc8dc99dd0b75f47feddd2b34c3e; B=60faaf8e35cf7f85078bccad73d563262736117b; TREE=f858e7f0533cd8c2b02d7d25d3a940bdb85ddf07
BX=df1d657a3b3acf9b0152fb29bfa81787401dc53a9de0ecb485533febd7dbf66e; BH=77db9d3f9e27b4399b9bb96e319c13effcffa7527f6451dcd71808a8ccbc1206; PSUM=40c7471321bd6ac6bbf55084319893fbaed28cbb0e410cfd12a29b40dee3bcd0
C=claude/awesome-cray-vqrzbt; AUTH=pr253-merge-authorization.md; X=c5de4ae607b2376bc55569432f85eb3240a7bc8b6c4bbdc259626e9650dda027
CPR=6017118778; ICS="7092660152"
F=$(mktemp -d)/$AUTH
Q="{repository(owner:\"MADVenturesLLC\",name:\"madventures-tui\"){pullRequest(number:253){reviewThreads(first:50){nodes{id isResolved}}}}}"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
if [ "$($G api repos/$R/pulls/$N --jq .merged)" = true ]; then
  echo "PULL REQUEST $N IS ALREADY MERGED; checking the merge only"
else
  echo "=== what the authorization rests on"
  test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open false $H main" || die "pull request $N is not open and ready at $H against main"
  test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B"; echo "main is still $B"
  test "$($G api repos/$R/pulls/$N | jq -j .body | shasum -a 256 | cut -c1-64)" = $BX || die "the description is not $BX"
  test "$($G api repos/$R/pulls/$N --jq .body | shasum -a 256 | cut -c1-64)" = $BH || die "the description is not $BH as gh api --jq .body prints it"
  echo "description $BH as gh api --jq .body prints it ($BX as jq -j prints it)"
  test "$($G api repos/$R/compare/$B...$H --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM || die "the changed paths are not the four of item 1"
  test "$($G api repos/$R/compare/$B...$H --jq ".files|length")" = 4 || die "not 4 changed paths"; echo "the four changed paths of item 1"
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
  test "$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")|.id|tostring]|join(\" \")")" = "" || die "a run on the head did not succeed, or a run is held; send this output to the drafting assistant"
  echo "every run on the head succeeded; no run is held"
  test "$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))|.id|tostring]|join(\" \")")" = "" || die "a check run is not complete or did not succeed"
  LAT="[.check_runs[]|select(.app.slug!=\"cursor\")]|group_by(.name)|map(max_by(.completed_at))"
  for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "attribution-shape" "validate-code-review" "code-review" "CodeQL" "copilot-pull-request-reviewer"; do
    s=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "$LAT|map(select(.name==\"$c\"))|if length==0 then \"missing\" else .[0].conclusion end")
    test "$s" = success || die "the latest $c run is $s"
  done
  echo "the latest run of each named check succeeded"
  test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
  for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); [ "$S" = clean ] && break; sleep 10; done
  echo "merge state: $S"
  case "$S" in clean) ;; unstable) echo "merge state unstable: every check but the Cursor one succeeded, so it alone leaves it so (item 7)";; *) die "merge state is $S";; esac
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
test "$($G api repos/$R/compare/$B...$M --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM && test "$($G api repos/$R/compare/$B...$M --jq ".files|length")" = 4 || die "the paths changed against $B are not the four"
echo "changed against $B: exactly the four paths of item 1"
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
