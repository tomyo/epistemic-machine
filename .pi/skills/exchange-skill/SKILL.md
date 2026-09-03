---
name: exchange-skill
description: Operating manual for the Epistemic Machine ⇄ Continuity Lab File Bus — how packets are named, written, and delivered through symlinked mailboxes, for any project participating in the bus.
---

# Exchange Bus Protocol

The generic contract for the inter-repo File Bus between **Epistemic Machine** and **Continuity Lab**. This is the protocol — not a per-project workflow. It describes the _transport only_; what each project does with a received packet is that project's own responsibility.

## Model

Two peer projects exchange **packets** (markdown files) through symlinked mailboxes. **Writing a file = delivering it.** No daemon, no polling, no server.

```
repo-a/                          repo-b/
├── inbox/                       ├── inbox/
│   └── repo-b/  ← B writes      │   └── repo-a/  ← A writes
└── outbox/                      └── outbox/
    └── repo-b → B/inbox/A          └── repo-a → A/inbox/B   (symink)
```

## Single-writer rule (the one hard rule)

In repo A, `outbox/B` is a symlink to `../B/inbox/A`. Each side writes **only into the directory named after itself**, inside the peer's tree. Each mailbox dir has exactly one writer → no shared-writer race, no lock. Symlinks are machine-local and one-time manual wiring (not scripts, not tracked).

## Visibility boundary (what each side can see)

Each peer owns its repository privately. **The only shared surface is the bus mailboxes** — `inbox/<peer>/` (what you receive) and `outbox/<peer>/` (what you send, a symlink to the peer's `inbox/<you>`). No peer has read access to the other's source tree, artifacts, `.em/`, or any other file except what the other explicitly sends as a packet.

Even when both repos live on the same host for development (so a filesystem `read` is technically possible via the symlink target), **agents MUST NOT read the peer's files outside `inbox/`/`outbox/` to fill gaps**. If you need information about the peer's state, ask for it over the bus with a typed packet (`question`/`belief-proposal`/`spec`); the peer decides what to share per its own workflow. Bypassing the bus hides the continuity pressure the bus is meant to expose: *what must be communicated to bridge a discontinuity?*

Local diagnostic inspection of the peer tree by a human maintainer is a separate, out-of-band activity — it is not part of the agent/bus protocol and must not be used to auto-answer for the peer.

## Filename convention

```
<yyyy-mm-ddThh-mm-ss>-<slug>.md
```

- **Datetime** = chronological order (journal/listing sorts naturally, no shared counter).
- **Slug** = short dash-case human label (what the packet is about).

Example: `2026-09-02T15-43-07-hello-world.md`

The extension strips the datetime prefix for the toast / LLM arrival message, showing just the slug.

## Packet anatomy

```markdown
---
source: <sender-repo-name> # e.g. epistemic-machine | continuity-lab
date: 2026-09-02
type: observation | tension | question | belief-proposal | spec
sha256: <optional integrity hash>
revision: 1
---

<excerpt / summary>

<body: the actual content>
```

- `source:` is the sender repo name — identifies the writer (filename's datetime handles ordering).
- `type:` classification is advisory; projects may interpret types their own way.
- `sha256` and `revision` are optional; include `sha256` for content integrity.

## How to send / receive

- **Send:** write a `.md` with the frontmatter above into `outbox/<peer>/`. The single write is delivery. Filename per the convention above.
- **Receive:** a packet appears in `inbox/<peer>/`. The extension toasts the human and surfaces an LLM arrival message with the path.
- **Journal:** each side keeps its own `.sessions/exchange-journal.jsonl` (one JSON line per received packet: `{ ts, peer, file, size }`).

## Out of scope

The bus **moves bytes, not procedure**. It does **not** prescribe what either project does with a packet — that is each project's own workflow:

- EM uses its machine-operation chain (`em observe` → proposal → human critique → `em approve`).
- CL uses its own lab protocols.

The bus does not read, digest, or interpret packets; the extension only notifies and journals.
