# Embodiment Roadmap v1

**Status: adopted coordination head**
**Owner:** Epistemic Machine workshop

## Purpose and authority boundary

This roadmap coordinates the **first embodiment of the current provisional architecture and its revision through real use**. It is not a final ontology, a runtime specification, or a delivery queue. Authorization of a bounded embodiment remains separate and explicit.

Human adoption has made this the workshop's coordination head. M01 has separate explicit authorization; that authorization still does not extend to changes to the EM↔CL bus or a general runtime instance.

## Operating loop

```text
current provisional architecture
             ↓
authorized bounded embodiment
             ↓
real local workflow use
       ┌─────┴─────┐
ordinary defect   architectural pressure
       ↓                 ↓
   fix locally    revise architecture / authorize focused experiment
```

Experiments remain available for an isolated uncertainty. They are no longer the default unit of progress. M00 and S03–S05 remain evidence boundaries, not implementation templates or required stages.

## Current coordination focus

The current authorized bounded embodiment is [M01 — Habitat-0](../missions/m01-habitat-0-first-runnable-internal-ecology.md): one habitat-local ecology with two simpler resident machines and one state/communication/execution workflow.

The architecture surface guiding implementation is:

- [`docs/architecture/provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md) states the current machine/ecology/host map and revision rule.
- [`docs/architecture/embodiment-status-v0.md`](../architecture/embodiment-status-v0.md) records current scope and deferrals.
- M01 supplies the bounded implementation and acceptance contract once a human authorizes it.

## Revision discipline

Real use produces one of four dispositions:

1. **Ordinary deficiency** — fix the local implementation without promoting an architecture claim.
2. **Architecture pressure** — update the architecture surface with the observed pressure and provisional response.
3. **Isolated uncertainty** — separately authorize a bounded experiment only if implementation/use cannot decide it safely.
4. **No actionable pressure** — record nothing beyond ordinary operational notes.

A revision must preserve separation between machine responsibility, habitat mechanism, and host realization. It must not introduce global identity/discovery, authority, reusable seed, generic capabilities, daemon scheduling, external transport, or a shared foundation without a real requirement and separate decision.

## Immediate deferrals

Habitat-0 is not a seed and is not a proof of recursive hosting. The existing EM↔CL bus remains unchanged workshop transport. Independent ecologies, external transport adapters, attention/subscription, and resident-hosted ecologies await actual pressure after M01 use.

## Related records

- [`AGENTS.md`](../../AGENTS.md) — workshop phase and authorization rules.
- [`docs/architecture/README.md`](../architecture/README.md) — current architecture surface.
- [`docs/notes/post-s05-specimen-synthesis-v0.md`](../notes/post-s05-specimen-synthesis-v0.md) — exploration-branch pause and evidence discipline.
- [`docs/roadmaps/incremental-embodiment-roadmap-v0.md`](incremental-embodiment-roadmap-v0.md) — superseded exploration-first candidate retained as history.
