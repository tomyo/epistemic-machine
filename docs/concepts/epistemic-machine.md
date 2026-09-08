# Epistemic Machine — Concepts & Principles

**Status:** provisional concept record — source-local workshop proposal · not CL-adopted · not final ontology or implementation specification. Current embodiment guidance is in [`docs/architecture/`](../architecture/README.md); authorized M01 does not make these terms required primitives.

All terms below are candidate vocabulary and working hypotheses, not proven invariants or implementation requirements.

> Vision source (adapted): foundations for persistent epistemic machines that can live in different environments and compose recursively.

This document proposes **what a machine might be**. Storage, transport, and implementation questions are separated into `material-and-communication.md` and provisional `protocols/filesystem.md` notes.

---

## 1. What it is

An **Epistemic Machine** is a persistent, continuity-bearing entity with a sovereign region and a membrane, participating in an ecology. The process that operates it (program, human, LLM, collective) is ephemeral — it can activate a machine, inspect and modify its continuity, speak to other machines, then disappear. **The process is ephemeral. The machine is persistent.**

Its substrate is not part of its definition. A machine exists *on/in* something; it does not own its substrate.

## 2. Core concepts

**Machine** — candidate continuity-bearing entity with a region/place, a boundary/membrane, the capacity to receive and produce things, to be operated, and to relate to other machines. Whether identity is substrate-independent, and whether any handshake is required between machines, remain open questions.

**Persistence and continuity** — proposed distinction in which relevant machine state outlives an operator. Mission M00 tested one bounded Kill→Rebirth case; broader continuity must be tested rather than inferred.

**Sovereign region** — proposed bounded place within a substrate over which a machine has authority sufficient to maintain continuity and distinguish its state from the environment. A candidate invariant would be that authority/boundary rather than a directory or database mechanism; this remains a hypothesis.

**Membrane** — the relationship between machine and environment. Answers: what can enter/leave, how it is represented, how operations are requested, how capabilities are exposed, how effects are acknowledged. Membrane is not filesystem, not NOSTR, not an API — it could be text, files, messages, signals, or combinations. See `material-and-communication.md` for the `representation → envelope → transport → materialization` axis that crosses it.

**Operator** — ephemeral participant that acts on a candidate machine (pi session, delegate, human, agent). Mission M00 supplies one bounded example in which an operator disappeared while experiment-local state remained.

**Environment / habitat** — everything the machine relates to outside its sovereign region: other machines, operators, humans, transport systems, physical reality. From the machine's perspective, this is its **habitat**.

**Ecology** — from the outside, the interacting population (machines, operators, environment) becomes an **ecology**. Habitat and ecology describe the same situated environment from different perspectives: habitat from inside the machine, ecology from outside.

**Interaction** — crossing the membrane via representations (see `material-and-communication.md`). The loop is `ecology → membrane → machine → membrane → ecology`, with an operator participating temporarily somewhere in it.

**Recursive / fractal composition** — hypothesis that a machine may contain an internal ecology, an ecology may contain machines, and a machine may participate in another ecology. Similar relationships might recur without a privileged global layer, but no evidence yet establishes the same primitives or transport abstraction at each scale.

**Seed** — experimental construction for instantiating a machine in a compatible substrate, not a primitive of what a machine is. That the *first machine experiment should be capable of developing an internal ecology* is an experimental goal, not a definition. Attention, likewise, is a dimension of activity across the ecology, not constitutive of machine — a machine may need some way of attending to operate, but that does not make attention part of its ontology (see Principles 4).

## 3. Conceptual map (not architecture)

Four orthogonal territories — not layers:

```
MACHINE                          MATERIAL
identity · continuity            what is communicated / retained / acted upon
sovereign region · membrane           ↓
       ↕                      REPRESENTATION
    ECOLOGY                   how material is expressed
machines · operators ·               ↓
environment · habitat      ENVELOPE / TRANSPORT
                          how representations cross boundaries
                                   ↓
                          MATERIALIZATION
                          how received material becomes
                          available for interaction
```

Independently, **operator / cognition / capability** can occur at different places and scales in the ecology — the fractal property. There is no `Layer 1 = machine, Layer 2 = cognition, Layer 3 = transport`.

* `epistemic-machine.md` (here) → candidate account of what may characterize an EM.
* `material-and-communication.md` → what kinds of things can cross boundaries and how they are represented.
* `docs/architecture/` → current provisional embodiment guide and status.
* `protocols/filesystem.md` → historical/provisional filesystem realization notes.
* M01 / Habitat-0 is authorized as a bounded embodiment. It does not establish `events/`, `views/`, seeds, or final runtime architecture.

## 4. Working principles (not proven invariants)

1. **Continuity, not storage.** What matters is what survives discontinuity, not where bytes live.
2. **Substrate hosts machine.** `substrate → hosts machine → membrane → relates to ecology` — not `machine owns substrate`. The machine does not need to model its substrate.
3. **Membrane mediates, not implements.** The machine depends on a membrane contract, not a habitat implementation.
4. **Computation can happen anywhere in the ecology.** Cognition, delegation, attention, and epistemic depth are dimensions of activity, not architectural layers between machine and membrane. An external specialist can perform deep cognition on behalf of a machine.
5. **Embody provisionally, then revise from use.** Build only the authorized current scope; let real pressure distinguish ordinary defects, architectural revision, and a genuinely needed experiment.

---

*Related:* `docs/concepts/material-and-communication.md` (material axis, text protocol, NOSTR as envelope), `docs/protocols/filesystem.md` (provisional filesystem realization notes), `docs/missions/m00-first-continuity-loop.md` (bounded evidence), `docs/roadmaps/machine-ecology-coordination-roadmap.md` (withdrawn coordination proposal retained as historical context), `AGENTS.md` (workshop authorization boundary), `.pi/skills/exchange-skill/SKILL.md` (bus transport contract).
