"use strict";

const fs = require("node:fs");
const path = require("node:path");

class RequestError extends Error {}

function isRecord(value, keys) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).sort().join("\0") === [...keys].sort().join("\0");
}

function validCorrelation(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]+$/.test(value);
}

function requestFile(requestDir, correlation) {
  if (!validCorrelation(correlation)) throw new RequestError("invalid correlation");
  return path.join(requestDir, `request-${correlation}.json`);
}

function resultFile(resultDir, correlation) {
  if (!validCorrelation(correlation)) throw new RequestError("invalid correlation");
  return path.join(resultDir, `result-${correlation}.json`);
}

function writeRecord(file, record) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(record)}\n`, { encoding: "utf8", flag: "wx" });
}

function readRecord(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    throw new RequestError("malformed delivered request");
  }
}

function validateRequest(request, receiver) {
  if (!isRecord(request, ["from", "to", "operation", "correlation", "payload"])) {
    throw new RequestError("request fields are invalid");
  }
  if (typeof request.from !== "string" || request.from.length === 0 || request.to !== receiver) {
    throw new RequestError("request target is invalid");
  }
  if (request.operation !== "lookup") throw new RequestError("operation is not exported");
  if (!validCorrelation(request.correlation)) throw new RequestError("request correlation is invalid");
  if (!isRecord(request.payload, ["key"]) || typeof request.payload.key !== "string") {
    throw new RequestError("request payload is invalid");
  }
}

/** Machine A's public request surface. It receives transport only, never B state or paths. */
function createMachineA({ name, requestDir }) {
  if (typeof name !== "string" || name.length === 0) throw new RequestError("invalid machine A name");

  return {
    issueRequest({ to, operation, correlation, payload }) {
      const request = { from: name, to, operation, correlation, payload };
      writeRecord(requestFile(requestDir, correlation), request);
      return request;
    },
  };
}

/** Machine B owns its receiver-private lookup implementation and result transport. */
function createMachineB({ name, requestDir, resultDir, lookup }) {
  if (typeof name !== "string" || name.length === 0 || typeof lookup !== "function") {
    throw new RequestError("invalid machine B configuration");
  }

  return {
    receiveAndExecute(correlation) {
      try {
        const request = readRecord(requestFile(requestDir, correlation));
        validateRequest(request, name);
        const value = lookup(request.payload.key);
        if (typeof value !== "string") throw new RequestError("lookup returned invalid value");
        const result = { from: name, to: request.from, correlation: request.correlation, value };
        writeRecord(resultFile(resultDir, correlation), result);
        return { accepted: true, result };
      } catch (error) {
        if (error instanceof RequestError) return { accepted: false, reason: error.message };
        throw error;
      }
    },
  };
}

// Fixture-only helpers let the verifier model a delivered malformed request.
function recordDeliveredRequest({ requestDir, correlation, record }) {
  writeRecord(requestFile(requestDir, correlation), record);
}

function readDeliveredResult({ resultDir, correlation }) {
  return readRecord(resultFile(resultDir, correlation));
}

module.exports = {
  RequestError,
  createMachineA,
  createMachineB,
  recordDeliveredRequest,
  readDeliveredResult,
};
