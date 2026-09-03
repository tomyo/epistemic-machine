/**
 * Minimal filesystem substrate helpers for Mission 0.
 *
 * The workshop never versions machine state. Machine state lives in
 * experiments/<mission>/.em/ — its own .git repo, scoped to that experiment.
 * Substrate is just files + git log. Nothing clever.
 *
 * ponytail: stdlib only (fs/path/child_process), no deps, no abstraction for later.
 */

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

/**
 * Read and parse the persisted accepted consequence for this mission.
 * @param {string} emDir - path to the machine's .em dir (e.g. experiments/.../.em)
 * @returns {{ raw: string, json: object }} file content and parsed JSON
 */
export function loadAcceptedConsequence(emDir) {
  const file = path.join(emDir, "mission-0", "ACCEPTED-CONSEQUENCE.json");
  const raw = fs.readFileSync(file, "utf8");
  return { raw, json: JSON.parse(raw), file };
}

/**
 * Return the machine's git log (oneline), proving persistence survived the operator.
 * @param {string} emDir - path to .em
 * @returns {string} git log output
 */
export function gitLog(emDir) {
  return execFileSync("git", ["-C", emDir, "log", "--oneline", "--decorate", "-n", "20"], {
    encoding: "utf8",
  });
}

/**
 * Assert the file exists and round-trips as JSON.
 * @param {string} file - absolute or relative path to the JSON file
 */
export function assertJsonFile(file) {
  if (!fs.existsSync(file)) throw new Error(`missing persisted file: ${file}`);
  const raw = fs.readFileSync(file, "utf8");
  JSON.parse(raw); // must be valid JSON
  return raw;
}
