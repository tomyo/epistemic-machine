# Filesystem Protocol — Implementation

**Status:** experiment implementation — maps concepts to a filesystem substrate · provisional · refs `docs/concepts/epistemic-machine.md` + `material-and-communication.md`

> Given the abstractions above, this experiment implements a machine using a filesystem.
> Everything here is **not a property of an EM** — it is a property of this substrate realization.
> Choices here are *decisions*, not axioms. See §4 for current decisions and open questions.

---

## 1. Substrate: filesystem

The workshop instantiates a machine on a filesystem: we give the operator a **filesystem-like operational interface** to it — one possible interface among others (text, API, visual, NOSTR to remote ecology) to the same machine. The operator navigates files, folders, symlinks. This is **one operational interface through which an operator can interact with a machine**, not the machine's abstraction. The same machine could expose a textual interface to an LLM, an API to another machine, or a NOSTR interface to a remote ecology — that the operator is replaceable implies the interface is not the machine.

Canonical `events`/docs are stored by the membrane (the "something around the machine"), and materialized as filesystem projections for this interface (see §2). On a different substrate (browser OPFS/IndexedDB, remote service) a similar — not identical — interface would be materialized differently.

## 2. Machine keep vs transport state vs host evidence

| Thing | What it is | Where today |
|-------|------------|-------------|
| **Machine keep (continuity)** | What the organism curated; survives Kill → Rebirth | `experiments/<mission>/.em/` (own `.git`, gitignored, scoped) — today `mission-0/ACCEPTED-CONSEQUENCE.json @ bd01c74` |
| **Transport state** | Ephemeral delivery, not machine-owned | `inbox/<peer>/` + `outbox/<peer>/` (symlinked mailboxes, single-writer, `SKILL.md`) |
| **Host evidence** | Per-host journal of received packets | `.sessions/exchange-journal.jsonl` (one line per received packet, from `exchange/index.ts`) |

Only mailboxes are shared (`SKILL.md` visibility boundary). Machines decide what to curate from transport into keep.

## 3. Materialization as filesystem projections

Wrapping, transport, and materialization (from `material-and-communication.md`):

* Document = file with frontmatter (`source/date/type/sha256/revision`, body). Wrappers are onion layers — frontmatter at each level.
* Only mailboxes + transport envelope are shared; after unwrap, what lands in the machine's local world is the machine-level document (transport envelope gone, provenance retained canonically).
* **Inbox is not transport** — it is the machine-local projection after the transport adapter has unwrapped (envelope removed). Bell signals it; Attention interprets.

**Filesystem-like projections:** the operator navigates files. Concretely today this *is* a real filesystem, but it is one materialization — folders/symlinks are projections/views of canonical material, not the canonical store. Underneath, the canonical `events`/docs are always stored; this filesystem view can be regenerated as different materializations (`inbox/`, `archive/`, `by-project/`, `timeline/`) from the same store. A different operator (human vs Claude Code vs machine) could be shown a different materialization of the same machine.

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

Today canonical + views are not separated — `inbox/outbox` *are* the transport and `.em/mission-0/` is the sole keep. Separation is earned when `inbox/outbox` insufficient (off-host or multi-machine filtering fails without centralized log — see §4).

Until then: `events/` `views/` `.membrane/` remain reserved/empty per `AGENTS.md`.

## 4. Current decisions (not axioms) — and open questions

These are implementation choices for this substrate. They belong here, not in `epistemic-machine.md`.

| Decision | Current choice | Open / when revisited |
|----------|---------------|----------------------|
| Automatic canonical storage on receipt | Parked — not yet decided whether transport adapter auto-appends to Store then projects to `inbox`, or operator must explicitly curate | Decide when Bell→Attention loop is exercised |
| Writable views vs read-only + explicit op | Parked — `mv inbox/read` as state transition vs `/resolve <id>` / edit `status: read` | Try second state (`read`/`archived`) |
| Document identity | Parked — filename `<iso>-<slug>.md` + frontmatter `id:`? ULID? content hash? | Need before second machine |
| Bell mechanism | Parked — Bell as "membrane changed" signal, observed as new file in projection (no daemon, `watch views/inbox/`) | When need notification not polling |
| Operator invocation language | Parked — e.g. `/invoke machine-a "msg"` vs `mv`/file ops — conceptually `invoke(action,args)` (`membrane0` earned) mapped to text/file ops | Before seed machine does internal `machine → machine` |
| NOSTR transport identity / `pubkey` | Parked — NOSTR envelope uses `pubkey` as machine id later (`machine.md` frontmatter `id:` → pubkey), unsigned for now, `sig` when provenance collapses (CL condition b) | Off-host (condition a) or provenance failure (b) |
| `.membrane/<exposed>/` | Parked — folder-as-membrane a peer symlinks to "enter" | Guest needs `invoke` without knowing layout |

## 5. What is not built yet

`protocol/nostr-north.md` (layer-1 formal north), `substrates/<transport>/` (relay, http), `seeds/` `core/` `events/` `views/` `.membrane/` — all earned by failures per `AGENTS.md` and CL `2026-09-03T18-45` (earn `seeds/` first on filesystem; NOSTR only on off-host or provenance collapse). Don't create until needed.

---

*Concepts:* `docs/concepts/epistemic-machine.md` (what a machine is), `docs/concepts/material-and-communication.md` (material axis, wrapping, Bell vs content).  
*Transport contract:* `.pi/skills/exchange-skill/SKILL.md`. *Example keep:* `experiments/mission-0-first-continuity-loop/.em/mission-0/ACCEPTED-CONSEQUENCE.json`.
