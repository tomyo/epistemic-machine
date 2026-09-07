# Mission M00 / Experiment E01 — First Continuity Loop

**Status: closed 2026-09-03 — A→G complete; Gates 1+2+3 passed.**

**Hypothesis to break:** *A persistent machine can be represented by a small substrate-owned state region that survives replacement of its operator.*

This experiment runs the Kill→Rebirth discontinuity for real and asks: *what had to survive for the second operator to continue meaningfully?*

---

## Sequence A→G (CL-agreed 2026-09-03)

| Step | Status | Artefact |
|------|--------|----------|
| **A. Contribution** | ✓ done | `outbox/…belief-proposal-c017…md` (`c17cc5…`) |
| **B. Incorporation** | ✓ done | `inbox/…incorporation-decision-c017.md` (`f64745…`, ACCEPTED) |
| **C. Persistence** | ✓ done | `.em/mission-0/ACCEPTED-CONSEQUENCE.json` @ `bd01c74` (machine's own git) |
| **D. Kill** | ✓ done | original operator disappeared; no session memory carried over |
| **E. Rebirth** | ✓ done | fresh operator used the same `.em/` state |
| **F. Reconstruction** | ✓ done | `verify-rebirth.js` passed Gates 1+2 |
| **G. Joint review** | ✓ done | reconstruction report and CL acknowledgement passed Gate 3 |

Grounding: **C017** unrecoverable review artifacts + `checklist v0` items 1–8 (prospective only).

## What this folder owns

This is an **ephemeral trial** — disposable. Delete this folder = delete its machine.

- `.em/` — scoped machine instance for *this* experiment (own `.git`, gitignored). Holds the only organism-owned consequence (`bd01c74`). Workshop root has no `.em`.
- `verify-rebirth.js` — single runnable: simulates the fresh operator (no history). Checks Gate 1+2.
- `lib/substrate.js` — thin helpers over the filesystem substrate (persist/load → `.em/`).
- `lib/bus.js` — thin helpers over the bus mailboxes (`inbox/`/`outbox/` only).

`substrates/` `seeds/` `core/` are **reserved, not created** — promoted only when a gate fails here and earns them (`docs/missions/m00-first-continuity-loop.md`).

## How to run

```bash
node experiments/m00-e01-first-continuity-loop/verify-rebirth.js
# exit 0 = fresh operator reconstructed what/why from .em state plus cited bus packets
# exit 1 = hypothesis broke here — next primitive earned
```

**Visibility boundary:** this experiment never reads `/var/home/tomyo/projects/continuity-lab/`. Only `.em/` + `inbox/`/`outbox/` packets. Same-host readability is a dev artifact, not permission (`SKILL.md`).

## Gates

1. **Substrate survives kill** — `.em/mission-0/ACCEPTED-CONSEQUENCE.json` at `bd01c74`, fields intact.
2. **Fresh operator reconstructs** — from `.em` state plus required bus packets: CONSEQUENCE / PROVENANCE (`c17cc5`/`f64745`/`bd01c74`) / WHY (`Low`) / BOUNDARY. Only the accepted consequence and its organism-owned commit persist in `.em`; the runnable also reads packet context.
3. **Joint review agrees** — CL acks our G report.
