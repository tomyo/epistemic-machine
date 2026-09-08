# S05 — Parallel Working Views and Explicit Selection

**Status: completed — authorized bounded specimen with recorded evidence**

## Boundary

S05 was an authorized standalone specimen, not a roadmap or an integrated EM runtime. It tested whether retained local records can preserve one base, two isolated sibling candidates, and an explicit source-local decision for fresh reconstruction. It does not establish a session runtime, resource substrate, or shared working-view primitive.

## Question to break

> Can two isolated working views begin from one retained base material, retain sibling candidates without overwrite, and let a fresh process reconstruct their declared parent/context relationship plus an explicit selection state?

This is a deliberately small probe of the resource / revision / working-view distinction. “Working view” remains a working term: this specimen does not decide whether it is an EM primitive or decomposes into retained material, a derivation relationship, and local state.

## Local record contract

Implementation is confined to `experiments/s05-parallel-working-views-selection/`, uses only Node.js standard-library modules, and creates/removes its own temporary workspace.

The retained JSON records are exactly:

```text
records/R0.json
  { "id": "R0", "kind": "base", "content": string }

views/<view>/<candidate>.json
  { "id": string, "parent": "R0", "view": string, "content": string }

decisions.json
  { "decisions": [{ "candidate": string, "state": "selected" | "rejected" | "unselected" }, ...] }
```

The verifier creates `R0`, `R1a` in `view-a`, and `R1b` in `view-b`; each candidate declares `R0` as parent. For this specimen the decision record names each candidate once, with exactly one selected: `R1a` is selected and `R1b` is rejected. Candidate records use exclusive creation, so a second attempt to create `view-a/R1a.json` is refused and leaves the original retained record unchanged.

A separate Node process runs `reconstruct.js`, reads only these retained records, and returns the base, both candidates, declared parent/context, and decisions. Reconstruction has no merge, automatic integration, deletion, authority, or event semantics.

## Acceptance checks

The authorized specimen provides `node experiments/s05-parallel-working-views-selection/verify.js`, demonstrating:

1. `R0`, `R1a`, and `R1b` are retained as separate records; `R1a` and `R1b` declare the same parent but distinct views.
2. Reusing the same candidate path is rejected without overwriting the original candidate.
3. A fresh Node process reconstructs the exact base, candidates, parent/context relationship, and explicit selected/rejected decisions; it rejects a candidate whose retained path disagrees with declared view/ID and a decision record with two selected siblings.

## Measured result

`node experiments/s05-parallel-working-views-selection/verify.js` exits 0. It retained `R0`, then independent `R1a` and `R1b` records under separate view directories; an attempted second write of `view-a/R1a.json` failed with exclusive creation and the original candidate remained unchanged. A fresh Node process reconstructed the exact `R0`, both candidates, their `parent: "R0"` and distinct view labels, plus `R1a: selected` and `R1b: rejected`.

The verifier also rejected a candidate whose declared context disagreed with its retained path and a decision record that selected both siblings. This evidence supports only that plain retained records can reconstruct this bounded sibling/selection relationship without silent overwrite or automatic integration. It does not establish resource identity or revision history, session identity/runtime, a session-as-machine rule, a mediator, Git/worktrees, an event store, merge/reconciliation, authority, machine-to-machine transport, a global identifier, or a reusable primitive.

## Explicit non-goals

S05 uses a separate local fixture, not root `inbox/` / `outbox/` transport. It includes no `.em/` mutation, watcher/daemon, LLM or cognitive operator, session runtime, S03/S04 source import, Git requirement, generic resource or revision model, revision graph, digest/CAS, merge/reconciliation engine, event semantics, global resource/session/machine identity, authority, reachability, synchronization, resource transfer, or shared foundation.

The view labels, record paths, `R0`/`R1a`/`R1b` names, and decision states are fixture-local controls. They do not identify globally meaningful resources, revisions, sessions, machines, or adoption decisions.

## Evidence boundary and disposition

The recorded success supports only a reconstructible local base/candidate/decision relationship. A failure would have been retained as evidence of the smallest missing distinction. No helper leaves this experiment unless independent later specimens demonstrate recurrence or insufficiency.

## Related design records

- [`docs/roadmaps/incremental-embodiment-roadmap-v0.md`](../roadmaps/incremental-embodiment-roadmap-v0.md) — candidate roadmap that retained this bounded discriminator; it did not itself authorize S05.
- [`docs/notes/resource-session-working-views-lineage-v0.md`](../notes/resource-session-working-views-lineage-v0.md) — the resource / revision / working-view distinction and the earlier plain-files control.
- [`docs/notes/em-boundary-hypotheses-v0.md`](../notes/em-boundary-hypotheses-v0.md) — boundary-first test lenses.
- [`docs/missions/s03-two-machine-request-reply.md`](s03-two-machine-request-reply.md) and [`docs/missions/s04-bounded-resource-reference-projection.md`](s04-bounded-resource-reference-projection.md) — prior separate evidence; S05 imports no shared helper.
