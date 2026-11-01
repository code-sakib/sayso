// Badge transcripts to conversations: keep only the wearer's voice, put every line on the store
// clock, and split a rep's day wherever they went quiet for a while.

import { CONVERSATION_GAP_SECONDS } from "../config.ts";

/** One transcribed turn from a badge file, timed from the start of that file. */
export type SpeechTurn = { startMs: number; endMs: number; text: string; speaker?: string };

/** One badge file after transcription. `startSec` is when the badge started recording. */
export type BadgeTranscript = { repId: string; badgeId: string; startSec: number; turns: SpeechTurn[] };

/** A rep line on the store clock. */
export type RepLine = { atSec: number; endSec: number; text: string };

export type Conversation = { id: string; repId: string; badgeId: string; startSec: number; endSec: number; lines: RepLine[] };

/**
 * The badge sits on the wearer's chest, so the wearer is the voice heard most. Any other voice
 * that got past the badge's loudness gate is dropped here, so customer speech never reaches a report.
 */
export function keepWearer(turns: SpeechTurn[]): SpeechTurn[] {
  const labelled = turns.filter((t) => t.speaker);
  if (labelled.length === 0) return turns;
  const talkTime = new Map<string, number>();
  for (const t of labelled) talkTime.set(t.speaker!, (talkTime.get(t.speaker!) ?? 0) + (t.endMs - t.startMs));
  const wearer = [...talkTime.entries()].reduce((a, b) => (b[1] > a[1] ? b : a))[0];
  return turns.filter((t) => t.speaker === wearer);
}

const toLines = (file: BadgeTranscript): RepLine[] =>
  keepWearer(file.turns)
    .filter((t) => t.text.trim().length > 0)
    .map((t) => ({ atSec: file.startSec + t.startMs / 1000, endSec: file.startSec + t.endMs / 1000, text: t.text.trim() }));

/** Split one rep's lines (in time order) wherever the gap is longer than `gapSec`. */
function splitOnGaps(lines: RepLine[], gapSec: number): RepLine[][] {
  return lines.reduce<RepLine[][]>((groups, line) => {
    const last = groups.at(-1);
    const lastLine = last?.at(-1);
    if (!last || !lastLine || line.atSec - lastLine.endSec > gapSec) return [...groups, [line]];
    return [...groups.slice(0, -1), [...last, line]];
  }, []);
}

/** Every conversation of the day across all badges, in clock order, with ids c1, c2, … */
export function buildConversations(files: BadgeTranscript[], gapSec = CONVERSATION_GAP_SECONDS): Conversation[] {
  const byRep = new Map<string, { badgeId: string; lines: RepLine[] }>();
  for (const f of files) {
    const prev = byRep.get(f.repId);
    byRep.set(f.repId, { badgeId: f.badgeId, lines: [...(prev?.lines ?? []), ...toLines(f)] });
  }
  const unnumbered = [...byRep.entries()].flatMap(([repId, { badgeId, lines }]) =>
    splitOnGaps([...lines].sort((a, b) => a.atSec - b.atSec), gapSec).map((group) => ({
      repId,
      badgeId,
      startSec: group[0].atSec,
      endSec: group.at(-1)!.endSec,
      lines: group,
    })),
  );
  return unnumbered.sort((a, b) => a.startSec - b.startSec).map((c, i) => ({ id: `c${i + 1}`, ...c }));
}
