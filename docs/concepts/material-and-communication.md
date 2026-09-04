# Material and Communication — Concepts

**Status:** provisional — source-local workshop proposal — complements `epistemic-machine.md` (what a machine *is*) with what *passes between things* · not CL-adopted · not evidence for Seed/Store/canonical/views/internal ecology/NOSTR/transport · per CL boundary review `2026-09-04T16-13-30` · not an implementation spec

This document defines the second conceptual family as a **working model**, not an ontological stack: **material → representation → envelope → transport → materialization**. NOSTR, Markdown, filesystem, Bell, and wrapping belong here — not in the machine ontology. Some cases cross categories — e.g. text can simultaneously be material, representation, protocol, human-readable record, and operator instruction — so treat the axis as `material may acquire representations, representations may be packaged for transport, transport may cross boundaries, received material may be materialized` rather than a strict hierarchy. **NOSTR is not what makes a thing an EM** — it is one possible mechanism by which a representation travels between machines.

---

## 1. Semantic material

Meaningful to a machine: `observation`, `question`, `proposal`, `report`, `decision`, `belief`, `request`, `instruction`, `delegation`, `evidence`, …

Material is semantic, not syntactic. It can be represented as text.

## 2. Representation

How material is expressed: Markdown, JSON, NOSTR event, plain text, future binary. Representation is chosen per context; material stays the same.

## 3. Envelope

How a representation is packaged for transport. A NOSTR event can be an **envelope/transport representation** without NOSTR becoming the ontology of an Epistemic Machine (conclusion of the NOSTR investigation).

Envelope may include routing/identity metadata (e.g. `pubkey`, `kind`, `tags`) without changing the inner material.

## 4. Transport

How material gets from A to B: filesystem, HTTP, NOSTR relay, Unix socket, pipe, human copy/paste, internal process channel, etc. Transport is a property of the *connection between ecologies*, not of the organisms using it — `machine → internal transport → machine` and `machine → external transport → machine` can expose the same abstraction.

## 5. Materialization

How material becomes available to a machine/operator in a form it can work with: a filesystem view, an inbox projection, a symlink, a rendered document, a query result.

Materialization is not storage — it is a projection of canonical material into a usable form.

## 6. Document and wrapping (onion) — implementation model

A **document** is a portable semantic artifact (frontmatter = semantic metadata at that layer + body = payload).

A **wrapper** is a useful implementation model (not an EM axiom) that adds a semantic layer around another document without modifying the payload:

```
type: delegation        ← outer layer
to: machine-b
---
  type: observation     ← inner layer
  ---
    actual observation
```

Frontmatter is the metadata layer for the communication at that level. Because payload is itself a complete document, wrapping can recurse (`review → delegation → observation → evidence`). Receiver unwraps only to the layer it understands — inner structure stays intact.

A **transport envelope** (e.g. NOSTR event) is optional and outermost — only when that transport is used. It wraps the machine-level document and disappears at the adapter boundary. In some situations a NOSTR event may itself carry semantic material rather than merely being an envelope — the model stays flexible.

## 7. Transport unwrapping and machine boundary

Full path:

```
semantic document → [optional wrappers] → transport adapter → [transport envelope, e.g. NOSTR event] → transport → transport adapter → wrapped document → [optional unwrap] → semantic document → INBOX → Bell → Attention → interpretation → continuity
```

The transport adapter removes transport-specific wrapping and delivers the **machine-level document** intact. If NOSTR was used, the NOSTR event disappears at that boundary — what arrives is no longer "a NOSTR event" but an EM communication/document. The machine does not need to know whether it arrived via NOSTR, filesystem, HTTP, or local channel.

**Inbox is not transport.** It is the point at which an incoming communication has become part of a machine's local world (machine-local projection after unwrap). Canonical store may retain provenance (`received via NOSTR event X`) while the working document is envelope-free.

## 8. Events, identity, provenance

An event/document may carry `id`, `pubkey (= machine)`, `kind` (maps bus `type`), `tags`, `content`, `sig?`. Identity is substrate-independent — not "the process on this socket" nor "this pubkey", but an identity that survives changes in embodiment. Handshake between machines (`ecology A ⇄ ecology B`) establishes a communication membrane between ecologies using whatever transport implements it.

Provenance is retained canonically; the transport envelope's identity material can be preserved as provenance without remaining as the working representation.

## 9. Notification (Bell) vs content

**Bell** is a change signal ("something in the membrane changed — message received/sent"), **not content**. Attention is what the machine/operator does with it — attention is a dimension of activity across the ecology, not a layer. Bell does not carry the document; it signals to re-examine materialization.

## 10. Text protocol hypothesis

> The semantic interface of a machine can be represented independently of the mechanism that carries or materializes it.

Stronger:

> **A machine's interface may itself be representable as material.**

Then an operator does not need a pre-installed understanding of the machine's API. It can encounter, read, interpret, generate, inspect, transport, record, and delegate interface operations **using the same representational medium** as other material:

```
REQUEST  Review the evidence concerning X.
PROPOSE  Retain this observation because …
DELEGATE Ask machine Y to investigate X.
ACCEPT   …
```

The operator interacts through the membrane via **text that is simultaneously representation + interface + protocol + human-readable record**. The operator does not need to know whether that text becomes a function call, file creation, NOSTR event, or DB transaction. Text is the lowest common representation of the operational interface; a filesystem-like interface is one realization of it.

The membrane exposes an **operational interface to its environment**; representations available to an operator (text, files, API calls, signals) are realizations of it — none is the machine's ontology.

## 11. Where Store / Oracle fit

**Store** (preserve canonical material) and **Oracle** (interpret canonical material and expose an operational representation) are **possible implementation roles**, not part of the fundamental definitions in `epistemic-machine.md`. They can be revisited experimentally when the filesystem implementation needs them. For this reason `Oracle` does not appear in the machine ontology — its need is rediscovered when materialization demands it.

---

*Realization:* `docs/protocols/filesystem.md` — how this experiment maps the above to a filesystem (`inbox/outbox` as transport materialization, `.em` as continuity, `views` as projections).  
*North:* NOSTR as one possible envelope/transport realization of this axis — defined here, implemented there.
