"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  createMachineA,
  createMachineB,
  recordDeliveredRequest,
  recordDeliveredBytes,
  readDeliveredProjection,
} = require("./resources.js");

const reference = { resource: "orbital-note", revision: "v1" };
const expected = {
  from: "machine-b",
  to: "machine-a",
  correlation: "projection_001",
  reference,
  mediaType: "text/plain",
  content: "orbital observations",
};

function workspace(label) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `s04-${label}-`));
  return { root, requestDir: path.join(root, "transport", "requests"), resultDir: path.join(root, "transport", "results") };
}

function resultCount(resultDir) {
  return fs.existsSync(resultDir) ? fs.readdirSync(resultDir).length : 0;
}

function resultPath(resultDir, correlation) {
  return path.join(resultDir, `result-${correlation}.json`);
}

function assertPublicProjection(projection, fixture) {
  assert.deepEqual(projection, expected, "only the literal public projection is exposed");
  const serialized = JSON.stringify(projection);
  assert.equal(serialized.includes(fixture.root), false, "projection leaked a private path");
  assert.equal(serialized.includes("resources"), false, "projection leaked nested-store layout");
  assert.equal(serialized.includes("revisions"), false, "projection leaked nested-store layout");
}

function runProjection({ label, lookupResource }) {
  const fixture = workspace(label);
  try {
    const a = createMachineA({ name: "machine-a", requestDir: fixture.requestDir });
    const b = createMachineB({ name: "machine-b", requestDir: fixture.requestDir, resultDir: fixture.resultDir, lookupResource });
    const request = a.requestProjection({
      to: "machine-b",
      operation: "project-resource",
      correlation: "projection_001",
      reference,
    });

    assert.deepEqual(Object.keys(a), ["requestProjection"], "A exposes only projection request");
    assert.equal(resultCount(fixture.resultDir), 0, "delivery alone created no projection");
    assert.equal(b.receiveAndProject(request.correlation).accepted, true, "B explicitly projected the resource");
    assert.equal(resultCount(fixture.resultDir), 1, "one explicit projection created one result");
    const projection = readDeliveredProjection({ resultDir: fixture.resultDir, correlation: request.correlation });
    assertPublicProjection(projection, fixture);
    assert.deepEqual(projection.reference, request.reference, "reference survived projection");
    return projection;
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
}

function verifyInvalidReferences() {
  const fixture = workspace("invalid");
  try {
    const b = createMachineB({
      name: "machine-b",
      requestDir: fixture.requestDir,
      resultDir: fixture.resultDir,
      lookupResource: (candidate) => candidate.resource === "orbital-note" && candidate.revision === "v1"
        ? { mediaType: "text/plain", content: "orbital observations" }
        : undefined,
    });
    const invalid = [
      { correlation: "unknown_resource", record: { from: "machine-a", to: "machine-b", operation: "project-resource", correlation: "unknown_resource", reference: { resource: "foreign-note", revision: "v1" } } },
      { correlation: "unknown_revision", record: { from: "machine-a", to: "machine-b", operation: "project-resource", correlation: "unknown_revision", reference: { resource: "orbital-note", revision: "v2" } } },
      { correlation: "wrong_target", record: { from: "machine-a", to: "other-machine", operation: "project-resource", correlation: "wrong_target", reference } },
      { correlation: "wrong_operation", record: { from: "machine-a", to: "machine-b", operation: "erase-resource", correlation: "wrong_operation", reference } },
      { correlation: "malformed_reference", record: { from: "machine-a", to: "machine-b", operation: "project-resource", correlation: "malformed_reference", reference: { resource: "orbital-note" } } },
    ];

    for (const entry of invalid) {
      recordDeliveredRequest({ requestDir: fixture.requestDir, ...entry });
      assert.equal(b.receiveAndProject(entry.correlation).accepted, false, `${entry.correlation} was rejected`);
      assert.equal(fs.existsSync(resultPath(fixture.resultDir, entry.correlation)), false, `${entry.correlation} created no result`);
      assert.equal(resultCount(fixture.resultDir), 0, `${entry.correlation} left no partial result`);
    }
    recordDeliveredBytes({ requestDir: fixture.requestDir, correlation: "invalid_json", bytes: "not json\n" });
    assert.equal(b.receiveAndProject("invalid_json").accepted, false, "invalid JSON was rejected");
    assert.equal(fs.existsSync(resultPath(fixture.resultDir, "invalid_json")), false, "invalid JSON created no result");
    assert.equal(resultCount(fixture.resultDir), 0, "invalid JSON left no partial result");

    const oversizedB = createMachineB({
      name: "machine-b",
      requestDir: fixture.requestDir,
      resultDir: fixture.resultDir,
      lookupResource: () => ({ mediaType: "text/plain", content: "x".repeat(65) }),
    });
    recordDeliveredRequest({ requestDir: fixture.requestDir, correlation: "oversized", record: { from: "machine-a", to: "machine-b", operation: "project-resource", correlation: "oversized", reference } });
    assert.equal(oversizedB.receiveAndProject("oversized").accepted, false, "oversized projection was rejected");
    assert.equal(fs.existsSync(resultPath(fixture.resultDir, "oversized")), false, "oversized projection created no result");
    assert.equal(resultCount(fixture.resultDir), 0, "oversized projection left no partial result");
  } finally {
    fs.rmSync(fixture.root, { recursive: true, force: true });
  }
}

function main() {
  const flatStore = Object.assign(Object.create(null), {
    "orbital-note@v1": { mediaType: "text/plain", content: "orbital observations" },
  });
  const flatProjection = runProjection({
    label: "flat",
    lookupResource: (candidate) => flatStore[`${candidate.resource}@${candidate.revision}`],
  });

  const nestedStore = {
    resources: {
      "orbital-note": {
        revisions: {
          v1: { mediaType: "text/plain", content: "orbital observations" },
        },
      },
    },
  };
  const nestedProjection = runProjection({
    label: "nested",
    lookupResource: (candidate) => nestedStore.resources[candidate.resource]?.revisions[candidate.revision],
  });
  assert.deepEqual(nestedProjection, flatProjection, "private layout substitution preserved public projection");
  verifyInvalidReferences();

  console.log("delivery remains distinct from projection: PASS");
  console.log("correlation and reference are preserved: PASS");
  console.log("private resource layout substitution preserves public projection: PASS");
  console.log("invalid resource references have no successful projection: PASS");
  console.log("oversized projections are rejected: PASS");
  console.log("s04 bounded resource reference and projection: PASS");
}

main();
