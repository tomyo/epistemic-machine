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
| Candidate invariant | Two machines may exchange a declared request or material without sharing private internal architecture. |
| Boundary | One machine's internal realization and another's structured interaction with it. |
| Candidate contract | Addressable counterpart, declared interaction/material, and an interpretable result or retained record; authority and delivery semantics remain open. |
| Open implementation | Filesystem transport, pipes, HTTP, browser messaging, a remote service, discovery mechanism, serialization, correlation, trust, and delivery semantics. |
| Evidence gap | S03 and S04 gave bounded fixture-local request/projection interactions across two labeled realizations, while the root bus transports workshop-peer packets and S02 proves one local semantic projection. None establishes EM machine identity, authority, reachability, or a general interaction model. |

### Communication ↔ durable state

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | The system distinguishes transient interaction from whatever state must survive it; neither communication nor execution is intrinsically ephemeral or durable. |
| Boundary | Structured interaction and its optional retained representation. |
| Candidate contract | An occurrence can be correlated with a retained record when reconstruction, deferred handling, or another discontinuity requires it. |
| Open implementation | Files, queues, append-only logs, databases, replicated records, expiry rules, and retention criteria. |
| Evidence gap | Root bus packets are durable transport records, and M00 retained a consequence; no specimen has shown when machine-to-machine communication must be retained or when it should disappear. |

### Communication ↔ execution

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | A machine can have the capacity to observe, decide, and/or act without every received interaction automatically initiating that capacity. |
| Boundary | Structured interaction and machine execution. |
| Candidate contract | A receiving realization can explicitly accept an input for execution and expose any result separately from delivery and from private execution details. |
| Open implementation | Deterministic function, human action, LLM, schedule, resource observation, internal state change, browser worker, process, or another machine. |
| Evidence gap | The exchange extension triggers a host LLM turn without interpreting packets; M00 tested operator replacement; S03/S04 separately required explicit deterministic B-side execution/projection after delivery. None establishes a general machine execution boundary. |

### Semantic surface ↔ private realization

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | A useful semantic surface need not reveal its transport or storage topology. |
| Boundary | Local semantic meaning and private realization. |
| Candidate contract | A named material, operation, or place with behavior comprehensible without private-path knowledge. |
| Open implementation | Filesystem paths, commands, capability objects, API endpoints, browser elements, and backing transport or storage. |
| Evidence gap | S02 gives bounded evidence for literal `advisory/in` and `advisory/out`; S03/S04 give fixed operation/result contracts. None establishes a universal vocabulary or capability model. |

### Identity ↔ authority ↔ reachability

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | Identity, authority, and reachability answer different questions and need not share a representation. |
| Boundary | Who/what a participant is; what it may do; and where/how it is currently reachable. |
| Candidate contract | An interaction may refer to an identity, present authority evidence or local policy context, and use a route or endpoint without treating any one as the other. |
| Open implementation | Static local aliases, public keys, DIDs, local policy, capability grants, directories, relays, discovery records, and routing mechanisms. |
| Evidence gap | Existing packets provide only source-local provenance. No machine identity, authority, discovery, or reachability behavior has been established. |

### Boundary ↔ allocation

| Aspect | Current hypothesis |
|---|---|
| Candidate invariant | A useful distinction can remain testable while a specimen varies which component or substrate realizes each responsibility. |
| Boundary | Stable responsibility distinction and a particular implementation allocation. |
| Candidate contract | The specimen states which responsibility crosses the boundary and what observable result would count as preserving it. |
| Open implementation | Process, directory, component, service, local or remote execution, persistence mechanism, and operator substrate. |
| Evidence gap | S03 and S04 each varied a receiver-private realization while holding one narrow public contract fixed. No pair of authorized specimens has yet tested a shared candidate boundary across independently chosen allocations. |

## Explicit deferrals

This note does not select a global/public ecology, registry, package model, browser custom-element model, machine identifier or key scheme, universal capability API, generic event taxonomy, trust model, discovery mechanism, automatic harness interpretation of free text, VFS, content-addressed storage, CRDT, Git, libp2p, or UCAN. Those are possible implementation spaces or later questions, not consequences of these hypotheses.

The existing cautions remain: a transport occurrence is not automatically structured communication; communication delivery or acceptance is not automatically execution; and neither communication nor execution is automatically attention, interpretation, adoption, or durable consequence.

## Use in a later authorized brief

A later authorized brief may choose one hypothesis and state:

1. the bounded mechanism being changed or exercised;
2. the candidate contract it is testing;
3. the implementation allocation it intentionally varies or holds fixed; and
4. whether the relevant interaction or outcome is transient or requires retained representation; and
5. the observation that would retain, revise, or reject the hypothesis.

This is a review aid, not a mission template or authorization path. The [embodiment map](em-embodiment-map-v0.md) remains the record of current pressures; mission evidence and authorization remain governed by [`AGENTS.md`](../../AGENTS.md).

## Provenance

This note is a curated synthesis of human-provided architecture conversations about blueprints, local instances, multiple operator substrates, durable and transient interaction, execution, and ecological communication, interpreted against current source-local evidence. Its hypotheses remain subject to use, evidence, and later review.
