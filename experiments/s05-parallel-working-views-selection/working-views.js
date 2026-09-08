"use strict";

const fs = require("node:fs");
const path = require("node:path");

function isExactObject(value, keys) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).sort().join("\0") === [...keys].sort().join("\0");
}

function isName(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]+$/.test(value);
}

function writeRecord(file, record) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(record)}\n`, { encoding: "utf8", flag: "wx" });
}

function readRecord(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    throw new Error(`cannot read retained record: ${file}`);
  }
}

function baseFile(root) {
  return path.join(root, "records", "R0.json");
}

function candidateFile(root, view, id) {
  return path.join(root, "views", view, `${id}.json`);
}

function decisionsFile(root) {
  return path.join(root, "decisions.json");
}

function createBase({ root, content }) {
  if (typeof content !== "string") throw new Error("base content must be text");
  const base = { id: "R0", kind: "base", content };
  writeRecord(baseFile(root), base);
  return base;
}

function createCandidate({ root, view, id, parent, content }) {
  if (!isName(view) || !isName(id) || parent !== "R0" || typeof content !== "string") {
    throw new Error("candidate is invalid");
  }
  const candidate = { id, parent, view, content };
  writeRecord(candidateFile(root, view, id), candidate);
  return candidate;
}

function recordDecisions({ root, decisions }) {
  if (!Array.isArray(decisions) || decisions.length === 0 || !decisions.every((decision) =>
    isExactObject(decision, ["candidate", "state"])
    && isName(decision.candidate)
    && ["selected", "rejected", "unselected"].includes(decision.state))) {
    throw new Error("decisions are invalid");
  }
  writeRecord(decisionsFile(root), { decisions });
}

function reconstruct(root) {
  const base = readRecord(baseFile(root));
  if (!isExactObject(base, ["id", "kind", "content"])
    || base.id !== "R0" || base.kind !== "base" || typeof base.content !== "string") {
    throw new Error("base record is invalid");
  }

  const viewsRoot = path.join(root, "views");
  const retainedCandidates = fs.readdirSync(viewsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => fs.readdirSync(path.join(viewsRoot, entry.name))
      .sort()
      .map((file) => ({ view: entry.name, file, record: readRecord(path.join(viewsRoot, entry.name, file)) })));
  const candidates = retainedCandidates.map(({ record }) => record);
  const candidateIds = new Set(candidates.map((candidate) => candidate?.id));
  if (candidates.length < 2 || candidateIds.size !== candidates.length || !retainedCandidates.every(({ view, file, record }) =>
    isExactObject(record, ["id", "parent", "view", "content"])
    && isName(record.id)
    && isName(record.view)
    && record.view === view
    && file === `${record.id}.json`
    && record.parent === base.id
    && typeof record.content === "string")) {
    throw new Error("candidate records are invalid");
  }

  const { decisions } = readRecord(decisionsFile(root));
  const decisionIds = new Set(Array.isArray(decisions) ? decisions.map((decision) => decision?.candidate) : []);
  const selectedCount = Array.isArray(decisions) ? decisions.filter((decision) => decision?.state === "selected").length : 0;
  if (!Array.isArray(decisions) || decisions.length !== candidates.length || decisionIds.size !== decisions.length || selectedCount !== 1
    || !decisions.every((decision) => isExactObject(decision, ["candidate", "state"])
      && candidateIds.has(decision.candidate)
      && ["selected", "rejected", "unselected"].includes(decision.state))) {
    throw new Error("decision record is invalid");
  }

  return { base, candidates, decisions };
}

module.exports = { createBase, createCandidate, recordDecisions, reconstruct };
