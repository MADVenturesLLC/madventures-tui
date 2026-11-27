cd ~ && bash -ec '
die() { echo "STOP: $1"; exit 1; }
h256() { shasum -a 256 "$1" | cut -c1-64; }
W=/Users/michaeldaley/builds/m1-r1; D=$W/tui; TB=claude/awesome-cray-vqrzbt
B=75aec139d503cbe1d34d0c6f3ac5bd514339570e; BB=60faaf8e35cf7f85078bccad73d563262736117b; BR=build/3b-m1-r1
FOUR="docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md docs/verification/phase-3a-correction-rounds.md"
L=/Users/michaeldaley/builds/codex-governed; LX=294fcf1521abf45990535ce49f26023d7357a84fdfb3411974fc29c11ed2d85a
G=/Users/michaeldaley/builds/codex-governed-0.167.0; JX=e14fc83739c13c1074b12bd1acce4010c893c7f6fbfc1593b4a31d74cabb57af; NX=030316ecfbb41f4e7946e584b0063ef333b7a36cd312ba349f2f6869e39b62cc
CH=/Users/michaeldaley/.codex-governed; CFG=$CH/config.toml; S=$CH/sessions
RB=/Users/michaeldaley/.bun/bin/bun; RX=35d20dd0263e5c950194434b925454fdfa9ba6e4467da960410fa05b08a7a5b5
F=builder-prompt-m1-codex-macbook.md; X=683951e9534f1517f68b690ceec554a3908a8dd6cebd2bd97f8791e56e6e4733
ACTS="AGENTS.md:0879ede2d3b07e137d1f3d5f75c131285277b44e61f1305d3d0d59da64f1dbca docs/decisions/DEC-20261013-03-tests-4-6-ruling.md:249e80e8e76c2168495353128569b63eff7a7d1bd321fc26156b749a4a8a9cf7 docs/decisions/DEC-20261015-03-m20-checkpoint-closure.md:e4148fde243d15508513fbf22b58584c519d1d842ca7fefb016d266bf6f08f61 docs/decisions/DEC-20261016-02-task46-correction.md:863f0b7bff5e7cc662bfc43084120d6fff39af07daa3117521bc85f887b8d3c9 docs/decisions/DEC-20261020-01-phase-3a-order-and-records.md:e5299202a83ad37e11fd619231422b41fc43779308531b62ae6a5cf06ee3c6b7 docs/decisions/DEC-20261023-01-standing-build-rules.md:bafa95f9835c0d14d633ec882234b247ac3ff6841452a28d20332520f41a7ac5 docs/decisions/DEC-20261024-01-separation-pin-rule.md:fa0d114dbe3a37db38a7538e9a5c33da42755a47250d7ae4069233043c6ac85e docs/decisions/DEC-20261027-01-m22-execution-authorization.md:86f1374492a833ce87ebdf81293c59e8805c547d8bc29e1aa682b17a769bcd8b docs/decisions/DEC-20261102-02-hardening-builds.md:04342fa77200737b676e51c6523b9813665b3303150309025be40178d9699550 docs/decisions/DEC-20261102-04-hardening-records-and-hardening-c.md:313bfedb64c0ff1eca5fa65024385bd3fc6400a63b3f616a1994de519fbffab2 docs/decisions/DEC-20261104-02-hardening-f-and-task58.md:011fb63332bd6c85bec4f9a9ec8a52e6805230dda690519a7406afcd371528c5 docs/decisions/DEC-20261108-01-phase-3b-approval.md:319ba65b340696d66a655e21f648fed742a9c38bcbb1d876776abc27a27a9738 docs/decisions/DEC-20261108-02-phase-3b-builder-qualification.md:38ec4066f5c9487547befc81e00b80b69126d9140f1e66c0a8dcb35e5fe815ef docs/decisions/DEC-20261108-03-addendum-10-second-verdict.md:d90d48718bc4ea6056af6f011f797a78eddcfd14e7111f15f823085c4388bca0 docs/decisions/DEC-20261108-03-addendum-11-governed-build.md:e2d28cbd12485e9025c928403eb7beead9552ee378b023ddf5bc9e18febe00df docs/decisions/DEC-20261108-03-addendum-2-codex-harness.md:e04b54065b0f0bb465b2d14e14a39f3b31f9cb34a874f6f8210a7d7e74a8c1c1 docs/decisions/DEC-20261108-03-addendum-3-image-tool.md:f2a0ef1063379902935760d9517b68d532cabf6e24699cdebb789681f78ce15e docs/decisions/DEC-20261108-03-addendum-4-sandbox-halt.md:e817470aea6be2c176d4ae75856fd793ef982bd28c9eb793df9c9038a5c1dfbc docs/decisions/DEC-20261108-03-addendum-5-own-work.md:e86e94a62c7067e4656114afe1713c1478814ffe446d1ffcc8b788accfc3ff3d docs/decisions/DEC-20261108-03-addendum-6-names-in-text.md:24cef0ed5c968aa80ada586e473526d0f4f0b1de1331eba1d5a35051b1254ac9 docs/decisions/DEC-20261108-03-phase-3b-h1.md:10cdc674ce746568c963aa2c5c34c95a69d9960ea469438b044bfb5fe4b9e9de docs/decisions/DEC-20261108-04-addendum-1-corrections.md:90e2f541fd0a232390ca0554067a2de8b37f15c933016eafe40ebde2cd2eff17 docs/decisions/DEC-20261108-04-phase-3b-standing-commission.md:d373235e424bd7fbe4c1c5b1c5f4954eb1b02165db4e1365d9cfa1533aa93b29 docs/decisions/DEC-20261112-02-model-record.md:3151cb9e178e918f0c07f5a4eb9931fa9d529debedf0ad4d91f5999844883da7 docs/decisions/DEC-20261112-03-addendum-2-gate-repeat.md:829248f1e2557ddbcfd33d6456f7056bfce73a008791cb88caa9660a5d979d29 docs/decisions/DEC-20261113-01-h2-records-and-merge.md:41e27eafc24a2eef238c080d1374b90fbe22d609f4ef5cbb66e07cccb5b347a5 docs/decisions/DEC-20261114-01-madv-surface-release.md:6bffc2c18927b90f4b5042f312947e5d39853ca53404a58a51b4602eb45652b8 docs/decisions/DEC-20261115-02-addendum-3-phase-1-record-check.md:24f76dbb631d6058e81ccff93d3c9fecb11521b5a876c687ec0da1ee0f9e0a23 docs/decisions/DEC-20261115-02-addendum-5-retired-id-plugin-and-json.md:666a82b2229272111f4d01b79c6ffba401a53f5236ae50f7f7c6a4b3651cd9ac docs/decisions/DEC-20261115-02-addendum-6-ubuntu-check.md:2dac9e9acdcc4da16e80a60aff90d0b3079ee2558c29433cfafe7dcc9f0f8b26 docs/decisions/DEC-20261115-02-phase-3b-m0.md:5d8bd4a446d8b3120bddbc34dc11a5fdf83e3a07d9efcd04fbd7b8efdad8d22b docs/decisions/DEC-20261119-01-m0-records-and-merge.md:7076137d68f013705d8872eaf573cb13ee17319b9074bc20248d02a2d6316df2 docs/decisions/DEC-20261119-02-managed-settings-branch.md:4149189677cccac7feedc948efdd217e8cdcc7c620cb11062832a718f976e9c7 docs/decisions/DEC-20261119-03-madv-surface-0.1.2-release.md:6823c07f50567a62abee020de693e192cc43ff47a75871e5bfad5bd16e671d9b docs/decisions/DEC-20261121-02-addendum-1-recorded-captures-and-anthropic.md:b6b9563ed1a2e154b4ef3b4d9ffe7666e6fd9870d82b87486f772d65f7f167aa docs/decisions/DEC-20261121-02-addendum-2-registry-digest.md:5dc0fddf411f8abce1e20df834ce21d0676b1fcd538fe12ad3d49a34ffa8be81 docs/decisions/DEC-20261121-02-madv-surface-admission.md:141ee53275999ba3f31a0b1f66bed93ffb7a80d6f3527cbff31b3885ead44dfe docs/decisions/DEC-20261123-01-madv-surface-admission-records-and-m1.md:e0f08199567641f47eba567ac0653bfc8f1ed9315b3ddfca8074d535b294cb8e docs/decisions/PLAN-OPEN-2-environment-allowlists.md:b60676aa47b216c36d9080c884650943cdac93dd12109d2864ebcf0eb6887d8c docs/superpowers/plans/2026-09-19-phase-3b-live-tui-integration.md:a48bf5457bf17cf5d554e541c5bb3609efacf6ad170ad6e56950b829a4269ccc docs/superpowers/specs/2026-08-12-phase-3a-runtime-foundation-design.md:472f3179c20f7f41c0e3feb5a65842bf3774cf6df01e8684a3ea86dcd811bce0 docs/superpowers/specs/2026-09-19-phase-3b-live-tui-integration-design.md:da8f4c8c35f617898368b340d710188686c9dc9faf2b23c4a6b284c1bb4d93fc"
test "$(uname -sm)" = "Darwin arm64" || die "run this on the MacBook"
command -v jq >/dev/null || die "jq not found"
test ! -e "$W" || die "ALREADY EXISTS: $W"
echo "=== no process works in or names the harness folders (DEC-20261113-01 B6; counts only)"
A="madv-"; A="/Users/michaeldaley/${A}harness"
BUSY=""; for p in $(lsof -a -d cwd -u "$(id -u)" -Fpn 2>/dev/null | awk -v a="$A" "/^p/{p=substr(\$0,2)} /^n/{d=substr(\$0,2); if (d==a || index(d, a \"/\")==1 || index(d, a \"-\")==1) print p}"); do c=$(ps -o ucomm= -p "$p" 2>/dev/null | tr -d " "); case "$c" in ""|zsh|-zsh|bash|-bash|sh|-sh|fish|-fish|login) ;; *) BUSY="$BUSY $c";; esac; done
NC=$(echo $BUSY | wc -w | tr -d " ")
NP=$(pgrep -f "$A" | wc -l | tr -d " ")
echo "programs working in them, idle shells not counted: $NC$BUSY; naming them: $NP"
test "$NC" = 0 && test "$NP" = 0 || die "stop what works in or names the madv-harness folders first"
echo "=== the governed build and launcher (Addendum 11 B1 to B3; Addendum 10 B5)"
test "$(h256 "$L")" = "$LX" || die "the launcher is not the one of Addendum 11 B3"
test "$(h256 "$G/node_modules/@openai/codex/bin/codex.js")" = "$JX" || die "codex.js is not that of Addendum 11 A5"
test "$(h256 "$G/node_modules/@openai/codex-darwin-arm64/vendor/aarch64-apple-darwin/bin/codex")" = "$NX" || die "the governed executable is not that of Addendum 11 A5"
V=$("$L" --version 2>&1 | tail -1); echo "launcher: $V"; test "$V" = "codex-cli 0.167.0" || die "the launcher stopped or is not codex-cli 0.167.0"
test "$(grep -c "^web_search = \"disabled\"" "$CFG" || true)" = 1 || die "web_search is not disabled in the governed config"
test "$(grep -c "^\[mcp_servers" "$CFG" || true)" = 0 || die "the governed config has an MCP server"
ON=$("$L" features list | grep -E "^(multi_agent|multi_agent_v2|image_generation|goals|browser_use|browser_use_external|browser_use_full_cdp_access|in_app_browser|skill_mcp_dependency_install|tool_suggest|in_app_local_automation|daemon_auto_start|in_app_updates) " | grep -c -E " true *$" || true)
test "$ON" = 0 || die "a hardened feature is on again"
PC=$(pgrep -f "$CH/packages/app-server-daemon" | wc -l | tr -d " "); test "$PC" = 0 || die "a governed background server or updater runs (count $PC)"
echo "governed build 0.167.0, launcher, config and no background server: OK"
echo "=== the runtime and the load"
test "$(h256 "$RB")" = "$RX" || die "the Bun runtime is not the macOS certification runtime"
test "$("$RB" --version)" = 1.4.2 || die "bun is not 1.4.2"
echo "bun 1.4.2 $RX; load: $(uptime)"
echo "=== no governed session has started in $W"
n=0; for f in $(find "$S" -type f -name "rollout-*.jsonl" | LC_ALL=C sort); do c=$(jq -r "select(.type==\"session_meta\") | .payload.cwd // empty" "$f" | head -1); if [ "$c" = "$W" ]; then n=$((n+1)); fi; done
test "$n" = 0 || die "a governed session record already names $W"
echo "=== the clone of madventures-tui"
mkdir -p "$W/logs" "$W/pr" "$W/prompt" "$W/evidence"; chmod 700 "$W"
git clone -q https://github.com/MADVenturesLLC/madventures-tui.git "$D"
cd "$D"
case "$(git remote get-url origin)" in https://*) ;; *) die "origin is not https";; esac
git config user.name daley40-lab
git config user.email 293512385+daley40-lab@users.noreply.github.com
git fetch -q origin main $TB
OM=$(git rev-parse origin/main)
test "$OM" = "$B" || die "madventures-tui main is $OM, not $B"
test "$(git rev-parse "$B^1")" = "$BB" || die "the first parent of $B is not $BB"
test "$(git diff --name-only $BB $B | tr "\n" " " | sed "s/ $//")" = "$FOUR" || die "$B changes more than the four filed paths since $BB"
test -z "$(git ls-remote --heads origin $BR)" || die "$BR already exists on GitHub"
for pair in $ACTS; do p=${pair%%:*}; test "$(git show "$OM:$p" 2>/dev/null | shasum -a 256 | cut -c1-64)" = "${pair##*:}" || die "$p on main differs from the hash the prompt names"; done
echo "the $(echo $ACTS | wc -w | tr -d " ") authority files of the prompt match main: OK"
git switch -q -c $BR "$B"
test "$(git rev-parse HEAD)" = "$B" || die "HEAD is not $B"
test -z "$(git status --porcelain)" || die "tree not clean"
test ! -e docs/verification/phase-3b-m1-build-log.md && test ! -e docs/verification/phase-3b-m1-evidence.md && test ! -e apps/madbridge/src/tui/live && test ! -e test/phase3b && test ! -e scripts/phase3b || die "the base already has a path M1 creates"
echo "=== the signed prompt, from the transfer branch"
for t in "$F:$F:$X"; do nm=${t%%:*}; r=${t#*:}; tp=${r%%:*}; TC=$(git log -1 --format=%H "origin/$TB" -- "transfer/$tp"); test -n "$TC" || die "$tp is not on $TB"; git show "$TC:transfer/$tp" > "$W/prompt/$nm"; test "$(h256 "$W/prompt/$nm")" = "${t##*:}" || die "$tp at $TC is not the signed text"; echo "$nm from $TC"; done
(cd "$W/prompt" && shasum -a 256 "$F" > SHA256.txt)
chmod 444 "$W/prompt"/*; chmod 555 "$W/prompt"
test -z "$(ls -A "$W/logs")" && test -z "$(ls -A "$W/pr")" && test -z "$(ls -A "$W/evidence")" || die "logs, pr or evidence not empty"
pbcopy < "$W/prompt/$F"
test "$(pbpaste | shasum -a 256 | cut -c1-64)" = "$X" || die "clipboard differs from the prompt"
echo "SETUP OK: $D on $(git branch --show-current) at $(git rev-parse HEAD) as $(git config user.name); main $OM; prompt SHA256.txt $(h256 "$W/prompt/SHA256.txt"); builder prompt COPIED"
' || echo STOPPED
