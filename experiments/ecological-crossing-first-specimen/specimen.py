"""A deliberately local placement probe, not an ecology runtime."""

from __future__ import annotations

import atexit
import hashlib
import os
import shutil
import tempfile
from pathlib import Path


class PlacementError(ValueError):
    pass


_SANDBOX = Path(tempfile.mkdtemp(prefix="ecological-crossing-first-specimen-"))
atexit.register(shutil.rmtree, _SANDBOX, ignore_errors=True)


def _digest(material: bytes) -> str:
    return hashlib.sha256(material).hexdigest()


def _place_local(material: bytes, declared_sha256: str, route: str) -> dict[str, str | int]:
    if not isinstance(material, bytes) or not isinstance(declared_sha256, str):
        raise PlacementError("material must be bytes and declared_sha256 must be text")
    if _digest(material) != declared_sha256:
        raise PlacementError("declared SHA-256 does not match material")
    if _SANDBOX.is_symlink() or not _SANDBOX.is_dir():
        raise PlacementError("specimen sandbox is not a directory")

    destination = _SANDBOX / "research-in"
    if destination.is_symlink():
        raise PlacementError("specimen destination must not be a symlink")
    destination.mkdir(parents=True, exist_ok=True)
    if destination.is_symlink():
        raise PlacementError("specimen destination must not be a symlink")
    final = destination / f"{declared_sha256}.bin"

    if final.exists():
        if final.read_bytes() != material:
            raise PlacementError("digest-derived destination has different material")
    else:
        fd, temporary = tempfile.mkstemp(prefix=".placing-", dir=destination)
        try:
            with os.fdopen(fd, "wb") as handle:
                handle.write(material)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temporary, final)
        except BaseException:
            Path(temporary).unlink(missing_ok=True)
            raise

    if _digest(final.read_bytes()) != declared_sha256:
        raise PlacementError("completed materialization failed verification")
    return {"route": route, "sha256": declared_sha256, "bytes": len(material), "completion": "materialized"}


def place_from_cognition_request(request: dict[str, object]) -> dict[str, str | int]:
    if set(request) != {"operation", "material", "declared_sha256"} or request["operation"] != "place-local":
        raise PlacementError("invalid cognition-shaped placement request")
    return _place_local(request["material"], request["declared_sha256"], "cognition-shaped")  # type: ignore[arg-type]


def place_direct_local(material: bytes, declared_sha256: str) -> dict[str, str | int]:
    return _place_local(material, declared_sha256, "direct-local")
