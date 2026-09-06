"""EM peer-side boundary adapter — advisory/in → advisory/out over hidden bus.

Scope: literal refactoring probe for the one advisory workload.
No generic protocol, portal, discovery, identity, capability, WATCH, scheduler,
task runtime, storage, sync, lifecycle, or bus replacement. Bus stays the existing
symlinked file bus; its mechanics are private to this adapter.

Public operator surface (semantic names only):
  list_advisory_in()            -> advisory/in names
  read_advisory_in(name)        -> bytes at advisory/in
  publish_advisory_out(name, material) -> immutable advisory/out + bus realization

Bus-private helpers (used only by the verification fixture, not by the operator):
  _deposit_bus_request(name, material)  # simulate CL bus delivery
  _project_to_advisory(name)            # private inbound mapping: bus -> advisory/in

All paths are inside an adapter-owned temp sandbox; no CL host paths are exposed.
"""

from __future__ import annotations

import hashlib
import os
import shutil
import tempfile
import atexit
from pathlib import Path


class BoundaryError(ValueError):
    pass


_SANDBOX = Path(tempfile.mkdtemp(prefix="machine-boundary-em-"))
atexit.register(shutil.rmtree, _SANDBOX, ignore_errors=True)

# Operator-visible semantic places (literal, workload-specific)
ADVISORY_IN = _SANDBOX / "advisory" / "in"
ADVISORY_OUT = _SANDBOX / "advisory" / "out"

# Private realization — bus transport stays hidden (not part of operator contract)
_BUS_INBOX = _SANDBOX / ".private" / "bus" / "inbox"
_BUS_OUTBOX = _SANDBOX / ".private" / "bus" / "outbox"

PEER = "continuity-lab"

# Live bus locations (hidden private realization — not part of caller surface)
_REPO_ROOT = Path(__file__).resolve().parents[2]
_LIVE_INBOX = _REPO_ROOT / "inbox" / PEER
_LIVE_OUTBOX = _REPO_ROOT / "outbox" / PEER


def _ensure_dirs() -> None:
    for d in (ADVISORY_IN, ADVISORY_OUT, _BUS_INBOX, _BUS_OUTBOX):
        d.mkdir(parents=True, exist_ok=True)
        # reject symlink escapes — private dirs must be real directories
        if d.is_symlink() or not d.is_dir():
            raise BoundaryError(f"boundary path is not a directory: {d}")


def _digest(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


# ── private bus simulation (fixture only — not operator surface) ──────────

def _deposit_bus_request(name: str, material: bytes) -> Path:
    """Simulate CL bus delivery into the hidden inbound mailbox."""
    _ensure_dirs()
    if "/" in name or name in ("", ".", ".."):
        raise BoundaryError("invalid name")
    p = _BUS_INBOX / name
    if p.exists():
        raise BoundaryError("bus inbox append-only: already exists")
    # atomic write then fsync (no partial artifact on crash)
    fd, tmp = tempfile.mkstemp(prefix=".deposit-", dir=_BUS_INBOX)
    try:
        with os.fdopen(fd, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp, p)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
    if _digest(p.read_bytes()) != _digest(material):
        raise BoundaryError("bus deposit verification failed")
    return p


def _project_to_advisory(name: str) -> Path:
    """Private inbound mapping: bus packet -> advisory/in projection.
    Voluntary — caller must invoke; appearance does not trigger work."""
    _ensure_dirs()
    src = _BUS_INBOX / name
    if not src.exists():
        raise BoundaryError("no bus packet to project")
    if src.is_symlink():
        raise BoundaryError("bus packet must not be symlink")
    dst = ADVISORY_IN / name
    if dst.exists():
        # already projected; verify bytes identical
        if dst.read_bytes() != src.read_bytes():
            raise BoundaryError("projected bytes mismatch")
        return dst
    # copy bytes as new materialized file (projection, not move)
    material = src.read_bytes()
    fd, tmp = tempfile.mkstemp(prefix=".project-", dir=ADVISORY_IN)
    try:
        with os.fdopen(fd, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp, dst)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
    if dst.read_bytes() != material:
        raise BoundaryError("projection verification failed")
    return dst


# ── operator-visible semantic surface (no bus/path plumbing) ───────────────

def list_advisory_in() -> list[str]:
    _ensure_dirs()
    if ADVISORY_IN.is_symlink():
        raise BoundaryError("advisory/in must not be symlink")
    return sorted(p.name for p in ADVISORY_IN.iterdir() if p.is_file())


def read_advisory_in(name: str) -> bytes:
    _ensure_dirs()
    if "/" in name or name in ("", ".", ".."):
        raise BoundaryError("invalid name")
    p = ADVISORY_IN / name
    if not p.exists() or p.is_symlink():
        raise BoundaryError("advisory/in entry missing or not a file")
    return p.read_bytes()


def publish_advisory_out(name: str, material: bytes) -> dict[str, str | int]:
    """Create immutable response at advisory/out and realize to bus outbox.
    Append-only, no overwrite/move/edit-in-place."""
    _ensure_dirs()
    if not isinstance(material, bytes):
        raise BoundaryError("material must be bytes")
    if "/" in name or name in ("", ".", ".."):
        raise BoundaryError("invalid name")
    if ADVISORY_OUT.is_symlink() or _BUS_OUTBOX.is_symlink():
        raise BoundaryError("advisory/out or bus outbox is symlink")
    dest = ADVISORY_OUT / name
    bus_dest = _BUS_OUTBOX / name
    if dest.exists() or bus_dest.exists():
        raise BoundaryError("advisory/out append-only: already exists (no overwrite)")
    digest = _digest(material)
    # 1) materialize advisory/out (immutable)
    fd, tmp = tempfile.mkstemp(prefix=".publish-", dir=ADVISORY_OUT)
    try:
        with os.fdopen(fd, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp, dest)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
    if dest.read_bytes() != material or _digest(dest.read_bytes()) != digest:
        raise BoundaryError("advisory/out verification failed")
    # 2) realize to bus outbox (hidden transport) — same bytes
    fd2, tmp2 = tempfile.mkstemp(prefix=".realize-", dir=_BUS_OUTBOX)
    try:
        with os.fdopen(fd2, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp2, bus_dest)
    except BaseException:
        Path(tmp2).unlink(missing_ok=True)
        # keep advisory/out as is — realization failure does not rollback semantic creation
        # but report it
        raise BoundaryError("bus realization failed") from None
    if bus_dest.read_bytes() != material:
        raise BoundaryError("bus realization verification failed")
    return {"peer": PEER, "advisory_out": str(dest), "sha256": digest, "bytes": len(material), "realized": "bus-outbox"}


# ── live-bus private realization (same operator surface, real bus) ──────────

def _project_live_request(name: str) -> Path:
    """Private inbound mapping for the live request: live inbox -> advisory/in.
    Voluntary — caller must invoke; not auto. Caller never sees live path."""
    _ensure_dirs()
    if "/" in name or name in ("", ".", ".."):
        raise BoundaryError("invalid name")
    src = _LIVE_INBOX / name
    if not src.exists():
        raise BoundaryError("live bus packet missing")
    # live inbox file itself is not a symlink; containing inbox dir is real
    if src.is_symlink():
        raise BoundaryError("live bus packet must not be symlink")
    dst = ADVISORY_IN / name
    if dst.exists():
        if dst.read_bytes() != src.read_bytes():
            raise BoundaryError("projected bytes mismatch (live)")
        return dst
    material = src.read_bytes()
    fd, tmp = tempfile.mkstemp(prefix=".project-live-", dir=ADVISORY_IN)
    try:
        with os.fdopen(fd, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp, dst)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
    if dst.read_bytes() != material:
        raise BoundaryError("live projection verification failed")
    return dst


def publish_advisory_out_live(name: str, material: bytes) -> dict[str, str | int]:
    """Operator surface: publish to advisory/out and privately realize to live outbox.
    Same append-only, atomic, digest-verified contract as publish_advisory_out,
    but bus realizer is the live file bus (outbox/<peer>/). Caller supplies only
    semantic name and bytes — no bus/host paths."""
    _ensure_dirs()
    if not isinstance(material, bytes):
        raise BoundaryError("material must be bytes")
    if "/" in name or name in ("", ".", ".."):
        raise BoundaryError("invalid name")
    if ADVISORY_OUT.is_symlink():
        raise BoundaryError("advisory/out is symlink")
    dest = ADVISORY_OUT / name
    # live outbox is a symlink to peer inbox by design — do not reject it
    live_bus_dest = _LIVE_OUTBOX / name
    if dest.exists() or live_bus_dest.exists():
        raise BoundaryError("advisory/out append-only: already exists (live)")
    digest = _digest(material)
    # 1) advisory/out
    fd, tmp = tempfile.mkstemp(prefix=".publish-live-", dir=ADVISORY_OUT)
    try:
        with os.fdopen(fd, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp, dest)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
    if dest.read_bytes() != material or _digest(dest.read_bytes()) != digest:
        raise BoundaryError("advisory/out verification failed (live)")
    # 2) live bus realization (hidden)
    _LIVE_OUTBOX.mkdir(parents=True, exist_ok=True)
    fd2, tmp2 = tempfile.mkstemp(prefix=".realize-live-", dir=_LIVE_OUTBOX)
    try:
        with os.fdopen(fd2, "wb") as h:
            h.write(material)
            h.flush()
            os.fsync(h.fileno())
        os.replace(tmp2, live_bus_dest)
    except BaseException:
        Path(tmp2).unlink(missing_ok=True)
        raise BoundaryError("live bus realization failed") from None
    if live_bus_dest.read_bytes() != material:
        raise BoundaryError("live bus realization verification failed")
    return {"peer": PEER, "advisory_out": str(dest), "sha256": digest, "bytes": len(material), "realized": "live-bus-outbox"}
