#!/usr/bin/env node
"use strict";

const path = require("node:path");
const {
  HabitatError,
  createHabitat,
  requestResource,
  activateResident,
  inspectHabitat,
} = require("./habitat");

const defaultStateRoot = path.resolve(__dirname, "../..", ".habitat-0");

function usageError(message) {
  throw new HabitatError(message);
}

function parseArguments(arguments_) {
  let stateRoot = defaultStateRoot;
  let index = 0;

  if (arguments_[index] === "--state") {
    stateRoot = arguments_[index + 1];
    if (!stateRoot || stateRoot.startsWith("--")) usageError("--state requires a path");
    index += 2;
  }

  const command = arguments_[index++];
  if (!command) usageError("missing command");
  const rest = arguments_.slice(index);
  return { stateRoot, command, rest };
}

function requireArguments(rest, count, command) {
  if (rest.length !== count) usageError(`invalid arguments for ${command}`);
}

function run(arguments_) {
  const { stateRoot, command, rest } = parseArguments(arguments_);
  switch (command) {
    case "--help":
      requireArguments(rest, 0, "--help");
      return {
        usage: "node src/habitat-0/cli.js [--state PATH] COMMAND",
        commands: ["create", "request CORRELATION", "activate m2 CORRELATION", "activate m1 CORRELATION", "inspect", "--help"],
      };
    case "create":
      requireArguments(rest, 0, "create");
      return createHabitat(stateRoot);
    case "request":
      requireArguments(rest, 1, "request");
      return requestResource(stateRoot, rest[0]);
    case "activate":
      requireArguments(rest, 2, "activate");
      return activateResident(stateRoot, rest[0], rest[1]);
    case "inspect":
      requireArguments(rest, 0, "inspect");
      return inspectHabitat(stateRoot);
    default:
      usageError(`unknown command: ${command}`);
  }
}

try {
  process.stdout.write(`${JSON.stringify(run(process.argv.slice(2)))}\n`);
} catch (error) {
  const message = error instanceof Error && error.message ? error.message : "operation failed";
  process.stderr.write(`habitat-0: ${message}\n`);
  process.exitCode = 1;
}
