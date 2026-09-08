"use strict";

const fs = require("node:fs");
const path = require("node:path");

class ProjectionError extends Error {}

function isExactObject(value, keys) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).sort().join("\0") === [...keys].sort().join("\0");
}

function isCorrelation(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]+$/.test(value);
}

function requestFile(requestDir, correlation) {
  if (!isCorrelation(correlation)) throw new ProjectionError("invalid correlation");
  return path.join(requestDir, `request-${correlation}.json`);
}

function resultFile(resultDir, correlation) {
  if (!isCorrelation(correlation)) throw new ProjectionError("invalid correlation");
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
    throw new ProjectionError("malformed delivered request");
  }
}

function validateRequest(request, receiver) {
  if (!isExactObject(request, ["from", "to", "operation", "correlation", "reference"])) {
    throw new ProjectionError("request fields are invalid");
  }
  if (typeof request.from !== "string" || request.from.length === 0 || request.to !== receiver) {
    throw new ProjectionError("request target is invalid");
  }
  if (request.operation !== "project-resource") throw new ProjectionError("operation is not exported");
  if (!isCorrelation(request.correlation)) throw new ProjectionError("request correlation is invalid");
  if (!isExactObject(request.reference, ["resource", "revision"])
    || typeof request.reference.resource !== "string"
    || typeof request.reference.revision !== "string") {
    throw new ProjectionError("reference is malformed");
  }
}

/** A's public surface: it receives only its local transport realization. */
function createMachineA({ name, requestDir }) {
  if (typeof name !== "string" || name.length === 0) throw new ProjectionError("invalid machine A name");

  return {
    requestProjection({ to, operation, correlation, reference }) {
      const request = { from: name, to, operation, correlation, reference };
      writeRecord(requestFile(requestDir, correlation), request);
      return request;
    },
  };
}

/** B owns its private resource lookup and only emits the fixed public projection. */
function createMachineB({ name, requestDir, resultDir, lookupResource }) {
  if (typeof name !== "string" || name.length === 0 || typeof lookupResource !== "function") {
    throw new ProjectionError("invalid machine B configuration");
  }

  return {
    receiveAndProject(correlation) {
      try {
        const request = readRecord(requestFile(requestDir, correlation));
        validateRequest(request, name);
        const privateResource = lookupResource(request.reference);
        if (!isExactObject(privateResource, ["mediaType", "content"])
          || privateResource.mediaType !== "text/plain"
          || typeof privateResource.content !== "string"
          || Buffer.byteLength(privateResource.content, "utf8") > 64) {
          throw new ProjectionError("resource reference is unknown");
        }
        const result = {
          from: name,
          to: request.from,
          correlation: request.correlation,
          reference: request.reference,
          mediaType: privateResource.mediaType,
          content: privateResource.content,
        };
        writeRecord(resultFile(resultDir, correlation), result);
        return { accepted: true, result };
      } catch (error) {
        if (error instanceof ProjectionError) return { accepted: false, reason: error.message };
        throw error;
      }
    },
  };
}

// Fixture-only: model an already delivered invalid request without giving A malformed APIs.
function recordDeliveredRequest({ requestDir, correlation, record }) {
  writeRecord(requestFile(requestDir, correlation), record);
}

function recordDeliveredBytes({ requestDir, correlation, bytes }) {
  const file = requestFile(requestDir, correlation);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, bytes, { encoding: "utf8", flag: "wx" });
}

function readDeliveredProjection({ resultDir, correlation }) {
  return readRecord(resultFile(resultDir, correlation));
}

module.exports = {
  createMachineA,
  createMachineB,
  recordDeliveredRequest,
  recordDeliveredBytes,
  readDeliveredProjection,
};
