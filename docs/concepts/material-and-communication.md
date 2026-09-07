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

In this proposed model, materialization is a usable projection rather than the canonical storage itself. The workshop has not yet earned or implemented a general canonical-store/materialization split.

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

A **transport envelope** (for example, a NOSTR event) is a candidate optional outer representation when that transport is used. A future adapter might remove it at a machine boundary while preserving required provenance. In other cases an event might itself carry semantic material rather than merely wrapping it; neither behavior is selected or implemented.

## 7. Transport unwrapping and machine boundary

Candidate question map, not a current pipeline:

```
semantic document → [optional wrappers] → transport adapter → [transport envelope, e.g. NOSTR event] → transport → transport adapter → wrapped document → [optional unwrap] → semantic projection → availability signal → attention → interpretation → possible continuity consequence
```

A future transport adapter would remove transport-specific wrapping and deliver the **machine-level document** intact. For example, a NOSTR adapter might hide the NOSTR event at that boundary while retaining required provenance. The current bus has no general adapter that makes transports interchangeable; only the advisory workload demonstrated one bounded caller-facing projection over the filesystem bus.

A **semantic inbox is not transport**: it is the point at which incoming material has become available in a machine-local projection. The current workshop's top-level `inbox/<peer>/` is differently named: it is a transport mailbox. The advisory specimen's `advisory/in` is one workload-local semantic projection. A future canonical store may retain transport provenance while exposing an envelope-free working document, but that store/unwrap path is not built.

## 8. Events, identity, provenance

A future event/document may carry `id`, `pubkey`, `kind`, `tags`, `content`, or a signature. Candidate machine identity would need to survive embodiment changes rather than collapse into one process, socket, or pubkey. A handshake might establish a communication membrane between ecologies. None of global identity, handshake, or transport-independent envelope semantics is implemented or earned.

A future canonical representation may retain transport provenance without retaining the transport envelope as its working form. The current bus packet itself remains the durable received record.

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

One candidate operational interface uses **text as representation + interface + human-readable record**. A future adapter might hide whether that text becomes a function call, file creation, event, or database transaction. Text is a practical common representation for current experiments, and a filesystem-like interface is one tested bounded realization; neither is established as the universal operational protocol.

The membrane exposes an **operational interface to its environment**; representations available to an operator (text, files, API calls, signals) are realizations of it — none is the machine's ontology.

## 11. Where Store / Oracle fit

**Store** (preserve canonical material) and **Oracle** (interpret canonical material and expose an operational representation) are **possible implementation roles**, not part of the fundamental definitions in `epistemic-machine.md`. They can be revisited experimentally when the filesystem implementation needs them. For this reason `Oracle` does not appear in the machine ontology — its need is rediscovered when materialization demands it.

---

*Provisional realization notes:* `docs/protocols/filesystem.md` — current bounded filesystem observations plus parked hypotheses about transport mailboxes, experiment-local `.em` state, and projections.

*Possible north:* NOSTR as one candidate envelope/transport realization, to be implemented only under a future authorized brief.
