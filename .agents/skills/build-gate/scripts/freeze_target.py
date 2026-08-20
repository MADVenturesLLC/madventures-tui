#!/usr/bin/env python3
"""Freeze a build target: lock the exact 40-char SHA, origin identity, and the
profile that defines the gates. Emits a freeze manifest JSON.

Usage:
  python3 freeze_target.py --profile profiles/madventures-tui.json \
      --actor hermes --model hy3 --provider nous --session-id S1 --surface cv5 \
      [--out freeze.json]
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from build_gate.freeze import freeze_target as _freeze  # noqa: E402


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--profile", required=True)
    ap.add_argument("--cwd", default=".")
    ap.add_argument("--actor", required=True)
    ap.add_argument("--model", required=True)
    ap.add_argument("--provider", required=True)
    ap.add_argument("--session-id", required=True)
    ap.add_argument("--surface", required=True)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    manifest = _freeze(
        args.profile,
        args.cwd,
        actor=args.actor,
        model=args.model,
        provider=args.provider,
        session_id=args.session_id,
        surface=args.surface,
        out_path=args.out,
    )
    print(json.dumps(manifest.to_dict(), indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
