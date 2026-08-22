"""Exact-SHA freeze + origin identity capture.

This is the anti-drift lock: it records the full 40-char commit SHA, the git
origin identity, and the SHA-256 of the profile the gates came from. Any later
review record that does not match these values fails validation.
"""
from __future__ import annotations

import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse, urlsplit, urlunsplit

from .types import FreezeManifest


def _git(cwd: str | Path, args: list[str]) -> str:
    proc = subprocess.run(
        ["git", *args],
        cwd=str(cwd),
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"git {' '.join(args)} failed: {proc.stderr.strip()}")
    return proc.stdout.strip()


def redact_origin_url(origin_url: str) -> str:
    """Remove secrets-bearing URL components before an origin is persisted."""
    url = origin_url.strip()
    if "://" in url:
        parsed = urlsplit(url)
        netloc = parsed.netloc.rsplit("@", 1)[-1]
        return urlunsplit((parsed.scheme, netloc, parsed.path, "", ""))

    host, separator, path = url.partition(":")
    if separator and "@" in host:
        return f"{host.rsplit('@', 1)[-1]}:{path}"
    return url


def normalize_origin(origin_url: str) -> tuple[str, str]:
    """Return (host, identity) for an https or ssh git remote URL.

    Examples:
      https://github.com/MADVenturesLLC/madventures-tui.git -> ('github.com', 'madventuresllc/madventures-tui')
      git@github.com:MADVenturesLLC/madventures-tui.git     -> ('github.com', 'madventuresllc/madventures-tui')
    """
    url = origin_url.strip()
    if "://" not in url:
        # SCP-style: [user@]host:owner/repo.git
        user_host, separator, path = url.partition(":")
        if not separator:
            raise ValueError("invalid SCP-style git remote")
        host = user_host.rsplit("@", 1)[-1]
    else:
        parsed = urlparse(url)
        host = parsed.hostname or ""
        path = (parsed.path or "").lstrip("/")
    # Strip a trailing .git suffix case-insensitively (SSH URLs may be .GIT).
    lowered = path.lower()
    if lowered.endswith(".git"):
        path = path[: -len(".git")]
    identity = "/".join(p for p in path.split("/") if p).lower()
    return host.lower(), identity


def freeze_target(
    profile_path: str | Path,
    cwd: str | Path,
    *,
    actor: str,
    model: str,
    provider: str,
    session_id: str,
    surface: str,
    out_path: str | Path | None = None,
) -> FreezeManifest:
    profile_path = Path(profile_path)
    profile_bytes = profile_path.read_bytes()
    profile = json.loads(profile_bytes.decode("utf-8"))
    profile_sha256 = hashlib.sha256(profile_bytes).hexdigest()

    target_ref = _git(cwd, ["rev-parse", "HEAD"])
    if len(target_ref) != 40:
        raise RuntimeError(f"rev-parse HEAD did not return a 40-char SHA: {target_ref!r}")

    origin_url = _git(cwd, ["config", "--get", "remote.origin.url"])
    host, identity = normalize_origin(origin_url)

    # If the profile declares an allowed origin, enforce identity match now.
    allowed = profile.get("target", {}).get("origin_identity")
    if allowed and identity.lower() != allowed.lower():
        raise RuntimeError(
            f"origin identity {identity!r} does not match profile allowed {allowed!r}"
        )

    manifest = FreezeManifest(
        profile=profile.get("profile", profile_path.stem),
        target_ref=target_ref,
        target_ref_short=target_ref[:7],
        origin_url=redact_origin_url(origin_url),
        origin_host=host,
        origin_identity=identity,
        actor=actor,
        model=model,
        provider=provider,
        session_id=session_id,
        surface=surface,
        frozen_at=datetime.now(timezone.utc).isoformat(),
        gates=[g["id"] for g in profile.get("gates", [])],
        profile_sha256=profile_sha256,
    )

    if out_path is not None:
        Path(out_path).write_text(
            json.dumps(manifest.to_dict(), indent=2) + "\n", encoding="utf-8"
        )
    return manifest


def verify_frozen_execution(
    freeze: FreezeManifest,
    cwd: str | Path,
    *,
    profile_name: str,
    profile_sha256: str,
) -> list[str]:
    """Return any execution-context drift before running profile commands."""
    errors: list[str] = []
    if profile_name != freeze.profile:
        errors.append(
            f"profile name mismatch: current={profile_name} freeze={freeze.profile}"
        )
    if profile_sha256 != freeze.profile_sha256:
        errors.append(
            "profile_sha256 mismatch: current profile does not match the freeze"
        )

    try:
        current_ref = _git(cwd, ["rev-parse", "HEAD"])
        if current_ref != freeze.target_ref:
            errors.append(
                f"target_ref mismatch: current={current_ref} freeze={freeze.target_ref}"
            )

        origin_url = _git(cwd, ["config", "--get", "remote.origin.url"])
        origin_host, origin_identity = normalize_origin(origin_url)
        if origin_host != freeze.origin_host.lower():
            errors.append(
                f"origin host mismatch: current={origin_host} freeze={freeze.origin_host}"
            )
        if origin_identity != freeze.origin_identity.lower():
            errors.append(
                "origin identity mismatch: current execution repo does not match the freeze"
            )

        if _git(cwd, ["status", "--porcelain"]):
            errors.append("working tree is not clean for frozen execution")
    except (RuntimeError, ValueError, TypeError, AttributeError) as exc:
        errors.append(f"unable to verify frozen execution context: {exc}")
    return errors
