# Plan: Ecological Crossing First Specimen

Depth: tree 3   Mode: orchestrated
Budget note: bounded design/review plus one minimal standard-library specimen; no general ecology or runtime.

## Contract

- Interfaces: the specimen owns one local placement operation and defines its request, completed envelope, and check in its own `experiments/ecological-crossing-first-specimen/` directory. It must show equivalent meaning for a cognition-shaped request and direct local call, not support remote transport. That operation is a fixture, not a discovered shared primitive vocabulary or a semantic compiler.
- Data ownership: the main session alone writes all Lab and EM artifacts. Delegates are read-only and return findings only. The specimen may create only temporary files beneath its own test directory and must not create or modify `.em/`.
- Naming and conventions: Lab advisory is `artifacts/20260905-ecological-crossing-advisory-v0.md`; EM review and decision are under `docs/notes/`; implementation is isolated at `experiments/ecological-crossing-first-specimen/`. All documents label the design provisional and non-general.
- Authority: Lab provides a non-authoritative advisory; EM makes its own provisional workshop decision. Neither document claims universal ecology semantics. The user authorized this bounded workflow; no external service, provider execution, network transport, or cross-repository bus delivery is in scope.

## Tree

- 1 Ecological crossing first specimen .......... `GATES.md`
  - 1.1 Evidence and constraint map .......... `gates/leaf-evidence.md`
  - 1.2 Adversarial design review .......... `gates/leaf-review.md`
  - 1.3 Integrate advisory, decision, and runnable specimen .......... `gates/leaf-integration.md`

## Status log

- 2026-09-05 plan written; contract fixed before delegation
- 2026-09-05 evidence leaf completed by `del_mtog2h1v_ny0a`; reviewer `del_mtog2h1v_efqi` recommends a fixed-destination trusted local adapter and rejects a session executable for the first specimen.
- 2026-09-05 user update ingested as Lab EIP-0063 / UTP-096. Plan refined: do not claim that the two entrypoints discover or validate a cross-actor vocabulary, shared API, or semantic compiler; those remain separately blocked candidates.
- 2026-09-05 final review found caller-selected physical root and symlink escape risks; public entrypoints now use an adapter-owned `mkdtemp` sandbox, reject symlinked sandbox/destination paths, and the test proves no public `root` argument. Follow-up reviewer `del_mtogmszl_a7gq`: no blocking findings.
