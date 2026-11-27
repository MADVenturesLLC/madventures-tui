cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
G="env -u GH_TOKEN gh"; R=MADVenturesLLC/madventures-tui; N=253
H=858a5fd91a11fc8dc99dd0b75f47feddd2b34c3e; B=60faaf8e35cf7f85078bccad73d563262736117b
BH=77db9d3f9e27b4399b9bb96e319c13effcffa7527f6451dcd71808a8ccbc1206
EXP="docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md:added docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md:added docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md:added docs/verification/phase-3a-correction-rounds.md:modified"
raw() { $G api "repos/$R/contents/$1?ref=$H" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64; }
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
test "$($G api repos/$R/pulls/$N --jq "[.state,(.draft|tostring),.head.sha]|join(\" \")")" = "open true $H" || die "PR $N is not an open draft at $H"
test "$($G api repos/$R/commits/main --jq .sha)" = $B || die "main has moved from $B; send this output to the drafting assistant"; echo "main is still $B"
test "$($G api repos/$R/commits/$H --jq "[.parents[].sha]|join(\" \")")" = $B || die "the parent of the head is not $B"
echo "ONE COMMIT: $H on $B"
test "$($G api repos/$R/compare/$B...$H --jq "[.files[]|.filename+\":\"+.status]|sort|join(\" \")")" = "$EXP" || die "the changed paths differ"; echo "THE FOUR PATHS ONLY: three texts added, the log modified"
test "$(raw docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md)" = e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e || die "DEC-20261123-01 differs from the signed text"
test "$(raw docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md)" = b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa || die "Addendum 1 differs from the signed text"
test "$(raw docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md)" = 5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81 || die "Addendum 2 differs from the signed text"
echo "THE ACT AND BOTH ADDENDA ARE THE SIGNED TEXTS"
test "$(raw docs/verification/phase-3a-correction-rounds.md)" = 17d5154b0a04e4397dd1d2725752abf681509bd1563b2e7a2ff225fd66305933 || die "the correction-round log differs from the expected file"; echo "THE LOG IS THE EXPECTED FILE"
test "$($G api repos/$R/pulls/$N --jq .body | shasum -a 256 | cut -c1-64)" = $BH || die "PR body changed"; echo "BODY UNCHANGED"
test "$($G api repos/$R/pulls/$N --jq .body | grep -c "[][]" || true)" = 0 || die "body has square brackets"; echo "body has no square brackets"
for i in $(seq 1 90); do
  P=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\" and .status!=\"completed\")]|length")
  echo "checks still running (Cursor not counted): $P"; [ "$P" = 0 ] && break; sleep 20
done
test "$P" = 0 || die "checks still running after 30 minutes"
echo "--- every check run at the head (latest):"
$G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq ".check_runs[]|\"\(.name) | \(.status) | \(.conclusion) | \(.app.slug)\""
for c in "Verify" "Verify (macOS)" "tui-chaos (ubuntu-24.04)" "tui-chaos (macOS)" "attribution-shape" "validate-code-review" "code-review"; do
  s=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.name==\"$c\")|.conclusion]|if length==0 then \"missing\" elif all(.==\"success\") then \"success\" else \"bad\" end")
  echo "$c: $s"; test "$s" = success || die "$c is $s"
done
test "$($G api repos/$R/commits/$H/status --jq "[.statuses[]|select(.context==\"code-review\")|.state][0]")" = success || die "the code-review status is not success"; echo "code-review status: success"
bad=$($G api "repos/$R/commits/$H/check-runs?per_page=100&filter=latest" --jq "[.check_runs[]|select(.app.slug!=\"cursor\")|select(.conclusion!=\"success\" and .conclusion!=\"skipped\" and .conclusion!=\"neutral\")|.name]|join(\", \")")
test -z "$bad" || die "a check did not succeed: $bad"; echo "no check other than the Cursor one failed (DEC-20261112-01 B7)"
for i in $(seq 1 30); do S=$($G api repos/$R/pulls/$N --jq .mergeable_state); echo "merge state: $S"; [ "$S" = clean ] && break; sleep 10; done
case "$S" in clean) ;; unstable) echo "merge state unstable: every check other than the Cursor one succeeded";; *) die "merge state is $S";; esac
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
