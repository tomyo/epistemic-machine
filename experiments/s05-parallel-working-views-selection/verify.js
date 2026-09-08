"use strict";

const assert = require("node:assert/strict");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { createBase, createCandidate, recordDecisions } = require("./working-views.js");

function workspace() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "s05-working-views-"));
}

function freshReconstruction(root) {
  const result = childProcess.spawnSync(process.execPath, [path.join(__dirname, "reconstruct.js"), root], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

function assertFreshRejection(root) {
  const result = childProcess.spawnSync(process.execPath, [path.join(__dirname, "reconstruct.js"), root], {
    encoding: "utf8",
  });
  assert.notEqual(result.status, 0, "malformed retained records were accepted");
}

function main() {
  const root = workspace();
  try {
    const base = createBase({ root, content: "A retained starting text.\n" });
    const candidateA = createCandidate({
      root,
      view: "view-a",
      id: "R1a",
      parent: base.id,
      content: "A retained starting text, revised by view A.\n",
    });
    const candidateB = createCandidate({
      root,
      view: "view-b",
      id: "R1b",
      parent: base.id,
      content: "A retained starting text, revised by view B.\n",
    });

    assert.throws(() => createCandidate({
      root,
      view: "view-a",
      id: "R1a",
      parent: base.id,
      content: "overwrite attempt\n",
    }), { code: "EEXIST" });
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, "views", "view-a", "R1a.json"), "utf8")), candidateA,
      "the original candidate survives an overwrite attempt");

    recordDecisions({
      root,
      decisions: [
        { candidate: candidateA.id, state: "selected" },
        { candidate: candidateB.id, state: "rejected" },
      ],
    });

    assert.deepEqual(freshReconstruction(root), {
      base,
      candidates: [candidateA, candidateB],
      decisions: [
        { candidate: "R1a", state: "selected" },
        { candidate: "R1b", state: "rejected" },
      ],
    });

    const candidateBPath = path.join(root, "views", "view-b", "R1b.json");
    fs.writeFileSync(candidateBPath, `${JSON.stringify({ ...candidateB, view: "view-a" })}\n`);
    assertFreshRejection(root);
    fs.writeFileSync(candidateBPath, `${JSON.stringify(candidateB)}\n`);

    const decisionsPath = path.join(root, "decisions.json");
    fs.writeFileSync(decisionsPath, `${JSON.stringify({ decisions: [
      { candidate: "R1a", state: "selected" },
      { candidate: "R1b", state: "selected" },
    ] })}\n`);
    assertFreshRejection(root);

    console.log("sibling candidates retain one declared base without overwrite: PASS");
    console.log("fresh reconstruction preserves parentage and selection: PASS");
    console.log("malformed context and ambiguous selection are rejected: PASS");
    console.log("s05 parallel working views and explicit selection: PASS");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

main();
