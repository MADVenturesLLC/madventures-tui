cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== M1 correction round 1: the Founder check before the push (DEC-20261123-01 Addendum 3 B4 to B7), version 1 (bash $BASH_VERSION)"
TR=MADVenturesLLC/madventures-tui; G="env -u GH_TOKEN gh"; TB=claude/awesome-cray-vqrzbt
W=/Users/michaeldaley/builds/m1-r1; D=$W/tui; P=$W/prompt; Q=$W/pr; EV=$W/evidence; BR=build/3b-m1-r1
B=75aec139d503cbe1d34d0c6f3ac5bd514339570e; H0=4630152f763baca0259d84c0d5817d0cea501145; TC=d8818704410a72e277fc05a3a40535528b5da710; H=2fb92148c361ab7434d1e62e87cdeb9e59842b3f
XR=7110b26e50d1efe5f18adc82f07cbf0362350c126dce86ab7dba47fef8abe744; XPB=7927cf4c240e598fcbb94f7b755194dc8210e6a8b43c9b564a1c3f00e1cff355; XPT=e92ca1ce72f458235121902eb2a09b254120e3a81c99606ce170b5c42113f4b9
XR1=1b2b91eb7757245b3583cfd119353617555657a11a946606e5a331e30800beb3; XPB1=51ef3c6155856b8795d1ad870955860882b897e6ed04b53ae49d28b83e056aef
HR1=eed8bc988d68dc9e1b601cba8ee3e0e3fecc80bd92fadfa45059027d5714f730; HR3=90bd5248ced3c56996588b44de5b0204efff1dbc059dae0e9b7d5d30d730479d
XSUM=8eb45350e487ee4b378d2d2f8e729abf50965b7b68c7d4109dac4cac82c8748f; XEV=b074b13998eca4c583d8e59ac4303c643ea6f652da1066364bb30a81919b2587
BL=docs/verification/phase-3b-m1-build-log.md; PK=docs/verification/phase-3b-m1-evidence.md
CH=/Users/michaeldaley/.codex-governed; S=$CH/sessions; RB=/Users/michaeldaley/.bun/bin/bun; RX=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; TSD=$D/node_modules/typescript
K=h2-record-check.mjs; KC=730df3014bf31d2dc0770cb4d30a4a4a79e30afe; CX=c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f
UP=transfer/m1/delivery-r1; XTS=3ae902c92cc44dace175c0e69e13a4b0899f6983c6121d76b9ab8dd5795e7675
ALLOW="packages/adapter-claude-code/test/live.test.ts packages/adapter-madv-surface/test/live.test.ts packages/supervisor/test/preflight.test.ts test/phase3b/composition.test.ts test/phase3b/scenarios.ts"
export GIT_OPTIONAL_LOCKS=0
KEYRE="sk-(cp|ant)-[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}"
UUIDRE="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"
SIXRE="read_mcp_resource|list_mcp_resource_templates|list_mcp_resources|view_image|codex_tui|spawn_agent"
CFGRE="/Users/michaeldaley/\.(claude|secrets|ssh|config|hermes|madmik3|codex)"
test "$(uname -sm)" = "Darwin arm64" || die "run this on the MacBook"
test -z "${CLAUDECODE:-}" || die "run this in a plain terminal, not inside an agent session"
command -v jq >/dev/null || die "jq not found"
T2=$(mktemp -d); trap "rm -rf \"$T2\"" EXIT
long() { perl -CSD -lne "print if length > 72" "$1" | wc -l | tr -d " "; }
echo "=== 1. the two commits of Addendum 3 B4"
cd "$D"
test "$(git rev-parse HEAD)" = "$H" || die "HEAD is not $H"
test "$(git branch --show-current)" = "$BR" || die "not on $BR"
test -z "$(git status --porcelain --untracked-files=all)" || die "tree not clean ($(git status --porcelain --untracked-files=all | wc -l | tr -d " ") paths; names not printed)"
test "$(git stash list | wc -l | tr -d " ")" = 0 || die "a stash exists"
test "$(git rev-list --count $B..$H)" = 15 && test "$(git rev-list --merges $B..$H | wc -l | tr -d " ")" = 0 || die "the branch is not 15 commits on the base with no merge"
test "$(git rev-list --reverse $H0..$H | tr "\n" " ")" = "$TC $H " || die "the commits after $H0 are not exactly $TC then $H"
test "$(git rev-parse "$TC^@")" = "$H0" && test "$(git rev-parse "$H^@")" = "$TC" || die "the parents are not $H0 and $TC"
for c in $TC $H; do
  test "$(git log -1 --format=%an $c)" = daley40-lab && test "$(git log -1 --format=%cn $c)" = daley40-lab || die "commit $c is not by daley40-lab"
  git log -1 --format=%B $c > "$T2/msg"
  test "$(git interpret-trailers --parse < "$T2/msg")" = "$(printf "Role-Id: builder\nActor-Id: session:codex/3b-m1-r1\nExecution-Surface: codex")" || die "commit $c does not end with exactly the three trailers"
  test "$(grep -ci "^co-authored-by:" "$T2/msg" || true)" = 0 || die "commit $c has a Co-authored-by line"
  test "$(long "$T2/msg")" = 0 || die "commit $c has a message line longer than 72 characters"
  test "$(grep -cE "$KEYRE|$SIXRE" "$T2/msg" || true)" = 0 || die "commit $c has a key-like string or one of the six names in its message"
  echo "$c $(git log -1 --format=%s $c)"
done
git log -1 --format=%B $TC | grep -qiE "addendum 3|b7ff8171" || die "the body of $TC does not name Addendum 3"
test "$(git log -1 --format=%s $H)" = "docs(verification): record M1 correction round 1" || die "the subject of $H is not the one resume message 4 names"
echo "=== 2. the paths (Addendum 3 B4)"
git diff-tree --no-commit-id --no-renames --name-status -r $TC | tr "\t" " " > "$T2/tc"
while read -r st p; do test "$st" = M || die "$TC has status $st on $p; Addendum 3 B4 adds no file"; case " $ALLOW " in *" $p "*) ;; *) die "$TC changes $p, outside Addendum 3 B4 item 1";; esac; done < "$T2/tc"
echo "$TC changes $(grep -c "" "$T2/tc") files, each one Addendum 3 B4 item 1 allows: $(cut -d" " -f2 "$T2/tc" | tr "\n" " ")"
test "$(git diff-tree --no-commit-id --name-only -r $H)" = "$BL" || die "$H is not the build log alone"
test "$(git diff --name-only $B $H0 | tr "\n" " ")" = "$(git diff --name-only $B $H | tr "\n" " ")" && test "$(git diff --name-only $B $H | wc -l | tr -d " ")" = 36 || die "the paths changed from the base are not the same 36 as at $H0"
git show $H0:$BL > "$T2/bl0"; git show $H:$BL > "$T2/build-log.md"; N0=$(wc -c < "$T2/bl0" | tr -d " ")
head -c "$N0" "$T2/build-log.md" | cmp -s - "$T2/bl0" || die "the earlier lines of the build log changed"
tail -c +"$((N0 + 1))" "$T2/build-log.md" > "$T2/bl-new"; grep -qiE "^#+ *Correction round 1" "$T2/bl-new" || die "the appended part has no heading Correction round 1"
echo "build log: $(grep -c "" "$T2/bl0") lines kept byte for byte, $(grep -c "" "$T2/bl-new") lines appended under Correction round 1"
old() { git diff -U0 $B "$1" -- "$2" | awk "/^@@ /{split(\$2,o,\",\"); s=substr(o[1],2)+0; n=(o[2]==\"\")?1:o[2]+0; for(i=0;i<n;i++) print s+i}" | tr "\n" " "; }
for f in $ALLOW; do test "$(old $H0 $f)" = "$(old $H $f)" || die "$f: a line of the binding base changed in the round"; echo "$f: base lines changed: $(old $H $f | wc -w | tr -d " ") (as at $H0); round: $(git diff --numstat $H0 $TC -- $f | cut -f1,2 | tr "\t" "/") added/removed"; done
echo "lines the round removed or replaced in test files (each must be the round adding to a test or a scenario M1 added):"
git diff -U0 $H0 $TC | grep -E "^(\+\+\+ |-[^-])" | sed "s/^/  /" | cut -c1-180
test "$(GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check $B $H | wc -l | tr -d " ")" = 0 || die "git diff --check is not clean"
test -z "$(git diff --name-only $H0 $H -- $PK)" || die "the evidence packet changed"
echo "=== 3. the deliverables (Addendum 3 B6)"
test "$(LC_ALL=C ls "$Q" | tr "\n" " ")" = "m1-halt-1-report.md m1-halt-3-report.md m1-report-1.md m1-report.md pr-body-1.md pr-body.md pr-title.txt " || die "pr/ holds: $(LC_ALL=C ls "$Q" | tr "\n" " ")"
test "$(h256 "$Q/m1-halt-1-report.md")" = $HR1 && test "$(h256 "$Q/m1-halt-3-report.md")" = $HR3 && test "$(h256 "$Q/m1-report-1.md")" = $XR1 && test "$(h256 "$Q/pr-body-1.md")" = $XPB1 && test "$(h256 "$Q/pr-title.txt")" = $XPT || die "a file of pr/ from before the round changed"
test "$(h256 "$Q/m1-report.md")" = $XR && test "$(h256 "$Q/pr-body.md")" = $XPB || die "m1-report.md or pr-body.md is not the one the builder reported"
XBL=$(h256 "$T2/build-log.md"); XBL0=$(h256 "$T2/bl0")
NL=$(grep -l "$XBL" "$W"/logs/8[6-9][0-9]-*.log "$W"/logs/9[0-9][0-9]-*.log 2>/dev/null | wc -l | tr -d " "); NB=$(grep -l "$XPB" "$W"/logs/8[6-9][0-9]-*.log "$W"/logs/9[0-9][0-9]-*.log 2>/dev/null | wc -l | tr -d " ")
echo "build log at the head $XBL (logs of the round naming it: $NL); pr-body.md $XPB (logs naming it: $NB); final report $XR; pr-title.txt unchanged"
echo "logs/: $(ls "$W/logs" | wc -l | tr -d " ") files, the last $(LC_ALL=C ls "$W/logs" | tail -1)"
(cd "$P" && shasum -a 256 -c --status SHA256.txt) && test "$(h256 "$P/SHA256.txt")" = "$XSUM" && test "$(ls "$P" | wc -l | tr -d " ")" = 9 || die "prompt/ is not as your delivery command left it"
test "$(h256 "$EV/SHA256.txt")" = $XEV && (cd "$EV" && shasum -a 256 -c --status SHA256.txt) || die "evidence/ changed"
git diff $B $H -- . ":(exclude)$BL" ":(exclude)$PK" > "$T2/code.diff"; git diff $H0 $TC > "$T2/round.diff"
for f in "$Q/m1-report.md" "$Q/pr-body.md" "$T2/build-log.md" "$T2/code.diff" "$T2/round.diff"; do nm=$(basename "$f")
  n=$(grep -cE "$KEYRE" "$f" || true); test "$n" = 0 || die "$nm holds $n key-like strings; paste nothing, tell the drafting assistant this count"
  s=$(grep -cE "$SIXRE" "$f" || true); test "$s" = 0 || die "$nm names one of the six names on $s lines; tell the drafting assistant this count"
  c=$(grep -cE "$CFGRE" "$f" || true); case "$nm" in build-log.md) test "$c" = 0 || die "$nm names a path under your configuration folders on $c lines; tell the drafting assistant this count";; esac
  echo "$nm: $(grep -c "" "$f") lines; key-like 0; six names 0; lines naming a configuration folder $c; UUID-shaped strings $(grep -cE "$UUIDRE" "$f" || true)"; done
t=$(grep -cE "[[:blank:]]$" "$T2/build-log.md" || true); test "$t" = 0 || die "the build log has $t lines ending in a space or a tab"
echo "=== 4. the session-record check over the whole record, the resumed turns included (Addendum 3 B7; DEC-20261108-03 Addendum 2 B4; Addenda 6 and 10; DEC-20261112-02 B2 and B5; DEC-20261115-02 Addendum 3 B4)"
for f in "$CH"/app-server-daemon/*.pid; do [ -f "$f" ] || continue; pid=$(grep -oE "[0-9]+" "$f" | head -1 || true); if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then die "a governed background server or updater runs ($(basename "$f"))"; fi; done
test "$(pgrep -f "$CH/packages/app-server-daemon" | wc -l | tr -d " ")" = 0 || die "a governed background server or updater runs"
test "$(h256 "$RB")" = "$RX" || die "the Bun runtime is not the macOS certification runtime"
test "$(jq -r .version "$TSD/package.json")" = 5.9.3 && test "$(h256 "$TSD/lib/typescript.js")" = "$XTS" || die "the TypeScript of the clone is not the TypeScript 5.9.3 of bun.lock"
E=/Users/michaeldaley/builds/m1-record-check/check-$(date -u +%Y%m%dT%H%M%SZ); test ! -e "$E" || die "ALREADY EXISTS: $E"; mkdir -p "$E"; cd "$E"
$G api "repos/$TR/contents/transfer/$K?ref=$KC" -H "Accept: application/vnd.github.raw" > "$E/$K"
test "$(h256 "$E/$K")" = "$CX" || die "the check at $KC is not the signed text"
"$RB" "$E/$K" selftest "$TSD" "$W" "$E/selftest-records" > "$E/selftest.txt" 2>&1 || true
tail -2 "$E/selftest.txt"
test "$(tail -1 "$E/selftest.txt")" = SELFTEST_OK || { cat "$E/selftest.txt"; die "the self-test failed, so the check does not run; nothing was uploaded"; }
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
test "$(tail -1 "$E/check.txt")" = CHECK_OK || die "the session-record check did not end CHECK_OK; send this whole output to the drafting assistant; nothing was uploaded"
test "$(tail -1 "$E/b4.txt")" = B4_OK || die "the count of code from a string did not end B4_OK; send this whole output to the drafting assistant; nothing was uploaded"
echo "=== 5. copies for the drafting assistant, as decivantiq, to $UP on $TB"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
U=$E/upload; mkdir "$U"; cp "$T2/build-log.md" "$T2/code.diff" "$T2/round.diff" "$U/"; cp "$Q/m1-report.md" "$Q/pr-body.md" "$U/"
{ echo "Founder check of M1 correction round 1 before the push, under DEC-20261123-01 Addendum 3 B7: the whole session record, the resumed turns included, under DEC-20261108-03 Addendum 2 B4, as its Addenda 6 B1 and 10 B6 and DEC-20261112-02 B2 and B5 read it, with the count of code from a string of DEC-20261115-02 Addendum 3 B4."; echo; echo "Check: $K, SHA-256 $CX, from transfer commit $KC, over $W. Evidence on the MacBook: $E, MANIFEST.sha256 $EM."; echo; echo "Self-test:"; tail -2 "$E/selftest.txt" | sed "s/^/    /"; echo; echo "Check:"; sed "s/^/    /" "$E/check.txt"; echo; echo "Count, b4-count.mjs, SHA-256 $(h256 "$E/b4-count.mjs"):"; sed "s/^/    /" "$E/b4.txt"; echo; echo "Head $H, test commit $TC, on $H0; branch $BR, base $B."; echo "Build log $XBL; pr-body.md $XPB; final report $XR; pr-title.txt $XPT."; } > "$U/record-check.txt"
for f in "$U"/*; do nm=$(basename "$f"); X1=$(h256 "$f")
  if $G api "repos/$TR/contents/$UP/$nm?ref=$TB" -H "Accept: application/vnd.github.raw" > "$T2/$nm.remote" 2>/dev/null; then if [ "$(h256 "$T2/$nm.remote")" = "$X1" ]; then echo "$UP/$nm already there, $X1"; elif [ "$nm" = record-check.txt ]; then echo "$UP/$nm: the check of an earlier run is already there; the check of this run is in $E"; else die "$UP/$nm exists on $TB with other bytes"; fi; continue; fi
  base64 -i "$f" | tr -d "\n" > "$T2/$nm.b64"
  jq -n --arg m "transfer: M1 correction round 1, $nm (Founder copy)" --arg b "$TB" --rawfile c "$T2/$nm.b64" "{message:\$m,branch:\$b,content:\$c}" > "$T2/$nm.json"
  c=$($G api -X PUT "repos/$TR/contents/$UP/$nm" --input "$T2/$nm.json" --jq .commit.sha)
  test "$($G api "repos/$TR/contents/$UP/$nm?ref=$c" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64)" = "$X1" || die "$UP/$nm on GitHub differs"
  echo "$UP/$nm $X1 in $c"; done
echo "M1 ROUND 1 CHECKED: $TC and $H on $H0; paths within Addendum 3 B4; deliverables match the builder report; session record CHECK_OK and B4_OK; copies on $TB under $UP; nothing was pushed to the build branch; paste this whole output to the drafting assistant"
' || echo STOPPED
