#!/usr/bin/env python3
"""Fail-closed validation of a review record against a freeze manifest.

Exit code is 0 ONLY when the record is valid and approved. Otherwise 1.

Usage:
  python3 validate_record.py --record record.json --freeze freeze.json
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from build_gate.types import FreezeManifest, ReviewRecord  # noqa: E402
from build_gate.validate import validate_record  # noqa: E402


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--record", required=True)
    ap.add_argument("--freeze", required=True)
    args = ap.parse_args()

    try:
        record = ReviewRecord.from_dict(
            json.loads(Path(args.record).read_text(encoding="utf-8"))
        )
        freeze = FreezeManifest.from_dict(
            json.loads(Path(args.freeze).read_text(encoding="utf-8"))
        )
        result = validate_record(record, freeze)
    except (
        OSError,
        UnicodeDecodeError,
        json.JSONDecodeError,
        KeyError,
        TypeError,
        ValueError,
        AttributeError,
    ) as exc:
        print(
            json.dumps(
                {"valid": False, "errors": [f"invalid review input: {type(exc).__name__}: {exc}"]},
                indent=2,
            )
        )
        return 1
    print(json.dumps({"valid": result.valid, "errors": result.errors}, indent=2))
    if result.valid and record.verdict == "approved":
        return 0
    return 1


if __name__ == "__main__":
    sys.exit(main())
