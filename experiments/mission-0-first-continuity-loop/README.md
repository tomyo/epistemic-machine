# Mission 0 — First Continuity Loop (experiment)

**Hypothesis to break:** *A persistent machine can be represented by a small substrate-owned state region that survives replacement of its operator.*

This experiment runs the Kill→Rebirth discontinuity for real and asks: *what had to survive for the second operator to continue meaningfully?*

---

## Sequence A→G (CL-agreed 2026-09-03)

| Step | Status | Artefact |
|------|--------|----------|
| **A. Contribution** | ✓ done | `outbox/…belief-proposal-c017…md` (`c17cc5…`) |
| **B. Incorporation** | ✓ done | `inbox/…incorporation-decision-c017.md` (`f64745…`, ACCEPTED) |
| **C. Persistence** | ✓ done | `.em/mission-0/ACCEPTED-CONSEQUENCE.json` @ `bd01c74` (machine's own git) |
| **D. Kill** | pending | this operator disappears — no memory carries over |
| **E. Rebirth** | pending | fresh operator on same `.em/` state |
| **F. Reconstruction** | pending | `verify-rebirth.js` — Gate 1+2 |
| **G. Joint review** | pending | report via `outbox/continuity-lab/` |

Grounding: **C017** unrecoverable review artifacts + `checklist v0` items 1–8 (prospective only).

## What this folder owns

This is an **ephemeral trial** — disposable. Delete this folder = delete its machine.

- `.em/` — scoped machine instance for *this* mission (own `.git`, gitignored). Holds the only organism-owned consequence (`bd01c74`). Workshop root has no `.em`.
- `verify-rebirth.js` — single runnable: simulates the fresh operator (no history). Checks Gate 1+2.
- `lib/substrate.js` — thin helpers over the filesystem substrate (persist/load → `.em/`).
- `lib/bus.js` — thin helpers over the bus mailboxes (`inbox/`/`outbox/` only).

`substrates/` `seeds/` `core/` are **reserved, not created** — promoted only when a gate fails here and earns them (`docs/missions/mission-0.md`).

## How to run

```bash
node experiments/mission-0-first-continuity-loop/verify-rebirth.js
# exit 0 = substrate survived, fresh operator reconstructed what/why from .em alone
# exit 1 = hypothesis broke here — next primitive earned
```

**Visibility boundary:** this experiment never reads `/var/home/tomyo/projects/continuity-lab/`. Only `.em/` + `inbox/`/`outbox/` packets. Same-host readability is a dev artifact, not permission (`SKILL.md`).

## Gates

1. **Substrate survives kill** — `.em/mission-0/ACCEPTED-CONSEQUENCE.json` at `bd01c74`, fields intact.
2. **Fresh operator reconstructs** — from `.em` alone (plus bus packets for context): CONSEQUENCE / PROVENANCE (`c17cc5`/`f64745`/`bd01c74`) / WHY (`Low`) / BOUNDARY.
3. **Joint review agrees** — CL acks our G report.
