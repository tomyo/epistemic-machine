# S03 — Two-Machine Deterministic Request/Reply

**Status:** completed bounded specimen — evidence recorded

This standalone specimen exercises one boundary from [`docs/missions/s03-two-machine-request-reply.md`](../../docs/missions/s03-two-machine-request-reply.md): a request may be delivered without automatically being executed, and B may replace its private realization without changing the small public result.

## Run

```bash
node verify.js
```

The verifier creates and removes a temporary workspace. It checks:

1. A emits only `{ from, to, operation, correlation, payload }` and receives no B-private state or path.
2. Delivery creates no result before B's explicit `receiveAndExecute` step.
3. A result preserves the request correlation.
4. Object-backed and list-backed B-private `lookup` implementations produce the same public result.
5. Wrong target, wrong operation, and malformed payload requests produce no successful result.

## Scope boundary

`machines.js` uses only Node.js standard-library modules. Its temporary request/result files are this specimen's local transport realization; they are not a root-bus integration, event system, durable-communication requirement, or reusable protocol.

No helper is promoted from this directory. S03 does not establish identity, authority, reachability, resource sharing, an operator runtime, a watcher, a session model, or a reusable capability/transport foundation. A later independent specimen must demonstrate a recurring need or insufficiency before any shared primitive is considered.

JavaScript is a local realization choice: it reuses the workshop's existing Node verification style and keeps the specimen dependency-free. It does not decide EM's implementation language or preclude a later, separately scoped Python realization of the same boundary.
