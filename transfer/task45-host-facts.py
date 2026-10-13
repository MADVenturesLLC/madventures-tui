#!/usr/bin/env python3
"""Task 45 host-facts check, DEC-20261013-01 r2 B8.

Run by the Founder on each certification host: the MacBook and the Ubuntu PC.
It records host facts only. It prints no environment variable value, no token,
no email, no organization and no raw probe output, and it never opens, reads,
copies or hashes a credentials file. It writes its evidence and report under
~/task45-host-facts/<host>/, outside every clone, and refuses to overwrite them.
"""
import hashlib
import json
import os
import platform
import pwd
import re
import select
import shutil
import signal
import stat
import subprocess
import sys
import tempfile
import time
from datetime import datetime, timezone

EXE = "madbridge-claude-v5"
SUPPORTED_VERSIONS = ["2.1.233"]
IDENTITY_ARGV = ["--print", "--input-format", "stream-json", "--output-format",
                 "stream-json", "--verbose", "--no-session-persistence"]
IDENTITY_STDIN = json.dumps({"type": "user", "message": {"role": "user", "content": [
    {"type": "text", "text": "Reply with the single word OK."}]}}) + "\n"
AUTH_DEADLINE_S = 5.0
CLEANUP_S = 1.0
IDENTITY_DEADLINE_S = 30.0
OUT_LIMIT = 65536


def now():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def host_label():
    system, machine = platform.system(), platform.machine()
    if system == "Darwin" and machine == "arm64":
        return "macbook"
    if system == "Linux" and machine == "x86_64":
        return "ubuntu"
    sys.exit("STOP: not a certification host of DEC-20261013-04 (%s %s)" % (system, machine))


def tmpdir_rules(value, uid):
    """The five PLAN-OPEN-2 TMPDIR rules, as booleans. The value is never recorded."""
    r = {"1_present_nonempty_absolute": bool(value) and os.path.isabs(value)}
    real = os.path.realpath(value) if r["1_present_nonempty_absolute"] else None
    r["2_realpath_is_directory"] = bool(real) and os.path.isdir(real)
    st = os.stat(real) if r["2_realpath_is_directory"] else None
    r["3_owned_by_installation_uid"] = bool(st) and st.st_uid == uid
    r["4_mode_exactly_0700"] = bool(st) and stat.S_IMODE(st.st_mode) == 0o700
    ok5 = False
    if real:
        ok5 = True
        for base in ("/tmp", "/var/tmp"):
            b = os.path.realpath(base)
            if real == b or real.startswith(b.rstrip("/") + "/"):
                ok5 = False
    r["5_not_tmp_or_var_tmp"] = ok5
    r["all_pass"] = all(r.values())
    return r


def path_facts(uid):
    """PLAN-OPEN-2 PATH component rules on the ambient PATH, as counts. The value is never recorded."""
    comps = os.environ.get("PATH", "").split(":")
    bad = {"empty": 0, "not_absolute": 0, "not_existing_dir": 0,
           "owner_not_root_or_uid": 0, "group_or_world_writable": 0}
    for c in comps:
        if c == "":
            bad["empty"] += 1
            continue
        if not os.path.isabs(c):
            bad["not_absolute"] += 1
            continue
        real = os.path.realpath(c)
        if not os.path.isdir(real):
            bad["not_existing_dir"] += 1
            continue
        st = os.stat(real)
        if st.st_uid not in (0, uid):
            bad["owner_not_root_or_uid"] += 1
        if st.st_mode & (stat.S_IWGRP | stat.S_IWOTH):
            bad["group_or_world_writable"] += 1
    exe = shutil.which(EXE)
    return {
        "source": "ambient PATH; no recorded approved_path was located by this script",
        "component_count": len(comps),
        "violations": bad,
        "all_components_pass": not any(bad.values()),
        "executable_found": exe is not None,
        "executable_realpath": os.path.realpath(exe) if exe else None,
    }


def bounded_run(argv, env, cwd, deadline_s, stdin_bytes=b""):
    """Run with a monotonic deadline, output limits and SIGTERM/SIGKILL cleanup."""
    t0 = time.monotonic()
    try:
        p = subprocess.Popen(argv, env=env, cwd=cwd, stdin=subprocess.PIPE,
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except OSError as e:
        return {"spawned": False, "error_class": type(e).__name__}
    out, err = b"", b""
    try:
        out, err = p.communicate(stdin_bytes, timeout=deadline_s)
        timed_out = False
    except subprocess.TimeoutExpired:
        timed_out = True
        p.send_signal(signal.SIGTERM)
        try:
            p.wait(timeout=CLEANUP_S / 2)
        except subprocess.TimeoutExpired:
            p.kill()
            p.wait(timeout=CLEANUP_S / 2)
    return {"spawned": True, "timed_out": timed_out, "exit_code": p.returncode,
            "elapsed_ms": int((time.monotonic() - t0) * 1000),
            "stdout_over_limit": len(out) > OUT_LIMIT, "stderr_over_limit": len(err) > OUT_LIMIT,
            "_stdout": out}


def cli_version(env, cwd):
    r = bounded_run([EXE, "--version"], env, cwd, AUTH_DEADLINE_S)
    m = re.search(rb"\b(\d+\.\d+\.\d+)\b", r.pop("_stdout", b""))
    r["version"] = m.group(1).decode() if m else None
    r["version_supported"] = r["version"] in SUPPORTED_VERSIONS
    return r


def auth_status(env, cwd):
    r = bounded_run([EXE, "auth", "status"], env, cwd, AUTH_DEADLINE_S)
    raw = r.pop("_stdout", b"")
    fields = {}
    r["json_parsed"] = False
    if r.get("spawned") and not r["timed_out"] and r["exit_code"] == 0 and not r["stdout_over_limit"]:
        try:
            obj = json.loads(raw.decode())
            r["json_parsed"] = isinstance(obj, dict)
            if r["json_parsed"]:
                for k in ("loggedIn", "authMethod", "apiProvider", "subscriptionType"):
                    v = obj.get(k)
                    fields[k] = v if isinstance(v, (bool, str)) or v is None else "<%s>" % type(v).__name__
        except ValueError:
            pass
    r["predicate_fields"] = fields
    r["predicate_pass"] = (fields.get("loggedIn") is True and fields.get("authMethod") == "claude.ai"
                           and fields.get("apiProvider") == "firstParty"
                           and fields.get("subscriptionType") == "max")
    return r


def identity_probe(env, cwd):
    """Reads only the first system/init event, then ends the probe through the cleanup path."""
    t0 = time.monotonic()
    res = {"init_seen": False, "model_present": False, "version_present": False,
           "version_value": None}
    try:
        p = subprocess.Popen([EXE] + IDENTITY_ARGV, env=env, cwd=cwd, stdin=subprocess.PIPE,
                             stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    except OSError as e:
        res.update({"spawned": False, "error_class": type(e).__name__})
        return res
    res["spawned"] = True
    p.stdin.write(IDENTITY_STDIN.encode())
    p.stdin.flush()
    buf, total = b"", 0
    while time.monotonic() - t0 < IDENTITY_DEADLINE_S and not res["init_seen"]:
        ready, _, _ = select.select([p.stdout], [], [], 0.2)
        if not ready:
            if p.poll() is not None:
                break
            continue
        chunk = os.read(p.stdout.fileno(), 4096)
        if not chunk:
            break
        total += len(chunk)
        if total > OUT_LIMIT:
            res["stdout_over_limit"] = True
            break
        buf += chunk
        while b"\n" in buf and not res["init_seen"]:
            line, buf = buf.split(b"\n", 1)
            try:
                ev = json.loads(line.decode())
            except ValueError:
                continue
            if isinstance(ev, dict) and ev.get("type") == "system" and ev.get("subtype") == "init":
                res["init_seen"] = True
                m, v = ev.get("model"), ev.get("claude_code_version")
                res["model_present"] = isinstance(m, str) and m != ""
                res["version_present"] = isinstance(v, str) and v != ""
                res["version_value"] = v if res["version_present"] and re.fullmatch(r"\d+\.\d+\.\d+", v) else None
    res["init_elapsed_ms"] = int((time.monotonic() - t0) * 1000)
    if p.poll() is None:
        p.send_signal(signal.SIGTERM)
        try:
            p.wait(timeout=CLEANUP_S / 2)
            res["cleanup"] = "sigterm"
        except subprocess.TimeoutExpired:
            p.kill()
            p.wait(timeout=CLEANUP_S / 2)
            res["cleanup"] = "sigkill"
    else:
        res["cleanup"] = "exited"
    res["reaped"] = p.returncode is not None
    return res


def main():
    host = host_label()
    pw = pwd.getpwuid(os.getuid())
    uid, home = pw.pw_uid, pw.pw_dir
    root = os.path.join(home, "task45-host-facts", host)
    if os.path.exists(root):
        sys.exit("STOP: %s exists; move it aside first" % root)
    ev_dir = os.path.join(root, "evidence")
    os.makedirs(ev_dir, mode=0o700)
    started = now()
    evidence = {}

    def save(name, obj):
        path = os.path.join(ev_dir, name + ".json")
        with open(path, "w") as f:
            json.dump(obj, f, indent=2, sort_keys=True)
            f.write("\n")
        with open(path, "rb") as f:
            evidence[name + ".json"] = hashlib.sha256(f.read()).hexdigest()
        return obj

    save("host", {"host": host, "system": platform.system(), "machine": platform.machine(),
                  "release": platform.release(), "user": pw.pw_name, "started_utc": started,
                  "ambient_HOME_equals_passwd_home": os.environ.get("HOME") == home,
                  "ambient_SHELL_equals_passwd_shell": os.environ.get("SHELL") == pw.pw_shell})
    if host == "macbook":
        save("tmpdir", {"variable": "TMPDIR", "rules": tmpdir_rules(os.environ.get("TMPDIR", ""), uid)})
    else:
        save("tmpdir", {"variable": "XDG_RUNTIME_DIR",
                        "rules": tmpdir_rules(os.environ.get("XDG_RUNTIME_DIR", ""), uid)})
    pf = save("path", path_facts(uid))

    probe_env = None
    work = tempfile.mkdtemp(prefix="t45-cwd-", dir=root)
    if pf["executable_found"]:
        probe_env = {"HOME": home, "PATH": os.environ.get("PATH", ""), "SHELL": pw.pw_shell,
                     "TERM": os.environ.get("TERM", "xterm-256color")}
        if host == "ubuntu":
            probe_env["CLAUDE_CONFIG_DIR"] = os.path.join(home, ".claude-madventures-v5")
            probe_env["TMPDIR"] = os.environ.get("XDG_RUNTIME_DIR", "")
        else:
            probe_env["TMPDIR"] = os.environ.get("TMPDIR", "")
        save("version", cli_version(probe_env, work))

    if host == "ubuntu":
        ccd = os.path.join(home, ".claude-madventures-v5")
        cred = os.path.join(ccd, ".credentials.json")
        c = {"claude_config_dir_is_passwd_home_plus_.claude-madventures-v5": True,
             "claude_config_dir_exists": os.path.isdir(ccd),
             "ambient_CLAUDE_CONFIG_DIR_equals_recorded": os.environ.get("CLAUDE_CONFIG_DIR") == ccd,
             "credentials_file_name_checked": ".credentials.json",
             "credentials_file_exists": os.path.isfile(cred)}
        if c["credentials_file_exists"]:
            st = os.stat(cred)
            c["credentials_owner_is_installation_uid"] = st.st_uid == uid
            c["credentials_mode_octal"] = oct(stat.S_IMODE(st.st_mode))
        save("credentials", c)
        if probe_env is not None:
            save("auth_status", auth_status(probe_env, work))
            save("identity_probe", identity_probe(probe_env, work))
    shutil.rmtree(work, ignore_errors=True)

    lines = ["# Task 45 host-facts check: %s" % host, "",
             "DEC-20261013-01 r2 B8. Generated on this host from its own evidence only.", "",
             "Started: %s" % started, "Finished: %s" % now(), "", "## Evidence", ""]
    for name in sorted(evidence):
        with open(os.path.join(ev_dir, name)) as f:
            lines.append("### %s" % name)
            lines.append("")
            lines.append("```json")
            lines.append(f.read().rstrip("\n"))
            lines.append("```")
            lines.append("")
    lines.append("## Evidence file SHA-256")
    lines.append("")
    for name in sorted(evidence):
        lines.append("- `%s` %s" % (name, evidence[name]))
    body = "\n".join(lines) + "\n"
    body += "Report SHA-256: %s\n" % hashlib.sha256(body.encode()).hexdigest()
    rp = os.path.join(root, "task45-host-facts-%s.md" % host)
    with open(rp, "w") as f:
        f.write(body)
    with open(rp, "rb") as f:
        print("REPORT %s" % rp)
        print("FILE_SHA256 %s" % hashlib.sha256(f.read()).hexdigest())
    print("COMPLETE")


if __name__ == "__main__":
    main()
