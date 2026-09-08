# Session Handoff

## Current state

- Roadmap v1 is the adopted workshop coordination head.
- M01 / Habitat-0 is implemented as the bounded local ecology in [`src/habitat-0/`](src/habitat-0/); generated runtime state is confined to ignored `/.habitat-0/`.
- Run the M01 acceptance check with `node test/m01-habitat-0.js`.
- Habitat-0 is local, replaceable, independent of the root EM↔CL file bus, and not a reusable/shared foundation. Do not alter that bus for M01.

## Start here

1. [`AGENTS.md`](AGENTS.md) — current phase and authorization boundary.
2. [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](docs/missions/m01-habitat-0-first-runnable-internal-ecology.md) — authorized scope and acceptance criteria.
3. [`docs/architecture/provisional-architecture-v0.md`](docs/architecture/provisional-architecture-v0.md) and [`docs/architecture/embodiment-status-v0.md`](docs/architecture/embodiment-status-v0.md) — responsibility map, deferrals, and Habitat-0 framing.
4. [`docs/roadmaps/embodiment-roadmap-v1.md`](docs/roadmaps/embodiment-roadmap-v1.md) — adopted revise-from-use loop.

## M01 boundary

The implemented Habitat-0 ecology has two resident machines, M1 and M2, with isolated retained state, one bounded resource-oriented request/result, delivery distinct from explicit M2 execution, a retained M1 follow-up across fresh CLI invocation, and inspection without M2-private layout disclosure.

Its local mechanisms are replaceable and are not final ecology substrate. Do not add recursion, external transport, global identity/discovery, authority system, generic capabilities, daemon/watchers, event system, Git/CAS, CRDTs, reusable seed, or shared foundation.

## Recent decisions and evidence

- `f577761 Record M01 authorization and ecology framing` — records Roadmap v1 adoption, M01 authorization, and Habitat-0 as first local/replaceable ecology realization.
- `c7b9482 Close embodiment preparation at decision gate` — phase-closure record; its decision now resolved.
- `d5dde47 Curate distributed revision and reachability discussion` — future-only distinctions: resource revision vs grouped consequence; durable material vs communication; reachability vs identity/authority.
- Legacy-repo archaeology recommends no framework import. Observe only whether real use exposes ownership/acceptance or interruption/concurrent-writer pressure.

## Working constraints

- Never push without explicit human permission.
- Commit completed changes in small atomic commits with reasoning.
- Real use decides whether an issue is an ordinary defect, architecture pressure, isolated uncertainty, or no action; do not promote primitives by declaration.
- `PLAN.md`, `GATES.md`, and `gates/` are active implementation ledgers and remain ignored; consult the M01 brief and architecture records before changing the bounded realization.
