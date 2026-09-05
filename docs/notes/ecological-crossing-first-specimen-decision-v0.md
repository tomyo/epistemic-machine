# Ecological Crossing First Specimen — Decision v0

Status: provisional workshop decision; revisable after the specimen

## Question

Can two local entrypoints preserve one bounded placement meaning without introducing an ecology runtime or treating a filesystem representation as authority?

## Provisional decision

Build one isolated `place_local` specimen. A cognition-shaped request and a direct local call invoke the same test-owned adapter. The adapter alone owns a fixed local destination and rejects any caller-supplied destination.

### Operation contract

- Input: bytes and their declared SHA-256 digest, received through one of two fixed entrypoints.
- Owner: the specimen adapter owns path selection, digest validation, temporary output, replacement, and receipt creation.
- Completion: `os.replace` has materialized a digest-derived final filename in the fixed directory and rereading it reproduces the digest.
- Provenance: receipt `route` identifies `cognition-shaped` or `direct-local`; it is not actor, machine, or permission identity.
- Idempotence: an existing equal-digest file with equal bytes succeeds; a digest/content mismatch fails without materialization.

## Disposition of review findings

| Disposition | Decision |
|---|---|
| Adopt | Fixed-destination local placement, SHA-256 validation, atomic replacement, reread verification, and route-bounded receipts. |
| Adopt | Both entrypoints reach the same adapter and must yield comparable material and receipts. |
| Reject for this specimen | Session-generated executable, persistent session tool, arbitrary filesystem interception, aliases/resolvers, global machine/artifact IDs, generic protocol, network transport, virtual filesystem, and `.em/` mutation. |
| Defer | Authentication/authorization, recipient acknowledgement, ordering, retries, backpressure, cancellation, broad concurrency, crash recovery, remote delivery, topology/link/share semantics, and representation-independent identity. |
| Falsify | Any bypass of validation, path escape, partial/stale temporary artifact, or route-dependent output fails the specimen. |

## Vocabulary boundary

`place-local` is a fixture operation, not a discovered `PUT`/`CREATE`/`READ`/`LIST` vocabulary. The two entrypoints exercise the same adapter; they do not establish that small or large LLMs, humans, processes, or remote machines share a semantic interface. A semantic compiler is a separate candidate that requires an independently defined operation contract and later authorization.

## Not built

This is not a general ecology architecture. It does not introduce a live machine, a continuity keep, a shared inbox/outbox protocol, a shared primitive language, or a semantic compiler. The directory is disposable experiment output only.

## Evidence boundary

A passing test supports only local realization parity for this fixed operation. It does not support claims about machines, actors, remote substrates, authority, durable ecological communication, cross-actor vocabulary, or semantic compilation.

## Inputs

- `docs/concepts/material-and-communication.md`
- `docs/protocols/filesystem.md`
- `docs/missions/mission-0.md`
- `docs/notes/ecological-crossing-first-specimen-review-v0.md`
- Lab advisory `artifacts/20260905-ecological-crossing-advisory-v0.md` (advisory only)
- Lab EIP-0063 / UTP-096 shared-vocabulary refinement (non-authoritative)
