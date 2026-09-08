# S04 — Bounded Resource Reference and Projection

**Status:** completed bounded specimen — evidence recorded

This standalone specimen exercises the bounded question in [`docs/missions/s04-bounded-resource-reference-projection.md`](../../docs/missions/s04-bounded-resource-reference-projection.md): can A request one public, fixture-local resource/revision label from B without knowing how B stores it?

## Run

```bash
node verify.js
```

The verifier creates and removes separate temporary workspaces. It checks:

1. A emits only `{ from, to, operation, correlation, reference }`.
2. Delivery creates no result before B's explicit `receiveAndProject` step.
3. The public result preserves correlation and reference.
4. A flat private map and a nested private store produce the same complete public projection, with no private path or store-layout keys exposed.
5. Unknown resource/revision, wrong target/operation, malformed reference, invalid JSON, and an over-64-byte projection produce no successful projection or partial result record.

## Scope boundary

`resources.js` uses only Node.js standard-library modules. Its local request/result files model a temporary test transport; they are not root-bus integration, durable-communication policy, event semantics, resource graph, revision history, or a reusable protocol.

The `orbital-note` / `v1` labels are fixture-local selectors, not global resource identity, ownership, provenance, authority, or reachability. The bounded text is one projection result, not general resource transfer or synchronization.

No helper is promoted from this directory. S04 does not establish a reusable resource abstraction, identity, authority, reachability, a machine boundary, a watcher, a session model, resource retention, or a shared transport/capability foundation. A later independent specimen must demonstrate recurrence or insufficiency before any shared primitive is considered.

JavaScript is a local realization choice only: Node.js standard-library code keeps the specimen small and is not an EM language decision.
