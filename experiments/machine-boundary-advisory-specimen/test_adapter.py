"""Verification: EM peer-side advisory/in→advisory/out over hidden bus."""

from __future__ import annotations

import hashlib
import inspect

from adapter import (
    ADVISORY_IN,
    ADVISORY_OUT,
    _BUS_INBOX,
    _BUS_OUTBOX,
    PEER,
    BoundaryError,
    _deposit_bus_request,
    _project_to_advisory,
    list_advisory_in,
    publish_advisory_out,
    read_advisory_in,
)


def expect_error(fn):
    try:
        fn()
    except BoundaryError:
        return
    raise AssertionError("expected BoundaryError")


def main() -> None:
    req_name = "2026-09-06-specimen-request.md"
    req_body = b"# Advisory request\n\nSource: continuity-lab\nPlease analyze the boundary.\n"
    req_digest = hashlib.sha256(req_body).hexdigest()

    resp_name = "2026-09-06-specimen-response.md"
    resp_body = b"# Advisory response\n\nSource: epistemic-machine\nBoundary holds.\n"
    resp_digest = hashlib.sha256(resp_body).hexdigest()

    # 1) voluntary ingress: material appears only after explicit projection step
    _deposit_bus_request(req_name, req_body)
    assert not (ADVISORY_IN / req_name).exists(), "advisory/in must not auto-appear — voluntary interpreter"
    assert list_advisory_in() == []
    _project_to_advisory(req_name)
    assert list_advisory_in() == [req_name]
    assert read_advisory_in(req_name) == req_body
    assert hashlib.sha256(read_advisory_in(req_name)).hexdigest() == req_digest

    # 2) publish advisory/out is immutable — bus realization is hidden but proven via bytes
    receipt = publish_advisory_out(resp_name, resp_body)
    assert (ADVISORY_OUT / resp_name).read_bytes() == resp_body
    assert (_BUS_OUTBOX / resp_name).read_bytes() == resp_body
    assert receipt["sha256"] == resp_digest
    assert receipt["peer"] == PEER
    # no CL paths exposed to operator surface
    assert "continuity-lab" not in str(ADVISORY_IN) or PEER in str(ADVISORY_IN)  # peer label only, not host path
    # operator surface hides bus mechanics — no bus dirs in signatures
    for fn in (list_advisory_in, read_advisory_in, publish_advisory_out):
        sig = inspect.signature(fn)
        params_src = str(sig)
        assert "bus" not in params_src.lower() and "symlink" not in params_src.lower()
        assert "host" not in params_src.lower() and "inbox" not in params_src.lower() and "outbox" not in params_src.lower()

    # 3) append-only / no overwrite
    expect_error(lambda: _deposit_bus_request(req_name, req_body))
    expect_error(lambda: publish_advisory_out(resp_name, resp_body))

    # 4) not a symlink, not inbox/outbox-names in operator paths
    assert not ADVISORY_IN.is_symlink() and not ADVISORY_OUT.is_symlink()
    assert not (_BUS_INBOX).is_symlink() and not (_BUS_OUTBOX).is_symlink()
    assert not list(ADVISORY_IN.glob("inbox*")) and not list(ADVISORY_IN.glob("outbox*"))
    assert not list(ADVISORY_OUT.glob(".publish-*")) and not list(_BUS_OUTBOX.glob(".realize-*"))

    # 5) material unchanged by round-trip (digest parity)
    assert hashlib.sha256((ADVISORY_IN / req_name).read_bytes()).hexdigest() == hashlib.sha256((_BUS_INBOX / req_name).read_bytes()).hexdigest()

    print("machine-boundary EM peer-side adapter: PASS")


if __name__ == "__main__":
    main()
