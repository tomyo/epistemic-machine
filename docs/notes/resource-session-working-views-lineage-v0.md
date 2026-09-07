# Resource, Session, and Working Views — Architectural Lineage v0

**Status:** architectural lineage / EM working hypotheses — not ontology or normative architecture, not a Continuity Lab conclusion, and **not a build authorization**

**Purpose:** preserve the reasoning that survived recent EM design conversations so future work can begin from its distinctions, pressures, lessons, and open discriminator rather than reconstructing them from transcripts.

## Grounded starting points

This thread starts from bounded repository evidence, not a selected runtime architecture:

- Mission 0 showed one experiment-local curated consequence surviving an operator replacement. It did not establish a reusable session, revision, or machine substrate: [`docs/missions/mission-0.md`](../missions/mission-0.md).
- The advisory specimen showed one workload-local projection hiding file-bus topology while keeping arrival as availability only; it did not establish a general semantic interface: [`advisory-boundary-contract-v0.md`](advisory-boundary-contract-v0.md).
- The exchange extension watches a project mailbox per open Pi process. Each process has its own `SEEN` set and can surface the same arrival into its own session: [`.pi/extensions/exchange/index.ts`](../../.pi/extensions/exchange/index.ts). This is an observed notification-noise pressure, not evidence that a router or session machine is required.

## Current distinctions

The thread retains these distinctions because collapsing them hides different questions:

```text
resource        — the logical thing under discussion
revision        — exact material state of that resource
working view    — bounded representation given to an active work context
session         — bounded work context that may outlive one operator episode
operator        — ephemeral process, person, or model doing work now
mediator        — an optional operational boundary around a resource or interaction
machine         — a candidate persistent continuity-bearing boundary
```

Likewise:

```text
material exists → available → noticed/attended → interpreted
  → candidate consequence → explicitly selected successor
```

A content digest may identify exact bytes, but does not alone identify a proposal occurrence, producer, rationale, authority, or adoption decision. A reference to a revision and a reference to a mediator endpoint are therefore candidate different relationships; neither a global identity scheme nor a resolver is selected.

## Working picture

A modest possible lifecycle is:

```text
resource at R0
  ├─ session A gets an isolated working view → candidate R1a
  └─ session B gets an isolated working view → candidate R1b

later operator/reflection
  → reconstruct R0, R1a, R1b, and their declared context
  → explicitly select, reject, or reconcile a successor
```

The important claim is not that Git, events, or a machine performs this. It is that useful continuity may reside in retained material and records rather than in a continuously active cognitive process.

A session is currently a candidate **durable record**, not automatically a machine. An operator episode may end while a session remains waiting for external confirmation, retains a candidate, or needs later review. That alone does not establish independent session identity, membrane, authority, transport, or an autonomous runtime.

## Disposition ledger

| Idea / distinction | Epistemic support | Project disposition | Lesson / rationale | Revisit when |
|---|---|---|---|---|
| Resource ≠ revision ≠ working view ≠ mediator | Working hypothesis | Retained | Separating logical thing, exact bytes, active representation, and operational endpoint prevents one identifier from carrying incompatible meanings. | A bounded specimen shows a distinction unnecessary or incomplete. |
| Two working views may leave sibling candidates from one base | Candidate discriminator | Test next candidate | Parallel work is the first concrete pressure for retained divergence without overwrite. | A human selects a bounded specimen after reviewing this thread. |
| Session can outlive an operator episode as a durable record | Working hypothesis | Retained | Waiting work and retained candidates can remain meaningful after the active process exits. | Reconstruction shows that plain retained records are insufficient. |
| Every session is a machine | Unknown | Deferred | Do not add identity, membrane, lifecycle, and authority before a session needs an independent boundary. | A session must independently expose, govern, or continue meaningful state. |
| Project watcher causes unrelated session wakeups | Observed | Retained pressure | **Project mailbox ≠ session relevance.** The current watcher does not model durable work contexts. | Durable session distinction is first demonstrated; then assess targeted attention. |
| Session-interest projection or router | Working hypothesis | Deferred | It may address notification noise, but routing, subscriptions, and delivery semantics are extra machinery. | Project-wide arrival noise is shown unacceptable after a session-record control. |
| Every resource is a machine / default file machine | Unknown | Rejected for scope | Editing alone does not earn a continuity-bearing boundary. | Plain resource handling cannot preserve required continuity, authority, or coordination. |
| Git-backed resource realization | Working hypothesis | Deferred | Git may realize revisions, branches, and comparison; it is not EM ontology or epistemic reconciliation. | A plain resource contract is tested and a second realization is needed. |
| General event store or event sourcing | Unknown | Rejected for scope | Naming events selects unearned semantics for identity, ordering, replay, replication, and authority. | Existing records leave a concrete reconstruction or propagation ambiguity. |
| Blueprint schema / builder machine | Unknown | Deferred | A hand-authored specimen manifest is cheaper; extract a reusable blueprint only after recurring fields appear. | Multiple authorized specimens converge on the same declarations. |

## Current pressures, kept separate

### Parallel candidate work

Can independent sessions begin from the same material and retain non-destructive, reconstructible candidates after their operators disappear? This is a resource/revision/working-view question.

### Session-scoped attention

Can a durable work context be distinguished from unrelated open processes when new material appears? This is an availability/attention question. The current watcher gives it real operational pressure, but it must not be conflated with parallel revision handling.

## Near-term discriminator

The likely next specimen is **Parallel Working Views v0**, but this note does not create or authorize it. A plain-files control would use only explicit records and temporary working directories:

```text
R0
├─ session A: working view → R1a; state = waiting
└─ session B: working view → R1b; state = done

fresh operator → reconstruct → inspect → explicitly select, reject, or reconcile
```

The discriminator is whether a fresh operator can recover the base, both exact candidates, their declared parents/session context, and any explicitly selected state without silent overwrite or automatic integration. If ordinary files do that cleanly, no specialized mediator, Git, router, or event representation is earned.

## Explicit non-decisions

This lineage does not select or authorize: global resource/session/machine identity; a universal reference resolver; a fixed machine hierarchy; a session-machine rule; a persistent mediator by default; Git or Git worktrees; an event schema/store; merge or synchronization machinery; notification routing; a daemon; virtual filesystem; automatic integration; a canonical store; a blueprint format; or a builder machine.

Machine level remains a relational question rather than a fixed stack. A mechanism may be an ephemeral adapter in one workload and earn a persistent machine boundary in another only when continuity, authority, isolation, or coordination pressure makes that boundary meaningful.

## Relationship to the roadmap and CL

The candidate coordination roadmap remains unchanged and does not adopt this lineage. A conversation may reveal a reason to revise a mission or roadmap, but any such revision requires an explicit human decision. This note is EM design memory; an authorized run may later produce observations for Continuity Lab interpretation.

## Provenance

This is a curated representation of recent non-repository EM design conversations concerning resource mediation, sessions, parallel working views, notification relevance, Git as a possible realization, and event-like records. Those conversations are exploratory source material, not independently auditable evidence. Repository-grounded sources are linked above; Git history preserves subsequent revisions of this synthesis.
