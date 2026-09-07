"""Live probe: consume the real bus request through the existing EM adapter.

Must print exactly:
  machine-boundary EM live adapter: PASS
"""

from __future__ import annotations

import hashlib
from pathlib import Path
import sys

from adapter import (
    ADVISORY_IN,
    ADVISORY_OUT,
    PEER,
    BoundaryError,
    _project_live_request,
    list_advisory_in,
    publish_advisory_out_live,
    read_advisory_in,
)

LIVE_REQ = "2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md"
LIVE_RESP = "2026-09-06T16-18-00-machine-boundary-advisory-live-result.md"


def main() -> None:
    req_path = _project_live_request(LIVE_REQ)
    assert req_path.parent == ADVISORY_IN
    assert LIVE_REQ in list_advisory_in()
    body = read_advisory_in(LIVE_REQ)
    assert b"Semantic origin: continuity-lab/advisory/out" in body
    assert b"Semantic destination: epistemic-machine/advisory/in" in body
    req_digest = hashlib.sha256(body).hexdigest()

    header = (
        "---\n"
        "source: epistemic-machine\n"
        "date: 2026-09-06\n"
        "type: observation\n"
        "revision: 1\n"
        "---\n\n"
        "<excerpt>Live advisory-boundary trace through EM adapter: advisory/in from CL consumed and advisory/out realized to live bus - voluntary interpreter.</excerpt>\n\n"
        "# Machine-boundary advisory live trace - EM half\n\n"
        "Status: exploratory specimen per CL 2026-09-06T15-41 live probe request (sha256 fceed8...). No stabilization or architecture adoption.\n\n"
    ).encode()
    rest = (
        b"## Semantic trace (literal workload)\n\n"
        b"```\n"
        b"continuity-lab/advisory/out (CL response origin, previous specimen)\n"
        b"  -> CL private outbound mapping -> bus packet deposit (file bus, single-writer)\n"
        b"  -> bus inbox -> EM private inbound mapping (_project_live_request, voluntary) -> advisory/in from CL\n"
        b"  -> EM cognition voluntarily reads via list_advisory_in / read_advisory_in (material appearance does not trigger work)\n"
        b"  -> EM creates advisory/out to CL via publish_advisory_out_live(name, bytes) -> immutable advisory/out + private realizer to live outbox/<peer>/\n"
        b"  -> bus inbox -> CL private inbound mapping -> CL local response name -> CL cognition interprets\n"
        b"```\n\n"
        b"For *this* live probe specifically:\n\n"
        b"```\n"
        b"bus: inbox/continuity-lab/2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md\n"
        b"  -> _project_live_request('2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md')\n"
        b"  -> advisory/in/2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md (voluntary projection)\n"
        b"  -> read_advisory_in(...) verifies Semantic origin/destination + body digest\n"
        b"  -> publish_advisory_out_live('2026-09-06T16-18-00-machine-boundary-advisory-live-result.md', material)\n"
        b"  -> advisory/out/2026-09-06T16-18-00-machine-boundary-advisory-live-result.md (immutable, sha256-verified)\n"
        b"  -> live outbox/continuity-lab/2026-09-06T16-18-00-machine-boundary-advisory-live-result.md (private realization)\n"
        b"```\n\n"
        b"## Minimal receipt (ties trace to live request, no CL topology at caller surface)\n\n"
        b"This result was produced by consuming `2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md`\n"
        b"through `advisory/in` and publishing `2026-09-06T16-18-00-machine-boundary-advisory-live-result.md` through `advisory/out`.\n"
        b"Receipt: peer `continuity-lab`, consumer `epistemic-machine`, request `2026-09-06T15-41-48-live-probe-request`, response `2026-09-06T16-18-00-live-result`,\n"
        b"advisory/out write followed by live outbox realization of same bytes. No CL host path, symlink target, or packet-plumbing name was required at the caller surface.\n\n"
        b"## Remaining preconditions (preserved, outside boundary)\n\n"
        b"Preconfigured peer binding, bus routing + filename convention + single-writer symlink wiring, filesystem permissions + operator discretion, retention long enough for inspection, voluntary cognition. None supplied by advisory/in/out.\n\n"
        b"## Non-claims\n\n"
        b"No generic protocol, no portal, no identity/lifecycle/authority model, no scheduler/discovery/WATCH, no bus replacement, no ordering/retry guarantee. One literal trace only.\n"
    )
    resp_material = header + rest
    assert req_digest[:8].encode() not in resp_material

    repo_root = Path(__file__).resolve().parents[2]
    live_out = repo_root / "outbox" / PEER / LIVE_RESP
    if live_out.exists():
        assert live_out.read_bytes() == resp_material
        # also verify request still projected correctly
        assert LIVE_REQ in list_advisory_in()
        print("machine-boundary EM live adapter: PASS")
        return
    receipt = publish_advisory_out_live(LIVE_RESP, resp_material)
    assert receipt["peer"] == PEER
    assert receipt["realized"] == "live-bus-outbox"
    assert (ADVISORY_OUT / LIVE_RESP).read_bytes() == resp_material
    assert live_out.read_bytes() == resp_material

    print("machine-boundary EM live adapter: PASS")


if __name__ == "__main__":
    try:
        main()
    except BoundaryError as e:
        print(f"FAIL: {e}", file=sys.stderr)
        raise SystemExit(1)
