# Communication Layers & Protocols — note

**Status:** note, not spec — parked north for "many machines, many substrates" · 2026-09-03 · not built yet

CL `2026-09-03T18-45-transport-evolution-response.md` says: earn `seeds/` first on filesystem bus; NOSTR only when (a) off-host symlink fails or (b) unsigned inbox provenance collapses.

---

## 1. Transport-protocol layer (NOSTR — north, not code)

Event semantics — one simple language for interoperable machines.

- One event = one JSON `<id>.json`: `{ id, pubkey (= machine), kind, tags, content, sig? }`
- `kind` maps current bus `type`: `belief-proposal` / `decision-record` (5-field) / `question` / `report` / `spec`
- Unsigned for now (no certs) — `sig` added when provenance failure earns it; we know from lab provenance is eventually essential
- North = define the language now, implement later

## 2. Transport layer (how bytes move)

How an event is delivered — many substrates, same protocol.

- **Now:** `inbox/<peer>/` + `outbox/<peer>/` symlinks — write file = deliver. Single-writer rule (`SKILL.md`). Works because same host.
- **Future:** `files` (current) / `http` / `nostr relay` / `sqlite` — same `events/` log, different carrier
- Transport is pluggable; protocol stays stable

Not to confuse with layer 1 — NOSTR is the *protocol*; relay is one *transport* for it (filesystem is another).

## 3. EM internal / ecology protocols (what an ecology chooses to adopt)

What a given machine/ecology decides to keep and how it interprets.

- **Today:** `ACCEPTED-CONSEQUENCE.json @ bd01c74` (single kept consequence) + `5-field decision record` shape + `.sessions/exchange-journal.jsonl` (host-local evidence per `exchange/index.ts` — one line per received packet, *not* machine-owned)
- **Gap:** `.sessions/*` as index is host evidence, not machine state. `inbox/outbox` are ephemeral delivery. A machine needs **one place it decides to keep** — received + sent events it curates. That's not `.sessions`, not inbox.
- **North sketch (not built):** `events/` (append-only log, one file per event) + `views/inbox/<peer>/` `views/outbox/<peer>/` `views/timeline/` (materialized filters of `events/` by pubkey/kind/recipient — bus becomes a *view*) + `.membrane/<exposed>/` (filesystem convention: a folder a peer symlinks to "enter" — membrane's exposed membrane as a directory)
- **And its own keep:** `.em/log/<id>.json` or `.em/events/` — the machine's curated log it decided to keep, survives Kill→Rebirth (today just `mission-0/ACCEPTED-CONSEQUENCE.json`; for many decisions we need a log)

An ecology can adopt or reject any of these — but if machines are to be interoperable, they need the same layer-1 language.

## Project structure mapping (when earned)

```
docs/notes/communication-layers-and-protocols.md  ← you are here (note)
docs/protocol/nostr-north.md                      ← later: layer 1 formal north (not yet)
substrates/<transport>/                           ← later: layer 2 (filesystem, nostr relay …)
seeds/ core/ membrane/                            ← later: layer 3 — earned from seed/membrane failures
events/ views/ .membrane/                         ← later: layer 2+3 materialized — only when filesystem bus fails
```

Until a failure earns it: `inbox/` `outbox/` `.sessions/` `.em/mission-0/…` stay as-is. `substrates/ seeds/ core/ events/ views/` remain reserved per `AGENTS.md`.

---

*One line if we forget:* many machines want one language (NOSTR north, layer 1), many transports (layer 2), each ecology chooses what its machine keeps (layer 3 = `.em/log` vs `.sessions` vs `views`). Don't build until Kill→Rebirth or off-host proves the current bus insufficient.
