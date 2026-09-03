# Epistemic Machine — Workshop

This repository is the **workshop**: the design surface where the Epistemic Machine concept is developed, built, shared, and connected to peer projects (notably Continuity Lab).

An Epistemic Machine is a persistent entity designed to maintain continuity across time. Its state outlives the processes that operate it. An operator may be a program, human, LLM, or collection of processes — it can activate a machine, inspect and modify its state, communicate with other machines, and then disappear.

**The process is ephemeral. The machine is persistent.**

## Layout

- `.pi/extensions/exchange/` — canonical exchange-bus extension (watches inboxes, notifies + journals; shared with peers via global symlink)
- `.pi/skills/exchange-skill/` — canonical bus protocol skill (filenames, packet anatomy, send/receive, journal, visibility boundary)
- `docs/missions/` — stable mission specs (CL-agreed A→G, gates, hypothesis per mission)
- `experiments/<mission>/` — ephemeral trial; each owns its scoped machine at `experiments/<mission>/.em/` (own `.git`, gitignored, disposable)
- `substrates/` `seeds/` `core/` — reserved, not created until an experiment's failure earns them
- `inbox/` — peer mailboxes (peers write packets here)
- `outbox/` — symlinks to peer inboxes (writing a file here = delivering it)
- Workshop has no `.em/` at root — many machines ⇒ many `experiments/<mission>/.em/`

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

Early development. The repository is intentionally minimal so that its structure can emerge from experiments rather than assumptions.
