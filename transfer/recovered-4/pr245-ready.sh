cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=245
H=6da70bc5892f6d2ab27475afdc348b32835b3f7e; B=0825a1e349ca5ea6427eea5f2de79dff234dc8f7; M=be78eea1db2d2f103ba70627298a1be94fd9f758
BH=299ac2d48d2097e87612b77759daf2ec558766b2d19ebf4b6be5eba7116998a5; RX=a7dbbd08556349339acecf4e01d6870c2b2f0a6d05d2c3bccfcb9120d26ef169
V1=6989765680; V2=6989766234; T2=2026-11-18T03:48:55Z
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.head.ref]|join(\" \")")" = "open true $H build/3b-m0-r1" || die "PR $N is not an open draft at $H"
test "$($G api repos/$R/commits/main --jq .sha)" = $M || die "main has moved from $M; send this output to the drafting assistant"; echo "main is still $M"
test "$($G api repos/$R/compare/$M...$H --jq .merge_base_commit.sha)" = $B || die "the merge base is not the binding base $B"
TM=$($G api repos/$R/pulls/$N --jq .merge_commit_sha); test "$($G api repos/$R/commits/$TM --jq "[.parents[].sha]|join(\" \")")" = "$M $H" || die "the test merge $TM is not $H into $M"
echo "TEST MERGE $TM IS $H INTO $M"
test "$($G api repos/$R/pulls/$N --jq .body | shasum -a 256 | cut -c1-64)" = $BH || die "the PR body changed"; echo "BODY UNCHANGED"
for c in $V1 $V2; do test "$($G api repos/$R/issues/comments/$c --jq "[.user.login,(.issue_url|split(\"/\")|last)]|join(\" \")")" = "decivantiq $N" || die "verdict comment $c is not yours on PR $N"; done
P1=$($G api repos/$R/issues/comments/$V1 --jq .body | head -8)
printf "%s\n" "$P1" | grep -qx "Head reviewed: $H" && printf "%s\n" "$P1" | grep -q "^Verdict: PASS" && printf "%s\n" "$P1" | grep -q "^Report SHA-256: $RX " || die "the posted verdict is not PASS at $H with report $RX"
echo "POSTED VERDICT: PASS at $H, report $RX, comments $V1 and $V2"
echo "--- the jobs of the runs started by the second reopen ($T2)"
for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "validate-code-review" "code-review" "attribution-shape"; do
  s=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.name==\"$c\" and .started_at >= \"$T2\")]|if length==0 then \"missing\" else (sort_by(.started_at)|last|.status+\" \"+(.conclusion // \"-\")) end")
  echo "$c: $s"; test "$s" = "completed success" || die "$c is $s"
done
test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
RUN=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.app.slug!=\"cursor\" and .status!=\"completed\")]|length"); test "$RUN" = 0 || die "$RUN check runs are still running"
for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "merge state: $S"; [ "$S" = clean ] && break; sleep 10; done
case "$S" in clean) ;; unstable) echo "merge state unstable: only the Cursor check, which DEC-20261112-01 B7 does not count, is not a success";; *) die "merge state is $S";; esac
echo CHECKS_OK
for i in 1 2 3; do $G pr ready $N -R $R && break; sleep 15; done
test "$($G api repos/$R/pulls/$N --jq .draft)" = false || die "still a draft"
test "$($G api repos/$R/pulls/$N --jq .head.sha)" = $H || die "the head moved"
echo "READY $N at $H"
sleep 15
test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq "[.[]|select(.user.login|startswith(\"copilot-pull-request-reviewer\"))]|length")" = 0 || die "a Copilot review already exists; send it to the drafting assistant"
A0=$($G api "repos/$R/issues/$N/timeline?per_page=100" --jq "[.[]|select((.event==\"review_requested\" and .requested_reviewer.login==\"Copilot\") or .event==\"copilot_work_started\")]|length")
if [ "$A0" -ge 1 ]; then
  echo "GitHub already requested Copilot at ready; no request made by this command"
else
  $G pr edit $N -R $R --add-reviewer @copilot && echo "REQUESTED with gh pr edit" || { echo "gh pr edit could not request Copilot; trying the REST call"; $G api -X POST repos/$R/pulls/$N/requested_reviewers -f "reviewers[]=copilot-pull-request-reviewer[bot]" --jq "[.requested_reviewers[].login]|join(\",\")"; }
fi
for i in $(seq 1 30); do
  W=$($G api "repos/$R/issues/$N/timeline?per_page=100" --jq "[.[]|select(.event==\"copilot_work_started\")]|length")
  [ "$W" -ge 1 ] && break; sleep 10
done
test "$W" -ge 1 || die "Copilot did not start within five minutes; send this output to the drafting assistant"
echo "COPILOT STARTED on PR $N; when its review is in, send this output to the drafting assistant"
' || echo STOPPED
