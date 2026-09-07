# Mission 0 Retrospective

**Mission:** First Continuity Loop · **Closed:** 2026-09-03 · **Gates:** 1+2+3 ✓ · `b6b79eb`

---

## What we set out to break

> A persistent machine can be represented by a small substrate-owned state region that survives replacement of its operator.

One real A→G loop, no top-down stack. Rule: *let each failure earn the next primitive.*

## What happened (A→G)

| Step | Artefact | sha |
|------|----------|-----|
| A Contribution | `outbox/…belief-proposal-c017…md` | `c17cc5…` |
| B Incorporation | `inbox/…incorporation-decision-c017.md` (ACCEPTED, Low) | `f64745…` |
| C Persistence | `experiments/mission-0-first-continuity-loop/.em/mission-0/ACCEPTED-CONSEQUENCE.json` | `bd01c74` |
| D Kill → E Rebirth | fresh operator (delegate + `verify-rebirth.js`, no history) | `exit 0` |
| F Reconstruction | accepted consequence retained in `.em`; provenance, reason/confidence, and scope/boundary supplied by cited bus packets | Gates 1+2 ✓ |
| G Joint review | `outbox/…reconstruction-report.md` → `inbox/…mission-0-complete-ack.md` | Gate 3 ✓ |

Payload: **C017** review provenance gap + prospective `checklist v0` items 1–8.

## What survived the discontinuity

Only one organism-owned thing had to survive: `ACCEPTED-CONSEQUENCE.json` at `bd01c74` (machine's own `.git` inside `experiments/mission-0-first-continuity-loop/.em/`).

Fresh operator could reconstruct the accepted consequence from `.em`, while the cited bus proposal/decision packets supplied the quoted `proposed_interpretation`, reason/Low, and scope/boundary. Nothing else was required. Hypothesis **holds for this loop**.

## What we learned (CL ack confirmed)

- **Bus records; `.em` retains the organism-owned consequence.** The `.em @ bd01c74` commit supplied bounded evidence that the accepted consequence persisted across the tested Kill→Rebirth discontinuity. The cited `inbox/outbox` proposal and decision packets supplied the provenance, reason/confidence, and scope/boundary needed for reconstruction.
- **Workshop ≠ machine.** Root has no `.em`. Many machines ⇒ many `experiments/<mission>/.em/` (later `machines/<name>/.em/`). Move `bd01c74` from root → `experiments/` made the folder story honest (`df9a9b3`).
- **Visibility boundary holds.** No peer tree reads (`SKILL.md`) — `verify-rebirth.js` + delegate read only `.em/ + inbox/outbox`. Bypassing bus would have hidden what must be communicated.
- **Empty is correct.** No `substrates/` `seeds/` `core/` was needed — filesystem as substrate + one `ACCEPTED-CONSEQUENCE.json` sufficed.

## What we did NOT earn

Vertical slice succeeded without failure, so **no stable primitive promoted**. `substrates/` `seeds/` `core/` remain reserved. Commit messages must state *what failure earned it* — we have none yet. Don't invent layers.

`verify-rebirth.js` (`74` lines + `lib/substrate.js` + `lib/bus.js` = ~60 lines, stdlib JS + docstrings, no deps) is still ephemeral under `experiments/` — promotion to `substrates/filesystem/` would violate the rule.

## Open pressures

1. **Many machines** — can we instantiate a new machine from a seed blueprint? (`seeds/` not yet earned)
2. **Many substrates** — filesystem is one substrate; transport that survives host separation is untested. This is where NOSTR temptation lives (see next).

## Historical NOSTR temptation (not built)

The initial retrospective considered replacing `inbox/outbox` + `.sessions/journal` with NOSTR-like `events/`, materialized `views/`, and `.membrane/` projections.

That sketch appeared to offer transport keys, signatures, relays, and event/view separation, but it did not establish machine identity, a canonical event model, or a need for those mechanisms. Mission 0's filesystem bus **did not fail** — `verify-rebirth → 0`. Building the sketch then would have been a top-down stack, so no part was promoted.

A historical question packet, `2026-09-03T18-30-question-transport-evolution.md`, asked CL for transport advice. That consultation did not transfer EM sequencing authority to CL and no longer controls current work.

## Historical next-step note — superseded

The former instruction to wait for CL to choose Mission 1 is superseded by `docs/roadmaps/machine-ecology-coordination-roadmap.md` and `AGENTS.md`. CL may provide non-authoritative evidence and advice; EM owns source-local engineering dispositions; the human adopts roadmap direction and separately authorizes bounded work. No Mission 1 is selected by this retrospective.

```
workshop (b6b79eb)                         machine per experiment
docs/missions/mission-0.md ✓ CLOSED        experiments/mission-0-first-continuity-loop/.em @ bd01c74
docs/missions/mission-0-retrospective.md   └── mission-0/ACCEPTED-CONSEQUENCE.json
experiments/mission-0/... (ephemeral)      bus (inbox ↔ outbox) — only shared surface
(no substrates/ seeds/ core/ yet)          pushed d2e990f..b6b79eb → origin/main
```
