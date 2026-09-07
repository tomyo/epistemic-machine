# Gates: Advisory, Decision, and Runnable Specimen

Scope: integrate verified evidence and review into non-authoritative Lab advice, an EM provisional decision, and the smallest standard-library specimen.

- [x] G1: Create the Lab advisory and EM decision with stated authority boundaries and review dispositions.
  CHECK: test -f /var/home/tomyo/projects/continuity-lab/workspaces/epistemic-lab-v0/artifacts/20260905-ecological-crossing-advisory-v0.md && test -f docs/notes/ecological-crossing-first-specimen-decision-v0.md
  EXPECT:
  EVIDENCE: advisory at `/var/home/tomyo/projects/continuity-lab/workspaces/epistemic-lab-v0/artifacts/20260905-ecological-crossing-advisory-v0.md`; decision at `docs/notes/ecological-crossing-first-specimen-decision-v0.md`.
- [x] G2: Implement and run the isolated specimen without live `.em/` state or external transport.
  CHECK: python3 experiments/s01-ecological-crossing/test_specimen.py
  EXPECT: ecological crossing specimen: PASS
  EVIDENCE: ecological crossing specimen: PASS
- [x] G3: Re-run root checks and record exact evidence in `GATES.md`.
  EVIDENCE: `node /var/home/tomyo/.agents/skills/unlazy/scripts/gate-check.mjs GATES.md` reported PASS for G1, G2, G3, G4, and G5 before ledger completion; evidence is recorded in `GATES.md`.
