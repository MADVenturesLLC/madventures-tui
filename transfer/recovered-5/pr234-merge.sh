cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=234
H=915dd0c4431e8f51458556c9f7ee64f6d8c303c6; B=aeca237eea1062c31b2c4a63f487349f2fc8f633; BB=1678f1839c600cacd38fd426f755afae021861bf
BX=eeb0bd34311c060e3489679b6c1fd89d4f4bc3a9742603999dc73318f5e68a79; D2=/Users/michaeldaley/builds/review-h1-r2/prompt/pr-234-description.md
C=claude/awesome-cray-vqrzbt; X=93b3f1bfc230973fb90e0b2c168a25f2422e471569a5b04047f74ed892f9209d
C3=6811012944; CPR=5867422948
EXP="apps/madv-agent/src/proxy.ts docs/verification/phase-3b-h1-build-log.md test/phase3a/architecture-phase3a.test.ts test/phase3a/evidence-pipeline.test.ts test/phase3a/runtime-harness.ts "
h256() { shasum -a 256 "$1" | cut -c1-64; }
F=$(mktemp -d)/pr234-merge.md
Q="{repository(owner:\"MADVenturesLLC\",name:\"madventures-tui\"){pullRequest(number:234){reviewThreads(first:50){nodes{id isResolved comments(first:1){nodes{databaseId author{login}}}}}}}}"
UNRES="[.data.repository.pullRequest.reviewThreads.nodes[]|select(.isResolved==false)]"
bodyok() { test "$(h256 "$D2")" = $BX && test "$($G api repos/$R/pulls/$N --jq .body)" = "$(cat "$D2")"; }
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
if [ "$($G api repos/$R/pulls/$N --jq .merged)" = true ]; then
  echo "PR 234 IS ALREADY MERGED; checking the merge only"
else
  test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open false $H" || die "PR 234 is not open and ready at $H"
  test "$($G api repos/$R/commits/main --jq .sha)" = "$B" || die "main has moved from $B"; echo "main is still $B"
  test "$($G api repos/$R/compare/main...$H --jq ".files[].filename" | LC_ALL=C sort | tr "\n" " ")" = "$EXP" || die "the changed paths differ from the five of B7"; echo "THE FIVE PATHS OF B7 ONLY"
  $G api "repos/$R/contents/transfer/pr234-merge-authorization.md?ref=$C" -H "Accept: application/vnd.github.raw" > "$F"
  test "$(h256 "$F")" = "$X" || die "authorization text differs from the signed text"; echo "AUTHORIZATION HASH OK"
  bodyok || die "PR body differs from the seventh session pr-body.md $BX"; echo "BODY OK: eeb0bd34 byte for byte"
  test "$($G api repos/$R/issues/comments/$C3 --jq "[.user.login,(.body|contains(\"Verdict: PASS, no finding\")|tostring)]|join(\" \")")" = "decivantiq true" || die "comment $C3 is not the posted third verdict"; echo "POSTED PASS $C3 PRESENT"
  test "$($G api repos/$R/pulls/$N/reviews/$CPR --jq "[.user.login,.commit_id]|join(\" \")")" = "copilot-pull-request-reviewer[bot] $H" || die "Copilot review $CPR is not at the head"; echo "COPILOT REVIEW $CPR AT THE HEAD"
  test "$($G api graphql -f query="$Q" --jq "$UNRES|length")" = 0 || die "an open review thread; send it to the drafting assistant"; echo "NO OPEN REVIEW THREAD"
  OTHER=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=50" --jq "[.workflow_runs[]|select(.status==\"completed\" and .conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\" and (.name!=\"code-review\" or (.conclusion!=\"action_required\" and .conclusion!=\"failure\")))]|length")
  test "$OTHER" = 0 || die "a run on the head failed other than a code-review run"
  echo "code-review runs to re-run (held or failed): $($G api "repos/$R/actions/runs?head_sha=$H&per_page=50" --jq "[.workflow_runs[]|select(.name==\"code-review\" and (.conclusion==\"action_required\" or .conclusion==\"failure\"))]|length")"
  echo CHECKS_OK
  EX=$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select(.body|startswith(\"MERGE AUTHORIZATION\"))|.id]|join(\" \")")
  if [ -z "$EX" ]; then
    $G api repos/$R/issues/$N/comments -F body=@"$F" --jq .html_url; echo COMMENT_POSTED
  else
    test "$(echo $EX | wc -w | tr -d " ")" = 1 || die "more than one authorization comment"
    $G api repos/$R/issues/comments/$EX --jq .body | perl -0777 -pe "s/\r//g; s/\n+\z//" > "$F.posted"
    perl -0777 -pe "s/\n+\z//" "$F" > "$F.signed"
    cmp -s "$F.posted" "$F.signed" || die "the posted authorization differs from the signed text"
    echo "posted text equals the signed text once line endings are normalized"
    test "$($G api repos/$R/issues/comments/$EX --jq .user.login)" = decivantiq || die "the authorization was not posted by decivantiq"
    echo "AUTHORIZATION ALREADY POSTED AS $EX AND MATCHES"
  fi
  for i in $(seq 1 60); do
    BUSY=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=50" --jq "[.workflow_runs[]|select(.status==\"in_progress\" or .status==\"queued\")]|length")
    [ "$BUSY" = 0 ] && break; echo "waiting: $BUSY runs in progress"; sleep 10
  done
  test "$BUSY" = 0 || die "runs still in progress"
  for RID in $($G api "repos/$R/actions/runs?head_sha=$H&per_page=50" --jq ".workflow_runs[]|select(.name==\"code-review\" and (.conclusion==\"action_required\" or .conclusion==\"failure\"))|.id"); do
    $G api -X POST repos/$R/actions/runs/$RID/rerun >/dev/null; echo "RERAN code-review run $RID (one at a time)"; sleep 15
    for i in $(seq 1 60); do ST=$($G api repos/$R/actions/runs/$RID --jq "[.status,(.conclusion//\"-\")]|@tsv"); case "$ST" in completed*) break;; esac; sleep 10; done
    echo "$RID $ST"; test "$ST" = "$(printf "completed\tsuccess")" || die "re-run $RID did not succeed"
  done
  test "$($G api "repos/$R/actions/runs?head_sha=$H&per_page=50" --jq "[.workflow_runs[]|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")]|length")" = 0 || die "a run on the head did not succeed"; echo "ALL RUNS ON THE HEAD SUCCEEDED"
  test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
  bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))|.name]|join(\", \")")
  test -z "$bad" || die "a check run is not complete or did not succeed: $bad"; echo "every check run other than the Cursor one complete; none failed"
  echo "Cursor check runs on the head: $($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=all" --jq "[.check_runs[]|select(.app.slug==\"cursor\")|\"\(.started_at) \(.status) \(.conclusion)\"]|join(\"; \")")"
  for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "state=$S"; [ "$S" = clean ] && break; sleep 10; done
  if [ "$S" = unstable ]; then echo "merge state unstable: every check other than the Cursor one succeeded, so the Cursor check alone leaves it so (item 7)"; else test "$S" = clean || die "merge state is $S"; fi
  test "$($G api repos/$R/pulls/$N --jq .head.sha)" = "$H" || die "head moved"
  test "$($G api repos/$R/commits/main --jq .sha)" = "$B" || die "main has moved from $B"
  bodyok || die "PR body changed"; echo BODY_OK
  $G pr merge $N -R $R --merge --match-head-commit "$H" || true
  sleep 5
  if [ "$($G api repos/$R/pulls/$N --jq .merged)" != true ]; then
    echo "gh pr merge did not merge; trying the REST merge"
    $G api -X PUT repos/$R/pulls/$N/merge -f merge_method=merge -f sha="$H" --jq .merged
    sleep 5
  fi
fi
test "$($G api repos/$R/pulls/$N --jq .merged)" = true || die "not merged"
M=$($G api repos/$R/pulls/$N --jq .merge_commit_sha)
MS=$($G api repos/$R/compare/$M...main --jq .status); case "$MS" in identical|ahead) ;; *) die "main does not contain $M";; esac
test "$($G api repos/$R/commits/$M --jq "[.parents[].sha]|@tsv")" = "$(printf "%s\t%s" $B $H)" || die "merge parents differ"; echo "PARENTS OK: $B then $H"
test "$($G api repos/$R/compare/$B...$M --jq ".files[].filename" | LC_ALL=C sort | tr "\n" " ")" = "$EXP" || die "changed paths differ"; echo "CHANGED PATHS ARE EXACTLY THE FIVE OF B7"
echo "MERGED 234 $M (main is $MS with it)"
echo "=== the push runs on main at $M (waiting up to 60 minutes)"
for i in $(seq 1 120); do
  RUNS=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.event==\"push\")]|length")
  BUSY=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.event==\"push\" and .status!=\"completed\")]|length")
  [ "$RUNS" -ge 1 ] && [ "$BUSY" = 0 ] && break; sleep 30
done
$G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq ".workflow_runs[]|select(.event==\"push\")|\"\(.name) | \(.status) | \(.conclusion) | run \(.id)\""
PB=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.event==\"push\" and (.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")))]|length")
if [ "$RUNS" -ge 1 ] && [ "$PB" = 0 ]; then echo "PUSH RUNS ON MAIN SUCCEEDED at $M"; else echo "PUSH RUNS ON MAIN NOT ALL SUCCEEDED OR STILL RUNNING: send this output to the drafting assistant; do not rewrite main"; fi
' || echo STOPPED
