# Provisional Architecture v0

**Status:** provisional implementation guide — not final EM ontology, a runtime specification, or implementation authorization

## Purpose

The workshop has moved from exploration-first work to its **first embodiment**. M00 and S03–S05 remain bounded evidence; they constrain the authorized M01 embodiment without requiring every distinction to be settled first.

This map is sufficient to guide M01. It is revised when implementation or **real workflow pressure** exposes a boundary that the current map cannot explain. It does not pre-select a substrate, global identity, transport, daemon, event system, or reusable foundation.

## Current responsibility map

```text
HOST / SUBSTRATE
  filesystem · processes · CLI · local operating environment
                         │ realizes
                         ▼
HABITAT / ECOLOGY
  local resident references · delivery mechanisms · explicit activation
  resource mediation · host-provided capability mechanisms
                         │ makes possible
                         ▼
MACHINE
  local identity · retained state/resources · communication
  explicit execution · local relationships
```

A **machine** decides what it retains, communicates, or executes. A **habitat/ecology** provides local mechanisms through which resident machines can refer, deliver, activate, and mediate bounded resource access. The **host/substrate** realizes those mechanisms. These are responsibility distinctions, not mandated modules or final primitives.

For M01, Habitat-0 is the first concrete, local, and replaceable ecology realization inside this repository. It hosts two simpler resident machines. Resident machines do not know one another's private paths; they use the habitat's local mechanisms. The existing EM↔CL bus remains outside this realization as unchanged workshop-peer transport.

## Boundaries held explicit

- **Retained state/resources ↔ communication:** a B-owned resource may be represented in a bounded interaction without making its private layout shared.
- **Communication ↔ execution:** delivery does not itself execute work; M01 activation is explicit.
- **Machine ↔ habitat:** a resident carries its own local identity and state; Habitat-0 supplies conditions of interaction rather than its policy.
- **Habitat ↔ host/substrate:** local filesystem and CLI choices realize Habitat-0; neither becomes EM ontology.
- **Availability ↔ attention:** M01 does not require a watcher or subscription mechanism. A later observed relevance problem may revise this boundary.

## Revision rule

```text
implementation / real workflow
        │
        ├── ordinary deficiency → fix locally
        ├── boundary pressure   → revise this architecture surface
        └── isolated uncertainty → separately authorize a bounded experiment
```

A revision records the observed pressure, affected responsibility boundary, provisional disposition, and what remains unclaimed. It must not silently turn a local implementation into a universal machine law.

## Explicit deferrals

M01 does not establish recursive hosting, independent ecologies, external transport, global discovery, global identity, authority, a reusable seed, generic capabilities, a daemon, session/subscription machinery, an event model, a resource graph, Git/CAS, or a shared foundation.

## Related records

- [`embodiment-status-v0.md`](embodiment-status-v0.md) — current embodiment and deferral status.
- [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](../missions/m01-habitat-0-first-runnable-internal-ecology.md) — authorized bounded embodiment.
- [`docs/roadmaps/embodiment-roadmap-v1.md`](../roadmaps/embodiment-roadmap-v1.md) — adopted embodiment coordination surface.
- [`docs/notes/post-s05-specimen-synthesis-v0.md`](../notes/post-s05-specimen-synthesis-v0.md) — completed exploration-branch disposition.
