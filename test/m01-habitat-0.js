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

function run(...args) {
  const result = spawnSync(process.execPath, [cli, '--state', root, ...args], {
    encoding: 'utf8'
  });
  return {
    ...result,
    stdout: result.stdout || '',
    stderr: result.stderr || ''
  };
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

function directories(directory, found = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(entryPath);
      directories(entryPath, found);
    }
  }
  return found;
}

function assertPrivateState() {
  assert(fs.statSync(root).isDirectory(), 'state root was not created');
  const privateRoots = directories(root).filter((directory) =>
    fs.readdirSync(directory).length > 0
  );
  assert(privateRoots.length >= 2, 'M1 and M2 do not have distinct materialized private roots');
  for (const directory of privateRoots) {
    assert(path.relative(root, fs.realpathSync(directory)).split(path.sep)[0] !== '..',
      'private state escaped the supplied state root');
  }
}

function assertNoPrivateLayout(value) {
  const rendered = JSON.stringify(value);
  assert(!rendered.includes(root), 'CLI disclosed the state root');
  assert(!hasValue(value, /(?:^|[\\/])(?:tmp|home|var|usr)(?:[\\/]|$)/),
    'CLI disclosed a filesystem path');
}

try {
  const created = json(run('create'), 'create');
  const createdInspection = json(run('inspect'), 'initial inspect');
  const identities = strings(created).concat(strings(createdInspection))
    .filter((value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value));

  assert(new Set(identities).size >= 2, 'creation did not expose two distinct local identities');
  assert(hasValue(createdInspection, /^m1$/i) && hasValue(createdInspection, /^m2$/i),
    'inspection did not report both resident aliases');
  assertPrivateState();
  assertNoPrivateLayout(created);
  rejected(run('activate', 'm2', correlation), 'premature M2 activation');
  rejected(run('activate', 'm1', correlation), 'premature M1 activation');
  rejected(run('activate', 'm3', correlation), 'invalid resident activation');

  const delivered = json(run('request', correlation), 'request');
  const beforeExecution = json(run('inspect'), 'inspect after delivery');
  assert(hasValue(delivered, new RegExp(`^${correlation}$`)), 'delivery did not retain its correlation');
  assert(hasValue(beforeExecution, new RegExp(`^${correlation}$`)), 'inspection did not retain delivered request metadata');
  assert(!hasMeaningfulNamedValue(delivered, /^(result|consequence)$/i),
    'delivery performed execution instead of only delivery');
  assert(!hasMeaningfulNamedValue(beforeExecution, /^consequence$/i),
    'delivery activated M1 before explicit activation');
  rejected(run('activate', 'm1', correlation), 'M1 activation before M2 result');

  const m2Result = json(run('activate', 'm2', correlation), 'activate m2');
  const afterM2 = json(run('inspect'), 'inspect after M2 activation');
  assert(hasValue(m2Result, new RegExp(`^${correlation}$`)), 'M2 result lost its correlation');
  assert.notDeepStrictEqual(afterM2, beforeExecution, 'M2 activation did not change retained state');
  assert(hasMeaningfulNamedValue(afterM2, /^result$/i), 'M2 activation did not retain a bounded result');

  const m1Result = json(run('activate', 'm1', correlation), 'activate m1');
  const afterM1 = json(run('inspect'), 'inspect after M1 activation');
  assert(hasValue(m1Result, new RegExp(`^${correlation}$`)), 'M1 follow-up lost its correlation');
  assert(hasMeaningfulNamedValue(afterM1, /^consequence$/i), 'M1 did not retain a consequence');
  assertNoPrivateLayout(afterM1);

  const freshInspection = json(run('inspect'), 'fresh inspect');
  assert.deepStrictEqual(freshInspection, afterM1, 'consequence did not survive a fresh CLI invocation');

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
