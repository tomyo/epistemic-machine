# Embodiment Status v0

**Status:** post-preparation status record — no runtime, seed, machine instance, or implementation is authorized or present

Embodiment Preparation is closed. Roadmap v1 is adopted and M01 / Habitat-0 is authorized; this record remains its scope boundary until real use revises it.

## Current decision

**Habitat-0** is the first local habitat: one provisional ecology realization kept inside this workshop repository. It is the first concrete realization of the ecology boundary; its mechanisms are intentionally local and replaceable, not a proposed final ecology substrate. It is **not a seed**. A reusable seed would be a repeatable initialization contract extracted only if later use requires it.

Habitat-0 is not a global machine manager. `create machine` is a Habitat-0 operation performed within that habitat; it does not imply a host-global CLI command, registry, or discovery mechanism.

## Proposed M01 realization

```text
repository
  └── Habitat-0 (authorized local habitat; no files created yet)
        ├── resident M1 (private state/resources)
        └── resident M2 (private state/resources)
```

| Responsibility | Habitat-0 | Resident machine in M01 |
|---|---|---|
| Identity | Holds local references for residents. | Holds a generated local identity; it is not globally resolvable identity. |
| State/resources | Mediates bounded access/delivery. | Retains private material and decides what bounded representation to expose. |
| Communication | Delivers a declared local interaction. | Sends, receives, and retains relevant interaction records. |
| Execution | Offers only explicit activation mechanisms. | Performs one declared deterministic operation when explicitly activated. |
| Provisioning | Creates residents as a local Habitat-0 feature. | Does not create child machines. |

Resident machines are deliberately **non-recursive** in M01: they do not host an ecology or provision further machines. Habitat-0 itself is a provisional local implementation, not evidence that hosting/containment is a permanent identity or authority relationship.

## What remains absent

- **No daemon** or always-running process is required. Activation is explicit through the future local CLI.
- The EM↔CL bus is unchanged. It remains workshop-peer transport and is not M01's internal delivery mechanism.
- No external transport, discovery, global identity, authority model, general capability framework, attention/subscription system, or event system is selected.
- No `seeds/`, `src/`, or `machines/` implementation surface is created by this preparation work.

## Revisit conditions

A reusable seed becomes worth considering only when a second habitat needs the same repeatable initialization contract. Recursive hosting becomes a candidate only when a resident must itself provide an ecology. External transport becomes a candidate only when a machine must cross the Habitat-0 boundary. Attention becomes a candidate only when explicit activation is insufficient in real use.

## Related records

- [`provisional-architecture-v0.md`](provisional-architecture-v0.md)
- [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](../missions/m01-habitat-0-first-runnable-internal-ecology.md)
