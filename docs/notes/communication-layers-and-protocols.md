# Communication Layers & Protocols — note (superseded)

**Status:** superseded 2026-09-04 → see `docs/concepts/material-and-communication.md` + `docs/protocols/filesystem.md`

This note's 3-layer sketch (`Transport-protocol / Transport / EM internal`) conflated ontology with filesystem implementation. The separation is now:

* **What a machine is** → `docs/concepts/epistemic-machine.md` (identity, continuity, sovereign region, membrane, ecology, fractal)
* **What passes between things** → `docs/concepts/material-and-communication.md` (material → representation → envelope → transport → materialization, wrapping, Bell vs content, text protocol)
* **How we implement one on filesystem** → `docs/protocols/filesystem.md` (machine keep vs transport state, canonical store vs `views` projections, filesystem-like abstraction as materialization)

CL `2026-09-03T18-45-transport-evolution-response.md` still applies: earn `seeds/` first on filesystem bus; NOSTR only when (a) off-host symlink fails or (b) unsigned inbox provenance collapses — now parked as envelope/transport north in `material-and-communication.md` §3–4, implemented in `protocols/filesystem.md` §4 when earned.

Kept for history; do not extend. New north goes in the two docs above.

---

*Previous content archived in git history (`619f06e`).*
