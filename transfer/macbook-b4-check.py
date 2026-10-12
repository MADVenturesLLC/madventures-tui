#!/usr/bin/env python3
"""MacBook check of tests 4 to 6 under DEC-20261012-03 B4.

Run by the Founder on the MacBook, after DEC-20261012-03 is on main:

    python3 -I ~/macbook-b4-check.py

What it does, in the order of B4:
  1. clones the repository into a new directory, detached at origin/main, and
     checks that DEC-20261012-03 is on that commit; no existing checkout is used
  2. records the Bun on PATH (absolute path, --version, Bun.revision, SHA-256)
     and the node on PATH (absolute path, --version) before any test; it stops
     if Bun does not report 1.4.2, if node is missing, or if any field is
     missing or unreadable
  3. bun install --frozen-lockfile; tree and lockfile must stay clean (the
     founder-act mode flip is restored and recorded)
  4. runs each of tests 4, 5 and 6 alone, three times
  5. checks git status --porcelain is empty
It also records the host's macOS version and architecture, TERM, and whether
standard input is a terminal. Test results in item 4 are recorded, not judged.
A failure in items 1 to 3 or 5 stops the run and writes STOPPED.txt; otherwise
the report is written under the evidence folder. Nothing is pushed or changed
in the repository, nothing is fetched from os-governed-artifacts, and gh is
not used.
"""

import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone

HOME = "/Users/michaeldaley"
EVIDENCE = os.path.join(HOME, "macbook-b4-evidence")
WORKTREE = os.path.join(HOME, "madventures-tui-b4-macbook-run")
REPO_URL = "https://github.com/MADVenturesLLC/madventures-tui.git"
ACT_PATH = "docs/decisions/DEC-20261012-03-tests-4-6-cause-and-fix.md"
ACT_SHA256 = "e91b25f4fbb0f23101f96793afe3a85951372efbc83148602e38ccb2a873c4f1"
STOCK_VERSION = "1.4.2"
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
        "ran": get(r"^(Ran \d+ tests? across \d+ files?\..*)$"),
    }


def js_regex_escape(text):
    return re.sub(r"([\\^$.*+?()\[\]{}|/])", r"\\\1", text)


def which(name):
    return run(["sh", "-c", f"command -v {name}"], merge=False)[1].strip()


def bun_identity(path):
    """Path, --version, Bun.revision and SHA-256; any missing field stops the run."""
    if not path or not os.path.isfile(path) or not os.access(path, os.X_OK):
        raise Stop(f"bun: no executable on PATH ({path!r})")
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
            raise Stop(f"bun: field {k} missing or unreadable")
    return ident


def node_identity(path):
    if not path or not os.path.isfile(path) or not os.access(path, os.X_OK):
        raise Stop("node: not found on PATH")
    real = os.path.realpath(path)
    code, version, _ = run([real, "--version"], cwd=EVIDENCE, timeout=60, merge=False)
    if code != 0 or not version.strip():
        raise Stop("node: --version missing or unreadable")
    return {"path": real, "version": version.strip()}


def host_facts():
    facts = {}
    for key, cmd in (("product", ["sw_vers", "-productName"]),
                     ("product_version", ["sw_vers", "-productVersion"]),
                     ("build", ["sw_vers", "-buildVersion"]),
                     ("arch", ["uname", "-m"]),
                     ("kernel", ["uname", "-r"])):
        try:
            code, out, _ = run(cmd, timeout=30, merge=False)
        except OSError:
            code, out = 1, ""
        facts[key] = out.strip() if code == 0 and out.strip() else "unreadable"
    facts["term"] = os.environ.get("TERM", "unset")
    facts["stdin_is_terminal"] = "yes" if sys.stdin.isatty() else "no"
    return facts


def main():
    started = datetime.now(timezone.utc)
    script_sha = sha256_file(os.path.abspath(__file__))
    for d in (EVIDENCE, WORKTREE):
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
        host = host_facts()
        save("host.txt", json.dumps(host, indent=2) + "\n")
        commands.append("host facts (sw_vers, uname -m, uname -r, TERM, whether standard input is a terminal)")

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
            raise Stop("DEC-20261012-03 is not on origin/main with the signed hash")
        if status():
            raise Stop("worktree not clean after clone")

        # Item 2: runtime identities before any test.
        bun = bun_identity(which("bun"))
        commands.append("bun identity (path, --version, Bun.revision, SHA-256)")
        node = node_identity(which("node"))
        commands.append("node identity (path, --version)")
        save("runtimes.txt", json.dumps({"bun": bun, "node": node}, indent=2) + "\n")
        if bun["version"] != STOCK_VERSION:
            raise Stop(f"bun reports {bun['version']}, not {STOCK_VERSION}")

        # Item 3: frozen install.
        code, _, _ = step("bun install --frozen-lockfile", [bun["path"], "install", "--frozen-lockfile"],
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

        # Item 4: tests 4 to 6 alone, three times each. Recorded, not judged.
        for num, path, name in TESTS:
            for k in range(1, REPEATS + 1):
                code, out, _ = run([bun["path"], "test", path, "-t", js_regex_escape(name)],
                                   cwd=WORKTREE, timeout=300)
                save(f"test{num}-{k}.txt", out)
                s = bun_summary(out)
                results.append((num, k, code, s["pass"], s["fail"], s["ran"]))
        commands.append(f"tests 4, 5 and 6 alone, {REPEATS} times each")

        # Item 5: clean at the end.
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
    w("# Tests 4 to 6 Check Report — Founder's MacBook")
    w("")
    w(f"`DEC-20261012-03` B4 host-authored report. Generated on this host on {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')}")
    w(f"by the run script (SHA-256 `{script_sha}`, operator: Founder), exclusively from this host's own retained run evidence listed at the end.")
    w("Test results are recorded, not judged.")
    w("")
    w(f"Candidate SHA: {candidate}")
    w(f"Branch: main (fresh clone at `{WORKTREE}`, detached at `origin/main`)")
    for n in notes:
        w(f"Note: {n}")
    w("")
    w("## Host")
    w("")
    for k, v in host.items():
        w(f"- {k}: `{v}`")
    w("")
    w("## Runtimes")
    w("")
    w("| Field | Value |")
    w("| --- | --- |")
    for k in ("path", "version", "revision", "sha256"):
        w(f"| bun {k} | `{bun[k]}` |")
    for k in ("path", "version"):
        w(f"| node {k} | `{node[k]}` |")
    w("")
    w("## Tests 4 to 6 run alone")
    w("")
    w("| Test | Run | Exit | Pass | Fail | Summary |")
    w("| --- | --- | --- | --- | --- | --- |")
    for num, k, code, ps, fl, ran in results:
        w(f"| {num} | {k} | {code} | {ps} | {fl} | {ran} |")
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
    report_path = os.path.join(report_dir, f"{started.strftime('%Y-%m-%d')}-tests-4-6-check-macbook.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(body + f"Report SHA-256: {digest}\n")
    print(f"COMPLETE: report written to {report_path}")
    print(f"report file SHA-256 {sha256_file(report_path)}; Report SHA-256 line {digest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
