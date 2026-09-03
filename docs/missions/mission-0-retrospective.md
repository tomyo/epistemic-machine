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
| F Reconstruction | consequence + provenance + reason + boundary from `.em` alone | Gates 1+2 ✓ |
| G Joint review | `outbox/…reconstruction-report.md` → `inbox/…mission-0-complete-ack.md` | Gate 3 ✓ |

Payload: **C017** review provenance gap + prospective `checklist v0` items 1–8.

## What survived the discontinuity

Only one organism-owned thing had to survive: `ACCEPTED-CONSEQUENCE.json` at `bd01c74` (machine's own `.git` inside `experiments/mission-0-first-continuity-loop/.em/`).

Fresh operator could reconstruct everything (quoted `proposed_interpretation` + `ACCEPTED with boundary` + `reason/Low` + scope) from that file + bus packets. Nothing else was required. Hypothesis **holds for this loop**.

## What we learned (CL ack confirmed)

- **Bus observes; `.em` proves.** `inbox/outbox` packets alone reconstruct *what/why/boundary* — but only `.em @ bd01c74` proves organism-owned persistence survived Kill→Rebirth. This was the experimental question; CL joint review called it "highly significant."
- **Workshop ≠ machine.** Root has no `.em`. Many machines ⇒ many `experiments/<mission>/.em/` (later `machines/<name>/.em/`). Move `bd01c74` from root → `experiments/` made the folder story honest (`df9a9b3`).
- **Visibility boundary holds.** No peer tree reads (`SKILL.md`) — `verify-rebirth.js` + delegate read only `.em/ + inbox/outbox`. Bypassing bus would have hidden what must be communicated.
- **Empty is correct.** No `substrates/` `seeds/` `core/` was needed — filesystem as substrate + one `ACCEPTED-CONSEQUENCE.json` sufficed.

## What we did NOT earn

Vertical slice succeeded without failure, so **no stable primitive promoted**. `substrates/` `seeds/` `core/` remain reserved. Commit messages must state *what failure earned it* — we have none yet. Don't invent layers.

`verify-rebirth.js` (`74` lines + `lib/substrate.js` + `lib/bus.js` = ~60 lines, stdlib JS + docstrings, no deps) is still ephemeral under `experiments/` — promotion to `substrates/filesystem/` would violate the rule.

## Open pressures

1. **Many machines** — can we instantiate a new machine from a seed blueprint? (`seeds/` not yet earned)
2. **Many substrates** — filesystem is one substrate; transport that survives host separation is untested. This is where NOSTR temptation lives (see next).

## NOSTR temptation (not built)

We're tempted to replace `inbox/outbox` + `.sessions/journal` with NOSTR semantics: `events/` (append-only signed events, `kind` = `belief-proposal`/`decision-record`/…), `views/inbox/` `views/outbox/` (materialized filters by pubkey/kind), `.membrane/<exposed>/` (folder-as-membrane via symlink to enter another's exposed view).

It solves identity (pubkey = machine), signatures (vs `sha256` frontmatter hack), relays (off-host), and `events → views` separation (bus becomes a view). But Mission 0's filesystem bus **did not fail** — `verify-rebirth → 0`, boundary respected, no crypto needed. Building it now = top-down stack before seed failure. Reserved until failure demands it.

Discussed with CL via `question` packet `2026-09-03T18-30-question-transport-evolution.md` — awaiting their read on when transport should earnSigned events (see next section). We pause before Mission 1 until CL replies.

## What next

Wait for CL. If they say "earn `seeds/` first, keep filesystem transport," Mission 1 = First Seed (seed → new `experiments/<name>/.em/`). If they say transport pressure is next, we let Mission 1 fail on filesystem transport and then earn `events/` / `substrates/nostr/` from that failure.

```
workshop (b6b79eb)                         machine per experiment
docs/missions/mission-0.md ✓ CLOSED        experiments/mission-0-first-continuity-loop/.em @ bd01c74
docs/missions/mission-0-retrospective.md   └── mission-0/ACCEPTED-CONSEQUENCE.json
experiments/mission-0/... (ephemeral)      bus (inbox ↔ outbox) — only shared surface
(no substrates/ seeds/ core/ yet)          pushed d2e990f..b6b79eb → origin/main
```
