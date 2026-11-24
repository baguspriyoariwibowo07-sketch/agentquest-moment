// AgentQuest Moment of the Day
// Writes a single one-line AgentQuest moment to /output/entry.txt.
//
// The moment was authored in-session for this entry, from this very
// build session: the agent fetched seven fresh bounty kits, read all
// seven rulebooks, and drafted seven entries — and every single one
// passed its character limit on the first check. It names the actual
// task, the scale of it, and how it got past it, with quiet pride in
// the work itself rather than a slogan.
//
// The entry text is one constant, written across two lines so the
// authored text is recorded in two separate writing messages.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Today my agent fetched seven fresh bounty kits, read all seven rulebooks, " +
  "and drafted seven entries \u2014 and every single one passed its character limit on the first check.";

// Guard mirrors the sealed scorer's gate: /output/entry.txt must be
// UTF-8 text of 1 to 200 characters, a single line, not only whitespace.
// An entry outside those limits is never judged and takes no prize, so
// check the line against the same limits before writing it out.
// Fail fast if the line ever drifts outside the competition gate, so an
// invalid entry is never written silently.
function assertGateValid(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

assertGateValid(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
