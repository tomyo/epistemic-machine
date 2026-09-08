"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  createMachineA,
  createMachineB,
  recordDeliveredRequest,
  readDeliveredResult,
} = require("./machines.js");

function workspace(label) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `s03-${label}-`));
  return { root, requestDir: path.join(root, "transport", "requests"), resultDir: path.join(root, "transport", "results") };
}

function countResults(resultDir) {
  return fs.existsSync(resultDir) ? fs.readdirSync(resultDir).length : 0;
}

function runLookup({ label, lookup }) {
  const fixture = workspace(label);
  const correlation = "request_001";
  const a = createMachineA({ name: "machine-a", requestDir: fixture.requestDir });
  const b = createMachineB({ name: "machine-b", requestDir: fixture.requestDir, resultDir: fixture.resultDir, lookup });
  const request = a.issueRequest({ to: "machine-b", operation: "lookup", correlation, payload: { key: "orbit" } });

  assert.deepEqual(Object.keys(a), ["issueRequest"], "A exposes only its request operation");
  assert.equal(countResults(fixture.resultDir), 0, "delivery alone created no result");
  const execution = b.receiveAndExecute(correlation);
  assert.equal(execution.accepted, true, "B explicitly accepted the request");
  const result = readDeliveredResult({ resultDir: fixture.resultDir, correlation });
  assert.deepEqual(result, { from: "machine-b", to: "machine-a", correlation, value: "blue" });
  assert.equal(result.correlation, request.correlation, "correlation survived execution");
  fs.rmSync(fixture.root, { recursive: true, force: true });
  return result;
}

function verifyInvalidRequests() {
  const fixture = workspace("invalid");
  const b = createMachineB({
    name: "machine-b",
    requestDir: fixture.requestDir,
    resultDir: fixture.resultDir,
    lookup: (key) => ({ orbit: "blue" })[key] ?? "missing",
  });
  const invalid = [
    { correlation: "wrong_target", record: { from: "machine-a", to: "other-machine", operation: "lookup", correlation: "wrong_target", payload: { key: "orbit" } } },
    { correlation: "wrong_operation", record: { from: "machine-a", to: "machine-b", operation: "erase", correlation: "wrong_operation", payload: { key: "orbit" } } },
    { correlation: "malformed", record: { from: "machine-a", to: "machine-b", operation: "lookup", correlation: "malformed", payload: {} } },
  ];

  for (const entry of invalid) {
    recordDeliveredRequest({ requestDir: fixture.requestDir, ...entry });
    assert.equal(b.receiveAndExecute(entry.correlation).accepted, false, `${entry.correlation} was rejected`);
  }
  assert.equal(countResults(fixture.resultDir), 0, "invalid requests created no result");
  fs.rmSync(fixture.root, { recursive: true, force: true });
}

function main() {
  const objectState = Object.assign(Object.create(null), { orbit: "blue" });
  const first = runLookup({ label: "object", lookup: (key) => objectState[key] ?? "missing" });
  const listState = [["orbit", "blue"]];
  const second = runLookup({ label: "list", lookup: (key) => listState.find(([candidate]) => candidate === key)?.[1] ?? "missing" });
  assert.deepEqual(second, first, "private substitution preserved the public result");
  verifyInvalidRequests();

  console.log("delivery remains distinct from execution: PASS");
  console.log("correlation is preserved: PASS");
  console.log("private substitution preserves public result: PASS");
  console.log("invalid requests have no successful result: PASS");
  console.log("s03 two-machine request/reply: PASS");
}

main();
