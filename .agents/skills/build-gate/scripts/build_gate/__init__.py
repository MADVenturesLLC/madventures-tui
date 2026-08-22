"""build_gate: OS-owned, fail-closed build gate for madventures-tui.

Evolved from the "Argus Hybrid" review pipeline after the ChatGPT Custom GPT
component was discarded (per the standing directive to keep ChatGPT out of the
AI loop). This module is the deterministic core that runs *inside* the build
loop on CV5 / Hermes / Codex, so the exact-SHA drift lock actually holds.

Public surface:
  - engine.load_profile / discover_gates / run_all_gates
  - freeze.freeze_target
  - validate.validate_record / load_and_validate
  - types.* (dataclasses + enums)
"""
from . import engine, freeze, types, validate

__all__ = ["engine", "freeze", "types", "validate"]
