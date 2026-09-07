# Epistemic Machine — Workshop

This repository is the **workshop**: the design surface where the Epistemic Machine concept is developed, built, shared, and connected to peer projects (notably Continuity Lab).

An Epistemic Machine is a persistent entity designed to maintain continuity across time. Its state outlives the processes that operate it. An operator may be a program, human, LLM, or collection of processes — it can activate a machine, inspect and modify its state, communicate with other machines, and then disappear.

**The process is ephemeral. The machine is persistent.**

## Layout

- `docs/roadmaps/machine-ecology-coordination-roadmap.md` — candidate EM engineering orientation at its canonical location; pending human adoption and not build authorization
- `docs/missions/` — closed mission evidence and dormant mission briefs
- `docs/notes/README.md` — catalogue of provisional notes and architectural-lineage records
- `docs/notes/` — provisional notes, bounded contracts, decisions, and curated architectural lineage
- `.pi/extensions/exchange/` — exchange-bus watcher/notification and journal extension
- `.pi/skills/exchange-skill/` — bus transport convention (filenames, packet anatomy, send/receive, journal, visibility boundary)
- `experiments/<mission>/` — isolated trial/test; a mission may own a scoped gitignored machine at `experiments/<mission>/.em/`
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

Documentation Stage 1 is the current milestone. Machine Ecology Coordination Roadmap version 0 is an EM-owned candidate pending human review/adoption; Continuity Lab advice remains non-authoritative, and the human separately authorizes every build or experiment. Mission 0 is closed with no stable primitive promoted. Experiment A (orientation) and Experiment B (roadmap evolution) are dormant and unexecuted.
