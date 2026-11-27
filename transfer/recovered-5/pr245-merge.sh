cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=245
H=6da70bc5892f6d2ab27475afdc348b32835b3f7e; B=be78eea1db2d2f103ba70627298a1be94fd9f758; T2=2026-11-18T03:48:00Z; TR=2026-11-18T20:20:00Z
BH=299ac2d48d2097e87612b77759daf2ec558766b2d19ebf4b6be5eba7116998a5
C=claude/awesome-cray-vqrzbt; X=80fbf22aaa17b5167307803166365b7028013d522f3a3fc0069c9abffdcc823a
CIDS="4620336234"; CPR=5964503161; HELD="44391417116 44391418123"
EXP="bun.lock:modified docs/verification/phase-3b-m0-build-log.md:added docs/verification/phase-3b-m0-investigation.md:added packages/adapter-madv-surface/package.json:added packages/adapter-madv-surface/src/index.ts:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.status:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.status:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/05.status:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/05.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/05.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/06.status:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/06.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/06.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/07.status:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/07.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/macbook/07.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/manifest.tsv:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/03.status:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/03.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/03.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/04.status:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/04.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/04.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/06.status:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/06.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/06.stdout:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/07.status:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/07.stderr:added packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/07.stdout:added packages/adapter-madv-surface/test/parser.test.ts:added packages/adapter-madv-surface/test/recorded.test.ts:added packages/protocol/src/adapter-registry.ts:modified packages/protocol/test/adapter-registry.test.ts:modified packages/supervisor/package.json:modified packages/supervisor/src/attestation.ts:modified packages/supervisor/src/environment.ts:modified packages/supervisor/src/preflight.ts:modified packages/supervisor/test/environment.test.ts:modified packages/supervisor/test/madv-environment.test.ts:added packages/supervisor/test/madv-preflight-support.ts:added packages/supervisor/test/madv-preflight.test.ts:added packages/supervisor/test/madv-probes.test.ts:added packages/supervisor/test/preflight.test.ts:modified test/phase3a/evidence-pipeline.test.ts:modified test/phase3a/harness-separation.test.ts:modified tsconfig.json:modified"
EXPP="bun.lock docs/verification/phase-3b-m0-build-log.md docs/verification/phase-3b-m0-investigation.md packages/adapter-madv-surface/package.json packages/adapter-madv-surface/src/index.ts packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.status packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.stderr packages/adapter-madv-surface/test/fixtures/recorded/macbook/03.stdout packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.status packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.stderr packages/adapter-madv-surface/test/fixtures/recorded/macbook/04.stdout packages/adapter-madv-surface/test/fixtures/recorded/macbook/05.status packages/adapter-madv-surface/test/fixtures/recorded/macbook/05.stderr packages/adapter-madv-surface/test/fixtures/recorded/macbook/05.stdout packages/adapter-madv-surface/test/fixtures/recorded/macbook/06.status packages/adapter-madv-surface/test/fixtures/recorded/macbook/06.stderr packages/adapter-madv-surface/test/fixtures/recorded/macbook/06.stdout packages/adapter-madv-surface/test/fixtures/recorded/macbook/07.status packages/adapter-madv-surface/test/fixtures/recorded/macbook/07.stderr packages/adapter-madv-surface/test/fixtures/recorded/macbook/07.stdout packages/adapter-madv-surface/test/fixtures/recorded/manifest.tsv packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/03.status packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/03.stderr packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/03.stdout packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/04.status packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/04.stderr packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/04.stdout packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.status packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.stderr packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/05.stdout packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/06.status packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/06.stderr packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/06.stdout packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/07.status packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/07.stderr packages/adapter-madv-surface/test/fixtures/recorded/ubuntu/07.stdout packages/adapter-madv-surface/test/parser.test.ts packages/adapter-madv-surface/test/recorded.test.ts packages/protocol/src/adapter-registry.ts packages/protocol/test/adapter-registry.test.ts packages/supervisor/package.json packages/supervisor/src/attestation.ts packages/supervisor/src/environment.ts packages/supervisor/src/preflight.ts packages/supervisor/test/environment.test.ts packages/supervisor/test/madv-environment.test.ts packages/supervisor/test/madv-preflight-support.ts packages/supervisor/test/madv-preflight.test.ts packages/supervisor/test/madv-probes.test.ts packages/supervisor/test/preflight.test.ts test/phase3a/evidence-pipeline.test.ts test/phase3a/harness-separation.test.ts tsconfig.json "
h256() { shasum -a 256 "$1" | cut -c1-64; }
F=$(mktemp -d)/pr245-merge.md
Q="{repository(owner:\"MADVenturesLLC\",name:\"madventures-tui\"){pullRequest(number:245){reviewThreads(first:50){nodes{id isResolved comments(first:1){nodes{databaseId author{login}}}}}}}}"
UNRES="[.data.repository.pullRequest.reviewThreads.nodes[]|select(.isResolved==false)]"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
if [ "$($G api repos/$R/pulls/$N --jq .merged)" = true ]; then
  echo "PR 245 IS ALREADY MERGED; checking the merge only"
else
  test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open false $H" || die "PR 245 is not open and ready at $H"
  test "$($G api repos/$R/commits/main --jq .sha)" = "$B" || die "main has moved from $B"; echo "main is still $B"
  test "$($G api repos/$R/compare/$B...$H --jq "[.files[]|.filename+\":\"+.status]|sort|join(\" \")")" = "$EXP" || die "the changed paths differ"; echo "THE 53 PATHS ONLY: 41 ADDED, 12 MODIFIED"
  $G api "repos/$R/contents/transfer/pr245-merge-authorization.md?ref=$C" -H "Accept: application/vnd.github.raw" > "$F"
  test "$(h256 "$F")" = "$X" || die "authorization text differs from the signed text"; echo "AUTHORIZATION HASH OK"
  $G api repos/$R/pulls/$N --jq .body > "$F.body"; test "$(h256 "$F.body")" = "$BH" || die "PR body changed since it was marked ready"; echo "BODY HASH OK"
  test "$($G api "repos/$R/contents/docs/verification/phase-3b-m0-build-log.md?ref=$H" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64)" = 5537a16fef148d65974cdea1c4165b637c3d96adba20bd874b6d836fe7d62351 || die "the build log differs"
  test "$($G api "repos/$R/contents/docs/verification/phase-3b-m0-investigation.md?ref=$H" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64)" = 26c8b7735c411135cb99f05888fc5705cd04dbcb0fd14705852da283ac20e8ef || die "the packet differs"; echo "THE BUILD LOG AND THE PACKET ARE THOSE THE REVIEW SAW"
  for c in 6989765680 6989766234; do test "$($G api repos/$R/issues/comments/$c --jq "[.user.login,(.issue_url|split(\"/\")|last)]|join(\" \")")" = "decivantiq $N" || die "verdict comment $c is not yours on PR $N"; done
  $G api repos/$R/issues/comments/6989765680 --jq .body | head -8 | grep -q "^Report SHA-256: a7dbbd08556349339acecf4e01d6870c2b2f0a6d05d2c3bccfcb9120d26ef169 " || die "the posted verdict does not name report a7dbbd08"; echo "POSTED TIER-2 PASS AT THE HEAD: comments 6989765680 and 6989766234"
  test "$($G api "repos/$R/pulls/$N/reviews/$CPR" --jq "[.user.login,.commit_id]|join(\" \")")" = "copilot-pull-request-reviewer[bot] $H" || die "Copilot review $CPR is not at the head"; echo "COPILOT REVIEW $CPR AT THE HEAD"
  test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq "[.[]|.id]|join(\" \")")" = "$CIDS" || die "review comments other than $CIDS exist; send them to the drafting assistant"
  test "$($G api graphql -f query="$Q" --jq "$UNRES|map(select([.comments.nodes[0].databaseId]|inside([4620336234])|not))|length")" = 0 || die "an open review thread other than the Copilot one; send it to the drafting assistant"; echo "NO OPEN THREAD OTHER THAN THE COPILOT ONE"
  OTHER=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.created_at >= \"$T2\")|select(.status==\"completed\" and .conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\" and (.name!=\"code-review\" or .conclusion!=\"action_required\"))]|length")
  test "$OTHER" = 0 || die "a run on the head since the second reopen failed, other than a held code-review run"
  HN=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.created_at >= \"$TR\" and .name==\"code-review\" and .conclusion==\"action_required\")|.id]|sort|map(tostring)|join(\" \")")
  echo "held code-review runs since ready: ${HN:-none}"; for h in $HN; do case " $HELD " in *" $h "*) ;; *) die "a held code-review run other than $HELD: $h; send this output to the drafting assistant";; esac; done
  CRS=$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state+\" \"+.description][0]")
  echo "code-review status: $CRS"
  case "$CRS" in "success "*|"failure unresolved threads present ("*) ;; *) die "the code-review status is neither success nor the unresolved-thread failure";; esac
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
  for CID in $CIDS; do
    T=$($G api graphql -f query="$Q" --jq ".data.repository.pullRequest.reviewThreads.nodes[]|select(.comments.nodes[0].databaseId==$CID)|[.id,(.isResolved|tostring),.comments.nodes[0].author.login]|@tsv")
    test -n "$T" || die "thread $CID not found"
    case "$(printf "%s" "$T" | cut -f3 | tr A-Z a-z)" in *copilot*) ;; *) die "thread $CID is not Copilot";; esac
    if [ "$(printf "%s" "$T" | cut -f2)" = true ]; then echo "ALREADY RESOLVED $CID"; continue; fi
    TID=$(printf "%s" "$T" | cut -f1)
    test "$($G api graphql -f query="mutation{resolveReviewThread(input:{threadId:\"$TID\"}){thread{isResolved}}}" --jq .data.resolveReviewThread.thread.isResolved)" = true || die "could not resolve thread $CID"
    echo "RESOLVED $CID"
  done
  test "$($G api graphql -f query="$Q" --jq "$UNRES|length")" = 0 || die "open threads remain"; echo "NO OPEN THREADS"
  for i in $(seq 1 60); do
    BUSY=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=50" --jq "[.workflow_runs[]|select(.status==\"in_progress\" or .status==\"queued\")]|length")
    [ "$BUSY" = 0 ] && break; echo "waiting: $BUSY runs in progress"; sleep 10
  done
  test "$BUSY" = 0 || die "runs still in progress"
  for RID in $HELD; do
    test "$($G api repos/$R/actions/runs/$RID --jq "[.name,.head_sha]|join(\" \")")" = "code-review $H" || die "run $RID is not a code-review run at the head"
    if [ "$($G api repos/$R/actions/runs/$RID --jq "[.status,(.conclusion//\"-\")]|@tsv")" = "$(printf "completed\tsuccess")" ]; then echo "$RID ALREADY SUCCEEDED"; continue; fi
    $G api -X POST repos/$R/actions/runs/$RID/rerun >/dev/null; echo "RERAN code-review run $RID (one at a time)"; sleep 15
    for i in $(seq 1 60); do ST=$($G api repos/$R/actions/runs/$RID --jq "[.status,(.conclusion//\"-\")]|@tsv"); case "$ST" in completed*) break;; esac; sleep 10; done
    echo "$RID $ST"; test "$ST" = "$(printf "completed\tsuccess")" || die "re-run $RID did not succeed"
  done
  test "$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.created_at >= \"$T2\")|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")]|length")" = 0 || die "a run on the head since the second reopen did not succeed"; echo "ALL RUNS ON THE HEAD SINCE THE SECOND REOPEN SUCCEEDED"
  test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
  bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.started_at >= \"$T2\")|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))|.name]|join(\", \")")
  test -z "$bad" || die "a check run is not complete or did not succeed: $bad"; echo "every check run other than the Cursor one complete; none failed"
  for i in $(seq 1 60); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "state=$S"; [ "$S" = clean ] && break; sleep 10; done
  if [ "$S" = unstable ]; then echo "merge state unstable: every check other than the Cursor one succeeded, so the Cursor check alone leaves it so (item 7)"; else test "$S" = clean || die "merge state is $S after ten minutes; run this command again, it resumes"; fi
  test "$($G api repos/$R/pulls/$N --jq .head.sha)" = "$H" || die "head moved"
  test "$($G api repos/$R/commits/main --jq .sha)" = "$B" || die "main has moved from $B"
  $G api repos/$R/pulls/$N --jq .body > "$F.body"; test "$(h256 "$F.body")" = "$BH" || die "PR body changed"; echo BODY_OK
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
test "$($G api repos/$R/compare/$B...$M --jq ".files[].filename" | LC_ALL=C sort | tr "\n" " ")" = "$EXPP" || die "changed paths differ"; echo "CHANGED PATHS ARE EXACTLY THE 53"
echo "MERGED 245 $M (main is $MS with it)"
echo "=== the runs on main at $M (waiting up to 30 minutes for all three to finish)"
for i in $(seq 1 60); do
  RUNS=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq ".workflow_runs|length")
  BUSY=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.status!=\"completed\")]|length")
  [ "$RUNS" -ge 3 ] && [ "$BUSY" = 0 ] && break; sleep 30
done
$G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq ".workflow_runs[]|\"\(.name) | \(.event) | \(.status) | \(.conclusion) | run \(.id)\""
PB=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))]|length")
if [ "$RUNS" -ge 3 ] && [ "$PB" = 0 ]; then echo "ALL $RUNS RUNS ON MAIN SUCCEEDED at $M"; else echo "RUNS ON MAIN NOT ALL SUCCEEDED OR STILL RUNNING ($RUNS seen): send this output to the drafting assistant; do not rewrite main"; fi
' || echo STOPPED
