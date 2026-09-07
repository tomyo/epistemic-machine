# Filesystem Realization — Provisional Notes

**Status:** provisional — source-local workshop proposal — maps concepts to a filesystem substrate · provisional · not CL-adopted · per CL boundary review `2026-09-04T16-13-30` · refs `docs/concepts/epistemic-machine.md` + `material-and-communication.md`

> This document sketches how candidate abstractions might map to a filesystem substrate; it is not a current experiment or implementation specification.
> Nothing here is automatically a property of an EM.
> Treat the concrete mechanisms as proposals or bounded observations according to their explicit status. See §4 for decisions and open questions.

---

## 1. Substrate: filesystem

The workshop instantiates a machine on a filesystem: we give the operator a **filesystem-like operational interface** to it — one possible interface among others (text, API, visual, NOSTR to remote ecology) to the same machine. The operator navigates files, folders, symlinks. This is **one operational interface through which an operator can interact with a machine**, not the machine's abstraction. The same machine could expose a textual interface to an LLM, an API to another machine, or a NOSTR interface to a remote ecology — that the operator is replaceable implies the interface is not the machine.

A parked north sketch would preserve canonical material and materialize filesystem projections for this interface (see §3). That store/projection split is not implemented or earned today. On a different substrate (browser OPFS/IndexedDB, remote service), a similar — not necessarily identical — interface might be materialized differently.

## 2. Machine keep vs transport state vs host evidence

| Thing | What it is | Where today |
|-------|------------|-------------|
| **Machine keep (continuity)** | What the organism curated; survives Kill → Rebirth | `experiments/mNN-eNN-<slug>/.em/` or `experiments/sNN-<slug>/.em/` when a brief selects one (own `.git`, gitignored, scoped) — today `mission-0/ACCEPTED-CONSEQUENCE.json @ bd01c74` |
| **Transport state** | Ephemeral delivery, not machine-owned | `inbox/<peer>/` + `outbox/<peer>/` (symlinked mailboxes, single-writer, `SKILL.md`) |
| **Host evidence** | Per-host journal of received packets | `.sessions/exchange-journal.jsonl` (one line per received packet, from `exchange/index.ts`) |

Only mailboxes are shared (`SKILL.md` visibility boundary). Machines decide what to curate from transport into keep.

## 3. Materialization as filesystem projections

Wrapping, transport, and materialization (from `material-and-communication.md`):

* Document = file with frontmatter (`source/date/type/sha256/revision`, body). Wrappers are onion layers — frontmatter at each level.
* The current top-level `inbox/<peer>/` and `outbox/<peer>/` are transport mailboxes. A future envelope adapter might unwrap transport-specific metadata while retaining provenance, but no general unwrapping/canonical-store path exists today.
* A **semantic inbox** is a machine-local projection, not transport. The advisory specimen's `advisory/in` is one workload-local example. Do not confuse that term with the currently named top-level bus `inbox/`. Availability in either place does not imply attention or interpretation.

**Filesystem-like projections:** the operator navigates files. Concretely today this is a real filesystem, and the advisory specimen demonstrates one workload-local projection. There is no general canonical store/view split. The parked north sketch asks whether future operators might receive different materializations (`inbox/`, `archive/`, `by-project/`, `timeline/`) from retained canonical material; that remains an engineering hypothesis.

### Canonical vs views (north sketch — not built yet)

```
canonical store (one place that keeps)
    │
    ├─→ views/inbox/<peer>/        materialized filter
    ├─→ views/outbox/<peer>/
    ├─→ views/timeline/
    ├─→ views/by-topic/
    └─→ views/archive/             status = archived query, not mv
```

Today canonical storage and views are not separated. The top-level `inbox/outbox` are transport mailboxes, and Mission M00 used one experiment-local `.em/` keep. A general separation requires a future human-authorized brief with a workload, control, and observable insufficiency; it is not earned merely by naming a future deployment.

Until then, `events/`, `views/`, and `.membrane/` are reserved names only and must not be created as foundations.

## 4. Parked implementation questions

These are unselected questions for a possible filesystem realization. They belong here, not in `epistemic-machine.md`.

| Question | Parked candidate | Revisit only when |
|----------|------------------|------------------|
| Automatic canonical storage on receipt | Parked — not yet decided whether transport adapter auto-appends to Store then projects to `inbox`, or operator must explicitly curate | Decide when Bell→Attention loop is exercised |
| Writable views vs read-only + explicit op | Parked — `mv inbox/read` as state transition vs `/resolve <id>` / edit `status: read` | Try second state (`read`/`archived`) |
| Document identity | Parked — filename `<iso>-<slug>.md` + frontmatter `id:`? ULID? content hash? | Need before second machine |
| Bell mechanism | Parked — Bell as "membrane changed" signal, observed as new file in projection (no daemon, `watch views/inbox/`) | When need notification not polling |
| Operator invocation language | Parked — e.g. `/invoke machine-a "msg"` vs `mv`/file ops — `invoke(action,args)` was sufficient only in the Membrane-0 simulation | A bounded workload requires cognition-controlled invocation |
| NOSTR transport identity / `pubkey` | Parked question — whether an envelope key can represent transport provenance without becoming machine identity is unresolved | A human-authorized workload demonstrates off-host or provenance pressure that the current transport cannot preserve |
| `.membrane/<exposed>/` | Parked — folder-as-membrane a peer symlinks to "enter" | Guest needs `invoke` without knowing layout |

## 5. What is not built yet

`protocol/nostr-north.md`, `substrates/<transport>/`, `seeds/`, `core/`, `events/`, `views/`, and `.membrane/` are reserved possibilities, not present foundations. Do not create them from this conceptual split. Any future addition requires an explicit human-authorized brief with a concrete workload, control or reference case, observable pressure, and falsification condition.

---

*Concepts:* `docs/concepts/epistemic-machine.md` (what a machine is), `docs/concepts/material-and-communication.md` (material axis, wrapping, Bell vs content).  
*Transport contract:* `.pi/skills/exchange-skill/SKILL.md`. *Example keep:* `experiments/m00-e01-first-continuity-loop/.em/mission-0/ACCEPTED-CONSEQUENCE.json`.
