#!/usr/bin/env python3
"""Ubuntu PC investigation run under DEC-20261012-02 B2 and B3.

Read with item 3 of the Founder's merge authorization for PR #139: for each
runtime, the run records the executable's absolute path, --version,
Bun.revision and the binary's SHA-256 before any test runs with it.

Run by the Founder on the Ubuntu PC, after DEC-20261012-02 is on main:

    python3 -I ~/ubuntu-b7-run.py

What it does, in the order of B2:
  1. clones the repository into a new directory, detached at origin/main, and
     checks that DEC-20261012-02 is on that commit; no existing checkout is used
  2. bun install --frozen-lockfile with the stock Bun; tree and lockfile must
     stay clean (the founder-act mode flip is restored and recorded); then
     records the stock runtime's identity, which must report 1.4.2
  3. fetches the custodied runtime read-only from os-governed-artifacts with
     the Founder's own gh sign-in, checks the custody commit, the manifest and
     the revision, extracts the Linux binary inside its own directory, and
     records its identity; it is called by full path only
  4. records public upstream facts about Bun pull request 40304 and Bun 1.4.2
  5. runs each of tests 4, 5 and 6 alone, three times with Bun 1.4.2 and then
     three times with the custodied binary
  6. runs bun test test/phase3a once and the full suite once with the
     custodied binary
  7. checks git status --porcelain is empty
Test results in items 5 and 6 are recorded, not judged. A failure in items 1
to 4 or 7 stops the run and writes STOPPED.txt; otherwise the report is
written under the evidence folder. Nothing is pushed or changed in either
repository. No token is printed or stored.
"""

import hashlib
import json
import os
import re
import stat
import subprocess
import sys
import zipfile
from datetime import datetime, timezone

HOME = "/home/michaeldaley"
EVIDENCE = os.path.join(HOME, "ubuntu-b7-evidence")
WORKTREE = os.path.join(HOME, "madventures-tui-b7-run")
CUSTODY = os.path.join(HOME, "ubuntu-b7-custody")
REPO_URL = "https://github.com/MADVenturesLLC/madventures-tui.git"
ACT_PATH = "docs/decisions/DEC-20261012-02-ubuntu-tests-4-6-investigation.md"
ACT_SHA256 = "c1383d518b54b9cb7e885dd649df39ac82740d973196ba8c89fce834fffa3660"
STOCK_VERSION = "1.4.2"
CUSTODY_REPO = "MADVenturesLLC/os-governed-artifacts"
CUSTODY_TAG = "intake/bun-pr40304-69cb78c9097cebd3bdb832d9fff8b7d23abce09e/v1"
CUSTODY_COMMIT = "3b5775a57da95ad6446e68036746b6308a0d5904"
CUSTODY_REVISION = "69cb78c9097cebd3bdb832d9fff8b7d23abce09e"
CUSTODY_ZIP = "bun-linux-x64.zip"
UPSTREAM = "oven-sh/bun"
UPSTREAM_PR = "40304"
FOUNDER_ACT_MAIN = "packages/founder-act/src/main.ts"
STEP_TIMEOUT_S = 1800
REPEATS = 3

TESTS = [
    ("4", "packages/broker/test/pty-host-supervisor.test.ts",
     "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)"),
    ("5", "packages/pty-host/test/main-guard.test.ts",
     "natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once"),
    ("6", "packages/pty-host/test/main-guard.test.ts",
     "early child output cannot precede launched and ready, and is required, not merely allowed"),
]

FAIL_LINE = re.compile(r"^\(fail\) (.+?) \[([\d.]+)(ms|s)\]$")
CRITERION = re.compile(r"(\w+)=(\d+)ms\((pass|FAIL)\)")


class Stop(Exception):
    pass


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def run(cmd, cwd=None, env=None, timeout=STEP_TIMEOUT_S, merge=True):
    """Run a command; return (exit code, stdout text, stderr text)."""
    p = subprocess.run(cmd, cwd=cwd, env=env, timeout=timeout,
                       stdout=subprocess.PIPE,
                       stderr=subprocess.STDOUT if merge else subprocess.PIPE)
    out = p.stdout.decode("utf-8", "replace")
    err = "" if merge else p.stderr.decode("utf-8", "replace")
    return p.returncode, out, err


def founder_env():
    """The Founder's environment without GH_TOKEN, so gh uses the Founder's own sign-in."""
    env = dict(os.environ)
    env.pop("GH_TOKEN", None)
    env.pop("GITHUB_TOKEN", None)
    return env


def save(name, text):
    path = os.path.join(EVIDENCE, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return path


def git(*args, repo=WORKTREE):
    return run(["git", "-C", repo, *args], merge=False)


def status():
    code, out, err = git("status", "--porcelain")
    if code != 0:
        raise Stop("git status failed: " + err.strip())
    return out


def bun_summary(text):
    get = lambda pat: (re.findall(pat, text, re.M) or [None])[-1]
    return {
        "pass": get(r"^\s*(\d+) pass$"),
        "fail": get(r"^\s*(\d+) fail$"),
        "expect": get(r"^\s*(\d+) expect\(\) calls$"),
        "errors": get(r"^\s*(\d+) errors?$"),
        "ran": get(r"^(Ran \d+ tests? across \d+ files?\..*)$"),
    }


def failing_names(text):
    seen = []
    for line in text.splitlines():
        m = FAIL_LINE.match(line)
        if m and m.group(1) not in seen:
            seen.append(m.group(1))
    return seen


def js_regex_escape(text):
    return re.sub(r"([\\^$.*+?()\[\]{}|/])", r"\\\1", text)


def runtime_identity(label, path):
    """Path, --version, Bun.revision and SHA-256; any missing field stops the run."""
    if not path or not os.path.isfile(path) or not os.access(path, os.X_OK):
        raise Stop(f"{label} runtime: no executable at {path!r}")
    real = os.path.realpath(path)
    code, version, _ = run([real, "--version"], cwd=EVIDENCE, timeout=60, merge=False)
    code2, revision, _ = run([real, "-e", "process.stdout.write(Bun.revision)"], cwd=EVIDENCE, timeout=60, merge=False)
    ident = {
        "path": real,
        "version": version.strip() if code == 0 else "",
        "revision": revision.strip() if code2 == 0 else "",
        "sha256": sha256_file(real),
    }
    for k, v in ident.items():
        if not v:
            raise Stop(f"{label} runtime: field {k} missing or unreadable")
    return ident


def gh_api(path):
    code, out, err = run(["gh", "api", path], env=founder_env(), timeout=120, merge=False)
    if code != 0:
        raise Stop(f"gh api {path} failed: {err.strip()[:300]}")
    return json.loads(out)


def upstream_facts(stock_revision):
    pr = gh_api(f"repos/{UPSTREAM}/pulls/{UPSTREAM_PR}")
    facts = {
        "pr_title": pr.get("title"),
        "pr_state": pr.get("state"),
        "pr_merged": pr.get("merged"),
        "pr_merge_commit": pr.get("merge_commit_sha") if pr.get("merged") else None,
    }
    anchor = facts["pr_merge_commit"] or CUSTODY_REVISION
    facts["anchor"] = anchor
    release = None
    for tag in ("bun-v" + STOCK_VERSION, "v" + STOCK_VERSION):
        code, out, _ = run(["gh", "api", f"repos/{UPSTREAM}/releases/tags/{tag}"],
                           env=founder_env(), timeout=120, merge=False)
        if code == 0:
            release = json.loads(out)
            break
    if release is None:
        raise Stop(f"no {UPSTREAM} release found for {STOCK_VERSION}")
    tag = release["tag_name"]
    facts["release_tag"] = tag
    facts["release_published_at"] = release.get("published_at")
    ref = gh_api(f"repos/{UPSTREAM}/git/ref/tags/{tag}")
    obj = ref["object"]
    if obj["type"] == "tag":
        obj = gh_api(f"repos/{UPSTREAM}/git/tags/{obj['sha']}")["object"]
    facts["release_commit"] = obj["sha"]
    for key, commit in (("release_contains_anchor", facts["release_commit"]),
                        ("stock_revision_contains_anchor", stock_revision)):
        cmp = gh_api(f"repos/{UPSTREAM}/compare/{anchor}...{commit}")
        st = cmp.get("status")
        facts[key] = {"ahead": "yes", "identical": "yes", "behind": "no", "diverged": "no"}.get(st, f"undetermined ({st})")
    return facts


def main():
    started = datetime.now(timezone.utc)
    script_sha = sha256_file(os.path.abspath(__file__))
    for d in (EVIDENCE, WORKTREE, CUSTODY):
        if os.path.exists(d):
            print(f"STOPPED: {d} already exists; nothing was done")
            return 1
    os.makedirs(EVIDENCE, mode=0o700)
    notes = []
    commands = []
    results = []

    def step(label, cmd, name, **kw):
        commands.append(label)
        code, out, err = run(cmd, **kw)
        save(name, out if not err else out + "\n--- stderr ---\n" + err)
        return code, out, err

    try:
        save("run-start.txt", f"started {started.isoformat()}\nrun script SHA-256 {script_sha}\n")

        # Item 1: fresh clone at origin/main; the act must be on it.
        code, _, _ = step("git clone https://github.com/MADVenturesLLC/madventures-tui.git <worktree>",
                          ["git", "clone", "-q", REPO_URL, WORKTREE], "clone.txt")
        if code != 0:
            raise Stop("clone failed")
        code, _, err = git("-c", "advice.detachedHead=false", "checkout", "-q", "--detach", "origin/main")
        commands.append("git checkout --detach origin/main")
        if code != 0:
            raise Stop("detach failed: " + err.strip())
        candidate = git("rev-parse", "HEAD")[1].strip()
        if candidate != git("rev-parse", "origin/main")[1].strip() or not re.fullmatch(r"[0-9a-f]{40}", candidate):
            raise Stop("HEAD is not origin/main")
        act = os.path.join(WORKTREE, ACT_PATH)
        if not os.path.isfile(act) or sha256_file(act) != ACT_SHA256:
            raise Stop("DEC-20261012-02 is not on origin/main with the signed hash")
        if status():
            raise Stop("worktree not clean after clone")

        # Item 2: frozen install with the stock runtime, then its identity.
        stock_path = run(["sh", "-c", "command -v bun"])[1].strip()
        code, _, _ = step("bun install --frozen-lockfile (stock runtime)", [stock_path or "bun", "install", "--frozen-lockfile"],
                          "install.txt", cwd=WORKTREE)
        if code != 0:
            raise Stop(f"bun install exited {code}")
        after = status()
        save("status-after-install.txt", after)
        if after:
            summary = git("diff", "--summary")[1]
            content = git("diff", "--", FOUNDER_ACT_MAIN)[1]
            changed = [l for l in content.splitlines() if re.match(r"^[+-](?![+-])", l)]
            if (after == f" M {FOUNDER_ACT_MAIN}\n"
                    and summary.strip() == f"mode change 100644 => 100755 {FOUNDER_ACT_MAIN}"
                    and not changed):
                os.chmod(os.path.join(WORKTREE, FOUNDER_ACT_MAIN), 0o644)
                notes.append(f"`bun install` turned `{FOUNDER_ACT_MAIN}` to mode 100755; the run restored 100644 (DEC-20261011-02 B4 item 2).")
                if status():
                    raise Stop("worktree not clean after restoring the founder-act mode")
            else:
                raise Stop("bun install changed the worktree")
        if git("diff", "--", "bun.lock", "package.json")[1]:
            raise Stop("bun.lock or package.json changed")
        stock = runtime_identity("stock", stock_path)
        commands.append("stock runtime identity (path, --version, Bun.revision, SHA-256)")
        if stock["version"] != STOCK_VERSION:
            raise Stop(f"stock runtime reports {stock['version']}, not {STOCK_VERSION}")

        # Item 3: the custodied runtime, read-only, in its own directory.
        code, _, _ = step(f"gh repo clone {CUSTODY_REPO} <custody> -- --depth 1 --branch {CUSTODY_TAG}",
                          ["gh", "repo", "clone", CUSTODY_REPO, CUSTODY, "--", "-q", "--depth", "1", "--branch", CUSTODY_TAG],
                          "custody-clone.txt", env=founder_env(), timeout=600)
        if code != 0:
            raise Stop("custody clone failed")
        head = git("rev-parse", "HEAD", repo=CUSTODY)[1].strip()
        if head != CUSTODY_COMMIT:
            raise Stop(f"custody tag resolves to {head}, not {CUSTODY_COMMIT}")
        code, out, _ = step("sha256sum -c MANIFEST.sha256 (in the custody directory)",
                            ["sha256sum", "-c", "MANIFEST.sha256"], "custody-manifest.txt", cwd=CUSTODY)
        if code != 0:
            raise Stop("custody manifest did not verify")
        manifest_lines = [l for l in out.splitlines() if l.strip()]
        zpath = os.path.join(CUSTODY, CUSTODY_ZIP)
        if not os.path.isfile(zpath):
            raise Stop(f"{CUSTODY_ZIP} missing from the custody tag")
        extract_dir = os.path.join(CUSTODY, "qrt")
        with zipfile.ZipFile(zpath) as z:
            z.extractall(extract_dir)
        commands.append(f"extract {CUSTODY_ZIP} into <custody>/qrt")
        bins = [os.path.join(r, f) for r, _, fs in os.walk(extract_dir) for f in fs if f == "bun"]
        if len(bins) != 1:
            raise Stop(f"expected one bun binary in the archive, found {len(bins)}")
        custody_bin = bins[0]
        os.chmod(custody_bin, os.stat(custody_bin).st_mode | stat.S_IXUSR)
        custody = runtime_identity("custodied", custody_bin)
        commands.append("custodied runtime identity (path, --version, Bun.revision, SHA-256)")
        if custody["revision"] != CUSTODY_REVISION:
            raise Stop(f"custodied runtime reports revision {custody['revision']}, not {CUSTODY_REVISION}")
        save("runtimes.txt", json.dumps({"stock": stock, "custodied": custody}, indent=2) + "\n")

        # Item 4: public upstream facts.
        facts = upstream_facts(stock["revision"])
        commands.append(f"upstream facts from the GitHub API ({UPSTREAM} pull {UPSTREAM_PR}, release {STOCK_VERSION}, compare)")
        save("upstream.txt", json.dumps(facts, indent=2) + "\n")

        # Item 5: tests 4 to 6 alone, three times per runtime. Recorded, not judged.
        for label, ident in (("stock", stock), ("custodied", custody)):
            for num, path, name in TESTS:
                for k in range(1, REPEATS + 1):
                    code, out, _ = run([ident["path"], "test", path, "-t", js_regex_escape(name)],
                                       cwd=WORKTREE, timeout=300)
                    fname = f"test{num}-{label}-{k}.txt"
                    save(fname, out)
                    s = bun_summary(out)
                    results.append((label, num, k, code, s["pass"], s["fail"], s["ran"]))
        commands.append(f"tests 4, 5 and 6 alone, {REPEATS} times each with the stock runtime, then {REPEATS} times each with the custodied runtime")

        # Item 6: phase3a and the full suite with the custodied runtime. Recorded, not judged.
        code, out, _ = step("custodied `bun test test/phase3a`", [custody["path"], "test", "test/phase3a"],
                            "custodied-phase3a.txt", cwd=WORKTREE)
        p3 = (code, bun_summary(out), [l for l in out.splitlines() if l.startswith("[spike]")])
        code, out, _ = step("custodied `bun test` (full suite)", [custody["path"], "test"],
                            "custodied-full-suite.txt", cwd=WORKTREE)
        full = (code, bun_summary(out), failing_names(out))

        # Item 7: clean at the end.
        final = status()
        save("status-final.txt", final)
        commands.append("`git status --porcelain`")
        if final:
            raise Stop("worktree not clean at the end")

    except Stop as e:
        save("STOPPED.txt", f"{e}\n")
        print(f"STOPPED: {e}\nEvidence kept in {EVIDENCE}. No report was written.")
        return 1
    except subprocess.TimeoutExpired as e:
        save("STOPPED.txt", f"timeout: {e}\n")
        print(f"STOPPED: a step timed out. Evidence kept in {EVIDENCE}. No report was written.")
        return 1

    out = []
    w = out.append
    w("# Tests 4 to 6 Investigation Report — Founder's Ubuntu PC")
    w("")
    w(f"`DEC-20261012-02` B3 host-authored report, read with item 3 of the merge authorization for PR #139. Generated on this host on {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}")
    w(f"by the run script (SHA-256 `{script_sha}`, operator: Founder), exclusively from this host's own retained run evidence listed at the end.")
    w("Test results are recorded, not judged.")
    w("")
    w(f"Candidate SHA: {candidate}")
    w(f"Branch: main (fresh clone at `{WORKTREE}`, detached at `origin/main`)")
    for n in notes:
        w(f"Note: {n}")
    w("")
    w("## Runtimes")
    w("")
    w("| Field | Stock | Custodied |")
    w("| --- | --- | --- |")
    for k in ("path", "version", "revision", "sha256"):
        w(f"| {k} | `{stock[k]}` | `{custody[k]}` |")
    w("")
    w(f"Custody source: `{CUSTODY_REPO}` tag `{CUSTODY_TAG}`, commit `{CUSTODY_COMMIT}`; `MANIFEST.sha256` verified ({len(manifest_lines)} of {len(manifest_lines)} entries OK); binary extracted from `{CUSTODY_ZIP}` and called by full path only.")
    w("")
    w("## Upstream facts (GitHub API, read-only)")
    w("")
    for k, v in facts.items():
        w(f"- {k}: `{v}`")
    w("")
    w("## Tests 4 to 6 run alone")
    w("")
    w("| Runtime | Test | Run | Exit | Pass | Fail | Summary |")
    w("| --- | --- | --- | --- | --- | --- | --- |")
    for label, num, k, code, ps, fl, ran in results:
        w(f"| {label} | {num} | {k} | {code} | {ps} | {fl} | {ran} |")
    w("")
    w("## Custodied runtime: phase3a and full suite")
    w("")
    c, s, spk = p3
    w(f"`bun test test/phase3a`: exit {c}, {s['pass']} pass / {s['fail']} fail / {s['expect']} expect() calls — {s['ran']}")
    w("")
    out.extend(spk)
    w("")
    c, s, fails = full
    w(f"`bun test` (full suite): exit {c}, {s['pass']} pass / {s['fail']} fail / {s['expect']} expect() calls — {s['ran']}")
    w("")
    if fails:
        w("Failing tests:")
        w("")
        for f in fails:
            w(f"- {f}")
    else:
        w("No test failed.")
    w("")
    w("## Exact commands")
    w("")
    for i, cmd in enumerate(commands, start=1):
        w(f"{i}. {cmd}")
    w("")
    w(f"## Retained source evidence on this host (`{EVIDENCE}`)")
    w("")
    for name in sorted(os.listdir(EVIDENCE)):
        if os.path.isfile(os.path.join(EVIDENCE, name)):
            w(f"- `{name}` SHA-256 `{sha256_file(os.path.join(EVIDENCE, name))}`")
    body = "\n".join(out) + "\n"
    digest = hashlib.sha256(body.encode("utf-8")).hexdigest()
    report_dir = os.path.join(EVIDENCE, "report")
    os.makedirs(report_dir, mode=0o700)
    report_path = os.path.join(report_dir, f"{started.strftime('%Y-%m-%d')}-tests-4-6-investigation-ubuntu.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(body + f"Report SHA-256: {digest}\n")
    print(f"COMPLETE: report written to {report_path}")
    print(f"report file SHA-256 {sha256_file(report_path)}; Report SHA-256 line {digest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
