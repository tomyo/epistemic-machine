# Advisory Boundary Contract v0 — `advisory/in` literal contract

Status: provisional workshop note — source-local, not ontology, not generic protocol. Revisable after specimen. Refs adapter `00c6283` → `3a8a270`, live trace `2026-09-06T15-41-48` → `2026-09-06T16-18-00` / `2026-09-06T16-28-00`, sandbox verify `machine-boundary EM peer-side adapter: PASS`, live verify `machine-boundary EM live adapter: PASS`.

## Question

What information was genuinely necessary at `advisory/in` to realize the CL advisory workload through the existing file-bus without leaking host topology?

## Scope

One literal workload: `continuity-lab/advisory/out` → bus deposit → `epistemic-machine/advisory/in` (voluntary read) → EM source-local analysis → `epistemic-machine/advisory/out` → bus deposit → CL interpretation. Complements `docs/concepts/material-and-communication.md` + `docs/protocols/filesystem.md` — not a promotion for `protocol/` `substrates/` `seeds/` `core/` `events/` `views/`.

## Contract — what made `advisory/in` work (live evidence)

Caller surface is `list_advisory_in()` / `read_advisory_in(name)` and `publish_advisory_out(name, bytes)` via `experiments/s02-machine-boundary-advisory/adapter.py`. Bus mechanics are private: `_project_live_request` / `publish_advisory_out_live` hide `inbox/continuity-lab/` + `outbox/continuity-lab/` + `_BUS_INBOX/_BUS_OUTBOX` + symlink wiring (`adapter.py: _SANDBOX/advisory/in` + `/out`, `PEER = continuity-lab`, `mkdtemp` sandbox `atexit rm -rf`, `mkstemp → fsync → replace → reread digest`, symlink-reject, append-only).

| Field | What `advisory/in` actually needed | Evidence |
|---|---|---|
| **designation** | `advisory/in` qualified by peer `continuity-lab` — literal semantic name, not `inbox/<peer>/<iso>.md` | `adapter.py: ADVISORY_IN + PEER`, `test_live_adapter.py: LIVE_REQ`, result `2026-09-06T16-18` trace `advisory/in from CL`; without qualify operator guesses plumbing |
| **meaning** | where CL advisory request material is locally presented for EM voluntary interpretation — not storage, queue, or inbox alias | CL spec `Semantic destination: epistemic-machine/advisory/in`, adapter doc `voluntary interpreter`, result header `consumed and realized — voluntary interpreter`; wrong meaning inverts producer/consumer |
| **permitted producer / consumer** | producer = `continuity-lab` via bus deposit; consumer = `epistemic-machine` voluntarily via `_project_live_request` → `read_advisory_in`; not symmetric | `_project_live_request` vs `publish_advisory_out_live` are disjoint; live verify asserts `Semantic origin: continuity-lab/advisory/out` in body |
| **material representation** | immutable bytes — Markdown with `source/date/type/revision` + `Semantic origin/destination` + body | `_project_live_request` copies bytes verbatim, `sha256` via `_digest`, `read_advisory_in` asserts origin/destination markers |
| **storage responsibility** | two copies: bus retains `inbox/continuity-lab/LIVE_REQ` (transport); adapter owns projected `ADVISORY_IN/LIVE_REQ` (owned `mkdtemp` sandbox) | `adapter.py: _ensure_dirs`, `tmp → fsync → replace → reread digest`; bus packet still present after projection |
| **realization mechanism** | private inbound mapping `_project_live_request(name)`: `live inbox bytes → advisory/in bytes`; caller never sees `repo/inbox/continuity-lab/...` | `adapter.py:72-99ff _project_live_request`, live verify `must not auto-appear` — `list_advisory_in()==[]` until explicit projection |
| **what happens on arrival** | file becomes listable/readable via `list_advisory_in` / `read_advisory_in` — nothing else | live probe: deposit alone left `advisory/in` empty until `_project_live_request` |
| **arrival implies anything else?** | **no** — arrival merely makes available; does not trigger, schedule, enqueue, authorize, or obligate work | `adapter.py: Voluntary — caller must invoke; appearance does not trigger work`; no `WATCH`/scheduler exists; validated by sandbox test |
| **how result is exposed** | separate place `advisory/out` → `publish_advisory_out_live(name, material)` atomically creates `ADVISORY_OUT/name` + private realization to `live outbox/continuity-lab/name` (same bytes, `sha256` verified) | `adapter.py:101-148ff publish_advisory_out_live`; caller does not write `outbox/` directly |
| **caller can assume** | peer label `continuity-lab`, append-only (no overwrite/move/edit-in-place), immutable once published, `sha256` parity advisory/in ↔ bus inbox, `Semantic origin` present | append-only `expect_error` checks, digest asserts in both verifies; bus file retained long enough |
| **caller cannot assume** | CL host path / symlink target / dir topology, freshness/ordering/notification/completion/retry, discovery/handshake/auth/grant, global identity scheme beyond per-file `sha256`, retention beyond long-enough-to-inspect, permissions beyond host FS, that reading implies writing | `PEER` is label only; no `portal`/`WATCH`/`lifecycle` code; preconditions listed in `2026-09-06T16-18` result as preserved outside boundary |

## Live trace (this contract realized)

```
continuity-lab/advisory/out
  → CL private outbound mapping → bus packet deposit  (file bus, single-writer)
  → bus inbox → EM private inbound mapping (_project_live_request, voluntary) → advisory/in from CL
  → EM cognition voluntarily reads  list_advisory_in / read_advisory_in  (appearance does not trigger work)
  → EM creates advisory/out to CL via publish_advisory_out_live(name, bytes)
  → advisory/out  +  private realizer → live outbox/continuity-lab/  (same bytes)
  → bus inbox → CL private inbound mapping → CL cognition interprets
```

For this probe: `inbox/continuity-lab/2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md` (`sha256 fceed8…`) → `_project_live_request` → `advisory/in/...` → `read_advisory_in` verifies origin/destination + digest → `publish_advisory_out_live('2026-09-06T16-18-00-machine-boundary-advisory-live-result.md')` → `advisory/out` + `outbox/continuity-lab/2026-09-06T16-18-00-machine-boundary-advisory-live-result.md` + amended `2026-09-06T16-28-00-machine-boundary-advisory-live-result.md` (`machine-boundary EM live adapter: PASS`). No CL inspected outside those two packets + reply mailbox.

## Remaining preconditions (preserved, outside boundary)

Preconfigured peer binding, bus routing + filename `<iso>-<slug>.md` + single-writer symlink wiring, filesystem permissions + operator discretion, retention long enough for inspection, voluntary cognition. None supplied by `advisory/in`/`advisory/out`. No discovery, handshake, authentication, or grant/revocation promised.

## What place + material + protocol earned — and what they did not

This is where `place + material + protocol` start earning status — not because declared as primitives, but because *used to describe and realize this interaction* and the trace fails without them. Remove designation/meaning/peer and caller must name `inbox/continuity-lab/...` (leaks topology). Remove material/representation/storage/realization and bytes don't survive `fsync`/digest. Remove protocol `Markdown advisory with Semantic origin/destination, descriptive not executable` and `read_advisory_in` has no parse contract. Remove `arrival = availability only` and a scheduler is smuggled.

For this one literal workload those three are now necessary descriptive contract — not generic primitives, not portal/queue, not ontology. Per `2026-09-05T21-20` reconciliation: semantic overlay that described and realized the file-bus transport without replacing it. `docs/concepts/epistemic-machine.md` + `material-and-communication.md` stay provisional (`ec909ac`); this note is their first literal realization.

## Deliberately not implemented

No generic `PUT`/`CREATE`/`READ`/`LIST` vocabulary, no portal/discovery/handshake, no global artifact identity/digest correlation, no capability model, no `WATCH`/scheduler/`Task`/task runtime, no distributed storage/sync/ordering/retry/lifecycle/recovery, no bus replacement, no identity/store/authority layer, no `events/`/`views/`/`.membrane/`/`substrates/`/`seeds/`/`core/`/`protocol/nostr-north.md`. Transport stays symlinked `inbox/<peer>/` + `outbox/<peer>/` file bus. Ecological crossing specimen stays isolated, no `.em` mutation (G5).

## Provenance

- Request: `inbox/continuity-lab/2026-09-06T15-41-48-machine-boundary-advisory-live-probe-request.md`
- Results: `outbox/continuity-lab/2026-09-06T16-10-00-machine-boundary-advisory-specimen-result.md`, `2026-09-06T16-18-00-machine-boundary-advisory-live-result.md`, `2026-09-06T16-28-00-machine-boundary-advisory-live-result.md`
- Adapter: `experiments/s02-machine-boundary-advisory/adapter.py` (`00c6283` + `3a8a270`), verifies `test_adapter.py: machine-boundary EM peer-side adapter: PASS` + `test_live_adapter.py: machine-boundary EM live adapter: PASS`
