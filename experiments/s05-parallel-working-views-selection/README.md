# S05 — Parallel Working Views and Explicit Selection

Run:

```sh
node verify.js
```

The verifier creates its own temporary workspace, writes one base record, two sibling candidate records under isolated view directories, and one decision record. A separate Node process reconstructs the records; an attempted duplicate candidate write must fail without overwriting the original.

This is a local plain-files control only. It has no Git dependency, root-bus use, `.em/` state, watcher, merge engine, session runtime, machine-to-machine transport, or shared helper.
