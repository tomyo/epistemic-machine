# Machine Ecology Coordination Roadmap v0 (Withdrawn)

Status: withdrawn candidate v0; never adopted; retained as historical design context only
Owner: Epistemic Machine workshop  
Coordination-head adopter: human project owner  
Date: 2026-09-06

This document preserves a prior proposed engineering direction of the Epistemic Machine workshop. It is not current direction, Continuity Lab scientific authority, an architecture proof, an experiment result, or permission to build. Every build and experiment still requires an explicitly human-authorized brief.

## North star

Build persistent, continuity-bearing machines whose ephemeral operators work through simple cognitive projections. Preserve the meaning, provenance, and authority boundaries of material crossing machine boundaries while allowing substrate realizations to change. Develop those boundaries through real workloads, explicit proposal and adoption, and bounded experiments rather than by declaring a universal primitive stack.

## Governance

- EM owns this roadmap and its source-local engineering dispositions.
- Continuity Lab may provide evidence, tensions, methodological interpretation, and revision proposals through a non-authoritative advisory.
- The human adopts the roadmap coordination head and separately authorizes implementation or experiment execution.
- Publication is not receipt; receipt is not adoption; adoption is not implementation authorization.
- A completed experiment supplies bounded evidence. It does not automatically promote a primitive, stabilize a CL claim, or authorize the next experiment.

No coordination head is adopted. This candidate was withdrawn before adoption; it does not select a next mission or experiment. Any later change remains an ordinary reviewed documentation change; no lineage protocol is active.

## Orthogonal abstraction cuts

These are review lenses, not a fixed layer stack or settled ontology. They may recur at different scales.

### 1. Relational / membrane cut

Ask what a participant exposes across a boundary, who may produce or consume it, what authority remains local, and what the exchange does not imply. The existing bus and the advisory specimen are concrete realizations for bounded workloads; neither defines a universal membrane.

### 2. Semantic contract / realization cut

Ask which caller-visible meaning must remain stable and which substrate mechanics may be hidden or replaced. A workload-local realization/projection adapter may map one semantic contract to filesystem operations. No general semantic filesystem or substrate-independent adapter has been established.

### 3. Availability / cognition-action cut

Ask separately whether material is available and whether an operator notices, interprets, adopts, or acts on it. Bell, polling, a filesystem watcher, or a Git observation could later realize availability detection. None is currently a universal primitive, and a read need not become durable history.

## Evidence boundary

| Evidence | Bounded support | Does not establish |
|---|---|---|
| Mission M00, `docs/missions/m00-first-continuity-loop.md` and retrospective | One organism-owned consequence survived one operator replacement and was reconstructed with provenance and scope | A reusable substrate, seed, event model, general identity, or architecture |
| Ecological crossing specimen, `experiments/s01-ecological-crossing/` | Two local entry forms reached one fixed-destination adapter with equivalent validated placement semantics | Shared cross-actor vocabulary, semantic compiler, remote transport, or machine ecology |
| Advisory boundary specimen and contract | One four-place advisory workload hid bus path mechanics behind `advisory/in` and `advisory/out`; arrival remained availability only | General places, delivery guarantees, authority, causation, lifecycle, replaceability, or universal protocol |
| CL EIP-0067 and EIP-0068 | Artifact-lineage and build-learning questions are preserved for review | Lineage necessity, event primacy, experiment activation, or EM implementation authority |

## Status map

Statuses on different axes must not be collapsed.

| Item | Epistemic support | Engineering disposition | Current realization | Owner | Authority effect | Next discriminator |
|---|---|---|---|---|---|---|
| Operator-independent continuity | Bounded Mission M00 evidence | Retain as reference behavior | One experiment-local `.em/` keep | EM | None beyond recorded mission | Another real discontinuity/workload |
| Workload-local semantic boundary | Bounded advisory evidence | Retain as exemplar | Fixed `advisory/in`/`advisory/out` adapter over file bus | EM | None | Different workload or second realization |
| Coordination roadmap | Unadopted draft | Withdrawn | This historical Markdown record plus CL advisory | EM; human may adopt a future head | None | A future human-selected direction |
| Task-shaped cognitive projection | Plausible; partly exemplified | Working engineering hypothesis | Ordinary files and one advisory projection | EM | None | Orientation use, then a workload requiring mediation |
| Artifact revision lineage | Candidate pressure only | Unselected | None | Undecided | None | Observed propagation/reconstruction failure |
| Change/event representation | Candidate only | Deferred | Bus packets and Git commits are existing records, not a selected event model | Undecided | None | Observed propagation/reconstruction failure |
| Git-backed realization | Candidate only | Deferred until after a plain contract is tested | Workshop source control only | EM | None | A second-realization comparison |
| Bell standardization | Candidate only | Deferred | Exchange watcher notification for bus packets | EM transport extension | Notification only | A workload where polling/notification difference matters |

## Withdrawal

This candidate’s Documentation Stage 1 framing and proposed A→B sequence were not adopted. The orientation and roadmap-evolution briefs were withdrawn before execution and produced no evidence. No replacement roadmap, mission, or experiment is selected. `docs/notes/resource-session-working-views-lineage-v0.md` is design memory, not a successor roadmap.

## Historical proposed sequence

The following was the withdrawn proposal, retained for reconstructibility rather than as a work queue:

1. Documentation Stage 1 — orientation documents.
2. Experiment A — cross-repository orientation.
3. Experiment B — roadmap evolution after Experiment A review.
4. Alternative realization.
5. Different workload.

A future direction must be selected and authorized on its own terms; it does not resume this sequence by default.

## Working vocabulary

- **Coordination head:** the roadmap revision the human has adopted for current coordination; protocol-local, not a global artifact ontology.
- **Proposal:** a candidate successor offered for review; it has no authority merely because it exists or arrives.
- **Adoption:** explicit selection of a proposal as the coordination head.
- **Projection:** an operator-facing representation of material for one context; not presumed canonical storage.
- **Workload-local adapter:** code or procedure that hides one realization while preserving one declared contract.
- **Bell:** notification that relevant material may be available; not the material and not an obligation to act.

These definitions are working coordination terms, not promoted universal primitives.

## Explicit exclusions

No current decision establishes or authorizes:

- a general event architecture or event sourcing;
- global artifact or machine identity;
- a lineage DAG, diff/patch format, merge engine, synchronization, or revocation;
- a generic `READ`/`WRITE`/`CREATE`/`WATCH` vocabulary;
- a semantic filesystem, portal, discovery protocol, scheduler, daemon, task runtime, or automatic cognition;
- a canonical store/views architecture, NOSTR transport, or replacement of the filesystem bus;
- `protocol/`, `substrates/`, `seeds/`, `core/`, `events/`, or `views/` foundations;
- direct shared editing of this roadmap.

Experiment apparatus does not belong in this roadmap. Controls, execution conditions, observations, evidence, and reviews live in separate mission artifacts.

## Orientation references

Source-local EM references:

- `AGENTS.md` — workshop behavior and authorization boundary;
- `docs/missions/m00-first-continuity-loop.md` and `docs/missions/m00-first-continuity-loop-retrospective.md` — bounded continuity evidence;
- `docs/notes/advisory-boundary-contract-v0.md` — bounded semantic-boundary evidence;
- `docs/missions/withdrawn/coordination-orientation-v0.md` — withdrawn before execution;
- `docs/missions/withdrawn/coordination-roadmap-evolution-v0.md` — withdrawn before execution.

External provenance: Continuity Lab owns `artifacts/20260906-machine-ecology-coordination-roadmap-advisory-v0.md` as a non-authoritative crosswalk. It is not an EM entry requirement and EM operators must not read the peer tree. If a future authorized workload requires it, CL must deliver it through an allowed packet/projection boundary.
