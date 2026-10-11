#!/usr/bin/env python3
"""Ubuntu PC spike run under DEC-20261011-02 B3, B4 and B5.

Run by the Founder on the Ubuntu PC, after DEC-20261011-02 is on main:

    python3 -I ~/ubuntu-spike-run.py

What it does, in the order of B4:
  1. clones the repository into a new directory, detached at origin/main, and
     checks that DEC-20261011-02 is on that commit; no existing checkout is used
  2. bun install --frozen-lockfile; the tree and the lockfile must stay clean
     (the founder-act mode flip of B4 item 2 is restored and recorded)
  3. records host facts; Bun must be 1.4.2
  4. bun test test/phase3a, three consecutive runs, all thirteen criteria pass
  5. bunx tsc --noEmit
  6. one full bun test, judged under B2
  7. the diagnostics of B3
  8. git status --porcelain must be empty
Then, only if nothing fell short, it writes the B5 report.

It changes nothing outside the new clone, the evidence folder and one
temporary directory for diagnostic 2. It retries nothing, pushes nothing,
lists no processes and prints no environment values other than those named
in B3 item 4 and B4 item 3. Any shortfall stops the run and writes STOPPED.txt.
"""

import hashlib
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timezone

HOME = "/home/michaeldaley"
EVIDENCE = os.path.join(HOME, "ubuntu-spike-evidence")
WORKTREE = os.path.join(HOME, "madventures-tui-ubuntu-spike-run")
REPO_URL = "https://github.com/MADVenturesLLC/madventures-tui.git"
ACT_PATH = "docs/decisions/DEC-20261011-02-ubuntu-failures-and-spike-run.md"
ACT_SHA256 = "0d163c6aa931d0d52a94bd3f5ad4df3cdf3925caef6d80f2429415d03328fafd"
BUN_VERSION = "1.4.2"
FOUNDER_ACT_MAIN = "packages/founder-act/src/main.ts"
STEP_TIMEOUT_S = 1800

# B2: the open tests of A2, each with the failure A2 records.
KNOWN = {
    "F1/F2: real run — mixed selection (governance_focus + ansi_flood) > packet records the flags the run actually used and references existing casts": "exit1",
    "F1/F2: real run — excluding governance_focus > single ansi_flood run references its own cast, never a nonexistent one": "exit1",
    "F1/F2: real run — ordinary fixture-only scenario > layout_resize-only run records only the base fixture flag": "exit1",
    "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)": "marker",
    "natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once": "timeout",
    "early child output cannot precede launched and ready, and is required, not merely allowed": "timeout",
}
MODE_TEXT = {
    "exit1": "the harness subprocess exited 1 where 0 was expected",
    "marker": "the child environment lacked MADV_FIXTURE_MARKER",
    "timeout": "the observation timed out at 4,000 ms",
}

# B3 item 6: tests 4, 5 and 6 run alone, by file and name.
ALONE = [
    ("packages/broker/test/pty-host-supervisor.test.ts",
     "governed-child environment forwarding: exact key-set equality with the launch-frame env, ambient canary absent (C7 evidence 7)"),
    ("packages/pty-host/test/main-guard.test.ts",
     "natural child exit without a terminate command publishes an exact marker, drained, and exited exactly once"),
    ("packages/pty-host/test/main-guard.test.ts",
     "early child output cannot precede launched and ready, and is required, not merely allowed"),
]

# B3 item 4: the Linux program of the test 4 fixture, exactly as the test runs it.
AWK_PROGRAM = ('BEGIN{RS="\\0"; s=""} {i=index($0,"="); if(i>0) s = s substr($0,1,i-1) ","} '
               'END{print "@@MADV_ENVKEYS " s "@@"; system("sleep 2")}')

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


def save(name, text):
    path = os.path.join(EVIDENCE, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    return path


def git(*args):
    return run(["git", "-C", WORKTREE, *args], merge=False)


def status():
    code, out, err = git("status", "--porcelain")
    if code != 0:
        raise Stop("git status failed: " + err.strip())
    return out


def bun_summary(text):
    """The four values Bun prints at the end of a run."""
    get = lambda pat: (re.findall(pat, text, re.M) or [None])[-1]
    return {
        "pass": get(r"^\s*(\d+) pass$"),
        "fail": get(r"^\s*(\d+) fail$"),
        "expect": get(r"^\s*(\d+) expect\(\) calls$"),
        "errors": get(r"^\s*(\d+) errors?$"),
        "ran": get(r"^(Ran \d+ tests? across \d+ files?\..*)$"),
    }


def spike_lines(text):
    return [l for l in text.splitlines() if l.startswith("[spike]")]


def check_phase3a(n, code, text):
    s = bun_summary(text)
    if code != 0:
        raise Stop(f"phase3a run {n} exited {code}")
    if s["fail"] != "0" or s["ran"] is None or s["errors"] not in (None, "0"):
        raise Stop(f"phase3a run {n} summary is not a complete zero-failure run: {s}")
    if any(l.startswith("[spike] FAIL") for l in spike_lines(text)):
        raise Stop(f"phase3a run {n} printed a [spike] FAIL block")
    hosts = [l for l in spike_lines(text) if l.startswith("[spike] host=")]
    crit_lines = [l for l in spike_lines(text) if CRITERION.search(l)]
    if len(hosts) != 1 or len(crit_lines) != 1:
        raise Stop(f"phase3a run {n} did not print exactly one spike result line")
    crits = CRITERION.findall(crit_lines[0])
    if len(crits) != 13 or any(r != "pass" for _, _, r in crits):
        raise Stop(f"phase3a run {n}: {len(crits)} criteria, not thirteen passing")
    return s


def failure_blocks(text):
    """Map each failing test name to (seconds, text of the block before its first (fail) line)."""
    lines = text.splitlines()
    result = {}
    for i, line in enumerate(lines):
        m = FAIL_LINE.match(line)
        if not m or m.group(1) in result:
            continue
        secs = float(m.group(2)) / (1000.0 if m.group(3) == "ms" else 1.0)
        j = i - 1
        # Bun prints each failure's error just before its (fail) line, and prints no
        # (pass) lines when its output is not a terminal; stop at the previous
        # result line or file header.
        while j >= 0 and not re.match(r"^\((pass|fail|skip|todo)\) |^\S.*\.test\.tsx?:$", lines[j]) and i - j <= 200:
            j -= 1
        result[m.group(1)] = (secs, "\n".join(lines[j + 1:i]))
    return result


def mode_matches(mode, secs, block):
    if mode == "exit1":
        return (re.search(r"^error: expect\(received\)\.toBe\(expected\)$", block, re.M) is not None
                and re.search(r"^Expected: 0$", block, re.M) is not None
                and re.search(r"^Received: 1$", block, re.M) is not None)
    if mode == "marker":
        return (re.search(r"^error: expect\(received\)\.toEqual\(expected\)$", block, re.M) is not None
                and re.search(r'^-\s+"MADV_FIXTURE_MARKER",?$', block, re.M) is not None)
    if mode == "timeout":
        return re.search(r"^error: condition not observed within 4000ms$", block, re.M) is not None and secs >= 4.0
    return False


def judge_full_suite(code, text):
    """B2. Returns (summary, list of (name, mode text)) or raises Stop."""
    s = bun_summary(text)
    if s["ran"] is None or s["fail"] is None:
        raise Stop("full suite printed no complete summary")
    if s["errors"] not in (None, "0"):
        raise Stop(f"full suite reported {s['errors']} error(s) outside tests")
    blocks = failure_blocks(text)
    if len(blocks) != int(s["fail"]):
        raise Stop(f"full suite: {len(blocks)} distinct failing names but {s['fail']} fail")
    unknown = sorted(set(blocks) - set(KNOWN))
    if unknown:
        raise Stop("full suite: failure outside the known set of B2: " + " | ".join(unknown))
    failing = []
    for name, (secs, block) in blocks.items():
        if not mode_matches(KNOWN[name], secs, block):
            raise Stop(f"full suite: known test failed differently from A2: {name}")
        failing.append((name, MODE_TEXT[KNOWN[name]]))
    if (code == 0) != (len(blocks) == 0):
        raise Stop(f"full suite exit {code} disagrees with {len(blocks)} failures")
    return s, failing


def js_regex_escape(text):
    return re.sub(r"([\\^$.*+?()\[\]{}|/])", r"\\\1", text)


def main():
    started = datetime.now(timezone.utc)
    run_date = started.strftime("%Y-%m-%d")
    script_sha = sha256_file(os.path.abspath(__file__))
    if os.path.exists(EVIDENCE) or os.path.exists(WORKTREE):
        print(f"STOPPED: {EVIDENCE} or {WORKTREE} already exists; nothing was done")
        return 1
    os.makedirs(EVIDENCE, mode=0o700)
    commands = []
    facts = {}
    notes = []

    def step(label, cmd, name=None, **kw):
        commands.append(label)
        code, out, err = run(cmd, **kw)
        if name:
            save(name, out if not err else out + "\n--- stderr ---\n" + err)
        return code, out, err

    try:
        save("run-start.txt", f"started {started.isoformat()}\nrun script SHA-256 {script_sha}\n")

        # Item 1: fresh clone, detached at origin/main; the act must be on it.
        code, out, _ = step("git clone https://github.com/MADVenturesLLC/madventures-tui.git <worktree>",
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
        facts["candidate"] = candidate
        act_file = os.path.join(WORKTREE, ACT_PATH)
        if not os.path.isfile(act_file) or sha256_file(act_file) != ACT_SHA256:
            raise Stop("DEC-20261011-02 is not on origin/main with the signed hash")
        save("status-before.txt", status())
        if status():
            raise Stop("worktree not clean after clone")

        # Item 3, first part: whether node is present before install (node-pty builds from source on Linux).
        node_path = run(["sh", "-c", "command -v node || true"])[1].strip()
        save("node-before-install.txt", (node_path or "(none)") + "\n")

        # Item 2: frozen install; tree and lockfile must stay clean.
        code, out, _ = step("bun install --frozen-lockfile", ["bun", "install", "--frozen-lockfile"],
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
                save("mode-restored.txt", f"restored 100644 on {FOUNDER_ACT_MAIN}\n")
                after = status()
                save("status-after-restore.txt", after)
                if after:
                    raise Stop("worktree not clean after restoring the founder-act mode")
            else:
                raise Stop("bun install changed the worktree")
        lockdiff = git("diff", "--", "bun.lock", "package.json")[1]
        save("lockdiff.txt", lockdiff)
        if lockdiff:
            raise Stop("bun.lock or package.json changed")

        # Item 3: host facts.
        neutral = EVIDENCE  # no .env file here, so Bun loads none
        bun_path = run(["sh", "-c", "command -v bun"])[1].strip()
        facts.update({
            "arch": run(["uname", "-m"])[1].strip(),
            "kernel": run(["uname", "-r"])[1].strip(),
            "distro": next((l.split("=", 1)[1].strip().strip('"') for l in open("/etc/os-release")
                            if l.startswith("PRETTY_NAME=")), ""),
            "bun_path": bun_path,
            "bun_version": run(["bun", "--version"], cwd=neutral)[1].strip(),
            "bun_revision": run(["bun", "-e", "process.stdout.write(Bun.revision)"], cwd=neutral)[1].strip(),
            "bun_sha": sha256_file(os.path.realpath(bun_path)) if bun_path else "",
            "term": os.environ.get("TERM", ""),
            "shell": os.environ.get("SHELL", ""),
            "node": node_path or "(none)",
        })
        commands.append("environment capture (`uname -m`, `uname -r`, `PRETTY_NAME` from `/etc/os-release`, `command -v bun`, `bun --version`, `Bun.revision`, `sha256sum <bun>`, `$TERM`, `$SHELL`, `command -v node`)")
        save("env.txt", "".join(f"{k}={v}\n" for k, v in facts.items()))
        if facts["bun_version"] != BUN_VERSION:
            raise Stop(f"Bun is {facts['bun_version']}, not {BUN_VERSION}")

        # Item 4: three consecutive phase3a runs.
        runs = []
        for n in (1, 2, 3):
            code, out, _ = step(f"`bun test test/phase3a` — run {n} of three consecutive runs",
                                ["bun", "test", "test/phase3a"], f"run-{n}.txt", cwd=WORKTREE)
            runs.append((check_phase3a(n, code, out), spike_lines(out)))

        # Item 5: typecheck.
        code, out, _ = step("`bunx tsc --noEmit`", ["bunx", "tsc", "--noEmit"], "typecheck.txt", cwd=WORKTREE)
        if code != 0:
            raise Stop(f"tsc exited {code}")
        tsc_out = out

        # Item 6: one full suite, judged under B2.
        code, out, _ = step("`bun test` (full suite, once)", ["bun", "test"], "full-suite.txt", cwd=WORKTREE)
        full, failing = judge_full_suite(code, out)
        passing_known = [n for n in KNOWN if n not in dict(failing)]

        # Item 7: diagnostics of B3. Recorded, not judged.
        diags = []
        commands.append("diagnostics of DEC-20261011-02 B3, items 1 to 6")
        d1 = node_path or "(none)"
        if node_path:
            d1 += "\n" + run([node_path, "--version"])[1].strip()
        diags.append(("1. `command -v node`, and `node --version` if found", d1))
        tmp = tempfile.mkdtemp(prefix="ubuntu-spike-harness-")
        code, out, err = run(["bun", "packages/tui-chaos/src/cli.ts", "run", "--scenarios", "layout_resize",
                              "--out", tmp, "--json"], cwd=WORKTREE, merge=False, timeout=300)
        save("diag-2-harness-stdout.txt", out)
        save("diag-2-harness-stderr.txt", err)
        diags.append((f"2. `bun packages/tui-chaos/src/cli.ts run --scenarios layout_resize --out {tmp} --json`",
                      f"exit {code}\nstandard error:\n{err.rstrip() or '(empty)'}"))
        awk_real = run(["readlink", "-f", "/usr/bin/awk"])[1].strip()
        c1, v1, _ = run(["/usr/bin/awk", "-W", "version"], timeout=30)
        c2, v2, _ = (0, v1, "") if c1 == 0 else run(["/usr/bin/awk", "--version"], timeout=30)
        version_line = (v1 if c1 == 0 else v2).splitlines()[0] if (v1 if c1 == 0 else v2).strip() else "(no version line)"
        diags.append(("3. `readlink -f /usr/bin/awk` and its version line", f"{awk_real}\n{version_line}"))
        code, out, _ = run(["env", "-i", "PATH=/usr/bin:/bin", "MADV_FIXTURE_MARKER=1", "/usr/bin/awk",
                            AWK_PROGRAM, "/proc/self/environ"], timeout=30)
        diags.append(("4. the test 4 fixture's Linux awk program under `env -i PATH=/usr/bin:/bin MADV_FIXTURE_MARKER=1`, reading `/proc/self/environ`",
                      f"exit {code}\n{out.rstrip()}"))
        diags.append(("5. `readlink -f /bin/sh`", run(["readlink", "-f", "/bin/sh"])[1].strip()))
        for k, (path, name) in enumerate(ALONE, start=1):
            code, out, _ = run(["bun", "test", path, "-t", js_regex_escape(name)], cwd=WORKTREE, timeout=300)
            save(f"diag-6-{k}.txt", out)
            lines = out.rstrip().splitlines()
            shown = lines if len(lines) <= 80 else lines[:40] + ["(… lines omitted; full output in the evidence file …)"] + lines[-40:]
            diags.append((f"6.{k} `bun test {path} -t <escaped name>` for: {name}",
                          f"exit {code}\n" + "\n".join(shown)))
        save("diagnostics.txt", "\n\n".join(f"{t}\n{b}" for t, b in diags) + "\n")

        # Item 8: clean at the end.
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

    # B5: the report, from retained evidence only.
    report_name = f"{run_date}-bun-terminal-spike-ubuntu.md"
    out = []
    w = out.append
    w("# Bun.Terminal Spike Report — Founder's Ubuntu PC")
    w("")
    w(f"`DEC-20261011-02` B5 host-authored report. Generated on this host on {datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')} by the")
    w(f"run script (SHA-256 `{script_sha}`, operator: Founder), exclusively from this host's own")
    w("retained run evidence listed at the end; the script writes no report if any item of B4 falls short,")
    w("and wrote this report only because none did. This is not a Task 39 report.")
    w("")
    w(f"Candidate SHA: {facts['candidate']}")
    w(f"Branch: main (fresh clone at `{WORKTREE}`, detached at `origin/main`)")
    if notes:
        w("Worktree state: clean after clone, clean after install once the mode restore in the note below was applied, and clean at the end; `git diff -- bun.lock package.json` empty")
    else:
        w("Worktree state: clean at every capture — `git status --porcelain` empty after clone, after install and at the end; `git diff -- bun.lock package.json` empty")
    w(f"Bun path: {facts['bun_path']}")
    w(f"Bun version: {facts['bun_version']}")
    w(f"Bun revision: {facts['bun_revision']}")
    w(f"Bun binary SHA-256: {facts['bun_sha']}")
    w(f"Architecture: {facts['arch']}")
    w(f"Distribution: {facts['distro']}")
    w(f"Kernel: {facts['kernel']}")
    w(f"TERM: {facts['term']}")
    w(f"Shell: {facts['shell']}")
    w(f"Node on PATH: {facts['node']}")
    for note in notes:
        w(f"Note: {note}")
    w("")
    w("## Exact commands")
    w("")
    for i, c in enumerate(commands, start=1):
        w(f"{i}. {c}")
    w("")
    w("## Runs and complete counts")
    w("")
    for n, (s, _) in enumerate(runs, start=1):
        w(f"Run {n}: {s['pass']} pass / {s['fail']} fail / {s['expect']} expect() calls — {s['ran']}")
    w("")
    w("Three consecutive complete passing runs; no retries.")
    w("")
    w("## Each criterion and measured timing (verbatim, per run)")
    w("")
    for _, lines in runs:
        out.extend(lines)
        w("")
    w("All thirteen criteria pass in each run; measured timings are the `<criterion>=<ms>` values above, against the §9.8 deadline table (ack 250 ms, escalation 500 ms, responsive-child grace 2000 ms, outer bound 5000 ms).")
    w("")
    w("## Typecheck")
    w("")
    w("`bunx tsc --noEmit`: " + ("(no output — zero TypeScript errors)" if not tsc_out.strip() else "exit 0, output in `typecheck.txt`"))
    w("")
    w("## Full suite under DEC-20261011-02 B2")
    w("")
    w(f"{full['pass']} pass / {full['fail']} fail / {full['expect']} expect() calls — {full['ran']}")
    w("")
    if failing:
        w("Every failure is an open test of DEC-20261011-02 A2, failing as A2 records:")
        w("")
        for name, mode in failing:
            w(f"- {name} — {mode}")
    else:
        w("No test failed.")
    w("")
    if passing_known:
        w("Open tests of A2 that passed in this run (recorded, not a stop):")
        w("")
        for name in passing_known:
            w(f"- {name}")
        w("")
    w("## Diagnostics of DEC-20261011-02 B3 (verbatim)")
    w("")
    for title, body in diags:
        w(title)
        w("")
        w("```text")
        out.extend(body.splitlines() or ["(empty)"])
        w("```")
        w("")
    w("## Failures, retries, warnings, residual risks")
    w("")
    w("Failures: none in the phase3a runs or the typecheck; the full suite failed only as recorded above. Retries: none.")
    w("Residual risks: the open tests of DEC-20261011-02 A2 remain open; this report does not close any of them.")
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
    report_path = os.path.join(report_dir, report_name)
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(body + f"Report SHA-256: {digest}\n")
    print(f"COMPLETE: report written to {report_path}")
    print(f"report file SHA-256 {sha256_file(report_path)}; Report SHA-256 line {digest}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
