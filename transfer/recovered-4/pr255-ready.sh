cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
echo "=== mark pull request 255 ready: the filing of DEC-20261125-01 and Addenda 1 to 3 of DEC-20261123-01 (bash $BASH_VERSION)"
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=255
H=f06897226f6ba406a74648fdfc690e507d45d447; B=b091b668af7db6142c5afeff16a628080885f63b
BH=44cc44dc8129fad9272909551a0baf69e0d5cb7b62848ef7d038efb4420038ab
EXP="docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md:added docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md:added docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md:added docs/decisions/DEC-20261125-01-m1-records-and-m2.md:added docs/verification/phase-3a-correction-rounds.md:modified"
raw() { $G api "repos/$R/contents/$1?ref=$H" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64; }
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
test "$(uname -s)" = Darwin || die "run this on the MacBook"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha,.base.ref]|join(\" \")")" = "open true $H main" || die "pull request $N is not an open draft at $H against main"
test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B; send this output to the drafting assistant"
test "$($G api repos/$R/commits/$H --jq "[.parents[].sha]|join(\" \")")" = $B || die "the parent of the head is not $B"
test "$($G api repos/$R/compare/$B...$H --jq "[.status,(.ahead_by|tostring),(.behind_by|tostring)]|join(\" \")")" = "ahead 1 0" || die "the head is not one commit ahead of $B"
echo "ONE COMMIT: $H on $B, which is still main"
test "$($G api repos/$R/compare/$B...$H --jq "[.files[]|.filename+\":\"+.status]|sort|join(\" \")")" = "$EXP" || die "the changed paths differ"
echo "THE FIVE PATHS ONLY: four texts added, the log modified"
test "$(raw docs/decisions/DEC-20261125-01-m1-records-and-m2.md)" = 3a6259589ad33fd82f207560ca81b138516b4ce967e38523ec592b35c4cce3ac || die "DEC-20261125-01 differs from the signed text"
test "$(raw docs/decisions/DEC-20261123-01-addendum-1-environment-values-in-logs.md)" = 5cd930a3f2dbb8f3a85c63cfba5ed95f8088418ee132e89872d57e63fad75666 || die "Addendum 1 differs from the signed text"
test "$(raw docs/decisions/DEC-20261123-01-addendum-2-pty-echo.md)" = f524cb055c363c57dbcaf25dc037645989d453a942f3ce120c7083735e6cc52c || die "Addendum 2 differs from the signed text"
test "$(raw docs/decisions/DEC-20261123-01-addendum-3-first-verdict.md)" = b7ff8171407289c4b4db9be9c76dfa049fdd8b0fe4f80076613f9aa6b48e43f7 || die "Addendum 3 differs from the signed text"
echo "THE ACT AND THE THREE ADDENDA ARE THE SIGNED TEXTS"
test "$(raw docs/verification/phase-3a-correction-rounds.md)" = 9177579362d4c14da10fd7da4ad9428886439ece640735f56807e3a929ef8edc || die "the correction-round log differs from the expected file"
echo "THE LOG IS THE EXPECTED FILE"
test "$($G api repos/$R/pulls/$N --jq .body | shasum -a 256 | cut -c1-64)" = $BH || die "the description changed"; echo "DESCRIPTION UNCHANGED: $BH"
test "$($G api repos/$R/pulls/$N --jq .body | grep -c "[][]" || true)" = 0 || die "the description has square brackets"; echo "the description has no square brackets"
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
C=$($G api --paginate "repos/$R/issues/$N/comments?per_page=100" --jq ".[]|select(.user.login!=\"github-actions[bot]\")|.id") || die "cannot read the comments on pull request $N"
test -z "$C" || die "a comment not by github-actions is on pull request $N; send this output to the drafting assistant"
test "$($G api "repos/$R/pulls/$N/reviews?per_page=100" --jq length)" = 0 || die "a review already exists on pull request $N; send this output to the drafting assistant"
echo "no review, and no comment other than by github-actions"
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
  $G pr edit $N -R $R --add-reviewer @copilot && echo "REQUESTED with gh pr edit" || { echo "gh pr edit could not request Copilot; trying the REST call"; $G api -X POST repos/$R/pulls/$N/requested_reviewers -f "reviewers[]=copilot-pull-request-reviewer[bot]" --jq "[.requested_reviewers[].login]|join(\",\")" || die "could not request Copilot"; }
fi
for i in $(seq 1 30); do
  W=$($G api "repos/$R/issues/$N/timeline?per_page=100" --jq "[.[]|select(.event==\"copilot_work_started\")]|length")
  [ "$W" -ge 1 ] && break; sleep 10
done
test "$W" -ge 1 || die "Copilot did not start within five minutes; send this output to the drafting assistant"
echo "COPILOT STARTED on pull request $N; when its review is in, send this whole output to the drafting assistant"
' || echo STOPPED
