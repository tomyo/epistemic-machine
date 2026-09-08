# Session Handoff

## Current state

- Roadmap v1 is the adopted workshop coordination head.
- M01 / Habitat-0 is authorized for implementation; no runtime, Habitat-0 state, source directory, or machine instance exists yet.
- The workshop remains separate from the root EM↔CL file bus. Do not alter that bus for M01.
- No code implementation started in this session. The user explicitly requested documentation adaptation only after authorization.

## Start here

1. [`AGENTS.md`](AGENTS.md) — current phase and authorization boundary.
2. [`docs/missions/m01-habitat-0-first-runnable-internal-ecology.md`](docs/missions/m01-habitat-0-first-runnable-internal-ecology.md) — authorized scope and acceptance criteria.
3. [`docs/architecture/provisional-architecture-v0.md`](docs/architecture/provisional-architecture-v0.md) and [`docs/architecture/embodiment-status-v0.md`](docs/architecture/embodiment-status-v0.md) — responsibility map, deferrals, and Habitat-0 framing.
4. [`docs/roadmaps/embodiment-roadmap-v1.md`](docs/roadmaps/embodiment-roadmap-v1.md) — adopted revise-from-use loop.

## M01 boundary

Build the smallest repository-local Habitat-0 ecology with two resident machines, M1 and M2. It must demonstrate isolated retained state, one bounded resource-oriented request/result, delivery distinct from explicit M2 execution, M1’s retained consequential follow-up surviving a fresh CLI invocation, and inspection without M2-private layout disclosure.

Habitat-0 is the first concrete ecology realization: its local mechanisms are replaceable and are not final ecology substrate. Do not add recursion, external transport, global identity/discovery, authority system, generic capabilities, daemon/watchers, event system, Git/CAS, CRDTs, reusable seed, or shared foundation.

## Recent decisions and evidence

- `f577761 Record M01 authorization and ecology framing` — records Roadmap v1 adoption, M01 authorization, and Habitat-0 as first local/replaceable ecology realization.
- `c7b9482 Close embodiment preparation at decision gate` — phase-closure record; its decision now resolved.
- `d5dde47 Curate distributed revision and reachability discussion` — future-only distinctions: resource revision vs grouped consequence; durable material vs communication; reachability vs identity/authority.
- Legacy-repo archaeology recommends no framework import. Observe only whether real use exposes ownership/acceptance or interruption/concurrent-writer pressure.

## Working constraints

- Never push without explicit human permission.
- Commit completed changes in small atomic commits with reasoning.
- Real use decides whether an issue is an ordinary defect, architecture pressure, isolated uncertainty, or no action; do not promote primitives by declaration.
- Unlazy was proposed for the eventual M01 build, but no `GATES.md` or `PLAN.md` was created. Before starting the substantial implementation in a new session, confirm whether to use that workflow.
