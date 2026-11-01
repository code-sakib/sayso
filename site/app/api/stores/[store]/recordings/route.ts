import { badgeRecordings } from "@/engine/storage/badgeAudio";
import { isSafeName } from "@/engine/storage/files";
import { fail, ok } from "@/engine/http";

export const runtime = "nodejs";

/** The badge files already on the server for a store and day. */
export async function GET(req: Request, { params }: { params: Promise<{ store: string }> }) {
  const { store } = await params;
  const date = new URL(req.url).searchParams.get("date") ?? "";
  if (!isSafeName(store) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return fail(400, "Pick a store and a date.");
  const recordings = await badgeRecordings(store, date);
  return ok(recordings.map(({ badgeId, repId, startSec, durationSec }) => ({ badgeId, repId, startSec, durationSec })));
}
