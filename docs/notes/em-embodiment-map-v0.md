# EM Embodiment Map v0

**Status:** architectural lineage / developmental working map — not ontology or normative architecture, not a Continuity Lab conclusion, **not a roadmap**, and **not a build authorization**

## Purpose and boundary

This map makes explicit the responsibilities, current realizations, and unanswered boundaries exposed while existing workshop mechanisms are considered as possible EM embodiment. It records the pressure that a later, separately authorized activity might investigate; it does not select that activity.

The workshop has working transport and bounded specimen evidence, but is **not yet an integrated EM specimen**. The entries below therefore record fragments and pressures; they do not name final layers, select a living specimen, or imply that every listed responsibility must become a subsystem.

A map revision, a human decision to adopt a direction, a bounded embodiment change, and a discriminator experiment are different acts. This map performs only the first act.

## Grounded starting points

- The root [`inbox/` / `outbox/`](../../AGENTS.md#exchange-bus-peers) filesystem bus is a shared, single-writer transport surface. It moves packets, not procedure.
- The exchange extension [`.pi/extensions/exchange/index.ts`](../../.pi/extensions/exchange/index.ts) watches each open Pi process's project inboxes, journals arrival, notifies the human, and triggers that process's LLM turn. It does not read, digest, or interpret a packet.
- [Mission M00](../missions/m00-first-continuity-loop.md) showed one accepted consequence in an experiment-local `.em/` surviving operator replacement. It did not establish a reusable machine substrate or root `.em/`.
- The [S01 provisional decision](ecological-crossing-first-specimen-decision-v0.md) specified fixed-destination, digest-verified local placement for a disposable specimen. It is not direct execution evidence.
- The [`advisory/in` contract](advisory-boundary-contract-v0.md) established one literal workload-local projection: semantic `advisory/in` / `advisory/out` names can hide file-bus topology while arrival remains availability only. It did not establish a generic capability interface.
- [Resource, session, and working-view lineage](resource-session-working-views-lineage-v0.md) retains the related distinctions around continuity, working context, revisions, and attention without selecting a runtime architecture.

## How to read the map

A responsibility is a question-bearing lens, not an adopted EM layer. Every row records:

- **Current realization** — actual source-local mechanism or bounded evidence.
- **Epistemic support** — what the current evidence warrants.
- **Project disposition** — retained pressure, working distinction, or deferral; never implicit adoption.
- **Open question** — the architectural uncertainty that pressure has revealed.
- **Lesson** — the scope boundary that prevents premature abstraction.
- **Revisit when** — a concrete pressure that could earn a bounded change or discriminator.

## Current embodiment map

| Responsibility | Current realization | Epistemic support | Project disposition | Open question | Lesson | Revisit when |
|---|---|---|---|---|---|---|
| **Transport** | Root `inbox/<peer>/` and `outbox/<peer>/` append-only Markdown packets; the exchange extension observes inbound files. | Observed working mechanism. | Retain the transport/semantics distinction. | What must cross an ecological boundary before a receiving EM can materialize or expose it? | A bus packet moves bytes and envelope fields; transport occurrences are **not automatically semantic EM events** and do not automatically mean attention, interpretation, or adoption. | A local semantic surface needs to realize inbound or outbound material without exposing bus topology. |
| **Materialization** | S01's provisional contract specified one fixed local placement. In S02, a bus-deposited packet left `advisory/in` empty until an explicit private projection copied it there. | Bounded execution evidence for S02; S01 is a provisional decision rather than direct execution evidence. | Retain materialization as distinct from transport and attention. | What durable local thing, if any, is semantically exposed after transport arrival, and where is it made available? | Bus-level arrival, explicit semantic projection, and watcher notification are separate. Projection can copy/realize material without scheduling work or asserting authority. | An operator needs to use one non-advisory material through a stable local meaning, or competing projection choices affect use. |
| **Attention** | The exchange extension's per-process `SEEN` set, `.sessions/exchange-journal.jsonl`, toast, and `triggerTurn` notify every open Pi process watching the project mailbox. With multiple watched peer directories it retains only the final `FSWatcher` for shutdown, so earlier watchers rely on process exit. | Observed operational pressure plus an implementation lifecycle limitation. | Retain the pressure; defer a session or subscription mechanism. | How can an ongoing work context express interest without every project-level arrival waking it? | **Project mailbox ≠ session relevance.** Notification is a signal of transport arrival, not semantic projection, work assignment, cognition, or acknowledgement. | Project-wide wakeups demonstrably disrupt relevant work after a minimal explicit session-record control is tried, or watcher lifecycle behavior itself needs correction. |
| **Continuity / keep** | Mission M00's ignored `experiments/m00-e01-first-continuity-loop/.em/` retained one accepted consequence and its provenance across operator replacement. | Bounded evidence: one continuity loop passed. | Retain a continuity question; defer a general substrate or `.em/` interpretation. | What belongs to machine continuity rather than to an operator, session, bus, or host runtime? | `.em/` is a **bounded, specimen-local keep**, not proof of a private nucleus, whole machine, public interface, or required Git arrangement. | A later specimen cannot reconstruct a needed consequence from its explicitly retained state, or needs an exposed/private boundary. |
| **Capability exposure** | S02 offered only `list_advisory_in`, `read_advisory_in`, and `publish_advisory_out` for one literal advisory workload; transport helpers stayed private. | Bounded evidence for a workload-local semantic boundary. | Defer a general capability model, discovery, and grants. | What may an operator, session, or peer address as a meaningful EM capability, and what remains private realization? | A semantic place can be useful without establishing a universal path vocabulary, capability object, authority model, or filesystem ontology. | A second distinct workload needs an independently named/useful local surface, or one caller cannot operate without leaking private topology. |
| **Identity / provenance** | Packet filenames and frontmatter carry `source`, `date`, `type`, `sha256`, and `revision`; M00 retained packet references and a local acceptance record. | Observed provenance records; no global identity evidence. | Retain provenance distinctions; defer global resource, session, machine, actor, or resolver identity. | Which relationships require identity beyond exact bytes and source-local provenance? | A digest identifies bytes, not an occurrence, producer authority, rationale, machine, or adoption decision. | Reconstruction, correlation, or authority handling fails because existing local references are ambiguous. |
| **Operator / cognition** | Pi sessions run the extension and may be awakened to inspect a packet; M00's fresh operator reconstructed a retained consequence. | Observed ephemeral operator behavior and one replacement test. | Retain the operator/continuity distinction; defer a session runtime. | What work context, if any, survives an operator episode and owns interest, pending work, or consequences? | An operator reaction is not automatically a durable session, machine action, or accepted consequence. | A meaningful waiting context must survive replacement or distinguish itself from another active context. |

## Collapsed boundaries visible today

The map does not prescribe that every collapse be separated. It makes the current ones inspectable:

- **Exchange watcher:** filesystem arrival detection, deduplication, local arrival journaling, human notification, and Pi-turn triggering occur in one process-local mechanism. Its deliberate boundary is equally important: it does not interpret packet contents. Multiple peer-directory watchers also expose a lifecycle limitation: only the final watcher is retained for explicit shutdown.
- **M00 continuity proof:** one experiment-local `.em/`, internal Git history, and a curated accepted consequence jointly served one reconstruction question. This does not generalize their ownership or layout.
- **S02 advisory projection:** a test-owned adapter separated literal semantic places from private bus realization for one advisory interaction. It did not establish an ecology-wide capability system.

## Questions for a later authorized embodiment review

This map does not define a change-selection process. If a human later authorizes a review or bounded brief, it may use the rows as questions rather than as gates: is there a concrete pressure, would a proposed change expose one currently implicit boundary to actual use, and what result would justify retaining or revising the map?

Such a later activity may update the map, alter a selected working mechanism, or run a discriminator. Those possibilities are descriptive, not selected next moves. No mission, specimen, implementation, event model, session mechanism, or `.em/` layout is selected by this map.

## Relationship to design memory and authorization

This map is a design-memory thread under [`docs/notes/README.md`](README.md), alongside rather than above mission evidence and the resource/session lineage. It should be revised after an authorized embodiment change or discriminator produces evidence.

The authorization and evidence rules remain in [`AGENTS.md`](../../AGENTS.md): a human must separately authorize an implementation or experiment by naming its bounded brief. This map may explain why a brief is worth considering; it cannot create that brief or promote an experiment helper into reusable architecture.

## Provenance

This synthesis combines current repository mechanisms and bounded specimen records with a human-provided design conversation about progressive embodiment. The source-local links above are evidence for present realizations; the developmental interpretation and unresolved questions remain EM working hypotheses subject to later use and review.
