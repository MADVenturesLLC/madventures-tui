cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
echo "=== M0 Phase 2: your check of the builder, then the push of the branch (no pull request yet), version 2 (bash $BASH_VERSION)"
TR=MADVenturesLLC/madventures-tui; G="env -u GH_TOKEN gh"; TB=claude/awesome-cray-vqrzbt; CRED="credential.helper=!env -u GH_TOKEN gh auth git-credential"
W=/Users/michaeldaley/builds/m0-r1; D=$W/tui; Q=$W/pr; RD=$W/record; P=$W/prompt; EV=$W/evidence; BR=build/3b-m0-r1
B=0825a1e349ca5ea6427eea5f2de79dff234dc8f7; H1=7f94c272a4fd7fc3b4ab1d18920b80ac95c677d3; H=6da70bc5892f6d2ab27475afdc348b32835b3f7e
XFR=17966439082cf943f48ebba6b50ec2dc99f3e3ea790bcd8420c078eba4d124f4; XHR2=adf9cf6814b690fa992277039c624da48d59be7475ebbe340c4a3fdff1a23a03
XS=b9ba9bdadf0ca0b5e792ad78fc46f9212d763ad7455fb122343756be2e6fb593; XEV=061fd5f51c2ab97f5f57d32cc91bd9fc78cf3bdbe8ff8a8f7f64a1d523ed37fa
BL=docs/verification/phase-3b-m0-build-log.md; PK=docs/verification/phase-3b-m0-investigation.md; FX=packages/adapter-madv-surface/test/fixtures/recorded
CH=/Users/michaeldaley/.codex-governed; S=$CH/sessions; RB=/Users/michaeldaley/.bun/bin/bun; RX=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5; TSD=$D/node_modules/typescript
K=h2-record-check.mjs; KC=730df3014bf31d2dc0770cb4d30a4a4a79e30afe; CX=c1834dcc689e94cf57fb123a09a0600225d8e97b428c648f14276136e3dd383f
REC=rollout-2026-11-15T23-45-25-01a1e2ac-9dcc-7432-a9bb-30415a36c620.jsonl
ACC="STOP REASON: $REC 2026-11-16T05:47:20.985Z: an exec input that does not parse"
KEYRE="sk-(cp|ant)-[A-Za-z0-9_-]{12,}|ghp_[A-Za-z0-9]{20,}|gho_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}"
UUIDRE="[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}"; EMRE="[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+([.][A-Za-z0-9-]+)*[.][A-Za-z]{2,}"
N6="read_mcp_resource|list_mcp_resource_templates|list_mcp_resources|view_image|codex_tui|spawn_agent"
PRL="m0-phase1-halt-1-report.md m0-phase1-report.md m0-phase1-script-fix-2-report.md m0-phase1-script-fix-report.md m0-phase2-final-report.md m0-phase2-report.md pr-body.md pr-title.txt "
test "$(uname -s)" = Darwin || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
echo "=== 1. the branch"
cd "$D"
test "$(git rev-parse HEAD)" = "$H" || die "HEAD is not $H"
test "$(git branch --show-current)" = "$BR" || die "not on $BR"
test -z "$(git status --porcelain --untracked-files=all)" || die "tree not clean: $(git status --porcelain --untracked-files=all | head -3 | tr "\n" " ")"
test "$(git stash list | wc -l | tr -d " ")" = 0 || die "a stash exists"
git merge-base --is-ancestor "$H1" "$H" || die "the Phase 1 head $H1 is not under $H"
test "$(git rev-list --count $B..$H)" = 8 && test "$(git rev-list --count $H1..$H)" = 3 || die "the branch does not hold five Phase 1 and three Phase 2 commits"
test "$(git rev-list --merges $B..$H | wc -l | tr -d " ")" = 0 || die "a merge commit"
for c in $(git rev-list --reverse $B..$H); do test "$(git log -1 --format=%an $c)" = daley40-lab || die "commit $c is not by daley40-lab"; git log -1 --format=%B $c | git interpret-trailers --parse | grep -qx "Actor-Id: session:codex/3b-m0-r1" || die "commit $c lacks the Actor-Id trailer"; done
git log --reverse --format="%H %s" $H1..$H
echo "=== 2. what Phase 2 changed (fourth message items 6 to 9)"
git diff --name-status $H1 $H > /tmp/m0p2.$$
NF=0; NT=0; NO=0
while IFS="$(printf "\t")" read -r st p; do
  case "$st:$p" in "A:$FX/"*) NF=$((NF+1));; "A:$PK"|"M:$BL") NO=$((NO+1));; A:packages/adapter-madv-surface/test/*.test.ts) case "$p" in */fixtures/*) die "a test file inside the fixtures: $p";; esac; NT=$((NT+1)); echo "new test file: $p";; *) die "Phase 2 changed a path outside items 6 to 9: $st $p";; esac
done < /tmp/m0p2.$$; rm -f /tmp/m0p2.$$
test "$NF" = 31 && test "$NT" = 1 && test "$NO" = 2 || die "Phase 2 holds $NF fixture files, $NT test files and $NO of the packet and the build log; expected 31, 1 and 2"
test "$(git diff -U0 $H1 $H -- "$BL" | grep "^-" | grep -vc "^--- " || true)" = 0 || die "a line of the build log above Phase 2 changed"
test "$(GIT_CONFIG_GLOBAL=/dev/null GIT_CONFIG_NOSYSTEM=1 git diff --check $B $H | wc -l | tr -d " ")" = 0 || die "git diff --check is not clean"
git diff --stat $H1 $H | tail -1
echo "=== 3. the fixtures against evidence/, byte for byte"
T=$(mktemp -d)
for host in macbook ubuntu; do for n in 03 04 05 06 07; do for x in stdout stderr status; do
  git show "$H:$FX/$host/$n.$x" > "$T/f" || die "$FX/$host/$n.$x is not at $H"
  cmp -s "$T/f" "$EV/$host/m0-investigation-$host/madv-surface/$n.$x" || die "$FX/$host/$n.$x differs from evidence/"; done; done; done
test "$(git ls-tree -r --name-only $H "$FX" | wc -l | tr -d " ")" = 31 || die "the fixtures folder does not hold 31 files"
echo "30 fixtures equal their evidence files; the list file is $(git ls-tree -r --name-only $H "$FX" | grep -v -E "/(macbook|ubuntu)/" )"
echo "=== 4. nothing secret or barred in what Phase 2 added"
git diff $H1 $H > "$T/diff"
n=$(grep -cE "$KEYRE" "$T/diff" || true); test "$n" = 0 || die "the Phase 2 diff holds $n key-like strings; push nothing, tell the drafting assistant this count"
n=$(grep -cE "$N6" "$T/diff" || true); test "$n" = 0 || die "the Phase 2 diff names one of the six names of Addendum 2 B4 on $n lines; push nothing"
git show "$H:$PK" > "$T/packet"; git ls-tree -r --name-only $H "$FX" | while IFS= read -r f; do git show "$H:$f"; done > "$T/fixtures"
for f in packet fixtures; do n=$(grep -cE "$UUIDRE" "$T/$f" || true); test "$n" = 0 || die "the $f holds $n UUID-shaped strings; push nothing"; done
n=$(grep -E "$EMRE" "$T/packet" | grep -vc "@users[.]noreply[.]github[.]com" || true); test "$n" = 0 || die "the packet holds $n lines with an email address; push nothing"
echo "no key-like string or barred name in the diff; no UUID in the packet or the fixtures; no email in the packet"
echo "=== 5. the builder folder"
test "$(LC_ALL=C ls "$Q" | tr "\n" " ")" = "$PRL" || die "pr/ holds: $(LC_ALL=C ls "$Q" | tr "\n" " ")"
for pair in m0-phase1-halt-1-report.md:4fef47b6a4f9c26e142347967f4e01b80758162e4fd0f6e6f2e3f79a36f44be4 m0-phase1-report.md:d7149838cd7efc497c5010ca9bd2edbe020faeb6ade2f2e3bc25c9c1bd28fa84 m0-phase1-script-fix-report.md:3cbc5e41d6252da93dd4cb20dab3a199bd32cb83b00d1b6a7d26c6a0a6666e51 m0-phase1-script-fix-2-report.md:b6799b4017362c30bd41ef59e25b2fc675edccbc00a66e582fc03f7d1be39102 m0-phase2-report.md:$XHR2 m0-phase2-final-report.md:$XFR; do test "$(h256 "$Q/${pair%%:*}")" = "${pair##*:}" || die "$Q/${pair%%:*} is not ${pair##*:}"; done
test "$(grep -c "[][]" "$Q/m0-phase2-final-report.md" || true)" = 0 && test "$(grep -cx -- "---" "$Q/m0-phase2-final-report.md" || true)" = 0 || die "the final report holds a square bracket or a bare three-hyphen line"
for f in m0-phase2-final-report.md pr-title.txt pr-body.md; do n=$(grep -cE "$KEYRE" "$Q/$f" || true); test "$n" = 0 || die "$f holds $n key-like strings; push nothing"; done
test "$(grep -c "" "$Q/pr-title.txt")" = 1 || die "pr-title.txt is not one line"
test "$(LC_ALL=C ls "$RD" | tr "\n" " ")" = "m0-record.ts " && test "$(h256 "$RD/m0-record.ts")" = "$XS" || die "record/ changed"
(cd "$P" && shasum -a 256 -c --status SHA256.txt) && test "$(grep -c "" "$P/SHA256.txt")" = 12 || die "prompt/ changed"
(cd "$EV" && shasum -a 256 -c --status SHA256.txt) && test "$(h256 "$EV/SHA256.txt")" = "$XEV" || die "evidence/ changed"
echo "final report $XFR; pr-title.txt $(h256 "$Q/pr-title.txt"); pr-body.md $(h256 "$Q/pr-body.md"); build log $(git show $H:$BL | shasum -a 256 | cut -c1-64); packet $(h256 "$T/packet")"
echo "=== 6. the session-record check (DEC-20261112-02 B5; Addendum 3 B2)"
test "$(pgrep -f "$CH/packages/app-server-daemon" | wc -l | tr -d " ")" = 0 || die "a governed background server or updater runs"
test "$(h256 "$RB")" = "$RX" || die "the Bun runtime is not the macOS certification runtime"
test "$(jq -r .version "$TSD/package.json")" = 5.9.3 || die "the TypeScript of the clone is not 5.9.3"
E=/Users/michaeldaley/builds/m0-record-check/phase2-$(date -u +%Y%m%dT%H%M%SZ); test ! -e "$E" || die "ALREADY EXISTS: $E"; mkdir -p "$E"
$G api "repos/$TR/contents/transfer/$K?ref=$KC" -H "Accept: application/vnd.github.raw" > "$E/$K"
test "$(h256 "$E/$K")" = "$CX" || die "the check at $KC is not the signed text"
"$RB" "$E/$K" selftest "$TSD" "$W" "$E/selftest-records" > "$E/selftest.txt" 2>&1 || true
test "$(tail -1 "$E/selftest.txt")" = SELFTEST_OK || { cat "$E/selftest.txt"; die "the self-test failed; nothing was pushed"; }
"$RB" "$E/$K" check "$TSD" "$W" "$S" > "$E/check.txt" 2>&1 || true
cat "$E/check.txt"
echo "=== 7. Addendum 3 B4: code from a string after the second message"
cat > "$E/b4-count.mjs" <<"B4COUNT_JS_5e2a"
// Counts, in the exec inputs of the one governed record of FOLDER, the calls of eval, Function,
// load and store after the first input that names the logs of the second and of the fourth message.
// It prints times and counts, and never an input, an output or a message.
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
const firstWith = s => { const c = execs.find(x => x.payload.input.includes(s)); return c ? c.timestamp : null; };
function parse(src) {
  const tries = [["cell.ts", ts.ScriptKind.TS, false], ["cell.js", ts.ScriptKind.JS, false], ["cell.ts", ts.ScriptKind.TS, true]];
  for (const [name, kind, wrap] of tries) {
    const text = wrap ? "(async () => {\n" + src + "\n})();\n" : src;
    const sf = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, kind);
    if ((sf.parseDiagnostics || []).length === 0) return { sf, wrap };
  }
  return null;
}
function forms(src) {
  const p = parse(src);
  if (!p) return null;
  const c = { eval: 0, Function: 0, load: 0, store: 0, computed: p.wrap ? -1 : 0 };
  const walk = n => {
    if (ts.isCallExpression(n) || ts.isNewExpression(n)) {
      const e = n.expression;
      let name = "(computed)";
      if (ts.isIdentifier(e)) name = e.text;
      else if (ts.isPropertyAccessExpression(e)) name = e.name.text;
      else if (ts.isElementAccessExpression(e) && ts.isStringLiteralLike(e.argumentExpression)) name = e.argumentExpression.text;
      if (name === "(computed)") c.computed++;
      else if (Object.prototype.hasOwnProperty.call(c, name)) c[name]++;
    }
    ts.forEachChild(n, walk);
  };
  walk(p.sf);
  return c;
}
let six = 0;
for (const x of execs) for (const n of SIX) six += x.payload.input.split(n).length - 1;
console.log("exec inputs in the record: " + execs.length + "; occurrences of the six names of Addendum 2 B4, as any substring, in all of them: " + six);
const old = execs.find(x => x.timestamp === "2026-11-16T05:47:20.985Z");
console.log("the input of Addendum 3 A3 item 2: " + (old ? old.payload.input.length + " characters, parses: " + (parse(old.payload.input) !== null) : "not found"));
let bad = six === 0 && old && old.payload.input.length === 10298 && parse(old.payload.input) === null ? 0 : 1;
const turns = items.filter(x => x.type === "turn_context").map(x => x.timestamp);
console.log("turns in the record: " + turns.length + "; the fourth turn, the first after the three of Phase 1 (Addendum 3 A2): " + (turns[3] || "none") + "; the first input naming logs/262-: " + (firstWith("logs/262-") || "none") + "; logs/385-: " + (firstWith("logs/385-") || "none"));
const m2 = firstWith("logs/262-");
const cut2 = turns[3] && m2 ? (turns[3] < m2 ? turns[3] : m2) : (turns[3] || m2);
const cut4 = turns.includes("2026-11-17T15:35:25.401Z") ? "2026-11-17T15:35:25.401Z" : null;
for (const [label, cut, decides] of [["the second message", cut2, true], ["the fourth message, for information only", cut4, false]]) {
  if (!cut) { console.log("after " + label + ": no starting point found"); if (decides) bad++; continue; }
  const after = execs.filter(x => x.timestamp >= cut);
  const tot = { eval: 0, Function: 0, load: 0, store: 0, computed: 0 };
  let unparsed = 0;
  for (const x of after) { const c = forms(x.payload.input); if (!c) { unparsed++; continue; } for (const k of Object.keys(tot)) tot[k] += c[k]; }
  console.log("after " + label + " (from " + cut + "): exec inputs " + after.length + ", not parsed " + unparsed + "; calls of eval " + tot.eval + ", Function " + tot.Function + ", load " + tot.load + ", store " + tot.store + "; calls through a computed callee " + tot.computed);
  if (decides && (unparsed + tot.eval + tot.Function + tot.load + tot.store) > 0) bad++;
}
console.log(bad === 0 ? "B4_OK" : "B4_STOP");
process.exit(bad === 0 ? 0 : 1);
B4COUNT_JS_5e2a
"$RB" "$E/b4-count.mjs" "$TSD" "$W" "$S" > "$E/b4.txt" 2>&1 || true
cat "$E/b4.txt"
(cd "$E" && find . -type f ! -name MANIFEST.sha256 | LC_ALL=C sort | xargs shasum -a 256 > MANIFEST.sha256)
echo "evidence: $E, MANIFEST.sha256 $(h256 "$E/MANIFEST.sha256")"
NS=$(grep -c "^STOP REASON: " "$E/check.txt" || true)
test "$(tail -1 "$E/check.txt")" = CHECK_OK || { test "$NS" = 1 && grep -qxF "$ACC" "$E/check.txt" && test "$(tail -1 "$E/check.txt")" = CHECK_STOP; } || die "the session-record check stopped on something Addendum 3 B2 does not accept; M0 halts for your ruling; nothing was pushed"
test "$(tail -1 "$E/b4.txt")" = B4_OK || die "Addendum 3 B4: a form of code from a string, or an input the count cannot read, after the second message; M0 halts for your ruling; nothing was pushed"
echo "the session record passes: the one stop Addendum 3 B2 accepts, and no form of Addendum 3 B4 after the second message"
echo "=== 8. GitHub"
test "$($G api user --jq .login)" = decivantiq || die "gh login is not decivantiq"
echo "main is $($G api repos/$TR/commits/main --jq .sha)"
test "$($G api "repos/$TR/git/ref/heads/$BR" --jq .object.sha)" = "$H1" || die "$BR on GitHub is not the Phase 1 head $H1"
test "$($G api "repos/$TR/pulls?head=MADVenturesLLC:$BR&state=all" --jq length)" = 0 || die "a pull request from $BR already exists"
UP="m0-phase2-final-report.md m0-phase2-report.md pr-title.txt pr-body.md record-check-phase2.txt b4-count-phase2.txt"
for nm in $UP; do if $G api "repos/$TR/contents/transfer/m0-r1/$nm?ref=$TB" >/dev/null 2>&1; then die "transfer/m0-r1/$nm already exists"; fi; done
echo CHECKS_OK
git -c credential.helper= -c "$CRED" push origin $H:refs/heads/$BR
test "$(git -c credential.helper= -c "$CRED" ls-remote origin refs/heads/$BR | cut -f1)" = "$H" || die "the pushed head differs"
echo "PUSHED $BR at $H (no pull request yet)"
U=$E/upload; mkdir "$U"; cp "$E/check.txt" "$U/record-check-phase2.txt"; cp "$E/b4.txt" "$U/b4-count-phase2.txt"
for f in "$Q/m0-phase2-final-report.md" "$Q/m0-phase2-report.md" "$Q/pr-title.txt" "$Q/pr-body.md" "$U/record-check-phase2.txt" "$U/b4-count-phase2.txt"; do nm=$(basename "$f"); base64 -i "$f" | tr -d "\n" > "$U/$nm.b64"
  jq -n --arg m "transfer: M0 Phase 2 evidence, $nm (Founder copy)" --arg b "$TB" --rawfile c "$U/$nm.b64" "{message:\$m,branch:\$b,content:\$c}" > "$U/$nm.json"
  c=$($G api -X PUT "repos/$TR/contents/transfer/m0-r1/$nm" --input "$U/$nm.json" --jq .commit.sha)
  test "$($G api "repos/$TR/contents/transfer/m0-r1/$nm?ref=$c" -H "Accept: application/vnd.github.raw" | shasum -a 256 | cut -c1-64)" = "$(h256 "$f")" || die "transfer/m0-r1/$nm on GitHub differs"
  echo "transfer/m0-r1/$nm $(h256 "$f") in $c"; done
echo "PHASE 2 CHECKED; $BR PUSHED AT $H; REPORTS ON $TB; paste this whole output to the drafting assistant"
' || echo STOPPED
