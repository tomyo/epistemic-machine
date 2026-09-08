# M01 — Habitat-0: First Runnable Internal Ecology

**Status: adopted and authorized for implementation**

## Purpose

M01 is a **bounded embodiment**, not a discriminator experiment, S06, or commitment to final runtime architecture. Its purpose is to put the current provisional machine/ecology map into real local use so ordinary defects and architectural pressure can be distinguished.

## Scope

Habitat-0 lives inside this workshop repository and provides one private local ecology. It is the **first concrete realization of the ecology boundary**: its mechanisms are intentionally local and replaceable, and are not proposed as the final ecology substrate. Through a Habitat-0 operation—not a global command—it creates two simpler resident machines, M1 and M2. Each receives a generated local identity and isolated retained state/resources.

The one workflow must engage the current machine responsibilities:

1. M1 explicitly requests a bounded representation or operation concerning a resource retained by M2.
2. Habitat-0 delivers the declared local interaction without exposing M2's private path or layout.
3. M2 runs only under **explicit activation**, performs one deterministic declared operation, and returns a correlated bounded result.
4. M1 retains that result and performs one defined consequential follow-up from it.
5. A local inspection surface can show the retained interaction/result and resulting state without interpreting private M2 material.

This is not a nicer repetition of S03: M01 must run machine state, communication, explicit execution, and retained consequence together inside one actual habitat.

## Intended boundary

```text
Habitat-0
  ├── creates / refers / delivers / explicitly activates
  ├── M1: identity + private state + communication + execution
  └── M2: identity + private state + communication + execution
```

M1 and M2 are resident machines, not child-process stand-ins. They remain non-recursive for M01: neither provisions residents or hosts another ecology. Habitat-0 provides mechanisms, not M1/M2 policy.

## Initial constraints

- Activation is explicit; no daemon, watcher, scheduler, or subscription system is required.
- The local CLI activates Habitat-0 machinery and its residents; it is **not a global** machine-creation or discovery interface.
- M01 uses a private local delivery realization. It does not alter or depend on the EM↔CL bus.
- Resource access is bounded representation/operation, not shared private filesystem access.
- No external transport, global identity, authority model, generic capability framework, event model, reusable seed, recursive hosting, Git/CAS, or shared foundation is in scope.

## Acceptance criteria

Runnable checks must demonstrate that: Habitat-0 can create M1 and M2; their private state remains isolated; one resource-oriented request/result is correlated; delivery is distinct from M2 execution; M1's retained follow-up survives a fresh CLI invocation; and the inspection surface does not disclose M2-private layout.

A failure should be recorded as implementation defect or architecture pressure according to the [provisional architecture revision rule](../architecture/provisional-architecture-v0.md#revision-rule). It does not automatically earn a new primitive.

## Authorization boundary

The human has adopted Roadmap v1 and authorized implementation of M01 using this mission's bounded realization and the current provisional architecture. That authorization does not extend to external transport, global identity/discovery, authority, reusable seeds, recursive hosting, a daemon, generic capabilities, or a shared foundation.

## Related records

- [`docs/architecture/provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md)
- [`docs/architecture/embodiment-status-v0.md`](../architecture/embodiment-status-v0.md)
- [`docs/roadmaps/embodiment-roadmap-v1.md`](../roadmaps/embodiment-roadmap-v1.md)
- [`docs/missions/s03-two-machine-request-reply.md`](s03-two-machine-request-reply.md) and [`docs/missions/s04-bounded-resource-reference-projection.md`](s04-bounded-resource-reference-projection.md) — bounded predecessor evidence, not imported implementations.
