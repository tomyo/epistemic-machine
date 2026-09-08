# Epistemic Machine — Workshop

This repository is the **workshop**: the design surface where the Epistemic Machine concept is developed, built, shared, and connected to peer projects (notably Continuity Lab).

An Epistemic Machine is a persistent entity designed to maintain continuity across time. Its state outlives the processes that operate it. An operator may be a program, human, LLM, or collection of processes — it can activate a machine, inspect and modify its state, communicate with other machines, and then disappear.

**The process is ephemeral. The machine is persistent.**

## Layout

- `docs/architecture/README.md` — current provisional architecture and embodiment-status surface
- `docs/roadmaps/embodiment-roadmap-v1.md` — candidate embodiment coordination direction; not implementation authorization
- `docs/missions/` — closed evidence and proposed bounded embodiment briefs, including proposed M01 / Habitat-0
- `docs/notes/README.md` — catalogue of historical provisional notes and architectural-lineage records
- `docs/notes/` — provisional notes, bounded contracts, decisions, and curated architectural lineage
- `.pi/extensions/exchange/` — exchange-bus watcher/notification and journal extension
- `.pi/skills/exchange-skill/` — bus transport convention (filenames, packet anatomy, send/receive, journal, visibility boundary)
- `experiments/mNN-eNN-<slug>/` — isolated experiment within an adopted mission; `experiments/sNN-<slug>/` — standalone specimen; either may own a scoped gitignored `.em/`
- `protocol/` `substrates/` `seeds/` `core/` — reserved names, not current foundations and not created
- `inbox/` — peer mailboxes (peers write packets here)
- `outbox/` — symlinks to peer inboxes (writing one file here delivers bytes)
- Workshop has no `.em/` at root

## Core Questions

What must persist for something to remain meaningfully continuous when its operator does not?

How can machines maintain state, communicate, delegate work, and evolve without depending on a single runtime or model?

## Working Ideas

- persistent state
- ephemeral operators
- machine-to-machine communication
- delegation and specialization
- substrate-independent continuity
- cooperation between machines

The filesystem may be useful as an initial substrate because it is simple and inspectable, but the model should not depend on it.

## Status

The workshop is in **Embodiment Preparation**. The architecture surface and Embodiment Roadmap v1 are candidates pending human adoption; M01 / Habitat-0 is proposed but not authorized. No runtime, seed, Habitat-0 state, or Habitat-0 source implementation has been created. Mission M00 and S03–S05 remain bounded historical evidence. Continuity Lab advice remains non-authoritative, and the human separately authorizes every build or experiment.
