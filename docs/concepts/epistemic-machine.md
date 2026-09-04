# Epistemic Machine — Concepts & Principles

**Status:** stable conceptual baseline — workshop build phase · refs Mission 0 `b6b79eb` (Gates 1+2+3 ✓), `docs/notes/communication-layers-and-protocols.md` (parked north), CL `18:45` transport advice — conceptually stable; implementations (NOSTR north, future log, provenance, seeds) remain provisional

> Vision source (adapted): the project develops foundations for persistent epistemic machines that can live in different environments and compose recursively. This doc distills its habitat/membrane/machine/seed framing into workshop principles and explicit design choices.

---

## 1. What it is

An **Epistemic Machine** is a persistent entity with its own continuity and state, operating through a membrane. The process that operates it is ephemeral — a program, human, LLM, or collection — it can activate a machine, inspect and modify its state, speak to other machines, then disappear. **The process is ephemeral. The machine is persistent.**

It can live in different **habitats** via different **membranes** without changing what it is. It may contain an internal **ecology** of other machines. The same concepts apply recursively without a fixed hierarchy.

## 2. Core concepts

**Habitat** — the environment available to a machine. It provides resources and mechanisms (filesystem, relay, sqlite, http, …) but its implementation is not part of the machine.

**Membrane** — the interface between a machine and its habitat. It exposes the mechanisms available to the machine and adapts them to the habitat. A machine depends on a **membrane contract**, not a particular habitat implementation.

**Machine** — a persistent entity with its own continuity and state, operating through a membrane. Machine state outlives any operator.

**Operator** — ephemeral process that acts on a machine (pi session, delegate, human, agent). `D Kill → E Rebirth` proves this: operator disappears, machine remains.

**Seed** — description of how a machine can be instantiated in a compatible habitat. The repository can maintain seeds/specimens and the implementations to instantiate them.

**Ecology** — externally observable organization of machines interacting within a habitat. CL currently functions as an external epistemic participant in the ecology and provides the epistemic acceptance boundary (5-field `observation / proposed_interpretation / acceptance / reason / uncertainty`).

Habitat and ecology describe the same situated environment from different perspectives: habitat from the machine's perspective; ecology from the outside.

**Recursive composition:**

```
habitat → membrane → machine → habitat → membrane → machine → …
```

From the perspective of inner machines, their containing machine provides their habitat and exposes another membrane. `experiments/<mission>/.em/` today; later `machines/<name>/.em/` or nested ecologies — same pattern, no fixed hierarchy.

## 3. Principles

1. **Persistence vs process.** Machine state survives operator replacement. Proven by Kill→Rebirth, not asserted. `bd01c74` in a machine's own `.git` is the proof, not `inbox/` packets alone (bus observes *what happened*; `.em` proves *organism-owned* — CL joint review).
2. **Workshop ≠ machine.** The workshop (`git-tracked`) is the design surface. Machines (`gitignored`, own `.git`) are runtime instances. Don't theorize the Machine; build parts.
3. **Substrate independence.** A machine depends on a membrane contract, not a habitat implementation. Filesystem today (`inbox`/`outbox` symlinks) is simple and inspectable, but the model must not depend on it.
4. **Bus moves bytes, not procedure.** `inbox/`/`outbox/` delivery is transport only. What each side does with a packet is its own workflow (EM: `em observe` → proposal → critique → approve; CL: 5-field decision). Single-writer rule, no shared-writer race.
5. **Visibility boundary.** Bus mailboxes (`inbox/<peer>/` + `outbox/<peer>/`) are the **only** shared surface (`SKILL.md`). Even on same host, never read peer tree outside mailboxes — ask over bus (`question`/`belief-proposal`/`spec`).
6. **One language, many carriers.** There should be a transport-independent event/protocol language, and carriers should be replaceable. NOSTR is the current north for this layer — a concrete, existing semantic vocabulary (`kind`/`pubkey`/`tags`/`content`, unsigned for now) — not yet an implementation commitment. Pluggable carriers: files / http / relay. Detail in `docs/notes/communication-layers-and-protocols.md`.
7. **Provenance is eventually essential.** Unsigned now (no certs); `sig` added when provenance collapses without it (CL failure condition b: unsigned inbox mutation undetectable). Don't add crypto before failure.
8. **Build plumbing pragmatically; let epistemics stay epistemic.** Lab already earned `membrane0`/`seed-v0` via investigation — workshop reuses informed defaults, experiments use them as tests that raise complexity. Don't re-prove pressure per experiment; take notes on the way.

## 4. Layers (short — detail in notes)

Layers are relative and boundaries are determined by interfaces, not by fixed EM layers. From `docs/notes/communication-layers-and-protocols.md`:

- **Layer 1 — Transport protocol:** the semantic form of messages/events, independent of how they are transported. NOSTR is the current north for this layer, not yet an implementation commitment. Candidate vocabulary: `{ id, pubkey (= machine), kind, tags, content, sig? }`, `kind` maps bus `type` (`belief-proposal`/`decision-record`/`question`/`report`/`spec`). Declared now, implemented when earned.
- **Layer 2 — Transport:** how bytes move. Today `inbox/`/`outbox/` symlinks. Many substrates, same event semantics.
- **Layer 3 — Internal protocols:** protocols used inside a machine or ecology. Their form is determined by the responsibilities of that machine or ecology.

Don't confuse layers 1 and 2 — NOSTR is the protocol, relay is one transport. Concrete paths (`ACCEPTED-CONSEQUENCE.json`, `.em/log/<id>.json`, `events/`/`views/`, `.sessions/journal`, `.membrane/<exposed>/`) belong in §5/§6, not in the layer definitions.

## 5. Design choices we've made — and why

| Choice | Why |
|--------|-----|
| **No `.em` at root** (`df9a9b3`); many `experiments/<mission>/.em/` (own `.git`, gitignored, scoped) | Workshop is not a machine; many machines ⇒ many scoped instances, disposable per experiment |
| **`inbox`/`outbox` as transport state, not machine keep (write=deliver)** | The delivery endpoint is transport state, not machine-owned epistemic state. A packet survives Kill, but that does not make it part of the machine's continuity — only a curated copy in `.em` does. Simplest transport that survives Kill — proved for 1 loop (`verify-rebirth → 0`). |
| **`.sessions/journal` = host evidence, not machine keep** | Per `exchange/index.ts` — one JSON line per *received* packet per host; `inbox`-only, no machine ownership |
| **`.em/mission-0/ACCEPTED-CONSEQUENCE.json @ bd01c74`** | Sole machine-owned kept consequence so far; future many decisions would need `.em/log/<id>.json` — machine decides what to curate |
| **Filesystem first, stdlib JS + docstrings, no deps** | Inspectable, no `nostr-tools`/relay needed until off-host or provenance fails (CL `18:45`) |
| **`protocol/` `substrates/` `seeds/` `core/` = stable foundations, reused** | Lab pressure already known; experiments import them as tests instead of recreating per trial |
| **`docs/notes/` for parked norths** | Don't hide north in issues; make it reviewable without building |

## 6. Design choices we've parked — and when they'd be earned

| Parked | When earned |
|--------|-------------|
| **NOSTR unsigned `<id>.json` as north; `sig` later** | (b) unsigned inbox mutated + unverifiable provenance — needs crypto |
| **`events/` append-only + `views/` materialized filters (bus becomes a view)** | `inbox`/`outbox` insufficient: off-host or multi-machine filtering fails without centralized log |
| **`.membrane/<exposed>/` (folder-as-membrane, symlink to enter)** | Guest machine needs `invoke(action,args)` without knowing habitat layout (`membrane0` earned `invoke` for encapsulation) |
| **`seeds/base.json` → `experiments/<name>/.em/`** | Manual `mkdir + git init + cp` for 2nd machine diverges / duplicates pain |
| **`substrates/nostr/` relay transport** | (a) physical path destroyed (off-host, permissions prevent symlink) |

Until then: `inbox/` `outbox/` `.sessions/` `.em/mission-0/…` stay. `substrates/` `seeds/` `core/` `events/` `views/` remain empty/not created in the sense of "not populated with implementations" — folders may exist but hold no earned primitive.

## 7. What's not an EM — what the workshop is

- **Workshop** (`AGENTS.md` Roles/Layout, `README.md`, `docs/missions/`, `docs/notes/`, `docs/concepts/`) — design surface, versioned, many-machine capable.
- **Experiments** (`experiments/<mission>/`) — ephemeral trials/tests that *use* stable plumbing and raise complexity. Disposable.
- **Machine** — runtime state (filesystem realization today: scoped directory with own `.git`, e.g. `experiments/<mission>/.em/` or later `machines/<name>/.em/`, gitignored). Contains what the organism kept. The concept does not reduce to this directory arrangement — the membrane defines the realization.

Keep the conceptual definition of Machine in §2 clean; this section carries the current filesystem realization.

## 8. First mission boundary (from vision)

> Establish the minimum membrane and germination machinery required for a machine to live in an existing ecology. File-based communication is the first environmental implementation. Goal is not to generalize the whole architecture, but to establish the first clean boundary: **existing environment → membrane → persistent machine**. Everything beyond should emerge from subsequent experiments.

Mission 0 did exactly that: `existing environment (filesystem + symlinked bus) → membrane (inbox/outbox contract + .em own git) → persistent machine (ACCEPTED @ bd01c74)`. Next foundations build on that boundary.

---

*Related:* `docs/notes/communication-layers-and-protocols.md` (layers deep dive, north), `docs/missions/mission-0.md` + `mission-0-retrospective.md` (proof), `AGENTS.md` (workshop build phase), `.pi/skills/exchange-skill/SKILL.md` (bus contract).
