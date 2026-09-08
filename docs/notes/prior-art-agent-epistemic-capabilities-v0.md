# Prior Art: Agent, Epistemic, and Reflection Capabilities v0

**Status:** curated external specimens — not EM architecture, evidence of EM claims, implementation authorization, or a Continuity Lab conclusion
**Retrieved:** 2026-09-08

## Purpose

This note records external, coding-focused projects as **separate implementation specimens**. They are useful because they expose operational sessions, observation/judgment separation, reflective persistence, and multi-agent coordination without requiring EM to copy their substrate, data model, or privileged agent center.

| Specimen | Direct concern | EM-useful pressure |
|---|---|---|
| [Hindsight](https://github.com/EfficientStreet/hindsight) | End-of-session process reflection | Experience should be filtered into revisable, durable behavioral change rather than journaled wholesale. |
| [Cortex Suite](https://github.com/Artistsyn/cortex_suite) | Codebase structure and learned judgment | Observation, provenance/confidence, learned interpretation, retrieval, and reviewable consolidation can remain distinct. |
| [Radiant](https://github.com/templetongroup/radiant) | Local coding-agent harness | A session can be an operational boundary containing workspace, tools, activity, and human intervention rather than merely a transcript. |
| [jcode](https://github.com/1jehuang/jcode) | Persistent multi-agent coding harness | Server-managed collaboration makes coordination, memory, sessions, clients, and shared-resource invalidation concrete boundaries to compare rather than abstract labels. |
| [S³Gym](https://huggingface.co/papers/2608.31100) | Benchmark for agent self-improvement | Raw episodic history, extracted summary, and cognitive-substrate training are empirically distinct experience representations with task-dependent trade-offs. |
| [Open Knowledge Format v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) | Portable knowledge interchange | A deliberately minimal Markdown/YAML bundle can carry portable concepts and optional provenance/trust signals without imposing runtime, retrieval, or epistemology. |

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

### jcode — agent-harness coordination

jcode is a large, active coding harness whose README documents agent memory (semantic retrieval, extraction, consolidation, and explicit memory tools), server-managed multi-agent swarms in one repository, direct/broadcast messaging, autonomous child-agent spawning, and notifications when another agent changes a file an agent has read. It also presents sessions, clients, SDK access, remote execution, browser tooling, and provider integrations as explicit harness concerns.

**Useful pressure:** it makes several prospective EM distinctions inspectable in one implementation: server/runtime versus session versus client; repository as a shared resource; a tool as an agent capability; and coordination as a server policy. Its swarm behavior is especially useful negative evidence against casually calling any multi-agent harness an ecology: its server is deliberately privileged and manages membership, messaging, completion, and shared-repository change notification. That is a valid implementation choice, not yet EM's generic delegation or resource model.

**Not imported:** jcode as a foundation, its agent-centric center, vector/graph memory, server-managed swarm policy, autonomous spawning, MCP/SSH/browser mechanics, repository-specific invalidation, or its event/identity model. M01 does not require any of them.

### S³Gym — representations of experience

S³Gym evaluates self-testing, self-judging, and self-improvement across seven text-based games, comparing direct interaction history, score-conditioned summary memory, and parameter training. Its reported result is task-dependent: summaries help when strategic lessons compress cleanly, raw history can win when success depends on exact state-contingent detail, and training can improve or negatively transfer.

**Useful pressure:** retained experience is not one thing. An ecology may need to distinguish an episode, an interpretation of it, a proposed reusable strategy, and a changed cognitive substrate; no canonical summary should silently replace the others. The benchmark also supplies a future measurement question: did retained experience make a held-out action better, rather than merely produce a plausible retrospective?

**Not imported:** S³Gym's benchmark, games, scoring, summary format, parameter training, a `Store`/`Index`/`Oracle`/`Attention` ontology, or a self-improvement mechanism for M01.

### Open Knowledge Format — portable knowledge artifacts

[Open Knowledge Format (OKF) v0.2](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) defines an intentionally minimal knowledge bundle: a directory of Markdown concepts with YAML frontmatter, ordinary links, and only `type` required. Its optional fields carry sources/provenance, generation and independent verification records, lifecycle/freshness, and an `Attested Computation` contract. OKF explicitly does not prescribe a runtime, retrieval system, fixed taxonomy, or execution packaging; its attestation checks a particular receipt at runtime rather than making a bundle fact eternally true.

**Useful pressure:** portable text artifacts can communicate a knowledge claim together with inspectable signals about origin, review, status, and sanctioned computation. This is a candidate interchange/materialization boundary—potentially a published knowledge membrane—not EM's knowledge model. In particular, OKF's advisory verification tiers should not be mistaken for EM belief, authority, access control, or a complete relation among observations and interpretations.

**Not imported:** OKF as EM's native format, an `okf/` or `knowledge/` directory, its frontmatter vocabulary, its concept taxonomy, a verification policy, an attestation executor, or an M01 export/import feature. Current workshop Markdown records are not declared to be an OKF bundle.

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
- Compare M01 against jcode's server-managed coordination only if real use needs concurrent residents, child work, shared-resource invalidation, or a non-local client; preserve the distinction between an implementation's coordinator and an earned EM boundary.
- Consider experience representation only when a later authorized use actually retains knowledge for future action; compare episodic detail and proposed generalization against a defined held-out task instead of assuming a summary is progress.
- Consider an OKF export/import control only when a later authorized cross-machine workflow needs portable stabilized knowledge; require a receiving machine to consume the exported artifact without an EM-specific SDK and keep its resulting disposition separate from the artifact's advisory signals.
- Any future work must state whether it is observing substrate facts, retaining interpretations, proposing stabilization, or accepting a durable change.
