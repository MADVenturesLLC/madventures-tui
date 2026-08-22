#!/usr/bin/env python3
"""Run every gate declared in a profile against the working tree, deterministically.

Emits a JSON map gate_id -> result. Exit code is 1 if any gate failed or was
skipped (fail-closed); 0 only when every declared gate ran and passed.

Usage:
  python3 run_gates.py --profile profiles/madventures-tui.json --freeze freeze.json [--cwd .] [--out results.json]
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from build_gate.engine import any_failed, parse_profile, run_all_gates  # noqa: E402
from build_gate.freeze import verify_frozen_execution  # noqa: E402
from build_gate.types import FreezeManifest  # noqa: E402


def _failure(errors: list[str]) -> int:
    print(json.dumps({"valid": False, "errors": errors}, indent=2))
    return 1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--profile", required=True)
    ap.add_argument("--freeze", required=True)
    ap.add_argument("--cwd", default=".")
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    try:
        profile_bytes = Path(args.profile).read_bytes()
        profile = parse_profile(profile_bytes.decode("utf-8"), args.profile)
        freeze = FreezeManifest.from_dict(
            json.loads(Path(args.freeze).read_text(encoding="utf-8"))
        )
    except (OSError, UnicodeDecodeError, json.JSONDecodeError, KeyError, TypeError, ValueError) as exc:
        return _failure([f"invalid gate input: {type(exc).__name__}: {exc}"])

    errors = verify_frozen_execution(
        freeze,
        args.cwd,
        profile_name=profile.get("profile", Path(args.profile).stem),
        profile_sha256=hashlib.sha256(profile_bytes).hexdigest(),
    )
    if errors:
        return _failure(errors)

    # Make build_gate importable for any gate that uses it.
    os.environ["PYTHONPATH"] = str(HERE) + os.pathsep + os.environ.get("PYTHONPATH", "")

    results = run_all_gates(profile, args.cwd, env=dict(os.environ))
    out = {rid: r.__dict__ for rid, r in results.items()}
    print(json.dumps(out, indent=2, default=str))
    if args.out:
        Path(args.out).write_text(json.dumps(out, indent=2, default=str) + "\n", encoding="utf-8")

    if any_failed(results):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
