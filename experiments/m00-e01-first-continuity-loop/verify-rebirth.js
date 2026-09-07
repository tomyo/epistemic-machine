#!/usr/bin/env node
/**
 * Mission M00 / Experiment E01 — verify-rebirth (Gate 1 + 2)
 *
 * Fresh-operator simulation: no history, no peer reads.
 * Reads ONLY: this experiment's .em/ + inbox/outbox packets.
 * Never reads /var/home/tomyo/projects/continuity-lab/ — visibility boundary.
 *
 * Gate 1: substrate survives kill — .em/mission-0/ACCEPTED-CONSEQUENCE.json at bd01c74
 * Gate 2: fresh operator reconstructs what/why/boundary/provenance from .em alone
 *
 * Exit 0 = survived (hypothesis holds this run)
 * Exit 1 = broke (next primitive earned — see output)
 *
 * Usage: node experiments/m00-e01-first-continuity-loop/verify-rebirth.js
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadAcceptedConsequence, gitLog } from "./lib/substrate.js";
import { listPackets, readPacket } from "./lib/bus.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const emDir = path.join(__dirname, ".em");
const inboxDir = path.join(repoRoot, "inbox/continuity-lab");
const outboxDir = path.join(repoRoot, "outbox/continuity-lab");

let failed = false;
function assert(cond, msg) {
  if (!cond) {
    console.error(`✗ ${msg}`);
    failed = true;
  } else {
    console.error(`✓ ${msg}`);
  }
}

console.log("== Mission M00 / Experiment E01 — verify-rebirth (fresh operator, no history) ==\n");

// ── Gate 1: substrate survives kill ───────────────────────────────
console.log("--- Gate 1: substrate survives kill ---");
let accepted;
let log = "";
try {
  const loaded = loadAcceptedConsequence(emDir);
  accepted = loaded.json;
  console.error(`  file: ${loaded.file}`);
  assert(accepted.id === "c017-review-provenance-gap-prospective-retention", "accepted.id matches mission");
  assert(accepted.accepted === true, "accepted === true");
  assert(accepted.acceptance_detail === "ACCEPTED (with exact scope boundary)", "acceptance_detail is ACCEPTED with boundary");
  assert(typeof accepted.proposed_interpretation === "string" && accepted.proposed_interpretation.length > 100, "proposed_interpretation present");
  assert(accepted.provenance?.belief_proposal_packet?.sha256_body === "c17cc551e2ba739d792ef6d4016a8cafdffcdb565f647fb5bb429d05232be711", "provenance belief-proposal sha256 c17cc5…");
  assert(accepted.provenance?.incorporation_decision_packet?.file_sha256 === "f64745fb23b5ed7693bef334112c5da2b20c333d40edf1456dbafd34493fd9e2", "provenance decision file sha256 f64745…");
  assert(typeof accepted.scope_boundary === "string" && accepted.scope_boundary.includes("No authority change"), "scope_boundary: no authority change");
  assert(typeof accepted.persistence_question === "string" && accepted.persistence_question.includes("Kill"), "persistence_question present");

  log = gitLog(emDir);
  console.error(log.trim());
  assert(log.includes("bd01c74"), "machine git log contains bd01c74 (C: persist)");
} catch (e) {
  console.error(`✗ Gate 1 failed to load substrate: ${e.message}`);
  failed = true;
}

// ── Gate 2: fresh operator reconstructs ───────────────────────────
console.log("\n--- Gate 2: fresh operator reconstructs what/why ---");

const inboxFiles = listPackets(inboxDir);
const outboxFiles = listPackets(outboxDir);
console.error(`  inbox (CL→EM):  ${inboxFiles.length} packets`);
inboxFiles.forEach((f) => console.error(`    - ${path.basename(f)}`));
console.error(`  outbox (EM→CL): ${outboxFiles.length} packets`);
outboxFiles.forEach((f) => console.error(`    - ${path.basename(f)}`));

assert(inboxFiles.some((f) => f.includes("incorporation-decision-c017")), "bus has decision-record inbox packet");
assert(outboxFiles.some((f) => f.includes("belief-proposal-c017")), "bus has belief-proposal outbox packet");

// cross-check: accepted JSON provenance must match bus packets
if (accepted) {
  const decisionPacket = path.join(inboxDir, accepted.provenance.incorporation_decision_packet.file);
  const proposalPacket = path.join(outboxDir, accepted.provenance.belief_proposal_packet.file);
  assert(fs.existsSync(decisionPacket), `provenance decision packet exists on bus: ${accepted.provenance.incorporation_decision_packet.file}`);
  assert(fs.existsSync(proposalPacket), `provenance belief-proposal packet exists on bus: ${accepted.provenance.belief_proposal_packet.file}`);

  // read and sanity-check the packets themselves (fresh operator could do this)
  if (fs.existsSync(decisionPacket)) {
    const pkt = readPacket(decisionPacket);
    assert(pkt.source === "continuity-lab", "decision packet source is continuity-lab");
    assert(pkt.type === "decision-record", "decision packet type is decision-record");
    assert(pkt.body.includes("ACCEPTED"), "decision packet body contains ACCEPTED");
    assert(pkt.body.includes("Proposed Interpretation") || pkt.body.includes("proposed_interpretation"), "decision packet has 5-field record");
  }
  if (fs.existsSync(proposalPacket)) {
    const pkt = readPacket(proposalPacket);
    assert(pkt.source === "epistemic-machine", "proposal packet source is epistemic-machine");
    assert(pkt.type === "belief-proposal", "proposal packet type is belief-proposal");
  }

  assert(accepted.uncertainty?.startsWith("Low"), "uncertainty is Low");
  assert(accepted.reason && accepted.reason.length > 50, "reason present");
}

// ── Reconstructed report (what G will send) ───────────────────────
console.log("\n== Reconstruction (what a fresh operator can say from .em alone) ==\n");

if (accepted) {
  console.log(`CONSEQUENCE: ${accepted.proposed_interpretation}`);
  console.log(`\nACCEPTANCE: ${accepted.acceptance_detail}`);
  console.log(`\nREASON: ${accepted.reason}`);
  console.log(`\nUNCERTAINTY: ${accepted.uncertainty}`);
  console.log(`\nBOUNDARY: ${accepted.scope_boundary}`);
  console.log(`\nPROVENANCE:`);
  console.log(`  A (proposal):  ${accepted.provenance.belief_proposal_packet.file} — body sha256 ${accepted.provenance.belief_proposal_packet.sha256_body} — ${accepted.provenance.belief_proposal_packet.type}/${accepted.provenance.belief_proposal_packet.source}`);
  console.log(`  B (decision):  ${accepted.provenance.incorporation_decision_packet.file} — file sha256 ${accepted.provenance.incorporation_decision_packet.file_sha256} — ${accepted.provenance.incorporation_decision_packet.type}/${accepted.provenance.incorporation_decision_packet.source}`);
  console.log(`  C (persist):   machine .em @ ${emDir} — commit bd01c74 — ${log.split("\n")[0] || ""}`);
  console.log(`\nPERSISTENCE QUESTION: ${accepted.persistence_question}`);
  console.log(`\nSURVIVAL ASSESSMENT:`);
  console.log(`  Bus alone (inbox/outbox) reconstructs what/why/boundary — but only .em proves organism-owned persistence survived Kill.`);
  console.log(`  Without .em/.git (bd01c74), a fresh operator would have packets but no machine-owned proof of incorporation.`);
  console.log(`  Gate 1+2 ${failed ? "FAILED — next primitive earned" : "PASSED — substrate suffices for this loop"}.`);
} else {
  console.log("No accepted consequence could be loaded — Gate 1 failed, cannot reconstruct.");
}

// ── Visibility boundary proof ─────────────────────────────────────
console.log("\n--- Visibility boundary ---");
console.error("  This runnable never reads /var/home/tomyo/projects/continuity-lab/ — bus only.");

// final verdict
if (failed) {
  console.error("\n✗ verify-rebirth FAILED — hypothesis broke here, next primitive earned.");
  process.exit(1);
} else {
  console.error("\n✓ verify-rebirth PASSED — Gates 1+2 hold this run.");
  process.exit(0);
}
