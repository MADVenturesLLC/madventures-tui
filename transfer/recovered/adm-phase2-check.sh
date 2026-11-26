cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== admission build: the Founder check of Phase 2, version 1 (bash $BASH_VERSION)"
TR=MADVenturesLLC/madventures-tui; G="env -u GH_TOKEN gh"; TB=claude/awesome-cray-vqrzbt
W=/Users/michaeldaley/builds/m0-admission-r1; D=$W/tui; P=$W/prompt; Q=$W/pr; RD=$W/record; EV=$W/evidence; BR=build/3b-m0-admission-r1
B=0678bd4412d5aaed963ae20f101959bd92f79811; P1=664c5678e516197fa1a14da3487e27821753ff48; H=68d78a60338d9ff27ffab7b275aa3395e2a1c9bd
XR2=45c79ae55539a2bdeef0bf22b9988a1005acbc86c906dbd95ca7f447db5b7b47; XPK=3e8b7547fafd5e83acc84166f61cff12115f829c9dfd5bbf1b5c5effc7bfc563; XBL=e8a76754c360dd99c597e1594cdbf926850e264c5d502ea564bf2515e53c7933
XPT=79f646d073697f9448220dedc3796851f53403b9b829dd30512367965ca8c6a1; XPB=97bae3df127dac0d1ba840d26eb84135234b864e1d5fa15d6710c69f47791460
H1=c8e9327cbba2a9cf716bc6661f8ac4279bca7a80322904f71df1b146acb62fe1; H2=a527426c3fe481189e36e9bcbc5142c130bccfe9abecde1f42c5f6d96a51c6fd; XR1=092bd1f125821d1accc0e7d9fb80b7a7038f2ba1ef7f060ee82a5ae7f598907b
XS=c6d927b3b87e3ab10fa56709786fedd1f71ad5449bf2a5a037a137d94aece825; XEV=c4d1e53cf90f50575fa80ac8f42f64544679466d54e3916f181e9a3ae637ea1f; XSN=d8d85fae5d59890b5dd357acdb5061447dd95dadcaebc3ebdf80179b3245a4f9
XM3=0e54e70e354dd478ad43f40e47136cab7d6b6a136c990759831fbbc909d2a1a4; XRG=6d96ef306ae724f0f6a8e2979c1c89388b0a3c9e10ea99f1842be6387bd8c5b4
BL=docs/verification/phase-3b-m0-admission-build-log.md; PK=docs/verification/phase-3b-m0-admission-investigation.md; HS=test/phase3a/harness-separation.test.ts; RG=packages/protocol/src/adapter-registry.ts
FI=packages/adapter-madv-surface/test/fixture-integrity.test.ts; NT=packages/adapter-madv-surface/test/recorded-0.1.2.test.ts; FX=packages/adapter-madv-surface/test/fixtures/recorded-0.1.2
CH=/Users/michaeldaley/.codex-governed; S=$CH/sessions; RB=/Users/michaeldaley/.bun/bin/bun; RX=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; TSD=$D/node_modules/typescript
K=h2-record-check.mjs; KC=730df3014bf31d2dc0770cb4d30a4a4a79e30afe; CX=c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f
UP=transfer/m0-adm/phase2
AOK="^(packages/protocol/src/adapter-registry\.ts|packages/protocol/test/[^/]+\.ts|packages/adapter-madv-surface/src/index\.ts|packages/adapter-madv-surface/test/.+|packages/supervisor/test/[^/]+\.ts|docs/verification/phase-3b-m0-admission-(build-log|investigation)\.md|test/phase3a/harness-separation\.test\.ts)$"
P2OK="^(packages/adapter-madv-surface/test/fixtures/recorded-0\.1\.2/(macbook|ubuntu)/0[3-7]\.(stdout|stderr|status)|packages/adapter-madv-surface/test/fixtures/recorded-0\.1\.2/manifest\.tsv|packages/adapter-madv-surface/test/recorded-0\.1\.2\.test\.ts|packages/adapter-madv-surface/test/fixture-integrity\.test\.ts|docs/verification/phase-3b-m0-admission-(build-log|investigation)\.md)$"
KEYRE="sk-(cp|ant)-[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}"
UUIDRE="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"
SIXRE="read_mcp_resource|list_mcp_resource_templates|list_mcp_resources|view_image|codex_tui|spawn_agent"
test "$(uname -sm)" = "Darwin arm64" || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
echo "=== 1. the branch (DEC-20261121-02 B1, B5; resume message 3 item 8)"
cd "$D"
test "$(git rev-parse HEAD)" = "$H" || die "HEAD is not $H"
test "$(git branch --show-current)" = "$BR" || die "not on $BR"
test -z "$(git status --porcelain --untracked-files=all)" || die "tree not clean"
test "$(git stash list | wc -l | tr -d " ")" = 0 || die "a stash exists"
test "$(git rev-parse "$H~3")" = "$P1" || die "the Phase 2 commits do not stand on the Phase 1 head $P1"
test "$(git rev-list --count $B..$H)" = 10 || die "the branch does not hold exactly ten commits on the base"
test "$(git rev-list --merges $B..$H | wc -l | tr -d " ")" = 0 || die "a merge commit"
test "$(git rev-parse "$(git rev-list --reverse $B..$H | head -1)^@")" = "$B" || die "the first commit is not on the base alone"
for c in $(git rev-list --reverse $B..$H); do test "$(git log -1 --format=%an $c)" = daley40-lab || die "commit $c is not by daley40-lab"; git log -1 --format=%B $c | git interpret-trailers --parse | grep -qx "Actor-Id: session:codex/3b-m0-admission-r1" || die "commit $c lacks the Actor-Id trailer"; done
git log --reverse --format="%H %s" $P1..$H
echo "=== 2. the paths (B5 item 3; Addendum 2 B1; resume message 3 items 5, 6 and 9)"
git diff --name-status $B $H | while IFS="$(printf "\t")" read -r st p; do case "$st" in M|A) echo "$p" | grep -qE "$AOK" || die "changed outside the allowed paths: $p";; *) die "status $st on $p";; esac; done
git diff --name-status $P1 $H | while IFS="$(printf "\t")" read -r st p; do case "$st" in M|A) echo "$p" | grep -qE "$P2OK" || die "Phase 2 changed outside its paths: $p";; *) die "status $st on $p";; esac; done
N2=$(git diff --name-only $P1 $H | wc -l | tr -d " "); test "$N2" = 35 || die "Phase 2 changed $N2 files, not the 35 of resume message 3"
test -z "$(git diff --name-only $B $H -- packages/adapter-madv-surface/test/fixtures/recorded bun.lock package.json packages/supervisor/src)" || die "a path that must stay byte-identical changed"
test -z "$(git diff --name-only $P1 $H -- packages/adapter-madv-surface/src packages/protocol packages/supervisor test)" || die "Phase 2 changed code or tests that Phase 1 committed"
old() { git diff -U0 $1 $H -- "$2" | awk "/^@@ /{split(\$2,o,\",\"); s=substr(o[1],2)+0; n=(o[2]==\"\")?1:o[2]+0; for(i=0;i<n;i++) print s+i}" | tr "\n" " "; }
test "$(old $B $RG)" = "82 84 " || die "the registry changes base lines other than 82 and 84"
test "$(old $B $HS)" = "24 " || die "harness-separation changes base lines other than 24"
test "$(git show $H:$RG | shasum -a 256 | cut -c1-64)" = "$XRG" || die "the registry at the head is not $XRG"
FO=$(old $P1 $FI); test "$(echo $FO | wc -w | tr -d " ")" = 1 || die "fixture-integrity.test.ts changes more than one line of the Phase 1 head: $FO"
echo "--- $FI, against the Phase 1 head"; git diff -U0 $P1 $H -- $FI | grep -E "^[-+]" | grep -vE "^(\+\+\+|---) "
git diff -U0 $P1 $H -- $FI | grep -E "^\+[^+]" | grep -q "recorded-0.1.2" || die "the changed line of fixture-integrity.test.ts does not add recorded-0.1.2"
test "$(GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check $B $H | wc -l | tr -d " ")" = 0 || die "git diff --check is not clean"
git diff --stat $P1 $H | tail -1
echo "=== 3. the fixtures against your evidence (resume message 3 item 5)"
NFX=0; for h in macbook ubuntu; do for n in 03 04 05 06 07; do for x in stdout stderr status; do
  git show "$H:$FX/$h/$n.$x" | cmp -s - "$EV/$h/m0-admission-investigation-$h/madv-surface/$n.$x" || die "$FX/$h/$n.$x is not byte for byte the evidence file"; NFX=$((NFX+1)); done; done; done
echo "$NFX fixtures, each byte for byte its evidence file"
test "$(h256 "$EV/SHA256.txt")" = "$XEV" && test "$(h256 "$EV/SANITIZE.txt")" = "$XSN" || die "evidence/ changed"
(cd "$EV" && shasum -a 256 -c --status SHA256.txt) || die "a file in evidence/ does not match its SHA256.txt"
echo "=== 4. the deliverables"
test "$(git show $H:$BL | shasum -a 256 | cut -c1-64)" = "$XBL" || die "the build log at $H is not the one the builder reported"
test "$(git show $H:$PK | shasum -a 256 | cut -c1-64)" = "$XPK" || die "the packet at $H is not the one the builder reported"
test "$(LC_ALL=C ls "$Q" | tr "\n" " ")" = "m0-admission-phase1-halt-1-report.md m0-admission-phase1-halt-2-report.md m0-admission-phase1-report.md m0-admission-phase2-report.md pr-body.md pr-title.txt " || die "pr/ holds: $(LC_ALL=C ls "$Q" | tr "\n" " ")"
test "$(h256 "$Q/m0-admission-phase1-halt-1-report.md")" = "$H1" && test "$(h256 "$Q/m0-admission-phase1-halt-2-report.md")" = "$H2" && test "$(h256 "$Q/m0-admission-phase1-report.md")" = "$XR1" || die "a Phase 1 report changed"
test "$(h256 "$Q/m0-admission-phase2-report.md")" = "$XR2" || die "the Phase 2 report is not the one the builder reported"
test "$(h256 "$Q/pr-title.txt")" = "$XPT" && test "$(h256 "$Q/pr-body.md")" = "$XPB" || die "pr-title.txt or pr-body.md is not the one the builder reported"
test "$(LC_ALL=C ls "$RD" | tr "\n" " ")" = "m0-admission-record.ts " && test "$(h256 "$RD/m0-admission-record.ts")" = "$XS" || die "record/ changed"
(cd "$P" && shasum -a 256 -c --status SHA256.txt) && test "$(grep -c "" "$P/SHA256.txt")" = 7 && test "$(h256 "$P/resume-m0-admission-3-phase-2.md")" = "$XM3" || die "prompt/ is not as resume message 3 left it"
T2=$(mktemp -d); git show $H:$BL > "$T2/build-log.md"; git show $H:$PK > "$T2/packet.md"; git diff $P1 $H -- $NT $FI $FX/manifest.tsv > "$T2/phase2-code.diff"; git diff $B $H > "$T2/all.diff"
n=$(grep -cE "$KEYRE" "$T2/all.diff" || true); test "$n" = 0 || die "the diff of the branch holds $n key-like strings; paste nothing, tell the drafting assistant this count"
for f in "$Q/m0-admission-phase2-report.md" "$Q/pr-body.md" "$Q/pr-title.txt" "$T2/build-log.md" "$T2/packet.md" "$T2/phase2-code.diff"; do
  n=$(grep -cE "$KEYRE" "$f" || true); test "$n" = 0 || die "$(basename "$f") holds $n key-like strings; paste nothing, tell the drafting assistant this count"
  u=$(grep -cE "$UUIDRE" "$f" || true); test "$u" = 0 || die "$(basename "$f") holds $u UUID-shaped strings; paste nothing, tell the drafting assistant this count"
  s=$(grep -cE "$SIXRE" "$f" || true); test "$s" = 0 || die "$(basename "$f") names one of the six names on $s lines; tell the drafting assistant this count"; done
echo "deliverable hashes match; no key-like string in the diff of the branch; no key-like or UUID-shaped string and none of the six names in the Phase 2 report, the PR title and body, the build log, the packet or the Phase 2 code diff"
echo "=== 5. the session-record check (DEC-20261108-03 Addendum 2 B4; Addenda 6 and 10; DEC-20261112-02 B2 and B5; DEC-20261115-02 Addendum 3 B4)"
for f in "$CH"/app-server-daemon/*.pid; do [ -f "$f" ] || continue; pid=$(grep -oE "[0-9]+" "$f" | head -1 || true); if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then die "a governed background server or updater runs ($(basename "$f"))"; fi; done
test "$(pgrep -f "$CH/packages/app-server-daemon" | wc -l | tr -d " ")" = 0 || die "a governed background server or updater runs"
test "$(h256 "$RB")" = "$RX" || die "the Bun runtime is not the macOS certification runtime"
test "$(jq -r .version "$TSD/package.json")" = 5.9.3 || die "the TypeScript of the clone is not 5.9.3"
E=/Users/michaeldaley/builds/m0-admission-record-check/phase2-$(date -u +%Y%m%dT%H%M%SZ); test ! -e "$E" || die "ALREADY EXISTS: $E"; mkdir -p "$E"
$G api "repos/$TR/contents/transfer/$K?ref=$KC" -H "Accept: application/vnd.github.raw" > "$E/$K"
test "$(h256 "$E/$K")" = "$CX" || die "the check at $KC is not the signed text"
"$RB" "$E/$K" selftest "$TSD" "$W" "$E/selftest-records" > "$E/selftest.txt" 2>&1 || true
tail -2 "$E/selftest.txt"
test "$(tail -1 "$E/selftest.txt")" = SELFTEST_OK || { cat "$E/selftest.txt"; die "the self-test failed, so the check does not run; nothing was bundled or uploaded"; }
"$RB" "$E/$K" check "$TSD" "$W" "$S" > "$E/check.txt" 2>&1 || true
cat "$E/check.txt"
cat > "$E/b4-count.mjs" <<"B4COUNT_JS_7c1d"
// Counts, in the exec inputs of the one governed record of FOLDER, the calls of eval, Function,
// load and store, the occurrences of the six names, and the inputs that do not parse, with whether
// the recorded output of each such input holds a SyntaxError. It prints times and counts only.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import { createRequire } from "node:module";
const [tsDir, FOLDER, DIR] = process.argv.slice(2);
const ts = createRequire(import.meta.url)(tsDir);
const SIX = ["read_mcp_resource", "list_mcp_resource_templates", "list_mcp_resources", "view_image", "codex_tui", "spawn_agent"];
const files = [];
const go = d => { for (const e of readdirSync(d).sort()) { const f = join(d, e); if (statSync(f).isDirectory()) go(f); else if (/^rollout-.*\.jsonl$/.test(e)) files.push(f); } };
go(DIR);
const recs = [];
for (const f of files) {
  const items = readFileSync(f, "utf8").split("\n").filter(l => l.trim() !== "").map(l => JSON.parse(l));
  const m = items.find(x => x.type === "session_meta");
  if (m && m.payload && m.payload.cwd === FOLDER) recs.push([f, items]);
}
console.log("records: " + recs.length);
if (recs.length !== 1) { console.log("B4_STOP: not exactly one record"); process.exit(1); }
const [file, items] = recs[0];
console.log("record: " + basename(file));
const execs = items.filter(x => x.type === "response_item" && x.payload && x.payload.type === "custom_tool_call" && String(x.payload.name).replace(/^functions(\.|__)/, "") === "exec" && typeof x.payload.input === "string");
const outputs = new Map();
for (const x of items) if (x.type === "response_item" && x.payload && /output$/.test(String(x.payload.type || "")) && x.payload.call_id) outputs.set(x.payload.call_id, typeof x.payload.output === "string" ? x.payload.output : JSON.stringify(x.payload.output));
function parse(src) {
  const tries = [["cell.ts", ts.ScriptKind.TS, false], ["cell.js", ts.ScriptKind.JS, false], ["cell.ts", ts.ScriptKind.TS, true]];
  for (const [name, kind, wrap] of tries) {
    const text = wrap ? "(async () => {\n" + src + "\n})();\n" : src;
    const sf = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
    if ((sf.parseDiagnostics || []).length === 0) return sf;
  }
  return null;
}
const tot = { eval: 0, Function: 0, load: 0, store: 0, computed: 0 };
let six = 0, bad = 0;
const unparsed = [];
for (const x of execs) {
  const src = x.payload.input;
  let n6 = 0;
  for (const n of SIX) n6 += src.split(n).length - 1;
  six += n6;
  const sf = parse(src);
  if (!sf) { const out = outputs.get(x.payload.call_id) || ""; unparsed.push(x.timestamp); console.log("exec input that does not parse at " + x.timestamp + ": " + src.length + " characters; occurrences of the six names in it: " + n6 + "; its recorded output holds a SyntaxError: " + (out.includes("SyntaxError") ? "yes" : "no")); if (!out.includes("SyntaxError") || n6 > 0) bad++; continue; }
  const walk = n => {
    if (ts.isCallExpression(n) || ts.isNewExpression(n)) {
      const e = n.expression;
      let name = "(computed)";
      if (ts.isIdentifier(e)) name = e.text;
      else if (ts.isPropertyAccessExpression(e)) name = e.name.text;
      else if (ts.isElementAccessExpression(e) && ts.isStringLiteralLike(e.argumentExpression)) name = e.argumentExpression.text;
      if (name === "(computed)") tot.computed++;
      else if (Object.prototype.hasOwnProperty.call(tot, name)) tot[name]++;
    }
    ts.forEachChild(n, walk);
  };
  walk(sf);
}
console.log("exec inputs: " + execs.length + "; not parsed: " + unparsed.length + "; occurrences of the six names, as any substring, in all of them: " + six + "; calls of eval " + tot.eval + ", Function " + tot.Function + ", load " + tot.load + ", store " + tot.store + "; calls through a computed callee " + tot.computed);
if (six > 0 || unparsed.length > 1 || tot.eval + tot.Function + tot.load + tot.store > 0) bad++;
console.log(bad === 0 ? "B4_OK" : "B4_STOP");
process.exit(bad === 0 ? 0 : 1);
B4COUNT_JS_7c1d
"$RB" "$E/b4-count.mjs" "$TSD" "$W" "$S" > "$E/b4.txt" 2>&1 || true
cat "$E/b4.txt"
(cd "$E" && find . -type f ! -name MANIFEST.sha256 | LC_ALL=C sort | xargs shasum -a 256 > MANIFEST.sha256)
EM=$(h256 "$E/MANIFEST.sha256"); echo "evidence: $E, MANIFEST.sha256 $EM"
test "$(tail -1 "$E/check.txt")" = CHECK_OK || die "the session-record check did not end CHECK_OK; send this whole output to the drafting assistant; nothing was bundled or uploaded"
test "$(tail -1 "$E/b4.txt")" = B4_OK || die "the count of code from a string did not end B4_OK; send this whole output to the drafting assistant; nothing was bundled or uploaded"
echo "=== 6. the evidence, as decivantiq, to $UP on $TB"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
U=$E/upload; mkdir "$U"; cp "$T2/build-log.md" "$U/phase-3b-m0-admission-build-log.md"; cp "$T2/packet.md" "$U/phase-3b-m0-admission-investigation.md"; cp "$T2/phase2-code.diff" "$U/phase2-code.diff"
cp "$Q/m0-admission-phase2-report.md" "$Q/pr-body.md" "$Q/pr-title.txt" "$U/"
{ echo "Founder check of the admission builder session record after Phase 2, under DEC-20261108-03 Addendum 2 B4, as its Addenda 6 B1 and 10 B6 and DEC-20261112-02 B2 and B5 read it, with the count of code from a string of DEC-20261115-02 Addendum 3 B4."; echo; echo "Check: $K, SHA-256 $CX, from transfer commit $KC, over $W. Evidence on the MacBook: $E, MANIFEST.sha256 $EM."; echo; echo "Self-test:"; tail -2 "$E/selftest.txt" | sed "s/^/    /"; echo; echo "Check:"; sed "s/^/    /" "$E/check.txt"; echo; echo "Count, b4-count.mjs, SHA-256 $(h256 "$E/b4-count.mjs"):"; sed "s/^/    /" "$E/b4.txt"; echo; echo "Phase 2 head $H, branch $BR; Phase 1 head $P1."; } > "$U/record-check-phase2.txt"
for f in "$U"/*; do nm=$(basename "$f"); X1=$(h256 "$f")
  if $G api "repos/$TR/contents/$UP/$nm?ref=$TB" -H "Accept: application/vnd.github.raw" > "$T2/$nm.remote" 2>/dev/null; then if [ "$(h256 "$T2/$nm.remote")" = "$X1" ]; then echo "$UP/$nm already there, $X1"; elif [ "$nm" = record-check-phase2.txt ]; then echo "$UP/$nm: the check of an earlier run is already there; the check of this run is in $E"; else die "$UP/$nm exists on $TB with other bytes"; fi; continue; fi
  base64 -i "$f" | tr -d "\n" > "$T2/$nm.b64"
  jq -n --arg m "transfer: admission Phase 2 evidence, $nm (Founder copy)" --arg b "$TB" --rawfile c "$T2/$nm.b64" "{message:\$m,branch:\$b,content:\$c}" > "$T2/$nm.json"
  c=$($G api -X PUT "repos/$TR/contents/$UP/$nm" --input "$T2/$nm.json" --jq .commit.sha)
  test "$($G api "repos/$TR/contents/$UP/$nm?ref=$c" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64)" = "$X1" || die "$UP/$nm on GitHub differs"
  echo "$UP/$nm $X1 in $c"; done
echo "PHASE 2 CHECKED: session record CHECK_OK and B4_OK; ten commits to $H; $NFX fixtures match your evidence; Phase 2 evidence on $TB under $UP; nothing was pushed to the build branch"
' || echo STOPPED
