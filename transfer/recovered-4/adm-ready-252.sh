cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
echo "=== admission build: mark pull request 252 ready under DEC-20261121-02 B11, version 1 (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=252
H=68d78a60338d9ff27ffab7b275aa3395e2a1c9bd; B=0678bd4412d5aaed963ae20f101959bd92f79811
BX=c2309dc1ebe275d4b9fadfcb0036b5ca2269bdebae59983b899b3bd4b81e75bb; RX=c58d5779ee3251e0c2efd745dfe47adccf94628f069d0efdd9cbe8b32075fee4
V1=7089533924; AF=137339434137
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open true $H main" || die "pull request $N is not an open draft at $H against main"
test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B; send this output to the drafting assistant"
echo "pull request $N: open draft at $H; main is still $B"
test "$($G api repos/$R/pulls/$N | jq -j .body | shasum -a 256 | cut -c1-64)" = $BX || die "the description is not the one your trailer command set ($BX)"
echo "description unchanged since your trailer command: $BX"
echo "=== the posted verdict"
test "$($G api repos/$R/issues/comments/$V1 --jq "[.user.login,(.issue_url|split(\"/\")|last)]|join(\" \")")" = "decivantiq $N" || die "comment $V1 is not by decivantiq on pull request $N"
T=$(mktemp); $G api repos/$R/issues/comments/$V1 --jq .body > "$T" || die "cannot read comment $V1"
grep -qx "Verdict: PASS; three ADVISORY findings, no SUBSTANTIVE finding" "$T" && grep -qx "Head reviewed: $H" "$T" && grep -q "^Report SHA-256: $RX " "$T" || die "comment $V1 does not state the PASS verdict at $H for report $RX"
test "$($G api "repos/$R/issues/$N/comments?per_page=100" --jq "[.[]|select(.body|startswith(\"TIER-2 REVIEW VERDICT\"))|.id]|join(\" \")")" = $V1 || die "pull request $N holds a verdict comment other than $V1"
echo "POSTED PASS AT $H: comment $V1, report $RX, the only verdict on the pull request"
echo "=== the checks at the head"
for i in $(seq 1 90); do
  P=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.app.slug!=\"cursor\" and .status!=\"completed\")]|length")
  [ "$P" = 0 ] && break; echo "checks still running (Cursor not counted): $P"; sleep 20
done
test "$P" = 0 || die "checks still running after 30 minutes"
echo "--- every check run at the head:"
$G api "repos/$R/commits/$H/check-runs?per_page=100" --jq ".check_runs[]|\"\(.id) | \(.name) | \(.conclusion) | \(.completed_at) | \(.app.slug)\""
LAT="[.check_runs[]|select(.app.slug!=\"cursor\")]|group_by(.name)|map(max_by(.completed_at))"
for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "attribution-shape" "validate-code-review" "code-review" "CodeQL"; do
  s=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "$LAT|map(select(.name==\"$c\"))|if length==0 then \"missing\" else .[0].conclusion end")
  echo "$c, latest run: $s"; test "$s" = success || die "the latest $c run is $s"
done
bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")|.id|tostring]|join(\" \")")
test "$bad" = $AF || die "the runs that did not succeed are not exactly the first attribution-shape run $AF: $bad"
echo "the one run that did not succeed is attribution-shape $AF, on the description before your trailer command; its later run succeeded"
test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "merge state: $S"; [ "$S" = clean ] && break; sleep 10; done
case "$S" in clean|unstable) ;; *) die "merge state is $S";; esac
test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq length)" = 0 || die "a review already exists on pull request $N; send this output to the drafting assistant"
echo CHECKS_OK
echo "=== ready"
for i in 1 2 3; do $G pr ready $N -R $R && break; sleep 15; done
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open false $H" || die "pull request $N is not open and ready at $H"
echo "READY $N at $H at $($G api repos/$R/pulls/$N --jq .updated_at)"
sleep 15
test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq "[.[]|select(.user.login|startswith(\"copilot-pull-request-reviewer\"))]|length")" = 0 || die "a Copilot review already exists; send this output to the drafting assistant"
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
echo "COPILOT STARTED on pull request $N; when its review is in, send this whole output to the drafting assistant"
' || echo STOPPED
