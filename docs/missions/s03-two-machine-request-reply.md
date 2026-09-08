# S03 — Two-Machine Deterministic Request/Reply

**Status: completed — authorized bounded specimen with recorded evidence**

## Boundary

This completed standalone specimen was a bounded authorized experiment, not a mission. Its completion neither selects a workshop roadmap nor establishes an integrated EM runtime.

## Question to break

> Can two bounded machine realizations exchange one declared request and correlated result while the receiver changes its private implementation without changing the public interaction?

The specimen tests the communication ↔ execution boundary in a deliberately controlled form. A deterministic function is the first embodiment of execution here; it is not a definition of EM execution.

## Bounded realization

Implementation was confined to `experiments/s03-two-machine-request-reply/` and used only Node.js standard-library files and a temporary test workspace.

- **Machine A** knows a static target alias, one exported operation (`lookup`), a request payload, and a caller-generated correlation value. It has no receiver-private path or state access.
- **Transport realization** records request and result records under the specimen's temporary workspace. These files are a local, durable realization for the test, not a claim that all communication must be retained.
- **Machine B** explicitly accepts a delivered request, validates the one declared operation, and executes `lookup` against private state before emitting a correlated result.
- **Private-change probe** runs the same public request against two different B-private representations with equivalent `lookup` behavior. The public result must remain the same.

The fixture is deliberately explicit: delivery alone does not execute B. The verifier invokes B's receive/execute step after delivery and checks that no result exists beforehand.

## Public interaction contract

A request has only:

```text
from, to, operation, correlation, payload
```

A successful result has only:

```text
from, to, correlation, value
```

For this specimen, records are UTF-8 JSON objects; `from`, `to`, `operation`, and `correlation` are non-empty strings; `from` and `to` are static fixture aliases; `operation` is exactly `lookup`; `payload` is exactly `{ "key": string }`; and `value` is a string. Invalid target, operation, or malformed request is rejected by B and produces no successful result. Record layout, temporary paths, B's state representation, and B's implementation functions are private realization.

## Acceptance checks

The authorized specimen provided one runnable `node experiments/s03-two-machine-request-reply/verify.js` check that demonstrated all of the following:

1. A emits a request using only the public interaction contract; its code does not receive a B-private path or B-private state.
2. B emits no result merely because the request was delivered; an explicit receive/execute step is required.
3. B returns a result whose `correlation` matches the request.
4. Replacing B's private implementation with a different private representation produces the **same public result** for the same request.
5. Invalid target, invalid operation, and malformed request input are each rejected without a successful result.

## Measured result

`node experiments/s03-two-machine-request-reply/verify.js` exits 0. In isolated temporary workspaces it observed no result after A delivered the request, then observed B's explicitly invoked `receiveAndExecute` produce the correlated result. An object-backed and a list-backed private B `lookup` implementation returned the same complete public result for the same complete request. Wrong target, wrong operation, and malformed payload were rejected without a successful result.

This measured result supports only the stated boundary: the public interaction need not expose B's private realization, and delivery need not be execution. It **does not establish machine identity**, authority, reachability, durable communication requirements, resource sharing, or a reusable primitive.

## Explicit non-goals

S03 uses a separate local fixture rather than the root `inbox/` / `outbox/` peer bus. It includes no watcher or daemon, LLM or cognitive operator, `.em/` state, session runtime, reusable capability framework, event semantics, discovery, directory service, authority behavior, trust negotiation, public-key machinery, globally resolvable identity, routing, resource transfer, synchronization, or arbitrary remote command interface.

Static aliases and a local transport fixture are test controls, not identity, authority, or reachability solutions. The result records are not a generic event lifecycle or a claim of event sourcing.

## Evidence boundary and disposition

The recorded success supports only this: a small public interaction can remain intelligible without exposing the receiver's private realization, and delivery can remain distinct from execution. It does not establish machine identity, authority, reachability, durable communication requirements, resource sharing, operator-free autonomy, or any reusable transport/capability primitive.

A failure would have been retained as evidence of the smallest missing distinction. No helper leaves this experiment unless recurring use or demonstrated insufficiency earns promotion.

## Related design records

- [`docs/notes/em-embodiment-map-v0.md`](../notes/em-embodiment-map-v0.md) records the separate transport, communication, execution, retained-representation, and identity/provenance pressures.
- [`docs/notes/em-boundary-hypotheses-v0.md`](../notes/em-boundary-hypotheses-v0.md) records the Machine ↔ machine and Communication ↔ execution hypotheses this specimen would exercise.
- [`docs/missions/m00-first-continuity-loop-retrospective.md`](m00-first-continuity-loop-retrospective.md) records why prior success did not promote a stable primitive.
