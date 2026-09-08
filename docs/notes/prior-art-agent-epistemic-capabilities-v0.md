# Prior Art: Agent, Epistemic, and Reflection Capabilities v0

**Status:** curated external specimens — not EM architecture, evidence of EM claims, implementation authorization, or a Continuity Lab conclusion
**Retrieved:** 2026-09-08

## Purpose

This note records three external, coding-focused projects as **separate implementation specimens**. They are useful because they expose operational sessions, observation/judgment separation, and reflective persistence without requiring EM to copy their substrate, data model, or privileged agent center.

| Specimen | Direct concern | EM-useful pressure |
|---|---|---|
| [Hindsight](https://github.com/EfficientStreet/hindsight) | End-of-session process reflection | Experience should be filtered into revisable, durable behavioral change rather than journaled wholesale. |
| [Cortex Suite](https://github.com/Artistsyn/cortex_suite) | Codebase structure and learned judgment | Observation, provenance/confidence, learned interpretation, retrieval, and reviewable consolidation can remain distinct. |
| [Radiant](https://github.com/templetongroup/radiant) | Local coding-agent harness | A session can be an operational boundary containing workspace, tools, activity, and human intervention rather than merely a transcript. |

## Verified specimen observations

### Hindsight — reflective filtering

Hindsight is an on-demand assistant skill that reviews a session, seeks root causes, discards one-off details, distinguishes proved from merely suggested lessons, and updates an existing related memory rather than duplicating it. It is read-only against the completed work and writes only to memory; when no persistent-memory system exists it can produce a standalone report.

**Useful pressure:** a session is not automatically durable knowledge. A later embodiment may need a deliberate durability and corrigibility judgment: retrieve a related stabilization, compare new experience, then revise, reinforce, reject, or defer it.

**Not imported:** `MEMORY.md`, a universal reflection procedure, autonomous reflection scheduling, or a claim that persistence is only file memory.

### Cortex Suite — structure versus judgment

Cortex Suite separates `quartz-ctx` (source-derived structure such as types, signatures, and file:line) from `cortex` (session-grown patterns, decisions, corrections, and anti-patterns). Its README says the split is enforced: the structural server holds no handwritten knowledge while the judgment server ingests the structural output rather than parsing code itself. Structural items carry source/provenance and a confidence category; its hint-directed tools choose which knowledge to expand, and consolidation produces proposals awaiting review rather than automatically committing them.

**Useful pressure:** do not silently collapse observation of a resource into learned interpretation of that resource. Provenance and confidence can qualify a claim without becoming an EM-wide schema. Selective retrieval is a concrete pressure when retained knowledge exceeds active context. Candidate stabilizations need not become authoritative merely because a consolidation process generated them.

**Not imported:** source-code ontology, MCP servers, SQLite, the `quartz-ctx`/`cortex` names, Cortex's confidence labels, its token-reduction result, or a global attention service.

### Radiant — operational sessions and intervention

Radiant is a local macOS coding harness. Its README describes provider-neutral session histories, a per-session workspace, file/shell tools with configurable approval, a live tool-activity feed, and long-running tasks that can stop at a “Needs you” decision rather than guess. Its server, UI, and Electron shell are separate components.

**Useful pressure:** a session may bind a temporary operating context—resources, capabilities, actions, visible activity, and a human decision boundary—without thereby defining the machine's permanent ontology. A capability can reach a boundary and expose it for another actor instead of either guessing or requiring a privileged always-running controller.

**Not imported:** a coding agent as EM's central organism, macOS/Electron, provider abstraction, a UI, generic event storage, or a session runtime for M01.

## Candidate synthesis — deferred epistemic sequence

Taken together, the specimens motivate a candidate distinction:

```text
event → observation → interpretation → candidate stabilization → accepted/revisable stabilization
```

This is a **review lens**, not a declared EM pipeline. An event may produce no observation; an observation may merit no interpretation; an interpretation may remain transient; and a candidate stabilization may be rejected or revised. The distinctions are useful because they prevent `conversation → memory`, tool activity → fact, or generated proposal → authoritative continuity from becoming implicit shortcuts.

A later authorized embodiment could test a small part of this sequence only when its real workflow needs it. M01 currently exercises local state/resources, communication, explicit execution, and retained consequence; it does not select a session model, event model, reflection mechanism, knowledge store, provenance schema, or attention system.

## Relationship to current records

- The machine/operator, communication/durable-state, communication/execution, and semantic/private-realization distinctions remain developmental in [`em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md); these specimens provide examples, not proof.
- [`resource-session-working-views-lineage-v0.md`](resource-session-working-views-lineage-v0.md) remains the workshop's resource/session lineage; Radiant does not establish EM session semantics.
- [`provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md) remains the current embodiment guide; its explicit deferrals continue to apply.

## Revisit conditions

- Consider a reflection/stabilization boundary only when use produces a concrete retained lesson or correction that M01's ordinary records cannot represent without conflating event, interpretation, and consequence.
- Consider selective retrieval/attention only when retained local knowledge demonstrably exceeds the context needed for a current task.
- Consider an intervention/delegation boundary only when an explicit operation reaches a decision that belongs to a different actor or authority.
- Any future work must state whether it is observing substrate facts, retaining interpretations, proposing stabilization, or accepting a durable change.
