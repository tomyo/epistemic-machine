/**
 * Thin bus helpers — read-only, inbox/outbox only.
 *
 * Visibility boundary (SKILL.md): bus mailboxes are the ONLY shared surface.
 * Never read /var/home/tomyo/projects/continuity-lab/ or any peer tree.
 * Need peer state → ask over bus with a typed packet.
 */

import fs from "node:fs";
import path from "node:path";

/**
 * List markdown packets in a mailbox dir, sorted lexicographically (iso dates).
 * @param {string} dir - e.g. inbox/continuity-lab or outbox/continuity-lab
 * @returns {string[]} absolute-ish file paths (relative to repo root passed in)
 */
export function listPackets(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => path.join(dir, f));
}

/**
 * Read a packet file and extract frontmatter + body summary.
 * @param {string} file - path to packet md
 * @returns {{ file: string, frontmatter: string, body: string, sha256: string, source: string, type: string }}
 */
export function readPacket(file) {
  const raw = fs.readFileSync(file, "utf8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const frontmatter = fmMatch ? fmMatch[1] : "";
  const body = fmMatch ? raw.slice(fmMatch[0].length) : raw;
  const get = (k) => {
    const m = frontmatter.match(new RegExp(`^${k}:\\s*(.*)$`, "m"));
    return m ? m[1].trim() : "";
  };
  return {
    file,
    frontmatter,
    body: body.trim().slice(0, 4000),
    sha256: get("sha256"),
    source: get("source"),
    type: get("type"),
  };
}
