# S04 — Bounded Resource Reference and Projection

**Status: completed — authorized bounded specimen with recorded evidence**

## Boundary

S04 is an authorized standalone specimen, not a roadmap or an integrated EM runtime. It tests whether a fixed, fixture-local resource reference can cross a machine-to-machine interaction without exposing the receiver's private resource layout. It does not establish a general resource model, identity scheme, or revision system.

## Question to break

> Can A request one bounded public resource reference from B and receive the same correlated public projection while B changes its private resource layout?

This is a deliberately small probe of the resource / revision and semantic-surface / private-realization distinctions. The `resource` and `revision` labels below are B-local fixture selectors; they do not assert a globally identified logical resource or a general revision relationship.

## Bounded realization

Implementation is confined to `experiments/s04-bounded-resource-reference-projection/`, uses Node.js standard-library modules, and creates/removes its own temporary workspace.

- **Machine A** knows a static target alias, the one exported operation `project-resource`, a public reference, and a caller-generated correlation. It receives no B-private path, store, or layout.
- **Transport realization** writes local temporary request/result records. They model delivery for this test only; retained files do not make communication, projection, or resource state a general event model.
- **Machine B** explicitly receives a delivered request, validates it, projects the one allowed resource/revision from private representation, and emits a correlated public result.
- **Private-change probe** uses flat-map and nested-store B-private layouts containing equivalent bounded text. The complete public result must be identical.

Delivery alone does not project a resource: the verifier checks that no result record exists before B's explicit receive/project step.

## Public interaction contract

All records are UTF-8 JSON objects. A request has exactly:

```text
from, to, operation, correlation, reference
```

For this specimen, `from`, `to`, `operation`, and `correlation` are non-empty strings; `from` and `to` are static fixture aliases; `operation` is exactly `project-resource`; and `reference` is exactly:

```json
{ "resource": "orbital-note", "revision": "v1" }
```

A successful result has exactly:

```text
from, to, correlation, reference, mediaType, content
```

It echoes the reference; `mediaType` is exactly `text/plain`; and `content` is at most 64 UTF-8 bytes. The verifier uses strict deep equality of complete parsed results across B realizations. An unknown resource, unknown revision, wrong target/operation, malformed reference, or invalid JSON request produces no successful result. B-private filesystem paths, layouts, lookup functions, and retained representation are outside the public contract.

## Acceptance checks

The specimen must provide `node experiments/s04-bounded-resource-reference-projection/verify.js`, demonstrating:

1. A emits only the fixed public request and has no B-private path/store input.
2. Delivery creates no projection before B's explicit receive/project step.
3. The result preserves the request correlation and exact public reference.
4. Flat-map and nested-store B-private realizations produce exactly the same complete public result for the same complete request.
5. Unknown resource, unknown revision, wrong target/operation, malformed reference, invalid JSON, and an over-64-byte projection each produce no successful projection; each rejected correlation has no result record and the result collection remains empty.

## Measured result

`node experiments/s04-bounded-resource-reference-projection/verify.js` exits 0. In two separate temporary workspaces, A delivered the same complete request and no result existed before B's explicit `receiveAndProject` call. A flat-map B-private representation and a nested-store B-private representation then returned strict-deep-equal complete public results: the same correlation, reference, media type, and bounded text. The verifier also asserts that the serialized public result contains neither its temporary private path nor the nested-store layout keys.

Unknown resource, unknown revision, wrong target, wrong operation, malformed reference, invalid JSON, and an over-64-byte private projection each caused rejection; each tested correlation had no result record and the result collection remained empty. This evidence supports only a stable bounded public projection across B-private layout substitution, with delivery distinct from explicit projection. It does not establish a reusable resource abstraction, global/logical resource identity, revision history, ownership, provenance, authority, reachability, resource sharing, durable communication, a machine boundary, or a reusable primitive.

## Explicit non-goals

S04 uses a separate temporary fixture, not root `inbox/` / `outbox/` transport. It includes no watcher/daemon, `.em/`, S03 source import, LLM or cognitive operator, session runtime, generic resource API, resource graph, revision history, digest/CAS, Git, event semantics, discovery, global identity, authority, reachability, trust/key machinery, synchronization, resource transfer beyond this fixed bounded text projection, arbitrary remote commands, or reusable foundation.

Static aliases and local labels are test controls, not identity, authority, reachability, resource ownership, or provenance solutions. Success would not show that a projected resource must persist, that B owns a machine boundary, or that any helper should be shared.

## Evidence boundary and disposition

Success would support only this: an intelligible public resource reference/projection can remain stable while B changes private layout, and delivery can remain separate from explicit projection. Failure should be retained as evidence of the smallest missing distinction. No helper leaves this experiment unless an independent later specimen demonstrates recurrence or insufficiency.

## Related design records

- [`docs/notes/resource-session-working-views-lineage-v0.md`](../notes/resource-session-working-views-lineage-v0.md) retains the resource / revision distinction without selecting a resource substrate.
- [`docs/notes/em-embodiment-map-v0.md`](../notes/em-embodiment-map-v0.md) records the resource/revision and materialization pressures.
- [`docs/notes/em-boundary-hypotheses-v0.md`](../notes/em-boundary-hypotheses-v0.md) records Machine ↔ machine and semantic-surface ↔ private-realization hypotheses.
- [`docs/missions/s03-two-machine-request-reply.md`](s03-two-machine-request-reply.md) records the prior request/reply evidence; S04 imports no S03 helper.
