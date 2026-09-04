# Epistemic Machine — Agent Instructions

This repository is the **workshop** for the Epistemic Machine: the design surface where the concept is developed, built, and shared with peer projects (notably Continuity Lab). It is NOT the machine's runtime.

## Roles

- **Workshop (this repo, git-tracked):** design surface — the exchange bus, skills, experiments, specs, seeds/blueprints. Read: `.pi/skills/exchange-skill/SKILL.md` (bus protocol) and `.pi/extensions/exchange/index.ts` (bus transport). The workshop itself is not a machine.
- **Machine (`experiments/<mission>/.em/`, gitignored):** a live machine instance keeps its own state here, including its own internal `.git`, scoped to the experiment that owns it. The workshop never versions it. Do not write to `.em/` as if it were part of the repo's source. Many machines ⇒ many `experiments/<mission>/.em/` (or later `machines/<name>/.em/`), root has no `.em/`.

## Layout

- `docs/missions/` — stable mission specs (CL-agreed A→G, gates, hypothesis, bus types) — one file per mission.
- `docs/notes/` — parked notes (communication layers, decisions) — not specs yet; capture informed defaults and norths (e.g. NOSTR unsigned as north).
- `experiments/<mission>/` — ephemeral trial / test for one mission; owns its machine as `experiments/<mission>/.em/` (gitignored, own `.git`). Disposable: delete folder = delete its machine. Tests **use** stable foundations, not recreate them per trial.
- `protocol/` `substrates/` `seeds/` `core/` — **stable foundations**, built pragmatically on informed defaults (lab already earned `membrane0`/`seed-v0` via investigation). Reused by experiments. Notes capture why.

## Exchange Bus (peers)

The `inbox/` and `outbox/<peer>/` symlinked-mailbox bus moves markdown packets between this project and its peers. **The bus moves bytes, not procedure** — what this project *does* with a received packet is this project's own workflow.

- **Receive:** a peer writes a packet into `inbox/<peer>/`.
- **Send:** write a packet `.md` into `outbox/<peer>/` (this is a symlink to the peer's `inbox/<this-project>/`).
- Single-writer rule: each side writes only into the directory named after itself → no shared-writer race.
- Packet format (frontmatter `source/date/type/sha256/revision`, body) and filename convention per the skill.

## Development Approach

**Mission 0 (done):** Do not build top-down. Build the smallest substrate capable of surviving one continuity cycle, and let each failure earn the next primitive. Agreed 2026-09-03: vertical slice A→G proved `filesystem bus + .em @ bd01c74` suffices for one loop (Gates 1+2+3 ✓).

**Now (workshop build phase):** Investigations are done — lab already earned core primitives via `membrane0`/`seed-v0`/`alternating-control-v0`. This repo is not to re-prove pressure per experiment. Build known-good plumbing pragmatically on informed defaults, reuse it in `experiments/` as tests that incrementally raise complexity. Take notes on the way (`docs/notes/`). Epistemic theorizing (`the Machine`) is paused — build parts and foundations we know we'll need; let a useful machine help this repo properly later. CL pressure stays epistemic (what should be owned state?).

## Division of Labor (with Continuity Lab)

- **EM workshop:** plumbing foundations (`protocol`/`substrates`/`seeds`/`core`) + tests (`experiments/` that use them). No longer theorizing the Machine; building reuseable parts.
- **Continuity Lab:** knowledge & review — terminologies, incorporation structures (5-field decision record), methodological friction, live external ecology pressure (what should become owned state?).

Epistemic vs plumbing are separate — don't mix them. Experiments test plumbing; CL provides epistemic pressure.

## Non-Interference

Do not rewrite workshop architecture casually. When the machine ingests an observation, follow its workflow: save raw → `em observe` → proposal → human critique → approval. Do not mutate `.em/` state to "solve" a problem.

## General Project Rules

- Small atomic commits; commit messages include reasoning.
- This is the workshop — prefer clarifying the design surface over accumulating runtime scaffolding.
