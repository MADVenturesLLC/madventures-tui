#!/usr/bin/env python3
"""Assert git origin identity is the canonical madventures-tui remote."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

from build_gate.freeze import normalize_origin  # noqa: E402

EXPECTED_HOST = "github.com"
EXPECTED_IDENTITY = "madventuresllc/madventures-tui"


def main() -> int:
    url = subprocess.check_output(
        ["git", "config", "--get", "remote.origin.url"], text=True
    ).strip()
    host, ident = normalize_origin(url)
    if host != EXPECTED_HOST or ident != EXPECTED_IDENTITY:
        print(f"origin mismatch: host={host} identity={ident}", file=sys.stderr)
        return 1
    print(ident)
    return 0


if __name__ == "__main__":
    sys.exit(main())
