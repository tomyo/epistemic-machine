# Epistemic Machine — Agent Instructions

This repository is the **workshop** for the Epistemic Machine: the design surface where the concept is developed, built, and shared with peer projects (notably Continuity Lab). It is NOT the machine's runtime.

## Roles

- **Workshop (this repo, git-tracked):** design surface — the exchange bus, skills, experiments, specs, seeds/blueprints. Read: `.pi/skills/exchange-skill/SKILL.md` (bus protocol) and `.pi/extensions/exchange/index.ts` (bus transport). The workshop itself is not a machine.
- **Experiment-local machine specimen:** Mission 0 used `experiments/mission-0-first-continuity-loop/.em/` (gitignored, with its own internal `.git`) as one bounded realization. The workshop never versions that state. Do not generalize this location or Git arrangement to future machines; a later brief must select its own realization. Root has no `.em/`.

## Orientation and Layout

Read in this order for current work:

1. `docs/roadmaps/machine-ecology-coordination-roadmap.md` — candidate EM engineering orientation at its canonical location; pending human adoption and never build authorization.
2. The relevant file under `docs/missions/` — closed evidence or a dormant candidate brief.
3. `docs/notes/README.md`, then relevant `docs/notes/` and experiment-local reviews — the catalogue, bounded evidence, provisional decisions, and architectural lineage.

Layout:

- `docs/roadmaps/` — EM-owned engineering direction and status; a candidate becomes the coordination head only through human adoption.
- `docs/missions/` — mission specifications and status, including closed and dormant missions.
- `docs/notes/` — parked notes and bounded decisions; not stable architecture by location.
- `experiments/<mission>/` — isolated trial/test for one mission. Mission 0 owns the only current gitignored `.em/` specimen; future missions do not inherit that realization automatically. Do not assume experiment helpers are stable foundations.
- `protocol/` `substrates/` `seeds/` `core/` — reserved names only. They do not exist and have not been earned as reusable foundations.

## Exchange Bus (peers)

The `inbox/` and `outbox/<peer>/` symlinked-mailbox bus moves markdown packets between this project and its peers. **The bus moves bytes, not procedure** — what this project *does* with a received packet is this project's own workflow.

- **Receive:** a peer writes a packet into `inbox/<peer>/`.
- **Send:** write a packet `.md` into `outbox/<peer>/` (this is a symlink to the peer's `inbox/<this-project>/`).
- Single-writer rule: each side writes only into the directory named after itself → no shared-writer race.
- Packet format (frontmatter `source/date/type/sha256/revision`, body) and filename convention per the skill.

## Development Approach

**Mission 0 (closed):** One A→G vertical slice showed that the filesystem bus plus one experiment-local `.em` consequence was sufficient for that loop (Gates 1+2+3 passed). Because no gate failed, the retrospective promoted no stable primitive. Mission 0 does not authorize `protocol/`, `substrates/`, `seeds/`, or `core/`.

**Current stage:** Documentation Stage 1 establishes a shared orientation boundary only. Machine Ecology Coordination Roadmap version 0 is a candidate pending human review/adoption. Experiment A and Experiment B are dormant briefs. No experiment, architecture implementation, lineage/event machinery, or `.em/` mutation is active.

Every implementation or experiment requires an explicit human authorization naming its bounded brief. Roadmap adoption, receipt of a peer advisory, or completion of a prior experiment is not sufficient authorization. Build the smallest authorized specimen, preserve its failure/evidence boundary, and promote reusable machinery only after recurrence or demonstrated insufficiency warrants it.

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
- This is the workshop — prefer clarifying the design surface over accumulating runtime scaffolding.
