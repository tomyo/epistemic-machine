# Distributed Revisions and Reachability — Curation v0

**Status:** curated design lineage — neither an architecture revision, implementation authorization, nor a selection of distributed technology

## Source and purpose

This record curates a human-provided architecture conversation spanning SSH/browser gateways, JavaScript signals, Git-like revisions, content-addressed storage, CRDTs, virtual mounts, identity/authority, dynamic reachability, and peer communication. It retains only the pressures that remain useful after Habitat-0 was selected as the proposed first local embodiment.

The conversation's product stacks and performance claims are **not** adopted technical findings. Browser SSH, IPFS/libp2p/Helia, Yjs/Automerge, UCANs, DIDs, FUSE/ZenFS, and a global gossip mesh require separate source verification and an authorized use before they could shape an EM realization.

## Already captured

| Conversation pressure | Current disposition / record |
|---|---|
| A persistent resource revision and a session/work context that refers to it have different semantics. | [`resource-session-working-views-lineage-v0.md`](resource-session-working-views-lineage-v0.md) and S05 distinguish resource/revision from a working view; S05 established only fresh-process reconstruction of simple records, not a session runtime. |
| Transport delivery is not execution, materialization, attention, or durable consequence. | [`em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md), S03, and the provisional architecture keep these responsibilities separate. |
| Identity, authority, and reachability must not collapse into one label. | The embodiment map and boundary hypotheses retain this as a distinction; M01 deliberately has generated local identities only. |
| A host may materialize a machine's retained material in several ways. | [`docs/concepts/epistemic-machine.md`](../concepts/epistemic-machine.md) treats substrate/host realization separately from the machine and membrane. |

## Refinement retained

### Revision versus grouped change

The useful duality is not a required two-DAG architecture. A durable resource can have a revision history, while a working context or future session-level record can refer to a particular revision as part of a broader consequential change. A revision may therefore matter outside the context that created it, and one grouped change may refer to several resources.

Git provides an intelligible comparison but not a ready EM design: its commit graph is repository-wide, and path history is a derived view of commits rather than an independent per-file authority. M01 does not need Git, hashes, a content-addressed store, per-file subscriptions, or a merge model.

**Revisit when:** a real Habitat-0 workflow needs one retained resource revision to be referenced coherently by more than one independent working context, or needs to distinguish concurrent revisions rather than merely retain an ordinary result.

### Communication versus durable state

A delivered message, availability hint, direct request, and retained record need not be the same object or use the same mechanism. Ephemeral communication can advertise or request durable material without becoming that material. Conversely, a filesystem record may provide a durable message-like representation without establishing an always-on communication channel.

This sharpens—not replaces—the existing `representation → envelope → transport → materialization` distinction. It rejects both shortcuts: “all communication is files” and “a transport event is automatically a machine event.”

**Revisit when:** explicit M01 activation proves insufficient because a resident needs timely awareness of another resident's declared change, rather than because an implementation is merely inconvenient.

### Dynamic reachability is a separate fact

A machine's current route, relay, peer visibility, or online status can change without changing its identity or any actor's authority. A future external ecology may need to represent such availability as provisional and staleable; it must not infer trust, permission, delivery, attention, or successful execution from reachability alone.

**Revisit when:** a machine must cross Habitat-0's local boundary and actual intermittent delivery creates a failure that cannot be classified as an ordinary transport defect.

## Superseded or deferred

| Conversation proposal | Disposition and rationale |
|---|---|
| A four/five-layer universal stack: VFS, CRDT index, CAS/IPFS, transport mesh, identity/UCAN. | Deferred. It selects mechanisms and boundaries before a real local embodiment demonstrates a need. |
| CRDTs as the default conflict answer. | Deferred. Infrequent concurrent changes may instead require explicit branching, a domain rule, or no merge at all; no conflict policy has been earned. |
| Filesystem mounts, browser OPFS, FUSE, or a shared virtual filesystem as the machine interface. | Deferred host realization. A materialized projection is not yet an EM membrane or a reason to construct a VFS. |
| Global/public-key identity, UCAN delegation, encrypted block sharing, trust graph, and dynamic gossip discovery. | Deferred. M01 expressly excludes global identity, authority, external transport, discovery, and generic capabilities. |
| Wakeups/subscriptions as a default machine behavior. | Deferred. Availability is not attention; M01 uses explicit activation and must show real relevance pressure first. |
| Treating JavaScript signals as distributed state. | Rejected as an architectural inference. Signals are local reactive dependency machinery; a networked replica protocol still requires independent delivery, ordering/concurrency, authorization, and disposition decisions. |

## Technical cautions

- A browser cannot originate raw TCP SSH. A browser terminal needs a server/relay or another TCP-capable bridge, and that bridge is an authority/audit/security boundary—not merely byte forwarding.
- Content-addressing identifies bytes; it does not supply resource identity, authority, semantics, subscriptions, or a merge decision.
- Cryptographic signatures can establish control of a key and provenance of a signed assertion. They do not independently establish social identity, trustworthiness, authorization policy, confidentiality, availability, or correct execution.
- CRDT convergence avoids some coordination, but it is not a general semantic merge, revocation model, or answer to conflicting claims.

## Lesson

The conversation is valuable because it makes several **future discriminators** concrete: revision versus grouped consequence, durable material versus communication, and identity/authority/reachability versus host route. Its proposed stack is deliberately not retained as a blueprint. Habitat-0 should first make one local machine/ecology loop real and let use determine whether any of those distinctions need a particular mechanism.

## Related records

- [`docs/architecture/provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md)
- [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](../missions/m01-habitat-0-first-runnable-internal-ecology.md)
- [`resource-session-working-views-lineage-v0.md`](resource-session-working-views-lineage-v0.md)
- [`em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md)
- [`embodiment-conversation-1-curation-v0.md`](embodiment-conversation-1-curation-v0.md)
