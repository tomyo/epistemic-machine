"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const MAX_CONTENT_BYTES = 64;
const MAX_RECORD_BYTES = 4096;
const RESOURCE = Object.freeze({
  name: "orbital-note",
  revision: "v1",
  mediaType: "text/plain",
  content: "orbital observations",
});

class HabitatError extends Error {
  constructor(message) {
    super(message);
    this.name = "HabitatError";
  }
}

function isExactObject(value, keys) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && Object.keys(value).sort().join("\0") === [...keys].sort().join("\0");
}

function isUuid(value) {
  return typeof value === "string"
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function validCorrelation(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{1,80}$/.test(value);
}

function rootPath(stateRoot) {
  if (typeof stateRoot !== "string" || stateRoot.length === 0 || stateRoot.includes("\0")) {
    throw new HabitatError("state root must be a non-empty path");
  }
  return path.resolve(stateRoot);
}

function paths(stateRoot) {
  const root = rootPath(stateRoot);
  const residents = path.join(root, "residents");
  const m1 = path.join(residents, "m1");
  const m2 = path.join(residents, "m2");
  const delivery = path.join(root, "delivery");
  return {
    root,
    habitat: path.join(root, "habitat.json"),
    residents,
    m1,
    m1Private: path.join(m1, "private"),
    m2,
    m2Private: path.join(m2, "private"),
    delivery,
    requests: path.join(delivery, "requests"),
    results: path.join(delivery, "results"),
  };
}

function requestPath(layout, correlation) {
  if (!validCorrelation(correlation)) throw new HabitatError("invalid correlation");
  return path.join(layout.requests, `request-${correlation}.json`);
}

function resultPath(layout, correlation) {
  if (!validCorrelation(correlation)) throw new HabitatError("invalid correlation");
  return path.join(layout.results, `result-${correlation}.json`);
}

function followUpPath(layout, correlation) {
  if (!validCorrelation(correlation)) throw new HabitatError("invalid correlation");
  return path.join(layout.m1Private, `follow-up-${correlation}.json`);
}

function isWithin(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}

function requireDirectory(directory, root) {
  try {
    if (!fs.lstatSync(directory).isDirectory()) throw new HabitatError("malformed habitat");
    const canonical = fs.realpathSync(directory);
    if (root && !isWithin(root, canonical)) throw new HabitatError("malformed habitat");
    return canonical;
  } catch (error) {
    if (error instanceof HabitatError) throw error;
    throw new HabitatError("malformed habitat");
  }
}

function requireLayout(layout) {
  const root = requireDirectory(layout.root);
  [layout.residents, layout.m1, layout.m1Private, layout.m2, layout.m2Private,
    layout.delivery, layout.requests, layout.results].forEach((directory) => requireDirectory(directory, root));
  return paths(root);
}

function canonicalFile(layout, file) {
  try {
    const canonical = path.join(fs.realpathSync(path.dirname(file)), path.basename(file));
    if (!isWithin(layout.root, canonical)) throw new HabitatError("malformed habitat");
    return canonical;
  } catch (error) {
    if (error instanceof HabitatError) throw error;
    throw new HabitatError("malformed habitat");
  }
}

function writeRecord(layout, file, record) {
  layout = requireLayout(layout);
  file = canonicalFile(layout, file);
  const temporary = path.join(path.dirname(file), `.${path.basename(file)}-${crypto.randomUUID()}.tmp`);
  let published = false;
  try {
    requireLayout(layout);
    fs.writeFileSync(temporary, `${JSON.stringify(record)}\n`, { encoding: "utf8", flag: "wx" });
    requireLayout(layout);
    fs.linkSync(temporary, file);
    published = true;
    requireLayout(layout);
    fs.unlinkSync(temporary);
  } catch (error) {
    if (published) return;
    try {
      requireLayout(layout);
      fs.unlinkSync(temporary);
    } catch {
      // Best-effort cleanup of an unpublished temporary file.
    }
    if (error?.code === "EEXIST") throw new HabitatError("record already exists");
    if (error instanceof HabitatError) throw error;
    throw error;
  }
}

function readRecord(layout, file, description) {
  try {
    layout = requireLayout(layout);
    file = canonicalFile(layout, file);
    const stat = fs.lstatSync(file);
    if (!stat.isFile() || stat.size > MAX_RECORD_BYTES) throw new HabitatError(`malformed ${description}`);
    requireLayout(layout);
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    if (error instanceof HabitatError) throw error;
    if (error?.code === "ENOENT") throw new HabitatError(`${description} is not available`);
    throw new HabitatError(`malformed ${description}`);
  }
}

function resident(alias) {
  return { alias, identity: crypto.randomUUID() };
}

function validResident(value, alias) {
  return isExactObject(value, ["alias", "identity"])
    && value.alias === alias && isUuid(value.identity);
}

function readHabitat(layout) {
  const habitat = readRecord(layout, layout.habitat, "habitat");
  if (!isExactObject(habitat, ["residents"])
    || !isExactObject(habitat.residents, ["m1", "m2"])
    || !validResident(habitat.residents.m1, "m1")
    || !validResident(habitat.residents.m2, "m2")
    || habitat.residents.m1.identity === habitat.residents.m2.identity) {
    throw new HabitatError("malformed habitat");
  }
  return habitat;
}

function resourceReference() {
  return { name: RESOURCE.name, revision: RESOURCE.revision };
}

function readResource(layout) {
  const resource = readRecord(layout, path.join(layout.m2Private, "resource.json"), "private resource");
  if (!isExactObject(resource, ["name", "revision", "mediaType", "content"])
    || resource.name !== RESOURCE.name
    || resource.revision !== RESOURCE.revision
    || resource.mediaType !== RESOURCE.mediaType
    || resource.content !== RESOURCE.content
    || Buffer.byteLength(resource.content, "utf8") > MAX_CONTENT_BYTES) {
    throw new HabitatError("malformed private resource");
  }
  return resource;
}

function validRequest(record, habitat) {
  const expectedResource = resourceReference();
  return isExactObject(record, ["from", "to", "operation", "correlation", "resource"])
    && validResident(record.from, "m1")
    && validResident(record.to, "m2")
    && record.from.identity === habitat.residents.m1.identity
    && record.to.identity === habitat.residents.m2.identity
    && record.operation === "project-resource"
    && validCorrelation(record.correlation)
    && isExactObject(record.resource, ["name", "revision"])
    && record.resource.name === expectedResource.name
    && record.resource.revision === expectedResource.revision;
}

function validResult(record, habitat) {
  const expectedResource = resourceReference();
  return isExactObject(record, ["from", "to", "correlation", "resource", "mediaType", "content"])
    && validResident(record.from, "m2")
    && validResident(record.to, "m1")
    && record.from.identity === habitat.residents.m2.identity
    && record.to.identity === habitat.residents.m1.identity
    && validCorrelation(record.correlation)
    && isExactObject(record.resource, ["name", "revision"])
    && record.resource.name === expectedResource.name
    && record.resource.revision === expectedResource.revision
    && record.mediaType === "text/plain"
    && record.content === RESOURCE.content
    && Buffer.byteLength(record.content, "utf8") <= MAX_CONTENT_BYTES;
}

function requestMatchesResult(request, result) {
  return request.correlation === result.correlation
    && request.from.identity === result.to.identity
    && request.to.identity === result.from.identity
    && request.resource.name === result.resource.name
    && request.resource.revision === result.resource.revision;
}

function sameResult(left, right) {
  return left.from.alias === right.from.alias
    && left.from.identity === right.from.identity
    && left.to.alias === right.to.alias
    && left.to.identity === right.to.identity
    && left.correlation === right.correlation
    && left.resource.name === right.resource.name
    && left.resource.revision === right.resource.revision
    && left.mediaType === right.mediaType
    && left.content === right.content;
}

function consequenceFor(result) {
  return {
    correlation: result.correlation,
    kind: "retained-projection",
    text: `M1 retained: ${result.content}`,
  };
}

function validFollowUp(record, habitat) {
  return isExactObject(record, ["result", "consequence"])
    && validResult(record.result, habitat)
    && isExactObject(record.consequence, ["correlation", "kind", "text"])
    && record.consequence.correlation === record.result.correlation
    && record.consequence.kind === "retained-projection"
    && record.consequence.text === consequenceFor(record.result).text;
}

function recordCorrelations(layout, directory, prefix) {
  try {
    layout = requireLayout(layout);
    directory = requireDirectory(directory, layout.root);
    return fs.readdirSync(directory, { withFileTypes: true })
      .map((entry) => {
        const match = new RegExp(`^${prefix}-([A-Za-z0-9_-]{1,80})\\.json$`).exec(entry.name);
        if (!match) return undefined;
        if (!entry.isFile()) throw new HabitatError("malformed retained state");
        return match[1];
      })
      .filter(Boolean)
      .sort();
  } catch (error) {
    if (error?.code === "ENOENT") throw new HabitatError("habitat does not exist");
    throw error;
  }
}

function createHabitat(stateRoot) {
  let layout = paths(stateRoot);
  try {
    const root = fs.lstatSync(layout.root);
    if (!root.isDirectory() || fs.readdirSync(layout.root).length !== 0) {
      throw new HabitatError("habitat already exists");
    }
  } catch (error) {
    if (error instanceof HabitatError) throw error;
    if (error?.code === "ENOENT") fs.mkdirSync(layout.root);
    else throw error;
  }

  try {
    layout = paths(requireDirectory(layout.root));
    [layout.residents, layout.m1, layout.m1Private, layout.m2, layout.m2Private,
      layout.delivery, layout.requests, layout.results].forEach((directory) => fs.mkdirSync(directory));
    layout = requireLayout(layout);

    const habitat = { residents: { m1: resident("m1"), m2: resident("m2") } };
    writeRecord(layout, layout.habitat, habitat);
    writeRecord(layout, path.join(layout.m2Private, "resource.json"), RESOURCE);
    return {
      residents: habitat.residents,
      resource: { ...resourceReference(), mediaType: RESOURCE.mediaType },
    };
  } catch (error) {
    [layout.habitat, path.join(layout.root, "residents"), path.join(layout.root, "delivery")]
      .forEach((entry) => fs.rmSync(entry, { recursive: true, force: true }));
    if (error instanceof HabitatError) throw error;
    throw new HabitatError(`could not create habitat: ${error.message}`);
  }
}

function requestResource(stateRoot, correlation) {
  let layout = paths(stateRoot);
  if (!validCorrelation(correlation)) throw new HabitatError("invalid correlation");
  layout = requireLayout(layout);
  const habitat = readHabitat(layout);
  readResource(layout);

  const request = {
    from: habitat.residents.m1,
    to: habitat.residents.m2,
    operation: "project-resource",
    correlation,
    resource: resourceReference(),
  };
  writeRecord(layout, requestPath(layout, correlation), request);
  return request;
}

function activateM2(layout, habitat, correlation) {
  const request = readRecord(layout, requestPath(layout, correlation), "request");
  if (!validRequest(request, habitat) || request.correlation !== correlation) {
    throw new HabitatError("malformed request");
  }
  const resource = readResource(layout);
  const result = {
    from: habitat.residents.m2,
    to: habitat.residents.m1,
    correlation,
    resource: resourceReference(),
    mediaType: resource.mediaType,
    content: resource.content,
  };
  writeRecord(layout, resultPath(layout, correlation), result);
  return result;
}

function activateM1(layout, habitat, correlation) {
  const request = readRecord(layout, requestPath(layout, correlation), "request");
  const result = readRecord(layout, resultPath(layout, correlation), "result");
  if (!validRequest(request, habitat) || request.correlation !== correlation
    || !validResult(result, habitat) || result.correlation !== correlation
    || !requestMatchesResult(request, result)) {
    throw new HabitatError("malformed result");
  }
  const followUp = { result, consequence: consequenceFor(result) };
  writeRecord(layout, followUpPath(layout, correlation), followUp);
  return followUp;
}

function activateResident(stateRoot, residentAlias, correlation) {
  let layout = paths(stateRoot);
  if (!validCorrelation(correlation)) throw new HabitatError("invalid correlation");
  layout = requireLayout(layout);
  const habitat = readHabitat(layout);
  if (residentAlias === "m2") return activateM2(layout, habitat, correlation);
  if (residentAlias === "m1") return activateM1(layout, habitat, correlation);
  throw new HabitatError("resident must be m1 or m2");
}

function inspectHabitat(stateRoot) {
  let layout = paths(stateRoot);
  layout = requireLayout(layout);
  const habitat = readHabitat(layout);
  const requests = recordCorrelations(layout, layout.requests, "request").map((correlation) => {
    const request = readRecord(layout, requestPath(layout, correlation), "request");
    if (!validRequest(request, habitat) || request.correlation !== correlation) {
      throw new HabitatError("malformed request");
    }
    return request;
  });
  const requestsByCorrelation = new Map(requests.map((request) => [request.correlation, request]));
  const results = recordCorrelations(layout, layout.results, "result").map((correlation) => {
    const result = readRecord(layout, resultPath(layout, correlation), "result");
    if (!validResult(result, habitat) || result.correlation !== correlation
      || !requestMatchesResult(requestsByCorrelation.get(correlation) || {}, result)) {
      throw new HabitatError("malformed result");
    }
    return result;
  });
  const resultsByCorrelation = new Map(results.map((result) => [result.correlation, result]));
  const consequences = recordCorrelations(layout, layout.m1Private, "follow-up").map((correlation) => {
    const followUp = readRecord(layout, followUpPath(layout, correlation), "follow-up");
    if (!validFollowUp(followUp, habitat) || followUp.result.correlation !== correlation
      || !resultsByCorrelation.has(correlation)
      || !sameResult(followUp.result, resultsByCorrelation.get(correlation))) {
      throw new HabitatError("malformed follow-up");
    }
    return followUp.consequence;
  });

  return {
    residents: habitat.residents,
    request: requests,
    result: results,
    consequence: consequences,
  };
}

module.exports = {
  HabitatError,
  createHabitat,
  requestResource,
  activateResident,
  inspectHabitat,
};
