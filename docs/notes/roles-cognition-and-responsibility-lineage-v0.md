# Roles, Cognition, and Responsibility — Architectural Lineage v0

**Status:** architectural lineage / developmental hypotheses — not validated architecture, ontology, roadmap revision, build authorization, or a Continuity Lab conclusion

## Purpose and boundary

This note preserves distinctions developed in a human-provided design conversation about operators, workers, cognitors, delegated cognition, and responsibility. It records candidate boundaries for later testing without introducing role classes, an organism primitive, an authority model, or a cognitive runtime.

The conversation is conceptual evidence, not runtime evidence. Habitat-0 does not test these distinctions, and this note does not revise M01 or the adopted roadmap. A future explicitly authorized Server Fleet embodiment may provide the first real pressure against which they can be evaluated.

## Grounded starting points

Existing workshop records already establish adjacent cautions:

- An external actor may operate a machine without its transient cognition automatically becoming machine continuity: [`em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md).
- Identity, authority, and reachability answer different questions and need not share a representation: [`em-boundary-hypotheses-v0.md`](em-boundary-hypotheses-v0.md).
- Delivery, execution, attention, interpretation, adoption, and durable consequence must not silently collapse into one another: [`docs/architecture/provisional-architecture-v0.md`](../architecture/provisional-architecture-v0.md).
- Event, observation, interpretation, candidate stabilization, and accepted or revisable stabilization form a deferred review lens rather than an adopted pipeline: [`prior-art-agent-epistemic-capabilities-v0.md`](prior-art-agent-epistemic-capabilities-v0.md).
- M01 exercises a bounded request, explicit deterministic execution, result, and retained consequence. It does not establish cognition, authority, delegation, operator identity, or generic role semantics: [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](../missions/m01-habitat-0-first-runnable-internal-ecology.md).

## Relational roles

The useful roles in this thread describe responsibilities within a relationship, not intrinsic machine types:

```text
cognitor — contributes cognition
operator — exercises control over a machine's ongoing responsibility
worker   — carries a bounded delegated responsibility
```

One participant may therefore occupy different roles in different relationships:

```text
Machine X
  is operator relative to A
  is worker relative to B
  provides cognition relative to C
```

This does not imply `OperatorMachine`, `WorkerMachine`, or `CognitorMachine` entity classes. It also does not make a role merely episodic. An operator relationship may itself carry persistent responsibility and therefore may be embodied by a machine. In that case, its continuity concerns how another machine's ongoing responsibility is operated; it does not turn “operator” into an intrinsic identity.

A participant may retain local continuity while counterparties hold different relationship-specific descriptions, permissions, expectations, and routes for it. Those descriptions must not silently become its identity, authority, capability, or reputation.

## Attributed cognition

The central candidate invariant is:

> Delegated cognition is attributed input by default. Its receipt does not imply acceptance, and its acceptance does not imply decision. Stronger epistemic status must be explicitly established by protocol.

A prospective responsibility lineage is:

```text
observation
    ↓
attributed advice
    ↓
receiving interpretation
    ↓
decision or disposition
    ↓
action
    ↓
observed outcome
```

This is not a required event pipeline or storage schema. It names distinctions that a later specimen may need to reconstruct. In particular:

- generated text does not silently become what a machine knows;
- receiving advice is not accepting it;
- accepting advice is not necessarily deciding;
- deciding is not performing;
- performing does not establish the intended outcome; and
- an outcome does not retrospectively prove that the advice or decision was sound.

Each transition may eventually require provenance, but no universal provenance format is selected here.

## Advice and bounded cognitive work

Two interaction semantics remain usefully distinct:

```text
ADVICE
“I am contributing to your judgment.”

BOUNDED COGNITIVE WORK
“I am producing an artifact or result under this contract.”
```

Advice is offered to a receiving decision process and may be interpreted, accepted, rejected, verified, or deferred. Bounded cognitive work returns a contract-shaped result that can be validated and consumed or rejected.

Boundedness improves validation; it does not make a cognitive result epistemically neutral. A summary can distort, extraction can omit, and classification can impose an unsuitable category. The required epistemic treatment depends on how the result will subsequently be used, not merely on whether its output matches a declared shape.

## Responsibility without premature allocation

The effective actor in a concrete episode may be a composite of:

```text
machine + operator + cognition + tools + workers
```

This intuition does not establish an `organism` architectural primitive. At least three questions remain separate:

1. Who or what contributed to the action?
2. Which boundary owns or rejects the durable consequence?
3. Who or what was authorized to decide or act?

Provenance may help diagnose failure without mechanically settling accountability. Poor advice, incomplete observation, mistaken interpretation, unjustified acceptance, defective execution, or an unrelated outcome can each contribute differently while decision responsibility remains elsewhere.

## Reflection and proceduralization

Advice-to-decision transitions are promising retrospective points because they expose consequential judgment. Reflection need not be a permanent tutor, daemon, machine, or synchronous step. A later bounded operation could inspect retained contributions, dispositions, actions, and outcomes after the original work.

Repeated cognitive work may also become evidence for a **candidate** deterministic procedure:

```text
repeated cognitive work
    ↓
retained cases and outcomes
    ↓
candidate procedure
    ↓
explicit evaluation and adoption
    ↓
bounded deterministic behavior
```

Repetition or apparent success does not itself authorize proceduralization. A credible candidate would need its source cases, scope, known exceptions, proposed rule, comparison against later or held-out cases, a non-target regression check, an explicit adoption decision, and a way to revise or withdraw it.

## Disposition ledger

| Idea / distinction | Epistemic support | Project disposition | Revisit when |
|---|---|---|---|
| Operator, worker, and cognitor are relational roles rather than machine classes. | Developmental hypothesis | Retained | A real workflow requires one participant to occupy or change these roles across relationships. |
| An operator relationship may carry persistent responsibility and be embodied by a machine. | Developmental hypothesis | Retained | A persistent operator must reconstruct and continue how another machine's responsibility is controlled. |
| Delegated cognition is attributed input by default; receipt, acceptance, and decision remain distinct. | Developmental candidate invariant | Retained prominently | A real cognitive contribution affects a decision and the receiving boundary must reconstruct its disposition. |
| Advice and bounded cognitive work have different interaction semantics. | Developmental hypothesis | Retained | A workflow must distinguish contribution to judgment from delivery of a contract-shaped result. |
| Provenance lineage can separate observation, advice, interpretation, decision, action, and outcome. | Developmental hypothesis | Retained | Failure diagnosis or learning cannot be reconstructed from an undifferentiated transcript or result. |
| A composite organism is the architectural actor. | Conversation intuition | Unresolved | A specimen shows that existing machine, operator, and responsibility boundaries cannot intelligibly assign action or consequence. |
| Consequential cognitive transitions are useful reflection points. | Developmental hypothesis | Deferred | Real use retains an advice-to-decision episode whose outcome can be reviewed. |
| Repeated cognition can yield candidate deterministic procedures. | Developmental hypothesis | Deferred | Repeated comparable work provides cases, outcomes, and a testable bounded rule. |
| A responsibility or interaction graph should be a substrate. | Representation idea | Deferred as a derived projection | Ordinary retained records exist and graph inspection proves useful without dictating storage. |

## Explicit non-decisions

This lineage does not select or authorize intrinsic role classes, a role registry, generic delegation, operator identity, an authority system, capability vocabulary, event taxonomy, provenance schema, responsibility graph, reputation model, tutor agent, autonomous reflection, cognition-to-procedure compiler, or Server Fleet implementation.

Ship, pilot, captain, and crew remain explanatory metaphors rather than architecture vocabulary. “Organism” remains an unresolved way of describing composite action, not a new layer or component.

## Revisit condition

Evaluate these distinctions when a separately authorized Server Fleet or other real-work embodiment includes a machine doing consequential work through attributed cognition, operator control, or bounded delegation. The smallest useful test would preserve enough material to distinguish:

```text
bounded request
→ attributed cognitive contribution
→ explicit receiving disposition or decision
→ bounded action or result
→ retained consequence or observed outcome
```

The test should determine which distinctions survive use before promoting any shared mechanism. Success in Habitat-0 alone is not evidence for this lineage because Habitat-0 contains no cognitive contribution or operator-role protocol.

## Provenance

This note is a curated representation of a human-provided design conversation and its subsequent review. The review explicitly strengthened persistent operator responsibility, elevated attributed cognition as the central candidate invariant, retained advice versus bounded cognitive work, and left composite-organism allocation unresolved. The material was approved for catalogue inclusion while remaining outside current architecture, roadmap, and implementation authority.
