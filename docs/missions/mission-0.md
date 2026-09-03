# Mission 0 — First Continuity Loop

**Status:** CL-agreed 2026-09-03 · A→D done (C persisted at `bd01c74`) · D→G pending
**Packets:** vertical-slice `3df94d` → mission-0-ack (approved) → payload-selected (C017) → belief-proposal `c17cc5` → decision `f64745` (ACCEPTED)

---

## Hypothesis to break

> A persistent machine can be represented by a small substrate-owned state region that survives replacement of its operator.

We try to break it. Each failure earns the next primitive. No top-down stack.

**Development rule** (AGENTS.md): *Build the smallest substrate capable of surviving one real continuity cycle, and let each failure earn the next primitive.*

## Division of labor

- **EM workshop** — implementation: substrate/adapter/operator spike, first `.em` instance, running A→G, exposing failures.
- **Continuity Lab** — knowledge & review: terminology, 5-field decision records, methodological friction, live incorporation authority. First external ecology putting pressure on the machine.

## Visibility boundary

Bus mailboxes `inbox/<peer>/` + `outbox/<peer>/` are the **only** shared surface (`SKILL.md`). No peer reads the other's tree outside packets. Need peer state → ask over bus (`question`/`belief-proposal`/`spec`). Same-host readability is a dev artifact, not permission.

## Sequence A→G

| Step | Actor | Action | Artefact |
|------|-------|--------|----------|
| **A. Contribution** | EM operator | Observe + propose belief over bus | `belief-proposal` packet |
| **B. Incorporation** | CL | 5-field decision: `observation / proposed_interpretation / acceptance / reason / uncertainty` + scope boundary | `decision-record` packet |
| **C. Persistence** | EM operator | Persist accepted consequence to machine state | `experiments/mission-0/.em/mission-0/ACCEPTED-CONSEQUENCE.json` @ `bd01c74` (machine's own git) |
| **D. Kill** | — | Operator that ran A→C disappears | session terminated, no memory carries over |
| **E. Rebirth** | fresh EM operator | Spawned on same machine state, no history | reads only its `.em/` + bus packets |
| **F. Reconstruction** | fresh operator | Determine what consequence exists and why | proves Gate 2 |
| **G. Joint review** | EM + CL | Compare what each believes happened | `report` packet via `outbox/continuity-lab/` |

Grounded payload (CL `payload-selected`): **C017** — unrecoverable review artifacts + `D0` replay verification (`checklist v0` items 1–8, prospective only).

## Experimental question

> What information had to survive the discontinuity for the second operator to continue meaningfully? Persist only what actually bridges a process discontinuity.

## Gates (runnable)

1. **Substrate survives kill** — after D→E, `experiments/mission-0-first-continuity-loop/.em/mission-0/ACCEPTED-CONSEQUENCE.json` exists at commit `bd01c74`, fields `proposed_interpretation + acceptance + provenance + scope_boundary` intact. Run: `verify-rebirth.ts` checks file + `git -C .em log`.

2. **Fresh operator reconstructs** — delegate spawned with **no history** reads only its `.em/` + `inbox/`/`outbox/` packets (never `/var/home/tomyo/projects/continuity-lab/`), reports: CONSEQUENCE (quoted interpretation + ACCEPTED), PROVENANCE (packet filenames + `sha256 c17cc5`/`f64745` + machine commit `bd01c74`), WHY (`reason` + `uncertainty: Low`), BOUNDARY (no C017/C019 authority change, prospective only). Fails if bus-only would suffice — `.em/` must be required to prove organism-owned persistence (delegate already demonstrated this: bus reconstructs *what/why*, `.em/` proves *owned*).

3. **Joint review agrees** — CL acks our G report (`outbox/continuity-lab/<report>.md`) vs their archaeology. Closes loop.

## Bus types used

`question` · `belief-proposal` (A) · `decision-record` (B, 5 fields) · `report` (G) · `spec` (protocol). Each packet: frontmatter `source/date/type/sha256/revision`, filename `<iso>-<slug>.md`. Single-writer rule per `SKILL.md`.

## Provenance (this run)

- A: `outbox/continuity-lab/2026-09-03T15-48-05-belief-proposal-c017-review-provenance.md` (`sha256 c17cc5…`, file `1c250c…`)
- B: `inbox/continuity-lab/2026-09-03T15-55-00-incorporation-decision-c017.md` (`file sha256 f64745…`, ACCEPTED with boundary)
- C: `experiments/mission-0-first-continuity-loop/.em/mission-0/ACCEPTED-CONSEQUENCE.json` — `git -C .em log bd01c74`

Scope boundary (carried in persisted JSON): *no authority change to C017/C019, no repair/reinterpretation, no new execution; prospective only for separately authorized future isolated checks.*

## Promotion rule

`substrates/` `seeds/` `core/` are **reserved, not created**. A stable primitive is promoted from `experiments/` only when a Mission-0 gate fails and demands it. Commit message must state: *what failure earned it*. No speculative layers.

## Folder story

```
workshop (git-tracked)                          machine (gitignored, per-experiment)
docs/missions/mission-0.md  ← you are here      experiments/mission-0-first-continuity-loop/.em/
experiments/mission-0/...   ← ephemeral spike     └── mission-0/ACCEPTED-CONSEQUENCE.json
substrates/ seeds/ core/    ← reserved            └── .git/ (bd01c74)
inbox/ outbox/              ← only shared surface
```

Workshop has no `.em/` at root. Many machines ⇒ many `experiments/<mission>/.em/` (or later `machines/<name>/.em/`).
