# Situated Activation and Relational Memory — Architectural Lineage v0

**Status:** architectural lineage / developmental hypotheses — not validated architecture, ontology, roadmap revision, mission brief, build authorization, or a Continuity Lab conclusion

## Purpose and boundary

This note preserves a design thread about responsibility-first machine creation, activation into a situated ecology, and retained context organized around relationships. It records questions that a future real-work embodiment may test without selecting a runtime, daemon, discovery service, memory subsystem, directory layout, or Server Fleet topology.

The source conversation is conceptual evidence. Habitat-0 demonstrates generated local identities, isolated retained state, explicit activation, and fresh-process reconstruction for one bounded workflow. It does not establish the hypotheses in this note.

## Grounded starting points

Existing workshop records already require several separations:

- A machine carries local identity, retained state/resources, communication, explicit execution, and local relationships; an ecology supplies local interaction and mediation mechanisms; a host realizes them: [`docs/architecture/provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md).
- Identity, authority, and reachability answer different questions, while a semantic surface need not expose its private realization: [`em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md).
- Resource, revision, working view, session, operator, mediator, and machine are not interchangeable merely because plain files can represent each locally: [`resource-session-working-views-lineage-v0.md`](resource-session-working-views-lineage-v0.md).
- Availability, attention, execution, continuation, attributed cognition, receiving disposition, and durable consequence remain distinct: [`roles-cognition-and-responsibility-lineage-v0.md`](roles-cognition-and-responsibility-lineage-v0.md).
- Dynamic reachability is provisional and staleable; it does not establish trust, permission, attention, delivery, or successful execution: [`distributed-revisions-and-reachability-curation-v0.md`](distributed-revisions-and-reachability-curation-v0.md).

## Responsibility-first creation hypothesis

The conversation proposes that machine creation may be understood first as establishing a **persistent locus of responsibility**, rather than starting a process or assigning an LLM. In its strongest useful form, the hypothesis is:

> A candidate machine boundary becomes meaningful when an ongoing responsibility and the state necessary to reconstruct its history and condition persist beyond a particular operator or execution episode.

Responsibility provides a reason for continuity, but is not by itself proof that a machine exists. A generated identifier, directory, declaration, or persistent substrate is likewise insufficient on its own. A future embodiment must show what responsibility is carried, what discontinuity it survives, what task a later operator can perform, and what evidence makes that reconstruction possible.

The conversation tentatively separates:

```text
possibly intrinsic to a candidate machine
  local identity
  ongoing responsibility
  retained state/resources needed for continuity

relational or situational
  operators and counterparties
  delegated work
  externally available resources and capabilities
  routes and communication channels
  granted authority
  cognition contributors
  activation conditions
```

This is a candidate boundary, not a creation schema. Current architecture already assigns a machine responsibility for its own retained state/resources; the relational category does not imply that every resource is external or that an ecology owns machine-private state. A machine may carry responsibility without corresponding authority. Capability, availability, and operator control do not become identity merely because they are presented at activation.

A machine establishing another persistent responsibility is a deferred recursion hypothesis. It does not establish parenthood, ownership, authority transfer, tree topology, recursive hosting, or a right to create another machine.

## Situated activation

The conversation distinguishes two contributions to an active working context:

```text
ambient situation                    retained state
what appears to be here now          what has survived from before
           \                         /
            \                       /
             candidate working context
                       |
                    attention
                       |
             explicit action or request
```

An **ambient situation** is a prospective ecology-provided observation surface through which a machine might encounter present participants, reachable routes, available capabilities, current authority, pending communication, or resource conditions without first reconstructing the entire ecology from notes. This refines the existing availability and reachability questions; it does not replace explicit activation or establish global discovery.

Any such surface is fallible and staleable. It must keep at least these distinctions available when consequential:

```text
registered != present
present != reachable
reachable != available
available != authorized
received != relevant
relevant != attended
perceived != healthy or true
```

Ambient discovery and active discovery are therefore useful candidate interaction modes, not selected mechanisms. Ambient presentation may expose a bounded local situation; active discovery may seek a counterpart or capability not already presented. Neither form implies trust, permission, delivery, execution, interpretation, or durable retention.

The phrase “self-evident ecology” is retained only as an intuition about situatedness. An ecology still has to produce an attributable observation or projection. Organism phenomenology is not evidence for machine semantics.

## Relationship-scoped contextual memory

Here, **relationship-scoped** means bounded by the active machine's responsibility and relationship, not shared or controlled by the counterpart.

The strongest new hypothesis is that retained material may become relevant through the relationship, resource, capability, or responsibility currently in view rather than through an undifferentiated global memory search:

```text
present relationship or task
            +
responsibility-relative retained material
            |
            v
bounded working context
            |
        interaction
            |
            v
candidate updates to retained knowledge
```

This gives retained state a possible **relational topology**. For example, one machine's operational relationship with a service may make prior observations, unresolved discrepancies, applicable procedures, and earlier dispositions candidates for its working context. Another machine may retain different material about the same service because it carries a different responsibility. These remain separate, attributed accounts; neither is automatically canonical shared truth.

Structural relevance could reduce reasoning scope without requiring a universal semantic-memory or retrieval layer. It does not eliminate retrieval: context still has to be selected, bounded, and made available. Filesystem placement may realize this locally, but adjacency and path names do not establish semantic relationship, identity, authority, confidentiality, or relevance.

A contextual projection should preserve enough information to reconstruct, when required:

- why each retained item was selected for this interaction;
- its source, scope, age or freshness, and epistemic status;
- whether it is an observation, derived claim, procedure, unresolved question, cognitive contribution, operator disposition, or later consolidation;
- which private material was withheld and under whose authority;
- whether the active operator accepted, rejected, revised, or ignored it; and
- what, if anything, was retained afterward.

Automatic injection is not automatic belief, attention, or permission. A relationship-associated note may be stale, mistaken, malicious, private, or irrelevant to the present task. Context selection can itself leak the existence of a resource, relationship, capability, or private path. A future embodiment must therefore test privacy and authority at the projection boundary rather than treating relevance as sufficient access.

## Post-interaction consolidation

The conversation proposes an opportunity after interaction to revise responsibility-relative retained material:

```text
retained working knowledge
        -> situated use
        -> observations and outcomes
        -> candidate consolidation
        -> explicit retained revision
```

This may preserve useful procedures, invalidate assumptions, retain unresolved questions, or discard incidental episode detail. It is not yet “learning,” autonomous reflection, or self-modification. Consolidation must not silently overwrite source evidence, erase uncertainty, or turn a repeated interpretation into fact. Supersession, provenance, receiving disposition, and the reason for retention remain reconstructible where the responsibility depends on them.

A transcript archive is not required merely because interaction occurred. The retention question is what must bridge the next relevant discontinuity.

## Candidate real-work discriminator

A future separately approved responsibility/evidence brief concerning a real service such as LightLLM could test these hypotheses without granting write authority. A candidate responsibility is to maintain an inspectable, current-enough account of operational state and support diagnosis without changing infrastructure.

A useful answer to a status question would distinguish:

```text
retained claims
fresh observations
explicit freshness or age
 derived conclusions
unresolved unknowns
attributed cognitive advice, if any
operator disposition
```

A second invocation after every participating process exits could ask a related question. The later operator should reconstruct what the service is, what was expected, what was last observed and when, what remained unresolved, and what the previous operator concluded—while recognizing that retained observations may no longer be current and selectively refreshing them.

This is a proposed discriminator, not a LightLLM machine, mission, runtime, or responsibility brief. Read-only authority would prohibit restart, deployment, configuration change, or remediation, while still requiring explicit authorization for each observation capability and protection of private material.

## Disposition ledger

| Idea / distinction | Epistemic support | Project disposition | Revisit when |
|---|---|---|---|
| Persistent responsibility may be the semantic center of candidate machine creation. | Developmental hypothesis | Retained with qualification; not a machine definition | A real responsibility survives operator/process discontinuity and identity plus retained records prove either sufficient or insufficient for reconstruction. |
| Responsibility may persist without matching authority. | Existing distinction refined by conversation | Retained | A machine must report or diagnose a condition it is not permitted to change. |
| Relationships, routes, external capabilities, operators, and grants are situational rather than identity. | Existing boundary refinement | Retained | One machine retains continuity while these relationships materially change. |
| Activation may receive a bounded ambient situation. | Developmental hypothesis | Retained | Explicit activation requires current local facts that cannot be reconstructed safely from retained state alone. |
| Ambient and active discovery are distinct interaction modes. | Developmental hypothesis | Deferred | A real workflow needs both presented local affordances and a bounded search for an absent counterpart or capability. |
| Ambient perception is staleable observation, not truth or authority. | Candidate invariant consistent with existing lineage | Retained prominently | A stale, unauthorized, or misleading presence claim must be rejected without action or private disclosure. |
| Relationship-scoped retained material can form contextual memory. | Developmental hypothesis | Retained | A real interaction can act with bounded relevant history without an explicit global search and can reconstruct why each item was present. |
| Different machines may retain different responsibility-relative accounts of one counterpart. | Developmental hypothesis | Retained | Two responsibility boundaries need to compare, disagree about, or reconcile claims concerning the same external thing. |
| Filesystem topology is a relevance mechanism. | Realization idea | Deferred as a local heuristic | A bounded implementation uses structural locality successfully without making paths semantic authority. |
| Post-interaction consolidation can revise retained working knowledge. | Developmental hypothesis | Retained with safeguards | Repeated use shows which material must survive and tests correction, supersession, provenance, and uncertainty retention. |
| Context injection replaces retrieval or search. | Conversation intuition | Not retained as a general claim | A real workflow compares bounded structural projection with active retrieval and shows one unnecessary. |
| A machine may establish another responsibility-bearing machine. | Developmental recursion hypothesis | Deferred | A responsibility cannot be carried intelligibly through bounded delegation or an existing machine boundary. |
| A read-only LightLLM account is the next mission. | Candidate real-work direction | Deferred pending a separate human decision and responsibility/evidence brief | The actual Server Fleet responsibility, operator, evidence, freshness, privacy, and authority boundaries are confirmed. |

## Explicit non-decisions

This lineage does not select or authorize a universal machine-creation command or schema, daemon, scheduler, watcher, wake policy, global presence/discovery service, environment manifest, provider or capability registry, authority framework, ambient-perception API, context-injection protocol, memory/RAG system, vector store, canonical relationship directory, filesystem layout, graph substrate, autonomous consolidation, recursive machine creation, Server Fleet topology, LightLLM machine, mission brief, experiment, or implementation.

It does not revise Habitat-0, M01, the provisional architecture, or Embodiment Roadmap v1. The words *perception*, *situated*, *memory*, *organism*, and *ecology* remain explanatory where used; they do not assign human phenomenology or biological mechanisms to software.

## Revisit conditions

Evaluate the smallest subset of these hypotheses when a separately authorized real-work embodiment must do one or more of the following:

1. reconstruct an ongoing responsibility after every operator and execution process has ended;
2. distinguish retained claims from selectively refreshed observations and derived conclusions;
3. receive current ecological context while rejecting stale, unauthorized, misleading, or privacy-leaking presentation;
4. explain why a relationship-specific retained item appeared in working context and how it was used;
5. revise working knowledge without erasing source evidence, uncertainty, attribution, or prior disposition; or
6. compare responsibility-relative accounts held by two boundaries without silently creating canonical shared memory.

Only repeated pressure should earn a reusable mechanism. A single successful filesystem realization would remain a local implementation until another independently chosen realization or workflow requires the same responsibility boundary.

## Provenance

This note is a curated representation of a human-provided design conversation after M01's bounded implementation and acceptance work, during discussion of a possible Server Fleet/LightLLM real-work direction. The conversation developed three linked intuitions: persistent responsibility as the reason a machine boundary may exist, activation into an ambient ecological situation, and contextually activated relationship memory followed by bounded consolidation. Repository review classified these as a mixture of existing distinctions, refinements, and developmental hypotheses. No runtime observation, Continuity Lab conclusion, roadmap adoption, mission authorization, or implementation evidence is claimed.
