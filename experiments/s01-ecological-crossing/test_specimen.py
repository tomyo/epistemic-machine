from __future__ import annotations

import hashlib
import inspect

from specimen import _SANDBOX, PlacementError, place_direct_local, place_from_cognition_request


def expect_error(action) -> None:
    try:
        action()
    except PlacementError:
        return
    raise AssertionError("expected PlacementError")


def main() -> None:
    material = b"local semantic placement\n"
    digest = hashlib.sha256(material).hexdigest()

    cognition = place_from_cognition_request({
        "operation": "place-local", "material": material, "declared_sha256": digest,
    })
    direct = place_direct_local(material, digest)
    final = _SANDBOX / "research-in" / f"{digest}.bin"

    assert final.read_bytes() == material
    assert cognition | {"route": "direct-local"} == direct
    assert cognition["completion"] == "materialized"
    assert not _SANDBOX.is_symlink()
    assert not (final.parent).is_symlink()
    assert not list((final.parent).glob(".placing-*"))
    assert "root" not in inspect.signature(place_from_cognition_request).parameters
    assert "root" not in inspect.signature(place_direct_local).parameters

    expect_error(lambda: place_direct_local(material, "0" * 64))
    expect_error(lambda: place_from_cognition_request({
        "operation": "place-local", "material": material, "declared_sha256": digest, "destination": "elsewhere",
    }))
    assert final.read_bytes() == material

    print("ecological crossing specimen: PASS")


if __name__ == "__main__":
    main()
