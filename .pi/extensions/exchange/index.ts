/**
 * Exchange bus extension (GLOBAL, any project).
 *
 * Dumb watcher: notify + journal only. It does NOT read, digest, or interpret
 * packets — what a project does with a packet is that project's own workflow.
 *
 * Watches the project's bus inbox(es): <cwd>/inbox (peer mailboxes) and any
 * <cwd>/workspaces/<ws>/inbox (lab-workspace layouts). On a new packet file it
 * toasts the human, surfaces
 * an LLM arrival message, and appends one line to .sessions/exchange-journal.jsonl.
 * Watcher dies with the session (session_shutdown); the mailbox persists.
 *
 * Actively only when a bus inbox is present (peerDirs.length > 0); otherwise a
 * complete no-op. Single-writer invariant: we READ inbox/*, never write there.
 *
 * Authoritative contract: the skill `.pi/skills/exchange-skill/SKILL.md` in the
 * Epistemic Machine workshop repo (canonical). This code is just that transport.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";

const DEBOUNCE_MS = 500;
const SEEN = new Set<string>();

export default function (pi: ExtensionAPI) {
  let watcher: fs.FSWatcher | null = null;

  pi.on("session_start", async (_event, ctx) => {
    const cwd = ctx.cwd ?? process.cwd();
    const inbox = path.join(cwd, "inbox");
    const journalPath = path.join(cwd, ".sessions", "exchange-journal.jsonl");

    fs.mkdirSync(path.join(cwd, ".sessions"), { recursive: true });

    const appendJournal = (peer: string, file: string, size: number) => {
      const entry = JSON.stringify({ ts: new Date().toISOString(), peer, file, size });
      fs.appendFileSync(journalPath, entry + "\n");
    };

    /**
     * Derive the human-readable label to show in the toast / LLM message from a
     * packet filename. Convention: `<yyyy-mm-ddThh-mm-ss>-<slug>.md`. The datetime
     * prefix is ordering/journal metadata — drop it for display, showing the slug.
     * Falls back to the raw filename (minus .md) when the filename has no prefix
     * (e.g. pre-convention or foreign packets).
     */
    const displayLabel = (fileName: string): string => {
      const base = fileName.endsWith(".md") ? fileName.slice(0, -3) : fileName;
      // ^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-  (the leading datetime + slug separator)
      const m = base.match(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-(.+)$/);
      return m ? m[1] : base;
    };

    const onArrival = (peerDir: string, fileName: string) => {
      const full = path.join(peerDir, fileName);
      const key = `${peerDir}|${fileName}`;
      if (SEEN.has(key)) return;
      if (!fs.statSync(full, { throwIfNoEntry: false })?.isFile()) return;
      SEEN.add(key);
      const size = fs.statSync(full).size;
      const peer = path.basename(peerDir);
      const label = displayLabel(fileName);
      appendJournal(peer, fileName, size);
      ctx.ui.notify(`📥 from ${peer}: ${label} (${size}B)`, "info");
      // Surface the arrival to the LLM in this session (still not interpreted).
      // Without this the packet only reaches the human (notify) + journal; this is
      // what lets the per-project ingestion logic see that a packet arrived.
      try {
        pi.sendMessage(
          { customType: "exchange", content: `📥 packet from ${peer}: ${label} — at ${full}` , display: true },
          { triggerTurn: true },
        );
      } catch {
        /* extension not ready / context missing; toast+journal still happened */
      }
    };

    // Own peer mailboxes only (single-writer invariant: we read inbox/*, never write there).
    // Inbox may live at project root (epistemic-machine/inbox) or inside a lab workspace
    // (continuity-lab/workspaces/*/inbox) depending on how each project lays out its bus.
    const candidateInboxes: string[] = [inbox];
    const wsDir = path.join(cwd, "workspaces");
    if (fs.existsSync(wsDir)) {
      for (const ws of fs.readdirSync(wsDir, { withFileTypes: true })) {
        if (!ws.isDirectory()) continue;
        const wsInbox = path.join(wsDir, ws.name, "inbox");
        if (fs.existsSync(wsInbox)) candidateInboxes.push(wsInbox);
      }
    }

    const peerDirs: string[] = [];
    for (const ib of candidateInboxes) {
      if (!fs.existsSync(ib)) continue;
      fs.mkdirSync(ib, { recursive: true });
      for (const d of fs.readdirSync(ib, { withFileTypes: true }))
        if (d.isDirectory() && !d.name.startsWith(".")) peerDirs.push(path.join(ib, d.name));
    }

    // Gate: only awaken in projects that actually run a bus (an inbox with peer
    // mailboxes). In any other project this extension does nothing at all — no
    // watcher, no toast, no journal, no sendMessage.
    if (peerDirs.length === 0) return;

    for (const dir of peerDirs) {
      fs.mkdirSync(dir, { recursive: true });
      watcher = fs.watch(dir, (_eventType, fileName) => {
        if (!fileName) return;
        const timer = setTimeout(() => {
          try {
            onArrival(dir, fileName);
          } catch {
            /* file vanished; ignore */
          }
        }, DEBOUNCE_MS);
        // keep the process alive while debouncing
        timer.unref?.();
      });
    }

    const watchRoots = [...new Set(candidateInboxes.filter((p) => fs.existsSync(p)))].join(", ");
    ctx.ui.notify(`exchange: watching ${peerDirs.length} mailbox(es) in ${watchRoots}`, "info");
  });

  pi.on("session_shutdown", async () => {
    if (watcher) {
      watcher.close();
      watcher = null;
    }
  });
}
