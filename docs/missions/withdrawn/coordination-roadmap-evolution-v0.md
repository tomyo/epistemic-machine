# Coordination Roadmap Evolution v0 (Withdrawn)

Status: withdrawn before execution; no evidence produced
Owner: Epistemic Machine workshop  
Participant: Continuity Lab  
Activation authority: none; this brief was never adopted or authorized

## Withdrawal

This candidate brief is retained as historical design context. Its prerequisite orientation brief was never adopted or run, no execution occurred, and it does not select a future mission or experiment. A future roadmap-evolution study requires a new human-selected brief.

## Question

Can one meaningful roadmap change preserve the distinctions among proposal, propagation, receipt, adoption, materialization, and reconstruction across EM and CL without shared writes, silent overwrite, or authority drift?

This tests a protocol local to one roadmap. It does not assume that artifact lineage, events, Git, or the protocol generalize to other material.

## Historical Preconditions

Before activation, this withdrawn proposal would have required:

- Experiment A has a completed evidence package and review;
- the human has decided that roadmap evolution is worth testing;
- an execution specification freezes the baseline roadmap bytes, participant roles, allowed bus paths, the selected or control revision representation, comparison, checks, and stop conditions;
- EM remains the roadmap owner and publisher;
- the human remains coordination-head adopter;
- CL remains an advisory participant, not a co-writer of EM source.

## Candidate treatment options — not selected

Before selecting any added representation, the execution specification must cite evidence that a plain reviewed Markdown update plus ordinary bus advisory loses a distinction relevant to this roadmap workload. Only then may the human approve the minimum necessary subset of these options:

- one protocol-local artifact name, `machine-ecology-roadmap`;
- immutable full Markdown snapshots rather than diffs;
- a content digest that identifies content only, not a proposal occurrence or its provenance;
- an optional parent-content digest describing the proposed predecessor;
- proposer and disposition fields whose values are descriptive, not authorization tokens;
- the existing filesystem/symlink bus as the only transport;
- an EM-owned local projection of the human-adopted coordination head.

Existing packet and decision records, not the content digest, would need to distinguish provenance when identical bytes occur in different proposals. Arrival makes a proposal available; it does not imply interpretation, adoption, implementation, or cognition.

## Candidate sequence

### B1 — One proposal and adoption cycle

1. Freeze an adopted baseline revision and the minimum representation selected by the execution specification; if no added representation is selected, use the plain Markdown/bus control.
2. CL publishes one advisory proposal without editing EM source.
3. EM receives and verifies the proposal but does not auto-adopt it.
4. The human accepts, rejects, or requests revision.
5. If accepted, EM records the decision using only the selected representation; no full snapshot or digest is presumed.
6. Fresh source-local operators reconstruct the adopted head, proposal provenance, and authority boundary.
7. Stop for review.

### B2 — Divergence and reconnection

B2 requires an additional activation decision after B1 review. Two proposals from the same parent are retained; neither is silently overwritten or auto-merged. A propagation pause and reconnection may then test recovery. No merge algorithm is assumed; the human may select one proposal, reject both, or create a reconciled successor.

## Control and observations

The execution specification must identify a simpler control, such as the current reviewed Markdown update and ordinary bus advisory, and cite observed evidence for the relevant distinction it fails to preserve before adding lineage machinery. If no such loss is observed, stop and use the control.

Preserve observations of:

- exact material bytes and any selected content identifiers;
- parent/proposer/disposition claims;
- publication, receipt, review, adoption, and materialization times as separate records when observable;
- attempts at overwrite, auto-adoption, or metadata-based authority;
- reconstruction by fresh operators;
- divergence and recovery only if B2 is authorized;
- implementation size and additional persistent state.

## Success and limits

A bounded success requires that the adopted roadmap, rejected or pending proposals, and their authority states remain reconstructible without peer-tree access or shared writes. If provenance continuity is claimed, existing packet/decision records must distinguish proposal occurrences that carry identical content; a content digest alone cannot do so.

A success would support only this roadmap evolution contract under one transport. It would not establish a global identity scheme, general lineage DAG, event sourcing, merge semantics, revocation, transport replaceability, or a reusable machine primitive.

## Stop conditions

Stop if:

- receipt changes the coordination head automatically;
- packet metadata is treated as authority;
- CL edits EM source directly;
- a proposal or branch is silently overwritten;
- the roadmap contains experiment evidence or apparatus;
- the implementation requires a registry, daemon, watcher, scheduler, merge engine, generic event store, or new transport;
- B2 begins before B1 review and separate activation.

## Historical activation gate

The withdrawn proposal required a human approval naming an execution specification, observed control insufficiency, minimum treatment, and B1 authorization. None occurred.

## Not authorized or implemented

No proposal packet, revision store, lineage graph, event schema, diff/patch format, adoption command, watcher, Git-backed realizer, shared writable roadmap, or `.em/` change is created by this brief.
