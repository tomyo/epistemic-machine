# Epistemic Machine — Concepts & Principles

**Status:** stable conceptual baseline — workshop build phase · refs Mission 0 `b6b79eb` (Gates 1+2+3 ✓) — conceptually stable; implementations remain provisional (see `docs/concepts/material-and-communication.md`, `docs/protocols/filesystem.md`)

> Vision source (adapted): foundations for persistent epistemic machines that can live in different environments and compose recursively.

This document defines **what a machine is**. Not how it is stored, transported, or implemented. Those are in `material-and-communication.md` (what passes between things) and `protocols/filesystem.md` (how we implement one).

---

## 1. What it is

An **Epistemic Machine** is a persistent, continuity-bearing entity with a sovereign region and a membrane, participating in an ecology. The process that operates it (program, human, LLM, collective) is ephemeral — it can activate a machine, inspect and modify its continuity, speak to other machines, then disappear. **The process is ephemeral. The machine is persistent.**

Its substrate is not part of its definition. A machine exists *on/in* something; it does not own its substrate.

## 2. Core concepts

**Machine** — continuity-bearing entity. Has substrate-independent identity (not "the process on this socket" nor "this pubkey" — an identity that can survive changes in embodiment), a sovereign region/place, a boundary/membrane, the capacity to receive and produce things, to be operated, and to relate to other machines. Identity handshake between machines establishes a communication membrane between ecologies.

**Persistence and continuity** — machine state outlives any operator. Proven by discontinuity (Kill→Rebirth), not asserted. Continuity is what survives replacement of the operator.

**Sovereign region** — the place the machine owns as its own continuity. What is inside is the machine's; what is outside is environment. Sovereignty is the invariant, not "directory" or "database".

**Membrane** — the relationship between machine and environment. Answers: what can enter/leave, how it is represented, how operations are requested, how capabilities are exposed, how effects are acknowledged. Membrane is not filesystem, not NOSTR, not an API — it could be text, files, messages, signals, or combinations. See `material-and-communication.md` for the `representation → envelope → transport → materialization` axis that crosses it.

**Operator** — ephemeral participant that acts on a machine (pi session, delegate, human, agent). `D Kill → E Rebirth` proves the distinction: operator disappears, machine remains.

**Environment / habitat** — everything the machine relates to outside its sovereign region: other machines, operators, humans, transport systems, physical reality. From the machine's perspective, this is its **habitat**.

**Ecology** — from the outside, the interacting population (machines, operators, environment) becomes an **ecology**. Habitat and ecology describe the same situated environment from different perspectives: habitat from inside the machine, ecology from outside.

**Interaction** — crossing the membrane via representations (see `material-and-communication.md`). The loop is `ecology → membrane → machine → membrane → ecology`, with an operator participating temporarily somewhere in it.

**Recursive / fractal composition** — a machine can contain an internal ecology; an ecology can contain machines; a machine can itself be part of another machine's ecology. There is no privileged global layer. `habitat → membrane → machine → habitat → membrane → machine …` recurs relative to the entity considered. Same primitives, no fixed `layer 1/2/3`. A seed machine is the minimal instance of this — a habitat containing the machinery for persistence, communication, and attention that can spawn an internal ecology; `machine → internal transport → machine` and `machine → external transport → machine` expose the same abstraction (transport is a property of the connection between ecologies).

## 3. Principles

1. **Continuity, not storage.** What matters is what survives discontinuity, not where bytes live.
2. **Substrate hosts machine.** `substrate → hosts machine → membrane → relates to ecology` — not `machine owns substrate`. The machine does not need to model its substrate.
3. **Membrane mediates, not implements.** The machine depends on a membrane contract, not a habitat implementation.
4. **Computation can happen anywhere in the ecology.** Cognition, delegation, attention, and epistemic depth are dimensions of activity, not architectural layers between machine and membrane. An external specialist can perform deep cognition on behalf of a machine.
5. **Build parts, don't theorize the machine top-down.** Let each failure earn the next primitive (Mission 0 rule).

---

*Related:* `docs/concepts/material-and-communication.md` (material axis, text protocol, NOSTR as envelope), `docs/protocols/filesystem.md` (filesystem realization: `inbox/outbox`, `.em`, `views`), `docs/missions/mission-0.md` (proof), `AGENTS.md` (workshop build phase), `.pi/skills/exchange-skill/SKILL.md` (bus transport contract).
