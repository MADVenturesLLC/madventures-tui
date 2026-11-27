cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== pull request 254 (M1): the note on the Copilot review, then the merge authorization and the merge under DEC-20261123-01 B25 (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=254; C=claude/awesome-cray-vqrzbt
H=2fb92148c361ab7434d1e62e87cdeb9e59842b3f; B=75aec139d503cbe1d34d0c6f3ac5bd514339570e; TREE=d44b23695abf7d3641bd3a099e7ff20f785e47b4
BX=7927cf4c240e598fcbb94f7b755194dc8210e6a8b43c9b564a1c3f00e1cff355; PSUM=fb2f8538574f16b3115cd83b92336f3e8d71ecf832aabb43e1b4918d15c2cecb
X=652873058530601b8ad79c5f05576a5dbc9e3bdfa29911a5e6261e2e7ba6ef79; NX=f4d5ab0c7f6ee6471297fae2f709845081dfa8fc45e56d9d4888153896b3dc18
V2=7170917360; CPR=6063305332; CID1=4699513340; CID2=4699513419; ICS="7136942805 7152608903 7152609315 7170917360"
D=$(mktemp -d); trap "rm -rf \"$D\"" EXIT; F=$D/pr254-merge-authorization.md; NF=$D/pr254-copilot-note.md
Q="{repository(owner:\"MADVenturesLLC\",name:\"madventures-tui\"){pullRequest(number:254){reviewThreads(first:50){nodes{id isResolved comments(first:1){nodes{databaseId author{login}}}}}}}}"
UNRES="[.data.repository.pullRequest.reviewThreads.nodes[]|select(.isResolved==false)]"
bodyx() { $G api repos/$R/pulls/$N | jq -j .body | shasum -a 256 | cut -c1-64; }
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
if [ "$($G api repos/$R/pulls/$N --jq .merged)" = true ]; then
  echo "PULL REQUEST $N IS ALREADY MERGED; checking the merge only"
else
  echo "=== what the authorization rests on"
  test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open false $H main" || die "pull request $N is not open and ready at $H against main"
  test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B"; echo "main is still $B"
  test "$(bodyx)" = $BX || die "the description is not $BX as GitHub stores it"; echo "description $BX, as GitHub stores it"
  test "$($G api repos/$R/compare/$B...$H --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM && test "$($G api repos/$R/compare/$B...$H --jq "[.ahead_by,.behind_by,(.files|length)]|map(tostring)|join(\" \")")" = "15 0 36" || die "the head is not 15 commits on $B changing the 36 paths of item 1"
  echo "15 commits on $B; the 36 changed paths of item 1"
  test "$($G api repos/$R/commits/$H --jq .commit.tree.sha)" = $TREE || die "the tree of the head is not $TREE"; echo "tree of the head $TREE"
  $G api "repos/$R/contents/transfer/pr254-merge-authorization.md?ref=$C" -H "Accept: application/vnd.github.raw" > "$F" || die "the authorization is not on $C"
  test "$(h256 "$F")" = $X || die "the authorization on $C is not the signed text $X"; echo "the authorization on $C is the signed text $X"
  $G api "repos/$R/contents/transfer/pr254-copilot-note.md?ref=$C" -H "Accept: application/vnd.github.raw" > "$NF" || die "the note is not on $C"
  test "$(h256 "$NF")" = $NX || die "the note on $C is not the signed text $NX"; echo "the note on $C is the signed text $NX"
  echo "=== verdict, reviews, comments and threads"
  test "$($G api repos/$R/issues/comments/$V2 --jq "[.user.login,(.body|contains(\"Head reviewed: $H\")|tostring),(.body|contains(\"Verdict: PASS, no SUBSTANTIVE finding\")|tostring)]|join(\" \")")" = "decivantiq true true" || die "comment $V2 is not the posted PASS at $H"; echo "the posted PASS at $H: comment $V2"
  test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq "[.[]|[.id,.user.login,.commit_id,.state]|map(tostring)|join(\" \")]|join(\";\")")" = "$CPR copilot-pull-request-reviewer[bot] $H COMMENTED" || die "the reviews are not exactly Copilot review $CPR at the head; send this output to the drafting assistant"
  echo "one review: Copilot $CPR at the head, COMMENTED"
  test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq "[.[]|[.id,.pull_request_review_id,(.user.login|ascii_downcase|contains(\"copilot\"))]|map(tostring)|join(\" \")]|join(\";\")")" = "$CID1 $CPR true;$CID2 $CPR true" || die "the review comments are not exactly $CID1 and $CID2 of review $CPR; send this output to the drafting assistant"
  echo "two review comments, $CID1 and $CID2, both of review $CPR"
  test "$($G api graphql -f query="$Q" --jq ".data.repository.pullRequest.reviewThreads.nodes|length")" = 2 || die "the pull request does not hold exactly two review threads"
  test "$($G api graphql -f query="$Q" --jq "[.data.repository.pullRequest.reviewThreads.nodes[]|.comments.nodes[0].databaseId|tostring]|sort|join(\" \")")" = "$CID1 $CID2" || die "the two threads are not those of $CID1 and $CID2"
  echo "two review threads, those of $CID1 and $CID2"
  test "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|(.body // \"\") as \$b|select((\$b|startswith(\"MERGE AUTHORIZATION\")|not) and (\$b|startswith(\"FOUNDER NOTE ON THE COPILOT REVIEW\")|not))|.id|tostring]|join(\" \")")" = "$ICS" || die "a comment other than $ICS exists; send this output to the drafting assistant"
  echo "comments: $ICS"
  OTHER=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.status==\"completed\" and .conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\" and (.name!=\"code-review\" or (.conclusion!=\"action_required\" and .conclusion!=\"failure\")))]|length")
  test "$OTHER" = 0 || die "a run on the head failed other than a code-review run; send this output to the drafting assistant"
  echo "code-review runs to re-run (held or failed): $($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.name==\"code-review\" and (.conclusion==\"action_required\" or .conclusion==\"failure\"))|.id|tostring]|join(\" \")")"
  echo "=== the note on the Copilot review"
  EXN=$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|(.body // \"\") as \$b|select(\$b|startswith(\"FOUNDER NOTE ON THE COPILOT REVIEW: MADVenturesLLC/madventures-tui#254\"))|.id|tostring]|join(\" \")")
  if [ -z "$EXN" ]; then
    EXN=$($G api repos/$R/issues/$N/comments -F body=@"$NF" --jq .id); echo "POSTED the note: comment $EXN"
  else
    test "$(echo $EXN | wc -w | tr -d " ")" = 1 || die "more than one note comment"
    echo "the note is already posted as comment $EXN"
  fi
  test "$($G api repos/$R/issues/comments/$EXN --jq .user.login)" = decivantiq || die "comment $EXN is not by decivantiq"
  $G api repos/$R/issues/comments/$EXN --jq .body | perl -0777 -pe "s/\r//g; s/\n+\z//" > "$NF.posted"
  perl -0777 -pe "s/\n+\z//" "$NF" > "$NF.signed"
  cmp -s "$NF.posted" "$NF.signed" || die "comment $EXN differs from the signed note"
  echo "comment $EXN equals the signed note, line endings normalized"
  for CID in $CID1 $CID2; do
    T=$($G api graphql -f query="$Q" --jq ".data.repository.pullRequest.reviewThreads.nodes[]|select(.comments.nodes[0].databaseId==$CID)|[.id,(.isResolved|tostring),.comments.nodes[0].author.login]|@tsv")
    test -n "$T" || die "thread $CID not found"
    case "$(printf "%s" "$T" | cut -f3 | tr A-Z a-z)" in *copilot*) ;; *) die "thread $CID is not Copilot";; esac
    if [ "$(printf "%s" "$T" | cut -f2)" = true ]; then echo "ALREADY RESOLVED $CID"; else
      TID=$(printf "%s" "$T" | cut -f1)
      test "$($G api graphql -f query="mutation{resolveReviewThread(input:{threadId:\"$TID\"}){thread{isResolved}}}" --jq .data.resolveReviewThread.thread.isResolved)" = true || die "could not resolve thread $CID"
      echo "RESOLVED $CID"
    fi
  done
  test "$($G api graphql -f query="$Q" --jq "$UNRES|length")" = 0 || die "an open review thread; send this output to the drafting assistant"; echo "NO OPEN REVIEW THREAD"
  echo "=== the code-review gate"
  for i in $(seq 1 60); do
    BUSY=$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.status==\"in_progress\" or .status==\"queued\")]|length")
    [ "$BUSY" = 0 ] && break; echo "waiting: $BUSY runs in progress"; sleep 10
  done
  test "$BUSY" = 0 || die "runs still in progress after ten minutes"
  for RID in $($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq ".workflow_runs[]|select(.name==\"code-review\" and (.conclusion==\"action_required\" or .conclusion==\"failure\"))|.id"); do
    A0=$($G api repos/$R/actions/runs/$RID --jq .run_attempt)
    $G api -X POST repos/$R/actions/runs/$RID/rerun >/dev/null; echo "RERAN code-review run $RID from attempt $A0 (one at a time)"
    AT=$A0; ST=-
    for i in $(seq 1 90); do sleep 10; AT=$($G api repos/$R/actions/runs/$RID --jq .run_attempt); ST=$($G api repos/$R/actions/runs/$RID --jq "[.status,(.conclusion//\"-\")]|@tsv"); [ "$AT" -gt "$A0" ] && case "$ST" in completed*) break;; esac; done
    echo "$RID attempt $AT: $ST"; test "$AT" -gt "$A0" && test "$ST" = "$(printf "completed\tsuccess")" || die "re-run $RID did not succeed"
  done
  test "$($G api "repos/$R/actions/runs?head_sha=$H&per_page=100" --jq "[.workflow_runs[]|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")]|length")" = 0 || die "a run on the head did not succeed"; echo "ALL RUNS ON THE HEAD SUCCEEDED"
  echo "code-review status: $($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|\"\(.state) \(.updated_at) \(.description)\"][0]")"
  test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"
  bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\"))|.name]|join(\", \")")
  test -z "$bad" || die "a check run is not complete or did not succeed: $bad"; echo "every check run other than the Cursor ones complete; none failed"
  echo "Cursor check runs on the head: $($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=all" --jq "[.check_runs[]|select(.app.slug==\"cursor\")|\"\(.id) \(.status) \(.conclusion)\"]|join(\"; \")")"
  for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "merge state: $S"; [ "$S" = clean ] && break; sleep 10; done
  if [ "$S" = unstable ]; then
    test "$($G api repos/$R/commits/$H/status --jq .state)" = success || die "merge state unstable and the combined status is not success"
    test "$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug==\"cursor\" and (.status!=\"completed\" or .conclusion!=\"success\"))]|length")" -ge 1 || die "merge state unstable, and not because of a Cursor check"
    echo "merge state unstable: a Cursor check alone leaves it so (item 8)"
  else test "$S" = clean || die "merge state is $S"; fi
  echo CHECKS_OK
  echo "=== the authorization comment"
  EX=$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|(.body // \"\") as \$b|select(\$b|startswith(\"MERGE AUTHORIZATION\"))|.id|tostring]|join(\" \")")
  if [ -z "$EX" ]; then
    EX=$($G api repos/$R/issues/$N/comments -F body=@"$F" --jq .id); echo "POSTED the authorization: comment $EX"
  else
    test "$(echo $EX | wc -w | tr -d " ")" = 1 || die "more than one authorization comment"
    echo "the authorization is already posted as comment $EX"
  fi
  test "$($G api repos/$R/issues/comments/$EX --jq .user.login)" = decivantiq || die "comment $EX is not by decivantiq"
  $G api repos/$R/issues/comments/$EX --jq .body | perl -0777 -pe "s/\r//g; s/\n+\z//" > "$F.posted"
  perl -0777 -pe "s/\n+\z//" "$F" > "$F.signed"
  cmp -s "$F.posted" "$F.signed" || die "comment $EX differs from the signed authorization"
  echo "comment $EX equals the signed authorization, line endings normalized"
  echo "=== the merge"
  test "$($G api repos/$R/pulls/$N --jq .head.sha)" = $H || die "the head moved"
  test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B"
  test "$(bodyx)" = $BX || die "the description changed"
  test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq length)" = 1 && test "$($G api "repos/$R/pulls/$N/comments?per_page=100" --jq length)" = 2 || die "a review or review comment appeared"
  test "$($G api graphql -f query="$Q" --jq "$UNRES|length")" = 0 || die "an open review thread appeared"
  test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is no longer success"
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
test "$($G api repos/$R/compare/$B...$M --jq ".files[].filename" | LC_ALL=C sort | shasum -a 256 | cut -c1-64)" = $PSUM && test "$($G api repos/$R/compare/$B...$M --jq ".files|length")" = 36 || die "the paths changed against $B are not the 36"
echo "changed against $B: exactly the 36 paths of item 1"
echo "MERGED $N as $M by $($G api repos/$R/pulls/$N --jq .merged_by.login) at $($G api repos/$R/pulls/$N --jq .merged_at); main is $MS with it"
echo "=== the push runs on main at $M (waiting up to 60 minutes)"
for i in $(seq 1 120); do
  RUNS=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.event==\"push\")]|length")
  BUSY=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.event==\"push\" and .status!=\"completed\")]|length")
  [ "$RUNS" -ge 1 ] && [ "$BUSY" = 0 ] && break; sleep 30
done
$G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq ".workflow_runs[]|select(.event==\"push\")|\"\(.name) | \(.status) | \(.conclusion) | run \(.id)\""
PB=$($G api "repos/$R/actions/runs?head_sha=$M&per_page=50" --jq "[.workflow_runs[]|select(.event==\"push\" and (.status!=\"completed\" or (.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")))]|length")
if [ "$RUNS" -ge 1 ] && [ "$PB" = 0 ]; then echo "PUSH RUNS ON MAIN SUCCEEDED at $M; paste this whole output to the drafting assistant"; else echo "PUSH RUNS ON MAIN NOT ALL SUCCEEDED OR STILL RUNNING ($RUNS seen): send this output to the drafting assistant; do not rewrite main"; fi
' || echo STOPPED
