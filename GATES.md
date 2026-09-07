# Gates: Ecological Crossing First Specimen

Status: completed historical task; not the current workshop action vector. See `docs/roadmaps/machine-ecology-coordination-roadmap.md`.

Scope: produce a review-backed, explicitly provisional ecology-crossing boundary and its smallest runnable EM workshop specimen; preserve Lab/EM authority separation.

- [x] G1: A Lab advisory records the candidate cognitive -> ecological -> substrate boundary, its non-claims, and its provenance without becoming EM implementation authority.
  CHECK: test -f /var/home/tomyo/projects/continuity-lab/workspaces/epistemic-lab-v0/artifacts/20260905-ecological-crossing-advisory-v0.md && grep -Fq 'non-authoritative' /var/home/tomyo/projects/continuity-lab/workspaces/epistemic-lab-v0/artifacts/20260905-ecological-crossing-advisory-v0.md && echo advisory-present
  EXPECT: advisory-present
  EVIDENCE: advisory-present

- [x] G2: An adversarial review identifies the chosen boundary's concrete authority, lifecycle, and session-failure risks, and the EM decision addresses or explicitly defers each one.
  CHECK: test -f docs/notes/ecological-crossing-first-specimen-review-v0.md && test -f docs/notes/ecological-crossing-first-specimen-decision-v0.md && grep -Fq 'Disposition' docs/notes/ecological-crossing-first-specimen-decision-v0.md && echo review-addressed
  EXPECT: review-addressed
  EVIDENCE: review-addressed

- [x] G3: EM records a provisional first-specimen decision that fixes one minimal operation, its owner and completion semantics, explicitly excludes a general registry, generic protocol, session-generated executable, and virtual filesystem, and defers any shared vocabulary/compiler claim.
  CHECK: grep -Fq 'Provisional decision' docs/notes/ecological-crossing-first-specimen-decision-v0.md && grep -Fq 'Not built' docs/notes/ecological-crossing-first-specimen-decision-v0.md && grep -Fq 'Vocabulary boundary' docs/notes/ecological-crossing-first-specimen-decision-v0.md && echo decision-scoped
  EXPECT: decision-scoped
  EVIDENCE: decision-scoped

- [x] G4: A runnable specimen demonstrates the same declared local placement semantics through a cognition-shaped request and a direct substrate-native call, with validated provenance and an atomic completed materialization; it does not claim a shared actor vocabulary.
  CHECK: python3 experiments/ecological-crossing-first-specimen/test_specimen.py
  EXPECT: ecological crossing specimen: PASS
  EVIDENCE: `python3 experiments/ecological-crossing-first-specimen/test_specimen.py` -> `ecological crossing specimen: PASS`; it checks same bytes/digest, route-bounded receipt parity, rejected digest mismatch/destination field, no public `root` argument, non-symlink sandbox/destination, and no temporary output.

- [x] G5: The new EM specimen and decision remain reviewable without modifying an existing live `.em/` machine state or adopting a general ecology architecture.
  CHECK: test ! -e experiments/ecological-crossing-first-specimen/.em && grep -Fq 'not a general ecology architecture' docs/notes/ecological-crossing-first-specimen-decision-v0.md && echo boundary-held
  EXPECT: boundary-held
  EVIDENCE: boundary-held
