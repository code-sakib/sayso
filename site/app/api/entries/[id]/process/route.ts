import { modelApiKey } from "@/engine/config";
import { startEntry } from "@/engine/jobs";
import { getEntry } from "@/engine/storage/entries";
import { allowRun, fail, ok, visitorOf } from "@/engine/http";

export const runtime = "nodejs";

/** Start the engine on an entry. Progress is read from GET /api/entries/:id. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry(id);
  if (!entry) return fail(404, "No such entry.");
  // An audio-only entry says so with an empty camera start time
  if (!entry.video && entry.videoStartsAt !== "") return fail(400, "Upload the camera file first.");
  if (!modelApiKey()) return fail(503, "The server has no Meta API key yet, so it can't process entries.");
  if (!allowRun(visitorOf(req))) return fail(429, "That's a lot of runs for one hour. Try again later.");
  if (!startEntry(entry)) return fail(409, "This entry is already being processed.");
  return ok({ id }, 202);
}
