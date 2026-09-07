# EM Boundary Hypotheses v0

**Status:** developmental architectural hypotheses — not ontology, normative architecture, roadmap, build authorization, or a Continuity Lab conclusion

## Purpose and boundary

This note preserves a boundary-first way to reason about future EM embodiments. It complements the [EM embodiment map](em-embodiment-map-v0.md): the map records current mechanisms and pressures, while this note names candidate distinctions that later authorized work could test across different realizations.

A candidate invariant is not a claim that EM has already earned a universal runtime property. A boundary is not an adopted layer. A contract names only what would need to remain intelligible across that boundary; it does not choose a data model, protocol, or implementation.

## Reading a boundary hypothesis

Each hypothesis separates:

- **Candidate invariant** — the useful property an authorized specimen might test.
- **Boundary** — responsibilities that should not silently become one another.
- **Candidate contract** — the minimum relationship that would cross the boundary.
- **Open implementation** — deliberately unselected ways a specimen might realize it.
- **Evidence gap** — why the hypothesis remains developmental.

## Candidate boundary hypotheses

### Machine ↔ operator

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | An external actor may operate a machine without its transient cognition automatically becoming the machine's retained continuity. |
| Boundary | Operator interface and machine continuity. |
| Candidate contract | A meaningful operation or capability is exposed; its invocation and any durable consequence remain distinguishable from the operator episode. |
| Open implementation | Pi extension, CLI, browser, another machine, invocation syntax, synchronous or asynchronous interaction, and capability representation. |
| Evidence gap | M00 distinguishes one fresh operator from retained consequence, and S02 exposes one workload-local surface. Neither establishes a generic capability interface or machine boundary. |

### Blueprint ↔ instance

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | A transferable description may seed a local instance whose subsequent continuity is independently accumulated. |
| Boundary | Shared description and local accumulated continuity. |
| Candidate contract | Initialization from a description, with an explicit statement of what—if any—prior continuity is carried forward. |
| Open implementation | Hand-authored manifest, repository, package, registry, document, versioning scheme, optional inherited records, and dependency expression. |
| Evidence gap | No blueprint or instance model has been implemented. The resource/session lineage only defers a reusable blueprint until multiple authorized specimens reveal recurring declarations. |

### Machine ↔ machine

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | Two machines may exchange a meaningful request or material without sharing private internal architecture. |
| Boundary | One machine's internal realization and another's semantic interaction with it. |
| Candidate contract | Addressable counterpart, declared interaction/material, and an interpretable result or retained record; authority and delivery semantics remain open. |
| Open implementation | Filesystem transport, pipes, HTTP, browser messaging, a remote service, discovery mechanism, serialization, correlation, trust, and delivery semantics. |
| Evidence gap | The root bus transports packets between workshop peers, and S02 proves one local semantic projection. Neither side is an established EM machine instance. |

### Semantic surface ↔ private realization

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | A useful semantic surface need not reveal its transport or storage topology. |
| Boundary | Local semantic meaning and private realization. |
| Candidate contract | A named material, operation, or place with behavior comprehensible without private-path knowledge. |
| Open implementation | Filesystem paths, commands, capability objects, API endpoints, browser elements, and backing transport or storage. |
| Evidence gap | S02 gives bounded evidence for literal `advisory/in` and `advisory/out` only; it does not establish a universal vocabulary or capability model. |

### Boundary ↔ allocation

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | A useful distinction can remain testable while a specimen varies which component or substrate realizes each responsibility. |
| Boundary | Stable responsibility distinction and a particular implementation allocation. |
| Candidate contract | The specimen states which responsibility crosses the boundary and what observable result would count as preserving it. |
| Open implementation | Process, directory, component, service, local or remote execution, persistence mechanism, and operator substrate. |
| Evidence gap | This is a methodological hypothesis. No pair of authorized specimens has yet varied one implementation while holding a boundary contract intelligible. |

## Explicit deferrals

This note does not select a global/public ecology, registry, package model, browser custom-element model, machine identifier or key scheme, universal capability API, event lifecycle, trust model, discovery mechanism, or automatic harness interpretation of free text. Those are possible implementation spaces or later questions, not consequences of these hypotheses.

The existing caution remains: a transport occurrence is not automatically a semantic EM event, attention, interpretation, adoption, or durable consequence.

## Use in a later authorized brief

A later authorized brief may choose one hypothesis and state:

1. the bounded mechanism being changed or exercised;
2. the candidate contract it is testing;
3. the implementation allocation it intentionally varies or holds fixed; and
4. the observation that would retain, revise, or reject the hypothesis.

This is a review aid, not a mission template or authorization path. The [embodiment map](em-embodiment-map-v0.md) remains the record of current pressures; mission evidence and authorization remain governed by [`AGENTS.md`](../../AGENTS.md).

## Provenance

This note is a curated synthesis of a human-provided architecture conversation about blueprints, local instances, multiple operator substrates, and ecological communication, interpreted against current source-local evidence. Its hypotheses remain subject to use, evidence, and later review.
