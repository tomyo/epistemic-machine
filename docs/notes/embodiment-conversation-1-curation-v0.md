# Embodiment Conversation 1 — Curation v0

**Status:** curated design lineage — neither adoption, architecture revision, implementation authorization, nor a Continuity Lab conclusion

## Source and purpose

This record curates a human-provided conversation about leaving exploration-first work for embodiment. It is not a transcript. Its proposals are classified against the current architecture surface, candidate roadmap, and proposed M01 so that earlier framing does not silently override later workshop decisions.

## Already captured

The following ideas are already represented by current workshop records:

| Conversation insight | Current disposition / record |
|---|---|
| Documentation is ordinary workshop work; authorization belongs to implementation. | Captured in [`AGENTS.md`](../../AGENTS.md) under Embodiment Preparation. |
| M01 is a bounded embodiment, not S06, a milestone, or a final-runtime commitment. | Captured in [M01](../missions/m01-habitat-0-first-runnable-internal-ecology.md). |
| M01 must exercise retained state/resources, communication, explicit execution, and a retained consequence, rather than reproduce S03 request/reply. | Captured in M01's proposed workflow. |
| No daemon is required; activation is explicit. | Captured in [embodiment status](../architecture/embodiment-status-v0.md) and M01. |
| A habitat provides local mechanisms while residents retain policy; retained resources stay distinct from communication. | Captured in [provisional architecture](../architecture/provisional-architecture-v0.md). |
| The architecture is a provisional implementation guide revised by implementation or real-workflow pressure. | Captured in provisional architecture and [Embodiment Roadmap v1](../roadmaps/embodiment-roadmap-v1.md). |

## Refinement retained

The conversation usefully sharpens the current distinction:

- A habitat can locally create and refer to resident machines without implying a global registry or machine-creation command.
- A resident should use a habitat-provided interaction mechanism without depending on the habitat's private transport or storage topology.
- “Containment” is a realization fact, not automatically a permanent ownership, identity, or authority relationship.

The first two are reflected in the proposed M01 wording. The third is a useful caution for later work; it does not select migration, authority, or an interface.

## Superseded or out of scope

| Conversation proposal | Disposition and rationale |
|---|---|
| Put the first machine at `~/.em/`. | Superseded by the later human decision that Habitat-0 lives inside this repository. |
| Use existing EM↔CL transport as M01's internal connection. | Superseded by the later human decision to leave that workshop-peer bus unchanged; M01 uses a private local delivery realization. |
| Start M01 with a root/outer machine that itself hosts a nested ecology. | Deferred. Proposed M01 is one Habitat-0 ecology with two non-recursive residents; it does not claim Habitat-0 is itself a machine. |
| Define a toy ecology API now and later swap in a real/distributed implementation. | Deferred. It risks choosing a generic interface before M01 produces a concrete need. |

## New deferred threads

### Habitat provision versus machine hosting

The conversation proposes that a machine may itself provide an ecology for other genuine machines. This is not rejected, but current evidence does not establish that a habitat must be a machine or that every machine hosts an ecology.

**Revisit when:** M01 use reveals that a resident must provide independent local mechanisms for other residents, or a concrete relocation/cross-ecology need cannot be expressed with the present habitat boundary.

### Same machine boundary across habitats

The conversation proposes moving a resident from a local habitat to an independent ecology while holding its machine-facing boundary intelligible. This could become a strong later discriminator for independent ecologies and external transport.

**Revisit when:** M01 has exposed a concrete resident-facing interaction that must survive a change in habitat realization. It does not currently authorize transport adapters, discovery, global identity, or a migration model.

### Genuine residents, not implementation stand-ins

The conversation insists that inner machines not be reduced to child-process stand-ins. Proposed M01 already states that M1 and M2 are resident machines, but this remains a scope discipline rather than proof of recursive machine architecture.

**Revisit when:** implementation makes an actual allocation decision that would otherwise collapse resident state, identity, execution, or communication into Habitat-0.

## Lesson

The useful methodological contribution is not a prescribed recursive hierarchy. It is the pressure test: distinguish **machine responsibility**, **habitat mechanism**, and **host realization**, then revise that map only when a real embodiment needs the distinction.

## Related records

- [`docs/architecture/provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md)
- [`docs/architecture/embodiment-status-v0.md`](../architecture/embodiment-status-v0.md)
- [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](../missions/m01-habitat-0-first-runnable-internal-ecology.md)
- [`docs/roadmaps/embodiment-roadmap-v1.md`](../roadmaps/embodiment-roadmap-v1.md)
- [`docs/notes/em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md)
