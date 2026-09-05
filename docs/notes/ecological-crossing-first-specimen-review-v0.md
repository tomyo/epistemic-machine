# Ecological Crossing First Specimen — Adversarial Review v0

Status: review record for a provisional workshop specimen; not an EM architecture decision

## Reviewed candidate

A cognition-shaped operation and a direct substrate-native operation should preserve the same declared local placement meaning at the machine boundary.

## Findings

| Risk | Disposition |
|---|---|
| A caller-controlled machine/place/path can collapse authority into representation. | Do not accept IDs, aliases, or paths. Fix the specimen destination in the adapter. |
| Declared front matter or transport metadata is not trusted provenance. | Recompute SHA-256; retain only trusted entrypoint route in the receipt. |
| Notification, file appearance, recipient attention, and acknowledgement differ. | Define completion solely as atomic local materialization plus verified reread. |
| A session executable can carry stale destination, environment, or ambient authority. | Reject it for this specimen. |
| Mediated writes create queues, replay, cancellation, recovery, and acceptance semantics. | Defer them. |
| Filesystem projections can leak representation as ontology. | Do not claim the fixed directory is a general place or machine boundary. |
| Concurrent and crash behavior is broader than one local file replacement. | Preserve idempotence for equal digest; defer broader recovery/concurrency claims. |
| A two-entrypoint test can be mistaken for evidence of a universal primitive vocabulary or a semantic compiler. | Name `place-local` a fixture operation; defer vocabulary selection, actor-equivalence, and compilation. |

## Mechanism choice

Use one test-owned trusted local adapter with a fixed output directory, digest validation, same-directory temporary file, `os.replace`, and verified reread. Both entrypoints must invoke that adapter; neither may bypass validation.

## Falsification conditions

The specimen fails if either route produces different bytes, digest, completion state, or declared route; if bad input materializes; if caller-supplied destination escapes the specimen root; or if temporary output survives success/failure.

## Scope boundary

This review does not authorize a session tool, resolver, global identity, generic protocol, virtual filesystem, remote transport, recipient acknowledgement, shared primitive vocabulary, semantic compiler, or a general ecology architecture.

## Sources

- `artifacts/20260905-eip-0060-durable-material-exchange-and-projected-cognitive-workspaces-v0.md`
- `artifacts/20260905-eip-0061-ecology-semantics-and-three-namespaces-v0.md`
- `artifacts/20260905-eip-0062-ecological-semantics-at-cognitive-substrate-boundary-v0.md`
- Read-only review `del_mtog2h1v_efqi`
- `artifacts/20260905-eip-0063-shared-ecological-vocabulary-and-semantic-compilation-v0.md` (advisory candidate only)
