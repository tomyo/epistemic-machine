# Epistemic Machine — Concepts & Principles

**Status:** provisional — source-local workshop proposal · refs Mission 0 `b6b79eb` (Gates 1+2+3 ✓) — not CL-adopted · not evidence for Seed/Store/canonical/views/internal ecology/NOSTR/transport · per CL boundary review `2026-09-04T16-13-30` — implementations remain provisional (see `docs/concepts/material-and-communication.md`, `docs/protocols/filesystem.md`)

> Vision source (adapted): foundations for persistent epistemic machines that can live in different environments and compose recursively.

This document defines **what a machine is**. Not how it is stored, transported, or implemented. Those are in `material-and-communication.md` (what passes between things) and `protocols/filesystem.md` (how we implement one).

---

## 1. What it is

An **Epistemic Machine** is a persistent, continuity-bearing entity with a sovereign region and a membrane, participating in an ecology. The process that operates it (program, human, LLM, collective) is ephemeral — it can activate a machine, inspect and modify its continuity, speak to other machines, then disappear. **The process is ephemeral. The machine is persistent.**

Its substrate is not part of its definition. A machine exists *on/in* something; it does not own its substrate.

## 2. Core concepts

**Machine** — continuity-bearing entity. Has substrate-independent identity (not "the process on this socket" nor "this pubkey" — an identity that can survive changes in embodiment), a sovereign region/place, a boundary/membrane, the capacity to receive and produce things, to be operated, and to relate to other machines. Identity handshake between machines establishes a communication membrane between ecologies.

**Persistence and continuity** — machine state outlives any operator. Proven by discontinuity (Kill→Rebirth), not asserted. Continuity is what survives replacement of the operator.

**Sovereign region** — a bounded place within a substrate over which the machine has authority sufficient to maintain its continuity and distinguish its own state from its environment. That could be storage, but also a namespace, process boundary, physical space, cryptographic authority, database partition, or combination. Sovereignty is the invariant, not "directory" or "database", and the machine does not need to know what mechanism establishes the boundary.

**Membrane** — the relationship between machine and environment. Answers: what can enter/leave, how it is represented, how operations are requested, how capabilities are exposed, how effects are acknowledged. Membrane is not filesystem, not NOSTR, not an API — it could be text, files, messages, signals, or combinations. See `material-and-communication.md` for the `representation → envelope → transport → materialization` axis that crosses it.

**Operator** — ephemeral participant that acts on a machine (pi session, delegate, human, agent). `D Kill → E Rebirth` proves the distinction: operator disappears, machine remains.

**Environment / habitat** — everything the machine relates to outside its sovereign region: other machines, operators, humans, transport systems, physical reality. From the machine's perspective, this is its **habitat**.

**Ecology** — from the outside, the interacting population (machines, operators, environment) becomes an **ecology**. Habitat and ecology describe the same situated environment from different perspectives: habitat from inside the machine, ecology from outside.

**Interaction** — crossing the membrane via representations (see `material-and-communication.md`). The loop is `ecology → membrane → machine → membrane → ecology`, with an operator participating temporarily somewhere in it.

**Recursive / fractal composition** — a machine can contain an internal ecology; an ecology can contain machines; a machine can itself be part of another machine's ecology. There is no privileged global layer. `habitat → membrane → machine → habitat → membrane → machine …` recurs relative to the entity considered. Same primitives, no fixed `layer 1/2/3`. Transport is a property of the connection between ecologies (`machine → internal transport → machine` and `machine → external transport → machine` can expose the same abstraction).

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

* `epistemic-machine.md` (here) → what must be true for something to be an EM.
* `material-and-communication.md` → what kinds of things can cross boundaries and how they are represented.
* `protocols/filesystem.md` → how we currently try to realize this.
* Seed experiment (next) → **not earned, not CL-approved; none before CL boundary review lifted** — `2026-09-04T16-13-30`. If EM explores it locally, mark exploratory with smallest discontinuity + apparatus insufficient + falsification condition; do not create `events/views/` or treat as evidence until provenance shown. Then: what breaks when we actually make one.

## 4. Principles

1. **Continuity, not storage.** What matters is what survives discontinuity, not where bytes live.
2. **Substrate hosts machine.** `substrate → hosts machine → membrane → relates to ecology` — not `machine owns substrate`. The machine does not need to model its substrate.
3. **Membrane mediates, not implements.** The machine depends on a membrane contract, not a habitat implementation.
4. **Computation can happen anywhere in the ecology.** Cognition, delegation, attention, and epistemic depth are dimensions of activity, not architectural layers between machine and membrane. An external specialist can perform deep cognition on behalf of a machine.
5. **Build parts, don't theorize the machine top-down.** Let each failure earn the next primitive (Mission 0 rule).

---

*Related:* `docs/concepts/material-and-communication.md` (material axis, text protocol, NOSTR as envelope), `docs/protocols/filesystem.md` (filesystem realization: `inbox/outbox`, `.em`, `views`), `docs/missions/mission-0.md` (proof), `AGENTS.md` (workshop build phase), `.pi/skills/exchange-skill/SKILL.md` (bus transport contract).
