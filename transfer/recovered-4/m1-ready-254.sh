cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
echo "=== M1: mark pull request 254 ready under DEC-20261123-01 B25, after the posted PASS of its second review (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=254; TB=claude/awesome-cray-vqrzbt
H=2fb92148c361ab7434d1e62e87cdeb9e59842b3f; B=75aec139d503cbe1d34d0c6f3ac5bd514339570e
RX=96c697b746951c30b042a55f43ab6a6456d6faf74f7421c0a31844103f213796; PB=7927cf4c240e598fcbb94f7b755194dc8210e6a8b43c9b564a1c3f00e1cff355; PBT=5a2ac504088cf48184f8764f75df86e4ee0361592dbfb6c8d425ace29b735b94
F1=7152608903; F2=7152609315; V1=7170917360
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open true $H main" || die "pull request $N is not an open draft at $H against main"
test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B; send this output to the drafting assistant"
test "$($G api repos/$R/compare/$B...$H --jq "[.status,(.ahead_by|tostring),(.behind_by|tostring),(.files|length|tostring)]|join(\" \")")" = "ahead 15 0 36" || die "the head is not 15 commits ahead of $B with 36 paths"
echo "pull request $N: open draft at $H, 15 commits and 36 paths on main, which is still $B"
test "$($G api -H "Accept: application/vnd.github.raw" "repos/$R/contents/transfer/m1/delivery-r1/pr-body.md?ref=$TB" | shasum -a 256 | cut -c1-64)" = $PB || die "transfer/m1/delivery-r1/pr-body.md is not $PB"
test "$($G api repos/$R/pulls/$N --jq .body | perl -0777 -pe "s/\s+\z//" | shasum -a 256 | cut -c1-64)" = $PBT || die "the description is not pr-body.md $PB, the one your push command set"
echo "description: pr-body.md $PB, unchanged since your push command"
echo "=== the posted verdicts"
test "$($G api --paginate "repos/$R/issues/$N/comments?per_page=100" --jq ".[]|(.body // \"\") as \$b|select(\$b|startswith(\"TIER-2 REVIEW VERDICT\"))|.id" | tr "\n" " ")" = "$F1 $F2 $V1 " || die "the verdict comments on pull request $N are not exactly $F1 and $F2 (first review) and $V1 (second review)"
T=$(mktemp -d); trap "rm -rf \"$T\"" EXIT
for c in $V1; do
  test "$($G api repos/$R/issues/comments/$c --jq "[.user.login,(.issue_url|split(\"/\")|last)]|join(\" \")")" = "decivantiq $N" || die "comment $c is not by decivantiq on pull request $N"
  $G api repos/$R/issues/comments/$c --jq .body > "$T/$c" || die "cannot read comment $c"
  grep -qx "Head reviewed: $H" "$T/$c" || die "comment $c does not name the head $H"
done
grep -qx "Verdict: PASS, no SUBSTANTIVE finding, one NOT COUNTING and two ADVISORY findings" "$T/$V1" && grep -q "^Report SHA-256: $RX " "$T/$V1" || die "comment $V1 does not state the PASS verdict for report $RX"
grep -q "Head reviewed: 4630152f763baca0259d84c0d5817d0cea501145" "$T/$V1" && die "comment $V1 names the first head"
grep -q "^The report is posted verbatim below in one part, lines 1 to 436, SHA-256 " "$T/$V1" || die "comment $V1 is not the one-part post of the 436-line report"
echo "POSTED PASS AT $H: comment $V1, report $RX, in one part; the first review FAIL stays in $F1 and $F2"
echo "=== the checks at the head"
for i in $(seq 1 90); do
  P=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\" and .status!=\"completed\")]|length")
  echo "checks still running (Cursor not counted): $P"; [ "$P" = 0 ] && break; sleep 20
done
test "$P" = 0 || die "checks still running after 30 minutes"
echo "--- every check run at the head (latest):"
$G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq ".check_runs[]|\"\(.id) | \(.name) | \(.status) | \(.conclusion) | \(.completed_at) | \(.app.slug)\""
for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "attribution-shape" "validate-code-review" "code-review" "CodeQL"; do
  s=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.name==\"$c\")|.conclusion]|if length==0 then \"missing\" elif all(.==\"success\") then \"success\" else \"bad\" end")
  echo "$c: $s"; test "$s" = success || die "$c is $s"
done
test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")|.name]|join(\", \")")
test -z "$bad" || die "a check did not succeed: $bad"; echo "every check other than any Cursor one succeeded or was skipped"
for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "merge state: $S"; [ "$S" = clean ] && break; sleep 10; done
case "$S" in clean) ;; *) die "merge state is $S";; esac
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
