# Epistemic Machine — Agent Instructions

This repository is the **workshop** for the Epistemic Machine: the design surface where the concept is developed, built, and shared with peer projects (notably Continuity Lab). It is NOT the machine's runtime.

## Roles

- **Workshop (this repo, git-tracked):** design surface — the exchange bus, skills, experiments, specs, seeds/blueprints. Read: `.pi/skills/exchange-skill/SKILL.md` (bus protocol) and `.pi/extensions/exchange/index.ts` (bus transport).
- **Machine (`.em/`, gitignored):** a live machine instance keeps its own state here, including its own internal `.git`. The workshop never versions it. Do not write to `.em/` as if it were part of the repo's source.

## Exchange Bus (peers)

The `inbox/` and `outbox/<peer>/` symlinked-mailbox bus moves markdown packets between this project and its peers. **The bus moves bytes, not procedure** — what this project *does* with a received packet is this project's own workflow.

- **Receive:** a peer writes a packet into `inbox/<peer>/`.
- **Send:** write a packet `.md` into `outbox/<peer>/` (this is a symlink to the peer's `inbox/<this-project>/`).
- Single-writer rule: each side writes only into the directory named after itself → no shared-writer race.
- Packet format (frontmatter `source/date/type/sha256/revision`, body) and filename convention per the skill.

## Development Rule (Mission 0)

Do not build the Epistemic Machine top-down. Build the smallest substrate capable of surviving one real continuity cycle, and let each failure earn the next primitive. Agreed with Continuity Lab 2026-09-03: vertical slice A→G (Contribution → Incorporation → Persistence → Kill → Rebirth → Reconstruction → Joint review). Hypothesis to break: a persistent machine can be represented by a small substrate-owned state region that survives replacement of its operator.

## Division of Labor (with Continuity Lab)

- **EM workshop:** implementation — substrate/adapter/operator-interface spike, first `.em/` instance, running the A→G loop, exposing failures.
- **Continuity Lab:** knowledge & review — terminologies, incorporation structures (5-field decision record), methodological friction, live external ecology pressure.

## Non-Interference

Do not rewrite workshop architecture casually. When the machine ingests an observation, follow its workflow: save raw → `em observe` → proposal → human critique → approval. Do not mutate `.em/` state to "solve" a problem.

## General Project Rules

- Small atomic commits; commit messages include reasoning.
- This is the workshop — prefer clarifying the design surface over accumulating runtime scaffolding.
