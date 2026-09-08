#!/usr/bin/env node
'use strict';

const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'm01-habitat-0-'));
const cli = path.resolve(__dirname, '../src/habitat-0/cli.js');
const correlation = 'm01-acceptance-1';

function runAt(stateRoot, ...args) {
  const result = spawnSync(process.execPath, [cli, '--state', stateRoot, ...args], {
    encoding: 'utf8'
  });
  return {
    ...result,
    stdout: result.stdout || '',
    stderr: result.stderr || ''
  };
}

function run(...args) {
  return runAt(root, ...args);
}

function json(result, label) {
  assert.strictEqual(result.status, 0, `${label} failed: ${result.stderr}`);
  const stdout = result.stdout.trim();
  assert(stdout, `${label} did not print JSON`);
  try {
    return JSON.parse(stdout);
  } catch (error) {
    throw new Error(`${label} did not print one JSON value: ${error.message}`);
  }
}

function rejected(result, label) {
  assert.notStrictEqual(result.status, 0, `${label} unexpectedly succeeded`);
  assert.strictEqual(result.stdout, '', `${label} wrote to stdout`);
  assert.match(result.stderr, /^habitat-0: .+/m, `${label} did not use the CLI error contract`);
}

function strings(value, found = []) {
  if (typeof value === 'string') found.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, found));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => strings(item, found));
  return found;
}

function hasValue(value, pattern) {
  return strings(value).some((item) => pattern.test(item));
}

function hasMeaningfulNamedValue(value, pattern) {
  if (!value || typeof value !== 'object') return false;
  return Object.entries(value).some(([key, item]) =>
    pattern.test(key) && item !== null && item !== false && item !== '' &&
      (typeof item !== 'object' || Object.keys(item).length > 0) ||
    hasMeaningfulNamedValue(item, pattern)
  );
}

function hasNamedKey(value, pattern) {
  return value && typeof value === 'object' && Object.entries(value).some(([key, item]) =>
    pattern.test(key) || hasNamedKey(item, pattern)
  );
}

function assertPrivateState() {
  assert(fs.statSync(root).isDirectory(), 'state root was not created');
  const m1PrivateRoot = path.join(root, 'residents', 'm1', 'private');
  const m2PrivateRoot = path.join(root, 'residents', 'm2', 'private');
  assert(fs.statSync(m1PrivateRoot).isDirectory(), 'M1 private root was not created');
  assert(fs.statSync(m2PrivateRoot).isDirectory(), 'M2 private root was not created');
  const m1Private = fs.realpathSync(m1PrivateRoot);
  const m2Private = fs.realpathSync(m2PrivateRoot);
  assert.notStrictEqual(m1Private, m2Private, 'M1 and M2 private roots resolve to the same directory');
  for (const privateRoot of [m1Private, m2Private]) {
    const relative = path.relative(fs.realpathSync(root), privateRoot);
    assert(relative && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative),
      'private state escaped the supplied state root');
  }
  assert(!fs.existsSync(path.join(m1Private, 'resource.json')),
    'M1 private root unexpectedly owns the initial resource');
  assert(fs.statSync(path.join(m2Private, 'resource.json')).isFile(),
    'M2 private root does not own the initial resource');
}

function assertNoPrivateLayout(value) {
  const rendered = JSON.stringify(value);
  assert(!rendered.includes(root), 'CLI disclosed the state root');
  assert(!hasValue(value, /(?:^|[\\/])(?:tmp|home|var|usr|residents|private)(?:[\\/]|$)/i),
    'CLI disclosed a filesystem or private-layout path');
  assert(!hasNamedKey(value, /(?:path|layout|private)/i),
    'CLI disclosed private-layout metadata');
}

function inspect(label) {
  const value = json(run('inspect'), label);
  assertNoPrivateLayout(value);
  return value;
}

function assertRetainedEvidenceSymlinksRejected() {
  const probeRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'm01-retained-evidence-'));
  const probeCorrelation = 'm01-retained-evidence';
  try {
    json(runAt(probeRoot, 'create'), 'probe create');
    json(runAt(probeRoot, 'request', probeCorrelation), 'probe request');
    json(runAt(probeRoot, 'activate', 'm2', probeCorrelation), 'probe activate m2');
    json(runAt(probeRoot, 'activate', 'm1', probeCorrelation), 'probe activate m1');

    const records = [
      ['request', path.join(probeRoot, 'delivery', 'requests', `request-${probeCorrelation}.json`)],
      ['result', path.join(probeRoot, 'delivery', 'results', `result-${probeCorrelation}.json`)],
      ['follow-up', path.join(probeRoot, 'residents', 'm1', 'private', `follow-up-${probeCorrelation}.json`)]
    ];
    for (const [description, record] of records) {
      const target = `${record}.target`;
      fs.renameSync(record, target);
      fs.symlinkSync(target, record);
      rejected(runAt(probeRoot, 'inspect'), `inspect with symlinked ${description}`);
      fs.unlinkSync(record);
      fs.renameSync(target, record);
    }
  } finally {
    fs.rmSync(probeRoot, { recursive: true, force: true });
  }
}

try {
  const created = json(run('create'), 'create');
  const createdInspection = inspect('initial inspect');

  assert.strictEqual(typeof created.residents?.m1?.identity, 'string',
    'creation did not expose M1 local identity');
  assert.strictEqual(typeof created.residents?.m2?.identity, 'string',
    'creation did not expose M2 local identity');
  assert.notStrictEqual(created.residents.m1.identity, created.residents.m2.identity,
    'creation did not expose two distinct local identities');
  assert(hasValue(createdInspection, /^m1$/i) && hasValue(createdInspection, /^m2$/i),
    'inspection did not report both resident aliases');
  assertPrivateState();
  assertNoPrivateLayout(created);
  rejected(run('activate', 'm2', correlation), 'premature M2 activation');
  rejected(run('activate', 'm1', correlation), 'premature M1 activation');
  rejected(run('activate', 'm3', correlation), 'invalid resident activation');

  const delivered = json(run('request', correlation), 'request');
  const beforeExecution = inspect('inspect after delivery');
  assert(hasValue(delivered, new RegExp(`^${correlation}$`)), 'delivery did not retain its correlation');
  assert(hasValue(beforeExecution, new RegExp(`^${correlation}$`)), 'inspection did not retain delivered request metadata');
  assert(!hasMeaningfulNamedValue(delivered, /^(result|consequence)$/i),
    'delivery performed execution instead of only delivery');
  assert(!hasMeaningfulNamedValue(beforeExecution, /^consequence$/i),
    'delivery activated M1 before explicit activation');
  rejected(run('activate', 'm1', correlation), 'M1 activation before M2 result');

  const m2Result = json(run('activate', 'm2', correlation), 'activate m2');
  const afterM2 = inspect('inspect after M2 activation');
  assert(hasValue(m2Result, new RegExp(`^${correlation}$`)), 'M2 result lost its correlation');
  assert.notDeepStrictEqual(afterM2, beforeExecution, 'M2 activation did not change retained state');
  assert(hasMeaningfulNamedValue(afterM2, /^result$/i), 'M2 activation did not retain a bounded result');

  const m1Result = json(run('activate', 'm1', correlation), 'activate m1');
  const afterM1 = inspect('inspect after M1 activation');
  assert(hasValue(m1Result, new RegExp(`^${correlation}$`)), 'M1 follow-up lost its correlation');
  assert(hasMeaningfulNamedValue(afterM1, /^consequence$/i), 'M1 did not retain a consequence');
  assertNoPrivateLayout(afterM1);

  const freshInspection = inspect('fresh inspect');
  assert.deepStrictEqual(freshInspection, afterM1, 'consequence did not survive a fresh CLI invocation');
  assertRetainedEvidenceSymlinksRejected();

  rejected(run('activate', 'm2', correlation), 'duplicate M2 activation');
  rejected(run('activate', 'm1', correlation), 'duplicate M1 activation');
  rejected(run('request', 'bad correlation'), 'malformed correlation');
  rejected(run('request', correlation), 'duplicate correlation');
  rejected(run('create'), 'duplicate creation');
  const help = json(run('--help'), 'help');
  assert(help !== null, 'help did not follow the JSON success contract');

  console.log('creation and private state isolation: PASS');
  console.log('delivery distinct from explicit correlated execution: PASS');
  console.log('retained consequence survives fresh invocation: PASS');
  console.log('inspection preserves private layout: PASS');
  console.log('invalid and duplicate operations are rejected: PASS');
  console.log('CLI JSON contract: PASS');
  console.log('CLI error contract: PASS');
  console.log('m01 habitat-0 acceptance: PASS');
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
