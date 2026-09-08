# Epistemic Machine — Agent Instructions

This repository is the **workshop** for the Epistemic Machine: the design surface where the concept is developed, embodied, and shared with peer projects (notably Continuity Lab). It may host an explicitly authorized provisional embodiment such as Habitat-0; it is not thereby a universal machine runtime or final architecture.

## Roles

- **Workshop (this repo, git-tracked):** design surface — the exchange bus, skills, historical experiments, architecture records, and future authorized embodiment source. Read: `.pi/skills/exchange-skill/SKILL.md` (bus protocol) and `.pi/extensions/exchange/index.ts` (bus transport). The root bus is workshop-peer transport, not a machine communication API.
- **Historical experiment-local specimen:** Mission M00 used `experiments/m00-e01-first-continuity-loop/.em/` (gitignored, with its own internal `.git`) as one bounded realization. Do not generalize this location or Git arrangement.
- **Proposed Habitat-0:** [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](docs/missions/m01-habitat-0-first-runnable-internal-ecology.md) describes a possible repository-local embodiment. It is not authorized and creates no runtime state yet.

## Orientation and Layout

Read in this order for current work:

1. `docs/architecture/README.md` — current provisional embodiment map and status.
2. `docs/roadmaps/embodiment-roadmap-v1.md` — candidate coordination direction; it is not build authorization.
3. The relevant file under `docs/missions/`, then `docs/notes/README.md` and relevant historical evidence/lineage.
4. `docs/roadmaps/machine-ecology-coordination-roadmap.md` only when its withdrawn coordination proposal is historically relevant.

Layout:

- `docs/architecture/` — current provisional implementation guide and embodiment status; revise from real pressure, not by declaration.
- `docs/roadmaps/` — EM-owned engineering direction and status; a candidate becomes the coordination head only through human adoption.
- `docs/missions/` — mission specifications and status, including closed evidence and proposed bounded embodiments.
- `docs/notes/` — historical design lineage, bounded decisions, and evidence synthesis; not stable architecture by location.
- `experiments/mNN-eNN-<slug>/` — isolated experiment within an adopted mission; `experiments/sNN-<slug>/` — standalone specimen. Mission M00 owns the only current gitignored `.em/` specimen; future missions do not inherit that realization automatically. Do not assume experiment helpers are stable foundations.
- `protocol/` `substrates/` `seeds/` `core/` — reserved names only. They do not exist and have not been earned as reusable foundations.

## Exchange Bus (peers)

The `inbox/` and `outbox/<peer>/` symlinked-mailbox bus moves markdown packets between this project and its peers. **The bus moves bytes, not procedure** — what this project *does* with a received packet is this project's own workflow.

- **Receive:** a peer writes a packet into `inbox/<peer>/`.
- **Send:** write a packet `.md` into `outbox/<peer>/` (this is a symlink to the peer's `inbox/<this-project>/`).
- Single-writer rule: each side writes only into the directory named after itself → no shared-writer race.
- Packet format (frontmatter `source/date/type/sha256/revision`, body) and filename convention per the skill.

## Development Approach

**Mission M00 (closed):** One A→G vertical slice showed that the filesystem bus plus one experiment-local `.em` consequence was sufficient for that loop (Gates 1+2+3 passed). Because no gate failed, the retrospective promoted no stable primitive. Mission M00 does not authorize `protocol/`, `substrates/`, `seeds/`, or `core/`.

## Embodiment Preparation

**Current phase:** The workshop is preparing a provisional embodiment guided by [`docs/architecture/`](docs/architecture/README.md) and the candidate [`docs/roadmaps/embodiment-roadmap-v1.md`](docs/roadmaps/embodiment-roadmap-v1.md). M01 / Habitat-0 is proposed, not adopted or active. Documentation may be revised as ordinary workshop work; it is not implementation.

Every implementation or experiment requires **separate explicit human authorization** naming its bounded brief. Roadmap adoption, receipt of a peer advisory, completion of a prior experiment, or preparation of a mission brief is not sufficient authorization. An authorized embodiment must be the smallest useful realization, preserve its evidence boundary, and revise architecture only when use supplies real pressure. Historical M00/S03/S04/S05 evidence remains frozen.

## Mission and Experiment Naming

- `mNN-<slug>` names a proposed or adopted mission; allocate the next stable workshop-local ID only when a human explicitly directs that its brief be prepared. `Status` records proposed versus adopted.
- `mNN-eNN-<slug>` names an explicitly authorized experiment within an adopted mission; allocate `eNN` only at authorization.
- `sNN-<slug>` names a standalone specimen not claimed by a mission.
- IDs are stable and never reused. Status belongs in the document, not the path; Git history carries revisions. Existing historical names are migrated only by an explicit repository decision.

## Design Conversation Documentation

When a human provides a design conversation for review, first compare it with the roadmap, relevant mission evidence, implementation, and `docs/notes/README.md`. Classify meaningful findings as already captured, refinement, new thread, deferred/rejected for scope, falsified, mission/roadmap impact, or discard. A review catalogs ideas; it does not adopt a direction, revise a roadmap, authorize a build, or create a CL conclusion. Update the catalogue or a lineage note only with explicit human approval, preserving the idea's epistemic support, project disposition, lesson/rationale, and revisit condition.

## Division of Labor (with Continuity Lab)

- **EM workshop:** owns this repository's engineering roadmap, source-local design decisions, mission briefs, experiments, and implementation.
- **Continuity Lab:** owns its scientific/epistemic and methodology authorities and may provide non-authoritative evidence, tensions, interpretation, and advice.
- **Human:** adopts the roadmap coordination head and separately authorizes bounded builds or experiments.

Roadmap direction, CL advice, build authorization, and experiment evidence are separate decision surfaces. Publication, receipt, review, adoption, and implementation authorization are distinct acts.

## Non-Interference

Do not rewrite workshop architecture casually. The historical `save raw → em observe → proposal → human critique → approval` sketch is not an active workflow and no source-local `em observe` command is established here. Use it only if a future human-authorized experiment provides and scopes it. Do not mutate `.em/` state to "solve" a problem.

## General Project Rules

- Small atomic commits; commit messages include reasoning.
- Keep the architecture surface current when real implementation/use changes its responsibility map; do not turn ordinary bugs into architecture.
- This is the workshop — build only explicitly authorized embodiment scope, not speculative runtime scaffolding.
