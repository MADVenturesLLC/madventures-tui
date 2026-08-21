#!/usr/bin/env python3
"""Run every gate declared in a profile against the working tree, deterministically.

Emits a JSON map gate_id -> result. Exit code is 1 if any gate failed or was
skipped (fail-closed); 0 only when every declared gate ran and passed.

Usage:
  python3 run_gates.py --profile profiles/madventures-tui.json [--cwd .] [--out results.json]
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from build_gate.engine import load_profile, run_all_gates, any_failed  # noqa: E402


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--profile", required=True)
    ap.add_argument("--cwd", default=".")
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    profile = load_profile(args.profile)
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
